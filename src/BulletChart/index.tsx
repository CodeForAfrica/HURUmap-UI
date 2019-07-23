import React from 'react';

import {
  VictoryThemeDefinitionLatest,
  VictoryCommonProps,
  VictoryDatableProps,
  VictoryMultiLabeableProps
} from 'victory';

import { toReferenceProps, ReferableChartProps } from '../ReferableChart';
import withVictoryTheme from '../styles/withVictoryTheme';
import BulletBar, { BulletData } from './BulletBar';
import CustomContainer from '../CustomContainer';

export interface OffsetType {
  x: number;
  y: number;
}
export type OffsetPropType = number | OffsetType | undefined;

function toOffset(
  prop: OffsetPropType,
  { offset }: { offset: number | OffsetType }
) {
  if (prop) {
    if (typeof prop === 'number') {
      return { x: prop, y: prop };
    }
    return prop;
  }
  if (typeof offset === 'number') {
    return { x: offset, y: offset };
  }

  return offset;
}

interface Props<T>
  extends VictoryCommonProps,
    VictoryDatableProps,
    VictoryMultiLabeableProps,
    ReferableChartProps<T> {
  labels?: (data: T) => string;
  barWidth?: number;
  // Quantitative scale
  total: number;
  offset?: OffsetPropType;
}

/**
 * By default, Bullet chart assumes data is a percentage **if** only one value
 * provided and its less than 100. Otherwise, it will assume data provided is
 * half i.e. convert `[data]`  to `[data, data]`
 */
function BulletChart({
  barWidth,
  data,
  height,
  labels,
  offset,
  reference: ref,
  theme: t,
  total,
  width
}: Props<BulletData>) {
  const theme = (t as unknown) as VictoryThemeDefinitionLatest;
  const {
    bullet: chart,
    breakpoints: { mobile: mobileBreakpoint }
  } = theme;
  if (!data || !chart) {
    return null;
  }

  const computedBarWidth = barWidth || chart.barWidth;
  const computedData = Array.isArray(data[0]) ? data.slice(0, 2) : [data];
  const computedHeight = height || chart.height;
  const computedOffset = toOffset(offset, chart);
  const computedStyle = Object.assign({}, chart.style);
  const computedWidth = width || chart.width;
  const isMobile = computedWidth < mobileBreakpoint;
  const isDirectionColumn = isMobile || computedData.length < 2;
  const reference = Object.assign(
    {},
    { style: chart.reference },
    toReferenceProps(ref)
  );

  return (
    <CustomContainer width={width} height={height}>
      {/* We're plotting from bottom up so start with last item */}
      {computedData.reverse().map((d, i) => (
        <g>
          <BulletBar
            barWidth={computedBarWidth}
            data={d}
            height={computedHeight}
            labels={labels || (() => '')}
            reference={reference}
            style={Object.assign({}, computedStyle, {
              data: { fill: chart.colorScale[i % chart.colorScale.length] }
            })}
            total={total}
            width={
              isDirectionColumn
                ? computedWidth
                : (computedWidth - computedOffset.x) / 2
            }
            x={
              isDirectionColumn ? 0 : (i * computedWidth + computedOffset.x) / 2
            }
            y={
              isDirectionColumn
                ? computedHeight - i * computedOffset.y
                : computedHeight
            }
          />
        </g>
      ))}
    </CustomContainer>
  );
}

export default withVictoryTheme(BulletChart);
