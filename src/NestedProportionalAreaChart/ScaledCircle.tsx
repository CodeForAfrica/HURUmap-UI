import React, { Fragment } from 'react';

import PieChart, { PieChartProps } from '../PieChart';

interface Props extends PieChartProps {
  cx?: number;
  cy?: number;
  radii?: number[];
  size?: number;
  transform?: string;
  relativeTo?: number;
}

function ScaledCircle({
  colorScale = [],
  cx,
  cy,
  radii = [],
  relativeTo,
  size = 0,
  ...props
}: Props) {
  const scaledRs = radii.map(r =>
    relativeTo && r !== relativeTo
      ? (Math.sqrt(r) * size) / Math.sqrt(relativeTo)
      : size
  );

  // When we're doing comparison, the background for both half circles
  // should be the total data.
  const backgroundData =
    scaledRs.length > 2 ? [[scaledRs[0]], [scaledRs[0]]] : [scaledRs[0]];
  return (
    <Fragment>
      <PieChart
        colorScale={(colorScale as string[]).slice(0, 1)}
        data={backgroundData}
        radius={scaledRs[0]}
        standalone={false}
        origin={{ x: cx, y: cy }}
        {...props}
      />
      <PieChart
        colorScale={(colorScale as string[]).slice(1)}
        data={scaledRs.slice(1).map(v => [v])}
        radii={scaledRs.slice(1)}
        standalone={false}
        origin={{ x: cx, y: cy }}
        {...props}
      />
    </Fragment>
  );
}

export default ScaledCircle;
