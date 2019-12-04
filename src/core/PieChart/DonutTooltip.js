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
  center,
  cornerRadius,
  highlightIndex,
  highlightStyle,
  width,
  x,
  y,
  ...props
}) {
  const { datum: originalDatum, text: originalText } = props;
  const text = (originalDatum && originalDatum.donutLabel) || originalText;
  const datum = { ...originalDatum, label: text };

  return (
    <g>
      <Tooltip
        {...props}
        center={center}
        constrainToVisibleArea
        orientation="top"
        cornerRadius={cornerRadius}
        datum={datum}
        flyoutHeight={width}
        flyoutStyle={{ fill: 'white', stroke: 'none' }}
        flyoutWidth={width}
        labelComponent={
          <Label
            {...props}
            datum={datum}
            highlightIndex={highlightIndex}
            highlightStyle={highlightStyle}
            width={width}
            text={text}
            verticalAnchor="middle"
          />
        }
        pointerLength={0}
        renderInPortal={false}
        text={text}
      />
      <Tooltip {...props} renderInPortal={false} x={x} y={y} />
    </g>
  );
}

DonutTooltip.propTypes = {
  center: PropTypes.shape({
    x: PropTypes.number,
    y: PropTypes.number
  }),
  cornerRadius: PropTypes.number,
  datum: PropTypes.shape({}),
  highlightIndex: PropTypes.number,
  highlightStyle: PropTypes.shape({}),
  text: PropTypes.string,
  width: PropTypes.number,
  x: PropTypes.number,
  y: PropTypes.number
};

DonutTooltip.defaultProps = {
  cornerRadius: undefined,
  datum: undefined,
  highlightIndex: undefined,
  highlightStyle: undefined,
  center: undefined,
  text: undefined,
  width: undefined,
  x: undefined,
  y: undefined
};

export default DonutTooltip;
