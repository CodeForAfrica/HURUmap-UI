import React from 'react';
import PropTypes from 'prop-types';

import { VictoryBar, VictoryGroup, VictoryAxis } from 'victory';

import withVictoryTheme from '../styles/withVictoryTheme';
import Chart, { toChartAxisProps } from '../Chart';
import WrapLabel from '../WrapLabel';
import BarLabel from './BarLabel';

function BarChart({
  barWidth,
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
    axis: { labelWidth: defaultLabelWidth },
    bar: chart,
    group: groupChart
  } = theme;
  if (!d || !groupChart) {
    return null;
  }

  const groupData = Array.isArray(d[0]) ? d : [d];
  let labelWidth = defaultLabelWidth;
  if (groupData.length > 1) {
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
  const chartProps = Object.assign(
    {
      domain,
      domainPadding,
      height: height || chart.height,
      horizontal,
      responsive,
      theme,
      width: width || chart.width
    },
    parts && parts.parent
  );
  const groupProps = parts && parts.group ? [].concat(parts.group) : [];
  const tooltipProps = (parts && parts.tooltip) || { style: {} };
  const { colorScale } = groupChart;

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
            labels={datum =>
              typeof datum.y !== 'number'
                ? 'N/A'
                : numberFormatter.format(datum.y)
            }
            labelComponent={
              <BarLabel
                tooltipProps={{
                  ...tooltipProps,
                  data,
                  style: Object.assign({}, tooltipProps.style, {
                    fill: colorScale[i]
                  })
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
    </Chart>
  );
}

BarChart.propTypes = {
  data: PropTypes.arrayOf(
    PropTypes.shape({
      x: PropTypes.oneOfType([PropTypes.number, PropTypes.string])
    })
  ),
  barWidth: PropTypes.number,
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
  theme: PropTypes.shape({
    axis: PropTypes.shape({
      labelWidth: PropTypes.number
    }),
    bar: PropTypes.shape({}),
    group: PropTypes.shape({})
  }),
  width: PropTypes.number
};

BarChart.defaultProps = {
  barWidth: undefined,
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