import React from 'react';
import { storiesOf } from '@storybook/react';
import { withKnobs, text, boolean, object } from '@storybook/addon-knobs';

import { BarChart, LineChart, PieChart, GroupedBarChart, } from '../src';
import { CenterDecorator } from './common';

storiesOf('HURUmap UI|Charts/BarChart', module)
  .addDecorator(CenterDecorator)
  .addDecorator(withKnobs)
  .add('Default', () => <BarChart />)
  .add('Horizontal', () => <BarChart horizontal />);

const rand = () => Number((Math.random() * 100).toFixed(1));

storiesOf('HURUmap UI|Charts/GroupedBarChart', module)
  .addDecorator(CenterDecorator)
  .add('Default', () => (
    <GroupedBarChart
      width="50%"
      height="50%"
      title={text('title', 'This is a title')}
      subtitle={text('subtitle', 'This is a subtitle')}
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
      width="50%"
      height="80%"
      horizontal
      title={text('title', 'This is a title')}
      subtitle={text('subtitle', 'This is a subtitle')}
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
  ));
storiesOf('HURUmap UI|Charts/PieChart', module)
  .addDecorator(CenterDecorator)
  .addDecorator(withKnobs)
  .add('Comparison', () => (
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
  ));
