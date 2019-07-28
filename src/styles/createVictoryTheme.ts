import { VictoryTheme, VictoryThemeDefinitionLatest } from 'victory';
import _ from 'lodash';

export default function createVictoryTheme(
  chartOptions?: VictoryThemeDefinitionLatest
) {
  const defaultTheme = _.merge(
    {
      breakpoints: {
        mobile: 600
      },
      axis: {
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
      }
    },
    VictoryTheme.material
  );
  const chart = _.merge(chartOptions, defaultTheme);
  const defaultReference = {
    data: {
      fill: 'url(#gradient-background)',
      stroke: 'none',
      strokeWidth: 0
    },
    labels: {
      fill: 'gray',
      fontWeight: 'bold',
      fontSize: 24
    }
  };
  // Customize chart bullet props off of chart group props
  chart.bullet = Object.assign(
    {
      barWidth: 5,
      offset: { x: 20, y: 50 },
      style: {
        data: {
          fill: '#d8d8d8'
        },
        labels: {
          fill: '#9b9b9b'
        }
      }
    },
    chart.group,
    chart.bullet
  );
  // Customize chart comparisonBar props off of chart group props
  chart.comparisonBar = Object.assign(
    { reference: defaultReference },
    chart.group,
    chart.comparisonBar
  );
  // Customize chart pie props
  chart.pie = Object.assign({ donut: false, groupSpacing: 8 }, chart.pie);
  // Customize chart proportionalArea props off of chart area props
  chart.proportionalArea = Object.assign(
    { reference: defaultReference },
    chart.area,
    chart.proportionalArea
  );
  // Use pie chart colorScale prop if proportionalArea doesn't have one
  if (!chart.proportionalArea.colorScale && chart.pie) {
    chart.proportionalArea.colorScale = chart.pie.colorScale;
  }

  return chart;
}
