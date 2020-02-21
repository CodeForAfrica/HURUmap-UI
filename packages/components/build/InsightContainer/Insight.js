"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _core = require("@material-ui/core");

var _BlockLoader = _interopRequireDefault(require("../BlockLoader"));

var _TypographyLoader = _interopRequireDefault(require("../../TypographyLoader"));

var _makeStyles = _interopRequireDefault(require("../../../common/src/makeStyles"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

var useStyles = (0, _makeStyles.default)({
  root: {
    backgroundColor: '#eeebeb'
  },
  actions: {
    marginBottom: '1.25rem'
  },
  insight: {
    padding: '0 1.25rem'
  },
  title: function title(_ref) {
    var variant = _ref.variant;
    return {
      fontWeight: 'bold',
      marginTop: variant === 'data' ? '1.5rem' : '0.9625rem'
    };
  },
  description: function description(_ref2) {
    var variant = _ref2.variant;
    return {
      backgroundColor: '#eeebeb',
      marginTop: variant === 'data' ? '0.8125rem' : '1.1875rem',
      marginBottom: '1rem'
    };
  },
  links: {},
  analysisLink: {
    borderRadius: '0.75rem',
    fontWeight: 'bold',
    padding: '1rem 0',
    marginBottom: '1rem',
    maxWidth: '20.8125rem',
    textTransform: 'none'
  },
  dataLink: {
    borderRadius: '0.75rem',
    borderWidth: '0.125rem',
    fontWeight: 'bold',
    padding: '1rem 0',
    marginBottom: '1rem',
    maxWidth: '20.8125rem',
    textTransform: 'none',
    '&:hover': {
      borderWidth: '0.125rem'
    }
  }
});

function Insight(_ref3) {
  var analysisLinkProp = _ref3.analysisLink,
      children = _ref3.children,
      dataLinkProp = _ref3.dataLink,
      description = _ref3.description,
      loading = _ref3.loading,
      title = _ref3.title,
      props = _objectWithoutProperties(_ref3, ["analysisLink", "children", "dataLink", "description", "loading", "title"]);

  var classes = useStyles(props);
  var hasInsight = analysisLinkProp || children || dataLinkProp || description || title;

  if (!hasInsight) {
    return null;
  }

  var analysisLink = analysisLinkProp && typeof analysisLinkProp === 'string' ? {
    href: analysisLinkProp
  } : analysisLinkProp;

  if (analysisLink) {
    analysisLink.variant = analysisLink.variant || 'contained';

    if (!analysisLink.title) {
      analysisLink.title = analysisLink.variant === 'contained' ? 'Read the full analysis' : 'Read the country analysis';
    }
  }

  var dataLink = dataLinkProp && typeof dataLinkProp === 'string' ? {
    href: dataLinkProp,
    title: 'View more data by topic'
  } : dataLinkProp;

  if (dataLink) {
    dataLink.variant = dataLink.variant || 'outlined';
    dataLink.title = dataLink.title || 'View more data by topic';
  }

  return _react.default.createElement(_core.Grid, {
    container: true,
    direction: "column",
    alignItems: "center",
    className: classes.root
  }, _react.default.createElement(_core.Box, {
    display: "flex",
    width: "100%",
    justifyContent: "center",
    className: classes.actions
  }, children), _react.default.createElement(_core.Box, {
    display: "flex",
    width: "100%",
    flexGrow: 1,
    alignItems: !description ? 'center' : 'flex-start'
  }, _react.default.createElement(_core.Grid, {
    container: true,
    spacing: 1,
    className: classes.insight
  }, _react.default.createElement(_core.Grid, {
    item: true,
    xs: 12
  }, title && description && _react.default.createElement(_TypographyLoader.default, {
    variant: "subtitle2",
    loading: loading,
    loader: {
      width: 150
    },
    className: classes.title
  }, title), description && _react.default.createElement(_TypographyLoader.default, {
    component: "p",
    variant: "caption",
    loading: loading,
    loader: {
      height: 80
    },
    className: classes.description
  }, description)), _react.default.createElement(_core.Grid, {
    item: true,
    xs: 12,
    container: true,
    spacing: 1,
    justify: "center",
    className: classes.links
  }, analysisLink && _react.default.createElement(_BlockLoader.default, {
    loading: loading,
    height: 40
  }, _react.default.createElement(_core.Grid, {
    item: true,
    component: _core.Box,
    flexGrow: 1,
    flexBasis: 333
  }, _react.default.createElement(_core.Grid, {
    container: true,
    justify: "center"
  }, _react.default.createElement(_core.Button, {
    fullWidth: true,
    color: "primary",
    variant: analysisLink.variant,
    className: classes.analysisLink,
    href: analysisLink.href
  }, analysisLink.title)))), dataLink && _react.default.createElement(_BlockLoader.default, {
    loading: loading,
    height: 40
  }, _react.default.createElement(_core.Grid, {
    item: true,
    component: _core.Box,
    flexGrow: 1,
    flexBasis: 333
  }, _react.default.createElement(_core.Grid, {
    container: true,
    justify: "center"
  }, _react.default.createElement(_core.Button, {
    fullWidth: true,
    color: "primary",
    variant: dataLink.variant,
    className: classes.dataLink,
    href: dataLink.href
  }, dataLink.title))))))));
}

Insight.propTypes = {
  analysisLink: _propTypes.default.oneOfType([_propTypes.default.string, _propTypes.default.shape({
    href: _propTypes.default.string,
    title: _propTypes.default.string,
    variant: _propTypes.default.oneOf(['contained', 'outlined'])
  })]),
  children: _propTypes.default.node,
  dataLink: _propTypes.default.oneOfType([_propTypes.default.string, _propTypes.default.shape({
    href: _propTypes.default.string,
    title: _propTypes.default.string,
    variant: _propTypes.default.oneOf(['contained', 'outlined'])
  })]),
  description: _propTypes.default.string,
  loading: _propTypes.default.bool,
  variant: _propTypes.default.oneOf(['data', 'analysis']),
  title: _propTypes.default.string
};
Insight.defaultProps = {
  analysisLink: undefined,
  children: undefined,
  dataLink: undefined,
  description: undefined,
  loading: false,
  title: undefined,
  variant: 'data'
};
var _default = Insight;
exports.default = _default;