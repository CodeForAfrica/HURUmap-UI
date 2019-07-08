import React from 'react';
import { Theme, WithStyles } from '@material-ui/core';
import { createStyles, useTheme, withStyles } from '@material-ui/styles';
import { VictoryBar, VictoryBarProps } from 'victory';

import ThemedComponent from './common/ThemedComponent';

const styles = createStyles({
  root: {}
});

interface Props extends WithStyles<typeof styles>, VictoryBarProps {}

function BarChart({ ...props }: Props) {
  const theme = useTheme<Theme>();
  return <VictoryBar theme={theme.chart} {...props} />;
}

export default withStyles(styles)(({ ...props }: Props) => {
  return (
    <ThemedComponent>
      <BarChart {...props} />
    </ThemedComponent>
  );
});
