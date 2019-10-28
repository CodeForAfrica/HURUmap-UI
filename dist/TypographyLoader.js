function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

import React, { useRef, useEffect, useState } from 'react';
import { Typography } from '@material-ui/core';
import PropTypes from 'prop-types';
import ContentLoader from './ContentLoader';
export default function TypographyLoader(_ref) {
  var loading = _ref.loading,
      loader = _ref.loader,
      children = _ref.children,
      props = _objectWithoutProperties(_ref, ["loading", "loader", "children"]);

  var ref = useRef();

  var _useState = useState(),
      _useState2 = _slicedToArray(_useState, 2),
      height = _useState2[0],
      setHeight = _useState2[1];

  useEffect(function () {
    if (ref.current) {
      var typography = ref.current;
      var style = window.getComputedStyle(typography);
      setHeight(style.lineHeight);
    }
  }, []);
  return React.createElement(Typography, _extends({
    ref: ref
  }, props), loading ? React.createElement(ContentLoader, _extends({
    style: {
      height: height,
      width: '100%'
    }
  }, loader), React.createElement("rect", {
    x: "0",
    y: "0",
    width: "100%",
    height: "100%"
  })) : children);
}
TypographyLoader.propTypes = {
  children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node]),
  loading: PropTypes.bool,
  loader: PropTypes.shape({
    width: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    height: PropTypes.oneOfType([PropTypes.number, PropTypes.string])
  })
};
TypographyLoader.defaultProps = {
  loading: false,
  children: null,
  loader: {
    width: '100%',
    height: '20px'
  }
};