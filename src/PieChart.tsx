import React from 'react';
import {
  BlockProps,
  Helpers,
  VictoryPie,
  VictoryPieProps,
  VictoryTooltip,
  VictoryChart
} from 'victory';
import withVictoryTheme from './styles/withVictoryTheme';

interface Props extends VictoryPieProps {
  donut?: boolean;
  groupSpacing?: number;
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
const computeRadii = (
  width: number | undefined,
  height: number | undefined,
  padding: number | BlockProps | undefined,
  groupSpacing: number | undefined = 0
) => {
  const radius = Helpers.getRadius({ width, height, padding });
  return [radius - groupSpacing / 2];
};
function PieChart({
  colorScale,
  data,
  donut,
  groupSpacing,
  innerRadius: suggestedInnerRadius,
  padding,
  radius,
  radii,
  standalone = true,
  theme,
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
    (donut || chart.donut) && suggestedInnerRadius
      ? suggestedInnerRadius
      : DEFAULT_DONUT_INNER_RADIUS;
  // Only include groupSpacing if in comparison mode
  const computedGroupSpacing = data2 ? groupSpacing || chart.groupSpacing : 0;
  const computedRadii =
    radii ||
    (radius
      ? [radius]
      : computeRadii(
          width || chart.width,
          height || chart.height,
          padding || chart.padding,
          computedGroupSpacing
        ));
  return (
    <VictoryChart
      standalone={standalone}
      theme={theme}
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
