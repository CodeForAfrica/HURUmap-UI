import React from 'react';
import { Theme, WithStyles } from '@material-ui/core';
import { createStyles, useTheme, withStyles } from '@material-ui/styles';
import { VictoryTooltip, VictoryPie, VictoryPieProps } from 'victory';

import ThemedComponent from './ThemedComponent';

const styles = createStyles({
  root: {}
});

interface Props extends WithStyles<typeof styles>, VictoryPieProps {
  donut?: boolean;
  radii?: number[];
}

const DEFAULT_DONUT_INNER_RADIUS = 75; // in degrees
function PieChart({
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
        labelComponent={<VictoryTooltip />}
        radius={computedRadii[0]}
        standalone={false}
        startAngle={startAngle1}
        endAngle={endAngle1}
        data={data1}
        innerRadius={innerRadius}
        theme={theme.chart}
        {...props}
      />
      {data2 && data2.length > 0 && (
        <VictoryPie
          labelComponent={<VictoryTooltip />}
          radius={computedRadii[1 % computedRadii.length]}
          standalone={false}
          startAngle={startAngle2}
          endAngle={endAngle2}
          data={data2}
          groupComponent={<g transform="translate(4, 0)" />}
          innerRadius={innerRadius}
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

export default withStyles(styles)(({ ...props }: Props) => {
  return (
    <ThemedComponent>
      <PieChart {...props} />
    </ThemedComponent>
  );
});
