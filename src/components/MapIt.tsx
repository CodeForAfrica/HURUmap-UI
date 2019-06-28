import { withStyles } from '@material-ui/core';
// tslint:disable-next-line: no-submodule-imports
import { createStyles, Theme, WithStyles } from '@material-ui/core/styles';
import React, { useEffect } from 'react';

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
}

function MapIt({ id, classes, ...leafletProps }: IMapItProps) {
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
  }, []);
  return <div id={mapId} className={classes.root} />;
}

export default withTheme(withStyles(styles)(MapIt));
