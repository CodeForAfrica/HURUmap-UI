const aggregateFunc = {
  sum: data => data.reduce((a, b) => a + b.y, 0),
  avg: data => data.reduce((a, b) => a + b.y, 0) / data.length
};

const selectFunc = {
  max: data => data.reduce((a, b) => (a.y > b.y ? a : b)),
  min: data => data.reduce((a, b) => (a.y < b.y ? a : b)),
  first: data => data[0],
  last: data => data[data.length - 1]
};

export const isSelectFunc = func => Boolean(selectFunc[func]);

const computeData = (func, data) =>
  // eslint-disable-next-line no-nested-ternary
  selectFunc[func]
    ? selectFunc[func](data)
    : aggregateFunc[func]
    ? aggregateFunc[func](data)
    : /**
       * Return original data
       */
      data[0];

function aggregate(option, data, unique = true) {
  if (!option) {
    return data;
  }
  const [func, unit] = option.split(':');
  if (!selectFunc[func] && !aggregateFunc[func]) {
    return data;
  }

  const reduced = {};
  if (unique) {
    const uniqueX = [...new Set(data.map(d => d.x))];
    uniqueX.forEach(x => {
      const computedData = computeData(func, data.filter(d => d.x === x));
      reduced[x] = {
        ...computedData,
        x: selectFunc[func] ? computedData.x : x,
        y: selectFunc[func] ? computedData.y : computedData
      };
    });
  } else {
    const computedData = computeData(func, data);
    reduced[0] = {
      ...computedData,
      x: selectFunc[func] ? computedData.x : func,
      y: selectFunc[func] ? computedData.y : computedData
    };
  }

  const reducedArray = Object.values(reduced);

  if (unit === 'percent') {
    const total = data.reduce((a, b) => a + b.y, 0);
    return (aggregateFunc[func] || reducedArray.length
      ? reducedArray
      : data
    ).map(d => ({
      ...d,
      y: (100 * d.y) / total
    }));
  }

  return reducedArray;
}

export default function aggregateData(option, data, unique = false) {
  const isGroups = Array.isArray(data[0]);
  if (isGroups) {
    return data.map(gd => aggregate(option, gd, unique));
  }

  return aggregate(option, data, unique);
}
