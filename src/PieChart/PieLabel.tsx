import React from 'react';

import { ColorScalePropType, VictoryLabel, VictoryLabelProps } from 'victory';

import withVictoryTheme from '../styles/withVictoryTheme';

export interface PieLabelProps extends VictoryLabelProps {
  colorScale?: ColorScalePropType;
  // TODO(kilemensi): Seems like datum has _x variable that tracks the
  //                  data index (but it starts from 1).
  datum?: { _x: number };
}

function PieLabel({
  colorScale = [],
  datum = { _x: 1 },
  style: originalStyle,
  ...props
}: PieLabelProps) {
  const style = Array.isArray(colorScale)
    ? Object.assign({}, originalStyle, {
        // eslint-disable-next-line no-underscore-dangle
        fill: colorScale[(datum._x - 1) % colorScale.length]
      })
    : originalStyle;

  return <VictoryLabel style={style} {...props} />;
}

export default withVictoryTheme(PieLabel);
