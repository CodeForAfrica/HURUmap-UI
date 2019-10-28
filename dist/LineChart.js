function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

import React from 'react';
import PropTypes from 'prop-types';
import { VictoryAxis, VictoryLine, VictoryGroup, VictoryScatter, VictoryVoronoiContainer, VictoryTooltip } from 'victory';
import withVictoryTheme from './styles/withVictoryTheme';
import Chart, { toChartAxisProps } from './Chart';
/**
 * HURUmap UI Line chart is made up of VictoryChart, VictoryVoronoiContainer,
 * VictoryGroup, VictoryLine, VictoryScatter and VictoryAxis.
 *
 * The props for all these parts/components can be set (if required) using
 * `parts` prop.
 *
 * @example
 * {
 *   parts: {
 *     axis: {
 *       axisLabel: {display: 'block'}
 *     }
 *   }
 * }
 */

function LineChart(_ref) {
  var data = _ref.data,
      parts = _ref.parts,
      theme = _ref.theme,
      props = _objectWithoutProperties(_ref, ["data", "parts", "theme"]);

  var groupChart = theme.group;

  if (!data || !groupChart) {
    return null;
  }

  var groupData = data.length > 1 && Array.isArray(data[0]) ? data : [data];
  var axisProps = parts && toChartAxisProps(parts.axis) || {};
  var chartProps = parts && parts.parent;
  var containerProps = parts && parts.container;
  var groupProps = parts && parts.group ? [].concat(parts.group) : [];
  var scatterProps = parts && parts.scatter ? [].concat(parts.scatter) : [];
  var tooltipProps = parts && parts.tooltip || {
    style: {}
  };
  var colorScale = groupChart.colorScale;
  return React.createElement(Chart, _extends({
    containerComponent: React.createElement(VictoryVoronoiContainer, containerProps),
    theme: theme
  }, chartProps), React.createElement(VictoryGroup, null, groupData.map(function (gd, i) {
    return React.createElement(VictoryGroup, _extends({
      labelComponent: React.createElement(VictoryTooltip, _extends({}, tooltipProps, {
        style: Object.assign({}, tooltipProps.style, {
          fill: colorScale[i]
        })
      }))
      /* groupProps can override the above props */

    }, groupProps[i % groupProps.length], {
      data: gd
    }), React.createElement(VictoryLine, props), React.createElement(VictoryScatter, scatterProps[i % scatterProps.length]));
  })), React.createElement(VictoryAxis, axisProps.independent), React.createElement(VictoryAxis, _extends({
    dependentAxis: true
  }, axisProps.dependent)));
}

LineChart.propTypes = {
  data: PropTypes.arrayOf(PropTypes.shape({
    x: PropTypes.oneOfType([PropTypes.number, PropTypes.string])
  })),
  parts: PropTypes.shape({
    axis: PropTypes.shape({}),
    container: PropTypes.shape({}),
    group: PropTypes.shape({}),
    parent: PropTypes.shape({}),
    scatter: PropTypes.shape({}),
    tooltip: PropTypes.shape({})
  }),
  theme: PropTypes.shape({
    group: PropTypes.shape({})
  })
};
LineChart.defaultProps = {
  data: undefined,
  parts: undefined,
  theme: undefined
};
export default withVictoryTheme(LineChart);