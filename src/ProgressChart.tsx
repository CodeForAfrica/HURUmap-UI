import React from 'react';
import {
  VictoryBar,
  VictoryBarProps,
  VictoryLabel,
  VictoryAxis,
  VictoryThemeDefinitionLatest
} from 'victory';

import withVictoryTheme from './styles/withVictoryTheme';
import Chart from './core/Chart';

interface DataPoint {
  x: string;
  y: number;
}
type SingleData = [DataPoint];
type CompareData = [DataPoint, DataPoint];

interface Props extends VictoryBarProps {
  data: SingleData | CompareData;
  legend: DataPoint;
}

function BarChart({
  theme,
  data,
  legend,
  horizontal = true,
  width,
  height = 200,
  ...props
}: Props) {
  const barProps = {
    ...{
      labels: (datum: any) => datum.y,
      labelComponent: <VictoryLabel x={50} dy={-20} style={{ fontSize: 25 }} />
    },
    ...props
  };
  return (
    // The bar charts order is reversed, so the last will be at the top
    <Chart theme={theme} horizontal={horizontal} width={width} height={height}>
      {/* Legend */}
      <VictoryBar
        barWidth={5}
        style={{
          data: {
            fill: 'grey'
          },
          labels: {
            fill: 'grey'
          }
        }}
        data={[legend]}
        labels={datum => datum.y}
        labelComponent={<VictoryLabel x={50} dy={-15} />}
        {...props}
      />
      <VictoryAxis
        style={{ tickLabels: { display: 'block', fill: 'grey' } }}
        tickFormat={x => (x === legend.x ? legend.x : '')}
        tickLabelComponent={<VictoryLabel x={50} dy={20} textAnchor="start" />}
      />
      {/* Legend */}

      {data[1] && (
        <VictoryBar
          style={{
            data: {
              fill: ((theme as unknown) as VictoryThemeDefinitionLatest).group
                .colorScale[1]
            }
          }}
          data={[data[1]]}
          {...barProps}
        />
      )}

      <VictoryBar
        style={{
          data: {
            fill: ((theme as unknown) as VictoryThemeDefinitionLatest).group
              .colorScale[0]
          }
        }}
        data={[data[0]]}
        labels={datum => datum.y}
        {...barProps}
      />
    </Chart>
  );
}

export default withVictoryTheme(BarChart);
