/// <reference types="react" />
import { ScaledAreaProps } from './ScaledArea';
import { PieChartProps } from '../PieChart';
declare type P = Pick<PieChartProps, Exclude<keyof PieChartProps, 'colorScale' | 'data' | 'style'>>;
interface Props extends P, ScaledAreaProps {
    groupSpacing: number;
    mobile?: boolean;
}
/**
 *
 */
declare function ScaledCircle({ colorScale, data, groupSpacing, mobile, reference, style, ...props }: Props): JSX.Element;
export default ScaledCircle;
