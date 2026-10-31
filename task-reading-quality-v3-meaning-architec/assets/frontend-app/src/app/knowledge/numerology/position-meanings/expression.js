/**
 * EXPRESSION (also called Destiny) - what you were equipped with.
 *
 * The question this position answers is about capability: the tools in the hand, independent of what you want to do with them
 * (Soul Urge) or where the whole life is heading (Life Path). It is calculated from every letter of the birth name, so it describes
 * how you tend to work, not what you are for. The entries speak about skills and the way they are used and misused.
 */
export const EXPRESSION_MEANINGS = {
    1: {
        intro: 'One stands for beginning: the first move, self-direction, and the capacity to start something that did not exist yet.',
        meaning: 'As an Expression, the 1 describes the abilities you were handed: deciding on incomplete information, starting without waiting for agreement, and carrying something from nothing to a first working version. This is capability rather than direction. It shows in how you take hold of a shapeless situation. It works best once you also learn to bring other people along with the decision.',
        strengths: [
            'Initiative when nobody else will move',
            'Self-reliance under pressure',
            'Original solutions to problems with no precedent',
        ],
        challenges: [
            'Over-ruling people who have a better idea',
            'A pride that can hide your own errors',
            'Leaving others to catch up with a decision already made',
        ],
        shows: [
            'Being handed the job nobody else knows how to begin.',
            'Preferring to run your own project, or your own corner of one, where you set the method.',
        ],
        ask: 'When did you last change a plan because someone else\'s idea was better?',
    },
    2: {
        intro: 'Two stands for relationship: pairing, balance, listening, and the quiet work done between people.',
        meaning: 'As an Expression, the 2 describes relational skill: an accurate reading of a room, timing, and the ability to put a difficult thing in a form the other person can receive. These skills are real and often undervalued, because they make a result look as though it happened by itself. They work best in partnership, and they need a voice of your own to stay useful.',
        strengths: [
            'Tact that keeps a hard conversation open',
            'Mediating between people who cannot hear each other',
            'A sense of timing for when to speak and when to wait',
        ],
        challenges: [
            'Contributions that go unrecognised because they leave no visible mark',
            'Being unsettled by harsh words or open conflict',
            'Indecision when every side has a point',
        ],
        shows: [
            'Being the person who makes a team work without anyone noticing how.',
            'Counselling, mediation, music or support roles where listening is the main tool.',
        ],
        ask: 'Whose credit are you comfortable giving away, and whose have you been giving away by default?',
    },
    3: {
        intro: 'Three stands for expression: voice, imagination, play, and the instinct to make an inner thing visible to other people.',
        meaning: 'As an Expression, the 3 gives you the skills of communication itself: language, timing, and an instinct for the version of an idea that other people will take in. Whatever the subject, you can often find the shape in which it can be shared. The skill is most useful when it is pointed at something you care about, and when it is allowed to be finished rather than only impressive.',
        strengths: [
            'Explaining the complicated in plain, lively terms',
            'A natural sense of audience',
            'An imagination that produces options quickly',
        ],
        challenges: [
            'Effort scattered across too many interests',
            'Performing in place of connecting',
            'A mood that rises and falls with how the last piece was received',
        ],
        shows: [
            'Writing, speaking, teaching, design or performance as the natural medium of your work.',
            'Being asked to present, pitch or explain because you make people want to listen.',
        ],
        ask: 'Which of your unfinished projects deserves to be the one you complete?',
    },
    4: {
        intro: 'Four stands for structure: foundations, method, reliability, and the patience to build what lasts.',
        meaning: 'As an Expression, the 4 gives you practical skills: sequencing, systems, an eye for the joint that will fail, and the patience to close it. You can take an intention and turn it into something that still works when nobody is watching. The skill asks for permission to be unglamorous, and for room to adapt when the plan meets reality.',
        strengths: [
            'Turning a plan into steps and then into results',
            'A reliability other people build on',
            'A careful, honest accounting of what is true',
        ],
        challenges: [
            'Caution that is slow to try the untested',
            'Overwork when the standard is never quite met',
            'Impatience with colleagues who skip the groundwork',
        ],
        shows: [
            'Management, accounting, engineering, law or construction, where precision matters.',
            'Becoming the one who knows how things actually get done in a family or an organisation.',
        ],
        ask: 'What would you try if it did not have to be done properly the first time?',
    },
    5: {
        intro: 'Five stands for change: movement, curiosity, the senses, and freedom of choice.',
        meaning: 'As an Expression, the 5 describes the ability to adapt: learning fast under pressure, ease with incomplete information, and tolerance for conditions that change while you work. Put into a situation with no procedure, you are often the first to find a way through. The skill is strongest when paired with at least one commitment that you keep.',
        strengths: [
            'Thinking clearly when the situation changes',
            'Communicating and persuading across very different people',
            'Turning a new field into working knowledge quickly',
        ],
        challenges: [
            'Starting eagerly and losing interest before the finish',
            'Promising more than you will have time for',
            'Shallow connection when everything is moving',
        ],
        shows: [
            'Sales, travel, media, negotiation or any role that rewards versatility.',
            'A reputation for being the one to call when the plan has fallen apart.',
        ],
        ask: 'Which one thing would you finish this year if you decided it mattered?',
    },
    6: {
        intro: 'Six stands for care: home, responsibility, harmony, and the work of keeping people well.',
        meaning: 'As an Expression, the 6 gives you a talent for upkeep in the widest sense: noticing what a person, team or household actually needs, supplying it unasked, and holding the standard of a thing over time. It keeps things in good repair, relationships included. It works best with limits, because it can be called on without end.',
        strengths: [
            'Noticing what is out of balance before others do',
            'Making something dependable and well cared for',
            'Leading through trust rather than pressure',
        ],
        challenges: [
            'Feeling overburdened by what you have taken on',
            'Helping in ways that quietly control',
            'Perfectionism about how things should be',
        ],
        shows: [
            'Teaching, counselling, healing, design or hospitality, wherever care is the craft.',
            'Being the person who keeps the household or the team running.',
        ],
        ask: 'What would stay in good repair if you stepped back for a month?',
    },
    7: {
        intro: 'Seven stands for inquiry: the search for what is true beneath what is claimed, and the solitude that search needs.',
        meaning: 'As an Expression, the 7 describes analytic skill: you take things apart, check the seam, and find out. This is capability rather than direction: the abilities you were handed, whatever you choose to do with them. The skill deepens with specialisation. It needs a way to carry what you find back to people who were not there for the thinking.',
        strengths: [
            'Noticing patterns and inconsistencies others miss',
            'Sustained focus on a hard question',
            'Thorough, self-reliant research',
        ],
        challenges: [
            'Keeping conclusions private until they are finished',
            'A detachment that can read as criticism of people',
            'Assuming others follow your reasoning as quickly as you do',
        ],
        shows: [
            'Research, analysis, diagnostics, writing, or a craft followed to unusual depth.',
            'Being consulted as the person who has actually checked.',
        ],
        ask: 'What do you know well that you have never taught anyone?',
    },
    8: {
        intro: 'Eight stands for consequence: authority, resources, effort turned into results, and the responsibility that comes with power.',
        meaning: 'As an Expression, the 8 gives you the skills of consequence: an accurate read on where leverage sits, comfort with authority, and the ability to carry responsibility for a result. You do not need to be liked while you do it. It is a talent for organisation and resources, and it is judged by outcomes. It works best with a purpose larger than the result itself.',
        strengths: [
            'Strategic judgement of people and situations',
            'Efficiency with money, time and effort',
            'Holding responsibility under pressure',
        ],
        challenges: [
            'Rigidity when results are the only measure',
            'Driving yourself and others too hard',
            'Avoiding the material side of life, or being consumed by it',
        ],
        shows: [
            'Management, entrepreneurship, finance or the leadership of a whole organisation.',
            'Being given authority early because others sense you will carry the weight.',
        ],
        ask: 'What are you capable of that you only use when someone is watching the numbers?',
    },
    9: {
        intro: 'Nine stands for completion: the wide view, compassion, and the letting go that ends one cycle so another can begin.',
        meaning: 'As an Expression, the 9 gives you range and perspective as working skills: holding several positions accurately at once, and representing a view you do not share without distorting it. You can see the general shape a particular problem belongs to. It is a talent for synthesis and for service, and it works best when your own needs are counted among the things you serve.',
        strengths: [
            'Synthesis across fields that rarely meet',
            'Fairness toward people you disagree with',
            'A compassion that can teach as well as comfort',
        ],
        challenges: [
            'Setting your own needs aside for the cause',
            'Holding emotion back while carrying other people\'s',
            'Trusting too readily',
        ],
        shows: [
            'Law, politics, teaching, healing, the arts, or work for a public cause.',
            'Being asked to speak for a group or to bring opposing sides to one table.',
        ],
        ask: 'Which of your own needs have you been treating as less important than the cause?',
    },
    11: {
        intro: 'Eleven is read as a heightened two: sensitivity, intuition and inspiration at a higher intensity.',
        meaning: 'As an Expression, the 11 is the 2\'s skill set with one more ability: you register what has not been said, often before the other person has noticed it. In work that depends on reading a situation from thin evidence, this is a primary capability. It comes with a condition: an impression has to become an argument other people can check before it is of use.',
        strengths: [
            'Perceptiveness about people and what is about to happen',
            'A gift for illuminating an idea or teaching it',
            'Insight that arrives early',
        ],
        challenges: [
            'Mood swings tied to relationships',
            'Impracticality when inspiration outruns planning',
            'Stating a perception as certainty and being heard as arrogant',
        ],
        shows: [
            'Design, counselling, teaching, writing or any field where reading people comes first.',
            'A rich inner life alongside shyness or reluctance to push your own case.',
        ],
        ask: 'How would you explain your latest hunch to someone who needs evidence?',
        master: 'Beneath the 11 is the 2: cooperation, tact, patience. When you are tired, or in an ordinary week, these abilities often work as a plain 2. The master label describes intensity and range, not superiority.',
    },
    22: {
        intro: 'Twenty-two is read as a four at a larger scale: a big design joined to practical method.',
        meaning: 'As an Expression, the 22 combines two things that are hard to hold together. One is the 4\'s practical skill: sequence, materials, delivery. The other is the ability to hold a design too large to finish quickly. The capability is for building at scale, with other people. It needs help, because no single person can carry a plan this size.',
        strengths: [
            'Farsighted planning with real follow-through',
            'Persistence through slow, unglamorous phases',
            'Attracting capable collaborators to a shared design',
        ],
        challenges: [
            'Paralysis from the scale of what is possible',
            'Burnout from carrying too much of the load',
            'Settling for smaller aims because the large one seems unrealistic',
        ],
        shows: [
            'Organisational, architectural or institutional work, often with a wide reach.',
            'A habit of underplaying your own ambitions until a worthwhile project appears.',
        ],
        ask: 'Which part of the big design could someone else build as well as you can?',
        master: 'The 4 stays under the 22. On many days it works as a 4, patient and practical, and the larger design rests on exactly that work. The master label describes the size of task these abilities suit, not an assured outcome.',
    },
    33: {
        intro: 'Thirty-three is read as a six extended outward: the care of home and family offered to people one is not bound to.',
        meaning: 'As an Expression, the 33 gives you the 6\'s attention to what somebody needs, with the usual boundary taken off: it reaches beyond family or obligation. In teaching, medicine, ministry or any work that rewards sustained care, the skill is considerable. It is easiest to use well when you also have a way to recover.',
        strengths: [
            'Deep, patient attention to what others need',
            'Teaching that comforts as it informs',
            'Artistry and warmth in how you make things for people',
        ],
        challenges: [
            'Overextending for others at your own cost',
            'Carrying heavy duty without asking for help',
            'Care that begins to manage or control',
        ],
        shows: [
            'Work in education, counselling, healthcare or community service.',
            'A fuller sense of the toolkit arriving in the mid-thirties or later, often after a major change.',
        ],
        ask: 'What would you stop doing for others if you trusted them to manage?',
        master: 'The 6 sits under the 33 and supplies its home, harmony and responsibility, so on many days it reads as a 6. Traditions differ on whether 33 is a separate master number; here it is described as an intensity of the 6, not a higher rank.',
    },
};
