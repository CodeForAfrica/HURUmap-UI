import {
  VictoryTheme,
  VictoryThemeDefinitionLatest,
  VictoryThemeDefinition
} from 'victory';

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
  const style = (chart.axis as any).style as VictoryThemeDefinition['axis'];
  if (style) {
    style.axisLabel = Object.assign({}, style.axisLabel, { display: 'none' });
    style.tickLabels = Object.assign({}, style.tickLabels, { display: 'none' });
    style.ticks = Object.assign({}, style.ticks, { display: 'none' });
    style.grid = Object.assign({}, style.grid, { display: 'none' });
    style.axis = Object.assign({}, style.axis, { display: 'none' });
  }

  return chart;
}
