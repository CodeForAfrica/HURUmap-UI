"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireWildcard(require("react"));

var _propTypes = require("prop-types");

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

var EmbedCodeTextArea = function EmbedCodeTextArea(_ref) {
  var code = _ref.code;
  var ref = (0, _react.createRef)();
  (0, _react.useEffect)(function () {
    if (ref.current) {
      var textArea = ref.current;
      textArea.style.height = 'inherit';
      var computed = window.getComputedStyle(textArea);
      var height = parseInt(computed.getPropertyValue('border-top-width'), 10) + parseInt(computed.getPropertyValue('padding-top'), 10) + textArea.scrollHeight + parseInt(computed.getPropertyValue('border-bottom-width'), 10) + parseInt(computed.getPropertyValue('padding-bottom'), 10);
      textArea.style.height = "".concat(height, "px");
    }
  }, [ref]);
  return _react.default.createElement("textarea", {
    ref: ref,
    readOnly: true,
    style: {
      resize: 'none',
      width: '25rem',
      margin: '1.25rem',
      border: 'none',
      outline: 'none'
    },
    value: code
  });
};

EmbedCodeTextArea.propTypes = {
  code: _propTypes.PropTypes.string
};
EmbedCodeTextArea.defaultProps = {
  code: undefined
};
var _default = EmbedCodeTextArea;
exports.default = _default;