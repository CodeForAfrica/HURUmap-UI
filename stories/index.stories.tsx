import React from 'react';
import { Grid } from '@material-ui/core';
import { storiesOf, RenderFunction } from '@storybook/react';
import {
  withKnobs,
  text,
  object,
  number,
  array,
  boolean
} from '@storybook/addon-knobs';
import { action } from '@storybook/addon-actions';

import { TileLayer } from 'leaflet';
import { BarChart, MapIt } from '../src';

const CenterDecorator = (storyFn: RenderFunction) => (
  <Grid
    container
    justify="center"
    alignItems="center"
    style={{ width: '100%', height: '500px', overflow: 'hidden' }}
  >
    {storyFn()}
  </Grid>
);

storiesOf('Hurumap UI|MapIt/Continent', module)
  .addDecorator(CenterDecorator)
  .addDecorator(withKnobs)
  .add('Default', () => (
    <MapIt
      url={text('url', 'https://mapit.hurumap.org')}
      loadChildren={boolean('loadChildren', false)}
      loadCountries={array('countryCodes', ['KE', 'ZA', 'TZ'])}
      zoom={number('zoom', 3)}
      center={array('center', [8.7832, 34.5085]) as [number, number]}
      tileLayer={
        new TileLayer(
          text(
            'tileLayer',
            'https://server.arcgisonline.com/ArcGIS/rest/services/Canvas/World_Light_Gray_Base/MapServer/tile/{z}/{y}/{x}'
          )
        )
      }
      geoLayerStyle={object('geoLayerStyle', {
        color: '#00d',
        fillColor: '#ccc',
        weight: 1.0,
        opacity: 0.3,
        fillOpacity: 0.3
      })}
      onClickGeoLayer={action('onClickGeoLayer')}
    />
  ))
  .add('Default + Children', () => (
    <MapIt
      url={text('url', 'https://mapit.hurumap.org')}
      loadChildren={boolean('loadChildren', true)}
      loadCountries={array('countryCodes', ['KE', 'ZA', 'TZ'])}
      zoom={number('zoom', 3)}
      center={array('center', [8.7832, 34.5085]) as [number, number]}
      tileLayer={
        new TileLayer(
          text(
            'tileLayer',
            'https://server.arcgisonline.com/ArcGIS/rest/services/Canvas/World_Light_Gray_Base/MapServer/tile/{z}/{y}/{x}'
          )
        )
      }
      geoLayerStyle={object('geoLayerStyle', {
        color: '#00d',
        fillColor: '#ccc',
        weight: 1.0,
        opacity: 0.3,
        fillOpacity: 0.3
      })}
      onClickGeoLayer={action('onClickGeoLayer')}
    />
  ));

storiesOf('Hurumap UI|MapIt/Country', module)
  .addDecorator(CenterDecorator)
  .addDecorator(withKnobs)
  .add('Default', () => (
    <MapIt
      url={text('url', 'https://mapit.hurumap.org')}
      loadChildren={boolean('loadChildren', false)}
      loadCountries={array('countryCodes', ['KE'])}
      zoom={number('zoom', 3)}
      center={array('center', [8.7832, 34.5085]) as [number, number]}
      tileLayer={
        new TileLayer(
          text(
            'tileLayer',
            'https://server.arcgisonline.com/ArcGIS/rest/services/Canvas/World_Light_Gray_Base/MapServer/tile/{z}/{y}/{x}'
          )
        )
      }
      geoLayerStyle={object('geoLayerStyle', {
        color: '#00d',
        fillColor: '#ccc',
        weight: 1.0,
        opacity: 0.3,
        fillOpacity: 0.3
      })}
      onClickGeoLayer={action('onClickGeoLayer')}
    />
  ))
  .add('Default + Children', () => (
    <MapIt
      url={text('url', 'https://mapit.hurumap.org')}
      loadChildren={boolean('loadChildren', true)}
      loadCountries={array('countryCodes', ['KE'])}
      zoom={number('zoom', 3)}
      center={array('center', [8.7832, 34.5085]) as [number, number]}
      tileLayer={
        new TileLayer(
          text(
            'tileLayer',
            'https://server.arcgisonline.com/ArcGIS/rest/services/Canvas/World_Light_Gray_Base/MapServer/tile/{z}/{y}/{x}'
          )
        )
      }
      geoLayerStyle={object('geoLayerStyle', {
        color: '#00d',
        fillColor: '#ccc',
        weight: 1.0,
        opacity: 0.3,
        fillOpacity: 0.3
      })}
      onClickGeoLayer={action('onClickGeoLayer')}
    />
  ));

storiesOf('Hurumap UI|Charts/BarChart', module)
  .addDecorator(CenterDecorator)
  .addDecorator(withKnobs)
  .add('Default', () => <BarChart />);
