import { withStyles } from '@material-ui/core';
// tslint:disable-next-line: no-submodule-imports
import { createStyles, Theme, WithStyles } from '@material-ui/core/styles';
import React, { useEffect } from 'react';

import leaflet, { MapOptions, TileLayerOptions, PathOptions } from 'leaflet';

// tslint:disable-next-line: no-submodule-imports
import 'leaflet/dist/leaflet.css';

const styles = (theme: Theme) => {
  return createStyles({
    root: {
      height: '100%',
      width: '100%'
    }
  });
};

interface MapItProps extends WithStyles<typeof styles>, MapOptions {
  id?: string;
  mapitUrl?: string;
  mapitCodeType?: string;
  generation?: string;
  countryCodes?: string[];
  tileTemplate?: string;
  tileOptions?: TileLayerOptions;
  geoLayerStyle?: PathOptions;
  geoLayerHoverStyle?: {};
  onClickGeoLayer?: (link: string) => void;
}

function MapIt({
  id,
  classes,
  mapitUrl = 'https://mapit.hurumap.org',
  mapitCodeType = 'AFR',
  generation = '1',
  countryCodes = ['KE', 'ZA'],
  tileTemplate = 'https://server.arcgisonline.com/ArcGIS/rest/services/Canvas/World_Light_Gray_Base/MapServer/tile/{z}/{y}/{x}',
  tileOptions = {
    attribution: 'Tiles &copy; Esri &mdash; Esri, DeLorme, NAVTEQ'
  },
  geoLayerStyle = {
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

  const fetchGeoCodes = (
    level: string,
    geoCode: string
  ): Promise<{ type: string; country: string }> => {
    return fetch(
      `${mapitUrl}/code/${mapitCodeType}/${level}-${geoCode}?generation=${generation}`
    ).then(codesRes => {
      if (!codesRes.ok) return Promise.reject();
      return codesRes.json();
    });
  };

  const loadGeometryForLevel = (
    level: string,
    geoCode: string
  ): Promise<any> => {
    return fetchGeoCodes(level, geoCode).then(({ type: areaType, country }) => {
      // If we need to draw country level let's not filter with country
      const areaCountry = level === 'country' ? '' : country;

      return fetch(
        `${mapitUrl}/areas/${areaType}?generation=${generation}&country=${areaCountry}`
      ).then(areasRes => {
        if (!areasRes.ok) return Promise.reject();

        return areasRes.json().then(data => {
          let areaKeys = Object.keys(data).join();
          // If area_type is country, then filter to only dominion countries
          if (areaType === 'COUNTRY') {
            areaKeys = (Object.values(data) as any[])
              .filter(({ country: countryCode }) =>
                countryCodes.includes(countryCode)
              )
              .map(area => area.id)
              .join();
          }

          return fetch(`${mapitUrl}/areas/${areaKeys}.geojson`).then(geoRes => {
            if (!geoRes.ok) return Promise.reject();
            return geoRes.json().then(({ features }) => {
              if (features) {
                return features.map((feature: any) => ({
                  ...feature,
                  properties: {
                    ...feature.properties,
                    // eslint-disable-next-line
                    area_type: areaType,
                    // eslint-disable-next-line
                    country_code: areaCountry
                  }
                }));
              }
              return [];
            });
          });
        });
      });
    });
  };

  const loadGeometryForChildLevel = () => {};

  const getFeatureInfo = (data: any) =>
    Object.values(data)[0] as {
      parent_area: number;
      generation_high: number;
      all_names: {};
      id: number;
      codes: { [key: string]: string };
      name: string;
      country: string;
      type_name: string;
      generation_low: number;
      country_name: string;
      type: string;
    };

  const drawFeatures = (map: leaflet.Map, features: any) => {
    return leaflet
      .geoJSON(features, {
        onEachFeature: (feature, layer: leaflet.Path) => {
          layer.bindTooltip(feature.properties.name);
          layer.on('mouseover', () => {
            layer.setStyle(geoLayerHoverStyle);
          });
          layer.on('mouseout', () => {
            layer.setStyle(geoLayerStyle);
          });
          layer.on('click', () => {
            let uri = `${mapitUrl}/areas/${feature.properties.name.toLowerCase()}?generation=${generation}&type=${feature.properties.area_type.toUpperCase()}`;
            if (feature.properties.country_code) {
              uri += `&country=${feature.properties.country_code}`;
            }
            fetch(uri).then(res => {
              if (!res.ok) return;
              res.json().then(featureInfo => {
                const geoID = getFeatureInfo(featureInfo).codes[mapitCodeType];

                if (onClickGeoLayer) {
                  onClickGeoLayer(`/profiles/${geoID}/`);
                } else {
                  window.location.href = `/profiles/${geoID}/`;
                }
              });
            });
          });
        }
      })
      .setStyle(geoLayerStyle)
      .addTo(map);
  };

  useEffect(() => {
    const map = leaflet.map(mapId, {
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

    if (map.dragging) {
      map.addControl(
        new leaflet.Control.Zoom({
          position: 'bottomright'
        })
      );
    }

    leaflet.tileLayer(tileTemplate, tileOptions).addTo(map);

    loadGeometryForLevel('country', 'KE').then(features => {
      drawFeatures(map, features);
    });
  }, [
    mapId,
    leafletProps,
    loadGeometryForLevel,
    tileTemplate,
    tileOptions,
    drawFeatures
  ]);

  return <div id={mapId} className={classes.root} />;
}

export default withStyles(styles)(MapIt);
