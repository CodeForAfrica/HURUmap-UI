import React from 'react';
import { Circle, VictoryStyleObject } from 'victory';

interface Props {
  className?: string;
  clipPath?: string;
  cx?: number;
  cy?: number;
  events?: React.DOMAttributes<any>;
  radii?: number[];
  role?: string;
  shapeRendering?: string;
  size?: number;
  style?: VictoryStyleObject | ((i: number) => VictoryStyleObject | undefined);
  transform?: string;
  relativeTo?: number;
}

function ScaledCircle({
  radii = [],
  relativeTo,
  size = 0,
  style,
  ...props
}: Props) {
  return (
    <g>
      {radii
        .sort((a, b) => b - a)
        .map((r, i) => {
          const scaledR = relativeTo ? (r * size) / relativeTo : r;
          return (
            <Circle
              {...props}
              r={scaledR}
              style={typeof style === 'function' ? style(i) : style}
            />
          );
        })}
    </g>
  );
}

export default ScaledCircle;
