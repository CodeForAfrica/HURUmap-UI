import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { scaleDesktopDimensions, scaleMobileDimensions } from './ScaledArea';
import { toReferenceProps } from '../ReferableChart';
import withVictoryTheme from '../styles/withVictoryTheme';
import CustomContainer from '../CustomContainer';
import ScaledCircle from './ScaledCircle';
import ScaledSquare from './ScaledSquare';
/**
 * Data value represents **area**. We need to find length/radius in order to
 * draw the shapes. For both squares & circles, √ of the area should give us
 * the length/radius to use (for circle, the √ of π is a constant that drops
 * off when scaling)
 */

function NestedProportionalAreaChart(_ref) {
  var data = _ref.data,
      gS = _ref.groupSpacing,
      h = _ref.height,
      ref = _ref.reference,
      _ref$square = _ref.square,
      square = _ref$square === void 0 ? false : _ref$square,
      style = _ref.style,
      theme = _ref.theme,
      w = _ref.width,
      formatNumberForLabel = _ref.formatNumberForLabel;
  var chart = theme.proportionalArea;

  if (!data || !chart) {
    return null;
  }

  var reference = Object.assign({}, {
    style: chart.reference
  }, toReferenceProps(ref));
  var height = h || chart.height;
  var width = w || chart.width;
  var isHandset = width < theme.breakpoints.sm;
  var scale = isHandset || square ? scaleMobileDimensions(height, width) : scaleDesktopDimensions(height, width);
  var groupSpacing = data.length > 1 ? gS || chart.groupSpacing : 0; // For starters, lets assume each data label has 36px height,
  // reference label has 48 px, and there is 10px between labels
  // and charts
  // ------------------------------------

  return React.createElement(Fragment, null, React.createElement(CustomContainer, {
    height: height,
    width: width
  }, React.createElement("defs", null, React.createElement("pattern", {
    id: "gradient-background",
    patternUnits: "userSpaceOnUse",
    width: "5.5",
    height: "5.5",
    patternTransform: "rotate(135)"
  }, React.createElement("line", {
    x1: "0",
    y: "0",
    x2: "0",
    y2: "5.5",
    stroke: "#C4C4C4",
    strokeWidth: "1"
  }))), React.createElement("g", {
    transform: "scale(".concat(scale, ")")
  }, square ? React.createElement(ScaledSquare, {
    colorScale: chart.colorScale,
    reference: reference,
    data: data,
    formatNumberForLabel: formatNumberForLabel
  }) : React.createElement(ScaledCircle, {
    colorScale: chart.colorScale,
    data: data,
    groupSpacing: groupSpacing,
    labels: function labels() {
      return '';
    } // Don't show PieChart labels
    ,
    labelComponent: undefined // Don't show PieChart labels
    ,
    mobile: isHandset,
    reference: reference,
    style: style,
    theme: theme,
    formatNumberForLabel: formatNumberForLabel
  }))));
}

NestedProportionalAreaChart.propTypes = {
  formatNumberForLabel: PropTypes.func,
  data: PropTypes.arrayOf(PropTypes.shape({})),
  groupSpacing: PropTypes.number,
  height: PropTypes.number,
  reference: PropTypes.shape({
    data: PropTypes.arrayOf(PropTypes.shape({})),
    style: PropTypes.arrayOf(PropTypes.shape({}))
  }),
  square: PropTypes.bool,
  style: PropTypes.shape({
    labels: PropTypes.shape({})
  }),
  theme: PropTypes.shape({
    proportionalArea: PropTypes.shape({}),
    breakpoints: PropTypes.shape({
      sm: PropTypes.number
    })
  }),
  width: PropTypes.number
};
NestedProportionalAreaChart.defaultProps = {
  formatNumberForLabel: function formatNumberForLabel(x) {
    return x;
  },
  data: undefined,
  groupSpacing: undefined,
  height: undefined,
  reference: undefined,
  square: false,
  style: undefined,
  theme: undefined,
  width: undefined
};
export default withVictoryTheme(NestedProportionalAreaChart);