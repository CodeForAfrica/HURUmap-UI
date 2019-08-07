import React from 'react';

import {
  ColorScalePropType,
  VictoryTooltip,
  VictoryTooltipProps
} from 'victory';

import withVictoryTheme from './styles/withVictoryTheme';

export interface TooltipProps extends VictoryTooltipProps {
  colorScale?: ColorScalePropType | undefined;
}

function Tooltip({
  colorScale: cS = [],
  index: i = 0,
  style: s,
  ...props
}: TooltipProps) {
  const colorScale = cS;
  const index = typeof i === 'number' ? i : 0;
  const style = Object.assign({}, s, {
    fill: colorScale[index % colorScale.length]
  });
  return <VictoryTooltip index={i} {...props} style={style} />;
}

export default withVictoryTheme(Tooltip);
