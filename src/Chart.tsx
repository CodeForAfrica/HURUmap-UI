import React from 'react';

import {
  VictoryAxisProps,
  VictoryChart,
  VictoryChartProps,
  VictoryContainer
} from 'victory';

import withVictoryTheme from './styles/withVictoryTheme';

export interface ChartAxisProps {
  independent?: VictoryAxisProps;
  dependent?: VictoryAxisProps;
}

export type ChartAxisPropsType = VictoryAxisProps | ChartAxisProps;

export function toChartAxisProps(
  prop: ChartAxisPropsType | undefined
): ChartAxisProps {
  if (!prop) {
    return {};
  }

  const chartProp = prop as ChartAxisProps;
  if (chartProp.independent || chartProp.dependent) {
    return chartProp;
  }
  const axisProp = prop as VictoryAxisProps;
  return { independent: axisProp, dependent: axisProp };
}

export interface ChartProps {
  responsive?: boolean;
}

interface Props extends VictoryChartProps, ChartProps {
  children: any;
}

function Chart({ children, responsive = true, ...props }: Props) {
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
