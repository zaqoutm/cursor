import { Box, Button, Card, CardContent, Stack, TextField, Typography } from "@mui/material";
import React from "react";

const EXPECTED_PIN = "0000";
const STORAGE_KEY = "secured_unlocked";

function isDigit(value) {
  return /^[0-9]$/.test(value);
}

export default function SecuredPage({ t }) {
  const [pin, setPin] = React.useState(["", "", "", ""]);
  const [error, setError] = React.useState("");
  const [unlocked, setUnlocked] = React.useState(() => {
    try {
      return sessionStorage.getItem(STORAGE_KEY) === "true";
    } catch {
      return false;
    }
  });

  const inputsRef = React.useRef([]);

  const currentPin = pin.join("");

  const reset = React.useCallback(() => {
    setPin(["", "", "", ""]);
    setError("");
    requestAnimationFrame(() => inputsRef.current?.[0]?.focus?.());
  }, []);

  const lock = React.useCallback(() => {
    setUnlocked(false);
    try {
      sessionStorage.removeItem(STORAGE_KEY);
    } catch {
      // ignore
    }
    reset();
  }, [reset]);

  const unlock = React.useCallback(() => {
    setUnlocked(true);
    setError("");
    try {
      sessionStorage.setItem(STORAGE_KEY, "true");
    } catch {
      // ignore
    }
  }, []);

  const onChangeDigit = (idx) => (e) => {
    const raw = e.target.value ?? "";
    const nextChar = raw.slice(-1);
    if (nextChar !== "" && !isDigit(nextChar)) return;

    setPin((prev) => {
      const copy = [...prev];
      copy[idx] = nextChar;
      return copy;
    });
    setError("");

    if (nextChar !== "") {
      requestAnimationFrame(() => inputsRef.current?.[idx + 1]?.focus?.());
    }
  };

  const onKeyDown = (idx) => (e) => {
    if (e.key === "Backspace" && pin[idx] === "" && idx > 0) {
      e.preventDefault();
      setPin((prev) => {
        const copy = [...prev];
        copy[idx - 1] = "";
        return copy;
      });
      requestAnimationFrame(() => inputsRef.current?.[idx - 1]?.focus?.());
      return;
    }

    if (e.key === "Enter") {
      e.preventDefault();
      if (currentPin.length !== 4) return;
      if (currentPin === EXPECTED_PIN) unlock();
      else setError(t.secured.pinError);
    }
  };

  React.useEffect(() => {
    if (unlocked) return;
    const filled = pin.every((d) => d !== "");
    if (!filled) return;
    if (currentPin === EXPECTED_PIN) unlock();
    else setError(t.secured.pinError);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentPin]);

  if (unlocked) {
    return (
      <Card elevation={0} sx={{ bgcolor: "background.paper" }}>
        <CardContent>
          <Stack spacing={2.5} sx={{ p: { xs: 1, md: 3 } }}>
            <Typography variant="h3" component="h1">
              {t.secured.title}
            </Typography>
            <Typography variant="body1" color="text.secondary">
              {t.secured.unlockedDescription}
            </Typography>
            <Stack direction="row" spacing={1.5} style={{ gap: 5, alignItems: "center" }}>
            <Box
                sx={{
                  width: 10,
                  height: 10,
                  borderRadius: "50%",
                  bgcolor: "success.main",
                  boxShadow: "0 0 0 6px rgba(52, 199, 89, 0.12)",
                }}
              />
              <Typography variant="body2" color="text.secondary">
                {t.secured.statusUnlocked}
              </Typography>
            </Stack>
            <Box>
              <Button variant="outlined" onClick={lock}>
                {t.actions.lock}
              </Button>
            </Box>
          </Stack>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card elevation={0} sx={{ bgcolor: "background.paper" }}>
      <CardContent>
        <Stack spacing={3} sx={{ p: { xs: 1, md: 3 }, maxWidth: 520 }}>
          <Stack spacing={1}>
            <Typography variant="h3" component="h1">
              {t.secured.title}
            </Typography>
            <Typography variant="body1" color="text.secondary">
              {t.secured.lockedDescription}
            </Typography>
          </Stack>

          <Stack direction="row" spacing={1.5} style={{ gap: 5, alignItems: "center" }}>
            <Box
              sx={{
                width: 10,
                height: 10,
                borderRadius: "50%",
                bgcolor: "warning.main",
                boxShadow: "0 0 0 6px rgba(15, 13, 12, 0.14)",
              }}
            />
            <Typography variant="body2" color="text.secondary">
              {t.secured.statusLocked}
            </Typography>
          </Stack>

          <Stack direction="row" spacing={1.5}>
            {pin.map((digit, idx) => (
              <TextField
                key={idx}
                value={digit}
                onChange={onChangeDigit(idx)}
                onKeyDown={onKeyDown(idx)}
                inputRef={(el) => {
                  inputsRef.current[idx] = el;
                }}
                autoFocus={idx === 0}
                variant="outlined"
                error={Boolean(error)}
                inputprops={{
                  inputMode: "numeric",
                  pattern: "[0-9]*",
                  maxLength: 1,
                  style: { textAlign: "center", fontSize: 20, padding: 0, height: 52 },
                  "aria-label": `${t.secured.pinDigitLabel} ${idx + 1}`,
                }}
                sx={{
                  width: 64,
                  "& .MuiOutlinedInput-root": {
                    borderRadius: 14,
                    backgroundColor: "rgba(0, 0, 0, 0.02)",
                  },
                }}
              />
            ))}
          </Stack>

          <Typography
            variant="body2"
            color={error ? "error.main" : "text.secondary"}
            sx={{ minHeight: 22 }}
          >
            {error || t.secured.pinHint}
          </Typography>

          <Stack direction="row" spacing={1.5}>
            <Button
              variant="contained"
              onClick={() => {
                if (currentPin.length !== 4) return;
                if (currentPin === EXPECTED_PIN) unlock();
                else setError(t.secured.pinError);
              }}
              disabled={currentPin.length !== 4}
            >
              {t.actions.unlock}
            </Button>
            <Button variant="outlined" onClick={reset}>
              {t.actions.clear}
            </Button>
          </Stack>
        </Stack>
      </CardContent>
    </Card>
  );
}

