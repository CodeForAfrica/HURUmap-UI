// Sum the actual y value and not the calculated y
const sum = data =>
  data.reduce((a, b) => a + (b.actualY !== undefined ? b.actualY : b.y), 0);
const aggregateFunc = {
  sum,
  avg: data => sum(data) / data.length
};

const selectFunc = {
  max: data =>
    data.reduce((a, b) =>
      // Compare the actual y value and not the calculated y
      // eslint-disable-next-line no-nested-ternary
      a.actualY !== undefined
        ? a.actualY > b.actualY
          ? a
          : b
        : a.y > b.y
        ? a
        : b
    ),
  min: data =>
    data.reduce((a, b) =>
      // Compare the actual y value and not the calculated y
      // eslint-disable-next-line no-nested-ternary
      a.actualY !== undefined
        ? a.actualY < b.actualY
          ? a
          : b
        : a.y < b.y
        ? a
        : b
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
    // Calculate total using tracked groups total or the actual y value
    const total = data.reduce(
      (a, b) => (b.total !== undefined ? a + b.total : a + b.y),
      0
    );
    return reducedArray.map(({ y, actualY, ...d }) => ({
      // Keep track of the total for grouped data
      // On aggregateSecondPass we are looking through each groups initial aggregation
      // We need each groups total to recalculate the second pass total (i.e total for the entire group)
      // This is only when unique is false (i.e. aggregrate irrespective of groups)
      total,
      // Keep track of the actual y for grouped data
      // When we are selecting max of min we need to compare the actualY and not the percentage
      actualY: actualY !== undefined ? actualY : y,
      y: !total ? 0 : (100 * (actualY !== undefined ? actualY : y)) / total,
      ...d
    }));
  }

  return reducedArray;
}

export default function aggregateData(option, data, unique) {
  const isGroups = Array.isArray(data[0]);
  if (isGroups) {
    const func = (option || '').split(':')[0];

    // A second pass is needed to look through groups merged as one
    const aggregateSecondPass = func && func !== 'raw' && !unique;

    const aggregatedGroup = data.map(gd => aggregate(option, gd, false));

    if (aggregateSecondPass) {
      return aggregate(
        option,
        // Merge groups to look through them as one group
        aggregatedGroup.reduce((merge, gd) => merge.concat(gd), []),
        unique
      );
    }
    return aggregatedGroup;
  }

  return aggregate(option, data, unique);
}
