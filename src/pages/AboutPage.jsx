import { Card, CardContent, Stack, Typography } from "@mui/material";

export default function AboutPage() {
  return (
    <Card elevation={3}>
      <CardContent>
        <Stack spacing={3}>
          <Typography variant="h3" component="h1">
            About
          </Typography>
          <Typography variant="body1" color="text.secondary">
            This page shows that routing is working and Material UI components are ready to use.
          </Typography>
        </Stack>
      </CardContent>
    </Card>
  );
}
