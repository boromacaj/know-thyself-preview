import { INDEPENDENCE_GROUPS } from '../evidenceIndependence.js?v=f9ab0a6';
import { bridgeSeed } from './knowledgeBridge.js?v=f9ab0a6';
/**
 * BAZI -> NORMALIZED EVIDENCE
 * ===========================
 *
 * BaZi is read outward from ONE symbol: the Day Master, the Heavenly Stem of the
 * day pillar. Everything else in the chart is a statement about that stem -
 * whether the season supports it, whether the other pillars feed or drain it,
 * what each stem is in relation to it. That structure is why the double-counting
 * risk here is so high, and it is handled by putting the Day Master's identity,
 * its seasonal state and the strength verdict into ONE independence group. They
 * are one construct examined three times, not three witnesses.
 *
 * WHERE THE MEANINGS COME FROM
 * ----------------------------
 * The knowledge layer, and for the Day Master the CONTEXT is the whole point.
 * The Ziping tradition weighs three things before saying anything about a stem -
 * the commanding month, rooting, and overall momentum - so this adapter's real
 * job is translating the engine's own seasonal and strength verdicts into the
 * knowledge layer's context vocabulary and letting the resolver compose the
 * reading. A Ji Earth in autumn is not a Ji Earth with an autumn note appended;
 * the knowledge overlay replaces the core outright, and that only happens if the
 * season is passed in.
 *
 * The `ELEMENT_DIMENSIONS`, `POLARITY_DIMENSIONS` and `TEN_GOD_DIMENSIONS`
 * tables that used to live here are gone. They gave every Water Day Master the
 * same three dimensions regardless of stem, polarity, season or strength, which
 * is precisely the flattening the knowledge layer was built to end.
 *
 * SYMBOLIC AND EDUCATIONAL ONLY
 * -----------------------------
 * The project rule is that TCM/BaZi content carries no health claims. Nothing in
 * this adapter emits a constitutional, medical or physiological reading, and the
 * taxonomy has no dimension that could express one. The tcmConstitution field on
 * the engine result is deliberately not read.
 *
 * THE HOUR PILLAR IS NEVER INVENTED
 * ---------------------------------
 * With no birth time the engine leaves the Hour Pillar Unavailable rather than
 * guessing, and the element tallies then run over six objects instead of eight.
 * Those tallies are real but narrower, so they are marked time-sensitive: a
 * missing quarter of the chart could move a dominant phase.
 */
/** The ruling phase of the month branch IS the season, in the knowledge model. */
const SEASON_FOR_PHASE = {
    Wood: 'spring',
    Fire: 'summer',
    Earth: 'late-summer',
    Metal: 'autumn',
    Water: 'winter',
};
/**
 * The engine's five-point strength scale collapses onto the knowledge layer's
 * three expression states. The collapse is lossy and deliberate: the knowledge
 * overlays are authored for excess / balanced / deficient, and inventing two
 * more states to preserve the engine's resolution would mean authoring content
 * for distinctions no tradition writes about separately.
 */
const STATE_FOR_TENDENCY = {
    strong: 'excess',
    'moderately-strong': 'excess',
    balanced: 'balanced',
    'moderately-weak': 'deficient',
    weak: 'deficient',
    indeterminate: null,
};
const key = (value) => value.toLowerCase();
/*
 * THE BIRTH-TIME WINDOW (bazi/baziTimeWindow.ts). The Day Master is the day's
 * stem and holds whatever the hour. Two things can move: the Hour Pillar
 * within an estimate, and the Year and Month Pillars on a solar-term boundary
 * day. A fact that reads a moving pillar is `time-sensitive` for an estimate
 * and `suppressed` for an unknown time - the pillar in force at 12:00 is a
 * reference, not the reader's - exactly as the other adapters treat a moving
 * value (synthesis/foundation/crossPillarSynthesis.ts, SynthesisInput).
 */
export function baziEvidence(result, window = null) {
    if (result.status !== 'calculated')
        return [];
    const evidence = [];
    const hourMissing = result.hourPillar === null;
    const dayMasterGroup = INDEPENDENCE_GROUPS.bazi.dayMaster;
    const dateMoves = Boolean(window && (window.year.values.length > 1 || window.month.values.length > 1));
    const hourMoves = Boolean(window?.hour && window.hour.values.length > 1);
    const moving = window?.window.precision === 'unknown' ? 'suppressed' : 'time-sensitive';
    /* The narrower-chart discount the missing Hour Pillar has always earned, or
       the window's verdict when a pillar this fact reads moves. */
    const methodologyFor = (readsHour, readsDate) => (readsDate && dateMoves ? { methodology: moving }
        : readsHour && hourMoves ? { methodology: 'time-sensitive' }
            : hourMissing ? { methodology: 'time-sensitive' } : {});
    /* ------------------------------------------------------- day master -- */
    const dayMaster = result.dayMaster;
    if (dayMaster) {
        const season = result.seasonalContext
            ? SEASON_FOR_PHASE[result.seasonalContext.rulingPhase]
            : undefined;
        const state = result.dayMasterStrength
            ? STATE_FOR_TENDENCY[result.dayMasterStrength.tendency]
            : null;
        const context = {
            ...(season ? { season } : {}),
            ...(state ? { state } : {}),
        };
        const stemKey = key(dayMaster.name);
        const facts = [`Day Master ${dayMaster.name} (${dayMaster.polarity} ${dayMaster.element})`];
        if (result.seasonalContext) {
            facts.push(`${result.seasonalContext.dayMasterState} in `
                + `${result.seasonalContext.monthBranchName} month `
                + `(${result.seasonalContext.rulingPhase} ruling)`);
        }
        if (result.dayMasterStrength && result.dayMasterStrength.tendency !== 'indeterminate') {
            facts.push(`tendency ${result.dayMasterStrength.tendency}`);
        }
        /* The strength verdict stays CONTEXT rather than becoming its own evidence.
           It is not a separate fact about the chart - it decides which reading of
           the Day Master is correct, and emitting it separately is what the old
           adapter did, leaving the independence group to undo most of it. */
        evidence.push(...bridgeSeed('bazi', {
            sourceEntity: 'dayMaster',
            fact: facts.join('; '),
            /* The chart's reference point. Nothing in BaZi outranks it. */
            strength: 'defining',
            independenceGroup: dayMasterGroup,
            /* Its season and strength read the month and every other pillar. */
            ...methodologyFor(true, true),
            ...(hourMissing ? { context: 'Read without the Hour Pillar' } : {}),
            lookups: [
                { kind: 'day-master', key: stemKey, role: 'day-master-role', context },
                /* No day-master content written for this stem yet: fall back to the
                   stem's own archetype, which every stem has. The reading is thinner and
                   carries no seasonal composition, and that is the honest result. */
                { kind: 'heavenly-stem', key: stemKey, role: 'base-archetype' },
            ],
        }).evidence);
        /* THE SEASON IS A SECOND SEED, AND DELIBERATELY SO.
           It used to be a `replace-core` overlay on the Day Master unit, which is
           why it arrived as context above. There are now fifty written readings -
           every stem in each of the engine's five seasonal states - held as their
           own units, and the composed screen resolves one of them instead of the
           plain stem core. Synthesis has to see the same reading, or the layer that
           the Ziping tradition weighs most heavily would be the one layer with no
           semantic representation at all.
           It goes in the SAME independence group as the stem, so the corroboration
           discount treats the two as one source rather than as two agreeing
           witnesses. That is the mechanism built for exactly this, and it is a
           better answer than dropping the season. */
        if (result.seasonalContext) {
            const seasonalKey = `${stemKey}-${result.seasonalContext.dayMasterState}`;
            evidence.push(...bridgeSeed('bazi', {
                sourceEntity: 'dayMasterSeason',
                fact: `Day Master ${dayMaster.name} is seasonally `
                    + `${result.seasonalContext.dayMasterState} in the `
                    + `${result.seasonalContext.monthBranchName} month `
                    + `(${result.seasonalContext.rulingPhase} ruling)`,
                /* Strong, not defining: the stem is the subject and this is its
                   condition. */
                strength: 'strong',
                independenceGroup: dayMasterGroup,
                ...methodologyFor(false, true),
                lookups: [{ kind: 'day-master', key: seasonalKey, role: 'seasonal-context' }],
            }).evidence);
        }
    }
    /* --------------------------------------------------- element balance -- */
    const balance = result.rawPhaseBalance;
    if (balance && !balance.isTie && balance.dominantPhases.length === 1) {
        const dominant = balance.dominantPhases[0];
        evidence.push(...bridgeSeed('bazi', {
            sourceEntity: 'elementBalance',
            fact: `Dominant phase: ${dominant} (${balance.counts[dominant]} of ${balance.totalCounted})`,
            strength: 'strong',
            independenceGroup: INDEPENDENCE_GROUPS.bazi.elementBalance,
            ...methodologyFor(true, true),
            context: hourMissing
                ? 'Whole-chart emphasis, counted without the Hour Pillar'
                : 'Whole-chart emphasis rather than the Day Master itself',
            lookups: [{ kind: 'five-element', key: key(dominant), role: 'base-archetype' }],
        }).evidence);
    }
    /* -------------------------------------------------- polarity balance -- */
    const yang = result.polarityCounts.Yang;
    const yin = result.polarityCounts.Yin;
    if (yang !== yin) {
        const leaning = yang > yin ? 'Yang' : 'Yin';
        evidence.push(...bridgeSeed('bazi', {
            sourceEntity: 'polarityBalance',
            fact: `Polarity balance: ${yang} Yang / ${yin} Yin`,
            strength: 'moderate',
            independenceGroup: INDEPENDENCE_GROUPS.bazi.polarityBalance,
            ...methodologyFor(true, true),
            lookups: [{ kind: 'polarity', key: key(leaning), role: 'base-archetype' }],
        }).evidence);
    }
    /* ------------------------------------------------------------ ten gods -- */
    /* Counted per CATEGORY, not per pillar. Two pillars showing the same category
       are one emphasis observed twice, so they share the category's group. */
    const categoryCounts = new Map();
    const categoryGods = new Map();
    for (const pillar of [result.yearPillar, result.monthPillar, result.hourPillar]) {
        const tenGod = pillar?.tenGod;
        if (!tenGod?.category)
            continue;
        categoryCounts.set(tenGod.category, (categoryCounts.get(tenGod.category) ?? 0) + 1);
        if (!categoryGods.has(tenGod.category))
            categoryGods.set(tenGod.category, tenGod.tenGod);
    }
    for (const [category, count] of [...categoryCounts.entries()].sort()) {
        const godName = categoryGods.get(category);
        if (!godName)
            continue;
        evidence.push(...bridgeSeed('bazi', {
            sourceEntity: `tenGod-${category}`,
            fact: `Ten God emphasis: ${category} (${count} stem${count === 1 ? '' : 's'})`,
            strength: count >= 2 ? 'moderate' : 'slight',
            independenceGroup: INDEPENDENCE_GROUPS.bazi.tenGod(category),
            ...methodologyFor(true, true),
            lookups: [{ kind: 'ten-god', key: tenGodKey(godName), role: 'base-archetype' }],
        }).evidence);
    }
    return evidence;
}
/**
 * The engine names a Ten God in English ('Direct Officer', 'Hurting Officer');
 * the knowledge layer keys them lower-kebab. Pure string normalisation - the
 * meaning behind the name is not this adapter's business.
 */
function tenGodKey(name) {
    return name.toLowerCase().replace(/[^a-z0-9]+/g, ' ').trim().replace(/\s+/g, '-');
}
