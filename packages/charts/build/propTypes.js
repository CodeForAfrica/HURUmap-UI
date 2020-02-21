"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _propTypes = _interopRequireDefault(require("prop-types"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

// This is a factory function (also called a higher-order function)
var createTwoNodeArrayType = function createTwoNodeArrayType(isRequired) {
  // The factory returns a custom prop type
  return function (props, propName, componentName) {
    var childrenNodes = {
      children: _propTypes.default.arrayOf(_propTypes.default.node)
    };
    var prop = props[propName];

    if (prop == null && isRequired) {
      // Prop is required but wasn't specified. Throw an error.
      return new Error("".concat(propName, " in ").concat(componentName, " isRequired"));
    } // check if not node types or not length == 2 return error


    var notNode = !_propTypes.default.checkPropTypes(childrenNodes, props, propName, componentName);

    if (prop.length !== 2 || notNode) {
      return new Error("".concat(propName, " in ").concat(componentName, " needs to be an array of two node"));
    }

    return null;
  };
}; // Using the factory, create two different versions of your prop type


var twoNodeArrayType = createTwoNodeArrayType(false);
twoNodeArrayType.isRequired = createTwoNodeArrayType(true);

var colorScale = _propTypes.default.oneOfType([_propTypes.default.string, _propTypes.default.arrayOf(_propTypes.default.string)]);

var data = _propTypes.default.oneOfType([_propTypes.default.arrayOf(_propTypes.default.shape({
  x: _propTypes.default.oneOfType([_propTypes.default.number, _propTypes.default.string]),
  y: _propTypes.default.number,
  label: _propTypes.default.string,
  tooltip: _propTypes.default.string
})), _propTypes.default.arrayOf(_propTypes.default.number)]);

var _default = _objectSpread({}, _propTypes.default, {
  children: _propTypes.default.oneOfType([_propTypes.default.node, _propTypes.default.arrayOf(_propTypes.default.node)]),
  graphQlData: _propTypes.default.arrayOf(_propTypes.default.shape({
    x: _propTypes.default.oneOfType([_propTypes.default.string, _propTypes.default.number]),
    y: _propTypes.default.oneOfType([_propTypes.default.string, _propTypes.default.number]),
    label: _propTypes.default.string,
    groupBy: _propTypes.default.string
  })),
  twoNodeArrayType: twoNodeArrayType,
  data: data,
  groupedData: _propTypes.default.oneOfType([data, _propTypes.default.arrayOf(data)]),
  reference: _propTypes.default.oneOfType([_propTypes.default.shape({
    x: _propTypes.default.oneOfType([_propTypes.default.string, _propTypes.default.number]),
    y: _propTypes.default.number
  }), _propTypes.default.arrayOf(_propTypes.default.shape({
    data: _propTypes.default.arrayOf(_propTypes.default.shape({
      x: _propTypes.default.oneOfType([_propTypes.default.string, _propTypes.default.number]),
      y: _propTypes.default.number
    })),
    style: _propTypes.default.shape({})
  }))]),
  singleRefrence: _propTypes.default.shape({
    data: _propTypes.default.number,
    style: _propTypes.default.shape({})
  }),
  theme: _propTypes.default.shape({
    bullet: _propTypes.default.shape({}),
    proportionalArea: _propTypes.default.shape({}),
    breakpoints: _propTypes.default.shape({
      sm: _propTypes.default.number
    }),
    axis: _propTypes.default.shape({
      labelWidth: _propTypes.default.number
    }),
    bar: _propTypes.default.shape({}),
    pie: _propTypes.default.shape({}),
    group: _propTypes.default.shape({
      colorScale: colorScale
    }),
    line: _propTypes.default.shape({})
  }),
  colorScale: colorScale
});

exports.default = _default;