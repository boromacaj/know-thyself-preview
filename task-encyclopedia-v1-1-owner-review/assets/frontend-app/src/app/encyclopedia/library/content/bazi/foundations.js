export const ARTICLES = [
    {
        id: 'bazi.foundations.what-bazi-is',
        library: 'bazi',
        category: 'foundations',
        title: 'What BaZi Is',
        summary: 'BaZi, the Four Pillars of Destiny, writes a birth moment as eight characters of the Chinese calendar and reads them through the Five Phases and yin and yang.',
        glyph: '八字',
        keywords: ['Four Pillars of Destiny', '八字', 'Ba Zi', 'eight characters', 'Zi Ping', '子平', 'Chinese calendar astrology', 'Four Pillars'],
        sections: [
            {
                id: 'core-meaning',
                heading: 'Eight characters',
                paragraphs: [
                    'BaZi (八字) means “eight characters”. The name is literal: a birth moment is expressed as four units of the traditional Chinese calendar – year, month, day and two-hour period – and each unit is written with two characters, a Heavenly Stem on top and an Earthly Branch beneath. Set side by side as columns, the four pairs are the Four Pillars, and the eight characters are the whole raw material of the chart.',
                    'The common English name, “Four Pillars of Destiny”, is a translator’s flourish. Practitioners in the main lineage speak more modestly of reading a structure: which phases are present, which are missing, how they feed and restrain one another, and how the arrangement shifts as time moves through it.',
                ],
            },
            {
                id: 'background',
                heading: 'Calendar metaphysics',
                paragraphs: [
                    'The building blocks are far older than the method. Stems and branches were already used to count days in Shang-dynasty inscriptions, and pairing ten stems with twelve branches produces the sixty-step sexagenary cycle that still labels years, months, days and hours. Yin–yang theory and the Five Phases (五行 wu xing) later supplied a language for what each character stands for.',
                    'An earlier figure, Li Xuzhong of the Tang dynasty, is remembered in an epitaph by Han Yu for judging lifespan and rank from the year, month and day of birth, weighing the cyclical characters of each by how they generate, overcome, rise and decline. The technique as it is now practised is credited to Xu Ziping, usually placed in the tenth century at the turn from the Five Dynasties to the Song, which is why it is also called Zi Ping (子平). Later tradition says he completed the set with the hour and, more decisively, centred the chart on the stem of the day rather than on the year, organising a calendar date around a single point of reference: the [[bazi.foundations.day-master]].',
                    'These attributions reach us through later manuals – the Yuanhai Ziping, a Song compilation revised under the Ming, and the Ming-era Sanming Tonghui among them – and almost nothing is known of Xu’s life. The manuals do not agree in every detail; one even credits Li Xuzhong with the hour already. What is not in doubt is the order of development: a year-centred practice gave way to a day-centred one.',
                ],
            },
            {
                id: 'structure',
                heading: 'The layers of a chart',
                list: [
                    'Ten [[bazi.stem.jia|Heavenly Stems]] and twelve [[bazi.branch.zi-rat|Earthly Branches]], each carrying a phase and a polarity.',
                    'The Day Master, the day stem, against which every other character is measured through the Ten Gods.',
                    'Hidden stems inside each branch, which give the chart a second layer beneath the visible one.',
                    'The month branch, which sets the season and therefore which phases are in or out of their time.',
                    'Combinations, clashes, harms and punishments between characters.',
                    'Luck Pillars and annual pillars, which bring further characters into contact with the natal eight over time.',
                ],
            },
            {
                id: 'framework',
                heading: 'A framework, not a forecast',
                paragraphs: [
                    'In this library BaZi is treated as a traditional interpretive framework. A chart is not a measurement of personality and its cycles are not predictions; what the system offers is a precise, internally consistent vocabulary – derived from a calendar – for thinking about temperament, relationships and timing. [[synthesis.guide.symbolic-frameworks]] sets out how the app handles that distinction across all its systems.',
                ],
            },
            {
                id: 'misconceptions',
                heading: 'Common misconceptions',
                paragraphs: [
                    'BaZi is often mistaken for the zodiac of twelve animals. The year animal is only the branch of one pillar; see [[bazi.foundations.bazi-and-the-chinese-zodiac]]. Nor is BaZi lunar: its years and months follow the Sun through the solar terms, as explained in [[bazi.foundations.the-solar-calendar]].',
                ],
            },
        ],
        related: ['bazi.foundations.the-solar-calendar', 'bazi.foundations.day-master', 'bazi.pillar.day', 'bazi.foundations.bazi-and-the-chinese-zodiac', 'synthesis.pillar.bazi', 'synthesis.guide.symbolic-frameworks'],
    },
    {
        id: 'bazi.foundations.the-solar-calendar',
        library: 'bazi',
        category: 'foundations',
        title: 'The Solar Calendar',
        summary: 'BaZi counts years from Li Chun and months from the twelve Jie solar terms, while days run through an unbroken sixty-day cycle and hours fall into twelve two-hour periods.',
        glyph: '节气',
        keywords: ['solar terms', '节气', 'jieqi', 'Li Chun', '立春', 'Jie', '节', 'sexagenary cycle', '干支', 'ganzhi', 'shichen', '时辰', 'true solar time', 'Jie Qi'],
        sections: [
            {
                id: 'core-meaning',
                heading: 'A calendar of the Sun',
                paragraphs: [
                    'The Chinese calendar is two calendars in one. The lunar side sets festivals such as the New Year; the solar side divides the Sun’s yearly path into twenty-four solar terms, one every fifteen degrees of ecliptic longitude. BaZi uses only the solar side: the Sun crossing a boundary is what moves a chart from one pillar to the next.',
                ],
            },
            {
                id: 'year-and-month',
                heading: 'Years and months',
                paragraphs: [
                    'The year begins at Li Chun (立春, “start of spring”), when the Sun reaches 315°, usually on 3, 4 or 5 February. A birth in January or in the first days of February therefore belongs to the previous BaZi year, whatever the Gregorian calendar or the lunar New Year says.',
                    'Of the twenty-four terms, the twelve called Jie (节, “nodes”) open the months; the other twelve fall mid-month and do not move a pillar. Each Jie fixes the month’s branch:',
                ],
                list: [
                    'Li Chun 立春 (315°) – Yin 寅 month; Jing Zhe 惊蛰 (345°) – Mao 卯 month.',
                    'Qing Ming 清明 (15°) – Chen 辰 month; Li Xia 立夏 (45°) – Si 巳 month.',
                    'Mang Zhong 芒种 (75°) – Wu 午 month; Xiao Shu 小暑 (105°) – Wei 未 month.',
                    'Li Qiu 立秋 (135°) – Shen 申 month; Bai Lu 白露 (165°) – You 酉 month.',
                    'Han Lu 寒露 (195°) – Xu 戌 month; Li Dong 立冬 (225°) – Hai 亥 month.',
                    'Da Xue 大雪 (255°) – Zi 子 month; Xiao Han 小寒 (285°) – Chou 丑 month.',
                ],
            },
            {
                id: 'day-and-hour',
                heading: 'Days and hours',
                paragraphs: [
                    'Days ignore months and years altogether. They run through the sixty stem–branch pairs in an unbroken sequence that has been kept for well over two thousand years, so the day pillar of any date can be found by counting. The app computes it from the Julian Day Number and changes it at local civil midnight.',
                    'Hours are counted in twelve shichen (时辰) of two hours each, starting with the Zi period from 23:00 to 01:00, and the hour stem is derived from the day stem by a fixed table. Because the Zi period straddles midnight, schools divide over it. One starts the new day at 23:00, so the whole Zi period belongs to the following day. Another splits it into a “late” Zi before midnight and an “early” Zi after: the day pillar changes at midnight, but the late-Zi hour already takes the next day’s Zi stem.',
                    'The app changes the day at local civil midnight and treats 23:00–00:59 as one Zi window whose stem comes from the calendar day in force. A birth shortly before midnight therefore receives the Zi stem that opened that day, where both conventions above would give the stem of the next day’s Zi hour. Births in the 23:00 hour are flagged so the alternatives can be weighed.',
                ],
            },
            {
                id: 'in-the-app',
                heading: 'How the app handles time',
                paragraphs: [
                    'Solar-term boundaries are found by searching for the exact moment the Sun reaches each longitude, not by fixed dates. The hour pillar is taken from true solar time – clock time corrected for longitude and the equation of time – with the civil-clock result kept alongside for comparison when the two disagree.',
                    'When the birth time is unknown, the hour pillar is shown as Unavailable. It is never invented from a default time, and the chart is read from three pillars. A birth on the day of a solar term without a known time may also sit on either side of a year or month boundary; [[synthesis.guide.birth-time-precision]] discusses why that matters.',
                ],
            },
        ],
        related: ['bazi.pillar.year', 'bazi.pillar.month', 'bazi.pillar.day', 'bazi.pillar.hour', 'synthesis.guide.birth-time-precision'],
    },
    {
        id: 'bazi.foundations.yin-and-yang',
        library: 'bazi',
        category: 'foundations',
        title: 'Yin and Yang',
        summary: 'Every stem and branch carries a polarity, yang or yin; polarity splits each phase in two, decides which Ten God a stem becomes and sets the direction of the Luck Pillars.',
        glyph: '阴阳',
        keywords: ['yin yang', '阴阳', 'polarity', 'yang stems', 'yin stems', 'yin–yang'],
        sections: [
            {
                id: 'core-meaning',
                heading: 'Polarity as a working distinction',
                paragraphs: [
                    'Yin and yang began as the shaded and the sunlit side of a hill. In BaZi they work less as a philosophy than as a switch on every character: each phase appears once in a yang form and once in a yin form, which is how five phases become ten stems. Yang tends to be described as outward, expansive and conspicuous; yin as inward, concentrated and adaptive.',
                    'The alternation is strict. Counting from Jia, the odd-numbered stems – [[bazi.stem.jia|Jia]], Bing, Wu, Geng, Ren – are yang and the even-numbered ones – Yi, Ding, Ji, Xin, Gui – are yin. The branches alternate the same way from Zi.',
                ],
            },
            {
                id: 'in-the-calendar',
                heading: 'Why there are sixty pairs, not 120',
                paragraphs: [
                    'Because stems and branches both alternate and both start yang, a yang stem only ever meets a yang branch and a yin stem a yin branch. Jia Zi exists; Jia Chou never occurs. Ten stems and twelve branches therefore yield sixty combinations rather than 120, and polarity is the hidden rule that shapes the sexagenary cycle.',
                    'Branch polarity has a known wrinkle. By position Zi is yang, yet its single hidden stem is Gui, a yin stem; Wu 午 is yang by position but holds yin Ding; Si and Hai show the reverse, yin by position with yang Bing and Ren inside. The app labels the branches by position in its yin–yang count, while every hidden stem keeps its own polarity when its Ten God is worked out.',
                ],
            },
            {
                id: 'in-interpretation',
                heading: 'What polarity changes in a reading',
                list: [
                    'Ten Gods: whether a stem shares the Day Master’s polarity decides which of each pair it becomes – [[bazi.ten-god.friend]] or Rob Wealth, Eating God or Hurting Officer, and so on.',
                    'Luck Pillars: the polarity of the year stem is one half of the classical rule for running the decades forward or in reverse.',
                    'Balance: the app counts yang and yin across the visible characters, a coarse reading of how outward or contained a chart’s overall manner is.',
                ],
            },
            {
                id: 'misconceptions',
                heading: 'Common misconceptions',
                paragraphs: [
                    'Neither pole is better. Yang is not active virtue and yin passive weakness; a yin stem is simply the same phase in a more concentrated form. Nor should polarity be confused with the branch Yin 寅, the Tiger, whose name is a different word in Chinese – and which is, by position, a yang branch.',
                ],
            },
        ],
        related: ['bazi.foundations.generating-cycle', 'bazi.foundations.day-master', 'bazi.foundations.luck-pillars', 'bazi.branch.yin-tiger', 'bazi.ten-god.friend'],
    },
    {
        id: 'bazi.foundations.generating-cycle',
        library: 'bazi',
        category: 'foundations',
        title: 'The Generating Cycle',
        summary: 'In the generating cycle each phase produces the next – Wood, Fire, Earth, Metal, Water and back to Wood – and the relation underlies the Resource and Output stars.',
        glyph: '生',
        keywords: ['相生', 'xiang sheng', 'sheng cycle', 'production cycle', 'mother–child cycle', 'nourishing cycle', 'creative cycle'],
        sections: [
            {
                id: 'core-meaning',
                heading: 'The sequence',
                paragraphs: [
                    'The generating cycle (相生) arranges the Five Phases in the order of their production. [[bazi.element.wood|Wood]] feeds Fire; Fire leaves ash, which becomes Earth; Earth, compressed over time, yields Metal ore; Metal gathers Water, as cold metal condenses dew; and Water nourishes Wood, closing the ring. The images are mnemonic rather than physics, but the order they describe is fixed and the whole system depends on it.',
                    'The same order is the order of the seasons: spring wood, summer fire, autumn metal, winter water, with earth at the turning points between them.',
                ],
            },
            {
                id: 'mother-and-child',
                heading: 'Mother and child',
                paragraphs: [
                    'Classical texts describe the relation as mother and child. The phase that generates is the mother, the phase produced is the child. The language carries a cost that is easy to miss: a mother gives of itself, so generating is also a form of spending. A phase with many children is drained; a phase with too heavy a mother can be smothered, as in the stock image of wood set afloat and uprooted by too much water.',
                ],
            },
            {
                id: 'in-the-chart',
                heading: 'In a chart',
                list: [
                    'The phase that generates the Day Master supplies its Resource stars: [[bazi.ten-god.direct-resource]] and Indirect Resource.',
                    'The phase the Day Master generates gives its Output stars: [[bazi.ten-god.eating-god]] and Hurting Officer.',
                    'In the seasonal states, the phase a season generates is “aided”, and the phase that generated the season is “resting”.',
                    'In the app’s strength model, a Day Master’s own phase and its mother count as support; its child counts as drain.',
                ],
            },
            {
                id: 'misconceptions',
                heading: 'Common misconceptions',
                paragraphs: [
                    'Generation is not automatically good. Whether more of a mother phase helps depends on how strong the receiving phase already is, which is why the generating cycle is always read alongside the [[bazi.foundations.controlling-cycle]] and the season.',
                ],
            },
        ],
        related: ['bazi.foundations.controlling-cycle', 'bazi.foundations.seasonal-states', 'bazi.element.water', 'bazi.ten-god.direct-resource', 'bazi.ten-god.eating-god'],
    },
    {
        id: 'bazi.foundations.controlling-cycle',
        library: 'bazi',
        category: 'foundations',
        title: 'The Controlling Cycle',
        summary: 'In the controlling cycle each phase restrains another – Wood parts Earth, Earth dams Water, Water quenches Fire, Fire melts Metal, Metal cuts Wood – and it underlies the Wealth and Officer stars.',
        glyph: '克',
        keywords: ['相克', 'xiang ke', 'ke cycle', 'overcoming cycle', 'restraining cycle', 'destructive cycle', 'control cycle'],
        sections: [
            {
                id: 'core-meaning',
                heading: 'Who restrains whom',
                paragraphs: [
                    'Where the generating cycle links neighbours, the controlling cycle (相克) links each phase to the one two steps ahead of it. Roots break up soil, so Wood controls Earth. Banks contain rivers, so Earth controls Water. Water puts out Fire; Fire melts Metal; an axe fells a tree, so Metal controls Wood. Drawn inside the circle of generation, the five lines form a star.',
                ],
            },
            {
                id: 'control-is-not-destruction',
                heading: 'Control is not destruction',
                paragraphs: [
                    'The older English label “destructive cycle” misleads. In the tradition, control shapes as often as it harms: an untended tree grows wild until metal prunes it, and raw [[bazi.stem.geng|Geng]] metal becomes a tool only in the forge of Ding fire. A chart without its controlling phase can be read as lacking form or limit, not as spared from difficulty.',
                    'Control also depends on proportion. When the controlled phase is far stronger, the line reverses: great quantities of wood blunt the axe, a large fire boils off a little water. Classical writers call excessive control “overbearing” (乘) and this reversal “insulting” (侮).',
                ],
            },
            {
                id: 'in-the-chart',
                heading: 'In a chart',
                list: [
                    'The phase the Day Master controls gives its Wealth stars, [[bazi.ten-god.direct-wealth]] and Indirect Wealth.',
                    'The phase that controls the Day Master gives its authority stars, [[bazi.ten-god.direct-officer]] and Seven Killings.',
                    'In the seasonal states the phase that controls the season is “trapped” and the phase the season controls is “dead”.',
                    'The four commonly cited stem clashes – Jia–Geng, Yi–Xin, Bing–Ren, Ding–Gui – are same-polarity pairs on a controlling line.',
                ],
            },
        ],
        related: ['bazi.foundations.generating-cycle', 'bazi.foundations.seasonal-states', 'bazi.relationship.stem-clash', 'bazi.ten-god.direct-officer', 'bazi.ten-god.direct-wealth'],
    },
    {
        id: 'bazi.foundations.day-master',
        library: 'bazi',
        category: 'foundations',
        title: 'Day Master',
        summary: 'The stem at the top of the day pillar, called the Day Master, stands for the self; every other character in the chart is defined by its relation to it.',
        glyph: '日主',
        keywords: ['日主', 'ri zhu', '日元', 'ri yuan', 'day stem', 'self element', 'Day Master stem'],
        sections: [
            {
                id: 'core-meaning',
                heading: 'The point of reference',
                paragraphs: [
                    'Of the eight characters, one is singled out: the stem at the top of the day pillar. The tradition calls it the Day Master (日主) or Day Origin (日元) and reads it as the person. Everything else in the chart – the other three stems, the four branches, the stems hidden inside them, the decades of the Luck Pillars – is described by its relation to this one character.',
                    'That relation is what the Ten Gods name. A stem of the same phase is a companion; one the Day Master generates is output; one it controls is wealth; one that controls it is authority; one that generates it is resource. Polarity divides each relation into two, giving ten.',
                ],
            },
            {
                id: 'why-the-day',
                heading: 'Why the day',
                paragraphs: [
                    'Earlier Chinese fate calculation leaned on the year. The shift to the day stem, credited to Xu Ziping, gave the chart a centre that is much more individual: the year stem is shared by everyone born in a twelve-month span, while the day stem changes every day and cycles through all ten values in ten days. The [[bazi.pillar.day]] also places the Day Master above its own branch, read as the palace of the spouse.',
                ],
            },
            {
                id: 'the-ten',
                heading: 'The ten Day Masters',
                list: [
                    '[[bazi.stem.jia]] and [[bazi.stem.yi]] – wood as tree and as vine.',
                    '[[bazi.stem.bing]] and [[bazi.stem.ding]] – fire as sun and as lamp.',
                    '[[bazi.stem.wu]] and [[bazi.stem.ji]] – earth as mountain and as field.',
                    '[[bazi.stem.geng]] and [[bazi.stem.xin]] – metal as axe and as jewel.',
                    '[[bazi.stem.ren]] and [[bazi.stem.gui]] – water as ocean and as rain.',
                ],
            },
            {
                id: 'in-interpretation',
                heading: 'Reading the Day Master',
                paragraphs: [
                    'The Day Master is not a type to be read in isolation. A Jia tree born in spring, rooted in several wood branches, is a different proposition from the same stem born in autumn among metal, and practitioners spend more effort on that context – season, roots, support – than on the stem’s stock description. [[bazi.foundations.day-master-strength]] covers how the app summarises it.',
                ],
            },
        ],
        related: ['bazi.foundations.day-master-strength', 'bazi.pillar.day', 'bazi.ten-god.friend', 'bazi.foundations.seasonal-states', 'bazi.foundations.what-bazi-is'],
    },
    {
        id: 'bazi.foundations.day-master-strength',
        library: 'bazi',
        category: 'foundations',
        title: 'Day Master Strength',
        summary: 'Whether the Day Master is strong or weak – supported by its season, roots and allies or drained by what it must produce, control and answer to – is the first judgement in reading a chart.',
        glyph: '旺衰',
        keywords: ['身强', '身弱', 'strong Day Master', 'weak Day Master', 'wang shuai', 'self strength', 'Useful God', '用神', 'Yong Shen'],
        sections: [
            {
                id: 'core-meaning',
                heading: 'Why strength comes first',
                paragraphs: [
                    'Most of what a chart is said to mean depends on one prior question: how much the Day Master has behind it. A wealth star in a chart with a well-supported Day Master is read as resources that can be handled; the same star facing a depleted Day Master as a burden. The weighing looks first at the season set by the month branch, then at roots in the branches and at backing from the other stems; modern teaching sums these up as being in season (得令), having ground (得地) and having allies (得势).',
                    'The classical rule that follows is stated plainly in the Ditian Sui: a strong Day Master is helped by what drains or restrains it, a weak one by what supports it, with an exception for the most extreme charts. This judgement is the step before choosing a Useful God (用神), the phase a practitioner would treat as the chart’s most helpful. The app does not determine a Useful God, and it does not compute climate adjustment (调候), the separate test of whether a chart is too cold, hot, damp or dry.',
                ],
            },
            {
                id: 'in-the-app',
                heading: 'How the app estimates it',
                paragraphs: [
                    'The app uses a single, versioned heuristic. Characters of the Day Master’s own phase and of the phase that generates it count as support; the three remaining phases – output, wealth and authority – count as drain. Visible stems and branches carry a weight of one; hidden stems carry their conventional share (all of it for a single hidden stem, 70/30 for two, 60/30/10 for three). A branch therefore counts twice – once as its own phase and again through the stems inside it – which gives branches more weight than stems. Each weight is multiplied by its phase’s [[bazi.foundations.seasonal-states|seasonal state]]: ×1.5 prosperous, ×1.2 aided, ×1 resting, ×0.7 trapped, ×0.5 dead.',
                    'The share of support in the total gives the label:',
                ],
                list: [
                    'weak – support below 35%;',
                    'moderately-weak – 35% up to 45%;',
                    'balanced – 45% to 55%;',
                    'moderately-strong – above 55% up to 65%;',
                    'strong – above 65%;',
                    'indeterminate – a label that exists in the model’s vocabulary but that the current heuristic never assigns; every chart receives one of the five labels above.',
                ],
            },
            {
                id: 'confidence',
                heading: 'Confidence and limits',
                paragraphs: [
                    'The app reports how confident the estimate is: low when the hour pillar is missing, medium when the result sits within a few points of a threshold, otherwise high. It is presented as a balancing hypothesis. Another school, or another weighting of hidden stems, could place the same chart one step to either side.',
                ],
            },
            {
                id: 'misconceptions',
                heading: 'Common misconceptions',
                paragraphs: [
                    'Strong is not better than weak. The tradition reads a strong Day Master as able to carry output, wealth and authority, and therefore as benefiting from them; a weak one as needing resource and companions first. Some charts are so lopsided that classical texts treat them as “following” formations, read by different rules; the heuristic does not attempt those.',
                ],
            },
        ],
        related: ['bazi.foundations.day-master', 'bazi.foundations.seasonal-states', 'bazi.foundations.hidden-stems', 'bazi.ten-god.friend', 'bazi.ten-god.direct-resource'],
    },
    {
        id: 'bazi.foundations.seasonal-states',
        library: 'bazi',
        category: 'foundations',
        title: 'Seasonal States',
        summary: 'The month branch gives each of the five phases one of five seasonal states – prosperous, aided, resting, trapped or dead – describing how much the season favours it.',
        glyph: '旺相休囚死',
        keywords: ['旺相休囚死', 'wang xiang xiu qiu si', 'prosperous', 'aided', 'resting', 'trapped', 'dead', 'month command', '月令', 'yue ling', 'seasonal strength'],
        sections: [
            {
                id: 'core-meaning',
                heading: 'The month in command',
                paragraphs: [
                    'BaZi treats the season of birth as the single heaviest influence on a chart. The month branch is called the “month command” (月令): it names the phase that rules the season, and that ruling phase fixes where the other four stand. The app assigns Yin and Mao to wood, Si and Wu 午 to fire, Shen and You to metal, Hai and Zi to water, and the four transitional months – Chen, Wei, Xu and Chou – to earth.',
                    'The scheme is far older than BaZi. The Huainanzi, a Western Han compendium, already describes wood at its peak alongside fire being born, water grown old, metal imprisoned and earth dead, and Han Yu’s epitaph for Li Xuzhong in the Tang names rise, decline and death among the factors that early fate calculators weighed.',
                ],
            },
            {
                id: 'the-five-states',
                heading: 'The five states',
                list: [
                    'Prosperous (旺 wang) – the phase of the season itself, at full strength.',
                    'Aided (相 xiang) – the phase the season generates, rising into its turn.',
                    'Resting (休 xiu) – the phase that generates the season, having handed over and withdrawn.',
                    'Trapped (囚 qiu) – the phase that controls the season; it spends itself against a time it cannot win.',
                    'Dead (死 si) – the phase the season controls, held down for as long as the season lasts.',
                ],
            },
            {
                id: 'example',
                heading: 'Spring as an example',
                paragraphs: [
                    'In a wood month, wood is prosperous and fire, its child, is aided. Water, which generated wood, rests. Metal, the phase that would normally cut wood, is trapped; and earth, which wood breaks up, is dead. Run the same arithmetic in a water month and the picture changes completely: water prosperous, wood aided, metal resting, earth trapped, fire dead.',
                ],
            },
            {
                id: 'in-interpretation',
                heading: 'In interpretation',
                paragraphs: [
                    'The state of the Day Master’s own phase is the first clue to its strength, and the app multiplies every character’s weight by its seasonal state when estimating [[bazi.foundations.day-master-strength]]. States also matter for every other phase: a wealth star that is dead in the season is read very differently from one that is prosperous.',
                    'Treatments of earth vary. The classical formula is that earth rules “the four seasons”, which many schools take as the last eighteen days or so before each of the four season-opening terms, so that the first part of a Chen month still counts as spring wood. The app uses the simpler month-branch version and gives the whole of every Chen, Wei, Xu and Chou month to earth.',
                ],
            },
            {
                id: 'misconceptions',
                heading: 'Common misconceptions',
                paragraphs: [
                    '“Dead” and “trapped” are technical labels for seasonal weakness, not omens. A Day Master in a dead state can still be strongly rooted and well supported elsewhere in the chart.',
                ],
            },
        ],
        related: ['bazi.pillar.month', 'bazi.foundations.day-master-strength', 'bazi.foundations.controlling-cycle', 'bazi.foundations.generating-cycle', 'bazi.element.earth'],
    },
    {
        id: 'bazi.foundations.hidden-stems',
        library: 'bazi',
        category: 'foundations',
        title: 'Hidden Stems',
        summary: 'Each Earthly Branch holds one to three Heavenly Stems inside it – primary, secondary and tertiary – so that a chart has a concealed layer beneath its eight visible characters.',
        glyph: '藏干',
        keywords: ['藏干', 'cang gan', 'hidden heavenly stems', 'branch qi', '本气', 'main qi', '中气', 'middle qi', '余气', 'residual qi', 'roots'],
        sections: [
            {
                id: 'core-meaning',
                heading: 'Stems inside branches',
                paragraphs: [
                    'A branch is not a single phase. Each one is said to contain stems (藏干, “stored stems”): a primary stem that gives the branch its main character, and in most branches one or two lesser stems. The primary is called the main qi (本气); the lesser ones are the middle qi (中气) and the residual qi (余气), though tables differ over which of the two lesser stems takes which name. The list below is the one given in a rhymed verse of the Yuanhai Ziping and repeated in most modern manuals; it is the table the app uses, but it is not the only one in the classical literature.',
                ],
            },
            {
                id: 'the-table',
                heading: 'The twelve branches',
                list: [
                    'Zi 子 – Gui.',
                    'Chou 丑 – Ji, Gui, Xin.',
                    'Yin 寅 – Jia, Bing, Wu 戊.',
                    'Mao 卯 – Yi.',
                    'Chen 辰 – Wu 戊, Yi, Gui.',
                    'Si 巳 – Bing, Wu 戊, Geng.',
                    'Wu 午 – Ding, Ji.',
                    'Wei 未 – Ji, Ding, Yi.',
                    'Shen 申 – Geng, Ren, Wu 戊.',
                    'You 酉 – Xin.',
                    'Xu 戌 – Wu 戊, Xin, Ding.',
                    'Hai 亥 – Ren, Jia.',
                ],
            },
            {
                id: 'weighting',
                heading: 'Weighting',
                paragraphs: [
                    'How much each hidden stem counts is where schools part ways most. The app uses one commonly cited convention: a lone stem carries the whole branch; of two, the primary takes 70% and the secondary 30%; of three, 60%, 30% and 10%, in the order listed above. Other traditions weight the stems by the number of days each is said to command within the month, and the published day counts themselves vary, so a chart near a balance point can read differently under them.',
                    'The pattern in the common table follows the seasons. Zi, Mao and You, the mid-points of winter, spring and autumn, hold a single pure stem. The four earth branches each store a trace of the season just ending and a remnant of a phase in storage – Chen keeps water, Wei wood, Xu fire, Chou metal.',
                ],
            },
            {
                id: 'in-interpretation',
                heading: 'Roots and the second layer',
                paragraphs: [
                    'A visible stem is said to be rooted when its phase appears among the hidden stems of a branch, above all the day or month branch. A Day Master without roots is read as more dependent on its surroundings. Hidden stems also receive Ten Gods of their own, so a chart can contain a [[bazi.ten-god.direct-officer]] that never appears on the surface.',
                    'The app keeps the hidden layer separate in its phase balance: one count from the visible stems and branches, another from the hidden stems, so that a phase absent above but present below is visible as such.',
                ],
            },
            {
                id: 'variant-tables',
                heading: 'Where the tables disagree',
                paragraphs: [
                    'The Sanming Tonghui gives a different kind of table, listing which stem “commands” each month and for how many days. Its version adds stems the common verse leaves out: Ren for a few days at the start of Zi, Bing at the start of Wu 午 (with no Ji), Wu 戊 in Hai, and Ren rather than Gui as the stored water of Chen. Modern day-count tables differ again in their numbers.',
                    'The disagreement matters most for Zi, Wu 午, Hai and the earth branches, and for Si, whose two lesser stems, Wu 戊 and Geng, are ranked in either order. A reader comparing charts from different sources should expect small differences in hidden-stem Ten Gods and phase counts for these branches.',
                ],
            },
        ],
        related: ['bazi.foundations.day-master-strength', 'bazi.branch.chen-dragon', 'bazi.branch.wu-horse', 'bazi.foundations.seasonal-states', 'bazi.stem.wu'],
    },
    {
        id: 'bazi.foundations.luck-pillars',
        library: 'bazi',
        category: 'foundations',
        title: 'Luck Pillars',
        summary: 'Luck Pillars divide life into decades, each given a stem–branch pair counted forward or backward from the month pillar, and are read as the shifting conditions a natal chart passes through.',
        glyph: '大运',
        keywords: ['大运', 'Da Yun', 'decade luck', 'ten-year luck', 'luck cycles', 'Luck Pillar', 'big luck'],
        sections: [
            {
                id: 'core-meaning',
                heading: 'Decades as pillars',
                paragraphs: [
                    'The natal chart is fixed at birth; Luck Pillars (大运) are how BaZi describes time moving through it. Each is a stem–branch pair lasting ten years, and the sequence is generated by stepping through the sixty-pair cycle from the [[bazi.pillar.month|month pillar]]. With a month pillar of Bing Yin, a forward sequence runs Ding Mao, Wu Chen, Ji Si; a reverse one runs Yi Chou, Jia Zi, Gui Hai.',
                ],
            },
            {
                id: 'direction-and-start',
                heading: 'Direction and starting age',
                paragraphs: [
                    'In the classical method the direction depends on the polarity of the year stem together with sex: a yang year stem with a male chart, or a yin year stem with a female chart, runs forward, and the other two combinations run in reverse.',
                    'The age at which the first pillar begins comes from the solar terms. For a forward sequence, count the days from birth to the next Jie boundary; for a reverse one, back to the previous Jie. Three days equal one year, so a birth twelve days before the next term begins its forward luck at four. The ratio goes back to the classical manuals; the Sanming Tonghui already asks why three days are reckoned as a year. Calculators that need finer steps extend it – one day to four months, one two-hour period to ten days – and some work from the exact minutes instead.',
                ],
            },
            {
                id: 'in-the-app',
                heading: 'How the app calculates them',
                paragraphs: [
                    'The app computes eight Luck Pillars in both directions, with start ages from the exact solar-term moments. The natal chart shows both sequences without choosing; the Forecast applies the classical rule using the year stem and the body selected at onboarding. If that field was deliberately left undefined, the app picks neither direction: the classical rule is written for two sexes only, and the app does not invent an extension of it. Each Luck Pillar stem is given its Ten God relative to the Day Master.',
                ],
            },
            {
                id: 'in-interpretation',
                heading: 'Reading a decade',
                paragraphs: [
                    'A Luck Pillar is read as adding its phases to the chart for ten years, strengthening some and pressing on others, and as forming combinations and clashes with the natal branches. How the stem and the branch share the decade is taught differently from school to school. Annual pillars work the same way on a one-year scale. Practitioners describe these as conditions and emphases, not as events that must happen.',
                ],
            },
        ],
        related: ['bazi.pillar.month', 'bazi.foundations.yin-and-yang', 'bazi.foundations.the-solar-calendar', 'bazi.relationship.six-clash', 'bazi.foundations.day-master'],
    },
    {
        id: 'bazi.foundations.bazi-and-the-chinese-zodiac',
        library: 'bazi',
        category: 'foundations',
        title: 'BaZi and the Chinese Zodiac',
        summary: 'The familiar year animal is the branch of the year pillar – one of the eight characters of a BaZi chart, and far from the centre of its reading.',
        glyph: '生肖',
        keywords: ['Chinese zodiac', '生肖', 'sheng xiao', 'year animal', 'zodiac animal', 'Chinese horoscope', 'animal sign'],
        sections: [
            {
                id: 'core-meaning',
                heading: 'Where the animal comes from',
                paragraphs: [
                    'The twelve animals – Rat, Ox, Tiger, Rabbit, Dragon, Snake, Horse, Goat, Monkey, Rooster, Dog, Pig – are popular names for the twelve Earthly Branches. The “zodiac sign” of popular Chinese astrology is the branch of the year pillar, often combined with the phase of the year stem: 2026, a Bing Wu year, is a Fire Horse year.',
                    'In BaZi that animal is one character out of eight. It sits in the [[bazi.pillar.year|year pillar]], traditionally read as ancestry and the wider social world, at the outer edge of the chart rather than its centre.',
                ],
            },
            {
                id: 'why-it-differs',
                heading: 'Why a chart is not an animal',
                paragraphs: [
                    'Everyone born in the same solar year shares a year pillar, and therefore a year animal. The Day Master, by contrast, changes daily, and the full set of four pillars is shared by very few. A reading built on the year animal alone ignores the self (the day stem), the season (the month branch) and almost every relationship in the chart.',
                    'The branches also appear in the month, day and hour pillars, each with its own animal. Popular writing sometimes calls these an “inner” or “secret” animal; in BaZi they are simply branches in different positions.',
                ],
            },
            {
                id: 'the-boundary',
                heading: 'Which year counts',
                paragraphs: [
                    'Popular zodiac tables usually switch animals at the lunar New Year, a date that falls anywhere from late January to mid-February. BaZi changes it at Li Chun, around 4 February. For births between the two dates, the two methods give different animals; the app follows Li Chun.',
                ],
            },
            {
                id: 'compatibility',
                heading: 'Animal compatibility',
                paragraphs: [
                    'The well-known lists of compatible and incompatible animals come from the branch relationships – [[bazi.relationship.three-harmony|three harmonies]], six harmonies, six clashes. In BaZi these operate between all branches in a chart and between charts, not only between year animals.',
                ],
            },
        ],
        related: ['bazi.pillar.year', 'bazi.foundations.what-bazi-is', 'bazi.foundations.day-master', 'bazi.relationship.three-harmony', 'bazi.branch.wu-horse'],
    },
    {
        id: 'bazi.foundations.symbolic-correspondences',
        library: 'bazi',
        category: 'foundations',
        title: 'Symbolic Correspondences',
        summary: 'The Five Phases are traditionally matched to seasons, directions, colours, tastes and the organ systems of classical Chinese medicine; the app presents these as cultural symbolism, never as health guidance.',
        glyph: '五行',
        keywords: ['Five Phase correspondences', 'TCM correspondences', 'wu xing correspondences', 'correlative cosmology', 'organs', 'colours', 'directions', 'tastes', 'seasons'],
        sections: [
            {
                id: 'core-meaning',
                heading: 'A system of resonance',
                paragraphs: [
                    'Thinkers of the late Warring States and the Han extended the Five Phases into a scheme of correspondences: any group of five could be lined up with the phases and treated as belonging together. Seasons, directions, colours, tastes, sounds, emotions and the organ systems of classical medicine were all sorted this way. The result was less a theory of causes than a map of resemblances, and it is still how the phases are commonly taught.',
                ],
            },
            {
                id: 'the-correspondences',
                heading: 'The classical correspondences',
                list: [
                    'Wood – spring, east, green, sour; Liver and Gallbladder; wind; the eyes; anger.',
                    'Fire – summer, south, red, bitter; Heart and Small Intestine; heat; the tongue; joy.',
                    'Earth – late summer and the turns between seasons, the centre, yellow, sweet; Spleen and Stomach; damp; the mouth; pensiveness.',
                    'Metal – autumn, west, white, pungent; Lung and Large Intestine; dryness; the nose; grief.',
                    'Water – winter, north, black or deep blue, salty; Kidney and Bladder; cold; the ears; fear.',
                ],
            },
            {
                id: 'in-bazi',
                heading: 'What BaZi actually uses',
                paragraphs: [
                    'Two of these rows do technical work in a chart. Season is central, since the month branch decides the [[bazi.foundations.seasonal-states]]. Direction is built into the branches: Zi is north, Wu 午 south, Mao east and You west. Colours, tastes and organs are illustrative; they help explain what a phase is like, and they colour the imagery of articles such as [[bazi.element.metal]], but no calculation depends on them.',
                ],
            },
            {
                id: 'not-health-guidance',
                heading: 'Not health guidance',
                paragraphs: [
                    'These correspondences are included as part of the tradition’s way of thinking, for education and reflection only. They are not medical information. A chart with little water says nothing about anyone’s kidneys, a strong fire phase is not a heart condition, and nothing here should inform a decision about diet, treatment or care. Questions about health belong with a qualified clinician.',
                ],
            },
        ],
        related: ['bazi.element.wood', 'bazi.element.earth', 'bazi.foundations.seasonal-states', 'bazi.foundations.generating-cycle', 'synthesis.guide.symbolic-frameworks'],
    },
];
