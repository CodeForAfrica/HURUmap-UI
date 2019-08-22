import React from 'react';
import PropTypes from 'prop-types';

import { VictoryLabel, VictoryTooltip } from 'victory';

import withVictoryTheme from '../styles/withVictoryTheme';

function DonutLabel({ datum = { _x: 1 }, ...props }) {
  const { colorScale = [], height, style: originalStyle, text, width } = props;
  const size = Math.min.apply(null, [height, width]);
  const style = Array.isArray(colorScale)
    ? Object.assign({}, originalStyle, {
        // eslint-disable-next-line no-underscore-dangle
        fill: colorScale[(datum._x - 1) % colorScale.length]
      })
    : originalStyle;

  return (
    <g>
      <VictoryLabel {...props} style={style} />
      <VictoryTooltip
        {...props}
        cornerRadius={size / 2}
        flyoutStyle={{ fill: 'black' }}
        height={size}
        orientation="top"
        pointerLength={0}
        style={style}
        text={text}
        width={size}
      />
    </g>
  );
}

DonutLabel.defaultEvents = VictoryTooltip.defaultEvents;

DonutLabel.propTypes = {
  colorScale: PropTypes.arrayOf(PropTypes.shape({})),
  // TODO(kilemensi): Seems like datum has _x variable that tracks the
  //                  data index (but it starts from 1).
  datum: PropTypes.shape({ _x: PropTypes.number }),
  height: PropTypes.number,
  style: PropTypes.shape({}),
  text: PropTypes.string,
  width: PropTypes.number
};

DonutLabel.defaultProps = {
  colorScale: undefined,
  datum: undefined,
  height: undefined,
  style: undefined,
  text: undefined,
  width: undefined
};

export default withVictoryTheme(DonutLabel);
