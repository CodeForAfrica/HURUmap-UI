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
        // eslint-disable-next-line no-underscore-dangle
        text={(data && datum && data[datum._x - 1].tooltip) || text}
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
  text: PropTypes.string,
  tooltipProps: PropTypes.shape({
    data: PropTypes.shape({})
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
