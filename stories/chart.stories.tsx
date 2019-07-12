import React from 'react';
import { storiesOf } from '@storybook/react';
import {
  withKnobs,
  array,
  boolean,
  object,
  text,
  number
} from '@storybook/addon-knobs';

import {
  BarChart,
  GroupedBarChart,
  LineChart,
  PieChart,
  NestedProportionalAreaChart
} from '../src';
import { CenterDecorator } from './common';

storiesOf('HURUmap UI|Charts/BarChart', module)
  .addDecorator(CenterDecorator)
  .addDecorator(withKnobs)
  .add('Default', () => (
    <div>
      <BarChart
        horizontal={boolean('horizontal', false)}
        data={object('data', [
          { x: 1, y: 5 },
          { x: 2, y: 17.5 },
          { x: 3, y: 30 },
          { x: 4, y: 35 },
          { x: 5, y: 20 },
          { x: 4, y: 8 },
          { x: 6, y: 4 },
          { x: 7, y: 10 }
        ])}
        tickValues={object('tickValues', [1, 2, 3, 4, 5, 6, 7])}
        tickFormat={object('tickFormat', [
          '0-9',
          '10-19',
          '20-29',
          '30-39',
          '40-49',
          '50-69',
          '80+'
        ])}
        dependentTickValues={object('dependentTickValues', [0, 17.5, 35])}
        dependentTickFormat={object('dependentTickFormat', [
          '0%',
          '17.5%',
          '35%'
        ])}
      />
    </div>
  ))
  .add('Comparison', () => (
    <div>
      <BarChart
        horizontal={boolean('horizontal', false)}
        data={object('data', [
          [
            { x: 1, y: 5 },
            { x: 2, y: 17.5 },
            { x: 3, y: 30 },
            { x: 4, y: 35 },
            { x: 5, y: 20 },
            { x: 4, y: 8 },
            { x: 6, y: 4 },
            { x: 7, y: 10 }
          ],
          [
            { x: 0, y: 0 },
            { x: 1, y: 10 },
            { x: 2, y: 6 },
            { x: 3, y: 15 },
            { x: 4, y: 32.5 },
            { x: 5, y: 20 },
            { x: 6, y: 15.5 },
            { x: 7, y: 20 }
          ]
        ])}
        tickValues={object('tickValues', [1, 2, 3, 4, 5, 6, 7])}
        tickFormat={object('tickFormat', [
          '0-9',
          '10-19',
          '20-29',
          '30-39',
          '40-49',
          '50-69',
          '80+'
        ])}
        dependentTickValues={object('dependentTickValues', [0, 17.5, 35])}
        dependentTickFormat={object('dependentTickFormat', [
          '0%',
          '17.5%',
          '35%'
        ])}
      />
    </div>
  ));

const rand = () => Number((Math.random() * 100).toFixed(1));

storiesOf('HURUmap UI|Charts/GroupedBarChart', module)
  .addDecorator(CenterDecorator)
  .addDecorator(withKnobs)
  .add('Default', () => {
    const groups = Array(number('groups', 2)).fill(null);
    const categories = Array(number('data', 3)).fill(null);

    return (
      <GroupedBarChart
        width={number('width', 500)}
        height={number('height', 300)}
        dataUnit={text('dataUnit', '%')}
        horizontal={boolean('horizontal', false)}
        data={categories.map((_, index) => ({
          x: index,
          data: groups.map((_, groupIndex) => ({
            x: `Group ${groupIndex}`,
            y: rand()
          }))
        }))}
      />
    );
  });
storiesOf('HURUmap UI|Charts/LineChart', module)
  .addDecorator(CenterDecorator)
  .addDecorator(withKnobs)
  .add('Default', () => (
    <div>
      <LineChart
        data={object('data', [
          { x: 1, y: -3 },
          { x: 2, y: 5 },
          { x: 3, y: 3 },
          { x: 4, y: 0 },
          { x: 5, y: -2 },
          { x: 6, y: -2 },
          { x: 7, y: 5 }
        ])}
      />
    </div>
  ))
  .add('Multiple/Comparison', () => (
    <div>
      <LineChart
        data={object('data', [
          [
            { x: 1, y: 3 },
            { x: 2, y: 1 },
            { x: 3, y: 2 },
            { x: 4, y: -2 },
            { x: 5, y: -1 },
            { x: 6, y: 2 },
            { x: 7, y: 3 }
          ],
          [
            { x: 1, y: -3 },
            { x: 2, y: 5 },
            { x: 3, y: 3 },
            { x: 4, y: 0 },
            { x: 5, y: -2 },
            { x: 6, y: -2 },
            { x: 7, y: 5 }
          ]
        ])}
      />
    </div>
  ));

storiesOf('HURUmap UI|Charts/PieChart', module)
  .addDecorator(CenterDecorator)
  .addDecorator(withKnobs)
  .add('Default', () => (
    <div>
      <PieChart
        donut={boolean('donut', false)}
        data={object('data', [
          { x: 'A', y: 1 },
          { x: 'B', y: 2 },
          { x: 'C', y: 3 },
          { x: 'D', y: 1 },
          { x: 'E', y: 2 }
        ])}
      />
    </div>
  ))
  .add('Comparison', () => (
    <div>
      <PieChart
        donut={boolean('donut', false)}
        data={object('data', [
          [
            { x: 'A', y: 1 },
            { x: 'B', y: 2 },
            { x: 'C', y: 3 },
            { x: 'D', y: 1 },
            { x: 'E', y: 2 }
          ],
          [
            { x: 'A', y: 2 },
            { x: 'B', y: 1 },
            { x: 'C', y: 1 },
            { x: 'D', y: 1 },
            { x: 'E', y: 5 }
          ]
        ])}
      />
    </div>
  ));

storiesOf('HURUmap UI|Charts/NestedProportionalAreaChart', module)
  .addDecorator(CenterDecorator)
  .addDecorator(withKnobs)
  .add('Default', () => (
    <div>
      <NestedProportionalAreaChart
        square={boolean('square', false)}
        data={array('data', [100, 45])}
      />
    </div>
  ));
