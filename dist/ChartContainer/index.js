function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/styles';
import { ButtonBase } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import BlockLoader from '../BlockLoader';
import TypographyLoader from '../TypographyLoader';
import A from '../A';
import EmbedDropDown from './EmbedDropDown';
import ShareDropDown from './ShareDropDown';
import compareIcon from '../assets/icons/compare.svg';
import dataIcon from '../assets/icons/tablet-reader.svg';
import downloadIcon from '../assets/icons/download.svg';
import embedIcon from '../assets/icons/code.svg';
import shareIcon from '../assets/icons/network-connection.svg';
var useStyles = makeStyles({
  root: {
    width: 'available',
    height: 'auto',
    backgroundColor: '#fff',
    padding: '1.5625rem 1.25rem'
  },
  content: {
    padding: '1.25rem 0',
    overflow: 'hidden'
  },
  button: {
    border: '0.0625rem solid #d8d8d8',
    marginLeft: '-0.0625rem',
    height: '2.5rem',
    width: '2.5rem'
  },
  title: {},
  subtitle: {},
  sourceLink: {
    marginLeft: '50px'
  },
  embedRoot: {},
  embedTitle: {},
  embedSubtitle: {},
  embedCode: {},
  embedDropDownRoot: {},
  embedDropDownPaper: {},
  shareRoot: {},
  shareSource: {},
  shareExplore: {},
  shareDropDownRoot: {},
  shareDropDownPaper: {}
});

function ChartContainer(_ref) {
  var children = _ref.children,
      content = _ref.content,
      embed = _ref.embed,
      loading = _ref.loading,
      onClickCompare = _ref.onClickCompare,
      onClickData = _ref.onClickData,
      onClickDownload = _ref.onClickDownload,
      onClickEmbedProp = _ref.onClickEmbed,
      onClickShareProp = _ref.onClickShare,
      sourceLink = _ref.sourceLink,
      sourceTitle = _ref.sourceTitle,
      title = _ref.title,
      subtitle = _ref.subtitle,
      props = _objectWithoutProperties(_ref, ["children", "content", "embed", "loading", "onClickCompare", "onClickData", "onClickDownload", "onClickEmbed", "onClickShare", "sourceLink", "sourceTitle", "title", "subtitle"]);

  var classes = useStyles(props);

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

  var compareButtonRef = React.useRef(null);
  var dataButtonRef = React.useRef(null);
  var downloadButtonRef = React.useRef(null);

  var _React$useState = React.useState(null),
      _React$useState2 = _slicedToArray(_React$useState, 2),
      embedAnchorEl = _React$useState2[0],
      setEmbedAnchorEl = _React$useState2[1];

  var embedButtonRef = React.useRef(null);

  var _React$useState3 = React.useState(null),
      _React$useState4 = _slicedToArray(_React$useState3, 2),
      embedDropDown = _React$useState4[0],
      setEmbedDropDown = _React$useState4[1];

  var handleCloseEmbed = function handleCloseEmbed() {
    return setEmbedAnchorEl(null);
  };

  useEffect(function () {
    if (typeof onClickEmbedProp === 'undefined') {
      var dropDown = embedAnchorEl ? React.createElement(EmbedDropDown, {
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
  var shareButtonRef = React.useRef(null);

  var _React$useState5 = React.useState(null),
      _React$useState6 = _slicedToArray(_React$useState5, 2),
      shareAnchorEl = _React$useState6[0],
      setShareAnchorEl = _React$useState6[1];

  var _React$useState7 = React.useState(null),
      _React$useState8 = _slicedToArray(_React$useState7, 2),
      shareDropDown = _React$useState8[0],
      setShareDropDown = _React$useState8[1];

  var handleCloseShare = function handleCloseShare() {
    return setShareAnchorEl(null);
  };

  useEffect(function () {
    if (typeof onClickShareProp === 'undefined') {
      var dropDown = shareAnchorEl ? React.createElement(ShareDropDown, {
        anchorEl: shareAnchorEl,
        onClose: handleCloseShare,
        sourceLink: sourceLink,
        sourceTitle: sourceTitle,
        classes: {
          root: classes.shareRoot,
          source: classes.shareSource,
          explore: classes.shareExplore,
          dropDownRoot: classes.shareDropDownRoot,
          dropDownPaper: classes.shareDropDownPaper
        }
      }, "Explore Data") : null;
      setShareDropDown(dropDown);
    }
  }, [classes, onClickShareProp, shareAnchorEl, sourceLink, sourceTitle]);

  var onClickEmbed = onClickEmbedProp || typeof onClickEmbedProp === 'undefined' && function (anchorEl) {
    setShareAnchorEl(null);
    setEmbedAnchorEl(anchorEl);
  };

  var onClickShare = onClickShareProp || typeof onClickShareProp === 'undefined' && function (anchorEl) {
    setEmbedAnchorEl(null);
    setShareAnchorEl(anchorEl);
  };

  return React.createElement(Grid, {
    container: true,
    className: classes.root
  }, React.createElement(Grid, {
    container: true,
    wrap: "nowrap",
    direction: "row",
    alignItems: "flex-start",
    justify: "space-between"
  }, React.createElement(Grid, {
    item: true,
    xs: 8
  }, React.createElement(TypographyLoader, {
    loading: loading,
    loader: {
      primaryOpacity: 0.5,
      secondaryOpacity: 1
    },
    className: classes.title,
    variant: "h5"
  }, title), React.createElement(TypographyLoader, {
    loading: loading,
    loader: {
      primaryOpacity: 0.5,
      secondaryOpacity: 1
    },
    className: classes.subtitle,
    variant: "h6"
  }, subtitle)), React.createElement(Grid, {
    item: true,
    xs: 4,
    container: true,
    wrap: "nowrap",
    direction: "row",
    justify: "flex-end"
  }, onClickShare && React.createElement(BlockLoader, {
    loading: loading,
    width: 40,
    height: 40
  }, React.createElement(ButtonBase, {
    className: classes.button,
    onClick: function onClick() {
      return onClickShare(getReferenceObject(shareButtonRef));
    },
    ref: shareButtonRef
  }, React.createElement("img", {
    alt: "Share",
    src: shareIcon
  }))), onClickDownload && React.createElement(BlockLoader, {
    loading: loading,
    width: 40,
    height: 40
  }, React.createElement(ButtonBase, {
    className: classes.button,
    onClick: function onClick() {
      return onClickDownload(getReferenceObject(downloadButtonRef));
    },
    ref: downloadButtonRef
  }, React.createElement("img", {
    alt: "Download",
    src: downloadIcon
  }))), onClickEmbed && React.createElement(BlockLoader, {
    loading: loading,
    width: 40,
    height: 40
  }, React.createElement(ButtonBase, {
    className: classes.button,
    onClick: function onClick() {
      return onClickEmbed(getReferenceObject(embedButtonRef));
    },
    ref: embedButtonRef
  }, React.createElement("img", {
    alt: "Embed",
    src: embedIcon
  }))), onClickCompare && React.createElement(BlockLoader, {
    loading: loading,
    width: 40,
    height: 40
  }, React.createElement(ButtonBase, {
    className: classes.button,
    onClick: function onClick() {
      return onClickCompare(getReferenceObject(compareButtonRef));
    },
    ref: compareButtonRef
  }, React.createElement("img", {
    alt: "Compare",
    src: compareIcon
  }))), onClickData && React.createElement(BlockLoader, {
    loading: loading,
    width: 40,
    height: 40
  }, React.createElement(ButtonBase, {
    className: classes.button,
    onClick: function onClick() {
      return onClickData(getReferenceObject(dataButtonRef));
    },
    ref: dataButtonRef
  }, React.createElement("img", {
    alt: "Show Data",
    src: dataIcon
  }))), embedDropDown, shareDropDown)), React.createElement(Grid, {
    container: true,
    justify: "center",
    className: classes.content,
    style: {
      width: content.width,
      height: content.height
    }
  }, React.createElement("div", {
    style: {
      width: loading && '100%',
      height: '100%'
    }
  }, React.createElement(BlockLoader, {
    loading: loading
  }, children), React.createElement(TypographyLoader, {
    loading: loading,
    loader: {
      primaryOpacity: 0.5,
      secondaryOpacity: 1
    },
    component: "span"
  }, sourceLink && React.createElement(A, {
    className: classes.sourceLink,
    href: sourceLink
  }, "Source: ".concat(sourceTitle || sourceLink))))));
}

ChartContainer.propTypes = {
  embed: PropTypes.shape({
    title: PropTypes.string.isRequired,
    subtitle: PropTypes.string,
    code: PropTypes.string
  }),
  children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node]).isRequired,
  onClickCompare: PropTypes.func,
  onClickData: PropTypes.func,
  onClickDownload: PropTypes.func,
  onClickEmbed: PropTypes.func,
  onClickShare: PropTypes.func,
  subtitle: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  sourceLink: PropTypes.string,
  sourceTitle: PropTypes.string,
  loading: PropTypes.bool,
  content: PropTypes.shape({
    width: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    height: PropTypes.oneOfType([PropTypes.number, PropTypes.string])
  })
};
ChartContainer.defaultProps = {
  embed: {
    title: 'Embed code for this chart',
    subtitle: 'Copy the code below, then paste into your own CMS or HTML. Embedded charts are responsive to your page width, and have been tested in Firefox, Safari, Chrome, and Edge.',
    code: "<iframe\nid=\"cr-embed-region-11-literacy_and_numeracy_tests-english_test_dist\"\nclassName=\"census-reporter-embed\"\nsrc=\"https://tanzania.hurumap.org/embed/iframe.html?geoID=region-11&geoVersion=2009&chartDataID=literacy_and_numeracy_tests-english_test_dist&dataYear=2015&chartType=pie&chartHeight=200&chartQualifier=&chartRelease=Uwezo+Annual+Assessment+Report+2015&chartSourceTitle=&chartSourceLink=&chartTitle=Percentage+of+children+aged+6-16+passing+English+literacy+tests&chartSubtitle=&initialSort=-value&statType=percentage\"\nframeBorder=\"0\"\nwidth=\"100%\"\nheight=\"300\"\nstyle=\"margin: 1em; max-width: 18.75rem;\"\n/>\n<script src=\"https://tanzania.hurumap.org/static/js/embed.chart.make.js\" />"
  },
  onClickCompare: undefined,
  onClickData: undefined,
  onClickDownload: undefined,
  onClickEmbed: undefined,
  onClickShare: undefined,
  sourceLink: undefined,
  sourceTitle: undefined,
  loading: false,
  content: {
    width: '100%',
    height: '100%'
  }
};
export default ChartContainer;