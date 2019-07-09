import React from 'react';
import { Circle, CircleProps } from 'victory';

interface Props extends CircleProps {
  relativeTo?: number;
  size?: number;
}

function ScaledCircle({ r = 0, relativeTo, size = 0, ...props }: Props) {
  const scaledR = relativeTo ? (r * size) / relativeTo : r;
  return <Circle {...props} r={scaledR} />;
}

export default ScaledCircle;
