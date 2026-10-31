/*
 * THE NUMEROLOGY MEANING SHEET
 * ----------------------------
 * What a tap on one of the four Numerology circles opens: the meaning of THAT number in THAT position (Life Path 7 is not Expression 7),
 * read from the core-position meaning database (app/knowledge/numerology/position-meanings) and shown on the same bottom sheet the
 * encyclopedia uses (conceptSheet.ts) - same glass, same grip, same way out. The circles' own accent carries over: gold for the Life Path
 * circle, the Earth's blue-white for the other three.
 *
 * WHAT IT DOES NOT DO
 *   - It calculates nothing. The number is the one the circle carries (data-orbit-number, written by the renderer from the engine's own
 *     output) and the position is the circle's own. There is no reduction, no nearest match and no fallback to another position: a
 *     circle whose pair has no record simply opens nothing.
 *   - It loads nothing at start-up. The database and the knowledge base are imported on the first tap (and warmed when the hero first
 *     appears, once the browser is idle), because the app does not carry its reading content before there is a reading.
 *   - It adds no animation loop. Opening the sheet sets one attribute on the hero, and that attribute pauses the orbit's own CSS
 *     animations all at once, so the ring, the satellites and their counter-spin stay in step and resume from where they stopped.
 *
 * THE LISTENER IS DELEGATED on #pillar-view, which survives the reading being re-rendered. A sheet is removed (never hidden), and the
 * page's scroll and the hero's pinned place are never touched: the sheet is on document.body, above everything, and the page behind it
 * keeps its scroll position.
 */
import { activeLocale } from './app/i18n/locale.js?v=f9ab0a6';
import { t } from './app/i18n/uiStrings.js?v=f9ab0a6';
const SHEET_ID = 'kt-meaning-sheet';
const isPosition = (value) => typeof value === 'string' && ['life-path', 'expression', 'soul-urge', 'personality'].includes(value);
const pillarView = document.getElementById('pillar-view');
if (pillarView instanceof HTMLElement) {
    const style = document.createElement('style');
    style.dataset.numerologyMeaningSheet = 'true';
    style.textContent = `
    /* The sheet is conceptSheet.ts's (kt-concept-*); these are only what a meaning adds to it. The accent is a custom property so that
       the border, the eyebrow and the number take it together: gold for the Life Path, the Earth's blue-white for the other three. */
    .kt-meaning-sheet { --profile-energy-soft-rgb: var(--kt-meaning-accent, 196, 222, 255); --kt-meaning-accent-rgb: var(--kt-meaning-accent, 196, 222, 255); }
    .kt-meaning-sheet[data-accent="gold"] { --kt-meaning-accent: 238, 214, 150; }
    .kt-meaning-sheet[data-accent="blue"] { --kt-meaning-accent: 196, 222, 255; }
    .kt-meaning-sheet .kt-concept-head { align-items: center; }
    .kt-meaning-number {
      flex: 0 0 auto;
      min-width: 46px;
      text-align: center;
      font-family: Georgia, 'Times New Roman', serif;
      font-size: 38px;
      line-height: 1;
      color: rgb(var(--kt-meaning-accent-rgb));
      text-shadow: 0 0 14px rgba(var(--kt-meaning-accent-rgb), 0.5);
    }
    .kt-meaning-sheet .kt-concept-title { font-size: 19px; }
    .kt-meaning-sheet .kt-concept-close { width: 44px; height: 44px; }
    .kt-meaning-sheet .kt-concept-body { padding-bottom: 4px; }
    .kt-meaning-sheet .kt-concept-body:focus-visible { outline: 1px solid rgba(var(--kt-meaning-accent-rgb), 0.6); outline-offset: 2px; }
    .kt-meaning-intro { font-style: italic; color: rgba(216, 214, 228, 0.78); }
    .kt-meaning-sheet h3 {
      margin: 16px 0 6px;
      font-size: 10px;
      font-weight: 600;
      line-height: 1.3;
      letter-spacing: 0.16em;
      text-transform: uppercase;
      color: rgba(var(--kt-meaning-accent-rgb), 0.86);
    }
    .kt-meaning-sheet ul { margin: 0 0 4px; padding: 0 0 0 18px; }
    .kt-meaning-sheet li { margin: 0 0 5px; font-size: 14px; line-height: 1.55; color: rgba(228, 226, 238, 0.9); }
    .kt-meaning-sheet li::marker { color: rgba(var(--kt-meaning-accent-rgb), 0.7); }
    .kt-meaning-question {
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
    .kt-meaning-note { margin: 14px 0 0; font-size: 12.5px; line-height: 1.55; color: rgba(216, 214, 228, 0.82); }
    .kt-meaning-foot { margin: 14px 0 6px; font-size: 11.5px; line-height: 1.5; color: rgba(200, 198, 214, 0.62); font-style: italic; }
  `;
    document.head.append(style);
    let loading = null;
    let loadingSk = null;
    const load = async () => {
        loading ??= Promise.all([
            import('./app/knowledge/numerology/position-meanings/dialogContent.js?v=f9ab0a6'),
            import('./app/knowledge/knowledgeBase.js?v=f9ab0a6'),
        ]);
        const locale = activeLocale();
        if (locale !== 'en')
            loadingSk ??= import('./app/knowledge/numerology/position-meanings/sk/index.js?v=f9ab0a6');
        const [dialog, knowledge] = await loading;
        const sk = locale !== 'en' ? await loadingSk : null;
        return (position, number) => dialog.dialogContentForPair(position, number, 
        /* The registry's own headline for the same position and number, in the reader's language: the sheet's title is the reading's own line, so the two cannot
           drift. Null (the position and number are shown instead) if the registry has nothing, which a test says never happens. */
        knowledge.resolve({ system: 'numerology', kind: 'number', key: String(number), role: position })?.headline ?? null, locale, sk ? sk.positionMeaningDraftSk(position, number) : null);
    };
    /* Warm the import once the browser is idle after the first Numerology hero appears, so that the first tap opens at once. */
    let warmed = false;
    const warm = () => {
        if (warmed || !pillarView.querySelector('.kt-orbit-hero'))
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
    const hero = () => pillarView.querySelector('.kt-orbit-hero');
    const close = () => {
        opening += 1;
        const sheet = document.getElementById(SHEET_ID);
        sheet?.remove();
        document.querySelector('.kt-meaning-backdrop')?.remove();
        document.body.style.removeProperty('overflow');
        /* The orbit goes on from exactly where it stopped. */
        const scene = hero();
        if (scene)
            delete scene.dataset.orbitPaused;
        if (!sheet)
            return;
        /* Focus goes back to the circle that was activated; if the reading was re-rendered meanwhile, to its replacement. */
        const back = trigger?.isConnected ? trigger : pillarView.querySelector(`[data-orbit-open="${triggerKey}"]`);
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
    const open = async (position, number, source) => {
        const ticket = ++opening;
        const contentFor = await load();
        if (ticket !== opening)
            return;
        const content = contentFor(position, number);
        /* No record for this pair: nothing opens. Never another position's, never a reduced number's. */
        if (!content)
            return;
        close();
        const mine = ++opening;
        trigger = source;
        triggerKey = position;
        const backdrop = document.createElement('div');
        backdrop.className = 'kt-concept-backdrop kt-meaning-backdrop';
        backdrop.addEventListener('click', close);
        const sheet = document.createElement('aside');
        sheet.id = SHEET_ID;
        sheet.className = 'kt-concept-sheet kt-meaning-sheet';
        sheet.dataset.accent = content.accent;
        sheet.dataset.meaningId = content.id;
        sheet.setAttribute('role', 'dialog');
        sheet.setAttribute('aria-modal', 'true');
        sheet.setAttribute('aria-labelledby', 'kt-meaning-title');
        sheet.innerHTML = `
      <div class="kt-concept-grip" aria-hidden="true"></div>
      <header class="kt-concept-head">
        <div class="kt-meaning-number" aria-hidden="true"></div>
        <div class="kt-concept-titles">
          <p class="kt-concept-eyebrow"></p>
          <h2 class="kt-concept-title" id="kt-meaning-title"></h2>
        </div>
        <button class="kt-concept-close" type="button" aria-label="${t('ui.close')}">×</button>
      </header>
      <div class="kt-concept-body" tabindex="0" role="region" aria-labelledby="kt-meaning-title"></div>`;
        sheet.querySelector('.kt-meaning-number').textContent = String(content.number);
        sheet.querySelector('.kt-concept-eyebrow').textContent = content.eyebrow;
        const title = sheet.querySelector('.kt-concept-title');
        title.textContent = content.title;
        /* A screen reader gets the position and the number whatever the headline says. */
        title.setAttribute('aria-label', `${content.eyebrow.split(' · ')[0]} ${content.number}: ${content.title}`);
        const body = sheet.querySelector('.kt-concept-body');
        for (const block of content.blocks) {
            if (block.kind === 'list') {
                const heading = document.createElement('h3');
                heading.textContent = block.heading;
                body.append(heading, list(block.items));
            }
            else {
                const p = paragraph(block.text, { intro: 'kt-meaning-intro', question: 'kt-meaning-question', note: 'kt-meaning-note', footer: 'kt-meaning-foot', meaning: undefined }[block.kind]);
                if (block.kind === 'question')
                    p.setAttribute('aria-label', `${content.askLabel}: ${block.text}`);
                body.append(p);
            }
        }
        sheet.querySelector('.kt-concept-close')?.addEventListener('click', close);
        if (mine !== opening)
            return;
        document.body.append(backdrop, sheet);
        document.body.style.overflow = 'hidden';
        /* The orbit stops, all of it at once: the ring, the satellites and the counter-spin that keeps their type level. */
        const scene = hero();
        if (scene)
            scene.dataset.orbitPaused = 'on';
        sheet.querySelector('.kt-concept-close')?.focus();
    };
    pillarView.addEventListener('click', (event) => {
        const target = event.target;
        if (!(target instanceof Element))
            return;
        const button = target.closest('button[data-orbit-open]');
        if (!button || !pillarView.contains(button))
            return;
        const position = button.dataset.orbitOpen;
        const number = Number(button.dataset.orbitNumber);
        if (!isPosition(position) || !Number.isInteger(number))
            return;
        event.preventDefault();
        void open(position, number, button);
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
    /* Navigating away (the browser's back control, a change of address) closes the sheet; it never lingers over another screen. */
    window.addEventListener('popstate', close);
    window.addEventListener('hashchange', close);
    /* The reading was replaced under an open sheet (a language change, a new profile): close it, it belonged to the old one. */
    new MutationObserver(() => { if (document.getElementById(SHEET_ID) && !trigger?.isConnected)
        close(); }).observe(pillarView, { childList: true });
}
