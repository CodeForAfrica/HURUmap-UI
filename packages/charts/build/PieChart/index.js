"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _victory = require("victory");

var _utils = require("../utils");

var _propTypes2 = _interopRequireDefault(require("../propTypes"));

var _withVictoryTheme = _interopRequireDefault(require("../styles/withVictoryTheme"));

var _CustomContainer = _interopRequireDefault(require("../CustomContainer"));

var _LegendLabel = _interopRequireDefault(require("../LegendLabel"));

var _DonutLabel = _interopRequireDefault(require("./DonutLabel"));

var _DonutTooltip = _interopRequireDefault(require("./DonutTooltip"));

var _Label = _interopRequireDefault(require("../Label"));

var _SharedEvents = _interopRequireDefault(require("./SharedEvents"));

var _LegendLabel2 = _interopRequireDefault(require("./LegendLabel"));

var _Tooltip = _interopRequireDefault(require("./Tooltip"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { if (!(Symbol.iterator in Object(arr) || Object.prototype.toString.call(arr) === "[object Arguments]")) { return; } var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

var computeRadii = function computeRadii(width, height, padding) {
  var groupSpacing = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 0;

  var radius = _victory.Helpers.getRadius({
    width: width,
    height: height,
    padding: padding
  });

  return [radius - groupSpacing / 2];
};

function PieChart(_ref) {
  var colorScaleProp = _ref.colorScale,
      data = _ref.data,
      donutProp = _ref.donut,
      donutLabelKey = _ref.donutLabelKey,
      groupSpacing = _ref.groupSpacing,
      heightProp = _ref.height,
      innerRadiusProp = _ref.innerRadius,
      originProp = _ref.origin,
      paddingProp = _ref.padding,
      parts = _ref.parts,
      radius = _ref.radius,
      radii = _ref.radii,
      responsive = _ref.responsive,
      standalone = _ref.standalone,
      theme = _ref.theme,
      widthProp = _ref.width,
      props = _objectWithoutProperties(_ref, ["colorScale", "data", "donut", "donutLabelKey", "groupSpacing", "height", "innerRadius", "origin", "padding", "parts", "radius", "radii", "responsive", "standalone", "theme", "width"]);

  var chart = theme.pie;

  if (!data || !chart) {
    return null;
  }

  var height = heightProp || chart.height;
  var width = widthProp || chart.width; // Color scale

  var colorScale = colorScaleProp || chart.colorScale;
  var colorScale2 = colorScale;

  if (radii && colorScale && colorScale.length > 1) {
    colorScale2 = colorScale.slice(1);
  } // Data


  var startAngle1 = 0;
  var endAngle1 = 360; // Full circle

  var startAngle2 = 0;
  var endAngle2 = 180; // Half circle clockwise

  var data1 = data;
  var data2;
  var isComparisonMode = false;

  if (data.length > 1 && Array.isArray(data[0])) {
    endAngle1 = -180; // Half circle, counter-clockwise

    var _data = _slicedToArray(data, 2);

    data1 = _data[0];
    data2 = _data[1];
    isComparisonMode = data2 && data2.length > 0;
  } // Chart dimensions & Legend


  var initialLegendProps = _objectSpread({}, chart.legend, {
    colorScale: colorScale
  }, parts && parts.legend);

  var originalPadding = _victory.Helpers.getPadding({
    padding: paddingProp || parts && parts.parent && parts.parent.padding || chart.padding
  });

  var _getLegendProps = (0, _utils.getLegendProps)({
    height: height,
    width: width
  }, initialLegendProps, data1, originalPadding),
      chartHeight = _getLegendProps.height,
      padding = _getLegendProps.padding,
      legend = _getLegendProps.legend,
      chartWidth = _getLegendProps.width; // Pie size & spacing


  var computedGroupSpacing = isComparisonMode ? groupSpacing || chart.groupSpacing : 0;
  var computedRadii = radii || (radius ? [radius] : computeRadii(chartWidth, chartHeight, originalPadding, computedGroupSpacing));
  var chartRadius = Math.max.apply(null, computedRadii);
  var donut = donutProp || typeof donutProp === 'undefined' && chart.donut;
  var chartInnerRadius = 0;

  if (donut) {
    chartInnerRadius = innerRadiusProp && innerRadiusProp > 0 ? innerRadiusProp : Math.min.apply(null, computedRadii) * chart.donutRatio;
  }

  var paddingTop = originalPadding.top || 0;
  var origin = originProp || {
    x: chartWidth / 2,
    y: paddingTop + chartRadius
  }; // Label & tooltip

  var donutLabelData = data2 && donutLabelKey.dataIndex ? data[donutLabelKey.dataIndex] : data1;
  var suggestedStyle = props.style;

  var donutLabelStyle = _objectSpread({
    textAnchor: 'middle'
  }, suggestedStyle && suggestedStyle.labels);

  var tooltipProps = _objectSpread({
    style: {
      textAnchor: donut ? 'middle' : 'start'
    },
    theme: theme
  }, parts && parts.tooltip);

  var tooltipStyle = _objectSpread({}, donutLabelStyle, {}, tooltipProps.style); // We define tooltip for donut label component here than using a separate
  // due to svg rendering components in the provided order and we don't have
  // z-index property to reorder them.


  var labelComponent1 = donut ? _react.default.createElement(_DonutTooltip.default, _extends({}, tooltipProps, {
    colorScale: colorScale,
    cornerRadius: chartInnerRadius,
    highlightIndex: chart.donutHighlightIndex,
    highlightStyle: chart.donutHighlightStyle,
    center: _objectSpread({}, origin),
    style: tooltipStyle,
    width: chartInnerRadius * 2
  })) : _react.default.createElement(_Tooltip.default, _extends({
    constrainToVisibleArea: true
  }, tooltipProps, {
    labelComponent: _react.default.createElement(_Label.default, {
      colorScale: colorScale
    }),
    orientation: isComparisonMode ? 'left' : undefined,
    renderInPortal: false
  }));
  var labelComponent2 = labelComponent1;

  if (isComparisonMode && !donut) {
    labelComponent2 = _react.default.createElement(_Tooltip.default, _extends({
      constrainToVisibleArea: true
    }, tooltipProps, {
      labelComponent: _react.default.createElement(_Label.default, {
        colorScale: colorScale
      }),
      orientation: "right",
      renderInPortal: false
    }));
  }

  var labelRadius = donut ? chartInnerRadius : undefined;
  var LegendLabel = isComparisonMode ? _LegendLabel.default : _LegendLabel2.default; // Container

  var containerProps = _objectSpread({
    height: height,
    responsive: responsive,
    standalone: standalone,
    width: width
  }, parts && parts.container); // Since we are using custom container, we need to do the translate ourselves


  var translate = {
    x: padding.left - originalPadding.left,
    y: padding.top - originalPadding.top
  };
  return _react.default.createElement(_CustomContainer.default, containerProps, _react.default.createElement(_SharedEvents.default, {
    childName: ['pie1', 'pie2', 'legend'],
    donut: donut,
    emphasisCoefficient: chart.emphasisCoefficient
  }, _react.default.createElement("g", {
    role: "presentation",
    transform: "translate(".concat(translate.x, ", ").concat(translate.y, ")")
  }, donut && _react.default.createElement(_DonutLabel.default, {
    data: donutLabelData,
    colorScale: colorScale,
    highlightIndex: chart.donutHighlightIndex,
    highlightStyle: chart.donutHighlightStyle,
    sortKey: donutLabelKey.sortKey,
    style: donutLabelStyle,
    text: donutLabelData[donutLabelKey.columnIndex || 0].donutLabel || donutLabelData[donutLabelKey.columnIndex || 0].label,
    width: chartInnerRadius * 2,
    x: origin.x,
    y: origin.y
  }), _react.default.createElement(_victory.VictoryPie, _extends({
    colorScale: colorScale,
    data: data1,
    endAngle: endAngle1,
    height: chartHeight,
    innerRadius: chartInnerRadius,
    labelComponent: labelComponent1,
    labelRadius: labelRadius,
    name: "pie1",
    origin: origin,
    radius: computedRadii[0],
    standalone: false,
    startAngle: startAngle1,
    theme: theme,
    width: chartWidth
  }, props)), isComparisonMode && _react.default.createElement(_victory.VictoryPie, _extends({
    colorScale: colorScale2,
    data: data2,
    endAngle: endAngle2,
    groupComponent: _react.default.createElement("g", {
      role: "presentation",
      transform: "translate(".concat(computedGroupSpacing / 2, ", 0)")
    }),
    height: chartHeight,
    innerRadius: chartInnerRadius,
    labelRadius: labelRadius,
    labelComponent: labelComponent2,
    name: "pie2",
    origin: origin,
    radius: computedRadii[1 % computedRadii.length],
    standalone: false,
    startAngle: startAngle2,
    theme: theme,
    width: chartWidth
  }, props))), legend && _react.default.createElement(_victory.VictoryLegend, _extends({
    labelComponent: _react.default.createElement(LegendLabel, {
      colorScale: colorScale,
      theme: theme,
      width: legend.width
    }),
    name: "legend",
    standalone: false
  }, legend))));
}

PieChart.propTypes = {
  colorScale: _propTypes2.default.colorScale,
  data: _propTypes2.default.groupedData,
  donut: _propTypes.default.bool,
  donutLabelKey: _propTypes.default.shape({
    dataIndex: _propTypes.default.number,
    columnIndex: _propTypes.default.number,
    sortKey: _propTypes.default.oneOf(['value', '-value'])
  }),
  groupSpacing: _propTypes.default.number,
  height: _propTypes.default.number,
  innerRadius: _propTypes.default.number,
  origin: _propTypes.default.shape({
    x: _propTypes.default.number,
    y: _propTypes.default.number
  }),
  padding: _propTypes.default.oneOfType([_propTypes.default.number, _propTypes.default.shape({})]),
  parts: _propTypes.default.shape({
    legend: _propTypes.default.shape({}),
    parent: _propTypes.default.shape({
      padding: _propTypes.default.oneOfType([_propTypes.default.number, _propTypes.default.shape({})])
    }),
    container: _propTypes.default.shape({}),
    tooltip: _propTypes.default.shape({})
  }),
  radius: _propTypes.default.number,

  /**
   * radii enables comparing pie charts using areas instead of "pie"s.
   * If this is enabled, a single color will be used for the pie chart.
   *
   * The color will be selected (sequentially) from the supplied colorScale
   * (if any).
   */
  radii: _propTypes.default.arrayOf(_propTypes.default.number),
  responsive: _propTypes.default.bool,
  style: _propTypes.default.shape({
    labels: _propTypes.default.shape({})
  }),
  standalone: _propTypes.default.bool,
  theme: _propTypes2.default.theme,
  width: _propTypes.default.number
};
PieChart.defaultProps = {
  colorScale: undefined,
  data: undefined,
  donut: undefined,
  donutLabelKey: {
    dataIndex: 0,
    columnIndex: 0,
    sortKey: undefined
  },
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

var _default = (0, _withVictoryTheme.default)(PieChart);

exports.default = _default;