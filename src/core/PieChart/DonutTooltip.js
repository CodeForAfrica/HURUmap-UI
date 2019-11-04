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
  origin,
  width,
  x,
  y,
  ...props
}) {
  return (
    <g>
      <Tooltip {...props} renderInPortal={false} x={x} y={y} />
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
          />
        }
        pointerLength={0}
        renderInPortal={false}
        x={origin.x}
        y={origin.y}
      />
    </g>
  );
}

DonutTooltip.propTypes = {
  cornerRadius: PropTypes.number,
  highlightIndex: PropTypes.number,
  highlightStyle: PropTypes.shape({}),
  origin: PropTypes.shape({
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
  origin: undefined,
  width: undefined,
  x: undefined,
  y: undefined
};

export default DonutTooltip;
