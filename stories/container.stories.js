import React from 'react';
import { storiesOf } from '@storybook/react';
import {
  boolean,
  number,
  select,
  text,
  withKnobs
} from '@storybook/addon-knobs';

import Grid from '@material-ui/core/Grid';

import { Typography } from '@material-ui/core';
import { BarChart, ChartContainer } from '../src';
import { CenterDecorator } from './common';

const rand = () => Number((Math.random() * 100).toFixed(1));

storiesOf('HURUmap UI|ChartContainers/ChartContainer', module)
  .addDecorator(CenterDecorator)
  .addDecorator(withKnobs)
  .add('Default', () =>
    React.createElement(() => {
      return (
        <Grid
          container
          justify="center"
          alignItems="center"
          style={{ background: 'whitesmoke', height: '100%' }}
        >
          <Grid
            item
            xs={select(
              'xs',
              ['auto', 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
              12
            )}
            md={select(
              'md',
              ['auto', 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
              6
            )}
          >
            <ChartContainer
              loading={boolean('loading', true)}
              title={text('title', 'Lorem ipsum dolor sit amet.')}
              subtitle={text(
                'Subtitle',
                'Praesent at dignissim est. Integer porta consectetur ante, ut congue erat.'
              )}
              sourceUrl={text('sourceUrl', 'http://dev.dominion.africa')}
              content={{
                height: 338
              }}
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
            </ChartContainer>
          </Grid>
        </Grid>
      );
    })
  )
  .add('Hidden Drop Downs', () =>
    React.createElement(() => {
      return (
        <Grid
          container
          justify="center"
          alignItems="center"
          style={{ background: 'whitesmoke', height: '100%' }}
        >
          <Grid
            item
            xs={select(
              'xs',
              ['auto', 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
              12
            )}
            md={select(
              'md',
              ['auto', 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
              6
            )}
          >
            <ChartContainer
              infoComponent={null}
              content={{
                height: 338
              }}
              loading={boolean('loading', true)}
              shareComponent={null}
              title={text('title', 'Lorem ipsum dolor sit amet.')}
              subtitle={text(
                'Subtitle',
                'Praesent at dignissim est. Integer porta consectetur ante, ut congue erat.'
              )}
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
            </ChartContainer>
          </Grid>
        </Grid>
      );
    })
  )
  .add('Custom Drop Downs', () =>
    React.createElement(() => {
      return (
        <Grid
          container
          justify="center"
          alignItems="center"
          style={{ background: 'whitesmoke', height: '100%' }}
        >
          <Grid
            item
            xs={select(
              'xs',
              ['auto', 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
              12
            )}
            md={select(
              'md',
              ['auto', 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
              6
            )}
          >
            <ChartContainer
              infoComponent={
                <Typography variant="body2">Custom Info Component</Typography>
              }
              content={{
                height: 338
              }}
              loading={boolean('loading', true)}
              shareComponent={null}
              title={text('title', 'Lorem ipsum dolor sit amet.')}
              subtitle={text(
                'Subtitle',
                'Praesent at dignissim est. Integer porta consectetur ante, ut congue erat.'
              )}
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
            </ChartContainer>
          </Grid>
        </Grid>
      );
    })
  );
