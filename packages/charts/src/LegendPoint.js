import React from 'react';

import { Point } from 'victory';
import propTypes from './propTypes';

function LegendPoint({ labelWidth, x, datum, ...props }) {
  const { column } = datum || {};
  return (
    <Point
      x={column !== 0 ? column * (labelWidth + 80) : x}
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
