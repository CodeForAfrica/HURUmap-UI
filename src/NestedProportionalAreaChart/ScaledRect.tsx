import React from 'react';
import { Rect, RectProps } from 'victory';

interface Props extends RectProps {
  relativeTo?: number;
  size?: number;
}

function ScaledRect({ height = 0, relativeTo, size = 0, ...props }: Props) {
  const scaledSide = relativeTo ? (height * size) / relativeTo : height;
  return <Rect {...props} width={scaledSide} height={scaledSide} />;
}

export default ScaledRect;
