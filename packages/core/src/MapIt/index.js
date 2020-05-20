import React, { useEffect, useRef, useCallback, useState } from "react";
import PropTypes from "prop-types";

import leaflet from "leaflet";

import "leaflet/dist/leaflet.css";
import BlockLoader from "../BlockLoader";
import makeStyles from "../makeStyles";
import useDeepRef from "./useDeepRef";

const useStyles = makeStyles({
  root: {
    position: "relative",
  },
  overlay: {
    position: "absolute",
    right: 0,
    left: 0,
    top: 0,
    bottom: 0,
    zIndex: 401,
  },
  map: {
    width: "100%",
    height: "100%",
  },
});

function MapIt({
  id,
  url = "https://mapit.hurumap.org",
  width = "100%",
  height = "100%",
  tolerance = 0.001,
  zoom = 3,
  generation = "1",
  drawChildren,
  drawGrandChildren,
  drawProfile,
  geoCode,
  geoLevel,
  codeType,
  indexColor,
  geoIndexMapping,
  scoreLabel,
  filterCountries = ["KE", "ZA"],
  tileLayer,
  geoLayerFocusStyle = {
    color: "#777",
    fillColor: "#ccc",
    weight: 2,
    opacity: 0.3,
    fillOpacity: 0.5,
  },
  geoLayerBlurStyle = {
    color: "#00d",
    fillColor: "#ccc",
    weight: 1.0,
    opacity: 0.3,
    fillOpacity: 0.3,
  },
  geoLayerHoverStyle = {
    fillColor: "#ccc",
    fillOpacity: 0.7,
  },
  onClickGeoLayer,
  ...leafletProps
}) {
  const mapId = id || "mapit";
  const mapRef = useRef(null);
  const [featuresToDraw, setFeaturesToDraw] = useState();
  const filterCountriesMemoized = useDeepRef(filterCountries);
  const leafletPropsMemoized = useDeepRef(leafletProps);
  const geoLayerStyles = useDeepRef({
    focus: geoLayerFocusStyle,
    blur: geoLayerBlurStyle,
    hover: geoLayerHoverStyle,
  });

  // The `extra` parameter is an object with properties that are not returned in a geojson call
  // The geojson only returns the name in the properties which is not sufficient
  // in retrieving the are information on click.
  //
  // We append the area information after the geojson is received to avoid another load
  // But also to have sufficient data to use like the `id` if we want to retrieve
  // more data using an api call
  const fetchGeoJson = useCallback(
    (areaKeys, areas) => {
      return fetch(
        `${url}/areas/${areaKeys}.geojson?simplify_tolerance=${tolerance}`
      ).then((geoRes) => {
        if (!geoRes.ok) return Promise.reject();
        return geoRes.json().then(({ features }) => {
          return {
            type: "FeatureCollection",
            features: features
              ? features.map((feature) => {
                  const areaInfo = areas.find(
                    (area) => area.name === feature.properties.name
                  );
                  const geoIndexInfo =
                    geoIndexMapping &&
                    geoIndexMapping.find(
                      (geoIndex) =>
                        `${geoIndex.geoLevel}-${geoIndex.geoCode}` ===
                        areaInfo.codes[codeType || "AFR"]
                    );

                  return {
                    ...feature,
                    properties: {
                      ...feature.properties,
                      ...areaInfo,
                      ...geoIndexInfo,
                    },
                  };
                })
              : [],
          };
        });
      });
    },
    [url, tolerance, geoIndexMapping, codeType]
  );

  const fetchMapitArea = useCallback(async () => {
    const areaRes = await fetch(
      `${url}/code/${codeType}/${geoLevel}-${geoCode}?generation=${generation}`
    );
    return areaRes.json();
  }, [url, codeType, geoLevel, geoCode, generation]);

  const loadGeometryForLevel = useCallback(() => {
    // geo_level do not always match to mapit area type
    // AFR geo_level are level1_TZ_001 while mapit area type are specific ie PROVINCE, REGION, COUNTY
    // Using the geoid (geoLevel-geoCode) we will first request mapit api to give us=> mapit type of a specific geo
    return fetchMapitArea().then((area) => {
      const { country, type } = area;
      return fetch(
        `${url}/areas/${type}?generation=${generation}&country=${country}`
      ).then((areaRes) => {
        if (!areaRes.ok) return Promise.reject();

        return areaRes.json().then((data) => {
          const areaKeys = Object.keys(data).join();

          return fetchGeoJson(areaKeys, Object.values(data));
        });
      });
    });
  }, [fetchMapitArea, fetchGeoJson, generation, url]);

  const fetchChildren = useCallback(
    (areaKey) => {
      return fetch(`${url}/area/${areaKey}/children`).then((areasRes) => {
        if (!areasRes.ok) return Promise.reject();

        return areasRes.json().then((data) => {
          let areaData = data;
          if (
            filterCountriesMemoized.length > 0 &&
            !drawProfile &&
            geoLevel === "continent"
          ) {
            areaData = Object.entries(data)
              .filter((area) => {
                return filterCountriesMemoized.includes(area[1].country);
              })
              .reduce((accum, [k, v]) => {
                return { ...accum, [k]: v };
              }, {});
          }
          return areaData;
        });
      });
    },
    [drawProfile, filterCountriesMemoized, geoLevel, url]
  );

  const loadGeometryForChildLevel = useCallback(
    async (areaId) => {
      const childrenData = await fetchChildren(areaId);
      return fetchGeoJson(
        Object.keys(childrenData).join(),
        Object.values(childrenData)
      );
    },
    [fetchChildren, fetchGeoJson]
  );

  const loadGeometryForGrandChildLevel = useCallback(
    async (areaId) => {
      const childrenData = await fetchChildren(areaId);
      const grandChildrenData = {};

      await Promise.all(
        Object.keys(childrenData).map(async (child) => {
          const c = await fetchChildren(child);
          Object.assign(grandChildrenData, c);
        })
      );

      const x = await fetchGeoJson(
        Object.keys(grandChildrenData).join(),
        Object.values(grandChildrenData)
      );
      return x;
    },
    [fetchChildren, fetchGeoJson]
  );

  /**
   * Data loading hook
   */
  useEffect(() => {
    // if we are not on a profile page, then we are on homepage or country page
    // where no specific geography is focused, only child levels of the root geography are drawn
    // For normal hurumap apps, the root geo is country, so we draw all it's child level
    // And for apps like dominion/takwimu, we start at a continent level and we draw its all child level (country)
    // but not all child levels are supposed to be drawn (i.e mapit has ethiopia as child of continent but we don't have dominion ethiopia)
    // so in this case we will filter using loadCountrries
    if (drawProfile) {
      loadGeometryForLevel().then((featureCollection) => {
        if (drawChildren) {
          fetchMapitArea().then((area) => {
            loadGeometryForChildLevel(area.id).then(
              (childrenFeatureCollection) => {
                if (drawGrandChildren) {
                  loadGeometryForGrandChildLevel(area.id).then(
                    (grandChildrenFeatureCollection) => {
                      setFeaturesToDraw({
                        type: "FeatureCollection",
                        features: [
                          ...featureCollection.features,
                          ...childrenFeatureCollection.features,
                          ...grandChildrenFeatureCollection.features,
                        ],
                      });
                    }
                  );
                } else {
                  setFeaturesToDraw({
                    type: "FeatureCollection",
                    features: [
                      ...featureCollection.features,
                      ...childrenFeatureCollection.features,
                    ],
                  });
                }
              }
            );
          });
        } else {
          setFeaturesToDraw(featureCollection);
        }
      });
    } else {
      fetchMapitArea().then((area) => {
        return loadGeometryForChildLevel(area.id).then(
          (childrenFeatureCollection) => {
            setFeaturesToDraw(childrenFeatureCollection);
          }
        );
      });
    }
  }, [
    drawChildren,
    drawProfile,
    loadGeometryForLevel,
    fetchMapitArea,
    loadGeometryForChildLevel,
    drawGrandChildren,
    loadGeometryForGrandChildLevel,
  ]);

  /**
   * Rendering hook
   */
  useEffect(() => {
    if (!mapRef.current) {
      mapRef.current = leaflet.map(mapId, {
        boxZoom: false,
        doubleClickZoom: false,
        dragging: true,
        keyboard: false,
        scrollWheelZoom: false,
        touchZoom: false,
        zoomControl: false,
        center: [0, 0],
        zoom,
        ...leafletPropsMemoized,
      });

      if (mapRef.current.dragging) {
        mapRef.current.addControl(
          new leaflet.Control.Zoom({
            position: "bottomright",
          })
        );
      }
    }

    const map = mapRef.current;

    // Clear layers
    map.eachLayer((layer) => {
      map.removeLayer(layer);
    });

    if (tileLayer) {
      tileLayer.addTo(map);
    } else {
      leaflet
        .tileLayer(
          "https://server.arcgisonline.com/ArcGIS/rest/services/Canvas/World_Light_Gray_Base/MapServer/tile/{z}/{y}/{x}",
          {
            attribution: "Tiles &copy; Esri &mdash; Esri, DeLorme, NAVTEQ",
          }
        )
        .addTo(map);
    }

    const setGeoStyles = (layer, geoColor, focusing) => {
      if (geoColor) {
        layer.setStyle({
          fillColor: geoColor,
          color: "#fff",
          fillOpacity: 1,
          weight: 1,
        });
      } else {
        layer.setStyle(geoLayerStyles[focusing]);
      }
    };

    const geoJsonLayer = leaflet
      .geoJSON(featuresToDraw, {
        onEachFeature: (feature, layer) => {
          const geoColor = indexColor && indexColor[feature.properties.index];
          if (
            drawProfile &&
            `${geoLevel}-${geoCode}` ===
              feature.properties.codes[codeType || "AFR"]
          ) {
            setGeoStyles(layer, geoColor, "focus");
            map.fitBounds(layer.getBounds());
          } else {
            layer.on("mouseover", () => {
              setGeoStyles(layer, geoColor, "hover");
            });
            layer.on("mouseout", () => {
              setGeoStyles(layer, geoColor, "blur");
            });
            layer.on("click", () => {
              if (onClickGeoLayer) {
                onClickGeoLayer(feature.properties);
              }
            });
            setGeoStyles(layer, geoColor, "blur");
          }
          let label = feature.properties.name;
          if (scoreLabel && feature.properties.score) {
            label = `${label} <br /> ${scoreLabel} : <strong>${feature.properties.score}</strong>`;
          }
          layer.bindTooltip(label, { direction: "auto" });
        },
      })
      .addTo(map);

    if (!drawProfile && geoJsonLayer.getBounds().isValid()) {
      map.fitBounds(geoJsonLayer.getBounds());
    }
  }, [
    mapId,
    zoom,
    tileLayer,
    featuresToDraw,
    drawProfile,
    geoLevel,
    geoCode,
    codeType,
    geoLayerStyles,
    onClickGeoLayer,
    leafletPropsMemoized,
    indexColor,
    scoreLabel,
  ]);
  const classes = useStyles();

  return (
    <div className={classes.root} style={{ width, height, overflow: "hidden" }}>
      {!featuresToDraw && (
        <div className={classes.overlay}>
          <BlockLoader loading />
        </div>
      )}
      <div
        id={mapId}
        className={classes.map}
        style={{ display: !featuresToDraw ? "hidden" : "block" }}
      />
    </div>
  );
}

MapIt.propTypes = {
  indexColor: PropTypes.shape({}),
  id: PropTypes.string,
  width: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  height: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  url: PropTypes.string,
  tolerance: PropTypes.number,
  zoom: PropTypes.number,
  drawChildren: PropTypes.bool,
  drawGrandChildren: PropTypes.bool,
  drawProfile: PropTypes.bool,
  geoLevel: PropTypes.string,
  geoCode: PropTypes.string,
  codeType: PropTypes.string,
  scoreLabel: PropTypes.string,
  filterCountries: PropTypes.arrayOf(PropTypes.string),
  generation: PropTypes.string,
  tileLayer: PropTypes.shape({ addTo: PropTypes.func }),
  geoLayerFocusStyle: PropTypes.shape({}),
  geoLayerBlurStyle: PropTypes.shape({}),
  geoLayerHoverStyle: PropTypes.shape({}),
  onClickGeoLayer: PropTypes.func,
  geoIndexMapping: PropTypes.arrayOf(PropTypes.shape({})),
};

MapIt.defaultProps = {
  width: "100%",
  height: "100%",
  indexColor: undefined,
  id: undefined,
  url: undefined,
  tolerance: undefined,
  zoom: undefined,
  drawChildren: undefined,
  drawGrandChildren: undefined,
  drawProfile: undefined,
  geoLevel: undefined,
  geoCode: undefined,
  codeType: undefined,
  filterCountries: undefined,
  generation: undefined,
  tileLayer: undefined,
  geoLayerFocusStyle: undefined,
  geoLayerBlurStyle: undefined,
  geoLayerHoverStyle: undefined,
  onClickGeoLayer: undefined,
  geoIndexMapping: undefined,
  scoreLabel: undefined,
};

export default MapIt;
