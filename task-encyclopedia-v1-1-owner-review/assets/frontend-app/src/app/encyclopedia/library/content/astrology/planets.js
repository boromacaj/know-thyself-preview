export const ARTICLES = [
    /* ------------------------------------------------------------------ the ten planets */
    {
        id: 'astrology.planet.sun',
        library: 'astrology',
        category: 'planet',
        title: 'The Sun',
        summary: 'The central light of the chart. The Sun stands for purpose, vitality and the conscious sense of self — the identity a person is building toward.',
        glyph: '☉',
        keywords: ['Sun', 'luminary', 'Sol', 'Helios', 'Sun sign', 'identity'],
        sections: [
            {
                id: 'core-meaning',
                heading: 'Core meaning',
                paragraphs: [
                    'Every other body in the sky is lit by the Sun, and astrology treats it accordingly: as the centre of the personality, the source of will, and the sense of direction that organises the rest of the chart. Its sign describes the style of that central purpose, its house the area of life in which a person seeks to become recognisably themselves, and its aspects the planets that support, test or complicate it.',
                    'Traditional astrology read the Sun as the conscious, daytime self — the role a person grows into and would like to be known for — and gave the body, habit and need to the Moon. A strong Sun is read as confidence and clarity of aim; a pressured one as a self that has to be found through effort.',
                ],
            },
            {
                id: 'symbolism',
                heading: 'Sky and symbol',
                paragraphs: [
                    'The glyph ☉, a circle with a point at its centre, is among the oldest astronomical marks; astrologers read it as spirit concentrated within the whole. From Earth the Sun appears to advance close to one degree daily, about a month per sign, which is why the Sun sign is the placement nearly everyone knows: it depends only on the date. It never appears retrograde.',
                    'Solar figures across cultures — Ra, Helios, Apollo, Sol Invictus — share the attributes the tradition gives the planet: sovereignty, visibility, warmth that sustains life, and a gaze from which nothing is hidden.',
                ],
            },
            {
                id: 'characteristics',
                heading: 'At a glance',
                list: [
                    'Domicile: [[astrology.sign.leo|Leo]]; exaltation: Aries',
                    'Detriment: Aquarius; fall: Libra',
                    'Cycle: one year round the zodiac, about thirty days per sign',
                    'Orb: 8° for major aspects, the widest the app allows',
                    'Keywords: identity, purpose, vitality, will, authority, recognition',
                ],
            },
            {
                id: 'signs-houses',
                heading: 'Through signs and houses',
                paragraphs: [
                    'By sign the Sun shows how purpose is pursued: in Taurus by building something that lasts, in Gemini by learning and exchange, in Scorpio by depth and commitment. By house it shows where: a 10th-house Sun seeks standing in public life, a 4th-house Sun forms its identity within family and home, a 12th-house Sun comes into its own away from the public gaze. The series beginning with the [[astrology.sun.aries|Sun in Aries]] takes each sign in turn.',
                ],
            },
            {
                id: 'expressions',
                heading: 'Constructive and difficult expressions',
                paragraphs: [
                    'Well integrated, the Sun appears as self-respect, generosity, creative confidence and the ability to lead without needing to dominate. Under strain it becomes pride and a hunger for affirmation — or the opposite, a self so unsure that it borrows identity from others. The tradition also links the Sun with fathers and figures of authority, read symbolically as the models from which a person learns what standing in their own light looks like.',
                ],
            },
            {
                id: 'misconceptions',
                heading: 'Common misconceptions',
                paragraphs: [
                    'The commonest error is to treat the Sun sign as a full description. The Sun is one of ten bodies and four angles, and a person whose Moon, Ascendant and several planets share another sign may resemble that sign more. Nor is the Sun “the ego” in a pejorative sense; it stands for the healthy capacity to have a centre at all.',
                ],
            },
        ],
        related: ['astrology.sign.leo', 'astrology.planet.moon', 'astrology.foundations.big-three', 'astrology.sun.aries', 'astrology.house.5', 'astrology.moon-phase.new-moon'],
    },
    {
        id: 'astrology.planet.moon',
        library: 'astrology',
        category: 'planet',
        title: 'The Moon',
        summary: 'The chart’s second light. The Moon stands for needs, emotional habit and the rhythms of the body — what brings comfort, and how a person responds before thinking.',
        glyph: '☽',
        keywords: ['Moon', 'luminary', 'Luna', 'Selene', 'Moon sign', 'emotions'],
        sections: [
            {
                id: 'core-meaning',
                heading: 'Core meaning',
                paragraphs: [
                    'Where the Sun is purpose, the Moon is response. It describes instinctive reactions, the conditions in which a person feels safe, the habits laid down in early life and the way distress is settled. Astrologers read it as the private self that shows at home, under pressure and when tired — often more recognisable to intimates than the Sun.',
                    'Because the Moon reflects light instead of producing it, the tradition linked it with receptivity, memory and the body. The Sun ruled the day and the Moon the night, and Hellenistic astrologers gave the Moon priority in a night birth as the light of that sect.',
                ],
            },
            {
                id: 'symbolism',
                heading: 'Cycle and symbol',
                paragraphs: [
                    'The Moon is the fastest body in the chart, crossing a sign in about two and a half days and the whole zodiac in about 27.3 days. Its phases, the 29.5-day round from new to full and back, gave the oldest calendars their months and give each chart a [[astrology.moon-phase.full-moon|birth phase]]. The glyph ☽ is the crescent. Lunar deities — Selene, Artemis, Hecate in her three aspects, the moon gods of Mesopotamia — gather the same themes: cycles, fertility, tides and night.',
                    'Its speed means that a birth on the day of a sign change needs a time to settle the Moon’s sign; without one, the app reads the Moon in both signs rather than pick the noon value. Like the Sun, the Moon never turns retrograde.',
                ],
            },
            {
                id: 'characteristics',
                heading: 'At a glance',
                list: [
                    'Domicile: [[astrology.sign.cancer|Cancer]]; exaltation: Taurus',
                    'Detriment: Capricorn; fall: Scorpio',
                    'Cycle: about 27.3 days round the zodiac; 29.5 days from one new moon to the next',
                    'Orb: 8° for major aspects, as a luminary',
                    'Keywords: needs, feeling, habit, memory, care, belonging',
                ],
            },
            {
                id: 'signs-houses',
                heading: 'Through signs and houses',
                paragraphs: [
                    'The Moon’s sign describes what it needs and how it soothes itself: in Aries, to act on a feeling at once; in Taurus, steadiness and physical comfort; in Aquarius, room to think a feeling over before showing it. Its house shows where emotional security is sought, and its aspects how readily feeling cooperates with the rest of the chart — Moon–Saturn contacts are read as emotional caution, Moon–Jupiter as an open, generous response. The series beginning with the [[astrology.moon.aries|Moon in Aries]] treats each sign separately.',
                ],
            },
            {
                id: 'in-practice',
                heading: 'The Moon in practice',
                paragraphs: [
                    'At its best the Moon gives emotional intelligence, the ability to nurture and be nurtured, and a reliable sense of what is needed. Under strain it shows as moodiness, dependence, habits that once protected and now confine, or needs kept hidden because they were once unwelcome. The tradition associates the Moon with the mother and early care, read symbolically as the first model of what comfort looks like.',
                ],
            },
            {
                id: 'misconceptions',
                heading: 'Common misconceptions',
                paragraphs: [
                    'The Moon is sometimes treated as a secondary, “inner” Sun sign. It answers a different question: not who a person is becoming, but what they need in order to feel safe enough to become it. Someone can identify strongly with their Sun and still recognise their Moon most clearly in their reactions.',
                ],
            },
        ],
        related: ['astrology.sign.cancer', 'astrology.planet.sun', 'astrology.foundations.big-three', 'astrology.moon.aries', 'astrology.house.4', 'astrology.moon-phase.full-moon'],
    },
    {
        id: 'astrology.planet.mercury',
        library: 'astrology',
        category: 'planet',
        title: 'Mercury',
        summary: 'The planet of mind and communication: how a person perceives, thinks, learns, speaks, trades and links one thing with another.',
        glyph: '☿',
        keywords: ['Mercury', 'Hermes', 'communication', 'intellect', 'Mercury retrograde'],
        sections: [
            {
                id: 'core-meaning',
                heading: 'Core meaning',
                paragraphs: [
                    'Mercury governs the functions that move information about: perception, speech, writing, calculation, learning, negotiation and the many small exchanges of a day. In the chart it describes the style of thinking — fast or slow, literal or associative, sceptical or imaginative — and the means by which a person makes sense of the world and explains it to others.',
                    'Mercury has no fixed temperament of its own. The tradition calls it convertible: it takes on the colour of its sign and of the planets it aspects, as a messenger carries whatever message it is handed.',
                ],
            },
            {
                id: 'symbolism',
                heading: 'Messenger and trickster',
                paragraphs: [
                    'The innermost planet never strays more than about 28° from the Sun, so it always occupies the Sun’s sign or one of its neighbours. It turns retrograde about three times a year, which makes a retrograde Mercury common in birth charts. Its namesake, the Roman Mercury or Greek Hermes, guided travellers and the souls of the dead, protected merchants and thieves alike, and invented the lyre. The glyph ☿ stacks crescent, circle and cross — read as mind, spirit and matter — and recalls the god’s winged cap.',
                ],
            },
            {
                id: 'characteristics',
                heading: 'At a glance',
                list: [
                    'Domicile: [[astrology.sign.gemini|Gemini]] and [[astrology.sign.virgo|Virgo]]; exaltation: Virgo',
                    'Detriment: Sagittarius and Pisces; fall: Pisces',
                    'Cycle: about a year round the zodiac, with three retrograde periods',
                    'Orb: 6° for major aspects, 8° with the Sun or Moon',
                    'Keywords: thought, speech, learning, trade, skill, adaptability',
                ],
            },
            {
                id: 'signs-houses',
                heading: 'Through signs and houses',
                paragraphs: [
                    'In its own signs Mercury is at ease: quick and verbal in Gemini, exact and analytical in Virgo. In fire signs it is persuasive and impatient with detail; in water signs it reasons through feeling and memory; in Pisces, its fall, through images rather than definitions. By house it shows where the mind is busiest — the 3rd for local contacts and study, the 6th for practical problem-solving, the 9th for large ideas. Aspects colour the thinking: Saturn makes it careful, Uranus inventive, Neptune intuitive.',
                ],
            },
            {
                id: 'expressions',
                heading: 'Constructive and difficult expressions',
                paragraphs: [
                    'A well-supported Mercury shows as clarity, wit, adaptability and a facility with words or numbers. Under strain it becomes nervousness, overthinking, glibness or difficulty getting thoughts into words. Because it adapts so readily, Mercury can also be turned to justify almost anything — the trickster side of the messenger.',
                ],
            },
            {
                id: 'misconceptions',
                heading: 'Common misconceptions',
                paragraphs: [
                    'Mercury describes a style of mind, not a level of intelligence. A slow, deliberate Mercury in Taurus is no less able than a quick one in Gemini; it learns differently. And a natal Mercury retrograde, whatever its popular reputation, is not a fault: the tradition reads it as reflective thought that returns to its subjects ([[astrology.foundations.retrograde-motion]]).',
                ],
            },
        ],
        related: ['astrology.sign.gemini', 'astrology.sign.virgo', 'astrology.house.3', 'astrology.foundations.retrograde-motion', 'astrology.house.6'],
    },
    {
        id: 'astrology.planet.venus',
        library: 'astrology',
        category: 'planet',
        title: 'Venus',
        summary: 'The planet of attraction, value and harmony: what a person loves, finds beautiful and wants to keep close, and how they relate, please and make peace.',
        glyph: '♀',
        keywords: ['Venus', 'Aphrodite', 'lesser benefic', 'morning star', 'evening star', 'love'],
        sections: [
            {
                id: 'core-meaning',
                heading: 'Core meaning',
                paragraphs: [
                    'Venus describes the capacity to attract and be attracted — to people, objects, ideas and places — and the values that make one thing more desirable than another. It governs affection, pleasure, taste, art, money in the sense of what is prized, and the social graces that let people cooperate. In a chart it shows what a person finds lovable and how they go about loving.',
                    'The tradition called Venus the lesser benefic, a planet whose influence is generally pleasant and reconciling, beside Jupiter as the greater. Its gifts are ease and harmony; its risk is that ease slides into indulgence or avoidance.',
                ],
            },
            {
                id: 'symbolism',
                heading: 'Morning star and evening star',
                paragraphs: [
                    'Venus is the brightest planet and never stands more than about 47° from the Sun, so it appears either before dawn as the morning star or after sunset as the evening star. Over eight years its meetings with the Sun trace a nearly regular five-pointed figure around the zodiac, a rhythm tracked by Babylonian and Maya sky-watchers alike. It turns retrograde roughly every nineteen months for about six weeks. Inanna, Ishtar, Aphrodite and the Roman Venus — goddesses of love, beauty and sometimes war — gave it its name; the glyph ♀ is often read as a hand mirror.',
                ],
            },
            {
                id: 'characteristics',
                heading: 'At a glance',
                list: [
                    'Domicile: [[astrology.sign.taurus|Taurus]] and [[astrology.sign.libra|Libra]]; exaltation: Pisces',
                    'Detriment: Scorpio and Aries; fall: Virgo',
                    'Cycle: about a year round the zodiac; 584 days from one solar conjunction to the next of the same kind',
                    'Orb: 6° for major aspects, 8° with the Sun or Moon',
                    'Keywords: love, beauty, value, pleasure, harmony, cooperation',
                ],
            },
            {
                id: 'signs-houses',
                heading: 'Through signs and houses',
                paragraphs: [
                    'Venus shows a different face in each of its two signs: sensual and loyal in Taurus, sociable and aesthetic in Libra. In Aries it is ardent and quick; in Capricorn reserved and committed; in Pisces, its exaltation, devoted without limit. Its house shows where pleasure and affection are sought — through comfort and possessions in the 2nd, partnership in the 7th, friendship and groups in the 11th. Aspects show how love sits beside other drives; Venus–Mars contacts are read as a close tie between affection and desire.',
                ],
            },
            {
                id: 'expressions',
                heading: 'Constructive and difficult expressions',
                paragraphs: [
                    'At its best Venus gives warmth, taste, diplomacy and the ability to enjoy life and share the enjoyment. Under strain it can become vanity, people-pleasing, indulgence, or reluctance to face any conflict that threatens comfort. In its detriments, Aries and Scorpio, the tradition reads Venus as loving on less gentle terms — directly, or intensely — rather than as not loving at all.',
                ],
            },
            {
                id: 'misconceptions',
                heading: 'Common misconceptions',
                paragraphs: [
                    'Venus is not only about romance. It describes all valuing — friendship, art, money, a well-made object — and in many charts its clearest expression is aesthetic or social. Nor does it denote gender; every chart has a Venus, and it describes a function rather than a role.',
                ],
            },
        ],
        related: ['astrology.sign.taurus', 'astrology.sign.libra', 'astrology.planet.mars', 'astrology.house.7', 'astrology.house.2', 'astrology.foundations.rulership-and-dignity'],
    },
    {
        id: 'astrology.planet.mars',
        library: 'astrology',
        category: 'planet',
        title: 'Mars',
        summary: 'The planet of drive, desire and assertion: how a person goes after what they want, defends themselves, competes and acts under pressure.',
        glyph: '♂',
        keywords: ['Mars', 'Ares', 'lesser malefic', 'the red planet', 'assertion'],
        sections: [
            {
                id: 'core-meaning',
                heading: 'Core meaning',
                paragraphs: [
                    'Mars is the chart’s engine of action. It describes desire turned into effort, the capacity to hold a boundary, the readiness to compete or fight, and the nerve to act when acting has a cost. Where Venus attracts, Mars pursues. Its sign shows how a person goes after things, its house where effort and conflict collect, and its aspects what feeds or provokes it.',
                    'Traditional astrology called Mars the lesser malefic, a planet of heat, cuts and separation, and valued it all the same: without Mars nothing is defended, finished or decided. Modern astrology tends to read it more neutrally, as healthy self-assertion.',
                ],
            },
            {
                id: 'symbolism',
                heading: 'The red planet',
                paragraphs: [
                    'Mars is the first planet beyond Earth, and its rust colour made it the war god’s star in many cultures: Nergal in Babylon, Ares in Greece, Mars in Rome, where the god also guarded fields and boundaries. It circles the zodiac in about two years, usually spending six or seven weeks in a sign, but when it turns retrograde — roughly every twenty-six months — it can stay in one sign for half a year. The glyph ♂ shows a shield and spear.',
                ],
            },
            {
                id: 'characteristics',
                heading: 'At a glance',
                list: [
                    'Domicile: [[astrology.sign.aries|Aries]], and traditionally [[astrology.sign.scorpio|Scorpio]]; exaltation: Capricorn',
                    'Detriment: Libra and Taurus; fall: Cancer',
                    'Cycle: about two years round the zodiac',
                    'Orb: 6° for major aspects, 8° with the Sun or Moon',
                    'Keywords: drive, desire, courage, anger, competition, initiative',
                ],
            },
            {
                id: 'signs-houses',
                heading: 'Through signs and houses',
                paragraphs: [
                    'In Aries Mars acts at once and in the open; in Scorpio, its traditional night home, it works strategically and holds on. Exalted in Capricorn it becomes disciplined force; in fall in Cancer it fights hardest when protecting others or a feeling. In its detriments, Libra and Taurus, it acts through negotiation or stubborn endurance rather than attack. By house, Mars shows where a person works hardest and meets most friction — ambition in the 10th, daily work in the 6th, open conflict with partners in the 7th.',
                ],
            },
            {
                id: 'expressions',
                heading: 'Constructive and difficult expressions',
                paragraphs: [
                    'Integrated, Mars gives vigour, decisiveness, courage, sexual vitality and the ability to stand up for oneself and others. Under strain it becomes impatience, anger and recklessness — or the opposite, a blocked drive that curdles into frustration. Many astrologers read a difficult Mars less as aggression than as desire that has not been acknowledged.',
                ],
            },
            {
                id: 'misconceptions',
                heading: 'Common misconceptions',
                paragraphs: [
                    'Mars is not simply violence. It is the planet of any decisive act — a surgeon’s incision, an athlete’s effort, a clear refusal — and a chart with a muted Mars can find it hard to want things openly. Nor is it a masculine planet in any exclusive sense; it describes a function present in every chart.',
                ],
            },
        ],
        related: ['astrology.sign.aries', 'astrology.sign.scorpio', 'astrology.planet.venus', 'astrology.house.1', 'astrology.foundations.retrograde-motion', 'astrology.aspect.square'],
    },
    {
        id: 'astrology.planet.jupiter',
        library: 'astrology',
        category: 'planet',
        title: 'Jupiter',
        summary: 'The planet of growth, meaning and faith: where life expands, what a person believes, and how they look for opportunity, generosity and understanding.',
        glyph: '♃',
        keywords: ['Jupiter', 'Zeus', 'greater benefic', 'Jupiter return', 'expansion'],
        sections: [
            {
                id: 'core-meaning',
                heading: 'Core meaning',
                paragraphs: [
                    'Jupiter enlarges what it touches. It is associated with growth, abundance, education, law, religion, travel and philosophy — every activity that widens a horizon or gives events a meaning. In the chart it describes where a person finds opportunity and good will, how beliefs are formed, and in what way a person is generous or excessive.',
                    'Traditional astrology called Jupiter the greater benefic, the most fortunate of the planets. Its gifts are optimism, protection and trust; its risk is surplus — overconfidence, waste, promises that outrun their means.',
                ],
            },
            {
                id: 'symbolism',
                heading: 'King of the gods',
                paragraphs: [
                    'The largest planet takes nearly twelve years to circle the zodiac and spends about a year in each sign, which fits its cycle neatly to the twelve signs and to the stages of a life: Jupiter returns to its birth position around the ages of 12, 24, 36 and so on. Marduk in Babylon, Zeus in Greece and Jupiter in Rome — kings of the gods, upholders of order and of the laws of hospitality — gave the planet its character. The glyph ♃ is read by astrologers as a crescent raised above the cross of matter, or as a stylised Z for Zeus; NASA’s notes on planetary symbols repeat an older explanation, a hieroglyph of Jove’s eagle.',
                ],
            },
            {
                id: 'characteristics',
                heading: 'At a glance',
                list: [
                    'Domicile: [[astrology.sign.sagittarius|Sagittarius]], and traditionally [[astrology.sign.pisces|Pisces]]; exaltation: Cancer',
                    'Detriment: Gemini and Virgo; fall: Capricorn',
                    'Cycle: about twelve years, one year per sign',
                    'Orb: 6° for major aspects as a social planet, 8° with the Sun or Moon',
                    'Keywords: growth, faith, wisdom, generosity, opportunity, excess',
                ],
            },
            {
                id: 'signs-houses',
                heading: 'Placement and aspects',
                paragraphs: [
                    'Everyone born in the same year shares Jupiter’s sign, so its house and aspects say more about the individual. In the 2nd house it is read as ease with resources; in the 9th, its natural place, as a strong pull toward study, travel or belief; in the 7th, as benefit through partners. Exalted in Cancer it grows through care and family; in fall in Capricorn it measures its generosity. Its aspects enlarge the other planet — with Mercury it broadens thought, with Venus it amplifies warmth and pleasure.',
                ],
            },
            {
                id: 'expressions',
                heading: 'Constructive and difficult expressions',
                paragraphs: [
                    'Jupiter working well shows as optimism, generosity, ethical seriousness and a knack for finding the larger meaning in a setback. Under strain it inflates: self-righteousness, overcommitment, carelessness with resources, and the belief that rules are for other people. The tradition adds that Jupiter’s protection is real but not unconditional — what comes easily is just as easily squandered.',
                ],
            },
            {
                id: 'misconceptions',
                heading: 'Common misconceptions',
                paragraphs: [
                    'Jupiter is often called simply “lucky”. In the tradition its fortune follows from trust and openness, a readiness to say yes, and even a well-placed Jupiter needs effort to bear fruit. Growth also includes growing pains: Jupiter can enlarge a difficulty as readily as a gift.',
                ],
            },
        ],
        related: ['astrology.sign.sagittarius', 'astrology.sign.pisces', 'astrology.house.9', 'astrology.planet.saturn', 'astrology.sign.cancer'],
    },
    {
        id: 'astrology.planet.saturn',
        library: 'astrology',
        category: 'planet',
        title: 'Saturn',
        summary: 'The planet of structure, limits and time: where a person meets responsibility, discipline and difficulty, and what they build slowly through effort.',
        glyph: '♄',
        keywords: ['Saturn', 'Kronos', 'greater malefic', 'Saturn return', 'discipline'],
        sections: [
            {
                id: 'core-meaning',
                heading: 'Core meaning',
                paragraphs: [
                    'Saturn is the planet of boundaries — the walls that protect and the walls that confine. It describes duty, authority, time, discipline, fear and mastery: everything learned through repetition and patience. In the chart it shows where life feels demanding or restricted, and where, given time, a person builds the most durable competence.',
                    'The tradition called Saturn the greater malefic, planet of cold, scarcity and delay. Modern astrology often recasts it as a teacher whose lessons are slow and sometimes hard, but whose reward is authority that is genuinely earned.',
                ],
            },
            {
                id: 'symbolism',
                heading: 'The edge of the visible',
                paragraphs: [
                    'For most of history Saturn marked the boundary of the planetary system, the slowest wanderer visible to the naked eye. It takes about 29.5 years to circle the zodiac, spending around two and a half years in each sign, and its return to its birth position near the ages of 29 and 58 is one of the best-known milestones in astrology. Its mythic figures — Kronos, who devoured his children, and the Roman Saturn of sowing and the golden age — join harvest and time to the fear of loss. The glyph ♄ is a sickle, or the cross of matter set over a crescent.',
                ],
            },
            {
                id: 'characteristics',
                heading: 'At a glance',
                list: [
                    'Domicile: [[astrology.sign.capricorn|Capricorn]], and traditionally [[astrology.sign.aquarius|Aquarius]]; exaltation: Libra',
                    'Detriment: Cancer and Leo; fall: Aries',
                    'Cycle: about 29.5 years, two and a half years per sign',
                    'Orb: 6° in major aspects (social planet); 8° when a luminary is involved',
                    'Keywords: structure, responsibility, limits, time, discipline, mastery',
                ],
            },
            {
                id: 'signs-houses',
                heading: 'Through signs and houses',
                paragraphs: [
                    'In Capricorn or Aquarius Saturn is read as at home with responsibility; exalted in Libra it becomes fairness and commitment; in fall in Aries it is a struggle between caution and the urge to act alone. By house it marks where a person feels most tested — money in the 2nd, commitment in the 7th, career and authority in the 10th. Its aspects slow and steady the planets they touch: with the Moon they suggest emotional reserve, with Mercury careful thought, with Venus serious and durable affection.',
                ],
            },
            {
                id: 'expressions',
                heading: 'Constructive and difficult expressions',
                paragraphs: [
                    'A well-integrated Saturn gives reliability, patience, realism and authority earned rather than assumed. Under strain it becomes rigidity, pessimism, fear of failure, harsh self-judgement or a need to control. Many astrologers observe that Saturn’s difficulties concentrate early in life and ease with age, as the structures it demands are gradually built.',
                ],
            },
            {
                id: 'misconceptions',
                heading: 'Common misconceptions',
                paragraphs: [
                    'Saturn is not a curse. The old word “malefic” described its quality — cold, slow, limiting — not a moral verdict, and a strong Saturn is often the backbone of a chart. Restriction in one area frequently marks the very place where mastery develops.',
                ],
            },
        ],
        related: ['astrology.sign.capricorn', 'astrology.sign.aquarius', 'astrology.house.10', 'astrology.planet.jupiter', 'astrology.foundations.rulership-and-dignity', 'astrology.sign.libra'],
    },
    {
        id: 'astrology.planet.uranus',
        library: 'astrology',
        category: 'planet',
        title: 'Uranus',
        summary: 'The first planet found by telescope. Uranus stands for disruption, invention and independence — the sudden break that clears room for something new.',
        glyph: '♅',
        keywords: ['Uranus', 'Ouranos', 'outer planet', 'generational planet', 'awakening'],
        sections: [
            {
                id: 'core-meaning',
                heading: 'Core meaning',
                paragraphs: [
                    'Uranus is associated with change that arrives abruptly: insight, rebellion, invention, liberation and the jolt that overturns an established order. In a chart it shows where a person needs freedom, resists convention or experiences discontinuity, and where unusual solutions come most readily.',
                    'Because it moves slowly, the sign of Uranus is generational, shared by everyone born over roughly seven years. Its house and its aspects to the personal planets are what make it individual.',
                ],
            },
            {
                id: 'symbolism',
                heading: 'Discovery',
                paragraphs: [
                    'William Herschel identified Uranus in 1781, the first planet discovered rather than inherited from antiquity — an event astrologers connect with the American and French revolutions and the first stirrings of industry. It orbits the Sun in about 84 years, tilted almost onto its side. The name is that of Ouranos, the Greek sky god overthrown by his son Kronos. The astrological glyph ♅ is built on the letter H, after Herschel; astronomers more often use a circle topped by an arrow.',
                ],
            },
            {
                id: 'characteristics',
                heading: 'At a glance',
                list: [
                    'Modern domicile: [[astrology.sign.aquarius|Aquarius]] (traditional ruler Saturn)',
                    'No agreed exaltation; the app lists it outside the dignity scheme',
                    'Cycle: about 84 years, roughly seven years per sign',
                    'Orb: 4° with another outer planet or the node, 6° with Mercury to Saturn, 8° with the Sun or Moon',
                    'Keywords: change, freedom, invention, rebellion, awakening, disruption',
                ],
            },
            {
                id: 'placement',
                heading: 'Placement and aspects',
                paragraphs: [
                    'The house of Uranus shows where life is least predictable and where a person most needs to do things their own way: an unconventional career in the 10th, relationships that need room in the 7th, an unsettled or unusual home life in the 4th. Contacts with personal planets carry most of its weight. With the Moon it is read as emotional independence and changeable moods; with Venus, attraction to the unusual; with Mercury, quick and original thought; with Saturn, a running tension between freedom and structure. Its half-return, the opposition to its own position around the age of 42, is a familiar marker of mid-life restlessness.',
                ],
            },
            {
                id: 'expressions',
                heading: 'Constructive and difficult expressions',
                paragraphs: [
                    'Constructively, Uranus gives originality, the courage to break with expectation and the ability to see a system from outside. Under strain it shows as restlessness, contrariness for its own sake, emotional detachment, or a life repeatedly broken up. The tradition’s caution is that liberation and disruption are one planet seen from two sides.',
                ],
            },
            {
                id: 'misconceptions',
                heading: 'Common misconceptions',
                paragraphs: [
                    'Uranus does not make everyone eccentric. In many charts it is quiet, its sign describing a generation’s concerns more than one person’s. Strong placements — on an angle, or in close aspect to the Sun or Moon — are where it is read as personal.',
                ],
            },
        ],
        related: ['astrology.sign.aquarius', 'astrology.planet.saturn', 'astrology.house.11', 'astrology.planet.neptune', 'astrology.foundations.angles'],
    },
    {
        id: 'astrology.planet.neptune',
        library: 'astrology',
        category: 'planet',
        title: 'Neptune',
        summary: 'The planet of dissolution and imagination: dreams, ideals, compassion and the longing for something larger than the self — and the confusion that can come with them.',
        glyph: '♆',
        keywords: ['Neptune', 'Poseidon', 'outer planet', 'generational planet', 'idealism'],
        sections: [
            {
                id: 'core-meaning',
                heading: 'Core meaning',
                paragraphs: [
                    'Neptune dissolves boundaries. It is associated with imagination, music, mysticism, compassion, idealism and sacrifice, and equally with illusion, deception, escape and confusion. In a chart it shows where a person longs for something perfect or transcendent, where they are most sensitive and porous, and where things are hardest to see clearly.',
                    'Neptune spends about fourteen years in a sign, so its sign belongs to a generation. Its house and aspects describe how the individual meets it.',
                ],
            },
            {
                id: 'symbolism',
                heading: 'Found by calculation',
                paragraphs: [
                    'Neptune was discovered in 1846 by mathematics before sight: Urbain Le Verrier predicted its position from irregularities in the orbit of Uranus, and Johann Galle at the Berlin Observatory found it on his first night of searching. Galileo had already drawn it in 1612–13 without recognising it as a planet. Astrologers associate the period with the spread of anaesthesia, photography and spiritualism. The planet takes about 165 years to circle the zodiac. It is named after the Roman god of the sea, and its glyph ♆ is his trident.',
                ],
            },
            {
                id: 'characteristics',
                heading: 'At a glance',
                list: [
                    'Modern domicile: [[astrology.sign.pisces|Pisces]] (traditional ruler Jupiter)',
                    'No agreed exaltation; outside the app’s dignity scheme',
                    'Cycle: about 165 years, roughly fourteen years per sign',
                    'Orb: 4° with another outer planet or the node, 6° with Mercury to Saturn, 8° with the Sun or Moon',
                    'Keywords: imagination, ideals, compassion, transcendence, illusion, longing',
                ],
            },
            {
                id: 'in-a-chart',
                heading: 'In a chart',
                paragraphs: [
                    'By house, Neptune marks the area where edges blur: idealised or self-sacrificing partnerships in the 7th, a vocation in art, care or something hard to name in the 10th, an uncertain relationship with money and worth in the 2nd. Its aspects to personal planets matter most. With Venus it is read as romantic and artistic idealism; with Mercury, imaginative thought that resists precision; with the Sun, an identity shaped by ideals, or by a sense of being difficult to pin down.',
                ],
            },
            {
                id: 'expressions',
                heading: 'Constructive and difficult expressions',
                paragraphs: [
                    'Neptune’s best expressions are empathy, artistic and spiritual sensitivity, and the power to imagine what does not yet exist. Under strain it brings disillusionment, evasion, confusion about what is real, or a pattern of rescuing and being rescued. The tradition advises that Neptune’s ideals need a vessel — a practice, an art, a discipline — to keep them from dispersing.',
                ],
            },
            {
                id: 'misconceptions',
                heading: 'Common misconceptions',
                paragraphs: [
                    'Reading Neptune as deception misses half its meaning. Its blurring is also how compassion works — feeling another’s situation as if it were one’s own — and how music and art move people. A Neptune placement describes where clarity is harder and inspiration easier, not where a person is dishonest.',
                ],
            },
        ],
        related: ['astrology.sign.pisces', 'astrology.planet.uranus', 'astrology.planet.pluto', 'astrology.house.12', 'astrology.planet.venus'],
    },
    {
        id: 'astrology.planet.pluto',
        library: 'astrology',
        category: 'planet',
        title: 'Pluto',
        summary: 'The planet of depth, power and transformation: what must be faced, surrendered or rebuilt, and the intensity that comes with it.',
        glyph: '♇',
        keywords: ['Pluto', 'Hades', 'outer planet', 'dwarf planet', 'transformation'],
        sections: [
            {
                id: 'core-meaning',
                heading: 'Core meaning',
                paragraphs: [
                    'Pluto is associated with processes that cannot be reversed: death and rebirth in the symbolic sense, power and its misuse, obsession, crisis and renewal. In a chart it shows where a person meets intensity, where control is sought or lost, and where change, when it comes, reaches the roots.',
                    'Pluto moves so slowly that its sign defines a generation — a whole cohort shares Pluto in Scorpio, or in Capricorn. Its house and its close aspects to the Sun, Moon or personal planets are what give it individual meaning.',
                ],
            },
            {
                id: 'symbolism',
                heading: 'Discovery and status',
                paragraphs: [
                    'Clyde Tombaugh found Pluto at the Lowell Observatory in Arizona in February 1930, and astrologers soon linked it to the forces of that era: nuclear physics, depth psychology and organised power. Its orbit is long and eccentric, about 248 years, so it may spend anywhere from twelve to more than thirty years in a sign. In 2006 astronomers reclassified it as a dwarf planet; astrology keeps it, as the app does, on the strength of its symbolic use rather than its size. It is named for the Roman ruler of the underworld and its hidden wealth. The glyph ♇ is a monogram of P and L, honouring Percival Lowell, whose search led to the discovery; many astrologers draw it instead as a circle in a crescent above a cross.',
                ],
            },
            {
                id: 'characteristics',
                heading: 'At a glance',
                list: [
                    'Modern domicile: [[astrology.sign.scorpio|Scorpio]] (traditional ruler Mars)',
                    'No agreed exaltation; outside the app’s dignity scheme',
                    'Cycle: about 248 years, from roughly twelve to over thirty years per sign',
                    'Orb: 4° with another outer planet or the node, 6° with Mercury to Saturn, 8° with the Sun or Moon',
                    'Keywords: transformation, power, depth, intensity, crisis, regeneration',
                ],
            },
            {
                id: 'placement',
                heading: 'Placement and aspects',
                paragraphs: [
                    'By house Pluto marks the area of life with the highest stakes: shared resources and intimacy in the 8th, its natural house; ambition and confrontations with authority in the 10th; deep family patterns in the 4th. Close aspects to the luminaries or the chart ruler make its themes personal — with the Moon it suggests intense emotional bonds, with Venus all-or-nothing attachment, with Mars a formidable will. Because the app uses modern rulership, Pluto is the [[astrology.foundations.chart-ruler]] of every Scorpio Ascendant.',
                ],
            },
            {
                id: 'expressions',
                heading: 'Constructive and difficult expressions',
                paragraphs: [
                    'Pluto’s constructive side is psychological depth, resilience, the capacity to stay with difficulty and the power to rebuild after loss. Under strain it shows as control, secrecy, compulsion or struggles for power. Practitioners often read a Pluto theme as one in which letting go is the condition for renewal.',
                ],
            },
            {
                id: 'misconceptions',
                heading: 'Common misconceptions',
                paragraphs: [
                    'Pluto does not forecast catastrophe. Its symbolism of death is overwhelmingly read as transformation — an ending that makes room for something else — and many strong Pluto placements show simply as intensity, focus and a refusal of the superficial.',
                ],
            },
        ],
        related: ['astrology.sign.scorpio', 'astrology.house.8', 'astrology.foundations.chart-ruler', 'astrology.planet.mars', 'astrology.planet.neptune'],
    },
    /* ------------------------------------------------------------------ nodes, Chiron and asteroids */
    {
        id: 'astrology.point.north-node',
        library: 'astrology',
        category: 'point',
        title: 'North Node',
        summary: 'The point where the Moon’s orbit crosses the ecliptic heading north. Modern astrology reads it as a direction of growth; the app calculates the true (osculating) node.',
        glyph: '☊',
        keywords: ['North Node', 'true node', 'ascending node', 'Rahu', 'Caput Draconis', 'dragon’s head', 'lunar nodes'],
        sections: [
            {
                id: 'core-meaning',
                heading: 'What the node is',
                paragraphs: [
                    'The Moon’s orbit is tilted about five degrees to the ecliptic, so it cuts the Sun’s path at two points. The North Node is where the Moon passes from south to north of the ecliptic; the [[astrology.point.south-node|South Node]] lies directly opposite. Neither is a body — both are intersections — and because eclipses happen only when a new or full moon falls near them, the nodes held great importance in ancient astrology.',
                ],
            },
            {
                id: 'calculation',
                heading: 'How the app calculates it',
                paragraphs: [
                    'The app uses the true, or osculating, node, derived from the Moon’s actual orbit at the moment of birth, rather than the mean node, which smooths out the Moon’s wobble; the two can differ by more than a degree. The South Node is placed exactly 180° away. The nodes move mostly backward through the zodiac, completing the circle in about 18.6 years and spending roughly a year and a half in each sign. The app treats the North Node like an outer planet for orbs — 4° with another outer planet, 6° with Mercury to Saturn, 8° with the Sun or Moon — and leaves both nodes out of the element and modality counts.',
                ],
            },
            {
                id: 'interpretation',
                heading: 'In interpretation',
                paragraphs: [
                    'Indian astrology calls the North Node Rahu, the dragon’s head, a hungry and amplifying point; medieval Western texts named it Caput Draconis and treated it as increasing whatever it touched. Modern Western astrology, especially its evolutionary schools, reads it as a direction of growth: qualities and experiences that feel unfamiliar yet draw a life toward them. Its sign and house name that direction, measured against the more comfortable opposite pole.',
                    'A North Node in Libra, for example, is read as pointing toward partnership and compromise and away from the self-reliance of a South Node in Aries. Planets conjunct the North Node are read as emphasised and forward-looking.',
                ],
            },
        ],
        related: ['astrology.point.south-node', 'astrology.planet.moon', 'astrology.foundations.retrograde-motion', 'astrology.moon-phase.new-moon', 'astrology.foundations.natal-chart'],
    },
    {
        id: 'astrology.point.south-node',
        library: 'astrology',
        category: 'point',
        title: 'South Node',
        summary: 'The point opposite the North Node, where the Moon’s orbit crosses the ecliptic heading south. It is read as the familiar and already mastered — and as what is to be released.',
        glyph: '☋',
        keywords: ['South Node', 'descending node', 'Ketu', 'Cauda Draconis', 'dragon’s tail', 'lunar nodes'],
        sections: [
            {
                id: 'core-meaning',
                heading: 'The descending node',
                paragraphs: [
                    'The South Node is where the Moon crosses from north to south of the ecliptic. The app does not sample it separately: it is set exactly opposite the true [[astrology.point.north-node|North Node]], so the two always occupy opposite signs and, in Whole Sign Houses, opposite houses. Every South Node reading is therefore half of an axis.',
                ],
            },
            {
                id: 'tradition',
                heading: 'Ketu and the dragon’s tail',
                paragraphs: [
                    'In Indian astrology the South Node is Ketu, the headless body of the demon whose head became Rahu, associated with detachment, loss and spiritual release. Medieval Western astrologers called it Cauda Draconis, the dragon’s tail, and held that it diminished whatever it touched — the counterpart of the head’s increase.',
                ],
            },
            {
                id: 'interpretation',
                heading: 'In interpretation',
                paragraphs: [
                    'Modern readings treat the South Node as the area of habit and inherited skill: what comes easily, what is already known, what a person falls back on under stress. Its gifts are real, but relying on them alone is read as a way of avoiding the growth the North Node signals. A South Node in the 10th house, for instance, may describe ease with public roles and a pull to invest instead in the private life of the 4th.',
                    'Some schools read the South Node as a carry-over from previous lives, others as early conditioning; both treat it as a starting point rather than a destination. Planets conjunct it are read as familiar talents, or patterns ready to be loosened.',
                ],
            },
        ],
        related: ['astrology.point.north-node', 'astrology.planet.moon', 'astrology.house.10', 'astrology.foundations.house-systems', 'astrology.foundations.retrograde-motion'],
    },
    {
        id: 'astrology.point.chiron',
        library: 'astrology',
        category: 'point',
        title: 'Chiron',
        summary: 'A small body orbiting between Saturn and Uranus, named after the wounded healer of Greek myth. Astrology reads it as a lasting sore point and the skill that grows around it.',
        glyph: '⚷',
        keywords: ['Chiron', 'centaur', 'wounded healer', 'Chiron return'],
        sections: [
            {
                id: 'core-meaning',
                heading: 'The body',
                paragraphs: [
                    'Charles Kowal discovered Chiron on photographs taken at Palomar in October 1977. It is classed as a centaur, an icy body on an unstable orbit that swings from just inside Saturn’s orbit out almost to that of Uranus, completing one circuit in about fifty years. The orbit is eccentric enough that Chiron spends far longer in some signs than in others — under two years in the signs near its closest approach, several years in those opposite. Astrologers adopted it quickly, and it is now among the most widely used additional bodies in Western charts.',
                ],
            },
            {
                id: 'myth',
                heading: 'The wounded healer',
                paragraphs: [
                    'In myth Chiron was the wisest of the centaurs, tutor of Achilles, Asclepius and Jason, skilled in medicine, music and archery. Struck by a poisoned arrow, he suffered a wound that would not close and, being immortal, could not die of it, until he gave his immortality away. Astrology reads Chiron accordingly: as a place of persistent sensitivity — something that does not simply heal — and of the understanding, teaching or care developed because of it.',
                ],
            },
            {
                id: 'interpretation',
                heading: 'In interpretation',
                paragraphs: [
                    'Chiron’s sign and house describe where that sensitivity sits, and its aspects which other functions are drawn into it. In the 3rd house it might be read as an early sense of not being heard and a later gift for helping others find words. The Chiron return, around the age of fifty, is a familiar marker. These readings are symbolic; the tradition makes no claim about physical health.',
                ],
            },
            {
                id: 'in-the-app',
                heading: 'In the app',
                paragraphs: [
                    'Chiron is added only to a timed chart whose birth date falls between 1890 and 2110, the range the app calculates for the extended bodies. Its major aspects are capped at a 4° orb whatever the other body, so a contact with the Sun or Moon never inherits their wider allowance. It carries no rulership or dignity in the app’s scheme.',
                ],
            },
        ],
        related: ['astrology.planet.saturn', 'astrology.planet.uranus', 'astrology.sign.sagittarius', 'astrology.point.ceres', 'astrology.foundations.natal-chart'],
    },
    {
        id: 'astrology.point.ceres',
        library: 'astrology',
        category: 'point',
        title: 'Ceres',
        summary: 'The first asteroid found, now classed as a dwarf planet. Astrology reads Ceres through the grain goddess: nourishment, care, loss and return.',
        glyph: '⚳',
        keywords: ['Ceres', 'Demeter', 'asteroid', 'dwarf planet', 'nurture'],
        sections: [
            {
                id: 'core-meaning',
                heading: 'The body',
                paragraphs: [
                    'Giuseppe Piazzi discovered Ceres on 1 January 1801, the first object found in the belt between Mars and Jupiter; in 2006 it was reclassified as a dwarf planet. It orbits the Sun in about 4.6 years. Astrological use of Ceres, Pallas, Juno and Vesta spread after Eleanor Bach published an ephemeris of the four in 1973.',
                ],
            },
            {
                id: 'myth',
                heading: 'Demeter and Persephone',
                paragraphs: [
                    'Ceres, the Greek Demeter, was goddess of grain and harvest. When her daughter Persephone was carried off to the underworld, her grief halted all growth until a bargain returned Persephone for part of each year — a myth of the seasons. Astrologers read Ceres as the principle of nourishment in all its forms: feeding and being fed, care given and received, self-worth bound up with caring, and the cycle of attachment, loss and reunion.',
                ],
            },
            {
                id: 'interpretation',
                heading: 'In interpretation',
                paragraphs: [
                    'Its sign describes how care is offered and accepted — through practical help in Virgo, through praise and attention in Leo, through shared ideas in Aquarius. Its house shows where nurture matters most, and close aspects to the Moon or Venus strengthen the theme. Some astrologers associate Ceres with Virgo or Taurus, but no rulership is agreed.',
                    'The app calculates Ceres only for a timed chart born between 1890 and 2110 and holds its major aspects to 4°. It is read as a supplement to the Moon, never a replacement.',
                ],
            },
        ],
        related: ['astrology.planet.moon', 'astrology.point.vesta', 'astrology.point.chiron', 'astrology.sign.virgo', 'astrology.planet.venus'],
    },
    {
        id: 'astrology.point.pallas',
        library: 'astrology',
        category: 'point',
        title: 'Pallas',
        summary: 'The second asteroid discovered, named for Pallas Athena. Astrology reads it as strategic intelligence, pattern recognition and creative skill.',
        glyph: '⚴',
        keywords: ['Pallas', 'Pallas Athena', 'Athena', 'asteroid', 'strategy'],
        sections: [
            {
                id: 'core-meaning',
                heading: 'The body',
                paragraphs: [
                    'Heinrich Olbers found Pallas in 1802. It orbits the Sun in about 4.6 years on a steeply inclined path, and it is one of the four asteroids in common astrological use. The app adds it only to a timed chart with a birth date between 1890 and 2110 and caps its major aspects at 4°.',
                ],
            },
            {
                id: 'myth',
                heading: 'Athena’s wisdom',
                paragraphs: [
                    'Pallas Athena was goddess of wisdom, strategy, crafts and the city, born fully armed from the head of Zeus. She protected weaving and pottery as well as just war, and favoured heroes who won by intelligence rather than strength. Astrology reads Pallas as the capacity to see patterns, plan, solve problems and turn knowledge into skill — wisdom that works through the hands as much as the mind.',
                ],
            },
            {
                id: 'interpretation',
                heading: 'In interpretation',
                paragraphs: [
                    'By sign Pallas describes the style of that intelligence: verbal and quick in Gemini, long-range and strategic in Capricorn, visual and intuitive in Pisces. Its house shows where practical wisdom is applied, and contact with Mercury or Saturn sharpens its analytical side.',
                    'Some modern authors also read Pallas through Athena’s birth from her father’s head, linking it with a person’s relationship to the father or to conventional gender roles. These readings vary by school and are best treated as optional layers rather than core meaning.',
                ],
            },
        ],
        related: ['astrology.planet.mercury', 'astrology.point.ceres', 'astrology.point.juno', 'astrology.point.vesta', 'astrology.foundations.natal-chart'],
    },
    {
        id: 'astrology.point.juno',
        library: 'astrology',
        category: 'point',
        title: 'Juno',
        summary: 'The third asteroid discovered, named for the queen of the gods and guardian of marriage. Astrology reads Juno as commitment, partnership and the terms on which a bond feels equal.',
        glyph: '⚵',
        keywords: ['Juno', 'Hera', 'asteroid', 'marriage', 'commitment'],
        sections: [
            {
                id: 'core-meaning',
                heading: 'The body',
                paragraphs: [
                    'Karl Harding discovered Juno in 1804; it orbits the Sun in about 4.4 years. Like the other three main asteroids, it appears in the app only in a timed chart with a birth date from 1890 to 2110, and its major aspects use a 4° orb.',
                ],
            },
            {
                id: 'myth',
                heading: 'Queen of the gods',
                paragraphs: [
                    'Juno, the Greek Hera, was the wife of Jupiter and the protector of marriage, childbirth and lawful union. Her myths are dominated by her husband’s infidelities and her jealous retaliation, which astrology reads as the stakes of commitment: loyalty, fairness, the balance of power inside a partnership, and the pain of betrayal.',
                ],
            },
            {
                id: 'interpretation',
                heading: 'In interpretation',
                paragraphs: [
                    'Juno’s sign describes what a person needs from a committed partner — independence and directness in Aries, emotional security in Cancer, friendship and freedom in Aquarius. Its house shows where commitment is lived out, and aspects to Venus or Mars add detail about how affection and desire fit within a lasting bond. A Juno under pressure from Saturn, for example, is read as commitment taken very seriously, sometimes as duty more than delight.',
                    'Juno is read alongside the [[astrology.house.7|7th house]] and the Descendant, not instead of them. It describes the terms of a bond rather than who a partner will be.',
                ],
            },
        ],
        related: ['astrology.planet.venus', 'astrology.house.7', 'astrology.point.pallas', 'astrology.point.vesta', 'astrology.sign.libra'],
    },
    {
        id: 'astrology.point.vesta',
        library: 'astrology',
        category: 'point',
        title: 'Vesta',
        summary: 'The brightest asteroid, named for the Roman goddess of the hearth. Astrology reads Vesta as devotion, focus and the inner flame tended for its own sake.',
        glyph: '⚶',
        keywords: ['Vesta', 'Hestia', 'asteroid', 'Vestal Virgins', 'devotion'],
        sections: [
            {
                id: 'core-meaning',
                heading: 'The body',
                paragraphs: [
                    'Heinrich Olbers discovered Vesta in 1807. It is the brightest asteroid, occasionally visible to the naked eye, and orbits the Sun in about 3.6 years. The app adds it only to a timed chart with a birth date between 1890 and 2110 and caps its major aspects at 4°.',
                ],
            },
            {
                id: 'myth',
                heading: 'The hearth fire',
                paragraphs: [
                    'Vesta, the Greek Hestia, was goddess of the hearth at the centre of every household and of the city. In Rome her temple flame was kept alight by the Vestal Virgins, priestesses whose service demanded single-minded dedication. Astrology reads Vesta as the capacity to concentrate, to devote oneself to a task, practice or calling, and to keep something sacred — at times at the expense of other commitments.',
                ],
            },
            {
                id: 'interpretation',
                heading: 'In interpretation',
                paragraphs: [
                    'Vesta’s sign describes the style of focus: meticulous service in Virgo, total absorption in Scorpio, devotion to a belief in Sagittarius. Its house shows where a person works with most dedication and guards their own space most carefully, and close aspects to the Sun or Saturn are read as making that dedication central.',
                    'The goddess’s association with chastity is now usually read more broadly, as the need to keep part of the self apart and undivided.',
                ],
            },
        ],
        related: ['astrology.point.ceres', 'astrology.point.juno', 'astrology.point.pallas', 'astrology.sign.virgo', 'astrology.house.6'],
    },
];
