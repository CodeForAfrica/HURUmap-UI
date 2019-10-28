function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

import React from 'react';
import PropTypes from 'prop-types';
import { VictoryChart, VictoryContainer } from 'victory';
import withVictoryTheme from './styles/withVictoryTheme';
export var toChartAxisProps = function toChartAxisProps(prop) {
  if (!prop) {
    return {};
  }

  if (prop.independent || prop.dependent) {
    return prop;
  }

  return {
    independent: prop,
    dependent: prop
  };
};

function Chart(_ref) {
  var children = _ref.children,
      overflow = _ref.overflow,
      _ref$responsive = _ref.responsive,
      responsive = _ref$responsive === void 0 ? true : _ref$responsive,
      e = _ref.events,
      props = _objectWithoutProperties(_ref, ["children", "overflow", "responsive", "events"]);

  // `events`, `height` and `width` are the only props passed to the
  // chart container SVG, `style` isn't.
  // https://github.com/FormidableLabs/victory/blob/c0bff5240ce25d51a6fb6b9db091a2c27e0f5903/packages/victory-core/src/victory-container/victory-container.js#L118-L159
  var events = Object.assign({
    overflow: overflow
  }, e);
  return React.createElement(VictoryChart, _extends({
    containerComponent: React.createElement(VictoryContainer, {
      events: events,
      responsive: responsive,
      style: {
        height: 'auto'
      }
    })
  }, props), children);
}

Chart.propTypes = {
  children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node]).isRequired,
  events: PropTypes.shape({}),
  overflow: PropTypes.oneOf(['auto', 'hidden', 'scroll', 'visible']),
  responsive: PropTypes.bool
};
Chart.defaultProps = {
  events: undefined,
  overflow: 'visible',
  responsive: undefined
};
export default withVictoryTheme(Chart);