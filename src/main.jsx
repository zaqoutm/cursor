import { CssBaseline, ThemeProvider, createTheme } from "@mui/material";
import React, { useMemo, useState } from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import "./styles.css";

const THEME_MODE_KEY = "theme_mode";

function RootApp() {
  const [mode, setMode] = useState(() => {
    try {
      return localStorage.getItem(THEME_MODE_KEY) === "dark" ? "dark" : "light";
    } catch {
      return "light";
    }
  });

  const toggleMode = () => {
    setMode((prev) => {
      const next = prev === "light" ? "dark" : "light";
      try {
        localStorage.setItem(THEME_MODE_KEY, next);
      } catch {
        // ignore storage errors
      }
      return next;
    });
  };

  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode,
          primary: {
            main: "#0071e3",
          },
          secondary: {
            main: "#06c",
          },
          background: mode === "dark"
            ? {
              default: "#0f1115",
              paper: "#161a22",
            }
            : {
              default: "#f5f5f7",
              paper: "#ffffff",
            },
          text: mode === "dark"
            ? {
              primary: "#f5f7fa",
              secondary: "#a8b0bf",
            }
            : {
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
                backgroundColor: mode === "dark" ? "rgba(15, 17, 21, 0.75)" : "rgba(251, 251, 253, 0.8)",
                color: mode === "dark" ? "#f5f7fa" : "#1d1d1f",
                backdropFilter: "saturate(180%) blur(20px)",
                boxShadow: "none",
                borderBottom: mode === "dark" ? "1px solid rgba(255, 255, 255, 0.08)" : "1px solid rgba(0, 0, 0, 0.08)",
              },
            },
          },
          MuiCard: {
            styleOverrides: {
              root: {
                boxShadow: mode === "dark" ? "0 12px 40px rgba(0, 0, 0, 0.35)" : "0 12px 40px rgba(0, 0, 0, 0.06)",
                border: mode === "dark" ? "1px solid rgba(255, 255, 255, 0.08)" : "1px solid rgba(0, 0, 0, 0.06)",
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
      }),
    [mode],
  );

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <BrowserRouter>
        <App mode={mode} onToggleMode={toggleMode} />
      </BrowserRouter>
    </ThemeProvider>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RootApp />
  </React.StrictMode>,
);
