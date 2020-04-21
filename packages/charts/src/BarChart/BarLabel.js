import React from "react";
import PropTypes from "prop-types";

import { VictoryLabel } from "victory";

import { labels as defaultLabels } from "../utils";
import Tooltip from "../Tooltip";

function BarLabel({
  datum,
  labels: labelsProp,
  text,
  tooltipProps: { data, ...tooltipProps },
  x,
  y,
  ...props
}) {
  const labels = labelsProp || defaultLabels;
  let tooltip = text;
  // eslint-disable-next-line no-underscore-dangle
  if (data && datum && data[datum._x - 1]) {
    // eslint-disable-next-line no-underscore-dangle
    tooltip = data[datum._x - 1].tooltip || labels(data[datum._x - 1]);
  }

  return (
    <>
      <VictoryLabel datum={datum} text={text} {...props} />
      <Tooltip
        {...tooltipProps}
        datum={datum}
        text={tooltip}
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
  labels: PropTypes.func,
  text: PropTypes.oneOfType([PropTypes.string, PropTypes.func]),
  tooltipProps: PropTypes.shape({
    data: PropTypes.arrayOf(
      PropTypes.shape({
        tooltip: PropTypes.string,
      })
    ),
  }).isRequired,
  x: PropTypes.number,
  y: PropTypes.number,
};

/**
 * Enable tooltip to show on mouse over.
 */
BarLabel.defaultEvents = Tooltip.defaultEvents;

BarLabel.defaultProps = {
  datum: undefined,
  labels: undefined,
  text: undefined,
  x: undefined,
  y: undefined,
};

export default BarLabel;
