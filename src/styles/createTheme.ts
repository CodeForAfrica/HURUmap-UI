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
  // Customize chart theme off of Material theme
  const chartOptions = options ? options.chart : null;
  const chart = Object.assign({}, VictoryTheme.material, chartOptions);
  return createMuiTheme(Object.assign({}, options, { chart }));
}
