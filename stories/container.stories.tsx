import React from 'react';
import { storiesOf } from '@storybook/react';
import {
  withKnobs,
  boolean,
  text,
  number,
  select
} from '@storybook/addon-knobs';

import { ChartContainer, BarChart } from '../src';
import { CenterDecorator } from './common';
import { Grid } from '@material-ui/core';
import { GridSize } from '@material-ui/core/Grid';
import { CSSProperties } from '@material-ui/styles';

const rand = () => Number((Math.random() * 100).toFixed(1));

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
          xs={
            select(
              'xs',
              ['auto', 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
              12
            ) as GridSize
          }
          md={
            select(
              'md',
              ['auto', 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
              6
            ) as GridSize
          }
          overflowX={
            select(
              'overflowX',
              ['auto', 'clip', 'hidden', 'scroll', 'visible'],
              'auto'
            ) as CSSProperties['overflowX']
          }
          overflowY={
            select(
              'overflowY',
              ['auto', 'clip', 'hidden', 'scroll', 'visible'],
              'hidden'
            ) as CSSProperties['overflowX']
          }
          maxChartHeight={text('maxChartHeight', '300px')}
          maxChartWidth={text('maxChartWidth', '100%')}
          title={'Lorem ipsum dolor sit amet.'}
          subtitle={'Praesent at dignissim est. Integer porta consectetur ante, ut congue erat.'}
        >
          <BarChart
            horizontal={boolean('horizontal', false)}
            width={500}
            height={300}
            data={Array(number('data', 100))
              .fill(null)
              .map((_, index) => ({
                x: `${index}-${index}`,
                y: rand()
              }))}
            dependantAxisProps={{
              style: {
                axis: {
                  display: 'block'
                },
                grid: {
                  display: 'block'
                },
                tickLabels: {
                  display: 'block'
                }
              },
              tickValues: [10, 50, 90],
              tickFormat: ['10%', '50%', '90%']
            }}
          />
        </ChartContainer>
      </Grid>
    );
  });
