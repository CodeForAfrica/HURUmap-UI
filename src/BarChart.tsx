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
import HurumapChart from './core/HurumapChart';

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
  const barCount = data[0].data.length * data.length;

  return (
    <HurumapChart
      theme={theme}
      horizontal={horizontal}
      width={
        horizontal ? width : (barWidth + groupSpacing) * barCount + dataMargin
      }
      height={
        !horizontal ? height : (barWidth + groupSpacing) * barCount + dataMargin
      }
    >
      <VictoryGroup offset={barWidth + barSpacing}>
        {data.map(d => (
          <VictoryBar data={d.data} barWidth={barWidth} {...props} />
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
    </HurumapChart>
  );
}

export default withVictoryTheme(BarChart);
