import React, { Fragment } from 'react';
import {
  VictoryCommonProps,
  VictoryDatableProps,
  VictoryMultiLabeableProps,
  VictoryChart,
  VictoryThemeDefinitionLatest
} from 'victory';
import RectLegend from './RectLegend';
import CircleLegend from './CircleLegend';
import ScaledCircle from './ScaledCircle';
import ScaledSquare from './ScaledSquare';
import withVictoryTheme from '../styles/withVictoryTheme';

interface Props
  extends VictoryCommonProps,
    VictoryDatableProps,
    VictoryMultiLabeableProps {
  square?: boolean;
}

function NestedProportionalAreaChart({ theme, data, square = false }: Props) {
  const {
    proportionalArea: chart
  } = (theme as unknown) as VictoryThemeDefinitionLatest;
  if (!data || !chart) {
    return null;
  }
  const { data: dataStyle } = chart.style;
  // Use chart.data as fill style for background/total chart
  const colorScale =
    dataStyle && typeof dataStyle.fill === 'string'
      ? [dataStyle.fill, ...chart.colorScale]
      : chart.colorScale;
  return (
    <Fragment>
      {!square ? (
        <CircleLegend />
      ) : (
        <RectLegend
          firstLegend="789,000"
          secondLegend="450,000"
          totalLegendNumber="40.5m"
          totalLegendText="Population"
        />
      )}
      <VictoryChart theme={theme}>
        {square ? (
          <ScaledSquare
            colorScale={colorScale}
            relativeTo={data[0]}
            sides={data}
            size={chart.width}
            x={0}
            y={0}
          />
        ) : (
          <ScaledCircle
            colorScale={colorScale}
            cx={chart.width / 2}
            cy={chart.width / 2}
            radii={data}
            relativeTo={data[0]}
            size={chart.width / 2}
          />
        )}
      </VictoryChart>
    </Fragment>
  );
}

export default withVictoryTheme(NestedProportionalAreaChart);
