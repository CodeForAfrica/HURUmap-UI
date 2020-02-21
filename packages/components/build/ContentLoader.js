"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = CustomContentLoader;

var _react = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _reactContentLoader = _interopRequireDefault(require("react-content-loader"));

var _shortid = _interopRequireDefault(require("shortid"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { if (!(Symbol.iterator in Object(arr) || Object.prototype.toString.call(arr) === "[object Arguments]")) { return; } var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

function CustomContentLoader(_ref) {
  var propId = _ref.id,
      children = _ref.children,
      height = _ref.height,
      width = _ref.width,
      props = _objectWithoutProperties(_ref, ["id", "children", "height", "width"]);

  var id = (0, _react.useMemo)(function () {
    return propId || _shortid.default.generate();
  }, [propId]);

  var _useState = (0, _react.useState)({
    width: width === undefined ? 0 : width,
    height: height === undefined ? 0 : height
  }),
      _useState2 = _slicedToArray(_useState, 2),
      dimension = _useState2[0],
      setDimension = _useState2[1];

  (0, _react.useEffect)(function () {
    var el = document.getElementById(id);

    if (el) {
      var parentEl = el.parentElement;

      if (parentEl) {
        var rect = parentEl.getBoundingClientRect();
        var style = window.getComputedStyle(parentEl);
        setDimension({
          width: width === undefined ? rect.width - parseFloat(style.paddingLeft.replace('px', '')) - parseFloat(style.paddingRight.replace('px', '')) - parseFloat(style.marginLeft.replace('px', '')) - parseFloat(style.marginRight.replace('px', '')) : width,
          height: height === undefined ? rect.height - parseFloat(style.paddingTop.replace('px', '')) - parseFloat(style.paddingBottom.replace('px', '')) - parseFloat(style.marginTop.replace('px', '')) - parseFloat(style.marginBottom.replace('px', '')) : height
        });
      }
    }
  }, [id, width, height]);
  return _react.default.createElement(_reactContentLoader.default, _extends({
    id: id,
    primaryOpacity: 0.01,
    secondaryOpacity: 0.1,
    width: dimension.width,
    height: dimension.height,
    viewBox: "0 0 ".concat(dimension.width, " ").concat(dimension.height),
    style: _objectSpread({}, dimension)
  }, props), children);
}

CustomContentLoader.propTypes = {
  id: _propTypes.default.string,
  children: _propTypes.default.oneOfType([_propTypes.default.arrayOf(_propTypes.default.node), _propTypes.default.node]).isRequired,
  width: _propTypes.default.number,
  height: _propTypes.default.number
};
CustomContentLoader.defaultProps = {
  id: undefined,
  width: undefined,
  height: undefined
};