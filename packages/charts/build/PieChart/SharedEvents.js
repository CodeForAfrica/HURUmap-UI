"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _colorManipulator = require("@material-ui/core/styles/colorManipulator");

var _victory = require("victory");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var activateData = function activateData(evt, donut, childName, emphasisCoefficient) {
  return {
    childName: childName,
    target: 'data',
    mutation: function mutation(p) {
      var style = p && p.style || {};
      var fill = style.fill; // Watch out if `fill` is set via an asset

      if (fill && !fill.startsWith('url')) {
        fill = (0, _colorManipulator.darken)(style.fill, emphasisCoefficient);
      }

      return {
        style: _objectSpread({}, p.style, {
          fill: fill
        })
      };
    }
  };
}; // By not specifying the childName, the event will only affect the component
// that triggered the event: https://formidable.com/open-source/victory/guides/events#single-component-events


var activateLabels = function activateLabels(evt, donut, childName, props) {
  // Don't track movement if hovering on a legend since we'll move the
  // legend label, etc.
  var _mutation = {
    active: true
  };

  if (props && props.key && !props.key.startsWith('legend-')) {
    var _Selection$getSVGEven = _victory.Selection.getSVGEventCoordinates(evt),
        x = _Selection$getSVGEven.x,
        y = _Selection$getSVGEven.y;

    Object.assign(_mutation, {
      x: x,
      y: y
    });
  }

  return {
    target: 'labels',
    mutation: function mutation() {
      return _mutation;
    }
  };
};

var deactivateLabels = function deactivateLabels() {
  return {
    target: 'labels',
    mutation: function mutation() {
      return {
        active: false
      };
    }
  };
};

function SharedEvents(_ref) {
  var childName = _ref.childName,
      children = _ref.children,
      donut = _ref.donut,
      emphasisCoefficient = _ref.emphasisCoefficient;
  return _react.default.createElement(_victory.VictorySharedEvents, {
    events: [{
      childName: childName,
      eventHandlers: {
        onMouseOver: function onMouseOver(evt) {
          for (var _len = arguments.length, args = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
            args[_key - 1] = arguments[_key];
          }

          return [activateData(evt, donut, childName, emphasisCoefficient), activateLabels.apply(void 0, [evt, donut, childName].concat(args))];
        },
        onMouseMove: function onMouseMove(evt) {
          for (var _len2 = arguments.length, args = new Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {
            args[_key2 - 1] = arguments[_key2];
          }

          return [activateLabels.apply(void 0, [evt, donut, childName].concat(args))];
        },
        onMouseOut: function onMouseOut(evt) {
          return [{
            childName: childName,
            target: 'data',
            mutation: function mutation() {
              return null;
            }
          }, deactivateLabels(evt, donut, childName)];
        },
        onMouseLeave: function onMouseLeave(evt) {
          return [{
            childName: childName,
            target: 'data',
            mutation: function mutation() {
              return null;
            }
          }, deactivateLabels(evt, donut, childName)];
        }
      }
    }]
  }, children);
}

SharedEvents.propTypes = {
  childName: _propTypes.default.arrayOf(_propTypes.default.string.isRequired).isRequired,
  children: _propTypes.default.oneOfType([_propTypes.default.arrayOf(_propTypes.default.node), _propTypes.default.node]).isRequired,
  donut: _propTypes.default.bool,
  emphasisCoefficient: _propTypes.default.number.isRequired
};
SharedEvents.defaultProps = {
  donut: false
};
var _default = SharedEvents;
exports.default = _default;