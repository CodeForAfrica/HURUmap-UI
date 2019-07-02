import React from 'react';
import {
  createStyles,
  ThemeProvider,
  WithStyles,
  withStyles
} from '@material-ui/styles';

import theme from '../Theme';

const styles = createStyles({
  root: {}
});

interface Props extends WithStyles<typeof styles> {
  children?: JSX.Element;
}

function ThemedComponent({ children }: Props) {
  return <ThemeProvider theme={theme}>{children}</ThemeProvider>;
}

export default withStyles(styles)(ThemedComponent);
