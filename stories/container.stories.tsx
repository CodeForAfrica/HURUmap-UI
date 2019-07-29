import React from 'react';
import { storiesOf } from '@storybook/react';
import {
  withKnobs,
  boolean,
  text,
  number,
  select
} from '@storybook/addon-knobs';

import { Grid } from '@material-ui/core';
import { GridSize } from '@material-ui/core/Grid';
import { CSSProperties } from '@material-ui/styles';

import { BarChart, ChartContainer, EmbedDialog, InfoDialog } from '../src';
import { CenterDecorator } from './common';

const rand = () => Number((Math.random() * 100).toFixed(1));

storiesOf('HURUmap UI|ChartContainer', module)
  .addDecorator(CenterDecorator)
  .addDecorator(withKnobs)
  .add('Default', () =>
    React.createElement(() => {
      const [openInfo, setOpenInfo] = React.useState(false);
      const [openEmbed, setOpenEmbed] = React.useState(false);

      function handleClickInfo() {
        setOpenInfo(true);
      }

      function handleClickShare() {
        setOpenEmbed(true);
      }

      function handleCloseInfo() {
        setOpenInfo(false);
      }

      function handleCloseEmbed() {
        setOpenEmbed(false);
      }

      function handleExploreData() {
        handleCloseInfo();
      }

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
            onClickInfo={handleClickInfo}
            onClickShare={handleClickShare}
            maxChartHeight={text('maxChartHeight', '300px')}
            maxChartWidth={text('maxChartWidth', '100%')}
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
          <EmbedDialog
            onClose={handleCloseEmbed}
            open={openEmbed}
            title="Embed code for this chart"
            subtitle="Copy the code below, then paste into your own CMS or HTML. Embedded charts are responsive to your page width, and have been tested in Firefox, Safari, Chrome, and Edge."
          >
            {`
<iframe
  id="cr-embed-region-11-literacy_and_numeracy_tests-english_test_dist"
  className="census-reporter-embed"
  src="https://tanzania.hurumap.org/embed/iframe.html?geoID=region-11&geoVersion=2009&chartDataID=literacy_and_numeracy_tests-english_test_dist&dataYear=2015&chartType=pie&chartHeight=200&chartQualifier=&chartRelease=Uwezo+Annual+Assessment+Report+2015&chartSourceTitle=&chartSourceLink=&chartTitle=Percentage+of+children+aged+6-16+passing+English+literacy+tests&chartSubtitle=&initialSort=-value&statType=percentage"
  frameBorder="0"
  width="100%"
  height="300"
  style="margin: 1em; max-width: 300px;"
/>
<script src="https://tanzania.hurumap.org/static/js/embed.chart.make.js" />
            `}
          </EmbedDialog>
          <InfoDialog
            onClose={handleCloseInfo}
            onExploreData={handleExploreData}
            open={openInfo}
            sourceLink="https://codeforafrica.org"
            sourceTitle="Code for Africa"
          />
        </Grid>
      );
    })
  );
