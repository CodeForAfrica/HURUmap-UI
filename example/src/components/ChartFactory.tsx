import React from 'react';
import { Chart, GroupedData, Data } from '../lib/hurumap-dto';
import { GroupedBarChart } from 'hurumap-ui';

export default class ChartFactory {
  static build(chart: Chart) {
    if (chart.table_data.is_missing) {
      return null;
    }
    switch (chart.chart) {
      case 'grouped_column':
        // const data = chart.table_data;
        // console.log(Object.values(data))
        return (
          <GroupedBarChart
            height={200}
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
        const data = chart.table_data as Data;
        return (
          <GroupedBarChart
            height={200}
            data={[
              {
                x: '',
                data: Object.keys(data)
                  .filter(key => key !== 'metadata')
                  .map(key => {
                    console.log(key);
                    return {
                      x: key,
                      y: data[key].numerators.this!
                    };
                  })
              }
            ]}
          />
        );
      default:
        return null;
    }
  }
}
