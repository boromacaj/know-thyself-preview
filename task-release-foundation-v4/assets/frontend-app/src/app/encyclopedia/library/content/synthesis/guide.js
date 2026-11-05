/*
 * THE SYNTHESIS KNOWLEDGE GUIDE.
 * A short guide, not a library: what each system examines, and the vocabulary the cross-pillar Synthesis uses. It explains how
 * to read references to several calculated factors; it never stands in for the personal Synthesis, which is built from one
 * person's chart.
 */
export const ARTICLES = [
    /* ------------------------------------------------------------ what each pillar examines */
    {
        id: 'synthesis.pillar.astrology',
        library: 'synthesis',
        category: 'pillar',
        title: 'What Astrology Examines',
        summary: 'Western astrology asks what the sky looked like from one place at one moment, and reads character and timing from the positions it finds.',
        glyph: '☉',
        keywords: ['western astrology', 'natal chart', 'birth chart', 'inputs'],
        sections: [
            {
                id: 'the-question',
                heading: 'The question it asks',
                paragraphs: [
                    'Astrology treats the birth moment as a snapshot of the solar system seen from a specific place on Earth. The ten planets, the lunar nodes and a few smaller bodies each occupy a sign of the zodiac, fall into one of twelve houses, and stand at measurable angles to one another. The tradition reads each of those facts as a statement about a part of a life: drives, needs, manner, relationships, vocation.',
                    'Of the five systems in the app it is the most spatial. Its vocabulary is about position and geometry - where something is, and what it is facing - and its interpretations are built by combining those positions rather than by looking any single factor up.',
                ],
            },
            {
                id: 'the-data',
                heading: 'What it needs',
                paragraphs: [
                    'Date, time and place of birth. The date alone fixes the signs of the slower planets and, most days, of the Sun. The Moon moves about thirteen degrees a day, so its sign can change during a birth date. The Ascendant, the other angles and every house depend on the exact time and the latitude and longitude, which is why a chart with an unknown birth time is marked approximate in the app (see [[synthesis.guide.birth-time-precision]]).',
                ],
            },
            {
                id: 'its-strengths',
                heading: 'Where it is detailed, and where it is not',
                paragraphs: [
                    'Astrology has the richest vocabulary for inner conflict and relationship: an aspect between two planets describes two drives meeting, and the angles describe how a person meets others. It is less specific about practical decision-making, where Human Design speaks more directly, and about the balance of a whole constitution, where BaZi has the more developed method.',
                ],
            },
        ],
        related: ['synthesis.guide.how-the-systems-differ', 'synthesis.pillar.bazi', 'synthesis.guide.birth-time-precision'],
    },
    {
        id: 'synthesis.pillar.numerology',
        library: 'synthesis',
        category: 'pillar',
        title: 'What Numerology Examines',
        summary: 'Numerology reduces a birth date and a birth name to a handful of numbers, and reads each number according to the position it occupies.',
        glyph: '7',
        keywords: ['pythagorean numerology', 'life path', 'name numbers'],
        sections: [
            {
                id: 'the-question',
                heading: 'The question it asks',
                paragraphs: [
                    'Numerology asks what pattern is carried by two things a person is given rather than chooses: the date they were born and the name they were registered with. Each is turned into digits and reduced; the resulting numbers are read as archetypes, from the initiating 1 to the completing 9, with 11, 22 and 33 kept as master numbers in some positions.',
                    'Its distinctive move is position. The same number means different things depending on whether it came from the whole date (the Life Path), the whole name (Expression), the vowels (Soul Urge) or the consonants (Personality). Reading numerology well is mostly a matter of keeping those layers apart.',
                ],
            },
            {
                id: 'the-data',
                heading: 'What it needs',
                paragraphs: [
                    'The full birth name and the birth date. It is the only system in the app that uses the name, and the only natal system that needs neither a birth time nor a birthplace. That makes its numbers exact for everyone, including people whose birth time was never recorded.',
                ],
            },
            {
                id: 'its-strengths',
                heading: 'Where it is detailed, and where it is not',
                paragraphs: [
                    'Numerology is clear about direction and timing: the Life Path describes the terrain a life keeps returning to, and the Personal Year cycle describes a nine-year rhythm. It has little to say about the mechanics of emotion or the body, and its small set of numbers means many people share each one, so its statements are broad by design.',
                ],
            },
        ],
        related: ['synthesis.guide.how-the-systems-differ', 'synthesis.pillar.astrology', 'synthesis.guide.reading-multiple-factors'],
    },
    {
        id: 'synthesis.pillar.human-design',
        library: 'synthesis',
        category: 'pillar',
        title: 'What Human Design Examines',
        summary: 'Human Design maps two astronomical moments onto a body-shaped chart and reads from it how a person is said to make decisions and use their energy.',
        glyph: '◇',
        keywords: ['bodygraph', 'type', 'authority', 'strategy'],
        sections: [
            {
                id: 'the-question',
                heading: 'The question it asks',
                paragraphs: [
                    'Human Design is a twentieth-century system that combines planetary positions with the sixty-four hexagrams of the I Ching and a chart of nine centres. Its central question is practical rather than descriptive: how does this person reliably decide, and where does their sustainable energy come from? Type, Strategy and Authority are its answers.',
                    'Because it describes mechanics - what is defined and consistent, what is open and receptive - it often reads as instructions for living, which is how its practitioners use it. Within this app it is treated like the other systems: an interpretive framework, not a physiological model.',
                ],
            },
            {
                id: 'the-data',
                heading: 'What it needs',
                paragraphs: [
                    'Date, time and place of birth. The chart uses two calculations: the planets at birth, and the planets at the earlier moment when the Sun stood 88 degrees of arc behind its birth position, roughly three months before. A wrong birth time can move a planet across a gate boundary and, occasionally, change the Type or Authority.',
                ],
            },
            {
                id: 'its-strengths',
                heading: 'Where it is detailed, and where it is not',
                paragraphs: [
                    'Its vocabulary for decision-making and for the difference between consistent and borrowed traits is unusually concrete. It says much less than astrology about relationships between drives, and its claims about the body are symbolic; any resemblance to physiology is an analogy (see [[synthesis.guide.symbolic-frameworks]]).',
                ],
            },
        ],
        related: ['synthesis.guide.how-the-systems-differ', 'synthesis.pillar.astrology', 'synthesis.guide.birth-time-precision'],
    },
    {
        id: 'synthesis.pillar.bazi',
        library: 'synthesis',
        category: 'pillar',
        title: 'What BaZi Examines',
        summary: 'BaZi writes the birth moment as eight characters of the Chinese solar calendar and reads the balance of the Five Phases around the Day Master.',
        glyph: '木',
        keywords: ['four pillars', 'day master', 'five phases', 'chinese astrology'],
        sections: [
            {
                id: 'the-question',
                heading: 'The question it asks',
                paragraphs: [
                    'BaZi, the Four Pillars, expresses a birth as four pairs of characters - a Heavenly Stem and an Earthly Branch for the year, month, day and hour. One character, the stem of the day, is taken as the self and called the Day Master; the other seven are interpreted through their relationship to it, through the generating and controlling cycles of Wood, Fire, Earth, Metal and Water.',
                    'Its question is one of balance and season. Is the Day Master supported or stretched by the season it was born into? Which phases are abundant, which are missing, and what follows from that for how a person meets work, wealth, authority and support?',
                ],
            },
            {
                id: 'the-data',
                heading: 'What it needs',
                paragraphs: [
                    'Date, time and, for local solar time, place of birth. The year begins at the solar term Li Chun in early February, not on 1 January, and months begin at solar terms rather than calendar dates. Without a birth time the app calculates three pillars and leaves the Hour Pillar unavailable rather than inventing it.',
                ],
            },
            {
                id: 'its-strengths',
                heading: 'Where it is detailed, and where it is not',
                paragraphs: [
                    'BaZi has the most developed method of the five for weighing a whole chart - strength, season and the interplay of phases. It is commonly mistaken for the Chinese year animal, which is one of its eight characters and by itself says little.',
                ],
            },
        ],
        related: ['synthesis.guide.how-the-systems-differ', 'synthesis.pillar.astrology', 'synthesis.guide.convergence'],
    },
    {
        id: 'synthesis.pillar.tarot',
        library: 'synthesis',
        category: 'pillar',
        title: 'What Tarot Examines',
        summary: 'Tarot is not calculated from birth data. It is a reflective practice: cards drawn into the positions of a spread frame a question or a day.',
        glyph: '✶',
        keywords: ['tarot reading', 'spread', 'reflection', 'draw'],
        sections: [
            {
                id: 'the-question',
                heading: 'A different kind of system',
                paragraphs: [
                    'The four natal systems describe something fixed at birth. Tarot describes nothing fixed: a reading is made from cards drawn now, laid into the positions of a spread, and read together. Its subject is a situation or a question as it stands, which is why it sits beside the natal pillars rather than inside the cross-pillar Synthesis.',
                    'Seventy-eight cards carry a dense, shared symbolic vocabulary - the twenty-two Major Arcana for large movements of a life, the fifty-six Minor Arcana in four suits for its everyday textures. Positions such as past, present and future, or situation, action and outcome, give each card a question to answer.',
                ],
            },
            {
                id: 'how-to-use-it',
                heading: 'How it is best read',
                paragraphs: [
                    'As a prompt for reflection rather than a forecast. A card names a possibility, a tension or an attitude; whether it fits is for the person asking to judge. The app draws cards with a random source and does not claim that the draw is guided or predictive.',
                ],
            },
        ],
        related: ['synthesis.guide.how-the-systems-differ', 'synthesis.guide.symbolic-frameworks', 'synthesis.guide.reference-and-reading'],
    },
    /* ------------------------------------------------------------ reading across systems */
    {
        id: 'synthesis.guide.reference-and-reading',
        library: 'synthesis',
        category: 'guide',
        title: 'Reference and Reading',
        summary: 'The Encyclopedia explains what a factor means in its system, for anyone. A personal reading explains what several factors mean together, for one person.',
        keywords: ['encyclopedia', 'personal reading', 'difference', 'how to use'],
        sections: [
            {
                id: 'two-kinds-of-text',
                heading: 'Two kinds of text',
                paragraphs: [
                    'An Encyclopedia article on the Moon in Virgo is the same for everybody who opens it. It describes the placement as the tradition understands it, in general terms, and could not know anything about the rest of a chart. A personal reading begins from the other end: from one calculated profile, where the Moon in Virgo sits beside a particular Sun, a particular Ascendant, aspects, a Life Path, a Human Design Type and a Day Master.',
                    'The two are written separately and deliberately differ in voice. The articles speak about the factor; the readings speak to the person. Neither is a shorter or longer version of the other.',
                ],
            },
            {
                id: 'why-it-matters',
                heading: 'Why the difference matters',
                paragraphs: [
                    'Most factors are modified by others. A placement described as reserved in general may read quite differently beside a strongly expressive Sun, or in a chart dominated by one phase. Reading only the general meanings of isolated factors tends to produce a list of traits that do not quite fit together; the personal reading exists to do the combining.',
                    'The Encyclopedia is therefore most useful as a glossary beside a reading: to look up a term, to see what a factor means before it was combined, or to read about factors that do not appear in one chart at all.',
                ],
            },
        ],
        related: ['synthesis.guide.reading-multiple-factors', 'synthesis.guide.symbolic-frameworks', 'synthesis.guide.how-the-systems-differ'],
    },
    {
        id: 'synthesis.guide.symbolic-frameworks',
        library: 'synthesis',
        category: 'guide',
        title: 'Symbolic Frameworks, Not Measurements',
        summary: 'All five systems are interpretive traditions. They offer a language for reflection; none of them has been shown to measure personality or predict events.',
        keywords: ['science', 'evidence', 'belief', 'boundary', 'disclaimer'],
        sections: [
            {
                id: 'the-stance',
                heading: 'The stance this app takes',
                paragraphs: [
                    'Astrology, numerology, Human Design, BaZi and Tarot are presented here as frameworks of meaning with long or self-consistent internal traditions. Controlled studies have not found that birth charts or name numbers predict personality, and the app does not claim otherwise. What these systems reliably provide is vocabulary: names for patterns, questions to ask, and a structured way of looking at a life from several angles.',
                    'That is also why the articles use phrases such as "the tradition reads" or "is associated with". The phrasing marks where a statement belongs to a system, not to the world.',
                ],
            },
            {
                id: 'analogies',
                heading: 'When a symbol resembles science',
                paragraphs: [
                    'Some concepts sit close to real psychology or physiology - a decision that is felt in the body, an emotional state that needs time to settle, a constitution described as warm or cold. Such resemblances can make the experience a symbol points at easier to recognise. They do not make the symbolic system true, and nothing in the library is health advice. BaZi’s correspondences between the phases and the organs, in particular, are part of a cultural tradition and not medical guidance.',
                ],
            },
            {
                id: 'using-it-well',
                heading: 'Using the systems well',
                paragraphs: [
                    'The most useful reading of any of them keeps the person in charge. A description that fits is worth thinking about; one that does not fit is information too, and should not be argued into fitting. The cross-pillar Synthesis is built to show disagreement as well as agreement for this reason (see [[synthesis.guide.counter-evidence]]).',
                ],
            },
        ],
        related: ['synthesis.guide.reference-and-reading', 'synthesis.guide.convergence', 'synthesis.pillar.tarot'],
    },
    {
        id: 'synthesis.guide.how-the-systems-differ',
        library: 'synthesis',
        category: 'guide',
        title: 'How the Systems Differ',
        summary: 'The systems use different inputs, come from different cultures and answer different questions. Knowing which question each one asks prevents most confusion.',
        keywords: ['comparison', 'inputs', 'birth time', 'name', 'differences'],
        sections: [
            {
                id: 'inputs',
                heading: 'Different inputs',
                list: [
                    'Numerology: birth date and full birth name. No time or place.',
                    'Astrology: birth date, time and place; the time decides the Ascendant and the houses.',
                    'Human Design: birth date, time and place, calculated twice - at birth and about three months earlier.',
                    'BaZi: birth date and time in the Chinese solar calendar; the place adjusts the clock to local solar time.',
                    'Tarot: no birth data; a draw made at the time of reading.',
                ],
            },
            {
                id: 'questions',
                heading: 'Different questions',
                paragraphs: [
                    'Astrology asks how drives and needs are arranged and how they meet one another. Numerology asks what direction and what rhythm a life carries. Human Design asks how a person decides and where their dependable energy is. BaZi asks how the self, represented by the Day Master, is balanced within its season and its surrounding phases. Tarot asks what a present situation looks like through a set of images.',
                    'Because the questions differ, the systems rarely contradict each other in a strict sense. A chart can describe a cautious decision style and an adventurous temperament at once without either being wrong: one is about how choices are made, the other about what is wanted.',
                ],
            },
            {
                id: 'cultures',
                heading: 'Different origins',
                paragraphs: [
                    'Western astrology descends from Hellenistic and later European practice; Pythagorean numerology from a modern reading of Greek number mysticism; BaZi from Chinese calendrical tradition formalised around the Song dynasty; Human Design from a 1987 synthesis; the tarot deck the app uses from early twentieth-century England. Their agreement, when it occurs, is between traditions with largely separate histories, which is what makes it worth noticing (see [[synthesis.guide.convergence]]).',
                ],
            },
        ],
        related: ['synthesis.pillar.astrology', 'synthesis.pillar.numerology', 'synthesis.pillar.human-design', 'synthesis.pillar.bazi', 'synthesis.pillar.tarot'],
    },
    {
        id: 'synthesis.guide.convergence',
        library: 'synthesis',
        category: 'guide',
        title: 'Convergence',
        summary: 'Convergence is when separate systems, reading the same birth data in their own ways, arrive at a similar theme. It strengthens a theme within the reading; it proves nothing.',
        keywords: ['agreement', 'support', 'strong', 'moderate', 'weak', 'theme'],
        sections: [
            {
                id: 'what-it-is',
                heading: 'What it means',
                paragraphs: [
                    'Each natal system produces its own descriptions. When, for example, an astrology chart emphasises earth signs, the Life Path is 4 and the Day Master is supported by Earth, three traditions are independently describing something practical and steady. The Synthesis calls that convergence and treats the theme as better supported than one any single system mentions.',
                    'Convergence is graded. The app reports support as strong, moderate or weak according to how many separate systems contribute and how central the contributing factors are in each. One system speaking loudly is never enough for a theme to be called strong.',
                ],
            },
            {
                id: 'what-it-is-not',
                heading: 'What it is not',
                paragraphs: [
                    'Agreement between symbolic systems is a pattern in interpretations, not an independent confirmation. The systems are not measurements and some share assumptions - for instance, astrology and Human Design both use planetary positions. A converging theme is a good candidate for reflection, and still only that.',
                ],
            },
            {
                id: 'reading-it',
                heading: 'How to read a converging theme',
                paragraphs: [
                    'Look at which factors carry it. A theme supported by the Sun, the Life Path and the Day Master rests on central factors; one supported by minor placements in each system is thinner even if it spans several systems. The personal Synthesis shows those sources so that the weight can be judged directly.',
                ],
            },
        ],
        related: ['synthesis.guide.counter-evidence', 'synthesis.guide.tension', 'synthesis.guide.reading-multiple-factors'],
    },
    {
        id: 'synthesis.guide.tension',
        library: 'synthesis',
        category: 'guide',
        title: 'Tension Between Systems',
        summary: 'A true tension is a pull in two directions where both sides are well supported and genuinely hard to hold together. The app reserves the term for rare cases.',
        keywords: ['true tension', 'conflict', 'contradiction', 'opposition', 'polarity'],
        sections: [
            {
                id: 'what-it-is',
                heading: 'What it means',
                paragraphs: [
                    'Sometimes the systems describe opposite qualities. One part of a chart may point toward spontaneity and another toward caution; one toward solitude and another toward constant company. The Synthesis calls this a true tension only when three conditions hold: each side has real weight, each side is supported by more than one system, and the two qualities are genuinely difficult to live at the same time.',
                ],
            },
            {
                id: 'why-rare',
                heading: 'Why the term is used sparingly',
                paragraphs: [
                    'Nearly everyone combines qualities that sound opposed. Describing every such pair as an inner conflict would make each reading sound dramatic and identical. Most pairs are better described as [[synthesis.guide.contextual-duality|contextual duality]]: two modes used in different settings.',
                    'When a true tension is reported, it is meant to be specific and useful: a recurring friction worth understanding, not a verdict about a divided character.',
                ],
            },
            {
                id: 'reading-it',
                heading: 'How to read it',
                paragraphs: [
                    'Ask where each side shows up. Tensions are often resolved in practice by time (one side leads in some periods), by domain (one at work, the other at home) or by sequence (one decides, the other acts). The personal reading suggests where the two meet in one chart; the general idea is that a tension describes a negotiation, not a flaw.',
                ],
            },
        ],
        related: ['synthesis.guide.contextual-duality', 'synthesis.guide.convergence', 'synthesis.guide.counter-evidence'],
    },
    {
        id: 'synthesis.guide.contextual-duality',
        library: 'synthesis',
        category: 'guide',
        title: 'Contextual Duality',
        summary: 'Two opposite qualities that coexist without conflict, because one clearly leads or because people ordinarily switch between them by setting.',
        keywords: ['duality', 'both', 'context', 'opposites', 'ordinary complexity'],
        sections: [
            {
                id: 'what-it-is',
                heading: 'What it means',
                paragraphs: [
                    'A chart can contain both ends of a polarity - reflective and outgoing, methodical and improvisational - without that being a problem to solve. The Synthesis uses contextual duality for such pairs when either one side clearly dominates, or the two are the kind of qualities people routinely use in different places.',
                    'Someone who is precise in their work and relaxed with friends is not divided; they are adapting. The category exists so that this ordinary range is described as range.',
                ],
            },
            {
                id: 'distinguishing',
                heading: 'Duality or tension?',
                paragraphs: [
                    'The distinction is about cost. A duality is switched between easily; a [[synthesis.guide.tension|true tension]] is felt as friction even when the situation is clear. The same pair of qualities can be a duality in one chart and a tension in another, depending on how strongly each side is supported.',
                ],
            },
        ],
        related: ['synthesis.guide.tension', 'synthesis.guide.reading-multiple-factors', 'synthesis.guide.convergence'],
    },
    {
        id: 'synthesis.guide.counter-evidence',
        library: 'synthesis',
        category: 'guide',
        title: 'Counter-Evidence',
        summary: 'Factors in the same chart that point against a theme are shown beside it rather than dropped, so no theme is presented as more settled than the chart allows.',
        keywords: ['against', 'contrary', 'balance', 'honesty', 'exceptions'],
        sections: [
            {
                id: 'what-it-is',
                heading: 'What it means',
                paragraphs: [
                    'A theme assembled from several systems is rarely unanimous. If three factors describe a preference for structure and one describes restlessness with routine, the restless factor is counter-evidence for that theme. The Synthesis keeps it attached to the theme it qualifies.',
                ],
            },
            {
                id: 'why-it-is-kept',
                heading: 'Why it is kept',
                paragraphs: [
                    'Interpretive systems make it easy to find support for almost anything; selecting only agreeing factors would make every theme look certain. Showing the disagreeing material keeps the reading honest about its own weight and gives the reader a more accurate picture: a strong tendency with known exceptions is more recognisable than an absolute trait.',
                    'Counter-evidence is also often where the most specific insight lies. The exception to a pattern usually says when or where the pattern does not hold.',
                ],
            },
        ],
        related: ['synthesis.guide.convergence', 'synthesis.guide.symbolic-frameworks', 'synthesis.guide.tension'],
    },
    {
        id: 'synthesis.guide.reading-multiple-factors',
        library: 'synthesis',
        category: 'guide',
        title: 'Reading Several Factors Together',
        summary: 'How to understand a sentence that cites several calculated factors at once: what each contributes, which one leads, and why the combination is not a sum.',
        keywords: ['combination', 'weighting', 'big three', 'hierarchy', 'sources'],
        sections: [
            {
                id: 'why-combinations',
                heading: 'Why readings combine factors',
                paragraphs: [
                    'A single factor is a word; a reading is a sentence. When a personal reading cites, say, a Capricorn Sun, a Life Path 7 and a Splenic Authority together, it is making a claim that none of the three makes alone - perhaps about a careful, private way of reaching decisions. The articles in this library explain each word; the reading is responsible for the sentence.',
                ],
            },
            {
                id: 'which-leads',
                heading: 'Which factor leads',
                paragraphs: [
                    'Systems rank their own factors. In astrology the Sun, Moon and Ascendant outweigh a minor aspect; in numerology the Life Path outweighs the Birthday; in Human Design Type and Authority outweigh a single gate; in BaZi the Day Master and the season outweigh one hidden stem. A combined statement is usually anchored by the most central factor it names, with the others modifying it.',
                ],
            },
            {
                id: 'how-to-check',
                heading: 'How to check a combined statement',
                list: [
                    'Look up each cited factor in its library and note what it contributes on its own.',
                    'Notice which factors come from the same data: two astrology factors are less independent than an astrology factor and a numerology factor.',
                    'Ask whether the combination adds something - a context, a direction, a condition - rather than restating one factor in other words.',
                    'Treat time-sensitive factors with care when the birth time is uncertain ([[synthesis.guide.birth-time-precision]]).',
                ],
            },
        ],
        related: ['synthesis.guide.reference-and-reading', 'synthesis.guide.convergence', 'synthesis.guide.how-the-systems-differ'],
    },
    {
        id: 'synthesis.guide.birth-time-precision',
        library: 'synthesis',
        category: 'guide',
        title: 'Birth Time and Precision',
        summary: 'Some factors depend on the exact minute of birth and some on the date alone. Knowing which is which explains why parts of a reading can be marked approximate.',
        keywords: ['unknown birth time', 'approximate', 'accuracy', 'noon chart', 'rectification'],
        sections: [
            {
                id: 'what-depends-on-time',
                heading: 'What depends on the time',
                list: [
                    'Astrology: the Ascendant, Descendant, Midheaven and every house change quickly - the rising sign moves through all twelve signs in a day. The Moon’s sign can change within the date.',
                    'Human Design: gates and lines of the faster bodies, and occasionally the Type, Authority or Profile.',
                    'BaZi: the Hour Pillar entirely; on the day of a solar-term change, possibly the Month or Year Pillar.',
                    'Numerology: nothing. Its numbers use the date and the name only.',
                ],
            },
            {
                id: 'how-the-app-handles-it',
                heading: 'How the app handles an unknown time',
                paragraphs: [
                    'For astrology the app leaves out the Ascendant, the other angles and the houses when the birth time is unknown, and calculates the planets for local noon; Human Design also uses the noon estimate and marks time-sensitive results as approximate. BaZi leaves the Hour Pillar unavailable rather than guessing it. An approximate birth time is treated as such: where a factor could fall either side of a boundary, the reading says so.',
                    'A reading built on an estimated time is still useful for the factors that do not depend on it. The practical rule is to give more weight to date-based factors - the Sun’s sign, the slower planets, the Life Path, the Day Master - when the time is unknown.',
                ],
            },
        ],
        related: ['synthesis.pillar.astrology', 'synthesis.pillar.human-design', 'synthesis.pillar.bazi', 'synthesis.guide.reading-multiple-factors'],
    },
];
