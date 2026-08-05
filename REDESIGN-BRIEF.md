# REDESIGN BRIEF — ADI UIXUX Portfolio

**For: a fresh Claude session starting the portfolio over from scratch.**
**Written by: the Claude session that built the current version (42 commits), at the client's request.**

The client has read the current site and is **not happy with its core**. The instruction is a redesign from first principles — not another round of patches. This document is the handoff: what exists, what's real, what's fake, and an honest account of why the current version fell short. Read it fully before writing any code.

---

## 1. Who this is for

| | |
|---|---|
| **Name** | Aditya Shukla — presents on the site as **"Adi"** |
| **Site / brand name** | ADI UIXUX (logo is a placeholder — he intends to supply his own mark) |
| **Domain** | ADIUIUX.com (not yet deployed) |
| **Location** | Bangalore, India (IST) — open to remote and relocation |
| **Email** | aditya.shukla2903@gmail.com |
| **Phone** | +91 91136 76858 |
| **LinkedIn** | https://www.linkedin.com/in/aditya-s-74995627a — *he asked that this render as a logo/icon, never as raw URL text* |
| **Education** | B.Des, MAHE Manipal, 2022 |
| **Discipline** | Product, systems and experience design. Focus on **product + design strategy** |
| **Audience for the site** | Recruiters and senior designers at strong product companies |

**⚠️ Positioning tension worth raising with him early.** The current site claims "7 years designing," "Lead Product Designer," and "open to lead and senior IC roles." With a 2022 B.Des, that reads as roughly 3–4 years professional (the count appears to include student years). Recruiters interrogate this. It's his call, but the new version should either substantiate the senior framing or reposition to something he can defend in the first interview question. **Ask him.**

---

## 2. Links and files

**Repo (public):** https://github.com/adityas2029-hub/Portfolio

```bash
git clone https://github.com/adityas2029-hub/Portfolio.git
```

| Path | What it is | Read it? |
|---|---|---|
| `index.html` | **The current site.** 4,358 lines. Single self-contained file: HTML + all CSS in one `<style>` + 10 inline `<script type="text/babel">` React blocks. | **Yes — this is the thing being replaced.** |
| `dist/index.html` | Production build of the above (precompiled JSX, inlined production React, no CDN). Generated, never hand-edited. | Skim |
| `build.mjs` + `package.json` + `vendor/` | Build system: `npm install && npm run build` → regenerates `dist/index.html`. esbuild compiles the JSX blocks; `vendor/` holds production React UMD builds. | Yes — reusable |
| `chats/chat1.md` | **The original design conversation** with the tool that produced the first version, including his verbatim requirements and Q&A answers. | **Yes — highest-signal context** |
| `project/` | The original Claude Design export (pre-single-file): `hero.jsx`, `work.jsx`, `collage.jsx`, `contact.jsx`, `nav.jsx`, `hooks.jsx`, `styles.css`, plus `case-studies/*.html` templates. Superseded by `index.html`, kept for history. | Optional |
| `project/uploads/` | Three reference screenshots of portfolios he admired (`Example 1–3.png`). | **Yes — his taste, in images** |

**Live preview:** no hosting yet. To view: `npm install && npm run build`, then open `dist/index.html`, or serve the repo root and open `index.html` directly (needs network for the unpkg CDN + Google Fonts).

---

## 3. What his original brief asked for (his words, from `chats/chat1.md`)

Direct quotes and answers — these are the requirements the first version was built against, and they remain the best statement of intent:

- *"I want my brand to be clearly intentional and put me apart from other designers."*
- *"landing page to have the main intro with focus on typography"*, with a hover animation on the intro text and *"subtle details like that throughout"*
- CTA in the top nav, *"not too tacky"*
- Below intro: work section, with a scroll animation blending hero → projects. *"The project section should be minimalist."*
- Before case studies: a branding/poster section, **10–12 pieces**, chosen format **horizontal scrolling strip**
- Then contact details + contact section, then *"a small professional footer"*
- **Left-side navigation:** chosen style **progress rail with active segment filled**; clicking jumps to that section
- *"Use a clean and logic first layout which showcases that simple design is better than cluttered mess."*
- Fixed intro copy: **"Hello, I am a product, systems and experience designer, bridging the gap between ideas and functionality."**
- *"should not feel like every other generic portfolio or corporate website"*
- Aesthetic direction chosen: **High-contrast Swiss (true white + true black, mono accents)**; type personality: **mono everywhere, brutalist**
- Tone chosen: **dry/wry — short, observational copy**
- Personal touches requested: time-based dark/night mode + a manual toggle; small first-load prompt bubbles that fade on their own
- Responsive everywhere, hamburger on mobile

**Three case studies (his subjects):**
1. Neurodivergent people and dating
2. Sustainable transportation in a city
3. Food services and efficiency

**Note the drift:** he later asked to move off true black/white to something warmer, which produced the current cream + vermillion palette, and later still asked that the site **always boot in dark mode**. The "mono everywhere" instruction also drifted — current type is Inter for headlines/body with mono demoted to labels. Treat both as open questions to re-decide deliberately, not as settled.

---

## 4. What exists today — architecture

Single file, no framework tooling in the authoring path:

- **React 18 via CDN + Babel standalone**, JSX compiled in-browser. 10 sibling `<script type="text/babel">` blocks that share state by hanging components on `window` (`Object.assign(window, { Hero })` etc.). Babel's `const`→`var` transpilation makes each block's top-level names de-facto globals; the production build wraps each block in an IIFE, so **cross-block references must go through `window` explicitly** or they break in `dist` only. This bit us twice.
- **CSS:** one `<style>` block, ~2,000 lines, organised by comment banners with an index at the top.
- **Sections in DOM order:** `#hero` → marquee strip → `#work` → `#collage` (Brand) → `#about` → `#contact` → footer.
- **Design tokens** (`:root`): warm cream `#F2EDE3` / warm ink `#16120E` / single accent vermillion `#E94B1A`; dark theme inverts. Fonts: Inter (sans), JetBrains Mono (labels/meta), Instrument Serif italic (accent).
- **Boot behaviour:** an inline script wipes all `localStorage` keys and forces `data-theme="dark"` before first paint, so **every load starts dark with default settings**; in-session changes don't persist. (His explicit request. Worth revisiting for a real launch — a returning visitor's light-mode choice is currently forgotten.)

**Feature inventory (everything currently in the build):** loader with counter, staggered site entrance, scroll progress hairline, left progress rail, top nav with magnetic CTA, theme toggle, accessibility panel (text size / colour-vision modes / reduced motion), first-visit onboarding bubbles (3), hero per-character hover weight cascade, one word that swaps to serif italic on hover, live Bangalore clock + time-aware greeting, editorial marquee strip, case rows with multi-layer hover, inline SVG case mockups, brand section with two views (3-column vertical auto-scrolling parallax marquee / horizontal large-card strip), about section with stat cards, contact section with method tiles + one-line note form, footer with year-cycling easter egg, floating custom cursor, scroll-to-top, grid-reveal x-ray (press `G`), click-to-flash column, Konami code toast, console easter egg, tweaks panel.

Read that list again. That is the core problem.

---

## 5. Honest critique — why we're starting over

I built it, so this is self-assessment, not sniping. Take it as the strongest argument for a clean slate.

**1. It accreted; it was never designed.** 42 commits of localised fixes on top of an AI-generated first draft. Every individual decision has a defensible reason and the whole has no argument. A portfolio needs a thesis before it needs a hover state.

**2. Feature maximalism drowns the work.** Roughly twenty interactive features (see inventory) compete for attention on a site that currently contains **zero real work**. The custom cursor, the grid x-ray, the Konami egg, the marquee, the year-cycling footer — each is fine alone; together they read as a showcase of effects rather than of thinking. For a strategy-focused designer this actively undercuts the pitch. *Simple design is better than cluttered mess* was his own instruction and the current build violates it.

**3. The hero doesn't land.** The headline is a 15-word run-on sentence set at 72px over five lines. It states a category ("product, systems and experience designer") and no point of view. A recruiter's first three seconds are spent reading, not understanding. The fixed copy came from his brief — but it should be challenged, not obeyed.

**4. Everything is weighted the same.** Five full-viewport sections, each with an identical `§ NN / Name` header, identical reveal animation, identical rhythm. Nothing signals *this is the important one*. The work should dominate; instead it's one of five equals.

**5. The case studies — the entire product — are hollow.** Three placeholder rows with inline SVG mockups and no real detail pages. `project/case-studies/*.html` are unfilled templates. A recruiter clicks the first case and hits nothing.

**6. Invented metrics are a live credibility risk.** Present in the build and unverified: **"12M users reached"**, **"22% off prep-to-plate"**, **"40+ user research sessions"**, **"7 years designing"**. Designers and recruiters test numbers like these in interviews. **Every one must be confirmed or removed before this site is public.** Flag them explicitly to him.

**7. One 4,358-line file is the wrong authoring unit** for a site that now needs real case-study pages and routing. It was right for a prototype; it's now friction.

**8. Copy is a shade too pleased with itself.** "Pixel-stubborn," "No templates. No shortcuts.", "designer's eye." Dry/wry was the brief; some of this reads as trying rather than dry.

---

## 6. What to keep, what to kill

**Worth carrying forward:**
- The **restraint of the palette** — one warm neutral pair plus a single accent, used as punctuation. That discipline is genuinely good.
- **Mono as the "system voice"** for labels, numbers and metadata against a humanist sans for prose. Clear and legible.
- The **left progress rail** — he chose it explicitly and it works.
- **The grid-reveal (`G`)** — of everything built, this is the one idea that argues rather than decorates: it exposes the 12-column grid the layout is built on. Keep it *only if* the new layout genuinely earns it.
- The **build system** (`build.mjs`) — reusable regardless of what the site becomes.
- **Accessibility panel** and reduced-motion support — keep the substance, restyle at will.

**Strong candidates to cut:**
- Custom floating cursor · Konami egg · footer year-cycle · console egg · click-to-flash column · marquee strip · magnetic CTA · per-character hover cascades · tweaks panel · loader with counter.
- Not because any is bad — because collectively they are the noise the client is unhappy about. Earn each one back individually, if at all.

---

## 7. Working practices from this session that are worth repeating

- **Verify in a real browser, every time.** Playwright is available in the sandbox at `/opt/node22/lib/node_modules/playwright`. A blank-screen regression shipped once because a scope bug only appeared at runtime. Load the page headless, capture `pageerror` + console errors, and screenshot at **1440 / 768 / 390 px** before every push. This caught real bugs repeatedly.
- **Sandbox network:** unpkg, jsdelivr, images.unsplash and picsum are **blocked** (`host_not_allowed`). Vendor dependencies via `npm install` and serve locally for testing. Fonts/CDN will work fine in the client's own browser.
- **The client tests on desktop and mobile and notices layout breaks fast.** Ship responsive or don't ship.
- **He responds well to reasoning.** When given "I considered A/B/C and chose B because…", he engages and redirects. When given a list of finished features, he asks for more features. Lead with the argument.
- **Git access:** he supplies a fine-grained GitHub PAT when a push is needed. **It must have `Contents: Read and write`** — a metadata-only token fails with a confusing 403. Ask for a fresh one; do not reuse any token from prior sessions. **Tell him to revoke the old ones at https://github.com/settings/tokens.**
- Commit signing is misconfigured in the sandbox; commit with `-c commit.gpgsign=false`.

---

## 8. Suggested opening moves for the new session

Do **not** start by writing CSS.

1. **Read** `chats/chat1.md`, then `index.html`, then look at `project/uploads/Example 1–3.png` (his stated taste).
2. **Interview him**, briefly and specifically. The high-value unknowns:
   - What are the **real** numbers, roles, dates and outcomes for the three case studies? (Or: is this a "coming soon" shell for now?)
   - Senior/lead positioning — defensible, or reposition?
   - What does he want a recruiter to remember 10 minutes after closing the tab? *(This is the thesis the whole design should serve.)*
   - Which of the three case studies is the strongest? It should lead and it should be bigger than the others.
   - Still want dark-only boot? Still want "mono everywhere," or is the current Inter direction better?
3. **Propose a structure and a thesis before any visual work** — and get his agreement. The current site's failure is structural, not stylistic; opening with a nicer hero would repeat it.
4. **Design for the case studies as the product.** Whatever the landing page becomes, its job is to get someone into a case study and keep them there. Consider building the case-study template *first* and letting the landing page follow from it.
5. Only then: palette, type, motion — and keep the motion budget small enough to name every animation on one hand.

---

## 9. Current state summary

- **Repo:** https://github.com/adityas2029-hub/Portfolio — 42 commits, `main`, public.
- **Last commit:** `3a03fb1` — production build system.
- **Status:** complete, functional, responsive, verified working at desktop/tablet/mobile. Zero console errors. Not deployed.
- **Content:** placeholder throughout. No real case studies. Several unverified metrics (§5.6).
- **Client's verdict:** the core isn't right. Start again.

Preserve the current work on a branch or tag before overwriting `main`, so there's a reference point:

```bash
git checkout -b v1-archive && git push -u origin v1-archive
```

Good luck. The raw material — his subject matter, his taste, his willingness to iterate — is strong. It needs an argument, not more features.
