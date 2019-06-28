import { Grid } from '@material-ui/core';
import { storiesOf } from '@storybook/react';
import React from 'react';
import { BarChart, MapIt } from '../src';

// tslint:disable-next-line: variable-name
const CenterDecorator = (storyFn: any) => (
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
