import { assertComplete, conceptUnit, personalDayUnit, personalMonthUnit, personalYearUnit, SINGLE_DIGITS, TRANSIENT_CYCLE, } from './numerologyAuthoring.js';
/**
 * THE THREE TIMESCALES.
 *
 * The same number at three different resolutions, and the resolution changes
 * what it means to the point where sharing prose between them would be a
 * straightforward error:
 *
 *   PERSONAL YEAR    twelve months of developmental climate. What the stretch
 *                    is shaped for. The only one of the three with real weight.
 *   PERSONAL MONTH   four weeks of operational emphasis inside that climate.
 *                    A nudge about what this part of the year suits.
 *   PERSONAL DAY     one day of pace and focus. Genuinely small - the right use
 *                    is scheduling, not self-understanding.
 *
 * A 4 Personal Year is a year of consolidation and responsibility. A 4 Personal
 * Month is four weeks that suit getting the practical backlog in order. A 4
 * Personal Day is a Tuesday for finishing things. All three are the same
 * archetype and none of them is the same statement.
 *
 * WEIGHT IS ENCODED, NOT JUST DESCRIBED. The semantic signals these units carry
 * are scaled by role in numerologyAuthoring.ts, so a Personal Day contributes a
 * tenth of what a Life Path does to any downstream synthesis. Without that, a
 * Tuesday would argue with a life.
 *
 * PROVENANCE. All three are marked contested, because the schools genuinely
 * disagree about when the Personal Year turns over - 1 January in one tradition,
 * the birthday in another - and the Month and Day are both derived from it.
 *
 * 7 is written in numerologyRoles.ts for the Year and the Month and is not
 * repeated here; the Personal Day is new and covers all twelve values.
 */
/* ------------------------------------------------------------------ *
 * PERSONAL YEAR
 * ------------------------------------------------------------------ */
const personalYear = [
    personalYearUnit({
        key: '1',
        headline: 'A year for beginning, whether or not the ground is ready.',
        core: [
            'A Personal Year is a twelve-month climate rather than a description of you. It says what the stretch is shaped for, and a Personal Year 1 is shaped for initiation: the start of a nine-year cycle, with the characteristic feeling that something has cleared and there is space that was not there before.',
            'What this year rewards is the decision made and acted on. What it punishes is waiting for conditions to improve, because the conditions in a Personal Year 1 are as good as they are going to get for a while - the support arrives after the commitment rather than before it. Anything begun now tends to set the shape of the eight years that follow, which is worth knowing before choosing casually.',
        ],
    }),
    personalYearUnit({
        key: '2',
        headline: 'A year for letting things develop rather than forcing them.',
        core: [
            'A Personal Year 2 is the slow one directly after the beginning, and it is routinely misread as a failure of momentum. What was started last year is germinating rather than stalling, and the climate favours patience, partnership and quiet consolidation over any further pushing.',
            'The year suits relationships, negotiation, detail work and anything that depends on somebody else\'s timing. It resists forcing, and the standard mistake is to apply more effort at the same angle and conclude from the lack of movement that the thing was a mistake. Very often the following year proves otherwise.',
        ],
    }),
    personalYearUnit({
        key: '3',
        headline: 'A year for putting it out and enjoying it.',
        core: [
            'A Personal Year 3 is the lightest of the nine. The climate favours expression, social life and visibility, and things that were quietly built in the previous two years tend to find an audience without much forcing. Energy is high and so is the number of available directions.',
            'It is an excellent year for anything creative, public or expansive, and a poor one for concentrated single-track work. The characteristic cost is dispersal: a Personal Year 3 will offer more opportunities than can be taken, and the ones taken indiscriminately turn into the following year\'s workload.',
        ],
    }),
    personalYearUnit({
        key: '4',
        headline: 'A year for building the structure, and for the work being the work.',
        core: [
            'A Personal Year 4 is the year of consolidation and effort. The climate rewards system, discipline and the unglamorous business of making things solid, and it does not reward improvisation - what is built loosely in a Personal Year 4 tends to have to be built again.',
            'It commonly feels heavier than the years on either side, and the heaviness is the point rather than a sign that something has gone wrong. Health, finances, contracts, the neglected practical backlog: this is the year those get addressed, and the results of doing so show up in the Personal Years 5 and 6 that follow.',
        ],
    }),
    personalYearUnit({
        key: '5',
        headline: 'A year when things move, invited or not.',
        core: [
            'A Personal Year 5 brings change. The climate is unsettled, and it is usually experienced as either liberation or disruption, depending on how much was over-fixed in the Personal Year 4 before it. The movement tends to arrive rather than being arranged.',
            'It suits travel, new contacts, changes of role, and anything that benefits from exposure. It is a poor year for locking things down. The characteristic mistake is treating the restlessness as a signal for one large irreversible decision, when the year is asking for several small reversible ones.',
        ],
    }),
    personalYearUnit({
        key: '6',
        headline: 'A year when other people\'s needs move to the front.',
        core: [
            'A Personal Year 6 is domestic and relational in the broadest sense. Family, home, commitments and responsibilities to other people take up the foreground, frequently without having been scheduled, and the climate rewards attending to them rather than working around them.',
            'It is a strong year for anything involving repair - a relationship, a household, a team - and a difficult one for purely individual ambition, which tends to be repeatedly interrupted by something legitimate. The risk specific to this year is taking on so much that the Personal Year 7 that follows arrives with nothing left to reflect with.',
        ],
    }),
    personalYearUnit({
        key: '8',
        headline: 'A year when the results of the cycle become visible.',
        core: [
            'A Personal Year 8 is the material one. The climate favours ambition, money, authority and scale, and it tends to deliver in proportion to what the earlier years of the cycle actually built - which is why it is experienced as either a breakthrough or an unwelcome audit.',
            'It is the right year to ask for the promotion, raise the money, sign the deal or take on the responsibility. It rewards being direct about what you want in material terms, and it is unforgiving of vagueness. The characteristic mistake is spending the year working rather than the year negotiating.',
        ],
    }),
    personalYearUnit({
        key: '9',
        headline: 'A year for ending things properly before the next cycle starts.',
        core: [
            'A Personal Year 9 closes the cycle. The climate is one of completion and release, and the characteristic experience is that things which have been ending for a while finally do - relationships, roles, arrangements, versions of yourself that stopped fitting some time ago.',
            'It is a poor year to begin anything significant, because a Personal Year 1 is twelve months away and what is started now tends to belong to the cycle that is finishing. It is an excellent year to clear out, forgive, complete unfinished work and let go of what will not survive the transition. Resisting that is the one reliable way to make a Personal Year 9 unpleasant.',
        ],
    }),
];
/* ------------------------------------------------------------------ *
 * PERSONAL MONTH
 * ------------------------------------------------------------------ */
const personalMonth = [
    personalMonthUnit({
        key: '1',
        headline: 'A month to start the thing you have been circling.',
        core: [
            'The Personal Month narrows the year to a four-week emphasis and carries far less weight than the year does; treat it as a nudge about sequencing rather than as a frame. A Personal Month 1 tilts toward initiation - the part of the year that suits getting something off the ground.',
            'Used well it is the month to make the call, send the proposal, or begin the piece of work that has been in the planning stage too long. Used badly it produces a start that has nothing behind it, because a month of initiating inside a year that is not shaped for it will not carry very far.',
        ],
    }),
    personalMonthUnit({
        key: '2',
        headline: 'A month for the conversation rather than the decision.',
        core: [
            'The Personal Month is a four-week emphasis inside the year, and a light one. A Personal Month 2 tilts toward cooperation and detail: the part of the year that suits working with somebody, following something up, and letting a matter settle rather than resolving it now.',
            'It is a good month to negotiate, repair a relationship or handle the fiddly things that need another person\'s attention. It is a poor month to force a decision, and the frustration it produces is usually a matter of timing rather than of the thing itself being wrong.',
        ],
    }),
    personalMonthUnit({
        key: '3',
        headline: 'A month for saying it out loud and being sociable about it.',
        core: [
            'A Personal Month describes a four-week emphasis and nothing larger. A Personal Month 3 tilts toward expression and contact - the part of the year that suits presenting, publishing, socialising and generally letting people know what you have been doing.',
            'It is the month for the launch event, the pitch, the piece of writing that has been sitting finished. Its weakness is concentration: a Personal Month 3 is a poor stretch for the deep single-track work, and expecting it to deliver that produces a month that feels busy and thin.',
        ],
    }),
    personalMonthUnit({
        key: '4',
        headline: 'A month to get the practical things in order.',
        core: [
            'The Personal Month narrows the year to four weeks of operational emphasis. A Personal Month 4 tilts toward structure: the part of the year that suits admin, systems, paperwork, and the backlog of solid unglamorous things that have been deferred.',
            'It is a productive month for anything that has to be reliable afterwards, and it is a heavy one to spend on inspiration. Used well it clears the ground for the rest of the year; used badly it becomes four weeks of organising as a way of avoiding the actual work.',
        ],
    }),
    personalMonthUnit({
        key: '5',
        headline: 'A month with movement in it, and less traction than expected.',
        core: [
            'A Personal Month is a light four-week emphasis rather than a frame. A Personal Month 5 tilts toward change and variety - the part of the year that suits travel, new contacts, and taking a different approach to something that has stalled.',
            'It is a good month to expose yourself to something unfamiliar and a poor one to expect steady progress on a single track. The characteristic experience is a month with a great deal happening and less finished than the activity suggested, which is worth planning around rather than being disappointed by.',
        ],
    }),
    personalMonthUnit({
        key: '6',
        headline: 'A month when the domestic and the relational need attention.',
        core: [
            'The Personal Month describes four weeks of emphasis inside the larger year. A Personal Month 6 tilts toward responsibility and care: home, family, health, the people who may have been getting the leftovers of your attention.',
            'It is the right month to deal with the thing at home that has been waiting. A purely professional push is harder, because it tends to be interrupted by something legitimate. Recognising the month for what it is generally converts the interruption into a decision.',
        ],
    }),
    personalMonthUnit({
        key: '8',
        headline: 'A month for the money conversation.',
        core: [
            'A Personal Month is a four-week emphasis, and a modest one. A Personal Month 8 tilts toward the material: the part of the year that suits negotiating, invoicing, asking for the raise, or dealing squarely with a financial matter that has been left vague.',
            'It is the month to be direct about value, and it responds badly to hinting. Its limitation is scale - a Personal Month 8 inside a quiet year produces a good conversation rather than a transformation, and expecting the latter is how the month gets over-read.',
        ],
    }),
    personalMonthUnit({
        key: '9',
        headline: 'A month for finishing and clearing rather than starting.',
        core: [
            'The Personal Month is a light four-week emphasis. A Personal Month 9 tilts toward completion: the part of the year that suits closing things out, tidying up, ending what has been dragging and clearing the desk before the next stretch.',
            'It is an excellent month to finish and a poor one to launch, since anything begun now tends to be caught by the turnover into the next month\'s emphasis. The characteristic feeling is of a slightly deflating four weeks that turn out, afterwards, to have been necessary.',
        ],
    }),
];
/* ------------------------------------------------------------------ *
 * PERSONAL DAY
 * ------------------------------------------------------------------ */
const personalDay = [
    personalDayUnit({
        key: '1',
        headline: 'A day for the first move.',
        core: [
            'The Personal Day is the smallest unit in the system and the one most easily over-read. It describes pace and focus for a single day, which makes it useful for scheduling and close to useless for self-understanding - nobody\'s character changes on a Thursday.',
            'A Personal Day 1 suits starting: the call you have been putting off, the first draft, the conversation that opens something. Momentum is easier to generate today than to sustain, so the practical use is to begin the thing and let a later day carry it.',
        ],
    }),
    personalDayUnit({
        key: '2',
        headline: 'A day for the other person\'s half of it.',
        core: [
            'The Personal Day describes one day of pace and emphasis. It is genuinely small - the right use is deciding what to put in the diary, not deciding who you are - and it carries the least weight of any position in the system.',
            'A Personal Day 2 suits collaboration and detail: the meeting, the follow-up, the careful edit, the thing that needs somebody else\'s input. Pushing hard for a decision today tends to cost more than waiting, and the day generally goes better if you let it be slow.',
        ],
    }),
    personalDayUnit({
        key: '3',
        headline: 'A day for talking and for the sociable part of the work.',
        core: [
            'The Personal Day is a one-day emphasis and nothing more, and it is worth holding lightly. What it is good for is matching the task to the day rather than fighting the day.',
            'A Personal Day 3 suits communication: writing, presenting, calls, the social side of whatever you are working on. Concentration is patchier than usual, so a day spent trying to do deep solitary work will feel like wading. Put the meetings here.',
        ],
    }),
    personalDayUnit({
        key: '4',
        headline: 'A day for focused execution and finishing.',
        core: [
            'The Personal Day is the smallest and lightest of the numerology positions, describing one day of pace and focus. It is a scheduling tool rather than an insight. Nothing about a person changes on a Tuesday, and a reading that suggests otherwise has overstated the position.',
            'A Personal Day 4 suits execution: the backlog, the admin, the careful methodical part of a project, the thing that has to be got right rather than got interesting. Patience is better than usual today and improvisation is worse, so this is the day for the list.',
        ],
    }),
    personalDayUnit({
        key: '5',
        headline: 'A day for movement, and a poor one for the fine detail.',
        core: [
            'The Personal Day describes a single day of emphasis. It is small by design, and the honest use of it is choosing which of the things on your list to do today rather than reading anything larger into it.',
            'A Personal Day 5 suits variety, travel, unexpected contact and anything that benefits from being handled quickly. Detailed work goes badly - attention is short today - so this is a good day to move things forward and a bad one to check them.',
        ],
    }),
    personalDayUnit({
        key: '6',
        headline: 'A day for the people and the practical care.',
        core: [
            'The Personal Day is one day of pace and focus, and the lightest reading in the system. Treat it as a nudge about sequencing. It is the one position in numerology that should never be allowed to affect a decision of any size.',
            'A Personal Day 6 suits domestic and relational work: the family thing, the colleague who needs support, the repair, the appointment. Purely self-directed ambition tends to get interrupted today by something reasonable, and the day goes better if that is expected rather than resented.',
        ],
    }),
    personalDayUnit({
        key: '7',
        headline: 'A day for thinking rather than transmitting.',
        core: [
            'The Personal Day is the smallest position in the system: one day of emphasis, useful for scheduling and not for much else. It should never carry more weight than the year it sits inside.',
            'A Personal Day 7 suits analysis, research, review and solitary work. Sociability is more effortful than usual and the output is better than usual, so this is the day to close the door and look properly at something rather than the day to sell it.',
        ],
    }),
    personalDayUnit({
        key: '8',
        headline: 'A day for the transactional and the decisive.',
        core: [
            'The Personal Day describes one day of pace and nothing broader. It is the lightest of all the positions and is best used as an ordering principle for the week. Read against a year or a chapter it carries no weight at all.',
            'A Personal Day 8 suits money and authority: the negotiation, the invoice, the decision that needs somebody to take responsibility for it. Directness works better today than usual, and hesitation costs more, which makes it the day for anything that has been circling.',
        ],
    }),
    personalDayUnit({
        key: '9',
        headline: 'A day for closing things out.',
        core: [
            'The Personal Day is one day of emphasis - the smallest and least weighty position in the system, and one that should be read as scheduling advice rather than as anything about the person. It is included for completeness rather than for depth.',
            'A Personal Day 9 suits completion: finishing, filing, sending the last version, ending the thing that has been dragging. Beginnings started today tend not to take, so this is a day to clear rather than to open. The clearing is worth more than it feels like at the time.',
        ],
    }),
];
export const NUMEROLOGY_CYCLES = [
    ...personalYear, ...personalMonth, ...personalDay,
    conceptUnit({
        key: 'cycle-scales',
        label: 'Why the three cycles do not have to agree',
        headline: 'A year, a month and a day are three different claims about time.',
        core: [
            'The Personal Year, Month and Day are calculated from each other and describe different things at different resolutions. The year is a developmental climate - what a twelve-month stretch is shaped for. The month is an operational emphasis inside it. The day is pace and focus for a single day, and it is genuinely small.',
            'They frequently point in different directions, and that is information rather than contradiction. A year of consolidation containing a month of expression containing a day for finishing is a perfectly coherent situation: it says put the public work in this month, and use today to close things out. Where they conflict the larger scale wins, always - a Tuesday does not overrule a year.',
        ],
        provenance: TRANSIENT_CYCLE,
    }),
    conceptUnit({
        key: 'cycle-turnover',
        label: 'When the Personal Year actually changes',
        headline: 'Two conventions, and this reading uses one of them.',
        core: [
            'The schools disagree about when a Personal Year begins. One rolls it over on 1 January with the calendar; another rolls it on the birthday, with a transitional overlap of some months on either side. Between January and your birthday the two conventions give different numbers, which is not a small discrepancy for a position read as a year-long climate.',
            'The Personal Year here uses the calendar-year convention, and says so rather than presenting the result as the only possible one. If your birthday falls late in the year and the Personal Year reading does not match how the year has actually felt, the birthday-pivot number is the one worth checking. The convention is a genuine choice rather than a settled matter, which is why it is stated here instead of buried.',
        ],
        provenance: TRANSIENT_CYCLE,
    }),
];
/* Personal Year, Month and Day reduce master numbers (methodology contract),
   so the nine digits are the whole reachable set; the 7s live with the worked
   example in numerologyRoles.ts. */
const withoutSeven = SINGLE_DIGITS.filter((key) => key !== '7');
assertComplete('Personal Year', withoutSeven, personalYear);
assertComplete('Personal Month', withoutSeven, personalMonth);
assertComplete('Personal Day', SINGLE_DIGITS, personalDay);
