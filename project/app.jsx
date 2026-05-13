/* global React, ReactDOM */
const { useState, useEffect, useRef, useCallback } = React;

/* Bring imports from window */
const _Hero = window.Hero;
const _TopNav = window.TopNav;
const _SideRail = window.SideRail;
const _MobileNav = window.MobileNav;
const _Work = window.Work;
const _Collage = window.Collage;
const _Contact = window.Contact;
const _Footer = window.Footer;
const _OnboardingBubbles = window.OnboardingBubbles;
const _useTheme = window.useTheme;
const _useScrollSpy = window.useScrollSpy;
const _useToneBlend = window.useToneBlend;
const { TweaksPanel, useTweaks, TweakSection, TweakRadio, TweakToggle, TweakButton } = window;

const DEFAULTS = /*EDITMODE-BEGIN*/{
  "heroAnimation": "wave",
  "themeMode": "auto",
  "layoutVariant": "stacked",
  "showOnboarding": true
}/*EDITMODE-END*/;

const NAV_ITEMS = [
  { id: "hero",    label: "Intro" },
  { id: "work",    label: "Work" },
  { id: "collage", label: "Brand" },
  { id: "contact", label: "Contact" },
  { id: "about",   label: "About" },
];

function App() {
  const [tweaks, setTweak] = useTweaks(DEFAULTS);
  const { theme, mode, cycle } = _useTheme(tweaks.themeMode);

  // Tone-blend uses the base theme
  _useToneBlend(theme);

  const { active } = _useScrollSpy(NAV_ITEMS.map(n => n.id));
  const [replayOnboard, setReplayOnboard] = useState(0);

  const jumpTo = useCallback((id) => {
    const el = document.getElementById(id);
    if (!el) return;
    window.scrollTo({ top: el.offsetTop, behavior: "smooth" });
  }, []);

  // Sync tweaks themeMode -> hook
  useEffect(() => {
    if (tweaks.themeMode !== mode) {
      // setMode handled inside hook via tweaks.themeMode prop; ensure persisted
      localStorage.setItem("adi-theme-mode", tweaks.themeMode);
    }
  }, [tweaks.themeMode, mode]);

  const onToggleTheme = () => {
    const order = ["auto", "light", "dark"];
    const idx = order.indexOf(tweaks.themeMode);
    const next = order[(idx + 1) % order.length];
    setTweak("themeMode", next);
    cycle(); // ensure hook also progresses immediately
  };

  return (
    <>
      <_TopNav
        themeMode={tweaks.themeMode}
        onToggleTheme={onToggleTheme}
        onCta={(e) => { e.preventDefault(); jumpTo("contact"); }}
      />
      <_MobileNav items={NAV_ITEMS} active={active} onJump={jumpTo} />
      <_SideRail items={NAV_ITEMS} active={active} onJump={jumpTo} />

      <main>
        <_Hero animation={tweaks.heroAnimation} />
        <_Work variant={tweaks.layoutVariant} />
        <_Collage />
        <_Contact />
      </main>
      <_Footer />

      <_OnboardingBubbles enabled={tweaks.showOnboarding} replayKey={replayOnboard} />

      <TweaksPanel title="Tweaks">
        <TweakSection title="Hero Animation">
          <TweakRadio
            label="Style"
            value={tweaks.heroAnimation}
            onChange={(v) => setTweak("heroAnimation", v)}
            options={[
              { value: "wave", label: "Wave" },
              { value: "swap", label: "Swap" },
              { value: "scramble", label: "Scramble" },
            ]}
          />
        </TweakSection>

        <TweakSection title="Theme">
          <TweakRadio
            label="Mode"
            value={tweaks.themeMode}
            onChange={(v) => setTweak("themeMode", v)}
            options={[
              { value: "auto", label: "Auto" },
              { value: "light", label: "Light" },
              { value: "dark", label: "Dark" },
            ]}
          />
        </TweakSection>

        <TweakSection title="Work Layout">
          <TweakRadio
            label="Variant"
            value={tweaks.layoutVariant}
            onChange={(v) => setTweak("layoutVariant", v)}
            options={[
              { value: "stacked", label: "Stacked" },
              { value: "gallery", label: "Gallery" },
            ]}
          />
        </TweakSection>

        <TweakSection title="Onboarding">
          <TweakToggle
            label="Show prompts"
            value={tweaks.showOnboarding}
            onChange={(v) => setTweak("showOnboarding", v)}
          />
          <TweakButton onClick={() => { localStorage.removeItem("adi-onboarded"); setReplayOnboard(k => k + 1); }}>
            Replay prompts
          </TweakButton>
        </TweakSection>
      </TweaksPanel>
    </>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(<App />);
