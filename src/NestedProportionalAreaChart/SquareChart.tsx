import React from 'react';
import { Theme, WithStyles } from '@material-ui/core';
import { createStyles, useTheme, withStyles } from '@material-ui/styles';
import {
  Rect,
  VictoryCommonProps,
  VictoryDatableProps,
  VictoryMultiLabeableProps
} from 'victory';

import ThemedComponent from '../ThemedComponent';

import calculateProportions from './proportional';

const styles = createStyles({
  root: {}
});

interface Props
  extends WithStyles<typeof styles>,
    VictoryCommonProps,
    VictoryDatableProps,
    VictoryMultiLabeableProps {}

function NestedProportionalSquareChart({ data, ...props }: Props) {
  const theme = useTheme<Theme>();
  if (!data) {
    return null;
  }
  const { pie } = theme.chart;
  const colorScale = pie ? pie.colorScale : ['#000'];
  const getStyles = (i: number) => ({
    fill: colorScale[i % colorScale.length]
  });
  const proportions = calculateProportions(data);
  return (
    <g>
      {proportions.map((v: number, i: number) => (
        <Rect x={25} y={25} width={v * 2} height={v * 2} style={getStyles(i)} />
      ))}
    </g>
  );
}

export default withStyles(styles)(({ ...props }: Props) => {
  return (
    <ThemedComponent>
      <NestedProportionalSquareChart {...props} />
    </ThemedComponent>
  );
});
