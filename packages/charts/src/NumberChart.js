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
  valueContainer: {
    marginTop: '1em'
  },
  value: {
    fontSize: '2.25rem'
  },
  aside: ({ onHover }) => ({
    fontSize: '0.4em',
    color: '#777',
    display: onHover ? 'inline-block' : 'none'
  }),
  note: ({ onHover }) => ({
    fontSize: '1em',
    color: '#777',
    display: onHover ? 'block' : 'none'
  }),
  title: {
    fontSize: '1.25em'
  },
  description: {
    fontSize: '1.5em'
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
  const [onHover, setOnHover] = useState(false);
  const classes = useStyles({ ...props, onHover });
  const toggleHover = () => setOnHover(!onHover);
  return (
    <div className={classes.root}>
      {title && <Typography className={classes.title}>{title}</Typography>}
      <div className={classes.valueContainer}>
        <Typography
          className={classes.value}
          onMouseEnter={toggleHover}
          onMouseLeave={toggleHover}
        >
          {value}
          <span className={classes.aside}>{aside}</span>
        </Typography>
        {note && <Typography className={classes.note}>{note}</Typography>}
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
                    className={classes.aside}
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
