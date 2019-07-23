import React from 'react';

import { Rect, VictoryLabel, VictoryStyleInterface } from 'victory';

import { ReferenceProps } from '../ReferableChart';

export interface BulletData {
  x: number;
  label?: string;
}

interface Props<T> {
  barWidth: number;
  // Feature measure
  data: T[];
  labels: { (data: T): string };
  // Comparative measure
  reference: ReferenceProps<T>;
  // Quantitative scale
  total: number;
  style?: VictoryStyleInterface;
  width: number;
  x: number;
  y: number;
}

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
}: Props<BulletData>) {
  const featuredMeasure = (width * data[0].x) / total;
  const [, qualitativeMeasure] = data;
  const comparativeMeasure = (width * reference.data[0].x) / total;

  return (
    <React.Fragment>
      {/* Qualitative scale */}
      {qualitativeMeasure && (
        <VictoryLabel
          capHeight={0}
          lineHeight={0}
          textAnchor="end"
          x={x + width}
          y={y - 2 * barWidth}
          text={labels(qualitativeMeasure)}
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
        text={labels(data[0])}
        style={style.data as React.CSSProperties}
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
