import { Card, CardContent, Stack, Typography } from "@mui/material";

export default function AboutPage({ t }) {
  return (
    <Card elevation={0} sx={{ bgcolor: "background.paper" }}>
      <CardContent>
        <Stack spacing={3} sx={{ p: { xs: 1, md: 3 } }}>
          <Typography variant="h3" component="h1">
            {t.about.title}
          </Typography>
          <Typography variant="body1" color="text.secondary">
            {t.about.description}
          </Typography>
        </Stack>
      </CardContent>
    </Card>
  );
}
