import React, { useState } from 'react';
import PropTypes from 'prop-types';

import { Border, Selection, VictoryTooltip } from 'victory';

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
  ...props
}) {
  const size = MOBILE_WIDTH;
  const x = 0;
  const y = 100; // Chart starts 100px from top i.e. below labels
  const {
    data: [referenceData],
    style: referenceStyle
  } = reference;
  const [status, setStatus] = useState({});
  const statusTooltip = <VictoryTooltip constrainToVisibleArea {...status} />;

  const activateTooltip = (evt, text) => {
    const { x: tipX, y: tipY } = Selection.getSVGEventCoordinates(evt);
    setStatus({ active: true, text, x: tipX, y: tipY });
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
        .sort((a, b) => b.value.x - a.value.x)
        .map(d => {
          const scaledSide =
            d.value.x !== referenceData.x
              ? (Math.sqrt(d.value.x) * size) / Math.sqrt(referenceData.x)
              : size;

          return (
            <Border
              {...props}
              events={{
                onMouseOver: evt =>
                  activateTooltip(evt, `${d.value.y}: ${d.value.x}`),
                onMouseMove: evt =>
                  activateTooltip(evt, `${d.value.y}: ${d.value.x}`),
                onMouseOut: () => setStatus({ active: false })
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
        formatNumberForLabel={formatNumberForLabel}
      />
      {statusTooltip}
    </>
  );
}

ScaledSquare.propTypes = {
  formatNumberForLabel: PropTypes.func,
  colorScale: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.arrayOf(
      PropTypes.shape({
        x: PropTypes.oneOfType([PropTypes.number, PropTypes.string])
      })
    )
  ]),
  data: PropTypes.arrayOf(
    PropTypes.shape({
      x: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
      label: PropTypes.oneOfType([PropTypes.number, PropTypes.string])
    })
  ),
  reference: PropTypes.shape({
    data: PropTypes.arrayOf(PropTypes.shape({})),
    style: PropTypes.arrayOf(PropTypes.shape({}))
  }),
  style: PropTypes.shape({
    labels: PropTypes.shape({})
  })
};

ScaledSquare.defaultProps = {
  formatNumberForLabel: x => x,
  colorScale: undefined,
  data: undefined,
  reference: undefined,
  style: undefined
};
export default ScaledSquare;
