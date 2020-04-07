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
export function extractLegendData(data) {
  if (!data || !data.length) {
    return undefined;
  }

  if (Array.isArray(data[0])) {
    if (!data[0].length || !data[0][0].name) {
      return undefined;
    }

    if (data.length === 1) {
      return data;
    }
    // Pick first element from each row of data
    return data.map(gD => gD[0]);
  }
  return [data];
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
    labelWidth,
    legendWidth: preferredLegendWidth,
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

  const padding = { ...originalPadding };
  padding.top = padding.top || 0;
  padding.right = padding.right || 0;
  padding.bottom = padding.bottom || 0;
  padding.left = padding.left || 0;

  let legendWidth =
    preferredLegendWidth || width > 0
      ? width - padding.left - padding.right
      : 0;
  if (['left', 'right'].includes(align)) {
    legendWidth = preferredLegendWidth || labelWidth;
  }

  let legendX = padding.left;

  // when orientation is horizontal
  // calculate the items per row
  let itemsPerRow =
    orientation !== 'vertical'
      ? Math.floor(legendWidth / labelWidth)
      : legendData.length;

  itemsPerRow = itemsPerRow > 0 ? itemsPerRow : 1;

  let rowCount = Math.floor(legendData.length / itemsPerRow);

  rowCount = rowCount > 0 ? rowCount : 1;

  const legendHeight = 25 * rowCount;

  let legendY = align === 'bottom' ? chartHeight - legendHeight : padding.top;

  switch (align) {
    case 'left':
    case 'right': // fall-through
      chartWidth -= labelWidth;
      legendWidth = labelWidth;
      if (chartHeight < legendHeight) {
        chartHeight = legendHeight;
      }
      // center the chart vertically
      if (chartHeight > chartWidth) {
        const verticalSpacing = chartHeight - chartWidth;
        padding.top += verticalSpacing / 2;
        legendY += verticalSpacing / 2;
      }
      if (align === 'left') {
        padding.left += labelWidth;
      } else {
        legendX = chartWidth;
        padding.right += labelWidth;
      }
      break;
    case 'top':
    case 'bottom': // fall-through
    default:
      // fall-through
      if (align === 'top') {
        padding.top += legendHeight;
      } else {
        padding.bottom += legendHeight;
      }
      break;
  }

  return {
    height: chartHeight,
    legend: legendData && {
      data: legendData,
      height: legendHeight,
      width: legendWidth,
      x: legendX,
      y: legendY,
      labelWidth,
      orientation,
      itemsPerRow,
      ...otherLegendProps
    },
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
