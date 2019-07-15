import React from 'react';
import { VictoryCommonProps } from 'victory';
import { useTheme } from '@material-ui/styles';
import { Theme } from '@material-ui/core';
import createVictoryTheme from './createVictoryTheme';

export default function withVictoryTheme<P>(
  C: React.ComponentType<P & VictoryCommonProps>
) {
  return ({ ...props }: P) => {
    const materialTheme = useTheme<Theme>();
    const theme = materialTheme ? materialTheme.chart : createVictoryTheme();
    return <C theme={theme} {...props} />;
  };
}
