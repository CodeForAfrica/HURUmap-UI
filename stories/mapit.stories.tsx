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
  ))
  .add('Focused Child', () => (
    <MapIt
      url={text('url', 'https://mapit.hurumap.org')}
      focusOn={number('focusOn', 13)}
      loadChildren={boolean('loadChildren', true)}
      loadCountries={array('loadCountries', ['TZ'])}
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
      geoLayerFocusStyle={object('geoLayerFocusStyle', {
        color: '#ccc',
        fillColor: '#0f0',
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
      codeType={text('codeType', 'KEN')}
      countryCode={text('codeType', 'KE')}
      geography={object('geography', {
        this: {
          geo_code: "8",
          child_level: null,
          version: "2009",
          short_name: "Wajir",
          name: "Wajir",
          full_name: "Wajir",
          parent_geoid: "country-KE",
          full_geoid: "county-8",
          square_kms: 55840.6,
          geo_level: "county"
        },
        parents: {
          country: {
            geo_code: "KE",
            child_level: "county",
            version: "2009",
            short_name: "Kenya",
            name: "Kenya",
            full_name: "Kenya",
            parent_geoid: null,
            full_geoid: "country-KE",
            square_kms: 581309,
            geo_level: "country"
          }
        },
        comparatives: [
          "country"
         ]
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
  .add('Focused Child', () => (
    <MapIt
      url={text('url', 'https://mapit.hurumap.org')}
      focusOn={number('focusOn', 13)}
      loadChildren={boolean('loadChildren', true)}
      loadCountries={array('loadCountries', ['TZ'])}
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
      geoLayerFocusStyle={object('geoLayerFocusStyle', {
        color: '#ccc',
        fillColor: '#0f0',
        weight: 1.0,
        opacity: 0.3,
        fillOpacity: 0.3
      })}
      onClickGeoLayer={action('onClickGeoLayer')}
    />
  ));


