import React from 'react';
import { Theme, WithStyles } from '@material-ui/core';
import { createStyles, useTheme, withStyles } from '@material-ui/styles';
import {
  VictoryCommonProps,
  VictoryDatableProps,
  VictoryMultiLabeableProps
} from 'victory';

import ScaledCircle from './ScaledCircle';
import ScaledRect from './ScaledRect';
import ThemedComponent from '../ThemedComponent';

const styles = createStyles({
  root: {}
});

interface Props
  extends WithStyles<typeof styles>,
    VictoryCommonProps,
    VictoryDatableProps,
    VictoryMultiLabeableProps {
  square?: boolean;
}

function NestedProportionalAreaChart({ classes, data, square = false }: Props) {
  const theme = useTheme<Theme>();
  if (!data) {
    return null;
  }

  const {
    proportionalArea: chart = {
      colorScale: ['black'],
      height: 450,
      padding: 0,
      style: {},
      width: 450
    }
  } = theme.chart;
  const padding =
    typeof chart.padding === 'number'
      ? { padding: chart.padding }
      : {
          paddingTop: chart.padding.top,
          paddingRight: chart.padding.right,
          paddingBottom: chart.padding.bottom,
          paddingLeft: chart.padding.left
        };
  const style = Object.assign(padding, chart.style.parent, {
    width: '100%',
    height: '100%'
  });
  const computeStyle = (i: number) =>
    i === 0
      ? chart.style.data
      : { fill: chart.colorScale[i % chart.colorScale.length] };
  return (
    <div className={classes.root}>
      <svg style={style} viewBox={`0 0 ${chart.width} ${chart.height}`}>
        <g>
          {square
            ? data
                .sort((a, b) => b - a)
                .map((v, i) => (
                  <ScaledRect
                    x={0}
                    y={0}
                    width={v}
                    height={v}
                    relativeTo={data[0]}
                    size={chart.width}
                    style={computeStyle(i)}
                  />
                ))
            : data
                .sort((a, b) => b - a)
                .map((v, i) => (
                  <ScaledCircle
                    cx={chart.width / 2}
                    cy={chart.width / 2}
                    r={v}
                    relativeTo={data[0]}
                    size={chart.width / 2}
                    style={computeStyle(i)}
                  />
                ))}
        </g>
      </svg>
    </div>
  );
}

export default withStyles(styles)(({ ...props }: Props) => {
  return (
    <ThemedComponent>
      <NestedProportionalAreaChart {...props} />
    </ThemedComponent>
  );
});
