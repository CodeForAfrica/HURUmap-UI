import React from 'react';
import PropTypes from 'prop-types';

import Label from '../Label';
import Tooltip from './Tooltip';

/**
 * Tooltip *without* any events is needed for shared events on the pie chart
 * to work.
 * see: https://formidable.com/open-source/victory/guides/tooltips/#tooltips-with-other-events
 */
function DonutTooltip({
  cornerRadius,
  highlightIndex,
  highlightStyle,
  center,
  width,
  x,
  y,
  ...props
}) {
  return (
    <g>
      <Tooltip
        {...props}
        constrainToVisibleArea
        orientation="top"
        cornerRadius={cornerRadius}
        flyoutHeight={width}
        flyoutStyle={{ fill: 'white', stroke: 'none' }}
        flyoutWidth={width}
        labelComponent={
          <Label
            {...props}
            highlightIndex={highlightIndex}
            highlightStyle={highlightStyle}
            width={width}
            verticalAnchor="middle"
          />
        }
        pointerLength={0}
        renderInPortal={false}
        center={center}
      />
      <Tooltip {...props} renderInPortal={false} x={x} y={y} />
    </g>
  );
}

DonutTooltip.propTypes = {
  cornerRadius: PropTypes.number,
  highlightIndex: PropTypes.number,
  highlightStyle: PropTypes.shape({}),
  center: PropTypes.shape({
    x: PropTypes.number,
    y: PropTypes.number
  }),
  width: PropTypes.number,
  x: PropTypes.number,
  y: PropTypes.number
};

DonutTooltip.defaultProps = {
  cornerRadius: undefined,
  highlightIndex: undefined,
  highlightStyle: undefined,
  center: undefined,
  width: undefined,
  x: undefined,
  y: undefined
};

export default DonutTooltip;
