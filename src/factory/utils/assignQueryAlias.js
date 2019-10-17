export default sectionedCharts => {
  // Provide the visual with unique ids for fetching
  // The unique ids will be used to set alias in graphql
  let index = 0;
  sectionedCharts.forEach(x =>
    x.charts.forEach(chart => {
      // eslint-disable-next-line no-param-reassign
      chart.queryAlias = `chart${index}`;
      const { visual, stat } = chart;
      visual.queryAlias = `viz${index}`;
      stat.queryAlias = `viz${index}`;
      index += 1;
    })
  );
  return sectionedCharts;
};
