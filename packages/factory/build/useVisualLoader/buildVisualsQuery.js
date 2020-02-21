"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _graphqlTag = _interopRequireDefault(require("graphql-tag"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _templateObject() {
  var data = _taggedTemplateLiteral(["\nquery charts($geoCode: String!, $geoLevel: String!, $countryCode: String!) {\n  ", "\n}\n"]);

  _templateObject = function _templateObject() {
    return data;
  };

  return data;
}

function _taggedTemplateLiteral(strings, raw) { if (!raw) { raw = strings.slice(0); } return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

var _default = function _default(visuals, parent) {
  return (0, _graphqlTag.default)(_templateObject(), visuals.map(function (visual) {
    return "".concat(visual.queryAlias, ": ").concat(visual.table, " (\n    condition: { geoCode: $geoCode, geoLevel: $geoLevel }\n  ) {\n    nodes {\n      ").concat(visual.label && visual.label[0] === '$' ? "label: ".concat(visual.label.slice(1)) : '', "\n      ").concat(visual.groupBy ? "groupBy: ".concat(visual.groupBy) : '', "\n      x: ").concat(visual.x, "\n      y: ").concat(visual.y, "\n    }\n  }\n  ").concat(visual.queryAlias, "Source: allSources(\n    condition: {\n      geoLevel: $geoLevel\n      countryCode: $countryCode\n      tableName: \"").concat(visual.table, "\"\n    }\n  ) {\n    nodes {\n      title: sourceTitle\n      href: sourceLink\n    }\n  }\n  ").concat(visual.reference && parent && parent.geoLevel && parent.geoCode ? "".concat(visual.queryAlias, "Reference: ").concat(visual.reference.table || visual.table, " (\n    condition: ").concat(JSON.stringify(visual.reference.condition || {
      geoLevel: parent.geoLevel,
      geoCode: parent.geoCode
    })
    /**
     * Replace quotes around keys from json stringify
     */
    .replace(/"([^(")"]+)":/g, '$1:'), "\n  ) {\n    nodes {\n      ").concat((visual.reference.label || visual.label) && (visual.reference.label || visual.label)[0] === '$' ? "label: ".concat((visual.reference.label || visual.label).slice(1)) : '', "\n      x: ").concat(visual.reference.x || visual.x, "\n      y: ").concat(visual.reference.y || visual.y, "\n    }\n  }") : '', "\n  ");
  }).join(''));
};

exports.default = _default;