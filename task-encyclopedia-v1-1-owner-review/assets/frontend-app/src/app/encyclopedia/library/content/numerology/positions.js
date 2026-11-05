export const ARTICLES = [
    {
        id: 'numerology.position.life-path',
        library: 'numerology',
        category: 'position',
        title: 'Life Path',
        summary: 'The central number of a numerology chart, taken from the full birth date and read as the direction a life takes and the conditions it keeps meeting along the way.',
        glyph: 'LP',
        keywords: ['Life Path number', 'birth path', 'birth force', 'core number'],
        sections: [
            {
                id: 'what-it-measures',
                heading: 'What it measures',
                paragraphs: [
                    'Numerology reads the Life Path as the overall direction of a life: the kinds of situation that recur, the lessons those situations press, and the role a person tends to grow into over decades. Practitioner texts also use it to describe inborn talents and character - Hans Decoz calls it the most important number in the chart and says it colours personality, relationships and work.',
                    'This library leans on the first reading. It treats the Life Path mainly as the ground a person walks on and leaves manner and motive to the name numbers, so that a Life Path 7 and a Personality 7 do not collapse into one description. That is an editorial emphasis, not a rule every school shares.',
                ],
            },
            {
                id: 'calculation',
                heading: 'How it is calculated',
                paragraphs: [
                    'The month, the day and the year of birth are each reduced on their own, master numbers kept: November counts as 11, a 29th day becomes 11, a year such as 1966 becomes 22. The three results are then added and reduced again, with 11, 22 and 33 kept wherever the sum lands on them.',
                    'Born 21 June 1979: the parts are 6, 3 (from 21) and 8 (1979 to 26 to 8), which add to 17 and reduce to 8. Born 2 February 1987: 2 + 2 + 7 gives 11, a master Life Path. If the compound passes through 13, 14, 16 or 19, the Life Path carries a karmic debt.',
                ],
            },
            {
                id: 'interpretation',
                heading: 'Reading it',
                paragraphs: [
                    'Practitioners give the Life Path the most weight in a chart and read other numbers against it. A name number that matches it suggests a person well-equipped for their route; one that differs suggests tools that must be adapted to the terrain. Its root also sets the timing of the [[numerology.position.pinnacles|Pinnacles]], whose first chapter ends at 36 minus that root.',
                    'The twelve possible values are described individually, from [[numerology.life-path.1]] to [[numerology.life-path.33]].',
                ],
            },
        ],
        related: ['numerology.life-path.1', 'numerology.position.expression', 'numerology.position.pinnacles', 'numerology.position.maturity', 'numerology.foundations.reading-a-chart'],
    },
    {
        id: 'numerology.position.expression',
        library: 'numerology',
        category: 'position',
        title: 'Expression / Destiny',
        summary: 'Also called Destiny: the number of the full birth name, every letter counted. It describes the capacities a person has to work with - abilities, manner of acting and the contribution they are equipped to make.',
        glyph: 'EX',
        keywords: ['Expression number', 'Destiny number', 'name number', 'full name number'],
        sections: [
            {
                id: 'what-it-measures',
                heading: 'What it measures',
                paragraphs: [
                    'If the Life Path is the route, the Expression is the kit carried along it. The tradition treats it as a description of natural abilities and characteristic ways of acting - what a person can do readily and how they tend to go about it - and also as a lifelong target to grow toward. The alternative name Destiny, used by some numerologists, reflects that second idea: the name as a statement of what a person is equipped to accomplish.',
                ],
            },
            {
                id: 'calculation',
                heading: 'How it is calculated',
                paragraphs: [
                    'Every letter of the full birth name is converted with the Pythagorean table. Each name - given, middle and surname - is summed and reduced separately, with master numbers kept; the results for the separate names are then added and reduced again, masters kept.',
                    'The invented name Clara Mendel gives CLARA 17 to 8 and MENDEL 26 to 8; 8 + 8 = 16, reducing to 7, so the Expression is 7 and carries the karmic debt 16. Summing all eleven letters in one go would have produced 43 and lost the 16.',
                ],
            },
            {
                id: 'interpretation',
                heading: 'Reading it',
                paragraphs: [
                    'The Expression is normally the second most weighted number after the Life Path. It is also the sum, in effect, of the two halves of the name: the [[numerology.position.soul-urge|Soul Urge]] (vowels) and the [[numerology.position.personality|Personality]] (consonants), whose roots always add up to its root. Added to the Life Path it gives the [[numerology.position.maturity|Maturity]] number.',
                    'Because it is drawn from the birth name, a later change of name does not alter it in this method.',
                ],
            },
        ],
        related: ['numerology.position.soul-urge', 'numerology.position.personality', 'numerology.position.maturity', 'numerology.foundations.letter-values', 'numerology.expression.1'],
    },
    {
        id: 'numerology.position.soul-urge',
        library: 'numerology',
        category: 'position',
        title: 'Soul Urge',
        summary: 'Drawn from the vowels of the birth name, the Soul Urge stands for inner motivation: what a person wants for its own sake, whether or not it ever shows.',
        glyph: 'SU',
        keywords: ['Soul Urge number', 'Heart’s Desire', 'vowel number', 'inner motivation'],
        sections: [
            {
                id: 'what-it-measures',
                heading: 'What it measures',
                paragraphs: [
                    'Also known as the Heart’s Desire, the Soul Urge is the private layer of the chart. Numerology reads it as motive: the satisfactions a person seeks, the conditions under which they feel most themselves, and the wants that drive choices when nobody else is watching. It can contradict both the outward manner and the Life Path without either being false.',
                ],
            },
            {
                id: 'calculation',
                heading: 'How it is calculated',
                paragraphs: [
                    'Only the vowels of the full birth name are counted. A, E, I, O and U are always vowels; Y counts as a vowel when neither letter beside it in the same name is a vowel, so it is a vowel in Lynn and a consonant in Maya; W is never a vowel. Each name’s vowels are summed and reduced with masters kept, the results are added, and the total is reduced again with 11, 22 and 33 kept.',
                    'A name with no vowels at all contributes nothing. For Clara Mendel, A + A gives 2 and E + E gives 10, reducing to 1, so the Soul Urge is 3.',
                ],
            },
            {
                id: 'interpretation',
                heading: 'Reading it',
                paragraphs: [
                    'The Soul Urge is read in pairs. Set beside the [[numerology.position.personality|Personality]], it shows the difference between what is wanted and what is shown; set beside the [[numerology.position.life-path|Life Path]], it shows whether the route on offer feeds the inner motive or asks it to wait. A sharp contrast between Soul Urge and Personality is one of the classic patterns practitioners look for.',
                ],
            },
        ],
        related: ['numerology.position.personality', 'numerology.position.expression', 'numerology.foundations.letter-values', 'numerology.soul-urge.1', 'synthesis.guide.contextual-duality'],
    },
    {
        id: 'numerology.position.personality',
        library: 'numerology',
        category: 'position',
        title: 'Personality',
        summary: 'The consonants of the birth name give the Personality number - the outward impression, what others meet first, and what a person lets through or keeps out.',
        glyph: 'PE',
        keywords: ['Personality number', 'consonant number', 'outer self', 'first impression'],
        sections: [
            {
                id: 'what-it-measures',
                heading: 'What it measures',
                paragraphs: [
                    'The consonants are the hard edges of a name, and numerology gives them the job of describing the exterior. The Personality number is read as the impression a person makes before they are known well - style, bearing, the qualities strangers attribute to them - and as a filter that decides which approaches are welcomed and which are deflected.',
                    'It is not a mask in the sense of something false. The tradition treats it as a genuine part of the person, simply the part most visible from outside.',
                ],
            },
            {
                id: 'calculation',
                heading: 'How it is calculated',
                paragraphs: [
                    'Every letter that is not a vowel is counted: all consonants, W always, and Y whenever it stands beside A, E, I, O or U in the same name. Each name’s consonants are summed and reduced with masters kept, the results are added, and the sum is reduced again, keeping 11, 22 and 33.',
                    'For Clara Mendel, C, L and R give 15, reducing to 6; M, N, D and L give 16, reducing to 7. Together they make 13, which reduces to 4 - a Personality of 4 with the karmic debt 13. The 16 inside MENDEL does not count as a debt, because it belongs to one name rather than to the position’s own total.',
                ],
            },
            {
                id: 'interpretation',
                heading: 'Reading it',
                paragraphs: [
                    'The Personality is read against the [[numerology.position.soul-urge|Soul Urge]]. When the two agree, what others see is close to what drives the person; when they differ, people may misjudge what the person wants. It also differs from the [[numerology.position.attitude|Attitude]], which comes from the birth date and describes an immediate stance rather than a sustained public manner.',
                ],
            },
        ],
        related: ['numerology.position.soul-urge', 'numerology.position.expression', 'numerology.position.attitude', 'numerology.personality.1', 'numerology.foundations.letter-values'],
    },
    {
        id: 'numerology.position.birthday',
        library: 'numerology',
        category: 'position',
        title: 'Birthday',
        summary: 'The day of the month on which a person was born, folded down to one digit unless the result is 11 or 22. Numerology takes it as one particular talent that supports the larger direction of the Life Path.',
        glyph: 'BD',
        keywords: ['Birthday number', 'Birth Day number', 'day number', 'special talent'],
        sections: [
            {
                id: 'what-it-measures',
                heading: 'What it measures',
                paragraphs: [
                    'Among the core numbers the Birthday has the narrowest scope. Numerology reads it as a specific gift - a knack, a skill or a way of handling things that comes easily - rather than a direction or a motive. Because the day is also one of the three parts of the Life Path, the Birthday is usually read as a tool that serves the route.',
                ],
            },
            {
                id: 'calculation',
                heading: 'How it is calculated',
                paragraphs: [
                    'Only the day of the month is used, reduced with master numbers kept. Days 1 to 9 stand as they are; the 10th, 19th and 28th all reduce to 1; the 11th stays 11, and so does the 29th (2 + 9 = 11); the 22nd stays 22. No day can give 33, so the position has eleven possible values.',
                    'The days 13, 14, 16 and 19 each place a karmic debt on the Birthday, since the day itself is the compound. The 19th, for instance, reduces through 10 to 1 and carries the debt 19.',
                ],
            },
            {
                id: 'interpretation',
                heading: 'Reading it',
                paragraphs: [
                    'Practitioners often distinguish days that share a root; Decoz writes a separate reading for each of the 31 days and reads every two-digit day both as its root and as the pair. The 1st, 10th, 19th and 28th all give 1, but the compound is kept in view: 28 is read as 1 tempered by the cooperation of 2 and the authority of 8, 19 through its debt. Among the five core numbers the Birthday is usually given the least weight. When the Birthday repeats the Life Path, the talent and the route reinforce each other; when it differs, it adds a capacity the route might not supply.',
                ],
            },
        ],
        related: ['numerology.position.life-path', 'numerology.position.karmic-debt', 'numerology.birthday.1', 'numerology.birthday.22', 'numerology.foundations.reduction-and-master-numbers'],
    },
    {
        id: 'numerology.position.maturity',
        library: 'numerology',
        category: 'position',
        title: 'Maturity',
        summary: 'Life Path plus Expression: the aim that numerology expects to come into focus later in life, once a person’s route and abilities have had time to meet.',
        glyph: 'MA',
        keywords: ['Maturity number', 'Realization number', 'later life', 'ultimate goal'],
        sections: [
            {
                id: 'what-it-measures',
                heading: 'What it measures',
                paragraphs: [
                    'Numerology treats the Maturity number as a destination that is not visible at the start. It describes the purpose toward which the Life Path and the Expression together are thought to lead. Hans Decoz places its influence as surfacing gradually around the ages of thirty to thirty-five and growing after that, often after experience has tested both the route and the equipment. Some writers call it the Realization number.',
                ],
            },
            {
                id: 'calculation',
                heading: 'How it is calculated',
                paragraphs: [
                    'In this application the Life Path and the Expression are added exactly as calculated, so a master number enters the sum whole: an 11 is added as 11, not as 2. The total is then reduced with masters kept. A Life Path 7 and an Expression 4 give 11; a Life Path 11 and an Expression 11 give 22; a Life Path 8 and an Expression 7 give 15, reducing to 6.',
                    'Practice varies on the masters. Decoz’s own Maturity instructions say to reduce the total to a single digit, yet his account of master numbers names the Maturity number among the places where a master still counts; the application follows the second statement. Other writers keep 11 and 22 here, and at least one modern school also keeps 10. Under a fully reducing method the same two examples would read 2 and 4.',
                    'Maturity is not checked for karmic debt; that reading belongs to the five core positions.',
                ],
            },
            {
                id: 'interpretation',
                heading: 'Reading it',
                paragraphs: [
                    'Because it combines two other numbers, the Maturity number is read as a synthesis rather than a new ingredient. When it repeats one of its sources, that source is taken to dominate the later years; when it introduces a fresh number, the tradition reads a late-blooming interest or role. Practitioners usually treat it as gaining weight with age rather than describing a young person.',
                ],
            },
        ],
        related: ['numerology.position.life-path', 'numerology.position.expression', 'numerology.position.pinnacles', 'numerology.number.22', 'numerology.foundations.reading-a-chart'],
    },
    {
        id: 'numerology.position.attitude',
        library: 'numerology',
        category: 'position',
        title: 'Attitude',
        summary: 'Birth month plus birth day, reduced to a single digit - the stance a person takes first, the immediate reaction before reflection catches up.',
        glyph: 'AT',
        keywords: ['Attitude number', 'first reaction', 'outlook', 'date number'],
        sections: [
            {
                id: 'what-it-measures',
                heading: 'What it measures',
                paragraphs: [
                    'The Attitude number is a short-range reading. It describes the posture someone adopts on meeting a new situation or person: open or guarded, eager or wary, practical or playful. Numerology treats it as the first layer of response, which often softens or changes once the deeper numbers come into play.',
                ],
            },
            {
                id: 'calculation',
                heading: 'How it is calculated',
                paragraphs: [
                    'The month number and the day of the month are added as they stand, then reduced all the way to a single digit. Master numbers are not kept here. A birth on 28 November gives 11 + 28 = 39, then 12, then 3. A birth on 2 September gives 9 + 2 = 11, which is reduced to 2.',
                    'Some schools keep masters in this position; the method followed here reduces them, as the Attitude is not one of the core numbers.',
                ],
            },
            {
                id: 'interpretation',
                heading: 'Reading it',
                paragraphs: [
                    'The Attitude is easily confused with the [[numerology.position.personality|Personality]], since both concern what others see. The distinction is between reaction and manner. The Personality, drawn from the name, is the sustained impression of someone met repeatedly; the Attitude, drawn from the date, is the reflex that greets a new situation. A gap between them can explain why first meetings with a person differ from later acquaintance.',
                ],
            },
        ],
        related: ['numerology.position.personality', 'numerology.position.birthday', 'numerology.position.balance', 'numerology.foundations.reduction-and-master-numbers'],
    },
    {
        id: 'numerology.position.balance',
        library: 'numerology',
        category: 'position',
        title: 'Balance',
        summary: 'The sum of the initials of the birth name. It is read as the way a person steadies themselves under pressure, and the response the tradition recommends in difficult moments.',
        glyph: 'BA',
        keywords: ['Balance number', 'initials', 'under pressure', 'stress response'],
        sections: [
            {
                id: 'what-it-measures',
                heading: 'What it measures',
                paragraphs: [
                    'Initials are the most condensed form of a name, and numerology reads their sum as a compressed instruction for hard times. The Balance number describes the stance that helps a person regain footing when upset, criticised or overwhelmed - and, by contrast, the reaction that tends to make things worse.',
                ],
            },
            {
                id: 'calculation',
                heading: 'How it is calculated',
                paragraphs: [
                    'The first letter of every name unit is taken: each given name, each middle name and each surname, so a hyphenated surname contributes two initials. Their values are added and the total is reduced to a single digit, master numbers included. Clara Mendel gives C (3) + M (4) = 7. Initials summing to 11 give a Balance of 2.',
                ],
            },
            {
                id: 'interpretation',
                heading: 'Reading it',
                paragraphs: [
                    'Each value is read as a coping strategy, usually paired with the reflex it should replace. A Balance 1 suggests drawing on personal strength without shutting others out; 2 on tact and a solution that works for both sides, rather than avoiding the conflict; 4 on keeping perspective and being willing to compromise instead of digging in angrily; 7 on setting emotion aside long enough to analyse the problem, rather than retreating from it; 9 on empathy and the wider view, without drifting into detachment. The reading is advisory in tone - it describes what the tradition sees as the steadying move, not an automatic reflex.',
                    'Because a middle name adds an initial, the Balance is one of the positions most sensitive to how fully the birth name is recorded.',
                ],
            },
        ],
        related: ['numerology.position.attitude', 'numerology.foundations.letter-values', 'numerology.position.expression', 'numerology.number.7'],
    },
    {
        id: 'numerology.position.hidden-passion',
        library: 'numerology',
        category: 'position',
        title: 'Hidden Passion',
        summary: 'The letter value a birth name repeats more than any other. The tradition sees in it a pronounced talent or drive that the name supplies in abundance.',
        glyph: 'HP',
        keywords: ['Hidden Passion number', 'most frequent number', 'intensity', 'name pattern'],
        sections: [
            {
                id: 'what-it-measures',
                heading: 'What it measures',
                paragraphs: [
                    'Most name numbers come from adding; the Hidden Passion comes from counting. Numerology takes the value that a name repeats most often as a sign of concentrated interest - an ability or appetite so well supplied that it tends to shape choices, sometimes more than the person realises. Hidden refers to that unexamined quality.',
                ],
            },
            {
                id: 'calculation',
                heading: 'How it is calculated',
                paragraphs: [
                    'Every letter of the full birth name is converted to its value from 1 to 9, and the number of times each value appears is tallied. The value with the highest count is the Hidden Passion. Nothing is reduced, so the result is always a single digit and never a master number. Ties are kept: when two or more values share the highest count, all of them are reported.',
                    'In Clara Mendel the tally is three 3s (C, L, L), three 5s (E, N, E), two 1s, two 4s and one 9, so the Hidden Passion is both 3 and 5.',
                ],
            },
            {
                id: 'interpretation',
                heading: 'Reading it',
                paragraphs: [
                    'The Hidden Passion is read as an amplifier. When its value also appears among the core numbers, the theme is strongly emphasised; when it does not, it describes a talent operating somewhat outside the main story of the chart. It is the counterpart of the [[numerology.position.karmic-lessons|Karmic Lessons]], which come from the same tally but look at the values that are missing.',
                ],
            },
        ],
        related: ['numerology.position.karmic-lessons', 'numerology.position.expression', 'numerology.foundations.letter-values', 'numerology.foundations.reading-a-chart'],
    },
    {
        id: 'numerology.position.karmic-lessons',
        library: 'numerology',
        category: 'position',
        title: 'Karmic Lessons',
        summary: 'The values from 1 to 9 that do not occur anywhere in the birth name. The tradition reads each missing value as a quality that has to be developed deliberately.',
        glyph: 'KL',
        keywords: ['Karmic Lessons', 'missing numbers', 'karmic lesson numbers', 'absent digits'],
        sections: [
            {
                id: 'what-it-measures',
                heading: 'What it measures',
                paragraphs: [
                    'A name that never produces a given value is read as lacking easy access to that number’s quality. The tradition calls these gaps Karmic Lessons, borrowing the language of reincarnation, in which unfinished work passes from one life to the next; read in its own terms, the position simply marks capacities that do not come ready-made and must be learned through practice and circumstance.',
                ],
            },
            {
                id: 'calculation',
                heading: 'How it is calculated',
                paragraphs: [
                    'The full birth name is converted letter by letter, and each value from 1 to 9 that never appears is listed. There is no addition and no reduction. Clara Mendel produces 1, 3, 4, 5 and 9, so its Karmic Lessons are 2, 6, 7 and 8.',
                    'Long names often have no missing value at all; short ones may lack several. Which values go missing depends on spelling rather than length alone: a name with no G, P or Y has no 7, and one with no H, Q or Z has no 8, however many letters it has.',
                ],
            },
            {
                id: 'interpretation',
                heading: 'Reading it',
                paragraphs: [
                    'A missing value is read as an area of least natural experience - a theme that circumstances keep raising until it is addressed: a missing 4 as recurring problems with order and follow-through, a missing 2 as lessons in patience and cooperation. It is the reverse of the [[numerology.position.hidden-passion|Hidden Passion]], which comes from the same tally.',
                ],
            },
        ],
        related: ['numerology.position.hidden-passion', 'numerology.position.karmic-debt', 'numerology.foundations.letter-values', 'numerology.foundations.reading-a-chart'],
    },
    {
        id: 'numerology.position.karmic-debt',
        library: 'numerology',
        category: 'position',
        title: 'Karmic Debt',
        summary: 'A marker set on a core number whose reduction passes through 13, 14, 16 or 19. The tradition reads it as an added difficulty attached to that number’s lesson.',
        glyph: 'KD',
        keywords: ['karmic debt numbers', '13/4', '14/5', '16/7', '19/1', 'compound numbers'],
        sections: [
            {
                id: 'what-it-measures',
                heading: 'What it measures',
                paragraphs: [
                    'Karmic Debt is not a separate number but a marker on another one. When a core number is reached through 13, 14, 16 or 19, the tradition says the lesson of its root - 4, 5, 7 or 1 - comes with an additional burden. The language is borrowed from belief in reincarnation, where a debt is carried over from a previous life; this library presents that as the tradition’s own framing, a way of describing a pattern of recurring difficulty, not a claim about past lives.',
                ],
            },
            {
                id: 'calculation',
                heading: 'How it is detected',
                paragraphs: [
                    'Five positions are checked: Life Path, Birthday, Expression, Soul Urge and Personality. A debt counts when 13, 14, 16 or 19 appears in that position’s own reduction chain, either as its compound (16 to 7) or as a total met on the way down (49 to 13 to 4). The parts that feed the position do not count: a year that reduces through 19, or a single name that totals 16, puts no debt on the position they belong to.',
                    'A chart may show no debt, one, or several, and each is attributed to the position that produced it. Because the result depends on the compound, it also depends on the calculation route described in [[numerology.foundations.reduction-and-master-numbers]].',
                ],
            },
            {
                id: 'interpretation',
                heading: 'Reading it',
                paragraphs: [
                    'A debt modifies the number it sits on rather than replacing it: a Life Path 16/7 is still a 7. Its position decides its scope - on the Life Path it colours the whole route, on the Soul Urge it concerns motive. The four debts are described in [[numerology.karmic-debt.13]], [[numerology.karmic-debt.14]], [[numerology.karmic-debt.16]] and [[numerology.karmic-debt.19]].',
                ],
            },
        ],
        related: ['numerology.karmic-debt.13', 'numerology.karmic-debt.14', 'numerology.karmic-debt.16', 'numerology.karmic-debt.19', 'numerology.position.karmic-lessons'],
    },
    {
        id: 'numerology.position.personal-year',
        library: 'numerology',
        category: 'position',
        title: 'Personal Year',
        summary: 'A timing number from 1 to 9 that advances with each calendar year, naming the stage a year occupies within a repeating nine-year cycle.',
        glyph: 'PY',
        keywords: ['Personal Year number', 'nine-year cycle', 'annual cycle', 'forecast'],
        sections: [
            {
                id: 'what-it-measures',
                heading: 'What it measures',
                paragraphs: [
                    'The Personal Year describes a season, not a person. Numerology divides time into nine-year cycles that begin with a year of starts (1) and end with a year of conclusions (9), and the Personal Year says which stage of the cycle a given calendar year occupies. It changes every year while the birth numbers stay fixed.',
                ],
            },
            {
                id: 'calculation',
                heading: 'How it is calculated',
                paragraphs: [
                    'The birth month, the birth day and the current calendar year are each reduced to a single digit, then added and reduced again to 1-9. Master numbers are reduced at every step, because the cycle has nine stages and no eleventh. For a birth on 21 June, the year 2026 gives 6 + 3 + 1 (2026 to 10 to 1) = 10, reducing to 1.',
                    'The Personal Year turns on 1 January, not on the birthday. Hans Decoz runs it with the calendar year and acknowledges that some numerologists start it at the birthday instead; this method follows the calendar year so that months and days nest inside it.',
                ],
            },
            {
                id: 'interpretation',
                heading: 'Reading it',
                paragraphs: [
                    'Each year is read as the right moment for some kinds of action and an awkward one for others: planting in a 1, consolidating in a 4, harvesting in an 8, clearing in a 9. The year’s number is then refined by the [[numerology.position.personal-month|Personal Month]]. The stages are described one by one, beginning with [[numerology.personal-year.1]].',
                ],
            },
        ],
        related: ['numerology.personal-year.1', 'numerology.personal-year.9', 'numerology.position.personal-month', 'numerology.position.personal-day', 'numerology.position.pinnacles'],
    },
    {
        id: 'numerology.position.personal-month',
        library: 'numerology',
        category: 'position',
        title: 'Personal Month',
        summary: 'Personal Year plus calendar month: a shorter theme that colours one month within the year’s larger stage.',
        glyph: 'PM',
        keywords: ['Personal Month number', 'monthly cycle', 'timing'],
        sections: [
            {
                id: 'what-it-measures',
                heading: 'What it measures',
                paragraphs: [
                    'Within each Personal Year the months run through their own sequence of 1-9 themes. The Personal Month is read as the immediate climate of a particular month - a month for starting, for patience, for finishing - always understood inside the year that contains it.',
                ],
            },
            {
                id: 'calculation',
                heading: 'How it is calculated',
                paragraphs: [
                    'The Personal Year number is added to the number of the calendar month (January 1, February 2, through December 12), and the sum is reduced to 1-9 with master numbers reduced. In a Personal Year 1, October gives 1 + 10 = 11, which becomes 2. The month turns on the first day of each calendar month.',
                    'Because the year’s number is added to every month, the sequence shifts with the year: in a Personal Year 1 January is a 2, while in a Personal Year 5 January is a 6.',
                ],
            },
            {
                id: 'interpretation',
                heading: 'Reading it',
                paragraphs: [
                    'Practitioners read the month as a variation on the year’s theme rather than a rival to it. A Personal Month 9 in a Personal Year 1 is a small closing within a year of beginnings; the same month in a Personal Year 9 doubles the emphasis on ending. When the month’s number matches the year’s, that theme is read as especially pronounced for those weeks.',
                ],
            },
        ],
        related: ['numerology.position.personal-year', 'numerology.position.personal-day', 'numerology.personal-year.1', 'numerology.foundations.reading-a-chart'],
    },
    {
        id: 'numerology.position.personal-day',
        library: 'numerology',
        category: 'position',
        title: 'Personal Day',
        summary: 'The Personal Month combined with the day of the month. The smallest of the cycles, it is read as the tone of a single day.',
        glyph: 'PD',
        keywords: ['Personal Day number', 'daily cycle', 'timing'],
        sections: [
            {
                id: 'what-it-measures',
                heading: 'What it measures',
                paragraphs: [
                    'At the finest scale numerology offers, the Personal Day assigns each date a number from 1 to 9. It is read as a small emphasis - a day suited to beginning something, to conversation, to admin, to rest - and is the least weighted of all the numbers a chart contains.',
                ],
            },
            {
                id: 'calculation',
                heading: 'How it is calculated',
                paragraphs: [
                    'The Personal Month number is added to the day of the month, and the sum is reduced to 1-9 with master numbers reduced. In a Personal Month 2, the 17th gives 2 + 17 = 19, then 10, then 1. The number changes at local midnight.',
                    'Since the day of the month advances by one each day, the Personal Day usually steps through 1 to 9 in order, with a jump wherever a month ends and the count restarts from a new Personal Month.',
                ],
            },
            {
                id: 'interpretation',
                heading: 'Reading it',
                paragraphs: [
                    'The Personal Day is best read as a prompt for attention rather than a plan. It nests inside the [[numerology.position.personal-month|Personal Month]] and the [[numerology.position.personal-year|Personal Year]], and practitioners treat it as background whenever it conflicts with them. Its practical use is noticing: whether a 1 day does in fact feel like a start, whether a 7 day invites quiet.',
                ],
            },
        ],
        related: ['numerology.position.personal-month', 'numerology.position.personal-year', 'numerology.personal-year.1', 'synthesis.guide.counter-evidence'],
    },
    {
        id: 'numerology.position.pinnacles',
        library: 'numerology',
        category: 'position',
        title: 'Pinnacles',
        summary: 'Four numbers from the birth date, each governing a long chapter of life. The tradition reads each Pinnacle as the opportunity or theme that defines its period.',
        glyph: 'PN',
        keywords: ['Pinnacle numbers', 'four Pinnacles', 'life chapters', 'life periods'],
        sections: [
            {
                id: 'what-it-measures',
                heading: 'What it measures',
                paragraphs: [
                    'Where the Life Path describes a whole route, the Pinnacles divide it into four stretches, each with its own prevailing theme. The tradition reads a Pinnacle as what a chapter offers - the kind of opportunity, environment or task that tends to dominate those years - and treats the move from one Pinnacle to the next as a noticeable change of climate.',
                ],
            },
            {
                id: 'calculation',
                heading: 'How it is calculated',
                paragraphs: [
                    'The parts are those of the Life Path: month, day and year, each reduced with master numbers kept. The first Pinnacle adds month and day; the second adds day and year; the third adds the first two Pinnacles; the fourth adds month and year. Every sum is reduced with 11, 22 and 33 kept.',
                    'Born 21 June 1979, the parts are 6, 3 and 8. The Pinnacles are 9, 11 (a master, kept), 2 (9 + 11 = 20) and 5 (6 + 8 = 14). This is the method Hans Decoz sets out, including his rule that a master met during the calculation stays whole: a November birth adds 11, not 2.',
                    'The application does not read compounds such as that 14 as karmic debts in this position. Decoz notes that the debt numbers can also turn up in the long-term cycles, so a practitioner following him may comment on one here.',
                    'The four-Pinnacle scheme is a twentieth-century addition to the method; the early handbook Numerology at a Glance, by Cheasley, credited it to Juno Jordan.',
                ],
            },
            {
                id: 'timing',
                heading: 'Timing',
                paragraphs: [
                    'The first Pinnacle runs from birth to age 36 minus the root of the Life Path; a master Life Path is reduced to its root first, so an 11 counts as 2. The second and third last nine years each, and the fourth runs for the rest of life. With Life Path 8, the chapters cover ages 0-28, 29-37, 38-46 and 47 onward.',
                ],
            },
            {
                id: 'interpretation',
                heading: 'Reading it',
                paragraphs: [
                    'The application reads each Pinnacle together with the [[numerology.position.challenges|Challenge]] of the same number and age window. Not every school ties them so closely: Decoz gives the Challenges only approximate, overlapping spans and treats the third as lifelong. A Pinnacle that repeats the Life Path is read as a chapter in which the route runs with the grain; one that differs sharply suggests a period spent developing qualities the route does not ordinarily ask for.',
                ],
            },
        ],
        related: ['numerology.position.challenges', 'numerology.position.life-path', 'numerology.position.personal-year', 'numerology.number.11', 'numerology.foundations.reading-a-chart'],
    },
    {
        id: 'numerology.position.challenges',
        library: 'numerology',
        category: 'position',
        title: 'Challenges',
        summary: 'Four numbers found by subtraction between parts of the birth date. Each is read as the friction that accompanies the Pinnacle of the same period.',
        glyph: 'CH',
        keywords: ['Challenge numbers', 'four Challenges', 'Challenge 0', 'main Challenge'],
        sections: [
            {
                id: 'what-it-measures',
                heading: 'What it measures',
                paragraphs: [
                    'A Challenge names the obstacle the tradition expects in a stretch of life: a tendency to be overcome, a weakness exposed by circumstances, a quality that must be developed before an opportunity can be fully used. The third is called the main Challenge because it is derived from the first two.',
                    'Schools differ on timing. The application gives each Challenge the same age window as the Pinnacle of the same number, so that every chapter has an opportunity and a pressure. Hans Decoz instead treats the Challenges as loosely bounded and overlapping - the first to about 30-35, the second to about 55-60, the fourth after that - with the main Challenge present from birth to death.',
                ],
            },
            {
                id: 'calculation',
                heading: 'How it is calculated',
                paragraphs: [
                    'The month, day and year of birth are each reduced to a single digit, and here master numbers are reduced too, as Decoz instructs: November becomes 2, the 22nd becomes 4. The first Challenge is the difference between day and month; the second between day and year; the third between the first two Challenges; the fourth between month and year. Differences are always taken as positive numbers.',
                    'Born 21 June 1979, the digits are 6, 3 and 8: the Challenges are 3, 5, 2 and 2. Since each is a difference of two single digits, the possible values run from 0 to 8, and no Challenge can be a master number or a 9.',
                ],
            },
            {
                id: 'zero',
                heading: 'The Challenge of 0',
                paragraphs: [
                    'A 0 arises whenever two parts are equal - a birth on 6 June gives a first Challenge of 0 - and it is common. Its reading is one of the clearest disagreements between practitioners.',
                    'One widespread reading, used by the application, treats 0 as a Challenge with no single assigned theme: all of the tests or none of them may arrive, and the work is choosing which to take on rather than having circumstance choose. It is sometimes called the Challenge of choice. Decoz reads it differently, as a stand-in for 9 - a comparatively light Challenge coloured by the 9’s broad, humanitarian concerns.',
                ],
            },
        ],
        related: ['numerology.position.pinnacles', 'numerology.position.life-path', 'numerology.foundations.reduction-and-master-numbers', 'synthesis.guide.tension'],
    },
];
