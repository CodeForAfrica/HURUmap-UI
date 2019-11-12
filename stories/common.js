/* eslint-disable import/prefer-default-export */
import React from 'react';

import { Grid } from '@material-ui/core';
import { ThemeProvider } from '@material-ui/core/styles';

import theme from './theme';

export const CenterDecorator = storyFn => (
  <Grid
    container
    justify="center"
    alignItems="flex-start"
    style={{ width: '100%', height: 'auto', overflow: 'hidden' }}
  >
    <ThemeProvider theme={theme}>{storyFn()}</ThemeProvider>
  </Grid>
);
