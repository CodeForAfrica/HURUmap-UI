/// <reference types="react" />
import { VictoryCommonProps, VictoryDatableProps, VictoryMultiLabeableProps } from 'victory';
import { ReferableChartProps } from '../ReferableChart';
import { BulletData } from './BulletBar';
export interface OffsetType {
    x: number;
    y: number;
}
export declare type OffsetPropType = number | OffsetType | undefined;
interface Props<T> extends VictoryCommonProps, VictoryDatableProps, VictoryMultiLabeableProps, ReferableChartProps<T> {
    labels?: (data: T) => string;
    barWidth?: number;
    total: number;
    offset?: OffsetPropType;
}
declare const _default: ({ ...props }: Props<BulletData>) => JSX.Element;
export default _default;
