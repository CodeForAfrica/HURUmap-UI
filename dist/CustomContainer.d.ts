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
declare function CustomContainer({ children, height, responsive, standalone, style, width }: CustomContainerProps): any;
export default CustomContainer;
