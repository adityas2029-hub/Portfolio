/* global React */
const { useRef: useRefCol, useEffect: useEffectCol, useState: useStateCol } = React;

/* 10-12 brand / poster works in a horizontal strip with varying widths */
const COLLAGE = [
  { id: "b1",  name: "Kintsugi Studios",  cat: "Identity",    year: "25", w: 420, h: 540, swatch: "art-1" },
  { id: "b2",  name: "Halt & Heat",       cat: "Poster",      year: "25", w: 320, h: 460, swatch: "art-2" },
  { id: "b3",  name: "Open Routes",       cat: "Wayfinding",  year: "24", w: 540, h: 460, swatch: "art-3" },
  { id: "b4",  name: "Folio No. 04",      cat: "Editorial",   year: "24", w: 360, h: 460, swatch: "art-4" },
  { id: "b5",  name: "Field Recordings",  cat: "Identity",    year: "24", w: 420, h: 540, swatch: "art-5" },
  { id: "b6",  name: "MNML / 03",         cat: "Poster",      year: "23", w: 320, h: 460, swatch: "art-6" },
  { id: "b7",  name: "Loop Bicycle Co.",  cat: "Logo system", year: "23", w: 480, h: 460, swatch: "art-7" },
  { id: "b8",  name: "Wreckage Bureau",   cat: "Editorial",   year: "23", w: 360, h: 540, swatch: "art-8" },
  { id: "b9",  name: "Type Specimen / A", cat: "Type design", year: "23", w: 420, h: 460, swatch: "art-9" },
  { id: "b10", name: "Quiet Hours",       cat: "Poster",      year: "22", w: 320, h: 460, swatch: "art-10" },
  { id: "b11", name: "City of Tomorrow",  cat: "Campaign",    year: "22", w: 540, h: 460, swatch: "art-11" },
  { id: "b12", name: "ATELIER \u2014 MK", cat: "Identity",    year: "22", w: 380, h: 540, swatch: "art-12" },
];

function ArtSwatch({ variant, name }) {
  // Brutalist mono SVG placeholders — geometric only, no figurative drawing
  const common = {
    width: "100%", height: "100%", viewBox: "0 0 100 100",
    preserveAspectRatio: "xMidYMid slice",
  };
  const s = { stroke: "currentColor", fill: "none", strokeWidth: 0.7 };
  const f = { fill: "currentColor" };
  const c = "var(--fg)";
  switch (variant) {
    case "art-1": return (
      <svg {...common}><rect x="10" y="10" width="80" height="80" {...s} />
        <circle cx="50" cy="50" r="22" {...f} fillOpacity="0.92" />
        <line x1="10" y1="50" x2="90" y2="50" {...s} />
      </svg>
    );
    case "art-2": return (
      <svg {...common}>
        {[...Array(10)].map((_, i) => (
          <line key={i} x1="10" y1={15 + i * 7} x2="90" y2={15 + i * 7} {...s} />
        ))}
        <rect x="35" y="60" width="30" height="20" {...f} fillOpacity="0.9" />
      </svg>
    );
    case "art-3": return (
      <svg {...common}>
        <path d="M10 80 L50 20 L90 80 Z" {...s} />
        <path d="M30 80 L50 50 L70 80 Z" {...f} fillOpacity="0.9" />
      </svg>
    );
    case "art-4": return (
      <svg {...common}>
        <rect x="15" y="15" width="70" height="70" {...s} />
        <text x="50" y="56" textAnchor="middle" fontFamily="JetBrains Mono, monospace" fontWeight="700" fontSize="28" fill="currentColor">04</text>
      </svg>
    );
    case "art-5": return (
      <svg {...common}>
        <circle cx="50" cy="50" r="35" {...s} />
        <circle cx="50" cy="50" r="20" {...s} />
        <circle cx="50" cy="50" r="6" {...f} />
        <line x1="50" y1="5" x2="50" y2="95" {...s} />
      </svg>
    );
    case "art-6": return (
      <svg {...common}>
        <rect x="10" y="10" width="80" height="80" {...f} fillOpacity="0.92" />
        <text x="50" y="58" textAnchor="middle" fontFamily="JetBrains Mono, monospace" fontWeight="700" fontSize="22" fill="var(--bg)">MNML</text>
      </svg>
    );
    case "art-7": return (
      <svg {...common}>
        <circle cx="32" cy="50" r="22" {...s} />
        <circle cx="68" cy="50" r="22" {...s} />
        <line x1="32" y1="28" x2="68" y2="28" {...s} />
      </svg>
    );
    case "art-8": return (
      <svg {...common}>
        <rect x="20" y="10" width="60" height="80" {...s} />
        {[...Array(5)].map((_, i) => (
          <line key={i} x1="25" y1={25 + i * 12} x2="75" y2={25 + i * 12} {...s} />
        ))}
      </svg>
    );
    case "art-9": return (
      <svg {...common}>
        <text x="50" y="68" textAnchor="middle" fontFamily="JetBrains Mono, monospace" fontWeight="700" fontSize="60" fill="currentColor">A</text>
      </svg>
    );
    case "art-10": return (
      <svg {...common}>
        <rect x="10" y="10" width="80" height="80" {...s} />
        <path d="M10 10 L90 90 M90 10 L10 90" {...s} />
      </svg>
    );
    case "art-11": return (
      <svg {...common}>
        {[...Array(6)].map((_, i) => (
          <rect key={i} x={10 + i * 12} y="20" width="6" height={60 - i * 4} {...f} fillOpacity={1 - i * 0.13} />
        ))}
      </svg>
    );
    case "art-12": return (
      <svg {...common}>
        <polygon points="50,10 90,90 10,90" {...f} fillOpacity="0.92" />
        <text x="50" y="80" textAnchor="middle" fontFamily="JetBrains Mono, monospace" fontWeight="600" fontSize="9" fill="var(--bg)">MK</text>
      </svg>
    );
    default: return <svg {...common}><rect x="10" y="10" width="80" height="80" {...s} /></svg>;
  }
}

function Collage() {
  const trackRef = useRefCol(null);
  const [progress, setProgress] = useStateCol(0);
  const [paused, setPaused] = useStateCol(false);
  const dragState = useRefCol({ active: false, startX: 0, startLeft: 0, moved: 0 });

  // Auto-scroll loop: gently nudges the track right when idle.
  useEffectCol(() => {
    const el = trackRef.current;
    if (!el) return;
    let raf = 0;
    let last = performance.now();
    const tick = (now) => {
      const dt = now - last;
      last = now;
      if (!paused && !dragState.current.active) {
        const max = el.scrollWidth - el.clientWidth;
        if (max > 0) {
          // ~30 px/s feels editorial, not nervous
          const dx = (dt / 1000) * 30;
          let next = el.scrollLeft + dx;
          if (next >= max - 1) next = 0; // loop softly to start
          el.scrollLeft = next;
        }
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [paused]);

  // Drag-to-scroll (mouse + touch)
  useEffectCol(() => {
    const el = trackRef.current;
    if (!el) return;
    const onDown = (e) => {
      dragState.current = {
        active: true,
        startX: (e.touches ? e.touches[0].clientX : e.clientX),
        startLeft: el.scrollLeft,
        moved: 0,
      };
      el.classList.add("dragging");
      setPaused(true);
    };
    const onMove = (e) => {
      if (!dragState.current.active) return;
      const x = e.touches ? e.touches[0].clientX : e.clientX;
      const dx = x - dragState.current.startX;
      dragState.current.moved = Math.abs(dx);
      el.scrollLeft = dragState.current.startLeft - dx;
      if (e.cancelable && e.touches) e.preventDefault();
    };
    const onUp = () => {
      if (!dragState.current.active) return;
      dragState.current.active = false;
      el.classList.remove("dragging");
      // Suppress click immediately after drag
      if (dragState.current.moved > 4) {
        el.querySelectorAll(".collage-card").forEach((c) => (c.style.pointerEvents = "none"));
        setTimeout(() => {
          el.querySelectorAll(".collage-card").forEach((c) => (c.style.pointerEvents = ""));
        }, 50);
      }
    };
    el.addEventListener("mousedown", onDown);
    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseup", onUp);
    el.addEventListener("touchstart", onDown, { passive: true });
    el.addEventListener("touchmove", onMove, { passive: false });
    el.addEventListener("touchend", onUp);
    return () => {
      el.removeEventListener("mousedown", onDown);
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseup", onUp);
      el.removeEventListener("touchstart", onDown);
      el.removeEventListener("touchmove", onMove);
      el.removeEventListener("touchend", onUp);
    };
  }, []);

  useEffectCol(() => {
    const el = trackRef.current;
    if (!el) return;
    const onScroll = () => {
      const max = el.scrollWidth - el.clientWidth;
      setProgress(max > 0 ? el.scrollLeft / max : 0);
    };
    el.addEventListener("scroll", onScroll, { passive: true });
    onScroll();

    // Reveal cards on intersection
    const obs = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) {
          const idx = Number(e.target.getAttribute("data-i") || 0);
          setTimeout(() => e.target.classList.add("in"), idx * 70);
          obs.unobserve(e.target);
        }
      });
    }, { threshold: 0.15, root: null });
    el.querySelectorAll(".collage-card").forEach((card) => obs.observe(card));
    return () => {
      el.removeEventListener("scroll", onScroll);
      obs.disconnect();
    };
  }, []);

  const scrollBy = (dx) => {
    trackRef.current?.scrollBy({ left: dx, behavior: "smooth" });
  };

  return (
    <section id="collage" data-screen-label="03 Brand">
      <div className="section-head">
        <div style={{ display: "flex", gap: 20, alignItems: "baseline" }}>
          <span className="num" style={{ color: "var(--accent)" }}>§ 03 / Brand</span>
          <h2>Side things, marks &amp; posters</h2>
        </div>
        <div className="meta">
          <div>{COLLAGE.length} works · scroll →</div>
        </div>
      </div>

      <div className="collage-wrap"
           onMouseEnter={() => setPaused(true)}
           onMouseLeave={() => setPaused(false)}>
        <div className="collage-track" ref={trackRef}>
          {COLLAGE.map((it, i) => (
            <div
              key={it.id}
              className="collage-card"
              data-i={i}
              style={{ width: it.w, height: it.h }}
            >
              <div className="thumb">
                <ArtSwatch variant={it.swatch} name={it.name} />
              </div>
              <div className="meta">
                <span className="name">{it.name}</span>
                <span className="yr">{it.cat} · ‘{it.year}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="collage-controls">
        <span>// Auto-scrolls · drag to grab · or use arrows</span>
        <div className="collage-progress">
          <div className="bar" style={{ width: `${Math.max(8, progress * 100)}%` }} />
        </div>
        <div className="collage-arrows">
          <button onClick={() => scrollBy(-400)} aria-label="Previous">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7">
              <path d="M19 12H5M11 6l-6 6 6 6" />
            </svg>
          </button>
          <button onClick={() => scrollBy(400)} aria-label="Next">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7">
              <path d="M5 12h14M13 6l6 6-6 6" />
            </svg>
          </button>
        </div>
      </div>
    </section>
  );
}

Object.assign(window, { Collage });
