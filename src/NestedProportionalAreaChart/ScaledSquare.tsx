import React from 'react';

import { Rect } from 'victory';

import { ReferenceProps } from '../ReferableChart';

interface Props {
  className?: string;
  clipPath?: string;
  colorScale?: string[];
  events?: React.DOMAttributes<any>;
  reference: ReferenceProps<number>;
  role?: string;
  rx?: number;
  ry?: number;
  shapeRendering?: string;
  sides?: number[];
  size?: number;
  transform?: string;
  x?: number;
  y?: number;
}

function ScaledSquare({
  colorScale = [],
  reference,
  sides = [],
  size = 0,
  ...props
}: Props) {
  const {
    data: [referenceData],
    style: referenceStyle
  } = reference;
  // Nested square must be sorted to ensure they're all visible but we need to
  // remember original position to ensure right color is used.
  return (
    <g>
      <Rect
        {...props}
        key={referenceData}
        height={size}
        style={referenceStyle && referenceStyle.data}
        width={size}
      />
      {sides
        .map((v, i) => ({ value: v, index: i }))
        .sort((a, b) => b.value - a.value)
        .map(side => {
          const scaledSide =
            referenceData && side.value !== referenceData
              ? (Math.sqrt(side.value) * size) / Math.sqrt(referenceData)
              : size;
          return (
            <Rect
              {...props}
              key={scaledSide}
              height={scaledSide}
              style={{ fill: colorScale[side.index % colorScale.length] }}
              width={scaledSide}
            />
          );
        })}
    </g>
  );
}

export default ScaledSquare;
