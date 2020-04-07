import React from 'react';
import PropTypes from 'prop-types';

import {
  Helpers,
  VictoryAxis,
  VictoryLine,
  VictoryVoronoiContainer
} from 'victory';

import { extractLegendData, getLegendProps } from './utils';
import withVictoryTheme from './styles/withVictoryTheme';
import Chart, { toChartAxisProps } from './Chart';
import WrapLabel from './WrapLabel';
import Tooltip from './Tooltip';
import propTypes from './propTypes';
import Legend from './Legend';

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
  labelWidth: propLabelWidth,
  data,
  height: suggestedHeight,
  horizontal,
  padding: suggestedPadding,
  parts,
  style,
  theme,
  width: suggestedWidth,
  ...props
}) {
  const {
    axis: { labelWidth: themeLabelWidth },
    line: chart
  } = theme;
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
    extractLegendData(groupData),
    originalPadding
  );

  const chartProps = {
    height,
    horizontal,
    padding,
    width,
    ...(parts && parts.parent)
  };

  let labelWidth = propLabelWidth || themeLabelWidth;
  if (!labelWidth) {
    labelWidth = width / groupData[0].length;
  }

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
      <VictoryAxis
        tickLabelComponent={<WrapLabel width={labelWidth} />}
        {...axisProps.independent}
      />
      <VictoryAxis
        dependentAxis
        orientation={horizontal ? 'bottom' : 'right'}
        {...axisProps.dependent}
      />

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

      {legend && <Legend colorScale={colorScale} {...legend} />}
    </Chart>
  );
}

LineChart.propTypes = {
  labelWidth: PropTypes.number,
  data: propTypes.groupedData,
  height: PropTypes.number,
  horizontal: PropTypes.bool,
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
  theme: propTypes.theme,
  width: PropTypes.number
};

LineChart.defaultProps = {
  labelWidth: undefined,
  data: undefined,
  height: undefined,
  horizontal: undefined,
  padding: undefined,
  parts: undefined,
  style: undefined,
  theme: undefined,
  width: undefined
};

export default withVictoryTheme(LineChart);
