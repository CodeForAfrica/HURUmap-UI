import React from 'react';
import { storiesOf } from '@storybook/react';
import { withKnobs, boolean, number, select } from '@storybook/addon-knobs';

import Grid from '@material-ui/core/Grid';

import { BarChart, ChartContainer, EmbedPopup, InfoPopup } from '../src';
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

      function handleExploreData() { }

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
              onClickInfo={handleClickInfo}
              onClickShare={handleClickShare}
              title="Lorem ipsum dolor sit amet."
              subtitle="Praesent at dignissim est. Integer porta consectetur ante, ut congue erat."
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
            </ChartContainer>
          </Grid>
        </Grid>
      );
    })
  );
