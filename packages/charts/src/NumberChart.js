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

function NumberChart({ title, data, labels: propLabels, ...props }) {
  const [onHover, setOnHover] = useState(false);
  const classes = useStyles({ ...props, onHover });
  const toggleHover = () => setOnHover(!onHover);

  if (!data[0]) {
    return null;
  }

  const { y, x, label, hover } = data[0];

  const labels = !propLabels ? d => d.y : propLabels;

  return (
    <div className={classes.root}>
      {title && <Typography className={classes.title}>{title || x}</Typography>}

      <div className={classes.valueContainer}>
        <Typography
          className={classes.value}
          onMouseEnter={toggleHover}
          onMouseLeave={toggleHover}
        >
          {Array.isArray(labels) ? labels[0] : labels(data[0])}
          {hover && hover.bottom && (
            <span className={classes.aside}>
              {typeof hover === 'string' ? hover : hover.right}
            </span>
          )}
        </Typography>
        {typeof hover !== 'string' && hover && hover.bottom && (
          <Typography className={classes.note}>{hover.bottom}</Typography>
        )}
      </div>

      {label && (
        <Typography className={classes.description}>{label}</Typography>
      )}

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
                    className={classes.aside}
                    dangerouslySetInnerHTML={{
                      __html: decodeHTMLEntities(
                        typeof d.hover === 'string' ? d.hover : d.hover.right
                      )
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
  data: PropTypes.arrayOf(
    PropTypes.shape({
      value: PropTypes.oneOfType([PropTypes.number, PropTypes.string])
        .isRequired,
      label: PropTypes.string.isRequired,
      hover: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.shape({
          right: PropTypes.string,
          bottom: PropTypes.string
        })
      ])
    })
  )
};

NumberChart.defaultProps = {
  title: undefined,
  data: []
};

export default NumberChart;
