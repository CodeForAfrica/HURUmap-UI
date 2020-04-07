/**
 * `groupedData` supplied to any of Bar or Line chart is in the following form:
 * ```
 * [
 *  [group0bar0, group1bar0, group2bar0, ...etc],
 *  [group0bar1, group1bar1, group2bar1, ...etc],
 *  [group0bar2, group1bar2, group2bar2, ...etc],
 *  ...etc
 * ]
 * ```
 * The required legend data, name and (optional) description, is found in
 * `bar0`, `bar1`, `bar2`, variables.
 */
export function extractLegendData(groupedData) {
  if (
    !groupedData ||
    !groupedData.length ||
    !groupedData[0].length ||
    !groupedData[0][0].name
  ) {
    return undefined;
  }
  if (groupedData.length === 1) {
    return groupedData;
  }
  // Pick first element from each row of data
  return groupedData.map(gD => gD[0]);
}

export function getLegendProps(
  { height, width },
  initialLegendProps,
  data = undefined,
  originalPadding = {}
) {
  const {
    align,
    data: legendDataProp,
    size,
    labelWidth,
    orientation = 'horizontal',
    ...otherLegendProps
  } = initialLegendProps;

  // Show legend if a legend prop is provided or data contains objects with
  // `name` attribute.
  // https://formidable.com/open-source/victory/docs/victory-legend/#data
  const legendData =
    legendDataProp || (data && data[0] && data[0].name && data);
  let chartHeight = height;
  let chartWidth = width;
  let legendHeight = height;
  let legendWidth = width > 0 ? width : 0;
  const padding = { ...originalPadding };
  padding.top = padding.top || 0;
  padding.right = padding.right || 0;
  padding.bottom = padding.bottom || 0;
  padding.left = padding.left || 0;
  let legendX = padding.left;
  let legendY = padding.top;
  if (legendData && size) {
    switch (align) {
      case 'left':
      case 'right': // fall-through
        chartWidth -= size;
        legendWidth = size;
        // center the chart vertically
        if (chartHeight > chartWidth) {
          const verticalSpacing = chartHeight - chartWidth;
          padding.top += verticalSpacing / 2;
          legendY += verticalSpacing / 2;
        }
        if (align === 'left') {
          padding.left += size;
        } else {
          legendX = chartWidth;
          padding.right += size;
        }
        break;
      case 'top':
      case 'bottom': // fall-through
      default:
        // fall-through
        chartHeight -= size;
        legendHeight = size;
        if (align === 'top') {
          padding.top += size;
        } else {
          legendY = chartHeight;
          padding.bottom += size;
        }
        break;
    }
  }

  // when orientation is horizontal, calculate the items per row
  let itemsPerRow = Math.floor(legendWidth / labelWidth);
  itemsPerRow = itemsPerRow > 0 ? itemsPerRow : 1;

  const legend = legendData && {
    data: legendData,
    height: legendHeight,
    x: legendX,
    y: legendY,
    labelWidth,
    orientation,
    itemsPerRow: orientation !== 'vertical' ? itemsPerRow : undefined,
    ...otherLegendProps
  };
  return {
    height: chartHeight,
    legend,
    padding,
    width: chartWidth
  };
}

/**
 * Default `labels` function for HURUmap UI
 */
export const labels = ({ x, y, unit = '' }) => {
  const formatedX = x ? `${x}: ` : '';
  return `${formatedX}${y}${unit}`;
};
