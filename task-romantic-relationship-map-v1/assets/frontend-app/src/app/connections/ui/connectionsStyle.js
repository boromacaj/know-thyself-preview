/**
 * THE STYLESHEET OF CONNECTIONS.
 *
 * Written on the interface's own tokens and nothing else - the surface fill, the hairline and border roles, the accent and the secondary accent, the panel radius and the capsule
 * of the rest of Premium Earth - so Settings -> Colors reaches every control (Interface Color) and nothing here has a colour of its own to drift from it. The only literal
 * colours are the ivory of the text, as on every other screen, and one warm tone for an error message, which is a semantic colour and not a theme.
 *
 * NO ANIMATION CLOCK OF OUR OWN. The only motion on these screens is a one-time arrival of a panel (opacity and transform, compositor only), the press of a control, and the
 * application's sonar on the few small chips that carry it (sonarAffordance.ts, not redefined here). With motion reduced there is no animation at all.
 *
 * LAYOUT. One column, 640px at most, padded clear of the profile control at the top and of the MENU capsule at the foot; every control is at least 44px tall; nothing is wider
 * than the screen at 360px, and the only horizontal scroller is the strip of dimension chips, which is meant to be one.
 */
export function connectionsCss() {
    const D = '#place-experience#place-experience';
    const accent = 'var(--kt-accent-rgb, 216, 195, 142)';
    const secondary = 'var(--kt-secondary-accent-rgb, var(--kt-accent-rgb, 216, 195, 142))';
    const line = 'var(--kt-surface-line, rgba(255, 255, 255, 0.12))';
    const fill = 'var(--kt-surface-fill-rgb, 10, 12, 16)';
    const border = 'var(--kt-surface-border-rgb, var(--kt-accent-soft-rgb, 255, 255, 255))';
    return `
    /* The last of the screen would otherwise sit under the MENU capsule. The readings reserve exactly this much. */
    /* THE MENU CAPSULE NEVER COVERS READING. It floats over the foot of the screen, so what scrolls beneath it fades out before it reaches it (opaque above, gone behind the capsule), and the
       end of the page stops above the fade: the last line is fully visible and nothing legible sits under the capsule. */
    ${D} #connections-view {
      padding-bottom: calc(var(--kt-pillar-nav-height, 46px) + 112px + var(--safe-bottom, 0px));
      -webkit-mask-image: linear-gradient(to bottom, #000 0, #000 calc(100% - var(--kt-pillar-nav-height, 46px) - 92px - var(--safe-bottom, 0px)), transparent calc(100% - var(--kt-pillar-nav-height, 46px) - 22px - var(--safe-bottom, 0px)));
      mask-image: linear-gradient(to bottom, #000 0, #000 calc(100% - var(--kt-pillar-nav-height, 46px) - 92px - var(--safe-bottom, 0px)), transparent calc(100% - var(--kt-pillar-nav-height, 46px) - 22px - var(--safe-bottom, 0px)));
    }

    ${D} .cx { display: flex; flex-direction: column; gap: 14px; max-width: 640px; margin: 0 auto; padding: 40px 0 0; color: rgba(244, 241, 233, 0.92); }
    ${D} .cx * { box-sizing: border-box; }
    ${D} .cx button:focus-visible, ${D} .cx summary:focus-visible, ${D} .cx a:focus-visible, ${D} .cx input:focus-visible, ${D} .cx-sheet button:focus-visible, ${D} .cx-sheet input:focus-visible {
      outline: 2px solid rgba(${accent}, 0.9); outline-offset: 2px;
    }

    /* ------------------------------------------------------------------ type */
    ${D} .cx-title { margin: 0; font-family: Georgia, 'Times New Roman', serif; font-weight: 400; font-size: clamp(26px, 7.4vw, 34px); line-height: 1.16; text-wrap: balance; }
    ${D} .cx-headline { font-size: clamp(23px, 6.6vw, 30px); margin-top: 4px; }
    ${D} .cx-sub { margin: 6px 0 0; max-width: 46ch; font-size: 14px; line-height: 1.55; color: rgba(244, 241, 233, 0.68); }
    ${D} .cx h2 { margin: 0 0 8px; font-size: 12px; font-weight: 400; letter-spacing: 0.16em; text-transform: uppercase; color: rgba(${secondary}, 0.9); }
    ${D} .cx h3 { margin: 0 0 6px; font-family: Georgia, 'Times New Roman', serif; font-weight: 400; font-size: 19px; line-height: 1.28; }
    ${D} .cx h4 { margin: 14px 0 6px; font-size: 11.5px; font-weight: 400; letter-spacing: 0.14em; text-transform: uppercase; color: rgba(${secondary}, 0.86); }
    ${D} .cx p { margin: 0 0 10px; font-size: 15px; line-height: 1.64; }
    ${D} .cx p:last-child { margin-bottom: 0; }
    ${D} .cx-note { font-size: 12.5px !important; line-height: 1.5 !important; color: rgba(244, 241, 233, 0.58); }
    ${D} .cx-center { text-align: center; justify-content: center; }
    ${D} .cx-error { color: rgba(255, 176, 158, 0.96); font-size: 13px !important; }
    ${D} .cx-care { margin-top: 12px !important; padding-top: 12px; border-top: 1px solid ${line}; font-size: 13px !important; color: rgba(244, 241, 233, 0.66); }

    /* ---------------------------------------------------------------- panels
       One panel, the Tarot screen's: the radius, the hairline and the padding. Its fill and blur are the unified glass material's. */
    ${D} .cx-panel {
      border-radius: 18px; border: 1px solid ${line}; background: rgba(${fill}, 0.42);
      backdrop-filter: blur(18px) saturate(1.08); -webkit-backdrop-filter: blur(18px) saturate(1.08);
      padding: 16px 15px; animation: cx-rise 420ms cubic-bezier(0.22, 0.7, 0.2, 1) both;
    }
    ${D} .cx-head { display: flex; flex-direction: column; }
    ${D} .cx-head-setup { flex-direction: row; align-items: center; gap: 12px; }
    ${D} .cx-foot { display: flex; flex-direction: column; align-items: center; gap: 4px; padding: 6px 4px 0; text-align: center; }

    /* --------------------------------------------------------------- domains */
    ${D} .cx-domains { display: grid; grid-template-columns: 1fr 1fr; gap: 12px; }
    ${D} .cx-domain {
      position: relative; display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 8px; min-height: 164px; margin: 0; padding: 16px 10px 14px;
      font: inherit; color: rgba(250, 249, 245, 0.94); text-align: center; cursor: pointer;
      border-radius: 18px; border: 1px solid rgba(${border}, 0.26); background: rgba(${fill}, 0.42);
      backdrop-filter: blur(18px) saturate(1.08); -webkit-backdrop-filter: blur(18px) saturate(1.08);
      box-shadow: 0 14px 30px -10px rgba(0, 0, 0, 0.55), 0 0 0 1px rgba(255, 255, 255, 0.035) inset;
      -webkit-tap-highlight-color: transparent; animation: cx-rise 420ms cubic-bezier(0.22, 0.7, 0.2, 1) both;
      transition: border-color 180ms ease-in-out, transform 120ms ease-out, box-shadow 180ms ease-in-out;
    }
    ${D} .cx-domain:nth-child(2) { animation-delay: 60ms; } ${D} .cx-domain:nth-child(3) { animation-delay: 120ms; } ${D} .cx-domain:nth-child(4) { animation-delay: 180ms; }
    ${D} .cx-domain:active { transform: translateY(1px); }
    @media (hover: hover) { ${D} .cx-domain:hover { border-color: rgba(${accent}, 0.6); box-shadow: 0 14px 30px -10px rgba(0, 0, 0, 0.55), 0 0 18px rgba(${accent}, 0.16); } }
    ${D} .cx-domain-art, ${D} .cx-domain-art svg { display: block; color: rgba(${accent}, 0.94); }
    ${D} .cx-domain-art svg { width: 46px; height: 46px; filter: drop-shadow(0 0 5px rgba(${accent}, 0.3)); }
    ${D} .cx-domain-art.cx-small svg { width: 34px; height: 34px; }
    ${D} .cx-domain-name { font-size: 12px; letter-spacing: 0.16em; text-transform: uppercase; }
    ${D} .cx-domain-line { font-size: 12.5px; line-height: 1.4; color: rgba(244, 241, 233, 0.62); max-width: 20ch; }

    /* ----------------------------------------------------------------- chips
       The capsule the strip and the portrait use: 999px, uppercase, the surface hairline. A chip that is on wears the accent, as the strip's active capsule does. */
    ${D} .cx-chips { display: flex; flex-wrap: wrap; gap: 8px; }
    ${D} .cx-chip {
      position: relative; display: inline-flex; align-items: center; justify-content: center; min-height: 44px; margin: 0; padding: 0 16px;
      font: inherit; font-size: 12.5px; line-height: 1.25; text-align: center; color: rgba(250, 249, 245, 0.84);
      background: transparent; border: 1px solid rgba(${border}, 0.4); border-radius: 999px; cursor: pointer;
      -webkit-tap-highlight-color: transparent; transition: border-color 180ms ease-in-out, background-color 180ms ease-in-out, box-shadow 180ms ease-in-out;
    }
    ${D} .cx-chip.is-on { color: rgba(255, 253, 248, 1); border-color: rgba(${accent}, 0.8); background-color: rgba(${accent}, 0.16); box-shadow: 0 0 14px rgba(${accent}, 0.2); }
    @media (hover: hover) { ${D} .cx-chip:not(.is-on):hover { border-color: rgba(${accent}, 0.55); } }
    ${D} .cx-people { list-style: none; margin: 0 0 4px; padding: 0; display: flex; flex-direction: column; gap: 6px; }
    ${D} .cx-people li { display: flex; align-items: center; justify-content: space-between; gap: 10px; min-height: 44px; padding: 0 14px; font-size: 14px; border: 1px solid ${line}; border-radius: 14px; background: rgba(255, 255, 255, 0.04); }
    ${D} .cx-chosen li { border-color: rgba(${accent}, 0.4); }
    ${D} .cx-role { display: flex; flex-wrap: wrap; align-items: center; gap: 8px; margin: 6px 0 8px; }
    ${D} .cx-role-q { font-size: 12.5px; color: rgba(244, 241, 233, 0.66); }
    ${D} .cx-link-button { min-height: 44px; padding: 0 8px; font: inherit; font-size: 12px; color: rgba(${accent}, 0.95); background: none; border: 0; cursor: pointer; text-decoration: underline; text-underline-offset: 3px; text-decoration-color: rgba(${accent}, 0.45); }
    ${D} .cx-optional details > summary, ${D} .cx-evidence > summary { display: flex; align-items: center; justify-content: space-between; gap: 10px; min-height: 44px; margin: -6px 0; cursor: pointer; list-style: none; font-size: 12px; letter-spacing: 0.16em; text-transform: uppercase; color: rgba(${secondary}, 0.9); }
    ${D} .cx-optional details > summary::-webkit-details-marker, ${D} .cx-evidence > summary::-webkit-details-marker { display: none; }
    ${D} .cx-optional details > summary::after, ${D} .cx-evidence > summary::after { content: '+'; font-size: 18px; letter-spacing: 0; }
    ${D} .cx-optional details[open] > summary::after, ${D} .cx-evidence[open] > summary::after { content: '–'; }
    ${D} .cx-opt { margin-left: auto; margin-right: 8px; font-size: 11px; letter-spacing: 0.08em; color: rgba(244, 241, 233, 0.5); text-transform: none; }
    ${D} .cx-optional .cx-chips { margin-top: 10px; }

    /* --------------------------------------------------------------- buttons */
    ${D} .cx-actions { display: flex; flex-wrap: wrap; gap: 10px; }
    ${D} .cx-button {
      display: inline-flex; align-items: center; justify-content: center; min-height: 46px; margin: 0; padding: 0 20px; font: inherit; font-size: 11px; letter-spacing: 0.08em; text-transform: uppercase;
      color: rgba(250, 249, 245, 0.86); background: transparent; border: 1px solid rgba(${border}, 0.42); border-radius: 999px; cursor: pointer;
      -webkit-tap-highlight-color: transparent; transition: border-color 180ms ease-in-out, transform 120ms ease-out, opacity 180ms ease-in-out;
    }
    ${D} .cx-button:active:not(:disabled) { transform: translateY(1px); }
    ${D} .cx-button:disabled { opacity: 0.45; cursor: default; }
    ${D} .cx-button.cx-primary {
      min-width: 220px; color: rgba(255, 253, 248, 1); border-color: rgba(${accent}, 0.72);
      background-image: linear-gradient(rgba(${accent}, 0.16), rgba(${accent}, 0.16));
      box-shadow: 0 0 0 1px rgba(255, 255, 255, 0.05) inset, 0 0 12px rgba(var(--kt-accent-soft-rgb, 255, 255, 255), 0.2), 0 0 30px rgba(${accent}, 0.16);
    }
    ${D} .cx-button.cx-quiet { border-color: ${line}; color: rgba(244, 241, 233, 0.78); }
    ${D} .cx-bar { display: flex; align-items: center; min-height: 40px; margin-bottom: -4px; }
    ${D} .cx-back { display: inline-flex; align-items: center; gap: 6px; min-height: 44px; margin: -4px 0 -4px -6px; padding: 0 8px; font: inherit; font-size: 11px; letter-spacing: 0.1em; text-transform: uppercase; color: rgba(244, 241, 233, 0.74); background: none; border: 0; border-radius: 999px; cursor: pointer; -webkit-tap-highlight-color: transparent; }
    ${D} .cx-back span { font-size: 17px; line-height: 1; }

    /* ---------------------------------------------------------------- result */
    ${D} .cx-hero { display: flex; flex-direction: column; gap: 6px; padding-top: 14px; }
    ${D} .cx-constellation { display: block; width: 100%; max-width: 360px; height: auto; margin: 0 auto 6px; color: rgba(244, 241, 233, 0.8); overflow: visible; }
    ${D} .cx-link { stroke: currentColor; stroke-width: 1; opacity: 0.38; }
    ${D} .cx-link.is-lit { stroke: rgba(${accent}, 1); opacity: 0.95; stroke-width: 1.4; filter: drop-shadow(0 0 4px rgba(${accent}, 0.55)); }
    ${D} .cx-disc circle { fill: rgba(${fill}, 0.7); stroke: rgba(${accent}, 0.7); stroke-width: 1.2; }
    ${D} .cx-disc text { fill: rgba(255, 253, 248, 0.95); font: 13px Georgia, 'Times New Roman', serif; }
    ${D} .cx-between { margin: 0 !important; text-align: center; font-size: 12px !important; letter-spacing: 0.1em; text-transform: uppercase; color: rgba(${secondary}, 0.9); }
    ${D} .cx-hero .cx-headline { text-align: center; }
    ${D} .cx-prose p { font-size: 15.5px; line-height: 1.68; }
    ${D} .cx-glances { display: flex; flex-wrap: wrap; justify-content: center; gap: 10px; margin-top: 8px; }
    ${D} .cx-glance {
      position: relative; display: inline-flex; flex-direction: column; align-items: flex-start; gap: 2px; min-height: 52px; max-width: 100%; margin: 0; padding: 7px 16px 8px 30px;
      font: inherit; text-align: left; color: rgba(250, 249, 245, 0.92); background: transparent; border: 1px solid rgba(${border}, 0.42); border-radius: 999px; cursor: pointer; -webkit-tap-highlight-color: transparent;
    }
    ${D} .cx-glance::before { content: ''; position: absolute; left: 13px; top: 50%; width: 9px; height: 9px; transform: translateY(-50%); border: 1.4px solid rgba(${accent}, 0.95); border-radius: 50%; }
    ${D} .cx-glance-resonance::before { background: rgba(${accent}, 0.9); }
    ${D} .cx-glance-complement::before { background: linear-gradient(90deg, rgba(${accent}, 0.9) 50%, transparent 50%); }
    ${D} .cx-glance-friction::before { border-radius: 2px; transform: translateY(-50%) rotate(45deg); }
    ${D} .cx-glance-role { font-size: 10px; letter-spacing: 0.14em; text-transform: uppercase; color: rgba(${secondary}, 0.9); }
    ${D} .cx-glance-label { font-size: 13px; line-height: 1.25; }
    ${D} .cx-noticed { display: flex; flex-wrap: wrap; align-items: center; gap: 6px 8px; margin-top: 10px !important; font-size: 12px !important; color: rgba(244, 241, 233, 0.6); }
    ${D} .cx-tag { padding: 3px 10px; border: 1px solid ${line}; border-radius: 999px; font-size: 11.5px; color: rgba(244, 241, 233, 0.78); }
    ${D} .cx-pairs { display: flex; gap: 8px; overflow-x: auto; padding: 2px 2px 6px; scrollbar-width: none; -webkit-overflow-scrolling: touch; }
    ${D} .cx-pairs::-webkit-scrollbar, ${D} .cx-strip::-webkit-scrollbar { display: none; }
    ${D} .cx-pairs .cx-chip, ${D} .cx-strip .cx-chip { flex: none; white-space: nowrap; }

    /* ------------------------------------------------------------- explore */
    ${D} .cx-strip { display: flex; gap: 8px; overflow-x: auto; padding: 4px 2px 10px; margin: 0 -2px; scrollbar-width: none; -webkit-overflow-scrolling: touch; scroll-snap-type: x proximity; }
    ${D} .cx-strip .cx-chip { scroll-snap-align: start; }
    ${D} .cx-dim { padding-top: 6px; }
    ${D} .cx-dim header { display: flex; flex-direction: column; align-items: flex-start; gap: 6px; margin-bottom: 4px; }
    ${D} .cx-dim h3 { margin: 0; }
    ${D} .cx-badge { display: inline-block; padding: 3px 10px; font-size: 10px; letter-spacing: 0.14em; text-transform: uppercase; color: rgba(${secondary}, 0.95); border: 1px solid rgba(${secondary}, 0.5); border-radius: 999px; }
    ${D} .cx-scale-wrap { margin: 6px 0 8px; }
    ${D} .cx-scale { display: block; width: 100%; height: auto; max-height: 40px; overflow: visible; }
    ${D} .cx-scale-line { stroke: rgba(244, 241, 233, 0.4); stroke-width: 1; }
    ${D} .cx-scale-mid { fill: rgba(244, 241, 233, 0.4); }
    ${D} .cx-marker circle { fill: rgba(${fill}, 0.8); stroke: rgba(${accent}, 0.9); stroke-width: 1.2; }
    ${D} .cx-marker-second circle { stroke: rgba(${secondary}, 0.95); stroke-dasharray: none; }
    ${D} .cx-marker text { fill: rgba(255, 253, 248, 0.96); font: 10px Georgia, 'Times New Roman', serif; }
    ${D} .cx-scale-ends { display: flex; justify-content: space-between; gap: 12px; font-size: 11.5px; color: rgba(244, 241, 233, 0.6); }
    ${D} .cx-more { margin-top: 6px; }
    ${D} .cx-more > summary, ${D} .cx-research > summary, ${D} .cx-trace-dim > summary { min-height: 44px; display: flex; align-items: center; cursor: pointer; font-size: 12px; letter-spacing: 0.1em; text-transform: uppercase; color: rgba(${accent}, 0.95); }
    ${D} .cx-corroboration { margin-top: 10px !important; font-size: 12px !important; color: rgba(244, 241, 233, 0.55); }

    /* ------------------------------------------------------------- reading */
    ${D} .cx-reading .cx-prose + .cx-prose { margin-top: 14px; padding-top: 14px; border-top: 1px solid ${line}; }
    ${D} .cx-reading h3 { color: rgba(250, 249, 245, 0.98); }

    /* ------------------------------------------------------------ guidance */
    ${D} .cx-practices { display: flex; flex-direction: column; gap: 10px; margin-top: 10px; }
    ${D} .cx-practice { padding: 13px 14px 6px; border: 1px solid ${line}; border-radius: 16px; background: rgba(255, 255, 255, 0.035); }
    ${D} .cx-practice h3 { font-size: 17px; }
    ${D} .cx-for { display: inline-block; margin-bottom: 4px; font-size: 10.5px; letter-spacing: 0.14em; text-transform: uppercase; color: rgba(${secondary}, 0.95); }
    ${D} .cx-research ul { margin: 0 0 8px; padding: 0 0 0 18px; font-size: 12.5px; line-height: 1.5; color: rgba(244, 241, 233, 0.7); }
    ${D} .cx-research a { color: rgba(${accent}, 0.98); }
    ${D} .cx-quality { margin-left: 4px; padding: 1px 7px; border: 1px solid ${line}; border-radius: 999px; font-size: 10.5px; white-space: nowrap; }

    /* ------------------------------------------------------- child + evidence */
    ${D} .cx-age { margin-left: 8px; font-size: 12px; letter-spacing: 0.06em; text-transform: none; color: rgba(244, 241, 233, 0.6); }
    ${D} .cx-situation { border-top: 1px solid ${line}; padding: 2px 0; }
    ${D} .cx-situation > summary { display: flex; align-items: center; gap: 10px; flex-wrap: wrap; min-height: 48px; cursor: pointer; font-family: Georgia, 'Times New Roman', serif; font-size: 16.5px; list-style: none; }
    ${D} .cx-situation > summary::-webkit-details-marker { display: none; }
    ${D} .cx-flag { padding: 2px 9px; font-family: inherit; font-size: 10.5px; letter-spacing: 0.1em; text-transform: uppercase; border: 1px solid rgba(${accent}, 0.5); border-radius: 999px; color: rgba(${accent}, 0.95); }
    ${D} .cx-fit { color: rgba(${secondary}, 0.98); }
    ${D} .cx-evidence { padding: 14px 15px; }
    ${D} .cx-sigs { list-style: none; margin: 0 0 6px; padding: 0; display: flex; flex-direction: column; gap: 8px; }
    ${D} .cx-sigs li { display: flex; flex-wrap: wrap; align-items: center; gap: 6px; font-size: 12.5px; }
    ${D} .cx-sig-text { flex-basis: 100%; font-size: 13.5px; line-height: 1.5; color: rgba(244, 241, 233, 0.78); }
    ${D} .cx-sig-chip { padding: 3px 10px; border: 1px solid rgba(${border}, 0.4); border-radius: 999px; }
    ${D} .cx-sig-rel { color: rgba(${secondary}, 0.95); letter-spacing: 0.06em; }
    ${D} .cx-trace { margin: 0 0 8px; padding: 8px 12px; border-left: 2px solid rgba(${accent}, 0.4); font-size: 12.5px; line-height: 1.5; color: rgba(244, 241, 233, 0.72); }
    ${D} .cx-trace span { display: block; color: rgba(244, 241, 233, 0.55); }
    ${D} .cx-trace ul { margin: 4px 0 0; padding-left: 16px; }

    /* ------------------------------------------------------------- the sheet
       Lives in a host of its own at the root of the application: a dialog inside the screen would have the strip and the profile controls on top of it. */
    ${D} .cx-backdrop { position: fixed; inset: 0; z-index: 9100; display: flex; align-items: flex-end; justify-content: center; background: rgba(4, 6, 10, 0.62); }
    ${D} .cx-sheet {
      width: min(560px, 100%); max-height: 92dvh; overflow-y: auto; overscroll-behavior: contain; padding: 18px 16px calc(18px + var(--safe-bottom, 0px)); color: rgba(244, 241, 233, 0.94);
      border: 1px solid ${line}; border-bottom: 0; border-radius: 22px 22px 0 0; background: rgba(${fill}, 0.9);
      backdrop-filter: blur(22px) saturate(1.1); -webkit-backdrop-filter: blur(22px) saturate(1.1); box-shadow: 0 -14px 44px rgba(2, 4, 10, 0.55);
      animation: cx-sheet-in 260ms cubic-bezier(0.22, 0.7, 0.2, 1) both; touch-action: pan-y;
    }
    ${D} .cx-sheet * { box-sizing: border-box; }
    ${D} .cx-sheet h2 { margin: 0 0 12px; font-family: Georgia, 'Times New Roman', serif; font-weight: 400; font-size: 21px; }
    ${D} .cx-sheet p { margin: 0; }
    ${D} .cx-field { display: flex; flex-direction: column; gap: 6px; margin: 0 0 14px; padding: 0; border: 0; min-width: 0; }
    ${D} .cx-field label, ${D} .cx-field legend { padding: 0; font-size: 12px; letter-spacing: 0.1em; text-transform: uppercase; color: rgba(${secondary}, 0.95); }
    ${D} .cx-field input[type="text"], ${D} .cx-field input[type="search"], ${D} .cx-field input[type="date"], ${D} .cx-field input[type="time"] {
      width: 100%; min-height: 48px; padding: 0 14px; font: inherit; font-size: 16px; color: rgba(250, 249, 245, 0.96);
      background: rgba(255, 255, 255, 0.05); border: 1px solid rgba(${border}, 0.34); border-radius: 12px; color-scheme: dark;
    }
    ${D} .cx-field input[aria-invalid="true"] { border-color: rgba(255, 176, 158, 0.8); }
    ${D} .cx-hint { font-size: 12px; line-height: 1.45; color: rgba(244, 241, 233, 0.56); }
    ${D} .cx-places { scroll-margin-bottom: 96px; list-style: none; margin: 0; padding: 0; border: 1px solid ${line}; border-radius: 12px; overflow: hidden; }
    ${D} .cx-places li + li { border-top: 1px solid ${line}; }
    ${D} .cx-place { display: flex; flex-direction: column; align-items: flex-start; width: 100%; min-height: 48px; padding: 8px 14px; font: inherit; font-size: 14px; text-align: left; color: rgba(250, 249, 245, 0.94); background: none; border: 0; cursor: pointer; }
    ${D} .cx-place span { font-size: 12px; color: rgba(244, 241, 233, 0.58); }
    ${D} .cx-keep { display: flex; align-items: flex-start; gap: 12px; min-height: 44px; margin: 0 0 16px; font-size: 14px; cursor: pointer; }
    ${D} .cx-keep input { width: 22px; height: 22px; margin: 2px 0 0; accent-color: rgb(${accent}); }
    /* The two buttons stay in reach while the form scrolls: on a phone the sheet is taller than the screen, and Add must not be a scroll away. */
    ${D} .cx-sheet .cx-actions { position: sticky; bottom: calc(-18px - var(--safe-bottom, 0px)); z-index: 1; margin: 0 -16px calc(-18px - var(--safe-bottom, 0px)); padding: 12px 16px calc(14px + var(--safe-bottom, 0px)); border-top: 1px solid ${line}; background: rgb(${fill}); }
    ${D} .cx-keep small { display: block; margin-top: 2px; font-size: 12px; color: rgba(244, 241, 233, 0.56); }

    /* ---------------------------------------------------- the relationship map
       The glance (a statement, then each kind of relationship with its areas), the map (one real button per area, the open one followed by its detail), and nothing else. A kind of relationship is a
       SHAPE and a WORD, never a colour alone; the accent and the secondary accent are the interface's own. Rows and links are 44px or taller; nothing is wider than the column. */
    /* THE THREE THINGS TO SEE FIRST: what connects, how the two complement each other, where to pay attention. One card each; a card with nothing defensible to say is dashed and says so. */
    ${D} .cx-rm-cards { list-style: none; margin: 8px 0 0; padding: 0; display: flex; flex-direction: column; gap: 8px; }
    ${D} .cx-rm-card { --cx-accent: #e3b865; border: 1px solid ${line}; border-left: 3px solid var(--cx-accent); border-radius: 16px; background: rgba(${fill}, 0.9); overflow: hidden; box-shadow: 0 10px 26px -14px rgba(0, 0, 0, 0.7); }
    ${D} .cx-rm-card[data-slot="complements"] { --cx-accent: #78aeff; }
    ${D} .cx-rm-card[data-slot="attention"] { --cx-accent: #b99cff; }
        ${D} .cx-rm-card-empty { display: flex; flex-direction: column; gap: 6px; padding: 12px 14px; border-style: dashed; }
    ${D} .cx-rm-card-button { display: flex; flex-direction: column; align-items: stretch; gap: 6px; width: 100%; min-height: 56px; margin: 0; padding: 12px 14px; font: inherit; text-align: left; color: inherit; background: none; border: 0; cursor: pointer; -webkit-tap-highlight-color: transparent; }
    @media (hover: hover) { ${D} .cx-rm-card-button:hover { background: rgba(${accent}, 0.07); } }
    ${D} .cx-rm-card-head { display: inline-flex; align-items: center; gap: 8px; font-size: 11px; letter-spacing: 0.12em; text-transform: uppercase; color: var(--cx-accent); }
    ${D} .cx-rm-card-text { font-size: 15px; line-height: 1.5; color: rgba(250, 249, 245, 0.96); overflow-wrap: anywhere; }
    ${D} .cx-rm-card-empty .cx-rm-card-text { font-size: 13.5px; color: rgba(244, 241, 233, 0.78); }
    ${D} .cx-rm-card-practice { font-size: 13px; line-height: 1.45; color: rgba(244, 241, 233, 0.82); }
    ${D} .cx-rm-card-area { font-size: 12px; color: rgba(244, 241, 233, 0.72); }
    ${D} .cx-rm-count { text-align: center; margin: 6px 0 0 !important; }
    ${D} .cx-rm-count-note { text-align: center; margin: 0 !important; }
    ${D} .cx-rm-finding { margin: 6px 0 6px !important; font-size: 14.5px !important; line-height: 1.5 !important; }
    ${D} .cx-rm-statement { margin: 4px 0 2px !important; text-align: center; font-size: 15.5px !important; line-height: 1.55 !important; text-wrap: balance; }
    ${D} .cx-rm-none, ${D} .cx-rm-soft { font-size: 12.5px; color: rgba(244, 241, 233, 0.74); }
    ${D} .cx-rm-count { text-align: center; margin-top: 2px !important; }
    ${D} .cx-rm-frame { text-align: center; }
    ${D} .cx-rm-slot-symbol { flex: none; width: 18px; height: 18px; }
    ${D} .cx-rm-prov { margin: 6px 0 0 !important; font-size: 12px !important; line-height: 1.45 !important; color: rgba(244, 241, 233, 0.62); }

    /* ---------------------------------------------------------- the Romantic result
       THE HERO IS A LAYER UNDER THE SCROLLER. The product's one Earth is behind everything; over it, on a layer of its own (.cx-hero-host, under the scrolling surface), are the pinned title, the gold
       gauge and the mandala, placed on the planet's disc by hero.ts (the three custom properties --cx-hero-x, --cx-hero-y and --cx-hero-d). Nothing
       in it scrolls, scales or follows the scroll, and nothing is sticky, so nothing can fail or jump. The one response to the reading's scroll is data-scrolled (hero.ts: an observer on the first stretch of
       the reading), which fades the title and the disc once. The reading is the scroller one layer above: a first stretch of empty space as tall as the planet, then glass. */
    ${D} .cx-hero-host { position: absolute; inset: 0; z-index: 6; pointer-events: none; overflow: hidden; }
    ${D} .cx-hero-host[hidden] { display: none; }
    ${D} .cx-hero-host[data-on="false"] { opacity: 0; }
    ${D} .cx-hero-host[data-on="true"] { opacity: 1; transition: opacity 420ms ease-in-out; }
    ${D} .cx-hero-layer { position: absolute; inset: 0; }
    ${D} .cx-hero-title { position: absolute; left: 0; right: 0; top: calc(var(--safe-top, 0px) + var(--cx-hero-title-top, 92px)); padding: 0 52px; text-align: center; transition: opacity 260ms ease-out; }
    ${D} .cx-hero-host[data-scrolled="true"] .cx-hero-title { opacity: 0; }
    ${D} .cx-hero-title .cx-between { margin: 0; font-size: 11.5px; letter-spacing: 0.16em; text-transform: uppercase; color: rgba(${secondary}, 0.78); text-shadow: 0 1px 10px rgba(0, 0, 0, 0.7); }
    ${D} .cx-hero-title .cx-headline { margin: 4px 0 0; font-family: Georgia, 'Times New Roman', serif; font-size: clamp(22px, 6.4vw, 30px); line-height: 1.14; color: rgba(244, 241, 233, 0.84); text-wrap: balance; text-shadow: 0 2px 14px rgba(0, 0, 0, 0.72); }
    /* the disc: placed on the planet's disc (translate only: it is not scaled, and nothing about it follows the scroll); a layer of its own, so the one fade below is compositor work */
    ${D} .cx-hero-disc { position: absolute; left: 0; top: 0; width: var(--cx-hero-d, 240px); height: var(--cx-hero-d, 240px); transform: translate3d(calc(var(--cx-hero-x, 0px) - var(--cx-hero-d, 240px) / 2), calc(var(--cx-hero-y, 0px) - var(--cx-hero-d, 240px) / 2), 0); will-change: transform, opacity; transition: opacity 260ms ease-out; contain: layout style; }
    ${D} .cx-hero-host[data-scrolled="true"] .cx-hero-disc { opacity: 0.3; }
    ${D} .cx-hero-gauge { position: absolute; left: 50%; top: 50%; height: auto; aspect-ratio: 1 / 1; transform: translate(-50%, -50%); overflow: visible; }
    ${D} .cx-hero-mandala { position: absolute; left: 50%; top: 50%; aspect-ratio: 1 / 1; transform: translate(-50%, -50%); }
     ${D} .cx-mandala { display: block; width: 100%; height: 100%; overflow: visible; }
    /* V5: the mandala is three stacked drawings of one box: the petals (inside two layers of their own, which turn and breathe), and the face (the dark disc, the circle, the number), which never moves */
    ${D} .cx-m-spin, ${D} .cx-m-breathe, ${D} .cx-m-face { position: absolute; left: 0; top: 0; width: 100%; height: 100%; }
    ${D} .cx-m-face { overflow: visible; }
    /* the wreath: the gauge's own box, under the gauge, its petals shared between three layers that breathe at their own paces */
    ${D} .cx-hero-wreath { position: absolute; left: 50%; top: 50%; height: auto; aspect-ratio: 1 / 1; transform: translate(-50%, -50%); }
    ${D} .cx-w-phase { position: absolute; left: 0; top: 0; width: 100%; height: 100%; }
    ${D} .cx-wreath { display: block; width: 100%; height: 100%; overflow: visible; }
    /* THE LIVING COMPOSITION (V5): after the reveal has settled (data-live on the hero, never with reduced motion) the petals turn once in 105 s and breathe by about 1%, and each wreath layer breathes by about 1.3% at its own pace.
       Every one of these is a CSS animation of transform on an element that is a layer of its own, so the browser's compositor does it: nothing is drawn again and no script runs per frame. They begin at rest (scale 1, angle 0),
       so nothing jumps when they start, and they are paused while the reading covers the hero (the host's data-scrolled). */
    @media (prefers-reduced-motion: no-preference) {
      ${D} .cx-hero-layer[data-live="true"] .cx-m-spin { animation: cx-m-turn 105s linear infinite; will-change: transform; }
      ${D} .cx-hero-layer[data-live="true"] .cx-m-breathe { animation: cx-m-breathe 7.5s ease-in-out infinite; will-change: transform; }
      ${D} .cx-hero-layer[data-live="true"] .cx-w-phase-0 { animation: cx-w-breathe 6.4s ease-in-out 0.6s infinite; will-change: transform; }
      ${D} .cx-hero-layer[data-live="true"] .cx-w-phase-1 { animation: cx-w-breathe 7.7s ease-in-out 1.9s infinite; will-change: transform; }
      ${D} .cx-hero-layer[data-live="true"] .cx-w-phase-2 { animation: cx-w-breathe 9.1s ease-in-out 3.1s infinite; will-change: transform; }
      ${D} .cx-hero-host[data-scrolled="true"] .cx-hero-layer * { animation-play-state: paused; }
    }
    @keyframes cx-m-turn { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
    @keyframes cx-m-breathe { 0%, 100% { transform: scale(1); } 30% { transform: scale(1.012); } 70% { transform: scale(0.992); } }
    @keyframes cx-w-breathe { 0%, 100% { transform: scale(1); } 45% { transform: scale(1.013); } }
    ${D} .cx-m-scrim { fill: rgba(4, 7, 13, 0.5); }
    ${D} .cx-m-glow, ${D} .cx-m-ring-glow { opacity: calc(0.045 + 0.085 * var(--cx-m-glow, 1)); }
    ${D} .cx-m-edge, ${D} .cx-m-ring-edge { opacity: calc(0.13 + 0.16 * var(--cx-m-glow, 1)); }
    ${D} .cx-m-line, ${D} .cx-m-ring-line { opacity: 0.9; }
    /* the numeral is placed by its glyphs' own ink (numeralLayout.ts), so no kerning, no letter-spacing and no tabular figures may move it */
    ${D} .cx-m-num { fill: #ece4cd; font-variant-numeric: lining-nums; font-kerning: none; letter-spacing: 0; paint-order: stroke; stroke: rgba(4, 7, 13, 0.5); stroke-width: 3px; stroke-linejoin: round; }
    ${D} .cx-m-num.cx-pct { opacity: 0.86; }
    ${D} .cx-dash-arc { opacity: 0.92; transition: stroke-width 0.2s ease, opacity 0.2s ease; }
    ${D} .cx-dash-arc.is-active { stroke-width: 9px; opacity: 1; }
    /* the reading's first stretch is the planet's: hero.ts sets its height from the plan */
    ${D} .cx-spacer { flex: none; height: 420px; margin-bottom: -2px; pointer-events: none; }
    ${D} .cx-intro { display: flex; flex-direction: column; align-items: center; gap: 8px; text-align: center; }
    ${D} .cx-intro p { margin: 0; }
    ${D} .cx-dash-legend { list-style: none; margin: 0; padding: 0; display: flex; flex-wrap: wrap; gap: 6px 14px; justify-content: center; font-size: 12.5px; color: rgba(250, 249, 245, 0.92); }
    ${D} .cx-dash-legend li { display: inline-flex; align-items: center; gap: 6px; }
    ${D} .cx-dash-key { width: 28px; height: 8px; flex: none; }
    ${D} .cx-dash-pending { text-align: center; }
    ${D} .cx-sr { position: absolute; width: 1px; height: 1px; margin: -1px; padding: 0; overflow: hidden; clip: rect(0 0 0 0); white-space: nowrap; border: 0; }
    /* THE READING ON GLASS: over the planet the surfaces are close to opaque, so the text is read against dark and not against the Earth's land and sea */
    ${D} .cx[data-domain="romantic"] { gap: 12px; }
    ${D} .cx[data-domain="romantic"] .cx-panel { background: rgba(${fill}, 0.9); border-color: rgba(${border}, 0.22); backdrop-filter: blur(14px) saturate(1.05); -webkit-backdrop-filter: blur(14px) saturate(1.05); box-shadow: 0 10px 26px -14px rgba(0, 0, 0, 0.7); }
    ${D} .cx-dash-rail-wrap { border: 1px solid rgba(${border}, 0.22); border-radius: 18px; background: rgba(${fill}, 0.9); backdrop-filter: blur(14px) saturate(1.05); -webkit-backdrop-filter: blur(14px) saturate(1.05); box-shadow: 0 10px 26px -14px rgba(0, 0, 0, 0.7); }
    ${D} .cx[data-domain="romantic"] .cx-intro { padding: 12px 14px; }
    ${D} .cx[data-domain="romantic"] .cx-rm-count { margin-top: 0 !important; }

    /* THE DEMONSTRATION'S CONTROLS (a review build asked for them by the address): their own small panel, fixed clear above the MENU capsule, outside the reading. Absent from every other page. */
    ${D} .cx-qa-host { position: fixed; left: 0; right: 0; bottom: calc(var(--kt-pillar-nav-height, 46px) + 26px + var(--safe-bottom, 0px)); z-index: 9050; display: flex; justify-content: center; pointer-events: none; }
    ${D} .cx-qa-host[hidden] { display: none; }
    ${D} .cx-qa-demo { pointer-events: auto; display: flex; flex-wrap: wrap; align-items: center; justify-content: center; gap: 4px 6px; max-width: calc(100% - 24px); padding: 6px 10px; border: 1px dashed rgba(241, 196, 83, 0.7); border-radius: 14px; background: rgba(5, 8, 15, 0.92); font-size: 10.5px; letter-spacing: 0.04em; color: #f1d27b; }
    ${D} .cx-qa-demo-note { padding-right: 4px; }
    ${D} .cx-qa-demo-step { min-width: 44px; min-height: 44px; margin: 0; border-radius: 999px; border: 1px solid rgba(241, 196, 83, 0.5); background: transparent; color: #f1d27b; font: inherit; font-size: 12px; cursor: pointer; -webkit-tap-highlight-color: transparent; }

    /* THE SEVEN DIMENSIONS: a rail of round gauges. Large touch targets (the whole tab is the button), a label that can take two lines, the state in words, and a lit tab that is plainly the open one. */
    ${D} .cx-dash-rail-wrap { margin-top: 0; padding-bottom: 8px; }
    ${D} .cx-dash-rail { display: flex; gap: 6px; overflow-x: auto; padding: 10px 10px 8px; scroll-snap-type: x proximity; scroll-padding: 0 14px; scrollbar-width: none; -webkit-overflow-scrolling: touch; -webkit-mask-image: linear-gradient(90deg, transparent 0, #000 12px, #000 calc(100% - 12px), transparent 100%); mask-image: linear-gradient(90deg, transparent 0, #000 12px, #000 calc(100% - 12px), transparent 100%); }
    ${D} .cx-dash-rail::-webkit-scrollbar { display: none; }
    @media (min-width: 760px) { ${D} .cx-dash-rail { justify-content: center; overflow-x: visible; -webkit-mask-image: none; mask-image: none; } }
    ${D} .cx-dash-tab { position: relative; flex: 0 0 98px; display: flex; flex-direction: column; align-items: center; justify-content: flex-start; gap: 5px; min-height: 124px; margin: 0; padding: 9px 4px 10px; font: inherit; color: inherit; background: none; border: 1px solid transparent; border-radius: 18px; cursor: pointer; scroll-snap-align: center; -webkit-tap-highlight-color: transparent; transition: background-color 0.2s ease, border-color 0.2s ease; }
    ${D} .cx-dash-gauge { display: block; width: 66px; height: 66px; border-radius: 50%; transition: box-shadow 0.25s ease, transform 0.25s ease, opacity 0.25s ease; opacity: 0.88; }
    ${D} .cx-dash-gauge svg { display: block; width: 100%; height: 100%; }
    ${D} .cx-dash-tab.is-active { background: rgba(255, 255, 255, 0.07); border-color: var(--cx-accent); }
    ${D} .cx-dash-tab.is-active .cx-dash-gauge { opacity: 1; box-shadow: 0 0 0 1px var(--cx-accent), 0 0 16px 1px rgba(255, 255, 255, 0.18); transform: scale(1.06); }
    ${D} .cx-dash-label { font-size: 12.5px; font-weight: 500; line-height: 1.2; letter-spacing: -0.01em; text-align: center; color: rgba(250, 249, 245, 0.96); overflow-wrap: break-word; min-height: 2.4em; display: flex; align-items: center; justify-content: center; }
    ${D} .cx-dash-state { font-size: 11.5px; line-height: 1.25; text-align: center; color: rgba(244, 241, 233, 0.8); }
    ${D} .cx-dash-tab.is-active .cx-dash-label { color: #fff; }
    ${D} .cx-dash-derived { font-size: 9.5px; letter-spacing: 0.1em; text-transform: uppercase; color: rgba(244, 241, 233, 0.72); border: 1px dashed rgba(255, 255, 255, 0.3); border-radius: 999px; padding: 0 6px; }
    ${D} .cx-dash-tab:focus-visible { outline: 2px solid var(--cx-accent); outline-offset: 1px; }
    @media (hover: hover) { ${D} .cx-dash-tab:not(.is-active):hover { background: rgba(255, 255, 255, 0.04); } }
    ${D} .cx-dash-hint { text-align: center; margin: 0 8px !important; }

    /* THE RELATIONSHIP SPECTRUM: where the two people stand between the two ends of an axis. A quiet track, two markers told apart by shape and colour (a filled disc in the warm accent, a hollow ring in a
       cool one), a soft stretch for a place that is only a lean, dashed and faint for a finding that stands on too little. */
    ${D} .cx-spec { margin: 8px 0 6px; padding: 0; display: flex; flex-direction: column; gap: 4px; --spec-a: #e8c06e; --spec-b: #8fb7ff; }
    ${D} .cx-spec-ends { display: flex; justify-content: space-between; gap: 14px; font-size: 11.5px; line-height: 1.25; color: rgba(244, 241, 233, 0.74); }
    ${D} .cx-spec-ends span { max-width: 46%; }
    ${D} .cx-spec-ends span:last-child { text-align: right; }
    ${D} .cx-spec-track { position: relative; height: 46px; margin: 0 14px; }
    ${D} .cx-spec-rail { position: absolute; left: -6px; right: -6px; top: 50%; height: 2px; transform: translateY(-1px); border-radius: 2px; background: linear-gradient(90deg, rgba(255, 255, 255, 0.2), rgba(255, 255, 255, 0.34) 50%, rgba(255, 255, 255, 0.2)); }
    ${D} .cx-spec-mid { position: absolute; left: 50%; top: calc(50% - 6px); width: 1px; height: 12px; background: rgba(255, 255, 255, 0.38); }
    ${D} .cx-spec-link { position: absolute; top: calc(50% - 1px); height: 2px; border-radius: 2px; background: linear-gradient(90deg, var(--spec-a), var(--spec-b)); opacity: 0.6; }
    ${D} .cx-spec-band { position: absolute; top: calc(50% - 11px); width: 26%; height: 22px; transform: translateX(-50%); border-radius: 999px; opacity: 0.2; }
    ${D} .cx-spec-band.cx-spec-a { background: var(--spec-a); }
    ${D} .cx-spec-band.cx-spec-b { background: var(--spec-b); }
    ${D} .cx-spec-dot { position: absolute; top: 50%; width: 26px; height: 26px; margin: -13px 0 0 -13px; border-radius: 50%; display: flex; align-items: center; justify-content: center; box-sizing: border-box; }
    ${D} .cx-spec-dot b { font-weight: 400; font-size: 12px; line-height: 1; font-family: Georgia, 'Times New Roman', serif; }
    ${D} .cx-spec-dot.cx-spec-a { background: var(--spec-a); color: #1a1408; box-shadow: 0 0 0 3px rgba(5, 8, 15, 0.55); }
    ${D} .cx-spec-dot.cx-spec-b { background: rgba(5, 8, 15, 0.9); color: var(--spec-b); border: 2px solid var(--spec-b); }
    ${D} .cx-spec-dot.cx-spec-up { top: calc(50% - 10px); }
    ${D} .cx-spec-dot.cx-spec-down { top: calc(50% + 10px); }
    ${D} .cx-spec.is-limited .cx-spec-dot { opacity: 0.62; border-style: dashed; }
    ${D} .cx-spec.is-limited .cx-spec-dot.cx-spec-a { background: transparent; color: var(--spec-a); border: 2px dashed var(--spec-a); box-shadow: none; }
    ${D} .cx-spec.is-limited .cx-spec-link { opacity: 0.28; }
    ${D} .cx-spec-keys { display: flex; flex-wrap: wrap; gap: 4px 16px; font-size: 12.5px; color: rgba(250, 249, 245, 0.9); }
    ${D} .cx-spec-who { display: inline-flex; align-items: center; gap: 7px; }
    ${D} .cx-spec-who em { font-style: normal; color: rgba(244, 241, 233, 0.62); }
    ${D} .cx-spec-keys i { display: inline-block; width: 11px; height: 11px; border-radius: 50%; box-sizing: border-box; }
    ${D} .cx-spec-key-a { background: var(--spec-a); }
    ${D} .cx-spec-key-b { border: 2px solid var(--spec-b); }

    ${D} .cx-dash-panel { border-top: 2px solid var(--cx-accent, #e3b865); scroll-margin-top: 16px; }
    ${D} .cx-dash-panel:focus { outline: none; }
    ${D} .cx-dash-panel.is-entering { animation: cx-dash-in 0.26s ease both; }
    @keyframes cx-dash-in { from { opacity: 0; transform: translateY(6px); } to { opacity: 1; transform: none; } }
    ${D} .cx-dash-panel-head { display: flex; align-items: center; gap: 12px; margin-bottom: 6px; }
    ${D} .cx-dash-panel-icon svg { display: block; width: 30px; height: 30px; }
    ${D} .cx-dash-panel-title { margin: 0 !important; font-family: Georgia, 'Times New Roman', serif; font-size: 22px !important; font-weight: 400 !important; letter-spacing: 0 !important; text-transform: none !important; line-height: 1.2; color: rgba(255, 253, 248, 0.98) !important; }
    ${D} .cx-dash-panel-covers { margin: 2px 0 0 !important; font-size: 12.5px !important; color: rgba(244, 241, 233, 0.7); }
    ${D} .cx-dash-panel .cx-rm-detail { padding: 0; border-top: 0; }
    ${D} .cx-dash-h { display: inline-block; padding: 5px 12px; border-radius: 999px; background: rgba(${fill}, 0.78); text-shadow: 0 1px 8px rgba(0, 0, 0, 0.9); margin: 4px 2px 8px !important; font-size: 13px !important; font-weight: 400 !important; letter-spacing: 0.14em; text-transform: uppercase; color: rgba(${secondary}, 0.95) !important; }
    ${D} .cx-dash-insights { margin-top: 4px; }

    /* the partner-first setup of the Romantic domain */
    ${D} .cx-rs-head { align-items: center; text-align: center; gap: 6px; }
    ${D} .cx-rs-lead { margin: 0 !important; font-size: 15px; color: rgba(244, 241, 233, 0.86); }
    ${D} .cx-rs-context { margin-top: 2px !important; }
    @media (prefers-reduced-motion: reduce) {
      ${D} .cx-dash-panel.is-entering { animation: none; }
      ${D} .cx-dash-gauge, ${D} .cx-dash-arc, ${D} .cx-dash-tab, ${D} .cx-hero-host[data-on="true"] { transition: none; }
      ${D} .cx-hero-disc { will-change: auto; transition: none; }
      ${D} .cx-hero-title { transition: none; }
    }
    ${D} .cx-rm-shape { flex: none; width: 17px; height: 17px; color: rgba(${accent}, 0.95); }
    ${D} .cx-rm-tone { display: inline-flex; align-items: center; gap: 6px; font-size: 10.5px; letter-spacing: 0.1em; text-transform: uppercase; color: rgba(${secondary}, 0.98); }
    ${D} .cx-rm-persons { margin: 0 !important; font-size: 13.5px !important; line-height: 1.5 !important; overflow-wrap: anywhere; }
    ${D} .cx-rm-detail { padding: 2px 14px 14px; border-top: 1px solid ${line}; }
    ${D} .cx-rm-says { margin: 12px 0 8px !important; font-size: 15px !important; line-height: 1.58 !important; }
    ${D} .cx-rm-parts { list-style: none; margin: 8px 0 0; padding: 0; display: flex; flex-direction: column; gap: 12px; }
    ${D} .cx-rm-part { padding: 10px 0 0; border-top: 1px solid ${line}; }
    ${D} .cx-rm-part:first-child { border-top: 0; padding-top: 0; }
    ${D} .cx-rm-part-head { display: flex; flex-wrap: wrap; align-items: center; justify-content: space-between; gap: 4px 10px; margin-bottom: 4px; }
    ${D} .cx-rm-part-head strong { font-weight: 400; font-size: 14px; }
    ${D} .cx-rm-part .cx-rm-soft { margin: 4px 0 0 !important; font-size: 12.5px !important; line-height: 1.5 !important; }
    ${D} .cx-rm-firm { margin: 6px 0 0 !important; font-size: 12px !important; color: rgba(244, 241, 233, 0.56); }
    ${D} .cx-rm-practice { margin: 12px 0 0 !important; padding-top: 10px; border-top: 1px solid ${line}; font-size: 14px !important; }
    ${D} .cx-rm-practice strong { font-weight: 400; letter-spacing: 0.08em; text-transform: uppercase; font-size: 11px; color: rgba(${secondary}, 0.95); }
    ${D} .cx-rm-limits { padding: 12px 15px; }
    ${D} .cx-rm-limits > summary { display: flex; align-items: center; justify-content: space-between; gap: 10px; min-height: 44px; margin: -6px 0; cursor: pointer; list-style: none; font-size: 12px; letter-spacing: 0.1em; text-transform: uppercase; color: rgba(${secondary}, 0.95); }
    ${D} .cx-rm-limits > summary::-webkit-details-marker { display: none; }
    ${D} .cx-rm-limits > summary::after { content: '+'; font-size: 18px; letter-spacing: 0; }
    ${D} .cx-rm-limits[open] > summary::after { content: '–'; }
    ${D} .cx-rm-limits p { font-size: 13.5px; }

    /* the evidence chips: the tradition's relation in words, laid out as a line */
    ${D} .cx-sigs li { align-items: flex-start; }
    ${D} .cx-sig-rel::before, ${D} .cx-sig-rel::after { content: ' · '; opacity: 0.6; }

    @keyframes cx-rise { from { opacity: 0; transform: translateY(8px); } to { opacity: 1; transform: translateY(0); } }
    @keyframes cx-sheet-in { from { opacity: 0; transform: translateY(24px); } to { opacity: 1; transform: translateY(0); } }
    @media (min-width: 640px) {
      ${D} .cx-backdrop { align-items: center; }
      ${D} .cx-sheet { border-radius: 22px; border-bottom: 1px solid ${line}; }
    }
    @media (max-width: 359px) { ${D} .cx-domains { gap: 8px; } ${D} .cx-domain { min-height: 150px; padding: 14px 6px; } }
    @media (prefers-reduced-motion: reduce) {
      ${D} .cx-panel, ${D} .cx-domain, ${D} .cx-sheet { animation: none; }
      ${D} .cx-chip, ${D} .cx-button, ${D} .cx-domain { transition: none; }
      ${D} .cx-button:active:not(:disabled), ${D} .cx-domain:active { transform: none; }
    }
  `;
}
