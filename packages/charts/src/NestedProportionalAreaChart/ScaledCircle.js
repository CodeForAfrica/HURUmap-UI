import React from "react";
import PropTypes from "prop-types";

import { labels } from "../utils";
import propTypes from "../propTypes";
import {
  DESKTOP_HEIGHT,
  DESKTOP_WIDTH,
  MOBILE_HEIGHT,
  MOBILE_WIDTH,
} from "./ScaledArea";
import HorizontalLegend from "./HorizontalLegend";
import PieChart from "../PieChart";
import Tooltip from "../Tooltip";
import VerticalLegend from "./VerticalLegend";

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
  theme,
  ...props
}) {
  const cx = mobile ? MOBILE_WIDTH / 2 : DESKTOP_WIDTH / 2;
  const cy = mobile ? 100 + MOBILE_WIDTH / 2 : DESKTOP_HEIGHT / 2;
  const height = mobile ? MOBILE_HEIGHT : DESKTOP_HEIGHT;
  const size = mobile ? MOBILE_WIDTH / 2 : (DESKTOP_HEIGHT - groupSpacing) / 2;
  const width = mobile ? MOBILE_WIDTH : DESKTOP_WIDTH;
  const {
    data: [referenceData],
    style: referenceStyle,
  } = reference;
  const radii = data.map((d) =>
    d.y !== referenceData.y
      ? (Math.sqrt(d.y) * size) / Math.sqrt(referenceData.y)
      : size
  );

  // When we're doing comparison, the background for both half circles
  // should be the reference data.
  const backgroundData = radii.length > 1 ? [[size], [size]] : [size];
  return (
    <>
      <PieChart
        {...props}
        data={backgroundData}
        donut={false}
        height={height}
        origin={{ x: cx, y: cy }}
        radius={size}
        standalone={false}
        style={referenceStyle}
        theme={theme}
        width={width}
      />
      {mobile ? (
        <VerticalLegend
          colorScale={colorScale}
          data={data}
          formatNumberForLabel={formatNumberForLabel}
          reference={reference}
          style={style}
          theme={theme}
        />
      ) : (
        <HorizontalLegend
          colorScale={colorScale}
          cx={cx}
          cy={cy}
          data={data}
          formatNumberForLabel={formatNumberForLabel}
          radii={radii}
          reference={reference}
          style={style}
          theme={theme}
        />
      )}
      <PieChart
        {...props}
        colorScale={colorScale}
        data={radii.map((v) => [v])}
        donut={false}
        height={height}
        labels={data.map((d) => `${labels(d)}\n${labels(referenceData)}`)}
        labelComponent={<Tooltip theme={theme} />}
        origin={{ x: cx, y: cy }}
        radii={radii}
        standalone={false}
        theme={theme}
        width={width}
      />
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
    labels: PropTypes.shape({}),
  }),
  theme: propTypes.theme,
};

ScaledCircle.defaultProps = {
  formatNumberForLabel: (x) => x,
  colorScale: undefined,
  data: undefined,
  mobile: false,
  reference: undefined,
  style: undefined,
  theme: undefined,
};

export default ScaledCircle;
