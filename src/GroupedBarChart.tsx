import React from 'react';
import { Theme, WithStyles } from '@material-ui/core';
import { createStyles, useTheme, withStyles } from '@material-ui/styles';
import {
  VictoryBar,
  VictoryBarProps,
  VictoryChart,
  VictoryGroup,
  VictoryAxis
} from 'victory';

import ThemedComponent from './ThemedComponent';

const styles = createStyles({
  root: {}
});

interface Props extends WithStyles<typeof styles>, VictoryBarProps {
  barWidth?: number;
  dataUnit?: string;
  data: {
    x: string | number;
    data: {
      x: string | number;
      y: number;
    }[];
  }[];

  chartRef?: React.RefObject<VictoryChart>;
  groupRef?: React.RefObject<VictoryGroup>;
}

function GroupedBarChart({
  chartRef,
  groupRef,
  data,
  dataUnit = '',
  barWidth = 40,
  width,
  height,
  ...props
}: Props) {
  const theme = useTheme<Theme>();
  return (
    <div style={{ width, height }}>
      <VictoryChart ref={chartRef} width={width} height={height}>
        <VictoryGroup
          ref={groupRef}
          offset={barWidth + 5}
          colorScale="qualitative"
        >
          {data.map(d => (
            <VictoryBar
              barWidth={barWidth}
              theme={theme.chart}
              data={d.data}
              labels={datum => `${datum.y}${dataUnit}`}
              {...props}
            />
          ))}
        </VictoryGroup>
        <VictoryAxis style={{ axis: { stroke: 'none' } }} />
      </VictoryChart>
    </div>
  );
}

export default withStyles(styles)(({ ...props }: Props) => {
  return (
    <ThemedComponent>
      <GroupedBarChart {...props} />
    </ThemedComponent>
  );
});
