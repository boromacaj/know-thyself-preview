/**
 * INDEPENDENCE, AND WHY MOST "AGREEMENT" IS FAKE
 * ==============================================
 *
 * The single most dishonest thing a cross-system synthesis can do is count the
 * same fact several times and call the total a consensus.
 *
 * A natal chart is one object. The Sun sign, the element balance, the modality
 * balance and the hemisphere emphasis are four VIEWS of the same set of
 * planetary positions - the element balance literally counts the Sun again. If a
 * chart is Earth-heavy, all four will lean practical and structured, and a naive
 * tally reports "four independent confirmations". There is one confirmation.
 *
 * The same trap exists inside every pillar:
 *
 *   HUMAN DESIGN - Type and Strategy are not two facts. Strategy is a pure
 *   function of Type: a Generator's Strategy is "Respond" by definition. So are
 *   Signature and Not-Self theme. Counting them separately turns one mechanic
 *   into four votes.
 *
 *   BAZI - the Day Master element, the Day Master's seasonal state and the day
 *   master strength verdict are one construct examined three ways. Likewise the
 *   raw element counts and the hidden-stem element counts are two layers over
 *   the same four pillars.
 *
 *   NUMEROLOGY - Expression, Soul Urge and Personality all derive from the same
 *   birth name string; Life Path, Birth Day and the Pinnacles all derive from
 *   the same birth date. Two roots, many numbers.
 *
 * THE RULE
 * --------
 * Every evidence item declares an `independenceGroup`. Within any aggregation, a
 * group contributes ONE full-weight representative PER DIMENSION - the heaviest
 * member making that particular claim - and every further member making the same
 * claim is discounted to CORROBORATION_FACTOR of its own weight. Different
 * claims from one group are not in competition: one source saying two distinct
 * things is two statements, not one statement repeated.
 *
 * The remainder is not zero on purpose. Three Earth-heavy views of one chart are
 * genuinely a little more telling than one, because each additional view is a
 * chance for the pattern NOT to appear and it appeared anyway. But that is a
 * rounding adjustment, not a second witness, so the factor is deliberately
 * small.
 *
 * WHAT COUNTS AS A REAL SECOND WITNESS
 * ------------------------------------
 * Only a DIFFERENT PILLAR. Cross-pillar agreement is the only kind this engine
 * treats as structurally meaningful, because the four systems take different
 * inputs and were built by unrelated traditions. That is why themes report
 * `distinctPillars` and why nothing reaches `strong` support on one pillar
 * alone, however much evidence that pillar piles up.
 *
 * AND WHAT THAT STILL DOES NOT MEAN
 * ---------------------------------
 * Four symbolic systems agreeing is interpretive convergence. It is not
 * evidence that a trait is real. The engine measures how consistently a set of
 * symbol systems describe a person; it does not measure the person.
 */
/** Additional same-group members count at this fraction of their own weight. */
export const CORROBORATION_FACTOR = 0.15;
/**
 * Independence group keys, grouped by the underlying object they descend from.
 * Adapters must use these builders rather than inventing strings, so that the
 * coupling rules stay in one place and stay auditable.
 */
export const INDEPENDENCE_GROUPS = {
    numerology: {
        /** Everything computed from the birth date digits. */
        birthDate: 'numerology:birth-date',
        /** Everything computed from the birth name letters. */
        birthName: 'numerology:birth-name',
        /** Cyclical//timing numbers - a different question from the natal ones. */
        currentCycle: 'numerology:current-cycle',
    },
    astrology: {
        /** Any single body's own sign placement. Distinct per body. */
        placement: (body) => `astrology:placement:${body.toLowerCase()}`,
        /** Whole-chart tallies: element, modality, hemisphere. One object. */
        chartBalance: 'astrology:chart-balance',
        /**
         * Aspects, grouped by HARMONIC rather than by pair.
         *
         * A trine between Venus and Jupiter and a trine between Mars and Saturn are
         * different facts about the chart - but this adapter does not read WHICH
         * bodies are involved, only the harmonic, so both reduce to the same single
         * reading: "this chart has flowing aspects". Twenty of them are one
         * observation repeated, not twenty witnesses. Keying by pair let a
         * heavily-aspected chart pile up an enormous score on one dimension purely
         * because it had many aspects, which is the exact failure mode the
         * independence model exists to prevent - just at chart level instead of
         * pillar level.
         */
        aspectHarmonic: (harmonic) => `astrology:aspect-harmonic:${harmonic}`,
        /**
         * One authored aspect PAIR, which is a different kind of fact from the
         * harmonic tally above. "Mercury square Saturn" names both functions and the
         * relationship between them; it is one specific statement about the chart
         * rather than one more instance of "this chart has squares".
         */
        aspectPair: (pair) => `astrology:aspect-pair:${pair}`,
        /** Ascendant, MC and the chart ruler that is derived from the Ascendant. */
        angles: 'astrology:angles',
    },
    bazi: {
        /** Day Master identity, its seasonal state and the strength verdict. */
        dayMaster: 'bazi:day-master',
        /** Raw and hidden-stem element tallies over the same four pillars. */
        elementBalance: 'bazi:element-balance',
        /** Yin/Yang tally, also over the same four pillars. */
        polarityBalance: 'bazi:polarity-balance',
        /** One Ten God relationship category. Distinct per category. */
        tenGod: (category) => `bazi:ten-god:${category}`,
    },
    humanDesign: {
        /** Type, Strategy, Signature and Not-Self: one mechanic, four names. */
        typeMechanic: 'human-design:type-mechanic',
        /** Inner authority. */
        authority: 'human-design:authority',
        /** Profile lines. */
        profile: 'human-design:profile',
        /** Definition shape and the split groups that describe it. */
        definition: 'human-design:definition',
        /** One centre's defined/undefined state. Distinct per centre. */
        centre: (centre) => `human-design:centre:${centre}`,
        /**
         * One channel. Distinct per channel, because two channels are two separate
         * gate activations rather than two readings of one fact. A channel and the
         * centre it defines do NOT discount each other (different group strings, so
         * each would count at full weight); that is one reason centres are not
         * emitted at all - see humanDesignAdapter.ts.
         */
        channel: (id) => `human-design:channel:${id}`,
    },
};
/**
 * Apply the independence discount across a set of evidence.
 *
 * Returns, per evidence id, the discount factor to multiply its raw weight by:
 * 1 for the heaviest member of each (group, dimension) bucket,
 * CORROBORATION_FACTOR for the rest. Ties break on evidence id so the result is
 * deterministic for identical input.
 *
 * WHY THE BUCKET IS (GROUP, DIMENSION) AND NOT GROUP ALONE
 * --------------------------------------------------------
 * The rule this model enforces is that the same CLAIM must not be counted twice
 * because two correlated sources happened to make it. Bucketing by group alone
 * enforced something stricter and wrong: it let one source make only ONE
 * full-weight claim in total. A Life Path 7 says `analytical` and `introspective`
 * and `private` - three different statements from one legitimate source - and
 * group-only bucketing discounted two of them to 15% purely because the third
 * sorted heavier.
 *
 * That mattered much more after the knowledge layer became the source of
 * meaning, because a knowledge unit is authored to say several distinct things
 * with different magnitudes, where the old adapter tables said two or three
 * flat ones. Keeping the group-only bucket would have thrown away most of what
 * the integration was built to deliver.
 *
 * Same-dimension collisions inside a group are still caught, which is the case
 * the model was written for: Sun sign, element balance and modality balance all
 * saying `practical` still yields one representative and two corroborations.
 */
export function independenceDiscounts(weighed) {
    const byGroup = new Map();
    for (const item of weighed) {
        const group = `${item.evidence.independenceGroup}::${item.evidence.dimension}`;
        const bucket = byGroup.get(group);
        const entry = { id: item.evidence.id, rawWeight: item.rawWeight };
        if (bucket)
            bucket.push(entry);
        else
            byGroup.set(group, [entry]);
    }
    const discounts = new Map();
    for (const bucket of byGroup.values()) {
        /* Heaviest first; identical weights fall back to the id so two runs over the
           same profile can never disagree about which item represents the group. */
        const ordered = [...bucket].sort((a, b) => (b.rawWeight - a.rawWeight || a.id.localeCompare(b.id)));
        ordered.forEach((entry, index) => {
            discounts.set(entry.id, index === 0 ? 1 : CORROBORATION_FACTOR);
        });
    }
    return discounts;
}
/** The distinct pillars represented in a set of evidence. */
export function distinctPillarsOf(items) {
    const seen = new Set();
    for (const item of items)
        seen.add(item.evidence.pillar);
    /* Sorted so the reported order is stable regardless of evidence ordering. */
    return [...seen].sort();
}
