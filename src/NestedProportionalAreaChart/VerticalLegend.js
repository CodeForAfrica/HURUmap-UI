import React from 'react';
import PropTypes from 'prop-types';

import { VictoryLabel } from 'victory';

import {
  dataLabelsStyle,
  referenceDataStyle,
  referenceLabelsStyle,
  MOBILE_HEIGHT
} from './ScaledArea';
import withVictoryTheme from '../styles/withVictoryTheme';

/**
 *
 */
function VerticalLegend({ colorScale, data, reference, style }) {
  // For starters, lets assume each data label has 36px height,
  // reference label has 48 px, and there is 10px between labels
  // and charts
  // i) Data values are drawn at the top above the figure i.e. from 100px,
  // ---------------------------------------------------------------------
  const {
    data: [referenceData]
  } = reference;
  const x = 0;

  return (
    <React.Fragment>
      {/* Data values at the top of the chart */}
      {data.map((d, i) => (
        <VictoryLabel
          capHeight={0}
          lineHeight={0}
          x={x}
          dx={0}
          y={90} // 100 - 10
          text={data[i].x}
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
        text={referenceData.x}
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
    </React.Fragment>
  );
}

VerticalLegend.propTypes = {
  colorScale: PropTypes.oneOf(
    PropTypes.string,
    PropTypes.arrayOf(
      PropTypes.shape({
        x: PropTypes.oneOf(PropTypes.number, PropTypes.string)
      })
    )
  ),
  data: PropTypes.arrayOf(
    PropTypes.shape({
      x: PropTypes.oneOf(PropTypes.number, PropTypes.string),
      label: PropTypes.oneOf(PropTypes.number, PropTypes.string)
    })
  ),
  reference: PropTypes.shape({
    data: PropTypes.arrayOf(
      PropTypes.shape({
        x: PropTypes.oneOf(PropTypes.number, PropTypes.string),
        label: PropTypes.oneOf(PropTypes.number, PropTypes.string)
      })
    )
  }),
  style: PropTypes.shape({
    labels: PropTypes.shape({})
  })
};

VerticalLegend.defaultProps = {
  colorScale: undefined,
  data: undefined,
  reference: undefined,
  style: undefined
};

export default withVictoryTheme(VerticalLegend);
