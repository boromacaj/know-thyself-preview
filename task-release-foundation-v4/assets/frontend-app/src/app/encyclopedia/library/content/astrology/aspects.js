export const ARTICLES = [
    {
        id: 'astrology.aspect.conjunction',
        library: 'astrology',
        category: 'aspect',
        title: 'Conjunction',
        summary: 'Two bodies at the same point of the zodiac (0°). The conjunction fuses two planetary functions so that neither acts without the other.',
        glyph: '☌',
        keywords: ['conjunction', '0 degrees', 'major aspect', 'fusion', 'combust', 'cazimi'],
        sections: [
            {
                id: 'core-meaning',
                heading: 'Core meaning',
                paragraphs: [
                    'A conjunction occurs when two bodies stand at, or close to, the same degree of longitude. It is the first of the major aspects and the most intense, because there is no distance between the parties: the two planets act as one compound function. Venus conjunct Saturn is affection that is serious and slow to trust; Mercury conjunct Mars is thought that wants to win the argument.',
                    'The conjunction has no fixed character of its own. Its tone depends entirely on the planets joined — a meeting of the Moon and Jupiter is expansive and warm, a meeting of Mars and Pluto forceful — which is why the tradition never treated it simply as easy or hard.',
                ],
            },
            {
                id: 'geometry',
                heading: 'Geometry and harmonic',
                paragraphs: [
                    'At 0°, the conjunction belongs to the first harmonic: the whole circle undivided. The app labels its quality fusion. Conjunctions normally fall in a single sign, but near a boundary they can cross it — 29° Pisces and 2° Aries are three degrees apart and count as conjunct, though each planet takes its own sign’s colouring.',
                ],
            },
            {
                id: 'orb',
                heading: 'Orb in the app',
                paragraphs: [
                    'The allowance follows the bodies involved: 8° when the Sun or Moon is one of them, 6° between personal and social planets (Mercury to Saturn), and 4° otherwise. Chiron and the asteroids are held to 4° whatever they meet.',
                ],
            },
            {
                id: 'interpretation',
                heading: 'How it is read',
                paragraphs: [
                    'Traditional astrology gave special attention to planets conjunct the Sun. A planet within about eight degrees is called combust, its significations overpowered by the Sun’s light; one within about a quarter of a degree is cazimi, “in the heart of the Sun”, and held to be strengthened instead. Conjunctions involving three or more bodies form a [[astrology.foundations.stellium-and-emphasis|stellium]], and a conjunction to an angle makes the planet one of the most prominent in the chart.',
                ],
            },
        ],
        related: ['astrology.aspect.opposition', 'astrology.foundations.stellium-and-emphasis', 'astrology.moon-phase.new-moon', 'astrology.planet.sun', 'astrology.aspect.semisextile'],
    },
    {
        id: 'astrology.aspect.sextile',
        library: 'astrology',
        category: 'aspect',
        title: 'Sextile',
        summary: 'Two bodies 60° apart, a sixth of the circle. The sextile links compatible signs and is read as opportunity — cooperation that becomes useful once acted on.',
        glyph: '⚹',
        keywords: ['sextile', '60 degrees', 'major aspect', 'flow', 'opportunity'],
        sections: [
            {
                id: 'core-meaning',
                heading: 'Core meaning',
                paragraphs: [
                    'A sextile joins two planets roughly two signs apart. It is the gentlest of the major aspects: the two functions understand each other and can work together, but they do not merge as in a conjunction or flow automatically as in a trine. Astrologers often describe it as an open door — an ease that shows its value when someone walks through it.',
                ],
            },
            {
                id: 'geometry',
                heading: 'Geometry and harmonic',
                paragraphs: [
                    'Sixty degrees divides the circle by six, placing the sextile in the sixth harmonic. Signs two apart have complementary elements — fire with air, earth with water — and share a polarity, which is why the aspect is read as compatible. The app classes its quality as flow, alongside the trine.',
                    'Sextile Mercury and Venus describes a mind and a sense of taste that support each other — a knack for persuasive or graceful expression that grows with use. Sextile Mars and Saturn is read as effort that knows how to pace itself.',
                ],
            },
            {
                id: 'orb',
                heading: 'Orb in the app',
                paragraphs: [
                    'As a major aspect the sextile allows 8° when the Sun or Moon is involved, 6° between planets from Mercury to Saturn, and 4° for the outer planets and the nodes. Chiron and the asteroids never exceed 4°. Some astrologers use a narrower sextile orb than for other major aspects; the app treats all five majors alike.',
                ],
            },
            {
                id: 'interpretation',
                heading: 'How it is read',
                paragraphs: [
                    'The tradition reads the sextile as talent with a condition attached: it rewards initiative. A chart full of sextiles is described as resourceful and sociable; one with none is not unlucky, but finds its cooperation through other routes.',
                ],
            },
        ],
        related: ['astrology.aspect.trine', 'astrology.aspect.square', 'astrology.foundations.elements', 'astrology.house.11', 'astrology.aspect.quincunx'],
    },
    {
        id: 'astrology.aspect.square',
        library: 'astrology',
        category: 'aspect',
        title: 'Square',
        summary: 'Two bodies 90° apart, a quarter of the circle. The square sets two functions at cross purposes and is read as friction that demands action.',
        glyph: '□',
        keywords: ['square', 'quartile', '90 degrees', 'major aspect', 'tension', 'T-square', 'grand cross'],
        sections: [
            {
                id: 'core-meaning',
                heading: 'Core meaning',
                paragraphs: [
                    'A square joins two planets about three signs apart. The two functions want incompatible things at the same time, and neither can be satisfied by ignoring the other. Sun square Saturn is ambition that keeps meeting obstacles — inner or outer — and grows strong by pushing against them; Moon square Mars is feeling that turns quickly into reaction.',
                ],
            },
            {
                id: 'geometry',
                heading: 'Geometry and harmonic',
                paragraphs: [
                    'Ninety degrees divides the circle by four: the fourth harmonic, which the app labels tension. Signs three apart share a modality — both cardinal, both fixed or both mutable — but their elements do not mix, so the square combines a similar way of acting with different aims. Some astrologers distinguish the waxing square, formed as the faster planet moves away from a conjunction, from the waning square on the way back, following the logic of the Moon’s [[astrology.moon-phase.first-quarter|First Quarter]] and Third Quarter.',
                ],
            },
            {
                id: 'orb',
                heading: 'Orb in the app',
                paragraphs: [
                    '8° when the Sun or Moon is one of the pair, 6° between personal and social planets, 4° otherwise; Chiron and the asteroids are capped at 4°.',
                ],
            },
            {
                id: 'interpretation',
                heading: 'How it is read',
                paragraphs: [
                    'Older astrology counted the square as harmful. Modern practice reads it as the chart’s motor: the aspect most associated with effort, achievement and growth under pressure. Two squares joined by an opposition make a T-square, and four planets in mutual squares and oppositions a grand cross — patterns named by the [[astrology.foundations.modalities|modality]] they occupy.',
                ],
            },
        ],
        related: ['astrology.aspect.opposition', 'astrology.aspect.semisquare', 'astrology.foundations.modalities', 'astrology.aspect.trine', 'astrology.planet.mars'],
    },
    {
        id: 'astrology.aspect.trine',
        library: 'astrology',
        category: 'aspect',
        title: 'Trine',
        summary: 'Two bodies 120° apart, a third of the circle. The trine joins signs of the same element and is read as natural ease — talent that flows without effort.',
        glyph: '△',
        keywords: ['trine', '120 degrees', 'major aspect', 'flow', 'grand trine'],
        sections: [
            {
                id: 'core-meaning',
                heading: 'Core meaning',
                paragraphs: [
                    'A trine links two planets about four signs apart, usually in the same element. The two functions share an outlook, so they support each other without negotiation. Venus trine Jupiter is warmth that comes easily and is easily returned; Mercury trine Saturn is thinking that is patient and well organised by default.',
                ],
            },
            {
                id: 'geometry',
                heading: 'Geometry and harmonic',
                paragraphs: [
                    'One hundred and twenty degrees divides the circle by three, the third harmonic, which the app files under flow. The three signs of an [[astrology.foundations.elements|element]] stand in trine to one another; a planet in each forms a grand trine, a closed triangle of mutual support.',
                ],
            },
            {
                id: 'orb',
                heading: 'Orb in the app',
                paragraphs: [
                    'The trine follows the same major-aspect rule as the others: 8° with a luminary, 6° between personal and social planets, 4° for the rest, and never more than 4° for Chiron or an asteroid.',
                ],
            },
            {
                id: 'interpretation',
                heading: 'How it is read',
                paragraphs: [
                    'Ptolemy and the Hellenistic authors counted the trine as the most harmonious aspect, and modern astrology agrees that it describes gifts — abilities that feel natural because they cost little. The modern caution is that what comes without friction is easily left undeveloped. A chart rich in trines is read as fortunate yet sometimes complacent; one built around squares works harder and often achieves more with what it has.',
                    'Trines are therefore read in context. A trine between two planets that are themselves under strain from a third can act as the outlet that eases the pressure.',
                ],
            },
        ],
        related: ['astrology.aspect.sextile', 'astrology.aspect.square', 'astrology.foundations.elements', 'astrology.planet.jupiter', 'astrology.aspect.conjunction'],
    },
    {
        id: 'astrology.aspect.opposition',
        library: 'astrology',
        category: 'aspect',
        title: 'Opposition',
        summary: 'Two bodies 180° apart, on opposite sides of the zodiac. The opposition stretches two functions into a polarity that asks for awareness and balance.',
        glyph: '☍',
        keywords: ['opposition', '180 degrees', 'major aspect', 'polarity', 'projection'],
        sections: [
            {
                id: 'core-meaning',
                heading: 'Core meaning',
                paragraphs: [
                    'An opposition places two planets face to face across the chart. Unlike the square, whose parties work at cross purposes, the opposition sets them in plain view of each other, each pulling toward its own side. The result is a see-saw: one function dominates, then the other, until the person learns to hold both. Venus opposite Saturn alternates between longing for closeness and wariness of it; Sun opposite Moon divides purpose and need.',
                ],
            },
            {
                id: 'geometry',
                heading: 'Geometry and harmonic',
                paragraphs: [
                    'One hundred and eighty degrees halves the circle — the second harmonic, labelled polarity in the app. Opposite signs share a modality and a polarity, and their elements complement each other: fire faces air, earth faces water. The Full Moon is the sky’s own opposition, the Sun and Moon on either side of the Earth.',
                ],
            },
            {
                id: 'orb',
                heading: 'Orb in the app',
                paragraphs: [
                    'Up to 8° when a luminary is involved, 6° between the planets from Mercury to Saturn, 4° in all other cases; the extended bodies stay within 4°.',
                ],
            },
            {
                id: 'interpretation',
                heading: 'How it is read',
                paragraphs: [
                    'Because it runs along the axis of the [[astrology.house.1|1st]] and [[astrology.house.7|7th]] houses in the natural wheel, the opposition is closely associated with relationship. One side of it is often lived through other people: the planet that feels less like one’s own is met in a partner, a rival or a circumstance. Astrologers describe the work of an opposition as integration — recognising both poles as one’s own — and its gift as perspective, since a person who has managed it can see a question from both ends.',
                ],
            },
        ],
        related: ['astrology.aspect.conjunction', 'astrology.aspect.square', 'astrology.moon-phase.full-moon', 'astrology.house.7', 'astrology.foundations.modalities'],
    },
    {
        id: 'astrology.aspect.semisextile',
        library: 'astrology',
        category: 'aspect',
        title: 'Semisextile',
        summary: 'A minor aspect of 30°, between neighbouring signs. The semisextile links functions that share nothing and is read as a quiet, ongoing adjustment.',
        glyph: '⚺',
        keywords: ['semisextile', 'semi-sextile', '30 degrees', 'minor aspect', 'adjustment'],
        sections: [
            {
                id: 'core-meaning',
                heading: 'Core meaning',
                paragraphs: [
                    'A semisextile joins two planets about one sign apart. Adjacent signs have nothing in common — not element, not modality, not polarity — so the two functions speak different languages while sitting side by side. The aspect is mild: rather than friction or support, it describes a background need to keep adapting one to the other, like neighbours who must share a wall.',
                ],
            },
            {
                id: 'geometry',
                heading: 'Geometry and harmonic',
                paragraphs: [
                    'Thirty degrees is a twelfth of the circle — the twelfth harmonic, which also produces the quincunx at 150°. The app groups the two as adjustment aspects. In the Hellenistic scheme of whole-sign relationships, adjacent signs were said to be averse, unable to see each other; the semisextile gives that blind spot a degree-based form.',
                ],
            },
            {
                id: 'orb',
                heading: 'Orb in the app',
                paragraphs: [
                    'Minor aspects use their own tight orbs, never the major ones. The semisextile is counted only within 2° of exact, so it appears in a chart only when it is close enough to be meaningful.',
                ],
            },
            {
                id: 'interpretation',
                heading: 'How it is read',
                paragraphs: [
                    'Practitioners read the semisextile as incremental growth: a skill or awareness built by small corrections rather than crisis. Moon semisextile Venus might describe comfort and affection that do not quite line up — what soothes is not what delights — and a life that gradually learns to make room for both. Because it is faint, the semisextile is read last, after the five major aspects have been weighed.',
                ],
            },
        ],
        related: ['astrology.aspect.quincunx', 'astrology.aspect.sextile', 'astrology.aspect.conjunction', 'astrology.house.12', 'astrology.house.2'],
    },
    {
        id: 'astrology.aspect.semisquare',
        library: 'astrology',
        category: 'aspect',
        title: 'Semisquare',
        summary: 'A minor aspect of 45°, half a square. The semisquare is read as irritation — a smaller, persistent version of the square’s friction.',
        glyph: '∠',
        keywords: ['semisquare', 'semi-square', 'octile', '45 degrees', 'minor aspect', 'friction'],
        sections: [
            {
                id: 'core-meaning',
                heading: 'Core meaning',
                paragraphs: [
                    'A semisquare joins two planets 45° apart, a sign and a half. It carries the square’s message in a lower voice: the two functions want different things, but the conflict shows as restlessness, impatience or a small recurring snag rather than a defining struggle. Mercury semisquare Mars might be read as speech that is often a little too quick; Sun semisquare Saturn as confidence that needs regular reassurance.',
                ],
            },
            {
                id: 'geometry',
                heading: 'Geometry and harmonic',
                paragraphs: [
                    'Forty-five degrees is an eighth of the circle — the eighth harmonic, obtained by halving the square. It shares that harmonic with the [[astrology.aspect.sesquiquadrate|sesquiquadrate]] at 135°, and the app labels both friction aspects. Because 45° is not a whole number of signs, a semisquare can link signs one or two apart depending on the degrees, so it does not carry a fixed element or modality relationship.',
                ],
            },
            {
                id: 'orb',
                heading: 'Orb in the app',
                paragraphs: [
                    'The semisquare is counted only within 2° of exact — far tighter than any major aspect — so it registers only when it is close.',
                ],
            },
            {
                id: 'interpretation',
                heading: 'How it is read',
                paragraphs: [
                    'Astrologers who use the eighth-harmonic aspects treat them as signals of tension that is easy to overlook precisely because it is not dramatic. The semisquare is read as a nudge toward action: irritation that, once noticed, can be used. Practitioners of the cosmobiology and Uranian schools gave these aspects particular weight; others ignore them altogether, which is one reason the app keeps their orbs tight.',
                ],
            },
        ],
        related: ['astrology.aspect.square', 'astrology.aspect.sesquiquadrate', 'astrology.aspect.opposition', 'astrology.planet.mars', 'astrology.foundations.natal-chart'],
    },
    {
        id: 'astrology.aspect.sesquiquadrate',
        library: 'astrology',
        category: 'aspect',
        title: 'Sesquiquadrate',
        summary: 'A minor aspect of 135°, a square and a half. The sesquiquadrate is read as friction that surfaces under pressure, often in dealings with others.',
        glyph: '⚼',
        keywords: ['sesquiquadrate', 'sesquisquare', 'sesqui-square', '135 degrees', 'minor aspect', 'friction'],
        sections: [
            {
                id: 'core-meaning',
                heading: 'Core meaning',
                paragraphs: [
                    'A sesquiquadrate places two planets 135° apart: a square plus a semisquare. Like its eighth-harmonic sibling, it describes friction that is real but not central — a mismatch that can lie quiet and then flare when circumstances press on it. Venus sesquiquadrate Uranus might be read as affection that periodically chafes against a need for freedom.',
                ],
            },
            {
                id: 'geometry',
                heading: 'Geometry and harmonic',
                paragraphs: [
                    'One hundred and thirty-five degrees is three-eighths of the circle, the eighth harmonic again, and the app files it with the [[astrology.aspect.semisquare|semisquare]] as a friction aspect. Johannes Kepler, in the early seventeenth century, was among the first to argue for angles beyond Ptolemy’s five, and the sesquiquadrate was one of those he proposed. Lying between the trine and the quincunx, it can link signs four or five apart depending on the degrees involved.',
                ],
            },
            {
                id: 'orb',
                heading: 'Orb in the app',
                paragraphs: [
                    'It is counted within 2° of exact, the same tight allowance as the semisextile and semisquare.',
                ],
            },
            {
                id: 'interpretation',
                heading: 'How it is read',
                paragraphs: [
                    'Because it falls past the trine, beyond the halfway point toward the opposition, some astrologers associate the sesquiquadrate with tension met through other people or outside events rather than generated from within. Others simply read it as a softer square. Either way it is a detail to weigh after the major aspects, useful mostly when it repeats a theme the chart already shows.',
                ],
            },
        ],
        related: ['astrology.aspect.semisquare', 'astrology.aspect.square', 'astrology.aspect.trine', 'astrology.aspect.quincunx', 'astrology.planet.uranus'],
    },
    {
        id: 'astrology.aspect.quincunx',
        library: 'astrology',
        category: 'aspect',
        title: 'Quincunx',
        summary: 'A minor aspect of 150°, between signs that share nothing. Also called the inconjunct, it is read as an awkward pairing that calls for continual adjustment.',
        glyph: '⚻',
        keywords: ['quincunx', 'inconjunct', '150 degrees', 'minor aspect', 'adjustment', 'yod'],
        sections: [
            {
                id: 'core-meaning',
                heading: 'Core meaning',
                paragraphs: [
                    'A quincunx joins two planets about five signs apart. Like the semisextile, it links signs with no shared element, modality or polarity, but at a much greater distance, so the two functions neither see each other clearly nor stand in open opposition. The usual description is awkwardness: two needs that cannot be reconciled once and for all and must be managed instead. Moon quincunx Saturn might be read as emotional needs that keep running into a sense of obligation.',
                ],
            },
            {
                id: 'geometry',
                heading: 'Geometry and harmonic',
                paragraphs: [
                    'One hundred and fifty degrees is five-twelfths of the circle, a twelfth-harmonic angle that the app classes with the semisextile as an adjustment aspect. Two planets in sextile that both quincunx a third form a yod, sometimes called the Finger of God — a narrow triangle read as a pointed, demanding theme focused on the planet at its apex.',
                ],
            },
            {
                id: 'orb',
                heading: 'Orb in the app',
                paragraphs: [
                    'The quincunx is the one minor aspect many astrologers read almost as a major one, and the app reflects that with a 3° orb, slightly wider than the 2° allowed for the other minors.',
                ],
            },
            {
                id: 'interpretation',
                heading: 'How it is read',
                paragraphs: [
                    'Practitioners read the quincunx as a call for continual recalibration: changes of habit, priority or attitude that keep two incompatible functions both alive. It is linked in the natural wheel with the 6th and 8th houses, which stand in quincunx to the [[astrology.house.1|1st]], and so with adjustment through work and through shared stakes. Managed well, it is described as flexibility learned the hard way.',
                ],
            },
        ],
        related: ['astrology.aspect.semisextile', 'astrology.aspect.sextile', 'astrology.house.6', 'astrology.house.8', 'astrology.aspect.sesquiquadrate'],
    },
];
