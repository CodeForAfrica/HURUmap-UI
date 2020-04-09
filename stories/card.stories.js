import React, { useState, useEffect } from 'react';
import { storiesOf } from '@storybook/react';
import {
  withKnobs,
  select,
  text,
  object,
  boolean
} from '@storybook/addon-knobs';

import { ApolloProvider } from '@apollo/react-hooks';
import ApolloClient from 'apollo-boost';

import { Card } from '@hurumap-ui/core';
import { CenterDecorator } from './common';

import logo from './assets/hurumap-logo-white.png';

storiesOf('HURUmap UI|Components/Card', module)
  .addDecorator(CenterDecorator)
  .addDecorator(withKnobs)
  .add('Default', () => {
    const [defs, setDefs] = useState([]);
    const width = text('width', '100%');
    const showInsight = boolean('showInsight', true);
    const type = select('type', ['hurumap', 'flourish', 'snippet'], 'hurumap');
    const uri = text('graphql', 'https://graphql.hurumap.org/graphql');
    const def = select(
      'definition',
      defs.map(option =>
        !option || !option.id
          ? 'Use custom'
          : `${option.id} - ${option.title} - ${option.visual &&
              option.visual.type}`
      )
    );
    const definitionsURI = text(
      'definitionsURI',
      'https://dashboard.hurumap.org/wp-json/hurumap-data/charts'
    );
    useEffect(() => {
      fetch(definitionsURI)
        .then(res => res.json())
        .then(setDefs);
    }, [definitionsURI]);
    const geoId = text('geoId', 'country-ZA');
    const hurumapJson = defs.find(x => x.id === def.split('-')[0].trim()) || {
      id: '209',
      stat: {
        type: 'number',
        subtitle: 'Urban vs Rural',
        description: '',
        aggregate: 'sum',
        unique: true,
        style: 'percent',
        queryAlias: 'v209'
      },
      visual: {
        typeProps: [],
        table: 'allHandwashingTypeUrbanrurals',
        type: 'grouped_column',
        aggregate: 'raw',
        x: 'variable2',
        groupBy: 'variable1',
        y: 'value',
        queryAlias: 'v209'
      },
      inGeographies: [
        {
          geoLevel: 'country',
          geoCode: 'ZA',
          squareKms: 1221037,
          parentLevel: 'continent',
          parentCode: 'AFR',
          longName: 'South Africa',
          name: 'South Africa',
          __typename: 'WazimapGeography'
        }
      ],
      title: 'Handwashing type',
      subtitle: 'Urban vs Rural',
      section: '165',
      typeProps: [],
      type: 'hurumap'
    };
    const flourishJson = {
      id: '1234',
      title: 'Flourish Chart',
      description: 'Embeded flourish chart example'
    };
    const definition =
      // eslint-disable-next-line no-nested-ternary
      def !== 'Use custom'
        ? hurumapJson
        : // eslint-disable-next-line no-nested-ternary
        type === 'flourish'
        ? object('Flourish definition', flourishJson)
        : type === 'hurumap'
        ? object('HURUmap definition', hurumapJson)
        : {
            id: '1234',
            title: {
              rendered: 'Snippet Card'
            },
            content: {
              rendered: `<p>
              <img class="alignnone size-full wp-image-72" src="https://miro.medium.com/max/799/1*5EAK6sjyBdhGyvzJrk4utA.png" alt="" style="object-fit: cover;" width="100%" height="214" />
          </p>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
          <p><!--more--></p>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>`
            }
          };
    const shareEndPoint = text('Share EndPoint', '/api/share');

    return (
      <ApolloProvider
        client={
          new ApolloClient({
            uri
          })
        }
      >
        <div style={{ width, height: '100%' }}>
          <Card
            key={JSON.stringify(definition)}
            id={definition.id}
            logo={logo}
            type={type}
            geoId={geoId}
            definition={definition}
            flourishURL=""
            shareEndPoint={shareEndPoint}
            showStatVisual
            showInsight={showInsight}
          />
        </div>
      </ApolloProvider>
    );
  })
  .add('Live Data', () => {
    const [defs, setDefs] = useState([]);
    const width = text('width', '100%');
    const showInsight = boolean('showInsight', true);
    const type = select('type', ['hurumap', 'flourish', 'snippet'], 'hurumap');
    const uri = text('graphql', 'https://graphql.hurumap.org/graphql');
    const def = select(
      'definition',
      defs.map(option =>
        !option || !option.id
          ? 'Use custom'
          : `${option.id} - ${option.title} - ${option.visual &&
              option.visual.type}`
      )
    );
    const definitionsURI = text(
      'definitionsURI',
      'https://dashboard.hurumap.org/wp-json/hurumap-data/charts'
    );
    useEffect(() => {
      fetch(definitionsURI)
        .then(res => res.json())
        .then(setDefs);
    }, [definitionsURI]);
    const geoId = text('geoId', 'country-ZA');
    const hurumapJson = defs.find(
      x => def && x.id === def.split('-')[0].trim()
    ) || {
      id: '209',
      stat: {
        type: 'number',
        subtitle: 'Urban vs Rural',
        description: '',
        aggregate: 'sum',
        unique: true,
        style: 'percent',
        queryAlias: 'v209'
      },
      visual: {
        typeProps: [],
        table: 'allHandwashingTypeUrbanrurals',
        type: 'grouped_column',
        aggregate: 'raw',
        x: 'variable2',
        groupBy: 'variable1',
        y: 'value',
        queryAlias: 'v209'
      },
      inGeographies: [
        {
          geoLevel: 'country',
          geoCode: 'ZA',
          squareKms: 1221037,
          parentLevel: 'continent',
          parentCode: 'AFR',
          longName: 'South Africa',
          name: 'South Africa',
          __typename: 'WazimapGeography'
        }
      ],
      title: 'Handwashing type',
      subtitle: 'Urban vs Rural',
      section: '165',
      typeProps: [],
      type: 'hurumap'
    };
    const flourishJson = {
      id: '1234',
      title: 'Flourish Chart',
      description: 'Embeded flourish chart example'
    };
    const definition =
      // eslint-disable-next-line no-nested-ternary
      def !== 'Use custom'
        ? hurumapJson
        : // eslint-disable-next-line no-nested-ternary
        type === 'flourish'
        ? object('Flourish definition', flourishJson)
        : type === 'hurumap'
        ? object('HURUmap definition', hurumapJson)
        : {
            id: '1234',
            title: {
              rendered: 'Snippet Card'
            },
            content: {
              rendered: `<p>
              <img class="alignnone size-full wp-image-72" src="https://miro.medium.com/max/799/1*5EAK6sjyBdhGyvzJrk4utA.png" alt="" style="object-fit: cover;" width="100%" height="214" />
          </p>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
          <p><!--more--></p>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>`
            }
          };
    const shareEndPoint = text('Share EndPoint', '/api/share');

    return (
      <ApolloProvider
        client={
          new ApolloClient({
            uri
          })
        }
      >
        <div style={{ width, height: '100%' }}>
          <Card
            key={JSON.stringify(definition)}
            id={definition.id}
            logo={logo}
            type={type}
            geoId={geoId}
            definition={definition}
            flourishURL=""
            shareEndPoint={shareEndPoint}
            showStatVisual
            showInsight={showInsight}
          />
        </div>
      </ApolloProvider>
    );
  });
