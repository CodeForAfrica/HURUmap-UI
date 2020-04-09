const aggregateFunc = {
  sum: data =>
    data.reduce((a, b) => a + (b.rawY !== undefined ? b.rawY : b.y), 0),
  avg: data =>
    data.reduce((a, b) => a + (b.rawY !== undefined ? b.rawY : b.y), 0) /
    data.length
};

const selectFunc = {
  max: data =>
    data.reduce((a, b) =>
      // eslint-disable-next-line no-nested-ternary
      a.rawY !== undefined ? (a.rawY > b.rawY ? a : b) : a.y > b.y ? a : b
    ),
  min: data =>
    data.reduce((a, b) =>
      // eslint-disable-next-line no-nested-ternary
      a.rawY !== undefined ? (a.rawY < b.rawY ? a : b) : a.y < b.y ? a : b
    ),
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

export const groupData = data => {
  if (data[0].groupBy) {
    return [...new Set(data.map(d => getGroupId(d)))].map(groupId =>
      data.filter(d => getGroupId(d) === groupId)
    );
  }
  return [data];
};

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

function aggregate(option, data, unique = true, calcPercent = true) {
  let reducedArray;
  const reduced = {};

  const [func, unit] = option ? option.split(':') : ['', ''];
  if (!func || func === 'raw') {
    reducedArray = data;
  } else if (unique) {
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
      x: selectFunc[func]
        ? computedData.x
        : func[0].toUpperCase() + func.slice(1),
      y: selectFunc[func] ? computedData.y : computedData
    };
  }

  if (!reducedArray) {
    reducedArray = Object.values(reduced);
  }

  if (calcPercent && unit === 'percent') {
    const total = data.reduce(
      (a, b) => (b.total !== undefined ? a + b.total : a + b.y),
      0
    );
    return reducedArray.map(({ y, rawY, ...d }) => ({
      total,
      rawY: rawY !== undefined ? rawY : y,
      y: !total ? 0 : (100 * (rawY !== undefined ? rawY : y)) / total,
      ...d
    }));
  }

  return reducedArray;
}

export default function aggregateData(option, data, unique) {
  const isGroups = Array.isArray(data[0]);
  if (isGroups) {
    const func = (option || '').split(':')[0];
    const aggregateTwice = func && func !== 'raw' && !unique;

    const aggregatedGroup = data.map(gd => aggregate(option, gd, false));

    if (aggregateTwice) {
      return aggregate(
        option,
        aggregatedGroup.reduce((merge, gd) => merge.concat(gd), []),
        unique
      );
    }
    return aggregatedGroup;
  }

  return aggregate(option, data, unique);
}
