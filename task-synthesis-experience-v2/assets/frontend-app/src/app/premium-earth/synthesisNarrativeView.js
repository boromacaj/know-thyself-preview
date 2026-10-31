import { escapeHtml } from '../format.js?v=53c0693';
import { t } from '../i18n/uiStrings.js?v=53c0693';
import { PILLAR_NAME } from '../synthesis-reading/narrative/narrativeEvidence.js?v=53c0693';
import { localityOf } from './avatarStore.js?v=53c0693';
/*
 * THE SYNTHESIS SCREEN, V2: ONE READING.
 *
 * Complexity underneath, simplicity on the surface. The page is a title, the
 * profile's identity, and a single run of paragraphs. At the few points where
 * the reading rests on something worth inspecting there is a footnote-sized
 * disclosure - `Astrology · Numerology` and a chevron - that opens, in place,
 * the calculated elements behind the paragraph above it.
 *
 * WHAT THIS FILE IS ALLOWED TO DO
 * Render a `SynthesisNarrative`. There is no selection, ranking or wording of
 * claims here: the narrative says which paragraph has which evidence. A test
 * asserts the markup contains no heading per theme, no card, no figure and no
 * percentage.
 *
 * WHY <details>
 * A native disclosure is keyboard-operable, announced by assistive technology
 * as expandable, needs no script, and cannot desynchronise `aria-expanded` from
 * what is shown. The summary is the only interactive element a paragraph adds.
 *
 * ENGLISH ONLY - the composer authors its connecting lines in English, so the
 * dispatcher in premiumSynthesisScreen falls back to the legacy reading for any
 * other locale.
 */
const FOOTNOTE = 'This is an interpretation of symbolic traditions, not a measurement of you. '
    + 'The traditions read the same birth data, so where they agree it is a pattern worth testing '
    + 'against your own life, not proof.';
const pillarNames = (pillars) => pillars.map((pillar) => PILLAR_NAME[pillar]).join(' · ');
function renderGroup(group) {
    return `
        <section class="kt-evidence-group">
          <p class="kt-evidence-idea">${escapeHtml(group.heading)}</p>
          <ul>${group.elements.map((element) => `
            <li data-evidence="${escapeHtml(element.evidenceId)}"><span class="kt-evidence-pillar">${escapeHtml(PILLAR_NAME[element.pillar])}</span> <strong>${escapeHtml(element.element)}</strong> — ${escapeHtml(element.tradition)}${element.usedAs ? `<span class="kt-evidence-used"><span class="kt-evidence-used-title">${escapeHtml(t('synthesis.v2.usedAs'))}</span> ${escapeHtml(element.usedAs)}</span>` : ''}</li>`).join('')}
          </ul>
        </section>`;
}
function renderReference(paragraph, reference) {
    const label = pillarNames(reference.pillars);
    const id = `evidence-${paragraph.id}`;
    return `
      <details class="kt-evidence" id="${escapeHtml(id)}" data-relation="${reference.relation}">
        <summary>
          <span class="kt-visually-hidden">${escapeHtml(t('synthesis.v2.sourcesPrefix'))}</span>
          <span class="kt-evidence-label">${escapeHtml(label)}</span>
          <span class="kt-evidence-chevron" aria-hidden="true"></span>
        </summary>
        <div class="kt-evidence-body">${reference.groups.map(renderGroup).join('')}${reference.connection
        ? `
          <p class="kt-evidence-connection"><span class="kt-evidence-connection-title">${escapeHtml(t('synthesis.v2.connection'))}</span> ${escapeHtml(reference.connection)}</p>` : ''}
        </div>
      </details>`;
}
function renderParagraph(paragraph) {
    return `
    <div class="kt-narrative-block" data-paragraph="${escapeHtml(paragraph.id)}" data-claims="${escapeHtml(paragraph.claimIds.join(' '))}">
      <p>${escapeHtml(paragraph.text)}</p>${paragraph.reference ? renderReference(paragraph, paragraph.reference) : ''}
    </div>`;
}
/** The honest empty state: said once, in the reading's own voice, with no apology and no filler. */
function insufficientText(narrative) {
    const present = narrative.pillarsPresent;
    if (present.length < 2) {
        return present.length === 0
            ? 'Nothing could be calculated for this profile yet, so there is nothing to read across.'
            : `Only ${PILLAR_NAME[present[0]]} could be calculated for this profile, and a synthesis needs at least two traditions to compare. Each reading on its own is still complete.`;
    }
    return 'The traditions calculated for this profile do not agree or disagree strongly enough on anything to support a combined reading. The readings of each tradition on their own say more than a forced synthesis would.';
}
export function renderSynthesisNarrativeView(experience, narrative) {
    const name = escapeHtml(experience.input.fullName || '');
    const place = escapeHtml(localityOf(experience.input.resolvedPlaceLabel ?? experience.input.birthPlaceText ?? '', experience.input.birthCountry));
    const body = narrative.status === 'insufficient'
        ? `<p class="kt-narrative-empty">${escapeHtml(insufficientText(narrative))}</p>`
        : `<div class="kt-narrative-flow">${narrative.paragraphs.map(renderParagraph).join('')}
    </div>`;
    return `
    <article class="kt-pillar-view kt-reading kt-synthesis-v2 is-bare" data-pillar="cross-pillar-synthesis" data-synthesis="2" data-synthesis-status="${narrative.status}">
      <header class="kt-pillar-head kt-portrait-head">
        <h1 class="kt-quiet-title">${escapeHtml(t('synthesis.v2.title'))}</h1>
        ${name ? `<p class="kt-portrait-identity">${name}${place ? ` &middot; ${place}` : ''}</p>` : ''}
        <button class="kt-portrait-review" type="button" data-pillar-review>${escapeHtml(t('onb.action.reviewDetails'))}</button>
      </header>

      <section class="kt-reading-section kt-narrative" id="section-narrative">
        ${narrative.notice ? `<p class="kt-narrative-notice">${escapeHtml(narrative.notice)}</p>` : ''}
        ${body}
        <p class="kt-narrative-foot">${escapeHtml(FOOTNOTE)}</p>
      </section>
    </article>`;
}
