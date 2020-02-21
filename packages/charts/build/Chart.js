"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.toChartAxisProps = void 0;

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _victory = require("victory");

var _withVictoryTheme = _interopRequireDefault(require("./styles/withVictoryTheme"));

var _propTypes2 = _interopRequireDefault(require("./propTypes"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

var toChartAxisProps = function toChartAxisProps(prop) {
  if (!prop) {
    return {};
  }

  if (prop.independent || prop.dependent) {
    return prop;
  }

  return {
    independent: prop,
    dependent: prop
  };
};

exports.toChartAxisProps = toChartAxisProps;

function Chart(_ref) {
  var children = _ref.children,
      overflow = _ref.overflow,
      _ref$responsive = _ref.responsive,
      responsive = _ref$responsive === void 0 ? true : _ref$responsive,
      e = _ref.events,
      theme = _ref.theme,
      props = _objectWithoutProperties(_ref, ["children", "overflow", "responsive", "events", "theme"]);

  // `events`, `height` and `width` are the only props passed to the
  // chart container SVG, `style` isn't.
  // https://github.com/FormidableLabs/victory/blob/c0bff5240ce25d51a6fb6b9db091a2c27e0f5903/packages/victory-core/src/victory-container/victory-container.js#L118-L159
  var events = _objectSpread({
    overflow: overflow
  }, e);

  return _react.default.createElement(_victory.VictoryChart, _extends({
    containerComponent: _react.default.createElement(_victory.VictoryContainer, {
      events: events,
      responsive: responsive,
      style: {
        height: 'auto'
      }
    }),
    theme: theme
  }, props), children);
}

Chart.propTypes = {
  children: _propTypes.default.oneOfType([_propTypes.default.arrayOf(_propTypes.default.node), _propTypes.default.node]).isRequired,
  events: _propTypes.default.shape({}),
  overflow: _propTypes.default.oneOf(['auto', 'hidden', 'scroll', 'visible']),
  responsive: _propTypes.default.bool,
  theme: _propTypes2.default.theme.isRequired
};
Chart.defaultProps = {
  events: undefined,
  overflow: 'visible',
  responsive: undefined
};

var _default = (0, _withVictoryTheme.default)(Chart);

exports.default = _default;