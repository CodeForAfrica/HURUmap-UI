"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.dataProps = dataProps;
exports.deprecatedProps = deprecatedProps;
exports.renderBlocks = renderBlocks;
exports.TYPES = void 0;

var _react = _interopRequireDefault(require("react"));

var _reactDom = _interopRequireDefault(require("react-dom"));

var _lodash = require("lodash");

var _Card = _interopRequireDefault(require("@hurumap/components/Card"));

var _attributes = require("./attributes");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var TYPES = {
  HURUMAP_CARD: 'hurumap-card',
  HURUMAP_CHART: 'indicator-hurumap',
  FLOURISH_CHART: 'indicator-flourish'
};
exports.TYPES = TYPES;

function dataProps(type, _ref) {
  var _pickBy;

  var chartId = _ref.chartId,
      chartWidth = _ref.chartWidth,
      cardWidth = _ref.cardWidth,
      title = _ref.title,
      description = _ref.description,
      showInsight = _ref.showInsight,
      insightTitle = _ref.insightTitle,
      insightSummary = _ref.insightSummary,
      dataLinkTitle = _ref.dataLinkTitle,
      analysisCountry = _ref.analysisCountry,
      analysisLinkTitle = _ref.analysisLinkTitle,
      dataGeoId = _ref.dataGeoId,
      geoId = _ref.geoId,
      showStatVisual = _ref.showStatVisual,
      postId = _ref.postId,
      postType = _ref.postType;

  /**
   * NOTE:
   * - Only use *none* deprecated attributes below
   * - The order of attributes matter
   */
  return (0, _lodash.pickBy)((_pickBy = {
    id: "".concat(type, "-").concat(chartId || postId),
    style: {
      width: chartWidth || cardWidth || (type === TYPES.FLOURISH_CHART ? '100%' : undefined)
    }
  }, _defineProperty(_pickBy, _attributes.POST_ID, chartId || postId), _defineProperty(_pickBy, _attributes.POST_TYPE, postType), _defineProperty(_pickBy, _attributes.GEO_ID, geoId), _defineProperty(_pickBy, _attributes.TITLE, title), _defineProperty(_pickBy, _attributes.DESCRIPTION, description), _defineProperty(_pickBy, _attributes.SHOW_INSIGHT, showInsight), _defineProperty(_pickBy, _attributes.INSIGHT_TITLE, insightTitle), _defineProperty(_pickBy, _attributes.INSIGHT_SUMMARY, insightSummary), _defineProperty(_pickBy, _attributes.DATA_GEO_ID, dataGeoId), _defineProperty(_pickBy, _attributes.DATA_LINK_TITLE, dataLinkTitle), _defineProperty(_pickBy, _attributes.ANALYSIS_COUNTRY, analysisCountry), _defineProperty(_pickBy, _attributes.ANALYSIS_LINK_TITLE, analysisLinkTitle), _defineProperty(_pickBy, _attributes.SHOW_STAT_VISUAL, showStatVisual), _defineProperty(_pickBy, _attributes.WIDTH, chartWidth || cardWidth), _pickBy), function (v) {
    return v !== undefined && v !== null;
  });
}

function deprecatedProps(type, _ref2) {
  var _pickBy2;

  var id = _ref2.id,
      chartId = _ref2.chartId,
      chartWidth = _ref2.chartWidth,
      cardWidth = _ref2.cardWidth,
      title = _ref2.title,
      description = _ref2.description,
      showInsight = _ref2.showInsight,
      insightTitle = _ref2.insightTitle,
      insightSummary = _ref2.insightSummary,
      dataLinkTitle = _ref2.dataLinkTitle,
      analysisCountry = _ref2.analysisCountry,
      analysisLinkTitle = _ref2.analysisLinkTitle,
      dataGeoId = _ref2.dataGeoId,
      geoId = _ref2.geoId,
      showStatVisual = _ref2.showStatVisual,
      postId = _ref2.postId,
      postType = _ref2.postType;

  /**
   * NOTE:
   * - The order of attributes matter
   */
  return (0, _lodash.pickBy)((_pickBy2 = {
    id: "".concat(type, "-").concat(chartId || id),
    style: (0, _lodash.pickBy)({
      // Margins are deprecated in favor of wp align classnames
      marginLeft: type === TYPES.HURUMAP_CARD ? 10 : undefined,
      marginBottom: type === TYPES.HURUMAP_CARD ? 10 : undefined,
      width: chartWidth || cardWidth || (type === TYPES.FLOURISH_CHART ? '100%' : undefined)
    }, function (v) {
      return v !== undefined && v !== null;
    })
  }, _defineProperty(_pickBy2, _attributes.CHART_ID, chartId), _defineProperty(_pickBy2, _attributes.CHART_TITLE, title), _defineProperty(_pickBy2, _attributes.CHART_DESCRIPTION, description), _defineProperty(_pickBy2, _attributes.POST_TYPE, postType), _defineProperty(_pickBy2, _attributes.POST_ID, postId), _defineProperty(_pickBy2, _attributes.GEO_TYPE, geoId), _defineProperty(_pickBy2, _attributes.SHOW_INSIGHT, showInsight), _defineProperty(_pickBy2, _attributes.SHOW_STATVISUAL, showStatVisual), _defineProperty(_pickBy2, _attributes.INSIGHT_TITLE, insightTitle), _defineProperty(_pickBy2, _attributes.INSIGHT_SUMMARY, insightSummary), _defineProperty(_pickBy2, _attributes.DATA_LINK_TITLE, dataLinkTitle), _defineProperty(_pickBy2, _attributes.ANALYSIS_COUNTRY, analysisCountry), _defineProperty(_pickBy2, _attributes.ANALYSIS_LINK_TITLE, analysisLinkTitle), _defineProperty(_pickBy2, _attributes.DATA_GEOID, type === TYPES.HURUMAP_CHART ? dataGeoId : undefined), _defineProperty(_pickBy2, _attributes.DATA_GEO_ID, type === TYPES.FLOURISH_CHART ? dataGeoId : undefined), _defineProperty(_pickBy2, _attributes.WIDTH, chartWidth || cardWidth), _pickBy2), function (v) {
    return v !== undefined && v !== null;
  });
} // No SSR Support


function renderBlocks(_ref3) {
  var logo = _ref3.logo,
      flourishURL = _ref3.flourishURL,
      fetchDefinition = _ref3.fetchDefinition,
      fetchDefinitionUrl = _ref3.fetchDefinitionUrl;
  return _react.default.createElement(_react.default.Fragment, null, Array.from(document.querySelectorAll("div[id^=".concat(TYPES.HURUMAP_CARD, "]"))).map(function (el) {
    return _reactDom.default.createPortal(_react.default.createElement(_Card.default, {
      parentEl: el,
      logo: logo,
      fetchDefinition: fetchDefinition,
      fetchDefinitionUrl: fetchDefinitionUrl,
      id: el.getAttribute(_attributes.POST_ID),
      type: el.getAttribute(_attributes.POST_TYPE)
    }), el);
  }), Array.from(document.querySelectorAll("div[id^=".concat(TYPES.FLOURISH_CHART, "]"))).map(function (el) {
    return _reactDom.default.createPortal(_react.default.createElement(_Card.default, {
      parentEl: el,
      logo: logo,
      type: "flourish",
      flourishURL: flourishURL,
      fetchDefinition: fetchDefinition,
      fetchDefinitionUrl: fetchDefinitionUrl,
      id: el.getAttribute(_attributes.CHART_ID) || el.getAttribute(_attributes.POST_ID),
      title: el.getAttribute(_attributes.CHART_TITLE) || el.getAttribute(_attributes.TITLE),
      description: el.getAttribute(_attributes.CHART_DESCRIPTION) || el.getAttribute(_attributes.DESCRIPTION),
      showInsight: el.getAttribute(_attributes.SHOW_INSIGHT) === 'true',
      insightTitle: el.getAttribute(_attributes.INSIGHT_TITLE),
      insightSummary: el.getAttribute(_attributes.INSIGHT_SUMMARY),
      analysisLinkCountrySlug: el.getAttribute(_attributes.ANALYSIS_COUNTRY),
      analysisLinkTitle: el.getAttribute(_attributes.ANALYSIS_LINK_TITLE),
      dataLinkTitle: el.getAttribute(_attributes.ANALYSIS_LINK_TITLE),
      dataLinkGeoId: el.getAttribute(_attributes.DATA_GEOID) || el.getAttribute(_attributes.DATA_GEO_ID)
    }), el);
  }), Array.from(document.querySelectorAll("div[id^=".concat(TYPES.HURUMAP_CHART, "]"))).map(function (el) {
    return _reactDom.default.createPortal(_react.default.createElement(_Card.default, {
      parentEl: el,
      fetch: fetch,
      logo: logo,
      type: "hurumap",
      fetchDefinition: fetchDefinition,
      fetchDefinitionUrl: fetchDefinitionUrl,
      id: el.getAttribute(_attributes.CHART_ID) || el.getAttribute(_attributes.POST_ID),
      geoId: el.getAttribute(_attributes.GEO_TYPE) || el.getAttribute(_attributes.GEO_ID),
      showInsight: el.getAttribute(_attributes.SHOW_INSIGHT) === 'true',
      showStatVisual: (el.getAttribute(_attributes.SHOW_STATVISUAL) || el.getAttribute(_attributes.SHOW_STAT_VISUAL)) === 'true',
      insightTitle: el.getAttribute(_attributes.INSIGHT_TITLE),
      insightSummary: el.getAttribute(_attributes.INSIGHT_SUMMARY),
      analysisLinkCountrySlug: el.getAttribute(_attributes.ANALYSIS_COUNTRY),
      analysisLinkTitle: el.getAttribute(_attributes.ANALYSIS_LINK_TITLE),
      dataLinkTitle: el.getAttribute(_attributes.ANALYSIS_LINK_TITLE),
      dataLinkGeoId: el.getAttribute(_attributes.DATA_GEOID) || el.getAttribute(_attributes.DATA_GEO_ID)
    }), el);
  }));
}