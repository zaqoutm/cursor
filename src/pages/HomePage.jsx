import { Button, Card, CardContent, Stack, Typography } from "@mui/material";
import { Link } from "react-router-dom";

export default function HomePage() {
  return (
    <Card elevation={3}>
      <CardContent>
        <Stack spacing={3}>
          <Typography variant="h3" component="h1">
            Home
          </Typography>
          <Typography variant="body1" color="text.secondary">
            This is the home page of your React app using Material UI and React Router.
          </Typography>
          <Button component={Link} to="/about" variant="contained" sx={{ alignSelf: "start" }}>
            Go to About
          </Button>
        </Stack>
      </CardContent>
    </Card>
  );
}
