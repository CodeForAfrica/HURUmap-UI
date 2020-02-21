"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.toReferenceProps = void 0;

var _Chart = _interopRequireDefault(require("./Chart"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var toReferenceProps = function toReferenceProps(ref) {
  return Array.isArray(ref) ? {
    data: ref
  } : ref;
};

exports.toReferenceProps = toReferenceProps;
var _default = _Chart.default;
exports.default = _default;