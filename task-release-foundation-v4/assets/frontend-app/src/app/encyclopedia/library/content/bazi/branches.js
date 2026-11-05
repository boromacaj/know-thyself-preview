export const ARTICLES = [
    {
        id: 'bazi.branch.zi-rat',
        library: 'bazi',
        category: 'branch',
        title: 'Zi · Rat',
        summary: 'Zi, the first Earthly Branch, is the water of midwinter and midnight: the month of the winter solstice and the two hours either side of twelve o’clock.',
        glyph: '子',
        keywords: ['子', 'Zǐ', 'Tzu', 'Rat', 'Rat branch', 'midwinter', 'midnight', 'winter solstice'],
        sections: [
            {
                id: 'at-a-glance',
                heading: 'At a glance',
                list: [
                    'Month: from Da Xue (around 7 December) to Xiao Han (around 6 January), containing the winter solstice.',
                    'Hours: 23:00 to 01:00, the period that straddles midnight.',
                    'Phase and polarity: water, yang by position; direction north.',
                    'Hidden stem: Gui alone.',
                ],
            },
            {
                id: 'core-meaning',
                heading: 'The turning point',
                paragraphs: [
                    'Zi is winter at its deepest and night at its darkest, yet the tradition treats it as a beginning. The solstice falls in its month, and the classical phrase for that moment is “one yang is born”: the first return of light inside the coldest stretch. The branch heads the list of twelve for the same reason midnight starts the day.',
                    'Its single hidden stem makes it one of the purest branches in the system. Zi is water and nothing else – a point worth remembering since, counted by position, it is yang, while the stem it holds, Gui, is yin. Some schools read it by that content; the app labels it by position.',
                ],
            },
            {
                id: 'the-animal',
                heading: 'The Rat and the branch',
                paragraphs: [
                    'Folk tales explain why the Rat comes first: it rode on the Ox’s back in the race of the animals and jumped ahead at the finish. Popular astrology draws on that cleverness. In BaZi the more useful picture is the branch itself – concentrated water at the bottom of the year – which is what the chart actually works with, whether Zi stands in the year, the day or the hour.',
                ],
            },
            {
                id: 'relationships',
                heading: 'Main relationships',
                list: [
                    'Six clash with Wu 午, the Horse, its opposite across the circle: midwinter against midsummer.',
                    'Six harmony with Chou, the Ox, traditionally cited as producing earth.',
                    'Three harmony with Shen and Chen in the water frame, Zi at its centre.',
                    'Six harm with Wei, the Goat.',
                    'Mutual punishment with Mao, the Rabbit – the only punishment between two branches that is not part of a triad.',
                ],
            },
            {
                id: 'in-the-app',
                heading: 'In the app',
                paragraphs: [
                    'The Zi hour raises a known methodological question. Some traditions start the next day at 23:00; the app keeps 23:00–00:59 as one Zi window and changes the day pillar at local midnight, flagging births in that hour. See [[bazi.pillar.hour]].',
                ],
            },
        ],
        related: ['bazi.element.water', 'bazi.branch.wu-horse', 'bazi.relationship.mutual-punishment', 'bazi.stem.gui', 'bazi.pillar.hour'],
    },
    {
        id: 'bazi.branch.chou-ox',
        library: 'bazi',
        category: 'branch',
        title: 'Chou · Ox',
        summary: 'Chou is the cold, wet earth of late winter – the last month before Li Chun – and the storehouse in which metal is kept.',
        glyph: '丑',
        keywords: ['丑', 'Chǒu', 'Ch’ou', 'Ox', 'Ox branch', 'late winter', 'wet earth', 'metal storehouse'],
        sections: [
            {
                id: 'core-meaning',
                heading: 'Frozen ground',
                paragraphs: [
                    'Chou closes the winter. Its month runs from Xiao Han, around 6 January, to Li Chun, around 4 February, and its hours are 01:00 to 03:00, the dead of night. It is yin earth, and the earth it describes is a frozen field before ploughing: heavy, damp, inert on the surface, holding a great deal underneath.',
                    'Because the BaZi year starts at Li Chun, the Chou month still belongs to the previous year. A birth in mid-January has the previous year’s pillar and, in popular terms, the previous year’s animal.',
                ],
            },
            {
                id: 'hidden-stems',
                heading: 'What it holds',
                paragraphs: [
                    'Chou contains three stems: Ji as its primary, Gui as secondary and Xin as tertiary. Ji makes it earth; Gui, the remaining winter water, makes it wet; Xin is the metal it keeps in storage, which is why Chou closes the metal frame of Si, You and Chou. Practitioners value it as a mother to metal – wet earth nourishes metal, where dry earth would only bury it.',
                ],
            },
            {
                id: 'the-animal',
                heading: 'Beyond the Ox',
                paragraphs: [
                    'The Ox, patient and laborious, fits the season: animals in the byre waiting for the work of spring. Yet a chart rarely uses those traits directly. What matters is how the branch behaves – as a cold earth that can strengthen a metal Day Master, dampen fire, or bank up water – and that depends on the rest of the chart.',
                ],
            },
            {
                id: 'relationships',
                heading: 'Main relationships',
                list: [
                    'Six clash with Wei, the Goat: wet earth against dry, two storehouses opened against each other.',
                    'Six harmony with Zi, the Rat.',
                    'Three harmony with Si and You, closing the metal frame.',
                    'Six harm with Wu 午, the Horse.',
                    'Part of the [[bazi.relationship.three-punishment]] of Chou, Xu and Wei, the punishment of relying on power.',
                ],
            },
        ],
        related: ['bazi.element.earth', 'bazi.branch.wei-goat', 'bazi.branch.zi-rat', 'bazi.relationship.three-punishment', 'bazi.stem.ji', 'bazi.foundations.hidden-stems'],
    },
    {
        id: 'bazi.branch.yin-tiger',
        library: 'bazi',
        category: 'branch',
        title: 'Yin · Tiger',
        summary: 'Yin 寅 is yang wood, the first month of the BaZi year beginning at Li Chun, and the branch in which fire is born. It is a different word from yin the polarity.',
        glyph: '寅',
        keywords: ['寅', 'Yín', 'Yin branch', 'Tiger', 'Tiger branch', 'first month', 'early spring', 'Li Chun'],
        sections: [
            {
                id: 'name',
                heading: 'Not the yin of yin and yang',
                paragraphs: [
                    'Two Chinese words share the romanisation “yin”. The branch 寅 (yín, second tone) is the Tiger; the polarity 阴 (yīn, first tone) is the shaded half of yin and yang. They have nothing to do with each other, and the branch Yin 寅 is in fact a yang branch, the yang counterpart of Mao. This library writes Yin 寅 for the branch wherever the two might be confused.',
                ],
            },
            {
                id: 'core-meaning',
                heading: 'The opening of the year',
                paragraphs: [
                    'The Yin 寅 month begins at Li Chun, around 4 February, and runs to Jing Zhe, around 6 March. It is therefore the first month of every BaZi year, and its stem is set by the year stem: a Jia or Ji year always opens with a Bing Yin month. Its hours are 03:00 to 05:00, the stretch before dawn when the day has begun but light has not arrived.',
                    'As yang wood it is spring still mostly in the ground – the sap rising before any leaf is visible.',
                ],
            },
            {
                id: 'hidden-stems',
                heading: 'Hidden stems',
                paragraphs: [
                    'Yin 寅 holds Jia as its primary stem, Bing as secondary and Wu 戊 as tertiary. The Bing is significant: fire is said to be born here, and Yin 寅 opens the fire frame of Yin, Wu 午 and Xu. A Bing Day Master with Yin 寅 in its chart has a root in the first month of spring.',
                ],
            },
            {
                id: 'the-animal',
                heading: 'The Tiger',
                paragraphs: [
                    'The Tiger’s boldness suits a branch that starts things. The tradition also counts Yin 寅 among the four branches at the start of each season – with Si, Shen and Hai – that are associated with movement and travel. Both readings point the same way, but in a chart the branch is first a store of yang wood and a seed of fire.',
                ],
            },
            {
                id: 'relationships',
                heading: 'Main relationships',
                list: [
                    'Six clash with Shen, the Monkey: early spring against early autumn.',
                    'Six harmony with Hai, the Pig, traditionally cited as producing wood.',
                    'Three harmony with Wu 午 and Xu in the fire frame.',
                    'Six harm with Si, the Snake.',
                    'Part of the three punishment of Yin 寅, Si and Shen, the punishment of ungratefulness.',
                ],
            },
        ],
        related: ['bazi.foundations.yin-and-yang', 'bazi.element.wood', 'bazi.branch.shen-monkey', 'bazi.foundations.the-solar-calendar', 'bazi.stem.jia', 'bazi.relationship.three-punishment'],
    },
    {
        id: 'bazi.branch.mao-rabbit',
        library: 'bazi',
        category: 'branch',
        title: 'Mao · Rabbit',
        summary: 'Mao is pure yin wood: the month of the spring equinox, the hours of dawn and the east, holding Yi as its only hidden stem.',
        glyph: '卯',
        keywords: ['卯', 'Mǎo', 'Mao', 'Rabbit', 'Hare', 'Rabbit branch', 'mid-spring', 'dawn', 'spring equinox'],
        sections: [
            {
                id: 'core-meaning',
                heading: 'Spring in full leaf',
                paragraphs: [
                    'Where Yin 寅 is spring underground, Mao is spring in the open: buds broken, grass up, the equinox passed. Its month runs from Jing Zhe – “the stirring of insects”, around 6 March – to Qing Ming in early April. Its two hours, 05:00 to 07:00, are sunrise, and its direction is due east.',
                    'Mao holds a single hidden stem, Yi, so it is wood without admixture. Of the twelve branches it is the one most purely given to growth, and a wood Day Master born in this month is at the heart of its season.',
                ],
            },
            {
                id: 'symbolism',
                heading: 'Rabbit and moon',
                paragraphs: [
                    'The Rabbit (sometimes the Hare) carries connotations of gentleness, quickness and a little caution, and in Chinese legend a jade rabbit lives on the Moon. These are the animal’s associations, not the branch’s mechanics. Mao in the day pillar, for instance, is read first as yin wood seated in the spouse palace, and what that means depends on the Day Master above it.',
                ],
            },
            {
                id: 'relationships',
                heading: 'Main relationships',
                list: [
                    'Six clash with You, the Rooster, directly opposite: spring equinox against autumn equinox, wood against metal.',
                    'Six harmony with Xu, the Dog, traditionally cited as producing fire.',
                    'Centre of the wood frame with Hai and Wei.',
                    'Six harm with Chen, the Dragon.',
                    'Mutual punishment with Zi, the Rat, called the punishment of impropriety.',
                ],
            },
            {
                id: 'in-interpretation',
                heading: 'In interpretation',
                paragraphs: [
                    'The Mao–You clash is one of the starkest in the system, since both branches are single-stem and the conflict is pure wood against pure metal. Practitioners read the meeting of these two in a chart, or between a chart and a Luck Pillar, as a moment where growth meets the knife; whether that is pruning or damage is decided by the strength of each side.',
                ],
            },
        ],
        related: ['bazi.element.wood', 'bazi.stem.yi', 'bazi.branch.you-rooster', 'bazi.relationship.six-clash', 'bazi.relationship.mutual-punishment'],
    },
    {
        id: 'bazi.branch.chen-dragon',
        library: 'bazi',
        category: 'branch',
        title: 'Chen · Dragon',
        summary: 'Chen is the wet earth of late spring and the storehouse of water, holding Wu 戊, Yi and Gui; its animal is the only mythical one of the twelve.',
        glyph: '辰',
        keywords: ['辰', 'Chén', 'Ch’en', 'Dragon', 'Dragon branch', 'late spring', 'water storehouse', 'wet earth'],
        sections: [
            {
                id: 'at-a-glance',
                heading: 'At a glance',
                list: [
                    'Month: from Qing Ming (around 5 April) to Li Xia (around 6 May).',
                    'Hours: 07:00 to 09:00.',
                    'Phase and polarity: earth, yang; the transition from spring to summer.',
                    'Hidden stems: Wu 戊 (primary), Yi (secondary), Gui (tertiary).',
                ],
            },
            {
                id: 'core-meaning',
                heading: 'A storehouse of water',
                paragraphs: [
                    'Chen is earth, but an earth full of other things. Its Yi is the last of spring’s wood; its Gui is water kept in reserve. That stored water makes Chen the end-point of the water frame of Shen, Zi and Chen, and gives it a dampness that marks it out from the dry earth branches. Late spring soil after rain, rich and heavy, is the usual picture.',
                    'Because it contains three phases, Chen behaves differently in different charts. It can root a wood Day Master through its Yi, support a water Day Master through its Gui, or simply add earth – which of these comes forward depends on what surrounds it.',
                ],
            },
            {
                id: 'the-dragon',
                heading: 'Why a dragon',
                paragraphs: [
                    'The Dragon is the one animal of the twelve that does not exist, and in Chinese myth dragons govern rain and rivers. The association with stored water is apt, and popular astrology adds grandeur and ambition. Within the chart, though, Chen is first an earth branch with a reservoir inside it.',
                ],
            },
            {
                id: 'relationships',
                heading: 'Main relationships',
                list: [
                    'Six clash with Xu, the Dog: two earth storehouses forced open, water against fire.',
                    'Six harmony with You, the Rooster, traditionally cited as producing metal.',
                    'Closes the water frame with Shen and Zi.',
                    'Six harm with Mao, the Rabbit.',
                    'One of the four [[bazi.relationship.self-punishment]] branches when it appears twice.',
                ],
            },
            {
                id: 'in-interpretation',
                heading: 'In interpretation',
                paragraphs: [
                    'Practitioners watch Chen closely when Shen or Zi is also present. The partial water frame can draw its stored Gui forward, so a chart that looks earth-heavy in a simple count may be read as carrying considerably more water than its surface suggests.',
                ],
            },
        ],
        related: ['bazi.element.earth', 'bazi.branch.xu-dog', 'bazi.relationship.three-harmony', 'bazi.foundations.hidden-stems', 'bazi.relationship.self-punishment'],
    },
    {
        id: 'bazi.branch.si-snake',
        library: 'bazi',
        category: 'branch',
        title: 'Si · Snake',
        summary: 'Si is the fire of early summer, holding Bing, Wu 戊 and Geng; it is the branch in which metal is born and one of the most entangled in the relationship tables.',
        glyph: '巳',
        keywords: ['巳', 'Sì', 'Ssu', 'Snake', 'Snake branch', 'early summer', 'metal born'],
        sections: [
            {
                id: 'core-meaning',
                heading: 'Summer arriving',
                paragraphs: [
                    'Si begins at Li Xia, “the start of summer”, around 6 May, and lasts until Mang Zhong in early June. Its hours, 09:00 to 11:00, are the late morning when heat builds. It is fire, and labelled yin by position, though its primary hidden stem is Bing, the yang sun – another of the branches where position and content point different ways.',
                ],
            },
            {
                id: 'hidden-stems',
                heading: 'Three stems in one branch',
                paragraphs: [
                    'Si holds Bing as primary, Wu 戊 as secondary and Geng as tertiary. The presence of Geng is the branch’s most discussed feature: metal takes its birth here, in the heat that will eventually forge it, and Si opens the metal frame of Si, You and Chou. A fire branch that carries metal inside it gives Si a double character, and practitioners watch which side the rest of the chart draws out.',
                ],
            },
            {
                id: 'the-animal',
                heading: 'The Snake',
                paragraphs: [
                    'The Snake brings associations of intelligence, reserve and sudden movement, and in some regional traditions of wisdom and healing. Like Yin 寅, Shen and Hai, Si is one of the four branches that open a season, linked by the tradition with travel and change.',
                ],
            },
            {
                id: 'relationships',
                heading: 'Relationships',
                paragraphs: [
                    'Si clashes with Hai, its opposite: fire against water at the starts of summer and winter. It forms a six harmony with Shen, traditionally cited as producing water, and a six harm with Yin 寅.',
                    'It is also part of the three punishment of Yin 寅, Si and Shen. That makes Si unusual: with Shen it is at once a harmony and a punishment, and with Yin 寅 at once a harm and a punishment. Readers treat such overlaps as relationships that are close but complicated, rather than cancelling one label with the other.',
                ],
            },
        ],
        related: ['bazi.element.fire', 'bazi.stem.bing', 'bazi.branch.hai-pig', 'bazi.relationship.six-harmony', 'bazi.relationship.three-punishment'],
    },
    {
        id: 'bazi.branch.wu-horse',
        library: 'bazi',
        category: 'branch',
        title: 'Wu · Horse',
        summary: 'Wu 午 is the fire of midsummer and midday, the month of the summer solstice; it is a different character from the stem Wu 戊, which is earth.',
        glyph: '午',
        keywords: ['午', 'Wǔ', 'Wu branch', 'Horse', 'Horse branch', 'midsummer', 'noon', 'summer solstice'],
        sections: [
            {
                id: 'name',
                heading: 'The Horse, not the mountain',
                paragraphs: [
                    'The branch 午 (wǔ) and the stem 戊 (wù) share a spelling and nothing else. The branch is fire; the stem is yang earth. A Bing Wu 午 pillar is fire on fire; a Wu 戊 Day Master is a mountain. See [[bazi.stem.wu]] for the stem.',
                ],
            },
            {
                id: 'core-meaning',
                heading: 'The height of the year',
                paragraphs: [
                    'Wu 午 is the exact opposite of Zi. Its month, from Mang Zhong around 6 June to Xiao Shu in early July, contains the summer solstice; its hours, 11:00 to 13:00, contain noon; its direction is due south. As Zi is the point where yang begins to return, Wu 午 is where yin begins: the longest day, after which the light shortens.',
                    'By position it is a yang branch, but its primary hidden stem is Ding, yin fire, with Ji as secondary. The Ji gives the branch a little earth and makes it a root for Ji Day Masters as well as for fire.',
                ],
            },
            {
                id: 'the-animal',
                heading: 'Horse and year',
                paragraphs: [
                    'The Horse lends the branch its popular associations of speed, independence and spirit. A Bing Wu year – 2026 is one – is the “Fire Horse” of popular astrology, a pairing that has attracted folklore of its own. Within BaZi, a year branch of Wu 午 is one character among eight, and the same branch in the month pillar would carry far more weight, because it would set the season.',
                ],
            },
            {
                id: 'relationships',
                heading: 'Main relationships',
                list: [
                    'Six clash with Zi, the Rat: fire against water, south against north.',
                    'Six harmony with Wei, the Goat – the one six harmony for which sources agree on no resulting phase, so the app cites none.',
                    'Centre of the fire frame with Yin 寅 and Xu.',
                    'Six harm with Chou, the Ox.',
                    'A [[bazi.relationship.self-punishment]] branch when doubled.',
                ],
            },
        ],
        related: ['bazi.stem.wu', 'bazi.element.fire', 'bazi.branch.zi-rat', 'bazi.relationship.six-clash', 'bazi.foundations.bazi-and-the-chinese-zodiac'],
    },
    {
        id: 'bazi.branch.wei-goat',
        library: 'bazi',
        category: 'branch',
        title: 'Wei · Goat',
        summary: 'Wei is the dry, warm earth of late summer and the storehouse of wood, holding Ji, Ding and Yi.',
        glyph: '未',
        keywords: ['未', 'Wèi', 'Goat', 'Sheep', 'Ram', 'Goat branch', 'late summer', 'dry earth', 'wood storehouse'],
        sections: [
            {
                id: 'core-meaning',
                heading: 'The heat that lingers',
                paragraphs: [
                    'Wei follows the solstice. Its month runs from Xiao Shu, “lesser heat”, around 7 July, to Li Qiu in early August – the hottest weeks of the year, after the light has already started to shorten. Its hours are 13:00 to 15:00, the warm afternoon. It is yin earth, and it is the driest of the four earth branches: sun-baked ground, more likely to crack than to grow.',
                ],
            },
            {
                id: 'hidden-stems',
                heading: 'Hidden stems and storage',
                paragraphs: [
                    'Ji is the primary stem, Ding the secondary and Yi the tertiary. Ding is summer’s remaining fire, which keeps Wei hot; Yi is the wood placed in storage, making Wei the end-point of the wood frame of Hai, Mao and Wei. A wood Day Master can therefore find a modest root here, although the dry earth around it is not a comfortable place to grow.',
                    'Practitioners contrast Wei with Chou, its clash partner. Both are yin earth; one is frozen and wet, the other scorched and dry. Bringing them together opens both storehouses at once.',
                ],
            },
            {
                id: 'the-animal',
                heading: 'Goat or sheep',
                paragraphs: [
                    'The character 羊 for the animal covers goat, sheep and ram, and translations differ. Its popular associations are gentleness, artistry and a liking for comfort. For the chart it is the branch’s heat and its stored wood that do the work.',
                ],
            },
            {
                id: 'relationships',
                heading: 'Main relationships',
                list: [
                    'Six clash with Chou, the Ox.',
                    'Six harmony with Wu 午, the Horse; no resulting phase is agreed.',
                    'Closes the wood frame with Hai and Mao.',
                    'Six harm with Zi, the Rat.',
                    'Part of the [[bazi.relationship.three-punishment]] of Chou, Xu and Wei.',
                ],
            },
            {
                id: 'in-interpretation',
                heading: 'In interpretation',
                paragraphs: [
                    'A Wei month adds heat to whatever Day Master is born in it, and practitioners often look first for water to moisten the chart. Dry earth is also a poor mother to metal: for a Xin Day Master, Wei is said to bury the jewel more than to feed it.',
                ],
            },
        ],
        related: ['bazi.element.earth', 'bazi.branch.chou-ox', 'bazi.branch.wu-horse', 'bazi.relationship.six-harm', 'bazi.stem.ji'],
    },
    {
        id: 'bazi.branch.shen-monkey',
        library: 'bazi',
        category: 'branch',
        title: 'Shen · Monkey',
        summary: 'Shen is the yang metal of early autumn, holding Geng, Ren and Wu 戊; water is born in it, and it opens the water frame.',
        glyph: '申',
        keywords: ['申', 'Shēn', 'Monkey', 'Monkey branch', 'early autumn', 'water born'],
        sections: [
            {
                id: 'core-meaning',
                heading: 'Autumn begins',
                paragraphs: [
                    'Shen starts at Li Qiu, “the start of autumn”, around 8 August, while the weather is still hot, and lasts to Bai Lu, “white dew”, in early September. Its hours are 15:00 to 17:00, the late afternoon. It is yang metal: the season has turned from growth to harvest even if the temperature has not yet followed.',
                ],
            },
            {
                id: 'hidden-stems',
                heading: 'Metal carrying water',
                paragraphs: [
                    'Geng is the primary hidden stem, Ren the secondary and Wu 戊 the tertiary. Ren matters most for interpretation: water is said to be born in Shen, as the generating cycle runs from metal to water, and Shen opens the water frame of Shen, Zi and Chen. A Ren Day Master finds a root here; a Geng Day Master finds its main one.',
                ],
            },
            {
                id: 'the-animal',
                heading: 'Monkey and movement',
                paragraphs: [
                    'The Monkey is quick, clever and inventive in popular lore. More technically, Shen belongs with Yin 寅, Si and Hai to the four season-opening branches associated with movement and travel, and it faces Yin 寅 directly across the circle. That opposition – the first branch of autumn against the first of spring – is one of the more forceful clashes, metal against wood with fire and water hidden on both sides.',
                ],
            },
            {
                id: 'relationships',
                heading: 'Main relationships',
                list: [
                    'Six clash with Yin 寅, the Tiger.',
                    'Six harmony with Si, the Snake, traditionally cited as producing water.',
                    'Opens the water frame with Zi and Chen.',
                    'Six harm with Hai, the Pig.',
                    'Part of the three punishment of Yin 寅, Si and Shen; with Si it is therefore both harmony and punishment.',
                ],
            },
            {
                id: 'in-interpretation',
                heading: 'In interpretation',
                paragraphs: [
                    'Because it holds metal and water together, Shen in a chart tends to be read as productive output for metal stems and as quiet support for water stems. Its harsher side shows when it meets Yin 寅, either in the natal chart or through a [[bazi.foundations.luck-pillars|Luck Pillar]] or year.',
                ],
            },
        ],
        related: ['bazi.element.metal', 'bazi.stem.geng', 'bazi.branch.yin-tiger', 'bazi.relationship.six-clash', 'bazi.relationship.six-harmony'],
    },
    {
        id: 'bazi.branch.you-rooster',
        library: 'bazi',
        category: 'branch',
        title: 'You · Rooster',
        summary: 'You 酉 is pure yin metal: the month of the autumn equinox, the hours of sunset and the west, with Xin as its only hidden stem.',
        glyph: '酉',
        keywords: ['酉', 'You', 'Yǒu', 'Yu (Wade–Giles)', 'Rooster', 'Cock', 'Chicken', 'Rooster branch', 'mid-autumn', 'autumn equinox'],
        sections: [
            {
                id: 'core-meaning',
                heading: 'Autumn at its centre',
                paragraphs: [
                    'The You month runs from Bai Lu, around 8 September, to Han Lu, “cold dew”, in early October, and contains the autumn equinox. Its hours are 17:00 to 19:00, sunset, and its direction is due west. It is the mirror of Mao: where Mao is spring in leaf, You is the harvest in, the fields cut, the year contracting.',
                    'Like Zi and Mao, it holds a single hidden stem, Xin, and so is metal without admixture. A Geng or Xin Day Master born in this month stands at the centre of its season.',
                ],
            },
            {
                id: 'symbolism',
                heading: 'Rooster and wine jar',
                paragraphs: [
                    'The Rooster gives the branch associations of precision, display and punctuality – the bird that keeps time. The character 酉 itself is older than the animal list and began as a picture of a wine jar; it survives as a component of 酒, wine. Neither image changes how the branch works, but both fit metal’s season of harvest and fermentation.',
                ],
            },
            {
                id: 'relationships',
                heading: 'Main relationships',
                list: [
                    'Six clash with Mao, the Rabbit: pure metal against pure wood.',
                    'Six harmony with Chen, the Dragon, traditionally cited as producing metal.',
                    'Centre of the metal frame with Si and Chou.',
                    'Six harm with Xu, the Dog.',
                    'One of the four [[bazi.relationship.self-punishment]] branches when it appears twice.',
                ],
            },
            {
                id: 'in-interpretation',
                heading: 'In interpretation',
                paragraphs: [
                    'Its purity makes You easy to place: whatever metal means for a given Day Master – Wealth for fire, Output for earth, Resource for water – it brings undiluted. Under a Yi Day Master, as in a Yi You day pillar, it is Seven Killings seated directly beneath the self, a pairing the tradition treats with some caution. Under a Ding Day Master, by contrast, the same branch is Indirect Wealth: a fire stem sitting on the metal it controls.',
                ],
            },
        ],
        related: ['bazi.element.metal', 'bazi.stem.xin', 'bazi.branch.mao-rabbit', 'bazi.relationship.six-clash', 'bazi.relationship.self-punishment'],
    },
    {
        id: 'bazi.branch.xu-dog',
        library: 'bazi',
        category: 'branch',
        title: 'Xu · Dog',
        summary: 'Xu is the dry earth of late autumn and the storehouse of fire, holding Wu 戊, Xin and Ding.',
        glyph: '戌',
        keywords: ['戌', 'Xū', 'Hsu', 'Dog', 'Dog branch', 'late autumn', 'dry earth', 'fire storehouse'],
        sections: [
            {
                id: 'at-a-glance',
                heading: 'At a glance',
                list: [
                    'Month: from Han Lu (around 8 October) to Li Dong (around 7 November).',
                    'Hours: 19:00 to 21:00, the evening after dark.',
                    'Phase and polarity: earth, yang; the transition from autumn to winter.',
                    'Hidden stems: Wu 戊 (primary), Xin (secondary), Ding (tertiary).',
                ],
            },
            {
                id: 'core-meaning',
                heading: 'The banked fire',
                paragraphs: [
                    'Xu closes the autumn. Its earth is dry – the stubble field after harvest, the hillside before frost – and it holds two other phases besides its own. Xin is the last of autumn’s metal. Ding is fire put away for the winter, like embers banked in a hearth, and it makes Xu the end-point of the fire frame of Yin 寅, Wu 午 and Xu.',
                    'That stored fire is easily overlooked. A fire Day Master with Xu in the chart has a root, if a modest one; and when Xu is opened by a clash, the tradition pictures the hidden fire being released.',
                ],
            },
            {
                id: 'the-animal',
                heading: 'The Dog',
                paragraphs: [
                    'The Dog, guardian of the house after nightfall, gives the branch its popular associations of loyalty and watchfulness. The image of a guarded hearth suits a branch that keeps fire safely in storage, but the chart uses the stems inside, not the character of the animal.',
                ],
            },
            {
                id: 'relationships',
                heading: 'Main relationships',
                list: [
                    'Six clash with Chen, the Dragon: the storehouses of fire and water opened against each other.',
                    'Six harmony with Mao, the Rabbit, traditionally cited as producing fire.',
                    'Closes the fire frame with Yin 寅 and Wu 午.',
                    'Six harm with You, the Rooster.',
                    'Part of the [[bazi.relationship.three-punishment]] of Chou, Xu and Wei.',
                ],
            },
            {
                id: 'in-interpretation',
                heading: 'In interpretation',
                paragraphs: [
                    'A Day Master born in the Xu month is measured against an earth season, but one that still holds autumn metal and banked fire. If Mao appears elsewhere in the chart, the six harmony traditionally cited as producing fire can bring that stored warmth forward.',
                ],
            },
        ],
        related: ['bazi.element.earth', 'bazi.branch.chen-dragon', 'bazi.stem.ding', 'bazi.relationship.three-harmony', 'bazi.relationship.three-punishment'],
    },
    {
        id: 'bazi.branch.hai-pig',
        library: 'bazi',
        category: 'branch',
        title: 'Hai · Pig',
        summary: 'Hai, the last Earthly Branch, is the water of early winter, holding Ren and Jia; wood is born in it, and it opens the wood frame.',
        glyph: '亥',
        keywords: ['亥', 'Hài', 'Pig', 'Boar', 'Pig branch', 'early winter', 'wood born'],
        sections: [
            {
                id: 'core-meaning',
                heading: 'Winter begins',
                paragraphs: [
                    'Hai starts at Li Dong, “the start of winter”, around 7 November, and runs to Da Xue, “great snow”, in early December. Its hours are 21:00 to 23:00, the last before the Zi period turns the day. It is water, labelled yin by position, with Ren – yang water – as its primary hidden stem.',
                    'As the twelfth branch Hai closes the circle, and the tradition reads it, like Gui among the stems, as an ending that contains a beginning.',
                ],
            },
            {
                id: 'seed-of-wood',
                heading: 'The seed of wood',
                paragraphs: [
                    'Hai’s second hidden stem is Jia. Wood begins its life here, a seed lying in cold water months before spring, and Hai opens the wood frame of Hai, Mao and Wei. It also forms a six harmony with Yin 寅, the first branch of spring, traditionally cited as producing wood. For a Jia Day Master, then, Hai is both resource and root.',
                ],
            },
            {
                id: 'the-animal',
                heading: 'The Pig',
                paragraphs: [
                    'In Chinese lore the Pig stands for plenty, contentment and an open nature, and it arrives last in the race of the animals. Hai is also one of the four branches that open a season, associated with movement. The branch’s real substance in a chart, though, is deep water carrying the first germ of spring.',
                ],
            },
            {
                id: 'relationships',
                heading: 'Main relationships',
                list: [
                    'Six clash with Si, the Snake: water against fire at the openings of winter and summer.',
                    'Six harmony with Yin 寅, the Tiger.',
                    'Opens the wood frame with Mao and Wei.',
                    'Six harm with Shen, the Monkey.',
                    'A [[bazi.relationship.self-punishment]] branch when doubled.',
                ],
            },
            {
                id: 'in-interpretation',
                heading: 'In interpretation',
                paragraphs: [
                    'In a chart, Hai is read partly as water and partly as a promise of wood. Where Yin 寅 or Mao is also present, the tradition sees the wood coming forward – for a water Day Master, its Output – while a chart full of other winter branches keeps Hai firmly in its own phase.',
                ],
            },
        ],
        related: ['bazi.element.water', 'bazi.stem.ren', 'bazi.stem.jia', 'bazi.branch.si-snake', 'bazi.branch.yin-tiger', 'bazi.relationship.three-harmony'],
    },
];
