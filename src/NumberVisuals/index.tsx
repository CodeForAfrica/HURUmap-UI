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
      marginTop: '1em'
    },
    h3: {
      fontSize: '2.5em'
    },
    h3Deviation: {
      fontSize: '0.35em',
      color: '#777',
      display: 'inlineBlock'
    },
    h5: {
      fontSize: '1em',
      color: '#777'
    },
    h6: {
      fontSize: '1.25em'
    },
    description: {
      fontSize: '1.5em'
    },
    comparison: {
      fontWeight: 'bold'
    },
    list: {
      padding: 0
    },
    listParent: {
      paddingLeft: 0,
      paddingRight: 0
    },
    listTypography: {
      fontSize: '0.9em',
      lineHeight: 1.3,
      color: '#777'
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
      <Typography className={classes.h6}>{subtitle}</Typography>
      <div className={classes.mainStatistic}>
        <Typography
          className={classes.h3}
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
      <Typography className={classes.description}>{description}</Typography>

      <List className={classes.list}>
        {comparisonData.map(d => (
          <ListItem className={classes.listParent}>
            <ListItemText
              primary={
                <Typography className={classes.listTypography}>
                  <span className={classes.comparison}>
                    {` `}
                    {d.parentComparison}
                  </span>
                  <span>
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
