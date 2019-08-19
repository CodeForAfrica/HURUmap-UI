import React from 'react';
import PropTypes from 'prop-types';

import { VictoryBar, VictoryGroup, VictoryAxis, VictoryTooltip } from 'victory';

import withVictoryTheme from './styles/withVictoryTheme';
import Chart, { toChartAxisProps } from './Chart';
import WrapLabel from './WrapLabel';

function BarChart({
  theme,
  data,
  barWidth = 40,
  groupSpacing = 30,
  barSpacing = 5,
  horizontal,
  width,
  height,
  responsive = false,
  parts,
  ...props
}) {
  const { group: groupChart } = theme;
  if (!data || !groupChart) {
    return null;
  }
  // This space is the sides of the chart, outside the data
  // The axis is rendered in this space
  const dataMargin = 95;
  let groupCount = 1;
  let barCount = data.length;
  let plotData = [data];
  const isGrouped = Boolean(data[0].data);
  if (isGrouped) {
    const dataFields = data[0].data.map(d => d.x);
    groupCount = data.length;
    barCount = dataFields.length * groupCount;

    // Inverse the data provided
    // Victory group expects the fields to group as root
    plotData = dataFields.map(field =>
      data.map(x => {
        const d = x.data.find(y => y.x === field);
        return { x: x.label, y: d ? d.y : 0, tick: d ? d.x : 0 };
      })
    );
  }

  const axisProps = (parts && toChartAxisProps(parts.axis)) || {};
  const chartProps = parts && parts.parent;
  const groupProps = parts && parts.group ? [].concat(parts.group) : [];
  const tooltipProps = (parts && parts.tooltip) || { style: {} };
  const { colorScale } = groupChart;

  const calculatedDimension =
    (barWidth + barSpacing) * barCount +
    groupSpacing * (groupCount - 1) +
    dataMargin;

  return (
    <Chart
      theme={theme}
      padding={
        horizontal ? { left: barWidth + 5, bottom: 50, right: 50 } : undefined
      }
      responsive={responsive}
      horizontal={horizontal}
      width={horizontal ? width : calculatedDimension}
      height={!horizontal ? height : calculatedDimension}
      // The bar chart would always overflow by half the width plus some pixels
      domainPadding={{ x: barWidth / 2 + 5 }}
      {...chartProps}
    >
      {isGrouped ? (
        <VictoryGroup offset={barWidth + barSpacing} {...groupProps}>
          {plotData.map((d, i) => (
            <VictoryBar
              data={d}
              barWidth={barWidth}
              {...props}
              labelComponent={
                <VictoryTooltip
                  {...tooltipProps}
                  style={Object.assign({}, tooltipProps.style, {
                    fill: colorScale[i]
                  })}
                />
              }
            />
          ))}
        </VictoryGroup>
      ) : (
        plotData.map(d => (
          <VictoryBar
            data={d}
            barWidth={barWidth}
            labelComponent={<VictoryTooltip {...tooltipProps} />}
            {...props}
          />
        ))
      )}
      <VictoryAxis
        tickLabelComponent={<WrapLabel width={barWidth * groupCount} />}
        {...Object.assign(
          {
            style: {
              tickLabels: {
                display: 'block'
              }
            }
          },
          axisProps.independent
        )}
      />
      <VictoryAxis dependentAxis {...axisProps.dependent} />
    </Chart>
  );
}

BarChart.propTypes = {
  data: PropTypes.arrayOf(
    PropTypes.oneOf(
      PropTypes.shape({
        x: PropTypes.oneOf(PropTypes.number, PropTypes.string)
      }),
      PropTypes.shape({ data: PropTypes.shape({}) })
    )
  ).isRequired,
  barSpacing: PropTypes.number,
  barWidth: PropTypes.number,
  groupSpacing: PropTypes.number,
  height: PropTypes.number,
  horizontal: PropTypes.bool,
  parts: PropTypes.shape({
    axis: PropTypes.shape({}),
    group: PropTypes.shape({}),
    parent: PropTypes.shape({}),
    tooltip: PropTypes.shape({})
  }),
  responsive: PropTypes.bool,
  theme: PropTypes.shape({
    group: PropTypes.shape({})
  }),
  width: PropTypes.number
};

BarChart.defaultProps = {
  barSpacing: undefined,
  barWidth: undefined,
  groupSpacing: undefined,
  height: undefined,
  horizontal: undefined,
  parts: undefined,
  responsive: undefined,
  theme: undefined,
  width: undefined
};

export default withVictoryTheme(BarChart);
