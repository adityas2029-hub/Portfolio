/* global React */
const { useRef: useRefWork, useEffect: useEffectWork } = React;

const CASE_STUDIES = [
  {
    id: "cs-01",
    num: "C/01",
    href: "case-studies/01-dating.html",
    title: "Dating, designed for neurodivergent minds",
    role: "Lead Product Designer · 0 → 1",
    sub: "A dating product built around sensory load, communication style and consent — not just swipes. Research-led, made with the people it’s for.",
    tags: ["Consumer", "Research-led", "Inclusive", "iOS"],
    year: "2025",
    duration: "6 months",
  },
  {
    id: "cs-02",
    num: "C/02",
    href: "case-studies/02-mobility.html",
    title: "How a city decides to move",
    role: "Systems & Service Designer",
    sub: "Re-routing how a 12M-person city chooses between transit, ride-share and personal mobility. A platform problem dressed up as a UI.",
    tags: ["GovTech", "Service design", "Strategy", "Multi-modal"],
    year: "2024",
    duration: "9 months",
  },
  {
    id: "cs-03",
    num: "C/03",
    href: "case-studies/03-foodops.html",
    title: "Quiet wins in food service ops",
    role: "Product Designer · Ops Platform",
    sub: "An internal tool that trimmed 22% off prep-to-plate. A masterclass in designing for people who really don’t want to be designed for.",
    tags: ["B2B", "Operations", "Design system", "Web"],
    year: "2023",
    duration: "12 months",
  },
];

function Work() {
  const refs = useRefWork([]);
  useEffectWork(() => {
    const obs = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) e.target.classList.add("in");
      });
    }, { threshold: 0.18 });
    refs.current.forEach((el) => el && obs.observe(el));
    return () => obs.disconnect();
  }, []);
  return (
    <section id="work" data-screen-label="02 Work">
      <div className="section-head">
        <div style={{ display: "flex", gap: 20, alignItems: "baseline" }}>
          <span className="num" style={{ color: "var(--accent)" }}>§ 02 / Work</span>
          <h2>Three pieces I’d still ship today</h2>
        </div>
        <div className="meta">
          <div>03 case studies · 2023 — 2025</div>
        </div>
      </div>

      <div className="work-list">
        {CASE_STUDIES.map((c, i) => (
          <a
            key={c.id}
            href={c.href}
            className="case"
            ref={(el) => (refs.current[i] = el)}
          >
            <div className="case-num">
              <div>{c.num}</div>
              <div style={{ color: "var(--muted-2)", marginTop: 8 }}>{c.year}</div>
            </div>
            <div className="case-meta">
              <h3 className="case-title">{c.title}</h3>
              <div style={{ color: "var(--muted)", fontSize: 12, letterSpacing: "0.06em", textTransform: "uppercase" }}>
                {c.role} · {c.duration}
              </div>
              <p className="case-sub">{c.sub}</p>
              <div className="tags">
                {c.tags.map((t) => <span key={t} className="tag">{t}</span>)}
              </div>
            </div>
            <div className="case-thumb">
              <span className="corner tl"></span>
              <span className="corner tr"></span>
              <span className="corner bl"></span>
              <span className="corner br"></span>
              <span className="placeholder-tag">CASE STUDY {String(i + 1).padStart(2, "0")} · DROP IN COVER IMG</span>
            </div>
            <div className="open-arrow" aria-hidden="true">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7">
                <path d="M5 19L19 5" />
                <path d="M9 5h10v10" />
              </svg>
            </div>
          </a>
        ))}
      </div>

      <div style={{
        display: "flex", justifyContent: "space-between", alignItems: "center",
        marginTop: 40, fontSize: 11, letterSpacing: "0.12em", textTransform: "uppercase",
        color: "var(--muted)"
      }}>
        <span>// Index of full case studies on request</span>
        <a href="#contact" style={{ borderBottom: "1px solid currentColor", paddingBottom: 2 }}>
          Request the full deck →
        </a>
      </div>
    </section>
  );
}

Object.assign(window, { Work });
