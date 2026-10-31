import { DAY_MASTER_STRENGTH_THRESHOLDS, } from '../../bazi/fivePhaseBalance.js?v=b5ef5ed';
/** Every family, in the order the Ziping strength rule reads them. */
export const FAMILIES = ['companion', 'resource', 'output', 'wealth', 'authority'];
export const PHASES = ['Wood', 'Fire', 'Earth', 'Metal', 'Water'];
const GENERATING_ORDER = ['Wood', 'Fire', 'Earth', 'Metal', 'Water'];
const mod = (value, divisor) => ((value % divisor) + divisor) % divisor;
/** The family a phase belongs to, seen from the Day Master - the Ten God distance rule. */
export function familyOf(dayMaster, phase) {
    const distance = mod(GENERATING_ORDER.indexOf(phase) - GENERATING_ORDER.indexOf(dayMaster), 5);
    return ['companion', 'output', 'wealth', 'authority', 'resource'][distance];
}
/** The phase that plays a family's role for this Day Master. */
export function phaseOf(dayMaster, family) {
    const distance = { companion: 0, output: 1, wealth: 2, authority: 3, resource: 4 }[family];
    return GENERATING_ORDER[mod(GENERATING_ORDER.indexOf(dayMaster) + distance, 5)];
}
/**
 * The three registers the plan selects its rules by. The DIRECTION is Ziping's
 * support-or-restrain rule (a thin Day Master is helped by what feeds it, an
 * ample one by an outlet); collapsing the engine's five grades into three is an
 * implementation convention, not doctrine - which is why the reading's own
 * verdict sentence keeps all five grades, and says when a verdict sits close to
 * the line between two of them.
 *
 * `indeterminate` is part of the engine's type but not something it emits; it
 * is read as `even` for rule selection only, and its verdict sentence says the
 * chart does not settle the question rather than claiming a balance.
 */
const BAND = {
    weak: 'thin',
    'moderately-weak': 'thin',
    balanced: 'even',
    indeterminate: 'even',
    'moderately-strong': 'ample',
    strong: 'ample',
};
/** Under half a visible character's weight - an editorial cut, named as such in the evidence. */
const SCARCE_BELOW = 0.5;
/**
 * The tendency on the far side of the cut nearest the support fraction - which
 * is what the engine's "medium" confidence is about. The cuts and their
 * direction are the engine's own (fivePhaseBalance.ts): below 0.35 weak, below
 * 0.45 moderately weak, up to 0.55 balanced, up to 0.65 moderately strong.
 */
function nearLineOf(fraction, tendency) {
    const cuts = [
        [DAY_MASTER_STRENGTH_THRESHOLDS.weak, 'weak', 'moderately-weak'],
        [DAY_MASTER_STRENGTH_THRESHOLDS.moderatelyWeak, 'moderately-weak', 'balanced'],
        [DAY_MASTER_STRENGTH_THRESHOLDS.moderatelyStrong, 'balanced', 'moderately-strong'],
        [DAY_MASTER_STRENGTH_THRESHOLDS.strong, 'moderately-strong', 'strong'],
    ];
    const [, below, above] = [...cuts].sort((a, b) => Math.abs(fraction - a[0]) - Math.abs(fraction - b[0]))[0];
    if (tendency === below)
        return above;
    if (tendency === above)
        return below;
    return null;
}
const round = (value) => Math.round(value * 100) / 100;
const emptyPhases = () => ({ Wood: 0, Fire: 0, Earth: 0, Metal: 0, Water: 0 });
function leanOf(yin, yang) {
    if (yin === yang)
        return 'even';
    return yin > yang ? 'yin' : 'yang';
}
/** Weights are rounded to hundredths, so anything closer than this is the same weight. */
const SAME_WEIGHT = 1e-9;
/**
 * Heaviest first, with equal weights broken by reasons rather than by list
 * position - see `BaziInterpretation.ranking`. The list order is the last
 * resort only, and it is reached only when every reason ties too.
 */
function ranked(weights, tieBreak) {
    return [...FAMILIES].sort((a, b) => {
        const byWeight = weights[b] - weights[a];
        if (Math.abs(byWeight) > SAME_WEIGHT)
            return byWeight;
        if (tieBreak.season === a)
            return -1;
        if (tieBreak.season === b)
            return 1;
        const bySurface = tieBreak.visible[b] - tieBreak.visible[a];
        if (bySurface !== 0)
            return bySurface;
        const byHourless = tieBreak.hourless[b] - tieBreak.hourless[a];
        if (Math.abs(byHourless) > SAME_WEIGHT)
            return byHourless;
        return FAMILIES.indexOf(a) - FAMILIES.indexOf(b);
    });
}
/**
 * The model, or null when the engine did not calculate a chart. The precision
 * comes from the profile rather than from the engine, because the engine only
 * knows whether a time was supplied - and an estimated time is supplied.
 */
export function interpretBazi(chart) {
    const bazi = chart?.bazi;
    /* A missing season is not a missing chart: the reading says the season is
       unresolved and reads the rest. A missing strength model is - every rule the
       plan selects starts from it - so that stays the one reason to return null. */
    if (!bazi || bazi.status !== 'calculated' || !bazi.dayMaster || !bazi.yearPillar || !bazi.monthPillar
        || !bazi.dayPillar || !bazi.dayMasterStrength) {
        return null;
    }
    const dayMaster = bazi.dayMaster;
    const pillars = [bazi.yearPillar, bazi.monthPillar, bazi.dayPillar,
        ...(bazi.hourPillar ? [bazi.hourPillar] : [])];
    /* ------------------------------------------------------- the families */
    const tally = Object.fromEntries(FAMILIES.map((family) => [family,
        { visible: 0, hidden: 0, hour: 0, gods: [], godWeights: {}, visibleGods: [] }]));
    const note = (family, god, share) => {
        const entry = tally[family];
        if (!entry.gods.includes(god))
            entry.gods.push(god);
        entry.godWeights[god] = (entry.godWeights[god] ?? 0) + share;
    };
    for (const pillar of pillars) {
        const fromHour = pillar.key === 'Hour';
        if (pillar.tenGod) {
            const entry = tally[pillar.tenGod.category];
            entry.visible += 1;
            if (fromHour)
                entry.hour += 1;
            entry.visibleGods.push({ god: pillar.tenGod.tenGod, position: pillar.key });
            note(pillar.tenGod.category, pillar.tenGod.tenGod, 1);
        }
        for (const { contribution, tenGod } of pillar.hiddenStemTenGods) {
            const share = contribution.conventionalWeightPercent / 100;
            tally[tenGod.category].hidden += share;
            if (fromHour)
                tally[tenGod.category].hour += share;
            note(tenGod.category, tenGod.tenGod, share);
        }
    }
    const families = Object.fromEntries(FAMILIES.map((family) => {
        const entry = tally[family];
        const reading = {
            family,
            phase: phaseOf(dayMaster.element, family),
            visible: entry.visible,
            hidden: round(entry.hidden),
            weight: round(entry.visible + entry.hidden),
            hourWeight: round(entry.hour),
            gods: entry.gods,
            godWeights: Object.fromEntries(Object.entries(entry.godWeights)
                .map(([god, weight]) => [god, round(weight ?? 0)])),
            visibleGods: entry.visibleGods,
        };
        return [family, reading];
    }));
    const seasonFamily = bazi.seasonalContext ? familyOf(dayMaster.element, bazi.seasonalContext.rulingPhase) : null;
    const weights = Object.fromEntries(FAMILIES.map((family) => [family, families[family].weight]));
    const withoutHour = Object.fromEntries(FAMILIES.map((family) => [family,
        families[family].weight - families[family].hourWeight]));
    const surface = Object.fromEntries(FAMILIES.map((family) => [family, families[family].visible]));
    const ranking = ranked(weights, { season: seasonFamily, visible: surface, hourless: withoutHour });
    /* --------------------------------------------------------- the counts */
    const visible = { ...emptyPhases(), ...bazi.elementCounts };
    const hidden = { ...emptyPhases(), ...(bazi.hiddenStemBalance?.counts ?? {}) };
    const visibleTotal = pillars.length * 2;
    const ownVisible = visible[dayMaster.element];
    const share = ownVisible <= 1 ? 'alone' : ownVisible * 8 >= visibleTotal * 3 ? 'plenty' : 'some';
    /* ------------------------------------------------------- the polarity */
    const yin = bazi.polarityCounts.Yin;
    const yang = bazi.polarityCounts.Yang;
    const hourPillar = bazi.hourPillar;
    const hourYin = hourPillar
        ? [hourPillar.stem.polarity, hourPillar.branch.polarity].filter((value) => value === 'Yin').length : 0;
    const hourYang = hourPillar ? 2 - hourYin : 0;
    /* ------------------------------------------------------ the relations */
    const pillarAt = Object.fromEntries(pillars.map((pillar) => [pillar.key, pillar]));
    const sideOf = (position, isStem) => {
        const pillar = pillarAt[position];
        if (!pillar)
            return null;
        if (isStem) {
            return {
                position,
                family: pillar.tenGod?.category ?? 'self',
                god: pillar.tenGod?.tenGod ?? null,
                phase: pillar.stem.element,
            };
        }
        const primary = [...pillar.hiddenStemTenGods]
            .sort((a, b) => b.contribution.conventionalWeightPercent - a.contribution.conventionalWeightPercent)[0];
        return {
            position,
            family: primary?.tenGod.category ?? familyOf(dayMaster.element, pillar.branch.element),
            god: primary?.tenGod.tenGod ?? null,
            phase: pillar.branch.element,
        };
    };
    const relations = bazi.relationships.map((relationship) => {
        const positions = relationship.participants.map((participant) => participant.pillarKind);
        const isStem = relationship.category === 'stem-combination' || relationship.category === 'stem-clash';
        return {
            category: relationship.category,
            label: relationship.label,
            positions,
            complete: relationship.completeness === 'complete',
            involvesDayMaster: isStem && positions.includes('Day'),
            involvesHour: positions.includes('Hour'),
            sides: positions.map((position) => sideOf(position, isStem))
                .filter((side) => side !== null),
            resultingPhase: relationship.resultingElement,
        };
    });
    const strength = bazi.dayMasterStrength;
    const precision = chart?.timePrecision
        ?? (bazi.birthTimePrecision === 'estimated-local-noon' ? 'unknown' : 'exact');
    return {
        dayMaster: {
            stem: dayMaster.name, character: dayMaster.character, phase: dayMaster.element, polarity: dayMaster.polarity,
        },
        season: bazi.seasonalContext && seasonFamily ? {
            ruling: bazi.seasonalContext.rulingPhase,
            state: bazi.seasonalContext.dayMasterState,
            family: seasonFamily,
            monthBranch: bazi.seasonalContext.monthBranchName,
        } : null,
        strength: {
            tendency: strength.tendency,
            band: BAND[strength.tendency],
            confidence: strength.confidence,
            supportScore: strength.supportScore,
            drainScore: strength.drainScore,
            nearLine: strength.confidence === 'medium' ? nearLineOf(strength.supportFraction, strength.tendency) : null,
        },
        counts: { visible, hidden, visibleTotal },
        own: { visible: ownVisible, share },
        families,
        ranking,
        scarce: FAMILIES.filter((family) => families[family].weight < SCARCE_BELOW),
        rankingWithoutHour: ranked(withoutHour, { season: seasonFamily, visible: surface, hourless: withoutHour }),
        polarity: {
            yin, yang, lean: leanOf(yin, yang), leanWithoutHour: leanOf(yin - hourYin, yang - hourYang),
            dayMaster: dayMaster.polarity,
        },
        relations,
        time: {
            precision,
            hour: Boolean(hourPillar),
            hourAlternatives: precision === 'approximate' && hourPillar
                ? (chart?.timeWindow?.hour?.values ?? []).filter((label) => label !== hourPillar.label)
                : [],
            dateBoundary: precision === 'unknown' && chart?.timeWindow && chart.timeWindow.month.values.length > 1
                ? {
                    year: chart.timeWindow.year.values.length > 1,
                    months: chart.timeWindow.month.values,
                    at: chart.timeWindow.month.changesAt[0] ?? '',
                }
                : null,
        },
    };
}
