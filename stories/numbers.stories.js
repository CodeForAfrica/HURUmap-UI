import React, { useRef } from 'react';
import { storiesOf } from '@storybook/react';
import { withKnobs, text, object } from '@storybook/addon-knobs';
import { NumberChart } from '@hurumap-ui/charts';
import { CenterDecorator } from './common';

storiesOf('HURUmap UI/Charts/NumberChart', module)
  .addDecorator(CenterDecorator)
  .addDecorator(withKnobs)
  .add('Default', () => {
    const locale = text('Locale', 'en-GB');
    const numberFormat = object('Number Formatter Options', {
      style: 'currency',
      currency: 'USD'
    });
    const numberFormatter = (() => {
      try {
        const formatter = new Intl.NumberFormat(locale, {
          maximumFractionDigits: 2,
          ...numberFormat
        });
        return formatter;
      } catch (e) {
        try {
          return new Intl.NumberFormat(locale);
        } catch {
          return new Intl.NumberFormat();
        }
      }
    })();
    const customUnit = text('Custom Unit', '');
    const format = value => {
      let formatValue = value;
      let compactUnit = '';
      if (value > 10 ** 12) {
        compactUnit = 'T';
        formatValue = value / 10 ** 12;
      } else if (value > 10 ** 9) {
        compactUnit = 'B';
        formatValue = value / 10 ** 9;
      } else if (value > 10 ** 6) {
        compactUnit = 'M';
        formatValue = value / 10 ** 6;
      } else {
        //
      }
      if (numberFormat.style === 'percent') {
        formatValue /= 100;
      }
      return `${numberFormatter.format(
        formatValue
      )}${compactUnit} ${customUnit}`.trim(); // in case customUnit is empty
    };

    const data = object('Data', [
      {
        x: 'Kenya',
        y: 60336,
        label: 'Median household income',
        hover: '±0.1% (194, 667, 872 ±241, 381.6)'
      },
      {
        x: 'Tanzania',
        y: 32397,
        hover: '±0.1%'
      },
      {
        x: 'Uganda',
        y: 32397,
        hover: '±0.1%'
      }
    ]);
    return (
      <NumberChart
        title={text('Title', 'Income')}
        data={data}
        labels={d => format(d.y)}
      />
    );
  });
