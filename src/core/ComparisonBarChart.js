import React from 'react';
import PropTypes from 'prop-types';

import { Border, VictoryLabel } from 'victory';

import propTypes from './propTypes';
import { toReferenceProps } from './ReferableChart';
import withVictoryTheme from './styles/withVictoryTheme';
import CustomContainer from './CustomContainer';

function ComparisonBarChart({
  barHeight: barHeightProp,
  data,
  height: heightProp,
  horizontal = true,
  reference: referenceProp,
  style = {},
  theme,
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
  const referenceDataBarWidth = (referenceData.y * width) / max;
  const barHeight = barHeightProp || chart.barHeight;

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
            dy={0}
            lineHeight={0}
            style={{ fill: colorScale[i % colorScale.length], ...dataStyle }}
            text={data[i].y}
            x={0}
            y={(i + 1) * 40 + i * 10 - barHeight}
          />
          <Border
            height={barHeight}
            style={{ fill: colorScale[i % colorScale.length] }}
            x={0}
            width={barWidth}
            y={(i + 1) * 40 + i * 10}
          />
        </>
      ))}
      <VictoryLabel
        capHeight={0}
        dy={0}
        lineHeight={0}
        style={referenceStyle.data}
        text={referenceData.y}
        x={0}
        y={data.length * 40 + (data.length - 1) * 10 - 2 * barHeight + 70}
      />
      <Border
        height={barHeight}
        style={referenceStyle.labels}
        width={referenceDataBarWidth}
        x={0}
        y={data.length * 40 + (data.length - 1) * 10 - barHeight + 70}
      />
      <VictoryLabel
        capHeight={0}
        dy={0}
        lineHeight={0}
        style={referenceStyle.labels}
        text={referenceData.x}
        x={0}
        y={data.length * 40 + (data.length - 1) * 10 + 3 * barHeight + 70}
      />
    </CustomContainer>
  );
}

ComparisonBarChart.propTypes = {
  barHeight: PropTypes.number,
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
  barHeight: undefined,
  height: undefined,
  horizontal: undefined,
  reference: undefined,
  style: undefined,
  theme: undefined,
  width: undefined
};

export default withVictoryTheme(ComparisonBarChart);
