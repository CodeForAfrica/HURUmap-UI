"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = Card;

var _react = _interopRequireWildcard(require("react"));

var _Snippet = _interopRequireDefault(require("../../../core/src/Snippet"));

var _FlourishChart = _interopRequireDefault(require("./FlourishChart"));

var _HURUmapChart = _interopRequireDefault(require("./HURUmapChart"));

var _utils = require("../utils");

var _propTypes = _interopRequireDefault(require("../propTypes"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { if (!(Symbol.iterator in Object(arr) || Object.prototype.toString.call(arr) === "[object Arguments]")) { return; } var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

function Card(_ref) {
  var id = _ref.id,
      logo = _ref.logo,
      type = _ref.type,
      title = _ref.title,
      description = _ref.description,
      showInsight = _ref.showInsight,
      insightSummary = _ref.insightSummary,
      insightTitle = _ref.insightTitle,
      dataLinkGeoId = _ref.dataLinkGeoId,
      dataLinkTitle = _ref.dataLinkTitle,
      dataLinkHref = _ref.dataLinkHref,
      analysisLinkCountrySlug = _ref.analysisLinkCountrySlug,
      analysisLinkTitle = _ref.analysisLinkTitle,
      analysisLinkHref = _ref.analysisLinkHref,
      showStatVisual = _ref.showStatVisual,
      propDefinition = _ref.definition,
      embedCode = _ref.embedCode,
      geoId = _ref.geoId,
      chartWidth = _ref.chartWidth,
      parentEl = _ref.parentEl,
      flourishURL = _ref.flourishURL,
      fetchDefinition = _ref.fetchDefinition,
      fetchDefinitionUrl = _ref.fetchDefinitionUrl,
      shareEndPoint = _ref.shareEndPoint,
      props = _objectWithoutProperties(_ref, ["id", "logo", "type", "title", "description", "showInsight", "insightSummary", "insightTitle", "dataLinkGeoId", "dataLinkTitle", "dataLinkHref", "analysisLinkCountrySlug", "analysisLinkTitle", "analysisLinkHref", "showStatVisual", "definition", "embedCode", "geoId", "chartWidth", "parentEl", "flourishURL", "fetchDefinition", "fetchDefinitionUrl", "shareEndPoint"]);

  var _useState = (0, _react.useState)(),
      _useState2 = _slicedToArray(_useState, 2),
      definition = _useState2[0],
      setDefinition = _useState2[1];

  (0, _react.useEffect)(function () {
    if (fetchDefinition) {
      fetchDefinition(type, id).then(setDefinition);
    } else if (fetchDefinitionUrl) {
      fetch(typeof fetchDefinitionUrl === 'string' ? fetchDefinitionUrl : fetchDefinitionUrl(type, id)).then(function (res) {
        return res.json();
      }).then(setDefinition);
    } else {
      setDefinition(propDefinition);
    }
  }, [id, type, fetchDefinition, fetchDefinitionUrl, propDefinition]);

  switch (type) {
    case 'flourish':
      return _react.default.createElement(_FlourishChart.default, _extends({
        logo: logo,
        chartId: id,
        dataGeoId: dataLinkGeoId,
        title: title || definition && definition.title,
        description: description || definition && definition.description,
        showInsight: showInsight,
        insightSummary: insightSummary,
        insightTitle: insightTitle,
        dataLinkTitle: dataLinkTitle,
        analysisLinkCountrySlug: analysisLinkCountrySlug,
        analysisLinkTitle: analysisLinkTitle,
        dataLinkHref: dataLinkHref,
        analysisLinkHref: analysisLinkHref // eslint-disable-next-line react/jsx-no-bind
        ,
        handleShare: _utils.shareIndicator.bind(null, id, geoId, shareEndPoint),
        embedCode: typeof embedCode === 'string' ? embedCode : embedCode(type, {
          title: title || definition && definition.title,
          id: id
        }),
        src: flourishURL
      }, props));

    case 'hurumap':
      return _react.default.createElement(_HURUmapChart.default, _extends({
        logo: logo,
        geoId: geoId,
        chartId: id,
        chartWidth: chartWidth,
        dataGeoId: dataLinkGeoId,
        showInsight: showInsight,
        showStatVisual: showStatVisual,
        insightSummary: insightSummary,
        insightTitle: insightTitle,
        dataLinkTitle: dataLinkTitle,
        analysisCountry: analysisLinkCountrySlug,
        analysisLinkTitle: analysisLinkTitle,
        dataLinkHref: dataLinkHref,
        analysisLinkHref: analysisLinkHref // eslint-disable-next-line react/jsx-no-bind
        ,
        handleShare: _utils.shareIndicator.bind(null, id, geoId, shareEndPoint),
        chart: definition && _objectSpread({}, definition, {
          visual: _objectSpread({}, definition.visual, {
            queryAlias: definition.visual.queryAlias || "viz".concat(id)
          }),
          stat: _objectSpread({}, definition.stat, {
            queryAlias: definition.visual.queryAlias || "viz".concat(id)
          })
        }),
        embedCode: typeof embedCode === 'string' ? embedCode : embedCode(type, {
          title: title || definition && definition.title,
          id: id,
          geoId: geoId
        })
      }, props));

    case 'snippet':
      return _react.default.createElement(_Snippet.default, _extends({
        fullWidth: true,
        onExpand: function onExpand(expanded) {
          if (!parentEl) {
            return;
          } // eslint-disable-next-line no-param-reassign


          parentEl.style.width = !expanded ? parentEl.getAttribute('data-width') : '100%';
          parentEl.firstChild.scrollIntoView();
        },
        embed: {
          title: "Embed ".concat(definition && definition.title && definition.title.rendered),
          subtitle: 'Copy the code below, then paste into your own CMS or HTML.',
          code: typeof embedCode === 'string' ? embedCode : embedCode(type, {
            title: definition && definition.title && definition.title.rendered,
            id: id
          })
        },
        post: definition && {
          title: definition.title && definition.title.rendered,
          content: definition.content && definition.content.rendered
        }
      }, props));

    default:
      return null;
  }
}

Card.propTypes = {
  type: _propTypes.default.oneOf(['hurumap', 'flourish', 'snippet']).isRequired,
  parentEl: _propTypes.default.shape({
    style: _propTypes.default.shape({
      width: _propTypes.default.string
    }),
    getAttribute: _propTypes.default.func,
    firstChild: _propTypes.default.shape({
      scrollIntoView: _propTypes.default.func
    })
  }),
  id: _propTypes.default.string.isRequired,
  title: _propTypes.default.string,
  showInsight: _propTypes.default.bool,
  insightSummary: _propTypes.default.string,
  insightTitle: _propTypes.default.string,
  description: _propTypes.default.string,
  dataLinkGeoId: _propTypes.default.string,
  dataLinkTitle: _propTypes.default.string,
  dataLinkHref: _propTypes.default.oneOfType([_propTypes.default.string, _propTypes.default.func]),
  analysisLinkCountrySlug: _propTypes.default.string,
  analysisLinkTitle: _propTypes.default.string,
  analysisLinkHref: _propTypes.default.oneOfType([_propTypes.default.string, _propTypes.default.func]),
  flourishURL: _propTypes.default.oneOfType([_propTypes.default.string, _propTypes.default.func]),
  definition: _propTypes.default.shape({
    title: _propTypes.default.oneOfType([_propTypes.default.string, _propTypes.default.shape({
      rendered: _propTypes.default.string
    })]),
    content: _propTypes.default.oneOfType([_propTypes.default.string, _propTypes.default.shape({
      rendered: _propTypes.default.string
    })]),
    description: _propTypes.default.oneOfType([_propTypes.default.shape({}), _propTypes.default.string]),
    visual: _propTypes.default.shape({
      queryAlias: _propTypes.default.string
    }),
    stat: _propTypes.default.shape({})
  }),
  embedCode: _propTypes.default.oneOfType([_propTypes.default.string, _propTypes.default.func]),
  showStatVisual: _propTypes.default.bool,
  chartWidth: _propTypes.default.string,
  geoId: _propTypes.default.string,
  fetchDefinition: _propTypes.default.func,
  fetchDefinitionUrl: _propTypes.default.oneOfType([_propTypes.default.string, _propTypes.default.func]),
  logo: _propTypes.default.string,
  shareEndPoint: _propTypes.default.string
};
Card.defaultProps = {
  logo: undefined,
  parentEl: undefined,
  definition: undefined,
  showStatVisual: false,
  showInsight: false,
  insightSummary: '',
  insightTitle: '',
  chartWidth: '',
  geoId: '',
  title: '',
  description: undefined,
  dataLinkGeoId: undefined,
  dataLinkTitle: undefined,
  analysisLinkCountrySlug: undefined,
  analysisLinkTitle: undefined,
  fetchDefinition: undefined,
  fetchDefinitionUrl: undefined,
  dataLinkHref: function dataLinkHref(geoId) {
    return "/profiles/".concat(geoId);
  },
  analysisLinkHref: function analysisLinkHref(countrySlug) {
    return "/profiles/".concat(countrySlug);
  },
  flourishURL: function flourishURL(id) {
    return "/wp-json/hurumap-data/flourish/".concat(id, "/");
  },
  embedCode: function embedCode(type, _ref2) {
    var _ref2$baseUrl = _ref2.baseUrl,
        baseUrl = _ref2$baseUrl === void 0 ? typeof window !== 'undefined' ? window.location.origin : '' : _ref2$baseUrl,
        _ref2$title = _ref2.title,
        title = _ref2$title === void 0 ? '' : _ref2$title,
        geoId = _ref2.geoId,
        id = _ref2.id;

    switch (type) {
      case 'hurumap':
        return "\n        <iframe title=\"".concat(title, "\" \n            src=\"").concat(baseUrl, "/embed/hurumap/").concat(geoId, "/").concat(id, "\" />\n        ");

      case 'flourish':
        return "\n        <iframe title=\"".concat(title, "\" \n            src=\"").concat(baseUrl, "/embed/flourish/").concat(id, "\" />\n        ");

      case 'snippet':
        return "\n        <iframe title=\"".concat(title, "\" \n            src=\"").concat(baseUrl, "/embed/card/").concat(type, "/").concat(id, "\" />\n        ");

      default:
        return '';
    }
  },
  shareEndPoint: undefined
};