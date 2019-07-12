import React from 'react';
import {
  VictoryLine,
  VictoryChartProps,
  VictoryChart,
  VictoryGroup,
  VictoryTooltip,
  VictoryScatter,
  VictoryVoronoiContainer
} from 'victory';
import withVictoryTheme from './withVictoryTheme';

interface Props extends VictoryChartProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  data: any[];
}

function LineChart({ theme, data, ...props }: Props) {
  if (!data) {
    return null;
  }

  const [mainData, extraData] =
    data.length > 1 && Array.isArray(data[0])
      ? [data[0], data.slice(1)]
      : [data, []];
  return (
    <VictoryChart
      containerComponent={<VictoryVoronoiContainer />}
      theme={theme}
      {...props}
    >
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

export default withVictoryTheme(LineChart);
