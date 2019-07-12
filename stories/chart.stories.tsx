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
  .add('Default', () => <BarChart />)
  .add('Horizontal', () => <BarChart horizontal />);

const rand = () => Number((Math.random() * 100).toFixed(1));

storiesOf('HURUmap UI|Charts/GroupedBarChart', module)
  .addDecorator(CenterDecorator)
  .addDecorator(withKnobs)
  .add('Default', () => (
    <GroupedBarChart
    width={number('width', 500)}
    height={number('height', 300)}
      dataUnit={text('dataUnit', '%')}
      data={object('data', [
        {
          x: 'Slept under any net last night',
          data: [
            { x: 'Pregnant Women', y: rand() },
            { x: 'Children', y: rand() }
          ]
        },
        {
          x: 'Used ITN last night',
          data: [
            { x: 'Pregnant Women', y: rand() },
            { x: 'Children', y: rand() }
          ]
        },
        {
          x: 'Used ITN all year ',
          data: [
            { x: 'Pregnant Women', y: rand() },
            { x: 'Children', y: rand() }
          ]
        }
      ])}
    />
  ))
  .add('Horizontal', () => (
    <GroupedBarChart
      width={number('width', 500)}
      height={number('height', 300)}
      horizontal
      dataUnit={text('dataUnit', '%')}
      data={object('data', [
        {
          x: 'Slept under any net last night',
          data: [
            { x: 'Pregnant Women', y: rand() },
            { x: 'Children', y: rand() }
          ]
        },
        {
          x: 'Used ITN last night',
          data: [
            { x: 'Pregnant Women', y: rand() },
            { x: 'Children', y: rand() }
          ]
        },
        {
          x: 'Used ITN all year ',
          data: [
            { x: 'Pregnant Women', y: rand() },
            { x: 'Children', y: rand() }
          ]
        }
      ])}
    />
  ));

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
