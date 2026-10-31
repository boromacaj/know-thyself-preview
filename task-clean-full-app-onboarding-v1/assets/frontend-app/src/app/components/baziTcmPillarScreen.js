import { escapeHtml } from '../format.js?v=f9ab0a6';
import { getPillar } from '../model.js?v=f9ab0a6';
import { renderFivePhaseCycleWheel, renderSeasonalArc } from './baziChartVisuals.js?v=f9ab0a6';
import { TCM_PHASE_CORRESPONDENCES } from '../bazi/data/tcmCorrespondence.js?v=f9ab0a6';
import { renderPillarExportActions } from './pillarExportActions.js?v=f9ab0a6';
const MONTH_NAMES = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
export function renderBaziTcmPillarScreen(experience, exportFeedback = null) {
    const pillar = getPillar(experience, 'bazi-tcm');
    const chartData = pillar.baziChart;
    if (!chartData)
        return renderBenchmarkOrUnavailable(experience, pillar, exportFeedback);
    if (chartData.bazi.status === 'blocked' || !chartData.bazi.dayMaster)
        return renderBlocked(experience, pillar, chartData.bazi, exportFeedback);
    const bazi = chartData.bazi;
    return `<section class="stage-view bazi-pillar-view" aria-labelledby="bazi-pillar-title">
    ${renderHero(experience, bazi)}
    ${bazi.warnings.length > 0 ? renderWarnings(bazi) : ''}
    ${!bazi.hourPillar ? renderHourSuppressedBanner() : ''}
    ${renderFourPillarsSection(bazi)}
    <div class="bazi-visual-grid">
      ${renderFivePhaseCycleWheel(bazi)}
      ${renderSeasonalArc(bazi)}
    </div>
    <div class="bazi-pillar-panels-grid">
      ${renderDayMasterPanel(bazi)}
      ${renderFivePhasePanel(bazi)}
      ${renderTenGodsPanel(bazi)}
      ${renderRelationshipsPanel(bazi)}
      ${renderTimingPanel(bazi)}
      ${renderTcmPanel(bazi)}
      ${renderReflectionPanel(bazi)}
      ${renderMethodologyPanel(bazi)}
    </div>
    ${renderSourceBar(experience, bazi)}
    ${renderPillarExportActions('bazi-tcm', exportFeedback)}
  </section>`;
}
function renderHero(experience, bazi) {
    const fullName = experience.input.fullName.trim() || 'Given name(s) pending';
    const birthDate = formatBirthDate(experience.input.birthDate);
    const calculationMode = bazi.hourPillar
        ? `True solar time (${bazi.trueSolarTime ? `${bazi.trueSolarTime.totalCorrectionMinutes > 0 ? '+' : ''}${bazi.trueSolarTime.totalCorrectionMinutes} min` : 'n/a'} vs. civil)`
        : 'Three-pillar mode (birth time not supplied)';
    return `<header class="bazi-hero">
    <div class="bazi-hero-art" aria-hidden="true">${heroArtSvg()}</div>
    <div class="bazi-hero-copy">
      <p class="eyebrow">Pillar &middot; BaZi &amp; TCM</p>
      <h1 id="bazi-pillar-title">BaZi &amp; TCM Pillar</h1>
      <p class="bazi-hero-subtitle">Four Pillars structure, Five Phase balance, and a traditional TCM correspondence layer.</p>
    </div>
    <div class="bazi-hero-meta">
      ${heroMetaBlock('Full Name', fullName)}
      ${heroMetaBlock('Birth Date', birthDate)}
      ${heroMetaBlock('Active solar term', bazi.activeSolarTerm ? `${bazi.activeSolarTerm.name} (${bazi.activeSolarTerm.character})` : 'Unavailable')}
      ${heroMetaBlock('Calculation Mode', calculationMode)}
    </div>
  </header>`;
}
function heroMetaBlock(label, value) {
    return `<div class="bazi-hero-meta-item">
    <span>${escapeHtml(label)}</span>
    <strong>${escapeHtml(value)}</strong>
  </div>`;
}
function heroArtSvg() {
    return `<svg class="bazi-hero-svg" viewBox="0 0 640 320" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <radialGradient id="bazi-hero-glow" cx="50%" cy="50%" r="60%">
        <stop offset="0%" stop-color="rgba(213,182,109,0.14)" />
        <stop offset="100%" stop-color="rgba(213,182,109,0)" />
      </radialGradient>
    </defs>
    <circle cx="500" cy="150" r="150" fill="url(#bazi-hero-glow)" />
    <g fill="none" stroke="rgba(213,182,109,0.18)" stroke-width="1">
      <circle cx="500" cy="150" r="118" />
      <circle cx="500" cy="150" r="86" />
    </g>
    <g stroke="rgba(105,183,173,0.14)" stroke-width="1">
      ${Array.from({ length: 5 }, (_, index) => {
        const angle = (index / 5) * Math.PI * 2 - Math.PI / 2;
        const next = ((index + 1) / 5) * Math.PI * 2 - Math.PI / 2;
        const x1 = 500 + Math.cos(angle) * 100;
        const y1 = 150 + Math.sin(angle) * 100;
        const x2 = 500 + Math.cos(next) * 100;
        const y2 = 150 + Math.sin(next) * 100;
        return `<line x1="${x1.toFixed(1)}" y1="${y1.toFixed(1)}" x2="${x2.toFixed(1)}" y2="${y2.toFixed(1)}" />`;
    }).join('')}
    </g>
  </svg>`;
}
function renderWarnings(bazi) {
    return `<aside class="bazi-warning-banner" role="note">
    ${bazi.warnings.map((warning) => `<div class="bazi-warning-item">
      <span class="bazi-warning-icon" aria-hidden="true">!</span>
      <p>${escapeHtml(warning.message)}</p>
    </div>`).join('')}
  </aside>`;
}
function renderHourSuppressedBanner() {
    return `<aside class="bazi-suppressed-banner" role="note">
    <span class="bazi-suppressed-banner-icon" aria-hidden="true">i</span>
    <div>
      <p><strong>Hour Pillar is unavailable because birth time was not supplied.</strong></p>
      <p>Year, Month, and Day Pillars are shown (three-pillar mode). No hour is assumed or fabricated. Provide an exact birth time to unlock the Hour Pillar and hour-dependent Ten Gods.</p>
    </div>
  </aside>`;
}
function renderFourPillarsSection(bazi) {
    const columns = [
        { label: 'Year', pillar: bazi.yearPillar },
        { label: 'Month', pillar: bazi.monthPillar },
        { label: 'Day', pillar: bazi.dayPillar },
        { label: 'Hour', pillar: bazi.hourPillar },
    ];
    return `<section class="bazi-four-pillars" aria-labelledby="bazi-four-pillars-title">
    <div class="bazi-panel-title-row">
      <p class="eyebrow">Calculated</p>
      <h3 id="bazi-four-pillars-title">Four Pillars</h3>
    </div>
    <div class="bazi-four-pillars-grid">
      ${columns.map((column) => renderPillarColumn(column.label, column.pillar)).join('')}
    </div>
    <p class="bazi-panel-footnote">Western left-to-right reading order (Year &rarr; Month &rarr; Day &rarr; Hour). Day Master (the Day stem) is emphasized.</p>
  </section>`;
}
function renderPillarColumn(label, pillar) {
    if (!pillar) {
        return `<div class="bazi-pillar-column bazi-pillar-column--unavailable">
      <p class="bazi-pillar-column-label">${escapeHtml(label)}</p>
      <p class="empty-state">Unavailable</p>
    </div>`;
    }
    const isDayMaster = pillar.key === 'Day';
    return `<div class="bazi-pillar-column${isDayMaster ? ' is-day-master' : ''}">
    <p class="bazi-pillar-column-label">${escapeHtml(label)}${isDayMaster ? ' <span class="bazi-day-master-tag">Day Master</span>' : ''}</p>
    <div class="bazi-stem-cell">
      <strong class="bazi-character">${escapeHtml(pillar.stem.character)}</strong>
      <span class="bazi-pinyin">${escapeHtml(pillar.stem.name)}</span>
      <span class="bazi-phase-tag">${escapeHtml(pillar.stem.polarity)} ${escapeHtml(pillar.stem.element)}</span>
    </div>
    <div class="bazi-branch-cell">
      <strong class="bazi-character">${escapeHtml(pillar.branch.character)}</strong>
      <span class="bazi-pinyin">${escapeHtml(pillar.branch.name)} &middot; ${escapeHtml(pillar.branch.animal)}</span>
      <span class="bazi-phase-tag">${escapeHtml(pillar.branch.polarity)} ${escapeHtml(pillar.branch.element)}</span>
    </div>
    <div class="bazi-hidden-stems">
      ${pillar.hiddenStems.map((h) => `<span class="bazi-hidden-stem-chip" title="${escapeHtml(`${h.role}, ${h.conventionalWeightPercent}% conventional weight`)}">${escapeHtml(h.stem.character)}<small>${escapeHtml(h.stem.name)}</small></span>`).join('')}
    </div>
    <p class="bazi-ten-god-label">${pillar.tenGod ? escapeHtml(pillar.tenGod.tenGod) : isDayMaster ? 'Self (reference point)' : 'Unavailable'}</p>
  </div>`;
}
function renderDayMasterPanel(bazi) {
    const dayMaster = bazi.dayMaster;
    const strength = bazi.dayMasterStrength;
    return `<section class="bazi-panel bazi-daymaster-panel" aria-labelledby="bazi-daymaster-title">
    <div class="bazi-panel-title-row">
      <p class="eyebrow">Calculated</p>
      <h3 id="bazi-daymaster-title">Day Master</h3>
    </div>
    <div class="bazi-daymaster-identity">
      <strong class="bazi-character bazi-daymaster-character">${escapeHtml(dayMaster.character)}</strong>
      <div>
        <p class="bazi-daymaster-name">${escapeHtml(dayMaster.name)} &middot; ${escapeHtml(dayMaster.polarity)} ${escapeHtml(dayMaster.element)}</p>
        <p class="bazi-panel-footnote">Direct trace: Day Pillar Heavenly Stem.</p>
      </div>
    </div>
    ${strength ? `<div class="bazi-strength-readout">
      <span class="bazi-strength-tag">${escapeHtml(strength.tendency)}</span>
      <div class="bazi-balance-bar-track"><span class="bazi-balance-bar-fill" style="width:${Math.round(strength.supportFraction * 100)}%"></span></div>
      <p class="bazi-panel-footnote">Support ${strength.supportScore} / Drain ${strength.drainScore} &middot; confidence ${strength.confidence}</p>
    </div>` : ''}
    <p class="bazi-panel-footnote">${strength ? escapeHtml(strength.disclaimer) : 'Day Master strength requires the full chart.'}</p>
  </section>`;
}
function renderFivePhasePanel(bazi) {
    const raw = bazi.rawPhaseBalance;
    const hidden = bazi.hiddenStemBalance;
    if (!raw) {
        return `<section class="bazi-panel bazi-fivephase-panel"><p class="empty-state">Five Phase balance unavailable.</p></section>`;
    }
    return `<section class="bazi-panel bazi-fivephase-panel" aria-labelledby="bazi-fivephase-title">
    <div class="bazi-panel-title-row">
      <p class="eyebrow">Derived</p>
      <h3 id="bazi-fivephase-title">Five Phase Balance</h3>
    </div>
    <div class="bazi-balance-group">
      <p class="bazi-balance-group-label">Raw visible (${raw.totalCounted} counted)</p>
      ${Object.entries(raw.counts).map(([phase, count]) => balanceBar(phase, count, raw.totalCounted)).join('')}
    </div>
    ${hidden ? `<div class="bazi-balance-group">
      <p class="bazi-balance-group-label">Hidden stems (${hidden.totalCounted} slots, structural count)</p>
      ${Object.entries(hidden.counts).map(([phase, count]) => balanceBar(phase, count, hidden.totalCounted)).join('')}
    </div>` : ''}
    <p class="bazi-panel-footnote">Raw and hidden-stem layers are kept separate, not merged into one score. ${raw.isTie ? 'The chart has a tie for the dominant phase.' : ''}</p>
  </section>`;
}
function balanceBar(label, count, total) {
    const percent = total > 0 ? Math.round((count / total) * 100) : 0;
    return `<div class="bazi-balance-bar-row">
    <span class="bazi-balance-bar-label">${escapeHtml(label)}</span>
    <span class="bazi-balance-bar-track"><span class="bazi-balance-bar-fill" style="width:${percent}%"></span></span>
    <span class="bazi-balance-bar-count">${count}</span>
  </div>`;
}
function renderTenGodsPanel(bazi) {
    const pillars = [bazi.yearPillar, bazi.monthPillar, bazi.dayPillar, bazi.hourPillar].filter((p) => p !== null);
    return `<section class="bazi-panel bazi-tengods-panel" aria-labelledby="bazi-tengods-title">
    <div class="bazi-panel-title-row">
      <p class="eyebrow">Calculated</p>
      <h3 id="bazi-tengods-title">Ten Gods</h3>
    </div>
    <ul class="bazi-tengods-list">
      ${pillars.map((pillar) => `<li>
        <span class="bazi-tengods-pillar">${escapeHtml(pillar.key)}</span>
        <span class="bazi-tengods-stem">${escapeHtml(pillar.stem.name)}</span>
        <span class="bazi-tengods-value">${pillar.tenGod ? escapeHtml(pillar.tenGod.tenGod) : 'Self (reference)'}</span>
      </li>`).join('')}
    </ul>
    <p class="bazi-panel-footnote">Ten Gods are calculated from Five Phase cycle distance and Yin/Yang polarity relative to the Day Master &mdash; every stem pairing resolves consistently from the same rule.</p>
  </section>`;
}
function renderRelationshipsPanel(bazi) {
    const relationships = bazi.relationships;
    return `<section class="bazi-panel bazi-relationships-panel" aria-labelledby="bazi-relationships-title">
    <div class="bazi-panel-title-row">
      <p class="eyebrow">Calculated</p>
      <h3 id="bazi-relationships-title">Relationships</h3>
      <span class="bazi-count-badge">${relationships.length}</span>
    </div>
    ${relationships.length > 0
        ? `<ul class="bazi-relationship-list">${relationships.map((relationship) => `<li>
          <span class="bazi-relationship-label">${escapeHtml(relationship.label)}</span>
          <span class="bazi-relationship-completeness bazi-relationship-completeness--${relationship.completeness}">${escapeHtml(relationship.completeness)}</span>
        </li>`).join('')}</ul>`
        : '<p class="empty-state">No stem or branch combinations, clashes, harmonies, harms, or punishments were detected in this chart.</p>'}
    <p class="bazi-panel-footnote">Structural presence only &mdash; elemental transformation is never asserted.</p>
  </section>`;
}
function renderTimingPanel(bazi) {
    const luck = bazi.luckPillars;
    if (!luck || luck.status !== 'calculated') {
        return `<section class="bazi-panel bazi-timing-panel" aria-labelledby="bazi-timing-title">
      <div class="bazi-panel-title-row">
        <p class="eyebrow">Timing</p>
        <h3 id="bazi-timing-title">Luck Pillars (Da Yun)</h3>
      </div>
      <p class="empty-state">${escapeHtml(luck?.reasonSuppressed ?? 'Luck Pillars are unavailable.')}</p>
    </section>`;
    }
    return `<section class="bazi-panel bazi-timing-panel" aria-labelledby="bazi-timing-title">
    <div class="bazi-panel-title-row">
      <p class="eyebrow">Timing</p>
      <h3 id="bazi-timing-title">Luck Pillars (Da Yun)</h3>
    </div>
    <p class="bazi-panel-footnote">${escapeHtml(luck.directionNote)}</p>
    <div class="bazi-luck-columns">
      <div>
        <p class="bazi-balance-group-label">If forward (start age ~${luck.forward?.startAgeYears})</p>
        <ul class="bazi-luck-list">${(luck.forward?.entries ?? []).slice(0, 5).map((entry) => `<li><span>${escapeHtml(entry.label)}</span><small>age ${entry.startAgeYears}</small></li>`).join('')}</ul>
      </div>
      <div>
        <p class="bazi-balance-group-label">If reverse (start age ~${luck.reverse?.startAgeYears})</p>
        <ul class="bazi-luck-list">${(luck.reverse?.entries ?? []).slice(0, 5).map((entry) => `<li><span>${escapeHtml(entry.label)}</span><small>age ${entry.startAgeYears}</small></li>`).join('')}</ul>
      </div>
    </div>
  </section>`;
}
function renderTcmPanel(bazi) {
    const tcm = bazi.tcmConstitution;
    const raw = bazi.rawPhaseBalance;
    if (!tcm || !raw) {
        return `<section class="bazi-panel tcm-panel"><p class="empty-state">TCM constitution unavailable.</p></section>`;
    }
    return `<section class="bazi-panel tcm-panel" aria-labelledby="tcm-panel-title">
    <div class="bazi-panel-title-row">
      <p class="eyebrow">Traditional correspondence</p>
      <h3 id="tcm-panel-title">TCM Constitution</h3>
    </div>
    <div class="tcm-phase-table" role="table" aria-label="Five Phase traditional organ-system correspondence">
      ${Object.values(TCM_PHASE_CORRESPONDENCES).map((correspondence) => {
        const isDayMaster = correspondence.phase === tcm.dayMasterPhase;
        const isMostRepresented = tcm.mostRepresentedPhases.includes(correspondence.phase);
        return `<div class="tcm-phase-row${isDayMaster ? ' is-day-master' : ''}" role="row">
          <strong role="cell">${escapeHtml(correspondence.phase)}${isDayMaster ? ' <span class="bazi-day-master-tag">Day Master</span>' : ''}</strong>
          <span role="cell">${escapeHtml(correspondence.yinOrgan)} / ${escapeHtml(correspondence.yangOrgan)}</span>
          <span role="cell">${escapeHtml(correspondence.season)} &middot; ${escapeHtml(correspondence.emotion)}</span>
          <span role="cell">${raw.counts[correspondence.phase]}${isMostRepresented ? ' (most represented)' : ''}</span>
        </div>`;
    }).join('')}
    </div>
    ${tcm.emphasisNotes.map((note) => `<p class="tcm-emphasis-note">${escapeHtml(note)}</p>`).join('')}
    <p class="bazi-panel-footnote">${escapeHtml(tcm.seasonalNote)}</p>
    <p class="tcm-disclaimer">${escapeHtml(tcm.disclaimer)}</p>
  </section>`;
}
function renderReflectionPanel(bazi) {
    const tcm = bazi.tcmConstitution;
    if (!tcm)
        return '';
    return `<section class="bazi-panel tcm-reflection-panel" aria-labelledby="tcm-reflection-title">
    <div class="bazi-panel-title-row">
      <p class="eyebrow">&#10022; Reflection</p>
      <h3 id="tcm-reflection-title">Reflection Guidance</h3>
    </div>
    <ul class="tcm-reflection-list">
      ${tcm.reflectionPrompts.map((prompt) => `<li>${escapeHtml(prompt)}</li>`).join('')}
    </ul>
    <p class="tcm-disclaimer">Non-clinical self-observation prompts only. Not a treatment plan. If you have a health concern, please consult a qualified clinician.</p>
  </section>`;
}
function renderMethodologyPanel(bazi) {
    const m = bazi.methodology;
    return `<section class="bazi-panel bazi-methodology-panel" aria-labelledby="bazi-methodology-title">
    <div class="bazi-panel-title-row">
      <p class="eyebrow">Reference</p>
      <h3 id="bazi-methodology-title">Methodology &amp; Traceability</h3>
    </div>
    <dl class="bazi-methodology-list">
      <div><dt>Calendar basis</dt><dd>${escapeHtml(m.calendarBasis)}</dd></div>
      <div><dt>Year boundary</dt><dd>${escapeHtml(m.yearBoundary)}</dd></div>
      <div><dt>Month boundary</dt><dd>${escapeHtml(m.monthBoundary)}</dd></div>
      <div><dt>Day rollover</dt><dd>${escapeHtml(m.dayRolloverRule)}</dd></div>
      <div><dt>Zi-hour rule</dt><dd>${escapeHtml(m.ziHourRule)}</dd></div>
      <div><dt>True solar time</dt><dd>${m.trueSolarTimeEnabled ? 'Enabled (primary for Hour Pillar)' : 'Disabled'}</dd></div>
      <div><dt>Hidden-stem model</dt><dd>${escapeHtml(m.hiddenStemModel)}</dd></div>
      <div><dt>Ten Gods model</dt><dd>${escapeHtml(m.tenGodsModel)}</dd></div>
      <div><dt>Luck cycle direction</dt><dd>${escapeHtml(m.luckCycleDirectionRule)}</dd></div>
      <div><dt>Version</dt><dd>${escapeHtml(m.version)}</dd></div>
    </dl>
    <p class="bazi-panel-footnote">This is symbolic reference material, not scientific proof of identity.</p>
  </section>`;
}
function renderSourceBar(experience, bazi) {
    const input = experience.input;
    const birthTime = input.birthTime.trim() || 'Unknown (three-pillar mode)';
    return `<footer class="bazi-source-bar">
    <div class="bazi-source-chips">
      ${sourceChip('Full Name', input.fullName.trim() || 'Pending')}
      ${sourceChip('Birth Date', formatBirthDate(input.birthDate))}
      ${sourceChip('Birth Time', birthTime)}
    </div>
    <button type="button" class="command-button-minimal" data-action="go-stage" data-stage="intake">Edit source data</button>
    <div class="bazi-source-system">
      <span>Engine: <strong>${escapeHtml(bazi.engine)}</strong></span>
    </div>
  </footer>`;
}
function sourceChip(label, value) {
    return `<div class="bazi-source-chip">
    <span>${escapeHtml(label)}</span>
    <strong>${escapeHtml(value)}</strong>
  </div>`;
}
function renderBlocked(experience, pillar, bazi, exportFeedback) {
    return `<section class="stage-view bazi-pillar-view bazi-pillar-view--blocked" aria-labelledby="bazi-pillar-title">
    ${renderHero(experience, bazi)}
    <section class="bazi-panel bazi-unavailable-panel">
      <p class="eyebrow">Calculation blocked</p>
      <h3>BaZi &amp; TCM is not yet calculated</h3>
      <p>${escapeHtml(pillar.summary)}</p>
      ${pillar.limitations.length > 0 ? `<ul class="bazi-unavailable-list">${pillar.limitations.map((item) => `<li>${escapeHtml(item)}</li>`).join('')}</ul>` : ''}
      <button type="button" class="command-button-minimal" data-action="go-stage" data-stage="intake">Complete birth data</button>
    </section>
    ${renderPillarExportActions('bazi-tcm', exportFeedback)}
  </section>`;
}
function renderBenchmarkOrUnavailable(experience, pillar, exportFeedback) {
    if (pillar.status === 'benchmark') {
        return `<section class="stage-view bazi-pillar-view bazi-pillar-view--benchmark" aria-labelledby="bazi-pillar-title">
      <header class="bazi-hero bazi-hero--simple">
        <div class="bazi-hero-copy">
          <p class="eyebrow">Pillar &middot; BaZi &amp; TCM</p>
          <h1 id="bazi-pillar-title">BaZi &amp; TCM Pillar</h1>
          <p class="bazi-hero-subtitle">Four Pillars structure, Five Phase balance, and a traditional TCM correspondence layer.</p>
        </div>
      </header>
      <aside class="bazi-suppressed-banner" role="note">
        <span class="bazi-suppressed-banner-icon" aria-hidden="true">i</span>
        <div>
          <p><strong>Benchmark / demo profile.</strong></p>
          <p>${escapeHtml(pillar.summary)} No live Four Pillars chart is calculated in this mode.</p>
        </div>
      </aside>
      <footer class="bazi-source-bar">
        <div class="bazi-source-chips">
          ${sourceChip('Full Name', experience.input.fullName.trim() || 'Pending')}
          ${sourceChip('Birth Date', formatBirthDate(experience.input.birthDate))}
        </div>
        <button type="button" class="command-button-minimal" data-action="go-stage" data-stage="intake">Edit source data</button>
      </footer>
      ${renderPillarExportActions('bazi-tcm', exportFeedback)}
    </section>`;
    }
    return `<section class="stage-view bazi-pillar-view bazi-pillar-view--blocked" aria-labelledby="bazi-pillar-title">
    <header class="bazi-hero bazi-hero--simple">
      <div class="bazi-hero-copy">
        <p class="eyebrow">Pillar &middot; BaZi &amp; TCM</p>
        <h1 id="bazi-pillar-title">BaZi &amp; TCM Pillar</h1>
        <p class="bazi-hero-subtitle">Four Pillars structure, Five Phase balance, and a traditional TCM correspondence layer.</p>
      </div>
    </header>
    <section class="bazi-panel bazi-unavailable-panel">
      <p class="eyebrow">Not available</p>
      <h3>No BaZi &amp; TCM data is available for this profile yet</h3>
      <p>${escapeHtml(pillar.summary)}</p>
      <button type="button" class="command-button-minimal" data-action="go-stage" data-stage="intake">Complete birth data</button>
    </section>
    ${renderPillarExportActions('bazi-tcm', exportFeedback)}
  </section>`;
}
function formatBirthDate(value) {
    const match = /^(\d{4})-(\d{2})-(\d{2})$/.exec(value);
    if (!match)
        return 'Birth date pending';
    const [, year, month, day] = match;
    const monthName = MONTH_NAMES[Number(month) - 1] ?? month;
    return `${Number(day)} ${monthName} ${year}`;
}
