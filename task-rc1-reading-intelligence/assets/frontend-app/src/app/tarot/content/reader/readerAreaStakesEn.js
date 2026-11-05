/**
 * WHAT A CARD PUTS FORWARD IN ONE AREA OF LIFE - the card's stake read for the question's area, where the card shows differently there.
 *
 * The card's own stake (READER_CARDS[id].en.stake, TAROT_REVERSED_STAKES_EN) is written to hold for any question. Most cards still show
 * differently in work, between people and inside oneself, and Tarot reading has long read them that way: the Devil in work is a tie to a role
 * kept by obligation or security, in a relationship a closeness kept by need or habit; the Three of Pentacles between people is a bond built
 * by working at it together. This table holds those readings, and only those: a card whose own stake already says what it shows in an area
 * has no entry for it, so its own stake is read there. Nothing here is a second meaning: each line is the card's established meaning, said
 * for the area.
 *
 *   work           the working life: effort, role, craft, ambition, the people one works with
 *   relationships  close bonds of any kind (a partner, family, friends): closeness, trust, giving and receiving, distance
 *   self           a question about oneself: habits, self-knowledge, change in oneself
 *
 * SAME FORM AS THE STAKE. A bare noun phrase, dropped after a colon ("shows where things actually stand: ..."), after "as" ("describes the
 * other side's part as ...") and into the takeaway ("the emphasis moves from ... to ..."), so the card section, the synthesis and the takeaway
 * of one reading say the same thing about the card. Upright lines keep commas out, so a list of two stakes stays readable.
 *
 * NOTHING HERE PREDICTS OR READS A MIND. A line says what the card shows in the area, never what will happen, never what another person
 * privately thinks or feels, never a diagnosis, an amount, an event or a life instruction.
 *
 * ENGLISH ONLY. The Slovak Reader is frozen.
 */
export const READING_AREAS = ['work', 'relationships', 'self'];
export const TAROT_AREA_STAKES_EN = {
    /* --------------------------------------------------------- major arcana */
    'major-fool': {
        work: ['a new direction in work taken before it is proven', 'a working start held back by hesitation or rushed without any plan'],
        relationships: ['openness to a connection without knowing yet where it leads', 'closeness approached too warily to begin or too carelessly to hold'],
        self: ['readiness to try a new way of being before you know it works', 'a change in yourself put off for want of certainty or leapt at without looking'],
    },
    'major-magician': {
        work: ['skill and resources gathered into one deliberate piece of work', 'talent spread across too many aims or spent on selling rather than doing'],
        relationships: ['the ability to make a connection real through what is said and done', 'charm used in place of honesty, or words that no act follows'],
        self: ['the means to change what you want to change already in your hands', 'ability doubted or scattered so that nothing you intend gets made'],
    },
    'major-high-priestess': {
        work: ['a judgement about the work sensed before it can be argued', 'an instinct about the work drowned out by other voices or trusted without a check'],
        relationships: ['what is felt in the relationship and not yet said', 'what stays unsaid with someone close turning into distance or guesswork'],
    },
    'major-empress': {
        work: ['work that grows by being given time and care rather than pushed', 'creative output run dry, or care for the work that smothers it'],
        relationships: ['warmth and care that let closeness grow at its own pace', null],
        self: ['growth in yourself that comes from being looked after rather than driven', 'care for yourself neglected or turned into indulgence'],
    },
    'major-emperor': {
        work: ['rules and authority that give the work a frame it can rely on', 'authority over the work hardened into control, or no structure anyone can rely on'],
        relationships: ['steadiness and clear limits that make closeness feel safe', 'closeness run by control, or with no dependable footing at all'],
        self: ['self-discipline that gives your days a frame you can rely on', 'self-discipline gone rigid, or no structure you keep to at all'],
    },
    'major-hierophant': {
        work: ['established methods and the training that passes them on', 'the accepted way of working followed without question or thrown off before it is understood'],
        relationships: ['shared values and the conventions a bond is expected to keep', 'a bond shaped by expectations more than by what suits the people in it'],
        self: ['learning from a teacher or a tradition before making it your own', 'beliefs about how to live kept because they were handed down or dropped unexamined'],
    },
    'major-lovers': {
        work: ['a choice about work that shows what is actually valued', 'work pulling against what is valued while the choice is put off'],
        relationships: ['closeness that holds because the values in it are shared', 'closeness strained where desire and values pull different ways'],
    },
    'major-chariot': {
        work: ['drive and discipline steering the work in one direction', 'ambition pulled several ways at once or pushed through on force alone'],
        relationships: ['two people\'s different pulls held together by deliberate effort', 'a connection pulled in opposite directions, or steered by one side by force'],
        self: ['will that turns conflicting urges in you into one course', 'the will in you pulled several ways at once, or change forced through on willpower alone'],
    },
    'major-strength': {
        work: ['patience and steady nerve under pressure at work', 'composure at work that cracks under pressure or covers frustration'],
        relationships: ['gentleness that steadies strong feelings on both sides', 'patience with someone close worn thin, or calm kept as a lid on what is felt'],
    },
    'major-hermit': {
        work: ['time away from the crowd to think the work through', 'withdrawal from colleagues that has become avoidance'],
        relationships: ['a need for distance and time alone inside a close bond', 'distance in a bond that has become a way of not facing it'],
    },
    'major-wheel-of-fortune': {
        work: ['a turn in working conditions that no one person controls', 'a working pattern that keeps coming round because it is never examined'],
        relationships: ['closeness moving through a cycle of nearer and more distant times', 'the same pattern in the bond repeating because nobody looks at it'],
        self: ['a turning point in yourself that you cannot fully steer', 'a pattern in yourself that keeps coming round because it is never examined'],
    },
    'major-justice': {
        work: ['fair dealing and an honest account of what each part of the work produced', 'a judgement of the work tilted by bias, or responsibility left unshared'],
        relationships: ['fairness and honesty about what each side brings', 'an account kept unevenly in the bond, with the blame placed on one side'],
        self: ['an honest look at your own choices and what has followed from them', 'a judgement of yourself that leaves out half the facts'],
    },
    'major-hanged-man': {
        work: ['a pause in the work that shows it from another angle', 'a stall at work that has stopped serving any purpose'],
        relationships: ['a pause in the bond that changes how it is seen', 'waiting on the bond that has turned into putting off'],
    },
    'major-death': {
        work: ['the end of one way of working that clears room for another', 'a working chapter that is over but not yet let go'],
        relationships: ['an old form of the bond ending so that another can take its place', 'a change in the bond that is resisted or rushed past'],
        self: ['an old version of yourself allowed to end', 'a change in yourself resisted after it has already begun'],
    },
    'major-temperance': {
        work: ['a working balance found by blending different demands patiently', 'a working balance thrown off by overload or haste'],
        relationships: ['patience and give-and-take that let two different people fit together', 'closeness thrown off balance by excess on one side or impatience'],
        self: ['balance found between opposite needs in you', null],
    },
    'major-devil': {
        work: ['a tie to the work kept by obligation or security more than by choice', 'a tie to the work that loosens once named or is excused as how things are'],
        relationships: ['closeness held in place by need or habit more than by choice', 'a hold in the relationship that eases once it is seen, or is denied'],
        self: ['a habit or craving that has stopped being questioned', 'a habit that loosens once it is looked at, or hides behind excuses'],
    },
    'major-tower': {
        work: ['a working arrangement that can no longer hold its own weight', 'a working arrangement eroding slowly while everyone acts as if it holds'],
        relationships: ['an upheaval that shows what the bond was resting on', 'strain in the relationship carried quietly instead of faced'],
        self: ['a belief about yourself that can no longer hold', 'a belief about yourself propped up while it is already cracking'],
    },
    'major-star': {
        work: ['renewed hope about the work and a sense of where it can go', 'discouragement about the work, or a hope with no step taken toward it'],
        relationships: ['trust and openness that let a bond breathe', 'hope for the bond worn thin, or a wish that nobody acts on'],
        self: ['quiet hope in yourself and in what you can become', 'hope in yourself worn thin, or kept as a wish with no step behind it'],
    },
    'major-moon': {
        work: ['an unclear working picture in which not everything can be checked', 'confusion about the work lifting, or worry about it passing for fact'],
        relationships: ['uncertainty about someone close in which fears and instincts both speak', 'doubts about someone close either clearing or hardening into suspicion'],
    },
    'major-sun': {
        work: ['visible success and plain confidence in the work', 'recognition for the work arriving late, or enthusiasm put on'],
        relationships: ['warmth and openness with nothing kept hidden in the bond', 'warmth in the relationship that is shown more than felt'],
        self: ['the confidence to be plainly and openly yourself', 'confidence in yourself dimmed, or put on for other people'],
    },
    'major-judgement': {
        work: ['a call to take stock of a working life and answer it honestly', 'a call about the work ignored, or a review of it turned into harsh self-criticism'],
        relationships: ['an honest reckoning with what the bond has been and could be', 'a reckoning with the bond put off or turned into blame'],
        self: ['a call to take honest stock of yourself and answer it', 'a call to change ignored, or a review of yourself turned into harsh self-criticism'],
    },
    'major-world': {
        work: ['a piece of work or a stage of it brought fully to completion', 'work stalled just short of done or called finished too early'],
        relationships: ['a bond that has come full circle and feels whole', 'a stage of the bond that is nearly closed but not quite'],
        self: ['a stage of your own growth brought to completion', 'a stage of your growth left just short of finished'],
    },
    /* ---------------------------------------------------------------- wands */
    'wands-ace': {
        work: ['a new idea or project with energy behind it and no shape yet', 'a working idea that stalls before it takes shape'],
        relationships: ['a spark of attraction or interest not yet acted on', 'mutual interest that flares and fades before it is followed'],
        self: ['a fresh drive to begin something in yourself', 'a drive to begin something in yourself that fizzles before it takes form'],
    },
    'wands-two': {
        work: ['planning how far to take the work from a secure base', 'work plans shrinking to the safe option or leapt into without a survey'],
        relationships: ['deciding how far a bond should reach beyond what is familiar', 'closeness kept to what feels safe or rushed past the familiar'],
    },
    'wands-three': {
        work: ['efforts sent out and now waiting to come back', null],
        relationships: ['a connection looking outward toward what lies ahead for it', 'waiting for a bond to move forward turning into worry'],
        self: ['growth you have set in motion and now have to let unfold', 'impatience with growth in yourself that has not shown yet'],
    },
    'wands-four': {
        work: ['a finished stage of the work worth marking', null],
        relationships: ['a settled and welcoming stage of a bond that is worth marking', 'a shared occasion held over tension nobody has named'],
        self: ['a stage of your own growth worth acknowledging', null],
    },
    'wands-five': {
        work: ['competition and friction between colleagues or efforts', 'rivalry over the work that goes underground or turns into a grievance'],
        relationships: ['squabbles and crossed wills that test closeness more than harm it', 'arguments with someone close going underground or hardening into resentment'],
        self: ['competing urges in you with none yet in charge', 'inner conflict pushed out of sight or turned against yourself'],
    },
    'wands-six': {
        relationships: ['a bond seen and welcomed by the people around it', 'a need for approval that outweighs what the bond itself gives'],
        self: ['confidence that comes from having come through something', 'confidence in yourself that leans on other people noticing'],
    },
    'wands-seven': {
        work: ['a position at work defended against challenge', 'a stand at work that gives way or is held long past its worth'],
        relationships: ['ground held under challenge from someone close', 'defensiveness with someone close, or giving way too soon'],
        self: ['standing by what you have come to believe when it is challenged', 'a conviction of yours given up too soon or defended out of habit'],
    },
    'wands-eight': {
        work: ['work moving fast with things close to landing', 'rushed work with crossed messages and timing that slips'],
        relationships: ['a connection moving quickly with messages flowing', 'crossed messages and a pace in the connection nobody prepared for'],
    },
    'wands-nine': {
        work: ['persistence in the work with a guard still up', 'fatigue at work turning into suspicion of people who are no threat'],
        relationships: ['guardedness in a close bond kept up as protection', 'wariness of someone close hardening into suspicion'],
    },
    'wands-ten': {
        work: ['too many responsibilities carried at once', 'a workload tipping into resentment or dropped all at once'],
        relationships: ['carrying more of the bond than one person can carry well', 'an uneven load in the bond tipping into resentment'],
        self: ['more expectations of yourself than you can carry well', 'expectations of yourself tipping into resentment or dropped all at once'],
    },
    'wands-page': {
        work: ['enthusiasm for a new direction in work not yet tested', null],
        relationships: ['an eager new interest between people not yet tested', 'interest in someone that runs hot and then hollow'],
        self: ['a new curiosity about yourself not yet tested', 'curiosity about yourself that flares and fades before it is followed'],
    },
    'wands-knight': {
        work: ['an ambitious push at work that moves faster than its aim', 'work started in haste and left half-done'],
        relationships: ['passion that pursues fast with its staying power still untested', 'excitement in the connection that scatters or stalls at the first obstacle'],
        self: ['eagerness to change faster than you can aim the change', 'attempts at change started in haste and left half-done'],
    },
    'wands-queen': {
        work: ['confidence and warmth that draw people to the work', null],
    },
    'wands-king': {
        work: ['leadership with a vision others can follow', 'leadership in the work hardened into domineering expectations'],
        relationships: ['a bond led by one person\'s vision and drive', 'one side setting the course of the bond with expectations beyond what the other can give'],
        self: ['a vision of who you want to become owned openly', 'a vision of who you should be turned into pressure on yourself'],
    },
    /* ----------------------------------------------------------------- cups */
    'cups-ace': {
        work: ['real feeling for the work offered and not yet put to use', 'enthusiasm for the work that spills early or shuts off'],
        relationships: ['an offer of feeling to someone not yet received', 'feeling in the bond held back or poured out before it has a place to land'],
        self: ['openness to your own feelings', 'feelings in you held back, or poured out before they are understood'],
    },
    'cups-two': {
        work: ['a working partnership built on mutual respect', 'a working partnership with one side giving more than it gets'],
    },
    'cups-three': {
        work: ['good company and shared gladness among colleagues', 'team spirit narrowing into cliques or gossip'],
    },
    'cups-four': {
        work: ['boredom with the work that hides what is on offer', null],
        relationships: ['withdrawal from someone close that leaves what is offered unseen', 'withdrawal from someone close beginning to lift, or hardening into indifference'],
    },
    'cups-five': {
        work: ['disappointment about the work fixed on what went wrong', 'disappointment about the work either accepted at last or skipped past'],
        relationships: ['grief over what was lost in a bond while what remains goes unseen', null],
    },
    'cups-six': {
        work: ['a pull toward familiar work and familiar people', 'the work measured against a polished memory of how it used to be'],
        relationships: ['tenderness shaped by shared history', null],
        self: ['an earlier version of yourself you keep returning to', 'an earlier picture of yourself that keeps you from the present one'],
    },
    'cups-seven': {
        work: ['too many options in work and none of them yet tested', null],
        relationships: ['hopes about a bond that run ahead of what is real', 'illusions about the bond either clearing or kept alive'],
        self: ['more versions of yourself imagined than tried', 'daydreams about yourself either clearing into one real aim or kept alive instead of tried'],
    },
    'cups-eight': {
        work: ['walking away from work that no longer satisfies', 'staying in unsatisfying work out of fear, or leaving everything restlessly'],
        relationships: ['a step back from what no longer satisfies in a bond', 'staying close out of fear, or walking away from closeness each time'],
        self: ['leaving behind a way of living that no longer satisfies', 'leaving what no longer satisfies you put off, or a restlessness that leaves everything'],
    },
    'cups-nine': {
        work: ['satisfaction with what the work has achieved', null],
        relationships: ['contentment in the relationship and the self-regard that comes with it', null],
        self: ['contentment with yourself and the risk of resting in it', 'contentment with yourself that has turned smug or hollow'],
    },
    'cups-ten': {
        work: ['a working place that feels like belonging', 'team harmony performed while strain goes unspoken'],
    },
    'cups-page': {
        work: ['a creative idea about the work just beginning to surface', null],
        relationships: ['a tender feeling for someone just beginning to show', null],
    },
    'cups-knight': {
        work: ['a working idea or offer carried forward on feeling', 'promises about the work that are not followed through'],
        relationships: ['a heartfelt offer carried toward someone at its own pace', null],
    },
    'cups-queen': {
        work: ['emotional intelligence that keeps the work humane', 'taking on everyone\'s feelings at work until the boundary goes'],
    },
    'cups-king': {
        work: ['calm leadership that holds steady under emotional pressure', null],
    },
    /* --------------------------------------------------------------- swords */
    'swords-ace': {
        work: ['a clear idea or decision about the work', null],
        relationships: ['a truth about the relationship made clear enough to say', 'words to someone close that cut too early or at the wrong thing'],
        self: ['a clear truth about yourself made sayable', 'a truth about yourself muddled, or turned harshly against you'],
    },
    'swords-two': {
        work: ['a working decision held in suspension', null],
        relationships: ['a stalemate in the bond in which both sides avoid looking', 'a standoff in the bond that breaks under pressure or hardens'],
        self: ['a decision about yourself avoided by not looking', 'a decision about yourself forced by pressure or still avoided'],
    },
    'swords-three': {
        work: ['a painful working truth or disappointment allowed to be plain', null],
        relationships: ['hurt in a close bond that is allowed to be named', 'hurt in the relationship pushed down or kept alive by retelling'],
    },
    'swords-four': {
        work: ['a deliberate break from the work to rest and take stock', 'rest from the work cut short, or a pause stretched into avoidance'],
        relationships: ['space taken within a bond to rest and think', null],
    },
    'swords-five': {
        work: ['a conflict over the work won at a cost to trust', null],
        relationships: ['an argument won at the cost of closeness', 'a quarrel with someone close dragged on past its point'],
    },
    'swords-six': {
        work: ['a move away from a difficult working situation', null],
        relationships: ['a slow move out of a difficult time in the relationship', null],
        self: ['a slow move away from an old difficulty in yourself', 'an old difficulty in yourself carried along instead of left behind'],
    },
    'swords-seven': {
        work: ['a working plan pursued alone and out of view', null],
        relationships: ['something kept back inside a close bond', 'something unspoken in the bond unravelling or hardening into self-deception'],
        self: ['a part of yourself kept out of view', 'something you keep from yourself coming into view or hardening into self-deception'],
    },
    'swords-eight': {
        work: ['feeling trapped in the work with options that look closed', null],
        relationships: ['feeling stuck in a bond whose ties are looser than they seem', null],
        self: ['a belief that there is no way out held more by the mind than by facts', null],
    },
    'swords-nine': {
        work: ['worry about work that is loudest when nothing can be done', null],
        relationships: ['anxious thoughts about a bond that run worst at night', null],
    },
    'swords-ten': {
        work: ['a working chapter that has fully run its course', null],
        relationships: ['a painful pattern in the relationship that has fully played out', null],
    },
    'swords-page': {
        work: ['a sharp eye for what is really going on at work', null],
        relationships: ['watchful curiosity about what is really going on in the bond', null],
    },
    'swords-knight': {
        work: ['an idea about the work pushed fast and hard', null],
        relationships: ['blunt words said fast to someone close', 'words to someone close that overshoot into tactlessness'],
    },
    'swords-queen': {
        relationships: ['honesty in the relationship said plainly and with care', null],
    },
    'swords-king': {
        relationships: ['fairness and principle in how a bond is handled', 'rigid rules laid over a bond'],
        self: ['principles you are willing to live by and stand behind', 'principles of yours turned into harsh rules for yourself'],
    },
    /* ------------------------------------------------------------ pentacles */
    'pentacles-ace': {
        work: ['a concrete working opportunity not yet grown', 'a real working opportunity going unseen'],
        relationships: ['a practical and grounded beginning for a bond', 'a practical start for the bond put off or not followed through'],
        self: ['a practical first step toward looking after yourself', 'a first step toward looking after yourself put off or not taken'],
    },
    'pentacles-two': {
        work: ['two demands of the work kept in motion at once', null],
        relationships: ['keeping a bond in balance alongside other demands', 'a bond losing out to other demands by default'],
        self: ['competing demands on your time and attention kept in balance', 'so many demands kept in the air that your own needs drop out of the balance'],
    },
    'pentacles-three': {
        relationships: ['a bond built by working at it together with each part recognised', 'shared effort in the bond going uneven as the roles blur'],
        self: ['learning from people whose skill you respect', 'learning from others held back by your pride or by working alone'],
    },
    'pentacles-four': {
        work: ['holding tightly to a secure working position', null],
        relationships: ['a hold on closeness kept tight for the sake of security', 'possessiveness in the bond either loosening or hardening'],
    },
    'pentacles-five': {
        work: ['a hard working stretch with help nearby but unasked', null],
        relationships: ['feeling left out in the cold with warmth close by but unasked for', null],
        self: ['a hard stretch in which asking for help feels out of reach', 'a hard stretch in you easing once help is let in, or hardship kept private'],
    },
    'pentacles-six': {
        work: ['an uneven exchange at work with one side holding the scales', null],
        relationships: ['care given and received on uneven footing', 'help in the relationship that comes with strings'],
        self: ['how you give to others and how well you let yourself receive', 'giving to others that leaves nothing for yourself, or help you accept with strings'],
    },
    'pentacles-seven': {
        relationships: ['time put into a bond that is still slow to show its growth', 'impatience with a bond that is still growing'],
        self: ['slow change in yourself that needs time before it can be judged', 'impatience with slow change in yourself before it can be judged'],
    },
    'pentacles-eight': {
        relationships: ['steady and patient effort put into a bond', 'effort in a bond gone mechanical'],
        self: ['practice that changes you slowly by repetition', 'practice on yourself gone mechanical or perfectionist'],
    },
    'pentacles-nine': {
        work: ['self-made independence earned through work', null],
        relationships: ['self-sufficiency that may leave little room for anyone else', null],
        self: ['self-reliance and ease in your own company', 'self-reliance that keeps everyone out, or an ease in yourself resting on shaky ground'],
    },
    'pentacles-ten': {
        work: ['lasting stability built through the work', 'long-term working security under strain'],
        relationships: ['lasting belonging and continuity among people close to one another', null],
        self: ['what you want your life to stand for over the long run', 'what you want your life to stand for crowded out by short-term pressures'],
    },
    'pentacles-page': {
        relationships: ['a careful and sincere start to a bond', null],
        self: ['patient learning of something new about how you live', 'a new practice for yourself started and dropped before it can teach anything'],
    },
    'pentacles-knight': {
        relationships: ['a steady and dependable presence in a bond', 'reliability in a bond hardening into routine'],
        self: ['change built slowly by the habits you keep', 'your habits hardened into a rut'],
    },
    'pentacles-queen': {
        relationships: ['warm and practical care that makes daily life together easier', null],
        self: ['looking after your own daily needs as well as other people\'s', 'care for others crowding out care for yourself'],
    },
    'pentacles-king': {
        relationships: ['a steady provider\'s way of holding a bond', 'a bond held together through control of what is shared'],
    },
};
/** A line that speaks of the reader ("in yourself"), which cannot describe the other side's part. */
const ADDRESSES_READER = /\b(?:you|your|yours|yourself)\b/i;
/**
 * The card's stake for an area in an orientation, or null when the card has none and its own stake is read. `place` is the function of the position
 * the card is read in: a place for the other side is never given a line about the reader (the self area's lines are about you), so it keeps the
 * card's own stake there.
 */
export function areaStakeOf(cardId, orientation, area, place) {
    if (!area)
        return null;
    const pair = TAROT_AREA_STAKES_EN[cardId]?.[area];
    const line = pair ? (orientation === 'reversed' ? pair[1] : pair[0]) ?? null : null;
    return line !== null && place === 'other' && ADDRESSES_READER.test(line) ? null : line;
}
