import { createMuiTheme } from '@material-ui/core';
import { VictoryTheme } from 'victory';

const theme = createMuiTheme({});
Object.assign(theme, { chart: VictoryTheme.material });

export default theme;
