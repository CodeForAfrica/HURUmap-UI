/// <reference types="react" />
import { VictoryBarProps, VictoryAxisProps } from 'victory';
import { ChartProps } from './Chart';
declare type Data = {
    x: string | number;
    y: number;
}[];
declare type GroupData = {
    label: string | number;
    data: Data;
}[];
interface Props extends VictoryBarProps, ChartProps {
    barWidth?: number;
    groupSpacing?: number;
    barSpacing?: number;
    data: GroupData | Data;
    axisProps?: VictoryAxisProps;
    dependantAxisProps?: VictoryAxisProps;
}
declare const _default: ({ ...props }: Props) => JSX.Element;
export default _default;
