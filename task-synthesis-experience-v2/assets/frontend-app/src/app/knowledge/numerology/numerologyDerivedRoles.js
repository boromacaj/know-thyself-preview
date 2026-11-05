import { assertComplete, attitudeUnit, balanceUnit, BIRTH_DAY_NUMBERS, birthdayUnit, conceptUnit, CORE_NUMBERS, maturityUnit, SINGLE_DIGITS, } from './numerologyAuthoring.js?v=53c0693';
/**
 * THE FOUR DERIVED POSITIONS: BIRTH DAY, MATURITY, BALANCE, ATTITUDE.
 *
 * Each is calculated from something the core positions already used, and each
 * asks a question none of them asks. Written apart because the commonest failure
 * in a numerology reading is a minor position quietly repeating a major one.
 *
 *   BIRTH DAY   the day of the month, reduced. ONE AVAILABLE TALENT - a specific
 *               gift you can reach for, not a second Life Path.
 *   MATURITY    Life Path + Expression. INTEGRATION - what the terrain and the
 *               toolkit tend to resolve into once both are known, traditionally
 *               from the middle of life.
 *   BALANCE     the initials of the birth name. RESPONSE UNDER STRESS - what you
 *               reach for when the ordinary approach has stopped working.
 *   ATTITUDE    birth month + birth day. FIRST APPROACH - how a new situation is
 *               met in the opening seconds, before anything is known about it.
 *
 * Balance and Attitude in particular are frequently misread as general character
 * descriptions. They are not, and every entry below is written to stay inside
 * its own question.
 *
 * 7 is written in numerologyRoles.ts for the Birth Day and is not repeated.
 */
/* ------------------------------------------------------------------ *
 * BIRTH DAY - one available talent
 * ------------------------------------------------------------------ */
const birthDay = [
    birthdayUnit({
        key: '1',
        headline: 'A talent for the standing start.',
        core: [
            'The Birth Day number is the day of the month you were born, and it is the smallest of the core positions: one clear gift rather than a whole direction. A 1 here gives you the ability to begin without a run-up. Without a warm-up, a plan or somebody else going first, you can simply start, and the starting comes easily.',
            'It is a modest-sounding talent with a large practical value, because most things fail at the beginning rather than in the middle. The only thing to watch is proportion: applied to a situation that needed a moment of consideration, the same instinct produces a decision that was made before the question was understood.',
        ],
    }),
    birthdayUnit({
        key: '2',
        headline: 'A talent for reading the room correctly the first time.',
        core: [
            'A 2 Birth Day gives you an immediately available social accuracy. You can walk into an unfamiliar situation and know within a minute who is uncomfortable, what has just been argued about, and which person actually decides - and the reading is usually right, which is what makes it a talent rather than an anxiety.',
            'Used deliberately it is worth a great deal in any situation where the stated agenda is not the real one. The proportion to watch is that a fine instrument applied constantly reports on situations that do not need reporting on, and living inside a permanent stream of social data is tiring in a way that is hard to explain.',
        ],
    }),
    birthdayUnit({
        key: '3',
        headline: 'A talent for saying it in a form people will take in.',
        core: [
            'A 3 Birth Day gives you a reliable knack for expression on demand. Asked to explain something with no preparation, you find the phrasing that lands, and the finding happens fast enough that it does not feel like work. This is the position that produces people who are good in the moment rather than good on paper.',
            'It is genuinely useful and it is one gift rather than a temperament. The thing to watch is that fluency can outrun understanding: it is entirely possible to explain something clearly and beautifully that you have not thought through, and the audience will not catch it because the delivery was good.',
        ],
    }),
    birthdayUnit({
        key: '4',
        headline: 'A talent for making a thing orderly.',
        core: [
            'A 4 Birth Day gives you an available instinct for structure. Handed a mess, you can see the arrangement that would fix it, and the seeing does not require effort or a methodology - it is simply obvious to you where the pieces should go.',
            'This gets used constantly and thanked rarely, because a well-organised thing looks as though it was never disorganised. The proportion to watch is applying it where the disorder was doing something useful: some situations are messy because they are still forming, and tidying those early can close them prematurely.',
        ],
    }),
    birthdayUnit({
        key: '5',
        headline: 'A talent for being useful in an unfamiliar situation.',
        core: [
            'A 5 Birth Day gives you immediate adaptability. Dropped somewhere you have never been, with people you do not know and a problem nobody briefed you on, you become functional quickly, and you do it without much visible discomfort.',
            'It is the single most portable of the Birth Day talents, and the proportion to watch is a preference for the unfamiliar over the finished. The same instinct that makes you good in a new situation makes the twentieth week of a known one feel considerably longer than it is.',
        ],
    }),
    birthdayUnit({
        key: '6',
        headline: 'A talent for noticing what somebody needs.',
        core: [
            'A 6 Birth Day gives you an immediately available attentiveness to other people\'s state. You register that somebody in the room is struggling before they have said so and often before they have admitted it to themselves, and you generally know what would actually help rather than what would look helpful.',
            'This is the talent behind a great deal of quiet competence in teams and families. The proportion to watch is that noticing creates a sense of obligation, and a 6 Birth Day can end up carrying a great many small responsibilities simply because it was the first to see them.',
        ],
    }),
    birthdayUnit({
        key: '8',
        headline: 'A talent for seeing what a situation actually costs.',
        core: [
            'An 8 Birth Day gives you an available realism about resources and consequence. You can look at a plan and see quickly what it will take, who will end up carrying it and whether the numbers work, and you tend to be right in a way that is mildly deflating to everybody else in the room.',
            'It is a valuable corrective in any group that runs on enthusiasm. The proportion to watch is timing: the same accurate assessment delivered in the first five minutes of somebody\'s idea kills things that would have been worth developing, and delivered in week three it saves the project.',
        ],
    }),
    birthdayUnit({
        key: '9',
        headline: 'A talent for taking the wider view without being asked.',
        core: [
            'A 9 Birth Day gives you an immediately available sense of proportion. In the middle of a dispute you can see how it will look in a year, whose position has merit besides your own, and what is actually at stake as against what is being argued about, and the seeing arrives without deliberation.',
            'It makes you good at defusing things and easy to overlook. The proportion to watch is that a talent for perspective can be used to skip past a feeling that deserved to be had, in yourself as much as in anybody else.',
        ],
    }),
    birthdayUnit({
        key: '11',
        headline: 'A talent for picking up what has not been said.',
        core: [
            'An 11 Birth Day is one of the two master values a day of the month can produce, and it gives you an available sensitivity rather than a preserved destiny. You register the undercurrent in a conversation - the thing being avoided, the mood underneath the words - quickly and without trying.',
            'It is a genuine instrument and it is smaller in scope than an 11 in a core position: one talent you can reach for, not a whole way of living. The proportion to watch is acting on the impression before checking it, which is where an accurate faculty most often produces an inaccurate result.',
        ],
    }),
    birthdayUnit({
        key: '22',
        headline: 'A talent for seeing how a large thing would actually be built.',
        core: [
            'A 22 Birth Day is the other master value available from a day of the month, and it gives you a specific practical gift: shown something ambitious, you can see the concrete sequence that would make it real. Not the vision, which is the easier half, but the ordering of the work.',
            'This is more useful than it sounds, and it is one talent rather than a mandate to build cathedrals. The proportion to watch is over-scaling a small request: asked to organise something modest, this instinct will produce a plan considerably larger than the occasion required.',
        ],
    }),
];
/* ------------------------------------------------------------------ *
 * MATURITY - what the Life Path and Expression resolve into
 * ------------------------------------------------------------------ */
const maturity = [
    maturityUnit({
        key: '1',
        headline: 'Resolves toward doing it on your own terms.',
        core: [
            'The Maturity number is the Life Path added to the Expression - the terrain plus the toolkit - and the tradition reads it as what the two tend to resolve into once both are well known, usually from somewhere in the middle of life. It is an integration rather than a destiny, and it describes a direction of settling rather than an event.',
            'A 1 Maturity points toward autonomy. Whatever the earlier decades looked like, the later shape of this combination tends to be a person who has stopped waiting for the mandate and simply proceeds - often after a long period of doing it inside somebody else\'s structure. The characteristic later-life move is going independent, in whatever form that takes.',
        ],
    }),
    maturityUnit({
        key: '2',
        headline: 'Resolves toward working with rather than at.',
        core: [
            'Maturity is Life Path plus Expression, read as what the two settle into once the earlier friction between them has been worked through. A 2 here points toward partnership. The later shape of this combination is characteristically less solitary and less forceful than the earlier one, and the change is usually experienced as relief rather than as compromise.',
            'What it does not mean is a loss of capability. The tradition reads the resolution as a change in method - the same objectives approached through other people rather than around them - which often means more gets done, with less strain, than was managed alone.',
        ],
    }),
    maturityUnit({
        key: '3',
        headline: 'Resolves toward saying what you have learned.',
        core: [
            'Maturity is the Life Path added to the Expression, read as the integration the two arrive at with time. A 3 here points toward expression: the later shape of this combination usually involves communicating the substance the earlier decades accumulated, whether by teaching, writing, making, or simply becoming the person who says the thing that has gone unsaid.',
            'The specific pleasure of this resolution is that the material is already there. A 3 Maturity does not have to find something to say, which is why it so often arrives as an unexpected second career in an expressive form - and why it goes badly only where the person concludes that they have left it too late.',
        ],
    }),
    maturityUnit({
        key: '4',
        headline: 'Resolves toward building something that will hold.',
        core: [
            'The Maturity number reads the Life Path and Expression as one combined direction, traditionally emerging in the middle of life. A 4 here points toward consolidation: the later shape of this combination is characteristically about making solid what was previously improvised, and about the satisfaction of an arrangement that no longer needs constant attention.',
            'For someone whose earlier decades were mobile, this can feel at first like a narrowing. It generally is not. The tradition reads it as the point at which accumulated experience becomes a structure rather than a collection, and the strongest resistance to it can turn out to be a measure of how much it was wanted.',
        ],
    }),
    maturityUnit({
        key: '5',
        headline: 'Resolves toward freedom, often later than expected.',
        core: [
            'Maturity is Life Path plus Expression, read as where the two settle. A 5 here is one of the more surprising resolutions, because it points the later part of life toward movement rather than toward rest: the characteristic pattern is a person who was responsible and rooted through the middle decades and becomes noticeably more mobile afterwards.',
            'This is worth naming in advance, because from inside it can look like a crisis. A 5 Maturity is not a failure to have settled; it is the reading that the settling was the earlier phase, and that what follows is meant to be looser than what came before.',
        ],
    }),
    maturityUnit({
        key: '6',
        headline: 'Resolves toward looking after what you have built.',
        core: [
            'The Maturity number combines the Life Path with the Expression and reads the result as a later-life direction. A 6 here points toward care and custodianship: the characteristic shape is a person who moves from making things to keeping them - mentoring, family, community, the maintenance of something they or somebody else started.',
            'The satisfaction in this resolution is genuine and the risk is the familiar one. Care that arrives as a phase rather than as a temperament can be taken up wholesale and without limits, and a 6 Maturity is worth entering deliberately rather than by drift.',
        ],
    }),
    maturityUnit({
        key: '7',
        headline: 'Resolves toward understanding rather than doing.',
        core: [
            'Maturity reads the Life Path and Expression together as a single later direction. A 7 here points inward: the characteristic pattern is a shift from activity to comprehension, where the question stops being what to build and becomes what any of it actually meant. It frequently shows up as study taken up seriously in the second half of life.',
            'For an active earlier temperament this can be disorienting, because the withdrawal has no obvious external justification. The tradition reads it as the correct use of accumulated material rather than as a retreat from the world, and following it tends to produce the most considered work afterwards.',
        ],
    }),
    maturityUnit({
        key: '8',
        headline: 'Resolves toward mastery of the material world.',
        core: [
            'The Maturity number is the Life Path plus the Expression, read as the direction the two settle into. An 8 here points toward consequence and command: the characteristic later shape is a person who takes real responsibility for outcomes, often at a scale the earlier decades would not have predicted.',
            'It is one of the more demanding resolutions and one of the more concrete. What it asks for is a willingness to be accountable in public, which is easy to spend the first half of life avoiding, and what it offers is the specific satisfaction of a result that would not have existed otherwise.',
        ],
    }),
    maturityUnit({
        key: '9',
        headline: 'Resolves toward the wider view and toward letting go.',
        core: [
            'Maturity combines the Life Path and the Expression into a single later direction. A 9 here points toward the general: the characteristic shape is a widening, where personal ambition loosens its grip and attention moves toward what serves more people than yourself, often alongside a marked increase in the ability to release things.',
            'Both halves of that are real and the second is the harder one. A 9 Maturity tends to arrive with endings in it - roles, relationships, versions of a self - and the tradition is explicit that the widening depends on the letting go rather than merely coinciding with it.',
        ],
    }),
    maturityUnit({
        key: '11',
        headline: 'Resolves toward trusting what you already perceive.',
        core: [
            'The Maturity number reads the Life Path and Expression as one integrated direction, and an 11 here has a particular shape: it points toward a heightened receptivity emerging later rather than earlier. The characteristic pattern is a practical person who becomes noticeably more intuitive with age, and who is initially embarrassed about it.',
            'The tradition reads this as the earlier decades having built the calibration that makes the faculty usable. An 11 Maturity is not a late-arriving mysticism; it is perception that finally has enough experience behind it to be trusted, which is exactly why it arrives when it does.',
        ],
    }),
    maturityUnit({
        key: '22',
        headline: 'Resolves toward building at a scale the earlier life was preparing for.',
        core: [
            'Maturity is the Life Path added to the Expression, read as a later direction. A 22 here is the most demanding of the resolutions: it points toward a build large enough that it could only be attempted with the accumulated competence of the earlier decades behind it.',
            'The preceding period can look like an apprenticeship, though usually only in retrospect. The risk specific to this resolution is starting too late by waiting to feel ready, which for a 22 never quite happens; the tradition is clear that the readiness was the earlier life, and that the signal to begin is age rather than confidence.',
        ],
    }),
    maturityUnit({
        key: '33',
        headline: 'Resolves toward care given past the circle of obligation.',
        core: [
            'The Maturity number combines the Life Path and Expression into a single later-life direction, and a 33 here points toward service in the widest sense: care offered to people who have no claim on it, at a scale that the earlier decades would probably have found impractical. It is the widest of the twelve resolutions and the one that most depends on having built something to give from.',
            'What makes this a resolution rather than a burden is that it usually arrives with the means to sustain it - the standing, the skill, the freed time. The failure mode is the familiar one for this number, which is a capacity taken up without limits, and the correction is equally familiar: it works when it is chosen and it corrodes when it is compulsive.',
        ],
    }),
];
/* ------------------------------------------------------------------ *
 * BALANCE - what you reach for under stress
 * ------------------------------------------------------------------ */
const balance = [
    balanceUnit({
        key: '1',
        headline: 'Under pressure: takes hold of it alone.',
        core: [
            'The Balance number comes from the initials of the birth name and it answers one narrow question: what you reach for when the ordinary approach has stopped working. It is not a description of your personality, and reading it as one is the commonest way this position gets misused.',
            'A 1 Balance means the instinct under stress is to take control and to do it yourself. Constructively that is decisiveness at exactly the moment a group has frozen, which is genuinely valuable. Overused it is a refusal of help precisely when help was available, and a tendency to convert a shared difficulty into a solitary one without discussing it.',
        ],
    }),
    balanceUnit({
        key: '2',
        headline: 'Under pressure: reaches for the other person.',
        core: [
            'The Balance number describes the strategy you fall back on when things are not working, drawn from the initials of the birth name. It says nothing about how you are day to day, only about what happens when the usual approach fails.',
            'A 2 Balance reaches for connection: talk it through, restore the relationship, get somebody alongside. Used well this defuses more situations than any amount of force, because most crises are made worse by isolation. Overused it becomes reassurance-seeking that postpones the decision, and a habit of talking about a problem as a substitute for acting on it.',
        ],
    }),
    balanceUnit({
        key: '3',
        headline: 'Under pressure: talks, and lightens it.',
        core: [
            'The Balance number is read only for stress response - what you reach for when the normal approach has stopped working - and is drawn from the initials of the birth name. It is a narrow position and it is worth keeping narrow.',
            'A 3 Balance responds by expressing: saying it out loud, finding the joke, getting the feeling into words. Constructively this releases pressure fast and keeps a difficult room from seizing up. Overused it is deflection, and it can turn a serious moment into a lighter one before anybody has finished having it, which is a specific cost to the people present.',
        ],
    }),
    balanceUnit({
        key: '4',
        headline: 'Under pressure: makes a list and works the problem.',
        core: [
            'The Balance number, drawn from the initials of the birth name, describes only the instinctive strategy under stress. A 4 here means you respond to difficulty by imposing order: break it down, sequence it, deal with the first item.',
            'This is one of the most reliably effective responses available, because most crises are less overwhelming once they are enumerated. Overused it becomes an escape into method, where the sorting and the planning continue past the point of usefulness because they feel productive and the actual difficulty is not something a list can address.',
        ],
    }),
    balanceUnit({
        key: '5',
        headline: 'Under pressure: changes the situation.',
        core: [
            'The Balance number describes the fallback strategy when the ordinary approach has failed, and it is drawn from the initials of the birth name rather than from anything about your character in general. Read any wider than that and it stops describing anything real.',
            'A 5 Balance responds by altering the conditions: move, switch approach, leave, try something completely different. Used well this breaks deadlocks that patience would not have broken. Overused it is escape - the situation gets changed rather than resolved, and the same difficulty reassembles somewhere else with different people in it.',
        ],
    }),
    balanceUnit({
        key: '6',
        headline: 'Under pressure: looks after everybody else.',
        core: [
            'Drawn from the initials of the birth name, the Balance number answers only the question of what you reach for when things have stopped working. It is a stress response, not a personality, and this particular value gets confused with the latter more than any other.',
            'A 6 Balance responds to difficulty by attending to the people in it. Constructively this holds a group together through something bad, and it is often the reason the group survives at all. Overused it is a way of not attending to your own position, and a 6 Balance can manage everybody else through a crisis and emerge from it entirely unprocessed.',
        ],
    }),
    balanceUnit({
        key: '7',
        headline: 'Under pressure: withdraws to work it out.',
        core: [
            'The Balance number is the stress-response position, drawn from the initials of the birth name. A 7 here means the instinct when things go wrong is to go quiet and think, and the withdrawal is functional rather than sulky, whatever it looks like from outside.',
            'Constructively it produces the clearest analysis available of what actually happened, which is worth a great deal. Overused it removes you from the room at the moment your presence mattered most, and the people left behind read the silence as judgement or abandonment rather than as processing.',
        ],
    }),
    balanceUnit({
        key: '8',
        headline: 'Under pressure: takes charge and drives at the outcome.',
        core: [
            'The Balance number describes only the fallback strategy under stress, drawn from the initials of the birth name. An 8 here means that when the ordinary approach fails you reach for control of the outcome: decide, direct, and take responsibility for the result.',
            'In a genuine emergency this is often exactly right, and people are usually relieved that somebody has done it. Overused it becomes force applied to a situation that needed patience, and a habit of treating other people as obstacles to the result rather than as participants in it.',
        ],
    }),
    balanceUnit({
        key: '9',
        headline: 'Under pressure: widens the frame.',
        core: [
            'Drawn from the initials of the birth name, the Balance number answers the narrow question of what you reach for when things stop working. A 9 here means the instinct is to pull back and take the longer view: how much will this matter, what does it look like from the other side. That is a fallback strategy rather than a general disposition, and it appears specifically when the ordinary approach has stopped working.',
            'Constructively this is a real form of composure, and it prevents a great many overreactions. Overused it is a way of declining to have the feeling, and a 9 Balance can put a situation into perspective so quickly that the perspective becomes an evasion of the specific thing that just happened.',
        ],
    }),
];
/* ------------------------------------------------------------------ *
 * ATTITUDE - the first approach
 * ------------------------------------------------------------------ */
const attitude = [
    attitudeUnit({
        key: '1',
        headline: 'First approach: move, then find out.',
        core: [
            'The Attitude number pairs the birth month with the birth day, and it describes the opening seconds of a new situation - the reflex before anything is known. It is close to the Personality in territory and different in kind: the Personality is what others see, and the Attitude is what you actually do first.',
            'A 1 Attitude acts. Presented with something new the reflex is to make a move and read the response, which gets you information faster than deliberation would and occasionally commits you to a position you had not chosen. The common misread is arrogance; the reality is usually that you have not yet formed a view and are gathering one by pushing.',
        ],
    }),
    attitudeUnit({
        key: '2',
        headline: 'First approach: wait, and read the room.',
        core: [
            'The Attitude number describes how you meet a new situation in the first moments, before anything about it is known. It comes from the birth month plus the birth day and is distinct from the Personality, which is the impression you make rather than the move you make.',
            'A 2 Attitude waits. The reflex is to take in the room, work out the shape of it and let somebody else declare first, which produces an accurate initial read and a slow start. The common misread is passivity or a lack of opinion, when what is actually happening is data collection.',
        ],
    }),
    attitudeUnit({
        key: '3',
        headline: 'First approach: talk to it.',
        core: [
            'The Attitude number is birth month plus birth day and it describes the opening reflex in an unfamiliar situation. It is worth distinguishing from the Personality: that is what people see, this is what you find yourself doing.',
            'A 3 Attitude engages verbally. The reflex is to start a conversation, make the joke, get people talking - which warms a cold room faster than anything else and can look, to a serious audience, like you have not registered the seriousness. Usually you have; talking is simply how you take the temperature.',
        ],
    }),
    attitudeUnit({
        key: '4',
        headline: 'First approach: find out how it works.',
        core: [
            'The Attitude number, from the birth month and birth day, describes the first move rather than the impression made. A 4 here means the opening reflex is structural: what are the rules here, who does what, where does this sit.',
            'This produces a solid footing quickly, at the cost of a slightly slower start. The common misread is rigidity or a lack of imagination, when in fact the mapping is what makes the later improvisation possible.',
        ],
    }),
    attitudeUnit({
        key: '5',
        headline: 'First approach: look for what is different about this one.',
        core: [
            'The Attitude number describes the reflex in the opening moments of a new situation, drawn from the birth month and birth day. It is not the impression you give, which is the Personality; it is the move you make before you have decided to make one.',
            'A 5 Attitude scans for novelty. The reflex is to find the part of this that is unlike anything you have seen, which makes you quick to engage with genuinely new situations and visibly less interested in familiar ones. The common misread is restlessness, when what is happening is a search for the thing worth paying attention to.',
        ],
    }),
    attitudeUnit({
        key: '6',
        headline: 'First approach: check who needs something.',
        core: [
            'From the birth month plus the birth day, the Attitude number describes the opening reflex rather than the outward impression. A 6 here means the first thing you register in a new situation is the state of the people in it. That is the move you make rather than the impression you give, which is what the Personality number describes.',
            'The reflex is to find the person who is struggling and address that before addressing the agenda, which makes you immediately useful and can mean you engage with a situation on a personal basis when it was actually a technical one. The common misread is that you are not focused on the task; usually you have simply prioritised differently.',
        ],
    }),
    attitudeUnit({
        key: '7',
        headline: 'First approach: hold back and observe.',
        core: [
            'The Attitude number describes the first move in a new situation, from the birth month and birth day. A 7 here means the reflex is to say nothing and watch - not out of caution exactly, but because a first impression formed too quickly is a first impression you will have to correct.',
            'The result is that your first contribution tends to arrive late and to be accurate when it does. The common misread is disengagement or superiority, and it is worth pre-empting with a single sentence early, because the silence will otherwise be interpreted for you, and not always favourably.',
        ],
    }),
    attitudeUnit({
        key: '8',
        headline: 'First approach: work out who decides.',
        core: [
            'The Attitude number comes from the birth month plus the birth day and describes the opening reflex rather than the impression given. An 8 here means the first thing you establish in a new situation is where the authority sits and what is actually at stake.',
            'This is efficient and frequently correct, and it means you engage with the real structure of a situation rather than its stated one. The common misread is that you are calculating or political; the more accurate description is that you are unwilling to invest effort until you know whether it can land.',
        ],
    }),
    attitudeUnit({
        key: '9',
        headline: 'First approach: place it in a larger picture.',
        core: [
            'The Attitude number describes the reflex in the first moments of a new situation, drawn from birth month plus birth day. A 9 here means the opening move is contextual: what kind of situation is this, what does it resemble, what is it part of. That is the move rather than the impression it creates, which is the territory of the Personality number.',
            'This gives you a broad initial grasp and a slightly detached first contact. The common misread is that you are not taking the specifics seriously, when what is actually happening is that you are locating them before engaging with them.',
        ],
    }),
];
export const NUMEROLOGY_DERIVED_ROLES = [
    ...birthDay, ...maturity, ...balance, ...attitude,
    conceptUnit({
        key: 'compound-birth-day',
        label: 'The unreduced birth day',
        headline: 'Why the reading names two numbers for one day of the month.',
        core: [
            'The Birth Day position is read twice in most schools: once as the day itself and once as its reduction. Somebody born on the 28th carries both the 28 and the 1 it reduces to, and the tradition treats the compound as a flavour on the root rather than as a separate position - a 28 is a 1 that arrived through a 2 and an 8, which reads as initiative with a relational and material history behind it.',
            'This reading resolves the reduced value, because that is the value every other position is calculated against and the one with a written interpretation. The unreduced day is preserved in full in the technical section, along with the reduction path, so nothing is lost - and where the day is 11 or 22 it is kept as a master number and the reading follows.',
        ],
    }),
];
assertComplete('Birth Day', BIRTH_DAY_NUMBERS.filter((key) => key !== '7'), birthDay);
assertComplete('Maturity', CORE_NUMBERS, maturity);
/* Balance and Attitude reduce master numbers (methodology contract), so the
   nine digits are the whole reachable set. */
assertComplete('Balance', SINGLE_DIGITS, balance);
assertComplete('Attitude', SINGLE_DIGITS, attitude);
