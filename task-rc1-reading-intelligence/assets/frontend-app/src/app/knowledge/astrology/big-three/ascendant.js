/**
 * THE ASCENDANT - how you arrive: the manner, pace and first impression you bring into a room, and the interface through which the rest of the chart reaches people.
 *
 * The Ascendant is not a body but a point: the degree of the zodiac rising on the eastern horizon at the moment and place of birth. It moves through all twelve
 * signs in a day, so it needs a real birth time and place, and the product withholds it when there is no time (see the dialog's note). The question this placement
 * answers is about presentation: what people meet first, and how that first reading can be right, partial or mistaken. The registry has an archetype for each sign
 * but no reading written to the Ascendant, so the titles below are authored here; they are the sheet's titles for this placement only.
 */
export const ASCENDANT_MEANINGS = {
    aries: {
        title: 'Arrives first, and is read as direct.',
        meaning: 'An Ascendant in Aries presents a first impression of speed and directness, of moving toward things and saying what you think. The manner is bold and energetic, with a readiness for a challenge. The tension is pace: what reads as confidence can be taken as impatience or aggression, and the surface is often bolder than what lies beneath it.',
        strengths: [
            'Courage that is visible at once',
            'Directness that cuts through hesitation',
            'Enthusiasm that other people can catch',
        ],
        challenges: [
            'Seeming more aggressive than intended',
            'Acting before listening',
            'Hiding uncertainty behind a bold front',
        ],
        shows: [
            'Walking into a new situation as if it were already yours.',
            'People assuming you are certain when you are only decided.',
        ],
        ask: 'What does the person behind the bold first move need that you rarely mention?',
    },
    taurus: {
        title: 'A calm, unhurried arrival.',
        meaning: 'An Ascendant in Taurus presents a calm, steady arrival: unhurried, grounded and pleasant to be around, with a quiet sensuality of manner. The first impression is of reliability. The difficulty is movement: patience can be taken for stubbornness, and a settled surface can resist change for a long time before anything shows.',
        strengths: [
            'A steadying presence',
            'Patience that puts others at ease',
            'Good taste and a feel for comfort',
        ],
        challenges: [
            'Seeming immovable',
            'Slowness to adapt to new ways',
            'Possessiveness once a bond is made',
        ],
        shows: [
            'Being trusted with things on short acquaintance.',
            'A voice, a pace or a style of dress that suggests quality over fashion.',
        ],
        ask: 'What would you try if you did not need to be sure of the ground first?',
    },
    gemini: {
        title: 'Quick, curious, and always mid-conversation.',
        meaning: 'An Ascendant in Gemini presents a manner in motion: asking questions, telling a story and already thinking of the next thing. The first impression is of wit and adaptability. The cost is depth: what reads as charm can be taken as restlessness, and a light surface can hide how much is going on beneath it.',
        strengths: [
            'Easy conversation with strangers',
            'A quick, adaptable mind',
            'Humour that puts people at ease',
        ],
        challenges: [
            'Seeming scattered or hard to pin down',
            'Interrupting in your eagerness',
            'A cool, detached manner when things get personal',
        ],
        shows: [
            'Being the person who starts the conversation at a gathering.',
            'Hands, eyes and speech that are in motion.',
        ],
        ask: 'What would you say if you stopped talking about everything else?',
    },
    cancer: {
        title: 'Gentle at the door, and guarded behind it.',
        meaning: 'An Ascendant in Cancer presents a gentle, receptive manner with a shell behind it: approachable and caring, while keeping something back. The first impression is of warmth and familiarity. The tension is exposure: moods show on the face, and the protective manner can read as distance until trust is earned.',
        strengths: [
            'An approachable, caring presence',
            'Sensitivity to the mood of the room',
            'Loyalty that people feel quickly',
        ],
        challenges: [
            'Moodiness visible to everyone',
            'Retreating into a shell when unsafe',
            'Difficulty voicing feelings directly',
        ],
        shows: [
            'People confiding in you early.',
            'A protective, slightly indirect way of approaching new people.',
        ],
        ask: 'What would you show people sooner if you were sure the room was safe?',
    },
    leo: {
        title: 'Hard to miss, and warm with it.',
        meaning: 'An Ascendant in Leo presents an arrival that takes up space warmly: confident, a little theatrical and generous with attention. The first impression is of dignity and enjoyment. The strain is the show: presence can come across as pride, and wanting to be seen can leave less room for being known.',
        strengths: [
            'Natural warmth and authority',
            'Generosity that people notice',
            'Storytelling and good humour',
        ],
        challenges: [
            'Seeming proud or dramatic',
            'Needing recognition to feel secure',
            'Being a bit too much for quieter people',
        ],
        shows: [
            'Being noticed as soon as you enter a room.',
            'Others looking to you to lead, host or speak.',
        ],
        ask: 'What would it be like to be known for something other than the performance?',
    },
    virgo: {
        title: 'Careful, modest, and watching before speaking.',
        meaning: 'An Ascendant in Virgo presents a reserved, observant arrival: modest, watching before joining in and warming up gradually. The first impression is of competence and care. The hard part is critique: what reads as discernment can be taken as coolness or fault-finding, and a composed surface often carries a good deal of worry.',
        strengths: [
            'A polished, dependable first impression',
            'Attention to what others need',
            'Practical competence',
        ],
        challenges: [
            'Seeming critical or aloof',
            'Worrying about how you come across',
            'Perfectionism about appearance and detail',
        ],
        shows: [
            'Preparing carefully before meeting people.',
            'Being asked for help because you seem capable.',
        ],
        ask: 'What would you say about yourself if you did not first have to get it right?',
    },
    libra: {
        title: 'Pleasant, balanced, and easy to meet.',
        meaning: 'An Ascendant in Libra presents a gracious, easy manner: polite, attentive and trying to put everyone at ease. The first impression is of charm and fairness. The tension is the mask: what reads as agreeable can be taken as noncommittal, and the wish to please can hide what you think.',
        strengths: [
            'Charm that opens doors',
            'Tact in awkward moments',
            'An eye for grace and proportion',
        ],
        challenges: [
            'Avoiding conflict by agreeing too soon',
            'Seeming indecisive',
            'Putting others\' ease before your own',
        ],
        shows: [
            'Being described as nice by almost everyone.',
            'A strong response to beauty, fairness and good manners.',
        ],
        ask: 'Where does being agreeable cost you the chance to be known?',
    },
    scorpio: {
        title: 'Quiet, intense, and hard to read.',
        meaning: 'An Ascendant in Scorpio presents a watchful, magnetic manner: observing first, revealing little and holding a steady gaze. The first impression is of intensity and depth. The cost is access: mystery can be mistaken for suspicion, and being hard to know can make it hard to be reached.',
        strengths: [
            'A presence that commands attention quietly',
            'Perceptiveness about people',
            'Loyalty once trust is given',
        ],
        challenges: [
            'Seeming guarded or intimidating',
            'Slowness to open up',
            'Testing people before trusting them',
        ],
        shows: [
            'Others sensing there is more going on than you say.',
            'A strong first reaction, either drawn in or kept at a distance.',
        ],
        ask: 'What small thing could you reveal first to let someone know it is safe?',
    },
    sagittarius: {
        title: 'Open, outspoken, and ready with a story.',
        meaning: 'An Ascendant in Sagittarius presents a cheerful, outspoken manner: enthusiastic, full of stories and ideas, and quick to treat strangers as potential friends. The first impression is of optimism and honesty. Where it goes wrong is tact: what reads as candour can be taken as bluntness, and a restless surface can skip over details.',
        strengths: [
            'A warm, optimistic first impression',
            'Honesty that people trust',
            'An easy, adventurous spirit',
        ],
        challenges: [
            'Blunt remarks that land harder than meant',
            'Restlessness',
            'Overpromising when enthusiastic',
        ],
        shows: [
            'Saying what you think within minutes of meeting.',
            'Being the one with a story from somewhere.',
        ],
        ask: 'What would you notice if you slowed down enough to hear how it lands?',
    },
    capricorn: {
        title: 'Serious, capable, and slow to show warmth.',
        meaning: 'An Ascendant in Capricorn presents a composed, serious bearing: capable and dignified, a little reserved, and often seeming older than your years. The first impression is of responsibility and ambition. The price is warmth: competence can look like coldness, and keeping up the front can make it hard to ask for help.',
        strengths: [
            'Authority and dependability',
            'A dry, understated humour',
            'Composure under pressure',
        ],
        challenges: [
            'Seeming stern or unapproachable',
            'Guarding reputation too carefully',
            'Struggling to ask for help',
        ],
        shows: [
            'Being given responsibility early.',
            'Others reading you as more certain than you feel.',
        ],
        ask: 'Where could a little less composure make you easier to reach?',
    },
    aquarius: {
        title: 'Original, friendly, and slightly apart.',
        meaning: 'An Ascendant in Aquarius presents an individual, slightly detached manner: unconventional, with a style of your own, watching the group from a little way off. The first impression is of originality and humane interest. Where it strains is closeness: independence can feel like aloofness to others, and an opinion held on principle can seem unmovable.',
        strengths: [
            'A distinctive presence',
            'Open-mindedness toward other people',
            'A clear, original way of thinking',
        ],
        challenges: [
            'Seeming aloof or eccentric',
            'Resisting being told what to do',
            'Nervous energy under the calm',
        ],
        shows: [
            'A style, interest or opinion that sets you apart in a group.',
            'Being friendly to everyone and close to few.',
        ],
        ask: 'What would change if you let one person see you before the idea?',
    },
    pisces: {
        title: 'Soft-edged, dreamy, and easy to confide in.',
        meaning: 'An Ascendant in Pisces presents a soft, adaptable manner: sympathetic, seeming to understand without being told, and taking on the colour of the surroundings. The first impression is of kindness and imagination. The risk is outline: gentleness can be mistaken for vagueness, and a porous surface can be swayed by the mood of whoever is nearby.',
        strengths: [
            'A gentle, caring presence',
            'An adaptable, intuitive style',
            'Creative charm',
        ],
        challenges: [
            'Seeming vague or hard to pin down',
            'Boundaries that are easily crossed',
            'Being swayed by the people around you',
        ],
        shows: [
            'People telling you things they have not told others.',
            'Changing in manner with the company you are in.',
        ],
        ask: 'What would you want people to know about you that they cannot guess?',
    },
};
