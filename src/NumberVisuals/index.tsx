import React, { useState } from 'react';

import { withStyles, createStyles, WithStyles } from '@material-ui/styles';
import { Typography } from '@material-ui/core';

const styles = () =>
  createStyles({
    root: {
      width: '25%'
    },
    hidden: {
      display: 'none'
    },
    h3: {
      fontSize: '14px',
      opacity: 0.4,
      fontWeight: 'normal',
      fontStyle: 'normal',
      lineHeight: 'normal',
      color: '#2c2c2a'
    }
  });

interface Props extends WithStyles<typeof styles> {
  classes: any;
  subtitle?: string | number;
  statistic?: number | string;
  statisticDeviation?: number | string;
  optionalStatisticDeviation?: number | string;
  description?: number | string;
}

function NumberVisuals({
  classes,
  subtitle,
  statistic,
  statisticDeviation,
  optionalStatisticDeviation,
  description
}: Props) {
  const [onHover, setOnHover] = useState(false);
  const toggleHover = () => setOnHover(!onHover);
  return (
    <div className={classes.root}>
      <Typography variant="h6">{subtitle}</Typography>
      <Typography
        variant="h1"
        onMouseEnter={toggleHover}
        onMouseLeave={toggleHover}
      >
        {' '}
        {statistic}
        <span className={!onHover ? classes.hidden : classes.h3}>
          {' '}
          {statisticDeviation}
        </span>
      </Typography>
      <span className={!onHover ? classes.hidden : classes.h3}>
        {' '}
        {optionalStatisticDeviation}
      </span>
      <Typography variant="h5">{description}</Typography>
    </div>
  );
}

export default withStyles(styles)(NumberVisuals);
