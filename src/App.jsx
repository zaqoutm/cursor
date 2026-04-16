import CloseIcon from "@mui/icons-material/Close";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import LightModeIcon from "@mui/icons-material/LightMode";
import MenuIcon from "@mui/icons-material/Menu";
import {
  AppBar,
  Box,
  Button,
  Container,
  Divider,
  Drawer,
  IconButton,
  LinearProgress,
  List,
  ListItemButton,
  ListItemText,
  Menu,
  MenuItem,
  Stack,
  Toolbar,
  Tooltip,
  Typography,
} from "@mui/material";
import { useEffect, useMemo, useState } from "react";
import { Link, Route, Routes, useLocation, useNavigate } from "react-router-dom";
import AboutPage from "./pages/AboutPage";
import ErrorPage from "./pages/ErrorPage";
import HomePage from "./pages/HomePage";
import SecuredPage from "./pages/SecuredPage";

const navLinkStyles = {
  color: "text.secondary",
  textDecoration: "none",
  "&:hover": {
    color: "text.primary",
    backgroundColor: "rgba(0, 0, 0, 0.04)",
  },
};

const SECURED_SIM_KEY = "secured_check_sim"; // "pass" | "fail" | null
const LANGUAGE_KEY = "app_language";

const LANGUAGES = [
  { code: "en", label: "English", flag: "🇺🇸" },
  { code: "ar", label: "Arabic", flag: "🇸🇦" },
  { code: "es", label: "Spanish", flag: "🇪🇸" },
];

const TRANSLATIONS = {
  en: {
    appName: "Cursor App",
    nav: { home: "Home", about: "About", secured: "Secured", menu: "Menu" },
    actions: {
      switchToLight: "Switch to light mode",
      switchToDark: "Switch to dark mode",
      changeLanguage: "Change language",
      openNav: "Open navigation menu",
      closeNav: "Close navigation menu",
      unlock: "Unlock",
      clear: "Clear",
      lock: "Lock",
      goToSecured: "Go to Secured",
      backHome: "Back to Home",
      simulateOk: "Simulate 200 OK",
      simulateFail: "Simulate failure",
    },
    home: {
      chip: "Designed with Material UI",
      title: "Home",
      description:
        "A clean landing page with softer neutrals, airy spacing, and a more Apple-inspired visual tone.",
      simulationLabel: "Simulation (affects the secured middleware check):",
      statusPrefix: "Status",
    },
    about: {
      title: "About",
      description:
        "The app now uses a cooler blue accent, soft gray surfaces, darker typography, and a footer layout that mirrors the restrained feel of Apple's website.",
    },
    secured: {
      title: "Secured",
      unlockedDescription: "You are in. This content is protected by a simple numeric PIN.",
      lockedDescription: "Enter the 4-digit PIN to continue.",
      statusLocked: "Status: Locked",
      statusUnlocked: "Status: Unlocked",
      pinHint: "Hint: the PIN is 0000.",
      pinError: "Incorrect PIN. Try 0000.",
      pinDigitLabel: "PIN digit",
    },
    error: {
      title: "Page not found",
      description:
        "The page you requested does not exist, or you were redirected here after a failed check.",
      simFailDetails: "Simulation mode: fail forced failure.",
      httpFailDetails: "HTTP check failed (non-2xx response).",
      httpFailWithReason: "HTTP check failed:",
    },
  },
  ar: {
    appName: "تطبيق كورسر",
    nav: { home: "الرئيسية", about: "حول", secured: "المؤمنة", menu: "القائمة" },
    actions: {
      switchToLight: "التبديل إلى الوضع الفاتح",
      switchToDark: "التبديل إلى الوضع الداكن",
      changeLanguage: "تغيير اللغة",
      openNav: "فتح قائمة التنقل",
      closeNav: "إغلاق قائمة التنقل",
      unlock: "فتح",
      clear: "مسح",
      lock: "قفل",
      goToSecured: "الانتقال إلى الصفحة المؤمنة",
      backHome: "العودة إلى الرئيسية",
      simulateOk: "محاكاة نجاح 200",
      simulateFail: "محاكاة فشل",
    },
    home: {
      chip: "مصمم باستخدام Material UI",
      title: "الرئيسية",
      description: "صفحة رئيسية نظيفة بألوان محايدة ومساحات مريحة وطابع بصري مستوحى من Apple.",
      simulationLabel: "المحاكاة (تؤثر على فحص حماية الصفحة المؤمنة):",
      statusPrefix: "الحالة",
    },
    about: {
      title: "حول",
      description:
        "يستخدم التطبيق الآن لونًا أزرق أكثر برودة، وخلفيات رمادية ناعمة، وخطوطًا أغمق، وتذييلًا يعكس الطابع الهادئ لموقع Apple.",
    },
    secured: {
      title: "المؤمنة",
      unlockedDescription: "تم الدخول بنجاح. هذا المحتوى محمي برمز PIN رقمي بسيط.",
      lockedDescription: "أدخل رمز PIN المكون من 4 أرقام للمتابعة.",
      statusLocked: "الحالة: مقفلة",
      statusUnlocked: "الحالة: مفتوحة",
      pinHint: "تلميح: رمز PIN هو 0000.",
      pinError: "رمز PIN غير صحيح. جرّب 0000.",
      pinDigitLabel: "رقم PIN",
    },
    error: {
      title: "الصفحة غير موجودة",
      description: "الصفحة المطلوبة غير موجودة، أو تمت إعادة توجيهك بعد فشل التحقق.",
      simFailDetails: "وضع المحاكاة: fail تسبب في الفشل.",
      httpFailDetails: "فشل فحص HTTP (استجابة ليست 2xx).",
      httpFailWithReason: "فشل فحص HTTP:",
    },
  },
  es: {
    appName: "Aplicacion Cursor",
    nav: { home: "Inicio", about: "Acerca de", secured: "Segura", menu: "Menu" },
    actions: {
      switchToLight: "Cambiar a modo claro",
      switchToDark: "Cambiar a modo oscuro",
      changeLanguage: "Cambiar idioma",
      openNav: "Abrir menu de navegacion",
      closeNav: "Cerrar menu de navegacion",
      unlock: "Desbloquear",
      clear: "Limpiar",
      lock: "Bloquear",
      goToSecured: "Ir a Segura",
      backHome: "Volver a Inicio",
      simulateOk: "Simular 200 OK",
      simulateFail: "Simular fallo",
    },
    home: {
      chip: "Disenado con Material UI",
      title: "Inicio",
      description:
        "Una pagina principal limpia con tonos neutros suaves, espaciado amplio y una estetica inspirada en Apple.",
      simulationLabel: "Simulacion (afecta la verificacion de la ruta segura):",
      statusPrefix: "Estado",
    },
    about: {
      title: "Acerca de",
      description:
        "La app ahora usa un acento azul mas moderno, superficies grises suaves, tipografia mas oscura y un pie de pagina con estilo sobrio inspirado en Apple.",
    },
    secured: {
      title: "Segura",
      unlockedDescription: "Has entrado. Este contenido esta protegido por un PIN numerico simple.",
      lockedDescription: "Ingresa el PIN de 4 digitos para continuar.",
      statusLocked: "Estado: Bloqueada",
      statusUnlocked: "Estado: Desbloqueada",
      pinHint: "Pista: el PIN es 0000.",
      pinError: "PIN incorrecto. Prueba 0000.",
      pinDigitLabel: "Digito de PIN",
    },
    error: {
      title: "Pagina no encontrada",
      description:
        "La pagina solicitada no existe, o fuiste redirigido aqui despues de una verificacion fallida.",
      simFailDetails: "Modo simulacion: fail forzo un fallo.",
      httpFailDetails: "La comprobacion HTTP fallo (respuesta no 2xx).",
      httpFailWithReason: "La comprobacion HTTP fallo:",
    },
  },
};

async function pingOk(url, { timeoutMs }) {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), timeoutMs);
  try {
    const res = await fetch(url, {
      method: "GET",
      headers: { Accept: "application/json" },
      signal: controller.signal,
    });
    return res.ok;
  } finally {
    clearTimeout(timeoutId);
  }
}

function SecuredGate({ t }) {
  const navigate = useNavigate();
  const location = useLocation();

  const simMode = useMemo(() => {
    try {
      const v = localStorage.getItem(SECURED_SIM_KEY);
      return v === "pass" || v === "fail" ? v : null;
    } catch {
      return null;
    }
  }, [location.key]);

  useEffect(() => {
    let cancelled = false;

    // check from storage 
    async function run() {
      if (!simMode) return;

      if (simMode === "fail") {
        navigate("/error", {
          replace: true,
          state: { details: t.error.simFailDetails },
        });
        return;
      }

      if (simMode === "pass") {
        try {
          // CORS-friendly public endpoint that reliably returns 200.
          const ok = await pingOk("https://api.github.com/", { timeoutMs: 1_000 });
          if (cancelled) return;
          if (!ok) {
            navigate("/error", {
              replace: true,
              state: { details: t.error.httpFailDetails },
            });
          }
        } catch (err) {
          if (cancelled) return;
          navigate("/error", {
            replace: true,
            state: { details: `${t.error.httpFailWithReason} ${err?.name || "Unknown error"}` },
          });
        }
      }


    }

    run();
    return () => {
      cancelled = true;
    };
  }, [navigate, simMode, t]);

  if (simMode === "pass") return <SecuredPage t={t} />;

  // While the HTTP check is running, show a tiny loading state.
  return (
    <Box sx={{ py: 2 }}>
      <LinearProgress />
    </Box>
  );
}

export default function App({ mode = "light", onToggleMode }) {
  const [mobileNavOpen, setMobileNavOpen] = useState(false);
  const [languageCode, setLanguageCode] = useState(() => {
    try {
      const saved = localStorage.getItem(LANGUAGE_KEY);
      return LANGUAGES.some((lang) => lang.code === saved) ? saved : "en";
    } catch {
      return "en";
    }
  });
  const [languageMenuAnchor, setLanguageMenuAnchor] = useState(null);

  const closeMobileNav = () => setMobileNavOpen(false);
  const openMobileNav = () => setMobileNavOpen(true);
  const openLanguageMenu = (event) => setLanguageMenuAnchor(event.currentTarget);
  const closeLanguageMenu = () => setLanguageMenuAnchor(null);

  const currentLanguage = LANGUAGES.find((lang) => lang.code === languageCode) ?? LANGUAGES[0];
  const t = TRANSLATIONS[languageCode] ?? TRANSLATIONS.en;
  const isRtl = languageCode === "ar";

  useEffect(() => {
    document.documentElement.lang = languageCode;
    document.documentElement.dir = isRtl ? "rtl" : "ltr";

  }, [isRtl, languageCode]);

  const setLanguage = (code) => {
    setLanguageCode(code);
    try {
      localStorage.setItem(LANGUAGE_KEY, code);
    } catch {
      // ignore storage errors
    }
    closeLanguageMenu();
  };

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
      <AppBar position="sticky" style={{ direction: 'ltr' }}>
        <Container maxWidth="lg">
          <Toolbar sx={{ gap: 1, px: { xs: 0, sm: 1 } }}>
            <Stack direction="row" spacing={1.5} sx={{ flexGrow: 1, alignItems: "center" }}>
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
              <Button color="inherit" component={Link} to="/" sx={navLinkStyles}>
                <Typography variant="h6">{t.appName}</Typography>
              </Button>
            </Stack>


            {/* links */}
            <Stack direction="row" spacing={0.5} sx={{ display: { xs: "none", md: "flex" } }}>
              <Button color="inherit" component={Link} to="/" sx={navLinkStyles}>
                {t.nav.home}
              </Button>
              <Button color="inherit" component={Link} to="/about" sx={navLinkStyles}>
                {t.nav.about}
              </Button>
              <Button color="inherit" component={Link} to="/secured" sx={navLinkStyles}>
                {t.nav.secured}
              </Button>
            </Stack>

            {/* action buttons, dark, lang */}
            <Stack direction="row" spacing={0.5} sx={{ alignItems: "center", padding: '0 13px' }} style={{ backgroundColor: mode == 'dark' ? 'rgba(53 53 53)' : '#f3f3f3', borderRadius: 13, }}>
              <Tooltip title={mode === "dark" ? t.actions.switchToLight : t.actions.switchToDark}>
                <IconButton
                  aria-label={mode === "dark" ? t.actions.switchToLight : t.actions.switchToDark}
                  onClick={onToggleMode}
                  color="inherit"
                >
                  {mode === "dark" ? <LightModeIcon /> : <DarkModeIcon />}
                </IconButton>
              </Tooltip>
              |
              <Button
                color="inherit"
                onClick={openLanguageMenu}
                sx={{ minWidth: "fit-content", px: 1.5 }}
                aria-label={t.actions.changeLanguage}
              >
                {currentLanguage.flag} {currentLanguage.code.toUpperCase()}
              </Button>
            </Stack>

            <IconButton
              aria-label={t.actions.openNav}
              onClick={openMobileNav}
              color="inherit"
              edge="end"
              sx={{ display: { xs: "inline-flex", md: "none" } }}
            >
              <MenuIcon />
            </IconButton>

            <Drawer
              anchor="right"
              open={mobileNavOpen}
              onClose={closeMobileNav}
              slotProps={{
                paper: {
                  sx: {
                    width: { xs: "min(86vw, 360px)", sm: 360 },
                    bgcolor: "background.paper",
                  },
                },
              }}
            >
              <Box sx={{ display: "flex", alignItems: "center", px: 2, py: 1.5 }}>
                <Typography variant="subtitle1" sx={{ fontWeight: 600, flex: 1 }}>
                  {t.nav.menu}
                </Typography>
                <IconButton aria-label={t.actions.closeNav} onClick={closeMobileNav}>
                  <CloseIcon />
                </IconButton>
              </Box>
              <Divider />
              <List sx={{ py: 0 }}>
                <ListItemButton onClick={onToggleMode}>
                  <ListItemText
                    primary={mode === "dark" ? t.actions.switchToLight : t.actions.switchToDark}
                  />
                </ListItemButton>
                <ListItemButton component={Link} to="/" onClick={closeMobileNav}>
                  <ListItemText primary={t.nav.home} />
                </ListItemButton>
                <ListItemButton component={Link} to="/about" onClick={closeMobileNav}>
                  <ListItemText primary={t.nav.about} />
                </ListItemButton>
                <ListItemButton component={Link} to="/secured" onClick={closeMobileNav}>
                  <ListItemText primary={t.nav.secured} />
                </ListItemButton>
              </List>
            </Drawer>
            <Menu
              anchorEl={languageMenuAnchor}
              open={Boolean(languageMenuAnchor)}
              onClose={closeLanguageMenu}
            >
              {LANGUAGES.map((language) => (
                <MenuItem
                  key={language.code}
                  selected={language.code === currentLanguage.code}
                  onClick={() => setLanguage(language.code)}
                >
                  {language.flag} {language.label}
                </MenuItem>
              ))}
            </Menu>
          </Toolbar>
        </Container>
      </AppBar>

      {/*  */}
      {/*  */}
      {/* routes area */}
      <Box sx={{ flex: 1 }}>
        <Container maxWidth="lg" sx={{ py: { xs: 5, md: 8 } }}>
          <Routes>
            <Route path="/" element={<HomePage t={t} />} />
            <Route path="/about" element={<AboutPage t={t} />} />
            <Route path="/secured" element={<SecuredGate t={t} />} />
            <Route path="/error" element={<ErrorPage t={t} />} />
            <Route path="*" element={<ErrorPage t={t} />} />
          </Routes>
        </Container>
      </Box>

      {/*  */}
      {/*  */}
      {/* footer area */}
      <Box
        component="footer"
        sx={{
          mt: "auto",
          backgroundColor: "background.paper",
          borderTop: (theme) =>
            theme.palette.mode === "dark"
              ? "1px solid rgba(255, 255, 255, 0.08)"
              : "1px solid rgba(0, 0, 0, 0.08)",
        }}
      >
        <Container maxWidth="lg" sx={{ py: 4 }}>
          <Stack
            direction={{ xs: "column", md: "row" }}
            spacing={3}
            sx={{
              justifyContent: "space-between",
              alignItems: { xs: "flex-start", md: "center" },
            }}
          >
            <Stack direction="row" spacing={1.5} sx={{ alignItems: "center" }}>
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
                <Button color="inherit" component={Link} to="/" sx={navLinkStyles}>
                  <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
                    {t.appName}
                  </Typography>
                </Button>
              </Box>
            </Stack>

            <Stack
              direction={{ xs: "column", sm: "row" }}
              spacing={{ xs: 1, sm: 2 }}
              divider={<Divider orientation="vertical" flexItem />}
            >
              <Button component={Link} to="/" color="inherit" sx={navLinkStyles}>
                {t.nav.home}
              </Button>
              <Button component={Link} to="/about" color="inherit" sx={navLinkStyles}>
                {t.nav.about}
              </Button>
              <Button component={Link} to="/secured" color="inherit" sx={navLinkStyles}>
                {t.nav.secured}
              </Button>
            </Stack>
          </Stack>
        </Container>
      </Box>
    </Box>
  );
}
