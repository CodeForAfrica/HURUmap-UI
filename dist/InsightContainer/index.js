function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/styles';
import Grid from '@material-ui/core/Grid';
import { Typography } from '@material-ui/core';
import BlockLoader from '../BlockLoader';
import TypographyLoader from '../TypographyLoader';
import A from '../A';
import Actions from './Actions';
var useStyles = makeStyles(function (_ref) {
  var _analysisLink;

  var breakpoints = _ref.breakpoints;
  return {
    root: {
      width: 'available',
      height: 'auto',
      backgroundColor: '#fff'
    },
    content: {
      padding: '1.25rem 0',
      overflow: 'hidden'
    },
    button: {
      border: '0.0625rem solid #d8d8d8',
      height: '2.5rem',
      width: '2.5rem',
      '&:first-child': {
        borderRight: 'none'
      }
    },
    actionsGrid: {
      backgroundColor: '#eeebeb'
    },
    title: {
      marginTop: '1rem',
      fontWeight: 'bold',
      fontSize: '1.25rem'
    },
    subtitle: {},
    sourceLink: {},
    sourceGrid: {
      display: 'flex',
      alignItems: 'flex-end',
      marginLeft: '1rem'
    },
    analysisLink: (_analysisLink = {
      cursor: 'pointer',
      display: 'inline-flex',
      justifyContent: 'center',
      alignItems: 'center',
      padding: '1.125rem 3rem',
      textDecoration: 'none',
      outline: 'none',
      borderRadius: '0.75rem',
      color: '#29a87c',
      border: 'solid 2px #29a87c',
      backgroundColor: '#fff'
    }, _defineProperty(_analysisLink, breakpoints.up('md'), {
      padding: '1.125rem 0.8rem'
    }), _defineProperty(_analysisLink, breakpoints.up('lg'), {
      padding: '1.125rem 2.5rem'
    }), _analysisLink),
    contextGrid: {
      padding: '0 1.25rem'
    },
    contextHead: {
      fontWeight: 'bold',
      fontSize: '1rem'
    },
    contextBrief: {
      fontSize: '0.8125rem',
      lineHeight: 2
    },
    linkGrid: _defineProperty({
      margin: '3rem 0'
    }, breakpoints.up('md'), {
      margin: 0
    }),
    shareButton: {},
    compareButton: {},
    embedButton: {},
    showDataButton: {},
    downloadButton: {},
    actionButtonIconGrid: {},
    actionRoot: {},
    actionButtonVerticalDivider: {},
    actionButtonText: {}
  };
});

function InsightContainer(_ref2) {
  var loading = _ref2.loading,
      content = _ref2.content,
      source = _ref2.source,
      title = _ref2.title,
      children = _ref2.children,
      insightActions = _ref2.insightActions,
      insightContext = _ref2.insightContext,
      insightLink = _ref2.insightLink,
      gaEvents = _ref2.gaEvents,
      props = _objectWithoutProperties(_ref2, ["loading", "content", "source", "title", "children", "insightActions", "insightContext", "insightLink", "gaEvents"]);

  var classes = useStyles(props);
  var handleShare = insightActions.handleShare,
      handleCompare = insightActions.handleCompare,
      handleDownload = insightActions.handleDownload,
      handleShowData = insightActions.handleShowData;
  return React.createElement(Grid, {
    container: true,
    spacing: 4,
    className: classes.root
  }, React.createElement(Grid, {
    container: true,
    item: true,
    md: 3,
    sm: 12
  }, React.createElement(BlockLoader, {
    loading: loading
  }, children[0]), React.createElement(TypographyLoader, {
    loading: loading,
    loader: {
      primaryOpacity: 0.5,
      secondaryOpacity: 1
    },
    component: "span",
    className: classes.sourceGrid
  }, source && React.createElement(A, {
    className: classes.sourceLink,
    href: source.href
  }, "Source: ".concat(source.title || source.href, " ")))), React.createElement(Grid, {
    container: true,
    item: true,
    md: 5,
    sm: 12
  }, React.createElement(Grid, {
    item: true
  }, React.createElement(TypographyLoader, {
    loading: loading,
    loader: {
      primaryOpacity: 0.5,
      secondaryOpacity: 1
    },
    className: classes.title,
    variant: "h5"
  }, title)), React.createElement(Grid, {
    container: true,
    justify: "center",
    className: classes.content,
    style: {
      width: content.width,
      height: content.height
    }
  }, React.createElement(BlockLoader, {
    loading: loading
  }, children[1]))), React.createElement(Grid, {
    container: true,
    item: true,
    md: 4,
    sm: 12,
    className: classes.actionsGrid
  }, React.createElement(Grid, {
    container: true,
    item: true,
    direction: "row",
    alignItems: "flex-start",
    justify: "center"
  }, React.createElement(BlockLoader, {
    loading: loading,
    height: 40
  }, React.createElement(Actions, {
    onShare: handleShare,
    onDownload: handleDownload,
    onShowData: handleShowData,
    onCompare: handleCompare,
    gaEvents: gaEvents,
    classes: {
      shareButton: classes.shareButton,
      embedButton: classes.embedButton,
      showDataButton: classes.showDataButton,
      compareButton: classes.compareButton,
      downloadButton: classes.downloadButton,
      actionButtonIconGrid: classes.actionButtonIconGrid,
      actionButtonText: classes.actionButtonText,
      verticalDivider: classes.actionButtonVerticalDivider,
      root: classes.actionRoot
    }
  }))), insightContext && React.createElement(Grid, {
    container: true,
    item: true,
    className: classes.contextGrid
  }, React.createElement(BlockLoader, {
    loading: loading
  }, React.createElement(Typography, {
    className: classes.contextHead
  }, insightContext.head), React.createElement(Typography, {
    className: classes.contextBrief
  }, insightContext.brief))), insightLink && React.createElement(Grid, {
    container: true,
    item: true,
    alignItems: "flex-start",
    justify: "center",
    className: classes.linkGrid
  }, React.createElement(BlockLoader, {
    loading: loading
  }, React.createElement(A, {
    className: classes.analysisLink,
    href: insightLink.href
  }, insightLink.title)))));
} // This is a factory function (also called a higher-order function)


var createTwoNodeArrayType = function createTwoNodeArrayType(isRequired) {
  // The factory returns a custom prop type
  return function (props, propName, componentName) {
    var childrenNodes = {
      children: PropTypes.arrayOf(PropTypes.node)
    };
    var prop = props[propName];

    if (prop == null && isRequired) {
      // Prop is required but wasn't specified. Throw an error.
      return new Error("".concat(propName, " in ").concat(componentName, " isRequired"));
    } // check if not node types or not length == 2 return error


    var notNode = !PropTypes.checkPropTypes(childrenNodes, props, propName, componentName);

    if (prop.length !== 2 || notNode) {
      return new Error("".concat(propName, " in ").concat(componentName, " needs to be an array of two node"));
    }

    return null;
  };
}; // Using the factory, create two different versions of your prop type


var twoNodeArrayType = createTwoNodeArrayType(false);
twoNodeArrayType.isRequired = createTwoNodeArrayType(true);
InsightContainer.propTypes = {
  children: twoNodeArrayType.isRequired,
  title: PropTypes.string.isRequired,
  source: PropTypes.shape({
    title: PropTypes.string,
    href: PropTypes.string
  }),
  loading: PropTypes.bool,
  content: PropTypes.shape({
    width: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    height: PropTypes.oneOfType([PropTypes.number, PropTypes.string])
  }),
  insightLink: PropTypes.shape({
    href: PropTypes.string,
    title: PropTypes.string
  }),
  insightContext: PropTypes.shape({
    head: PropTypes.string,
    brief: PropTypes.string
  }),
  insightActions: PropTypes.shape({
    handleShare: PropTypes.func,
    handleDownload: PropTypes.func,
    handleShowData: PropTypes.func,
    handleCompare: PropTypes.func
  }),
  gaEvents: PropTypes.shape({})
};
InsightContainer.defaultProps = {
  source: undefined,
  loading: false,
  insightLink: {
    href: '/profiles/nigeria',
    title: 'Read the country analysis'
  },
  insightContext: undefined,
  insightActions: {
    handleShare: function handleShare() {},
    handleDownload: function handleDownload() {},
    handleShowData: function handleShowData() {},
    handleCompare: function handleCompare() {}
  },
  content: {
    width: '100%',
    height: '100%'
  },
  gaEvents: undefined
};
export default InsightContainer;