"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _core = require("@material-ui/core");

var _reactShare = require("react-share");

var _DropDown = _interopRequireDefault(require("./DropDown"));

var _makeStyles = _interopRequireDefault(require("../../common/src/makeStyles"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

var useStyles = (0, _makeStyles.default)(function () {
  return {
    root: {},
    social: {},
    socialIcon: {
      padding: '0 0.5rem 1.5rem 0.5rem'
    },
    title: {},
    url: {
      width: '100%'
    },
    urlInput: {
      fontFamily: 'monospace'
    },
    dropDownRoot: {},
    dropDownPaper: {}
  };
});

function ShareDropDown(_ref) {
  var anchorEl = _ref.anchorEl,
      email = _ref.email,
      facebook = _ref.facebook,
      onClose = _ref.onClose,
      openProp = _ref.open,
      shareIcon = _ref.shareIcon,
      twitter = _ref.twitter,
      title = _ref.title,
      urlProp = _ref.url,
      props = _objectWithoutProperties(_ref, ["anchorEl", "email", "facebook", "onClose", "open", "shareIcon", "twitter", "title", "url"]);

  var classes = useStyles(props);
  var open = typeof openProps === 'undefined' ? anchorEl !== null : openProp;
  var url = urlProp || window.location.href;

  var _ref2 = twitter || {},
      twitterShareUrlProp = _ref2.url,
      twitterProps = _objectWithoutProperties(_ref2, ["url"]);

  var twitterShareUrl = twitter && (twitterShareUrlProp || url);

  var _ref3 = twitter || {},
      facebookShareUrlProp = _ref3.url,
      facebookProps = _objectWithoutProperties(_ref3, ["url"]);

  var facebookShareUrl = facebook && (facebookShareUrlProp || url);

  var _ref4 = email || {},
      emailShareUrlProp = _ref4.url,
      emailProps = _objectWithoutProperties(_ref4, ["url"]);

  var emailShareUrl = email && (emailShareUrlProp || url);

  if (!twitter && !facebook && !email) {
    return null;
  }

  return _react.default.createElement(_DropDown.default, _extends({
    anchorEl: anchorEl,
    onClose: onClose,
    open: open,
    classes: {
      root: classes.dropDownRoot,
      paper: classes.dropDownPaper
    }
  }, props), _react.default.createElement(_core.Grid, {
    className: classes.root,
    container: true,
    justify: "center"
  }, title && _react.default.createElement(_core.DialogTitle, {
    className: classes.title
  }, title), _react.default.createElement(_core.DialogContent, null, _react.default.createElement(_core.Grid, {
    item: true,
    xs: 12,
    className: classes.social,
    container: true,
    justify: "center"
  }, twitter && _react.default.createElement(_reactShare.TwitterShareButton, _extends({
    url: twitterShareUrl
  }, twitterProps, {
    className: classes.socialIcon
  }), _react.default.createElement(_reactShare.TwitterIcon, shareIcon)), facebook && _react.default.createElement(_reactShare.FacebookShareButton, _extends({
    url: facebookShareUrl
  }, facebookProps, {
    className: classes.socialIcon
  }), _react.default.createElement(_reactShare.FacebookIcon, shareIcon)), email && _react.default.createElement(_reactShare.EmailShareButton, _extends({
    url: emailShareUrl
  }, emailProps, {
    className: classes.socialIcon
  }), _react.default.createElement(_reactShare.EmailIcon, shareIcon))), url && _react.default.createElement(_core.TextField, {
    defaultValue: url,
    className: classes.url,
    InputProps: {
      readOnly: true,
      classes: {
        root: classes.urlInput
      }
    },
    variant: "outlined"
  }))));
}

ShareDropDown.propTypes = {
  anchorEl: _propTypes.default.shape({}),
  email: _propTypes.default.shape({
    subject: _propTypes.default.string,
    body: _propTypes.default.string,
    separator: _propTypes.default.string
  }),
  facebook: _propTypes.default.shape({
    url: _propTypes.default.string,
    quote: _propTypes.default.string,
    hashtag: _propTypes.default.string
  }),
  onClose: _propTypes.default.func.isRequired,
  open: _propTypes.default.bool,
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
};
ShareDropDown.defaultProps = {
  anchorEl: null,
  email: null,
  facebook: null,
  open: undefined,
  shareIcon: {
    round: false,
    size: 40
  },
  title: 'Share',
  twitter: null,
  url: null
};
var _default = ShareDropDown;
exports.default = _default;