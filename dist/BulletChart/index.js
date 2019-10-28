import React from 'react';
import PropTypes from 'prop-types';
import { toReferenceProps } from '../ReferableChart';
import withVictoryTheme from '../styles/withVictoryTheme';
import BulletBar from './BulletBar';
import CustomContainer from '../CustomContainer';

var toOffset = function toOffset(prop, _ref) {
  var offset = _ref.offset;

  if (prop) {
    if (typeof prop === 'number') {
      return {
        x: prop,
        y: prop
      };
    }

    return prop;
  }

  if (typeof offset === 'number') {
    return {
      x: offset,
      y: offset
    };
  }

  return offset;
};
/**
 * By default, Bullet chart assumes data is a percentage **if** only one value
 * provided and its less than 100. Otherwise, it will assume data provided is
 * half i.e. convert `[data]`  to `[data, data]`
 */


function BulletChart(_ref2) {
  var barWidth = _ref2.barWidth,
      data = _ref2.data,
      height = _ref2.height,
      labels = _ref2.labels,
      offset = _ref2.offset,
      ref = _ref2.reference,
      theme = _ref2.theme,
      total = _ref2.total,
      width = _ref2.width;
  var chart = theme.bullet,
      mobileBreakpoint = theme.breakpoints.sm;

  if (!data || !chart) {
    return null;
  }

  var computedBarWidth = barWidth || chart.barWidth;
  var computedData = Array.isArray(data[0]) ? data.slice(0, 2) : [data];
  var computedHeight = height || chart.height;
  var computedOffset = toOffset(offset, chart);
  var computedStyle = Object.assign({}, chart.style);
  var computedWidth = width || chart.width;
  var isMobile = computedWidth < mobileBreakpoint;
  var isDirectionColumn = isMobile || computedData.length < 2;
  var reference = Object.assign({}, {
    style: chart.reference
  }, toReferenceProps(ref));
  return React.createElement(CustomContainer, {
    width: width,
    height: height
  }, computedData.reverse().map(function (d, i) {
    return React.createElement("g", null, React.createElement(BulletBar, {
      barWidth: computedBarWidth,
      data: d,
      labels: labels || function () {
        return '';
      },
      reference: reference,
      style: Object.assign({}, computedStyle, {
        data: {
          fill: chart.colorScale[i % chart.colorScale.length]
        }
      }),
      total: total,
      width: isDirectionColumn ? computedWidth : (computedWidth - computedOffset.x) / 2,
      x: isDirectionColumn ? 0 : (i * computedWidth + computedOffset.x) / 2,
      y: isDirectionColumn ? computedHeight - i * computedOffset.y : computedHeight
    }));
  }));
}

BulletChart.propTypes = {
  data: PropTypes.arrayOf(PropTypes.shape({})),
  barWidth: PropTypes.number,
  height: PropTypes.number,
  labels: PropTypes.func,
  offset: PropTypes.oneOfType([PropTypes.number, PropTypes.shape({})]),
  reference: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.shape({})), PropTypes.shape({})]),
  theme: PropTypes.shape({
    bullet: PropTypes.shape({}),
    breakpoints: PropTypes.shape({
      sm: PropTypes.number
    })
  }),
  total: PropTypes.number.isRequired,
  width: PropTypes.number
};
BulletChart.defaultProps = {
  data: undefined,
  barWidth: undefined,
  height: undefined,
  labels: undefined,
  offset: undefined,
  reference: undefined,
  theme: undefined,
  width: undefined
};
export default withVictoryTheme(BulletChart);