import { useEffect, useMemo, useState } from "react";
import {
  AppBar,
  Box,
  Button,
  Container,
  Divider,
  Drawer,
  IconButton,
  LinearProgress,
  List,
  ListItemButton,
  ListItemText,
  Stack,
  Toolbar,
  Typography,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import { Link, Route, Routes, useLocation, useNavigate } from "react-router-dom";
import HomePage from "./pages/HomePage";
import AboutPage from "./pages/AboutPage";
import SecuredPage from "./pages/SecuredPage";
import ErrorPage from "./pages/ErrorPage";

const navLinkStyles = {
  color: "text.secondary",
  textDecoration: "none",
  "&:hover": {
    color: "text.primary",
    backgroundColor: "rgba(0, 0, 0, 0.04)",
  },
};

const SECURED_SIM_KEY = "secured_check_sim"; // "pass" | "fail" | null

async function pingOk(url, { timeoutMs }) {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), timeoutMs);
  try {
    const res = await fetch(url, {
      method: "GET",
      headers: { Accept: "application/json" },
      signal: controller.signal,
    });
    return res.ok;
  } finally {
    clearTimeout(timeoutId);
  }
}

function SecuredGate() {
  const navigate = useNavigate();
  const location = useLocation();

  const simMode = useMemo(() => {
    try {
      const v = localStorage.getItem(SECURED_SIM_KEY);
      return v === "pass" || v === "fail" ? v : null;
    } catch {
      return null;
    }
  }, [location.key]);

  useEffect(() => {
    let cancelled = false;

    // check from storage 
    async function run() {
      if (!simMode) return;

      if (simMode === "fail") {
        navigate("/error", {
          replace: true,
          state: { details: "Simulation mode: 'fail' forced failure." },
        });
        return;
      }

      if (simMode === "pass") {
        try {
          // CORS-friendly public endpoint that reliably returns 200.
          const ok = await pingOk("https://api.github.com/", { timeoutMs: 1_000 });
          if (cancelled) return;
          if (!ok) {
            navigate("/error", {
              replace: true,
              state: { details: "HTTP check failed (non-2xx response)." },
            });
          }
        } catch (err) {
          if (cancelled) return;
          navigate("/error", {
            replace: true,
            state: { details: `HTTP check failed: ${err?.name || "Unknown error"}` },
          });
        }
      }

      
    }

    run();
    return () => {
      cancelled = true;
    };
  }, [navigate, simMode]);

  if (simMode === "pass") return <SecuredPage />;

  // While the HTTP check is running, show a tiny loading state.
  return (
    <Box sx={{ py: 2 }}>
      <LinearProgress />
    </Box>
  );
}

export default function App() {
  const [mobileNavOpen, setMobileNavOpen] = useState(false);

  const closeMobileNav = () => setMobileNavOpen(false);
  const openMobileNav = () => setMobileNavOpen(true);

  return (
    <Box
      sx={{
        minHeight: "100vh",
        bgcolor: "background.default",
        color: "text.primary",
        display: "flex",
        flexDirection: "column",
      }}
    >
      {/* header area */}
      <AppBar position="sticky">
        <Container maxWidth="lg">
          <Toolbar sx={{ gap: 1, px: { xs: 0, sm: 1 } }}>
            <Stack direction="row" spacing={1.5} sx={{ flexGrow: 1, alignItems: "center" }}>
              <Box
                sx={{
                  width: 28,
                  height: 28,
                  borderRadius: "50%",
                  display: "grid",
                  placeItems: "center",
                  bgcolor: "#1d1d1f",
                  color: "#fff",
                  fontSize: 14,
                  fontWeight: 600,
                }}
              >
                C
              </Box>
              <Button color="inherit" component={Link} to="/" sx={navLinkStyles}>
                <Typography variant="h6">Cursor App</Typography>
              </Button>
            </Stack>
            <Stack direction="row" spacing={0.5} sx={{ display: { xs: "none", md: "flex" } }}>
              <Button color="inherit" component={Link} to="/" sx={navLinkStyles}>
                Home
              </Button>
              <Button color="inherit" component={Link} to="/about" sx={navLinkStyles}>
                About
              </Button>
              <Button color="inherit" component={Link} to="/secured" sx={navLinkStyles}>
                Secured
              </Button>
            </Stack>

            <IconButton
              aria-label="Open navigation menu"
              onClick={openMobileNav}
              color="inherit"
              edge="end"
              sx={{ display: { xs: "inline-flex", md: "none" } }}
            >
              <MenuIcon />
            </IconButton>

            <Drawer
              anchor="right"
              open={mobileNavOpen}
              onClose={closeMobileNav}
              slotProps={{
                paper: {
                  sx: {
                    width: { xs: "min(86vw, 360px)", sm: 360 },
                    bgcolor: "background.paper",
                  },
                },
              }}
            >
              <Box sx={{ display: "flex", alignItems: "center", px: 2, py: 1.5 }}>
                <Typography variant="subtitle1" sx={{ fontWeight: 600, flex: 1 }}>
                  Menu
                </Typography>
                <IconButton aria-label="Close navigation menu" onClick={closeMobileNav}>
                  <CloseIcon />
                </IconButton>
              </Box>
              <Divider />
              <List sx={{ py: 0 }}>
                <ListItemButton component={Link} to="/" onClick={closeMobileNav}>
                  <ListItemText primary="Home" />
                </ListItemButton>
                <ListItemButton component={Link} to="/about" onClick={closeMobileNav}>
                  <ListItemText primary="About" />
                </ListItemButton>
                <ListItemButton component={Link} to="/secured" onClick={closeMobileNav}>
                  <ListItemText primary="Secured" />
                </ListItemButton>
              </List>
            </Drawer>
          </Toolbar>
        </Container>
      </AppBar>

      {/* routes area */}
      <Box sx={{ flex: 1 }}>
        <Container maxWidth="lg" sx={{ py: { xs: 5, md: 8 } }}>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/secured" element={<SecuredGate />} />
            <Route path="/error" element={<ErrorPage />} />
            <Route path="*" element={<ErrorPage />} />
          </Routes>
        </Container>
      </Box>

      {/* footer area */}
      <Box
        component="footer"
        sx={{
          mt: "auto",
          backgroundColor: "#fbfbfd",
          borderTop: "1px solid rgba(0, 0, 0, 0.08)",
        }}
      >
        <Container maxWidth="lg" sx={{ py: 4 }}>
          <Stack
            direction={{ xs: "column", md: "row" }}
            spacing={3}
            sx={{
              justifyContent: "space-between",
              alignItems: { xs: "flex-start", md: "center" },
            }}
          >
            <Stack direction="row" spacing={1.5} sx={{ alignItems: "center" }}>
              <Box
                sx={{
                  width: 36,
                  height: 36,
                  borderRadius: "50%",
                  display: "grid",
                  placeItems: "center",
                  bgcolor: "#1d1d1f",
                  color: "#fff",
                  fontSize: 16,
                  fontWeight: 600,
                }}
              >
                C
              </Box>
              <Box>
                <Button color="inherit" component={Link} to="/" sx={navLinkStyles}>
                  <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
                    Cursor App
                  </Typography>
                </Button>
              </Box>
            </Stack>

            <Stack
              direction={{ xs: "column", sm: "row" }}
              spacing={{ xs: 1, sm: 2 }}
              divider={<Divider orientation="vertical" flexItem />}
            >
              <Button component={Link} to="/" color="inherit" sx={navLinkStyles}>
                Home
              </Button>
              <Button component={Link} to="/about" color="inherit" sx={navLinkStyles}>
                About
              </Button>
              <Button component={Link} to="/secured" color="inherit" sx={navLinkStyles}>
                Secured
              </Button>
            </Stack>
          </Stack>
        </Container>
      </Box>
    </Box>
  );
}
