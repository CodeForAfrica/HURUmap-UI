import React from 'react';

import {
  VictoryThemeDefinitionLatest,
  VictoryCommonProps,
  VictoryDatableProps,
  VictoryMultiLabeableProps
} from 'victory';

import { toReferenceProps, ReferableChartProps } from '../ReferableChart';
import withVictoryTheme from '../styles/withVictoryTheme';
import BulletBar from './BulletBar';
import CustomContainer from '../CustomContainer';

export interface OffsetType {
  x: number;
  y: number;
}
export type OffsetPropType = number | OffsetType | undefined;

function toOffset(prop: OffsetPropType) {
  if (prop) {
    if (typeof prop === 'number') {
      return { x: prop, y: prop };
    }
    return prop;
  }

  return { x: 20, y: 50 };
}

interface Props
  extends VictoryCommonProps,
    VictoryDatableProps,
    VictoryMultiLabeableProps,
    ReferableChartProps<number> {
  offset?: OffsetPropType;
}

/**
 * By default, Bullet chart assumes data is a percentage **if** only one value
 * provided and its less than 100. Otherwise, it will assume data provided is
 * half i.e. convert `[data]`  to `[data, data]`
 */
function BulletChart({
  data,
  height,
  offset,
  reference: ref,
  theme: t,
  width
}: Props) {
  const theme = (t as unknown) as VictoryThemeDefinitionLatest;
  const {
    bullet: chart,
    breakpoints: { mobile: mobileBreakpoint }
  } = theme;
  if (!data || !chart) {
    return null;
  }

  const computedData = Array.isArray(data[0]) ? data : [data];
  const computedHeight = height || chart.height;
  const computedWidth = width || chart.width;
  const reference = Object.assign(
    {},
    { style: chart.reference },
    toReferenceProps(ref)
  );
  const isMobile = computedWidth < mobileBreakpoint;
  const computedOffset = toOffset(offset);
  const computedStyle = Object.assign({}, chart.style);

  return (
    <CustomContainer width={width} height={height}>
      {computedData.map((d, i) => (
        <g>
          <BulletBar
            data={d}
            height={computedHeight}
            reference={reference}
            style={Object.assign({}, computedStyle, {
              data: { fill: chart.colorScale[i % chart.colorScale.length] }
            })}
            width={
              isMobile || computedData.length < 2
                ? computedWidth
                : (computedWidth - computedOffset.x) / 2
            }
            x={
              isMobile || computedData.length < 2 ? 0 : (i * computedWidth) / 2
            }
            y={
              isMobile || computedData.length < 2
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
