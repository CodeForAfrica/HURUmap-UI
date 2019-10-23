import React from 'react';
import PropTypes from 'prop-types';

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
import { makeStyles } from '@material-ui/styles';
import {
  BarChart,
  ChartContainer,
  DropDown,
  InsightContainer,
  PieChart
} from '../src/core';
import { CenterDecorator } from './common';
import { ChartFactory } from '../src/factory';

const rand = () => Number((Math.random() * 100).toFixed(1));

storiesOf('HURUmap UI|ChartContainers/ChartContainer', module)
  .addDecorator(CenterDecorator)
  .addDecorator(withKnobs)
  .add('Default', () =>
    React.createElement(() => {
      const chartType = select('chartType', ['bar', 'pie'], 'pie');
      const classes = makeStyles(({ breakpoints }) => ({
        title: {
          fontWeight: 'bold'
        },
        explore: {
          fontWeight: 'bold'
        },
        embedModal: {
          [breakpoints.up('sm')]: {
            width: '30rem'
          }
        }
      }))();
      return (
        <Grid
          container
          justify="center"
          alignItems="center"
          style={{ background: 'whitesmoke', height: '50rem' }}
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
              share={object('share', {
                facebook: {},
                twitter: {}
              })}
              sourceTitle={text(
                'sourceTitle',
                'Census 2011: Statistics South Africa (2011) South African Population Census 2011. Indicators derived from the full population Census'
              )}
              sourceLink="http://dev.dominion.africa"
              content={object('content', { height: 400, width: '100%' })}
              classes={{
                title: classes.title,
                embedDropDownRoot: classes.embedModal
              }}
            >
              {chartType === 'pie' && (
                <div>
                  <PieChart
                    donut={boolean('donut', true)}
                    donutLabelKey={object('donutLabelKey', {
                      dataIndex: 0
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
                </div>
              )}

              {chartType === 'bar' && (
                <div style={{ width: 500, height: 300 }}>
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
                </div>
              )}
            </ChartContainer>
          </Grid>
        </Grid>
      );
    })
  )
  .add('Custom', () =>
    React.createElement(() => {
      const [el, setEl] = React.useState();
      const [name, setName] = React.useState();

      const onClick = (anchorEl, anchorName) => {
        setEl(anchorEl);
        setName(anchorName);
      };

      const handleClose = () => setEl(null);

      function CustomPopover({ open, anchorEl, onClose }) {
        return (
          <DropDown open={open} anchorEl={anchorEl} onClose={onClose}>
            <Typography>{`${name} Dropdown`}</Typography>
          </DropDown>
        );
      }
      CustomPopover.propTypes = {
        open: PropTypes.bool.isRequired,
        anchorEl: PropTypes.shape.isRequired,
        onClose: PropTypes.func.isRequired
      };

      const share = boolean('Share', true);
      const download = boolean('Download', true);
      const embed = boolean('Embed', true);
      const compare = boolean('Compare', true);
      const data = boolean('Show Data', true);
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
              content={{
                height: 338
              }}
              loading={boolean('loading', false)}
              onClickShare={
                share ? anchorEl => onClick(anchorEl, 'Share') : null
              }
              onClickDownload={
                download ? anchorEl => onClick(anchorEl, 'Download') : null
              }
              onClickEmbed={
                embed ? anchorEl => onClick(anchorEl, 'Embed') : null
              }
              onClickCompare={
                compare ? anchorEl => onClick(anchorEl, 'Compare') : null
              }
              onClickData={data ? anchorEl => onClick(anchorEl, 'Data') : null}
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
              <CustomPopover
                open={el != null}
                anchorEl={el}
                onClose={handleClose}
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
  .add('Default', () =>
    React.createElement(() => {
      const useStyles = makeStyles(() => ({
        root: {
          backgroundColor: '#f6f6f6'
        }
      }));
      const classes = useStyles();

      const containerWidth = number('containerWidth', 930);
      const hideInsight = boolean('hideInsight');
      const variant = select('variant', ['data', 'analysis'], 'data');
      const chartHeight = number('chartHeight');
      const chartWidth = number('chartWidth');
      const groups = number('groups', 3);
      const data = number('data', 2);
      const dataExponent = number('Data value E+', 6);
      const statisticDefinition = object('statisticDefinition', {
        type: 'number',
        style: 'percent',
        subtitle: 'Lorem ipsum',
        description: 'Lorem ipsum dolor sit amet',
        aggregate: 'last:percent'
      });
      const definition = object('visual', {
        type: 'grouped_column',
        horizontal: false,
        customUnit: 'km²',
        groupBy: 'Group',
        aggregate: 'raw'
      });

      const dataArray = Array(((definition.groupBy && groups) || 1) * data)
        .fill(null)
        .map((_, index) => ({
          groupBy:
            definition.groupBy && `${definition.groupBy} ${index % groups}`,
          x: `Data ${index}`,
          y: rand() * 10 ** dataExponent
        }));

      return (
        <div style={{ width: containerWidth }}>
          <InsightContainer
            hideInsight={hideInsight}
            classes={{ root: classes.root }}
            embedCode={text('embedCode', 'Embed Chart Code')}
            insight={object('insight', {
              analysisLink: '#',
              dataLink: '#',
              description:
                'Ethnically diverse population of over 55 million Country benefits from broad social cohesion, with inter-ethtensions rare Two thirds of the population live on lethan $2 per day - espcially rural areas',
              title: 'Summary'
            })}
            loading={boolean('loading', false)}
            source={object('source', {
              title: 'Community Survey 2016',
              href: 'http://dev.dominion.africa'
            })}
            title="Lorem ipsum dolor sit amet"
            variant={variant}
          >
            <ChartFactory definition={statisticDefinition} data={dataArray} />
            <ChartFactory
              definition={definition}
              data={dataArray}
              height={chartHeight}
              width={
                variant === 'analysis' && !chartWidth
                  ? containerWidth
                  : chartWidth
              }
            />
          </InsightContainer>
        </div>
      );
    })
  );
