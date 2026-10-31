import { activeLocale, FALLBACK_LOCALE } from '../i18n/locale.js?v=f9ab0a6';
import { resolveReaderGrammar } from '../i18n/readerGrammar.js?v=f9ab0a6';
import { overlayTranslation, proseTranslation } from './translations/proseTranslations.js?v=f9ab0a6';
import { KnowledgeRegistry, resolveInterpretation } from './resolveKnowledge.js?v=f9ab0a6';
import { NUMEROLOGY_ARCHETYPES } from './numerology/numerologyArchetypes.js?v=f9ab0a6';
import { NUMEROLOGY_ROLE_UNITS } from './numerology/numerologyRoles.js?v=f9ab0a6';
import { NUMEROLOGY_LIFE_PATHS } from './numerology/numerologyLifePaths.js?v=f9ab0a6';
import { NUMEROLOGY_NAME_ROLES } from './numerology/numerologyNameRoles.js?v=f9ab0a6';
import { NUMEROLOGY_DERIVED_ROLES } from './numerology/numerologyDerivedRoles.js?v=f9ab0a6';
import { NUMEROLOGY_NAME_PATTERNS } from './numerology/numerologyNamePatterns.js?v=f9ab0a6';
import { NUMEROLOGY_CHAPTERS } from './numerology/numerologyChapters.js?v=f9ab0a6';
import { NUMEROLOGY_CYCLES } from './numerology/numerologyCycles.js?v=f9ab0a6';
import { ASTROLOGY_VOCABULARY } from './astrology/astrologyVocabulary.js?v=f9ab0a6';
import { ASTROLOGY_PLACEMENTS } from './astrology/astrologyPlacements.js?v=f9ab0a6';
import { LUMINARY_PLACEMENTS } from './astrology/placements/luminaries.js?v=f9ab0a6';
import { PERSONAL_PLANET_PLACEMENTS } from './astrology/placements/personalPlanets.js?v=f9ab0a6';
import { SOCIAL_PLANET_PLACEMENTS } from './astrology/placements/socialPlanets.js?v=f9ab0a6';
import { OUTER_PLANET_PLACEMENTS } from './astrology/placements/outerPlanets.js?v=f9ab0a6';
import { PLANET_HOUSE_PLACEMENTS } from './astrology/placements/planetHouses.js?v=f9ab0a6';
import { ASTROLOGY_ASPECT_PAIRS } from './astrology/aspectPairs.js?v=f9ab0a6';
import { ASTROLOGY_CHART_PATTERNS } from './astrology/chartPatterns.js?v=f9ab0a6';
import { BAZI_VOCABULARY } from './bazi/baziVocabulary.js?v=f9ab0a6';
import { BAZI_DAY_MASTER_LIBRARY } from './bazi/baziDayMasterLibrary.js?v=f9ab0a6';
import { BAZI_SEASONAL_LIBRARY } from './bazi/baziSeasonal.js?v=f9ab0a6';
import { BAZI_STRUCTURE_LIBRARY } from './bazi/baziStructures.js?v=f9ab0a6';
import { HUMAN_DESIGN_VOCABULARY } from './human-design/humanDesignVocabulary.js?v=f9ab0a6';
import { HD_TYPES_AND_AUTHORITIES } from './human-design/hdTypesAuthorities.js?v=f9ab0a6';
import { HD_PROFILES as HD_PROFILE_LIBRARY } from './human-design/hdProfiles.js?v=f9ab0a6';
import { HD_CENTERS as HD_CENTER_LIBRARY } from './human-design/hdCenters.js?v=f9ab0a6';
import { HD_CHANNELS } from './human-design/hdChannels.js?v=f9ab0a6';
import { HD_GATES } from './human-design/hdGates.js?v=f9ab0a6';
import { HD_GATE_FOUNDATIONS } from './human-design/hdGateFoundations.js?v=f9ab0a6';
import { HD_CROSS_AND_VARIABLES } from './human-design/hdCrossVariables.js?v=f9ab0a6';
import { HUMAN_DESIGN_COMPOSITION } from './human-design/humanDesignComposition.js?v=f9ab0a6';
import { CROSS_PILLAR_COMMENTARY } from './cross-pillar/crossPillarCommentary.js?v=f9ab0a6';
import { withDriveSignals } from './driveSignals.js?v=f9ab0a6';
/**
 * THE ASSEMBLED KNOWLEDGE BASE.
 *
 * One registry, built once, holding every interpretation unit across the four
 * systems. Registration throws on a duplicate id, so the module will not load at
 * all if two content files claim the same entity in the same role - which is the
 * cheapest possible guard against the same reading being served from two places
 * and silently drifting apart.
 *
 * This module knows nothing about the DOM and nothing about the engines. It is
 * the seam the synthesis layer will sit on top of.
 */
export const KNOWLEDGE = new KnowledgeRegistry();
/*
 * EVERY UNIT PASSES THROUGH THE DRIVE TABLE ON THE WAY IN.
 *
 * `withDriveSignals` adds what the tradition says a symbol is FOR to the
 * behavioural signals the unit already carries - a Projector's need to be
 * recognised, a Life Path 7's appetite for understanding, Saturn's mastery. It
 * touches nothing else: same id, same prose, same provenance, and an authored
 * weight always beats a table row on the same dimension. Applied here, once, so
 * a content file cannot be edited into disagreeing with the table.
 */
const register = (units) => {
    KNOWLEDGE.registerAll(withDriveSignals(units));
};
register(NUMEROLOGY_ARCHETYPES);
register(NUMEROLOGY_ROLE_UNITS);
register(NUMEROLOGY_LIFE_PATHS);
register(NUMEROLOGY_NAME_ROLES);
register(NUMEROLOGY_DERIVED_ROLES);
register(NUMEROLOGY_NAME_PATTERNS);
register(NUMEROLOGY_CHAPTERS);
register(NUMEROLOGY_CYCLES);
register(ASTROLOGY_VOCABULARY);
register(ASTROLOGY_PLACEMENTS);
register(LUMINARY_PLACEMENTS);
register(PERSONAL_PLANET_PLACEMENTS);
register(SOCIAL_PLANET_PLACEMENTS);
register(OUTER_PLANET_PLACEMENTS);
register(PLANET_HOUSE_PLACEMENTS);
register(ASTROLOGY_ASPECT_PAIRS);
register(ASTROLOGY_CHART_PATTERNS);
register(BAZI_VOCABULARY);
register(BAZI_DAY_MASTER_LIBRARY);
register(BAZI_SEASONAL_LIBRARY);
register(BAZI_STRUCTURE_LIBRARY);
register(HUMAN_DESIGN_VOCABULARY);
register(HD_TYPES_AND_AUTHORITIES);
register(HD_PROFILE_LIBRARY);
register(HD_CENTER_LIBRARY);
register(HD_CHANNELS);
register(HD_GATES);
/* The public-domain classical foundation under the same 64 entities, on its own
   role so it can never be mistaken for the Human Design reading. */
register(HD_GATE_FOUNDATIONS);
register(HD_CROSS_AND_VARIABLES);
register(HUMAN_DESIGN_COMPOSITION);
register(CROSS_PILLAR_COMMENTARY);
/** Convenience wrapper so callers do not have to pass the registry around. */
/**
 * Resolve a unit, then apply the active locale's prose translation if one
 * exists.
 *
 * The translation step is LAST and purely textual. The unit resolves exactly as
 * it always did - same overlays, same semantics, same provenance, same id - and
 * only the prose fields are swapped afterwards. That ordering is what makes the
 * language guarantee provable: nothing structural is consulted after this
 * point, so nothing structural can differ between locales.
 */
export function resolve(request) {
    const resolved = resolveInterpretation(KNOWLEDGE, request);
    if (!resolved)
        return null;
    const locale = activeLocale();
    if (locale === FALLBACK_LOCALE)
        return resolved;
    const translation = proseTranslation(resolved.unitId, locale);
    if (!translation)
        return resolved;
    /* Field by field. A unit with a translated core and an untranslated portrait
       keeps its translated core rather than reverting wholesale - which is what a
       staged translation actually looks like.
  
       Every translated field is then resolved for the reader's grammar - see
       readerGrammar.ts. Slovak cannot say "you were" without choosing a gender,
       so a gendered word is authored once with its three forms and the reader's
       own is picked here, at the same late, purely textual step as the language
       itself. English never carries a token, so nothing happens to it. */
    const grammar = resolveReaderGrammar;
    const portrait = Object.fromEntries(Object.entries(translation.portrait ?? {}).map(([field, value]) => [
        field,
        Array.isArray(value) ? value.map((text) => grammar(text)) : value,
    ]));
    /*
     * THE CONDITIONAL PARAGRAPHS SURVIVE THE SWAP.
     *
     * The Slovak tables are keyed by unit id and hold the BASE reading, because
     * that is what a translator was given. Swapping `core` wholesale therefore
     * used to delete every paragraph an overlay had woven in - a chart whose
     * conditions produced six paragraphs in English produced two in Slovak, with
     * `appliedOverlays` still reporting that all of them had fired. No error, no
     * test, and the entire point of a conditional knowledge base invisible to
     * half the readership.
     *
     * So the translated base is reassembled with the overlay contributions in
     * their original order. Each contribution is translated in its own right
     * where a translation exists, and falls back to what it composed otherwise -
     * per overlay, for the same reason the base falls back per field.
     *
     * A `replace-core` overlay replaced the base rather than adding to it, so
     * when one has fired there is no base left to translate and the overlay
     * chain is the whole reading.
     */
    const replaced = resolved.appliedOverlays.some((overlay) => overlay.effect === 'replace-core');
    const woven = resolved.appliedOverlays.filter((overlay) => (overlay.effect === 'replace-core' || overlay.effect === 'weave-after-core'));
    const base = translation.core
        ? translation.core.map((text) => grammar(text))
        : resolved.core;
    const core = translation.core
        ? [
            ...(replaced ? [] : base),
            ...woven.flatMap((overlay) => (overlayTranslation(overlay.id, locale) ?? overlay.prose).map((text) => grammar(text))),
        ]
        : resolved.core;
    return {
        ...resolved,
        ...(translation.headline ? { headline: grammar(translation.headline) } : {}),
        core,
        portrait: { ...resolved.portrait, ...portrait },
    };
}
/* The Big Three meaning records (Sun, Moon, Ascendant x the twelve signs): the structured companion of the units registered above. The Western Astrology hero's sheet reads them. */
export { BIG_THREE_MEANINGS, bigThreeMeaningFor } from './astrology/big-three/index.js?v=f9ab0a6';
export { dialogContentFor as bigThreeDialogContentFor, dialogContentForPair as bigThreeDialogContentForPair } from './astrology/big-three/dialogContent.js?v=f9ab0a6';
/* The core-position meaning records (Life Path, Expression, Soul Urge, Personality x 1-9, 11, 22, 33): the structured companion of the units
   registered above, looked up by exact position and number. The Numerology circles' sheet reads them; so can the reading. */
export { POSITION_MEANINGS, positionMeaningFor } from './numerology/position-meanings/index.js?v=f9ab0a6';
export { dialogContentFor, dialogContentForPair } from './numerology/position-meanings/dialogContent.js?v=f9ab0a6';
export { KnowledgeRegistry, resolveInterpretation } from './resolveKnowledge.js?v=f9ab0a6';
export * from './knowledgeTypes.js?v=f9ab0a6';
