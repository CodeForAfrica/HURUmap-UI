function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import ContentLoader from 'react-content-loader';
export default function CustomContentLoader(_ref) {
  var id = _ref.id,
      children = _ref.children,
      height = _ref.height,
      width = _ref.width,
      props = _objectWithoutProperties(_ref, ["id", "children", "height", "width"]);

  var _useState = useState({
    width: width === -1 ? 0 : width,
    height: height === -1 ? 0 : height
  }),
      _useState2 = _slicedToArray(_useState, 2),
      dimmension = _useState2[0],
      setDimension = _useState2[1];

  useEffect(function () {
    var rect = document.getElementById(id).parentElement.getBoundingClientRect();
    setDimension({
      width: width === -1 ? rect.width : width,
      height: height === -1 ? rect.height : height
    });
  }, [id, width, height]);
  return React.createElement(ContentLoader, _extends({
    id: id,
    primaryOpacity: 0.01,
    secondaryOpacity: 0.1,
    width: dimmension.width,
    height: dimmension.height,
    viewBox: "0 0 ".concat(dimmension.width, " ").concat(dimmension.height),
    style: {
      width: width,
      height: height
    }
  }, props), children);
}
CustomContentLoader.propTypes = {
  id: PropTypes.string,
  children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node]).isRequired,
  width: PropTypes.number,
  height: PropTypes.number
};
CustomContentLoader.defaultProps = {
  id: Math.random().toString(36).substring(2) + Date.now().toString(36),
  width: -1,
  height: -1
};