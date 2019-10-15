import _ from 'lodash';

import { VictoryTheme } from 'victory';

export default function createVictoryTheme(chartOptions) {
  const defaultTheme = _.merge(
    {
      breakpoints: {
        // Handsets: https://material.io/design/layout/responsive-layout-grid.html#breakpoints
        // Lets use Material UI language here
        sm: 600
      },
      axis: {
        labelWidth: 20,
        style: {
          axisLabel: {
            display: 'none'
          },
          tickLabels: {
            display: 'none'
          },
          ticks: {
            display: 'none'
          },
          grid: {
            display: 'none'
          },
          axis: {
            display: 'none'
          }
        }
      },
      bar: {
        barWidth: 25,
        domainPadding: { x: [25, 25] },
        height: 300,
        offset: 50
      },
      pie: {
        height: 250,
        legendWidth: 150,
        origin: { x: 150, y: 125 },
        padding: 0,
        width: 450
      }
    },
    VictoryTheme.material
  );
  const chart = _.merge(defaultTheme, chartOptions);
  const defaultReference = {
    data: {
      fill: 'url(#gradient-background)',
      stroke: 'none',
      strokeWidth: 0
    },
    labels: {
      fill: '#9b9b9b',
      fontSize: 18
    }
  };
  // Customize chart bullet props off of chart group props
  chart.bullet = {
    barWidth: 5,
    offset: { x: 20, y: 50 },
    style: {
      data: {
        fill: '#d8d8d8'
      },
      labels: {
        fill: '#9b9b9b'
      }
    },
    ...chart.group,
    ...chart.bullet
  };
  // Customize chart comparisonBar props off of chart group props
  chart.comparisonBar = {
    reference: defaultReference,
    ...chart.group,
    ...chart.comparisonBar
  };
  // Customize chart pie props
  chart.pie = {
    donut: true,
    donutRatio: 0.6,
    groupSpacing: 4,
    legendWidth: 100,
    ...chart.pie
  };
  // Customize chart proportionalArea props off of chart area props
  chart.proportionalArea = {
    reference: defaultReference,
    ...chart.area,
    ...chart.proportionalArea
  };
  // Use pie chart colorScale prop if proportionalArea doesn't have one
  if (!chart.proportionalArea.colorScale && chart.pie) {
    chart.proportionalArea.colorScale = chart.pie.colorScale;
  }

  return chart;
}
