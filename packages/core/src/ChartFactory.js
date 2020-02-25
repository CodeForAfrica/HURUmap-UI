import React, { useMemo, useRef, useState, useCallback } from 'react';

import { Box, ButtonBase } from '@material-ui/core';

import { Helpers } from 'victory';

import {
  LineChart,
  BulletChart,
  BarChart,
  PieChart,
  NestedProportionalAreaChart,
  NumberVisuals,
  withVictoryTheme,
  propTypes
} from '@hurumap/charts';

import aggregateData, { isSelectFunc, groupData } from './utils/aggregateData';

const DOWNLOAD_HIDDEN_CLASSNAME = 'Download--hidden';

const ChartFactory = React.memo(
  ({
    theme,
    definition: {
      id,
      type: visualType,
      /**
       * Custom properties to apply to the visual
       */
      typeProps,
      label,
      reference: { label: propReferenceLabel } = {},
      aggregate,
      unique,
      subtitle,
      description,
      locale = 'en-GB',
      customUnit = '',
      /**
       * The rest of the props are going to be considered as:
       *  Intl.NumberFormatOptions
       *
       * Omit unit since its an experimental NumberFormat option.
       */
      unit,
      ...numberFormat
    },
    disableShowMore,
    data,
    isComparison,
    comparisonData,
    referenceData,
    profiles
  }) => {
    const [rootRef, setRootRef] = useState(null);
    const {
      horizontal,
      width: widthProp,
      height: heightProp,
      offset: offsetProp,
      padding: paddingProp,
      ...chartProps
    } = typeProps || {};
    const key =
      id ||
      Math.random()
        .toString(36)
        .substring(2) + Date.now().toString(36);
    const [showMore, setShowMore] = useState(false);
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
        )}${compactUnit} ${customUnit}`.trim(); // in case customUnit is empty
      },
      [customUnit, numberFormat.style, numberFormatter]
    );

    const primaryData = useMemo(() => {
      const labels = ({ x, y }, separator = ': ') => {
        const formatedX = x ? `${x}${separator}` : '';
        return `${formatedX}${format(y)}`;
      };

      if (
        visualType === 'grouped_column' ||
        (visualType === 'line' && data[0] && data[0].groupBy)
      ) {
        /**
         * Group the data based on groupBy
         * Then aggregate the groupped data
         */
        let groupedData = groupData(data);

        if (groupedData.length) {
          /**
           * Change `x` to be the `groupBy` value
           * to plot group labels on the dependent axis
           */
          groupedData = groupedData.map(g =>
            g.map(gd => ({
              ...gd,
              tooltip: labels(gd),
              x: gd.groupBy
            }))
          );

          /**
           * Reverse grouped data
           * since victory plots inversely
           */
          groupedData = groupedData[0].map((_c, i) =>
            groupedData.map(r => r[i])
          );
        }

        return groupedData;
      }

      if (['column', 'line', 'bullet'].includes(visualType)) {
        const computedData = aggregateData(
          aggregate,
          // Bullet charts only use first two data
          visualType === 'bullet' ? data.slice(0, 2) : data
        );
        return computedData.map(cD => ({
          ...cD,
          tooltip: labels(cD)
        }));
      }
      if (visualType === 'pie') {
        return aggregateData(aggregate, data).map(d => ({
          ...d,
          donutLabel: labels(d, '\n'),
          label: labels(d),
          name: d.x,
          tooltip: labels(d)
        }));
      }
      return [];
    }, [aggregate, data, format, visualType]);

    const calculations = useMemo(() => {
      switch (visualType) {
        case 'bullet':
        case 'number':
        case 'square_nested_proportional_area':
        case 'circle_nested_proportional_area':
          return {};
        case 'pie':
          return {
            width: widthProp || theme.pie.width,
            height: heightProp || theme.pie.height
          };
        case 'grouped_column': {
          const barCount = primaryData[0].length;
          const offset = offsetProp || theme.bar.offset;
          const padding = paddingProp
            ? Helpers.getPadding({ padding: paddingProp })
            : Helpers.getPadding(theme.bar);
          const paddingSize = horizontal
            ? padding.top + padding.bottom
            : padding.left + padding.right;
          const {
            domainPadding: {
              x: [x0, x1]
            }
          } = theme.bar;
          const domainPadding = {
            x: [x0 * primaryData.length, x1 * primaryData.length]
          };

          const rootWidth = rootRef && rootRef.getBoundingClientRect().width;
          const adjustedRootWidth =
            rootRef && rootWidth - (theme.axis.labelWidth || 0);
          const height = heightProp || theme.bar.height;

          let fullSize;
          let dataCount;
          let computedSize;
          // eslint-disable-next-line no-plusplus
          for (dataCount = barCount; dataCount > 0; --dataCount) {
            computedSize =
              primaryData.length * dataCount * offset +
              paddingSize +
              domainPadding.x[0] +
              domainPadding.x[1];

            if (!fullSize) {
              fullSize = computedSize;
            }

            if (!adjustedRootWidth || showMore) {
              break;
            }

            if (
              (horizontal && computedSize < height) ||
              (!horizontal && computedSize < adjustedRootWidth)
            ) {
              break;
            }
          }

          const width =
            horizontal || computedSize > adjustedRootWidth
              ? adjustedRootWidth
              : computedSize;
          const computedHeight = horizontal || showMore ? computedSize : height;

          return {
            width,
            offset,
            dataCount,
            domainPadding,
            height: computedHeight,
            enableShowMore:
              Boolean(height) &&
              // It can't fit the desired height
              // or
              // It can't fit the dynamic width
              (fullSize > height || fullSize > adjustedRootWidth)
          };
        }
        case 'column': {
          const barCount = isComparison ? 2 : 1;
          const offset = offsetProp || theme.bar.offset;
          const {
            domainPadding: {
              x: [x0, x1]
            }
          } = theme.bar;
          const domainPadding = { x: [x0 * barCount, x1 * barCount] };
          const padding = paddingProp
            ? Helpers.getPadding({ padding: paddingProp })
            : Helpers.getPadding(theme.bar);

          const paddingSize = horizontal
            ? padding.top + padding.bottom
            : padding.left + padding.right;

          const rootWidth = rootRef && rootRef.getBoundingClientRect().width;
          const adjustedRootWidth =
            rootWidth && rootWidth - (theme.axis.labelWidth || 0);
          const height = heightProp || theme.bar.height;

          let fullSize;
          let dataCount;
          let computedSize;
          // eslint-disable-next-line no-plusplus
          for (dataCount = primaryData.length; dataCount > 0; --dataCount) {
            computedSize =
              dataCount * barCount * offset +
              paddingSize +
              domainPadding.x[0] +
              domainPadding.x[1] +
              // Bug when 2 bars only
              (dataCount === 2 ? offset : 0);

            if (!fullSize) {
              fullSize = computedSize;
            }

            if (!adjustedRootWidth || showMore) {
              break;
            }

            if (
              horizontal
                ? computedSize < height
                : computedSize < adjustedRootWidth
            ) {
              break;
            }
          }
          const width =
            horizontal ||
            (adjustedRootWidth && computedSize > adjustedRootWidth)
              ? adjustedRootWidth
              : computedSize;
          const computedHeight = horizontal || showMore ? computedSize : height;
          return {
            width,
            offset,
            dataCount,
            domainPadding,
            height: computedHeight,
            enableShowMore:
              Boolean(height) &&
              // It can't fit the desired height
              // or
              // It can't fit the dynamic width
              (fullSize > height || fullSize > adjustedRootWidth)
          };
        }
        case 'line': {
          let offset = offsetProp || theme.line.offset;
          const rootWidth = rootRef && rootRef.getBoundingClientRect().width;
          if (rootWidth) {
            offset = rootWidth / primaryData.length;
          }
          const height = heightProp || theme.line.height;
          const computedWidth = primaryData.length * offset;
          return {
            height,
            offset,
            width: computedWidth
          };
        }
        default:
          return {};
      }
    }, [
      visualType,
      widthProp,
      theme.pie.width,
      theme.pie.height,
      theme.bar,
      theme.axis.labelWidth,
      theme.line.offset,
      theme.line.height,
      heightProp,
      primaryData,
      offsetProp,
      paddingProp,
      horizontal,
      rootRef,
      showMore,
      isComparison
    ]);

    if (!data) {
      return null;
    }

    const renderChart = () => {
      switch (visualType) {
        case 'square_nested_proportional_area':
        case 'circle_nested_proportional_area': {
          const summedData = aggregateData('sum', data, false)[0].y;
          let summedReferenceData = referenceData.reduce((a, b) => a + b.y, 0);
          summedReferenceData =
            referenceData.length && summedReferenceData
              ? summedReferenceData
              : summedData;
          const dataLabel =
            (label && profiles.profile[label]) ||
            data[0].x ||
            data[0].label ||
            label;
          const referenceLabelProp = propReferenceLabel || label;
          const referenceLabel =
            (referenceLabelProp && profiles.parent[referenceLabelProp]) ||
            (referenceData.length && summedReferenceData
              ? referenceData[0].x || referenceData[0].label
              : dataLabel) ||
            referenceLabelProp;

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
                          y: summedData,
                          x: dataLabel
                        }
                      ]
                    : [
                        {
                          y: summedData,
                          x: dataLabel
                        },
                        {
                          y: comparisonData.reduce((a, b) => a + b.y, 0),
                          x:
                            comparisonData[0].label ||
                            profiles.comparison[label] ||
                            label
                        }
                      ]
                }
                reference={[
                  {
                    label: referenceLabel,
                    y: summedReferenceData,
                    x: referenceLabel
                  }
                ]}
                {...chartProps}
              />
            </div>
          );
        }
        case 'pie': {
          const { height, width } = calculations;
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
                {...chartProps}
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
          const statUnique =
            unique !== undefined ? unique : !isSelectFunc(func);

          const dataStat = aggregateData(statAggregate, data, statUnique);
          const dataStatY = format(dataStat[0].y);

          let xDesc = isSelectFunc(func) ? `(${dataStat[0].x})` : '';
          xDesc = dataStat[0].groupBy
            ? `${xDesc.substring(0, xDesc.length - 1)} - ${
                dataStat[0].groupBy
              })`
            : `${xDesc}`;

          return (
            <NumberVisuals
              key={key}
              subtitle={subtitle}
              statistic={dataStatY}
              description={`${description} ${xDesc}`}
              comparisonData={[]} // TODO: pending NumberVisuals components (HURUmap-UI) fix on this propTypes
              classes={{}} // TODO: pending NumberVisuals style configurations - update root margin
              {...chartProps}
            />
          );
        }
        case 'grouped_column': {
          const {
            offset,
            height,
            width,
            dataCount,
            domainPadding
          } = calculations;

          return (
            <div style={{ width, height }}>
              <BarChart
                key={key}
                data={primaryData.map(d => d.slice(0, dataCount))}
                offset={offset}
                width={width}
                height={height}
                horizontal={showMore || horizontal}
                domainPadding={domainPadding}
                labels={({ datum }) => format(datum.y)}
                padding={paddingProp}
                theme={theme}
                {...chartProps}
              />
            </div>
          );
        }
        case 'column': {
          const {
            offset,
            height,
            width,
            dataCount,
            domainPadding
          } = calculations;
          if (isComparison) {
            const processedComparisonData = aggregate
              ? aggregateData(aggregate, comparisonData)
              : comparisonData;

            return (
              <div style={{ width, height }}>
                <BarChart
                  data={[
                    primaryData.slice(0, dataCount),
                    processedComparisonData.slice(0, dataCount)
                  ]}
                  key={key}
                  offset={offset}
                  height={height}
                  width={width}
                  horizontal={showMore || horizontal}
                  domainPadding={domainPadding}
                  labels={({ datum }) => format(datum.y)}
                  theme={theme}
                  {...chartProps}
                />
              </div>
            );
          }
          return (
            <div style={{ width, height }}>
              <BarChart
                key={key}
                data={primaryData.slice(0, dataCount)}
                offset={offset}
                height={height}
                width={width}
                horizontal={showMore || horizontal}
                domainPadding={domainPadding}
                labels={({ datum }) => format(datum.y)}
                theme={theme}
                {...chartProps}
              />
            </div>
          );
        }
        case 'bullet': {
          const summedData = aggregateData('sum', primaryData, false)[0].y;
          const summedReferenceData =
            referenceData.reduce((a, b) => a + b.y, 0) || primaryData[0].y;
          return (
            <BulletChart
              total={unit === 'percent' ? 100 : summedData}
              data={!isComparison ? primaryData : [primaryData, comparisonData]}
              reference={summedReferenceData}
              height={!isComparison ? 50 : 100}
              width={widthProp || 350}
              labels={datum => format(datum.y)}
              theme={theme}
              {...chartProps}
            />
          );
        }
        case 'line': {
          const { height, width } = calculations;
          return (
            <LineChart
              key={key}
              responsive
              height={height}
              width={width}
              data={!isComparison ? primaryData : [primaryData, comparisonData]}
              parts={{
                container: {
                  labels: ({ datum }) => `y: ${format(datum.y)}`
                },
                scatter: { size: 5 }
              }}
              theme={theme}
              {...chartProps}
              horizontal={false}
            />
          );
        }
        default:
          return null;
      }
    };
    return (
      <Box
        id={id}
        ref={setRootRef}
        flexGrow={1}
        component="div"
        display="flex"
        flexDirection="column"
        alignItems="center"
      >
        {primaryData.length ||
        [
          'circle_nested_proportional_area',
          'circle_nested_proportional_area',
          'number'
        ].includes(visualType)
          ? renderChart()
          : null}
        {!disableShowMore &&
          ['column', 'grouped_column'].includes(visualType) &&
          calculations.enableShowMore && (
            <ButtonBase
              className={DOWNLOAD_HIDDEN_CLASSNAME}
              onClick={() => setShowMore(!showMore)}
            >
              {showMore ? 'Show Less' : 'Show More'}
            </ButtonBase>
          )}
      </Box>
    );
  },
  (prevProps, nextProps) =>
    JSON.stringify(prevProps) === JSON.stringify(nextProps)
);

ChartFactory.propTypes = {
  theme: propTypes.theme.isRequired,
  definition: propTypes.shape({
    id: propTypes.string,
    type: propTypes.string,
    /**
     * Custom chart props
     * These props override any default or computed values
     */
    typeProps: propTypes.shape({}),
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
  disableShowMore: propTypes.bool
};

ChartFactory.defaultProps = {
  isComparison: false,
  comparisonData: [],
  profiles: {
    parent: {},
    profile: {},
    comparison: {}
  },
  referenceData: [],
  disableShowMore: false
};

export default withVictoryTheme(ChartFactory);
