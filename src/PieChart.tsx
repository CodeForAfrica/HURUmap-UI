import React from 'react';
import {
  VictoryPie,
  VictoryPieProps,
  VictoryTooltip,
  VictoryChart,
  VictoryThemeDefinition
} from 'victory';
import withVictoryTheme from './styles/withVictoryTheme';

interface Props extends VictoryPieProps {
  donut?: boolean;
  /**
   * radii enables comparing pie charts using areas instead of "pie"s.
   * If this is enabled, a single color will be used for the pie chart.
   *
   * The color will be selected (sequentially) from the supplied colorScale
   * (if any).
   */
  radii?: number[];
}

const DEFAULT_DONUT_INNER_RADIUS = 75; // in degrees
function PieChart({
  theme,
  colorScale,
  data,
  donut = false,
  innerRadius: suggestedInnerRadius = 0,
  radius,
  radii,
  standalone = true,
  height,
  width,
  ...props
}: Props) {
  if (!theme || !data) {
    return null;
  }
  const { pie: chart } = theme;

  if (!chart) {
    return null;
  }
  // If colorScale is null, the one from theme will be used.
  const colorScale1 = colorScale;
  let colorScale2 = colorScale;
  if (radii && colorScale && colorScale.length > 1) {
    colorScale2 = (colorScale as string[]).slice(1);
  }

  const computedRadii = radii || (radius ? [radius] : [chart.width / 2 - 2]);
  const startAngle1 = 0;
  let endAngle1 = 360; // Full circle
  const startAngle2 = 0;
  const endAngle2 = 180; // Half circle clockwise
  let data1 = data;
  let data2;
  if (data.length > 1 && Array.isArray(data[0])) {
    endAngle1 = -180; // Half circle, counter-clockwise
    [data1, data2] = data; // Assume data[2] is also Array
  }
  const innerRadius =
    donut && suggestedInnerRadius <= 0
      ? DEFAULT_DONUT_INNER_RADIUS
      : suggestedInnerRadius;

  return (
    <VictoryChart
      standalone={standalone}
      theme={(theme as unknown) as VictoryThemeDefinition}
      height={height}
      width={width}
    >
      <VictoryPie
        standalone={standalone}
        colorScale={colorScale1}
        data={data1}
        endAngle={endAngle1}
        innerRadius={innerRadius}
        labelComponent={<VictoryTooltip />}
        radius={computedRadii[0]}
        startAngle={startAngle1}
        {...props}
      />
      {data2 && data2.length > 0 && (
        <VictoryPie
          standalone={standalone}
          colorScale={colorScale2}
          data={data2}
          endAngle={endAngle2}
          groupComponent={<g transform="translate(4, 0)" />}
          innerRadius={innerRadius}
          labelComponent={<VictoryTooltip />}
          radius={computedRadii[1 % computedRadii.length]}
          startAngle={startAngle2}
          {...props}
        />
      )}
    </VictoryChart>
  );
}

export default withVictoryTheme(PieChart);
