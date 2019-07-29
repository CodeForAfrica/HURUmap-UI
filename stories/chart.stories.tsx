import React from 'react';
import { storiesOf } from '@storybook/react';
import {
  withKnobs,
  boolean,
  object,
  text,
  number
} from '@storybook/addon-knobs';

import {
  BarChart,
  BulletChart,
  LineChart,
  PieChart,
  NestedProportionalAreaChart,
  ComparisonBarChart
} from '../src';
import { CenterDecorator } from './common';

const rand = () => Number((Math.random() * 100).toFixed(1));

storiesOf('HURUmap UI|Charts/BarChart', module)
  .addDecorator(CenterDecorator)
  .addDecorator(withKnobs)
  .add('Default', () => {
    const horizontal = boolean('horizontal', false);
    const data = Array(number('data', 3)).fill(null);

    return (
      <div
        style={{
          height: '300px',
          overflowX: horizontal ? 'hidden' : 'auto',
          overflowY: horizontal ? 'auto' : 'hidden'
        }}
      >
        <BarChart
          horizontal={horizontal}
          width={number('width', 500)}
          height={number('height', 300)}
          data={data.map((_, index) => ({
            x: `${index}-${index} abc def ghijk rst`,
            y: rand()
          }))}
          dependantAxisProps={{
            style: {
              axis: {
                display: 'block'
              },
              grid: {
                display: 'block'
              },
              tickLabels: {
                display: 'block'
              }
            },
            tickValues: object('dependentTickValues', [10, 50, 90]),
            tickFormat: object('dependentTickFormat', ['10%', '50%', '90%'])
          }}
        />
      </div>
    );
  })
  .add('Grouped', () => {
    const groups = Array(number('groups', 12)).fill(null);
    const data = Array(number('data', 2)).fill(null);
    const horizontal = boolean('horizontal', false);

    return (
      <div
        style={{
          height: '300px',
          overflowX: horizontal ? 'hidden' : 'auto',
          overflowY: horizontal ? 'auto' : 'hidden'
        }}
      >
        <BarChart
          width={number('width', 500)}
          height={number('height', 300)}
          labels={datum => `${datum.y}${text('dataUnit', '%')}`}
          horizontal={horizontal}
          data={groups.map((_, groupIndex) => ({
            label: `Group ${groupIndex} Label`,
            data: data.map((_d, index) => ({
              x: `Data ${index} Label`,
              y: rand()
            }))
          }))}
        />
      </div>
    );
  })
  .add('Histogram', () => {
    const bins = Array(number('bins', 3)).fill(null);
    const horizontal = boolean('horizontal', false);

    return (
      <div
        style={{
          height: '300px',
          overflowX: horizontal ? 'hidden' : 'auto',
          overflowY: horizontal ? 'auto' : 'hidden'
        }}
      >
        <BarChart
          width={number('width', 500)}
          height={number('height', 300)}
          barSpacing={0}
          horizontal={horizontal}
          data={bins.map((_, index) => ({
            x: `Bin #${index}`,
            y: rand()
          }))}
        />
      </div>
    );
  });

storiesOf('HURUmap UI|Charts/Bullet Chart', module)
  .addDecorator(CenterDecorator)
  .addDecorator(withKnobs)
  .add('Default', () => (
    <div>
      <BulletChart
        width={number('width', 350)}
        height={number('height', 100)}
        data={object('data', [
          { x: 49, label: 'Male' },
          { x: 51, label: 'Female' }
        ])}
        total={100}
        labels={d => `${d.x}% ${d.label}`}
        reference={object('reference', [{ x: 51, label: '' }])}
      />
    </div>
  ))
  .add('Comparison', () => (
    <div>
      <BulletChart
        width={number('width', 350)}
        height={number('height', 100)}
        offset={object('offset', { x: 25, y: 50 })}
        data={object('data', [
          [{ x: 12.7, label: 'Living in urban areas' }],
          [{ x: 9.3, label: 'Living in urban areas' }]
        ])}
        total={100}
        labels={d => `${d.x}% ${d.label}`}
        reference={object('reference', [{ x: 51 }])}
      />
    </div>
  ));

storiesOf('HURUmap UI|Charts/LineChart', module)
  .addDecorator(CenterDecorator)
  .addDecorator(withKnobs)
  .add('Default', () => (
    <div>
      <LineChart
        data={object('data', [
          { x: 1, y: -3 },
          { x: 2, y: 5 },
          { x: 3, y: 3 },
          { x: 4, y: 0 },
          { x: 5, y: -2 },
          { x: 6, y: -2 },
          { x: 7, y: 5 }
        ])}
        parts={{
          group: {
            labels: d => `y: ${d.y}`
          },
          axis: {
            style: {
              axis: { display: 'block' },
              axisLabel: { display: 'block' },
              grid: { display: 'block' },
              tickLabels: { display: 'block' },
              ticks: { display: 'block' }
            }
          },
          scatter: { size: 5 }
        }}
      />
    </div>
  ))
  .add('Multiple/Comparison', () => (
    <div>
      <LineChart
        data={object('data', [
          [
            { x: 1, y: 3 },
            { x: 2, y: 1 },
            { x: 3, y: 2 },
            { x: 4, y: -2 },
            { x: 5, y: -1 },
            { x: 6, y: 2 },
            { x: 7, y: 3 }
          ],
          [
            { x: 1, y: -3 },
            { x: 2, y: 5 },
            { x: 3, y: 3 },
            { x: 4, y: 0 },
            { x: 5, y: -2 },
            { x: 6, y: -2 },
            { x: 7, y: 5 }
          ]
        ])}
        parts={{
          axis: {
            independent: {
              style: {
                axis: { display: 'block' },
                axisLabel: { display: 'block' },
                grid: { display: 'block' },
                tickLabels: { display: 'block' },
                ticks: { display: 'block' }
              }
            }
          },
          scatter: [{ size: 5, symbol: 'circle' }, { size: 5, symbol: 'plus' }]
        }}
      />
    </div>
  ));

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
  ))
  .add('Comparison', () => (
    <div>
      <PieChart
        donut={boolean('donut', false)}
        groupSpacing={number('groupSpacing', 8)}
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
        height={number('height', 350)}
        width={number('width', 350)}
        data={object('data', [{ x: 39626, label: 'People' }])}
        reference={object('reference', [{ x: 947303, label: 'Tanzania' }])}
      />
    </div>
  ))
  .add('Comparison', () => (
    <div>
      <NestedProportionalAreaChart
        square={boolean('square', false)}
        height={number('height', 350)}
        width={number('width', 650)}
        data={object('data', [
          { x: 76151, label: 'People' },
          { x: 39626, label: 'People' }
        ])}
        reference={object('reference', [{ x: 947303, label: 'Tanzania' }])}
        groupSpacing={number('groupSpacing', 8)}
      />
    </div>
  ));

storiesOf('HURUmap UI|Charts/ComparisonBarChart', module)
  .addDecorator(CenterDecorator)
  .addDecorator(withKnobs)
  .add('Default', () => {
    return (
      <div>
        <ComparisonBarChart
          data={object('data', [
            {
              x: 'Ilala',
              y: 17
            },
            {
              x: 'Kinondoni',
              y: 17
            }
          ])}
          reference={object('reference', [{ x: 'Dar es Salaam', y: 16 }])}
        />
      </div>
    );
  });
