import { createTheme, responsiveFontSizes, ThemeProvider } from "@mui/material";
let theme = createTheme({
  palette: {
    primary: {
      main: "#2DCDA1",
      contrastText: "#10171F",
    },
    secondary: {
      main: "#5056FD",
      contrastText: "#10171F",
    },
    black: {
      main: "#12171E",
      light: "#505050",
      dark: "#000",
      contrastText: "#fff",
    },
    white: {
      main: "#fff",
      light: "#fff",
      dark: "#eee",
      contrastText: "#000",
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
    h3: {
      fontSize: "1.8rem",
      fontWeight: "600",
    },
    h4: {
      fontSize: "1.5rem",
      fontWeight: "500",
    },
    subtitle1: {
      fontSize: "1.2rem",
      fontWeight: "600",
    },
    subtitle2: {
      fontSize: "0.9rem",
      color: "#C0C0C0",
    },
    body1: {
      fontSize: "1rem",
    },
    body2: {
      fontSize: "0.9rem",
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
        root: ({ theme, ownerState }) => ({
          borderRadius: "100px",
        }),
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
            fontSize: "0.83rem",
            fontWeight: "550",
            ...(ownerState.disableeffects
              ? {}
              : {
                  "&:hover": {
                    backgroundColor: theme.palette.tags[value].dark,
                  },
                  "&:active": {
                    transform: "scale(0.9)",
                  },
                }),
          };
        },
      },
    },
  },
});

theme = responsiveFontSizes(theme);

const MuiTheme = ({ children }) => {
  return <ThemeProvider theme={theme}>{children}</ThemeProvider>;
};

export default MuiTheme;
