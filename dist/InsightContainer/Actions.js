function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

import React, { createRef, useEffect, Fragment, useState } from 'react';
import { PropTypes } from 'prop-types';
import { makeStyles } from '@material-ui/styles';
import { IconButton, Typography, Grid, Popover } from '@material-ui/core';
import shareIcon from '../assets/icons/network-connection.svg';
import embedIcon from '../assets/icons/code.svg';
import downloadIcon from '../assets/icons/download.svg';
import compareIcon from '../assets/icons/compare.svg';
import showIcon from '../assets/icons/tablet-reader.svg';
var useStyles = makeStyles(function (_ref) {
  var _button;

  var breakpoints = _ref.breakpoints;
  return {
    root: {
      backgroundColor: 'white',
      borderRadius: '0.625rem',
      width: 'fit-content',
      clear: 'both',
      display: 'flex',
      height: '3.563rem',
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      marginTop: '0.6rem'
    },
    button: (_button = {
      height: '100%',
      borderRadius: '0',
      '&:hover': {
        backgroundColor: 'transparent'
      }
    }, _defineProperty(_button, breakpoints.up('md'), {
      padding: '0.25rem'
    }), _defineProperty(_button, breakpoints.up('lg'), {
      padding: '0.625rem'
    }), _button),
    actionButtonText: {
      fontSize: '0.6rem',
      fontWeight: 'bold',
      fontStyle: 'normal',
      fontStretch: 'normal',
      lineHeight: 'normal',
      letterSpacing: '0.019rem'
    },
    verticalDivider: {
      width: '0.07rem',
      height: '1.913rem',
      backgroundColor: '#eaeaea'
    },
    iconGrid: {
      height: '2.1875rem'
    },
    shareButton: {},
    compareButton: {},
    embedButton: {},
    showDataButton: {},
    downloadButton: {}
  };
});

function ActionButton(_ref2) {
  var children = _ref2.children,
      onClick = _ref2.onClick,
      _ref2$gaEvents = _ref2.gaEvents,
      gaOn = _ref2$gaEvents.gaOn,
      gaEventAction = _ref2$gaEvents.gaEventAction,
      gaEventCategory = _ref2$gaEvents.gaEventCategory,
      gaEventLabel = _ref2$gaEvents.gaEventLabel,
      props = _objectWithoutProperties(_ref2, ["children", "onClick", "gaEvents"]);

  var classes = useStyles(props);
  return React.createElement(IconButton, _extends({
    className: classes.button,
    onClick: onClick,
    "ga-on": gaOn,
    "ga-event-category": gaEventCategory,
    "ga-event-action": gaEventAction,
    "ga-event-label": gaEventLabel
  }, props), React.createElement(Grid, {
    component: "span",
    container: true,
    direction: "column",
    justify: "space-between",
    alignItems: "center",
    className: classes.iconGrid
  }, children));
}

ActionButton.propTypes = {
  onClick: PropTypes.func,
  children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node]).isRequired,
  gaEvents: PropTypes.shape({
    gaOn: PropTypes.string,
    gaEventCategory: PropTypes.string,
    gaEventAction: PropTypes.string,
    gaEventLabel: PropTypes.string
  })
};
ActionButton.defaultProps = {
  onClick: null,
  gaEvents: {
    gaOn: undefined,
    gaEventCategory: undefined,
    gaEventAction: undefined,
    gaEventLabel: undefined
  }
};

var EmbedCodeTextArea = function EmbedCodeTextArea(_ref3) {
  var code = _ref3.code;
  var ref = createRef();
  useEffect(function () {
    if (ref.current) {
      var textArea = ref.current;
      textArea.style.height = 'inherit';
      var computed = window.getComputedStyle(textArea);
      var height = parseInt(computed.getPropertyValue('border-top-width'), 10) + parseInt(computed.getPropertyValue('padding-top'), 10) + textArea.scrollHeight + parseInt(computed.getPropertyValue('border-bottom-width'), 10) + parseInt(computed.getPropertyValue('padding-bottom'), 10);
      textArea.style.height = "".concat(height, "px");
    }
  }, [ref]);
  return React.createElement("textarea", {
    ref: ref,
    readOnly: true,
    style: {
      resize: 'none',
      width: '25rem',
      margin: '1.25rem',
      border: 'none',
      outline: 'none'
    },
    value: code
  });
};

EmbedCodeTextArea.propTypes = {
  code: PropTypes.string.isRequired
};

function Actions(_ref4) {
  var onShare = _ref4.onShare,
      onDownload = _ref4.onDownload,
      onShowData = _ref4.onShowData,
      onCompare = _ref4.onCompare,
      embedCode = _ref4.embedCode,
      _ref4$gaEvents = _ref4.gaEvents,
      share = _ref4$gaEvents.share,
      embed = _ref4$gaEvents.embed,
      showData = _ref4$gaEvents.showData,
      download = _ref4$gaEvents.download,
      compare = _ref4$gaEvents.compare,
      props = _objectWithoutProperties(_ref4, ["onShare", "onDownload", "onShowData", "onCompare", "embedCode", "gaEvents"]);

  var classes = useStyles(props);

  var _useState = useState(null),
      _useState2 = _slicedToArray(_useState, 2),
      anchorEl = _useState2[0],
      setAnchorEl = _useState2[1];

  var handleEmbed = function handleEmbed(event) {
    setAnchorEl(event.currentTarget);
  };

  return React.createElement("div", {
    container: true,
    className: classes.root
  }, onShare && React.createElement(ActionButton, {
    gaEvents: share,
    onClick: onShare,
    classes: {
      button: classes.shareButton,
      iconGrid: classes.actionButtonIconGrid
    }
  }, React.createElement("img", {
    alt: "",
    src: shareIcon
  }), React.createElement(Typography, {
    className: classes.actionButtonText
  }, "Share")), onDownload && React.createElement(Fragment, null, React.createElement("div", {
    className: classes.verticalDivider
  }), React.createElement(ActionButton, {
    gaEvents: download,
    onClick: onDownload,
    classes: {
      button: classes.downloadButton,
      iconGrid: classes.actionButtonIconGrid
    }
  }, React.createElement("img", {
    alt: "",
    src: downloadIcon
  }), React.createElement(Typography, {
    className: classes.actionButtonText
  }, "Download"))), embedCode && React.createElement(Fragment, null, React.createElement("div", {
    className: classes.verticalDivider
  }), React.createElement(ActionButton, {
    gaEvents: embed,
    onClick: handleEmbed,
    classes: {
      button: classes.embedButton,
      iconGrid: classes.actionButtonIconGrid
    }
  }, React.createElement("img", {
    alt: "",
    src: embedIcon
  }), React.createElement(Typography, {
    className: classes.actionButtonText
  }, "Embed"))), onCompare && React.createElement(Fragment, null, React.createElement("div", {
    className: classes.verticalDivider
  }), React.createElement(ActionButton, {
    gaEvents: compare,
    onClick: onCompare,
    classes: {
      button: classes.compareButton,
      iconGrid: classes.actionButtonIconGrid
    }
  }, React.createElement("img", {
    alt: "",
    src: compareIcon
  }), React.createElement(Typography, {
    className: classes.actionButtonText
  }, "Compare"))), onShowData && React.createElement(Fragment, null, React.createElement("div", {
    className: classes.verticalDivider
  }), React.createElement(ActionButton, {
    gaEvents: showData,
    onClick: onShowData,
    classes: {
      button: classes.showDataButton,
      iconGrid: classes.actionButtonIconGrid
    }
  }, React.createElement("img", {
    alt: "",
    src: showIcon
  }), React.createElement(Typography, {
    className: classes.actionButtonText
  }, "Show Data"))), React.createElement(Popover, {
    open: Boolean(anchorEl),
    onClose: function onClose() {
      return setAnchorEl(null);
    },
    anchorEl: anchorEl,
    anchorOrigin: {
      vertical: 'top',
      horizontal: 'center'
    },
    transformOrigin: {
      vertical: 'bottom',
      horizontal: 'center'
    }
  }, React.createElement(EmbedCodeTextArea, {
    code: embedCode
  })));
}

Actions.propTypes = {
  onDownload: PropTypes.func,
  onShare: PropTypes.func,
  onShowData: PropTypes.func,
  embedCode: PropTypes.string,
  onCompare: PropTypes.func,
  gaEvents: PropTypes.shape({
    share: PropTypes.shape({}),
    download: PropTypes.shape({}),
    compare: PropTypes.shape({}),
    showData: PropTypes.shape({}),
    embed: PropTypes.shape({})
  })
};
Actions.defaultProps = {
  onDownload: null,
  onShare: null,
  onShowData: null,
  embedCode: 'null',
  onCompare: null,
  gaEvents: {
    share: undefined,
    download: undefined,
    compare: undefined,
    showData: undefined,
    embed: undefined
  }
};
export default Actions;