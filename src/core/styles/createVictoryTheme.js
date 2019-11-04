import _ from 'lodash';

import { VictoryTheme } from 'victory';

export default function createVictoryTheme(chartOptions) {
  const defaultTheme = _.merge(
    // New props
    {
      breakpoints: {
        // Handsets: https://material.io/design/layout/responsive-layout-grid.html#breakpoints
        // Lets use Material UI language here
        sm: 600
      },
      axis: {
        labelWidth: 20
      }
    },

    // Victory props
    VictoryTheme.material,

    // Overriding props,
    {
      independentAxis: {
        style: {
          grid: {
            display: 'none'
          }
        }
      },
      dependentAxis: {
        orientation: 'right',
        style: {
          axis: {
            display: 'none'
          },
          axisLabel: {
            display: 'none'
          },
          grid: {
            strokeDasharray: 'none',
            stroke: 'rgb(236, 239, 241)'
          },
          ticks: {
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
        padding: 0,
        width: 450
      },
      tooltip: {
        flyoutStyle: {
          fill: '#fff'
        },
        pointerLength: 0
      },
      voronoi: {
        style: {
          flyout: {
            fill: '#fff'
          }
        }
      }
    }
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
  // Customize chart bar props
  chart.bar = {
    legend: {
      align: 'bottom',
      orientation: 'horizontal',
      size: 50
    },
    ...chart.bar
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
    barHeight: 5,
    referenceStyle: {
      labels: { fill: '#9b9b9b' },
      data: { fill: '#9b9b9b', fontWeight: 'bold' }
    },
    ...chart.group,
    style: {
      data: {
        fontSize: '24px',
        fontWeight: 'bold'
      }
    },
    ...chart.comparisonBar
  };
  // Customize chart line props off of chart group props
  chart.line = {
    colorScale: chart.group.colorScale,
    legend: {
      align: 'bottom',
      orientation: 'horizontal',
      size: 50
    },
    ...chart.line
  };
  // Customize chart pie props
  chart.pie = {
    donut: true,
    donutHighlightIndex: 1,
    // Default VictoryTheme.material font size is 12
    // see: https://github.com/FormidableLabs/victory/blob/master/packages/victory-core/src/victory-theme/material.js
    donutHighlightStyle: { fontWeight: 'bold', fontSize: 18 },
    donutRatio: 0.6,
    emphasisCoefficient: 0.15,
    groupSpacing: 4,
    legend: {
      align: 'right',
      orientation: 'vertical',
      size: 100
    },
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
