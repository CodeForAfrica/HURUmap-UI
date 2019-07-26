import React, { Fragment } from 'react';

import { VictoryLabel, ColorScalePropType } from 'victory';

import withVictoryTheme from '../styles/withVictoryTheme';
import { ReferenceProps } from '../ReferableChart';

interface Props {
  data: number[];
  radii: number[];
  colorScale: ColorScalePropType;
  size: number;
  reference: ReferenceProps<number>;
  cx: number;
  cy: number;
}

function HorizontalLegend({
  colorScale,
  data,
  radii,
  reference,
  cx,
  cy
}: Props) {
  // For starters, lets assume:
  // i) Each data value has 36px height and 130px width
  // ii) Padding between data value and label is 10px, and
  // iii) Data label 20px.
  // Hence:
  // i) Data value vertical `center` is aligned with center of circle
  //
  // Also:
  // i) Reference label has 48 px, aligned to the right of the charts
  // ----------------------------------------------------------------

  // const chartHeight = height - (data.length * 36 + 48 + 2dd0);
  // const minDimension = Math.min(chartHeight, width);

  const dataLabelStyles = (index: number): React.CSSProperties => ({
    fontSize: 36,
    fontWeight: 'bold',
    fill: colorScale[index % colorScale.length]
  });

  const referenceLabelStyles = (index: number): React.CSSProperties =>
    Object.assign({}, (reference.style && reference.style.labels) || {}, {
      fontWeight: index === 0 ? 'bold' : 'normal',
      color: 'grey'
    }) as React.CSSProperties;

  return (
    <Fragment>
      {radii.map((r, i) => (
        <Fragment>
          <line
            x1={cx - (i < 1 ? 1 : -1) * 190}
            y1={cy}
            x2={cx - (i < 1 ? 1 : -1) * (r + 5)}
            y2={cy}
            style={{
              stroke: colorScale[i % colorScale.length],
              strokeWidth: '2px'
            }}
          />
          <VictoryLabel
            textAnchor={i === 0 ? 'end' : 'start'}
            capHeight={0}
            lineHeight={0}
            x={cx - (i < 1 ? 1 : -1) * 200}
            dx={0}
            y={cy}
            dy={18}
            text={data[i]}
            style={dataLabelStyles(i)}
          />
        </Fragment>
      ))}

      {/* {data.map((d, i) => (
        <VictoryLabel
          capHeight={0}
          lineHeight={0}
          x={(width - minDimension) / 2}
          dx={0}
          y={36}
          text={data[i]}
          style={dataLabelStyles(i)}
          dy={i * 36}
        />
      ))}
      */}

      <VictoryLabel
        capHeight={0}
        lineHeight={0}
        x={cx + 200}
        y={2 * cy - 24}
        text={reference.data[0]}
        style={referenceLabelStyles(0)}
      />
      <VictoryLabel
        capHeight={0}
        lineHeight={0}
        x={cx + 200}
        y={2 * cy}
        text="Tanzania"
        style={referenceLabelStyles(1)}
      />
    </Fragment>
  );
}

export default withVictoryTheme(HorizontalLegend);
