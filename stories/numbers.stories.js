import React from 'react';
import { storiesOf } from '@storybook/react';
import { withKnobs, text, object } from '@storybook/addon-knobs';
import { NumberChart } from '@hurumap-ui/charts';
import { CenterDecorator } from './common';

storiesOf('HURUmap UI/NumberChart', module)
  .addDecorator(CenterDecorator)
  .addDecorator(withKnobs)
  .add('Default', () => {
    return (
      <NumberChart
        title={text('Title', 'Income')}
        value={text('Value', '$60,336')}
        aside={text('Aside (Appears when hovering over value)', '±0.1%')}
        note={text(
          'Note (Appears when hovering over value)',
          '(194, 667, 872 ±241, 381.6)'
        )}
        description={text('Description', 'Median household income')}
        breakdowns={object('Breakdowns', [
          {
            id: 0,
            description:
              '<b>about 90 percent</b> of the amount in United States: $32,397',
            aside: '±0.1%'
          },
          {
            id: 1,
            description:
              '<b>about 60 percent</b> of the amount in United States: $32,397',
            aside: '±0.1%'
          }
        ])}
      />
    );
  });
