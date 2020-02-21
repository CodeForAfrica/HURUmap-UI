import React from 'react';
import PropTypes from 'prop-types';

import { VictoryTooltip } from 'victory';

import { labels } from '../utils';
import propTypes from '../propTypes';
import Label from './Label';

/**
 * VictoryLegend only uses `name` for displaying the key. This component
 * adds label recognition to legend via tooltip.
 *
 * @param {*} props .
 */
// while we need `width` for the label, we don't need it for tooltip
function LegendLabel({ width, ...props }) {
  const { colorScale, datum, index, text: textProp } = props;
  let text = textProp;
  if (datum) {
    const { tooltip } = datum;
    if (tooltip) {
      text = tooltip;
    } else if (datum.y) {
      text = labels(datum);
    }
  }

  return (
    <g>
      <Label width={width} {...props} />
      <VictoryTooltip
        {...props}
        datum={{ _x: index + 1, ...datum }}
        text={text}
        labelComponent={<Label colorScale={colorScale} />}
      />
    </g>
  );
}

LegendLabel.defaultEvents = VictoryTooltip.defaultEvents;

LegendLabel.propTypes = {
  colorScale: propTypes.colorScale,
  datum: PropTypes.shape({
    tooltip: PropTypes.string,
    y: PropTypes.number
  }),
  index: PropTypes.number,
  text: PropTypes.string,
  width: PropTypes.number
};

LegendLabel.defaultProps = {
  colorScale: undefined,
  datum: undefined,
  index: undefined,
  text: undefined,
  width: undefined
};

export default LegendLabel;
