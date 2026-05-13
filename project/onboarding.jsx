/* global React */
const { useEffect: useEffectOb, useState: useStateOb } = React;

const BUBBLES = [
  { sel: '[data-onboard="rail"]', text: "Quick travel — every section is one click. Active is filled.", place: "right", offset: [80, -10] },
  { sel: '[data-onboard="theme"]', text: "Auto-flips at 7pm. Tap to override.", place: "bottom-left", offset: [-180, 44] },
  { sel: '[data-onboard="cta"]', text: "Bypass the scroll — say hello right away.", place: "bottom-right", offset: [-160, 44] },
  { sel: ".intro-text", text: "Hover the words. Some swap, some shift.", place: "bottom", offset: [0, 24] },
];

function OnboardingBubbles({ enabled, replayKey }) {
  const [coords, setCoords] = useStateOb([]);
  const [dismissed, setDismissed] = useStateOb(new Set());

  useEffectOb(() => {
    if (!enabled) return;
    if (localStorage.getItem("adi-onboarded") === "1" && replayKey === 0) return;

    let mounted = true;
    let timeouts = [];

    const compute = () => {
      const cs = BUBBLES.map((b) => {
        const el = document.querySelector(b.sel);
        if (!el) return null;
        const r = el.getBoundingClientRect();
        const x = r.left + (b.offset[0] || 0);
        const y = r.top + r.height + (b.offset[1] || 0);
        return { ...b, x, y };
      });
      if (mounted) setCoords(cs);
    };
    compute();
    window.addEventListener("resize", compute);
    window.addEventListener("scroll", compute, { passive: true });

    // Stagger reveal
    BUBBLES.forEach((_, i) => {
      timeouts.push(setTimeout(() => {
        if (!mounted) return;
        setCoords((curr) => curr.map((c, j) => (j === i ? { ...c, _show: true } : c)));
      }, 600 + i * 420));
      // Auto-fade after a while
      timeouts.push(setTimeout(() => {
        if (!mounted) return;
        setCoords((curr) => curr.map((c, j) => (j === i ? { ...c, _show: false } : c)));
      }, 7200 + i * 420));
    });

    const finalize = setTimeout(() => {
      localStorage.setItem("adi-onboarded", "1");
    }, 12000);

    return () => {
      mounted = false;
      timeouts.forEach(clearTimeout);
      clearTimeout(finalize);
      window.removeEventListener("resize", compute);
      window.removeEventListener("scroll", compute);
    };
  }, [enabled, replayKey]);

  if (!enabled) return null;

  return (
    <>
      {coords.map((c, i) => {
        if (!c || dismissed.has(i)) return null;
        const placeClass =
          c.place === "right" ? "from-left" :
          c.place === "bottom-left" ? "from-top" :
          c.place === "bottom-right" ? "from-top" :
          c.place === "bottom" ? "from-top" : "from-top";
        return (
          <div
            key={i}
            className={`bubble ${placeClass} ${c._show ? "show" : ""}`}
            style={{ left: Math.max(8, c.x), top: c.y }}
            onClick={() => setDismissed((s) => new Set(s).add(i))}
          >
            {c.text}
            <span className="close">·  ✕</span>
          </div>
        );
      })}
    </>
  );
}

Object.assign(window, { OnboardingBubbles });
