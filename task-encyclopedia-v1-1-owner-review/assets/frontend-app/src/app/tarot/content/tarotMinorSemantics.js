/**
 * THE FIFTY-SIX MINOR ARCANA, AS SEMANTICS.
 *
 * Each is authored from its own picture. Suit and rank inform a card; they never
 * generate one. There is no template that turns "Cups" plus "Five" into the Five
 * of Cups, because the deck does not work that way: the Seven of Cups and the
 * Seven of Pentacles have almost nothing in common beyond the number, and a
 * system that derived them from a shared "seven" would say so and be wrong.
 *
 * WHAT WAS DROPPED FROM THE SOURCE, EVERYWHERE. Waite's Minor entries identify
 * people constantly - "Dark young man, faithful, a lover, an envoy, a postman"
 * for the Page of Wands, "Widowhood, female sadness" for the Queen of Swords,
 * "a fair woman" for the Queen of Wands. None of it survives here. A daily draw
 * has no querent and no question, so a card cannot be a person in it, and the
 * Courts are modelled as stances rather than as men and women. His occasional
 * event claims - "sickness is also intimated", "Death, failure, miscarriage" -
 * are dropped for the same reason the Majors' are.
 *
 * Where his own list is self-contradictory he says so, and those cards are
 * marked: the Seven of Pentacles meanings are "exceedingly contradictory", the
 * Five of Pentacles alternatives "cannot be harmonized", the Seven of Swords
 * significations "widely at variance".
 */
/* ------------------------------------------------------------------ wands */
/* Enterprise, contest, initiative, holding a position. Waite: "a suit of life
   and animation", its wands "always in leaf". */
const WANDS = [
    {
        id: 'wands-ace',
        direction: 'beginning', agency: 'initiate', movement: 'expanding',
        temporal: 'initiating', stability: 'volatile', focus: 'external',
        relational: 'solitary', intensity: 'strong',
        themes: ['first-impulse', 'raw-start', 'unshaped'],
        provenance: {
            imagery: 'A hand from a cloud grasping a stout wand in leaf.',
            waiteDivinatory: 'Creation, invention, enterprise; principle, beginning, source.',
            basis: 'divinatory-supported',
        },
    },
    {
        id: 'wands-two',
        direction: 'development', agency: 'observe', movement: 'suspended',
        temporal: 'transitional', stability: 'stable', focus: 'mixed',
        relational: 'solitary', intensity: 'low',
        themes: ['survey', 'reach-considered', 'held-position'],
        provenance: {
            imagery: 'A figure on a battlement holding a globe, one wand fixed to the wall and one in hand, looking out.',
            waiteDivinatory: 'Between the alternatives; riches, magnificence; also sadness amid plenty.',
            basis: 'imagery-led',
        },
    },
    {
        id: 'wands-three',
        direction: 'development', agency: 'wait', movement: 'expanding',
        temporal: 'sustained', stability: 'stable', focus: 'external',
        relational: 'cooperating', intensity: 'moderate',
        themes: ['ventures-out', 'waiting-on-return', 'wider-reach'],
        provenance: {
            imagery: 'A stately figure with his back turned, watching ships pass from a cliff\'s edge, three staves planted.',
            waiteDivinatory: 'Established strength, enterprise, effort, trade, commerce, discovery.',
            basis: 'divinatory-supported',
        },
    },
    {
        id: 'wands-four',
        direction: 'culmination', agency: 'tend', movement: 'stabilising',
        temporal: 'sustained', stability: 'stable', focus: 'external',
        relational: 'cooperating', intensity: 'low',
        themes: ['threshold-crossed', 'shelter', 'welcome'],
        provenance: {
            imagery: 'A garlanded canopy on four staves, figures raising flowers before a house.',
            waiteDivinatory: 'Country life, haven of refuge, repose, concord, harmony, prosperity.',
            basis: 'divinatory-supported',
        },
    },
    {
        id: 'wands-five',
        direction: 'development', agency: 'act', movement: 'disrupting',
        temporal: 'sustained', stability: 'volatile', focus: 'external',
        relational: 'competing', intensity: 'moderate',
        themes: ['friction', 'jostling', 'not-yet-serious'],
        provenance: {
            imagery: 'Youths brandishing staves; Waite calls it "mimic warfare", sport rather than battle.',
            waiteDivinatory: 'Imitation, sham fight; strenuous competition and struggle.',
            basis: 'imagery-led',
        },
    },
    {
        id: 'wands-six',
        direction: 'culmination', agency: 'act', movement: 'expanding',
        temporal: 'sustained', stability: 'stable', focus: 'external',
        relational: 'cooperating', intensity: 'moderate',
        themes: ['recognition', 'carried-forward', 'seen-by-others'],
        provenance: {
            imagery: 'A rider crowned with laurel among footmen, a laurel wreath on his staff.',
            waiteDivinatory: 'Victory, great news, expectation crowned with its own desire.',
            basis: 'divinatory-supported',
        },
    },
    {
        id: 'wands-seven',
        direction: 'development', agency: 'endure', movement: 'stabilising',
        temporal: 'sustained', stability: 'volatile', focus: 'external',
        relational: 'competing', intensity: 'moderate',
        themes: ['holding-ground', 'outnumbered', 'vantage'],
        provenance: {
            imagery: 'A figure on a craggy height with six staves raised towards him from below; he has the vantage.',
            waiteDivinatory: 'Valour; discussion, wordy strife; negotiations, competition; success.',
            basis: 'divinatory-supported',
        },
    },
    {
        id: 'wands-eight',
        direction: 'transition', agency: 'respond', movement: 'expanding',
        temporal: 'transitional', stability: 'volatile', focus: 'external',
        relational: 'solitary', intensity: 'moderate',
        themes: ['in-flight', 'quickening', 'about-to-land'],
        provenance: {
            imagery: 'Eight staves in flight through open country, near the end of their course.',
            waiteDivinatory: 'Activity in undertakings, the path of such activity, swiftness; that which is on the move.',
            basis: 'divinatory-supported',
        },
    },
    {
        id: 'wands-nine',
        direction: 'stasis', agency: 'endure', movement: 'stabilising',
        temporal: 'sustained', stability: 'stable', focus: 'external',
        relational: 'protecting', intensity: 'moderate',
        themes: ['guarded', 'worn-but-standing', 'braced'],
        provenance: {
            imagery: 'A bandaged figure leaning on a staff with an expectant look, eight staves behind him like a palisade.',
            waiteDivinatory: 'Strength in opposition; delay, suspension, adjournment.',
            basis: 'divinatory-supported',
        },
    },
    {
        id: 'wands-ten',
        direction: 'culmination', agency: 'endure', movement: 'contracting',
        temporal: 'ending', stability: 'stable', focus: 'external',
        relational: 'solitary', intensity: 'strong',
        themes: ['overload', 'carrying-too-much', 'nearly-there'],
        provenance: {
            imagery: 'A man bowed under the weight of ten staves, carrying them towards a house in the distance.',
            waiteDivinatory: 'Oppression; also fortune, gain, but the card is one of a load to be borne.',
            basis: 'imagery-led',
        },
    },
    {
        id: 'wands-page',
        direction: 'beginning', agency: 'observe', movement: 'expanding',
        temporal: 'initiating', stability: 'volatile', focus: 'external',
        relational: 'negotiating', intensity: 'low',
        themes: ['first-word', 'untried-enthusiasm', 'something-announced'],
        provenance: {
            imagery: 'A young figure in the act of proclamation, staff in hand; "unknown but faithful, and his tidings are strange".',
            waiteDivinatory: 'Dark young man, faithful, a lover, an envoy, a postman; family intelligence.',
            basis: 'divergent-from-divinatory',
            divergence: 'The person identification is dropped entirely: a context-neutral draw cannot name a lover or a messenger. Modelled as the stance - something newly announced and not yet tested.',
        },
    },
    {
        id: 'wands-knight',
        direction: 'development', agency: 'act', movement: 'disrupting',
        temporal: 'transitional', stability: 'volatile', focus: 'external',
        relational: 'competing', intensity: 'strong',
        themes: ['rush', 'heat', 'departure'],
        provenance: {
            imagery: 'An armoured rider on a rearing horse, moving as if in haste, wand held up.',
            waiteDivinatory: 'Departure, absence, flight, emigration; alienation.',
            basis: 'imagery-led',
            divergence: 'Read as the mode - speed and heat carried into a thing - rather than as a literal journey.',
        },
    },
    {
        id: 'wands-queen',
        direction: 'development', agency: 'tend', movement: 'expanding',
        temporal: 'sustained', stability: 'stable', focus: 'external',
        relational: 'joining', intensity: 'moderate',
        themes: ['warmth-that-draws', 'confidence', 'attention-given'],
        provenance: {
            imagery: 'A seated figure with a sunflower and a wand in leaf; Waite notes the suit is one "of life and animation" and this figure "more magnetic".',
            waiteDivinatory: 'A dark woman, countrywoman, friendly, chaste, loving, honourable.',
            basis: 'divergent-from-divinatory',
            divergence: 'Modelled as a stance - warmth that draws others in - not as a woman. The gendered description is dropped.',
        },
    },
    {
        id: 'wands-king',
        direction: 'development', agency: 'act', movement: 'stabilising',
        temporal: 'sustained', stability: 'stable', focus: 'external',
        relational: 'protecting', intensity: 'strong',
        themes: ['command', 'vision-held', 'backing-others'],
        provenance: {
            imagery: 'A crowned figure on a throne with lions and salamanders, wand in hand.',
            waiteDivinatory: 'Dark man, friendly, countryman, honest and conscientious.',
            basis: 'divergent-from-divinatory',
            divergence: 'Modelled as the mode of carrying the suit - holding a direction and backing it - rather than as a man.',
        },
    },
];
/* ------------------------------------------------------------------- cups */
/* Feeling, attachment, imagination, relation. */
const CUPS = [
    {
        id: 'cups-ace',
        direction: 'beginning', agency: 'respond', movement: 'expanding',
        temporal: 'initiating', stability: 'stable', focus: 'internal',
        relational: 'joining', intensity: 'moderate',
        themes: ['offered', 'opening', 'filled'],
        provenance: {
            imagery: 'A hand from a cloud holding a cup with four streams pouring from it; a dove descends to it.',
            waiteDivinatory: 'House of the true heart, joy, content, nourishment, abundance, fertility.',
            basis: 'divinatory-supported',
        },
    },
    {
        id: 'cups-two',
        direction: 'beginning', agency: 'choose', movement: 'expanding',
        temporal: 'initiating', stability: 'stable', focus: 'mixed',
        relational: 'joining', intensity: 'moderate',
        themes: ['meeting', 'mutual', 'an-understanding'],
        provenance: {
            imagery: 'Two figures pledging cups to one another beneath a caduceus and a lion\'s head.',
            waiteDivinatory: 'Love, passion, friendship, affinity, union, concord.',
            basis: 'divinatory-supported',
            divergence: 'Read as mutual recognition of any kind, not romance specifically: the daily draw has no relationship question in it.',
        },
    },
    {
        id: 'cups-three',
        direction: 'culmination', agency: 'tend', movement: 'expanding',
        temporal: 'sustained', stability: 'stable', focus: 'external',
        relational: 'cooperating', intensity: 'moderate',
        themes: ['shared-gladness', 'company', 'marking-it'],
        provenance: {
            imagery: 'Three figures in a garden with cups uplifted, "as if pledging one another".',
            waiteDivinatory: 'The conclusion of any matter in plenty, perfection and merriment; happy issue, solace, healing.',
            basis: 'divinatory-supported',
        },
    },
    {
        id: 'cups-four',
        direction: 'stasis', agency: 'observe', movement: 'contracting',
        temporal: 'sustained', stability: 'stable', focus: 'internal',
        relational: 'separating', intensity: 'low',
        themes: ['withdrawn', 'unmoved', 'offer-not-seen'],
        provenance: {
            imagery: 'A figure seated under a tree with arms folded, three cups before him and a fourth offered from a cloud, unregarded.',
            waiteDivinatory: 'Weariness, disgust, aversion, imaginary vexations; contemplation.',
            basis: 'imagery-led',
        },
    },
    {
        id: 'cups-five',
        direction: 'stasis', agency: 'endure', movement: 'contracting',
        temporal: 'sustained', stability: 'stable', focus: 'internal',
        relational: 'separating', intensity: 'moderate',
        themes: ['grief', 'turned-away', 'what-remains-unseen'],
        provenance: {
            imagery: 'A cloaked figure looking down at three spilled cups; two still stand upright behind him, unnoticed.',
            waiteDivinatory: 'A card of loss, but something remains over; three have been taken, but two are left.',
            basis: 'divinatory-supported',
            divergence: 'Waite notes his own alternatives "cannot be harmonized" - the marriage reading is dropped and the imagery kept.',
        },
    },
    {
        id: 'cups-six',
        direction: 'stasis', agency: 'tend', movement: 'stabilising',
        temporal: 'sustained', stability: 'stable', focus: 'internal',
        relational: 'joining', intensity: 'low',
        themes: ['memory', 'gentleness', 'an-earlier-time'],
        provenance: {
            imagery: 'Children in an old garden, cups filled with flowers, one offered to the other.',
            waiteDivinatory: 'A card of the past and of memories, looking back, as on childhood; happiness, enjoyment, but coming from the past.',
            basis: 'divinatory-supported',
        },
    },
    {
        id: 'cups-seven',
        direction: 'stasis', agency: 'observe', movement: 'expanding',
        temporal: 'uncertain', stability: 'suspended', focus: 'internal',
        relational: 'solitary', intensity: 'moderate',
        themes: ['too-many-images', 'unchosen', 'glamour'],
        provenance: {
            imagery: 'Strange chalices of vision rising in cloud before a figure; "the images are more especially those of the fantastic spirit".',
            waiteDivinatory: 'Fairy favours, images of reflection, imagination; "nothing permanent or substantial is suggested".',
            basis: 'divinatory-supported',
        },
    },
    {
        id: 'cups-eight',
        direction: 'transition', agency: 'release', movement: 'contracting',
        temporal: 'transitional', stability: 'transforming', focus: 'internal',
        relational: 'separating', intensity: 'moderate',
        themes: ['leaving', 'deliberate-departure', 'enough-of-this'],
        provenance: {
            imagery: 'A figure walking away over rough ground by moonlight, leaving eight cups standing behind.',
            waiteDivinatory: 'The decline of a matter; a card of the journey away from something.',
            basis: 'imagery-led',
        },
    },
    {
        id: 'cups-nine',
        direction: 'culmination', agency: 'tend', movement: 'expanding',
        temporal: 'sustained', stability: 'stable', focus: 'mixed',
        relational: 'solitary', intensity: 'moderate',
        themes: ['satisfaction', 'having-enough', 'the-material-side'],
        provenance: {
            imagery: 'A well-fed figure seated before an arched counter of nine cups; Waite: "the picture offers the material side only".',
            waiteDivinatory: 'Concord, contentment, physical bien-être; victory, success, advantage.',
            basis: 'divinatory-supported',
        },
    },
    {
        id: 'cups-ten',
        direction: 'culmination', agency: 'integrate', movement: 'resolving',
        temporal: 'ending', stability: 'stable', focus: 'external',
        relational: 'joining', intensity: 'moderate',
        themes: ['fullness-shared', 'settled', 'arrived-together'],
        provenance: {
            imagery: 'A couple with arms raised towards a rainbow of ten cups, children dancing beside them.',
            waiteDivinatory: 'Contentment, repose of the entire heart; the perfection of that state.',
            basis: 'divinatory-supported',
        },
    },
    {
        id: 'cups-page',
        direction: 'beginning', agency: 'observe', movement: 'suspended',
        temporal: 'initiating', stability: 'suspended', focus: 'internal',
        relational: 'solitary', intensity: 'low',
        themes: ['a-notion-surfacing', 'tender', 'unformed'],
        provenance: {
            imagery: 'A figure contemplating a fish that rises from a cup to look back at him; "the pictures of the mind taking form".',
            waiteDivinatory: 'Fair young man; a studious youth; news, message; application, reflection, meditation.',
            basis: 'divergent-from-divinatory',
            divergence: 'The person is dropped; Waite\'s own gloss - the mind\'s pictures taking form - is what is modelled.',
        },
    },
    {
        id: 'cups-knight',
        direction: 'transition', agency: 'act', movement: 'redirecting',
        temporal: 'transitional', stability: 'stable', focus: 'mixed',
        relational: 'joining', intensity: 'moderate',
        themes: ['an-approach', 'offering', 'moving-gently'],
        provenance: {
            imagery: 'A winged-helmed rider moving at a walk, holding a cup out before him.',
            waiteDivinatory: 'Arrival, approach; advances, proposition, invitation.',
            basis: 'divinatory-supported',
            divergence: 'Read as the mode of approach rather than as a suitor arriving.',
        },
    },
    {
        id: 'cups-queen',
        direction: 'development', agency: 'tend', movement: 'stabilising',
        temporal: 'sustained', stability: 'stable', focus: 'internal',
        relational: 'protecting', intensity: 'moderate',
        themes: ['attunement', 'feeling-held-steady', 'depth-without-drowning'],
        provenance: {
            imagery: 'A throned figure gazing into an ornate covered cup at the water\'s edge; "she sees, but she also acts, and her activity feeds her dream".',
            waiteDivinatory: 'Good, fair woman; loving intelligence, and hence the gift of vision; wisdom, virtue.',
            basis: 'divergent-from-divinatory',
            divergence: 'Modelled as a stance - deep feeling that stays usable - rather than as a woman. Waite\'s own note that she also acts is what distinguishes her from the Page.',
        },
    },
    {
        id: 'cups-king',
        direction: 'development', agency: 'integrate', movement: 'stabilising',
        temporal: 'sustained', stability: 'stable', focus: 'mixed',
        relational: 'negotiating', intensity: 'strong',
        themes: ['composure', 'feeling-governed', 'not-swept-along'],
        provenance: {
            imagery: 'A throne on a moving sea, a ship and a fish nearby; the figure holds a cup and a short sceptre and is untroubled by the water.',
            waiteDivinatory: 'Fair man, man of business, law or divinity; responsible, disposed to oblige.',
            basis: 'divergent-from-divinatory',
            divergence: 'Modelled as the mode - feeling carried without being carried away, which is what the steady throne on moving water shows - rather than as a man or a profession.',
        },
    },
];
/* ----------------------------------------------------------------- swords */
/* Mind, conflict, clarity and what it costs. The hardest suit, and the one
   whose source text most needs its literal event claims removed. */
const SWORDS = [
    {
        id: 'swords-ace',
        direction: 'beginning', agency: 'choose', movement: 'disrupting',
        temporal: 'initiating', stability: 'volatile', focus: 'mixed',
        relational: 'separating', intensity: 'strong',
        themes: ['cutting-through', 'clarity-arriving', 'force'],
        provenance: {
            imagery: 'A hand from a cloud grasping a sword whose point is encircled by a crown.',
            waiteDivinatory: 'Triumph, the excessive degree in everything, conquest, triumph of force.',
            basis: 'divinatory-supported',
            divergence: 'The "childbirth" alternative is dropped as an event claim.',
        },
    },
    {
        id: 'swords-two',
        direction: 'stasis', agency: 'wait', movement: 'suspended',
        temporal: 'uncertain', stability: 'suspended', focus: 'internal',
        relational: 'separating', intensity: 'moderate',
        themes: ['not-looking', 'balance-held', 'decision-deferred'],
        provenance: {
            imagery: 'A blindfolded figure with two crossed swords held over the breast, water behind.',
            waiteDivinatory: 'Conformity and the equipoise which it suggests; tenderness, affection; also intimacy.',
            basis: 'imagery-led',
            divergence: 'The blindfold and the crossed blades are read as a deferred decision; Waite\'s "tenderness, affection" belongs to the inherited list and does not match the picture.',
        },
    },
    {
        id: 'swords-three',
        direction: 'interruption', agency: 'endure', movement: 'disrupting',
        temporal: 'transitional', stability: 'volatile', focus: 'internal',
        relational: 'separating', intensity: 'strong',
        themes: ['plain-hurt', 'named-clearly', 'weather-passing'],
        provenance: {
            imagery: 'Three swords through a heart, cloud and rain behind.',
            waiteDivinatory: 'Removal, absence, delay, division, rupture, dispersion.',
            basis: 'imagery-led',
            divergence: 'No betrayal, break-up or third party is inferred. A context-neutral draw has no relationship in it, and the picture shows pain plainly stated, with rain that is weather rather than permanence.',
        },
    },
    {
        id: 'swords-four',
        direction: 'stasis', agency: 'wait', movement: 'suspended',
        temporal: 'sustained', stability: 'suspended', focus: 'internal',
        relational: 'solitary', intensity: 'low',
        themes: ['rest', 'stepping-out-for-now', 'not-defeat'],
        provenance: {
            imagery: 'A recumbent effigy on a tomb, hands in prayer, three swords on the wall and one beneath.',
            waiteDivinatory: 'Vigilance, retreat, solitude, hermit\'s repose, exile, coffin.',
            basis: 'divinatory-supported',
            divergence: 'The coffin reading is dropped; the card is modelled as recovery, which the prayerful posture and the single laid-down sword support.',
        },
    },
    {
        id: 'swords-five',
        direction: 'culmination', agency: 'act', movement: 'disrupting',
        temporal: 'ending', stability: 'volatile', focus: 'external',
        relational: 'competing', intensity: 'strong',
        themes: ['won-badly', 'cost-of-winning', 'field-held'],
        provenance: {
            imagery: 'A disdainful figure holding three swords watches two others walk away dejected, their swords on the ground.',
            waiteDivinatory: 'Degradation, destruction, revocation, infamy, dishonour, loss.',
            basis: 'imagery-led',
            divergence: 'Modelled from the posture: someone has the field and it has cost the room. Waite\'s bare "dishonour" does not say who or how.',
        },
    },
    {
        id: 'swords-six',
        direction: 'transition', agency: 'respond', movement: 'redirecting',
        temporal: 'transitional', stability: 'transforming', focus: 'mixed',
        relational: 'cooperating', intensity: 'low',
        themes: ['passage', 'quieter-water', 'carried-across'],
        provenance: {
            imagery: 'A ferryman poling a boat carrying a cloaked figure and a child, six swords upright in the hull; the water ahead is smoother.',
            waiteDivinatory: 'Journey by water; route, way, envoy, expedient.',
            basis: 'imagery-led',
            divergence: 'The literal journey is dropped; the smoother water ahead and the swords carried rather than wielded are what is modelled.',
        },
    },
    {
        id: 'swords-seven',
        direction: 'development', agency: 'act', movement: 'redirecting',
        temporal: 'transitional', stability: 'volatile', focus: 'external',
        relational: 'separating', intensity: 'moderate',
        themes: ['going-around', 'partial', 'unobserved'],
        provenance: {
            imagery: 'A figure carrying away five swords from a camp, leaving two behind, looking back as he goes.',
            waiteDivinatory: 'Design, attempt, wish, hope, confidence; also quarrelling, a plan that may fail.',
            basis: 'imagery-led',
            divergence: 'Waite notes the significations are "widely at variance"; the picture - taking some and leaving some, unseen - is what is modelled. No theft or deceit by another person is asserted.',
        },
    },
    {
        id: 'swords-eight',
        direction: 'stasis', agency: 'endure', movement: 'suspended',
        temporal: 'sustained', stability: 'suspended', focus: 'internal',
        relational: 'solitary', intensity: 'moderate',
        themes: ['hemmed-in', 'bindings-that-loosen', 'eyes-covered'],
        provenance: {
            imagery: 'A bound and blindfolded figure among eight swords set in the ground; the bindings are loose and the ground is open behind.',
            waiteDivinatory: 'Bad news, violent chagrin, crisis, censure, power in trammels, conflict.',
            basis: 'imagery-led',
            divergence: '"Bad news" is an event claim and is dropped. The loose bindings are the detail that matters and they are what is modelled.',
        },
    },
    {
        id: 'swords-nine',
        direction: 'stasis', agency: 'endure', movement: 'contracting',
        temporal: 'uncertain', stability: 'volatile', focus: 'internal',
        relational: 'solitary', intensity: 'strong',
        themes: ['night-thoughts', 'dread', 'worse-in-the-dark'],
        provenance: {
            imagery: 'A figure sitting up on a couch with face in hands, nine swords on the wall behind; the bed is quilted with roses.',
            waiteDivinatory: 'Death, failure, miscarriage, delay, deception, disappointment, despair.',
            basis: 'divergent-from-divinatory',
            divergence: 'The event claims - death, failure, miscarriage - are dropped outright. The suffering in the picture is mental and nocturnal: the swords are on the wall, not in the sleeper.',
        },
    },
    {
        id: 'swords-ten',
        direction: 'culmination', agency: 'release', movement: 'contracting',
        temporal: 'ending', stability: 'transforming', focus: 'external',
        relational: 'solitary', intensity: 'strong',
        themes: ['finished', 'the-lowest-point', 'sky-already-lightening'],
        provenance: {
            imagery: 'A prone figure with ten swords in the back; the sky above is black but a clear dawn shows at the horizon.',
            waiteDivinatory: 'Pain, affliction, tears, sadness, desolation; "it is not especially a card of violent death".',
            basis: 'divinatory-supported',
            divergence: 'Waite\'s own disclaimer is followed. Modelled as a thing being over rather than as harm: the lightening horizon is in the picture.',
        },
    },
    {
        id: 'swords-page',
        direction: 'beginning', agency: 'observe', movement: 'disrupting',
        temporal: 'initiating', stability: 'volatile', focus: 'external',
        relational: 'protecting', intensity: 'moderate',
        themes: ['watchfulness', 'keen', 'braced-for-something'],
        provenance: {
            imagery: 'A lithe figure walking swiftly over rugged land, sword upright in both hands, "looking this way and that, as if an expected enemy might appear at any moment".',
            waiteDivinatory: 'Authority, overseeing, secret service, vigilance, spying, examination; sickness is also intimated.',
            basis: 'divergent-from-divinatory',
            divergence: 'The sickness intimation is dropped as a health claim. Modelled as the stance of alert watching.',
        },
    },
    {
        id: 'swords-knight',
        direction: 'development', agency: 'act', movement: 'disrupting',
        temporal: 'transitional', stability: 'volatile', focus: 'external',
        relational: 'competing', intensity: 'strong',
        themes: ['headlong', 'argument-carried-hard', 'no-brakes'],
        provenance: {
            imagery: 'A rider charging at full gallop into the wind, sword raised.',
            waiteDivinatory: 'Skill, bravery, capacity, defence, address, enmity, wrath, war, destruction.',
            basis: 'imagery-led',
        },
    },
    {
        id: 'swords-queen',
        direction: 'development', agency: 'observe', movement: 'stabilising',
        temporal: 'sustained', stability: 'stable', focus: 'mixed',
        relational: 'separating', intensity: 'moderate',
        themes: ['clear-sight', 'hard-won', 'no-illusions-left'],
        provenance: {
            imagery: 'A throned figure with sword raised vertically and the other hand extended; the face is "severe but chastened; it suggests familiarity with sorrow".',
            waiteDivinatory: 'Widowhood, female sadness and embarrassment, absence, sterility, mourning, privation.',
            basis: 'divergent-from-divinatory',
            divergence: 'The widowhood and sterility readings are dropped as both gendered and event-claiming. Waite\'s own phrase - familiarity with sorrow producing clear sight - is what is modelled.',
        },
    },
    {
        id: 'swords-king',
        direction: 'development', agency: 'choose', movement: 'stabilising',
        temporal: 'sustained', stability: 'stable', focus: 'mixed',
        relational: 'negotiating', intensity: 'strong',
        themes: ['judgement', 'principle-applied', 'decides-and-stands-by-it'],
        provenance: {
            imagery: 'A throned figure holding an upright sword, facing forward.',
            waiteDivinatory: 'Whatsoever arises out of the idea of judgment: power, command, authority, law.',
            basis: 'divergent-from-divinatory',
            divergence: 'Modelled as the mode of deciding by principle rather than as a man of law.',
        },
    },
];
/* -------------------------------------------------------------- pentacles */
/* Work, material conditions, craft, security. */
const PENTACLES = [
    {
        id: 'pentacles-ace',
        direction: 'beginning', agency: 'initiate', movement: 'expanding',
        temporal: 'initiating', stability: 'stable', focus: 'external',
        relational: 'solitary', intensity: 'moderate',
        themes: ['something-solid-offered', 'a-real-start', 'substance'],
        provenance: {
            imagery: 'A hand from a cloud holding up a pentacle, a garden and an archway below.',
            waiteDivinatory: 'Perfect contentment, felicity, ecstasy; speedy intelligence; gold; prosperity, comfortable material conditions.',
            basis: 'divinatory-supported',
            divergence: 'The "gold" is read as substance and workable ground, not as money arriving.',
        },
    },
    {
        id: 'pentacles-two',
        direction: 'development', agency: 'respond', movement: 'redirecting',
        temporal: 'sustained', stability: 'volatile', focus: 'external',
        relational: 'negotiating', intensity: 'low',
        themes: ['juggling', 'keeping-both-up', 'adapting'],
        provenance: {
            imagery: 'A figure dancing while juggling two pentacles joined by an endless cord; ships ride high waves behind.',
            waiteDivinatory: 'Gaiety, recreation; news and messages in writing; obstacles, agitation, trouble, embroilment.',
            basis: 'imagery-led',
        },
    },
    {
        id: 'pentacles-three',
        direction: 'development', agency: 'integrate', movement: 'stabilising',
        temporal: 'sustained', stability: 'stable', focus: 'external',
        relational: 'cooperating', intensity: 'moderate',
        themes: ['work-with-others', 'skill-recognised', 'to-a-plan'],
        provenance: {
            imagery: 'A sculptor at work in a monastery with two others consulting a plan; Waite notes the apprentice of the Eight "has received his reward and is now at work in earnest".',
            waiteDivinatory: 'Métier, trade, skilled labour; nobility, aristocracy, renown, glory.',
            basis: 'divinatory-supported',
        },
    },
    {
        id: 'pentacles-four',
        direction: 'stasis', agency: 'endure', movement: 'contracting',
        temporal: 'sustained', stability: 'stable', focus: 'external',
        relational: 'protecting', intensity: 'moderate',
        themes: ['holding-tight', 'security', 'grip-that-costs'],
        provenance: {
            imagery: 'A crowned figure clutching one pentacle to the chest, one on the crown and two beneath the feet; a town behind.',
            waiteDivinatory: 'The surety of possessions, cleaving to that which one has; gift, legacy, inheritance.',
            basis: 'divinatory-supported',
            divergence: 'The legacy and inheritance readings are dropped as event claims.',
        },
    },
    {
        id: 'pentacles-five',
        direction: 'stasis', agency: 'endure', movement: 'contracting',
        temporal: 'sustained', stability: 'volatile', focus: 'external',
        relational: 'separating', intensity: 'strong',
        themes: ['hardship', 'outside-in-the-cold', 'help-nearby-unnoticed'],
        provenance: {
            imagery: 'Two destitute figures passing a lighted church window in a snowstorm.',
            waiteDivinatory: 'Material trouble, destitution; for some, a card of love and lovers. "These alternatives cannot be harmonized."',
            basis: 'imagery-led',
            divergence: 'Waite himself says the alternatives cannot be reconciled; the picture is followed. The lit window - shelter present but unseen - is the detail modelled, and no poverty is predicted.',
        },
    },
    {
        id: 'pentacles-six',
        direction: 'development', agency: 'tend', movement: 'redirecting',
        temporal: 'sustained', stability: 'stable', focus: 'external',
        relational: 'negotiating', intensity: 'low',
        themes: ['giving-and-getting', 'the-scales', 'who-holds-them'],
        provenance: {
            imagery: 'A merchant weighing money in scales and distributing it to two kneeling figures.',
            waiteDivinatory: 'Presents, gifts, gratification; attention, vigilance; the present must not be relied on.',
            basis: 'imagery-led',
            divergence: 'The scales in one party\'s hand are read as the point: exchange with an uneven footing, rather than simple generosity.',
        },
    },
    {
        id: 'pentacles-seven',
        direction: 'stasis', agency: 'wait', movement: 'suspended',
        temporal: 'sustained', stability: 'stable', focus: 'external',
        relational: 'solitary', intensity: 'low',
        themes: ['pause-to-look', 'not-finished-growing', 'patience-under-doubt'],
        provenance: {
            imagery: 'A young figure leaning on a staff, looking intently at seven pentacles on a clump of greenery; "one would say that these were his treasures and that his heart was there".',
            waiteDivinatory: 'Money, business, barter; altercation, quarrels; innocence, ingenuity. "These are exceedingly contradictory."',
            basis: 'imagery-led',
            divergence: 'Waite calls his own list exceedingly contradictory. The posture - stopping work to assess growth that is not ready - is what the picture actually shows.',
        },
    },
    {
        id: 'pentacles-eight',
        direction: 'development', agency: 'act', movement: 'stabilising',
        temporal: 'sustained', stability: 'stable', focus: 'external',
        relational: 'solitary', intensity: 'moderate',
        themes: ['repetition', 'skill-being-built', 'absorbed-in-it'],
        provenance: {
            imagery: 'A craftsman carving pentacles one at a time and mounting them in a row; the town is at a distance.',
            waiteDivinatory: 'Work, employment, commission, craftsmanship, skill in craft and business.',
            basis: 'divinatory-supported',
        },
    },
    {
        id: 'pentacles-nine',
        direction: 'culmination', agency: 'tend', movement: 'stabilising',
        temporal: 'sustained', stability: 'stable', focus: 'mixed',
        relational: 'solitary', intensity: 'moderate',
        themes: ['earned-ease', 'self-sufficient', 'enjoyed-alone'],
        provenance: {
            imagery: 'A figure with a hooded bird on the wrist, standing among grapevines in a walled garden; "a wide domain, suggesting plenty in all things".',
            waiteDivinatory: 'Prudence, safety, success, accomplishment, certitude, discernment.',
            basis: 'divinatory-supported',
        },
    },
    {
        id: 'pentacles-ten',
        direction: 'culmination', agency: 'integrate', movement: 'stabilising',
        temporal: 'ending', stability: 'stable', focus: 'external',
        relational: 'joining', intensity: 'moderate',
        themes: ['continuity', 'what-outlasts-you', 'established'],
        provenance: {
            imagery: 'Three generations under an archway with dogs and the arms of a house; the pentacles arranged as the Tree of Life.',
            waiteDivinatory: 'Gain, riches; family matters, archives, extraction, the abode of a family.',
            basis: 'divinatory-supported',
            divergence: 'The riches and inheritance readings are dropped as event claims; continuity across time is what the three generations show.',
        },
    },
    {
        id: 'pentacles-page',
        direction: 'beginning', agency: 'observe', movement: 'stabilising',
        temporal: 'initiating', stability: 'stable', focus: 'external',
        relational: 'solitary', intensity: 'low',
        themes: ['study', 'absorbed', 'slow-and-early'],
        provenance: {
            imagery: 'A youthful figure holding a pentacle up in both hands and looking intently at it; "he moves slowly, insensible of that which is about him".',
            waiteDivinatory: 'Application, study, scholarship, reflection; news, messages; rule, management.',
            basis: 'divinatory-supported',
            divergence: 'The messenger reading is dropped; the absorbed slowness Waite describes is the stance modelled.',
        },
    },
    {
        id: 'pentacles-knight',
        direction: 'development', agency: 'endure', movement: 'stabilising',
        temporal: 'sustained', stability: 'stable', focus: 'external',
        relational: 'solitary', intensity: 'low',
        themes: ['plodding', 'reliable', 'unglamorous'],
        provenance: {
            imagery: 'An armoured rider on a heavy, stationary horse, holding a pentacle out; ploughed field behind.',
            waiteDivinatory: 'Utility, serviceableness, interest, responsibility, rectitude.',
            basis: 'divinatory-supported',
            divergence: 'Read as the mode - steady unexciting continuation - which the motionless heavy horse shows more plainly than the keyword list does.',
        },
    },
    {
        id: 'pentacles-queen',
        direction: 'development', agency: 'tend', movement: 'stabilising',
        temporal: 'sustained', stability: 'stable', focus: 'mixed',
        relational: 'protecting', intensity: 'moderate',
        themes: ['practical-care', 'resourceful', 'grounded'],
        provenance: {
            imagery: 'A throned figure in a flowering bower contemplating a pentacle; "greatness of soul" with "the serious cast of intelligence", who "may see worlds therein".',
            waiteDivinatory: 'Opulence, generosity, magnificence, security, liberty.',
            basis: 'divergent-from-divinatory',
            divergence: 'Modelled as a stance - looking after the material side of things well - not as a woman. The gendered reading is dropped.',
        },
    },
    {
        id: 'pentacles-king',
        direction: 'culmination', agency: 'tend', movement: 'stabilising',
        temporal: 'sustained', stability: 'stable', focus: 'external',
        relational: 'protecting', intensity: 'strong',
        themes: ['provision', 'mastery-of-means', 'settled'],
        provenance: {
            imagery: 'A crowned figure on a throne carved with bulls, vines and fruit about him, a pentacle held on the knee.',
            waiteDivinatory: 'Valour, realizing intelligence, business and normal intellectual aptitude; mathematical gifts.',
            basis: 'divergent-from-divinatory',
            divergence: 'Modelled as the mode of carrying the suit - the means in hand and used well - rather than as a man with a profession.',
        },
    },
];
export const TAROT_MINOR_SEMANTICS = [
    ...WANDS, ...CUPS, ...SWORDS, ...PENTACLES,
];
