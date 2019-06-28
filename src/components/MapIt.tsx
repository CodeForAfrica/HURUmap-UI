import { withStyles } from '@material-ui/core';
// tslint:disable-next-line: no-submodule-imports
import { createStyles, Theme, WithStyles } from '@material-ui/core/styles';
import React, { useEffect, useState } from 'react';

import withTheme from '../withTheme';

import leaflet, { MapOptions } from 'leaflet';

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

interface IMapItProps extends WithStyles<typeof styles>, MapOptions {
  id?: string;
  mapitUrl?: string;
  mapitCodeType?: string;
  countryCodes?: string[];
}

function MapIt({
  id,
  classes,
  mapitUrl = 'https://mapit.hurumap.org',
  mapitCodeType = 'AFR',
  countryCodes = ['KE', 'ZA'],
  ...leafletProps
}: IMapItProps) {
  const mapId = id || 'mapit';
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

    leaflet
      .tileLayer(
        // tslint:disable-next-line: max-line-length
        'https://server.arcgisonline.com/ArcGIS/rest/services/Canvas/World_Light_Gray_Base/MapServer/tile/{z}/{y}/{x}',
        {
          attribution: 'Tiles &copy; Esri &mdash; Esri, DeLorme, NAVTEQ'
        }
      )
      .addTo(map);

    loadGeometryForLevel('country', 'KE', '1').then(features => {
      drawFeatures(map, features);
    });
  }, []);

  const fetchGeoCodes = (
    level: string,
    geoCode: string,
    generation: string
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
    geoCode: string,
    generation: string
  ): Promise<any> => {
    return fetchGeoCodes(level, geoCode, generation).then(
      ({ type: areaType, country }) => {
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

            return fetch(`${mapitUrl}/areas/${areaKeys}.geojson`).then(
              geoRes => {
                if (!geoRes.ok) return Promise.reject();
                return geoRes.json().then(({ features }) => {
                  if (features) {
                    Object.values(features).forEach((feature: any) => {
                      feature.properties.area_type = areaType;
                      feature.properties.country_code = areaCountry;
                    });

                    return features;
                  }
                  return [];
                });
              }
            );
          });
        });
      }
    );
  };

  const loadGeometryForChildLevel = () => {};

  const drawFeatures = (map: leaflet.Map, features: any) => {
    return leaflet
      .geoJSON(features, {
        // style: this.layerStyle,
        onEachFeature: (feature, layer) => {
          // layer.bindLabel(feature.properties.name, {direction: 'auto', className: 'map-tooltip'});
          // layer.on('mouseover', function() {
          //     layer.setStyle(self.hoverStyle);
          // });
          // layer.on('mouseout', function() {
          //     layer.setStyle(self.layerStyle);
          // });
          // layer.on('click', function() {
          //   var uri = '/areas/'+ feature.properties.name.toLowerCase() + '?generation=1' + '&type=';
          //   uri = uri + feature.properties.area_type.toUpperCase();
          //   if (feature.properties.country_code)
          //     uri = uri +  '&country='+ feature.properties.country_code;
          //   fetch(`${mapitUrl}/`,  function(error, data) {
          //     if (error) return console.warn(error);
          //     var featureInfo = Object.values(data);
          //     var geo_id = featureInfo[0]['codes'][mapitCodeType];
          //     //var geo_level = featureInfo[0]['type'];
          //     window.location = '/profiles/' + geo_id + '/';
          //   });
          // });
        }
      })
      .addTo(map);
  };

  return <div id={mapId} className={classes.root} />;
}

export default withTheme(withStyles(styles)(MapIt));
