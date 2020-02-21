"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireWildcard(require("react"));

var _Grid = _interopRequireDefault(require("@material-ui/core/Grid"));

var _Typography = _interopRequireDefault(require("@material-ui/core/Typography"));

var _makeStyles = _interopRequireDefault(require("../../../core/src/styles/makeStyles"));

var _ChartFactory = _interopRequireDefault(require("../../../factory/ChartFactory"));

var _useProfileLoader = _interopRequireDefault(require("../../../factory/useProfileLoader"));

var _propTypes = _interopRequireDefault(require("../propTypes"));

var _ChartContainer = _interopRequireDefault(require("./ChartContainer"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

var useStyles = (0, _makeStyles.default)({
  statViz: {
    display: 'none'
  }
});

function HURUmapChart(_ref) {
  var geoId = _ref.geoId,
      chartId = _ref.chartId,
      charts = _ref.charts,
      propChart = _ref.chart,
      showInsight = _ref.showInsight,
      showStatVisual = _ref.showStatVisual,
      insightSummary = _ref.insightSummary,
      insightTitle = _ref.insightTitle,
      dataLinkGeoId = _ref.dataLinkGeoId,
      dataLinkTitle = _ref.dataLinkTitle,
      dataLinkHref = _ref.dataLinkHref,
      analysisLinkCountrySlug = _ref.analysisLinkCountrySlug,
      analysisLinkTitle = _ref.analysisLinkTitle,
      analysisLinkHref = _ref.analysisLinkHref,
      embedCode = _ref.embedCode,
      handleShare = _ref.handleShare,
      useLoader = _ref.useLoader,
      props = _objectWithoutProperties(_ref, ["geoId", "chartId", "charts", "chart", "showInsight", "showStatVisual", "insightSummary", "insightTitle", "dataLinkGeoId", "dataLinkTitle", "dataLinkHref", "analysisLinkCountrySlug", "analysisLinkTitle", "analysisLinkHref", "embedCode", "handleShare", "useLoader"]);

  var classes = useStyles(props);
  var chart = (0, _react.useMemo)(function () {
    return propChart || charts.find(function (c) {
      return "".concat(c.id) === chartId;
    });
  }, [propChart, charts, chartId]);
  var visuals = (0, _react.useMemo)(function () {
    return chart ? [chart.visual] : [];
  }, [chart]);

  var _useLoader = useLoader({
    geoId: geoId,
    visuals: visuals
  }),
      profiles = _useLoader.profiles,
      chartData = _useLoader.chartData;

  var source = (0, _react.useMemo)(function () {
    var isLoading = chartData.isLoading,
        profileVisualsData = chartData.profileVisualsData;

    if (!chart || isLoading) {
      return null;
    }

    var queryAlias = chart.visual.queryAlias;
    var sourceResult = profileVisualsData["".concat(queryAlias, "Source")];
    return sourceResult && sourceResult.nodes && sourceResult.nodes.length ? sourceResult.nodes[0] : null;
  }, [chart, chartData]);

  if (!chart || !chartData.isLoading && chartData.profileVisualsData[chart.visual.queryAlias] && chartData.profileVisualsData[chart.visual.queryAlias].nodes.length === 0) {
    return _react.default.createElement(_Grid.default, {
      container: true,
      justify: "center",
      alignItems: "center"
    }, _react.default.createElement(_Typography.default, null, "Data is missing for visualizing this chart."));
  }

  var rawData = !chartData.isLoading ? chartData.profileVisualsData[chart.visual.queryAlias].nodes : [];
  return _react.default.createElement(_ChartContainer.default, _extends({
    key: chart.id,
    title: chart.title,
    description: chart.description && chart.description[geoId],
    hideInsight: !showInsight,
    hideStat: !showStatVisual,
    loading: chartData.isLoading,
    classes: !showStatVisual && {
      highlightGrid: classes.statViz
    },
    source: source,
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
    analysisLinkHref: analysisLinkHref,
    dataTable: {
      tableTitle: (chart.visual.table || '').slice(3),
      groupByTitle: chart.visual.groupBy,
      dataLabelTitle: chart.visual.x,
      dataValueTitle: chart.visual.y,
      rawData: rawData
    }
  }, props), !chartData.isLoading && showStatVisual ? _react.default.createElement(_ChartFactory.default, {
    profiles: profiles,
    definition: chart.stat,
    data: rawData
  }) : _react.default.createElement("div", null), !chartData.isLoading && _react.default.createElement(_ChartFactory.default, {
    profiles: profiles,
    definition: chart.visual,
    data: rawData
  }));
}

HURUmapChart.propTypes = {
  chart: _propTypes.default.shape({
    id: _propTypes.default.string,
    published: _propTypes.default.oneOfType([_propTypes.default.string, _propTypes.default.bool]),
    title: _propTypes.default.string,
    subtitle: _propTypes.default.string,
    section: _propTypes.default.string,
    type: _propTypes.default.string,
    visual: _propTypes.default.shape({
      queryAlias: _propTypes.default.string,
      table: _propTypes.default.string,
      groupBy: _propTypes.default.string,
      x: _propTypes.default.string,
      y: _propTypes.default.string
    }),
    description: _propTypes.default.shape({}),
    stat: _propTypes.default.shape({
      queryAlias: _propTypes.default.string
    }),
    queryAlias: _propTypes.default.string
  }),
  charts: _propTypes.default.arrayOf(_propTypes.default.shape({
    id: _propTypes.default.string,
    description: _propTypes.default.shape({})
  })),
  geoId: _propTypes.default.string,
  chartId: _propTypes.default.string,
  showInsight: _propTypes.default.bool,
  showStatVisual: _propTypes.default.bool,
  insightSummary: _propTypes.default.string,
  insightTitle: _propTypes.default.string,
  dataLinkGeoId: _propTypes.default.string,
  dataLinkTitle: _propTypes.default.string,
  dataLinkHref: _propTypes.default.oneOfType([_propTypes.default.string, _propTypes.default.func]),
  analysisLinkCountrySlug: _propTypes.default.string,
  analysisLinkTitle: _propTypes.default.string,
  analysisLinkHref: _propTypes.default.oneOfType([_propTypes.default.string, _propTypes.default.func]),
  embedCode: _propTypes.default.string,
  handleShare: _propTypes.default.func,
  useLoader: _propTypes.default.func
};
HURUmapChart.defaultProps = {
  chart: undefined,
  charts: [],
  geoId: undefined,
  chartId: undefined,
  showInsight: undefined,
  showStatVisual: undefined,
  insightSummary: undefined,
  insightTitle: undefined,
  dataLinkGeoId: undefined,
  dataLinkTitle: undefined,
  dataLinkHref: function dataLinkHref(geoId) {
    return "/profiles/".concat(geoId);
  },
  analysisLinkCountrySlug: undefined,
  analysisLinkTitle: undefined,
  analysisLinkHref: function analysisLinkHref(countrySlug) {
    return "/profiles/".concat(countrySlug);
  },
  embedCode: '',
  handleShare: function handleShare() {},
  useLoader: _useProfileLoader.default
};
var _default = HURUmapChart;
exports.default = _default;