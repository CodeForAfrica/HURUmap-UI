import React from 'react';
import { VictoryChart, VictoryChartProps, VictoryContainer } from 'victory';

import withVictoryTheme from '../styles/withVictoryTheme';

interface Props extends VictoryChartProps {
  children: any;
}

function Chart({ theme, horizontal, width, height, children }: Props) {
  return (
    <VictoryChart
      horizontal={horizontal}
      theme={theme}
      width={width}
      height={height}
      containerComponent={<VictoryContainer responsive={false} />}
    >
      {children}
    </VictoryChart>
  );
}

export default withVictoryTheme(Chart);
