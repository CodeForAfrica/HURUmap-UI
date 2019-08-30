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
  return <VictoryTooltip {...props} />;
}

Tooltip.defaultEvents = props => [
  {
    target: 'data',
    eventHandlers: {
      onMouseOver: evt => {
        const { x, y } = Selection.getSVGEventCoordinates(evt);
        return props.activateData
          ? [
              { target: 'labels', mutation: () => ({ x, y, active: true }) },
              { target: 'data', mutation: () => ({ x, y, active: true }) }
            ]
          : [{ target: 'labels', mutation: () => ({ x, y, active: true }) }];
      },
      onMouseMove: evt => {
        const { x, y } = Selection.getSVGEventCoordinates(evt);
        return props.activateData
          ? [
              { target: 'labels', mutation: () => ({ x, y, active: true }) },
              { target: 'data', mutation: () => ({ x, y, active: true }) }
            ]
          : [{ target: 'labels', mutation: () => ({ x, y, active: true }) }];
      },
      onTouchStart: evt => {
        const { x, y } = Selection.getSVGEventCoordinates(evt);
        return props.activateData
          ? [
              { target: 'labels', mutation: () => ({ x, y, active: true }) },
              { target: 'data', mutation: () => ({ x, y, active: true }) }
            ]
          : [{ target: 'labels', mutation: () => ({ x, y, active: true }) }];
      },
      onMouseOut: () => {
        return props.activateData
          ? [
              { target: 'labels', mutation: () => ({ active: undefined }) },
              { target: 'data', mutation: () => ({ active: undefined }) }
            ]
          : [{ target: 'labels', mutation: () => ({ active: undefined }) }];
      },
      onTouchEnd: () => {
        return props.activateData
          ? [
              { target: 'labels', mutation: () => ({ active: undefined }) },
              { target: 'data', mutation: () => ({ active: undefined }) }
            ]
          : [{ target: 'labels', mutation: () => ({ active: undefined }) }];
      }
    }
  }
];

export default Tooltip;
