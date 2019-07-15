import { VictoryTheme, VictoryThemeDefinitionLatest } from 'victory';

export default function createVictoryTheme(
  chartOptions?: VictoryThemeDefinitionLatest
) {
  const chart = Object.assign(
    {
      axis: {
        style: {
          axisLabel: { display: 'none' },
          tickLabels: { display: 'none' },
          ticks: { display: 'none' },
          grid: { display: 'none' },
          axis: { display: 'none' }
        }
      }
    },
    VictoryTheme.material,
    {
      group: {
        colorScale: ['#7F9442', '#DE9F39']
      },
      pie: {
        ...VictoryTheme.material.pie,
        colorScale: [
          '#7F9442',
          '#DE9F39',
          '#7F9442CC',
          '#DE9F39CC',
          '#7F944299',
          '#DE9F3999',
          '#7F944266',
          '#DE9F3966'
        ]
      }
    },
    chartOptions
  );
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
