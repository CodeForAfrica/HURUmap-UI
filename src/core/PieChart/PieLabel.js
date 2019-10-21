import React from 'react';
import PropTypes from 'prop-types';

import withVictoryTheme from '../styles/withVictoryTheme';
import Label from '../Label';

function PieLabel({
  highlightIndex,
  highlightStyle,
  style: originalStyle,
  text,
  ...props
}) {
  let style = originalStyle;
  if (text && Number.isInteger(highlightIndex) && highlightStyle) {
    style = text.split('\n').map(() => ({ ...originalStyle }));
    if (highlightIndex < style.length) {
      style[highlightIndex] = { ...highlightStyle, ...style[highlightIndex] };
    }
  }
  return <Label style={style} text={text} {...props} />;
}

PieLabel.propTypes = {
  highlightIndex: PropTypes.number,
  highlightStyle: PropTypes.shape({}),
  style: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.shape({})),
    PropTypes.shape({})
  ]),
  text: PropTypes.string
};

PieLabel.defaultProps = {
  highlightIndex: 1,
  highlightStyle: { fontWeight: 'bold' },
  style: undefined,
  text: undefined
};

export default withVictoryTheme(PieLabel);
