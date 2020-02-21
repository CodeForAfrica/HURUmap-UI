"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _Label = _interopRequireDefault(require("../Label"));

var _Tooltip = _interopRequireDefault(require("./Tooltip"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

/**
 * Tooltip *without* any events is needed for shared events on the pie chart
 * to work.
 * see: https://formidable.com/open-source/victory/guides/tooltips/#tooltips-with-other-events
 */
function DonutTooltip(_ref) {
  var center = _ref.center,
      cornerRadius = _ref.cornerRadius,
      highlightIndex = _ref.highlightIndex,
      highlightStyle = _ref.highlightStyle,
      width = _ref.width,
      x = _ref.x,
      y = _ref.y,
      props = _objectWithoutProperties(_ref, ["center", "cornerRadius", "highlightIndex", "highlightStyle", "width", "x", "y"]);

  var originalDatum = props.datum,
      originalText = props.text;
  var text = originalDatum && originalDatum.donutLabel || originalText;

  var datum = _objectSpread({}, originalDatum, {
    label: text
  });

  return _react.default.createElement("g", null, _react.default.createElement(_Tooltip.default, _extends({}, props, {
    center: center,
    constrainToVisibleArea: true,
    orientation: "top",
    cornerRadius: cornerRadius,
    datum: datum,
    flyoutHeight: width,
    flyoutStyle: {
      fill: 'white',
      stroke: 'none'
    },
    flyoutWidth: width,
    labelComponent: _react.default.createElement(_Label.default, _extends({}, props, {
      datum: datum,
      highlightIndex: highlightIndex,
      highlightStyle: highlightStyle,
      width: width,
      text: text,
      verticalAnchor: "middle"
    })),
    pointerLength: 0,
    renderInPortal: false,
    text: text
  })), _react.default.createElement(_Tooltip.default, _extends({}, props, {
    renderInPortal: false,
    x: x,
    y: y
  })));
}

DonutTooltip.propTypes = {
  center: _propTypes.default.shape({
    x: _propTypes.default.number,
    y: _propTypes.default.number
  }),
  cornerRadius: _propTypes.default.number,
  datum: _propTypes.default.shape({}),
  highlightIndex: _propTypes.default.number,
  highlightStyle: _propTypes.default.shape({}),
  text: _propTypes.default.string,
  width: _propTypes.default.number,
  x: _propTypes.default.number,
  y: _propTypes.default.number
};
DonutTooltip.defaultProps = {
  cornerRadius: undefined,
  datum: undefined,
  highlightIndex: undefined,
  highlightStyle: undefined,
  center: undefined,
  text: undefined,
  width: undefined,
  x: undefined,
  y: undefined
};
var _default = DonutTooltip;
exports.default = _default;