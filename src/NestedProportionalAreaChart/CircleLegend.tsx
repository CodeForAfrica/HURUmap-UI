import React from 'react';
import { WithStyles } from '@material-ui/core';
import { createStyles, withStyles } from '@material-ui/styles';

const styles = createStyles({
  partValue: {
    position: 'absolute',
    zIndex: 1,
    top: '9.2rem',
    left: '-12rem'
  },
  totalValue: {
    position: 'absolute',
    top: '18rem',
    left: '25rem',
    zIndex: 1,
    fontSize: '1.5rem',
    width: '100%'
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
  partValue: number | string;
  groupText: string;
  totalValueNumber: number | string;
  totalValueText: string;
}

function CircleLegend({
  classes,
  partValue,
  groupText,
  totalValueNumber,
  totalValueText
}: Props) {
  return (
    <div>
      <g className={classes.partValue}>
        <text>
          <span style={{ fontSize: '3rem' }}>{partValue}</span>
          <br />
          <span>{groupText}</span>
        </text>
      </g>
      <g className={classes.totalValue}>
        <text>
          {totalValueNumber}
          <br />
          {totalValueText}
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
      </svg>
    </div>
  );
}

export default withStyles(styles)(CircleLegend);
