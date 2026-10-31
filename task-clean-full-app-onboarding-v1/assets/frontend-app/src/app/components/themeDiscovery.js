import { escapeHtml, pillarLabel } from '../format.js?v=f9ab0a6';
import { commandButton, stageIntro } from './common.js?v=f9ab0a6';
import { buildCrossPillarSynthesisProfile } from '../synthesis/synthesisProfileBuilder.js?v=f9ab0a6';
import { renderSynthesisThemeCard } from './synthesisThemeCard.js?v=f9ab0a6';
export function renderThemeDiscovery(experience) {
    const profile = buildCrossPillarSynthesisProfile(experience);
    const promoted = profile.themes.filter((theme) => theme.strength !== 'emerging');
    const emerging = profile.themes.filter((theme) => theme.strength === 'emerging');
    return `<section class="stage-view theme-view cross-pillar-synthesis" aria-labelledby="theme-title">
    ${stageIntro('02 / Theme discovery', 'Recurring themes across your pillars', 'Every signal from a calculated pillar is grouped by a shared, documented domain. A theme is only promoted into a card here when independent pillars converge on the same domain; single-pillar signals stay visible below as exploratory, not hidden.', `${promoted.length} cross-pillar theme${promoted.length === 1 ? '' : 's'} confirmed`).replace('<h1>', '<h1 id="theme-title">')}

    <section class="synthesis-source-status" aria-label="Pillar source status">
      ${profile.sourceStatus.map((status) => `<span class="synthesis-source-status__pill synthesis-source-status__pill--${status.status}"><strong>${escapeHtml(pillarLabel(status.pillar))}</strong>${escapeHtml(status.label)}</span>`).join('')}
    </section>

    ${profile.integrity.insufficientEvidence ? `<p class="empty-state">${escapeHtml(profile.integrity.reason ?? 'Insufficient evidence for cross-pillar synthesis yet.')}</p>` : ''}

    <div class="cross-pillar-synthesis__themes">
      ${promoted.length > 0
        ? promoted.map((theme) => renderSynthesisThemeCard(theme, profile)).join('')
        : '<p class="empty-state">No theme yet has independent support from two or more pillars.</p>'}
    </div>

    ${emerging.length > 0 ? `<section class="synthesis-emerging-signals">
      <p class="eyebrow">Single-pillar signals</p>
      <p class="synthesis-emerging-signals__note">These come from one pillar only. They are shown as exploratory technical detail rather than a confirmed repeating pattern, and are not used to dominate the main narrative.</p>
      <div class="cross-pillar-synthesis__themes cross-pillar-synthesis__themes--emerging">
        ${emerging.map((theme) => renderSynthesisThemeCard(theme, profile)).join('')}
      </div>
    </section>` : ''}

    <footer class="stage-actions">
      <div><strong>Themes discovered</strong><span>Continue to see how these themes relate to each other, including tensions.</span></div>
      ${commandButton('Reveal cross-pillar patterns', 'next-stage')}
    </footer>
  </section>`;
}
