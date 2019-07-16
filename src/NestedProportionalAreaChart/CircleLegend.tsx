import React from 'react';
import { WithStyles } from '@material-ui/core';
import { createStyles, withStyles } from '@material-ui/styles';

const styles = createStyles({
  leftGroup: {
    position: 'absolute',
    zIndex: 1,
    top: '9.5rem',
    left: '-12rem'
  },
  rightGroup: {
    position: 'absolute',
    zIndex: 1,
    top: '9.5rem',
    left: '30rem'
  },
  bottomGroup: {
    position: 'absolute',
    zIndex: 1,
    top: '20rem',
    left: '30rem',
    fontSize: '1.5rem'
  },
  lineGroup: {
    position: 'absolute',
    zIndex: 1,
    top: '-4.5rem',
    left: '-4.2rem'
  }
});

interface Props extends WithStyles<typeof styles> {
  classes: any;
  leftGroupNumber: number | string;
  groupText: string;
  rightGroupNumber: number | string;
  bottomGroupNumber: number | string;
  bottomGrouptext: string;
}

function CircleLegend({
  classes,
  leftGroupNumber,
  rightGroupNumber,
  groupText,
  bottomGroupNumber,
  bottomGrouptext
}: Props) {
  return (
    <div>
      <g className={classes.leftGroup}>
        <text>
          <span style={{ fontSize: '3rem' }}>{leftGroupNumber}</span>
          <br />
          <span>{groupText}</span>
        </text>
      </g>
      <g className={classes.rightGroup}>
        <text>
          <span style={{ fontSize: '3rem' }}>{rightGroupNumber}</span>
          <br />
          <span>{groupText}</span>
        </text>
      </g>
      <g className={classes.bottomGroup}>
        <text>
          {bottomGroupNumber}
          <br />
          {bottomGrouptext}
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
          x1="320"
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

export default withStyles(styles)(CircleLegend);
