"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _victory = require("victory");

var _utils = require("../../utils");

var _Tooltip = _interopRequireDefault(require("../../Tooltip"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

function BarLabel(_ref) {
  var datum = _ref.datum,
      labelsProp = _ref.labels,
      text = _ref.text,
      _ref$tooltipProps = _ref.tooltipProps,
      data = _ref$tooltipProps.data,
      tooltipProps = _objectWithoutProperties(_ref$tooltipProps, ["data"]),
      x = _ref.x,
      y = _ref.y,
      props = _objectWithoutProperties(_ref, ["datum", "labels", "text", "tooltipProps", "x", "y"]);

  var labels = labelsProp || _utils.labels;
  var tooltip = text; // eslint-disable-next-line no-underscore-dangle

  if (data && datum && data[datum._x - 1]) {
    // eslint-disable-next-line no-underscore-dangle
    tooltip = data[datum._x - 1].tooltip || labels(data[datum._x - 1]);
  }

  return _react.default.createElement(_react.default.Fragment, null, _react.default.createElement(_victory.VictoryLabel, _extends({
    datum: datum,
    text: text
  }, props)), _react.default.createElement(_Tooltip.default, _extends({}, tooltipProps, {
    datum: datum,
    text: tooltip,
    x: x,
    y: y // eslint-disable-next-line react/prop-types, no-underscore-dangle

  }, props)));
}

BarLabel.propTypes = {
  datum: _propTypes.default.shape({
    _x: _propTypes.default.number
  }),
  labels: _propTypes.default.func,
  text: _propTypes.default.oneOfType([_propTypes.default.string, _propTypes.default.func]),
  tooltipProps: _propTypes.default.shape({
    data: _propTypes.default.arrayOf(_propTypes.default.shape({
      tooltip: _propTypes.default.string
    }))
  }).isRequired,
  x: _propTypes.default.number,
  y: _propTypes.default.number
};
/**
 * Enable tooltip to show on mouse over.
 */

BarLabel.defaultEvents = _Tooltip.default.defaultEvents;
BarLabel.defaultProps = {
  datum: undefined,
  labels: undefined,
  text: undefined,
  x: undefined,
  y: undefined
};
var _default = BarLabel;
exports.default = _default;