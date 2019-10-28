function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

import React from 'react';
import { useTheme } from '@material-ui/styles';
import createVictoryTheme from './createVictoryTheme';
export default function withVictoryTheme(C) {
  return function (_ref) {
    var props = _extends({}, _ref);

    var materialTheme = useTheme();
    var theme = materialTheme ? materialTheme.chart : createVictoryTheme();
    return React.createElement(C, _extends({
      theme: theme
    }, props));
  };
}