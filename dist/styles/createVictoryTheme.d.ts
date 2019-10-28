/// <reference path="../../typings/victory/index.d.ts" />
import { VictoryThemeDefinitionLatest } from 'victory';
export default function createVictoryTheme(chartOptions?: VictoryThemeDefinitionLatest): {
    breakpoints: {
        sm: number;
    };
    axis: {
        style: {
            axisLabel: {
                display: string;
            };
            tickLabels: {
                display: string;
            };
            ticks: {
                display: string;
            };
            grid: {
                display: string;
            };
            axis: {
                display: string;
            };
        };
    };
} & import("victory").VictoryThemeDefinition & VictoryThemeDefinitionLatest;
