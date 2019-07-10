import React from 'react';
import { Theme } from '@material-ui/core';
import { useTheme } from '@material-ui/styles';
import { VictoryPie, VictoryPieProps, VictoryTooltip } from 'victory';

import ThemedComponent from './ThemedComponent';

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
  colorScale,
  data,
  donut = false,
  innerRadius: suggestedInnerRadius = 0,
  radius,
  radii,
  standalone = true,
  ...props
}: Props) {
  const theme = useTheme<Theme>();
  const { pie: chart } = theme.chart;
  if (!data || !chart) {
    return null;
  }

  const padding =
    typeof chart.padding === 'number'
      ? { padding: chart.padding }
      : {
          paddingTop: chart.padding.top,
          paddingRight: chart.padding.right,
          paddingBottom: chart.padding.bottom,
          paddingLeft: chart.padding.left
        };
  const style = Object.assign(padding, chart.style.parent, {
    width: '100%',
    height: '100%'
  });

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

  const component = (
    <React.Fragment>
      <VictoryPie
        colorScale={colorScale1}
        data={data1}
        endAngle={endAngle1}
        innerRadius={innerRadius}
        labelComponent={<VictoryTooltip />}
        radius={computedRadii[0]}
        standalone={false}
        startAngle={startAngle1}
        theme={theme.chart}
        {...props}
      />
      {data2 && data2.length > 0 && (
        <VictoryPie
          colorScale={colorScale2}
          data={data2}
          endAngle={endAngle2}
          groupComponent={<g transform="translate(4, 0)" />}
          innerRadius={innerRadius}
          labelComponent={<VictoryTooltip />}
          radius={computedRadii[1 % computedRadii.length]}
          standalone={false}
          startAngle={startAngle2}
          theme={theme.chart}
          {...props}
        />
      )}
    </React.Fragment>
  );

  if (standalone) {
    return (
      <svg style={style} viewBox={`0 0 ${chart.width} ${chart.height}`}>
        {component}
      </svg>
    );
  }
  return <g>{component}</g>;
}

export default function({ ...props }: Props) {
  return (
    <ThemedComponent>
      <PieChart {...props} />
    </ThemedComponent>
  );
}
