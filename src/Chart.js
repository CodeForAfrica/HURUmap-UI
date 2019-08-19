import React from 'react';
import PropTypes from 'prop-types';

import { VictoryChart, VictoryContainer } from 'victory';

import withVictoryTheme from './styles/withVictoryTheme';

const toChartAxisProps = prop => {
  if (!prop) {
    return {};
  }

  if (prop.independent || prop.dependent) {
    return prop;
  }
  return { independent: prop, dependent: prop };
};

toChartAxisProps.propTypes = {
  prop: PropTypes.shape({
    independent: PropTypes.shape({}),
    dependent: PropTypes.shape({})
  })
};

export { toChartAxisProps };

function Chart({ children, responsive = true, ...props }) {
  return (
    <VictoryChart
      containerComponent={<VictoryContainer responsive={responsive} />}
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
  responsive: PropTypes.bool
};

Chart.defaultProps = {
  responsive: undefined
};

export default withVictoryTheme(Chart);
