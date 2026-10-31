import { FAMILY_TERM, STATE_CHARACTER, capitalise, scoreText, weightText, } from './baziVoice.js';
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
/**
 * One of several equivalent phrasings, chosen by a property of THIS chart.
 *
 * A stock sentence that three charts share word for word reads as a template
 * to anyone who compares. The seed is always a fact of the chart (its element,
 * its weights, where a relation stands), never a counter or a random number, so
 * the same chart reads the same on every device and every run.
 */
function variant(seed, options) {
    let hash = 7;
    for (let index = 0; index < seed.length; index += 1)
        hash = (hash * 31 + seed.charCodeAt(index)) >>> 0;
    return options[hash % options.length];
}
/* ------------------------------------------------------------ the stems */
const STEM = {
    jia: {
        image: 'wood in its upright form - the tall tree growing toward the light',
        tendency: 'You tend to move by direction and principle. Once you know which way is up, you keep growing that way, and you do not bend easily to make room.',
        cost: 'The cost of growing straight is that you do not bend: you can hold a position long after bending would have cost you less.',
        practice: 'Practise bending in small things, so that it is a choice when it matters.',
    },
    yi: {
        image: 'wood in its supple form - the vine and the grass rather than the trunk',
        tendency: 'You tend to get where you are going by finding a way around: adapting, connecting, leaning on what already stands. You are harder to uproot than you look.',
        cost: 'The cost of adapting so well is that you can lean on other people\'s structures until your own shape is hard to find.',
        practice: 'Put down one root of your own: something you hold whoever is around.',
    },
    bing: {
        image: 'fire in its open form - the sun, which shines on everything at once',
        tendency: 'You tend to meet people and situations with warmth and visibility. You are at your best giving freely rather than rationing what you give.',
        cost: 'The cost of shining on everything is that you burn at full strength where a little would do, and run low before you notice.',
        practice: 'Ration your light: choose where to shine and let the rest rest.',
    },
    ding: {
        image: 'fire in its focused form - the lamp rather than the sun',
        tendency: 'You tend to give your warmth to a few things and people at a time, closely and attentively. You see detail that broad light misses.',
        cost: 'The cost of focused warmth is that you guard the flame closely, and can keep out people who might have helped keep it going.',
        practice: 'Let someone else tend the flame now and then.',
    },
    wu: {
        image: 'earth in its massive form - the mountain, the ground that does not move',
        tendency: 'You tend to be the fixed point others orient by: steady, protective, slow to shift and hard to push.',
        cost: 'The cost of steadiness is inertia: you can stay put after the ground has already shifted.',
        practice: 'Move a little before you are sure: test the ground instead of waiting to be pushed.',
    },
    ji: {
        image: 'earth in its yielding form - worked soil, the field rather than the mountain',
        tendency: 'You tend to work by making conditions: preparing, holding, tending. Things grow where you have been, often without anyone tracing it back to you.',
        cost: 'The cost of all that tending is that you take in whatever is put on you, from other people\'s worries to unfinished business. You have no natural way of setting it down.',
        practice: 'Say what you prefer out loud, before the arrangement forms around what others want.',
    },
    geng: {
        image: 'metal in its raw form - the axe and the unworked ore',
        tendency: 'You tend to cut straight to what matters, form a view quickly and say what you think, and you respect what can stand up to you.',
        cost: 'The cost of directness is force: you can use a blade where a finer tool was needed, and only hear afterwards how hard it landed.',
        practice: 'Choose your tool before you strike: ask what the situation needs, not only what is true.',
    },
    xin: {
        image: 'metal in its refined form - the jewel and the fine blade',
        tendency: 'You tend to care about quality and precision, and you notice at once when something is slightly off.',
        cost: 'The cost of a fine edge is sensitivity: criticism cuts deeper than it should, and you hold yourself to a finish nobody asked for.',
        practice: 'Let good enough be finished; take feedback as information, not judgement.',
    },
    ren: {
        image: 'water in its moving form - the river and the open sea',
        tendency: 'You tend to think in wide currents, move on when something stops flowing, and find routes others walk past.',
        cost: 'The cost of range is scatter: you can run so wide that nothing holds your course for long.',
        practice: 'Pick a channel and stay in it long enough to arrive.',
    },
    gui: {
        image: 'water in its lightest form - rain, mist and dew',
        tendency: 'You tend to take in far more than you show: moods, atmospheres, what is not being said. You work by quiet, patient influence rather than force.',
        cost: 'The cost of taking in so much is that you can take the shape of whatever holds you. When it gets too much, you can slip away quietly, sometimes before anyone knew it was too much.',
        practice: 'Say what you perceive before you can fully justify it.',
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
        prosperous: 'In its own season a tree is at full stretch. You have more growth in you than any single direction can use, and little in the season slows it.',
        aided: 'Water feeds the tree from underneath in these months, so you are nourished at the root. Your growth tends to happen before it shows.',
        resting: 'Fire burns what the tree gives it, so what you grow is turned straight into heat and light. You are spent as fast as you are renewed.',
        trapped: 'A tree has to drive its roots through the heavy ground of these months. You make headway, but by effort, and the effort shows.',
        dead: 'Metal prunes the tree in this season, so what you put out is cut back. You grow by being shaped rather than by spreading.',
    },
    yi: {
        prosperous: 'In its own season a vine grows in every direction at once: you spread easily, and the question is what to climb.',
        aided: 'Water keeps the vine supplied through these months. You are nourished quietly, and you tend to bide your time until there is something to climb.',
        resting: 'A vine in this season flowers and spends itself doing it. What you have goes out as colour and warmth, and it is easy to give more than you replace.',
        trapped: 'A vine has to find a hold in the heavy ground of these months. You get where you are going by patience and small gains rather than by force.',
        dead: 'Metal cuts the vine back in this season, and it finds another way round. You are shaped by pressure, and you adapt rather than break.',
    },
    bing: {
        prosperous: 'The sun in its own season is at full strength. Warmth and drive come easily; the question is where to point them, not where to find them.',
        aided: 'Wood keeps the sun fed in these months, so you rise with fuel to burn. Your warmth seldom has to be forced.',
        resting: 'The sun warms the ground in these months and settles into it. What you give out is soaked up quietly, and it is easy to feel you made less difference than you did.',
        trapped: 'The sun in this season is still bright, but it has hard metal to work. Your warmth and visibility hold, and keeping them costs more effort.',
        dead: 'The sun in this season gives real light against a cold that resists it. Your warmth has to hold its own, and you learn to keep it steady rather than blazing.',
    },
    ding: {
        prosperous: 'A lamp in its own season competes with the daylight. Your warmth is plentiful, and the task is to keep it focused rather than lost in the glare.',
        aided: 'A lamp with steady fuel burns at its best, and wood feeds you in these months. Your warmth can stay close and constant.',
        resting: 'A lamp in these months gives its warmth into the ground. What you tend closely is absorbed around you, quietly, and it is easy to underrate how much it held.',
        trapped: 'A lamp has fine work to do on hard metal in these months. You bring focused warmth to material that resists it, and the work is careful and slow.',
        dead: 'A lamp in this season is small, guarded and genuinely needed. Water presses on your flame, so you keep it close and spend it where it counts.',
    },
    wu: {
        prosperous: 'In its own months the mountain is at its most solid. You have weight and staying power, and the risk is not moving at all.',
        aided: 'Fire warms the mountain through in these months. You are fed from outside and building, with more in you to give than the season asks.',
        resting: 'In these months ore is taken out of the mountain. What the season draws from you is your own substance, and it is easy not to notice how much is going.',
        trapped: 'The mountain holds back water in these months, like a dam. You contain and steady what moves around you, and the holding takes constant effort.',
        dead: 'Wood roots break the mountain\'s ground open in this season. Steady as you are, you are being worked on by growth that is not yours.',
    },
    ji: {
        prosperous: 'In its own months worked soil is deep and fertile. You gather and hold, and the risk is holding more than you use.',
        aided: 'Fire warms the soil through in these months, which is its most generative condition. You are fed from outside, and things grow easily where you are.',
        resting: 'Metal is drawn out of earth the way a harvest is lifted out of a field. The season takes what you produce as soon as it is made.',
        trapped: 'Soil in these months holds moisture it cannot take in. You absorb and contain what flows toward you, and the holding takes constant effort.',
        dead: 'Wood breaks the soil up with its roots. The season keeps pressing into your ground, and you are shaped by growth that is not yours.',
    },
    geng: {
        prosperous: 'In its own season the axe is at full edge: your sharpness comes easily, and the question is what it is for.',
        aided: 'Earth holds and feeds metal the way rock holds ore. You are protected and supplied, and your edge is still forming.',
        resting: 'Metal gives itself to water in these months: cold, clear, carried off in the flow. What you give out is taken away, and it is easy to run cold.',
        trapped: 'The axe has living wood to cut in these months. You work on the season, productively and with effort, and the growth keeps coming back.',
        dead: 'Fire works raw metal in this season, and for the axe that means forging. You are tested and reshaped, and the pressure tends to leave you more deliberate, not less.',
    },
    xin: {
        prosperous: 'In its own season the jewel is at its finest: your precision comes easily, and it can make you hard to reach.',
        aided: 'Earth sets the jewel and holds it up in these months. You are supported and shown well, and your finish has something solid behind it.',
        resting: 'A jewel in these months gives its clarity away into the cold. What you refine flows outward, and it is easy to give it away faster than you renew it.',
        trapped: 'A jewel in these months has fine work to do against living material. You bring precision to things that keep growing, and the work never quite finishes.',
        dead: 'Heat in this season presses on something that was already finished. Fire does not improve the jewel, so you guard your finish and choose what you expose.',
    },
    ren: {
        prosperous: 'In its own season the sea is at full volume. You have plenty to draw on, and the risk is running past your banks.',
        aided: 'Metal feeds the river at its source in these months, like a spring from rock. You have a good supply to draw on, and your clarity comes from it.',
        resting: 'The sea feeds everything that grows in this season. What you have is taken up all around you, and it is easy to run low without seeing where it went.',
        trapped: 'The sea meets fire in these months, and the meeting is steam and effort. You cool what has overheated around you, and the work does not rest easily.',
        dead: 'Earth banks the river in during these months: the season contains your flow, and you move by finding the gaps.',
    },
    gui: {
        prosperous: 'In its own season rain is everywhere at once. You take in a great deal from every side, and it is hard to gather it in one place.',
        aided: 'Metal clears the water at its source in these months, and the rain falls fine and well timed. You have a good supply to draw on, and your perceptions come clear.',
        resting: 'Rain in this season soaks into everything growing. What you have goes quietly into the life around you, and you can be drawn on more than you notice.',
        trapped: 'Water spends this season cooling the heat around it: you temper situations, and keeping things cool is constant work.',
        dead: 'Rain in these months is taken up by the ground the moment it lands. The season contains you, and you work by seeping through rather than flowing.',
    },
};
/** The sentence the nature line uses when the engine resolved no season. */
const NO_SEASON = 'The season you were born into could not be settled for this chart, so the reading leans on the balance of the whole chart instead of on its month.';
/* ------------------------------------------------------------ the families */
/**
 * What a family is about, said in two parts: the theme ("taking in") and the
 * element that carries it ("earth, the element that feeds you"). One lead says
 * them in one sentence; two leads name both themes first and their elements in
 * a second, short sentence, so the opening is not one long chain of brackets.
 */
const THEME = {
    companion: 'your own kind',
    output: 'giving out',
    wealth: 'working on the world',
    authority: 'being shaped from outside',
    resource: 'being fed',
};
const CARRIER = {
    companion: (phase) => `${P[phase]}, like you`,
    output: (phase) => `${P[phase]}, the element you feed`,
    wealth: (phase) => `${P[phase]}, the element you shape`,
    authority: (phase) => `${P[phase]}, the element that holds you in check`,
    resource: (phase) => `${P[phase]}, the element that feeds you`,
};
/** The carrier as a clause, for the second sentence of a two-lead opening. */
const CARRIER_CLAUSE = {
    companion: (phase) => `${P[phase]} is your own element`,
    output: (phase) => `${P[phase]} is the element you feed`,
    wealth: (phase) => `${P[phase]} is the element you shape`,
    authority: (phase) => `${P[phase]} is the element that holds you in check`,
    resource: (phase) => `${P[phase]} is the element that feeds you`,
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
    resource: 'What feeds you is',
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
        output: 'With support running thin, that is a great deal going out from a modest supply. You are productive, and you tend to tire before you notice.',
        wealth: 'With support running thin, the chart hands you more to manage than it gives you strength for. You take on practical weight readily and feel it later.',
        authority: 'With support running thin, the pressure lands on a centre with little to push back with. Expectations tend to weigh on you more than they look from outside.',
        resource: 'With support running thin, this is what holds you up: what feeds you is exactly what keeps you going.',
        companion: 'With support running thin, your own kind is what keeps you standing: you do better alongside others than alone.',
    },
    even: {
        output: 'In a chart this balanced, giving out is the outlet that keeps things moving.',
        wealth: 'In a chart this balanced, practical work is where your energy naturally lands.',
        authority: 'In a chart this balanced, pressure is something you can carry, as long as it does not become the only thing you carry.',
        resource: 'In a chart this balanced, what feeds you is a reserve you can draw on.',
        companion: 'In a chart this balanced, that is a large share of the whole. You rarely give way, and you may measure yourself against others more than you need to.',
    },
    ample: {
        output: 'With strength to spare, this is where it goes best: into making and expressing.',
        wealth: 'With strength to spare, you can carry practical weight well: results are where your energy wants to land.',
        authority: 'With strength to spare, structure and challenge suit you: pressure gives your force a shape.',
        resource: 'With strength to spare, more support than you need can keep you in preparation: you can gather for a long time before acting.|With strength to spare, more support than you need can slow your start: you may keep gathering well past the point of acting.',
        companion: 'With strength to spare and plenty of your own kind, your will is strong and you do not yield easily.',
    },
};
const SCARCE_ROLE = {
    output: 'the element of output: making things, a voice of your own, pushing back',
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
                return 'What you make tends to leave you almost at once. Turning it into something that stays yours is a separate step you have to decide to take.';
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
const POSITION_BASE = {
    Year: 'the side of you others meet first',
    Month: 'your day-to-day effort',
    Day: 'your private centre',
    Hour: 'your aims and plans',
};
/** The part of the birth data a position is read from, said once in a reading, the first time the position appears. tension() starts a reading when it has no previous claim. */
const positionsNamed = new Set();
const POSITION = new Proxy(POSITION_BASE, {
    get(target, key) {
        const label = target[key];
        if (label === undefined || positionsNamed.has(key))
            return label;
        positionsNamed.add(key);
        return `${label} (from your birth ${key.toLowerCase()})`;
    },
});
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
/**
 * Where the two ends of a relation stand, as its own sentence after the one
 * that names the relation. When both ends are the same kind, it is named once
 * and placed twice, instead of being said twice in a row.
 */
const PLURAL_SIDE = new Set(['Eating God', 'Indirect Resource']);
const isPlural = (side) => side.family === 'self' || (side.god !== null && PLURAL_SIDE.has(side.god));
const whereSides = (a, b) => (sideGloss(a) === sideGloss(b)
    ? `${capitalise(sideGloss(a))} ${isPlural(a) ? 'stand' : 'stands'} on both sides: in ${POSITION[a.position]} and in ${POSITION[b.position]}.`
    : `${capitalise(sideGloss(a))} ${isPlural(a) ? 'sit' : 'sits'} in ${POSITION[a.position]}, and ${sideGloss(b)} in ${POSITION[b.position]}.`);
const HOUR_NOTE = 'This link rests on the hour you estimated.';
/** What each kind of opposition means. The plan decides which one a pair is. */
const CLASH_MEANING = {
    'skill-vs-pressure': 'BaZi treats this opposition as a useful one. Skill and ease are the classic answer to pressure, so what you enjoy doing is also how you cope. That holds as long as the strain does not take the enjoyment first.',
    'speech-vs-order': 'This is the classic friction between speaking out and keeping order. You can question a rule in one breath and feel bound by it in the next, and both sides are really yours.',
    'expression-vs-rules': 'Your own way of doing and saying things runs up against the pressure and rules you are held to. The friction is between two real parts of you.',
    'intake-vs-expression': 'In BaZi, the part of you that is fed and taught keeps the outspoken part in check. Study and care can temper a sharp edge, and they can also hold back something that was ready to be said.',
    'work-vs-nourishment': 'What you are working toward and what feeds you compete for the same time: practical demands tend to crowd out study and rest.',
    'will-vs-holding': 'Your own will and what you are trying to hold pull apart: sharing and keeping do not sit easily together.',
    'independence-vs-structure': 'Your independence stands against the structure you are held to: when pushed, you tend to feel the urge to push back, though acting on it may cost you effort.',
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
        ? ` ${onHour === 1 ? 'One of them is' : `${capitalise(COUNT_WORD[onHour] ?? 'some')} of them are`} in the hour you estimated.` : '';
    return ` The same ${what} shows up in ${COUNT_WORD[count] ?? 'several'} places in your chart, so it is a theme, not a single point.${hourNote}`;
}
/**
 * "Two parts", or "two other parts" - but only after a paragraph that itself
 * introduced two parts. The first paragraph of the section never says "other".
 */
const introducesParts = (previous) => previous !== null && (previous.kind === 'clash' || previous.kind === 'binding');
/** The pulls, each as a firm statement and as the tendency a pull only just over the line gets. */
const PULL = {
    'resource>output': {
        clear: ['Being fed and giving out compete in you. The part of you that learns and reflects keeps a check on the part that makes and speaks. That can temper an edge usefully, and it can also hold back something that was ready.'],
        slight: ['Being fed and giving out can compete in you. The part of you that learns and reflects tends to check the part that makes and speaks. That can temper an edge, and it can also hold back something that was ready.'],
    },
    'output>authority': {
        clear: ['Your own way of doing things keeps testing the structure around you. You improve rules by questioning them, and you can wear them down the same way.'],
        slight: ['Your own way of doing things can test the structure around you. You tend to improve rules by questioning them, and can wear them down the same way.'],
    },
    'authority>companion': {
        clear: [
            'Your chart holds plenty of your own kind, and enough pressure to keep it in check. When you are pushed, you tend to push back.',
            'Your own kind is well represented in your chart, and so is the pressure that holds it in check. Pushed, you tend to answer in kind.',
            'Plenty of your own kind sits in your chart, held in check by real pressure. That pressure tends to bring out your resistance.',
            'Your chart pairs a strong showing of your own kind with pressure that keeps it in check. Under pressure, you tend to dig in.',
        ],
        slight: [
            'Your chart holds your own kind, and pressure that tends to keep it in check. When you are pushed, you may push back.',
            'Your own kind is present in your chart, with pressure that tends to hold it in check. Pushed, you may answer in kind.',
            'Some of your own kind sits in your chart, checked by pressure. That pressure may bring out your resistance.',
            'Your chart pairs some of your own kind with pressure that tends to keep it in check. Under pressure, you may dig in.',
        ],
    },
    'companion>wealth': {
        clear: ['Your own will competes with what you are trying to hold: sharing and keeping pull in different directions.'],
        slight: ['Your own will can compete with what you are trying to hold: sharing and keeping tend to pull in different directions.'],
    },
    'wealth>resource': {
        clear: ['What you are working toward keeps pulling you away from what feeds you. Practical demands crowd out study and rest'],
        slight: ['What you are working toward can pull you away from what feeds you. Practical demands tend to crowd out study and rest'],
    },
};
const BOUND_CONSEQUENCE = {
    authority: {
        Year: 'You tend to take the expectations around you on as your own.',
        Month: 'You tend to take obligations on as if they were part of you: dependable, and slow to put one down even when it is not yours to carry.',
        Hour: 'What you want and what is expected of you tend to merge, so you can pursue a duty as if it were a wish.',
    },
    wealth: {
        Year: 'You tend to identify with what you look after in plain view.',
        Month: 'You tend to become what you work on: steady and reliable in it, and slow to separate yourself from it.',
        Hour: 'You tend to tie your aims to something concrete you can hold, and then to hold on to it.',
    },
};
function tension(claim, dayMaster, previous) {
    if (previous === null)
        positionsNamed.clear();
    /* Said in full once; a second paragraph resting on the same estimate says so shortly, not word for word. */
    const hour = claim.restsOnHour ? ` ${previous?.restsOnHour ? 'This one also rests on that estimate.' : HOUR_NOTE}` : '';
    switch (claim.kind) {
        case 'bound': {
            const role = claim.partner.family === 'wealth' ? 'wealth' : 'authority';
            const element = role === 'authority' ? 'the element that holds you in check' : 'the element you work on';
            const consequence = BOUND_CONSEQUENCE[role][claim.partner.position]
                ?? BOUND_CONSEQUENCE[role].Month;
            return `In ${POSITION[claim.partner.position]}, your own element is tied to ${P[claim.partner.phase]}, ${element}. `
                + `BaZi reads this as a bond rather than a clash. ${consequence}${hour}${recurrence(claim, 'bond')}`;
        }
        case 'clash': {
            const [a, b] = claim.sides;
            if (claim.meaning === 'against-self') {
                /* One side is the Day Master itself: there are not "two parts" to name,
                   there is you and the thing that pushes against you. */
                const other = a.family === 'self' ? b : a;
                const pressing = other.god === 'Indirect Wealth'
                    ? 'Chasing an opening can press on you rather than support you.'
                    : 'That part tends to press on you rather than support you.';
                return `In ${POSITION[other.position]}, ${sideGloss(other)} clashes with your core element. `
                    + `${pressing}${hour}${recurrence(claim, 'opposition')}`;
            }
            const surface = claim.meaning === 'intake-vs-expression' && claim.relation === 'stem'
                ? ' Because both stand on the surface of the chart, this shows in what you say and do more than underneath.' : '';
            const other = introducesParts(previous);
            const opener = variant(`clash|${a.position}${b.position}|${a.god ?? a.family}|${b.god ?? b.family}`, other
                ? ['Two other parts of your chart stand directly opposed.', 'Two other parts of your chart pull directly against each other.', 'Two other parts of your chart meet head-on.']
                : ['Two parts of your chart stand directly opposed.', 'Two parts of your chart pull directly against each other.', 'Two parts of your chart meet head-on.']);
            return `${opener} ${whereSides(a, b)} `
                + `${CLASH_MEANING[claim.meaning]}${surface}${hour}${recurrence(claim, 'opposition')}`;
        }
        case 'binding': {
            const [a, b] = claim.sides;
            /* A second bond of the same meaning right after the first: what a bond like this does has just been said, and one point is said once. */
            const alreadySaid = previous !== null && previous.kind === 'binding' && previous.meaning === claim.meaning;
            const meaning = claim.meaning === 'contest'
                ? 'BaZi reads a bond like this as pressure taken up rather than taken on. Your competitive streak absorbs some of the strain, so you tend to meet pressure as a contest.'
                : 'Tied like this, the two hold each other in place, and neither acts as freely as it would alone.';
            const other = introducesParts(previous);
            const opener = other ? 'Two other parts of your chart are bound together.' : 'Two parts of your chart are bound together.';
            return `${opener} ${whereSides(a, b)}`
                + `${alreadySaid ? ' It holds them in place in the same way.' : ` ${meaning}`}${hour}${recurrence(claim, 'bond')}`;
        }
        case 'pull': {
            const key = `${claim.controller.family}>${claim.controlled.family}`;
            const words = PULL[key];
            const base = words
                ? variant(`${key}|${claim.controller.phase}|${claim.controlled.phase}|${claim.controller.mainGod}|${claim.controlled.mainGod}|${claim.controller.weight.toFixed(2)}|${claim.controlled.weight.toFixed(2)}|${claim.restsOnHour}`, words[claim.margin])
                : (claim.margin === 'clear'
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
            return `${phase.charAt(0).toUpperCase()}${phase.slice(1)} turns up ${times} in your chart in the same form${where}. The tradition reads a doubling like this as a quality that turns on itself, pushing one way until it works against you. It is one of the tradition's disputed readings.${onHour}`;
        }
        case 'latent':
            return `Part of a larger pattern of ${P[claim.phase]} - ${FAMILY_GLOSS[claim.family]} - is present in your chart but incomplete. Read it as a pull that is there without being fully formed.${hour}${recurrence(claim, 'pattern')}`;
        case 'friction': {
            const [a, b] = claim.sides;
            const where = a && b ? `between ${POSITION[a.position]} and ${POSITION[b.position]}` : 'in your chart';
            return `A quieter friction runs ${where}. The tradition's reading of it is disputed, so it is noted rather than leaned on.${hour}${recurrence(claim, 'pattern')}`;
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
        Water: 'something concrete to work on: work that keeps circulating, like trade, exchange or ideas passed on',
        Wood: 'something concrete to work on: projects that grow',
        Fire: 'something concrete to work on: results you can see',
    })[phase],
    authority: (phase) => ({
        Metal: 'a standard to meet: discipline that prunes what is not needed',
        Water: 'a standard to meet: limits that keep your fire in proportion',
        Wood: 'a standard to meet: demands that keep you growing',
        Fire: 'a standard to meet: real tests that forge you',
        Earth: 'a standard to meet: firm limits that give your energy a course',
    })[phase],
};
/** The helper as the subject of "sits between ... and passes one into the other". */
const BRIDGE_SUBJECT = {
    companion: 'your own kind',
    output: 'an outlet for what you have',
    wealth: 'something concrete to work on',
    authority: 'a standard to meet',
    resource: 'what feeds you',
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
        return 'With so much of your own kind around you, sharing credit can feel like losing ground.';
    }
    /* Strong support under a quick, firm stem: the cost is views that harden, not waiting (the energy line has said the waiting once). */
    if (claim.band === 'ample' && claim.lead.family === 'resource') {
        if (claim.stem === 'geng') {
            return 'With so much support behind your views, they can set hard before they have been tested.';
        }
    }
    return COST[claim.band][claim.lead.family];
}
/**
 * Where the lead family stands, said as what that part of a life is in BaZi:
 * the year is the side others meet first, the month day-to-day effort, the day
 * the private centre, the hour aims and plans. A tendency, never an event.
 */
const COST_WHERE = {
    Year: (family) => `Most of ${FAMILY_GLOSS[family]} stands in the side of you others meet first, so it is often what they notice before the rest.`,
    Month: (family) => `Most of ${FAMILY_GLOSS[family]} stands in your day-to-day effort, so it tends to show in how you work and what you take on.`,
    Day: (family) => `Most of ${FAMILY_GLOSS[family]} stands in your private centre, so you tend to feel it close in and others see it less.`,
    Hour: (family) => `Most of ${FAMILY_GLOSS[family]} stands in your aims and plans, so it shapes where you are heading more than how you spend a day.`,
};
/** What the birth season adds to the cost when the chart has no firm tension to say how it shows. */
const COST_SEASON = {
    prosperous: 'Your birth season adds to your own element, so little in it slows this down.',
    aided: 'Your birth season feeds you, so this can run a long time before anything stops it.',
    resting: 'Your birth season draws on you as well, so the cost can build without much notice.',
    trapped: 'Your birth season asks you to work against the grain, so keeping up is part of the cost.',
    dead: 'Your birth season presses on you, so the cost tends to feel imposed rather than chosen.',
};
/** How the chart's first firm tension tends to cost: the failure side of what the tension section described. */
const COST_SHOWS = {
    'against-self': 'Where the chart presses on your core, strain can start to feel like your own standard rather than something put on you.',
    'skill-vs-pressure': 'The ease that helps you cope can also hide how much strain you are carrying.',
    'speech-vs-order': 'The pull between speaking out and keeping order may show as a challenge held back too long, or made with more edge than the moment needed.',
    'expression-vs-rules': 'The friction with rules often comes out as pushing against a standard and paying for it, or keeping to one while resenting it.',
    'intake-vs-expression': 'The check that learning puts on expression may mean knowing more than you say, and saying it late.',
    'work-vs-nourishment': 'With work crowding out what feeds you, you may end up running on what you already know because there is never time to refill.',
    'will-vs-holding': 'The pull between your will and holding on may show as keeping what you have in the name of independence, or sharing it only on your own terms.',
    /* Said per Day Master element: see INDEPENDENCE_SHOWS. */
    'independence-vs-structure': '',
    'same-kind': 'With two versions of one thing at odds, a decision can stay open because two of your habits keep reopening it.',
    'bound-authority': 'The tie to what holds you in check may show as carrying an obligation long after it stopped being yours.',
    'bound-wealth': 'The tie to what you tend may show as staying with it after it has stopped needing you.',
    contest: 'Taking pressure as a contest can turn a simple request into one you did not need to enter.',
    held: 'With two parts holding each other in place, each can end up waiting for the other to move first.',
};
/** What to do about that tension: the practice answers the tension, it does not repeat the cost. */
const ANSWER = {
    'against-self': 'Sort out which of the pressures on you are yours to answer, and set the rest down, so that strain stops passing for your own standard.',
    'skill-vs-pressure': 'Use your skill on purpose, and check now and then how much strain it is helping you carry, so that the ease does not hide the load.',
    'speech-vs-order': 'Say the challenge once, plainly, to the person who can act on it, rather than holding it back or letting it come out sharp.',
    'expression-vs-rules': 'Pick the one rule worth testing and test it openly, instead of wearing all of them down by habit.',
    'intake-vs-expression': 'Say something half-formed to one person before you have checked it twice, and let it be improved in the saying.',
    'work-vs-nourishment': 'Put study and rest in your week first, before the work fills it, and treat them as part of the work rather than a reward for finishing it.',
    'will-vs-holding': 'Decide beforehand what you will share and on what terms, so that sharing is not a fresh loss each time it comes up.',
    /* Said per Day Master element: see INDEPENDENCE_ANSWER. */
    'independence-vs-structure': '',
    'same-kind': 'When two habits argue, choose which one gets this decision and say why, so that the choice is yours and not whichever habit speaks first.',
    'bound-authority': 'Ask of each duty you carry whether it is yours or only came attached, and put down the ones that came attached.',
    'bound-wealth': 'Keep one thing for yourself that does not depend on what you tend, so that you stay yourself when it no longer needs you.',
    contest: 'Before you take something on as a contest, ask whether it needs to be one, and let it stay an ordinary request when it does not.',
    held: 'Of the two parts that hold each other in place, move one first, even slightly, rather than waiting for both to be ready, and see what the other does.',
};
/**
 * How independence meets structure shows differently in each Day Master: a
 * tree grows around a rule, a flame flares at it, the earth digs in, metal
 * judges its edge, water slips past it. The cost and the practice read the
 * same element, so the one answers the other.
 */
const STEM_PHASE = {
    jia: 'Wood', yi: 'Wood', bing: 'Fire', ding: 'Fire', wu: 'Earth', ji: 'Earth', geng: 'Metal', xin: 'Metal', ren: 'Water', gui: 'Water',
};
const INDEPENDENCE_SHOWS = {
    Wood: 'Your pushback against structure tends to be quiet: you grow around a rule rather than say you disagree, so the disagreement is never answered.',
    Fire: 'Your pushback against structure tends to flare: you answer a rule in the moment, and weigh its sense later, if at all.',
    Earth: "Your pushback against structure tends to be a refusal to shift: you dig in first and weigh the rule's sense afterwards.",
    Metal: 'Your pushback against structure tends to be exact: you judge a rule by its roughest edge and can reject all of it for one flaw.',
    Water: 'Your pushback against structure tends to go around: you find a way past a rule instead of facing it, so the rule is never tested.',
};
const INDEPENDENCE_ANSWER = {
    Wood: 'When you notice yourself growing around a rule, say where you disagree, and ask what the structure is protecting.',
    Fire: 'When a rule makes you flare, let the heat pass first, then ask what the structure is protecting before you answer.',
    Earth: 'When you notice yourself digging in, ask what the structure is protecting before you answer, and push back on that rather than on all of it.',
    Metal: 'When a rule has a flaw, name the flaw and keep the part that does its job, instead of rejecting all of it.',
    Water: 'When you catch yourself slipping past a rule, say once, plainly, where you disagree and what you would change.',
};
const COST = {
    thin: {
        output: 'In a chart that asks you to give out more than it refills, the depletion is gradual. There is never a moment you could point to, just a little less left each time.',
        wealth: 'In a chart that hands you more to manage than it gives you strength for, practical weight can quietly take over.',
        authority: 'In a chart this full of expectation, you can spend a long time meeting standards without asking whether they are yours.',
        resource: 'In a chart where support comes mostly through what you take in, you can keep preparing when the moment wants you to act.',
        companion: 'In a chart where your own kind is your main support, you can let others set your pace.',
    },
    even: {
        output: 'Because so much of you goes into giving out, it can become the only way you know to be useful.',
        wealth: 'Because so much of you goes into practical work, results can become the only measure you trust.',
        authority: 'Because so much pressure runs through your chart, you can take every demand as a test you have to pass.',
        resource: 'Because so much of your chart feeds you, you can keep taking in more than you ever put out, and ideas stay unfinished while the next source arrives.',
        /* The cooperative kind leading; a rivalrous lead, or one shared with the
           pressure on you, is worded in costSentence. */
        companion: 'With so much of your own kind around you, it is easy to stay among people who think the way you do, and to hear less from anyone who does not.',
    },
    ample: {
        output: 'With strength to spare, you can scatter a great deal of ability across too many things.',
        wealth: 'With strength to spare, you can chase results past the point where they are worth it.',
        authority: 'With strength to spare, you can take on every challenge as a matter of pride.',
        resource: 'With strength to spare and plenty feeding it, you can understand a situation thoroughly and still leave it to someone else to move first.',
        companion: 'With strength to spare and plenty of your own kind, your will can run over other people\'s without your meaning it to.',
    },
};
const STEM_MOVE = {
    jia: 'flex', yi: 'root', bing: 'limit', ding: 'share-load', wu: 'begin', ji: 'voice', geng: 'tool', xin: 'enough', ren: 'limit', gui: 'voice',
};
const LEAD_MOVE = {
    thin: {
        output: { tag: 'refill', text: 'Notice what refills you, and put it in the week before you give out again.' },
        wealth: { tag: 'drop', text: 'Hand one practical task on before it becomes permanently yours.' },
        authority: { tag: 'whose', text: 'Before you meet a standard, ask whose it is.' },
        resource: { tag: 'begin', text: 'Act before the preparation feels finished: the first step shows what more reading cannot.' },
        companion: { tag: 'voice', text: 'Say what pace you need before the group settles on one for you.' },
    },
    even: {
        output: { tag: 'receive', text: 'Let yourself be on the receiving end sometimes: ask for something, and take it without paying it back at once.' },
        wealth: { tag: 'beyond', text: 'Keep one thing in your life that has no result to show, such as rest, study or time with people.' },
        authority: { tag: 'select', text: 'Pick the few demands that deserve your full effort, and meet the rest without proving anything.' },
        resource: { tag: 'finish', text: 'Finish what you have started before you take in the next source, and show it to someone.' },
        companion: { tag: 'other', text: 'Seek out one person who sees things differently, and hear all of what they say.' },
    },
    ample: {
        output: { tag: 'limit', text: 'Choose one outlet and finish there, rather than starting in many places.' },
        wealth: { tag: 'limit', text: 'Set a limit on what you take on, and decide beforehand what counts as enough.' },
        authority: { tag: 'select', text: 'Choose which challenges are worth your pride, and let the others pass.' },
        resource: { tag: 'begin', text: 'Begin while some questions are still open: the first step usually tells you what more preparation cannot.' },
        companion: { tag: 'other', text: 'Ask for the other view before you decide, and let it change something.' },
    },
};
/** The answer to the lead-cost sentence the cost section actually said (the same special cases as costSentence). */
function leadMove(cost) {
    const pair = [cost.lead.family, cost.partner].sort().join('+');
    if (cost.band === 'even' && pair === 'authority+companion') {
        return { tag: 'win', text: 'Before you settle into a disagreement, ask what winning it would actually give you.' };
    }
    if (cost.band === 'even' && cost.lead.family === 'companion' && cost.lead.mainGod === 'Rob Wealth') {
        return { tag: 'credit', text: "Name other people's part out loud before you mention your own." };
    }
    if (cost.band === 'ample' && cost.lead.family === 'resource' && cost.stem === 'geng') {
        return { tag: 'test', text: 'Before a view settles, put it to someone who sees it differently.' };
    }
    return LEAD_MOVE[cost.band][cost.lead.family];
}
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
    weak: 'gives you less to draw on than it asks of you',
    'moderately-weak': 'gives you a little less to draw on than it asks of you',
    balanced: 'gives you about as much as it asks of you',
    'moderately-strong': 'gives you a little more than you need to spend',
    strong: 'gives you more than you need to spend',
    indeterminate: '',
};
/** How the verdict opens; chosen from the chart so five readings do not share one frame. */
const VERDICT_OPENING = ['The chart as a whole', 'Taken as a whole, your chart', 'Overall, your chart'];
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
        ? `Your birth time is not known, so this reading works from ${claim.characters === 6 ? 'six' : String(claim.characters)} of the chart's eight characters. BaZi gives two characters to each of the year, month, day and hour of birth. Without a time, the hour's pair cannot be worked out. The hour pillar is left out rather than guessed.${claim.dateBoundary
            ? ` Your birth date also falls on a change of solar ${claim.dateBoundary.year ? 'year and month' : 'month'} at about ${claim.dateBoundary.at}, so the month pillar is ${claim.dateBoundary.months.join(' before it and ')} after. The reading below uses the one in force at midday; if you were born ${claim.dateBoundary.at < '12:00' ? 'before' : 'after'} about ${claim.dateBoundary.at}, the season it starts from would be different.`
            : ''}`
        : 'Your birth time is your own estimate, so the hour pillar, the pair of characters for the hour of birth, is read as you gave it and held more loosely than the rest. Your core element and its season do not depend on it. Where a point does, the reading says so.'),
    nature: (claim) => {
        const stem = STEM[claim.stem];
        const opening = `BaZi reads your chart from one element at its centre: the element of the day you were born. Yours is ${stem.image}. ${stem.tendency}`;
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
        const verdict = claim.tendency === 'indeterminate'
            ? 'The chart does not settle whether it gives you more or less than it asks of you'
            : `${variant(`verdict|${claim.phase}|${claim.tendency}|${claim.band}`, VERDICT_OPENING)} ${VERDICT[claim.tendency]}`;
        const known = claim.precision === 'unknown' ? ` among the ${COUNT_WORD[claim.characters] ?? claim.characters} known characters` : '';
        /* The verdict is one sentence and what the chart holds of your own element
           is the next, so neither has to carry the other on a colon. */
        let own;
        if (claim.own === 'alone') {
            own = claim.companions < 0.05
                ? (claim.precision === 'unknown'
                    ? `There is no other ${phase}${known}, on the surface or hidden. Nothing of your own kind stands beside you there.`
                    : `There is no other ${phase} anywhere in it, on the surface or hidden. Nothing of your own kind stands beside you.`)
                : claim.companions < 0.5
                    ? `Apart from you, no ${phase} shows${known || ' on its surface'}, and only a trace is hidden underneath.`
                    : `Apart from you, no ${phase} shows${known || ' on its surface'}, though some is hidden underneath.`;
        }
        else if (claim.own === 'some') {
            own = {
                thin: `There is other ${phase} beside you, but more of the chart pulls away from you than holds you up.`,
                even: `There is other ${phase} beside you, and about as much of the chart ${drain}.`,
                ample: `There is other ${phase} beside you, and it holds you up well.`,
            }[claim.band];
        }
        else {
            own = {
                thin: `There is a good deal of ${phase} in it, yet more of the chart pulls away from you than holds you up.`,
                even: `There is a good deal of ${phase} in it besides you, but nearly as much ${drain}, so it comes out even rather than strong.`,
                ample: 'A good deal of it is your own element, and it holds you up well.',
            }[claim.band];
        }
        const meaning = {
            thin: {
                output: 'In practice, your energy goes furthest when something steady feeds it, and runs down when you keep giving without it.',
                wealth: 'In practice, you hold up best when something steady feeds you, and wear down when you keep carrying without it.',
                authority: 'In practice, you hold up best when something steady feeds you, and wear down when you keep meeting demands without it.',
            }[claim.heaviestDrain] ?? 'In practice, your energy goes furthest when something steady feeds it.',
            even: variant(`even|${claim.phase}|${claim.tendency}|${claim.companions.toFixed(1)}|${claim.heaviestDrain}`, [
                'That balance is useful but easily tipped. You have enough to meet what comes, and too much of any one pull can throw it.',
                'That balance is workable but easy to upset. You have enough to meet what comes, and a surge in any one pull can tip it.',
            ]),
            ample: variant(`ample|${claim.phase}|${claim.tendency}|${claim.companions.toFixed(1)}|${claim.heaviestDrain}`, [
                'In practice, strength like this needs an outlet, and restlessness is the sign it has none.',
                'In practice, strength like this wants somewhere to go, and restlessness is how it shows when it has none.',
                'In practice, strength like this works best when it is spent, and restlessness suggests it is not.',
            ]),
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
                ? (claim.precision === 'approximate'
                    ? 'The result is not close to the line between two readings, even counting the hour you estimated.'
                    : 'The result is not close to the line between two readings, so the verdict itself is firm.')
                : `${claim.nearLine
                    ? `It sits close to the line where the chart would read as ${NEAR_LINE[claim.nearLine]}.`
                    : 'It sits close to the line between two readings.'} ${variant(`leaning|${claim.phase}|${claim.tendency}`, [
                    'Treat it as a leaning rather than a firm verdict.',
                    'Take it as a tendency, not a conclusion.',
                    'Hold it loosely: a small change in the chart could move it.',
                ])}${claim.precision === 'approximate' ? ' That count includes the hour you estimated.' : ''}`;
        return `${verdict}. ${own} ${meaning} ${confidence}`;
    },
    lead: (claim) => {
        const { lead, second } = claim;
        /* Three steps of closeness, so a small move in weight changes a word, not the frame. */
        /* Two leads: the two themes first, then which element carries each. */
        const carriers = second
            ? ` ${capitalise(CARRIER_CLAUSE[lead.family](lead.phase))}; ${CARRIER_CLAUSE[second.family](second.phase)}.` : '';
        const opening = second
            ? (claim.closeness === 'close'
                ? `Two things lead your chart: ${THEME[lead.family]}, and close behind it, ${THEME[second.family]}.${carriers}`
                : `Two things weigh ${claim.closeness === 'tie' ? 'equally' : 'almost equally'} in your chart: ${THEME[lead.family]} and ${THEME[second.family]}.${carriers}`)
            : `More of your chart is about ${THEME[lead.family]} than about anything else: ${CARRIER[lead.family](lead.phase)}.`;
        const parts = [opening, kinds(lead), variant(`lead|${lead.phase}|${lead.mainGod}|${lead.weight.toFixed(1)}`, BAND_LEAD[claim.band][lead.family].split('|'))];
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
                ? 'The chart is evenly split between the outward and the inward, and your own centre is the yielding kind. You can push or wait, and waiting comes more naturally.'
                : 'The chart is evenly split between the outward and the inward, and your own centre is the forward kind. You can push or wait, and pushing comes more naturally.',
            yang: yin
                ? 'Your centre is the inward, yielding kind, but the chart around it leans outward. Much of your pace is set by the push around you rather than by your own.'
                : 'Both you and the rest of your chart lean outward: you tend to meet things head-on and to move first.',
            yin: yin
                ? 'Both you and the rest of your chart lean inward. You take things in before acting, and you get where you are going by persistence rather than force.'
                : 'Your centre is the forward kind, set in a chart that leans inward. You have more push than your surroundings invite, and you often hold it until the moment is right.',
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
            parts.push(`${opening}. In your chart, ${BRIDGE_SUBJECT[primary.family]} sits between ${BRIDGE_SIDE[from]} and ${BRIDGE_SIDE[to]}, and passes one into the other, so the two stop grinding against each other. ${capitalise(presence(primary.weight, claim.partial).replace(/^and /, '').replace(/ of it$/, ' of this'))}.`);
        }
        else {
            parts.push(`${opening}. ${capitalise(presence(primary.weight, claim.partial).replace(/^and /, ''))}${lacking ? `, ${variant(`lacking|${primary.family}|${primary.phase}`, [
                'so it has to be arranged on purpose rather than waited for',
                'so it may not turn up unprompted, and you may need to set it up',
                'so it is something to go looking for, not something to expect',
            ])}` : ''}.`);
        }
        const second = claim.secondary;
        if (second) {
            const text = HELPER[second.family](second.phase);
            parts.push(second.weight < 0.5
                ? `What the ${claim.partial ? 'known ' : ''}chart lacks${lacking ? ' as well' : ''} is ${text}.`
                : `After that comes ${text}, and your chart ${second.weight >= 1 ? 'already carries some of that' : 'carries a little of that already'}.`);
        }
        return parts.join(' ');
    },
    cost: (claim) => {
        const second = costSentence(claim);
        /* The Day Master's own cost, then what the lead family costs and where it
           stands, then either how the chart's first tension shows or, with none,
           what the birth season adds. */
        return [
            STEM[claim.stem].cost,
            claim.band === 'ample' ? `At the same time, ${second.charAt(0).toLowerCase()}${second.slice(1)}` : second,
            claim.leadAt ? COST_WHERE[claim.leadAt](claim.lead.family) : '',
            claim.topic === 'independence-vs-structure'
                ? [INDEPENDENCE_SHOWS[STEM_PHASE[claim.stem]], claim.state ? COST_SEASON[claim.state] : ''].filter(Boolean).join(' ')
                : claim.topic ? COST_SHOWS[claim.topic] : claim.state ? COST_SEASON[claim.state] : '',
        ].filter(Boolean).join(' ');
    },
    practice: (claim, cost) => {
        const lead = leadMove(cost);
        /* In the cost's order: the Day Master's own line, what the lead family
           costs, then the first firm tension. A chart with no firm tension has
           only the first two to answer. */
        return [
            STEM_MOVE[claim.stem] === lead.tag ? '' : STEM[claim.stem].practice,
            lead.text,
            claim.answers
                ? (claim.answers === 'independence-vs-structure' ? INDEPENDENCE_ANSWER[claim.dayMasterPhase] : ANSWER[claim.answers])
                : '',
        ].filter(Boolean).join(' ');
    },
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
