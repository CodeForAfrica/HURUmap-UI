import React from 'react';
import { storiesOf } from '@storybook/react';
import {
  withKnobs,
  object,
  select,
  number,
  text,
  boolean
} from '@storybook/addon-knobs';

import { ChartFactory } from '../src/factory';
import { CenterDecorator } from './common';

const rand = () => Number((Math.random() * 100).toFixed(1));

storiesOf('HURUmap UI|Charts Factory/ChartFactory', module)
  .addDecorator(CenterDecorator)
  .addDecorator(withKnobs)
  .add('Default', () => {
    const type = select('type', ['column', 'number', 'pie'], 'column');
    const horizontal = boolean('horizontal');
    const data = Array(number('data', 3)).fill(null);
    const unit = text('unit', 'u');
    const aggregate = select('aggregate', [':percent', ''], '');
    const customUnit = aggregate === ':percent' ? '%' : '';
    const subtitle = text('subtitle', 'Subtitle');
    const description = text('description', 'Description');
    const props = object('props', {
      height: 350
    });
    const statistic = object('statistic', {
      unit: '%',
      unique: true
    });

    return (
      <ChartFactory
        definition={{
          type,
          typeProps: {
            horizontal
          },
          aggregate,
          unit,
          subtitle,
          description,
          statistic,
          customUnit
        }}
        data={data.map((_, index) => {
          const y = rand();
          const x = `${index} Dummy Data`;
          return {
            x,
            y
          };
        })}
        {...props}
      />
    );
  })
  .add('Grouped', () => {
    const type = select('type', ['grouped_column', 'number'], 'grouped_column');
    const horizontal = boolean('horizontal');
    const groups = number('groups', 2);
    const data = Array(number('data', 2) * groups).fill(null);
    const aggregate = select(
      'aggregate',
      ['sum', 'avg', 'sum:percent', ''],
      ''
    );
    const unit = text('unit', '%');
    const subtitle = text('subtitle', 'Subtitle');
    const description = text('description', 'Description');
    const props = object('props', {
      height: 350,
      offset: 50
    });
    const statistic = object('statistic', {
      unit: '%',
      aggregate: 'sum:percent',
      unique: true
    });

    return (
      <ChartFactory
        definition={{
          type,
          typeProps: {
            ...props,
            horizontal
          },
          aggregate,
          unit,
          subtitle,
          description,
          statistic
        }}
        data={data.map((_, index) => {
          const y = rand();
          return {
            groupBy: `Group ${index % groups}`,
            tooltip: `Group ${index % groups} Data ${index}`,
            x: `Group ${index % groups} Data ${index}`,
            y
          };
        })}
      />
    );
  })
  .add('Referenced', () => {
    const type = select(
      'type',
      ['square_nested_proportional_area', 'circle_nested_proportional_area'],
      'circle_nested_proportional_area'
    );
    const data = Array(number('data', 3)).fill(null);
    const reference = Array(number('reference', 5)).fill(null);
    const aggregate = select(
      'aggregate',
      ['sum', 'avg', 'sum:percent', ''],
      'sum:percent'
    );
    const unit = text('unit', '%');
    const subtitle = text('subtitle', 'Subtitle');
    const description = text('description', 'Description');
    const props = object('props', {
      height: 350
    });
    const statistic = object('statistic', {
      unit: '%',
      aggregate: 'sum:percent',
      unique: true
    });

    return (
      <ChartFactory
        definition={{
          type,
          aggregate,
          unit,
          subtitle,
          description,
          props,
          statistic
        }}
        data={data.map((_, index) => {
          const y = rand();
          return {
            tooltip: `Data ${index}`,
            x: `Data ${index}`,
            y
          };
        })}
        referenceData={reference.map((_, index) => ({
          label: 'Reference',
          x: index,
          y: rand()
        }))}
        {...props}
      />
    );
  });
