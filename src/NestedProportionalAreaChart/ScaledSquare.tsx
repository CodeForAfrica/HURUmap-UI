import React from 'react';
import { Rect, VictoryStyleObject } from 'victory';

interface Props {
  className?: string;
  clipPath?: string;
  events?: React.DOMAttributes<any>;
  role?: string;
  rx?: number;
  ry?: number;
  shapeRendering?: string;
  sides?: number[];
  size?: number;
  style?: VictoryStyleObject | ((i: number) => VictoryStyleObject | undefined);
  transform?: string;
  x?: number;
  y?: number;
  relativeTo?: number;
}

function ScaledSquare({
  sides = [],
  relativeTo,
  size = 0,
  style,
  ...props
}: Props) {
  return (
    <g>
      {sides
        .sort((a, b) => b - a)
        .map((side, i) => {
          const scaledSide = relativeTo ? (side * size) / relativeTo : side;
          return (
            <Rect
              {...props}
              width={scaledSide}
              height={scaledSide}
              style={typeof style === 'function' ? style(i) : style}
            />
          );
        })}
    </g>
  );
}

export default ScaledSquare;
