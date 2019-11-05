import domToImage from 'dom-to-image';

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
  let legendX = originalPadding.left || 0;
  let legendY = originalPadding.top || 0;
  const padding = { ...originalPadding };
  if (legendData && size) {
    switch (align) {
      case 'left':
      case 'right': // fall-through
        chartWidth -= size;
        legendWidth = size;
        // center the chart vertically
        padding.top += size / 2;
        legendY += size / 2;
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

export function domToPng(node, { style: nodeStyle, ...options }) {
  if (node) {
    // To avoid any flicking, it's best to clone the node and run the `filter`
    // function, which may modify the node, on the cloned node.
    const clonedNode = node.cloneNode(true);
    const { left, position } = clonedNode.style;
    clonedNode.style.left = '-999px';
    clonedNode.style.position = 'absolute';
    clonedNode.style.width = `${node.scrollWidth}px`;

    const style = { ...nodeStyle, left, position };
    document.body.appendChild(clonedNode);

    return domToImage
      .toPng(clonedNode, {
        ...options,
        style
      })
      .then(dataUrl => {
        document.body.removeChild(clonedNode);
        return dataUrl;
      });
  }
  return Promise.resolve(undefined);
}
