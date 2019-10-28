/// <reference types="react" />
import { VictoryStyleInterface } from 'victory';
import { ReferenceProps } from '../ReferableChart';
export interface BulletData {
    x: number;
    label?: string;
}
interface Props<T> {
    barWidth: number;
    data: T[];
    labels: {
        (data: T): string;
    };
    reference: ReferenceProps<T>;
    total: number;
    style?: VictoryStyleInterface;
    width: number;
    x: number;
    y: number;
}
declare function BulletBar({ barWidth, data, labels, reference, style, total, width, x, y }: Props<BulletData>): JSX.Element;
export default BulletBar;
