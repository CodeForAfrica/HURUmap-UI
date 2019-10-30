import React, { useState } from 'react';
import PropTypes from 'prop-types';

import { Border, Selection, VictoryTooltip } from 'victory';

import propTypes from '../propTypes';
import { MOBILE_WIDTH } from './ScaledArea';
import VerticalLegend from './VerticalLegend';

/**
 *
 */
function ScaledSquare({
  formatNumberForLabel,
  colorScale = [],
  data,
  reference,
  style,
  theme,
  ...props
}) {
  const size = MOBILE_WIDTH;
  const x = 0;
  const y = 100; // Chart starts 100px from top i.e. below labels
  const {
    data: [referenceData],
    style: referenceStyle
  } = reference;
  const referenceText =
    referenceData && `${referenceData.x}: ${referenceData.y}`;
  const [tooltipProps, setTooltipProps] = useState({});
  const tooltip = <VictoryTooltip theme={theme} {...tooltipProps} />;
  const activateTooltip = (evt, { data: dataProp, ...otherProps }) => {
    if (dataProp) {
      const dataText = `${dataProp.x}: ${dataProp.y}`;
      const text = referenceText ? `${dataText}\n${referenceText}` : dataText;
      const { x: tipX, y: tipY } = Selection.getSVGEventCoordinates(evt);
      setTooltipProps({ active: true, ...otherProps, text, x: tipX, y: tipY });
    }
  };

  // NOTE: Nested square must be sorted to ensure they're all visible
  // but we need to remember original position to ensure right color is used.
  return (
    <>
      <Border
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
        .sort((a, b) => b.value.y - a.value.y)
        .map(d => {
          const scaledSide =
            d.value.y !== referenceData.y
              ? (Math.sqrt(d.value.y) * size) / Math.sqrt(referenceData.y)
              : size;

          return (
            <Border
              {...props}
              events={{
                onMouseOver: evt => activateTooltip(evt, { data: d.value }),
                onMouseMove: evt => activateTooltip(evt, { data: d.value }),
                onMouseOut: () => setTooltipProps({ active: false })
              }}
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
        theme={theme}
        formatNumberForLabel={formatNumberForLabel}
      />
      {tooltip}
    </>
  );
}

ScaledSquare.propTypes = {
  formatNumberForLabel: PropTypes.func,
  colorScale: propTypes.colorScale,
  data: propTypes.data,
  reference: propTypes.reference,
  style: PropTypes.shape({
    labels: PropTypes.shape({})
  }),
  theme: propTypes.theme
};

ScaledSquare.defaultProps = {
  formatNumberForLabel: x => x,
  colorScale: undefined,
  data: undefined,
  reference: undefined,
  style: undefined,
  theme: undefined
};
export default ScaledSquare;
