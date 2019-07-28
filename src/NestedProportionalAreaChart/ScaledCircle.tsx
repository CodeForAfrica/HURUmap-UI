import React from 'react';

import {
  DESKTOP_HEIGHT,
  DESKTOP_WIDTH,
  MOBILE_HEIGHT,
  MOBILE_WIDTH,
  ScaledAreaProps
} from './ScaledArea';
import HorizontalLegend from './HorizontalLegend';
import PieChart, { PieChartProps } from '../PieChart';
import VerticalLegend from './VerticalLegend';

type P = Pick<
  PieChartProps,
  Exclude<keyof PieChartProps, 'colorScale' | 'data' | 'style'>
>;

interface Props extends P, ScaledAreaProps {
  groupSpacing: number;
  mobile?: boolean;
}

/**
 *
 */
function ScaledCircle({
  colorScale = [],
  data,
  groupSpacing,
  mobile = false,
  reference,
  style,
  ...props
}: Props) {
  const cx = mobile ? MOBILE_WIDTH / 2 : DESKTOP_WIDTH / 2;
  const cy = mobile ? 100 + MOBILE_WIDTH / 2 : DESKTOP_HEIGHT / 2;
  const height = mobile ? MOBILE_HEIGHT : DESKTOP_HEIGHT;
  const size = mobile ? MOBILE_WIDTH / 2 : (DESKTOP_HEIGHT - groupSpacing) / 2;
  const width = mobile ? MOBILE_WIDTH : DESKTOP_WIDTH;
  const {
    data: [referenceData],
    style: referenceStyle
  } = reference;
  const radii = data.map(d =>
    d.x !== referenceData.x
      ? (Math.sqrt(d.x) * size) / Math.sqrt(referenceData.x)
      : size
  );

  // When we're doing comparison, the background for both half circles
  // should be the reference data.
  const backgroundData = radii.length > 1 ? [[size], [size]] : [size];
  return (
    <React.Fragment>
      <PieChart
        data={backgroundData}
        height={height}
        origin={{ x: cx, y: cy }}
        radius={size}
        standalone={false}
        width={width}
        {...props}
        style={referenceStyle}
      />
      <PieChart
        colorScale={colorScale}
        height={height}
        data={radii.map(v => [v])}
        origin={{ x: cx, y: cy }}
        radii={radii}
        standalone={false}
        width={width}
        {...props}
      />
      {mobile ? (
        <VerticalLegend
          data={data}
          colorScale={colorScale}
          reference={reference}
          style={style}
        />
      ) : (
        <HorizontalLegend
          data={data}
          radii={radii}
          colorScale={colorScale}
          style={style}
          reference={reference}
          cx={cx}
          cy={cy}
        />
      )}
    </React.Fragment>
  );
}

export default ScaledCircle;
