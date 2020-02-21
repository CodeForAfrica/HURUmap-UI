"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _victory = require("victory");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

/**
 * Default Tooltip events do not track mouse/touch movement.
 * https://github.com/FormidableLabs/victory/blob/43550df7f5c89d504e70c65d6a2837ce025a2b3e/packages/victory-tooltip/src/victory-tooltip.js#L87-L127
 *
 * HURUmap-UI Tooltip needs to track mouse/touch movement hence the need for
 * this custom component
 */
function Tooltip(props) {
  return _react.default.createElement(_victory.VictoryTooltip, _extends({
    constrainToVisibleArea: true
  }, props));
}

Tooltip.defaultEvents = function (props) {
  return [{
    target: 'data',
    eventHandlers: {
      onMouseOver: function onMouseOver(evt) {
        var _Selection$getSVGEven = _victory.Selection.getSVGEventCoordinates(evt),
            x = _Selection$getSVGEven.x,
            y = _Selection$getSVGEven.y;

        return props.activateData ? [{
          target: 'labels',
          mutation: function mutation() {
            return {
              x: x,
              y: y,
              active: true
            };
          }
        }, {
          target: 'data',
          mutation: function mutation() {
            return {
              x: x,
              y: y,
              active: true
            };
          }
        }] : [{
          target: 'labels',
          mutation: function mutation() {
            return {
              x: x,
              y: y,
              active: true
            };
          }
        }];
      },
      onMouseMove: function onMouseMove(evt) {
        var _Selection$getSVGEven2 = _victory.Selection.getSVGEventCoordinates(evt),
            x = _Selection$getSVGEven2.x,
            y = _Selection$getSVGEven2.y;

        return props.activateData ? [{
          target: 'labels',
          mutation: function mutation() {
            return {
              x: x,
              y: y,
              active: true
            };
          }
        }, {
          target: 'data',
          mutation: function mutation() {
            return {
              x: x,
              y: y,
              active: true
            };
          }
        }] : [{
          target: 'labels',
          mutation: function mutation() {
            return {
              x: x,
              y: y,
              active: true
            };
          }
        }];
      },
      onTouchStart: function onTouchStart(evt) {
        var _Selection$getSVGEven3 = _victory.Selection.getSVGEventCoordinates(evt),
            x = _Selection$getSVGEven3.x,
            y = _Selection$getSVGEven3.y;

        return props.activateData ? [{
          target: 'labels',
          mutation: function mutation() {
            return {
              x: x,
              y: y,
              active: true
            };
          }
        }, {
          target: 'data',
          mutation: function mutation() {
            return {
              x: x,
              y: y,
              active: true
            };
          }
        }] : [{
          target: 'labels',
          mutation: function mutation() {
            return {
              x: x,
              y: y,
              active: true
            };
          }
        }];
      },
      onMouseOut: function onMouseOut() {
        return props.activateData ? [{
          target: 'labels',
          mutation: function mutation() {
            return {
              active: undefined
            };
          }
        }, {
          target: 'data',
          mutation: function mutation() {
            return {
              active: undefined
            };
          }
        }] : [{
          target: 'labels',
          mutation: function mutation() {
            return {
              active: undefined
            };
          }
        }];
      },
      onTouchEnd: function onTouchEnd() {
        return props.activateData ? [{
          target: 'labels',
          mutation: function mutation() {
            return {
              active: undefined
            };
          }
        }, {
          target: 'data',
          mutation: function mutation() {
            return {
              active: undefined
            };
          }
        }] : [{
          target: 'labels',
          mutation: function mutation() {
            return {
              active: undefined
            };
          }
        }];
      }
    }
  }];
};

var _default = Tooltip;
exports.default = _default;