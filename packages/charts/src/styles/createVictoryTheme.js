import _ from "lodash";

import { VictoryTheme } from "victory";

export default function createVictoryTheme(chartOptions) {
  const defaultTheme = _.merge(
    // New props
    {
      breakpoints: {
        // Handsets: https://material.io/design/layout/responsive-layout-grid.html#breakpoints
        // Lets use Material UI language here
        sm: 600,
      },
    },

    // Victory props
    VictoryTheme.material,

    // Overriding known props,
    {
      axis: {
        labelWidth: 20,
        style: {
          grid: {
            display: "none",
          },
        },
      },
      line: {
        offset: 100,
        height: 300,
        legend: {
          align: "bottom",
          orientation: "horizontal",
          size: 50,
          labelWidth: 150,
        },
      },
      bar: {
        barWidth: 25,
        domainPadding: { x: [25, 25] },
        height: 300,
        offset: 50,
        legend: {
          align: "bottom",
          orientation: "horizontal",
          size: 50,
          labelWidth: 150,
        },
      },
      pie: {
        height: 250,
        padding: 0,
        width: 450,
        donut: true,
        donutHighlightIndex: 1,
        // Default VictoryTheme.material font size is 12
        // see: https://github.com/FormidableLabs/victory/blob/master/packages/victory-core/src/victory-theme/material.js
        donutHighlightStyle: { fontWeight: "bold", fontSize: 18 },
        donutLabelRadiusRatio: 0.75,
        donutRatio: 0.6,
        emphasisCoefficient: 0.15,
        groupSpacing: 4,
        legend: {
          align: "right",
          orientation: "vertical",
          labelWidth: 150,
        },
      },
      tooltip: {
        flyoutStyle: {
          fill: "#fff",
        },
        pointerLength: 0,
      },
      voronoi: {
        style: {
          flyout: {
            fill: "#fff",
          },
        },
      },
      bullet: {
        barWidth: 5,
        offset: { x: 20, y: 50 },
        style: {
          data: {
            fill: "#d8d8d8",
          },
          labels: {
            fill: "#9b9b9b",
          },
        },
      },
      comparisonBar: {
        barHeight: 5,
        referenceStyle: {
          labels: { fill: "#9b9b9b" },
          data: { fill: "#9b9b9b", fontWeight: "bold" },
        },

        style: {
          data: {
            fontSize: "24px",
            fontWeight: "bold",
          },
        },
      },
    }
  );
  // The way dependentAxis/independentAxis axis namespaces are merged in theme
  // seems a bit counter-intuitive still: https://github.com/FormidableLabs/victory/pull/1423
  // Lets just merge them `manually` here to be sure
  defaultTheme.dependentAxis = _.merge(
    defaultTheme.dependentAxis,
    defaultTheme.axis,
    VictoryTheme.material.dependentAxis,
    {
      style: {
        axis: {
          display: "none",
        },
        axisLabel: {
          display: "none",
        },
        grid: {
          display: "block",
          strokeDasharray: "none",
          stroke: "rgb(236, 239, 241)",
        },
        ticks: {
          display: "none",
        },
      },
    }
  );
  const chart = _.merge(defaultTheme, chartOptions);
  const defaultReference = {
    data: {
      fill: "url(#gradient-background)",
      stroke: "none",
      strokeWidth: 0,
    },
    labels: {
      fill: "#9b9b9b",
      fontSize: 18,
    },
  };
  // Customize chart bullet props off of chart group props
  chart.bullet = _.merge(chart.bullet, chart.group);
  // Customize chart comparisonBar props off of chart group props
  chart.comparisonBar = _.merge(chart.comparisonBar, chart.group);
  // Customize chart line props off of chart group props
  chart.line.colorScale = chart.line.colorScale || chart.group.colorScale;
  // Customize chart proportionalArea props off of chart area props
  chart.proportionalArea = _.merge(
    chart.proportionalArea,
    { reference: defaultReference },
    chart.area
  );
  // Use pie chart colorScale prop if proportionalArea doesn't have one
  if (!chart.proportionalArea.colorScale && chart.pie) {
    chart.proportionalArea.colorScale = chart.pie.colorScale;
  }

  return chart;
}
