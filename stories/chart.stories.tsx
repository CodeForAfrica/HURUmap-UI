import React from 'react';
import { storiesOf } from '@storybook/react';
import { withKnobs, text } from '@storybook/addon-knobs';

import { BarChart, LineChart, GroupedBarChart } from '../src';
import { object } from '@storybook/addon-knobs';
import { CenterDecorator } from './common';

storiesOf('Hurumap UI|Charts/BarChart', module)
  .addDecorator(CenterDecorator)
  .addDecorator(withKnobs)
  .add('Default', () => <BarChart />)
  .add('Horizontal', () => <BarChart horizontal />);


  const rand = () => Number((Math.random() * 10).toFixed(1));

storiesOf('HURUmap UI|Charts/GroupedBarChart', module)
  .addDecorator(CenterDecorator)
  .add('Default', () => (
    <GroupedBarChart
      dataUnit={text('dataUnit', "%")}
      data={object('data', [
        {
          xLabel: 'Slept under any net last night',
          data: [
            { x: 'Pregnant Women', y: rand() },
            { x: 'Children', y: rand() }
          ]
        },
        {
          xLabel: 'Used ITN last night',
          data: [
            { x: 'Pregnant Women', y: rand() },
            { x: 'Children', y: rand() }
          ]
        },
        {
          xLabel: 'Used ITN all year ',
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
      horizontal
      data={object('data', [
        {
          xLabel: 'Slept under any net last night',
          data: [
            { x: 'Pregnant Women', y: rand() },
            { x: 'Children', y: rand() }
          ]
        },
        {
          xLabel: 'Used ITN last night',
          data: [
            { x: 'Pregnant Women', y: rand() },
            { x: 'Children', y: rand() }
          ]
        },
        {
          xLabel: 'Used ITN all year ',
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
