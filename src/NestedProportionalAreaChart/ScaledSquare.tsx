import React from 'react';
import { Rect } from 'victory';

interface Props {
  className?: string;
  clipPath?: string;
  colorScale?: string[];
  events?: React.DOMAttributes<any>;
  role?: string;
  rx?: number;
  ry?: number;
  shapeRendering?: string;
  sides?: number[];
  size?: number;
  transform?: string;
  x?: number;
  y?: number;
  relativeTo?: number;
}

function ScaledSquare({
  colorScale = [],
  relativeTo,
  sides = [],
  size = 0,
  ...props
}: Props) {
  // Nested square must be sorted to ensure they're all visible
  return (
    <g>
      {sides
        .sort((a, b) => b - a)
        .map((side, i) => {
          const scaledSide = relativeTo ? (side * size) / relativeTo : side;
          return (
            <Rect
              {...props}
              key={scaledSide}
              height={scaledSide}
              style={{ fill: colorScale[i % colorScale.length] }}
              width={scaledSide}
            />
          );
        })}
    </g>
  );
}

export default ScaledSquare;
