import React from 'react';
import PropTypes from 'prop-types';

import propTypes from '../propTypes';
import {
  DESKTOP_HEIGHT,
  DESKTOP_WIDTH,
  MOBILE_HEIGHT,
  MOBILE_WIDTH
} from './ScaledArea';
import HorizontalLegend from './HorizontalLegend';
import PieChart from '../PieChart';
import Tooltip from '../Tooltip';
import VerticalLegend from './VerticalLegend';

/**
 *
 */
function ScaledCircle({
  formatNumberForLabel,
  colorScale = [],
  data,
  groupSpacing,
  mobile,
  reference,
  style,
  ...props
}) {
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
    <>
      <PieChart
        data={backgroundData}
        donut={false}
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
        donut={false}
        labelComponent={<Tooltip />}
        labels={data.map(
          d => `${d.y}: ${d.x}\n${referenceData.y}: ${referenceData.x}`
        )}
      />
      {mobile ? (
        <VerticalLegend
          data={data}
          colorScale={colorScale}
          reference={reference}
          style={style}
          formatNumberForLabel={formatNumberForLabel}
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
          formatNumberForLabel={formatNumberForLabel}
        />
      )}
    </>
  );
}

ScaledCircle.propTypes = {
  formatNumberForLabel: PropTypes.func,
  colorScale: propTypes.colorScale,
  data: propTypes.data,
  groupSpacing: PropTypes.number.isRequired,
  mobile: PropTypes.bool,
  reference: propTypes.reference,
  style: PropTypes.shape({
    labels: PropTypes.shape({})
  })
};

ScaledCircle.defaultProps = {
  formatNumberForLabel: x => x,
  colorScale: undefined,
  data: undefined,
  mobile: false,
  reference: undefined,
  style: undefined
};

export default ScaledCircle;
