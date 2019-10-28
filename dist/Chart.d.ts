/// <reference types="react" />
import { VictoryAxisProps, VictoryChartProps } from 'victory';
export interface ChartAxisProps {
    independent?: VictoryAxisProps;
    dependent?: VictoryAxisProps;
}
export declare type ChartAxisPropsType = VictoryAxisProps | ChartAxisProps;
export declare function toChartAxisProps(prop: ChartAxisPropsType | undefined): ChartAxisProps;
export interface ChartProps {
    responsive?: boolean;
}
interface Props extends VictoryChartProps, ChartProps {
    children: any;
}
declare const _default: ({ ...props }: Props) => JSX.Element;
export default _default;
