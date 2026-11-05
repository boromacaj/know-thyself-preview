/*
 * THE SYNTHESIS KNOWLEDGE GUIDE.
 * A short guide, not a library: what each system examines, and the vocabulary the cross-pillar Synthesis uses. It explains how
 * to read references to several calculated factors; it never stands in for the personal Synthesis, which is built from one
 * person's chart.
 *
 * V1.1: checked against the app's synthesis, uncertainty and pillar engines and against public historical and scientific
 * sources; evidence in docs/encyclopedia/research/parts/synthesis.json.
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
        keywords: ['western astrology', 'natal chart', 'birth chart', 'inputs', 'horoscopic astrology'],
        sections: [
            {
                id: 'the-question',
                heading: 'The question it asks',
                paragraphs: [
                    'Astrology treats the birth moment as a snapshot of the solar system seen from a specific place on Earth. The Sun, the Moon and the eight planets (the "ten planets" of astrological usage), the lunar nodes and a few smaller bodies each occupy a sign of the zodiac, fall into one of twelve houses, and stand at measurable angles to one another. The tradition reads each of those facts as a statement about a part of a life: drives, needs, manner, relationships, vocation.',
                    'Of the five systems in the app it is the most spatial. Its vocabulary is about position and geometry - where something is, and what it is facing - and its interpretations are built by combining those positions rather than by looking any single factor up.',
                ],
            },
            {
                id: 'background',
                heading: 'Where it comes from',
                paragraphs: [
                    'The chart-based astrology the app uses took shape in the Hellenistic Mediterranean, with Alexandria a likely centre, from around the second century BCE. It joined Babylonian sky-omen practice and its zodiac to Egyptian and Greek ideas, and its defining step was the rising point on the eastern horizon, the horoskopos or "hour marker", from which the twelve places, later called houses, were counted. Ptolemy\'s Tetrabiblos in the second century CE became a foundation of the Western tradition, which scholars writing in Arabic later carried forward and developed.',
                ],
            },
            {
                id: 'the-data',
                heading: 'What it needs',
                paragraphs: [
                    'Date, time and place of birth. The date alone fixes the signs of the slower planets and, on most days, of the Sun. The Moon completes the zodiac in a little over 27 days, about thirteen degrees a day, so its sign can change during a birth date. The Ascendant, the other angles and every house depend on the exact time and on the latitude and longitude: the rising sign passes through all twelve signs in roughly a day, on average about two hours per sign.',
                    'For that reason the app does not draw a full chart when the birth time is unknown. It leaves out the Ascendant, the Midheaven, the houses and everything derived from them, reads the planets by sign only, and names both signs for a body that changes sign during the birth date (see [[synthesis.guide.birth-time-precision]]).',
                ],
            },
            {
                id: 'its-strengths',
                heading: 'Where it is detailed, and where it is not',
                paragraphs: [
                    'Astrology has an especially developed vocabulary for inner conflict and relationship: an aspect between two planets describes two drives meeting, and the angles describe how a person meets others. It is less specific about practical decision-making, where Human Design speaks more directly, and about the balance of a whole constitution, which is the centre of BaZi\'s method.',
                ],
            },
        ],
        related: ['synthesis.guide.how-the-systems-differ', 'synthesis.pillar.bazi', 'synthesis.guide.birth-time-precision', 'synthesis.guide.symbolic-frameworks'],
    },
    {
        id: 'synthesis.pillar.numerology',
        library: 'synthesis',
        category: 'pillar',
        title: 'What Numerology Examines',
        summary: 'Numerology reduces a birth date and a birth name to a handful of numbers, and reads each number according to the position it occupies.',
        glyph: '7',
        keywords: ['pythagorean numerology', 'life path', 'name numbers', 'balliett'],
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
                id: 'background',
                heading: 'Where it comes from',
                paragraphs: [
                    'The "Pythagorean" label is an attribution rather than a lineage. Ancient Pythagoreans did treat number as a key to the order of things, and Greek and Hebrew writers practised letter-number substitution, but the name-and-birth-date method in the app is modern. It was set out in the United States in the first decade of the twentieth century, above all by Mrs L. Dow Balliett, whose 1904 book presented its number system "as taught by Pythagoras", and it was extended by her students and successors; the word numerology itself is not recorded in English before about 1907.',
                ],
            },
            {
                id: 'the-data',
                heading: 'What it needs',
                paragraphs: [
                    'The full birth name and the birth date. Among the five systems it is the only one that reads the name, and the only natal system that needs neither a birth time nor a birthplace. Its numbers are therefore the same whatever is known about the hour of birth, including for people whose birth time was never recorded. (The app\'s separate note on the origin of a first name is etymology, not numerology, and is kept apart from it.)',
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
        related: ['synthesis.guide.how-the-systems-differ', 'synthesis.pillar.astrology', 'synthesis.guide.reading-multiple-factors', 'synthesis.guide.symbolic-frameworks'],
    },
    {
        id: 'synthesis.pillar.human-design',
        library: 'synthesis',
        category: 'pillar',
        title: 'What Human Design Examines',
        summary: 'Human Design maps two astronomical moments onto a body-shaped chart and reads from it how a person is said to make decisions and use their energy.',
        glyph: '◇',
        keywords: ['bodygraph', 'type', 'authority', 'strategy', 'design moment', 'ra uru hu'],
        sections: [
            {
                id: 'the-question',
                heading: 'The question it asks',
                paragraphs: [
                    'Human Design is a late twentieth-century system. Its founder, Alan Krakower, who taught as Ra Uru Hu, dated it to a mystical experience on Ibiza in 1987, and its own literature describes it as drawing together astrology, the sixty-four hexagrams of the I Ching, the Kabbalistic Tree of Life and the chakra system. The chart it produces, the bodygraph, places planetary positions into gates and channels between nine centres. Its central question is practical rather than descriptive: how does this person reliably decide, and where does their dependable drive come from? Type, Strategy and Authority are its answers.',
                    'Because it describes mechanics - what is defined and consistent, what is open and receptive - it often reads as instructions for living, which is how its practitioners use it. Within this app it is treated like the other systems: an interpretive framework, not a physiological model.',
                ],
            },
            {
                id: 'the-data',
                heading: 'What it needs',
                paragraphs: [
                    'Date, time and place of birth. The chart uses two calculations: the planets at birth, and the planets at the earlier moment when the Sun stood 88 degrees of arc behind its birth position. Because the Sun\'s apparent speed varies slightly through the year, that moment is close to, but not exactly, 88 days earlier - roughly three months - though it is often loosely described as "88 days before birth". A wrong birth time can move a planet across a gate or line boundary and, occasionally, change the Type, Authority or Profile.',
                    'When the birth time is unknown the app does not read a chart drawn for an arbitrary hour. It shows only the mechanics that come out the same at every moment of the birth date and marks the rest as needing a birth time (see [[synthesis.guide.birth-time-precision]]).',
                ],
            },
            {
                id: 'its-strengths',
                heading: 'Where it is detailed, and where it is not',
                paragraphs: [
                    'Its vocabulary for decision-making and for the difference between consistent and borrowed traits is unusually concrete. It says much less than astrology about relationships between drives, and its claims about the body are symbolic; any resemblance to physiology is an analogy (see [[synthesis.guide.symbolic-frameworks]]). Because its planetary positions are astronomical, it shares its raw input with astrology, which matters when the two appear to agree (see [[synthesis.guide.convergence]]).',
                ],
            },
        ],
        related: ['synthesis.guide.how-the-systems-differ', 'synthesis.pillar.astrology', 'synthesis.guide.birth-time-precision', 'synthesis.guide.convergence'],
    },
    {
        id: 'synthesis.pillar.bazi',
        library: 'synthesis',
        category: 'pillar',
        title: 'What BaZi Examines',
        summary: 'BaZi writes the birth moment as eight characters of the Chinese solar calendar and reads the balance of the Five Phases around the Day Master.',
        glyph: '木',
        keywords: ['four pillars', 'day master', 'five phases', 'chinese astrology', 'ziping'],
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
                id: 'background',
                heading: 'Where it comes from',
                paragraphs: [
                    'Chinese tradition credits the Tang scholar Li Xuzhong with a method read from the year, month and day pillars - six characters - and Xu Ziping of the Song dynasty with adding the hour to make eight and with centring the reading on the stem of the day. The approach is still called the Ziping method after him, and the Song-era manual Yuanhai Ziping, revised under the Ming, became one of its standard texts.',
                ],
            },
            {
                id: 'the-data',
                heading: 'What it needs',
                paragraphs: [
                    'Date, time and, for local solar time, place of birth. The year begins at the solar term Li Chun, when the Sun reaches 315 degrees of longitude around 4 February, not on 1 January or at the lunar New Year, and each month begins at one of the twelve "jie" solar terms rather than on a calendar date. In this app the place also corrects the clock to true solar time for the Hour Pillar, while the day itself changes at local civil midnight. Without a birth time the app calculates three pillars and leaves the Hour Pillar unavailable rather than inventing it.',
                ],
            },
            {
                id: 'its-strengths',
                heading: 'Where it is detailed, and where it is not',
                paragraphs: [
                    'Weighing a whole chart - the strength of the Day Master, the season and the interplay of the phases - is the centre of BaZi\'s method, where the other systems tend to read factors one by one before combining them. BaZi is commonly mistaken for the Chinese year animal, which is only the branch of the year pillar, one of its eight characters, and by itself says little.',
                ],
            },
        ],
        related: ['synthesis.guide.how-the-systems-differ', 'synthesis.pillar.astrology', 'synthesis.guide.convergence', 'synthesis.guide.birth-time-precision'],
    },
    {
        id: 'synthesis.pillar.tarot',
        library: 'synthesis',
        category: 'pillar',
        title: 'What Tarot Examines',
        summary: 'Tarot is not calculated from birth data. It is a reflective practice: cards drawn into the positions of a spread frame a question or a day.',
        glyph: '✶',
        keywords: ['tarot reading', 'spread', 'reflection', 'draw', 'rider-waite-smith'],
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
                id: 'background',
                heading: 'The deck the app uses',
                paragraphs: [
                    'The app follows the Rider-Waite-Smith deck, published in London by William Rider and Son in 1909, with imagery drawn by Pamela Colman Smith under the direction of Arthur Edward Waite; both belonged to the Golden Dawn occult tradition. Waite placed Strength at VIII and Justice at XI, swapping the older order to fit the Golden Dawn\'s astrological correspondences, and his numbering is the one used here.',
                ],
            },
            {
                id: 'how-to-use-it',
                heading: 'How it is best read',
                paragraphs: [
                    'As a prompt for reflection rather than a forecast. A card names a possibility, a tension or an attitude; whether it fits is for the person asking to judge. The app draws cards with a cryptographic random source - never from a birth date or the day\'s date - reads cards both upright and reversed, and does not claim that the draw is guided or predictive.',
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
        keywords: ['science', 'evidence', 'belief', 'boundary', 'disclaimer', 'barnum effect', 'forer effect', 'carlson'],
        sections: [
            {
                id: 'the-stance',
                heading: 'The stance this app takes',
                paragraphs: [
                    'Astrology, numerology, Human Design, BaZi and Tarot are presented here as frameworks of meaning, each with a long or internally consistent tradition. The app makes no claim that any of them measures personality or foretells events. What these systems reliably provide is vocabulary: names for patterns, questions to ask, and a structured way of looking at a life from several angles.',
                    'That is also why the articles use phrases such as "the tradition reads" or "is associated with". The phrasing marks where a statement belongs to a system, not to the world.',
                ],
            },
            {
                id: 'the-evidence',
                heading: 'What testing has found',
                paragraphs: [
                    'Astrology is the only one of the five that has been tested often. In a double-blind study published in Nature in 1985, the physicist Shawn Carlson asked astrologers, recruited through a professional astrological body and consulted on the protocol beforehand, to match birth charts to the results of a standard personality inventory; their choices did no better than chance. A 2003 review by Geoffrey Dean and Ivan Kelly gathered decades of such work, including a large study of people born minutes apart who showed none of the resemblance astrology would predict, and found astrologers performing at chance in controlled tests. Its authors did not rule out an effect altogether, but concluded that any effect would have to be very weak or very rare. Astrologers, for their part, have long argued that many tests examine a simplified astrology rather than the practice as it is done, and each side has criticised the other\'s test designs.',
                    'The other systems have received far less formal testing. Reference works that summarise the scientific consensus class numerology and Human Design as pseudoscience, and no controlled study has established that either describes personality. Some objections are old: ancient Greek sceptics such as Carneades already asked why people born at the same moment lead different lives.',
                    'Part of why readings feel accurate is well documented. In 1949 the psychologist Bertram Forer gave students what he said were individual personality sketches; all received the same text, assembled from a newsstand astrology book, and on average they rated it a very good fit. This tendency to accept broad, flattering descriptions as personal, now called the Barnum or Forer effect, applies to any reading, which is one reason the app shows disagreement as well as agreement.',
                ],
            },
            {
                id: 'analogies',
                heading: 'When a symbol resembles science',
                paragraphs: [
                    'Some concepts sit close to real psychology or physiology - a decision that is felt in the body, an emotional state that needs time to settle, a constitution described as warm or cold. Such resemblances can make the experience a symbol points at easier to recognise. They do not make the symbolic system true, and nothing in the library is health advice. BaZi\'s correspondences between the phases and the organs, in particular, are part of a cultural tradition and not medical guidance.',
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
        related: ['synthesis.guide.reference-and-reading', 'synthesis.guide.convergence', 'synthesis.guide.counter-evidence', 'synthesis.pillar.tarot'],
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
                    'Human Design: birth date, time and place, calculated twice - at birth and at the moment, roughly three months earlier, when the Sun stood 88 degrees behind its birth position.',
                    'BaZi: birth date and time in the Chinese solar calendar, where years and months start at solar terms; the place corrects the clock to local solar time for the Hour Pillar.',
                    'Tarot: no birth data; a random draw made at the time of reading.',
                ],
            },
            {
                id: 'questions',
                heading: 'Different questions',
                paragraphs: [
                    'Astrology asks how drives and needs are arranged and how they meet one another. Numerology asks what direction and what rhythm a life carries. Human Design asks how a person decides and where their dependable drive lies. BaZi asks how the self, represented by the Day Master, is balanced within its season and its surrounding phases. Tarot asks what a present situation looks like through a set of images.',
                    'Because the questions differ, many apparent contradictions are statements about different things. A chart can describe a cautious decision style and an adventurous temperament at once without either being wrong: one is about how choices are made, the other about what is wanted. Where two systems really do describe opposite qualities, the Synthesis says so (see [[synthesis.guide.tension]]).',
                ],
            },
            {
                id: 'cultures',
                heading: 'Different origins',
                paragraphs: [
                    'Western astrology descends from Hellenistic practice of the last centuries BCE, later carried forward by scholars writing in Arabic; the Pythagorean numerology in the app is an early twentieth-century American system that borrowed the authority of Greek number philosophy; BaZi comes from Chinese calendrical tradition and took its four-pillar form in the Song dynasty; Human Design dates from 1987; the tarot deck the app uses was published in London in 1909.',
                    'The histories are not all separate. Human Design builds on astrology\'s planetary positions, and the tarot deck\'s designers worked within the same Western occult circles that assigned astrological meanings to the cards. Agreement between BaZi and numerology, which read the birth date by unrelated methods and share no history, is a different kind of agreement from agreement between astrology and Human Design (see [[synthesis.guide.convergence]]).',
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
        keywords: ['agreement', 'support', 'strong', 'moderate', 'weak', 'theme', 'single-system'],
        sections: [
            {
                id: 'what-it-is',
                heading: 'What it means',
                paragraphs: [
                    'Each natal system produces its own descriptions. When, for example, an astrology chart emphasises earth signs, the Life Path is 4 and the Day Master is an Earth stem, three traditions are separately describing something practical and steady. The Synthesis calls that convergence and treats the theme as better supported than one any single system mentions.',
                    'Convergence is graded by two things together: how many separate systems contribute usable evidence, and how much weight that evidence carries once each system\'s own hierarchy has been applied - a Sun sign or a Life Path counts for more than a minor placement. A theme can be called strong only when at least three systems contribute and the combined weight is high; two systems can make it moderate at most; a theme carried by one system is reported as that system\'s own signature, never as a cross-system pattern, however heavily that system argues it.',
                ],
            },
            {
                id: 'how-it-is-counted',
                heading: 'What is counted once',
                paragraphs: [
                    'Several factors inside one system often come from the same root. The Sun sign and the chart\'s element balance are two views of the same planetary positions; Expression, Soul Urge and Personality all come from the one birth name. When such factors make the same claim, the Synthesis counts the heaviest at full weight and gives the rest only a small extra share, so a single root cannot pose as several witnesses.',
                    'Evidence pointing the other way lowers the grade. A theme opposed by more than half as much weight as supports it cannot be called strong, and one opposed at least as heavily as it is supported is held at weak (see [[synthesis.guide.counter-evidence]]). Factors withheld because the birth time is unknown carry no weight and cannot make a system count as contributing.',
                ],
            },
            {
                id: 'what-it-is-not',
                heading: 'What it is not',
                paragraphs: [
                    'Agreement between symbolic systems is a pattern in interpretations, not an independent confirmation. The systems are not measurements and some share inputs - astrology and Human Design both read the planets\' positions at birth, so their agreement is less independent than agreement between, say, numerology and BaZi. A converging theme is a good candidate for reflection, and still only that.',
                ],
            },
            {
                id: 'reading-it',
                heading: 'How to read a converging theme',
                paragraphs: [
                    'Look at which factors carry it. A theme supported by the Sun, the Life Path and the Day Master rests on central factors; one supported by minor placements in each system is thinner even if it spans several systems. The order of themes in the personal reading follows how central and concentrated the support is, not the count of systems alone, and the reading\'s technical details list the contributing factors so that the weight can be judged directly.',
                ],
            },
        ],
        related: ['synthesis.guide.counter-evidence', 'synthesis.guide.tension', 'synthesis.guide.reading-multiple-factors', 'synthesis.guide.how-the-systems-differ'],
    },
    {
        id: 'synthesis.guide.tension',
        library: 'synthesis',
        category: 'guide',
        title: 'Tension Between Systems',
        summary: 'A true tension is a pull in two directions where both sides are well supported and genuinely hard to hold together. The app reserves the term for rare cases.',
        keywords: ['true tension', 'conflict', 'contradiction', 'opposition', 'polarity', 'weak conflict'],
        sections: [
            {
                id: 'what-it-is',
                heading: 'What it means',
                paragraphs: [
                    'Sometimes the systems describe opposite qualities. One part of a chart may point toward caution and another toward appetite for risk; one toward self-reliance and another toward working closely with others. The Synthesis calls this a true tension only when four conditions hold together: the weaker side still carries real weight; the two sides are close to balanced, the weaker at least about three-fifths as heavy as the stronger; the weaker side is argued by at least two different systems; and the pair is one of the oppositions that are genuinely awkward to live at once.',
                    'The app treats only a few pairs as awkward in that sense - caution against risk, structure against adaptability, independence against collaboration, stability against novelty, emotional expression against containment. Pairs such as reflective and outgoing, analytical and intuitive, or private and sociable are treated as ordinary range and never reported as a true tension.',
                ],
            },
            {
                id: 'why-rare',
                heading: 'Why the term is used sparingly',
                paragraphs: [
                    'Nearly everyone combines qualities that sound opposed. Describing every such pair as an inner conflict would make each reading sound dramatic and identical. Most pairs are better described as [[synthesis.guide.contextual-duality|contextual duality]]: two modes used in different settings, or one mode that clearly leads. An opposition whose weaker side is very slight is recorded as a weak conflict and not written about at all.',
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
                    'A chart can contain both ends of a polarity - reflective and outgoing, analytical and intuitive - without that being a problem to solve. The Synthesis uses contextual duality when both ends carry real weight but the pair falls short of a true tension: one side clearly dominates, the weaker side rests on a single system, or the two are qualities people routinely use in different places.',
                    'Someone who is precise in their work and relaxed with friends is not divided; they are adapting. The category exists so that this ordinary range is described as range.',
                ],
            },
            {
                id: 'distinguishing',
                heading: 'Duality or tension?',
                paragraphs: [
                    'The distinction is about cost. A duality is switched between easily; a [[synthesis.guide.tension|true tension]] is felt as friction even when the situation is clear. For the few pairs the app treats as genuinely awkward - such as caution against risk, or structure against adaptability - the same pair can be a duality in one chart and a tension in another, depending on how evenly the two sides are weighted and how many systems argue the weaker one. For ordinary pairs such as reflective and outgoing, the answer is always duality.',
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
        keywords: ['against', 'contrary', 'balance', 'honesty', 'exceptions', 'contested'],
        sections: [
            {
                id: 'what-it-is',
                heading: 'What it means',
                paragraphs: [
                    'A theme assembled from several systems is rarely unanimous. If three factors describe a preference for structure and one describes restlessness with routine, the restless factor is counter-evidence for that theme. The Synthesis keeps it attached to the theme it qualifies.',
                    'Counter-evidence exists only where a theme has a real opposite. A theme about method - structure, caution, independence - can be argued against by its opposite pole. A theme about what a person is drawn to, such as making things or wanting to understand, has no opposite pole, so a system that is silent about it is simply silent, not opposed. A system whose factors were withheld for lack of a birth time is likewise counted as unavailable rather than as disagreeing.',
                ],
            },
            {
                id: 'how-it-is-weighed',
                heading: 'What it changes',
                paragraphs: [
                    'Counter-evidence lowers both the grade and the prominence of a theme. When the weight against a theme exceeds half the weight for it, the theme is marked as contested and cannot be called strong; when the weight against equals or exceeds the weight for, it is held at weak and is better read through the [[synthesis.guide.tension|tension]] between the two sides. A contested theme is still reported, because an argued finding is still a finding.',
                ],
            },
            {
                id: 'why-it-is-kept',
                heading: 'Why it is kept',
                paragraphs: [
                    'Interpretive systems make it easy to find support for almost anything; selecting only agreeing factors would make every theme look certain. Showing the disagreeing material keeps the reading honest about its own weight and gives the reader a more accurate picture: a strong tendency with known exceptions is more recognisable than an absolute trait.',
                    'Counter-evidence can also be where the most specific insight lies. The exception to a pattern often says when or where the pattern does not hold.',
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
                    'Systems rank their own factors. In astrology the Sun, Moon and Ascendant outweigh a minor aspect; in numerology the Life Path outweighs the Birthday; in Human Design Type and Authority outweigh a single gate; in BaZi the Day Master and the season outweigh one hidden stem. The Synthesis follows each system\'s own ranking rather than treating every factor as equal, and a combined statement is usually anchored by the most central factor it names, with the others modifying it.',
                ],
            },
            {
                id: 'how-to-check',
                heading: 'How to check a combined statement',
                list: [
                    'Look up each cited factor in its library and note what it contributes on its own.',
                    'Notice which factors come from the same data: two astrology factors are less independent than an astrology factor and a numerology factor, and the name numbers all come from one name.',
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
        summary: 'Some factors depend on the exact minute of birth and some on the date alone. Knowing which is which explains why parts of a reading can be marked approximate or left out.',
        keywords: ['unknown birth time', 'approximate', 'accuracy', 'noon chart', 'rectification', 'time window'],
        sections: [
            {
                id: 'what-depends-on-time',
                heading: 'What depends on the time',
                list: [
                    'Astrology: the Ascendant, Descendant, Midheaven and every house change quickly - the rising sign moves through all twelve signs in about a day. The Moon\'s sign can change within the date, and so, more rarely, can another planet\'s.',
                    'Human Design: gates and lines of the faster bodies, above all the Moon, and occasionally the Type, Authority or Profile.',
                    'BaZi: the Hour Pillar entirely; on the day of a solar-term change, possibly the Month or Year Pillar.',
                    'Numerology: nothing. Its numbers use the date and the name only.',
                ],
            },
            {
                id: 'how-the-app-handles-it',
                heading: 'How the app handles an unknown time',
                paragraphs: [
                    'The engines need one moment to calculate with, and without a birth time they use 12:00 local time. The app does not treat that moment as an estimate of the birth. It checks every result against the whole birth date and shows only what comes out the same at every hour of it. In astrology that means no Ascendant, Midheaven or houses, the planets read by sign only, and a body that changes sign during the day named in both signs. In Human Design only the mechanics that hold all day are shown, and the rest are marked as needing a birth time. In BaZi the Hour Pillar stays unavailable, and on a solar-term day the Year or Month Pillar is named with both possibilities.',
                    'An approximate time is handled differently. It is treated as the reader\'s best estimate and used as given, and the app checks a window of two hours either side of it: a result that changes within the window is shown as provisional, with the alternatives the window allows, rather than presented as settled.',
                    'A reading built on an unknown or estimated time is still useful for the factors that do not depend on it. The practical rule is to give more weight to date-based factors - the Sun\'s sign, the slower planets, the Life Path, the Day Master - when the time is uncertain.',
                ],
            },
        ],
        related: ['synthesis.pillar.astrology', 'synthesis.pillar.human-design', 'synthesis.pillar.bazi', 'synthesis.guide.reading-multiple-factors'],
    },
];
