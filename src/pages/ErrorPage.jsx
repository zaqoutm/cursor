import { useEffect, useRef } from "react";
import { Button, Card, CardContent, Stack, Typography } from "@mui/material";
import { Link, useLocation } from "react-router-dom";
import { animate, createTimeline, stagger } from "animejs";

export default function ErrorPage() {
  const location = useLocation();
  const details = location.state?.details;
  const containerRef = useRef(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const timeline = createTimeline({ defaults: { ease: "inOutExpo" } })
      .add(".error-digit", {
        y: [-40, 0],
        opacity: [0, 1],
        scale: [0.6, 1],
        duration: 900,
        delay: stagger(130),
      })
      .add(
        ".error-pulse",
        {
          scale: [0.96, 1.05, 1],
          opacity: [0.25, 0.6, 0.25],
          duration: 1500,
          loop: true,
        },
        200,
      );

    animate(".error-digit", {
      rotate: [0, 2, -2, 0],
      duration: 2200,
      delay: stagger(170),
      loop: true,
      ease: "inOut(3)",
    });

    return () => {
      timeline.cancel();
    };
  }, []);

  return (
    <Card elevation={0} sx={{ bgcolor: "background.paper", overflow: "hidden" }}>
      <CardContent>
        <Stack ref={containerRef} spacing={3} sx={{ p: { xs: 1, md: 3 }, maxWidth: 720 }}>
          <Stack sx={{ position: "relative", py: 1.5 }}>
            <div
              className="error-pulse"
              aria-hidden
              style={{
                position: "absolute",
                inset: "50% auto auto 50%",
                width: 180,
                height: 180,
                transform: "translate(-50%, -50%)",
                borderRadius: "999px",
                background: "radial-gradient(circle, rgba(227, 76, 0, 0.2) 0%, rgba(0,113,227,0) 70%)",
                pointerEvents: "none",
              }}
            />
            <Stack direction="row" spacing={1} sx={{ justifyContent: "center", alignItems: "center" }}>
              <Typography className="error-digit" variant="h2" component="span" sx={{ fontWeight: 700 }}>
                4
              </Typography>
              <Typography className="error-digit" variant="h2" component="span" sx={{ fontWeight: 700 }}>
                0
              </Typography>
              <Typography className="error-digit" variant="h2" component="span" sx={{ fontWeight: 700 }}>
                4
              </Typography>
            </Stack>
          </Stack>
          <Typography variant="h4" component="h1">
            Page not found
          </Typography>
          <Typography variant="body1" color="text.secondary">
            The page you requested does not exist, or you were redirected here after a failed check.
          </Typography>
          {details ? (
            <Typography variant="body2" color="text.secondary" sx={{ whiteSpace: "pre-wrap" }}>
              {String(details)}
            </Typography>
          ) : null}
          <Stack direction="row" spacing={1.5} sx={{ flexWrap: "wrap" }}>
            <Button component={Link} to="/" variant="contained">
              Back to Home
            </Button>
          </Stack>
        </Stack>
      </CardContent>
    </Card>
  );
}

