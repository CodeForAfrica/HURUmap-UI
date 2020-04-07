import React from 'react';

import { Point } from 'victory';
import propTypes from './propTypes';

function LegendPoint({ labelWidth, x, datum, ...props }) {
  const { column, size, symbolSpacer } = datum || {};
  return (
    <Point
      // Using this until we figure out how to use victory gutter
      x={column * (labelWidth + size + symbolSpacer) + 70}
      datum={datum}
      {...props}
    />
  );
}

LegendPoint.propTypes = {
  x: propTypes.number,
  labelWidth: propTypes.number.isRequired,
  datum: propTypes.shape({
    description: propTypes.string,
    y: propTypes.number
  })
};

LegendPoint.defaultProps = {
  x: undefined,
  datum: undefined
};

export default LegendPoint;
