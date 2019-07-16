import React from 'react';
import {
  VictoryCommonProps,
  VictoryDatableProps,
  VictoryMultiLabeableProps,
  VictoryThemeDefinitionLatest
} from 'victory';

import withVictoryTheme from '../styles/withVictoryTheme';
import CustomContainer from '../CustomContainer';
import ScaledCircle from './ScaledCircle';
import ScaledSquare from './ScaledSquare';

interface Props
  extends VictoryCommonProps,
    VictoryDatableProps,
    VictoryMultiLabeableProps {
  square?: boolean;
}

function NestedProportionalAreaChart({
  width,
  height,
  theme,
  data,
  square = false
}: Props) {
  const {
    proportionalArea: chart
  } = (theme as unknown) as VictoryThemeDefinitionLatest;
  if (!data || !chart) {
    return null;
  }
  const computedHeight = height || chart.height;
  const computedWidth = width || chart.width;
  const minDimension = Math.min(computedHeight, computedWidth);
  return (
    <CustomContainer
      height={height || chart.height}
      width={width || chart.height}
    >
      {square ? (
        <ScaledSquare
          colorScale={chart.colorScale}
          relativeTo={data[0]}
          sides={data}
          size={minDimension}
          x={0}
          y={0}
        />
      ) : (
        <ScaledCircle
          colorScale={chart.colorScale}
          cx={minDimension / 2}
          cy={minDimension / 2}
          radii={data}
          relativeTo={data[0]}
          size={minDimension / 2 - 8}
          theme={(theme as unknown) as VictoryThemeDefinitionLatest}
          height={height}
          width={width}
        />
      )}
    </CustomContainer>
  );
}

export default withVictoryTheme(NestedProportionalAreaChart);
