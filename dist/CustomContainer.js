function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

import React from 'react';
import PropTypes from 'prop-types';
/**
 * Simple custom container similar to VictoryContainer that should be used with
 * components that don't work with VictoryChart i.e. those that don't need
 * Cartesian or polar axes.
 */

function CustomContainer(_ref) {
  var children = _ref.children,
      height = _ref.height,
      overflow = _ref.overflow,
      responsive = _ref.responsive,
      standalone = _ref.standalone,
      style = _ref.style,
      width = _ref.width;

  if (!standalone) {
    return children;
  }

  var dimensions = responsive ? {
    width: '100%',
    height: 'auto'
  } : {
    width: width,
    height: height
  };
  var divStyle = Object.assign({
    pointerEvents: 'none',
    touchAction: 'none',
    position: 'relative'
  }, dimensions);
  var svgProps = Object.assign({
    width: width,
    height: height,
    overflow: overflow,
    role: 'img',
    viewBox: responsive ? "0 0 ".concat(width, " ").concat(height) : undefined
  }); // Overflow visible will allow tooltips to not be cut off

  var svgStyle = Object.assign({
    pointerEvents: 'all',
    overflow: 'visible'
  }, dimensions);
  return React.createElement("div", {
    style: Object.assign({}, style, divStyle)
  }, React.createElement("svg", _extends({}, svgProps, {
    style: svgStyle
  }), children));
}

CustomContainer.propTypes = {
  children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node]).isRequired,
  height: PropTypes.number,
  overflow: PropTypes.oneOf(['auto', 'hidden', 'scroll', 'visible']),
  responsive: PropTypes.bool,
  standalone: PropTypes.bool,
  style: PropTypes.shape({}),
  width: PropTypes.number
};
CustomContainer.defaultProps = {
  height: undefined,
  overflow: 'visible',
  responsive: true,
  standalone: true,
  style: undefined,
  width: undefined
};
export default CustomContainer;