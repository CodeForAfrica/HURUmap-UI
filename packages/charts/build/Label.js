"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _victory = require("victory");

var _propTypes2 = _interopRequireDefault(require("../propTypes"));

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

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

var getFont = function getFont() {
  var style = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

  var _ref = Array.isArray(style) ? style[0] : style,
      font = _ref.font,
      fontFamily = _ref.fontFamily,
      fontSize = _ref.fontSize;

  if (font) {
    return font;
  } // font requires at least family and size: https://developer.mozilla.org/en-US/docs/Web/CSS/font#Syntax


  if (fontFamily && fontSize) {
    var unit = typeof fontSize === 'number' ? 'px' : '';
    return "".concat(fontSize).concat(unit, " ").concat(fontFamily);
  }

  return undefined;
};

var wrapText = function wrapText(text, width, canvas, style) {
  var words = text.split(/\s+/).reverse();
  var textLines = [];
  var word = words.pop();
  var line = [];
  var font = getFont(style);
  var context = canvas.getContext('2d');

  if (font) {
    context.font = font;
  }

  while (word) {
    line.push(word);
    var textContent = line.join(' ');

    var _context$measureText = context.measureText(textContent),
        measuredWidth = _context$measureText.width;

    if (measuredWidth > width) {
      line.pop();

      if (line.length > 0) {
        textLines.push(line.join(' '));
        line = [word];
      } else {
        // single, long word
        textLines.push(word);
      }
    }

    word = words.pop();
  } // Any word(s) whose length was still < width


  if (line.length > 0) {
    textLines.push(line.join(' '));
  }

  return textLines;
};
/**
 * While VictoryLabel can handle array of strings, it can not handle wrapping
 * of a long string or color text based on `colorScale`.
 *
 * @param {*} param0 .
 */


function Label(_ref2) {
  var colorScale = _ref2.colorScale,
      datum = _ref2.datum,
      highlightIndex = _ref2.highlightIndex,
      highlightStyle = _ref2.highlightStyle,
      originalStyle = _ref2.style,
      originalText = _ref2.text,
      width = _ref2.width,
      props = _objectWithoutProperties(_ref2, ["colorScale", "datum", "highlightIndex", "highlightStyle", "style", "text", "width"]);

  var _useState = (0, _react.useState)(originalStyle),
      _useState2 = _slicedToArray(_useState, 2),
      style = _useState2[0],
      setStyle = _useState2[1];

  var _useState3 = (0, _react.useState)(null),
      _useState4 = _slicedToArray(_useState3, 2),
      text = _useState4[0],
      setText = _useState4[1];

  var canvas = (0, _react.useMemo)(function () {
    return document.createElement('canvas');
  }, []);
  var wrappedText = (0, _react.useMemo)(function () {
    var wrapped = [];

    if (originalText) {
      var textToWrap = Array.isArray(originalText) ? originalText : originalText.split('\n');

      if (width) {
        wrapped = textToWrap.map(function (tW) {
          return wrapText(tW, width, canvas, originalStyle);
        });
      } else {
        wrapped = textToWrap.map(function (tW) {
          return [tW];
        });
      }
    }

    return wrapped;
  }, [canvas, originalText, originalStyle, width]);
  (0, _react.useEffect)(function () {
    if (wrappedText && wrappedText.length > 1) {
      if (highlightIndex && highlightStyle) {
        var wrappedTextStyle = [];
        wrappedText.forEach(function (wT, i) {
          var lineStyle = i === highlightIndex ? _objectSpread({}, highlightStyle, {}, originalStyle) : _objectSpread({}, originalStyle);
          wrappedTextStyle = wrappedTextStyle.concat(Array(wT.length).fill(lineStyle));
        });
        setStyle(wrappedTextStyle);
      }
    }
  }, [highlightIndex, highlightStyle, originalStyle, wrappedText]);
  (0, _react.useEffect)(function () {
    if (wrappedText && wrappedText.length) {
      setText(wrappedText.map(function (wT) {
        return wT.join('\n');
      }).join('\n'));
    }
  }, [wrappedText]);
  return _react.default.createElement(_victory.VictoryLabel, _extends({
    style: style,
    text: text
  }, props));
}

Label.propTypes = {
  colorScale: _propTypes2.default.colorScale,
  datum: _propTypes.default.shape({
    _x: _propTypes.default.number
  }),
  highlightIndex: _propTypes.default.number,
  highlightStyle: _propTypes.default.shape({}),
  style: _propTypes.default.oneOfType([_propTypes.default.arrayOf(_propTypes.default.shape({})), _propTypes.default.shape({})]),
  text: _propTypes.default.string,
  width: _propTypes.default.number
};
Label.defaultProps = {
  colorScale: undefined,
  datum: undefined,
  highlightIndex: undefined,
  highlightStyle: undefined,
  style: undefined,
  text: undefined,
  width: undefined
};
var _default = Label;
exports.default = _default;