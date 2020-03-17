/* eslint-disable react/no-danger */
import React from 'react';
import PropTypes from 'prop-types';

import { Typography, List, ListItem } from '@material-ui/core';
import makeStyles from './styles/makeStyles';

const useStyles = makeStyles(() => ({
  root: {
    width: '100%',
    height: 'auto'
  },
  valueContainer: {
    marginTop: '1rem'
  },
  value: {
    fontSize: '2.25rem',
    '&:hover span.onHover': {
      display: 'inline-block'
    }
  },
  hover: {
    display: 'none',
    color: '#777',
    fontSize: '1rem'
  },
  title: {
    fontSize: '1.25em'
  },
  label: {
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
    fontSize: '1rem',
    lineHeight: 1.3,
    color: '#777',
    '&:hover span.onHover': {
      display: 'inline-block'
    }
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

function NumberChart({ title, data, labels, ...props }) {
  const classes = useStyles(props);

  if (!data[0]) {
    return null;
  }

  const { y, x, label, hover } = data[0];

  return (
    <div className={classes.root}>
      {title && <Typography className={classes.title}>{title || x}</Typography>}

      <div className={classes.valueContainer}>
        <Typography className={classes.value}>
          {Array.isArray(labels) ? labels[0] : labels(data[0])}
          {hover && <span className={`${classes.hover} onHover`}>{hover}</span>}
        </Typography>
      </div>

      {label && <Typography className={classes.label}>{label}</Typography>}

      {data.length > 1 && (
        <List className={classes.list}>
          {data.slice(1).map((d, i) => (
            <ListItem key={d} className={classes.listParent}>
              <Typography className={classes.listTypography}>
                <span
                  dangerouslySetInnerHTML={{
                    __html: decodeHTMLEntities(
                      d.label ||
                        `<b>about ${((100 * d.y) / y).toFixed(
                          1
                        )}% percent</b> of the amount in ${x}: ${
                          Array.isArray(labels) ? labels[i] : labels(d)
                        }`
                    )
                  }}
                />
                <span> </span>
                {d.hover && (
                  <span
                    className={`${classes.hover} onHover`}
                    dangerouslySetInnerHTML={{
                      __html: decodeHTMLEntities(d.hover)
                    }}
                  />
                )}
              </Typography>
            </ListItem>
          ))}
        </List>
      )}
    </div>
  );
}

NumberChart.propTypes = {
  title: PropTypes.string,
  labels: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.arrayOf(PropTypes.string)
  ]),
  data: PropTypes.arrayOf(
    PropTypes.shape({
      x: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
      y: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
      label: PropTypes.string.isRequired,
      hover: PropTypes.string
    })
  )
};

NumberChart.defaultProps = {
  labels: d => d.y,
  title: undefined,
  data: []
};

export default NumberChart;
