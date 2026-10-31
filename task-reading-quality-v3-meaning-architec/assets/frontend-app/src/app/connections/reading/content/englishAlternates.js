/**
 * ENGLISH ALTERNATES: THE SAME SENTENCE, SAID ANOTHER WAY, WHEN A READER WOULD OTHERWISE MEET IT AGAIN.
 *
 * A mechanism, a child's portrait line or a stock sentence about what the user noticed is one authored sentence that serves every pair with the same finding. In a household that
 * means the same agreement and the same question on four pair pages, and across households the same sentence for every pair. These alternates are other wordings of the SAME
 * claim, English only (the Slovak texts are untouched and are chosen exactly as before). They are chosen by a stable number made from the household and the position of the page in
 * it (never a clock, never a random source), so a household's pages differ from one another, a reading is the same every time, and the original is one of the choices.
 *
 * RULES THEY KEEP (the content's own, checked by tests/connectionsEnglishAlternates.test.mjs): the same placeholders as the original, the same number of paragraphs, a name only as a
 * placeholder and only as a subject, no possessive name, no singular "they" for a person, no "the profiles".
 */
/**
 * Key: `${domain}|${mechanism key}#${field}`, or `${domain}|${kind}|${mechanism key}#${field}` for a text written for one kind of relationship only.
 * Value: other wordings of the field. For a kind-specific key listed in KIND_REPLACES the wording REPLACES the original (it is not one of several choices).
 */
export const MECHANISM_ALTERNATES = {
    /* ------------------------------------------------------------------ Two wills at one limit */
    'parenting|taking-the-lead/shared:assertive#title': [
        'A “no” that draws a counter',
        'Two firm opinions, one limit',
    ],
    'parenting|taking-the-lead/shared:assertive#passage': [
        'When {both} both know what they want, a limit tends to arrive as an opening bid. The “no” brings a “but”, the “but” brings a “still no”, and the argument can outgrow the thing it began with.\n\nThere is strength in this too. Wishes are plain and little is left to guesswork, and the child may be learning to hold a position under pressure. To a strong will, though, the adult’s firmness can feel like a challenge, and every extra reason offered gives it more to push against. A limit stated once and then left alone gives it nothing to lean on.',
        '{both} both know what they want, so a limit is likely to be heard as a move in a game rather than as a fact about the day. One refusal gets one counter, and the counters can keep coming long after the original request has been forgotten.\n\nThe same directness is useful: nobody has to guess, and decisions can be quick. A child with a strong will may be practising how to stand by a view, and may hear the adult’s firmness as one more thing to answer. The exchange usually feeds on explanations and quiets once the limit has been said and there is nothing further to argue with.',
        'Between two people who both know what they want, a “no” is rarely the end of the matter. It is answered, the answer is answered, and the exchange can carry on well beyond the limit that started it.\n\nStrong wills have a good side. Wants are stated plainly and plans come together fast. A child with this kind of will can be learning how to hold a position, and the adult’s firmness may look to that child like a push that needs pushing back. More reasons from the adult tend to lengthen the exchange; a limit said once, and then left, tends to shorten it.',
    ],
    'parenting|taking-the-lead/shared:assertive#aside': [
        '{both} both know what they want, which keeps plans quick and wishes clear. The same directness can answer a limit with a counter, then answer that, until a small “no” turns into a contest.',
        'Wishes are plain and plans are quick when {both} are equally clear about what is wanted. A limit can then draw a counter, and the counter another, until a small “no” has become a contest.',
    ],
    'parenting|taking-the-lead/shared:assertive#step': [
        'Settle the few limits that are truly firm at a calm time, and treat everything else as open to the child’s choice.',
        'Write the firm limits as a short list, agreed when nobody is arguing, so that all the rest can be offered as real choices.',
        'Pick the handful of limits that cannot move and say them plainly in a calm moment; leave the rest to be chosen, not contested.',
    ],
    'parenting|taking-the-lead/shared:assertive#question': [
        'Which of the adult’s limits could not move whatever the child said, and what is the child free to decide?',
        'What does the child get to decide for real, and which limit would the adult hold even on a hard day?',
        'If the list of firm limits were half as long, what would the child be free to choose, and what would the adult still hold?',
    ],
    /* ------------------------------------------------------------------ Going first, leaving room */
    'parenting|taking-the-lead/opposed:receptive#title': [
        'A limit tested again and again',
        'Peace kept, limits moved',
    ],
    'parenting|taking-the-lead/opposed:receptive#passage': [
        '{second} is the one who tends to start things and make the proposals; {first} would rather listen, keep things peaceful and let others decide. The two come together wherever a limit has to be set, and a limit that gives way when pushed can slip a little more with each try. A child who tests it may be mapping where it stands as much as hoping to shift it.\n\nA gentle style does not weaken a limit, provided the limit stays where it is. The pressure on it comes from the adult’s wish for peace: each small yield brings a quiet moment and teaches that pushing may pay, so the child’s energy goes into finding the edge, and the edge keeps moving.',
        'Where {second} tends to go first and propose the plan, {first} leans toward listening and keeping the peace, leaving room for others to choose. A limit is where the two meet. If it gives way under a push, it can move a little every time it is tested, and the child doing the testing may be finding out where it is rather than trying to shift it.\n\nBeing quiet by nature is no handicap while the limits hold. What can loosen the limits is the pull toward peace: every small yield buys calm for the moment and suggests that pushing works. The child’s drive then goes into locating the edge, and the edge keeps moving.',
        '{second} usually makes the first move and puts forward the plan. {first} is more inclined to listen, to keep the peace and to let others decide. The two meet at the limit. One that yields to pressure tends to slide further each time, and a child pressing on it may be checking where it is as much as trying to move it.\n\nA quiet manner does not get in the way as long as the limits stay put. The thing that moves the limits is a leaning toward peace: each small yield buys a calm moment and shows that pushing can work, so the drive goes into finding the edge, and the edge keeps moving.',
    ],
    'parenting|taking-the-lead/opposed:receptive#aside': [
        'When {second} likes to lead and {first} would rather keep the peace, a limit can be tested every time it is set. The child pressing on it may be looking for its position as much as trying to move it.',
        '{second} likes to lead and {first} would rather keep the peace, so a limit may be tested each time it is set. Pressing on it can be a way of finding where it stands.',
    ],
    'parenting|taking-the-lead/opposed:receptive#step': [
        'Pick the two or three limits that matter most, say each once and calmly beforehand, and leave a real choice inside them.',
        'Keep the firm limits to a few, announce them in advance without heat, and let the child decide freely within them.',
        'Decide which two or three limits cannot move, state them once when nothing is at stake, and offer real choices everywhere else.',
    ],
    'parenting|taking-the-lead/opposed:receptive#question': [
        'Which limit would be easiest to keep steady, and what could the child decide for real inside it?',
        'Where could the adult hold a limit without strain, and which choice inside it could belong entirely to the child?',
        'Of the limits now in place, which would hold most easily, and what choice around it could be the child’s own?',
    ],
    /* ------------------------------------------------------------------ Two who both want to choose (brothers and sisters) */
    'parenting|taking-the-lead/siblings:shared:assertive#step': [
        'Give small choices a fair rule that neither child has to give in to, such as turns, a coin toss or a rota.',
    ],
    'parenting|taking-the-lead/siblings:shared:assertive#question': [
        'In a standoff, what does each child most want to keep, and how could the other come to know it?',
    ],
    /* ------------------------------------------------------------------ a grandparent and a grandchild: a different scene from the parent's "everyone will be there" */
    'family|grandparent-grandchild|social-energy/opposed:social#title': ['The standing visit'],
    'family|grandparent-grandchild|social-energy/opposed:social#passage': [
        '{first} may keep the tie going through a standing arrangement: the same visit every week, the same chair at the same table. {second} may keep it going another way, with a call, a walk or an afternoon, and may need the days in between to be quiet.\n\nEach way can be read as the wrong measure of the other. A missed week can look like a step back from the tie, and a standing visit can feel like a duty that leaves little to say. Closeness can then be judged by whether the visit happened rather than by what passed between the two. The more useful question may be whether the two have a rhythm that {second} can sustain and {first} can count on.',
    ],
    'family|grandparent-grandchild|social-energy/opposed:social#aside': [
        '{first} may keep the tie going through a standing visit, and {second} through a call, a walk or an afternoon. Closeness can then be judged by whether the visit happened rather than by what passed between the two.',
    ],
    'family|grandparent-grandchild|social-energy/opposed:social#step': [
        'Agree on a rhythm of contact that suits you both, such as a short call on a set day and a longer visit now and then, and say what counts as keeping the tie warm.',
    ],
    'family|grandparent-grandchild|social-energy/opposed:social#question': [
        'Which kind of contact feels like closeness to each of you, and which feels like duty?',
    ],
};
/** The kind-specific keys whose wording replaces the original instead of joining it as a choice. */
export const KIND_REPLACES = new Set([
    'family|grandparent-grandchild|social-energy/opposed:social#title',
    'family|grandparent-grandchild|social-energy/opposed:social#passage',
    'family|grandparent-grandchild|social-energy/opposed:social#aside',
    'family|grandparent-grandchild|social-energy/opposed:social#step',
    'family|grandparent-grandchild|social-energy/opposed:social#question',
]);
/**
 * What a child "shows", said another way (the clause that follows the child's name in the portrait). Key: the original clause. Two other wordings each; the original is the third choice.
 * No clause here uses a pronoun for the child.
 */
export const PORTRAIT_ALTERNATES = {
    'can insist on doing things without help, and may push away a hand that arrives too soon': [
        'often wants to do things alone, and may turn down a helping hand that comes too early',
        'tends to want to manage without help, and a hand offered too soon may be waved away',
    ],
    'is apt to rush at a challenge, testing and trying before stopping to check': [
        'tends to dive into a challenge first and check afterwards',
        'may be quick to try a challenge, learning by testing before looking',
    ],
    'can feel things at full volume, with joy and frustration both arriving fast and loud': [
        'feels strongly, and joy and frustration can both arrive quickly and loudly',
        'tends to feel things in full colour, with delight and frustration both showing at once',
    ],
    'usually comes alive among people, and may go looking for bustle after too many quiet days': [
        'tends to light up around other people, and may seek out company after too many quiet days',
        'is usually livelier in company, and may go looking for activity after a run of quiet days',
    ],
    'probably knows what is wanted, says no clearly, and tests where a limit really lies': [
        'most likely knows what is wanted, says no plainly, and finds out where a limit really stands',
        'probably has a clear idea of what is wanted, refuses plainly, and tests how firm a limit is',
    ],
    'is likely to learn most easily through hands-on activities, and to lose interest in long explanations': [
        'probably learns best by doing, and may lose interest in a long explanation',
        'is likely to take things in through hands-on activity more readily than through long explanations',
    ],
};
/**
 * The stock sentences about what the user noticed, said another way. Key: the original English sentence. The original is one of the choices.
 * No sentence uses "profiles" and none uses a pronoun for a person.
 */
export const OBSERVED_ALTERNATES = {
    'What you describe sits close to the pattern above, which is about {phrase}.': [
        'What you describe is close to the pattern above, the one about {phrase}.',
    ],
    'What you describe may connect to the pattern above. Only you know the daily detail.': [
        'What you describe could tie in with the pattern above, though only you know the daily detail.',
    ],
    'The pattern above, about {phrase}, may be part of what you are seeing.': [
        'Some of what you are seeing could come from the pattern above, the one about {phrase}.',
        'The pattern above, about {phrase}, may help explain what you notice.',
    ],
    'That is a wish, and a wish needs no chart to be fair. It is reason enough to bring it up.': [
        'That is a wish, and a wish needs no chart to be fair. It deserves to be said aloud.',
        'That is a wish, and it is fair without any chart behind it. Saying it is reasonable in itself.',
    ],
    'Wanting this is reason enough to say so. How it is received is not something a reading can promise.': [
        'The wish is fair as it stands, and worth saying out loud. How it is received is not something a reading can promise.',
    ],
};
