import React from 'react';
import { WithStyles } from '@material-ui/core';
import { createStyles, withStyles } from '@material-ui/styles';
import ThemedComponent from '../ThemedComponent';

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
    color: 'grey',
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
}

function RectLegend({ classes }: Props) {
  return (
    <div>
      <div className={classes.legendRoot}>
        <g className={classes.topLegend}>
          <li>
            <text style={{ color: '#7f9442' }}>760,000</text>
          </li>
          <li>
            <text style={{ color: '#de9f3a' }}>679,000</text>
          </li>
        </g>
      </div>

      <g className={classes.bottomLegend}>
        <text>
          47.9m
          <br />
          Tanzania
        </text>
      </g>
    </div>
  );
}

export default withStyles(styles)(({ ...props }: Props) => {
  return (
    <ThemedComponent>
      <RectLegend {...props} />
    </ThemedComponent>
  );
});
