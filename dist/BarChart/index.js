function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

import React from 'react';
import PropTypes from 'prop-types';
import { VictoryBar, VictoryGroup, VictoryAxis } from 'victory';
import withVictoryTheme from '../styles/withVictoryTheme';
import Chart, { toChartAxisProps } from '../Chart';
import WrapLabel from '../WrapLabel';
import BarLabel from './BarLabel';

function BarChart(_ref) {
  var barWidth = _ref.barWidth,
      propLabelWidth = _ref.labelWidth,
      d = _ref.data,
      domain = _ref.domain,
      domainPadding = _ref.domainPadding,
      height = _ref.height,
      horizontal = _ref.horizontal,
      offset = _ref.offset,
      parts = _ref.parts,
      responsive = _ref.responsive,
      theme = _ref.theme,
      width = _ref.width,
      props = _objectWithoutProperties(_ref, ["barWidth", "labelWidth", "data", "domain", "domainPadding", "height", "horizontal", "offset", "parts", "responsive", "theme", "width"]);

  var themeLabelWidth = theme.axis.labelWidth,
      chart = theme.bar,
      groupChart = theme.group;

  if (!d || !groupChart) {
    return null;
  }

  var groupData = Array.isArray(d[0]) ? d : [d];
  var labelWidth = propLabelWidth || themeLabelWidth;

  if (groupData.length > 1 && !propLabelWidth) {
    var barSpacing = offset || barWidth;

    if (barSpacing) {
      labelWidth = barSpacing * groupData.length;
    }
  }

  var axisProps = parts && toChartAxisProps(parts.axis) || {};

  var _ref2 = axisProps.independent || {},
      propTickFormat = _ref2.tickFormat;

  var tickFormat = propTickFormat || function (tick) {
    var tickLabel = '';
    groupData.find(function (dE) {
      return dE.find(function (gE) {
        if (gE.x === tick) {
          tickLabel = gE.x.toString();
          return true;
        }

        return false;
      });
    });
    return tickLabel;
  };

  var chartProps = Object.assign({
    domain: domain,
    domainPadding: domainPadding,
    height: height || chart.height,
    horizontal: horizontal,
    responsive: responsive,
    theme: theme,
    width: width || chart.width
  }, parts && parts.parent);
  var groupProps = parts && parts.group ? [].concat(parts.group) : [];
  var tooltipProps = parts && parts.tooltip || {
    style: {}
  };
  var colorScale = groupChart.colorScale;
  var numberFormatter = new Intl.NumberFormat('en-GB');
  return React.createElement(Chart, chartProps, React.createElement(VictoryGroup, _extends({}, groupProps, {
    offset: offset
  }), groupData.map(function (data, i) {
    return React.createElement(VictoryBar, _extends({
      name: "bar",
      barWidth: barWidth,
      data: data,
      key: data.toString(),
      labels: function labels(datum) {
        return typeof datum.y !== 'number' ? 'N/A' : numberFormatter.format(datum.y);
      },
      labelComponent: React.createElement(BarLabel, {
        tooltipProps: _objectSpread({}, tooltipProps, {
          data: data,
          style: Object.assign({}, tooltipProps.style, {
            fill: colorScale[i]
          })
        })
      })
    }, props));
  })), React.createElement(VictoryAxis, _extends({
    tickFormat: tickFormat,
    tickLabelComponent: React.createElement(WrapLabel, {
      width: labelWidth
    })
  }, axisProps.independent)), React.createElement(VictoryAxis, _extends({
    dependentAxis: true
  }, axisProps.dependent)));
}

BarChart.propTypes = {
  data: PropTypes.arrayOf(PropTypes.shape({
    x: PropTypes.oneOfType([PropTypes.number, PropTypes.string])
  })),
  barWidth: PropTypes.number,
  labelWidth: PropTypes.number,
  domain: PropTypes.oneOfType([PropTypes.number, PropTypes.shape({})]),
  domainPadding: PropTypes.oneOfType([PropTypes.number, PropTypes.shape({})]),
  height: PropTypes.number,
  horizontal: PropTypes.bool,
  offset: PropTypes.number,
  parts: PropTypes.shape({
    axis: PropTypes.shape({}),
    group: PropTypes.shape({}),
    parent: PropTypes.shape({}),
    tooltip: PropTypes.shape({})
  }),
  responsive: PropTypes.bool,
  theme: PropTypes.shape({
    axis: PropTypes.shape({
      labelWidth: PropTypes.number
    }),
    bar: PropTypes.shape({}),
    group: PropTypes.shape({})
  }),
  width: PropTypes.number
};
BarChart.defaultProps = {
  barWidth: undefined,
  labelWidth: undefined,
  data: undefined,
  domain: undefined,
  domainPadding: undefined,
  height: undefined,
  horizontal: undefined,
  offset: undefined,
  parts: undefined,
  responsive: true,
  theme: undefined,
  width: undefined
};
export default withVictoryTheme(BarChart);