import React from 'react';
import {
  createStyles,
  ThemeProvider,
  WithStyles,
  withStyles
} from '@material-ui/styles';

import { useTheme } from '@material-ui/core';
import defaultTheme from './Theme';

const styles = createStyles({
  root: {}
});

interface Props extends WithStyles<typeof styles> {
  children?: JSX.Element;
}

function ThemedComponent({ children }: Props) {
  const theme = useTheme();

  return (
    <ThemeProvider theme={Object.assign({}, defaultTheme, theme)}>
      {children}
    </ThemeProvider>
  );
}

export default withStyles(styles)(ThemedComponent);
