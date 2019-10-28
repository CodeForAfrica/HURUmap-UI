/// <reference types="react" />
import { VictoryPieProps } from 'victory';
import { ScaledAreaData } from './ScaledArea';
import { ReferableChartProps } from '../ReferableChart';
interface Props<T> extends VictoryPieProps, ReferableChartProps<T> {
    data: T[];
    groupSpacing?: number;
    square?: boolean;
}
declare const _default: ({ ...props }: Props<ScaledAreaData>) => JSX.Element;
export default _default;
