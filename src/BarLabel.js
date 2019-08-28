import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { VictoryLabel, VictoryTooltip } from 'victory';

function BarLabel({
  tooltipProps: { data, ...tooltipProps },
  datum,
  active,
  x,
  y,
  ...props
}) {
  /**
   * Minus 25 to ovoid tooltip overlap with the label
   */
  const [tooltipPosition, setTooltipPosition] = useState({ x, y: y - 25 });
  useEffect(() => {
    function mouseMove(e) {
      if (active) {
        const bbox = e.target.getBBox();
        setTooltipPosition({
          x,
          y: bbox.y + bbox.height / 2
        });
      }
    }

    window.document.body.addEventListener('mousemove', mouseMove);

    return () => {
      window.document.body.removeEventListener('mousemove', mouseMove);
    };
  }, [active, x]);

  const uniqueId = () =>
    Math.random()
      .toString(36)
      .substring(2) + Date.now().toString(36);

  return (
    <>
      <VictoryLabel key={uniqueId()} x={x} y={y} datum={datum} {...props} />
      <VictoryTooltip
        key={uniqueId()}
        active={active}
        x={tooltipPosition.x}
        y={tooltipPosition.y}
        {...tooltipProps}
        datum={datum}
        {...props}
        // eslint-disable-next-line react/prop-types, no-underscore-dangle
        text={data[datum._x - 1].tooltip}
      />
    </>
  );
}

BarLabel.propTypes = {
  tooltipProps: PropTypes.shape({
    data: PropTypes.shape({})
  }).isRequired,
  active: PropTypes.bool,
  x: PropTypes.number,
  y: PropTypes.number,
  datum: PropTypes.shape({})
};

/**
 * Enable tooltip to show on mouse over.
 */
BarLabel.defaultEvents = VictoryTooltip.defaultEvents;

BarLabel.defaultProps = {
  active: false,
  x: undefined,
  y: undefined,
  datum: undefined
};

export default BarLabel;
