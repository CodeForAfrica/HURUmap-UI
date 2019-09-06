import React from 'react';
import PropTypes from 'prop-types';

import { Helpers, VictoryPie, VictoryTooltip, VictoryLegend } from 'victory';

import withVictoryTheme from '../styles/withVictoryTheme';

import CustomContainer from '../CustomContainer';
import DonutLabel from './DonutLabel';
import LegendLabel from './LegendLabel';
import PieLabel from './PieLabel';

const computeRadii = (width, height, padding, groupSpacing = 0) => {
  const radius = Helpers.getRadius({ width, height, padding });
  return [radius - groupSpacing / 2];
};

function PieChart({
  colorScale,
  data,
  donut,
  donutLabelKey,
  groupSpacing,
  innerRadius: suggestedInnerRadius,
  legend,
  legendWidth: suggestedLegendWidth,
  origin: suggestedOrigin,
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
  // Show legend if a legend prop is provided or data contains objects with
  // `name` attribute.
  // https://formidable.com/open-source/victory/docs/victory-legend/#data
  const legendData =
    legend ||
    (data1 && data1[0].name && data1) ||
    (data2 && data2[0].name && data2);

  const legendProps =
    legendData &&
    Object.assign(
      {
        colorScale: colorScale1,
        data: legendData,
        orientation: 'vertical'
      },
      parts && parts.legend
    );

  const legendWidth = suggestedLegendWidth || chart.legendWidth;
  const chartWidth = legendProps ? width - legendWidth : width;
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
  const origin = suggestedOrigin || {
    x: chartWidth / 2,
    y: paddingTop + chartRadius
  };
  const donutLabelData = data2 ? data[donutLabelKey.dataIndex] : data1;
  const { style: suggestedHeightStyle } = props;
  const donutLabelStyle = Object.assign(
    { textAnchor: 'middle' },
    suggestedHeightStyle && suggestedHeightStyle.labels
  );

  const tooltipProps = Object.assign(
    { style: { textAnchor: donut ? 'middle' : 'start' } },
    parts && parts.tooltip
  );
  const tooltipStyle = Object.assign(
    {},
    donutLabelStyle,
    tooltipProps.style.labels
  );
  // We define tooltip for donut label component here than using a separate
  // due to svg rendering components in the provided order and we don't have
  // z-index property to reorder them.
  const labelComponent1 = donut ? (
    <VictoryTooltip
      {...tooltipProps}
      colorScale={colorScale1}
      cornerRadius={chartInnerRadius}
      flyoutStyle={{ fill: 'white', stroke: 'none' }}
      height={chartInnerRadius * 2}
      labelComponent={
        <PieLabel colorScale={colorScale1} style={tooltipStyle} />
      }
      orientation="top"
      pointerLength={0}
      width={chartInnerRadius * 2}
      x={origin.x}
      y={origin.y + chartInnerRadius}
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
  const labelRadius = donut ? chartInnerRadius : undefined;

  return (
    <CustomContainer {...containerProps}>
      {donut && (
        <DonutLabel
          data={donutLabelData}
          colorScale={colorScale1}
          sortKey={donutLabelKey.sortKey}
          style={donutLabelStyle}
          text={data1[0].label}
          x={origin.x}
          y={origin.y}
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
        origin={origin}
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
          origin={origin}
          radius={computedRadii[1 % computedRadii.length]}
          startAngle={startAngle2}
          theme={theme}
          height={height}
          width={width}
          labelComponent={labelComponent2}
          {...props}
        />
      )}
      {legendProps && (
        <VictoryLegend
          standalone={false}
          labelComponent={
            <LegendLabel colorScale={colorScale1} width={legendWidth} />
          }
          {...legendProps}
          x={chartWidth}
          y={paddingTop}
        />
      )}
    </CustomContainer>
  );
}

PieChart.propTypes = {
  colorScale: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.arrayOf(
      PropTypes.shape({
        x: PropTypes.oneOfType([PropTypes.number, PropTypes.string])
      })
    )
  ]),
  data: PropTypes.arrayOf(
    PropTypes.shape({
      x: PropTypes.oneOfType([PropTypes.number, PropTypes.string])
    })
  ),
  donut: PropTypes.bool,
  donutLabelKey: PropTypes.shape({
    dataIndex: PropTypes.number.isRequired,
    sortKey: PropTypes.oneOf(['value', '-value'])
  }),
  groupSpacing: PropTypes.number,
  height: PropTypes.number,
  innerRadius: PropTypes.number,
  legend: PropTypes.arrayOf(PropTypes.shape({})),
  legendWidth: PropTypes.number,
  origin: PropTypes.shape({
    x: PropTypes.number,
    y: PropTypes.number
  }),
  padding: PropTypes.oneOfType([PropTypes.number, PropTypes.shape({})]),
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
  style: PropTypes.shape({
    labels: PropTypes.shape({})
  }),
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
  donutLabelKey: { dataIndex: 0, sortKey: undefined },
  groupSpacing: undefined,
  height: undefined,
  innerRadius: undefined,
  legend: undefined,
  legendWidth: undefined,
  origin: undefined,
  padding: undefined,
  parts: undefined,
  radius: undefined,
  radii: undefined,
  responsive: true,
  standalone: true,
  style: undefined,
  theme: undefined,
  width: undefined
};

export default withVictoryTheme(PieChart);
