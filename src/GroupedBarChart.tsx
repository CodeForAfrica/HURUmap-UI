import React from 'react';
import {
  VictoryBar,
  VictoryGroup,
  VictoryAxis,
  VictoryBarProps,
  VictoryLabel
} from 'victory';

import withVictoryTheme from './styles/withVictoryTheme';
import Chart from './core/Chart';

interface Props extends VictoryBarProps {
  barWidth?: number;
  groupSpacing?: number;
  barSpacing?: number;
  dataUnit?: string;
  data: {
    x: string | number;
    data: {
      x: string | number;
      y: number;
    }[];
  }[];
}

function GroupedBarChart({
  theme,
  data,
  dataUnit = '',
  barWidth = 40,
  groupSpacing = 30,
  barSpacing = 5,
  horizontal,
  width,
  height,
  ...props
}: Props) {
  const barCount = data[0].data.length * data.length;
  return (
    <Chart
      horizontal={horizontal}
      theme={theme}
      width={horizontal ? width : (barWidth + groupSpacing) * barCount}
      height={!horizontal ? height : (barWidth + groupSpacing) * barCount}
    >
      <VictoryGroup offset={barWidth + barSpacing}>
        {data.map(d => (
          <VictoryBar
            barWidth={barWidth}
            data={d.data}
            labels={datum => `${datum.y}${dataUnit}`}
            {...props}
          />
        ))}
      </VictoryGroup>
      <VictoryAxis
        standalone={false}
        style={{
          axis: { display: 'none' },
          ticks: { display: 'none' },
          grid: { display: 'none' },
          tickLabels: {
            display: 'block'
          }
        }}
        tickLabelComponent={<VictoryLabel />}
      />
    </Chart>
  );
}

export default withVictoryTheme(GroupedBarChart);
