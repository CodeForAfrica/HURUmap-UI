import React from 'react';
import { WithStyles } from '@material-ui/core';
import { createStyles, withStyles } from '@material-ui/styles';
import ThemedComponent from '../ThemedComponent';

const styles = createStyles({
  leftGroup: {
    position: 'absolute',
    zIndex: 1,
    top: '14rem',
    left: '-8rem'
  },
  rightGroup: {
    position: 'absolute',
    zIndex: 1,
    top: '14rem',
    left: '35rem'
  },
  bottomGroup: {
    position: 'absolute',
    zIndex: 1,
    top: '25rem',
    left: '35rem',
    fontSize: '1.5rem'
  },
  lineGroup: {
    position: 'absolute',
    zIndex: 1,
    top: 0,
    left: 0
  }
});

interface Props extends WithStyles<typeof styles> {
  classes: any;
}

function CircleLegend({ classes }: Props) {
  return (
    <div>
      <g className={classes.leftGroup}>
        <text>
          <span style={{ fontSize: '3rem' }}>2.1m</span>
          <br />
          <span>people</span>
        </text>
      </g>
      <g className={classes.rightGroup}>
        <text>
          <span style={{ fontSize: '3rem' }}>2.3m</span>
          <br />
          <span>people</span>
        </text>
      </g>
      <g className={classes.bottomGroup}>
        <text>
          47.9m
          <br />
          Tanzania
        </text>
      </g>
      <svg
        viewBox="0 0 500 500"
        width="500"
        height="500"
        className={classes.lineGroup}
      >
        <line
          x1="0"
          y1="250"
          x2="160"
          y2="250"
          stroke="#7f9442"
          strokeWidth="2"
        />
        <line
          x1="340"
          y1="250"
          x2="500"
          y2="250"
          stroke="#de9f3a"
          strokeWidth="2"
        />
      </svg>
    </div>
  );
}

export default withStyles(styles)(({ ...props }: Props) => {
  return (
    <ThemedComponent>
      <CircleLegend {...props} />
    </ThemedComponent>
  );
});
