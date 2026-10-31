import { commandButton, stageIntro, textList } from './common.js?v=d9f39e7';
import { buildCrossPillarSynthesisProfile } from '../synthesis/synthesisProfileBuilder.js?v=d9f39e7';
import { renderSynthesisTensionCard } from './synthesisTensionCard.js?v=d9f39e7';
export function renderPatternReveal(experience) {
    const profile = buildCrossPillarSynthesisProfile(experience);
    const hasTensions = profile.tensions.length > 0;
    return `<section class="stage-view pattern-view cross-pillar-synthesis" aria-labelledby="pattern-title">
    ${stageIntro('03 / Pattern reveal', hasTensions ? 'Where your themes pull in different directions' : 'No internal tension detected yet', hasTensions
        ? 'Two independently supported themes can coexist without contradicting each other. Each pairing below is a documented, reviewed relationship — never an automatically inferred one.'
        : 'A tension is only shown here when two independently supported themes are both present in this profile. More pillars or more evidence may reveal one later.', `${profile.tensions.length} tension${profile.tensions.length === 1 ? '' : 's'} identified`).replace('<h1>', '<h1 id="pattern-title">')}

    <div class="cross-pillar-synthesis__tensions">
      ${hasTensions
        ? profile.tensions.map((tension) => renderSynthesisTensionCard(tension, profile)).join('')
        : '<p class="empty-state">No internal tension is currently supported by the available evidence.</p>'}
    </div>

    <section class="synthesis-methodology">
      <p class="eyebrow">Methodology notes</p>
      ${textList(profile.methodologyWarnings)}
      <p class="synthesis-methodology__guardrail-count">${profile.semanticGuardrailCount} semantic guardrails are enforced across this synthesis to prevent false equivalence between symbolic systems. The full list is in the Technical Appendix.</p>
    </section>

    <footer class="stage-actions">
      <div><strong>Patterns compared</strong><span>The Unified Self Map assembles the full readable profile from these themes and tensions.</span></div>
      ${commandButton('Open Unified Self Map', 'next-stage')}
    </footer>
  </section>`;
}
