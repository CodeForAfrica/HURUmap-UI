import { Grid } from '@material-ui/core';
import { storiesOf } from '@storybook/react';
import React from 'react';
import { BarChart } from '../src';

// tslint:disable-next-line: variable-name
const CenterDecorator = (storyFn: any) => (
  <Grid container justify="center" alignItems="center">
    {storyFn()}
  </Grid>
);

storiesOf('Hurumap UI|Charts/BarChart', module)
  .addDecorator(CenterDecorator)
  .add('Default', () => <BarChart />);
