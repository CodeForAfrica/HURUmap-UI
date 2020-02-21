"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _utils = require("../utils");

var _propTypes2 = _interopRequireDefault(require("../propTypes"));

var _ScaledArea = require("./ScaledArea");

var _HorizontalLegend = _interopRequireDefault(require("./HorizontalLegend"));

var _PieChart = _interopRequireDefault(require("../PieChart"));

var _Tooltip = _interopRequireDefault(require("../Tooltip"));

var _VerticalLegend = _interopRequireDefault(require("./VerticalLegend"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { if (!(Symbol.iterator in Object(arr) || Object.prototype.toString.call(arr) === "[object Arguments]")) { return; } var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

/**
 *
 */
function ScaledCircle(_ref) {
  var formatNumberForLabel = _ref.formatNumberForLabel,
      _ref$colorScale = _ref.colorScale,
      colorScale = _ref$colorScale === void 0 ? [] : _ref$colorScale,
      data = _ref.data,
      groupSpacing = _ref.groupSpacing,
      mobile = _ref.mobile,
      reference = _ref.reference,
      style = _ref.style,
      theme = _ref.theme,
      props = _objectWithoutProperties(_ref, ["formatNumberForLabel", "colorScale", "data", "groupSpacing", "mobile", "reference", "style", "theme"]);

  var cx = mobile ? _ScaledArea.MOBILE_WIDTH / 2 : _ScaledArea.DESKTOP_WIDTH / 2;
  var cy = mobile ? 100 + _ScaledArea.MOBILE_WIDTH / 2 : _ScaledArea.DESKTOP_HEIGHT / 2;
  var height = mobile ? _ScaledArea.MOBILE_HEIGHT : _ScaledArea.DESKTOP_HEIGHT;
  var size = mobile ? _ScaledArea.MOBILE_WIDTH / 2 : (_ScaledArea.DESKTOP_HEIGHT - groupSpacing) / 2;
  var width = mobile ? _ScaledArea.MOBILE_WIDTH : _ScaledArea.DESKTOP_WIDTH;

  var _reference$data = _slicedToArray(reference.data, 1),
      referenceData = _reference$data[0],
      referenceStyle = reference.style;

  var radii = data.map(function (d) {
    return d.y !== referenceData.y ? Math.sqrt(d.y) * size / Math.sqrt(referenceData.y) : size;
  }); // When we're doing comparison, the background for both half circles
  // should be the reference data.

  var backgroundData = radii.length > 1 ? [[size], [size]] : [size];
  return _react.default.createElement(_react.default.Fragment, null, _react.default.createElement(_PieChart.default, _extends({}, props, {
    data: backgroundData,
    donut: false,
    height: height,
    origin: {
      x: cx,
      y: cy
    },
    radius: size,
    standalone: false,
    style: referenceStyle,
    theme: theme,
    width: width
  })), mobile ? _react.default.createElement(_VerticalLegend.default, {
    colorScale: colorScale,
    data: data,
    formatNumberForLabel: formatNumberForLabel,
    reference: reference,
    style: style,
    theme: theme
  }) : _react.default.createElement(_HorizontalLegend.default, {
    colorScale: colorScale,
    cx: cx,
    cy: cy,
    data: data,
    formatNumberForLabel: formatNumberForLabel,
    radii: radii,
    reference: reference,
    style: style,
    theme: theme
  }), _react.default.createElement(_PieChart.default, _extends({}, props, {
    colorScale: colorScale,
    data: radii.map(function (v) {
      return [v];
    }),
    donut: false,
    height: height,
    labels: data.map(function (d) {
      return "".concat((0, _utils.labels)(d), "\n").concat((0, _utils.labels)(referenceData));
    }),
    labelComponent: _react.default.createElement(_Tooltip.default, {
      theme: theme
    }),
    origin: {
      x: cx,
      y: cy
    },
    radii: radii,
    standalone: false,
    theme: theme,
    width: width
  })));
}

ScaledCircle.propTypes = {
  formatNumberForLabel: _propTypes.default.func,
  colorScale: _propTypes2.default.colorScale,
  data: _propTypes2.default.data,
  groupSpacing: _propTypes.default.number.isRequired,
  mobile: _propTypes.default.bool,
  reference: _propTypes2.default.reference,
  style: _propTypes.default.shape({
    labels: _propTypes.default.shape({})
  }),
  theme: _propTypes2.default.theme
};
ScaledCircle.defaultProps = {
  formatNumberForLabel: function formatNumberForLabel(x) {
    return x;
  },
  colorScale: undefined,
  data: undefined,
  mobile: false,
  reference: undefined,
  style: undefined,
  theme: undefined
};
var _default = ScaledCircle;
exports.default = _default;