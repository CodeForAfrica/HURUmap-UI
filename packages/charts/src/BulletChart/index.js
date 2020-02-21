import React from 'react';
import PropTypes from 'prop-types';

import { labels as defaultLabels } from '../../utils';
import withVictoryTheme from '../styles/withVictoryTheme';
import BulletBar from './BulletBar';
import CustomContainer from '../CustomContainer';
import propTypes from '../../propTypes';

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
  reference,
  theme,
  total: totalProp,
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
  const computedStyle = { ...chart.style };
  const computedWidth = width || chart.width;
  const isMobile = computedWidth < mobileBreakpoint;
  const isDirectionColumn = isMobile || computedData.length < 2;
  const total = Array.isArray(totalProp) ? totalProp.reverse() : totalProp;

  return (
    <CustomContainer height={height} theme={theme} width={width}>
      {/* We're plotting from bottom up so start with last item */}
      {computedData.reverse().map((d, i) => (
        <g key={JSON.stringify(d)}>
          <BulletBar
            barWidth={computedBarWidth}
            data={d}
            labels={labels || defaultLabels}
            reference={
              typeof ref === 'number'
                ? {
                    style: chart.reference,
                    data: reference
                  }
                : {
                    style: reference.style || chart.reference,
                    data: reference.data
                  }
            }
            style={{
              ...computedStyle,
              data: {
                fill:
                  chart.colorScale[
                    (computedData.length - i - 1) % chart.colorScale.length
                  ]
              }
            }}
            theme={theme}
            total={Array.isArray(total) ? total[i] : total}
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
  data: propTypes.groupedData,
  barWidth: PropTypes.number,
  height: PropTypes.number,
  labels: PropTypes.func,
  offset: PropTypes.oneOfType([PropTypes.number, PropTypes.shape({})]),
  reference: PropTypes.oneOfType([propTypes.number, propTypes.singleRefrence]),
  theme: propTypes.theme,
  total: propTypes.number.isRequired,
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
