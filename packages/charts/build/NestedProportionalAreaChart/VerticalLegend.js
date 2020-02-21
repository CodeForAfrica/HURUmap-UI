"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _victory = require("victory");

var _ScaledArea = require("./ScaledArea");

var _withVictoryTheme = _interopRequireDefault(require("../styles/withVictoryTheme"));

var _propTypes2 = _interopRequireDefault(require("../propTypes"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { if (!(Symbol.iterator in Object(arr) || Object.prototype.toString.call(arr) === "[object Arguments]")) { return; } var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

/**
 *
 */
function VerticalLegend(_ref) {
  var formatNumberForLabel = _ref.formatNumberForLabel,
      colorScale = _ref.colorScale,
      data = _ref.data,
      reference = _ref.reference,
      style = _ref.style;

  // For starters, lets assume each data label has 36px height,
  // reference label has 48 px, and there is 10px between labels
  // and charts
  // i) Data values are drawn at the top above the figure i.e. from 100px,
  // ---------------------------------------------------------------------
  var _reference$data = _slicedToArray(reference.data, 1),
      referenceData = _reference$data[0];

  var x = 0;
  return _react.default.createElement(_react.default.Fragment, null, data.map(function (d, i) {
    return _react.default.createElement(_victory.VictoryLabel, {
      key: d.x,
      capHeight: 0,
      lineHeight: 0,
      x: x,
      dx: 0,
      y: 90 // 100 - 10
      ,
      text: formatNumberForLabel(d.y),
      style: (0, _ScaledArea.dataLabelsStyle)(i, colorScale, style),
      dy: -i * 36
    });
  }), _react.default.createElement(_victory.VictoryLabel, {
    capHeight: 0,
    lineHeight: 0,
    x: x,
    y: _ScaledArea.MOBILE_HEIGHT - 25,
    text: formatNumberForLabel(referenceData.y),
    style: (0, _ScaledArea.referenceDataStyle)(reference)
  }), referenceData.label && _react.default.createElement(_victory.VictoryLabel, {
    capHeight: 0,
    lineHeight: 0,
    x: x,
    y: _ScaledArea.MOBILE_HEIGHT - 5 // Leave space at bottom for letters like 'y'
    ,
    text: referenceData.label,
    style: (0, _ScaledArea.referenceLabelsStyle)(reference)
  }));
}

VerticalLegend.propTypes = {
  formatNumberForLabel: _propTypes.default.func,
  colorScale: _propTypes2.default.colorScale,
  data: _propTypes2.default.data,
  reference: _propTypes2.default.reference,
  style: _propTypes.default.shape({
    labels: _propTypes.default.shape({})
  })
};
VerticalLegend.defaultProps = {
  formatNumberForLabel: function formatNumberForLabel(x) {
    return x;
  },
  colorScale: undefined,
  data: undefined,
  reference: undefined,
  style: undefined
};

var _default = (0, _withVictoryTheme.default)(VerticalLegend);

exports.default = _default;