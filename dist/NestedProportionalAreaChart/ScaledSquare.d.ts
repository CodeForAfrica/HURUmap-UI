import React from 'react';
import { ScaledAreaProps } from './ScaledArea';
interface Props extends ScaledAreaProps {
    className?: string;
    clipPath?: string;
    events?: React.DOMAttributes<React.ElementType>;
    role?: string;
    rx?: number;
    ry?: number;
    shapeRendering?: string;
    transform?: string;
    x?: number;
    y?: number;
}
/**
 *
 */
declare function ScaledSquare({ colorScale, data, reference, style, ...props }: Props): JSX.Element;
export default ScaledSquare;
