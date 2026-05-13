/* global React */
const { useState: useStateCt } = React;

function Contact() {
  const [form, setForm] = useStateCt({ name: "", email: "", note: "" });
  const [sent, setSent] = useStateCt(false);
  const onSubmit = (e) => {
    e.preventDefault();
    // Compose mailto with form values
    const subj = encodeURIComponent(`Portfolio enquiry — ${form.name || "Hello Adi"}`);
    const body = encodeURIComponent(
      `${form.note}\n\n— ${form.name}\n${form.email}`
    );
    window.location.href = `mailto:Aditya.shukla2903@gmail.com?subject=${subj}&body=${body}`;
    setSent(true);
  };

  return (
    <section id="contact" className="contact-section" data-screen-label="04 Contact">
      <div className="section-head">
        <div style={{ display: "flex", gap: 20, alignItems: "baseline" }}>
          <span className="num">§ 04 / Contact</span>
          <h2>Say hello</h2>
        </div>
        <div className="meta">
          <div>Bangalore · UTC+5:30 · Replies in 24h</div>
        </div>
      </div>

      <div className="contact">
        <h3 className="contact-lead">
          Let’s make<br />
          something<br />
          <span className="serif">worth</span> <span className="underline">paying attention</span><br />
          to.
        </h3>

        <div className="contact-card">
          <div className="row">
            <span className="k">Email</span>
            <a className="v" href="mailto:Aditya.shukla2903@gmail.com">
              <span>Aditya.shukla2903@gmail.com</span>
              <span className="arrow">↗</span>
            </a>
          </div>
          <div className="row">
            <span className="k">Phone</span>
            <a className="v" href="tel:+919113676858">
              <span>+91 91136 76858</span>
              <span className="arrow">↗</span>
            </a>
          </div>
          <div className="row">
            <span className="k">LinkedIn</span>
            <a
              className="v"
              href="https://www.linkedin.com/in/aditya-s-74995627a"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
            >
              <span className="li-logo" aria-hidden="true">in</span>
              <span>/aditya-s</span>
              <span className="arrow">↗</span>
            </a>
          </div>

          <form className="form" onSubmit={onSubmit} aria-label="Contact form">
            <input
              type="text"
              placeholder="Your name"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              required
            />
            <input
              type="email"
              placeholder="Email"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              required
            />
            <textarea
              rows={3}
              placeholder="What are you working on?"
              value={form.note}
              onChange={(e) => setForm({ ...form, note: e.target.value })}
              required
            />
            <button type="submit" className="cta submit">
              <span>{sent ? "Sent — check your mail" : "Send →"}</span>
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="footer" id="about">
      <div className="brand-block">
        <div className="wm">
          ADI<span style={{ display: "inline-block", width: "0.18em", height: "0.18em", background: "currentColor", marginLeft: "0.06em", marginRight: "0.04em", verticalAlign: "0.18em" }}></span>UIXUX
        </div>
        <div style={{ color: "var(--muted)", maxWidth: 36 + "ch", fontSize: 13 }}>
          Independent product &amp; systems designer. Strategy-first. Pixel-stubborn. Currently in Bangalore.
        </div>
        <div style={{ display: "flex", gap: 8, marginTop: 8 }}>
          <a
            href="https://www.linkedin.com/in/aditya-s-74995627a"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn"
            style={{
              width: 32, height: 32, display: "grid", placeItems: "center",
              background: "var(--fg)", color: "var(--bg)", fontWeight: 700, fontSize: 13
            }}
          >in</a>
          <a
            href="mailto:Aditya.shukla2903@gmail.com"
            aria-label="Email"
            style={{
              width: 32, height: 32, display: "grid", placeItems: "center",
              border: "1px solid var(--line)", fontWeight: 500, fontSize: 14
            }}
          >@</a>
        </div>
      </div>

      <div className="col">
        <span className="hd">Sitemap</span>
        <a href="#hero">Intro</a>
        <a href="#work">Selected work</a>
        <a href="#collage">Brand & posters</a>
        <a href="#contact">Contact</a>
      </div>
      <div className="col">
        <span className="hd">Working on</span>
        <span>Service design pilot</span>
        <span>A type specimen</span>
        <span>Public writing, slowly</span>
      </div>
      <div className="col">
        <span className="hd">Elsewhere</span>
        <a href="https://www.linkedin.com/in/aditya-s-74995627a" target="_blank" rel="noopener noreferrer">LinkedIn ↗</a>
        <a href="mailto:Aditya.shukla2903@gmail.com">Email ↗</a>
        <a href="tel:+919113676858">Phone ↗</a>
      </div>

      <div className="footer-bottom">
        <span>© 2026 · Adi · Bangalore</span>
        <span>Last updated · May 2026</span>
        <span>Built by hand · no templates</span>
      </div>
    </footer>
  );
}

Object.assign(window, { Contact, Footer });
