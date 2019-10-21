import React from 'react';
import PropTypes from 'prop-types';

import { darken } from '@material-ui/core/styles/colorManipulator';

import { VictorySharedEvents } from 'victory';

const activateData = (childName, emphasisCoefficient) => {
  return {
    childName,
    target: 'data',
    mutation: p => {
      const fill =
        p.style && p.style.fill && darken(p.style.fill, emphasisCoefficient);
      return {
        style: { ...p.style, fill }
      };
    }
  };
};

// By not specifying the childName, the event will only affect the component
// that triggered the event: https://formidable.com/open-source/victory/guides/events#single-component-events
const activateLabels = (donut, childName) => {
  return {
    childName: donut ? childName : undefined,
    target: 'labels',
    mutation: () => ({ active: true })
  };
};

const deactivateLabels = (donut, childName) => {
  return {
    childName: donut ? childName : undefined,
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
            onMouseOver: () => {
              return [
                activateData(childName, emphasisCoefficient),
                activateLabels(donut, childName)
              ];
            },
            onMouseOut: () => {
              return [
                {
                  childName,
                  target: 'data',
                  mutation: () => {
                    return null;
                  }
                },
                deactivateLabels(donut, childName)
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
