import React from 'react';
import PropTypes from 'prop-types';

import {
  Helpers,
  VictoryAxis,
  VictoryBar,
  VictoryGroup,
  VictoryLegend
} from 'victory';

import { getLegendProps } from '../utils';
import propTypes from '../propTypes';
import withVictoryTheme from '../styles/withVictoryTheme';
import BarLabel from './BarLabel';
import Chart, { toChartAxisProps } from '../Chart';
import LegendLabel from '../LegendLabel';
import WrapLabel from '../WrapLabel';

function BarChart({
  barWidth,
  labelWidth: propLabelWidth,
  data: d,
  domain,
  domainPadding,
  height: suggestedHeight,
  horizontal,
  offset,
  padding: suggestedPadding,
  parts,
  responsive,
  theme,
  width: suggestedWidth,
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

  const height = suggestedHeight || chart.height;
  const width = suggestedWidth || chart.width;

  const groupProps = parts && parts.group ? [].concat(parts.group) : [];
  const tooltipProps = (parts && parts.tooltip) || { style: {} };
  const { colorScale } = groupChart;

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

  const originalPadding = Helpers.getPadding({
    padding:
      suggestedPadding ||
      (parts.parent && parts.parent.padding) ||
      chart.padding
  });

  const initialLegendProps = {
    ...chart.legend,
    colorScale,
    ...(parts && parts.legend)
  };
  const { padding, legend } = getLegendProps(
    { height, width },
    initialLegendProps,
    groupData[0],
    originalPadding
  );

  const chartProps = {
    domain,
    domainPadding,
    height,
    horizontal,
    responsive,
    theme,
    width,
    ...(parts && parts.parent),
    padding
  };

  const numberFormatter = new Intl.NumberFormat('en-GB');

  return (
    <Chart {...chartProps}>
      <VictoryGroup {...groupProps} offset={offset}>
        {groupData.map((data, i) => (
          <VictoryBar
            name="bar"
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
              />
            }
            {...props}
          />
        ))}
      </VictoryGroup>
      <VictoryAxis
        tickFormat={tickFormat}
        tickLabelComponent={<WrapLabel width={labelWidth} />}
        {...axisProps.independent}
      />
      <VictoryAxis dependentAxis {...axisProps.dependent} />
      {legend && (
        <VictoryLegend
          standalone={false}
          labelComponent={
            <LegendLabel colorScale={colorScale} width={legend.labelWidth} />
          }
          {...legend}
        />
      )}
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
  padding: PropTypes.oneOfType([PropTypes.number, PropTypes.shape({})]),
  parts: PropTypes.shape({
    axis: PropTypes.shape({}),
    group: PropTypes.shape({}),
    legend: PropTypes.shape({}),
    parent: PropTypes.shape({
      padding: PropTypes.oneOfType([PropTypes.number, PropTypes.shape({})])
    }),
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
  padding: undefined,
  parts: undefined,
  responsive: true,
  theme: undefined,
  width: undefined
};

export default withVictoryTheme(BarChart);
