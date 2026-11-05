/*
 * WAYS INTO THE ENCYCLOPEDIA - markup only, no content, safe to import from the start-up graph.
 *
 * The pillar screens render one quiet capsule beside the way home ("Encyclopedia"). When it is tapped, the delegated listener
 * (src/encyclopediaEntry.ts) opens the library that belongs to the active destination and loads the reader the first time.
 * Nothing about the library is fetched before that tap.
 */
import { escapeAttribute, escapeHtml } from '../../format.js?v=4cd804d';
import { t } from '../../i18n/uiStrings.js?v=4cd804d';
/** Which library a destination opens. Forecast and Connections have no library of their own: they open the shelf of all six. */
const LIBRARY_FOR_STOP = {
    'western-astrology': 'astrology',
    numerology: 'numerology',
    'human-design': 'human-design',
    'bazi-tcm': 'bazi',
    tarot: 'tarot',
    'cross-pillar-synthesis': 'synthesis',
    forecast: 'home',
    connections: 'home',
};
export const libraryForStop = (stopId) => LIBRARY_FOR_STOP[stopId] ?? null;
/**
 * The capsule a module's strip carries. Not a `.kt-nav-stop`: it is not a destination of the strip, it opens a reference.
 *
 * THE SAME MARKUP ON EVERY MODULE. The strip is one strip, rendered by one function for every module, and it must not change
 * between them (frontendPremiumEarthPillarNavigation.test.mjs). So the capsule does not carry its library: it says "current", and
 * the door resolves the library from the destination that is active when it is tapped (libraryForStop, above).
 */
export function encyclopediaCapsuleMarkup(stopId) {
    if (!libraryForStop(stopId))
        return '';
    return `<button class="kt-pillar-nav-button kt-nav-library" type="button" data-encyclopedia-open="current" aria-label="${escapeAttribute(t('encyclopedia.capsule.aria'))}">`
        + '<span class="kt-nav-library-mark" aria-hidden="true"><svg viewBox="0 0 16 16" width="13" height="13" fill="none" stroke="currentColor" stroke-width="1.3" stroke-linecap="round" stroke-linejoin="round"><path d="M2.5 3.2c1.9-.7 3.8-.5 5.5.8 1.7-1.3 3.6-1.5 5.5-.8v9.4c-1.9-.7-3.8-.5-5.5.8-1.7-1.3-3.6-1.5-5.5-.8z"/><path d="M8 4v9.4"/></svg></span>'
        + `<span class="kt-pillar-nav-label">${escapeHtml(t('encyclopedia.capsule'))}</span></button>`;
}
