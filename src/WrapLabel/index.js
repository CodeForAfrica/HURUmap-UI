import React, { useEffect, useRef } from 'react';
import PropTypes from 'prop-types';

import wrapSVGText from './wrapSVGText';

function WrapLabel({ width, text, x, y, style, transform, textAnchor }) {
  const ref = useRef();

  useEffect(() => {
    if (ref.current) {
      wrapSVGText(ref.current, text, width);
    }
  }, [text, width, x]);

  const uniqueId =
    Math.random()
      .toString(36)
      .substring(2) + Date.now().toString(36);

  return (
    <text
      key={uniqueId}
      ref={node => {
        ref.current = node;
      }}
      x={x}
      y={y}
      style={style}
      transform={transform}
      textAnchor={textAnchor}
    />
  );
}

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
  y: PropTypes.number
};

WrapLabel.defaultProps = {
  text: undefined,
  style: undefined,
  textAnchor: undefined,
  transform: undefined,
  x: undefined,
  y: undefined
};

export default WrapLabel;
