import React from 'react';

import { VictoryLegend } from 'victory';
import LegendLabel from './LegendLabel';
import propTypes from './propTypes';
import LegendPoint from './LegendPoint';
import withVictoryTheme from './styles/withVictoryTheme';

function Legend({ theme, colorScale, ...props }) {
  const { x, labelWidth } = props;
  return (
    <VictoryLegend
      theme={theme}
      name="legend"
      dataComponent={<LegendPoint posX={x} labelWidth={labelWidth} />}
      labelComponent={
        <LegendLabel colorScale={colorScale} width={labelWidth} posX={x} />
      }
      standalone={false}
      {...props}
    />
  );
}

Legend.propTypes = {
  x: propTypes.number,
  labelWidth: propTypes.number.isRequired,
  theme: propTypes.theme,
  colorScale: propTypes.oneOfType([
    propTypes.string,
    propTypes.arrayOf(propTypes.string)
  ]).isRequired,
  isComparison: propTypes.bool
};

Legend.defaultProps = {
  theme: undefined,
  x: undefined,
  isComparison: false
};

export default withVictoryTheme(Legend);
