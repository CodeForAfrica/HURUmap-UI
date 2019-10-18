import React from 'react';
import PropTypes from 'prop-types';

import propTypes from '../propTypes';
import Label from '../Label';
import Tooltip from '../Tooltip';

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
      <Label width={width} {...props} />
      <Tooltip
        constrainToVisibleArea
        {...props}
        datum={{ _x: index + 1, ...datum }}
        text={data[index].label}
        labelComponent={<Label colorScale={colorScale} />}
      />
    </g>
  );
}

LegendLabel.propTypes = {
  colorScale: propTypes.colorScale,
  data: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string
    })
  ),
  datum: PropTypes.shape({}),
  index: PropTypes.number,
  width: PropTypes.number
};

LegendLabel.defaultProps = {
  colorScale: undefined,
  data: undefined,
  datum: undefined,
  index: undefined,
  width: undefined
};

export default LegendLabel;
