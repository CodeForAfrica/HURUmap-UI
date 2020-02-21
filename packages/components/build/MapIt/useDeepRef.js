"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = useDeepRef;

var _dequal = _interopRequireDefault(require("dequal"));

var _react = require("react");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function useDeepRef(value) {
  var ref = (0, _react.useRef)();

  if (!(0, _dequal.default)(value, ref.current)) {
    ref.current = value;
  }

  return ref.current;
}