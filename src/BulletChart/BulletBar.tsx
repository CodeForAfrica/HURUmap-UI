import React from 'react';

import { Rect, VictoryLabel, VictoryStyleObject } from 'victory';

import { ReferenceProps } from '../ReferableChart';

interface Props<T> {
  barWidth?: number;
  // Feature measure
  data: number;
  height: number;
  // Qualitative measure
  reference: ReferenceProps<number>;
  style?: VictoryStyleObject;
  // Comparative measure
  target?: number;
  width: number;
  y: number;
}

function BulletBar({
  barWidth = 5,
  data,
  reference,
  style,
  target,
  width,
  y
}: Props<number>) {
  const computedData = (width * data) / reference.data[0];
  const computedTarget = target ? (width * target) / reference.data[0] : 0;
  return (
    <React.Fragment>
      {/* Qualitative measure */}
      {reference.labels && (
        <VictoryLabel
          capHeight={0}
          lineHeight={0}
          textAnchor="end"
          x={width}
          y={y - 2 * barWidth}
          text={reference.labels[0]}
          style={
            reference.style && (reference.style.labels as React.CSSProperties)
          }
        />
      )}
      <Rect
        x={0}
        y={y - barWidth}
        width={width}
        height={barWidth}
        style={reference.style && (reference.style.data as React.CSSProperties)}
      />
      {/* Feature measure */}
      <VictoryLabel
        capHeight={0}
        lineHeight={0}
        x={0}
        y={y - 2 * barWidth}
        text={data}
        style={style as React.CSSProperties}
      />
      <Rect
        x={0}
        y={y - barWidth}
        width={computedData}
        height={barWidth}
        style={style}
      />
      {/* Comparative measure */}
      {computedTarget && (
        <Rect
          x={computedTarget}
          y={y - barWidth}
          width={barWidth}
          height={barWidth}
          style={{ fill: 'black' }}
        />
      )}
    </React.Fragment>
  );
}

export default BulletBar;
