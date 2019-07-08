import React from 'react';
import { Theme, WithStyles } from '@material-ui/core';
import {
  createStyles,
  useTheme,
  withStyles,
  mergeClasses
} from '@material-ui/styles';
import {
  VictoryBar,
  VictoryBarProps,
  VictoryChart,
  VictoryAxis
} from 'victory';

import ThemedComponent from './ThemedComponent';

const styles = createStyles({
  root: {
    flexGrow: 1
  }
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
  { x: 5, y: 20 },
  { x: 4, y: 8 },
  { x: 6, y: 4 },
  { x: 7, y: 10 }
];

function BarChart({
  classes,
  comparsion = false,
  vertical,
  horizontal,
  ...props
}: Props) {
  const theme = useTheme<Theme>();
  return (
    <div className={classes.root}>
      <VictoryChart domainPadding={{ x: 60, y: 200 }} height={550} width={700}>
        <VictoryAxis
          style={{
            axis: { stroke: 'none' },
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
          style={{
            axis: { stroke: 'none' },
            axisLabel: { fontSize: 20, padding: 40 },
            grid: { stroke: 'grey', opacity: 0.5 },
            ticks: { stroke: 'none' },
            tickLabels: { fontSize: 15, padding: 10 }
          }}
          tickValues={[0, 17.5, 35]}
          tickFormat={['0%', '17.5%', '35%']}
        />

        <VictoryBar
          style={{
            data: { fill: '#7f9442' }
          }}
          barWidth={25}
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
            barWidth={25}
            data={data}
            {...props}
          />
        )}
        {vertical && (
          <VictoryBar
            {...props}
            alignment="start"
            style={{
              data: { fill: '#DE9F39' }
            }}
            barWidth={25}
            groupComponent={<g transform="translate(20, 0)" />}
            data={[
              { x: 1, y: 10 },
              { x: 2, y: 6 },
              { x: 3, y: 15 },
              { x: 4, y: 32.5 },
              { x: 5, y: 20 },
              { x: 6, y: 15.5 },
              { x: 7, y: 20 }
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
            groupComponent={<g transform="translate(0, 25)" />}
            barWidth={25}
            {...props}
            data={[
              { x: 1, y: 10 },
              { x: 2, y: 6 },
              { x: 3, y: 15 },
              { x: 4, y: 32.5 },
              { x: 5, y: 20 },
              { x: 6, y: 15.5 },
              { x: 7, y: 20 }
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
