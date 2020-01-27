import React from 'react';
import { storiesOf } from '@storybook/react';
import { withKnobs, select, text, object } from '@storybook/addon-knobs';

import { ApolloProvider } from '@apollo/react-hooks';
import ApolloClient from 'apollo-boost';

import { CenterDecorator } from './common';
import Card from '../src/components/Card';

storiesOf('HURUmap UI|Components/Card', module)
  .addDecorator(CenterDecorator)
  .addDecorator(withKnobs)
  .add('Default', () => {
    const type = select('type', ['hurumap', 'flourish', 'snippet'], 'hurumap');
    const uri = text('graphql', 'https://graphql.takwimu.africa/graphql');
    const geoId = text('geoId', 'country-KE');
    const hurumapJson = {
      id: '1234',
      title: 'HURUmap Chart',
      stat: {
        type: 'number',
        subtitle: '',
        description: '',
        aggregate: 'sum',
        unique: true,
        unit: 'percent',
        queryAlias: 'v1448'
      },
      visual: {
        typeProps: [],
        type: 'column',
        table: 'allAccessToBasicServices',
        x: 'accessToBasicServicesYear',
        y: 'total',
        queryAlias: 'v1448'
      }
    };
    const flourishJson = {
      id: '1234',
      title: 'Flourish Chart',
      description: 'Embeded flourish chart example'
    };
    const definition =
      // eslint-disable-next-line no-nested-ternary
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
        <div style={{ width: '100%', height: '100%' }}>
          <Card
            id="1234"
            key={type}
            type={type}
            geoId={geoId}
            definition={definition}
            flourishURL=""
            shareEndPoint={shareEndPoint}
          />
        </div>
      </ApolloProvider>
    );
  });
