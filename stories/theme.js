import createTheme from '@hurumap-ui/charts/styles/createTheme';

export default createTheme({
  chart: {
    axis: {
      labelWidth: 150
    },
    bar: {
      width: 350,
      height: 400,
      barWidth: 30,
      offset: 40,
      legend: {
        labelWidth: 150
      }
    },
    pie: {
      height: 400,
      legend: {
        labelWidth: 150
      }
    },
    line: {
      legend: {
        labelWidth: 150
      }
    }
  }
});
