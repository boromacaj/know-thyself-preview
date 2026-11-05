export const ARTICLES = [
    {
        id: 'bazi.relationship.stem-combination',
        library: 'bazi',
        category: 'relationship',
        title: 'Stem Combination',
        summary: 'The five stem combinations pair each yang stem with the yin stem it controls; each pair is traditionally linked to a resulting phase, though combining is not the same as transforming.',
        glyph: '合',
        keywords: ['天干五合', 'five stem combinations', 'heavenly stem combination', 'stem harmony', 'tian gan he', 'combination'],
        sections: [
            {
                id: 'the-pairs',
                heading: 'The five pairs',
                list: [
                    'Jia with Ji – cited as producing earth.',
                    'Yi with Geng – cited as producing metal.',
                    'Bing with Xin – cited as producing water.',
                    'Ding with Ren – cited as producing wood.',
                    'Wu 戊 with Gui – cited as producing fire.',
                ],
            },
            {
                id: 'core-meaning',
                heading: 'The pattern',
                paragraphs: [
                    'Each pair joins a stem with the one five places after it, and in every case a yang stem with the yin stem it controls. Seen from the yang side the partner is its [[bazi.ten-god.direct-wealth]]; from the yin side, its [[bazi.ten-god.direct-officer]]. The tradition reads this as attraction across difference – a bond rather than a blow.',
                ],
            },
            {
                id: 'in-interpretation',
                heading: 'Binding and transformation',
                paragraphs: [
                    'A combined stem is said to be tied: drawn towards its partner and less free to act in its usual role. When the Day Master itself combines with a neighbouring stem, the reading is of strong attachment to whatever that stem represents.',
                    'Classical texts allow a combination to transform into its resulting phase only under conditions, chiefly a month that supports that phase. The app does not model those conditions. It reports the pair and the traditionally cited phase, and never asserts that the transformation has happened.',
                ],
            },
        ],
        related: ['bazi.relationship.stem-clash', 'bazi.ten-god.direct-wealth', 'bazi.ten-god.direct-officer', 'bazi.stem.jia', 'bazi.relationship.six-harmony'],
    },
    {
        id: 'bazi.relationship.stem-clash',
        library: 'bazi',
        category: 'relationship',
        title: 'Stem Clash',
        summary: 'A stem clash sets two stems of the same polarity on a controlling line against each other; the commonly cited four are Jia–Geng, Yi–Xin, Bing–Ren and Ding–Gui.',
        glyph: '冲',
        keywords: ['天干相冲', 'stem clash', 'heavenly stem clash', 'tian gan chong', 'stem opposition'],
        sections: [
            {
                id: 'the-pairs',
                heading: 'The four clashes',
                list: [
                    'Jia and Geng – yang wood and yang metal.',
                    'Yi and Xin – yin wood and yin metal.',
                    'Bing and Ren – yang fire and yang water.',
                    'Ding and Gui – yin fire and yin water.',
                ],
            },
            {
                id: 'core-meaning',
                heading: 'Why these four',
                paragraphs: [
                    'In each pair one stem controls the other through the [[bazi.foundations.controlling-cycle]], and the two share a polarity – the same uncompromising relation that the Ten Gods call [[bazi.ten-god.seven-killings]]. The stems sit opposite each other in the decimal cycle. Wu 戊 and Ji are usually left out: earth is the centre, and the stems that would face them are earth too.',
                ],
            },
            {
                id: 'in-interpretation',
                heading: 'Reading a clash',
                paragraphs: [
                    'Stems are the visible layer of a chart, so a stem clash is read as open, external conflict: competing aims, a direct challenge, a choice that cannot be avoided. It is usually treated as strongest between adjacent pillars and when it involves the Day Master.',
                    'Not every clash harms. A strong Jia is said to need Geng to become timber, and Bing and Ren, both strong, form the admired picture of sun over water. The balance of strength decides whether the controlled stem is shaped or overwhelmed.',
                ],
            },
        ],
        related: ['bazi.relationship.stem-combination', 'bazi.relationship.six-clash', 'bazi.foundations.controlling-cycle', 'bazi.stem.geng', 'bazi.stem.ren'],
    },
    {
        id: 'bazi.relationship.six-clash',
        library: 'bazi',
        category: 'relationship',
        title: 'Six Clash',
        summary: 'The six clashes pair each branch with the one directly opposite it on the circle of twelve – Zi–Wu, Chou–Wei, Yin–Shen, Mao–You, Chen–Xu and Si–Hai – and are read as movement and disruption.',
        glyph: '六冲',
        keywords: ['六冲', 'liu chong', 'six clashes', 'branch clash', 'opposition', 'chong'],
        sections: [
            {
                id: 'the-pairs',
                heading: 'The six pairs',
                list: [
                    'Zi 子 – Wu 午 and Mao 卯 – You 酉: the mid-season branches, pure water against fire, wood against metal.',
                    'Yin 寅 – Shen 申 and Si 巳 – Hai 亥: the season-opening branches, each carrying a mix of phases.',
                    'Chen 辰 – Xu 戌 and Chou 丑 – Wei 未: the earth storehouses facing one another.',
                ],
            },
            {
                id: 'core-meaning',
                heading: 'Opposite points of the year',
                paragraphs: [
                    'Each branch clashes with the one six places away – the same month on the other side of the year, the same hour twelve hours later. The three groups behave differently. The mid-season clashes are the most direct, single phase against single phase. The season-opening clashes are associated with movement, travel and sudden change. The earth clashes are less a fight between phases than a forcing open of two storehouses, releasing what each holds.',
                ],
            },
            {
                id: 'in-interpretation',
                heading: 'In interpretation',
                paragraphs: [
                    'A clash shakes loose whatever the two pillars stand for. In the day branch it touches the spouse palace; in the month, the setting of work and upbringing. Clashes also arise between natal branches and those of Luck Pillars and years, which is why practitioners pay attention to a year whose branch opposes the [[bazi.pillar.day|day branch]]. Movement is not necessarily loss, and a clash can also break a binding that held a branch back.',
                ],
            },
        ],
        related: ['bazi.relationship.six-harmony', 'bazi.relationship.stem-clash', 'bazi.branch.zi-rat', 'bazi.branch.mao-rabbit', 'bazi.pillar.day', 'bazi.foundations.luck-pillars'],
    },
    {
        id: 'bazi.relationship.six-harmony',
        library: 'bazi',
        category: 'relationship',
        title: 'Six Harmony',
        summary: 'The six harmonies pair branches in a fixed pattern – Zi–Chou, Yin–Hai, Mao–Xu, Chen–You, Si–Shen and Wu–Wei – read as affinity and binding.',
        glyph: '六合',
        keywords: ['六合', 'liu he', 'six harmonies', 'six combinations', 'branch combination', 'secret friend'],
        sections: [
            {
                id: 'the-pairs',
                heading: 'The six pairs',
                list: [
                    'Zi and Chou – cited as producing earth.',
                    'Yin 寅 and Hai – cited as producing wood.',
                    'Mao and Xu – cited as producing fire.',
                    'Chen and You – cited as producing metal.',
                    'Si and Shen – cited as producing water.',
                    'Wu 午 and Wei – no resulting phase agreed across sources; the app cites none.',
                ],
            },
            {
                id: 'core-meaning',
                heading: 'The pattern',
                paragraphs: [
                    'Drawn on the circle of twelve, the pairs are parallel chords: Zi–Chou and Wu 午–Wei at either end, the other four stacked between them. Each joins a yang branch with a yin one. Some sources give Zi–Chou as water rather than earth; the app follows the more common earth attribution.',
                ],
            },
            {
                id: 'in-interpretation',
                heading: 'In interpretation',
                paragraphs: [
                    'A harmony is read as an affinity between the areas of life two pillars represent – cooperation, mutual attraction, help that arrives quietly. Like a stem combination it also binds: a branch caught in a harmony is less available for its other relationships, and a harmony can soften a clash involving one of its members.',
                    'As with the stems, the cited phase is a tradition, not a guaranteed transformation, and the app records only the pairing. Popular zodiac lists of “secret friend” animals are drawn from this table.',
                ],
            },
        ],
        related: ['bazi.relationship.three-harmony', 'bazi.relationship.six-clash', 'bazi.relationship.six-harm', 'bazi.relationship.stem-combination', 'bazi.branch.wu-horse'],
    },
    {
        id: 'bazi.relationship.three-harmony',
        library: 'bazi',
        category: 'relationship',
        title: 'Three Harmony',
        summary: 'The three harmonies group branches four apart into frames of a single phase – Shen–Zi–Chen water, Hai–Mao–Wei wood, Yin–Wu–Xu fire and Si–You–Chou metal.',
        glyph: '三合',
        keywords: ['三合', 'san he', 'three harmonies', 'three combinations', 'triangle of affinity', 'frame', 'bureau', '三合局'],
        sections: [
            {
                id: 'the-groups',
                heading: 'The four frames',
                list: [
                    'Shen 申 – Zi 子 – Chen 辰: water.',
                    'Hai 亥 – Mao 卯 – Wei 未: wood.',
                    'Yin 寅 – Wu 午 – Xu 戌: fire.',
                    'Si 巳 – You 酉 – Chou 丑: metal.',
                ],
            },
            {
                id: 'core-meaning',
                heading: 'Birth, peak and storage',
                paragraphs: [
                    'Each frame traces the life of one phase through the year. The first branch is where the phase is said to be born, the middle branch is its peak and the last is where it is stored: water born in Shen, at full strength in Zi, laid up in Chen. That is why the earth branches close the frames – each is the storehouse of the phase whose triad it ends. Earth has no frame of its own.',
                ],
            },
            {
                id: 'in-interpretation',
                heading: 'Full and partial frames',
                paragraphs: [
                    'All three branches present form a full frame, read as a strong concentration of its phase that can dominate the balance of a chart. Any two form a partial frame, which the app reports along with the missing branch; a Luck Pillar or year supplying that branch is often read as the moment the frame completes. Many practitioners regard pairs that include the middle branch as the stronger halves.',
                    'The app records presence and never asserts that the branches have transformed. It also does not compute the directional (seasonal) combinations such as Yin 寅–Mao–Chen.',
                ],
            },
        ],
        related: ['bazi.relationship.six-harmony', 'bazi.foundations.hidden-stems', 'bazi.element.earth', 'bazi.branch.chen-dragon', 'bazi.foundations.bazi-and-the-chinese-zodiac'],
    },
    {
        id: 'bazi.relationship.six-harm',
        library: 'bazi',
        category: 'relationship',
        title: 'Six Harm',
        summary: 'The six harms – Zi–Wei, Chou–Wu, Yin–Si, Mao–Chen, Shen–Hai and You–Xu – are quieter frictions in which one branch undermines another’s alliances.',
        glyph: '六害',
        keywords: ['六害', 'liu hai', 'six harms', 'six damages', 'branch harm', 'mutual harm'],
        sections: [
            {
                id: 'the-pairs',
                heading: 'The six pairs',
                list: [
                    'Zi 子 and Wei 未.',
                    'Chou 丑 and Wu 午.',
                    'Yin 寅 and Si 巳.',
                    'Mao 卯 and Chen 辰.',
                    'Shen 申 and Hai 亥.',
                    'You 酉 and Xu 戌.',
                ],
            },
            {
                id: 'core-meaning',
                heading: 'How a harm arises',
                paragraphs: [
                    'The table follows from the six harmonies and six clashes. Zi’s natural partner is Chou, and Wei clashes with Chou; Wei therefore “harms” Zi by breaking up the alliance it depends on. Every pair can be traced the same way: one branch clashes with the other’s [[bazi.relationship.six-harmony|six-harmony]] partner.',
                ],
            },
            {
                id: 'in-interpretation',
                heading: 'In interpretation',
                paragraphs: [
                    'Harms are read as indirect damage rather than open conflict – misunderstandings, interference by third parties, support that is quietly withdrawn, relationships soured by something neither side names. They are generally weighed below clashes and punishments, and gain importance when they involve the day or month branch.',
                    'Two harms overlap other tables. Yin 寅 and Si also belong to the punishment of ungratefulness, so their meeting is read twice over. Mao and Chen are neighbours in spring, the wood branch and the earth branch that follows it, and their harm is pictured as crowding rather than attack.',
                    'Some schools also list a set of “destructions” (破) between branches; the app does not compute those.',
                ],
            },
        ],
        related: ['bazi.relationship.six-harmony', 'bazi.relationship.six-clash', 'bazi.relationship.three-punishment', 'bazi.branch.zi-rat', 'bazi.branch.wei-goat'],
    },
    {
        id: 'bazi.relationship.three-punishment',
        library: 'bazi',
        category: 'relationship',
        title: 'Three Punishment',
        summary: 'Two trios of branches form the three punishments: Yin–Si–Shen, the punishment of ungratefulness, and Chou–Xu–Wei, the punishment of relying on power.',
        glyph: '三刑',
        keywords: ['三刑', 'san xing', 'three penalties', 'punishment', 'ungrateful punishment', 'bullying punishment', '无恩之刑', '恃势之刑'],
        sections: [
            {
                id: 'the-groups',
                heading: 'The two trios',
                list: [
                    'Yin 寅 – Si 巳 – Shen 申: the punishment of ungratefulness, harm arising where favour or obligation was expected.',
                    'Chou 丑 – Xu 戌 – Wei 未: the punishment of relying on power, harm arising from force, status or stubbornness.',
                ],
            },
            {
                id: 'core-meaning',
                heading: 'Layered relationships',
                paragraphs: [
                    'Both trios overlap with other tables, which helps explain their reputation. Within Yin 寅–Si–Shen, Yin 寅 and Shen clash, Yin 寅 and Si harm each other, and Si and Shen are a six harmony – alliance and conflict tangled in one group. Chou, Xu and Wei are three of the four earth storehouses, and Chou–Wei is a clash; the friction is between weights rather than opposites. With all three present, the metal, fire and wood they keep are disturbed at once.',
                ],
            },
            {
                id: 'in-interpretation',
                heading: 'In interpretation',
                paragraphs: [
                    'Punishments are read as complication and entanglement: obligations that turn sour, disputes that escalate through pride, formal or disciplinary trouble in older texts. Any two branches of a trio form a partial punishment, which the app reports alongside the missing branch; the full trio is weighed more heavily.',
                    'The single-pair punishment of Zi and Mao has its own article, [[bazi.relationship.mutual-punishment]], as does [[bazi.relationship.self-punishment]].',
                ],
            },
        ],
        related: ['bazi.relationship.mutual-punishment', 'bazi.relationship.self-punishment', 'bazi.branch.yin-tiger', 'bazi.branch.chou-ox', 'bazi.relationship.six-harm'],
    },
    {
        id: 'bazi.relationship.mutual-punishment',
        library: 'bazi',
        category: 'relationship',
        title: 'Mutual Punishment',
        summary: 'The mutual punishment is a single pair, Zi and Mao, called the punishment of impropriety – friction between branches that should, by the generating cycle, be close.',
        glyph: '子卯刑',
        keywords: ['子卯相刑', 'Zi–Mao punishment', 'punishment of impropriety', 'punishment of rudeness', '无礼之刑', 'mutual penalty'],
        sections: [
            {
                id: 'core-meaning',
                heading: 'One pair',
                paragraphs: [
                    'Of the punishments, only this one involves two branches rather than a trio: Zi 子, pure water at midwinter, and Mao 卯, pure wood at mid-spring. Water generates wood, so on the generating cycle the two are mother and child. The tradition names their punishment “impropriety” or “discourtesy” (无礼): a relation that should be nurturing but lacks respect, the child taking the mother for granted, the mother overwhelming the child.',
                ],
            },
            {
                id: 'in-interpretation',
                heading: 'In interpretation',
                paragraphs: [
                    'The Zi–Mao punishment is read as friction in close quarters – familiarity that turns into carelessness, boundaries crossed between people who know each other well, manners lost in private. Its weight depends on position: between the day branch and the month or hour, it is read in family and domestic terms; between a natal branch and a year, as a passing strain.',
                    'The pair can coexist with other relationships. Zi may at the same time be in harmony with Chou or part of the water frame, and those are read alongside the punishment rather than cancelled by it. Popular compatibility lists that call the Rat and the Rabbit an awkward match draw on this pairing.',
                ],
            },
        ],
        related: ['bazi.relationship.three-punishment', 'bazi.relationship.self-punishment', 'bazi.branch.zi-rat', 'bazi.branch.mao-rabbit', 'bazi.foundations.generating-cycle'],
    },
    {
        id: 'bazi.relationship.self-punishment',
        library: 'bazi',
        category: 'relationship',
        title: 'Self-Punishment',
        summary: 'Four branches – Chen, Wu 午, You and Hai – are said to punish themselves when the same branch appears in two pillars of a chart.',
        glyph: '自刑',
        keywords: ['自刑', 'zi xing', 'self-penalty', 'self punishment', 'Chen Chen', 'Wu Wu', 'You You', 'Hai Hai'],
        sections: [
            {
                id: 'core-meaning',
                heading: 'Doubled branches',
                paragraphs: [
                    'A self-punishment needs repetition: two Chen, two Wu 午, two You or two Hai in different pillars. One of each branch does nothing on its own. Doubling other branches – two Zi, two Yin 寅 – is not a punishment, simply more of that branch.',
                    'The four come from four different phases: Chen earth, Wu 午 fire, You metal, Hai water. Wood is the absent phase, its branches already involved in the other punishments. Each of the four is otherwise a strong position – Wu 午 and You 酉 mark the peaks of summer and autumn, Chen a storehouse, Hai the source of wood – and the punishment is read as that strength reflected back on itself.',
                ],
            },
            {
                id: 'in-interpretation',
                heading: 'In interpretation',
                paragraphs: [
                    'The reading is of trouble without an outside opponent: a quality pushed past its useful limit until it turns on itself. Practitioners associate it with self-criticism, repeated patterns, overwork, or decisions undone by second thoughts, and colour it with the branch involved – doubled fire as restlessness, doubled metal as severity, doubled water as worry, doubled earth as obstinacy.',
                    'The app detects self-punishment only within the natal chart. A Luck Pillar or year repeating one of these branches is sometimes read the same way by practitioners.',
                ],
            },
        ],
        related: ['bazi.relationship.three-punishment', 'bazi.relationship.mutual-punishment', 'bazi.branch.chen-dragon', 'bazi.branch.you-rooster', 'bazi.branch.hai-pig'],
    },
];
