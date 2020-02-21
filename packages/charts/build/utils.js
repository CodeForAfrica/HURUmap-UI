"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getLegendProps = getLegendProps;
exports.labels = void 0;

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

function getLegendProps(_ref, initialLegendProps) {
  var height = _ref.height,
      width = _ref.width;
  var data = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : undefined;
  var originalPadding = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {};

  var align = initialLegendProps.align,
      legendDataProp = initialLegendProps.data,
      size = initialLegendProps.size,
      otherLegendProps = _objectWithoutProperties(initialLegendProps, ["align", "data", "size"]); // Show legend if a legend prop is provided or data contains objects with
  // `name` attribute.
  // https://formidable.com/open-source/victory/docs/victory-legend/#data


  var legendData = legendDataProp || data && data[0] && data[0].name && data;
  var chartHeight = height;
  var chartWidth = width;
  var legendHeight = height;
  var legendWidth = width;

  var padding = _objectSpread({}, originalPadding);

  padding.top = padding.top || 0;
  padding.right = padding.right || 0;
  padding.bottom = padding.bottom || 0;
  padding.left = padding.left || 0;
  var legendX = padding.left;
  var legendY = padding.top;

  if (legendData && size) {
    switch (align) {
      case 'left':
      case 'right':
        // fall-through
        chartWidth -= size;
        legendWidth = size; // center the chart vertically

        if (chartHeight > chartWidth) {
          var verticalSpacing = chartHeight - chartWidth;
          padding.top += verticalSpacing / 2;
          legendY += verticalSpacing / 2;
        }

        if (align === 'left') {
          padding.left += size;
        } else {
          legendX = chartWidth;
          padding.right += size;
        }

        break;

      case 'top':
      case 'bottom': // fall-through

      default:
        // fall-through
        chartHeight -= size;
        legendHeight = size;

        if (align === 'top') {
          padding.top += size;
        } else {
          legendY = chartHeight;
          padding.bottom += size;
        }

        break;
    }
  }

  var legend = legendData && _objectSpread({
    data: legendData,
    height: legendHeight,
    orientation: 'horizontal',
    width: legendWidth,
    x: legendX,
    y: legendY
  }, otherLegendProps);

  return {
    height: chartHeight,
    legend: legend,
    padding: padding,
    width: chartWidth
  };
}
/**
 * Default `labels` function for HURUmap UI
 */


var labels = function labels(_ref2) {
  var x = _ref2.x,
      y = _ref2.y,
      _ref2$unit = _ref2.unit,
      unit = _ref2$unit === void 0 ? '' : _ref2$unit;
  var formatedX = x ? "".concat(x, ": ") : '';
  return "".concat(formatedX).concat(y).concat(unit);
};

exports.labels = labels;