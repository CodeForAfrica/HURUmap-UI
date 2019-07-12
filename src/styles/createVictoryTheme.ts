import { VictoryTheme, VictoryThemeDefinitionLatest } from 'victory';

export default function createVictoryTheme(
  chartOptions?: VictoryThemeDefinitionLatest
) {
  const chart = Object.assign({}, VictoryTheme.material, chartOptions);
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
