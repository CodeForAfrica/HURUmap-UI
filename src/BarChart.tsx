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
  root: {}
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
  tickValues?: (string | number)[];
  tickFormat?: (string | number)[];
  dependentTickValues?: (string | number)[];
  dependentTickFormat?: (string | number)[];
}

function BarChart({
  classes,
  data,
  tickValues,
  tickFormat,
  dependentTickValues,
  dependentTickFormat,
  median,
  comparisonData,
  comparison = false,
  barWidth = 25,
  horizontal,
  ...props
}: Props) {
  const theme = useTheme<Theme>();
  return (
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
        tickValues={tickValues}
        tickFormat={tickFormat}
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
        tickValues={dependentTickValues}
        tickFormat={dependentTickFormat}
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
  );
}

export default withStyles(styles)(({ ...props }: Props) => {
  return (
    <ThemedComponent>
      <BarChart {...props} />
    </ThemedComponent>
  );
});
