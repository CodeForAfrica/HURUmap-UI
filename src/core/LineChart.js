import React from 'react';
import PropTypes from 'prop-types';

import {
  Helpers,
  VictoryAxis,
  VictoryLegend,
  VictoryLine,
  VictoryVoronoiContainer
} from 'victory';

import { getLegendProps } from './utils';
import withVictoryTheme from './styles/withVictoryTheme';
import Chart, { toChartAxisProps } from './Chart';
import LegendLabel from './LegendLabel';
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
function LineChart({
  data,
  height: suggestedHeight,
  padding: suggestedPadding,
  parts,
  style,
  theme,
  width: suggestedWidth,
  ...props
}) {
  const { line: chart } = theme;
  if (!data || !chart) {
    return null;
  }
  const height = suggestedHeight || chart.height;
  const width = suggestedWidth || chart.width;

  const groupData = data.length > 1 && Array.isArray(data[0]) ? data : [data];

  const axisProps = (parts && toChartAxisProps(parts.axis)) || {};
  const containerProps = parts && parts.container;
  const tooltipProps = (parts && parts.tooltip) || { style: {} };
  const { colorScale } = chart;
  const { data: dataStyle, ...otherStyles } = style || {};
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
      {legend && (
        <VictoryLegend
          standalone={false}
          labelComponent={
            <LegendLabel
              colorScale={colorScale}
              theme={theme}
              width={legend.labelWidth}
            />
          }
          {...legend}
        />
      )}
    </Chart>
  );
}

LineChart.propTypes = {
  data: propTypes.groupedData,
  height: PropTypes.number,
  padding: PropTypes.oneOfType([PropTypes.number, PropTypes.shape({})]),
  parts: PropTypes.shape({
    axis: PropTypes.shape({}),
    container: PropTypes.shape({}),
    group: PropTypes.shape({}),
    legend: PropTypes.shape({}),
    parent: PropTypes.shape({}),
    tooltip: PropTypes.shape({})
  }),
  style: PropTypes.shape({
    data: PropTypes.shape({})
  }),
  theme: PropTypes.shape({
    line: PropTypes.shape({})
  }),
  width: PropTypes.number
};

LineChart.defaultProps = {
  data: undefined,
  height: undefined,
  padding: undefined,
  parts: undefined,
  style: undefined,
  theme: undefined,
  width: undefined
};

export default withVictoryTheme(LineChart);
