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

function BulletChart({ data, height, reference: ref, theme, width }: Props) {
  const { bullet: chart } = (theme as unknown) as VictoryThemeDefinitionLatest;
  if (!data || !chart) {
    return null;
  }

  const computedHeight = height || chart.height;
  const computedWidth = width || chart.width;
  const reference = Object.assign(
    {},
    { style: chart.reference },
    toReferenceProps(ref)
  );
  return (
    <CustomContainer width={width} height={height}>
      {data.map((d, i) => (
        <g>
          <BulletBar
            data={d}
            height={computedHeight}
            target={99}
            reference={reference}
            style={{ fill: chart.colorScale[i % chart.colorScale.length] }}
            width={computedWidth}
            y={computedHeight}
          />
        </g>
      ))}
    </CustomContainer>
  );
}

export default withVictoryTheme(BulletChart);
