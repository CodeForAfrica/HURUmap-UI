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

import { ChartFactory } from '@hurumap-ui/core';
import { CenterDecorator } from './common';

const rand = () => Number((Math.random() * 100).toFixed(1));

storiesOf('HURUmap UI|Charts/ChartFactory', module)
  .addDecorator(CenterDecorator)
  .addDecorator(withKnobs)
  .add('Default', () => {
    const type = select(
      'type',
      ['column', 'number', 'pie', 'line', 'bullet'],
      'column'
    );
    const horizontal = boolean('horizontal');
    const data = Array(number('data', 3)).fill(null);
    const disableShowMore =
      type === 'column' && boolean('disableShowMore', true);
    const customUnit = text('customUnit', 'unit');
    const aggregate = select('aggregate', [':percent', ''], '');
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
          id: 'data-indicator-10',
          type,
          typeProps: {
            horizontal,
            ...props
          },
          aggregate,
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
        disableShowMore={disableShowMore}
      />
    );
  })
  .add('Grouped', () => {
    const type = select(
      'type',
      ['grouped_column', 'line', 'number'],
      'grouped_column'
    );
    const horizontal = boolean('horizontal');
    const disableShowMore =
      ['grouped_column', 'line'].includes(type) &&
      boolean('disableShowMore', true);
    const groupsCount = Array(number('groups', 3)).fill(null);
    const dataCount = Array(number('data', 2)).fill(null);
    const aggregate = select(
      'aggregate',
      ['sum', 'avg', 'sum:percent', ''],
      ''
    );
    const customUnit = text('customUnit', 'unit');
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
    const data = dataCount
      .map((_d, dataIndex) =>
        groupsCount.map((_g, groupIndex) => {
          const x = `D${dataIndex + 1}`;
          const y = rand();

          const d = {
            groupBy: `G${groupIndex + 1}`,
            x,
            y
          };
          return d;
        })
      )
      .reduce((a, b) => a.concat(b));

    return (
      <ChartFactory
        definition={{
          type,
          typeProps: {
            ...props,
            horizontal
          },
          aggregate,
          customUnit,
          subtitle,
          description,
          statistic
        }}
        disableShowMore={disableShowMore}
        data={data}
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
    const customUnit = text('customUnit', '%');
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
          customUnit,
          subtitle,
          description,
          props,
          statistic
        }}
        data={data.map(() => {
          const y = rand();
          return {
            x: `Data`,
            y
          };
        })}
        referenceData={reference.map(() => ({
          label: `Reference`,
          x: `Reference`,
          y: rand()
        }))}
        {...props}
      />
    );
  });
