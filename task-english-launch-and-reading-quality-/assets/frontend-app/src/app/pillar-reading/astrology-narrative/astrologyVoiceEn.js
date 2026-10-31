import { degreeText, involves, otherEnd, } from './astrologyInterpretation.js';
import { capitalise, listWords, spanAtMoment } from './astrologyVoice.js';
const SIGN = {
    Aries: {
        style: 'moving first and meeting things head-on',
        styleMore: 'It tends to show as quick starts, a taste for challenge and impatience with waiting.',
        drive: 'a challenge to meet and something to start',
        driveMore: 'You tend to come alive at the beginning of things, when a move is needed and nobody has made it yet.',
        settle: 'being able to act on a feeling straight away',
        settleMore: 'Feelings tend to arrive fast and want an outlet; sitting on them is harder than acting on them.',
        surface: 'direct, quick and ready to act',
        surfaceMore: 'It tends to read as someone who has already started, before anything more considered has had time to show.',
        mind: 'be quick and decisive: you reach a view fast and would rather test it than keep weighing it',
        act: 'act at once and head-on; momentum comes easily, and staying with something already under way takes more effort',
        relate: 'be direct and warm, and you want the same frankness back',
        closeness: 'when feelings can be said straight away rather than managed',
        pull: 'acting straight away',
        overuse: 'the drive to start turns into impatience with everything that comes after the start',
        practice: 'to decide early who or what carries a thing once the beginning is done',
        moonOveruse: 'feelings get acted on before they are understood',
        moonPractice: 'to give a strong feeling a few minutes before acting on it',
    },
    Taurus: {
        style: 'building steadily and holding on to what works',
        styleMore: 'It tends to show as patience, loyalty to what has proved itself and a steady, unhurried pace.',
        drive: 'something solid to build and the time to build it properly',
        driveMore: 'You tend to trust what lasts, and you would rather make something slowly and well than quickly and twice.',
        settle: 'routine, comfort and things that stay where they are',
        settleMore: 'Security tends to come from the familiar: enough time, steady routines, a place that stays the same.',
        surface: 'calm, steady and unhurried',
        surfaceMore: 'It tends to read as someone who will not be rushed.',
        mind: 'be deliberate: slow to change its mind, and thorough once it has',
        act: 'act slowly and keep going; once something is under way, endurance matters more than speed',
        relate: 'show care through reliability and presence, and you value what can be counted on',
        closeness: 'when it is steady and unhurried, with routines you share',
        pull: 'keeping things steady',
        overuse: 'steadiness turns into holding a position long after the reason for it has gone',
        practice: 'to review a settled decision on a date you set in advance, so change arrives as a choice rather than a threat',
        moonOveruse: 'comfort becomes a way of not noticing that something needs to change',
        moonPractice: 'to notice when a routine has turned from support into avoidance',
    },
    Gemini: {
        style: 'curiosity, connection and keeping several threads going at once',
        styleMore: 'It tends to show as quick connections, many interests and an ear for whatever is new.',
        drive: 'variety, information and ideas to exchange',
        driveMore: 'You tend to come alive when there is something new to understand and someone to talk it through with.',
        settle: 'conversation and something new to think about',
        settleMore: 'Putting a feeling into words is often how it settles; being cut off from contact unsettles more than it looks.',
        surface: 'curious, quick and talkative',
        surfaceMore: 'It tends to read as someone already asking the next question.',
        mind: 'be quick and associative: it connects things fast and can hold several lines of thought at once',
        act: 'act through words and ideas, and you work best on several things at once rather than one at a time',
        relate: 'need conversation and lightness; staying interesting to each other matters as much as being close',
        closeness: 'when there is plenty of talk and some room to move',
        pull: 'following your curiosity',
        overuse: 'range becomes a way of never going deep enough on any one thing to be tested by it',
        practice: 'to decide when a thing counts as finished, so that curiosity\'s range turns into something usable',
        moonOveruse: 'talking about a feeling takes the place of feeling it',
        moonPractice: 'to let a feeling be felt before it is explained',
    },
    Cancer: {
        style: 'protecting, caring for and holding together what matters',
        styleMore: 'It tends to show as protectiveness, a long memory for how things felt and care for whatever is yours.',
        drive: 'security and people to look after',
        driveMore: 'You tend to be at your best when you are looking after something (a person, a place, a project) and making it safe to grow.',
        settle: 'closeness and a safe place to come back to',
        settleMore: 'Belonging is what steadies you; feeling shut out or unsafe tends to unsettle everything else.',
        surface: 'caring, careful and protective',
        surfaceMore: 'It tends to carry some reserve, and the protectiveness opens up with trust.',
        mind: 'follow feeling and memory: you remember how things were said, and you read the mood before the argument',
        act: 'act indirectly and protectively, and most forcefully on behalf of someone or something you care for',
        relate: 'give care and protection, and you need to feel that what you build together is safe',
        closeness: 'when the relationship is reliable and warm, and when leaving and coming back are both easy',
        pull: 'keeping the people you care about close and safe',
        overuse: 'care turns into holding on, keeping things as they are because change feels like a threat',
        practice: 'to let the people you care about take their own risks',
        moonOveruse: 'your own hurt can end up waiting behind looking after everyone else',
        moonPractice: 'to say what you need directly, rather than looking after others and hoping they notice',
    },
    Leo: {
        style: 'warmth, pride and putting yourself fully into what you do',
        styleMore: 'It tends to show as generosity, pride in what you make and a wish to do things wholeheartedly.',
        drive: 'creative expression and something to put your whole heart into',
        driveMore: 'You tend to come alive when what you do is recognisably yours and done wholeheartedly.',
        settle: 'warmth and knowing that you matter to the people you care about',
        settleMore: 'Feeling appreciated is what steadies you; being overlooked tends to sting more than open disagreement.',
        surface: 'warm, confident and easy to notice',
        surfaceMore: 'It tends to read as someone who fills a room without trying to.',
        mind: 'be confident and expressive: you like to present an idea whole, with conviction behind it',
        act: 'act boldly and wholeheartedly, and you put the most into what you can be proud of',
        relate: 'be generous and demonstrative, and you want affection to be shown, not assumed',
        closeness: 'when affection is shown openly and often',
        pull: 'being seen and appreciated',
        overuse: 'pride makes it hard to hear criticism or to step back when the moment belongs to someone else',
        practice: 'to make as much room for other people\'s moments as for your own',
        moonOveruse: 'the need to be appreciated can quietly decide what you do',
        moonPractice: 'to ask for appreciation openly, rather than working harder until someone notices',
    },
    Virgo: {
        style: 'noticing what could work better and doing the careful work of making it so',
        styleMore: 'It tends to show as an eye for the detail that does not fit, patience with slow, exact work and a preference for improving things over admiring them.',
        drive: 'competence, usefulness and getting things right',
        driveMore: 'You tend to come alive when a task has a right answer and the standard is yours to meet.',
        settle: 'order, usefulness and a problem you can actually solve',
        settleMore: 'Putting something in order outside tends to steady things inside; a feeling with nothing to be done about it is harder to sit with.',
        surface: 'modest, precise and observant',
        surfaceMore: 'It tends to read as someone taking in the details before saying much.',
        mind: 'be exact and analytical: it notices the detail that does not fit and wants to fix it',
        act: 'act efficiently rather than forcefully, putting effort precisely where it makes the difference',
        relate: 'show care through attention and practical help: the thing noticed, the problem solved before it was mentioned',
        closeness: 'when care is practical and nobody has to guess what is needed',
        pull: 'getting something exactly right',
        overuse: 'the eye for what could be better turns inward and never finds anything good enough',
        practice: 'to decide what "good enough" means before you start, rather than judging it at the end',
        moonOveruse: 'distress gets turned into a task list, so the feeling itself is never attended to',
        moonPractice: 'to name what you feel before you start fixing anything',
    },
    Libra: {
        style: 'balance, fairness and weighing every side before choosing',
        styleMore: 'It tends to show as tact, a sense of proportion and a habit of seeing the other side quickly.',
        drive: 'fairness, harmony and a good partnership',
        driveMore: 'You tend to come alive when things are fair and in proportion, and when there is someone to think them through with.',
        settle: 'harmony, fairness and someone to talk things through with',
        settleMore: 'An unresolved disagreement tends to unsettle you until it is repaired; peace around you and peace inside you are closely linked.',
        surface: 'pleasant, considered and diplomatic',
        surfaceMore: 'It tends to read as someone weighing how things will land.',
        mind: 'weigh both sides: you see the other view quickly, and deciding can take longer than understanding',
        act: 'act through negotiation and persuasion rather than confrontation, looking for the fair move',
        relate: 'value partnership, fairness and grace, and you work to keep things in balance',
        closeness: 'when disagreements are talked through and resolved rather than left',
        pull: 'keeping the peace',
        overuse: 'weighing every side becomes a way of never choosing one',
        practice: 'to give a decision a deadline and keep it',
        moonOveruse: 'the wish for harmony leaves your own preference unsaid until it can no longer be held',
        moonPractice: 'to state your own preference first, before adjusting to everyone else\'s',
    },
    Scorpio: {
        style: 'depth, intensity and getting to the bottom of things',
        styleMore: 'It tends to show as focus, loyalty and a refusal to settle for the surface of anything.',
        drive: 'depth, truth and something worth committing to completely',
        driveMore: 'You tend to come alive when something matters enough to give yourself to, and you can see beneath its surface.',
        settle: 'trust, privacy and closeness that is real rather than polite',
        settleMore: 'Trust is what steadies you, and you give it slowly; contact that stays on the surface tends to leave you more guarded, not less.',
        surface: 'reserved, watchful and intense',
        surfaceMore: 'It tends to read as someone noticing more than they say.',
        mind: 'probe: it looks for what is hidden or unsaid and does not let go of a question easily',
        act: 'act with focus and staying power, and you commit fully once you decide something matters',
        relate: 'want depth and loyalty, and you give yourself fully once trust is there',
        closeness: 'when it is honest and private, and when trust is built step by step',
        pull: 'going deep and keeping control',
        overuse: 'intensity turns into control, holding on to positions or grievances long after they have stopped serving you',
        practice: 'to say out loud what you are guarding, so trust does not have to be tested before it is given',
        moonOveruse: 'hurt goes underground and turns into distrust',
        moonPractice: 'to name a hurt while it is still small',
    },
    Sagittarius: {
        style: 'meaning, freedom and looking further than the situation in front of you',
        styleMore: 'It tends to show as optimism, frankness and a need for something worth aiming at.',
        drive: 'meaning, freedom and a wider horizon',
        driveMore: 'You tend to come alive when there is something larger to understand or a direction worth heading in.',
        settle: 'freedom, optimism and something to look forward to',
        settleMore: 'Room to move and a sense of where things are going steady you; feeling fenced in tends to unsettle you quickly.',
        surface: 'open, enthusiastic and frank',
        surfaceMore: 'It tends to read as someone already looking toward what comes next.',
        mind: 'look for the big picture and the meaning behind the detail, and it works best when it can range widely',
        act: 'act with enthusiasm and a sense of direction, and you move fastest toward something that means something to you',
        relate: 'be warm, frank and generous, and you need room to keep growing inside a relationship',
        closeness: 'when closeness leaves room for independence and for plans you share',
        pull: 'keeping your freedom',
        overuse: 'the search for something bigger makes the present commitment feel smaller than it is',
        practice: 'to connect the everyday task to the larger purpose it serves, so it stops feeling like a detour',
        moonOveruse: 'restlessness takes over whenever a feeling asks you to stay put',
        moonPractice: 'to stay with an uncomfortable feeling a little longer before looking for the exit',
    },
    Capricorn: {
        style: 'responsibility, long-term planning and building something that lasts',
        styleMore: 'It tends to show as discipline, patience with long projects and a strong sense of responsibility.',
        drive: 'achievement and a long-term structure to build',
        driveMore: 'You tend to come alive when there is a real goal, a clear responsibility and a long way still to go.',
        settle: 'structure, reliability and knowing where you stand',
        settleMore: 'Having things in hand and knowing what is expected steadies you; not knowing where you stand tends to unsettle you.',
        surface: 'composed, serious and capable',
        surfaceMore: 'The warmth tends to appear once trust is there.',
        mind: 'be practical and strategic: it plans in stages and asks what will actually work',
        act: 'act with discipline and patience, working steadily toward goals with a long horizon',
        relate: 'show care through reliability and commitment, and you take what you build together seriously',
        closeness: 'when it is dependable and commitments are kept',
        pull: 'getting the job done properly',
        overuse: 'the drive to achieve has no natural stopping point, and the next target arrives before the last one has been enjoyed',
        practice: 'to build some reward into the work itself rather than postponing it until everything is finished',
        moonOveruse: 'feelings get managed rather than felt',
        moonPractice: 'to allow a feeling that has no use and no solution',
    },
    Aquarius: {
        style: 'independence, principle and looking for a better way of doing things',
        styleMore: 'It tends to show as independence, a strong sense of principle and a habit of questioning how things are usually done.',
        drive: 'independence and a better way of doing things',
        driveMore: 'You tend to come alive when you can think for yourself and improve how something works for everyone involved.',
        settle: 'space, independence and friendship that does not crowd you',
        settleMore: 'Room to be yourself steadies you; closeness that asks you to give up your independence tends to unsettle you.',
        surface: 'friendly, independent and hard to predict',
        surfaceMore: 'It tends to read as someone following their own line, with some distance.',
        mind: 'be independent and systematic: it questions the usual assumptions and looks for the principle behind them',
        act: 'act on principle and in your own way, and resistance tends to make you more determined rather than less',
        relate: 'value friendship, honesty and space, and you need to stay yourself inside a relationship',
        closeness: 'when it includes friendship and plenty of room',
        pull: 'keeping your independence',
        overuse: 'detachment keeps a person who matters at the same distance as an abstract question',
        practice: 'to let one person, specifically, matter more than the principle',
        moonOveruse: 'distance becomes the default whenever closeness gets complicated',
        moonPractice: 'to tell someone close what you need before you pull back',
    },
    Pisces: {
        style: 'sensitivity, imagination and taking in more than is said',
        styleMore: 'It tends to show as empathy, imagination and a quick sense of the mood in a room.',
        drive: 'meaning, imagination and a sense of connection to something larger',
        driveMore: 'You tend to come alive when something moves you and your imagination has room to work.',
        settle: 'calm, quiet and time to let feelings settle on their own',
        settleMore: 'Time alone to absorb what you have taken in steadies you; noise and hard edges tend to wear on you quickly.',
        surface: 'gentle, receptive and hard to pin down',
        surfaceMore: 'It tends to read as someone taking in the mood before saying much.',
        mind: 'be intuitive and imaginative: it grasps the whole before it can explain the parts',
        act: 'act through influence and persistence rather than force, and you work best when something inspires you',
        relate: 'be compassionate and devoted, and you need tenderness in return',
        closeness: 'when it is gentle and there is time to withdraw and come back',
        pull: 'following your intuition',
        overuse: 'openness takes in so much of the mood around you that your own becomes hard to find',
        practice: 'to set clear limits on what you take on, so compassion does not turn into overwhelm',
        moonOveruse: 'other people\'s moods crowd out your own',
        moonPractice: 'to take time alone to sort your own feelings from the ones you picked up',
    },
};
/** A stable choice among phrasings: the same chart always reads the same, and two charts rarely read alike. */
const pick = (variants, seed) => variants[Math.abs(Math.trunc(seed)) % variants.length];
const SIGN_ORDER = Object.keys(SIGN);
const signIndex = (sign) => SIGN_ORDER.indexOf(sign);
const withArticle = (word) => `${/^[aeiou]/.test(word) ? 'an' : 'a'} ${word}`;
const NAME = {
    Sun: 'the Sun', Moon: 'the Moon', Mercury: 'Mercury', Venus: 'Venus', Mars: 'Mars', Jupiter: 'Jupiter',
    Saturn: 'Saturn', Uranus: 'Uranus', Neptune: 'Neptune', Pluto: 'Pluto',
    'North Node': 'the North Node', 'South Node': 'the South Node',
};
const name = (point) => NAME[point];
const Name = (point) => capitalise(NAME[point]);
/** What each part of a chart stands for, in the object form a sentence can carry. */
const FUNCTION = {
    Sun: 'your sense of purpose',
    Moon: 'your emotional life',
    Mercury: 'your thinking',
    Venus: 'the way you relate',
    Mars: 'the way you act',
    Jupiter: 'your sense of possibility',
    Saturn: 'your sense of responsibility',
    Uranus: 'your need for independence',
    Neptune: 'your imagination',
    Pluto: 'your intensity',
    'North Node': 'your sense of direction',
    'South Node': 'what comes easily',
};
/** What a planet adds when it meets another at a hard angle. */
const HARD_EFFECT = {
    Sun: 'pressure to prove yourself',
    Moon: 'mood and quick reactions',
    Mercury: 'second-guessing',
    Venus: 'a pull toward comfort and approval',
    Mars: 'urgency and friction',
    Jupiter: 'excess and overpromising',
    Saturn: 'caution and self-criticism',
    Uranus: 'restlessness and sudden changes of direction',
    Neptune: 'doubt and idealism',
    Pluto: 'intensity and a need for control',
    'North Node': 'a pull toward the unfamiliar',
    'South Node': 'a pull toward the familiar',
};
/** What a planet lends when it meets another easily. */
const SOFT_EFFECT = {
    Sun: 'purpose',
    Moon: 'feeling',
    Mercury: 'clarity',
    Venus: 'warmth and grace',
    Mars: 'energy',
    Jupiter: 'confidence and range',
    Saturn: 'steadiness and discipline',
    Uranus: 'originality',
    Neptune: 'imagination and a sense of something larger',
    Pluto: 'depth and staying power',
    'North Node': 'direction',
    'South Node': 'ease',
};
const ELEMENT_WORD = { Fire: 'fire', Earth: 'earth', Air: 'air', Water: 'water' };
const ELEMENT_THEME = {
    Fire: 'energy, initiative and enthusiasm',
    Earth: 'practicality, patience and results you can see',
    Air: 'ideas, conversation and perspective',
    Water: 'feeling, intuition and emotional depth',
};
const ELEMENT_OVERUSE = {
    Fire: 'enthusiasm outruns follow-through',
    Earth: 'practicality dismisses whatever cannot be measured',
    Air: 'thinking about a feeling stands in for having it',
    Water: 'feeling floods judgement',
};
const ELEMENT_PRACTICE = {
    Fire: 'to pace the start so there is something left for the finish',
    Earth: 'to leave room for what cannot be planned or proved',
    Air: 'to notice a feeling before explaining it',
    Water: 'to give a feeling time before acting on it',
};
const MODALITY_WORD = { Cardinal: 'cardinal', Fixed: 'fixed', Mutable: 'mutable' };
const MODALITY_THEME = {
    Cardinal: 'initiating and setting things in motion',
    Fixed: 'holding a course and seeing it through',
    Mutable: 'adapting and keeping options open',
};
const MODALITY_RESPONSE = {
    Cardinal: 'acting on it rather than waiting',
    Fixed: 'holding on rather than giving way',
    Mutable: 'adjusting around it rather than meeting it head-on',
};
const MODALITY_OVERUSE = {
    Cardinal: 'starting more than can be carried',
    Fixed: 'holding on after something has stopped working',
    Mutable: 'keeping options open so long that nothing gets decided',
};
const MODALITY_PRACTICE = {
    Cardinal: 'to finish one thing before starting the next',
    Fixed: 'to set a point at which a commitment gets reviewed',
    Mutable: 'to decide in advance when something counts as finished',
};
/** Whole Sign houses, as the part of life each stands for. */
const HOUSE_AREA = {
    1: 'your own presence and the way you meet the world',
    2: 'resources and what you value',
    3: 'learning, communication and your immediate surroundings',
    4: 'home, roots and your private base',
    5: 'creativity, pleasure and self-expression',
    6: 'daily work and routines',
    7: 'close partnerships',
    8: 'shared resources, intimacy and what stays hidden',
    9: 'beliefs, study and wider horizons',
    10: 'public life and the direction you take in the world',
    11: 'friendships, groups and shared goals',
    12: 'solitude and what happens out of view',
};
const HOUSE_ORDINAL = {
    1: 'first', 2: 'second', 3: 'third', 4: 'fourth', 5: 'fifth', 6: 'sixth',
    7: 'seventh', 8: 'eighth', 9: 'ninth', 10: 'tenth', 11: 'eleventh', 12: 'twelfth',
};
/*
 * A LUMINARY'S HOUSE, AS WHAT IT CHANGES about the drive or the need it holds -
 * the arena, never an event in it. Completes `..., so ...`.
 */
const SUN_HOUSE = {
    1: 'what drives you tends to show directly in how you carry yourself',
    2: 'that drive tends to go into building something solid of your own',
    3: 'that drive tends to run on curiosity and on talking things through',
    4: 'that drive tends to be spent on a private base more than on public standing',
    5: 'that drive tends to need something to make or enjoy',
    6: 'that drive tends to show in daily work and in being useful',
    7: 'that drive tends to come alive in partnership, alongside another person',
    8: 'that drive tends to go deep rather than wide',
    9: 'that drive tends to look for meaning and a bigger picture',
    10: 'that drive tends to care about being seen for what you do and where it leads',
    11: 'that drive tends to work best among other people and for something shared',
    12: 'that drive tends to work quietly and out of view',
};
const MOON_HOUSE = {
    1: 'feelings tend to show on the surface, often before you have named them',
    2: 'feeling settled is closely tied to having something solid of your own',
    3: 'talking things through and staying in touch with what is near tends to steady you',
    4: 'home and a private base matter a great deal to how settled you feel',
    5: 'play and self-expression are part of how you recover',
    6: 'a working routine tends to steady you, and disorder in it tends to unsettle you',
    7: 'how you feel is closely tuned to the person you are closest to',
    8: 'feelings run deep and are shared only where trust is high',
    9: 'room to learn, explore and see further tends to settle you',
    10: 'how settled you feel is closely tied to where you stand and where you are heading',
    11: 'belonging to a group or a shared aim tends to steady you',
    12: 'feelings are often worked through later, and in private',
};
const ANGLE_PHRASE = {
    Ascendant: 'right on the rising point',
    Midheaven: 'right at the highest point of the chart',
    Descendant: 'right on the setting point, opposite the rising one',
    'Imum Coeli': 'right at the lowest point of the chart',
};
const COUNT_WORD = ['None', 'One', 'Two', 'Three', 'Four', 'Five', 'Six', 'Seven', 'Eight', 'Nine', 'Ten'];
const count = (value) => COUNT_WORD[value] ?? String(value);
const and = (items) => listWords(items, 'and');
const HARD_CONJUNCTION = new Set(['Saturn', 'Mars', 'Pluto', 'Uranus']);
/**
 * One aspect, said as what it does to the planet it is read from. The pair is
 * never looked up; the sentence is composed from what each end stands for and
 * how they meet, so the same template reads true for every pair.
 */
function link(aspect, from) {
    const other = otherEnd(aspect, from);
    const subject = Name(from);
    switch (aspect.kind) {
        case 'conjunction':
            return HARD_CONJUNCTION.has(other)
                ? `${subject} sits very close to ${name(other)}, which tends to add ${HARD_EFFECT[other]} to ${FUNCTION[from]}.`
                : `${subject} sits very close to ${name(other)}, so ${FUNCTION[from]} and ${FUNCTION[other]} tend to work as one.`;
        case 'opposition':
            /* Venus is read in its own section after Mercury and Mars, so its opposition is said another way. */
            return from === 'Venus'
                ? `${subject} stands opposite ${name(other)}, so ${FUNCTION[from]} and ${FUNCTION[other]} tend to take turns rather than arrive together.`
                : `${subject} stands opposite ${name(other)}, so ${FUNCTION[from]} and ${FUNCTION[other]} tend to alternate rather than work together.`;
        case 'square':
            return `${subject} is at odds with ${name(other)}, which tends to add ${HARD_EFFECT[other]} to ${FUNCTION[from]}.`;
        case 'trine':
            return `${subject} works easily with ${name(other)}, which tends to bring ${SOFT_EFFECT[other]} into ${FUNCTION[from]}.`;
        default:
            return `${subject} has a helpful link to ${name(other)}. Used on purpose, that link can bring ${SOFT_EFFECT[other]} into ${FUNCTION[from]}.`;
    }
}
/** How a knot member meets its centre. */
function knotVerb(aspect, plural) {
    switch (aspect.kind) {
        case 'conjunction': return plural ? 'sit right beside it' : 'sits right beside it';
        case 'opposition': return plural ? 'stand opposite it' : 'stands opposite it';
        case 'square': return plural ? 'pull against it' : 'pulls against it';
        case 'trine': return plural ? 'support it easily' : 'supports it easily';
        default: return plural ? 'help it along' : 'helps it along';
    }
}
/** The members of a knot, one clause per kind of link, so two planets that both stand opposite are said once. */
function knotClauses(links, center) {
    const groups = [];
    for (const entry of links) {
        const group = groups.find((one) => one.aspect.kind === entry.kind);
        if (group)
            group.points.push(otherEnd(entry, center));
        else
            groups.push({ aspect: entry, points: [otherEnd(entry, center)] });
    }
    return and(groups.map((group) => `${and(group.points.map(Name))} ${knotVerb(group.aspect, group.points.length > 1)}`));
}
/** The three modes in plain words, said once where a mode is first named. */
const MODALITY_KIND = {
    Cardinal: 'the ones that start things',
    Fixed: 'the ones that dig in',
    Mutable: 'the ones that adapt',
};
const DIGNITY_LINE = {
    Mercury: {
        Domicile: () => 'Mercury is in its own sign there, so this way of thinking comes naturally and with confidence.',
        Exaltation: (sign) => `The tradition counts ${sign} as especially favourable to Mercury, and reads it as thinking at its sharpest.`,
        Detriment: () => 'That is the sign opposite Mercury\'s own, so putting this kind of thinking into clear words may take extra effort, even when it looks easy from outside.',
        Fall: (sign) => `The tradition counts ${sign} as a hard fit for Mercury, and reads it as thinking that has to work harder for the same clarity.`,
    },
    Venus: {
        Domicile: () => 'Venus is in its own sign there, so affection comes easily and on its own terms.',
        Exaltation: (sign) => `The tradition counts ${sign} as especially favourable to Venus, and reads it as affection at its most generous.`,
        Detriment: () => 'That is the sign opposite Venus\'s own, which the tradition reads as affection working through an unfamiliar style.',
        Fall: (sign) => `The tradition counts ${sign} as a hard fit for Venus, and reads it as affection that takes more effort to express freely.`,
    },
    Mars: {
        Domicile: () => 'Mars is in its own sign there, so drive comes directly and strongly.',
        Exaltation: (sign) => `The tradition counts ${sign} as especially favourable to Mars, and reads it as drive at its most disciplined.`,
        Detriment: () => 'That is the sign opposite Mars\'s own, so drive tends to come out more slowly or more indirectly than it is felt.',
        Fall: (sign) => `The tradition counts ${sign} as a hard fit for Mars, and reads it as drive that takes more effort to direct.`,
    },
};
/** One word for what an element leans on, where a sentence has room for only one. */
const ELEMENT_SHORT = {
    Fire: 'initiative', Earth: 'practicality', Air: 'ideas', Water: 'feeling',
};
/** What a Venus in each element tends to give. */
const ELEMENT_GIVE = {
    Fire: 'enthusiasm and warmth',
    Earth: 'reliability and practical care',
    Air: 'conversation and lightness',
    Water: 'tenderness and attunement',
};
/** What a Moon in each element tends to ask for. */
const ELEMENT_NEED = {
    Fire: 'warmth and attention',
    Earth: 'steadiness and practical care',
    Air: 'conversation and space',
    Water: 'emotional closeness',
};
/*
 * HOW A SUN-MOON DIFFERENCE FEELS FROM THE INSIDE, by the Sun's element and
 * then the Moon's - the four pairs the tradition reads as friction, each in
 * the direction this chart has it. Each describes two parts of one person,
 * never anyone else's reaction.
 */
const FRICTION = {
    'Fire|Earth': 'What drives you wants to move now, and what settles you wants it done properly, so each can feel like a brake on the other.',
    'Earth|Fire': 'What drives you wants it done properly, and what settles you wants to move now, so each can feel like a brake on the other.',
    'Fire|Water': 'What drives you wants to act, and what settles you wants to feel its way first, so each can seem too much or too slow to the other.',
    'Water|Fire': 'What drives you wants to feel its way first, and what settles you wants to act, so each can seem too slow or too much to the other.',
    'Air|Earth': 'What drives you wants to talk it through first, and what settles you wants something concrete, so each can feel like a delay to the other.',
    'Earth|Air': 'What drives you wants something concrete, and what settles you wants it talked through first, so each can feel like a delay to the other.',
    'Air|Water': 'What drives you wants room to think, and what settles you wants closeness and feeling, so each can seem cold or overwhelming to the other.',
    'Water|Air': 'What drives you wants closeness and feeling, and what settles you wants things talked through with room to think, so each can seem overwhelming or cold to the other.',
};
const frictionLine = (sun, moon) => FRICTION[`${sun}|${moon}`];
/* The last step of the give-and-need line, by the Moon's element: how the need
   is best made known. */
const SAY_WHICH = {
    Fire: 'It helps to ask openly for the one you need at a given moment.',
    Earth: 'It helps to name, in plain terms, which one you need at a given moment.',
    Air: 'It helps to put into words which one you need at a given moment.',
    Water: 'It helps to let the people close to you know which one you need, even when it feels obvious.',
};
const MOON_DIGNITY = {
    Domicile: (_sign, house) => (house === 12
        ? 'The Moon is in its own sign here, so this need is likely to be strong and clear, even if you mostly tend to it alone.'
        : house === 8
            ? 'The Moon is in its own sign here, so this need is likely to be strong and clear, even if you share it only where trust is high.'
            : 'The Moon is in its own sign here, so this need is strong and easy to recognise.'),
    Exaltation: (sign) => `The tradition counts ${sign} as especially favourable to the Moon, and reads this need as well supported and steady.`,
    Detriment: (sign) => `${sign} is the sign opposite the Moon's own, which the tradition reads as a need that takes more deliberate care to meet.`,
    Fall: (sign) => `The tradition counts ${sign} as a hard fit for the Moon, and reads it as a need that takes more deliberate care to meet.`,
};
/** `Capricorn from about 21:35`, `Leo until about 10:20`. */
function spanPhrase(span, index, total) {
    if (total === 1)
        return span.value;
    if (index === 0)
        return `${span.value} until about ${span.toLocal}`;
    if (index === total - 1)
        return `${span.value} from about ${span.fromLocal}`;
    return `${span.value} from about ${span.fromLocal} to ${span.toLocal}`;
}
const spansPhrase = (spans) => and(spans.map((span, index) => spanPhrase(span, index, spans.length)));
/* =========================================================== sections == */
/** The Sun, the Moon and Venus are the planets this reading tells in both signs when they change; any other planet that changes is left out. */
const READ_BOTH_WAYS = new Set(['Sun', 'Moon', 'Venus']);
/** What the reading does with planets that change sign: read them both ways, leave them out, or each of the two. */
function fate(bodies) {
    const read = bodies.filter((body) => READ_BOTH_WAYS.has(body));
    const out = bodies.filter((body) => !READ_BOTH_WAYS.has(body));
    if (out.length === 0)
        return { kind: 'read', text: `${bodies.length === 1 ? 'is' : 'are'} read both ways below` };
    if (read.length === 0)
        return { kind: 'out', text: `this reading leaves ${bodies.length === 1 ? 'it' : 'them'} out` };
    return {
        kind: 'mixed',
        text: `${and(read.map(name))} ${read.length === 1 ? 'is' : 'are'} read both ways below, and ${and(out.map(name))} ${out.length === 1 ? 'is' : 'are'} left out`,
    };
}
function time(claim) {
    const moving = claim.boundary.map((entry) => entry.body);
    const others = moving.filter((body) => body !== 'Moon');
    if (claim.precision === 'unknown') {
        const base = 'No birth time was given, so this reading leaves out what depends on the hour: the rising sign, the houses and the chart\'s ruling planet.';
        if (moving.length === 0) {
            return `${base} Every planet, the fast-moving Moon included, keeps its sign all through your birth day, so the date alone is enough for what follows.`;
        }
        if (claim.moonHolds) {
            const outcome = fate(others);
            const subject = `${and(others.map(name))} ${others.length === 1 ? 'does' : 'do'} not`;
            const rest = outcome.kind === 'read' ? `, so ${others.length === 1 ? 'it' : 'they'} ${outcome.text}`
                : outcome.kind === 'out' ? `, so ${outcome.text}` : `: ${outcome.text}`;
            return `${base} The planets are read from the date. The Moon keeps its sign all day; ${subject}${rest}.`;
        }
        const alsoMoving = others.length > 0 ? `, as ${others.length === 1 ? 'does' : 'do'} ${and(others.map(name))}` : '';
        const outcome = fate(moving);
        const rest = outcome.kind === 'read' ? `, so ${moving.length === 1 ? 'it' : 'they'} ${outcome.text}` : `: ${outcome.text}`;
        return `${base} The planets are read from the date, but the Moon changes sign that day${alsoMoving}${rest}.`;
    }
    let planets;
    if (moving.length === 0) {
        planets = ' The planets keep their signs for two hours either side of it, so most of this reading does not depend on it.';
    }
    else {
        const outcome = fate(moving);
        const verb = moving.length === 1 ? 'changes' : 'change';
        const joined = outcome.kind === 'read' ? `${verb} sign and ${outcome.text}`
            : outcome.kind === 'out' ? `${verb} sign, so ${outcome.text}` : `${verb} sign: ${outcome.text}`;
        planets = ` Within two hours either side of it, ${and(moving.map(name))} ${joined}; the other planets keep theirs.`;
    }
    const rising = claim.rising === null ? ''
        : claim.rising.spans.length <= 1
            ? ' The rising sign stays the same across that window too, but it still rests on the estimate and is read with that in mind.'
            : ' The rising sign can change within that window, so it is read below with that in mind.';
    return `Your birth time is an estimate.${planets}${rising}`;
}
function pattern(claim) {
    switch (claim.kind) {
        case 'concentration': {
            const voice = SIGN[claim.sign];
            const bodies = and(claim.planets.map((body) => name(body)));
            const functions = and(claim.planets.map((body) => FUNCTION[body]));
            const opening = `${count(claim.planets.length)} of your placements share one sign, ${claim.sign}. That gives the chart its main theme: ${voice.style}.`;
            /* Uranus, Neptune and Pluto move slowly: their sign is shared by a whole generation, so it is said and the personal part named. */
            const slowOnes = claim.planets.filter((body) => body === 'Uranus' || body === 'Neptune' || body === 'Pluto');
            const personalOnes = claim.planets.filter((body) => body !== 'Uranus' && body !== 'Neptune' && body !== 'Pluto');
            const generational = slowOnes.length > 0
                ? ` ${capitalise(and(slowOnes.map((body) => name(body))))} ${slowOnes.length === 1 ? 'moves' : 'move'} slowly, so ${slowOnes.length === 1 ? 'its sign is' : 'their signs are'} shared by many people born around the same time${personalOnes.length > 0 ? `; what is personal is how your ${and(personalOnes.map((body) => name(body).replace(/^the /, '')))} ${personalOnes.length === 1 ? 'meets' : 'meet'} ${slowOnes.length === 1 ? 'it' : 'them'}` : ''}.`
                : '';
            const members = `${capitalise(bodies)} all sit there, so ${functions} all work in the same style.${generational}`;
            const { modality } = SIGN_MODALITY[claim.sign];
            const element = SIGN_ELEMENT[claim.sign];
            let support = '';
            if (claim.element === 'leads' && claim.modality === 'leads') {
                support = ` The chart's overall balance adds weight: ${claim.sign} belongs to its strongest element, ${ELEMENT_WORD[element]}, and to its strongest mode, the ${MODALITY_WORD[modality]} signs (${MODALITY_KIND[modality]}).`;
            }
            else if (claim.element === 'leads') {
                support = ` ${capitalise(ELEMENT_WORD[element])}, ${claim.sign}'s element, is also the chart's strongest, which gives the theme extra weight.`;
            }
            else if (claim.modality === 'leads') {
                support = ` ${claim.sign} is one of the ${MODALITY_WORD[modality]} signs, ${MODALITY_KIND[modality]}, and the chart as a whole leans ${MODALITY_WORD[modality]} too.`;
            }
            else if (claim.element === 'shares' || claim.modality === 'shares') {
                support = ' The chart\'s balance of elements and modes leans the same way, though not strongly.';
            }
            const second = [voice.styleMore];
            if (claim.house !== null) {
                second.push(`All ${count(claim.planets.length).toLowerCase()} sit in the ${HOUSE_ORDINAL[claim.house]} house, linked with ${HOUSE_AREA[claim.house]}: the theme is most likely to show there.`);
            }
            if (claim.withSun.length > 0) {
                second.push(`${capitalise(and(['Sun', ...claim.withSun].map(name)))} sit within a few degrees of each other. That makes ${and(claim.withSun.map((body) => FUNCTION[body]))} hard to separate from your sense of purpose.`);
            }
            if (claim.outside) {
                const { body, members: touched } = claim.outside;
                const who = and(touched.map(name));
                second.push(claim.outside.kind === 'opposition'
                    ? `${Name(body)} stands opposite ${who}, so the theme keeps being weighed against ${FUNCTION[body]}.`
                    : claim.outside.kind === 'square'
                        ? `${Name(body)} is in tension with ${who} at once, which tends to add ${HARD_EFFECT[body]} to the whole theme.`
                        : `${Name(body)} works easily with ${who} at once, which tends to bring ${SOFT_EFFECT[body]} into the whole theme.`);
            }
            return [`${opening} ${members}${support}`, second.join(' ')];
        }
        case 'knot': {
            const others = claim.links.map((entry) => otherEnd(entry, claim.center));
            const verbs = knotClauses(claim.links, claim.center);
            const first = `Your chart's main theme is not one sign but a tight cluster of links around ${name(claim.center)}, which stands for ${FUNCTION[claim.center]}. ${capitalise(verbs)}.`;
            const carries = `So ${FUNCTION[claim.center]} rarely arrives alone: ${and(others.map((point) => FUNCTION[point]))} come with it.`;
            const shared = claim.sharedModality
                ? ` All ${count(others.length + 1).toLowerCase()} sit in ${MODALITY_WORD[claim.sharedModality]} signs, ${MODALITY_KIND[claim.sharedModality]}, so strain on this cluster tends to be met by ${MODALITY_RESPONSE[claim.sharedModality]}.`
                : '';
            const slow = others.filter((point) => point === 'Uranus' || point === 'Neptune' || point === 'Pluto');
            const generational = slow.length > 0
                ? ` ${and(slow.map(Name))} ${slow.length === 1 ? 'moves' : 'move'} slowly, so ${slow.length === 1 ? 'its sign is' : 'their signs are'} shared by many people born around the same time. What is personal is how your ${name(claim.center).replace(/^the /, '')} meets ${slow.length === 1 ? 'it' : 'them'}.`
                : '';
            const internal = claim.internal.length > 0
                ? ' The others are tied to each other as well, so a change in one tends to be felt in all of them.'
                : '';
            return [`${first} ${carries}${shared}${generational}`, `Because so much is tied to it, ${FUNCTION[claim.center]} is something you carry rather than something that comes easily.${internal}`];
        }
        case 'temperament': {
            if (claim.element && claim.modality) {
                return [`Your chart's main theme comes from its balance rather than from one placement. ${capitalise(ELEMENT_WORD[claim.element])} clearly outweighs the other elements, so the chart leans on ${ELEMENT_THEME[claim.element]}. The ${MODALITY_WORD[claim.modality]} signs (${MODALITY_KIND[claim.modality]}) also lead, so it tends to work by ${MODALITY_THEME[claim.modality]}.`];
            }
            if (claim.element) {
                return [`Your chart's main theme comes from its balance rather than from one placement. ${capitalise(ELEMENT_WORD[claim.element])} clearly outweighs the other elements, so the chart leans on ${ELEMENT_THEME[claim.element]}.`];
            }
            const modality = claim.modality;
            return [`Your chart's main theme comes from its overall style rather than from one placement. The ${MODALITY_WORD[modality]} signs (${MODALITY_KIND[modality]}) clearly lead, so the chart tends to work by ${MODALITY_THEME[modality]}.`];
        }
        case 'polarity': {
            const [a, b] = claim.mass;
            const outlierWhat = claim.outlier.body === 'Sun' ? 'what drives you' : 'what settles you';
            return [
                `Your chart's main theme is a divide. ${capitalise(ELEMENT_WORD[a])} and ${ELEMENT_WORD[b]} carry most of its placements, so the chart as a whole leans on ${ELEMENT_SHORT[a]} and ${ELEMENT_SHORT[b]}. ${Name(claim.outlier.body)} is its only ${ELEMENT_WORD[claim.outlier.element]} placement, so ${outlierWhat} works in a way the rest of the chart does not share.`,
                `That makes ${name(claim.outlier.body)} the chart's exception, and the part most likely to feel out of step. It wants ${ELEMENT_THEME[claim.outlier.element]}, and the rest of the chart has little of that to offer.`,
            ];
        }
        default: {
            if (claim.spans.length > 1) {
                /* The Sun changes sign on the day: the theme is read under each sign's hours. */
                const readings = claim.spans.map((span, index) => `${marks.ifSign('Sun', span, index, claim.spans.length)} The theme is then ${SIGN[span.value].style}.`);
                return [`No single sign, element or mode dominates your chart, so the Sun sets its main theme, and which theme that is depends on the hour. ${readings.join(' ')}`];
            }
            const voice = SIGN[claim.sign];
            return [`No single sign, element or mode dominates your chart. With nothing else leading, the Sun is its anchor, so it sets the main theme: ${voice.style}. ${voice.styleMore}`];
        }
    }
}
const SIGN_MODALITY = {
    Aries: { modality: 'Cardinal' }, Taurus: { modality: 'Fixed' }, Gemini: { modality: 'Mutable' },
    Cancer: { modality: 'Cardinal' }, Leo: { modality: 'Fixed' }, Virgo: { modality: 'Mutable' },
    Libra: { modality: 'Cardinal' }, Scorpio: { modality: 'Fixed' }, Sagittarius: { modality: 'Mutable' },
    Capricorn: { modality: 'Cardinal' }, Aquarius: { modality: 'Fixed' }, Pisces: { modality: 'Mutable' },
};
const SIGN_ELEMENT = {
    Aries: 'Fire', Taurus: 'Earth', Gemini: 'Air', Cancer: 'Water', Leo: 'Fire', Virgo: 'Earth',
    Libra: 'Air', Scorpio: 'Water', Sagittarius: 'Fire', Capricorn: 'Earth', Aquarius: 'Air', Pisces: 'Water',
};
function drive(claim) {
    const sun = SIGN[claim.sun];
    const sunHouse = claim.sunHouse !== null
        ? ` The Sun sits in the ${HOUSE_ORDINAL[claim.sunHouse]} house, linked with ${HOUSE_AREA[claim.sunHouse]}. ${capitalise(SUN_HOUSE[claim.sunHouse])}.`
        : '';
    const paragraphs = [claim.sunSigns.length === 1
            ? `${pick([
                `The Sun in ${claim.sun} is what drives you: ${sun.drive}.`,
                `What drives you, with the Sun in ${claim.sun}, is ${sun.drive}.`,
                `The Sun in ${claim.sun} points to what drives you: ${sun.drive}.`,
            ], signIndex(claim.sun))} ${sun.driveMore}${sunHouse}`
            : claim.sunSplitTold
                ? `What drives you follows the same split: ${byHour(claim.sunSpans, (sign) => SIGN[sign].drive)}.`
                : `The Sun, which drives you, changes sign on your birth day, so it is read both ways. ${claim.sunSpans.map((span, index) => `${marks.ifSign('Sun', span, index, claim.sunSpans.length)} What drives you there is ${SIGN[span.value].drive}.`).join(' ')}`];
    const bothFixed = claim.sunSigns.length === 1 && claim.moonSigns.length === 1;
    if (claim.moonSigns.length > 1) {
        const spans = claim.moonSpans;
        const readings = spans.map((span, index) => `${marks.ifSign('Moon', span, index, spans.length)} What settles you there is ${SIGN[span.value].settle}.`);
        paragraphs.push(`The Moon, which settles you, changes sign on your birth day, so it is read both ways. ${readings.join(' ')}`);
    }
    else {
        const moon = SIGN[claim.moon];
        const moonHouse = claim.moonHouse !== null
            ? ` The Moon sits in the ${HOUSE_ORDINAL[claim.moonHouse]} house, linked with ${HOUSE_AREA[claim.moonHouse]}. ${capitalise(MOON_HOUSE[claim.moonHouse])}.`
            : '';
        const moonDignity = claim.moonDignity ? MOON_DIGNITY[claim.moonDignity] : undefined;
        const dignity = moonDignity ? ` ${moonDignity(claim.moon, claim.moonHouse)}` : '';
        const moonLead = pick([
            `The Moon in ${claim.moon} is what settles you: ${moon.settle}.`,
            `What settles you, with the Moon in ${claim.moon}, is ${moon.settle}.`,
            `The Moon in ${claim.moon} shows what settles you: ${moon.settle}.`,
        ], signIndex(claim.moon));
        paragraphs.push(`${moonLead} ${moon.settleMore}${moonHouse}${dignity}`.trim());
    }
    if (claim.developedBelow && claim.sameModality && bothFixed) {
        /* Where the two agree, said before the pull that follows: a shared pace. */
        const { modality } = SIGN_MODALITY[claim.sun];
        paragraphs.push(`They do share an overall style: both are ${MODALITY_WORD[modality]} signs, so both lean toward ${MODALITY_THEME[modality]}.`);
    }
    if (!claim.developedBelow && bothFixed) {
        const sunElement = SIGN_ELEMENT[claim.sun];
        const moonElement = SIGN_ELEMENT[claim.moon];
        const relation = claim.relation === 'same-sign'
            ? 'Sun and Moon share a sign, so what you want and what you need rarely pull apart.'
            : claim.relation === 'same-element'
                ? `${claim.sun} and ${claim.moon} are both ${ELEMENT_WORD[sunElement]} signs, so what drives you and what settles you tend to agree.`
                : claim.relation === 'congenial'
                    ? `${claim.sun} is ${withArticle(ELEMENT_WORD[sunElement])} sign and ${claim.moon} ${withArticle(ELEMENT_WORD[moonElement])} sign, and those elements feed each other, so the drive and the need tend to help rather than compete.`
                    : '';
        const aspect = claim.aspect && (claim.aspect.kind === 'trine' || claim.aspect.kind === 'sextile')
            ? ' They are linked directly as well, which makes the cooperation easier still.' : '';
        if (relation)
            paragraphs.push(`${relation}${aspect}`);
    }
    if (claim.joined.length > 0) {
        paragraphs.push(`${capitalise(and(claim.joined.map(name)))} ${claim.joined.length === 1 ? 'sits' : 'sit'} right beside the Sun, so ${and(claim.joined.map((body) => FUNCTION[body]))} ${claim.joined.length === 1 ? 'is' : 'are'} part of your sense of purpose rather than separate from it.`);
    }
    return paragraphs;
}
function meet(claim) {
    const voice = SIGN[claim.rising];
    if (claim.state === 'boundary') {
        const at = spanAtMoment(claim.spans);
        const index = at ? claim.spans.indexOf(at) : -1;
        const before = index > 0 ? claim.spans[index - 1].value : null;
        const after = index >= 0 && index < claim.spans.length - 1 ? claim.spans[index + 1].value : null;
        const range = at ? ` between about ${at.fromLocal} and ${at.toLocal}` : '';
        const edges = [before ? `earlier it would be ${before}` : '', after ? `later ${after}` : ''].filter(Boolean).join(', ');
        const lead = `At the time you gave, ${claim.rising} is rising, which would set what shows first: ${voice.surface}. It stays ${claim.rising} only${range}${edges ? `; ${edges}` : ''}. The chart's ruler and houses follow the rising sign, so they are left out here.`;
        const same = claim.sameSignAs === 'moon' || claim.sameSignAs === 'both'
            ? ' If the estimate is close, the rising sign is your Moon\'s sign too, and your emotional side would be the first thing to show.'
            : claim.sameSignAs === 'sun'
                ? ' If the estimate is close, the rising sign is your Sun\'s sign too, and what shows first would be a fair preview of what drives you.'
                : '';
        return [`${lead}${same}`];
    }
    const approximate = claim.state === 'approximate';
    const lead = pick([
        `${approximate ? `At the time you gave, ${claim.rising} is rising` : `${claim.rising} is rising`}, and it sets what shows first: ${voice.surface}.`,
        `${approximate ? `At the time you gave, with ${claim.rising} rising` : `With ${claim.rising} rising`}, you tend to come across first as ${voice.surface}.`,
        `${approximate ? `At the time you gave, ${claim.rising} is rising` : `${claim.rising} is rising`}, which colours how you come across at first: ${voice.surface}.`,
    ], signIndex(claim.rising));
    const opening = `${lead} ${voice.surfaceMore}`;
    let affinity;
    if (claim.sameSignAs === 'both') {
        affinity = 'It is also the sign of both your Sun and your Moon, so what shows first is very close to what is underneath.';
    }
    else if (claim.sameSignAs === 'moon') {
        affinity = `It is also your Moon's sign, so your emotional side is what shows first${claim.luminaryOnAngle?.body === 'Moon' && claim.luminaryOnAngle.angle === 'Ascendant'
            ? ', and with the Moon sitting right on the rising point, it shows strongly' : ''}.`;
    }
    else if (claim.sameSignAs === 'sun') {
        affinity = 'It is also your Sun\'s sign, so what shows first is a fair preview of what drives you.';
    }
    else if (claim.affinity === 'both') {
        affinity = 'It shares an element with both the Sun and the Moon, so the surface fits what is underneath.';
    }
    else if (claim.affinity === 'sun') {
        affinity = 'It shares the Sun\'s element, so the surface points toward what drives you.';
    }
    else if (claim.affinity === 'moon') {
        affinity = 'It shares the Moon\'s element, so your emotional side tends to show before your drive does.';
    }
    else {
        affinity = 'It shares no element with the Sun or the Moon, so the first impression says little about what drives or settles you. Those take longer to come through.';
    }
    /* A luminary on an angle, unless the Moon-on-the-rising-point line above has
       already said it. */
    const onAngle = claim.luminaryOnAngle;
    const toldAbove = onAngle?.body === 'Moon' && onAngle.angle === 'Ascendant'
        && (claim.sameSignAs === 'moon' || claim.sameSignAs === 'both');
    const angular = onAngle && !toldAbove
        ? ` ${Name(onAngle.body)} also sits ${ANGLE_PHRASE[onAngle.angle]}, which brings ${onAngle.body === 'Sun' ? 'what drives you' : 'what settles you'} closer to the surface.`
        : '';
    const paragraphs = [`${opening} ${affinity}${angular}`];
    if (claim.ruler) {
        const ruler = claim.ruler;
        const angle = ruler.angle ? `, ${ANGLE_PHRASE[ruler.angle]}` : '';
        if (ruler.inRisingSign) {
            paragraphs.push(`${Name(ruler.body)}, the planet that rules ${claim.rising}, sits in ${claim.rising} too${angle}. That strengthens the rising sign: its ${voice.surface} manner is more than a first impression, and much of the chart tends to act through it.`);
        }
        else {
            const where = ruler.house
                ? ` in the ${HOUSE_ORDINAL[ruler.house]} house. So the way you come across first tends to go into ${HOUSE_AREA[ruler.house]}`
                : ', so it carries the rising sign\'s style into the rest of the chart';
            const angular = ruler.angle ? ` It also sits ${ANGLE_PHRASE[ruler.angle]}, which strengthens that.` : '';
            /* The surface answers to where its ruler sits: said as the link it is. */
            const ties = ruler.inPatternSign
                ? ' That links the first impression back to the chart\'s main theme.'
                : pick([
                    ` That links the first impression to ${ruler.sign}'s way of working: ${SIGN[ruler.sign].style}.`,
                    ` Behind the first impression, then, is the ${ruler.sign} style: ${SIGN[ruler.sign].style}.`,
                    ` What steers that surface is ${ruler.sign}'s concern with ${SIGN[ruler.sign].style}.`,
                ], signIndex(ruler.sign));
            paragraphs.push(`The planet that rules the rising sign, ${name(ruler.body)}, sits in ${ruler.sign}${where}.${angular}${ties}`);
        }
    }
    return paragraphs;
}
/*
 * A PLANET'S PARAGRAPH, OPENED BY WHAT IT DOES. A planet inside the chart's
 * concentration is not introduced by its sign again - the pattern has said the
 * sign - so it opens on the same style carried into its own function.
 */
const OPENING = {
    Mercury: {
        own: (sign) => `With Mercury in ${sign}, your thinking tends to ${SIGN[sign].mind}.`,
        shared: (sign) => `Mercury carries the same ${sign} style into how you think, so your thinking tends to ${SIGN[sign].mind}.`,
    },
    Mars: {
        own: (sign) => `With Mars in ${sign}, you tend to ${SIGN[sign].act}.`,
        shared: (sign) => `Mars carries the same ${sign} style into action, so you tend to ${SIGN[sign].act}.`,
    },
    Venus: {
        own: (sign) => `Venus in ${sign} shapes how you relate: you tend to ${SIGN[sign].relate}.`,
        shared: (sign) => `Venus brings the same ${sign} style into closeness, so you tend to ${SIGN[sign].relate}.`,
    },
};
function planetParagraph(note) {
    const body = note.body;
    const parts = [note.inPattern ? OPENING[body].shared(note.sign) : OPENING[body].own(note.sign)];
    const dignity = note.dignity ? DIGNITY_LINE[body][note.dignity] : undefined;
    if (dignity)
        parts.push(dignity(note.sign));
    if (note.aspect)
        parts.push(link(note.aspect, note.body));
    return parts.join(' ');
}
function mind(claim) {
    return [
        ...(claim.mercury ? [planetParagraph(claim.mercury)] : []),
        ...(claim.mars ? [planetParagraph(claim.mars)] : []),
    ];
}
function relate(claim) {
    const venus = claim.venus;
    const paragraphs = [];
    if (venus.signs.length > 1) {
        const readings = venus.spans.map((span, index) => `${marks.ifSign('Venus', span, index, venus.spans.length)} In closeness you then tend to ${SIGN[span.value].relate}.`);
        paragraphs.push(`Venus changes sign on your birth day, so the way you relate is read both ways. ${readings.join(' ')}`);
    }
    else {
        paragraphs.push(planetParagraph(venus));
    }
    if (claim.moon.signs.length === 1) {
        const moonLine = `${CLOSENESS_LEAD[SIGN_ELEMENT[claim.moon.sign]](claim.moon.sign)} ${SIGN[claim.moon.sign].closeness}.`;
        const venusElement = SIGN_ELEMENT[venus.sign];
        const moonElement = SIGN_ELEMENT[claim.moon.sign];
        const opposite = venus.aspect?.kind === 'opposition' && otherEnd(venus.aspect, 'Venus') === 'Moon';
        const relation = venus.signs.length > 1 ? ''
            : claim.relation === 'same-sign' ? ' Venus and the Moon share a sign, so what you give and what you need in closeness line up.'
                : claim.relation === 'same-element' ? ` Venus and the Moon are both in ${ELEMENT_WORD[venusElement]} signs, so what you give and what you need tend to line up.`
                    : claim.relation === 'congenial'
                        ? (opposite
                            ? ` The elements of Venus and the Moon, ${ELEMENT_WORD[venusElement]} and ${ELEMENT_WORD[moonElement]}, still suit each other, so when the two do meet, what you give tends to support what you need.`
                            : ` Venus's ${ELEMENT_WORD[venusElement]} and the Moon's ${ELEMENT_WORD[moonElement]} are different but compatible elements, so what you give and what you need tend to support each other.`)
                        : ` What you give and what you need can differ here: Venus tends to give ${ELEMENT_GIVE[venusElement]}, while the Moon asks for ${ELEMENT_NEED[moonElement]}. ${SAY_WHICH[moonElement]}`;
        paragraphs.push(`${moonLine}${relation}`);
    }
    return paragraphs;
}
/* The same finding opened four ways, by the Sun's element. */
const LUMINARY_TENSION_LEAD = {
    Earth: 'The clearest pull runs between the Sun and the Moon.',
    Air: 'The strongest tension in the chart sits between the Sun and the Moon.',
    Fire: 'The chart\'s main friction runs between the Sun and the Moon.',
    Water: 'The Sun and the Moon want different things.',
};
/* How the Moon's closeness line opens, by the Moon's element. */
const CLOSENESS_LEAD = {
    Fire: (sign) => `Your ${sign} Moon feels closest`,
    Earth: (sign) => `Closeness works best for your ${sign} Moon`,
    Air: (sign) => `Your ${sign} Moon relaxes into closeness`,
    Water: (sign) => `Your ${sign} Moon feels safe in closeness`,
};
function tensionParagraph(tension, index) {
    switch (tension.type) {
        case 'luminaries': {
            const sun = SIGN[tension.sun];
            const moon = SIGN[tension.moon];
            const aspect = tension.aspect?.kind === 'square'
                ? ' They are also at a hard angle to each other, so the two press on each other rather than take turns.'
                : tension.aspect?.kind === 'opposition'
                    ? ' They also sit opposite each other, so you tend to swing between the two.'
                    : '';
            const alone = tension.moonAlone
                ? ` The Moon is also your chart's only ${ELEMENT_WORD[SIGN_ELEMENT[tension.moon]]} placement. Nothing else backs up its need, so it is the easier one to overrule.`
                : '';
            const friction = frictionLine(SIGN_ELEMENT[tension.sun], SIGN_ELEMENT[tension.moon]);
            const closing = friction ? ` ${friction}`
                : ' The two feed each other, but from opposite sides, so you tend to swing between them rather than hold both at once.';
            return `${LUMINARY_TENSION_LEAD[SIGN_ELEMENT[tension.sun]]} The Sun in ${tension.sun} pulls toward ${sun.pull}; the Moon in ${tension.moon} pulls toward ${moon.pull}.${aspect}${alone}${closing}`;
        }
        case 'surface':
            return `${index === 0 ? 'The clearest pull' : 'Another pull'} runs between the surface and what is underneath. The rising sign's ${SIGN[tension.rising].surface} manner shows first. Underneath, the Sun wants ${SIGN[tension.sun].drive} and the Moon needs ${SIGN[tension.moon].settle}.`;
        case 'aspect': {
            const { aspect } = tension;
            const lead = index === 0 ? 'The clearest pull' : 'A second pull';
            if (aspect.kind === 'opposition') {
                return `${lead} runs between ${FUNCTION[aspect.a]} and ${FUNCTION[aspect.b]}. ${Name(aspect.a)} stands opposite ${name(aspect.b)}, so you tend to alternate between the two rather than combine them.`;
            }
            /* A square or a hard conjunction, said as what the other planet adds to this one. */
            const shape = aspect.kind === 'square' ? 'being in tension with' : 'sitting very close to';
            return `${lead} comes from ${name(aspect.a)} ${shape} ${name(aspect.b)}, which tends to add ${HARD_EFFECT[aspect.b]} to ${FUNCTION[aspect.a]}.`;
        }
        default:
            return `${index === 0 ? 'The clearest pull is in how the chart tends to act' : 'There is also a pull in how the chart tends to act'}. The chart as a whole leans ${MODALITY_WORD[tension.lead]}, toward ${MODALITY_THEME[tension.lead]}. The Sun and the Moon, though, both sit in ${MODALITY_WORD[tension.luminaries]} signs, which prefer ${MODALITY_THEME[tension.luminaries]}.`;
    }
}
function tension(claim) {
    return claim.tensions.map((entry, index) => tensionParagraph(entry, index));
}
/** `before about 14:10, ...; after about 14:10, ...` - one clause per sign the Sun holds that day. */
const byHour = (spans, clause) => spans
    .map((span, index) => `${index === 0 ? `before about ${span.toLocal}` : `after about ${span.fromLocal}`}, ${clause(span.value)}`)
    .join('; ');
function overuseClause(overuse) {
    switch (overuse.source) {
        case 'sign': return SIGN[overuse.sign].overuse;
        case 'sun-both': return byHour(overuse.spans, (sign) => SIGN[sign].overuse);
        case 'moon': return SIGN[overuse.sign].moonOveruse;
        case 'knot': return `carrying ${FUNCTION[overuse.center]} and everything tied to it at once makes it hard to put anything down`;
        case 'element': return ELEMENT_OVERUSE[overuse.element];
        default: return MODALITY_OVERUSE[overuse.modality];
    }
}
function practiceClause(overuse) {
    switch (overuse.source) {
        case 'sign': return SIGN[overuse.sign].practice;
        case 'sun-both': return byHour(overuse.spans, (sign) => SIGN[sign].practice);
        case 'moon': return SIGN[overuse.sign].moonPractice;
        case 'knot': return `to decide, one thing at a time, which of the things that come with ${FUNCTION[overuse.center]} is actually yours to carry today`;
        case 'element': return ELEMENT_PRACTICE[overuse.element];
        default: return MODALITY_PRACTICE[overuse.modality];
    }
}
/* The cost is introduced by what it is the cost of, so four charts do not open
   this section with the same two words. */
const COST_LEAD = {
    concentration: 'With so much in one sign, the style can run too hard:',
    knot: 'The price of so tight a cluster is weight:',
    temperament: 'A chart this one-sided has its cost:',
    polarity: 'A divided chart has its own cost:',
    luminary: 'Overused,',
};
/** The cost, said so that it stands on its own: a leading mode or element is named, not pointed back to. */
function costLead(patternKind, first) {
    if (patternKind === 'temperament' && first.source === 'modality')
        return `A chart led by ${MODALITY_WORD[first.modality]} signs has its cost:`;
    if (patternKind === 'temperament' && first.source === 'element')
        return `A chart so dominated by ${ELEMENT_WORD[first.element]} has its cost:`;
    if (patternKind === 'concentration' && first.source === 'sign') {
        return pick([
            COST_LEAD.concentration,
            `A chart this concentrated in ${first.sign} can overdo its style:`,
            'The cost of such a concentration is overdoing the style:',
        ], signIndex(first.sign));
    }
    return COST_LEAD[patternKind];
}
/* The Moon's cost, introduced by its element so four readings do not share the
   same transition. */
const MOON_COST_LEAD = {
    Fire: 'The Moon adds a cost of its own:',
    Earth: 'The Moon\'s reflex has a cost too:',
    Air: 'On the Moon\'s side the cost is different:',
    Water: 'The Moon carries its own cost:',
};
const PRACTICE_LEAD = {
    concentration: 'What helps is',
    knot: 'What helps most is',
    temperament: 'What helps is',
    polarity: 'The practical answer is',
    luminary: 'What helps is',
};
function helps(claim) {
    const [first, second] = claim.overuse;
    const moonLead = second && second.source === 'moon' ? MOON_COST_LEAD[SIGN_ELEMENT[second.sign]] : '';
    const byTheHour = first.source === 'sun-both';
    const lead0 = byTheHour ? 'The cost depends on the hour:' : costLead(claim.patternKind, first);
    const cost = `${lead0} ${overuseClause(first)}.${second ? ` ${moonLead} ${overuseClause(second)}.` : ''}`;
    const practices = claim.practice.map(practiceClause);
    const lead = byTheHour ? 'What helps depends on the hour too:' : PRACTICE_LEAD[claim.patternKind];
    /* One practice to a sentence, so each can be finished before the next. */
    const help = practices.length > 1
        ? `${lead} ${practices[0]}. ${pick(['It also helps', 'Another help is', 'A second thing that helps is'], practices[0].length + practices[1].length)} ${practices[1]}.`
        : `${lead} ${practices[0]}.`;
    const paragraphs = [cost, help];
    if (claim.support) {
        const { support } = claim;
        const from = support.a === 'Sun' || support.a === 'Moon' ? support.a : support.b;
        const other = otherEnd(support, from);
        paragraphs.push(`Something in the chart already supports this: ${name(from)} works easily with ${name(other)}, so ${FUNCTION[from]} may have ${SOFT_EFFECT[other]} behind it.`);
    }
    return paragraphs;
}
/* ============================================================ evidence == */
const ASPECT_WORD = {
    conjunction: 'conjunct', opposition: 'opposite', square: 'square', trine: 'trine', sextile: 'sextile',
};
const IN_ORB_ALL_DAY = 'in orb all day';
/*
 * The evidence names bodies as the chart does - `Sun square Neptune` - without
 * the article prose would give them. Without a birth time an orb moves with the
 * hour - a Moon aspect's by several degrees across the day - so, as At a glance
 * does, the aspect is said to hold all day and no single orb is printed.
 */
const aspectFact = (model, aspect) => `${aspect.a} ${ASPECT_WORD[aspect.kind]} ${aspect.b}${model.timeWithheld
    ? (aspect.state === 'known' ? `, ${IN_ORB_ALL_DAY}` : '')
    : `, orb ${degreeText(aspect.orb)}`}`;
const DIGNITY_WORD = {
    Domicile: 'domicile', Exaltation: 'exaltation', Detriment: 'detriment', Fall: 'fall', Peregrine: 'peregrine',
};
const bodyFact = (model, body) => {
    const reading = model.bodies[body];
    const retro = reading.retrograde ? ', retrograde' : '';
    /* Without a birth time the day fixes a sign, never a degree - the Moon moves
       some thirteen degrees in a day - so only the sign the window checked is
       given. A planet that changes sign that day is given both, by the hour, and
       no dignity, which would belong to one of them. */
    if (model.timeWithheld && reading.state === 'boundary') {
        return `${body}: ${spansPhrase(reading.spans)} on the birth day${retro}`;
    }
    const dignity = reading.dignity && reading.dignity !== 'Peregrine' ? `, ${DIGNITY_WORD[reading.dignity]}` : '';
    const house = reading.house !== null ? `, house ${reading.house}` : '';
    const moving = reading.state === 'boundary' ? ` (${spansPhrase(reading.spans)} on the birth day)` : '';
    const position = model.timeWithheld ? reading.sign : `${reading.sign} ${degreeText(reading.degree)}`;
    return `${body} ${position}${house}${dignity}${retro}${moving}`;
};
const counts = (pattern, order) => order.map((quality) => `${quality} ${pattern.counts[quality]}`).join(' / ');
const ELEMENTS_ORDER = ['Fire', 'Earth', 'Air', 'Water'];
const MODALITIES_ORDER = ['Cardinal', 'Fixed', 'Mutable'];
function elementFact(model) {
    const { elements } = model;
    const lead = elements.shape === 'balanced' ? 'no element leads'
        : elements.shape === 'tie' ? `${and(elements.leaders)} share the lead`
            : `${elements.leaders[0]} leads by ${elements.shape === 'single' ? 'two or more' : 'one'}`;
    const moves = elements.state === 'boundary' ? '; the count changes during the birth day' : '';
    return `Elements across the ten placements: ${counts(elements, ELEMENTS_ORDER)} - ${lead}${moves}.`;
}
function modalityFact(model) {
    const { modalities } = model;
    const lead = modalities.shape === 'tie' ? `${and(modalities.leaders)} share the lead`
        : `${modalities.leaders[0]} leads by ${modalities.shape === 'single' ? 'two or more' : 'one'}`;
    const moves = modalities.state === 'boundary' ? '; the count changes during the birth day' : '';
    return `Modes: ${counts(modalities, MODALITIES_ORDER)} - ${lead}${moves}.`;
}
const evidence = {
    standfirst: 'What each section above rests on, in the chart\'s own terms.',
    time(model) {
        if (model.precision === 'exact')
            return [];
        if (model.precision === 'unknown') {
            const moving = model.boundaryBodies.map((body) => `${body}: ${spansPhrase(model.bodies[body].spans)}`);
            return [
                `Birth time: not given. The chart is calculated for 12:00 local time only as a neutral midpoint, and nothing that depends on the hour is read from it.`,
                `Checked across the whole day of birth: ${moving.length > 0 ? `${moving.join('; ')}; every other planet keeps its sign` : 'every planet keeps its sign, the Moon included'}.`,
                'Withheld: the Ascendant, the Midheaven, the houses, the chart ruler and the planets on the angles.',
            ];
        }
        const rising = model.bigThree.ascendant;
        const risingLine = rising.spans.length > 0 ? ` Rising sign across that window: ${spansPhrase(rising.spans)}.` : '';
        const moving = model.boundaryBodies.map((body) => `${body}: ${spansPhrase(model.bodies[body].spans)}`);
        const range = windowRange(model);
        return [`Birth time: your estimate, checked two hours either side${range ? ` (${range})` : ''}. ${moving.length > 0 ? `Changing: ${moving.join('; ')}.` : 'Every planet keeps its sign.'}${risingLine}`];
    },
    pattern(model, plan) {
        const claim = plan.pattern;
        switch (claim.kind) {
            case 'concentration':
                return [
                    `${claim.sign} stellium: ${and(claim.planets)} (${claim.planets.length} of the ten placements)${claim.house !== null ? `, all in Whole Sign house ${claim.house}` : ''}.`,
                    elementFact(model),
                    modalityFact(model),
                ];
            case 'knot':
                return [
                    `Tight aspects to ${name(claim.center)}: ${claim.links.map((aspect) => aspectFact(model, aspect)).join('; ')}.`,
                    ...(claim.internal.length > 0
                        ? [`Between the others: ${claim.internal.map((aspect) => aspectFact(model, aspect)).join('; ')}.`] : []),
                    ...(claim.sharedModality ? [`All ${claim.links.length + 1} bodies are in ${claim.sharedModality.toLowerCase()} signs.`] : []),
                ];
            case 'polarity':
                return [elementFact(model), `${claim.outlier.body} (${model.bodies[claim.outlier.body].sign}) is the only ${claim.outlier.element} placement.`];
            case 'temperament':
                return [elementFact(model), modalityFact(model)];
            default:
                return [bodyFact(model, 'Sun'), 'No stellium; neither the elements nor the modes have a clear lead.'];
        }
    },
    drive(model, plan) {
        const lines = [
            `${bodyFact(model, 'Sun')} (${model.bodies.Sun.element}, ${model.bodies.Sun.modality}).`,
            `${bodyFact(model, 'Moon')} (${model.bodies.Moon.element}, ${model.bodies.Moon.modality}).`,
        ];
        const conjunctions = model.aspects.filter((aspect) => aspect.kind === 'conjunction' && involves(aspect, 'Sun')
            && plan.drive.joined.includes(otherEnd(aspect, 'Sun')));
        if (conjunctions.length > 0)
            lines.push(`${conjunctions.map((aspect) => aspectFact(model, aspect)).join('; ')}.`);
        if (plan.drive.aspect)
            lines.push(`${aspectFact(model, plan.drive.aspect)}.`);
        return lines;
    },
    meet(model, plan) {
        const meetClaim = plan.meet;
        if (!meetClaim)
            return [];
        const rising = model.bigThree.ascendant;
        /* The window's times are stated once, under "Your birth time". Here a
           rising sign that moves only names its alternatives, and the houses are
           mentioned only when they are read. */
        const moving = meetClaim.state === 'boundary';
        const lines = [`Ascendant ${rising.sign} ${rising.degree !== null ? degreeText(rising.degree) : ''}${rising.state === 'known' ? '' : ', from the estimated time'}${moving
                ? `; could also be ${listWords(rising.spans.map((span) => span.value).filter((value) => value !== rising.sign), 'or')}`
                : '; Whole Sign houses'}.`.replace(' ;', ';')];
        if (meetClaim.ruler && model.ruler) {
            const angular = model.angular.find((entry) => entry.body === model.ruler?.body);
            lines.push(`Chart ruler (modern rulership): ${bodyFact(model, model.ruler.body)}${angular ? `, ${degreeText(angular.orb)} from the ${angular.angle}` : ''}.`);
        }
        const luminary = meetClaim.luminaryOnAngle;
        if (luminary) {
            const entry = model.angular.find((row) => row.body === luminary.body && row.angle === luminary.angle);
            if (entry)
                lines.push(`${luminary.body} ${degreeText(entry.orb)} from the ${entry.angle}.`);
        }
        return lines;
    },
    mind(model, plan) {
        const claim = plan.mind;
        if (!claim)
            return [];
        return [claim.mercury, claim.mars].filter((note) => note !== null)
            .map((note) => `${bodyFact(model, note.body)}${note.aspect ? `; ${aspectFact(model, note.aspect)}` : ''}.`);
    },
    relate(model, plan) {
        const venus = plan.relate.venus;
        return [
            `${bodyFact(model, 'Venus')}${venus.aspect ? `; ${aspectFact(model, venus.aspect)}` : ''}.`,
            `${bodyFact(model, 'Moon')}.`,
        ];
    },
    pull(model, plan) {
        const claim = plan.tension;
        if (!claim)
            return [];
        return claim.tensions.map((entry) => {
            switch (entry.type) {
                case 'luminaries': {
                    const sun = model.bodies.Sun;
                    const moon = model.bodies.Moon;
                    const aspect = entry.aspect ? `; ${aspectFact(model, entry.aspect)}` : '';
                    const alone = entry.moonAlone ? `; the Moon is the only ${moon.element} placement` : '';
                    return `Sun ${sun.sign} (${sun.element}, ${sun.modality}) against Moon ${moon.sign} (${moon.element}, ${moon.modality})${aspect}${alone}.`;
                }
                case 'surface':
                    return `Ascendant ${entry.rising} shares no element with the Sun (${entry.sun}) or the Moon (${entry.moon}).`;
                case 'aspect':
                    return `${aspectFact(model, entry.aspect)}.`;
                default:
                    return `${modalityFact(model)} Sun and Moon are both ${entry.luminaries.toLowerCase()}.`;
            }
        });
    },
    helps(model, plan) {
        const sources = plan.helps.overuse.map((entry) => {
            switch (entry.source) {
                case 'sign': return `the ${entry.sign} style`;
                case 'sun-both': return `the Sun's style in ${and(entry.spans.map((span) => span.value))}, by the hour`;
                case 'moon': return `the Moon in ${entry.sign}`;
                case 'knot': return `the aspects around ${name(entry.center)}`;
                case 'element': return `the ${entry.element.toLowerCase()} emphasis`;
                default: return `the ${entry.modality.toLowerCase()} emphasis`;
            }
        });
        return [
            `Read from ${and(sources)}.`,
            ...(plan.helps.support ? [`${aspectFact(model, plan.helps.support)}.`] : []),
        ];
    },
};
/** The window in local clock time, read off the Sun's spans - every body's spans cover the whole window. */
function windowRange(model) {
    const spans = model.bodies.Sun.spans;
    if (spans.length === 0)
        return '';
    return `${spans[0].fromLocal}-${spans[spans.length - 1].toLocal}`;
}
/* ============================================================== marks == */
const marks = {
    estimated: 'from your estimated time',
    allDay: 'the same sign all day; the degree depends on the hour',
    aspectAllDay: IN_ORB_ALL_DAY,
    signName: (sign) => sign,
    changes: (spans) => spansPhrase(spans),
    alsoPossible: (signs) => `could also be ${listWords(signs, 'or')}`,
    countChanges: (bodies) => `depends on the hour: ${and(bodies.map(name))} ${bodies.length === 1 ? 'changes' : 'change'} sign that day`,
    placementTitle: (body, signs) => `${body} in ${signs.join(' or ')}`,
    ifSign: (body, span, index, total) => (total === 1 ? ''
        : index === 0 ? `If you were born before about ${span.toLocal} (local time where you were born), ${name(body)} is in ${span.value}.`
            : `If you were born after about ${span.fromLocal}, ${name(body)} is in ${span.value}.`),
    risingLead: (sign, spans) => {
        const others = spans.map((span) => span.value).filter((value) => value !== sign);
        return spans.length > 1 && others.length > 0
            ? `At the time you gave, the rising sign is ${sign}; within two hours of it, it could also be ${listWords(others, 'or')}.`
            : `At the time you gave, the rising sign is ${sign}.`;
    },
    generationalWithoutHouse: 'A generational layer, shared by everyone born in these years. The aspects it makes are what make it specific to you; a birth time would add its house.',
};
export const EN_VOICE = {
    time, pattern, drive, meet, mind, relate, tension, helps, evidence, marks,
};
