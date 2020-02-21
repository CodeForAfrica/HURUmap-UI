"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _core = require("@material-ui/core");

var _makeStyles = _interopRequireDefault(require("../styles/makeStyles"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

var useStyles = (0, _makeStyles.default)({
  content: {},
  code: {
    fontFamily: 'monospace',
    width: '100%'
  },
  codeContainer: {
    border: '1px solid #eaeaea',
    padding: '18.5px 14px',
    overflow: 'auto'
  },
  subtitle: {},
  title: {}
});

function EmbedPanel(_ref) {
  var children = _ref.children,
      subtitle = _ref.subtitle,
      title = _ref.title,
      props = _objectWithoutProperties(_ref, ["children", "subtitle", "title"]);

  var classes = useStyles(props);
  return _react.default.createElement(_react.default.Fragment, null, title && _react.default.createElement(_core.DialogTitle, {
    className: classes.title
  }, title), _react.default.createElement(_core.DialogContent, {
    className: classes.content
  }, subtitle && _react.default.createElement(_core.DialogContentText, {
    className: classes.subtitle
  }, subtitle), _react.default.createElement("pre", {
    className: classes.codeContainer
  }, _react.default.createElement(_core.Typography, {
    variant: "caption",
    component: "code",
    className: classes.code
  }, children))));
}

EmbedPanel.propTypes = {
  children: _propTypes.default.oneOfType([_propTypes.default.arrayOf(_propTypes.default.node), _propTypes.default.node]).isRequired,
  subtitle: _propTypes.default.string,
  title: _propTypes.default.string
};
EmbedPanel.defaultProps = {
  subtitle: null,
  title: null
};
var _default = EmbedPanel;
exports.default = _default;