export const ARTICLES = [
    {
        id: 'bazi.pillar.year',
        library: 'bazi',
        category: 'pillar',
        title: 'Year Pillar',
        summary: 'The Year Pillar is the stem and branch of the solar year of birth, counted from Li Chun; it is read as ancestry, family background and the wider social world.',
        glyph: '年',
        keywords: ['年柱', 'nian zhu', 'year pillar', 'ancestors palace', 'year stem', 'year branch', 'year animal'],
        sections: [
            {
                id: 'calculation',
                heading: 'How it is found',
                paragraphs: [
                    'The year pillar is the sexagenary label of the solar year in which a person is born. That year starts at Li Chun, when the Sun reaches 315° of longitude, around 4 February; a birth on 20 January 1990 therefore takes the pillar of 1989. The app searches for the exact Li Chun moment each year and counts the cycle from 1984, a Jia Zi year, so that 2024 is Jia Chen and 2026 is Bing Wu 午.',
                    'Without a known birth time, a birth on the day of Li Chun is evaluated at a midday estimate and may fall on either side of the boundary.',
                ],
            },
            {
                id: 'core-meaning',
                heading: 'What it is read as describing',
                paragraphs: [
                    'Of the four positions, the year is the outermost. Classical texts call it the palace of ancestors and read it for grandparents, family origins and the social circumstances into which someone is born – the class, community and times that frame a life before any personal choice. By extension it is associated with how a person stands in public and in large groups, and with childhood and early life. The Yuanhai Ziping compares the four pillars to a plant – the year the root, the month the shoot, the day the flower, the hour the fruit – and the Sanming Tonghui reads the year as the source of the chart and as the father, a sign that the family assignments have shifted between manuals.',
                    'Because it is shared by everyone born in the same year, the pillar is read as backdrop rather than character. Its influence on the Day Master is real but distant, and practitioners weight it less than the month or the day.',
                ],
            },
            {
                id: 'two-special-roles',
                heading: 'Two special roles',
                list: [
                    'The polarity of the year stem is half of the classical rule for the direction of the [[bazi.foundations.luck-pillars]].',
                    'The year stem sets the stem of the first month: a Jia or Ji year always begins with a Bing Yin 寅 month, a Yi or Geng year with Wu 戊 Yin 寅, and so on through the cycle.',
                ],
            },
            {
                id: 'misconceptions',
                heading: 'Common misconceptions',
                paragraphs: [
                    'The year branch is the popular zodiac animal, which leads many to treat this pillar as the whole chart. In BaZi it is one position of four; [[bazi.foundations.bazi-and-the-chinese-zodiac]] explains the difference.',
                ],
            },
        ],
        related: ['bazi.pillar.month', 'bazi.foundations.the-solar-calendar', 'bazi.foundations.bazi-and-the-chinese-zodiac', 'bazi.foundations.luck-pillars', 'bazi.pillar.day'],
    },
    {
        id: 'bazi.pillar.month',
        library: 'bazi',
        category: 'pillar',
        title: 'Month Pillar',
        summary: 'The Month Pillar is set by the solar term in force at birth; its branch fixes the season, and it is read as parents, upbringing and the field of work.',
        glyph: '月',
        keywords: ['月柱', 'yue zhu', 'month pillar', 'month command', '月令', 'parents palace', 'career pillar', 'season of birth'],
        sections: [
            {
                id: 'calculation',
                heading: 'How it is found',
                paragraphs: [
                    'The month branch comes from the Sun. Each of the twelve Jie solar terms opens a month, from Li Chun (Yin 寅) to Xiao Han (Chou), and the app finds the term in force at the moment of birth by locating the Sun’s exact longitude. The month stem then follows from the year stem by a fixed rule: the first month of a Jia or Ji year is Bing Yin 寅, of a Yi or Geng year Wu 戊 Yin 寅, of a Bing or Xin year Geng Yin 寅, of a Ding or Ren year Ren Yin 寅, of a Wu 戊 or Gui year Jia Yin 寅, and each later month takes the next stem.',
                ],
            },
            {
                id: 'the-season',
                heading: 'The heaviest branch in the chart',
                paragraphs: [
                    'The month branch is the month command (月令): it decides which phase rules the season and therefore the [[bazi.foundations.seasonal-states]] of all five. No other single character weighs as much in judging the strength of the Day Master. A Geng Day Master born in a Shen or You month stands in its own season; the same stem born in a Wu 午 month is facing the summer fire that controls it.',
                ],
            },
            {
                id: 'core-meaning',
                heading: 'What it is read as describing',
                paragraphs: [
                    'The month is called the palace of parents and siblings. It is read for the household of upbringing and for the environment in which a person grows into adult life, and from there for career: the kind of work, the institutions and the conditions under which effort is spent. Older manuals assign it differently – the Sanming Tonghui gives the month to siblings and peers, keeping the father in the year – and modern teaching often links it with youth and early adulthood, though the exact ages vary between teachers.',
                    'The Yuanhai Ziping calls the month the chart’s guiding rope (提纲). The Ten God of the month stem, and especially of the month branch’s primary hidden stem, is often treated as the chart’s structure, the frame within which the rest is read.',
                ],
            },
            {
                id: 'luck',
                heading: 'Source of the Luck Pillars',
                paragraphs: [
                    'The [[bazi.foundations.luck-pillars]] are generated by stepping forward or backward through the sixty-pair cycle from this pillar, and their starting age is measured from the nearest Jie boundary to the birth.',
                ],
            },
        ],
        related: ['bazi.foundations.seasonal-states', 'bazi.foundations.the-solar-calendar', 'bazi.foundations.luck-pillars', 'bazi.foundations.day-master-strength', 'bazi.pillar.year'],
    },
    {
        id: 'bazi.pillar.day',
        library: 'bazi',
        category: 'pillar',
        title: 'Day Pillar',
        summary: 'The Day Pillar holds the Day Master above and the spouse palace below; it is read as the self and the closest partnership.',
        glyph: '日',
        keywords: ['日柱', 'ri zhu', 'day pillar', 'spouse palace', '夫妻宫', 'self pillar', 'day stem', 'day branch'],
        sections: [
            {
                id: 'calculation',
                heading: 'How it is found',
                paragraphs: [
                    'Days run through the sixty stem–branch pairs without ever resetting for months or years, so the day pillar is a matter of counting. The app derives it from the Julian Day Number of the local civil date. It changes at local midnight; true solar time is applied to the hour but never moves the day.',
                    'Births between 23:00 and midnight are a known point of disagreement. Some traditions advance the day pillar at 23:00, the start of the Zi hour; others keep the day until midnight but already use the next day’s stem for that late-Zi hour. The app does neither: the day changes at midnight and the hour stem follows the calendar day. It marks such births so the alternatives can be considered.',
                ],
            },
            {
                id: 'core-meaning',
                heading: 'Self and spouse',
                paragraphs: [
                    'The stem of this pillar is the [[bazi.foundations.day-master]], the character read as the person. The branch beneath it is called the spouse palace (夫妻宫) and is read for the closest partnership and, more broadly, for the private self that partners see – the ground the Day Master stands on at home. In the sequence of life stages it stands for the middle years.',
                    'Because the Day Master sits directly on it, the day branch is the most intimate root in the chart. A Jia Day Master on Yin 寅, its own phase, stands on firm ground; the same stem on Shen sits on the metal that controls it, a combination the tradition reads as pressure close to home.',
                ],
            },
            {
                id: 'in-interpretation',
                heading: 'In interpretation',
                paragraphs: [
                    'The sixty possible day pillars are sometimes described individually, each as a portrait of the stem on its branch. Practitioners treat these as a starting point. A clash between the day branch and another branch, or a combination that draws it elsewhere, is read as movement in the spouse palace, and those relationships – with the natal chart, Luck Pillars and years – carry much of the pillar’s meaning.',
                ],
            },
        ],
        related: ['bazi.foundations.day-master', 'bazi.foundations.the-solar-calendar', 'bazi.relationship.six-clash', 'bazi.pillar.hour', 'bazi.pillar.month'],
    },
    {
        id: 'bazi.pillar.hour',
        library: 'bazi',
        category: 'pillar',
        title: 'Hour Pillar',
        summary: 'The Hour Pillar comes from the two-hour period of birth; it is read as children, later life and inner aims, and the app leaves it Unavailable when the birth time is unknown.',
        glyph: '时',
        keywords: ['时柱', 'shi zhu', 'hour pillar', 'shichen', '时辰', 'children palace', 'birth time'],
        sections: [
            {
                id: 'calculation',
                heading: 'How it is found',
                paragraphs: [
                    'The day is divided into twelve two-hour periods, each with a branch: Zi from 23:00 to 01:00, Chou from 01:00 to 03:00, and so on to Hai from 21:00 to 23:00. The hour stem follows from the day stem: a Jia or Ji day begins with a Jia Zi hour, a Yi or Geng day with Bing Zi, a Bing or Xin day with Wu 戊 Zi, a Ding or Ren day with Geng Zi, a Wu 戊 or Gui day with Ren Zi.',
                    'The app places the birth in its period using true solar time, correcting clock time for the birthplace’s longitude and for the equation of time. When the correction moves a birth across a two-hour line, the civil-clock result is shown alongside for comparison. The stem of a late-evening Zi hour depends on how the day boundary is drawn; [[bazi.foundations.the-solar-calendar]] sets out the conventions and the app’s choice.',
                ],
            },
            {
                id: 'unknown-time',
                heading: 'When the time is unknown',
                paragraphs: [
                    'Without a birth time the hour pillar is shown as Unavailable. It is never filled in from a default such as noon, because a wrong hour pillar would add two false characters to the chart and change its Ten Gods, its relationships and its balance. The chart is read from the remaining six characters, and the app lowers its confidence in measures such as Day Master strength accordingly. [[synthesis.guide.birth-time-precision]] covers the wider issue.',
                ],
            },
            {
                id: 'core-meaning',
                heading: 'What it is read as describing',
                paragraphs: [
                    'The hour is the last and most inward of the four positions. Classical texts call it the palace of children, and by extension it is read for what a person produces and leaves behind – offspring, students, work that outlasts its author – and for later life, the last stage in the sequence that runs from the year pillar onwards. Many practitioners also read it as private aims and the plans someone keeps to themselves, the part of the chart least visible to others.',
                ],
            },
        ],
        related: ['bazi.foundations.the-solar-calendar', 'bazi.pillar.day', 'bazi.branch.zi-rat', 'synthesis.guide.birth-time-precision', 'bazi.foundations.day-master-strength'],
    },
];
