import { dignityOverlays } from './dignityOverlays.js';
import { LUMINARY_PORTRAITS } from './luminaryPortraits.js';
import { unitId, } from '../knowledgeTypes.js';
import { sig } from '../semanticDimensions.js';
/**
 * AUTHORING SUPPORT FOR THE ASTROLOGY LIBRARY.
 *
 * There are 120 planet-in-sign readings, 120 planet-in-house readings and a
 * long tail of aspect pairs. Written out longhand, each would carry twenty
 * lines of identical scaffolding around three sentences of actual writing, and
 * the scaffolding would be where the mistakes lived.
 *
 * So this file holds everything that is the same for every entry, and the
 * content files hold only what is different: the prose.
 *
 * WHY THE SEMANTIC TAGS ARE DERIVED AND THE PROSE IS NOT
 *
 * A semantic signal is a join key, not a sentence. Its job is to let synthesis
 * notice that a Mercury in Virgo and a BaZi Metal Day Master are both saying
 * `analytical`, and for that it needs to be CONSISTENT across 120 entries far
 * more than it needs to be individually artful. Hand-tagging 120 combinations
 * would guarantee drift - Mercury in Virgo tagged 0.9 analytical on Tuesday and
 * Mercury in Capricorn tagged 0.6 for the same reason on Thursday.
 *
 * So the tags are computed: the sign supplies the style at full weight, the
 * planet supplies its function at a lower weight, and the two merge. The rule is
 * written down below and a test checks that every derived set is valid. The
 * PROSE is authored, one entry at a time, and nothing about it is generated.
 *
 * An entry may override the derived tags when a combination genuinely differs
 * from the sum of its parts - Mars in Libra is not simply Mars plus Libra - and
 * those overrides are the interesting ones, so they are explicit.
 */
/* ------------------------------------------------------------------ *
 * THE DERIVATION TABLES
 * ------------------------------------------------------------------ */
/**
 * What each planet contributes regardless of sign.
 *
 * Deliberately sparse: two or three dimensions each. A planet that tagged six
 * dimensions would swamp the sign's contribution and every placement of that
 * planet would read the same to synthesis, which is the opposite of the point.
 */
const PLANET_SIGNALS = {
    sun: [['assertive', 0.4], ['independent', 0.3]],
    moon: [['emotionally-sensitive', 0.5], ['receptive', 0.3]],
    mercury: [['communicative', 0.6], ['analytical', 0.3]],
    venus: [['collaborative', 0.4], ['creative', 0.3]],
    mars: [['assertive', 0.6], ['risk-oriented', 0.3]],
    jupiter: [['novelty-seeking', 0.4], ['conceptual', 0.3]],
    saturn: [['structured', 0.6], ['cautious', 0.4]],
    uranus: [['novelty-seeking', 0.5], ['independent', 0.4]],
    neptune: [['intuitive', 0.5], ['emotionally-sensitive', 0.3]],
    pluto: [['introspective', 0.4], ['persistent', 0.4]],
};
/**
 * What each sign contributes: the style the function operates in.
 *
 * These carry the higher weights, because a placement's flavour comes far more
 * from its sign than from its planet. Everyone has a Mercury; not everyone
 * thinks in the Virgo register.
 */
const SIGN_SIGNALS = {
    aries: [['assertive', 0.9], ['risk-oriented', 0.7], ['independent', 0.6]],
    taurus: [['stability-seeking', 0.9], ['practical', 0.8], ['persistent', 0.6]],
    gemini: [['communicative', 0.9], ['adaptable', 0.7], ['novelty-seeking', 0.6]],
    cancer: [['emotionally-sensitive', 0.9], ['private', 0.6], ['receptive', 0.6]],
    leo: [['social', 0.8], ['creative', 0.7], ['assertive', 0.6]],
    virgo: [['analytical', 0.9], ['practical', 0.8], ['structured', 0.6]],
    libra: [['collaborative', 0.9], ['social', 0.6], ['conceptual', 0.5]],
    scorpio: [['introspective', 0.8], ['private', 0.7], ['persistent', 0.7]],
    sagittarius: [['conceptual', 0.8], ['novelty-seeking', 0.8], ['independent', 0.6]],
    capricorn: [['structured', 0.9], ['practical', 0.7], ['persistent', 0.7]],
    aquarius: [['conceptual', 0.8], ['independent', 0.8], ['analytical', 0.6]],
    pisces: [['intuitive', 0.9], ['emotionally-sensitive', 0.8], ['adaptable', 0.6]],
};
/** Where a function becomes visible. Houses tag the arena, lightly. */
const HOUSE_SIGNALS = {
    1: [['assertive', 0.5], ['independent', 0.4]],
    2: [['practical', 0.6], ['stability-seeking', 0.5]],
    3: [['communicative', 0.7], ['adaptable', 0.4]],
    4: [['private', 0.6], ['emotionally-sensitive', 0.5]],
    5: [['creative', 0.7], ['social', 0.4]],
    6: [['structured', 0.6], ['practical', 0.6]],
    7: [['collaborative', 0.8], ['social', 0.4]],
    8: [['introspective', 0.7], ['private', 0.5]],
    9: [['conceptual', 0.7], ['novelty-seeking', 0.5]],
    10: [['structured', 0.5], ['assertive', 0.5], ['social', 0.4]],
    11: [['collaborative', 0.6], ['social', 0.6]],
    12: [['introspective', 0.8], ['private', 0.6], ['intuitive', 0.4]],
};
/** Merge signal lists, capping at 1 and sorting so output is stable. */
function merge(...groups) {
    const totals = new Map();
    for (const group of groups) {
        for (const [dimension, weight] of group) {
            totals.set(dimension, Math.min(1, (totals.get(dimension) ?? 0) + weight));
        }
    }
    return [...totals.entries()]
        .map(([dimension, weight]) => sig(dimension, Math.round(weight * 100) / 100))
        .sort((a, b) => a.dimension.localeCompare(b.dimension));
}
export function placementSignals(planet, sign) {
    return merge(SIGN_SIGNALS[sign] ?? [], PLANET_SIGNALS[planet] ?? []);
}
export function houseSignals(planet, house) {
    return merge(HOUSE_SIGNALS[house] ?? [], PLANET_SIGNALS[planet] ?? []);
}
/* ------------------------------------------------------------------ *
 * PROVENANCE
 * ------------------------------------------------------------------ */
/** A planet in a sign is about as agreed as Western astrology gets. */
export const PLACEMENT_PROVENANCE = {
    kind: 'established',
    settledness: 'established-within-system',
    basis: 'Planet-as-function expressed through sign-as-style is the shared grammar of every modern Western school and of the Hellenistic material behind them.',
    sources: ['RESEARCH_ASTROLOGY#grammar', 'RESEARCH_ASTROLOGY#signs'],
};
/**
 * The outer three are read more cautiously.
 *
 * Uranus, Neptune and Pluto sit in a sign for seven to twenty years, so the
 * placement describes a birth cohort and not a person. Recording it at the same
 * confidence as a Mercury placement would let a whole generation share a
 * personality, which the weighting model would then treat as four-pillar
 * agreement.
 */
export const GENERATIONAL_PROVENANCE = {
    kind: 'established',
    settledness: 'conventional',
    basis: 'The outer planets stay in a sign for years, so the sign describes a generational tone rather than an individual trait; the reading is agreed but the personal claim is weak.',
    sources: ['RESEARCH_ASTROLOGY#signs', 'RESEARCH_ASTROLOGY#generational'],
};
export const HOUSE_PROVENANCE = {
    kind: 'established',
    settledness: 'conventional',
    basis: 'House-as-arena is agreed across schools; the specific reading of a planet in a house is conventional rather than doctrinal, and it is conditional on the house system used.',
    sources: ['RESEARCH_ASTROLOGY#houses', 'RESEARCH_ASTROLOGY#composition'],
};
export const ASPECT_PAIR_PROVENANCE = {
    kind: 'established',
    settledness: 'conventional',
    basis: 'Aspect-as-relationship is agreed; the reading of a specific pair is conventional practice rather than a doctrinal position, and the permitted orb varies by school.',
    sources: ['RESEARCH_ASTROLOGY#aspects', 'RESEARCH_ASTROLOGY#composition'],
};
export const PATTERN_PROVENANCE = {
    kind: 'contextual-derivation',
    settledness: 'conventional',
    basis: 'Chart-level emphasis is read by combining counted distributions under a stated rule rather than by quoting a source on this particular chart.',
    sources: ['RESEARCH_ASTROLOGY#composition', 'RESEARCH_ASTROLOGY#stellium'],
};
const SIGN_LABEL = {
    aries: 'Aries', taurus: 'Taurus', gemini: 'Gemini', cancer: 'Cancer',
    leo: 'Leo', virgo: 'Virgo', libra: 'Libra', scorpio: 'Scorpio',
    sagittarius: 'Sagittarius', capricorn: 'Capricorn', aquarius: 'Aquarius', pisces: 'Pisces',
};
const PLANET_LABEL = {
    sun: 'Sun', moon: 'Moon', mercury: 'Mercury', venus: 'Venus', mars: 'Mars',
    jupiter: 'Jupiter', saturn: 'Saturn', uranus: 'Uranus', neptune: 'Neptune', pluto: 'Pluto',
};
export function placementUnit(entry) {
    const key = `${entry.planet}-${entry.sign}`;
    const label = `${PLANET_LABEL[entry.planet] ?? entry.planet} in ${SIGN_LABEL[entry.sign] ?? entry.sign}`;
    /*
     * ESSENTIAL DIGNITY, ATTACHED HERE RATHER THAN AT 84 CALL SITES.
     *
     * The rule belongs to the PLANET and not to any particular entry: whichever
     * of the five states fires is decided by the sign the chart put it in, which
     * the engine has already worked out. A placement written later gets the
     * conditional for free rather than by somebody remembering.
     *
     * The three outer planets have no traditional dignity, so dignityOverlays()
     * returns nothing for them and no overlay is attached - which is the honest
     * answer rather than an invented scheme.
     */
    const overlays = [
        ...(entry.overlays ?? []),
        ...dignityOverlays(entry.planet),
    ];
    /*
     * The Sun and the Moon carry their depth in luminaryPortraits.ts, merged here
     * so the placement files next door stay prose.
     *
     * Merged PER FIELD rather than whole. The worked example - the Pisces Moon -
     * already declares five fields of its own, and a whole-object merge would
     * have made it the one placement that gained nothing from this file. An
     * authored field always wins; the merge only fills what is absent.
     */
    const merged = LUMINARY_PORTRAITS[key];
    const portrait = merged || entry.portrait
        ? { ...merged, ...entry.portrait }
        : undefined;
    return {
        id: unitId('western-astrology', 'planet', key, 'natal-placement'),
        entity: { system: 'western-astrology', kind: 'planet', key, label },
        role: 'natal-placement',
        headline: entry.headline,
        core: entry.core,
        ...(portrait ? { portrait } : {}),
        ...(overlays.length > 0 ? { overlays } : {}),
        semantics: entry.signals ?? placementSignals(entry.planet, entry.sign),
        provenance: entry.generational ? GENERATIONAL_PROVENANCE : PLACEMENT_PROVENANCE,
    };
}
const HOUSE_ORDINAL = [
    '', 'first', 'second', 'third', 'fourth', 'fifth', 'sixth',
    'seventh', 'eighth', 'ninth', 'tenth', 'eleventh', 'twelfth',
];
export function houseUnit(entry) {
    const key = `${entry.planet}-house-${entry.house}`;
    const label = `${PLANET_LABEL[entry.planet] ?? entry.planet} in the ${HOUSE_ORDINAL[entry.house]} house`;
    return {
        id: unitId('western-astrology', 'house', key, 'natal-placement'),
        entity: { system: 'western-astrology', kind: 'house', key, label },
        role: 'natal-placement',
        headline: entry.headline,
        core: entry.core,
        semantics: entry.signals ?? houseSignals(entry.planet, entry.house),
        provenance: HOUSE_PROVENANCE,
    };
}
/** Sorted so Sun-square-Saturn and Saturn-square-Sun resolve to one unit. */
export function aspectPairKey(bodyA, bodyB, aspect) {
    const [first, second] = [bodyA.toLowerCase(), bodyB.toLowerCase()].sort();
    return `${first}-${aspect.toLowerCase()}-${second}`;
}
export function aspectPairUnit(entry) {
    const key = aspectPairKey(entry.bodyA, entry.bodyB, entry.aspect);
    const [first, second] = [entry.bodyA, entry.bodyB]
        .map((body) => PLANET_LABEL[body.toLowerCase()] ?? body)
        .sort();
    const label = `${first} ${entry.aspect} ${second}`;
    return {
        id: unitId('western-astrology', 'aspect', key, 'natal-placement'),
        entity: { system: 'western-astrology', kind: 'aspect', key, label },
        role: 'natal-placement',
        headline: entry.headline,
        core: entry.core,
        semantics: entry.signals,
        provenance: ASPECT_PAIR_PROVENANCE,
    };
}
export function patternUnit(entry) {
    const kind = entry.kind ?? 'chart-pattern';
    const role = entry.role ?? 'base-archetype';
    return {
        id: unitId('western-astrology', kind, entry.key, role),
        entity: { system: 'western-astrology', kind, key: entry.key, label: entry.label },
        role,
        headline: entry.headline,
        core: entry.core,
        semantics: entry.signals,
        provenance: entry.provenance ?? PATTERN_PROVENANCE,
    };
}
export const ALL_SIGNS = Object.keys(SIGN_LABEL);
export const ALL_PLANETS = Object.keys(PLANET_LABEL);
export { SIGN_LABEL, PLANET_LABEL, HOUSE_ORDINAL };
