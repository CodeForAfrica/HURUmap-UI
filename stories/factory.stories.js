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
    const aggregate = select('aggregate', ['sum', 'avg', 'sum:percent'], 'sum');
    const unit = text('unit', 'u');
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
          statistic,
          horizontal
        }}
        data={data.map((_, index) => {
          const y = rand();
          return {
            tooltip: `${index} Dummy Data`,
            x: `${index} Dummy Data`,
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
    const groups = number('groups', 3);
    const data = Array(number('data', 3) * groups).fill(null);
    const aggregate = select(
      'aggregate',
      ['sum', 'avg', 'sum:percent', ''],
      'sum:percent'
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
          aggregate,
          unit,
          subtitle,
          description,
          statistic,
          horizontal
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
        {...props}
      />
    );
  })
  .add('Refrenced', () => {
    const type = select(
      'type',
      ['square_nested_proportional_area', 'circle_nested_proportional_area'],
      'circle_nested_proportional_area'
    );
    const data = Array(number('data', 3)).fill(null);
    const refrence = Array(number('refrence', 5)).fill(null);
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
        refrenceData={refrence.map((_, index) => ({
          label: 'Refrence',
          x: index,
          y: rand()
        }))}
        {...props}
      />
    );
  });
