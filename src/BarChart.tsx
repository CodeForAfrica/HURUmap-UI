import React from 'react';
import {
  VictoryBar,
  VictoryGroup,
  VictoryAxis,
  VictoryBarProps,
  VictoryLabel,
  VictoryAxisProps
} from 'victory';

import withVictoryTheme from './styles/withVictoryTheme';
import Chart, { ChartProps } from './core/Chart';

type Data = {
  x: string | number;
  y: number;
}[];

type GroupData = {
  label: string | number;
  data: Data;
}[];

interface Props extends VictoryBarProps, ChartProps {
  barWidth?: number;
  groupSpacing?: number;
  barSpacing?: number;
  data: GroupData | Data;
  axisProps?: VictoryAxisProps;
  dependantAxisProps?: VictoryAxisProps;
}

function BarChart({
  theme,
  data,
  barWidth = 40,
  groupSpacing = 30,
  barSpacing = 5,
  horizontal,
  width,
  height,
  responsive,
  axisProps,
  dependantAxisProps,
  ...props
}: Props) {
  // This space is the sides of the chart, outside the data
  // The axis is renderdered in this space
  const dataMargin = 95;
  let groupCount = 1;
  let plotData = [data as Data];
  const isGrouped = Boolean((data as GroupData)[0].data);
  if (isGrouped) {
    groupCount = (data as GroupData)[0].data.length;
    plotData = (data as GroupData).map(d => d.data);
  }
  const barCount = groupCount * data.length;
  const calculatedDimmension =
    (barWidth + barSpacing) * barCount +
    groupSpacing * (groupCount - 1) +
    dataMargin;

  return (
    <Chart
      theme={theme}
      responsive={responsive}
      horizontal={horizontal}
      width={horizontal ? width : calculatedDimmension}
      height={!horizontal ? height : calculatedDimmension}
      domainPadding={{ x: 25 }}
    >
      {isGrouped ? (
        <VictoryGroup offset={barWidth + barSpacing}>
          {plotData.map(d => (
            <VictoryBar data={d} barWidth={barWidth} {...props} />
          ))}
        </VictoryGroup>
      ) : (
        plotData.map(d => (
          <VictoryBar data={d} barWidth={barWidth} {...props} />
        ))
      )}
      <VictoryAxis
        tickLabelComponent={<VictoryLabel />}
        {...Object.assign(
          {
            style: {
              tickLabels: {
                display: 'block'
              }
            }
          },
          axisProps
        )}
      />
      <VictoryAxis dependentAxis {...dependantAxisProps} />
    </Chart>
  );
}

export default withVictoryTheme(BarChart);
