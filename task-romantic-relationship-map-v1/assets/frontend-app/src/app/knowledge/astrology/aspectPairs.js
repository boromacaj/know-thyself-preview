import { sig } from '../semanticDimensions.js';
import { aspectPairUnit } from './astrologyAuthoring.js';
/**
 * SPECIFIC ASPECT PAIRS.
 *
 * "Mercury square Saturn: tension marker, orb 2°10′" is the failure this file
 * exists to fix. An aspect is two named functions in a specific relationship,
 * and the reading has to be about THOSE TWO - what a disciplining function does
 * to a thinking function - rather than about squares in general.
 *
 * WHICH PAIRS ARE WRITTEN
 *
 * The Sun, Moon, Mercury, Venus, Mars and Saturn against each other, plus
 * Jupiter and Pluto where the pair is one a practitioner would actually lead
 * with. That is the set that moves fast enough to be personal and matters
 * enough to be worth the words. An unwritten pair falls back to the generic
 * aspect reading, which is thinner but true.
 *
 * THE FOUR TYPES ARE GENUINELY DIFFERENT
 *
 * A conjunction fuses, so the two functions cannot be separated. An opposition
 * puts them on one axis, so feeding one starves the other and the whole thing
 * tends to get projected onto other people. A square makes them interfere,
 * which is uncomfortable early and productive late. A trine makes them agree so
 * easily the ability goes unexercised. Every entry below reads the pair through
 * that difference rather than swapping an adjective.
 *
 * ORB IS NOT MEANING. The engine reports how tight an aspect is and the composer
 * uses tightness to rank; nothing here changes with the orb, because the
 * relationship is the same relationship at one degree and at six.
 */
const pairs = [];
const add = (bodyA, bodyB, aspect, headline, core, signals) => {
    pairs.push({ bodyA, bodyB, aspect, headline, core, signals });
};
/* ------------------------------------------------------------ Sun–Moon */
add('sun', 'moon', 'conjunction', 'What you want and what you need are the same thing.', [
    'The Sun and Moon together fuse purpose and instinct: what you are consciously aiming at and what you privately need are not in negotiation, because they are one impulse. This produces a strong singleness of direction and little of the internal argument that can slow a person down.',
    'The cost is a missing corrective. When identity and emotional need pull the same way there is nothing inside you to say the direction is wrong, so a mistaken course can run a very long time before anything checks it. Objectivity about yourself has to come from outside; it will not arrive internally.',
], [sig('independent', 0.7), sig('persistent', 0.6), sig('assertive', 0.5)]);
add('sun', 'moon', 'square', 'The thing you are aiming at and the thing that settles you disagree.', [
    'A square between the Sun and Moon sets purpose against instinct. What you are trying to build tends to require exactly what makes you uneasy, and the emotional conditions you need in order to feel steady tend to work against the direction you have chosen. The tension is easier to name than to resolve, because it is not a mistake - it is the structure.',
    'What it produces, worked with rather than against, is a person who has had to become genuinely conscious of both sides. The failure mode is oscillation: driving hard until the emotional cost forces a retreat, retreating until the frustration forces another push, and mistaking the cycle for a personality.',
], [sig('persistent', 0.5), sig('introspective', 0.5), sig('emotionally-sensitive', 0.4)]);
add('sun', 'moon', 'opposition', 'Two halves of you that get their turns rather than their agreement.', [
    'An opposition puts identity and emotional need at opposite ends of one axis, which means satisfying either tends to starve the other. It is often felt as a pull between what you are aiming at and the claims of the people and needs around you, with a recurring sense of being asked to choose.',
    'The realistic outcome is not resolution but alternation done deliberately rather than by collapse. What this aspect can give, in time, is the capacity to hold two legitimate claims at once without pretending one is illegitimate.',
], [sig('collaborative', 0.4), sig('introspective', 0.5), sig('adaptable', 0.4)]);
add('sun', 'moon', 'trine', 'Purpose and instinct cooperate without being asked.', [
    'A trine here means the conscious direction and the private need are broadly on the same side. Things tend to feel less effortful; you can want something and also be steady while pursuing it.',
    'The weakness of an easy aspect is that nothing forces it into use. There is no internal friction here to generate development, so this can be a comfortable placement that never quite gets tested, and the capacity stays a capacity.',
], [sig('stability-seeking', 0.5), sig('adaptable', 0.4)]);
/* --------------------------------------------------------- Mercury–Saturn */
add('mercury', 'saturn', 'conjunction', 'A mind under permanent supervision, and eventually a very good one.', [
    'Mercury conjunct Saturn fuses thinking with caution. Every idea passes an internal audit before it is allowed out, which makes for genuinely rigorous work and a mind that knows the difference between having a view and having checked one. Concentration here runs deep: this is a placement that can stay with a hard problem for a long time.',
    'The audit does not distinguish between a bad idea and an unfinished one. Thoughts get held back until fully defensible, and a good deal of real contribution never reaches the room because the conversation moved on while it was being verified. There is often a private suspicion of being slower than others, which the evidence rarely supports.',
], [sig('analytical', 0.8), sig('structured', 0.7), sig('cautious', 0.6), sig('persistent', 0.5)]);
add('mercury', 'saturn', 'square', 'Careful thinking, bought with self-editing.', [
    'This is the aspect that makes a person prepare thoroughly before speaking and then say less than they prepared. Saturn puts a brake on Mercury, so the thought arrives and is immediately weighed for whether it is worth the risk of being wrong - and the weighing is often severe enough that what finally comes out sounds tentative or resigned rather than considered. Underneath it there is often a fear of being corrected, dismissed or simply outpaced.',
    'What it builds is real and hard-won: because easy answers were never sufficient here, this aspect produces genuine expertise rather than fluency, and standards that hold when nobody is checking. The work is distinguishing productive self-editing, which improves clarity, from anxious self-editing, which just delays contact - they feel identical from inside and they are not the same thing.',
], [sig('analytical', 0.8), sig('cautious', 0.7), sig('structured', 0.6), sig('persistent', 0.5)]);
add('mercury', 'saturn', 'opposition', 'The idea and the objection, permanently in the room together.', [
    'Every thought here arrives with its own counterargument attached, and the counterargument tends to be delivered in someone else\'s voice - an inner critic that does not sound like your own. This makes for careful reasoning and a recurring sense that thinking is a negotiation rather than a flow.',
    'It also tends to get projected. It can feel as though the people around you doubt you, and it is worth asking how much of that is them. Where it resolves, it resolves into a mind that can argue both sides of its own position without losing its nerve, which is a formidable thing.',
], [sig('analytical', 0.7), sig('cautious', 0.6), sig('conceptual', 0.4)]);
add('mercury', 'saturn', 'trine', 'Discipline the mind does not experience as discipline.', [
    'Here the structuring function supports the thinking function rather than obstructing it. Concentration comes easily, complex material is organised without much conscious effort, and the mind is naturally patient with things that take a long time to understand.',
    'Because it costs nothing, it is easy to leave unused. This aspect gives the capacity for serious intellectual work without supplying any pressure to do any, so it frequently sits in a chart as an unexercised strength.',
], [sig('analytical', 0.7), sig('structured', 0.6), sig('persistent', 0.5)]);
/* ---------------------------------------------------------- Venus–Saturn */
add('venus', 'saturn', 'square', 'Affection that has to be earned before it can be accepted.', [
    'Saturn on Venus makes love and worth feel conditional. There is usually an early lesson that affection was scarce, withdrawn or available only on terms, and the adaptation is either to keep people at a workable distance or to work extremely hard at being worth keeping. Either way, being simply liked - without having done anything that week - is strangely difficult to accept.',
    'What this eventually produces is loyalty of a kind that lighter aspects never manage: relationships built slowly, taken seriously and honoured when they cost something. The work is noticing that the caution which once protected you is now the reason the room feels colder than it needs to.',
], [sig('cautious', 0.7), sig('structured', 0.5), sig('emotionally-contained', 0.6), sig('persistent', 0.5)]);
add('venus', 'saturn', 'conjunction', 'Love taken seriously, sometimes too seriously.', [
    'Venus fused with Saturn produces affection with a long time horizon: commitment is a real word here, taste tends toward the classical and the durable, and there is no interest in anything that will not last. Loyalty is close to absolute once given.',
    'The seriousness costs spontaneity and some warmth in the delivery. This pairing can make a relationship into a duty being discharged well, and it can hold to something long past the point of unhappiness because ending it would be a failure of commitment rather than an accurate reading of the situation.',
], [sig('structured', 0.6), sig('cautious', 0.6), sig('persistent', 0.6), sig('emotionally-contained', 0.5)]);
/* ------------------------------------------------------------ Mars–Saturn */
add('mars', 'saturn', 'square', 'Force meeting the brake, repeatedly, until it becomes control.', [
    'This is the aspect of frustrated action. The impulse to move arrives and something immediately stops it - a rule, a doubt, a calculation of cost - and the resulting friction is genuinely uncomfortable to live with, particularly young. Anger gets held rather than expressed, and held anger does not improve with keeping.',
    'What it builds is the most disciplined form of drive available in a chart: effort that continues under conditions that would stop anyone operating on enthusiasm. Nothing here is achieved easily, which is exactly why what is achieved tends to hold. The risk is a resentment that goes underground and comes out sideways much later.',
], [sig('persistent', 0.8), sig('structured', 0.6), sig('cautious', 0.5), sig('assertive', 0.4)]);
add('mars', 'saturn', 'conjunction', 'Cold, controlled, extremely durable force.', [
    'Mars and Saturn together produce effort that is measured rather than hot. The energy is real but it is rationed deliberately, applied where it will count and withheld everywhere else, and the endurance this creates is considerable.',
    'The same control makes anger difficult. It is felt at full strength and expressed at almost none, which produces either a slow accumulation or an abrupt and permanent withdrawal. There is also a hardness available here that can be turned on yourself as readily as on a task.',
], [sig('persistent', 0.8), sig('structured', 0.7), sig('emotionally-contained', 0.5)]);
/* ------------------------------------------------------------ Sun–Saturn */
add('sun', 'saturn', 'square', 'An identity that had to be built against something.', [
    'Saturn on the Sun makes selfhood effortful. The self tends to feel like something to be established rather than simply expressed, and the result is a persistent sense of having to justify taking up space. Confidence here is constructed rather than issued.',
    'What it produces is authority of the durable kind, slow to arrive and standing on something real when it does. The work is recognising that the internal auditor is no longer reporting to anyone, and that continuing to seek its approval is now a choice.',
], [sig('structured', 0.7), sig('cautious', 0.6), sig('persistent', 0.7)]);
add('sun', 'saturn', 'conjunction', 'Serious from early, and steadier for it.', [
    'The Sun fused with Saturn puts seriousness close to the centre of who you are. Responsibility is carried as a matter of course, ambition is structural rather than showy, and there is very little interest in anything that has not been earned.',
    'The weight is the cost. This pairing struggles to rest, treats enjoyment as something requiring justification, and can keep meeting a standard that nobody present actually set.',
], [sig('structured', 0.8), sig('persistent', 0.7), sig('cautious', 0.5)]);
/* ------------------------------------------------------------- Sun–Mars */
add('sun', 'mars', 'conjunction', 'Purpose and drive as one movement.', [
    'The Sun with Mars puts identity and force in the same place: you are what you do, and the doing is immediate. Courage here is genuine and direct, and the energy available for anything you have actually decided on is considerable.',
    'There is no separation between wanting and acting, which means very little gets reconsidered on the way. Conflict comes up readily, partly because you meet it head-on and partly because directness at this intensity can read as aggression whether or not it was meant that way.',
], [sig('assertive', 0.9), sig('risk-oriented', 0.6), sig('independent', 0.6)]);
add('sun', 'mars', 'square', 'A drive that keeps overrunning the purpose it serves.', [
    'Here the will and the force are slightly out of alignment, so effort tends to overshoot - too hard, too fast, or aimed at the wrong target. There is real fighting spirit in this aspect and a recurring pattern of expending it on things that did not warrant it.',
    'It can mature into something formidable: a precise sense of how much force a situation needs, learned by applying too much. The learning tends to include arguments that could have been avoided.',
], [sig('assertive', 0.8), sig('risk-oriented', 0.6), sig('persistent', 0.4)]);
/* ----------------------------------------------------------- Moon–Saturn */
add('moon', 'saturn', 'square', 'Feeling handled competently, and rather too early.', [
    'Saturn on the Moon puts a lid on emotional need. Something in the early environment made dependency unsafe or unavailable, and the adaptation was self-sufficiency arrived at before it should have been necessary - the child who managed, and was praised for managing.',
    'What remains is genuine steadiness under pressure and a private conviction that needing things is a weakness. The loneliness is real and difficult to name, because there is nothing obviously wrong. The work is not becoming more emotional but letting one person carry something for you without settling the account afterwards.',
], [sig('emotionally-contained', 0.8), sig('cautious', 0.6), sig('structured', 0.5), sig('persistent', 0.5)]);
add('moon', 'saturn', 'conjunction', 'An emotional life that operates like an institution.', [
    'The Moon fused with Saturn produces reliability at the cost of expression. Feelings are managed rather than felt, the response to distress is competence, and other people rest on this steadiness without noticing what it costs.',
    'The bill arrives as a low, causeless flatness. Emotion that is administered rather than experienced does not disappear; it settles. Letting someone in stays difficult, and the useful move is to notice that it is difficult rather than to conclude it is unnecessary.',
], [sig('emotionally-contained', 0.8), sig('structured', 0.6), sig('cautious', 0.5)]);
/* ---------------------------------------------------------- Venus–Mars */
add('venus', 'mars', 'conjunction', 'Wanting and pursuing arriving together.', [
    'Venus with Mars fuses attraction and drive, which produces considerable magnetism and very little gap between noticing what you want and going after it. Creative and romantic energy run on the same circuit here, and both are strong.',
    'The absence of a pause is the difficulty. Desire is acted on before it has been examined, which is exciting and can leave some damage behind, and the intensity does not moderate itself for the situation.',
], [sig('assertive', 0.7), sig('creative', 0.6), sig('risk-oriented', 0.5)]);
add('venus', 'mars', 'square', 'Wanting and pursuing at cross purposes.', [
    'Here attraction and drive interfere. What you are drawn to tends not to be what you go after, or the going after undermines the wanting - the pursuit gets aggressive where it should be soft, or hesitant where it should be direct. Relationships carry real friction and real charge, usually both.',
    'What it develops is emotional and sexual honesty of a fairly hard-won kind, since the easy version was never available. The failure mode is a repeated pattern of conflict in relationships that is mistaken for chemistry.',
], [sig('assertive', 0.6), sig('creative', 0.5), sig('emotionally-expressive', 0.4)]);
/* -------------------------------------------------------- Mercury–Jupiter */
add('mercury', 'jupiter', 'conjunction', 'A mind with an unusually large frame.', [
    'Mercury with Jupiter thinks big. The mind reaches for the principle, the analogy and the wider implication, and there is a real ability to make a large idea graspable and interesting to people who did not previously care.',
    'Detail is where it thins. The claim is right in shape and frequently loose in specifics, and this pairing overstates for effect and then defends the overstatement. Reading and talking both tend to run past the point of usefulness.',
], [sig('conceptual', 0.8), sig('communicative', 0.7), sig('novelty-seeking', 0.5)]);
add('mercury', 'jupiter', 'square', 'A mind that promises more than it has verified.', [
    'The thinking function and the expanding function interfere here: conclusions get generalised past the evidence, and the enthusiasm for an idea arrives before the checking does. It is a genuinely creative combination and an unreliable one.',
    'Worked with, it becomes the ability to hold a large view and test it - someone who can see the whole shape and is honest about which parts are guesses. Untended, it is a person who is confidently wrong at length and is surprised each time.',
], [sig('conceptual', 0.7), sig('communicative', 0.6), sig('risk-oriented', 0.4)]);
/* ----------------------------------------------------------- Sun–Pluto */
add('sun', 'pluto', 'square', 'An identity that has been dismantled and rebuilt at least once.', [
    'Pluto on the Sun applies pressure to the self at the structural level. There is usually a power dynamic early - someone who had too much of it - and the residue is either an intense need for control or a recurring pattern of situations that strip it away. Nothing about identity is casual here.',
    'What it produces is real depth and a capacity to come through things that feel like endings. The failure mode is a compulsion to dominate the situation that is really a defence against being at someone\'s mercy, and it tends to reproduce exactly the dynamic it is defending against.',
], [sig('persistent', 0.7), sig('introspective', 0.6), sig('private', 0.5), sig('assertive', 0.5)]);
add('sun', 'pluto', 'conjunction', 'A presence people register and cannot account for.', [
    'The Sun fused with Pluto gives an intensity that arrives before you speak. Whatever you commit to, you commit completely, and there is a natural authority here that other people respond to without knowing why.',
    'Moderation is not available. The same concentration gets applied to things that did not need it, privacy shades into secrecy, and the will to see something through can become an inability to let it go.',
], [sig('persistent', 0.8), sig('private', 0.6), sig('introspective', 0.5), sig('assertive', 0.6)]);
/* ---------------------------------------------------------- Moon–Venus */
add('moon', 'venus', 'trine', 'Warmth that does not have to be worked at.', [
    'The Moon with Venus in easy aspect makes affection and emotional need broadly compatible: you are comfortable being cared for, comfortable caring, and generally pleasant to be around without effort. Aesthetic sense and emotional sense run together.',
    'Because it costs nothing, it can go soft. This is an aspect that inclines toward comfort and away from anything abrasive, and a life arranged entirely around ease is not the same as a life that went anywhere.',
], [sig('collaborative', 0.6), sig('emotionally-expressive', 0.5), sig('creative', 0.4)]);
/* ---------------------------------------------------------- Mars–Pluto */
add('mars', 'pluto', 'square', 'Force with more behind it than the situation requires.', [
    'This aspect puts enormous pressure behind the drive. Effort here is relentless and the will is close to unbreakable, but there is often more power in the system than a situation can absorb, and it comes out as intensity, control or a fight that escalates past anyone\'s intention.',
    'Directed at something that can take it - hard work, a real obstacle, a genuine crisis - this is one of the most effective aspects in a chart. Directed at people, it is a problem, and the difference between the two uses is a lifelong piece of discipline rather than a decision made once.',
], [sig('persistent', 0.9), sig('assertive', 0.7), sig('risk-oriented', 0.5)]);
export const ASTROLOGY_ASPECT_PAIRS = pairs.map(aspectPairUnit);
