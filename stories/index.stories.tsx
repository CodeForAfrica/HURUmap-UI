import React from 'react';
import { Grid } from '@material-ui/core';
import { storiesOf, RenderFunction } from '@storybook/react';

import { BarChart, MapIt } from '../src';

const CenterDecorator = (storyFn: RenderFunction) => (
  <Grid
    container
    justify="center"
    alignItems="center"
    style={{ width: '100%', height: '500px', overflow: 'hidden' }}
  >
    {storyFn()}
  </Grid>
);

storiesOf('Hurumap UI|MapIt', module)
  .addDecorator(CenterDecorator)
  .add('Map', () => <MapIt />);

storiesOf('Hurumap UI|Charts/BarChart', module)
  .addDecorator(CenterDecorator)
  .add('Default', () => <BarChart />);
