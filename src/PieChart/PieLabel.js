import React from 'react';
import PropTypes from 'prop-types';

import withVictoryTheme from '../styles/withVictoryTheme';
import Label from '../Label';

function PieLabel({
  colorScale = [],
  datum = { _x: 1 },
  style: originalStyle,
  ...props
}) {
  const style = Array.isArray(colorScale)
    ? Object.assign(
        {},
        {
          // eslint-disable-next-line no-underscore-dangle
          fill: colorScale[(datum._x - 1) % colorScale.length]
        },
        originalStyle
      )
    : originalStyle;

  return <Label style={style} {...props} />;
}

PieLabel.propTypes = {
  colorScale: PropTypes.arrayOf(PropTypes.shape({})),
  // TODO(kilemensi): Seems like datum has _x variable that tracks the
  //                  data index (but it starts from 1).
  datum: PropTypes.shape({ _x: PropTypes.number }),
  style: PropTypes.shape({})
};

PieLabel.defaultProps = {
  colorScale: undefined,
  datum: undefined,
  style: undefined
};

export default withVictoryTheme(PieLabel);
