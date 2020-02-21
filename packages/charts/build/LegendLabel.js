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

var _Label = _interopRequireDefault(require("./Label"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

/**
 * VictoryLegend only uses `name` for displaying the key. This component
 * adds label recognition to legend via tooltip.
 *
 * @param {*} props .
 */
// while we need `width` for the label, we don't need it for tooltip
function LegendLabel(_ref) {
  var width = _ref.width,
      props = _objectWithoutProperties(_ref, ["width"]);

  var colorScale = props.colorScale,
      datum = props.datum,
      index = props.index,
      textProp = props.text;
  var text = textProp;

  if (datum) {
    var tooltip = datum.tooltip;

    if (tooltip) {
      text = tooltip;
    } else if (datum.y) {
      text = (0, _utils.labels)(datum);
    }
  }

  return _react.default.createElement("g", null, _react.default.createElement(_Label.default, _extends({
    width: width
  }, props)), _react.default.createElement(_victory.VictoryTooltip, _extends({}, props, {
    datum: _objectSpread({
      _x: index + 1
    }, datum),
    text: text,
    labelComponent: _react.default.createElement(_Label.default, {
      colorScale: colorScale
    })
  })));
}

LegendLabel.defaultEvents = _victory.VictoryTooltip.defaultEvents;
LegendLabel.propTypes = {
  colorScale: _propTypes2.default.colorScale,
  datum: _propTypes.default.shape({
    tooltip: _propTypes.default.string,
    y: _propTypes.default.number
  }),
  index: _propTypes.default.number,
  text: _propTypes.default.string,
  width: _propTypes.default.number
};
LegendLabel.defaultProps = {
  colorScale: undefined,
  datum: undefined,
  index: undefined,
  text: undefined,
  width: undefined
};
var _default = LegendLabel;
exports.default = _default;