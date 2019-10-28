/// <reference types="react" />
import { VictoryChartProps, VictoryGroupProps, VictoryScatterProps, VictoryVoronoiContainerProps, VictoryLineProps } from 'victory';
import { ChartAxisPropsType } from './Chart';
export interface LineChartPartsProps {
    axis?: ChartAxisPropsType;
    parent?: VictoryChartProps;
    container?: VictoryVoronoiContainerProps;
    group?: VictoryGroupProps | VictoryGroupProps[];
    scatter?: VictoryScatterProps | VictoryScatterProps[];
}
export interface LineChartProps extends VictoryLineProps {
    parts?: LineChartPartsProps;
}
declare const _default: ({ ...props }: LineChartProps) => JSX.Element;
export default _default;
