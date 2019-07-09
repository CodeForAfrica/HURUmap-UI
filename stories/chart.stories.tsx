import React from 'react';
import { storiesOf } from '@storybook/react';
import { boolean, object, withKnobs, array } from '@storybook/addon-knobs';

import {
  BarChart,
  LineChart,
  NestedProportionalAreaChart,
  PieChart
} from '../src';
import { CenterDecorator } from './common';

storiesOf('HURUmap UI|Charts/BarChart', module)
  .addDecorator(CenterDecorator)
  .addDecorator(withKnobs)
  .add('Default', () => <BarChart />)
  .add('Horizontal', () => <BarChart horizontal />);

storiesOf('HURUmap UI|Charts/LineChart', module)
  .addDecorator(CenterDecorator)
  .add('Default', () => <LineChart />);

storiesOf('HURUmap UI|Charts/PieChart', module)
  .addDecorator(CenterDecorator)
  .addDecorator(withKnobs)
  .add('Default', () => (
    <div>
      <PieChart
        donut={boolean('donut', false)}
        data={object('data', [
          { x: 'A', y: 1 },
          { x: 'B', y: 2 },
          { x: 'C', y: 3 },
          { x: 'D', y: 1 },
          { x: 'E', y: 2 }
        ])}
      />
    </div>
  ));
storiesOf('HURUmap UI|Charts/PieChart', module)
  .addDecorator(CenterDecorator)
  .addDecorator(withKnobs)
  .add('Comparison', () => (
    <div>
      <PieChart
        donut={boolean('donut', false)}
        data={object('data', [
          [
            { x: 'A', y: 1 },
            { x: 'B', y: 2 },
            { x: 'C', y: 3 },
            { x: 'D', y: 1 },
            { x: 'E', y: 2 }
          ],
          [
            { x: 'A', y: 2 },
            { x: 'B', y: 1 },
            { x: 'C', y: 1 },
            { x: 'D', y: 1 },
            { x: 'E', y: 5 }
          ]
        ])}
      />
    </div>
  ));

storiesOf('HURUmap UI|Charts/NestedProportionalAreaChart', module)
  .addDecorator(CenterDecorator)
  .addDecorator(withKnobs)
  .add('Default', () => (
    <div>
      <NestedProportionalAreaChart
        square={boolean('square', false)}
        data={array('data', [100, 45])}
      />
    </div>
  ));
