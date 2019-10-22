import React, { useMemo, useRef, useState, useCallback } from 'react';

import { Box, ButtonBase } from '@material-ui/core';
import BarChart from '../core/BarChart';
import PieChart from '../core/PieChart';
import NestedProportionalAreaChart from '../core/NestedProportionalAreaChart';
import NumberVisuals from '../core/NumberVisuals';

import aggregateData, { isSelectFunc } from './utils/aggregateData';
import propTypes from '../core/propTypes';
import withVictoryTheme from '../core/styles/withVictoryTheme';

function ChartFactory({
  theme,
  definition: {
    id,
    type: visualType,
    label,
    reference: { label: propReferenceLabel } = {},
    aggregate,
    unique,
    subtitle,
    description,
    horizontal,
    locale = 'en-GB',
    customUnit = '',
    /**
     * The rest of the props are going to be considered as:
     *  Intl.NumberFormatOptions
     *
     * Omit unit simce its an experimental NumberFormat option.
     */
    unit,
    ...numberFormat
  },
  data,
  isComparison,
  comparisonData,
  referenceData,
  profiles,
  ...visualProps
}) {
  const key =
    id ||
    Math.random()
      .toString(36)
      .substring(2) + Date.now().toString(36);
  const [dataLength, setDataLength] = useState(-5);
  const [show, setShow] = useState(-5);
  const numberFormatter = useRef(
    (() => {
      try {
        const formatter = new Intl.NumberFormat(locale, {
          maximumFractionDigits: 2,
          ...numberFormat
        });
        return formatter;
      } catch (e) {
        return new Intl.NumberFormat(locale);
      }
    })()
  ).current;

  const format = useCallback(
    value => {
      /**
       * Since `notation: compact` is experimental as noted here:
       *  https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/NumberFormat
       * It is only available in Chrome 77+ :
       *  https://v8.dev/features/intl-numberformat#notation
       *
       * Manually compact the numbers until this feature is available.
       */
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
      } else if (value > 10 ** 3) {
        compactUnit = 'K';
        formatValue = value / 10 ** 3;
      } else {
        //
      }
      /**
       * `style: percent` expects a ratio
       */
      if (numberFormat.style === 'percent') {
        formatValue /= 100;
      }
      return `${numberFormatter.format(
        formatValue
      )}${compactUnit} ${customUnit}`;
    },
    [customUnit, numberFormat.style, numberFormatter]
  );

  const primaryData = useMemo(() => {
    if (visualType === 'column') {
      const computedData = aggregate ? aggregateData(aggregate, data) : data;
      setDataLength(computedData.length);
      return computedData.slice(show);
    }

    if (visualType === 'pie') {
      return (!aggregate ? data : aggregateData(aggregate, data)).map(d => ({
        ...d,
        name: d.x,
        label: `${d.x} ${format(d.y)}`
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

    if (visualType === 'grouped_column') {
      setDataLength(groupedData[0].length);
      return groupedData.map(gd => gd.slice(show));
    }
    return groupedData;
  }, [visualType, data, aggregate, show, format]);

  if (!data) {
    return null;
  }

  const formatLabelValue = value => format(value);

  const renderChart = () => {
    switch (visualType) {
      case 'square_nested_proportional_area':
      case 'circle_nested_proportional_area': {
        const dataLabel = data[0].label || profiles.profile[label];
        const summedData = aggregateData('sum', data, false)[0].y;
        let summedReferenceData = referenceData.reduce((a, b) => a + b.y, 0);
        const referenceLabel =
          (referenceData.length && summedReferenceData
            ? referenceData[0].label
            : dataLabel) ||
          // Default refrence label is the chart label
          profiles.parent[propReferenceLabel || label] ||
          propReferenceLabel ||
          label;
        summedReferenceData =
          referenceData.length && summedReferenceData
            ? summedReferenceData
            : summedData;
        return (
          <div style={{ width: !isComparison ? 200 : 650 }}>
            <NestedProportionalAreaChart
              key={key}
              formatNumberForLabel={x => format(x)}
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
                  label: referenceLabel
                }
              ]}
            />
          </div>
        );
      }
      case 'pie': {
        const height = visualProps.height || theme.pie.height;
        const width = visualProps.width || theme.pie.width;

        return (
          <div style={{ height, width }}>
            <PieChart
              donut
              key={key}
              data={primaryData}
              donutLabelKey={{ dataIndex: 0 }}
              theme={theme}
              width={width}
              height={height}
            />
          </div>
        );
      }
      case 'number': {
        /**
         * Statistic aggregate
         *  default: 'last',
         */
        const statAggregate = aggregate || 'last';

        /**
         * Statistic data aggregation
         * with respect to label
         *  default: false
         */
        const [func] = statAggregate.split(':');
        const statUnique = unique || !isSelectFunc(func);

        const dataStat = aggregateData(statAggregate, data, statUnique);
        const dataStatY = format(dataStat[0].y);

        let xDesc = isSelectFunc(func) ? `(${dataStat[0].x})` : '';
        xDesc = dataStat[0].groupBy
          ? `${xDesc.substring(0, xDesc.length - 1)} - ${dataStat[0].groupBy})`
          : `${xDesc}`;

        return (
          <NumberVisuals
            key={key}
            subtitle={subtitle}
            statistic={dataStatY}
            description={`${description} ${xDesc}`}
            comparisonData={[]} // TODO: pending NumberVisuals components (HURUmap-UI) fix on this propTypes
            classes={{}} // TODO: pending NumberVisuals style configurations - update root margin
          />
        );
      }
      case 'grouped_column': {
        const barCount = primaryData[0].length;
        const offset = visualProps.offset || theme.bar.offset;
        const {
          domainPadding: {
            x: [x0, x1]
          }
        } = theme.bar;
        const domainPadding = {
          x: [x0 * primaryData.length, x1 * primaryData.length]
        };
        const computedSize =
          primaryData.length * barCount * offset +
          domainPadding.x[0] +
          domainPadding.x[1];
        const height = visualProps.height || theme.bar.height;
        const width = visualProps.width || theme.bar.width;
        const computedHorizontal = computedSize > width || horizontal;
        const computedWidth = computedHorizontal ? width : computedSize;
        const computedHeight = computedHorizontal ? computedSize : height;

        return (
          <div style={{ width: computedWidth, height: computedHeight }}>
            <BarChart
              key={key}
              data={primaryData}
              offset={offset}
              width={computedWidth}
              height={computedHeight}
              horizontal={computedHorizontal}
              domainPadding={domainPadding}
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
            />
          </div>
        );
      }
      case 'column': {
        const barCount = isComparison ? 2 : 1;
        const offset = visualProps.offset || theme.bar.offset;
        const {
          domainPadding: {
            x: [x0, x1]
          }
        } = theme.bar;
        const domainPadding = { x: [x0 * barCount, x1 * barCount] };
        const computedSize =
          primaryData.length * barCount * offset +
          domainPadding.x[0] +
          domainPadding.x[1] +
          // Bug when 2 bars only
          (primaryData.length === 2 ? offset : 0);
        const height = visualProps.height || theme.bar.height;
        const width = visualProps.width || theme.bar.width;
        const computedHorizontal = computedSize > width || horizontal;
        const computedWidth = computedHorizontal ? width : computedSize;
        const computedHeight = computedHorizontal ? computedSize : height;
        if (isComparison) {
          const processedComparisonData = aggregate
            ? aggregateData(aggregate, comparisonData)
            : comparisonData;

          return (
            <div style={{ width: computedWidth, height: computedHeight }}>
              <BarChart
                data={[primaryData, processedComparisonData]}
                key={key}
                offset={offset}
                height={computedWidth}
                width={computedHeight}
                horizontal={computedHorizontal}
                domainPadding={domainPadding}
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
              />
            </div>
          );
        }
        return (
          <div style={{ width: computedWidth, height: computedHeight }}>
            <BarChart
              key={key}
              data={primaryData}
              offset={offset}
              height={computedHeight}
              width={computedWidth}
              horizontal={computedHorizontal}
              domainPadding={domainPadding}
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
            />
          </div>
        );
      }
      default:
        return null;
    }
  };

  return (
    <Box display="flex" flexDirection="column">
      {renderChart()}
      {['column', 'grouped_column'].includes(visualType) && dataLength > 5 && (
        <ButtonBase
          className="Download--hidden"
          onClick={() => setShow(show === 0 ? -5 : 0)}
        >
          {show === 0 ? 'Show Less' : 'Show More'}
        </ButtonBase>
      )}
    </Box>
  );
}

ChartFactory.propTypes = {
  theme: propTypes.theme.isRequired,
  definition: propTypes.shape({
    id: propTypes.string,
    type: propTypes.string,
    label: propTypes.string,
    reference: propTypes.shape({ label: propTypes.string }),
    aggregate: propTypes.string,
    signDisplay: propTypes.string,
    subtitle: propTypes.string,
    description: propTypes.string,
    /**
     * Affects only the number visual
     * Unique = true means aggregate with respect to label
     */
    unique: propTypes.bool,
    horizontal: propTypes.bool,
    locale: propTypes.string,
    customUnit: propTypes.string,
    /**
     * The rest of the props are going to be considered as:
     *  Intl.NumberFormatOptions
     */
    unit: propTypes.string
  }).isRequired,
  data: propTypes.graphQlData.isRequired,
  isComparison: propTypes.bool,
  comparisonData: propTypes.graphQlData,
  referenceData: propTypes.graphQlData,
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
  }),
  /**
   * Other props ...
   */
  height: propTypes.number,
  offset: propTypes.number
};

ChartFactory.defaultProps = {
  height: undefined,
  offset: undefined,
  isComparison: false,
  comparisonData: [],
  referenceData: [],
  profiles: {
    parent: {},
    profile: {},
    comparison: {}
  }
};

export default withVictoryTheme(ChartFactory);
