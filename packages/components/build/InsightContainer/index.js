"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _core = require("@material-ui/core");

var _ArrowDropUp = _interopRequireDefault(require("@material-ui/icons/ArrowDropUp"));

var _utils = require("../../utils");

var _BlockLoader = _interopRequireDefault(require("../BlockLoader"));

var _TypographyLoader = _interopRequireDefault(require("../../TypographyLoader"));

var _DataTable = _interopRequireDefault(require("../DataTable"));

var _A = _interopRequireDefault(require("../A"));

var _Action = _interopRequireDefault(require("./Action"));

var _Insight = _interopRequireDefault(require("./Insight"));

var _propTypes2 = _interopRequireDefault(require("../../propTypes"));

var _logo = _interopRequireDefault(require("../assets/logo.png"));

var _makeStyles = _interopRequireDefault(require("../../../common/src/makeStyles"));

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

var useStyles = (0, _makeStyles.default)(function (_ref) {
  var palette = _ref.palette;
  return {
    root: {
      backgroundColor: '#fff'
    },
    containerRoot: {
      height: 'auto',
      position: 'relative',
      backgroundColor: '#f6f6f6'
    },
    title: function title(_ref2) {
      var variant = _ref2.variant,
          rootWidth = _ref2.rootWidth;
      return {
        fontSize: '1.25rem',
        fontWeight: 'bold',
        textAlign: (variant === 'analysis' || rootWidth < 628) && 'center',
        marginBottom: (variant === 'analysis' || rootWidth < 628) && '1.25rem'
      };
    },
    highlightGrid: function highlightGrid(_ref3) {
      var variant = _ref3.variant,
          rootWidth = _ref3.rootWidth;
      return {
        display: (variant !== 'data' || rootWidth < 628) && 'none',
        flexGrow: 1,
        flexShrink: 1,
        flexBasis: '11.71875rem'
      };
    },
    highlightContentChild: function highlightContentChild(_ref4) {
      var variant = _ref4.variant,
          rootWidth = _ref4.rootWidth;
      return {
        display: variant === 'data' && rootWidth >= 628 && 'none'
      };
    },
    contentGrid: {
      flexGrow: 1,
      flexShrink: 1,
      width: '100%',
      height: 'available',
      flexBasis: '25.03125rem'
    },
    insightGrid: {
      flexGrow: 1,
      flexShrink: 1,
      flexBasis: '17rem',
      minWidth: '17rem'
    },
    sourceLink: {
      wordBreak: 'break-all',
      whiteSpace: 'normal'
    },
    sourceGrid: {
      display: 'flex',
      alignItems: 'flex-end'
    },
    insight: {
      height: '100%'
    },
    insightAnalysisLink: {},
    insightDataLink: {},
    insightDescription: {},
    insightTitle: {},
    actionsRoot: {},
    actionsShareButton: {},
    actionsCompareButton: {},
    actionsEmbedButton: {},
    actionsShowDataButton: {},
    actionsDownloadButton: {},
    actionsActionButtonIconGrid: {},
    actionsActionButtonVerticalDivider: {},
    actionsActionButtonText: {},
    dataTableRoot: {},
    dataTableActionButton: {},
    dataTableActionButtons: {},
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
      marginTop: '1.25rem',
      padding: '0 5%'
    },
    description: {
      display: 'flex',
      marginLeft: '1.25rem'
    }
  };
});

function InsightContainer(_ref5) {
  var hideInsight = _ref5.hideInsight,
      actions = _ref5.actions,
      children = _ref5.children,
      embedCode = _ref5.embedCode,
      gaEvents = _ref5.gaEvents,
      insightProp = _ref5.insight,
      logoProp = _ref5.logo,
      loading = _ref5.loading,
      source = _ref5.source,
      title = _ref5.title,
      description = _ref5.description,
      _ref5$dataTable = _ref5.dataTable,
      dataTable = _ref5$dataTable === void 0 ? {} : _ref5$dataTable,
      props = _objectWithoutProperties(_ref5, ["hideInsight", "actions", "children", "embedCode", "gaEvents", "insight", "logo", "loading", "source", "title", "description", "dataTable"]);

  var variant = props.variant;
  var highlightChild = variant === 'data' && children[0];
  var contentChild = children[1] || children[0];

  var _ref6 = actions || {},
      handleShare = _ref6.handleShare,
      handleCompare = _ref6.handleCompare,
      handleDownloadProp = _ref6.handleDownload,
      handleShowData = _ref6.handleShowData;

  var _useState = (0, _react.useState)(),
      _useState2 = _slicedToArray(_useState, 2),
      rootNode = _useState2[0],
      setRootNode = _useState2[1];

  var _useState3 = (0, _react.useState)(false),
      _useState4 = _slicedToArray(_useState3, 2),
      showData = _useState4[0],
      setShowData = _useState4[1];

  var classes = useStyles(_objectSpread({}, props, {
    rootWidth: rootNode ? rootNode.getBoundingClientRect().width : 300
  }));

  var toPng = function toPng() {
    var filter = function filter(n) {
      var classList = n.classList,
          tagName = n.tagName;

      if (tagName === 'SCRIPT') {
        return false;
      }

      if (!classList) {
        return true;
      }

      if (classList.contains(classes.attribution)) {
        var nodeStyle = n.style;
        nodeStyle.display = 'flex';
      }

      return (0, _utils.isDowloadHiddenElement)(n);
    };

    return (0, _utils.domToPng)(rootNode, {
      filter: filter
    });
  };

  var defaultHandleDownload = function defaultHandleDownload(e, dataUrl) {
    if (dataUrl) {
      var link = document.createElement('a');
      link.download = "".concat(title, ".png");
      link.href = dataUrl;
      document.body.appendChild(link); // Firefox requires this

      link.click();
      document.body.removeChild(link);
    }
  }; // null should disable action


  var handleDownload = handleDownloadProp || (handleDownloadProp === undefined ? defaultHandleDownload : undefined);

  var actionsChildren = _react.default.createElement(_Action.default, {
    loading: loading,
    onShare: handleShare && function (e) {
      return toPng().then(handleShare.bind(null, e));
    },
    onDownload: handleDownload && function (e) {
      return toPng().then(handleDownload.bind(null, e));
    },
    showingData: showData,
    onShowData: dataTable && dataTable.rawData && (handleShowData || function () {
      return setShowData(!showData);
    }),
    onCompare: handleCompare,
    gaEvents: gaEvents,
    embedCode: embedCode,
    classes: {
      root: classes.actionsRoot,
      shareButton: classes.actionsShareButton,
      embedButton: classes.actionsEmbedButton,
      showDataButton: classes.actionsShowDataButton,
      compareButton: classes.actionsCompareButton,
      downloadButton: classes.actionsDownloadButton,
      actionButtonIconGrid: classes.actionsButtonIconGrid,
      actionButtonText: classes.actionsActionButtonText,
      verticalDivider: classes.actionsActionButtonVerticalDivider
    }
  });

  var insight = insightProp || {};
  var logo = logoProp || _logo.default;
  return _react.default.createElement("div", {
    ref: setRootNode,
    className: classes.root
  }, _react.default.createElement(_core.Grid, {
    container: true,
    className: classes.containerRoot
  }, _react.default.createElement(_core.Box, {
    display: "flex",
    flexGrow: 1,
    flexShrink: 1,
    flexWrap: "wrap",
    flexBasis: hideInsight ? '100%' : '35rem',
    padding: "1.25rem"
  }, variant === 'data' && _react.default.createElement(_core.Grid, {
    item: true,
    className: classes.highlightGrid
  }, _react.default.createElement(_core.Grid, {
    container: true,
    alignItems: "stretch",
    alignContent: "space-between"
  }, _react.default.createElement(_core.Grid, {
    item: true,
    xs: 12
  }, _react.default.createElement(_BlockLoader.default, {
    loading: loading,
    height: 300
  }, highlightChild)))), _react.default.createElement(_core.Grid, {
    item: true,
    className: classes.contentGrid
  }, _react.default.createElement(_core.Box, {
    display: "flex",
    height: "100%",
    alignItems: "flex-start",
    flexDirection: "column"
  }, _react.default.createElement(_TypographyLoader.default, {
    variant: "h5",
    loading: loading,
    className: classes.title
  }, title), _react.default.createElement(_BlockLoader.default, {
    loading: loading,
    height: 300
  }, highlightChild && _react.default.createElement(_core.Box, {
    className: classes.highlightContentChild
  }, highlightChild), _react.default.createElement(_core.Box, {
    width: "100%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    minHeight: 300,
    flexGrow: 1
  }, contentChild)))), _react.default.createElement(_core.Box, {
    width: "100%",
    marginTop: "1.25rem"
  }, _react.default.createElement(_TypographyLoader.default, {
    loading: loading,
    loader: {
      height: 20
    },
    component: "span",
    className: "".concat(classes.sourceGrid, " ").concat(_utils.DOWNLOAD_HIDDEN_CLASSNAME)
  }, source && _react.default.createElement(_A.default, {
    className: classes.sourceLink,
    href: source.href
  }, "Source: ".concat(source.title || source.href)))), (variant === 'analysis' || hideInsight) && _react.default.createElement(_core.Box, {
    width: "100%",
    display: "flex",
    justifyContent: "center",
    marginTop: "1.25rem",
    className: _utils.DOWNLOAD_HIDDEN_CLASSNAME
  }, actionsChildren)), !hideInsight && _react.default.createElement(_core.Grid, {
    item: true,
    className: classes.insightGrid
  }, _react.default.createElement(_Insight.default, {
    analysisLink: insight.analysisLink,
    classes: {
      root: classes.insight,
      actions: _utils.DOWNLOAD_HIDDEN_CLASSNAME,
      analysisLink: classes.insightAnalysis,
      dataLink: classes.insightDataLink,
      description: classes.insightDescription,
      insight: classes.insightContent,
      links: _utils.DOWNLOAD_HIDDEN_CLASSNAME,
      title: classes.insightTitle
    },
    dataLink: insight.dataLink,
    description: insight.description,
    title: insight.title,
    variant: variant,
    loading: loading
  }, variant === 'data' && actionsChildren)), dataTable && dataTable.rawData && showData && _react.default.createElement(_DataTable.default, {
    classes: classes,
    data: dataTable,
    onHide: function onHide() {
      return setShowData(false);
    }
  })), description && _react.default.createElement(_core.Grid, {
    container: true,
    alignItems: "flex-start",
    wrap: "nowrap",
    className: classes.descriptionWrapper
  }, _react.default.createElement(_core.Grid, {
    item: true
  }, _react.default.createElement(_ArrowDropUp.default, {
    color: "primary"
  })), _react.default.createElement(_core.Grid, {
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
  }, source && _react.default.createElement(_core.Typography, {
    variant: "caption"
  }, "Source ".concat(source.href))), _react.default.createElement(_core.Grid, {
    item: true,
    className: classes.attributionLogo
  }, _react.default.createElement("img", {
    src: logo,
    alt: "logo"
  }))));
}

InsightContainer.propTypes = {
  dataTable: _propTypes.default.shape({
    rawData: _propTypes2.default.arrayOf(_propTypes2.default.shape({}))
  }),
  hideInsight: _propTypes2.default.bool,
  actions: _propTypes.default.shape({
    handleShare: _propTypes.default.func,
    handleDownload: _propTypes.default.func,
    handleShowData: _propTypes.default.func,
    handleCompare: _propTypes.default.func
  }),
  children: _propTypes2.default.oneOfType([_propTypes2.default.node, _propTypes2.default.arrayOf(_propTypes2.default.twoNodeArrayType)]).isRequired,
  embedCode: _propTypes.default.string,
  gaEvents: _propTypes.default.shape({}),
  insight: _propTypes.default.shape({
    analysisLink: _propTypes.default.oneOfType([_propTypes.default.string, _propTypes.default.shape({
      href: _propTypes.default.string,
      title: _propTypes.default.string,
      variant: _propTypes.default.oneOf(['contained', 'outlined'])
    })]),
    dataLink: _propTypes.default.oneOfType([_propTypes.default.string, _propTypes.default.shape({
      href: _propTypes.default.string,
      title: _propTypes.default.string,
      variant: _propTypes.default.oneOf(['contained', 'outlined'])
    })]),
    description: _propTypes.default.string,
    title: _propTypes.default.string
  }),
  logo: _propTypes.default.string,
  description: _propTypes.default.string,
  loading: _propTypes.default.bool,
  source: _propTypes.default.shape({
    title: _propTypes.default.string,
    href: _propTypes.default.string.isRequired
  }),
  title: _propTypes.default.string.isRequired,
  variant: _propTypes.default.oneOf(['data', 'analysis'])
};
InsightContainer.defaultProps = {
  dataTable: undefined,
  hideInsight: false,
  actions: undefined,
  embedCode: undefined,
  gaEvents: undefined,
  description: undefined,
  insight: undefined,
  logo: undefined,
  loading: false,
  source: undefined,
  variant: 'data'
};
var _default = InsightContainer;
exports.default = _default;