import { Button, Card, CardContent, Chip, Stack, Typography } from "@mui/material";
import { Link } from "react-router-dom";

export default function HomePage() {
  return (
    <Card elevation={0} sx={{ bgcolor: "background.paper" }}>
      <CardContent>
        <Stack spacing={3} sx={{ p: { xs: 1, md: 3 } }}>
          <Chip
            label="Designed with Material UI"
            sx={{ alignSelf: "start", bgcolor: "rgba(0, 113, 227, 0.08)", color: "primary.main" }}
          />
          <Typography variant="h3" component="h1">
            Home
          </Typography>
          <Typography variant="body1" color="text.secondary">
            A clean landing page with softer neutrals, airy spacing, and a more Apple-inspired
            visual tone.
          </Typography>
          <Button component={Link} to="/about" variant="contained" sx={{ alignSelf: "start" }}>
            Go to About
          </Button>
        </Stack>
      </CardContent>
    </Card>
  );
}
