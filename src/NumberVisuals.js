import React, { useState } from 'react';
import PropTypes from 'prop-types';

import { makeStyles } from '@material-ui/styles';
import { Typography, List, ListItem, ListItemText } from '@material-ui/core';

const useStyles = makeStyles(({ breakpoints }) => ({
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
  statistic: {
    fontSize: '2.5em'
  },
  statisticDeviation: {
    fontSize: '0.4em',
    color: '#777',
    display: 'inlineBlock'
  },
  secondaryDeviation: {
    fontSize: '1em',
    color: '#777'
  },
  subtitle: {
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
}));

function NumberVisuals({
  subtitle,
  statistic,
  statisticDeviation,
  secondaryDeviation,
  description,
  comparisonData
}) {
  const classes = useStyles();
  const [onHover, setOnHover] = useState(false);
  const toggleHover = () => setOnHover(!onHover);
  return (
    <div className={classes.root}>
      <Typography className={classes.subtitle}>{subtitle}</Typography>
      <div className={classes.mainStatistic}>
        <Typography
          className={classes.statistic}
          onMouseEnter={toggleHover}
          onMouseLeave={toggleHover}
        >
          {` `}
          {statistic}
          <span
            className={!onHover ? classes.hidden : classes.statisticDeviation}
          >
            {' '}
            {statisticDeviation}
          </span>
        </Typography>
        <Typography
          className={!onHover ? classes.hidden : classes.secondaryDeviation}
        >
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
                  <span
                    className={
                      !onHover ? classes.hidden : classes.secondaryDeviation
                    }
                  >
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

NumberVisuals.propTypes = {
  subtitle: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  statistic: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  statisticDeviation: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  secondaryDeviation: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  description: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  comparisonData: PropTypes.arrayOf(PropTypes.shape({}))
};

NumberVisuals.defaultProps = {
  subtitle: undefined,
  statistic: undefined,
  statisticDeviation: undefined,
  secondaryDeviation: undefined,
  description: undefined,
  comparisonData: undefined
};

export default NumberVisuals;
