import React from 'react';
import { storiesOf } from '@storybook/react';
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
import { MapIt } from '../src';
import { CenterDecorator } from './common';

  storiesOf('Hurumap UI|MapIt/Geography', module)
  .addDecorator(CenterDecorator)
  .addDecorator(withKnobs)
  .add('RootGeography', () => (
    <MapIt
      url={text('url', 'https://mapit.hurumap.org')}
      loadChildren={boolean('loadChildren', true)}
      loadCountries={array('loadCountries', [])}
      drawProfile={boolean('drawProfile', false)}
      codeType={text('codeType', 'TZA')}
      geoLevel={text('geoLevel', 'country')}
      geoCode={text('geoCode', 'TZ')}
      geoId={text('geoId', 'country-TZ')}
      geoChildLevel={text('geoChildLevel', 'region')}
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
      geoLayerBlurStyle={object('geoLayerBlurStyle', {
        color: '#00d',
        fillColor: '#ccc',
        weight: 1.0,
        opacity: 0.3,
        fillOpacity: 0.3
      })}
      onClickGeoLayer={action('onClickGeoLayer')}
    />
  ))
  .add('Default', () => (
    <MapIt
      url={text('url', 'https://mapit.hurumap.org')}
      loadChildren={boolean('loadChildren', false)}
      loadCountries={array('loadCountries', [])}
      drawProfile={boolean('drawProfile', true)}
      codeType={text('codeType', 'AFR')}
      geoLevel={text('geoLevel', 'level1')}
      geoCode={text('geoCode', 'KE_1_008')}
      geoId={text('geoId', 'level1-KE_1_008')}
      geoChildLevel={text('geoChildLevel', '')}
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
      geoLayerBlurStyle={object('geoLayerBlurStyle', {
        color: '#00d',
        fillColor: '#ccc',
        weight: 1.0,
        opacity: 0.3,
        fillOpacity: 0.3
      })}
      onClickGeoLayer={action('onClickGeoLayer')}
    />
  ))
  .add('Children', () => (
    <MapIt
      url={text('url', 'https://mapit.hurumap.org')}
      loadChildren={boolean('loadChildren', true)}
      loadCountries={array('loadCountries', [])}
      drawProfile={boolean('drawProfile', true)}
      codeType={text('codeType', 'TZA')}
      geoLevel={text('geoLevel', 'district')}
      geoCode={text('geoCode', '85')}
      geoId={text('geoId', 'district-85')}
      geoChildLevel={text('geoChildLevel', 'ward')}
      geoParentLevel={text('geoParentLevel', 'region-27')}
      zoom={number('zoom', 6)}
      center={array('center', [-6.1523563, 35.6754813]) as [number, number]}
      tileLayer={
        new TileLayer(
          text(
            'tileLayer',
            'https://server.arcgisonline.com/ArcGIS/rest/services/Canvas/World_Light_Gray_Base/MapServer/tile/{z}/{y}/{x}'
          )
        )
      }
      geoLayerBlurStyle={object('geoLayerBlurStyle', {
        color: '#00d',
        fillColor: '#ccc',
        weight: 1.0,
        opacity: 0.3,
        fillOpacity: 0.3
      })}
      onClickGeoLayer={action('onClickGeoLayer')}
    />
  ));


