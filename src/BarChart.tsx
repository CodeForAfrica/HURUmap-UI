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
import Chart from './Chart';

interface Props extends VictoryBarProps {
  barWidth?: number;
  groupSpacing?: number;
  barSpacing?: number;
  data: {
    groupLabel: string | number;
    data: {
      x: string | number;
      y: number;
    }[];
  }[];
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
  axisProps,
  dependantAxisProps,
  ...props
}: Props) {
  // This space is the sides of the chart, outside the data
  // The axis is renderdered in this space
  const dataMargin = 80;
  const groupCount = data[0].data.length;
  const barCount = groupCount * data.length;
  const calculatedDimmension =
    (barWidth + barSpacing) * barCount +
    groupSpacing * (groupCount - 1) +
    dataMargin;

  return (
    <Chart
      theme={theme}
      horizontal={horizontal}
      width={horizontal ? width : calculatedDimmension}
      height={!horizontal ? height : calculatedDimmension}
      responsive={false}
    >
      <VictoryGroup offset={barWidth + barSpacing}>
        {data.map(d => (
          <VictoryBar data={d.data} barWidth={barWidth} {...props} />
        ))}
      </VictoryGroup>
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
