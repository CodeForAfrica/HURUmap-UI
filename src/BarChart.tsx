import React, { useEffect } from 'react';
import {
  VictoryBar,
  VictoryGroup,
  VictoryAxis,
  VictoryBarProps,
  VictoryAxisProps
} from 'victory';

import * as d3 from 'd3';
import withVictoryTheme from './styles/withVictoryTheme';
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

  useEffect(() => {
    d3.selectAll('tspan').call(tspans => {
      tspans.each(function() {
        const t = d3.select(this);
        const text = t.select(function() {
          return this && (this as any).parentNode;
        });
        const words = text
          .text()
          .split(/\s+/)
          .reverse();
        let word = words.pop();
        let line: any = [];
        let lineNumber = 1;
        const lineHeight = 14;
        const style = t.attr('style');
        const x = text.attr('x');
        const dy = t.attr('dy');
        const dx = t.attr('dx');
        let tspan = text
          .text(null)
          .append('tspan')
          .attr('text-anchor', 'middle')
          .attr('style', style)
          .attr('x', x)
          .attr('dy', dy)
          .attr('dx', dx);
        while (word) {
          line.push(word);
          tspan.text(line.join(' '));
          const node = tspan.node();
          if (node && node.getComputedTextLength() > barWidth * groupCount) {
            line.pop();
            tspan.text(line.join(' '));
            line = [word];
            tspan = text
              .append('tspan')
              .attr('text-anchor', 'middle')
              .attr('style', style)
              .attr('x', x)
              .attr('dy', lineNumber * lineHeight + (parseFloat(dy) || 0))
              .attr('dx', dx)
              .text(word);

            lineNumber += 1;
          }
          word = words.pop();
        }
      });
    });
  }, [barWidth, groupCount]);

  return (
    <Chart
      theme={theme}
      responsive={responsive}
      horizontal={horizontal}
      width={horizontal ? width : calculatedDimmension}
      height={!horizontal ? height : calculatedDimmension}
      domainPadding={{ x: 25 }}
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
