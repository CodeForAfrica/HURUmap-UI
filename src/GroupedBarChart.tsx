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
  data: {
    xLabel: string;
    data: {
      x: string | number;
      y: number;
    }[];
  }[];
}

function GroupedBarChart({ data, barWidth = 40, ...props }: Props) {
  const theme = useTheme<Theme>();
  return (
    <VictoryChart>
      <VictoryGroup offset={barWidth + 5} colorScale="qualitative">
        {data.map(d => (
          <VictoryBar
            barWidth={barWidth}
            theme={theme.chart}
            data={d.data}
            {...props}
          />
        ))}
      </VictoryGroup>
      <VictoryAxis />
    </VictoryChart>
  );
}

export default withStyles(styles)(({ ...props }: Props) => {
  return (
    <ThemedComponent>
      <GroupedBarChart {...props} />
    </ThemedComponent>
  );
});
