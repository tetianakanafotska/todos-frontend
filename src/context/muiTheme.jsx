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
      high: {
        main: "#FFE0DD",
        dark: "#F5C3BD",
      },
      low: {
        main: "#D6EDF8",
        dark: "#B4E2FA",
      },
      medium: {
        main: "#FAEDCD",
        dark: "#F8E5B5",
      },
      todo: {
        main: "#F5F5F7",
        dark: "#DDDDE4",
      },
      inprogress: {
        main: "#E7EEFD",
        dark: "#CBD9FC",
      },
      done: {
        main: "#CAF0E4",
        dark: "#ACE7D4",
      },
    },
  },
  typography: {
    fontFamily: '"Raleway", "Tahoma", "Geneva", "Verdana", sans-serif',
    subtitle1: {
      fontSize: "1.2rem",
      fontWeight: "600",
    },
    subtitle2: {
      fontSize: "0.95rem",
      color: "#C0C0C0",
    },
    body1: {
      fontSize: "1rem",
    },
    body2: {
      fontSize: "0.97rem",
    },
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

    MuiDatePicker: {
      defaultProps: {
        format: "MMM D, YYYY",
        className: "no-border",
      },
    },
    MuiChip: {
      styleOverrides: {
        root: ({ ownerState }) => {
          const value =
            ownerState.value?.toLowerCase() ||
            ownerState["data-value"].toLowerCase();
          return {
            backgroundColor: theme.palette.tags[value].main,
            borderRadius: "5px",
            fontWeight: "550",
            "&:hover": {
              backgroundColor: theme.palette.tags[value].dark,
            },
          };
        },
      },
    },
  },
});

const MuiTheme = ({ children }) => {
  return <ThemeProvider theme={theme}>{children}</ThemeProvider>;
};

export default MuiTheme;
