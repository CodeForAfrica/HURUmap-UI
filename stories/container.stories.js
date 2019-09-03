import React from 'react';
import { storiesOf } from '@storybook/react';
import {
  withKnobs,
  boolean,
  number,
  select,
  object
} from '@storybook/addon-knobs';

import Grid from '@material-ui/core/Grid';

import {
  BarChart,
  ChartContainer,
  EmbedPopup,
  InfoPopup,
  PieChart
} from '../src';
import { CenterDecorator } from './common';

const rand = () => Number((Math.random() * 100).toFixed(1));

storiesOf('HURUmap UI|ChartContainer', module)
  .addDecorator(CenterDecorator)
  .addDecorator(withKnobs)
  .add('Default', () =>
    React.createElement(() => {
      const [infoAnchorEl, setInfoAnchorEl] = React.useState(null);
      const [shareAnchorEl, setShareAnchorEl] = React.useState(null);

      function handleClickInfo(anchorEl) {
        setShareAnchorEl(null);
        setInfoAnchorEl(anchorEl);
      }

      function handleClickShare(anchorEl) {
        setInfoAnchorEl(null);
        setShareAnchorEl(anchorEl);
      }

      function handleCloseInfo() {
        setInfoAnchorEl(null);
      }

      function handleCloseShare() {
        setShareAnchorEl(null);
      }

      function handleExploreData() {}

      const chartType = select('chartType', ['pie', 'bar'], 'pie');

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
              onClickInfo={handleClickInfo}
              onClickShare={handleClickShare}
              title="Lorem ipsum dolor sit amet."
              subtitle="Praesent at dignissim est. Integer porta consectetur ante, ut congue erat."
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
          <EmbedPopup
            anchorEl={shareAnchorEl}
            onClose={handleCloseShare}
            open={shareAnchorEl !== null}
            title="Embed code for this chart"
            subtitle="Copy the code below, then paste into your own CMS or HTML. Embedded charts are responsive to your page width, and have been tested in Firefox, Safari, Chrome, and Edge."
          >
            {`<iframe
  id="cr-embed-region-11-literacy_and_numeracy_tests-english_test_dist"
  className="census-reporter-embed"
  src="https://tanzania.hurumap.org/embed/iframe.html?geoID=region-11&geoVersion=2009&chartDataID=literacy_and_numeracy_tests-english_test_dist&dataYear=2015&chartType=pie&chartHeight=200&chartQualifier=&chartRelease=Uwezo+Annual+Assessment+Report+2015&chartSourceTitle=&chartSourceLink=&chartTitle=Percentage+of+children+aged+6-16+passing+English+literacy+tests&chartSubtitle=&initialSort=-value&statType=percentage"
  frameBorder="0"
  width="100%"
  height="300"
  style="margin: 1em; max-width: 300px;"
/>
<script src="https://tanzania.hurumap.org/static/js/embed.chart.make.js" />`}
          </EmbedPopup>
          <InfoPopup
            anchorEl={infoAnchorEl}
            onClose={handleCloseInfo}
            onExploreData={handleExploreData}
            open={infoAnchorEl !== null}
            sourceLink="https://codeforafrica.org"
            sourceTitle="Code for Africa"
          >
            Explore Data
          </InfoPopup>
        </Grid>
      );
    })
  );
