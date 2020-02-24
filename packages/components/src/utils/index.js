import domToImage from 'dom-to-image';

const DEFAULT_SHARE_ENDPOINT = '/api/share';

export const uploadImage = (id, dataUrl, endPoint) =>
  fetch(`${endPoint || DEFAULT_SHARE_ENDPOINT}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      id,
      dataUrl
    })
  }).then(res => {
    if (res.status === 200) {
      return true;
    }

    return false;
  });

export const shareIndicator = (id, geoId, endPoint, e, dataUrl) => {
  const indicatorId = geoId ? `${geoId}_${id}` : id;
  uploadImage(indicatorId, dataUrl, endPoint).then(success => {
    if (success) {
      const url = new URL(window.location);
      url.searchParams.set('indicatorId', indicatorId);
      window.open(`https://twitter.com/intent/tweet?url=${escape(url.href)}`);
    }
  });
};

export const DOWNLOAD_HIDDEN_CLASSNAME = 'Download--hidden';

export const isDowloadHiddenElement = node => {
  const { classList } = node;
  if (classList) {
    return !classList.contains(DOWNLOAD_HIDDEN_CLASSNAME);
  }
  return true;
};

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
