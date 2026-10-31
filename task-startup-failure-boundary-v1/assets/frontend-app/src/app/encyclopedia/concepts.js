/**
 * THE ENCYCLOPEDIA.
 *
 * One entry per concept, answering exactly one question:
 *
 *     "What does this concept mean in this system?"
 *
 * NOT "what does this mean for me?" - that is the reading, and it is written per
 * reader from their own chart. The separation is the whole point. An entry here
 * is written once and is true for everybody, which is why it can be a plain
 * table rather than a composer: nothing in it depends on a birth date.
 *
 * A test asserts that no entry contains second-person interpretation, because
 * the failure mode is obvious and gradual - it starts with one helpful "so for
 * you this means…" and ends with the panel being a second, worse copy of the
 * reading.
 *
 * WHAT EACH ENTRY COVERS
 * Where it makes sense: what the concept is, how it is derived, what part of the
 * chart it describes, and why the tradition treats it as important. Not every
 * concept needs all four, and padding one to fill the shape would make it worse.
 *
 * THE BOUNDARY FIELD
 * Some concepts sit next to real psychology or physiology - a bodily decision
 * signal is describing interoception whether or not the tradition says so. Those
 * entries carry an explicit boundary line, and it always says the same thing in
 * substance: the scientific concept may help explain the EXPERIENCE the metaphor
 * points at; it does not make the symbolic system true. That line is not
 * decoration and must not be dropped to save space.
 */
import { activeLocale, FALLBACK_LOCALE } from '../i18n/locale.js?v=2ea79e9';
import { conceptTranslation, conceptTranslationKeys } from './conceptTranslations.js?v=2ea79e9';
import { humanDesignCenterEntries } from './humanDesignCenters.js?v=2ea79e9';
const SYMBOLIC_BOUNDARY = 'This is a symbolic system. Concepts like this describe a tradition’s way of '
    + 'organising meaning, not a measured property of a person.';
const SCIENCE_BOUNDARY = 'Scientific concepts are included here only because they can help explain the '
    + 'ordinary experience the metaphor points at. They do not validate this '
    + 'system, and no symbolic tradition is confirmed by them.';
const ENTRIES = [
    ...humanDesignCenterEntries(),
    /* ---------------------------------------------------------- numerology -- */
    {
        key: 'life-path',
        title: 'Life Path',
        system: 'numerology',
        eyebrow: 'Numerology',
        body: [
            'The Life Path is the number reached by reducing the full birth date - day, '
                + 'month and year - down to a single digit, with 11, 22 and 33 traditionally '
                + 'kept unreduced as master numbers.',
            'It is the number numerology treats as central. Practitioners read it as the '
                + 'overall shape of a life’s direction rather than as a description of '
                + 'personality, which is what the Expression and Soul Urge numbers are for.',
            'Because it comes from the date alone, it is the one number that needs no '
                + 'name and no birth time.',
        ],
        boundary: SYMBOLIC_BOUNDARY,
    },
    {
        key: 'expression',
        title: 'Expression number',
        system: 'numerology',
        eyebrow: 'Numerology',
        body: [
            'Also called the Destiny number. Every letter of the full birth name is '
                + 'converted to a digit and the total is reduced.',
            'The tradition reads it as the outward faculties a person works with - how '
                + 'they act and what they build - as distinct from the inner motive the Soul '
                + 'Urge describes.',
            'It uses the name as given at birth, so it does not change when a name later '
                + 'changes.',
        ],
        boundary: SYMBOLIC_BOUNDARY,
    },
    {
        key: 'soul-urge',
        title: 'Soul Urge',
        system: 'numerology',
        eyebrow: 'Numerology',
        body: [
            'Calculated from the vowels of the birth name only.',
            'Read as inner motivation - what a person is drawn toward when nothing is '
                + 'being performed for anyone else. It pairs with the Personality number, '
                + 'which comes from the consonants and is read as the outward impression.',
        ],
        boundary: SYMBOLIC_BOUNDARY,
    },
    {
        key: 'personality-number',
        title: 'Personality number',
        system: 'numerology',
        eyebrow: 'Numerology',
        body: [
            'Calculated from the consonants of the birth name.',
            'Read as the impression others form first - the outward edge of the name '
                + 'rather than its inner vowel core.',
        ],
        boundary: SYMBOLIC_BOUNDARY,
    },
    {
        key: 'pinnacle',
        title: 'Pinnacle',
        system: 'numerology',
        eyebrow: 'Numerology',
        body: [
            'One of four life periods, each with its own number derived from the birth '
                + 'date. The first runs from birth to 36 minus the single digit of the Life '
                + 'Path (a master Life Path counts as its digit: 11 as 2, 22 as 4, 33 as 6); '
                + 'the middle two last nine years each; the fourth is open-ended.',
            'A Pinnacle is read as the theme of a chapter rather than of a whole life. '
                + 'Which one is current is therefore a function of age.',
        ],
        boundary: SYMBOLIC_BOUNDARY,
    },
    {
        key: 'challenge',
        title: 'Challenge number',
        system: 'numerology',
        eyebrow: 'Numerology',
        body: [
            'Derived by subtraction between parts of the birth date, and paired with the '
                + 'Pinnacle covering the same period.',
            'Where the Pinnacle names what a chapter offers, the Challenge names the '
                + 'friction the tradition expects alongside it. The two are read together; '
                + 'reading either alone is considered incomplete.',
        ],
        boundary: SYMBOLIC_BOUNDARY,
    },
    {
        key: 'personal-year',
        title: 'Personal Year',
        system: 'numerology',
        eyebrow: 'Numerology',
        body: [
            'A cycle number combining the birth day and month with the current calendar '
                + 'year, running 1 to 9 and repeating.',
            'It is timing rather than character: it describes a year, not a person, and '
                + 'it changes every year while the natal numbers never do.',
        ],
        boundary: SYMBOLIC_BOUNDARY,
    },
    /* ---------------------------------------------------- western astrology -- */
    {
        key: 'big-three',
        title: 'The Big Three',
        system: 'western-astrology',
        eyebrow: 'Western astrology',
        body: [
            'Sun, Moon and Ascendant, read together rather than separately.',
            'The convention treats the Sun as the central drive, the Moon as the inner '
                + 'and emotional register, and the Ascendant as the manner a person meets '
                + 'the world in. Their combination is considered more informative than any '
                + 'one of them, because each qualifies the others.',
            'Only the Sun is reliable without a birth time. The Ascendant moves through '
                + 'the whole zodiac in a day and the Moon changes sign every two to three '
                + 'days.',
        ],
        boundary: SYMBOLIC_BOUNDARY,
    },
    {
        key: 'ascendant',
        title: 'Ascendant',
        system: 'western-astrology',
        eyebrow: 'Western astrology',
        body: [
            'The zodiac degree rising on the eastern horizon at the moment and place of '
                + 'birth. It begins the first house and sets the whole house framework.',
            'Because the Earth turns once a day, it advances roughly one degree every '
                + 'four minutes - which is why it is the placement most sensitive to an '
                + 'inaccurate birth time, and why it is withheld when the time is estimated.',
        ],
        boundary: SYMBOLIC_BOUNDARY,
    },
    {
        key: 'chart-ruler',
        title: 'Chart ruler',
        system: 'western-astrology',
        eyebrow: 'Western astrology',
        body: [
            'The planet that traditionally rules the sign on the Ascendant. Where that '
                + 'planet sits is then read as carrying particular weight for the chart as a '
                + 'whole.',
            'It depends entirely on the Ascendant, so it inherits the Ascendant’s '
                + 'sensitivity to birth time.',
        ],
        boundary: SYMBOLIC_BOUNDARY,
    },
    {
        key: 'stellium',
        title: 'Stellium',
        system: 'western-astrology',
        eyebrow: 'Western astrology',
        body: [
            'Three or more planets gathered in one sign or one house.',
            'Read as a concentration: a disproportionate amount of the chart’s '
                + 'attention pointed at a single area. Definitions vary between schools on '
                + 'how many bodies are required and whether the outer planets count.',
        ],
        boundary: SYMBOLIC_BOUNDARY,
    },
    {
        key: 'element',
        title: 'Element',
        system: 'western-astrology',
        eyebrow: 'Western astrology',
        body: [
            'Fire, Earth, Air and Water. Each zodiac sign belongs to one, and counting '
                + 'the elements across a chart gives its overall temperature.',
            'An element that dominates, and one that is missing entirely, are both read '
                + 'as significant. The count is a summary of the placements, not an extra '
                + 'fact independent of them.',
        ],
        boundary: SYMBOLIC_BOUNDARY,
    },
    {
        key: 'modality',
        title: 'Modality',
        system: 'western-astrology',
        eyebrow: 'Western astrology',
        body: [
            'Cardinal, Fixed and Mutable - the second way signs are grouped, cutting '
                + 'across the elements.',
            'The tradition reads Cardinal as initiating, Fixed as sustaining and Mutable '
                + 'as adapting. Like the element count, it summarises placements already '
                + 'present rather than adding new information.',
        ],
        boundary: SYMBOLIC_BOUNDARY,
    },
    {
        key: 'house',
        title: 'House',
        system: 'western-astrology',
        eyebrow: 'Western astrology',
        body: [
            'Twelve divisions of the chart, each associated with an area of life. This '
                + 'chart uses Whole Sign houses, where each house is exactly one sign.',
            'Houses are anchored to the Ascendant, so they exist only when the birth '
                + 'time is known.',
        ],
        boundary: SYMBOLIC_BOUNDARY,
    },
    {
        key: 'aspect',
        title: 'Aspect',
        system: 'western-astrology',
        eyebrow: 'Western astrology',
        body: [
            'An angular relationship between two bodies. The five major aspects are '
                + 'conjunction (0°), sextile (60°), square (90°), trine '
                + '(120°) and opposition (180°).',
            'The permitted deviation from exactness is the orb; a tighter orb is read as '
                + 'a stronger aspect. Trines and sextiles are conventionally read as ease, '
                + 'squares and oppositions as friction - though many astrologers treat that '
                + 'split as far too crude.',
        ],
        boundary: SYMBOLIC_BOUNDARY,
    },
    /* ------------------------------------------------------------ bazi/tcm -- */
    {
        key: 'chinese-zodiac',
        title: 'Chinese zodiac sign',
        system: 'bazi-tcm',
        eyebrow: 'BaZi',
        body: [
            'The animal of the Earthly Branch in the year pillar, combined with that '
                + 'year’s Heavenly Stem element - Fire Rabbit, Metal Ox, and so on. '
                + 'Twelve animals and five elements give a sixty-year cycle.',
            'It is the most widely known part of the system and the usual way in, but '
                + 'within BaZi it is only one of four pillars. A full chart is read from the '
                + 'Day Master outward, and the year animal is closer to an inherited '
                + 'backdrop than to the centre of the reading.',
            'The year begins at Li Chun, the solar term in early February - not at the '
                + 'lunar new year, and not on 1 January.',
        ],
        boundary: SYMBOLIC_BOUNDARY,
    },
    {
        key: 'four-pillars',
        title: 'The Four Pillars',
        system: 'bazi-tcm',
        eyebrow: 'BaZi',
        body: [
            'Year, Month, Day and Hour. Each pillar pairs one Heavenly Stem with one '
                + 'Earthly Branch, giving the eight characters the system is named for '
                + '(ba zi - "eight characters").',
            'Convention assigns each position a domain: the year to inheritance and '
                + 'early environment, the month to upbringing and working life, the day to '
                + 'the self and close partnership, the hour to later life and what one '
                + 'produces.',
            'The Hour pillar needs an accurate birth time. Without one it is left out '
                + 'rather than guessed, and the chart is read from three pillars.',
        ],
        boundary: SYMBOLIC_BOUNDARY,
    },
    {
        key: 'day-master',
        title: 'Day Master',
        system: 'bazi-tcm',
        eyebrow: 'BaZi',
        body: [
            'The Heavenly Stem of the Day pillar. It is one of ten stems: each of the '
                + 'five elements in a Yang and a Yin form.',
            'It is the reference point of the entire chart. Every other character is '
                + 'read in relation to it - whether it supports, drains, controls or is '
                + 'controlled by it - which is what the Ten Gods describe.',
            'This is why BaZi is not "your Chinese zodiac sign". The year animal is one '
                + 'of eight characters; the Day Master is the one the other seven are '
                + 'measured against.',
        ],
        boundary: SYMBOLIC_BOUNDARY,
    },
    {
        key: 'five-elements',
        title: 'The Five Elements',
        system: 'bazi-tcm',
        eyebrow: 'BaZi',
        body: [
            'Wood, Fire, Earth, Metal and Water - the Wu Xing. They are read as phases '
                + 'of a cycle rather than as substances.',
            'Two relationships drive the system: generating, where each phase produces '
                + 'the next (Wood feeds Fire, Fire makes Earth, Earth bears Metal, Metal '
                + 'carries Water, Water grows Wood), and controlling, where each restrains '
                + 'another across the cycle.',
            'Counting the phases present in a chart gives its balance. An absent phase '
                + 'is considered as informative as a dominant one.',
        ],
        boundary: SYMBOLIC_BOUNDARY,
    },
    {
        key: 'heavenly-stem',
        title: 'Heavenly Stem',
        system: 'bazi-tcm',
        eyebrow: 'BaZi',
        body: [
            'Ten characters cycling through the five elements in Yang and Yin form. One '
                + 'sits at the top of each pillar.',
            'Stems are treated as the visible, outward layer of a pillar - what is '
                + 'expressed - in contrast to the branch beneath, which carries what is '
                + 'held.',
        ],
        boundary: SYMBOLIC_BOUNDARY,
    },
    {
        key: 'earthly-branch',
        title: 'Earthly Branch',
        system: 'bazi-tcm',
        eyebrow: 'BaZi',
        body: [
            'Twelve characters, each with an animal and an element, sitting beneath the '
                + 'stem in each pillar. They also map to months, two-hour periods and '
                + 'compass directions.',
            'Branches are read as the grounded layer, and each conceals one to three '
                + 'hidden stems inside it.',
        ],
        boundary: SYMBOLIC_BOUNDARY,
    },
    {
        key: 'hidden-stem',
        title: 'Hidden stems',
        system: 'bazi-tcm',
        eyebrow: 'BaZi',
        body: [
            'Stems concealed within an Earthly Branch - typically a dominant one and one '
                + 'or two weaker ones.',
            'They are what makes a BaZi chart deeper than its eight visible characters: '
                + 'elements absent on the surface are often present underneath, and a '
                + 'balance read from the visible characters alone can be misleading.',
        ],
        boundary: SYMBOLIC_BOUNDARY,
    },
    {
        key: 'ten-gods',
        title: 'The Ten Gods',
        system: 'bazi-tcm',
        eyebrow: 'BaZi',
        body: [
            'The ten possible relationships between another stem and the Day Master, '
                + 'grouped into five categories: companion, output, wealth, authority and '
                + 'resource.',
            'The category follows mechanically from the two elements and whether their '
                + 'polarities match. Convention reads output as expression and creativity, '
                + 'wealth as resources and management, authority as structure and '
                + 'obligation, resource as support and learning, companion as peers and '
                + 'self-reliance.',
        ],
        boundary: SYMBOLIC_BOUNDARY,
    },
    {
        key: 'luck-pillars',
        title: 'Luck Pillars',
        system: 'bazi-tcm',
        eyebrow: 'BaZi',
        body: [
            'A sequence of ten-year periods, each with its own stem and branch, '
                + 'stepping forward or backward from the month pillar depending on the year '
                + 'polarity and birth sex.',
            'They are read as a changing backdrop the natal chart passes through, '
                + 'temporarily strengthening or weakening particular elements. They are '
                + 'timing, not character.',
        ],
        boundary: SYMBOLIC_BOUNDARY,
    },
    {
        key: 'tcm-correspondence',
        title: 'TCM correspondence',
        system: 'bazi-tcm',
        eyebrow: 'BaZi',
        body: [
            'Traditional Chinese Medicine maps the same five phases onto organ systems, '
                + 'seasons, flavours, colours and emotions - Wood to spring, Water to '
                + 'winter, and so on.',
            'In this app that mapping is presented as cultural and symbolic material '
                + 'only. It is included because it is part of how the tradition thinks, not '
                + 'as information about a body.',
        ],
        boundary: 'This is cultural and symbolic content. It is not medical '
            + 'information, not a diagnosis, and not health advice of any kind.',
    },
    /* -------------------------------------------------------- human design -- */
    {
        key: 'hd-type',
        title: 'Type',
        system: 'human-design',
        eyebrow: 'Human Design',
        body: [
            'One of five: Manifestor, Generator, Manifesting Generator, Projector, '
                + 'Reflector. It follows mechanically from which centres are defined - '
                + 'chiefly whether the Sacral is defined and whether a motor centre '
                + 'connects to the Throat.',
            'Type is the system’s top-level category and determines Strategy. It '
                + 'is not a personality label; within the system it describes how a person '
                + 'is said to be built to engage with things.',
        ],
        boundary: SYMBOLIC_BOUNDARY,
    },
    {
        key: 'hd-strategy',
        title: 'Strategy',
        system: 'human-design',
        eyebrow: 'Human Design',
        body: [
            'The way each Type is advised to engage: Generators and Manifesting '
                + 'Generators respond, Manifestors inform before acting, Projectors wait for '
                + 'recognition and invitation, Reflectors wait through a lunar cycle.',
            'Strategy is not a separate fact from Type - it follows from it directly, '
                + 'which is why the two always agree.',
        ],
        boundary: SYMBOLIC_BOUNDARY,
    },
    {
        key: 'hd-authority',
        title: 'Authority',
        system: 'human-design',
        eyebrow: 'Human Design',
        body: [
            'Where the system says a decision is best made from, determined by which '
                + 'centres are defined, in a fixed order of precedence: Emotional, then '
                + 'Sacral, then Splenic, then the ego and self-projected forms, then mental '
                + 'or environmental, then lunar.',
            'The common thread is that authority is placed in a bodily or timed signal '
                + 'rather than in reasoning. Reason is given a role - working out logistics '
                + 'and consequences - but not the deciding one.',
        ],
        boundary: SYMBOLIC_BOUNDARY,
    },
    {
        key: 'hd-profile',
        title: 'Profile',
        system: 'human-design',
        eyebrow: 'Human Design',
        body: [
            'Two numbers from 1 to 6, taken from the lines of the Personality Sun and '
                + 'the Design Sun - for example 5/1.',
            'The six lines carry fixed characters: 1 investigator, 2 hermit, 3 martyr, '
                + '4 opportunist, 5 heretic, 6 role model. The first number is read as '
                + 'conscious, the second as unconscious.',
        ],
        boundary: SYMBOLIC_BOUNDARY,
    },
    {
        key: 'hd-definition',
        title: 'Definition',
        system: 'human-design',
        eyebrow: 'Human Design',
        body: [
            'How the defined centres connect. Single definition means every defined '
                + 'centre is joined into one group; split definition means two separate '
                + 'groups, triple split three, and so on.',
            'Splits are read as places where a person’s own wiring does not '
                + 'connect to itself, and where other people or circumstances bridge the '
                + 'gap.',
        ],
        boundary: SYMBOLIC_BOUNDARY,
    },
    {
        key: 'hd-defined-centre',
        title: 'Defined centre',
        system: 'human-design',
        eyebrow: 'Human Design',
        body: [
            'A centre with at least one complete channel running into it. Nine centres '
                + 'exist; any number of them may be defined.',
            'Defined centres are read as consistent - a fixed way that energy or '
                + 'awareness works, which does not depend on who is nearby.',
        ],
        boundary: SYMBOLIC_BOUNDARY,
    },
    {
        key: 'hd-open-centre',
        title: 'Open centre',
        system: 'human-design',
        eyebrow: 'Human Design',
        body: [
            'A centre with no complete channel into it, drawn white on the graph.',
            'Open centres are read as variable rather than absent - the tradition holds '
                + 'that they take in and amplify what is around them. Teachers differ '
                + 'considerably on how to read openness, which is why interpretations of '
                + 'open centres vary more than those of defined ones.',
        ],
        boundary: SYMBOLIC_BOUNDARY,
    },
    {
        key: 'hd-channel',
        title: 'Channel',
        system: 'human-design',
        eyebrow: 'Human Design',
        body: [
            'A line joining two centres, made of two gates - one at each end. A channel '
                + 'is complete only when both gates are activated, and completing it defines '
                + 'both centres it touches.',
            'Channels are what actually build the graph: type, definition and authority '
                + 'all follow from which channels are complete.',
        ],
        boundary: SYMBOLIC_BOUNDARY,
    },
    {
        key: 'hd-gate',
        title: 'Gate',
        system: 'human-design',
        eyebrow: 'Human Design',
        body: [
            'One of 64 positions on the graph, mapped to the 64 hexagrams of the I '
                + 'Ching. A planet sitting in that portion of the zodiac activates the gate.',
            'A single activated gate is half a channel. On its own it is read as a '
                + 'theme present but not wired through; it defines no centre by itself.',
        ],
        boundary: SYMBOLIC_BOUNDARY,
    },
    {
        key: 'hd-variables',
        title: 'Variables',
        system: 'human-design',
        eyebrow: 'Human Design',
        body: [
            'The four arrows shown at the top and bottom of a chart, derived from the '
                + 'colour and tone of the Sun and Nodes on each side: determination, '
                + 'environment, motivation and perspective.',
            'This is advanced material within the system, dependent on very fine '
                + 'positional detail and therefore on a very accurate birth time. It is '
                + 'usually introduced only after type, authority and centres are '
                + 'understood.',
        ],
        boundary: SYMBOLIC_BOUNDARY,
    },
    /* --------------------------------------------------------- cross-pillar -- */
    {
        key: 'convergence',
        title: 'Convergence',
        system: 'cross-pillar',
        eyebrow: 'Cross-pillar',
        body: [
            'When several of the four traditions independently express a similar theme '
                + 'about the same birth data.',
            'The systems take different inputs and were built by unrelated cultures, so '
                + 'agreement between them is notable within this app. What it means is that '
                + 'four ways of organising meaning happen to point the same way - not that '
                + 'anything has been measured or confirmed.',
            'Support is reported as strong, moderate or weak, and by how many separate '
                + 'traditions contribute. Nothing is called strong on one tradition alone.',
        ],
        boundary: 'Agreement between symbolic systems is interpretive convergence. It '
            + 'is not evidence that a trait exists, and these are not independent '
            + 'empirical measurements.',
    },
    {
        key: 'counter-evidence',
        title: 'Counter-evidence',
        system: 'cross-pillar',
        eyebrow: 'Cross-pillar',
        body: [
            'Material from the same chart pointing the opposite way to a theme.',
            'It is kept attached to the theme it argues against rather than hidden, so a '
                + 'pattern is never presented as settled when the reader’s own chart '
                + 'also argues the other side.',
        ],
        boundary: SYMBOLIC_BOUNDARY,
    },
    {
        key: 'true-tension',
        title: 'True tension',
        system: 'cross-pillar',
        eyebrow: 'Cross-pillar',
        body: [
            'Both ends of one opposition carrying real and comparable weight, each '
                + 'supported by more than one tradition, on a pair where holding both at '
                + 'once is genuinely awkward.',
            'It is deliberately rare. Most oppositions are ordinary rather than '
                + 'conflicting, and calling every one of them a contradiction would produce '
                + 'the horoscope cliche of describing everybody as full of contradictions.',
        ],
        boundary: SYMBOLIC_BOUNDARY,
    },
    {
        key: 'contextual-duality',
        title: 'Contextual duality',
        system: 'cross-pillar',
        eyebrow: 'Cross-pillar',
        body: [
            'Both ends of an opposition present, but either one clearly leads, or the '
                + 'pair is one where holding both is unremarkable.',
            'Being analytical in some situations and intuitive in others is not an inner '
                + 'conflict; it is ordinary. This category exists so that ordinary '
                + 'complexity is not dramatised into a paradox.',
        ],
        boundary: SYMBOLIC_BOUNDARY,
    },
    /* ------------------------------------------------------------ body/mind -- */
    {
        key: 'interoception',
        title: 'Interoception',
        system: 'body-mind',
        eyebrow: 'Body and mind',
        body: [
            'Interoception is the ordinary sense of the body’s internal state - '
                + 'heartbeat, breathing, gut sensation, muscular tension. It is a '
                + 'well-described part of how people perceive themselves, and sensitivity to '
                + 'it varies a great deal between individuals.',
            'Several traditions ask a reader to notice a bodily response before '
                + 'reasoning about a choice. Whatever one thinks of the tradition, the '
                + 'instruction is asking for interoceptive attention, and that is a real and '
                + 'trainable thing to do.',
        ],
        boundary: SCIENCE_BOUNDARY,
    },
    {
        key: 'bodily-signal',
        title: 'Bodily decision signals',
        system: 'body-mind',
        eyebrow: 'Body and mind',
        body: [
            'People often register a physical reaction to an option - a lift, a '
                + 'tightening, a flatness - before they can say why. Psychology has studied '
                + 'this under several headings, and there is genuine disagreement about how '
                + 'much such signals should be trusted and when they mislead.',
            'What is not controversial is that the reaction happens and can be noticed. '
                + 'Practices that ask you to separate a first bodily response from the '
                + 'explanation you build afterwards are working with that ordinary '
                + 'experience.',
        ],
        boundary: SCIENCE_BOUNDARY,
    },
    {
        key: 'autonomic-arousal',
        title: 'Autonomic arousal',
        system: 'body-mind',
        eyebrow: 'Body and mind',
        body: [
            'The autonomic nervous system shifts the body between states of activation '
                + 'and settling - changing heart rate, breathing and muscle tone - largely '
                + 'outside voluntary control.',
            'Descriptions of an emotional state that rises and falls over hours, and of '
                + 'waiting for it to settle before deciding, are describing something people '
                + 'do experience. The pattern being real is a separate question from any '
                + 'symbolic system’s account of why it happens.',
        ],
        boundary: SCIENCE_BOUNDARY,
    },
    {
        key: 'cognitive-rationalisation',
        title: 'Rationalisation',
        system: 'body-mind',
        eyebrow: 'Body and mind',
        body: [
            'Rationalisation is the well-documented tendency to construct reasons for a '
                + 'decision after it has effectively been made, and to experience those '
                + 'reasons as having caused it.',
            'This is why several traditions insist on separating a first response from '
                + 'the justification that follows. The distinction is worth making on its '
                + 'own terms, whatever one makes of the system that recommends it.',
        ],
        boundary: SCIENCE_BOUNDARY,
    },
    /* ------------------------------------------------------- the name layer */
    {
        key: 'name-origin',
        title: 'Name origin',
        system: 'given-name',
        eyebrow: 'First names',
        body: [
            'The origin of a given name is the language and culture the word came from '
                + 'before it was a name at all. Most European first names began as ordinary '
                + 'words, or as compounds of them, in Hebrew, Greek, Latin, a Slavic or a '
                + 'Germanic language.',
            'Origin is not the same as popularity or nationality. A name can be Hebrew '
                + 'in origin, Latin in the form that reached Europe, and thoroughly Slovak '
                + 'in the form used today - all three at once, with no contradiction.',
        ],
        boundary: 'Where a name came from is a fact about a word. It says nothing '
            + 'about the character, ability or destiny of anyone who carries it.',
    },
    {
        key: 'name-etymology',
        title: 'Etymology',
        system: 'given-name',
        eyebrow: 'First names',
        body: [
            'Etymology traces the chain of forms a word passed through, each one '
                + 'descending from the last. A form marked with an asterisk is '
                + 'reconstructed: linguists infer it from later evidence, but no one ever '
                + 'wrote it down.',
            'Etymologies come with different degrees of certainty. Some are documented '
                + 'in writing across centuries; others are the best available reconstruction; '
                + 'a few are genuinely contested, with rival proposals that scholarship has '
                + 'not settled between. Each entry says which it is.',
        ],
        boundary: 'An original meaning is what the source word meant, not what the '
            + 'name means today and not a description of its bearer.',
    },
    {
        key: 'name-variant',
        title: 'Variants and related names',
        system: 'given-name',
        eyebrow: 'First names',
        body: [
            'A variant is the same name in another shape: a spelling difference, the '
                + 'form a language settled on, a transliteration out of another script, or '
                + 'a short and affectionate form.',
            'A related name is a different name that shares an ancestor. Peter and Petra '
                + 'are related; they are not the same name, and this app links them rather '
                + 'than merging them.',
            'The distinction matters for lookup. A spelling variant is safe to treat as '
                + 'the same entry; a short form often is not, because the same nickname can '
                + 'belong to several unrelated names.',
        ],
    },
    {
        key: 'name-day',
        title: 'Name day',
        system: 'given-name',
        eyebrow: 'First names',
        body: [
            'In much of Central and Eastern Europe each day of the year is associated '
                + 'with one or more first names, and people are congratulated on their name '
                + 'day much as on a birthday. The custom grew out of church calendars of '
                + 'saints and later became a civil calendar printed in ordinary diaries.',
            'A name day belongs to a COUNTRY, not to a name. The same name is celebrated '
                + 'on different dates in Slovakia, Czechia, Poland and Hungary, because each '
                + 'country keeps its own calendar. There is no universal date, and a name can '
                + 'hold more than one recognised date within a single country.',
            'Some countries have no name-day tradition at all, in which case the question '
                + 'simply does not arise.',
        ],
        boundary: 'A name-day date is a calendar convention. It is not an astrological '
            + 'placement and carries no calculated meaning in this app.',
    },
    {
        key: 'name-folk-etymology',
        title: 'Folk etymology',
        system: 'given-name',
        eyebrow: 'First names',
        body: [
            'A folk etymology is a widely repeated account of where a name comes from '
                + 'that linguistic evidence does not support. They spread easily because they '
                + 'are memorable and because they usually flatter the name.',
            'Where a popular story is common enough that a reader is likely to have met '
                + 'it, this app records it and marks it as unsupported, rather than leaving '
                + 'it unaddressed. Silence would leave whatever someone already believed in '
                + 'place.',
        ],
    },
];
const BY_KEY = new Map(ENTRIES.map((entry) => [entry.key, entry]));
/**
 * One entry in the active language.
 *
 * English is the source of WHICH concepts exist; a locale file only supplies
 * replacement text for keys it has. An untranslated concept therefore renders
 * the complete English entry rather than disappearing, and says so through
 * `fellBackToEnglish` so the panel can be honest about it instead of quietly
 * mixing languages without telling the reader.
 */
export function conceptEntry(key, locale = activeLocale()) {
    const base = BY_KEY.get(key);
    if (!base)
        return null;
    if (locale === FALLBACK_LOCALE)
        return { ...base, fellBackToEnglish: false };
    const translated = conceptTranslation(key, locale);
    if (!translated)
        return { ...base, fellBackToEnglish: true };
    return {
        ...base,
        title: translated.title,
        eyebrow: translated.eyebrow,
        body: translated.body,
        ...(translated.boundary ? { boundary: translated.boundary } : {}),
        fellBackToEnglish: false,
    };
}
/** Concept keys with no entry in a locale. For the coverage test and report. */
export function untranslatedConcepts(locale) {
    if (locale === FALLBACK_LOCALE)
        return [];
    const translated = new Set(conceptTranslationKeys(locale));
    return ENTRIES.map((entry) => entry.key).filter((key) => !translated.has(key));
}
export function allConceptKeys() {
    return [...BY_KEY.keys()];
}
export const CONCEPT_ENTRIES = ENTRIES;
