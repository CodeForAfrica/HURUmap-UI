import React from 'react';
import { storiesOf } from '@storybook/react';
import {
  boolean,
  number,
  object,
  select,
  text,
  withKnobs
} from '@storybook/addon-knobs';

import Grid from '@material-ui/core/Grid';

import { Typography } from '@material-ui/core';
import {
  BarChart,
  ChartContainer,
  InsightContainer,
  NumberVisuals,
  PieChart
} from '../src';
import { CenterDecorator } from './common';

const rand = () => Number((Math.random() * 100).toFixed(1));

storiesOf('HURUmap UI|ChartContainers/ChartContainer', module)
  .addDecorator(CenterDecorator)
  .addDecorator(withKnobs)
  .add('Default', () =>
    React.createElement(() => {
      const chartType = select('chartType', ['bar', 'pie'], 'pie');

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
              // onClickInfo={handleClickInfo}
              // onClickShare={handleClickShare}
              sourceLink="http://dev.dominion.africa"
              content={object('content', { height: 400, width: '100%' })}
            >
              {chartType === 'pie' && (
                <PieChart
                  donut={boolean('donut', true)}
                  donutLabelKey={object('donutLabelKey', {
                    dataIndex: 0,
                    sortKey: ''
                  })}
                  data={object('data', [
                    { x: 'Female', y: 22, label: 'Female\n22%' },
                    { x: 'Male', y: 78, label: 'Male\n78%' }
                  ])}
                  legendWidth={40}
                  radii={[150]}
                  parts={{
                    tooltip: {
                      style: {
                        fontSize: 28
                      }
                    },
                    legend: {
                      style: { labels: { fontSize: 20, fontWeight: 'bold' } }
                    }
                  }}
                  legend={[
                    { name: 'Female', label: 'Female: 22%' },
                    { name: 'Male', label: 'Male: 78%' }
                  ]}
                  responsive={boolean('responsive', true)}
                  standalone={boolean('standalone', true)}
                  style={{
                    labels: {
                      fill: 'black',
                      fontSize: '18',
                      fontWeight: 'bold'
                    }
                  }}
                />
              )}

              {chartType === 'bar' && (
                <BarChart
                  horizontal={boolean('horizontal', false)}
                  width={500}
                  height={300}
                  domainPadding={object('domainPadding', { x: 15 })}
                  data={Array(number('data', 10))
                    .fill(null)
                    .map((_, index) => ({
                      x: `${index} wrap label`,
                      y: rand()
                    }))}
                  parts={{
                    axis: {
                      independent: {
                        style: {
                          axis: {
                            display: 'block'
                          },
                          grid: {
                            display: 'block'
                          },
                          ticks: {
                            display: 'block'
                          },
                          tickLabels: {
                            display: 'block'
                          }
                        }
                      },
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
              )}
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

storiesOf('HURUmap UI|ChartContainers/InsightChartContainer', module)
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
          xs={select('xs', ['auto', 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12], 8)}
          md={select('md', ['auto', 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12], 10)}
          style={{ padding: '0.625rem' }}
        >
          <InsightContainer
            loading={boolean('loading', true)}
            title="Lorem ipsum dolor sit amet"
            source={object('source', {
              title: 'Community Survey 2016',
              href: 'http://dev.dominion.africa'
            })}
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
