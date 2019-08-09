import React, { useState } from 'react';

import { withStyles, createStyles, WithStyles } from '@material-ui/styles';
import { Typography, Theme } from '@material-ui/core';

const styles = ({ breakpoints }: Theme) =>
  createStyles({
    root: {
      width: '100%',
      height: 'auto',
      margin: '1rem',
      [breakpoints.up('md')]: {
        width: '25%'
      }
    },
    hidden: {
      display: 'none'
    },
    mainStatistic: {
      display: ' block',
      marginTop: '1em',
      marginBottom: '0.5em'
    },
    h3: {
      display: 'block',
      fontSize: '2.2em',
      lineHeight: 1,
      margin: '0 0 .1825em',
      fontWeight: 700
    },
    h3Deviation: {
      fontSize: '0.6em',
      color: '#777',
      fontWeight: 400,
      display: 'inlineBlock'
    },
    description: {
      marginBottom: '0.6em'
    },
    h5: {
      fontSize: '1.2em',
      color: '#777',
      fontWeight: 400
    },
    comparison: {
      fontWeight: 'bold'
    },
    parentDescription: {
      fontWeight: 'normal'
    },
    parent: {
      color: '#777'
    }
  });

interface Props extends WithStyles<typeof styles> {
  classes: any;
  subtitle?: string | number;
  statistic?: number | string;
  statisticDeviation?: number | string;
  secondaryDeviation?: number | string;
  description?: number | string;
  parentComparison?: number | string;
  parentDescription?: number | string;
  parentDeviation?: number | string;
}

function NumberVisuals({
  classes,
  subtitle,
  statistic,
  statisticDeviation,
  secondaryDeviation,
  description,
  parentComparison,
  parentDescription,
  parentDeviation
}: Props) {
  const [onHover, setOnHover] = useState(false);
  const toggleHover = () => setOnHover(!onHover);
  return (
    <div className={classes.root}>
      <Typography variant="h5">{subtitle}</Typography>
      <div className={classes.mainStatistic}>
        <Typography
          variant="h3"
          onMouseEnter={toggleHover}
          onMouseLeave={toggleHover}
        >
          {` `}
          {statistic}
          <span className={!onHover ? classes.hidden : classes.h3Deviation}>
            {' '}
            {statisticDeviation}
          </span>
        </Typography>
        <Typography className={!onHover ? classes.hidden : classes.h5}>
          {' '}
          {secondaryDeviation}
        </Typography>
      </div>
      <Typography variant="h4" className={classes.description}>
        {description}
      </Typography>
      <Typography variant="h6" className={classes.parent}>
        <span className={classes.comparison}>
          {` `}
          {parentComparison}
        </span>
        <span className={classes.parentDescription}>
          {` `}
          {parentDescription}
        </span>
        <span className={!onHover ? classes.hidden : classes.h5}>
          {` `}
          {parentDeviation}
        </span>
      </Typography>

      <Typography variant="h6" className={classes.parent}>
        <span className={classes.comparison}>
          {` `}
          {parentComparison}
        </span>
        <span className={classes.parentDescription}>
          {` `}
          {parentDescription}
        </span>
        <span className={!onHover ? classes.hidden : classes.h5}>
          {` `}
          {parentDeviation}
        </span>
      </Typography>
    </div>
  );
}

export default withStyles(styles)(NumberVisuals);
