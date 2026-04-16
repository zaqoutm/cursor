import { AppBar, Box, Button, Container, Toolbar, Typography } from "@mui/material";
import { Link, Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import AboutPage from "./pages/AboutPage";

const navLinkStyles = {
  color: "inherit",
  textDecoration: "none",
};

export default function App() {
  return (
    <Box sx={{ minHeight: "100vh", bgcolor: "background.default" }}>
      <AppBar position="static">
        <Toolbar sx={{ gap: 1 }}>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            Cursor App
          </Typography>
          <Button color="inherit" component={Link} to="/" sx={navLinkStyles}>
            Home
          </Button>
          <Button color="inherit" component={Link} to="/about" sx={navLinkStyles}>
            About
          </Button>
        </Toolbar>
      </AppBar>

      <Container maxWidth="md" sx={{ py: 6 }}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/about" element={<AboutPage />} />
        </Routes>
      </Container>
    </Box>
  );
}
