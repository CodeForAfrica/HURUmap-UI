/// <reference types="react" />
import { ScaledAreaProps } from './ScaledArea';
interface Props extends ScaledAreaProps {
    cx: number;
    cy: number;
    radii: number[];
}
declare const _default: ({ ...props }: Props) => JSX.Element;
export default _default;
