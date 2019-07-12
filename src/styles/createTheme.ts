import createMuiTheme, {
  ThemeOptions
} from '@material-ui/core/styles/createMuiTheme';
import { VictoryThemeDefinitionLatest } from 'victory';
import createVictoryTheme from './createVictoryTheme';

declare module '@material-ui/core/styles/createMuiTheme' {
  interface Theme {
    chart: VictoryThemeDefinitionLatest;
  }

  interface ThemeOptions {
    chart?: VictoryThemeDefinitionLatest;
  }
}

export default function createTheme(options?: ThemeOptions) {
  const chart = createVictoryTheme(options && options.chart);
  return createMuiTheme(Object.assign({}, options, { chart }));
}
