"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _makeStyles = _interopRequireDefault(require("../../../core/src/styles/makeStyles"));

var _InsightContainer = _interopRequireDefault(require("../../../core/src/InsightContainer"));

var _propTypes = _interopRequireDefault(require("../propTypes"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

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

function ChartContainer(_ref) {
  var hideStat = _ref.hideStat,
      hideInsight = _ref.hideInsight,
      dataLinkGeoId = _ref.dataLinkGeoId,
      dataLinkTitle = _ref.dataLinkTitle,
      dataLinkHref = _ref.dataLinkHref,
      analysisLinkCountrySlug = _ref.analysisLinkCountrySlug,
      analysisLinkTitle = _ref.analysisLinkTitle,
      analysisLinkHref = _ref.analysisLinkHref,
      insightSummary = _ref.insightSummary,
      insightTitle = _ref.insightTitle,
      children = _ref.children,
      props = _objectWithoutProperties(_ref, ["hideStat", "hideInsight", "dataLinkGeoId", "dataLinkTitle", "dataLinkHref", "analysisLinkCountrySlug", "analysisLinkTitle", "analysisLinkHref", "insightSummary", "insightTitle", "children"]);

  var classes = useStyles(props);
  return _react.default.createElement(_InsightContainer.default, _extends({
    classes: classes,
    hideInsight: hideInsight,
    variant: hideInsight && hideStat ? 'analysis' : 'data',
    insight: !hideInsight ? {
      description: insightSummary,
      title: insightTitle,
      analysisLink: {
        href: typeof analysisLinkHref === 'string' ? analysisLinkHref : analysisLinkHref(analysisLinkCountrySlug),
        title: analysisLinkTitle
      },
      dataLink: {
        href: typeof dataLinkHref === 'string' ? dataLinkHref : dataLinkHref(dataLinkGeoId),
        title: dataLinkTitle
      }
    } : {}
  }, props), children);
}

ChartContainer.propTypes = {
  id: _propTypes.default.string,
  title: _propTypes.default.string,
  description: _propTypes.default.string,
  hideInsight: _propTypes.default.bool,
  hideStat: _propTypes.default.bool,
  insightSummary: _propTypes.default.string,
  insightTitle: _propTypes.default.string,
  handleShare: _propTypes.default.func,
  embedCode: _propTypes.default.string,
  dataLinkGeoId: _propTypes.default.string,
  dataLinkTitle: _propTypes.default.string,
  dataLinkHref: _propTypes.default.oneOfType([_propTypes.default.string, _propTypes.default.func]).isRequired,
  analysisLinkCountrySlug: _propTypes.default.string,
  analysisLinkTitle: _propTypes.default.string,
  analysisLinkHref: _propTypes.default.oneOfType([_propTypes.default.string, _propTypes.default.func]).isRequired,
  children: _propTypes.default.children.isRequired
};
ChartContainer.defaultProps = {
  title: undefined,
  description: undefined,
  id: undefined,
  hideStat: true,
  hideInsight: true,
  insightSummary: undefined,
  insightTitle: undefined,
  embedCode: '',
  handleShare: function handleShare() {},
  dataLinkGeoId: undefined,
  dataLinkTitle: undefined,
  analysisLinkCountrySlug: undefined,
  analysisLinkTitle: undefined
};
var _default = ChartContainer;
exports.default = _default;