import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { VictoryLabel, VictoryTooltip } from 'victory';

function BarLabel({ tooltipProps, active, x, y, ...props }) {
  /**
   * Minus 25 to ovoid tooltip overlap with the label
   */
  const [tooltipPosition, setTooltipPosition] = useState({ x, y: y - 25 });
  useEffect(() => {
    function mouseMove(e) {
      if (active) {
        setTooltipPosition({
          x,
          y: e.clientY + 25
        });
      }
    }

    window.addEventListener('mousemove', mouseMove);

    return () => {
      window.removeEventListener('mousemove', mouseMove);
    };
  }, [active, x]);
  const uniqueId =
    Math.random()
      .toString(36)
      .substring(2) + Date.now().toString(36);

  return (
    <g>
      <VictoryLabel key={uniqueId} x={x} y={y} {...props} />
      <VictoryTooltip
        key={uniqueId}
        active={active}
        x={tooltipPosition.x}
        y={tooltipPosition.y}
        {...tooltipProps}
        {...props}
      />
    </g>
  );
}

BarLabel.propTypes = {
  tooltipProps: PropTypes.shape({}).isRequired,
  active: PropTypes.bool,
  x: PropTypes.number,
  y: PropTypes.number
};

/**
 * Enable tooltip to show on mouse over.
 */
BarLabel.defaultEvents = VictoryTooltip.defaultEvents;

BarLabel.defaultProps = {
  active: false,
  x: undefined,
  y: undefined
};

export default BarLabel;
