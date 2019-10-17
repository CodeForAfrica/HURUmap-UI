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

const scaleDimensions = (from, to) => {
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

export function scaleDesktopDimensions(height, width) {
  return scaleDimensions(
    { height: DESKTOP_HEIGHT, width: DESKTOP_WIDTH },
    { height, width }
  );
}

export function scaleMobileDimensions(height, width) {
  return scaleDimensions(
    { height: MOBILE_HEIGHT, width: MOBILE_WIDTH },
    { height, width }
  );
}

// LEGENDS
// -------

/**
 * Style for data points
 * @param index number.
 * @param colorScale string | string[].
 * @param style object.
 */
export const dataLabelsStyle = (index, colorScale, style) => ({
  fontSize: 36,
  fontWeight: 'bold',
  ...(style && style.data),
  fill: colorScale[index % colorScale.length]
});

/**
 * Style for reference data point.
 * @param reference .
 */
export const referenceDataStyle = reference => {
  const { style: referenceStyle } = reference;

  return {
    fontWeight: 'bold',
    // Since data has gradient fill style, lets use labels style
    ...((referenceStyle && referenceStyle.labels) || {})
  };
};

/**
 * Style for reference data label.
 */
export const referenceLabelsStyle = reference => {
  const { style: referenceStyle } = reference;
  return referenceStyle && referenceStyle.labels;
};
