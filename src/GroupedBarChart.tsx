import React from 'react';
import {
  VictoryBar,
  VictoryGroup,
  VictoryAxis,
  VictoryChart,
  VictoryBarProps
} from 'victory';

import withVictoryTheme from './withVictoryTheme';

interface Props extends VictoryBarProps {
  barWidth?: number;
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
  horizontal,
  width,
  height,
  ...props
}: Props) {
  const barCount = data[0].data.length * data.length;
  const calculatedWidth = (barWidth + 30) * barCount;
  return (
    <VictoryChart
      horizontal={horizontal}
      theme={theme}
      width={horizontal ? width : calculatedWidth}
      height={!horizontal ? height : calculatedWidth}
    >
      <VictoryGroup offset={barWidth + 5}>
        {data.map(d => (
          <VictoryBar
            barWidth={barWidth}
            theme={theme}
            data={d.data}
            labels={datum => `${datum.y}${dataUnit}`}
            {...props}
          />
        ))}
      </VictoryGroup>
      <VictoryAxis
        style={{
          axis: { display: 'none' },
          ticks: { display: 'none' },
          grid: { display: 'none' }
        }}
      />
    </VictoryChart>
  );
}

export default withVictoryTheme(GroupedBarChart);
