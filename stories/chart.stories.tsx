import React from 'react';
import { storiesOf } from '@storybook/react';
import { withKnobs } from '@storybook/addon-knobs';

import { BarChart, LineChart, GroupedBarChart } from '../src';
import { object } from '@storybook/addon-knobs';
import { CenterDecorator } from './common';

storiesOf('Hurumap UI|Charts/BarChart', module)
  .addDecorator(CenterDecorator)
  .addDecorator(withKnobs)
  .add('Default', () => <BarChart />)
  .add('Horizontal', () => <BarChart horizontal />);

storiesOf('HURUmap UI|Charts/GroupedBarChart', module)
  .addDecorator(CenterDecorator)
  .add('Default', () => (
    <GroupedBarChart
      data={object('data', [
        {
          xLabel: 'Slept under any net last night',
          data: [
            { x: 'Pregnant Women', y: Math.random() * 10 },
            { x: 'Children', y: Math.random() * 10 }
          ]
        },
        {
          xLabel: 'Used ITN last night',
          data: [
            { x: 'Pregnant Women', y: Math.random() * 10 },
            { x: 'Children', y: Math.random() * 10 }
          ]
        },
        {
          xLabel: 'Used ITN all year ',
          data: [
            { x: 'Pregnant Women', y: Math.random() * 10 },
            { x: 'Children', y: Math.random() * 10 }
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
            { x: 'Pregnant Women', y: Math.random() * 10 },
            { x: 'Children', y: Math.random() * 10 }
          ]
        },
        {
          xLabel: 'Used ITN last night',
          data: [
            { x: 'Pregnant Women', y: Math.random() * 10 },
            { x: 'Children', y: Math.random() * 10 }
          ]
        },
        {
          xLabel: 'Used ITN all year ',
          data: [
            { x: 'Pregnant Women', y: Math.random() * 10 },
            { x: 'Children', y: Math.random() * 10 }
          ]
        }
      ])}
    />
  ));

storiesOf('HURUmap UI|Charts/LineChart', module)
  .addDecorator(CenterDecorator)
  .add('Default', () => <LineChart />);
