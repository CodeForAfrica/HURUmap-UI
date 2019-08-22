import React from 'react';
import PropTypes from 'prop-types';

import { Rect } from 'victory';

import { MOBILE_WIDTH } from './ScaledArea';
import VerticalLegend from './VerticalLegend';

/**
 *
 */
function ScaledSquare({ colorScale = [], data, reference, style, ...props }) {
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

ScaledSquare.propTypes = {
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
  colorScale: undefined,
  data: undefined,
  reference: undefined,
  style: undefined
};
export default ScaledSquare;
