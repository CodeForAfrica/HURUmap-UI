"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _victory = require("victory");

var _withVictoryTheme = _interopRequireDefault(require("../styles/withVictoryTheme"));

var _ScaledArea = require("./ScaledArea");

var _propTypes2 = _interopRequireDefault(require("../../propTypes"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { if (!(Symbol.iterator in Object(arr) || Object.prototype.toString.call(arr) === "[object Arguments]")) { return; } var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

/**
 *
 */
function HorizontalLegend(_ref) {
  var formatNumberForLabel = _ref.formatNumberForLabel,
      colorScale = _ref.colorScale,
      cx = _ref.cx,
      cy = _ref.cy,
      data = _ref.data,
      radii = _ref.radii,
      reference = _ref.reference,
      style = _ref.style;

  // From the designs:
  // i) Data value has 36px height and 130px width i.e. 190px from center
  // of reference circle, vertically centered with the circle,
  // ii) Data label has height of 20px, 10px below data value,
  // iii) Reference label has 48 px, aligned to the right of the charts
  // ----------------------------------------------------------------
  var _reference$data = _slicedToArray(reference.data, 1),
      referenceData = _reference$data[0];

  return _react.default.createElement(_react.default.Fragment, null, radii.map(function (r, i) {
    return _react.default.createElement(_react.Fragment, {
      key: data[i].x
    }, _react.default.createElement("line", {
      // -1 => left; 1 => right
      x1: cx - (i < 1 ? 1 : -1) * 190,
      y1: cy // 5px padding between circle and line
      ,
      x2: cx - (i < 1 ? 1 : -1) * (r + 5),
      y2: cy,
      style: {
        stroke: colorScale[i % colorScale.length],
        strokeWidth: '2px'
      }
    }), _react.default.createElement(_victory.VictoryLabel, {
      textAnchor: i === 0 ? 'end' : 'start',
      capHeight: 0,
      lineHeight: 0,
      x: cx - (i < 1 ? 1 : -1) * 200 // 190 + 10px padding
      ,
      dx: 0,
      y: cy,
      dy: 18 // 36 / 2 since we want data value vertical centered
      ,
      text: formatNumberForLabel(data[i].y),
      style: (0, _ScaledArea.dataLabelsStyle)(i, colorScale, style)
    }), data[i].label && _react.default.createElement(_victory.VictoryLabel, {
      textAnchor: i === 0 ? 'end' : 'start',
      capHeight: 0,
      lineHeight: 0,
      x: cx - (i < 1 ? 1 : -1) * 200 // 190 + 10
      ,
      dx: 0,
      y: cy + 18 // 36 / 2 is the bottom half of data value
      // 10px top padding from data value + label has height of 20px
      ,
      dy: 10 + 20,
      style: style && style.labels,
      text: data[i].label
    }));
  }), _react.default.createElement(_victory.VictoryLabel, {
    capHeight: 0,
    lineHeight: 0,
    x: cx + 200,
    y: 2 * cy - 24,
    text: formatNumberForLabel(referenceData.y),
    style: (0, _ScaledArea.referenceDataStyle)(reference)
  }), referenceData.label && _react.default.createElement(_victory.VictoryLabel, {
    capHeight: 0,
    lineHeight: 0,
    x: cx + 200,
    y: 2 * cy,
    text: referenceData.label,
    style: (0, _ScaledArea.referenceLabelsStyle)(reference)
  }));
}

HorizontalLegend.propTypes = {
  formatNumberForLabel: _propTypes.default.func,
  colorScale: _propTypes2.default.colorScale,
  data: _propTypes2.default.data,
  cx: _propTypes.default.number.isRequired,
  cy: _propTypes.default.number.isRequired,
  radii: _propTypes.default.arrayOf(_propTypes.default.number),
  reference: _propTypes2.default.reference,
  style: _propTypes.default.shape({
    labels: _propTypes.default.shape({})
  })
};
HorizontalLegend.defaultProps = {
  formatNumberForLabel: function formatNumberForLabel(x) {
    return x;
  },
  // return unformatted number
  colorScale: undefined,
  data: undefined,
  radii: undefined,
  reference: undefined,
  style: undefined
};

var _default = (0, _withVictoryTheme.default)(HorizontalLegend);

exports.default = _default;