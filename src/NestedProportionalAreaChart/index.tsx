import React from 'react';
import {
  VictoryCommonProps,
  VictoryDatableProps,
  VictoryMultiLabeableProps,
  VictoryChart,
  VictoryThemeDefinitionLatest
} from 'victory';

import ScaledCircle from './ScaledCircle';
import ScaledSquare from './ScaledSquare';
import withVictoryTheme from '../withVictoryTheme';

interface Props
  extends VictoryCommonProps,
    VictoryDatableProps,
    VictoryMultiLabeableProps {
  square?: boolean;
}

function NestedProportionalAreaChart({ theme, data, square = false }: Props) {
  const { proportionalArea: chart } = theme as VictoryThemeDefinitionLatest;
  if (!data || !chart) {
    return null;
  }
  const { data: dataStyle } = chart.style;
  // Use chart.data as fill style for background/total chart
  const colorScale =
    dataStyle && typeof dataStyle.fill === 'string'
      ? [dataStyle.fill, ...chart.colorScale]
      : chart.colorScale;
  return (
    <VictoryChart theme={theme}>
      {square ? (
        <ScaledSquare
          colorScale={colorScale}
          relativeTo={data[0]}
          sides={data}
          size={chart.width}
          x={0}
          y={0}
        />
      ) : (
        <ScaledCircle
          colorScale={colorScale}
          cx={chart.width / 2}
          cy={chart.width / 2}
          radii={data}
          relativeTo={data[0]}
          size={chart.width / 2}
        />
      )}
    </VictoryChart>
  );
}

export default withVictoryTheme(NestedProportionalAreaChart);
