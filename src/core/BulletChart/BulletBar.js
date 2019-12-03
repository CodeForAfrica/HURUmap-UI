import React, { useState } from 'react';
import PropTypes from 'prop-types';

import { Border, Rect, Selection, VictoryLabel, VictoryTooltip } from 'victory';

import propTypes from '../propTypes';

function BulletBar({
  barWidth,
  data,
  labels,
  reference,
  style = {},
  theme,
  total,
  width,
  x,
  y
}) {
  const featuredMeasure = (width * data[0].y) / total;
  const [tooltipProps, setTooltipProps] = useState({});
  const [, qualitativeMeasureProp] = data;
  const qualitativeMeasure = qualitativeMeasureProp || { y: total };
  const comparativeMeasure = (width * reference.data[0].y) / total;

  const tooltip = (
    <VictoryTooltip constrainToVisibleArea {...tooltipProps} theme={theme} />
  );
  const activateTooltip = (evt, newTooltipProps) => {
    if (newTooltipProps && newTooltipProps.text) {
      const { x: tipX, y: tipY } = Selection.getSVGEventCoordinates(evt);
      setTooltipProps({ active: true, ...newTooltipProps, x: tipX, y: tipY });
    }
  };

  return (
    <>
      {/* Qualitative scale */}
      {qualitativeMeasureProp && (
        <VictoryLabel
          capHeight={0}
          lineHeight={0}
          textAnchor="end"
          x={x + width}
          y={y - 2 * barWidth}
          text={labels(qualitativeMeasure)}
          style={style.labels}
        />
      )}
      <Border
        events={
          qualitativeMeasureProp && {
            onMouseOver: evt =>
              activateTooltip(evt, {
                text: labels(qualitativeMeasure)
              }),
            onMouseMove: evt =>
              activateTooltip(evt, {
                text: labels(qualitativeMeasure)
              }),
            onMouseOut: () => setTooltipProps({ active: false })
          }
        }
        x={x}
        y={y - barWidth}
        width={width}
        height={barWidth}
        style={style.labels}
      />
      {/* Feature measure */}
      <VictoryLabel
        capHeight={0}
        lineHeight={0}
        x={x}
        y={y - 2 * barWidth}
        text={labels(data[0])}
        style={style.data}
      />
      <Border
        events={{
          onMouseOver: evt =>
            activateTooltip(evt, {
              text: labels(data[0])
            }),
          onMouseMove: evt =>
            activateTooltip(evt, {
              text: labels(data[0])
            }),
          onMouseOut: () => setTooltipProps({ active: false })
        }}
        x={x}
        y={y - barWidth}
        width={featuredMeasure}
        height={barWidth}
        style={style.data}
      />
      {/* Comparative measure / Target */}
      <Rect
        x={x + comparativeMeasure}
        y={y - barWidth}
        width={barWidth}
        height={barWidth}
        style={reference.style && reference.style.data}
      />
      {tooltip}
    </>
  );
}

BulletBar.propTypes = {
  data: propTypes.data.isRequired,
  barWidth: PropTypes.number,
  labels: PropTypes.func.isRequired,
  reference: propTypes.reference,
  style: PropTypes.shape({
    data: PropTypes.shape({}),
    labels: PropTypes.shape({})
  }),
  theme: propTypes.theme,
  total: PropTypes.number.isRequired,
  width: PropTypes.number,
  x: PropTypes.number,
  y: PropTypes.number
};

BulletBar.defaultProps = {
  barWidth: undefined,
  reference: undefined,
  style: undefined,
  theme: undefined,
  width: undefined,
  x: undefined,
  y: undefined
};

export default BulletBar;
