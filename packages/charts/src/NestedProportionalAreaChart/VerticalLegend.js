import React from "react";
import PropTypes from "prop-types";

import { VictoryLabel } from "victory";

import {
  dataLabelsStyle,
  referenceDataStyle,
  referenceLabelsStyle,
  MOBILE_HEIGHT,
} from "./ScaledArea";
import withVictoryTheme from "../styles/withVictoryTheme";
import propTypes from "../propTypes";

/**
 *
 */
function VerticalLegend({
  formatNumberForLabel,
  colorScale,
  data,
  reference,
  style,
}) {
  // For starters, lets assume each data label has 36px height,
  // reference label has 48 px, and there is 10px between labels
  // and charts
  // i) Data values are drawn at the top above the figure i.e. from 100px,
  // ---------------------------------------------------------------------
  const {
    data: [referenceData],
  } = reference;
  const x = 0;

  return (
    <>
      {/* Data values at the top of the chart */}
      {data.map((d, i) => (
        <VictoryLabel
          key={d.x}
          capHeight={0}
          lineHeight={0}
          x={x}
          dx={0}
          y={90} // 100 - 10
          text={formatNumberForLabel(d.y)}
          style={dataLabelsStyle(i, colorScale, style)}
          dy={-i * 36}
        />
      ))}

      {/* Reference value at the bottom of chart */}
      <VictoryLabel
        capHeight={0}
        lineHeight={0}
        x={x}
        y={MOBILE_HEIGHT - 25}
        text={formatNumberForLabel(referenceData.y)}
        style={referenceDataStyle(reference)}
      />
      {referenceData.label && (
        <VictoryLabel
          capHeight={0}
          lineHeight={0}
          x={x}
          y={MOBILE_HEIGHT - 5} // Leave space at bottom for letters like 'y'
          text={referenceData.label}
          style={referenceLabelsStyle(reference)}
        />
      )}
    </>
  );
}

VerticalLegend.propTypes = {
  formatNumberForLabel: PropTypes.func,
  colorScale: propTypes.colorScale,
  data: propTypes.data,
  reference: propTypes.reference,
  style: PropTypes.shape({
    labels: PropTypes.shape({}),
  }),
};

VerticalLegend.defaultProps = {
  formatNumberForLabel: (x) => x,
  colorScale: undefined,
  data: undefined,
  reference: undefined,
  style: undefined,
};

export default withVictoryTheme(VerticalLegend);
