"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _LegendLabel = _interopRequireDefault(require("../LegendLabel"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * LegendLabel *without* any events is needed for shared events on the pie chart
 * to work.
 * see: https://formidable.com/open-source/victory/guides/tooltips/#tooltips-with-other-events
 */
function Label(props) {
  return _react.default.createElement(_LegendLabel.default, props);
}

var _default = Label;
exports.default = _default;