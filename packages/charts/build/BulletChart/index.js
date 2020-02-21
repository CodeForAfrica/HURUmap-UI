"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _utils = require("../../utils");

var _withVictoryTheme = _interopRequireDefault(require("../styles/withVictoryTheme"));

var _BulletBar = _interopRequireDefault(require("./BulletBar"));

var _CustomContainer = _interopRequireDefault(require("../CustomContainer"));

var _propTypes2 = _interopRequireDefault(require("../../propTypes"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var toOffset = function toOffset(prop, _ref) {
  var offset = _ref.offset;

  if (prop) {
    if (typeof prop === 'number') {
      return {
        x: prop,
        y: prop
      };
    }

    return prop;
  }

  if (typeof offset === 'number') {
    return {
      x: offset,
      y: offset
    };
  }

  return offset;
};
/**
 * By default, Bullet chart assumes data is a percentage **if** only one value
 * provided and its less than 100. Otherwise, it will assume data provided is
 * half i.e. convert `[data]`  to `[data, data]`
 */


function BulletChart(_ref2) {
  var barWidth = _ref2.barWidth,
      data = _ref2.data,
      height = _ref2.height,
      labels = _ref2.labels,
      offset = _ref2.offset,
      reference = _ref2.reference,
      theme = _ref2.theme,
      totalProp = _ref2.total,
      width = _ref2.width;
  var chart = theme.bullet,
      mobileBreakpoint = theme.breakpoints.sm;

  if (!data || !chart) {
    return null;
  }

  var computedBarWidth = barWidth || chart.barWidth;
  var computedData = Array.isArray(data[0]) ? data.slice(0, 2) : [data];
  var computedHeight = height || chart.height;
  var computedOffset = toOffset(offset, chart);

  var computedStyle = _objectSpread({}, chart.style);

  var computedWidth = width || chart.width;
  var isMobile = computedWidth < mobileBreakpoint;
  var isDirectionColumn = isMobile || computedData.length < 2;
  var total = Array.isArray(totalProp) ? totalProp.reverse() : totalProp;
  return _react.default.createElement(_CustomContainer.default, {
    height: height,
    theme: theme,
    width: width
  }, computedData.reverse().map(function (d, i) {
    return _react.default.createElement("g", {
      key: JSON.stringify(d)
    }, _react.default.createElement(_BulletBar.default, {
      barWidth: computedBarWidth,
      data: d,
      labels: labels || _utils.labels,
      reference: typeof ref === 'number' ? {
        style: chart.reference,
        data: reference
      } : {
        style: reference.style || chart.reference,
        data: reference.data
      },
      style: _objectSpread({}, computedStyle, {
        data: {
          fill: chart.colorScale[(computedData.length - i - 1) % chart.colorScale.length]
        }
      }),
      theme: theme,
      total: Array.isArray(total) ? total[i] : total,
      width: isDirectionColumn ? computedWidth : (computedWidth - computedOffset.x) / 2,
      x: isDirectionColumn ? 0 : (i * computedWidth + computedOffset.x) / 2,
      y: isDirectionColumn ? computedHeight - i * computedOffset.y : computedHeight
    }));
  }));
}

BulletChart.propTypes = {
  data: _propTypes2.default.groupedData,
  barWidth: _propTypes.default.number,
  height: _propTypes.default.number,
  labels: _propTypes.default.func,
  offset: _propTypes.default.oneOfType([_propTypes.default.number, _propTypes.default.shape({})]),
  reference: _propTypes.default.oneOfType([_propTypes2.default.number, _propTypes2.default.singleRefrence]),
  theme: _propTypes2.default.theme,
  total: _propTypes2.default.number.isRequired,
  width: _propTypes.default.number
};
BulletChart.defaultProps = {
  data: undefined,
  barWidth: undefined,
  height: undefined,
  labels: undefined,
  offset: undefined,
  reference: undefined,
  theme: undefined,
  width: undefined
};

var _default = (0, _withVictoryTheme.default)(BulletChart);

exports.default = _default;