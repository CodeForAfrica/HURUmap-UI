import { VictoryStyleInterface } from 'victory';

import Chart, { ChartProps } from './Chart';

export interface ReferenceProps<T> {
  data: T[];
  style?: VictoryStyleInterface;
}

export type ReferenceType<T> = T[] | ReferenceProps<T>;

export interface ReferableChartProps<T> extends ChartProps {
  reference: ReferenceType<T>;
}

export function toReferenceProps<T>(ref: ReferenceType<T>): ReferenceProps<T> {
  return Array.isArray(ref) ? { data: ref } : ref;
}

export default Chart;
