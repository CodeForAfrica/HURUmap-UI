"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _ButtonBase = _interopRequireDefault(require("@material-ui/core/ButtonBase"));

var _propTypes = _interopRequireDefault(require("../propTypes"));

var _makeStyles = _interopRequireDefault(require("../styles/makeStyles"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

var useStyles = (0, _makeStyles.default)(function (_ref) {
  var palette = _ref.palette;
  return {
    root: {
      color: 'white',
      backgroundColor: palette.primary.main,
      padding: '5px 10px',
      paddingLeft: '5px',
      borderRadius: 5
    }
  };
});

function SnippetButton(_ref2) {
  var children = _ref2.children,
      props = _objectWithoutProperties(_ref2, ["children"]);

  var classes = useStyles(props);
  return _react.default.createElement(_ButtonBase.default, _extends({}, props, {
    className: classes.root
  }), children);
}

SnippetButton.propTypes = {
  children: _propTypes.default.children.isRequired
};
var _default = SnippetButton;
exports.default = _default;