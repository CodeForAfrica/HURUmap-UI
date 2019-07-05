import React from 'react';
import { Theme, WithStyles } from '@material-ui/core';
import { createStyles, useTheme, withStyles } from '@material-ui/styles';
import { VictoryPie, VictoryPieProps } from 'victory';

import ThemedComponent from './ThemedComponent';

const styles = createStyles({
  root: {}
});

interface Props extends WithStyles<typeof styles>, VictoryPieProps {
  donut?: boolean;
}

const DEFAULT_DONUT_INNER_RADIUS = 90; // in degrees
function PieChart({
  donut,
  innerRadius: suggestedInnerRadius = 0,
  ...props
}: Props) {
  let innerRadius = suggestedInnerRadius;
  if (donut && suggestedInnerRadius <= 0) {
    innerRadius = DEFAULT_DONUT_INNER_RADIUS;
  }
  const theme = useTheme<Theme>();
  return (
    <VictoryPie innerRadius={innerRadius} theme={theme.chart} {...props} />
  );
}

export default withStyles(styles)(({ ...props }: Props) => {
  return (
    <ThemedComponent>
      <PieChart {...props} />
    </ThemedComponent>
  );
});
