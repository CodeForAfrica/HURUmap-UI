import React from 'react';
import PropTypes from 'prop-types';

import { VictoryTooltip } from 'victory';

import PieLabel from './PieLabel';

const sortData = (data, sortKey) => {
  let sortedData = data;
  if (sortKey) {
    const sort = (a, b, whenLarge = 1, whenSmall = -1) => {
      if (a.y > b.y) {
        return whenLarge;
      }
      if (b.y > a.y) {
        return whenSmall;
      }
      return 0;
    };
    const sortDescending = (a, b) => sort(a, b, -1, 1);
    sortedData =
      sortKey[0] === '-' ? data.sort(sortDescending) : data.sort(sort);
  }
  return sortedData;
};

function DonutLabel(props) {
  const { colorScale, data, sortKey, x, y } = props;
  const sortedData = sortData(data, sortKey);

  return (
    <PieLabel
      colorScale={colorScale}
      style={{ textAnchor: 'middle' }}
      text={sortedData[0].label}
      x={x}
      y={y}
    />
  );
}

DonutLabel.defaultEvents = VictoryTooltip.defaultEvents;

DonutLabel.propTypes = {
  colorScale: PropTypes.arrayOf(PropTypes.shape({})),
  data: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  sortKey: PropTypes.oneOf(['value', '-value']),
  x: PropTypes.number,
  y: PropTypes.number
};

DonutLabel.defaultProps = {
  colorScale: undefined,
  sortKey: undefined,
  x: undefined,
  y: undefined
};

export default DonutLabel;
