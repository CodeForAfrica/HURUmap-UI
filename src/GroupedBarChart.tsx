import React from 'react';
import { Theme } from '@material-ui/core';
import { useTheme } from '@material-ui/styles';
import {
  VictoryBar,
  VictoryGroup,
  VictoryAxis,
  VictoryChart,
  VictoryBarProps
} from 'victory';

import ThemedComponent from './ThemedComponent';

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
  data,
  dataUnit = '',
  barWidth = 40,
  horizontal,
  width,
  height,
  ...props
}: Props) {
  const theme = useTheme<Theme>();
  return (
    <VictoryChart
      theme={theme.chart}
      domainPadding={{ x: 20 }}
      width={width}
      height={height}
    >
      <VictoryGroup
        horizontal={horizontal}
        offset={barWidth + 5}
        colorScale="qualitative"
      >
        {data.map(d => (
          <VictoryBar
            horizontal={horizontal}
            barWidth={barWidth}
            theme={theme.chart}
            data={d.data}
            labels={datum => `${datum.y}${dataUnit}`}
            {...props}
          />
        ))}
      </VictoryGroup>
      <VictoryAxis style={{ axis: { stroke: 'none' } }} />
    </VictoryChart>
  );
}

export default ({ ...props }: Props) => {
  return (
    <ThemedComponent>
      <GroupedBarChart {...props} />
    </ThemedComponent>
  );
};
