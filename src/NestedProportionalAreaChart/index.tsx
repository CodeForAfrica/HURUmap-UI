import React, { Fragment } from 'react';
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

const DESKTOP_WIDTH = 650;
const DESKTOP_HEIGHT = 270;

function scaleDimension({
  height: h,
  width: w
}: {
  height: number;
  width: number;
}) {
  // Scale from DESKTOP_WIDTH to w first
  let height = (DESKTOP_HEIGHT * w) / DESKTOP_WIDTH;
  let width = w;
  if (height > h) {
    // Scale from height to h
    width = (w * h) / height;
    height = h;
  }
  return { height, width };
}

/**
 * Data value represents **area**. We need to find length/radius in order to
 * draw the shapes. For both squares & circles, √ of the area should give us
 * the length/radius to use (for circle, the √ of π is a constant that drops
 * off when scaling)
 */
function NestedProportionalAreaChart({
  groupSpacing,
  width: w,
  height: h,
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
  const height = h || chart.height;
  const width = w || chart.width;
  const { height: computedHeight, width: computedWidth } = scaleDimension({
    height,
    width
  });
  const computedGroupSpacing =
    data.length > 1 ? groupSpacing || chart.groupSpacing : 0;

  // For starters, lets assume each data label has 36px height,
  // reference label has 48 px, and there is 10px between labels
  // and charts
  // ------------------------------------

  const chartHeight = computedHeight - (data.length * 36 + 48 + 20);
  const minDimension = Math.min(chartHeight, computedWidth);
  // const desktop = typeof computedWidth !== 'undefined' && computedWidth >= 600;

  /*
  const dataLabelStyles = (index: number): React.CSSProperties => ({
    fontSize: 36,
    fontWeight: 'bold',
    fill: chart.colorScale[index % chart.colorScale.length]
  });

  const referenceLabelStyles = (index: number): React.CSSProperties =>
    Object.assign({}, reference.style.labels, {
      fontWeight: index === 0 ? 'bold' : 'normal',
      color: 'grey'
    }) as React.CSSProperties;
  */

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
        <g transform={`scale(${computedWidth / DESKTOP_WIDTH})`}>
          {square ? (
            <ScaledSquare
              colorScale={chart.colorScale}
              reference={reference}
              sides={data}
              size={minDimension}
              x={(computedWidth - minDimension) / 2}
              y={data.length * 36 + 10}
            />
          ) : (
            <ScaledCircle
              colorScale={chart.colorScale}
              cx={DESKTOP_WIDTH / 2}
              cy={DESKTOP_HEIGHT / 2}
              groupSpacing={computedGroupSpacing}
              reference={reference}
              radii={data}
              size={(DESKTOP_HEIGHT - computedGroupSpacing) / 2}
              theme={(theme as unknown) as VictoryThemeDefinitionLatest}
              height={DESKTOP_HEIGHT}
              width={DESKTOP_WIDTH}
              labels={() => ''}
            />
          )}
        </g>
      </CustomContainer>
    </Fragment>
  );
}

export default withVictoryTheme(NestedProportionalAreaChart);
