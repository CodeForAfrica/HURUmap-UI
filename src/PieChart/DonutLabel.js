import React from 'react';
import PropTypes from 'prop-types';

import { VictoryTooltip } from 'victory';

import PieLabel from './PieLabel';

function DonutLabel(props) {
  const { colorScale, x, y } = props;
  return (
    <g>
      <PieLabel colorScale={colorScale} text="boom" x={x} y={y} />
      <VictoryTooltip labelComponent={<PieLabel />} {...props} />
    </g>
  );
}

DonutLabel.defaultEvents = VictoryTooltip.defaultEvents;

DonutLabel.propTypes = {
  colorScale: PropTypes.arrayOf(PropTypes.shape({})),
  x: PropTypes.number,
  y: PropTypes.number
};

DonutLabel.defaultProps = {
  colorScale: undefined,
  x: undefined,
  y: undefined
};

export default DonutLabel;
