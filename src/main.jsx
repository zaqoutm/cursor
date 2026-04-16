import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { CssBaseline, ThemeProvider, createTheme } from "@mui/material";
import App from "./App";
import "./styles.css";

const theme = createTheme({
  palette: {
    mode: "light",
    primary: {
      main: "#0071e3",
    },
    secondary: {
      main: "#06c",
    },
    background: {
      default: "#f5f5f7",
      paper: "#ffffff",
    },
    text: {
      primary: "#1d1d1f",
      secondary: "#6e6e73",
    },
  },
  shape: {
    borderRadius: 20,
  },
  typography: {
    fontFamily:
      '-apple-system, BlinkMacSystemFont, "SF Pro Text", "SF Pro Display", "Helvetica Neue", Arial, sans-serif',
    h3: {
      fontWeight: 600,
      letterSpacing: "-0.02em",
    },
    h6: {
      fontWeight: 600,
      letterSpacing: "-0.01em",
    },
    button: {
      fontWeight: 500,
      textTransform: "none",
    },
  },
  components: {
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundColor: "rgba(251, 251, 253, 0.8)",
          color: "#1d1d1f",
          backdropFilter: "saturate(180%) blur(20px)",
          boxShadow: "none",
          borderBottom: "1px solid rgba(0, 0, 0, 0.08)",
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          boxShadow: "0 12px 40px rgba(0, 0, 0, 0.06)",
          border: "1px solid rgba(0, 0, 0, 0.06)",
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        contained: {
          borderRadius: 999,
          paddingInline: 20,
          boxShadow: "none",
        },
        outlined: {
          borderRadius: 999,
          paddingInline: 20,
        },
      },
    },
  },
});

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </ThemeProvider>
  </React.StrictMode>,
);
