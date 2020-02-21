"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.DOWNLOAD_TAB = exports.EMBED_TAB = exports.SHARE_TAB = void 0;

var _react = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _core = require("@material-ui/core");

var _DownloadPanel = _interopRequireDefault(require("./DownloadPanel"));

var _EmbedPanel = _interopRequireDefault(require("./EmbedPanel"));

var _SharePanel = _interopRequireDefault(require("./SharePanel"));

var _TabPanel = _interopRequireWildcard(require("./TabPanel"));

var _makeStyles = _interopRequireDefault(require("../styles/makeStyles"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { if (!(Symbol.iterator in Object(arr) || Object.prototype.toString.call(arr) === "[object Arguments]")) { return; } var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

var SHARE_TAB = 0;
exports.SHARE_TAB = SHARE_TAB;
var EMBED_TAB = 1;
exports.EMBED_TAB = EMBED_TAB;
var DOWNLOAD_TAB = 2;
exports.DOWNLOAD_TAB = DOWNLOAD_TAB;
var useStyles = (0, _makeStyles.default)(function () {
  return {
    root: {},
    tabs: {},
    downloadContent: {},
    downloadDownloadButton: {},
    downloadSubtitle: {},
    downloadTitle: {},
    embedCode: {},
    embedCodeContainer: {},
    embedContent: {},
    embedSubtitle: {},
    embedTitle: {},
    shareSocial: {},
    shareSocialIcon: {},
    shareTitle: {},
    shareUrl: {},
    shareUrlContainer: {}
  };
});

function ActionsModel(_ref) {
  var download = _ref.download,
      embedProp = _ref.embed,
      id = _ref.id,
      open = _ref.open,
      onClose = _ref.onClose,
      tab = _ref.tab,
      share = _ref.share,
      props = _objectWithoutProperties(_ref, ["download", "embed", "id", "open", "onClose", "tab", "share"]);

  var classes = useStyles(props);

  var _useState = (0, _react.useState)(tab),
      _useState2 = _slicedToArray(_useState, 2),
      value = _useState2[0],
      setValue = _useState2[1];

  var _ref2 = embedProp || {},
      embedCode = _ref2.code,
      embed = _objectWithoutProperties(_ref2, ["code"]);

  var handleChange = function handleChange(event, newValue) {
    setValue(newValue);
  };

  var handleClose = function handleClose() {
    onClose();
  };

  var handleEnter = function handleEnter() {
    if (value !== tab) {
      setValue(tab);
    }
  };

  return _react.default.createElement(_core.Dialog, _extends({}, props, {
    onClose: handleClose,
    onEnter: handleEnter,
    open: open,
    className: classes.root
  }), _react.default.createElement(_core.Tabs, {
    value: value,
    onChange: handleChange,
    "aria-label": "actions tabs",
    scrollButtons: "auto",
    variant: "scrollable",
    className: classes.tabs
  }, _react.default.createElement(_core.Tab, _extends({
    label: "Share"
  }, (0, _TabPanel.a11yProps)(SHARE_TAB, id))), _react.default.createElement(_core.Tab, _extends({
    label: "Embed"
  }, (0, _TabPanel.a11yProps)(EMBED_TAB, id))), _react.default.createElement(_core.Tab, _extends({
    label: "Download"
  }, (0, _TabPanel.a11yProps)(DOWNLOAD_TAB, id)))), _react.default.createElement(_TabPanel.default, {
    id: id,
    value: value,
    index: EMBED_TAB
  }, _react.default.createElement(_EmbedPanel.default, _extends({}, embed, {
    classes: {
      code: classes.embedCode,
      codeContainer: classes.embedCodeContainer,
      content: classes.embedContent,
      subtitle: classes.embedSubtitle,
      title: classes.embedTitle
    }
  }), embedCode)), _react.default.createElement(_TabPanel.default, {
    id: id,
    value: value,
    index: SHARE_TAB
  }, _react.default.createElement(_SharePanel.default, _extends({}, share, {
    classes: {
      social: classes.shareSocial,
      socialIcon: classes.shareSocialIcon,
      subtitle: classes.shareSubtitle,
      title: classes.shareTitle,
      url: classes.shareUrl,
      urlContainer: classes.shareUrlContainer
    }
  }))), _react.default.createElement(_TabPanel.default, {
    id: id,
    value: value,
    index: DOWNLOAD_TAB
  }, _react.default.createElement(_DownloadPanel.default, _extends({}, download, {
    classes: {
      content: classes.downloadContent,
      downloadButton: classes.downloadDownloadButton,
      subtitle: classes.downloadSubtitle,
      title: classes.downloadTitle
    }
  }))));
}

ActionsModel.propTypes = {
  download: _propTypes.default.shape({
    onDownload: _propTypes.default.func.isRequired,
    subtitle: _propTypes.default.string,
    title: _propTypes.default.string
  }),
  embed: _propTypes.default.shape({
    code: _propTypes.default.string.isRequired,
    subtitle: _propTypes.default.string,
    title: _propTypes.default.string
  }),
  id: _propTypes.default.string,
  open: _propTypes.default.bool.isRequired,
  onClose: _propTypes.default.func.isRequired,
  share: _propTypes.default.shape({
    email: _propTypes.default.shape({
      subject: _propTypes.default.string,
      body: _propTypes.default.string,
      separator: _propTypes.default.string,
      url: _propTypes.default.string
    }),
    facebook: _propTypes.default.shape({
      url: _propTypes.default.string,
      quote: _propTypes.default.string,
      hashtag: _propTypes.default.string
    }),
    shareIcon: _propTypes.default.shape({
      round: _propTypes.default.bool,
      size: _propTypes.default.number
    }),
    twitter: _propTypes.default.shape({
      url: _propTypes.default.string,
      title: _propTypes.default.string,
      hashtags: _propTypes.default.string
    }),
    title: _propTypes.default.string,
    url: _propTypes.default.string
  }),
  tab: _propTypes.default.number
};
ActionsModel.defaultProps = {
  download: null,
  embed: null,
  id: '',
  share: null,
  tab: EMBED_TAB
};
var _default = ActionsModel;
exports.default = _default;