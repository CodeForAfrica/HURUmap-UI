import React from 'react';

import {
  VictoryAxis,
  VictoryLine,
  VictoryChartProps,
  VictoryGroup,
  VictoryGroupProps,
  VictoryScatter,
  VictoryScatterProps,
  VictoryVoronoiContainer,
  VictoryVoronoiContainerProps,
  VictoryLineProps,
  VictoryThemeDefinitionLatest,
  VictoryTooltip,
  VictoryTooltipProps
} from 'victory';

import withVictoryTheme from './styles/withVictoryTheme';
import Chart, { toChartAxisProps, ChartAxisPropsType } from './Chart';

export interface LineChartPartsProps {
  axis?: ChartAxisPropsType;
  parent?: VictoryChartProps;
  container?: VictoryVoronoiContainerProps;
  group?: VictoryGroupProps | VictoryGroupProps[];
  scatter?: VictoryScatterProps | VictoryScatterProps[];
  tooltip?: VictoryTooltipProps;
}

export interface LineChartProps extends VictoryLineProps {
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
function LineChart({ data, parts, theme: t, ...props }: LineChartProps) {
  const theme = (t as unknown) as VictoryThemeDefinitionLatest;
  const { group: groupChart } = theme;
  if (!data || !groupChart) {
    return null;
  }

  const groupData = data.length > 1 && Array.isArray(data[0]) ? data : [data];

  const axisProps = (parts && toChartAxisProps(parts.axis)) || {};
  const chartProps = parts && parts.parent;
  const containerProps = parts && parts.container;
  const groupProps =
    parts && parts.group ? ([] as VictoryGroupProps[]).concat(parts.group) : [];
  const scatterProps =
    parts && parts.scatter
      ? ([] as VictoryScatterProps[]).concat(parts.scatter)
      : [];
  const tooltipProps = (parts && parts.tooltip) || { style: {} };
  const { colorScale } = groupChart;

  return (
    <Chart
      containerComponent={<VictoryVoronoiContainer {...containerProps} />}
      theme={theme}
      {...chartProps}
    >
      {/* We only need this outer group for colorScale of charts */}
      <VictoryGroup>
        {groupData.map((gd, i) => (
          <VictoryGroup
            labelComponent={
              <VictoryTooltip
                {...tooltipProps}
                style={Object.assign({}, tooltipProps.style, {
                  fill: colorScale[i]
                })}
              />
            }
            /* groupProps can override the above props */
            {...groupProps[i % groupProps.length]}
            data={gd}
          >
            <VictoryLine {...(props as VictoryLineProps)} />
            <VictoryScatter {...scatterProps[i % scatterProps.length]} />
          </VictoryGroup>
        ))}
      </VictoryGroup>

      <VictoryAxis {...axisProps.independent} />
      <VictoryAxis dependentAxis {...axisProps.dependent} />
    </Chart>
  );
}

export default withVictoryTheme(LineChart);
