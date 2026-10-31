import { unitId } from '../knowledgeTypes.js?v=2ea79e9';
import { sig } from '../semanticDimensions.js?v=2ea79e9';
/**
 * NUMEROLOGY BASE ARCHETYPES.
 *
 * The archetype is what a number means before anyone asks where it sits. It is
 * NOT a reading. A reading is an archetype seen through a role, and the role
 * files supply that - see numerologyRoles.ts, and the note in
 * docs/interpretation/RESEARCH_NUMEROLOGY.md on why a 7 Life Path and a 7
 * Personal Year cannot share prose.
 *
 * Keys are the engine's own values as decimal strings: '1'..'9', '11', '22',
 * '33', and the karmic debts '13', '14', '16', '19'.
 */
const ESTABLISHED = (basis, sources) => ({
    kind: 'established',
    settledness: 'established-within-system',
    basis,
    sources,
});
function archetype(key, label, headline, core, semantics, provenance) {
    return {
        id: unitId('numerology', 'number', key, 'base-archetype'),
        entity: { system: 'numerology', kind: 'number', key, label },
        role: 'base-archetype',
        headline,
        core,
        semantics,
        provenance,
    };
}
const PYTHAGOREAN = ESTABLISHED('The nine single-digit meanings are stable across every modern Western school; the schools differ on emphasis, not on substance.', ['RESEARCH_NUMEROLOGY#single-digits']);
const MASTER = ESTABLISHED('Modern Western numerology treats 11, 22 and 33 as master numbers left unreduced when they land on a core position.', ['RESEARCH_NUMEROLOGY#master-numbers']);
const KARMIC_DEBT = (extra) => ({
    kind: 'tradition-specific',
    settledness: 'conventional',
    basis: extra,
    traditions: ['Modern Western (Juno Jordan / Hans Decoz lineage)'],
    sources: ['RESEARCH_NUMEROLOGY#karmic-debt'],
});
export const NUMEROLOGY_ARCHETYPES = [
    archetype('1', 'One', 'The initiating impulse: to begin, and to begin alone.', [
        'One is the number of the first move. Its whole character is contained in the moment before anything exists, when someone has to decide that a thing will happen and accept that nobody has yet agreed. That is why One reads as independence, but independence is the consequence rather than the point. The point is initiation, and initiation is a solitary act by definition.',
        'What One is good at is starting. What it finds hard is everything that happens after the start. Continuation, maintenance, the slow work of keeping a thing alive once the excitement of its beginning has gone: these ask for a patience that the initiating impulse does not naturally contain.',
    ], [sig('independent', 0.9), sig('assertive', 0.8), sig('novelty-seeking', 0.6), sig('risk-oriented', 0.5), sig('independent', 0.4)], PYTHAGOREAN),
    archetype('2', 'Two', 'The relating impulse: nothing here is decided alone.', [
        'Two is the first number that requires something outside itself. Where One acts, Two responds, and the whole archetype is organised around the space between people rather than around a position within it. It reads a room accurately, often before anyone in the room has said anything, and it moves toward agreement the way water moves downhill.',
        'The strength is genuine and badly undervalued: most things that get built are built by someone who could hold two difficult people in the same conversation. The cost is that a temperament tuned this finely to other people can lose the signal of its own preference, and mistake the absence of conflict for the presence of peace.',
    ], [sig('collaborative', 0.9), sig('emotionally-sensitive', 0.8), sig('adaptable', 0.6), sig('emotionally-expressive', 0.5), sig('collaborative', 0.5)], PYTHAGOREAN),
    archetype('3', 'Three', 'The expressive impulse: the thing is not real until it is said.', [
        'Three is what happens when something inside has to get out. It is the number of expression in the broad sense: speech, image, performance, the compulsive reshaping of experience into something that can be handed to another person. Three thinks by talking and discovers what it believes somewhere in the middle of the sentence.',
        'Because the output comes easily, Three is often underestimated, including by itself. The characteristic difficulty is not talent but concentration. This is a temperament that enjoys the beginning of everything and finishes considerably less than it starts.',
    ], [sig('communicative', 0.9), sig('creative', 0.8), sig('novelty-seeking', 0.6), sig('adaptable', 0.5), sig('adaptable', 0.5)], PYTHAGOREAN),
    archetype('4', 'Four', 'The building impulse: what cannot be relied on is not finished.', [
        'Four is the number of the thing that holds. It works in materials, systems and sequences, and it measures a piece of work by whether it will still be standing when nobody is watching it. Where other numbers are drawn to the idea, Four is drawn to the load-bearing wall, and it has a physical distaste for the improvised.',
        'This is the temperament that most reliably converts intention into a finished object, and that conversion is harder than it sounds. Its difficulty is that a mind organised around reliability treats change as a threat to the structure rather than as information about it, and will defend an arrangement long after the arrangement stopped working.',
    ], [sig('structured', 0.9), sig('stability-seeking', 0.9), sig('analytical', 0.4), sig('structured', 0.6), sig('stability-seeking', 0.6)], PYTHAGOREAN),
    archetype('5', 'Five', 'The freedom impulse: every door has to stay unlocked.', [
        'Five is motion, appetite and the refusal to be fixed in place. It learns by exposure rather than by study, collects experience the way other numbers collect certainties, and is at home in situations nobody has seen before, because it has no procedure to defend. Five is at its best where the map runs out.',
        'The same appetite is the problem. Freedom protected too carefully becomes an inability to commit to anything long enough for it to pay out, and the collected experience stays a collection instead of becoming a body of work.',
    ], [sig('adaptable', 0.9), sig('novelty-seeking', 0.9), sig('risk-oriented', 0.7), sig('independent', 0.6), sig('novelty-seeking', 0.7)], PYTHAGOREAN),
    archetype('6', 'Six', 'The responsibility impulse: someone has to hold this together.', [
        'Six is the number of care taken seriously. It notices what a household, a team or a family actually needs and it supplies it, usually without being asked and often without being thanked. Its instinct for harmony is not the avoidance of conflict but the active work of keeping something worth belonging to in good repair.',
        'The failure mode is specific and hard to recognise as one. Care becomes control when it stops being offered and starts being administered, and the person who holds everything together often has no practice at all in being held.',
    ], [sig('collaborative', 0.8), sig('emotionally-expressive', 0.6), sig('stability-seeking', 0.7), sig('structured', 0.4), sig('collaborative', 0.3)], PYTHAGOREAN),
    archetype('7', 'Seven', 'The investigating impulse: the given answer is where the question starts.', [
        'Seven is the number of the mind that goes back to check. It is not scepticism for its own sake. It is an intolerance of the gap between what is said and what is actually the case, and it produces a person who keeps reopening things the rest of the room has agreed to leave closed.',
        'Seven withdraws in order to think, and the withdrawal is functional rather than defensive: the thinking genuinely does not work in a crowded room. What Seven produces, when it produces, tends to be worth the wait, because it has already survived the harshest reader it will ever meet. What Seven risks is that the standard it applies outward gets applied inward at full strength, and a piece of work is revised into silence.',
    ], [sig('analytical', 0.9), sig('introspective', 0.9), sig('intuitive', 0.5), sig('independent', 0.6), sig('independent', 0.4), sig('private', 0.3)], PYTHAGOREAN),
    archetype('8', 'Eight', 'The consequence impulse: results are the only honest measure.', [
        'Eight is the number that takes the material world seriously. Money, authority, ownership, scale, not as decoration but as the arena where intentions are tested and where good intentions with no result count for nothing. Eight has an instinct for how power actually moves through an organisation, which is a form of realism that more idealistic temperaments often mistake for cynicism.',
        'The difficulty is that a life measured in results is a life that never quite arrives. The next target is always available, and a person who is good at achieving can go a very long time without asking who set the target.',
    ], [sig('assertive', 0.9), sig('structured', 0.7), sig('risk-oriented', 0.6), sig('analytical', 0.5), sig('stability-seeking', 0.3), sig('emotionally-contained', 0.3)], PYTHAGOREAN),
    archetype('9', 'Nine', 'The completing impulse: the view widens until the personal is only part of it.', [
        'Nine is the last of the single digits and it carries the character of an ending: a perspective that has taken in enough to stop reading every situation as being about itself. It is the most naturally impersonal of the numbers, drawn to what serves many rather than to what serves the one, and quick to forgive, because it can see the shape of a situation from more than one side at once.',
        'The cost is a particular kind of loneliness. A temperament that gives easily and widely can find it almost impossible to state a personal need in a small room, and the wide view makes an excellent hiding place from the specific, difficult, close-range conversation.',
    ], [sig('collaborative', 0.6), sig('emotionally-expressive', 0.6), sig('creative', 0.5), sig('intuitive', 0.5), sig('emotionally-sensitive', 0.6), sig('independent', 0.2)], PYTHAGOREAN),
    archetype('11', 'Eleven', 'Two, raised: the sensitivity becomes a signal rather than a setting.', [
        'Eleven carries the relational sensitivity of Two, but where Two uses it to keep the peace, Eleven receives with it. The characteristic experience is of picking things up before there is any evidence for them, the mood of a room or the thing a person is not saying, and then having to decide what to do with information that cannot be justified out loud.',
        'The nervous cost is real and belongs to the archetype rather than being a flaw in the person carrying it. A receiver this open takes in a great deal it did not ask for, and an Eleven with no practice at closing the channel spends its energy on noise rather than on signal.',
    ], [sig('intuitive', 0.9), sig('emotionally-sensitive', 0.9), sig('collaborative', 0.6), sig('emotionally-expressive', 0.6), sig('introspective', 0.5), sig('adaptable', 0.4)], MASTER),
    archetype('22', 'Twenty-Two', 'Four, raised: the builder given a plan larger than one life.', [
        'Twenty-Two is the practical number at architectural scale. It keeps the whole of Four, the materials and the sequence and the refusal to call something finished when it is only nearly working, and points all of it at something that will outlast the person building it. The characteristic combination is a visionary target pursued by entirely unromantic means.',
        'The strain sits exactly where those two halves meet. A scale this large asks for patience across decades, and a temperament that measures itself by what is standing can spend years in a phase where nothing is standing yet.',
    ], [sig('structured', 0.9), sig('assertive', 0.7), sig('stability-seeking', 0.7), sig('creative', 0.5), sig('analytical', 0.5), sig('structured', 0.4)], MASTER),
    archetype('33', 'Thirty-Three', 'Six, raised: care extended past the people who are owed it.', [
        'Thirty-Three takes the responsibility of Six past the household. It is the most demanding of the master numbers, because it asks for the quality of attention normally reserved for family to be given to people who are not family, and to be given without the return that family provides.',
        'Where it goes wrong is predictable. A person who cannot refuse gives past the point of usefulness and then calls the exhaustion a virtue. Thirty-Three works only where the giving is chosen rather than compulsive.',
    ], [sig('collaborative', 0.9), sig('emotionally-expressive', 0.8), sig('emotionally-sensitive', 0.7), sig('communicative', 0.5), sig('collaborative', 0.4)], MASTER),
    archetype('13', 'Thirteen', 'Karmic debt: the work was avoided, and the work is still there.', [
        'Thirteen reduces to Four and carries the subject of Four, structure and effort and the finished thing, with an added friction. The traditional reading describes a pattern in which shortcuts were taken and the bill is presented as slowness: progress that does arrive, but through work that feels heavier than it should for the result it produces.',
        'Read as a description of temperament rather than of destiny, it names a difficulty that can actually be worked with. Sustained, unglamorous application is precisely the capacity this pattern is short of, and precisely the one that resolves it.',
    ], [sig('structured', 0.5), sig('stability-seeking', 0.4), sig('structured', 0.4)], KARMIC_DEBT('Karmic debt numbers are standard in the modern Western lineage but have no counterpart in Chaldean practice or in older Pythagorean sources.')),
    archetype('14', 'Fourteen', 'Karmic debt: freedom taken without the discipline to hold it.', [
        'Fourteen reduces to Five and inherits the appetite of Five, with the traditional charge that the appetite once ran without a brake. It shows up as instability that is self-generated rather than imposed: change entered into a little too easily, and a habit of moving on at the exact point where staying would have started to pay.',
        'The corrective the tradition names is moderation, which for this pattern is a practical instruction rather than a moral one. The freedom is real, and it only becomes usable once something is held long enough to compound.',
    ], [sig('adaptable', 0.5), sig('novelty-seeking', 0.5), sig('risk-oriented', 0.4), sig('novelty-seeking', 0.5)], KARMIC_DEBT('Same lineage and same limitation as 13.')),
    archetype('16', 'Sixteen', 'Karmic debt: the question of whether what is built rests on what is true.', [
        'Sixteen reduces to Seven and is the most uncomfortable of the four. The tradition reads it as a structure built on pride, or on a flattering story about oneself, that cannot stay as it is and has to be rebuilt on truer ground. That is the tradition\'s symbolic image, not a prediction of events in any particular life.',
        'What the pattern is said to ask for is not endurance but honesty, on the reasoning that the rebuilding stops recurring once the thing being built stops being a performance. That is a demanding claim, and it belongs in a reading as a lens and a question, never as a forecast: does what is being built rest on what is actually the case, or on an account of the self that has never been tested?',
    ], [sig('introspective', 0.6), sig('analytical', 0.4), sig('novelty-seeking', 0.5)], KARMIC_DEBT('Same lineage as 13 and 14, offered as the tradition\'s symbolism, not as a prediction.')),
    archetype('19', 'Nineteen', 'Karmic debt: independence learning that it is not self-sufficiency.', [
        'Nineteen reduces to One and sharpens the solitude of One into something closer to isolation. The traditional pattern is of a person who will not ask: who takes on the whole load, refuses the offered hand, and ends up standing alone in situations that never required it.',
        'The resolution the tradition names is not dependence but reciprocity. Accepting help turns out to be a form of strength rather than a debt, and leadership that cannot be shared does not stay leadership for very long.',
    ], [sig('independent', 0.7), sig('assertive', 0.4), sig('independent', 0.5)], KARMIC_DEBT('Same lineage as the other three karmic debts.')),
];
