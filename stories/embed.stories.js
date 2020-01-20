import React from 'react';
import { storiesOf } from '@storybook/react';
import { withKnobs, select } from '@storybook/addon-knobs';

import { CenterDecorator } from './common';
import Visual from '../src/components/Visual';

storiesOf('HURUmap UI|Components/Embed', module)
  .addDecorator(CenterDecorator)
  .addDecorator(withKnobs)
  .add('Default', () => {
    const type = select('type', ['hurumap', 'flourish', 'snippet'], 'flourish');
    const definition =
      // eslint-disable-next-line no-nested-ternary
      type === 'flourish'
        ? {
            id: '1234',
            title: 'Flourish Chart',
            description: 'Embeded flourish chart example'
          }
        : type === 'hurumap'
        ? {
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
          }
        : {
            id: '1234',
            title: {
              rendered: 'Snippet Card'
            },
            content: {
              rendered: 'Snippet Card example'
            }
          };
    return (
      <div style={{ width: '100%', height: '100%' }}>
        <Visual
          id="1234"
          type={type}
          geoId="country-KE"
          definition={definition}
          flourishURL=""
        />
      </div>
    );
  })
  .add('Live', () => (
    <Visual
      type={select('type', ['hurumap', 'flourish', 'snippet'], 'flourish')}
    />
  ));
