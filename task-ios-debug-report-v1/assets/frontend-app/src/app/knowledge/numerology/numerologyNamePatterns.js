import { assertComplete, conceptUnit, hiddenPassionUnit, KARMIC_DEBTS, karmicDebtUnit, karmicLessonUnit, SINGLE_DIGITS, } from './numerologyAuthoring.js?v=b5ef5ed';
/**
 * THE NAME-FREQUENCY POSITIONS AND THE KARMIC DEBTS.
 *
 *   HIDDEN PASSION   the value that appears most often in the birth name. A
 *                    natural pull: the thing you keep doing whether or not the
 *                    situation called for it.
 *   KARMIC LESSON    a value from 1 to 9 that appears in the name NOT AT ALL.
 *                    An underrepresented theme, and nothing more than that.
 *   KARMIC DEBT      13, 14, 16 or 19 as a core position's own total or a total
 *                    met on that position's own way down to its number - never
 *                    one inside a single part (methodology contract, own chain).
 *
 * THE RULE THAT GOVERNS THIS WHOLE FILE
 *
 * None of these is a verdict. A missing number is not a defect, a punishment or
 * a moral failure, and a karmic debt is not a sentence. Both are read here as
 * underrepresented or emphasised symbolic themes within a named tradition, and
 * every entry is written so that a reader who takes it literally still comes away
 * with something workable rather than something to worry about.
 *
 * The karmic debts are the sharpest test of that. They come with imagery -
 * collapse, bills falling due - that does not come from numerological reasoning
 * and is kept out of the copy, and they are among the most overstated ideas in
 * popular numerology. They are carried because the engine detects them, and they
 * are framed as a lens rather than as a forecast.
 */
/* ------------------------------------------------------------------ *
 * HIDDEN PASSION - the repeated value
 * ------------------------------------------------------------------ */
const hiddenPassion = [
    hiddenPassionUnit({
        key: '1',
        headline: 'The repeated pull: to be the one who decides.',
        core: [
            'The Hidden Passion is the value that occurs most often across the letters of your birth name, and the tradition reads a repeated value as a repeated pull - the thing you reach for by default, whether or not the situation asked for it. It is not an ambition and not a talent exactly; it is closer to a groove worn by use.',
            'A 1 Hidden Passion pulls toward authorship. You will take the decision, start the thing, or quietly reshape somebody else\'s plan so that it is yours, in situations where none of that was necessary. Constructively it means capability arrives early and gets practised constantly. Overdeveloped, it makes collaboration harder than it needs to be, and creates a blind spot around how much other people were willing to contribute.',
        ],
    }),
    hiddenPassionUnit({
        key: '2',
        headline: 'The repeated pull: toward the other person in the room.',
        core: [
            'The Hidden Passion is the letter value repeated most often in the birth name, read as a default reach rather than as an aspiration. A 2 here pulls toward relation: you will orient to whoever else is present, adjust to them, and work through the connection rather than around it.',
            'Practised constantly, this becomes a real competence with people. The overdevelopment is that the pull operates in situations where there is nothing to attune to, and the blind spot it creates is your own position - a 2 Hidden Passion can go a very long time without noticing that its preferences have never been entered into the conversation.',
        ],
    }),
    hiddenPassionUnit({
        key: '3',
        headline: 'The repeated pull: to put it into words.',
        core: [
            'The Hidden Passion is the most frequent letter value in the birth name, and it names what you keep doing by default. A 3 here pulls toward expression: the experience is not finished until it has been described, and you will describe it whether the room wanted a description or not.',
            'Repeated that often, the faculty gets very good. The overdevelopment is expression as a reflex rather than a choice, and the blind spot is everything that does not survive being put into words - which includes a fair amount of what happens between people, and most of what happens before you have understood it.',
        ],
    }),
    hiddenPassionUnit({
        key: '4',
        headline: 'The repeated pull: to make it orderly.',
        core: [
            'The Hidden Passion names the value that recurs most in the birth name, read as a default reach. A 4 here pulls toward structure: presented with anything loose you will begin arranging it, and the arranging starts before any decision to arrange has been taken.',
            'The constructive version is that you are extremely reliable with anything that has to hold, because the practice has been continuous. Overdeveloped, the pull applies structure to things that were better left fluid, and the blind spot is that the ordering itself can substitute for the harder question of whether the thing is worth doing at all.',
        ],
    }),
    hiddenPassionUnit({
        key: '5',
        headline: 'The repeated pull: toward whatever is not the same as yesterday.',
        core: [
            'The Hidden Passion is the repeated letter value in the birth name, read as a groove rather than a goal. A 5 here pulls toward variation: you will change the approach, take the different route, or reopen the settled question, frequently for no reason beyond that it was settled.',
            'Practised continuously this produces real range and a steady composure in unfamiliar conditions. Overdeveloped, it undoes work that was finished, and the blind spot is compounding - a pull this strong toward the new makes it genuinely hard to see what staying with something would have produced.',
        ],
    }),
    hiddenPassionUnit({
        key: '6',
        headline: 'The repeated pull: to take responsibility for it.',
        core: [
            'The Hidden Passion is the value occurring most often in the birth name and describes the default reach rather than a stated intention. A 6 here pulls toward responsibility: if something is not being looked after, you will pick it up, usually before working out whether it was yours.',
            'The constructive form is a person around whom things reliably function. Overdeveloped, the pull collects obligations at a rate no one could sustain, and the blind spot is other people\'s capability - a 6 Hidden Passion frequently takes on work that the person it belongs to would have managed perfectly well, and never finds out.',
        ],
    }),
    hiddenPassionUnit({
        key: '7',
        headline: 'The repeated pull: to check it properly.',
        core: [
            'The Hidden Passion names the letter value that recurs most across the birth name, and reads it as an automatic reach. A 7 here pulls toward verification: the stated answer gets examined, the figure gets recalculated, the confident account gets quietly tested against what you can establish yourself.',
            'Constantly practised, this makes you extremely difficult to mislead. Overdeveloped, the pull applies full scrutiny to matters that did not warrant it, and the blind spot is momentum - a great deal can be lost to checking, and the loss is invisible because a thing that never got started leaves no evidence of the delay that killed it.',
        ],
    }),
    hiddenPassionUnit({
        key: '8',
        headline: 'The repeated pull: toward the result and who is accountable for it.',
        core: [
            'The Hidden Passion is the most frequent value in the birth name, read as a default reach rather than as a motive. An 8 here pulls toward consequence: you will ask what this produces, what it costs and who carries it, in conversations that were not being held in those terms.',
            'The constructive version is a persistent realism that saves a great many projects. Overdeveloped, the pull evaluates everything by outcome, including things whose value is not of that kind, and the blind spot is what does not show up in the result - the effort, the relationships and the parts of a situation that were never going to be measurable.',
        ],
    }),
    hiddenPassionUnit({
        key: '9',
        headline: 'The repeated pull: to widen the frame.',
        core: [
            'The Hidden Passion is the letter value repeated most often in the birth name and names what you reach for automatically. A 9 here pulls toward the general: the particular situation gets placed in a larger context almost immediately, and the placing happens whether or not anybody wanted the context.',
            'Practised constantly this produces genuine perspective and considerable fairness. Overdeveloped, the pull generalises away the specific thing that was actually happening, and the blind spot is the small close-range matter - which a 9 Hidden Passion can widen out of existence with complete sincerity and no idea that it has done so.',
        ],
    }),
];
/* ------------------------------------------------------------------ *
 * KARMIC LESSONS - the values absent from the name
 * ------------------------------------------------------------------ */
const karmicLesson = [
    karmicLessonUnit({
        key: '1',
        headline: 'Underrepresented: acting without waiting for the mandate.',
        core: [
            'A Karmic Lesson is a value from 1 to 9 that does not appear at all in the letters of your birth name. The tradition reads an absent value as an underrepresented theme - something the chart does not generate on its own and that therefore has to be developed deliberately. It is not a defect, it is not a punishment, and it says nothing about what you are capable of.',
            'With 1 absent, self-direction is the theme that has to be practised rather than assumed. It typically shows up as a habit of waiting for someone to confirm the decision, of framing your own preference as a suggestion, and of doing genuinely independent work while describing it as a contribution to somebody else\'s. The correction is small and specific: state the position first, without the qualifier, and notice that the ceiling does not fall in.',
            'The shadow of over-correcting is worth naming too, because reading about an absent number is exactly what tends to provoke it. Someone who decides to fix an absent 1 tends to overshoot into a brittle insistence that is unlike them, exhausting to maintain and less effective than the quiet version would have been.',
        ],
    }),
    karmicLessonUnit({
        key: '2',
        headline: 'Underrepresented: patience with other people\'s pace.',
        core: [
            'A Karmic Lesson is a value absent from the letters of the birth name, read as an underrepresented developmental theme rather than as a deficiency. Nothing here is a verdict on the person, and the tradition is explicit that an absent number describes something to practise rather than something that is wrong.',
            'With 2 absent, the theme is cooperation and timing. It usually appears as impatience with process, a tendency to conclude a discussion internally before it has finished externally, and genuine puzzlement at how long other people need. The practical development is unglamorous: ask one more question before deciding, and let somebody else finish.',
            'Over-correcting produces its own difficulty - an accommodation that is performed rather than felt, which tends to show and helps nobody. The aim is not to become a natural collaborator but to stop treating other people\'s pace as an obstacle.',
        ],
    }),
    karmicLessonUnit({
        key: '3',
        headline: 'Underrepresented: saying it out loud.',
        core: [
            'A Karmic Lesson names a value from 1 to 9 that appears nowhere in the birth name. The tradition reads it as a theme the chart does not supply automatically, which has to be built rather than relied on. It is not a moral judgement and it is not a fixed limitation.',
            'With 3 absent, expression is the underdeveloped theme. It tends to show as a reluctance to describe what you think until you are certain of it, a discomfort with self-presentation that reads as modesty, and a body of good work that nobody outside a small circle knows about. The development is to say the unfinished thought, in public, at a small scale, repeatedly.',
            'The over-correction is performance without substance - a person who has decided to become more expressive and has done so at the cost of the accuracy that made them worth listening to. The theme is developed when the expression is proportionate, not when it is loud.',
        ],
    }),
    karmicLessonUnit({
        key: '4',
        headline: 'Underrepresented: staying with the unglamorous middle.',
        core: [
            'A Karmic Lesson is a value absent from the birth name, read within this tradition as a theme requiring deliberate development. It carries no implication of failure and describes nothing that cannot be built.',
            'With 4 absent, the underdeveloped theme is sustained application. It usually appears as a history of promising beginnings, an instinctive dislike of routine, and a real difficulty converting capability into a finished object. The development is structural rather than motivational: a fixed schedule, an external deadline, and one thing carried past the point where it stopped being interesting.',
            'Over-correcting looks like a sudden conversion to systems for their own sake - elaborate methods that consume the energy the work needed. The theme is developed by finishing something, not by planning better.',
        ],
    }),
    karmicLessonUnit({
        key: '5',
        headline: 'Underrepresented: tolerating change you did not choose.',
        core: [
            'A Karmic Lesson is a value from 1 to 9 that does not occur in the letters of the birth name, read as an underrepresented theme rather than as a lack in the person. The distinction matters, because this is the position most often misused to tell somebody what is wrong with them.',
            'With 5 absent, adaptability is the theme to develop. It typically shows as a strong preference for the known arrangement, discomfort that arrives disproportionately fast when plans alter, and a tendency to describe caution as prudence when it was closer to reluctance. The development is exposure in small doses, deliberately chosen, before circumstances impose a larger one.',
            'The over-correction is upheaval undertaken to prove a point, which tends to cost a great deal and teach very little. The theme is developed by handling an unplanned change well, not by generating one.',
        ],
    }),
    karmicLessonUnit({
        key: '6',
        headline: 'Underrepresented: taking on what is not strictly yours.',
        core: [
            'A Karmic Lesson names a value absent from the birth name, understood as a developmental theme within a named tradition. It is not a statement about your character and it is not a debt owed to anybody.',
            'With 6 absent, the underdeveloped theme is responsibility for other people. It usually shows as a clean sense of where your obligations end, which is genuinely useful, alongside a slowness to notice that somebody nearby needed something and a tendency to treat commitment as a limitation on options. The development is deliberate: commit to one person or one thing in a way that costs you something.',
            'Over-correcting produces obligation collected indiscriminately and resented later. The theme is developed by choosing one responsibility on purpose and holding it through the dull part, not by accumulating obligations until the sheer volume of them proves something.',
        ],
    }),
    karmicLessonUnit({
        key: '7',
        headline: 'Underrepresented: stopping to find out whether it is true.',
        core: [
            'A Karmic Lesson is a value that appears nowhere in the letters of the birth name, read as a theme the chart does not generate on its own. It carries no implication of inadequacy - an absent 7 says nothing about how thoughtful a person is, and the position describes what is not automatic rather than what is missing.',
            'With 7 absent, reflection is the theme to build. It typically appears as speed that outruns examination, a comfortable acceptance of the standard explanation, and a pattern of the same category of mistake arriving in new clothes. The development is a deliberately scheduled pause: a review that happens on a date rather than when it feels needed.',
            'The over-correction is analysis used to avoid acting, which is the failure mode of a natural 7 and is worth knowing about before adopting the habit wholesale. Borrowing another number\'s difficulty in the course of fixing your own is a poor trade.',
        ],
    }),
    karmicLessonUnit({
        key: '8',
        headline: 'Underrepresented: dealing squarely with money and power.',
        core: [
            'A Karmic Lesson is an absent value in the birth name, read as an underrepresented theme. Nothing in this position is a judgement, and the tradition treats it as a description of what needs practice rather than of what has gone wrong.',
            'With 8 absent, the theme is material consequence. It usually shows as discomfort with negotiating for yourself, a tendency to leave the question of value unstated because raising it feels crude, and a quiet assumption that the good work will be recognised on its own. The development is practical: name your price, out loud, before the work begins.',
            'Over-correcting turns into an anxious preoccupation with getting your share, which costs more in relationships than it recovers in money. The theme is developed when the subject can simply be discussed, without either apology or edge, and it is overdeveloped when it becomes the only subject.',
        ],
    }),
    karmicLessonUnit({
        key: '9',
        headline: 'Underrepresented: the view from outside your own position.',
        core: [
            'A Karmic Lesson names a value from 1 to 9 absent from the birth name, understood as a developmental theme within the modern Western tradition. It is not a defect and it is not fate; it describes a capacity that has to be deliberately built rather than one that arrives.',
            'With 9 absent, the underdeveloped theme is breadth. It tends to show as a strong grasp of your own situation and a weaker instinct for how it looks from anywhere else, a difficulty letting go of things that have ended, and an honest surprise at being told you were unfair. The development is specific: argue the other position properly, out loud, until it sounds convincing.',
            'The over-correction is a detachment adopted as a policy, where everything is put into perspective and nothing is felt. Breadth is developed by understanding another position, not by declining to hold one.',
        ],
    }),
];
/* ------------------------------------------------------------------ *
 * KARMIC DEBT
 * ------------------------------------------------------------------ */
const karmicDebt = [
    karmicDebtUnit({
        key: '13',
        headline: 'The work was deferred, and it is still the work.',
        core: [
            'A karmic debt is recorded when 13, 14, 16 or 19 is the total of one of your core positions - Life Path, Birth Day, Expression, Soul Urge or Personality - or a total met on that position\'s own way down to its number. The same totals inside a single part, such as a birth year that passes through 19 or one name that adds up to 16, do not put a debt on the position. It is a modern Western idea with no counterpart in Chaldean practice or in the older Pythagorean sources, and it belongs in a reading as one tradition\'s lens rather than as a finding about you.',
            'Thirteen reduces to Four and carries the subject of Four - structure, effort, the finished thing - with an added friction. The historical framing describes a pattern in which shortcuts were taken and the account is settled in the form of slowness: progress that does arrive, through work that feels heavier than the result seems to justify.',
            'Read as a description of temperament rather than of destiny, this names something workable. Sustained unglamorous application is precisely what the pattern is short of and precisely what resolves it, and the practical version is a schedule rather than a burst. The common overstatement to ignore is the idea that a 13 dooms an effort; what the tradition actually describes is a poor exchange rate between effort and visible result, which is a reason to plan differently rather than to expect failure.',
        ],
    }),
    karmicDebtUnit({
        key: '14',
        headline: 'Freedom taken faster than the discipline to hold it.',
        core: [
            'Karmic debts are the totals 13, 14, 16 and 19 where one of them is a core position\'s own total, or is met on that position\'s own way down to its number; the same totals reached inside a single part - the birth year, or one name - do not count for the position. They are standard in the modern Western lineage and absent from the older sources, so they are offered here as a named tradition\'s reading rather than as a fact about a chart.',
            'Fourteen reduces to Five and inherits the appetite of Five with the traditional charge that the appetite once ran without a brake. It shows up as instability that is self-generated rather than imposed: change entered into a little too easily, and a habit of moving on at the exact point where staying would have started to pay.',
            'The corrective the tradition names is moderation, and for this pattern that is a practical instruction rather than a moral one. The freedom is genuine and it only becomes usable once something is held long enough to compound. What to discount is the moralising version, which treats a 14 as evidence of a character flaw; the useful version treats it as a note about pacing.',
        ],
    }),
    karmicDebtUnit({
        key: '16',
        headline: 'What was built on a story tends not to hold.',
        core: [
            'A karmic debt is a 13, 14, 16 or 19 that is a core position\'s own total, or a total met on that position\'s own way down to its number; the same totals inside one part of the date or the name do not count. Sixteen is the most uncomfortable of the four and the one most often overstated, so it is worth being precise about what the tradition actually claims and what it does not. The tradition in question is the modern Western lineage; nothing corresponding to it appears in Chaldean practice.',
            'Sixteen reduces to Seven. The traditional symbolic reading sees in it an identity, a relationship or a position built on pride or on a flattering story, which cannot stay as it is and has to be rebuilt on truer ground. It is offered as the tradition\'s symbol, not as a prediction about any particular life.',
            'What the tradition says the pattern asks for is not endurance but honesty, on the reasoning that the rebuilding stops recurring once the thing being built stops being a performance. That is a demanding claim and it belongs in a reading as a question rather than as a forecast. As a personal question it is simply this: does what you are building rest on what is true, or on an account of yourself you have not tested?',
        ],
    }),
    karmicDebtUnit({
        key: '19',
        headline: 'Independence learning that it is not the same as self-sufficiency.',
        core: [
            'Karmic debts are the totals 13, 14, 16 and 19 where they belong to a core position itself - its own total, or a total met on its own way down to its number. A 19 met only inside a single part, such as a birth year whose digits add up to 19, does not count for the position. They belong to the modern Western lineage specifically, and this reading carries them as symbolism from that tradition rather than as an established property of the chart.',
            'Nineteen reduces to One and sharpens the solitude of One into something nearer isolation. The traditional pattern is of a person who will not ask: who takes the whole load, refuses the offered hand, and ends up standing alone in situations that never required it. The isolation is usually chosen in small increments, each defensible on its own.',
            'The resolution the tradition names is not dependence but reciprocity - accepting help turns out to be a form of strength rather than a debt, and authority that cannot be shared does not stay authority for long. What to discount is the punitive framing sometimes attached to this number; nothing in the pattern describes a penalty, only a habit with a predictable cost.',
        ],
    }),
];
export const NUMEROLOGY_NAME_PATTERNS = [
    ...hiddenPassion, ...karmicLesson, ...karmicDebt,
    conceptUnit({
        key: 'hidden-passion-tie',
        label: 'More than one Hidden Passion',
        headline: 'Two values tied for most frequent, and why that is not a problem.',
        core: [
            'The Hidden Passion is whichever letter value occurs most often in the birth name, and names do not always produce a single winner. Where two or three values tie, the tradition reads all of them - not as a diluted signal but as two pulls of equal strength, which is a genuinely different situation from having one.',
            'What it describes in practice is a default reach that varies with the situation rather than one that is fixed. That makes for more range than a single Hidden Passion allows, and it makes the pull harder to notice from inside, because there is no one habit visible enough to name. Each of the tied values is read in full below.',
        ],
    }),
    conceptUnit({
        key: 'no-karmic-lessons',
        label: 'No Karmic Lessons',
        headline: 'All nine values present in the name, which is worth reading rather than skipping.',
        core: [
            'Every value from 1 to 9 appears somewhere in your birth name, so there are no Karmic Lessons to report. That is a real result rather than an absence of information: the tradition reads a complete set as a chart with no single obviously underdeveloped theme.',
            'What it does not mean is that everything comes easily. A complete name distributes the emphasis rather than removing it, and the practical consequence is usually a person with broad competence and no natural specialism - which has its own difficulty, since the theme that needs work is harder to identify when nothing is missing.',
        ],
    }),
    conceptUnit({
        key: 'no-karmic-debt',
        label: 'No karmic debt in any core position\'s own reduction',
        headline: 'Nothing was found, and nothing is being invented to fill the space.',
        core: [
            'None of the four karmic debt totals - 13, 14, 16 or 19 - is the total of your Life Path, Birth Day, Expression, Soul Urge or Personality, or turns up on the way from any of those totals down to its number. That is simply the result, and it is reported as such rather than being turned into a positive finding, because the absence of a marker in a tradition that only recognises four of them is not evidence of anything in particular.',
            'It is worth saying plainly because popular numerology tends to fill this space with reassurance. The honest position is that this particular lens has nothing to say about your chart, and a reading that manufactured a meaning for the empty result would be telling you something it does not know.',
        ],
    }),
];
assertComplete('Hidden Passion', SINGLE_DIGITS, hiddenPassion);
assertComplete('Karmic Lesson', SINGLE_DIGITS, karmicLesson);
assertComplete('Karmic Debt', KARMIC_DEBTS, karmicDebt);
