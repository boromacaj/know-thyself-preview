/**
 * THE TWENTY-TWO MAJOR ARCANA, AS SEMANTICS.
 *
 * Every model below is built from Waite's own description of what is in the
 * picture, plus his Part II reading of it. His §III divinatory keyword list is
 * recorded in `provenance.waiteDivinatory` for traceability, and is followed
 * only where it agrees with the picture.
 *
 * IT OFTEN DOES NOT AGREE, and that is a finding rather than an inconvenience.
 * Waite transcribed those lists from the earlier cartomantic tradition and
 * called the result "a prolonged impertinence"; he wrote Part II himself. Six
 * cards here carry `divergent-from-divinatory` with the reason - most starkly
 * The Star, whose divinatory entry reads "Loss, theft, privation, abandonment"
 * beside a picture of someone pouring water under an open sky, and which even
 * Waite footnotes with "another reading says - hope and bright prospects".
 *
 * MAJOR DOES NOT MEAN IMPORTANT. These cards carry wider, more structural
 * movements than the Minors, and that shows up as `intensity` and as the arc
 * engine noticing how many of them are present. It does not make a Major a
 * verdict or a Minor a triviality, and nothing downstream treats it that way.
 */
export const TAROT_MAJOR_SEMANTICS = [
    {
        id: 'major-fool',
        direction: 'beginning', agency: 'initiate', movement: 'expanding',
        temporal: 'initiating', stability: 'volatile', focus: 'external',
        relational: 'solitary', intensity: 'moderate',
        themes: ['threshold', 'untested', 'openness'],
        provenance: {
            imagery: 'A young man at the brink of a precipice, eyes on the distance rather than the drop; "the spirit in search of experience".',
            waiteDivinatory: 'Folly, mania, extravagance, intoxication, delirium, frenzy.',
            basis: 'divergent-from-divinatory',
            divergence: 'Waite\'s own text calls the figure "a prince of the other world on his travels" and "the spirit in search of experience"; the divinatory list\'s folly and mania describe a different card from the one he describes.',
        },
    },
    {
        id: 'major-magician',
        direction: 'beginning', agency: 'act', movement: 'expanding',
        temporal: 'initiating', stability: 'stable', focus: 'mixed',
        relational: 'solitary', intensity: 'strong',
        themes: ['capability', 'means-at-hand', 'application'],
        provenance: {
            imagery: 'A figure with the four suits laid out before him, one hand raised and one pointing down; the sign of life above his head.',
            waiteDivinatory: 'Skill, diplomacy, address, subtlety; self-confidence, will.',
            basis: 'divinatory-supported',
        },
    },
    {
        id: 'major-high-priestess',
        direction: 'stasis', agency: 'observe', movement: 'suspended',
        temporal: 'uncertain', stability: 'suspended', focus: 'internal',
        relational: 'solitary', intensity: 'low',
        themes: ['withheld', 'inward', 'not-yet-spoken'],
        provenance: {
            imagery: 'Seated between a white and a black pillar, a scroll half covered by her mantle "to shew that some things are implied and some spoken".',
            waiteDivinatory: 'Secrets, mystery, the future as yet unrevealed; silence, tenacity.',
            basis: 'divinatory-supported',
        },
    },
    {
        id: 'major-empress',
        direction: 'development', agency: 'tend', movement: 'expanding',
        temporal: 'sustained', stability: 'stable', focus: 'external',
        relational: 'joining', intensity: 'moderate',
        themes: ['generative', 'abundance', 'care'],
        provenance: {
            imagery: 'A crowned figure among ripening corn and running water, a shield at her side; the generative principle of the deck.',
            waiteDivinatory: 'Fruitfulness, action, initiative, length of days; also difficulty, doubt, ignorance.',
            basis: 'divergent-from-divinatory',
            divergence: 'The list pairs fruitfulness with "difficulty, doubt, ignorance" without reconciling them; the imagery supports only the generative reading.',
        },
    },
    {
        id: 'major-emperor',
        direction: 'development', agency: 'act', movement: 'stabilising',
        temporal: 'sustained', stability: 'stable', focus: 'external',
        relational: 'protecting', intensity: 'strong',
        themes: ['structure', 'authority', 'order-imposed'],
        provenance: {
            imagery: 'A crowned monarch on a throne fronted by rams\' heads; "executive and realization, the power of this world", the lordship of thought rather than of the animal world.',
            waiteDivinatory: 'Stability, power, protection, realization; authority and will.',
            basis: 'divinatory-supported',
        },
    },
    {
        id: 'major-hierophant',
        direction: 'development', agency: 'tend', movement: 'stabilising',
        temporal: 'sustained', stability: 'stable', focus: 'external',
        relational: 'cooperating', intensity: 'moderate',
        themes: ['tradition', 'instruction', 'belonging'],
        provenance: {
            imagery: 'A seated hierarch between two pillars with two ministers before him; the outward and declared form of teaching.',
            waiteDivinatory: 'Marriage, alliance, captivity, servitude; mercy and goodness; inspiration.',
            basis: 'imagery-led',
        },
    },
    {
        id: 'major-lovers',
        direction: 'integration', agency: 'choose', movement: 'expanding',
        temporal: 'transitional', stability: 'suspended', focus: 'mixed',
        relational: 'joining', intensity: 'moderate',
        themes: ['alignment', 'choice', 'what-is-valued'],
        provenance: {
            imagery: 'Two figures unveiled before each other under a winged figure, the Tree of Life behind one and the Tree of Knowledge behind the other.',
            waiteDivinatory: 'Attraction, love, beauty, trials overcome.',
            basis: 'imagery-led',
            divergence: 'Read as alignment and choice rather than romance alone: Waite says the card "replaces, by recourse to first principles, the old card of marriage", and the Tree of Knowledge puts a choice in the picture.',
        },
    },
    {
        id: 'major-chariot',
        direction: 'development', agency: 'act', movement: 'expanding',
        temporal: 'sustained', stability: 'stable', focus: 'external',
        relational: 'competing', intensity: 'strong',
        themes: ['drive', 'held-course', 'forward'],
        provenance: {
            imagery: 'An upright figure in a chariot drawn by two sphinxes that face different ways, held to one course by will rather than by rein.',
            waiteDivinatory: 'Succour, providence; war, triumph, presumption, vengeance, trouble.',
            basis: 'imagery-led',
        },
    },
    {
        id: 'major-strength',
        direction: 'development', agency: 'tend', movement: 'stabilising',
        temporal: 'sustained', stability: 'stable', focus: 'internal',
        relational: 'protecting', intensity: 'moderate',
        themes: ['patience', 'force-not-needed', 'steadiness'],
        provenance: {
            imagery: 'A woman closing the jaws of a lion that is already subdued, leading it by a chain of flowers.',
            waiteDivinatory: 'Power, energy, action, courage, magnanimity.',
            basis: 'imagery-led',
            divergence: 'Waite states the card "has nothing to do with self-confidence in the ordinary sense"; the flowers, not the grip, are the point, so this is modelled as steadiness rather than as force.',
        },
    },
    {
        id: 'major-hermit',
        direction: 'stasis', agency: 'observe', movement: 'contracting',
        temporal: 'sustained', stability: 'stable', focus: 'internal',
        relational: 'solitary', intensity: 'low',
        themes: ['withdrawal', 'search', 'light-carried'],
        provenance: {
            imagery: 'A cloaked figure on a height holding out a lantern, having stepped away from everything below.',
            waiteDivinatory: 'Prudence, circumspection; also and especially treason, dissimulation, roguery, corruption.',
            basis: 'divergent-from-divinatory',
            divergence: 'Treason and roguery belong to the inherited list, not to the picture; the lamp held out for others is the opposite gesture.',
        },
    },
    {
        id: 'major-wheel-of-fortune',
        direction: 'transition', agency: 'respond', movement: 'redirecting',
        temporal: 'transitional', stability: 'volatile', focus: 'external',
        relational: 'solitary', intensity: 'moderate',
        themes: ['turning', 'circumstance', 'not-yours-to-steer'],
        provenance: {
            imagery: 'A wheel in motion with figures rising and falling on it and a sphinx at the top; "the perpetual motion of a fluidic universe and the flux of human life".',
            waiteDivinatory: 'Destiny, fortune, success, elevation, luck, felicity.',
            basis: 'imagery-led',
            divergence: 'Modelled as circumstance turning rather than as good fortune: the wheel carries figures down as well as up, and Waite explicitly rejects the "fatuous" luck readings.',
        },
    },
    {
        id: 'major-justice',
        direction: 'culmination', agency: 'choose', movement: 'stabilising',
        temporal: 'sustained', stability: 'stable', focus: 'mixed',
        relational: 'negotiating', intensity: 'moderate',
        themes: ['weighing', 'consequence', 'what-is-owed'],
        provenance: {
            imagery: 'A seated figure holding upright sword and level scales, between two pillars.',
            waiteDivinatory: 'Equity, rightness, probity, executive; triumph of the deserving side in law.',
            basis: 'divinatory-supported',
            divergence: 'The legal specifics are dropped: a context-neutral daily draw cannot know there is a case.',
        },
    },
    {
        id: 'major-hanged-man',
        direction: 'stasis', agency: 'wait', movement: 'suspended',
        temporal: 'uncertain', stability: 'suspended', focus: 'internal',
        relational: 'solitary', intensity: 'low',
        themes: ['suspension', 'inverted-view', 'not-yet'],
        provenance: {
            imagery: 'A figure hung by one foot from living wood, a nimbus about the head; the face shows "deep entrancement, not suffering".',
            waiteDivinatory: 'Wisdom, circumspection, discernment, trials, sacrifice, intuition.',
            basis: 'imagery-led',
            divergence: 'Not martyrdom: Waite says the card "suggests life in suspension, but life and not death" and calls the martyrdom reading false.',
        },
    },
    {
        id: 'major-death',
        direction: 'transition', agency: 'release', movement: 'contracting',
        temporal: 'ending', stability: 'transforming', focus: 'external',
        relational: 'separating', intensity: 'strong',
        themes: ['ending', 'irreversible', 'cleared-ground'],
        provenance: {
            imagery: 'A slow-moving horseman with a black banner bearing the Mystic Rose, "which signifies life"; the sun of immortality shines between two pillars behind.',
            waiteDivinatory: 'End, mortality, destruction, corruption; for a maid, failure of marriage projects.',
            basis: 'divergent-from-divinatory',
            divergence: 'Waite rejects the divinatory reading in his own text: the card is "change, transformation and passage from lower to higher", represented "more fitly by one of the apocalyptic visions than by the crude notion of the reaping skeleton". No literal mortality is modelled.',
        },
    },
    {
        id: 'major-temperance',
        direction: 'integration', agency: 'integrate', movement: 'resolving',
        temporal: 'sustained', stability: 'stable', focus: 'mixed',
        relational: 'cooperating', intensity: 'low',
        themes: ['blending', 'measure', 'right-proportion'],
        provenance: {
            imagery: 'A winged figure pouring between two chalices, one foot on land and one in water, a path going up to a light on the horizon.',
            waiteDivinatory: 'Economy, moderation, frugality, management, accommodation.',
            basis: 'divinatory-supported',
        },
    },
    {
        id: 'major-devil',
        direction: 'stasis', agency: 'endure', movement: 'contracting',
        temporal: 'sustained', stability: 'stable', focus: 'internal',
        relational: 'joining', intensity: 'strong',
        themes: ['binding', 'compulsion', 'chains-that-are-loose'],
        provenance: {
            imagery: 'A horned figure above two chained human figures; the chains around their necks are loose enough to lift off.',
            waiteDivinatory: 'Ravage, violence, vehemence, force, fatality; "that which is predestined but is not for this reason evil".',
            basis: 'imagery-led',
            divergence: 'Modelled as a binding that persists because it is not questioned - the loose chains are the point. Waite\'s own qualification that this is "not for this reason evil" is followed; no addiction, abuse or malign person is inferred.',
        },
    },
    {
        id: 'major-tower',
        direction: 'interruption', agency: 'endure', movement: 'disrupting',
        temporal: 'transitional', stability: 'volatile', focus: 'external',
        relational: 'exposing', intensity: 'strong',
        themes: ['collapse', 'sudden', 'structure-that-was-false'],
        provenance: {
            imagery: 'Lightning strikes a tower and throws down its crown; two figures fall.',
            waiteDivinatory: 'Misery, distress, indigence, adversity, calamity, ruin; "a card in particular of unforeseen catastrophe".',
            basis: 'imagery-led',
            divergence: 'Read through Waite\'s own gloss - "the rending of a House of Doctrine", "a House of Falsehood" - so what falls is a structure that was not sound, rather than generic catastrophe.',
        },
    },
    {
        id: 'major-star',
        direction: 'release', agency: 'tend', movement: 'expanding',
        temporal: 'sustained', stability: 'stable', focus: 'internal',
        relational: 'solitary', intensity: 'low',
        themes: ['hope', 'replenishment', 'nothing-hidden'],
        provenance: {
            imagery: 'A naked figure kneeling by a pool, pouring water onto land and back into the water, under one great star and seven lesser ones.',
            waiteDivinatory: 'Loss, theft, privation, abandonment; "another reading says - hope and bright prospects".',
            basis: 'divergent-from-divinatory',
            divergence: 'The starkest conflict in the book. The list says loss; the picture is replenishment under an open sky, and Waite records the contrary reading in the same sentence. The imagery is followed.',
        },
    },
    {
        id: 'major-moon',
        direction: 'transition', agency: 'wait', movement: 'suspended',
        temporal: 'uncertain', stability: 'volatile', focus: 'internal',
        relational: 'solitary', intensity: 'moderate',
        themes: ['uncertainty', 'imagination', 'half-light'],
        provenance: {
            imagery: 'A path between two towers into the unknown, a dog and a wolf below, a creature rising from the water; "the life of the imagination apart from the life of the spirit".',
            waiteDivinatory: 'Hidden enemies, danger, calumny, darkness, terror, deception, error.',
            basis: 'divergent-from-divinatory',
            divergence: 'Hidden enemies and calumny make claims about other people that a context-neutral draw cannot support. Waite\'s own reading - the mind\'s own fears "in the presence of that place of exit" - is followed instead.',
        },
    },
    {
        id: 'major-sun',
        direction: 'culmination', agency: 'act', movement: 'expanding',
        temporal: 'sustained', stability: 'stable', focus: 'external',
        relational: 'joining', intensity: 'strong',
        themes: ['clarity', 'vitality', 'plain-daylight'],
        provenance: {
            imagery: 'A child on a white horse under a full sun, a wall of sunflowers behind, a banner raised.',
            waiteDivinatory: 'Material happiness, fortunate marriage, contentment.',
            basis: 'imagery-led',
            divergence: 'The marriage specific is dropped; a context-neutral draw cannot know there is a relationship in question.',
        },
    },
    {
        id: 'major-judgement',
        direction: 'culmination', agency: 'respond', movement: 'resolving',
        temporal: 'transitional', stability: 'transforming', focus: 'mixed',
        relational: 'exposing', intensity: 'strong',
        themes: ['reckoning', 'a-call', 'answered-from-within'],
        provenance: {
            imagery: 'An angel with a trumpet above figures rising from their tombs, all in the same attitude of wonder.',
            waiteDivinatory: 'Change of position, renewal, outcome; another account specifies total loss through lawsuit.',
            basis: 'imagery-led',
            divergence: 'Waite: the summons "is heard and answered from within" - modelled as a reckoning one answers, not one that arrives from outside. The lawsuit reading is dropped as context the draw does not have.',
        },
    },
    {
        id: 'major-world',
        direction: 'culmination', agency: 'integrate', movement: 'resolving',
        temporal: 'ending', stability: 'stable', focus: 'mixed',
        relational: 'cooperating', intensity: 'moderate',
        themes: ['completion', 'wholeness', 'a-circuit-closed'],
        provenance: {
            imagery: 'A dancing figure within a wreath, the four Living Creatures at the corners.',
            waiteDivinatory: 'Assured success, recompense, voyage, route, emigration, change of place.',
            basis: 'divinatory-supported',
            divergence: 'The travel specifics are dropped as unsupported by a context-neutral draw.',
        },
    },
];
