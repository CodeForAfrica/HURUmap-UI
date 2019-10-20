import React from 'react';
import PropTypes from 'prop-types';

import { VictoryAxis, VictoryLine, VictoryVoronoiContainer } from 'victory';

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
function LineChart({ data, parts, theme, style, ...props }) {
  const { line: chart } = theme;
  if (!data || !chart) {
    return null;
  }

  const groupData = data.length > 1 && Array.isArray(data[0]) ? data : [data];

  const axisProps = (parts && toChartAxisProps(parts.axis)) || {};
  const chartProps = parts && parts.parent;
  const containerProps = parts && parts.container;
  const tooltipProps = (parts && parts.tooltip) || { style: {} };
  const { colorScale } = chart;
  const { data: dataStyle, ...otherStyles } = style || {};

  return (
    <Chart
      containerComponent={
        <VictoryVoronoiContainer
          labelComponent={<Tooltip {...tooltipProps} />}
          mouseFollowTooltips
          {...containerProps}
        />
      }
      theme={theme}
      {...chartProps}
    >
      <VictoryAxis {...axisProps.independent} />
      <VictoryAxis dependentAxis orientation="right" {...axisProps.dependent} />

      {groupData.map((gd, i) => (
        <VictoryLine
          color={colorScale[i % colorScale.length]}
          data={gd}
          key={JSON.stringify(gd)}
          style={{
            data: {
              ...{ stroke: colorScale[i % colorScale.length] },
              ...dataStyle
            },
            ...otherStyles
          }}
          {...props}
        />
      ))}
      {/* </VictoryGroup> */}
    </Chart>
  );
}

LineChart.propTypes = {
  data: propTypes.groupedData,
  parts: PropTypes.shape({
    axis: PropTypes.shape({}),
    container: PropTypes.shape({}),
    parent: PropTypes.shape({}),
    tooltip: PropTypes.shape({})
  }),
  style: PropTypes.shape({
    data: PropTypes.shape({})
  }),
  theme: PropTypes.shape({
    line: PropTypes.shape({})
  })
};

LineChart.defaultProps = {
  data: undefined,
  parts: undefined,
  style: undefined,
  theme: undefined
};

export default withVictoryTheme(LineChart);
