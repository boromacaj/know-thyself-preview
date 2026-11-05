import { LOCALE_CHANGED_EVENT } from '../../i18n/locale.js?v=f2c3a78';
import { libraryLocale } from './tarotLibraryLocale.js?v=f2c3a78';
import { installDeckArtFallback, deckArtUrl, preloadDeckArt } from '../decks/deckArt.js?v=f2c3a78';
import { deckReachable, offlineUsage, readOfflineRecords, removeDeckOffline, saveDeckOffline } from '../decks/deckOffline.js?v=f2c3a78';
import { getTarotDeckDefinition } from '../decks/deckRegistry.js?v=f2c3a78';
import { TAROT_DECK_CHANGED_EVENT, applyTarotDeck } from '../decks/deckSelection.js?v=f2c3a78';
import { tarotLibraryCss } from './tarotLibraryCss.js?v=f2c3a78';
import { galleryMarkup, initialLibraryState, libraryDeck, libraryMarkup, resultCountText, visibleCards, } from './tarotLibraryScreen.js?v=f2c3a78';
import { tarotLibraryStrings } from './tarotLibraryStrings.js?v=f2c3a78';
/**
 * THE LIBRARY ON THE PAGE.
 *
 * One overlay, one state, one set of delegated events. It is loaded the first time somebody opens the library (the Tarot screen
 * imports only tarotLibraryEntry.ts, which is a few lines), so the pictures, the strings and this file cost nothing until then.
 *
 * It is built the way the application's other sheets are (astrologyBigThreeSheet.ts): a dialog above the whole screen,
 * Escape closes it, Tab stays inside it, navigating away closes it, and focus goes back to what opened it. It does not touch
 * browser history: the in-sheet Back button moves between its own screens, and the device's Back leaves the Tarot screen as it
 * always did.
 */
const ROOT_ID = 'tarot-library';
const STYLE_ID = 'tarot-library-style';
let active = null;
function readerText(module, paragraphs) {
    return {
        description: (cardId) => module.readerDescription(cardId, libraryLocale()),
        essence: (cardId) => module.readerEssence(cardId, libraryLocale()),
        question: (cardId) => module.readerQuestion(cardId, libraryLocale()),
        paragraphs,
    };
}
export function openTarotLibrary(view = 'encyclopedia', opener = null) {
    if (active !== null)
        active.close();
    installDeckArtFallback();
    if (!document.getElementById(STYLE_ID)) {
        const style = document.createElement('style');
        style.id = STYLE_ID;
        style.textContent = tarotLibraryCss();
        document.head.append(style);
    }
    const root = document.createElement('div');
    root.id = ROOT_ID;
    root.className = 'tl-root';
    root.setAttribute('role', 'dialog');
    root.setAttribute('aria-modal', 'true');
    root.setAttribute('aria-labelledby', 'tl-title');
    const sheet = document.createElement('div');
    sheet.className = 'tl-sheet';
    root.append(sheet);
    document.body.append(root);
    let state = { ...initialLibraryState(view), offline: { ...initialLibraryState().offline, records: readOfflineRecords() } };
    const scrolls = new Map();
    let closed = false;
    const scroller = () => sheet.querySelector('[data-tl-scroll]');
    /** Draws the current screen. `focus` puts the keyboard on the heading, the way a page change is announced. */
    function render(focus = true) {
        sheet.innerHTML = libraryMarkup(state);
        const body = scroller();
        const remembered = scrolls.get(state.view === 'card' ? `card` : state.view);
        if (body && remembered !== undefined && state.view !== 'card')
            body.scrollTop = remembered;
        if (focus) {
            const target = state.enlarged ? sheet.querySelector('.tl-zoom-close') : sheet.querySelector('#tl-title');
            target?.focus({ preventScroll: true });
        }
    }
    function go(next) {
        const body = scroller();
        if (body)
            scrolls.set(state.view === 'card' ? 'card' : state.view, body.scrollTop);
        state = { ...state, view: next, enlarged: false, message: null, ...(next === 'encyclopedia' ? { previewDeckId: null, cardId: null } : {}) };
        render();
        if (next === 'card')
            void ensureReader();
        if (next === 'decks' || next === 'preview')
            void refreshUsage();
    }
    async function ensureReader() {
        if (state.reader !== null)
            return;
        try {
            const [module, loader] = await Promise.all([
                import('../content/reader/tarotCardReader.js?v=f2c3a78'),
                import('../content/reader/readerDescriptionLoader.js?v=f2c3a78'),
            ]);
            if (closed)
                return;
            state = { ...state, reader: readerText(module, loader.readerParagraphs) };
            if (state.view === 'card') {
                const top = scroller()?.scrollTop ?? 0;
                render(false);
                const body = scroller();
                if (body)
                    body.scrollTop = top;
            }
        }
        catch { /* the page stands without the longer text */ }
    }
    async function refreshUsage() {
        const usage = await offlineUsage();
        if (closed)
            return;
        state = { ...state, offline: { ...state.offline, records: readOfflineRecords(), usageBytes: usage.savedBytes } };
        if (state.view === 'decks') {
            const top = scroller()?.scrollTop ?? 0;
            render(false);
            const body = scroller();
            if (body)
                body.scrollTop = top;
        }
    }
    function openCard(cardId, fromPreview) {
        const body = scroller();
        if (body && state.view === 'encyclopedia')
            scrolls.set('encyclopedia', body.scrollTop);
        state = { ...state, view: 'card', cardId, reversed: false, enlarged: false, previewDeckId: fromPreview, message: null };
        render();
        void ensureReader();
        warmNeighbours();
        const page = scroller();
        if (page)
            page.scrollTop = 0;
    }
    function warmNeighbours() {
        if (state.cardId === null)
            return;
        const ids = visibleCards(state.query, state.filter);
        const at = ids.indexOf(state.cardId);
        const deck = libraryDeck(state);
        const urls = [ids[at + 1], ids[at - 1]].filter((id) => id !== undefined)
            .map((id) => deckArtUrl(deck.deckId, 'm', id)).filter((url) => url !== null);
        preloadDeckArt(urls, { max: 2, limit: 1 });
    }
    function updateGallery() {
        const grid = sheet.querySelector('[data-tl-grid]');
        if (grid)
            grid.innerHTML = galleryMarkup(state);
        const count = sheet.querySelector('[data-tl-count]');
        if (count)
            count.textContent = resultCountText(state);
        sheet.querySelectorAll('[data-tl-filter]').forEach((chip) => chip.setAttribute('aria-pressed', chip.dataset.tlFilter === state.filter ? 'true' : 'false'));
    }
    function setOrientation(reversed) {
        state = { ...state, reversed };
        const page = sheet.querySelector('.tl-page');
        if (page)
            page.dataset.tlReversed = reversed ? 'true' : 'false';
        sheet.querySelectorAll('[data-tl-orient]').forEach((button) => button.setAttribute('aria-pressed', (button.dataset.tlOrient === 'reversed') === reversed ? 'true' : 'false'));
        const sections = sheet.querySelectorAll('.tl-section');
        const strings = tarotLibraryStrings();
        sections.forEach((section) => {
            const heading = section.querySelector('h3')?.textContent;
            if (heading === strings.upright)
                section.classList.toggle('is-active', !reversed);
            if (heading === strings.reversed)
                section.classList.toggle('is-active', reversed);
        });
    }
    function step(direction) {
        if (state.cardId === null)
            return;
        const ids = visibleCards(state.query, state.filter);
        const at = ids.indexOf(state.cardId);
        if (at < 0 || ids.length === 0)
            return;
        const next = ids[(at + direction + ids.length) % ids.length];
        state = { ...state, cardId: next, enlarged: false };
        render(false);
        sheet.querySelector('[data-tl-step="' + (direction > 0 ? '1' : '-1') + '"]')?.focus({ preventScroll: true });
        const body = scroller();
        if (body)
            body.scrollTop = 0;
        warmNeighbours();
    }
    async function saveOffline(deckId) {
        state = { ...state, offline: { ...state.offline, saving: { deckId, done: 0, total: 1 }, failed: null } };
        render(false);
        const ok = await saveDeckOffline(deckId, {
            withLarge: state.offline.withLarge,
            onProgress: (progress) => {
                if (closed)
                    return;
                state = { ...state, offline: { ...state.offline, saving: { deckId, done: progress.done, total: progress.total } } };
                const line = sheet.querySelector('.tl-section [role="status"]');
                if (line)
                    line.textContent = tarotLibraryStrings().offlineSaving(progress.done, progress.total);
            },
        });
        if (closed)
            return;
        state = { ...state, offline: { ...state.offline, saving: null, failed: ok ? null : deckId, records: readOfflineRecords() } };
        render(false);
        void refreshUsage();
    }
    async function apply(deckId) {
        const strings = tarotLibraryStrings();
        const wanted = getTarotDeckDefinition(deckId);
        if (wanted !== null && wanted.availabilityStatus === 'downloadable' && !(await deckReachable(deckId))) {
            if (closed)
                return;
            state = { ...state, message: strings.deckUnreachable(wanted.name) };
            render(false);
            return;
        }
        if (closed)
            return;
        const result = applyTarotDeck(deckId);
        const reading = getTarotDeckDefinition(result.selection.readingDeckId);
        state = { ...state, message: result.applied && result.readingsUnchanged && reading ? strings.readingsKeep(reading.name) : reading ? strings.readingsNow(reading.name) : null };
        render(false);
    }
    const onClick = (event) => {
        const target = event.target;
        if (!(target instanceof Element))
            return;
        const hit = (selector) => target.closest(selector);
        if (hit('[data-tl-unenlarge]')) {
            state = { ...state, enlarged: false };
            render(false);
            sheet.querySelector('[data-tl-enlarge]')?.focus({ preventScroll: true });
            return;
        }
        if (hit('[data-tl-close]')) {
            close();
            return;
        }
        const go_ = hit('[data-tl-go]');
        if (go_) {
            go(go_.dataset.tlGo);
            return;
        }
        const card = hit('[data-tl-card]');
        if (card?.dataset.tlCard) {
            openCard(card.dataset.tlCard, card.dataset.tlFromPreview ?? null);
            return;
        }
        const filter = hit('[data-tl-filter]');
        if (filter) {
            state = { ...state, filter: filter.dataset.tlFilter };
            updateGallery();
            return;
        }
        const stepper = hit('[data-tl-step]');
        if (stepper) {
            step(Number(stepper.dataset.tlStep));
            return;
        }
        const orient = hit('[data-tl-orient]');
        if (orient) {
            setOrientation(orient.dataset.tlOrient === 'reversed');
            return;
        }
        if (hit('[data-tl-enlarge]')) {
            state = { ...state, enlarged: true };
            render();
            return;
        }
        const preview = hit('[data-tl-preview]');
        if (preview?.dataset.tlPreview) {
            state = { ...state, previewDeckId: preview.dataset.tlPreview, view: 'preview', enlarged: false, message: null };
            render();
            void refreshUsage();
            return;
        }
        const applyButton = hit('[data-tl-apply]');
        if (applyButton?.dataset.tlApply && !applyButton.disabled) {
            void apply(applyButton.dataset.tlApply);
            return;
        }
        const save = hit('[data-tl-offline-save]');
        if (save?.dataset.tlOfflineSave) {
            void saveOffline(save.dataset.tlOfflineSave);
            return;
        }
        const remove = hit('[data-tl-offline-remove]');
        if (remove?.dataset.tlOfflineRemove) {
            void removeDeckOffline(remove.dataset.tlOfflineRemove).then(() => { if (!closed) {
                state = { ...state, offline: { ...state.offline, records: readOfflineRecords() } };
                render(false);
                void refreshUsage();
            } });
            return;
        }
    };
    const onInput = (event) => {
        const target = event.target;
        if (target instanceof HTMLInputElement && target.hasAttribute('data-tl-search')) {
            state = { ...state, query: target.value };
            updateGallery();
        }
    };
    const onChange = (event) => {
        const target = event.target;
        if (target instanceof HTMLInputElement && target.hasAttribute('data-tl-offline-large')) {
            state = { ...state, offline: { ...state.offline, withLarge: target.checked } };
            const top = scroller()?.scrollTop ?? 0;
            render(false);
            const body = scroller();
            if (body)
                body.scrollTop = top;
            sheet.querySelector('[data-tl-offline-large]')?.focus({ preventScroll: true });
        }
    };
    const onKeydown = (event) => {
        if (event.key === 'Escape') {
            event.preventDefault();
            if (state.enlarged) {
                state = { ...state, enlarged: false };
                render(false);
                return;
            }
            close();
            return;
        }
        if (event.key === 'Tab') {
            const stops = [...root.querySelectorAll('button:not([disabled]), input:not([disabled]), a[href], [tabindex="0"]')]
                .filter((element) => element.offsetParent !== null || element === document.activeElement);
            if (stops.length === 0)
                return;
            const first = stops[0];
            const last = stops[stops.length - 1];
            const current = document.activeElement;
            if (event.shiftKey && (current === first || !root.contains(current))) {
                event.preventDefault();
                last.focus();
            }
            else if (!event.shiftKey && (current === last || !root.contains(current))) {
                event.preventDefault();
                first.focus();
            }
        }
    };
    const onDeckChanged = () => { if (!closed && (state.view === 'encyclopedia' || state.view === 'card' || state.view === 'decks' || state.view === 'preview')) {
        const top = scroller()?.scrollTop ?? 0;
        render(false);
        const body = scroller();
        if (body)
            body.scrollTop = top;
    } };
    const onLocale = () => { state = { ...state, message: null }; onDeckChanged(); };
    const tarotSurface = document.getElementById('tarot-view');
    const surfaceWatcher = tarotSurface ? new MutationObserver(() => { if (tarotSurface.hidden)
        close(); }) : null;
    function close() {
        if (closed)
            return;
        closed = true;
        active = null;
        root.removeEventListener('click', onClick);
        root.removeEventListener('input', onInput);
        root.removeEventListener('change', onChange);
        root.removeEventListener('keydown', onKeydown);
        document.removeEventListener(TAROT_DECK_CHANGED_EVENT, onDeckChanged);
        document.removeEventListener(LOCALE_CHANGED_EVENT, onLocale);
        window.removeEventListener('popstate', close);
        window.removeEventListener('hashchange', close);
        surfaceWatcher?.disconnect();
        root.remove();
        if (opener?.isConnected)
            opener.focus({ preventScroll: true });
    }
    root.addEventListener('click', onClick);
    root.addEventListener('input', onInput);
    root.addEventListener('change', onChange);
    root.addEventListener('keydown', onKeydown);
    document.addEventListener(TAROT_DECK_CHANGED_EVENT, onDeckChanged);
    document.addEventListener(LOCALE_CHANGED_EVENT, onLocale);
    window.addEventListener('popstate', close);
    window.addEventListener('hashchange', close);
    if (tarotSurface && surfaceWatcher)
        surfaceWatcher.observe(tarotSurface, { attributes: true, attributeFilter: ['hidden'] });
    active = { close };
    render();
    if (view === 'decks' || view === 'preview')
        void refreshUsage();
    return { close };
}
export const closeTarotLibrary = () => { active?.close(); };
