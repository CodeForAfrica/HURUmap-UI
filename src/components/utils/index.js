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

export const shareIndicator = (id, endPoint, e, dataUrl) => {
  uploadImage(id, dataUrl, endPoint).then(success => {
    if (success) {
      const url = new URL(window.location);
      url.searchParams.set('indicatorId', id);
      window.open(`https://twitter.com/intent/tweet?url=${escape(url.href)}`);
    }
  });
};
