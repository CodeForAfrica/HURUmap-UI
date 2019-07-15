import React from 'react';
import { VictoryChart, VictoryChartProps, VictoryContainer } from 'victory';

import withVictoryTheme from '../styles/withVictoryTheme';

interface Props extends VictoryChartProps {
  children: any;
}

function HurumapChart({ children, ...props }: Props) {
  return (
    <VictoryChart
      containerComponent={<VictoryContainer responsive={false} />}
      {...props}
    >
      {children}
    </VictoryChart>
  );
}

export default withVictoryTheme(HurumapChart);
