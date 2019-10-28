function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { VictoryLabel } from 'victory';
var canvas = document.createElement('canvas');

var getFont = function getFont() {
  var style = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  var font = style.font,
      fontFamily = style.fontFamily,
      fontSize = style.fontSize;

  if (font) {
    return font;
  } // font requires at least family and size: https://developer.mozilla.org/en-US/docs/Web/CSS/font#Syntax


  if (fontFamily && fontSize) {
    var unit = typeof fontSize === 'number' ? 'px' : '';
    return "".concat(fontSize).concat(unit, " ").concat(fontFamily);
  }

  return undefined;
};
/**
 * While VictoryLabel can handle array of strings, it can not handle wrapping
 * for a long string. We need this component to help breakdown long strings
 * but yet, reuse everything VictoryLabel offers: styling, etc.
 *
 * @param {*} param0 .
 */


function Label(_ref) {
  var originalText = _ref.text,
      width = _ref.width,
      style = _ref.style,
      props = _objectWithoutProperties(_ref, ["text", "width", "style"]);

  var _useState = useState(originalText),
      _useState2 = _slicedToArray(_useState, 2),
      text = _useState2[0],
      setText = _useState2[1];

  useEffect(function () {
    var wrap = function wrap(textToWrap) {
      var words = textToWrap.split(/\s+/).reverse();
      var textLines = [];
      var word = words.pop();
      var line = [];
      var font = getFont(style);

      if (font) {
        Label.canvasContext.font = font;
      }

      while (word) {
        line.push(word);
        var textContent = line.join(' ');

        var _Label$canvasContext$ = Label.canvasContext.measureText(textContent),
            measuredWidth = _Label$canvasContext$.width;

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

      return textLines.join('\n');
    };

    if (originalText && width) {
      // Preserve any `\n` in original text string (if any)
      var textToWrap = Array.isArray(originalText) ? originalText : originalText.split('\n');
      setText(textToWrap.map(wrap).join('\n'));
    }
  }, [originalText, style, width]);
  return React.createElement(VictoryLabel, _extends({
    style: style,
    text: text
  }, props));
} // Lets reuse canvas context.


Label.canvasContext = canvas.getContext('2d');
Label.propTypes = {
  style: PropTypes.shape({}),
  text: PropTypes.string,
  width: PropTypes.number
};
Label.defaultProps = {
  style: undefined,
  text: undefined,
  width: undefined
};
export default Label;