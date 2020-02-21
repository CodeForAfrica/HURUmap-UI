"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _core = require("@material-ui/core");

var _DropDown = _interopRequireDefault(require("./DropDown"));

var _makeStyles = _interopRequireDefault(require("./makeStyles"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

var useStyles = (0, _makeStyles.default)({
  root: {},
  title: {},
  subtitle: {},
  code: {
    width: '100%',
    overflow: 'auto'
  },
  dropDownRoot: {},
  dropDownPaper: {}
});

function EmbedDropDown(_ref) {
  var anchorEl = _ref.anchorEl,
      children = _ref.children,
      onClose = _ref.onClose,
      openProp = _ref.open,
      subtitle = _ref.subtitle,
      title = _ref.title,
      props = _objectWithoutProperties(_ref, ["anchorEl", "children", "onClose", "open", "subtitle", "title"]);

  var classes = useStyles(props);
  var open = typeof openProps === 'undefined' ? anchorEl !== null : openProp;
  return _react.default.createElement(_DropDown.default, _extends({
    anchorEl: anchorEl,
    onClose: onClose,
    open: open,
    classes: {
      root: classes.dropDownRoot,
      paper: classes.dropDownPaper
    }
  }, props), _react.default.createElement(_core.Container, {
    className: classes.root
  }, title && _react.default.createElement(_core.DialogTitle, {
    className: classes.title
  }, title), _react.default.createElement(_core.DialogContent, null, subtitle && _react.default.createElement(_core.DialogContentText, {
    className: classes.subtitle
  }, subtitle), _react.default.createElement(_core.Typography, {
    variant: "caption",
    component: "code",
    className: classes.code
  }, children))));
}

EmbedDropDown.propTypes = {
  children: _propTypes.default.oneOfType([_propTypes.default.arrayOf(_propTypes.default.node), _propTypes.default.node]).isRequired,
  anchorEl: _propTypes.default.shape({}),
  onClose: _propTypes.default.func.isRequired,
  open: _propTypes.default.bool,
  subtitle: _propTypes.default.string,
  title: _propTypes.default.string
};
EmbedDropDown.defaultProps = {
  anchorEl: null,
  open: undefined,
  subtitle: null,
  title: null
};
var _default = EmbedDropDown;
exports.default = _default;