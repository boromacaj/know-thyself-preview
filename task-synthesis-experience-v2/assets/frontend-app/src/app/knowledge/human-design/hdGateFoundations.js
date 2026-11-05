import { unitId } from '../knowledgeTypes.js?v=53c0693';
import { hdChannels } from '../../human-design/data/hdChannels.js?v=53c0693';
/*
 * THE PUBLIC-DOMAIN FOUNDATION UNDER THE GATES.
 *
 * Every Human Design gate is a hexagram of the I Ching, carried over with the
 * King Wen numbering intact: gate n is hexagram n. That mapping is a fact about
 * the system, stated by its own publisher, and it is the reason this file can
 * exist.
 *
 * WHY IT EXISTS
 * The gate units in hdGates.ts describe what each gate means IN HUMAN DESIGN,
 * and their provenance names the Jovian Archive lineage - which is the correct
 * attribution and also the whole of the knowledge base's grounding for 64
 * entities. That is a single point of dependence on a body of teaching whose
 * rights holder restricts commercial derivative use.
 *
 * These units are a SECOND, INDEPENDENT grounding: what the underlying hexagram
 * is about, read from a translation that has been in the public domain for over
 * a century. They do not replace the Human Design reading and must never be
 * presented as one.
 *
 * THE LINE THIS FILE DOES NOT CROSS
 * A hexagram is not a gate. Ra Uru Hu's keynote for gate 34 is not Legge's
 * reading of hexagram 34, and saying so would be inventing a lineage. So the
 * role is `i-ching-foundation`, the derivation is recorded as a derived
 * reading, and the provenance says in as many words that this is the classical
 * substrate rather than Human Design doctrine.
 *
 * HOW THE PROSE WAS MADE
 * From Legge's own translation of the Thwan - king Wen's judgement on the whole
 * figure - read for each hexagram and restated here in this project's language.
 * No sentence of Legge's is reproduced; his English is a nineteenth-century
 * register that would be obvious in the middle of this app, and copying it
 * would defeat the purpose of having read it.
 *
 * COVERAGE: 1-32
 * Wikisource has proofread hexagrams 1-32. The 1882 scan carries 33-64 but its
 * OCR interleaves Legge's footnotes with the primary text, and a foundation
 * built on unverified text would be worse than none. The rest is a second
 * batch, not an oversight - see bibliography.ts.
 */
const I_CHING = {
    kind: 'contextual-derivation',
    settledness: 'conventional',
    basis: 'The classical hexagram this gate is numbered from, read in the 1882 Legge '
        + 'translation and restated in our own words. Human Design takes the King Wen '
        + 'numbering unchanged, so the correspondence is structural rather than '
        + 'interpretive - but the hexagram\'s sense is NOT the gate\'s keynote, and '
        + 'nothing here is Human Design doctrine.',
    traditions: ['Classical I Ching (King Wen sequence), Legge 1882 translation'],
};
const FOUNDATIONS = [
    { n: 1, hexagram: 'Khien', headline: 'Originating force, before anything has pushed back.',
        reading: 'The figure is pure initiating power at the opening of a cycle. It is read as beginning that carries its own authority rather than borrowing anyone else\'s, and the judgement ties its success to remaining correct and firm - force uncoupled from correctness is where this figure fails.' },
    { n: 2, hexagram: 'Khwăn', headline: 'Receptive capacity that completes rather than starts.',
        reading: 'The counterpart of the first figure and the one place the text is unusually direct about sequence: taking the initiative here goes astray, and following finds the way. Its strength is carrying and completing, and the firmness it is given is the endurance of a mare rather than the drive of a stallion.' },
    { n: 3, hexagram: 'Kun', headline: 'The first push of something new against unready conditions.',
        reading: 'Difficulty at the outset, where real progress is available and advance should still not be undertaken lightly. The figure is about a beginning that has to establish footing before it moves, which is a different problem from lacking the impulse to begin.' },
    { n: 4, hexagram: 'Măng', headline: 'Inexperience that has to come asking.',
        reading: 'The text puts the initiative on the learner: the teacher does not go seeking the uninstructed, the uninstructed comes seeking. It also sets a limit - the first sincere question is answered and repetition of it is not - which makes this a figure about the conditions under which instruction takes, not about ignorance itself.' },
    { n: 5, hexagram: 'Hsü', headline: 'Waiting held with confidence rather than with doubt.',
        reading: 'A delay carried with sincerity intact, and a crossing still ahead rather than abandoned. The distinction the figure draws is between waiting because the time is not right and waiting because nerve has gone.' },
    { n: 6, hexagram: 'Sung', headline: 'A dispute with real grievance that still meets obstruction.',
        reading: 'Contention entered on genuine grounds, which the text nevertheless expects to run into opposition. Apprehensive caution ends well; carrying the argument to its conclusion does not, which makes the figure a caution about the cost of being right.' },
    { n: 7, hexagram: 'Sze', headline: 'Collective effort that needs one person to carry it.',
        reading: 'Organised force, and the judgement makes its good outcome conditional on discipline and on a leader with age and experience behind them. The figure is about the conditions under which numbers become capability rather than about the numbers.' },
    { n: 8, hexagram: 'Pî', headline: 'Alliance, on the condition that the centre bears examination.',
        reading: 'Holding together is given as fortunate, with a condition attached that is unusual in its directness: the one at the centre should re-examine whether what they carry is great, unremitting and firm. The figure is about being worth aligning with, not about the appeal of alignment.' },
    { n: 9, hexagram: 'Hsiâo Khû', headline: 'Pressure accumulated and not yet released.',
        reading: 'The image is dense cloud that has not become rain. Restraint that is small and patient rather than forceful, and a figure about the interval between gathering and discharge - the thing is coming and has not arrived.' },
    { n: 10, hexagram: 'Lî', headline: 'Stepping where a wrong step would be dangerous.',
        reading: 'Treading on a tiger\'s tail without being bitten. The safety is in the manner of the treading rather than in the tiger being harmless, which makes this a figure about conduct under real exposure rather than about safe ground.' },
    { n: 11, hexagram: 'Thâi', headline: 'The small departs and the great arrives.',
        reading: 'A period when conditions genuinely favour, given as good fortune with progress. The reading is about recognising and using an opening rather than about manufacturing one, and the figure carries no warning - which is itself rare.' },
    { n: 12, hexagram: 'Phî', headline: 'Understanding fails between people.',
        reading: 'The mirror of the previous figure: the great goes and the small comes, and the correct course is at a disadvantage. Not a misfortune that happens to someone so much as a period in which the usual means of getting through to others do not work.' },
    { n: 13, hexagram: 'Thung Zăn', headline: 'Union reached in the open rather than inside the household.',
        reading: 'Fellowship formed out in the country - a wide alliance rather than a close one - and the judgement thinks it worth crossing a great stream for. The figure is about association on shared terms rather than on shared origin.' },
    { n: 14, hexagram: 'Tâ Yû', headline: 'Holding much.',
        reading: 'Great possession, given simply as great progress and success. The emphasis sits on the holding being sound rather than on the acquiring, which is what separates this figure from the ones about gain.' },
    { n: 15, hexagram: 'Khien', headline: 'Modesty that is not self-diminishment.',
        reading: 'Humility given an assured good issue, which almost nothing else in the sequence receives without conditions. The figure treats lowering oneself as a working method rather than as a virtue, and it is the one quality the text carries all the way through.' },
    { n: 16, hexagram: 'Yü', headline: 'Readiness that moves other people.',
        reading: 'A state in which princes may be installed and forces set in motion with advantage. The momentum comes from being prepared and in accord rather than from urging, which is why the figure is about enthusiasm and not about effort.' },
    { n: 17, hexagram: 'Sui', headline: 'Following what actually leads.',
        reading: 'Great progress, conditional on being firm and correct in what is followed. The figure is not about compliance: it turns on the judgement of what is worth following, and the error it names is following the wrong thing well.' },
    { n: 18, hexagram: 'Kû', headline: 'Repair of what decayed under previous care.',
        reading: 'Work on something that has been spoiled, given great progress and worth a difficult crossing. The judgement attends explicitly to what came before the decay and what follows the repair, which makes it a figure about sequence and inheritance rather than about damage.' },
    { n: 19, hexagram: 'Lin', headline: 'Something approaching, with a limit stated.',
        reading: 'Advance and success, and then an unusual specific: in the eighth month there will be evil. The figure gives an opening and its horizon in the same breath, so the reading is about using a favourable period knowing it is finite.' },
    { n: 20, hexagram: 'Kwân', headline: 'Attention held before action.',
        reading: 'The posture of one who has washed for the sacrifice but not yet made the offering - sincerity and bearing that command regard without anything having been asserted. A figure about being observed and about observing, in the interval before either becomes an act.' },
    { n: 21, hexagram: 'Shih Ho', headline: 'Biting through what is in the way.',
        reading: 'An obstruction between the teeth that has to be bitten through, and the judgement names legal constraint as the advantage. Decisive removal rather than accommodation, which is the sharpest such statement in the first half of the sequence.' },
    { n: 22, hexagram: 'Pî', headline: 'Form and grace, with a limit on how far they lead.',
        reading: 'Adornment is given free course and then explicitly bounded: little advantage if it is allowed to advance and take the lead. A figure about presentation that serves the substance under it, and about what happens when the order reverses.' },
    { n: 23, hexagram: 'Po', headline: 'Erosion from below, and nowhere advantageous to move.',
        reading: 'Splitting apart, and the judgement is unusually flat - no direction of movement is advantageous. One of the few figures whose whole reading is that this is a time to not act.' },
    { n: 24, hexagram: 'Fû', headline: 'The turn of the cycle back.',
        reading: 'Return, with free course: going out and coming in meet no obstruction, friends arrive without error, and the movement repeats on its own course. The figure treats recurrence as a mechanism rather than as a failure to progress.' },
    { n: 25, hexagram: 'Wû Wang', headline: 'Acting without ulterior design.',
        reading: 'Great progress while correct, and a fall into error the moment the motive bends. The figure is about the difference between doing the thing and doing the thing for a reason attached to it afterwards.' },
    { n: 26, hexagram: 'Tâ Khû', headline: 'Large force accumulated and held.',
        reading: 'Great restraint, where the fortunate course is taking the accumulation out into service rather than consuming it privately at home. A figure about stored capacity and about what storing it is for.' },
    { n: 27, hexagram: 'Î', headline: 'What is taken in and what is given out.',
        reading: 'Nourishment, and the judgement puts the work on discrimination: look at what is being nourished, and seek the proper aliment for it. The figure is about the quality of intake rather than its quantity.' },
    { n: 28, hexagram: 'Tâ Kwo', headline: 'A ridgepole bending under weight.',
        reading: 'Great preponderance, with movement in any direction advantageous - which is to say the structure cannot be left as it stands. A figure about a load that has passed what carries it, where doing something is better than doing nothing.' },
    { n: 29, hexagram: 'Khan', headline: 'Danger repeated, met with the mind still clear.',
        reading: 'The pit doubled, and the judgement locates the value not in escape but in sincerity held through it, which keeps the mind penetrating. Action taken in that state is given high worth - a figure about competence under sustained risk.' },
    { n: 30, hexagram: 'Lî', headline: 'Brightness that depends on what it attaches to.',
        reading: 'Fire clings to its fuel: the figure gives free course through correctness, and then names docility as what sustains it. Light that is real and not self-supporting, which is the tension the whole figure turns on.' },
    { n: 31, hexagram: 'Hsien', headline: 'Attraction that works both ways.',
        reading: 'Influence, given free course, with its advantage tied to correctness in the manner of a marriage. Reciprocal feeling rather than pressure - the figure is as much about being moved as about moving.' },
    { n: 32, hexagram: 'Hăng', headline: 'Continuance that keeps moving.',
        reading: 'Duration without error, where the advantage comes from firmness and from having somewhere to go. The figure separates endurance that persists in motion from endurance that merely stands still, and gives the first one.' },
];
/** Every gate the channel table knows, so a foundation cannot name a gate that does not exist. */
const KNOWN_GATES = new Set(hdChannels.flatMap((channel) => [...channel.gates]));
export const HD_GATE_FOUNDATIONS = FOUNDATIONS.map((entry) => ({
    id: unitId('human-design', 'hd-gate', String(entry.n), 'i-ching-foundation'),
    entity: {
        system: 'human-design',
        kind: 'hd-gate',
        key: String(entry.n),
        label: `Gate ${entry.n} — hexagram ${entry.n}, ${entry.hexagram}`,
    },
    role: 'i-ching-foundation',
    headline: entry.headline,
    core: [entry.reading],
    /* Deliberately empty. A foundation unit describes the classical figure, not
       the reader; contributing semantic signal from it would let the I Ching vote
       twice - once here and once through the Human Design gate unit that sits on
       the same entity. */
    semantics: [],
    provenance: {
        ...I_CHING,
        sources: [`legge-yi-king-1882#hexagram-${entry.n}`],
    },
}));
/** Gate numbers with a public-domain foundation. Used by the coverage test. */
export const FOUNDED_GATES = FOUNDATIONS.map((entry) => entry.n);
/** Gates the engine can produce that have no foundation yet. */
export const GATES_WITHOUT_FOUNDATION = () => [...KNOWN_GATES].filter((gate) => !FOUNDED_GATES.includes(gate)).sort((a, b) => a - b);
