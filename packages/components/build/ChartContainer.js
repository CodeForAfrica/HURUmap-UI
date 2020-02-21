"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _core = require("@material-ui/core");

var _utils = require("../utils");

var _A = _interopRequireDefault(require("./A"));

var _BlockLoader = _interopRequireDefault(require("./BlockLoader"));

var _EmbedDropDown = _interopRequireDefault(require("./EmbedDropDown"));

var _ShareDropDown = _interopRequireDefault(require("../ShareDropDown"));

var _TypographyLoader = _interopRequireDefault(require("../TypographyLoader"));

var _logo = _interopRequireDefault(require("./assets/logo.png"));

var _makeStyles = _interopRequireDefault(require("../../common/src/makeStyles"));

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

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

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
var useStyles = (0, _makeStyles.default)(function (_ref) {
  var breakpoints = _ref.breakpoints,
      palette = _ref.palette;
  return {
    root: {
      backgroundColor: '#f1f1ed'
    },
    containerRoot: {
      backgroundColor: '#fff',
      width: 'available'
    },
    chart: {
      margin: '1.5625rem 1.25rem'
    },
    content: {
      padding: '1.25rem 0',
      overflow: 'hidden'
    },
    container: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center'
    },
    actions: {},
    actionButton: {
      border: '0.0625rem solid #d8d8d8',
      marginLeft: '-0.0625rem',
      height: '2.5rem',
      width: '2.5rem'
    },
    title: function title(props) {
      return {
        textAlign: props.variant === 'analysis' ? 'center' : 'inherit'
      };
    },
    subtitle: function subtitle(props) {
      return {
        textAlign: props.variant === 'analysis' ? 'center' : 'inherit'
      };
    },
    source: {
      width: '100%'
    },
    sourceLink: {
      width: '100%',
      marginLeft: '50px'
    },
    embedRoot: {},
    embedTitle: {},
    embedSubtitle: {},
    embedCode: {},
    embedDropDownRoot: {},
    embedDropDownPaper: {},
    shareRoot: {},
    shareTitle: {},
    shareSocial: {},
    shareUrl: {},
    shareUrlInput: {},
    shareDropDownRoot: {},
    shareDropDownPaper: {},
    attribution: {
      display: 'none',
      backgroundColor: palette.primary.main,
      padding: '1.5625rem 1.25rem'
    },
    attributionSource: {
      flex: '1 1 300px',
      '& span': {
        color: '#fff'
      }
    },
    attributionLogo: {
      '& img': {
        height: 'auto',
        maxHeight: '2rem',
        maxWidth: '300px',
        width: 'auto'
      }
    },
    descriptionWrapper: {
      marginTop: '1.75rem'
    },
    description: _defineProperty({}, breakpoints.up('md'), {
      display: 'block',
      width: '62.36%' // golden-ratio

    })
  };
});

function ChartContainer(_ref2) {
  var children = _ref2.children,
      content = _ref2.content,
      embed = _ref2.embed,
      loading = _ref2.loading,
      logoProp = _ref2.logo,
      onClickCompare = _ref2.onClickCompare,
      onClickData = _ref2.onClickData,
      onClickDownloadProp = _ref2.onClickDownload,
      onClickEmbedProp = _ref2.onClickEmbed,
      onClickShareProp = _ref2.onClickShare,
      share = _ref2.share,
      sourceLink = _ref2.sourceLink,
      sourceTitle = _ref2.sourceTitle,
      title = _ref2.title,
      subtitle = _ref2.subtitle,
      description = _ref2.description,
      props = _objectWithoutProperties(_ref2, ["children", "content", "embed", "loading", "logo", "onClickCompare", "onClickData", "onClickDownload", "onClickEmbed", "onClickShare", "share", "sourceLink", "sourceTitle", "title", "subtitle", "description"]);

  var classes = useStyles(props);
  var variant = props.variant;

  var getReferenceObject = function getReferenceObject(ref) {
    var current = ref.current;

    if (current) {
      return {
        clientHeight: current.clientHeight,
        clientWidth: current.clientWidth,
        getBoundingClientRect: function getBoundingClientRect() {
          return current.getBoundingClientRect();
        }
      };
    }

    return null;
  };

  var compareButtonRef = (0, _react.useRef)(null);
  var dataButtonRef = (0, _react.useRef)(null);
  var downloadButtonRef = (0, _react.useRef)(null);
  var chartRef = (0, _react.useRef)(null);

  var toPng = function toPng() {
    var filter = function filter(node) {
      var classList = node.classList;

      if (classList) {
        if (classList.contains(classes.attribution)) {
          var nodeStyle = node.style;
          nodeStyle.display = 'flex';
        }

        return (0, _utils.isDowloadHiddenElement)(node);
      }

      return true;
    };

    return (0, _utils.domToPng)(chartRef.current, {
      filter: filter
    });
  };

  var handleDownload = function handleDownload(anchorEl, dataUrl) {
    if (dataUrl) {
      var link = document.createElement('a');
      link.download = "".concat(title, ".png");
      link.href = dataUrl;
      document.body.appendChild(link); // Firefox requires this

      link.click();
      document.body.removeChild(link);
    }
  };

  var onClickDownload = onClickDownloadProp || handleDownload;

  var _useState = (0, _react.useState)(null),
      _useState2 = _slicedToArray(_useState, 2),
      embedAnchorEl = _useState2[0],
      setEmbedAnchorEl = _useState2[1];

  var embedButtonRef = (0, _react.useRef)(null);

  var _useState3 = (0, _react.useState)(null),
      _useState4 = _slicedToArray(_useState3, 2),
      embedDropDown = _useState4[0],
      setEmbedDropDown = _useState4[1];

  var handleCloseEmbed = function handleCloseEmbed() {
    return setEmbedAnchorEl(null);
  };

  (0, _react.useEffect)(function () {
    if (typeof onClickEmbedProp === 'undefined') {
      var dropDown = embedAnchorEl ? _react.default.createElement(_EmbedDropDown.default, {
        anchorEl: embedAnchorEl,
        onClose: handleCloseEmbed,
        open: embedAnchorEl === null,
        title: embed.title,
        subtitle: embed.subtitle,
        classes: {
          root: classes.embedRoot,
          title: classes.embedTitle,
          subtitle: classes.embedSubtitle,
          code: classes.embedCode,
          dropDownRoot: classes.embedDropDownRoot,
          dropDownPaper: classes.embedDropDownPaper
        }
      }, embed.code) : null;
      setEmbedDropDown(dropDown);
    }
  }, [classes, embed, embedAnchorEl, onClickEmbedProp]);
  var shareButtonRef = (0, _react.useRef)(null);

  var _useState5 = (0, _react.useState)(null),
      _useState6 = _slicedToArray(_useState5, 2),
      shareAnchorEl = _useState6[0],
      setShareAnchorEl = _useState6[1];

  var _useState7 = (0, _react.useState)(null),
      _useState8 = _slicedToArray(_useState7, 2),
      shareDropDown = _useState8[0],
      setShareDropDown = _useState8[1];

  var handleCloseShare = function handleCloseShare() {
    return setShareAnchorEl(null);
  };

  (0, _react.useEffect)(function () {
    if (typeof onClickShareProp === 'undefined') {
      var dropDown = shareAnchorEl ? _react.default.createElement(_ShareDropDown.default, _extends({}, share, {
        anchorEl: shareAnchorEl,
        classes: {
          root: classes.shareRoot,
          title: classes.shareTitle,
          social: classes.shareSocial,
          url: classes.shareUrl,
          urlInput: classes.shareUrlInput,
          dropDownRoot: classes.shareDropDownRoot,
          dropDownPaper: classes.shareDropDownPaper
        },
        onClose: handleCloseShare
      }), "Explore Data") : null;
      setShareDropDown(dropDown);
    }
  }, [classes, onClickShareProp, share, shareAnchorEl, sourceLink, sourceTitle]);

  var onClickEmbed = onClickEmbedProp || typeof onClickEmbedProp === 'undefined' && function (anchorEl) {
    setShareAnchorEl(null);
    setEmbedAnchorEl(anchorEl);
  };

  var onClickShare = onClickShareProp || typeof onClickShareProp === 'undefined' && function (anchorEl) {
    setEmbedAnchorEl(null);
    setShareAnchorEl(anchorEl);
  };

  var logo = logoProp || _logo.default;

  var titleComponents = _react.default.createElement(_react.default.Fragment, null, _react.default.createElement(_TypographyLoader.default, {
    loading: loading,
    loader: {
      primaryOpacity: 0.5,
      secondaryOpacity: 1
    },
    className: classes.title,
    variant: "body1"
  }, title), subtitle && subtitle.length > 0 && _react.default.createElement(_TypographyLoader.default, {
    loading: loading,
    loader: {
      primaryOpacity: 0.5,
      secondaryOpacity: 1
    },
    className: classes.subtitle,
    variant: "caption"
  }, subtitle));

  var actionComponents = _react.default.createElement(_react.default.Fragment, null, onClickShare && _react.default.createElement(_BlockLoader.default, {
    loading: loading,
    width: 40,
    height: 40
  }, _react.default.createElement(_core.ButtonBase, {
    className: classes.actionButton,
    onClick: function onClick() {
      return onClickShare(getReferenceObject(shareButtonRef));
    },
    ref: shareButtonRef
  }, _react.default.createElement(ShareIcon, null))), onClickEmbed && _react.default.createElement(_BlockLoader.default, {
    loading: loading,
    width: 40,
    height: 40
  }, _react.default.createElement(_core.ButtonBase, {
    className: classes.actionButton,
    onClick: function onClick() {
      return onClickEmbed(getReferenceObject(embedButtonRef));
    },
    ref: embedButtonRef
  }, _react.default.createElement(EmbedIcon, null))), onClickDownload && _react.default.createElement(_BlockLoader.default, {
    loading: loading,
    width: 40,
    height: 40
  }, _react.default.createElement(_core.ButtonBase, {
    className: classes.actionButton,
    onClick: function onClick() {
      return toPng().then(onClickDownload.bind(null, getReferenceObject(downloadButtonRef)));
    },
    ref: downloadButtonRef
  }, _react.default.createElement(DownloadIcon, null))), onClickCompare && _react.default.createElement(_BlockLoader.default, {
    loading: loading,
    width: 40,
    height: 40
  }, _react.default.createElement(_core.ButtonBase, {
    className: classes.actionButton,
    onClick: function onClick() {
      return onClickCompare(getReferenceObject(compareButtonRef));
    },
    ref: compareButtonRef
  }, _react.default.createElement(CompareIcon, null))), onClickData && _react.default.createElement(_BlockLoader.default, {
    loading: loading,
    width: 40,
    height: 40
  }, _react.default.createElement(_core.ButtonBase, {
    className: classes.actionButton,
    onClick: function onClick() {
      return onClickData(getReferenceObject(dataButtonRef));
    },
    ref: dataButtonRef
  }, _react.default.createElement(DataIcon, null))), embedDropDown, shareDropDown);

  return _react.default.createElement("div", {
    ref: chartRef,
    className: classes.root
  }, _react.default.createElement(_core.Grid, {
    container: true,
    className: classes.containerRoot
  }, _react.default.createElement(_core.Grid, {
    item: true,
    xs: 12,
    container: true,
    className: classes.chart
  }, variant === 'data' && _react.default.createElement(_core.Grid, {
    item: true,
    xs: 12,
    container: true,
    wrap: "nowrap",
    direction: "row",
    alignItems: "flex-start",
    justify: "space-between"
  }, _react.default.createElement(_core.Grid, {
    item: true,
    xs: 8
  }, titleComponents), _react.default.createElement(_core.Grid, {
    item: true,
    xs: 4,
    container: true,
    wrap: "nowrap",
    direction: "row",
    justify: "flex-end",
    className: "".concat(_utils.DOWNLOAD_HIDDEN_CLASSNAME, " ").concat(classes.actions)
  }, actionComponents)), variant === 'analysis' && _react.default.createElement(_core.Grid, {
    item: true,
    xs: 12,
    container: true,
    wrap: "nowrap",
    direction: "row",
    alignItems: "center",
    justify: "center",
    className: "".concat(_utils.DOWNLOAD_HIDDEN_CLASSNAME, " ").concat(classes.actions)
  }, _react.default.createElement(_core.Grid, {
    item: true
  }, titleComponents)), _react.default.createElement(_core.Grid, {
    item: true,
    xs: 12,
    container: true,
    justify: "center",
    className: classes.content,
    style: {
      width: content.width,
      height: content.height
    }
  }, _react.default.createElement("div", {
    style: {
      width: loading && '100%',
      height: '100%'
    },
    className: classes.container
  }, _react.default.createElement(_BlockLoader.default, {
    loading: loading
  }, children), _react.default.createElement(_TypographyLoader.default, {
    loading: loading,
    loader: {
      primaryOpacity: 0.5,
      secondaryOpacity: 1
    },
    component: "div",
    className: "".concat(_utils.DOWNLOAD_HIDDEN_CLASSNAME, " ").concat(classes.source)
  }, sourceLink && _react.default.createElement(_A.default, {
    variant: "caption",
    className: classes.sourceLink,
    href: sourceLink
  }, "Source: ".concat(sourceTitle || sourceLink))))), variant === 'analysis' && _react.default.createElement(_core.Grid, {
    item: true,
    xs: 12,
    container: true,
    wrap: "nowrap",
    direction: "row",
    alignItems: "center",
    justify: "center",
    className: _utils.DOWNLOAD_HIDDEN_CLASSNAME
  }, _react.default.createElement(_core.Grid, {
    item: true
  }, actionComponents)))), description && _react.default.createElement(_core.Grid, {
    container: true,
    alignItems: "flex-start",
    wrap: "nowrap",
    className: classes.descriptionWrapper
  }, _react.default.createElement(_core.Grid, {
    item: true
  }, _react.default.createElement(_core.Typography, {
    variant: "caption",
    className: classes.description
  }, description))), _react.default.createElement(_core.Grid, {
    container: true,
    alignItems: "center",
    justify: "space-between",
    wrap: "wrap",
    className: classes.attribution
  }, _react.default.createElement(_core.Grid, {
    item: true,
    className: classes.attributionSource
  }, sourceLink && _react.default.createElement(_core.Typography, {
    variant: "caption"
  }, "Source ".concat(sourceLink))), _react.default.createElement(_core.Grid, {
    item: true,
    className: classes.attributionLogo
  }, _react.default.createElement("img", {
    src: logo,
    alt: "log"
  }))));
}

ChartContainer.propTypes = {
  children: _propTypes.default.oneOfType([_propTypes.default.arrayOf(_propTypes.default.node), _propTypes.default.node]).isRequired,
  content: _propTypes.default.shape({
    width: _propTypes.default.oneOfType([_propTypes.default.number, _propTypes.default.string]),
    height: _propTypes.default.oneOfType([_propTypes.default.number, _propTypes.default.string])
  }),
  description: _propTypes.default.string,
  embed: _propTypes.default.shape({
    title: _propTypes.default.string.isRequired,
    subtitle: _propTypes.default.string,
    code: _propTypes.default.string
  }),
  loading: _propTypes.default.bool,
  logo: _propTypes.default.string,
  onClickCompare: _propTypes.default.func,
  onClickData: _propTypes.default.func,
  onClickDownload: _propTypes.default.func,
  onClickEmbed: _propTypes.default.func,
  onClickShare: _propTypes.default.func,
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
    })
  }),
  sourceLink: _propTypes.default.string,
  sourceTitle: _propTypes.default.string,
  subtitle: _propTypes.default.string,
  title: _propTypes.default.string.isRequired,
  variant: _propTypes.default.oneOf(['data', 'analysis'])
};
ChartContainer.defaultProps = {
  embed: {
    title: 'Embed code for this chart',
    subtitle: 'Copy the code below, then paste into your own CMS or HTML. Embedded charts are responsive to your page width, and have been tested in Firefox, Safari, Chrome, and Edge.',
    code: "<iframe\nid=\"cr-embed-region-11-literacy_and_numeracy_tests-english_test_dist\"\nclassName=\"census-reporter-embed\"\nsrc=\"https://tanzania.hurumap.org/embed/iframe.html?geoID=region-11&geoVersion=2009&chartDataID=literacy_and_numeracy_tests-english_test_dist&dataYear=2015&chartType=pie&chartHeight=200&chartQualifier=&chartRelease=Uwezo+Annual+Assessment+Report+2015&chartSourceTitle=&chartSourceLink=&chartTitle=Percentage+of+children+aged+6-16+passing+English+literacy+tests&chartSubtitle=&initialSort=-value&statType=percentage\"\nframeBorder=\"0\"\nwidth=\"100%\"\nheight=\"300\"\nstyle=\"margin: 1em; max-width: 18.75rem;\"\n/>\n<script src=\"https://tanzania.hurumap.org/static/js/embed.chart.make.js\" />"
  },
  description: undefined,
  logo: undefined,
  onClickCompare: undefined,
  onClickData: undefined,
  onClickDownload: undefined,
  onClickEmbed: undefined,
  onClickShare: undefined,
  share: {
    // Default to twitter and facebook, sharing window.location.url
    facebook: {},
    twitter: {}
  },
  sourceLink: undefined,
  sourceTitle: undefined,
  loading: false,
  content: {
    width: '100%',
    height: '100%'
  },
  subtitle: undefined,
  variant: 'data'
};
var _default = ChartContainer;
exports.default = _default;