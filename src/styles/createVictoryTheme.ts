import { VictoryTheme, VictoryThemeDefinitionLatest } from 'victory';
import _ from 'lodash';

export default function createVictoryTheme(
  chartOptions?: VictoryThemeDefinitionLatest
) {
  const defaultTheme = _.merge(
    {
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
  const chart: any = _.merge(chartOptions, defaultTheme);
  // Customize chart pie props
  chart.pie = Object.assign({}, { donut: false, groupSpacing: 8 }, chart.pie);
  // Customize chart proportionalArea props off of chart area props
  chart.proportionalArea = Object.assign(
    {},
    chart.area,
    chart.proportionalArea
  );
  // Use pie chart colorScale prop if proportionalArea doesn't have one
  if (!chart.proportionalArea.colorScale && chart.pie) {
    chart.proportionalArea.colorScale = chart.pie.colorScale;
  }

  return chart;
}
