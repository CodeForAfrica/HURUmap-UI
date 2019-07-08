import React, { useEffect, useRef, useState, useCallback } from 'react';
import { Theme, WithStyles } from '@material-ui/core';
import { createStyles, useTheme, withStyles } from '@material-ui/styles';
import { VictoryBar, VictoryGroup, VictoryAxis, VictoryChart } from 'victory';

import ThemedComponent from './common/ThemedComponent';
import ChartContainer, { ChartContainerProps } from './common/ChartContainer';

const styles = createStyles({
  root: {}
});

interface Props extends WithStyles<typeof styles>, ChartContainerProps {
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
  title,
  subtitle,
  onInfo,
  onShare,
  horizontal,
  width,
  height
}: Props) {
  const theme = useTheme<Theme>();
  const chartContainerRef = useRef<HTMLDivElement>(null);
  const [chartDimensions, setChartDimensions] = useState({
    height: 0,
    width: 0
  });

  const updateChartDimmensions = useCallback(() => {
    if (chartContainerRef.current) {
      const div = chartContainerRef.current;
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
  }, [chartContainerRef, chartDimensions]);
  useEffect(() => {
    updateChartDimmensions();
  }, [updateChartDimmensions]);
  return (
    <ChartContainer
      contentRef={chartContainerRef}
      classes={{ root: classes.root }}
      style={{ width, height }}
      title={title}
      subtitle={subtitle}
      onInfo={onInfo}
      onShare={onShare}
    >
      <VictoryChart
        horizontal={horizontal}
        width={chartDimensions.width}
        height={chartDimensions.height}
      >
        <VictoryGroup
          horizontal={horizontal}
          offset={barWidth + 5}
          colorScale="qualitative"
        >
          {data.map(d => (
            <VictoryBar
              horizontal={horizontal}
              barWidth={barWidth}
              theme={theme.chart}
              data={d.data}
              labels={datum => `${datum.y}${dataUnit}`}
            />
          ))}
        </VictoryGroup>
        <VictoryAxis style={{ axis: { stroke: 'none' } }} />
      </VictoryChart>
    </ChartContainer>
  );
}

export default withStyles(styles)(({ ...props }: Props) => {
  return (
    <ThemedComponent>
      <GroupedBarChart {...props} />
    </ThemedComponent>
  );
});
