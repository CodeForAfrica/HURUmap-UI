import React from 'react';

import {
  VictoryAxis,
  VictoryLine,
  VictoryChart,
  VictoryChartProps,
  VictoryGroup,
  VictoryGroupProps,
  VictoryScatter,
  VictoryScatterProps,
  VictoryVoronoiContainer,
  VictoryVoronoiContainerProps,
  VictoryLineProps,
  VictoryTooltip,
  VictoryAxisProps
} from 'victory';

import withVictoryTheme from './styles/withVictoryTheme';

interface LineChartPartsProps {
  axis?: VictoryAxisProps;
  parent?: VictoryChartProps;
  container?: VictoryVoronoiContainerProps;
  group?: VictoryGroupProps;
  scatter?: VictoryScatterProps;
}

interface Props extends VictoryLineProps {
  parts?: LineChartPartsProps;
}

/**
 * HURUmap UI Line chart is made up of VictoryChart, VictoryVoronoiContainer,
 * VictoryGroup, VictoryLine, VictoryScatter and VictoryAxis.
 *
 * The props for all these parts/components can be set (if required) using
 * `parts` prop.
 *
 * @example
 * {
 *   parts: {
 *     axis: {
 *       axisLabel: {display: 'block'}
 *     }
 *   }
 * }
 */
function LineChart({ data, parts, theme, ...props }: Props) {
  if (!data) {
    return null;
  }

  const groupData = data.length > 1 && Array.isArray(data[0]) ? data : [data];

  const axisProps = parts && parts.axis;
  const chartProps = parts && parts.parent;
  const containerProps = parts && parts.container;
  const groupProps = parts && parts.group;
  const scatterProps = parts && parts.scatter;
  return (
    <VictoryChart
      containerComponent={<VictoryVoronoiContainer {...containerProps} />}
      theme={theme}
      {...chartProps}
    >
      {/* We only need this outer group for colorScale of charts */}
      <VictoryGroup>
        {groupData.map(gd => (
          <VictoryGroup
            labels={d => `${d.y}`}
            labelComponent={<VictoryTooltip />}
            /* groupProps can override the above props */
            {...groupProps}
            data={gd}
          >
            <VictoryLine {...(props as VictoryLineProps)} />
            <VictoryScatter {...scatterProps} />
          </VictoryGroup>
        ))}
      </VictoryGroup>

      <VictoryAxis {...axisProps} />
      <VictoryAxis dependentAxis {...axisProps} />
    </VictoryChart>
  );
}

export default withVictoryTheme(LineChart);
