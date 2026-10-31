import { unitId, } from '../knowledgeTypes.js?v=2ea79e9';
import { sig } from '../semanticDimensions.js?v=2ea79e9';
/**
 * WESTERN ASTROLOGY VOCABULARY.
 *
 * The grammar of the system, one entry per term. These are not readings. A
 * reading is a planet, in a sign, in a house, under its aspects, and the
 * composition of those four is done in astrologyPlacements.ts.
 *
 * The division of labour is the one every school agrees on and the one that
 * makes composition possible at all:
 *
 *   PLANET    what function is operating
 *   SIGN      the style in which it operates
 *   HOUSE     the area of life it operates on
 *   ASPECT    what other function it has to operate through
 *
 * Keys are the engine's own values, lower-cased: 'moon', 'pisces', '10',
 * 'trine'. See RESEARCH_ASTROLOGY#engine-vocabulary for the mapping.
 */
const GRAMMAR = {
    kind: 'established',
    settledness: 'established-within-system',
    basis: 'Planet-as-function, sign-as-style, house-as-arena is the shared grammar of every modern Western school and of the Hellenistic sources they descend from.',
    sources: ['RESEARCH_ASTROLOGY#grammar'],
};
function term(kind, key, label, role, headline, core, semantics, provenance = GRAMMAR) {
    return {
        id: unitId('western-astrology', kind, key, role),
        entity: { system: 'western-astrology', kind, key, label },
        role,
        headline,
        core: [core],
        semantics,
        provenance,
    };
}
const planet = (key, label, headline, core, s) => term('planet', key, label, 'base-archetype', headline, core, s);
const sign = (key, label, headline, core, s) => term('sign', key, label, 'base-archetype', headline, core, s);
const house = (key, label, headline, core, s) => term('house', key, label, 'base-archetype', headline, core, s);
const aspect = (key, label, headline, core, s) => term('aspect', key, label, 'base-archetype', headline, core, s);
/* ------------------------------------------------------------- planets -- */
export const ASTROLOGY_PLANETS = [
    planet('sun', 'Sun', 'The function that decides what the whole is for.', 'The Sun is the organising purpose: the part of a person that sets direction and supplies the will to keep going once novelty has worn off. Everything else in a chart describes a capacity. The Sun describes what the capacities are being spent on, which is why its sign and house tend to be legible in how someone spends a decade rather than an afternoon.', [sig('assertive', 0.6), sig('independent', 0.5)]),
    planet('moon', 'Moon', 'The function that handles feeling, need and safety.', 'The Moon governs the automatic layer: what you reach for without deciding to, what makes you feel safe, how you process an experience once it has already happened. It is the most private of the personal planets and usually the most accurate, because it describes the response that arrives before the self-image has time to edit it.', [sig('emotionally-expressive', 0.8), sig('emotionally-sensitive', 0.6), sig('introspective', 0.4)]),
    planet('mercury', 'Mercury', 'The function that thinks, sorts and says.', 'Mercury is perception and language: how information is taken in, how it is organised, and in what register it comes back out. Its condition explains a great deal about why two intelligent people cannot follow each other - not a difference in capability, but a difference in the format the mind works in.', [sig('communicative', 0.8), sig('analytical', 0.6)]),
    planet('venus', 'Venus', 'The function that values, attracts and makes pleasant.', 'Venus decides what registers as worth having: in taste, in money, and in people. It is the appetite for beauty and for closeness, and it is also the negotiating instinct, since valuing one thing over another is what negotiation consists of.', [sig('collaborative', 0.7), sig('creative', 0.5)]),
    planet('mars', 'Mars', 'The function that wants, pushes and fights.', 'Mars is applied force: how desire converts into action, how conflict is entered, and what happens to the anger that does not get used. Its condition describes not whether someone is aggressive but where the pressure goes, which is a more useful question.', [sig('risk-oriented', 0.7), sig('independent', 0.6), sig('assertive', 0.4)]),
    planet('jupiter', 'Jupiter', 'The function that expands, trusts and overreaches.', 'Jupiter is the appetite for more: more scope, more meaning, more room. It is where a person is naturally lucky, in the specific sense of being willing to assume that a thing will work out, and it is equally where they lose proportion, because the same faith that opens doors does not know when to stop.', [sig('novelty-seeking', 0.6), sig('risk-oriented', 0.5)]),
    planet('saturn', 'Saturn', 'The function that limits, tests and eventually builds.', 'Saturn is the part of a chart that says no. It marks where effort is required before competence arrives, where a sense of not being enough tends to sit, and where - if the work is actually done - the most durable authority in the chart ends up sitting. Nothing in astrology is more reliably unpleasant early and useful late.', [sig('structured', 0.8), sig('stability-seeking', 0.6), sig('cautious', 0.5)]),
    planet('uranus', 'Uranus', 'The function that breaks the pattern.', 'Uranus is the discontinuity: the point where a person will not be assimilated, and where change arrives as a break rather than as a gradient. Generational in its sign, personal in its house and aspects.', [sig('novelty-seeking', 0.9), sig('independent', 0.7), sig('novelty-seeking', 0.6)]),
    planet('neptune', 'Neptune', 'The function that dissolves the edge.', 'Neptune softens boundaries - between self and other, between the thing and the idea of the thing. It supplies imagination, compassion and the capacity to be moved, and it supplies self-deception by exactly the same mechanism, since both depend on the outline being less firm than it looks.', [sig('intuitive', 0.8), sig('creative', 0.6), sig('emotionally-sensitive', 0.6), sig('intuitive', 0.4)]),
    planet('pluto', 'Pluto', 'The function that will not let a thing stay half-buried.', 'Pluto marks where experience goes deep and does not come back unchanged: compulsion, power, and the material that keeps returning until it is dealt with. Generational in sign; the house and aspects make it personal.', [sig('introspective', 0.7), sig('risk-oriented', 0.5), sig('emotionally-expressive', 0.5)]),
];
/* --------------------------------------------------------------- signs -- */
export const ASTROLOGY_SIGNS = [
    sign('aries', 'Aries', 'Cardinal fire: begins, and asks afterwards.', 'Aries operates by starting. Whatever function lands here gets directness, speed and a low tolerance for preamble, along with the matching weakness: it is far better at the first move than at the third, and it treats hesitation as a character flaw rather than as information.', [sig('independent', 0.7), sig('risk-oriented', 0.7), sig('novelty-seeking', 0.6), sig('adaptable', 0.4)]),
    sign('taurus', 'Taurus', 'Fixed earth: takes its time and does not let go.', 'Taurus operates slowly and concretely. A function here wants the tangible, the reliable and the unhurried, and once it has settled on something it holds on well past the point of usefulness. Its patience is genuine and so is its immovability.', [sig('stability-seeking', 0.9), sig('structured', 0.5), sig('structured', 0.7)]),
    sign('gemini', 'Gemini', 'Mutable air: connects, samples, keeps moving.', 'Gemini operates by association. A function here works in language and comparison, moves quickly between contexts, and is more interested in the link between two things than in either thing on its own. Breadth is easy; depth requires a decision.', [sig('communicative', 0.9), sig('adaptable', 0.7), sig('novelty-seeking', 0.6), sig('novelty-seeking', 0.4)]),
    sign('cancer', 'Cancer', 'Cardinal water: protects what it has taken in.', 'Cancer operates through attachment and memory. A function here is oriented to safety, to belonging, and to what has been felt before; it approaches indirectly, sideways rather than head-on, and defends what it has claimed with more force than its gentleness suggests.', [sig('emotionally-expressive', 0.8), sig('collaborative', 0.7), sig('emotionally-sensitive', 0.7), sig('cautious', 0.4)]),
    sign('leo', 'Leo', 'Fixed fire: does it in the open, or not at all.', 'Leo operates by expression and by presence. A function here needs to be seen doing what it does, not out of vanity so much as because the doing is incomplete unseen, and it carries a natural generosity alongside a genuine sensitivity to being overlooked.', [sig('creative', 0.7), sig('assertive', 0.7), sig('communicative', 0.6)]),
    sign('virgo', 'Virgo', 'Mutable earth: improves the thing in front of it.', 'Virgo operates by refinement. A function here notices the discrepancy, wants the process to work properly, and derives real satisfaction from useful, unshowy competence. The same precision, turned inward, is the harshest internal editor in the zodiac.', [sig('analytical', 0.8), sig('structured', 0.7), sig('emotionally-sensitive', 0.5)]),
    sign('libra', 'Libra', 'Cardinal air: decides by weighing, and weighs a long time.', 'Libra operates relationally. A function here is calibrated against another person - it thinks in comparison, seeks proportion, and is good at fairness and slow at preference. Its difficulty is not indecision but a real reluctance to let one side lose.', [sig('collaborative', 0.8), sig('analytical', 0.5), sig('collaborative', 0.4)]),
    sign('scorpio', 'Scorpio', 'Fixed water: goes all the way in.', 'Scorpio operates by intensity and depth. A function here does not do casual: it commits completely or withholds completely, reads people accurately at a level they did not offer, and keeps a private reserve that even intimacy does not fully open.', [sig('emotionally-expressive', 0.7), sig('introspective', 0.7), sig('emotionally-sensitive', 0.7), sig('structured', 0.4)]),
    sign('sagittarius', 'Sagittarius', 'Mutable fire: needs the horizon in view.', 'Sagittarius operates by widening. A function here reaches for meaning, distance and the larger frame, is frank to the point of tactlessness, and needs to believe the thing it is doing matters. Detail and confinement both read as small deaths.', [sig('novelty-seeking', 0.8), sig('independent', 0.6), sig('risk-oriented', 0.5), sig('adaptable', 0.4)]),
    sign('capricorn', 'Capricorn', 'Cardinal earth: builds toward something that lasts.', 'Capricorn operates by structure and long time horizons. A function here is serious early, comfortable with delayed return, and organised around competence and standing. It carries the matching weight: a difficulty in stopping, and a tendency to read rest as failure.', [sig('structured', 0.9), sig('assertive', 0.6), sig('stability-seeking', 0.6), sig('stability-seeking', 0.4)]),
    sign('aquarius', 'Aquarius', 'Fixed air: reasons from the principle, not the room.', 'Aquarius operates by abstraction and by distance. A function here holds a position on grounds it can state, sees the system rather than the individual case, and is at once genuinely collective in outlook and personally hard to reach.', [sig('analytical', 0.7), sig('independent', 0.8), sig('novelty-seeking', 0.6), sig('emotionally-contained', 0.4)]),
    sign('pisces', 'Pisces', 'Mutable water: takes it all in, and cannot always tell whose it is.', 'Pisces operates by absorption. A function here has a permeable boundary: it registers atmosphere, absorbs the emotional state of the room, and works by resonance rather than by analysis. The gift and the difficulty are the same permeability - deep empathy, and real trouble telling your own weather from someone else.', [sig('intuitive', 0.9), sig('emotionally-sensitive', 0.9), sig('emotionally-expressive', 0.8), sig('adaptable', 0.6), sig('adaptable', 0.6)]),
];
/* -------------------------------------------------------------- houses -- */
export const ASTROLOGY_HOUSES = [
    house('1', 'First House', 'Self, body, and the way you arrive.', 'The first house is the point of contact: appearance, manner, and the immediate impression made before anything has been established. A function placed here is not private - it is the first thing about you that anyone meets.', [sig('independent', 0.5)]),
    house('2', 'Second House', 'What you own, earn and consider valuable.', 'The second house covers resources in the widest sense: money, possessions, and the internal sense of what you are worth. A function here is bound up with security and with the question of what is actually yours.', [sig('stability-seeking', 0.6)]),
    house('3', 'Third House', 'Immediate environment, siblings, everyday speech.', 'The third house is the near world: the daily commute of the mind, conversation, local movement, brothers and sisters, and the ordinary transactions of learning. A function here is exercised constantly and in small increments.', [sig('communicative', 0.7)]),
    house('4', 'Fourth House', 'Home, family of origin, the private base.', 'The fourth house is the root: where you come from, where you retreat to, and the emotional foundation laid before you had any say in it. A function here operates mostly out of public view and shapes everything built above it.', [sig('emotionally-expressive', 0.6), sig('introspective', 0.6)]),
    house('5', 'Fifth House', 'Play, creation, romance, children.', 'The fifth house is where something is made for the pleasure of making it: creative work, courtship, risk taken for enjoyment, and children. A function here is expressive and wants an audience of at least one.', [sig('creative', 0.7), sig('novelty-seeking', 0.4)]),
    house('6', 'Sixth House', 'Work, routine, health, service.', 'The sixth house is the daily grind in its non-pejorative sense: the job as opposed to the career, the upkeep of the body, and the small repeated obligations that either sustain a life or quietly erode it. A function placed here is exercised in the unglamorous middle of the week rather than at any of the moments a person would think to describe.', [sig('structured', 0.7), sig('analytical', 0.4)]),
    house('7', 'Seventh House', 'Partnership, and whoever sits opposite.', 'The seventh house is the committed other: spouse, business partner, and open opponent, which the tradition treats as the same house for good reason. A function here only fully appears in the presence of someone else.', [sig('collaborative', 0.9), sig('collaborative', 0.4)]),
    house('8', 'Eighth House', 'Shared resources, depth, what is not spoken about.', 'The eighth house covers what two people hold jointly - money, bodies, dependence - along with crisis, inheritance and the material a person does not volunteer. A function here works below the surface and rarely explains itself.', [sig('introspective', 0.7), sig('emotionally-expressive', 0.6)]),
    house('9', 'Ninth House', 'Distance, higher study, belief.', 'The ninth house is the far world: foreign places, formal learning, law, and the framework a person uses to decide what anything means. A function here is oriented to the wider frame rather than to the immediate case.', [sig('novelty-seeking', 0.6), sig('analytical', 0.4)]),
    house('10', 'Tenth House', 'Vocation, standing, and the public record.', 'The tenth house is the most visible part of the chart: career in the sense of a life direction, reputation, and the role a person occupies in the eyes of people who do not know them personally. A function placed here becomes part of your public shape whether or not you intended it to.', [sig('assertive', 0.7), sig('structured', 0.5)]),
    house('11', 'Eleventh House', 'Networks, friendships, the longer aim.', 'The eleventh house is the group and the goal: friends as distinct from family, colleagues as distinct from partners, and the future you are working toward collectively. A function here operates through many weak ties rather than a few strong ones.', [sig('collaborative', 0.6), sig('independent', 0.3)]),
    house('12', 'Twelfth House', 'The unseen, the undone, the withdrawn.', 'The twelfth house holds what operates outside conscious control and outside public view: solitude, institutions, the unexamined inheritance, and the parts of a life that only make sense in retrospect. A function here is real but hard for its owner to see directly.', [sig('introspective', 0.8), sig('intuitive', 0.6), sig('private', 0.4)]),
];
/* ------------------------------------------------------------- aspects -- */
export const ASTROLOGY_ASPECTS = [
    aspect('conjunction', 'Conjunction', 'Two functions fused into one.', 'A conjunction merges. The two functions do not take turns; they operate as a single compound that the person cannot easily separate into parts, which makes it the most powerful aspect and the hardest to be objective about.', []),
    aspect('opposition', 'Opposition', 'Two functions that only meet across a gap.', 'An opposition puts two functions at opposite ends of the same axis, so satisfying one tends to starve the other. It typically shows up projected - experienced as a demand coming from other people - until it is recognised as an internal split that has to be alternated rather than resolved.', [sig('collaborative', 0.3)]),
    aspect('trine', 'Trine', 'Two functions that agree without effort.', 'A trine is easy in the literal sense: the two functions cooperate without being asked, so the ability is real and usually invisible to the person who has it. Its weakness is that nothing forces it into use, and unexercised talent stays a talent.', [sig('adaptable', 0.4)]),
    aspect('square', 'Square', 'Two functions that get in each other way, productively.', 'A square is friction with a purpose. Each function interferes with the other, and the interference forces development that neither would have undertaken alone. It reads as difficulty early and as capability later, and it is the most reliable engine of actual growth in a chart.', [sig('risk-oriented', 0.4), sig('structured', 0.3)]),
    aspect('sextile', 'Sextile', 'Two functions that cooperate if invited.', 'A sextile is an available cooperation rather than an automatic one. The two functions work well together whenever the person makes the connection deliberately, and lie dormant when they do not. It is the most easily wasted aspect in a chart, because nothing about it announces itself and nothing forces it into use.', [sig('adaptable', 0.3)]),
];
/* --------------------------------------- elements, modalities, polarity -- */
export const ASTROLOGY_QUALITIES = [
    term('element', 'fire', 'Fire', 'base-archetype', 'Motive energy: acts to find out.', 'Fire supplies drive and self-assertion. It works forward, learns by doing, and treats enthusiasm as a legitimate reason. A chart heavy in fire moves before it has finished thinking; a chart with none has to generate motivation deliberately rather than finding it already running.', [sig('risk-oriented', 0.6), sig('novelty-seeking', 0.6), sig('assertive', 0.5)]),
    term('element', 'earth', 'Earth', 'base-archetype', 'Material sense: trusts what can be handled.', 'Earth supplies practicality and patience with slow processes. It measures by result and by durability. A chart heavy in earth is grounded to the point of inertia; a chart with none has ideas that keep failing to land in the physical world.', [sig('stability-seeking', 0.7), sig('structured', 0.7)]),
    term('element', 'air', 'Air', 'base-archetype', 'Mental distance: needs to name it.', 'Air supplies perspective, language and the ability to step back from an experience while it is happening. A chart heavy in air understands its own life very well and feels it at one remove; a chart with none struggles to articulate what it nonetheless knows.', [sig('communicative', 0.7), sig('analytical', 0.7), sig('emotionally-contained', 0.3)]),
    term('element', 'water', 'Water', 'base-archetype', 'Felt information: knows before it can say.', 'Water supplies emotional intelligence and depth of attachment. It processes by feeling rather than by argument and registers what is going on beneath what is being said. A chart heavy in water is porous; a chart with none reads emotion as a foreign language it can translate but not speak.', [sig('emotionally-expressive', 0.8), sig('intuitive', 0.7), sig('emotionally-sensitive', 0.7)]),
    term('modality', 'cardinal', 'Cardinal', 'base-archetype', 'Initiates.', 'Cardinal signs start things, each standing at the beginning of its season. The strength is that something actually gets underway rather than remaining a discussion; the cost is a chart full of beginnings and a shortage of the patience needed to carry any of them through to the unremarkable end.', [sig('assertive', 0.6), sig('novelty-seeking', 0.5)]),
    term('modality', 'fixed', 'Fixed', 'base-archetype', 'Sustains.', 'Fixed signs hold a position, each standing at the height of its season. The strength is real staying power; the cost is that changing course tends to require something close to a crisis, because nothing smaller will move it.', [sig('stability-seeking', 0.8), sig('structured', 0.6)]),
    term('modality', 'mutable', 'Mutable', 'base-archetype', 'Adapts.', 'Mutable signs adjust to conditions. The strength is flexibility and the ability to work with what is actually happening; the cost is a tendency to bend so readily that no position of your own survives the process.', [sig('adaptable', 0.8), sig('novelty-seeking', 0.5)]),
    term('polarity', 'positive', 'Positive polarity', 'base-archetype', 'Expressive: energy moves outward.', 'The fire and air signs share an outward orientation: they meet the world by projecting into it rather than by taking it in. They also recover differently, restoring their balance through activity and contact, which is why ordering a chart weighted this way to rest so often makes matters worse.', [sig('communicative', 0.4), sig('outwardly-engaged', 0.4)]),
    term('polarity', 'negative', 'Receptive polarity', 'base-archetype', 'Receptive: energy moves inward.', 'The earth and water signs share an inward orientation: they meet the world by taking it in and working on it internally rather than by pushing outward. They recover through withdrawal rather than through company, and a chart weighted this way needs more unscheduled time than it is usually given.', [sig('introspective', 0.4), sig('emotionally-sensitive', 0.4)]),
];
/* ------------------------------ angles, nodes, conditions and patterns -- */
export const ASTROLOGY_STRUCTURE = [
    term('angle', 'ascendant', 'Ascendant', 'ascendant', 'The doorway: how you arrive and how the chart is organised.', 'The Ascendant is the degree rising at the eastern horizon at birth. It sets the whole house structure, which is why a chart without a reliable birth time loses so much, and it describes the interface - the manner, the pace, the immediate impression - through which everything else in the chart reaches other people.', [sig('adaptable', 0.3)], {
        kind: 'calculated-fact',
        settledness: 'established-within-system',
        basis: 'The Ascendant degree is computed from time and place; only the reading of it is interpretation.',
        sources: ['RESEARCH_ASTROLOGY#angles'],
    }),
    term('angle', 'midheaven', 'Midheaven', 'midheaven', 'The public direction of the life.', 'The Midheaven is the highest point of the chart and marks vocation and standing: not the job so much as what the life is understood to be for by people watching it. Its sign describes the register in which that public role is played.', [sig('assertive', 0.5), sig('structured', 0.4)], {
        kind: 'calculated-fact',
        settledness: 'established-within-system',
        basis: 'The Midheaven degree is computed; the reading of it is interpretation.',
        sources: ['RESEARCH_ASTROLOGY#angles'],
    }),
    term('angle', 'imum-coeli', 'Imum Coeli', 'imum-coeli', 'The private foundation the public life rests on.', 'Opposite the Midheaven, the Imum Coeli describes the base: origins, home, and the internal ground a person returns to. It is the least visible angle and the one that determines how much weight the visible one can carry.', [sig('introspective', 0.6), sig('emotionally-expressive', 0.5)], {
        kind: 'calculated-fact',
        settledness: 'established-within-system',
        basis: 'Derived directly from the Midheaven.',
        sources: ['RESEARCH_ASTROLOGY#angles'],
    }),
    term('planet', 'chart-ruler', 'Chart ruler', 'chart-ruler', 'The planet the whole chart reports to.', 'The chart ruler is the planet that rules the rising sign, and its condition colours everything. Wherever it sits by sign, house and aspect describes the area of life through which the chart as a whole tends to work itself out.', [], {
        kind: 'tradition-specific',
        settledness: 'conventional',
        basis: 'Rulership is agreed for the seven classical planets; schools differ on whether modern rulers (Uranus, Neptune, Pluto) may rule a chart.',
        traditions: ['Traditional / classical rulerships', 'Modern rulerships'],
        sources: ['RESEARCH_ASTROLOGY#rulership'],
    }),
    term('node', 'north-node', 'North Node', 'north-node', 'The direction that is uncomfortable and correct.', 'The North Node is not a body but a point where the Moon crosses the ecliptic. It is read as the developmental direction: the mode of operating that feels unnatural and unpractised, and that tends to produce growth precisely because there is no existing competence to fall back on.', [sig('novelty-seeking', 0.5)], {
        kind: 'tradition-specific',
        settledness: 'conventional',
        basis: 'The nodal axis is a calculated point, but the growth reading is a twentieth-century Western development; traditional astrology read the nodes quite differently, and Vedic astrology reads them differently again.',
        traditions: ['Modern Western evolutionary astrology'],
        sources: ['RESEARCH_ASTROLOGY#nodes'],
    }),
    term('node', 'south-node', 'South Node', 'south-node', 'The direction that is comfortable and used up.', 'The South Node marks the already-developed capacity: what comes easily, what is fallen back on under stress, and what stops producing anything new once it becomes the default. It is not a fault, it is a resource that has stopped paying interest.', [sig('stability-seeking', 0.4), sig('stability-seeking', 0.4)], {
        kind: 'tradition-specific',
        settledness: 'conventional',
        basis: 'Same lineage and same limitation as the North Node.',
        traditions: ['Modern Western evolutionary astrology'],
        sources: ['RESEARCH_ASTROLOGY#nodes'],
    }),
    term('chart-pattern', 'retrograde', 'Retrograde', 'base-archetype', 'The function runs inward before it runs outward.', 'A retrograde planet is moving backward from the point of view of Earth, which is an apparent motion rather than a real one. The agreed reading is internalisation: the function is not weakened, but it is processed privately and on its own schedule before it becomes available outwardly, and it tends to be reviewed more than it is asserted.', [sig('introspective', 0.5), sig('private', 0.3)], {
        kind: 'established',
        settledness: 'established-within-system',
        basis: 'Internalisation is agreed across schools; the older tradition that treated retrogradation as straightforwardly debilitating is largely abandoned in modern practice, which is itself worth stating.',
        sources: ['RESEARCH_ASTROLOGY#retrograde'],
    }),
    term('chart-pattern', 'stellium', 'Stellium', 'base-archetype', 'A concentration that bends the rest of the chart toward it.', 'A stellium is three or more planets gathered in one sign or house. It acts as a centre of gravity: the affairs of that sign or house stop being one area of life among twelve and become the arena the chart keeps returning to, often at the cost of whatever sits opposite it.', [], {
        kind: 'contested',
        settledness: 'contested',
        basis: 'That a concentration dominates a chart is agreed. The threshold is not.',
        dissent: 'Some schools require three planets, others four; some count only the traditional seven, others include the outer planets and the angles. A chart can therefore have a stellium in one school and not in another, and any reading should say which rule it used.',
        sources: ['RESEARCH_ASTROLOGY#stellium'],
    }),
    term('chart-pattern', 'angularity', 'Angularity', 'base-archetype', 'Proximity to an angle amplifies.', 'A planet close to the Ascendant, Midheaven, Descendant or Imum Coeli is angular, and angularity is the single strongest amplifier in a chart. The function becomes prominent in the life whether or not the person wants it to be, which is why an angular placement tends to be the most visible part of a chart.', [], {
        kind: 'established',
        settledness: 'established-within-system',
        basis: 'Angular prominence is agreed from Hellenistic sources onward, though the permitted orb varies by school.',
        sources: ['RESEARCH_ASTROLOGY#angularity'],
    }),
    term('chart-pattern', 'dignity', 'Essential dignity', 'base-archetype', 'How well a function is supported by the sign it sits in.', 'A planet in the sign it rules or is exalted in has its own conditions to work with and tends to operate cleanly. A planet in the opposite position - detriment or fall - has to do its job in an unsympathetic register, which produces either a distinctive workaround or a persistent friction.', [], {
        kind: 'tradition-specific',
        settledness: 'conventional',
        basis: 'Essential dignity is central to traditional and Hellenistic practice and is used lightly or not at all in much of modern psychological astrology.',
        traditions: ['Traditional / Hellenistic'],
        sources: ['RESEARCH_ASTROLOGY#dignity'],
    }),
];
export const ASTROLOGY_VOCABULARY = [
    ...ASTROLOGY_PLANETS,
    ...ASTROLOGY_SIGNS,
    ...ASTROLOGY_HOUSES,
    ...ASTROLOGY_ASPECTS,
    ...ASTROLOGY_QUALITIES,
    ...ASTROLOGY_STRUCTURE,
];
