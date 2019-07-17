import React from 'react';
import { VictoryChart, VictoryChartProps, VictoryContainer } from 'victory';

import withVictoryTheme from '../styles/withVictoryTheme';

export interface ChartProps {
  responsive?: boolean;
}

interface Props extends VictoryChartProps, ChartProps {
  children: any;
}

function Chart({ children, responsive = false, ...props }: Props) {
  return (
    <VictoryChart
      containerComponent={<VictoryContainer responsive={responsive} />}
      {...props}
    >
      {children}
    </VictoryChart>
  );
}

export default withVictoryTheme(Chart);
