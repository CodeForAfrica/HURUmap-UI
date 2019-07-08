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

storiesOf('Hurumap UI|MapIt/Continent', module)
  .addDecorator(CenterDecorator)
  .addDecorator(withKnobs)
  .add('Default', () => (
    <MapIt
      url={text('url', 'https://mapit.hurumap.org')}
      loadChildren={boolean('loadChildren', false)}
      loadCountries={array('loadCountries', ['KE', 'ZA', 'TZ'])}
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
      loadCountries={array('loadCountries', ['KE', 'ZA', 'TZ'])}
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
  ));

storiesOf('Hurumap UI|MapIt/Country', module)
  .addDecorator(CenterDecorator)
  .addDecorator(withKnobs)
  .add('Default', () => (
    <MapIt
      url={text('url', 'https://mapit.hurumap.org')}
      loadChildren={boolean('loadChildren', false)}
      loadCountries={array('loadCountries', ['KE'])}
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
      loadCountries={array('loadCountries', ['KE'])}
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
  ));

  storiesOf('Hurumap UI|MapIt/Geography', module)
  .addDecorator(CenterDecorator)
  .addDecorator(withKnobs)
  .add('Default', () => (
    <MapIt
      url={text('url', 'https://mapit.hurumap.org')}
      loadChildren={boolean('loadChildren', false)}
      drawProfile={boolean('drawProfile', true)}
      codeType={text('codeType', 'AFR')}
      countryCode={text('countryCode', '')}
      geography={object('geography', {
        geo_code: "KE_1_008",
        child_level: "",
        version: "2009",
        short_name: "Wajir",
        name: "Wajir",
        full_name: "Wajir",
        parent_geoid: "country-KE",
        full_geoid: "level1-KE_1_008",
        square_kms: 28620.0,
        geo_level: "level1"
      })}
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
      drawProfile={boolean('drawProfile', true)}
      codeType={text('codeType', 'TZA')}
      countryCode={text('countryCode', 'TZ')}
      geography={object('geography', {
        geo_code: "85",
        child_level: "ward",
        version: "2009",
        short_name: "Manyoni",
        name: "Manyoni",
        full_name: "Manyoni",
        parent_geoid: "region-27",
        full_geoid: "district-85",
        square_kms: 28620.0,
        geo_level: "district"
      })}
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


