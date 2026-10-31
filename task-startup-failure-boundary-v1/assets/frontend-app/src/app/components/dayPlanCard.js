import { adviceCardOf, ADVICE_HEADINGS, SECTION_HEADING } from '../forecast-v2/dayAdviceEnglish.js?v=2ea79e9';
import { describeDayFacts } from '../forecast-v2/dayFacts.js?v=2ea79e9';
import { escapeAttribute, escapeHtml } from '../format.js?v=2ea79e9';
/*
 * THE DAY, AS ADVICE.
 *
 * One card, in the order a morning needs it: what kind of day this is (a headline
 * that is the day's character, and at most two sentences under it), what may come
 * easier, what needs more care, how it may feel, what else the day fits, and one
 * thing to do. A part with nothing to support it is not drawn: not hidden, not
 * greyed, not filled. A quiet day is a short card.
 *
 * WHAT IS NOT DRAWN: scores, levels, ratings, bars, confidence, "supportive",
 * "challenging", house or planet names in the prose. The machinery is visible in
 * exactly one place - the closed "Why this?" disclosure - which lists, for every
 * part of the card, the influences it stands on, and says what was NOT used and why.
 *
 * EVERY LINE CARRIES ITS BASIS. `data-basis-trigger` and `data-basis-background` hold
 * the fact ids the plan attached to the claim and `data-groups` the independence
 * groups they collapse into, so "why is it telling me this" is answered from the
 * markup without re-running the engine.
 *
 * ENGLISH ONLY, for now. The Slovak Forecast is frozen, so the caller passes nothing
 * in Slovak and the screen keeps its existing layout exactly.
 */
/** The disclosure names the strongest influences of each part; every one of them is still in the markup's data attributes. */
const SHOWN_PER_PART = 3;
const ids = (refs) => refs.map((ref) => ref.id).join(' ');
const basisAttributes = (basis, kind) => ` data-advice-kind="${escapeAttribute(kind)}"`
    + ` data-basis-trigger="${escapeAttribute(ids(basis.triggers))}" data-basis-background="${escapeAttribute(ids(basis.background))}"`
    + ` data-groups="${escapeAttribute(basis.groups.join(' '))}" data-convergence="${basis.convergence}"`;
const listItems = (lines) => lines.map((line) => `
          <li${basisAttributes(line.basis, line.kind)}>${escapeHtml(line.text)}</li>`).join('');
const section = (slot, heading, body) => (body.trim() === '' ? '' : `
      <section class="kt-fc-dp-section" data-dayplan-slot="${slot}">
        <h3 class="kt-fc-dp-heading">${escapeHtml(heading)}</h3>${body}
      </section>`);
/** For the disclosure: the influences a part of the card stands on, one label per influence, trigger first. */
function influencesOf(lines) {
    const today = [];
    const longer = [];
    for (const line of lines) {
        for (const ref of line.basis.triggers)
            if (!today.includes(ref.label))
                today.push(ref.label);
        for (const ref of line.basis.background)
            if (!longer.includes(ref.label))
                longer.push(ref.label);
    }
    return { today, longer };
}
function behindEachPart(card, life) {
    const parts = [
        ['Headline', [{ basis: card.glanceBasis }]],
        ['Opening', card.lineBasis ? [{ basis: card.lineBasis }] : []],
        [ADVICE_HEADINGS.basisReading, card.reading],
        [SECTION_HEADING.easier, card.easier],
        [SECTION_HEADING.care, card.care],
        [SECTION_HEADING.emotionalClimate, card.emotionalClimate ? [card.emotionalClimate] : []],
        [SECTION_HEADING.goodUse, card.goodUseNote ? [...card.goodUse, card.goodUseNote] : card.goodUse],
        [SECTION_HEADING.move, card.move ? [card.move] : []],
        /* Today's Life Dynamics is a view of the same evidence: its technical trail is kept here, with every other part's, and not repeated on the card. */
        ...(life ? life.rows.filter((entry) => entry.assessed).map((entry) => [`Life Dynamics: ${entry.label}`, [{ basis: entry.basis }]]) : []),
    ];
    const rows = parts.filter(([, lines]) => lines.length > 0).map(([heading, lines]) => {
        const { today, longer } = influencesOf(lines);
        const shown = (labels) => labels.slice(0, SHOWN_PER_PART).join('; ')
            + (labels.length > SHOWN_PER_PART ? ` (+${labels.length - SHOWN_PER_PART} more)` : '');
        const behind = longer.length > 0 ? ` · behind it: ${shown(longer)}` : '';
        return `<li><strong>${escapeHtml(heading)}</strong> — ${escapeHtml(shown(today) || 'the longer stretch alone')}${escapeHtml(behind)}</li>`;
    }).join('');
    return rows === '' ? '' : `
          <p class="kt-fc-dp-sub">${escapeHtml(ADVICE_HEADINGS.basisPerPart)}</p>
          <ul class="kt-fc-dp-basis-list">${rows}</ul>`;
}
export function renderDayPlanCard(forecast, today, life = null) {
    const card = adviceCardOf(forecast, { isToday: today });
    const diagnostics = describeDayFacts(forecast.facts);
    const basis = (title, lines) => (lines.length === 0 ? '' : `
          <p class="kt-fc-dp-sub">${escapeHtml(title)}</p>
          <ul class="kt-fc-dp-basis-list">${lines.map((line) => `<li>${escapeHtml(line)}</li>`).join('')}</ul>`);
    /* The reading: what the day's evidence means. Each paragraph names its source in a run-in label and carries its basis. P1.6.5: the DAILY depth - the lines about the day. */
    const paragraph = (line) => `
        <p class="kt-fc-dp-para"${basisAttributes(line.basis, line.kind)}><span class="kt-fc-dp-lead-in">${escapeHtml(line.label)}</span> ${escapeHtml(line.text)}</p>`;
    const reading = card.daily.reading.length === 0 ? '' : `
      <div class="kt-fc-dp-reading" data-dayplan-slot="reading">${card.daily.reading.map(paragraph).join('')}
      </div>`;
    /* What stays true for the whole month or year, whole and one touch away: the same sentences the canonical reading holds, never a summary of them. Closed on every render, so a new date or profile never inherits an open panel. */
    const context = card.daily.context.length === 0 || card.daily.contextTitle === null ? '' : `
      <details class="kt-fc-dp-context" data-dayplan-context="period">
        <summary>${escapeHtml(card.daily.contextTitle)}</summary>
        <div class="kt-fc-dp-context-body">${card.daily.context.map(paragraph).join('')}
        </div>
      </details>`;
    /* The birth-time limit: the status stays on the page, the full explanation is one touch away on every date. */
    const birth = card.daily.birthTime;
    const birthTime = birth === null ? '' : `
      <details class="kt-fc-dp-birth" data-dayplan-slot="birthTimeNote" data-birth-time="${birth.status}">
        <summary>${escapeHtml(birth.summary)}</summary>
        <p class="kt-fc-dp-note">${escapeHtml(birth.note)}</p>${birth.leftOut.length === 0 ? '' : `
        <p class="kt-fc-dp-note">${escapeHtml(ADVICE_HEADINGS.birthTimeLeftOut)}: ${escapeHtml(birth.leftOut.join('; '))}.</p>`}
      </details>`;
    const climate = card.emotionalClimate
        ? `
        <p class="kt-fc-dp-line"${basisAttributes(card.emotionalClimate.basis, card.emotionalClimate.kind)}>${escapeHtml(card.emotionalClimate.text)}</p>`
        : '';
    const chips = card.goodUse.length === 0 ? '' : `
        <ul class="kt-fc-dp-chips">${card.goodUse.map((line) => `
          <li${basisAttributes(line.basis, line.kind)}>${escapeHtml(line.text)}</li>`).join('')}
        </ul>${card.goodUseNote ? `
        <p class="kt-fc-dp-line kt-fc-dp-goodnote"${basisAttributes(card.goodUseNote.basis, card.goodUseNote.kind)}>${escapeHtml(card.goodUseNote.text)}</p>` : ''}`;
    const move = card.move
        ? `
      <section class="kt-fc-dp-section kt-fc-dp-movecard" data-dayplan-slot="move">
        <h3 class="kt-fc-dp-heading">${escapeHtml(ADVICE_HEADINGS.move)}</h3>
        <p class="kt-fc-dp-move"${basisAttributes(card.move.basis, card.move.kind)}>${escapeHtml(card.move.text)}</p>
      </section>`
        : '';
    return `
    <section class="kt-fc-block kt-fc-dayplan kt-fc-advice" data-forecast-dayplan aria-labelledby="kt-fc-dp-title">
      <p class="kt-fc-dp-kicker">${escapeHtml(card.kicker)}</p>
      <h2 class="kt-fc-dp-headline" id="kt-fc-dp-title" data-dayplan-slot="glance"${basisAttributes(card.glanceBasis, 'glance')}>${escapeHtml(card.title)}</h2>
      ${card.line ? `<p class="kt-fc-dp-glance" data-dayplan-slot="glanceLine"${basisAttributes(card.lineBasis ?? card.glanceBasis, 'opening')}>${escapeHtml(card.line)}</p>` : ''}
      ${reading}${context}
      ${section('easier', SECTION_HEADING.easier, card.easier.length === 0 ? '' : `
        <ul class="kt-fc-dp-list">${listItems(card.easier)}
        </ul>`)}
      ${section('care', SECTION_HEADING.care, card.care.length === 0 ? '' : `
        <ul class="kt-fc-dp-list kt-fc-dp-care">${listItems(card.care)}
        </ul>`)}
      ${section('emotionalClimate', SECTION_HEADING.emotionalClimate, climate)}
      ${section('goodUse', SECTION_HEADING.goodUse, chips)}
      ${move}
      ${birthTime}
      <details class="kt-fc-method kt-fc-dp-basis">
        <summary>${escapeHtml(ADVICE_HEADINGS.basis)}</summary>
        <div class="kt-fc-dp-basis-body">${behindEachPart(card, life)}${basis(ADVICE_HEADINGS.basisToday, diagnostics.triggerFacts)}${basis(ADVICE_HEADINGS.basisBackground, diagnostics.backgroundFacts)}${basis(ADVICE_HEADINGS.basisWithheld, forecast.facts.withheld.map((entry) => `${entry.what}: ${entry.reason}`))}
        </div>
      </details>
    </section>`;
}
