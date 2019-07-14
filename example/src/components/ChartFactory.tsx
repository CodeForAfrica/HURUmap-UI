import React from 'react';
import { Chart, GroupedData, Data  } from '../lib/hurumap-dto';
import { GroupedBarChart, PieChart } from 'hurumap-ui';

export default class ChartFactory {
  static build(chart: Chart) {
    if (chart.table_data.is_missing) {
      return null;
    }
    const data = chart.table_data as Data;
    const groupedData = chart.table_data as GroupedData;
    switch (chart.chart) {
      case 'pie':
        return (
          <PieChart
            data={Object.keys(data)
              .filter(key => key !== 'metadata')
              .map(key => {
                return {
                  x: key,
                  y: data[key].values.this!
                };
              })}
          />
        );
      case 'grouped_column':
        return (
          <GroupedBarChart
            height={200}
            dataUnit="%"
            data={Object.keys(groupedData)
              .filter(key => key !== 'metadata')
              .map(key => {
                return {
                  x: key,
                  data: Object.keys(groupedData[key])
                    .filter(innerKey => innerKey !== 'metadata')
                    .map(innerKey => {
                      console.log(innerKey);
                      return {
                        x: `${key} ${innerKey}`,
                        y: groupedData[key][innerKey].values.this!
                      };
                    })
                };
              })}
          />
        );
      case 'column':
        return (
          <GroupedBarChart
            height={200}
            dataUnit="%"
            data={[
              {
                x: '',
                data: Object.keys(data)
                  .filter(key => key !== 'metadata')
                  .map(key => {
                    return {
                      x: key,
                      y: data[key].values.this!
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
