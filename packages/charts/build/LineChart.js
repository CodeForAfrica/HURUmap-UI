"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _victory = require("victory");

var _utils = require("../utils");

var _withVictoryTheme = _interopRequireDefault(require("./styles/withVictoryTheme"));

var _Chart = _interopRequireWildcard(require("./Chart"));

var _LegendLabel = _interopRequireDefault(require("./LegendLabel"));

var _WrapLabel = _interopRequireDefault(require("./WrapLabel"));

var _Tooltip = _interopRequireDefault(require("../Tooltip"));

var _propTypes2 = _interopRequireDefault(require("../propTypes"));

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

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
function LineChart(_ref) {
  var propLabelWidth = _ref.labelWidth,
      data = _ref.data,
      suggestedHeight = _ref.height,
      horizontal = _ref.horizontal,
      suggestedPadding = _ref.padding,
      parts = _ref.parts,
      style = _ref.style,
      theme = _ref.theme,
      suggestedWidth = _ref.width,
      props = _objectWithoutProperties(_ref, ["labelWidth", "data", "height", "horizontal", "padding", "parts", "style", "theme", "width"]);

  var themeLabelWidth = theme.axis.labelWidth,
      chart = theme.line;

  if (!data || !chart) {
    return null;
  }

  var height = suggestedHeight || chart.height;
  var width = suggestedWidth || chart.width;
  var groupData = data.length > 1 && Array.isArray(data[0]) ? data : [data];
  var axisProps = parts && (0, _Chart.toChartAxisProps)(parts.axis) || {};
  var containerProps = parts && parts.container;
  var tooltipProps = parts && parts.tooltip || {
    style: {}
  };
  var colorScale = chart.colorScale;

  var _ref2 = style || {},
      dataStyle = _ref2.data,
      otherStyles = _objectWithoutProperties(_ref2, ["data"]);

  var originalPadding = _victory.Helpers.getPadding({
    padding: suggestedPadding || chart.padding
  });

  var initialLegendProps = _objectSpread({}, chart.legend, {
    colorScale: colorScale
  }, parts && parts.legend);

  var _getLegendProps = (0, _utils.getLegendProps)({
    height: height,
    width: width
  }, initialLegendProps, groupData[0], originalPadding),
      padding = _getLegendProps.padding,
      legend = _getLegendProps.legend;

  var chartProps = _objectSpread({
    height: height,
    horizontal: horizontal,
    padding: padding,
    width: width
  }, parts && parts.parent);

  var labelWidth = propLabelWidth || themeLabelWidth;

  if (!labelWidth) {
    labelWidth = width / groupData[0].length;
  }

  return _react.default.createElement(_Chart.default, _extends({
    containerComponent: _react.default.createElement(_victory.VictoryVoronoiContainer, _extends({
      labelComponent: _react.default.createElement(_Tooltip.default, tooltipProps),
      mouseFollowTooltips: true
    }, containerProps)),
    theme: theme
  }, chartProps), _react.default.createElement(_victory.VictoryAxis, _extends({
    tickLabelComponent: _react.default.createElement(_WrapLabel.default, {
      width: labelWidth
    })
  }, axisProps.independent)), _react.default.createElement(_victory.VictoryAxis, _extends({
    dependentAxis: true,
    orientation: horizontal ? 'bottom' : 'right'
  }, axisProps.dependent)), groupData.map(function (gd, i) {
    return _react.default.createElement(_victory.VictoryLine, _extends({
      color: colorScale[i % colorScale.length],
      data: gd,
      key: JSON.stringify(gd),
      style: _objectSpread({
        data: _objectSpread({}, {
          stroke: colorScale[i % colorScale.length]
        }, {}, dataStyle)
      }, otherStyles)
    }, props));
  }), legend && _react.default.createElement(_victory.VictoryLegend, _extends({
    standalone: false,
    labelComponent: _react.default.createElement(_LegendLabel.default, {
      colorScale: colorScale,
      theme: theme,
      width: legend.labelWidth
    })
  }, legend)));
}

LineChart.propTypes = {
  labelWidth: _propTypes.default.number,
  data: _propTypes2.default.groupedData,
  height: _propTypes.default.number,
  horizontal: _propTypes.default.bool,
  padding: _propTypes.default.oneOfType([_propTypes.default.number, _propTypes.default.shape({})]),
  parts: _propTypes.default.shape({
    axis: _propTypes.default.shape({}),
    container: _propTypes.default.shape({}),
    group: _propTypes.default.shape({}),
    legend: _propTypes.default.shape({}),
    parent: _propTypes.default.shape({}),
    tooltip: _propTypes.default.shape({})
  }),
  style: _propTypes.default.shape({
    data: _propTypes.default.shape({})
  }),
  theme: _propTypes2.default.theme,
  width: _propTypes.default.number
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

var _default = (0, _withVictoryTheme.default)(LineChart);

exports.default = _default;