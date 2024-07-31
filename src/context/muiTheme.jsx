import { createTheme, ThemeProvider } from "@mui/material";
const theme = createTheme({
  palette: {
    primary: {
      main: "#F6C786",
    },
    secondary: {
      main: "#F0C4EE",
      dark: "#CA99FF",
    },
    black: {
      main: "#000",
      light: "#565563",
      dark: "#000",
      contrastText: "#fff",
    },
  },
  typography: {
    fontFamily: '"Raleway", "Tahoma", "Geneva", "Verdana", sans-serif',
    h5: {
      fontWeight: "700",
    },
  },
  shape: {
    borderRadius: 9,
  },
  components: {
    MuiPaper: {
      styleOverrides: {
        root: {},
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: ({ theme }) => ({
          marginBottom: "20px",
          "& label.Mui-focused": {
            color: theme.palette.primary.main,
          },
        }),
      },
    },
    MuiOutlinedInput: {
      styleOverrides: {
        root: ({ theme }) => ({
          "&:hover .MuiOutlinedInput-notchedOutline": {
            borderColor: theme.palette.primary.main,
          },
          "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
            borderColor: theme.palette.primary.main,
          },
        }),
      },
    },

    MuiButton: {
      styleOverrides: {
        root: ({ ownerState, theme }) => ({
          borderRadius: "100px",
          padding: "11px 16px",
          "&:hover": {
            backgroundColor: theme.palette[ownerState.color].light,
          },
        }),
      },
    },
  },
});

const MuiTheme = ({ children }) => {
  return <ThemeProvider theme={theme}>{children}</ThemeProvider>;
};

export default MuiTheme;
