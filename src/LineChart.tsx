import React from 'react';
import {
  VictoryLine,
  VictoryChart,
  VictoryGroup,
  VictoryTooltip,
  VictoryScatter,
  VictoryVoronoiContainer,
  VictoryLineProps,
  VictoryAxis
} from 'victory';
import withVictoryTheme from './styles/withVictoryTheme';

interface Props extends VictoryLineProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  data: any[];
}

function LineChart({ theme, data }: Props) {
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

      <VictoryAxis
        style={{
          axisLabel: { display: 'block' },
          tickLabels: { display: 'block' },
          ticks: { display: 'block' },
          grid: { display: 'block' },
          axis: { display: 'block' }
        }}
      />
      <VictoryAxis
        dependentAxis
        style={{
          axisLabel: { display: 'block' },
          tickLabels: { display: 'block' },
          ticks: { display: 'block' },
          grid: { display: 'block' },
          axis: { display: 'block' }
        }}
      />
    </VictoryChart>
  );
}

export default withVictoryTheme(LineChart);
