import React, { useState } from 'react';

import { withStyles, createStyles, WithStyles } from '@material-ui/styles';
import {
  Typography,
  Theme,
  List,
  ListItem,
  ListItemText
} from '@material-ui/core';

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
      fontSize: '0.5em',
      color: '#777',
      fontWeight: 400,
      display: 'inlineBlock'
    },
    description: {
      marginBottom: '0.6em'
    },
    h5: {
      fontSize: '1em',
      color: '#777',
      fontWeight: 400
    },

    comparison: {
      fontWeight: 'bold'
    },
    parentDescription: {
      fontWeight: 'normal'
    },
    listItemText: {
      color: '#777'
    },
    listParent: {
      paddingLeft: 0,
      paddingRight: 0
    },
    list: {
      padding: 0
    }
  });

type comparisonData = {
  parentComparison?: number | string;
  parentDescription?: number | string;
  parentDeviation?: number | string;
}[];

interface Props extends WithStyles<typeof styles> {
  classes: any;
  subtitle?: string | number;
  statistic?: number | string;
  statisticDeviation?: number | string;
  secondaryDeviation?: number | string;
  description?: number | string;
  comparisonData: comparisonData;
}

function NumberVisuals({
  classes,
  subtitle,
  statistic,
  statisticDeviation,
  secondaryDeviation,
  description,
  comparisonData
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

      <List className={classes.list}>
        {comparisonData.map(d => (
          <ListItem className={classes.listParent}>
            <ListItemText
              className={classes.listItemText}
              primary={
                <Typography variant="h6">
                  <span className={classes.comparison}>
                    {` `}
                    {d.parentComparison}
                  </span>
                  <span className={classes.parentDescription}>
                    {` `}
                    {d.parentDescription}
                  </span>
                  <span className={!onHover ? classes.hidden : classes.h5}>
                    {` `}
                    {d.parentDeviation}
                  </span>
                </Typography>
              }
            />
          </ListItem>
        ))}
      </List>
    </div>
  );
}

export default withStyles(styles)(NumberVisuals);
