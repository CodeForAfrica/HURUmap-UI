/// <reference types="react" />
import { ColorScalePropType, VictoryStyleInterface } from 'victory';
import { ReferenceProps } from '../ReferableChart';
/**
 * Chart size (desktop).
 */
export declare const DESKTOP_HEIGHT = 270;
export declare const DESKTOP_WIDTH = 650;
/**
 * Chart size (mobile).
 */
export declare const MOBILE_HEIGHT = 386;
export declare const MOBILE_WIDTH = 226;
/**
 * data.
 */
export interface ScaledAreaData {
    x: number;
    label?: string;
}
export declare function scaleDesktopDimensions(height: number, width: number): number;
export declare function scaleMobileDimensions(height: number, width: number): number;
export interface ScaledAreaProps {
    colorScale: ColorScalePropType;
    data: ScaledAreaData[];
    reference: ReferenceProps<ScaledAreaData>;
    style?: VictoryStyleInterface;
}
/**
 * Style for data points
 * @param index .
 * @param colorScale .
 * @param style .
 */
export declare const dataLabelsStyle: (index: number, colorScale: ColorScalePropType, style?: VictoryStyleInterface | undefined) => import("react").CSSProperties;
/**
 * Style for reference data point.
 * @param reference .
 */
export declare const referenceDataStyle: (reference: ReferenceProps<ScaledAreaData>) => import("react").CSSProperties;
/**
 * Style for reference data label.
 */
export declare const referenceLabelsStyle: (reference: ReferenceProps<ScaledAreaData>) => import("react").CSSProperties | undefined;
