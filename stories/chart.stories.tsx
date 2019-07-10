import React from 'react';
import { storiesOf } from '@storybook/react';
import { BarChart, LineChart, PieChart, GroupedBarChart } from '../src';
import { withKnobs, array, boolean, object, text } from '@storybook/addon-knobs';
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
    <BarChart
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
    />
  ))
  .add('Horizontal', () => (
    <BarChart
      horizontal
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
    />
  ))
  .add('Comparison Vertical', () => (
    <BarChart
      comparison
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
    />
  ))
  .add('Comparison Horizontal', () => (
    <BarChart
      comparison
      horizontal
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
    />
  ));

const rand = () => Number((Math.random() * 100).toFixed(1));

storiesOf('HURUmap UI|Charts/GroupedBarChart', module)
  .addDecorator(CenterDecorator)
  .addDecorator(withKnobs)
  .add('Default', () => (
    <GroupedBarChart
      width={text('width', '80%')}
      height={text('height', '50%')}
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
      width={text('width', '50%')}
      height={text('height', '100%')}
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
  .add('Default', () => <LineChart />);

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
  ));
storiesOf('HURUmap UI|Charts/PieChart', module)
  .addDecorator(CenterDecorator)
  .addDecorator(withKnobs)
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
