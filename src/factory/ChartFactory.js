import React, { useMemo } from 'react';

import BarChart from '../core/BarChart';
import PieChart from '../core/PieChart';
import NestedProportionalAreaChart from '../core/NestedProportionalAreaChart';
import NumberVisuals from '../core/NumberVisuals';

import aggregateData from './utils/aggregateData';
import propTypes from '../core/propTypes';
import withVictoryTheme from '../core/styles/withVictoryTheme';

function ChartFactory({
  theme,
  definition: {
    id,
    type: visualType,
    label,
    reference: { label: referenceLabel } = {},
    aggregate,
    unit = '',
    subtitle,
    description,
    props: visualProps = {},
    statistic = {}
  },
  data,
  refrence: { label: propRefrenceLabel },
  isComparison,
  comparisonData,
  refrenceData,
  profiles
}) {
  const key =
    id ||
    Math.random()
      .toString(36)
      .substring(2) + Date.now().toString(36);

  const primaryData = useMemo(() => {
    const numberFormatter = new Intl.NumberFormat('en-GB');
    if (visualType === 'column') {
      return aggregate ? aggregateData(aggregate, data) : data;
    }

    if (visualType === 'pie') {
      return (!aggregate ? data : aggregateData(aggregate, data)).map(d => ({
        ...d,
        name: d.x,
        label: `${d.x} ${numberFormatter.format(d.y)}`
      }));
    }

    let groupedData = [...new Set(data.map(d => d.groupBy))].map(group =>
      !aggregate
        ? data.filter(d => d.groupBy === group)
        : aggregateData(aggregate, data.filter(d => d.groupBy === group)).map(
            d => ({ ...d, x: group })
          )
    );

    groupedData = groupedData[0].map((_c, i) => groupedData.map(r => r[i]));
    return groupedData;
  }, [visualType, aggregate, data]);

  if (!data) {
    return null;
  }

  const numberFormatter = new Intl.NumberFormat('en-GB', {
    maximumFractionDigits: 2
  });
  const { horizontal } = visualProps;

  const formatLabelValue = value => {
    if (aggregate) {
      const [, format] = aggregate.split(':');
      return (
        numberFormatter.format(value) + (format === 'percent' ? '%' : unit)
      );
    }
    return numberFormatter.format(value) + unit;
  };

  switch (visualType) {
    case 'square_nested_proportional_area':
    case 'circle_nested_proportional_area': {
      const dataLabel = data[0].label || profiles.profile[label];
      const summedData = aggregateData('sum', data, false)[0].y;
      let summedReferenceData = refrenceData.reduce((a, b) => a + b.y, 0);
      const refrenceLabel =
        (refrenceData.length && summedReferenceData
          ? refrenceData[0].label
          : dataLabel) ||
        // Default refrence label is the chart label
        profiles.parent[propRefrenceLabel || label] ||
        referenceLabel ||
        label;
      summedReferenceData =
        refrenceData.length && summedReferenceData
          ? summedReferenceData
          : summedData;
      return (
        <div style={{ width: !isComparison ? 200 : 650 }}>
          <NestedProportionalAreaChart
            key={key}
            formatNumberForLabel={x => numberFormatter.format(x)}
            square={visualType === 'square_nested_proportional_area'}
            height={isComparison && 500}
            width={!isComparison ? 200 : 650}
            groupSpacing={isComparison && 8}
            data={
              !isComparison
                ? [
                    {
                      x: summedData,
                      label: dataLabel
                    }
                  ]
                : [
                    {
                      x: summedData,
                      label: dataLabel
                    },
                    {
                      x: comparisonData.reduce((a, b) => a + b.y, 0),
                      label:
                        comparisonData[0].label ||
                        profiles.comparison[label] ||
                        label
                    }
                  ]
            }
            reference={[
              {
                x: summedReferenceData,
                label: refrenceLabel
              }
            ]}
            {...visualProps}
          />
        </div>
      );
    }
    case 'pie': {
      const height = visualProps.height || theme.pie.height;

      return (
        <div style={{ height }}>
          <PieChart
            donut
            key={key}
            data={primaryData}
            donutLabelKey={{ dataIndex: 0 }}
            theme={theme}
            {...visualProps}
          />
        </div>
      );
    }
    case 'number': {
      const dataStat = statistic.aggregate
        ? aggregateData(statistic.aggregate, data, statistic.unique)
        : [data[data.length - 1]];

      let dataStatY;

      if (dataStat[0].y > 1000000000) {
        dataStatY = numberFormatter.format(dataStat[0].y / 1000000000);
        dataStatY = `${dataStatY} Billion`;
      } else {
        dataStatY = numberFormatter.format(dataStat[0].y);
      }

      dataStatY = !statistic.unit
        ? dataStatY
        : `${dataStatY} ${statistic.unit}`;

      let xDesc = !statistic.unique ? ' ' : ` (${dataStat[0].x})`;
      xDesc = !dataStat[0].groupBy
        ? `${xDesc}`
        : `${xDesc.substring(0, xDesc.length - 1)} - ${dataStat[0].groupBy})`;

      return (
        <NumberVisuals
          key={key}
          subtitle={subtitle}
          statistic={dataStatY}
          description={`${description} ${xDesc}`}
          comparisonData={[]} // TODO: pending NumberVisuals components (HURUmap-UI) fix on this propTypes
          classes={{}} // TODO: pending NumberVisuals style configurations - update root margin
          {...visualProps}
        />
      );
    }
    case 'grouped_column': {
      const barCount = primaryData[0].length;
      const offset = visualProps.offset || theme.bar.offset;
      const { domainPadding } = theme.bar;
      const computedSize =
        primaryData.length * barCount * offset +
        domainPadding.x[0] +
        domainPadding.x[1];
      const height = visualProps.height || theme.bar.height;
      const computedWidth = horizontal ? height : computedSize;
      const computedHeight = horizontal ? computedSize : height;

      return (
        <div style={{ width: computedWidth, height: computedHeight }}>
          <BarChart
            key={key}
            data={primaryData}
            height={computedHeight}
            horizontal={horizontal}
            domainPadding={domainPadding}
            labels={({ datum }) => formatLabelValue(datum.y)}
            offset={offset}
            parts={{
              axis: {
                independent: {
                  style: {
                    axis: {
                      display: 'block'
                    },
                    tickLabels: {
                      display: 'block'
                    }
                  }
                },
                dependent: {
                  style: {
                    grid: {
                      display: 'block'
                    }
                  }
                }
              }
            }}
            theme={theme}
            width={computedWidth}
            {...visualProps}
          />
        </div>
      );
    }
    case 'column': {
      const barCount = isComparison ? 2 : 1;
      const offset = visualProps.offset || theme.bar.offset;
      const { domainPadding } = theme.bar;
      const computedSize =
        primaryData.length * barCount * offset +
        domainPadding.x[0] +
        domainPadding.x[1];
      const height = visualProps.height || theme.bar.height;
      const computedWidth = horizontal ? height : computedSize;
      const computedHeight = horizontal ? computedSize : height;
      if (isComparison) {
        const processedComparisonData = aggregate
          ? aggregateData(aggregate, comparisonData)
          : comparisonData;

        return (
          <div style={{ width: computedWidth, height: computedHeight }}>
            <BarChart
              data={[primaryData, processedComparisonData]}
              domainPadding={domainPadding}
              key={key}
              height={computedHeight}
              horizontal={horizontal}
              labels={({ datum }) => formatLabelValue(datum.y)}
              parts={{
                axis: {
                  independent: {
                    style: {
                      axis: {
                        display: 'block'
                      },
                      tickLabels: {
                        display: 'block'
                      }
                    }
                  },
                  dependent: {
                    style: {
                      grid: {
                        display: 'block'
                      }
                    }
                  }
                }
              }}
              theme={theme}
              width={computedWidth}
              {...visualProps}
            />
          </div>
        );
      }

      return (
        <div style={{ width: computedWidth, height: computedHeight }}>
          <BarChart
            key={key}
            data={primaryData}
            domainPadding={domainPadding}
            height={computedHeight}
            horizontal={horizontal}
            labels={({ datum }) => {
              return formatLabelValue(datum.y);
            }}
            parts={{
              axis: {
                independent: {
                  style: {
                    axis: {
                      display: 'block'
                    },
                    tickLabels: {
                      display: 'block'
                    }
                  }
                },
                dependent: {
                  style: {
                    grid: {
                      display: 'block'
                    }
                  }
                }
              }
            }}
            theme={theme}
            width={computedWidth}
            {...visualProps}
          />
        </div>
      );
    }
    default:
      return null;
  }
}

ChartFactory.propTypes = {
  theme: propTypes.theme.isRequired,
  definition: propTypes.shape({
    id: propTypes.string,
    type: propTypes.string,
    label: propTypes.string,
    reference: propTypes.shape({ label: propTypes.string }),
    aggregate: propTypes.string,
    unit: propTypes.string,
    subtitle: propTypes.string,
    description: propTypes.string,
    statistic: propTypes.shape({
      aggregate: propTypes.string,
      unit: propTypes.string,
      unique: propTypes.bool
    }),
    props: propTypes.shape({
      horizontal: propTypes.bool,
      height: propTypes.number,
      offset: propTypes.number
    })
  }).isRequired,
  data: propTypes.graphQlData.isRequired,
  isComparison: propTypes.bool,
  comparisonData: propTypes.graphQlData,
  refrence: propTypes.shape({
    label: propTypes.string
  }),
  refrenceData: propTypes.graphQlData,
  /*
   * Profiles are needed in the chart builder
   * since we have no relationships in the database
   * so we have to query profiles separately and this is
   * a work around solution to have those profile data available to us
   * when we want to use the labels for the parent or profile.
   * This can further be used to reference squareKms of a profile
   * but population is not available in the profile.
   */
  profiles: propTypes.shape({
    parent: propTypes.shape({}),
    profile: propTypes.shape({}),
    comparison: propTypes.shape({})
  })
};

ChartFactory.defaultProps = {
  isComparison: false,
  comparisonData: [],
  refrence: {},
  refrenceData: [],
  profiles: {
    parent: {},
    profile: {},
    comparison: {}
  }
};

export default withVictoryTheme(ChartFactory);
