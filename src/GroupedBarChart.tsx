import React from 'react';
import { Theme, WithStyles } from '@material-ui/core';
import { createStyles, useTheme, withStyles } from '@material-ui/styles';
import {
  VictoryBar,
  VictoryBarProps,
  VictoryChart,
  VictoryLine,
  VictoryGroup
} from 'victory';

import ThemedComponent from './ThemedComponent';

const styles = createStyles({
  root: {}
});

interface Props extends WithStyles<typeof styles>, VictoryBarProps {
  comparsion?: boolean;
}

//
//
function GroupedBarChart({ comparsion = false, ...props }: Props) {
  const theme = useTheme<Theme>();
  const { horizontal } = props;

  const data = [
    {
      label: 'Slept under any net last night',
      data: [
        { x: 'Pregnant Women', y: Math.random() * 10 },
        { x: 'Children', y: Math.random() * 10 }
      ]
    },
    {
      label: 'Used ITN last night',
      data: [
        { x: 'Pregnant Women', y: Math.random() * 10 },
        { x: 'Children', y: Math.random() * 10 }
      ]
    },
    {
      label: 'Used ITN all year ',
      data: [
        { x: 'Pregnant Women', y: Math.random() * 10 },
        { x: 'Children', y: Math.random() * 10 }
      ]
    }
  ];
  return (
    <VictoryChart domainPadding={40} height={250}>
      <VictoryGroup offset={22} style={{ data: { width: 20 } }}>
        {data.map(d => (
          <VictoryBar
            theme={theme.chart}
            style={{
              data: { fill: '#7f9442' }
            }}
            data={d.data}
            {...props}
          />
        ))}
      </VictoryGroup>
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
