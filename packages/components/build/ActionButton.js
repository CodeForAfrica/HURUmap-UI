"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _propTypes = require("prop-types");

var _core = require("@material-ui/core");

var _makeStyles = _interopRequireDefault(require("../../common/src/makeStyles"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

var useStyles = (0, _makeStyles.default)({
  actionButton: {
    borderRadius: '0',
    '&:hover': {
      backgroundColor: 'transparent'
    },
    padding: '0.5rem'
  },
  iconGrid: {
    height: '2.1875rem'
  }
});

function ActionButton(_ref) {
  var children = _ref.children,
      onClick = _ref.onClick,
      _ref$gaEvents = _ref.gaEvents,
      gaOn = _ref$gaEvents.gaOn,
      gaEventAction = _ref$gaEvents.gaEventAction,
      gaEventCategory = _ref$gaEvents.gaEventCategory,
      gaEventLabel = _ref$gaEvents.gaEventLabel,
      propClasses = _ref.classes,
      props = _objectWithoutProperties(_ref, ["children", "onClick", "gaEvents", "classes"]);

  var classes = useStyles({
    classes: {
      actionButton: propClasses.actionButton,
      iconGrid: propClasses.iconGrid
    }
  });
  return _react.default.createElement(_core.IconButton, _extends({
    className: classes.actionButton,
    onClick: onClick,
    "ga-on": gaOn,
    "ga-event-category": gaEventCategory,
    "ga-event-action": gaEventAction,
    "ga-event-label": gaEventLabel
  }, props), _react.default.createElement(_core.Grid, {
    component: "span",
    container: true,
    direction: "column",
    justify: "space-between",
    alignItems: "center",
    className: classes.iconGrid
  }, children));
}

ActionButton.propTypes = {
  onClick: _propTypes.PropTypes.func,
  classes: _propTypes.PropTypes.shape({
    actionButton: _propTypes.PropTypes.string,
    iconGrid: _propTypes.PropTypes.string
  }),
  children: _propTypes.PropTypes.oneOfType([_propTypes.PropTypes.arrayOf(_propTypes.PropTypes.node), _propTypes.PropTypes.node]).isRequired,
  gaEvents: _propTypes.PropTypes.shape({
    gaOn: _propTypes.PropTypes.string,
    gaEventCategory: _propTypes.PropTypes.string,
    gaEventAction: _propTypes.PropTypes.string,
    gaEventLabel: _propTypes.PropTypes.string
  })
};
ActionButton.defaultProps = {
  classes: undefined,
  onClick: null,
  gaEvents: {
    gaOn: undefined,
    gaEventCategory: undefined,
    gaEventAction: undefined,
    gaEventLabel: undefined
  }
};
var _default = ActionButton;
exports.default = _default;