/*
 * THE BIG THREE MEANING SHEET
 * ---------------------------
 * What a tap on one of the three hero callouts opens: the meaning of THAT placement in THAT sign (a Moon in Libra is not a Sun in Libra), read from the Big Three
 * database (app/knowledge/astrology/big-three) and shown on the same bottom sheet the encyclopedia and the Numerology meanings use (conceptSheet.ts's kt-concept-*)
 * - same glass, same grip, same way out. The callout's own accent carries over: gold for the Sun, the Moon's blue-white, a cool mist for the Ascendant.
 *
 * WHAT IT DOES NOT DO
 *   - It calculates nothing. The sign is the one the callout carries (data-astro-sign, written by the renderer from the engine's own output). An Ascendant the engine
 *     withholds has no sign, and its sheet says what the Ascendant needs; it never names one.
 *   - It loads nothing at start-up. The database is imported on the first tap (and warmed when the hero first appears, once the browser is idle).
 *   - It adds no animation loop and touches neither the scene nor the page's scroll: the sheet is on document.body, above everything.
 *
 * THE LISTENER IS DELEGATED on #pillar-view, which survives the reading being re-rendered. A sheet is removed (never hidden).
 */
import { t } from './app/i18n/uiStrings.js?v=b5ef5ed';
const SHEET_ID = 'kt-astro-sheet';
const isPlacement = (value) => value === 'sun' || value === 'moon' || value === 'ascendant';
const isState = (value) => value === 'known' || value === 'approximate' || value === 'boundary' || value === 'withheld';
const pillarView = document.getElementById('pillar-view');
if (pillarView instanceof HTMLElement) {
    const style = document.createElement('style');
    style.dataset.astrologyBigThreeSheet = 'true';
    style.textContent = `
    /* The sheet is conceptSheet.ts's (kt-concept-*); these are only what a meaning adds to it. The accent is a custom property so that the border, the eyebrow
       and the glyph take it together: gold for the Sun, the Moon's blue-white, a cool mist for the Ascendant. */
    .kt-astro-sheet { --profile-energy-soft-rgb: var(--kt-meaning-accent, 196, 222, 255); --kt-meaning-accent-rgb: var(--kt-meaning-accent, 196, 222, 255); }
    .kt-astro-sheet[data-accent="gold"] { --kt-meaning-accent: 238, 214, 150; }
    .kt-astro-sheet[data-accent="blue"] { --kt-meaning-accent: 196, 222, 255; }
    .kt-astro-sheet[data-accent="mist"] { --kt-meaning-accent: 186, 232, 228; }
    .kt-astro-sheet .kt-concept-head { align-items: center; }
    .kt-astro-sheet-sign {
      flex: 0 0 auto;
      width: 46px;
      height: 46px;
      display: grid;
      place-items: center;
      color: rgb(var(--kt-meaning-accent-rgb));
      filter: drop-shadow(0 0 8px rgba(var(--kt-meaning-accent-rgb), 0.5));
    }
    .kt-astro-sheet-sign svg { width: 40px; height: 40px; }
    .kt-astro-sheet .kt-concept-title { font-size: 19px; }
    .kt-astro-sheet .kt-concept-close { width: 44px; height: 44px; }
    .kt-astro-sheet .kt-concept-body { padding-bottom: 4px; }
    .kt-astro-sheet .kt-concept-body:focus-visible { outline: 1px solid rgba(var(--kt-meaning-accent-rgb), 0.6); outline-offset: 2px; }
    .kt-astro-intro { font-style: italic; color: rgba(216, 214, 228, 0.78); }
    .kt-astro-sheet h3 {
      margin: 16px 0 6px;
      font-size: 10px;
      font-weight: 600;
      line-height: 1.3;
      letter-spacing: 0.16em;
      text-transform: uppercase;
      color: rgba(var(--kt-meaning-accent-rgb), 0.86);
    }
    .kt-astro-sheet ul { margin: 0 0 4px; padding: 0 0 0 18px; }
    .kt-astro-sheet li { margin: 0 0 5px; font-size: 14px; line-height: 1.55; color: rgba(228, 226, 238, 0.9); }
    .kt-astro-sheet li::marker { color: rgba(var(--kt-meaning-accent-rgb), 0.7); }
    .kt-astro-facts { display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 8px; margin: 14px 0 0; padding: 0; }
    .kt-astro-fact { min-width: 0; padding: 8px 10px; border: 1px solid rgba(var(--kt-meaning-accent-rgb), 0.24); border-radius: 12px; background: rgba(255, 255, 255, 0.03); }
    .kt-astro-fact dt { margin: 0 0 2px; font-size: 9.5px; letter-spacing: 0.14em; text-transform: uppercase; color: rgba(var(--kt-meaning-accent-rgb), 0.8); }
    .kt-astro-fact dd { margin: 0; font-size: 13px; line-height: 1.35; color: rgba(236, 234, 246, 0.95); overflow-wrap: anywhere; }
    .kt-astro-question {
      margin: 16px 0 0;
      padding: 11px 13px;
      border-left: 2px solid rgba(var(--kt-meaning-accent-rgb), 0.55);
      border-radius: 0 12px 12px 0;
      background: rgba(255, 255, 255, 0.035);
      font-family: Georgia, 'Times New Roman', serif;
      font-size: 15px;
      line-height: 1.5;
      color: rgba(244, 242, 250, 0.94);
    }
    .kt-astro-note { margin: 14px 0 0; font-size: 12.5px; line-height: 1.55; color: rgba(216, 214, 228, 0.82); }
    .kt-astro-foot { margin: 14px 0 6px; font-size: 11.5px; line-height: 1.5; color: rgba(200, 198, 214, 0.62); font-style: italic; }
  `;
    document.head.append(style);
    let loading = null;
    const load = () => {
        loading ??= import('./app/knowledge/astrology/big-three/dialogContent.js?v=b5ef5ed').then((dialog) => (placement, sign, state, alternatives, wholeDay) => {
            if (placement === 'ascendant' && (state === 'withheld' || sign === ''))
                return dialog.withheldAscendantContent();
            return dialog.dialogContentForPair(placement, sign, { state, alternatives, wholeDay });
        });
        return loading;
    };
    /* Warm the import once the browser is idle after the hero first appears, so that the first tap opens at once. */
    let warmed = false;
    const warm = () => {
        if (warmed || !pillarView.querySelector('[data-astro-hero]'))
            return;
        warmed = true;
        const idle = window.requestIdleCallback;
        const start = () => { void load(); };
        if (idle)
            idle(start, { timeout: 4000 });
        else
            window.setTimeout(start, 1500);
    };
    new MutationObserver(warm).observe(pillarView, { childList: true });
    let trigger = null;
    let triggerKey = '';
    let opening = 0;
    const close = () => {
        opening += 1;
        const sheet = document.getElementById(SHEET_ID);
        sheet?.remove();
        document.querySelector('.kt-astro-backdrop')?.remove();
        document.body.style.removeProperty('overflow');
        if (!sheet)
            return;
        /* Focus goes back to the callout that was activated; if the reading was re-rendered meanwhile, to its replacement. */
        const back = trigger?.isConnected ? trigger : pillarView.querySelector(`[data-astro-open="${triggerKey}"]`);
        back?.focus?.({ preventScroll: true });
        trigger = null;
    };
    const list = (items) => {
        const ul = document.createElement('ul');
        for (const item of items) {
            const li = document.createElement('li');
            li.textContent = item;
            ul.append(li);
        }
        return ul;
    };
    const paragraph = (text, className) => {
        const p = document.createElement('p');
        if (className)
            p.className = className;
        p.textContent = text;
        return p;
    };
    const open = async (placement, sign, state, alternatives, wholeDay, source) => {
        const ticket = ++opening;
        const contentFor = await load();
        if (ticket !== opening)
            return;
        const content = contentFor(placement, sign, state, alternatives, wholeDay);
        /* No record for this pair: nothing opens. Never another placement's, never a neighbouring sign's. */
        if (!content)
            return;
        close();
        const mine = ++opening;
        trigger = source;
        triggerKey = placement;
        const backdrop = document.createElement('div');
        backdrop.className = 'kt-concept-backdrop kt-astro-backdrop';
        backdrop.addEventListener('click', close);
        const sheet = document.createElement('aside');
        sheet.id = SHEET_ID;
        sheet.className = 'kt-concept-sheet kt-astro-sheet';
        sheet.dataset.accent = content.accent;
        sheet.dataset.meaningId = content.id;
        sheet.setAttribute('role', 'dialog');
        sheet.setAttribute('aria-modal', 'true');
        sheet.setAttribute('aria-labelledby', 'kt-astro-sheet-title');
        sheet.innerHTML = `
      <div class="kt-concept-grip" aria-hidden="true"></div>
      <header class="kt-concept-head">
        <div class="kt-astro-sheet-sign" aria-hidden="true"></div>
        <div class="kt-concept-titles">
          <p class="kt-concept-eyebrow"></p>
          <h2 class="kt-concept-title" id="kt-astro-sheet-title"></h2>
        </div>
        <button class="kt-concept-close" type="button" aria-label="${t('ui.close')}">×</button>
      </header>
      <div class="kt-concept-body" tabindex="0" role="region" aria-labelledby="kt-astro-sheet-title"></div>`;
        /* The sign's own glyph, as the callout draws it (copied from the callout, which the renderer drew from the engine's sign). */
        const glyph = source.querySelector('.kt-astro-glyph svg');
        if (glyph)
            sheet.querySelector('.kt-astro-sheet-sign').append(glyph.cloneNode(true));
        const eyebrow = sheet.querySelector('.kt-concept-eyebrow');
        eyebrow.textContent = content.sign === null ? content.eyebrow : `${content.signName} · ${content.eyebrow}`;
        const title = sheet.querySelector('.kt-concept-title');
        title.textContent = content.title;
        /* A screen reader gets the placement and the sign whatever the headline says. */
        title.setAttribute('aria-label', content.sign === null ? `${content.eyebrow.split(' · ')[0]}: ${content.title}` : `${content.eyebrow.split(' · ')[0]} in ${content.signName}: ${content.title}`);
        const body = sheet.querySelector('.kt-concept-body');
        for (const block of content.blocks) {
            if (block.kind === 'list') {
                const heading = document.createElement('h3');
                heading.textContent = block.heading;
                body.append(heading, list(block.items));
            }
            else if (block.kind === 'facts') {
                const facts = document.createElement('dl');
                facts.className = 'kt-astro-facts';
                for (const item of block.items) {
                    const cell = document.createElement('div');
                    cell.className = 'kt-astro-fact';
                    const term = document.createElement('dt');
                    term.textContent = item.label;
                    const value = document.createElement('dd');
                    value.textContent = item.value;
                    cell.append(term, value);
                    facts.append(cell);
                }
                body.append(facts);
            }
            else {
                const p = paragraph(block.text, { intro: 'kt-astro-intro', question: 'kt-astro-question', note: 'kt-astro-note', footer: 'kt-astro-foot', meaning: undefined }[block.kind]);
                if (block.kind === 'question')
                    p.setAttribute('aria-label', `A question to carry: ${block.text}`);
                body.append(p);
            }
        }
        sheet.querySelector('.kt-concept-close')?.addEventListener('click', close);
        if (mine !== opening)
            return;
        document.body.append(backdrop, sheet);
        document.body.style.overflow = 'hidden';
        sheet.querySelector('.kt-concept-close')?.focus();
    };
    pillarView.addEventListener('click', (event) => {
        const target = event.target;
        if (!(target instanceof Element))
            return;
        const button = target.closest('button[data-astro-open]');
        if (!button || !pillarView.contains(button))
            return;
        const placement = button.dataset.astroOpen;
        const state = button.dataset.state;
        if (!isPlacement(placement))
            return;
        event.preventDefault();
        const alternatives = (button.dataset.astroAlt ?? '').split(',').filter((sign) => sign !== '');
        void open(placement, button.dataset.astroSign ?? '', isState(state) ? state : 'known', alternatives, button.dataset.astroDay === 'on', button);
    });
    document.addEventListener('keydown', (event) => {
        const sheet = document.getElementById(SHEET_ID);
        if (!sheet)
            return;
        if (event.key === 'Escape') {
            event.preventDefault();
            close();
            return;
        }
        /* A modal keeps focus inside itself: Tab walks the close control and the scrolling body, and wraps. */
        if (event.key === 'Tab') {
            const stops = [...sheet.querySelectorAll('button, [tabindex="0"]')];
            if (stops.length === 0)
                return;
            const first = stops[0];
            const last = stops[stops.length - 1];
            const active = document.activeElement;
            if (event.shiftKey && active === first) {
                event.preventDefault();
                last.focus();
            }
            else if (!event.shiftKey && active === last) {
                event.preventDefault();
                first.focus();
            }
            else if (!sheet.contains(active)) {
                event.preventDefault();
                first.focus();
            }
        }
    });
    /* Navigating away closes the sheet; it never lingers over another screen. */
    window.addEventListener('popstate', close);
    window.addEventListener('hashchange', close);
    /* The reading was replaced under an open sheet (a language change, a new profile): close it, it belonged to the old one. */
    new MutationObserver(() => { if (document.getElementById(SHEET_ID) && !trigger?.isConnected)
        close(); }).observe(pillarView, { childList: true });
    /* The app's own navigation (MENU, the strip, a module opened from the menu) is a pushState or a replaceState, which fires neither of the events above, and the
       reading view is only hidden, not re-rendered, when the destination is the menu, Forecast or Tarot: the sheet closes when the view it belongs to is hidden. */
    new MutationObserver(() => { if (document.getElementById(SHEET_ID) && pillarView.hidden)
        close(); }).observe(pillarView, { attributes: true, attributeFilter: ['hidden'] });
}
