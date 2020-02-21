"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = withVictoryTheme;

var _react = _interopRequireDefault(require("react"));

var _styles = require("@material-ui/core/styles");

var _createVictoryTheme = _interopRequireDefault(require("./createVictoryTheme"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function withVictoryTheme(C) {
  return function (_ref) {
    var props = _extends({}, _ref);

    var materialTheme = (0, _styles.useTheme)();
    var theme = materialTheme && materialTheme.chart || (0, _createVictoryTheme.default)();
    return _react.default.createElement(C, _extends({
      theme: theme
    }, props));
  };
}