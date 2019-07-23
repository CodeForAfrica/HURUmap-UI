import React from 'react';

import { Rect, VictoryLabel, VictoryStyleInterface } from 'victory';

import { ReferenceProps } from '../ReferableChart';

interface Props<T> {
  barWidth?: number;
  // Feature measure & qualitative measure
  data: number[];
  height: number;
  // Comparative measure
  reference: ReferenceProps<number>;
  style?: VictoryStyleInterface;
  width: number;
  x: number;
  y: number;
}

function BulletBar({
  barWidth = 5,
  data,
  reference,
  style = {},
  width,
  x,
  y
}: Props<number>) {
  // Assume numbers are percentage & no total provided & both data[0] and
  // reference are <= 100
  let total = 100;
  if (data.length > 1) {
    [, total] = data; // second element is total
  } else if (data[0] > 100 || reference.data[0] > 100) {
    total = data[0] + Math.max(data[0], reference.data[0]);
  }
  const qualitativeMeasure = total - data[0];
  const featuredMeasure = (width * data[0]) / total;
  const comparativeMeasure = (width * reference.data[0]) / total;
  return (
    <React.Fragment>
      {/* Qualitative measure */}
      {reference.labels && (
        <VictoryLabel
          capHeight={0}
          lineHeight={0}
          textAnchor="end"
          x={x + width}
          y={y - 2 * barWidth}
          text={qualitativeMeasure}
          style={style.labels as React.CSSProperties}
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
        text={data[0]}
        style={style.labels as React.CSSProperties}
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
        style={reference.style && (reference.style.data as React.CSSProperties)}
      />
    </React.Fragment>
  );
}

export default BulletBar;
