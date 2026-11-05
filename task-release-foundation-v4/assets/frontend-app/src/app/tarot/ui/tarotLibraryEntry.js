import { escapeHtml } from '../../format.js?v=4cd804d';
import { libraryLocale } from './tarotLibraryLocale.js?v=4cd804d';
const LABELS = {
    en: { library: 'Tarot library', encyclopedia: 'Card Encyclopedia', decks: 'Choose a Deck' },
    sk: { library: 'Knižnica tarotu', encyclopedia: 'Encyklopédia kariet', decks: 'Vybrať balíček' },
};
/** Two quiet buttons under the opening screen's mode switch. */
export function tarotLibraryEntryMarkup() {
    const labels = LABELS[libraryLocale()];
    return `<ul class="tx-lib" aria-label="${escapeHtml(labels.library)}">
      <li><button type="button" class="tx-lib-btn" data-tx-lib-open="encyclopedia">${escapeHtml(labels.encyclopedia)}</button></li>
      <li><button type="button" class="tx-lib-btn" data-tx-lib-open="decks">${escapeHtml(labels.decks)}</button></li>
    </ul>`;
}
/** Loads the library on first use and opens it on a screen. A failed load leaves the Tarot screen as it was. */
export function openTarotLibraryFrom(view, opener) {
    void import('./tarotLibraryHost.js?v=4cd804d').then((host) => { host.openTarotLibrary(view, opener); }).catch(() => undefined);
}
