import React, { Fragment } from 'react';
import { VictoryPieProps, VictoryThemeDefinitionLatest } from 'victory';

import {
  scaleDesktopDimensions,
  scaleMobileDimensions,
  ScaledAreaData
} from './ScaledArea';
import { toReferenceProps, ReferableChartProps } from '../ReferableChart';
import withVictoryTheme from '../styles/withVictoryTheme';
import CustomContainer from '../CustomContainer';
import ScaledCircle from './ScaledCircle';
import ScaledSquare from './ScaledSquare';

interface Props<T> extends VictoryPieProps, ReferableChartProps<T> {
  data: T[];
  groupSpacing?: number;
  square?: boolean;
}

/**
 * Data value represents **area**. We need to find length/radius in order to
 * draw the shapes. For both squares & circles, √ of the area should give us
 * the length/radius to use (for circle, the √ of π is a constant that drops
 * off when scaling)
 */
function NestedProportionalAreaChart({
  data,
  groupSpacing: gS,
  height: h,
  reference: ref,
  square = false,
  style,
  theme: t,
  width: w
}: Props<ScaledAreaData>) {
  const theme = (t as unknown) as VictoryThemeDefinitionLatest;
  const { proportionalArea: chart } = theme;
  if (!data || !chart) {
    return null;
  }

  const reference = Object.assign(
    {},
    { style: chart.reference },
    toReferenceProps(ref)
  );
  const height = h || chart.height;
  const width = w || chart.width;
  const isHandset = width < theme.breakpoints.sm;
  const scale =
    isHandset || square
      ? scaleMobileDimensions(height, width)
      : scaleDesktopDimensions(height, width);
  const groupSpacing = data.length > 1 ? gS || chart.groupSpacing : 0;

  // For starters, lets assume each data label has 36px height,
  // reference label has 48 px, and there is 10px between labels
  // and charts
  // ------------------------------------

  return (
    <Fragment>
      {/* Main container component */}
      <CustomContainer height={height} width={width}>
        <defs>
          <pattern
            id="gradient-background"
            patternUnits="userSpaceOnUse"
            width="5.5"
            height="5.5"
            patternTransform="rotate(135)"
          >
            <line
              x1="0"
              y="0"
              x2="0"
              y2="5.5"
              stroke="#C4C4C4"
              strokeWidth="1"
            />
          </pattern>
        </defs>

        <g transform={`scale(${scale})`}>
          {square ? (
            <ScaledSquare
              colorScale={chart.colorScale}
              reference={reference}
              data={data}
            />
          ) : (
            <ScaledCircle
              colorScale={chart.colorScale}
              data={data}
              groupSpacing={groupSpacing}
              labels={() => ''} // Don't show PieChart labels
              labelComponent={undefined} // Don't show PieChart labels
              mobile={isHandset}
              reference={reference}
              style={style}
              theme={theme}
            />
          )}
        </g>
      </CustomContainer>
    </Fragment>
  );
}

export default withVictoryTheme(NestedProportionalAreaChart);
