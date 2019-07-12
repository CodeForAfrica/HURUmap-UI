import React from 'react';
import {
  VictoryBar,
  VictoryBarProps,
  VictoryChart,
  VictoryAxis
} from 'victory';
import withVictoryTheme from './withVictoryTheme';

interface Props extends VictoryBarProps {
  tickValues?: (string | number)[];
  tickFormat?: (string | number)[];
  dependentTickValues?: (string | number)[];
  dependentTickFormat?: (string | number)[];
}

function BarChart({
  theme,
  data,
  tickValues,
  tickFormat,
  dependentTickValues,
  dependentTickFormat,
  barWidth = 25,
  horizontal,
  width,
  height,
  ...props
}: Props) {
  if (!data) {
    return null;
  }

  let data1 = data;
  let data2;
  if (data.length > 1 && Array.isArray(data[0])) {
    [data1, data2] = data; // Assume data[2] is also Array
  }

  return (
    <VictoryChart
      horizontal={horizontal}
      theme={theme}
      width={width}
      height={height}
    >
      <VictoryBar barWidth={barWidth} {...props} data={data1} x="x" y="y" />
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
      <VictoryAxis tickValues={tickValues} tickFormat={tickFormat} />
      <VictoryAxis
        dependentAxis
        tickValues={dependentTickValues}
        tickFormat={dependentTickFormat}
      />
    </VictoryChart>
  );
}

export default withVictoryTheme(BarChart);
