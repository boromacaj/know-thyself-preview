import { escapeHtml } from '../../format.js?v=f2c3a78';
import { libraryLocale } from './tarotLibraryLocale.js?v=f2c3a78';
import { TAROT_TITLE_LEXICON_EN, TAROT_TITLE_LEXICON_SK, buildTarotCardTitles } from '../content/tarotCardTitles.js?v=f2c3a78';
import { tarotCardDetailText } from '../content/detail/tarotCardDetail.js?v=f2c3a78';
import { TAROT_DECK, getTarotCard } from '../data/tarotDeck.js?v=f2c3a78';
import { deckArtMarkup, deckArtUrl, deckCoverUrl } from '../decks/deckArt.js?v=f2c3a78';
import { formatMegabytes, tarotLibraryStrings } from './tarotLibraryStrings.js?v=f2c3a78';
import { offlineCostBytes, offlineSupported } from '../decks/deckOffline.js?v=f2c3a78';
import { deckCardMapping, deckClassLabel, isReadingCompatibleDeck, listShownTarotDecks, } from '../decks/deckRegistry.js?v=f2c3a78';
import { readTarotDeckSelection } from '../decks/deckSelection.js?v=f2c3a78';
import { romanNumeral } from './tarotExperienceScreen.js?v=f2c3a78';
/**
 * THE LIBRARY'S SCREENS, AS STRINGS OF HTML.
 *
 * Pure functions of a small state: no DOM, no network, so the tests can render every screen and read what it says. The
 * host (tarotLibraryHost.ts) puts them on the page, wires the events and keeps the one search box from being re-rendered.
 *
 * Nothing here is new content. A card's words come from the layers the readings already use (content/detail, content/reader);
 * a card with no entry in a layer simply shows no section for it. The library never writes a meaning to fill a gap.
 */
/** A chevron drawn as a shape, so it is a picture and not a character a translator or an audit would have to read. */
const chevron = (direction) => `<svg class="tl-chevron" viewBox="0 0 24 24" width="22" height="22" aria-hidden="true" focusable="false"><path d="${direction === 'left' ? 'M15 5l-7 7 7 7' : 'M9 5l7 7-7 7'}" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>`;
export const LIBRARY_FILTERS = ['all', 'major', 'wands', 'cups', 'swords', 'pentacles'];
export const initialLibraryState = (view = 'encyclopedia') => ({
    view, query: '', filter: 'all', cardId: null, reversed: false, enlarged: false, previewDeckId: null, reader: null, message: null,
    offline: { records: {}, saving: null, failed: null, withLarge: false, usageBytes: 0 },
});
/* --------------------------------------------------------------- the cards -- */
export const cardTitles = () => buildTarotCardTitles(libraryLocale() === 'sk' ? TAROT_TITLE_LEXICON_SK : TAROT_TITLE_LEXICON_EN);
/** Lower-case, no accents, so "kralovna" finds "Kráľovná" and "pages" finds "Page of Wands". */
export const foldForSearch = (text) => text.normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase().trim();
const matchesFilter = (cardId, filter) => {
    if (filter === 'all')
        return true;
    const card = getTarotCard(cardId);
    if (card === null)
        return false;
    return filter === 'major' ? card.arcana === 'major' : card.suit === filter;
};
/** The canonical cards a search and a filter leave, in canonical order. Searches the card's name in the active language and in English. */
export function visibleCards(query, filter) {
    const titles = cardTitles();
    const needle = foldForSearch(query);
    return TAROT_DECK.filter((card) => {
        if (!matchesFilter(card.id, filter))
            return false;
        if (needle === '')
            return true;
        const haystack = `${foldForSearch(titles[card.id] ?? '')} ${foldForSearch(card.canonicalName)}`;
        return needle.split(/\s+/).every((word) => haystack.includes(word));
    }).map((card) => card.id);
}
const numeralFor = (cardId) => {
    const card = getTarotCard(cardId);
    return card?.arcana === 'major' && card.majorNumber !== undefined ? romanNumeral(card.majorNumber) : '';
};
/* ------------------------------------------------------------ encyclopedia -- */
function galleryTile(cardId, deck, titles, strings, index) {
    const title = titles[cardId] ?? cardId;
    const has = deckCardMapping(deck, cardId) !== null;
    /* The first row of pictures is fetched at once, every other is lazy. */
    const art = has ? deckArtMarkup(deck.deckId, cardId, { tier: 't', eager: index < 6, className: 'tl-art' }) : '';
    const numeral = numeralFor(cardId);
    return `<li class="tl-cell"><button type="button" class="tl-card${has ? '' : ' is-missing'}" data-tl-card="${escapeHtml(cardId)}" aria-label="${escapeHtml(has ? title : `${title}. ${strings.missingInDeck}`)}">
      <span class="tl-frame" style="aspect-ratio:${deck.cardAspect}">${art}${has ? '' : `<span class="tl-missing" aria-hidden="true">${escapeHtml(strings.missingInDeck)}</span>`}</span>
      <span class="tl-name" aria-hidden="true">${numeral ? `<span class="tl-num">${escapeHtml(numeral)}</span> ` : ''}${escapeHtml(title)}</span>
    </button></li>`;
}
export function galleryMarkup(state) {
    const strings = tarotLibraryStrings();
    const deck = shownDeckForLibrary();
    const titles = cardTitles();
    const ids = visibleCards(state.query, state.filter);
    if (ids.length === 0)
        return `<li class="tl-empty" role="status">${escapeHtml(strings.noResults)}</li>`;
    return ids.map((id, index) => galleryTile(id, deck, titles, strings, index)).join('');
}
export const resultCountText = (state) => tarotLibraryStrings().results(visibleCards(state.query, state.filter).length, TAROT_DECK.length);
const filterChips = (state, strings) => `<div class="tl-chips" role="group" aria-label="${escapeHtml(strings.filterLabel)}">${LIBRARY_FILTERS.map((filter) => `<button type="button" class="tl-chip" data-tl-filter="${filter}" aria-pressed="${state.filter === filter ? 'true' : 'false'}">${escapeHtml(strings.filters[filter])}</button>`).join('')}</div>`;
export function libraryDeck(state) {
    if (state.previewDeckId !== null) {
        const previewed = listShownTarotDecks().find((deck) => deck.deckId === state.previewDeckId);
        if (previewed)
            return previewed;
    }
    return shownDeckForLibrary();
}
export function shownDeckForLibrary() {
    const selection = readTarotDeckSelection();
    return listShownTarotDecks().find((deck) => deck.deckId === selection.shownDeckId) ?? listShownTarotDecks()[0];
}
function deckChip(deck, strings) {
    const cover = deckCoverUrl(deck.deckId);
    return `<button type="button" class="tl-deckchip" data-tl-go="decks" aria-label="${escapeHtml(`${strings.decks}: ${deck.name}`)}">
      ${cover ? `<img class="tl-deckchip-img" src="${escapeHtml(cover)}" alt="" draggable="false" decoding="async">` : ''}
      <span class="tl-deckchip-text"><span class="tl-deckchip-kicker">${escapeHtml(strings.chooseDeck)}</span><span class="tl-deckchip-name">${escapeHtml(deck.name)}</span></span>
    </button>`;
}
export function encyclopediaMarkup(state) {
    const strings = tarotLibraryStrings();
    const deck = shownDeckForLibrary();
    return `<header class="tl-head">
      <span class="tl-spacer" aria-hidden="true"></span>
      <h2 id="tl-title" class="tl-title" tabindex="-1">${escapeHtml(strings.encyclopedia)}</h2>
      <button type="button" class="tl-icon" data-tl-close aria-label="${escapeHtml(strings.close)}"><span aria-hidden="true">&times;</span></button>
    </header>
    <div class="tl-body" data-tl-scroll>
      <div class="tl-tools">
        ${deckChip(deck, strings)}
        <label class="tl-search"><span class="tl-visually-hidden">${escapeHtml(strings.search)}</span>
          <input type="search" class="tl-input" data-tl-search value="${escapeHtml(state.query)}" placeholder="${escapeHtml(strings.searchPlaceholder)}" autocomplete="off" autocapitalize="off" spellcheck="false" enterkeyhint="search">
        </label>
        ${filterChips(state, strings)}
        <p class="tl-count" data-tl-count role="status" aria-live="polite">${escapeHtml(resultCountText(state))}</p>
      </div>
      <ul class="tl-grid" data-tl-grid>${galleryMarkup(state)}</ul>
    </div>`;
}
/* -------------------------------------------------------------- card page -- */
export function cardNote(deck, cardId, strings) {
    const mapping = deckCardMapping(deck, cardId);
    const canonicalNumeral = numeralFor(cardId);
    if (mapping === null)
        return { kind: 'missing', text: strings.noteMissing(deck.name), printed: '' };
    const printed = mapping.nativeNumber !== undefined && mapping.nativeNumber !== canonicalNumeral && mapping.nativeNumber !== '' ? strings.printedAs(mapping.nativeNumber) : '';
    if (mapping.relation === 'positional')
        return { kind: 'positional', text: strings.notePositional(deck.name, mapping.nativeNumber ?? ''), printed: '' };
    if (!isReadingCompatibleDeck(deck))
        return { kind: 'historical', text: strings.noteHistorical(deck.name), printed };
    return { kind: 'none', text: '', printed };
}
export function cardPageMarkup(state) {
    const strings = tarotLibraryStrings();
    const deck = libraryDeck(state);
    const cardId = state.cardId;
    const card = cardId === null ? null : getTarotCard(cardId);
    if (cardId === null || card === null)
        return encyclopediaMarkup(state);
    const titles = cardTitles();
    const title = titles[cardId] ?? cardId;
    const ids = visibleCards(state.query, state.filter);
    const position = ids.indexOf(cardId);
    const note = cardNote(deck, cardId, strings);
    const has = deckCardMapping(deck, cardId) !== null;
    const art = has ? deckArtMarkup(deck.deckId, cardId, { tier: 'm', eager: true, reversed: state.reversed, className: 'tl-hero-art' }) : '';
    const reader = state.reader;
    const upright = tarotCardDetailText(cardId, 'upright', libraryLocale());
    const reversed = tarotCardDetailText(cardId, 'reversed', libraryLocale());
    const description = reader?.description(cardId) ?? null;
    const essence = reader?.essence(cardId) ?? null;
    const question = reader?.question(cardId) ?? null;
    const section = (heading, body, active = false) => body === '' ? '' : `<section class="tl-section${active ? ' is-active' : ''}"><h3>${escapeHtml(heading)}</h3>${body}</section>`;
    const paragraphs = (text) => text === null ? '' : (reader?.paragraphs(text) ?? [text]).map((part) => `<p>${escapeHtml(part)}</p>`).join('');
    const kicker = card.arcana === 'major' ? `${numeralFor(cardId)} · ${strings.filters.major}` : strings.filters[card.suit ?? 'wands'];
    const nav = position >= 0 && ids.length > 1
        ? `<nav class="tl-pager" aria-label="${escapeHtml(strings.cardOf(position + 1, ids.length))}">
        <button type="button" class="tl-icon" data-tl-step="-1" aria-label="${escapeHtml(strings.previous)}">${chevron('left')}</button>
        <span class="tl-pager-text" aria-hidden="true">${escapeHtml(strings.cardOf(position + 1, ids.length))}</span>
        <button type="button" class="tl-icon" data-tl-step="1" aria-label="${escapeHtml(strings.next)}">${chevron('right')}</button>
      </nav>` : '';
    const frame = has
        ? `<button type="button" class="tl-hero" data-tl-enlarge aria-label="${escapeHtml(strings.enlarge)}" style="aspect-ratio:${deck.cardAspect}">${art}</button>`
        : `<div class="tl-hero is-missing" style="aspect-ratio:${deck.cardAspect}"><span class="tl-missing">${escapeHtml(strings.missingInDeck)}</span></div>`;
    return `<header class="tl-head">
      <button type="button" class="tl-icon" data-tl-go="${state.previewDeckId !== null ? 'preview' : 'encyclopedia'}" aria-label="${escapeHtml(strings.back)}">${chevron('left')}</button>
      <h2 id="tl-title" class="tl-title" tabindex="-1">${escapeHtml(title)}</h2>
      <button type="button" class="tl-icon" data-tl-close aria-label="${escapeHtml(strings.close)}"><span aria-hidden="true">&times;</span></button>
    </header>
    <div class="tl-body" data-tl-scroll>
      <div class="tl-page" data-tl-reversed="${state.reversed ? 'true' : 'false'}">
        <p class="tl-kicker">${escapeHtml(kicker)}</p>
        ${frame}
        ${nav}
        <div class="tl-seg" role="group" aria-label="${escapeHtml(strings.orientationLabel)}">
          <button type="button" class="tl-segbtn" data-tl-orient="upright" aria-pressed="${state.reversed ? 'false' : 'true'}">${escapeHtml(strings.upright)}</button>
          <button type="button" class="tl-segbtn" data-tl-orient="reversed" aria-pressed="${state.reversed ? 'true' : 'false'}">${escapeHtml(strings.reversed)}</button>
        </div>
        ${note.text !== '' ? `<p class="tl-note is-${note.kind}" role="note">${escapeHtml(note.text)}</p>` : ''}
        ${note.printed !== '' ? `<p class="tl-printed">${escapeHtml(note.printed)}</p>` : ''}
        ${essence !== null ? `<p class="tl-essence">${escapeHtml(essence)}</p>` : ''}
        ${section(strings.upright, upright === null ? '' : `<p>${escapeHtml(upright)}</p>`, !state.reversed)}
        ${section(strings.reversed, reversed === null ? '' : `<p>${escapeHtml(reversed)}</p>`, state.reversed)}
        ${section(strings.aboutCard, paragraphs(description))}
        ${section(strings.questionTitle, question === null ? '' : `<p>${escapeHtml(question)}</p>`)}
        <p class="tl-credit"><button type="button" class="tl-link" data-tl-preview="${escapeHtml(deck.deckId)}">${escapeHtml(strings.deckCredit)}: ${escapeHtml(deck.name)}</button></p>
      </div>
    </div>
    ${state.enlarged && has ? enlargedMarkup(deck, cardId, title, state.reversed, strings) : ''}`;
}
function enlargedMarkup(deck, cardId, title, reversed, strings) {
    const url = deckArtUrl(deck.deckId, 'l', cardId);
    if (url === null)
        return '';
    const smaller = deckArtUrl(deck.deckId, 'm', cardId);
    return `<div class="tl-zoom" role="dialog" aria-modal="true" aria-label="${escapeHtml(title)}" data-tl-zoom>
      <button type="button" class="tl-zoom-close" data-tl-unenlarge aria-label="${escapeHtml(strings.closeEnlarged)}"><span aria-hidden="true">&times;</span></button>
      <img class="tl-zoom-img"${smaller !== null && smaller !== url ? ` data-kt-art-fallback="${escapeHtml(smaller)}"` : ''} data-kt-art="${escapeHtml(deck.deckId)}" data-kt-art-card="${escapeHtml(cardId)}"${reversed ? ' data-kt-art-reversed' : ''} src="${escapeHtml(url)}" alt="${escapeHtml(title)}" draggable="false" decoding="async">
    </div>`;
}
/* --------------------------------------------------------------- the decks -- */
function badge(text, kind = '') {
    return `<span class="tl-badge${kind ? ` is-${kind}` : ''}">${escapeHtml(text)}</span>`;
}
function deckBadges(deck, strings) {
    return [
        badge(isReadingCompatibleDeck(deck) ? strings.badgeReadings : strings.badgeEncyclopedia, isReadingCompatibleDeck(deck) ? 'readings' : 'encyclopedia'),
        badge(strings.deckFree, 'free'),
        badge(strings.classLabel[deckClassLabel(deck.deckClass)], deck.deckClass === 'A' ? 'full' : 'history'),
        badge(strings.cardsCount(deck.cardCount, TAROT_DECK.length)),
        deck.supportedOrientations.length === 2 ? badge(strings.orientationsBoth) : '',
    ].join('');
}
export function decksMarkup(state) {
    const strings = tarotLibraryStrings();
    const selection = readTarotDeckSelection();
    const decks = listShownTarotDecks();
    const itemFor = (deck) => {
        const selected = deck.deckId === selection.shownDeckId;
        const cover = deckCoverUrl(deck.deckId);
        const compatible = isReadingCompatibleDeck(deck);
        const description = libraryLocale() === 'sk' && deck.description.sk ? deck.description.sk : deck.description.en;
        return `<li class="tl-deck${selected ? ' is-selected' : ''}" data-tl-deck="${escapeHtml(deck.deckId)}"${selected ? ' aria-current="true"' : ''}>
        <button type="button" class="tl-deck-cover" data-tl-preview="${escapeHtml(deck.deckId)}" aria-label="${escapeHtml(selected ? strings.deckSelectedAria(deck.name) : `${strings.preview}: ${deck.name}`)}" style="aspect-ratio:${deck.cover.aspect}">
          ${cover ? `<img class="tl-art" src="${escapeHtml(cover)}" alt="" draggable="false" decoding="async" loading="lazy" data-kt-art="${escapeHtml(deck.deckId)}" data-kt-art-card="cover">` : ''}
          ${selected ? `<span class="tl-tick" aria-hidden="true">✓</span>` : ''}
        </button>
        <div class="tl-deck-main">
          <h3 class="tl-deck-name">${escapeHtml(deck.name)}</h3>
          <p class="tl-deck-meta">${escapeHtml(deck.author)} · ${escapeHtml(deck.period)}</p>
          <p class="tl-badges">${deckBadges(deck, strings)}${selected ? badge(strings.deckSelected, 'selected') : ''}</p>
          <p class="tl-deck-desc">${escapeHtml(description)}</p>
          <p class="tl-deck-actions">
            <button type="button" class="tl-btn" data-tl-preview="${escapeHtml(deck.deckId)}">${escapeHtml(strings.preview)}</button>
            <button type="button" class="tl-btn is-primary" data-tl-apply="${escapeHtml(deck.deckId)}"${selected ? ' disabled' : ''}>${escapeHtml(selected ? strings.applied : compatible ? strings.apply : strings.applyEncyclopedia)}</button>
          </p>
        </div>
      </li>`;
    };
    const section = (title, hint, members) => members.length === 0 ? '' :
        `<section class="tl-group"><h3 class="tl-group-title">${escapeHtml(title)}</h3><p class="tl-group-hint">${escapeHtml(hint)}</p><ul class="tl-decks">${members.map(itemFor).join('')}</ul></section>`;
    const items = section(strings.sectionReadingTitle, strings.sectionReadingHint, decks.filter(isReadingCompatibleDeck))
        + section(strings.sectionEncyclopediaTitle, strings.sectionEncyclopediaHint, decks.filter((deck) => !isReadingCompatibleDeck(deck)));
    const readingDeck = decks.find((deck) => deck.deckId === selection.readingDeckId);
    return `<header class="tl-head">
      <button type="button" class="tl-icon" data-tl-go="encyclopedia" aria-label="${escapeHtml(strings.back)}">${chevron('left')}</button>
      <h2 id="tl-title" class="tl-title" tabindex="-1">${escapeHtml(strings.decks)}</h2>
      <button type="button" class="tl-icon" data-tl-close aria-label="${escapeHtml(strings.close)}"><span aria-hidden="true">&times;</span></button>
    </header>
    <div class="tl-body" data-tl-scroll>
      <p class="tl-intro">${escapeHtml(strings.libraryIntro)}</p>
      <p class="tl-note is-none" role="status">${escapeHtml(state.message ?? (readingDeck ? strings.readingsNow(readingDeck.name) : ''))}</p>
      ${items}
      ${state.offline.usageBytes > 0 ? `<p class="tl-printed">${escapeHtml(strings.offlineUsed(formatMegabytes(state.offline.usageBytes)))}</p>` : ''}
    </div>`;
}
/* ----------------------------------------------------------------- preview -- */
function offlineBlock(deck, state, strings) {
    if (deck.availabilityStatus === 'bundled')
        return `<p class="tl-printed">${escapeHtml(strings.offlineBundled)}</p>`;
    if (!offlineSupported())
        return `<p class="tl-printed">${escapeHtml(strings.offlineUnsupported)}</p>`;
    const record = state.offline.records[deck.deckId];
    const saving = state.offline.saving?.deckId === deck.deckId ? state.offline.saving : null;
    if (saving)
        return `<p class="tl-printed" role="status">${escapeHtml(strings.offlineSaving(saving.done, saving.total))}</p>`;
    if (record) {
        return `<p class="tl-printed" role="status">${escapeHtml(strings.offlineSaved(formatMegabytes(record.bytes)))}</p>
      <p><button type="button" class="tl-btn" data-tl-offline-remove="${escapeHtml(deck.deckId)}">${escapeHtml(strings.offlineRemove)}</button></p>`;
    }
    const hasLarge = deck.assetManifest.tiers.l;
    return `${state.offline.failed === deck.deckId ? `<p class="tl-note is-missing" role="alert">${escapeHtml(strings.offlineFailed)}</p>` : ''}
    ${hasLarge ? `<label class="tl-check"><input type="checkbox" data-tl-offline-large${state.offline.withLarge ? ' checked' : ''}> <span>${escapeHtml(strings.offlineIncludeLarge(formatMegabytes(deck.assetManifest.bytes.l)))}</span></label>` : ''}
    <p><button type="button" class="tl-btn" data-tl-offline-save="${escapeHtml(deck.deckId)}">${escapeHtml(strings.offlineSave(formatMegabytes(offlineCostBytes(deck, state.offline.withLarge))))}</button></p>`;
}
export function previewMarkup(state) {
    const strings = tarotLibraryStrings();
    const deck = listShownTarotDecks().find((entry) => entry.deckId === state.previewDeckId) ?? shownDeckForLibrary();
    const selection = readTarotDeckSelection();
    const selected = deck.deckId === selection.shownDeckId;
    const compatible = isReadingCompatibleDeck(deck);
    const titles = cardTitles();
    const cover = deckCoverUrl(deck.deckId);
    const description = libraryLocale() === 'sk' && deck.description.sk ? deck.description.sk : deck.description.en;
    const note = deck.note ? (libraryLocale() === 'sk' && deck.note.sk ? deck.note.sk : deck.note.en) : '';
    const strip = deck.previewCards.filter((id) => deckCardMapping(deck, id) !== null).map((id, index) => `<li class="tl-strip-item"><button type="button" class="tl-card" data-tl-card="${escapeHtml(id)}" data-tl-from-preview="${escapeHtml(deck.deckId)}" aria-label="${escapeHtml(titles[id] ?? id)}">
        <span class="tl-frame" style="aspect-ratio:${deck.cardAspect}">${deckArtMarkup(deck.deckId, id, { tier: 'm', eager: index < 2, className: 'tl-art' })}</span>
        <span class="tl-name" aria-hidden="true">${escapeHtml(titles[id] ?? id)}</span></button></li>`).join('');
    return `<header class="tl-head">
      <button type="button" class="tl-icon" data-tl-go="decks" aria-label="${escapeHtml(strings.back)}">${chevron('left')}</button>
      <h2 id="tl-title" class="tl-title" tabindex="-1">${escapeHtml(deck.name)}</h2>
      <button type="button" class="tl-icon" data-tl-close aria-label="${escapeHtml(strings.close)}"><span aria-hidden="true">&times;</span></button>
    </header>
    <div class="tl-body" data-tl-scroll>
      <div class="tl-page">
        ${cover ? `<div class="tl-hero tl-cover" style="aspect-ratio:${deck.cover.aspect}"><img class="tl-hero-art" src="${escapeHtml(cover)}" alt="" draggable="false" decoding="async" data-kt-art="${escapeHtml(deck.deckId)}" data-kt-art-card="cover"></div>` : ''}
        <p class="tl-deck-meta">${escapeHtml(deck.author)} · ${escapeHtml(deck.period)}</p>
        <p class="tl-badges">${deckBadges(deck, strings)}${selected ? badge(strings.deckSelected, 'selected') : ''}</p>
        <p class="tl-deck-desc">${escapeHtml(description)}</p>
        ${note !== '' ? `<p class="tl-note is-${compatible ? 'none' : 'historical'}" role="note">${escapeHtml(note)}</p>` : ''}
        <p class="tl-printed">${escapeHtml(compatible ? strings.deckForReadings : strings.deckPictureOnly)}</p>
        <p class="tl-deck-actions"><button type="button" class="tl-btn is-primary" data-tl-apply="${escapeHtml(deck.deckId)}"${selected ? ' disabled' : ''}>${escapeHtml(selected ? strings.applied : compatible ? strings.apply : strings.applyEncyclopedia)}</button></p>
        <section class="tl-section"><h3>${escapeHtml(strings.previewCards)}</h3><ul class="tl-strip">${strip}</ul></section>
        <section class="tl-section"><h3>${escapeHtml(strings.offlineTitle)}</h3>${offlineBlock(deck, state, strings)}</section>
        <section class="tl-section tl-credits"><h3>${escapeHtml(strings.aboutDeck)}</h3>
          <dl>
            <dt>${escapeHtml(strings.licence)}</dt><dd>${deck.license.url ? `<a href="${escapeHtml(deck.license.url)}" target="_blank" rel="noopener noreferrer">${escapeHtml(deck.license.name)}</a>` : escapeHtml(deck.license.name)}</dd>
            <dt>${escapeHtml(strings.attribution)}</dt><dd>${escapeHtml(deck.attribution.credit)}${deck.attribution.note ? ` ${escapeHtml(deck.attribution.note)}` : ''}</dd>
            <dt>${escapeHtml(strings.source)}</dt><dd><a href="${escapeHtml(deck.attribution.sourceUrl)}" target="_blank" rel="noopener noreferrer">${escapeHtml(deck.attribution.sourceName)}</a></dd>
          </dl>
        </section>
      </div>
    </div>`;
}
export function libraryMarkup(state) {
    switch (state.view) {
        case 'card': return cardPageMarkup(state);
        case 'decks': return decksMarkup(state);
        case 'preview': return previewMarkup(state);
        default: return encyclopediaMarkup(state);
    }
}
