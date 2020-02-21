"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _core = require("@material-ui/core");

var _makeStyles = _interopRequireDefault(require("../../common/src/makeStyles"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { if (!(Symbol.iterator in Object(arr) || Object.prototype.toString.call(arr) === "[object Arguments]")) { return; } var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

var useStyles = (0, _makeStyles.default)(function () {
  return {
    root: {
      width: '100%',
      height: 'auto'
    },
    hidden: {
      display: 'none'
    },
    mainStatistic: {
      marginTop: '1em'
    },
    statistic: {
      fontSize: '2.25rem'
    },
    statisticDeviation: {
      fontSize: '0.4em',
      color: '#777',
      display: 'inlineBlock'
    },
    secondaryDeviation: {
      fontSize: '1em',
      color: '#777'
    },
    subtitle: {
      fontSize: '1.25em'
    },
    description: {
      fontSize: '1.5em'
    },
    comparison: {
      fontWeight: 'bold'
    },
    list: {
      padding: 0
    },
    listParent: {
      paddingLeft: 0,
      paddingRight: 0
    },
    listTypography: {
      fontSize: '0.9em',
      lineHeight: 1.3,
      color: '#777'
    }
  };
});

function NumberVisuals(_ref) {
  var subtitle = _ref.subtitle,
      statistic = _ref.statistic,
      statisticDeviation = _ref.statisticDeviation,
      secondaryDeviation = _ref.secondaryDeviation,
      description = _ref.description,
      comparisonData = _ref.comparisonData,
      props = _objectWithoutProperties(_ref, ["subtitle", "statistic", "statisticDeviation", "secondaryDeviation", "description", "comparisonData"]);

  var classes = useStyles(props);

  var _useState = (0, _react.useState)(false),
      _useState2 = _slicedToArray(_useState, 2),
      onHover = _useState2[0],
      setOnHover = _useState2[1];

  var toggleHover = function toggleHover() {
    return setOnHover(!onHover);
  };

  return _react.default.createElement("div", {
    className: classes.root
  }, _react.default.createElement(_core.Typography, {
    className: classes.subtitle
  }, subtitle), _react.default.createElement("div", {
    className: classes.mainStatistic
  }, _react.default.createElement(_core.Typography, {
    className: classes.statistic,
    onMouseEnter: toggleHover,
    onMouseLeave: toggleHover
  }, statistic, _react.default.createElement("span", {
    className: !onHover ? classes.hidden : classes.statisticDeviation
  }, statisticDeviation)), _react.default.createElement(_core.Typography, {
    className: !onHover ? classes.hidden : classes.secondaryDeviation
  }, secondaryDeviation)), _react.default.createElement(_core.Typography, {
    className: classes.description
  }, description), _react.default.createElement(_core.List, {
    className: classes.list
  }, comparisonData && comparisonData.map(function (d) {
    return _react.default.createElement(_core.ListItem, {
      className: classes.listParent,
      key: d.id
    }, _react.default.createElement(_core.ListItemText, {
      primary: _react.default.createElement(_core.Typography, {
        className: classes.listTypography
      }, _react.default.createElement("span", {
        className: classes.comparison
      }, d.parentComparison), _react.default.createElement("span", null, d.parentDescription), _react.default.createElement("span", {
        className: !onHover ? classes.hidden : classes.secondaryDeviation
      }, d.parentDeviation))
    }));
  })));
}

NumberVisuals.propTypes = {
  subtitle: _propTypes.default.oneOfType([_propTypes.default.number, _propTypes.default.string]),
  statistic: _propTypes.default.oneOfType([_propTypes.default.number, _propTypes.default.string]),
  statisticDeviation: _propTypes.default.oneOfType([_propTypes.default.number, _propTypes.default.string]),
  secondaryDeviation: _propTypes.default.oneOfType([_propTypes.default.number, _propTypes.default.string]),
  description: _propTypes.default.oneOfType([_propTypes.default.number, _propTypes.default.string]),
  comparisonData: _propTypes.default.arrayOf(_propTypes.default.shape({}))
};
NumberVisuals.defaultProps = {
  subtitle: undefined,
  statistic: undefined,
  statisticDeviation: undefined,
  secondaryDeviation: undefined,
  description: undefined,
  comparisonData: undefined
};
var _default = NumberVisuals;
exports.default = _default;