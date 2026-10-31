import { interactionOverlays, masterRootOverlay } from './numerologyInteractions.js?v=f9ab0a6';
import { NAME_PORTRAITS } from './numerologyNamePortraits.js?v=f9ab0a6';
import { unitId, } from '../knowledgeTypes.js?v=f9ab0a6';
import { sig } from '../semanticDimensions.js?v=f9ab0a6';
/**
 * AUTHORING SUPPORT FOR THE NUMEROLOGY LIBRARY.
 *
 * THE ARCHITECTURE THIS FILE EXISTS TO HOLD UP
 *
 *   BASE NUMBER ARCHETYPE   what a 7 is, before anyone asks where it sits
 *   ROLE-SPECIFIC UNIT      what a 7 is AS a Life Path, a Challenge, a Personal Day
 *   CONTEXTUAL COMPOSITION  what a 7 Pinnacle is in the FOURTH position
 *
 * The archetypes live in numerologyArchetypes.ts and are not readings. Every
 * file that imports this one writes the middle layer, and the registry's
 * duplicate-id guard makes it impossible for two roles to claim the same slot.
 *
 * WHY THE SEMANTIC SIGNALS ARE DERIVED RATHER THAN RETYPED
 *
 * A number carries the same semantic content wherever it lands - a 4 is
 * structured whether it is a Life Path or a Personal Month. What changes with
 * the role is the WEIGHT: a Life Path describes the whole shape of a life, a
 * Personal Day describes a Tuesday, and letting them contribute equally to
 * cross-pillar synthesis would be a straightforward modelling error. So the
 * dimensions come from NUMBER_SIGNALS and the role supplies a scale factor.
 *
 * WHERE THE NUMBER 7 IS
 *
 * numerologyRoles.ts holds 7 across seven roles as the original worked example.
 * That prose is good and is left exactly where it is; the files here cover every
 * other value and every other role, and a test asserts the union is complete.
 */
/* ------------------------------------------------------------------ *
 * PROVENANCE
 * ------------------------------------------------------------------ */
/** The core positions and what each is understood to answer. Agreed. */
export const CORE_POSITION = {
    kind: 'established',
    settledness: 'established-within-system',
    basis: 'The core positions - Life Path, Expression, Soul Urge, Personality, Birthday - and the questions each is understood to answer are agreed across the modern Western schools.',
    sources: ['RESEARCH_NUMEROLOGY#core-positions'],
};
/** Derived positions: agreed in formula, less uniformly emphasised. */
export const DERIVED_POSITION = {
    kind: 'established',
    settledness: 'conventional',
    basis: 'Maturity, Balance and Attitude are calculated the same way across the modern Western schools, but they are minor positions and the schools differ in how much weight they give them.',
    sources: ['RESEARCH_NUMEROLOGY#core-positions', '#derived-positions'].map((part) => (part.startsWith('#') ? `RESEARCH_NUMEROLOGY${part}` : part)),
};
/** Name-frequency positions: Hidden Passion and Karmic Lessons. */
export const NAME_PATTERN = {
    kind: 'established',
    settledness: 'conventional',
    basis: 'Hidden Passion and Karmic Lessons are both read off the letter-value frequencies of the birth name; the arithmetic is agreed, and the weight given to an absent value varies considerably between practitioners.',
    sources: ['RESEARCH_NUMEROLOGY#name-patterns'],
};
/** Pinnacles and Challenges: the chapter system. */
export const CHAPTER = {
    kind: 'tradition-specific',
    settledness: 'conventional',
    basis: 'The four Pinnacles and four Challenges, their formulas and their age spans, are standard in the modern Western lineage; the age boundaries in particular are a convention rather than a measurement.',
    traditions: ['Modern Western (Juno Jordan / Hans Decoz lineage)'],
    sources: ['RESEARCH_NUMEROLOGY#pinnacles-and-challenges'],
};
/** Karmic debt: a named modern tradition, not a universal. */
export const KARMIC_DEBT_PROVENANCE = {
    kind: 'tradition-specific',
    settledness: 'conventional',
    basis: 'Karmic debt numbers are standard in the modern Western lineage and have no counterpart in Chaldean practice or in older Pythagorean sources.',
    traditions: ['Modern Western (Juno Jordan / Hans Decoz lineage)'],
    sources: ['RESEARCH_NUMEROLOGY#karmic-debt'],
};
/**
 * The transient cycles, where the schools genuinely disagree about the turnover
 * date. Carried as contested so the weighting model discounts it, and stated in
 * the reading rather than hidden.
 */
export const TRANSIENT_CYCLE = {
    kind: 'contested',
    settledness: 'contested',
    basis: 'The Personal Year is calculated from the birth month and day plus the calendar year, but the schools disagree on when it turns over.',
    dissent: 'One tradition rolls the Personal Year on 1 January; another rolls it on the birthday, with a transitional overlap of some months either side. A reading must state which convention it used, because in the months between January and the birthday the two conventions give different numbers.',
    traditions: ['Calendar-year convention', 'Birthday-pivot convention'],
    sources: ['RESEARCH_NUMEROLOGY#personal-cycles'],
};
/** Composed here from established parts under a stated rule. */
export const COMPOSED = {
    kind: 'contextual-derivation',
    settledness: 'conventional',
    basis: 'Composed by reading two or more established positions against each other under a stated rule; not quoted from a source discussing this exact combination.',
    sources: ['RESEARCH_NUMEROLOGY#core-positions', 'RESEARCH_NUMEROLOGY#pinnacles-and-challenges'],
};
/* ------------------------------------------------------------------ *
 * CANONICAL VALUE SETS - derived from the engine, not retyped
 * ------------------------------------------------------------------ */
/** Every value a core position can resolve to. */
export const CORE_NUMBERS = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '11', '22', '33'];
/** The Birth Day is the day of the month reduced, so 33 cannot occur. */
export const BIRTH_DAY_NUMBERS = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '11', '22'];
/** Name-frequency positions run on the nine single digits only. */
export const SINGLE_DIGITS = ['1', '2', '3', '4', '5', '6', '7', '8', '9'];
export const KARMIC_DEBTS = ['13', '14', '16', '19'];
export const PINNACLE_POSITIONS = ['first', 'second', 'third', 'fourth'];
/**
 * WHAT A CHALLENGE CAN ACTUALLY BE.
 *
 * A Challenge is the difference of two single digits - the birth month, day and
 * year reduced with master numbers reduced too (methodology contract,
 * Challenges) - so it runs from 0 to 8, and 0 is a real result. An earlier
 * engine kept masters in those parts and could return Challenges up to 21; the
 * readings it needed for 9, 11 and "a challenge above nine" were removed with it
 * because no chart can reach them.
 */
export const CHALLENGE_NUMBERS = ['0', '1', '2', '3', '4', '5', '6', '7', '8'];
/* ------------------------------------------------------------------ *
 * SEMANTICS
 * ------------------------------------------------------------------ */
/**
 * What each number contributes, as dimensions and magnitudes.
 *
 * Kept in one table so a 4 reads as structured in every role it occupies. The
 * magnitudes here are the full-strength values used by a core position; every
 * other role scales them down through ROLE_WEIGHT.
 */
const NUMBER_SIGNALS = {
    1: [['independent', 0.9], ['assertive', 0.8], ['novelty-seeking', 0.5], ['risk-oriented', 0.4]],
    2: [['collaborative', 0.9], ['emotionally-sensitive', 0.8], ['adaptable', 0.6], ['receptive', 0.5]],
    3: [['communicative', 0.9], ['creative', 0.8], ['emotionally-expressive', 0.6], ['social', 0.6]],
    4: [['structured', 0.9], ['stability-seeking', 0.9], ['practical', 0.7], ['persistent', 0.6]],
    5: [['adaptable', 0.9], ['novelty-seeking', 0.9], ['risk-oriented', 0.7], ['outwardly-engaged', 0.5]],
    6: [['collaborative', 0.8], ['stability-seeking', 0.7], ['emotionally-expressive', 0.6], ['structured', 0.4]],
    7: [['analytical', 0.9], ['introspective', 0.9], ['independent', 0.6], ['private', 0.4]],
    8: [['assertive', 0.9], ['structured', 0.7], ['practical', 0.6], ['risk-oriented', 0.5]],
    9: [['emotionally-sensitive', 0.7], ['conceptual', 0.6], ['collaborative', 0.6], ['creative', 0.5]],
    11: [['intuitive', 0.9], ['emotionally-sensitive', 0.9], ['introspective', 0.6], ['collaborative', 0.5]],
    22: [['structured', 0.9], ['practical', 0.8], ['persistent', 0.8], ['assertive', 0.6]],
    33: [['collaborative', 0.9], ['emotionally-expressive', 0.8], ['emotionally-sensitive', 0.7], ['communicative', 0.5]],
    13: [['structured', 0.5], ['persistent', 0.5], ['stability-seeking', 0.4]],
    14: [['adaptable', 0.5], ['novelty-seeking', 0.5], ['risk-oriented', 0.4]],
    16: [['introspective', 0.6], ['analytical', 0.4], ['novelty-seeking', 0.4]],
    19: [['independent', 0.7], ['assertive', 0.4], ['persistent', 0.4]],
};
/**
 * How much a role's reading should weigh in cross-pillar synthesis.
 *
 * The Life Path is the whole shape of a life. A Personal Day is a Tuesday. Both
 * resolve to a number and both carry the same dimensions, so without this the
 * synthesis layer would treat them as equal witnesses - which is the single most
 * obvious way a numerology adapter goes wrong.
 */
const ROLE_WEIGHT = {
    'life-path': 1,
    expression: 0.9,
    'soul-urge': 0.9,
    personality: 0.8,
    maturity: 0.7,
    birthday: 0.55,
    'hidden-passion': 0.55,
    attitude: 0.5,
    balance: 0.45,
    'karmic-lesson': 0.4,
    'karmic-debt': 0.4,
    pinnacle: 0.5,
    challenge: 0.4,
    'personal-year': 0.35,
    'personal-month': 0.2,
    'personal-day': 0.1,
};
function scaled(key, role, extra) {
    const factor = ROLE_WEIGHT[role] ?? 0.5;
    const totals = new Map();
    for (const [dimension, weight] of NUMBER_SIGNALS[key] ?? []) {
        totals.set(dimension, Math.min(1, Math.round(weight * factor * 100) / 100));
    }
    for (const signal of extra) {
        totals.set(signal.dimension, Math.min(1, (totals.get(signal.dimension) ?? 0) + signal.weight));
    }
    return [...totals.entries()]
        .filter(([, weight]) => weight > 0.05)
        .map(([dimension, weight]) => sig(dimension, Math.round(weight * 100) / 100))
        .sort((a, b) => a.dimension.localeCompare(b.dimension));
}
/** Exposed so a test can prove the weighting is monotonic across the scales. */
export function roleWeight(role) {
    return ROLE_WEIGHT[role] ?? 0.5;
}
/* ------------------------------------------------------------------ *
 * LABELS
 * ------------------------------------------------------------------ */
export const NUMBER_NAMES = {
    0: 'Zero', 1: 'One', 2: 'Two', 3: 'Three', 4: 'Four', 5: 'Five',
    6: 'Six', 7: 'Seven', 8: 'Eight', 9: 'Nine',
    11: 'Eleven', 22: 'Twenty-Two', 33: 'Thirty-Three',
    13: 'Thirteen', 14: 'Fourteen', 16: 'Sixteen', 19: 'Nineteen',
};
const ROLE_LABELS = {
    'life-path': 'Life Path',
    expression: 'Expression',
    'soul-urge': 'Soul Urge',
    personality: 'Personality',
    birthday: 'Birth Day',
    maturity: 'Maturity',
    balance: 'Balance',
    attitude: 'Attitude',
    'hidden-passion': 'Hidden Passion',
    'karmic-lesson': 'Karmic Lesson',
    'karmic-debt': 'Karmic Debt',
    pinnacle: 'Pinnacle',
    challenge: 'Challenge',
    'personal-year': 'Personal Year',
    'personal-month': 'Personal Month',
    'personal-day': 'Personal Day',
};
export function roleLabel(role) {
    return ROLE_LABELS[role] ?? role;
}
/**
 * One number, in one role.
 *
 * The label is derived rather than passed, so a Life Path 4 and a Personal Day 4
 * cannot end up with inconsistent naming, and the semantics are derived from the
 * number and scaled by the role for the reason set out above.
 */
/**
 * THE FOUR POSITIONS THAT READ AGAINST EACH OTHER.
 *
 * Attached here rather than at the 48 call sites, because the rule is about the
 * POSITION and not about any particular number in it: every core number is read
 * against the other core numbers, and a number added later gets that for free
 * rather than by somebody remembering.
 */
const PAIRED_ROLES = new Set(['life-path', 'expression', 'soul-urge', 'personality']);
export function roleUnit(role, entry, provenance) {
    /* The three name positions carry their depth in numerologyNamePortraits.ts,
       merged here so the reading files next door stay prose. An entry that
       declares its own portrait keeps it: the merge fills gaps, it does not
       overrule an author. */
    const merged = entry.portrait ?? NAME_PORTRAITS[`${role}-${entry.key}`];
    const composed = [
        ...(entry.overlays ?? []),
        ...(PAIRED_ROLES.has(role) ? interactionOverlays(role, entry.key) : []),
        ...(PAIRED_ROLES.has(role) ? [masterRootOverlay(role, entry.key)] : []),
    ].filter((overlay) => Boolean(overlay));
    return {
        id: unitId('numerology', 'number', entry.key, role),
        entity: {
            system: 'numerology',
            kind: 'number',
            key: entry.key,
            label: entry.label ?? `${NUMBER_NAMES[entry.key] ?? entry.key} — ${roleLabel(role)}`,
        },
        role,
        headline: entry.headline,
        core: entry.core,
        ...(merged ? { portrait: merged } : {}),
        ...(composed.length > 0 ? { overlays: composed } : {}),
        semantics: scaled(entry.key, role, entry.extra ?? []),
        provenance: entry.provenance ?? provenance,
    };
}
/** Curried per-role builders, so the content files stay prose. */
export const lifePathUnit = (entry) => roleUnit('life-path', entry, CORE_POSITION);
export const expressionUnit = (entry) => roleUnit('expression', entry, CORE_POSITION);
export const soulUrgeUnit = (entry) => roleUnit('soul-urge', entry, CORE_POSITION);
export const personalityUnit = (entry) => roleUnit('personality', entry, CORE_POSITION);
export const birthdayUnit = (entry) => roleUnit('birthday', entry, CORE_POSITION);
export const maturityUnit = (entry) => roleUnit('maturity', entry, DERIVED_POSITION);
export const balanceUnit = (entry) => roleUnit('balance', entry, DERIVED_POSITION);
export const attitudeUnit = (entry) => roleUnit('attitude', entry, DERIVED_POSITION);
export const hiddenPassionUnit = (entry) => roleUnit('hidden-passion', entry, NAME_PATTERN);
export const karmicLessonUnit = (entry) => roleUnit('karmic-lesson', entry, NAME_PATTERN);
export const karmicDebtUnit = (entry) => roleUnit('karmic-debt', entry, KARMIC_DEBT_PROVENANCE);
export const pinnacleUnit = (entry) => roleUnit('pinnacle', entry, CHAPTER);
export const challengeUnit = (entry) => roleUnit('challenge', entry, CHAPTER);
export const personalYearUnit = (entry) => roleUnit('personal-year', entry, TRANSIENT_CYCLE);
export const personalMonthUnit = (entry) => roleUnit('personal-month', entry, TRANSIENT_CYCLE);
export const personalDayUnit = (entry) => roleUnit('personal-day', entry, TRANSIENT_CYCLE);
/**
 * A frame rather than a number: what a Pinnacle position is, what a Personal
 * Day is for, how the three cycle scales are read against each other.
 */
export function conceptUnit(entry) {
    const kind = 'numerology-concept';
    return {
        id: unitId('numerology', kind, entry.key, 'base-archetype'),
        entity: { system: 'numerology', kind, key: entry.key, label: entry.label },
        role: 'base-archetype',
        headline: entry.headline,
        core: entry.core,
        semantics: entry.signals ?? [],
        provenance: entry.provenance ?? COMPOSED,
    };
}
/** Guard used by every content file: nothing ships with a value missing. */
export function assertComplete(what, expected, written) {
    const keys = new Set(written.map((unit) => unit.entity.key));
    const missing = expected.filter((key) => !keys.has(key));
    if (missing.length > 0) {
        throw new Error(`${what} has no reading for: ${missing.join(', ')}`);
    }
}
