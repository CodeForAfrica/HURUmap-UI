"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _victory = require("victory");

var _propTypes2 = _interopRequireDefault(require("../../propTypes"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { if (!(Symbol.iterator in Object(arr) || Object.prototype.toString.call(arr) === "[object Arguments]")) { return; } var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function BulletBar(_ref) {
  var barWidth = _ref.barWidth,
      data = _ref.data,
      labels = _ref.labels,
      reference = _ref.reference,
      _ref$style = _ref.style,
      style = _ref$style === void 0 ? {} : _ref$style,
      theme = _ref.theme,
      total = _ref.total,
      width = _ref.width,
      x = _ref.x,
      y = _ref.y;
  var featuredMeasure = width * data[0].y / total;

  var _useState = (0, _react.useState)({}),
      _useState2 = _slicedToArray(_useState, 2),
      tooltipProps = _useState2[0],
      setTooltipProps = _useState2[1];

  var _data = _slicedToArray(data, 2),
      qualitativeMeasureProp = _data[1];

  var qualitativeMeasure = qualitativeMeasureProp || {
    y: total
  };
  var comparativeMeasure = width * reference.data / total;

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

  return _react.default.createElement(_react.default.Fragment, null, qualitativeMeasureProp && _react.default.createElement(_victory.VictoryLabel, {
    capHeight: 0,
    lineHeight: 0,
    textAnchor: "end",
    x: x + width,
    y: y - 2 * barWidth,
    text: labels(qualitativeMeasure),
    style: style.labels
  }), _react.default.createElement(_victory.Border, {
    events: qualitativeMeasureProp && {
      onMouseOver: function onMouseOver(evt) {
        return activateTooltip(evt, {
          text: labels(qualitativeMeasure)
        });
      },
      onMouseMove: function onMouseMove(evt) {
        return activateTooltip(evt, {
          text: labels(qualitativeMeasure)
        });
      },
      onMouseOut: function onMouseOut() {
        return setTooltipProps({
          active: false
        });
      }
    },
    x: x,
    y: y - barWidth,
    width: width,
    height: barWidth,
    style: style.labels
  }), _react.default.createElement(_victory.VictoryLabel, {
    capHeight: 0,
    lineHeight: 0,
    x: x,
    y: y - 2 * barWidth,
    text: labels(data[0]),
    style: style.data
  }), _react.default.createElement(_victory.Border, {
    events: {
      onMouseOver: function onMouseOver(evt) {
        return activateTooltip(evt, {
          text: labels(data[0])
        });
      },
      onMouseMove: function onMouseMove(evt) {
        return activateTooltip(evt, {
          text: labels(data[0])
        });
      },
      onMouseOut: function onMouseOut() {
        return setTooltipProps({
          active: false
        });
      }
    },
    x: x,
    y: y - barWidth,
    width: featuredMeasure,
    height: barWidth,
    style: style.data
  }), _react.default.createElement(_victory.Rect, {
    x: x + comparativeMeasure,
    y: y - barWidth,
    width: barWidth,
    height: barWidth,
    style: reference.style && reference.style.data
  }), tooltip);
}

BulletBar.propTypes = {
  data: _propTypes2.default.data.isRequired,
  barWidth: _propTypes.default.number,
  labels: _propTypes.default.func.isRequired,
  reference: _propTypes2.default.singleRefrence,
  style: _propTypes.default.shape({
    data: _propTypes.default.shape({}),
    labels: _propTypes.default.shape({})
  }),
  theme: _propTypes2.default.theme,
  total: _propTypes.default.number.isRequired,
  width: _propTypes.default.number,
  x: _propTypes.default.number,
  y: _propTypes.default.number
};
BulletBar.defaultProps = {
  barWidth: undefined,
  reference: undefined,
  style: undefined,
  theme: undefined,
  width: undefined,
  x: undefined,
  y: undefined
};
var _default = BulletBar;
exports.default = _default;