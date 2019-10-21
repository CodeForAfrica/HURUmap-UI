import React from 'react';
import PropTypes from 'prop-types';

import withVictoryTheme from '../styles/withVictoryTheme';
import Label from '../Label';
import propTypes from '../propTypes';

function PieLabel({
  // colorScale = [],
  // datum = { _x: 1 },
  style: originalStyle,
  text,
  ...props
}) {
  // const style = Array.isArray(colorScale)
  //   ? {
  //       // eslint-disable-next-line no-underscore-dangle
  //       fill: colorScale[(datum._x - 1) % colorScale.length],
  //       ...originalStyle
  //     }
  //   : originalStyle;
  const style =
    originalStyle &&
    (Array.isArray(originalStyle) ? originalStyle : [originalStyle]);
  if (text && text.includes('\n')) {
    if (style.length === 1) {
      style.push(style[0]);
    }
    style[0] = { fontWeight: 'bold', ...style[0] };
  }
  return <Label style={style} text={text} {...props} />;
}

PieLabel.propTypes = {
  colorScale: propTypes.colorScale,
  // TODO(kilemensi): Seems like datum has _x variable that tracks the
  //                  data index (but it starts from 1).
  datum: PropTypes.shape({ _x: PropTypes.number }),
  style: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.shape({})),
    PropTypes.shape({})
  ]),
  text: PropTypes.string
};

PieLabel.defaultProps = {
  colorScale: undefined,
  datum: undefined,
  style: undefined,
  text: undefined
};

export default withVictoryTheme(PieLabel);
