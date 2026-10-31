import { escapeHtml } from '../format.js?v=f9ab0a6';
import { getPillar } from '../model.js?v=f9ab0a6';
import { renderAstrologyChartWheel } from './astrologyChartWheel.js?v=f9ab0a6';
import { renderPillarExportActions } from './pillarExportActions.js?v=f9ab0a6';
const MONTH_NAMES = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
const PLANET_GLYPHS = {
    Sun: '☉', Moon: '☽', Mercury: '☿', Venus: '♀', Mars: '♂',
    Jupiter: '♃', Saturn: '♄', Uranus: '♅', Neptune: '♆', Pluto: '♇',
    'North Node': '☊', 'South Node': '☋',
};
const ZODIAC_SIGNS_ORDER = [
    'Aries', 'Taurus', 'Gemini', 'Cancer', 'Leo', 'Virgo',
    'Libra', 'Scorpio', 'Sagittarius', 'Capricorn', 'Aquarius', 'Pisces',
];
function placementFromLongitude(longitude) {
    const normalized = ((longitude % 360) + 360) % 360;
    const signIndex = Math.floor(normalized / 30) % 12;
    return { sign: ZODIAC_SIGNS_ORDER[signIndex], degreeInSign: normalized - signIndex * 30 };
}
const ASPECT_SWATCH = {
    Conjunction: 'rgba(213,182,109,0.85)',
    Sextile: 'rgba(105,183,173,0.6)',
    Square: 'rgba(224,122,95,0.85)',
    Trine: 'rgba(105,183,173,0.9)',
    Opposition: 'rgba(196,90,90,0.9)',
};
export function renderWesternAstrologyPillarScreen(experience, exportFeedback = null) {
    const pillar = getPillar(experience, 'western-astrology');
    const chartData = pillar.westernAstrologyChart;
    if (!chartData)
        return renderBenchmarkOrUnavailable(experience, pillar, exportFeedback);
    if (chartData.astrology.status === 'blocked')
        return renderBlocked(experience, pillar, chartData.astrology, exportFeedback);
    const { astrology, anglesSuppressed } = chartData;
    return `<section class="stage-view astro-pillar-view" aria-labelledby="astro-pillar-title">
    ${renderHero(experience, astrology, anglesSuppressed)}
    ${anglesSuppressed ? renderSuppressedBanner() : ''}
    <div class="astro-pillar-main-grid">
      ${renderBigThreeColumn(astrology, anglesSuppressed)}
      ${renderAstrologyChartWheel(chartData)}
      ${renderQuickFactsColumn(astrology, anglesSuppressed)}
    </div>
    <div class="astro-pillar-panels-grid">
      ${renderPlacementsPanel(astrology)}
      ${renderAnglesHousesPanel(astrology, anglesSuppressed)}
      ${renderAspectsPanel(astrology)}
      ${renderBalancesPanel(astrology, anglesSuppressed)}
      ${renderInsightPanel(pillar)}
      ${renderLegendPanel(astrology)}
    </div>
    ${renderSourceBar(experience, astrology)}
    ${renderPillarExportActions('western-astrology', exportFeedback)}
  </section>`;
}
function renderHero(experience, astrology, anglesSuppressed) {
    const fullName = experience.input.fullName.trim() || 'Given name(s) pending';
    const birthDate = formatBirthDate(experience.input.birthDate);
    return `<header class="astro-hero">
    <div class="astro-hero-art" aria-hidden="true">${heroArtSvg()}</div>
    <div class="astro-hero-copy">
      <p class="eyebrow">Pillar &middot; Western Astrology</p>
      <h1 id="astro-pillar-title">Western Astrology Pillar</h1>
      <p class="astro-hero-subtitle">Tropical natal chart: planets, signs, houses, angles, and aspects.</p>
    </div>
    <div class="astro-hero-meta">
      ${heroMetaBlock('Full Name', fullName)}
      ${heroMetaBlock('Birth Date', birthDate)}
      ${heroMetaBlock('Engine', astrology.ephemeris?.engine ?? 'Unavailable')}
      ${heroMetaBlock('Calculation Mode', anglesSuppressed ? 'Estimated (noon fallback)' : 'Exact birth moment')}
    </div>
  </header>`;
}
function heroMetaBlock(label, value) {
    return `<div class="astro-hero-meta-item">
    <span>${escapeHtml(label)}</span>
    <strong>${escapeHtml(value)}</strong>
  </div>`;
}
function heroArtSvg() {
    return `<svg class="astro-hero-svg" viewBox="0 0 640 320" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <radialGradient id="astro-hero-glow" cx="50%" cy="50%" r="60%">
        <stop offset="0%" stop-color="rgba(105,183,173,0.16)" />
        <stop offset="100%" stop-color="rgba(105,183,173,0)" />
      </radialGradient>
    </defs>
    <circle cx="150" cy="150" r="150" fill="url(#astro-hero-glow)" />
    <g fill="none" stroke="rgba(213,182,109,0.2)" stroke-width="1">
      <circle cx="150" cy="150" r="120" />
      <circle cx="150" cy="150" r="92" />
      <circle cx="150" cy="150" r="64" />
    </g>
    <g stroke="rgba(213,182,109,0.16)" stroke-width="1">
      ${Array.from({ length: 12 }, (_, index) => {
        const angle = (index / 12) * Math.PI * 2;
        const inner = 122;
        const outer = 132;
        const x1 = 150 + Math.cos(angle) * inner;
        const y1 = 150 + Math.sin(angle) * inner;
        const x2 = 150 + Math.cos(angle) * outer;
        const y2 = 150 + Math.sin(angle) * outer;
        return `<line x1="${x1.toFixed(1)}" y1="${y1.toFixed(1)}" x2="${x2.toFixed(1)}" y2="${y2.toFixed(1)}" />`;
    }).join('')}
    </g>
  </svg>`;
}
function renderSuppressedBanner() {
    return `<aside class="astro-suppressed-banner" role="note">
    <span class="astro-suppressed-banner-icon" aria-hidden="true">i</span>
    <div>
      <p><strong>Ascendant, Midheaven, houses, and chart ruler are suppressed because birth time is estimated.</strong></p>
      <p>Planets, signs, retrogrades, and the Moon phase remain shown; house-dependent output is highly time-sensitive and is not shown as calculated. Provide an exact birth time to unlock it.</p>
    </div>
  </aside>`;
}
function renderBigThreeColumn(astrology, anglesSuppressed) {
    const sun = astrology.ephemeris?.positions.find((item) => item.body === 'Sun');
    const moon = astrology.ephemeris?.positions.find((item) => item.body === 'Moon');
    const ascendant = !anglesSuppressed ? astrology.houses?.angles.ascendant : null;
    return `<aside class="astro-bigthree-column" aria-label="Big Three placements">
    <div class="astro-bigthree-title">
      <p class="eyebrow">Big Three</p>
      <h3>Sun &middot; Moon &middot; Ascendant</h3>
    </div>
    <ul class="astro-bigthree-list">
      ${bigThreeRow('Sun', sun ? `${sun.sign} ${formatDegree(sun.degreeInSign)}` : 'Unavailable')}
      ${bigThreeRow('Moon', moon ? `${moon.sign} ${formatDegree(moon.degreeInSign)}` : 'Unavailable')}
      ${bigThreeRow('Ascendant', ascendant ? `${ascendant.sign} ${formatDegree(ascendant.degreeInSign)}` : anglesSuppressed ? 'Suppressed' : 'Unavailable')}
    </ul>
  </aside>`;
}
function bigThreeRow(label, value) {
    const glyph = PLANET_GLYPHS[label] ?? '';
    return `<li class="astro-bigthree-row">
    <span class="astro-bigthree-glyph" aria-hidden="true">${glyph}</span>
    <span class="astro-bigthree-label">${escapeHtml(label)}</span>
    <strong class="astro-bigthree-value">${escapeHtml(value)}</strong>
  </li>`;
}
function renderQuickFactsColumn(astrology, anglesSuppressed) {
    const moonPhase = astrology.ephemeris?.moonPhase;
    const dominantElement = dominantKey(astrology.elementBalance);
    const dominantModality = dominantKey(astrology.modalityBalance);
    const chartRuler = !anglesSuppressed && astrology.chartRuler ? `${astrology.chartRuler.body} (${astrology.chartRuler.sign})` : anglesSuppressed ? 'Suppressed' : 'Unavailable';
    return `<aside class="astro-quickfacts-column" aria-label="Chart quick facts">
    <div class="astro-bigthree-title">
      <p class="eyebrow">Quick Facts</p>
      <h3>Chart Summary</h3>
    </div>
    <ul class="astro-quickfacts-list">
      <li><span>Moon phase</span><strong>${escapeHtml(moonPhase?.name ?? 'Unavailable')}</strong></li>
      <li><span>Chart ruler</span><strong>${escapeHtml(chartRuler)}</strong></li>
      <li><span>Dominant element</span><strong>${escapeHtml(dominantElement)}</strong></li>
      <li><span>Dominant modality</span><strong>${escapeHtml(dominantModality)}</strong></li>
      <li><span>Retrograde bodies</span><strong>${astrology.retrogradeBodies.length > 0 ? escapeHtml(astrology.retrogradeBodies.join(', ')) : 'None'}</strong></li>
    </ul>
  </aside>`;
}
function renderPlacementsPanel(astrology) {
    const ephemeris = astrology.ephemeris;
    const bodies = ephemeris ? [...ephemeris.positions, ...ephemeris.points] : [];
    const housesByBody = new Map((astrology.houses?.planetHouses ?? []).map((placement) => [placement.body, placement.house]));
    return `<section class="astro-panel astro-placements-panel" aria-labelledby="astro-placements-title">
    <div class="astro-panel-title-row">
      <p class="eyebrow">Calculated</p>
      <h3 id="astro-placements-title">Planetary Placements</h3>
    </div>
    <div class="astro-placement-table" role="table" aria-label="Planet, sign, degree, house, and motion">
      <div class="astro-placement-row astro-placement-head" role="row">
        <span role="columnheader">Body</span>
        <span role="columnheader">Sign</span>
        <span role="columnheader">Degree</span>
        <span role="columnheader">House</span>
        <span role="columnheader">Motion</span>
      </div>
      ${bodies.map((body) => `<div class="astro-placement-row" role="row">
        <strong role="cell"><span aria-hidden="true">${PLANET_GLYPHS[body.body] ?? ''}</span> ${escapeHtml(body.body)}</strong>
        <span role="cell">${escapeHtml(body.sign)}</span>
        <span role="cell">${formatDegree(body.degreeInSign)}</span>
        <span role="cell">${housesByBody.has(body.body) ? `House ${housesByBody.get(body.body)}` : 'Unavailable'}</span>
        <span role="cell" class="astro-motion-${body.motionState}">${body.motionState}</span>
      </div>`).join('')}
    </div>
    <p class="astro-panel-footnote">Sign, degree, and motion are calculated for every birth time basis. House placement requires an exact birth time.</p>
  </section>`;
}
function renderAnglesHousesPanel(astrology, anglesSuppressed) {
    const houses = astrology.houses;
    if (anglesSuppressed || !houses) {
        return `<section class="astro-panel astro-angles-panel" aria-labelledby="astro-angles-title">
      <div class="astro-panel-title-row">
        <p class="eyebrow">Structure</p>
        <h3 id="astro-angles-title">Angles &amp; Houses</h3>
      </div>
      <p class="astro-panel-footnote">${anglesSuppressed ? 'Suppressed until an exact birth time is provided.' : 'Unavailable: coordinates and a normalized birth moment are required.'}</p>
    </section>`;
    }
    const dsc = placementFromLongitude(houses.angles.ascendant.longitude + 180);
    const ic = placementFromLongitude(houses.angles.midheaven.longitude + 180);
    return `<section class="astro-panel astro-angles-panel" aria-labelledby="astro-angles-title">
    <div class="astro-panel-title-row">
      <p class="eyebrow">Structure</p>
      <h3 id="astro-angles-title">Angles &amp; Houses</h3>
    </div>
    <div class="astro-angle-grid">
      <div><span>Ascendant</span><strong>${escapeHtml(houses.angles.ascendant.sign)} ${formatDegree(houses.angles.ascendant.degreeInSign)}</strong></div>
      <div><span>Descendant</span><strong>${escapeHtml(dsc.sign)} ${formatDegree(dsc.degreeInSign)}</strong></div>
      <div><span>Midheaven (MC)</span><strong>${escapeHtml(houses.angles.midheaven.sign)} ${formatDegree(houses.angles.midheaven.degreeInSign)}</strong></div>
      <div><span>Imum Coeli (IC)</span><strong>${escapeHtml(ic.sign)} ${formatDegree(ic.degreeInSign)}</strong></div>
    </div>
    <div class="astro-house-list">
      ${houses.houses.map((house) => `<div class="astro-house-chip"><span>H${house.house}</span><strong>${escapeHtml(house.sign)}</strong></div>`).join('')}
    </div>
    <p class="astro-panel-footnote">House system: ${escapeHtml(houses.system)}. Whole Sign: each house spans one full sign starting at the Ascendant's sign.</p>
  </section>`;
}
function renderAspectsPanel(astrology) {
    const aspects = astrology.aspects;
    return `<section class="astro-panel astro-aspects-panel" aria-labelledby="astro-aspects-title">
    <div class="astro-panel-title-row">
      <p class="eyebrow">Relationships</p>
      <h3 id="astro-aspects-title">Major Aspects</h3>
      <span class="astro-count-badge">${aspects.length}</span>
    </div>
    ${aspects.length > 0
        ? `<ul class="astro-aspect-list">${aspects.map((aspect) => `<li>
          <span class="astro-aspect-swatch" style="background:${ASPECT_SWATCH[aspect.aspect]}" aria-hidden="true"></span>
          <span class="astro-aspect-bodies">${escapeHtml(aspect.bodyA)} ${escapeHtml(aspect.aspect)} ${escapeHtml(aspect.bodyB)}</span>
          <span class="astro-aspect-orb">orb ${aspect.orb.toFixed(2)}&deg;</span>
        </li>`).join('')}</ul>`
        : '<p class="empty-state">No major aspects within the configured orb limits.</p>'}
    <p class="astro-panel-footnote">Conjunction 0&deg;, sextile 60&deg;, square 90&deg;, trine 120&deg;, opposition 180&deg;. Orb allowance: 8&deg; for luminary pairs, 6&deg; for personal-planet pairs, 4&deg; otherwise.</p>
  </section>`;
}
function renderBalancesPanel(astrology, anglesSuppressed) {
    const elements = Object.entries(astrology.elementBalance);
    const modalities = Object.entries(astrology.modalityBalance);
    const hemisphere = !anglesSuppressed ? astrology.hemisphereBalance : null;
    return `<section class="astro-panel astro-balances-panel" aria-labelledby="astro-balances-title">
    <div class="astro-panel-title-row">
      <p class="eyebrow">Derived</p>
      <h3 id="astro-balances-title">Element &amp; Modality Balance</h3>
    </div>
    <div class="astro-balance-group">
      <p class="astro-balance-group-label">Elements (10 classical bodies)</p>
      ${elements.map(([label, count]) => balanceBar(label, count, 10)).join('')}
    </div>
    <div class="astro-balance-group">
      <p class="astro-balance-group-label">Modalities (10 classical bodies)</p>
      ${modalities.map(([label, count]) => balanceBar(label, count, 10)).join('')}
    </div>
    ${hemisphere ? `<div class="astro-hemisphere-grid">
      <div><span>Eastern</span><strong>${hemisphere.eastern}</strong></div>
      <div><span>Western</span><strong>${hemisphere.western}</strong></div>
      <div><span>Southern</span><strong>${hemisphere.southern}</strong></div>
      <div><span>Northern</span><strong>${hemisphere.northern}</strong></div>
    </div>` : `<p class="astro-panel-footnote">Hemisphere balance ${anglesSuppressed ? 'suppressed until an exact birth time is provided' : 'requires calculated houses'}.</p>`}
    <p class="astro-panel-footnote">Ascendant and Midheaven are excluded from these counts; only the ten classical bodies (Sun&ndash;Pluto) are tallied.</p>
  </section>`;
}
function balanceBar(label, count, total) {
    const percent = total > 0 ? Math.round((count / total) * 100) : 0;
    return `<div class="astro-balance-bar-row">
    <span class="astro-balance-bar-label">${escapeHtml(label)}</span>
    <span class="astro-balance-bar-track"><span class="astro-balance-bar-fill" style="width:${percent}%"></span></span>
    <span class="astro-balance-bar-count">${count}</span>
  </div>`;
}
function renderInsightPanel(pillar) {
    return `<section class="astro-panel astro-insight-panel" aria-labelledby="astro-insight-title">
    <div class="astro-panel-title-row">
      <p class="eyebrow">&#10022; Reading</p>
      <h3 id="astro-insight-title">Insight</h3>
    </div>
    <p class="astro-insight-lead">${escapeHtml(pillar.interpretation)}</p>
    <div class="astro-insight-block">
      <h4>Life</h4>
      <p>${escapeHtml(pillar.relevance.life)}</p>
    </div>
    <div class="astro-insight-block">
      <h4>Work</h4>
      <p>${escapeHtml(pillar.relevance.work)}</p>
    </div>
    <div class="astro-insight-block">
      <h4>Relationships</h4>
      <p>${escapeHtml(pillar.relevance.relationships)}</p>
    </div>
    <p class="astro-panel-footnote">Presented as symbolic reflection, not fate, diagnosis, or identity certainty.</p>
  </section>`;
}
function renderLegendPanel(astrology) {
    const ephemeris = astrology.ephemeris;
    return `<section class="astro-panel astro-legend-panel" aria-labelledby="astro-legend-title">
    <div class="astro-panel-title-row">
      <p class="eyebrow">Reference</p>
      <h3 id="astro-legend-title">Legend &amp; Methodology</h3>
    </div>
    <div class="astro-legend-grid">
      <div class="astro-legend-item"><span class="astro-legend-swatch" style="background:${ASPECT_SWATCH.Trine}" aria-hidden="true"></span>Trine / Sextile (flow)</div>
      <div class="astro-legend-item"><span class="astro-legend-swatch" style="background:${ASPECT_SWATCH.Square}" aria-hidden="true"></span>Square (tension)</div>
      <div class="astro-legend-item"><span class="astro-legend-swatch" style="background:${ASPECT_SWATCH.Opposition}" aria-hidden="true"></span>Opposition (polarity)</div>
      <div class="astro-legend-item"><span class="astro-legend-swatch" style="background:${ASPECT_SWATCH.Conjunction}" aria-hidden="true"></span>Conjunction (fusion, no line drawn)</div>
    </div>
    <dl class="astro-methodology-list">
      <div><dt>Zodiac</dt><dd>Tropical</dd></div>
      <div><dt>Frame</dt><dd>Geocentric</dd></div>
      <div><dt>House system</dt><dd>Whole Sign Houses (v1; Placidus and others deferred)</dd></div>
      <div><dt>Node model</dt><dd>True (osculating) node; South Node is the exact +180&deg; opposition</dd></div>
      <div><dt>Chart ruler</dt><dd>Modern rulership</dd></div>
      <div><dt>Retrograde method</dt><dd>Central-difference apparent longitude, &plusmn;12h sample</dd></div>
      <div><dt>Engine</dt><dd>${escapeHtml(ephemeris?.engine ?? 'Unavailable')}</dd></div>
    </dl>
    <p class="astro-panel-footnote">This is symbolic reference material, not scientific proof of identity.</p>
  </section>`;
}
function renderSourceBar(experience, astrology) {
    const input = experience.input;
    const birthTime = input.birthTime.trim() || 'Unknown (local-noon estimate)';
    return `<footer class="astro-source-bar">
    <div class="astro-source-chips">
      ${sourceChip('Full Name', input.fullName.trim() || 'Pending')}
      ${sourceChip('Birth Date', formatBirthDate(input.birthDate))}
      ${sourceChip('Birth Time', birthTime)}
    </div>
    <button type="button" class="command-button-minimal" data-action="go-stage" data-stage="intake">Edit source data</button>
    <div class="astro-source-system">
      <span>Engine: <strong>${escapeHtml(astrology.ephemeris?.engine ?? 'Unavailable')}</strong></span>
    </div>
  </footer>`;
}
function sourceChip(label, value) {
    return `<div class="astro-source-chip">
    <span>${escapeHtml(label)}</span>
    <strong>${escapeHtml(value)}</strong>
  </div>`;
}
function renderBlocked(experience, pillar, astrology, exportFeedback) {
    return `<section class="stage-view astro-pillar-view astro-pillar-view--blocked" aria-labelledby="astro-pillar-title">
    ${renderHero(experience, astrology, true)}
    <section class="astro-panel astro-unavailable-panel">
      <p class="eyebrow">Calculation blocked</p>
      <h3>Western Astrology is not yet calculated</h3>
      <p>${escapeHtml(pillar.summary)}</p>
      ${pillar.limitations.length > 0 ? `<ul class="astro-unavailable-list">${pillar.limitations.map((item) => `<li>${escapeHtml(item)}</li>`).join('')}</ul>` : ''}
      <button type="button" class="command-button-minimal" data-action="go-stage" data-stage="intake">Complete birth data</button>
    </section>
    ${renderPillarExportActions('western-astrology', exportFeedback)}
  </section>`;
}
function renderBenchmarkOrUnavailable(experience, pillar, exportFeedback) {
    if (pillar.status === 'benchmark') {
        return `<section class="stage-view astro-pillar-view astro-pillar-view--benchmark" aria-labelledby="astro-pillar-title">
      <header class="astro-hero astro-hero--simple">
        <div class="astro-hero-copy">
          <p class="eyebrow">Pillar &middot; Western Astrology</p>
          <h1 id="astro-pillar-title">Western Astrology Pillar</h1>
          <p class="astro-hero-subtitle">Tropical natal chart: planets, signs, houses, angles, and aspects.</p>
        </div>
      </header>
      <aside class="astro-suppressed-banner" role="note">
        <span class="astro-suppressed-banner-icon" aria-hidden="true">i</span>
        <div>
          <p><strong>Benchmark / demo profile.</strong></p>
          <p>${escapeHtml(pillar.summary)} No live chart wheel is calculated in this mode.</p>
        </div>
      </aside>
      <div class="astro-pillar-panels-grid">
        ${renderInsightPanel(pillar)}
      </div>
      <footer class="astro-source-bar">
        <div class="astro-source-chips">
          ${sourceChip('Full Name', experience.input.fullName.trim() || 'Pending')}
          ${sourceChip('Birth Date', formatBirthDate(experience.input.birthDate))}
        </div>
        <button type="button" class="command-button-minimal" data-action="go-stage" data-stage="intake">Edit source data</button>
      </footer>
      ${renderPillarExportActions('western-astrology', exportFeedback)}
    </section>`;
    }
    return `<section class="stage-view astro-pillar-view astro-pillar-view--blocked" aria-labelledby="astro-pillar-title">
    <header class="astro-hero astro-hero--simple">
      <div class="astro-hero-copy">
        <p class="eyebrow">Pillar &middot; Western Astrology</p>
        <h1 id="astro-pillar-title">Western Astrology Pillar</h1>
        <p class="astro-hero-subtitle">Tropical natal chart: planets, signs, houses, angles, and aspects.</p>
      </div>
    </header>
    <section class="astro-panel astro-unavailable-panel">
      <p class="eyebrow">Not available</p>
      <h3>No Western Astrology data is available for this profile yet</h3>
      <p>${escapeHtml(pillar.summary)}</p>
      <button type="button" class="command-button-minimal" data-action="go-stage" data-stage="intake">Complete birth data</button>
    </section>
    ${renderPillarExportActions('western-astrology', exportFeedback)}
  </section>`;
}
function dominantKey(counts) {
    const entries = Object.entries(counts);
    if (entries.length === 0)
        return 'Unavailable';
    return entries.reduce((best, current) => (current[1] > best[1] ? current : best))[0];
}
function formatDegree(value) {
    const totalMinutes = Math.min(Math.max(0, Math.round(value * 60)), (29 * 60) + 59);
    const degrees = Math.floor(totalMinutes / 60);
    const minutes = totalMinutes % 60;
    return `${degrees}°${String(minutes).padStart(2, '0')}′`;
}
function formatBirthDate(value) {
    const match = /^(\d{4})-(\d{2})-(\d{2})$/.exec(value);
    if (!match)
        return 'Birth date pending';
    const [, year, month, day] = match;
    const monthName = MONTH_NAMES[Number(month) - 1] ?? month;
    return `${Number(day)} ${monthName} ${year}`;
}
