import React from 'react';
import { storiesOf } from '@storybook/react';
import { withKnobs } from '@storybook/addon-knobs';

import PDFDataContainer from '@hurumap-ui/core/PDFDataContainer';
import { CenterDecorator } from './common';

storiesOf('HURUmap UI/PDF', module)
  .addDecorator(CenterDecorator)
  .addDecorator(withKnobs)
  .add('Default', () => {
    return <PDFDataContainer source="/public/sample.pdf" />;
  });
