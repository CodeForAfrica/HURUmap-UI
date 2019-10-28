import { VictoryStyleInterface } from 'victory';
import Chart, { ChartProps } from './Chart';
export interface ReferenceProps<T> {
    data: T[];
    labels?: string[];
    style?: VictoryStyleInterface;
}
export declare type ReferenceType<T> = T[] | ReferenceProps<T>;
export interface ReferableChartProps<T> extends ChartProps {
    reference: ReferenceType<T>;
}
export declare function toReferenceProps<T>(ref: ReferenceType<T>): ReferenceProps<T>;
export default Chart;
