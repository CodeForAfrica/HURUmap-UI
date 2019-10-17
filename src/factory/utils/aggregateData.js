const aggregateFunc = {
  sum: data => data.reduce((a, b) => a + b.y, 0),
  max: data => data.reduce((a, b) => (a > b.y ? a : b.y), 0),
  min: data => data.reduce((a, b) => (a < b.y ? a : b.y), 0),
  avg: data => data.reduce((a, b) => a + b.y, 0) / data.length,
  first: data => data[0].y,
  last: data => data[data.length - 1].y
};

export default function aggregateData(option, data, unique = true) {
  const reduced = {};
  const [func, format] = option.split(':');
  if (unique) {
    const uniqueX = [...new Set(data.map(d => d.x))];
    uniqueX.forEach(x => {
      reduced[x] = {
        x,
        y: aggregateFunc[func](data.filter(d => d.x === x))
      };
    });
  } else {
    reduced[0] = {
      x: func,
      y: aggregateFunc[func](data)
    };
  }
  if (format === 'percent') {
    const total = Object.values(reduced).reduce((a, b) => a + b.y, 0);
    return Object.values(reduced).map(d => ({
      ...d,
      y: (100 * d.y) / total
    }));
  }

  return Object.values(reduced);
}
