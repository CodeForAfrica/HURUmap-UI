import { withStyles } from '@material-ui/core';
// tslint:disable-next-line: no-submodule-imports
import { createStyles, Theme, WithStyles } from '@material-ui/core/styles';
import React from 'react';

import withTheme from '../withTheme';

const styles = (theme: Theme) => {
  return createStyles({
    root: {},
  });
};

interface IBarChartProps extends WithStyles<typeof styles> {
}

function BarChart({ classes }: IBarChartProps) {
  return <div className={classes.root}/>;
}

export default withTheme(withStyles(styles)(BarChart));
