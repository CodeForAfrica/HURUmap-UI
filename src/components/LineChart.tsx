import React from 'react';
import { Theme, WithStyles } from '@material-ui/core';
import { createStyles, useTheme, withStyles } from '@material-ui/styles';
import { VictoryLine, VictoryLineProps } from 'victory';

import ThemedComponent from '../core/ThemedComponent';

const styles = createStyles({
  root: {}
});

interface Props extends WithStyles<typeof styles>, VictoryLineProps {}

function LineChart({ ...props }: Props) {
  const theme = useTheme<Theme>();
  return <VictoryLine theme={theme.chart} {...props} />;
}

export default withStyles(styles)(({ ...props }: Props) => {
  return (
    <ThemedComponent>
      <LineChart {...props} />
    </ThemedComponent>
  );
});
