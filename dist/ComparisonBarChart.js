function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

import React from 'react';
import PropTypes from 'prop-types';
import { VictoryBar, VictoryLabel, VictoryAxis } from 'victory';
import withVictoryTheme from './styles/withVictoryTheme';
import Chart, { toReferenceProps } from './ReferableChart';

function ComparisonBarChart(_ref) {
  var theme = _ref.theme,
      data = _ref.data,
      ref = _ref.reference,
      _ref$horizontal = _ref.horizontal,
      horizontal = _ref$horizontal === void 0 ? true : _ref$horizontal,
      width = _ref.width,
      _ref$height = _ref.height,
      height = _ref$height === void 0 ? 200 : _ref$height,
      props = _objectWithoutProperties(_ref, ["theme", "data", "reference", "horizontal", "width", "height"]);

  var _toReferenceProps = toReferenceProps(ref),
      _toReferenceProps$dat = _slicedToArray(_toReferenceProps.data, 1),
      referenceData = _toReferenceProps$dat[0],
      referenceStyle = _toReferenceProps.style;

  var groupColorScale = theme.group.colorScale;

  var barProps = _objectSpread({}, {
    labels: function labels(datum) {
      return datum.y;
    },
    labelComponent: React.createElement(VictoryLabel, {
      x: 50,
      dy: -20
    })
  }, {}, props);

  return (// The bar charts order is reversed, so the last will be at the top
    React.createElement(Chart, {
      theme: theme,
      horizontal: horizontal,
      width: width,
      height: height
    }, React.createElement(VictoryBar, _extends({
      barWidth: 5,
      style: referenceStyle,
      data: [referenceData],
      labels: function labels(datum) {
        return datum.y;
      },
      labelComponent: React.createElement(VictoryLabel, {
        x: 50,
        dy: -15
      })
    }, props)), React.createElement(VictoryAxis, {
      style: {
        tickLabels: Object.assign({}, {
          display: 'block'
        }, referenceStyle && referenceStyle.labels)
      },
      tickFormat: function tickFormat(x) {
        return x === referenceData.x ? referenceData.x : '';
      },
      tickLabelComponent: React.createElement(VictoryLabel, {
        x: 50,
        dy: 20,
        textAnchor: "start"
      })
    }), data[1] && React.createElement(VictoryBar, _extends({
      style: {
        data: {
          fill: groupColorScale[1]
        },
        labels: {
          fontSize: 25,
          fill: groupColorScale[1]
        }
      },
      data: [data[1]]
    }, barProps)), React.createElement(VictoryBar, _extends({
      style: {
        data: {
          fill: groupColorScale[0]
        },
        labels: {
          fontSize: 25,
          fill: groupColorScale[0]
        }
      },
      data: [data[0]],
      labels: function labels(datum) {
        return datum.y;
      }
    }, barProps)))
  );
}

ComparisonBarChart.propTypes = {
  data: PropTypes.arrayOf(PropTypes.shape({
    x: PropTypes.string,
    y: PropTypes.number
  })).isRequired,
  height: PropTypes.number,
  horizontal: PropTypes.bool,
  reference: PropTypes.shape({}),
  theme: PropTypes.shape({
    group: PropTypes.shape({
      colorScale: PropTypes.oneOfType([PropTypes.string, PropTypes.arrayOf(PropTypes.shape({}))])
    })
  }),
  width: PropTypes.number
};
ComparisonBarChart.defaultProps = {
  height: undefined,
  horizontal: undefined,
  reference: undefined,
  theme: undefined,
  width: undefined
};
export default withVictoryTheme(ComparisonBarChart);