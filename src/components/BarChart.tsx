import React from 'react';
import { withStyles } from '@material-ui/core';
import { createStyles } from '@material-ui/core/styles';
import { VictoryBar } from 'victory';

import withTheme from '../withTheme';

const styles = createStyles({
  root: {}
});

function BarChart({ classes, theme }: any) {
  return <VictoryBar theme={theme.chart} />;
}

export default withTheme(withStyles(styles)(BarChart));
