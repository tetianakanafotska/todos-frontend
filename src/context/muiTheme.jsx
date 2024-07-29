import { createTheme, ThemeProvider } from "@mui/material";

const theme = createTheme({
  palette: {
    primary: {
      main: "#F6C786",
    },
    secondary: {
      main: "#F0C4EE",
    },
  },
  components: {
    MuiPaper: {
      styleOverrides: {
        root: {},
      },
    },
  },
});

const MuiTheme = ({ children }) => {
  return <ThemeProvider theme={theme}>{children}</ThemeProvider>;
};

export default MuiTheme;
