/*
 * SITUATIONS FOR PAIRS THE V2.1 TABLES DID NOT COVER (V2.2).
 *
 * Same rules as `narrativeSituations.ts`: keyed by axis and alphabetical tag pair, two
 * or three sentences, a tendency never a fact, no biography or prediction, and every
 * pair is a pair of tags on OPPOSITE poles of the axis (a test holds the table to that).
 *
 * Written from the coverage scan in the review packet: every pair of tags that sits on
 * opposite poles of an axis (`POLE_TAGS`) and had no written situation. The scan is a test
 * now, so a pair cannot silently lose its situation.
 *
 * They describe the MEETING, not the person: nothing here says what anybody is. Where a
 * reading says a tendency, the sentence before it has already named the two sides.
 */
export const MORE_SITUATIONS = {
    'inner-focus': {
        'investigation+visibility': 'Working things out in depth and being seen to have worked them out do not run on the same schedule. The thinking is done long before it is shown, so what others meet is a finished position without the route, and the work can go unrecognised until it is explained.',
        'expression+investigation': 'The inclination to dig and the inclination to say it compete for the same hours. Findings tend to be talked through before they are finished, and the talking either sharpens them or ends the digging early, which only the next day reveals.',
        'receptivity+visibility': 'Taking things in and being seen both ask for attention at once. Time spent absorbing a room is time not spent being in it, so contributions arrive late, and they are often better for it.',
        'expression+receptivity': 'Listening and speaking take turns without agreeing on the order. Much is taken in and not said, or said at once and only understood afterwards, and it helps to notice which of the two has been running the conversation.',
    },
    reasoning: {
        'deliberation+receptivity': 'Waiting for an answer to arrive and weighing it up are two kinds of patience. One lets the impression settle and the other tests it, and the useful habit is to give the first a night before the second begins.',
    },
    risk: {
        'speed+verification': 'Moving fast and checking carefully are both ways of coping with risk, and they cope with it differently. The check is real but tends to arrive after the move, so it protects the next decision better than the one already made.',
        'autonomy+verification': 'Deciding on your own account and having the facts checked first do not always agree on what counts as enough. Risk gets taken alone, but only after an audit nobody else sees, so it can look bolder from outside than it feels from inside.',
        'autonomy+deliberation': 'The wish to decide for yourself and the habit of taking time over it pull on the same decision. The delay can look like caution and is often the time it takes to make a choice that is truly your own.',
    },
    'emotional-expression': {
        'feeling+privacy': 'Feeling runs deep and privacy decides how much of it travels. The people closest see more than the people nearby, and the difference is rarely explained, so it can be read as coolness when it is closer to selectiveness.',
        'containment+expression': 'Wanting to say it and wanting to hold it back are both strong. What gets said is usually well put and edited, and what is held back tends to be the part that would have explained the rest.',
    },
    visibility: {
        'calibration+privacy': 'Being tuned to the room and keeping a private side sit together uneasily. A great deal is read and adjusted for in public, and the adjusting is part of what stays private, so people see the effect without seeing the effort.',
        'containment+visibility': 'Being seen and keeping a reserve are held in the same hand. Presence can be strong in a defined setting and very little is offered beyond it, which people may take for the whole of the person.',
        'containment+expression': 'Expression has a defined place and a defined limit. Within it the voice is easy and sometimes striking; outside it little is said, and the line between the two is rarely announced.',
        'calibration+containment': 'Reading what others need and holding back what you feel can look like one thing. Often it is: what is shown is what the room can take, and the rest is kept for later or for no one.',
    },
    change: {
        'improvisation+protection': 'Wanting to protect what has been built and wanting to change course are each reasonable and rarely agree on timing. Change tends to be weighed at length and then made in a rush, because protection holds until the cost of holding becomes obvious.',
    },
    initiative: {
        'embodiment+speed': 'The body answers and the pace is already up. The first move is quick and often right, and it leaves little room to ask whether the situation wanted something else.',
        'autonomy+deliberation': 'The wish to lead and the habit of waiting both claim the first move. Starting is put off for the right moment and then happens suddenly, which others may read as indecision followed by impulse.',
        'autonomy+embodiment': 'The decision is felt in the body and then claimed as one’s own. That makes for a quick, confident-looking start that cannot easily be explained afterwards, and explaining is where others tend to need help.',
        'control+embodiment': 'Wanting to steer and trusting a bodily yes or no pull at each other. Plans are made and then overridden by a response that arrives later, and the skill is learning which of the two to trust when.',
        'calibration+control': 'Wanting to be in charge and wanting to read the room first are separate skills used in one moment. The result is leadership that adjusts mid-stride, which is valuable when it is noticed and confusing when it is not.',
        'expression+receptivity': 'Speaking up and holding back to see what is needed compete in every conversation. What is said is usually right for the moment and arrives a beat later than it could have.',
        'embodiment+expression': 'The body responds and the voice follows, sometimes before there is a plan. That makes for vivid, immediate speech and an occasional wish to take part of it back.',
        'calibration+expression': 'Saying what you think and fitting it to the listener each want to go first. The message is usually well pitched and slightly softened, and what is lost is the first, plainer version, which was sometimes the better one.',
    },
    abstraction: {
        'investigation+refinement': 'Wanting to understand and wanting to improve are different ways of staying with a problem. Understanding can continue after the improvement is good enough, and the improvement can be pushed through before it is understood.',
        'abstraction+embodiment': 'The general principle and the felt sense of what works are two kinds of knowing. The principle is easier to explain and the felt sense is often the one that proves right, which makes it hard to say afterwards why a decision was made.',
        'embodiment+investigation': 'Working with what the hands and the body find works, and wanting to know why it works, are not the same pursuit. The doing tends to run ahead of the explanation, and the explanation, when it comes, changes less than expected.',
    },
};
