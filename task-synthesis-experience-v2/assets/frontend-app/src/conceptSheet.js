import { conceptEntry } from './app/encyclopedia/concepts.js?v=53c0693';
import { t } from './app/i18n/uiStrings.js?v=53c0693';
/*
 * THE ENCYCLOPEDIA BOTTOM SHEET
 * -----------------------------
 * One panel, shared by every info control in the app. It answers "what does this
 * concept mean in this system?" and nothing else - the personal reading stays
 * underneath, unchanged and still there when the sheet closes.
 *
 * WHY A BOTTOM SHEET AND NOT A TOOLTIP
 * The target is a phone. A hover tooltip has no hover to open it, a title
 * attribute never appears at all, and a small popover anchored to a 24px button
 * either covers the thing it explains or runs off the edge. A sheet that rises
 * from the bottom is the one pattern that has room for three paragraphs, is
 * reachable by thumb, and has an obvious way out.
 *
 * WHY IT IS DELEGATED
 * A single listener on the document, matched by closest('[data-concept]'). The
 * reading is re-rendered wholesale whenever the reader opens a pillar, so
 * per-button listeners would have to be re-attached on every render and would
 * leak on every one that was missed. Delegation survives any amount of
 * re-rendering because it never touches the buttons at all.
 *
 * WHY THE CONTENT IS LOOKED UP AT OPEN TIME
 * The control carries only a key. Nothing conceptual is duplicated into any
 * pillar's markup, so an entry is written once and cannot drift between the four
 * places it might be referenced from.
 *
 * IT NEVER TRAPS THE READER
 * Backdrop tap, close button and Escape all dismiss it, and the sheet is removed
 * from the DOM rather than left hidden. Body scroll is locked only while it is
 * open, and the lock is released on every exit path including Escape.
 */
const SHEET_ID = 'kt-concept-sheet';
const style = document.createElement('style');
style.dataset.ktConceptSheet = 'true';
style.textContent = `
  /* The info control. Sized to the 24px minimum a thumb can actually hit, but
     drawn much smaller than that, so it reads as a quiet mark beside a heading
     rather than as a second button competing with it.

     COLOUR. The mark is a pictogram, so its ring is the gold it always had:
     --profile-energy, which a reading does not define. The sheet below is
     mounted on document.body, outside #place-experience, so no Interface Color
     can reach it. */
  .kt-info-control {
    display: inline-grid;
    place-items: center;
    width: 24px;
    height: 24px;
    margin-left: 7px;
    padding: 0;
    vertical-align: middle;
    border: 1px solid rgba(var(--kt-icon-rgb, var(--profile-energy-soft-rgb, 218, 171, 84)), 0.34);
    border-radius: 999px;
    background: transparent;
    color: rgba(238, 236, 246, 0.72);
    font: italic 600 11px/1 Georgia, 'Times New Roman', serif;
    cursor: pointer;
    transition: border-color 0.2s ease, color 0.2s ease;
  }

  .kt-info-control:hover,
  .kt-info-control:focus-visible {
    border-color: rgba(var(--kt-icon-rgb, var(--profile-energy-soft-rgb, 218, 171, 84)), 0.8);
    color: rgba(255, 255, 255, 0.95);
  }

  .kt-concept-backdrop {
    position: fixed;
    inset: 0;
    z-index: 2000;
    background: rgba(3, 5, 8, 0.58);
    backdrop-filter: blur(3px);
    -webkit-backdrop-filter: blur(3px);
    animation: kt-concept-fade 180ms ease both;
  }

  .kt-concept-sheet {
    position: fixed;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 2001;
    /* Never taller than three quarters of the scene: the reading it is
       explaining has to stay visible behind it, or the sheet becomes a page. */
    max-height: min(76dvh, 640px);
    display: flex;
    flex-direction: column;
    padding: 10px 20px calc(env(safe-area-inset-bottom, 0px) + 22px);
    border-radius: 26px 26px 0 0;
    border-top: 1px solid rgba(var(--profile-energy-soft-rgb, 218, 171, 84), 0.3);
    background:
      linear-gradient(180deg, rgba(255,255,255,.055), rgba(255,255,255,.012) 42%, rgba(0,0,0,.1)),
      rgba(9, 12, 17, 0.95);
    box-shadow: 0 -22px 60px rgba(0, 0, 0, 0.5);
    backdrop-filter: blur(26px) saturate(1.1);
    -webkit-backdrop-filter: blur(26px) saturate(1.1);
    animation: kt-concept-rise 240ms cubic-bezier(0.22, 1, 0.36, 1) both;
  }

  /* A grab handle. It is decorative - the sheet is not draggable - but it is the
     conventional signal that this panel came from the bottom and goes back. */
  .kt-concept-grip {
    width: 38px;
    height: 4px;
    margin: 0 auto 12px;
    border-radius: 999px;
    background: rgba(255, 255, 255, 0.18);
  }

  .kt-concept-head {
    display: flex;
    align-items: flex-start;
    gap: 12px;
    margin-bottom: 10px;
  }

  .kt-concept-titles { flex: 1 1 auto; min-width: 0; }

  .kt-concept-eyebrow {
    margin: 0 0 3px;
    font-size: 10px;
    letter-spacing: 0.16em;
    text-transform: uppercase;
    color: rgba(var(--profile-energy-soft-rgb, 218, 171, 84), 0.82);
  }

  .kt-concept-title {
    margin: 0;
    font-family: Georgia, 'Times New Roman', serif;
    font-size: 21px;
    line-height: 1.2;
    color: rgba(250, 249, 245, 0.98);
  }

  .kt-concept-close {
    flex: 0 0 auto;
    width: 34px;
    height: 34px;
    border: 1px solid rgba(255, 255, 255, 0.16);
    border-radius: 999px;
    background: rgba(255, 255, 255, 0.04);
    color: rgba(238, 236, 246, 0.9);
    font-size: 17px;
    line-height: 1;
    cursor: pointer;
  }

  /* A panel that wears an accent (the Human Design centres): the title in it, a hairline under the head, the close control's rim. Restrained: the body text stays the page's own. */
  .kt-concept-sheet[data-accent="centre"] .kt-concept-title { color: rgb(var(--kt-concept-accent-rgb)); }
  .kt-concept-sheet[data-accent="centre"] .kt-concept-head {
    padding-bottom: 12px;
    margin-bottom: 14px;
    border-bottom: 1px solid rgba(var(--kt-concept-accent-rgb), 0.42);
  }
  .kt-concept-sheet[data-accent="centre"] .kt-concept-close { border-color: rgba(var(--kt-concept-accent-rgb), 0.42); }

  .kt-concept-body {
    overflow-y: auto;
    -webkit-overflow-scrolling: touch;
    overscroll-behavior: contain;
  }

  .kt-concept-body p {
    margin: 0 0 11px;
    font-size: 14px;
    line-height: 1.62;
    color: rgba(228, 226, 238, 0.9);
  }

  /* The epistemic boundary is set apart deliberately. It is not a footnote to
     skim past and it must never read as part of the explanation. */
  .kt-concept-boundary {
    margin: 14px 0 0;
    padding: 11px 13px;
    border-left: 2px solid rgba(var(--profile-energy-soft-rgb, 218, 171, 84), 0.5);
    border-radius: 0 12px 12px 0;
    background: rgba(255, 255, 255, 0.035);
    font-size: 12.5px;
    line-height: 1.55;
    color: rgba(216, 214, 228, 0.82);
  }

  /* Quieter than the boundary: it is a note about the panel, not about the
     subject, and must not compete with either. */
  .kt-concept-fallback {
    margin: 0 0 12px;
    font-size: 11.5px;
    line-height: 1.5;
    color: rgba(200, 198, 214, 0.62);
    font-style: italic;
  }

  @keyframes kt-concept-rise {
    from { transform: translate3d(0, 100%, 0); }
    to { transform: translate3d(0, 0, 0); }
  }

  @keyframes kt-concept-fade {
    from { opacity: 0; }
    to { opacity: 1; }
  }

  @media (prefers-reduced-motion: reduce) {
    .kt-concept-sheet,
    .kt-concept-backdrop { animation-duration: 1ms; }
  }
`;
document.head.append(style);
let lastFocused = null;
function closeSheet() {
    const existing = document.getElementById(SHEET_ID);
    if (!existing)
        return;
    existing.remove();
    document.querySelector('.kt-concept-backdrop')?.remove();
    document.body.style.removeProperty('overflow');
    /* Send focus back where it came from, or the reader loses their place in a
       long reading the moment they close a definition. */
    lastFocused?.focus?.();
    lastFocused = null;
}
function openSheet(key, trigger) {
    const entry = conceptEntry(key);
    /* An unknown key is a bug, but a silent no-op is the right behaviour for the
       reader: better nothing than an empty panel. */
    if (!entry)
        return;
    closeSheet();
    lastFocused = trigger;
    const backdrop = document.createElement('div');
    backdrop.className = 'kt-concept-backdrop';
    backdrop.addEventListener('click', closeSheet);
    const sheet = document.createElement('aside');
    sheet.id = SHEET_ID;
    sheet.className = 'kt-concept-sheet';
    sheet.setAttribute('role', 'dialog');
    sheet.setAttribute('aria-modal', 'true');
    sheet.setAttribute('aria-label', entry.eyebrow ? `${entry.title} — ${t('concept.aria')} ${entry.eyebrow}` : `${entry.title} — ${t('concept.aria')}`);
    const body = entry.body.map((paragraph) => {
        const p = document.createElement('p');
        p.textContent = paragraph;
        return p;
    });
    sheet.innerHTML = `
    <div class="kt-concept-grip" aria-hidden="true"></div>
    <header class="kt-concept-head">
      <div class="kt-concept-titles">
        ${entry.eyebrow ? '<p class="kt-concept-eyebrow"></p>' : ''}
        <h2 class="kt-concept-title"></h2>
      </div>
      <button class="kt-concept-close" type="button" aria-label="${t('ui.close')}">×</button>
    </header>
    <div class="kt-concept-body"></div>`;
    /* textContent rather than interpolation: the entries are ours, but the sheet
       is generic and the next thing added to it might not be. */
    const eyebrow = sheet.querySelector('.kt-concept-eyebrow');
    if (eyebrow)
        eyebrow.textContent = entry.eyebrow;
    sheet.querySelector('.kt-concept-title').textContent = entry.title;
    const bodyHost = sheet.querySelector('.kt-concept-body');
    bodyHost.append(...body);
    /* Say so when the panel is in English because nothing else exists yet. Mixing
       languages without telling the reader is the one thing a fallback must not
       do silently - they would reasonably assume the translation is simply bad. */
    if (entry.fellBackToEnglish) {
        const note = document.createElement('p');
        note.className = 'kt-concept-fallback';
        note.textContent = t('concept.fallbackNote');
        bodyHost.prepend(note);
    }
    if (entry.boundary) {
        const boundary = document.createElement('p');
        boundary.className = 'kt-concept-boundary';
        boundary.textContent = entry.boundary;
        bodyHost.append(boundary);
    }
    /* A Human Design centre's panel wears the centre's own colour: the title, a hairline under the head and the close control's rim. The colour is the one the graph draws the centre with
       (--hd-centre-rgb on the control that opened the panel; a grey for a centre the birth time leaves uncertain), read at the moment of opening. */
    const accent = trigger?.hasAttribute('data-hd-center') ? getComputedStyle(trigger).getPropertyValue('--hd-centre-rgb').trim() : '';
    if (accent) {
        sheet.style.setProperty('--kt-concept-accent-rgb', accent);
        sheet.setAttribute('data-accent', 'centre');
    }
    sheet.querySelector('.kt-concept-close')?.addEventListener('click', closeSheet);
    document.body.append(backdrop, sheet);
    document.body.style.overflow = 'hidden';
    sheet.querySelector('.kt-concept-close')?.focus();
}
document.addEventListener('click', (event) => {
    const target = event.target;
    if (!(target instanceof Element))
        return;
    const control = target.closest('[data-concept]');
    if (!control)
        return;
    const key = control.dataset.concept;
    if (!key)
        return;
    event.preventDefault();
    openSheet(key, control);
});
document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && document.getElementById(SHEET_ID)) {
        event.preventDefault();
        closeSheet();
    }
});
