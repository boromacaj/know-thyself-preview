import { collisionFor, reinforcementFor } from '../../mechanismRules.js?v=53c0693';
import { SITUATIONS, pairKey } from '../narrativeSituations.js?v=53c0693';
import { MORE_SITUATIONS } from './moreSituations.js?v=53c0693';
const entry = (pair, clause) => [pairKey(pair[0], pair[1]), clause];
/** Each completes `together they make ...`: a noun phrase, never a sentence. */
const SHARPEN_EXTRA = new Map([
    entry(['autonomy', 'privacy'], 'a habit of deciding alone and keeping most of the working to yourself, so that others see the conclusion and rarely the route'),
    entry(['control', 'privacy'], 'a way of keeping both the levers and the reasons to yourself, which reads as reliability and can feel like distance'),
    entry(['method', 'refinement'], 'a way of working that is never quite finished with itself, because every pass finds something to tighten'),
    entry(['method', 'standards'], 'a procedure held to a bar, with little patience for steps that do not earn their place'),
    entry(['foundation', 'standards'], 'a refusal to build on anything that has not passed your own test'),
    entry(['foundation', 'refinement'], 'laying the base carefully and then going back to improve it before anything is built on it'),
    entry(['foundation', 'verification'], 'testing the ground before putting weight on it, and testing it again when something shifts'),
    entry(['method', 'verification'], 'an order of work with a check built into every stage'),
    entry(['protection', 'verification'], 'a caution that works by checking, so that risks are examined before they are accepted'),
    entry(['deliberation', 'protection'], 'a habit of taking time before committing and treating the waiting as protection'),
    entry(['improvisation', 'speed'], 'working things out in motion rather than in advance'),
    entry(['exposure', 'speed'], 'going toward the new before it has been made safe'),
    entry(['autonomy', 'exposure'], 'taking chances on your own account and expecting to carry the result yourself'),
    entry(['exposure', 'expression'], 'putting things out before they feel finished, because the response is part of how they get finished'),
    entry(['expression', 'improvisation'], 'finding out what you mean by saying it, and revising in front of other people'),
    entry(['expression', 'feeling'], 'feeling that wants to be put into words and seems less real until it has been'),
    entry(['containment', 'privacy'], 'a reserve that is steady rather than cold: little shown and a lot kept'),
    entry(['calibration', 'feeling'], 'a sensitivity to people that works as information about how far to go'),
    entry(['embodiment', 'receptivity'], 'knowing through the body and the atmosphere before the reasons arrive'),
    entry(['calibration', 'deliberation'], 'a habit of weighing a position against the other person before taking it'),
    entry(['method', 'practicality'], 'a method judged by whether it works, and trimmed when it does not'),
    entry(['practicality', 'refinement'], 'improvement aimed at what works better rather than at what merely looks better'),
    entry(['embodiment', 'practicality'], 'trusting what the hands and the body find works'),
    entry(['method', 'protection'], 'structure used as a way of keeping what has been built safe'),
    entry(['control', 'speed'], 'taking charge quickly, before the question of whether to has been fully asked'),
    entry(['autonomy', 'expression'], 'putting your own view into the world in your own words and on your own timetable'),
    entry(['calibration', 'visibility'], 'being visible in a way that is tuned to the room'),
    entry(['abstraction', 'deliberation'], 'standing back from a question long enough to see its shape before answering it'),
    entry(['abstraction', 'verification'], 'testing a general idea against cases before trusting it'),
    entry(['investigation', 'receptivity'], 'looking into a thing by first letting it show itself'),
    entry(['foundation', 'protection'], 'building what is meant to be kept, and then keeping it'),
    entry(['investigation', 'standards'], 'digging until the answer meets a bar, and not merely until there is one'),
]);
/**
 * ORIENTED relations: the same two contributions, written for which of them LEADS.
 *
 * `feeling` leading `receptivity` (a mood that is taken in) and `receptivity` leading
 * `feeling` (a situation that is allowed to arrive before it is felt) are not the same
 * tendency, and two profiles that differ in which one the evidence puts first should not be
 * told the same sentence. Keys are `leader>follower`; a pair with no oriented entry falls
 * back to the symmetric one. Written for the pairs that recur most across the review corpus.
 */
export const ORIENTED_SHARPEN = new Map([
    ['receptivity>feeling', 'letting the situation arrive before deciding what it felt like, and then finding out that it had been felt all along'],
    ['receptivity>embodiment', 'taking in the atmosphere first and letting the body register it as a yes or a no'],
    ['speed>autonomy', 'a quick start that, once made, is held as your own'],
    ['endurance>method', 'a staying power given a form: the effort lasts because it has been organised to last'],
    ['visibility>expression', 'wanting to be seen, and finding the form for it in the saying'],
    ['receptivity>calibration', 'taking in what is there and only then adjusting to it, which is slower than reading it and tends to be more accurate'],
    ['standards>refinement', 'a bar that decides what is worth improving, so that effort goes where it will show'],
    ['expression>autonomy', 'putting something into words in order to find out what you think, and then deciding that it is yours'],
]);
/** What two contributions make together, or null where none is written. `lead` is the one the evidence puts first. */
export function sharpenFor(lead, follow) {
    return ORIENTED_SHARPEN.get(`${lead}>${follow}`)
        ?? reinforcementFor(lead, follow)
        ?? SHARPEN_EXTRA.get(pairKey(lead, follow))
        ?? null;
}
/** The same, for a split: keys are `leader>follower`, the leader being the pole the evidence weighs more. */
export const ORIENTED_SITUATIONS = {
    autonomy: {
        'calibration>autonomy': 'Everyone is consulted first and one person then decides, which can feel to the others like being asked for show. Saying early which part is open and which is already settled keeps the asking honest.',
        'autonomy>receptivity': 'The decision is made on its own terms and only then checked against what was absorbed from other people. What was heard often shapes the answer quietly, without being credited.',
        'calibration>control': 'Everyone is brought along until the point of decision, and then the decision is made firmly and by one person. The shift can look sudden to those who took the process to be shared.',
        'receptivity>control': 'Input is taken in right up to the moment a decision is needed, and then control tightens. Other people may notice the tightening more than the listening that came before it.',
    },
    structure: {
        'speed>method': 'Things are done quickly first and a method is reconstructed from what worked. The procedures that result are good, but they are written after the first, unplanned run, which was the one that mattered.',
        'improvisation>method': 'Improvising leads and a method forms afterwards from what held. The plan that results is real, though it describes what already happened more than what is about to.',
        'speed>standards': 'The pace sets the terms and the standard catches up. Work goes out quickly and is then held to a bar it was not made for, so the revisions arrive as a surprise to everyone but the person who set the bar.',
    },
    change: {
        'improvisation>endurance': 'A readiness to change course leads, and some part of the arrangement keeps insisting on staying. What lasts tends to be what was never announced as permanent.',
    },
};
/** What two contributions pulling apart look like in a situation, on the axis they split, or null. `leader` is the heavier pole's contribution. */
export function situationFor(axis, leader, follower) {
    return ORIENTED_SITUATIONS[axis]?.[`${leader}>${follower}`]
        ?? collisionFor(leader, follower)
        ?? SITUATIONS[axis]?.[pairKey(leader, follower)]
        ?? MORE_SITUATIONS[axis]?.[pairKey(leader, follower)]
        ?? null;
}
export const SHARPEN_EXTRA_COUNT = SHARPEN_EXTRA.size;
