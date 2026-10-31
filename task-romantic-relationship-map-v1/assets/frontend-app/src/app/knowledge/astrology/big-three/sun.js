/**
 * THE SUN - who you are becoming, and what a life gets organised around.
 *
 * The question this placement answers is about identity and purpose: the part of the chart that says what you are for, what you keep returning to
 * when everything else is stripped away. It is not the whole person; the Moon (what you need) and the Ascendant (how you arrive) are as much of the
 * Big Three as it is. The twelve entries are written to that question, and each one is the short companion of the registry's own reading of the same
 * Sun (placements/luminaries.ts): the sheet's title is that reading's headline, so none of the lines below may repeat it.
 */
export const SUN_MEANINGS = {
    aries: {
        title: 'Purpose found in the moving, not in the planning.',
        meaning: 'A Sun in Aries points to an identity that is built by doing: you tend to find out who you are in the act of beginning something, and to feel most yourself when there is something to take on. Courage and directness are the signature, and the sign\'s gift is the willingness to go first. Its test is the middle of things, where staying with a project asks for a different kind of energy than starting one.',
        strengths: [
            'Courage to start before the way is clear',
            'Honesty that says what it means',
            'Energy that gets a stalled situation moving',
        ],
        challenges: [
            'Impatience when results take time',
            'A temper that flares quickly and clears',
            'Leaving a project half done when the novelty fades',
        ],
        shows: [
            'Taking the first step in a group, whether or not anyone asked you to.',
            'A competitive streak that sharpens you when the stakes are real.',
        ],
        ask: 'What have you been planning for so long that starting would now teach you more?',
    },
    taurus: {
        title: 'A life measured by what has actually been built.',
        meaning: 'A Sun in Taurus points to an identity anchored in what is real and lasting: the body, the work of the hands, a home, trust built up over years. You tend to move at your own pace and to resist being hurried, and the steadiness other people rely on comes from that. The sign\'s test is change, which can feel like a loss even when it is an improvement.',
        strengths: [
            'Patience that outlasts other people\'s enthusiasm',
            'Reliability in small things and large',
            'A feel for quality, comfort and what is worth paying for',
        ],
        challenges: [
            'Stubbornness once a position is taken',
            'Staying in an arrangement long after it stopped working',
            'Possessiveness about people, things or routines',
        ],
        shows: [
            'Slow, careful decisions that rarely need to be reversed.',
            'A strong pull toward good food, music, nature or a well-made object.',
        ],
        ask: 'What are you keeping because it is yours rather than because it still serves you?',
    },
    gemini: {
        title: 'A self assembled from everything it has found interesting.',
        meaning: 'A Sun in Gemini points to an identity that grows by contact: conversation, reading, questions, other people\'s ideas and the connections between them. Versatility is the signature, and the sign tends to be several things at once rather than one thing deeply. Its test is focus, because the interesting thing nearby is always a rival to the important thing in hand.',
        strengths: [
            'Quick learning and an easy way with words',
            'Adaptability to people and situations',
            'A light touch that makes hard subjects approachable',
        ],
        challenges: [
            'Attention scattered across too many things',
            'Staying on the surface to avoid heavier feelings',
            'Saying yes to more than can be finished',
        ],
        shows: [
            'A wide circle of acquaintances and many half-read books.',
            'Work that involves explaining, connecting, writing or moving information about.',
        ],
        ask: 'Which one of your many interests would you still choose if you had to give up all the others?',
    },
    cancer: {
        title: 'Purpose built around what you are protecting.',
        meaning: 'A Sun in Cancer points to an identity rooted in belonging: family, home, the people and places that feel like yours, and the memory that holds them. Protectiveness is the signature, along with an intuitive reading of other people\'s moods. The test is the shell: care for others can turn into withdrawal when you feel unsafe, and the past can hold more of the present than it should.',
        strengths: [
            'Intuition about what other people need',
            'Loyalty that lasts across years',
            'A talent for making a place feel like home',
        ],
        challenges: [
            'Moods that shift with the weather of the room',
            'Withdrawing when hurt instead of saying so',
            'Holding on to the past, or to old grievances',
        ],
        shows: [
            'A strong sense of family, whether the one you were born into or the one you made.',
            'Cooking, caring or remembering as ways of showing love.',
        ],
        ask: 'What would feel safe enough to say out loud instead of retreating from?',
    },
    leo: {
        title: 'A self that is not fully real until it is witnessed.',
        meaning: 'A Sun in Leo points to an identity that wants to be expressed: creativity, warmth, generosity and a wish to leave a visible mark. This is the sign the Sun itself rules, so the pull to shine is straightforward and, handled well, it lights a room. Its test is dependence on the response: recognition feeds it, and a slight can sting more than it should.',
        strengths: [
            'Generosity with time, praise and attention',
            'Creative confidence',
            'Loyalty to the people it has chosen',
        ],
        challenges: [
            'A need for acknowledgement that can look like vanity',
            'Pride that makes apologising hard',
            'Drama when the spotlight moves elsewhere',
        ],
        shows: [
            'Taking the lead in a group almost without deciding to.',
            'Putting real effort into things that carry your name.',
        ],
        ask: 'What would you make or do if nobody were ever going to applaud it?',
    },
    virgo: {
        title: 'Identity through work that is actually useful.',
        meaning: 'A Sun in Virgo points to an identity formed through skill and service: noticing what could work better and doing the careful work of making it so. Precision and reliability are the signature, and satisfaction comes from being quietly useful. The sign\'s test is its own standard: the eye that improves things also finds fault, and it is often hardest on its owner.',
        strengths: [
            'Analytical care and attention to detail',
            'Practical help that actually helps',
            'Reliability that others build on',
        ],
        challenges: [
            'Perfectionism that delays finishing',
            'A self-critical voice louder than any other',
            'Worry over details that cannot be controlled',
        ],
        shows: [
            'Being the one who notices the error before it matters.',
            'A tidy system, a good checklist or a well-kept routine that makes life easier for others.',
        ],
        ask: 'What would "good enough" look like for something you have been polishing for too long?',
    },
    libra: {
        title: 'A self that comes into focus opposite someone else.',
        meaning: 'A Sun in Libra points to an identity formed in relationship: weighing both sides, seeking fairness and finding out who you are in the company of someone else. Tact, taste and a gift for harmony are the signature. The hard part is decision: the habit of seeing every side can leave your own view for last, and peace can be bought at the price of honesty.',
        strengths: [
            'Diplomacy that eases tension',
            'An eye for balance and beauty',
            'A genuine interest in fairness',
        ],
        challenges: [
            'Indecision when every option has merit',
            'Avoiding conflict until it has grown',
            'Putting other people\'s preferences first by reflex',
        ],
        shows: [
            'Mediating, hosting or bringing people together.',
            'A visible discomfort when a room is out of balance.',
        ],
        ask: 'What do you actually want here, before anyone else\'s view is counted?',
    },
    scorpio: {
        title: 'A life that only counts the parts that went all the way in.',
        meaning: 'A Sun in Scorpio points to an identity that goes to the depths: you tend to care about what lies beneath the surface, to commit completely or not at all, and to be changed by what you go through. Intensity and perceptiveness are the signature. Where it strains is trust: guardedness protects you and also keeps people at a distance, and a hurt can be held for a very long time.',
        strengths: [
            'Resilience through difficulty',
            'Perception of what is not being said',
            'Loyalty and focus once committed',
        ],
        challenges: [
            'Guardedness that is hard to let down',
            'Suspicion of other people\'s motives',
            'Holding on to a grievance far past its use',
        ],
        shows: [
            'A preference for a few deep bonds over many light ones.',
            'Periods of intense change that leave you a different person.',
        ],
        ask: 'What are you guarding yourself against that is no longer there?',
    },
    sagittarius: {
        title: 'Purpose that needs the horizon in it somewhere.',
        meaning: 'A Sun in Sagittarius points to an identity oriented toward meaning and freedom: travel, ideas, belief, teaching and the sense that life is bigger than the immediate. Optimism and honesty are the signature. The test is staying power: the horizon is always more attractive than the detail, and enthusiasm can outrun both tact and follow-through.',
        strengths: [
            'Optimism that lifts others',
            'Plain honesty',
            'A hunger to learn and to share what is learned',
        ],
        challenges: [
            'Bluntness that lands harder than meant',
            'Restlessness with routine and constraint',
            'Promising more than the calendar allows',
        ],
        shows: [
            'A pull toward travel, study, philosophy or teaching.',
            'Telling people what you think before they have asked.',
        ],
        ask: 'Where might the detail you keep skipping be the very thing that decides the outcome?',
    },
    capricorn: {
        title: 'A self built slowly, against resistance, on purpose.',
        meaning: 'A Sun in Capricorn points to an identity formed through effort over time: responsibility taken early, goals held for years, and respect earned rather than assumed. Discipline and ambition are the signature, usually in a quiet form. The cost is warmth: the sign can work so hard at being capable that it forgets to rest, to ask for help or to be seen being human.',
        strengths: [
            'Discipline that finishes long projects',
            'Realism about what a thing will take',
            'Dependability under pressure',
        ],
        challenges: [
            'Overwork as a measure of worth',
            'A reserve that keeps even friends at arm\'s length',
            'Pessimism when plans slip',
        ],
        shows: [
            'Taking on responsibility earlier than your peers.',
            'Quiet pride in a long climb that nobody saw being made.',
        ],
        ask: 'What would you do this year if you did not have to earn it first?',
    },
    aquarius: {
        title: 'Identity held at a slight, deliberate distance.',
        meaning: 'A Sun in Aquarius points to an identity based on independence of mind: original thinking, loyalty to principle and a concern for the group rather than only the individual. Inventiveness and fairness are the signature. The test is closeness: the stance of the observer lets you see clearly and can also keep feelings, yours and other people\'s, out of reach.',
        strengths: [
            'Original thinking',
            'A sense of fairness toward groups and strangers',
            'Loyalty to principle over popularity',
        ],
        challenges: [
            'Emotional distance that reads as coldness',
            'Fixed opinions defended on principle',
            'Neglecting everyday needs for the sake of the idea',
        ],
        shows: [
            'Belonging to a group or cause without quite blending in.',
            'Surprising people with a view they did not expect from you.',
        ],
        ask: 'Who would you let closer if the principle did not require you to stand back?',
    },
    pisces: {
        title: 'A self with unusually soft edges, and better vision for it.',
        meaning: 'A Sun in Pisces points to an identity that is porous and imaginative: you take in the moods of people and places, feel for what is unseen and often find yourself through art, faith or compassion. Empathy and creativity are the signature. The risk is boundary: the same openness that perceives so much can be overwhelmed, and the pull to escape is real.',
        strengths: [
            'Compassion that is felt, not performed',
            'Imagination and artistic sensitivity',
            'Intuition about people',
        ],
        challenges: [
            'Boundaries that dissolve under pressure',
            'Escapism when reality is heavy',
            'Being taken advantage of by people who sense your kindness',
        ],
        shows: [
            'Absorbing the mood of a room before you have said a word.',
            'Needing time alone, in quiet or near water, to feel like yourself again.',
        ],
        ask: 'Where do you end and other people\'s feelings begin, today?',
    },
};
