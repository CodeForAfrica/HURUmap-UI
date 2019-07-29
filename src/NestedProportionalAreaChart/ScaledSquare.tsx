import React from 'react';

import { Rect } from 'victory';

import { ScaledAreaProps, MOBILE_WIDTH } from './ScaledArea';
import VerticalLegend from './VerticalLegend';

interface Props extends ScaledAreaProps {
  className?: string;
  clipPath?: string;
  events?: React.DOMAttributes<React.ElementType>;
  role?: string;
  rx?: number;
  ry?: number;
  shapeRendering?: string;
  transform?: string;
  x?: number;
  y?: number;
}

/**
 *
 */
function ScaledSquare({
  colorScale = [],
  data,
  reference,
  style,
  ...props
}: Props) {
  const size = MOBILE_WIDTH;
  const x = 0;
  const y = 100; // Chart starts 100px from top i.e. below labels
  const {
    data: [referenceData],
    style: referenceStyle
  } = reference;

  // NOTE: Nested square must be sorted to ensure they're all visible
  // but we need to remember original position to ensure right color is used.
  return (
    <React.Fragment>
      <Rect
        {...props}
        key={referenceData.x}
        height={size}
        style={referenceStyle && referenceStyle.data}
        width={size}
        x={x}
        y={y}
      />
      {data
        .map((v, i) => ({ value: v, index: i }))
        .sort((a, b) => b.value.x - a.value.x)
        .map(d => {
          const scaledSide =
            d.value.x !== referenceData.x
              ? (Math.sqrt(d.value.x) * size) / Math.sqrt(referenceData.x)
              : size;
          return (
            <Rect
              {...props}
              key={scaledSide}
              height={scaledSide}
              style={{ fill: colorScale[d.index % colorScale.length] }}
              width={scaledSide}
              x={x}
              y={y}
            />
          );
        })}
      <VerticalLegend
        data={data}
        colorScale={colorScale}
        reference={reference}
        style={style}
      />
    </React.Fragment>
  );
}

export default ScaledSquare;
