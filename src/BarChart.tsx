import React from 'react';
import {
  VictoryBar,
  VictoryGroup,
  VictoryAxis,
  VictoryBarProps,
  VictoryLabel,
  VictoryAxisProps
} from 'victory';

import nestedObjectAssign from 'nested-object-assign';
import withVictoryTheme from './styles/withVictoryTheme';
import Chart from './core/Chart';

interface Props extends VictoryBarProps {
  barWidth?: number;
  groupSpacing?: number;
  barSpacing?: number;
  dataUnit?: string;
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
  dataUnit = '',
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
  const barCount = data[0].data.length * data.length;

  return (
    <Chart
      theme={theme}
      horizontal={horizontal}
      width={horizontal ? width : (barWidth + groupSpacing) * barCount}
      height={!horizontal ? height : (barWidth + groupSpacing) * barCount}
    >
      <VictoryGroup offset={barWidth + barSpacing}>
        {data.map(d => (
          <VictoryBar
            data={d.data}
            barWidth={barWidth}
            labels={datum => `${datum.y}${dataUnit}`}
            {...props}
          />
        ))}
      </VictoryGroup>
      <VictoryAxis
        tickLabelComponent={<VictoryLabel />}
        {...nestedObjectAssign(
          {},
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
