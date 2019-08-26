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
    // remember to create a copy of the array as not to modify it
    const dataToSort = data.slice(0);
    sortedData =
      sortKey[0] === '-'
        ? dataToSort.sort(sortDescending)
        : dataToSort.sort(sort);
  }
  return sortedData;
};

function DonutLabel({ colorScale, data, sortKey, x, y, ...props }) {
  const textData = sortData(data, sortKey)[0];
  const textIndex = data.findIndex(d => d.x === textData.x) + 1;

  return (
    <PieLabel
      colorScale={colorScale}
      datum={{ _x: textIndex }}
      text={textData.label}
      x={x}
      y={y}
      {...props}
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
