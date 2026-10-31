import { escapeHtml } from '../../format.js?v=b5ef5ed';
import { pickLocalized } from '../../i18n/locale.js?v=b5ef5ed';
import { nextTarotRole, positionAvailability, tarotSessionPhase, } from '../tarotDrawSession.js?v=b5ef5ed';
import { readingForSession } from './tarotSessionReading.js?v=b5ef5ed';
import { TAROT_POSITIONS } from '../tarotTypes.js?v=b5ef5ed';
const EN = {
    title: 'Daily draw',
    intro: 'The deck has been shuffled and set face down. Choose three.',
    choosing: (role) => `Choose your ${role} card`,
    decideFirst: 'Decide about the card that jumped before choosing from the deck.',
    roleName: { energy: 'Energy', factor: 'Factor', guidance: 'Guidance' },
    roleFor: { energy: 'Energy', factor: 'Factor', guidance: 'Guidance' },
    positionLabel: (position) => `Hidden card, position ${position}`,
    chosenLabel: (position, role) => `Position ${position}, chosen as ${role}`,
    unavailableLabel: (position) => `Position ${position}, not available`,
    deckLabel: 'The shuffled deck, 78 face-down positions',
    jumperHeading: 'A card jumped out',
    jumperBody: 'One card left the deck while it was being shuffled. You can keep it as extra '
        + 'context for the reading, or set it aside.',
    jumperAccept: 'Keep it',
    jumperReject: 'Set it aside',
    jumperAccepted: 'The card that jumped stays in play.',
    jumperRejected: 'The card that jumped is set aside. It adds nothing to the reading.',
    reversedMark: 'reversed',
    uprightMark: 'upright',
    cardAria: (title, orientation) => (orientation === 'reversed' ? `${title}, reversed` : `${title}, upright`),
    yourCards: 'Your three cards',
    complete: 'Your reading',
    provisionalNote: 'Reversal and jumper frequencies are development values, not final '
        + 'product settings.',
    unavailable: 'The draw is unavailable: this device has no cryptographically secure random '
        + 'source, and the deck will not be shuffled with a predictable one.',
};
const SK = {
    title: 'Denné vyloženie',
    intro: 'Balíček je premiešaný a rozložený rubom nahor. Vyber tri karty.',
    choosing: (role) => `Vyber kartu pre ${role}`,
    decideFirst: 'Najprv sa rozhodni o karte, ktorá vyskočila, potom vyberaj z balíčka.',
    roleName: { energy: 'Energia', factor: 'Faktor', guidance: 'Nasmerovanie' },
    roleFor: { energy: 'Energiu', factor: 'Faktor', guidance: 'Nasmerovanie' },
    positionLabel: (position) => `Skrytá karta, pozícia ${position}`,
    chosenLabel: (position, role) => `Pozícia ${position}, vybraná pre ${role}`,
    unavailableLabel: (position) => `Pozícia ${position}, nedostupná`,
    deckLabel: 'Premiešaný balíček, 78 pozícií rubom nahor',
    jumperHeading: 'Jedna karta vyskočila',
    jumperBody: 'Počas miešania vypadla z balíčka jedna karta. Môžeš si ju nechať ako kontext '
        + 'k čítaniu, alebo ju odložiť.',
    jumperAccept: 'Nechať v hre',
    jumperReject: 'Odložiť',
    /* Podmetom je karta, nie čitateľ: zhoda padá na "karta", nie na rod čitateľa. */
    jumperAccepted: 'Karta, ktorá vyskočila, zostáva v hre.',
    jumperRejected: 'Karta, ktorá vyskočila, je odložená. K čítaniu nepridáva nič.',
    reversedMark: 'obrátená',
    uprightMark: 'základná poloha',
    cardAria: (title, orientation) => (orientation === 'reversed' ? `${title}, obrátená` : `${title}, v základnej polohe`),
    yourCards: 'Tvoje tri karty',
    complete: 'Tvoje čítanie',
    provisionalNote: 'Frekvencia obrátených kariet a vyskakovania je vývojová hodnota, '
        + 'nie finálne produktové nastavenie.',
    unavailable: 'Vyloženie nie je dostupné: toto zariadenie nemá kryptograficky bezpečný zdroj '
        + 'náhodnosti a balíček sa nebude miešať predvídateľným.',
};
export const tarotDrawStrings = () => pickLocalized({ en: EN, sk: SK });
/** A revealed card, front up, with its orientation stated in words as well as shown. */
function revealedCard(cardTitle, orientation, roleLabel, strings) {
    const mark = orientation === 'reversed' ? strings.reversedMark : strings.uprightMark;
    return `<figure class="kt-tarot-card kt-tarot-card-face" data-orientation="${orientation}">
    <figcaption class="kt-tarot-role">${escapeHtml(roleLabel)}</figcaption>
    <span class="kt-tarot-title" aria-hidden="true">${escapeHtml(cardTitle)}</span>
    <span class="kt-tarot-orientation" aria-hidden="true">${escapeHtml(mark)}</span>
    <span class="kt-visually-hidden">${escapeHtml(strings.cardAria(cardTitle, orientation))}</span>
  </figure>`;
}
/** The whole screen, as a string. Matches the repo's component idiom. */
export function renderTarotDrawScreen(model) {
    const strings = tarotDrawStrings();
    if (!model.session) {
        return `<section class="kt-tarot" aria-live="polite">
      <h1>${escapeHtml(strings.title)}</h1>
      <p class="kt-tarot-error" role="alert">${escapeHtml(strings.unavailable)}</p>
    </section>`;
    }
    const session = model.session;
    const phase = tarotSessionPhase(session);
    const role = nextTarotRole(session);
    const chosenAt = new Map(session.selections.map((s) => [s.position, s]));
    /*
     * THE DECK.
     *
     * One button per position. A button rather than a div because it IS a button -
     * keyboard operable, focusable and announced as actionable for free, which a
     * div with a click handler is none of.
     *
     * The face-down markup deliberately carries NO card id and NO orientation. Not
     * hidden with CSS - absent. A data attribute holding the card would put the
     * whole shuffle in the DOM, where anybody could read it and pick the card they
     * wanted, and the committed deck would become a formality.
     */
    /*
     * ONE TAB STOP FOR THE WHOLE DECK.
     *
     * 78 buttons at the default tabindex means 78 presses of Tab to get past them.
     * The accessible pattern for a grid of buttons is a single stop into the group
     * with arrow keys inside it, which is what the controller's keydown handler
     * implements - this is the half that puts the deck INTO that pattern.
     *
     * The stop goes on the first slot that can actually be chosen, so Tab lands
     * somewhere useful rather than on a disabled position.
     */
    const tabStop = session.deck.positions.find((entry) => positionAvailability(session, entry.position).available)?.position ?? null;
    const deck = session.deck.positions.map((entry) => {
        const chosen = chosenAt.get(entry.position);
        const availability = positionAvailability(session, entry.position);
        const tabIndex = entry.position === tabStop ? 0 : -1;
        if (chosen) {
            const roleLabel = strings.roleName[chosen.role];
            return `<li><button type="button" class="kt-tarot-slot is-chosen"
        data-tarot-position="${entry.position}" disabled tabindex="-1"
        aria-label="${escapeHtml(strings.chosenLabel(entry.position, roleLabel))}">
        <span class="kt-tarot-number" aria-hidden="true">${entry.position}</span>
        <span class="kt-tarot-slot-role" aria-hidden="true">${escapeHtml(roleLabel)}</span>
      </button></li>`;
        }
        const usable = availability.available;
        return `<li><button type="button" class="kt-tarot-slot${usable ? '' : ' is-unavailable'}"
      data-tarot-position="${entry.position}"${usable ? '' : ' disabled'} tabindex="${tabIndex}"
      aria-label="${escapeHtml(usable
            ? strings.positionLabel(entry.position)
            : strings.unavailableLabel(entry.position))}">
      <span class="kt-tarot-number" aria-hidden="true">${entry.position}</span>
    </button></li>`;
    }).join('');
    /* The Jumper. Offered face-DOWN: accepting a card you have already seen is a
       different decision from accepting one you have not, and which of the two the
       product wants is an open question - so the screen does not answer it by
       showing the face. */
    let jumperBlock = '';
    if (phase === 'jumper-decision') {
        jumperBlock = `<section class="kt-tarot-jumper" role="group"
      aria-labelledby="kt-tarot-jumper-heading">
      <h2 id="kt-tarot-jumper-heading">${escapeHtml(strings.jumperHeading)}</h2>
      <div class="kt-tarot-card kt-tarot-card-back kt-tarot-jumper-card" aria-hidden="true"></div>
      <p>${escapeHtml(strings.jumperBody)}</p>
      <div class="kt-tarot-actions">
        <button type="button" class="kt-tarot-button kt-tarot-button-primary"
          data-tarot-jumper="accept">${escapeHtml(strings.jumperAccept)}</button>
        <button type="button" class="kt-tarot-button"
          data-tarot-jumper="reject">${escapeHtml(strings.jumperReject)}</button>
      </div>
    </section>`;
    }
    else if (session.jumper.kind === 'accepted') {
        const offer = session.jumper.offer;
        jumperBlock = `<section class="kt-tarot-jumper is-resolved">
      <p class="kt-tarot-jumper-state">${escapeHtml(strings.jumperAccepted)}</p>
      ${revealedCard(model.cardTitles[offer.cardId] ?? offer.cardId, offer.orientation, strings.jumperHeading, strings)}
    </section>`;
    }
    else if (session.jumper.kind === 'rejected') {
        jumperBlock = `<section class="kt-tarot-jumper is-resolved">
      <p class="kt-tarot-jumper-state">${escapeHtml(strings.jumperRejected)}</p>
    </section>`;
    }
    const revealed = session.selections.length > 0
        ? `<section class="kt-tarot-spread" aria-label="${escapeHtml(strings.yourCards)}">
        <h2>${escapeHtml(strings.yourCards)}</h2>
        <div class="kt-tarot-spread-row">${session.selections.map((selection) => revealedCard(model.cardTitles[selection.cardId] ?? selection.cardId, selection.orientation, strings.roleName[selection.role], strings)).join('')}</div>
      </section>`
        : '';
    const reading = model.reading
        ? `<section class="kt-tarot-reading" aria-label="${escapeHtml(strings.complete)}">
        <h2>${escapeHtml(strings.complete)}</h2>
        ${model.reading.sections.map((section) => `<article>
          <h3>${escapeHtml(section.title)}</h3>
          <p>${escapeHtml(section.text)}</p>
        </article>`).join('')}
      </section>`
        : '';
    /* During the jumper decision there is no role to choose for, and the deck is
       disabled. Saying why is the difference between a locked screen and a broken
       one. */
    const promptText = role
        ? strings.choosing(strings.roleFor[role])
        : (phase === 'jumper-decision' ? strings.decideFirst : '');
    const prompt = promptText
        ? `<p class="kt-tarot-prompt" aria-live="polite">${escapeHtml(promptText)}</p>`
        : '';
    const progress = `<ol class="kt-tarot-progress" aria-label="${escapeHtml(strings.yourCards)}">
    ${TAROT_POSITIONS.map((position, index) => {
        const done = index < session.selections.length;
        const current = index === session.selections.length && phase !== 'jumper-decision';
        return `<li class="${done ? 'is-done' : ''}${current ? ' is-current' : ''}"
      aria-current="${current ? 'step' : 'false'}">${escapeHtml(strings.roleName[position])}</li>`;
    }).join('')}
  </ol>`;
    return `<section class="kt-tarot" data-tarot-phase="${phase}">
    <header class="kt-tarot-head">
      <h1>${escapeHtml(strings.title)}</h1>
      <p class="kt-tarot-intro">${escapeHtml(strings.intro)}</p>
      ${progress}
      ${prompt}
    </header>
    ${model.diagnostic
        ? `<p class="kt-tarot-diagnostic" role="status">${escapeHtml(model.diagnostic)}</p>` : ''}
    ${jumperBlock}
    ${revealed}
    ${reading}
    ${phase === 'complete' ? '' : `<section class="kt-tarot-deck-wrap">
      <h2 class="kt-visually-hidden">${escapeHtml(strings.deckLabel)}</h2>
      <ul class="kt-tarot-deck" role="group" aria-label="${escapeHtml(strings.deckLabel)}">
        ${deck}
      </ul>
    </section>`}
    ${session.deck.provisionalPolicies
        ? `<p class="kt-tarot-provisional">${escapeHtml(strings.provisionalNote)}</p>` : ''}
  </section>`;
}
/* Kept exported from here for the review harness's controller; the function itself is in tarotSessionReading. */
export { readingForSession };
