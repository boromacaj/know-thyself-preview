import { escapeHtml, pillarLabel } from '../format.js?v=2ea79e9';
import { formatCoordinate, precisionLabel, sourceLabel } from '../locationPickerModel.js?v=2ea79e9';
import { commandButton, definitionList, stageIntro, textList } from './common.js?v=2ea79e9';
import { renderGlobalExportActions } from './pillarExportActions.js?v=2ea79e9';
export function renderTechnicalAppendix(experience, exportFeedback = null) {
    const profile = experience.coreResult.profile;
    const sourceInput = experience.input;
    const calculated = experience.pillars.filter((pillar) => pillar.source.kind === 'calculated-engine-output');
    const benchmark = experience.pillars.filter((pillar) => pillar.source.kind === 'benchmark-source-data');
    const unavailable = experience.pillars.filter((pillar) => pillar.source.kind === 'unavailable');
    return `<section class="stage-view appendix-view" aria-labelledby="appendix-title">
    ${stageIntro('05 / Audit trail', 'Technical Appendix', 'Inputs, formula traces, source status, and limitations are available here without dominating the reflective experience.', 'Deterministic transparency').replace('<h1>', '<h1 id="appendix-title">')}

    <section class="appendix-source">
      <div class="section-title-row"><p class="eyebrow">Raw inputs</p><h2>Profile source record</h2></div>
      ${definitionList([
        { label: 'Full birth name', value: profile.identity.birthFullName },
        { label: 'Normalized name', value: profile.identity.normalizedBirthFullName },
        { label: 'Birth date', value: profile.input.birthDate },
        { label: 'Birth time', value: profile.input.birthTime ?? 'Not supplied' },
        { label: 'Birth place raw text', value: sourceInput.birthPlaceText || 'Not supplied' },
        { label: 'Birth latitude', value: formatCoordinate(sourceInput.birthLatitude) },
        { label: 'Birth longitude', value: formatCoordinate(sourceInput.birthLongitude) },
        { label: 'Location precision', value: precisionLabel(sourceInput.birthLocationPrecision) },
        { label: 'Location source', value: sourceLabel(sourceInput.birthLocationSource) },
        { label: 'Resolved place label', value: sourceInput.resolvedPlaceLabel ?? 'Not resolved' },
        { label: 'Birth country', value: sourceInput.birthCountry ?? 'Not resolved' },
        { label: 'Birth region', value: sourceInput.birthRegion ?? 'Not resolved' },
        { label: 'Location provider', value: sourceInput.birthLocationProvider ?? 'None' },
        { label: 'Resolved IANA birth timezone', value: sourceInput.birthTimeZone ?? 'Not resolved' },
        { label: 'Timezone source', value: sourceInput.birthTimeZoneSource ?? 'Unavailable' },
        { label: 'Timezone confidence', value: sourceInput.birthTimeZoneConfidence },
        { label: 'Timezone limitations', value: sourceInput.birthTimeZoneLimitations.join(' ') || 'None' },
        { label: 'Input confidence', value: profile.input.uncertainty.inputConfidence },
    ], 'appendix-definition-list')}
    </section>

    <section class="appendix-source-separation">
      <div><p class="eyebrow">Calculated engine output</p>${calculated.map(sourcePill).join('') || '<span>None</span>'}</div>
      <div><p class="eyebrow">Benchmark source data</p>${benchmark.map(sourcePill).join('') || '<span>None</span>'}</div>
      <div><p class="eyebrow">Unavailable</p>${unavailable.map(sourcePill).join('') || '<span>None</span>'}</div>
    </section>

    <section class="appendix-synthesis-source">
      <p class="eyebrow">Synthesis provenance</p>
      ${definitionList([
        { label: 'Source type', value: experience.synthesisSource.label },
        { label: 'Reference', value: experience.synthesisSource.reference },
        { label: 'Boundary', value: experience.synthesisSource.detail },
    ])}
    </section>

    <div class="appendix-pillar-list">
      ${experience.pillars.map(appendixPillar).join('')}
    </div>

    <section class="transparency-notes">
      <div class="section-title-row"><p class="eyebrow">Deterministic boundaries</p><h2>What this build does not do</h2></div>
      ${textList([
        'No external astrology or ephemeris API is used. Configured Google services are limited to map, place, and timezone resolution.',
        'No AI model, authentication, database, payment, or export service is used.',
        experience.mode === 'benchmark-demo'
            ? 'Astrology, BaZi / TCM, and Human Design values are reproduced from named repository benchmark documents and are not presented as live calculations.'
            : 'Western Astrology, BaZi / TCM, and Human Design are calculated locally only from a valid normalized birth moment. Blocked or time-unknown values remain visibly unavailable or approximate.',
        'Missing birth time remains missing and limits future time-sensitive outputs.',
        'Selected coordinates establish Astrology location provenance. Tropical planet longitudes are geocentric; houses and angles remain unimplemented.',
        'The astronomical ephemeris runs locally through astronomy-engine; no external ephemeris API is called.',
        'Symbolic output is presented for reflection, not medical, psychological, predictive, or identity certainty.',
    ])}
    </section>

    <footer class="stage-actions">
      <div><strong>Audit complete</strong><span>Edit the source profile to begin another deterministic pass.</span></div>
      ${commandButton('Edit source profile', 'edit-profile', 'secondary')}
    </footer>
    ${renderGlobalExportActions(exportFeedback)}
  </section>`;
}
function appendixPillar(pillar) {
    return `<details class="appendix-pillar">
    <summary><span><strong>${escapeHtml(pillarLabel(pillar.id))}</strong><small>${escapeHtml(pillar.source.label)} / ${escapeHtml(pillar.statusLabel)}</small></span><span aria-hidden="true">+</span></summary>
    <div>
      <section class="appendix-group"><h3>Source provenance</h3>${definitionList([
        { label: 'Source type', value: pillar.source.label },
        { label: 'Reference', value: pillar.source.reference },
        { label: 'Boundary', value: pillar.source.detail },
    ])}</section>
      ${pillar.technicalGroups.map((group) => `<section class="appendix-group"><h3>${escapeHtml(group.title)}</h3>${definitionList(group.facts)}</section>`).join('')}
      <section class="appendix-group"><h3>Limitations</h3>${textList(pillar.limitations)}</section>
    </div>
  </details>`;
}
function sourcePill(pillar) {
    return `<span><strong>${escapeHtml(pillarLabel(pillar.id))}</strong>${escapeHtml(pillar.source.reference)}</span>`;
}
