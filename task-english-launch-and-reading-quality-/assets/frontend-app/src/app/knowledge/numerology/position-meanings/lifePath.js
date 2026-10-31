/**
 * LIFE PATH - the terrain a life keeps returning to.
 *
 * The question this position answers is the long one: not what you are good at (Expression), not what satisfies you (Soul Urge), not
 * what people meet first (Personality), but which recurring situation a life keeps arranging, and what that situation asks of the person
 * in it. The twelve entries are written to that question, so the same number reads differently here than in the other three.
 */
export const LIFE_PATH_MEANINGS = {
    1: {
        intro: 'One stands for beginning: the first move, self-direction, and the capacity to start something that did not exist yet.',
        meaning: 'As a Life Path, the 1 describes a road that keeps placing you at the front edge of things, where somebody has to decide that something begins. The road tends to teach self-reliance early. Over time the lesson changes from proving that you can go alone to choosing when going alone is worth what it costs.',
        strengths: [
            'Starting what others only discuss',
            'Deciding without waiting for agreement',
            'An originality that comes from not taking the usual route',
        ],
        challenges: [
            'Impatience with people who move at a different pace',
            'A need to control that can be read as dismissal',
            'Difficulty accepting help or direction when it would actually matter',
        ],
        shows: [
            'Becoming the person others turn to when something has to be set in motion, whether or not you asked for the role.',
            'Long stretches of working largely alone, followed by a growing pull to lead or to set your own terms.',
        ],
        ask: 'Where are you still doing alone something that a second pair of hands would improve?',
    },
    2: {
        intro: 'Two stands for relationship: pairing, balance, listening, and the quiet work done between people.',
        meaning: 'As a Life Path, the 2 describes a life spent mediating, supporting, translating and holding a partnership or a group together. Much of the work does not show up as work. The road asks when to give way and when to hold a position. Its growth is learning that sensitivity is a way of reading a situation, not a debt owed to everyone in it.',
        strengths: [
            'Diplomacy that settles what argument would not',
            'Noticing what has not been said',
            'Patience in long partnerships and collaborations',
        ],
        challenges: [
            'Self-erasure through too much accommodating',
            'Avoiding a conflict until it arrives much larger',
            'Treating other people\'s moods as your responsibility',
        ],
        shows: [
            'Being the steady one in a family, team or partnership while your own wishes arrive last in the conversation.',
            'Influence that works quietly, through who you talk to and how, rather than through announcements.',
        ],
        ask: 'Which preference of yours have you stopped mentioning, and what would it cost to say it plainly?',
    },
    3: {
        intro: 'Three stands for expression: voice, imagination, play, and the instinct to make an inner thing visible to other people.',
        meaning: 'As a Life Path, the 3 describes a life that keeps asking you to say, show or make something in a form other people can take in. It need not be on a stage. The road tends to be social and creative, with warmth as its currency. Its test is staying power: turning an easy gift into finished work, and letting a real feeling be heard without a joke laid over it.',
        strengths: [
            'Making ideas approachable and enjoyable',
            'Lifting the mood of a room without effort',
            'An imagination that finds the fresh angle',
        ],
        challenges: [
            'Energy spread across more beginnings than can be finished',
            'Humour or charm used to deflect something tender',
            'Sensitivity to criticism that goes unspoken',
        ],
        shows: [
            'Work or interests built around words, performance, design, teaching, or simply being the one who explains.',
            'A rhythm of fertile bursts and flat spells, depending on whether the work currently has someone to receive it.',
        ],
        ask: 'What are you carrying that you have only ever told as a funny story?',
    },
    4: {
        intro: 'Four stands for structure: foundations, method, reliability, and the patience to build what lasts.',
        meaning: 'As a Life Path, the 4 describes a life judged by what you have built and kept in working order: a craft, a household, a body of work, an institution. The road often brings early responsibility and a habit of doing what is needed rather than what is exciting. Its growth is keeping the discipline without letting the structure turn into a cage, and learning that change can be a repair rather than a threat.',
        strengths: [
            'Following a plan through its dull middle',
            'A reputation for keeping your word',
            'An eye for the weak joint before it fails',
        ],
        challenges: [
            'Rigidity when circumstances change',
            'Overwork as a way of proving worth',
            'Distrust of ideas that cannot yet be checked',
        ],
        shows: [
            'A rise through long effort rather than sudden luck, with the results arriving later than the work.',
            'Becoming the load-bearing person in a family or workplace, often without much thanks.',
        ],
        ask: 'Which rule you follow was built for a situation that no longer exists?',
    },
    5: {
        intro: 'Five stands for change: movement, curiosity, the senses, and freedom of choice.',
        meaning: 'As a Life Path, the 5 describes a life of changing places, work, ideas and circles, with your need for room as the constant. The road gives a wide education through experience. Its growth is finding where commitment and freedom stop being opposites, choosing something deeply enough to stay and discovering that staying can itself be a free act.',
        strengths: [
            'Learning quickly in unfamiliar situations',
            'An adaptability that steadies others in a crisis',
            'Curiosity that connects unlike people and ideas',
        ],
        challenges: [
            'Restlessness that leaves things half done',
            'Using excess to feel awake',
            'Reluctance to be pinned down in close relationships',
        ],
        shows: [
            'A winding path of careers, homes or interests that looks scattered from outside and consistent from within.',
            'Settling into a focus relatively late, after a long period of exploration.',
        ],
        ask: 'What would you commit to if you knew your freedom would survive it?',
    },
    6: {
        intro: 'Six stands for care: home, responsibility, harmony, and the work of keeping people well.',
        meaning: 'As a Life Path, the 6 describes a life of responsibility for other people\'s wellbeing: a household, a team, a friend in difficulty. It is responsibility of a caring kind rather than command. The road asks you to learn the difference between support that strengthens a person and care that quietly takes over, and to let yourself be looked after as well.',
        strengths: [
            'Making a place feel safe and well run',
            'Loyalty that lasts through bad years',
            'A sense of fairness in disputes',
        ],
        challenges: [
            'Over-giving that turns into resentment',
            'Taking over what others could do for themselves',
            'Neglecting your own needs until they surface as exhaustion',
        ],
        shows: [
            'Becoming the family anchor, the counsellor, or the one people bring their problems to.',
            'A strong pull toward beauty, order and a well-kept home as a source of balance.',
        ],
        ask: 'Whose burden are you carrying that is not yours to carry?',
    },
    7: {
        intro: 'Seven stands for inquiry: the search for what is true beneath what is claimed, and the solitude that search needs.',
        meaning: 'As a Life Path, the 7 describes a life organised around a question rather than an answer. Understanding is the terrain: you keep finding yourself where an explanation is only partial and somebody ought to check. The road alternates between withdrawing to think and coming back with something found. Its growth is joining the inner search to ordinary life and other people, so that accuracy does not become a place to hide.',
        strengths: [
            'Analysis that looks past the standard answer',
            'Depth and focus over long periods',
            'Independence of judgement',
        ],
        challenges: [
            'Withdrawal that slides into isolation',
            'A standard of proof turned on yourself with no off switch',
            'Expecting others to guess what you need',
        ],
        shows: [
            'Long stretches of quiet work before anything is visible, then something arriving more or less finished.',
            'Close relationships that need an explanation of why silence is not distance.',
        ],
        ask: 'Who has never been shown what you actually think?',
    },
    8: {
        intro: 'Eight stands for consequence: authority, resources, effort turned into results, and the responsibility that comes with power.',
        meaning: 'As a Life Path, the 8 describes a life in the arena where intentions are tested by results: money, authority, ownership, organisation, scale. The road tends to teach through cycles of building, loss and rebuilding. Its growth is learning that influence is lent by the people who grant it, so the working question becomes what you do with it and who is better off.',
        strengths: [
            'Seeing where leverage sits in a situation',
            'Resilience after setbacks',
            'Organising people and resources toward a result',
        ],
        challenges: [
            'Equating your worth with status or output',
            'Holding control too tightly',
            'Relationships that thin out while work absorbs everything',
        ],
        shows: [
            'Work in business, finance, management, property or any field where outcomes are counted.',
            'A life with visible rises and falls in material security, and a growing sense of what the rises were for.',
        ],
        ask: 'What would success look like if nobody could see it?',
    },
    9: {
        intro: 'Nine stands for completion: the wide view, compassion, and the letting go that ends one cycle so another can begin.',
        meaning: 'As a Life Path, the 9 describes a life that keeps pulling the view back to something larger than the personal: causes, groups, whole situations seen from several sides. The road tends to include endings, partings and release. Its growth is staying warm toward the individual people near you while serving the general good, and finishing things without waiting for the world to become perfect.',
        strengths: [
            'Seeing a situation from several sides at once',
            'Generosity that is not a transaction',
            'The ability to finish something and let it go',
        ],
        challenges: [
            'Frustration at how far the world falls from what it could be',
            'Giving to causes while people close by wait',
            'Holding on to what has already ended',
        ],
        shows: [
            'Work or service in teaching, healing, law, the arts, or any field that exists for the benefit of many.',
            'Repeated cycles of closing a chapter and rebuilding, each one a little wider than the last.',
        ],
        ask: 'What have you finished that you are still treating as unfinished?',
    },
    11: {
        intro: 'Eleven is read as a heightened two: sensitivity, intuition and inspiration at a higher intensity.',
        meaning: 'As a Life Path, the 11 describes a life in which you receive more impressions than you have evidence for: atmospheres, undercurrents, ideas that arrive ahead of their proof. The road tends to include a long apprenticeship, with sensitivity first felt as a burden and only later as a capacity. Its growth is translating what you sense into something other people can check and use, and keeping the nervous system supplied with rest.',
        strengths: [
            'Perceiving what has not yet been said',
            'Inspiring others without trying to',
            'An idealism that holds a direction when things are unclear',
        ],
        challenges: [
            'A sensitivity that can overwhelm',
            'Self-criticism measured against an inner standard no one could meet',
            'Plans that stay impractical because the intuition is never tested',
        ],
        shows: [
            'A late-blooming pattern, with a sense of coming into your own in the middle years.',
            'Swings between a confident, visionary period and a quieter, two-like period of support and withdrawal.',
        ],
        ask: 'What have you sensed that you have not yet put into words someone else could test?',
        master: 'The 2 stays underneath the 11: partnership, patience, tact. On ordinary days the 11 may simply read as a 2. The master label describes intensity, not rank, and it brings more strain along with more range.',
    },
    22: {
        intro: 'Twenty-two is read as a four at a larger scale: a big design joined to practical method.',
        meaning: 'As a Life Path, the 22 describes a life pointed at an undertaking too long for a single effort: an institution, a body of work, a system other people will use. The road tends to include a long preparation in which little is yet standing. Its growth is making the large thing small enough to start, and sharing the building so that it does not depend on you alone.',
        strengths: [
            'Holding a large design and its practical steps together',
            'Persistence over many years',
            'Bringing different people behind a shared aim',
        ],
        challenges: [
            'A plan refined for years that never breaks ground',
            'Ambition that leaves little room for ease or delegation',
            'Self-doubt in the gap between the vision and the result',
        ],
        shows: [
            'Years of quiet competence followed by work that carries real weight.',
            'A strong pull toward projects that serve many people rather than a few.',
        ],
        ask: 'What is the first load-bearing piece you could build this month?',
        master: 'The 4 sits underneath the 22: sequence, materials, patience. In many weeks the 22 works as a plain 4, laying the foundation the larger design needs. The number describes a scale of effort, not a promise of achievement.',
    },
    33: {
        intro: 'Thirty-three is read as a six extended outward: the care of home and family offered to people one is not bound to.',
        meaning: 'As a Life Path, the 33 describes a life in which the care of the 6 reaches past family to people who have no claim on you: students, patients, strangers, a community. The road tends toward service, teaching and attention to other people\'s difficulty. Its growth is giving from enough rather than from depletion, and allowing others to carry their own lessons.',
        strengths: [
            'A steady compassion that people feel as safety',
            'Teaching by example',
            'Seeing what a person needs beneath what they ask for',
        ],
        challenges: [
            'Self-sacrifice that nobody requested',
            'Absorbing other people\'s feelings as your own',
            'Directing others when they need room to learn',
        ],
        shows: [
            'Work or roles in teaching, healing, ministry or community care.',
            'Being the person strangers confide in, often on very short acquaintance.',
        ],
        ask: 'Where are you giving from exhaustion, and who does that actually protect?',
        master: 'The 6 stands underneath the 33, and its themes of home, responsibility and balance are why the 33 often reads as a 6 day to day. It is the rarest of the three master numbers, and traditions differ on whether to read it separately; here it is kept distinct and described as intensity, not status.',
    },
};
