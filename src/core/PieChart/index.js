import React from 'react';
import PropTypes from 'prop-types';

import { Helpers, VictoryPie, VictoryLegend } from 'victory';

import { getLegendProps } from '../utils';
import propTypes from '../propTypes';
import withVictoryTheme from '../styles/withVictoryTheme';
import CustomContainer from '../CustomContainer';
import DefaultLegendLabel from '../LegendLabel';
import DonutLabel from './DonutLabel';
import DonutTooltip from './DonutTooltip';
import Label from '../Label';
import SharedEvents from './SharedEvents';
import SharedEventsLegendLabel from './LegendLabel';
import Tooltip from './Tooltip';

const computeRadii = (width, height, padding, groupSpacing = 0) => {
  const radius = Helpers.getRadius({ width, height, padding });
  return [radius - groupSpacing / 2];
};

function PieChart({
  colorScale: colorScaleProp,
  data,
  donut: donutProp,
  donutLabelKey,
  groupSpacing,
  height: heightProp,
  innerRadius: innerRadiusProp,
  origin: originProp,
  padding: paddingProp,
  parts,
  radius,
  radii,
  responsive,
  standalone,
  theme,
  width: widthProp,
  ...props
}) {
  const { pie: chart } = theme;
  if (!data || !chart) {
    return null;
  }
  const height = heightProp || chart.height;
  const width = widthProp || chart.width;

  // Color scale
  const colorScale = colorScaleProp || chart.colorScale;
  let colorScale2 = colorScale;
  if (radii && colorScale && colorScale.length > 1) {
    colorScale2 = colorScale.slice(1);
  }

  // Data
  const startAngle1 = 0;
  let endAngle1 = 360; // Full circle
  const startAngle2 = 0;
  const endAngle2 = 180; // Half circle clockwise
  let data1 = data;
  let data2;
  let isComparisonMode = false;
  if (data.length > 1 && Array.isArray(data[0])) {
    endAngle1 = -180; // Half circle, counter-clockwise
    [data1, data2] = data;
    isComparisonMode = data2 && data2.length > 0;
  }

  // Chart dimensions & Legend
  const initialLegendProps = {
    ...chart.legend,
    colorScale,
    ...(parts && parts.legend)
  };
  const originalPadding = Helpers.getPadding({
    padding:
      paddingProp ||
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

  // Pie size & spacing
  const computedGroupSpacing = isComparisonMode
    ? groupSpacing || chart.groupSpacing
    : 0;
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
  const donut = donutProp || (typeof donutProp === 'undefined' && chart.donut);
  let chartInnerRadius = 0;
  if (donut) {
    chartInnerRadius =
      innerRadiusProp && innerRadiusProp > 0
        ? innerRadiusProp
        : Math.min.apply(null, computedRadii) * chart.donutRatio;
  }
  const paddingTop = originalPadding.top || 0;
  const origin = originProp || {
    x: chartWidth / 2,
    y: paddingTop + chartRadius
  };

  // Label & tooltip
  const donutLabelData = data2 ? data[donutLabelKey.dataIndex] : data1;
  const { style: suggestedStyle } = props;
  const donutLabelStyle = {
    textAnchor: 'middle',
    ...(suggestedStyle && suggestedStyle.labels)
  };

  const tooltipProps = {
    style: { textAnchor: donut ? 'middle' : 'start' },
    theme,
    ...(parts && parts.tooltip)
  };
  const tooltipStyle = {
    ...donutLabelStyle,
    ...tooltipProps.style
  };
  // We define tooltip for donut label component here than using a separate
  // due to svg rendering components in the provided order and we don't have
  // z-index property to reorder them.
  const labelComponent1 = donut ? (
    <DonutTooltip
      {...tooltipProps}
      colorScale={colorScale}
      cornerRadius={chartInnerRadius}
      highlightIndex={chart.donutHighlightIndex}
      highlightStyle={chart.donutHighlightStyle}
      center={{ ...origin }}
      style={tooltipStyle}
      width={chartInnerRadius * 2}
    />
  ) : (
    <Tooltip
      constrainToVisibleArea
      {...tooltipProps}
      labelComponent={<Label colorScale={colorScale} />}
      orientation={isComparisonMode ? 'left' : undefined}
      renderInPortal={false}
    />
  );
  let labelComponent2 = labelComponent1;
  if (isComparisonMode && !donut) {
    labelComponent2 = (
      <Tooltip
        constrainToVisibleArea
        {...tooltipProps}
        labelComponent={<Label colorScale={colorScale} />}
        orientation="right"
        renderInPortal={false}
      />
    );
  }
  const labelRadius = donut ? chartInnerRadius : undefined;
  const LegendLabel = isComparisonMode
    ? DefaultLegendLabel
    : SharedEventsLegendLabel;

  // Container
  const containerProps = {
    height,
    responsive,
    standalone,
    width,
    ...(parts && parts.container)
  };

  // Since we are using custom container, we need to do the translate ourselves
  const translate = {
    x: padding.left - originalPadding.left,
    y: padding.top - originalPadding.top
  };

  return (
    <CustomContainer {...containerProps}>
      <SharedEvents
        childName={['pie1', 'pie2', 'legend']}
        donut={donut}
        emphasisCoefficient={chart.emphasisCoefficient}
      >
        <g
          role="presentation"
          transform={`translate(${translate.x}, ${translate.y})`}
        >
          {donut && (
            <DonutLabel
              data={donutLabelData}
              colorScale={colorScale}
              highlightIndex={chart.donutHighlightIndex}
              highlightStyle={chart.donutHighlightStyle}
              sortKey={donutLabelKey.sortKey}
              style={donutLabelStyle}
              text={
                donutLabelData[donutLabelKey.columnIndex || 0].donutLabel ||
                donutLabelData[donutLabelKey.columnIndex || 0].label
              }
              width={chartInnerRadius * 2}
              x={origin.x}
              y={origin.y}
            />
          )}
          <VictoryPie
            colorScale={colorScale}
            data={data1}
            endAngle={endAngle1}
            height={chartHeight}
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
          {isComparisonMode && (
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
              <LegendLabel
                colorScale={colorScale}
                theme={theme}
                width={legend.width}
              />
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
    columnIndex: PropTypes.number,
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
  donutLabelKey: { dataIndex: 0, columnIndex: 0, sortKey: undefined },
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
