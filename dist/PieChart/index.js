function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

import React from 'react';
import PropTypes from 'prop-types';
import { Helpers, VictoryPie, VictoryTooltip, VictoryLegend } from 'victory';
import withVictoryTheme from '../styles/withVictoryTheme';
import CustomContainer from '../CustomContainer';
import DonutLabel from './DonutLabel';
import LegendLabel from './LegendLabel';
import PieLabel from './PieLabel';

var computeRadii = function computeRadii(width, height, padding) {
  var groupSpacing = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 0;
  var radius = Helpers.getRadius({
    width: width,
    height: height,
    padding: padding
  });
  return [radius - groupSpacing / 2];
};

function PieChart(_ref) {
  var colorScale = _ref.colorScale,
      data = _ref.data,
      donut = _ref.donut,
      donutLabelKey = _ref.donutLabelKey,
      groupSpacing = _ref.groupSpacing,
      suggestedInnerRadius = _ref.innerRadius,
      legend = _ref.legend,
      suggestedLegendWidth = _ref.legendWidth,
      suggestedOrigin = _ref.origin,
      suggestedPadding = _ref.padding,
      parts = _ref.parts,
      radius = _ref.radius,
      radii = _ref.radii,
      responsive = _ref.responsive,
      standalone = _ref.standalone,
      theme = _ref.theme,
      suggestedHeight = _ref.height,
      suggestedWidth = _ref.width,
      props = _objectWithoutProperties(_ref, ["colorScale", "data", "donut", "donutLabelKey", "groupSpacing", "innerRadius", "legend", "legendWidth", "origin", "padding", "parts", "radius", "radii", "responsive", "standalone", "theme", "height", "width"]);

  var chart = theme.pie;

  if (!data || !chart) {
    return null;
  } // If colorScale is null, the one from theme will be used.


  var colorScale1 = colorScale || chart.colorScale;
  var colorScale2 = colorScale1;

  if (radii && colorScale && colorScale.length > 1) {
    colorScale2 = colorScale.slice(1);
  }

  var height = suggestedHeight || chart.height;
  var width = suggestedWidth || chart.width;
  var containerProps = Object.assign({
    height: height,
    responsive: responsive,
    standalone: standalone,
    width: width
  }, parts && parts.container);
  var startAngle1 = 0;
  var endAngle1 = 360; // Full circle

  var startAngle2 = 0;
  var endAngle2 = 180; // Half circle clockwise

  var data1 = data;
  var data2;

  if (data.length > 1 && Array.isArray(data[0])) {
    endAngle1 = -180; // Half circle, counter-clockwise

    var _data = _slicedToArray(data, 2);

    data1 = _data[0];
    data2 = _data[1];
  } // Show legend if a legend prop is provided or data contains objects with
  // `name` attribute.
  // https://formidable.com/open-source/victory/docs/victory-legend/#data


  var legendData = legend || data1 && data1[0].name && data1 || data2 && data2[0].name && data2;
  var legendProps = legendData && Object.assign({
    colorScale: colorScale1,
    data: legendData,
    orientation: 'vertical'
  }, parts && parts.legend);
  var legendWidth = suggestedLegendWidth || chart.legendWidth;
  var chartWidth = legendProps ? width - legendWidth : width; // Only include groupSpacing if in comparison mode

  var computedGroupSpacing = data2 ? groupSpacing || chart.groupSpacing : 0;
  var padding = Helpers.getPadding({
    padding: suggestedPadding || chart.padding
  });
  var computedRadii = radii || (radius ? [radius] : computeRadii(chartWidth, height, padding, computedGroupSpacing));
  var chartRadius = Math.max.apply(null, computedRadii);
  var chartInnerRadius = 0;

  if (donut || typeof donut === 'undefined' && chart.donut) {
    chartInnerRadius = suggestedInnerRadius && suggestedInnerRadius > 0 ? suggestedInnerRadius : Math.min.apply(null, computedRadii) * chart.donutRatio;
  }

  var paddingTop = padding.top || 0;
  var origin = suggestedOrigin || {
    x: chartWidth / 2,
    y: paddingTop + chartRadius
  };
  var donutLabelData = data2 ? data[donutLabelKey.dataIndex] : data1;
  var suggestedHeightStyle = props.style;
  var donutLabelStyle = Object.assign({
    textAnchor: 'middle'
  }, suggestedHeightStyle && suggestedHeightStyle.labels);
  var tooltipProps = Object.assign({
    style: {
      textAnchor: donut ? 'middle' : 'start'
    }
  }, parts && parts.tooltip);
  var tooltipStyle = Object.assign({}, donutLabelStyle, tooltipProps.style.labels); // We define tooltip for donut label component here than using a separate
  // due to svg rendering components in the provided order and we don't have
  // z-index property to reorder them.

  var labelComponent1 = donut ? React.createElement(VictoryTooltip, _extends({}, tooltipProps, {
    colorScale: colorScale1,
    cornerRadius: chartInnerRadius,
    flyoutStyle: {
      fill: 'white',
      stroke: 'none'
    },
    height: chartInnerRadius * 2,
    labelComponent: React.createElement(PieLabel, {
      colorScale: colorScale1,
      style: tooltipStyle
    }),
    orientation: "top",
    pointerLength: 0,
    width: chartInnerRadius * 2,
    x: origin.x,
    y: origin.y + chartInnerRadius
  })) : React.createElement(VictoryTooltip, _extends({}, tooltipProps, {
    orientation: data2 && data2.length > 0 ? 'left' : undefined,
    labelComponent: React.createElement(PieLabel, {
      colorScale: colorScale1
    })
  }));
  var labelComponent2 = labelComponent1;

  if (data2 && data2.length > 0 && !donut) {
    labelComponent2 = React.createElement(VictoryTooltip, _extends({}, tooltipProps, {
      orientation: "right",
      labelComponent: React.createElement(PieLabel, {
        colorScale: colorScale1
      })
    }));
  }

  var labelRadius = donut ? chartInnerRadius : undefined;
  return React.createElement(CustomContainer, containerProps, donut && React.createElement(DonutLabel, {
    data: donutLabelData,
    colorScale: colorScale1,
    sortKey: donutLabelKey.sortKey,
    style: donutLabelStyle,
    text: data1[0].label,
    x: origin.x,
    y: origin.y
  }), React.createElement(VictoryPie, _extends({
    standalone: false,
    groupComponent: React.createElement("g", {
      role: "presentation",
      transform: "translate(".concat(-computedGroupSpacing / 2, ", 0)")
    }),
    colorScale: colorScale1,
    data: data1,
    endAngle: endAngle1,
    innerRadius: chartInnerRadius,
    labelRadius: labelRadius,
    origin: origin,
    radius: computedRadii[0],
    startAngle: startAngle1,
    theme: theme,
    height: chartWidth,
    width: chartWidth,
    labelComponent: labelComponent1
  }, props)), data2 && data2.length > 0 && React.createElement(VictoryPie, _extends({
    standalone: false,
    colorScale: colorScale2,
    data: data2,
    endAngle: endAngle2,
    groupComponent: React.createElement("g", {
      role: "presentation",
      transform: "translate(".concat(computedGroupSpacing / 2, ", 0)")
    }),
    innerRadius: chartInnerRadius,
    labelRadius: labelRadius,
    origin: origin,
    radius: computedRadii[1 % computedRadii.length],
    startAngle: startAngle2,
    theme: theme,
    height: height,
    width: width,
    labelComponent: labelComponent2
  }, props)), legendProps && React.createElement(VictoryLegend, _extends({
    standalone: false,
    labelComponent: React.createElement(LegendLabel, {
      colorScale: colorScale1,
      width: legendWidth
    })
  }, legendProps, {
    x: chartWidth,
    y: paddingTop
  })));
}

PieChart.propTypes = {
  colorScale: PropTypes.oneOfType([PropTypes.string, PropTypes.arrayOf(PropTypes.shape({
    x: PropTypes.oneOfType([PropTypes.number, PropTypes.string])
  }))]),
  data: PropTypes.arrayOf(PropTypes.shape({
    x: PropTypes.oneOfType([PropTypes.number, PropTypes.string])
  })),
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
  donutLabelKey: {
    dataIndex: 0,
    sortKey: undefined
  },
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