import React from 'react';
import PropTypes from 'prop-types';

import { Border, VictoryLabel } from 'victory';

import propTypes from './propTypes';
import CustomContainer from './CustomContainer';
import withVictoryTheme from './styles/withVictoryTheme';
import { toReferenceProps } from './ReferableChart';

function ComparisonBarChart({
  theme,
  data,
  height: heightProp,
  horizontal = true,
  reference: referenceProp,
  style = {},
  width: widthProp
}) {
  const { comparisonBar: chart } = theme;
  if (!data || !chart) {
    return null;
  }
  const {
    data: [referenceData],
    style: referenceStyleProp
  } = toReferenceProps(referenceProp);
  const referenceStyle = { ...chart.referenceStyle, ...referenceStyleProp };
  const dataStyle = { ...chart.style.data, ...style.data };
  const { colorScale } = chart;

  const height = heightProp || chart.height;
  const width = widthProp || chart.width;
  const values = data.map(d => d.y).concat(referenceData.y);
  const max = Math.max.apply(null, values);
  const dataBarWidths = data.map(d => (d.y * width) / max);
  const referenceDataWidth = (referenceData.y * width) / max;

  return (
    <CustomContainer
      theme={theme}
      horizontal={horizontal}
      width={width}
      height={height}
    >
      {dataBarWidths.map((barWidth, i) => (
        <>
          <VictoryLabel
            capHeight={0}
            lineHeight={0}
            x={0}
            y={(i + 1) * 40 - 5 + i * 10}
            dy={0}
            text={data[i].y}
            style={{ fill: colorScale[i % colorScale.length], ...dataStyle }}
          />
          <Border
            x={0}
            y={(i + 1) * 40 + i * 10}
            width={barWidth}
            height={5}
            style={{ fill: colorScale[i % colorScale.length] }}
          />
        </>
      ))}
      <VictoryLabel
        capHeight={0}
        lineHeight={0}
        x={0}
        y={data.length * 40 + 80}
        dy={10}
        text={referenceData.y}
        style={referenceStyle.data}
      />
      <Border
        x={0}
        y={data.length * 40 + 120}
        width={referenceDataWidth}
        height={5}
        style={referenceStyle.labels}
      />
    </CustomContainer>
  );
}

ComparisonBarChart.propTypes = {
  data: PropTypes.arrayOf(
    PropTypes.shape({ x: PropTypes.string, y: PropTypes.number })
  ).isRequired,
  height: PropTypes.number,
  horizontal: PropTypes.bool,
  reference: propTypes.reference,
  style: PropTypes.shape({
    data: PropTypes.shape({}),
    labels: PropTypes.shape({})
  }),
  theme: propTypes.theme,
  width: PropTypes.number
};

ComparisonBarChart.defaultProps = {
  height: undefined,
  horizontal: undefined,
  reference: undefined,
  style: undefined,
  theme: undefined,
  width: undefined
};

export default withVictoryTheme(ComparisonBarChart);
