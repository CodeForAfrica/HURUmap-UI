import React from 'react';
import { WithStyles } from '@material-ui/core';
import { createStyles, withStyles } from '@material-ui/styles';

const styles = createStyles({
  legendRoot: {
    height: '4rem',
    width: '5rem'
  },
  topLegend: {
    position: 'absolute',
    zIndex: 1,
    top: 0,
    left: '3rem',
    fontSize: '2.5rem',
    listStyleType: 'none'
  },
  bottomLegend: {
    position: 'absolute',
    zIndex: 1,
    top: '32.5rem',
    left: '3rem',
    fontSize: '1rem'
  }
});

interface Props extends WithStyles<typeof styles> {
  classes: any;
  firstLegend: number | string;
  secondLegend: number | string;
  bottomLegendNumber: number | string;
  bottomLegendText: number | string;
}

function RectLegend({
  classes,
  firstLegend,
  secondLegend,
  bottomLegendNumber,
  bottomLegendText
}: Props) {
  return (
    <div>
      <div className={classes.legendRoot}>
        <g className={classes.topLegend}>
          <li>
            <text style={{ color: '#7f9442' }}>{firstLegend}</text>
          </li>
          <li>
            <text style={{ color: '#de9f3a' }}>{secondLegend}</text>
          </li>
        </g>
      </div>

      <g className={classes.bottomLegend}>
        <text>
          {bottomLegendNumber}
          <br />
          {bottomLegendText}
        </text>
      </g>
    </div>
  );
}

export default withStyles(styles)(RectLegend);
