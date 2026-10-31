import { poleSupport } from './dayEvidence.js?v=d9f39e7';
import { AXIS_OF_POLE, DAY_AXES, OPPOSITE_POLE, } from './dayTypes.js?v=d9f39e7';
/*
 * BACKGROUND x TRIGGER.
 *
 * The day is not the sum of every fact in force. The TRIGGERS decide what is
 * distinct about today; the BACKGROUND says what it sits inside, and is allowed to
 * qualify a trigger or oppose it. A background condition never produces a claim
 * about today by itself: the Personal Year cannot tell you what to do this
 * afternoon, only whether this afternoon's pull fits or fights the year you are in.
 *
 * WHAT THIS PRODUCES, PER AXIS (pace, focus, contact, feeling, motion, commitment,
 * friction, expression)
 *   clear      one pole leads on trigger weight alone, and the other does not push
 *              back hard enough to call it a contest
 *   contested  both poles carry real trigger weight, from DIFFERENT influences.
 *              This is kept as a contest. It is never averaged into "moderate".
 *   weak/quiet nothing to say. Silence is a valid result.
 *
 * AND ACROSS AXES
 *   A few pairs of poles on different axes are natural opponents - a pull to
 *   begin against a signal to hold the decision open; a push to decide against a
 *   charged exchange. If two different influences each press one side of such a
 *   pair, that is a tension too, and it is interpreted, not smoothed away.
 *
 * Thresholds are named and exported so a test can state them, and so changing one
 * is a visible edit with a version bump (DAY_ENGINE_VERSION).
 */
export const THRESHOLDS = {
    /** Trigger weight a pole needs to lead its axis. */
    leadMin: 0.5,
    /** Below this on both poles an axis has nothing to say. */
    quietMax: 0.35,
    /** Each pole needs this much to take part in a contest: more than one cycle number's primary lean. */
    contestMin: 0.7,
    /** And the weaker must be at least this share of the stronger. */
    contestRatio: 0.7,
    /** Counter-weight that lowers confidence in a lead without making it a contest. */
    counterMin: 0.3,
    /** Background weight that counts as lending to a pole. */
    backgroundMin: 0.5,
    /**
     * A background presses AGAINST a leading pole only when both are substantial:
     * the day's lead must be exact-level (a close aspect, or two pillars agreeing)
     * and the background at least this heavy the other way. A Personal Month lasts
     * a month and a Personal Day alone is an ordinary lead, so "today runs against
     * this month" said every day would be noise, not a finding. It is said when a
     * day has something sharp enough to run against it.
     */
    backgroundOppose: 0.7,
    opposeLeadMin: 1.2,
};
/** Pole pairs on different axes that pull against each other when two influences each press one. */
export const CROSS_AXIS_TENSIONS = [
    { id: 'begin-vs-hold', poles: ['begin', 'keep-open'] },
    { id: 'decide-vs-friction', poles: ['commit', 'charged'] },
    { id: 'speak-vs-friction', poles: ['speak', 'charged'] },
];
/**
 * Confidence in a leading pole, from trigger weight and independence alone.
 * An exact aspect on its own is enough for `high`; a cycle number on its own is
 * `medium`; a real second witness (another pillar) adds a step; a counter-weight
 * or a background pressing the other way takes one away.
 */
export function confidenceOf(reading, counter, opposed) {
    const weight = reading.trigger.total;
    let tier = weight >= 1 ? 3 : weight >= 0.7 ? 2 : weight >= 0.5 ? 1 : 0;
    if (reading.trigger.witnesses >= 2)
        tier += 1;
    if (counter >= THRESHOLDS.counterMin)
        tier -= 1;
    if (opposed)
        tier -= 1;
    return tier >= 3 ? 'high' : tier >= 1 ? 'medium' : 'low';
}
export function synthesiseDay(facts) {
    const triggers = facts.filter((fact) => fact.role === 'trigger');
    const background = facts.filter((fact) => fact.role === 'background');
    const poles = new Map();
    for (const axis of DAY_AXES) {
        for (const pole of axis.poles) {
            poles.set(pole, { pole, trigger: poleSupport(triggers, pole), background: poleSupport(background, pole) });
        }
    }
    /*
     * A SLIGHT FACT IS COLOUR, NOT A LEAD.
     *
     * Wide aspects, the Moon's sign, phase and house are real and they add to a pole
     * - but a pole that only slight facts lean on is not something the day is about.
     * Measured over a year, letting them create leads put "time with other people"
     * on half of all days: a sum of faint hints is not a finding. A pole may lead,
     * or take part in a contest, only if at least one non-slight trigger presses on it.
     */
    const anchored = (pole) => triggers.some((fact) => fact.strength !== 'slight'
        && fact.reliability !== 'low' && fact.effects.some((effect) => effect.pole === pole));
    const tensions = [];
    const sideOf = (reading, role) => {
        const support = role === 'trigger' ? reading.trigger : reading.background;
        return { pole: reading.pole, role, support: support.total, groups: support.groups.map((group) => group.group) };
    };
    const axes = DAY_AXES.map((axis) => {
        const [a, b] = axis.poles.map((pole) => poles.get(pole));
        const [high, low] = a.trigger.total >= b.trigger.total ? [a, b] : [b, a];
        const topGroup = (reading) => reading.trigger.groups[0]?.group ?? '';
        if (high.trigger.total < THRESHOLDS.quietMax) {
            return { axis: axis.id, poles: [a, b], state: 'quiet', leading: null, background: null, confidence: null };
        }
        const contested = low.trigger.total >= THRESHOLDS.contestMin
            && low.trigger.total / high.trigger.total >= THRESHOLDS.contestRatio
            && topGroup(low) !== topGroup(high)
            && anchored(low.pole) && anchored(high.pole);
        if (contested) {
            tensions.push({
                id: `axis:${axis.id}`, kind: 'trigger-vs-trigger',
                sides: [sideOf(high, 'trigger'), sideOf(low, 'trigger')],
            });
            return { axis: axis.id, poles: [a, b], state: 'contested', leading: null, background: null, confidence: null };
        }
        if (high.trigger.total < THRESHOLDS.leadMin || !anchored(high.pole)) {
            return { axis: axis.id, poles: [a, b], state: 'weak', leading: null, background: null, confidence: null };
        }
        const opposing = poles.get(OPPOSITE_POLE[high.pole]);
        const opposed = high.trigger.total >= THRESHOLDS.opposeLeadMin
            && opposing.background.total >= THRESHOLDS.backgroundOppose
            && opposing.background.total > high.background.total;
        if (opposed) {
            tensions.push({
                id: `background:${axis.id}:${high.pole}`, kind: 'trigger-vs-background',
                sides: [sideOf(high, 'trigger'), sideOf(opposing, 'background')],
            });
        }
        const bg = opposed
            ? 'opposes'
            : high.background.total >= THRESHOLDS.backgroundMin ? 'reinforces' : 'silent';
        return {
            axis: axis.id, poles: [a, b], state: 'clear', leading: high.pole, background: bg,
            confidence: confidenceOf(high, low.trigger.total, opposed),
        };
    });
    /* Different axes, natural opponents, pressed by DIFFERENT influences. */
    for (const pair of CROSS_AXIS_TENSIONS) {
        const [left, right] = pair.poles.map((pole) => poles.get(pole));
        if (left.trigger.total < THRESHOLDS.contestMin || right.trigger.total < THRESHOLDS.contestMin)
            continue;
        if (!anchored(left.pole) || !anchored(right.pole))
            continue;
        if ((left.trigger.groups[0]?.group ?? '') === (right.trigger.groups[0]?.group ?? ''))
            continue;
        /* A pole already inside a same-axis contest has been reported as one. */
        const inContest = [left.pole, right.pole].some((pole) => tensions.some((tension) => tension.id === `axis:${AXIS_OF_POLE[pole]}`));
        if (inContest)
            continue;
        tensions.push({
            id: pair.id, kind: 'trigger-vs-trigger',
            sides: [sideOf(left, 'trigger'), sideOf(right, 'trigger')],
        });
    }
    return { triggers, background, poles, axes, tensions };
}
