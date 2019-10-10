import React from 'react';
import PropTypes from 'prop-types';

import { Rect, VictoryLabel } from 'victory';

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
  const [, qualitativeMeasure] = data;
  const comparativeMeasure = (width * reference.data[0].x) / total;

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
      <Rect
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
      <Rect
        x={x}
        y={y - barWidth}
        width={featuredMeasure}
        height={barWidth}
        style={style.data}
      />
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
  data: PropTypes.arrayOf(PropTypes.shape({ x: PropTypes.number })).isRequired,
  barWidth: PropTypes.number,
  labels: PropTypes.func.isRequired,
  reference: PropTypes.oneOfType([
    PropTypes.arrayOf(
      PropTypes.shape({
        data: PropTypes.shape({})
      })
    ),
    PropTypes.shape({
      data: PropTypes.shape({})
    })
  ]),
  style: PropTypes.shape({
    data: PropTypes.shape({}),
    labels: PropTypes.shape({})
  }),
  theme: PropTypes.shape({
    group: PropTypes.shape({})
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
  theme: undefined,
  width: undefined,
  x: undefined,
  y: undefined
};

export default BulletBar;
