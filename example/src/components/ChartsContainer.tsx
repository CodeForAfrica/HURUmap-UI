import React from 'react';
import { WithStyles } from '@material-ui/core';
import { createStyles, withStyles } from '@material-ui/styles';

const styles = createStyles({
  root: {
    maxWidth: '100%',
    height: 'available',
    backgroundColor: '#f1f1ed',
    padding: '50px'
  }
});


interface Props extends WithStyles<typeof styles> {
  children: any;
}

function ChartsContainer({
  classes,
  children
}: Props) {
  return (
    <div className={classes.root}>
      {children}
    </div>
  );
}

export default withStyles(styles)(ChartsContainer);
