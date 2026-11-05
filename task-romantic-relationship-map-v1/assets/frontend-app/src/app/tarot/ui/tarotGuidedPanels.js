import { escapeHtml } from '../../format.js';
import { activeLocale } from '../../i18n/locale.js';
import { getGuidedArea, getGuidedIntention, GUIDED_AREAS } from '../guided/guidedCatalog.js';
import { modeSwitchMarkup, tarotGuidedStrings } from './tarotGuidedScreen.js';
/**
 * THE GUIDED SCREENS: THE AREAS, THE INTENTIONS, THE QUIET MOMENT AND THE READING.
 *
 * Loaded the first time a person opens Guided Tarot (guided/guidedRuntime.ts). Markup only, and only ever from the catalog: a label, a
 * hint or a sentence on these screens is looked up by a stable id in guided/guidedCatalog.ts, in the application's language at the
 * moment of drawing. Nothing here holds a card, chooses one or composes a sentence of the reading; the draw is the engine's session and
 * the reading is composeGuidedReading's.
 */
/* One small line figure for each area, drawn for this file: stroke only, so it takes the interface's colour like the strip's own pictograms. */
const AREA_GLYPH = {
    /* two overlapping rings */
    'relationships': '<circle cx="9.5" cy="12" r="5.5"/><circle cx="14.5" cy="12" r="5.5"/>',
    /* a path rising to a peak, a flag at the top */
    'work-career': '<path d="M3.5 19L9.5 9l3.3 5.4L15.5 10.5 20.5 19z"/><path d="M15.5 10.5V5M15.5 5.2l3.2 1.4-3.2 1.5"/>',
    /* a ring resting on a base line: something held steady */
    'finances-stability': '<circle cx="12" cy="9.5" r="5"/><circle cx="12" cy="9.5" r="2"/><path d="M5 19h14M8 16.5h8"/>',
    /* a sprig */
    'personal-growth': '<path d="M12 20V10"/><path d="M12 14c-4.5 0-6.5-2.6-6.5-6 4.2 0 6.5 2.2 6.5 6z"/><path d="M12 11.5c0-3.6 2.2-6 6-6 0 3.6-2.3 6-6 6z"/>',
    /* a road that forks */
    'life-changes': '<path d="M12 21v-8"/><path d="M12 13L6.5 6.5"/><path d="M12 13l5.5-6.5"/><path d="M6.5 6.5V10M6.5 6.5H10M17.5 6.5V10M17.5 6.5H14"/>',
    /* a house with a lit door */
    'home-moving': '<path d="M4 11.5L12 4.5l8 7"/><path d="M6.5 10v9.5h11V10"/><path d="M10.5 19.5v-5h3v5"/>',
    /* a compass star */
    'travel-experiences': '<circle cx="12" cy="12" r="8"/><path d="M12 6.5l1.8 4.7 4.7 1.8-4.7 1.8L12 19.5l-1.8-4.7L5.5 13l4.7-1.8z"/>',
};
const glyph = (id) => `<svg class="tg-glyph" viewBox="0 0 24 24" aria-hidden="true" focusable="false">${AREA_GLYPH[id]}</svg>`;
/** What a person has chosen, as a quiet line: the area, then the intention. */
export function choiceChipMarkup(areaId, intentionId, label) {
    const locale = activeLocale();
    const area = getGuidedArea(areaId);
    const intention = getGuidedIntention(intentionId);
    if (!area || !intention)
        return '';
    return `<p class="tg-chip" data-tg-chip><span class="tg-chip-label">${escapeHtml(label)}</span>
    <span class="tg-chip-area">${escapeHtml(area.label[locale])}</span><span class="tg-chip-sep" aria-hidden="true"> · </span><span class="tg-chip-intention">${escapeHtml(intention.label[locale])}</span></p>`;
}
function resumeMarkup(resume, strings, locale) {
    if (!resume)
        return '';
    const area = getGuidedArea(resume.areaId);
    const intention = getGuidedIntention(resume.intentionId);
    if (!area || !intention)
        return '';
    return `<section class="tg-resume tx-panel" aria-label="${escapeHtml(strings.resumeTitle)}">
      <p class="tg-resume-title">${escapeHtml(strings.resumeTitle)} <span class="tg-resume-state">${escapeHtml(resume.stage === 'reading' ? strings.resumeReading : strings.resumeDraw)}</span></p>
      <p class="tg-resume-what">${escapeHtml(area.label[locale])} · ${escapeHtml(intention.label[locale])}</p>
      <div class="tg-resume-actions">
        <button type="button" class="tx-button tx-primary" data-tg-resume>${escapeHtml(strings.resume)}</button>
        <button type="button" class="tx-button" data-tg-restart>${escapeHtml(strings.startNew)}</button>
      </div>
    </section>`;
}
/** The areas, as seven capsules. Nothing is chosen yet. */
function areaScreen(strings, locale, resume) {
    const items = GUIDED_AREAS.map((area) => `<li><button type="button" class="tg-choice tg-area" data-tg-area="${area.id}">
      ${glyph(area.id)}
      <span class="tg-choice-text"><span class="tg-choice-title">${escapeHtml(area.label[locale])}</span><span class="tg-choice-blurb">${escapeHtml(area.blurb[locale])}</span></span>
    </button></li>`).join('');
    return `${modeSwitchMarkup('guided')}
    <h1 id="tg-title" class="tg-title">${escapeHtml(strings.areaTitle)}</h1>
    <p class="tg-lead">${escapeHtml(strings.areaLead)}</p>
    ${resumeMarkup(resume, strings, locale)}
    <ul class="tg-list tg-areas" aria-labelledby="tg-title">${items}</ul>`;
}
const backButton = (strings, extra = '') => `<div class="tg-bar"><button type="button" class="tg-back" data-tg-back><span aria-hidden="true">‹</span> ${escapeHtml(strings.back)}</button>${extra}</div>`;
/** The intentions of the area that was chosen. The area stays on screen, as a way back and a way to change it. */
function intentionScreen(areaId, intentionId, strings, locale) {
    const area = getGuidedArea(areaId);
    if (!area)
        return '';
    const items = area.intentions.map((intention) => `<li><button type="button" class="tg-choice tg-intention${intention.id === intentionId ? ' is-on' : ''}" data-tg-intention="${intention.id}"${intention.id === intentionId ? ' aria-current="true"' : ''}>
      <span class="tg-choice-text"><span class="tg-choice-title">${escapeHtml(intention.label[locale])}</span></span>
    </button></li>`).join('');
    return `${backButton(strings, `<button type="button" class="tg-link" data-tg-change-area>${escapeHtml(strings.changeArea)}</button>`)}
    <div class="tg-area-badge">${glyph(area.id)}<span class="tg-area-name">${escapeHtml(area.label[locale])}</span></div>
    <h1 id="tg-title" class="tg-title">${escapeHtml(strings.intentionTitle)}</h1>
    <ul class="tg-list tg-intentions" aria-labelledby="tg-title">${items}</ul>`;
}
/**
 * THE FOCUS: A QUIET MOMENT BEFORE THE DECK.
 *
 * Three short lines, one after another, and a button the person presses when they are ready. There is no countdown and nothing is
 * measured: no breath, no voice, no camera, no sensor, no permission. The soft light behind the words is one still element with a
 * slow opacity and scale change on the compositor (and none at all where motion is reduced); the lines arrive by opacity alone.
 */
function focusScreen(areaId, intentionId, strings, locale) {
    const intention = getGuidedIntention(intentionId);
    const area = getGuidedArea(areaId);
    if (!intention || !area)
        return '';
    return `${backButton(strings)}
    <div class="tg-ritual" data-tg-ritual>
      <span class="tg-halo" aria-hidden="true"></span>
      ${choiceChipMarkup(areaId, intentionId, strings.focusOn)}
      <p class="tg-focus-line">${escapeHtml(intention.focus[locale])}</p>
      <h1 id="tg-title" class="tg-ritual-line tg-ritual-1">${escapeHtml(strings.ritualBreath)}</h1>
      <p class="tg-ritual-line tg-ritual-2">${escapeHtml(strings.ritualQuiet)}</p>
      <div class="tg-ritual-foot">
        <p class="tg-ritual-line tg-ritual-3">${escapeHtml(strings.ritualReady)}</p>
        <button type="button" class="tx-button tx-primary tg-ready" data-tg-ready>${escapeHtml(strings.chooseCards)}</button>
      </div>
    </div>`;
}
/** The content of the panel for a stage that is chosen before any card exists. Empty for a stage that is not one of those. */
export function guidedPanelMarkup(view) {
    const strings = tarotGuidedStrings();
    const locale = activeLocale();
    if (view.stage === 'area')
        return areaScreen(strings, locale, view.resume);
    if (view.stage === 'intention' && view.areaId !== null)
        return intentionScreen(view.areaId, view.intentionId, strings, locale);
    if (view.stage === 'focus' && view.areaId !== null && view.intentionId !== null)
        return focusScreen(view.areaId, view.intentionId, strings, locale);
    return '';
}
/** Above the deck, once a person has chosen: what they are about to draw for, and the way back before the shuffle. */
export function guidedShuffleChip(areaId, intentionId) {
    const strings = tarotGuidedStrings();
    const chip = choiceChipMarkup(areaId, intentionId, strings.focusOn);
    if (chip === '')
        return '';
    return `<div class="tg-shuffle-head">${chip}<button type="button" class="tg-back tg-back-quiet" data-tg-back><span aria-hidden="true">‹</span> ${escapeHtml(strings.back)}</button></div>`;
}
/** The guided reading, in the card-first layout the daily reading uses: each card in its own place, then the cards together, then what to take. */
export function guidedReadingMarkup(reading) {
    const strings = tarotGuidedStrings();
    const cards = reading.cards.map((card) => `<article class="tx-cardsec tg-cardsec" data-tx-card-section="${escapeHtml(card.positionId)}">
      <p class="tx-cardsec-pos">${escapeHtml(card.positionLabel)}</p>
      <p class="tg-ask">${escapeHtml(card.ask)}</p>
      <h3 class="tx-cardsec-name">${escapeHtml(card.cardName)}<span class="tx-cardsec-orient${card.orientation === 'reversed' ? ' is-reversed' : ''}"> — ${escapeHtml(card.orientation === 'reversed' ? strings.reversed : strings.upright)}</span></h3>
      ${card.paragraphs.map((paragraph, index) => `<p class="tx-cardsec-text${index === card.paragraphs.length - 1 && card.paragraphs.length > 1 ? ' is-place' : ''}">${escapeHtml(paragraph)}</p>`).join('')}
    </article>`).join('');
    return `<section class="tx-reading tx-cardfirst tg-reading" aria-label="${escapeHtml(strings.yourReading)}" id="tx-reading" data-tg-reading="${escapeHtml(reading.intentionId)}">
      <header class="tg-reading-head">
        <h2 class="tx-visually-hidden">${escapeHtml(strings.yourReading)}</h2>
        <p class="tg-eyebrow">${escapeHtml(reading.areaLabel)} <span aria-hidden="true">·</span> ${escapeHtml(reading.intentionLabel)}</p>
        <p class="tg-opening">${escapeHtml(reading.opening)}</p>
      </header>
      ${cards}
      ${reading.synthesis.paragraphs.length === 0 ? '' : `<section class="tx-synthesis tx-panel" data-tx-synthesis><h3>${escapeHtml(reading.synthesis.title)}</h3>${reading.synthesis.paragraphs.map((paragraph) => `<p>${escapeHtml(paragraph)}</p>`).join('')}</section>`}
      <section class="tx-takeaway tx-panel" data-tx-takeaway><h3>${escapeHtml(reading.takeaway.title)}</h3>${reading.takeaway.paragraphs.map((paragraph) => `<p>${escapeHtml(paragraph)}</p>`).join('')}</section>
      <div class="tx-actions tx-after">
        <button type="button" class="tx-button tx-primary" data-tg-new>${escapeHtml(strings.newReading)}</button>
        <button type="button" class="tx-button" data-tg-daily>${escapeHtml(strings.toDaily)}</button>
      </div>
    </section>`;
}
