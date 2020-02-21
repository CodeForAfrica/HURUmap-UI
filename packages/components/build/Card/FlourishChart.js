"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _makeStyles = _interopRequireDefault(require("../../../core/src/styles/makeStyles"));

var _propTypes = _interopRequireDefault(require("../propTypes"));

var _ChartContainer = _interopRequireDefault(require("./ChartContainer"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

var useStyles = (0, _makeStyles.default)({
  iframe: {
    width: '100%'
  },
  statViz: {
    display: 'none'
  }
});

function FlourishChart(_ref) {
  var src = _ref.src,
      title = _ref.title,
      description = _ref.description,
      chartId = _ref.chartId,
      iframeKey = _ref.iframeKey,
      showInsight = _ref.showInsight,
      insightSummary = _ref.insightSummary,
      insightTitle = _ref.insightTitle,
      dataLinkGeoId = _ref.dataLinkGeoId,
      dataLinkTitle = _ref.dataLinkTitle,
      dataLinkHref = _ref.dataLinkHref,
      analysisLinkCountrySlug = _ref.analysisLinkCountrySlug,
      analysisLinkTitle = _ref.analysisLinkTitle,
      analysisLinkHref = _ref.analysisLinkHref,
      handleShare = _ref.handleShare,
      embedCode = _ref.embedCode,
      props = _objectWithoutProperties(_ref, ["src", "title", "description", "chartId", "iframeKey", "showInsight", "insightSummary", "insightTitle", "dataLinkGeoId", "dataLinkTitle", "dataLinkHref", "analysisLinkCountrySlug", "analysisLinkTitle", "analysisLinkHref", "handleShare", "embedCode"]);

  var classes = useStyles(props);
  return _react.default.createElement(_ChartContainer.default, {
    key: chartId // Always hide stat visual for flourish
    ,
    classes: {
      highlightGrid: classes.statViz
    } // No loader design for flourish
    ,
    loading: false,
    hideStat: !showInsight,
    hideInsight: !showInsight,
    title: title,
    description: description,
    embedCode: embedCode,
    actions: {
      handleShare: handleShare
    },
    insightSummary: insightSummary,
    insightTitle: insightTitle,
    dataLinkGeoId: dataLinkGeoId,
    dataLinkTitle: dataLinkTitle,
    dataLinkHref: dataLinkHref,
    analysisLinkCountrySlug: analysisLinkCountrySlug,
    analysisLinkTitle: analysisLinkTitle,
    analysisLinkHref: analysisLinkHref
  }, _react.default.createElement("div", null), _react.default.createElement("iframe", {
    id: "data-indicator-".concat(chartId),
    key: iframeKey,
    frameBorder: "0",
    scrolling: "no",
    title: title,
    src: typeof src === 'string' ? src : src(chartId),
    className: classes.iframe
  }));
}

FlourishChart.propTypes = {
  title: _propTypes.default.string,
  description: _propTypes.default.string,
  chartId: _propTypes.default.string,
  iframeKey: _propTypes.default.number,
  showInsight: _propTypes.default.bool,
  insightSummary: _propTypes.default.string,
  insightTitle: _propTypes.default.string,
  handleShare: _propTypes.default.func,
  embedCode: _propTypes.default.string,
  dataLinkGeoId: _propTypes.default.string,
  dataLinkTitle: _propTypes.default.string,
  dataLinkHref: _propTypes.default.oneOfType([_propTypes.default.string, _propTypes.default.func]),
  analysisLinkCountrySlug: _propTypes.default.string,
  analysisLinkTitle: _propTypes.default.string,
  analysisLinkHref: _propTypes.default.oneOfType([_propTypes.default.string, _propTypes.default.func]),
  src: _propTypes.default.oneOfType([_propTypes.default.string, _propTypes.default.func]).isRequired
};
FlourishChart.defaultProps = {
  title: undefined,
  description: undefined,
  chartId: undefined,
  iframeKey: undefined,
  showInsight: undefined,
  insightSummary: undefined,
  insightTitle: undefined,
  embedCode: '',
  handleShare: function handleShare() {},
  dataLinkGeoId: undefined,
  dataLinkTitle: undefined,
  dataLinkHref: function dataLinkHref(geoId) {
    return "/profiles/".concat(geoId);
  },
  analysisLinkCountrySlug: undefined,
  analysisLinkTitle: undefined,
  analysisLinkHref: function analysisLinkHref(countrySlug) {
    return "/profiles/".concat(countrySlug);
  }
};
var _default = FlourishChart;
exports.default = _default;