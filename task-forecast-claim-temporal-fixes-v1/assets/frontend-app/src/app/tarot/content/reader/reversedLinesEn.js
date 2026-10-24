import { choose } from '../tarotDiscourseEn.js';
import { restates } from '../tarotCoherenceEn.js';
import { TAROT_REVERSED_ASKS_EN, TAROT_REVERSED_STAKES_EN, TAROT_RISKS_EN } from './readerReversedStakesEn.js';
/** The sentence that says what deserves attention: a proposition about the situation, never a pointer at a card's harder form. */
const RISK = [
    (risk) => `The risk is ${risk}.`,
    (risk) => `What deserves attention is ${risk}.`,
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
        ({ name, stake }) => `For the other side, ${name} describes ${stake}. It is a posture, not a claim about what they privately think or feel.`,
        ({ name, stake }) => `${name} shows the other side's part as ${stake}: a posture, not a window into what they think or feel.`,
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
