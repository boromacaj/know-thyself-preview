import { escapeAttribute, escapeHtml } from '../format.js?v=b5ef5ed';
import { getPillar } from '../model.js?v=b5ef5ed';
import { findNumerologyReference, numerologyReferenceTopic } from '../reference/numerologyReference.js?v=b5ef5ed';
import { calculatePersonalYear } from '../../core/numerology.js?v=b5ef5ed';
import { renderReferencePanel } from './referencePanel.js?v=b5ef5ed';
import { renderPillarExportActions } from './pillarExportActions.js?v=b5ef5ed';
const MONTH_NAMES = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
const YEAR_THEMES = {
    1: 'New Beginnings',
    2: 'Partnership & Patience',
    3: 'Expression & Growth',
    4: 'Foundation & Discipline',
    5: 'Change & Freedom',
    6: 'Responsibility & Service',
    7: 'Inner Work & Wisdom',
    8: 'Power & Abundance',
    9: 'Completion & Release',
};
export function renderNumerologyPillarScreen(experience, exportFeedback = null) {
    const pillar = getPillar(experience, 'numerology');
    const rawOutput = experience.coreResult.numerologyOutput.rawOutput;
    return `<section class="stage-view numerology-pillar-view" aria-labelledby="numerology-pillar-title">
    ${renderHero(experience, pillar)}
    ${renderMetricCards(pillar)}
    <div class="numerology-analysis-grid">
      ${renderPsychomatrix()}
      ${renderPersonalYearCycle(pillar, experience.input.birthDate)}
      ${renderPinnaclesChallenges(rawOutput.pinnacleNumbers, rawOutput.challengeNumbers)}
      ${renderInsights(pillar)}
    </div>
    ${renderSourceBar(experience)}
    ${renderPillarExportActions('numerology', exportFeedback)}
  </section>`;
}
function renderHero(experience, pillar) {
    const fullName = experience.input.fullName.trim() || 'Given name(s) pending';
    const birthDate = formatBirthDate(experience.input.birthDate);
    return `<header class="numerology-hero">
    <div class="numerology-hero-art" aria-hidden="true">
      ${heroArtSvg()}
      <span class="numerology-hero-numeral numerology-hero-numeral-1">${escapeHtml(outputValue(pillar, 'Life Path'))}</span>
      <span class="numerology-hero-numeral numerology-hero-numeral-2">${escapeHtml(outputValue(pillar, 'Expression'))}</span>
      <span class="numerology-hero-numeral numerology-hero-numeral-3">${escapeHtml(outputValue(pillar, 'Soul Urge'))}</span>
    </div>
    <div class="numerology-hero-copy">
      <p class="eyebrow">Pillar 01 &middot; Numerology</p>
      <h1 id="numerology-pillar-title">Numerology Pillar</h1>
      <p class="numerology-hero-subtitle">Deterministic symbolic structure derived from name and birth date.</p>
    </div>
    <div class="numerology-hero-meta">
      ${heroMetaBlock('Full Name', fullName)}
      ${heroMetaBlock('Birth Date', birthDate)}
      ${heroMetaBlock('System', 'Pythagorean')}
      ${heroMetaBlock('Calculation Mode', 'Standard')}
    </div>
  </header>`;
}
function heroMetaBlock(label, value) {
    return `<div class="numerology-hero-meta-item">
    <span>${escapeHtml(label)}</span>
    <strong>${escapeHtml(value)}</strong>
  </div>`;
}
function heroArtSvg() {
    return `<svg class="numerology-hero-svg" viewBox="0 0 640 320" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <radialGradient id="numerology-hero-glow" cx="50%" cy="50%" r="60%">
        <stop offset="0%" stop-color="rgba(213,182,109,0.16)" />
        <stop offset="100%" stop-color="rgba(213,182,109,0)" />
      </radialGradient>
    </defs>
    <circle cx="470" cy="150" r="150" fill="url(#numerology-hero-glow)" />
    <g fill="none" stroke="rgba(213,182,109,0.22)" stroke-width="1">
      <circle cx="470" cy="150" r="118" />
      <circle cx="470" cy="150" r="86" />
      <circle cx="470" cy="150" r="54" />
      <circle cx="470" cy="86" r="54" />
      <circle cx="470" cy="214" r="54" />
      <circle cx="416" cy="118" r="54" />
      <circle cx="524" cy="118" r="54" />
      <circle cx="416" cy="182" r="54" />
      <circle cx="524" cy="182" r="54" />
    </g>
    <g stroke="rgba(213,182,109,0.14)" stroke-width="1">
      <line x1="470" y1="32" x2="470" y2="268" />
      <line x1="352" y1="150" x2="588" y2="150" />
      <line x1="386" y1="66" x2="554" y2="234" />
      <line x1="554" y1="66" x2="386" y2="234" />
    </g>
    <g fill="rgba(213,182,109,0.55)">
      <circle cx="470" cy="150" r="2.4" />
      <circle cx="470" cy="32" r="1.6" />
      <circle cx="470" cy="268" r="1.6" />
      <circle cx="352" cy="150" r="1.6" />
      <circle cx="588" cy="150" r="1.6" />
    </g>
    <g fill="rgba(105,183,173,0.5)">
      <circle cx="386" cy="66" r="1.4" />
      <circle cx="554" cy="234" r="1.4" />
    </g>
    <g fill="rgba(203,118,94,0.5)">
      <circle cx="554" cy="66" r="1.4" />
      <circle cx="386" cy="234" r="1.4" />
    </g>
  </svg>`;
}
function renderMetricCards(pillar) {
    const cards = [
        metricCard(pillar, 'Life Path', 'life-path'),
        metricCard(pillar, 'Expression', 'expression'),
        metricCard(pillar, 'Soul Urge', 'soul-urge'),
        metricCard(pillar, 'Personality', 'personality'),
        metricCard(pillar, 'Birth Day', 'birthday-number', 'Birthday Number'),
        metricCard(pillar, 'Balance', 'balance-number', 'Balance Number'),
        metricCard(pillar, 'Maturity', 'maturity-number', 'Maturity Number'),
    ];
    return `<div class="numerology-metric-grid">
    ${cards.map((card) => renderMetricCard(card)).join('')}
  </div>`;
}
function renderMetricCard(card) {
    const cardBody = `<span class="numerology-metric-label">${escapeHtml(card.label)}</span>
      <strong class="numerology-metric-value">${escapeHtml(card.value)}</strong>
      <small class="numerology-metric-note">${escapeHtml(card.note)}</small>`;
    const numericValue = Number(card.value);
    const entry = Number.isFinite(numericValue)
        ? findNumerologyReference(numerologyReferenceTopic(card.metric, numericValue))
        : null;
    if (!entry) {
        return `<article class="numerology-metric-card">${cardBody}</article>`;
    }
    return `<details class="numerology-metric-detail" name="numerology-reference-group">
    <summary class="numerology-metric-card" aria-label="${escapeAttribute(`${card.label} ${card.value}, view symbolic reference`)}">${cardBody}</summary>
    ${renderReferencePanel(entry)}
  </details>`;
}
function metricCard(pillar, sourceLabel, metric, displayLabel = sourceLabel) {
    const output = pillar.keyOutputs.find((item) => item.label === sourceLabel);
    const rawValue = output?.value ?? '--';
    return {
        label: displayLabel,
        value: finalReducedDigit(rawValue),
        note: output?.note ?? 'Not calculated',
        metric,
    };
}
function finalReducedDigit(value) {
    const segments = value.split('/');
    return segments.at(-1)?.trim() || value;
}
function outputValue(pillar, label) {
    return pillar.keyOutputs.find((item) => item.label === label)?.value ?? '--';
}
function renderPsychomatrix() {
    const grid = [
        ['1', '4', '7'],
        ['2', '5', '8'],
        ['3', '6', '9'],
    ];
    return `<section class="numerology-panel numerology-psychomatrix" aria-labelledby="numerology-psychomatrix-title">
    <div class="numerology-panel-title-row">
      <p class="eyebrow">Structure preview</p>
      <h3 id="numerology-psychomatrix-title">Psychomatrix</h3>
      <span class="numerology-placeholder-badge">Illustrative example</span>
    </div>
    <div class="numerology-psychomatrix-grid">
      ${grid.map((row) => row.map((digit) => `<div class="numerology-psychomatrix-cell"><strong>${digit}</strong></div>`).join('')).join('')}
    </div>
    <p class="numerology-panel-footnote">A birth-date digit grid is not yet calculated by the local engine. This is a representative layout, not a live reading.</p>
  </section>`;
}
function renderPersonalYearCycle(pillar, birthDate) {
    const currentYear = new Date().getUTCFullYear();
    const isDateReady = /^\d{4}-\d{2}-\d{2}$/.test(birthDate);
    const rows = [-2, -1, 0, 1, 2, 3, 4].map((offset) => {
        const year = currentYear + offset;
        const isCurrent = offset === 0;
        const finalNumber = isDateReady ? calculatePersonalYear(birthDate, year).finalNumber : null;
        return {
            year,
            isCurrent,
            value: finalNumber === null ? '--' : String(finalNumber),
            theme: finalNumber === null ? 'Birth date pending' : (YEAR_THEMES[finalNumber] ?? 'Master-number cycle in transition'),
        };
    });
    return `<section class="numerology-panel numerology-year-cycle" aria-labelledby="numerology-year-cycle-title">
    <div class="numerology-panel-title-row">
      <p class="eyebrow">Cycles</p>
      <h3 id="numerology-year-cycle-title">Personal Year Cycle</h3>
    </div>
    <div class="numerology-table" role="table" aria-label="Personal year cycle">
      <div class="numerology-table-row numerology-table-head" role="row">
        <span role="columnheader">Year</span>
        <span role="columnheader">Personal Year</span>
        <span role="columnheader">Theme</span>
      </div>
      ${rows.map((row) => `<div class="numerology-table-row${row.isCurrent ? ' is-current' : ''}" role="row">
        <span role="cell">${row.year}</span>
        <span role="cell">${escapeHtml(row.value)}</span>
        <span role="cell">${escapeHtml(row.theme)}</span>
      </div>`).join('')}
    </div>
    <p class="numerology-panel-footnote">Every year in this table is calculated locally from the birth date (birth month + birth day + that year, reduced). ${currentYear} is the live current-cycle year (marked).</p>
  </section>`;
}
function renderPinnaclesChallenges(pinnacles, challenges) {
    const rows = [
        { phase: '1st', pinnacle: pinnacles.first.finalNumber, challenge: challenges.first.finalNumber },
        { phase: '2nd', pinnacle: pinnacles.second.finalNumber, challenge: challenges.second.finalNumber },
        { phase: '3rd', pinnacle: pinnacles.third.finalNumber, challenge: challenges.third.finalNumber },
        { phase: '4th', pinnacle: pinnacles.fourth.finalNumber, challenge: challenges.fourth.finalNumber },
    ];
    return `<section class="numerology-panel numerology-pinnacles" aria-labelledby="numerology-pinnacles-title">
    <div class="numerology-panel-title-row">
      <p class="eyebrow">Life phases</p>
      <h3 id="numerology-pinnacles-title">Pinnacles &amp; Challenges</h3>
    </div>
    <div class="numerology-table" role="table" aria-label="Pinnacles and challenges">
      <div class="numerology-table-row numerology-table-head" role="row">
        <span role="columnheader">Cycle</span>
        <span role="columnheader">Pinnacle</span>
        <span role="columnheader">Challenge</span>
      </div>
      ${rows.map((row) => `<div class="numerology-table-row" role="row">
        <span role="cell">${escapeHtml(row.phase)}</span>
        <span role="cell">${row.pinnacle}</span>
        <span role="cell">${row.challenge}</span>
      </div>`).join('')}
    </div>
    <div class="numerology-phase-tracker" aria-hidden="true">
      ${rows.map((row) => `<span class="numerology-phase-node"><strong>${row.pinnacle}</strong><small>Phase ${escapeHtml(row.phase)}</small></span>`).join('')}
    </div>
    <p class="numerology-panel-footnote">Pinnacle and challenge numbers are calculated locally from the birth date. Phase age ranges are not yet mapped.</p>
  </section>`;
}
function renderInsights(pillar) {
    const tags = pillar.themeSignals.slice(0, 6);
    return `<section class="numerology-panel numerology-insights" aria-labelledby="numerology-insights-title">
    <div class="numerology-panel-title-row">
      <p class="eyebrow">&#10022; Numerological Insights</p>
      <h3 id="numerology-insights-title">Reading</h3>
    </div>
    <div class="numerology-insight-block">
      <h4>Core Signature</h4>
      <p>${escapeHtml(pillar.interpretation)}</p>
    </div>
    <div class="numerology-insight-block">
      <h4>Strengths</h4>
      <ul class="numerology-insight-list">
        <li>Intuitive mind paired with deliberate, structured follow-through</li>
        <li>Draws on name and birth-date signals as complementary evidence</li>
      </ul>
      <span class="numerology-placeholder-badge">Representative example</span>
    </div>
    <div class="numerology-insight-block">
      <h4>Growth Areas</h4>
      <ul class="numerology-insight-list">
        <li>Balancing analysis with timely, embodied action</li>
        <li>Staying anchored during high-change personal-year cycles</li>
      </ul>
      <span class="numerology-placeholder-badge">Representative example</span>
    </div>
    <div class="numerology-insight-block">
      <h4>Life Theme</h4>
      <p>${escapeHtml(pillar.relevance.life)}</p>
    </div>
    ${tags.length > 0 ? `<div class="numerology-tag-row">${tags.map((tag) => `<span>${escapeHtml(tag.label)}</span>`).join('')}</div>` : ''}
    <p class="numerology-panel-footnote">Presented as symbolic reflection, not identity certainty. Core Signature and Life Theme currently draw on synthesis evidence from this one calculated pillar.</p>
  </section>`;
}
function renderSourceBar(experience) {
    const input = experience.input;
    const birthTime = input.birthTime.trim() || 'Unknown (local-noon estimate)';
    return `<footer class="numerology-source-bar">
    <div class="numerology-source-chips">
      ${sourceChip('Full Name', input.fullName.trim() || 'Pending')}
      ${sourceChip('Birth Date', formatBirthDate(input.birthDate))}
      ${sourceChip('Birth Time', birthTime)}
    </div>
    <button type="button" class="command-button-minimal" data-action="go-stage" data-stage="intake">Edit source data</button>
    <div class="numerology-source-system">
      <span>System: <strong>Pythagorean</strong></span>
      <span>Calculation Mode: <strong>Standard</strong></span>
    </div>
  </footer>`;
}
function sourceChip(label, value) {
    return `<div class="numerology-source-chip">
    <span>${escapeHtml(label)}</span>
    <strong>${escapeHtml(value)}</strong>
  </div>`;
}
function formatBirthDate(value) {
    const match = /^(\d{4})-(\d{2})-(\d{2})$/.exec(value);
    if (!match)
        return 'Birth date pending';
    const [, year, month, day] = match;
    const monthName = MONTH_NAMES[Number(month) - 1] ?? month;
    return `${Number(day)} ${monthName} ${year}`;
}
