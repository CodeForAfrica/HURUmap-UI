/* eslint-disable import/prefer-default-export */

import React from 'react';
import { Grid } from '@material-ui/core';
import { ThemeProvider } from '@material-ui/styles';
import Theme from '../src/Theme';

export const CenterDecorator = storyFn => (
  <Grid
    container
    justify="center"
    alignItems="flex-start"
    style={{ width: '100%', height: '500px', overflow: 'hidden' }}
  >
    <ThemeProvider theme={Theme}>{storyFn()}</ThemeProvider>
  </Grid>
);
