/**
 * EACH CARD ON ITS OWN, IN ENGLISH - upright and reversed.
 *
 * The reading composes sentences ABOUT TWO CARDS from short fragments (tarotCardVoiceEn.ts); that is how 456,456 spreads
 * exist without being written, and it is why those fragments cannot stand alone. This is the other thing a person asks of
 * a card they have turned over: what is this card, by itself? Two short paragraphs each, written for a screen the size of
 * a phone.
 *
 * WHAT EACH PARAGRAPH DOES. The upright one names what the card shows in the traditional picture and what that means. The
 * reversed one says how the same card expresses when it turns - and a reversal here is an ALTERED expression of the same
 * card, not its opposite and not a bad card: that is the model the whole deck uses (content/tarotOrientation.ts), and each
 * reversed paragraph follows the alteration that file assigns the card (diminished, blocked, excessive, internalised,
 * exposed, unchanged). The pictures are the ones the tradition has shared since the Rider-Waite-Smith deck; the wording is
 * this product's own.
 *
 * NOTHING HERE PREDICTS. No paragraph names an event, a person, a diagnosis, an amount of money or what somebody else
 * thinks. Each describes a pattern and what it asks for. And none of them apologises for itself.
 */
export const TAROT_CARD_DETAIL_EN = {
    /* --------------------------------------------------------- major arcana */
    'major-fool': {
        upright: 'A beginning made before certainty is available. The Fool is the courage to be a novice, and it asks whether you are starting out of real openness or simply avoiding the work of looking first.',
        reversed: 'Reversed, the beginning can stall in hesitation or, the other way, rush ahead without looking. Naivety may harden into recklessness, or caution into never starting. Either way the openness is harder to reach.',
    },
    'major-magician': {
        upright: 'Intention made real through skill and focus. The Magician marks the point where resources stop being potential and become action. Until they are committed to one aim, they remain a demonstration, not work.',
        reversed: 'Reversed, skill and intention can come apart. Talent scatters across too many aims, goes unused, or turns to persuasion and trickery instead of substance. The ability may be real, but its direction or honesty is in question.',
    },
    'major-high-priestess': {
        upright: 'Quiet knowledge that has not yet become speech. The High Priestess is intuition and discretion: what is sensed but not demonstrable, and the restraint to let it mature before it is acted on or explained.',
        reversed: 'Reversed, intuition can become unreliable or hard to reach. Secrets may leak out, inner signals may be drowned by noise, or a hunch gets trusted without being checked. Silence can be wisdom held back or simply something avoided.',
    },
    'major-empress': {
        upright: 'Abundance that comes from tending rather than forcing. The Empress is nurture, creativity and the senses given time to ripen. What gets patient care grows; what is only drawn on, yourself included, thins out.',
        reversed: 'Reversed, nurture can lose its balance. Care may dry up, flow only outward, or tighten into smothering; creativity can stall, and comfort can drift into indulgence or neglect of the body and the self.',
    },
    'major-emperor': {
        upright: 'Authority exercised as stewardship: a decision made, a limit set, a structure held up long enough to matter. The Emperor asks what you are willing to be accountable for, and whether your control still serves its purpose.',
        reversed: 'Reversed, structure can fail in either direction. Authority may harden into domination and rigid rules, or dissolve into disorder, avoided responsibility and boundaries nobody holds. Control and order are both harder to get right.',
    },
    'major-hierophant': {
        upright: 'A form handed down by institutions, teachers and shared practice. The Hierophant favours learning the rules before reshaping them, and asks what you owe to the tradition you belong to, and what it owes you.',
        reversed: 'Reversed, the relationship to convention shifts. A form may be questioned or outgrown, rejected out of habit without being understood, or authority may be followed blindly. It can mean freedom from a rule or a loss of what the rule carried.',
    },
    'major-lovers': {
        upright: 'A choice that reveals what you value. The Lovers is attraction tested against alignment: whether a connection, with another person or within yourself, can be chosen with open eyes and what that choice gives up.',
        reversed: 'Reversed, the choice or the bond loses its clarity. Values and desire pull apart, a decision is avoided or made by default, or attraction is mistaken for fit. Honesty about what you actually want tends to be the missing piece.',
    },
    'major-chariot': {
        upright: 'Determined progress toward a goal chosen on purpose. The Chariot is victory through focus, and it works only while the drive is yours to direct. Speed without a destination is just motion.',
        reversed: 'Reversed, control and direction can slip. Momentum may scatter as the opposing pulls diverge, or be forced through aggression and sheer pace with no clear destination. Progress can feel blocked, or be bought at a hidden cost.',
    },
    'major-strength': {
        upright: 'Inner mastery without domination. Strength is the steadiness to meet fear, temper or appetite with patience rather than force. The reaction you stop fighting often turns out to carry information.',
        reversed: 'Reversed, composure can crack or be faked. Confidence may waver, impulse may overrun judgment, or calm may be a lid pressed down on something that has not been faced. Self-doubt and forced control are both possible.',
    },
    'major-hermit': {
        upright: 'Chosen distance for the sake of insight. The Hermit is a self-guided search whose light shows only the next few steps. The withdrawal serves a purpose until the finding is ready to be shared; after that it is only absence.',
        reversed: 'Reversed, withdrawal can lose its purpose. Solitude may harden into isolation or avoidance, the search may be dropped, or a return to company may come before anything has been understood.',
    },
    'major-wheel-of-fortune': {
        upright: 'Cycles and timing that no one person controls. Good phases and hard ones both pass. Part of any situation is still open to influence and part simply has to turn; the work is telling them apart.',
        reversed: 'Reversed, the cycle can feel stuck, against you or badly timed. A turn may be resisted, a pattern may repeat because it is not examined, or bad luck may be blamed for what a choice could have changed. Timing is harder to read.',
    },
    'major-justice': {
        upright: 'A standard applied evenly, to others and to yourself. Justice weighs what was done and what follows from it, and the scale only works if sympathy and self-interest are kept off the pan. A fair outcome and a comfortable one are not always the same.',
        reversed: 'Reversed, the weighing can go crooked: bias, selective accounting, a verdict dodged, or a consequence pinned on someone else. It can also be an unfair judgement received, or fairness demanded of others and not of yourself.',
    },
    'major-hanged-man': {
        upright: 'A pause taken on purpose, giving up the usual stance so the matter can be seen from another side. The surrender is chosen, not imposed, and it costs something. The Hanged Man asks what you would notice if you stopped pushing.',
        reversed: 'Reversed, the pause can lose its purpose: stalling, martyrdom, a sacrifice nobody asked for, or a new angle refused. It can also be the pull to act too soon, before the view has had time to turn over.',
    },
    'major-death': {
        upright: 'An ending that cannot be argued out of existence. What has run its course is cleared away so that something genuinely different can eventually take its place, though not on the same day. Clinging to the old form only prolongs the final stretch.',
        reversed: 'Reversed, the ending can be resisted, half done or rushed. Something may be kept going past its time, or cut off abruptly so the change never has to be felt. Either way the transition is not allowed to finish.',
    },
    'major-temperance': {
        upright: 'Different things brought together in the right measure, slowly enough to become one. Moderation here is a skill: tasting, adjusting and waiting rather than reaching for an extreme. It works while patience outlasts the urge to hurry the blend.',
        reversed: 'Reversed, the blend can go out of proportion: excess, a swing between extremes, impatience, or elements that clash instead of combining. It can also be moderation so cautious that nothing is ever committed to.',
    },
    'major-devil': {
        upright: 'Something has hold of you, or you of it, and the grip is easier to keep than to examine. Often the chain is looser than it feels, held in place by habit, appetite or fear rather than force. The hard part is admitting how much of it may be chosen.',
        reversed: 'Reversed, the hold can loosen as it is finally seen, or it can go underground: denial, a break made in anger that leaves the pattern intact, a bond swapped for a quieter one. Seeing it plainly is what changes the odds.',
    },
    'major-tower': {
        upright: 'A structure that could no longer hold comes down all at once: a false certainty, a fragile arrangement, a story that needed too much propping up. The loss is real, and so is the cleared ground. What gets built there next has to rest on something truer.',
        reversed: 'Reversed, the upheaval can turn inward or drag out: a slow erosion, a shock carried privately, a collapse put off or narrowly avoided. It can also be a demolition chosen before the structure fell. A shaky foundation is still worth inspecting.',
    },
    'major-star': {
        upright: 'A steadier kind of hope, not a promise of good news. The Star restores what strain has drained and keeps you open to what comes without needing it settled first. Recovery comes before certainty, and certainty may never arrive.',
        reversed: 'Reversed, hope can run thin: discouragement, drained reserves, faith lost in the process, or hope kept as a wish with no action behind it. It can also mean openness left unprotected, or recovery coming slower than wanted.',
    },
    'major-moon': {
        upright: 'A situation that cannot be seen clearly yet, where instinct and fear both speak and neither can be checked. Some impressions here are evidence and some are only mood, and from inside they feel identical. Slow going is the sensible pace until the picture firms up.',
        reversed: 'Reversed, the haze begins to lift or turns into confusion. A fear is faced, a deception seen through, or an imagining is mistaken for fact. Move slowly and let what is real separate from what is imagined.',
    },
    'major-sun': {
        upright: 'Clarity and vitality, and the honest exposure that comes with them. Little is held back under this light, so what is real shows, including what you had hoped to keep out of view. The Sun asks whether you can stand being seen as you are.',
        reversed: 'Reversed, the light can dim or be overdone: delayed clarity, optimism that overreaches, joy performed rather than felt, or vitality that runs low. It can also be over-exposure, or confidence that has not been tested.',
    },
    'major-judgement': {
        upright: 'A call that can only be answered by the one it reaches. It means looking at the past taken whole, without defence or excuse, and then responding in your own voice. What is wanted is an answer, not an argument, and nobody else can give it for you.',
        reversed: 'Reversed, the call can go unheard or be refused: doubt, avoidance, harsh self-judgement, or a past rehearsed again and again without a verdict. It may also be a reckoning that arrives from outside before you are ready for it.',
    },
    'major-world': {
        upright: 'Completion with the loose ends gathered in. The long effort has made something, and partly it has made you, so the finish deserves a pause to register. Rushing straight into the next circuit usually means the last one was never taken in.',
        reversed: 'Reversed, the cycle can stall short of closing: a last piece missing, a finish delayed, completion declared too early, or a loop repeated because ending it means facing what comes next.',
    },
    /* ---------------------------------------------------------------- wands */
    'wands-ace': {
        upright: 'The beginning of drive, before there is any plan to hold it. It is appetite and possibility in their rawest form, and it asks whether you are ready to give the impulse a direction while it is still warm enough to carry you.',
        reversed: 'Reversed, the spark can stall before it catches: a delayed start, a creative block, or an impulse that fires at the wrong target. Energy may be low, borrowed from someone else\'s excitement, or spent on beginnings that never take root.',
    },
    'wands-two': {
        upright: 'A choice about scope, made from a position of safety. What is already secured sits against what could be reached, and the real decision is how far you truly intend to go, not merely how far you could.',
        reversed: 'Reversed, the planning can stall, shrink or be skipped. Fear may keep a person inside what is known, ambition may have no concrete first step, or the reach may be made without surveying the ground at all.',
    },
    'wands-three': {
        upright: 'A venture already launched and out of your hands. Foresight, patience and a next step kept ready: this is the stance between sending and receiving, held while the results are still unseen. The waiting is the work.',
        reversed: 'Reversed, returns can arrive late, smaller or in an unexpected form, and the waiting tends to turn into worry or second-guessing of the launch. It can also mark an expansion made without enough foresight to support it.',
    },
    'wands-four': {
        upright: 'A stage finished and honoured, with others present. Earned stability and belonging are the point, and the celebration is only as sound as what it stands on; if something unresolved sits underneath, the party covers it rather than clears it.',
        reversed: 'Reversed, the sense of arrival can be thin, delayed or withheld. Home may feel unsettled, a milestone may go unmarked, or harmony may be kept up over tension nobody has named; occasionally it marks a stability that has been outgrown.',
    },
    'wands-five': {
        upright: 'Competing wills in one space, none yet decisive. The friction can sharpen ideas or simply exhaust everyone, and it stays useful only while the contest serves something beyond being heard.',
        reversed: 'Reversed, the conflict can go underground or turn real. Tension may be avoided, fought through indirection or settled in a truce; occasionally sparring that was harmless hardens into a grievance with actual stakes.',
    },
    'wands-six': {
        upright: 'A victory that others have witnessed and now measure you by. Earned standing brings confidence, and the lasting version is the credit you can hold when the crowd has gone quiet.',
        reversed: 'Reversed, recognition can be delayed, withheld or hollow. Credit may go elsewhere, the win may feel unseen, or pride and the fear of a fall may crowd out the achievement itself.',
    },
    'wands-seven': {
        upright: 'A stand taken on something that is truly yours, against more opposition than is comfortable. It asks what is worth defending, and whether the ground you hold is conviction or only reflex.',
        reversed: 'Reversed, the defence can wear thin, overextend or turn pointless. A person may be overwhelmed and yield, treat every challenge as an attack, or hold a position long past its worth; sometimes it is a stand finally laid down.',
    },
    'wands-eight': {
        upright: 'Movement that has gathered its own pace and is nearing arrival. News and quick developments often follow a wait, and the cost is control: once something is released, little of it can be steered, so readiness comes before the send.',
        reversed: 'Reversed, momentum can stall, scatter or overrun its aim. It can show delay, crossed messages or haste without direction; sometimes the pace is simply too fast to absorb, and sometimes what was in flight is recalled.',
    },
    'wands-nine': {
        upright: 'Endurance close to its limit, with one more stretch to go. Hard-won caution and the strength to keep standing are both real; the open matter is how much of the guard still protects something and how much has simply become habit.',
        reversed: 'Reversed, the guard can harden into defensiveness or finally give way. It may show exhaustion, suspicion aimed at people who are not the threat, a refusal to ask for help, or the decision to stop.',
    },
    'wands-ten': {
        upright: 'Too much carried by one person, mostly by accumulation rather than by any single decision. Loyalty and stubbornness look alike from the inside here, and the useful work is sorting which of the commitments still belong to you.',
        reversed: 'Reversed, the load can break the carrier or finally be put down. It may show burnout, resentment, a refusal to delegate, or a burden dropped abruptly; sometimes it is the work of sorting what was ever yours.',
    },
    'wands-page': {
        upright: 'The first flicker of interest, and the news or idea that carries it. A beginner\'s willingness to follow a pull is its strength; the enthusiasm is worth testing before it is announced as a direction.',
        reversed: 'Reversed, the spark can be hollow, late or exaggerated. A message may arrive delayed or garbled, interest may be announced and then dropped, or fear of looking naive may keep a real curiosity unspoken.',
    },
    'wands-knight': {
        upright: 'Fire in pursuit, committed to a course faster than it can check it. The Knight brings courage and momentum, but a charge with no chosen target tends to show its cost only later, and the speed is worth more once it has somewhere to go.',
        reversed: 'Reversed, the charge can scatter, stall or crash. It may show haste, recklessness, restlessness that starts everything and finishes little, or a sudden retreat at the first obstacle; occasionally the pace is simply misjudged.',
    },
    'wands-queen': {
        upright: 'Warmth and confidence generated from within rather than performed. The Queen is fire at home in itself, drawing others by being settled; her test is whether the vitality would survive without an audience.',
        reversed: 'Reversed, the warmth can dim, harden or demand an audience. Self-doubt may bank the fire low, confidence may turn possessive or jealous, or charm may be used to hold attention rather than share it.',
    },
    'wands-king': {
        upright: 'Vision made into direction for others and held with accountability. The King is mature fire, authority that organises heat into something people can join, and it holds only while the course keeps being tested against reality.',
        reversed: 'Reversed, leadership can harden or slip. Vision may turn domineering, impulsive or unrealistic, expectations may outgrow the means, or authority may be claimed without the commitment behind it; sometimes the direction itself is lost.',
    },
    /* ----------------------------------------------------------------- cups */
    'cups-ace': {
        upright: 'Feeling at its very start, not yet shaped: tenderness, compassion, a creative or spiritual opening. Receiving comes before managing here. The opening is real either way, and it can be left untouched as easily as it is accepted.',
        reversed: 'Reversed, access to feeling is altered. It can spill before it is carried anywhere, be offered too early, or be shut off by guardedness or numbness. What is held out may go unreceived, or the supply may seem to run dry.',
    },
    'cups-two': {
        upright: 'Two sides meeting as equals, with the exchange kept even: mutual recognition in love, friendship or work. It holds only while what is given and what is taken stay in rough proportion.',
        reversed: 'Reversed, the exchange stalls. One side waits for the other to agree, the balance tips, or the bond does not yet feel real. Meet it as an equal, in the open.',
    },
    'cups-three': {
        upright: 'Gladness made real by being shared: friendship, belonging, and the pause that lets a good thing be marked with others. The warmth of a circle is easiest to feel from inside it, and harder for whoever stands just outside.',
        reversed: 'Reversed, the circle turns in on itself. A celebration outstays its reason, company turns to gossip or cliques, joy stays private. Say it to the people it belongs to.',
    },
    'cups-four': {
        upright: 'Attention has turned inward and the available offers look flat. Sometimes that is a necessary pause to work out what is truly wanted; sometimes it is weariness that has learned to look like taste, and the difference decides whether the next offer is seen.',
        reversed: 'Reversed, attention begins to move again, though not always cleanly. A neglected offer may finally be seen, or the withdrawal may harden into numbness. Look at what is held out before deciding it is not for you.',
    },
    'cups-five': {
        upright: 'Grief and regret held on what went wrong. The loss is real and deserves its time. What remains intact is not denied by it, only uncounted for now, until attention widens enough to take it in.',
        reversed: 'Reversed, the figure begins to turn. Acceptance, counting what is left, or grief held too long. Turn far enough round to see the two cups still standing.',
    },
    'cups-six': {
        upright: 'Warmth carried forward from an earlier time: innocence, old loyalties, simple kindness. The gift is real, but memory sweetens with distance, so some of it is worth bringing into the present and some only looks better from far off.',
        reversed: 'Reversed, the past is brought into the light. Nostalgia lives in a version that has gone, or a memory is seen for what it was. Take the kindness and leave the year.',
    },
    'cups-seven': {
        upright: 'More possibilities than can all be real, each one vivid and none yet tested. Imagination and desire are honoured here, but only the wishes that survive ordinary conditions turn into choices.',
        reversed: 'Reversed, the haze clears or collapses. A choice is forced, an illusion is seen through, or every option is kept by choosing none. Pick one and let the others go.',
    },
    'cups-eight': {
        upright: 'A considered departure from something that looks complete but no longer feeds you. What is missing has to be named honestly, and so does the price of leaving the known behind. The leaving is deliberate, and so is its cost.',
        reversed: 'Reversed, the leaving is brought into question. Lingering, fear of departure, or leaving whenever it gets difficult. Go, without explaining it into the ground, or stay with eyes open.',
    },
    'cups-nine': {
        upright: 'Contentment that has been earned, and the plain right to enjoy it. What matters is whether the satisfaction is felt for its own sake or partly staged for others to see; the difference decides how much of it is actually tasted.',
        reversed: 'Reversed, satisfaction can turn hollow or smug. The wish may have been met without bringing the contentment expected, comfort can go stale, or enjoyment may come to depend on being seen. What is still wanted may be worth naming.',
    },
    'cups-ten': {
        upright: 'Fulfilment found between people: belonging, mutual ease, a home in the wider sense. Such closeness lasts only while difficulties can still be said aloud; without that, the harmony is just its surface.',
        reversed: 'Reversed, the picture is polished. Harmony is performed, strain goes unspoken, a household or group is not quite living what it displays. Let it be as good as it is.',
    },
    'cups-page': {
        upright: 'A feeling or idea just beginning to show itself, tender and still unformed. As a Page it is curious rather than mature: meaning comes after looking, not before, and a first impression is only a first impression.',
        reversed: 'Reversed, the notion is misread. A mood is treated as a message, feelings are too tender to hold, or an idea is held back. Notice it before deciding what it means.',
    },
    'cups-knight': {
        upright: 'Feeling set moving toward its object, by offering rather than force. The Knight is sincere and idealistic; what remains unproven is whether the gesture lasts once the glow of pursuit has faded.',
        reversed: 'Reversed, the gesture and the substance part. Charm without follow-through, moodiness, a promise that is only a gesture. Go toward it at a walk, and arrive.',
    },
    'cups-queen': {
        upright: 'Feeling taken in fully and still put to use. The Queen is at home in emotion without being run by it, and the test is whether she can tell her own feeling from another’s.',
        reversed: 'Reversed, sensitivity loses its boundary or its warmth. Others\' feelings can be absorbed as your own, mood can steer, or empathy can sour into withdrawal, martyrdom or quiet manipulation. Feel it without becoming it.',
    },
    'cups-king': {
        upright: 'Feeling governed without being denied. The King carries emotional responsibility in the open and stays steady when others are not. His composure is worth most while it can still be reached, and it fails once it has hardened into suppression.',
        reversed: 'Reversed, the calm turns cold or the feeling leaks. Control that suppresses what is felt, moodiness hidden behind composure. Stay steady without going cold, and let the water move.',
    },
    /* --------------------------------------------------------------- swords */
    'swords-ace': {
        upright: 'The moment a muddled matter takes an edge and a truth becomes sayable. Here a decision or a name can finally be weighed. The edge is only as good as the thing it is used on.',
        reversed: 'Reversed, the edge is unreliable. Clarity can cloud, a conclusion can arrive too early, or words come out blunt, late or aimed at the wrong thing. Check whether the certainty has been earned before acting on it.',
    },
    'swords-two': {
        upright: 'A decision held in suspension. The Two of Swords is poise that can protect a choice from haste, or protect a person from having to make it. It asks which of the two the pause has become.',
        reversed: 'Reversed, the stalemate shifts rather than resolves. It can break under pressure, lift as the avoidance is seen, or harden into paralysis, and a choice may be forced before enough is known. Notice which is happening.',
    },
    'swords-three': {
        upright: 'A grief or hard truth that arrives without cushioning. The Three of Swords marks a rupture that has to be felt before it can be understood. Explaining it away early only postpones the feeling.',
        reversed: 'Reversed, the hurt changes how it is carried. It can ease into slow recovery, be suppressed so that it surfaces sideways, or be reopened and kept alive by retelling. Notice whether the pain is being felt, avoided or rehearsed.',
    },
    'swords-four': {
        upright: 'Recovery before more is demanded: the stillness in which a strained mind or situation can be gathered up again. The Four of Swords is a pause chosen on purpose, and it works only while the rest has an end in view.',
        reversed: 'Reversed, the pause goes wrong in either direction. Rest can be refused or cut short until the strain returns, or it can drag on until retreat becomes avoidance. The test is whether the stopping is still restoring anything.',
    },
    'swords-five': {
        upright: 'A win that costs more than it gains. The Five of Swords sits where self-interest or pride has settled a contest, and it asks what the victory is protecting and whom it has already lost.',
        reversed: 'Reversed, the contest rarely ends cleanly. It can drag on after the point was won, give way to regret and a wish to repair, or show up as the one who walks away from a fight not worth its price. What is still being fought for is worth naming.',
    },
    'swords-six': {
        upright: 'A leaving of difficulty at the pace the passage allows. The Six of Swords offers relief that is real but partial, because what hurt still travels along. The crossing changes the distance from trouble, not the cargo.',
        reversed: 'Reversed, the passage is disrupted. The crossing can stall or be refused, a return can pull back toward the old shore, or the trouble comes along unexamined into the new place. What keeps the boat from moving is worth naming.',
    },
    'swords-seven': {
        upright: 'A plan that works by not being seen: strategy, discretion, the choice to go around the direct route. The cleverness has a price. Someone is left out of the story, and the one using it must keep it straight.',
        reversed: 'Reversed, the concealment shifts. It can be exposed, confessed or abandoned, or it can harden into self-deception and a story that no longer fits the facts. What the going round is avoiding is usually the part worth looking at.',
    },
    'swords-eight': {
        upright: 'Feeling trapped by a story as much as by circumstance. The Eight of Swords holds the fear, habit or lack of options that can feel like a locked door, and it asks what has actually been tested and what has only been assumed.',
        reversed: 'Reversed, the binding changes. It can loosen as the constraint is finally seen, tighten as fear hardens into certainty, or leave a person free but not yet willing to move. Test what actually holds.',
    },
    'swords-nine': {
        upright: 'Worry at its loudest, in the hours when nothing can be done about it. Fear gets its full size at night, and it needs a name and a measure before it can be weighed against what is actually known.',
        reversed: 'Reversed, the night changes shape. Dread can ease as it is spoken aloud, go underground as hidden anguish, or spiral further when it is carried alone. Wait for morning before believing what three o\'clock has said.',
    },
    'swords-ten': {
        upright: 'An ending that has played out in full: an overextended effort or story finally allowed to stop, with exhaustion and relief close together. Propping it up further only prolongs what is already over.',
        reversed: 'Reversed, the ending does not settle cleanly. It can drag on because letting go is refused, be dramatised past what happened, or begin to lift as recovery slowly starts. Whether it is being resisted, exaggerated or genuinely easing is worth telling apart.',
    },
    'swords-page': {
        upright: 'The beginner\'s edge: a mind eager to learn, test and question before it has the experience to judge. At its best the Page\'s curiosity stays curious, and words wait until the facts have arrived.',
        reversed: 'Reversed, curiosity can turn into gossip, suspicion or showing off, and quick wit into words said before the facts are in. It may also be a mind too scattered or too wary to learn. Slow the questions down.',
    },
    'swords-knight': {
        upright: 'Thought in full pursuit, with ambition and conviction behind it. The Knight of Swords goes after the point before the moment passes, decisive and direct. The speed is real; what it is aimed at, and who can keep up, is less certain.',
        reversed: 'Reversed, the charge loses its aim. It can overshoot into tactlessness, argue past being heard, burn out, or stall in hesitation. The conviction itself may be mistaken, so check the target before pressing the point harder.',
    },
    'swords-queen': {
        upright: 'Mature, direct perception: seeing what is there, saying it plainly, and standing behind it. This is sharpness with experience behind it, honest as long as precision does not slide into distance.',
        reversed: 'Reversed, clear sight can distort. Judgement may curdle into suspicion, cynicism or premature certainty, criticism can turn excessive or selective, and even an accurate perception can be used as a weapon. Check whether it is insight or defence.',
    },
    'swords-king': {
        upright: 'Authority of the mind: a person or stance that sets the terms by reasoning and takes responsibility for the outcome. Fairness and consistency are the measure, and a verdict that cannot be defended in the open does not count.',
        reversed: 'Reversed, authority loses its fairness. It can harden into rigidity and coldness, bend principle to suit the one deciding, or avoid ruling at all. The standard may be serving the case, or only the person applying it.',
    },
    /* ------------------------------------------------------------ pentacles */
    'pentacles-ace': {
        upright: 'The start of something real, offered but not yet taken up. The Ace of Pentacles is material potential in its plainest form, before any effort has gone into it. It stays potential until someone commits, and an offer left alone lapses.',
        reversed: 'Reversed, the offer can be missed, mistimed or poorly founded. A real chance may go unseen or be refused out of caution, or a start that looks solid may lack the footing, funds or backing to carry weight. Check what is actually on the table.',
    },
    'pentacles-two': {
        upright: 'Two demands held in play at once through constant small corrections. Here adaptability and timing do the work, and the juggling holds only while it serves both demands. Past that point it is a way of postponing a choice.',
        reversed: 'Reversed, the balance can tip into overload, dropped commitments and reactive scrambling, or into a forced simplification when one demand wins by default. Timing and priorities are what shift, and one demand may already be winning without having been chosen.',
    },
    'pentacles-three': {
        upright: 'Skill that becomes more than the sum of its parts when it answers to a shared plan. Competence, clear roles and a readiness to be corrected by people who can read the work are the price of entry. The result is better than any one hand could make.',
        reversed: 'Reversed, collaboration loses its common drawing. Roles blur, standards slip, feedback is resented or withheld, or one person carries what the group should. The plan itself may need rechecking, and so may your own part in it.',
    },
    'pentacles-four': {
        upright: 'Security pursued to the point where guarding becomes the main activity. Protecting what was earned is prudence while the danger lasts and a cost once the hold outlasts it. It asks what is being protected, and from what.',
        reversed: 'Reversed, the hold shifts. It may loosen into release, generosity or careless spending, or harden into hoarding, suspicion and fear of any loss. Control tends to go out of balance in either direction, and the cost of it starts to show.',
    },
    'pentacles-five': {
        upright: 'Want and exclusion, felt as being outside something others can reach. Shame, pride or exhaustion make help harder to see and to request, so the hardship deepens through silence as much as through lack. The need is real, and so may be the help nobody has been told about.',
        reversed: 'Reversed, the hardship can begin to lift, with help accepted or a way found, or it can go underground as hidden want and quiet withdrawal. Isolation may end or deepen. What changes is whether the need is seen and spoken.',
    },
    'pentacles-six': {
        upright: 'Generosity and need meeting under unequal conditions. The Six of Pentacles asks whether a gift fits the need, who decides the measure, and whether either side can give or receive without being diminished by it.',
        reversed: 'Reversed, the exchange loses its fairness. Help can carry strings, be withheld, or be taken without return, and a debt may go unnamed. The giving can also be mistimed or go unreceived. Check the terms, and what each side expects back.',
    },
    'pentacles-seven': {
        upright: 'A moment of reckoning in the middle of slow work. The Seven of Pentacles is investment not yet repaid, and the honest response is assessment: continue, adjust or stop, judged on the evidence and not on impatience.',
        reversed: 'Reversed, the assessment goes wrong. Impatience can abandon work that was nearly ready, or hope can keep feeding effort that is not paying back. Results may be poorly measured or avoided. Look for evidence rather than mood.',
    },
    'pentacles-eight': {
        upright: 'Mastery earned in small, repeated acts of attention. Here the work itself outranks recognition, and the reward is a skill that deepens whether or not anyone watches. It holds while the effort goes toward something that matters to the person doing it.',
        reversed: 'Reversed, the craft loses direction. Work can turn mechanical, perfectionist or careless, effort goes into what nobody needed, or quality is traded for speed and shortcuts. Purpose and standard are what slip.',
    },
    'pentacles-nine': {
        upright: 'Comfort that was earned and is genuinely enjoyed, along with the independence that came with it. What the security is for decides what it becomes: pleasure and freedom, or a safe distance from needing anyone.',
        reversed: 'Reversed, the ease is less secure. Comfort may be overstated, overspent or lost, or independence hardens into isolation and display. Enjoyment can feel hollow or depend on appearances. Look at what the comfort rests on.',
    },
    'pentacles-ten': {
        upright: 'What is built to outlast the person who built it. Continuity and belonging, wealth understood as something held in common. Some of what is inherited deserves handing on, and some is only weight; telling them apart is the work.',
        reversed: 'Reversed, continuity strains. Inheritance and family or institutional obligation can become a burden or a source of conflict, or the stability may be thinner than it looks. Tradition may be kept past its use, or let go too lightly.',
    },
    'pentacles-page': {
        upright: 'The beginner\'s seriousness about something practical. A student\'s patience and curiosity about how things work is the strength here, and it counts for little until it becomes a first real attempt. More preparation is the usual way of avoiding that.',
        reversed: 'Reversed, learning stalls or goes astray. Plans are made but never started, practice is postponed, attention drifts, or study is dropped at the first difficulty. A lesson can also be misread or arrive at a poor time. A small, definite step helps.',
    },
    'pentacles-knight': {
        upright: 'Progress through persistence rather than speed. The Knight of Pentacles checks every step and finishes what is begun, and that dependability is the whole offer. Slow work reaches its end only for the one who stays with it.',
        reversed: 'Reversed, steadiness goes wrong in either direction. It can harden into stubborn routine, stagnation or fear of risk, or slacken into carelessness, shortcuts and work left half-done. Reliability and pace are what change.',
    },
    'pentacles-queen': {
        upright: 'Care that is practical, generous and well resourced. Means turned into a living, supportive place, where warmth is backed by competence in the material details as much as by feeling. Comfort offered this way can be relied on.',
        reversed: 'Reversed, practical care goes out of balance. It can become self-neglecting overgiving, smothering provision or anxious scarcity, or its opposite: neglect of home, money and the details that keep life steady. Tend the ground you stand on.',
    },
    'pentacles-king': {
        upright: 'Material mastery that has matured into stewardship. The established one has built something lasting and provides from it, so security is shared and judgement exercised steadily, not for show. Where the Queen nurtures, the King secures.',
        reversed: 'Reversed, stewardship can turn to control. Authority may harden into greed, stubbornness or valuing everything by its yield, or the means may be squandered, overextended or lost to poor judgement. What changes is how power over resources is used.',
    },
};
