/// <reference types="react" />
import { VictoryPieProps } from 'victory';
export interface PieChartProps extends VictoryPieProps {
    donut?: boolean;
    groupSpacing?: number;
    /**
     * radii enables comparing pie charts using areas instead of "pie"s.
     * If this is enabled, a single color will be used for the pie chart.
     *
     * The color will be selected (sequentially) from the supplied colorScale
     * (if any).
     */
    radii?: number[];
}
declare const _default: ({ ...props }: PieChartProps) => JSX.Element;
export default _default;
