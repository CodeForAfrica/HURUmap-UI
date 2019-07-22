import React from 'react';
import { storiesOf } from '@storybook/react';
import {
  withKnobs,
  array,
  boolean,
  text,
  number
} from '@storybook/addon-knobs';

import { NestedProportionalAreaChart, ChartContainer } from '../src';
import { CenterDecorator } from './common';
import { Grid } from '@material-ui/core';
import { GridSize } from '@material-ui/core/Grid';

storiesOf('HURUmap UI|ChartContainer', module)
  .addDecorator(CenterDecorator)
  .addDecorator(withKnobs)
  .add('Default', () => {
    return (
      <Grid
        container
        justify="center"
        alignItems="center"
        style={{ background: 'whitesmoke', height: '100%' }}
      >
        <ChartContainer
          item
          xs={number('xs', 12) as GridSize}
          md={number('md', 6) as GridSize}
          title={text('title', 'Lorem ipsum dolor sit amet.')}
          subtitle={text(
            'title',
            'Praesent at dignissim est. Integer porta consectetur ante, ut congue erat.'
          )}
        >
          <NestedProportionalAreaChart
            square={boolean('square', false)}
            data={array('data', [15])}
            reference={array('reference', [100])}
          />
        </ChartContainer>
      </Grid>
    );
  });
