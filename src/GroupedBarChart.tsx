import React, { useEffect, useRef, useState, useCallback } from 'react';
import { Theme, WithStyles } from '@material-ui/core';
import { createStyles, useTheme, withStyles } from '@material-ui/styles';
import {
  VictoryBar,
  VictoryGroup,
  VictoryAxis,
  VictoryChart,
  VictoryTheme
} from 'victory';

const styles = createStyles({
  root: {
    width: '100%',
    height: '100%'
  }
});

interface Props extends WithStyles<typeof styles> {
  width?: string | number;
  height?: string | number;
  horizontal?: boolean;
  barWidth?: number;
  dataUnit?: string;
  data: {
    x: string | number;
    data: {
      x: string | number;
      y: number;
    }[];
  }[];
}

function GroupedBarChart({
  classes,
  data,
  dataUnit = '',
  barWidth = 40,
  horizontal,
  width,
  height
}: Props) {
  const theme = useTheme<Theme>();
  const ref = useRef<HTMLDivElement>(null);
  const [chartDimensions, setChartDimensions] = useState({
    height: 0,
    width: 0
  });

  const updateChartDimmensions = useCallback(() => {
    if (ref.current) {
      const div = ref.current;
      if (
        chartDimensions.height !== div.offsetHeight ||
        chartDimensions.width !== div.offsetWidth
      ) {
        setChartDimensions(() => ({
          height: div.offsetHeight,
          width: div.offsetWidth
        }));
      }
    }
  }, [ref, chartDimensions]);
  useEffect(() => {
    updateChartDimmensions();
  }, [width, height, updateChartDimmensions]);
  return (
    <div ref={ref} className={classes.root} style={{ width, height }}>
      <VictoryChart
        horizontal={horizontal}
        width={chartDimensions.width}
        height={chartDimensions.height}
        theme={theme ? theme.chart : VictoryTheme.material}
      >
        <VictoryGroup horizontal={horizontal} offset={barWidth + 5}>
          {data.map(d => (
            <VictoryBar
              horizontal={horizontal}
              barWidth={barWidth}
              data={d.data}
              labels={datum => `${datum.y}${dataUnit}`}
            />
          ))}
        </VictoryGroup>
        <VictoryAxis style={{ axis: { stroke: 'none' } }} />
      </VictoryChart>
    </div>
  );
}

export default withStyles(styles)(GroupedBarChart);
