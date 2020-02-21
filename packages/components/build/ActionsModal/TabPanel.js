"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.a11yProps = a11yProps;
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _core = require("@material-ui/core");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

function a11yProps(index) {
  var id = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '';
  return {
    id: "".concat(id, "-actions-tab-").concat(index),
    'aria-controls': "".concat(id, "-actions-tabpanel-").concat(index)
  };
}

function TabPanel(_ref) {
  var id = _ref.id,
      children = _ref.children,
      value = _ref.value,
      index = _ref.index,
      props = _objectWithoutProperties(_ref, ["id", "children", "value", "index"]);

  return _react.default.createElement(_core.Typography, _extends({
    component: "div",
    role: "tabpanel",
    hidden: value !== index,
    id: "".concat(id, "-actions-tabpanel-").concat(index),
    "aria-labelledby": "".concat(id, "-actions-tab-").concat(index)
  }, props), value === index && _react.default.createElement(_core.Box, null, children));
}

TabPanel.propTypes = {
  children: _propTypes.default.oneOfType([_propTypes.default.arrayOf(_propTypes.default.node), _propTypes.default.node]).isRequired,
  id: _propTypes.default.string,
  index: _propTypes.default.number.isRequired,
  value: _propTypes.default.number.isRequired
};
TabPanel.defaultProps = {
  id: ''
};
var _default = TabPanel;
exports.default = _default;