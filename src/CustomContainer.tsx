import React from 'react';

export interface CustomContainerProps {
  standalone?: boolean;
  height?: number;
  responsive?: boolean;
  style?: React.CSSProperties;
  width?: number;
  children?: any;
}

/**
 * Simple custom container similar to VictoryContainer that should be used with
 * components that don't work with VictoryChart i.e. those that don't need
 * Cartesian or polar axes.
 */
function CustomContainer({
  children,
  height,
  responsive = true,
  standalone = true,
  style,
  width
}: CustomContainerProps) {
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

export default CustomContainer;
