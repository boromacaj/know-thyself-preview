export const ARTICLES = [
    {
        id: 'astrology.foundations.natal-chart',
        library: 'astrology',
        category: 'foundations',
        title: 'The Natal Chart',
        summary: 'A map of the sky for one moment and one place on Earth: where the Sun, Moon and planets stood in the zodiac and, when the birth time is known, how the horizon and meridian divided that sky into houses.',
        keywords: ['birth chart', 'horoscope', 'nativity', 'chart wheel'],
        sections: [
            {
                id: 'core-meaning',
                heading: 'What a natal chart records',
                paragraphs: [
                    'A natal chart, or birth chart, lists the positions of the Sun, the Moon and the planets along the ecliptic — the apparent yearly path of the Sun — at the moment of birth, as seen from the birthplace. Each body receives a longitude written in signs and degrees, so “Venus at 14° Taurus” is first of all a coordinate. Astrology then reads the coordinates symbolically: bodies stand for kinds of experience, signs for manners, houses for areas of life, and the angles between bodies for how those parts deal with one another.',
                    'The chart is deliberately geocentric: it describes the sky as seen from the ground, which is why the local horizon carries meaning at all.',
                ],
            },
            {
                id: 'layers',
                heading: 'The layers of a chart',
                list: [
                    'Bodies: the ten “planets” of astrological usage — the two luminaries, the five visible planets from Mercury to Saturn, and the three outer planets — together with the lunar nodes.',
                    'Signs: twelve 30° divisions of the [[astrology.foundations.tropical-zodiac|tropical zodiac]], each lending its character to whatever stands in it.',
                    'Angles and houses: the Ascendant, Midheaven and their opposite points, and the twelve houses built from them ([[astrology.foundations.angles]]).',
                    'Aspects: meaningful angular distances between two bodies, from the conjunction to the quincunx.',
                    'Optional bodies: Chiron, Ceres, Pallas, Juno and Vesta, which the app adds only to a timed chart with a birth date between 1890 and 2110.',
                ],
            },
            {
                id: 'birth-data',
                heading: 'What each piece of birth data decides',
                paragraphs: [
                    'The date fixes most planetary signs on its own; Saturn, for instance, lingers about two and a half years in each sign. The Moon is the exception among the classical bodies. It crosses a sign in roughly two and a half days, so a birth on the day of a lunar sign change can leave the Moon’s sign open until the hour is known.',
                    'The time governs everything tied to the Earth’s daily turn. The rising degree completes the full circle of the zodiac in about a day, so the Ascendant, the Midheaven and every house depend on the clock. When no time is given, the app takes local noon as a working reference for the planets, reads any planet that changes sign during the birth day in both signs, and withholds the angles and houses. When the time is an estimate, it checks two hours either side and leaves the houses and chart ruler out if the rising sign changes within that window; [[synthesis.guide.birth-time-precision]] explains why.',
                ],
            },
            {
                id: 'reading',
                heading: 'Reading the chart as a whole',
                paragraphs: [
                    'No single placement amounts to the chart. Practitioners weight repeated themes above isolated details and treat the result as a symbolic portrait, not a forecast. The [[astrology.foundations.big-three]] is a common starting point, not a summary.',
                ],
            },
        ],
        related: ['astrology.foundations.tropical-zodiac', 'astrology.foundations.angles', 'astrology.foundations.house-systems', 'astrology.foundations.big-three', 'synthesis.pillar.astrology', 'synthesis.guide.birth-time-precision'],
    },
    {
        id: 'astrology.foundations.tropical-zodiac',
        library: 'astrology',
        category: 'foundations',
        title: 'The Tropical Zodiac',
        summary: 'The zodiac of Western astrology: twelve equal signs of 30° counted from the March equinox, tied to the seasons of the year rather than to the constellations that lent the signs their names.',
        keywords: ['zodiac', 'equinox', 'precession', 'sidereal zodiac', 'ayanamsa', 'Ophiuchus'],
        sections: [
            {
                id: 'core-meaning',
                heading: 'Twelve sections of the seasonal year',
                paragraphs: [
                    'The zodiac is the belt of sky in which the Sun, Moon and planets appear to travel. The tropical zodiac cuts the ecliptic into twelve equal signs of 30°, beginning where the Sun crosses the celestial equator heading north — the March equinox. That crossing is defined as 0° Aries. The June solstice falls at 0° Cancer, the September equinox at 0° Libra and the December solstice at 0° Capricorn.',
                    'Counted this way, the signs are seasonal divisions. Aries opens spring, Cancer stands at the longest days, Libra at autumn’s balance of light and dark, Capricorn at the turn of winter. That imagery is northern-hemisphere imagery, because the system took shape around the Mediterranean; births south of the equator keep the same signs in the same order even though their seasons run the other way.',
                ],
            },
            {
                id: 'constellations',
                heading: 'Signs and constellations',
                paragraphs: [
                    'The signs were named after star groups that lay roughly along the ecliptic when the system took shape; the tropical and star-based zodiacs nearly coincided some fifteen hundred to two thousand years ago. Since then the equinox point has drifted westward against the stars by about one degree every 72 years, an effect of the slow wobble of the Earth’s axis known as precession. The March equinox now falls among the stars of Pisces, so the sign Aries and the constellation Aries are nearly a full sign apart.',
                    'The constellations also differ in size, and the ecliptic crosses a thirteenth, Ophiuchus. None of this alters the tropical signs, which in this system were never star boundaries: they are twelfths of the year measured from the equinox. The familiar claim that precession makes the signs “wrong” mixes up two separate reference frames.',
                ],
            },
            {
                id: 'other-zodiacs',
                heading: 'Other zodiacs',
                paragraphs: [
                    'Sidereal astrology, including Indian Jyotish, anchors its signs to the fixed stars and subtracts a correction called the ayanamsa from tropical positions. Its size depends on the chosen star reference: the Lahiri value, standard in India since the calendar reform of the 1950s, is now a little over 24°, and Western siderealists often use the slightly different Fagan–Bradley value. A planet at 10° Gemini in the tropical zodiac stands near 16° Taurus in a sidereal one. Each is internally consistent from its own starting point; the app uses the tropical zodiac throughout, for every body and angle.',
                ],
            },
        ],
        related: ['astrology.foundations.natal-chart', 'astrology.foundations.modalities', 'astrology.sign.aries', 'astrology.sign.libra', 'astrology.foundations.elements'],
    },
    {
        id: 'astrology.foundations.elements',
        library: 'astrology',
        category: 'foundations',
        title: 'The Four Elements',
        summary: 'Fire, Earth, Air and Water: four families of three signs set 120° apart, and the oldest way astrology describes a sign’s temperament.',
        keywords: ['triplicity', 'trigon', 'fire signs', 'earth signs', 'air signs', 'water signs', 'element balance'],
        sections: [
            {
                id: 'core-meaning',
                heading: 'Four families of signs',
                paragraphs: [
                    'Every sign belongs to one of four elements, and the three signs of an element lie four signs apart, forming a triangle around the wheel — hence the older name triplicity. Because they stand in trine to one another, signs that share an element are traditionally said to share an outlook, even when their modes of action differ.',
                ],
                list: [
                    'Fire — [[astrology.sign.aries|Aries]], [[astrology.sign.leo|Leo]], [[astrology.sign.sagittarius|Sagittarius]]: initiative, warmth, conviction and an appetite for experience.',
                    'Earth — Taurus, Virgo, Capricorn: the tangible and practical; what can be built, kept, counted and maintained.',
                    'Air — Gemini, Libra, Aquarius: ideas, language, perspective and the connections between people and things.',
                    'Water — Cancer, Scorpio, Pisces: feeling, attachment, memory and responsiveness to what goes unsaid.',
                ],
            },
            {
                id: 'background',
                heading: 'Background',
                paragraphs: [
                    'The four elements go back to Empedocles, and Aristotle gave each two qualities: fire hot and dry, earth cold and dry, air hot and moist, water cold and moist. Ptolemy’s Tetrabiblos describes the same groups as four equilateral triangles of signs, each assigned to ruling planets rather than labelled by element; the elemental names became the usual labels later. Fire and air signs are the masculine or diurnal ones in Ptolemy’s alternating scheme, earth and water the feminine or nocturnal, which is the positive and negative polarity of modern usage. Around the wheel the order runs fire, earth, air, water three times over, so adjacent signs never share an element.',
                ],
            },
            {
                id: 'balance',
                heading: 'Element balance',
                paragraphs: [
                    'Tallying the elements of the planets gives a rough picture of a chart’s temperament. The app counts the ten classical bodies, Sun to Pluto, and leaves out the nodes and asteroids. Many astrologers weight the Sun, Moon and Ascendant above the outer planets, since Uranus, Neptune and Pluto share a sign with everyone born over several years.',
                    'A missing element is read with care. It does not remove that quality from a life; it is more often described as something approached deliberately, learned later, or found through other people. A heavy concentration is read the other way round, as a default setting that can crowd out alternatives.',
                ],
            },
        ],
        related: ['astrology.foundations.modalities', 'astrology.foundations.stellium-and-emphasis', 'astrology.aspect.trine', 'astrology.sign.cancer', 'astrology.sign.capricorn'],
    },
    {
        id: 'astrology.foundations.modalities',
        library: 'astrology',
        category: 'foundations',
        title: 'The Three Modalities',
        summary: 'Cardinal, Fixed and Mutable: the three modes that group the signs by their place within each season and by the way they meet change.',
        keywords: ['qualities', 'quadruplicity', 'cardinal', 'fixed', 'mutable', 'crosses'],
        sections: [
            {
                id: 'core-meaning',
                heading: 'How a sign moves',
                paragraphs: [
                    'The modalities, also called qualities or quadruplicities, run across the elements. Each modality holds one sign of every element, and its four signs sit 90° apart, forming a cross on the wheel. If the element says what a sign cares about, the modality says how it goes about things: by starting, by keeping, or by adjusting.',
                ],
            },
            {
                id: 'seasons',
                heading: 'The seasonal logic',
                paragraphs: [
                    'The grouping mirrors the tropical year. Cardinal signs open the seasons: Aries at the March equinox, Cancer at the June solstice, Libra at the September equinox, Capricorn at the December solstice. Fixed signs — Taurus, Leo, Scorpio, Aquarius — occupy the heart of each season, when it is most settled in its character. Mutable signs — Gemini, Virgo, Sagittarius, Pisces — close each season and loosen it for the next.',
                    'The reasoning is old. Ptolemy called Cancer and Capricorn the tropical signs, where the Sun turns back, and Aries and Libra the equinoctial ones; the signs after them were fixed because the season’s weather was then settled, and the remaining four were bicorporeal, or double-bodied, sharing the nature of the signs on either side. “Cardinal” and “mutable” are the later names for these groups.',
                ],
                list: [
                    'Cardinal: initiating and directing; impatience with whatever has already set.',
                    'Fixed: sustaining and consolidating; reluctance to change course before the change has proved itself.',
                    'Mutable: adapting, translating and distributing; difficulty settling on one form while several still seem possible.',
                ],
            },
            {
                id: 'in-practice',
                heading: 'In practice',
                paragraphs: [
                    'Signs of the same modality square or oppose one another, so a chart with several bodies in one modality is said to carry its typical friction: a cardinal emphasis pulls in more than one direction at once, a fixed one entrenches, a mutable one disperses. The T-square and the grand cross, patterns built from squares and oppositions, are usually named by the modality in which they fall.',
                    'Like the element tally, a modality count describes placements that are already in the chart rather than adding a separate factor. Its use is quick orientation: whether the chart leans toward beginning, holding or adapting.',
                ],
            },
        ],
        related: ['astrology.foundations.elements', 'astrology.aspect.square', 'astrology.aspect.opposition', 'astrology.foundations.tropical-zodiac', 'astrology.sign.gemini'],
    },
    {
        id: 'astrology.foundations.angles',
        library: 'astrology',
        category: 'foundations',
        title: 'The Four Angles',
        summary: 'The Ascendant, Descendant, Midheaven and IC: the points where the horizon and the meridian cross the zodiac. They anchor the houses and depend on the exact time and place of birth.',
        keywords: ['Ascendant', 'Descendant', 'Midheaven', 'MC', 'Medium Coeli', 'IC', 'Imum Coeli', 'rising sign', 'angular'],
        sections: [
            {
                id: 'core-meaning',
                heading: 'Where the chart meets the ground',
                paragraphs: [
                    'The angles turn a list of planetary positions into a map oriented to one spot on Earth. Two great circles do the work. The horizon meets the ecliptic in the east at the Ascendant and in the west at the Descendant. The meridian — the north–south line passing overhead — meets it above at the Midheaven (Medium Coeli, MC) and below at the Imum Coeli (IC).',
                ],
                list: [
                    'Ascendant (ASC): the degree rising in the east. It opens the 1st house and is read as the chart’s point of approach: manner, first response, the way a life is entered.',
                    'Descendant (DSC): the degree setting in the west, directly opposite. It is read through partners and close others, and through what a person meets — or projects — in them.',
                    'Midheaven (MC): the culminating degree of the ecliptic. It is associated with vocation, reputation and the direction a life is aimed in.',
                    'Imum Coeli (IC): the point opposite the Midheaven, beneath the Earth. It is associated with roots, family background and private ground.',
                ],
            },
            {
                id: 'timing',
                heading: 'Why the angles need a birth time',
                paragraphs: [
                    'Because the Earth rotates, every degree of the zodiac rises in turn over a day. The Ascendant moves on average about one degree in four minutes, faster through the signs of short ascension and slower through those of long ascension. A clock error of twenty minutes can shift it several degrees and, near a sign boundary, change the rising sign altogether, so the app does not show angles for an untimed chart.',
                ],
            },
            {
                id: 'with-houses',
                heading: 'Angles and houses',
                paragraphs: [
                    'In quadrant house systems the four angles form the cusps of the 1st, 4th, 7th and 10th houses. In Whole Sign Houses, the app’s default, the Ascendant’s sign becomes the entire 1st house, while the Midheaven floats: it commonly lands in the 9th, 10th or 11th house, at high latitudes even the 8th or 12th, and is read alongside the 10th rather than replacing it. A body within 5° of any angle is reported as angular and is traditionally among the most conspicuous in the chart.',
                ],
            },
        ],
        related: ['astrology.foundations.house-systems', 'astrology.house.1', 'astrology.house.10', 'astrology.house.7', 'synthesis.guide.birth-time-precision'],
    },
    {
        id: 'astrology.foundations.house-systems',
        library: 'astrology',
        category: 'foundations',
        title: 'House Systems',
        summary: 'The twelve houses can be drawn in several ways. The app uses Whole Sign Houses by default and can also compute Equal House, Porphyry and Placidus; every system requires a known birth time.',
        keywords: ['Whole Sign Houses', 'Equal House', 'Porphyry', 'Placidus', 'cusp', 'quadrant houses'],
        sections: [
            {
                id: 'core-meaning',
                heading: 'What a house system decides',
                paragraphs: [
                    'Houses split the chart into twelve areas of life, counted from the eastern horizon downward, so the 1st house lies just below the Ascendant and the 12th just above it. Every system agrees on that order and on what each house signifies. They disagree about where the boundaries, or cusps, fall — and therefore about the house of any planet close to a boundary.',
                ],
            },
            {
                id: 'systems',
                heading: 'The four systems the app knows',
                list: [
                    'Whole Sign: the sign holding the Ascendant is the whole 1st house, the following sign the 2nd, and so on round the wheel. Each house is exactly one sign. Most historians of the subject treat it as the main method of Hellenistic astrology, and it remains standard in Indian astrology; it is the app’s default.',
                    'Equal House: twelve houses of 30° each, measured from the exact Ascendant degree. Houses straddle sign boundaries, and the Midheaven is not tied to the 10th cusp.',
                    'Porphyry: each quadrant between two angles is cut into three equal arcs of the ecliptic, so the angles become the cusps of the 1st, 4th, 7th and 10th houses. It is usually described as the oldest and simplest quadrant system.',
                    'Placidus: named after the seventeenth-century monk Placidus de Titis, it divides the time each degree takes to travel between horizon and meridian into thirds. Widely printed in twentieth-century Western astrology, it has no solution beyond the polar circles, where some degrees never rise or set; there the app reports it unavailable instead of approximating, whereas the widely used Swiss Ephemeris library falls back to Porphyry there with a warning.',
                ],
            },
            {
                id: 'whole-sign-default',
                heading: 'Why Whole Sign by default',
                paragraphs: [
                    'Whole Sign keeps sign and house in step. Once the rising sign is known, the house of every planet follows from its sign alone, and the method behaves identically at every latitude. It also treats the angles as sensitive degrees rather than boundaries, which is why the Midheaven may sit outside the 10th. Quadrant systems, by contrast, value having the angles as cusps; both approaches have long histories and their users.',
                    'Every system starts from the Ascendant, so none can be drawn without a birth time. Whole Sign is the most tolerant of a small clock error, since only the rising sign needs to be right, but the app still withholds houses when the time is unknown.',
                ],
            },
            {
                id: 'history-debate',
                heading: 'A debated history',
                paragraphs: [
                    'The age of Whole Sign Houses is argued over. Translations of Hellenistic authors such as Vettius Valens show houses counted sign by sign from the rising sign, and researchers including James Holden, Robert Hand and Chris Brennan treat the method as the oldest in use; the same authors note that Hellenistic astrologers also knew equal and quadrant divisions, which Valens appears to have used for judging a planet’s strength. Deborah Houlding, a historian of traditional astrology, has argued instead that whole-sign counting was not used as a house system before its modern revival in the 1990s. The app’s choice rests on the method’s simplicity and consistency, not on settling that dispute.',
                ],
            },
            {
                id: 'natural-wheel',
                heading: 'The “natural” houses',
                paragraphs: [
                    'House articles here name a natural sign and planet for each house — the 1st with Aries and Mars, the 2nd with Taurus and Venus, and so on. The sign pairing is old: William Lilly in 1647 lists Aries as a consignificator of the 1st house, Taurus of the 2nd, through Pisces for the 12th. The planet pairing is a modern convention that follows the sign’s ruler; Lilly’s own planetary consignificators ran in the Chaldean order instead, Saturn for the 1st, Jupiter for the 2nd, Mars for the 3rd. Neither pairing changes which house a planet occupies.',
                ],
            },
        ],
        related: ['astrology.foundations.angles', 'astrology.house.1', 'astrology.house.10', 'astrology.foundations.natal-chart', 'synthesis.guide.birth-time-precision'],
    },
    {
        id: 'astrology.foundations.rulership-and-dignity',
        library: 'astrology',
        category: 'foundations',
        title: 'Rulership and Dignity',
        summary: 'Each sign has a ruling planet, and a planet’s standing in a sign is graded by the classical dignities: Domicile, Exaltation, Detriment, Fall — or Peregrine when none applies.',
        keywords: ['rulership', 'domicile', 'exaltation', 'detriment', 'fall', 'peregrine', 'essential dignity', 'modern rulers'],
        sections: [
            {
                id: 'rulership',
                heading: 'Rulership',
                paragraphs: [
                    'Rulership pairs each sign with a planet said to be at home there. The classical scheme used only the seven visible bodies. Ptolemy explains it from the seasons: Cancer and Leo, the most northerly signs and the ones that bring summer heat, went to the Moon and the Sun, and Mercury, Venus, Mars, Jupiter and Saturn each took two signs, laid out symmetrically on either side of that pair in the order of their distance from the luminaries — so cold, remote Saturn received the wintry signs opposite them. After Uranus, Neptune and Pluto were discovered, modern astrology assigned them Aquarius, Pisces and Scorpio. The app follows the modern scheme whenever it names a sign’s ruler or the [[astrology.foundations.chart-ruler]].',
                ],
                list: [
                    'Aries — Mars; Taurus — Venus; Gemini — Mercury; Cancer — Moon.',
                    'Leo — Sun; Virgo — Mercury; Libra — Venus; Scorpio — Pluto (traditionally Mars).',
                    'Sagittarius — Jupiter; Capricorn — Saturn; Aquarius — Uranus (traditionally Saturn); Pisces — Neptune (traditionally Jupiter).',
                ],
            },
            {
                id: 'dignities',
                heading: 'The five conditions',
                list: [
                    'Domicile: the planet occupies a sign it rules and acts on its own terms — Mars in Aries, Venus in Libra.',
                    'Exaltation: a sign where the planet is honoured like a distinguished guest — the Sun in Aries, the Moon in Taurus, Mercury in Virgo, Venus in Pisces, Mars in Capricorn, Jupiter in Cancer, Saturn in Libra.',
                    'Detriment: the sign opposite a domicile, where the planet works by unfamiliar rules — Venus in Aries, Saturn in Cancer.',
                    'Fall: the sign opposite an exaltation, where its customary approach has less purchase — the Sun in Libra, the Moon in Scorpio.',
                    'Peregrine: none of the four applies; the planet is a wanderer, neither supported nor hindered by its sign.',
                ],
            },
            {
                id: 'in-the-app',
                heading: 'How the app applies it',
                paragraphs: [
                    'Dignity is scored only for the seven classical planets, against their traditional domiciles, because Uranus, Neptune and Pluto have no agreed exaltations or falls; they are listed as outside the scheme. The app therefore follows two conventions side by side: modern rulers when it names a chart ruler, traditional domiciles when it grades dignity, so Mars in Scorpio counts as Domicile even though Pluto is named as Scorpio’s ruler. Where a planet holds two conditions in one sign, the app reports the first in the order Domicile, Exaltation, Detriment, Fall: Mercury in Virgo appears as Domicile and Mercury in Pisces as Detriment. The finer dignities of the older texts — triplicity, term and face — differ from one authority to another (Ptolemy already rejected the Egyptian table of terms in favour of his own) and are not scored.',
                    'Detriment and fall are not verdicts of failure. The tradition describes such a planet as working harder, or less conventionally, for its results, while a dignified planet acts more self-evidently. Condition is one factor among house, aspect and prominence.',
                ],
            },
        ],
        related: ['astrology.foundations.chart-ruler', 'astrology.planet.saturn', 'astrology.planet.venus', 'astrology.sign.scorpio', 'astrology.sign.libra'],
    },
    {
        id: 'astrology.foundations.retrograde-motion',
        library: 'astrology',
        category: 'foundations',
        title: 'Retrograde Motion',
        summary: 'Retrograde is a planet’s apparent backward movement through the zodiac as seen from Earth. The app labels every body direct, retrograde or stationary from its actual motion at the birth moment.',
        keywords: ['retrograde', 'direct', 'stationary', 'station', 'Mercury retrograde', 'apparent motion'],
        sections: [
            {
                id: 'core-meaning',
                heading: 'An effect of viewpoint',
                paragraphs: [
                    'All planets move forward in their orbits, but seen from a moving Earth each one periodically appears to slow, halt and slide back through the signs before resuming. The effect resembles a slower car seeming to drift backwards while being overtaken, and it occurs around the time Earth and the planet line up on the same side of the Sun. The Sun and the Moon never appear retrograde.',
                ],
                list: [
                    'Mercury: about three times a year, for roughly three weeks each time.',
                    'Venus: about once every nineteen months, for around six weeks.',
                    'Mars: about once every twenty-six months, for two to two and a half months.',
                    'Jupiter to Pluto: about once a year each, for roughly four months (Jupiter) to five months or a little more (Neptune, Pluto) — so most charts contain at least one retrograde outer planet.',
                ],
            },
            {
                id: 'three-states',
                heading: 'Direct, retrograde, stationary',
                paragraphs: [
                    'The app derives each body’s speed in longitude from its positions twelve hours before and after birth. Forward motion is direct, backward motion retrograde, and a speed below five thousandths of a degree per day is reported as stationary. A stationary planet has just turned or is about to, and the tradition treats it as concentrated and emphatic, its theme held in place.',
                ],
            },
            {
                id: 'interpretation',
                heading: 'How it is read',
                paragraphs: [
                    'A retrograde natal planet is read as working inwardly or by revision: its function is reconsidered, repeated or developed on a private timetable instead of being taken at face value. Mercury retrograde at birth, for example, is often linked with thinking that circles back to a subject from several sides. The planet is not weakened or switched off; its expression takes a less direct route.',
                    'The lunar nodes are a special case. The true node moves backward most of the time, so a retrograde [[astrology.point.north-node|North Node]] is the ordinary condition rather than a feature.',
                ],
            },
        ],
        related: ['astrology.planet.mercury', 'astrology.planet.venus', 'astrology.planet.mars', 'astrology.point.north-node', 'astrology.foundations.natal-chart'],
    },
    {
        id: 'astrology.foundations.big-three',
        library: 'astrology',
        category: 'foundations',
        title: 'The Big Three',
        summary: 'The Sun, Moon and Ascendant: the three placements most often quoted together, each answering a different question about a chart.',
        keywords: ['Sun Moon Rising', 'Sun sign', 'Moon sign', 'rising sign', 'luminaries'],
        sections: [
            {
                id: 'core-meaning',
                heading: 'Three lights and an anchor',
                paragraphs: [
                    'The phrase is modern shorthand, but the emphasis is old: Hellenistic astrologers already gave special weight to the two luminaries and the Ascendant, alongside the Lot of Fortune, when judging a life. Reading the three together is the simplest guard against reducing a chart to its Sun sign.',
                ],
                list: [
                    '[[astrology.planet.sun|The Sun]] — purpose and conscious identity; what a person is growing toward and finds worth being.',
                    '[[astrology.planet.moon|The Moon]] — needs and emotional habit; what brings comfort and how distress is settled.',
                    'The Ascendant — approach and first response; the angle from which the rest of the chart is entered.',
                ],
            },
            {
                id: 'combination',
                heading: 'How they combine',
                paragraphs: [
                    'The three qualify one another rather than adding up. A Capricorn Sun with a Gemini Moon and Leo rising describes a deliberate aim, a restless and talkative inner register, and an open, warm manner of arrival — three layers that tend to show in different settings. When all three share an element the chart is usually described as consistent in tone; when they pull apart, as layered and harder to read from outside.',
                ],
            },
            {
                id: 'birth-time',
                heading: 'Birth time and the three',
                paragraphs: [
                    'Only the Sun is nearly always secure from the date alone. The Moon changes sign roughly every two and a half days; when no birth time is given the app checks its sign across the whole birth day and reads both signs if it changes, and with an estimated time it checks two hours either side. The Ascendant passes through all twelve signs in a day and always needs the time. Beyond the three, the [[astrology.foundations.chart-ruler]] and any planet on an angle can be just as prominent, which is why practitioners treat the Big Three as an entry point rather than a portrait.',
                ],
            },
        ],
        related: ['astrology.planet.sun', 'astrology.planet.moon', 'astrology.foundations.angles', 'astrology.foundations.chart-ruler', 'synthesis.guide.reading-multiple-factors'],
    },
    {
        id: 'astrology.foundations.chart-ruler',
        library: 'astrology',
        category: 'foundations',
        title: 'The Chart Ruler',
        summary: 'The planet that rules the sign on the Ascendant. The app uses modern rulership, so Scorpio, Aquarius and Pisces rising take Pluto, Uranus and Neptune as chart rulers.',
        keywords: ['ruler of the Ascendant', 'ruling planet', 'lord of the Ascendant', 'almuten'],
        sections: [
            {
                id: 'core-meaning',
                heading: 'The lord of the rising sign',
                paragraphs: [
                    'If the Ascendant is the doorway into the chart, the chart ruler is the planet that owns the house beyond it. Tradition gives that planet a general significance for the whole life: its sign, house, aspects and condition are followed more closely than those of other planets, and its themes are expected to recur.',
                ],
            },
            {
                id: 'finding-it',
                heading: 'How it is found',
                paragraphs: [
                    'The ruler follows directly from the rising sign: Libra rising gives Venus, Sagittarius rising gives Jupiter. The app applies modern rulership consistently, so a Scorpio Ascendant gives Pluto, Aquarius gives Uranus and Pisces gives Neptune. Traditional astrologers would name Mars, Saturn and Jupiter for those three, and some read both; that is a choice of convention, not something the chart itself can settle.',
                    'Because it hangs on the rising sign, the chart ruler is only as reliable as the birth time.',
                ],
            },
            {
                id: 'reading',
                heading: 'Reading the ruler',
                paragraphs: [
                    'The ruler’s house is often read as where a life’s attention gravitates: a ruler in the [[astrology.house.10|10th]] tilts the personality toward public work, one in the [[astrology.house.4|4th]] toward home and lineage. Its sign gives the manner, its aspects what supports or complicates it, and its motion matters too, since the app reports whether the ruler is direct, retrograde or stationary.',
                    'When the ruler is the Sun or Moon, it doubles a light already central to the [[astrology.foundations.big-three]]. When it is a slow outer planet, as the modern scheme allows, it ties a personal chart to a placement shared by a whole generation — one reason some practitioners keep the traditional rulers for this purpose.',
                ],
            },
        ],
        related: ['astrology.foundations.rulership-and-dignity', 'astrology.foundations.angles', 'astrology.foundations.big-three', 'astrology.planet.pluto', 'astrology.house.1'],
    },
    {
        id: 'astrology.foundations.stellium-and-emphasis',
        library: 'astrology',
        category: 'foundations',
        title: 'Stellium and Emphasis',
        summary: 'A stellium is three or more bodies in one sign or one house. Alongside element and modality counts, angular planets and hemisphere balance, it shows where a chart’s weight falls.',
        keywords: ['stellium', 'satellitium', 'emphasis', 'angular planets', 'concentration'],
        sections: [
            {
                id: 'core-meaning',
                heading: 'Concentration in a chart',
                paragraphs: [
                    'Ten main bodies spread over twelve signs leave most signs with one occupant or none. When three or more gather in a single sign or house, the cluster is called a stellium, and that sign or house is read as a concentrated theme — a region of life the chart keeps returning to. The app uses three as its threshold; definitions vary between authors, so it always states how many bodies are involved.',
                    'Clusters are not equal. One that holds the Sun, the Moon or the chart ruler weighs more than one made mostly of slow outer planets, which can travel together for years and appear in the charts of everyone born in that stretch.',
                ],
            },
            {
                id: 'other-measures',
                heading: 'Other measures of emphasis',
                list: [
                    'Element and modality balance — the share of the ten classical bodies in each element and mode ([[astrology.foundations.elements]], [[astrology.foundations.modalities]]).',
                    'Angular planets — any body within 5° of the Ascendant, Descendant, Midheaven or IC, traditionally among the most visible in a chart.',
                    'Hemisphere balance — whether bodies collect above or below the horizon, east or west of the meridian ([[astrology.foundations.hemispheres]]).',
                    'Dignity — a planet in domicile or exaltation stands out for its condition rather than its position.',
                ],
            },
            {
                id: 'interpretation',
                heading: 'Reading emphasis',
                paragraphs: [
                    'Emphasis is a matter of proportion, not a verdict. A sign stellium tends to colour style and temperament; a house stellium points to a field of activity; in Whole Sign Houses the two coincide, since each house is one sign. A strong concentration is also read for what it leaves bare: unoccupied houses still carry meaning, expressed through their rulers rather than through residents.',
                ],
            },
        ],
        related: ['astrology.foundations.elements', 'astrology.foundations.modalities', 'astrology.foundations.hemispheres', 'astrology.aspect.conjunction', 'synthesis.guide.reading-multiple-factors'],
    },
    {
        id: 'astrology.foundations.hemispheres',
        library: 'astrology',
        category: 'foundations',
        title: 'Hemispheres',
        summary: 'The horizon and the meridian divide a chart into halves — above and below, east and west. Counting the planets in each half is a broad, long-standing measure of a chart’s orientation.',
        keywords: ['hemisphere emphasis', 'eastern hemisphere', 'western hemisphere', 'upper hemisphere', 'lower hemisphere', 'chart shape'],
        sections: [
            {
                id: 'core-meaning',
                heading: 'Two lines, four halves',
                paragraphs: [
                    'The horizon line, from Ascendant to Descendant, splits the chart into an upper half — the sky over the birthplace — and a lower half beneath the Earth. The meridian, from Midheaven to IC, splits it into an eastern half around the Ascendant and a western half around the Descendant. Since angles and houses require a birth time, so does any hemisphere count.',
                ],
            },
            {
                id: 'names',
                heading: 'A note on the names',
                paragraphs: [
                    'The upper half is conventionally called the southern hemisphere of the chart and the lower half the northern. The names reflect an observer in northern latitudes, for whom the midday Sun stands due south; charts are drawn with that southern sky at the top. In house terms the upper half is houses 7 to 12 and the lower half houses 1 to 6, while the eastern half runs from the 10th through the 3rd and the western from the 4th through the 9th.',
                    'The app counts the ten classical bodies by their Whole Sign house, so its figures follow house boundaries rather than the exact degrees of the angles.',
                ],
            },
            {
                id: 'readings',
                heading: 'How the halves are read',
                list: [
                    'Upper (southern): life in view — public roles, other people, the wider world.',
                    'Lower (northern): private ground — inner life, home, personal resources and routine.',
                    'Eastern: self-started action; matters set going from the person’s own side of the chart.',
                    'Western: relationship and response; matters shaped by what others bring.',
                ],
            },
            {
                id: 'weighing',
                heading: 'Weighing it',
                paragraphs: [
                    'A seven-to-three split is suggestive and a ten-to-nothing split striking, but most charts are mixed. Hemisphere emphasis is background orientation, read together with what the planets are and where the luminaries fall; practitioners do not treat it as a measure of introversion or extraversion.',
                ],
            },
        ],
        related: ['astrology.foundations.angles', 'astrology.foundations.stellium-and-emphasis', 'astrology.foundations.house-systems', 'astrology.house.10', 'astrology.house.4'],
    },
];
