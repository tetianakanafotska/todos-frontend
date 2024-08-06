import { createTheme, ThemeProvider } from "@mui/material";
const theme = createTheme({
  palette: {
    primary: {
      main: "#65CAA4",
      contrastText: "#10171F",
    },
    secondary: {
      main: "#fff",
      contrastText: "#10171F",
    },
    black: {
      main: "#12171E",
      light: "#505050",
      dark: "#000",
      contrastText: "#fff",
    },
    tags: {
      high: "#FFE0DD",
      low: "#D6EDF8",
      medium: "#FAEDCD",
    },
  },
  typography: {
    fontFamily: '"Raleway", "Tahoma", "Geneva", "Verdana", sans-serif',
  },
  shape: {
    borderRadius: 9,
  },
  components: {
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
        root: {
          borderRadius: "100px",
        },
      },
    },
  },
});

const MuiTheme = ({ children }) => {
  return <ThemeProvider theme={theme}>{children}</ThemeProvider>;
};

export default MuiTheme;
