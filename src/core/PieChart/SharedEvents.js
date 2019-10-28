import React from 'react';
import PropTypes from 'prop-types';

import { darken } from '@material-ui/core/styles/colorManipulator';

import { Selection, VictorySharedEvents } from 'victory';

const activateData = (evt, donut, childName, emphasisCoefficient) => {
  return {
    childName,
    target: 'data',
    mutation: p => {
      const style = (p && p.style) || {};
      let { fill } = style;
      // Watch out if `fill` is set via an asset
      if (fill && !fill.startsWith('url')) {
        fill = darken(style.fill, emphasisCoefficient);
      }
      return {
        style: { ...p.style, fill }
      };
    }
  };
};

// By not specifying the childName, the event will only affect the component
// that triggered the event: https://formidable.com/open-source/victory/guides/events#single-component-events
const activateLabels = (evt, donut, childName, props) => {
  // Don't track movement if:
  //  i. donut mode, and
  //  ii. Hovering on a label since we'll move the label as well
  const { x, y } =
    donut || (props && props.key && props.key.indexOf('labels') !== -1)
      ? {}
      : Selection.getSVGEventCoordinates(evt);

  return {
    target: 'labels',
    mutation: () => ({ active: true, x, y })
  };
};

const deactivateLabels = () => {
  return {
    target: 'labels',
    mutation: () => ({ active: false })
  };
};

function SharedEvents({ childName, children, donut, emphasisCoefficient }) {
  return (
    <VictorySharedEvents
      events={[
        {
          childName,
          eventHandlers: {
            onMouseOver: (evt, ...args) => {
              return [
                activateData(evt, donut, childName, emphasisCoefficient),
                activateLabels(evt, donut, childName, ...args)
              ];
            },
            onMouseMove: (evt, ...args) => {
              return [activateLabels(evt, donut, childName, ...args)];
            },
            onMouseOut: evt => {
              return [
                {
                  childName,
                  target: 'data',
                  mutation: () => {
                    return null;
                  }
                },
                deactivateLabels(evt, donut, childName)
              ];
            },
            onMouseLeave: evt => {
              return [
                {
                  childName,
                  target: 'data',
                  mutation: () => {
                    return null;
                  }
                },
                deactivateLabels(evt, donut, childName)
              ];
            }
          }
        }
      ]}
    >
      {children}
    </VictorySharedEvents>
  );
}

SharedEvents.propTypes = {
  childName: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ]).isRequired,
  donut: PropTypes.bool,
  emphasisCoefficient: PropTypes.number.isRequired
};

SharedEvents.defaultProps = {
  donut: false
};

export default SharedEvents;
