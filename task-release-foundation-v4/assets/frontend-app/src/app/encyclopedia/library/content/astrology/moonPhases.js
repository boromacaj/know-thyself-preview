export const ARTICLES = [
    {
        id: 'astrology.moon-phase.new-moon',
        library: 'astrology',
        category: 'moon-phase',
        title: 'New Moon',
        summary: 'The Moon at or near conjunction with the Sun, unlit and unseen. The tradition reads a New Moon birth as instinctive beginnings — acting first and understanding later.',
        keywords: ['new moon', 'dark moon', 'conjunction', 'lunation', 'lunar phase', 'Rudhyar'],
        sections: [
            {
                id: 'core-meaning',
                heading: 'The phase',
                paragraphs: [
                    'A birth phase describes the angle between the Moon and the Sun at birth, measured forward from the Sun along the zodiac. The app divides the 360° cycle into eight spans of 45°, each centred on its defining angle, so a New Moon covers angles from 337.5° to 22.5°. The Sun and Moon stand together, usually in the same sign, and the Moon’s lit face is turned away from Earth.',
                    'Dane Rudhyar’s widely used eight-phase scheme starts each phase at its angle instead of centring on it, so a birth at 30° is a New Moon type in his reading and a Waxing Crescent in the app. Both conventions describe the same continuous cycle.',
                ],
            },
            {
                id: 'interpretation',
                heading: 'How the tradition reads it',
                paragraphs: [
                    'The conjunction fuses purpose and feeling. A New Moon birth is read as spontaneous and subjective: impulses are acted on before their consequences are clear, and a life may feel like a series of fresh starts. The gift is directness and originality; the difficulty is a narrow, self-centred view that only later gains perspective.',
                ],
            },
        ],
        related: ['astrology.moon-phase.waxing-crescent', 'astrology.moon-phase.full-moon', 'astrology.aspect.conjunction', 'astrology.planet.moon', 'astrology.planet.sun'],
    },
    {
        id: 'astrology.moon-phase.waxing-crescent',
        library: 'astrology',
        category: 'moon-phase',
        title: 'Waxing Crescent',
        summary: 'The first thin light after the New Moon, seen low in the west after sunset. The tradition reads it as effort to establish something new against the pull of the past.',
        keywords: ['waxing crescent', 'crescent moon', 'lunar phase', 'Rudhyar crescent'],
        sections: [
            {
                id: 'core-meaning',
                heading: 'The phase',
                paragraphs: [
                    'The Moon has moved between 22.5° and 67.5° ahead of the Sun. A slim crescent appears in the evening sky shortly after sunset, lit on the right as seen from the northern hemisphere and on the left from the southern, with somewhere between about 4% and 31% of the disc illuminated.',
                ],
            },
            {
                id: 'interpretation',
                heading: 'How the tradition reads it',
                paragraphs: [
                    'Lunation-cycle astrology reads the crescent as the stage where a new impulse must assert itself against inertia — old habits, family expectations, the familiar. People born in this phase are described as determined and self-mobilising, with a sense of having to struggle to get something going. The challenge is a backward pull: a tendency to feel held by the past just when momentum is needed.',
                    'The crescent is read as hopeful as well as effortful. Once the first resistance has been overcome, it promises growth that the following phases will test.',
                ],
            },
        ],
        related: ['astrology.moon-phase.new-moon', 'astrology.moon-phase.first-quarter', 'astrology.aspect.semisquare', 'astrology.planet.moon', 'astrology.aspect.sextile'],
    },
    {
        id: 'astrology.moon-phase.first-quarter',
        library: 'astrology',
        category: 'moon-phase',
        title: 'First Quarter',
        summary: 'The Moon a quarter-circle ahead of the Sun, half lit and high at sunset. The tradition reads it as a crisis in action — decisive, building, clearing obstacles.',
        keywords: ['first quarter', 'half moon', 'waxing square', 'lunar phase'],
        sections: [
            {
                id: 'core-meaning',
                heading: 'The phase',
                paragraphs: [
                    'The First Quarter spans angles from 67.5° to 112.5°, centred on the waxing square at 90°. Half the visible disc is lit, and the Moon stands high in the south at sunset in northern latitudes, setting around midnight.',
                ],
            },
            {
                id: 'interpretation',
                heading: 'How the tradition reads it',
                paragraphs: [
                    'At the square, Sun and Moon pull in different directions, and the lunation cycle meets its first real test. Astrologers read a First Quarter birth as a crisis in action: a temperament that likes to make decisions, clear away what is outworn and build structures that will carry an intention forward. Such people are described as strong-willed and often impatient with deliberation.',
                    'The risk the tradition names is force for its own sake — acting to break things rather than to build — and a restlessness that leaves little room for reflection.',
                ],
            },
        ],
        related: ['astrology.moon-phase.waxing-crescent', 'astrology.moon-phase.waxing-gibbous', 'astrology.moon-phase.third-quarter', 'astrology.aspect.square', 'astrology.planet.moon'],
    },
    {
        id: 'astrology.moon-phase.waxing-gibbous',
        library: 'astrology',
        category: 'moon-phase',
        title: 'Waxing Gibbous',
        summary: 'The swelling Moon in the days before Full, more than half lit. The tradition reads it as refinement — analysing, improving and striving toward completion.',
        keywords: ['waxing gibbous', 'gibbous moon', 'lunar phase'],
        sections: [
            {
                id: 'core-meaning',
                heading: 'The phase',
                paragraphs: [
                    'Between 112.5° and 157.5° from the Sun, the Moon is gibbous — more than half lit, but not yet round. It rises in the afternoon and is well up by dusk, its lit portion growing from roughly 70% to over 95%.',
                ],
            },
            {
                id: 'interpretation',
                heading: 'How the tradition reads it',
                paragraphs: [
                    'This is the last stretch before culmination, and lunation-cycle astrology reads it as a phase of perfecting. People born under it are described as analytical and self-questioning, intent on improving a method, a skill or themselves, and drawn to ask why things work as they do. Something is nearly ready, and the impulse is to get it right.',
                    'The traditional caution is perfectionism: revising without end, distrusting the moment of completion, or making the search for meaning so exacting that it becomes anxious.',
                ],
            },
        ],
        related: ['astrology.moon-phase.first-quarter', 'astrology.moon-phase.full-moon', 'astrology.aspect.sesquiquadrate', 'astrology.sign.virgo', 'astrology.planet.moon'],
    },
    {
        id: 'astrology.moon-phase.full-moon',
        library: 'astrology',
        category: 'moon-phase',
        title: 'Full Moon',
        summary: 'The Moon opposite the Sun, its whole face lit, rising at sunset. The tradition reads a Full Moon birth as heightened awareness, relationship and the tension of two clear poles.',
        keywords: ['full moon', 'opposition', 'lunar phase', 'culmination'],
        sections: [
            {
                id: 'core-meaning',
                heading: 'The phase',
                paragraphs: [
                    'The Full Moon covers angles from 157.5° to 202.5°, centred on the opposition. Sun and Moon stand on opposite sides of the Earth, usually in opposite signs; the Moon rises as the Sun sets and is visible all night, its disc fully or almost fully illuminated.',
                ],
            },
            {
                id: 'interpretation',
                heading: 'How the tradition reads it',
                paragraphs: [
                    'The opposition makes purpose and need visible to each other. A Full Moon birth is read as objective and aware, with a strong orientation toward relationship — meaning is found by seeing oneself reflected in others. The cycle has reached its peak of light, and what began at the New Moon is now on display.',
                    'The difficulty is the see-saw of the [[astrology.aspect.opposition|opposition]] itself: a feeling of being pulled between two sides of life, and a tendency to swing between them, or to look to a partner to settle a tension that is one’s own.',
                ],
            },
        ],
        related: ['astrology.moon-phase.new-moon', 'astrology.moon-phase.waning-gibbous', 'astrology.aspect.opposition', 'astrology.house.7', 'astrology.planet.moon'],
    },
    {
        id: 'astrology.moon-phase.waning-gibbous',
        library: 'astrology',
        category: 'moon-phase',
        title: 'Waning Gibbous',
        summary: 'The Moon just past Full, still mostly lit and rising after dark. The tradition, which also calls it the Disseminating phase, reads it as sharing what has been learned.',
        keywords: ['waning gibbous', 'disseminating moon', 'disseminating', 'lunar phase'],
        sections: [
            {
                id: 'core-meaning',
                heading: 'The phase',
                paragraphs: [
                    'Between 202.5° and 247.5° the Moon is shrinking but still more than half lit, the dark edge now on the side that was bright before. It rises in mid-evening and lingers into the morning sky. Illumination falls from about 96% to roughly 70% across the span.',
                ],
            },
            {
                id: 'interpretation',
                heading: 'How the tradition reads it',
                paragraphs: [
                    'Rudhyar’s name for this stretch, Disseminating, captures its traditional reading: the light gathered at the Full Moon is now spread outward. People born in it are described as communicators, teachers and popularisers — eager to pass on an idea, a method or a conviction they have found meaningful.',
                    'The shadow is zeal. Conviction can turn into a need to persuade, and the sense of having something important to say can crowd out listening. Where the Waxing Gibbous refines an idea privately, this phase takes it into public.',
                ],
            },
        ],
        related: ['astrology.moon-phase.full-moon', 'astrology.moon-phase.third-quarter', 'astrology.house.9', 'astrology.planet.mercury', 'astrology.planet.moon'],
    },
    {
        id: 'astrology.moon-phase.third-quarter',
        library: 'astrology',
        category: 'moon-phase',
        title: 'Third Quarter',
        summary: 'The Moon three-quarters of the way round its cycle, half lit and rising around midnight. The tradition reads it as a crisis in consciousness — re-evaluating and turning from what no longer fits.',
        keywords: ['third quarter', 'last quarter', 'waning square', 'half moon', 'lunar phase'],
        sections: [
            {
                id: 'core-meaning',
                heading: 'The phase',
                paragraphs: [
                    'The app calls this the Third Quarter; many almanacs say Last Quarter. It covers angles from 247.5° to 292.5°, centred on the waning square at 270°. Half the disc is lit — the opposite half from the First Quarter — and the Moon rises around midnight and is seen high in the morning sky.',
                ],
            },
            {
                id: 'interpretation',
                heading: 'How the tradition reads it',
                paragraphs: [
                    'Like the First Quarter, this is a square, but formed on the cycle’s way back toward the Sun. Where the waxing square acts to build, the waning square questions what has been built. A Third Quarter birth is read as reflective and principled: inclined to re-evaluate inherited beliefs, to step away from structures that have lost their meaning and to act from inner conviction rather than outer approval.',
                    'The tradition notes the cost: a sense of being out of step, and a habit of quietly withdrawing support from forms that others still depend on.',
                ],
            },
        ],
        related: ['astrology.moon-phase.waning-gibbous', 'astrology.moon-phase.waning-crescent', 'astrology.moon-phase.first-quarter', 'astrology.aspect.square', 'astrology.planet.moon'],
    },
    {
        id: 'astrology.moon-phase.waning-crescent',
        library: 'astrology',
        category: 'moon-phase',
        title: 'Waning Crescent',
        summary: 'The last thin sliver before the New Moon, seen in the east before dawn. The tradition, which calls it the Balsamic phase, reads it as release, completion and preparation for what comes next.',
        keywords: ['waning crescent', 'balsamic moon', 'balsamic', 'lunar phase', 'old moon'],
        sections: [
            {
                id: 'core-meaning',
                heading: 'The phase',
                paragraphs: [
                    'The final span runs from 292.5° to 337.5°, with the Moon closing on the Sun from behind. Only a narrow crescent remains, rising shortly before the Sun and fading into the dawn — lit on the left as seen from the northern hemisphere.',
                ],
            },
            {
                id: 'interpretation',
                heading: 'How the tradition reads it',
                paragraphs: [
                    'Rudhyar called this the Balsamic phase, after the soothing balm that closes a wound. A birth in it is read as oriented toward endings and the future at once: finishing a cycle, distilling what was learned and carrying it into the next. Such people are described as reflective, often solitary, sometimes prophetic, with a sense of serving something that is not yet visible.',
                    'The difficulty is detachment from the present — a feeling of being ahead of, or apart from, ordinary concerns. The tradition links the phase with the [[astrology.house.12|12th house]] for that reason.',
                ],
            },
        ],
        related: ['astrology.moon-phase.third-quarter', 'astrology.moon-phase.new-moon', 'astrology.house.12', 'astrology.aspect.semisextile', 'astrology.planet.moon'],
    },
];
