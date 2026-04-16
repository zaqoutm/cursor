import {
  AppBar,
  Box,
  Button,
  Container,
  Divider,
  Stack,
  Toolbar,
  Typography,
} from "@mui/material";
import { Link, Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import AboutPage from "./pages/AboutPage";

const navLinkStyles = {
  color: "text.secondary",
  textDecoration: "none",
  "&:hover": {
    color: "text.primary",
    backgroundColor: "rgba(0, 0, 0, 0.04)",
  },
};

export default function App() {
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
            <Stack direction="row" spacing={1.5} alignitems="center" sx={{ flexGrow: 1 }}>
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
              <Typography variant="h6">Cursor App</Typography>
            </Stack>
            <Button color="inherit" component={Link} to="/" sx={navLinkStyles}>
              Home
            </Button>
            <Button color="inherit" component={Link} to="/about" sx={navLinkStyles}>
              About
            </Button>
          </Toolbar>
        </Container>
      </AppBar>

      {/* routes area */}
      <Box sx={{ flex: 1 }}>
        <Container maxWidth="lg" sx={{ py: { xs: 5, md: 8 } }}>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/about" element={<AboutPage />} />
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
            justifycontent="space-between"
            alignitems={{ xs: "flex-start", md: "center" }}
          >
            <Stack direction="row" spacing={1.5} alignitems="center">
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
                <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
                  Cursor App
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Minimal interface inspired by Apple’s light palette.
                </Typography>
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
            </Stack>
          </Stack>
        </Container>
      </Box>
    </Box>
  );
}
