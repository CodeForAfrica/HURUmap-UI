import React from 'react';
import { VictoryTooltip, Selection } from 'victory';
/**
 * Default Tooltip events do not track mouse/touch movement.
 * https://github.com/FormidableLabs/victory/blob/43550df7f5c89d504e70c65d6a2837ce025a2b3e/packages/victory-tooltip/src/victory-tooltip.js#L87-L127
 *
 * HURUmap-UI Tooltip needs to track mouse/touch movement hence the need for
 * this custom component
 */

function Tooltip(props) {
  return React.createElement(VictoryTooltip, props);
}

Tooltip.defaultEvents = function (props) {
  return [{
    target: 'data',
    eventHandlers: {
      onMouseOver: function onMouseOver(evt) {
        var _Selection$getSVGEven = Selection.getSVGEventCoordinates(evt),
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
        var _Selection$getSVGEven2 = Selection.getSVGEventCoordinates(evt),
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
        var _Selection$getSVGEven3 = Selection.getSVGEventCoordinates(evt),
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

export default Tooltip;