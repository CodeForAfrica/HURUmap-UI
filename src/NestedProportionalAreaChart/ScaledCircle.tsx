import React from 'react';
import { VictoryPieProps } from 'victory';

import PieChart from '../PieChart';

interface Props extends VictoryPieProps {
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
  const scaledRs = radii.map(r => (relativeTo ? (r * size) / relativeTo : r));

  // When we're doing comparison, the background for both half circles
  // should be the total data.
  const backgroundData =
    scaledRs.length > 2 ? [[scaledRs[0]], [scaledRs[0]]] : [scaledRs[0]];
  return (
    <React.Fragment>
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
    </React.Fragment>
  );
}

export default ScaledCircle;
