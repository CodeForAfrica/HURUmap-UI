function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

import React from 'react';
import PropTypes from 'prop-types';
import withVictoryTheme from '../styles/withVictoryTheme';
import Label from '../Label';

function PieLabel(_ref) {
  var _ref$colorScale = _ref.colorScale,
      colorScale = _ref$colorScale === void 0 ? [] : _ref$colorScale,
      _ref$datum = _ref.datum,
      datum = _ref$datum === void 0 ? {
    _x: 1
  } : _ref$datum,
      originalStyle = _ref.style,
      props = _objectWithoutProperties(_ref, ["colorScale", "datum", "style"]);

  var style = Array.isArray(colorScale) ? Object.assign({}, {
    // eslint-disable-next-line no-underscore-dangle
    fill: colorScale[(datum._x - 1) % colorScale.length]
  }, originalStyle) : originalStyle;
  return React.createElement(Label, _extends({
    style: style
  }, props));
}

PieLabel.propTypes = {
  colorScale: PropTypes.arrayOf(PropTypes.shape({})),
  // TODO(kilemensi): Seems like datum has _x variable that tracks the
  //                  data index (but it starts from 1).
  datum: PropTypes.shape({
    _x: PropTypes.number
  }),
  style: PropTypes.shape({})
};
PieLabel.defaultProps = {
  colorScale: undefined,
  datum: undefined,
  style: undefined
};
export default withVictoryTheme(PieLabel);