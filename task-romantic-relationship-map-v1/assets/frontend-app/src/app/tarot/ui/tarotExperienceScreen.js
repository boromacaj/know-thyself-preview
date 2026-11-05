import { escapeHtml } from '../../format.js';
import { pickLocalized } from '../../i18n/locale.js';
import { tarotCardDetailText } from '../content/detail/tarotCardDetail.js';
import { loadedReaderDescription, readerParagraphs } from '../content/reader/readerDescriptionLoader.js';
import { getTarotCard } from '../data/tarotDeck.js';
import { nextTarotRole, positionAvailability, tarotSessionPhase, } from '../tarotDrawSession.js';
import { TAROT_POSITIONS } from '../tarotTypes.js';
import { HERO_DECK_CARDS } from './tarotHero.js';
import { tarotSigilMarkup } from './tarotSigil.js';
import { focusCells } from './tarotDeckFocus.js';
import { guidedBundle } from '../guided/guidedRuntime.js';
import { modeSwitchMarkup, tarotGuidedStrings } from './tarotGuidedScreen.js';
const EN = {
    title: 'Tarot',
    begin: 'Shuffle cards',
    choosing: (role) => `Choose your ${role} card`,
    heroPick: (role) => `Pick your ${role} card`,
    decideFirst: 'Decide about the card that jumped before choosing from the deck.',
    roleName: { energy: 'Energy', factor: 'Factor', guidance: 'Guidance' },
    roleFor: { energy: 'Energy', factor: 'Factor', guidance: 'Guidance' },
    positionLabel: (position) => `Hidden card, position ${position}`,
    chosenLabel: (position, role) => `Position ${position}, chosen as ${role}`,
    unavailableLabel: (position) => `Position ${position}, not available`,
    deckLabel: 'The shuffled deck, 78 face-down cards',
    deckHint: 'The numbers reshuffle with every draw. They only mark places in this deck - they are not tied to any particular card.',
    pickStep: (step, total) => `Pick card ${step} of ${total}`,
    pickCard: (position) => `Select card ${position}`,
    pickTaken: (position) => `Card ${position} is already chosen`,
    pickGone: (position) => `Card ${position} is not available`,
    jumperHeading: 'A card jumped out',
    jumperBody: 'One card left the deck while it was being shuffled. You can keep it as extra '
        + 'context for the reading, or set it aside.',
    jumperAccept: 'Keep it',
    jumperReject: 'Set it aside',
    jumperAccepted: 'The card that jumped stays in play.',
    jumperRejected: 'The card that jumped is set aside. It adds nothing to the reading.',
    reversed: 'Reversed',
    upright: 'Upright',
    cardAria: (title, orientation) => (orientation === 'reversed' ? `${title}, reversed` : `${title}, upright`),
    spreadLabel: 'Your three cards',
    readingHeading: 'Your reading',
    fullReading: 'Read it in full',
    drawAgain: 'Draw again',
    backToToday: "Back to today's draw",
    todayBadge: "Today's draw",
    practiceBadge: 'Practice draw · not saved',
    practiceNote: 'A practice draw is not kept: reload the page and today\'s draw is back.',
    unavailable: 'The draw is unavailable: this device has no cryptographically secure random source, '
        + 'and the deck will not be shuffled with a predictable one.',
    shakeEnable: 'Shake your phone',
    shakeOn: 'Shake your phone',
    shakeOrTap: 'Or tap to shuffle',
    shakeUnavailable: 'Motion access unavailable',
    shakeDetected: 'Shake detected',
    shuffling: 'Shuffling the deck',
    chooseCard: 'Choose your card',
    cardOpen: 'Open card details',
    detailClose: 'Close',
    heroShake: 'Shake your phone to shuffle the cards',
    heroTap: 'Tap the deck to shuffle the cards',
    heroDeck: 'Shuffle the cards',
};
const SK = {
    title: 'Tarot',
    begin: 'Zamiešať a začať',
    choosing: (role) => `Vyber kartu pre ${role}`,
    heroPick: (role) => `Vyber kartu pre ${role}`,
    decideFirst: 'Najprv sa rozhodni o karte, ktorá vyskočila, potom vyberaj z balíčka.',
    roleName: { energy: 'Energia', factor: 'Faktor', guidance: 'Nasmerovanie' },
    roleFor: { energy: 'Energiu', factor: 'Faktor', guidance: 'Nasmerovanie' },
    positionLabel: (position) => `Skrytá karta, pozícia ${position}`,
    chosenLabel: (position, role) => `Pozícia ${position}, vybraná pre ${role}`,
    unavailableLabel: (position) => `Pozícia ${position}, nedostupná`,
    deckLabel: 'Premiešaný balíček, 78 kariet rubom nahor',
    deckHint: 'Čísla sa s každým vyložením premiešajú. Označujú len miesta v tomto balíčku - nie sú viazané na žiadnu konkrétnu kartu.',
    pickStep: (step, total) => `Vyber kartu ${step} z ${total}`,
    pickCard: (position) => `Vybrať kartu ${position}`,
    pickTaken: (position) => `Karta ${position} je už vybraná`,
    pickGone: (position) => `Karta ${position} nie je dostupná`,
    jumperHeading: 'Jedna karta vyskočila',
    jumperBody: 'Počas miešania vypadla z balíčka jedna karta. Môžeš si ju nechať ako kontext '
        + 'k čítaniu, alebo ju odložiť.',
    jumperAccept: 'Nechať v hre',
    jumperReject: 'Odložiť',
    jumperAccepted: 'Karta, ktorá vyskočila, zostáva v hre.',
    jumperRejected: 'Karta, ktorá vyskočila, je odložená. K čítaniu nepridáva nič.',
    reversed: 'Obrátená',
    upright: 'Základná poloha',
    cardAria: (title, orientation) => (orientation === 'reversed' ? `${title}, obrátená` : `${title}, v základnej polohe`),
    spreadLabel: 'Tvoje tri karty',
    readingHeading: 'Tvoje čítanie',
    fullReading: 'Prečítať celé',
    drawAgain: 'Vyložiť znova',
    backToToday: 'Späť na dnešné vyloženie',
    todayBadge: 'Dnešné vyloženie',
    practiceBadge: 'Skúšobné vyloženie · neuloží sa',
    practiceNote: 'Skúšobné vyloženie sa neuchová: po načítaní stránky sa vráti dnešné vyloženie.',
    unavailable: 'Vyloženie nie je dostupné: toto zariadenie nemá kryptograficky bezpečný zdroj '
        + 'náhodnosti a balíček sa nebude miešať predvídateľným.',
    shakeEnable: 'Zapnúť zamiešanie trasením',
    shakeOn: 'Zatrias telefónom a zamiešaj',
    shakeOrTap: 'Alebo zamiešaj dotykom',
    shakeUnavailable: 'Pohybový senzor nie je dostupný',
    shakeDetected: 'Zamiešané',
    shuffling: 'Miešam balíček',
    chooseCard: 'Vyber kartu',
    cardOpen: 'Otvoriť detail karty',
    detailClose: 'Zavrieť',
    heroShake: 'Zatras telefónom a zamiešaj karty',
    heroTap: 'Ťukni na balíček a zamiešaj karty',
    heroDeck: 'Zamiešať karty',
};
export const tarotExperienceStrings = () => pickLocalized({ en: EN, sk: SK });
/* ------------------------------------------------------------- card faces -- */
const ROMAN = [
    [10, 'X'], [9, 'IX'], [5, 'V'], [4, 'IV'], [1, 'I'],
];
/** 0-21 in Roman numerals; the Fool is 0. */
export function romanNumeral(value) {
    if (value === 0)
        return '0';
    let rest = value;
    let out = '';
    for (const [size, glyph] of ROMAN) {
        while (rest >= size) {
            out += glyph;
            rest -= size;
        }
    }
    return out;
}
const RANK_MARK = {
    ace: 'A', two: '2', three: '3', four: '4', five: '5', six: '6', seven: '7', eight: '8',
    nine: '9', ten: '10', page: 'Pg', knight: 'Kn', queen: 'Q', king: 'K',
};
/* Simple line emblems, drawn for this file. Stroke only, so they follow the text colour. */
const SUIT_SVG = {
    cups: '<path d="M12 10h24c0 11-5 18-12 18S12 21 12 10z"/><path d="M24 28v9M16 40h16"/>',
    wands: '<path d="M24 5v38"/><path d="M24 14c-7-1-10-5-10-9M24 24c7-1 10-5 10-9M24 34c-6-1-9-4-9-8"/>',
    swords: '<path d="M24 4l5 8v22H19V12z"/><path d="M13 34h22M24 34v9M20 43h8"/>',
    pentacles: '<circle cx="24" cy="24" r="17"/><path d="M24 11l6.5 20L13.5 18.6h21L17.5 31z"/>',
};
const emblemFor = (cardId) => {
    const card = getTarotCard(cardId);
    if (card && card.arcana === 'major' && card.majorNumber !== undefined) {
        return { svg: `<text x="24" y="31" text-anchor="middle" font-size="22" stroke="none" fill="currentColor">${romanNumeral(card.majorNumber)}</text>`, mark: '' };
    }
    if (card && card.suit)
        return { svg: SUIT_SVG[card.suit] ?? '', mark: RANK_MARK[card.rank ?? ''] ?? '' };
    return { svg: '', mark: '' };
};
/** The back of a card: concentric and symmetric under a half turn, so it can never show an orientation. */
const cardBack = (extraClass = '') => `<span class="tx-card tx-back${extraClass ? ` ${extraClass}` : ''}" aria-hidden="true"><span class="tx-back-ring"></span></span>`;
/** A revealed card, front up. `fresh` plays the turn-over once. */
export function revealedCard(cardId, title, orientation, roleLabel, strings, fresh = false, openKey) {
    const emblem = emblemFor(cardId);
    const state = orientation === 'reversed' ? strings.reversed : strings.upright;
    const card = getTarotCard(cardId);
    /* A card in the spread (or the one that jumped) opens its detail on a tap. The key says WHERE it is - `spread:1`,
       `jumper` - and never which card it is: the controller looks the card up in the session. */
    const opener = openKey === undefined ? ''
        : ` role="button" tabindex="0" aria-haspopup="dialog" data-tx-card-open="${escapeHtml(openKey)}" aria-label="${escapeHtml(`${strings.cardAria(title, orientation)}. ${strings.cardOpen}`)}"`;
    return `<figure class="tx-card tx-face${fresh ? ' is-fresh' : ''}" data-orientation="${orientation}"${opener}
    data-arcana="${card?.arcana ?? ''}" data-suit="${card?.suit ?? ''}">
    <figcaption class="tx-face-role">${escapeHtml(roleLabel)}</figcaption>
    <svg class="tx-emblem" viewBox="0 0 48 48" aria-hidden="true" focusable="false">${emblem.svg}</svg>
    <span class="tx-face-mark" aria-hidden="true">${escapeHtml(emblem.mark)}</span>
    <span class="tx-face-title" aria-hidden="true">${escapeHtml(title)}</span>
    <span class="tx-face-state${orientation === 'reversed' ? ' is-reversed' : ''}" aria-hidden="true">${escapeHtml(state)}</span>
    <span class="tx-visually-hidden">${escapeHtml(strings.cardAria(title, orientation))}</span>
  </figure>`;
}
/* The cue: a phone that shakes, with a short arc of motion either side. Drawn for this file, stroke only, so it follows the
   text colour; it is decoration (aria-hidden) and the words beside it say the same. It is still when motion is reduced. */
const PHONE_CUE = `<svg class="tx-phone" viewBox="0 0 64 64" aria-hidden="true" focusable="false">
    <g class="tx-phone-body"><rect x="22" y="10" width="20" height="44" rx="4.5"/><path d="M28 15h8"/><circle cx="32" cy="48.5" r="1.6"/></g>
    <g class="tx-phone-waves"><path d="M14 22q-4 10 0 20"/><path d="M8 25q-5 7 0 14"/><path d="M50 22q4 10 0 20"/><path d="M56 25q5 7 0 14"/></g>
  </svg>`;
function shakeBlock(shake, strings) {
    if (!shake || !shake.offered)
        return '';
    const on = shake.state === 'on';
    const hint = on ? strings.shakeOrTap : (shake.state === 'unavailable' ? strings.shakeUnavailable : '');
    /* No sensor, no cue and no button: there is nothing to press. The words stay in the page, visually hidden, for a screen reader. */
    if (shake.state === 'unavailable') {
        return `<div class="tx-shake" data-tx-shake="unavailable"><p class="tx-shake-hint" role="status">${escapeHtml(hint)}</p></div>`;
    }
    return `<div class="tx-shake" data-tx-shake="${shake.state}">
    ${PHONE_CUE}
    <button type="button" class="tx-button tx-shake-toggle${on ? ' is-on' : ''}" data-tx-shake-toggle aria-pressed="${on ? 'true' : 'false'}">${escapeHtml(on ? strings.shakeOn : strings.shakeEnable)}</button>
    <p class="tx-shake-hint" role="status">${escapeHtml(hint)}</p>
  </div>`;
}
/**
 * The short mixing phase after a shuffle is asked for - by a tap or by a shake - and before the deck is turned to.
 *
 * Ten card backs in two halves, one either side of the middle, riffled across into a single pile one card after another and cut again, twice. The only words
 * are the line the mixing ends on; what the screen is doing is said to a screen reader by the label.
 */
function shuffling(strings, shake) {
    const back = (n) => cardBack(`tx-shuffle-card tx-shuffle-card-${n}`);
    return `<main class="tx-intro tx-shuffle" role="status" aria-live="polite" aria-label="${escapeHtml(strings.shuffling)}">
    <div class="tx-shuffle-stage" aria-hidden="true"><span class="tx-shuffle-glow"></span><div class="tx-shuffle-deck">${[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(back).join('')}</div></div>
    <p class="tx-shuffle-text">${escapeHtml(strings.chooseCard)}</p>
    ${shake?.notice ? `<p class="tx-shake-notice">${escapeHtml(strings.shakeDetected)}</p>` : ''}
  </main>`;
}
function intro(strings, shake) {
    return `<main class="tx-intro tx-panel">
    <h1 class="tx-visually-hidden">${escapeHtml(strings.title)}</h1>
    <div class="tx-stack" aria-hidden="true">${cardBack('tx-stack-1')}${cardBack('tx-stack-2')}${cardBack('tx-stack-3')}</div>
    ${shakeBlock(shake, strings)}
    <button type="button" class="tx-button tx-primary" data-tx-begin>${escapeHtml(strings.begin)}</button>
  </main>`;
}
function deckMarkup(session, strings, held = false) {
    const chosenAt = new Map(session.selections.map((s) => [s.position, s]));
    /* One tab stop for the whole deck, on the first position that can be chosen; arrows move inside it. */
    const tabStop = session.deck.positions.find((entry) => positionAvailability(session, entry.position).available)?.position ?? null;
    /* THE CELLS (tarotDeckFocus.ts): over which stretch of the deck's scroll (in places) each card that can be chosen is THE card in focus - the middle between it and
       the nearest chooseable card either side. The hero's stylesheet draws the protruding card from these, scroll-linked, so the picture follows the scroll on the
       compositor and agrees with the picker's own model by construction. They name a place, never a card. */
    const cells = focusCells(session.deck.positions.map((entry) => !chosenAt.has(entry.position) && positionAvailability(session, entry.position).available));
    return session.deck.positions.map((entry, index) => {
        const chosen = chosenAt.get(entry.position);
        if (chosen) {
            const label = strings.roleName[chosen.role];
            return `<li><button type="button" class="tx-slot tx-back is-chosen" data-tx-position="${entry.position}" disabled tabindex="-1"
        aria-label="${escapeHtml(strings.chosenLabel(entry.position, label))}"><span class="tx-slot-ring" aria-hidden="true"></span><span class="tx-slot-number" aria-hidden="true">${entry.position}</span><span class="tx-slot-role" aria-hidden="true">${escapeHtml(label)}</span></button></li>`;
        }
        const usable = positionAvailability(session, entry.position).available;
        const cell = cells[index];
        /* HELD: the third card is taken and the deck is still on the screen (while it is shown, and while it goes). Its cards are the deck's, disabled, and drawn. */
        return `<li${cell ? ` style="--ca:${cell.from};--cb:${cell.to}"` : ''}><button type="button" class="tx-slot tx-back${usable || held ? '' : ' is-unavailable'}${held ? ' is-held' : ''}" data-tx-position="${entry.position}"
      ${usable ? '' : 'disabled'} tabindex="${entry.position === tabStop ? 0 : -1}"
      aria-label="${escapeHtml(usable ? strings.positionLabel(entry.position) : strings.unavailableLabel(entry.position))}"><span class="tx-slot-ring" aria-hidden="true"></span><span class="tx-slot-number" aria-hidden="true">${entry.position}</span></button></li>`;
    }).join('');
}
/**
 * ONE CARD, LARGE, WITH ITS OWN PARAGRAPH.
 *
 * The enlarged card is the same revealedCard() the spread draws (not tappable here), the heading names it, and the text
 * is the card's paragraph for the way up it was drawn - upright or reversed - in the application's language, read from
 * the repository's tables. Beneath it, once the reader text is in memory, the card's longer description: what the card is,
 * in general, as opposed to what its picture says in the way up it was drawn. The overlay is a view of the session and
 * writes nothing to it.
 */
function detailOverlay(detail, title, strings) {
    const text = tarotCardDetailText(detail.cardId, detail.orientation);
    const description = loadedReaderDescription(detail.cardId);
    const more = description
        ? `<div class="tx-detail-more" data-tx-detail-more>${readerParagraphs(description).map((part) => `<p>${escapeHtml(part)}</p>`).join('')}</div>`
        : '';
    const state = detail.orientation === 'reversed' ? strings.reversed : strings.upright;
    return `<div class="tx-detail" role="dialog" aria-modal="true" aria-labelledby="tx-detail-title" data-tx-detail>
    <div class="tx-detail-backdrop" data-tx-detail-close></div>
    <div class="tx-detail-panel tx-panel">
      <button type="button" class="tx-detail-close" data-tx-detail-close aria-label="${escapeHtml(strings.detailClose)}"><span aria-hidden="true">&times;</span></button>
      <div class="tx-detail-card">${revealedCard(detail.cardId, title, detail.orientation, detail.roleLabel, strings)}</div>
      <h2 id="tx-detail-title" class="tx-detail-title">${escapeHtml(title)}</h2>
      <p class="tx-detail-state${detail.orientation === 'reversed' ? ' is-reversed' : ''}">${escapeHtml(state)}</p>
      ${text ? `<p class="tx-detail-text" data-tx-detail-text>${escapeHtml(text)}</p>` : ''}
      ${more}
    </div>
  </div>`;
}
/** The dialog on its own, for a host above the whole application (the screen's own stacking order would put the strip over it). */
export function renderTarotDetail(detail, cardTitles) {
    return detail ? detailOverlay(detail, cardTitles[detail.cardId] ?? detail.cardId, tarotExperienceStrings()) : '';
}
/**
 * THE READING, CARD FIRST.
 *
 *   the title and the path of the spread
 *   each card in turn: its place, its name and the way up it was drawn, what kind of card it is, then three short paragraphs
 *   the card that jumped, when one was kept
 *   what the three mean together
 *   what to take from this
 *
 * Nothing speaks about the three cards together before each of them has been explained, so there is no summary above the cards. The words are the reading's own;
 * this only sets them out so that the card, the place and the way up are easy to see on a phone.
 */
function cardFirstReadingMarkup(reading, model, strings) {
    const cards = reading.cards.map((card) => `<article class="tx-cardsec" data-tx-card-section="${escapeHtml(card.positionId)}">
      <p class="tx-cardsec-pos">${escapeHtml(card.positionName)}</p>
      <h3 class="tx-cardsec-name">${escapeHtml(card.cardName)}<span class="tx-cardsec-orient${card.orientation === 'reversed' ? ' is-reversed' : ''}">${card.orientation === 'reversed' ? '— Reversed' : '— Upright'}</span></h3>
      <p class="tx-cardsec-meta">${escapeHtml(card.meta)}</p>
      ${card.paragraphs.map((paragraph, index) => `<p class="tx-cardsec-text${index === card.paragraphs.length - 1 ? ' is-place' : ''}">${escapeHtml(paragraph)}</p>`).join('')}
    </article>`).join('');
    const jumper = reading.jumper
        ? `<section class="tx-cardsec tx-jumper-note"><p class="tx-cardsec-pos">${escapeHtml(reading.jumper.title)}</p><p class="tx-cardsec-text">${escapeHtml(reading.jumper.text)}</p></section>`
        : '';
    return `<section class="tx-reading tx-cardfirst" aria-label="${escapeHtml(strings.readingHeading)}" id="tx-reading">
      <h2 class="tx-visually-hidden">${escapeHtml(reading.title)}</h2>
      ${cards}
      ${jumper}
      <section class="tx-synthesis tx-panel" data-tx-synthesis><h3>${escapeHtml(reading.synthesis.title)}</h3>${reading.synthesis.paragraphs.map((paragraph) => `<p>${escapeHtml(paragraph)}</p>`).join('')}</section>
      <section class="tx-takeaway tx-panel" data-tx-takeaway><h3>${escapeHtml(reading.takeaway.title)}</h3><p>${escapeHtml(reading.takeaway.text)}</p></section>
      <div class="tx-actions tx-after">
        <button type="button" class="tx-button tx-primary" data-tx-again>${escapeHtml(strings.drawAgain)}</button>
        ${model.kind === 'practice' ? `<button type="button" class="tx-button" data-tx-today>${escapeHtml(strings.backToToday)}</button>` : ''}
      </div>
      ${shakeBlock(model.shake, strings)}
      ${model.kind === 'practice' ? `<p class="tx-note">${escapeHtml(strings.practiceNote)}</p>` : ''}
    </section>`;
}
/** The reading of a session whose language has no card-first reading (Slovak): the short reading, the full one folded away, the actions. */
function legacyReadingMarkup(reading, model, session, strings, titleOf) {
    const sections = reading.sections;
    const byId = new Map(sections.map((section) => [section.id, section]));
    const short = byId.get('in-short');
    const perCard = ['energy', 'factor', 'guidance'].map((id, index) => {
        const section = byId.get(id);
        const selection = session.selections[index];
        if (!section || !selection)
            return '';
        return `<article class="tx-meaning"><p class="tx-meaning-card">${escapeHtml(strings.roleName[selection.role])} · ${escapeHtml(titleOf(selection.cardId))}</p>
        <h3>${escapeHtml(section.title)}</h3><p>${escapeHtml(section.text)}</p></article>`;
    }).join('');
    const rest = sections.filter((section) => !['energy', 'factor', 'guidance', 'in-short'].includes(section.id));
    return `<section class="tx-reading" aria-label="${escapeHtml(strings.readingHeading)}" id="tx-reading">
      <h2 class="tx-visually-hidden">${escapeHtml(strings.readingHeading)}</h2>
      ${short ? `<div class="tx-short tx-panel"><h3>${escapeHtml(short.title)}</h3><p>${escapeHtml(short.text)}</p></div>` : ''}
      <details class="tx-full tx-panel"><summary>${escapeHtml(strings.fullReading)}</summary>
        ${rest.map((section) => `<article class="tx-meaning"><h3>${escapeHtml(section.title)}</h3><p>${escapeHtml(section.text)}</p></article>`).join('')}
        ${perCard}
      </details>
      <div class="tx-actions tx-after">
        <button type="button" class="tx-button tx-primary" data-tx-again>${escapeHtml(strings.drawAgain)}</button>
        ${model.kind === 'practice' ? `<button type="button" class="tx-button" data-tx-today>${escapeHtml(strings.backToToday)}</button>` : ''}
      </div>
      ${shakeBlock(model.shake, strings)}
      ${model.kind === 'practice' ? `<p class="tx-note">${escapeHtml(strings.practiceNote)}</p>` : ''}
    </section>`;
}
/**
 * THE PICKER: ONE STEP OF THREE, A STRIP OF NUMBERED BACKS, ONE BUTTON FOR THE CARD IN THE MIDDLE.
 *
 * The strip holds all 78 places, every back the same and each carrying only its number: the number is the place in the deck
 * that was shuffled before the draw, and it means nothing about the card, which the note under the strip says. The card in
 * the middle is the one the button (and a second tap on that card) chooses. The words that say which card is in the middle
 * are written by the controller, from the strip's own scroll; here is the starting state.
 */
function pickerMarkup(session, strings, phase, prompt, pickFocus, held = false) {
    const picking = phase !== 'jumper-decision' && !held;
    const step = Math.min(session.selections.length + 1, TAROT_POSITIONS.length);
    const start = pickFocus ?? 0;
    return `<section class="tx-picker" data-tx-picker>
      ${picking ? `<p class="tx-step tx-visually-hidden">${escapeHtml(strings.pickStep(step, TAROT_POSITIONS.length))}</p>` : ''}
      ${prompt ? `<p class="tx-prompt tx-visually-hidden" aria-live="polite">${escapeHtml(prompt)}</p>` : ''}
      <h2 class="tx-visually-hidden">${escapeHtml(strings.deckLabel)}</h2>
      <ul class="tx-deck" role="group" aria-label="${escapeHtml(strings.deckLabel)}"${start > 0 ? ` data-tx-focus-start="${start}"` : ''}>${deckMarkup(session, strings, held)}</ul>
      ${picking ? `<button type="button" class="tx-button tx-primary tx-pick" data-tx-pick>${escapeHtml(strings.pickCard(start > 0 ? start : Math.floor(session.deck.positions.length / 2) + 1))}</button>` : ''}
      <p class="tx-hint tx-reshuffle tx-visually-hidden">${escapeHtml(strings.deckHint)}</p>
    </section>`;
}
/* ------------------------------------------------------------------ the hero */
/**
 * One back of the pack. Sixteen of them, squared up; the riffle moves them. No card id and no orientation: the deck is positions only. A card's turn in the
 * riffle (--slot), its half (--side: -1 or +1) and its small unevenness (--j, from its number alone: nothing is random) are written on it.
 */
const deckCard = (n) => `<span class="tx-card tx-back th-deck-card th-deck-card-${n}" style="--n:${n};--slot:${n};--side:${n % 2 === 0 ? -1 : 1};--j:${((n * 7) % 5) - 2}" aria-hidden="true"><span class="tx-back-ring"></span></span>`;
/**
 * THE HERO: the Earth behind it, the cards taken so far in a row in front of it, a deck beneath, one line.
 *
 * It is the same element in every stage, the line is in the same place in all of them and so is the deck, so what changes from one moment to the next is
 * the row and the line and nothing jumps. The stylesheet (tarotHero.ts) and the placement script (tarotHeroPlacement.ts) do the rest; this is only the markup. The STAGE
 * (tarotHeroStage.ts) is on the element as data-th-stage and is the only thing the stylesheet reads about where the ritual is.
 *
 *   idle        the deck (one control), the line that asks for a shuffle
 *   shuffling   the deck being mixed
 *   picking     the dense strip (the deck, opened like a dealer's spread) to choose from, the instruction over it, and the row: NO places until a card is taken, then
 *               the cards taken, left to right (Energy, Factor, Guidance); the card JUST taken is shown large in front and flies to its place
 *   pending     a card jumped out of the deck: the planet and the question
 *   complete    the three cards, the deck gathering back and going, the reading rising under the row; then the reading alone
 *
 * No place is filled by anything but a card the person took, and a card in a place is a card the session already holds.
 */
function heroMarkup(model, strings, hero, detailOpen, strip) {
    const session = model.session;
    const titleOf = (id) => model.cardTitles[id] ?? id;
    /* THE ROW IS BUILT, NOT PRE-DRAWN: a place exists only for a card that has been taken (none, then one, two, three), so there is never an empty one. A card goes to the
       place of its turn - Energy on the left, Factor in the middle, Guidance on the right - and the card just taken (fresh) is shown large in front and flies there. */
    const showSlots = (hero.phase === 'picking' || hero.phase === 'complete') && session !== null;
    const slots = showSlots ? session.selections.map((selection, index) => {
        const fresh = hero.fresh === index;
        return `<li class="th-slot"${fresh ? ' data-th-fresh' : ''} data-th-slot="${index}" style="--i:${index}">
        <div class="th-fly"><div class="th-flip">${fresh ? cardBack('th-back') : ''}${revealedCard(selection.cardId, titleOf(selection.cardId), selection.orientation, strings.roleName[selection.role], strings, false, `spread:${index}`)}</div></div></li>`;
    }).join('') : '';
    /* THE TAROT'S CENTRAL SIGIL: five Tarot cards round an eye, in one circle (tarotSigil.ts), the same in every moment of the ritual, at the Earth's centre. Vector, no text and no
       title, so there is nothing for a screen reader to say and nothing counted as written on the screen; the cards of the row pass over it. */
    const eye = tarotSigilMarkup();
    const row = slots !== '' ? `<ol class="th-row" role="group" aria-label="${escapeHtml(strings.spreadLabel)}">${slots}</ol>` : '';
    const pack = `<span class="th-deck-stack">${Array.from({ length: HERO_DECK_CARDS }, (_, index) => deckCard(index + 1)).join('')}</span>`;
    /* The deck is a button on the opening screen and a picture while it is shuffled; from the spread to the third card it is the strip (below); on the completed screen it is
       the strip gathering back into a pile and going. */
    let deck = '';
    if (hero.phase === 'idle')
        deck = `<button type="button" class="th-deck" data-tx-begin aria-label="${escapeHtml(strings.heroDeck)}">${pack}</button>`;
    else if (hero.phase === 'shuffling' || hero.phase === 'pending')
        deck = `<div class="th-deck" aria-hidden="true">${pack}</div>`;
    /* A card has been taken and is being shown: everything else of the picture is dimmed under it (opacity only) until it has landed. */
    const scrim = hero.fresh !== null && showSlots ? '<div class="th-scrim" aria-hidden="true"></div>' : '';
    const role = session ? nextTarotRole(session) : null;
    let line = '';
    if (hero.phase === 'idle')
        line = `<p class="th-line" role="status">${escapeHtml(hero.cue === 'shake' ? strings.heroShake : strings.heroTap)}</p>`;
    else if (hero.phase === 'shuffling')
        line = `<p class="tx-visually-hidden" role="status">${escapeHtml(strings.shuffling)}</p>`;
    else if (hero.phase === 'picking' && role)
        line = `<p class="th-line${hero.stage === 'spreading' ? ' is-late' : ''}" aria-hidden="true">${escapeHtml(strings.heroPick(strings.roleFor[role]))}</p>`;
    const badge = model.kind === 'practice' ? strings.practiceBadge : model.kind === 'guided' ? tarotGuidedStrings().guided : strings.todayBadge;
    return `<section class="kt-orbit-hero tx-hero" data-orbit-hero="tarot" data-tx-hero="${hero.phase}" data-th-stage="${hero.stage}"${detailOpen ? ' inert aria-hidden="true"' : ''}>
    <h1 class="tx-visually-hidden">${escapeHtml(strings.title)}</h1><p class="tx-visually-hidden">${escapeHtml(badge)}</p>
    ${eye}${deck}${row}${strip}${line}${scrim}${modeSlot(model, hero)}
  </section>`;
}
/**
 * On the opening screen only: which kind of reading this is. Daily Tarot shows the two-way choice with itself on; Guided Tarot, once a topic is chosen, shows what it is
 * about and the way back. No other screen of the ritual carries either.
 */
function modeSlot(model, hero) {
    if (hero.phase !== 'idle')
        return '';
    if (!model.guided)
        return modeSwitchMarkup('daily');
    return guidedBundle()?.panels.guidedShuffleChip(model.guided.areaId, model.guided.intentionId) ?? '';
}
/** The screen in the hero flow. The reading and the jumper's question are the numbered picker's own, drawn on the sheet under the hero. */
function renderHeroFlow(model, hero, strings) {
    const session = model.session;
    /* Guided Tarot before any card exists: the planet, and under it the panel of the step (the areas, the intentions, the quiet moment). */
    if (model.guided && (model.guided.stage === 'area' || model.guided.stage === 'intention' || model.guided.stage === 'focus')) {
        return `<div class="tx" data-tx-flow="hero" data-tx-view="guide" data-tx-guide="${model.guided.stage}" data-tx-kind="guided">
      <section class="kt-orbit-hero tx-hero" data-orbit-hero="tarot" data-tx-hero="pending" data-th-stage="idle"><h1 class="tx-visually-hidden">${escapeHtml(tarotGuidedStrings().guided)}</h1>${tarotSigilMarkup()}</section>
      <main class="tx-main tx-sheet tg-sheet" data-tg-stage="${model.guided.stage}" aria-labelledby="tg-title">${guidedBundle()?.panels.guidedPanelMarkup(model.guided) ?? ''}</main>
    </div>`;
    }
    if (hero.phase === 'idle')
        return `<div class="tx" data-tx-flow="hero" data-tx-view="intro">${heroMarkup(model, strings, hero, false, '')}</div>`;
    if (hero.phase === 'shuffling')
        return `<div class="tx" data-tx-flow="hero" data-tx-view="shuffling" aria-busy="true">${heroMarkup(model, strings, hero, false, '')}</div>`;
    if (!session) {
        return `<div class="tx" data-tx-view="unavailable"><main class="tx-intro tx-panel">
      <h1>${escapeHtml(strings.title)}</h1><p class="tx-error" role="alert">${escapeHtml(strings.unavailable)}</p></main></div>`;
    }
    const phase = tarotSessionPhase(session);
    const titleOf = (id) => model.cardTitles[id] ?? id;
    const detailOpen = Boolean(model.detail);
    const detail = model.detail && !model.detailExternal ? detailOverlay(model.detail, titleOf(model.detail.cardId), strings) : '';
    const wrap = (inner) => `<div class="tx" data-tx-flow="hero" data-tx-view="draw" data-tx-phase="${phase}" data-tx-kind="${model.kind}"${detailOpen ? ' data-tx-detail-open' : ''}>${inner}${detail}</div>`;
    if (hero.phase === 'picking') {
        /* Choosing: the numbered strip is the deck. Nothing is under the hero, and nothing scrolls. */
        const role = nextTarotRole(session);
        const prompt = role ? strings.heroPick(strings.roleFor[role]) : '';
        /* The deck is here from the spread to the third card. The third card (stage revealingGuidance) is shown with the deck still on the screen, nothing standing out of it. */
        const held = hero.stage === 'revealingGuidance';
        const strip = `<div class="th-strip">${pickerMarkup(session, strings, phase, prompt, model.pickFocus ?? null, held)}</div>`;
        return wrap(`${heroMarkup(model, strings, hero, detailOpen, strip)}${model.diagnostic ? `<p class="tx-diagnostic tx-panel" role="status">${escapeHtml(model.diagnostic)}</p>` : ''}`);
    }
    let jumper = '';
    if (phase === 'jumper-decision') {
        jumper = `<section class="tx-jumper tx-panel" role="group" aria-labelledby="tx-jumper-h">
      <h2 id="tx-jumper-h">${escapeHtml(strings.jumperHeading)}</h2>
      ${cardBack('tx-jumper-card')}
      <p>${escapeHtml(strings.jumperBody)}</p>
      <div class="tx-actions">
        <button type="button" class="tx-button tx-primary" data-tx-jumper="accept">${escapeHtml(strings.jumperAccept)}</button>
        <button type="button" class="tx-button" data-tx-jumper="reject">${escapeHtml(strings.jumperReject)}</button>
      </div></section>`;
    }
    else if (session.jumper.kind === 'rejected') {
        jumper = `<p class="tx-jumper-state">${escapeHtml(strings.jumperRejected)}</p>`;
    }
    else if (session.jumper.kind === 'accepted') {
        const offer = session.jumper.offer;
        jumper = `<section class="tx-jumper tx-panel is-resolved"><p class="tx-jumper-state">${escapeHtml(strings.jumperAccepted)}</p>
      ${revealedCard(offer.cardId, titleOf(offer.cardId), offer.orientation, strings.jumperHeading, strings, false, 'jumper')}</section>`;
    }
    /* No phone to shake on the reading: the shuffle is asked for from the hero (the shake) or by the button that follows the reading. */
    const readingModel = { ...model, shake: undefined };
    let body = '';
    if (phase === 'complete' && model.guided?.reading) {
        body = guidedBundle()?.panels.guidedReadingMarkup(model.guided.reading) ?? '';
    }
    else if (phase === 'complete' && model.reading && model.reading.cardFirst) {
        body = cardFirstReadingMarkup(model.reading.cardFirst, readingModel, strings);
    }
    else if (phase === 'complete' && model.reading) {
        body = legacyReadingMarkup(model.reading, readingModel, session, strings, titleOf);
    }
    /* The deck is still on the screen for the moment it takes to gather back into a pile and go (stage complete); then there is none (stage reading). */
    const gathering = hero.stage === 'complete' && phase === 'complete'
        ? `<div class="th-strip">${pickerMarkup(session, strings, phase, '', model.pickFocus ?? null, true)}</div>` : '';
    return wrap(`${heroMarkup(model, strings, hero, detailOpen, gathering)}
    <main class="tx-main tx-sheet"${detailOpen ? ' inert aria-hidden="true"' : ''}>
      ${model.diagnostic ? `<p class="tx-diagnostic tx-panel" role="status">${escapeHtml(model.diagnostic)}</p>` : ''}
      ${jumper}
      ${body}
    </main>`);
}
/**
 * A guided draw names its places in the intention's own words, not Energy, Factor and Guidance. The overlay changes only the three names and the one line that asks for the next
 * card; every other string, and every line of markup that reads them, is Daily Tarot's own.
 */
function withGuidedPlaces(strings, model) {
    const labels = model.guided?.placeLabels;
    if (!labels)
        return strings;
    const names = { energy: labels[0], factor: labels[1], guidance: labels[2] };
    const step = Math.min((model.session?.selections.length ?? 0) + 1, labels.length);
    const guided = tarotGuidedStrings();
    return { ...strings, roleName: names, roleFor: names, heroPick: (place) => guided.pickLine(step, labels.length, place), choosing: (place) => guided.pickLine(step, labels.length, place) };
}
/** The whole screen, as a string. */
export function renderTarotExperience(model) {
    const strings = withGuidedPlaces(tarotExperienceStrings(), model);
    if (model.hero)
        return renderHeroFlow(model, model.hero, strings);
    if (model.view === 'intro')
        return `<div class="tx" data-tx-view="intro">${intro(strings, model.shake)}</div>`;
    if (model.view === 'shuffling')
        return `<div class="tx" data-tx-view="shuffling" aria-busy="true">${shuffling(strings, model.shake)}</div>`;
    const session = model.session;
    if (!session) {
        return `<div class="tx" data-tx-view="unavailable"><main class="tx-intro tx-panel">
      <h1>${escapeHtml(strings.title)}</h1><p class="tx-error" role="alert">${escapeHtml(strings.unavailable)}</p></main></div>`;
    }
    const phase = tarotSessionPhase(session);
    const role = nextTarotRole(session);
    const titleOf = (id) => model.cardTitles[id] ?? id;
    /* The three places of the spread: empty until a card is chosen, then the card, turned over. */
    const spread = TAROT_POSITIONS.map((position, index) => {
        const selection = session.selections[index];
        if (!selection) {
            const current = index === session.selections.length && phase !== 'jumper-decision';
            return `<div class="tx-place${current ? ' is-current' : ''}"><span class="tx-place-label">${escapeHtml(strings.roleName[position])}</span></div>`;
        }
        return `<div class="tx-place is-filled">${revealedCard(selection.cardId, titleOf(selection.cardId), selection.orientation, strings.roleName[selection.role], strings, selection.position === model.freshPosition, `spread:${index}`)}</div>`;
    }).join('');
    let jumper = '';
    if (phase === 'jumper-decision') {
        jumper = `<section class="tx-jumper tx-panel" role="group" aria-labelledby="tx-jumper-h">
      <h2 id="tx-jumper-h">${escapeHtml(strings.jumperHeading)}</h2>
      ${cardBack('tx-jumper-card')}
      <p>${escapeHtml(strings.jumperBody)}</p>
      <div class="tx-actions">
        <button type="button" class="tx-button tx-primary" data-tx-jumper="accept">${escapeHtml(strings.jumperAccept)}</button>
        <button type="button" class="tx-button" data-tx-jumper="reject">${escapeHtml(strings.jumperReject)}</button>
      </div></section>`;
    }
    else if (session.jumper.kind === 'rejected') {
        jumper = `<p class="tx-jumper-state">${escapeHtml(strings.jumperRejected)}</p>`;
    }
    else if (session.jumper.kind === 'accepted') {
        const offer = session.jumper.offer;
        jumper = `<section class="tx-jumper tx-panel is-resolved"><p class="tx-jumper-state">${escapeHtml(strings.jumperAccepted)}</p>
      ${revealedCard(offer.cardId, titleOf(offer.cardId), offer.orientation, strings.jumperHeading, strings, false, 'jumper')}</section>`;
    }
    const prompt = role
        ? strings.choosing(strings.roleFor[role])
        : (phase === 'jumper-decision' ? strings.decideFirst : '');
    let body;
    if (phase === 'complete' && model.reading && model.reading.cardFirst) {
        body = cardFirstReadingMarkup(model.reading.cardFirst, model, strings);
    }
    else if (phase === 'complete' && model.reading) {
        body = legacyReadingMarkup(model.reading, model, session, strings, titleOf);
    }
    else {
        body = pickerMarkup(session, strings, phase, prompt, model.pickFocus ?? null);
    }
    const badge = model.kind === 'practice' ? strings.practiceBadge : strings.todayBadge;
    const detailOpen = Boolean(model.detail);
    const detail = model.detail && !model.detailExternal ? detailOverlay(model.detail, titleOf(model.detail.cardId), strings) : '';
    return `<div class="tx" data-tx-view="draw" data-tx-phase="${phase}" data-tx-kind="${model.kind}"${detailOpen ? ' data-tx-detail-open' : ''}>
    <main class="tx-main"${detailOpen ? ' inert aria-hidden="true"' : ''}>
      <h1 class="tx-visually-hidden">${escapeHtml(strings.title)}</h1><p class="tx-visually-hidden">${escapeHtml(badge)}</p>
      <div class="tx-spread" role="group" aria-label="${escapeHtml(strings.spreadLabel)}">${spread}</div>
      ${model.diagnostic ? `<p class="tx-diagnostic tx-panel" role="status">${escapeHtml(model.diagnostic)}</p>` : ''}
      ${jumper}
      ${body}
    </main>
    ${detail}
  </div>`;
}
