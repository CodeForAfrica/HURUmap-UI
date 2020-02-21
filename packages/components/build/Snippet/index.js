"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireWildcard(require("react"));

var _Grid = _interopRequireDefault(require("@material-ui/core/Grid"));

var _Typography = _interopRequireDefault(require("@material-ui/core/Typography"));

var _Add = _interopRequireDefault(require("@material-ui/icons/Add"));

var _Remove = _interopRequireDefault(require("@material-ui/icons/Remove"));

var _shortid = _interopRequireDefault(require("shortid"));

var _core = require("@material-ui/core");

var _utils = require("../utils");

var _propTypes = _interopRequireDefault(require("../propTypes"));

var _ActionsModal = _interopRequireWildcard(require("../ActionsModal"));

var _Button = _interopRequireDefault(require("./Button"));

var _Actions = _interopRequireDefault(require("./Actions"));

var _ContentLoader = _interopRequireDefault(require("../ContentLoader"));

var _makeStyles = _interopRequireDefault(require("../styles/makeStyles"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { if (!(Symbol.iterator in Object(arr) || Object.prototype.toString.call(arr) === "[object Arguments]")) { return; } var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

var useStyles = (0, _makeStyles.default)(function (theme) {
  return {
    root: function root(_ref) {
      var expand = _ref.expand,
          width = _ref.width;
      return {
        borderTop: "2px solid ".concat(theme.palette.primary.main),
        position: 'relative',
        backgroundColor: 'whitesmoke',
        width: expand ? '100%' : width || 500,
        height: 'auto',
        padding: 20,
        '& img': {
          maxWidth: '100%',
          objectFit: 'cover'
        }
      };
    },
    cardButton: {}
  };
});

function Snippet(_ref2) {
  var download = _ref2.download,
      fullWidth = _ref2.fullWidth,
      idProp = _ref2.id,
      share = _ref2.share,
      embed = _ref2.embed,
      link = _ref2.link,
      post = _ref2.post,
      width = _ref2.width,
      onExpand = _ref2.onExpand,
      props = _objectWithoutProperties(_ref2, ["download", "fullWidth", "id", "share", "embed", "link", "post", "width", "onExpand"]);

  var cardRef = (0, _react.useRef)(null);

  var id = idProp || _shortid.default.generate();

  var _useState = (0, _react.useState)(false),
      _useState2 = _slicedToArray(_useState, 2),
      expand = _useState2[0],
      setExpand = _useState2[1];

  var classes = useStyles(_objectSpread({
    width: fullWidth ? '100%' : width,
    expand: expand
  }, props));

  var _useState3 = (0, _react.useState)(_ActionsModal.SHARE_TAB),
      _useState4 = _slicedToArray(_useState3, 2),
      activeTab = _useState4[0],
      setActiveTab = _useState4[1];

  var _useState5 = (0, _react.useState)(false),
      _useState6 = _slicedToArray(_useState5, 2),
      modalOpen = _useState6[0],
      setModalOpen = _useState6[1];

  var defaultShareURL = (0, _react.useMemo)(function () {
    var _ref3 = window ? window.location : {},
        origin = _ref3.origin,
        pathname = _ref3.pathname,
        search = _ref3.search,
        hash = _ref3.hash;

    var searchParams = new URLSearchParams(search);
    searchParams.append('indicatorId', id);
    var query = searchParams.toString();
    return "".concat(origin).concat(pathname).concat(query ? "?".concat(query) : '').concat(hash);
  }, [id]);

  var _ref4 = download || {},
      onDownloadProp = _ref4.onDownload;

  var onDownload = function onDownload() {
    return (0, _utils.domToPng)(cardRef.current, {
      filter: _utils.isDowloadHiddenElement
    }).then(onDownloadProp || function (dataUrl) {
      if (dataUrl) {
        var a = document.createElement('a');
        a.download = "".concat(id, ".png");
        a.href = dataUrl;
        document.body.appendChild(a); // Firefox requires this

        a.click();
        document.body.removeChild(a);
      }
    });
  };

  var showActionsModal = function showActionsModal(tab) {
    setActiveTab(tab);
    setModalOpen(true);
  };

  var handleActionsModalClose = function handleActionsModalClose() {
    setModalOpen(false);
  };

  var renderPost = function renderPost() {
    return _react.default.createElement(_react.default.Fragment, null, _react.default.createElement(_Grid.default, {
      item: true,
      container: true,
      direction: "column",
      spacing: 1
    }, _react.default.createElement(_Grid.default, {
      item: true
    }, _react.default.createElement(_Grid.default, {
      container: true,
      direction: "row",
      wrap: "nowrap",
      justify: "space-between"
    }, _react.default.createElement(_Grid.default, {
      item: true
    }, _react.default.createElement(_Typography.default, {
      dangerouslySetInnerHTML: {
        __html: post.title
      }
    })), _react.default.createElement(_Grid.default, {
      item: true,
      className: _utils.DOWNLOAD_HIDDEN_CLASSNAME
    }, !link && _react.default.createElement(_react.default.Fragment, null, _react.default.createElement(_Actions.default, {
      onEmbed: function onEmbed(e) {
        return showActionsModal(_ActionsModal.EMBED_TAB, e);
      },
      onShare: function onShare(e) {
        return showActionsModal(_ActionsModal.SHARE_TAB, e);
      }
    }), _react.default.createElement(_ActionsModal.default, {
      id: id,
      embed: embed,
      open: modalOpen,
      download: _objectSpread({}, download, {
        onDownload: onDownload
      }),
      onClose: handleActionsModalClose,
      share: _objectSpread({
        url: defaultShareURL
      }, share),
      tab: activeTab,
      classes: {
        embedCode: classes.embedCode,
        embedCodeContainer: classes.embedCodeContainer,
        embedContent: classes.embedContent,
        embedSubtitle: classes.embedSubtitle,
        embedTitle: classes.embedTitle,
        shareSocial: classes.shareSocial,
        shareSocialIcon: classes.shareSocialIcon,
        shareSubtitle: classes.shareSubtitle,
        shareTitle: classes.shareTitle,
        shareUrl: classes.shareUrl,
        shareUrlContainer: classes.shareUrlContainer
      }
    }))))), _react.default.createElement(_Grid.default, {
      item: true
    }, _react.default.createElement(_Typography.default, {
      component: "div",
      dangerouslySetInnerHTML: {
        __html: expand ? post.content : post.content.split('<p><!--more--></p>')[0]
      }
    }))), !link && post.content.includes('<p><!--more--></p>') && _react.default.createElement(_Grid.default, {
      item: true,
      className: _utils.DOWNLOAD_HIDDEN_CLASSNAME
    }, _react.default.createElement(_Button.default, {
      onClick: function onClick() {
        if (onExpand) {
          onExpand(!expand);
        }

        setExpand(!expand);
      },
      classes: {
        root: classes.cardButton
      }
    }, expand ? _react.default.createElement(_react.default.Fragment, null, _react.default.createElement(_Remove.default, null), "Read Less") : _react.default.createElement(_react.default.Fragment, null, _react.default.createElement(_Add.default, null), "Read More"))));
  };

  return _react.default.createElement(_Grid.default, {
    container: true,
    ref: cardRef,
    className: classes.root,
    direction: "column",
    spacing: 2
  }, post ? link ? _react.default.createElement(_core.Link, {
    href: link
  }, renderPost()) : renderPost() : _react.default.createElement(_ContentLoader.default, {
    primaryOpacity: 0.5,
    secondaryOpacity: 1,
    height: 250
  }, _react.default.createElement("rect", {
    x: "0",
    y: "0",
    width: "97%",
    height: "100%"
  })));
}

Snippet.propTypes = {
  download: _propTypes.default.shape({
    onDownload: _propTypes.default.func,
    subtitle: _propTypes.default.string,
    title: _propTypes.default.string
  }),
  embed: _propTypes.default.shape({
    title: _propTypes.default.string.isRequired,
    subtitle: _propTypes.default.string,
    code: _propTypes.default.string
  }),
  fullWidth: _propTypes.default.bool,
  id: _propTypes.default.oneOfType([_propTypes.default.number, _propTypes.default.string]),
  onExpand: _propTypes.default.func,
  link: _propTypes.default.string,
  post: _propTypes.default.shape({
    title: _propTypes.default.string,

    /**
     * Content will be split at `<p><!--more--></p>` for read more.
     */
    content: _propTypes.default.string
  }),
  width: _propTypes.default.oneOfType([_propTypes.default.number, _propTypes.default.string]),
  share: _propTypes.default.shape({
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
    shareIcon: _propTypes.default.shape({
      round: _propTypes.default.bool,
      size: _propTypes.default.number
    }),
    twitter: _propTypes.default.shape({
      url: _propTypes.default.string,
      title: _propTypes.default.string,
      hashtags: _propTypes.default.string
    }),
    url: _propTypes.default.string
  })
};
Snippet.defaultProps = {
  download: {
    subtitle: 'For offline viewing or using it in print media.',
    title: 'Download this as an image'
  },
  embed: {
    title: 'Embed this by',
    subtitle: 'Copying the code below and pasting it into your own CMS or HTML.',
    code: "<iframe title=\"\" src=\"\" />\n<script src=\"https://dashboard.takwimu.africa/wp-content/themes/hurumap/assets/js/hurumap-iframe-handler.js\" />"
  },
  fullWidth: false,
  id: undefined,
  onExpand: undefined,
  link: undefined,
  post: undefined,
  width: undefined,
  share: {
    facebook: {},
    twitter: {}
  }
};
var _default = Snippet;
exports.default = _default;