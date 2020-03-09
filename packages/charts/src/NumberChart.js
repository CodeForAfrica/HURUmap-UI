/* eslint-disable react/no-danger */
import React, { useState } from 'react';
import PropTypes from 'prop-types';

import { Typography, List, ListItem } from '@material-ui/core';
import makeStyles from './styles/makeStyles';

const useStyles = makeStyles(() => ({
  root: {
    width: '100%',
    height: 'auto'
  },
  hidden: {
    display: 'none'
  },
  mainStatistic: {
    marginTop: '1em'
  },
  statistic: {
    fontSize: '2.25rem'
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

const entities = {
  amp: '&',
  apos: "'",
  '#x27': "'",
  '#x2F': '/',
  '#39': "'",
  '#47': '/',
  lt: '<',
  gt: '>',
  nbsp: ' ',
  quot: '"'
};

function decodeHTMLEntities(text) {
  return text.replace(/&([^;]+);/gm, (match, entity) => {
    return entities[entity] || match;
  });
}

function NumberChart({
  title,
  value,
  aside,
  note,
  description,
  breakdowns,
  ...props
}) {
  const classes = useStyles(props);
  const [onHover, setOnHover] = useState(false);
  const toggleHover = () => setOnHover(!onHover);
  return (
    <div className={classes.root}>
      {title && <Typography className={classes.subtitle}>{title}</Typography>}
      <div className={classes.mainStatistic}>
        <Typography
          className={classes.statistic}
          onMouseEnter={toggleHover}
          onMouseLeave={toggleHover}
        >
          {value}
          <span
            className={!onHover ? classes.hidden : classes.statisticDeviation}
          >
            {aside}
          </span>
        </Typography>
        {note && (
          <Typography
            className={!onHover ? classes.hidden : classes.secondaryDeviation}
          >
            {note}
          </Typography>
        )}
      </div>
      <Typography className={classes.description}>{description}</Typography>

      <List className={classes.list}>
        {breakdowns &&
          breakdowns.map(breakdown => (
            <ListItem
              className={classes.listParent}
              key={breakdown.id || breakdown}
            >
              <Typography className={classes.listTypography}>
                <span
                  dangerouslySetInnerHTML={{
                    __html: decodeHTMLEntities(breakdown.description)
                  }}
                />
                <span> </span>
                {breakdown.aside && (
                  <span
                    className={
                      !onHover ? classes.hidden : classes.secondaryDeviation
                    }
                    dangerouslySetInnerHTML={{
                      __html: decodeHTMLEntities(breakdown.aside)
                    }}
                  />
                )}
              </Typography>
            </ListItem>
          ))}
      </List>
    </div>
  );
}

NumberChart.propTypes = {
  title: PropTypes.string,
  value: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
  aside: PropTypes.string,
  note: PropTypes.string,
  description: PropTypes.string.isRequired,
  breakdowns: PropTypes.arrayOf(
    PropTypes.shape({
      value: PropTypes.oneOfType([PropTypes.number, PropTypes.string])
        .isRequired,
      description: PropTypes.string.isRequired,
      hover: PropTypes.string.isRequired
    })
  )
};

NumberChart.defaultProps = {
  title: undefined,
  aside: undefined,
  note: undefined,
  breakdowns: undefined
};

export default NumberChart;
