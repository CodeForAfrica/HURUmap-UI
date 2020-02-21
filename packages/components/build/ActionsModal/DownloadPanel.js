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

var DownloadIcon = function DownloadIcon(props) {
  return _react.default.createElement("svg", props, _react.default.createElement("g", {
    fill: "none",
    fillRule: "evenodd"
  }, _react.default.createElement("path", {
    stroke: "#111",
    strokeLinecap: "round",
    strokeLinejoin: "round",
    d: "M3.333 4.667H.667V14h14.666V4.667h-2.666"
  }), _react.default.createElement("path", {
    fill: "#111",
    d: "M9.333 6.667V0H6.667v6.667H4L8 12l4-5.333z"
  })));
};

DownloadIcon.defaultProps = {
  xmlns: "http://www.w3.org/2000/svg",
  width: "16",
  height: "15",
  viewBox: "0 0 16 15"
};
var useStyles = (0, _makeStyles.default)({
  content: {},
  downloadButton: {},
  subtitle: {},
  title: {}
});

function DownloadPanel(_ref) {
  var subtitle = _ref.subtitle,
      title = _ref.title,
      onDownload = _ref.onDownload,
      props = _objectWithoutProperties(_ref, ["subtitle", "title", "onDownload"]);

  var classes = useStyles(props);
  return _react.default.createElement(_react.default.Fragment, null, title && _react.default.createElement(_core.DialogTitle, {
    className: classes.title
  }, title), _react.default.createElement(_core.DialogContent, {
    className: classes.content
  }, subtitle && _react.default.createElement(_core.DialogContentText, {
    className: classes.subtitle
  }, subtitle), _react.default.createElement(_core.Button, {
    className: classes.downloadButton,
    variant: "outlined",
    onClick: onDownload,
    startIcon: _react.default.createElement(DownloadIcon, null)
  }, "Download")));
}

DownloadPanel.propTypes = {
  onDownload: _propTypes.default.func.isRequired,
  subtitle: _propTypes.default.string,
  title: _propTypes.default.string
};
DownloadPanel.defaultProps = {
  subtitle: undefined,
  title: undefined
};
var _default = DownloadPanel;
exports.default = _default;