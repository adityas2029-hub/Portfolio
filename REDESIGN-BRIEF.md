# REDESIGN BRIEF — ADI UIXUX Portfolio

**For: a fresh Claude session rebuilding this portfolio from scratch.**
**Written by: the Claude session that built the existing version, at the client's request.**

---

## ⚠️ READ THIS FIRST

**Every piece of content in the existing site is placeholder.** Copy, metrics, case-study text, bio claims, statistics, taglines, project names — all of it was invented during the build to fill space. None of it is verified. None of it should be carried forward.

**The existing design is not a starting point.** The client is unhappy with the core of it. He is asking for a redesign from first principles, not a refactor, a restyle, or a v2 of what's there.

So:

- **Do not** copy the existing layout, palette, type system, section order, component structure, animations, or copy.
- **Do not** treat the existing file as a base to edit. Start a new file.
- **Do not** spend time reading the 4,000-line `index.html` in detail. Skim it once to know what *not* to build. That's all it's good for.
- **Do** use it as a record of one approach that didn't land, and why (§4).

The genuinely useful things in this document are: **who the client is (§1)**, **how he works and what he responds to (§5)**, **the failure mode to avoid (§4)**, and **the questions to ask him before you design anything (§6)**.

---

## 1. Who this is for

| | |
|---|---|
| **Name** | Aditya Shukla — presents on the site as **"Adi"** |
| **Site / brand name** | ADI UIXUX (he intends to supply his own logo mark; current one is a placeholder box) |
| **Domain** | ADIUIUX.com — not yet deployed |
| **Location** | Bangalore, India (IST) |
| **Email** | aditya.shukla2903@gmail.com |
| **Phone** | +91 91136 76858 |
| **LinkedIn** | https://www.linkedin.com/in/aditya-s-74995627a — he asked that this render as a logo/icon, never as raw URL text |
| **Discipline** | Product / systems / experience design, with a stated focus on **product and design strategy** |
| **Audience** | Recruiters and senior designers at strong product companies |

**Contact details above are the only content in the repo that appears to be real. Confirm even these with him.**

**Unverified and probably placeholder — do not reuse:** "B.Des, MAHE Manipal, 2022", "designing since 2019", "7 years", "Lead Product Designer", "12M users reached", "22% off prep-to-plate", "40+ user research sessions", "Open · Q3 '26", every project name, every tagline, the entire About section, all case-study descriptions and outcomes.

**Positioning is an open question, not a given.** The existing site claims senior/lead framing and ~7 years of experience. Whether that's accurate is something only he can say, and it materially changes what the site should be. Ask before assuming.

---

## 2. What's in the repo

**Repo (public):** https://github.com/adityas2029-hub/Portfolio

```bash
git clone https://github.com/adityas2029-hub/Portfolio.git
```

| Path | What it is | Worth your time? |
|---|---|---|
| `project/uploads/Example 1–3.png` | Three screenshots of portfolios **he chose and admired** when briefing the original build. | **Yes — the single best signal of his taste.** Look at these before anything else. |
| `chats/chat1.md` | The original brief conversation: his requirements in his own words, plus a Q&A where he picked aesthetic direction, tone, nav style, etc. | **Yes — but see the caveat in §3.** |
| `index.html` | The existing site. 4,358 lines, single file. | **Skim only.** Reference for what didn't work. Not a base to build on. |
| `dist/index.html`, `build.mjs`, `package.json`, `vendor/` | Build tooling: `npm install && npm run build` compiles the JSX and inlines production React, emitting a self-contained `dist/index.html` with no CDN dependency. | Reusable if you keep a similar architecture. Otherwise ignore. |
| `project/*.jsx`, `project/styles.css` | The original pre-single-file export. Superseded. | No |
| `project/case-studies/*.html` | Empty case-study templates. Never filled in. | No |

**Branch `v1-archive`** holds the old site exactly as it was, so `main` can be replaced freely: https://github.com/adityas2029-hub/Portfolio/tree/v1-archive

---

## 3. About his original requirements

`chats/chat1.md` contains his original brief and a questionnaire he answered. It's useful for understanding **how he thinks and what he cares about** — he wrote things like *"I want my brand to be clearly intentional and put me apart from other designers"* and *"a clean and logic first layout which showcases that simple design is better than cluttered mess."* That intent still holds.

**But do not treat the specific answers as a spec.** They were quick picks from a multiple-choice questionnaire, and over the build he reversed several of them:

| He originally chose | What actually happened |
|---|---|
| High-contrast Swiss, true black + true white | Asked to change it — became warm cream + vermillion |
| "Mono everywhere, brutalist" | Ended up Inter for headlines/body, mono demoted to labels |
| Time-based auto dark/light mode | Asked for it to **always boot dark**, no persistence |
| Horizontal scrolling strip for the brand section | Later asked for a 3-column grid as the default instead |
| First-load prompt bubbles | Kept, but repeatedly trimmed and repositioned |

The one thing he stated as fixed copy was the intro line: *"Hello, I am a product, systems and experience designer, bridging the gap between ideas and functionality."* In the existing build this became a 15-word run-on headline that reads as a category label with no point of view. **It should be challenged, not inherited.**

Treat the whole questionnaire as opening positions to re-litigate with him, not constraints.

---

## 4. Why the existing version failed

I built it, so this is self-assessment. It's here so the same failure mode doesn't repeat.

**1. It accreted; it was never designed.** Forty-two commits of localised fixes layered onto an AI-generated first draft. Every individual decision was defensible and the whole had no argument. There was never a moment where someone decided what the site was *for* and designed backwards from that.

**2. Feature maximalism drowned everything.** The final build contains roughly twenty interactive features — custom cursor, grid-reveal x-ray, Konami code, year-cycling footer, console easter egg, marquee strip, magnetic CTA, per-character hover cascades, letter-reveal headings, loader with counter, onboarding bubbles, scroll progress bar, scroll-to-top, tweaks panel, accessibility panel, parallax brand columns, and more. Each was added in response to a reasonable request. Together they read as a showcase of effects on a site that contains **no actual work**. For someone selling *design strategy*, that inversion is fatal.

**3. Everything was weighted equally.** Five full-viewport sections, each with the same `§ NN / Name` header, the same reveal animation, the same rhythm. Nothing said *this is the important one*.

**4. The case studies — the entire product — were hollow.** Placeholder rows, invented outcomes, empty detail pages. A recruiter clicking the first project hits nothing.

**5. Invented metrics were left in.** Real numbers get interrogated in interviews. Fabricated ones are worse than none.

**The lesson for you:** get the thesis and the structure agreed before writing a line of CSS. The failure here was structural, and no amount of visual polish fixed it.

---

## 5. How he works (useful, learned over ~40 rounds)

- **He responds extremely well to reasoning.** Give him "I considered A, B and C; I recommend B because…" and he engages, redirects, and makes good calls. Give him a list of shipped features and he asks for more features. **Lead with the argument, not the changelog.**
- **He notices layout breakage fast**, on both desktop and mobile, and will call it out. Test at 1440 / 768 / 390 px every time.
- **He asks for things additively.** Over the session he requested a mini-game, a click-to-draw ink trail, Easter eggs, and more animations — then later said the site felt cluttered and had me remove them. **He will ask for features; part of your job is to protect the whole.** Push back with reasoning when something doesn't serve the work — he took that well every time it was offered.
- **He iterates in small, specific increments** ("the CTA is invisible on the orange section", "the cursor lags"). Expect many short rounds rather than a few big ones.
- **He wants it to feel distinctly his** and not like a generic template. That was the first thing he said and the thing he came back to at the end.

**Practical setup:**

- **Verify in a real browser every single time.** Playwright is available at `/opt/node22/lib/node_modules/playwright`. A blank-screen regression shipped once because a scoping bug only appeared at runtime. Load headless, capture `pageerror` + console errors, screenshot at three widths, *then* push.
- **Sandbox network blocks unpkg, jsdelivr, images.unsplash and picsum** (`host_not_allowed`). Vendor deps with `npm install` and serve locally to test. These load fine in his own browser.
- **GitHub:** he supplies a fine-grained PAT on request. It needs **`Contents: Read and write`** — a metadata-only token fails with a confusing 403. Ask for a fresh one; tokens from previous sessions should be considered burned. **Remind him to revoke old ones** at https://github.com/settings/tokens.
- **Git identity:** commit as `Claude <noreply@anthropic.com>` or GitHub marks the commit unverified.

---

## 6. Suggested opening moves

**Do not start by writing code.**

1. **Look at `project/uploads/Example 1–3.png`.** That's his taste, stated in images. Then skim `chats/chat1.md` for how he talks about his own work.
2. **Interview him.** The answers change everything downstream:
   - **Is there real work to show yet, or is this a shell to fill later?** This is the biggest fork in the road. A portfolio with no case studies is a fundamentally different design problem from one with three.
   - What are the real projects, roles, dates, and outcomes? What can he actually defend in an interview?
   - How much professional experience, honestly — and what level of role is he targeting?
   - **What should a recruiter remember ten minutes after closing the tab?** That single answer is the thesis the whole design should serve.
   - Which project is strongest? It should lead, and it should be bigger than the others.
   - Fresh calls on: dark-only or both themes; typography direction; how much motion he actually wants now that he's seen too much of it.
3. **Propose structure and thesis, get agreement, then design.** The existing site failed structurally; opening with a nicer hero would repeat the mistake.
4. **Consider building the case-study template first** and letting the landing page follow from it. The landing page's only real job is to get someone into a case study and keep them there.
5. **Set a motion budget up front** — a number of animations you're allowed, agreed with him — and hold to it.

---

## 7. Current state

- **Repo:** https://github.com/adityas2029-hub/Portfolio · `main` · public · 43 commits
- **Old site preserved on:** branch `v1-archive`
- **Deployed:** nowhere yet
- **Content:** 100% placeholder
- **Client's verdict:** the core isn't right — start again

The raw material is good: he has real subject matter in mind, clear taste, and a high tolerance for iteration. What the last attempt lacked was an argument. Build that first.
