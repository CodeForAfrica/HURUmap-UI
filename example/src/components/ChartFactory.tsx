import React from 'react';
import { Chart } from '../lib/hurumap-dto';
import { GroupedBarChart } from 'hurumap-ui';

export default class ChartFactory {
  static build(chart: Chart) {
    switch (chart.chart) {
      case 'grouped_column':
        return (
          <GroupedBarChart
            width="100%"
            height="200px"
            dataUnit="%"
            data={[
              {
                x: 'Slept under any net last night',
                data: [
                  { x: '0-9', y: 40 },
                  { x: '10-19', y: 20 },
                  { x: '20-29', y: 10 },
                  { x: '30-39', y: 5 },
                  { x: '40-49', y: 5 },
                  { x: '50-59', y: 10 },
                  { x: '60-69', y: 10 },
                  { x: '70-79', y: 0 },
                  { x: '80+', y: 0 }
                ]
              }
            ]}
          />
        );
      case 'column':
        return (
          <GroupedBarChart
            width="100%"
            height="200px"
            dataUnit="%"
            data={[
              {
                x: 'Slept under any net last night',
                data: [
                  { x: '0-9', y: 40 },
                  { x: '10-19', y: 20 },
                  { x: '20-29', y: 10 },
                  { x: '30-39', y: 5 },
                  { x: '40-49', y: 5 },
                  { x: '50-59', y: 10 },
                  { x: '60-69', y: 10 },
                  { x: '70-79', y: 0 },
                  { x: '80+', y: 0 }
                ]
              }
            ]}
          />
        );
      default:
        return null;
    }
  }
}
