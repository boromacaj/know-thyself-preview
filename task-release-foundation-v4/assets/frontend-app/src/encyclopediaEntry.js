/*
 * THE ENCYCLOPEDIA'S DOOR - the only Encyclopedia code in the start-up module graph.
 *
 * One delegated click listener and a few lines of CSS for the controls that open the library: the "Encyclopedia" capsule in
 * each module's strip (data-encyclopedia-open) and the "Read the Encyclopedia article" links in the reading sheets
 * (data-encyclopedia-article). The reader (encyclopediaReader.ts) and every article are fetched on the first tap, never
 * before: the Main Menu's start-up pays for this file and nothing else. The reader code starts downloading at the pointerdown
 * that precedes the click (or when a control gains keyboard focus), which hides most of the round trip.
 */
import { libraryForStop } from './app/encyclopedia/library/entryPoints.js?v=4cd804d';
const LIBRARY_IDS = ['astrology', 'numerology', 'human-design', 'bazi', 'tarot', 'synthesis'];
let reader = null;
const loadReader = () => {
    if (!reader) {
        reader = import('./encyclopediaReader.js?v=4cd804d');
        reader.catch(() => { reader = null; });
    }
    return reader;
};
const style = document.createElement('style');
style.dataset.ktEncyclopediaEntry = 'true';
style.textContent = `
  /* The capsule beside the way home: the same glass capsule, a book mark in front of the label. */
  /* No second backdrop blur over the reading (the Menu capsule already carries one, and each blurred layer is a full
     re-sample of what is behind it on every scrolled frame): a slightly more opaque ground reads the same. */
  #place-experience .kt-pillar-nav-button.kt-nav-library {
    flex: 0 0 auto;
    white-space: nowrap;
    color: rgba(250, 249, 245, 0.8);
    background: rgba(10, 13, 14, 0.86);
    backdrop-filter: none;
    -webkit-backdrop-filter: none;
  }
  #place-experience .kt-pillar-nav-button .kt-nav-library-mark { display: inline-grid; place-items: center; margin-right: 7px; opacity: 0.85; }
  /* The link at the foot of a meaning sheet. */
  .kt-library-link {
    display: inline-flex;
    align-items: center;
    gap: 6px;
    min-height: 40px;
    margin: 6px 0 2px;
    padding: 0 14px;
    border: 1px solid rgba(var(--kt-concept-accent-rgb, var(--profile-energy-soft-rgb, 218, 171, 84)), 0.42);
    border-radius: 999px;
    background: transparent;
    color: rgba(250, 249, 245, 0.92);
    font: inherit;
    font-size: 13.5px;
    cursor: pointer;
  }
  .kt-library-link:hover, .kt-library-link:focus-visible { background: rgba(255, 255, 255, 0.06); }
`;
document.head.append(style);
document.addEventListener('click', (event) => {
    const target = event.target instanceof Element ? event.target : null;
    const control = target?.closest('[data-encyclopedia-open], [data-encyclopedia-article]');
    if (!control || control.closest('#kt-library'))
        return;
    event.preventDefault();
    const articleId = control.dataset.encyclopediaArticle;
    /* "current": the strip's capsule, which is the same on every module - its library is the active destination's. */
    const requested = control.dataset.encyclopediaOpen;
    const open = requested === 'current' ? libraryForStop(document.getElementById('place-experience')?.dataset.pillarActive ?? '') ?? 'home' : requested;
    const category = control.dataset.encyclopediaCategory;
    const section = control.dataset.encyclopediaSection;
    void loadReader().then((module) => {
        if (articleId)
            module.openEncyclopedia({ kind: 'article', id: articleId, ...(section ? { section } : {}) }, control);
        else if (open && LIBRARY_IDS.includes(open) && category)
            module.openEncyclopedia({ kind: 'category', library: open, category }, control);
        else if (open && LIBRARY_IDS.includes(open))
            module.openEncyclopedia({ kind: 'library', library: open }, control);
        else
            module.openEncyclopedia({ kind: 'home' }, control);
    }).catch((error) => console.warn('[encyclopedia] the reader could not be loaded', error));
});
/* Start fetching the reader code (not the articles) at the touch that precedes the click. No observers, no timers: nothing
   runs on the Main Menu or in any reading until a reader actually reaches for an Encyclopedia control. */
const warm = (event) => {
    const target = event.target instanceof Element ? event.target : null;
    if (target?.closest('[data-encyclopedia-open], [data-encyclopedia-article]'))
        void loadReader();
};
document.addEventListener('pointerdown', warm, { passive: true });
document.addEventListener('focusin', warm);
