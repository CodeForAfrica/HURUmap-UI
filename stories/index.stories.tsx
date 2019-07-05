import React from 'react';
import { Grid } from '@material-ui/core';
import { storiesOf, RenderFunction } from '@storybook/react';

import { BarChart, LineChart, GroupedBarChart } from '../src';
import { object } from '@storybook/addon-knobs';

const CenterDecorator = (storyFn: RenderFunction) => (
  <Grid container justify="center" alignItems="center">
    {storyFn()}
  </Grid>
);

storiesOf('HURUmap UI|Charts/BarChart', module)
  .addDecorator(CenterDecorator)
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
