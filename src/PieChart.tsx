import React from 'react';
import { Theme, WithStyles } from '@material-ui/core';
import { createStyles, useTheme, withStyles } from '@material-ui/styles';
import { VictoryTooltip, VictoryPie, VictoryPieProps } from 'victory';

import ThemedComponent from './ThemedComponent';

const styles = createStyles({
  root: {
    width: '100%',
    height: '100%'
  }
});

interface Props extends WithStyles<typeof styles>, VictoryPieProps {
  donut?: boolean;
}

const DEFAULT_DONUT_INNER_RADIUS = 75; // in degrees
function PieChart({
  data,
  donut = false,
  innerRadius: suggestedInnerRadius = 0,
  ...props
}: Props) {
  const theme = useTheme<Theme>();
  if (!data) {
    return null;
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
    donut && suggestedInnerRadius <= 0
      ? DEFAULT_DONUT_INNER_RADIUS
      : suggestedInnerRadius;
  return (
    <div>
      <svg style={{ width: '100%', height: '100%' }} viewBox="0 0 450 450">
        <g>
          <VictoryPie
            labelComponent={<VictoryTooltip />}
            radius={100}
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
              radius={100}
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
        </g>
      </svg>
    </div>
  );
}

export default withStyles(styles)(({ ...props }: Props) => {
  return (
    <ThemedComponent>
      <PieChart {...props} />
    </ThemedComponent>
  );
});
