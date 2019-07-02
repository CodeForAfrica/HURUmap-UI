import React from 'react';
import { Grid } from '@material-ui/core';
import { storiesOf, RenderFunction } from '@storybook/react';

import { BarChart, LineChart } from '../src';

const CenterDecorator = (storyFn: RenderFunction) => (
  <Grid container justify="center" alignItems="center">
    {storyFn()}
  </Grid>
);

storiesOf('HURUmap UI|Charts/BarChart', module)
  .addDecorator(CenterDecorator)
  .add('Default', () => <BarChart />)
  .add('Horizontal', () => <BarChart horizontal />);

storiesOf('HURUmap UI|Charts/LineChart', module)
  .addDecorator(CenterDecorator)
  .add('Default', () => <LineChart />);
