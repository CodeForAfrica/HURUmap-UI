/* eslint-disable import/prefer-default-export */

export function getLegendProps(
  height,
  width,
  chart,
  initialLegendProps,
  data = undefined,
  padding = {}
) {
  const {
    align: legendAlign,
    data: legendDataProp,
    size: legendSize,
    ...otherLegendProps
  } = initialLegendProps;
  // Show legend if a legend prop is provided or data contains objects with
  // `name` attribute.
  // https://formidable.com/open-source/victory/docs/victory-legend/#data
  const { align: defaultAlign, size: defaultSize } = chart.legend;
  const align = legendAlign || defaultAlign;
  const legendData = legendDataProp || (data && data[0].name && data);
  let chartHeight = height || chart.height;
  let chartWidth = width || chart.width;
  console.log('boom', { chartHeight, chartWidth, legendSize });
  let legendWidth;
  let legendX;
  let legendY;
  const size = legendSize || defaultSize;
  let x = 0;
  let y = 0;
  if (legendData && size) {
    switch (align) {
      case 'left':
      case 'right': // fall-through
        chartWidth -= size;
        legendWidth = size;
        legendX = legendAlign === 'left' ? padding.left || 0 : chartWidth;
        legendY = padding.top || 0;
        x = legendAlign === 'left' ? size : x;
        break;
      case 'top':
      case 'bottom': // fall-through
      default:
        // fall-through
        chartHeight -= size;
        legendX = padding.left || 0;
        legendY = legendAlign === 'top' ? padding.top || 0 : chartHeight;
        y = legendAlign === 'top' ? size : y;
        break;
    }
  }
  const legend = legendData && {
    data: legendData,
    orientation: 'horizontal',
    width: legendWidth,
    x: legendX,
    y: legendY,
    ...otherLegendProps
  };
  console.log('boom', legend);
  return {
    height: chartHeight,
    legend,
    width: chartWidth,
    x,
    y
  };
}
