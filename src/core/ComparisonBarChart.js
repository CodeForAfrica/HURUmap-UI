import React from 'react';
import PropTypes from 'prop-types';

import { VictoryBar, VictoryLabel, VictoryAxis } from 'victory';

import withVictoryTheme from './styles/withVictoryTheme';
import Chart, { toReferenceProps } from './ReferableChart';
import propTypes from './propTypes';

function ComparisonBarChart({
  theme,
  data,
  reference: ref,
  horizontal = true,
  width,
  height = 200,
  ...props
}) {
  const {
    data: [referenceData],
    style: referenceStyle
  } = toReferenceProps(ref);
  const groupColorScale = theme.group.colorScale;
  const barProps = {
    ...{
      labels: datum => datum.y,
      labelComponent: <VictoryLabel x={50} dy={-25} />
    },
    ...props
  };
  return (
    // The bar charts order is reversed, so the last will be at the top
    <Chart theme={theme} horizontal={horizontal} width={width} height={height}>
      {/* Legend */}
      <VictoryBar
        barWidth={5}
        style={referenceStyle}
        data={[referenceData]}
        labels={({ datum }) => datum.y}
        labelComponent={<VictoryLabel x={50} dy={-15} />}
        {...props}
      />
      <VictoryAxis
        style={{
          tickLabels: {
            display: 'block',
            ...(referenceStyle && referenceStyle.labels)
          }
        }}
        tickFormat={x => (x === referenceData.x ? referenceData.x : '')}
        tickLabelComponent={<VictoryLabel x={50} dy={20} textAnchor="start" />}
      />
      {/* Legend */}

      {data[1] && (
        <VictoryBar
          style={{
            data: {
              fill: groupColorScale[1]
            },
            labels: {
              fontSize: 25,
              fill: groupColorScale[1]
            }
          }}
          data={[data[1]]}
          {...barProps}
        />
      )}

      <VictoryBar
        style={{
          data: {
            fill: groupColorScale[0]
          },
          labels: {
            fontSize: 25,
            fill: groupColorScale[0]
          }
        }}
        data={[data[0]]}
        labels={({ datum }) => datum.y}
        {...barProps}
      />
    </Chart>
  );
}

ComparisonBarChart.propTypes = {
  data: PropTypes.arrayOf(
    PropTypes.shape({ x: PropTypes.string, y: PropTypes.number })
  ).isRequired,
  height: PropTypes.number,
  horizontal: PropTypes.bool,
  reference: propTypes.reference,
  theme: propTypes.theme,
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
