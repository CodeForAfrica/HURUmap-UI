import React from 'react';
import PropTypes from 'prop-types';

import { VictoryLabel } from 'victory';

import withVictoryTheme from '../styles/withVictoryTheme';
import {
  dataLabelsStyle,
  referenceDataStyle,
  referenceLabelsStyle
} from './ScaledArea';

/**
 *
 */
function HorizontalLegend({
  colorScale,
  cx,
  cy,
  data,
  radii,
  reference,
  style
}) {
  // From the designs:
  // i) Data value has 36px height and 130px width i.e. 190px from center
  // of reference circle, vertically centered with the circle,
  // ii) Data label has height of 20px, 10px below data value,
  // iii) Reference label has 48 px, aligned to the right of the charts
  // ----------------------------------------------------------------
  const {
    data: [referenceData]
  } = reference;

  return (
    <React.Fragment>
      {radii.map((r, i) => (
        <React.Fragment>
          <line
            // -1 => left; 1 => right
            x1={cx - (i < 1 ? 1 : -1) * 190}
            y1={cy}
            // 5px padding between circle and line
            x2={cx - (i < 1 ? 1 : -1) * (r + 5)}
            y2={cy}
            style={{
              stroke: colorScale[i % colorScale.length],
              strokeWidth: '2px'
            }}
          />
          <VictoryLabel
            textAnchor={i === 0 ? 'end' : 'start'}
            capHeight={0}
            lineHeight={0}
            x={cx - (i < 1 ? 1 : -1) * 200} // 190 + 10px padding
            dx={0}
            y={cy}
            dy={18} // 36 / 2 since we want data value vertical centered
            text={data[i].x}
            style={dataLabelsStyle(i, colorScale, style)}
          />
          {data[i].label && (
            <VictoryLabel
              textAnchor={i === 0 ? 'end' : 'start'}
              capHeight={0}
              lineHeight={0}
              x={cx - (i < 1 ? 1 : -1) * 200} // 190 + 10
              dx={0}
              y={cy + 18} // 36 / 2 is the bottom half of data value
              // 10px top padding from data value + label has height of 20px
              dy={10 + 20}
              style={style && style.labels}
              text={data[i].label}
            />
          )}
        </React.Fragment>
      ))}

      <VictoryLabel
        capHeight={0}
        lineHeight={0}
        x={cx + 200}
        y={2 * cy - 24}
        text={referenceData.x}
        style={referenceDataStyle(reference)}
      />
      {referenceData.label && (
        <VictoryLabel
          capHeight={0}
          lineHeight={0}
          x={cx + 200}
          y={2 * cy}
          text={referenceData.label}
          style={referenceLabelsStyle(reference)}
        />
      )}
    </React.Fragment>
  );
}

HorizontalLegend.propTypes = {
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
  cx: PropTypes.number.isRequired,
  cy: PropTypes.number.isRequired,
  radii: PropTypes.arrayOf(PropTypes.number),
  reference: PropTypes.shape({
    data: PropTypes.arrayOf(
      PropTypes.shape({
        x: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
        label: PropTypes.oneOfType([PropTypes.number, PropTypes.string])
      })
    )
  }),
  style: PropTypes.shape({
    labels: PropTypes.shape({})
  })
};

HorizontalLegend.defaultProps = {
  colorScale: undefined,
  data: undefined,
  radii: undefined,
  reference: undefined,
  style: undefined
};

export default withVictoryTheme(HorizontalLegend);
