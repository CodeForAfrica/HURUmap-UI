import React from 'react';
import PropTypes from 'prop-types';

import { Helpers, VictoryPie, VictoryLegend } from 'victory';

import { getLegendProps } from '../utils';
import propTypes from '../propTypes';
import withVictoryTheme from '../styles/withVictoryTheme';
import CustomContainer from '../CustomContainer';
import DonutLabel from './DonutLabel';
import LegendLabel from './LegendLabel';
import Label from '../Label';
import SharedEvents from './SharedEvents';
import Tooltip from './Tooltip';

const computeRadii = (width, height, padding, groupSpacing = 0) => {
  const radius = Helpers.getRadius({ width, height, padding });
  return [radius - groupSpacing / 2];
};

function PieChart({
  colorScale: suggestedColorScale,
  data,
  donut,
  donutLabelKey,
  groupSpacing,
  height: suggestedHeight,
  innerRadius: suggestedInnerRadius,
  origin: suggestedOrigin,
  padding: suggestedPadding,
  parts,
  radius,
  radii,
  responsive,
  standalone,
  theme,
  width: suggestedWidth,
  ...props
}) {
  const { pie: chart } = theme;
  if (!data || !chart) {
    return null;
  }
  const height = suggestedHeight || chart.height;
  const width = suggestedWidth || chart.width;

  // If colorScale is null, the one from theme will be used.
  const colorScale = suggestedColorScale || chart.colorScale;
  let colorScale2 = colorScale;
  if (radii && colorScale && colorScale.length > 1) {
    colorScale2 = colorScale.slice(1);
  }
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

  const initialLegendProps = {
    ...chart.legend,
    colorScale,
    ...(parts && parts.legend)
  };
  const originalPadding = Helpers.getPadding({
    padding:
      suggestedPadding ||
      (parts && parts.parent && parts.parent.padding) ||
      chart.padding
  });
  const {
    height: chartHeight,
    padding,
    legend,
    width: chartWidth
  } = getLegendProps(
    { height, width },
    initialLegendProps,
    data1,
    originalPadding
  );
  const containerProps = {
    height,
    responsive,
    standalone,
    width,
    ...(parts && parts.container)
  };
  // Only include groupSpacing if in comparison mode
  const computedGroupSpacing = data2 ? groupSpacing || chart.groupSpacing : 0;
  const computedRadii =
    radii ||
    (radius
      ? [radius]
      : computeRadii(
          chartWidth,
          chartHeight,
          originalPadding,
          computedGroupSpacing
        ));
  const chartRadius = Math.max.apply(null, computedRadii);
  let chartInnerRadius = 0;
  if (donut || (typeof donut === 'undefined' && chart.donut)) {
    chartInnerRadius =
      suggestedInnerRadius && suggestedInnerRadius > 0
        ? suggestedInnerRadius
        : Math.min.apply(null, computedRadii) * chart.donutRatio;
  }
  const paddingTop = originalPadding.top || 0;
  const origin = suggestedOrigin || {
    x: chartWidth / 2,
    y: paddingTop + chartRadius
  };
  const donutLabelData = data2 ? data[donutLabelKey.dataIndex] : data1;
  const { style: suggestedHeightStyle } = props;
  const donutLabelStyle = {
    textAnchor: 'middle',
    ...(suggestedHeightStyle && suggestedHeightStyle.labels)
  };

  const tooltipProps = {
    style: { textAnchor: donut ? 'middle' : 'start' },
    ...(parts && parts.tooltip)
  };
  const tooltipStyle = {
    ...donutLabelStyle,
    ...tooltipProps.style.labels
  };
  // We define tooltip for donut label component here than using a separate
  // due to svg rendering components in the provided order and we don't have
  // z-index property to reorder them.
  const labelComponent1 = donut ? (
    <Tooltip
      {...tooltipProps}
      colorScale={colorScale}
      cornerRadius={chartInnerRadius}
      flyoutStyle={{ fill: 'white', stroke: 'none' }}
      height={chartInnerRadius * 2}
      labelComponent={
        <Label
          colorScale={colorScale}
          style={tooltipStyle}
          width={chartInnerRadius * 2}
          renderInPortal={false}
        />
      }
      orientation="top"
      pointerLength={0}
      renderInPortal={false}
      width={chartInnerRadius * 2}
      x={origin.x}
      y={origin.y + chartInnerRadius}
    />
  ) : (
    <Tooltip
      constrainToVisibleArea
      {...tooltipProps}
      labelComponent={<Label colorScale={colorScale} />}
      orientation={data2 && data2.length > 0 ? 'left' : undefined}
      renderInPortal={false}
    />
  );
  let labelComponent2 = labelComponent1;
  if (data2 && data2.length > 0 && !donut) {
    labelComponent2 = (
      <Tooltip
        {...tooltipProps}
        labelComponent={<Label colorScale={colorScale} />}
        orientation="right"
        renderInPortal={false}
      />
    );
  }
  const labelRadius = donut ? chartInnerRadius : undefined;
  // Since we are using custom container, we need to do the translate ourselves
  const translate = {
    x: padding.left - originalPadding.left,
    y: padding.top - originalPadding.top
  };

  return (
    <CustomContainer {...containerProps}>
      <SharedEvents
        childName={['pie1', 'pie2', 'legend']}
        emphasisCoefficient={0.3}
      >
        <g
          role="presentation"
          transform={`translate(${translate.x}, ${translate.y})`}
        >
          {donut && (
            <DonutLabel
              data={donutLabelData}
              colorScale={colorScale}
              sortKey={donutLabelKey.sortKey}
              style={donutLabelStyle}
              text={data1[0].label}
              width={chartInnerRadius * 2}
              x={origin.x}
              y={origin.y}
            />
          )}
          <VictoryPie
            colorScale={colorScale}
            data={data1}
            endAngle={endAngle1}
            height={chartWidth}
            innerRadius={chartInnerRadius}
            labelComponent={labelComponent1}
            labelRadius={labelRadius}
            name="pie1"
            origin={origin}
            radius={computedRadii[0]}
            standalone={false}
            startAngle={startAngle1}
            theme={theme}
            width={chartWidth}
            {...props}
          />
          {data2 && data2.length > 0 && (
            <VictoryPie
              colorScale={colorScale2}
              data={data2}
              endAngle={endAngle2}
              groupComponent={
                <g
                  role="presentation"
                  transform={`translate(${computedGroupSpacing / 2}, 0)`}
                />
              }
              height={chartHeight}
              innerRadius={chartInnerRadius}
              labelRadius={labelRadius}
              labelComponent={labelComponent2}
              name="pie2"
              origin={origin}
              radius={computedRadii[1 % computedRadii.length]}
              standalone={false}
              startAngle={startAngle2}
              theme={theme}
              width={chartWidth}
              {...props}
            />
          )}
        </g>
        {legend && (
          <VictoryLegend
            labelComponent={
              <LegendLabel colorScale={colorScale} width={legend.labelWidth} />
            }
            name="legend"
            standalone={false}
            {...legend}
          />
        )}
      </SharedEvents>
    </CustomContainer>
  );
}

PieChart.propTypes = {
  colorScale: propTypes.colorScale,
  data: propTypes.groupedData,
  donut: PropTypes.bool,
  donutLabelKey: PropTypes.shape({
    dataIndex: PropTypes.number.isRequired,
    sortKey: PropTypes.oneOf(['value', '-value'])
  }),
  groupSpacing: PropTypes.number,
  height: PropTypes.number,
  innerRadius: PropTypes.number,
  origin: PropTypes.shape({
    x: PropTypes.number,
    y: PropTypes.number
  }),
  padding: PropTypes.oneOfType([PropTypes.number, PropTypes.shape({})]),
  parts: PropTypes.shape({
    legend: PropTypes.shape({}),
    parent: PropTypes.shape({
      padding: PropTypes.oneOfType([PropTypes.number, PropTypes.shape({})])
    }),
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
  theme: propTypes.theme,
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
