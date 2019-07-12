import createMuiTheme, {
  ThemeOptions
} from '@material-ui/core/styles/createMuiTheme';
import { VictoryThemeDefinitionLatest, VictoryTheme } from 'victory';

declare module '@material-ui/core/styles/createMuiTheme' {
  interface Theme {
    chart: VictoryThemeDefinitionLatest;
  }

  interface ThemeOptions {
    chart?: VictoryThemeDefinitionLatest;
  }
}

export default function createTheme(options?: ThemeOptions) {
  // Customize chart theme off of Victory Material theme
  const chartOptions = options ? options.chart : null;
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
  return createMuiTheme(Object.assign({}, options, { chart }));
}
