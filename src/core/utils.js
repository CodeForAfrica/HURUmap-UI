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
  const legendData =
    legendDataProp || (data && data[0] && data[0].name && data);
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

    const toPng = () => {
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
    };

    // Use the original node since the clonedNode's iframe wouldn't have
    // time to load yet (we just cloned it)
    const iframes = node.getElementsByTagName('iframe');
    if (iframes && iframes.length) {
      const iframe = iframes[0];
      if (iframe.contentWindow && iframe.contentWindow.domtoimage) {
        return iframe.contentWindow.domtoimage
          .toPng(iframe.contentDocument.body, {
            ...options
          })
          .then(dataUrl => {
            const img = new Image();
            img.src = dataUrl;
            // replace the clonedNode's iframe with image
            const clonedNodeIframe = clonedNode.getElementsByTagName(
              'iframe'
            )[0];
            clonedNodeIframe.parentNode.replaceChild(img, clonedNodeIframe);
          })
          .then(() => {
            return toPng();
          });
      }
    }
    return toPng();
  }
  return Promise.resolve(undefined);
}

/**
 * Default `labels` function for HURUmap UI
 */
export const labels = ({ x, y, unit = '' }) => {
  const formatedX = x ? `${x}: ` : '';
  return `${formatedX}${y}${unit}`;
};

export const DOWNLOAD_HIDDEN_CLASSNAME = 'Download--hidden';

export const isDowloadHiddenElement = node => {
  const { classList } = node;
  if (classList) {
    return !classList.contains(DOWNLOAD_HIDDEN_CLASSNAME);
  }
  return true;
};
