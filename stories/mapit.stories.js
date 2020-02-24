import React, { useCallback, useState, useRef } from 'react';
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
import { countries } from '@hurumap/config';
import MapIt from '@hurumap/mapit';
import { CenterDecorator } from './common';

storiesOf('HURUmap UI|MapIt/Geography', module)
  .addDecorator(CenterDecorator)
  .addDecorator(withKnobs)
  .add('ContinentRoot', () => (
    <MapIt
      height="100vh"
      tolerance={number('tolerance', 0.01)}
      url={text('url', 'https://mapit.hurumap.org')}
      drawChildren={boolean('drawChildren', true)}
      filterCountries={array(
        'filterCountries',
        countries.map(c => c.iso_code)
      )}
      drawProfile={boolean('drawProfile', false)}
      codeType={text('codeType', 'AFR')}
      geoLevel={text('geoLevel', 'continent')}
      geoCode={text('geoCode', 'AFR')}
      zoom={number('zoom', 3)}
      center={array('center', [8.7832, 34.5085])}
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
  .add('CountryRoot', () =>
    React.createElement(() => {
      /**
       * If tileLayer keeps changing it will trigger rerender
       */
      const tileLayer = useRef(
        new TileLayer(
          text(
            'tileLayer',
            'https://server.arcgisonline.com/ArcGIS/rest/services/Canvas/World_Light_Gray_Base/MapServer/tile/{z}/{y}/{x}'
          )
        )
      );
      /**
       * If onClickLayer keeps changing it will trigger rerender
       */
      const onClickLayer = useCallback(action('onClickGeoLayer'), []);
      return (
        <MapIt
          height="100vh"
          tolerance={number('tolerance', 0.001)}
          url={text('url', 'https://mapit.hurumap.org')}
          drawChildren={boolean('drawChildren', true)}
          filterCountries={array('filterCountries', [])}
          drawProfile={boolean('drawProfile', false)}
          codeType={text('codeType', 'KEN')}
          geoLevel={text('geoLevel', 'country')}
          geoCode={text('geoCode', 'KE')}
          zoom={number('zoom', 3)}
          center={array('center', [8.7832, 34.5085])}
          tileLayer={tileLayer.current}
          geoLayerBlurStyle={object('geoLayerBlurStyle', {
            color: '#00d',
            fillColor: '#ccc',
            weight: 1.0,
            opacity: 0.3,
            fillOpacity: 0.3
          })}
          onClickGeoLayer={onClickLayer}
        />
      );
    })
  )
  .add('DefaultProfile', () => (
    <MapIt
      height="100vh"
      tolerance={number('tolerance', 0.001)}
      url={text('url', 'https://mapit.hurumap.org')}
      drawChildren={boolean('drawChildren', false)}
      filterCountries={array('filterCountries', [])}
      drawProfile={boolean('drawProfile', true)}
      codeType={text('codeType', 'AFR')}
      geoLevel={text('geoLevel', 'level1')}
      geoCode={text('geoCode', 'KE_1_008')}
      zoom={number('zoom', 3)}
      center={array('center', [8.7832, 34.5085])}
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
  .add('ProfileChildren', () => (
    <MapIt
      height="100vh"
      tolerance={number('tolerance', 0.001)}
      url={text('url', 'https://mapit.hurumap.org')}
      drawChildren={boolean('drawChildren', true)}
      filterCountries={array('filterCountries', [])}
      drawProfile={boolean('drawProfile', true)}
      codeType={text('codeType', 'TZA')}
      geoLevel={text('geoLevel', 'district')}
      geoCode={text('geoCode', '85')}
      zoom={number('zoom', 6)}
      center={array('center', [-6.1523563, 35.6754813])}
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
