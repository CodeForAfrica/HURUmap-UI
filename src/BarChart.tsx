import React from 'react';
import { Theme, WithStyles } from '@material-ui/core';
import { createStyles, useTheme, withStyles } from '@material-ui/styles';
import {
  VictoryBar,
  VictoryBarProps,
  VictoryChart,
  VictoryLine
} from 'victory';

import ThemedComponent from './ThemedComponent';

const styles = createStyles({
  root: {}
});

interface Props extends WithStyles<typeof styles>, VictoryBarProps {
  comparsion?: boolean;
}

function BarChart({ comparsion = false, horizontal, ...props }: Props) {
  const theme = useTheme<Theme>();
  return (
    <VictoryChart domainPadding={20} height={250}>
      <VictoryBar
        horizontal
        theme={theme.chart}
        style={{
          data: { fill: '#7f9442' }
        }}
        barWidth={20}
        {...props}
        data={[
          { x: 1, y: 5 },
          { x: 3, y: 4 },
          { x: 5, y: 3 },
          { x: 7, y: 4 },
          { x: 9, y: 2 }
        ]}
      />
      {comparsion && (
        <VictoryBar
          horizontal
          theme={theme.chart}
          style={{
            data: { fill: '#DE9F39' }
          }}
          barWidth={20}
          {...props}
          data={[
            { x: 2, y: 4 },
            { x: 4, y: 3 },
            { x: 6, y: 4 },
            { x: 8, y: 6 }
          ]}
        />
      )}
      {horizontal && (
        <VictoryLine
          style={{
            data: { stroke: 'black' },
            parent: { border: '1px solid #fff' }
          }}
          data={[
            { x: 1, y: 0.5 },
            { x: 1.5, y: 0.5 },
            { x: 3, y: 5 },
            { x: 4, y: 4 },
            { x: 5, y: 7 }
          ]}
        />
      )}
    </VictoryChart>
  );
}

export default withStyles(styles)(({ ...props }: Props) => {
  return (
    <ThemedComponent>
      <BarChart {...props} />
    </ThemedComponent>
  );
});
