import React, { Fragment } from 'react';

import { VictoryLabel } from 'victory';

import withVictoryTheme from '../styles/withVictoryTheme';
import { ReferenceProps } from '../ReferableChart';

interface Props {
  data: number[];
  colorScale: string[];
  height: number;
  reference: ReferenceProps<number>;
  width: number;
}

function VerticalLegend({ colorScale, data, height, reference, width }: Props) {
  // For starters, lets assume each data label has 36px height,
  // reference label has 48 px, and there is 10px between labels
  // and charts
  // ------------------------------------

  const chartHeight = height - (data.length * 36 + 48 + 20);
  const minDimension = Math.min(chartHeight, width);

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
      {/* Data values at the top of the chart */}
      {data.map((d, i) => (
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

      {/* Reference value at the bottom */}
      <VictoryLabel
        capHeight={0}
        lineHeight={0}
        x={(width - minDimension) / 2}
        y={height - 24}
        text={reference.data[0]}
        style={referenceLabelStyles(0)}
      />
      <VictoryLabel
        capHeight={0}
        lineHeight={0}
        x={(width - minDimension) / 2}
        y={height}
        text="Tanzania"
        style={referenceLabelStyles(1)}
      />
    </Fragment>
  );
}

export default withVictoryTheme(VerticalLegend);
