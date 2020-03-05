import React from 'react';
import PropTypes from 'prop-types';

import { VictoryChart, VictoryContainer } from 'victory';

import withVictoryTheme from './styles/withVictoryTheme';
import propTypes from './propTypes';

export const toChartAxisProps = prop => {
  if (!prop) {
    return {};
  }

  if (prop.independent || prop.dependent) {
    return prop;
  }
  return { independent: prop, dependent: prop };
};

function Chart({
  children,
  overflow,
  responsive = true,
  events: e,
  theme,
  ...props
}) {
  // `events`, `height` and `width` are the only props passed to the
  // chart container SVG, `style` isn't.
  // https://github.com/FormidableLabs/victory/blob/c0bff5240ce25d51a6fb6b9db091a2c27e0f5903/packages/victory-core/src/victory-container/victory-container.js#L118-L159
  const events = { overflow, ...e };
  return (
    <VictoryChart
      containerComponent={
        <VictoryContainer
          events={events}
          responsive={responsive}
          style={{ height: 'auto' }}
        />
      }
      theme={theme}
      {...props}
    >
      {children}
    </VictoryChart>
  );
}

Chart.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ]).isRequired,
  events: PropTypes.shape({}),
  overflow: PropTypes.oneOf(['auto', 'hidden', 'scroll', 'visible']),
  responsive: PropTypes.bool,
  theme: propTypes.theme.isRequired
};

Chart.defaultProps = {
  events: undefined,
  overflow: 'visible',
  responsive: undefined
};

export default withVictoryTheme(Chart);
