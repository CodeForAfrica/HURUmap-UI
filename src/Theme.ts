import createTheme from './styles/createTheme';

export default createTheme({
  typography: {
    h3: {
      fontSize: '2.2em',
      lineHeight: 1,
      fontWeight: 700
    },
    h4: {
      fontSize: '1.2em',
      fontWeight: 400,
      lineHeight: 1.3
    },
    h5: {
      fontSize: '1em',
      fontStyle: 'normal',
      fontWeight: 400
    },
    h6: {
      fontSize: '0.9em',
      lineHeight: 1.3,
      color: '#777'
    }
  }
});
