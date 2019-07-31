import React from 'react';
import {
  VictoryBar,
  VictoryGroup,
  VictoryAxis,
  VictoryBarProps,
  VictoryAxisProps
} from 'victory';

import withVictoryTheme from './styles/withVictoryTheme';
import WrapLabel from './WrapLabel';
import Chart, { ChartProps } from './Chart';

type Data = {
  x: string | number;
  y: number;
}[];

type GroupData = {
  label: string | number;
  data: Data;
}[];

interface Props extends VictoryBarProps, ChartProps {
  barWidth?: number;
  groupSpacing?: number;
  barSpacing?: number;
  data: GroupData | Data;
  axisProps?: VictoryAxisProps;
  dependantAxisProps?: VictoryAxisProps;
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
  axisProps,
  dependantAxisProps,
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

  const calculatedDimmension =
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
      width={horizontal ? width : calculatedDimmension}
      height={!horizontal ? height : calculatedDimmension}
      // The bar chart would always overflow by half the width plus some pixels
      domainPadding={{ x: barWidth / 2 + 5 }}
    >
      {isGrouped ? (
        <VictoryGroup offset={barWidth + barSpacing}>
          {plotData.map(d => (
            <VictoryBar data={d} barWidth={barWidth} {...props} />
          ))}
        </VictoryGroup>
      ) : (
        plotData.map(d => (
          <VictoryBar data={d} barWidth={barWidth} {...props} />
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
          axisProps
        )}
      />
      <VictoryAxis dependentAxis {...dependantAxisProps} />
    </Chart>
  );
}

export default withVictoryTheme(BarChart);
