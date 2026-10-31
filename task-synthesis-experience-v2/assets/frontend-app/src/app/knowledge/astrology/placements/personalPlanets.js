import { placementUnit } from '../astrologyAuthoring.js?v=53c0693';
/**
 * MERCURY, VENUS AND MARS THROUGH THE TWELVE SIGNS.
 *
 * The three functions a reader recognises fastest in themselves: how they
 * think, what they want, and how they go after it. These move quickly enough to
 * be genuinely personal - unlike the outer planets, no two people born a month
 * apart are guaranteed to share them - so they are written at full depth.
 */
const mercury = [
    {
        planet: 'mercury', sign: 'aries',
        headline: 'A mind that decides first and checks on the way.',
        core: [
            'Mercury in Aries thinks at the speed of speech. The conclusion arrives whole, usually before the reasoning has been laid out, and the reasoning is then constructed at speed to support it - which sounds like a criticism and is often simply how fast intuition looks from outside. You are direct to the point of bluntness, and you would rather be told plainly than managed carefully.',
            'What this mind is bad at is the second look. First impressions are strong here and rarely revisited, and an argument that would have collapsed on inspection frequently does not get inspected. There is also a low tolerance for other people\'s throat-clearing: you finish sentences, you skip to the point, and thinking out loud with someone can test your patience.',
        ],
    },
    {
        planet: 'mercury', sign: 'taurus',
        headline: 'Slow, concrete thinking that does not need revisiting.',
        core: [
            'Mercury in Taurus takes its time and gets there once. Ideas have to be turned over, related to something concrete and tested against common sense before they are accepted, and once accepted they are held with real solidity. You explain things in a way people can actually use, because an abstraction that cannot be made concrete does not feel finished to you.',
            'The pace is genuinely slow and it is a liability in rooms that reward the quick answer, where you will regularly be the last to speak and the most correct. The larger cost is revision: a mind that changes position this reluctantly can go on defending a settled view long after the ground under it moved, and it will experience the defending as consistency rather than as inertia.',
        ],
    },
    {
        planet: 'mercury', sign: 'gemini',
        headline: 'The mind in its own house: quick, wide and endlessly interested.',
        core: [
            'Mercury rules Gemini, and it shows. You take in a great deal, connect things nobody asked you to connect, and move between registers - technical, funny, serious - without noticing you have. Learning is fast and it is genuinely pleasurable rather than instrumental, and you are almost never bored in your own company because there is always something to turn over.',
            'Depth is the thing this has to be chosen deliberately. The same speed that makes the breadth possible makes staying with one subject past the interesting part feel like a punishment, so a Gemini Mercury can accumulate a great deal of knowledge that stops one layer short of expertise. There is also a tendency to argue positions for the pleasure of the argument, which is entertaining and occasionally expensive.',
        ],
    },
    {
        planet: 'mercury', sign: 'cancer',
        headline: 'Thinking that runs through memory and mood.',
        core: [
            'Mercury in Cancer does not sort information neutrally. Everything gets filed with how it felt attached, which means your recall is vivid and strongly coloured, and your reasoning has an emotional component you cannot fully factor out. What this buys you is an accurate read of subtext - you hear what someone is not saying - and a way of explaining things that meets people where they actually are.',
            'The difficulty is objectivity. When you are unsettled the thinking follows the mood down, and a position taken in a bad week will feel like a permanent assessment. This Mercury also communicates indirectly under pressure, hinting rather than stating, which is protective and reliably produces the misunderstanding it was trying to avoid.',
        ],
    },
    {
        planet: 'mercury', sign: 'leo',
        headline: 'A mind that thinks in statements and needs an audience.',
        core: [
            'Mercury in Leo speaks with authority and enjoys it. Ideas here come out shaped - the phrase is good, the structure holds, the point lands - and you have a real gift for making something matter to people who did not previously care. You think better with someone in the room, and a good conversation genuinely improves the quality of your reasoning rather than just the enjoyment of it.',
            'What suffers is the possibility of being wrong out loud. This Mercury commits to a position with its whole chest and finds retreat costly, so an error tends to get defended rather than corrected. There is also a difficulty with detail: the argument is delivered so well that neither you nor the audience notices the middle section was never actually checked.',
        ],
    },
    {
        planet: 'mercury', sign: 'virgo',
        headline: 'The sorting mind: precise, useful and hard on itself.',
        core: [
            'Mercury both rules and is exalted in Virgo, and what that produces is a mind built to discriminate. Where another Mercury collects information, this one sorts it - tests it, separates the load-bearing from the decorative, and notices the discrepancy nobody else caught. You qualify your statements because you can see the exceptions, so you say "probably" where a louder mind says "obviously", and the caution usually has a reason behind it.',
            'Turned inward, the same instrument is punishing. It edits before the sentence is out, which is why this Mercury often reads as hesitant when it is actually being careful, and it can revise a piece of work past the point of improvement into the point of paralysis. The other cost is the unrequested correction: accuracy offered where nobody asked for it can land as criticism, whatever it was meant as.',
        ],
    },
    {
        planet: 'mercury', sign: 'libra',
        headline: 'A mind that thinks in comparisons and weighs before it speaks.',
        core: [
            'Mercury in Libra cannot consider one side of anything. Every position arrives with its counterposition attached, which makes you fair-minded, good at explaining someone to themselves, and easy to disagree with. There is real diplomatic intelligence here - the ability to say the hard thing in a form the other person can actually receive.',
            'The weighing does not stop on its own. A Libra Mercury can hold two views in balance indefinitely and mistake that for rigour, when at some point the situation needed a decision rather than another consideration. There is also a habit of tuning the argument to the listener that is helpful in a negotiation and quietly corrosive when it becomes the only way you know how to speak.',
        ],
    },
    {
        planet: 'mercury', sign: 'scorpio',
        headline: 'An investigating mind that assumes there is more underneath.',
        core: [
            'Mercury in Scorpio does not accept the surface account. It looks for what is being left out, and it usually finds something, because a mind pointed that way for long enough gets very good at reading the gap between what people say and what they do. Research suits this placement, and so does any work where the real answer is buried and someone has to be willing to keep digging past the point of discomfort.',
            'The suspicion runs on whether or not it is warranted. This Mercury can construct an elaborate and internally consistent account of someone\'s motives from very little evidence, and hold it privately for a long time without ever checking it. Speech here is strategic - you say what you have decided to say - and the people close to you may notice that they never quite get the full picture.',
        ],
    },
    {
        planet: 'mercury', sign: 'sagittarius',
        headline: 'A mind that goes straight for the principle.',
        core: [
            'Mercury in Sagittarius reasons from the top down. You reach for the framework, the analogy, the thing this is an instance of, and you are genuinely good at making a large idea graspable. The frankness is part of the same equipment: a mind organised around the big picture does not naturally hold back the observation that would be more comfortable unsaid.',
            'Detail is where it comes apart. The broad claim is usually right in shape and frequently wrong in specifics, and this Mercury will defend the shape while conceding the specifics, which is maddening to anyone who cares about the specifics. There is also a tendency to overstate for the sake of the point, and then to be genuinely puzzled that the overstatement was taken literally.',
        ],
    },
    {
        planet: 'mercury', sign: 'capricorn',
        headline: 'Structured thinking with a long time horizon.',
        core: [
            'Mercury in Capricorn is built for the problem that takes years. It thinks in sequences and consequences, discards what will not survive contact with reality, and has a real tolerance for the unglamorous middle of a hard piece of work. When you speak you tend to have finished thinking, which is why what you say carries more weight than its volume would predict.',
            'The seriousness is not switchable. This Mercury is slow to entertain an idea that has no visible use, and can dismiss something genuinely promising because it arrived unaccompanied by a plan. There is also a self-editing habit that costs real contributions: the thought gets held back until it is fully defensible, and by then the conversation has moved on.',
        ],
    },
    {
        planet: 'mercury', sign: 'aquarius',
        headline: 'A mind that works in systems and does not mind being alone in a view.',
        core: [
            'Mercury in Aquarius reasons structurally. You see the pattern behind the instances, you are drawn to the idea that reorganises everything rather than the one that adds to it, and you are strikingly unmoved by consensus - a position you can defend on stated grounds is more comfortable to you than one everybody shares. Original thinking here is genuine rather than performed.',
            'The abstraction can float free of the case in front of you. This Mercury can be entirely right about the system and entirely useless about the person, and it holds its conclusions with a fixity that surprises people who mistook the open-mindedness for flexibility. Watch also for the contrarian reflex, where a view gets adopted partly because it is the one nobody else is holding.',
        ],
    },
    {
        planet: 'mercury', sign: 'pisces',
        headline: 'Thinking by impression, and arriving before the reasoning does.',
        core: [
            'Mercury in Pisces takes things in whole. You register atmosphere, implication and the thing underneath the words, and you frequently know the answer some time before you can construct the argument for it - which is a real form of intelligence and a difficult one to defend in a meeting. Metaphor works better than definition here, and images stay when propositions have gone.',
            'Precision is the deliberate discipline. This Mercury is genuinely vague about specifics - times, figures, who said what - and will fill a gap with something plausible without registering that it has. It also absorbs other people\'s certainty, so a firmly stated wrong idea can displace your own correct impression, and you will not be able to say afterwards where yours went.',
        ],
    },
];
const venus = [
    {
        planet: 'venus', sign: 'aries',
        headline: 'Attraction as pursuit, and a low tolerance for the lukewarm.',
        core: [
            'Venus in Aries wants the spark and wants it immediately. Interest here is not a slow accumulation but a strike, and the pursuit itself is a large part of the pleasure - you are more alive in the chase than in the settled arrangement that follows. You are direct about wanting, which is refreshing after a certain amount of ambiguity from other people.',
            'What is difficult is the middle distance. When the uncertainty resolves, so does some of the charge, and this Venus can mistake the ordinary settling of a good relationship for the end of something. There is also an impatience with the other person\'s pace: readiness here is assumed to be mutual, and it frequently is not.',
        ],
    },
    {
        planet: 'venus', sign: 'taurus',
        headline: 'Love as something you can touch, keep and rely on.',
        core: [
            'Venus rules Taurus, and here it wants permanence and tangible reality. Affection is expressed in presence, food, comfort and the steady repetition of small acts rather than in declarations, and what you value you keep. There is a real sensual intelligence in this placement and a deep capacity for loyalty that does not need to be reminded of itself.',
            'The holding on continues past the point of usefulness. This Venus will stay in an arrangement that has quietly stopped nourishing anyone because leaving would mean dismantling something built, and it will call that commitment. Possessiveness is the other edge: what you love, you experience as yours, and the distinction between devotion and ownership is one you have to make deliberately.',
        ],
    },
    {
        planet: 'venus', sign: 'gemini',
        headline: 'Attraction that begins in conversation and stays there.',
        core: [
            'Venus in Gemini is drawn to a mind. Wit, curiosity and the ability to keep a conversation genuinely surprising matter more here than almost anything else, and the flirtation is verbal and largely unserious - you enjoy the play, and the enjoyment is real rather than strategic. Variety keeps affection alive for you where routine slowly starves it.',
            'The lightness has a cost. This Venus can keep several things going at a pleasant surface level while avoiding the one conversation that would make any of them real, and it experiences depth as heaviness rather than as depth. Boredom, not conflict, is the thing that ends relationships here, and it arrives without warning to the other person.',
        ],
    },
    {
        planet: 'venus', sign: 'cancer',
        headline: 'Love as care, memory and a door that closes behind you.',
        core: [
            'Venus in Cancer loves by looking after. Affection here is nurturing and quite domestic in the good sense - you make a place where someone can be unguarded, and you remember what they said they liked. Attachment forms slowly and then completely, and once someone is inside the circle they tend to stay there long past the point where the evidence supports it.',
            'The care can become a hold. This Venus is prone to giving in a way that produces obligation, and to hurt feelings that go unspoken and unforgotten. There is also a habit of loving an earlier version of someone, which makes it genuinely difficult to notice when a relationship has changed underneath you.',
        ],
    },
    {
        planet: 'venus', sign: 'leo',
        headline: 'Love that wants to be a story worth telling.',
        core: [
            'Venus in Leo is romantic in the older sense: generous, warm, and interested in making the whole thing an occasion. You give properly when you give, you want the relationship to be visible and acknowledged, and you have a real capacity for delight that is easy to share. Being adored is not a shallow want here - it is how this Venus knows the affection is real.',
            'The performance can outrun the substance. This Venus is capable of maintaining something that looks wonderful from outside considerably longer than it remains good from inside, because dismantling it publicly is worse than living in it. Slights land hard and are remembered, and the wounded dignity that follows tends not to explain itself.',
        ],
    },
    {
        planet: 'venus', sign: 'virgo',
        headline: 'Affection shown in what you noticed and quietly handled.',
        core: [
            'Venus in Virgo does not announce love, it performs it in detail. The thing remembered, the problem solved before it was mentioned, the small practical act nobody was asked for - that is the whole vocabulary, and it is a deeper one than it is usually given credit for. What you value is competence and integrity rather than display, and you are hard to impress and easy to keep once impressed.',
            'The critical eye does not switch off in intimacy, and there it does damage. Improvements offered as helpfulness can land as a verdict, and a quiet sense of not quite measuring up can settle into closeness without anyone naming it. This Venus also holds itself to a standard of worthiness that makes simply being loved, without having earned it that week, an oddly uncomfortable experience.',
        ],
    },
    {
        planet: 'venus', sign: 'libra',
        headline: 'Venus at home: partnership as the natural unit.',
        core: [
            'Venus rules Libra, and relating here is close to a native language. You are graceful with people almost without effort, you find the register that suits the moment, and you genuinely prefer life as a pair - not out of dependence but because things seem more real to you when they are shared. Fairness matters, and you will readily give ground to keep something balanced.',
            'The giving of ground becomes the pattern. This Venus can build a relationship in which almost everything is negotiated toward the other person\'s comfort and then feel obscurely cheated, without having once said what it wanted. There is also an aversion to ugly conversation strong enough that real problems get smoothed over repeatedly, until the smoothing is the problem.',
        ],
    },
    {
        planet: 'venus', sign: 'scorpio',
        headline: 'Love with no shallow setting.',
        core: [
            'Venus in Scorpio wants all of it. Half-attention is worse than none, casual is not really available, and what you are looking for is the kind of closeness where both people have seen the unflattering material and stayed. When this placement commits it is total, and the loyalty that comes with it is not conditional on the relationship being easy.',
            'Intensity of this order does not distinguish well between depth and control. Jealousy is the obvious failure, but the subtler one is testing - creating small situations to find out whether the other person will hold - and it tends to produce the abandonment it was checking for. Betrayal is close to unrecoverable here, and this Venus can carry a closed door for a very long time.',
        ],
    },
    {
        planet: 'venus', sign: 'sagittarius',
        headline: 'Affection that needs air, and shares an appetite rather than a routine.',
        core: [
            'Venus in Sagittarius falls for what widens the world. The person who knows something you do not, the plan that goes somewhere, the conversation at two in the morning about what any of it is for - that is the currency. You are warm, unpossessive and genuinely happy for the other person to have a life of their own, which is more valuable than it sounds.',
            'Constraint reads as threat here even when it is only ordinary intimacy. This Venus can experience a reasonable request as a cage and answer it by creating distance, and it is prone to idealising someone at range and losing interest at close quarters. Honesty is a real virtue in this placement and occasionally a blunt instrument.',
        ],
    },
    {
        planet: 'venus', sign: 'capricorn',
        headline: 'Love as something built, tested and meant.',
        core: [
            'Venus in Capricorn is slow, serious and considerably warmer than it looks. Affection is shown through reliability - turning up, carrying weight, being someone whose word holds - and the reserve at the start is a filtering mechanism rather than coldness. What you build tends to last, because you tend not to start building until you are fairly sure.',
            'The reserve can outlast its usefulness. This Venus can stay guarded long after the other person has earned better, and it can treat a relationship as another thing to be managed competently rather than enjoyed. There is often a quiet transactional undertone worth examining: the sense that affection has to be deserved, by you as much as by them.',
        ],
    },
    {
        planet: 'venus', sign: 'aquarius',
        headline: 'Closeness on unconventional terms, and friendship first.',
        core: [
            'Venus in Aquarius wants a companion more than a possessor. You are drawn to people who are interesting rather than suitable, you are comfortable with arrangements that do not match the template, and you extend a real, unsentimental freedom to whoever you are with. Friendship is often the foundation and frequently survives the romance.',
            'Detachment is the recurring difficulty. This Venus can be entirely present intellectually and slightly absent emotionally, and it responds to a demand for closeness by becoming more reasonable and less available. There is also a resistance to convention that is sometimes principle and sometimes just reflex, and the two are hard to tell apart from inside.',
        ],
    },
    {
        planet: 'venus', sign: 'pisces',
        headline: 'Love without much boundary, given generously and not always wisely.',
        core: [
            'Venus is exalted in Pisces, and what that means in practice is a capacity for compassion and tenderness that does not require the other person to have earned it. You love the potential in someone as readily as the actuality, you forgive easily, and there is an unselfish quality here that is genuine rather than performed.',
            'The absence of a filter is the whole problem. This Venus falls for who someone could be, stays through evidence that might have moved it on, and can stay a long time in something sustained largely by its own imagination. Rescuing is the characteristic pattern, and it is worth being honest that being needed is doing some of the work that being loved is supposed to do.',
        ],
    },
];
const mars = [
    {
        planet: 'mars', sign: 'aries',
        headline: 'Mars at home: immediate, unambiguous, over quickly.',
        core: [
            'Mars rules Aries, and the result is force with no delay between impulse and action. You go directly at things, you would rather have the confrontation now than manage around it for a month, and under real pressure you get faster rather than slower. Courage is usually genuine here, and so is the willingness to make the first move.',
            'The absence of a pause is the cost. Anger arrives at full strength and is expressed before any assessment has happened, and while it clears fast it does not clear for the person it landed on. Sustained effort is the weaker suit: this Mars is superb in the first week of anything and has to build, deliberately, the thing that gets it through the fourth month.',
        ],
    },
    {
        planet: 'mars', sign: 'taurus',
        headline: 'Slow to start, extremely hard to stop.',
        core: [
            'Mars in Taurus does not move quickly and does not need to. What it has instead is endurance: once underway, this is the placement that is still going long after a faster start has faded, and the work it produces tends to be solid because it was never rushed. Provocation is absorbed rather than returned, usually for a long time.',
            'When it finally does return, it is disproportionate. Anger here accumulates silently and arrives all at once over something small, and both sides are then dealing with everything that went unspoken for a long time. The other difficulty is starting at all: this Mars requires a genuine reason to move, and in its absence will sit comfortably in a situation that needed action months ago.',
        ],
    },
    {
        planet: 'mars', sign: 'gemini',
        headline: 'Drive that runs through words and moves on several fronts.',
        core: [
            'Mars in Gemini fights with language and acts on several things at once. You are quick, verbally agile in conflict, and genuinely good at the situation that requires improvisation rather than force. Energy here is nervous rather than muscular, and it arrives in bursts attached to whatever has currently caught your interest.',
            'Follow-through is where it thins out. This Mars starts more than it finishes, not from laziness but because the interesting part of a task is usually near the beginning, and the eleventh version of the same problem produces genuine restlessness. In conflict the sharpness can outrun the intention: you win the exchange and discover afterwards that you meant less of it than you said.',
        ],
    },
    {
        planet: 'mars', sign: 'cancer',
        headline: 'Force that moves sideways, and mostly on behalf of someone else.',
        core: [
            'Mars in Cancer does not go straight at things. It approaches obliquely, protects rather than attacks, and is at its most formidable when what it is defending is somebody it cares about - the mildness disappears entirely at that point. Effort here is powered by feeling, so this Mars works hard for what it is attached to and struggles to raise energy for what it is not.',
            'Anger is the difficult material. It is felt strongly and expressed indirectly - withdrawal, mood, the thing implied rather than said - and the indirection is usually more corrosive than the confrontation would have been. This Mars also tends to act from the state it is in rather than the situation it is facing, which means a bad week produces decisions that a good week would not have.',
        ],
    },
    {
        planet: 'mars', sign: 'leo',
        headline: 'Action taken in the open, with something at stake.',
        core: [
            'Mars in Leo needs the effort to mean something and to be seen. You perform better when it matters and when someone is watching, and there is a real theatrical courage here - the willingness to take the visible risk that others decline. Loyalty makes this Mars fight harder for people than for principles.',
            'Pride is the exposed surface. Being humiliated is worse than being defeated, so this Mars will sometimes escalate a situation to avoid backing down in public, and it can hold a position it no longer believes because retreating would be seen. Energy also depends on stakes: given something genuinely dull it does not merely dislike the work, it cannot locate the fuel.',
        ],
    },
    {
        planet: 'mars', sign: 'virgo',
        headline: 'Effort applied precisely, to the part that actually matters.',
        core: [
            'Mars in Virgo works efficiently rather than forcefully. You identify the specific point of failure and put the effort there, which makes your effort go a long way and is at its best where a task asks for care rather than power. Sustained, methodical application is a real, quiet strength.',
            'The precision becomes friction. This Mars can spend the available energy on refining something that was already adequate, and it can be sharply irritable about other people\'s carelessness in a way that costs more goodwill than the carelessness cost. Anger tends to come out as criticism rather than as anger, which is harder to answer and harder to resolve.',
        ],
    },
    {
        planet: 'mars', sign: 'libra',
        headline: 'Drive that has to justify itself before it moves.',
        core: [
            'Mars in Libra is force filtered through fairness. You will not simply take what you want; you want it to be defensible, proportionate and ideally agreeable to the other party, and this makes you genuinely skilled at the situation that needs negotiating rather than winning. Competition here is real but civilised, and you fight better on someone else\'s behalf than your own.',
            'The filtering slows everything down. Direct wanting is uncomfortable for this Mars, and anger is uncomfortable enough that it gets converted into reasonableness, which then leaks out as passive resistance - the agreement that is not honoured, the delay that is never explained. There is a specific frustration here at having been accommodating for so long that nobody knows what you actually wanted.',
        ],
    },
    {
        planet: 'mars', sign: 'scorpio',
        headline: 'Concentrated force, applied without much visible movement.',
        core: [
            'Mars in Scorpio is the most controlled version of this function. Nothing is wasted, nothing is announced, and the pressure builds behind a still surface until it is applied at exactly the point where it will do the most. Stamina here runs deep, and so does the willingness to go through something unpleasant rather than around it.',
            'Control this complete has a cost when it slips. Anger held rather than expressed becomes something colder and more strategic than anger, and this Mars is capable of a patience in resentment that other placements simply do not have. The other difficulty is that the same intensity gets applied to situations that did not need it, and the temperature can be felt without its source being named.',
        ],
    },
    {
        planet: 'mars', sign: 'sagittarius',
        headline: 'Energy that goes wide, fast, and toward something meaningful.',
        core: [
            'Mars in Sagittarius acts on conviction. Give this placement something it believes in and the energy is enormous and genuinely infectious; give it something it considers pointless and there is nothing there at all. You take large risks with real cheerfulness and recover from setbacks faster than seems reasonable.',
            'The scale outruns the logistics. This Mars commits to more than the situation can carry and then treats the shortfall as somebody else\'s failure of nerve, and it can be gone before the consequences of the last enthusiasm have arrived. In conflict the bluntness is the weapon and it is usually less deliberate than it appears from the receiving end.',
        ],
    },
    {
        planet: 'mars', sign: 'capricorn',
        headline: 'Mars exalted: ambition with a decade of patience behind it.',
        core: [
            'Mars is exalted in Capricorn, and the reason is that force here acquires a structure to run along. Effort is strategic, paced and pointed at something that pays out only in the long run, and the discipline required is not felt as discipline - it is simply how the work is done. This placement gets further than faster ones because it never had to stop and start.',
            'The engine does not idle. This Mars struggles to rest without a justification and treats an unproductive week as a small failure, which, added up over time, is not a small cost. Anger is controlled to the point of invisibility and comes out as coldness or as an abrupt, permanent withdrawal of regard that can come without visible warning.',
        ],
    },
    {
        planet: 'mars', sign: 'aquarius',
        headline: 'Action from principle, at an unusual angle.',
        core: [
            'Mars in Aquarius will not be pushed and will not push in the expected direction. You act on grounds you can state, you are drawn to the approach nobody has tried, and you are largely immune to social pressure - the fact that everyone is doing it is closer to an argument against. Effort is intermittent rather than steady, arriving in bursts around an idea.',
            'Detachment blunts the force. This Mars can argue a position with complete conviction and then not act on it, and it can be strikingly unmoved by the human cost of a change it considers correct. Under direct confrontation it becomes cooler and more theoretical, which is effective in an argument and infuriating in a relationship.',
        ],
    },
    {
        planet: 'mars', sign: 'pisces',
        headline: 'Drive that works indirectly and runs on inspiration.',
        core: [
            'Mars in Pisces does not push, it flows around. Direct assertion is genuinely uncomfortable here, and what replaces it is a considerable capacity to act through influence, imagination and persistence that does not look like persistence. When this Mars is inspired the output can be striking; when it is not, the same energy is simply unavailable and no amount of discipline manufactures it.',
            'Anger is the material this placement handles worst. It gets absorbed rather than expressed, and what surfaces later is guilt, tiredness or a quiet withdrawal that nobody can trace back to a cause. There is also a tendency to avoid the confrontation and then to be genuinely blindsided by a situation that had been visible for months.',
        ],
    },
];
export const PERSONAL_PLANET_PLACEMENTS = [...mercury, ...venus, ...mars].map(placementUnit);
