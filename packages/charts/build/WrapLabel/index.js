"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _shortid = _interopRequireDefault(require("shortid"));

var _wrapSVGText = _interopRequireDefault(require("./wrapSVGText"));

var _propTypes2 = _interopRequireDefault(require("../../propTypes"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var WrapLabel = _react.default.memo(function (_ref) {
  var width = _ref.width,
      text = _ref.text,
      x = _ref.x,
      y = _ref.y,
      style = _ref.style,
      transform = _ref.transform,
      textAnchor = _ref.textAnchor,
      horizontal = _ref.horizontal,
      onMaxDimmension = _ref.onMaxDimmension;
  return _react.default.createElement("text", {
    key: _shortid.default.generate(),
    ref: function ref(node) {
      if (node) {
        (0, _wrapSVGText.default)(node, text, width, onMaxDimmension, horizontal);
      }
    },
    x: x,
    y: y,
    style: style,
    transform: transform,
    textAnchor: textAnchor
  });
}, function (prevProps, nextProps) {
  return JSON.stringify(prevProps) === JSON.stringify(nextProps);
});

WrapLabel.propTypes = {
  text: _propTypes.default.oneOfType([_propTypes.default.arrayOf(_propTypes.default.string), _propTypes.default.string, _propTypes.default.number]),
  style: _propTypes.default.shape({}),
  textAnchor: _propTypes.default.string,
  transform: _propTypes.default.string,
  width: _propTypes.default.number.isRequired,
  x: _propTypes.default.number,
  y: _propTypes.default.number,
  horizontal: _propTypes2.default.bool,
  onMaxDimmension: _propTypes2.default.func
};
WrapLabel.defaultProps = {
  horizontal: false,
  onMaxDimmension: function onMaxDimmension() {},
  text: undefined,
  style: undefined,
  textAnchor: undefined,
  transform: undefined,
  x: undefined,
  y: undefined
};
var _default = WrapLabel;
exports.default = _default;