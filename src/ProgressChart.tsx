import React from 'react';
import {
  VictoryBar,
  VictoryBarProps,
  VictoryAxisProps,
  VictoryLabel,
  VictoryAxis
} from 'victory';

import withVictoryTheme from './styles/withVictoryTheme';
import Chart from './core/Chart';

interface Props extends VictoryBarProps {
  data: { x: string | number; y: number }[];
  legend: { x: string | number; y: number }[];
  axisProps?: VictoryAxisProps;
  dependantAxisProps?: VictoryAxisProps;
}

function BarChart({
  theme,
  data,
  legend,
  horizontal = true,
  width,
  height = 200,
  axisProps,
  dependantAxisProps,
  ...props
}: Props) {
  const tickLabelComponent = (
    <VictoryLabel x={50} dy={-25} textAnchor="start" style={{ fontSize: 25 }} />
  );
  return (
    <div style={{ position: 'relative' }}>
      <Chart
        theme={theme}
        horizontal={horizontal}
        width={width}
        height={height}
      >
        <VictoryBar data={data} {...props} />
        <VictoryAxis
          style={{ tickLabels: { display: 'block' } }}
          tickLabelComponent={tickLabelComponent}
          {...axisProps}
        />
      </Chart>
      <div style={{ position: 'absolute', top: 40 }}>
        <Chart horizontal>
          <VictoryBar
            data={legend}
            {...props}
            labels={datum => datum.y}
            labelComponent={<VictoryLabel x={50} dy={-15} />}
          />
          <VictoryAxis
            style={{ tickLabels: { display: 'block' } }}
            tickLabelComponent={<VictoryLabel dx={60} dy={15} />}
          />
        </Chart>
      </div>
    </div>
  );
}

export default withVictoryTheme(BarChart);
