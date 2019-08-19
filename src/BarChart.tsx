import React from 'react';
import {
  VictoryBar,
  VictoryGroup,
  VictoryAxis,
  VictoryBarProps,
  VictoryChartProps,
  VictoryGroupProps,
  VictoryThemeDefinitionLatest,
  VictoryTooltip,
  VictoryTooltipProps
} from 'victory';

import withVictoryTheme from './styles/withVictoryTheme';
import Chart, {
  toChartAxisProps,
  ChartAxisPropsType,
  ChartProps
} from './Chart';
import WrapLabel from './WrapLabel';

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
  tooltip?: VictoryTooltipProps;
}

interface Props extends VictoryBarProps, ChartProps {
  barWidth?: number;
  groupSpacing?: number;
  barSpacing?: number;
  data: GroupData | Data;
  parts?: BarChartPartsProps;
}

function BarChart({
  theme: t,
  data,
  barWidth: suggestedBarWidth = 40,
  groupSpacing: suggestedGroupSpacing = 30,
  barSpacing = 5,
  horizontal,
  width,
  height,
  responsive = false,
  parts,
  ...props
}: Props) {
  const theme = (t as unknown) as VictoryThemeDefinitionLatest;
  const { group: groupChart } = theme;
  if (!data || !groupChart) {
    return null;
  }
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
        return { x: x.label, y: d ? d.y : 0, tick: d ? d.x : 0 };
      })
    );
  }

  const axisProps = (parts && toChartAxisProps(parts.axis)) || {};
  const chartProps = parts && parts.parent;
  const groupProps =
    parts && parts.group ? ([] as VictoryGroupProps[]).concat(parts.group) : [];
  const tooltipProps = (parts && parts.tooltip) || { style: {} };
  const { colorScale } = groupChart;

  const calculatedDimension =
    (suggestedBarWidth + barSpacing) * barCount +
    suggestedGroupSpacing * (groupCount - 1) +
    dataMargin;

  const barWidth = width
    ? suggestedBarWidth * (width / calculatedDimension)
    : suggestedBarWidth;

  return (
    <Chart
      theme={theme}
      padding={
        horizontal ? { left: barWidth + 5, bottom: 50, right: 50 } : undefined
      }
      responsive={responsive}
      horizontal={horizontal}
      width={width || calculatedDimension}
      height={height || (horizontal ? calculatedDimension : undefined)}
      domainPadding={
        barSpacing === 0 ? { x: suggestedBarWidth - 5 } : undefined
      }
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

export default withVictoryTheme(BarChart);
