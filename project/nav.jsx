/* global React */
const { useState: useStateNav, useEffect: useEffectNav } = React;

function TopNav({ onToggleTheme, themeMode, ctaText, onCta }) {
  const [scrolled, setScrolledNav] = useStateNav(false);
  const [onAccent, setOnAccent] = useStateNav(false);
  useEffectNav(() => {
    const handler = () => {
      setScrolledNav(window.scrollY > 24);
      const c = document.getElementById("contact");
      if (c) {
        const r = c.getBoundingClientRect();
        // top nav (~60px) sits over contact bg when top of contact is above 60px
        setOnAccent(r.top < 60 && r.bottom > 60);
      }
    };
    handler();
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, []);
  return (
    <header className={`topnav ${scrolled ? "scrolled" : ""} ${onAccent ? "on-accent" : ""}`}>
      <a href="#hero" className="logo" aria-label="ADI UIXUX home">
        <span className="logo-mark">
          <span>A</span>
        </span>
        <span>ADI UIXUX</span>
      </a>
      <nav className="topnav-center" aria-label="Primary">
        <a href="#work">Work</a>
        <a href="#collage">Brand</a>
        <a href="#about">About</a>
      </nav>
      <div className="topnav-right">
        <button
          className="theme-toggle"
          onClick={onToggleTheme}
          aria-label={`Theme: ${themeMode}. Click to cycle.`}
          title={`Theme: ${themeMode}`}
          data-onboard="theme"
        >
          <ThemeIcon mode={themeMode} />
        </button>
        <a href="#contact" className="cta" onClick={onCta} data-onboard="cta">
          <span className="dot"></span>
          <span className="cta-text">
            <span className="a">Let’s work together</span>
            <span className="b">Say hello</span>
          </span>
          <span className="arrow" aria-hidden="true">→</span>
        </a>
      </div>
    </header>
  );
}

function ThemeIcon({ mode }) {
  // simple iconographic indicator that changes with mode
  if (mode === "auto") {
    return (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
        <circle cx="12" cy="12" r="6" />
        <path d="M12 6 a6 6 0 0 1 0 12" fill="currentColor" />
      </svg>
    );
  }
  if (mode === "dark") {
    return (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
        <path d="M16 14A8 8 0 0 1 10 4a8 8 0 1 0 8 10z" fill="currentColor" stroke="none" />
      </svg>
    );
  }
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
      <circle cx="12" cy="12" r="4" fill="currentColor" stroke="none" />
      <g stroke="currentColor" strokeLinecap="round">
        <line x1="12" y1="3" x2="12" y2="5" />
        <line x1="12" y1="19" x2="12" y2="21" />
        <line x1="3" y1="12" x2="5" y2="12" />
        <line x1="19" y1="12" x2="21" y2="12" />
        <line x1="5.6" y1="5.6" x2="6.8" y2="6.8" />
        <line x1="17.2" y1="17.2" x2="18.4" y2="18.4" />
        <line x1="5.6" y1="18.4" x2="6.8" y2="17.2" />
        <line x1="17.2" y1="6.8" x2="18.4" y2="5.6" />
      </g>
    </svg>
  );
}

/* Left-side progress rail */
function SideRail({ items, active, onJump }) {
  const [onAccentR, setOnAccentR] = useStateNav(false);
  useEffectNav(() => {
    const handler = () => {
      const c = document.getElementById("contact");
      if (!c) return;
      const r = c.getBoundingClientRect();
      const railY = window.innerHeight / 2;
      setOnAccentR(r.top < railY && r.bottom > railY);
    };
    handler();
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, []);
  return (
    <aside className={`siderail ${onAccentR ? "on-accent" : ""}`} aria-label="Section navigator" data-onboard="rail">
      {items.map((it, i) => {
        const isActive = active === it.id;
        return (
          <a
            key={it.id}
            href={`#${it.id}`}
            onClick={(e) => { e.preventDefault(); onJump(it.id); }}
            className={`rail-item ${isActive ? "active" : ""}`}
          >
            <span className="rail-num">{String(i + 1).padStart(2, "0")}</span>
            <span className="rail-track">
              <span className="rail-track-fill" style={{ width: isActive ? "100%" : "0%" }} />
            </span>
            <span className="rail-label">{it.label}</span>
          </a>
        );
      })}
    </aside>
  );
}

/* Hamburger + mobile menu */
function MobileNav({ items, active, onJump }) {
  const [open, setOpen] = useStateNav(false);
  useEffectNav(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);
  return (
    <>
      <button
        className={`hamburger ${open ? "open" : ""}`}
        aria-label="Menu"
        aria-expanded={open}
        onClick={() => setOpen(!open)}
      >
        <span></span><span></span><span></span>
      </button>
      <div className={`mobile-menu ${open ? "open" : ""}`} aria-hidden={!open}>
        <nav>
          {items.map((it, i) => (
            <a
              key={it.id}
              href={`#${it.id}`}
              onClick={(e) => { e.preventDefault(); setOpen(false); onJump(it.id); }}
              style={{ color: active === it.id ? "var(--fg)" : "var(--muted)" }}
            >
              <span className="num">{String(i + 1).padStart(2, "0")}</span>
              <span>{it.label}</span>
            </a>
          ))}
        </nav>
        <div className="menu-foot">
          <span>Bangalore · IN</span>
          <span>©2026</span>
        </div>
      </div>
    </>
  );
}

Object.assign(window, { TopNav, SideRail, MobileNav });
