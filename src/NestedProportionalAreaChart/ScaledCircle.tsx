import React from 'react';
import { Circle, VictoryStyleObject } from 'victory';

import PieChart from '../PieChart';

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
  cx,
  cy,
  radii = [],
  relativeTo,
  size = 0,
  style,
  ...props
}: Props) {
  return (
    <React.Fragment>
      <g>
        {radii
          .sort((a, b) => b - a)
          .map((r, i) => {
            const scaledR = relativeTo ? (r * size) / relativeTo : r;
            return (
              <Circle
                cx={cx}
                cy={cy}
                {...props}
                r={scaledR}
                style={typeof style === 'function' ? style(i) : style}
              />
            );
          })}
      </g>
      <PieChart standalone={false} data={[1]} origin={{ x: cx, y: cy }} />
    </React.Fragment>
  );
}

export default ScaledCircle;
