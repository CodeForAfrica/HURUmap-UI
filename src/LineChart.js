import React from 'react';
import PropTypes from 'prop-types';

import {
  Helpers,
  VictoryAxis,
  VictoryGroup,
  VictoryLegend,
  VictoryLine,
  VictoryScatter,
  VictoryVoronoiContainer
} from 'victory';

import { getLegendProps } from './utils';
import withVictoryTheme from './styles/withVictoryTheme';
import Chart, { toChartAxisProps } from './Chart';
import LegendLabel from './LegendLabel';
import Tooltip from './Tooltip';

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
function LineChart({
  data,
  height: suggestedHeight,
  padding: suggestedPadding,
  parts,
  theme,
  width: suggestedWidth,
  ...props
}) {
  const { line: chart, group: groupChart } = theme;
  if (!data || !groupChart) {
    return null;
  }
  const height = suggestedHeight || chart.height;
  const width = suggestedWidth || chart.width;
  const { colorScale } = groupChart;

  const groupData = data.length > 1 && Array.isArray(data[0]) ? data : [data];

  const axisProps = (parts && toChartAxisProps(parts.axis)) || {};
  const containerProps = parts && parts.container;
  const groupProps = parts && parts.group ? [].concat(parts.group) : [];
  const scatterProps = parts && parts.scatter ? [].concat(parts.scatter) : [];
  const tooltipProps = (parts && parts.tooltip) || { style: {} };
  const originalPadding = Helpers.getPadding({
    padding: suggestedPadding || chart.padding
  });

  const initialLegendProps = {
    ...chart.legend,
    colorScale,
    ...(parts && parts.legend)
  };
  const { padding, legend } = getLegendProps(
    { height, width },
    initialLegendProps,
    groupData[0],
    originalPadding
  );

  const chartProps = {
    height,
    padding,
    width,
    ...(parts && parts.parent)
  };

  return (
    <Chart
      containerComponent={
        <VictoryVoronoiContainer mouseFollowTooltips {...containerProps} />
      }
      theme={theme}
      {...chartProps}
    >
      {/* We only need this outer group for colorScale of charts */}
      <VictoryGroup>
        {groupData.map((gd, i) => (
          <VictoryGroup
            labelComponent={
              <Tooltip
                {...tooltipProps}
                style={{ ...tooltipProps.style, fill: colorScale[i] }}
              />
            }
            /* groupProps can override the above props */
            {...groupProps[i % groupProps.length]}
            data={gd}
          >
            <VictoryLine {...props} />
            <VictoryScatter {...scatterProps[i % scatterProps.length]} />
          </VictoryGroup>
        ))}
      </VictoryGroup>

      <VictoryAxis {...axisProps.independent} />
      <VictoryAxis dependentAxis {...axisProps.dependent} />
      {legend && (
        <VictoryLegend
          standalone={false}
          labelComponent={
            <LegendLabel colorScale={colorScale} width={legend.labelWidth} />
          }
          {...legend}
        />
      )}
    </Chart>
  );
}

LineChart.propTypes = {
  data: PropTypes.arrayOf(
    PropTypes.shape({
      x: PropTypes.oneOfType([PropTypes.number, PropTypes.string])
    })
  ),
  height: PropTypes.number,
  padding: PropTypes.oneOfType([PropTypes.number, PropTypes.shape({})]),
  parts: PropTypes.shape({
    axis: PropTypes.shape({}),
    container: PropTypes.shape({}),
    group: PropTypes.shape({}),
    legend: PropTypes.shape({}),
    parent: PropTypes.shape({}),
    scatter: PropTypes.shape({}),
    tooltip: PropTypes.shape({})
  }),
  theme: PropTypes.shape({
    line: PropTypes.shape({}),
    group: PropTypes.shape({})
  }),
  width: PropTypes.number
};

LineChart.defaultProps = {
  data: undefined,
  height: undefined,
  padding: undefined,
  parts: undefined,
  theme: undefined,
  width: undefined
};

export default withVictoryTheme(LineChart);
