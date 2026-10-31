import { choose } from '../tarotDiscourseEn.js';
import { restates } from '../tarotCoherenceEn.js';
import { TAROT_REVERSED_ASKS_EN, TAROT_REVERSED_STAKES_EN, TAROT_RISKS_EN } from './readerReversedStakesEn.js';
/** The sentence that says what deserves attention: a proposition about the situation, never a pointer at a card's harder form. */
const RISK = [
    (risk) => `The risk is ${risk}.`,
    (risk) => `The thing to guard against is ${risk}.`,
    (risk) => `Watch for ${risk}.`,
];
const FRAMES = {
    origin: [
        ({ name, stake }) => `${name} points to something from earlier that never ran cleanly: ${stake}.`,
        ({ name, stake }) => `From earlier, ${name} brings ${stake}.`,
        ({ name, stake }) => `${name} says the earlier part did not settle: ${stake}.`,
    ],
    state: [
        ({ name, stake }) => `Where things stand, ${name} shows ${stake}.`,
        ({ name, stake }) => `${name} describes the present as ${stake}.`,
        ({ name, stake }) => `Right now, ${name} amounts to ${stake}.`,
    ],
    driver: [
        ({ name, stake }) => `What keeps this going, ${name} suggests, is ${stake}.`,
        ({ name, stake }) => `Underneath, ${name} points to ${stake}.`,
        ({ name, stake }) => `${name} names what is at work below the surface: ${stake}.`,
    ],
    response: [
        ({ name, asks }) => `For a way through, ${name} is a caution more than a plan: the useful move is ${asks}.`,
        ({ name, asks }) => `${name} does not give the usual way through. It asks you ${asks}.`,
        ({ name, asks }) => `${name} asks you ${asks}.`,
    ],
    direction: [
        ({ name, stake }) => `If the present dynamic continues, ${name} leans toward ${stake}.`,
        ({ name, stake }) => `${name} tends toward ${stake} if nothing changes.`,
        ({ name, stake }) => `Where this tends, ${name} suggests ${stake}, if the present dynamic continues.`,
    ],
    other: [
        ({ name, stake }) => `For the other side, ${name} describes ${stake}. It is a posture, not a claim about what the other side privately thinks or feels.`,
        ({ name, stake }) => `${name} shows the other side's part as ${stake}: a posture, not a window into what the other side thinks or feels.`,
    ],
};
/**
 * THE GUIDED READING'S FRAMES. A guided place shows one card in a full paragraph of its own, so two of the shared frames read badly there: a condition trailing
 * after a long stake ("X tends toward A, or B, or C if nothing changes"; "Where this tends, X suggests A, if the present dynamic continues"). Here the condition
 * comes first. Same claim, same card, same variant chosen by the same seed; the shared frames stay as they are for the layouts that read them.
 */
const GUIDED_FRAMES = {
    ...FRAMES,
    direction: [
        FRAMES.direction[0],
        ({ name, stake }) => `If nothing changes, ${name} tends toward ${stake}.`,
        ({ name, stake }) => `Left as it is, this tends toward what ${name} shows: ${stake}.`,
    ],
};
/** Which places close on a risk: the ones that say how things stand or where they tend. The way through and the other side say enough. */
const WITH_RISK = new Set(['state', 'driver', 'direction']);
export function reversedLineEn(group, name, cardId) {
    const parts = { name, stake: TAROT_REVERSED_STAKES_EN[cardId], asks: TAROT_REVERSED_ASKS_EN[cardId], risk: TAROT_RISKS_EN[cardId] };
    const body = choose(FRAMES[group], `${cardId}|${group}`)(parts);
    /* A risk that only says the stake again in other words is not said: the line has made its point, and the same proposition twice is padding. */
    return WITH_RISK.has(group) && !restates(parts.stake, parts.risk) ? `${body} ${choose(RISK, `${cardId}|${group}|risk`)(parts.risk)}` : body;
}
/**
 * ONE REVERSED CARD READ FOR TWO GROUPS IN ONE PLACE (a guided place that asks for "origin" and "driver", say).
 *
 * Every group but the way through fills its frame with the card's one reversed stake, so two such lines say the same proposition twice in a row
 * ("points to something from earlier that never ran cleanly: X. Underneath, it points to X."). The stake is said once, in the frame of the first group the
 * place asks for, and closes on the card's risk when either group would have; the way through, which says what the card asks, is said as before.
 */
export function reversedLinesEn(groups, name, cardId) {
    const parts = { name, stake: TAROT_REVERSED_STAKES_EN[cardId], asks: TAROT_REVERSED_ASKS_EN[cardId], risk: TAROT_RISKS_EN[cardId] };
    const one = (group) => {
        const body = choose(GUIDED_FRAMES[group], `${cardId}|${group}`)(parts);
        return WITH_RISK.has(group) && !restates(parts.stake, parts.risk) ? `${body} ${choose(RISK, `${cardId}|${group}|risk`)(parts.risk)}` : body;
    };
    const stakeGroups = groups.filter((group) => group !== 'response');
    if (stakeGroups.length < 2)
        return groups.map(one);
    const withRisk = stakeGroups.some((group) => WITH_RISK.has(group)) && !restates(parts.stake, parts.risk);
    const out = [];
    let said = false;
    for (const group of groups) {
        if (group === 'response') {
            out.push(one(group));
            continue;
        }
        if (said)
            continue;
        said = true;
        const body = choose(GUIDED_FRAMES[group], `${cardId}|${group}`)(parts);
        out.push(withRisk ? `${body} ${choose(RISK, `${cardId}|${group}|risk`)(parts.risk)}` : body);
    }
    return out;
}
/** For a place that decides something ("what this turns on"): the preface already names what the card amounts to, so the line names the card and says what to watch. */
export function reversedRiskLineEn(name, cardId) {
    const risk = TAROT_RISKS_EN[cardId];
    /* The preface has just said the stake: a risk that only says it again adds nothing, so it is not said again. The card is still named, because this
       is the paragraph it stands in, and a position that does not name its card is not its card's. */
    if (restates(TAROT_REVERSED_STAKES_EN[cardId], risk))
        return `That is what ${name} points to.`;
    return choose([
        `With ${name}, the risk is ${risk}.`,
        `${name} adds a caution: watch for ${risk}.`,
        `${name} says what to watch: ${risk}.`,
    ], `${cardId}|criterion|risk`);
}
