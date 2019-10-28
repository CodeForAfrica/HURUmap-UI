import { createMuiTheme } from '@material-ui/core/styles';
import createVictoryTheme from './createVictoryTheme';
export default function createTheme(options) {
  var chart = createVictoryTheme(options && options.chart);
  return createMuiTheme(Object.assign({}, options, {
    chart: chart
  }));
}