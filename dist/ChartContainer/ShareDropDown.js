function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/styles';
import { Button, Grid, Link, Typography } from '@material-ui/core';
import DropDown from './DropDown';
var useStyles = makeStyles(function () {
  return {
    root: {},
    source: {
      padding: '20px',
      width: '100%',
      borderBottom: '0.0625rem solid #c4c4c4'
    },
    explore: {
      margin: '20px'
    },
    dropDownRoot: {},
    dropDownPaper: {}
  };
});

function InfoPanel(_ref) {
  var anchorEl = _ref.anchorEl,
      children = _ref.children,
      onClose = _ref.onClose,
      onExploreData = _ref.onExploreData,
      openProp = _ref.open,
      sourceLink = _ref.sourceLink,
      sourceTitle = _ref.sourceTitle,
      props = _objectWithoutProperties(_ref, ["anchorEl", "children", "onClose", "onExploreData", "open", "sourceLink", "sourceTitle"]);

  var classes = useStyles(props);
  var open = typeof openProps === 'undefined' ? anchorEl !== null : openProp;
  return React.createElement(DropDown, {
    anchorEl: anchorEl,
    onClose: onClose,
    open: open,
    classes: {
      root: classes.dropDownRoot,
      paper: classes.dropDownPaper
    }
  }, React.createElement(Grid, _extends({
    className: classes.root,
    container: true,
    justify: "center"
  }, props), React.createElement(Typography, {
    className: classes.source
  }, 'Sources: ', React.createElement(Link, {
    href: sourceLink,
    target: "_blank",
    rel: "noopener noreferrer"
  }, sourceLink || sourceTitle)), React.createElement(Button, {
    variant: "outlined",
    onClick: onExploreData,
    className: classes.explore
  }, children)));
}

InfoPanel.propTypes = {
  anchorEl: PropTypes.shape({}).isRequired,
  children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node]).isRequired,
  forwardedRef: PropTypes.func.isRequired,
  onClose: PropTypes.func.isRequired,
  open: PropTypes.bool,
  onExploreData: PropTypes.func,
  sourceLink: PropTypes.string.isRequired,
  sourceTitle: PropTypes.string
};
InfoPanel.defaultProps = {
  onExploreData: undefined,
  open: undefined,
  sourceTitle: undefined
};
export default InfoPanel;