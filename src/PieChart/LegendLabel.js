import React from 'react';
import PropTypes from 'prop-types';

import { VictoryTooltip } from 'victory';

import PieLabel from './PieLabel';

/**
 * VictoryLegend only uses `name` for displaying the key. This component
 * adds label recognition to legend via tooltip.
 *
 * @param {*} props .
 */
// while we need `width` for the label, we don't need it for tooltip
function LegendLabel({ width, ...props }) {
  const { colorScale, data, datum, index } = props;

  return (
    <g>
      <PieLabel width={width} {...props} />
      <VictoryTooltip
        constrainToVisibleArea
        {...props}
        datum={{ _x: index + 1, ...datum }}
        text={data[index].label}
        labelComponent={<PieLabel colorScale={colorScale} />}
      />
    </g>
  );
}

LegendLabel.defaultEvents = VictoryTooltip.defaultEvents;

LegendLabel.propTypes = {
  colorScale: PropTypes.arrayOf(PropTypes.shape({})),
  data: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string
    })
  ),
  datum: PropTypes.arrayOf(PropTypes.shape({})),
  index: PropTypes.number,
  width: PropTypes.number
};

LegendLabel.defaultProps = {
  data: undefined,
  colorScale: undefined,
  datum: undefined,
  index: undefined,
  width: undefined
};

export default LegendLabel;
