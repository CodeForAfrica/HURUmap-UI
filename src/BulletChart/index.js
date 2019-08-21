import React from 'react';
import PropTypes from 'prop-types';

import { toReferenceProps } from '../ReferableChart';
import withVictoryTheme from '../styles/withVictoryTheme';
import BulletBar from './BulletBar';
import CustomContainer from '../CustomContainer';

const toOffset = (prop, { offset }) => {
  if (prop) {
    if (typeof prop === 'number') {
      return { x: prop, y: prop };
    }
    return prop;
  }
  if (typeof offset === 'number') {
    return { x: offset, y: offset };
  }

  return offset;
};

/**
 * By default, Bullet chart assumes data is a percentage **if** only one value
 * provided and its less than 100. Otherwise, it will assume data provided is
 * half i.e. convert `[data]`  to `[data, data]`
 */
function BulletChart({
  barWidth,
  data,
  height,
  labels,
  offset,
  reference: ref,
  theme,
  total,
  width
}) {
  const {
    bullet: chart,
    breakpoints: { sm: mobileBreakpoint }
  } = theme;
  if (!data || !chart) {
    return null;
  }

  const computedBarWidth = barWidth || chart.barWidth;
  const computedData = Array.isArray(data[0]) ? data.slice(0, 2) : [data];
  const computedHeight = height || chart.height;
  const computedOffset = toOffset(offset, chart);
  const computedStyle = Object.assign({}, chart.style);
  const computedWidth = width || chart.width;
  const isMobile = computedWidth < mobileBreakpoint;
  const isDirectionColumn = isMobile || computedData.length < 2;
  const reference = Object.assign(
    {},
    { style: chart.reference },
    toReferenceProps(ref)
  );

  return (
    <CustomContainer width={width} height={height}>
      {/* We're plotting from bottom up so start with last item */}
      {computedData.reverse().map((d, i) => (
        <g>
          <BulletBar
            barWidth={computedBarWidth}
            data={d}
            labels={labels || (() => '')}
            reference={reference}
            style={Object.assign({}, computedStyle, {
              data: { fill: chart.colorScale[i % chart.colorScale.length] }
            })}
            total={total}
            width={
              isDirectionColumn
                ? computedWidth
                : (computedWidth - computedOffset.x) / 2
            }
            x={
              isDirectionColumn ? 0 : (i * computedWidth + computedOffset.x) / 2
            }
            y={
              isDirectionColumn
                ? computedHeight - i * computedOffset.y
                : computedHeight
            }
          />
        </g>
      ))}
    </CustomContainer>
  );
}

BulletChart.propTypes = {
  data: PropTypes.arrayOf(PropTypes.shape({})),
  barWidth: PropTypes.number,
  height: PropTypes.number,
  labels: PropTypes.func,
  offset: PropTypes.oneOf([PropTypes.number, PropTypes.shape({})]),
  reference: PropTypes.oneOf([
    PropTypes.arrayOf(PropTypes.shape({})),
    PropTypes.shape({})
  ]),
  theme: PropTypes.shape({
    bullet: PropTypes.shape({}),
    breakpoints: PropTypes.shape({ sm: PropTypes.number })
  }),
  total: PropTypes.number.isRequired,
  width: PropTypes.number
};

BulletChart.defaultProps = {
  data: undefined,
  barWidth: undefined,
  height: undefined,
  labels: undefined,
  offset: undefined,
  reference: undefined,
  theme: undefined,
  width: undefined
};

export default withVictoryTheme(BulletChart);
