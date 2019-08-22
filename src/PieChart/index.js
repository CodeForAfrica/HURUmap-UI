import React from 'react';
import PropTypes from 'prop-types';

import { Helpers, VictoryPie, VictoryTooltip, VictoryLegend } from 'victory';

import withVictoryTheme from '../styles/withVictoryTheme';
import CustomContainer from '../CustomContainer';
import PieLabel from './PieLabel';

const computeRadii = (width, height, padding, groupSpacing = 0) => {
  const radius = Helpers.getRadius({ width, height, padding });
  return [radius - groupSpacing / 2];
};
function PieChart({
  colorScale,
  data,
  donut,
  groupSpacing,
  innerRadius: suggestedInnerRadius,
  legend,
  legendWidth: suggestedLegendWidth,
  padding: suggestedPadding,
  parts,
  radius,
  radii,
  responsive,
  standalone,
  theme,
  height: suggestedHeight,
  width: suggestedWidth,
  ...props
}) {
  const { pie: chart } = theme;
  if (!data || !chart) {
    return null;
  }

  // If colorScale is null, the one from theme will be used.
  const colorScale1 = colorScale || chart.colorScale;
  let colorScale2 = colorScale1;
  if (radii && colorScale && colorScale.length > 1) {
    colorScale2 = colorScale.slice(1);
  }
  const height = suggestedHeight || chart.height;
  const width = suggestedWidth || chart.width;
  const containerProps = Object.assign(
    {
      height,
      responsive,
      standalone,
      width
    },
    parts && parts.container
  );
  const legendProps =
    legend &&
    legend.length > 0 &&
    Object.assign(
      {
        colorScale: colorScale1,
        data: legend,
        orientation: 'vertical'
      },
      parts && parts.legend
    );
  const legendWidth = suggestedLegendWidth || chart.legendWidth;
  const chartWidth = legendProps ? width - legendWidth : width;
  const tooltipProps = Object.assign(
    { style: { textAnchor: donut ? 'middle' : 'start' } },
    parts && parts.tooltip
  );

  const startAngle1 = 0;
  let endAngle1 = 360; // Full circle
  const startAngle2 = 0;
  const endAngle2 = 180; // Half circle clockwise
  let data1 = data;
  let data2;
  if (data.length > 1 && Array.isArray(data[0])) {
    endAngle1 = -180; // Half circle, counter-clockwise
    [data1, data2] = data; // Assume data[2] is also Array
  }
  // Only include groupSpacing if in comparison mode
  const computedGroupSpacing = data2 ? groupSpacing || chart.groupSpacing : 0;
  const padding = Helpers.getPadding({
    padding: suggestedPadding || chart.padding
  });
  const computedRadii =
    radii ||
    (radius
      ? [radius]
      : computeRadii(chartWidth, height, padding, computedGroupSpacing));
  const chartRadius = Math.max.apply(null, computedRadii);
  let chartInnerRadius = 0;
  if (donut || (typeof donut === 'undefined' && chart.donut)) {
    chartInnerRadius =
      suggestedInnerRadius && suggestedInnerRadius > 0
        ? suggestedInnerRadius
        : Math.min.apply(null, computedRadii) * chart.donutRatio;
  }
  const paddingTop = padding.top || 0;
  const labelComponent1 = donut ? (
    <VictoryTooltip
      {...tooltipProps}
      cornerRadius={chartInnerRadius}
      flyoutStyle={{ fill: 'none', stroke: 'none' }}
      height={chartInnerRadius * 2}
      labelComponent={<PieLabel colorScale={colorScale1} />}
      orientation="top"
      pointerLength={0}
      width={chartInnerRadius * 2}
      x={width / 2}
      y={paddingTop + chartRadius + chartInnerRadius}
    />
  ) : (
    <VictoryTooltip
      {...tooltipProps}
      orientation={data2 && data2.length > 0 ? 'left' : undefined}
      labelComponent={<PieLabel colorScale={colorScale1} />}
    />
  );
  let labelComponent2 = labelComponent1;
  if (data2 && data2.length > 0 && !donut) {
    labelComponent2 = (
      <VictoryTooltip
        {...tooltipProps}
        orientation="right"
        labelComponent={<PieLabel colorScale={colorScale1} />}
      />
    );
  }
  const labelRadius = donut ? chartInnerRadius + 10 : undefined;

  return (
    <CustomContainer {...containerProps}>
      {legend && legend.length > 0 && (
        <VictoryLegend
          standalone={false}
          {...legendProps}
          x={chartWidth}
          y={paddingTop}
        />
      )}
      <VictoryPie
        standalone={false}
        groupComponent={
          <g
            role="presentation"
            transform={`translate(${-computedGroupSpacing / 2}, 0)`}
          />
        }
        colorScale={colorScale1}
        data={data1}
        endAngle={endAngle1}
        innerRadius={chartInnerRadius}
        labelRadius={labelRadius}
        origin={{ x: width / 2, y: paddingTop + chartRadius }}
        radius={computedRadii[0]}
        startAngle={startAngle1}
        theme={theme}
        height={chartWidth}
        width={chartWidth}
        labelComponent={labelComponent1}
        {...props}
      />
      {data2 && data2.length > 0 && (
        <VictoryPie
          standalone={false}
          colorScale={colorScale2}
          data={data2}
          endAngle={endAngle2}
          groupComponent={
            <g
              role="presentation"
              transform={`translate(${computedGroupSpacing / 2}, 0)`}
            />
          }
          innerRadius={chartInnerRadius}
          labelRadius={labelRadius}
          origin={{ x: width / 2, y: paddingTop + chartRadius }}
          radius={computedRadii[1 % computedRadii.length]}
          startAngle={startAngle2}
          theme={theme}
          height={height}
          width={width}
          labelComponent={labelComponent2}
          {...props}
        />
      )}
    </CustomContainer>
  );
}

PieChart.propTypes = {
  colorScale: PropTypes.oneOf(
    PropTypes.string,
    PropTypes.arrayOf(
      PropTypes.shape({
        x: PropTypes.oneOf(PropTypes.number, PropTypes.string)
      })
    )
  ),
  data: PropTypes.arrayOf(
    PropTypes.shape({
      x: PropTypes.oneOf(PropTypes.number, PropTypes.string)
    })
  ),
  donut: PropTypes.bool,
  groupSpacing: PropTypes.number,
  height: PropTypes.number,
  innerRadius: PropTypes.number,
  legend: PropTypes.arrayOf(PropTypes.shape({})),
  legendWidth: PropTypes.number,
  padding: PropTypes.oneOf(PropTypes.number, PropTypes.shape({})),
  parts: PropTypes.shape({
    legend: PropTypes.shape({}),
    container: PropTypes.shape({}),
    tooltip: PropTypes.shape({})
  }),
  radius: PropTypes.number,
  /**
   * radii enables comparing pie charts using areas instead of "pie"s.
   * If this is enabled, a single color will be used for the pie chart.
   *
   * The color will be selected (sequentially) from the supplied colorScale
   * (if any).
   */
  radii: PropTypes.arrayOf(PropTypes.number),
  responsive: PropTypes.bool,
  standalone: PropTypes.bool,
  theme: PropTypes.shape({
    pie: PropTypes.shape({})
  }),
  width: PropTypes.number
};

PieChart.defaultProps = {
  colorScale: undefined,
  data: undefined,
  donut: undefined,
  groupSpacing: undefined,
  height: undefined,
  innerRadius: undefined,
  legend: undefined,
  legendWidth: undefined,
  padding: undefined,
  parts: undefined,
  radius: undefined,
  radii: undefined,
  responsive: true,
  standalone: true,
  theme: undefined,
  width: undefined
};

export default withVictoryTheme(PieChart);
