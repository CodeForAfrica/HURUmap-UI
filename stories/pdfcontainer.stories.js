import React from 'react';
import { storiesOf } from '@storybook/react';
import { withKnobs, text } from '@storybook/addon-knobs';
import { CenterDecorator } from './common';
import { PDFDataContainer } from '../src/core';

storiesOf('HURUmap UI|PDF Container/PDFDataContainer', module)
  .addDecorator(CenterDecorator)
  .addDecorator(withKnobs)
  .add('Default', () => {
    return (
      <PDFDataContainer
        source={text('Pdf Source', 'https://dashboard.takwimu.africa/wp-content/uploads/2020/01/Vision-2030-Popular-Version.pdf')}
      />
    );
  });
