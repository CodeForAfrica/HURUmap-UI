import createTheme from './styles/createTheme';

export default createTheme({
  typography: {
    h2: {
      fontFamily: "'Montserrat', sans-serif",
      fontSize: '24px',
      fontWeight: 'bold',
      fontStyle: 'normal',
      lineHeight: 'normal',
      color: '#2c2c2a'
    },
    h3: {
      fontFamily: "'Montserrat', sans-serif",
      fontSize: '12px',
      fontWeight: 'normal',
      fontStyle: 'normal',
      lineHeight: 'normal',
      color: '#2c2c2a64' /* 40% */
    }
  }
});
