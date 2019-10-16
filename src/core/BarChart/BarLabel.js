import React from 'react';
import PropTypes from 'prop-types';

import { VictoryLabel } from 'victory';

import Tooltip from '../Tooltip';

function BarLabel({
  datum,
  text,
  tooltipProps: { data, ...tooltipProps },
  x,
  y,
  ...props
}) {
  return (
    <>
      <VictoryLabel datum={datum} text={text} {...props} />
      <Tooltip
        {...tooltipProps}
        datum={datum}
        text={
          // eslint-disable-next-line no-underscore-dangle
          (data && datum && data[datum._x - 1] && data[datum._x - 1].tooltip) ||
          text
        }
        x={x}
        y={y}
        // eslint-disable-next-line react/prop-types, no-underscore-dangle
        {...props}
      />
    </>
  );
}

BarLabel.propTypes = {
  datum: PropTypes.shape({ _x: PropTypes.number }),
  text: PropTypes.oneOfType([PropTypes.string, PropTypes.func]),
  tooltipProps: PropTypes.shape({
    data: PropTypes.arrayOf(
      PropTypes.shape({
        tooltip: PropTypes.string
      })
    )
  }).isRequired,
  x: PropTypes.number,
  y: PropTypes.number
};

/**
 * Enable tooltip to show on mouse over.
 */
BarLabel.defaultEvents = Tooltip.defaultEvents;

BarLabel.defaultProps = {
  datum: undefined,
  text: undefined,
  x: undefined,
  y: undefined
};

export default BarLabel;
