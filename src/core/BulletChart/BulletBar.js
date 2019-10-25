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
  total,
  width,
  x,
  y
}) {
  const featuredMeasure = (width * data[0].x) / total;
  const [featureMeasureStatus, setFeatureMeasureStatus] = useState({});
  const featureMeasureTooltip = (
    <VictoryTooltip
      pointerLength={0}
      flyoutStyle={{ fill: '#fff' }}
      constrainToVisibleArea
      {...featureMeasureStatus}
      text={labels(data[0])}
    />
  );
  const [, qualitativeMeasure] = data;
  const [qualitativeMeasureStatus, setQualitativeMeasureStatus] = useState({});
  const qualitativeMeasureTooltip = qualitativeMeasure && (
    <VictoryTooltip
      pointerLength={0}
      constrainToVisibleArea
      {...qualitativeMeasureStatus}
      text={labels(qualitativeMeasure)}
    />
  );
  const comparativeMeasure = (width * reference.data[0].x) / total;
  const activateStatus = (setStatus, evt) => {
    const { x: tipX, y: tipY } = Selection.getSVGEventCoordinates(evt);
    setStatus({ active: true, x: tipX, y: tipY });
  };

  return (
    <>
      {/* Qualitative scale */}
      {qualitativeMeasure && (
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
        events={{
          onMouseOver: evt => activateStatus(setQualitativeMeasureStatus, evt),
          onMouseMove: evt => activateStatus(setQualitativeMeasureStatus, evt),
          onMouseOut: () => setQualitativeMeasureStatus({ active: false })
        }}
        x={x}
        y={y - barWidth}
        width={width}
        height={barWidth}
        style={style.labels}
      />
      {qualitativeMeasureTooltip}
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
          onMouseOver: evt => activateStatus(setFeatureMeasureStatus, evt),
          onMouseMove: evt => activateStatus(setFeatureMeasureStatus, evt),
          onMouseOut: () => setFeatureMeasureStatus({ active: false })
        }}
        x={x}
        y={y - barWidth}
        width={featuredMeasure}
        height={barWidth}
        style={style.data}
      />
      {featureMeasureTooltip}
      {/* Comparative measure */}
      <Rect
        x={x + comparativeMeasure}
        y={y - barWidth}
        width={barWidth}
        height={barWidth}
        style={reference.style && reference.style.data}
      />
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
  total: PropTypes.number.isRequired,
  width: PropTypes.number,
  x: PropTypes.number,
  y: PropTypes.number
};

BulletBar.defaultProps = {
  barWidth: undefined,
  reference: undefined,
  style: undefined,
  width: undefined,
  x: undefined,
  y: undefined
};

export default BulletBar;
