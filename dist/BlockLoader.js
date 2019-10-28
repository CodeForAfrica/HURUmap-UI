function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

import React from 'react';
import PropTypes from 'prop-types';
import ContentLoader from './ContentLoader';
export default function BlockLoader(_ref) {
  var loading = _ref.loading,
      children = _ref.children,
      props = _objectWithoutProperties(_ref, ["loading", "children"]);

  return loading ? React.createElement(ContentLoader, _extends({
    primaryOpacity: 0.5,
    secondaryOpacity: 1
  }, props), React.createElement("rect", {
    x: "0",
    y: "0",
    width: "100%",
    height: "100%"
  })) : children;
}
BlockLoader.propTypes = {
  loading: PropTypes.bool.isRequired,
  children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node]),
  width: PropTypes.number,
  height: PropTypes.number
};
BlockLoader.defaultProps = {
  children: null,
  width: -1,
  height: -1
};