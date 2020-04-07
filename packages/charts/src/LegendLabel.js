import React from 'react';
import PropTypes from 'prop-types';

import { VictoryTooltip } from 'victory';

import propTypes from './propTypes';
import Label from './Label';

/**
 * VictoryLegend only uses `name` for displaying the key. This component
 * adds label recognition to legend via tooltip.
 *
 * @param {*} props .
 */
// while we need `width` for the label, we don't need it for tooltip
function LegendLabel({ width, x, ...props }) {
  const { colorScale, datum, index } = props;
  const { column, description, size, symbolSpacer } = datum || {};

  return (
    <g>
      <Label
        width={width}
        // Using this until we figure out how to use victory gutter
        x={column * (width + size + symbolSpacer) + 80}
        {...props}
      />
      {description && description.length ? (
        <VictoryTooltip
          x={x}
          {...props}
          datum={{ _x: index + 1, ...datum }}
          text={description}
          labelComponent={<Label colorScale={colorScale} />}
        />
      ) : null}
    </g>
  );
}

LegendLabel.defaultEvents = VictoryTooltip.defaultEvents;

LegendLabel.propTypes = {
  colorScale: propTypes.colorScale,
  x: PropTypes.number,
  datum: PropTypes.shape({
    description: PropTypes.string,
    y: PropTypes.number
  }),
  index: PropTypes.number,
  text: PropTypes.string,
  width: PropTypes.number
};

LegendLabel.defaultProps = {
  x: undefined,
  colorScale: undefined,
  datum: undefined,
  index: undefined,
  text: undefined,
  width: undefined
};

export default LegendLabel;
