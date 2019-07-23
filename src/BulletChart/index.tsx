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

interface Props
  extends VictoryCommonProps,
    VictoryDatableProps,
    VictoryMultiLabeableProps,
    ReferableChartProps<number> {}

/**
 * By default, Bullet chart assumes data is a percentage **if** only one value
 * provided and its less than 100. Otherwise, it will assume data provided is
 * half i.e. convert `[data]`  to `[data, data]`
 */
function BulletChart({ data, height, reference: ref, theme, width }: Props) {
  const { bullet: chart } = (theme as unknown) as VictoryThemeDefinitionLatest;
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
              computedWidth < 600 || computedData.length < 2
                ? computedWidth
                : (computedWidth - 20) / 2
            }
            x={
              computedWidth < 600 || computedData.length < 2
                ? 0
                : (i * computedWidth) / 2
            }
            y={
              computedWidth < 600 || computedData.length < 2
                ? computedHeight - i * 50
                : computedHeight
            }
          />
        </g>
      ))}
    </CustomContainer>
  );
}

export default withVictoryTheme(BulletChart);
