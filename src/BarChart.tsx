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
  VictoryAxis,
  VictoryLine
} from 'victory';

import ThemedComponent from './ThemedComponent';

const styles = createStyles({
  root: {
    flexGrow: 1
  }
});

interface Props extends WithStyles<typeof styles>, VictoryBarProps {
  comparison?: boolean;
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
const median = [
  { x: 0, y: 10 },
  { x: 1, y: 2.5 },
  { x: 2, y: 10 },
  { x: 3, y: 20 },
  { x: 4, y: 15 },
  { x: 5, y: 10 },
  { x: 4, y: 4 },
  { x: 6, y: 2 },
  { x: 7, y: 5 },
  { x: 8, y: 5 }
];
const comparisonData = [
  { x: 0, y: 0 },
  { x: 1, y: 10 },
  { x: 2, y: 6 },
  { x: 3, y: 15 },
  { x: 4, y: 32.5 },
  { x: 5, y: 20 },
  { x: 6, y: 15.5 },
  { x: 7, y: 20 }
];

function BarChart({
  classes,
  comparison = false,
  horizontal,
  ...props
}: Props) {
  const theme = useTheme<Theme>();
  return (
    <div className={classes.root}>
      <VictoryChart domainPadding={{ x: 60, y: 200 }} height={550} width={700}>
        <VictoryBar
          horizontal={horizontal}
          style={{
            data: { fill: '#7f9442' }
          }}
          barWidth={25}
          {...props}
          data={data}
          x="x"
          y="y"
        />
        <VictoryAxis
          style={{
            axis: { stroke: 'grey', opacity: 0.2 },
            axisLabel: { fontSize: 20, padding: 40 },
            grid: { stroke: 'none' },
            ticks: { stroke: 'none' },
            tickLabels: { fontSize: 15, padding: 10, opacity: 0.5 }
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
            tickLabels: { fontSize: 15, padding: 10, opacity: 0.5 }
          }}
          tickValues={[0, 17.5, 35]}
          tickFormat={['0%', '17.5%', '35%']}
        />
        {comparison && (
          <VictoryBar
            groupComponent={
              !horizontal ? (
                <g transform="translate(25, 0)" />
              ) : (
                <g transform="translate(0, 25)" />
              )
            }
            theme={theme.chart}
            style={{
              data: { fill: '#DE9F39' }
            }}
            barWidth={25}
            {...props}
            data={comparisonData}
          />
        )}
        {!horizontal && comparison && (
          <VictoryLine
            horizontal={horizontal}
            data={median}
            interpolation="step"
            style={{
              data: { stroke: 'black', strokeWidth: 0.8, opacity: 0.4 }
            }}
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
