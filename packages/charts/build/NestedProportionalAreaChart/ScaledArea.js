"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.scaleDesktopDimensions = scaleDesktopDimensions;
exports.scaleMobileDimensions = scaleMobileDimensions;
exports.referenceLabelsStyle = exports.referenceDataStyle = exports.dataLabelsStyle = exports.MOBILE_WIDTH = exports.MOBILE_HEIGHT = exports.DESKTOP_WIDTH = exports.DESKTOP_HEIGHT = void 0;

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

// CHARTS
// -------

/**
 * Chart size (desktop).
 */
var DESKTOP_HEIGHT = 270;
exports.DESKTOP_HEIGHT = DESKTOP_HEIGHT;
var DESKTOP_WIDTH = 650;
/**
 * Chart size (mobile).
 */

exports.DESKTOP_WIDTH = DESKTOP_WIDTH;
var MOBILE_HEIGHT = 386;
exports.MOBILE_HEIGHT = MOBILE_HEIGHT;
var MOBILE_WIDTH = 226;
exports.MOBILE_WIDTH = MOBILE_WIDTH;

var scaleDimensions = function scaleDimensions(from, to) {
  var fH = from.height,
      fW = from.width;
  var tH = to.height,
      tW = to.width; // Scale from fH to tW first

  var height = fH * tW / fW;
  var width = tW;

  if (height > tH) {
    // Scale from height to tH
    width = width * tH / height;
  }

  return width / fW;
};

function scaleDesktopDimensions(height, width) {
  return scaleDimensions({
    height: DESKTOP_HEIGHT,
    width: DESKTOP_WIDTH
  }, {
    height: height,
    width: width
  });
}

function scaleMobileDimensions(height, width) {
  return scaleDimensions({
    height: MOBILE_HEIGHT,
    width: MOBILE_WIDTH
  }, {
    height: height,
    width: width
  });
} // LEGENDS
// -------

/**
 * Style for data points
 * @param index number.
 * @param colorScale string | string[].
 * @param style object.
 */


var dataLabelsStyle = function dataLabelsStyle(index, colorScale, style) {
  return _objectSpread({
    fontSize: 36,
    fontWeight: 'bold'
  }, style && style.data, {
    fill: colorScale[index % colorScale.length]
  });
};
/**
 * Style for reference data point.
 * @param reference .
 */


exports.dataLabelsStyle = dataLabelsStyle;

var referenceDataStyle = function referenceDataStyle(reference) {
  var referenceStyle = reference.style;
  return _objectSpread({
    fontWeight: 'bold'
  }, referenceStyle && referenceStyle.labels || {});
};
/**
 * Style for reference data label.
 */


exports.referenceDataStyle = referenceDataStyle;

var referenceLabelsStyle = function referenceLabelsStyle(reference) {
  var referenceStyle = reference.style;
  return referenceStyle && referenceStyle.labels;
};

exports.referenceLabelsStyle = referenceLabelsStyle;