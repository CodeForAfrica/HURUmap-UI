import createMuiTheme, {
  ThemeOptions
} from '@material-ui/core/styles/createMuiTheme';
import { VictoryThemeDefinition, VictoryTheme } from 'victory';

interface VictoryThemeDefinitionLatest extends VictoryThemeDefinition {
  pie?: VictoryThemeDefinition['pie'] & {
    width: number;
    height: number;
    colorScale: string[];
  };
}

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
  const chart =
    options && options.chart
      ? Object.assign({}, VictoryTheme.material, options.chart)
      : VictoryTheme.material;
  return createMuiTheme(Object.assign({}, options, { chart }));
}
