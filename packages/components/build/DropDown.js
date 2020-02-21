"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _core = require("@material-ui/core");

var _makeStyles = _interopRequireDefault(require("../../common/src/makeStyles"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var useStyles = (0, _makeStyles.default)(function (_ref) {
  var breakpoints = _ref.breakpoints;
  return {
    root: _defineProperty({
      width: '100%',
      marginTop: '1rem'
    }, breakpoints.up('sm'), {
      width: '20rem'
    }),
    paper: {}
  };
});

function DropDown(_ref2) {
  var children = _ref2.children,
      onClose = _ref2.onClose,
      open = _ref2.open,
      transition = _ref2.transition,
      props = _objectWithoutProperties(_ref2, ["children", "onClose", "open", "transition"]);

  var classes = useStyles(props);
  return _react.default.createElement(_core.Popper, _extends({
    open: open,
    className: classes.root,
    transition: true
  }, props), function (_ref3) {
    var TransitionProps = _ref3.TransitionProps;
    return _react.default.createElement(_core.Fade, _extends({}, TransitionProps, transition), _react.default.createElement(_core.Paper, {
      className: classes.paper
    }, _react.default.createElement(_core.ClickAwayListener, {
      onClickAway: onClose
    }, children)));
  });
}

DropDown.propTypes = {
  children: _propTypes.default.oneOfType([_propTypes.default.arrayOf(_propTypes.default.node), _propTypes.default.node]).isRequired,
  onClose: _propTypes.default.func.isRequired,
  open: _propTypes.default.bool.isRequired,
  transition: _propTypes.default.shape({})
};
DropDown.defaultProps = {
  transition: {
    timeout: 350
  }
};
var _default = DropDown;
exports.default = _default;