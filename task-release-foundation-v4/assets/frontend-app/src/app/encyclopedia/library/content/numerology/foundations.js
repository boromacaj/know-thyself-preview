export const ARTICLES = [
    {
        id: 'numerology.foundations.what-numerology-is',
        library: 'numerology',
        category: 'foundations',
        title: 'What Numerology Is',
        summary: 'Numerology turns a birth date and a birth name into a small set of numbers and reads each number as a symbol. This library follows the Pythagorean method, the convention most Western practitioners use today.',
        keywords: ['Pythagorean numerology', 'number symbolism', 'Chaldean numerology', 'gematria', 'isopsephy'],
        sections: [
            {
                id: 'core-meaning',
                heading: 'A system of number symbolism',
                paragraphs: [
                    'Numerology assigns qualities to the numbers 1 to 9 and to a few larger numbers, then derives specific numbers from two inputs: the date someone was born and the name they were given. Each derived number sits in a named position, such as Life Path, Expression or Soul Urge, and the position decides which part of a life the number is taken to describe.',
                    'The arithmetic is simple. Letters become digits through a fixed table, and long totals are folded down by adding their digits until a single figure remains. What makes the practice interpretive is everything that happens after the sum: the reading of 7 as inquiry or 4 as structure, and the judgement of how several numbers in one chart modify each other.',
                ],
            },
            {
                id: 'background',
                heading: 'From Pythagoras to the modern chart',
                paragraphs: [
                    'The name honours Pythagoras of Samos, the sixth-century BCE philosopher whose school held that number underlies the order of things. His followers noticed that musical intervals correspond to simple ratios of string lengths, venerated the tetractys - the triangle of ten points arranged 1, 2, 3, 4 - and gave individual numbers characters: odd and even, male and female, limited and unlimited.',
                    'The modern procedure is much younger. Converting a name with a nine-column letter table and reading a Life Path from a birth date took shape in English-language esoteric writing around the start of the twentieth century, with L. Dow Balliett often cited as an early author, and was systematised over the following decades by practitioners such as Juno Jordan. Calling it Pythagorean acknowledges a lineage of ideas; no ancient text describes the method itself.',
                    'Other letter-number traditions run in parallel: Hebrew gematria and Greek isopsephy, in which letters were also numerals, and the so-called Chaldean system, which uses the values 1 to 8 and assigns them by sound rather than alphabetical order. The Chaldean table gives different results and is not used in this library.',
                ],
            },
            {
                id: 'status',
                heading: 'What kind of knowledge it is',
                paragraphs: [
                    'Numerology is a symbolic framework, not a measurement. There is no evidence that a name or a date determines character or events, and the tradition is best read as a vocabulary: a structured way of asking what direction, temperament or timing a number points to and then testing that against lived experience. The wider discussion of how such frameworks can be used responsibly is in [[synthesis.guide.symbolic-frameworks]].',
                    'Within that frame the system is internally consistent: the same inputs always give the same numbers, and disputes between schools, such as how to treat the letter Y, are disputes about method that can be stated and compared.',
                ],
            },
            {
                id: 'in-this-library',
                heading: 'The method used here',
                paragraphs: [
                    'The conventions described across these articles are the ones the application calculates with: the Pythagorean letter table, the full birth name, a positional rule for Y, parts reduced before they are added, and a master-number policy decided position by position. Where schools differ, the documented conventions of contemporary practice - chiefly those published by Hans Decoz - are followed.',
                    'The mechanics are set out in [[numerology.foundations.letter-values]] and [[numerology.foundations.reduction-and-master-numbers]]; how the resulting numbers fit together is the subject of [[numerology.foundations.reading-a-chart]].',
                ],
            },
        ],
        related: ['numerology.foundations.letter-values', 'numerology.foundations.reduction-and-master-numbers', 'numerology.foundations.reading-a-chart', 'synthesis.pillar.numerology', 'synthesis.guide.symbolic-frameworks'],
    },
    {
        id: 'numerology.foundations.letter-values',
        library: 'numerology',
        category: 'foundations',
        title: 'Letter Values',
        summary: 'The Pythagorean table gives every letter a value from 1 to 9 by its place in the alphabet. Which letters count as vowels, and which name is used, decide the name numbers before any reading begins.',
        glyph: 'A=1',
        keywords: ['Pythagorean table', 'letter chart', 'vowels', 'consonants', 'the letter Y', 'birth name'],
        sections: [
            {
                id: 'the-table',
                heading: 'The table',
                paragraphs: [
                    'The alphabet is written out in rows of nine, so that each letter falls into one of nine columns. A letter’s value is the number of its column:',
                ],
                list: [
                    '1 - A, J, S',
                    '2 - B, K, T',
                    '3 - C, L, U',
                    '4 - D, M, V',
                    '5 - E, N, W',
                    '6 - F, O, X',
                    '7 - G, P, Y',
                    '8 - H, Q, Z',
                    '9 - I, R',
                ],
            },
            {
                id: 'vowels-consonants',
                heading: 'Vowels, consonants, Y and W',
                paragraphs: [
                    'Three name numbers depend on dividing the letters: the Soul Urge reads only the vowels, the Personality only the consonants, and the Expression reads both. A, E, I, O and U are always vowels.',
                    'Y changes role with its surroundings. Inside a single name, Y is treated as a vowel when neither letter beside it is A, E, I, O or U, and as a consonant when either neighbour is. The Y in Lynn and the final Y in Kathy are vowels; the Y in Maya and the opening Y of Yolanda are consonants; Sydney has one of each. This spelling rule reproduces the positional conventions of contemporary practice, though a few practitioners settle doubtful names by pronunciation instead, which a written rule cannot do.',
                    'W is always a consonant in this library, including in combinations such as "ow" and "ew" where some older schools counted it as a vowel.',
                ],
            },
            {
                id: 'which-name',
                heading: 'Which name is used',
                paragraphs: [
                    'The calculation uses the full name given at birth: every given name, every middle name and the surname or surnames, as originally registered. Nicknames, married names and later legal changes are not substituted, because the tradition treats the birth name as the original statement from which the core name numbers are taken.',
                    'Each name is a separate unit. Hyphens divide units, so a double-barrelled surname counts as two; an apostrophe does not, so O’Brien is one. Accents are removed before lookup (Á becomes A, Č becomes C), and Latin letters without a decomposition are spelled out (Ł as L, Æ as AE, Ø as O). Letters from non-Latin scripts are not transliterated and contribute nothing.',
                ],
            },
            {
                id: 'worked-example',
                heading: 'A worked example',
                paragraphs: [
                    'For the invented name Clara Mendel: CLARA is 3 + 3 + 1 + 9 + 1 = 17, which reduces to 8; MENDEL is 4 + 5 + 5 + 4 + 5 + 3 = 26, also 8. The units are reduced separately and then added, 8 + 8 = 16, giving an Expression of 7 written 16/7. The vowels alone (A, A, E, E) give a Soul Urge of 3, the consonants a Personality of 4. How the totals are folded is covered in [[numerology.foundations.reduction-and-master-numbers]].',
                ],
            },
        ],
        related: ['numerology.position.expression', 'numerology.position.soul-urge', 'numerology.position.personality', 'numerology.foundations.reduction-and-master-numbers', 'numerology.position.hidden-passion'],
    },
    {
        id: 'numerology.foundations.reduction-and-master-numbers',
        library: 'numerology',
        category: 'foundations',
        title: 'Reduction and Master Numbers',
        summary: 'Every numerology number is reached by adding digits until one figure remains. Three exceptions - 11, 22 and 33 - are kept whole in some positions, and four compounds - 13, 14, 16 and 19 - are flagged as karmic debts.',
        glyph: '11',
        keywords: ['digit sum', 'reduction', 'compound number', 'root number', 'master numbers', '11 22 33', 'karmic debt'],
        sections: [
            {
                id: 'digit-sum',
                heading: 'The digit sum',
                paragraphs: [
                    'Reduction is repeated addition of digits. The year 1987 becomes 1 + 9 + 8 + 7 = 25, and 25 becomes 2 + 5 = 7. The unreduced total is called the compound and the final figure the root; practitioners often write both, as in 25/7, because the compound can carry meaning of its own.',
                    'Because digit sums preserve a number’s remainder after division by nine, the root is the same whichever order the digits are added in. The compound is not. For that reason the method fixes a route: the month, day and year of a birth date are each reduced first and then added, and each name is reduced on its own before the names are added.',
                    'The route matters. Born 4 July 1992, the parts are 7, 4 and 3 (1992 to 21 to 3), and their sum is 14, reducing to 5. Adding all eight digits at once gives 32, also reducing to 5 - the same root, but the compound 14 has disappeared, and with it a karmic debt.',
                ],
            },
            {
                id: 'master-numbers',
                heading: 'Master numbers',
                paragraphs: [
                    '11, 22 and 33 are called master numbers. In the positions that keep them, reduction stops the moment a sum is exactly one of these values, at any step: 29 becomes 11 and stops there. A sum that merely contains repeated digits is not a master - 66 reduces to 12 and then to 3.',
                    'Each master is read as an intensified form of its root, 11 of 2, 22 of 4 and 33 of 6, and is often written 11/2, 22/4 and 33/6 to show both. Where the application needs a single digit from a master, as in timing the first Pinnacle, it uses that root.',
                ],
                list: [
                    'Masters kept: Life Path, Birthday, Expression, Soul Urge, Personality, Maturity and the four Pinnacles - and the birth-date and name parts that feed them.',
                    'Masters reduced: the Challenges (whose parts become single digits first), Balance, Attitude, and the Personal Year, Personal Month and Personal Day.',
                ],
            },
            {
                id: 'why-the-split',
                heading: 'Why the policy differs by position',
                paragraphs: [
                    'The split follows the documented conventions for each position rather than a single rule. The personal cycles are a count around a nine-stage loop, so an eleventh stage would have no place in it. A Challenge is the difference between two single digits and so runs only from 0 to 8, making 0 a possible and fairly common result. Balance and Attitude are secondary positions whose established method reduces fully.',
                ],
            },
            {
                id: 'karmic-debt',
                heading: 'Karmic-debt compounds',
                paragraphs: [
                    'Four compounds, 13, 14, 16 and 19, are singled out by the tradition as karmic debts and read through their roots 4, 5, 7 and 1. One counts when it appears in a position’s own reduction chain - as its total, or as a total met on the way down - in the Life Path, Birthday, Expression, Soul Urge or Personality. A part that passes through one of them does not count: a birth year that reduces through 19 places no debt on the Life Path. The meaning of each is set out under [[numerology.position.karmic-debt]].',
                ],
            },
        ],
        related: ['numerology.foundations.letter-values', 'numerology.position.karmic-debt', 'numerology.number.11', 'numerology.number.22', 'numerology.number.33', 'numerology.position.challenges'],
    },
    {
        id: 'numerology.foundations.reading-a-chart',
        library: 'numerology',
        category: 'foundations',
        title: 'Reading a Chart',
        summary: 'A numerology chart combines numbers from the birth date, numbers from the birth name and numbers that change with time. Reading it means knowing which kind each number is and how the positions qualify one another.',
        keywords: ['numerology chart', 'core numbers', 'name numbers', 'birth-date numbers', 'cycles', 'Pinnacles'],
        sections: [
            {
                id: 'what-a-chart-holds',
                heading: 'What a chart holds',
                list: [
                    'From the birth date: [[numerology.position.life-path|Life Path]], [[numerology.position.birthday|Birthday]], [[numerology.position.attitude|Attitude]], and the four Pinnacles and four Challenges.',
                    'From the birth name: Expression (also called Destiny), Soul Urge, Personality, Balance, Hidden Passion and Karmic Lessons.',
                    'From both: [[numerology.position.maturity|Maturity]], which adds the Life Path to the Expression, and Karmic Debt, which can appear in either kind of core number.',
                    'From the calendar: the Personal Year, Personal Month and Personal Day, which change while everything else stays fixed.',
                ],
            },
            {
                id: 'date-and-name',
                heading: 'Date numbers and name numbers',
                paragraphs: [
                    'The usual division of labour treats the birth date as the terrain and the name as the equipment. Date numbers describe the direction a life is read as taking and the conditions it keeps meeting; name numbers describe the capacities, motives and manner a person brings to that terrain. A chart whose Life Path and Expression agree is read as well-fitted to its direction, while a clash is read as a person working against the grain of their route - often productively.',
                    'The three main name numbers are arithmetically linked: the vowels and consonants together make up the whole name, so the roots of the Soul Urge and the Personality always add up, after reduction, to the root of the Expression. The inner motive and the outer manner are the two halves of the name’s total.',
                ],
            },
            {
                id: 'time',
                heading: 'Two kinds of time',
                paragraphs: [
                    'Numerology times a life in two ways that are never mixed. The Pinnacles and Challenges are age-based chapters: four long periods, the first ending at 36 minus the root of the Life Path, each Pinnacle paired with the Challenge of the same period. The personal cycles are calendar-based: the Personal Year turns on 1 January, the month on the first of each month, the day at midnight.',
                    'A cycle number describes the season a person is in, not the person. A Personal Year 5 is the same stage for everyone who has it, whatever their Life Path, although the tradition reads it as landing differently on a settled 4 than on a restless 5.',
                ],
            },
            {
                id: 'interpretation',
                heading: 'Weighing the numbers',
                paragraphs: [
                    'Practitioners look first for repetition: a number that appears in several positions sets the tone of the chart. They then look for contrasts, such as a private 7 behind a sociable 3, for master numbers, and for the digits a name lacks entirely. The Life Path is normally given the most weight, the Expression next.',
                    'No single number is read in isolation, and the same number means different things in different positions. Approaches to weighing agreement and conflict between factors are discussed in [[synthesis.guide.reading-multiple-factors]] and [[synthesis.guide.tension]].',
                ],
            },
        ],
        related: ['numerology.position.life-path', 'numerology.position.expression', 'numerology.position.pinnacles', 'numerology.position.personal-year', 'synthesis.guide.reading-multiple-factors', 'synthesis.guide.convergence'],
    },
];
