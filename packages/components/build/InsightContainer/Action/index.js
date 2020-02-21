"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireWildcard(require("react"));

var _propTypes = require("prop-types");

var _core = require("@material-ui/core");

var _ActionButton = _interopRequireDefault(require("../../ActionButton"));

var _EmbedCodeTextArea = _interopRequireDefault(require("./EmbedCodeTextArea"));

var _BlockLoader = _interopRequireDefault(require("../../BlockLoader"));

var _makeStyles = _interopRequireDefault(require("../../makeStyles"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { if (!(Symbol.iterator in Object(arr) || Object.prototype.toString.call(arr) === "[object Arguments]")) { return; } var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

var CompareIcon = function CompareIcon(props) {
  return _react.default.createElement("svg", props, _react.default.createElement("path", {
    d: "M4.167 3.333H0V5h4.167v3.333l5-4.166-5-4.167zm15.833 0h-4.167V0l-5 4.167 5 4.166V5H20z",
    fill: "#111",
    fillRule: "evenodd"
  }));
};

CompareIcon.defaultProps = {
  xmlns: "http://www.w3.org/2000/svg",
  width: "20",
  height: "9",
  viewBox: "0 0 20 9"
};

var DataIcon = function DataIcon(props) {
  return _react.default.createElement("svg", props, _react.default.createElement("g", {
    fill: "none",
    fillRule: "evenodd",
    stroke: "#111",
    strokeLinecap: "round",
    strokeLinejoin: "round",
    transform: "translate(0 1)"
  }, _react.default.createElement("path", {
    d: "M3.5 3.281h7m-7 2.813h7m-7 2.812h3"
  }), _react.default.createElement("rect", {
    width: "13",
    height: "14.063",
    x: ".5",
    y: ".469",
    rx: "1"
  }), _react.default.createElement("path", {
    d: "M.5 11.719h13"
  })));
};

DataIcon.defaultProps = {
  xmlns: "http://www.w3.org/2000/svg",
  width: "14",
  height: "17",
  viewBox: "0 0 14 17"
};

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
  root: {
    width: 'auto',
    maxWidth: '21.75rem',
    overflow: 'hidden',
    backgroundColor: 'white',
    borderRadius: '0.625rem',
    marginTop: '0.6rem',
    marginLeft: '10px',
    marginRight: '10px'
  },
  actionButton: {
    borderRadius: '0',
    '&:hover': {
      backgroundColor: 'transparent'
    },
    padding: '0.625rem'
  },
  actionButtonText: {
    fontSize: '0.6rem',
    fontWeight: 'bold',
    fontStyle: 'normal',
    fontStretch: 'normal',
    lineHeight: 'normal',
    letterSpacing: '0.019rem'
  },
  verticalDivider: {
    '&:not(:first-of-type)': {
      margin: 'auto 0',
      width: '0.07rem',
      height: '1.913rem',
      backgroundColor: '#eaeaea'
    }
  },
  iconGrid: {
    height: '2.1875rem'
  },
  shareButton: {},
  compareButton: {},
  embedButton: {},
  showDataButton: {},
  downloadButton: {}
});

function Actions(_ref) {
  var loading = _ref.loading,
      onShare = _ref.onShare,
      onDownload = _ref.onDownload,
      showingData = _ref.showingData,
      onShowData = _ref.onShowData,
      onCompare = _ref.onCompare,
      embedCode = _ref.embedCode,
      _ref$gaEvents = _ref.gaEvents,
      share = _ref$gaEvents.share,
      embed = _ref$gaEvents.embed,
      showData = _ref$gaEvents.showData,
      download = _ref$gaEvents.download,
      compare = _ref$gaEvents.compare,
      props = _objectWithoutProperties(_ref, ["loading", "onShare", "onDownload", "showingData", "onShowData", "onCompare", "embedCode", "gaEvents"]);

  var classes = useStyles(props);

  var _useState = (0, _react.useState)(null),
      _useState2 = _slicedToArray(_useState, 2),
      anchorEl = _useState2[0],
      setAnchorEl = _useState2[1];

  var handleEmbed = function handleEmbed(event) {
    setAnchorEl(event.currentTarget);
  };

  return _react.default.createElement(_core.Grid, {
    container: true,
    justify: "space-evenly",
    className: classes.root
  }, _react.default.createElement(_BlockLoader.default, {
    loading: loading,
    height: 40
  }, onShare && _react.default.createElement(_react.default.Fragment, null, _react.default.createElement("div", {
    className: classes.verticalDivider
  }), _react.default.createElement(_ActionButton.default, {
    gaEvents: share,
    onClick: onShare,
    classes: {
      actionButton: classes.shareButton,
      iconGrid: classes.actionButtonIconGrid
    }
  }, _react.default.createElement(ShareIcon, null), _react.default.createElement(_core.Typography, {
    className: classes.actionButtonText
  }, "Share"))), onDownload && _react.default.createElement(_react.default.Fragment, null, _react.default.createElement("div", {
    className: classes.verticalDivider
  }), _react.default.createElement(_ActionButton.default, {
    gaEvents: download,
    onClick: onDownload,
    classes: {
      actionButton: classes.downloadButton,
      iconGrid: classes.actionButtonIconGrid
    }
  }, _react.default.createElement(DownloadIcon, null), _react.default.createElement(_core.Typography, {
    className: classes.actionButtonText
  }, "Download"))), embedCode && _react.default.createElement(_react.default.Fragment, null, _react.default.createElement("div", {
    className: classes.verticalDivider
  }), _react.default.createElement(_ActionButton.default, {
    gaEvents: embed,
    onClick: handleEmbed,
    classes: {
      actionButton: classes.embedButton,
      iconGrid: classes.actionButtonIconGrid
    }
  }, _react.default.createElement(EmbedIcon, null), _react.default.createElement(_core.Typography, {
    className: classes.actionButtonText
  }, "Embed"))), onCompare && _react.default.createElement(_react.default.Fragment, null, _react.default.createElement("div", {
    className: classes.verticalDivider
  }), _react.default.createElement(_ActionButton.default, {
    gaEvents: compare,
    onClick: onCompare,
    classes: {
      actionButton: classes.compareButton,
      iconGrid: classes.actionButtonIconGrid
    }
  }, _react.default.createElement(CompareIcon, null), _react.default.createElement(_core.Typography, {
    className: classes.actionButtonText
  }, "Compare"))), onShowData && _react.default.createElement(_react.default.Fragment, null, _react.default.createElement("div", {
    className: classes.verticalDivider
  }), _react.default.createElement(_ActionButton.default, {
    gaEvents: showData,
    onClick: onShowData,
    classes: {
      actionButton: classes.showDataButton,
      iconGrid: classes.actionButtonIconGrid
    }
  }, _react.default.createElement(DataIcon, null), _react.default.createElement(_core.Typography, {
    className: classes.actionButtonText
  }, showingData ? 'Hide Data' : 'Show Data'))), _react.default.createElement(_core.Popover, {
    open: Boolean(anchorEl),
    onClose: function onClose() {
      return setAnchorEl(null);
    },
    anchorEl: anchorEl,
    anchorOrigin: {
      vertical: 'top',
      horizontal: 'center'
    },
    transformOrigin: {
      vertical: 'bottom',
      horizontal: 'center'
    }
  }, _react.default.createElement(_EmbedCodeTextArea.default, {
    code: embedCode
  }))));
}

Actions.propTypes = {
  showingData: _propTypes.PropTypes.bool,
  loading: _propTypes.PropTypes.bool,
  onDownload: _propTypes.PropTypes.func,
  onShare: _propTypes.PropTypes.func,
  onShowData: _propTypes.PropTypes.func,
  embedCode: _propTypes.PropTypes.string,
  onCompare: _propTypes.PropTypes.func,
  gaEvents: _propTypes.PropTypes.shape({
    share: _propTypes.PropTypes.shape({}),
    download: _propTypes.PropTypes.shape({}),
    compare: _propTypes.PropTypes.shape({}),
    showData: _propTypes.PropTypes.shape({}),
    embed: _propTypes.PropTypes.shape({})
  })
};
Actions.defaultProps = {
  showingData: false,
  loading: false,
  onDownload: null,
  onShare: null,
  onShowData: null,
  embedCode: undefined,
  onCompare: null,
  gaEvents: {
    share: undefined,
    download: undefined,
    compare: undefined,
    showData: undefined,
    embed: undefined
  }
};
var _default = Actions;
exports.default = _default;