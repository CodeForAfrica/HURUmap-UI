"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = TypographyLoader;

var _react = _interopRequireWildcard(require("react"));

var _core = require("@material-ui/core");

var _propTypes = _interopRequireDefault(require("prop-types"));

var _ContentLoader = _interopRequireDefault(require("./ContentLoader"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

function TypographyLoader(_ref) {
  var loading = _ref.loading,
      loader = _ref.loader,
      children = _ref.children,
      props = _objectWithoutProperties(_ref, ["loading", "loader", "children"]);

  var ref = (0, _react.useRef)();
  var height = (0, _react.useMemo)(function () {
    if (loader && loader.height) {
      return loader.height;
    }

    if (ref.current) {
      var typography = ref.current;
      var style = window.getComputedStyle(typography);
      return style.lineHeight;
    }

    return 20;
  }, [loader]);
  return _react.default.createElement(_core.Typography, _extends({
    ref: ref,
    style: {
      width: '100%',
      height: 'fit-content'
    }
  }, props), loading ? _react.default.createElement(_ContentLoader.default, _extends({
    primaryOpacity: 0.5,
    secondaryOpacity: 1,
    height: height
  }, loader), _react.default.createElement("rect", {
    x: "0",
    y: "0",
    width: "100%",
    height: "100%"
  })) : children);
}

TypographyLoader.propTypes = {
  children: _propTypes.default.oneOfType([_propTypes.default.arrayOf(_propTypes.default.node), _propTypes.default.node]),
  loading: _propTypes.default.bool,
  loader: _propTypes.default.shape({
    width: _propTypes.default.number,
    height: _propTypes.default.number
  })
};
TypographyLoader.defaultProps = {
  loading: false,
  children: null,
  loader: {}
};