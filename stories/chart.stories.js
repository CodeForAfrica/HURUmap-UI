import React from 'react';
import { storiesOf } from '@storybook/react';
import {
  withKnobs,
  boolean,
  object,
  select,
  number
} from '@storybook/addon-knobs';

import {
  BarChart,
  BulletChart,
  LineChart,
  PieChart,
  NestedProportionalAreaChart,
  ComparisonBarChart
} from '../src/core';
import { CenterDecorator } from './common';

const rand = () => Number((Math.random() * 100).toFixed(1));

storiesOf('HURUmap UI|Charts/BarChart', module)
  .addDecorator(CenterDecorator)
  .addDecorator(withKnobs)
  .add('Default', () => {
    const horizontal = boolean('horizontal', false);
    const data = Array(number('data', 3)).fill(null);
    const height = number('height', undefined) || 350;
    const width = number('width', undefined) || 350;

    return (
      <div style={{ height, width }}>
        <BarChart
          horizontal={horizontal}
          width={width}
          height={height}
          data={data.map((_, index) => {
            const y = rand();
            return {
              tooltip: `${index}-${index} Employment Status`,
              x: `${index}-${index} Employment Status`,
              y
            };
          })}
          alignment={select('alignment', ['start', 'middle', 'end'], 'middle')}
          barWidth={number('barWidth', undefined)}
          domainPadding={object('domainPadding', { x: 20 })}
          parts={{
            axis: {
              independent: {
                style: {
                  axis: {
                    display: 'block'
                  },
                  grid: {
                    display: 'block'
                  },
                  ticks: {
                    display: 'block'
                  },
                  tickLabels: {
                    display: 'block'
                  }
                }
              },
              dependent: {
                tickValues: [10, 50, 90],
                tickFormat: ['10%', '50%', '90%'],
                style: {
                  axis: {
                    display: 'block'
                  },
                  grid: {
                    display: 'block'
                  },
                  ticks: {
                    display: 'block'
                  },
                  tickLabels: {
                    display: 'block'
                  }
                }
              }
            }
          }}
        />
      </div>
    );
  })
  .add('Grouped', () => {
    const groups = Array(number('groups', 3)).fill(null);
    const dataCount = Array(number('data', 3)).fill(null);
    const horizontal = boolean('horizontal', false);
    const offset = number('offset', 12);
    const data = dataCount.map(() =>
      groups.map((_g, groupIndex) => ({
        // Starting with 0 seems to trigger domainPadding coercion. See the comment below.
        x: `Group ${groupIndex + 1} TickLabel`,
        y: rand()
      }))
    );
    // Include bottom legend
    const height = number('height', 400) || 350;
    const width = number('width', 350) || 450;

    return (
      <div style={{ height, width, overflow: 'hidden' }}>
        <BarChart
          horizontal={horizontal}
          width={width}
          height={height}
          /*
            Victory requires data to be in the following format:
            [
              [group0bar0, group1bar0, group2bar0, ...etc],
              [group0bar1, group1bar1, group2bar1, ...etc],
              [group0bar2, group1bar2, group2bar2, ...etc],
              ...etc
            ]
          */
          data={data}
          barWidth={number('barWidth', 10)}
          offset={offset}
          // domainPadding value may be coerced. See 2nd note: https://formidable.com/open-source/victory/docs/common-props/#domainpadding
          domainPadding={object('domainPadding', { x: offset * data.length })}
          parts={{
            parent: {
              padding: { top: 50, left: 50, bottom: 50, right: 50 }
            },
            axis: {
              independent: {
                style: {
                  axis: {
                    display: 'block'
                  },
                  grid: {
                    display: 'block'
                  },
                  ticks: {
                    display: 'block'
                  },
                  tickLabels: {
                    display: 'block'
                  }
                }
              },
              dependent: {
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
                }
              }
            },
            legend: {
              data: data.map((d, i) => ({
                name: `Bar ${i + 1}`,
                label: d.reduce((a, c) => `${a && `${a}\n`}${c.x}`, '')
              })),
              rowGutter: { top: 20 },
              x: 70
            },
            tooltip: { style: { textAnchor: 'start' } }
          }}
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
            labels: ({ datum }) => `y: ${datum.y}`
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
            { x: 1, y: 3, geo: 'Dar es Salaam' },
            { x: 2, y: 1, geo: 'Dar es Salaam' },
            { x: 3, y: 2, geo: 'Dar es Salaam' },
            { x: 4, y: -2, geo: 'Dar es Salaam' },
            { x: 5, y: -1, geo: 'Dar es Salaam' },
            { x: 6, y: 2, geo: 'Dar es Salaam' },
            { x: 7, y: 3, geo: 'Dar es Salaam' }
          ],
          [
            { x: 1, y: -3, geo: 'Kagera' },
            { x: 2, y: 5, geo: 'Kagera' },
            { x: 3, y: 3, geo: 'Kagera' },
            { x: 4, y: 0, geo: 'Kagera' },
            { x: 5, y: -2, geo: 'Kagera' },
            { x: 6, y: -2, geo: 'Kagera' },
            { x: 7, y: 5, geo: 'Kagera' }
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
          group: {
            // Line chart combines line and scatter hence best to define
            // labels at group level
            labels: ({ datum }) => `${datum.x}\n${datum.geo} ${datum.y}`
          },
          legend: {
            data: [
              {
                name: 'A',
                label: 'A\n \nDar es Salaam 6\n \nKagera 3'
              },
              {
                name: 'B',
                label: 'B\n \nDar es Salaam 1\n \nKagera 1'
              },
              {
                name: 'C',
                label: 'C\n \nDar es Salaam 3\n \nKagera 2'
              },
              {
                name: 'D',
                label: 'D\n \nDar es Salaam 1\n \nKagera 2'
              },
              {
                name: 'E',
                label: 'E\n \nDar es Salaam 12\n \nKagera 5'
              }
            ],
            x: number('Legend x', 90)
          },
          scatter: [{ size: 5, symbol: 'circle' }, { size: 5, symbol: 'plus' }],
          tooltip: { style: { textAnchor: 'start' } }
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
        donut={boolean('donut', true)}
        donutLabelKey={object('donutLabelKey', { dataIndex: 0 })}
        data={object('data', [
          { x: 'Female', y: 22, label: 'Female\n22%' },
          { x: 'Male', y: 78, label: 'Male\n78%' }
        ])}
        width={number('width', 500)}
        height={number('height', 500)}
        padding={number('padding', 0)}
        origin={object('origin', { x: 200, y: 200 })}
        parts={{
          tooltip: {
            style: {
              fontSize: 28
            }
          },
          legend: {
            align: select(
              'Legend align',
              ['top', 'right', 'bottom', 'left'],
              'right'
            ),
            data: object('Legend data', [
              {
                name: 'A very, very, very, very long legend name',
                label: 'Female: 22%'
              },
              {
                name: 'Short one',
                label: 'Long tooltip label should appear above chart: 78%'
              }
            ]),
            gutter: number('Legend column spacing', 10),
            orientation: select(
              'Legend orientation',
              ['horizontal', 'vertical'],
              'vertical'
            ),
            rowGutter: number('Legend row spacing', 20),
            size: number('Legend size', 100),
            style: {
              labels: object('Legend style', {
                fontSize: 15
              })
            },
            labelWidth: number('Legend label width', 100)
          }
        }}
        responsive={boolean('responsive', true)}
        standalone={boolean('standalone', true)}
        style={{
          labels: {
            fill: 'black',
            fontSize: '18',
            fontWeight: 'bold'
          }
        }}
      />
    </div>
  ))
  .add('Comparison', () => (
    <div>
      <PieChart
        donut={boolean('donut', true)}
        donutLabelKey={object('donutLabelKey', { dataIndex: 0 })}
        groupSpacing={number('groupSpacing', 4)}
        data={object('data', [
          [
            { x: 'A', y: 6, label: 'A\n \nDar es Salaam 1' },
            { x: 'B', y: 1, label: 'B\n \nDar es Salaam 2' },
            { x: 'C', y: 3, label: 'C\n \nDar es Salaam 3' },
            { x: 'D', y: 1, label: 'D\n \nDar es Salaam 1' },
            { x: 'E', y: 12, label: 'E\n \nDar es Salaam 2' }
          ],
          [
            { x: 'A', y: 3, label: 'A\n \nKagera 2' },
            { x: 'B', y: 1, label: 'B\n \nKagera 1' },
            { x: 'C', y: 2, label: 'C\n \nKagera 1' },
            { x: 'D', y: 2, label: 'D\n \nKagera 1' },
            { x: 'E', y: 5, label: 'E\n \nKagera 5' }
          ]
        ])}
        parts={{
          legend: {
            data: [
              {
                name: 'A',
                label: 'A\n \nDar es Salaam 6\n \nKagera 3'
              },
              {
                name: 'B',
                label: 'B\n \nDar es Salaam 1\n \nKagera 1'
              },
              {
                name: 'C',
                label: 'C\n \nDar es Salaam 3\n \nKagera 2'
              },
              {
                name: 'D',
                label: 'D\n \nDar es Salaam 1\n \nKagera 2'
              },
              {
                name: 'E',
                label: 'E\n \nDar es Salaam 12\n \nKagera 5'
              }
            ]
          }
        }}
        width={number('width', 500)}
        height={number('height', 500)}
        padding={number('padding', 0)}
      />
    </div>
  ));

const formatter = new Intl.NumberFormat('en-GB');

storiesOf('HURUmap UI|Charts/NestedProportionalAreaChart', module)
  .addDecorator(CenterDecorator)
  .addDecorator(withKnobs)
  .add('Default', () => (
    <div>
      <NestedProportionalAreaChart
        formatNumberForLabel={x => formatter.format(x)}
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
        formatNumberForLabel={x => formatter.format(x)}
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
