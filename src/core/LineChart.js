import React from 'react';
import PropTypes from 'prop-types';

import {
  VictoryAxis,
  VictoryLine,
  VictoryGroup,
  VictoryScatter,
  VictoryVoronoiContainer
} from 'victory';

import withVictoryTheme from './styles/withVictoryTheme';
import Chart, { toChartAxisProps } from './Chart';
import Tooltip from './Tooltip';
import propTypes from './propTypes';

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
function LineChart({ data, parts, theme, ...props }) {
  const { group: groupChart } = theme;
  if (!data || !groupChart) {
    return null;
  }

  const groupData = data.length > 1 && Array.isArray(data[0]) ? data : [data];

  const axisProps = (parts && toChartAxisProps(parts.axis)) || {};
  const chartProps = parts && parts.parent;
  const containerProps = parts && parts.container;
  const groupProps = parts && parts.group ? [].concat(parts.group) : [];
  const scatterProps = parts && parts.scatter ? [].concat(parts.scatter) : [];
  const tooltipProps = (parts && parts.tooltip) || { style: {} };
  const { colorScale } = groupChart;

  return (
    <Chart
      containerComponent={
        <VictoryVoronoiContainer mouseFollowTooltips {...containerProps} />
      }
      theme={theme}
      {...chartProps}
    >
      <VictoryAxis {...axisProps.independent} />
      <VictoryAxis dependentAxis orientation="right" {...axisProps.dependent} />

      {/* We only need this outer group for colorScale of charts */}
      <VictoryGroup>
        {groupData.map((gd, i) => (
          <VictoryGroup
            key={JSON.stringify(gd)}
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
    </Chart>
  );
}

LineChart.propTypes = {
  data: propTypes.groupedData,
  parts: PropTypes.shape({
    axis: PropTypes.shape({}),
    container: PropTypes.shape({}),
    group: PropTypes.shape({}),
    parent: PropTypes.shape({}),
    scatter: PropTypes.oneOfType([
      PropTypes.shape({}),
      PropTypes.arrayOf(PropTypes.shape({}))
    ]),
    tooltip: PropTypes.shape({})
  }),
  theme: PropTypes.shape({
    group: PropTypes.shape({})
  })
};

LineChart.defaultProps = {
  data: undefined,
  parts: undefined,
  theme: undefined
};

export default withVictoryTheme(LineChart);
