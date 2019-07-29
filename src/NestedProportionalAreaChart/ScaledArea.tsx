import { ColorScalePropType, VictoryStyleInterface } from 'victory';
import { ReferenceProps } from '../ReferableChart';

// CHARTS
// -------

/**
 * Chart size (desktop).
 */
export const DESKTOP_HEIGHT = 270;
export const DESKTOP_WIDTH = 650;

/**
 * Chart size (mobile).
 */
export const MOBILE_HEIGHT = 386;
export const MOBILE_WIDTH = 226;

/**
 * data.
 */
export interface ScaledAreaData {
  x: number;
  label?: string;
}

const scaleDimensions = (
  from: { height: number; width: number },
  to: { height: number; width: number }
) => {
  const { height: fH, width: fW } = from;
  const { height: tH, width: tW } = to;
  // Scale from fH to tW first
  const height = (fH * tW) / fW;
  let width = tW;
  if (height > tH) {
    // Scale from height to tH
    width = (width * tH) / height;
  }
  return width / fW;
};

export function scaleDesktopDimensions(height: number, width: number) {
  return scaleDimensions(
    { height: DESKTOP_HEIGHT, width: DESKTOP_WIDTH },
    { height, width }
  );
}

export function scaleMobileDimensions(height: number, width: number) {
  return scaleDimensions(
    { height: MOBILE_HEIGHT, width: MOBILE_WIDTH },
    { height, width }
  );
}

export interface ScaledAreaProps {
  colorScale: ColorScalePropType;
  data: ScaledAreaData[];
  reference: ReferenceProps<ScaledAreaData>;
  style?: VictoryStyleInterface;
}

// LEGENDS
// -------

/**
 * Style for data points
 * @param index .
 * @param colorScale .
 * @param style .
 */
export const dataLabelsStyle = (
  index: number,
  colorScale: ColorScalePropType,
  style?: VictoryStyleInterface
): React.CSSProperties =>
  Object.assign(
    {
      fontSize: 36,
      fontWeight: 'bold'
    },
    style && style.data,
    {
      fill: colorScale[index % colorScale.length]
    }
  ) as React.CSSProperties;

/**
 * Style for reference data point.
 * @param reference .
 */
export const referenceDataStyle = (
  reference: ReferenceProps<ScaledAreaData>
) => {
  const { style: referenceStyle } = reference;

  return Object.assign(
    {
      fontWeight: 'bold'
    },
    // Since data has gradient fill style, lets use labels style
    (referenceStyle && referenceStyle.labels) || {}
  ) as React.CSSProperties;
};

/**
 * Style for reference data label.
 */
export const referenceLabelsStyle = (
  reference: ReferenceProps<ScaledAreaData>
) => {
  const { style: referenceStyle } = reference;
  return referenceStyle && (referenceStyle.labels as React.CSSProperties);
};
