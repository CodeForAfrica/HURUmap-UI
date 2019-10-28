function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

import React from 'react';
import PropTypes from 'prop-types';
import { Rect, VictoryLabel } from 'victory';

function BulletBar(_ref) {
  var barWidth = _ref.barWidth,
      data = _ref.data,
      labels = _ref.labels,
      reference = _ref.reference,
      _ref$style = _ref.style,
      style = _ref$style === void 0 ? {} : _ref$style,
      total = _ref.total,
      width = _ref.width,
      x = _ref.x,
      y = _ref.y;
  var featuredMeasure = width * data[0].x / total;

  var _data = _slicedToArray(data, 2),
      qualitativeMeasure = _data[1];

  var comparativeMeasure = width * reference.data[0].x / total;
  return React.createElement(React.Fragment, null, qualitativeMeasure && React.createElement(VictoryLabel, {
    capHeight: 0,
    lineHeight: 0,
    textAnchor: "end",
    x: x + width,
    y: y - 2 * barWidth,
    text: labels(qualitativeMeasure),
    style: style.labels
  }), React.createElement(Rect, {
    x: x,
    y: y - barWidth,
    width: width,
    height: barWidth,
    style: style.labels
  }), React.createElement(VictoryLabel, {
    capHeight: 0,
    lineHeight: 0,
    x: x,
    y: y - 2 * barWidth,
    text: labels(data[0]),
    style: style.data
  }), React.createElement(Rect, {
    x: x,
    y: y - barWidth,
    width: featuredMeasure,
    height: barWidth,
    style: style.data
  }), React.createElement(Rect, {
    x: x + comparativeMeasure,
    y: y - barWidth,
    width: barWidth,
    height: barWidth,
    style: reference.style && reference.style.data
  }));
}

BulletBar.propTypes = {
  data: PropTypes.arrayOf(PropTypes.shape({
    x: PropTypes.number
  })).isRequired,
  barWidth: PropTypes.number,
  labels: PropTypes.func.isRequired,
  reference: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.shape({
    data: PropTypes.shape({})
  })), PropTypes.shape({
    data: PropTypes.shape({})
  })]),
  style: PropTypes.shape({
    data: PropTypes.shape({}),
    labels: PropTypes.shape({})
  }),
  theme: PropTypes.shape({
    group: PropTypes.shape({})
  }),
  total: PropTypes.number.isRequired,
  width: PropTypes.number,
  x: PropTypes.number,
  y: PropTypes.number
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
export default BulletBar;