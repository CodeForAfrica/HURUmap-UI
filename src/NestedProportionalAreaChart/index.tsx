import React from 'react';
import { Theme } from '@material-ui/core';
import { useTheme } from '@material-ui/styles';
import {
  VictoryCommonProps,
  VictoryDatableProps,
  VictoryMultiLabeableProps
} from 'victory';

import ScaledCircle from './ScaledCircle';
import ScaledSquare from './ScaledSquare';
import ThemedComponent from '../ThemedComponent';

interface Props
  extends VictoryCommonProps,
    VictoryDatableProps,
    VictoryMultiLabeableProps {
  square?: boolean;
}

function NestedProportionalAreaChart({ data, square = false }: Props) {
  const theme = useTheme<Theme>();
  const { proportionalArea: chart } = theme.chart;
  if (!data || !chart) {
    return null;
  }

  const padding =
    typeof chart.padding === 'number'
      ? { padding: chart.padding }
      : {
          paddingTop: chart.padding.top,
          paddingRight: chart.padding.right,
          paddingBottom: chart.padding.bottom,
          paddingLeft: chart.padding.left
        };
  const style = Object.assign(padding, chart.style.parent, {
    width: '100%',
    height: '100%'
  });

  const { data: dataStyle } = chart.style;
  // Use chart.data as fill style for background/total chart
  const colorScale =
    dataStyle && typeof dataStyle.fill === 'string'
      ? [dataStyle.fill, ...chart.colorScale]
      : chart.colorScale;
  return (
    <svg style={style} viewBox={`0 0 ${chart.width} ${chart.height}`}>
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
    </svg>
  );
}

export default function({ ...props }: Props) {
  return (
    <ThemedComponent>
      <NestedProportionalAreaChart {...props} />
    </ThemedComponent>
  );
}
