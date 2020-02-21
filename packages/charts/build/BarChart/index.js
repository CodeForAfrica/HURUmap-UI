"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _victory = require("victory");

var _utils = require("../../utils");

var _propTypes2 = _interopRequireDefault(require("../../propTypes"));

var _withVictoryTheme = _interopRequireDefault(require("../styles/withVictoryTheme"));

var _BarLabel = _interopRequireDefault(require("./BarLabel"));

var _Chart = _interopRequireWildcard(require("../Chart"));

var _LegendLabel = _interopRequireDefault(require("../LegendLabel"));

var _WrapLabel = _interopRequireDefault(require("../WrapLabel"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

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

function BarChart(_ref) {
  var barWidth = _ref.barWidth,
      propLabelWidth = _ref.labelWidth,
      d = _ref.data,
      domain = _ref.domain,
      domainPadding = _ref.domainPadding,
      suggestedHeight = _ref.height,
      horizontal = _ref.horizontal,
      offset = _ref.offset,
      suggestedPadding = _ref.padding,
      parts = _ref.parts,
      responsive = _ref.responsive,
      theme = _ref.theme,
      suggestedWidth = _ref.width,
      props = _objectWithoutProperties(_ref, ["barWidth", "labelWidth", "data", "domain", "domainPadding", "height", "horizontal", "offset", "padding", "parts", "responsive", "theme", "width"]);

  var _useState = (0, _react.useState)(0),
      _useState2 = _slicedToArray(_useState, 2),
      maxLabelDimmension = _useState2[0],
      setMaxLabelDimmesion = _useState2[1];

  var themeLabelWidth = theme.axis.labelWidth,
      chart = theme.bar,
      groupChart = theme.group;

  if (!d || !groupChart) {
    return null;
  }

  var height = suggestedHeight || chart.height;
  var width = suggestedWidth || chart.width;
  var groupProps = parts && parts.group ? [].concat(parts.group) : [];
  var tooltipProps = parts && parts.tooltip || {
    style: {}
  };
  var colorScale = groupChart.colorScale;
  var groupData = Array.isArray(d[0]) ? d : [d];
  var barSpacing = offset || barWidth;
  var labelWidth = barSpacing * groupData.length;
  var desiredLabelWidth = propLabelWidth || themeLabelWidth;

  if (horizontal && desiredLabelWidth) {
    labelWidth = desiredLabelWidth;
  }

  var axisProps = parts && (0, _Chart.toChartAxisProps)(parts.axis) || {};

  var _ref2 = axisProps.independent || {},
      propTickFormat = _ref2.tickFormat;

  var tickFormat = propTickFormat || function (tick) {
    var tickLabel = '';
    groupData.find(function (dE) {
      return dE.find(function (gE) {
        if (gE.x === tick) {
          tickLabel = gE.x.toString();
          return true;
        }

        return false;
      });
    });
    return tickLabel;
  };

  var originalPadding = _victory.Helpers.getPadding({
    padding: suggestedPadding || parts && parts.parent && parts.parent.padding || chart.padding
  });

  var initialLegendProps = _objectSpread({}, chart.legend, {
    colorScale: colorScale
  });

  var _getLegendProps = (0, _utils.getLegendProps)({
    height: height,
    width: width
  }, initialLegendProps, groupData[0], originalPadding),
      padding = _getLegendProps.padding,
      legend = _getLegendProps.legend;

  padding.left = horizontal && maxLabelDimmension ? maxLabelDimmension / 2 : padding.left;
  padding.bottom = !horizontal && maxLabelDimmension ? maxLabelDimmension * 2 : padding.bottom;

  var chartProps = _objectSpread({
    domain: domain,
    domainPadding: domainPadding,
    height: height,
    horizontal: horizontal,
    responsive: responsive,
    theme: theme,
    width: width
  }, parts && parts.parent, {
    padding: padding
  });

  var numberFormatter = new Intl.NumberFormat('en-GB');

  var handleMaxDimmesion = function handleMaxDimmesion(dimmension) {
    if (dimmension > maxLabelDimmension) {
      setTimeout(function () {
        setMaxLabelDimmesion(dimmension);
      }, 500);
    }
  };

  return _react.default.createElement(_Chart.default, chartProps, _react.default.createElement(_victory.VictoryAxis, _extends({
    dependentAxis: true,
    orientation: horizontal ? 'bottom' : 'right'
  }, axisProps.dependent)), _react.default.createElement(_victory.VictoryGroup, _extends({}, groupProps, {
    offset: offset
  }), groupData.map(function (data, i) {
    return _react.default.createElement(_victory.VictoryBar, _extends({
      barWidth: barWidth,
      data: data,
      key: data.toString(),
      labels: function labels(_ref3) {
        var datum = _ref3.datum;
        return typeof datum.y !== 'number' ? 'N/A' : numberFormatter.format(datum.y);
      },
      labelComponent: _react.default.createElement(_BarLabel.default, {
        tooltipProps: _objectSpread({}, tooltipProps, {
          data: data,
          style: _objectSpread({}, tooltipProps.style, {
            fill: colorScale[i]
          })
        }),
        theme: theme
      })
    }, props));
  })), _react.default.createElement(_victory.VictoryAxis, _extends({
    tickFormat: tickFormat,
    tickLabelComponent: _react.default.createElement(_WrapLabel.default, {
      width: labelWidth,
      horizontal: horizontal,
      onMaxDimmension: handleMaxDimmesion
    })
  }, axisProps.independent)), legend && _react.default.createElement(_victory.VictoryLegend, _extends({
    standalone: false,
    labelComponent: _react.default.createElement(_LegendLabel.default, {
      colorScale: colorScale,
      theme: theme,
      width: legend.labelWidth
    })
  }, legend)));
}

BarChart.propTypes = {
  data: _propTypes2.default.groupedData,
  barWidth: _propTypes.default.number,
  labelWidth: _propTypes.default.number,
  domain: _propTypes.default.oneOfType([_propTypes.default.number, _propTypes.default.shape({})]),
  domainPadding: _propTypes.default.oneOfType([_propTypes.default.number, _propTypes.default.shape({})]),
  height: _propTypes.default.number,
  horizontal: _propTypes.default.bool,
  offset: _propTypes.default.number,
  padding: _propTypes.default.oneOfType([_propTypes.default.number, _propTypes.default.shape({})]),
  parts: _propTypes.default.shape({
    axis: _propTypes.default.shape({}),
    group: _propTypes.default.shape({}),
    legend: _propTypes.default.shape({}),
    parent: _propTypes.default.shape({
      padding: _propTypes.default.oneOfType([_propTypes.default.number, _propTypes.default.shape({})])
    }),
    tooltip: _propTypes.default.shape({})
  }),
  responsive: _propTypes.default.bool,
  theme: _propTypes2.default.theme,
  width: _propTypes.default.number
};
BarChart.defaultProps = {
  barWidth: undefined,
  labelWidth: undefined,
  data: undefined,
  domain: undefined,
  domainPadding: undefined,
  height: undefined,
  horizontal: undefined,
  offset: undefined,
  padding: undefined,
  parts: undefined,
  responsive: true,
  theme: undefined,
  width: undefined
};

var _default = (0, _withVictoryTheme.default)(BarChart);

exports.default = _default;