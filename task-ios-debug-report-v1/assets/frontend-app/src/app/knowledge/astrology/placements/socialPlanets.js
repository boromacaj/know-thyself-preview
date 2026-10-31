import { placementUnit } from '../astrologyAuthoring.js?v=b5ef5ed';
/**
 * JUPITER AND SATURN THROUGH THE TWELVE SIGNS.
 *
 * The two social planets sit between the personal and the generational. Jupiter
 * spends about a year in a sign and Saturn about two and a half, so a placement
 * here is shared with a cohort but is narrow enough to still say something -
 * roughly the resolution of a school year rather than a generation.
 *
 * They are written slightly shorter than the personal planets for that reason,
 * and because a reader meets them as context rather than as self-recognition.
 * Jupiter describes where someone overreaches and gets away with it; Saturn
 * describes where the ground is hard and, eventually, where the authority is.
 */
const jupiter = [
    {
        planet: 'jupiter', sign: 'aries',
        headline: 'Growth through going first.',
        core: [
            'Jupiter in Aries expands by starting. Opportunity tends to arrive for you at the moment of moving rather than the moment of preparing, and a certain amount of luck genuinely does follow the willingness to begin before the conditions are right. Confidence here is real and it opens doors that caution would have left shut.',
            'The overreach is in scale and speed together. This placement takes on more than the situation supports and assumes momentum will cover the gap, which it sometimes does. When it does not, the shortfall is usually discovered by somebody downstream.',
        ],
    },
    {
        planet: 'jupiter', sign: 'taurus',
        headline: 'Growth through accumulation and good taste.',
        core: [
            'Jupiter in Taurus expands slowly and keeps what it gains. There is usually a real instinct for value here - what something is actually worth, as against what it costs - and a capacity to build comfort and security that other placements find effortful. Generosity is practical: you give things people can use.',
            'The excess is straightforward and concrete. This placement overdoes comfort, holds on to more than it needs, and can confuse abundance with the absence of any reason to stop. Growth stalls where the situation has become pleasant enough that changing it would be a nuisance.',
        ],
    },
    {
        planet: 'jupiter', sign: 'gemini',
        headline: 'Growth through range and contact.',
        core: [
            'Jupiter in Gemini widens by learning and by talking to people. Opportunity arrives through conversation here more than through planning, and the sheer breadth of what you take an interest in creates connections between fields that specialists never make. There is a genuine gift for making an unfamiliar subject sound approachable.',
            'The overreach is dispersal. This placement says yes to more things than any one person can be present for, and the range that looks like richness at thirty can look like a lack of anything finished at fifty. Depth has to be chosen against the grain.',
        ],
    },
    {
        planet: 'jupiter', sign: 'cancer',
        headline: 'Jupiter exalted: growth through what you shelter.',
        core: [
            'Jupiter is exalted in Cancer, and it expands here through care, family and the making of places where people can be at ease. Generosity is emotional and practical at once, and there is usually a genuine capacity to look after people well.',
            'What overgrows is the protective instinct. This placement takes on more people than it can carry, and can smother in the name of nurture. Security can also be accumulated well past the point where any real threat remains.',
        ],
    },
    {
        planet: 'jupiter', sign: 'leo',
        headline: 'Growth through generosity performed in the open.',
        core: [
            'Jupiter in Leo is expansive in the most visible way. Confidence, warmth and a real willingness to back people publicly are the mechanism here, and they tend to open doors, because warmth and backing are easy to welcome. The generosity is genuine rather than calculated.',
            'The excess is scale of self. Faith in your own judgement can outrun the evidence, and the display can become the point rather than the thing being displayed. Advice is offered here more freely than it is requested.',
        ],
    },
    {
        planet: 'jupiter', sign: 'virgo',
        headline: 'Growth through the accumulation of useful competence.',
        core: [
            'Jupiter in Virgo expands by getting good at things. This is the least showy placement of the most expansive planet, and what it produces is opportunity earned through demonstrated reliability rather than through faith or charm. Generosity takes the form of practical help, offered specifically.',
            'The overreach is invisible from outside: this placement takes on more responsibility than it can discharge, because each individual piece looked manageable. There is also a tendency to shrink an opportunity to the size of what can be guaranteed.',
        ],
    },
    {
        planet: 'jupiter', sign: 'libra',
        headline: 'Growth through other people, and through fairness.',
        core: [
            'Jupiter in Libra expands relationally. Doors open through partnership here more reliably than through solo effort, and there is a real instinct for the arrangement that leaves both sides better off. Social generosity comes easily and is usually reciprocated.',
            'The excess is accommodation. This placement can grow a life almost entirely around other people\'s directions and mistake the resulting busyness for a direction of its own. Conflict avoided repeatedly becomes conflict compounded.',
        ],
    },
    {
        planet: 'jupiter', sign: 'scorpio',
        headline: 'Growth through what most people would rather not examine.',
        core: [
            'Jupiter in Scorpio expands by going deeper rather than wider. Opportunity here is tied to depth - the difficult material, the thing nobody wants to handle, the situation that requires nerve - and this placement is genuinely enriched by experiences that would deplete others.',
            'The overreach is intensity and appetite. This placement can pursue a subject or a person past the point of usefulness, and it has a considerable capacity for excess that stays easy to hide because so little of it is visible.',
        ],
    },
    {
        planet: 'jupiter', sign: 'sagittarius',
        headline: 'Jupiter in its own sign: faith, distance and appetite for the larger frame.',
        core: [
            'Jupiter rules Sagittarius, and here the expansive function runs without friction. Optimism is genuine rather than manufactured, opportunity is found abroad and in the unfamiliar, and there is a real ability to hold a large view of what a life could be and act as though it were available.',
            'Unrestrained, this is the placement that promises what it cannot deliver and believes it at the time. Conviction outpaces evidence, the next horizon displaces the current one, and the detail is left for someone with a smaller view to handle.',
        ],
    },
    {
        planet: 'jupiter', sign: 'capricorn',
        headline: 'Growth that is slow, structural and eventually large.',
        core: [
            'Jupiter in Capricorn expands within limits, which is uncomfortable for it and productive for you. Opportunity here comes through demonstrated competence over a long period, and what gets built has foundations. Generosity is real but dutiful rather than spontaneous.',
            'The difficulty is that the expansive impulse is heavily governed. This placement can decline a genuine opportunity for being insufficiently proven, and it can mistake caution for judgement. Faith has to be built rather than felt.',
        ],
    },
    {
        planet: 'jupiter', sign: 'aquarius',
        headline: 'Growth through ideas, networks and the unorthodox route.',
        core: [
            'Jupiter in Aquarius expands through people you are not related to and ideas nobody has monetised yet. Opportunity arrives sideways here, through networks and shared enthusiasms, and there is a genuine ability to see what a system could become rather than what it currently is.',
            'The excess is abstraction. This placement can hold a large humane vision while being oddly careless about the specific person it inconveniences, and it can pursue an idea for its originality rather than its merit.',
        ],
    },
    {
        planet: 'jupiter', sign: 'pisces',
        headline: 'Growth through compassion, imagination and letting go.',
        core: [
            'Jupiter has classical rulership of Pisces, and it expands here through the parts of life that cannot be measured: imagination, faith, and a real willingness to give without accounting. This placement tends to stay open to what arrives unlooked-for, and it has a real capacity to trust a process it cannot see the shape of.',
            'The overreach is boundarylessness. This placement gives past its own capacity, believes people who have not earned it, and can drift on the assumption that something will turn up. Escape is the shadow, and it is comfortable enough to go unnoticed for a long time.',
        ],
    },
];
const saturn = [
    {
        planet: 'saturn', sign: 'aries',
        headline: 'Learning to act, when acting was made to feel dangerous.',
        core: [
            'Saturn in Aries puts a brake on initiative. Self-assertion tends to feel costly here, and what follows is a long relationship with hesitation - the impulse arrives and is immediately audited. Anger is difficult territory, often suppressed until it is not.',
            'What this builds, eventually, is deliberate courage: action taken by someone who knows exactly what it might cost, which is more durable than the version that never had to think. The work is separating a real reason for caution from the habit of it.',
        ],
    },
    {
        planet: 'saturn', sign: 'taurus',
        headline: 'Learning that security is built rather than given.',
        core: [
            'Saturn in Taurus makes material stability something that has to be worked for and worried about. There is frequently an early sense of scarcity - not always literal - that produces a lasting carefulness with money, possessions and comfort, and a suspicion of anything that arrives easily.',
            'The eventual competence is real: this placement builds slowly and does not lose what it builds. The cost along the way is a persistent sense of not-enough that survives the arrival of enough, and a difficulty in spending on yourself without justifying it.',
        ],
    },
    {
        planet: 'saturn', sign: 'gemini',
        headline: 'Learning to trust your own mind out loud.',
        core: [
            'Saturn in Gemini weighs on speech and on thinking. It tends to show as a habit of editing before speaking and a private suspicion that you are less quick than the room. Learning can feel effortful in a way that has nothing to do with capacity.',
            'What this builds is real thoroughness: this placement knows what it knows, because it checked. The work is noticing when the checking has become a way of never having to be exposed.',
        ],
    },
    {
        planet: 'saturn', sign: 'cancer',
        headline: 'Learning to need people, and to let it show.',
        core: [
            'Saturn in Cancer sits on the part of a person that asks for care. Early conditions usually made dependency feel unsafe or unavailable, and the adaptation is self-sufficiency arrived at too young - competent, contained, and quietly certain that needing is a liability.',
            'The eventual strength is a genuinely reliable emotional steadiness that others rest on. The work is the reverse direction: letting somebody carry something for you without immediately settling the account.',
        ],
    },
    {
        planet: 'saturn', sign: 'leo',
        headline: 'Learning to take up space without apologising for it.',
        core: [
            'Saturn in Leo constrains self-expression. There is often an early lesson that standing out invited something unpleasant, and the result is a person who has real presence and a persistent discomfort about using it. Creativity is taken seriously here and rarely felt to be good enough.',
            'What can emerge is authority that does not need applause - the quieter and steadier version. The work is distinguishing modesty from a habit of pre-emptive self-diminishment.',
        ],
    },
    {
        planet: 'saturn', sign: 'virgo',
        headline: 'Learning that adequate is a real category.',
        core: [
            'Saturn in Virgo doubles the exacting quality. Standards here are punishing and largely internal, and they tend to measure you against something that cannot be met. Work and routine become the arena where worth gets negotiated.',
            'The competence this produces is genuine and hard-won. The work is accepting that a finished thing with visible imperfections is worth more than a perfect thing that was never released, which this placement can know intellectually long before it believes it.',
        ],
    },
    {
        planet: 'saturn', sign: 'libra',
        headline: 'Saturn exalted: learning fairness the slow way.',
        core: [
            'Saturn is exalted in Libra, because judgement and proportion are exactly what it is good at. Relationships here are serious business and often difficult early - taken on too young, or with too much weight, or with a partner who required more than was reasonable. Commitment is not entered lightly.',
            'What this builds is genuine relational integrity: someone who keeps agreements and can be relied on to be fair when it costs them. The work is not becoming so careful about relating that the relating never quite happens.',
        ],
    },
    {
        planet: 'saturn', sign: 'scorpio',
        headline: 'Learning to trust, and to let go of control.',
        core: [
            'Saturn in Scorpio applies pressure to intimacy, trust and everything shared. There is usually an early encounter with betrayal, loss or a power imbalance, and the adaptation is control - of information, of exposure, of how much anyone gets to affect you.',
            'The strength this produces is real resilience and an ability to handle frightening material. The work is recognising when the control that protects you is the thing keeping the closeness out.',
        ],
    },
    {
        planet: 'saturn', sign: 'sagittarius',
        headline: 'Learning what you actually believe, having lost the borrowed version.',
        core: [
            'Saturn in Sagittarius constrains faith and freedom. Inherited frameworks - of belief, of belonging - tend to feel either too heavy or not solid enough, and what follows is a serious, sometimes lonely business of working out what you hold to be true without inheriting it.',
            'What this builds is conviction that has been tested and can be stated. The work is not letting the collapse of one certainty harden into a general refusal to commit to any.',
        ],
    },
    {
        planet: 'saturn', sign: 'capricorn',
        headline: 'Saturn in its own sign: the weight, and the authority that follows.',
        core: [
            'Saturn rules Capricorn, and here the limiting function operates without dilution. Responsibility arrives early, ambition is serious rather than aspirational, and there is usually a long stretch of carrying something heavier than the situation warranted. Nothing in this placement is given.',
            'What it produces, often slowly, is real authority - the sort that comes from having done the thing rather than from having been appointed. The work is noticing when the load has become identity, and putting some of it down.',
        ],
    },
    {
        planet: 'saturn', sign: 'aquarius',
        headline: 'Learning where you belong, having been outside it.',
        core: [
            'Saturn has classical rulership of Aquarius, and here it applies pressure to belonging. There is often a sense of being the outsider - not dramatically, just structurally - and the adaptation is a principled independence that is genuine and also partly a defence.',
            'What this builds is someone who can hold a position against a group and be right. The work is letting a group matter to you, which requires accepting that being included is not the same as being absorbed.',
        ],
    },
    {
        planet: 'saturn', sign: 'pisces',
        headline: 'Learning to give form to something that resists it.',
        core: [
            'Saturn in Pisces puts structure where there is least of it. Boundaries are the recurring difficulty - knowing where you end, saying no, keeping the imaginative life from dissolving the practical one - and there is often an early responsibility taken for something that could not actually be fixed.',
            'What it eventually produces is compassion with an edge: the ability to help without being consumed, and to make something real out of material that started as feeling. The work is the boundary itself, and it stays work.',
        ],
    },
];
export const SOCIAL_PLANET_PLACEMENTS = [...jupiter, ...saturn].map(placementUnit);
