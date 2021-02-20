import { createMuiTheme, responsiveFontSizes } from '@material-ui/core/styles';

const theme = createMuiTheme({
  palette: {
    // type: "dark",
    primary: {
      main: '#5bd592',
      contrastText: '#fff',
    },
    secondary: {
      main: '#ffffff',
      dark: '#ADB5BD',
    },
  },
  typography: {
    fontFamily: ['Poppins', 'sans-serif'].join(','),
  },
  spacing: (factor) => `${0.25 * factor}rem`,
  overrides: {},
  props: {
    MuiSvgIcon: {
      htmlColor: '#ffffff',
    },
  },
});

export default responsiveFontSizes(theme);
