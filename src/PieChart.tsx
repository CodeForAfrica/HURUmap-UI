import React from 'react';

import {
  PaddingProps,
  Helpers,
  VictoryPie,
  VictoryPieProps,
  VictoryTooltip
} from 'victory';

import withVictoryTheme from './styles/withVictoryTheme';
import CustomContainer from './CustomContainer';

export interface PieChartProps extends VictoryPieProps {
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
  padding: PaddingProps | undefined,
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
}: PieChartProps) {
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
  let innerRadius = 0;
  if (donut || chart.donut) {
    innerRadius =
      suggestedInnerRadius && suggestedInnerRadius > 0
        ? suggestedInnerRadius
        : DEFAULT_DONUT_INNER_RADIUS;
  }
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
  console.log('PIE', computedRadii);
  return (
    <CustomContainer
      standalone={standalone}
      height={height || chart.height}
      width={width || chart.height}
    >
      <VictoryPie
        standalone={false}
        groupComponent={
          <g
            role="presentation"
            transform={`translate(${-computedGroupSpacing / 2}, 0)`}
          />
        }
        colorScale={colorScale1}
        data={data1}
        endAngle={endAngle1}
        innerRadius={innerRadius}
        radius={computedRadii[0]}
        startAngle={startAngle1}
        theme={theme}
        height={height}
        width={width}
        labelComponent={<VictoryTooltip />}
        {...props}
      />
      {data2 && data2.length > 0 && (
        <VictoryPie
          standalone={false}
          colorScale={colorScale2}
          data={data2}
          endAngle={endAngle2}
          groupComponent={
            <g
              role="presentation"
              transform={`translate(${computedGroupSpacing / 2}, 0)`}
            />
          }
          innerRadius={innerRadius}
          radius={computedRadii[1 % computedRadii.length]}
          startAngle={startAngle2}
          theme={theme}
          height={height}
          width={width}
          labelComponent={<VictoryTooltip />}
          {...props}
        />
      )}
    </CustomContainer>
  );
}

export default withVictoryTheme(PieChart);
