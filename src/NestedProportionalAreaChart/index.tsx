import React from 'react';
import {
  VictoryCommonProps,
  VictoryDatableProps,
  VictoryMultiLabeableProps,
  VictoryThemeDefinitionLatest
} from 'victory';

import { toReferenceProps, ReferableChartProps } from '../ReferableChart';
import withVictoryTheme from '../styles/withVictoryTheme';
import CustomContainer from '../CustomContainer';
import ScaledCircle from './ScaledCircle';
import ScaledSquare from './ScaledSquare';

interface Props
  extends VictoryCommonProps,
    VictoryDatableProps,
    VictoryMultiLabeableProps,
    ReferableChartProps<number> {
  square?: boolean;
  groupSpacing?: number;
}

/**
 * Data value represents **area**. We need to find length/radius in order to
 * draw the shapes. For both squares & circles, √ of the area should give us
 * the length/radius to use (for circle, the √ of π is a constant that drops
 * off when scaling)
 */
function NestedProportionalAreaChart({
  groupSpacing,
  width,
  height,
  theme,
  data,
  reference: ref,
  square = false
}: Props) {
  const {
    proportionalArea: chart
  } = (theme as unknown) as VictoryThemeDefinitionLatest;
  if (!data || !chart) {
    return null;
  }

  const reference = Object.assign(
    {},
    { style: chart.reference },
    toReferenceProps(ref)
  );
  const computedHeight = height || chart.height;
  const computedWidth = width || chart.width;
  const computedGroupSpacing =
    data.length > 1 ? groupSpacing || chart.groupSpacing : 0;
  const minDimension = Math.min(computedHeight, computedWidth);

  return (
    <CustomContainer
      height={height || chart.height}
      width={width || chart.height}
    >
      <defs>
        <pattern
          id="gradient-background"
          patternUnits="userSpaceOnUse"
          width="5.5"
          height="5.5"
          patternTransform="rotate(135)"
        >
          <line x1="0" y="0" x2="0" y2="5.5" stroke="#C4C4C4" strokeWidth="1" />
        </pattern>
      </defs>

      {square ? (
        <ScaledSquare
          colorScale={chart.colorScale}
          reference={reference}
          sides={data}
          size={minDimension}
          x={0}
          y={0}
        />
      ) : (
        <ScaledCircle
          colorScale={chart.colorScale}
          cx={computedWidth / 2}
          cy={computedHeight / 2}
          groupSpacing={computedGroupSpacing}
          reference={reference}
          radii={data}
          size={minDimension / 2 - computedGroupSpacing}
          theme={(theme as unknown) as VictoryThemeDefinitionLatest}
          height={computedHeight}
          width={computedWidth}
          labels={() => ''}
        />
      )}
    </CustomContainer>
  );
}

export default withVictoryTheme(NestedProportionalAreaChart);
