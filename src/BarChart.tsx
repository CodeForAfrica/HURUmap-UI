import React from 'react';
import {
  VictoryBar,
  VictoryGroup,
  VictoryAxis,
  VictoryBarProps,
  VictoryLabel,
  VictoryChartProps,
  VictoryGroupProps,
  VictoryTooltip
} from 'victory';

import withVictoryTheme from './styles/withVictoryTheme';
import Chart, {
  toChartAxisProps,
  ChartProps,
  ChartAxisPropsType
} from './Chart';

type Data = {
  x: string | number;
  y: number;
}[];

type GroupData = {
  label: string | number;
  data: Data;
}[];

export interface BarChartPartsProps {
  axis?: ChartAxisPropsType;
  parent?: VictoryChartProps;
  group?: VictoryGroupProps | VictoryGroupProps[];
}

interface Props extends VictoryBarProps, ChartProps {
  barWidth?: number;
  groupSpacing?: number;
  barSpacing?: number;
  data: GroupData | Data;
  parts?: BarChartPartsProps;
}

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
}: Props) {
  // This space is the sides of the chart, outside the data
  // The axis is rendered in this space
  const dataMargin = 95;
  let groupCount = 1;
  let barCount = data.length;
  let plotData = [data as Data];
  const isGrouped = Boolean((data as GroupData)[0].data);
  if (isGrouped) {
    const dataFields = (data as GroupData)[0].data.map(d => d.x);
    groupCount = data.length;
    barCount = dataFields.length * groupCount;

    // Inverse the data provided
    // Victory group expects the fields to group as root
    plotData = dataFields.map(field =>
      (data as GroupData).map(x => {
        const d = x.data.find(y => y.x === field);
        return { x: x.label, y: d ? d.y : 0 };
      })
    );
  }

  const axisProps = (parts && toChartAxisProps(parts.axis)) || {};
  const chartProps = parts && parts.parent;
  const groupProps =
    parts && parts.group ? ([] as VictoryGroupProps[]).concat(parts.group) : [];

  const calculatedDimmension =
    (barWidth + barSpacing) * barCount +
    groupSpacing * (groupCount - 1) +
    dataMargin;

  return (
    <Chart
      theme={theme}
      responsive={responsive}
      horizontal={horizontal}
      width={horizontal ? width : calculatedDimmension}
      height={!horizontal ? height : calculatedDimmension}
      domainPadding={{ x: 25 }}
      {...chartProps}
    >
      {isGrouped ? (
        <VictoryGroup
          offset={barWidth + barSpacing}
          labelComponent={<VictoryTooltip />}
          {...groupProps}
        >
          {plotData.map(d => (
            <VictoryBar data={d} barWidth={barWidth} {...props} />
          ))}
        </VictoryGroup>
      ) : (
        plotData.map(d => (
          <VictoryBar
            data={d}
            barWidth={barWidth}
            labelComponent={<VictoryTooltip />}
            {...props}
          />
        ))
      )}
      <VictoryAxis
        tickLabelComponent={<VictoryLabel />}
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

export default withVictoryTheme(BarChart);
