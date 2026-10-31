import { aspectPairKey } from '../../../knowledge/astrology/astrologyAuthoring.js?v=f9ab0a6';
import { INDEPENDENCE_GROUPS } from '../evidenceIndependence.js?v=f9ab0a6';
import { structuralEvidenceAll } from './adapterSupport.js?v=f9ab0a6';
import { bridgeSeed } from './knowledgeBridge.js?v=f9ab0a6';
/**
 * WESTERN ASTROLOGY -> NORMALIZED EVIDENCE
 * ========================================
 *
 * WHERE THE MEANINGS COME FROM
 * ----------------------------
 * The knowledge layer, in a defined preference order per placement:
 *
 *   1. the composed PLACEMENT unit (`moon-pisces`), when one is written - this
 *      is a planet and a sign authored as one thing, with house and aspect
 *      overlays applied from the context passed here
 *   2. the SIGN's base archetype, which is the style the function operates in
 *
 * The planet is deliberately NOT a third fallback. Planet-as-function says what
 * is operating, not how, and reading character off it alone would attach the
 * same semantics to a Moon in Aries and a Moon in Pisces.
 *
 * This file previously carried `ELEMENT_DIMENSIONS` and `MODALITY_DIMENSIONS`
 * tables and derived every placement's meaning from them. That was a second
 * interpretation database, and it produced identical evidence for all three Fire
 * signs. It is gone; element and modality now resolve to their own knowledge
 * units, and only where the fact really is a whole-chart tally.
 *
 * ONE CHART, MANY TALLIES
 * -----------------------
 * Element balance, modality balance and hemisphere emphasis are not three facts.
 * They are three ways of counting THE SAME TEN PLACEMENTS - and the Sun is one
 * of the things being counted, so a Sun-in-Virgo chart has already contributed
 * to "Earth-heavy" before the element tally is read at all. All three therefore
 * share one independence group, and the individual placements they are computed
 * from get their own groups per body.
 *
 * GENERATIONAL PLANETS ARE NOT PERSONAL
 * -------------------------------------
 * Uranus, Neptune and Pluto stay in a sign for years, so their sign placement
 * describes a birth cohort rather than a person. They are recorded at `slight`
 * strength, which is enough to tint a theme other evidence already supports and
 * never enough to create one.
 *
 * THE BIRTH-TIME CLIFF
 * --------------------
 * Ascendant, Midheaven, houses and the Ascendant-derived chart ruler are
 * meaningless without an accurate birth time, and the engine flags that with
 * anglesSuppressed. Those readings are emitted as `suppressed`, which zeroes
 * their weight while keeping them visible for inspection. The Moon is a softer
 * case: it moves about 13 degrees a day, so on a noon estimate its sign is
 * usually right but can be wrong near a boundary - the engine reports exactly
 * that as moonSignBoundaryRisk, honoured here as `time-sensitive`.
 *
 * WITH THE BIRTH-TIME WINDOW (astrology/astrologyTimeWindow.ts) the heuristic
 * gives way to the proof. Every fact is asked whether it holds across the
 * window the birth could have been in: a sign, an aspect, the dominant element
 * and modality, the rising sign, the retrograde set. One that holds is read at
 * full weight whatever the precision - it is as certain as the date. One that
 * moves is `time-sensitive` for an estimate (the reader's estimate is evidence,
 * and the pillar shows the value as provisional) and `suppressed` for an
 * unknown time (the 12:00 reference is not). An aspect read without a time
 * carries no orb: the orb at 12:00 is not the reader's.
 */
const BODY_STRENGTH = {
    Sun: 'defining',
    Moon: 'defining',
    Mercury: 'strong',
    Venus: 'strong',
    Mars: 'strong',
    Jupiter: 'moderate',
    Saturn: 'moderate',
    Uranus: 'slight',
    Neptune: 'slight',
    Pluto: 'slight',
};
const GENERATIONAL = new Set(['Uranus', 'Neptune', 'Pluto']);
const key = (value) => value.toLowerCase();
export function astrologyEvidence(result, anglesSuppressed, birthTimeUncertain = anglesSuppressed, window = null) {
    if (result.status !== 'calculated' || !result.ephemeris)
        return [];
    const evidence = [];
    const structural = [];
    /* What a fact that moves inside the window is worth: see the header. */
    const moving = window?.precision === 'unknown' ? 'suppressed' : 'time-sensitive';
    const whenMoves = (moves) => (window && moves ? { methodology: moving } : {});
    const signMoves = (body) => (window?.bodies.find((entry) => entry.body === body)?.spans.length ?? 1) > 1;
    /* Whole Sign houses follow the rising sign alone: they hold when it holds. */
    const risingMoves = Boolean(window?.ascendant && window.ascendant.length > 1);
    const housesUsable = !anglesSuppressed && !risingMoves;
    const tallyMoves = (balances) => new Set((balances ?? []).map((balance) => dominantKey(balance))).size > 1;
    /*
     * A BOUNDARY IS A RISK ONLY WHEN THE TIME IS IN DOUBT.
     *
     * `moonSignBoundaryRisk` says the Moon is close enough to a sign edge that a
     * few hours either way would move it. That is a property of the EPHEMERIS and
     * it is true whether or not anybody knows the birth time - so on its own it
     * marked the Moon `time-sensitive` for readers who had supplied an exact one,
     * and `time-sensitive` carries a 0.7 methodology factor. A profile with an
     * exact 19:45 was therefore told "Birth time: Supplied" and, in the same
     * technical panel, that seven results had been "weighted down because they
     * depend on a birth time that was estimated". The discount was real, not just
     * the wording: measured at 0.7 on all seven.
     *
     * The risk is only realised when the time is actually uncertain, so the flag
     * now needs both. Exact keeps its full weight; approximate and unknown keep
     * the discount, which is what makes those three modes different.
     */
    const boundaryRisk = result.ephemeris.moonSignBoundaryRisk && birthTimeUncertain;
    /* The aspects each body carries, so a placement lookup can fire its aspect
       overlays. Keyed by body, holding the OTHER body's knowledge key. */
    const aspectsByBody = new Map();
    for (const aspect of result.aspects) {
        const a = aspectsByBody.get(aspect.bodyA) ?? [];
        a.push({ aspect: key(aspect.aspect), other: key(aspect.bodyB) });
        aspectsByBody.set(aspect.bodyA, a);
        const b = aspectsByBody.get(aspect.bodyB) ?? [];
        b.push({ aspect: key(aspect.aspect), other: key(aspect.bodyA) });
        aspectsByBody.set(aspect.bodyB, b);
    }
    /* The house each body falls in, when houses were computed at all. */
    const houseByBody = new Map();
    for (const placement of result.houses?.planetHouses ?? []) {
        houseByBody.set(placement.body, placement.house);
    }
    /* ---------------------------------------------------------- placements -- */
    for (const position of result.ephemeris.positions) {
        const strength = BODY_STRENGTH[position.body];
        if (!strength)
            continue;
        const generational = GENERATIONAL.has(position.body);
        /* Without a window only the Moon is at risk from a noon estimate - the Sun
           moves about a degree a day and the rest are slower still. With one, every
           body is asked, and the answer is proven rather than estimated. */
        const timeSensitive = !window && position.body === 'Moon' && boundaryRisk;
        const placementMoves = whenMoves(signMoves(position.body));
        const planetKey = key(position.body);
        const signKey = key(position.sign);
        const house = houseByBody.get(position.body);
        const seed = {
            sourceEntity: `placement-${position.body}`,
            fact: `${position.body} in ${position.sign} (${position.element}, ${position.modality})`,
            strength,
            independenceGroup: INDEPENDENCE_GROUPS.astrology.placement(position.body),
            ...(timeSensitive ? { methodology: 'time-sensitive' } : {}),
            ...placementMoves,
            ...(generational ? { context: 'Generational placement shared by a birth cohort' } : {}),
            lookups: [
                {
                    kind: 'planet',
                    key: `${planetKey}-${signKey}`,
                    role: 'natal-placement',
                    context: {
                        /* The house is only passed when the birth time supports it. Firing a
                           tenth-house overlay off a noon estimate would produce a confident
                           reading of a house the engine does not actually stand behind. */
                        ...(house !== undefined && housesUsable ? { house } : {}),
                        ...(aspectsByBody.has(position.body)
                            ? { aspects: aspectsByBody.get(position.body) }
                            : {}),
                    },
                },
                { kind: 'sign', key: signKey, role: 'base-archetype' },
            ],
        };
        evidence.push(...bridgeSeed('astrology', seed).evidence);
        /*
         * WHAT THE IDENTITY AND THE INNER LIFE ARE FOR - FROM THE SIGN, NOT THE PLANET.
         *
         * The planet unit holds a drive too, and it was briefly read here. That was
         * wrong in a way worth recording: every chart has all ten planets, so
         * "Saturn wants mastery" arrives identically for every person alive. A
         * signal every profile receives in the same quantity is not evidence about
         * anybody - it is a constant, and reading it made every portrait slightly
         * creative, slightly ambitious and slightly deep. Barnum through the data
         * model rather than through the prose.
         *
         * The SIGN differs from chart to chart, so it carries information. Only the
         * Sun and the Moon take this seed: they are the two symbols the tradition
         * organises everything else around, and the Ascendant already resolves its
         * sign in full a few lines below. Drives only - how the sign behaves is the
         * placement unit's job, and it does it better.
         */
        if (position.body === 'Sun' || position.body === 'Moon') {
            evidence.push(...bridgeSeed('astrology', {
                sourceEntity: `drive-${position.body}`,
                fact: `the ${position.sign} ${position.body}: what it reaches for`,
                strength,
                independenceGroup: INDEPENDENCE_GROUPS.astrology.placement(position.body),
                ...(timeSensitive ? { methodology: 'time-sensitive' } : {}),
                ...placementMoves,
                family: 'drive',
                lookups: [{ kind: 'sign', key: signKey, role: 'base-archetype' }],
            }).evidence);
        }
    }
    /* ------------------------------------------------- whole-chart tallies -- */
    const dominantElement = dominantKey(result.elementBalance);
    if (dominantElement) {
        /* A TALLY is not the element. The element's meaning comes from knowledge;
           what this adapter contributes is the structural observation that the
           chart leans that way, which is why the lookup is a knowledge unit and the
           independence group is the shared chart-balance one. */
        evidence.push(...bridgeSeed('astrology', {
            sourceEntity: 'elementBalance',
            fact: `Element emphasis: ${dominantElement}`,
            strength: 'strong',
            independenceGroup: INDEPENDENCE_GROUPS.astrology.chartBalance,
            context: 'Whole-chart emphasis rather than a single placement',
            ...whenMoves(tallyMoves(window?.elementBalances)),
            lookups: [{ kind: 'element', key: key(dominantElement), role: 'base-archetype' }],
        }).evidence);
    }
    const dominantModality = dominantKey(result.modalityBalance);
    if (dominantModality) {
        evidence.push(...bridgeSeed('astrology', {
            sourceEntity: 'modalityBalance',
            fact: `Modality emphasis: ${dominantModality}`,
            strength: 'moderate',
            independenceGroup: INDEPENDENCE_GROUPS.astrology.chartBalance,
            context: 'Whole-chart emphasis rather than a single placement',
            ...whenMoves(tallyMoves(window?.modalityBalances)),
            lookups: [{ kind: 'modality', key: key(dominantModality), role: 'base-archetype' }],
        }).evidence);
    }
    /* Hemisphere emphasis has no entity in any tradition's vocabulary - it is a
       count of which half of the chart the planets fell into - so it stays
       structural. It also needs houses, so it dies with the birth time. */
    const hemisphere = result.hemisphereBalance;
    if (hemisphere) {
        structural.push({
            sourceEntity: 'hemisphereBalance',
            fact: `Hemisphere emphasis: ${hemisphere.eastern}E/${hemisphere.western}W, `
                + `${hemisphere.northern}N/${hemisphere.southern}S`,
            dimensions: [
                hemisphere.eastern >= hemisphere.western ? 'independent' : 'collaborative',
                hemisphere.southern > hemisphere.northern ? 'social' : 'private',
            ],
            strength: 'moderate',
            interpretationKind: 'contextual-derivation',
            settledness: 'provisional',
            independenceGroup: INDEPENDENCE_GROUPS.astrology.chartBalance,
            structuralReason: 'A hemisphere tally is a count of where the planets fell, not a symbol any '
                + 'tradition names, so there is no entity to look up.',
            /* Withheld by the pillar whenever the houses are: no time, or a rising
               sign that changes within the estimate. */
            ...(!housesUsable ? { methodology: 'suppressed' } : {}),
        });
    }
    /* ------------------------------------------------------------- angles -- */
    const ascendant = result.houses?.angles.ascendant;
    if (ascendant) {
        evidence.push(...bridgeSeed('astrology', {
            sourceEntity: 'ascendant',
            fact: `Ascendant in ${ascendant.sign}`,
            strength: 'defining',
            independenceGroup: INDEPENDENCE_GROUPS.astrology.angles,
            context: 'Outward manner and first impression',
            ...(anglesSuppressed ? { methodology: 'suppressed' } : risingMoves ? { methodology: 'time-sensitive' } : {}),
            lookups: [{ kind: 'sign', key: key(ascendant.sign), role: 'base-archetype' }],
        }).evidence);
    }
    /* ------------------------------------------------------------ aspects -- */
    const throughout = new Set(window?.aspectsThroughout ?? []);
    for (const aspect of result.aspects) {
        const aspectMoves = whenMoves(!throughout.has(aspect.id));
        /* An orb read at 12:00 for someone with no birth time is not theirs; one read
           at an estimate is the reader's own, as the pillar shows it. */
        const fact = window?.precision === 'unknown'
            ? `${aspect.bodyA} ${aspect.aspect} ${aspect.bodyB}${throughout.has(aspect.id) ? ' (in orb all day)' : ''}`
            : `${aspect.bodyA} ${aspect.aspect} ${aspect.bodyB} (orb ${aspect.orb.toFixed(1)}°)`;
        /*
         * THE PAIR FIRST, THE HARMONIC AS THE FALLBACK.
         *
         * The knowledge layer holds twenty-six authored pairs - what a disciplining
         * function does to a thinking function - and the pillar reading has always
         * used them. This adapter asked only for the harmonic, so "Mercury square
         * Saturn" and "Venus square Neptune" reached the model as the same generic
         * reading of a square. The pair is the specific claim, so it is asked for
         * first; an unwritten pair still falls back to the harmonic, which is
         * thinner but true.
         *
         * A written pair is read at `moderate`: it names both bodies, which is more
         * than the harmonic alone can do, and still less than a placement.
         */
        const pairKey = aspectPairKey(aspect.bodyA, aspect.bodyB, aspect.aspect);
        const pair = bridgeSeed('astrology', {
            sourceEntity: `aspect-${aspect.id}`,
            fact,
            strength: 'moderate',
            ...aspectMoves,
            /* Its own group: a specific pair is a specific fact about the chart,
               unlike the harmonic tally it used to be folded into. */
            independenceGroup: INDEPENDENCE_GROUPS.astrology.aspectPair(pairKey),
            lookups: [{ kind: 'aspect', key: pairKey, role: 'natal-placement' }],
        });
        if (pair.evidence.length > 0) {
            evidence.push(...pair.evidence);
            continue;
        }
        evidence.push(...bridgeSeed('astrology', {
            sourceEntity: `aspect-${aspect.id}`,
            fact,
            strength: 'slight',
            ...aspectMoves,
            independenceGroup: INDEPENDENCE_GROUPS.astrology.aspectHarmonic(aspect.harmonic),
            lookups: [{ kind: 'aspect', key: key(aspect.aspect), role: 'base-archetype' }],
        }).evidence);
    }
    /* --------------------------------------------------------- retrograde -- */
    if (result.retrogradeBodies.length >= 3) {
        /* Reading retrogrades as inwardness is common in modern practice and absent
           from traditional practice. That disagreement lives in the knowledge unit's
           provenance, so the discount it earns comes from the same place as every
           other discount rather than being asserted here. */
        evidence.push(...bridgeSeed('astrology', {
            sourceEntity: 'retrogradeEmphasis',
            fact: `Retrograde bodies: ${result.retrogradeBodies.join(', ')}`,
            strength: 'slight',
            independenceGroup: INDEPENDENCE_GROUPS.astrology.chartBalance,
            ...whenMoves(Boolean(window?.bodies.some((entry) => entry.motionStates.length > 1))),
            lookups: [{ kind: 'chart-pattern', key: 'retrograde', role: 'base-archetype' }],
        }).evidence);
    }
    return [...evidence, ...structuralEvidenceAll('astrology', structural)];
}
function dominantKey(balance) {
    const entries = Object.entries(balance);
    if (entries.length === 0)
        return null;
    const sorted = [...entries].sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0]));
    const [topKey, topValue] = sorted[0];
    if (topValue <= 0)
        return null;
    /* A tie is not an emphasis. Reporting one would invent a dominant element
       where the chart is actually balanced. */
    if (sorted.length > 1 && sorted[1][1] === topValue)
        return null;
    return topKey;
}
