/* global React */
const { useRef: useRefHero, useEffect: useEffectHero, useState: useStateHero, useCallback: useCallbackHero } = React;

function bangaloreClock() {
  const now = new Date();
  const utc = now.getTime() + now.getTimezoneOffset() * 60000;
  const ist = new Date(utc + (5.5 * 60 * 60 * 1000));
  const h = ist.getHours();
  const m = String(ist.getMinutes()).padStart(2, "0");
  const ampm = h < 12 ? "AM" : "PM";
  const hh = String(((h + 11) % 12) + 1).padStart(2, "0");
  let greeting;
  if (h >= 5 && h < 12) greeting = "Good morning";
  else if (h >= 12 && h < 17) greeting = "Good afternoon";
  else if (h >= 17 && h < 21) greeting = "Good evening";
  else greeting = "Burning the midnight oil";
  return { time: `${hh}:${m} ${ampm}`, greeting };
}

/* ============================================================
   Hero — minimal mono headline with subtle personality.
   - One typeface (JetBrains Mono), one weight.
   - Vermillion period.
   - Subtle character-wave on hover.
   - One word ("bridging") replaced with serif-italic alternate on hover.
   - Sign-off mark — a small underlined "Adi" feels like a signature.
   ============================================================ */

const HEADLINE = "Hello, I am a product, systems and experience designer, bridging the gap between ideas and functionality";

/* Words we treat specially. Index-based so we can mark them in the
   tokenized output without restructuring the string. */
const SPECIAL = {
  "bridging": { kind: "serif", alt: "weaving" }
};

function tokenize(s) {
  // Split into runs of word | space | punctuation
  const tokens = [];
  let buf = "";
  let mode = null; // 'w' | 's' | 'p'
  for (const ch of s) {
    const m = /\s/.test(ch) ? "s" : /[a-zA-Z0-9'’]/.test(ch) ? "w" : "p";
    if (m !== mode) {
      if (buf) tokens.push({ t: buf, m: mode });
      buf = ch;
      mode = m;
    } else buf += ch;
  }
  if (buf) tokens.push({ t: buf, m: mode });
  return tokens;
}

function Hero({ animation = "wave" }) {
  const textRef = useRefHero(null);
  const [clock, setClock] = useStateHero(() => bangaloreClock());
  useEffectHero(() => {
    const id = setInterval(() => setClock(bangaloreClock()), 60 * 1000);
    return () => clearInterval(id);
  }, []);

  // Subtle wave on hover — every char shifts by 1–2px in a soft sine.
  const handleEnter = useCallbackHero(() => {
    const chars = textRef.current?.querySelectorAll(".ch");
    if (!chars || !chars.length) return;
    const N = chars.length;
    chars.forEach((c, i) => {
      const phase = i / N;
      const dy = Math.sin(phase * Math.PI * 2) * 2.5;
      c.style.transitionDelay = `${i % 30 * 10}ms`;
      c.style.transform = `translateY(${dy}px)`;
      setTimeout(() => {
        c.style.transform = `translateY(0)`;
      }, 380 + i % 30 * 10);
    });
  }, []);

  const tokens = tokenize(HEADLINE);

  return (
    <section id="hero" className="hero" data-screen-label="01 Hero">
      <div className="hero-eyebrow">
        <span className="dash"></span>
        <span>{clock.greeting} · Bangalore · <span className="clock-time">{clock.time}</span></span>
        <span className="blink"></span>
      </div>

      <h1
        className="intro-text"
        ref={textRef}
        onMouseEnter={handleEnter}
        aria-label={HEADLINE + "."}>
        
        {tokens.map((tok, i) => {
          if (tok.m === "s") {
            return <span key={i} className="space"> </span>;
          }
          if (tok.m === "p") {
            return <span key={i} className="punc">{splitChars(tok.t)}</span>;
          }
          const spec = SPECIAL[tok.t.toLowerCase()];
          if (spec) {
            return (
              <span key={i} className={`word ${spec.kind}`} data-special={spec.kind}>
                <span className="orig">{splitChars(tok.t)}</span>
                {spec.alt && <span className="alt" aria-hidden="true">{spec.alt}</span>}
              </span>);

          }
          return (
            <span key={i} className="word">
              <span className="orig">{splitChars(tok.t)}</span>
            </span>);

        })}
        <span className="period" aria-hidden="true"></span>
      </h1>

      <p className="hero-sub">
        I help teams design <em>thoughtful, opinionated</em> products in fintech,
        mobility and consumer. Strategy first. Pixel-stubborn second.
      </p>

      <div className="hero-footer">
        <div className="col">
          <span className="k">Based in</span>
          <span className="v">Bangalore, IN</span>
        </div>
        <div className="col">
          <span className="k">Designing since</span>
          <span className="v">2019</span>
        </div>
        <div className="col">
          <span className="k">Focus</span>
          <span className="v">Product · Strategy</span>
        </div>
        <div className="col">
          <span className="k">Status</span>
          <span className="v">
            <span className="status-dot"></span>
            Open · Q3 ’26
          </span>
        </div>
      </div>

      <div className="scroll-cue" aria-hidden="true">
        <span>Keep scrolling</span>
      </div>
    </section>);

}

function splitChars(s) {
  return s.split("").map((c, i) =>
  <span key={i} className="ch">{c}</span>
  );
}

Object.assign(window, { Hero });