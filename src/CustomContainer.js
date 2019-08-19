import React from 'react';
import PropTypes from 'prop-types';

/**
 * Simple custom container similar to VictoryContainer that should be used with
 * components that don't work with VictoryChart i.e. those that don't need
 * Cartesian or polar axes.
 */
function CustomContainer({
  children,
  height,
  responsive,
  standalone,
  style,
  width
}) {
  if (!standalone) {
    return children;
  }

  const dimensions = responsive
    ? { width: '100%', height: 'auto' }
    : { width, height };
  const divStyle = Object.assign(
    { pointerEvents: 'none', touchAction: 'none', position: 'relative' },
    dimensions
  );
  const svgProps = Object.assign({
    width,
    height,
    role: 'img',
    viewBox: responsive ? `0 0 ${width} ${height}` : undefined
  });
  // Overflow visible will allow tooltips to not be cut off
  const svgStyle = Object.assign(
    { pointerEvents: 'all', overflow: 'visible' },
    dimensions
  );

  return (
    <div style={Object.assign({}, style, divStyle)}>
      <svg {...svgProps} style={svgStyle}>
        {children}
      </svg>
    </div>
  );
}

CustomContainer.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ]).isRequired,
  height: PropTypes.number,
  responsive: PropTypes.bool,
  standalone: PropTypes.bool,
  style: PropTypes.shape({}),
  width: PropTypes.number
};

CustomContainer.defaultProps = {
  height: undefined,
  responsive: true,
  standalone: true,
  style: undefined,
  width: undefined
};

export default CustomContainer;
