import { Card, CardContent, Stack, Typography } from "@mui/material";

export default function AboutPage() {
  return (
    <Card elevation={0} sx={{ bgcolor: "background.paper" }}>
      <CardContent>
        <Stack spacing={3} sx={{ p: { xs: 1, md: 3 } }}>
          <Typography variant="h3" component="h1">
            About
          </Typography>
          <Typography variant="body1" color="text.secondary">
            The app now uses a cooler blue accent, soft gray surfaces, darker typography, and a
            footer layout that mirrors the restrained feel of Apple’s website.
          </Typography>
        </Stack>
      </CardContent>
    </Card>
  );
}
