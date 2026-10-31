import { escapeAttribute, escapeHtml } from '../format.js?v=f9ab0a6';
import { getPillar } from '../model.js?v=f9ab0a6';
import { hdCenters } from '../human-design/data/hdCenters.js?v=f9ab0a6';
import { renderHumanDesignBodygraph } from './humanDesignBodygraph.js?v=f9ab0a6';
import { renderReferencePanel } from './referencePanel.js?v=f9ab0a6';
import { findHumanDesignAuthorityReference, findHumanDesignCenterReference, findHumanDesignDefinitionReference, findHumanDesignProfileReference, findHumanDesignStrategyReference, findHumanDesignTypeReference, } from '../reference/humanDesignReference.js?v=f9ab0a6';
import { renderPillarExportActions } from './pillarExportActions.js?v=f9ab0a6';
const MONTH_NAMES = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
const HD_CENTER_LABELS = Object.fromEntries(hdCenters.map((center) => [center.id, center.label]));
/** Standard astrological/Human Design body glyphs. Universal notation, not per-profile data. */
const PLANET_GLYPHS = {
    Sun: '☉',
    Earth: '⊕',
    Moon: '☽',
    'North Node': '☊',
    'South Node': '☋',
    Mercury: '☿',
    Venus: '♀',
    Mars: '♂',
    Jupiter: '♃',
    Saturn: '♄',
    Uranus: '♅',
    Neptune: '♆',
    Pluto: '♇',
};
/** Standard Human Design system reference tied 1:1 to Type (Ra Uru Hu system convention).
 *  This is a fixed universal mapping, not a per-profile calculation — the live engine does
 *  not yet expose Signature / Not-Self Theme, so this small lookup surfaces the standard
 *  reference value once Type has been calculated. It never runs when mechanics are suppressed. */
const HD_TYPE_SIGNATURE = {
    'Manifesting Generator': 'Satisfaction',
    Generator: 'Satisfaction',
    Manifestor: 'Peace',
    Projector: 'Success',
    Reflector: 'Surprise',
};
const HD_TYPE_NOT_SELF = {
    'Manifesting Generator': 'Frustration',
    Generator: 'Frustration',
    Manifestor: 'Anger',
    Projector: 'Bitterness',
    Reflector: 'Disappointment',
};
/** Commonly cited approximate population distribution across the five Types. Reference
 *  figures only — not calculated from this profile's data. */
const HD_TYPE_POPULATION = [
    { type: 'Generator', share: '~37%' },
    { type: 'Manifesting Generator', share: '~33%' },
    { type: 'Projector', share: '~20%' },
    { type: 'Manifestor', share: '~9%' },
    { type: 'Reflector', share: '~1%' },
];
export function renderHumanDesignPillarScreen(experience, exportFeedback = null) {
    const pillar = getPillar(experience, 'human-design');
    const bodygraphData = pillar.humanDesignBodygraph;
    if (!bodygraphData)
        return renderBenchmarkOrUnavailable(experience, pillar, exportFeedback);
    if (bodygraphData.humanDesign.status === 'blocked')
        return renderBlocked(experience, pillar, bodygraphData.humanDesign, exportFeedback);
    const { humanDesign, mechanicsSuppressed } = bodygraphData;
    return `<section class="stage-view hd-pillar-view" aria-labelledby="hd-pillar-title">
    ${renderHero(experience, humanDesign, mechanicsSuppressed)}
    ${mechanicsSuppressed ? renderSuppressedBanner() : ''}
    <div class="hd-pillar-main-grid">
      ${renderActivationColumn('design', humanDesign.designActivations, mechanicsSuppressed)}
      ${renderBodygraphCenterpiece(bodygraphData)}
      ${renderActivationColumn('personality', humanDesign.personalityActivations, mechanicsSuppressed)}
    </div>
    <div class="hd-pillar-panels-grid">
      ${renderBlueprintPanel(humanDesign, mechanicsSuppressed)}
      ${renderDefinedCentersPanel(humanDesign, mechanicsSuppressed)}
      ${renderChannelsGatesPanel(humanDesign, mechanicsSuppressed)}
      ${renderInsightPanel(pillar)}
      ${renderLegendPanel()}
      ${renderEnergyTypeOverviewPanel(humanDesign, mechanicsSuppressed)}
    </div>
    ${renderSourceBar(experience, humanDesign)}
    ${renderPillarExportActions('human-design', exportFeedback)}
  </section>`;
}
function renderHero(experience, humanDesign, mechanicsSuppressed) {
    const fullName = experience.input.fullName.trim() || 'Given name(s) pending';
    const birthDate = formatBirthDate(experience.input.birthDate);
    return `<header class="hd-hero">
    <div class="hd-hero-art" aria-hidden="true">${heroArtSvg()}</div>
    <div class="hd-hero-copy">
      <p class="eyebrow">Pillar &middot; Human Design</p>
      <h1 id="hd-pillar-title">Human Design Pillar</h1>
      <p class="hd-hero-subtitle">Energetic architecture of centers, channels, gates, and type.</p>
    </div>
    <div class="hd-hero-meta">
      ${heroMetaBlock('Full Name', fullName)}
      ${heroMetaBlock('Birth Date', birthDate)}
      ${heroMetaBlock('Engine', humanDesign.engine)}
      ${heroMetaBlock('Calculation Mode', mechanicsSuppressed ? 'Estimated (noon fallback)' : 'Exact birth moment')}
    </div>
  </header>`;
}
function heroMetaBlock(label, value) {
    return `<div class="hd-hero-meta-item">
    <span>${escapeHtml(label)}</span>
    <strong>${escapeHtml(value)}</strong>
  </div>`;
}
function heroArtSvg() {
    return `<svg class="hd-hero-svg" viewBox="0 0 640 320" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <radialGradient id="hd-hero-glow" cx="50%" cy="50%" r="60%">
        <stop offset="0%" stop-color="rgba(213,182,109,0.15)" />
        <stop offset="100%" stop-color="rgba(213,182,109,0)" />
      </radialGradient>
    </defs>
    <circle cx="490" cy="150" r="150" fill="url(#hd-hero-glow)" />
    <g fill="none" stroke="rgba(213,182,109,0.2)" stroke-width="1">
      <circle cx="490" cy="150" r="120" />
      <circle cx="490" cy="150" r="92" />
      <circle cx="490" cy="150" r="64" />
    </g>
    <g stroke="rgba(213,182,109,0.16)" stroke-width="1">
      ${Array.from({ length: 32 }, (_, index) => {
        const angle = (index / 32) * Math.PI * 2;
        const inner = 122;
        const outer = index % 4 === 0 ? 132 : 127;
        const x1 = 490 + Math.cos(angle) * inner;
        const y1 = 150 + Math.sin(angle) * inner;
        const x2 = 490 + Math.cos(angle) * outer;
        const y2 = 150 + Math.sin(angle) * outer;
        return `<line x1="${x1.toFixed(1)}" y1="${y1.toFixed(1)}" x2="${x2.toFixed(1)}" y2="${y2.toFixed(1)}" />`;
    }).join('')}
    </g>
    <g fill="rgba(105,183,173,0.45)">
      <circle cx="490" cy="30" r="1.6" />
      <circle cx="490" cy="270" r="1.6" />
      <circle cx="370" cy="150" r="1.6" />
      <circle cx="610" cy="150" r="1.6" />
    </g>
  </svg>`;
}
function renderSuppressedBanner() {
    return `<aside class="hd-suppressed-banner" role="note">
    <span class="hd-suppressed-banner-icon" aria-hidden="true">i</span>
    <div>
      <p><strong>Precise Human Design mechanics are suppressed because birth time is estimated.</strong></p>
      <p>Type, Strategy, Authority, Profile, Definition, Centers, Channels, and Gates are highly time-sensitive and are not shown as calculated. Provide an exact birth time to unlock them.</p>
    </div>
  </aside>`;
}
function renderActivationColumn(side, activations, mechanicsSuppressed) {
    const title = side === 'design' ? 'Design' : 'Personality';
    const subtitle = side === 'design' ? 'Unconscious' : 'Conscious';
    return `<aside class="hd-activation-column hd-activation-column--${side}" aria-label="${escapeHtml(title)} activations">
    <div class="hd-activation-column-title">
      <p class="eyebrow">${escapeHtml(subtitle)}</p>
      <h3>${escapeHtml(title)}</h3>
      ${mechanicsSuppressed ? '<span class="hd-approx-badge">Approximate</span>' : ''}
    </div>
    <ul class="hd-activation-list">
      ${activations.map((activation) => renderActivationRow(activation)).join('')}
    </ul>
  </aside>`;
}
function renderActivationRow(activation) {
    const glyph = PLANET_GLYPHS[activation.body] ?? '•';
    const { gate, line, color, tone, base } = activation.activation;
    const fullNotation = `Gate ${gate}.${line}.${color}.${tone}.${base} — ${activation.longitude.toFixed(4)}°`;
    return `<li class="hd-activation-row" title="${escapeHtml(fullNotation)}">
    <span class="hd-activation-glyph" aria-hidden="true">${glyph}</span>
    <span class="hd-activation-body">${escapeHtml(activation.body)}</span>
    <span class="hd-activation-notation">${gate}<small>.${line}</small></span>
  </li>`;
}
function renderBodygraphCenterpiece(bodygraphData) {
    return `<div class="hd-bodygraph-frame">
    <div class="hd-bodygraph-frame-rings" aria-hidden="true"></div>
    ${renderHumanDesignBodygraph(bodygraphData)}
  </div>`;
}
function renderBlueprintPanel(humanDesign, mechanicsSuppressed) {
    const type = humanDesign.type;
    const showTypeDerived = !mechanicsSuppressed && type !== 'Unavailable';
    const rows = mechanicsSuppressed
        ? [
            { label: 'Type', value: 'Suppressed', reference: null },
            { label: 'Strategy', value: 'Suppressed', reference: null },
            { label: 'Authority', value: 'Suppressed', reference: null },
            { label: 'Profile', value: 'Suppressed', reference: null },
            { label: 'Definition', value: 'Suppressed', reference: null },
            { label: 'Signature', value: 'Unavailable', reference: null },
            { label: 'Not-Self Theme', value: 'Unavailable', reference: null },
        ]
        : [
            {
                label: 'Type',
                value: humanDesign.type,
                reference: humanDesign.type !== 'Unavailable' ? findHumanDesignTypeReference(humanDesign.type) : null,
            },
            {
                label: 'Strategy',
                value: humanDesign.strategy,
                reference: humanDesign.strategy !== 'Unavailable' ? findHumanDesignStrategyReference(humanDesign.strategy) : null,
            },
            {
                label: 'Authority',
                value: humanDesign.authority,
                reference: humanDesign.authority !== 'Unavailable' ? findHumanDesignAuthorityReference(humanDesign.authority) : null,
            },
            {
                label: 'Profile',
                value: humanDesign.profile ?? 'Unavailable',
                reference: humanDesign.profile ? findHumanDesignProfileReference(humanDesign.profile) : null,
            },
            {
                label: 'Definition',
                value: humanDesign.definition,
                reference: humanDesign.definition !== 'Unavailable' ? findHumanDesignDefinitionReference(humanDesign.definition) : null,
            },
            {
                label: 'Signature',
                value: showTypeDerived ? (HD_TYPE_SIGNATURE[type] ?? 'Unavailable') : 'Unavailable',
                reference: null,
            },
            {
                label: 'Not-Self Theme',
                value: showTypeDerived ? (HD_TYPE_NOT_SELF[type] ?? 'Unavailable') : 'Unavailable',
                reference: null,
            },
        ];
    return `<section class="hd-panel hd-blueprint-panel" aria-labelledby="hd-blueprint-title">
    <div class="hd-panel-title-row">
      <p class="eyebrow">Your Blueprint</p>
      <h3 id="hd-blueprint-title">Core Mechanics</h3>
    </div>
    <div class="hd-blueprint-grid">
      ${rows.map((row) => renderBlueprintRow(row)).join('')}
    </div>
    <p class="hd-panel-footnote">Type, Strategy, Authority, Profile, and Definition are calculated locally from the completed-channel center graph. Signature and Not-Self Theme are standard Human Design system reference values tied to the calculated Type, not separately computed by the engine.</p>
  </section>`;
}
function renderBlueprintRow(row) {
    const rowBody = `<span>${escapeHtml(row.label)}</span>
      <strong>${escapeHtml(row.value)}</strong>`;
    if (!row.reference) {
        return `<div class="hd-blueprint-row">${rowBody}</div>`;
    }
    return `<details class="hd-reference-detail" name="hd-reference-group">
    <summary class="hd-blueprint-row" aria-label="${escapeAttribute(`${row.label} ${row.value}, view symbolic reference`)}">${rowBody}</summary>
    ${renderReferencePanel(row.reference)}
  </details>`;
}
function renderDefinedCentersPanel(humanDesign, mechanicsSuppressed) {
    const definedSet = new Set(mechanicsSuppressed ? [] : humanDesign.definedCenters);
    return `<section class="hd-panel hd-centers-panel" aria-labelledby="hd-centers-title">
    <div class="hd-panel-title-row">
      <p class="eyebrow">Structure</p>
      <h3 id="hd-centers-title">Defined Centers</h3>
    </div>
    <div class="hd-center-chip-row">
      ${hdCenters.map((center) => renderCenterChip(center, definedSet.has(center.id), mechanicsSuppressed)).join('')}
    </div>
    <p class="hd-panel-footnote">${mechanicsSuppressed ? 'Suppressed until an exact birth time is provided.' : `${humanDesign.definedCenters.length} of 9 centers defined through completed channels. ${humanDesign.definition}.`}</p>
  </section>`;
}
function renderCenterChip(center, isDefined, mechanicsSuppressed) {
    const chipClass = `hd-center-chip${isDefined ? ' is-defined' : ''}`;
    const reference = mechanicsSuppressed ? null : findHumanDesignCenterReference(center.id, center.label);
    if (!reference) {
        return `<span class="${chipClass}">${escapeHtml(center.label)}</span>`;
    }
    return `<details class="hd-reference-detail" name="hd-reference-group">
    <summary class="${chipClass}" aria-label="${escapeAttribute(`${center.label} center${isDefined ? ', defined' : ', undefined'}, view symbolic reference`)}">${escapeHtml(center.label)}</summary>
    ${renderReferencePanel(reference)}
  </details>`;
}
function renderChannelsGatesPanel(humanDesign, mechanicsSuppressed) {
    const channels = mechanicsSuppressed ? [] : humanDesign.definedChannels;
    const gates = mechanicsSuppressed ? [] : humanDesign.activatedGates;
    return `<section class="hd-panel hd-channels-panel" aria-labelledby="hd-channels-title">
    <div class="hd-panel-title-row">
      <p class="eyebrow">Connectivity</p>
      <h3 id="hd-channels-title">Channels &amp; Gates</h3>
    </div>
    <div class="hd-stat-row">
      <div class="hd-stat"><strong>${channels.length}</strong><span>Defined channels</span></div>
      <div class="hd-stat"><strong>${gates.length}</strong><span>Activated gates</span></div>
    </div>
    ${channels.length > 0 ? `<div class="hd-chip-wrap">${channels.map((channel) => `<span class="hd-gate-chip">${escapeHtml(channel.id)}</span>`).join('')}</div>` : ''}
    ${gates.length > 0 ? `<div class="hd-chip-wrap hd-chip-wrap--gates">${gates.map((gate) => `<span class="hd-gate-chip hd-gate-chip--muted">${gate}</span>`).join('')}</div>` : ''}
    <p class="hd-panel-footnote">${mechanicsSuppressed ? 'Suppressed until an exact birth time is provided.' : 'A channel is defined only when both connecting gates are activated across Personality and Design.'}</p>
  </section>`;
}
function renderInsightPanel(pillar) {
    return `<section class="hd-panel hd-insight-panel" aria-labelledby="hd-insight-title">
    <div class="hd-panel-title-row">
      <p class="eyebrow">&#10022; Reading</p>
      <h3 id="hd-insight-title">Insight</h3>
    </div>
    <p class="hd-insight-lead">${escapeHtml(pillar.interpretation)}</p>
    <div class="hd-insight-block">
      <h4>Life</h4>
      <p>${escapeHtml(pillar.relevance.life)}</p>
    </div>
    <div class="hd-insight-block">
      <h4>Work</h4>
      <p>${escapeHtml(pillar.relevance.work)}</p>
    </div>
    <div class="hd-insight-block">
      <h4>Relationships</h4>
      <p>${escapeHtml(pillar.relevance.relationships)}</p>
    </div>
    <p class="hd-panel-footnote">Presented as symbolic reflection, not fate, diagnosis, or identity certainty.</p>
  </section>`;
}
function renderLegendPanel() {
    return `<section class="hd-panel hd-legend-panel" aria-labelledby="hd-legend-title">
    <div class="hd-panel-title-row">
      <p class="eyebrow">Reference</p>
      <h3 id="hd-legend-title">Center Legend</h3>
    </div>
    <div class="hd-legend-grid">
      <div class="hd-legend-item"><span class="hd-legend-swatch is-defined" aria-hidden="true"></span>Defined</div>
      <div class="hd-legend-item"><span class="hd-legend-swatch is-undefined" aria-hidden="true"></span>Undefined / Open</div>
      <div class="hd-legend-item"><span class="hd-legend-line is-path" aria-hidden="true"></span>Motor-to-Throat path</div>
      <div class="hd-legend-item"><span class="hd-legend-line is-channel" aria-hidden="true"></span>Defined channel</div>
    </div>
    <p class="hd-panel-footnote">Centers are defined only through fully completed channels &mdash; a single activated gate never defines a center on its own.</p>
  </section>`;
}
function renderEnergyTypeOverviewPanel(humanDesign, mechanicsSuppressed) {
    const currentType = mechanicsSuppressed ? null : humanDesign.type;
    return `<section class="hd-panel hd-energy-overview-panel" aria-labelledby="hd-energy-overview-title">
    <div class="hd-panel-title-row">
      <p class="eyebrow">Reference</p>
      <h3 id="hd-energy-overview-title">The Five Energy Types</h3>
      <span class="hd-placeholder-badge">Commonly cited reference figures</span>
    </div>
    <div class="hd-energy-type-grid">
      ${HD_TYPE_POPULATION.map((entry) => `<div class="hd-energy-type-card${entry.type === currentType ? ' is-current' : ''}">
        <strong>${escapeHtml(entry.type)}</strong>
        <span>${escapeHtml(entry.share)}</span>
      </div>`).join('')}
    </div>
    <p class="hd-panel-footnote">Population shares are commonly cited approximate figures from Human Design reference material, not calculated from this profile.</p>
  </section>`;
}
function renderSourceBar(experience, humanDesign) {
    const input = experience.input;
    const birthTime = input.birthTime.trim() || 'Unknown (local-noon estimate)';
    return `<footer class="hd-source-bar">
    <div class="hd-source-chips">
      ${sourceChip('Full Name', input.fullName.trim() || 'Pending')}
      ${sourceChip('Birth Date', formatBirthDate(input.birthDate))}
      ${sourceChip('Birth Time', birthTime)}
    </div>
    <button type="button" class="command-button-minimal" data-action="go-stage" data-stage="intake">Edit source data</button>
    <div class="hd-source-system">
      <span>Engine: <strong>${escapeHtml(humanDesign.engine)}</strong></span>
    </div>
  </footer>`;
}
function sourceChip(label, value) {
    return `<div class="hd-source-chip">
    <span>${escapeHtml(label)}</span>
    <strong>${escapeHtml(value)}</strong>
  </div>`;
}
function renderBlocked(experience, pillar, humanDesign, exportFeedback) {
    return `<section class="stage-view hd-pillar-view hd-pillar-view--blocked" aria-labelledby="hd-pillar-title">
    ${renderHero(experience, humanDesign, true)}
    <section class="hd-panel hd-unavailable-panel">
      <p class="eyebrow">Calculation blocked</p>
      <h3>Human Design is not yet calculated</h3>
      <p>${escapeHtml(pillar.summary)}</p>
      ${pillar.limitations.length > 0 ? `<ul class="hd-unavailable-list">${pillar.limitations.map((item) => `<li>${escapeHtml(item)}</li>`).join('')}</ul>` : ''}
      <button type="button" class="command-button-minimal" data-action="go-stage" data-stage="intake">Complete birth data</button>
    </section>
    ${renderPillarExportActions('human-design', exportFeedback)}
  </section>`;
}
function renderBenchmarkOrUnavailable(experience, pillar, exportFeedback) {
    if (pillar.status === 'benchmark') {
        return `<section class="stage-view hd-pillar-view hd-pillar-view--benchmark" aria-labelledby="hd-pillar-title">
      <header class="hd-hero hd-hero--simple">
        <div class="hd-hero-copy">
          <p class="eyebrow">Pillar &middot; Human Design</p>
          <h1 id="hd-pillar-title">Human Design Pillar</h1>
          <p class="hd-hero-subtitle">Energetic architecture of centers, channels, gates, and type.</p>
        </div>
      </header>
      <aside class="hd-suppressed-banner" role="note">
        <span class="hd-suppressed-banner-icon" aria-hidden="true">i</span>
        <div>
          <p><strong>Benchmark / demo profile.</strong></p>
          <p>${escapeHtml(pillar.summary)} No live BodyGraph is calculated in this mode.</p>
        </div>
      </aside>
      <div class="hd-pillar-panels-grid">
        <section class="hd-panel hd-blueprint-panel">
          <div class="hd-panel-title-row">
            <p class="eyebrow">Documented Benchmark</p>
            <h3>Core Mechanics</h3>
          </div>
          <div class="hd-blueprint-grid">
            ${benchmarkBlueprintRows(pillar.keyOutputs).map((row) => `<div class="hd-blueprint-row">
              <span>${escapeHtml(row.label)}</span>
              <strong>${escapeHtml(row.value)}</strong>
            </div>`).join('')}
          </div>
          <p class="hd-panel-footnote">These values come from the repository benchmark document, not a live Human Design engine.</p>
        </section>
        ${renderInsightPanel(pillar)}
      </div>
      <footer class="hd-source-bar">
        <div class="hd-source-chips">
          ${sourceChip('Full Name', experience.input.fullName.trim() || 'Pending')}
          ${sourceChip('Birth Date', formatBirthDate(experience.input.birthDate))}
        </div>
        <button type="button" class="command-button-minimal" data-action="go-stage" data-stage="intake">Edit source data</button>
      </footer>
      ${renderPillarExportActions('human-design', exportFeedback)}
    </section>`;
    }
    return `<section class="stage-view hd-pillar-view hd-pillar-view--blocked" aria-labelledby="hd-pillar-title">
    <header class="hd-hero hd-hero--simple">
      <div class="hd-hero-copy">
        <p class="eyebrow">Pillar &middot; Human Design</p>
        <h1 id="hd-pillar-title">Human Design Pillar</h1>
        <p class="hd-hero-subtitle">Energetic architecture of centers, channels, gates, and type.</p>
      </div>
    </header>
    <section class="hd-panel hd-unavailable-panel">
      <p class="eyebrow">Not available</p>
      <h3>No Human Design data is available for this profile yet</h3>
      <p>${escapeHtml(pillar.summary)}</p>
      <button type="button" class="command-button-minimal" data-action="go-stage" data-stage="intake">Complete birth data</button>
    </section>
    ${renderPillarExportActions('human-design', exportFeedback)}
  </section>`;
}
function benchmarkBlueprintRows(keyOutputs) {
    const labels = ['Type', 'Strategy', 'Authority', 'Profile', 'Definition'];
    return labels.map((label) => ({
        label,
        value: keyOutputs.find((output) => output.label === label)?.value ?? 'Unavailable',
    }));
}
function formatBirthDate(value) {
    const match = /^(\d{4})-(\d{2})-(\d{2})$/.exec(value);
    if (!match)
        return 'Birth date pending';
    const [, year, month, day] = match;
    const monthName = MONTH_NAMES[Number(month) - 1] ?? month;
    return `${Number(day)} ${monthName} ${year}`;
}
