import { assertComplete, CHALLENGE_NUMBERS, CHAPTER, challengeUnit, conceptUnit, CORE_NUMBERS, PINNACLE_POSITIONS, pinnacleUnit, } from './numerologyAuthoring.js';
/**
 * THE FOUR CHAPTERS: PINNACLES AND CHALLENGES.
 *
 * A Pinnacle is a stretch of years rather than a part of a character, which is
 * why it needs its own role: a 6 read as a Life Path describes a person, and a 6
 * read as a Pinnacle describes what a decade is about. The Challenge of the same
 * position runs alongside it and describes the pressure inside that same stretch.
 *
 * POSITION IS NOT A LABEL.
 *
 * The brief for this pass is explicit and correct: a first Pinnacle 8 is not a
 * fourth Pinnacle 8 with a different age range printed above it. The first
 * chapter runs from birth, so its material arrives before there is anyone to
 * meet it; the fourth runs to the end and has the whole of the earlier life
 * behind it. Every Pinnacle below therefore carries four authored overlays, one
 * per position, and a test asserts that no two positions produce the same text.
 *
 * WHAT A CHALLENGE NUMBER CAN BE.
 *
 * The classical answer is 0-8, because the classical method reduces the month,
 * day and year to single digits before subtracting. This engine preserves master
 * numbers in those parts - November reduces to 11, the 22nd to 22 - so the
 * subtraction can produce up to 21. A birth on 22 January gives a First
 * Challenge of 21. Full readings are written for 0-9 and 11; anything higher
 * resolves to its own reduced root and carries the note below explaining where
 * the master component came from. Nothing is invented and nothing disappears.
 */
/* ------------------------------------------------------------------ *
 * THE FOUR POSITIONS, AS FRAMES
 * ------------------------------------------------------------------ */
const positionFrames = [
    conceptUnit({
        key: 'pinnacle-position-first',
        label: 'The first chapter',
        headline: 'From birth into adult life: the material you did not choose.',
        core: [
            'The first Pinnacle runs from birth to thirty-six minus the single digit of your Life Path - a master Life Path counts as its digit, so 11 as 2, 22 as 4 and 33 as 6 - which makes it by far the longest of the chapters with a fixed end, and the only one that includes the years before you had any say in it. Its theme arrives as environment rather than as opportunity - it is the water of your first years, and it tends to feel like the way things are rather than like a chapter with a shape.',
            'Because of that, the first Pinnacle tends to be the last one to be recognised. Its influence is easiest to see in what you assume is normal, and the useful question is not what this chapter gave you but what it taught you to expect. It ends late enough that a great deal of adult life falls inside it.',
        ],
        provenance: CHAPTER,
    }),
    conceptUnit({
        key: 'pinnacle-position-second',
        label: 'The second chapter',
        headline: 'Nine years of establishing: the theme becomes something you are doing.',
        core: [
            'The second Pinnacle covers the nine years after the first ends, typically somewhere between the late twenties and the mid-forties. Its theme is met as an adult with resources, which changes everything about how it lands: this is the first chapter you can actually respond to rather than simply absorb.',
            'It is characteristically the most effortful of the four. The material of this chapter usually shows up as work - a role taken on, a commitment made, a demand that arrives whether or not it is convenient - and the tradition reads it as the stretch where a life takes the shape it will keep for a while.',
        ],
        provenance: CHAPTER,
    }),
    conceptUnit({
        key: 'pinnacle-position-third',
        label: 'The third chapter',
        headline: 'Nine years of consequence: the earlier decisions come due.',
        core: [
            'The third Pinnacle is the nine years following the second, and it is the chapter where the previous two produce their results. Its theme tends to arrive as a familiar subject returning rather than as something new, and it carries the accumulated weight of what was built or avoided during the second.',
            'It is the shortest-feeling of the four and frequently the most decisive. The tradition reads it as the stretch where a person either consolidates what the second chapter started or has to deal seriously with what it did not, and the difference between those two is usually visible from outside long before it is admitted from inside.',
        ],
        provenance: CHAPTER,
    }),
    conceptUnit({
        key: 'pinnacle-position-fourth',
        label: 'The fourth chapter',
        headline: 'The open-ended last chapter: the theme with the whole life behind it.',
        core: [
            'The fourth Pinnacle begins where the third ends and does not close. It is the only open-ended chapter, and its theme is met by someone who has already been through three others - which means the same number that would have been overwhelming at twelve is, here, something you have equipment for.',
            'The tradition reads this chapter as the one where a life states what it was about. It is not a summary and it is not a reward; it is a final long stretch with its own subject, and the material that has been avoided in the earlier three has a way of turning up in it.',
        ],
        provenance: CHAPTER,
    }),
];
/* ------------------------------------------------------------------ *
 * PINNACLES
 * ------------------------------------------------------------------ */
const POSITION_LABEL = {
    first: 'the first chapter',
    second: 'the second chapter',
    third: 'the third chapter',
    fourth: 'the fourth chapter',
};
/** Authored per number, per position. Never generated. */
function positioned(key, prose) {
    return PINNACLE_POSITIONS.map((position) => ({
        id: `numerology.pinnacle-${key}.${position}`,
        condition: `A ${key} Pinnacle falling in ${POSITION_LABEL[position]}.`,
        applies: (context) => context.chapterPosition === position,
        /* Priority 10: position is the primary determinant of how a chapter reads,
           weighed before anything else that might qualify it. */
        priority: 10,
        effect: 'weave-after-core',
        prose: [prose[position]],
        provenance: CHAPTER,
    }));
}
const pinnacles = [
    pinnacleUnit({
        key: '1',
        headline: 'A chapter about starting something of your own.',
        core: [
            'A 1 Pinnacle sets a stretch of years whose subject is initiation and self-direction. The characteristic experience is that circumstances stop supporting the arrangement you were in and start rewarding the thing you set up yourself, often before you feel prepared for it.',
            'The opportunity in this chapter is genuine independence, and the pressure that comes with it is that support thins out. What this stretch tends to punish is waiting for permission, and what it rewards is a decision made on incomplete information and then stood behind.',
        ],
        overlays: positioned('1', {
            first: 'Arriving from birth, a 1 chapter puts self-reliance at the start of life, before there is any real choice about it. What the theme tends to ask of the early years is working things out alone and trusting your own judgement early, and the habit can form so young that it feels like simply the way things are rather than a theme with a shape.',
            second: 'In the establishing chapter, a 1 typically arrives as the point where you stop working inside somebody else\'s structure. It is the classic decade for going independent, and the pressure is that support tends to thin out just when you are least established.',
            third: 'A 1 in the consequence chapter is a late restart, and it is more disruptive than an early one because there is more in place to disrupt. What it asks for is a genuinely new direction in a chapter that would otherwise belong to consolidating, and it tends to open where something has ended.',
            fourth: 'A 1 in the final chapter puts initiation at the end rather than the beginning, which sounds unlikely and is a pattern the tradition knows well. It reads as a new undertaking begun with everything already learned, and it works better than the same move made at twenty-five.',
        }),
    }),
    pinnacleUnit({
        key: '2',
        headline: 'A chapter about working with somebody rather than around them.',
        core: [
            'A 2 Pinnacle sets a stretch of years in which the material comes through relationship. Partnership, collaboration, patience with somebody else\'s timing: this chapter tends to hand you a situation that cannot be resolved by acting alone, however capable you are.',
            'The opportunity is a depth of connection that solitary chapters do not produce. The pressure is that progress is slow and largely outside your control, and the specific frustration of this stretch is watching something you could have finished in a month take a year because it has to be agreed.',
        ],
        overlays: positioned('2', {
            first: 'From birth, a 2 chapter puts attunement at the start: the theme tends to ask for reading other people and adjusting to them early, before there is much choice about it. The sensitivity that develops this way is genuine, and knowing that it was practised before it was chosen helps later, when it operates automatically.',
            second: 'In the establishing chapter, a 2 typically arrives as a close partnership that shapes the decade, personal or professional, and becomes the frame everything else fits into. The pressure is that your own trajectory becomes negotiable in a way it was not before.',
            third: 'A 2 in the consequence chapter is where the collaborations of the earlier years present their accounts. It reads as a stretch requiring real diplomacy - relationships that need renegotiating rather than starting, and a good deal of patience with people you cannot simply leave.',
            fourth: 'A 2 in the final chapter puts companionship at the centre of the last long stretch. It is one of the gentler fourth Pinnacles and its risk is the opposite of the usual one: a life that becomes so thoroughly shared that the individual thread in it goes quiet.',
        }),
    }),
    pinnacleUnit({
        key: '3',
        headline: 'A chapter about expression, and about being seen doing it.',
        core: [
            'A 3 Pinnacle sets a stretch of years whose subject is putting something out. Creative work, communication, visibility, social life: the material of this chapter arrives through what you make and who receives it, and the years tend to be livelier than those on either side.',
            'The opportunity is fluency and a widening circle. The pressure is scatter - a chapter this generative produces more openings than can be pursued, and the characteristic regret afterwards is not that nothing happened but that too much did, none of it finished.',
        ],
        overlays: positioned('3', {
            first: 'From birth, a 3 chapter puts expression at the start, and the theme tends to ask for it early: saying, showing and making things for other people to see. It can produce an easy relationship with performance and a corresponding difficulty later, when a talent that came easily meets a situation that requires craft.',
            second: 'In the establishing chapter, a 3 typically arrives as the decade when the work becomes public. It is the classic stretch for a creative career to find its audience, and the pressure is the volume of opportunity - saying yes to everything is the standard and expensive mistake.',
            third: 'A 3 in the consequence chapter often reads as a second wind, arriving after a serious stretch. What tends to happen is that accumulated substance finally finds a form, and the expression is better than it would have been earlier precisely because there is now something to say.',
            fourth: 'A 3 in the final chapter puts expression at the end, which the tradition reads generously and accurately: this is the pattern behind late books, late teaching, late performance. The material is already there and the chapter supplies the appetite to hand it over.',
        }),
    }),
    pinnacleUnit({
        key: '4',
        headline: 'A chapter about building the thing that has to hold.',
        core: [
            'A 4 Pinnacle sets a stretch of years dominated by work and structure. Whatever else is happening, the recurring subject is what has to be built, maintained or made reliable, and the chapter tends to be measured afterwards by what is still standing rather than by how it felt at the time.',
            'The opportunity is that this is the chapter where things actually get made. The pressure is weight: a 4 stretch asks for sustained effort with slow visible return, and the characteristic difficulty is a growing sense that life has become mostly obligation.',
        ],
        overlays: positioned('4', {
            first: 'From birth, a 4 chapter puts structure and effort at the start, and the theme tends to ask for steadiness and application early, sometimes before it feels fair to ask. It can produce genuine capability and a lasting assumption that things have to be worked for.',
            second: 'In the establishing chapter, a 4 typically arrives as the decade of building: the career foundation, the mortgage, the institution, the family logistics. It is the most laborious of the second Pinnacles and it produces the most durable results, usually at some cost to everything else in the diary.',
            third: 'A 4 in the consequence chapter is where the structure gets tested. The material tends to be maintenance rather than construction - something built earlier now requires serious repair - and the pressure is that this is unglamorous work at an age when it can feel as if you should be past it.',
            fourth: 'A 4 in the final chapter puts consolidation at the end. It reads as putting affairs genuinely in order: the estate, the archive, the arrangement that will function without you. That sounds sombre and in practice it is usually experienced as relief.',
        }),
    }),
    pinnacleUnit({
        key: '5',
        headline: 'A chapter about change you did not entirely plan.',
        core: [
            'A 5 Pinnacle sets a stretch of years characterised by movement. Places, roles, people, circumstances: the material of this chapter is variety, and it arrives whether or not it was sought, which is the part people underestimate when they read this number as freedom.',
            'The opportunity is exposure - this chapter puts more into you than a settled one could. The pressure is that nothing accumulates, and the specific risk is arriving at the end with an enormous range of experience and very little that was held long enough to compound.',
        ],
        overlays: positioned('5', {
            first: 'From birth, a 5 chapter puts change at the start, and the theme tends to ask for adaptability early: getting used to new conditions, new faces and new arrangements before any of it is chosen. It can produce adaptability that is genuine and an underlying watchfulness that is easy to leave unmentioned.',
            second: 'In the establishing chapter, a 5 typically arrives as a decade that refuses to settle at the age when settling was expected. It reads as career changes, relocations, or a series of roles that make no obvious sense together and turn out later to have been the education.',
            third: 'A 5 in the consequence chapter is the disruptive one, because it arrives when a life has usually acquired weight. The material is change that has to be absorbed rather than chosen, and the chapter goes well or badly almost entirely according to how much was held too tightly.',
            fourth: 'A 5 in the final chapter puts freedom at the end, which is one of the more enjoyable fourth Pinnacles. It reads as travel, late reinvention, or simply a loosening after decades of obligation - and the risk is a restlessness that never quite lands anywhere.',
        }),
    }),
    pinnacleUnit({
        key: '6',
        headline: 'A chapter about being responsible for other people.',
        core: [
            'A 6 Pinnacle sets a stretch of years whose subject is care and obligation. Family, community, a person who needs looking after, an institution that needs holding together: the material of this chapter arrives as duty, and it tends to arrive whether or not it was invited.',
            'The opportunity is a depth of belonging that other chapters do not offer. The pressure is that the demands are legitimate, which makes them almost impossible to refuse, and the characteristic difficulty is a decade in which your own direction is genuinely on hold.',
        ],
        overlays: positioned('6', {
            first: 'From birth, a 6 chapter puts responsibility for others at the start, and the theme tends to ask for care and attentiveness early, sometimes more than the early years can comfortably carry. It can produce competence and a habit of noticing need, and the role can settle in before anyone asks whether it is wanted, including you.',
            second: 'In the establishing chapter, a 6 typically arrives as a decade of responsibility for others in the broadest sense: the people closest to you, someone who needs looking after, or a team that becomes yours to hold together. It is the most consuming of the second Pinnacles and often the most meaningful.',
            third: 'A 6 in the consequence chapter is the sandwich stretch - obligations above and below at the same time, arriving when your own reserves are already committed. The pressure is real and the compensation is that you are better equipped to handle it than you would have been earlier.',
            fourth: 'A 6 in the final chapter puts care at the end, and it reads more often as chosen than as imposed: mentoring, the next generation, community work, the deliberate use of accumulated capacity. Its risk is a late life entirely defined by other people\'s needs.',
        }),
    }),
    pinnacleUnit({
        key: '7',
        headline: 'A chapter about going quiet and finding out what you think.',
        core: [
            'A 7 Pinnacle sets a stretch of years with an inward tilt. Study, specialisation, reassessment, a period of relative withdrawal: the material of this chapter is understanding rather than achievement, and the outward momentum of the surrounding years tends to slow inside it.',
            'The opportunity is depth that cannot be acquired any other way. The pressure is that very little is visible from outside, and the characteristic difficulty is a growing suspicion that you are falling behind - which is usually inaccurate and always uncomfortable.',
        ],
        overlays: positioned('7', {
            first: 'From birth, a 7 chapter puts observation at the start, and the theme tends to ask for watching, questioning and time alone early, before there is any choice about it. It can produce genuine depth and a lasting assumption that the interesting part happens in private.',
            second: 'In the establishing chapter, a 7 typically arrives as a decade of specialisation at an age that seems to call for visible advancement. It reads as research, training, or a period of deliberate obscurity, and the pressure is comparison - the results tend to arrive later, and to be larger for it.',
            third: 'A 7 in the consequence chapter is a mid-life reassessment with teeth. The material is usually a question that can no longer be postponed about whether the arrangement built in the second chapter is actually the right one, and it is not answerable quickly.',
            fourth: 'A 7 in the final chapter puts understanding at the end, which the tradition treats as the most natural of the fourth Pinnacles. It reads as scholarship, contemplation, or simply the long consideration of a life - and its risk is a withdrawal that goes further than intended.',
        }),
    }),
    pinnacleUnit({
        key: '8',
        headline: 'A chapter about money, authority and the visible result.',
        core: [
            'An 8 Pinnacle sets a stretch of years in the material arena. Resources, responsibility, position, scale: the subject of this chapter is consequence, and it usually arrives as a situation in which you are accountable for an outcome that other people can see.',
            'The opportunity is that this is the chapter where things get built at size. The pressure is that the measure is external and unforgiving, and the characteristic difficulty is a decade in which your worth and your results become hard to tell apart.',
        ],
        overlays: positioned('8', {
            first: 'From birth, an 8 chapter puts resources and authority at the start, and the theme tends to ask for an early reckoning with what they can and cannot do, well before there is any say in how they are used. It can produce realism about resources and a certain hardness that takes a long time to soften.',
            second: 'In the establishing chapter, an 8 typically arrives as the decade of real professional stakes: the promotion into accountability, the business, the debt taken on deliberately. It is the most demanding of the second Pinnacles and the one most likely to produce lasting material results.',
            third: 'An 8 in the consequence chapter is where earlier financial and professional decisions come due, for better or worse. The material is usually consolidation at scale, and the pressure is that the sums involved are now large enough that a mistake is not easily absorbed.',
            fourth: 'An 8 in the final chapter puts authority at the end, and it reads very differently from an early one - stewardship rather than acquisition. It is the pattern behind late board work, philanthropy and succession, and its risk is a refusal to hand anything over.',
        }),
    }),
    pinnacleUnit({
        key: '9',
        headline: 'A chapter about completion, and about the wider picture.',
        core: [
            'A 9 Pinnacle sets a stretch of years with endings in it. Things conclude during this chapter - roles, relationships, phases - and the material that replaces them tends to be broader and less personal: causes, groups, work that serves more people than yourself.',
            'The opportunity is release, which is a genuine and underrated form of progress. The pressure is that a chapter of endings can feel like loss for a long time before it feels like room, and the characteristic mistake is holding on to something well past the point where it was over.',
        ],
        overlays: positioned('9', {
            first: 'From birth, a 9 chapter puts endings and the wider view at the start, and the theme tends to ask for letting go and for seeing past the immediate circle early, before either is chosen. It can produce perspective early and a certain difficulty in believing that anything is permanent.',
            second: 'In the establishing chapter, a 9 typically arrives as a decade that will not let you build narrowly. Things you invested in end, and what replaces them is usually broader in scope. The pressure is that letting go arrives at an age that seems made for accumulating.',
            third: 'A 9 in the consequence chapter reads as a clearing out. What was built earlier is examined and a good deal of it is let go, deliberately or otherwise, and the stretch afterwards is noticeably lighter than the one before it.',
            fourth: 'A 9 in the final chapter is the most characteristic pairing in the whole system: a completing number in the completing chapter. It reads as a late life given to something larger than the personal, and its difficulty is the loneliness that a wide view can produce.',
        }),
    }),
    pinnacleUnit({
        key: '11',
        headline: 'A chapter with more signal in it than evidence.',
        core: [
            'An 11 Pinnacle sets a stretch of years in which perception runs ahead of proof. The material arrives as insight, as a sense of direction that cannot yet be justified, and often as a heightened sensitivity to the atmosphere of whatever situation you are in.',
            'The opportunity is that this chapter tends to produce the ideas a life is later organised around. The pressure is nervous: a period this receptive takes in a great deal it did not ask for, and the characteristic difficulty is the gap between what you know and what you can demonstrate.',
        ],
        overlays: positioned('11', {
            first: 'From birth, an 11 chapter puts sensitivity at the start, and the theme tends to ask for picking up moods and undercurrents early, whether or not the surroundings have any use for them. It can produce a fine instrument and, often, an early habit of keeping quiet about it.',
            second: 'In the establishing chapter, an 11 typically arrives as a decade of vocation rather than career: a pull toward work that is difficult to justify economically and hard to argue with. The pressure is practical, because conviction and income are not on the same schedule.',
            third: 'An 11 in the consequence chapter is a reckoning with what you have known and not acted on. The material is usually a direction that was visible years earlier and set aside, returning with more force and less patience.',
            fourth: 'An 11 in the final chapter puts perception at the end, with a life of calibration behind it. It is the most usable form of this number - the faculty is finally checkable against experience - and it reads as late clarity rather than as late mysticism.',
        }),
    }),
    pinnacleUnit({
        key: '22',
        headline: 'A chapter about building something larger than a personal life.',
        core: [
            'A 22 Pinnacle sets a stretch of years pointed at scale. The material is a build - an institution, a body of work, a structure that will serve people you do not know - and the chapter is characterised by an ambition that is difficult to explain and slow to show results.',
            'The opportunity is the largest available in the system. The pressure is proportionate: a chapter this size consumes time, relationships and attention, and the characteristic difficulty is a long stretch in which enormous effort has produced nothing visible.',
        ],
        overlays: positioned('22', {
            first: 'From birth, a 22 chapter puts scale at the start, and the theme tends to ask early for a sense of what large things take - their size, their sequence, the work they need. It can produce a strong sense of proportion and early years that are, in some measure, already about the work.',
            second: 'In the establishing chapter, a 22 typically arrives as the decade when the big thing begins. It is the most demanding second Pinnacle in the system and the one most likely to consume everything around it, which is worth planning for rather than discovering.',
            third: 'A 22 in the consequence chapter is where a large structure either takes its final form or reveals what it was missing. The material is heavy and the stakes are real, and this is the stretch where the human cost of the build usually becomes impossible to ignore.',
            fourth: 'A 22 in the final chapter puts the large build at the end, undertaken with everything already learned. It is the pattern behind foundations, endowments and institutions begun late, and it works because the earlier chapters supplied the competence the scale requires.',
        }),
    }),
    pinnacleUnit({
        key: '33',
        headline: 'A chapter about care given well past the circle of obligation.',
        core: [
            'A 33 Pinnacle sets a stretch of years in which the material is service at scale. The demand comes from outside your circle of duty, it is legitimate, and it arrives in a quantity that would be unreasonable if anybody had asked whether you had capacity.',
            'The opportunity is a period of real meaning. The pressure is depletion, and the characteristic difficulty of this chapter is that the giving is genuinely worth doing, which removes every convenient reason to stop.',
        ],
        overlays: positioned('33', {
            first: 'From birth, a 33 chapter puts other people\'s need at the centre from the start, and the theme tends to ask for care beyond the circle of obligation early, on a scale that can outrun what the early years can hold. It can produce considerable capability and, often, an unexamined belief that rest has to be earned.',
            second: 'In the establishing chapter, a 33 typically arrives as a vocation with people at the centre of it, taken up while the rest of the decade pulls toward establishing yourself. The pressure is that the work is inexhaustible and the reward for doing it well is more of it.',
            third: 'A 33 in the consequence chapter is where a decade of giving presents its bill. The material tends to be a reckoning with limits, and the chapter goes well where the limits are set deliberately rather than discovered only when there is nothing left to give.',
            fourth: 'A 33 in the final chapter puts wide service at the end, with the standing and the freed time to do it properly. It is the least costly position for this number, because the giving is finally chosen rather than compulsory, and the difference is the whole of it.',
        }),
    }),
];
/* ------------------------------------------------------------------ *
 * CHALLENGES
 * ------------------------------------------------------------------ */
const challenges = [
    challengeUnit({
        key: '0',
        headline: 'No single axis: the pressure is diffuse, and that is a real result.',
        core: [
            'A Challenge of 0 occurs when the two date components it is drawn from are equal, and it is a genuine result rather than an absence of one. The convention this reading follows treats it as the broadest of the challenges: no single developmental axis dominates the chapter, and the pressure is distributed instead of concentrated.',
            'In practice that describes a stretch in which you have to draw on all of the numbers rather than being pushed hard on one. Some traditions read it as freedom of choice, others as the difficulty of having no obvious thing to push against, and both are describing the same fact from different sides.',
            'What it is not is an easy chapter. A concentrated challenge tells you where to put your effort; a diffuse one does not, and the characteristic difficulty of a 0 is a period in which something is clearly required of you and nothing indicates what. The useful response is to choose a focus deliberately rather than to wait for one to be imposed.',
        ],
    }),
    challengeUnit({
        key: '1',
        headline: 'The pressure is on standing behind your own position.',
        core: [
            'A Challenge describes the developmental pressure inside a chapter rather than a quality of the person. A 1 Challenge is not about leadership as a trait; it is about the recurring situation in which the chapter requires you to assert something and something in you does not want to.',
            'It shows up as difficulty saying what you actually think in a room that has already decided, as deferring to somebody whose judgement you do not really trust, and as a pattern of good ideas offered so tentatively that they are not heard. Occasionally it appears as the opposite - an assertion so forceful it is clearly compensating - and both are the same challenge from either end.',
            'The work is proportion rather than confidence. This chapter is asking you to occupy the amount of space the situation actually calls for, which is usually more than you are taking and less than the overcorrection provides.',
        ],
    }),
    challengeUnit({
        key: '2',
        headline: 'The pressure is on tolerating other people\'s pace and difference.',
        core: [
            'A Challenge names the pressure running through a chapter, not a description of who you are. A 2 Challenge concerns sensitivity and cooperation, and it typically arrives as a stretch in which you are repeatedly required to work with people who do not operate the way you do.',
            'It shows up as an over-attention to what others think that costs you your own read on the situation, or as an oversensitivity to slights that were not intended, or - at the other end - as an impatience that treats everyone else\'s process as an obstacle. What all three have in common is a difficulty with the space between people.',
            'The work of this chapter is calibration. The sensitivity itself is not the problem and blunting it would be a loss; what has to develop is the ability to register what somebody else is doing without either absorbing it or overriding it.',
        ],
    }),
    challengeUnit({
        key: '3',
        headline: 'The pressure is on saying it, and on being seen while you do.',
        core: [
            'A Challenge describes what a chapter keeps pressing on. A 3 Challenge is about expression, and it does not mean you lack it - it means the chapter will repeatedly put you in situations where something has to be said and the saying is harder than it should be.',
            'The commonest form is self-criticism that intercepts the thought before it reaches speech: a sense that what you have to say is not interesting enough, arriving reliably a moment before you would have said it. The less common form is the opposite, a scattering of expression so wide that nothing lands, and both leave the same result, which is that the substance never quite gets through.',
            'The work is exposure at small scale. Say the unfinished thing to one person, often, until the interval between having the thought and voicing it stops being a place where things go to die.',
        ],
    }),
    challengeUnit({
        key: '4',
        headline: 'The pressure is on doing the work in the order it has to be done.',
        core: [
            'A Challenge names the developmental pressure inside a chapter. A 4 Challenge concerns application and structure, and it typically arrives as a stretch where results depend on exactly the kind of sustained, unremarkable effort that you find hardest to sustain.',
            'It shows up as disorganisation that costs more than it should, as a persistent gap between what you are capable of and what you complete, and as a habit of solving problems brilliantly at the last minute that works until it does not. It can also appear as its opposite: rigidity, method defended past its usefulness, and a plan followed off a cliff.',
            'The work is the least interesting available advice and the correct one. Build the system, on a day when nothing is urgent, and then follow it when something is - because the chapter will keep producing situations that only the system survives.',
        ],
    }),
    challengeUnit({
        key: '5',
        headline: 'The pressure is on freedom, and on what it costs.',
        core: [
            'A Challenge is the pressure running through a chapter rather than a trait. A 5 Challenge concerns liberty and restraint, and it arrives as a stretch that repeatedly poses the same question: what are you willing to be tied to.',
            'It shows up as an inability to commit that is experienced from inside as keeping options open, as a series of exits taken slightly too early, or as impulsive change entered into for relief rather than for reason. The mirror version is also common - somebody so afraid of the appetite that they lock themselves into an arrangement with no give in it at all.',
            'The work is discrimination rather than discipline. This chapter is not asking you to want less freedom; it is asking you to notice which constraints actually cost you something and which ones you have simply never tested.',
        ],
    }),
    challengeUnit({
        key: '6',
        headline: 'The pressure is on responsibility, and on where it ends.',
        core: [
            'A Challenge names what a chapter keeps pushing on. A 6 Challenge concerns duty and care, and it typically arrives as a stretch in which more is being asked of you by other people than one person can reasonably supply.',
            'It shows up as obligations accepted without a decision and resented afterwards, as standards applied to other people that they did not agree to, and as a version of helping that has quietly become control. It also appears as avoidance - a flat refusal to be responsible for anybody, held with a rigidity that gives away how much pressure is behind it.',
            'The work of this chapter is the boundary rather than the caring. What has to develop is the ability to say what you will and will not carry, at the beginning, out loud, before the arrangement has hardened into an expectation.',
        ],
    }),
    challengeUnit({
        key: '7',
        headline: 'The pressure is on trust, and on the limits of working it out alone.',
        core: [
            'A Challenge describes the pressure inside a chapter rather than a fixed quality. A 7 Challenge concerns faith and analysis, and it arrives as a stretch in which the situations you face cannot be resolved by thinking harder about them, which is exactly what you will do.',
            'It shows up as scepticism turned on people who had earned better, as a withdrawal into private reasoning at the moment when contact was required, and as a standard of certainty so high that no available option ever clears it. Sometimes it shows as the reverse - belief adopted wholesale to escape the discomfort of not knowing.',
            'The work is acting on incomplete information and living with the result. This chapter is not asking you to think less; it is asking you to notice that some questions are answered by what happens next rather than by further consideration.',
        ],
    }),
    challengeUnit({
        key: '8',
        headline: 'The pressure is on money, power, and being judged by results.',
        core: [
            'A Challenge names the developmental pressure of a chapter. An 8 Challenge concerns the material world, and it arrives as a stretch in which resources, authority and measurable outcomes are unavoidably the subject, whether or not you find that congenial.',
            'It shows up as difficulty asking to be paid properly, as an uneasy relationship with your own ambition, and as a tendency to hand authority to people who wanted it more. The other form is over-identification with the result, where a bad quarter is experienced as a verdict on the person rather than on the quarter.',
            'The work is to treat the material as instrumental. This chapter is asking you to become competent with money and power rather than either avoidant of them or defined by them, and the competence is learnable in a way that the comfort may not be.',
        ],
    }),
];
export const NUMEROLOGY_CHAPTERS = [
    ...positionFrames,
    ...pinnacles,
    ...challenges,
    conceptUnit({
        key: 'chapter-pairing',
        label: 'Reading a Pinnacle with its Challenge',
        headline: 'The same years, described twice: what is on offer and what is being asked.',
        core: [
            'Each of the four chapters has both a Pinnacle and a Challenge, and they are not two separate forecasts. The Pinnacle names the environment - the theme the years are organised around, and the opportunity in them. The Challenge names the pressure inside that same environment: the developmental demand you have to meet in order to use what the chapter is offering.',
            'Read together they make one coherent statement about a stretch of life, and read apart they are close to useless. A chapter of expansion with a challenge of restraint is a different decade from a chapter of expansion with a challenge of assertion, and the interesting part is always the relationship between the two rather than either on its own.',
        ],
        provenance: CHAPTER,
    }),
];
assertComplete('Pinnacle', CORE_NUMBERS, pinnacles);
assertComplete('Challenge', CHALLENGE_NUMBERS, challenges);
