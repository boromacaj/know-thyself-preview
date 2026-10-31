import { SEMANTIC_AXES } from '../semantics/semanticTaxonomy.js?v=b5ef5ed';
/*
 * WHERE THE PERIOD AND THE CHART MEET.
 *
 * The old forecast could express exactly one relationship between a period and a
 * person: whether the Personal Year number happened to equal the Life Path
 * number. Everything else it said was true of anybody with that cycle number.
 *
 * This file computes three things instead, all of them on the semantic taxonomy
 * both sides already share:
 *
 *   CONVERGENCE          several current facts pressing the same way
 *   CURRENT vs CURRENT   two current facts on opposite poles of one axis
 *   CURRENT vs NATAL     the period pressing against how this chart works
 *
 * The third is the one the brief is really asking for and the one the old
 * architecture could not represent at all, because it never had the natal chart
 * in the room.
 *
 * NO NEW WEIGHTING MODEL. The natal side of a comparison is read straight from
 * the foundation's own weighted evidence - the same numbers the Portrait is
 * built from - so a dimension the chart holds strongly is strong here too, and
 * the two readings cannot disagree about what this person is like.
 */
/** How much natal weight sits on each dimension, from the foundation as-is. */
export function natalDimensionWeights(synthesis) {
    const weights = new Map();
    if (!synthesis)
        return weights;
    for (const item of synthesis.evidence) {
        /* Suppressed evidence is excluded for the same reason the Portrait excludes
           it: a result the model decided not to count must not come back in through
           a side door. */
        if (item.countedWeight <= 0)
            continue;
        const dimension = item.evidence.dimension;
        const existing = weights.get(dimension) ?? { weight: 0, facts: [] };
        existing.weight += item.countedWeight;
        /* The whole evidence item, not its fact STRING. The reading has to phrase a
           natal result the way the Portrait phrases it - „Slnko v Panne", not
           `Sun in Virgo` - and factPhrase needs the pillar and the source entity to
           do that. Keeping only the string here would have forced the composer to
           re-derive both from prose, which is how two screens start disagreeing
           about what the same result is called. */
        if (existing.facts.length < 4 && !existing.facts.some((known) => known.fact === item.evidence.fact)) {
            existing.facts.push(item.evidence);
        }
        weights.set(dimension, existing);
    }
    return weights;
}
const WIDEST = { long: 3, mid: 2, short: 1 };
/** Current facts pressing the same way, strongest first. */
export function temporalConvergences(signals) {
    const byDimension = new Map();
    for (const signal of signals) {
        byDimension.set(signal.dimension, [...(byDimension.get(signal.dimension) ?? []), signal]);
    }
    const convergences = [];
    for (const [dimension, group] of byDimension) {
        /* One signal is not a convergence, it is a fact. It still reaches the
           reading through the fact list; it does not get a heading of its own. */
        const systems = [...new Set(group.map((signal) => signal.fact.system))];
        const weight = group.reduce((total, signal) => total + signal.weight, 0);
        if (group.length < 2)
            continue;
        const band = group
            .map((signal) => signal.fact.band)
            .sort((left, right) => WIDEST[right] - WIDEST[left])[0];
        convergences.push({ dimension, signals: group, weight, systems, band });
    }
    return convergences.sort((left, right) => right.weight - left.weight);
}
const round = (value) => Math.round(value * 1000) / 1000;
/**
 * Both kinds of pull-apart, on the ten axes the taxonomy defines.
 *
 * A tension is only reported when BOTH sides carry real weight. A period that
 * presses toward `assertive` on a chart with almost nothing on `receptive` is
 * not a tension, it is simply a push - and reporting it as a conflict would be
 * the manufactured drama the brief forbids.
 */
export function temporalTensions(signals, natal) {
    const currentByDimension = new Map();
    for (const signal of signals) {
        currentByDimension.set(signal.dimension, [...(currentByDimension.get(signal.dimension) ?? []), signal]);
    }
    const currentWeight = (dimension) => (currentByDimension.get(dimension) ?? []).reduce((total, signal) => total + signal.weight, 0);
    /* The natal scale is the whole chart's evidence and the current scale is one
       period's, so they are normalised against their own totals before being
       compared. Without this every chart would look like it dwarfs every period. */
    const natalTotal = [...natal.values()].reduce((total, entry) => total + entry.weight, 0) || 1;
    const currentTotal = signals.reduce((total, signal) => total + signal.weight, 0) || 1;
    const natalShare = (dimension) => (natal.get(dimension)?.weight ?? 0) / natalTotal;
    const currentShare = (dimension) => currentWeight(dimension) / currentTotal;
    /*
     * THE NATAL THRESHOLD IS READ OFF THE CHART, NOT PICKED.
     *
     * Natal weight is spread across twenty-odd dimensions, so a typical share is
     * three to eight per cent and the largest is around thirteen. A fixed cut-off
     * of 0.08 - which is what the first version of this used - therefore excluded
     * almost every chart from having a natal side at all, and not one
     * current-vs-natal tension fired across six profiles. Self-calibrating on the
     * chart's own mean means "a dimension this chart actually leans on", whatever
     * that chart's spread happens to be.
     */
    const held = [...natal.values()].map((entry) => entry.weight / natalTotal).filter((share) => share > 0);
    const natalFloor = held.length > 0
        ? held.reduce((total, share) => total + share, 0) / held.length
        : 0;
    const tensions = [];
    for (const axis of SEMANTIC_AXES) {
        const [left, right] = axis.poles;
        /*
         * A PERIOD SPLIT AGAINST ITSELF IS READ AS THAT, FIRST.
         *
         * The natal comparison used to win every axis, and it produced a reading
         * that contradicted itself: the opening said „your chart leans introspective"
         * while two paragraphs later the same period was reported leaning
         * introspective too, because it had signals on BOTH poles and only the
         * outward one reached the natal comparison. Both statements were true and
         * together they were incoherent.
         *
         * So an axis where the period presses both ways is reported as the period's
         * own split - which is what it is - and only an axis where the period commits
         * to one direction is compared with the chart. That comparison is still the
         * finding this rebuild exists for; it just may not claim an axis the period
         * has not made up its mind about.
         */
        /*
         * TWO DIFFERENT THINGS PULL APART; ONE THING DOES NOT PULL AGAINST ITSELF.
         *
         * An influence can carry both poles of an axis (a Saturn contact that is structure and flexibility at once). It was then listed on both sides of the same pull
         * ("structure (Saturn sextile Mercury); flexibility (Saturn sextile Mercury)"), and could make the reading call a period mainly about flexibility and then say that
         * some influences pull toward flexibility. An influence on both poles is left out of both sides; an axis that only the shared influences press on is not a split.
         */
        const bothPoles = new Set((currentByDimension.get(left) ?? []).map((signal) => signal.fact.id)
            .filter((id) => (currentByDimension.get(right) ?? []).some((signal) => signal.fact.id === id)));
        const leftSignals = (currentByDimension.get(left) ?? []).filter((signal) => !bothPoles.has(signal.fact.id));
        const rightSignals = (currentByDimension.get(right) ?? []).filter((signal) => !bothPoles.has(signal.fact.id));
        const sideShare = (side) => side.reduce((total, signal) => total + signal.weight, 0) / currentTotal;
        const leftPress = sideShare(leftSignals);
        const rightPress = sideShare(rightSignals);
        if (bothPoles.size > 0 && (leftPress === 0 || rightPress === 0))
            continue;
        if (leftPress > 0 && rightPress > 0) {
            const [heavy, light] = leftPress >= rightPress ? [left, right] : [right, left];
            const [heavySignals, lightSignals] = heavy === left ? [leftSignals, rightSignals] : [rightSignals, leftSignals];
            const split = Math.min(leftPress, rightPress) / Math.max(leftPress, rightPress);
            if (split >= 0.35) {
                tensions.push({
                    kind: 'current-vs-current',
                    axis: axis.id,
                    current: { dimension: heavy, signals: heavySignals, weight: round(sideShare(heavySignals)) },
                    opposing: {
                        dimension: light,
                        weight: round(sideShare(lightSignals)),
                        signals: lightSignals,
                        natalFacts: [],
                    },
                    balance: round(split),
                });
                continue;
            }
        }
        let natalTension = null;
        for (const [pressing, opposing] of [[left, right], [right, left]]) {
            const press = currentShare(pressing);
            const hold = natalShare(opposing);
            /* The period must actually press, and the chart must actually lean the
               other way. Two soft numbers do not make a collision. */
            if (press < 0.06 || hold < natalFloor)
                continue;
            /* And the chart must not already agree: an `assertive` chart meeting an
               `assertive` period is a convergence, not a tension. */
            if (natalShare(pressing) >= hold)
                continue;
            const candidate = {
                kind: 'current-vs-natal',
                axis: axis.id,
                current: {
                    dimension: pressing,
                    signals: currentByDimension.get(pressing) ?? [],
                    weight: round(press),
                },
                opposing: {
                    dimension: opposing,
                    weight: round(hold),
                    signals: [],
                    natalFacts: natal.get(opposing)?.facts ?? [],
                },
                balance: round(Math.min(press, hold) / Math.max(press, hold)),
            };
            /* One per axis: the harder push wins, not both directions of the same
               disagreement. */
            if (!natalTension || candidate.current.weight > natalTension.current.weight) {
                natalTension = candidate;
            }
        }
        if (natalTension)
            tensions.push(natalTension);
    }
    /* Closest first: an evenly matched pull is more worth a reader's attention
       than a lopsided one, which is the same order the Portrait uses. */
    return tensions.sort((left, right) => right.balance - left.balance);
}
