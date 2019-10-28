function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

import React from 'react';
import PropTypes from 'prop-types';
import { VictoryLabel } from 'victory';
import withVictoryTheme from '../styles/withVictoryTheme';
import { dataLabelsStyle, referenceDataStyle, referenceLabelsStyle } from './ScaledArea';
/**
 *
 */

function HorizontalLegend(_ref) {
  var formatNumberForLabel = _ref.formatNumberForLabel,
      colorScale = _ref.colorScale,
      cx = _ref.cx,
      cy = _ref.cy,
      data = _ref.data,
      radii = _ref.radii,
      reference = _ref.reference,
      style = _ref.style;

  // From the designs:
  // i) Data value has 36px height and 130px width i.e. 190px from center
  // of reference circle, vertically centered with the circle,
  // ii) Data label has height of 20px, 10px below data value,
  // iii) Reference label has 48 px, aligned to the right of the charts
  // ----------------------------------------------------------------
  var _reference$data = _slicedToArray(reference.data, 1),
      referenceData = _reference$data[0];

  return React.createElement(React.Fragment, null, radii.map(function (r, i) {
    return React.createElement(React.Fragment, null, React.createElement("line", {
      // -1 => left; 1 => right
      x1: cx - (i < 1 ? 1 : -1) * 190,
      y1: cy // 5px padding between circle and line
      ,
      x2: cx - (i < 1 ? 1 : -1) * (r + 5),
      y2: cy,
      style: {
        stroke: colorScale[i % colorScale.length],
        strokeWidth: '2px'
      }
    }), React.createElement(VictoryLabel, {
      textAnchor: i === 0 ? 'end' : 'start',
      capHeight: 0,
      lineHeight: 0,
      x: cx - (i < 1 ? 1 : -1) * 200 // 190 + 10px padding
      ,
      dx: 0,
      y: cy,
      dy: 18 // 36 / 2 since we want data value vertical centered
      ,
      text: formatNumberForLabel(data[i].x),
      style: dataLabelsStyle(i, colorScale, style)
    }), data[i].label && React.createElement(VictoryLabel, {
      textAnchor: i === 0 ? 'end' : 'start',
      capHeight: 0,
      lineHeight: 0,
      x: cx - (i < 1 ? 1 : -1) * 200 // 190 + 10
      ,
      dx: 0,
      y: cy + 18 // 36 / 2 is the bottom half of data value
      // 10px top padding from data value + label has height of 20px
      ,
      dy: 10 + 20,
      style: style && style.labels,
      text: data[i].label
    }));
  }), React.createElement(VictoryLabel, {
    capHeight: 0,
    lineHeight: 0,
    x: cx + 200,
    y: 2 * cy - 24,
    text: formatNumberForLabel(referenceData.x),
    style: referenceDataStyle(reference)
  }), referenceData.label && React.createElement(VictoryLabel, {
    capHeight: 0,
    lineHeight: 0,
    x: cx + 200,
    y: 2 * cy,
    text: referenceData.label,
    style: referenceLabelsStyle(reference)
  }));
}

HorizontalLegend.propTypes = {
  formatNumberForLabel: PropTypes.func,
  colorScale: PropTypes.oneOfType([PropTypes.string, PropTypes.arrayOf(PropTypes.shape({
    x: PropTypes.oneOfType([PropTypes.number, PropTypes.string])
  }))]),
  data: PropTypes.arrayOf(PropTypes.shape({
    x: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    label: PropTypes.oneOfType([PropTypes.number, PropTypes.string])
  })),
  cx: PropTypes.number.isRequired,
  cy: PropTypes.number.isRequired,
  radii: PropTypes.arrayOf(PropTypes.number),
  reference: PropTypes.shape({
    data: PropTypes.arrayOf(PropTypes.shape({
      x: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
      label: PropTypes.oneOfType([PropTypes.number, PropTypes.string])
    }))
  }),
  style: PropTypes.shape({
    labels: PropTypes.shape({})
  })
};
HorizontalLegend.defaultProps = {
  formatNumberForLabel: function formatNumberForLabel(x) {
    return x;
  },
  // return unformatted number
  colorScale: undefined,
  data: undefined,
  radii: undefined,
  reference: undefined,
  style: undefined
};
export default withVictoryTheme(HorizontalLegend);