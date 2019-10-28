import React, { useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import wrapSVGText from './wrapSVGText';

function WrapLabel(_ref) {
  var width = _ref.width,
      text = _ref.text,
      x = _ref.x,
      y = _ref.y,
      style = _ref.style,
      transform = _ref.transform,
      textAnchor = _ref.textAnchor;

  var _ref2 = useRef();

  useEffect(function () {
    if (_ref2.current) {
      wrapSVGText(_ref2.current, text, width);
    }
  }, [text, width, x]);
  var uniqueId = Math.random().toString(36).substring(2) + Date.now().toString(36);
  return React.createElement("text", {
    key: uniqueId,
    ref: function ref(node) {
      _ref2.current = node;
    },
    x: x,
    y: y,
    style: style,
    transform: transform,
    textAnchor: textAnchor
  });
}

WrapLabel.propTypes = {
  text: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.string), PropTypes.string, PropTypes.number]),
  style: PropTypes.shape({}),
  textAnchor: PropTypes.string,
  transform: PropTypes.string,
  width: PropTypes.number.isRequired,
  x: PropTypes.number,
  y: PropTypes.number
};
WrapLabel.defaultProps = {
  text: undefined,
  style: undefined,
  textAnchor: undefined,
  transform: undefined,
  x: undefined,
  y: undefined
};
export default WrapLabel;