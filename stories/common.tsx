/* eslint-disable import/prefer-default-export */

import React from 'react';
import { RenderFunction } from '@storybook/react';
import { Grid } from '@material-ui/core';

export const CenterDecorator = (storyFn: RenderFunction) => (
  <Grid
    container
    justify="center"
    alignItems="center"
    style={{ width: '100%', height: 'auto', overflow: 'hidden' }}
  >
    {storyFn()}
  </Grid>
);
