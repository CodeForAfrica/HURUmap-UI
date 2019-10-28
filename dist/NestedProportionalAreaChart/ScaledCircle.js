function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

import React from 'react';
import PropTypes from 'prop-types';
import { DESKTOP_HEIGHT, DESKTOP_WIDTH, MOBILE_HEIGHT, MOBILE_WIDTH } from './ScaledArea';
import HorizontalLegend from './HorizontalLegend';
import PieChart from '../PieChart';
import VerticalLegend from './VerticalLegend';
/**
 *
 */

function ScaledCircle(_ref) {
  var formatNumberForLabel = _ref.formatNumberForLabel,
      _ref$colorScale = _ref.colorScale,
      colorScale = _ref$colorScale === void 0 ? [] : _ref$colorScale,
      data = _ref.data,
      groupSpacing = _ref.groupSpacing,
      mobile = _ref.mobile,
      reference = _ref.reference,
      style = _ref.style,
      props = _objectWithoutProperties(_ref, ["formatNumberForLabel", "colorScale", "data", "groupSpacing", "mobile", "reference", "style"]);

  var cx = mobile ? MOBILE_WIDTH / 2 : DESKTOP_WIDTH / 2;
  var cy = mobile ? 100 + MOBILE_WIDTH / 2 : DESKTOP_HEIGHT / 2;
  var height = mobile ? MOBILE_HEIGHT : DESKTOP_HEIGHT;
  var size = mobile ? MOBILE_WIDTH / 2 : (DESKTOP_HEIGHT - groupSpacing) / 2;
  var width = mobile ? MOBILE_WIDTH : DESKTOP_WIDTH;

  var _reference$data = _slicedToArray(reference.data, 1),
      referenceData = _reference$data[0],
      referenceStyle = reference.style;

  var radii = data.map(function (d) {
    return d.x !== referenceData.x ? Math.sqrt(d.x) * size / Math.sqrt(referenceData.x) : size;
  }); // When we're doing comparison, the background for both half circles
  // should be the reference data.

  var backgroundData = radii.length > 1 ? [[size], [size]] : [size];
  return React.createElement(React.Fragment, null, React.createElement(PieChart, _extends({
    data: backgroundData,
    donut: false,
    height: height,
    origin: {
      x: cx,
      y: cy
    },
    radius: size,
    standalone: false,
    width: width
  }, props, {
    style: referenceStyle
  })), React.createElement(PieChart, _extends({
    colorScale: colorScale,
    height: height,
    data: radii.map(function (v) {
      return [v];
    }),
    donut: false,
    origin: {
      x: cx,
      y: cy
    },
    radii: radii,
    standalone: false,
    width: width
  }, props)), mobile ? React.createElement(VerticalLegend, {
    data: data,
    colorScale: colorScale,
    reference: reference,
    style: style,
    formatNumberForLabel: formatNumberForLabel
  }) : React.createElement(HorizontalLegend, {
    data: data,
    radii: radii,
    colorScale: colorScale,
    style: style,
    reference: reference,
    cx: cx,
    cy: cy,
    formatNumberForLabel: formatNumberForLabel
  }));
}

ScaledCircle.propTypes = {
  formatNumberForLabel: PropTypes.func,
  colorScale: PropTypes.oneOfType([PropTypes.string, PropTypes.arrayOf(PropTypes.shape({
    x: PropTypes.oneOfType([PropTypes.number, PropTypes.string])
  }))]),
  data: PropTypes.arrayOf(PropTypes.shape({
    x: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    label: PropTypes.oneOfType([PropTypes.number, PropTypes.string])
  })),
  groupSpacing: PropTypes.number.isRequired,
  mobile: PropTypes.bool,
  reference: PropTypes.shape({
    data: PropTypes.arrayOf(PropTypes.shape({})),
    style: PropTypes.arrayOf(PropTypes.shape({}))
  }),
  style: PropTypes.shape({
    labels: PropTypes.shape({})
  })
};
ScaledCircle.defaultProps = {
  formatNumberForLabel: function formatNumberForLabel(x) {
    return x;
  },
  colorScale: undefined,
  data: undefined,
  mobile: false,
  reference: undefined,
  style: undefined
};
export default ScaledCircle;