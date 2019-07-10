import { withStyles } from '@material-ui/core';
import { createStyles, WithStyles } from '@material-ui/core/styles';
import React, { useEffect, useRef, useCallback } from 'react';

import leaflet, { MapOptions, PathOptions, TileLayer } from 'leaflet';

import 'leaflet/dist/leaflet.css';

const styles = createStyles({
  root: {
    height: '100%',
    width: '100%'
  }
});

interface Area {
  id: string;
  name: string;
  generation_high: number;
  generation_low: number;
  all_names: {};
  codes: { [key: string]: string };
  country: string;
  country_name: string;
  type_name: string;
  type: string;
}

interface MapItProps extends WithStyles<typeof styles>, MapOptions {
  id?: string;
  url?: string;
  drawChildren?: boolean;
  drawProfile?: boolean;
  geoLevel?: string;
  geoCode?: string;
  codeType?: string;
  filterCountries?: string[];
  generation?: string;
  tileLayer?: TileLayer;
  geoLayerFocusStyle?: PathOptions;
  geoLayerBlurStyle?: PathOptions;
  geoLayerHoverStyle?: {};
  onClickGeoLayer?: (area: Area) => void;
}

function MapIt({
  id,
  classes,
  url = 'https://mapit.hurumap.org',
  generation = '1',
  drawChildren,
  drawProfile,
  geoCode,
  geoLevel,
  codeType,
  filterCountries = ['KE', 'ZA'],
  tileLayer,
  geoLayerFocusStyle = {
    color: '#777',
    fillColor: '#0F0',
    weight: 2,
    opacity: 0.3,
    fillOpacity: 0.5
  },
  geoLayerBlurStyle = {
    color: '#00d',
    fillColor: '#ccc',
    weight: 1.0,
    opacity: 0.3,
    fillOpacity: 0.3
  },
  geoLayerHoverStyle = {
    fillColor: '#ccc',
    fillOpacity: 0.7
  },
  onClickGeoLayer,
  ...leafletProps
}: MapItProps) {
  const mapId = id || 'mapit';
  const mapRef = useRef<leaflet.Map | null>(null);

  // The `extra` parameter is an object with properties that are not returned in a geojson call
  // The geojson only returns the name in the properties which is not sufficient
  // in retrieving the are information on click.
  //
  // We append the area information after the geojson is received to avoid another load
  // But also to have sufficient data to use like the `id` if we want to retrieve
  // more data using an api call
  const fetchGeoJson = useCallback(
    (areaKeys: string, areas: Area[]): any => {
      return fetch(`${url}/areas/${areaKeys}.geojson`).then(geoRes => {
        if (!geoRes.ok) return Promise.reject();
        return geoRes.json().then(({ features }) => {
          return features
            ? features.map((feature: { properties: { name: string } }) => {
                const areaInfo = areas.find(
                  area => area.name === feature.properties.name
                );
                return {
                  ...feature,
                  properties: {
                    ...feature.properties,
                    ...areaInfo
                  }
                };
              })
            : [];
        });
      });
    },
    [url]
  );
  async function fetchMapitArea() {
    const areaRes = await fetch(
      `${url}/code/${codeType}/${geoLevel}-${geoCode}?generation=${generation}`
    );
    return areaRes.json();
  }

  const loadGeometryForLevel = useCallback((): Promise<any> => {
    // geo_level do not always match to mapit area type
    // AFR geo_level are level1_TZ_001 while mapit area type are specific ie PROVINCE, REGION, COUNTY
    // Using the geoid (geoLevel-geoCode) we will first request mapit api to give us=> mapit type of a specific geo
    return fetchMapitArea().then(area => {
      const { country, type } = area;
      return fetch(
        `${url}/areas/${type}?generation=${generation}&country=${country}`
      ).then(areaRes => {
        if (!areaRes.ok) return Promise.reject();

        return areaRes.json().then((data: { [key: string]: any }) => {
          const areaKeys = Object.keys(data).join();

          return fetchGeoJson(areaKeys, Object.values(data));
        });
      });
    });
  }, [fetchMapitArea, fetchGeoJson, generation, url]);

  const loadGeometryForChildLevel = useCallback(
    (areaId: string): Promise<any> => {
      return fetch(`${url}/area/${areaId}/children`).then(areasRes => {
        if (!areasRes.ok) return Promise.reject();

        return areasRes.json().then((data: { [key: string]: any }) => {
          let areaData = data;
          if (
            filterCountries.length > 0 &&
            !drawProfile &&
            geoLevel === 'continent'
          ) {
            areaData = Object.entries(data)
              .filter(area => {
                return filterCountries.includes(area[1].country);
              })
              .reduce((accum: { [key: string]: any }, [k, v]) => {
                return Object.assign({}, accum, { [k]: v });
              }, {});
          }
          const areaKeys = Object.keys(areaData).join();

          return fetchGeoJson(areaKeys, Object.values(areaData));
        });
      });
    },
    [url, filterCountries, drawProfile, geoLevel, fetchGeoJson]
  );

  const drawFeatures = useCallback(
    (map: leaflet.Map, features: any) => {
      return leaflet
        .geoJSON(features, {
          onEachFeature: (feature, layer: any) => {
            if (
              drawProfile &&
              `${geoLevel}-${geoCode}` ===
                feature.properties.codes[codeType || 'AFR']
            ) {
              layer.setStyle(geoLayerFocusStyle);
              map.fitBounds(layer.getBounds());
            } else {
              layer.bindTooltip(feature.properties.name, { direction: 'auto' });
              layer.on('mouseover', () => {
                layer.setStyle(geoLayerHoverStyle);
              });
              layer.on('mouseout', () => {
                layer.setStyle(geoLayerBlurStyle);
              });
              layer.on('click', () => {
                if (onClickGeoLayer) {
                  onClickGeoLayer(feature.properties);
                }
              });
              layer.setStyle(geoLayerBlurStyle);
            }
          }
        })
        .addTo(map);
    },
    [
      drawProfile,
      geoLevel,
      geoCode,
      codeType,
      geoLayerFocusStyle,
      geoLayerBlurStyle,
      geoLayerHoverStyle,
      onClickGeoLayer
    ]
  );

  const load = useCallback(() => {
    const map = mapRef.current;
    if (!map) {
      console.error('Map not loaded!');
      return;
    }
    // if we are not on a profile page, then we are on homepage or country page
    // where no specific geography is focused, only child levels of the root geography are drawn
    // For normal hurumap apps, the root geo is country, so we draw all it's child level
    // And for apps like dominion/takwimu, we start at a continent level and we draw its all child level (country)
    // but not all child levels are supposed to be drawn (i.e mapit has ethiopia as child of continent but we don't have dominion ethiopia)
    // so in this case we will filter using loadCountrries
    if (drawProfile) {
      loadGeometryForLevel()
        .then(features => {
          drawFeatures(map, features);
        })
        .then(() => {
          if (drawChildren) {
            fetchMapitArea().then(area => {
              loadGeometryForChildLevel(area.id).then(childrenFeatures => {
                drawFeatures(map, childrenFeatures);
              });
            });
          }
        });
    } else {
      fetchMapitArea().then(area => {
        return loadGeometryForChildLevel(area.id).then(childrenFeatures => {
          const layer = drawFeatures(map, childrenFeatures);
          map.fitBounds(layer.getBounds());
        });
      });
    }
  }, [
    drawProfile,
    loadGeometryForLevel,
    drawChildren,
    fetchMapitArea,
    loadGeometryForChildLevel,
    drawFeatures
  ]);

  useEffect(() => {
    if (mapRef.current) {
      mapRef.current.remove();
    }

    mapRef.current = leaflet.map(mapId, {
      boxZoom: false,
      doubleClickZoom: false,
      dragging: true,
      keyboard: false,
      scrollWheelZoom: false,
      touchZoom: false,
      zoomControl: false,
      center: [0, 0],
      zoom: 3,
      ...leafletProps
    });

    const map = mapRef.current;

    if (map.dragging) {
      map.addControl(
        new leaflet.Control.Zoom({
          position: 'bottomright'
        })
      );
    }

    if (tileLayer) {
      tileLayer.addTo(map);
    } else {
      leaflet
        .tileLayer(
          'https://server.arcgisonline.com/ArcGIS/rest/services/Canvas/World_Light_Gray_Base/MapServer/tile/{z}/{y}/{x}',
          {
            attribution: 'Tiles &copy; Esri &mdash; Esri, DeLorme, NAVTEQ'
          }
        )
        .addTo(map);
    }

    load();
  }, [mapId, leafletProps, tileLayer, load]);

  return <div id={mapId} className={classes.root} />;
}

export default withStyles(styles)(MapIt);
