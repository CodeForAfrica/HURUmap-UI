import React, { useEffect, useRef, SVGAttributes } from 'react';

import { VictoryLabelProps } from 'victory';

import wrapSVGText from './wrapSVGText';

interface Props extends VictoryLabelProps {
  width: number;
}

function WrapLabel({ width, text, x, y, style, transform, textAnchor }: Props) {
  const ref = useRef<SVGTextElement | null>();

  useEffect(() => {
    if (ref.current) {
      wrapSVGText(ref.current, text as string, width);
    }
  }, [text, width, x]);

  const uniqueId =
    Math.random()
      .toString(36)
      .substring(2) + Date.now().toString(36);

  return (
    <text
      key={uniqueId}
      ref={node => {
        ref.current = node;
      }}
      x={x}
      y={y}
      style={style}
      transform={transform as string}
      textAnchor={textAnchor as SVGAttributes<SVGElement>['textAnchor']}
    />
  );
}

export default WrapLabel;
