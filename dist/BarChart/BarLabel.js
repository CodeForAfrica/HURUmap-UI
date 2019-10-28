function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

import React from 'react';
import PropTypes from 'prop-types';
import { VictoryLabel } from 'victory';
import Tooltip from '../Tooltip';

function BarLabel(_ref) {
  var datum = _ref.datum,
      text = _ref.text,
      _ref$tooltipProps = _ref.tooltipProps,
      data = _ref$tooltipProps.data,
      tooltipProps = _objectWithoutProperties(_ref$tooltipProps, ["data"]),
      x = _ref.x,
      y = _ref.y,
      props = _objectWithoutProperties(_ref, ["datum", "text", "tooltipProps", "x", "y"]);

  return React.createElement(React.Fragment, null, React.createElement(VictoryLabel, _extends({
    datum: datum,
    text: text
  }, props)), React.createElement(Tooltip, _extends({}, tooltipProps, {
    datum: datum,
    text: // eslint-disable-next-line no-underscore-dangle
    data && datum && data[datum._x - 1] && data[datum._x - 1].tooltip || text,
    x: x,
    y: y // eslint-disable-next-line react/prop-types, no-underscore-dangle

  }, props)));
}

BarLabel.propTypes = {
  datum: PropTypes.shape({
    _x: PropTypes.number
  }),
  text: PropTypes.oneOfType([PropTypes.string, PropTypes.func]),
  tooltipProps: PropTypes.shape({
    data: PropTypes.arrayOf(PropTypes.shape({
      tooltip: PropTypes.string
    }))
  }).isRequired,
  x: PropTypes.number,
  y: PropTypes.number
};
/**
 * Enable tooltip to show on mouse over.
 */

BarLabel.defaultEvents = Tooltip.defaultEvents;
BarLabel.defaultProps = {
  datum: undefined,
  text: undefined,
  x: undefined,
  y: undefined
};
export default BarLabel;