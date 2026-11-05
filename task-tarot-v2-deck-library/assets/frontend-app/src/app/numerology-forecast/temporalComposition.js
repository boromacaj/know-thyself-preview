export function relationOf(tuple) {
    const { year, month, day } = tuple;
    if (year === month && month === day)
        return 'triple';
    if (year === month)
        return 'year-month';
    if (month === day)
        return 'month-day';
    if (year === day)
        return 'year-day';
    return 'distinct';
}
export const CYCLE_MOTION = {
    1: 'outward', 2: 'inward', 3: 'outward', 4: 'steady', 5: 'outward',
    6: 'steady', 7: 'inward', 8: 'outward', 9: 'inward',
};
/**
 * Which phrasing a clause with three takes, beside a month of this motion.
 * The meaning of the clause is the same in all three; only the wording turns,
 * so a year does not open with the identical sentence in every month.
 */
export function phrasingFor(month) {
    const motion = CYCLE_MOTION[month];
    return motion === 'outward' ? 0 : motion === 'inward' ? 1 : 2;
}
export function linkOf(year, month) {
    return CYCLE_MOTION[year] === CYCLE_MOTION[month] ? 'and' : 'while';
}
/**
 * THE CONTRASTS, AND ONLY THESE.
 *
 * Five pairs whose meanings pull in opposite directions inside the system's
 * own vocabulary: agency and cooperation, expression and reflection, structure
 * and change, freedom and commitment, beginning and completion. Nothing else is
 * treated as a contrast - two different numbers are usually just a frame and an
 * emphasis - and even these are written as one layer working inside the other,
 * never as conflict and never as a negation. No compatibility matrix exists or
 * is implied.
 */
export const CONTRAST_PAIRS = [
    [1, 2], [3, 7], [4, 5], [5, 6], [1, 9],
];
export function isContrast(a, b) {
    return CONTRAST_PAIRS.some(([x, y]) => (x === a && y === b) || (x === b && y === a));
}
/** Which layers a sentence speaks for, so a test can prove all three are heard. */
export function scalesOf(sentence) {
    switch (sentence.kind) {
        case 'concentration':
        case 'not-event':
        case 'sequence':
        case 'short-term-headline':
            return ['year', 'month', 'day'];
        case 'watch': return sentence.doubled ? ['month'] : ['year', 'month', 'day'];
        case 'year': return ['year'];
        case 'year-month':
        case 'month':
        case 'month-inside':
        case 'month-repeats': return ['year', 'month'];
        case 'day':
        case 'day-repeats':
        case 'day-continues': return ['month', 'day'];
        case 'day-echo':
        case 'year-day': return ['year', 'day'];
    }
}
/**
 * The year and the month. Two sentences when the month is one of the five
 * contrasts to its year - the year stated, then the month working inside it -
 * or when the month is steady and gets its own; otherwise one sentence, joined
 * by what their motions share.
 */
function yearAndMonth(year, month) {
    if (isContrast(year, month))
        return [{ kind: 'year', year, month }, { kind: 'month-inside', year, month }];
    if (CYCLE_MOTION[month] === 'steady')
        return [{ kind: 'year', year, month }, { kind: 'month', year, month }];
    return [{ kind: 'year-month', year, month, link: linkOf(year, month) }];
}
/**
 * THE PLAN.
 *
 * Total over every tuple of 1-9 and decided by structure alone:
 *
 *   triple      the concentration, what it does NOT mean, and what the theme
 *               tends to overdo
 *   year-month  the year, the month concentrating it, the day acting on the
 *               doubled theme, and - unless the day is itself the counterweight -
 *               what the doubled theme tends to overdo
 *   month-day   the year's theme against what this month and this day ask for,
 *               the year and month, the day repeating the month, and the doubled
 *               theme's caution unless the month is already set against its year
 *   year-day    the year and month, the day returning to the year's number, and
 *               that return acting on the month's work
 *   distinct    the year and month, the day acting on the month's work, and - where
 *               the day is one of the contrasts to its year - a line setting the
 *               two against each other, or the completion-to-initiation sequence
 */
export function planComposition(tuple) {
    const { year, month, day } = tuple;
    const relation = relationOf(tuple);
    const sentences = [];
    switch (relation) {
        case 'triple':
            sentences.push({ kind: 'concentration', n: year }, { kind: 'not-event', n: year }, { kind: 'watch', n: year, doubled: false });
            break;
        case 'year-month':
            sentences.push({ kind: 'year', year, month }, { kind: 'month-repeats', month }, { kind: 'day', month, day });
            if (!isContrast(month, day))
                sentences.push({ kind: 'watch', n: month, doubled: true });
            break;
        case 'month-day':
            sentences.push({ kind: 'short-term-headline', year, month }, ...yearAndMonth(year, month), { kind: 'day-repeats', year, day });
            if (!isContrast(year, month))
                sentences.push({ kind: 'watch', n: month, doubled: true });
            break;
        case 'year-day':
            sentences.push(...yearAndMonth(year, month), { kind: 'day-echo', day }, { kind: 'day-continues', month, day });
            break;
        case 'distinct':
            sentences.push(...yearAndMonth(year, month), { kind: 'day', month, day });
            if (year === 9 && day === 1)
                sentences.push({ kind: 'sequence', month });
            else if (isContrast(year, day))
                sentences.push({ kind: 'year-day', year, day });
            break;
    }
    return { tuple, relation, sentences };
}
export function composeSentences(plan, voice) {
    return plan.sentences.map(voice);
}
export function composeReading(plan, voice) {
    return composeSentences(plan, voice).join(' ');
}
/** "4-5": the key of an ordered pair, outer layer first. */
export const pairKey = (outer, inner) => `${outer}-${inner}`;
const WORDS = {
    1: {
        themeIs: 'initiative is',
        theme: 'initiative',
        want: 'a starting point',
        year: [
            'is about choosing a direction and making it your own',
            'asks for a direction of your own, chosen rather than drifted into',
            'puts initiative first: choosing where to go and taking the first steps',
        ],
        month: 'puts more emphasis on choosing a direction and committing to it',
        use: 'a first move',
        moreOf: 'another new start',
        echo: 'the call for a new direction is easier to act on',
        concentrates: 'the question now is what to commit to first',
        tripleList: 'direction, agency and first steps',
        notEvent: 'something has to start on this day',
        ready: 'something is already waiting for a first step',
        pressure: 'forcing a start before the context is clear',
    },
    2: {
        themeIs: 'cooperation is',
        theme: 'cooperation',
        want: 'patience and cooperation',
        year: [
            'works through cooperation, timing and other people\'s responses',
            'moves at the pace of agreements, patience and other people\'s responses',
            'favours partnership: listening, coordinating and letting things develop between people',
        ],
        month: 'makes cooperation and other people\'s responses more relevant to how that plays out',
        use: 'working something out together',
        moreOf: 'more consultation',
        echo: 'patience and cooperation come to the front again',
        concentrates: 'progress depends even more on timing and good coordination',
        tripleList: 'listening, timing and patience',
        notEvent: 'an agreement has to be reached on this day',
        ready: 'something is already ready to be worked out together',
        pressure: 'waiting when action is already needed',
    },
    3: {
        themeIs: 'expression is',
        theme: 'expression',
        want: 'expression',
        year: [
            'favours getting ideas, work and conversations into circulation',
            'wants ideas, work and conversations to be seen and heard',
            'is organised around expression: making, sharing and putting things into words',
        ],
        month: 'brings that into expression, through conversations, drafts and anything that can be shared',
        use: 'saying or showing something',
        moreOf: 'more talk',
        echo: 'the pull toward expression is easier to use',
        concentrates: 'what you express or share has more room to be noticed',
        tripleList: 'contact, sharing and visible work',
        notEvent: 'anything has to be said on this day',
        ready: 'something is already ready to be shared',
        pressure: 'scattering across too many openings',
    },
    4: {
        themeIs: 'structure is',
        theme: 'structure',
        want: 'a firm shape',
        year: [
            'is about building something reliable, one practical layer at a time',
            'asks for patient building, with method, maintenance and foundations that hold',
            'asks for structure: making things reliable, repeatable and well kept',
        ],
        month: 'narrows that into structure and what can actually be made reliable',
        use: 'steady, practical work',
        moreOf: 'tightening the structure further',
        echo: 'the steady building work comes back into focus',
        concentrates: 'the practical foundations deserve most of the attention',
        tripleList: 'method, discipline and reliability',
        notEvent: 'everything has to be settled on this day',
        ready: 'something is already ready to be put in order',
        pressure: 'holding on to a structure after it has stopped helping',
    },
    5: {
        themeIs: 'change is',
        theme: 'change',
        want: 'movement',
        year: [
            'stays open to movement, experiment and loosening what has become fixed',
            'favours change, trying other routes and loosening arrangements that have grown too fixed',
            'is organised around movement: testing, adapting and trying another route',
        ],
        month: 'loosens that, adding movement and room to test another route',
        use: 'trying another route',
        moreOf: 'more exploration',
        echo: 'the openness to change is easier to act on',
        concentrates: 'more of the current arrangement is open to adjustment',
        tripleList: 'movement, experimentation and loosening fixed arrangements',
        notEvent: 'something has to change on this day',
        ready: 'something is already ready to move',
        pressure: 'mistaking movement for progress',
    },
    6: {
        themeIs: 'responsibility is',
        theme: 'responsibility',
        want: 'care and commitment',
        year: [
            'centres on responsibility, care and whatever needs tending properly',
            'is about care and commitment, looking after what matters and repairing what needs it',
            'asks what you look after, maintain and answer for',
        ],
        month: 'ties that to responsibility, to what needs looking after, repairing or finishing properly',
        use: 'looking after what matters',
        moreOf: 'taking on more obligations',
        echo: 'responsibilities and upkeep come back into focus',
        concentrates: 'obligations and upkeep move to the front',
        tripleList: 'care, commitment and upkeep',
        notEvent: 'a new duty has to be taken up on this day',
        ready: 'something already needs looking after',
        pressure: 'carrying what belongs to someone else',
    },
    7: {
        themeIs: 'reflection is',
        theme: 'reflection',
        want: 'reflection',
        year: [
            'turns toward study, review and a clearer understanding of what matters',
            'is a time for depth, for study, review and thinking things through',
            'puts understanding before output: checking, learning and thinking things through',
        ],
        month: 'turns that inward, toward study, checking and understanding',
        use: 'checking and understanding',
        moreOf: 'more analysis',
        echo: 'the inward, reflective work comes back into focus',
        concentrates: 'understanding comes before output, more than usual',
        tripleList: 'study, depth and careful checking',
        notEvent: 'the day has to be spent alone',
        ready: 'something is already asking to be understood',
        pressure: 'checking that never reaches a conclusion',
    },
    8: {
        themeIs: 'results and accountability are',
        theme: 'results and accountability',
        want: 'a concrete result',
        year: [
            'puts more weight on results, resources and accountability',
            'is about material consequence and the responsibility that comes with results and resources',
            'asks for results that can be measured, and for authority that answers for them',
        ],
        month: 'makes that concrete, putting results, resources and accountability in focus',
        use: 'making something measurable',
        moreOf: 'more pressure for results',
        echo: 'the focus on results is easier to make concrete',
        concentrates: 'the practical consequences of choices are closer to hand',
        tripleList: 'resources, authority and measurable outcomes',
        notEvent: 'a result has to arrive on this day',
        ready: 'something is already ready to be made concrete',
        pressure: 'forcing an outcome',
    },
    9: {
        themeIs: 'completion is',
        theme: 'completion',
        want: 'a proper ending',
        year: [
            'is about completion, finishing what has run its course and releasing what is no longer needed',
            'is a time of completion, of finishing, releasing and seeing the larger picture',
            'asks what has run its course, and what the whole cycle has taught',
        ],
        month: 'gives that a finishing quality, with room for resolving, releasing and seeing the larger picture',
        use: 'finishing and letting go',
        moreOf: 'more clearing out',
        echo: 'the work of completion is easier to carry forward',
        concentrates: 'more of what has run its course is ready to be closed',
        tripleList: 'finishing, release and a wider perspective',
        notEvent: 'something has to end on this day',
        ready: 'something has already run its course',
        pressure: 'clinging to what has already ended',
    },
};
/**
 * A MONTH THAT CONTRASTS WITH ITS YEAR, written for each of the ten ordered
 * pairs - year first. "Inside it" is the year of the sentence before, so the
 * month is heard as working within the year rather than against it, and each
 * says what the month adds without a word about what it does not cancel.
 */
const MONTH_INSIDE = {
    '1-2': 'brings other people into that direction: the aim stays yours, while timing and agreement count for more',
    '2-1': 'asks for a first step of your own, taken with the people around you in mind',
    '3-7': 'turns that expression inward for a while: checking what is shared is what makes it worth sharing',
    '7-3': 'lets some of what has been understood be said or shown',
    '4-5': 'brings flexibility into that structure: adjust what is being built, and keep the foundation',
    '5-4': 'gives the movement a shape: something in the change needs a firm, repeatable form',
    '5-6': 'asks what should stay committed while other things change',
    '6-5': 'loosens the commitments that have become too fixed to help',
    '1-9': 'clears what stands in the way of that direction, finishing what has run its course',
    '9-1': 'lets a first step grow out of what has been cleared',
};
/**
 * A STEADY MONTH, IN A SENTENCE ABOUT ITS YEAR - year first, after "The N
 * month". A 4 or a 6 month gets its own sentence, and a sentence that could
 * sit under any year would be the same line in a tenth of all readings; so
 * each says what structure or care does to THIS year's theme, which the year's
 * sentence has just named. (A 5 year is absent: its 4 and 6 months are
 * contrasts and speak from MONTH_INSIDE.)
 */
const MONTH_STEADY = {
    '1-4': 'gives that direction a working structure: the parts of it that can be made reliable',
    '2-4': 'turns that partnership into structure: who does what, reliably and in order',
    '3-4': 'gives that expression a firmer structure: finished pieces rather than more openings',
    '6-4': 'puts those responsibilities into a reliable, well-kept order, so that care does not depend on memory or mood',
    '7-4': 'turns that understanding into method: notes, procedures and what can be relied on',
    '8-4': 'narrows that into structure: the systems and records a result depends on',
    '9-4': 'puts that completion in order: what is closed properly, one piece at a time',
    '1-6': 'ties that direction to responsibility: who and what it has to look after',
    '2-6': 'turns that cooperation into care: what others rely on, and what needs repairing',
    '3-6': 'ties that expression to responsibility: saying things with care for the people they reach',
    '4-6': 'ties that building to upkeep: repairing and maintaining what already stands',
    '7-6': 'puts that understanding to work for what needs care, repair or upkeep',
    '8-6': 'ties those results to responsibility: whom they serve, and what they have to look after',
    '9-6': 'ties that completion to care: finishing obligations properly and repairing what can still be repaired',
};
/**
 * THE DAY, ACTING ON THE MONTH'S WORK - every ordered pair of different numbers,
 * month first, after "The day's N".
 *
 * "The day", never "today": the Forecast reads whichever date is selected, and
 * on a date browsed in the past or the future "today's 4" names the wrong day.
 * "The day's 4" is true of any selected day and still reads naturally on the
 * real one - the same way "this month" already speaks for the selected month.
 * The day-repeats and day-echo sentences, the short-term headline ("this month
 * and this day") and the not-event denials ("on this day") follow the rule.
 *
 * This is what makes the day part of the reading instead of a third definition.
 * Each entry names what the month is working on - its new start, its shared
 * work, what it is building, its changes - and says what the day's number does
 * with it, in that number's own canonical meaning. The ten contrast pairs are
 * among them, and read as a counterweight working inside the month.
 */
const DAY_ON_MONTH = {
    '1-2': 'brings other people into the month\'s new start: the direction stays yours, and the pace depends more on agreement',
    '1-3': 'makes the month\'s new start visible: say what is beginning, or show someone the first version',
    '1-4': 'gives the month\'s new start a practical footing: one part set up properly, so it can be repeated',
    '1-5': 'leaves room to test the month\'s new direction by another route before committing further',
    '1-6': 'takes care of what the month\'s new start depends on: the people, details and promises around it',
    '1-7': 'is for thinking the month\'s new direction through before it goes further: read, review, compare',
    '1-8': 'gives the month\'s new start a measurable aim, with someone answering for the result',
    '1-9': 'clears what stands in the way of the month\'s new start, finishing what is already done',
    '2-1': 'adds a first step of your own to the month\'s shared work, taken with the people involved in mind',
    '2-3': 'shares where the month\'s joint work stands: say it plainly, or show the others what you have',
    '2-4': 'turns the month\'s agreements into a working method: who does what, and in which order',
    '2-5': 'loosens the month\'s shared arrangements a little, so another way of working together can be tried',
    '2-6': 'turns the month\'s cooperation into care: attending properly to what others are relying on',
    '2-7': 'steps back to understand the month\'s shared work: what is agreed, what is assumed and what needs checking',
    '2-8': 'asks the month\'s shared work for a concrete result: what has been agreed, and who answers for it',
    '2-9': 'finishes part of the month\'s shared work cleanly, with the people involved kept in view',
    '3-1': 'turns the month\'s ideas and drafts into a first concrete step, beyond talking about them',
    '3-2': 'turns what the month is sharing into an exchange: listening to other people\'s responses before saying more',
    '3-4': 'puts what the month is expressing in order: edit, organise and finish one piece properly',
    '3-5': 'tries another route for what the month is sharing: a different form, or different listeners',
    '3-6': 'takes care with what the month is expressing: the people it reaches, and how it lands with them',
    '3-7': 'checks what the month is putting into words before it goes further: what is shared gets better for being reviewed first',
    '3-8': 'turns what the month is sharing toward a concrete result: what it should produce, and who answers for it',
    '3-9': 'brings what the month has been expressing to a finish: one piece completed, one conversation closed',
    '4-1': 'takes the first concrete step on what the month is building, rather than preparing it further',
    '4-2': 'turns what the month is building into shared work: agreement and timing count for more than force',
    '4-3': 'shows what the month is building to someone who needs to see it, or describes it in plain words',
    '4-5': 'brings flexibility into the month\'s structure: adjust what is being built, keep the foundation',
    '4-6': 'maintains what the month is building: repair, upkeep and finishing properly what already stands',
    '4-7': 'checks what the month is building: whether it holds, and whether it still makes sense',
    '4-8': 'asks what the month\'s structure should concretely produce, and who is accountable for it',
    '4-9': 'finishes one part of what the month is building and lets go of what it no longer needs',
    '5-1': 'picks one of the month\'s changes and starts it for real, rather than keeping every option open',
    '5-2': 'brings other people into the month\'s changes, so agreement and timing set the pace',
    '5-3': 'puts the month\'s changes into words: say what is shifting, and why it matters',
    '5-4': 'gives the month\'s changes a firm shape: one part done properly and made repeatable',
    '5-6': 'asks what should stay committed while the month keeps things moving: the people and promises worth holding steady',
    '5-7': 'reviews the month\'s changes before going further: what is working, and what is only movement',
    '5-8': 'turns the month\'s changes toward a measurable result, so the movement adds up to something',
    '5-9': 'finishes what the month\'s changes have made unnecessary, and releases it cleanly so the change has room',
    '6-1': 'starts on one of the month\'s responsibilities: one first concrete step, taken now',
    '6-2': 'turns the month\'s responsibilities into shared work: an agreement about who carries what',
    '6-3': 'gives the month\'s commitments a clear voice: what you take on, and what you do not',
    '6-4': 'puts the month\'s responsibilities in order: one obligation handled properly, start to finish',
    '6-5': 'loosens whichever of the month\'s commitments have become too fixed to help, and leaves the rest in place',
    '6-7': 'steps back to understand the month\'s responsibilities: what is really yours, and what is not',
    '6-8': 'makes the month\'s commitments measurable: what is owed, by whom, and by when',
    '6-9': 'completes one of the month\'s obligations properly and releases one that has run its course',
    '7-1': 'turns the month\'s thinking into a first concrete step: one decision acted on',
    '7-2': 'brings the month\'s thinking into conversation: compare it with other people\'s responses and see what holds',
    '7-3': 'lets some of what the month has understood be said or shown, while it is still fresh',
    '7-4': 'gives the month\'s thinking some order: notes, method, and one part written down properly',
    '7-5': 'brings movement into the month\'s questions: a different source, method or angle',
    '7-6': 'applies the month\'s understanding to what needs care: a repair, an upkeep task, a promise kept',
    '7-8': 'asks what the month\'s thinking should concretely produce: a decision, a figure, a result someone answers for',
    '7-9': 'brings the month\'s study to a finish: what has been understood, and what can be released',
    '8-1': 'takes a first concrete step toward the result the month is focused on',
    '8-2': 'brings other people into the month\'s results: shared credit and clear agreements count for more than pressure',
    '8-3': 'puts the month\'s results into words: what has been achieved, and what is still needed',
    '8-4': 'puts the month\'s resources into practical order: records, method, and one part done properly',
    '8-5': 'looks for another route to the month\'s results: a different way to the same outcome',
    '8-6': 'looks after the people and the upkeep behind the month\'s results, so that they can last',
    '8-7': 'checks the month\'s results before going further: the figures, the assumptions and what it really takes',
    '8-9': 'closes one of the month\'s results cleanly and releases what it no longer needs',
    '9-1': 'starts something small out of what the month has cleared: the new step grows from the ending',
    '9-2': 'brings others into what the month is finishing: an agreement about what ends and how it is handed on',
    '9-3': 'puts what the month is closing into words, clearly and kindly: the message that ends a loop',
    '9-4': 'gives the month\'s finishing work some order: close one thing properly rather than half-closing several',
    '9-5': 'approaches what the month is finishing differently: some of it may only need changing, not ending',
    '9-6': 'finishes the month\'s obligations with care: what is closed is also looked after properly',
    '9-7': 'reviews what the month is finishing: what it taught, and what is worth keeping',
    '9-8': 'takes stock of the month\'s endings: what they produced, and what resources they free up',
};
/**
 * A DAY THAT CONTRASTS WITH ITS YEAR, across a month that stands between them:
 * the day's sentence has just said what the day does, and this says what that
 * means in a year of the opposite pull. Year first. The ninth pair, a 9 year
 * with a 1 day, is the sequence, and has its own sentence.
 */
const YEAR_OVER_DAY = {
    '1-2': 'that cooperation is how the chosen direction gains support',
    '2-1': 'a step of your own works best when it keeps the people around it in view',
    '3-7': 'that closer look is part of the expression: what is shared lands better for having been thought through',
    '7-3': 'saying it aloud is also a way of testing what has been understood',
    '4-5': 'that flexibility is part of the upkeep: adjusting keeps the structure usable',
    '5-4': 'a day of order gives the changes something to stand on',
    '5-6': 'that care keeps the changes from costing what matters',
    '6-5': 'a little movement keeps responsibility from hardening into habit',
    '1-9': 'that clearing is part of the start: the new direction needs the room',
};
/** The short name of a number's theme ("structure", "change"): the same word the composer uses inside its own sentences. For a caller that has to name a layer without re-saying its meaning. */
export const cycleThemeEn = (n) => WORDS[n].theme;
const phrase = (text, month) => text[phrasingFor(month)];
const capitalise = (text) => text.charAt(0).toUpperCase() + text.slice(1);
/** "a 5", but "an 8". */
const article = (n) => (n === 8 ? 'an' : 'a');
export const TEMPORAL_VOICE_EN = (sentence) => {
    switch (sentence.kind) {
        case 'concentration':
            return `The year, the month and the day all carry the ${sentence.n}, so ${WORDS[sentence.n].themeIs} `
                + `unusually concentrated: ${WORDS[sentence.n].tripleList} receive more emphasis than usual.`;
        case 'not-event':
            return `This does not mean ${WORDS[sentence.n].notEvent}; it means that if ${WORDS[sentence.n].ready}, all three clocks point the same way.`;
        case 'watch':
            return sentence.doubled
                ? `With the ${sentence.n} theme doubled, the thing to watch is ${WORDS[sentence.n].pressure}.`
                : `The thing to watch is ${WORDS[sentence.n].pressure}.`;
        case 'short-term-headline':
            return `${capitalise(WORDS[sentence.year].themeIs)} the year's theme, but this month and this day both ask for ${WORDS[sentence.month].want}.`;
        case 'year':
            return `Your ${sentence.year} year ${phrase(WORDS[sentence.year].year, sentence.month)}.`;
        case 'year-month':
            return `Your ${sentence.year} year ${phrase(WORDS[sentence.year].year, sentence.month)}, `
                + `${sentence.link} the ${sentence.month} month ${WORDS[sentence.month].month}.`;
        case 'month':
            return `The ${sentence.month} month ${MONTH_STEADY[pairKey(sentence.year, sentence.month)]}.`;
        case 'month-inside':
            return `Inside it, the ${sentence.month} month ${MONTH_INSIDE[pairKey(sentence.year, sentence.month)]}.`;
        case 'month-repeats':
            return `This month repeats the ${sentence.month}, which concentrates the year's theme: ${WORDS[sentence.month].concentrates}.`;
        case 'day':
            return `The day's ${sentence.day} ${DAY_ON_MONTH[pairKey(sentence.month, sentence.day)]}.`;
        case 'day-repeats':
            return `The day repeats that ${sentence.day} theme, which makes this a clearer point in the month for `
                + `${WORDS[sentence.day].use} than for ${WORDS[sentence.year].moreOf}.`;
        case 'day-echo':
            return `The day's ${sentence.day} matches the year, so for one day ${WORDS[sentence.day].echo}.`;
        case 'day-continues':
            return `It ${DAY_ON_MONTH[pairKey(sentence.month, sentence.day)]}.`;
        case 'year-day':
            return `In ${article(sentence.year)} ${sentence.year} year, ${YEAR_OVER_DAY[pairKey(sentence.year, sentence.day)]}.`;
        case 'sequence':
            return `Symbolically, the sequence moves from completion through ${WORDS[sentence.month].theme} toward initiation.`;
    }
};
