"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

/**
 * Simple custom container similar to VictoryContainer that should be used with
 * components that don't work with VictoryChart i.e. those that don't need
 * Cartesian or polar axes.
 */
function CustomContainer(_ref) {
  var children = _ref.children,
      height = _ref.height,
      overflow = _ref.overflow,
      responsive = _ref.responsive,
      standalone = _ref.standalone,
      style = _ref.style,
      width = _ref.width;

  if (!standalone) {
    return children;
  }

  var dimensions = responsive ? {
    width: '100%',
    height: 'auto'
  } : {
    width: width,
    height: height
  };

  var divStyle = _objectSpread({
    pointerEvents: 'none',
    touchAction: 'none',
    position: 'relative'
  }, dimensions);

  var svgProps = {
    width: width,
    height: height,
    overflow: overflow,
    role: 'img',
    viewBox: responsive ? "0 0 ".concat(width, " ").concat(height) : undefined
  }; // Overflow visible will allow tooltips to not be cut off

  var svgStyle = _objectSpread({
    pointerEvents: 'all',
    overflow: 'visible'
  }, dimensions);

  return _react.default.createElement("div", {
    style: _objectSpread({}, style, {}, divStyle)
  }, _react.default.createElement("svg", _extends({}, svgProps, {
    style: svgStyle
  }), children));
}

CustomContainer.propTypes = {
  children: _propTypes.default.oneOfType([_propTypes.default.arrayOf(_propTypes.default.node), _propTypes.default.node]).isRequired,
  height: _propTypes.default.number,
  overflow: _propTypes.default.oneOf(['auto', 'hidden', 'scroll', 'visible']),
  responsive: _propTypes.default.bool,
  standalone: _propTypes.default.bool,
  style: _propTypes.default.shape({}),
  width: _propTypes.default.number
};
CustomContainer.defaultProps = {
  height: undefined,
  overflow: 'visible',
  responsive: true,
  standalone: true,
  style: undefined,
  width: undefined
};
var _default = CustomContainer;
exports.default = _default;