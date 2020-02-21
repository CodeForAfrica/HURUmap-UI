"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _Grid = _interopRequireDefault(require("@material-ui/core/Grid"));

var _propTypes = _interopRequireDefault(require("../../propTypes"));

var _ActionButton = _interopRequireDefault(require("../ActionButton"));

var _makeStyles = _interopRequireDefault(require("../styles/makeStyles"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var EmbedIcon = function EmbedIcon(props) {
  return _react.default.createElement("svg", props, _react.default.createElement("path", {
    d: "M12.7 10.7l-1.4-1.4L13.6 7l-2.3-2.3 1.4-1.4 3 3c.4.4.4 1 0 1.4l-3 3zm-9.4 0l-3-3c-.4-.4-.4-1 0-1.4l3-3 1.4 1.4L2.4 7l2.3 2.3-1.4 1.4zM6 14c-.1 0-.2 0-.3-.1-.5-.2-.8-.7-.6-1.3l4-12c.2-.5.7-.8 1.3-.6.5.2.8.7.6 1.3l-4 12c-.2.4-.6.7-1 .7z",
    fill: "#111",
    fillRule: "evenodd"
  }));
};

EmbedIcon.defaultProps = {
  xmlns: "http://www.w3.org/2000/svg",
  width: "16",
  height: "14",
  viewBox: "0 0 16 14"
};

var ShareIcon = function ShareIcon(props) {
  return _react.default.createElement("svg", props, _react.default.createElement("g", {
    fill: "none",
    fillRule: "evenodd",
    stroke: "#111",
    strokeLinecap: "round",
    strokeLinejoin: "round",
    transform: "translate(1 1)"
  }, _react.default.createElement("path", {
    d: "M10 4L5 6m5 4L5 8"
  }), _react.default.createElement("circle", {
    cx: "11.5",
    cy: "2.5",
    r: "2.5"
  }), _react.default.createElement("circle", {
    cx: "11.5",
    cy: "11.5",
    r: "2.5"
  }), _react.default.createElement("circle", {
    cx: "2.5",
    cy: "6.5",
    r: "2.5"
  })));
};

ShareIcon.defaultProps = {
  xmlns: "http://www.w3.org/2000/svg",
  width: "16",
  height: "16",
  viewBox: "0 0 16 16"
};
var useStyles = (0, _makeStyles.default)({
  actionsContainer: {
    right: 20,
    color: 'white',
    padding: '2px 5px',
    borderRadius: 5
  },
  actionButton: {
    color: 'white'
  },
  iconGrid: {
    height: 'unset'
  }
});

function SnippetActions(_ref) {
  var onShare = _ref.onShare,
      onEmbed = _ref.onEmbed;
  var classes = useStyles();
  return _react.default.createElement(_Grid.default, {
    className: classes.actionsContainer,
    container: true,
    spacing: 0
  }, _react.default.createElement(_Grid.default, {
    item: true
  }, _react.default.createElement(_ActionButton.default, {
    classes: {
      actionButton: classes.actionButton,
      iconGrid: classes.iconGrid
    },
    onClick: onShare
  }, _react.default.createElement(ShareIcon, null))), _react.default.createElement(_Grid.default, {
    item: true
  }, _react.default.createElement(_ActionButton.default, {
    classes: {
      actionButton: classes.actionButton,
      iconGrid: classes.iconGrid
    },
    onClick: onEmbed
  }, _react.default.createElement(EmbedIcon, null))));
}

SnippetActions.propTypes = {
  onShare: _propTypes.default.func,
  onEmbed: _propTypes.default.func
};
SnippetActions.defaultProps = {
  onShare: undefined,
  onEmbed: undefined
};
var _default = SnippetActions;
exports.default = _default;