"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = aggregateData;
exports.groupData = exports.isSelectFunc = void 0;

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { if (!(Symbol.iterator in Object(arr) || Object.prototype.toString.call(arr) === "[object Arguments]")) { return; } var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

var aggregateFunc = {
  sum: function sum(data) {
    return data.reduce(function (a, b) {
      return a + b.y;
    }, 0);
  },
  avg: function avg(data) {
    return data.reduce(function (a, b) {
      return a + b.y;
    }, 0) / data.length;
  }
};
var selectFunc = {
  max: function max(data) {
    return data.reduce(function (a, b) {
      return a.y > b.y ? a : b;
    });
  },
  min: function min(data) {
    return data.reduce(function (a, b) {
      return a.y < b.y ? a : b;
    });
  },
  first: function first(data) {
    return data[0];
  },
  last: function last(data) {
    return data[data.length - 1];
  }
};

var isSelectFunc = function isSelectFunc(func) {
  return Boolean(selectFunc[func]);
};

exports.isSelectFunc = isSelectFunc;

function getGroupId(data) {
  var result = [];
  Object.keys(data).forEach(function (property) {
    if (property.includes('groupBy')) {
      result.push(data[property]);
    }
  });
  return result.join('_').toLocaleLowerCase();
}

var groupData = function groupData(data) {
  if (data[0].groupBy) {
    return _toConsumableArray(new Set(data.map(function (d) {
      return getGroupId(d);
    }))).map(function (groupId) {
      return data.filter(function (d) {
        return getGroupId(d) === groupId;
      });
    });
  }

  return [data];
};

exports.groupData = groupData;

var computeData = function computeData(func, data) {
  return (// eslint-disable-next-line no-nested-ternary
    selectFunc[func] ? selectFunc[func](data) : aggregateFunc[func] ? aggregateFunc[func](data) :
    /**
     * Return original data
     */
    data[0]
  );
};

function aggregate(option, data) {
  var unique = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true;

  if (!option || option === 'raw') {
    return data;
  }

  var _option$split = option.split(':'),
      _option$split2 = _slicedToArray(_option$split, 2),
      func = _option$split2[0],
      unit = _option$split2[1];

  var reduced = {};

  if (unique) {
    var uniqueX = _toConsumableArray(new Set(data.map(function (d) {
      return d.x;
    })));

    uniqueX.forEach(function (x) {
      var computedData = computeData(func, data.filter(function (d) {
        return d.x === x;
      }));
      reduced[x] = _objectSpread({}, computedData, {
        x: selectFunc[func] ? computedData.x : x,
        y: selectFunc[func] ? computedData.y : computedData
      });
    });
  } else {
    var computedData = computeData(func, data);
    reduced[0] = _objectSpread({}, computedData, {
      x: selectFunc[func] ? computedData.x : func,
      y: selectFunc[func] ? computedData.y : computedData
    });
  }

  var reducedArray = Object.values(reduced);

  if (unit === 'percent') {
    var total = data.reduce(function (a, b) {
      return a + b.y;
    }, 0); // Use the reduced array *only* if aggregateFunc[func] was defined to
    // reduce the data.

    var toProcess = aggregateFunc[func] ? reducedArray : data;
    return toProcess.map(function (d) {
      return _objectSpread({}, d, {
        y: 100 * d.y / total
      });
    });
  }

  return reducedArray;
}

function aggregateData(option, data, unique) {
  var isGroups = Array.isArray(data[0]);

  if (isGroups) {
    return data.map(function (gd) {
      return aggregate(option, gd, unique);
    });
  }

  return aggregate(option, data, unique);
}