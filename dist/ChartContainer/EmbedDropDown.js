function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/styles';
import { Container, DialogTitle, DialogContent, DialogContentText, Typography } from '@material-ui/core';
import DropDown from './DropDown';
var useStyles = makeStyles({
  root: {},
  title: {},
  subtitle: {},
  code: {
    width: '100%',
    overflow: 'auto'
  },
  dropDownRoot: {},
  dropDownPaper: {}
});

function EmbedDropDown(_ref) {
  var anchorEl = _ref.anchorEl,
      children = _ref.children,
      onClose = _ref.onClose,
      openProp = _ref.open,
      subtitle = _ref.subtitle,
      title = _ref.title,
      props = _objectWithoutProperties(_ref, ["anchorEl", "children", "onClose", "open", "subtitle", "title"]);

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
  }, React.createElement(Container, {
    className: classes.root
  }, title && React.createElement(DialogTitle, {
    className: classes.title
  }, title), React.createElement(DialogContent, null, subtitle && React.createElement(DialogContentText, {
    className: classes.subtitle
  }, subtitle), React.createElement(Typography, {
    variant: "caption",
    component: "code"
  }, React.createElement("pre", {
    className: classes.code
  }, children)))));
}

EmbedDropDown.propTypes = {
  children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node]).isRequired,
  anchorEl: PropTypes.shape({}).isRequired,
  onClose: PropTypes.func.isRequired,
  open: PropTypes.bool,
  subtitle: PropTypes.string,
  title: PropTypes.string
};
EmbedDropDown.defaultProps = {
  open: undefined,
  subtitle: null,
  title: null
};
export default EmbedDropDown;