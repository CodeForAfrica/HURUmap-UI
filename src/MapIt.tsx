import { withStyles } from '@material-ui/core';
import { createStyles, Theme, WithStyles } from '@material-ui/core/styles';
import React, { useEffect, useRef, useCallback } from 'react';

import leaflet, {
  MapOptions,
  PathOptions,
  TileLayer,
  LatLngBounds
} from 'leaflet';

import 'leaflet/dist/leaflet.css';

const styles = (theme: Theme) => {
  return createStyles({
    root: {
      height: '100%',
      width: '100%'
    }
  });
};

export interface Geography {
  geo_code: string;
  child_level: string;
  version: string;
  short_name: string;
  name: string;
  full_name: string;
  parent_geoid: string;
  full_geoid: string;
  square_kms: number;
  geo_level: string;
}

interface MapItProps extends WithStyles<typeof styles>, MapOptions {
  id?: string;
  url?: string;
  loadChildren?: boolean;
  drawProfile?: boolean;
  geography?: Geography;
  codeType?: string;
  countryCode?: string;
  loadCountries?: string[];
  generation?: string;
  tileLayer?: TileLayer;
  geoLayerFocusStyle?: PathOptions;
  geoLayerBlurStyle?: PathOptions;
  geoLayerHoverStyle?: {};
  onClickGeoLayer?: (geoID: string) => void;
}

function MapIt({
  id,
  classes,
  url = 'https://mapit.hurumap.org',
  generation = '1',
  loadChildren,
  drawProfile,
  geography,
  codeType,
  countryCode,
  loadCountries = ['KE', 'ZA'],
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
    (
      areaKeys: string,
      areas: {
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
      }[]
    ): any => {
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

  const loadGeometryForGeo = useCallback(
    (geoLevel: string, geoCode: string): Promise<any> => {
      return fetch(`${url}/code/${codeType}/${geoLevel}-${geoCode}`).then(
        areaRes => {
          if (!areaRes.ok) return Promise.reject();
          return areaRes.json().then(data => {
            return fetch(`${url}/area/${data.id}.geojson`).then(geoRes => {
              if (!geoRes.ok) return Promise.reject();
              return geoRes.json().then(feature => {
                return feature
                  ? {
                      ...feature,
                      properties: {
                        ...feature.properties,
                        ...data
                      }
                    }
                  : {};
              });
            });
          });
        }
      );
    },
    [codeType, url]
  );

  async function fetchAreaType(geoLevel: string, geoCode: string) {
    const areaRes = await fetch(
      `${url}/code/${codeType}/${geoLevel}-${geoCode}`
    );
    return areaRes.json();
  }

  const loadGeometryForLevel = useCallback(
    (geoLevel: string, geoCode: string): Promise<any> => {
      // geo_level do not always match to mapit area type
      // AFR geo_level are level1_TZ_001 while mapit area type are specific ie PROVINCE, REGION, COUNTY
      // Using the geoid (geoLevel-geoCode) we will first request mapit api to give us=> mapit type of a specific geo
      return fetchAreaType(geoLevel, geoCode).then(area => {
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
    },
    [fetchAreaType, fetchGeoJson, generation, url]
  );

  const loadGeometryForChildLevel = useCallback(
    (areaId: string): Promise<any> => {
      return fetch(`${url}/area/${areaId}/children`).then(areasRes => {
        if (!areasRes.ok) return Promise.reject();

        return areasRes.json().then((data: { [key: string]: any }) => {
          const areaKeys = Object.keys(data).join();

          return fetchGeoJson(areaKeys, Object.values(data));
        });
      });
    },
    [fetchGeoJson, url]
  );

  const loadGeometryForCountryLevel = useCallback((): Promise<any> => {
    return fetch(
      `${url}/areas/COUNTRY?generation=${generation}&country=${loadCountries.join()}`
    ).then(areasRes => {
      if (!areasRes.ok) return Promise.reject();

      return areasRes.json().then((data: { [key: string]: any }) => {
        const areaKeys = Object.keys(data).join();

        if (loadChildren) {
          return Promise.all(
            Object.values(data).map(area => {
              return loadGeometryForChildLevel(area.id);
            })
          );
        }

        return fetchGeoJson(areaKeys, Object.values(data));
      });
    });
  }, [
    fetchGeoJson,
    generation,
    loadChildren,
    loadCountries,
    loadGeometryForChildLevel,
    url
  ]);

  const drawFocusFeature = useCallback(
    (map: leaflet.Map, feature: any) => {
      const layer = leaflet.geoJSON(feature, {
        style: geoLayerFocusStyle
      });
      map.addLayer(layer);
      map.fitBounds(layer.getBounds());
    },
    [geoLayerFocusStyle]
  );

  const drawFeatures = useCallback(
    (map: leaflet.Map, features: any) => {
      return leaflet
        .geoJSON(features, {
          onEachFeature: (feature, layer: any) => {
            layer.bindTooltip(feature.properties.name, { direction: 'auto' });
            layer.on('mouseover', () => {
              layer.setStyle(geoLayerHoverStyle);
            });
            layer.on('mouseout', () => {
              layer.setStyle(geoLayerBlurStyle);
            });
            layer.on('click', () => {
              if (onClickGeoLayer) {
                const info = feature.properties;
                onClickGeoLayer(info);
              }
            });
            layer.setStyle(geoLayerBlurStyle);
          }
        })
        .addTo(map);
    },
    [geoLayerHoverStyle, geoLayerBlurStyle, onClickGeoLayer]
  );

  const load = useCallback(() => {
    const map = mapRef.current;
    if (!map) {
      console.error('Map not loaded!');
      return;
    }
    if (drawProfile) {
      const geoLevel = geography ? geography.geo_level : '';
      const geoCode = geography ? geography.geo_code : '';
      const childLevel = geography ? geography.child_level : '';
      let areaID = '';

      loadGeometryForGeo(geoLevel, geoCode)
        .then(feature => {
          areaID = feature.properties.id;
          return drawFocusFeature(map, feature);
        })
        .then(() => {
          if (loadChildren && childLevel !== '') {
            loadGeometryForChildLevel(areaID).then(childrenFeatures => {
              drawFeatures(map, childrenFeatures);
            });
          }
        });

      loadGeometryForLevel(geoLevel, geoCode).then(features => {
        drawFeatures(map, features);
      });
    } else {
      loadGeometryForCountryLevel().then(features => {
        if (loadChildren) {
          const layers: leaflet.GeoJSON[] = features.map((f: any) => {
            return drawFeatures(map, f);
          });
        } else {
          const layer = drawFeatures(map, features);

          map.fitBounds(layer.getBounds());
        }
      });
    }
  }, [
    drawProfile,
    geography,
    loadGeometryForGeo,
    loadGeometryForLevel,
    drawFocusFeature,
    loadChildren,
    loadGeometryForChildLevel,
    drawFeatures,
    loadGeometryForCountryLevel
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
