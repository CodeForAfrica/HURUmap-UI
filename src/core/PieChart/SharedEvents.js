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

const activateLabels = childName => {
  return {
    childName,
    target: 'labels',
    mutation: () => ({ active: true })
  };
};

const deactivateLabels = childName => {
  return {
    childName,
    target: 'labels',
    mutation: () => ({ active: false })
  };
};

function SharedEvents({ childName, children, emphasisCoefficient }) {
  return (
    <VictorySharedEvents
      events={[
        {
          childName,
          eventHandlers: {
            onMouseOver: () => {
              return [
                activateData(childName, emphasisCoefficient),
                activateLabels(childName)
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
                deactivateLabels(childName)
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
  emphasisCoefficient: PropTypes.number.isRequired
};

export default SharedEvents;
