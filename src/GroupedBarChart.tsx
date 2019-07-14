import React from 'react';
import {
  VictoryBar,
  VictoryGroup,
  VictoryAxis,
  VictoryBarProps,
  VictoryLabel
} from 'victory';

import withVictoryTheme from './styles/withVictoryTheme';
import Chart from './core/Chart';

interface Props extends VictoryBarProps {
  barWidth?: number;
  dataUnit?: string;
  data: {
    x: string | number;
    data: {
      x: string | number;
      y: number;
    }[];
  }[];
}

function GroupedBarChart({
  theme,
  data,
  dataUnit = '',
  barWidth = 40,
  horizontal,
  width,
  height,
  ...props
}: Props) {
  const barCount = data[0].data.length * data.length;
  const calculatedWidth = (barWidth + 30) * barCount;
  return (
    <Chart
      horizontal={horizontal}
      theme={theme}
      width={horizontal ? width : calculatedWidth}
      height={!horizontal ? height : calculatedWidth}
    >
      <VictoryGroup theme={theme} offset={barWidth + 5}>
        {data.map(d => (
          <VictoryBar
            barWidth={barWidth}
            data={d.data}
            labels={datum => `${datum.y}${dataUnit}`}
            {...props}
          />
        ))}
      </VictoryGroup>
      <VictoryAxis
        standalone={false}
        style={{
          axis: { display: 'none' },
          ticks: { display: 'none' },
          grid: { display: 'none' },
          tickLabels: {
            maxWidth: '30px'
          }
        }}
        tickLabelComponent={<VictoryLabel />}
      />
    </Chart>
  );
}

export default withVictoryTheme(GroupedBarChart);
