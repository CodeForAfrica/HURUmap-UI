/// <reference types="react" />
import { VictoryBarProps } from 'victory';
import { ReferableChartProps } from './ReferableChart';
interface DataPoint {
    x: string;
    y: number;
}
declare type SingleData = [DataPoint];
declare type CompareData = [DataPoint, DataPoint];
interface Props extends ReferableChartProps<DataPoint>, VictoryBarProps {
    data: SingleData | CompareData;
}
declare const _default: ({ ...props }: Props) => JSX.Element;
export default _default;
