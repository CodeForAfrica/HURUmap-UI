import React from 'react';
import { withStyles } from '@material-ui/core';
import { createStyles, StyleRules, WithStyles } from '@material-ui/core/styles';

import withTheme from '../withTheme';

const styles = (): StyleRules => {
  return createStyles({
    root: {}
  });
};

function BarChart({
  classes
}: WithStyles<typeof styles>): React.FunctionComponentElement<{}> {
  return <div className={classes.root} />;
}

export default withTheme(withStyles(styles)(BarChart));
