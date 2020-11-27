import { createMuiTheme } from "@material-ui/core/styles";

const theme = createMuiTheme({
  palette: {
    // type: "dark",
    primary: {
      main: "#5bd592",
    },
    secondary: {
      main: "#f1f1f1",
    },
  },
  typography: {
    fontFamily: ["Poppins", "sans-serif"].join(","),
  },
  spacing: (factor) => `${0.25 * factor}rem`,
  overrides: {},
});

export default theme;
