function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/styles';
import { ClickAwayListener, Fade, Paper, Popper } from '@material-ui/core';
var useStyles = makeStyles(function (_ref) {
  var breakpoints = _ref.breakpoints;
  return {
    root: _defineProperty({
      width: '100%',
      marginTop: '1rem'
    }, breakpoints.up('sm'), {
      width: '20rem'
    }),
    paper: {}
  };
});

function DropDown(_ref2) {
  var children = _ref2.children,
      onClose = _ref2.onClose,
      open = _ref2.open,
      transition = _ref2.transition,
      props = _objectWithoutProperties(_ref2, ["children", "onClose", "open", "transition"]);

  var classes = useStyles(props);
  return React.createElement(Popper, _extends({
    open: open,
    className: classes.root,
    transition: true
  }, props), function (_ref3) {
    var TransitionProps = _ref3.TransitionProps;
    return React.createElement(Fade, _extends({}, TransitionProps, transition), React.createElement(Paper, {
      className: classes.paper
    }, React.createElement(ClickAwayListener, {
      onClickAway: onClose
    }, children)));
  });
}

DropDown.propTypes = {
  children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node]).isRequired,
  onClose: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
  transition: PropTypes.shape({})
};
DropDown.defaultProps = {
  transition: {
    timeout: 350
  }
};
export default DropDown;