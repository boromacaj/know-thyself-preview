import { FAMILY_TERM, STATE_CHARACTER, scoreText, weightText, } from './baziVoice.js?v=d9f39e7';
/**
 * THE ENGLISH VOICE - the semantic source for every other language.
 *
 * Second person, plain words, one thing said once. BaZi keeps its own images -
 * the field and the mountain, the harvest drawing on the soil - because those
 * are how this tradition thinks, and a reading that dropped them would sound
 * like every other system. What stays out of these sentences is the apparatus:
 * stems, branches, Ten God names, scores. They are in "Why this appears".
 *
 * NOTHING HERE KNOWS A CIRCUMSTANCE. Every sentence is a tendency, a need or a
 * cost, never an event, a job, a family or a body; and nothing compares the
 * reader with anybody else.
 */
const P = { Wood: 'wood', Fire: 'fire', Earth: 'earth', Metal: 'metal', Water: 'water' };
/* ------------------------------------------------------------ the stems */
const STEM = {
    jia: {
        image: 'wood in its upright form - the tall tree growing toward the light',
        tendency: 'You tend to move by direction and principle - once you know which way is up, you keep growing that way, and you do not bend easily to make room.',
        cost: 'The cost of growing straight is that you do not bend: you can hold a position long after bending would have cost you less.',
        practice: 'And practise bending in small things, so that it is a choice when it matters.',
    },
    yi: {
        image: 'wood in its supple form - the vine and the grass rather than the trunk',
        tendency: 'You tend to get where you are going by finding a way around - adapting, connecting, leaning on what already stands - and you are harder to uproot than you look.',
        cost: 'The cost of adapting so well is that you can lean on other people\'s structures until your own shape is hard to find.',
        practice: 'And put down one root of your own: something you hold whoever is around.',
    },
    bing: {
        image: 'fire in its open form - the sun, which shines on everything at once',
        tendency: 'You tend to meet people and situations with warmth and visibility, and you are at your best giving freely rather than rationing what you give.',
        cost: 'The cost of shining on everything is that you burn at full strength where a little would do, and run low before you notice.',
        practice: 'And ration your light: choose where to shine and let the rest rest.',
    },
    ding: {
        image: 'fire in its focused form - the lamp rather than the sun',
        tendency: 'You tend to give your warmth to a few things and people at a time, closely and attentively, and you see detail that broad light misses.',
        cost: 'The cost of focused warmth is that you guard the flame closely, and can keep out people who would have helped keep it going.',
        practice: 'And let someone else tend the flame now and then.',
    },
    wu: {
        image: 'earth in its massive form - the mountain, the ground that does not move',
        tendency: 'You tend to be the fixed point others orient by - steady, protective, slow to shift and hard to push.',
        cost: 'The cost of steadiness is inertia: you can stay put after the ground has already shifted.',
        practice: 'And move a little before you are sure: test the ground instead of waiting to be pushed.',
    },
    ji: {
        image: 'earth in its yielding form - worked soil, the field rather than the mountain',
        tendency: 'You tend to work by making conditions - preparing, holding, tending - and things grow where you have been, often without anyone tracing it back to you.',
        cost: 'The cost of all that tending is that you take in whatever is put on you - other people\'s worries, unfinished business - and have no natural way of setting it down.',
        practice: 'And say what you prefer out loud, before the arrangement forms around what others want.',
    },
    geng: {
        image: 'metal in its raw form - the axe and the unworked ore',
        tendency: 'You tend to cut straight to what matters, decide quickly and say what you think, and you respect what can stand up to you.',
        cost: 'The cost of directness is force: you can use a blade where a finer tool was needed, and only hear afterwards how hard it landed.',
        practice: 'And choose your tool before you strike: ask what the situation needs, not only what is true.',
    },
    xin: {
        image: 'metal in its refined form - the jewel and the fine blade',
        tendency: 'You tend to care about quality and precision, and you notice at once when something is slightly off.',
        cost: 'The cost of a fine edge is sensitivity: criticism cuts deeper than it should, and you hold yourself to a finish nobody asked for.',
        practice: 'And let good enough be finished; take feedback as information, not judgement.',
    },
    ren: {
        image: 'water in its moving form - the river and the open sea',
        tendency: 'You tend to think in wide currents, move on when something stops flowing, and find routes others walk past.',
        cost: 'The cost of range is spread: you can run so wide that nothing holds your course for long.',
        practice: 'And pick a channel and stay in it long enough to arrive.',
    },
    gui: {
        image: 'water in its finest form - rain, mist and dew',
        tendency: 'You tend to take in far more than you show - moods, atmospheres, what is not being said - and you work by quiet, patient influence rather than force.',
        cost: 'The cost of taking in so much is that you can take the shape of whatever holds you, and slip away quietly when it gets too much - often before anyone knew it was too much.',
        practice: 'And say what you perceive before you can fully justify it.',
    },
};
/* ----------------------------------------------------------- the season */
/** Which part of the Chinese calendar the month falls in, by the phase that rules it. */
const SEASON_TIME = {
    Wood: 'the spring months of the Chinese calendar',
    Fire: 'the summer months of the Chinese calendar',
    Metal: 'the autumn months of the Chinese calendar',
    Water: 'the winter months of the Chinese calendar',
    Earth: 'one of the four months that close a season in the Chinese calendar',
};
const EARTH_MONTH = {
    Chen: 'the last month of spring in the Chinese calendar',
    Wei: 'the last month of summer in the Chinese calendar',
    Xu: 'the last month of autumn in the Chinese calendar',
    Chou: 'the last month of winter in the Chinese calendar',
};
/**
 * What the season does to THIS stem - the classical five states, said as what
 * they are rather than by their names, and said per stem rather than per phase.
 *
 * WHY FIFTY AND NOT TWENTY-FIVE. The state itself is defined by the phase (it is
 * the same "resting" for Ji and for Wu), but what it does is not: the tradition
 * reads each of the ten stems against its month separately. Fire forging raw
 * Geng sharpens it and the same fire on finished Xin only threatens the finish;
 * autumn takes the harvest out of Ji's field and the ore out of Wu's mountain.
 * A phase-level sentence had to pick one of the two images and read the other
 * stem wrongly, so each stem has its own five, built on the stem's image in
 * STEM above and on the fifty seasonal units in the knowledge base. "Dead" is
 * a phase being controlled by the month, and it is never said to a reader as a
 * word. No sentence names the calendar months: the nature line already has.
 */
export const EN_SEASON_EFFECT = {
    jia: {
        prosperous: 'In its own season a tree is at full stretch: you have more growth in you than any single direction can use, and little in the season slows it.',
        aided: 'Water feeds the tree from underneath in these months, so you are nourished at the root: your growth tends to happen before it shows.',
        resting: 'Fire burns what the tree gives it, so what you grow is turned straight into heat and light: you are spent as fast as you are renewed.',
        trapped: 'A tree has to drive its roots through the heavy ground of these months: you make headway, but by effort, and the effort shows.',
        dead: 'Metal prunes the tree in this season, so what you put out is cut back: you grow by being shaped rather than by spreading.',
    },
    yi: {
        prosperous: 'In its own season a vine grows in every direction at once: you spread easily, and the question is what to climb.',
        aided: 'Water keeps the vine supplied through these months: you are nourished quietly, and you tend to bide your time until there is something to climb.',
        resting: 'A vine in this season flowers and spends itself doing it: what you have goes out as colour and warmth, and it is easy to give more than you replace.',
        trapped: 'A vine has to find a hold in the heavy ground of these months: you get where you are going by patience and small gains rather than by force.',
        dead: 'Metal cuts the vine back in this season, and it finds another way round: you are shaped by pressure, and you adapt rather than break.',
    },
    bing: {
        prosperous: 'The sun in its own season is at full strength: warmth and drive come easily, and the question is where to point them rather than where to find them.',
        aided: 'Wood keeps the sun fed in these months, so you rise with fuel to burn: your warmth seldom has to be forced.',
        resting: 'The sun warms the ground in these months and settles into it: what you give out is soaked up quietly, and it is easy to feel you made less difference than you did.',
        trapped: 'The sun in this season is still bright, but it has hard metal to work: your warmth and visibility hold, and keeping them costs more effort.',
        dead: 'The sun in this season gives real light against a cold that resists it: your warmth has to hold its own, and you learn to keep it steady rather than blazing.',
    },
    ding: {
        prosperous: 'A lamp in its own season competes with the daylight: your warmth is plentiful, and the task is to keep it focused rather than lost in the glare.',
        aided: 'A lamp with steady fuel burns at its best: wood feeds you in these months, and your warmth can stay close and constant.',
        resting: 'A lamp in these months gives its warmth into the ground: what you tend closely is absorbed around you, quietly, and it is easy to underrate how much it held.',
        trapped: 'A lamp has fine work to do on hard metal in these months: you bring focused warmth to material that resists it, and the work is careful and slow.',
        dead: 'A lamp in this season is small, guarded and genuinely needed: water presses on your flame, so you keep it close and spend it where it counts.',
    },
    wu: {
        prosperous: 'In its own months the mountain is at its most solid: you have weight and staying power, and the risk is not moving at all.',
        aided: 'Fire warms the mountain through in these months: you are fed from outside and building, with more in you to give than the season asks.',
        resting: 'In these months ore is taken out of the mountain: what the season draws from you is your own substance, and it is easy not to notice how much is going.',
        trapped: 'The mountain holds back water in these months, like a dam: you contain and steady what moves around you, and the holding takes constant effort.',
        dead: 'Wood roots break the mountain\'s ground open in this season: steady as you are, you are being worked on by growth that is not yours.',
    },
    ji: {
        prosperous: 'In its own months worked soil is deep and fertile: you gather and hold, and the risk is holding more than you use.',
        aided: 'Fire warms the soil through in these months, which is its most generative condition: you are fed from outside, and things grow easily where you are.',
        resting: 'Metal is drawn out of earth the way a harvest is lifted out of a field: the season takes what you produce as soon as it is made.',
        trapped: 'Soil in these months holds moisture it cannot take in: you absorb and contain what flows toward you, and the holding takes constant effort.',
        dead: 'Wood breaks the soil up with its roots: the season keeps pressing into your ground, and you are shaped by growth that is not yours.',
    },
    geng: {
        prosperous: 'In its own season the axe is at full edge: your sharpness comes easily, and the question is what it is for.',
        aided: 'Earth holds and feeds metal the way rock holds ore: you are protected and supplied, and your edge is still forming.',
        resting: 'Metal gives itself to water - cold, clear, carried off in the flow: what you give out is taken away, and it is easy to run cold.',
        trapped: 'The axe has living wood to cut in these months: you work on the season, productively and with effort, and the growth keeps coming back.',
        dead: 'Fire works raw metal in this season, and for the axe that is forging: you are tested and reshaped, and the pressure tends to leave you more deliberate rather than less.',
    },
    xin: {
        prosperous: 'In its own season the jewel is at its finest: your precision comes easily, and it can make you hard to reach.',
        aided: 'Earth sets the jewel and holds it up in these months: you are supported and shown well, and your finish has something solid behind it.',
        resting: 'A jewel in these months gives its clarity away into the cold: what you refine flows outward, and it is easy to give it away faster than you renew it.',
        trapped: 'A jewel in these months has fine work to do against living material: you bring precision to things that keep growing, and the work never quite finishes.',
        dead: 'Heat in this season presses on something that was already finished: fire does not improve the jewel, so you guard your finish and choose what you expose.',
    },
    ren: {
        prosperous: 'In its own season the sea is at full volume: you have plenty to draw on, and the risk is running past your banks.',
        aided: 'Metal feeds the river at its source in these months, like a spring from rock: you are supplied, and your clarity comes from what you draw on.',
        resting: 'The sea feeds everything that grows in this season: what you have is taken up all around you, and it is easy to run low without seeing where it went.',
        trapped: 'The sea meets fire in these months, and the meeting is steam and effort: you cool what has overheated around you, and the work does not rest easily.',
        dead: 'Earth banks the river in during these months: the season contains your flow, and you move by finding the gaps.',
    },
    gui: {
        prosperous: 'In its own season rain is everywhere at once: you take in a great deal from every side, and it is hard to gather it in one place.',
        aided: 'Metal clears the water at its source in these months, and the rain falls fine and well timed: you are supplied, and your perceptions come clear.',
        resting: 'Rain in this season soaks into everything growing: what you have goes quietly into the life around you, and you can be drawn on more than you notice.',
        trapped: 'Water spends this season cooling the heat around it: you temper situations, and keeping things cool is constant work.',
        dead: 'Rain in these months is taken up by the ground the moment it lands: the season contains you, and you work by seeping through rather than flowing.',
    },
};
/** The sentence the nature line uses when the engine resolved no season. */
const NO_SEASON = 'The season you were born into could not be settled for this chart, so the reading leans on the balance of the whole chart instead of on its month.';
/* ------------------------------------------------------------ the families */
const MEANING = {
    companion: (phase) => `your own kind (${P[phase]}, like you)`,
    output: (phase) => `giving out (${P[phase]}, the element you feed)`,
    wealth: (phase) => `working on the world (${P[phase]}, the element you shape)`,
    authority: (phase) => `being shaped from outside (${P[phase]}, the element that holds you in check)`,
    resource: (phase) => `taking in (${P[phase]}, the element that feeds you)`,
};
/** What each god looks like in a life, as a noun phrase. */
const GLOSS = {
    Friend: 'cooperation',
    'Rob Wealth': 'rivalry',
    'Eating God': 'easy, enjoying expression',
    'Hurting Officer': 'sharp, outspoken expression that tests the rules',
    'Indirect Wealth': 'wide-ranging, opportunistic handling of things',
    'Direct Wealth': 'steady, diligent work',
    'Seven Killings': 'hard pressure and tests of nerve',
    'Direct Officer': 'order, duty and a concern for doing things properly',
    'Indirect Resource': 'unconventional learning, intuition and time alone with ideas',
    'Direct Resource': 'care, teaching and being looked after',
};
/**
 * The same gods as short labels, for the two ends of a relation. A god that
 * already has its full description in the energy paragraph would otherwise be
 * described twice, word for word, one paragraph apart.
 */
const SIDE = {
    Friend: 'cooperation with equals',
    'Rob Wealth': 'rivalry',
    'Eating God': 'enjoyment and easy skill',
    'Hurting Officer': 'outspokenness',
    'Indirect Wealth': 'an eye for opportunity',
    'Direct Wealth': 'steady effort',
    'Seven Killings': 'hard pressure',
    'Direct Officer': 'a sense of order and duty',
    'Indirect Resource': 'solitary study and intuition',
    'Direct Resource': 'being cared for and taught',
};
const SUBJECT = {
    companion: 'Your own kind brings',
    output: 'What you give out is',
    wealth: 'What you work on is',
    authority: 'What shapes you is',
    resource: 'What you take in is',
};
/** The family's two kinds, in three steps of how evenly they split (see `KindsMix`). */
function kinds(facts) {
    const subject = SUBJECT[facts.family];
    if (!facts.mainGod)
        return '';
    if (facts.otherGod && facts.mix === 'even')
        return `${subject} ${GLOSS[facts.mainGod]} as much as ${GLOSS[facts.otherGod]}.`;
    if (facts.otherGod && facts.mix === 'near')
        return `${subject} mostly ${GLOSS[facts.mainGod]}, with nearly as much ${GLOSS[facts.otherGod]}.`;
    if (facts.otherGod)
        return `${subject} mostly ${GLOSS[facts.mainGod]}, with some ${GLOSS[facts.otherGod]}.`;
    return `${subject} ${GLOSS[facts.mainGod]}.`;
}
const BAND_LEAD = {
    thin: {
        output: 'With support running thin, that is a great deal going out from a modest supply: you are productive, and you tend to tire before you notice.',
        wealth: 'With support running thin, the chart hands you more to manage than it gives you strength for: you take on practical weight readily and feel it later.',
        authority: 'With support running thin, the pressure lands on a centre with little to push back with, so expectations tend to weigh more than they look from outside.',
        resource: 'With support running thin, this is what holds you up: what you take in is exactly what keeps you going.',
        companion: 'With support running thin, your own kind is what keeps you standing: you do better alongside others than alone.',
    },
    even: {
        output: 'In a chart this balanced, giving out is the outlet that keeps things moving.',
        wealth: 'In a chart this balanced, practical work is where your energy naturally lands.',
        authority: 'In a chart this balanced, pressure is something you can carry, as long as it does not become the only thing you carry.',
        resource: 'In a chart this balanced, what you take in is a reserve you can draw on.',
        companion: 'In a chart this balanced, that is a lot of company: you hold your ground readily, and you measure yourself against others more than you need to.',
    },
    ample: {
        output: 'With strength to spare, this is where it goes best: into making and expressing.',
        wealth: 'With strength to spare, you can carry practical weight well: results are where your energy wants to land.',
        authority: 'With strength to spare, structure and challenge suit you: pressure gives your force a shape.',
        resource: 'With strength to spare, more support than you need can make you slow to move: you can take in for a long time before acting.',
        companion: 'With strength to spare and plenty of your own kind, your will is strong and you do not yield easily.',
    },
};
const SCARCE_ROLE = {
    output: 'the element you would give out through: making things, a voice of your own, pushing back',
    wealth: 'the element you would work on and keep',
    authority: 'the element that would shape and check you: outside structure, deadlines, someone to answer to',
    resource: 'the element that would feed you: rest, learning, being looked after',
    companion: 'your own element, so few of your own kind stand beside you',
};
/**
 * What the missing element means, given what the chart DOES carry. `present`
 * is every family with a character's weight or more, and a consequence may
 * only lean on those: "holding your ground" needs your own kind in the chart,
 * "meeting demands" needs the pressure.
 */
function scarceConsequence(family, lead, band, present) {
    switch (family) {
        case 'output':
            return lead === 'authority'
                ? 'Pressure comes in and has no ready way back out, so you are more likely to absorb it than to return it.'
                : 'Expression is something you choose here, not something that happens by itself.';
        case 'wealth': {
            if (lead === 'output')
                return 'What you make tends to leave you almost at once; turning it into something that stays yours is a separate step you have to decide to take.';
            const ground = present.includes('companion');
            const demands = present.includes('authority');
            if ((lead === 'companion' || lead === 'authority') && (ground || demands)) {
                const going = ground && demands ? 'holding your ground and meeting demands'
                    : ground ? 'holding your ground' : 'meeting demands';
                return `With so much going into ${going}, what it is all for can go unnamed.`;
            }
            return 'Results are something you collect on purpose rather than by default.';
        }
        case 'authority':
            return band === 'ample'
                ? 'With strength to spare and little to hold it, you may need to borrow structure: commitments and standards you choose yourself.'
                : 'You set your own terms, and taking direction may not come easily.';
        case 'resource':
            return band === 'thin'
                ? 'With support already thin, what replenishes you has to be arranged on purpose.'
                : 'You tend to act first and reflect later.';
        case 'companion':
            return band === 'thin'
                ? 'You tend to carry things alone, and it costs more than it looks.'
                : 'You do not need company to stay upright, and you may not ask for it when it would help.';
        default:
            return '';
    }
}
/* ------------------------------------------------------------ the tension */
const POSITION = {
    Year: 'the side of you others meet first',
    Month: 'the way you apply yourself day to day',
    Day: 'your private centre',
    Hour: 'your aims and plans',
};
const FAMILY_GLOSS = {
    companion: 'your own kind',
    output: 'what you give out',
    wealth: 'what you work on',
    authority: 'the pressure you are held to',
    resource: 'what feeds you',
};
const sideGloss = (side) => {
    if (side.family === 'self')
        return 'you yourself';
    return side.god ? SIDE[side.god] : FAMILY_GLOSS[side.family];
};
const HOUR_NOTE = 'This link rests on the hour you estimated.';
/** What each kind of opposition means. The plan decides which one a pair is. */
const CLASH_MEANING = {
    'skill-vs-pressure': 'BaZi treats this opposition as a useful one: skill and ease are the classic answer to pressure, so what you enjoy doing is also how you cope - as long as the enjoyment is not the first thing the strain takes.',
    'speech-vs-order': 'This is the classic friction between speaking out and keeping order: you can question a rule in one breath and feel bound by it in the next, and the argument is between two real parts of you.',
    'expression-vs-rules': 'Your own way of doing and saying things runs up against the pressure and rules you are held to, and the friction is between two real parts of you.',
    'intake-vs-expression': 'In BaZi the taking-in side keeps the outspoken side in check: study and care can temper a sharp edge, and they can also hold back something that was ready to be said.',
    'work-vs-nourishment': 'What you are working toward and what feeds you compete for the same time: practical demands tend to crowd out study and rest.',
    'will-vs-holding': 'Your own will and what you are trying to hold pull apart: sharing and keeping do not sit easily together.',
    'independence-vs-structure': 'Your independence stands against the structure you are held to: you push back hardest when pushed.',
    'same-kind': 'Two versions of the same thing pull against each other, so you can find yourself arguing with your own habits.',
    'unsettled': 'The two do not settle into one direction; you tend to move between them rather than choose.',
};
const COUNT_WORD = { 2: 'two', 3: 'three', 4: 'four', 5: 'five', 6: 'six', 8: 'eight' };
const PILLAR_ORDER = ['Year', 'Month', 'Day', 'Hour'];
/**
 * One claim, however many places the chart makes it. The folded-in relations
 * (see the plan's `also`) are said as a count, never as a second paragraph
 * repeating the first; and a count that includes the estimated hour says so.
 */
function recurrence(claim, what) {
    if (claim.also.length === 0)
        return '';
    const count = claim.also.length + 1;
    const onHour = claim.also.filter((other) => other.restsOnHour).length;
    const hourNote = onHour > 0 && !claim.restsOnHour
        ? `, ${onHour === 1 ? 'one of them' : `${COUNT_WORD[onHour] ?? 'some'} of them`} in the hour you estimated` : '';
    return ` The same ${what} shows up in ${COUNT_WORD[count] ?? 'several'} places in your chart${hourNote}, so it is a recurring theme rather than a single point.`;
}
/**
 * "Two parts", or "two other parts" - but only after a paragraph that itself
 * introduced two parts. The first paragraph of the section never says "other".
 */
const introducesParts = (previous) => previous !== null && (previous.kind === 'clash' || previous.kind === 'binding');
/** The pulls, each as a firm statement and as the tendency a pull only just over the line gets. */
const PULL = {
    'resource>output': {
        clear: 'Taking in and giving out compete in you: the part of you that learns and reflects keeps a check on the part that makes and speaks. That can temper an edge usefully, and it can also hold back something that was ready.',
        slight: 'Taking in and giving out can compete in you: the part of you that learns and reflects tends to check the part that makes and speaks, which can temper an edge and can also hold back something that was ready.',
    },
    'output>authority': {
        clear: 'Your own way of doing things keeps testing the structure around you: you improve rules by questioning them, and you can wear them down the same way.',
        slight: 'Your own way of doing things can test the structure around you: you tend to improve rules by questioning them, and can wear them down the same way.',
    },
    'authority>companion': {
        clear: 'Pressure falls on a centre with plenty of its own kind: you are pushed, and you push back.',
        slight: 'Pressure tends to meet a centre with its own kind around it: when you are pushed, you are inclined to push back.',
    },
    'companion>wealth': {
        clear: 'Your own will competes with what you are trying to hold: sharing and keeping pull in different directions.',
        slight: 'Your own will can compete with what you are trying to hold: sharing and keeping tend to pull in different directions.',
    },
    'wealth>resource': {
        clear: 'What you are working toward keeps pulling you away from what feeds you: practical demands crowd out study and rest',
        slight: 'What you are working toward can pull you away from what feeds you: practical demands tend to crowd out study and rest',
    },
};
const BOUND_CONSEQUENCE = {
    authority: {
        Year: 'you tend to take the expectations around you on as your own.',
        Month: 'you tend to take obligations on as if they were part of you - dependable, and slow to put one down even when it is not yours to carry.',
        Hour: 'what you want and what is expected of you tend to merge, so you can pursue a duty as if it were a wish.',
    },
    wealth: {
        Year: 'you tend to identify with what you look after in plain view.',
        Month: 'you tend to become what you work on - steady and reliable in it, and slow to separate yourself from it.',
        Hour: 'you tend to tie your aims to something concrete you can hold, and then to hold on to it.',
    },
};
function tension(claim, dayMaster, previous) {
    const hour = claim.restsOnHour ? ` ${HOUR_NOTE}` : '';
    switch (claim.kind) {
        case 'bound': {
            const role = claim.partner.family === 'wealth' ? 'wealth' : 'authority';
            const element = role === 'authority' ? 'the element that holds you in check' : 'the element you work on';
            const consequence = BOUND_CONSEQUENCE[role][claim.partner.position]
                ?? BOUND_CONSEQUENCE[role].Month;
            return `In ${POSITION[claim.partner.position]}, your own element is tied to ${P[claim.partner.phase]}, ${element}. `
                + `BaZi reads this as a bond rather than a clash: ${consequence}${hour}${recurrence(claim, 'bond')}`;
        }
        case 'clash': {
            const [a, b] = claim.sides;
            if (claim.meaning === 'against-self') {
                /* One side is the Day Master itself: there are not "two parts" to name,
                   there is you and the thing that pushes against you. */
                const other = a.family === 'self' ? b : a;
                return `In ${POSITION[other.position]}, ${sideGloss(other)} stands directly against you yourself: `
                    + `something in the chart pushes on your centre rather than beside it.${hour}${recurrence(claim, 'opposition')}`;
            }
            const surface = claim.meaning === 'intake-vs-expression' && claim.relation === 'stem'
                ? ' Because both stand on the surface of the chart, this shows in what you say and do more than underneath.' : '';
            return `Two ${introducesParts(previous) ? 'other ' : ''}parts of your chart stand directly opposed: ${sideGloss(a)} in ${POSITION[a.position]}, and `
                + `${sideGloss(b)} in ${POSITION[b.position]}. ${CLASH_MEANING[claim.meaning]}${surface}${hour}${recurrence(claim, 'opposition')}`;
        }
        case 'binding': {
            const [a, b] = claim.sides;
            /* A second bond of the same meaning right after the first: what a bond like this does has just been said, and one point is said once. */
            const alreadySaid = previous !== null && previous.kind === 'binding' && previous.meaning === claim.meaning;
            const meaning = claim.meaning === 'contest'
                ? 'BaZi reads a bond like this as pressure taken up rather than taken on: your competitive streak absorbs some of the strain, so you tend to meet pressure as a contest.'
                : 'Two parts tied together like this hold each other in place: some of what either would do on its own goes into the bond, so neither acts quite as freely as it would alone.';
            return `Two ${introducesParts(previous) ? 'other ' : ''}parts of your chart are bound together: ${sideGloss(a)} in ${POSITION[a.position]}, and `
                + `${sideGloss(b)} in ${POSITION[b.position]}.${alreadySaid ? ' It holds them in place in the same way.' : ` ${meaning}`}${hour}${recurrence(claim, 'bond')}`;
        }
        case 'pull': {
            const key = `${claim.controller.family}>${claim.controlled.family}`;
            const words = PULL[key];
            const base = words ? words[claim.margin] : (claim.margin === 'clear'
                ? 'Two strong parts of your chart keep checking each other.'
                : 'Two parts of your chart tend to check each other.');
            /* "The very things that hold you up" is only true where what feeds you is
               what holds you up - a thinly supported chart. */
            const tail = key === 'wealth>resource' ? (claim.band === 'thin' ? ' - the very things that hold you up.' : '.') : '';
            return `${base}${tail}${claim.restsOnHour ? ' Without the hour you estimated, this pull would be much weaker.' : ''}`;
        }
        case 'doubled': {
            /* A branch repeated three times makes three self-punishment pairs; they are
               one fact - the branch and every place it stands - said once. */
            const places = PILLAR_ORDER.filter((position) => [claim, ...claim.also]
                .some((one) => one.kind === 'doubled' && one.sides.some((side) => side.position === position)));
            const phase = claim.sides[0] ? P[claim.sides[0].phase] : P[dayMaster];
            const times = { 2: 'twice', 3: 'three times', 4: 'four times' }[places.length] ?? 'more than once';
            const where = places.length >= 2
                ? `: ${places.slice(0, -1).map((position) => `in ${POSITION[position]}`).join(', ')} and in ${POSITION[places[places.length - 1]]}`
                : '';
            const onHour = claim.restsOnHour || claim.also.some((other) => other.restsOnHour) ? ` ${HOUR_NOTE}` : '';
            /* Opens on the phase, not on "the same": a recurrence line ("The same bond
               shows up in...") can stand just before it, and "the same" would then
               read as pointing back at that paragraph. */
            return `${phase.charAt(0).toUpperCase()}${phase.slice(1)} turns up ${times} in your chart in the same form${where}. The tradition reads a doubling like this as a quality that turns on itself - pushing one way until it works against you - and it is one of its disputed readings.${onHour}`;
        }
        case 'latent':
            return `Part of a larger pattern of ${P[claim.phase]} - ${FAMILY_GLOSS[claim.family]} - is present in your chart but incomplete. Read it as a pull that is there without being fully formed.${hour}${recurrence(claim, 'pattern')}`;
        case 'friction': {
            const [a, b] = claim.sides;
            const where = a && b ? `between ${POSITION[a.position]} and ${POSITION[b.position]}` : 'in your chart';
            return `A quieter friction runs ${where}; the tradition's reading of it is disputed, so it is noted rather than leaned on.${hour}${recurrence(claim, 'pattern')}`;
        }
        default:
            return '';
    }
}
/* ------------------------------------------------- support, cost, practice */
const HELPER = {
    resource: (phase) => ({
        Wood: 'encouragement and new learning: people and plans that give you something to grow into',
        Fire: 'warmth: encouragement, recognition, people and places that make you feel welcome',
        Earth: 'solid ground: routine, reliable people, a base you can return to',
        Metal: 'clarity: clear principles, good structure, ideas you can hold on to',
        Water: 'calm and depth: rest, reflection, time to think',
    })[phase],
    companion: () => 'company of your own kind: equals who carry part of the load with you',
    output: (phase) => ({
        Fire: 'an outlet: showing, performing, putting ideas into the open',
        Earth: 'an outlet: making things concrete and looking after them',
        Metal: 'an outlet: sorting, refining and saying things straight',
        Water: 'an outlet: ideas, conversation and letting things flow',
        Wood: 'an outlet: starting things, teaching, helping things grow',
    })[phase],
    wealth: (phase) => ({
        Earth: 'something concrete to work on: practical ground to build on',
        Metal: 'something concrete to work on: precise, valuable work',
        Water: 'something concrete to work on: things that keep moving and changing hands',
        Wood: 'something concrete to work on: projects that grow',
        Fire: 'something concrete to work on: results you can see',
    })[phase],
    authority: (phase) => ({
        Metal: 'a standard to meet: discipline that prunes what is not needed',
        Water: 'a standard to meet: limits that keep your fire in proportion',
        Wood: 'a standard to meet: demands that keep you growing',
        Fire: 'a standard to meet: real tests that forge you',
        Earth: 'a standard to meet: banks that give you a course',
    })[phase],
};
const BRIDGE_SIDE = {
    companion: 'your own strength',
    output: 'what you give out',
    wealth: 'what you work on',
    authority: 'the pressure on you',
    resource: 'what feeds you',
};
/**
 * How much of a helper the chart carries. With the hour unknown, "the known
 * chart" - an absence among six characters is not an absence from the eight.
 */
function presence(weight, partial) {
    const chart = partial ? 'the known chart' : 'your chart';
    if (weight >= 2)
        return `and ${chart} carries a good deal of it`;
    if (weight >= 1)
        return `and ${chart} already carries some of it`;
    if (weight >= 0.5)
        return `and ${chart} carries a little of it`;
    return `and ${chart} carries almost none of it`;
}
/**
 * The cost line, chosen by what the chart actually has. The table below is
 * keyed by band and leading family; the one sentence that speaks of TWO things
 * in balance - your own kind against the pressure on you - is only said when
 * the plan found those two sharing the lead. A balanced chart led by its own
 * kind alone gets the cost of that, read from which of its two kinds leads.
 */
function costSentence(claim) {
    const pair = [claim.lead.family, claim.partner].sort().join('+');
    if (claim.band === 'even' && pair === 'authority+companion') {
        return 'When your own kind and the pressure on you weigh about the same, ordinary disagreements can turn into contests you feel you must win.';
    }
    if (claim.band === 'even' && claim.lead.family === 'companion' && claim.lead.mainGod === 'Rob Wealth') {
        return 'Even in a balanced chart, sharing credit can feel like losing ground.';
    }
    return COST[claim.band][claim.lead.family];
}
const COST = {
    thin: {
        output: 'In a chart that asks you to give out more than it refills, the depletion is gradual: never a moment you could point to, just a little less left each time.',
        wealth: 'In a chart that hands you more to manage than it gives you strength for, practical weight can quietly take over.',
        authority: 'In a chart this full of expectation, you can spend a long time meeting standards without asking whether they are yours.',
        resource: 'In a chart where support comes mostly through what you take in, you can keep preparing when the moment wants you to act.',
        companion: 'In a chart where your own kind is your main support, you can let others set your pace.',
    },
    even: {
        output: 'Even in a balanced chart, giving out can become the only way you know to be useful.',
        wealth: 'Even in a balanced chart, results can become the only measure you trust.',
        authority: 'Even in a balanced chart, you can take every demand as a test you have to pass.',
        resource: 'Even in a balanced chart, you can wait for more certainty than a decision needs.',
        /* The cooperative kind leading; a rivalrous lead, or one shared with the
           pressure on you, is worded in costSentence. */
        companion: 'Even in a balanced chart, it is easy to stay among people who think the way you do, and to hear less from anyone who does not.',
    },
    ample: {
        output: 'With strength to spare, you can scatter a great deal of ability across too many things.',
        wealth: 'With strength to spare, you can chase results past the point where they are worth it.',
        authority: 'With strength to spare, you can take on every challenge as a matter of pride.',
        resource: 'With strength to spare, you can wait for more certainty than any decision needs.',
        companion: 'With strength to spare and plenty of your own kind, your will can run over other people\'s without your meaning it to.',
    },
};
const HELPER_PRACTICE = {
    resource: (phase, present) => ({
        Fire: present
            ? 'Lean on the warmth you already have: time with people who encourage you, and recognition you let land instead of waving it away.'
            : 'Build warmth in on purpose: people who encourage you, places where you are welcome, recognition you let yourself receive.',
        Metal: present
            ? 'Use the clarity you already have: write things down, and keep a few clear principles you can return to.'
            : 'Give your thinking a structure on purpose: notes, a few principles, a clear order.',
        Earth: present
            ? 'Keep the base you already have steady: regular routines and people who stay the same.'
            : 'Build a steady base on purpose: routines, and people you can rely on.',
        Water: present
            ? 'Protect the calm you already have: real rest, and time to reflect before you move.'
            : 'Make room on purpose for rest and reflection before you move.',
        Wood: present
            ? 'Keep feeding the growth you already have: new learning, and people who encourage you.'
            : 'Seek out new learning and encouraging people on purpose.',
    })[phase],
    companion: () => 'Let someone share the load, and ask early rather than when you are already spent.',
    output: () => 'Give your energy an outlet you enjoy, and use it regularly.',
    wealth: () => 'Pick something concrete to work on and see it through.',
    authority: () => 'Choose a standard or commitment that gives your strength a shape.',
};
const FOCUS = {
    collect: 'Close what you start: finish, collect, and let something you made stay yours before you begin the next thing.',
    answer: 'Give pressure somewhere to go: say no, say what you think, make something that is only yours. Small answers count.',
    aim: 'Name what it is all for: pick one concrete thing to build for yourself, so the effort has somewhere to arrive.',
    'act-with-others': 'Act before you feel fully ready, and do it alongside others: preparation is your strength, and it counts once it leaves the room.',
    channel: 'Choose one outlet and finish there, rather than starting in many places.',
    pace: 'Set a limit on what you take on, and keep to it when a new thing looks easy.',
    'own-standard': 'Check whose standard you are meeting before you meet it.',
    act: 'Act before you feel fully ready; you will have taken in enough sooner than it feels.',
    share: 'Let others lead sometimes; your strength does not depend on always standing first.',
};
/* ------------------------------------------------------------ evidence */
/**
 * The classical state by its character and what it means - never by the bare
 * English word. Two of the five ("trapped", "dead") read as verdicts on a
 * person, which they are not; the engine's own wording stays in the technical
 * appendix, where it is checked rather than read.
 */
const STATE_GLOSS = {
    prosperous: 'the season is its own phase',
    aided: 'the season feeds it',
    resting: 'it feeds the season',
    trapped: 'it has to control the season',
    dead: 'the season controls it',
};
const familyList = (model, order) => order
    .map((family) => {
    const reading = model.families[family];
    const gods = Object.entries(reading.godWeights)
        .sort((a, b) => b[1] - a[1])
        .map(([god, weight]) => `${god} ${weightText(weight)}`);
    return `${FAMILY_TERM[family]} (${reading.phase}) ${weightText(reading.weight)}${gods.length ? ` - ${gods.join(', ')}` : ''}`;
})
    .join('; ');
const positionsText = (positions) => positions.join(' and ');
function relationLine(claim, model, use) {
    const suffix = {
        main: '',
        folded: ' Read together with the line above: it makes the same point.',
        deferred: ' Recorded, not read in the main text.',
    }[use];
    const describe = (side) => (side.family === 'self'
        ? `the Day Master (${model.dayMaster.stem})`
        : `${side.god ?? FAMILY_TERM[side.family]} (${side.phase}, ${side.position})`);
    switch (claim.kind) {
        case 'bound':
            return `Stem combination between the Day Master and ${describe(claim.partner)}. Transformation is not asserted.${claim.restsOnHour ? ' Uses the estimated hour.' : ''}${suffix}`;
        case 'clash':
            return `${claim.relation === 'stem' ? 'Stem clash' : 'Branch clash'}: ${describe(claim.sides[0])} against ${describe(claim.sides[1])}; a branch is read by its main hidden stem.${claim.restsOnHour ? ' Uses the estimated hour.' : ''}${suffix}`;
        case 'binding':
            return `${claim.relation === 'stem' ? 'Stem combination' : 'Six Harmony'}: ${describe(claim.sides[0])} with ${describe(claim.sides[1])}. Transformation is not asserted.${claim.restsOnHour ? ' Uses the estimated hour.' : ''}${suffix}`;
        case 'pull':
            return `${FAMILY_TERM[claim.controller.family]} ${weightText(claim.controller.weight)} checks ${FAMILY_TERM[claim.controlled.family]} ${weightText(claim.controlled.weight)} in the controlling cycle; both are above an even share of the chart.${claim.restsOnHour ? ' Without the estimated hour one of them falls below it.' : ''}${suffix}`;
        case 'doubled':
            return `Self-punishment: the same branch in ${positionsText(claim.sides.map((side) => side.position))}. A disputed reading.${claim.restsOnHour ? ' Uses the estimated hour.' : ''}${suffix}`;
        case 'latent':
            return `Partial Three Harmony toward ${claim.phase} (${FAMILY_TERM[claim.family]}) in ${positionsText(claim.sides.map((side) => side.position))}: two of three branches, read as latent.${claim.restsOnHour ? ' Uses the estimated hour.' : ''}${suffix}`;
        case 'friction':
            return `${claim.category === 'harm' ? 'Six Harm' : 'Punishment'} in ${positionsText(claim.sides.map((side) => side.position))}; its weight is disputed across schools.${claim.restsOnHour ? ' Uses the estimated hour.' : ''}${suffix}`;
        default:
            return null;
    }
}
/**
 * The support verdict in all five of the engine's grades. The plan's three
 * bands choose rules; a reader is told the grade, so "a little less" and "less"
 * stay different sentences instead of collapsing into one.
 */
const VERDICT = {
    weak: 'The chart as a whole gives you less to draw on than it asks of you',
    'moderately-weak': 'The chart as a whole gives you a little less to draw on than it asks of you',
    balanced: 'The chart as a whole gives you about as much as it asks of you',
    'moderately-strong': 'The chart as a whole gives you a little more than you need to spend',
    strong: 'The chart as a whole gives you more than you need to spend',
    indeterminate: 'The chart does not settle whether it gives you more or less than it asks of you',
};
/** The grade across the line, said the way the verdicts above say it. */
const NEAR_LINE = {
    weak: 'giving you less than it asks',
    'moderately-weak': 'giving you a little less than it asks',
    balanced: 'giving you about as much as it asks',
    'moderately-strong': 'giving you a little more than you need',
    strong: 'giving you more than you need',
    indeterminate: 'not settling the question',
};
/* --------------------------------------------------------------- voice */
export const EN_VOICE = {
    time: (claim) => (claim.precision === 'unknown'
        ? `Your birth time is not known, so this reading works from ${claim.characters === 6 ? 'six' : String(claim.characters)} of the chart's eight characters. A BaZi chart has two for each of the year, the month, the day and the hour, and without a birth time the two for the hour cannot be worked out. The hour pillar is left out rather than guessed; everything below is read from what remains.${claim.dateBoundary
            ? ` Your birth date also falls on a change of solar ${claim.dateBoundary.year ? 'year and month' : 'month'} at about ${claim.dateBoundary.at}, so the month pillar is ${claim.dateBoundary.months.join(' before it and ')} after. The reading below uses the one in force at midday; if you were born ${claim.dateBoundary.at < '12:00' ? 'before' : 'after'} about ${claim.dateBoundary.at}, the season it starts from would be different.`
            : ''}`
        : 'Your birth time is your own estimate, so the hour pillar is read as you gave it and held more loosely than the rest. Your core element and its season do not depend on it; where a point does, the reading says so.'),
    nature: (claim) => {
        const stem = STEM[claim.stem];
        const opening = `Your chart is read from one element at its centre: ${stem.image}. That is the element of the day you were born. ${stem.tendency}`;
        if (!claim.season)
            return `${opening} ${NO_SEASON}`;
        const { ruling, monthBranch, state } = claim.season;
        const time = ruling === 'Earth' ? (EARTH_MONTH[monthBranch] ?? SEASON_TIME.Earth) : SEASON_TIME[ruling];
        return `${opening} You were born in the ${P[ruling]} season, ${time}. ${EN_SEASON_EFFECT[claim.stem][state]}`;
    },
    support: (claim) => {
        const phase = P[claim.phase];
        const drain = { output: 'drawing on it', wealth: 'asking to be handled', authority: 'pressing on it' }[claim.heaviestDrain] ?? 'pulling the other way';
        /* The engine's five grades, each said - the band only chooses the rules. */
        const verdict = VERDICT[claim.tendency];
        const known = claim.precision === 'unknown' ? ` among the ${COUNT_WORD[claim.characters] ?? claim.characters} known characters` : '';
        let own;
        if (claim.own === 'alone') {
            own = claim.companions < 0.05
                ? (claim.precision === 'unknown'
                    ? `there is no other ${phase}${known}, on the surface or hidden, so nothing of your own kind stands beside you there`
                    : `there is no other ${phase} anywhere in it, on the surface or hidden, so nothing of your own kind stands beside you`)
                : claim.companions < 0.5
                    ? `apart from you, no ${phase} shows${known || ' on its surface'}, and only a trace is hidden underneath`
                    : `apart from you, no ${phase} shows${known || ' on its surface'}, though some is hidden underneath`;
        }
        else if (claim.own === 'some') {
            own = {
                thin: `there is other ${phase} beside you, but more of the chart pulls away from you than holds you up`,
                even: `there is other ${phase} beside you, and about as much of the chart ${drain}`,
                ample: `there is other ${phase} beside you, and it holds you up well`,
            }[claim.band];
        }
        else {
            own = {
                thin: `there is a good deal of ${phase} in it, yet more of the chart pulls away from you than holds you up`,
                even: `there is a good deal of ${phase} in it besides you, and nearly as much ${drain} - which is why it comes out even rather than strong`,
                ample: `a good deal of it is your own element, and it holds you up well`,
            }[claim.band];
        }
        const meaning = {
            thin: {
                output: 'In practice, your energy goes furthest when something steady feeds it, and runs down when you keep giving without it.',
                wealth: 'In practice, you hold up best when something steady feeds you, and wear down when you keep carrying without it.',
                authority: 'In practice, you hold up best when something steady feeds you, and wear down when you keep meeting demands without it.',
            }[claim.heaviestDrain] ?? 'In practice, your energy goes furthest when something steady feeds it.',
            even: 'That balance is useful and easily tipped: you have enough to meet what comes, and too much of any one pull throws it.',
            ample: 'In practice, strength like this needs an outlet, and restlessness is the sign it has none.',
        }[claim.band];
        /* What the engine's confidence actually measures. Low: part of the chart is
           missing. Medium: the support fraction sits close to the cut between two
           grades - so the sentence names the grade across that line. High: it is
           clear of every line. Never "most signals agree": nothing counts votes. */
        const confidence = claim.confidence === 'low'
            ? (claim.precision === 'unknown'
                ? 'This is held more loosely than anything else here, because a quarter of the chart is missing with the hour.'
                : 'Read it lightly: part of the chart is missing.')
            : claim.confidence === 'high'
                ? (claim.precision === 'approximate' ? 'The chart is clear on this, counting the hour you estimated.' : 'The chart is clear on this.')
                : `${claim.nearLine
                    ? `It sits close to the line where the chart would read as ${NEAR_LINE[claim.nearLine]}, so hold it as a leaning rather than a firm verdict.`
                    : 'It sits close to the line between two readings, so hold it as a leaning rather than a firm verdict.'}${claim.precision === 'approximate' ? ' It counts the hour you estimated.' : ''}`;
        return `${verdict}: ${own}. ${meaning} ${confidence}`;
    },
    lead: (claim) => {
        const { lead, second } = claim;
        /* Three steps of closeness, so a small move in weight changes a word, not the frame. */
        const opening = second
            ? (claim.closeness === 'close'
                ? `Two things lead your chart: ${MEANING[lead.family](lead.phase)}, and close behind it, ${MEANING[second.family](second.phase)}.`
                : `Two things weigh ${claim.closeness === 'tie' ? 'equally' : 'almost equally'} in your chart: ${MEANING[lead.family](lead.phase)} and ${MEANING[second.family](second.phase)}.`)
            : `More of your chart is about ${MEANING[lead.family](lead.phase)} than about anything else.`;
        const parts = [opening, kinds(lead), BAND_LEAD[claim.band][lead.family]];
        if (second) {
            parts.push(kinds(second));
            if (claim.secondRestsOnHour)
                parts.push('That second weight comes largely from the hour you estimated.');
        }
        return parts.filter(Boolean).join(' ');
    },
    scarce: (claim) => {
        const [first, next] = claim.families;
        /* With the hour unknown, the absence is from the known characters, and the
           missing hour could hold what they do not - said once, at the end. */
        const where = claim.partial ? 'the known part of your chart' : 'the chart';
        const verb = first.weight < 0.05 ? 'does not carry at all' : 'hardly carries';
        const parts = [
            `What ${where} ${verb} is ${P[first.phase]}, ${SCARCE_ROLE[first.family]}.`,
            scarceConsequence(first.family, claim.lead, claim.band, claim.present),
        ];
        if (next)
            parts.push(`There is little ${P[next.phase]} either - ${SCARCE_ROLE[next.family]}.`);
        if (claim.partial)
            parts.push('The missing hour could change this.');
        return parts.join(' ');
    },
    polarity: (claim) => {
        const yin = claim.dayMaster === 'Yin';
        const text = {
            even: yin
                ? 'The chart is evenly split between the outward and the inward, and your own centre is the yielding kind: you can push or wait, and waiting comes more naturally.'
                : 'The chart is evenly split between the outward and the inward, and your own centre is the forward kind: you can push or wait, and pushing comes more naturally.',
            yang: yin
                ? 'Your centre is the inward, yielding kind, and the chart around it leans outward: much of your pace is set by the push around you rather than by your own.'
                : 'Both you and the rest of your chart lean outward: you tend to meet things head-on and to move first.',
            yin: yin
                ? 'Both you and the rest of your chart lean inward: you take things in before acting, and you get where you are going by persistence rather than force.'
                : 'Your centre is the forward kind, set in a chart that leans inward: you have more push than your surroundings invite, and you often hold it until the moment is right.',
        }[claim.lean];
        return claim.restsOnHour ? `${text} This lean depends on the hour you estimated.` : text;
    },
    tension,
    tensionStandfirst: 'Where two parts of the chart pull against each other or hold each other in place - read as tendencies, not verdicts.',
    helps: (claim) => {
        const primary = claim.primary;
        const lacking = primary.weight < 0.5;
        const opening = `${lacking ? 'What would steady you' : 'What steadies you'} is ${HELPER[primary.family](primary.phase)}`;
        const parts = [];
        if (claim.bridge) {
            const [from, to] = claim.bridge.between;
            parts.push(`${opening}. In your chart it stands between ${BRIDGE_SIDE[from]} and ${BRIDGE_SIDE[to]} and carries one into the other, so the two stop grinding against each other; ${presence(primary.weight, claim.partial).replace(/^and /, '')}.`);
        }
        else {
            parts.push(`${opening} - ${presence(primary.weight, claim.partial)}${lacking ? ', so it has to be arranged on purpose rather than waited for' : ''}.`);
        }
        const second = claim.secondary;
        if (second) {
            const text = HELPER[second.family](second.phase);
            parts.push(second.weight < 0.5
                ? `What the ${claim.partial ? 'known ' : ''}chart lacks${lacking ? ' as well' : ''} is ${text}.`
                : `After that comes ${text}, and there is ${second.weight >= 1 ? 'some' : 'a little'} of that too.`);
        }
        return parts.join(' ');
    },
    cost: (claim) => {
        const second = costSentence(claim);
        return `${STEM[claim.stem].cost} ${claim.band === 'ample' ? `At the same time, ${second.charAt(0).toLowerCase()}${second.slice(1)}` : second}`;
    },
    practice: (claim) => [
        HELPER_PRACTICE[claim.helper.family](claim.helper.phase, claim.helper.weight >= 1),
        FOCUS[claim.focus],
        STEM[claim.stem].practice,
    ].join(' '),
    evidence: {
        standfirst: 'The chart facts behind each part of the reading, in the tradition\'s own terms.',
        nature: (model) => {
            const lines = [
                `Day Master: ${model.dayMaster.stem} (${model.dayMaster.character}), ${model.dayMaster.polarity} ${model.dayMaster.phase} - the stem of the day pillar.`,
                model.season
                    ? `Month branch: ${model.season.monthBranch}. ${model.season.ruling} commands the month, so ${model.dayMaster.phase} stands in the ${STATE_CHARACTER[model.season.state]} state: ${STATE_GLOSS[model.season.state]}.`
                    : 'Season: not resolved by the engine, so no seasonal state is read.',
                `Strength heuristic: support ${scoreText(model.strength.supportScore)} against drain ${scoreText(model.strength.drainScore)} - ${model.strength.tendency}, at ${model.strength.confidence} confidence. It is the engine's balancing model, not a Useful God (Yong Shen) judgement.`,
                `Visible ${model.dayMaster.phase}: ${model.own.visible} of ${model.counts.visibleTotal} characters, the Day Master included. That count is a separate fact from the strength verdict above.`,
            ];
            if (model.time.precision === 'unknown' || !model.time.hour) {
                lines.push(`Hour pillar: not calculated. The birth time is unknown, so ${model.counts.visibleTotal} characters are read and nothing is inferred from the noon fallback.`);
            }
            else if (model.time.precision === 'approximate') {
                lines.push(model.time.hourAlternatives.length > 0
                    ? `Hour pillar: calculated from your estimated time, and marked approximate wherever a conclusion depends on it. Within two hours of the estimate it could also be ${model.time.hourAlternatives.join(' or ')}.`
                    : 'Hour pillar: calculated from your estimated time, and marked approximate wherever a conclusion depends on it.');
            }
            return lines;
        },
        energy: (model) => {
            const lines = [
                `Ten God families, counting each visible stem as 1 and each hidden stem by its conventional share: ${familyList(model, model.ranking)}.`,
                model.scarce.length > 0
                    ? `Under half a character's weight: ${model.scarce.map((family) => `${FAMILY_TERM[family]} (${model.families[family].phase})`).join(', ')}.`
                    : 'No family falls under half a character\'s weight.',
                `Yin / Yang: ${model.polarity.yin} / ${model.polarity.yang}; the Day Master is ${model.polarity.dayMaster}.`,
            ];
            if (model.time.precision === 'approximate') {
                lines.push(`Without the hour pillar the order would be: ${model.rankingWithoutHour.map((family) => FAMILY_TERM[family]).join(', ')}.`);
            }
            return lines;
        },
        tension: (model, plan) => {
            /* Every relation is listed, including the ones folded into a claim that
               makes the same point - the main text says it once, the evidence keeps
               each instance. */
            const lines = [
                ...plan.tension.flatMap((claim) => [
                    relationLine(claim, model, 'main'), ...claim.also.map((other) => relationLine(other, model, 'folded'))
                ]),
                ...plan.deferred.flatMap((claim) => [
                    relationLine(claim, model, 'deferred'), ...claim.also.map((other) => relationLine(other, model, 'deferred'))
                ]),
            ].filter((line) => Boolean(line));
            lines.push('Combinations, clashes and frames are recorded as structure only; no transformation is asserted, and schools differ on how much weight each carries.');
            return lines;
        },
        steadies: (model, plan) => {
            const helps = plan.helps;
            const rule = {
                thin: 'With a weak Day Master the conventional supports are Resource and Companion.',
                even: 'With a balanced Day Master the reading looks for what keeps the heaviest forces moving.',
                ample: 'With a strong Day Master the conventional outlets are Output, Wealth and Authority.',
            }[helps.band];
            const lines = [rule];
            if (helps.bridge) {
                const [from, to] = helps.bridge.between;
                lines.push(`${FAMILY_TERM[from]} and ${FAMILY_TERM[to]} are the two heaviest families and stand in the controlling cycle; ${FAMILY_TERM[helps.primary.family]} sits between them in the generating cycle.`);
            }
            lines.push(`${FAMILY_TERM[helps.primary.family]} is ${helps.primary.phase} here, weight ${weightText(helps.primary.weight)}.`);
            if (helps.secondary) {
                lines.push(`${FAMILY_TERM[helps.secondary.family]} is ${helps.secondary.phase} here, weight ${weightText(helps.secondary.weight)}.`);
            }
            return lines;
        },
        rest: (model, plan) => [
            `The costs and practices follow from the Day Master (${model.dayMaster.stem}), the heaviest family (${FAMILY_TERM[plan.cost.lead.family]}${plan.cost.partner ? `, sharing the lead with ${FAMILY_TERM[plan.cost.partner]}` : ''}) and the strength verdict (${model.strength.tendency}). They describe tendencies, not events.`,
        ],
    },
};
