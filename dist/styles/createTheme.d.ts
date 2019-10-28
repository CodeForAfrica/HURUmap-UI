import { ThemeOptions } from '@material-ui/core/styles/createMuiTheme';
import { VictoryThemeDefinitionLatest } from 'victory';
declare module '@material-ui/core/styles/createMuiTheme' {
    interface Theme {
        chart: VictoryThemeDefinitionLatest;
    }
    interface ThemeOptions {
        chart?: VictoryThemeDefinitionLatest;
    }
}
export default function createTheme(options?: ThemeOptions): import("@material-ui/core/styles/createMuiTheme").Theme;
