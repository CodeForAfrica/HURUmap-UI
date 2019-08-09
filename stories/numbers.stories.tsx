import React from 'react';
import { storiesOf } from '@storybook/react';
import { withKnobs, text, number } from '@storybook/addon-knobs';
import { CenterDecorator } from './common';
import { NumberVisuals } from '../src';

storiesOf('HURUmap UI|ChartContainer/NumberVisuals', module)
  .addDecorator(CenterDecorator)
  .addDecorator(withKnobs)
  .add('Default', () => {
    return (
      <NumberVisuals
        subtitle={text('Subtitle', 'Income')}
        statistic={text('Statistic', '$60,336')}
        statisticDeviation={text('Statistic Deviation', '±0.1% ')}
        secondaryDeviation={text('Secondary Deviation', '(194, 667, 872 ±241, 381.6)')}
        description={text('Description', 'Median household income')}
        parentComparison={text('Parent Comparison', 'about 90 percent')}
        parentDescription={text('Parent Description', 'of the amount in United States: $32,397')}
        parentDeviation={text('Parent Deviation', '±0.24%')}
      />
    );
  });
