function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

import React from 'react';
import PropTypes from 'prop-types';
import { VictoryTooltip } from 'victory';
import PieLabel from './PieLabel';
/**
 * VictoryLegend only uses `name` for displaying the key. This component
 * adds label recognition to legend via tooltip.
 *
 * @param {*} props .
 */
// while we need `width` for the label, we don't need it for tooltip

function LegendLabel(_ref) {
  var width = _ref.width,
      props = _objectWithoutProperties(_ref, ["width"]);

  var colorScale = props.colorScale,
      data = props.data,
      datum = props.datum,
      index = props.index;
  return React.createElement("g", null, React.createElement(PieLabel, _extends({
    width: width
  }, props)), React.createElement(VictoryTooltip, _extends({}, props, {
    datum: Object.assign({
      _x: index + 1
    }, datum),
    text: data[index].label,
    labelComponent: React.createElement(PieLabel, {
      colorScale: colorScale
    })
  })));
}

LegendLabel.defaultEvents = VictoryTooltip.defaultEvents;
LegendLabel.propTypes = {
  colorScale: PropTypes.arrayOf(PropTypes.shape({})),
  data: PropTypes.arrayOf(PropTypes.shape({
    label: PropTypes.string
  })),
  datum: PropTypes.arrayOf(PropTypes.shape({})),
  index: PropTypes.number,
  width: PropTypes.number
};
LegendLabel.defaultProps = {
  data: undefined,
  colorScale: undefined,
  datum: undefined,
  index: undefined,
  width: undefined
};
export default LegendLabel;