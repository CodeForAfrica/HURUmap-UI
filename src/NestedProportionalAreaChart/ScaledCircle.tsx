import React from 'react';

import PieChart, { PieChartProps } from '../PieChart';
import { ReferenceProps } from '../ReferableChart';

interface Props extends PieChartProps {
  cx?: number;
  cy?: number;
  radii?: number[];
  size?: number;
  transform?: string;
  reference: ReferenceProps<number>;
}

function ScaledCircle({
  colorScale = [],
  cx,
  cy,
  radii = [],
  reference,
  size = 0,
  ...props
}: Props) {
  const {
    data: [referenceData],
    style: referenceStyle
  } = reference;

  const scaledRs = radii.map(r =>
    referenceData && r !== referenceData
      ? (Math.sqrt(r) * size) / Math.sqrt(referenceData)
      : size
  );

  // When we're doing comparison, the background for both half circles
  // should be the total data.
  const backgroundData = scaledRs.length > 1 ? [[size], [size]] : [size];
  return (
    <React.Fragment>
      <PieChart
        data={backgroundData}
        radius={size}
        standalone={false}
        origin={{ x: cx, y: cy }}
        {...props}
        style={referenceStyle}
      />
      <PieChart
        colorScale={colorScale}
        data={scaledRs.map(v => [v])}
        radii={scaledRs}
        standalone={false}
        origin={{ x: cx, y: cy }}
        {...props}
      />
    </React.Fragment>
  );
}

export default ScaledCircle;
