/* eslint-disable import/prefer-default-export */

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
    ...otherLegendProps
  } = initialLegendProps;

  // Show legend if a legend prop is provided or data contains objects with
  // `name` attribute.
  // https://formidable.com/open-source/victory/docs/victory-legend/#data
  const legendData = legendDataProp || (data && data[0].name && data);
  let chartHeight = height;
  let chartWidth = width;
  let legendHeight = height;
  let legendWidth = width;
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
  const legend = legendData && {
    data: legendData,
    height: legendHeight,
    orientation: 'horizontal',
    width: legendWidth,
    x: legendX,
    y: legendY,
    ...otherLegendProps
  };
  return {
    height: chartHeight,
    legend,
    padding,
    width: chartWidth
  };
}
