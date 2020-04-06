import React, { useMemo } from 'react';
import PropTypes from 'prop-types';

import {
  Helpers,
  VictoryAxis,
  VictoryBar,
  VictoryGroup,
  VictoryLegend
} from 'victory';

import { computeMaxLabelDimmension } from '../WrapLabel/wrapSVGText';

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
  data: propData,
  domain,
  domainPadding,
  height: suggestedHeight,
  horizontal,
  offset,
  padding: suggestedPadding,
  parts,
  responsive,
  theme,
  maxLabelDimmension: propMaxLabelDimmension,
  width: suggestedWidth,
  ...props
}) {
  const {
    bar: chart,
    group: groupChart,
    axis: { labelWidth: themeLabelWidth }
  } = theme;

  const groupData = useMemo(
    // eslint-disable-next-line no-nested-ternary
    () => (!propData ? [] : Array.isArray(propData[0]) ? propData : [propData]),
    [propData]
  );

  let labelWidth;
  const desiredLabelWidth = propLabelWidth || themeLabelWidth;
  if (horizontal && desiredLabelWidth) {
    labelWidth = desiredLabelWidth;
  } else {
    labelWidth = (offset || barWidth) * groupData.length;
  }

  const { maxLabelHeight, maxLabelWidth } = useMemo(
    () =>
      propMaxLabelDimmension ||
      computeMaxLabelDimmension({
        labelWidth,
        horizontal,
        texts: groupData.reduce((a, b) => a.concat(b.map(({ x }) => x)), [])
      }),
    [labelWidth, propMaxLabelDimmension, horizontal, groupData]
  );

  if (!propData || !groupChart) {
    return null;
  }

  const height = suggestedHeight || chart.height;
  const width = suggestedWidth || chart.width;

  const groupProps = parts && parts.group ? [].concat(parts.group) : [];
  const tooltipProps = (parts && parts.tooltip) || { style: {} };
  const { colorScale } = groupChart;

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
      (parts && parts.parent && parts.parent.padding) ||
      chart.padding
  });

  const initialLegendProps = {
    ...chart.legend,
    colorScale
  };
  const { padding, legend } = getLegendProps(
    { height, width },
    initialLegendProps,
    groupData[0],
    originalPadding
  );

  padding.left =
    horizontal && maxLabelWidth > padding.left ? maxLabelWidth : padding.left;
  padding.bottom =
    !horizontal && maxLabelHeight > padding.bottom
      ? maxLabelHeight
      : padding.bottom;

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
      <VictoryAxis
        dependentAxis
        orientation={horizontal ? 'bottom' : 'right'}
        {...axisProps.dependent}
      />

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
      <VictoryAxis
        tickFormat={tickFormat}
        tickLabelComponent={<WrapLabel width={labelWidth} />}
        {...axisProps.independent}
      />

      {legend && (
        <VictoryLegend
          standalone={false}
          labelComponent={
            <LegendLabel
              colorScale={colorScale}
              theme={theme}
              width={legend.labelWidth}
            />
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
  maxLabelDimmension: PropTypes.shape({
    maxLabelWidth: PropTypes.number,
    maxLabelHeight: PropTypes.number
  }),
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
  maxLabelDimmension: undefined,
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
