import React from 'react';
import PropTypes from 'prop-types';
import shortid from 'shortid';

import wrapSVGText from './wrapSVGText';
import propTypes from '../propTypes';

const WrapLabel = React.memo(
  ({
    width,
    text,
    x,
    y,
    style,
    transform,
    textAnchor,
    horizontal,
    onMaxDimmension
  }) => {
    return (
      <text
        key={shortid.generate()}
        ref={node => {
          if (node) {
            wrapSVGText(node, text, width, onMaxDimmension, horizontal);
          }
        }}
        x={x}
        y={y}
        style={style}
        transform={transform}
        textAnchor={textAnchor}
      />
    );
  },
  (prevProps, nextProps) => {
    return JSON.stringify(prevProps) === JSON.stringify(nextProps);
  }
);

WrapLabel.propTypes = {
  text: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.string),
    PropTypes.string,
    PropTypes.number
  ]),
  style: PropTypes.shape({}),
  textAnchor: PropTypes.string,
  transform: PropTypes.string,
  width: PropTypes.number.isRequired,
  x: PropTypes.number,
  y: PropTypes.number,
  horizontal: propTypes.bool,
  onMaxDimmension: propTypes.func
};

WrapLabel.defaultProps = {
  horizontal: false,
  onMaxDimmension: () => {},
  text: undefined,
  style: undefined,
  textAnchor: undefined,
  transform: undefined,
  x: undefined,
  y: undefined
};

export default WrapLabel;
