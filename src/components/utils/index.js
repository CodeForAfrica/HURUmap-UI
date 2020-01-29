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
