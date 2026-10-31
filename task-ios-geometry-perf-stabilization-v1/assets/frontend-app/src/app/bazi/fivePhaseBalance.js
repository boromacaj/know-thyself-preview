import { BAZI_ELEMENTS } from './data/baziConstants.js?v=d9f39e7';
import { resolveHiddenStems } from './data/hiddenStems.js?v=d9f39e7';
/** Raw visible count: the four Heavenly Stems + four (or six, if Hour is missing) Earthly
 *  Branch primary elements. Denominator honestly shrinks to 6 objects when Hour is absent. */
export function calculateRawPhaseBalance(pillars) {
    const counts = emptyCounts();
    const includedObjects = [];
    for (const pillar of pillars) {
        counts[pillar.stem.element] += 1;
        includedObjects.push(`${pillar.key} stem (${pillar.stem.name})`);
        counts[pillar.branch.element] += 1;
        includedObjects.push(`${pillar.key} branch (${pillar.branch.name})`);
    }
    return layerFromCounts(counts, includedObjects, pillars.length < 4 ? ['Hour stem', 'Hour branch'] : []);
}
/** Hidden-stem contribution layer: structural membership across every present branch's hidden
 *  stems, counted once per stem slot (not weighted). Kept separate from the raw visible layer
 *  and from the optional weighted model below, per the project's evidence-separation rule. */
export function calculateHiddenStemPhaseBalance(pillars) {
    const counts = emptyCounts();
    const includedObjects = [];
    for (const pillar of pillars) {
        for (const contribution of resolveHiddenStems(pillar.branch.index)) {
            counts[contribution.stem.element] += 1;
            includedObjects.push(`${pillar.key} branch hidden stem (${contribution.stem.name}, ${contribution.role})`);
        }
    }
    return layerFromCounts(counts, includedObjects, pillars.length < 4 ? ['Hour branch hidden stems'] : []);
}
/**
 * Five-Phase seasonal governance ("month command" / 月令): each month branch assigns one phase
 * as seasonally "prosperous" (its own season), the phase it generates as "aided", the phase
 * that generates it as "resting", the phase that CONTROLS it as "trapped", and the phase it
 * CONTROLS as "dead". This is a standard, undisputed structural model, not a strength score.
 *
 * THE LAST TWO USED TO BE THE WRONG WAY ROUND, in this comment and in the table below.
 *
 * The classical set is 旺相休囚死. In spring, which is the wood month command:
 * wood is 旺 prosperous, fire 相 aided (wood generates it), water 休 resting (it generates
 * wood), METAL 囚 trapped - metal controls wood, and the tradition calls the controller
 * "imprisoned" because it spends itself against a season it cannot win - and EARTH 死 dead,
 * because wood controls earth. The code had trapped on the phase the season controls and
 * dead on the phase that controls the season, which is each one's opposite.
 *
 * It was invisible on most charts because it only swaps two of five states, and the three
 * unaffected ones cover the common cases. It surfaced as a contradiction rather than as a
 * wrong word: the fifty authored seasonal readings are written to the CLASSICAL definitions,
 * so a Ji (earth) Day Master in a wood month was handed the `trapped` reading, which opens
 * "Yin Earth in the water season, which earth controls" - water being the phase earth
 * controls - while the chart's own technical layer said the month was wood. One chart, two
 * seasons. The authored prose was right; this table was wrong.
 */
const GENERATING_ORDER = ['Wood', 'Fire', 'Earth', 'Metal', 'Water'];
const MONTH_BRANCH_SEASON = [
    /* Zi   */ 'Water',
    /* Chou */ 'Earth',
    /* Yin  */ 'Wood',
    /* Mao  */ 'Wood',
    /* Chen */ 'Earth',
    /* Si   */ 'Fire',
    /* Wu   */ 'Fire',
    /* Wei  */ 'Earth',
    /* Shen */ 'Metal',
    /* You  */ 'Metal',
    /* Xu   */ 'Earth',
    /* Hai  */ 'Water',
];
export function calculateSeasonalContext(monthBranchIndex, monthBranchName, dayMasterElement) {
    const rulingPhase = MONTH_BRANCH_SEASON[monthBranchIndex];
    if (!rulingPhase)
        throw new Error(`No seasonal governance defined for month branch index ${monthBranchIndex}.`);
    const rulingIndex = GENERATING_ORDER.indexOf(rulingPhase);
    const stateByPhase = {};
    for (const phase of BAZI_ELEMENTS) {
        const distance = mod(GENERATING_ORDER.indexOf(phase) - rulingIndex, 5);
        stateByPhase[phase] = STATE_BY_DISTANCE[distance];
    }
    return {
        monthBranchIndex,
        monthBranchName,
        rulingPhase,
        stateByPhase,
        dayMasterElement,
        dayMasterState: stateByPhase[dayMasterElement],
    };
}
/*
 * distance = position of the phase minus position of the month command, around
 * the generating cycle. So distance 2 is the phase the season CONTROLS (wood
 * season -> earth) and distance 3 is the phase that controls the season (wood
 * season -> metal). See the classical mapping above.
 */
const STATE_BY_DISTANCE = {
    0: 'prosperous',
    1: 'aided',
    4: 'resting',
    2: 'dead',
    3: 'trapped',
};
const SEASONAL_WEIGHT_MULTIPLIER = {
    prosperous: 1.5,
    aided: 1.2,
    resting: 1,
    trapped: 0.7,
    dead: 0.5,
};
export const DAY_MASTER_STRENGTH_MODEL_VERSION = 'kt-day-master-strength-heuristic-v1';
/**
 * A single, versioned, transparently-factored heuristic — explicitly a project balancing
 * hypothesis, not a definitive Useful-God/Yong-Shen determination (which this milestone does
 * not implement). Support = companion (same phase) + resource (generates Day Master) weighted
 * presence; Drain = output + wealth + authority (everything else) weighted presence.
 */
export function calculateDayMasterStrength(pillars, dayMasterElement, seasonalContext) {
    const dayMasterIndex = GENERATING_ORDER.indexOf(dayMasterElement);
    let supportScore = 0;
    let drainScore = 0;
    const factors = [];
    const visit = (phase, weight, sourceLabel) => {
        const distance = mod(GENERATING_ORDER.indexOf(phase) - dayMasterIndex, 5);
        const isSupport = distance === 0 || distance === 4;
        const seasonalMultiplier = SEASONAL_WEIGHT_MULTIPLIER[seasonalContext.stateByPhase[phase]];
        const contribution = weight * seasonalMultiplier;
        if (isSupport)
            supportScore += contribution;
        else
            drainScore += contribution;
        factors.push({
            label: sourceLabel,
            value: `${phase} / seasonal ${seasonalContext.stateByPhase[phase]} (x${seasonalMultiplier}) / ${isSupport ? 'support' : 'drain'} / weight ${round(contribution)}`,
        });
    };
    for (const pillar of pillars) {
        visit(pillar.stem.element, 1, `${pillar.key} stem (${pillar.stem.name})`);
        visit(pillar.branch.element, 1, `${pillar.key} branch (${pillar.branch.name})`);
        for (const contribution of resolveHiddenStems(pillar.branch.index)) {
            visit(contribution.stem.element, contribution.conventionalWeightPercent / 100, `${pillar.key} branch hidden stem (${contribution.stem.name})`);
        }
    }
    const total = supportScore + drainScore;
    const supportFraction = total > 0 ? round(supportScore / total) : 0.5;
    const tendency = classifyTendency(supportFraction);
    const nearThreshold = Object.values(THRESHOLDS).some((threshold) => Math.abs(supportFraction - threshold) < 0.04);
    return {
        tendency,
        supportScore: round(supportScore),
        drainScore: round(drainScore),
        supportFraction,
        confidence: pillars.length < 4 ? 'low' : nearThreshold ? 'medium' : 'high',
        modelVersion: DAY_MASTER_STRENGTH_MODEL_VERSION,
        factors,
        disclaimer: 'Model-derived balancing hypothesis, not a definitive Useful God (Yong Shen) determination. A different school or weighting convention may classify this chart differently.',
    };
}
/**
 * The support-fraction cuts between the five tendencies. Exported read-only so
 * the reading can say which line a near-threshold verdict sits beside; the
 * classification below is the only place they decide anything.
 */
export const DAY_MASTER_STRENGTH_THRESHOLDS = Object.freeze({
    weak: 0.35, moderatelyWeak: 0.45, moderatelyStrong: 0.55, strong: 0.65,
});
const THRESHOLDS = DAY_MASTER_STRENGTH_THRESHOLDS;
function classifyTendency(supportFraction) {
    if (supportFraction < THRESHOLDS.weak)
        return 'weak';
    if (supportFraction < THRESHOLDS.moderatelyWeak)
        return 'moderately-weak';
    if (supportFraction <= THRESHOLDS.moderatelyStrong)
        return 'balanced';
    if (supportFraction <= THRESHOLDS.strong)
        return 'moderately-strong';
    return 'strong';
}
function layerFromCounts(counts, includedObjects, missingObjects) {
    const totalCounted = Object.values(counts).reduce((sum, value) => sum + value, 0);
    const percentages = emptyCounts();
    for (const phase of BAZI_ELEMENTS) {
        percentages[phase] = totalCounted > 0 ? round((counts[phase] / totalCounted) * 100, 2) : 0;
    }
    const maxCount = Math.max(...BAZI_ELEMENTS.map((phase) => counts[phase]));
    const dominantPhases = maxCount > 0 ? BAZI_ELEMENTS.filter((phase) => counts[phase] === maxCount) : [];
    const absentPhases = BAZI_ELEMENTS.filter((phase) => counts[phase] === 0);
    return {
        counts,
        percentages,
        totalCounted,
        includedObjects,
        missingObjects,
        dominantPhases,
        isTie: dominantPhases.length > 1,
        absentPhases,
    };
}
function emptyCounts() {
    return { Wood: 0, Fire: 0, Earth: 0, Metal: 0, Water: 0 };
}
function mod(value, divisor) {
    return ((value % divisor) + divisor) % divisor;
}
function round(value, digits = 4) {
    const scale = 10 ** digits;
    return Math.round(value * scale) / scale;
}
