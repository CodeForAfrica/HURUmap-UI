import React from 'react';
import { storiesOf } from '@storybook/react';
import {
  withKnobs,
  boolean,
  number,
  text,
  select,
  object
} from '@storybook/addon-knobs';

import Grid from '@material-ui/core/Grid';

import { BarChart, InsightContainer, NumberVisuals } from '../src';
import { CenterDecorator } from './common';

const rand = () => Number((Math.random() * 100).toFixed(1));

storiesOf('HURUmap UI|InsightChartContainer', module)
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
        <Grid
          item
          xs={select('xs', ['auto', 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12], 12)}
          md={select('md', ['auto', 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12], 8)}
        >
          <InsightContainer
            loading={boolean('loading', true)}
            title="Lorem ipsum dolor sit amet"
            sourceUrl="http://dev.dominion.africa"
            content={{
              height: 338
            }}
          >
            <NumberVisuals
              subtitle={text('Subtitle', 'Income')}
              statistic={text('Statistic', '$60,336')}
              statisticDeviation={text(
                'Statistic Deviation',
                'https://dev.dominion.africa/profile/country-ZA±0.1% '
              )}
              secondaryDeviation={text(
                'Secondary Deviation',
                '(194, 667, 872 ±241, 381.6)'
              )}
              description={text('Description', 'Median household income')}
              comparisonData={object('Comparison Data', [
                {
                  parentComparison: 'about 90 percent',
                  parentDescription: 'of the amount in United States: $32,397',
                  parentDeviation: '±0.24%'
                }
              ])}
            />
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
              parts={{
                axis: {
                  dependent: {
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
                  }
                }
              }}
            />
          </InsightContainer>
        </Grid>
      </Grid>
    );
  });
