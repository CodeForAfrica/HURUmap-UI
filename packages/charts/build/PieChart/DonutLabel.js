"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _victory = require("victory");

var _Label = _interopRequireDefault(require("../Label"));

var _propTypes2 = _interopRequireDefault(require("../propTypes"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

var sortData = function sortData(data, sortKey) {
  var sortedData = data;

  if (sortKey) {
    var sort = function sort(a, b) {
      var whenLarge = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 1;
      var whenSmall = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : -1;

      if (a.y > b.y) {
        return whenLarge;
      }

      if (b.y > a.y) {
        return whenSmall;
      }

      return 0;
    };

    var sortDescending = function sortDescending(a, b) {
      return sort(a, b, -1, 1);
    }; // remember to create a copy of the array as not to modify it


    var dataToSort = data.slice(0);
    sortedData = sortKey[0] === '-' ? dataToSort.sort(sortDescending) : dataToSort.sort(sort);
  }

  return sortedData;
};

function DonutLabel(_ref) {
  var colorScale = _ref.colorScale,
      data = _ref.data,
      sortKey = _ref.sortKey,
      x = _ref.x,
      y = _ref.y,
      props = _objectWithoutProperties(_ref, ["colorScale", "data", "sortKey", "x", "y"]);

  var textData = sortData(data, sortKey)[0];
  var textIndex = data.findIndex(function (d) {
    return d.x === textData.x;
  }) + 1;
  return _react.default.createElement(_Label.default, _extends({
    colorScale: colorScale,
    datum: {
      _x: textIndex
    },
    text: textData.label,
    x: x,
    y: y
  }, props));
}

DonutLabel.defaultEvents = _victory.VictoryTooltip.defaultEvents;
DonutLabel.propTypes = {
  colorScale: _propTypes2.default.colorScale,
  data: _propTypes2.default.data.isRequired,
  sortKey: _propTypes.default.oneOf(['value', '-value']),
  x: _propTypes.default.number,
  y: _propTypes.default.number
};
DonutLabel.defaultProps = {
  colorScale: undefined,
  sortKey: undefined,
  x: undefined,
  y: undefined
};
var _default = DonutLabel;
exports.default = _default;