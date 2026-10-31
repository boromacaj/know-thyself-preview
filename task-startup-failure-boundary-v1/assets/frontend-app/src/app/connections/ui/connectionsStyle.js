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
    ${D} .cx-rm-hero { gap: 8px; }
    ${D} .cx-rm-hero .cx-constellation { max-width: 150px; margin-bottom: 0; }
    /* THE THREE THINGS TO SEE FIRST: what connects, how the two complement each other, where to pay attention. One card each; a card with nothing defensible to say is dashed and says so. */
    ${D} .cx-rm-cards { list-style: none; margin: 8px 0 0; padding: 0; display: flex; flex-direction: column; gap: 8px; }
    ${D} .cx-rm-card { border: 1px solid ${line}; border-radius: 16px; background: rgba(${fill}, 0.46); backdrop-filter: blur(14px) saturate(1.08); -webkit-backdrop-filter: blur(14px) saturate(1.08); overflow: hidden; }
    ${D} .cx-rm-card[data-tone="friction"], ${D} .cx-rm-card[data-tone="asymmetry"] { border-color: rgba(${secondary}, 0.5); }
    ${D} .cx-rm-card-empty { display: flex; flex-direction: column; gap: 6px; padding: 12px 14px; border-style: dashed; }
    ${D} .cx-rm-card-button { display: flex; flex-direction: column; align-items: stretch; gap: 6px; width: 100%; min-height: 56px; margin: 0; padding: 12px 14px; font: inherit; text-align: left; color: inherit; background: none; border: 0; cursor: pointer; -webkit-tap-highlight-color: transparent; }
    @media (hover: hover) { ${D} .cx-rm-card-button:hover { background: rgba(${accent}, 0.07); } }
    ${D} .cx-rm-card-head { display: inline-flex; align-items: center; gap: 8px; font-size: 11px; letter-spacing: 0.12em; text-transform: uppercase; color: rgba(${secondary}, 0.95); }
    ${D} .cx-rm-card-text { font-size: 15px; line-height: 1.5; color: rgba(250, 249, 245, 0.96); overflow-wrap: anywhere; }
    ${D} .cx-rm-card-empty .cx-rm-card-text { font-size: 13.5px; color: rgba(244, 241, 233, 0.78); }
    ${D} .cx-rm-card-practice { font-size: 13px; line-height: 1.45; color: rgba(244, 241, 233, 0.82); }
    ${D} .cx-rm-card-area { font-size: 12px; color: rgba(244, 241, 233, 0.72); }
    ${D} .cx-rm-count { text-align: center; margin: 6px 0 0 !important; }
    ${D} .cx-rm-count-note { text-align: center; margin: 0 !important; }
    ${D} .cx-rm-brief { font-size: 13.5px; line-height: 1.45; color: rgba(244, 241, 233, 0.88); overflow-wrap: anywhere; }
    ${D} .cx-rm-finding { margin: 6px 0 6px !important; font-size: 14.5px !important; line-height: 1.5 !important; }
    ${D} .cx-rm-statement { margin: 4px 0 2px !important; text-align: center; font-size: 15.5px !important; line-height: 1.55 !important; text-wrap: balance; }
    ${D} .cx-rm-none, ${D} .cx-rm-soft { font-size: 12.5px; color: rgba(244, 241, 233, 0.74); }
    ${D} .cx-rm-count { text-align: center; margin-top: 2px !important; }
    ${D} .cx-rm-frame { text-align: center; }
    ${D} .cx-rm-shape { flex: none; width: 17px; height: 17px; color: rgba(${accent}, 0.95); }
    ${D} .cx-rm-list { list-style: none; margin: 8px 0 0; padding: 0; display: flex; flex-direction: column; gap: 8px; }
    ${D} .cx-rm-item { border: 1px solid ${line}; border-radius: 16px; background: rgba(${fill}, 0.46); backdrop-filter: blur(14px) saturate(1.08); -webkit-backdrop-filter: blur(14px) saturate(1.08); overflow: hidden; }
    ${D} .cx-rm-item[data-tone="friction"], ${D} .cx-rm-item[data-tone="mixed"] { border-color: rgba(${secondary}, 0.5); }
    ${D} .cx-rm-item[data-tone="limited"] { border-style: dashed; }
    ${D} .cx-rm-row { display: flex; flex-direction: column; align-items: stretch; gap: 8px; width: 100%; min-height: 56px; margin: 0; padding: 12px 14px; font: inherit; text-align: left; color: inherit; background: none; border: 0; cursor: pointer; -webkit-tap-highlight-color: transparent; }
    ${D} .cx-rm-row.is-open { background: rgba(${accent}, 0.07); }
    ${D} .cx-rm-head { display: flex; flex-wrap: wrap; align-items: center; gap: 4px 10px; }
    ${D} .cx-rm-name { flex: 1 1 auto; min-width: 0; font-family: Georgia, 'Times New Roman', serif; font-size: 17px; line-height: 1.25; overflow-wrap: anywhere; }
    ${D} .cx-rm-tone { display: inline-flex; align-items: center; gap: 6px; font-size: 10.5px; letter-spacing: 0.1em; text-transform: uppercase; color: rgba(${secondary}, 0.98); }
    ${D} .cx-rm-chevron { flex: none; width: 9px; height: 9px; margin-left: 2px; border-right: 1.5px solid rgba(244, 241, 233, 0.6); border-bottom: 1.5px solid rgba(244, 241, 233, 0.6); transform: rotate(45deg) translateY(-2px); }
    ${D} .cx-rm-row.is-open .cx-rm-chevron { transform: rotate(-135deg) translateY(-2px); }
    ${D} .cx-rm-cover { font-size: 12.5px; line-height: 1.45; color: rgba(244, 241, 233, 0.62); }
    ${D} .cx-rm-tracks { display: flex; flex-direction: column; gap: 4px; }
    ${D} .cx-rm-track { display: grid; grid-template-columns: minmax(0, 1fr) minmax(110px, 46%); align-items: center; gap: 2px 8px; min-width: 0; }
    ${D} .cx-rm-axis { display: inline-flex; align-items: center; gap: 7px; font-size: 11.5px; color: rgba(244, 241, 233, 0.66); }
    ${D} .cx-rm-axis .cx-rm-shape { width: 12px; height: 12px; opacity: 0.85; }
    ${D} .cx-rm-track .cx-scale { max-height: 24px; }
    ${D} .cx-rm-persons { margin: 0 !important; font-size: 13.5px !important; line-height: 1.5 !important; overflow-wrap: anywhere; }
    ${D} .cx-rm-track-drive .cx-rm-persons { padding-left: 19px; }
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
    @media (max-width: 359px) { ${D} .cx-rm-name { font-size: 16px; } }

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
