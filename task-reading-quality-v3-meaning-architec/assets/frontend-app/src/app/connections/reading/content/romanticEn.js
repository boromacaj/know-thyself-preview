/** The relation of the finding a mechanism key tells: `shared:x` and `shared-pull/shared:x` are likenesses, `oneSided:x` a lean on one side, everything else (`opposed`, `a|b`, `different`) a difference. */
export function relationClassOf(mechanismKey) {
    const configuration = mechanismKey.split('/')[1] ?? '';
    if (configuration.startsWith('shared'))
        return 'shared';
    if (configuration.startsWith('oneSided'))
        return 'oneSided';
    return 'opposed';
}
export function leadFrameKindOf(relation, arc) {
    if (relation === 'oneSided')
        return 'oneSided';
    if (relation === 'shared')
        return arc === 'tension' ? 'sharedTension' : 'shared';
    return arc === 'tension' ? 'opposedTension' : arc === 'complement' ? 'opposedComplement' : 'opposedOpen';
}
/**
 * THE LEAD: one sentence that says what the reading is about, built from the plan. `{both}` is the pair, `{clause}` the finding itself (`LEAD_CLAUSE`: a clause that says who does what, so a
 * likeness reads as "both ..." and a difference as "one ... and the other ..."). The relation picks the family; the tier says how sharply the evidence draws it. No frame puts a name after a
 * preposition, and "snag" is said only of a difference.
 */
export const LEAD_FRAME = {
    shared: {
        strong: 'What {both} have most in common is this: {clause}.',
        moderate: 'What {both} are fairly alike in is this: {clause}.',
        tentative: 'If {both} are alike in one thing, it is probably this: {clause}.',
    },
    sharedTension: {
        strong: 'Where {both} are alike is also where friction is likeliest: {clause}.',
        moderate: 'Where {both} are alike may also bring some friction: {clause}.',
        tentative: 'If a likeness brings {both} some friction, it is probably this: {clause}.',
    },
    opposedTension: {
        strong: 'The place {both} are most likely to snag is where {clause}.',
        moderate: 'A snag {both} are likely to meet gathers where {clause}.',
        tentative: 'If {both} snag anywhere, it is probably where {clause}.',
    },
    opposedComplement: {
        strong: 'Where {both} differ is also a possible strength: {clause}.',
        moderate: 'Where {both} differ may help as much as it hurts: {clause}.',
        tentative: 'If {both} differ in a useful way, it is probably this: {clause}.',
    },
    opposedOpen: {
        strong: 'Where {both} differ could go either way: {clause}.',
        moderate: 'Where {both} differ, it could go either way: {clause}.',
        tentative: 'If {both} differ in a way that matters, it is probably this: {clause}.',
    },
    oneSided: {
        strong: 'The clearest pattern {both} show is an uneven lean: {clause}.',
        moderate: 'The pattern {both} show is a slightly uneven lean: {clause}.',
        tentative: 'If {both} lean unevenly anywhere, it is probably this: {clause}.',
    },
};
/**
 * WHAT EACH FINDING IS, in one clause, for the lead and for the second thread. One entry per romantic mechanism key (a test holds the two lists equal), written from the mechanism's own
 * configuration: a likeness begins "both", a difference "one ... and the other ...", a lean on one side says that the other has no strong pull. No name, no pronoun for a person.
 */
export const LEAD_CLAUSE = {
    'processing-pace/opposed': 'one settles a feeling in quiet first, and the other finds out what is felt by saying it',
    'processing-pace/shared:introspective': 'both settle a feeling inwardly before speaking',
    'processing-pace/shared:outwardly-engaged': 'both find out what is felt by saying it aloud',
    'processing-pace/oneSided:introspective': 'one settles a feeling in quiet first, and the other has no strong pull either way',
    'processing-pace/oneSided:outwardly-engaged': 'one says what is felt as it forms, and the other has no strong pull either way',
    'reasoning-style/opposed': 'one wants reasons for a feeling, and the other trusts a hunch first',
    'reasoning-style/shared:analytical': 'both meet a feeling with explanation and a plan',
    'reasoning-style/shared:intuitive': 'both read each other by feel, from small signals',
    'reasoning-style/oneSided:analytical': 'one wants the reasons before trusting a feeling, and the other has no strong pull either way',
    'reasoning-style/oneSided:intuitive': 'one reads a situation by its feel, and the other has no strong pull either way',
    'closeness-and-room/opposed': 'one leans toward togetherness, and the other needs stretches alone',
    'closeness-and-room/shared:independent': 'both give each other plenty of room',
    'closeness-and-room/shared:collaborative': 'both are most at home when plans, evenings and problems are shared',
    'closeness-and-room/oneSided:independent': 'one needs stretches alone, and the other has no strong pull either way',
    'closeness-and-room/oneSided:collaborative': 'one looks for a lot of shared time, and the other has no strong pull either way',
    'structure-and-flexibility/opposed': 'one likes daily life arranged ahead, and the other would rather see how it feels when it comes',
    'structure-and-flexibility/shared:structured': 'both like daily life arranged ahead',
    'structure-and-flexibility/shared:adaptable': 'both move easily with the day',
    'structure-and-flexibility/oneSided:structured': 'one keeps the plan, and the other has no strong pull either way',
    'structure-and-flexibility/oneSided:adaptable': 'one follows the day, and the other has no strong pull either way',
    'risk-and-caution/opposed': 'one sees what a step could open, and the other what it could cost',
    'risk-and-caution/shared:cautious': 'both lean toward caution before a big step',
    'risk-and-caution/shared:risk-oriented': 'both lean toward the bold step',
    'risk-and-caution/oneSided:cautious': 'one keeps a hand on the brake, and the other has no strong pull either way',
    'risk-and-caution/oneSided:risk-oriented': 'one is drawn to a bold step early, and the other has no strong pull either way',
    'emotional-expression/shared:emotionally-expressive': 'both say a feeling aloud while it is fresh',
    'emotional-expression/shared:emotionally-contained': 'both show care through deeds more than words',
    'emotional-expression/opposed': 'one says a feeling aloud while it is fresh, and the other shows it in deeds',
    'emotional-expression/oneSided:emotionally-expressive': 'one puts feeling into words early, and the other has no strong pull either way',
    'emotional-expression/oneSided:emotionally-contained': 'one keeps feeling close and shows it in deeds, and the other has no strong pull either way',
    'social-energy/shared:private': 'both do best with few people',
    'social-energy/shared:social': 'both are energised by company',
    'social-energy/opposed': 'one is restored by company, and the other by quiet',
    'social-energy/oneSided:private': 'one does best with few people, and the other has no strong pull either way',
    'social-energy/oneSided:social': 'one connects the pair to a wider circle, and the other has no strong pull either way',
    'change-and-steadiness/shared:stability-seeking': 'both are at home in the familiar',
    'change-and-steadiness/shared:novelty-seeking': 'both keep the relationship moving with new places and plans',
    'change-and-steadiness/opposed': 'one finds love in what is known, and the other in what is new',
    'change-and-steadiness/oneSided:stability-seeking': 'one holds to the familiar, and the other has no strong pull either way',
    'change-and-steadiness/oneSided:novelty-seeking': 'one brings in the new, and the other has no strong pull either way',
    'taking-the-lead/shared:assertive': 'both make the first move',
    'taking-the-lead/shared:receptive': 'both lean toward listening before leading',
    'taking-the-lead/opposed': 'one tends to open, and the other to answer',
    'taking-the-lead/oneSided:assertive': 'one tends to make the first move, and the other has no strong pull either way',
    'taking-the-lead/oneSided:receptive': 'one tends to respond rather than open, and the other has no strong pull either way',
    'practical-and-conceptual/shared:practical': 'both show love by handling the concrete',
    'practical-and-conceptual/shared:conceptual': 'both think in patterns and possibilities',
    'practical-and-conceptual/opposed': 'one asks how, and the other asks what if',
    'practical-and-conceptual/oneSided:practical': 'one keeps talk grounded, and the other can move between the concrete and the abstract',
    'practical-and-conceptual/oneSided:conceptual': 'one brings the big questions, and the other has no strong pull either way',
    'shared-pull/shared:mastery': 'both are led by mastery of a craft',
    'shared-pull/shared:achievement': 'both are led by achievement',
    'shared-pull/shared:recognition': 'both are led by a need to be seen and appreciated',
    'shared-pull/shared:meaning': 'both are led by a search for the point of it all',
    'shared-pull/shared:belonging': 'both are led by belonging',
    'shared-pull/shared:freedom': 'both are led by freedom',
    'shared-pull/shared:care': 'both are led by looking after others',
    'shared-pull/shared:understanding': 'both are led by wanting to understand each other',
    'shared-pull/shared:self-expression': 'both are led by self-expression',
    'shared-pull/shared:beauty': 'both are led by beauty and small rituals',
    'pulls-apart/freedom|belonging': 'one is led by freedom, and the other by belonging, so one invitation can mean two things',
    'pulls-apart/achievement|care': 'one is led by achievement, and the other by care, so one free hour has two claims on it',
    'pulls-apart/recognition|understanding': 'one wants good news applauded, and the other wants it understood',
    'different-pulls/different': 'each is led by something different',
};
/**
 * WHAT THE EVIDENCE BEHIND THE CENTRE ADDS, in the traditions that actually speak to THIS finding (`{pillars}`, from the two charts' own stances) and what that comes to. Four cases:
 *   `twoKinds`        the traditions that back the finding in BOTH charts include the sky-based and the calendar-based: two independent kinds of evidence agree.
 *   `twoKindsApart`   each chart has both kinds, but not through the same traditions: the finding is firm; the sentence says so and does not claim the same ones in both.
 *   `oneKind`         the traditions that back it in both charts all read one kind of input (`{kind}`): several traditions, one kind of evidence.
 *   `oneKindApart`    the same, where the traditions differ between the charts.
 *   `oneKindMixed`    the traditions differ between the charts and, in at least one chart, they all read one kind of input.
 * Where fewer than two traditions speak, nothing is said (the lead is then tentative, or the sentence would add nothing).
 */
export const LEAD_FIRMNESS = {
    twoKinds: '{pillars} point this way in both charts, from the sky at birth and the calendar date: two independent kinds of evidence.',
    twoKindsApart: '{pillars} between them point this way, from the sky at birth and the calendar date, though not the same ones in both charts: two independent kinds of evidence.',
    oneKind: '{pillars} point this way in both charts, but all read {kind}: one kind of evidence, not two.',
    oneKindApart: '{pillars} between them point this way, though not the same ones in both charts, and all read {kind}: one kind of evidence, not two.',
    oneKindMixed: '{pillars} between them point this way, though not the same ones in both charts, and at least one chart rests on a single kind of input: one kind of evidence, not two.',
};
/** The kind of input a family of traditions reads. */
export const FAMILY_INPUT = { sky: 'the sky at birth', calendar: 'the calendar date' };
/** The traditions' names in a lead, in the order the reading lists them. */
export const PILLAR_NAMES = { numerology: 'Numerology', astrology: 'Astrology', bazi: 'BaZi', 'human-design': 'Human Design' };
export const PILLAR_ORDER = ['numerology', 'astrology', 'bazi', 'human-design'];
/**
 * The note that closes the first paragraph of the story when the centre is supported by several traditions of one kind (not two), so the passage does not state more than the lead
 * does. A firm centre has none; a thin one has the lean or hedged note already.
 */
export const SUPPORTED_NOTE = 'Read this as a likely pattern, not a settled one.';
export const LEAD_SECOND = {
    watch: {
        strong: 'Beside it, there is something to watch: {clause}.',
        moderate: 'A quieter thread to watch: {clause}.',
        thin: 'A thinner thread to watch, told here as a possibility: {clause}.',
    },
    bothWays: {
        strong: 'Beside it is common ground that helps and has its own cost: {clause}.',
        moderate: 'A quieter piece of common ground, which helps and has its own cost: {clause}.',
        thin: 'A thinner piece of common ground, told here as a possibility, which helps and has its own cost: {clause}.',
    },
    help: {
        strong: 'Beside it is a difference that may help carry the pair: {clause}.',
        moderate: 'A quieter difference that may help: {clause}.',
        thin: 'A thinner difference that may help, told here as a possibility: {clause}.',
    },
    other: {
        strong: 'Close behind it is {noun}: {clause}.',
        moderate: 'A quieter thread alongside it is {noun}: {clause}.',
        thin: 'A thinner thread alongside it, told here as a possibility, is {noun}: {clause}.',
    },
};
export const SECOND_NOUN = { shared: 'a likeness', opposed: 'a difference', oneSided: 'an uneven lean' };
/** Which frame tells a second thread: by the plan's kind for it and by what the thread is. */
export function secondNatureOf(kind, relation) {
    if (kind === 'watch')
        return 'watch';
    if (kind === 'carry')
        return relation === 'shared' ? 'bothWays' : relation === 'opposed' ? 'help' : 'other';
    return 'other';
}
/**
 * The hedge on an aside that rests on thin evidence, by why it is thin. The aside paragraph itself is the mechanism's; this says how far to trust it, and where it is one person's
 * pull that is loose it says whose. `{name}` is the nominative subject (one name, or the two together).
 */
export const ASIDE_HEDGE = {
    'single-source': {
        one: 'Only one tradition speaks to this, so hold it as a possibility.',
        many: 'Only one tradition speaks to this, so hold it as a possibility.',
        nobody: 'Only one tradition speaks to this, so hold it as a possibility.',
    },
    slight: {
        one: '{name} leans only slightly here, so this is a hint more than a finding.',
        many: '{name} lean only slightly here, so this is a hint more than a finding.',
        nobody: 'The lean here is only slight, so this is a hint more than a finding.',
    },
    mixed: {
        one: '{name} pulls both ways on this, so it is a tendency at most.',
        many: '{name} pull both ways on this, so it is a tendency at most.',
        nobody: 'Someone here pulls both ways on this, so it is a tendency at most.',
    },
};
/**
 * A SCENE IS AN ILLUSTRATION, AND AN ILLUSTRATION IS MARKED AS ONE.
 *
 * A few mechanisms open a sentence with "Say ..." and picture an evening. "Say" is what tells the reader the moment is an example of how a dynamic can go and not a report of what happened,
 * so it stays wherever the evidence is not strong. Where the evidence behind the story is strong and more than one tradition stands behind it, the claim stands without the picture and
 * is said as a pattern ("When one reaches for the conversation and the other steps back ..."): the evidence carries it, and no invented moment is needed. A pair whose `from` has no
 * "Say" (an invented detail that is not marked as a hypothesis, such as "a suggestion for dinner") is replaced whatever the evidence, because nothing marks it as an example.
 * Key: the mechanism key; each pair is a sentence (or opening) of the passage and what replaces it. A pair whose text is not found in the passage is ignored, so editing a mechanism
 * cannot break the reading (a test asserts that every `from` still exists).
 */
export const SOFT_SCENES = {
    'processing-pace/opposed': [
        ['Say {p1} reaches for the conversation and {p0} steps back to settle: the step back can sound like refusal, and {p1} reaches harder, which leaves less room to settle.',
            'When {p1} reaches for the conversation and {p0} steps back to settle, the step back can sound like refusal, and reaching harder leaves less room to settle.'],
    ],
    'reasoning-style/opposed': [
        ['Say {p1} mentions a feeling about a plan, {p0} asks for the reasons, the reasons have not formed, and the feeling is set aside as unfounded.',
            'When {p1} mentions a feeling about a plan and {p0} asks for the reasons, the reasons may not have formed yet, and the feeling can be set aside as unfounded.'],
    ],
    'reasoning-style/shared:analytical': [
        ['Say one describes a bad day and the other answers with a plan: the plan may be sound and still arrive before the day has been heard.',
            'When one describes a bad day and the other answers with a plan, the plan may be sound and still arrive before the day has been heard.'],
    ],
    'structure-and-flexibility/opposed': [
        ['Say it is Wednesday: {p0} may already be planning the weekend, while {p1} would rather see how Saturday feels.',
            '{p0} may want the weekend planned well ahead, while {p1} would rather see how it feels when it comes.'],
    ],
    'structure-and-flexibility/oneSided:adaptable': [
        ['Say {mid} asks whether anything has been planned: the relaxed answer can carry the news that the planning has been left to the one who asked.',
            'If {mid} asks whether anything has been planned, a relaxed answer can carry the news that the planning has been left to the one who asked.'],
    ],
    'practical-and-conceptual/opposed': [
        ['Say {p1} says “imagine living by the sea,” and {p0} asks about the commute.',
            'A “what if” from {p1} can be met by {p0} with a question about the practicalities.'],
    ],
    'shared-pull/shared:recognition': [
        ['Say one comes home with good news while the other is still carrying a day nobody noticed, and the applause can arrive a beat late or thin, given from an empty cup.',
            'When one has good news while the other is still carrying a day nobody noticed, the applause can arrive a beat late or thin.'],
    ],
    'pulls-apart/freedom|belonging': [
        ['The difference can show in something as small as an invitation. Say one arrives for both: {p1} may hear',
            'The difference can show in how an invitation is heard. {p1} may hear'],
    ],
    'pulls-apart/recognition|understanding': [
        ['Say {p1} has just worked out how something works and wants to walk through it.',
            '{p1} may have just worked out how something works and want to walk through it.'],
    ],
    'change-and-steadiness/opposed': [
        ['{p1} can float a change as lightly as a suggestion for dinner, a way of thinking aloud.',
            '{p1} can float a change lightly, as a way of thinking aloud.'],
    ],
};
