"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _victory = require("victory");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Tooltip *without* any events is needed for shared events on the pie chart
 * to work.
 * see: https://formidable.com/open-source/victory/guides/tooltips/#tooltips-with-other-events
 */
function Tooltip(props) {
  return _react.default.createElement(_victory.VictoryTooltip, props);
}

var _default = Tooltip;
exports.default = _default;