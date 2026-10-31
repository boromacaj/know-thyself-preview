/**
 * THE GUIDED SCREENS' STYLESHEET.
 *
 * Written on the interface's own tokens and nothing else: the surface fill, hairline and border roles, the accent and the secondary accent, the same capsule and the same
 * panel radius as the rest of the Tarot screen. No colour is defined here, so Settings -> Colors reaches every control (Interface Color) and nothing reaches a card: a
 * card's symbolism is drawn by the screen's own face and back, which this file does not touch.
 *
 * MOTION. Everything that moves here moves on the compositor (opacity and transform only), once, on arrival - except one soft light behind the quiet moment, which is a
 * single still element with a slow opacity and scale change. There is no timer, no script, no animation clock of ours, and with motion reduced there is no animation at all:
 * every line is simply there.
 */
export function tarotGuidedCss() {
    const H = '#place-experience#place-experience .tx-hero';
    const D = '#place-experience#place-experience';
    const G = `${D} .tg-sheet`;
    const accent = 'var(--kt-accent-rgb, 216, 195, 142)';
    return `
    /* ---------------------------------------------------------- the mode choice */
    ${D} .tg-modes {
      display: inline-flex; gap: 2px; padding: 3px; border-radius: 999px;
      border: 1px solid var(--kt-surface-line, rgba(255, 255, 255, 0.14));
      background: rgba(var(--kt-surface-fill-rgb, 10, 12, 16), 0.5);
      backdrop-filter: blur(14px) saturate(1.1); -webkit-backdrop-filter: blur(14px) saturate(1.1);
    }
    ${D} .tg-mode {
      min-height: 40px; min-width: 112px; padding: 0 16px; margin: 0;
      font: inherit; font-size: 11px; letter-spacing: 0.08em; text-transform: uppercase;
      color: rgba(244, 241, 233, 0.72); background: transparent; border: 0; border-radius: 999px; cursor: pointer;
      -webkit-tap-highlight-color: transparent;
      transition: color 180ms ease-in-out, background-color 180ms ease-in-out, box-shadow 180ms ease-in-out;
    }
    ${D} .tg-mode.is-on {
      color: rgba(255, 253, 248, 1);
      background-color: rgba(${accent}, 0.18);
      box-shadow: 0 0 0 1px rgba(${accent}, 0.55) inset, 0 0 14px rgba(${accent}, 0.2);
    }
    ${D} .tg-mode:focus-visible { outline: 2px solid rgba(${accent}, 0.9); outline-offset: 2px; }
    /* On the opening screen the choice sits on the planet's page, in the clear space above the line that asks for the shuffle. */
    ${H} > .tg-modes {
      position: absolute; left: var(--ko-cx, 50%); top: calc(var(--th-line-top, 0px) - 62px); transform: translateX(-50%); z-index: 4; white-space: nowrap;
    }
    ${H}[data-tx-hero="shuffling"] > .tg-modes { display: none; }

    /* ------------------------------------------------------------ the guided steps
       Under the planet, on the same glass the reading rises on. The scroll region ends above the MENU capsule exactly as it does for a reading. */
    ${D} .tx-hero[data-tx-hero="pending"] + .tx-sheet.tg-sheet {
      margin-top: 4px; padding: 12px 14px 22px; gap: 12px; align-items: stretch;
      border: 1px solid var(--kt-surface-line, rgba(255, 255, 255, 0.12)); border-bottom: 0; border-radius: 24px 24px 0 0;
      background: rgba(var(--kt-surface-fill-rgb, 10, 12, 16), 0.72);
      backdrop-filter: blur(18px) saturate(1.08); -webkit-backdrop-filter: blur(18px) saturate(1.08);
      box-shadow: 0 -12px 40px rgba(2, 4, 10, 0.5);
    }
    ${D} #tarot-view:has(.tx[data-tx-guide]) { bottom: var(--th-menu-room, 0px); padding-bottom: 20px; }
    /* The pinned planet needs no room under a list of choices: the page ends where the choices end. */
    ${D} #tarot-view:has(.tx[data-tx-guide])::after { display: none; }
    ${D}:has(.tx[data-tx-guide]) #tarot-nav::before { opacity: 1; }
    ${G} .tg-modes { align-self: center; margin: 2px 0 6px; }
    ${G} .tg-title { margin: 2px 0 0; text-align: center; font-size: clamp(20px, 5.6vw, 26px); line-height: 1.2; }
    ${G} .tg-lead { margin: 0 auto 4px; max-width: 34ch; text-align: center; font-size: 13.5px; line-height: 1.5; color: rgba(244, 241, 233, 0.66); }

    ${G} .tg-list { list-style: none; margin: 2px 0 0; padding: 0; display: flex; flex-direction: column; gap: 9px; }
    ${G} .tg-choice {
      width: 100%; display: flex; align-items: center; gap: 14px; min-height: 56px; margin: 0; padding: 10px 16px;
      text-align: left; font: inherit; color: rgba(250, 249, 245, 0.94); cursor: pointer;
      border-radius: 18px; border: 1px solid var(--kt-surface-line, rgba(255, 255, 255, 0.12));
      background: rgba(255, 255, 255, 0.04);
      -webkit-tap-highlight-color: transparent;
      transition: border-color 180ms ease-in-out, background-color 180ms ease-in-out, box-shadow 180ms ease-in-out, transform 120ms ease-out;
    }
    ${G} .tg-choice:active { transform: translateY(1px); }
    @media (hover: hover) {
      ${G} .tg-choice:hover { border-color: rgba(${accent}, 0.55); background-color: rgba(${accent}, 0.07); }
    }
    ${G} .tg-choice:focus-visible { outline: 2px solid rgba(${accent}, 0.9); outline-offset: 2px; }
    ${G} .tg-choice.is-on { border-color: rgba(${accent}, 0.7); background-color: rgba(${accent}, 0.12); box-shadow: 0 0 16px rgba(${accent}, 0.16); }
    ${G} .tg-glyph {
      flex: none; width: 28px; height: 28px; fill: none; stroke: rgba(${accent}, 0.92); stroke-width: 1.4; stroke-linecap: round; stroke-linejoin: round;
    }
    ${G} .tg-choice-text { display: flex; flex-direction: column; gap: 2px; min-width: 0; }
    ${G} .tg-choice-title { font-family: Georgia, 'Times New Roman', serif; font-size: 17px; line-height: 1.28; }
    ${G} .tg-choice-blurb { font-size: 12.5px; line-height: 1.4; color: rgba(244, 241, 233, 0.62); }
    ${G} .tg-intention .tg-choice-title { font-size: 16px; }

    ${G} .tg-bar { display: flex; align-items: center; justify-content: space-between; min-height: 40px; margin-bottom: -6px; }
    ${D} .tg-back {
      display: inline-flex; align-items: center; gap: 6px; min-height: 44px; margin: -4px 0 -4px -6px; padding: 0 8px;
      font: inherit; font-size: 11px; letter-spacing: 0.1em; text-transform: uppercase;
      color: rgba(244, 241, 233, 0.74); background: none; border: 0; border-radius: 999px; cursor: pointer;
      -webkit-tap-highlight-color: transparent;
    }
    ${D} .tg-back span { font-size: 17px; line-height: 1; }
    ${D} .tg-back:focus-visible, ${D} .tg-link:focus-visible { outline: 2px solid rgba(${accent}, 0.9); outline-offset: 2px; }
    ${G} .tg-area-badge { display: flex; align-items: center; justify-content: center; gap: 10px; flex-wrap: wrap; text-align: center; }
    ${G} .tg-area-badge .tg-glyph { width: 24px; height: 24px; }
    ${G} .tg-area-name { font-size: 12px; letter-spacing: 0.16em; text-transform: uppercase; color: rgba(var(--kt-secondary-accent-rgb, ${accent}), 0.9); }
    ${D} .tg-link {
      min-height: 40px; padding: 0 8px; font: inherit; font-size: 12px; color: rgba(${accent}, 0.95); background: none; border: 0; cursor: pointer;
      text-decoration: underline; text-underline-offset: 3px; text-decoration-color: rgba(${accent}, 0.45);
    }

    /* ------------------------------------------------------------ an earlier reading */
    ${G} .tg-resume { padding: 13px 15px 14px; display: flex; flex-direction: column; gap: 6px; background: rgba(${accent}, 0.06); }
    ${G} .tg-resume-title { margin: 0; font-size: 11px; letter-spacing: 0.14em; text-transform: uppercase; color: rgba(var(--kt-secondary-accent-rgb, ${accent}), 0.9); }
    ${G} .tg-resume-state { margin-left: 6px; letter-spacing: 0.06em; color: rgba(244, 241, 233, 0.6); }
    ${G} .tg-resume-what { margin: 0; font-family: Georgia, 'Times New Roman', serif; font-size: 15.5px; line-height: 1.35; }
    ${G} .tg-resume-actions { display: flex; flex-wrap: wrap; gap: 10px; margin-top: 6px; }
    ${G} .tg-resume-actions .tx-button { min-height: 42px; padding: 0 16px; }

    /* ------------------------------------------------------------- the quiet moment */
    ${G} .tg-ritual {
      position: relative; isolation: isolate; display: flex; flex-direction: column; align-items: center; gap: 8px; text-align: center; padding: 2px 6px 4px;
    }
    ${G} .tg-halo {
      position: absolute; z-index: -1; left: 50%; top: 42%; width: min(92%, 400px); aspect-ratio: 1; pointer-events: none; border-radius: 50%;
      transform: translate(-50%, -50%) scale(1);
      background: radial-gradient(closest-side, rgba(${accent}, 0.2), rgba(132, 168, 255, 0.09) 56%, transparent 100%);
      opacity: 0.8; will-change: opacity, transform;
      animation: tg-breathe 9s ease-in-out infinite;
    }
    ${G} .tg-chip { margin: 0; display: flex; flex-wrap: wrap; justify-content: center; align-items: baseline; gap: 1px 10px; font-size: 12.5px; line-height: 1.4; color: rgba(244, 241, 233, 0.82); }
    ${G} .tg-chip-intention { flex-basis: 100%; }
    ${G} .tg-chip-label { font-size: 10.5px; letter-spacing: 0.18em; text-transform: uppercase; color: rgba(var(--kt-secondary-accent-rgb, ${accent}), 0.86); }
    ${G} .tg-chip-sep { display: none; }
    ${G} .tg-chip-area { font-size: 11.5px; letter-spacing: 0.08em; text-transform: uppercase; color: rgba(244, 241, 233, 0.62); }
    ${G} .tg-chip-intention { font-family: Georgia, 'Times New Roman', serif; font-size: 16.5px; color: rgba(250, 249, 245, 0.96); }
    ${G} .tg-focus-line { margin: 0; max-width: 44ch; font-size: 12.5px; line-height: 1.42; color: rgba(244, 241, 233, 0.58); }
    ${G} .tg-ritual-line { margin: 0; font-family: Georgia, 'Times New Roman', serif; font-weight: 400; text-wrap: balance; opacity: 0; animation: tg-rise 800ms cubic-bezier(0.22, 0.7, 0.2, 1) both; }
    ${G} h1.tg-ritual-line { margin-top: 0; font-size: clamp(23px, 6.4vw, 29px); line-height: 1.2; color: rgba(255, 253, 248, 0.98); animation-delay: 150ms; }
    ${G} p.tg-ritual-line { max-width: 31ch; font-size: clamp(15px, 4.2vw, 18px); line-height: 1.45; color: rgba(246, 244, 238, 0.9); }
    ${G} .tg-ritual-2 { animation-delay: 700ms; }
    /* Wider than a phone: the seven areas in two columns, so that all of them are in view together. */
    @media (min-width: 560px) {
      ${G} .tg-areas { display: grid; grid-template-columns: 1fr 1fr; gap: 10px; }
      ${G} .tg-areas > li:last-child { grid-column: 1 / -1; }
      ${G} .tg-areas .tg-choice { height: 100%; }
    }
    ${G} .tg-ritual-3 { animation-delay: 1250ms; }
    /* The invitation and its button are always within reach: where the quiet moment is taller than the screen, this foot stays at the bottom of the page while the words above it scroll. */
    ${G} .tg-ritual-foot {
      position: sticky; bottom: 0; z-index: 3; width: calc(100% + 12px); margin: 2px -6px -4px; padding: 14px 6px 8px;
      display: flex; flex-direction: column; align-items: center; gap: 10px;
      background: linear-gradient(to top, rgba(10, 13, 24, 0.97) 74%, rgba(10, 13, 24, 0));
    }
    ${G} .tg-ready { min-width: 220px; opacity: 0; animation: tg-rise 700ms cubic-bezier(0.22, 0.7, 0.2, 1) 1400ms both; }
    @keyframes tg-rise { from { opacity: 0; transform: translateY(8px); } to { opacity: 1; transform: translateY(0); } }
    @keyframes tg-breathe { 0%, 100% { opacity: 0.62; transform: translate(-50%, -50%) scale(0.95); } 50% { opacity: 0.95; transform: translate(-50%, -50%) scale(1.05); } }

    /* ------------------------------------------------------------ before the shuffle
       What is about to be drawn for, in the clear space above the line that asks for the shuffle, and the way back. */
    ${H} > .tg-shuffle-head {
      position: absolute; left: var(--ko-cx, 50%); top: calc(var(--th-line-top, 0px) - 96px); transform: translateX(-50%); z-index: 4;
      width: min(92%, 420px); display: flex; flex-direction: column; align-items: center; gap: 0; text-align: center;
    }
    ${H}[data-tx-hero="shuffling"] > .tg-shuffle-head { display: none; }
    ${H} > .tg-shuffle-head .tg-chip { gap: 2px; text-shadow: 0 1px 8px rgba(4, 7, 13, 0.9); }
    ${H} > .tg-shuffle-head .tg-chip-label { font-size: 10px; letter-spacing: 0.18em; text-transform: uppercase; color: rgba(var(--kt-secondary-accent-rgb, ${accent}), 0.9); }
    ${H} > .tg-shuffle-head .tg-chip-area { font-size: 10.5px; letter-spacing: 0.08em; text-transform: uppercase; color: rgba(244, 241, 233, 0.7); }
    ${H} > .tg-shuffle-head .tg-chip-intention { font-family: Georgia, 'Times New Roman', serif; font-size: 15px; line-height: 1.3; color: rgba(250, 249, 245, 0.96); }
    ${H} > .tg-shuffle-head .tg-back { min-height: 40px; margin: 2px 0 0; }

    /* ----------------------------------------------------------------- the reading */
    ${D} .tg-reading-head { display: flex; flex-direction: column; gap: 8px; }
    ${D} .tg-eyebrow { margin: 0; font-size: 11px; letter-spacing: 0.16em; text-transform: uppercase; color: rgba(var(--kt-secondary-accent-rgb, ${accent}), 0.9); }
    ${D} .tg-opening { margin: 0; font-size: 14px; line-height: 1.6; color: rgba(244, 241, 233, 0.7); }
    ${D} .tg-ask { margin: -2px 0 8px; font-size: 12.5px; line-height: 1.5; font-style: italic; color: rgba(244, 241, 233, 0.56); }

    @media (prefers-reduced-motion: reduce) {
      ${G} .tg-halo { animation: none; opacity: 0.75; }
      ${G} .tg-ritual-line, ${G} .tg-ready { animation: none; opacity: 1; transform: none; }
      ${D} .tg-mode, ${G} .tg-choice { transition: none; }
    }
  `;
}
