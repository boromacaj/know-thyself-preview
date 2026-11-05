/**
 * THE MOON - what you need in order to feel safe, and what you do before you have decided to do anything.
 *
 * The question this placement answers is about the emotional baseline: the reflex under stress, the comfort that restores you, the habits that
 * run without a decision. It is the most private of the Big Three and the one other people see least. Each entry is the short companion of the
 * registry's own reading of the same Moon (placements/luminaries.ts), whose headline is the sheet's title, so none of the lines below repeats it.
 */
export const MOON_MEANINGS = {
    aries: {
        title: 'Feeling arrives fast, at full volume, and clears.',
        meaning: 'A Moon in Aries describes feelings that arrive quickly and plainly: you tend to react before you reflect, and to settle once the feeling has been acted on or said. What soothes you is movement, honesty and something to do about it. The tension is patience: other people\'s slower emotional pace can feel like obstruction, and the first reaction is not always the truest one.',
        strengths: [
            'Emotional honesty',
            'Fierce loyalty to the people you love',
            'Quick recovery from a setback',
        ],
        challenges: [
            'A short fuse',
            'Defensiveness when challenged',
            'Treating a want as an emergency',
        ],
        shows: [
            'Needing to move, exercise or act when upset.',
            'Saying the thing outright and then being puzzled that it lingers for others.',
        ],
        ask: 'What would you do differently if you waited an hour before reacting?',
    },
    taurus: {
        title: 'Comfort is not a luxury here; it is the regulating mechanism.',
        meaning: 'A Moon in Taurus describes a need for steadiness, comfort and physical ease: regular rhythms, good food, familiar surroundings and a settled sense of what comes next. You tend to feel secure through the senses, and to be slow to anger and slow to forgive. The hard part is change: a disrupted routine can feel like losing the ground under you.',
        strengths: [
            'A calm that steadies other people',
            'Loyalty and patience in close relationships',
            'Practical, sensory ways of caring',
        ],
        challenges: [
            'Resisting change long after it is needed',
            'Shutting down in conflict instead of talking',
            'Using comfort to avoid hard feelings',
        ],
        shows: [
            'A strong response to touch, taste, music and the feel of a place.',
            'A long, quiet build-up before a rare outburst.',
        ],
        ask: 'What small discomfort would be worth accepting for something you want?',
    },
    gemini: {
        title: 'Feelings become manageable once they have been put into words.',
        meaning: 'A Moon in Gemini describes feelings that are processed through words and ideas: you tend to understand an emotion by talking or writing it through, and to need variety, conversation and mental stimulation to feel well. Where it strains is depth: describing a feeling can stand in for feeling it, and restlessness can keep you from staying with the harder ones.',
        strengths: [
            'Ease in putting feelings into language',
            'Curiosity about other people\'s inner lives',
            'A light, quick humour',
        ],
        challenges: [
            'Intellectualising feelings',
            'Restlessness that avoids emotional depth',
            'Mood shifts that others find hard to follow',
        ],
        shows: [
            'Talking things out with several people rather than one.',
            'A busy mind that is quietest while reading, writing or on the move.',
        ],
        ask: 'What are you describing that you have not yet let yourself feel?',
    },
    cancer: {
        title: 'The Moon at home, for better and for worse.',
        meaning: 'A Moon in Cancer describes a strong need for emotional security: closeness, familiar places and people who feel like family. This is the Moon in its own sign, so feelings are vivid, memories are long and care for others comes naturally. The tension is protection: the same sensitivity can make you retreat, cling to the past or care for others in order to avoid being cared for.',
        strengths: [
            'Empathy that senses what others need',
            'Devoted, nurturing care',
            'A good memory for what matters to people',
        ],
        challenges: [
            'Mood swings tied to how safe you feel',
            'Withdrawing into a shell when hurt',
            'Dwelling on old hurts and holding on to the past',
        ],
        shows: [
            'Needing a home base to recover.',
            'Remembering anniversaries, tastes and details that others forgot.',
        ],
        ask: 'Whose care could you accept without feeling you owe it back?',
    },
    leo: {
        title: 'Needing warmth, and needing it to be visible.',
        meaning: 'A Moon in Leo describes a need for warmth, appreciation and a place in the hearts of the people close to you: feelings are expressed openly and generously, and are soothed by being noticed. The price is the audience: a dependence on recognition can leave you hurt by an overlooked moment, and pride can stand in the way of saying so.',
        strengths: [
            'Generous, affectionate loyalty',
            'Creative joy that spreads',
            'The ability to make other people feel special',
        ],
        challenges: [
            'Hurt pride when unnoticed',
            'Sulking instead of asking',
            'Taking orders badly',
        ],
        shows: [
            'A warmth that fills a room, and a visible lift with praise.',
            'A loyalty that expects, in return, to be seen.',
        ],
        ask: 'What would you ask for if you were not afraid it would make you look needy?',
    },
    virgo: {
        title: 'Emotional safety through order, usefulness and small repairs.',
        meaning: 'A Moon in Virgo describes emotional security through order and usefulness: routines, tasks well done and a practical way of caring. Feelings are often guarded and are handled by fixing or analysing them. The strain is worry: the mind that sorts everything can also turn on itself and on others, and anxiety can pass for conscientiousness.',
        strengths: [
            'Reliable, practical care',
            'Close observation of what is wrong and how to mend it',
            'Modesty about its own help',
        ],
        challenges: [
            'Self-criticism',
            'Anxiety that rehearses everything that could go wrong',
            'Taking on other people\'s burdens',
        ],
        shows: [
            'Calming down by tidying, planning or being useful.',
            'Showing love through help rather than words.',
        ],
        ask: 'What feeling could you let be untidy for one evening?',
    },
    libra: {
        title: 'Equilibrium restored by putting the relationship right.',
        meaning: 'A Moon in Libra describes emotional comfort through harmony and partnership: calm, fairness and the company of someone with whom things can be shared. You tend to sense the balance of a room and to want to restore it. The hard part is yourself: keeping the peace can mean conceding too much, and your own needs can wait so long that they come out sideways.',
        strengths: [
            'Diplomacy and grace',
            'A gift for easing conflict',
            'Appreciation for beauty and calm',
        ],
        challenges: [
            'People-pleasing',
            'Passive resistance instead of open disagreement',
            'Difficulty deciding when feelings pull both ways',
        ],
        shows: [
            'Feeling unsettled when someone is upset with you.',
            'Seeking a partner or a close friend to think things through with.',
        ],
        ask: 'What disagreement have you been smoothing over that deserves to be had?',
    },
    scorpio: {
        title: 'Feeling that goes deep, stays private, and does not dilute.',
        meaning: 'A Moon in Scorpio describes emotion felt deeply and kept private: loyalty that is all or nothing, strong instincts about people and a need to trust before opening up. Feelings are intense and are not diluted. The tension is control: the fear of betrayal can lead to testing, suspicion or silence, and a hurt can be carried for years.',
        strengths: [
            'Emotional depth and staying power',
            'Intuition about hidden motives',
            'Fierce, steady loyalty',
        ],
        challenges: [
            'Suspicion and testing of the people closest to you',
            'Grudges held long past their use',
            'Controlling feelings by withholding them',
        ],
        shows: [
            'A small circle of people who are completely trusted.',
            'Sudden, total withdrawal when trust is broken.',
        ],
        ask: 'What would it cost to let one person see how much this matters to you?',
    },
    sagittarius: {
        title: 'Feeling handled by moving, and by finding the larger frame.',
        meaning: 'A Moon in Sagittarius describes emotional ease through freedom, movement and meaning: open air, new places, honest talk and a larger view in which a setback becomes part of a story. Feelings are met with humour and optimism. Where it goes wrong is avoidance: leaving a heavy mood by going somewhere else can look like flight, and commitment can feel like confinement.',
        strengths: [
            'Optimism that recovers quickly',
            'Warm, frank affection',
            'Curiosity that turns a bad day into a lesson',
        ],
        challenges: [
            'Leaving when feelings get heavy',
            'Sudden flare-ups of temper',
            'Resenting routine and restraint in close relationships',
        ],
        shows: [
            'Needing space, the outdoors or a change of scene to reset.',
            'Laughing a difficulty off before dealing with it.',
        ],
        ask: 'What are you travelling toward, or away from, in your closest relationship?',
    },
    capricorn: {
        title: 'Emotion managed rather than expressed, and managed well.',
        meaning: 'A Moon in Capricorn describes emotion that is managed carefully: respect, structure and achievement feel safe, and feelings are held in until there is a proper time and place. Maturity came early for many. The cost is expression: control can look like coldness, and the need to be capable can leave no room for being comforted.',
        strengths: [
            'Steadiness under pressure',
            'Dependability when others are not',
            'Quiet, practical loyalty',
        ],
        challenges: [
            'Self-criticism and pessimism',
            'Discomfort with emotional display',
            'Hiding vulnerability behind competence or dry humour',
        ],
        shows: [
            'Staying calm in a crisis and falling apart, if at all, in private.',
            'Feeling most secure when responsibilities are clear.',
        ],
        ask: 'Who is allowed to see you when you are not coping?',
    },
    aquarius: {
        title: 'Feeling observed from a short distance, usually accurately.',
        meaning: 'A Moon in Aquarius describes emotional comfort through independence, friendship and a little room: you tend to observe your feelings before you have them and to value understanding over intensity. The strain is closeness: detachment helps in a crisis and can leave other people feeling unreached, and strong feeling may be treated as an unwelcome irrationality.',
        strengths: [
            'Open-minded, inclusive friendship',
            'A calm perspective on other people\'s dramas',
            'Inventive ways of solving emotional problems',
        ],
        challenges: [
            'Emotional distance',
            'Stubbornness in the face of other people\'s needs',
            'Feeling like an outsider',
        ],
        shows: [
            'Needing time alone to sort out how you feel.',
            'Friendships built around shared ideas and causes.',
        ],
        ask: 'What feeling would be easier to share if you did not first have to explain it?',
    },
    pisces: {
        title: 'A feeling function with almost no wall around it.',
        meaning: 'A Moon in Pisces describes feelings with few barriers: you tend to take in other people\'s moods as if they were your own, to dream, to need solitude and to find comfort in music, water and the imagination. Compassion and intuition are the gift. The difficulty is overwhelm: without boundaries, tenderness can become exhaustion or escape.',
        strengths: [
            'Deep empathy and compassion',
            'Creative and intuitive sensitivity',
            'A gentleness that puts others at ease',
        ],
        challenges: [
            'Absorbing other people\'s moods',
            'Escaping through fantasy, sleep or substances when overwhelmed',
            'Being taken advantage of',
        ],
        shows: [
            'Crying at music or news that others take in their stride.',
            'Needing quiet time to separate your feelings from everyone else\'s.',
        ],
        ask: 'Which of today\'s feelings are actually yours?',
    },
};
