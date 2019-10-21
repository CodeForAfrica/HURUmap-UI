import React from 'react';
import PropTypes from 'prop-types';

import { VictoryAxis, VictoryBar, VictoryGroup } from 'victory';

import withVictoryTheme from '../styles/withVictoryTheme';
import Chart, { toChartAxisProps } from '../Chart';
import WrapLabel from '../WrapLabel';
import BarLabel from './BarLabel';
import propTypes from '../propTypes';

function BarChart({
  barWidth,
  labelWidth: propLabelWidth,
  data: d,
  domain,
  domainPadding,
  height,
  horizontal,
  offset,
  parts,
  responsive,
  theme,
  width,
  ...props
}) {
  const {
    axis: { labelWidth: themeLabelWidth },
    bar: chart,
    group: groupChart
  } = theme;
  if (!d || !groupChart) {
    return null;
  }

  const groupData = Array.isArray(d[0]) ? d : [d];
  let labelWidth = propLabelWidth || themeLabelWidth;
  if (groupData.length > 1 && !propLabelWidth) {
    const barSpacing = offset || barWidth;
    if (barSpacing) {
      labelWidth = barSpacing * groupData.length;
    }
  }
  const axisProps = (parts && toChartAxisProps(parts.axis)) || {};
  const { tickFormat: propTickFormat } = axisProps.independent || {};
  const tickFormat =
    propTickFormat ||
    (tick => {
      let tickLabel = '';
      groupData.find(dE =>
        dE.find(gE => {
          if (gE.x === tick) {
            tickLabel = gE.x.toString();
            return true;
          }
          return false;
        })
      );
      return tickLabel;
    });
  const chartProps = {
    domain,
    domainPadding,
    height: height || chart.height,
    horizontal,
    responsive,
    theme,
    width: width || chart.width,
    ...(parts && parts.parent)
  };
  const groupProps = parts && parts.group ? [].concat(parts.group) : [];
  const tooltipProps = (parts && parts.tooltip) || { style: {} };
  const { colorScale } = groupChart;

  const numberFormatter = new Intl.NumberFormat('en-GB');

  return (
    <Chart {...chartProps}>
      <VictoryAxis
        tickFormat={tickFormat}
        tickLabelComponent={<WrapLabel width={labelWidth} />}
        {...axisProps.independent}
      />
      <VictoryAxis dependentAxis orientation="right" {...axisProps.dependent} />

      <VictoryGroup {...groupProps} offset={offset}>
        {groupData.map((data, i) => (
          <VictoryBar
            barWidth={barWidth}
            data={data}
            key={data.toString()}
            labels={({ datum }) =>
              typeof datum.y !== 'number'
                ? 'N/A'
                : numberFormatter.format(datum.y)
            }
            labelComponent={
              <BarLabel
                tooltipProps={{
                  ...tooltipProps,
                  data,
                  style: { ...tooltipProps.style, fill: colorScale[i] }
                }}
                theme={theme}
              />
            }
            {...props}
          />
        ))}
      </VictoryGroup>
    </Chart>
  );
}

BarChart.propTypes = {
  data: propTypes.groupedData,
  barWidth: PropTypes.number,
  labelWidth: PropTypes.number,
  domain: PropTypes.oneOfType([PropTypes.number, PropTypes.shape({})]),
  domainPadding: PropTypes.oneOfType([PropTypes.number, PropTypes.shape({})]),
  height: PropTypes.number,
  horizontal: PropTypes.bool,
  offset: PropTypes.number,
  parts: PropTypes.shape({
    axis: PropTypes.shape({}),
    group: PropTypes.shape({}),
    parent: PropTypes.shape({}),
    tooltip: PropTypes.shape({})
  }),
  responsive: PropTypes.bool,
  theme: propTypes.theme,
  width: PropTypes.number
};

BarChart.defaultProps = {
  barWidth: undefined,
  labelWidth: undefined,
  data: undefined,
  domain: undefined,
  domainPadding: undefined,
  height: undefined,
  horizontal: undefined,
  offset: undefined,
  parts: undefined,
  responsive: true,
  theme: undefined,
  width: undefined
};

export default withVictoryTheme(BarChart);
