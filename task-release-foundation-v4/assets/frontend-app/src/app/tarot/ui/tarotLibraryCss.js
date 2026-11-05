/**
 * THE LIBRARY'S LOOK: the application's dark glass and restrained gold, drawn with the cheapest things a phone has.
 *
 * No backdrop-filter and no blur anywhere in the library: a 78-card gallery that scrolls over a blurred layer is exactly the
 * kind of surface an Android WebView drops frames on. The "glass" is a translucent fill, a hairline in the accent and one soft
 * shadow. Motion is opacity and transform only, on one element at a time, and it is off under prefers-reduced-motion.
 * Colours come from the interface's own variables (--kt-accent-rgb) so a change of accent reaches the library too.
 */
export function tarotLibraryCss() {
    const A = 'var(--kt-accent-rgb, 216, 195, 142)';
    return `
    .tl-root { position: fixed; inset: 0; z-index: 9300; display: flex; justify-content: center; color: rgba(244, 241, 233, 0.92);
      background: radial-gradient(120% 70% at 50% 0%, rgba(30, 38, 70, 0.97), rgba(7, 9, 16, 0.985) 62%), #05070c;
      animation: tl-in 0.2s ease-out both; }
    .tl-root * { box-sizing: border-box; }
    .tl-sheet { position: relative; width: min(100%, 720px); height: 100%; display: flex; flex-direction: column; }
    .tl-visually-hidden { position: absolute; width: 1px; height: 1px; margin: -1px; padding: 0; overflow: hidden; clip: rect(0 0 0 0); clip-path: inset(50%); white-space: nowrap; border: 0; }

    .tl-head { flex: none; display: flex; align-items: center; gap: 8px; padding: max(10px, env(safe-area-inset-top)) 12px 8px;
      border-bottom: 1px solid rgba(${A}, 0.16); }
    .tl-title { flex: 1; margin: 0; text-align: center; font-family: Georgia, 'Times New Roman', serif; font-weight: 400; font-size: 20px; line-height: 1.2;
      overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
    .tl-title:focus { outline: none; }
    .tl-spacer { flex: none; width: 44px; height: 44px; }
    .tl-icon { display: inline-flex; align-items: center; justify-content: center; flex: none; width: 44px; height: 44px; padding: 0; border-radius: 999px; cursor: pointer; font-size: 26px; line-height: 1;
      color: rgba(250, 249, 245, 0.92); background: rgba(255, 255, 255, 0.05); border: 1px solid rgba(${A}, 0.28); }
    .tl-icon:active { transform: scale(0.95); }
    .tl-root button:focus-visible, .tl-root input:focus-visible, .tl-root a:focus-visible { outline: 2px solid rgba(${A}, 0.9); outline-offset: 2px; }

    .tl-body { flex: 1; min-height: 0; overflow-y: auto; overscroll-behavior: contain; -webkit-overflow-scrolling: touch;
      padding: 12px 0 max(28px, env(safe-area-inset-bottom)); scroll-behavior: smooth; }
    .tl-tools { display: flex; flex-direction: column; gap: 10px; padding: 0 14px 12px; }
    .tl-deckchip { display: flex; align-items: center; gap: 10px; width: 100%; min-height: 52px; padding: 6px 12px 6px 6px; cursor: pointer; text-align: left;
      color: inherit; border-radius: 14px; background: rgba(255, 255, 255, 0.05); border: 1px solid rgba(${A}, 0.32); }
    .tl-deckchip-img { width: 32px; height: 44px; object-fit: cover; border-radius: 4px; flex: none; }
    .tl-deckchip-text { display: flex; flex-direction: column; min-width: 0; }
    .tl-deckchip-kicker { font-size: 10.5px; letter-spacing: 0.12em; text-transform: uppercase; color: rgba(244, 241, 233, 0.6); }
    .tl-deckchip-name { font-family: Georgia, 'Times New Roman', serif; font-size: 16px; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
    .tl-search { display: block; }
    .tl-input { width: 100%; height: 44px; padding: 0 14px; border-radius: 12px; font: inherit; font-size: 16px; color: inherit;
      background: rgba(255, 255, 255, 0.06); border: 1px solid rgba(${A}, 0.28); }
    .tl-input::placeholder { color: rgba(244, 241, 233, 0.45); }
    .tl-chips { display: flex; flex-wrap: nowrap; gap: 8px; margin: 0 -14px; padding: 2px 14px; overflow-x: auto; overscroll-behavior-x: contain; scrollbar-width: none; }
    .tl-chips::-webkit-scrollbar { display: none; }
    .tl-chip { flex: none; }
    .tl-chip { min-height: 36px; padding: 0 14px; border-radius: 999px; cursor: pointer; font: inherit; font-size: 13px; color: rgba(244, 241, 233, 0.82);
      background: rgba(255, 255, 255, 0.04); border: 1px solid rgba(244, 241, 233, 0.2); }
    .tl-chip[aria-pressed='true'] { color: #fff; background: rgba(${A}, 0.2); border-color: rgba(${A}, 0.75); }
    .tl-count { margin: 0; font-size: 12px; color: rgba(244, 241, 233, 0.6); }

    .tl-grid { list-style: none; margin: 0; padding: 0 14px; display: grid; grid-template-columns: repeat(auto-fill, minmax(92px, 1fr)); gap: 16px 10px; }
    .tl-cell { content-visibility: auto; contain-intrinsic-size: auto 190px; }
    .tl-empty { grid-column: 1 / -1; padding: 28px 0; text-align: center; color: rgba(244, 241, 233, 0.6); }
    .tl-card { display: flex; flex-direction: column; gap: 6px; width: 100%; padding: 0; cursor: pointer; text-align: center; color: inherit; background: none; border: 0; }
    .tl-card:active .tl-frame { transform: scale(0.97); }
    .tl-frame { position: relative; display: block; width: 100%; overflow: hidden; border-radius: 7px; background: rgba(255, 255, 255, 0.04);
      border: 1px solid rgba(${A}, 0.3); box-shadow: 0 6px 14px rgba(0, 0, 0, 0.38); transition: transform 0.12s ease-out; }
    .tl-art, .tl-hero-art { display: block; width: 100%; height: 100%; object-fit: cover; animation: tl-fade 0.22s ease-out both; }
    .tl-name { font-size: 11.5px; line-height: 1.25; color: rgba(244, 241, 233, 0.86); overflow-wrap: anywhere; }
    .tl-num { color: rgba(${A}, 0.95); font-variant-numeric: tabular-nums; }
    .tl-card.is-missing .tl-frame, .tl-hero.is-missing { background: transparent; border-style: dashed; box-shadow: none; }
    .tl-missing { position: absolute; inset: 0; display: flex; align-items: center; justify-content: center; padding: 6px; text-align: center; font-size: 11px; color: rgba(244, 241, 233, 0.55); }

    .tl-page { display: flex; flex-direction: column; align-items: center; gap: 12px; padding: 0 18px; }
    .tl-kicker { margin: 0; font-size: 11px; letter-spacing: 0.14em; text-transform: uppercase; color: rgba(${A}, 0.95); }
    .tl-hero { position: relative; display: block; width: min(64vw, 280px); padding: 0; overflow: hidden; cursor: pointer; border-radius: 10px;
      background: rgba(255, 255, 255, 0.04); border: 1px solid rgba(${A}, 0.45); box-shadow: 0 14px 30px rgba(0, 0, 0, 0.5), 0 0 22px rgba(${A}, 0.14); }
    .tl-hero.is-missing { cursor: default; }
    .tl-hero-art { transition: transform 0.32s ease-out; }
    .tl-page[data-tl-reversed='true'] .tl-hero-art { transform: rotate(180deg); }
    .tl-cover { cursor: default; }
    .tl-pager { display: flex; align-items: center; gap: 14px; }
    .tl-pager-text { min-width: 64px; text-align: center; font-size: 12px; color: rgba(244, 241, 233, 0.6); font-variant-numeric: tabular-nums; }
    .tl-seg { display: inline-flex; padding: 3px; border-radius: 999px; background: rgba(255, 255, 255, 0.05); border: 1px solid rgba(${A}, 0.28); }
    .tl-segbtn { min-height: 38px; padding: 0 18px; border-radius: 999px; cursor: pointer; font: inherit; font-size: 13px; color: rgba(244, 241, 233, 0.78); background: transparent; border: 0; }
    .tl-segbtn[aria-pressed='true'] { color: #fff; background: rgba(${A}, 0.24); }
    .tl-note { width: 100%; margin: 0; padding: 10px 12px; border-radius: 10px; font-size: 13px; line-height: 1.5; color: rgba(244, 241, 233, 0.84);
      background: rgba(255, 255, 255, 0.045); border: 1px solid rgba(244, 241, 233, 0.16); }
    .tl-note.is-positional, .tl-note.is-missing { border-color: rgba(${A}, 0.5); }
    .tl-printed { width: 100%; margin: 0; font-size: 12.5px; color: rgba(244, 241, 233, 0.62); }
    .tl-essence { width: 100%; margin: 4px 0 0; font-family: Georgia, 'Times New Roman', serif; font-size: 18px; line-height: 1.45; text-align: center; color: rgba(250, 249, 245, 0.95); }
    .tl-section { width: 100%; padding-top: 14px; border-top: 1px solid rgba(244, 241, 233, 0.12); opacity: 0.78; }
    .tl-section.is-active { opacity: 1; }
    .tl-section h3 { margin: 0 0 8px; font-size: 11.5px; letter-spacing: 0.14em; text-transform: uppercase; font-weight: 600; color: rgba(${A}, 0.95); }
    .tl-section p { margin: 0 0 10px; font-size: 15px; line-height: 1.7; max-width: 62ch; overflow-wrap: anywhere; hyphens: auto; -webkit-hyphens: auto; }
    .tl-credit { width: 100%; margin: 0; text-align: center; }
    .tl-link { padding: 8px 4px; font: inherit; font-size: 12.5px; cursor: pointer; color: rgba(244, 241, 233, 0.62); background: none; border: 0; text-decoration: underline; text-underline-offset: 3px; }

    .tl-intro { margin: 0 14px 12px; font-size: 14px; line-height: 1.6; color: rgba(244, 241, 233, 0.78); }
    .tl-body > .tl-note, .tl-body > .tl-printed { width: auto; margin: 0 14px 12px; }
    .tl-decks { list-style: none; margin: 0; padding: 0 14px; display: flex; flex-direction: column; gap: 14px; }
    .tl-deck { display: grid; grid-template-columns: 104px 1fr; gap: 14px; padding: 12px; border-radius: 16px; background: rgba(255, 255, 255, 0.045); border: 1px solid rgba(244, 241, 233, 0.16); }
    .tl-deck.is-selected { border-color: rgba(${A}, 0.85); box-shadow: 0 0 0 1px rgba(${A}, 0.35), 0 0 24px rgba(${A}, 0.16); }
    .tl-deck-cover { position: relative; display: block; width: 100%; padding: 0; overflow: hidden; cursor: pointer; border-radius: 8px; align-self: start;
      background: rgba(255, 255, 255, 0.04); border: 1px solid rgba(${A}, 0.35); }
    .tl-tick { position: absolute; right: 5px; bottom: 5px; width: 24px; height: 24px; display: flex; align-items: center; justify-content: center; border-radius: 999px;
      font-size: 14px; color: #12100a; background: rgba(${A}, 0.97); }
    .tl-deck-main { min-width: 0; display: flex; flex-direction: column; gap: 6px; }
    .tl-deck-name { margin: 0; font-family: Georgia, 'Times New Roman', serif; font-weight: 400; font-size: 18px; line-height: 1.2; }
    .tl-deck-meta { margin: 0; font-size: 12.5px; color: rgba(244, 241, 233, 0.62); }
    .tl-badges { display: flex; flex-wrap: wrap; gap: 6px; margin: 0; }
    .tl-badge { padding: 2px 9px; border-radius: 999px; font-size: 11px; letter-spacing: 0.04em; color: rgba(244, 241, 233, 0.82); border: 1px solid rgba(244, 241, 233, 0.22); }
    .tl-group { margin: 0 0 18px; }
    .tl-group-title { margin: 0 14px 4px; font-size: 13px; letter-spacing: 0.14em; text-transform: uppercase; color: rgba(${A}, 0.95); font-weight: 600; }
    .tl-group-hint { margin: 0 14px 10px; font-size: 13px; line-height: 1.5; color: rgba(244, 241, 233, 0.72); }
    .tl-badge.is-readings { color: #12100a; background: rgba(244, 241, 233, 0.88); border-color: transparent; }
    .tl-badge.is-encyclopedia { border-style: dashed; }
    .tl-badge.is-free { color: rgba(${A}, 1); border-color: rgba(${A}, 0.55); }
    .tl-badge.is-selected { color: #12100a; background: rgba(${A}, 0.95); border-color: transparent; }
    .tl-deck-desc { margin: 0; font-size: 13.5px; line-height: 1.55; color: rgba(244, 241, 233, 0.78); }
    .tl-deck-actions { display: flex; flex-wrap: wrap; gap: 8px; margin: 2px 0 0; }
    .tl-btn { min-height: 44px; padding: 0 16px; border-radius: 999px; cursor: pointer; font: inherit; font-size: 14px; color: rgba(250, 249, 245, 0.94);
      background: rgba(255, 255, 255, 0.06); border: 1px solid rgba(${A}, 0.42); }
    .tl-btn.is-primary { background: rgba(${A}, 0.24); border-color: rgba(${A}, 0.8); }
    .tl-btn:disabled { cursor: default; opacity: 0.6; }
    .tl-btn:active:not(:disabled) { transform: scale(0.97); }
    .tl-check { display: flex; align-items: center; gap: 10px; min-height: 44px; font-size: 13.5px; }
    .tl-check input { width: 22px; height: 22px; accent-color: rgb(${A}); }
    .tl-strip { list-style: none; margin: 0 -18px; padding: 2px 18px 8px; display: flex; gap: 12px; overflow-x: auto; overscroll-behavior-x: contain; scroll-snap-type: x proximity; }
    .tl-strip-item { flex: none; width: 112px; scroll-snap-align: start; }
    .tl-credits dl { margin: 0; font-size: 13px; line-height: 1.55; }
    .tl-credits dt { margin-top: 8px; font-size: 11px; letter-spacing: 0.1em; text-transform: uppercase; color: rgba(244, 241, 233, 0.55); }
    .tl-credits dd { margin: 2px 0 0; overflow-wrap: anywhere; color: rgba(244, 241, 233, 0.86); }
    .tl-credits a { color: rgba(${A}, 1); }

    .tl-zoom { position: absolute; inset: 0; z-index: 4; display: flex; align-items: center; justify-content: center; background: rgba(2, 3, 6, 0.97); animation: tl-fade 0.18s ease-out both; }
    .tl-zoom-img { max-width: 100%; max-height: 100%; width: auto; height: auto; object-fit: contain; }
    .tl-zoom-close { position: absolute; top: max(10px, env(safe-area-inset-top)); right: 12px; width: 44px; height: 44px; border-radius: 999px; font-size: 26px; cursor: pointer;
      color: rgba(250, 249, 245, 0.92); background: rgba(255, 255, 255, 0.08); border: 1px solid rgba(${A}, 0.35); }
    .tl-zoom-img[data-kt-art-reversed] { transform: rotate(180deg); }

    @keyframes tl-in { from { opacity: 0; transform: translateY(8px); } to { opacity: 1; transform: none; } }
    @keyframes tl-fade { from { opacity: 0; } to { opacity: 1; } }
    @media (prefers-reduced-motion: reduce) {
      .tl-root, .tl-art, .tl-hero-art, .tl-zoom { animation: none; }
      .tl-hero-art, .tl-frame, .tl-icon, .tl-btn { transition: none; }
      .tl-body { scroll-behavior: auto; }
    }
  `;
}
