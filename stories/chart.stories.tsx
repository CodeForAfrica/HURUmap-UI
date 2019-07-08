import React from 'react';
import { storiesOf } from '@storybook/react';
import { withKnobs } from '@storybook/addon-knobs';

import { BarChart, LineChart } from '../src';
import { CenterDecorator } from './common';

storiesOf('Hurumap UI|Charts/BarChart', module)
  .addDecorator(CenterDecorator)
  .addDecorator(withKnobs)
  .add('Default', () => <BarChart />)
  .add('Horizontal', () => <BarChart horizontal />)
  .add('Comparison Vertical', () => <BarChart vertical />)
  .add('Comparison Horizontal', () => <BarChart comparsion />);

storiesOf('HURUmap UI|Charts/LineChart', module)
  .addDecorator(CenterDecorator)
  .add('Default', () => <LineChart />);
