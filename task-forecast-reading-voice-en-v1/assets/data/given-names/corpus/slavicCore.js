/*
 * SLAVIC CORE NAMES.
 *
 * This file is also the worked reference for the corpus format - the other
 * corpus files follow the shape established here.
 *
 * The two things to copy are not stylistic. First: every origin carries an
 * `epistemicClass` and a `confidence`, and where scholarship is divided the
 * record holds MORE THAN ONE origin rather than picking a winner. Second:
 * `form` fields hold real linguistic material and are never translated, while
 * `gloss`, `summary` and `note` are prose and always carry Slovak.
 */
export const SLAVIC_CORE_NAMES = [
    {
        canonicalKey: 'boris',
        canonicalName: 'Boris',
        gender: 'masculine',
        /* The reference case for a contested origin: two serious proposals, one
           Slavic and one Turkic/Bulgar, and no honest way to choose between them.
           Both are recorded; the reading is required to say the origin is disputed. */
        origins: [
            {
                id: 'boris-slavic-short-form',
                sourceLanguage: 'proto-slavic',
                culture: {
                    en: 'Slavic',
                    sk: 'Slovanská',
                },
                derivation: [
                    {
                        form: 'borti',
                        language: 'proto-slavic',
                        reconstructed: true,
                        gloss: { en: 'to fight, to struggle', sk: 'bojovať, zápasiť' },
                    },
                    {
                        form: 'Borislav',
                        language: 'slavic',
                        gloss: { en: 'battle glory', sk: 'sláva v boji' },
                    },
                    {
                        form: 'Boris',
                        language: 'slavic',
                        gloss: { en: 'shortened form', sk: 'skrátená podoba' },
                    },
                ],
                gloss: { en: 'battle, struggle', sk: 'boj, zápas' },
                confidence: 'probable',
                epistemicClass: 'disputed-origin',
                summary: {
                    en: 'On the most widely held reading, Boris is a shortened form of a Slavic compound name such as Borislav, built on a root meaning to fight. This accounts naturally for the name’s spread across the Slavic-speaking world.',
                    sk: 'Podľa najrozšírenejšieho výkladu je Boris skrátenou podobou slovanského zloženého mena ako Borislav, utvoreného od koreňa s významom bojovať. To prirodzene vysvetľuje rozšírenie mena v slovanskom svete.',
                },
                provenance: ['slavic-onomastics', 'onomastic-consensus'],
            },
            {
                id: 'boris-bulgar-turkic',
                sourceLanguage: 'bulgar',
                culture: { en: 'Bulgar / Turkic', sk: 'Bulharská / turkická' },
                region: { en: 'First Bulgarian Empire', sk: 'Prvá bulharská ríša' },
                derivation: [
                    {
                        form: 'bars',
                        language: 'turkic',
                        reconstructed: true,
                        gloss: { en: 'snow leopard, panther', sk: 'snežný leopard, panter' },
                    },
                ],
                gloss: { en: 'snow leopard', sk: 'snežný leopard' },
                confidence: 'disputed',
                epistemicClass: 'disputed-origin',
                summary: {
                    en: 'A competing account traces the name to the Turkic Bulgar language, from a word for a big cat, by way of Boris I of Bulgaria. The historical route is plausible but the derivation itself is contested.',
                    sk: 'Konkurenčný výklad odvodzuje meno z turkického bulharského jazyka, zo slova pre veľkú mačkovitú šelmu, prostredníctvom bulharského panovníka Borisa I. Historická cesta je vierohodná, samotné odvodenie je však sporné.',
                },
                provenance: ['contested-etymology'],
            },
        ],
        meaning: {
            literal: { en: 'battle, struggle', sk: 'boj, zápas' },
            traditional: { en: 'fighter', sk: 'bojovník' },
        },
        history: {
            en: 'The name spread through the Slavic Orthodox world after Boris I, the ninth-century Bulgarian ruler under whom Bulgaria adopted Christianity, and was carried further by the veneration of Saints Boris and Gleb in Kievan Rus. It reached Slovak and Czech usage later, largely as a shared Slavic name rather than through a local saint.',
            sk: 'Meno sa rozšírilo slovanským pravoslávnym svetom po Borisovi I., bulharskom panovníkovi z 9. storočia, za ktorého Bulharsko prijalo kresťanstvo, a ďalej ho šírila úcta k svätým Borisovi a Glebovi v Kyjevskej Rusi. Do slovenského a českého prostredia sa dostalo neskôr, prevažne ako spoločné slovanské meno, nie cez miestneho svätca.',
        },
        culturalSpread: [
            {
                id: 'boris-east-slavic',
                region: { en: 'Russia, Ukraine, Belarus', sk: 'Rusko, Ukrajina, Bielorusko' },
                forms: ['Борис', 'Boris'],
            },
            {
                id: 'boris-south-slavic',
                region: { en: 'Bulgaria, Serbia, Croatia, Slovenia', sk: 'Bulharsko, Srbsko, Chorvátsko, Slovinsko' },
                forms: ['Борис', 'Boris'],
            },
            {
                id: 'boris-west-slavic',
                region: { en: 'Slovakia, Czechia, Poland', sk: 'Slovensko, Česko, Poľsko' },
                forms: ['Boris', 'Borys'],
            },
        ],
        variants: [
            { form: 'Borys', kind: 'language-form', language: 'polish', resolvesToCanonical: true },
            { form: 'Борис', kind: 'transliteration', language: 'russian', resolvesToCanonical: true },
            { form: 'Borisz', kind: 'language-form', language: 'hungarian', resolvesToCanonical: true },
            { form: 'Borja', kind: 'diminutive', language: 'russian', resolvesToCanonical: false,
                note: {
                    en: 'A Russian diminutive. Not resolved automatically, because the same short form is used for other names.',
                    sk: 'Ruská zdrobnenina. Neprekladá sa automaticky na toto meno, pretože tú istú skrátenú podobu majú aj iné mená.',
                } },
        ],
        relatedNames: [
            { canonicalKey: 'borislav', relation: 'derived-from' },
            { canonicalKey: 'bohuslav', relation: 'shares-root',
                note: { en: 'Shares the -slav element, not the bor- element.', sk: 'Zhoduje sa v prvku -slav, nie v prvku bor-.' } },
        ],
        confidence: 'disputed',
        notes: [
            {
                id: 'boris-not-a-trait',
                kind: 'usage',
                text: {
                    en: 'A name meaning battle says something about the word it descends from, not about anyone who carries it.',
                    sk: 'Meno s významom boj hovorí niečo o slove, z ktorého pochádza, nie o tom, kto ho nosí.',
                },
            },
        ],
        provenance: ['slavic-onomastics', 'contested-etymology', 'curated-summary'],
    },
    {
        canonicalKey: 'borislav',
        canonicalName: 'Borislav',
        gender: 'masculine',
        origins: [
            {
                id: 'borislav-slavic-compound',
                sourceLanguage: 'proto-slavic',
                culture: { en: 'Slavic', sk: 'Slovanská' },
                derivation: [
                    { form: 'borti', language: 'proto-slavic', reconstructed: true,
                        gloss: { en: 'to fight', sk: 'bojovať' } },
                    { form: 'slava', language: 'proto-slavic', reconstructed: true,
                        gloss: { en: 'glory, fame', sk: 'sláva' } },
                    { form: 'Borislav', language: 'slavic',
                        gloss: { en: 'battle glory', sk: 'sláva v boji' } },
                ],
                gloss: { en: 'battle glory', sk: 'sláva v boji' },
                confidence: 'well-attested',
                epistemicClass: 'etymological-fact',
                summary: {
                    en: 'A transparent Slavic two-element name: a root meaning to fight joined to the very common -slav element meaning glory. Compound names of this pattern are the oldest identifiable layer of Slavic personal naming.',
                    sk: 'Priehľadné slovanské dvojčlenné meno: koreň s významom bojovať spojený s veľmi častým prvkom -slav s významom sláva. Zložené mená tohto typu tvoria najstaršiu rozpoznateľnú vrstvu slovanského pomenúvania osôb.',
                },
                provenance: ['slavic-onomastics'],
            },
        ],
        meaning: { literal: { en: 'battle glory', sk: 'sláva v boji' } },
        culturalSpread: [
            { id: 'borislav-south-slavic', region: { en: 'Serbia, Bulgaria, Croatia', sk: 'Srbsko, Bulharsko, Chorvátsko' }, forms: ['Борислав', 'Borislav'] },
            { id: 'borislav-west-slavic', region: { en: 'Slovakia, Czechia', sk: 'Slovensko, Česko' }, forms: ['Borislav'] },
        ],
        variants: [
            { form: 'Борислав', kind: 'transliteration', language: 'serbo-croatian', resolvesToCanonical: true },
            { form: 'Borislava', kind: 'spelling', resolvesToCanonical: false,
                note: { en: 'The feminine name, kept as its own entry.', sk: 'Ženské meno, vedené ako samostatná položka.' } },
        ],
        relatedNames: [
            { canonicalKey: 'boris', relation: 'shares-root' },
            { canonicalKey: 'bohuslav', relation: 'shares-root' },
        ],
        confidence: 'well-attested',
        notes: [],
        provenance: ['slavic-onomastics'],
    },
];
