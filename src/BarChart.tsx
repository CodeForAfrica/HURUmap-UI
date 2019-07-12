import React from 'react';
import {
  VictoryBar,
  VictoryBarProps,
  VictoryChart,
  VictoryAxis,
  VictoryTheme
} from 'victory';
import { useTheme } from '@material-ui/styles';
import { Theme } from '@material-ui/core';

interface Props extends VictoryBarProps {
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
  barWidth = 25,
  horizontal,
  ...props
}: Props) {
  const theme = useTheme<Theme>();
  if (!data) {
    return null;
  }

  let data1 = data;
  let data2;
  if (data.length > 1 && Array.isArray(data[0])) {
    [data1, data2] = data; // Assume data[2] is also Array
  }

  return (
    <VictoryChart theme={theme ? theme.chart : VictoryTheme.material}>
      <VictoryBar
        horizontal={horizontal}
        barWidth={barWidth}
        {...props}
        data={data1}
        x="x"
        y="y"
      />
      <VictoryAxis tickValues={tickValues} tickFormat={tickFormat} />
      <VictoryAxis
        dependentAxis
        tickValues={dependentTickValues}
        tickFormat={dependentTickFormat}
      />
      {data2 && data2.length > 0 && (
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
          data={data2}
        />
      )}
    </VictoryChart>
  );
}

export default BarChart;
