function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

import React from 'react';
import PropTypes from 'prop-types';
import { VictoryLabel } from 'victory';
import { dataLabelsStyle, referenceDataStyle, referenceLabelsStyle, MOBILE_HEIGHT } from './ScaledArea';
import withVictoryTheme from '../styles/withVictoryTheme';
/**
 *
 */

function VerticalLegend(_ref) {
  var formatNumberForLabel = _ref.formatNumberForLabel,
      colorScale = _ref.colorScale,
      data = _ref.data,
      reference = _ref.reference,
      style = _ref.style;

  // For starters, lets assume each data label has 36px height,
  // reference label has 48 px, and there is 10px between labels
  // and charts
  // i) Data values are drawn at the top above the figure i.e. from 100px,
  // ---------------------------------------------------------------------
  var _reference$data = _slicedToArray(reference.data, 1),
      referenceData = _reference$data[0];

  var x = 0;
  return React.createElement(React.Fragment, null, data.map(function (d, i) {
    return React.createElement(VictoryLabel, {
      capHeight: 0,
      lineHeight: 0,
      x: x,
      dx: 0,
      y: 90 // 100 - 10
      ,
      text: formatNumberForLabel(data[i].x),
      style: dataLabelsStyle(i, colorScale, style),
      dy: -i * 36
    });
  }), React.createElement(VictoryLabel, {
    capHeight: 0,
    lineHeight: 0,
    x: x,
    y: MOBILE_HEIGHT - 25,
    text: formatNumberForLabel(referenceData.x),
    style: referenceDataStyle(reference)
  }), referenceData.label && React.createElement(VictoryLabel, {
    capHeight: 0,
    lineHeight: 0,
    x: x,
    y: MOBILE_HEIGHT - 5 // Leave space at bottom for letters like 'y'
    ,
    text: referenceData.label,
    style: referenceLabelsStyle(reference)
  }));
}

VerticalLegend.propTypes = {
  formatNumberForLabel: PropTypes.func,
  colorScale: PropTypes.oneOfType([PropTypes.string, PropTypes.arrayOf(PropTypes.shape({
    x: PropTypes.oneOfType([PropTypes.number, PropTypes.string])
  }))]),
  data: PropTypes.arrayOf(PropTypes.shape({
    x: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    label: PropTypes.oneOfType([PropTypes.number, PropTypes.string])
  })),
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
VerticalLegend.defaultProps = {
  formatNumberForLabel: function formatNumberForLabel(x) {
    return x;
  },
  colorScale: undefined,
  data: undefined,
  reference: undefined,
  style: undefined
};
export default withVictoryTheme(VerticalLegend);