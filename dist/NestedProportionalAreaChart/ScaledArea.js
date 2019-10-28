// CHARTS
// -------

/**
 * Chart size (desktop).
 */
export var DESKTOP_HEIGHT = 270;
export var DESKTOP_WIDTH = 650;
/**
 * Chart size (mobile).
 */

export var MOBILE_HEIGHT = 386;
export var MOBILE_WIDTH = 226;

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

export function scaleDesktopDimensions(height, width) {
  return scaleDimensions({
    height: DESKTOP_HEIGHT,
    width: DESKTOP_WIDTH
  }, {
    height: height,
    width: width
  });
}
export function scaleMobileDimensions(height, width) {
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

export var dataLabelsStyle = function dataLabelsStyle(index, colorScale, style) {
  return Object.assign({
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

export var referenceDataStyle = function referenceDataStyle(reference) {
  var referenceStyle = reference.style;
  return Object.assign({
    fontWeight: 'bold'
  }, // Since data has gradient fill style, lets use labels style
  referenceStyle && referenceStyle.labels || {});
};
/**
 * Style for reference data label.
 */

export var referenceLabelsStyle = function referenceLabelsStyle(reference) {
  var referenceStyle = reference.style;
  return referenceStyle && referenceStyle.labels;
};