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

import { Grid, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import {
  BarChart,
  ChartContainer,
  DropDown,
  InsightContainer,
  PieChart
} from '../src/core';
import { CenterDecorator } from './common';
import { ChartFactory } from '../src/factory';

import logo from './assets/dominion-logo.png';

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
              description={text(
                'description',
                'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minsequat. Duis aute irure dolor in reprehenderit in voluptate'
              )}
              classes={{
                title: classes.title,
                embedDropDownRoot: classes.embedModal
              }}
            >
              {chartType === 'pie' && (
                <div style={{ height: 350, width: 350 }}>
                  <PieChart
                    donut={boolean('donut', true)}
                    donutLabelKey={object('donutLabelKey', {
                      dataIndex: 0
                    })}
                    data={object('data', [
                      { x: 'Female', y: 22, label: 'Female\n22%' },
                      { x: 'Male', y: 78, label: 'Male\n78%' }
                    ])}
                    height={350}
                    parts={{
                      legend: {
                        data: [
                          { name: 'Female', label: 'Female: 22%' },
                          { name: 'Male', label: 'Male: 78%' }
                        ],
                        size: 40
                      }
                    }}
                    responsive={boolean('responsive', true)}
                    standalone={boolean('standalone', true)}
                    width={350}
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
                        dependent: {
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
                data={Array(number('data', 10))
                  .fill(null)
                  .map((_, index) => ({
                    x: `${index}-${index}`,
                    y: rand()
                  }))}
                domainPadding={{ x: 40 }}
                parts={{
                  axis: {
                    dependent: {
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
          backgroundColor: '#fff'
        }
      }));
      const classes = useStyles();

      const containerWidth = number('containerWidth', 950);
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
            classes={{ root: classes.root }}
            embedCode={text('embedCode', 'Embed Chart Code')}
            hideInsight={hideInsight}
            insight={object('insight', {
              analysisLink: '#',
              dataLink: '#',
              description:
                'Ethnically diverse population of over 55 million Country benefits from broad social cohesion, with inter-ethtensions rare Two thirds of the population live on lethan $2 per day - espcially rural areas',
              title: 'Summary'
            })}
            loading={boolean('loading', false)}
            logo={logo}
            source={object('source', {
              title: 'Community Survey 2016',
              href: 'http://dev.dominion.africa'
            })}
            title="Lorem ipsum dolor sit amet"
            description={text(
              'description',
              'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo'
            )}
            variant={variant}
          >
            <ChartFactory definition={statisticDefinition} data={dataArray} />
            <ChartFactory
              definition={{
                ...definition,
                typeProps: {
                  height: chartHeight,
                  width:
                    variant === 'analysis' && !chartWidth
                      ? containerWidth
                      : chartWidth
                }
              }}
              data={dataArray}
            />
          </InsightContainer>
        </div>
      );
    })
  )
  .add('Custom', () =>
    React.createElement(() => {
      const useStyles = makeStyles(() => ({
        root: {
          backgroundColor: '#f6f6f6'
        }
      }));
      const classes = useStyles();

      const containerWidth = 950;
      const variant = 'data';
      const groups = 3;
      const data = 2;
      const dataExponent = 6;
      const statisticDefinition = {
        type: 'number',
        style: 'percent',
        subtitle: 'Lorem ipsum',
        description: 'Lorem ipsum dolor sit amet',
        aggregate: 'last:percent'
      };
      const definition = {
        type: 'grouped_column',
        horizontal: false,
        customUnit: 'km²',
        groupBy: 'Group',
        aggregate: 'raw'
      };

      const dataArray = Array(((definition.groupBy && groups) || 1) * data)
        .fill(null)
        .map((_, index) => ({
          groupBy:
            definition.groupBy && `${definition.groupBy} ${index % groups}`,
          x: `Data ${index}`,
          y: rand() * 10 ** dataExponent
        }));
      const share = boolean('Share', true);
      const download = boolean('Download', true);
      const embed = boolean('Embed', true);
      const compare = boolean('Compare', true);
      const showData = boolean('Show Data', true);

      return (
        <div style={{ width: containerWidth }}>
          <InsightContainer
            actions={{
              handleShare: share ? () => {} : undefined,
              // For download, undefined means use default
              handleDownload: download ? undefined : null,
              handleShowData: showData ? () => {} : undefined,
              handleCompare: compare ? () => {} : undefined
            }}
            classes={{ root: classes.root }}
            embedCode={embed ? 'Embed Chart Code' : undefined}
            insight={{
              analysisLink: '#',
              dataLink: '#',
              description:
                'Ethnically diverse population of over 55 million Country benefits from broad social cohesion, with inter-ethtensions rare Two thirds of the population live on lethan $2 per day - espcially rural areas',
              title: 'Summary'
            }}
            logo={logo}
            source={{
              title: 'Community Survey 2016',
              href: 'http://dev.takwimu.africa'
            }}
            title="Lorem ipsum dolor sit amet"
            variant={variant}
          >
            <ChartFactory definition={statisticDefinition} data={dataArray} />
            <ChartFactory
              definition={{
                ...definition
              }}
              data={dataArray}
            />
          </InsightContainer>
        </div>
      );
    })
  );
