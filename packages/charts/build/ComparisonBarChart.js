"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _victory = require("victory");

var _utils = require("../utils");

var _propTypes2 = _interopRequireDefault(require("../propTypes"));

var _ReferableChart = require("../ReferableChart");

var _withVictoryTheme = _interopRequireDefault(require("./styles/withVictoryTheme"));

var _CustomContainer = _interopRequireDefault(require("./CustomContainer"));

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

function ComparisonBarChart(_ref) {
  var barHeightProp = _ref.barHeight,
      data = _ref.data,
      heightProp = _ref.height,
      _ref$horizontal = _ref.horizontal,
      horizontal = _ref$horizontal === void 0 ? true : _ref$horizontal,
      labelsProp = _ref.labels,
      referenceProp = _ref.reference,
      _ref$style = _ref.style,
      style = _ref$style === void 0 ? {} : _ref$style,
      theme = _ref.theme,
      widthProp = _ref.width;

  var _useState = (0, _react.useState)({}),
      _useState2 = _slicedToArray(_useState, 2),
      tooltipProps = _useState2[0],
      setTooltipProps = _useState2[1];

  var chart = theme.comparisonBar;

  if (!data || !chart) {
    return null;
  }

  var _toReferenceProps = (0, _ReferableChart.toReferenceProps)(referenceProp),
      _toReferenceProps$dat = _slicedToArray(_toReferenceProps.data, 1),
      referenceData = _toReferenceProps$dat[0],
      referenceStyleProp = _toReferenceProps.style;

  var referenceStyle = _objectSpread({}, chart.referenceStyle, {}, referenceStyleProp);

  var dataStyle = _objectSpread({}, chart.style.data, {}, style.data);

  var colorScale = chart.colorScale;
  var height = heightProp || chart.height;
  var width = widthProp || chart.width;
  var values = data.map(function (d) {
    return d.y;
  }).concat(referenceData.y);
  var max = Math.max.apply(null, values);
  var dataBarWidths = data.map(function (d) {
    return d.y * width / max;
  });
  var referenceDataBarWidth = referenceData.y * width / max;
  var barHeight = barHeightProp || chart.barHeight;
  var labels = labelsProp || _utils.labels;

  var tooltip = _react.default.createElement(_victory.VictoryTooltip, _extends({
    constrainToVisibleArea: true
  }, tooltipProps, {
    theme: theme
  }));

  var activateTooltip = function activateTooltip(evt, newTooltipProps) {
    if (newTooltipProps && newTooltipProps.text) {
      var _Selection$getSVGEven = _victory.Selection.getSVGEventCoordinates(evt),
          tipX = _Selection$getSVGEven.x,
          tipY = _Selection$getSVGEven.y;

      setTooltipProps(_objectSpread({
        active: true
      }, newTooltipProps, {
        x: tipX,
        y: tipY
      }));
    }
  };

  return _react.default.createElement(_CustomContainer.default, {
    theme: theme,
    horizontal: horizontal,
    width: width,
    height: height
  }, dataBarWidths.map(function (barWidth, i) {
    return _react.default.createElement(_react.default.Fragment, {
      key: data[i].x
    }, _react.default.createElement(_victory.VictoryLabel, {
      capHeight: 0,
      dy: 0,
      lineHeight: 0,
      style: _objectSpread({
        fill: colorScale[i % colorScale.length]
      }, dataStyle),
      text: data[i].y,
      x: 0,
      y: (i + 1) * 40 + i * 10 - barHeight
    }), _react.default.createElement(_victory.Border, {
      events: {
        onMouseOver: function onMouseOver(evt) {
          return activateTooltip(evt, {
            text: labels(data[i])
          });
        },
        onMouseMove: function onMouseMove(evt) {
          return activateTooltip(evt, {
            text: labels(data[i])
          });
        },
        onMouseOut: function onMouseOut() {
          return setTooltipProps({
            active: false
          });
        }
      },
      height: barHeight,
      style: {
        fill: colorScale[i % colorScale.length]
      },
      x: 0,
      width: barWidth,
      y: (i + 1) * 40 + i * 10
    }));
  }), _react.default.createElement(_victory.VictoryLabel, {
    capHeight: 0,
    dy: 0,
    lineHeight: 0,
    style: referenceStyle.data,
    text: referenceData.y,
    x: 0,
    y: data.length * 40 + (data.length - 1) * 10 - 2 * barHeight + 70
  }), _react.default.createElement(_victory.Border, {
    events: {
      onMouseOver: function onMouseOver(evt) {
        return activateTooltip(evt, {
          text: labels(referenceData)
        });
      },
      onMouseMove: function onMouseMove(evt) {
        return activateTooltip(evt, {
          text: labels(referenceData)
        });
      },
      onMouseOut: function onMouseOut() {
        return setTooltipProps({
          active: false
        });
      }
    },
    height: barHeight,
    style: referenceStyle.labels,
    width: referenceDataBarWidth,
    x: 0,
    y: data.length * 40 + (data.length - 1) * 10 - barHeight + 70
  }), _react.default.createElement(_victory.VictoryLabel, {
    capHeight: 0,
    dy: 0,
    lineHeight: 0,
    style: referenceStyle.labels,
    text: referenceData.x,
    x: 0,
    y: data.length * 40 + (data.length - 1) * 10 + 3 * barHeight + 70
  }), tooltip);
}

ComparisonBarChart.propTypes = {
  barHeight: _propTypes.default.number,
  data: _propTypes.default.arrayOf(_propTypes.default.shape({
    x: _propTypes.default.string,
    y: _propTypes.default.number
  })).isRequired,
  height: _propTypes.default.number,
  horizontal: _propTypes.default.bool,
  labels: _propTypes2.default.func,
  reference: _propTypes2.default.reference,
  style: _propTypes.default.shape({
    data: _propTypes.default.shape({}),
    labels: _propTypes.default.shape({})
  }),
  theme: _propTypes2.default.theme,
  width: _propTypes.default.number
};
ComparisonBarChart.defaultProps = {
  barHeight: undefined,
  height: undefined,
  horizontal: undefined,
  labels: undefined,
  reference: undefined,
  style: undefined,
  theme: undefined,
  width: undefined
};

var _default = (0, _withVictoryTheme.default)(ComparisonBarChart);

exports.default = _default;