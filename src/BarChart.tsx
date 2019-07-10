import React from 'react';
import { Theme, WithStyles } from '@material-ui/core';
import { createStyles, useTheme, withStyles } from '@material-ui/styles';
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
  median?: {
    x: string | number;
    y: number | number;
  }[];
  comparisonData?: {
    x: string | number;
    y: number | number;
  }[];
}

function BarChart({
  classes,
  data,
  median,
  comparisonData,
  comparison = false,
  barWidth = 25,
  horizontal,
  ...props
}: Props) {
  const theme = useTheme<Theme>();

  return (
    <div className={classes.root}>
      <VictoryChart domainPadding={{ x: 0, y: 200 }} height={550} width={700}>
        <VictoryBar
          horizontal={horizontal}
          style={{
            data: { fill: '#7f9442' }
          }}
          barWidth={barWidth}
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
        {comparison && comparisonData && (
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
              data: { fill: '#de9f39' }
            }}
            barWidth={barWidth}
            {...props}
            data={comparisonData}
          />
        )}
        {median && (
          <VictoryLine
            horizontal={horizontal}
            interpolation="step"
            data={median}
            groupComponent={<g transform="translate(6, 0)" />}
            style={{
              data: {
                stroke: 'black',
                strokeWidth: 0.8,
                opacity: 0.4,
                strokeLinecap: 'round'
              }
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
