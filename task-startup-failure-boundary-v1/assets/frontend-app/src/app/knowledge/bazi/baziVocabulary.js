import { FIVE_PHASE_PORTRAITS } from './fivePhasePortraits.js?v=2ea79e9';
import { unitId, } from '../knowledgeTypes.js?v=2ea79e9';
import { sig } from '../semanticDimensions.js?v=2ea79e9';
/**
 * BAZI VOCABULARY.
 *
 * The terms of the system: five phases, the ten Heavenly Stems, the twelve
 * Earthly Branches with their animals and hidden stems, the Ten Gods, the branch
 * relations, and the Luck Pillar frame.
 *
 * TWO STANDING RULES FOR THIS FILE.
 *
 * 1. This is not the Chinese zodiac. An Earthly Branch is a container of hidden
 *    stems with a season, a direction and a set of relations to the other
 *    branches. Reducing it to an animal personality is the single most common
 *    way BaZi gets flattened, and it is not done here.
 *
 * 2. Nothing in this system is presented as health information. The Five Phases
 *    carry organ and constitutional correspondences in Chinese medical theory,
 *    and where those appear they are symbolic and educational only. No entry
 *    here diagnoses, predicts or advises on health.
 *
 * Keys are the engine's own values, lower-cased pinyin without tone marks. Stem
 * 'wu' and branch 'wu' are different characters and do not collide, because the
 * entity kind is part of every id.
 */
const CORE = {
    kind: 'established',
    settledness: 'established-within-system',
    basis: 'The five phases, the sixty-term stem and branch cycle, and the generating and controlling relations are the shared foundation of every BaZi school.',
    sources: ['RESEARCH_BAZI#foundations'],
};
function term(kind, key, label, headline, core, semantics, provenance = CORE) {
    /* The five phases carry depth in fivePhasePortraits.ts, merged here so this
       file stays a vocabulary. Nothing else in it has a portrait, and nothing
       else needs one: a stem or a branch is defined by its own unit elsewhere. */
    const portrait = kind === 'five-element' ? FIVE_PHASE_PORTRAITS[key] : undefined;
    return {
        id: unitId('bazi', kind, key, 'base-archetype'),
        entity: { system: 'bazi', kind, key, label },
        role: 'base-archetype',
        headline,
        core,
        ...(portrait ? { portrait } : {}),
        semantics,
        provenance,
    };
}
/* -------------------------------------------------------- five phases -- */
export const BAZI_ELEMENTS = [
    term('five-element', 'wood', 'Wood', 'Growth: the upward push of something alive.', ['Wood is expansion in a direction. It is the phase of spring, of beginnings and of the plan that is already reaching past its current size, and it carries the qualities that go with growth: benevolence, ambition, and a certain impatience with anything that will not move. Wood in excess is rigidity dressed as principle; wood too weak leaves intention that never quite germinates.'], [sig('novelty-seeking', 0.6), sig('assertive', 0.5), sig('creative', 0.5)]),
    term('five-element', 'fire', 'Fire', 'Radiance: the phase that must be seen to exist.', ['Fire is expression and visibility, the phase of summer and of maximum outward movement. It supplies warmth, propriety and the ability to make a thing matter to other people. Fire in excess burns its own fuel and everyone else, and produces brilliance that does not last the year; fire too weak leaves a chart that knows what it thinks and cannot make anyone care.'], [sig('communicative', 0.7), sig('creative', 0.6), sig('emotionally-expressive', 0.4)]),
    term('five-element', 'earth', 'Earth', 'Holding: the phase that keeps things where they were put.', ['Earth is the stabilising middle. It belongs to the transitions between the seasons rather than to a season of its own, and its qualities are reliability, mediation and the patient absorption of everything the other phases produce. Earth in excess becomes inertia and worry that circles without resolving; earth too weak leaves a chart with plenty of activity and nothing that holds its shape.'], [sig('stability-seeking', 0.8), sig('structured', 0.5), sig('collaborative', 0.4), sig('stability-seeking', 0.4)]),
    term('five-element', 'metal', 'Metal', 'Cutting: the phase that decides what is not needed.', ['Metal is refinement by removal. It is the phase of autumn, of harvest and pruning, and it carries precision, righteousness and the willingness to make a clean separation. Metal in excess is severity that cuts into living tissue; metal too weak leaves a chart that cannot finish, cannot discard, and cannot say the necessary hard sentence.'], [sig('analytical', 0.7), sig('structured', 0.7), sig('emotionally-contained', 0.3)]),
    term('five-element', 'water', 'Water', 'Descent: the phase that goes around rather than through.', ['Water is depth, flow and intelligence that finds the gap. It is the phase of winter, of storage and of what happens out of sight, and it carries wisdom, adaptability and a natural secrecy. Water in excess disperses - too many directions, nothing held; water too weak leaves a chart short of reflection, moving fast and learning slowly.'], [sig('intuitive', 0.7), sig('adaptable', 0.7), sig('introspective', 0.6)]),
];
export const BAZI_POLARITY = [
    term('polarity', 'yang', 'Yang', 'The outward, initiating aspect of a phase.', ['Yang is the phase in its direct form: visible, forward-moving, and inclined to act on the environment rather than adapt to it. A yang stem tends to be read as more overt and less negotiable than its yin partner, whatever phase it belongs to.'], [sig('independent', 0.5), sig('assertive', 0.4), sig('risk-oriented', 0.3)]),
    term('polarity', 'yin', 'Yin', 'The inward, responsive aspect of a phase.', ['Yin is the same phase working indirectly: it yields, absorbs and persists rather than pushing. A yin stem is not a weaker version of its yang partner but a different strategy, and in a hostile chart it is frequently the more durable of the two.'], [sig('adaptable', 0.5), sig('introspective', 0.4), sig('emotionally-sensitive', 0.4)]),
];
/* ----------------------------------------------------- heavenly stems -- */
const stem = (key, label, headline, core, s) => term('heavenly-stem', key, label, headline, [core], s);
export const BAZI_STEMS = [
    stem('jia', 'Jia - Yang Wood', 'The standing tree: upright, slow, hard to redirect.', 'Jia is wood with a trunk. It grows in one direction and does not bend easily, which reads as integrity, stubbornness and a strong sense of its own proper shape. It takes responsibility naturally and takes correction badly.', [sig('independent', 0.7), sig('assertive', 0.6), sig('structured', 0.5), sig('structured', 0.5)]),
    stem('yi', 'Yi - Yin Wood', 'The climbing vine: flexible, persistent, quietly opportunistic.', 'Yi is wood without a trunk. It grows around obstacles rather than through them, uses whatever support is available, and survives conditions that would break something more upright. Adaptable, sociable, and considerably tougher than it looks.', [sig('adaptable', 0.8), sig('collaborative', 0.5), sig('emotionally-sensitive', 0.4)]),
    stem('bing', 'Bing - Yang Fire', 'The sun: impartial, unmissable, impossible to switch off.', 'Bing is fire that shines on everything equally. It is generous, direct and warm without discrimination, and it has no private setting - what Bing feels is already public. Its difficulty is proportion rather than intent.', [sig('communicative', 0.8), sig('assertive', 0.6), sig('creative', 0.5)]),
    stem('ding', 'Ding - Yin Fire', 'The lamp: focused, intimate, dependent on its fuel.', 'Ding is fire that illuminates one thing at a time. It is attentive, perceptive and capable of real intensity in a small space, and it is correspondingly sensitive to what it is being fed - Ding without good fuel gutters.', [sig('emotionally-sensitive', 0.6), sig('intuitive', 0.6), sig('creative', 0.5), sig('emotionally-expressive', 0.4)]),
    stem('wu', 'Wu - Yang Earth', 'The mountain: immovable, sheltering, slow to acknowledge change.', 'Wu is earth at scale. It provides ground for other people to stand on, absorbs a great deal without complaint, and changes on something close to a geological timescale. Dependable to the point of obstruction, it is the stem others lean on, and it rarely mentions how much it is carrying.', [sig('stability-seeking', 0.9), sig('structured', 0.6), sig('structured', 0.6)]),
    stem('ji', 'Ji - Yin Earth', 'The cultivated field: receptive, nourishing, quietly self-effacing.', 'Ji is earth that has been worked. Where Wu is the mountain, Ji is the soil that things are grown in: accommodating, resourceful, attentive to what others need, and inclined to disappear into the arrangement it is holding together.', [sig('collaborative', 0.7), sig('stability-seeking', 0.6), sig('adaptable', 0.5), sig('collaborative', 0.4)]),
    stem('geng', 'Geng - Yang Metal', 'The unworked axe: decisive, blunt, effective.', 'Geng is metal before refinement. It is direct, resolute and comfortable with confrontation, and it cuts cleanly through situations that more careful temperaments circle for months. Precision is not its strength; decision is, and the difference matters, because Geng is most useful exactly where a clean answer is worth more than a careful one.', [sig('assertive', 0.6), sig('risk-oriented', 0.5), sig('structured', 0.5), sig('emotionally-contained', 0.4)]),
    stem('xin', 'Xin - Yin Metal', 'The finished jewel: precise, particular, easily marked.', 'Xin is metal after refinement. It is exact, discriminating and quietly proud, with real aesthetic judgement and a low tolerance for the crude. Its sensitivity to slight is proportionate to the care it takes.', [sig('analytical', 0.7), sig('structured', 0.6), sig('emotionally-sensitive', 0.6)]),
    stem('ren', 'Ren - Yang Water', 'The ocean: wide, mobile, not fully knowable.', 'Ren is water at volume. It moves in large motions, holds far more than it shows, and carries an unusual tolerance for scale and for not yet knowing. Expansive, resourceful and genuinely hard to pin down, it is the stem most often underestimated by anyone who mistakes its ease for a lack of depth.', [sig('adaptable', 0.7), sig('novelty-seeking', 0.6), sig('intuitive', 0.5)]),
    stem('gui', 'Gui - Yin Water', 'The rain: fine, penetrating, arriving everywhere at once.', 'Gui is water dispersed. It gets into everything by small increments rather than by force, and it is the most naturally perceptive of the stems - quiet, thoughtful, and inclined to know things it was never told.', [sig('intuitive', 0.8), sig('introspective', 0.7), sig('emotionally-sensitive', 0.6)]),
];
/*
 * WHAT USED TO LIVE BELOW THIS LINE.
 *
 * The twelve Earthly Branches, the Ten Gods, the branch relations and the Luck
 * Pillar frame were all first drafted here as one-paragraph dictionary terms.
 * They are now written at full depth in baziStructures.ts - the branches with
 * their hidden stems and storage or growth function, the Ten Gods with the
 * nuance that keeps Rob Wealth and Seven Killings from reading as verdicts, the
 * relations split into the nine categories the engine actually detects, and the
 * Luck Pillars with their unresolved direction stated rather than guessed.
 *
 * The thin versions were removed rather than kept, because the registry refuses
 * duplicate ids and two readings of the same entity are worse than one.
 *
 * The five phases, the two polarities and the ten Heavenly Stems stay here. They
 * are the base archetypes, and the deeper files layer onto them rather than
 * replacing them: baziDayMasterLibrary.ts reads a stem as the subject of a
 * chart, and baziStructures.ts reads the phases as balance states. Both are
 * different roles on the same entities, so both coexist.
 */
export const BAZI_VOCABULARY = [
    ...BAZI_ELEMENTS,
    ...BAZI_POLARITY,
    ...BAZI_STEMS,
];
