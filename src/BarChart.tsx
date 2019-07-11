import React from 'react';
import {
  VictoryBar,
  VictoryBarProps,
  VictoryChart,
  VictoryAxis,
  VictoryLine
} from 'victory';

import ThemedComponent from './ThemedComponent';

interface Props extends VictoryBarProps {
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
  return (
    <VictoryChart domainPadding={{ x: 0, y: 200 }} height={550} width={700}>
      <VictoryBar
        horizontal={horizontal}
        barWidth={barWidth}
        {...props}
        data={data}
        x="x"
        y="y"
      />
      <VictoryAxis tickValues={tickValues} tickFormat={tickFormat} />
      <VictoryAxis
        dependentAxis
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

export default function({ ...props }: Props) {
  return (
    <ThemedComponent>
      <BarChart {...props} />
    </ThemedComponent>
  );
}
