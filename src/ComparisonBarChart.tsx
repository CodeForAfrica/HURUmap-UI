import React from 'react';
import {
  VictoryBar,
  VictoryBarProps,
  VictoryLabel,
  VictoryAxis,
  VictoryThemeDefinitionLatest
} from 'victory';

import withVictoryTheme from './styles/withVictoryTheme';
import Chart, { toReferenceProps, ReferableChartProps } from './ReferableChart';

interface DataPoint {
  x: string;
  y: number;
}
type SingleData = [DataPoint];
type CompareData = [DataPoint, DataPoint];

interface Props extends ReferableChartProps<DataPoint>, VictoryBarProps {
  data: SingleData | CompareData;
}

function ComparisonBarChart({
  theme,
  data,
  reference: ref,
  horizontal = true,
  width,
  height = 200,
  ...props
}: Props) {
  const {
    data: [referenceData],
    style: referenceStyle
  } = toReferenceProps(ref);
  const groupColorScale = ((theme as unknown) as VictoryThemeDefinitionLatest)
    .group.colorScale;
  const barProps = {
    ...{
      labels: (datum: any) => datum.y,
      labelComponent: <VictoryLabel x={50} dy={-20} />
    },
    ...props
  };
  return (
    // The bar charts order is reversed, so the last will be at the top
    <Chart theme={theme} horizontal={horizontal} width={width} height={height}>
      {/* Legend */}
      <VictoryBar
        barWidth={5}
        style={referenceStyle}
        data={[referenceData]}
        labels={datum => datum.y}
        labelComponent={<VictoryLabel x={50} dy={-15} />}
        {...props}
      />
      <VictoryAxis
        style={{
          tickLabels: Object.assign(
            {},
            { display: 'block' },
            referenceStyle && referenceStyle.labels
          )
        }}
        tickFormat={x => (x === referenceData.x ? referenceData.x : '')}
        tickLabelComponent={<VictoryLabel x={50} dy={20} textAnchor="start" />}
      />
      {/* Legend */}

      {data[1] && (
        <VictoryBar
          style={{
            data: {
              fill: groupColorScale[1]
            },
            labels: {
              fontSize: 25,
              fill: groupColorScale[1]
            }
          }}
          data={[data[1]]}
          {...barProps}
        />
      )}

      <VictoryBar
        style={{
          data: {
            fill: groupColorScale[0]
          },
          labels: {
            fontSize: 25,
            fill: groupColorScale[0]
          }
        }}
        data={[data[0]]}
        labels={datum => datum.y}
        {...barProps}
      />
    </Chart>
  );
}

export default withVictoryTheme(ComparisonBarChart);
