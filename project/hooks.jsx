/* global React */
const { useEffect, useState, useRef, useMemo, useCallback } = React;

/* ============================================================
   THEME HOOK — time-aware + manual override
   ============================================================ */
function useTheme(forceMode) {
  const [theme, setTheme] = useState(() => {
    const stored = localStorage.getItem("adi-theme");
    if (stored === "light" || stored === "dark") return stored;
    return autoTheme();
  });
  const [mode, setMode] = useState(() => localStorage.getItem("adi-theme-mode") || "auto"); // 'auto' | 'light' | 'dark'

  function autoTheme() {
    const h = new Date().getHours();
    return h >= 19 || h < 6 ? "dark" : "light";
  }

  useEffect(() => {
    if (forceMode && forceMode !== "auto") {
      setTheme(forceMode);
      setMode(forceMode);
      return;
    }
    if (mode === "auto") setTheme(autoTheme());
    else setTheme(mode);
  }, [mode, forceMode]);

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("adi-theme", theme);
    localStorage.setItem("adi-theme-mode", mode);
  }, [theme, mode]);

  const cycle = useCallback(() => {
    setMode((m) => (m === "auto" ? "light" : m === "light" ? "dark" : "auto"));
  }, []);

  return { theme, mode, setMode, cycle };
}

/* ============================================================
   SCROLL POSITION — section anchors
   ============================================================ */
function useScrollSpy(ids) {
  const [active, setActive] = useState(ids[0]);
  const [progress, setProgress] = useState(0);
  useEffect(() => {
    const handler = () => {
      const y = window.scrollY + window.innerHeight * 0.35;
      let found = ids[0];
      for (const id of ids) {
        const el = document.getElementById(id);
        if (!el) continue;
        if (el.offsetTop <= y) found = id;
      }
      setActive(found);
      const total = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(total > 0 ? Math.min(1, window.scrollY / total) : 0);
    };
    handler();
    window.addEventListener("scroll", handler, { passive: true });
    window.addEventListener("resize", handler);
    return () => {
      window.removeEventListener("scroll", handler);
      window.removeEventListener("resize", handler);
    };
  }, [ids.join(",")]);
  return { active, progress };
}

/* ============================================================
   SCROLL-BOUND TONE SHIFT
   Respects the user's chosen theme. Instead of inverting wholesale,
   we shift the bg between two warm tones within the same family as
   you scroll between sections. The Contact section is treated as a
   single bold accent moment (handled in its own CSS).
   ============================================================ */
function useToneBlend(baseTheme) {
  useEffect(() => {
    // Keep the chosen theme stable.
    document.documentElement.setAttribute("data-theme", baseTheme);

    const root = document.documentElement;
    const handler = () => {
      const vh = window.innerHeight;
      const scrolled = window.scrollY;
      // Subtle bg tone shift only: bg interpolates between --bg and --bg-2
      // based on overall scroll progress (0..1).
      const total = document.documentElement.scrollHeight - vh;
      const p = total > 0 ? Math.min(1, scrolled / total) : 0;
      // Smooth interpolation. We expose it as a CSS variable that pages
      // can use to mix tones if they want, but the body bg stays --bg.
      root.style.setProperty("--scroll-progress", p.toFixed(3));
    };
    handler();
    window.addEventListener("scroll", handler, { passive: true });
    window.addEventListener("resize", handler);
    return () => {
      window.removeEventListener("scroll", handler);
      window.removeEventListener("resize", handler);
    };
  }, [baseTheme]);
}

Object.assign(window, { useTheme, useScrollSpy, useToneBlend });
