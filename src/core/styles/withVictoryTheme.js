import React from 'react';
import { useTheme } from '@material-ui/styles';

import createVictoryTheme from './createVictoryTheme';

export default function withVictoryTheme(C) {
  return ({ ...props }) => {
    const materialTheme = useTheme();
    const theme = materialTheme ? materialTheme.chart : createVictoryTheme();
    return <C theme={theme} {...props} />;
  };
}
