import { assertComplete, CORE_NUMBERS, expressionUnit, personalityUnit, soulUrgeUnit, } from './numerologyAuthoring.js?v=d9f39e7';
/**
 * THE THREE NAME POSITIONS: EXPRESSION, SOUL URGE, PERSONALITY.
 *
 * All three come from the birth name and all three ask a different question,
 * which is the entire reason they are separate roles rather than one reading
 * printed three times.
 *
 *   EXPRESSION   the whole name. CAPABILITY - the tools you were handed,
 *                independent of whether you enjoy using them.
 *   SOUL URGE    the vowels. MOTIVE - what makes the doing feel worth it,
 *                whether or not anybody ever sees it.
 *   PERSONALITY  the consonants. IMPRESSION - the version of you that arrives
 *                in a room before you have said anything.
 *
 * A number therefore reads quite differently in each. An 8 Expression says you
 * are equipped to handle consequence; an 8 Soul Urge says consequence is what
 * satisfies you; an 8 Personality says people read you as someone who deals in
 * it. Those are three different sentences about three different things, and the
 * commonest way a numerology reading goes shallow is by collapsing them.
 *
 * 7 is written in numerologyRoles.ts and is not repeated here.
 */
/* ------------------------------------------------------------------ *
 * EXPRESSION - the whole name, read as capability
 * ------------------------------------------------------------------ */
const expression = [
    expressionUnit({
        key: '1',
        headline: 'Equipped to go first, whether or not you wanted the job.',
        core: [
            'The Expression number comes from the full birth name and describes what you were equipped with rather than where you are headed. A 1 here means the toolkit is built for initiation: you can make a decision with incomplete information, carry the consequences of it, and get other people moving before there is any consensus to move on.',
            'Read as capability this is neutral about whether you enjoy it. A 1 Expression can sit with a real wish that somebody else would go first, and the equipment works anyway - which is why the role keeps being handed over. What the 1 does not supply is stamina for the middle of things, so the tools are worth pairing deliberately with someone who has them.',
        ],
    }),
    expressionUnit({
        key: '2',
        headline: 'Equipped to work through people rather than around them.',
        core: [
            'A 2 Expression is a set of relational instruments: accurate reading of a room, timing, the ability to say a difficult thing in a form the other person can actually receive. These are genuine skills that get consistently undervalued because they leave no visible trace - the negotiation that worked looks, afterwards, as though it was easy.',
            'The capability is at its most obvious in situations that look impossible. Where two parties have stopped listening, a 2 Expression can hold both positions accurately for long enough to find the overlap. What the toolkit lacks is the blunt instrument, so situations that need somebody to simply insist will cost you real effort.',
        ],
    }),
    expressionUnit({
        key: '3',
        headline: 'Equipped to make a thing communicable.',
        core: [
            'A 3 Expression hands you the machinery of expression itself: language, timing, the instinct for the version of an idea that will land. Whatever the subject, you can find the shape of it that another person will actually take in, and you can usually do it faster than anybody around you.',
            'Read as capability rather than as personality, this is a translation instrument, and it works on material you did not generate. Some of the best uses of a 3 Expression are in service of somebody else\'s substance. What the toolkit does not include is patience with the unglamorous middle of a long project, so pairing it with an external deadline is not a weakness, it is operating instructions.',
        ],
    }),
    expressionUnit({
        key: '4',
        headline: 'Equipped to build the thing that holds.',
        core: [
            'A 4 Expression gives you the practical instruments: sequencing, systems, an eye for the joint that will fail, and the patience to close it. You can take an intention and turn it into a finished object that still works when nobody is watching, and that is harder than it looks from outside.',
            'This is capability rather than preference, and the distinction matters here more than anywhere. A 4 Expression on someone with restless ambitions produces a person who keeps being made responsible for delivery, resents it, and does it well anyway. The toolkit does not include improvisation, so genuinely ambiguous work will feel like operating without instruments rather than merely being difficult.',
        ],
    }),
    expressionUnit({
        key: '5',
        headline: 'Equipped for the situation nobody has a procedure for.',
        core: [
            'A 5 Expression is a set of adaptive instruments: fast learning under pressure, comfort with incomplete information, and a high tolerance for conditions that change while you are working in them. Put into a situation that has no precedent, you tend to become functional quickly, while the situation is still alarming.',
            'The capability comes with a shape rather than a limit. These tools work by improvisation, which means they perform badly in environments where the right answer is already known and the job is to execute it consistently. That is not a failure of discipline; it is an instrument being used on the wrong material.',
        ],
    }),
    expressionUnit({
        key: '6',
        headline: 'Equipped to keep something in good repair.',
        core: [
            'A 6 Expression gives you the instruments of maintenance in the broadest sense: noticing what a person, a team or a household actually needs, supplying it without being asked, and holding the standard of the thing over time. It is the capability behind almost every institution that is still pleasant to belong to after five years.',
            'Read as equipment, it is worth naming what this does not include. The 6 toolkit is poor at detachment, so it will engage with situations that would be better left alone, and it has no natural mechanism for refusing. Both of those are worth compensating for deliberately, because the instruments themselves will not do it.',
        ],
    }),
    expressionUnit({
        key: '8',
        headline: 'Equipped to be responsible for the outcome.',
        core: [
            'An 8 Expression hands you the instruments of consequence: an accurate read on where leverage sits, comfort with authority, and the ability to hold responsibility for a result without needing to be liked while you do it. You can be given something failing and make it work, which is a specific and highly transferable capability.',
            'As with every Expression this says nothing about satisfaction. An 8 Expression on someone whose motives lie elsewhere produces a person repeatedly promoted into work that does not feed them, and doing it competently is precisely what keeps the mismatch invisible. The toolkit is real; what it is pointed at is a separate decision, and worth making on purpose.',
        ],
    }),
    expressionUnit({
        key: '9',
        headline: 'Equipped to see the whole situation, including the parts against you.',
        core: [
            'A 9 Expression gives you range and perspective as working instruments: the ability to hold several positions accurately at once, to represent a view you do not share without distorting it, and to see the general shape a specific situation belongs to. In any field where fairness and breadth are the substance of the work, this is the equipment.',
            'The limitation is the mirror image of the strength. A toolkit built for the general is a poor instrument for advocating your own particular interest, and a 9 Expression will argue somebody else\'s case better than its own with no effort at all. That is worth knowing before a salary negotiation rather than after one.',
        ],
    }),
    expressionUnit({
        key: '11',
        headline: 'Equipped with a receiver, and not with a way to prove what it picks up.',
        core: [
            'An 11 Expression is the 2 toolkit with an additional instrument: you register what has not been said, often before the other person has registered it themselves. In work that depends on reading a situation accurately from thin evidence, this is not a soft skill but the primary capability.',
            'It is equipment with a particular handling requirement. What arrives cannot be justified in the terms of evidence and argument that shared decisions run on, so the practical use of an 11 Expression depends almost entirely on developing a second capability - translating an impression into an argument other people can check. Without that, the instrument is real and unusable in company.',
        ],
    }),
    expressionUnit({
        key: '22',
        headline: 'Equipped to build at a scale most plans do not survive.',
        core: [
            'A 22 Expression combines two things that are hard to hold together: the practical instruments of the 4 - sequencing, materials, delivery - and the capacity to hold a design large enough that it cannot be finished quickly. You can plan across a horizon of years and still talk accurately about next Tuesday.',
            'The equipment is genuinely powerful and it has an operating cost. Instruments built for a decade-long build are heavy to carry through a short project, and a 22 Expression applied to something small will over-engineer it as a matter of course. Choosing work proportionate to the toolkit matters more here than in any other Expression.',
        ],
    }),
    expressionUnit({
        key: '33',
        headline: 'Equipped to look after people who are not yours to look after.',
        core: [
            'A 33 Expression gives you the instruments of the 6 with the boundary removed: the same attentiveness to what somebody needs, applied without the usual limit of family or obligation. In teaching, medicine, ministry or any work that depends on genuinely caring about strangers, this is the capability the work runs on.',
            'The toolkit contains no off switch, and that is a statement about equipment rather than about character. A 33 Expression will engage with need at a distance that most instruments simply do not reach, which is why the people who carry it need an externally imposed limit far more than they need encouragement.',
        ],
    }),
];
/* ------------------------------------------------------------------ *
 * SOUL URGE - the vowels, read as motive
 * ------------------------------------------------------------------ */
const soulUrge = [
    soulUrgeUnit({
        key: '1',
        headline: 'What satisfies: having done it yourself.',
        core: [
            'The Soul Urge comes from the vowels of the birth name and describes private motive - not what you do, but what makes the doing feel worth it. A 1 here is fed by authorship. The moment that satisfies is the one where the thing exists and it exists because you decided it would, and a version of the same outcome arrived at collectively does not land the same way at all.',
            'This is worth knowing because it explains a discontent that is otherwise puzzling. A 1 Soul Urge in a comfortable, well-regarded, thoroughly collaborative role will feel obscurely unfed, and the feeling is accurate rather than ungrateful. The correction is usually smaller than a career change: one thing that is unambiguously yours, however modest, does most of the work.',
        ],
    }),
    soulUrgeUnit({
        key: '2',
        headline: 'What satisfies: being genuinely in it with someone.',
        core: [
            'A 2 Soul Urge is fed by connection of a specific kind - not company, and not approval, but the experience of being in something alongside another person who is actually present. Achievement reached alone tends to feel oddly hollow here, and a modest thing done together can be quietly sustaining for years.',
            'The difficulty this creates is easy to misdiagnose as neediness. It is not that; it is a motive structure that requires a partner to complete, and a life arranged for independence will starve it while looking, from outside, entirely successful. Naming what you need out loud is uncomfortable for a 2 and it is the whole of the remedy.',
        ],
    }),
    soulUrgeUnit({
        key: '3',
        headline: 'What satisfies: getting it out, and having it land.',
        core: [
            'A 3 Soul Urge is fed by expression that reaches somebody. Not attention exactly - a 3 Soul Urge can be perfectly content in a small room - but the completed circuit of having made something and having it received. Work that stays in a drawer does not satisfy this motive however good it is.',
            'A life with plenty of output and no reception will read as productive and feel empty, which is a particular trap for people whose work is technically expressive but institutionally invisible. The fix is not a bigger audience; it is one real reader, reliably, who responds to the actual thing rather than to the fact that you made it.',
        ],
    }),
    soulUrgeUnit({
        key: '4',
        headline: 'What satisfies: something solid that will still be there.',
        core: [
            'A 4 Soul Urge is fed by permanence. What produces the deep sense of rightness is looking at a finished thing that is going to hold - a body of work, a house, a functioning system, an arrangement that no longer needs you to keep it upright. Speed and recognition do very little for this motive.',
            'The characteristic frustration is a life of activity that leaves nothing standing. Consulting, crisis work, roles where you improve things and move on: all perfectly respectable and quietly unsatisfying here, because the motive requires an object. A 4 Soul Urge in that situation should build something on the side, and will be surprised how much it changes.',
        ],
    }),
    soulUrgeUnit({
        key: '5',
        headline: 'What satisfies: the door being open, and going through it.',
        core: [
            'A 5 Soul Urge is fed by the new. What produces genuine satisfaction is first contact with something you have not done, and the appetite is for the encounter itself rather than for mastery afterwards. Security is pleasant and it is not the thing; the thing is that the situation could still turn out to be anything.',
            'A life arranged for stability will meet every reasonable requirement and leave this motive unfed, which can surface later as an apparently unprovoked urge to overturn something. It is much cheaper to build variety in deliberately and early than to have it arrive later as a crisis.',
        ],
    }),
    soulUrgeUnit({
        key: '6',
        headline: 'What satisfies: being the reason somebody is all right.',
        core: [
            'A 6 Soul Urge is fed by having genuinely helped. Not by being thanked, which is a different and much thinner satisfaction, but by knowing that a specific person or thing is in better shape because you were there. It is one of the more reliable motives to live from, and one of the easiest to over-supply.',
            'The trap is that the motive can be met by people who need endlessly, which means a 6 Soul Urge will attach itself to a situation that consumes it and experience the consumption as fulfilment for a long time. The check is simple and easy to skip: is the person you are helping getting better, or only more dependent?',
        ],
    }),
    soulUrgeUnit({
        key: '8',
        headline: 'What satisfies: the thing actually worked, at real scale.',
        core: [
            'An 8 Soul Urge is fed by consequence. The satisfying moment is the one where the result is undeniable and the stakes were real - not the recognition attached to it, which is pleasant but secondary, and certainly not the effort, which counts for nothing in this motive structure.',
            'This is a demanding thing to be driven by, because results are external and partly outside your control, and a run of honest work with poor outcomes will feel like a personal verdict rather than like weather. The useful correction is to define the result narrowly enough that you can actually affect it, which keeps the motive fed without handing it to circumstance.',
        ],
    }),
    soulUrgeUnit({
        key: '9',
        headline: 'What satisfies: having been part of something larger than the personal.',
        core: [
            'A 9 Soul Urge is fed by contribution to something general. Personal gain registers as pleasant and slightly beside the point, while a modest role in something that mattered to many people can carry this motive for years. It is a motive that makes for a person who is genuinely difficult to bribe.',
            'The failure mode is that the motive can be satisfied by proximity to significance rather than by actually doing anything, and a 9 Soul Urge can spend a decade adjacent to important work without ever having contributed a specific thing. The remedy is particularity: one named piece of it that is yours to deliver.',
        ],
    }),
    soulUrgeUnit({
        key: '11',
        headline: 'What satisfies: the moment the unspoken thing gets acknowledged.',
        core: [
            'An 11 Soul Urge is fed by contact at the level below conversation. What genuinely satisfies is the moment when something that was present but unnamed gets named, and both people know it is true - in a room, in a piece of work, in a friendship. Ordinary sociability leaves this motive completely untouched.',
            'A life full of pleasant company and no such moments will feel lonely in a way that is very hard to explain to the pleasant company. What this motive needs is a small number of people who are willing to go past the surface, and the willingness matters far more than how well you know them.',
        ],
    }),
    soulUrgeUnit({
        key: '22',
        headline: 'What satisfies: the foundation going in, for something that outlasts you.',
        core: [
            'A 22 Soul Urge is fed by durable scale. The satisfying thing is not the achievement or the recognition but the knowledge that a structure now exists that will keep working after you have stopped attending to it, and that it is large enough to matter to people you will never meet.',
            'This motive tolerates delay better than almost any other and it has a specific vulnerability: it can go unfed for a decade while the foundation is under construction and nothing is visible. Knowing that the emptiness of the building phase is structural rather than diagnostic is genuinely useful, because the temptation is to conclude the project was wrong.',
        ],
    }),
    soulUrgeUnit({
        key: '33',
        headline: 'What satisfies: having been of use to somebody who had no claim on you.',
        core: [
            'A 33 Soul Urge is fed by care given outside obligation. Helping family satisfies it partially; helping a stranger, competently and without being asked, satisfies it completely. That motive structure can shape a whole working life around access to it.',
            'The risk is a motive with no natural limit meeting a world with unlimited need. A 33 Soul Urge can keep being fed well past what is sustainable, and the strain can register as nothing more than ordinary tiredness. The discipline is to notice that the satisfaction is genuine AND that it is not a measure of how much is sustainable.',
        ],
    }),
];
/* ------------------------------------------------------------------ *
 * PERSONALITY - the consonants, read as first impression
 * ------------------------------------------------------------------ */
const personality = [
    personalityUnit({
        key: '1',
        headline: 'What people meet first: someone who seems already decided.',
        core: [
            'The Personality number comes from the consonants of the birth name and describes the outer impression - the version of you that arrives in a room before you have said anything. A 1 here reads as self-contained and slightly ahead of the conversation. People assume you have already made up your mind, and they defer or push back accordingly.',
            'The practical consequence is that you are trusted with decisions early and consulted for feelings late. It also means hesitation from you carries extra weight, because it is not expected. Knowing this is the whole use of the position: a deliberately voiced uncertainty does more to bring people closer than any amount of warmth added to the surface.',
        ],
    }),
    personalityUnit({
        key: '2',
        headline: 'What people meet first: someone easy to be around.',
        core: [
            'A 2 Personality reads as approachable, unthreatening and attentive. People tend to relax near you quickly and to tell you more than they planned, and it is easy for them to miss how much you take in - an advantage that works best when it is used on purpose rather than by default.',
            'The cost is that mildness reads as pliability. In rooms where status is being sorted, a 2 Personality gets assigned less weight than its occupant deserves, and correcting that afterwards is much harder than establishing it at the start. One early, clearly stated position does more than a year of demonstrated competence.',
        ],
    }),
    personalityUnit({
        key: '3',
        headline: 'What people meet first: brightness, and the sense that this will be enjoyable.',
        core: [
            'A 3 Personality reads as lively and quick. Rooms lift slightly when you enter them, conversation is easier than it was, and people form a favourable impression before you have done anything to earn it - which is a genuine social asset and worth recognising as one rather than taking for granted.',
            'The mismatch is that lightness reads as unseriousness. A 3 Personality doing rigorous work often has to establish the rigour explicitly, because the surface has already suggested otherwise, and the correction is not to dim the brightness but to put one piece of unmistakably careful work in front of people early.',
        ],
    }),
    personalityUnit({
        key: '4',
        headline: 'What people meet first: solidity, and the assumption that you will do what you said.',
        core: [
            'A 4 Personality reads as dependable and unshowy. People form the impression that you are safe to rely on, usually before they have any evidence, and the impression turns out to be correct often enough that it is not really a misreading at all.',
            'What it costs is being seen as the fixed part of the scenery. A 4 Personality tends not to be the first name suggested for something new, exciting or exploratory, and the pattern compounds quietly over a career. If you want the unexpected role you will generally have to ask, because it will not be offered on the strength of the surface.',
        ],
    }),
    personalityUnit({
        key: '5',
        headline: 'What people meet first: motion, and a suggestion that you might not stay.',
        core: [
            'A 5 Personality reads as vivid and slightly provisional. You are interesting on first contact, you make a strong impression quickly, and people simultaneously form the sense that you are passing through - which they will act on, sometimes by holding back an investment they would otherwise have made.',
            'The useful move is a signal of duration rather than a change of manner. Simply saying how long you intend to stay, early and plainly, corrects most of what this surface costs you, because the only thing missing from the impression is the information that you are not about to leave.',
        ],
    }),
    personalityUnit({
        key: '6',
        headline: 'What people meet first: warmth, and someone who will probably help.',
        core: [
            'A 6 Personality reads as responsible and kind. People bring you problems early, assume good faith, and place you in the caretaking role of whatever group you are in - frequently within minutes, and usually without either side noticing it happening.',
            'The cost is that the role is assigned faster than you can decline it, and the assignment is sticky. A 6 Personality who does not want to be the person everybody comes to has to establish that at the beginning, because after three months of accepting the role, refusing it reads as a change of character rather than as a boundary.',
        ],
    }),
    personalityUnit({
        key: '8',
        headline: 'What people meet first: authority, whether or not you claimed any.',
        core: [
            'An 8 Personality reads as substantial. People assume competence and seniority, take you more literally than you may intend, and read a casual remark from you as a decision - which is a considerable advantage and a recurring source of misunderstanding.',
            'What it costs is easy contact. Warmth from an 8 Personality is not the default expectation, so it lands with disproportionate force when it appears; the surface makes people careful around you, and careful people do not tell you the thing you needed to hear. Asking directly, more than once, is the only reliable correction.',
        ],
    }),
    personalityUnit({
        key: '9',
        headline: 'What people meet first: breadth, and a slight sense of distance.',
        core: [
            'A 9 Personality reads as worldly and somewhat impersonal. People sense range and fairness, assume you have seen a good deal, and often feel that you are looking at the whole situation rather than at them specifically - which is usually accurate.',
            'The consequence is that you are respected quickly and confided in slowly. The distance is not coldness, but it functions like it on first contact, and the correction is small: one specific, personal, slightly unguarded remark early on does more than any amount of demonstrated sympathy for people in general.',
        ],
    }),
    personalityUnit({
        key: '11',
        headline: 'What people meet first: an attentiveness that is slightly disconcerting.',
        core: [
            'An 11 Personality reads as fully present. People tend to register close attention - the sense of being properly listened to - and some find that welcome while others find it faintly unnerving, as if they were being seen more accurately than the conversation warrants.',
            'It produces a divided response that is worth expecting rather than being wounded by. Some people come close very fast; others keep a polite distance for reasons they could not articulate. Nothing about the surface needs fixing, but knowing which reaction you are getting saves a good deal of misreading.',
        ],
    }),
    personalityUnit({
        key: '22',
        headline: 'What people meet first: weight, and the sense of a long horizon.',
        core: [
            'A 22 Personality reads as serious in the specific sense of operating on a longer timescale than the conversation. People pick up that you are working on something substantial even when you have not mentioned it, and they treat you accordingly - with respect, and with a certain wariness about wasting your time.',
            'The cost is a surface that does not invite the casual. A 22 Personality can go years without anybody suggesting something frivolous, which is a real loss and entirely correctable by being the one who suggests it. The surface will not soften on its own; it has to be contradicted deliberately.',
        ],
    }),
    personalityUnit({
        key: '33',
        headline: 'What people meet first: a ready willingness to be involved.',
        core: [
            'A 33 Personality reads as open and ready to be involved. People sense that you will actually engage rather than politely decline, and they bring you things accordingly - often heavy things, and often on very short acquaintance.',
            'The surface therefore does a great deal of filtering in your life. It attracts people in genuine need and it also attracts people who have learned to find the person who cannot say no, and telling those two apart is the practical skill this position asks for. The warmth is worth keeping; the automatic yes is not part of it.',
        ],
    }),
];
export const NUMEROLOGY_NAME_ROLES = [
    ...expression, ...soulUrge, ...personality,
];
const withoutSeven = CORE_NUMBERS.filter((key) => key !== '7');
assertComplete('Expression', withoutSeven, expression);
assertComplete('Soul Urge', withoutSeven, soulUrge);
assertComplete('Personality', withoutSeven, personality);
