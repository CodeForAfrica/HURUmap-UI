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

var _ScaledArea = require("./ScaledArea");

var _VerticalLegend = _interopRequireDefault(require("./VerticalLegend"));

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

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

/**
 *
 */
function ScaledSquare(_ref) {
  var formatNumberForLabel = _ref.formatNumberForLabel,
      _ref$colorScale = _ref.colorScale,
      colorScale = _ref$colorScale === void 0 ? [] : _ref$colorScale,
      data = _ref.data,
      reference = _ref.reference,
      style = _ref.style,
      theme = _ref.theme,
      props = _objectWithoutProperties(_ref, ["formatNumberForLabel", "colorScale", "data", "reference", "style", "theme"]);

  var size = _ScaledArea.MOBILE_WIDTH;
  var x = 0;
  var y = 100; // Chart starts 100px from top i.e. below labels

  var _reference$data = _slicedToArray(reference.data, 1),
      referenceData = _reference$data[0],
      referenceStyle = reference.style;

  var referenceText = referenceData && (0, _utils.labels)(referenceData);

  var _useState = (0, _react.useState)({}),
      _useState2 = _slicedToArray(_useState, 2),
      tooltipProps = _useState2[0],
      setTooltipProps = _useState2[1];

  var tooltip = _react.default.createElement(_victory.VictoryTooltip, _extends({
    theme: theme
  }, tooltipProps));

  var activateTooltip = function activateTooltip(evt, _ref2) {
    var dataProp = _ref2.data,
        otherProps = _objectWithoutProperties(_ref2, ["data"]);

    if (dataProp) {
      var dataText = (0, _utils.labels)(dataProp);
      var text = referenceText ? "".concat(dataText, "\n").concat(referenceText) : dataText;

      var _Selection$getSVGEven = _victory.Selection.getSVGEventCoordinates(evt),
          tipX = _Selection$getSVGEven.x,
          tipY = _Selection$getSVGEven.y;

      setTooltipProps(_objectSpread({
        active: true
      }, otherProps, {
        text: text,
        x: tipX,
        y: tipY
      }));
    }
  }; // NOTE: Nested square must be sorted to ensure they're all visible
  // but we need to remember original position to ensure right color is used.


  return _react.default.createElement(_react.default.Fragment, null, _react.default.createElement(_victory.Border, _extends({}, props, {
    key: referenceData.x,
    height: size,
    style: referenceStyle && referenceStyle.data,
    width: size,
    x: x,
    y: y
  })), data.map(function (v, i) {
    return {
      value: v,
      index: i
    };
  }).sort(function (a, b) {
    return b.value.y - a.value.y;
  }).map(function (d) {
    var scaledSide = d.value.y !== referenceData.y ? Math.sqrt(d.value.y) * size / Math.sqrt(referenceData.y) : size;
    return _react.default.createElement(_victory.Border, _extends({}, props, {
      events: {
        onMouseOver: function onMouseOver(evt) {
          return activateTooltip(evt, {
            data: d.value
          });
        },
        onMouseMove: function onMouseMove(evt) {
          return activateTooltip(evt, {
            data: d.value
          });
        },
        onMouseOut: function onMouseOut() {
          return setTooltipProps({
            active: false
          });
        }
      },
      key: scaledSide,
      height: scaledSide,
      style: {
        fill: colorScale[d.index % colorScale.length]
      },
      width: scaledSide,
      x: x,
      y: y
    }));
  }), _react.default.createElement(_VerticalLegend.default, {
    data: data,
    colorScale: colorScale,
    reference: reference,
    style: style,
    theme: theme,
    formatNumberForLabel: formatNumberForLabel
  }), tooltip);
}

ScaledSquare.propTypes = {
  formatNumberForLabel: _propTypes.default.func,
  colorScale: _propTypes2.default.colorScale,
  data: _propTypes2.default.data,
  reference: _propTypes2.default.reference,
  style: _propTypes.default.shape({
    labels: _propTypes.default.shape({})
  }),
  theme: _propTypes2.default.theme
};
ScaledSquare.defaultProps = {
  formatNumberForLabel: function formatNumberForLabel(x) {
    return x;
  },
  colorScale: undefined,
  data: undefined,
  reference: undefined,
  style: undefined,
  theme: undefined
};
var _default = ScaledSquare;
exports.default = _default;