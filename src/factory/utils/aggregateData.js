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

function getGroupId(data) {
  const result = [];
  Object.keys(data).forEach(property => {
    if (property.includes('groupBy')) {
      result.push(data[property]);
    }
  });
  return result.join('_').toLocaleLowerCase();
}

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

function aggregate(option, providedData, unique = true) {
  let data = providedData;
  if (data[0].groupBy) {
    data = [...new Set(providedData.map(d => getGroupId(d)))].map(groupId =>
      providedData.filter(d => getGroupId(d) === groupId)
    );
  }

  if (!option || option === 'raw') {
    return data;
  }

  const [func, unit] = option.split(':');

  const reduced = {};
  if (unique) {
    const uniqueX = [...new Set(data.map(d => d.x))];
    uniqueX.forEach(x => {
      const computedData = computeData(
        func,
        data.filter(d => d.x === x)
      );
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
    // Use the reduced array *only* if aggregateFunc[func] was defined to
    // reduce the data.
    const toProcess = aggregateFunc[func] ? reducedArray : data;
    return toProcess.map(d => ({
      ...d,
      y: (100 * d.y) / total
    }));
  }

  return reducedArray;
}

export default function aggregateData(option, data, unique) {
  const isGroups = Array.isArray(data[0]);
  if (isGroups) {
    return data.map(gd => aggregate(option, gd, unique));
  }

  return aggregate(option, data, unique);
}
