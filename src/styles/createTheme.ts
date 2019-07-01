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

export default function createTheme() {
  return createMuiTheme({
    chart: VictoryTheme.material
  });
}
