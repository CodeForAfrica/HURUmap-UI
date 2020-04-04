import React from 'react';
import PropTypes from 'prop-types';

import { VictoryTooltip } from 'victory';

import { labels } from './utils';
import propTypes from './propTypes';
import Label from './Label';

/**
 * VictoryLegend only uses `name` for displaying the key. This component
 * adds label recognition to legend via tooltip.
 *
 * @param {*} props .
 */
// while we need `width` for the label, we don't need it for tooltip
function LegendLabel({ width, ...props }) {
  const { colorScale, datum, index } = props;
  const { description } = datum || {};

  return (
    <g>
      <Label width={width} {...props} />
      {description && description.length ? (
        <VictoryTooltip
          {...props}
          datum={{ _x: index + 1, ...datum }}
          text={description}
          labelComponent={<Label colorScale={colorScale} />}
        />
      ) : null}
    </g>
  );
}

LegendLabel.defaultEvents = VictoryTooltip.defaultEvents;

LegendLabel.propTypes = {
  colorScale: propTypes.colorScale,
  datum: PropTypes.shape({
    description: PropTypes.string,
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
