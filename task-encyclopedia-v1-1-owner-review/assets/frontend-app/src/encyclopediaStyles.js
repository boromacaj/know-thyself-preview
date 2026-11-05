/*
 * The Encyclopedia reader's stylesheet, injected the first time the library opens (never at start-up).
 *
 * The look is the app's own: the near-black glass ground of the concept sheet, Georgia for titles, the interface accent
 * (--lib-accent, read from the reader's chosen Interface Color when the library opens) for rims, links and marks.
 * Performance rules for the reading surface: an opaque ground (nothing to blur or composite behind it), no backdrop-filter,
 * no shadows on scrolling content, one short opacity fade per view, none under reduced motion.
 */
export const encyclopediaStyles = `
  html[data-kt-library-open] body > :not(#kt-library):not(script):not(style) { visibility: hidden !important; }
  html[data-kt-library-open] body > :not(#kt-library) * { animation-play-state: paused !important; }

  .kt-lib {
    --lib-accent: 218, 171, 84;
    --lib-accent-soft: 247, 224, 173;
    --lib-ink: 236, 233, 244;
    position: fixed;
    inset: 0;
    z-index: 2400;
    display: flex;
    flex-direction: column;
    color: rgba(var(--lib-ink), 0.92);
    background:
      radial-gradient(120% 60% at 50% -10%, rgba(var(--lib-accent), 0.07), transparent 60%),
      #07090d;
    font-family: system-ui, -apple-system, 'Segoe UI', Roboto, sans-serif;
    -webkit-tap-highlight-color: transparent;
  }

  .kt-lib button { font: inherit; color: inherit; }

  /* ---------------------------------------------------------------- top bar */
  .kt-lib-bar {
    flex: 0 0 auto;
    display: flex;
    align-items: center;
    gap: 4px;
    padding: calc(env(safe-area-inset-top, 0px) + 8px) max(10px, env(safe-area-inset-right, 0px)) 8px max(10px, env(safe-area-inset-left, 0px));
    border-bottom: 1px solid rgba(var(--lib-accent), 0.16);
    background: rgba(9, 11, 16, 0.98);
  }
  .kt-lib-crumb {
    flex: 1 1 auto;
    min-width: 0;
    margin: 0 6px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    font-size: 11px;
    letter-spacing: 0.16em;
    text-transform: uppercase;
    color: rgba(var(--lib-accent-soft), 0.82);
  }
  .kt-lib-icon {
    flex: 0 0 auto;
    display: grid;
    place-items: center;
    width: 44px;
    height: 44px;
    padding: 0;
    border: 0;
    border-radius: 999px;
    background: transparent;
    color: rgba(var(--lib-ink), 0.82);
    cursor: pointer;
  }
  .kt-lib-icon:hover, .kt-lib-icon:focus-visible { background: rgba(255, 255, 255, 0.06); color: #fff; }
  .kt-lib[data-view="saved"] [data-lib-action="saved"],
  .kt-lib[data-view="search"] [data-lib-action="search"] { color: rgb(var(--lib-accent-soft)); }

  .kt-lib-progress { flex: 0 0 2px; height: 2px; background: rgba(255, 255, 255, 0.04); overflow: hidden; }
  .kt-lib-progress[hidden] { display: block; visibility: hidden; }
  .kt-lib-progress span { display: block; height: 100%; background: rgba(var(--lib-accent), 0.85); transform: scaleX(0); transform-origin: 0 50%; will-change: transform; }

  /* ---------------------------------------------------------------- the reading column */
  .kt-lib-scroll {
    position: relative;
    flex: 1 1 auto;
    overflow-y: auto;
    overflow-x: hidden;
    -webkit-overflow-scrolling: touch;
    overscroll-behavior: contain;
  }
  .kt-lib-page {
    position: relative;
    max-width: 680px;
    margin: 0 auto;
    padding: 18px max(20px, env(safe-area-inset-right, 0px)) calc(env(safe-area-inset-bottom, 0px) + 56px) max(20px, env(safe-area-inset-left, 0px));
  }
  .kt-lib-page.is-entering { animation: kt-lib-in 140ms ease-out both; }
  @keyframes kt-lib-in { from { opacity: 0; } to { opacity: 1; } }

  .kt-lib-loading { margin: 40px 0; text-align: center; font-size: 14px; color: rgba(var(--lib-ink), 0.6); }

  .kt-lib-eyebrow {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    gap: 8px;
    margin: 0 0 8px;
    font-size: 11px;
    letter-spacing: 0.16em;
    text-transform: uppercase;
    color: rgba(var(--lib-accent-soft), 0.86);
  }
  .kt-lib-eyebrow-link {
    padding: 0;
    border: 0;
    background: none;
    letter-spacing: inherit;
    text-transform: inherit;
    font-size: inherit;
    color: inherit !important;
    cursor: pointer;
    text-decoration: underline;
    text-decoration-color: rgba(var(--lib-accent), 0.35);
    text-underline-offset: 3px;
  }

  .kt-lib-title {
    margin: 0;
    font-family: Georgia, 'Times New Roman', serif;
    font-weight: 400;
    font-size: clamp(27px, 7.4vw, 36px);
    line-height: 1.14;
    color: rgba(252, 250, 245, 0.98);
    outline: none;
  }
  .kt-lib-visually-hidden { position: absolute !important; width: 1px; height: 1px; overflow: hidden; clip: rect(0 0 0 0); white-space: nowrap; }
  .kt-lib-standfirst {
    margin: 12px 0 0;
    font-family: Georgia, 'Times New Roman', serif;
    font-size: 17.5px;
    line-height: 1.55;
    color: rgba(var(--lib-ink), 0.8);
  }
  .kt-lib-hero { padding: 18px 0 8px; }
  .kt-lib-hero.is-compact { padding-top: 8px; }
  .kt-lib-hero-mark {
    display: grid;
    place-items: center;
    width: 52px;
    height: 52px;
    margin-bottom: 16px;
    border: 1px solid rgba(var(--lib-accent), 0.42);
    border-radius: 999px;
    font-family: Georgia, serif;
    font-size: 24px;
    color: rgb(var(--lib-accent-soft));
  }
  .kt-lib-intro { margin: 14px 0 0; font-size: 15.5px; line-height: 1.68; color: rgba(var(--lib-ink), 0.78); }
  .kt-lib-h2 {
    margin: 30px 0 10px;
    font-size: 11px;
    font-weight: 600;
    letter-spacing: 0.18em;
    text-transform: uppercase;
    color: rgba(var(--lib-accent-soft), 0.78);
  }

  /* ---------------------------------------------------------------- lists: shelf, contents, index */
  .kt-lib ul, .kt-lib ol { margin: 0; padding: 0; list-style: none; }
  .kt-lib-shelf { margin-top: 22px; display: grid; gap: 10px; }
  .kt-lib-shelf-item, .kt-lib-category, .kt-lib-entry, .kt-lib-searchbox {
    width: 100%;
    display: flex;
    align-items: center;
    gap: 14px;
    min-height: 56px;
    padding: 13px 14px;
    border: 1px solid rgba(255, 255, 255, 0.075);
    border-radius: 16px;
    background: rgba(255, 255, 255, 0.025);
    text-align: left;
    cursor: pointer;
    transition: border-color 160ms ease, background-color 160ms ease;
  }
  .kt-lib-shelf-item:hover, .kt-lib-category:hover, .kt-lib-entry:hover, .kt-lib-searchbox:hover,
  .kt-lib-shelf-item:focus-visible, .kt-lib-category:focus-visible, .kt-lib-entry:focus-visible, .kt-lib-searchbox:focus-visible {
    border-color: rgba(var(--lib-accent), 0.42);
    background: rgba(var(--lib-accent), 0.06);
    outline: none;
  }
  .kt-lib-shelf-mark, .kt-lib-entry-glyph {
    flex: 0 0 auto;
    display: grid;
    place-items: center;
    width: 40px;
    height: 40px;
    border-radius: 999px;
    border: 1px solid rgba(var(--lib-accent), 0.3);
    font-family: Georgia, serif;
    font-size: 17px;
    color: rgb(var(--lib-accent-soft));
  }
  .kt-lib-entry-glyph { width: 36px; height: 36px; font-size: 14px; }
  .kt-lib-text { flex: 1 1 auto; min-width: 0; display: grid; gap: 3px; }
  .kt-lib-text-title { font-family: Georgia, 'Times New Roman', serif; font-size: 17px; line-height: 1.3; color: rgba(252, 250, 245, 0.96); }
  .kt-lib-text-sub {
    font-size: 13px;
    line-height: 1.45;
    color: rgba(var(--lib-ink), 0.62);
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }
  .kt-lib-categories, .kt-lib-index { display: grid; gap: 8px; }
  .kt-lib-category-meta, .kt-lib-entry-meta { flex: 0 0 auto; display: flex; align-items: center; gap: 8px; font-size: 12px; color: rgba(var(--lib-ink), 0.5); }
  .kt-lib-searchbox { margin-top: 22px; min-height: 48px; color: rgba(var(--lib-ink), 0.6); font-size: 15px; }
  .kt-lib-dot { width: 7px; height: 7px; border-radius: 999px; border: 1px solid rgba(var(--lib-accent), 0.8); }
  .kt-lib-dot.is-read { background: rgba(var(--lib-accent), 0.8); }
  .kt-lib-ico { display: inline-grid; place-items: center; color: rgba(var(--lib-accent-soft), 0.85); }
  .kt-lib-saved-row { display: flex; align-items: center; gap: 6px; }
  .kt-lib-saved-row > .kt-lib-entry { flex: 1 1 auto; }
  .kt-lib-entry.is-missing { cursor: default; color: rgba(var(--lib-ink), 0.5); font-style: italic; }

  /* ---------------------------------------------------------------- PRO + lock */
  .kt-lib-pro {
    display: inline-flex;
    align-items: center;
    gap: 4px;
    padding: 2px 7px 2px 6px;
    border: 1px solid rgba(var(--lib-accent), 0.48);
    border-radius: 999px;
    font-size: 9.5px;
    font-weight: 600;
    letter-spacing: 0.14em;
    text-transform: uppercase;
    color: rgb(var(--lib-accent-soft));
    background: rgba(var(--lib-accent), 0.08);
  }
  .kt-lib-locked {
    margin: 26px 0 0;
    padding: 22px 20px;
    border: 1px solid rgba(var(--lib-accent), 0.32);
    border-radius: 20px;
    background: linear-gradient(180deg, rgba(var(--lib-accent), 0.07), rgba(255, 255, 255, 0.015));
  }
  .kt-lib-locked h2 { margin: 10px 0 8px; font-family: Georgia, serif; font-weight: 400; font-size: 21px; color: rgba(252, 250, 245, 0.96); }
  .kt-lib-locked p { margin: 0 0 10px; font-size: 15px; line-height: 1.6; color: rgba(var(--lib-ink), 0.8); }
  .kt-lib-locked-outline { margin: 14px 0 12px !important; padding-left: 14px !important; border-left: 1px solid rgba(var(--lib-accent), 0.3); }
  .kt-lib-locked-outline li { padding: 3px 0; font-size: 14px; color: rgba(var(--lib-ink), 0.55); }
  .kt-lib-locked .kt-lib-locked-note { font-size: 13px; color: rgba(var(--lib-ink), 0.55); }

  /* ---------------------------------------------------------------- the article */
  .kt-lib-article-head { padding: 10px 0 4px; }
  .kt-lib-title-row { display: flex; align-items: center; gap: 14px; }
  .kt-lib-article-glyph {
    flex: 0 0 auto;
    display: grid;
    place-items: center;
    min-width: 46px;
    height: 46px;
    padding: 0 8px;
    border: 1px solid rgba(var(--lib-accent), 0.42);
    border-radius: 999px;
    font-family: Georgia, serif;
    font-size: 20px;
    color: rgb(var(--lib-accent-soft));
  }
  .kt-lib-tools { display: flex; align-items: center; justify-content: space-between; gap: 12px; margin-top: 16px; padding-bottom: 14px; border-bottom: 1px solid rgba(255, 255, 255, 0.07); }
  .kt-lib-minutes { font-size: 12.5px; color: rgba(var(--lib-ink), 0.5); }
  .kt-lib-mark {
    display: inline-flex;
    align-items: center;
    gap: 6px;
    min-height: 40px;
    padding: 0 14px 0 11px;
    border: 1px solid rgba(var(--lib-accent), 0.36);
    border-radius: 999px;
    background: transparent;
    color: rgb(var(--lib-accent-soft)) !important;
    font-size: 13px !important;
    cursor: pointer;
  }
  .kt-lib-mark[aria-pressed="true"] { background: rgba(var(--lib-accent), 0.12); }
  .kt-lib-mark.is-section { min-height: 40px; min-width: 40px; padding: 0; justify-content: center; border-color: transparent; color: rgba(var(--lib-accent-soft), 0.55) !important; }
  .kt-lib-mark.is-section[aria-pressed="true"] { color: rgb(var(--lib-accent-soft)) !important; background: transparent; }

  .kt-lib-resume {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    gap: 8px 10px;
    margin: 18px 0 0;
    padding: 14px 16px;
    border: 1px solid rgba(var(--lib-accent), 0.32);
    border-radius: 16px;
    background: rgba(var(--lib-accent), 0.06);
  }
  .kt-lib-resume p { flex: 1 1 100%; margin: 0; font-size: 14px; color: rgba(var(--lib-ink), 0.85); }
  .kt-lib-button {
    min-height: 40px;
    padding: 0 16px;
    border: 1px solid rgba(var(--lib-accent), 0.5);
    border-radius: 999px;
    background: rgba(var(--lib-accent), 0.14);
    font-size: 13.5px !important;
    color: rgba(252, 250, 245, 0.96) !important;
    cursor: pointer;
  }
  .kt-lib-button.is-quiet { border-color: rgba(255, 255, 255, 0.14); background: transparent; color: rgba(var(--lib-ink), 0.75) !important; }

  .kt-lib-toc { margin: 22px 0 6px; padding: 14px 16px; border-radius: 16px; background: rgba(255, 255, 255, 0.025); border: 1px solid rgba(255, 255, 255, 0.06); }
  .kt-lib-toc ol { counter-reset: toc; }
  .kt-lib-toc li { counter-increment: toc; }
  .kt-lib-toc button {
    display: flex;
    gap: 10px;
    width: 100%;
    min-height: 36px;
    align-items: center;
    padding: 2px 0;
    border: 0;
    background: none;
    text-align: left;
    font-size: 14.5px !important;
    color: rgba(var(--lib-ink), 0.82) !important;
    cursor: pointer;
  }
  .kt-lib-toc button::before { content: counter(toc); min-width: 18px; font-size: 12px; color: rgba(var(--lib-accent-soft), 0.7); }

  .kt-lib-section { padding-top: 22px; }
  .kt-lib-section-head { display: flex; align-items: center; justify-content: space-between; gap: 8px; margin-bottom: 4px; }
  .kt-lib-section h2 {
    margin: 0;
    font-family: Georgia, 'Times New Roman', serif;
    font-weight: 400;
    font-size: 22px;
    line-height: 1.25;
    color: rgba(252, 250, 245, 0.96);
  }
  .kt-lib-section p, .kt-lib-list li {
    margin: 0 0 14px;
    font-size: 16.5px;
    line-height: 1.72;
    color: rgba(var(--lib-ink), 0.88);
    hyphens: auto;
    -webkit-hyphens: auto;
    overflow-wrap: break-word;
  }
  .kt-lib-list { margin: 4px 0 14px !important; }
  .kt-lib-list li { position: relative; margin-bottom: 8px; padding-left: 18px; }
  .kt-lib-list li::before { content: ''; position: absolute; left: 2px; top: 0.78em; width: 6px; height: 1px; background: rgba(var(--lib-accent), 0.8); }
  .kt-lib-ref {
    color: rgb(var(--lib-accent-soft));
    text-decoration: underline;
    text-decoration-color: rgba(var(--lib-accent), 0.45);
    text-decoration-thickness: 1px;
    text-underline-offset: 3px;
  }
  .kt-lib-ref:focus-visible { outline: 1px solid rgba(var(--lib-accent), 0.8); outline-offset: 2px; border-radius: 3px; }

  .kt-lib-related { margin-top: 34px; padding-top: 18px; border-top: 1px solid rgba(255, 255, 255, 0.08); }
  .kt-lib-related h2 { margin: 0 0 10px; font-size: 11px; font-weight: 600; letter-spacing: 0.18em; text-transform: uppercase; color: rgba(var(--lib-accent-soft), 0.78); }
  .kt-lib-related ul { display: flex; flex-wrap: wrap; gap: 8px; }
  .kt-lib-related-item {
    min-height: 40px;
    padding: 0 14px;
    border: 1px solid rgba(var(--lib-accent), 0.3);
    border-radius: 999px;
    background: transparent;
    font-size: 14px !important;
    cursor: pointer;
  }
  .kt-lib-related-item:hover, .kt-lib-related-item:focus-visible { background: rgba(var(--lib-accent), 0.1); outline: none; }
  .kt-lib-sources { margin-top: 28px; padding-top: 16px; border-top: 1px solid rgba(255, 255, 255, 0.08); }
  .kt-lib-sources h2 { margin: 0 0 10px; font-size: 11px; font-weight: 600; letter-spacing: 0.18em; text-transform: uppercase; color: rgba(var(--lib-accent-soft), 0.78); }
  .kt-lib-sources li { margin: 0 0 7px; font-size: 13.5px; line-height: 1.5; color: rgba(var(--lib-ink), 0.7); }
  .kt-lib-sources cite { font-style: italic; color: rgba(var(--lib-ink), 0.86); }
  .kt-lib-sources-note { margin: 10px 0 0; font-size: 12px; line-height: 1.5; color: rgba(var(--lib-ink), 0.45); }
  .kt-lib-footnote { margin: 30px 0 0; font-size: 12.5px; line-height: 1.55; color: rgba(var(--lib-ink), 0.45); }

  /* ---------------------------------------------------------------- continue, about, search, empty */
  .kt-lib-continue[hidden] { display: none; }
  .kt-lib-about { margin-top: 30px; padding: 4px 0; border-top: 1px solid rgba(255, 255, 255, 0.07); }
  .kt-lib-about summary { min-height: 44px; display: flex; align-items: center; font-size: 13px; letter-spacing: 0.06em; color: rgba(var(--lib-ink), 0.66); cursor: pointer; }
  .kt-lib-about p { margin: 0 0 10px; font-size: 14px; line-height: 1.6; color: rgba(var(--lib-ink), 0.7); }

  .kt-lib-search {
    display: flex;
    align-items: center;
    gap: 10px;
    margin-top: 6px;
    padding: 0 14px;
    border: 1px solid rgba(var(--lib-accent), 0.4);
    border-radius: 16px;
    background: rgba(255, 255, 255, 0.03);
  }
  .kt-lib-search input {
    flex: 1 1 auto;
    min-width: 0;
    min-height: 50px;
    border: 0;
    background: transparent;
    color: rgba(252, 250, 245, 0.96);
    font-size: 16px;
    outline: none;
  }
  .kt-lib-search input::placeholder { color: rgba(var(--lib-ink), 0.45); }
  .kt-lib-scopes { display: flex; gap: 8px; margin: 12px 0 4px; flex-wrap: wrap; }
  .kt-lib-chip { min-height: 36px; padding: 0 14px; border: 1px solid rgba(255, 255, 255, 0.12); border-radius: 999px; background: transparent; font-size: 13px !important; color: rgba(var(--lib-ink), 0.7) !important; cursor: pointer; }
  .kt-lib-chip.is-on { border-color: rgba(var(--lib-accent), 0.6); background: rgba(var(--lib-accent), 0.12); color: rgba(252, 250, 245, 0.96) !important; }
  .kt-lib-search-status { min-height: 20px; margin: 10px 0; font-size: 13px; color: rgba(var(--lib-ink), 0.55); }
  .kt-lib-empty { padding: 30px 0; }
  .kt-lib-empty p { font-size: 15px; line-height: 1.6; color: rgba(var(--lib-ink), 0.75); }

  @media (min-width: 760px) {
    .kt-lib-page { padding-top: 34px; }
    .kt-lib-section p, .kt-lib-list li { font-size: 17px; }
  }
  @media (prefers-reduced-motion: reduce) {
    .kt-lib-page.is-entering { animation: none; }
    .kt-lib-shelf-item, .kt-lib-category, .kt-lib-entry, .kt-lib-searchbox { transition: none; }
  }
`;
