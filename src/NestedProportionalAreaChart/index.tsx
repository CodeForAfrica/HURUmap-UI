import React from 'react';
import { Theme, WithStyles } from '@material-ui/core';
import { createStyles, useTheme, withStyles } from '@material-ui/styles';
import {
  Circle,
  Rect,
  VictoryCommonProps,
  VictoryDatableProps,
  VictoryMultiLabeableProps
} from 'victory';

import ThemedComponent from '../ThemedComponent';
import SquareChart from './SquareChart';
import CircleChart from './CircleChart';

const styles = createStyles({
  root: {}
});

interface Props
  extends WithStyles<typeof styles>,
    VictoryCommonProps,
    VictoryDatableProps,
    VictoryMultiLabeableProps {
  square?: boolean;
}

function NestedProportionalAreaChart({
  data,
  square = false,
  ...props
}: Props) {
  if (!data) {
    return null;
  }

  return (
    <div>
      <svg style={{ width: '100%', height: '100%' }} viewBox="0 0 450 450">
        {square ? (
          <SquareChart data={data} {...props} />
        ) : (
          <CircleChart data={data} {...props} />
        )}
      </svg>
    </div>
  );
}

export default withStyles(styles)(({ ...props }: Props) => {
  return (
    <ThemedComponent>
      <NestedProportionalAreaChart {...props} />
    </ThemedComponent>
  );
});
