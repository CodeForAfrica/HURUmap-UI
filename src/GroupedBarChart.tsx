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
  return (
    <VictoryChart
      horizontal={horizontal}
      domainPadding={20}
      theme={theme}
      width={width}
      height={height}
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
