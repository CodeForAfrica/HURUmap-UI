const aggregateFunc = {
  sum: data => data.reduce((a, b) => a + b.y, 0),
  max: data => data.reduce((a, b) => (a > b.y ? a : b.y), 0),
  min: data => data.reduce((a, b) => (a < b.y ? a : b.y), 0),
  avg: data => data.reduce((a, b) => a + b.y, 0) / data.length
};

const selectFunc = {
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

export default function aggregateData(option, data, unique = true) {
  const reduced = {};
  const [func, unit] = option.split(':');
  if (unique) {
    const uniqueX = [...new Set(data.map(d => d.x))];
    uniqueX.forEach(x => {
      const computedData = computeData(func, data.filter(d => d.x === x));
      reduced[x] = {
        x: selectFunc[func] ? computedData.x : x,
        y: selectFunc[func] ? computedData.y : computedData
      };
    });
  } else {
    const computedData = computeData(func, data);
    reduced[0] = {
      x: selectFunc[func] ? computedData.x : func,
      y: selectFunc[func] ? computedData.y : computedData
    };
  }

  if (unit === 'percent') {
    const total = Object.values(data).reduce((a, b) => a + b.y, 0);
    return Object.values(
      aggregateFunc[func] || Object.keys(reduced).length ? reduced : data
    ).map(d => ({
      ...d,
      y: (100 * d.y) / total
    }));
  }

  return Object.values(reduced);
}
