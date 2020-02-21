"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exportCSV;

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

function convertToCSV(rows) {
  return rows.map(function (row) {
    return row.filter(function (val) {
      return val;
    }).join(',');
  }).join('\r\n');
}

function exportCSV(headers, items, fileTitle) {
  var csv = convertToCSV([Object.values(headers)].concat(_toConsumableArray(items.map(function (item) {
    return Object.keys(headers).map(function (key) {
      return item[key];
    });
  }))));
  var exportedFilenmae = "".concat(fileTitle, ".csv") || 'export.csv';
  var blob = new Blob([csv], {
    type: 'text/csv;charset=utf-8;'
  });
  var link = document.createElement('a');

  if (link.download !== undefined) {
    // feature detection
    // Browsers that support HTML5 download attribute
    var url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', exportedFilenmae);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }
}