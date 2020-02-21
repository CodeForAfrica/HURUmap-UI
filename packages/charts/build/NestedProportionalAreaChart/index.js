"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _propTypes2 = _interopRequireDefault(require("../propTypes"));

var _ScaledArea = require("./ScaledArea");

var _ReferableChart = require("../ReferableChart");

var _withVictoryTheme = _interopRequireDefault(require("../styles/withVictoryTheme"));

var _CustomContainer = _interopRequireDefault(require("../CustomContainer"));

var _ScaledCircle = _interopRequireDefault(require("./ScaledCircle"));

var _ScaledSquare = _interopRequireDefault(require("./ScaledSquare"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

/**
 * Data value represents **area**. We need to find length/radius in order to
 * draw the shapes. For both squares & circles, √ of the area should give us
 * the length/radius to use (for circle, the √ of π is a constant that drops
 * off when scaling)
 */
function NestedProportionalAreaChart(_ref) {
  var data = _ref.data,
      gS = _ref.groupSpacing,
      h = _ref.height,
      ref = _ref.reference,
      _ref$square = _ref.square,
      square = _ref$square === void 0 ? false : _ref$square,
      style = _ref.style,
      theme = _ref.theme,
      w = _ref.width,
      formatNumberForLabel = _ref.formatNumberForLabel;
  var chart = theme.proportionalArea;

  if (!data || !chart) {
    return null;
  }

  var reference = _objectSpread({
    style: chart.reference
  }, (0, _ReferableChart.toReferenceProps)(ref));

  var height = h || chart.height;
  var width = w || chart.width;
  var isHandset = width < theme.breakpoints.sm;
  var scale = isHandset || square ? (0, _ScaledArea.scaleMobileDimensions)(height, width) : (0, _ScaledArea.scaleDesktopDimensions)(height, width);
  var groupSpacing = data.length > 1 ? gS || chart.groupSpacing : 0; // For starters, lets assume each data label has 36px height,
  // reference label has 48 px, and there is 10px between labels
  // and charts
  // ------------------------------------

  return _react.default.createElement(_react.default.Fragment, null, _react.default.createElement(_CustomContainer.default, {
    height: height,
    width: width
  }, _react.default.createElement("defs", null, _react.default.createElement("pattern", {
    id: "gradient-background",
    patternUnits: "userSpaceOnUse",
    width: "5.5",
    height: "5.5",
    patternTransform: "rotate(135)"
  }, _react.default.createElement("line", {
    x1: "0",
    y: "0",
    x2: "0",
    y2: "5.5",
    stroke: "#C4C4C4",
    strokeWidth: "1"
  }))), _react.default.createElement("g", {
    transform: "scale(".concat(scale, ")")
  }, square ? _react.default.createElement(_ScaledSquare.default, {
    colorScale: chart.colorScale,
    data: data,
    formatNumberForLabel: formatNumberForLabel,
    reference: reference,
    theme: theme
  }) : _react.default.createElement(_ScaledCircle.default, {
    colorScale: chart.colorScale,
    data: data,
    groupSpacing: groupSpacing,
    labels: function labels() {
      return '';
    } // Don't show PieChart labels
    ,
    labelComponent: undefined // Don't show PieChart labels
    ,
    mobile: isHandset,
    reference: reference,
    style: style,
    theme: theme,
    formatNumberForLabel: formatNumberForLabel
  }))));
}

NestedProportionalAreaChart.propTypes = {
  formatNumberForLabel: _propTypes.default.func,
  data: _propTypes2.default.data,
  groupSpacing: _propTypes.default.number,
  height: _propTypes.default.number,
  reference: _propTypes2.default.reference,
  square: _propTypes.default.bool,
  style: _propTypes.default.shape({
    labels: _propTypes.default.shape({})
  }),
  theme: _propTypes2.default.theme,
  width: _propTypes.default.number
};
NestedProportionalAreaChart.defaultProps = {
  formatNumberForLabel: function formatNumberForLabel(x) {
    return x;
  },
  data: undefined,
  groupSpacing: undefined,
  height: undefined,
  reference: undefined,
  square: false,
  style: undefined,
  theme: undefined,
  width: undefined
};

var _default = (0, _withVictoryTheme.default)(NestedProportionalAreaChart);

exports.default = _default;