import { Button, Card, CardContent, Chip, Stack, Typography } from "@mui/material";
import { useEffect, useState } from "react";

const SECURED_SIM_KEY = "secured_check_sim"; // "pass" | "fail" | null

export default function HomePage({ t }) {
  const [status, setStatus] = useState("pass");

  useEffect(() => {
    try {
      localStorage.setItem(SECURED_SIM_KEY, "pass");
    } catch {
      // ignore
    }
  }, []);

  return (
    <Card elevation={0} sx={{ bgcolor: "background.paper" }}>
      <CardContent>
        <Stack spacing={3} sx={{ p: { xs: 1, md: 3 } }}>
          <Chip
            label={t.home.chip}
            sx={{ alignSelf: "start", bgcolor: "rgba(0, 113, 227, 0.08)", color: "primary.main" }}
          />
          <Typography variant="h3" component="h1">
            {t.home.title}
          </Typography>
          <Typography variant="body1" color="text.secondary">
            {t.home.description}
          </Typography>

          <Stack spacing={1} sx={{ pt: 1 }}>
            <Typography variant="body2" color="text.secondary">
              {t.home.simulationLabel}
            </Typography>
            <Stack direction="row" spacing={1.5} sx={{ flexWrap: "wrap" }}>
              <Button
                variant="outlined"
                color="success"
                onClick={() => {
                  try {
                    localStorage.setItem(SECURED_SIM_KEY, "pass");
                    setStatus("pass");
                  } catch {
                    // ignore
                  }
                }}
              >
                {t.actions.simulateOk}
              </Button>
              <Button
                variant="outlined"
                color="error"
                onClick={() => {
                  try {
                    localStorage.setItem(SECURED_SIM_KEY, "fail");
                    setStatus("fail");
                  } catch {
                    // ignore
                  }
                }}
              >
                {t.actions.simulateFail}
              </Button>

            </Stack>
          </Stack>

          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <h1 style={{ fontSize: 20, fontWeight: 600, color: status === "pass" ? "green" : "red" }}>
              {t.home.statusPrefix}: {status}
            </h1>
            <Button href="/secured" variant="outlined">
              {t.actions.goToSecured}
            </Button>
          </div>

        </Stack>
      </CardContent>
    </Card>
  );
}
