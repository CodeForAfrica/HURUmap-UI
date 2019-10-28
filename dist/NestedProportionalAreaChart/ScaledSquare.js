function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

import React from 'react';
import PropTypes from 'prop-types';
import { Rect } from 'victory';
import { MOBILE_WIDTH } from './ScaledArea';
import VerticalLegend from './VerticalLegend';
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
      props = _objectWithoutProperties(_ref, ["formatNumberForLabel", "colorScale", "data", "reference", "style"]);

  var size = MOBILE_WIDTH;
  var x = 0;
  var y = 100; // Chart starts 100px from top i.e. below labels

  var _reference$data = _slicedToArray(reference.data, 1),
      referenceData = _reference$data[0],
      referenceStyle = reference.style; // NOTE: Nested square must be sorted to ensure they're all visible
  // but we need to remember original position to ensure right color is used.


  return React.createElement(React.Fragment, null, React.createElement(Rect, _extends({}, props, {
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
    return b.value.x - a.value.x;
  }).map(function (d) {
    var scaledSide = d.value.x !== referenceData.x ? Math.sqrt(d.value.x) * size / Math.sqrt(referenceData.x) : size;
    return React.createElement(Rect, _extends({}, props, {
      key: scaledSide,
      height: scaledSide,
      style: {
        fill: colorScale[d.index % colorScale.length]
      },
      width: scaledSide,
      x: x,
      y: y
    }));
  }), React.createElement(VerticalLegend, {
    data: data,
    colorScale: colorScale,
    reference: reference,
    style: style,
    formatNumberForLabel: formatNumberForLabel
  }));
}

ScaledSquare.propTypes = {
  formatNumberForLabel: PropTypes.func,
  colorScale: PropTypes.oneOfType([PropTypes.string, PropTypes.arrayOf(PropTypes.shape({
    x: PropTypes.oneOfType([PropTypes.number, PropTypes.string])
  }))]),
  data: PropTypes.arrayOf(PropTypes.shape({
    x: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    label: PropTypes.oneOfType([PropTypes.number, PropTypes.string])
  })),
  reference: PropTypes.shape({
    data: PropTypes.arrayOf(PropTypes.shape({})),
    style: PropTypes.arrayOf(PropTypes.shape({}))
  }),
  style: PropTypes.shape({
    labels: PropTypes.shape({})
  })
};
ScaledSquare.defaultProps = {
  formatNumberForLabel: function formatNumberForLabel(x) {
    return x;
  },
  colorScale: undefined,
  data: undefined,
  reference: undefined,
  style: undefined
};
export default ScaledSquare;