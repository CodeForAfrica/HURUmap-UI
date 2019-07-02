import { withStyles } from '@material-ui/core';
import { createStyles, Theme, WithStyles } from '@material-ui/core/styles';
import React, { useEffect, useRef } from 'react';

import leaflet, { MapOptions, PathOptions, TileLayer } from 'leaflet';

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
  url?: string;
  loadChildren?: boolean;
  loadCountries?: string[];
  codeType?: string;
  generation?: string;
  tileLayer?: TileLayer;
  geoLayerStyle?: PathOptions;
  geoLayerHoverStyle?: {};
  geoLevel?: string;
  onClickGeoLayer?: (geoID: string) => void;
}

function MapIt({
  id,
  classes,
  url = 'https://mapit.hurumap.org',
  codeType = 'AFR',
  geoLevel = 'country',
  generation = '1',
  loadChildren,
  loadCountries = ['KE', 'ZA'],
  tileLayer,
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
  const mapRef = useRef<leaflet.Map | null>(null);

  function fetchGeoJson(areaKeys: string): any {
    return fetch(`${url}/areas/${areaKeys}.geojson`).then(geoRes => {
      if (!geoRes.ok) return Promise.reject();
      return geoRes.json().then(({ features }) => {
        return features || [];
      });
    });
  }

  const loadGeometryForChildLevel = (areaId: string): Promise<any> => {
    return fetch(`${url}/area/${areaId}/children`).then(areasRes => {
      if (!areasRes.ok) return Promise.reject();

      return areasRes.json().then((data: { [key: string]: any }) => {
        const areaKeys = Object.keys(data).join();

        return fetchGeoJson(areaKeys);
      });
    });
  };

  const loadGeometryForCountryLevel = (): Promise<any> => {
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

        return fetchGeoJson(areaKeys);
      });
    });
  };

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
          layer.bindTooltip(feature.properties.name, { direction: 'auto' });
          layer.on('mouseover', () => {
            layer.setStyle(geoLayerHoverStyle);
          });
          layer.on('mouseout', () => {
            layer.setStyle(geoLayerStyle);
          });
          layer.on('click', () => {
            let uri = `${url}/areas/${feature.properties.name.toLowerCase()}?generation=${generation}&type=${feature.properties.area_type.toUpperCase()}`;
            if (feature.properties.country_code) {
              uri += `&country=${feature.properties.country_code}`;
            }
            fetch(uri).then(res => {
              if (!res.ok) return;
              res.json().then(featureInfo => {
                const geoID = getFeatureInfo(featureInfo).codes[codeType];

                if (onClickGeoLayer) {
                  onClickGeoLayer(geoID);
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

    loadGeometryForCountryLevel().then(features => {
      if (loadChildren) {
        features.forEach((f: any) => drawFeatures(map, f));
      } else {
        drawFeatures(map, features);
      }
    });
  }, [
    mapId,
    leafletProps,
    loadGeometryForCountryLevel,
    drawFeatures,
    tileLayer,
    loadChildren
  ]);

  return <div id={mapId} className={classes.root} />;
}

export default withStyles(styles)(MapIt);
