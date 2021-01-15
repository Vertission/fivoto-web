import { createMuiTheme, responsiveFontSizes } from '@material-ui/core/styles';

const theme = createMuiTheme({
  palette: {
    // type: "dark",
    primary: {
      main: '#5bd592',
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
  overrides: {
    MuiTypography: {},
    MuiButton: {
      label: {
        color: '#f1f1f1',
      },
    },
  },
  props: {
    MuiSvgIcon: {
      htmlColor: '#ffffff',
    },
  },
});

export default responsiveFontSizes(theme);
