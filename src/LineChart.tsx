import React from 'react';
import { Theme } from '@material-ui/core';
import { useTheme } from '@material-ui/styles';
import {
  VictoryLine,
  VictoryChartProps,
  VictoryChart,
  VictoryGroup,
  VictoryTooltip,
  VictoryScatter,
  VictoryVoronoiContainer
} from 'victory';

import ThemedComponent from './ThemedComponent';

interface Props extends VictoryChartProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  data: any[];
}

function LineChart({ data, ...props }: Props) {
  const { chart: theme } = useTheme<Theme>();
  if (!data || !theme) {
    return null;
  }

  const [mainData, extraData] =
    data.length > 1 && Array.isArray(data[0])
      ? [data[0], data.slice(1)]
      : [data, []];
  return (
    <VictoryChart containerComponent={<VictoryVoronoiContainer />} {...props}>
      <VictoryGroup
        labels={d => `${d.y}`}
        labelComponent={<VictoryTooltip />}
        data={mainData}
      >
        <VictoryLine />
        <VictoryScatter />
      </VictoryGroup>
      {extraData.map(xd => (
        <VictoryGroup
          data={xd}
          labels={d => `${d.y}`}
          labelComponent={<VictoryTooltip />}
        >
          <VictoryLine />
          <VictoryScatter />
        </VictoryGroup>
      ))}
    </VictoryChart>
  );
}

export default function({ ...props }: Props) {
  return (
    <ThemedComponent>
      <LineChart {...props} />
    </ThemedComponent>
  );
}
