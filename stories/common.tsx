/* eslint-disable import/prefer-default-export */

import React from 'react';
import { RenderFunction } from '@storybook/react';
import { Grid } from '@material-ui/core';
import { ThemeProvider } from '@material-ui/styles';
import Theme from '../src/Theme';

export const CenterDecorator = (storyFn: RenderFunction) => (
  <Grid
    container
    justify="center"
    alignItems="center"
    style={{ width: '100%', height: '650', overflow: 'hidden' }}
  >
    <ThemeProvider theme={Theme}>{storyFn()}</ThemeProvider>
  </Grid>
);
