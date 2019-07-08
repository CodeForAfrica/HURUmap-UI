import React from 'react';
import { Theme, WithStyles } from '@material-ui/core';
import { createStyles, useTheme, withStyles } from '@material-ui/styles';
import {
  VictoryBar,
  VictoryBarProps,
  VictoryChart,
  VictoryLine,
  VictoryAxis,
  VictoryGroup
} from 'victory';

import ThemedComponent from './ThemedComponent';

const styles = createStyles({
  root: {}
});

interface Props extends WithStyles<typeof styles>, VictoryBarProps {
  comparsion?: boolean;
  vertical?: boolean;
}

const data = [
  { x: 1, y: 5 },
  { x: 2, y: 17.5 },
  { x: 3, y: 30 },
  { x: 4, y: 35 },
  { x: 5, y: 23 },
  { x: 4, y: 8 },
  { x: 6, y: 4 },
  { x: 7, y: 10 }
];

function BarChart({
  comparsion = false,
  vertical,
  horizontal,
  ...props
}: Props) {
  const theme = useTheme<Theme>();
  return (
    <div>
      <VictoryChart domainPadding={40} height={500} width={700}>
        <VictoryAxis
          style={{
            axis: { stroke: 'grey' },
            axisLabel: { fontSize: 20, padding: 40 },
            grid: { stroke: 'none' },
            ticks: { stroke: 'none' },
            tickLabels: { fontSize: 15, padding: 10 }
          }}
          tickValues={[1, 2, 3, 4, 5, 6, 7]}
          tickFormat={[
            '0-9',
            '10-19',
            '20-29',
            '30-39',
            '40-49',
            '50-69',
            '80+'
          ]}
        />
        <VictoryAxis
          dependentAxis
          tickValues={[0, 17.5, 35]}
          tickFormat={['0%', '17.5%', '35%']}
        />

        <VictoryBar
          style={{
            data: { fill: '#7f9442' }
          }}
          barWidth={50}
          {...props}
          data={data}
          x="x"
          y="y"
        />
        {horizontal && (
          <VictoryBar
            horizontal
            theme={theme.chart}
            style={{
              data: { fill: '#7f9442' }
            }}
            barWidth={30}
            data={data}
            {...props}
          />
        )}
        {vertical && (
          <VictoryBar
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
      </VictoryChart>
    </div>
  );
}

export default withStyles(styles)(({ ...props }: Props) => {
  return (
    <ThemedComponent>
      <BarChart {...props} />
    </ThemedComponent>
  );
});
