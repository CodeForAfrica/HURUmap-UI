import createMuiTheme, {
  ThemeOptions
} from '@material-ui/core/styles/createMuiTheme';
import { VictoryThemeDefinition, VictoryTheme } from 'victory';

declare module '@material-ui/core/styles/createMuiTheme' {
  interface Theme {
    chart: VictoryThemeDefinition;
  }

  interface ThemeOptions {
    chart?: VictoryThemeDefinition;
  }
}

export default function createTheme(options?: ThemeOptions) {
  // Customize chart theme off of Material theme
  const chart =
    options && options.chart
      ? Object.assign({}, VictoryTheme.material, options.chart)
      : VictoryTheme.material;
  return createMuiTheme(Object.assign({}, options, { chart }));
}
