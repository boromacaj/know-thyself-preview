/*
 * SLOVAK NAME-DAY CALENDAR - COVERAGE GAP, BATCH A.
 * ================================================
 *
 * Names printed in the Slovak civil name-day calendar that had no etymology
 * record yet. The format follows corpus/slavicCore.ts exactly and nothing
 * about that is stylistic: `form` fields hold real linguistic material and are
 * never translated, everything explanatory carries Slovak, and every origin
 * states what kind of claim it is and how well the DERIVATION is supported -
 * not how popular the story is.
 *
 * THE FIRST GROUP IS DELIBERATE
 * The file opens with feminine and masculine counterparts of names the corpus
 * already holds. Those are the safest entries in the batch: the derivation is
 * already established for the base name and the only new claim is the regular
 * gender suffix, which is why they are linked with `relatedNames` rather than
 * restated as independent discoveries.
 *
 * WHAT IS NOT HERE, AND WHY
 * Several names from the batch were left out because no derivation for them
 * could be supported without inventing one - mostly rare nineteenth-century
 * revival coinages and hypocorisms whose base name is genuinely unrecoverable.
 * A shorter honest file is the correct outcome; one fabricated etymology would
 * discredit every entry beside it.
 *
 * ON HYPOCORISMS
 * A few entries (Dáša, Ela) exist because the calendar prints them, and they
 * carry `literal: null`. That is not laziness: a
 * short form whose base could be any of four longer names has no single
 * meaning, and asserting one would be exactly the failure this layer exists to
 * prevent.
 */
export const SLOVAK_CALENDAR_GAP_A = [
    /* ---------------------------------------------------------------------- *
     * Counterparts of records the corpus already holds.
     * ---------------------------------------------------------------------- */
    {
        canonicalKey: 'daniela',
        canonicalName: 'Daniela',
        gender: 'feminine',
        origins: [
            {
                id: 'daniela-hebrew-sentence-name',
                sourceLanguage: 'hebrew',
                culture: { en: 'Hebrew / biblical', sk: 'Hebrejská / biblická' },
                derivation: [
                    { form: 'dyn', language: 'hebrew', gloss: { en: 'to judge', sk: 'súdiť' } },
                    { form: 'ʾel', language: 'hebrew', gloss: { en: 'God', sk: 'Boh' } },
                    { form: 'Dānīʾēl', language: 'hebrew', gloss: { en: 'God is my judge', sk: 'Boh je môj sudca' } },
                    { form: 'Daniela', language: 'latin', gloss: { en: 'feminine form built on the Latin Daniel', sk: 'ženská podoba utvorená z latinského Daniel' } },
                ],
                gloss: { en: 'God is my judge', sk: 'Boh je môj sudca' },
                confidence: 'well-attested',
                epistemicClass: 'etymological-fact',
                summary: {
                    en: 'The feminine counterpart of Daniel, a transparent Hebrew sentence name joining a verb meaning to judge with the divine element El. The feminine form is a later Latin and vernacular formation, not a separate biblical name.',
                    sk: 'Ženský náprotivok mena Daniel, priehľadné hebrejské vetné meno spájajúce sloveso s významom súdiť s božským prvkom El. Ženská podoba je až neskoršie latinské a ľudové utvorenie, nie samostatné biblické meno.',
                },
                provenance: ['biblical-onomastics'],
            },
        ],
        meaning: { literal: { en: 'God is my judge', sk: 'Boh je môj sudca' } },
        culturalSpread: [
            { id: 'daniela-central-europe', region: { en: 'Slovakia, Czechia, Poland', sk: 'Slovensko, Česko, Poľsko' }, forms: ['Daniela'] },
            { id: 'daniela-romance', region: { en: 'Italy, Spain, Romania', sk: 'Taliansko, Španielsko, Rumunsko' }, forms: ['Daniela', 'Danièle'] },
        ],
        variants: [
            { form: 'Danièle', kind: 'language-form', language: 'french', resolvesToCanonical: true },
            { form: 'Danka', kind: 'diminutive', language: 'slovak', resolvesToCanonical: false,
                note: { en: 'A Slovak diminutive shared with Dana and Bohdana, so it is not resolved automatically.', sk: 'Slovenská zdrobnenina spoločná aj pre Danu a Bohdanu, preto sa neprekladá automaticky.' } },
        ],
        relatedNames: [
            { canonicalKey: 'daniel', relation: 'masculine-form' },
            { canonicalKey: 'dana', relation: 'shares-root',
                note: { en: 'Dana is one of the short forms of Daniela, though not the only reading of Dana.', sk: 'Dana je jednou zo skrátených podôb mena Daniela, hoci nie jediným výkladom mena Dana.' } },
        ],
        confidence: 'well-attested',
        notes: [],
        provenance: ['biblical-onomastics', 'sk-civil-calendar'],
    },
    {
        canonicalKey: 'gabriela',
        canonicalName: 'Gabriela',
        gender: 'feminine',
        origins: [
            {
                id: 'gabriela-hebrew-compound',
                sourceLanguage: 'hebrew',
                culture: { en: 'Hebrew / biblical', sk: 'Hebrejská / biblická' },
                derivation: [
                    { form: 'gbr', language: 'hebrew', gloss: { en: 'to be strong; strong man', sk: 'byť silný; silný muž' } },
                    { form: 'ʾel', language: 'hebrew', gloss: { en: 'God', sk: 'Boh' } },
                    { form: 'Gaḇrīʾēl', language: 'hebrew', gloss: { en: 'God is my strength', sk: 'Boh je moja sila' } },
                    { form: 'Gabriela', language: 'latin', gloss: { en: 'feminine form', sk: 'ženská podoba' } },
                ],
                gloss: { en: 'God is my strength', sk: 'Boh je moja sila' },
                confidence: 'well-attested',
                epistemicClass: 'etymological-fact',
                summary: {
                    en: 'The feminine counterpart of the archangel name Gabriel, built from a Hebrew root for strength and the divine element El. The two elements are certain; how the compound is best rendered is a matter of translation rather than of etymology.',
                    sk: 'Ženský náprotivok mena archanjela Gabriela, utvorený z hebrejského koreňa pre silu a božského prvku El. Oba prvky sú isté; ako presne zložením preložiť, je otázka prekladu, nie pôvodu.',
                },
                provenance: ['biblical-onomastics'],
            },
        ],
        meaning: {
            literal: { en: 'God is my strength', sk: 'Boh je moja sila' },
            traditional: { en: 'man of God', sk: 'muž Boží' },
        },
        culturalSpread: [
            { id: 'gabriela-central-europe', region: { en: 'Slovakia, Czechia, Poland', sk: 'Slovensko, Česko, Poľsko' }, forms: ['Gabriela'] },
            { id: 'gabriela-romance', region: { en: 'France, Italy, Spain', sk: 'Francúzsko, Taliansko, Španielsko' }, forms: ['Gabrielle', 'Gabriella'] },
        ],
        variants: [
            { form: 'Gabriella', kind: 'language-form', language: 'italian', resolvesToCanonical: true },
            { form: 'Gabrielle', kind: 'language-form', language: 'french', resolvesToCanonical: true },
            { form: 'Gabika', kind: 'diminutive', language: 'slovak', resolvesToCanonical: true },
        ],
        relatedNames: [
            { canonicalKey: 'gabriel', relation: 'masculine-form' },
        ],
        confidence: 'well-attested',
        notes: [
            {
                id: 'gabriela-compound-reading',
                kind: 'linguistic',
                text: {
                    en: 'The Hebrew compound is read both as "God is my strength" and as "man of God", because the first element covers both strength and the strong man. Both renderings describe the same word.',
                    sk: 'Hebrejské zloženie sa číta aj ako „Boh je moja sila“, aj ako „muž Boží“, pretože prvý prvok pokrýva silu i silného muža. Oba preklady opisujú to isté slovo.',
                },
            },
        ],
        provenance: ['biblical-onomastics', 'sk-civil-calendar'],
    },
    {
        canonicalKey: 'bohumila',
        canonicalName: 'Bohumila',
        gender: 'feminine',
        origins: [
            {
                id: 'bohumila-slavic-compound',
                sourceLanguage: 'proto-slavic',
                culture: { en: 'Slavic', sk: 'Slovanská' },
                derivation: [
                    { form: 'bogъ', language: 'proto-slavic', reconstructed: true, gloss: { en: 'god', sk: 'boh' } },
                    { form: 'milъ', language: 'proto-slavic', reconstructed: true, gloss: { en: 'dear, gracious, beloved', sk: 'milý, láskavý, milovaný' } },
                    { form: 'Bohumila', language: 'slovak', gloss: { en: 'dear to God', sk: 'milá Bohu' } },
                ],
                gloss: { en: 'dear to God', sk: 'milá Bohu' },
                confidence: 'well-attested',
                epistemicClass: 'etymological-fact',
                summary: {
                    en: 'A transparent Slavic two-element name joining the word for god to a root meaning dear or beloved. It belongs to the same Boh- family as Bohumír and Bohuslav and is the feminine counterpart of Bohumil.',
                    sk: 'Priehľadné slovanské dvojčlenné meno spájajúce slovo boh s koreňom s významom milý či milovaný. Patrí do tej istej skupiny mien s prvkom Boh- ako Bohumír a Bohuslav a je ženským náprotivkom mena Bohumil.',
                },
                provenance: ['slavic-onomastics'],
            },
        ],
        meaning: { literal: { en: 'dear to God', sk: 'milá Bohu' } },
        culturalSpread: [
            { id: 'bohumila-west-slavic', region: { en: 'Slovakia, Czechia', sk: 'Slovensko, Česko' }, forms: ['Bohumila'] },
        ],
        variants: [
            { form: 'Bohuška', kind: 'diminutive', language: 'slovak', resolvesToCanonical: false,
                note: { en: 'Shared with other Boh- names, so it is not resolved automatically.', sk: 'Spoločná aj pre iné mená s prvkom Boh-, preto sa neprekladá automaticky.' } },
        ],
        relatedNames: [
            { canonicalKey: 'bohumil', relation: 'masculine-form' },
            { canonicalKey: 'bohumir', relation: 'shares-root' },
            { canonicalKey: 'bohuslava', relation: 'shares-root' },
        ],
        confidence: 'well-attested',
        notes: [],
        provenance: ['slavic-onomastics', 'sk-civil-calendar'],
    },
    {
        canonicalKey: 'radoslava',
        canonicalName: 'Radoslava',
        gender: 'feminine',
        origins: [
            {
                id: 'radoslava-slavic-compound',
                sourceLanguage: 'proto-slavic',
                culture: { en: 'Slavic', sk: 'Slovanská' },
                derivation: [
                    { form: 'radъ', language: 'proto-slavic', reconstructed: true, gloss: { en: 'glad, willing, joyful', sk: 'rád, ochotný, radostný' } },
                    { form: 'slava', language: 'proto-slavic', reconstructed: true, gloss: { en: 'glory, fame', sk: 'sláva' } },
                    { form: 'Radoslava', language: 'slovak', gloss: { en: 'glad of glory', sk: 'radostná zo slávy' } },
                ],
                gloss: { en: 'joyful glory', sk: 'radostná sláva' },
                confidence: 'well-attested',
                epistemicClass: 'etymological-fact',
                summary: {
                    en: 'A transparent Slavic compound of the root rad-, glad or willing, with the very common -slav element meaning glory. It is the feminine counterpart of Radoslav.',
                    sk: 'Priehľadné slovanské zloženie koreňa rad- s významom rád či ochotný a veľmi častého prvku -slav s významom sláva. Je ženským náprotivkom mena Radoslav.',
                },
                provenance: ['slavic-onomastics'],
            },
        ],
        meaning: { literal: { en: 'joyful glory', sk: 'radostná sláva' } },
        culturalSpread: [
            { id: 'radoslava-west-slavic', region: { en: 'Slovakia, Czechia', sk: 'Slovensko, Česko' }, forms: ['Radoslava'] },
            { id: 'radoslava-south-slavic', region: { en: 'Serbia, Bulgaria', sk: 'Srbsko, Bulharsko' }, forms: ['Радослава', 'Radoslava'] },
        ],
        variants: [
            { form: 'Радослава', kind: 'transliteration', language: 'bulgarian', resolvesToCanonical: true },
            { form: 'Rada', kind: 'diminutive', language: 'slovak', resolvesToCanonical: false },
        ],
        relatedNames: [
            { canonicalKey: 'radoslav', relation: 'masculine-form' },
            { canonicalKey: 'radomir', relation: 'shares-root' },
            { canonicalKey: 'radovan', relation: 'shares-root' },
        ],
        confidence: 'well-attested',
        notes: [],
        provenance: ['slavic-onomastics', 'sk-civil-calendar'],
    },
    {
        canonicalKey: 'dobroslava',
        canonicalName: 'Dobroslava',
        gender: 'feminine',
        origins: [
            {
                id: 'dobroslava-slavic-compound',
                sourceLanguage: 'proto-slavic',
                culture: { en: 'Slavic', sk: 'Slovanská' },
                derivation: [
                    { form: 'dobrъ', language: 'proto-slavic', reconstructed: true, gloss: { en: 'good, fitting', sk: 'dobrý, vhodný' } },
                    { form: 'slava', language: 'proto-slavic', reconstructed: true, gloss: { en: 'glory, fame', sk: 'sláva' } },
                    { form: 'Dobroslava', language: 'slovak', gloss: { en: 'good glory', sk: 'dobrá sláva' } },
                ],
                gloss: { en: 'good glory, of good repute', sk: 'dobrá sláva, dobrej povesti' },
                confidence: 'well-attested',
                epistemicClass: 'etymological-fact',
                summary: {
                    en: 'A transparent Slavic compound joining dobro, good, to the -slav element meaning glory or repute. It is the feminine counterpart of Dobroslav.',
                    sk: 'Priehľadné slovanské zloženie prvku dobro s prvkom -slav s významom sláva či povesť. Je ženským náprotivkom mena Dobroslav.',
                },
                provenance: ['slavic-onomastics'],
            },
        ],
        meaning: { literal: { en: 'good glory', sk: 'dobrá sláva' } },
        culturalSpread: [
            { id: 'dobroslava-west-slavic', region: { en: 'Slovakia, Czechia', sk: 'Slovensko, Česko' }, forms: ['Dobroslava'] },
        ],
        variants: [
            { form: 'Dobra', kind: 'diminutive', language: 'slovak', resolvesToCanonical: false },
        ],
        relatedNames: [
            { canonicalKey: 'dobroslav', relation: 'masculine-form' },
        ],
        confidence: 'well-attested',
        notes: [],
        provenance: ['slavic-onomastics', 'sk-civil-calendar'],
    },
    {
        canonicalKey: 'miloslava',
        canonicalName: 'Miloslava',
        gender: 'feminine',
        origins: [
            {
                id: 'miloslava-slavic-compound',
                sourceLanguage: 'proto-slavic',
                culture: { en: 'Slavic', sk: 'Slovanská' },
                derivation: [
                    { form: 'milъ', language: 'proto-slavic', reconstructed: true, gloss: { en: 'dear, gracious, beloved', sk: 'milý, láskavý, milovaný' } },
                    { form: 'slava', language: 'proto-slavic', reconstructed: true, gloss: { en: 'glory, fame', sk: 'sláva' } },
                    { form: 'Miloslava', language: 'slovak', gloss: { en: 'dear glory', sk: 'milá sláva' } },
                ],
                gloss: { en: 'dear to glory, gracious and renowned', sk: 'milá sláve, láskavá a slávna' },
                confidence: 'well-attested',
                epistemicClass: 'etymological-fact',
                summary: {
                    en: 'A transparent Slavic compound of the root mil-, dear or gracious, with the -slav element meaning glory. It is the feminine counterpart of Miloslav and belongs to the same family as Milan and Milena.',
                    sk: 'Priehľadné slovanské zloženie koreňa mil- s významom milý či láskavý a prvku -slav s významom sláva. Je ženským náprotivkom mena Miloslav a patrí do tej istej skupiny ako Milan a Milena.',
                },
                provenance: ['slavic-onomastics'],
            },
        ],
        meaning: { literal: { en: 'dear glory', sk: 'milá sláva' } },
        culturalSpread: [
            { id: 'miloslava-west-slavic', region: { en: 'Slovakia, Czechia', sk: 'Slovensko, Česko' }, forms: ['Miloslava'] },
        ],
        variants: [
            { form: 'Milka', kind: 'diminutive', language: 'slovak', resolvesToCanonical: false,
                note: { en: 'Shared with several mil- names, so it is not resolved automatically.', sk: 'Spoločná pre viaceré mená s prvkom mil-, preto sa neprekladá automaticky.' } },
        ],
        relatedNames: [
            { canonicalKey: 'miloslav', relation: 'masculine-form' },
            { canonicalKey: 'milena', relation: 'shares-root' },
            { canonicalKey: 'milada', relation: 'shares-root' },
        ],
        confidence: 'well-attested',
        notes: [],
        provenance: ['slavic-onomastics', 'sk-civil-calendar'],
    },
    {
        canonicalKey: 'ladislava',
        canonicalName: 'Ladislava',
        gender: 'feminine',
        origins: [
            {
                id: 'ladislava-slavic-compound',
                sourceLanguage: 'proto-slavic',
                culture: { en: 'Slavic', sk: 'Slovanská' },
                derivation: [
                    { form: 'volděti', language: 'proto-slavic', reconstructed: true, gloss: { en: 'to rule, to hold power', sk: 'vládnuť, mať moc' } },
                    { form: 'slava', language: 'proto-slavic', reconstructed: true, gloss: { en: 'glory, fame', sk: 'sláva' } },
                    { form: 'Vladislavъ', language: 'old-church-slavonic', gloss: { en: 'glorious ruler', sk: 'slávny vládca' } },
                    { form: 'Ladislava', language: 'slovak', gloss: { en: 'feminine form of the Ladislav variant', sk: 'ženská podoba obmeny Ladislav' } },
                ],
                gloss: { en: 'glorious rule', sk: 'slávna vláda' },
                confidence: 'well-attested',
                epistemicClass: 'etymological-fact',
                summary: {
                    en: 'The feminine counterpart of Ladislav, itself a variant of the Slavic compound Vladislav, glorious ruler. The shortened La- form spread from Hungarian László and became the usual shape of the name in Slovakia.',
                    sk: 'Ženský náprotivok mena Ladislav, ktoré je obmenou slovanského zloženého mena Vladislav s významom slávny vládca. Skrátená podoba s La- sa rozšírila cez maďarské László a na Slovensku sa ustálila ako bežná.',
                },
                provenance: ['slavic-onomastics'],
            },
        ],
        meaning: { literal: { en: 'glorious rule', sk: 'slávna vláda' } },
        culturalSpread: [
            { id: 'ladislava-west-slavic', region: { en: 'Slovakia, Czechia', sk: 'Slovensko, Česko' }, forms: ['Ladislava'] },
        ],
        variants: [
            { form: 'Lada', kind: 'diminutive', language: 'slovak', resolvesToCanonical: false },
            { form: 'Vladislava', kind: 'spelling', language: 'slovak', resolvesToCanonical: false,
                note: { en: 'The unshortened Slavic form, kept as its own entry.', sk: 'Neskrátená slovanská podoba, vedená ako samostatná položka.' } },
        ],
        relatedNames: [
            { canonicalKey: 'ladislav', relation: 'masculine-form' },
            { canonicalKey: 'vladislav', relation: 'shares-root' },
        ],
        confidence: 'well-attested',
        notes: [],
        provenance: ['slavic-onomastics', 'sk-civil-calendar'],
    },
    {
        canonicalKey: 'romana',
        canonicalName: 'Romana',
        gender: 'feminine',
        origins: [
            {
                id: 'romana-latin-ethnonym',
                sourceLanguage: 'latin',
                culture: { en: 'Roman / Latin Christian', sk: 'Rímska / latinská kresťanská' },
                derivation: [
                    { form: 'Roma', language: 'latin', gloss: { en: 'Rome', sk: 'Rím' } },
                    { form: 'Romanus', language: 'latin', gloss: { en: 'Roman, of Rome', sk: 'rímsky, z Ríma' } },
                    { form: 'Romana', language: 'latin', gloss: { en: 'feminine form', sk: 'ženská podoba' } },
                ],
                gloss: { en: 'Roman woman, of Rome', sk: 'Rimanka, z Ríma' },
                confidence: 'well-attested',
                epistemicClass: 'etymological-fact',
                summary: {
                    en: 'A straightforward Latin adjective of origin, the feminine of Romanus, meaning simply Roman. It entered general use as a Christian name through early martyrs bearing the epithet.',
                    sk: 'Priamočiare latinské prídavné meno pôvodu, ženská podoba slova Romanus s významom rímsky. Do bežného používania sa dostalo ako kresťanské meno cez ranokresťanských mučeníkov s týmto prívlastkom.',
                },
                provenance: ['classical-onomastics'],
            },
        ],
        meaning: { literal: { en: 'Roman, of Rome', sk: 'rímska, z Ríma' } },
        culturalSpread: [
            { id: 'romana-central-europe', region: { en: 'Slovakia, Czechia, Poland', sk: 'Slovensko, Česko, Poľsko' }, forms: ['Romana'] },
            { id: 'romana-romance', region: { en: 'Italy, Spain', sk: 'Taliansko, Španielsko' }, forms: ['Romana'] },
        ],
        variants: [
            { form: 'Romina', kind: 'language-form', language: 'italian', resolvesToCanonical: false,
                note: { en: 'An Italian name of separate formation, linked but not identical.', sk: 'Talianske meno utvorené samostatne, príbuzné, ale nie totožné.' } },
        ],
        relatedNames: [
            { canonicalKey: 'roman', relation: 'masculine-form' },
        ],
        confidence: 'well-attested',
        notes: [],
        provenance: ['classical-onomastics', 'sk-civil-calendar'],
    },
    {
        canonicalKey: 'frederika',
        canonicalName: 'Frederika',
        gender: 'feminine',
        origins: [
            {
                id: 'frederika-germanic-compound',
                sourceLanguage: 'proto-germanic',
                culture: { en: 'Germanic', sk: 'Germánska' },
                derivation: [
                    { form: 'friþuz', language: 'proto-germanic', reconstructed: true, gloss: { en: 'peace, protection', sk: 'mier, ochrana' } },
                    { form: 'rīkijaz', language: 'proto-germanic', reconstructed: true, gloss: { en: 'ruler, powerful', sk: 'vládca, mocný' } },
                    { form: 'Fridurih', language: 'old-high-german', gloss: { en: 'peaceful ruler', sk: 'mierumilovný vládca' } },
                    { form: 'Friderica', language: 'latin', gloss: { en: 'latinized feminine form', sk: 'polatinčená ženská podoba' } },
                ],
                gloss: { en: 'peaceful ruler', sk: 'mierumilovná vládkyňa' },
                confidence: 'well-attested',
                epistemicClass: 'etymological-fact',
                summary: {
                    en: 'The feminine counterpart of Frederik, a Germanic two-element name joining a word for peace to one for ruler. Both elements are among the most productive in Germanic personal naming.',
                    sk: 'Ženský náprotivok mena Frederik, germánske dvojčlenné meno spájajúce slovo pre mier so slovom pre vládcu. Oba prvky patria k najproduktívnejším v germánskom pomenúvaní osôb.',
                },
                provenance: ['germanic-onomastics'],
            },
        ],
        meaning: { literal: { en: 'peaceful ruler', sk: 'mierumilovná vládkyňa' } },
        culturalSpread: [
            { id: 'frederika-german', region: { en: 'German-speaking Europe', sk: 'Nemecky hovoriaca Európa' }, forms: ['Friederike'] },
            { id: 'frederika-central-europe', region: { en: 'Slovakia, Czechia, Hungary', sk: 'Slovensko, Česko, Maďarsko' }, forms: ['Frederika', 'Frederika'] },
        ],
        variants: [
            { form: 'Friederike', kind: 'language-form', language: 'german', resolvesToCanonical: true },
            { form: 'Frederica', kind: 'language-form', language: 'italian', resolvesToCanonical: true },
            { form: 'Frída', kind: 'diminutive', language: 'slovak', resolvesToCanonical: false,
                note: { en: 'Shared with other frith- names such as Frída and Frederika alike.', sk: 'Spoločná pre viaceré mená s prvkom frith-, preto sa neprekladá automaticky.' } },
        ],
        relatedNames: [
            { canonicalKey: 'frederik', relation: 'masculine-form' },
        ],
        confidence: 'well-attested',
        notes: [],
        provenance: ['germanic-onomastics', 'sk-civil-calendar'],
    },
    {
        canonicalKey: 'alana',
        canonicalName: 'Alana',
        gender: 'feminine',
        /* Alan's own origin is contested, so its feminine inherits the dispute
           rather than quietly resolving it. */
        origins: [
            {
                id: 'alana-breton-celtic',
                sourceLanguage: 'proto-celtic',
                culture: { en: 'Breton / Celtic', sk: 'Bretónska / keltská' },
                derivation: [
                    { form: 'alun', language: 'welsh', gloss: { en: 'harmony, or a river name', sk: 'súlad, alebo názov rieky' } },
                    { form: 'Alan', language: 'french', gloss: { en: 'Breton name carried into Norman French', sk: 'bretónske meno prenesené do normanskej francúzštiny' } },
                    { form: 'Alana', language: 'english', gloss: { en: 'feminine form', sk: 'ženská podoba' } },
                ],
                gloss: { en: 'uncertain: harmony, or a Breton river name', sk: 'neisté: súlad, alebo bretónsky názov rieky' },
                confidence: 'disputed',
                epistemicClass: 'disputed-origin',
                summary: {
                    en: 'On one reading Alan is a Breton name of Celtic material, brought to Britain by Breton followers of William the Conqueror. What the Celtic element meant is not agreed, and glosses such as handsome or harmony are proposals rather than findings.',
                    sk: 'Podľa jedného výkladu je Alan bretónske meno keltského pôvodu, ktoré do Británie priniesli bretónski sprievodcovia Viliama Dobyvateľa. Význam keltského prvku nie je zhodne určený a výklady ako pekný či súlad sú návrhy, nie zistenia.',
                },
                provenance: ['contested-etymology'],
            },
            {
                id: 'alana-alani-ethnonym',
                sourceLanguage: 'unknown',
                culture: { en: 'Late antique / migration period', sk: 'Neskoroantická / sťahovanie národov' },
                region: { en: 'Brittany', sk: 'Bretónsko' },
                derivation: [
                    { form: 'Alani', language: 'latin', gloss: { en: 'the Alans, an Iranian steppe people settled in Gaul', sk: 'Alani, iránsky stepný národ usadený v Galii' } },
                    { form: 'Alanus', language: 'latin', gloss: { en: 'an Alan, a man of that people', sk: 'Alan, muž z tohto národa' } },
                ],
                gloss: { en: 'of the Alans', sk: 'z národa Alanov' },
                confidence: 'disputed',
                epistemicClass: 'disputed-origin',
                summary: {
                    en: 'A competing account derives the name from the ethnonym of the Alans, groups of whom settled in Gaul and Brittany in late antiquity. The historical route is real; whether the personal name comes from it is not settled.',
                    sk: 'Konkurenčný výklad odvodzuje meno od pomenovania Alanov, ktorých skupiny sa v neskorej antike usadili v Galii a Bretónsku. Historická cesta je doložená; či z nej pochádza osobné meno, doriešené nie je.',
                },
                provenance: ['contested-etymology'],
            },
        ],
        meaning: { literal: null },
        culturalSpread: [
            { id: 'alana-anglophone', region: { en: 'Britain, Ireland, North America', sk: 'Británia, Írsko, Severná Amerika' }, forms: ['Alana', 'Alannah'] },
            { id: 'alana-central-europe', region: { en: 'Slovakia, Czechia', sk: 'Slovensko, Česko' }, forms: ['Alana'] },
        ],
        variants: [
            { form: 'Alannah', kind: 'spelling', language: 'english', resolvesToCanonical: true },
            { form: 'Alaine', kind: 'language-form', language: 'french', resolvesToCanonical: true },
        ],
        relatedNames: [
            { canonicalKey: 'alan', relation: 'masculine-form' },
        ],
        confidence: 'disputed',
        notes: [
            {
                id: 'alana-no-agreed-meaning',
                kind: 'linguistic',
                text: {
                    en: 'No agreed literal meaning is recorded here, because the base name Alan has none. Glosses widely printed for it are guesses at a Celtic element, not attested translations.',
                    sk: 'Doslovný význam sa tu neuvádza, pretože ho nemá ani základné meno Alan. Významy, ktoré sa preň bežne tlačia, sú dohady o keltskom prvku, nie doložené preklady.',
                },
            },
        ],
        provenance: ['contested-etymology', 'sk-civil-calendar'],
    },
    {
        canonicalKey: 'petrana',
        canonicalName: 'Petrana',
        gender: 'feminine',
        origins: [
            {
                id: 'petrana-greek-petros',
                sourceLanguage: 'ancient-greek',
                culture: { en: 'Greek / Christian', sk: 'Grécka / kresťanská' },
                derivation: [
                    { form: 'πέτρα', language: 'ancient-greek', gloss: { en: 'rock, stone', sk: 'skala, kameň' } },
                    { form: 'Πέτρος', language: 'ancient-greek', gloss: { en: 'Peter, the name given to the apostle Simon', sk: 'Peter, meno dané apoštolovi Šimonovi' } },
                    { form: 'Petrana', language: 'slavic', gloss: { en: 'Slavic feminine derivative of Petar', sk: 'slovanské ženské odvodenie z mena Petar' } },
                ],
                gloss: { en: 'rock, stone', sk: 'skala, kameň' },
                confidence: 'probable',
                epistemicClass: 'etymological-fact',
                summary: {
                    en: 'A Slavic feminine derivative of Peter, whose Greek base means rock and was itself a translation of the Aramaic epithet given to the apostle Simon. Petrana is a South Slavic formation that the Slovak calendar took over alongside Petra.',
                    sk: 'Slovanské ženské odvodenie z mena Peter, ktorého grécky základ znamená skala a sám bol prekladom aramejského prívlastku daného apoštolovi Šimonovi. Petrana je juhoslovanské utvorenie, ktoré slovenský kalendár prevzal popri mene Petra.',
                },
                provenance: ['biblical-onomastics', 'slavic-onomastics'],
            },
        ],
        meaning: { literal: { en: 'rock, stone', sk: 'skala, kameň' } },
        culturalSpread: [
            { id: 'petrana-south-slavic', region: { en: 'Bulgaria, Serbia', sk: 'Bulharsko, Srbsko' }, forms: ['Петрана', 'Petrana'] },
            { id: 'petrana-slovakia', region: { en: 'Slovakia', sk: 'Slovensko' }, forms: ['Petrana'] },
        ],
        variants: [
            { form: 'Петрана', kind: 'transliteration', language: 'bulgarian', resolvesToCanonical: true },
        ],
        relatedNames: [
            { canonicalKey: 'peter', relation: 'feminine-form' },
            { canonicalKey: 'petra', relation: 'shares-root' },
            { canonicalKey: 'petronela', relation: 'shares-root',
                note: { en: 'Linked by later association only; Petronela is not built on Petros.', sk: 'Spojené len neskoršou asociáciou; Petronela nie je utvorená z mena Petros.' } },
        ],
        confidence: 'probable',
        notes: [],
        provenance: ['biblical-onomastics', 'slavic-onomastics', 'sk-civil-calendar'],
    },
    {
        canonicalKey: 'valeria',
        canonicalName: 'Valéria',
        gender: 'feminine',
        origins: [
            {
                id: 'valeria-latin-gens',
                sourceLanguage: 'latin',
                culture: { en: 'Roman', sk: 'Rímska' },
                derivation: [
                    { form: 'valere', language: 'latin', gloss: { en: 'to be strong, to be in good health', sk: 'byť silný, byť zdravý' } },
                    { form: 'Valerius', language: 'latin', gloss: { en: 'a Roman family name', sk: 'rímske rodové meno' } },
                    { form: 'Valeria', language: 'latin', gloss: { en: 'feminine of the family name', sk: 'ženská podoba rodového mena' } },
                ],
                gloss: { en: 'strong, healthy', sk: 'silná, zdravá' },
                confidence: 'well-attested',
                epistemicClass: 'etymological-fact',
                summary: {
                    en: 'The feminine of the old Roman family name Valerius, transparently built on the verb valere, to be strong or in good health. It passed into Christian use through early martyrs of the name.',
                    sk: 'Ženská podoba starého rímskeho rodového mena Valerius, priehľadne utvoreného zo slovesa valere, byť silný či zdravý. Do kresťanského používania prešla cez ranokresťanských mučeníkov tohto mena.',
                },
                provenance: ['classical-onomastics'],
            },
        ],
        meaning: { literal: { en: 'strong, healthy', sk: 'silná, zdravá' } },
        culturalSpread: [
            { id: 'valeria-central-europe', region: { en: 'Slovakia, Hungary, Czechia', sk: 'Slovensko, Maďarsko, Česko' }, forms: ['Valéria'] },
            { id: 'valeria-romance', region: { en: 'Italy, Spain', sk: 'Taliansko, Španielsko' }, forms: ['Valeria'] },
        ],
        variants: [
            { form: 'Valeria', kind: 'spelling', language: 'italian', resolvesToCanonical: true },
            { form: 'Valérie', kind: 'language-form', language: 'french', resolvesToCanonical: true },
        ],
        relatedNames: [
            { canonicalKey: 'valer', relation: 'masculine-form' },
            { canonicalKey: 'valentin', relation: 'shares-root',
                note: { en: 'Both go back to Latin valere, by separate derivations.', sk: 'Obe siahajú k latinskému valere, no rôznymi odvodeniami.' } },
        ],
        confidence: 'well-attested',
        notes: [],
        provenance: ['classical-onomastics', 'sk-civil-calendar'],
    },
    {
        canonicalKey: 'adriana',
        canonicalName: 'Adriána',
        gender: 'feminine',
        origins: [
            {
                id: 'adriana-latin-toponym',
                sourceLanguage: 'latin',
                culture: { en: 'Roman', sk: 'Rímska' },
                derivation: [
                    { form: 'Hadria', language: 'latin', gloss: { en: 'a town in northern Italy that gave the Adriatic its name', sk: 'mesto v severnom Taliansku, podľa ktorého sa volá Jadran' } },
                    { form: 'Hadrianus', language: 'latin', gloss: { en: 'from Hadria', sk: 'z mesta Hadria' } },
                    { form: 'Adriana', language: 'latin', gloss: { en: 'feminine form', sk: 'ženská podoba' } },
                ],
                gloss: { en: 'from Hadria', sk: 'z mesta Hadria' },
                confidence: 'well-attested',
                epistemicClass: 'etymological-fact',
                summary: {
                    en: 'The feminine of Hadrianus, a Latin adjective of origin meaning simply from the town of Hadria. The town also gave its name to the Adriatic Sea, which is why the name is often loosely glossed as of the Adriatic.',
                    sk: 'Ženská podoba mena Hadrianus, latinského prídavného mena pôvodu s významom jednoducho z mesta Hadria. Podľa toho istého mesta sa volá aj Jadranské more, preto sa meno voľne vykladá ako jadranská.',
                },
                provenance: ['classical-onomastics'],
            },
        ],
        meaning: { literal: { en: 'from Hadria', sk: 'z mesta Hadria' } },
        culturalSpread: [
            { id: 'adriana-central-europe', region: { en: 'Slovakia, Czechia', sk: 'Slovensko, Česko' }, forms: ['Adriána'] },
            { id: 'adriana-romance', region: { en: 'Italy, Spain, Romania', sk: 'Taliansko, Španielsko, Rumunsko' }, forms: ['Adriana'] },
        ],
        variants: [
            { form: 'Adriana', kind: 'spelling', language: 'italian', resolvesToCanonical: true },
            { form: 'Adrienne', kind: 'language-form', language: 'french', resolvesToCanonical: true },
        ],
        relatedNames: [
            { canonicalKey: 'adrian', relation: 'masculine-form' },
        ],
        confidence: 'well-attested',
        notes: [],
        provenance: ['classical-onomastics', 'sk-civil-calendar'],
    },
    {
        canonicalKey: 'andrea',
        canonicalName: 'Andrea',
        gender: 'feminine',
        origins: [
            {
                id: 'andrea-greek-andros',
                sourceLanguage: 'ancient-greek',
                culture: { en: 'Greek / Christian', sk: 'Grécka / kresťanská' },
                derivation: [
                    { form: 'ἀνήρ, ἀνδρός', language: 'ancient-greek', gloss: { en: 'man, in the sense of adult male', sk: 'muž, v zmysle dospelý muž' } },
                    { form: 'ἀνδρεῖος', language: 'ancient-greek', gloss: { en: 'manly, brave', sk: 'mužný, statočný' } },
                    { form: 'Ἀνδρέας', language: 'ancient-greek', gloss: { en: 'Andrew, name of the apostle', sk: 'Ondrej, meno apoštola' } },
                    { form: 'Andrea', language: 'latin', gloss: { en: 'feminine form in Central and Western Europe', sk: 'ženská podoba v strednej a západnej Európe' } },
                ],
                gloss: { en: 'manly, brave', sk: 'mužný, statočný' },
                confidence: 'well-attested',
                epistemicClass: 'etymological-fact',
                summary: {
                    en: 'Built on the Greek word for man and the adjective meaning manly or brave, by way of the apostle name Andreas. In Italian, Andrea remains a masculine name; in Slovak, German and Hungarian usage it settled as feminine.',
                    sk: 'Utvorené z gréckeho slova pre muža a prídavného mena s významom mužný či statočný, cez meno apoštola Andreas. V taliančine ostáva Andrea mužským menom; v slovenskom, nemeckom a maďarskom prostredí sa ustálilo ako ženské.',
                },
                provenance: ['classical-onomastics', 'biblical-onomastics'],
            },
        ],
        meaning: { literal: { en: 'manly, brave', sk: 'mužný, statočný' } },
        culturalSpread: [
            { id: 'andrea-central-europe', region: { en: 'Slovakia, Czechia, Hungary, Germany', sk: 'Slovensko, Česko, Maďarsko, Nemecko' }, forms: ['Andrea'] },
            { id: 'andrea-italy', region: { en: 'Italy', sk: 'Taliansko' }, forms: ['Andrea'], note: { en: 'Masculine in Italy - the same form, the opposite gender.', sk: 'V Taliansku mužské - tá istá podoba, opačný rod.' } },
        ],
        variants: [
            { form: 'Andrejka', kind: 'diminutive', language: 'slovak', resolvesToCanonical: true },
            { form: 'Andreja', kind: 'language-form', language: 'serbo-croatian', resolvesToCanonical: true },
        ],
        relatedNames: [
            { canonicalKey: 'ondrej', relation: 'masculine-form',
                note: { en: 'Ondrej is the Slovak form of the same apostle name.', sk: 'Ondrej je slovenská podoba toho istého apoštolského mena.' } },
        ],
        confidence: 'well-attested',
        notes: [
            {
                id: 'andrea-gender-varies',
                kind: 'usage',
                text: {
                    en: 'Andrea is feminine in Slovak, German and Hungarian and masculine in Italian. The etymology is identical; only the customary gender differs.',
                    sk: 'Andrea je v slovenčine, nemčine a maďarčine ženské meno, v taliančine mužské. Pôvod je totožný, líši sa len zvykový rod.',
                },
            },
        ],
        provenance: ['classical-onomastics', 'biblical-onomastics', 'sk-civil-calendar'],
    },
    {
        canonicalKey: 'antonia',
        canonicalName: 'Antónia',
        gender: 'feminine',
        origins: [
            {
                id: 'antonia-roman-gens',
                sourceLanguage: 'latin',
                culture: { en: 'Roman', sk: 'Rímska' },
                derivation: [
                    { form: 'Antonius', language: 'latin', gloss: { en: 'an old Roman family name', sk: 'staré rímske rodové meno' } },
                    { form: 'Antonia', language: 'latin', gloss: { en: 'feminine of the family name', sk: 'ženská podoba rodového mena' } },
                ],
                gloss: { en: 'of the gens Antonia', sk: 'z rodu Antoniov' },
                confidence: 'well-attested',
                epistemicClass: 'etymological-fact',
                summary: {
                    en: 'The feminine of the Roman family name Antonius, which is well attested from the Republic onwards. What the family name itself meant is not known - it is generally taken to be of Etruscan rather than Latin material, and therefore has no recoverable literal sense.',
                    sk: 'Ženská podoba rímskeho rodového mena Antonius, ktoré je dobre doložené od čias republiky. Význam samotného rodového mena známy nie je - pokladá sa skôr za etruský než latinský základ, a preto nemá zistiteľný doslovný zmysel.',
                },
                provenance: ['classical-onomastics'],
            },
        ],
        meaning: { literal: null, traditional: { en: 'of the Antonius family', sk: 'z rodu Antoniov' } },
        culturalSpread: [
            { id: 'antonia-central-europe', region: { en: 'Slovakia, Czechia, Hungary', sk: 'Slovensko, Česko, Maďarsko' }, forms: ['Antónia'] },
            { id: 'antonia-romance', region: { en: 'Italy, Spain, Portugal', sk: 'Taliansko, Španielsko, Portugalsko' }, forms: ['Antonia', 'Antónia'] },
        ],
        variants: [
            { form: 'Antoinette', kind: 'language-form', language: 'french', resolvesToCanonical: false,
                note: { en: 'A French diminutive that became an independent name.', sk: 'Francúzska zdrobnenina, ktorá sa osamostatnila.' } },
            { form: 'Tonka', kind: 'diminutive', language: 'slovak', resolvesToCanonical: true },
        ],
        relatedNames: [
            { canonicalKey: 'anton', relation: 'masculine-form' },
        ],
        confidence: 'well-attested',
        notes: [
            {
                id: 'antonia-priceless-folk-etymology',
                kind: 'folk-etymology',
                text: {
                    en: 'The widely printed gloss "priceless" or "flower" comes from later attempts to read the name through Latin inaestimabilis or Greek anthos. Neither is the source of the Roman family name and neither should be treated as its meaning.',
                    sk: 'Bežne tlačený výklad „nesmierne cenná“ alebo „kvet“ pochádza z neskorších pokusov vyložiť meno cez latinské inaestimabilis alebo grécke anthos. Ani jedno nie je zdrojom rímskeho rodového mena a ani jedno nemožno pokladať za jeho význam.',
                },
            },
        ],
        provenance: ['classical-onomastics', 'sk-civil-calendar'],
    },
    {
        canonicalKey: 'frantiska',
        canonicalName: 'Františka',
        gender: 'feminine',
        origins: [
            {
                id: 'frantiska-italian-francesco',
                sourceLanguage: 'italian',
                culture: { en: 'Italian / Latin Christian', sk: 'Talianska / latinská kresťanská' },
                derivation: [
                    { form: 'Franci', language: 'latin', gloss: { en: 'the Franks', sk: 'Frankovia' } },
                    { form: 'Franciscus', language: 'latin', gloss: { en: 'Frankish, French', sk: 'franský, francúzsky' } },
                    { form: 'Francesca', language: 'italian', gloss: { en: 'the French woman', sk: 'Francúzka' } },
                    { form: 'Františka', language: 'slovak', gloss: { en: 'Slovak feminine form', sk: 'slovenská ženská podoba' } },
                ],
                gloss: { en: 'French, of the Franks', sk: 'francúzska, z Frankov' },
                confidence: 'well-attested',
                epistemicClass: 'etymological-fact',
                summary: {
                    en: 'The feminine counterpart of František, from the Italian nickname Francesco meaning the Frenchman, famously applied to Francis of Assisi. The Slovak form came through the Latin Francisca of the church calendar.',
                    sk: 'Ženský náprotivok mena František, z talianskej prezývky Francesco s významom Francúz, ktorou preslávil Františka z Assisi. Slovenská podoba prišla cez latinské Francisca z cirkevného kalendára.',
                },
                provenance: ['classical-onomastics', 'onomastic-consensus'],
            },
        ],
        meaning: { literal: { en: 'the French woman', sk: 'Francúzka' } },
        culturalSpread: [
            { id: 'frantiska-west-slavic', region: { en: 'Slovakia, Czechia', sk: 'Slovensko, Česko' }, forms: ['Františka'] },
            { id: 'frantiska-romance', region: { en: 'Italy, Spain, France', sk: 'Taliansko, Španielsko, Francúzsko' }, forms: ['Francesca', 'Francisca', 'Françoise'] },
        ],
        variants: [
            { form: 'Francesca', kind: 'language-form', language: 'italian', resolvesToCanonical: true },
            { form: 'Françoise', kind: 'language-form', language: 'french', resolvesToCanonical: true },
            { form: 'Fanka', kind: 'diminutive', language: 'slovak', resolvesToCanonical: true },
        ],
        relatedNames: [
            { canonicalKey: 'frantisek', relation: 'masculine-form' },
        ],
        confidence: 'well-attested',
        notes: [],
        provenance: ['classical-onomastics', 'sk-civil-calendar'],
    },
    {
        canonicalKey: 'julia',
        canonicalName: 'Júlia',
        gender: 'feminine',
        origins: [
            {
                id: 'julia-roman-gens',
                sourceLanguage: 'latin',
                culture: { en: 'Roman', sk: 'Rímska' },
                derivation: [
                    { form: 'Iulius', language: 'latin', gloss: { en: 'one of the oldest Roman family names', sk: 'jedno z najstarších rímskych rodových mien' } },
                    { form: 'Iulia', language: 'latin', gloss: { en: 'a woman of the Julian family', sk: 'žena z júlovského rodu' } },
                ],
                gloss: { en: 'of the gens Iulia', sk: 'z rodu Iuliov' },
                confidence: 'well-attested',
                epistemicClass: 'etymological-fact',
                summary: {
                    en: 'The feminine of the Roman family name Iulius, borne by the family of Julius Caesar and carried across Europe by early Christian martyrs. The descent from the family name is certain; the family name\'s own meaning is not, and the connection sometimes drawn to Iulus or to Jupiter is a proposal rather than a finding.',
                    sk: 'Ženská podoba rímskeho rodového mena Iulius, ktoré nosil rod Julia Caesara a ktoré po Európe rozniesli ranokresťanskí mučeníci. Odvodenie z rodového mena je isté; význam samotného rodového mena nie, a spájanie s Iulom či s Jupiterom je len návrh, nie zistenie.',
                },
                provenance: ['classical-onomastics'],
            },
        ],
        meaning: { literal: null, traditional: { en: 'of the Julian family', sk: 'z júlovského rodu' } },
        culturalSpread: [
            { id: 'julia-central-europe', region: { en: 'Slovakia, Hungary, Poland', sk: 'Slovensko, Maďarsko, Poľsko' }, forms: ['Júlia', 'Julia'] },
            { id: 'julia-romance', region: { en: 'Italy, Spain, France', sk: 'Taliansko, Španielsko, Francúzsko' }, forms: ['Giulia', 'Julia', 'Julie'] },
        ],
        variants: [
            { form: 'Giulia', kind: 'language-form', language: 'italian', resolvesToCanonical: true },
            { form: 'Julie', kind: 'language-form', language: 'french', resolvesToCanonical: true },
            { form: 'Юлия', kind: 'transliteration', language: 'russian', resolvesToCanonical: true },
        ],
        relatedNames: [
            { canonicalKey: 'julius', relation: 'feminine-form' },
            { canonicalKey: 'juliana', relation: 'shares-root' },
        ],
        confidence: 'well-attested',
        notes: [
            {
                id: 'julia-youthful-folk-etymology',
                kind: 'folk-etymology',
                text: {
                    en: 'The common gloss "youthful", from Latin iuvenis, is a later reinterpretation and not the source of the family name. It is recorded here so the reading can say so rather than repeat it.',
                    sk: 'Bežný výklad „mladistvá“ z latinského iuvenis je neskorší prevýklad, nie zdroj rodového mena. Uvádza sa tu preto, aby ho čítanie mohlo uviesť na pravú mieru, nie zopakovať.',
                },
            },
        ],
        provenance: ['classical-onomastics', 'sk-civil-calendar'],
    },
    /* ---------------------------------------------------------------------- *
     * Slavic compounds and names that reached Slovak through Slavic usage.
     * ---------------------------------------------------------------------- */
    {
        canonicalKey: 'drahoslav',
        canonicalName: 'Drahoslav',
        gender: 'masculine',
        origins: [
            {
                id: 'drahoslav-slavic-compound',
                sourceLanguage: 'proto-slavic',
                culture: { en: 'Slavic', sk: 'Slovanská' },
                derivation: [
                    { form: 'dorgъ', language: 'proto-slavic', reconstructed: true, gloss: { en: 'dear, precious, costly', sk: 'drahý, vzácny' } },
                    { form: 'slava', language: 'proto-slavic', reconstructed: true, gloss: { en: 'glory, fame', sk: 'sláva' } },
                    { form: 'Drahoslav', language: 'slovak', gloss: { en: 'dear glory', sk: 'drahá sláva' } },
                ],
                gloss: { en: 'precious glory', sk: 'vzácna sláva' },
                confidence: 'well-attested',
                epistemicClass: 'etymological-fact',
                summary: {
                    en: 'A transparent Slavic two-element name joining a root meaning dear or precious to the very common -slav element meaning glory. The West Slavic drah- from Proto-Slavic *dorgъ is the regular Czech and Slovak development.',
                    sk: 'Priehľadné slovanské dvojčlenné meno spájajúce koreň s významom drahý či vzácny s veľmi častým prvkom -slav s významom sláva. Západoslovanské drah- z praslovanského *dorgъ je pravidelný český a slovenský vývin.',
                },
                provenance: ['slavic-onomastics'],
            },
        ],
        meaning: { literal: { en: 'precious glory', sk: 'vzácna sláva' } },
        culturalSpread: [
            { id: 'drahoslav-west-slavic', region: { en: 'Slovakia, Czechia', sk: 'Slovensko, Česko' }, forms: ['Drahoslav'] },
            { id: 'drahoslav-south-slavic', region: { en: 'Serbia, Croatia', sk: 'Srbsko, Chorvátsko' }, forms: ['Dragoslav'] },
        ],
        variants: [
            { form: 'Dragoslav', kind: 'language-form', language: 'serbo-croatian', resolvesToCanonical: true },
            { form: 'Draho', kind: 'diminutive', language: 'slovak', resolvesToCanonical: false },
        ],
        relatedNames: [
            { canonicalKey: 'drahomira', relation: 'shares-root' },
        ],
        confidence: 'well-attested',
        notes: [],
        provenance: ['slavic-onomastics', 'sk-civil-calendar'],
    },
    {
        canonicalKey: 'pravoslav',
        canonicalName: 'Pravoslav',
        gender: 'masculine',
        origins: [
            {
                id: 'pravoslav-slavic-compound',
                sourceLanguage: 'proto-slavic',
                culture: { en: 'Slavic', sk: 'Slovanská' },
                derivation: [
                    { form: 'pravъ', language: 'proto-slavic', reconstructed: true, gloss: { en: 'straight, right, true', sk: 'priamy, správny, pravdivý' } },
                    { form: 'slava', language: 'proto-slavic', reconstructed: true, gloss: { en: 'glory, fame', sk: 'sláva' } },
                    { form: 'Pravoslav', language: 'slovak', gloss: { en: 'right glory, true fame', sk: 'pravá sláva' } },
                ],
                gloss: { en: 'true glory, rightly renowned', sk: 'pravá sláva' },
                confidence: 'well-attested',
                epistemicClass: 'etymological-fact',
                summary: {
                    en: 'A transparent Slavic compound of pravo, right or true, with the -slav element meaning glory. The same pair of elements underlies the church word pravoslávie, Orthodoxy, which is a parallel formation rather than the source of the personal name.',
                    sk: 'Priehľadné slovanské zloženie prvku pravo s významom pravý či správny a prvku -slav s významom sláva. Tie isté prvky sú aj v cirkevnom slove pravoslávie, ktoré je súbežným utvorením, nie zdrojom osobného mena.',
                },
                provenance: ['slavic-onomastics'],
            },
        ],
        meaning: { literal: { en: 'true glory', sk: 'pravá sláva' } },
        culturalSpread: [
            { id: 'pravoslav-west-slavic', region: { en: 'Slovakia, Czechia', sk: 'Slovensko, Česko' }, forms: ['Pravoslav'] },
        ],
        variants: [
            { form: 'Pravoslava', kind: 'spelling', language: 'slovak', resolvesToCanonical: false,
                note: { en: 'The feminine name, kept as its own entry.', sk: 'Ženské meno, vedené ako samostatná položka.' } },
        ],
        relatedNames: [
            { canonicalKey: 'bohuslav', relation: 'shares-root' },
        ],
        confidence: 'well-attested',
        notes: [
            {
                id: 'pravoslav-orthodoxy-confusion',
                kind: 'linguistic',
                text: {
                    en: 'The name is not derived from the word for Orthodoxy. Both are built from the same two Slavic elements independently, and the personal-name type is the older of the two.',
                    sk: 'Meno nie je odvodené zo slova pravoslávie. Obe sú utvorené z tých istých dvoch slovanských prvkov nezávisle a typ osobného mena je z nich starší.',
                },
            },
        ],
        provenance: ['slavic-onomastics', 'sk-civil-calendar'],
    },
    {
        canonicalKey: 'boleslav',
        canonicalName: 'Boleslav',
        gender: 'masculine',
        origins: [
            {
                id: 'boleslav-slavic-compound',
                sourceLanguage: 'proto-slavic',
                culture: { en: 'Slavic', sk: 'Slovanská' },
                derivation: [
                    { form: 'bolьjь', language: 'proto-slavic', reconstructed: true, gloss: { en: 'greater, more', sk: 'väčší, viac' } },
                    { form: 'slava', language: 'proto-slavic', reconstructed: true, gloss: { en: 'glory, fame', sk: 'sláva' } },
                    { form: 'Boleslavъ', language: 'old-church-slavonic', gloss: { en: 'greater glory', sk: 'väčšia sláva' } },
                ],
                gloss: { en: 'greater glory', sk: 'väčšia sláva' },
                confidence: 'well-attested',
                epistemicClass: 'etymological-fact',
                summary: {
                    en: 'A transparent Slavic compound built on a comparative meaning greater or more, joined to the -slav element meaning glory. It is one of the best-documented early Slavic ruler names, borne by Bohemian and Polish princes from the tenth century onwards.',
                    sk: 'Priehľadné slovanské zloženie utvorené z porovnávacieho tvaru s významom väčší či viac a z prvku -slav s významom sláva. Patrí k najlepšie doloženým raným slovanským panovníckym menám, nosili ho českí a poľskí kniežatá od 10. storočia.',
                },
                provenance: ['slavic-onomastics'],
            },
        ],
        meaning: { literal: { en: 'greater glory', sk: 'väčšia sláva' } },
        history: {
            en: 'The name is documented in the Přemyslid and Piast dynasties from the tenth century, notably Boleslav I of Bohemia and Bolesław the Brave of Poland, which is why it survives as a shared West Slavic name rather than a purely local one.',
            sk: 'Meno je doložené v premyslovskej a piastovskej dynastii od 10. storočia, najmä u českého Boleslava I. a poľského Boleslava Chrabrého, preto sa zachovalo ako spoločné západoslovanské meno, nie ako čisto miestne.',
        },
        culturalSpread: [
            { id: 'boleslav-west-slavic', region: { en: 'Czechia, Slovakia', sk: 'Česko, Slovensko' }, forms: ['Boleslav'] },
            { id: 'boleslav-poland', region: { en: 'Poland', sk: 'Poľsko' }, forms: ['Bolesław'] },
        ],
        variants: [
            { form: 'Bolesław', kind: 'language-form', language: 'polish', resolvesToCanonical: true },
            { form: 'Bolo', kind: 'diminutive', language: 'slovak', resolvesToCanonical: false },
        ],
        relatedNames: [
            { canonicalKey: 'bohuslav', relation: 'shares-root' },
            { canonicalKey: 'borislav', relation: 'shares-root' },
        ],
        confidence: 'well-attested',
        notes: [],
        provenance: ['slavic-onomastics', 'sk-civil-calendar'],
    },
    {
        canonicalKey: 'vitazoslav',
        canonicalName: 'Víťazoslav',
        gender: 'masculine',
        origins: [
            {
                id: 'vitazoslav-slovak-compound',
                sourceLanguage: 'slovak',
                culture: { en: 'Slovak national revival', sk: 'Slovenské národné obrodenie' },
                derivation: [
                    { form: 'vitędzь', language: 'proto-slavic', reconstructed: true, gloss: { en: 'hero, victor - an early Slavic borrowing from Germanic', sk: 'hrdina, víťaz - raná slovanská výpožička z germánčiny' } },
                    { form: 'víťaz', language: 'slovak', gloss: { en: 'victor, winner', sk: 'víťaz' } },
                    { form: 'slava', language: 'proto-slavic', reconstructed: true, gloss: { en: 'glory, fame', sk: 'sláva' } },
                    { form: 'Víťazoslav', language: 'slovak', gloss: { en: 'glory of victory', sk: 'sláva víťazstva' } },
                ],
                gloss: { en: 'victorious glory', sk: 'víťazná sláva' },
                confidence: 'probable',
                epistemicClass: 'etymological-fact',
                summary: {
                    en: 'A transparent Slovak compound of víťaz, victor, with the -slav element meaning glory, formed on the old Slavic compound pattern during the nineteenth-century national revival. The word víťaz is itself an early Slavic borrowing from a Germanic source.',
                    sk: 'Priehľadné slovenské zloženie slova víťaz a prvku -slav s významom sláva, utvorené podľa starého slovanského vzoru počas národného obrodenia v 19. storočí. Samotné slovo víťaz je ranou slovanskou výpožičkou z germánskeho zdroja.',
                },
                provenance: ['slavic-onomastics', 'curated-summary'],
            },
        ],
        meaning: { literal: { en: 'victorious glory', sk: 'víťazná sláva' } },
        culturalSpread: [
            { id: 'vitazoslav-slovakia', region: { en: 'Slovakia', sk: 'Slovensko' }, forms: ['Víťazoslav'] },
        ],
        variants: [
            { form: 'Víťo', kind: 'diminutive', language: 'slovak', resolvesToCanonical: false,
                note: { en: 'Shared with Vít, so it is not resolved automatically.', sk: 'Spoločná s menom Vít, preto sa neprekladá automaticky.' } },
        ],
        relatedNames: [
            { canonicalKey: 'hviezdoslav', relation: 'shares-root',
                note: { en: 'Another revival-era compound built on the same -slav pattern.', sk: 'Ďalšie obrodenecké zloženie utvorené podľa toho istého vzoru s -slav.' } },
        ],
        confidence: 'probable',
        notes: [
            {
                id: 'vitazoslav-modern-formation',
                kind: 'historical',
                text: {
                    en: 'This is a modern formation on an old pattern, not an inherited medieval name. The elements are ancient; the name itself is not attested before the nineteenth century.',
                    sk: 'Ide o novodobé utvorenie podľa starého vzoru, nie o zdedené stredoveké meno. Prvky sú staré, samotné meno však pred 19. storočím doložené nie je.',
                },
            },
        ],
        provenance: ['slavic-onomastics', 'curated-summary', 'sk-civil-calendar'],
    },
    {
        canonicalKey: 'radovan',
        canonicalName: 'Radovan',
        gender: 'masculine',
        origins: [
            {
                id: 'radovan-slavic-rad',
                sourceLanguage: 'proto-slavic',
                culture: { en: 'Slavic', sk: 'Slovanská' },
                derivation: [
                    { form: 'radъ', language: 'proto-slavic', reconstructed: true, gloss: { en: 'glad, willing, joyful', sk: 'rád, ochotný, radostný' } },
                    { form: 'Radovanъ', language: 'old-church-slavonic', gloss: { en: 'formed with the participial suffix -ovanъ', sk: 'utvorené príčastnou príponou -ovanъ' } },
                ],
                gloss: { en: 'gladdened, joyful', sk: 'obradovaný, radostný' },
                confidence: 'well-attested',
                epistemicClass: 'etymological-fact',
                summary: {
                    en: 'Built on the Slavic root rad-, glad or willing, with a participial suffix, so it reads roughly as one who is gladdened. It belongs to the same root family as Radoslav and Radomír but is a suffixed form rather than a two-element compound.',
                    sk: 'Utvorené zo slovanského koreňa rad- s významom rád či ochotný pomocou príčastnej prípony, takže znie asi ako ten, komu je zaradované. Patrí k tej istej koreňovej skupine ako Radoslav a Radomír, ale ide o príponové, nie dvojčlenné meno.',
                },
                provenance: ['slavic-onomastics'],
            },
        ],
        meaning: { literal: { en: 'gladdened, joyful', sk: 'obradovaný, radostný' } },
        culturalSpread: [
            { id: 'radovan-west-slavic', region: { en: 'Slovakia, Czechia', sk: 'Slovensko, Česko' }, forms: ['Radovan'] },
            { id: 'radovan-south-slavic', region: { en: 'Serbia, Croatia, Bulgaria', sk: 'Srbsko, Chorvátsko, Bulharsko' }, forms: ['Радован', 'Radovan'] },
        ],
        variants: [
            { form: 'Радован', kind: 'transliteration', language: 'serbo-croatian', resolvesToCanonical: true },
            { form: 'Rado', kind: 'diminutive', language: 'slovak', resolvesToCanonical: false,
                note: { en: 'Shared with Radoslav and Radomír, so it is not resolved automatically.', sk: 'Spoločná s menami Radoslav a Radomír, preto sa neprekladá automaticky.' } },
        ],
        relatedNames: [
            { canonicalKey: 'radoslav', relation: 'shares-root' },
            { canonicalKey: 'radomir', relation: 'shares-root' },
        ],
        confidence: 'well-attested',
        notes: [],
        provenance: ['slavic-onomastics', 'sk-civil-calendar'],
    },
    {
        canonicalKey: 'bohus',
        canonicalName: 'Bohuš',
        gender: 'masculine',
        origins: [
            {
                id: 'bohus-slavic-hypocorism',
                sourceLanguage: 'proto-slavic',
                culture: { en: 'Slavic', sk: 'Slovanská' },
                derivation: [
                    { form: 'bogъ', language: 'proto-slavic', reconstructed: true, gloss: { en: 'god', sk: 'boh' } },
                    { form: 'Bohuš', language: 'czech', gloss: { en: 'short form with the West Slavic hypocoristic suffix -uš', sk: 'skrátená podoba so západoslovanskou zdrobňujúcou príponou -uš' } },
                ],
                gloss: { en: 'built on the element meaning god', sk: 'utvorené z prvku s významom boh' },
                confidence: 'well-attested',
                epistemicClass: 'etymological-fact',
                summary: {
                    en: 'A West Slavic short form of the Boh- compound names, formed with the hypocoristic suffix -uš and long since used as a name in its own right. That it comes from the element meaning god is certain; which full compound stands behind any given bearer is not recoverable.',
                    sk: 'Západoslovanská skrátená podoba mien s prvkom Boh-, utvorená zdrobňujúcou príponou -uš a dávno používaná ako samostatné meno. Že pochádza z prvku s významom boh, je isté; z ktorého celého zloženého mena vzišlo v konkrétnom prípade, zistiť nemožno.',
                },
                provenance: ['slavic-onomastics'],
            },
        ],
        meaning: { literal: { en: 'of the element meaning god', sk: 'z prvku s významom boh' } },
        culturalSpread: [
            { id: 'bohus-west-slavic', region: { en: 'Slovakia, Czechia', sk: 'Slovensko, Česko' }, forms: ['Bohuš'] },
        ],
        variants: [
            { form: 'Bohuška', kind: 'diminutive', language: 'slovak', resolvesToCanonical: false },
        ],
        relatedNames: [
            { canonicalKey: 'bohuslav', relation: 'derived-from' },
            { canonicalKey: 'bohumil', relation: 'derived-from' },
            { canonicalKey: 'bohumir', relation: 'shares-root' },
        ],
        confidence: 'well-attested',
        notes: [
            {
                id: 'bohus-ambiguous-base',
                kind: 'linguistic',
                text: {
                    en: 'Bohuš can stand for Bohuslav, Bohumil, Bohumír or Bohdan. No single full name can be named as its source, and the record does not pretend otherwise.',
                    sk: 'Bohuš môže zastupovať mená Bohuslav, Bohumil, Bohumír aj Bohdan. Jediné celé meno ako jeho zdroj určiť nemožno a záznam to ani nepredstiera.',
                },
            },
        ],
        provenance: ['slavic-onomastics', 'sk-civil-calendar'],
    },
    {
        canonicalKey: 'danica',
        canonicalName: 'Danica',
        gender: 'feminine',
        origins: [
            {
                id: 'danica-slavic-morning-star',
                sourceLanguage: 'proto-slavic',
                culture: { en: 'South Slavic', sk: 'Juhoslovanská' },
                derivation: [
                    { form: 'dьnь', language: 'proto-slavic', reconstructed: true, gloss: { en: 'day', sk: 'deň' } },
                    { form: 'danica', language: 'serbo-croatian', gloss: { en: 'morning star, the planet Venus at dawn', sk: 'zornička, planéta Venuša na úsvite' } },
                ],
                gloss: { en: 'morning star', sk: 'zornička' },
                confidence: 'well-attested',
                epistemicClass: 'etymological-fact',
                summary: {
                    en: 'A South Slavic vocabulary name: danica is the ordinary word for the morning star, the planet Venus seen before dawn, formed on the root for day. It entered the Slovak calendar from South Slavic usage.',
                    sk: 'Juhoslovanské meno prevzaté zo slovnej zásoby: danica je bežné slovo pre zorničku, planétu Venušu pred svitaním, utvorené z koreňa pre deň. Do slovenského kalendára sa dostalo z juhoslovanského prostredia.',
                },
                provenance: ['slavic-onomastics'],
            },
        ],
        meaning: { literal: { en: 'morning star', sk: 'zornička' } },
        culturalSpread: [
            { id: 'danica-south-slavic', region: { en: 'Serbia, Croatia, Slovenia', sk: 'Srbsko, Chorvátsko, Slovinsko' }, forms: ['Даница', 'Danica'] },
            { id: 'danica-slovakia', region: { en: 'Slovakia', sk: 'Slovensko' }, forms: ['Danica'] },
        ],
        variants: [
            { form: 'Даница', kind: 'transliteration', language: 'serbo-croatian', resolvesToCanonical: true },
        ],
        relatedNames: [
            { canonicalKey: 'zora', relation: 'shares-root',
                note: { en: 'A semantic pair rather than an etymological one: both name the dawn, from different roots.', sk: 'Významová, nie pôvodová dvojica: obe pomenúvajú úsvit, ale z iných koreňov.' } },
        ],
        confidence: 'well-attested',
        notes: [
            {
                id: 'danica-not-from-daniela',
                kind: 'linguistic',
                text: {
                    en: 'Danica is not a form of Daniela, despite the shared first syllable and the shared Slovak name day. The two have unrelated origins.',
                    sk: 'Danica nie je podobou mena Daniela, hoci majú zhodnú prvú slabiku aj spoločné meniny. Ich pôvod spolu nesúvisí.',
                },
            },
        ],
        provenance: ['slavic-onomastics', 'sk-civil-calendar'],
    },
    {
        canonicalKey: 'blazena',
        canonicalName: 'Blažena',
        gender: 'feminine',
        origins: [
            {
                id: 'blazena-slavic-calque',
                sourceLanguage: 'proto-slavic',
                culture: { en: 'West Slavic Christian', sk: 'Západoslovanská kresťanská' },
                derivation: [
                    { form: 'bolgъ', language: 'proto-slavic', reconstructed: true, gloss: { en: 'good, kindly', sk: 'dobrý, láskavý' } },
                    { form: 'blažený', language: 'czech', gloss: { en: 'blissful, blessed', sk: 'blažený' } },
                    { form: 'Blažena', language: 'czech', gloss: { en: 'the blessed one', sk: 'blažená' } },
                ],
                gloss: { en: 'blissful, blessed', sk: 'blažená' },
                confidence: 'well-attested',
                epistemicClass: 'etymological-fact',
                summary: {
                    en: 'A West Slavic vocabulary name from the adjective meaning blissful or blessed, itself from the Proto-Slavic root for good. It functions as the Slavic counterpart of Latin Beata and was spread by the Czech national revival.',
                    sk: 'Západoslovanské meno zo slovnej zásoby, z prídavného mena blažený, ktoré samo pochádza z praslovanského koreňa pre dobro. Slúži ako slovanský náprotivok latinského mena Beata a rozšírilo ho české národné obrodenie.',
                },
                provenance: ['slavic-onomastics'],
            },
        ],
        meaning: { literal: { en: 'blissful, blessed', sk: 'blažená' } },
        culturalSpread: [
            { id: 'blazena-west-slavic', region: { en: 'Slovakia, Czechia', sk: 'Slovensko, Česko' }, forms: ['Blažena'] },
        ],
        variants: [
            { form: 'Blaženka', kind: 'diminutive', language: 'slovak', resolvesToCanonical: true },
        ],
        relatedNames: [
            { canonicalKey: 'beata', relation: 'cognate',
                note: { en: 'Not a cognate by descent but a deliberate Slavic rendering of the same idea.', sk: 'Nie príbuzné pôvodom, ale zámerné slovanské vyjadrenie tej istej myšlienky.' } },
            { canonicalKey: 'blahoslav', relation: 'shares-root' },
        ],
        confidence: 'well-attested',
        notes: [],
        provenance: ['slavic-onomastics', 'sk-civil-calendar'],
    },
    {
        canonicalKey: 'zlatko',
        canonicalName: 'Zlatko',
        gender: 'masculine',
        origins: [
            {
                id: 'zlatko-slavic-gold',
                sourceLanguage: 'proto-slavic',
                culture: { en: 'Slavic', sk: 'Slovanská' },
                derivation: [
                    { form: 'zolto', language: 'proto-slavic', reconstructed: true, gloss: { en: 'gold', sk: 'zlato' } },
                    { form: 'zlatý', language: 'slovak', gloss: { en: 'golden', sk: 'zlatý' } },
                    { form: 'Zlatko', language: 'slavic', gloss: { en: 'formed with the diminutive suffix -ko', sk: 'utvorené zdrobňujúcou príponou -ko' } },
                ],
                gloss: { en: 'golden', sk: 'zlatý' },
                confidence: 'well-attested',
                epistemicClass: 'etymological-fact',
                summary: {
                    en: 'A Slavic name from the word for gold with a diminutive suffix, used across South and West Slavic areas. It is the masculine counterpart of the same root that gives Zlatica and Zlata.',
                    sk: 'Slovanské meno zo slova zlato so zdrobňujúcou príponou, používané v juhoslovanskom aj západoslovanskom prostredí. Je mužským náprotivkom toho istého koreňa, z ktorého sú mená Zlatica a Zlata.',
                },
                provenance: ['slavic-onomastics'],
            },
        ],
        meaning: { literal: { en: 'golden', sk: 'zlatý' } },
        culturalSpread: [
            { id: 'zlatko-south-slavic', region: { en: 'Croatia, Serbia, Bulgaria', sk: 'Chorvátsko, Srbsko, Bulharsko' }, forms: ['Zlatko', 'Златко'] },
            { id: 'zlatko-slovakia', region: { en: 'Slovakia', sk: 'Slovensko' }, forms: ['Zlatko'] },
        ],
        variants: [
            { form: 'Златко', kind: 'transliteration', language: 'bulgarian', resolvesToCanonical: true },
            { form: 'Zlatan', kind: 'language-form', language: 'serbo-croatian', resolvesToCanonical: false,
                note: { en: 'A separate formation on the same root.', sk: 'Samostatné utvorenie z toho istého koreňa.' } },
        ],
        relatedNames: [
            { canonicalKey: 'zlatica', relation: 'feminine-form' },
        ],
        confidence: 'well-attested',
        notes: [],
        provenance: ['slavic-onomastics', 'sk-civil-calendar'],
    },
    {
        canonicalKey: 'igor',
        canonicalName: 'Igor',
        gender: 'masculine',
        origins: [
            {
                id: 'igor-norse-ingvarr',
                sourceLanguage: 'old-norse',
                culture: { en: 'Varangian / East Slavic', sk: 'Varjažská / východoslovanská' },
                derivation: [
                    { form: 'Yngvi', language: 'old-norse', gloss: { en: 'a name of the god Freyr', sk: 'jedno z mien boha Freya' } },
                    { form: 'varr', language: 'old-norse', gloss: { en: 'guarded, protected, watchful', sk: 'strážený, chránený, ostražitý' } },
                    { form: 'Ingvarr', language: 'old-norse', gloss: { en: 'guarded by Yngvi', sk: 'chránený Yngvim' } },
                    { form: 'Igorь', language: 'old-church-slavonic', gloss: { en: 'the East Slavic adaptation', sk: 'východoslovanské prispôsobenie' } },
                ],
                gloss: { en: 'guarded by Yngvi', sk: 'chránený Yngvim' },
                confidence: 'well-attested',
                epistemicClass: 'etymological-fact',
                summary: {
                    en: 'A Norse name carried into Kievan Rus by the Varangians and adapted as Igorь, borne by a tenth-century prince of Kiev. The Norse compound joins the divine name Yngvi to an element meaning guarded.',
                    sk: 'Severské meno, ktoré do Kyjevskej Rusi priniesli Varjagovia a ktoré sa prispôsobilo na Igorь; nosil ho kyjevský knieža z 10. storočia. Severské zloženie spája božské meno Yngvi s prvkom s významom chránený.',
                },
                provenance: ['germanic-onomastics', 'onomastic-consensus'],
            },
        ],
        meaning: { literal: { en: 'guarded by Yngvi', sk: 'chránený Yngvim' } },
        history: {
            en: 'The name belongs to the earliest layer of Norse names absorbed by East Slavic ruling houses, alongside Oleg and Olga, and spread west through Russian literary and Orthodox usage rather than through a Slovak saint.',
            sk: 'Meno patrí k najstaršej vrstve severských mien, ktoré prevzali východoslovanské panovnícke rody, spolu s menami Oleg a Oľga, a na západ sa rozšírilo cez ruské literárne a pravoslávne prostredie, nie cez miestneho svätca.',
        },
        culturalSpread: [
            { id: 'igor-east-slavic', region: { en: 'Russia, Ukraine, Belarus', sk: 'Rusko, Ukrajina, Bielorusko' }, forms: ['Игорь', 'Igor'] },
            { id: 'igor-central-europe', region: { en: 'Slovakia, Czechia, Poland', sk: 'Slovensko, Česko, Poľsko' }, forms: ['Igor'] },
        ],
        variants: [
            { form: 'Игорь', kind: 'transliteration', language: 'russian', resolvesToCanonical: true },
        ],
        relatedNames: [
            { canonicalKey: 'ingrid', relation: 'shares-root',
                note: { en: 'Shares the divine element Yngvi, not the second element.', sk: 'Zhoduje sa v božskom prvku Yngvi, nie v druhom prvku.' } },
        ],
        confidence: 'well-attested',
        notes: [],
        provenance: ['germanic-onomastics', 'onomastic-consensus', 'sk-civil-calendar'],
    },
    {
        canonicalKey: 'fedor',
        canonicalName: 'Fedor',
        gender: 'masculine',
        origins: [
            {
                id: 'fedor-greek-theodoros',
                sourceLanguage: 'ancient-greek',
                culture: { en: 'Greek / Slavic Orthodox', sk: 'Grécka / slovanská pravoslávna' },
                derivation: [
                    { form: 'θεός', language: 'ancient-greek', gloss: { en: 'god', sk: 'boh' } },
                    { form: 'δῶρον', language: 'ancient-greek', gloss: { en: 'gift', sk: 'dar' } },
                    { form: 'Θεόδωρος', language: 'ancient-greek', gloss: { en: 'gift of God', sk: 'dar Boží' } },
                    { form: 'Fedorъ', language: 'old-church-slavonic', gloss: { en: 'the East Slavic form, with f- for the Greek theta', sk: 'východoslovanská podoba s f- namiesto gréckej théty' } },
                ],
                gloss: { en: 'gift of God', sk: 'dar Boží' },
                confidence: 'well-attested',
                epistemicClass: 'etymological-fact',
                summary: {
                    en: 'The East Slavic form of Greek Theodoros, a transparent compound of the words for god and gift. The f- reflects the regular Slavic treatment of Greek theta in names taken through Byzantine church usage.',
                    sk: 'Východoslovanská podoba gréckeho mena Theodoros, priehľadného zloženia slov boh a dar. Hláska f- odráža pravidelné slovanské spracovanie gréckej théty v menách prevzatých cez byzantskú cirkev.',
                },
                provenance: ['classical-onomastics', 'onomastic-consensus'],
            },
        ],
        meaning: { literal: { en: 'gift of God', sk: 'dar Boží' } },
        culturalSpread: [
            { id: 'fedor-east-slavic', region: { en: 'Russia, Ukraine', sk: 'Rusko, Ukrajina' }, forms: ['Фёдор', 'Fedor'] },
            { id: 'fedor-slovakia', region: { en: 'Slovakia', sk: 'Slovensko' }, forms: ['Fedor'] },
        ],
        variants: [
            { form: 'Фёдор', kind: 'transliteration', language: 'russian', resolvesToCanonical: true },
            { form: 'Feodor', kind: 'spelling', resolvesToCanonical: true },
        ],
        relatedNames: [
            { canonicalKey: 'teodor', relation: 'cognate',
                note: { en: 'The Western form of the same Greek name.', sk: 'Západná podoba toho istého gréckeho mena.' } },
        ],
        confidence: 'well-attested',
        notes: [],
        provenance: ['classical-onomastics', 'sk-civil-calendar'],
    },
    {
        canonicalKey: 'galina',
        canonicalName: 'Galina',
        gender: 'feminine',
        origins: [
            {
                id: 'galina-greek-galene',
                sourceLanguage: 'ancient-greek',
                culture: { en: 'Greek / Slavic Orthodox', sk: 'Grécka / slovanská pravoslávna' },
                derivation: [
                    { form: 'γαλήνη', language: 'ancient-greek', gloss: { en: 'calm, stillness, especially of the sea', sk: 'pokoj, tíšina, najmä na mori' } },
                    { form: 'Galina', language: 'russian', gloss: { en: 'the Slavic form of the saint name Galene', sk: 'slovanská podoba svätého mena Galéné' } },
                ],
                gloss: { en: 'calm, stillness', sk: 'pokoj, tíšina' },
                confidence: 'probable',
                epistemicClass: 'etymological-fact',
                summary: {
                    en: 'From the Greek word for calm or stillness, particularly a calm sea, taken into Slavic through the Orthodox calendar. It became widespread in Russian usage and reached Slovak from there.',
                    sk: 'Z gréckeho slova pre pokoj či tíšinu, najmä pre pokojné more, prevzatého do slovanského prostredia cez pravoslávny kalendár. V ruskom prostredí veľmi zdomácnelo a odtiaľ sa dostalo do slovenčiny.',
                },
                provenance: ['classical-onomastics', 'onomastic-consensus'],
            },
        ],
        meaning: { literal: { en: 'calm, stillness', sk: 'pokoj, tíšina' } },
        culturalSpread: [
            { id: 'galina-east-slavic', region: { en: 'Russia, Ukraine, Belarus', sk: 'Rusko, Ukrajina, Bielorusko' }, forms: ['Галина', 'Galina'] },
            { id: 'galina-slovakia', region: { en: 'Slovakia', sk: 'Slovensko' }, forms: ['Galina'] },
        ],
        variants: [
            { form: 'Галина', kind: 'transliteration', language: 'russian', resolvesToCanonical: true },
            { form: 'Halyna', kind: 'language-form', language: 'ukrainian', resolvesToCanonical: true },
        ],
        relatedNames: [],
        confidence: 'probable',
        notes: [],
        provenance: ['classical-onomastics', 'sk-civil-calendar'],
    },
    {
        canonicalKey: 'natasa',
        canonicalName: 'Nataša',
        gender: 'feminine',
        origins: [
            {
                id: 'natasa-latin-natalis',
                sourceLanguage: 'latin',
                culture: { en: 'Latin Christian, by way of Russian', sk: 'Latinská kresťanská, cez ruštinu' },
                derivation: [
                    { form: 'natalis', language: 'latin', gloss: { en: 'of birth; dies natalis, birthday', sk: 'týkajúci sa narodenia; dies natalis, deň narodenia' } },
                    { form: 'Natalia', language: 'latin', gloss: { en: 'a Christian name marking the Nativity', sk: 'kresťanské meno pripomínajúce Narodenie Pána' } },
                    { form: 'Наташа', language: 'russian', gloss: { en: 'Russian hypocoristic of Natalia', sk: 'ruská domácka podoba mena Natalia' } },
                ],
                gloss: { en: 'of the birth, of Christmas', sk: 'narodeninová, vianočná' },
                confidence: 'well-attested',
                epistemicClass: 'etymological-fact',
                summary: {
                    en: 'A Russian short form of Natalia that became an independent name across Central Europe. The base is the Latin adjective natalis, used by early Christians for the birth of Christ, which is why the name is tied to Christmas.',
                    sk: 'Ruská skrátená podoba mena Natalia, ktorá sa v strednej Európe osamostatnila. Základom je latinské prídavné meno natalis, ktoré raní kresťania používali pre narodenie Krista, preto sa meno spája s Vianocami.',
                },
                provenance: ['classical-onomastics', 'onomastic-consensus'],
            },
        ],
        meaning: { literal: { en: 'of the birth', sk: 'týkajúca sa narodenia' }, traditional: { en: 'born at Christmas', sk: 'narodená na Vianoce' } },
        culturalSpread: [
            { id: 'natasa-east-slavic', region: { en: 'Russia, Ukraine', sk: 'Rusko, Ukrajina' }, forms: ['Наташа'] },
            { id: 'natasa-central-europe', region: { en: 'Slovakia, Czechia, Slovenia', sk: 'Slovensko, Česko, Slovinsko' }, forms: ['Nataša'] },
        ],
        variants: [
            { form: 'Наташа', kind: 'transliteration', language: 'russian', resolvesToCanonical: true },
            { form: 'Natasha', kind: 'spelling', language: 'english', resolvesToCanonical: true },
        ],
        relatedNames: [
            { canonicalKey: 'natalia', relation: 'derived-from' },
        ],
        confidence: 'well-attested',
        notes: [],
        provenance: ['classical-onomastics', 'sk-civil-calendar'],
    },
    {
        canonicalKey: 'tamara',
        canonicalName: 'Tamara',
        gender: 'feminine',
        origins: [
            {
                id: 'tamara-hebrew-tamar',
                sourceLanguage: 'hebrew',
                culture: { en: 'Hebrew / biblical, by way of Georgian and Russian', sk: 'Hebrejská / biblická, cez gruzínčinu a ruštinu' },
                derivation: [
                    { form: 'תָּמָר', language: 'hebrew', gloss: { en: 'date palm', sk: 'datľová palma' } },
                    { form: 'Tamar', language: 'hebrew', gloss: { en: 'a biblical woman’s name', sk: 'biblické ženské meno' } },
                    { form: 'Тамара', language: 'russian', gloss: { en: 'the Slavic form, extended with -a', sk: 'slovanská podoba rozšírená o -a' } },
                ],
                gloss: { en: 'date palm', sk: 'datľová palma' },
                confidence: 'well-attested',
                epistemicClass: 'etymological-fact',
                summary: {
                    en: 'From the Hebrew word for the date palm, borne by two women in the Hebrew Bible. It reached Slavic usage through the Georgian queen Tamar and the Orthodox calendar, arriving in Slovak much later as a Russian-mediated name.',
                    sk: 'Z hebrejského slova pre datľovú palmu, ktoré v Hebrejskej Biblii nosia dve ženy. Do slovanského prostredia sa dostalo cez gruzínsku kráľovnú Tamaru a pravoslávny kalendár, do slovenčiny až oveľa neskôr cez ruštinu.',
                },
                provenance: ['biblical-onomastics'],
            },
        ],
        meaning: { literal: { en: 'date palm', sk: 'datľová palma' } },
        culturalSpread: [
            { id: 'tamara-caucasus', region: { en: 'Georgia', sk: 'Gruzínsko' }, forms: ['Tamar'] },
            { id: 'tamara-east-slavic', region: { en: 'Russia, Ukraine', sk: 'Rusko, Ukrajina' }, forms: ['Тамара'] },
            { id: 'tamara-central-europe', region: { en: 'Slovakia, Czechia', sk: 'Slovensko, Česko' }, forms: ['Tamara'] },
        ],
        variants: [
            { form: 'Тамара', kind: 'transliteration', language: 'russian', resolvesToCanonical: true },
            { form: 'Tamar', kind: 'language-form', language: 'hebrew', resolvesToCanonical: true },
        ],
        relatedNames: [],
        confidence: 'well-attested',
        notes: [],
        provenance: ['biblical-onomastics', 'sk-civil-calendar'],
    },
    {
        canonicalKey: 'xenia',
        canonicalName: 'Xénia',
        gender: 'feminine',
        origins: [
            {
                id: 'xenia-greek-xenos',
                sourceLanguage: 'ancient-greek',
                culture: { en: 'Greek / Orthodox', sk: 'Grécka / pravoslávna' },
                derivation: [
                    { form: 'ξένος', language: 'ancient-greek', gloss: { en: 'stranger, guest, foreigner', sk: 'cudzinec, hosť' } },
                    { form: 'ξενία', language: 'ancient-greek', gloss: { en: 'hospitality, guest-friendship', sk: 'pohostinnosť, priateľstvo k hosťom' } },
                    { form: 'Ξενία', language: 'ancient-greek', gloss: { en: 'used as a personal name', sk: 'používané ako osobné meno' } },
                ],
                gloss: { en: 'hospitality; the foreign woman', sk: 'pohostinnosť; cudzinka' },
                confidence: 'well-attested',
                epistemicClass: 'etymological-fact',
                summary: {
                    en: 'From the Greek noun for hospitality, itself from the word for a stranger or guest. Both readings - hospitality and the foreign woman - come from the same root, and Greek used the word for the reciprocal bond between host and guest.',
                    sk: 'Z gréckeho podstatného mena pre pohostinnosť, ktoré samo pochádza zo slova pre cudzinca či hosťa. Oba výklady - pohostinnosť aj cudzinka - vychádzajú z toho istého koreňa a gréčtina týmto slovom označovala vzájomné puto medzi hostiteľom a hosťom.',
                },
                provenance: ['classical-onomastics'],
            },
        ],
        meaning: { literal: { en: 'hospitality', sk: 'pohostinnosť' }, traditional: { en: 'the guest, the stranger', sk: 'hosť, cudzinka' } },
        culturalSpread: [
            { id: 'xenia-greek', region: { en: 'Greece', sk: 'Grécko' }, forms: ['Ξένια'] },
            { id: 'xenia-east-slavic', region: { en: 'Russia, Ukraine', sk: 'Rusko, Ukrajina' }, forms: ['Ксения', 'Оксана'] },
            { id: 'xenia-central-europe', region: { en: 'Slovakia, Hungary', sk: 'Slovensko, Maďarsko' }, forms: ['Xénia'] },
        ],
        variants: [
            { form: 'Ksenia', kind: 'transliteration', language: 'russian', resolvesToCanonical: true },
            { form: 'Ксения', kind: 'transliteration', language: 'russian', resolvesToCanonical: true },
        ],
        relatedNames: [
            { canonicalKey: 'oxana', relation: 'shares-root' },
        ],
        confidence: 'well-attested',
        notes: [],
        provenance: ['classical-onomastics', 'sk-civil-calendar'],
    },
    {
        canonicalKey: 'oxana',
        canonicalName: 'Oxana',
        gender: 'feminine',
        origins: [
            {
                id: 'oxana-ukrainian-ksenia',
                sourceLanguage: 'ukrainian',
                culture: { en: 'Ukrainian Orthodox', sk: 'Ukrajinská pravoslávna' },
                derivation: [
                    { form: 'ξενία', language: 'ancient-greek', gloss: { en: 'hospitality', sk: 'pohostinnosť' } },
                    { form: 'Ксенія', language: 'ukrainian', gloss: { en: 'the church form of the name', sk: 'cirkevná podoba mena' } },
                    { form: 'Оксана', language: 'ukrainian', gloss: { en: 'the vernacular Ukrainian development', sk: 'ľudový ukrajinský vývin' } },
                ],
                gloss: { en: 'hospitality', sk: 'pohostinnosť' },
                confidence: 'probable',
                epistemicClass: 'etymological-fact',
                summary: {
                    en: 'The Ukrainian vernacular development of Ksenia, the church form of Greek Xenia, with a prothetic o- of the kind Ukrainian regularly shows. It spread through Ukrainian literature and reached Slovak usage from there.',
                    sk: 'Ukrajinský ľudový vývin mena Ksenia, cirkevnej podoby gréckeho mena Xénia, s protetickým o-, aké ukrajinčina pravidelne vykazuje. Rozšírilo sa cez ukrajinskú literatúru a odtiaľ sa dostalo do slovenčiny.',
                },
                provenance: ['classical-onomastics', 'onomastic-consensus'],
            },
        ],
        meaning: { literal: { en: 'hospitality', sk: 'pohostinnosť' } },
        culturalSpread: [
            { id: 'oxana-ukraine', region: { en: 'Ukraine', sk: 'Ukrajina' }, forms: ['Оксана'] },
            { id: 'oxana-slovakia', region: { en: 'Slovakia', sk: 'Slovensko' }, forms: ['Oxana', 'Oksana'] },
        ],
        variants: [
            { form: 'Oksana', kind: 'spelling', resolvesToCanonical: true },
            { form: 'Оксана', kind: 'transliteration', language: 'ukrainian', resolvesToCanonical: true },
        ],
        relatedNames: [
            { canonicalKey: 'xenia', relation: 'shares-root' },
        ],
        confidence: 'probable',
        notes: [],
        provenance: ['classical-onomastics', 'sk-civil-calendar'],
    },
    {
        canonicalKey: 'sona',
        canonicalName: 'Soňa',
        gender: 'feminine',
        origins: [
            {
                id: 'sona-greek-sophia',
                sourceLanguage: 'ancient-greek',
                culture: { en: 'Greek, by way of Russian', sk: 'Grécka, cez ruštinu' },
                derivation: [
                    { form: 'σοφία', language: 'ancient-greek', gloss: { en: 'wisdom, skill', sk: 'múdrosť, zručnosť' } },
                    { form: 'Σοφία', language: 'ancient-greek', gloss: { en: 'used as a personal name', sk: 'používané ako osobné meno' } },
                    { form: 'Соня', language: 'russian', gloss: { en: 'Russian hypocoristic of Sofia', sk: 'ruská domácka podoba mena Sofia' } },
                ],
                gloss: { en: 'wisdom', sk: 'múdrosť' },
                confidence: 'well-attested',
                epistemicClass: 'etymological-fact',
                summary: {
                    en: 'A Russian short form of Sofia that hardened into an independent name in Czech and Slovak use. The base is the ordinary Greek noun for wisdom, made a Christian name through the personification of Holy Wisdom.',
                    sk: 'Ruská skrátená podoba mena Sofia, ktorá sa v českom a slovenskom prostredí osamostatnila. Základom je bežné grécke podstatné meno pre múdrosť, ktoré sa stalo kresťanským menom cez zosobnenie Božej Múdrosti.',
                },
                provenance: ['classical-onomastics', 'onomastic-consensus'],
            },
        ],
        meaning: { literal: { en: 'wisdom', sk: 'múdrosť' } },
        culturalSpread: [
            { id: 'sona-east-slavic', region: { en: 'Russia', sk: 'Rusko' }, forms: ['Соня'] },
            { id: 'sona-west-slavic', region: { en: 'Slovakia, Czechia', sk: 'Slovensko, Česko' }, forms: ['Soňa'] },
        ],
        variants: [
            { form: 'Соня', kind: 'transliteration', language: 'russian', resolvesToCanonical: true },
            { form: 'Sonja', kind: 'language-form', language: 'german', resolvesToCanonical: true },
        ],
        relatedNames: [
            { canonicalKey: 'sofia', relation: 'derived-from' },
        ],
        confidence: 'well-attested',
        notes: [],
        provenance: ['classical-onomastics', 'sk-civil-calendar'],
    },
    /* ---------------------------------------------------------------------- *
     * Short forms that hardened into names, and names whose base is contested.
     * These carry the batch's lowest confidences on purpose.
     * ---------------------------------------------------------------------- */
    {
        canonicalKey: 'dasa',
        canonicalName: 'Dáša',
        gender: 'feminine',
        origins: [
            {
                id: 'dasa-from-dagmar',
                sourceLanguage: 'czech',
                culture: { en: 'Czech and Slovak', sk: 'Česká a slovenská' },
                derivation: [
                    { form: 'Dagmar', language: 'czech', gloss: { en: 'the fuller name from which the short form is taken', sk: 'plné meno, z ktorého je skrátená podoba' } },
                    { form: 'Dáša', language: 'czech', gloss: { en: 'short form with the hypocoristic suffix -ša', sk: 'skrátená podoba so zdrobňujúcou príponou -ša' } },
                ],
                gloss: { en: 'no meaning of its own; a short form', sk: 'bez vlastného významu; skrátená podoba' },
                confidence: 'disputed',
                epistemicClass: 'disputed-origin',
                summary: {
                    en: 'On one account Dáša is the Czech and Slovak short form of Dagmar, built with the hypocoristic suffix -ša. It carries no meaning of its own on this reading; whatever meaning it is given belongs to the base name.',
                    sk: 'Podľa jedného výkladu je Dáša českou a slovenskou skrátenou podobou mena Dagmar, utvorenou zdrobňujúcou príponou -ša. Vlastný význam pri tomto výklade nemá; prípadný význam patrí základnému menu.',
                },
                provenance: ['onomastic-consensus'],
            },
            {
                id: 'dasa-from-daria',
                sourceLanguage: 'russian',
                culture: { en: 'Russian, by way of Czech usage', sk: 'Ruská, cez české prostredie' },
                derivation: [
                    { form: 'Дарья', language: 'russian', gloss: { en: 'Daria, the Russian church name', sk: 'Daria, ruské cirkevné meno' } },
                    { form: 'Даша', language: 'russian', gloss: { en: 'the Russian hypocoristic', sk: 'ruská domácka podoba' } },
                ],
                gloss: { en: 'no meaning of its own; a short form', sk: 'bez vlastného významu; skrátená podoba' },
                confidence: 'disputed',
                epistemicClass: 'disputed-origin',
                summary: {
                    en: 'A competing account takes Dáša from Russian Daša, the short form of Darya, which entered Czech and Slovak alongside other Russian hypocorisms. Neither account can be preferred on the evidence available.',
                    sk: 'Konkurenčný výklad odvodzuje Dášu z ruskej podoby Daša, skrátenej z mena Darja, ktorá do češtiny a slovenčiny prišla spolu s ďalšími ruskými domáckymi podobami. Ani jeden výklad nemožno na základe dostupných dokladov uprednostniť.',
                },
                provenance: ['contested-etymology'],
            },
        ],
        meaning: { literal: null },
        culturalSpread: [
            { id: 'dasa-west-slavic', region: { en: 'Slovakia, Czechia', sk: 'Slovensko, Česko' }, forms: ['Dáša'] },
        ],
        variants: [
            { form: 'Daša', kind: 'spelling', resolvesToCanonical: true },
        ],
        relatedNames: [
            { canonicalKey: 'dagmar', relation: 'derived-from' },
        ],
        confidence: 'disputed',
        notes: [
            {
                id: 'dasa-no-literal-meaning',
                kind: 'linguistic',
                text: {
                    en: 'No literal meaning is recorded, and that is the finding rather than a gap. A short form whose base name is itself contested cannot be given a meaning without inventing one.',
                    sk: 'Doslovný význam sa neuvádza a nejde o medzeru, ale o zistenie. Skrátenej podobe, ktorej základné meno je sporné, nemožno prisúdiť význam bez toho, aby sa vymyslel.',
                },
            },
        ],
        provenance: ['contested-etymology', 'sk-civil-calendar'],
    },
    {
        canonicalKey: 'ela',
        canonicalName: 'Ela',
        gender: 'feminine',
        origins: [
            {
                id: 'ela-hypocorism',
                sourceLanguage: 'slovak',
                culture: { en: 'Central European', sk: 'Stredoeurópska' },
                derivation: [
                    { form: '-ela', language: 'slovak', gloss: { en: 'the final syllables of names such as Gabriela, Daniela, Eleonóra and Elena', sk: 'záverečné slabiky mien ako Gabriela, Daniela, Eleonóra a Elena' } },
                    { form: 'Ela', language: 'slovak', gloss: { en: 'the extracted short form, later used independently', sk: 'vydelená skrátená podoba, neskôr používaná samostatne' } },
                ],
                gloss: { en: 'no meaning of its own; an extracted short form', sk: 'bez vlastného významu; vydelená skrátená podoba' },
                confidence: 'uncertain',
                epistemicClass: 'disputed-origin',
                summary: {
                    en: 'Ela is a short form extracted from the ending of several unrelated longer names, among them Gabriela, Daniela, Eleonóra and Elena, and later used on its own. Which base stands behind any particular use is not recoverable, so no meaning is assigned.',
                    sk: 'Ela je skrátená podoba vydelená z konca viacerých navzájom nepríbuzných dlhších mien, medzi nimi Gabriela, Daniela, Eleonóra a Elena, neskôr používaná samostatne. Ktoré z nich stojí v konkrétnom prípade za ňou, zistiť nemožno, preto sa význam neuvádza.',
                },
                provenance: ['onomastic-consensus'],
            },
        ],
        meaning: { literal: null },
        culturalSpread: [
            { id: 'ela-central-europe', region: { en: 'Slovakia, Czechia, Poland', sk: 'Slovensko, Česko, Poľsko' }, forms: ['Ela'] },
        ],
        variants: [
            { form: 'Ella', kind: 'spelling', language: 'english', resolvesToCanonical: false,
                note: { en: 'The English Ella has its own Germanic history and is not merged here.', sk: 'Anglické Ella má vlastnú germánsku históriu a nespája sa tu s týmto menom.' } },
        ],
        relatedNames: [
            { canonicalKey: 'gabriela', relation: 'derived-from' },
            { canonicalKey: 'eleonora', relation: 'derived-from' },
            { canonicalKey: 'helena', relation: 'derived-from' },
        ],
        confidence: 'uncertain',
        notes: [
            {
                id: 'ela-meaning-cannot-be-assigned',
                kind: 'linguistic',
                text: {
                    en: 'Meanings printed for Ela are borrowed from whichever longer name the writer chose. The short form has none of its own.',
                    sk: 'Významy, ktoré sa pri mene Ela uvádzajú, sú prevzaté z toho dlhšieho mena, ktoré si pisateľ vybral. Skrátená podoba vlastný význam nemá.',
                },
            },
        ],
        provenance: ['onomastic-consensus', 'sk-civil-calendar'],
    },
    {
        canonicalKey: 'dana',
        canonicalName: 'Dana',
        gender: 'feminine',
        origins: [
            {
                id: 'dana-from-daniela',
                sourceLanguage: 'czech',
                culture: { en: 'Czech and Slovak', sk: 'Česká a slovenská' },
                derivation: [
                    { form: 'Daniela', language: 'latin', gloss: { en: 'the longer name', sk: 'dlhšie meno' } },
                    { form: 'Dana', language: 'czech', gloss: { en: 'short form, later used independently', sk: 'skrátená podoba, neskôr používaná samostatne' } },
                ],
                gloss: { en: 'from Daniela: God is my judge', sk: 'z mena Daniela: Boh je môj sudca' },
                confidence: 'probable',
                epistemicClass: 'disputed-origin',
                summary: {
                    en: 'The most widely held account makes Dana a Czech and Slovak short form of Daniela, or occasionally of Bohdana, that became an independent name. On this reading its meaning is borrowed from the base name.',
                    sk: 'Najrozšírenejší výklad pokladá Danu za českú a slovenskú skrátenú podobu mena Daniela, prípadne Bohdana, ktorá sa osamostatnila. Pri tomto výklade má význam prevzatý zo základného mena.',
                },
                provenance: ['onomastic-consensus'],
            },
            {
                id: 'dana-slavic-dar',
                sourceLanguage: 'proto-slavic',
                culture: { en: 'Slavic', sk: 'Slovanská' },
                derivation: [
                    { form: 'dati', language: 'proto-slavic', reconstructed: true, gloss: { en: 'to give', sk: 'dať' } },
                    { form: 'Dana', language: 'slavic', gloss: { en: 'the given one', sk: 'daná, darovaná' } },
                ],
                gloss: { en: 'the given one', sk: 'daná, darovaná' },
                confidence: 'disputed',
                epistemicClass: 'disputed-origin',
                summary: {
                    en: 'A competing account treats Dana as a Slavic name from the verb meaning to give, parallel to Bohdana. The formation is possible but the name is not clearly attested independently of the short-form route.',
                    sk: 'Konkurenčný výklad pokladá Danu za slovanské meno zo slovesa dať, súbežné s menom Bohdana. Utvorenie je možné, no meno nie je jasne doložené nezávisle od cesty cez skrátenú podobu.',
                },
                provenance: ['contested-etymology'],
            },
        ],
        meaning: { literal: null, traditional: { en: 'the given one', sk: 'daná, darovaná' } },
        culturalSpread: [
            { id: 'dana-west-slavic', region: { en: 'Slovakia, Czechia', sk: 'Slovensko, Česko' }, forms: ['Dana'] },
        ],
        variants: [
            { form: 'Danka', kind: 'diminutive', language: 'slovak', resolvesToCanonical: true },
        ],
        relatedNames: [
            { canonicalKey: 'daniela', relation: 'derived-from' },
            { canonicalKey: 'bohdana', relation: 'shares-root' },
        ],
        confidence: 'disputed',
        notes: [],
        provenance: ['contested-etymology', 'sk-civil-calendar'],
    },
    {
        canonicalKey: 'alena',
        canonicalName: 'Alena',
        gender: 'feminine',
        origins: [
            {
                id: 'alena-from-magdalena',
                sourceLanguage: 'czech',
                culture: { en: 'Czech and Slovak', sk: 'Česká a slovenská' },
                derivation: [
                    { form: 'Magdalena', language: 'latin', gloss: { en: 'the woman of Magdala', sk: 'žena z Magdaly' } },
                    { form: 'Alena', language: 'czech', gloss: { en: 'short form taken from the ending', sk: 'skrátená podoba vydelená z konca mena' } },
                ],
                gloss: { en: 'from Magdalena: of Magdala', sk: 'z mena Magdaléna: z Magdaly' },
                confidence: 'probable',
                epistemicClass: 'disputed-origin',
                summary: {
                    en: 'The commonest account makes Alena a Czech and Slovak short form of Magdaléna, taken from the end of the name and long since independent. It is the reading most West Slavic onomastic work gives first.',
                    sk: 'Najčastejší výklad pokladá Alenu za českú a slovenskú skrátenú podobu mena Magdaléna, vydelenú z konca mena a dávno samostatnú. Je to výklad, ktorý západoslovanské onomastické práce uvádzajú na prvom mieste.',
                },
                provenance: ['onomastic-consensus'],
            },
            {
                id: 'alena-from-helena',
                sourceLanguage: 'ancient-greek',
                culture: { en: 'Greek, by way of Central European usage', sk: 'Grécka, cez stredoeurópske prostredie' },
                derivation: [
                    { form: 'Ἑλένη', language: 'ancient-greek', gloss: { en: 'Helen', sk: 'Helena' } },
                    { form: 'Alena', language: 'czech', gloss: { en: 'a vernacular development of Helena', sk: 'ľudový vývin mena Helena' } },
                ],
                gloss: { en: 'from Helena', sk: 'z mena Helena' },
                confidence: 'disputed',
                epistemicClass: 'disputed-origin',
                summary: {
                    en: 'A serious competing account derives Alena from Helena instead, through vernacular loss of the initial syllable. The two routes cannot be told apart in the surviving record, which is why both are kept.',
                    sk: 'Vážny konkurenčný výklad odvodzuje Alenu z mena Helena stratou začiatočnej slabiky v ľudovej reči. Obe cesty sa v zachovaných dokladoch nedajú odlíšiť, preto sa uvádzajú obidve.',
                },
                provenance: ['contested-etymology'],
            },
        ],
        meaning: { literal: null },
        culturalSpread: [
            { id: 'alena-west-slavic', region: { en: 'Slovakia, Czechia', sk: 'Slovensko, Česko' }, forms: ['Alena'] },
        ],
        variants: [
            { form: 'Alenka', kind: 'diminutive', language: 'slovak', resolvesToCanonical: true },
            { form: 'Aľona', kind: 'language-form', language: 'russian', resolvesToCanonical: false,
                note: { en: 'The Russian Alyona belongs to the Helena line specifically.', sk: 'Ruské Aľona patrí konkrétne do vetvy mena Helena.' } },
        ],
        relatedNames: [
            { canonicalKey: 'magdalena', relation: 'derived-from' },
            { canonicalKey: 'helena', relation: 'derived-from' },
        ],
        confidence: 'disputed',
        notes: [],
        provenance: ['contested-etymology', 'sk-civil-calendar'],
    },
    {
        canonicalKey: 'lenka',
        canonicalName: 'Lenka',
        gender: 'feminine',
        origins: [
            {
                id: 'lenka-from-magdalena',
                sourceLanguage: 'czech',
                culture: { en: 'Czech and Slovak', sk: 'Česká a slovenská' },
                derivation: [
                    { form: 'Magdalena', language: 'latin', gloss: { en: 'the woman of Magdala', sk: 'žena z Magdaly' } },
                    { form: 'Lenka', language: 'czech', gloss: { en: 'diminutive taken from the middle of the name', sk: 'zdrobnenina vydelená zo stredu mena' } },
                ],
                gloss: { en: 'from Magdalena', sk: 'z mena Magdaléna' },
                confidence: 'probable',
                epistemicClass: 'disputed-origin',
                summary: {
                    en: 'A Czech diminutive of Magdaléna, formed on the -len- syllable and long used as a name in its own right. It spread to Slovak from Czech usage in the twentieth century.',
                    sk: 'Česká zdrobnenina mena Magdaléna, utvorená zo slabiky -len- a dlho používaná ako samostatné meno. Do slovenčiny sa rozšírila z českého prostredia v 20. storočí.',
                },
                provenance: ['onomastic-consensus'],
            },
            {
                id: 'lenka-from-helena',
                sourceLanguage: 'czech',
                culture: { en: 'Czech and Slovak', sk: 'Česká a slovenská' },
                derivation: [
                    { form: 'Helena', language: 'latin', gloss: { en: 'the Latin form of Greek Helene', sk: 'latinská podoba gréckeho Helené' } },
                    { form: 'Lenka', language: 'czech', gloss: { en: 'diminutive of the shortened Lena', sk: 'zdrobnenina skrátenej podoby Lena' } },
                ],
                gloss: { en: 'from Helena', sk: 'z mena Helena' },
                confidence: 'disputed',
                epistemicClass: 'disputed-origin',
                summary: {
                    en: 'Equally defensible is a derivation from Helena by way of the short form Lena. Both bases give the same diminutive, and the surviving evidence does not separate them.',
                    sk: 'Rovnako obhájiteľné je odvodenie z mena Helena cez skrátenú podobu Lena. Obe základné mená dávajú tú istú zdrobneninu a zachované doklady ich neodlišujú.',
                },
                provenance: ['contested-etymology'],
            },
        ],
        meaning: { literal: null },
        culturalSpread: [
            { id: 'lenka-west-slavic', region: { en: 'Czechia, Slovakia', sk: 'Česko, Slovensko' }, forms: ['Lenka'] },
        ],
        variants: [
            { form: 'Lena', kind: 'diminutive', language: 'slovak', resolvesToCanonical: false },
        ],
        relatedNames: [
            { canonicalKey: 'magdalena', relation: 'derived-from' },
            { canonicalKey: 'helena', relation: 'derived-from' },
        ],
        confidence: 'disputed',
        notes: [],
        provenance: ['contested-etymology', 'sk-civil-calendar'],
    },
    {
        canonicalKey: 'jela',
        canonicalName: 'Jela',
        gender: 'feminine',
        origins: [
            {
                id: 'jela-slavic-fir',
                sourceLanguage: 'proto-slavic',
                culture: { en: 'South Slavic', sk: 'Juhoslovanská' },
                derivation: [
                    { form: 'edla', language: 'proto-slavic', reconstructed: true, gloss: { en: 'fir, spruce', sk: 'jedľa, smrek' } },
                    { form: 'jela', language: 'serbo-croatian', gloss: { en: 'fir tree', sk: 'jedľa' } },
                ],
                gloss: { en: 'fir tree', sk: 'jedľa' },
                confidence: 'probable',
                epistemicClass: 'disputed-origin',
                summary: {
                    en: 'On one reading Jela is a South Slavic vocabulary name from the word for a fir tree, in the same family of plant names as Ruža and Vesna-type formations. The word is certain; that the name comes from it is the point at issue.',
                    sk: 'Podľa jedného výkladu je Jela juhoslovanské meno prevzaté zo slova pre jedľu, z tej istej skupiny rastlinných mien ako Ruža a podobné utvorenia. Slovo je isté; sporné je, či meno pochádza práve z neho.',
                },
                provenance: ['slavic-onomastics'],
            },
            {
                id: 'jela-from-jelena',
                sourceLanguage: 'ancient-greek',
                culture: { en: 'South Slavic, from the Greek name', sk: 'Juhoslovanská, z gréckeho mena' },
                derivation: [
                    { form: 'Ἑλένη', language: 'ancient-greek', gloss: { en: 'Helen', sk: 'Helena' } },
                    { form: 'Jelena', language: 'serbo-croatian', gloss: { en: 'the South Slavic form of Helena', sk: 'juhoslovanská podoba mena Helena' } },
                    { form: 'Jela', language: 'serbo-croatian', gloss: { en: 'short form', sk: 'skrátená podoba' } },
                ],
                gloss: { en: 'from Jelena, the Slavic Helena', sk: 'z mena Jelena, slovanskej podoby mena Helena' },
                confidence: 'disputed',
                epistemicClass: 'disputed-origin',
                summary: {
                    en: 'A competing account makes Jela simply the short form of Jelena, the South Slavic Helena. The two accounts have coexisted for as long as the name has been recorded and neither displaces the other.',
                    sk: 'Konkurenčný výklad pokladá Jelu jednoducho za skrátenú podobu mena Jelena, juhoslovanskej podoby mena Helena. Oba výklady existujú vedľa seba, odkedy je meno doložené, a ani jeden druhý nevytláča.',
                },
                provenance: ['contested-etymology'],
            },
        ],
        meaning: { literal: null },
        culturalSpread: [
            { id: 'jela-south-slavic', region: { en: 'Croatia, Serbia', sk: 'Chorvátsko, Srbsko' }, forms: ['Jela'] },
            { id: 'jela-slovakia', region: { en: 'Slovakia', sk: 'Slovensko' }, forms: ['Jela'] },
        ],
        variants: [],
        relatedNames: [
            { canonicalKey: 'helena', relation: 'derived-from' },
        ],
        confidence: 'disputed',
        notes: [],
        provenance: ['contested-etymology', 'sk-civil-calendar'],
    },
    {
        canonicalKey: 'karina',
        canonicalName: 'Karina',
        gender: 'feminine',
        origins: [
            {
                id: 'karina-from-katarina',
                sourceLanguage: 'ancient-greek',
                culture: { en: 'Scandinavian, from the Greek saint name', sk: 'Škandinávska, z gréckeho svätého mena' },
                derivation: [
                    { form: 'Αἰκατερίνη', language: 'ancient-greek', gloss: { en: 'Catherine, a saint name of uncertain origin', sk: 'Katarína, sväté meno neistého pôvodu' } },
                    { form: 'Karin', language: 'german', gloss: { en: 'the Scandinavian and German short form', sk: 'škandinávska a nemecká skrátená podoba' } },
                    { form: 'Karina', language: 'german', gloss: { en: 'extended feminine form', sk: 'rozšírená ženská podoba' } },
                ],
                gloss: { en: 'from Katarína, whose own meaning is not established', sk: 'z mena Katarína, ktorého vlastný význam nie je určený' },
                confidence: 'probable',
                epistemicClass: 'disputed-origin',
                summary: {
                    en: 'The most usual account makes Karina an extension of Karin, the Scandinavian short form of Katharina. That pushes the question back a step, since the origin of Katharina itself is not established.',
                    sk: 'Najbežnejší výklad pokladá Karinu za rozšírenie mena Karin, škandinávskej skrátenej podoby mena Katharina. Otázku to však len posúva, lebo pôvod samotného mena Katarína určený nie je.',
                },
                provenance: ['onomastic-consensus'],
            },
            {
                id: 'karina-latin-cara',
                sourceLanguage: 'latin',
                culture: { en: 'Italian / Latin', sk: 'Talianska / latinská' },
                derivation: [
                    { form: 'carus, cara', language: 'latin', gloss: { en: 'dear, beloved', sk: 'drahý, milovaný' } },
                    { form: 'Carina', language: 'italian', gloss: { en: 'little dear one', sk: 'malá drahá' } },
                ],
                gloss: { en: 'dear, beloved', sk: 'drahá, milovaná' },
                confidence: 'disputed',
                epistemicClass: 'disputed-origin',
                summary: {
                    en: 'A second account takes the name from Italian Carina, a diminutive of the Latin adjective for dear. The spelling with K in Central Europe argues for the Scandinavian route, but the Latin one cannot be ruled out.',
                    sk: 'Druhý výklad odvodzuje meno z talianskeho Carina, zdrobneniny latinského prídavného mena pre drahý. Písanie s K v strednej Európe hovorí skôr pre škandinávsku cestu, latinskú však vylúčiť nemožno.',
                },
                provenance: ['contested-etymology'],
            },
        ],
        meaning: { literal: null },
        culturalSpread: [
            { id: 'karina-scandinavia', region: { en: 'Denmark, Norway, Sweden', sk: 'Dánsko, Nórsko, Švédsko' }, forms: ['Karina', 'Karin'] },
            { id: 'karina-central-europe', region: { en: 'Slovakia, Poland, Germany', sk: 'Slovensko, Poľsko, Nemecko' }, forms: ['Karina'] },
        ],
        variants: [
            { form: 'Carina', kind: 'spelling', language: 'italian', resolvesToCanonical: true },
            { form: 'Karin', kind: 'language-form', language: 'german', resolvesToCanonical: false },
        ],
        relatedNames: [
            { canonicalKey: 'katarina', relation: 'derived-from' },
        ],
        confidence: 'disputed',
        notes: [],
        provenance: ['contested-etymology', 'sk-civil-calendar'],
    },
    {
        canonicalKey: 'liana',
        canonicalName: 'Liana',
        gender: 'feminine',
        origins: [
            {
                id: 'liana-short-form',
                sourceLanguage: 'italian',
                culture: { en: 'Italian and French', sk: 'Talianska a francúzska' },
                derivation: [
                    { form: '-liana', language: 'italian', gloss: { en: 'the ending of names such as Giuliana, Emiliana and Rosaliana', sk: 'zakončenie mien ako Giuliana, Emiliana a Rosaliana' } },
                    { form: 'Liana', language: 'italian', gloss: { en: 'the extracted short form', sk: 'vydelená skrátená podoba' } },
                ],
                gloss: { en: 'no meaning of its own; an extracted short form', sk: 'bez vlastného významu; vydelená skrátená podoba' },
                confidence: 'probable',
                epistemicClass: 'disputed-origin',
                summary: {
                    en: 'The usual account makes Liana a short form drawn from the ending of Romance names such as Giuliana and Emiliana, later used independently. On this reading it has no meaning apart from its base.',
                    sk: 'Bežný výklad pokladá Lianu za skrátenú podobu vydelenú zo zakončenia románskych mien ako Giuliana či Emiliana, neskôr používanú samostatne. Pri tomto výklade nemá význam oddelený od základného mena.',
                },
                provenance: ['onomastic-consensus'],
            },
            {
                id: 'liana-french-vine',
                sourceLanguage: 'french',
                culture: { en: 'French', sk: 'Francúzska' },
                derivation: [
                    { form: 'lier', language: 'french', gloss: { en: 'to bind, to tie', sk: 'viazať, spájať' } },
                    { form: 'liane', language: 'french', gloss: { en: 'a climbing tropical vine', sk: 'popínavá tropická rastlina, liana' } },
                ],
                gloss: { en: 'climbing vine', sk: 'popínavá rastlina' },
                confidence: 'disputed',
                epistemicClass: 'disputed-origin',
                summary: {
                    en: 'A second account treats the name as a botanical borrowing from French liane, the climbing vine, on the pattern of other plant names. The word is real; whether the personal name comes from it is contested.',
                    sk: 'Druhý výklad pokladá meno za botanickú výpožičku z francúzskeho liane, teda popínavej rastliny, podľa vzoru iných rastlinných mien. Slovo je doložené; či z neho pochádza osobné meno, je sporné.',
                },
                provenance: ['contested-etymology'],
            },
        ],
        meaning: { literal: null },
        culturalSpread: [
            { id: 'liana-romance', region: { en: 'Italy, France, Romania', sk: 'Taliansko, Francúzsko, Rumunsko' }, forms: ['Liana'] },
            { id: 'liana-central-europe', region: { en: 'Slovakia, Czechia', sk: 'Slovensko, Česko' }, forms: ['Liana'] },
        ],
        variants: [
            { form: 'Lianna', kind: 'spelling', resolvesToCanonical: true },
        ],
        relatedNames: [
            { canonicalKey: 'juliana', relation: 'derived-from' },
        ],
        confidence: 'disputed',
        notes: [],
        provenance: ['contested-etymology', 'sk-civil-calendar'],
    },
    {
        canonicalKey: 'zina',
        canonicalName: 'Zina',
        gender: 'feminine',
        origins: [
            {
                id: 'zina-from-zinaida',
                sourceLanguage: 'ancient-greek',
                culture: { en: 'Greek / Orthodox, by way of Russian', sk: 'Grécka / pravoslávna, cez ruštinu' },
                derivation: [
                    { form: 'Ζεύς, Ζηνός', language: 'ancient-greek', gloss: { en: 'Zeus, in the oblique stem Zen-', sk: 'Zeus, v nepriamom kmeni Zén-' } },
                    { form: 'Ζηναΐς', language: 'ancient-greek', gloss: { en: 'belonging to Zeus', sk: 'patriaca Diovi' } },
                    { form: 'Зинаида', language: 'russian', gloss: { en: 'the Russian church form', sk: 'ruská cirkevná podoba' } },
                    { form: 'Зина', language: 'russian', gloss: { en: 'the hypocoristic', sk: 'domácka podoba' } },
                ],
                gloss: { en: 'of Zeus', sk: 'Diova, patriaca Diovi' },
                confidence: 'probable',
                epistemicClass: 'disputed-origin',
                summary: {
                    en: 'Usually taken as the Russian short form of Zinaida, from a Greek name built on the oblique stem of Zeus. The Greek base is secure; the step from it to the modern short form is the ordinary Russian one.',
                    sk: 'Zvyčajne sa pokladá za ruskú skrátenú podobu mena Zinaida, z gréckeho mena utvoreného z nepriameho kmeňa mena Zeus. Grécky základ je istý a krok k dnešnej skrátenej podobe je bežný ruský postup.',
                },
                provenance: ['classical-onomastics'],
            },
            {
                id: 'zina-from-zenobia',
                sourceLanguage: 'ancient-greek',
                culture: { en: 'Greek / Orthodox', sk: 'Grécka / pravoslávna' },
                derivation: [
                    { form: 'Ζηνοβία', language: 'ancient-greek', gloss: { en: 'life of Zeus', sk: 'život Diov' } },
                    { form: 'Зиновия', language: 'russian', gloss: { en: 'the Russian church form', sk: 'ruská cirkevná podoba' } },
                ],
                gloss: { en: 'life of Zeus', sk: 'život Diov' },
                confidence: 'disputed',
                epistemicClass: 'disputed-origin',
                summary: {
                    en: 'Zina also serves as the short form of Zinovia, the Slavic Zenobia, which is a different Greek compound on the same divine stem. Which longer name a given Zina stands for is not determinable.',
                    sk: 'Zina slúži aj ako skrátená podoba mena Zinovia, slovanskej podoby mena Zenobia, čo je iné grécke zloženie s tým istým božským kmeňom. Ktoré dlhšie meno konkrétna Zina zastupuje, určiť nemožno.',
                },
                provenance: ['contested-etymology'],
            },
        ],
        meaning: { literal: null, traditional: { en: 'of Zeus', sk: 'Diova' } },
        culturalSpread: [
            { id: 'zina-east-slavic', region: { en: 'Russia, Ukraine', sk: 'Rusko, Ukrajina' }, forms: ['Зина', 'Zina'] },
            { id: 'zina-slovakia', region: { en: 'Slovakia', sk: 'Slovensko' }, forms: ['Zina'] },
        ],
        variants: [
            { form: 'Зина', kind: 'transliteration', language: 'russian', resolvesToCanonical: true },
        ],
        relatedNames: [],
        confidence: 'disputed',
        notes: [],
        provenance: ['classical-onomastics', 'contested-etymology', 'sk-civil-calendar'],
    },
    {
        canonicalKey: 'ales',
        canonicalName: 'Aleš',
        gender: 'masculine',
        origins: [
            {
                id: 'ales-from-alexej',
                sourceLanguage: 'ancient-greek',
                culture: { en: 'Czech and Slovak, from the Greek saint name', sk: 'Česká a slovenská, z gréckeho svätého mena' },
                derivation: [
                    { form: 'ἀλέξειν', language: 'ancient-greek', gloss: { en: 'to defend, to ward off', sk: 'brániť, odvracať' } },
                    { form: 'Ἀλέξιος', language: 'ancient-greek', gloss: { en: 'defender', sk: 'obranca' } },
                    { form: 'Aleš', language: 'czech', gloss: { en: 'short form with the West Slavic suffix -š', sk: 'skrátená podoba so západoslovanskou príponou -š' } },
                ],
                gloss: { en: 'defender', sk: 'obranca' },
                confidence: 'probable',
                epistemicClass: 'disputed-origin',
                summary: {
                    en: 'The usual account makes Aleš a medieval Czech short form of Alexej or Alexander, cut back to the first syllable and given the hypocoristic suffix -š. The pattern is the standard one for Czech medieval short names.',
                    sk: 'Bežný výklad pokladá Aleša za stredovekú českú skrátenú podobu mena Alexej či Alexander, skrátenú na prvú slabiku a doplnenú zdrobňujúcou príponou -š. Ide o štandardný postup pri českých stredovekých skrátených menách.',
                },
                provenance: ['onomastic-consensus'],
            },
            {
                id: 'ales-from-albrecht',
                sourceLanguage: 'old-high-german',
                culture: { en: 'Germanic, by way of Czech usage', sk: 'Germánska, cez české prostredie' },
                derivation: [
                    { form: 'adal', language: 'old-high-german', gloss: { en: 'noble', sk: 'urodzený' } },
                    { form: 'beraht', language: 'old-high-german', gloss: { en: 'bright', sk: 'jasný' } },
                    { form: 'Albrecht', language: 'german', gloss: { en: 'nobly bright', sk: 'urodzene jasný' } },
                ],
                gloss: { en: 'nobly bright', sk: 'urodzene jasný' },
                confidence: 'disputed',
                epistemicClass: 'disputed-origin',
                summary: {
                    en: 'A competing derivation takes Aleš from Albrecht, the German form of Adalbert, shortened in the same medieval Czech way. Both routes are attested for the shape Aleš and the record keeps them side by side.',
                    sk: 'Konkurenčné odvodenie vyvodzuje Aleša z mena Albrecht, nemeckej podoby mena Adalbert, skráteného tým istým stredovekým českým spôsobom. Obe cesty sú pre podobu Aleš doložené a záznam ich uvádza vedľa seba.',
                },
                provenance: ['contested-etymology'],
            },
        ],
        meaning: { literal: null },
        culturalSpread: [
            { id: 'ales-west-slavic', region: { en: 'Czechia, Slovakia', sk: 'Česko, Slovensko' }, forms: ['Aleš'] },
            { id: 'ales-slovenia', region: { en: 'Slovenia', sk: 'Slovinsko' }, forms: ['Aleš'] },
        ],
        variants: [
            { form: 'Ales', kind: 'spelling', resolvesToCanonical: true },
        ],
        relatedNames: [
            { canonicalKey: 'alexej', relation: 'derived-from' },
            { canonicalKey: 'vojtech', relation: 'shares-root',
                note: { en: 'Linked only on the Adalbert reading, where Vojtech is the Slavic counterpart.', sk: 'Spojené len pri výklade cez Adalberta, kde je Vojtech slovanským náprotivkom.' } },
        ],
        confidence: 'disputed',
        notes: [],
        provenance: ['contested-etymology', 'sk-civil-calendar'],
    },
    /* ---------------------------------------------------------------------- *
     * Names whose derivation is genuinely divided in the scholarship.
     * ---------------------------------------------------------------------- */
    {
        canonicalKey: 'ida',
        canonicalName: 'Ida',
        gender: 'feminine',
        origins: [
            {
                id: 'ida-germanic-id',
                sourceLanguage: 'proto-germanic',
                culture: { en: 'Germanic', sk: 'Germánska' },
                derivation: [
                    { form: 'idja', language: 'proto-germanic', reconstructed: true, gloss: { en: 'work, labour, activity', sk: 'práca, činnosť' } },
                    { form: 'Ida', language: 'old-high-german', gloss: { en: 'a short form of longer Id- names', sk: 'skrátená podoba dlhších mien s prvkom Id-' } },
                ],
                gloss: { en: 'work, activity', sk: 'práca, činnosť' },
                confidence: 'disputed',
                epistemicClass: 'disputed-origin',
                summary: {
                    en: 'One reading takes Ida as a Germanic short form built on an element meaning work or activity, of the kind that also appears in Old Norse. It explains the name as a hypocorism of longer compounds rather than a word taken directly.',
                    sk: 'Jeden výklad pokladá Idu za germánsku skrátenú podobu utvorenú z prvku s významom práca či činnosť, aký sa objavuje aj v starej severčine. Meno vysvetľuje ako domácku podobu dlhších zložených mien, nie ako priamo prevzaté slovo.',
                },
                provenance: ['germanic-onomastics', 'contested-etymology'],
            },
            {
                id: 'ida-germanic-idis',
                sourceLanguage: 'old-high-german',
                culture: { en: 'Germanic', sk: 'Germánska' },
                derivation: [
                    { form: 'itis', language: 'old-high-german', gloss: { en: 'woman, lady, and in poetry a divine female figure', sk: 'žena, pani, v poézii aj božská ženská bytosť' } },
                ],
                gloss: { en: 'woman, lady', sk: 'žena, pani' },
                confidence: 'disputed',
                epistemicClass: 'disputed-origin',
                summary: {
                    en: 'A rival account connects the name to the Old High German word for a woman or lady, familiar from the Merseburg charms. The two proposals have been argued against each other for a long time without resolution.',
                    sk: 'Konkurenčný výklad spája meno so starohornonemeckým slovom pre ženu či panej, známym z merseburských zaklínadiel. Oba návrhy sa proti sebe uvádzajú už dlho a spor nie je uzavretý.',
                },
                provenance: ['contested-etymology'],
            },
        ],
        meaning: { literal: null },
        culturalSpread: [
            { id: 'ida-germanic-europe', region: { en: 'Germany, Scandinavia', sk: 'Nemecko, Škandinávia' }, forms: ['Ida'] },
            { id: 'ida-central-europe', region: { en: 'Slovakia, Czechia, Hungary', sk: 'Slovensko, Česko, Maďarsko' }, forms: ['Ida'] },
        ],
        variants: [
            { form: 'Iduška', kind: 'diminutive', language: 'slovak', resolvesToCanonical: true },
        ],
        relatedNames: [],
        confidence: 'disputed',
        notes: [
            {
                id: 'ida-mount-ida-folk-etymology',
                kind: 'folk-etymology',
                text: {
                    en: 'The name is sometimes explained from Mount Ida in Crete or the Troad. That is a coincidence of sound between a Greek place name and a Germanic personal name, not a derivation.',
                    sk: 'Meno sa občas vysvetľuje podľa vrchu Ida na Kréte alebo v Troade. Ide o zhodu zvuku medzi gréckym miestnym menom a germánskym osobným menom, nie o odvodenie.',
                },
            },
        ],
        provenance: ['germanic-onomastics', 'contested-etymology', 'sk-civil-calendar'],
    },
    {
        canonicalKey: 'vanda',
        canonicalName: 'Vanda',
        gender: 'feminine',
        origins: [
            {
                id: 'vanda-slavic-legend',
                sourceLanguage: 'polish',
                culture: { en: 'Polish', sk: 'Poľská' },
                derivation: [
                    { form: 'Wanda', language: 'polish', gloss: { en: 'the name of a legendary princess of Kraków', sk: 'meno legendárnej krakovskej kňažnej' } },
                    { form: 'Vanda', language: 'slovak', gloss: { en: 'the Slovak spelling', sk: 'slovenský zápis' } },
                ],
                gloss: { en: 'no established meaning', sk: 'bez určeného významu' },
                confidence: 'uncertain',
                epistemicClass: 'disputed-origin',
                summary: {
                    en: 'The name is first recorded in the Polish chronicle legend of Princess Wanda, and its literary transmission is well documented. What the name itself meant before the legend is not established.',
                    sk: 'Meno je prvýkrát doložené v poľskej kronikárskej legende o kňažnej Wande a jeho literárne šírenie je dobre zdokumentované. Čo meno znamenalo pred legendou, určené nie je.',
                },
                provenance: ['contested-etymology'],
            },
            {
                id: 'vanda-wend-ethnonym',
                sourceLanguage: 'old-high-german',
                culture: { en: 'Germanic', sk: 'Germánska' },
                derivation: [
                    { form: 'Wenden', language: 'german', gloss: { en: 'the German name for Slavs living west of the Oder', sk: 'nemecké pomenovanie Slovanov na západ od Odry' } },
                    { form: 'Wanda', language: 'polish', gloss: { en: 'read as a woman of the Wends', sk: 'vykladané ako žena Vendov' } },
                ],
                gloss: { en: 'of the Wends, Slav woman', sk: 'z Vendov, Slovanka' },
                confidence: 'disputed',
                epistemicClass: 'disputed-origin',
                summary: {
                    en: 'A frequently repeated proposal reads the name as an ethnonym, from the Germanic name for the western Slavs. It is plausible for a legendary Slavic princess but rests on the story rather than on linguistic evidence.',
                    sk: 'Často opakovaný návrh vykladá meno ako pomenovanie podľa národa, z germánskeho označenia západných Slovanov. Pri legendárnej slovanskej kňažnej je to vierohodné, opiera sa však o príbeh, nie o jazykové doklady.',
                },
                provenance: ['contested-etymology'],
            },
        ],
        meaning: { literal: null },
        culturalSpread: [
            { id: 'vanda-poland', region: { en: 'Poland', sk: 'Poľsko' }, forms: ['Wanda'] },
            { id: 'vanda-central-europe', region: { en: 'Slovakia, Czechia, Hungary', sk: 'Slovensko, Česko, Maďarsko' }, forms: ['Vanda'] },
        ],
        variants: [
            { form: 'Wanda', kind: 'language-form', language: 'polish', resolvesToCanonical: true },
        ],
        relatedNames: [],
        confidence: 'disputed',
        notes: [],
        provenance: ['contested-etymology', 'pl-civil-calendar', 'sk-civil-calendar'],
    },
    {
        canonicalKey: 'eleonora',
        canonicalName: 'Eleonóra',
        gender: 'feminine',
        origins: [
            {
                id: 'eleonora-alia-aenor',
                sourceLanguage: 'french',
                culture: { en: 'Occitan / Norman French', sk: 'Okcitánska / normanská francúzska' },
                derivation: [
                    { form: 'Aenor', language: 'french', gloss: { en: 'a woman’s name current in twelfth-century Aquitaine', sk: 'ženské meno bežné v Akvitánii 12. storočia' } },
                    { form: 'Aliénor', language: 'french', gloss: { en: 'read as alia Aenor, the other Aenor', sk: 'vykladané ako alia Aenor, tá druhá Aenor' } },
                    { form: 'Eleonora', language: 'latin', gloss: { en: 'the latinized form', sk: 'polatinčená podoba' } },
                ],
                gloss: { en: 'the other Aenor', sk: 'tá druhá Aenor' },
                confidence: 'disputed',
                epistemicClass: 'disputed-origin',
                summary: {
                    en: 'A long-standing account explains Aliénor of Aquitaine as alia Aenor, the other Aenor, distinguishing her from her mother of that name. It is repeated in serious literature but is itself a medieval interpretation rather than a documented derivation.',
                    sk: 'Dlho tradovaný výklad vysvetľuje meno Aliénor Akvitánskej ako alia Aenor, čiže tá druhá Aenor, na odlíšenie od matky rovnakého mena. Opakuje sa aj v odbornej literatúre, ide však o stredoveký výklad, nie o doložené odvodenie.',
                },
                provenance: ['contested-etymology'],
            },
            {
                id: 'eleonora-germanic-ali',
                sourceLanguage: 'proto-germanic',
                culture: { en: 'Germanic, by way of Occitan', sk: 'Germánska, cez okcitánčinu' },
                derivation: [
                    { form: 'aljaz', language: 'proto-germanic', reconstructed: true, gloss: { en: 'other, foreign', sk: 'iný, cudzí' } },
                    { form: 'Alienor', language: 'french', gloss: { en: 'a Germanic compound name adapted in the south of France', sk: 'germánske zložené meno prispôsobené na juhu Francúzska' } },
                ],
                gloss: { en: 'uncertain; built on an element meaning other', sk: 'neisté; utvorené z prvku s významom iný' },
                confidence: 'disputed',
                epistemicClass: 'disputed-origin',
                summary: {
                    en: 'A second account treats the name as a Germanic compound carried into Occitan, whose second element is no longer recoverable. This avoids the medieval word-play explanation but leaves the meaning open.',
                    sk: 'Druhý výklad pokladá meno za germánske zložené meno prenesené do okcitánčiny, ktorého druhý prvok už zistiť nemožno. Vyhýba sa stredovekej slovnej hračke, no význam necháva otvorený.',
                },
                provenance: ['contested-etymology'],
            },
        ],
        meaning: { literal: null },
        culturalSpread: [
            { id: 'eleonora-western-europe', region: { en: 'France, England, Spain', sk: 'Francúzsko, Anglicko, Španielsko' }, forms: ['Aliénor', 'Eleanor', 'Leonor'] },
            { id: 'eleonora-central-europe', region: { en: 'Slovakia, Hungary, Czechia', sk: 'Slovensko, Maďarsko, Česko' }, forms: ['Eleonóra'] },
        ],
        variants: [
            { form: 'Eleanor', kind: 'language-form', language: 'english', resolvesToCanonical: true },
            { form: 'Leonóra', kind: 'spelling', language: 'slovak', resolvesToCanonical: true },
            { form: 'Nora', kind: 'diminutive', language: 'slovak', resolvesToCanonical: false,
                note: { en: 'Also used for other names, so it is not resolved automatically.', sk: 'Používa sa aj pre iné mená, preto sa neprekladá automaticky.' } },
        ],
        relatedNames: [],
        confidence: 'disputed',
        notes: [
            {
                id: 'eleonora-light-folk-etymology',
                kind: 'folk-etymology',
                text: {
                    en: 'The gloss "God is my light", read into the name through Greek helios or Hebrew el, is a later invention. Neither element is present in the medieval forms.',
                    sk: 'Výklad „Boh je moje svetlo“, vkladaný do mena cez grécke helios alebo hebrejské el, je neskorší výmysel. Ani jeden prvok sa v stredovekých podobách nenachádza.',
                },
            },
        ],
        provenance: ['contested-etymology', 'sk-civil-calendar'],
    },
    {
        canonicalKey: 'monika',
        canonicalName: 'Monika',
        gender: 'feminine',
        origins: [
            {
                id: 'monika-north-african',
                sourceLanguage: 'unknown',
                culture: { en: 'Roman North Africa', sk: 'Rímska severná Afrika' },
                region: { en: 'Numidia', sk: 'Numídia' },
                derivation: [
                    { form: 'Monnica', language: 'latin', gloss: { en: 'the spelling used of Augustine’s mother in the earliest manuscripts', sk: 'zápis mena Augustínovej matky v najstarších rukopisoch' } },
                ],
                gloss: { en: 'no recoverable meaning', sk: 'bez zistiteľného významu' },
                confidence: 'uncertain',
                epistemicClass: 'disputed-origin',
                summary: {
                    en: 'The name is known from Monnica, the Berber mother of Augustine of Hippo, and is most often taken to be of local North African rather than Latin material. On that reading its meaning is simply not recoverable.',
                    sk: 'Meno poznáme z podoby Monnica, ktorú niesla berberská matka Augustína z Hippa, a najčastejšie sa pokladá za miestne severoafrické, nie latinské. Pri tomto výklade jeho význam zistiť nemožno.',
                },
                provenance: ['contested-etymology'],
            },
            {
                id: 'monika-latin-monere',
                sourceLanguage: 'latin',
                culture: { en: 'Latin Christian', sk: 'Latinská kresťanská' },
                derivation: [
                    { form: 'monere', language: 'latin', gloss: { en: 'to warn, to advise, to remind', sk: 'napomínať, radiť, pripomínať' } },
                ],
                gloss: { en: 'adviser, one who warns', sk: 'radkyňa, tá, ktorá napomína' },
                confidence: 'disputed',
                epistemicClass: 'disputed-origin',
                summary: {
                    en: 'A competing account derives the name from the Latin verb monere, to advise or warn. The fit is suspiciously neat for a saint remembered for admonishing her son, which is part of why the derivation is doubted.',
                    sk: 'Konkurenčný výklad odvodzuje meno z latinského slovesa monere, teda radiť či napomínať. Pri svätici, ktorú si pamätáme pre napomínanie syna, je zhoda podozrivo úhľadná, aj preto sa odvodenie spochybňuje.',
                },
                provenance: ['contested-etymology'],
            },
        ],
        meaning: { literal: null, traditional: { en: 'adviser', sk: 'radkyňa' } },
        culturalSpread: [
            { id: 'monika-central-europe', region: { en: 'Slovakia, Czechia, Poland, Germany', sk: 'Slovensko, Česko, Poľsko, Nemecko' }, forms: ['Monika'] },
            { id: 'monika-western-europe', region: { en: 'Italy, France, Britain', sk: 'Taliansko, Francúzsko, Británia' }, forms: ['Monica', 'Monique'] },
        ],
        variants: [
            { form: 'Monica', kind: 'language-form', language: 'italian', resolvesToCanonical: true },
            { form: 'Monique', kind: 'language-form', language: 'french', resolvesToCanonical: true },
        ],
        relatedNames: [],
        confidence: 'disputed',
        notes: [
            {
                id: 'monika-greek-monos-folk-etymology',
                kind: 'folk-etymology',
                text: {
                    en: 'The gloss "alone", from Greek monos, is a sound-alike reading with nothing behind it. The earliest spelling Monnica does not support it.',
                    sk: 'Výklad „osamelá“ z gréckeho monos je len zvuková podoba bez opory. Najstarší zápis Monnica ho nepodporuje.',
                },
            },
        ],
        provenance: ['contested-etymology', 'sk-civil-calendar'],
    },
    {
        canonicalKey: 'lea',
        canonicalName: 'Lea',
        gender: 'feminine',
        origins: [
            {
                id: 'lea-hebrew-weary',
                sourceLanguage: 'hebrew',
                culture: { en: 'Hebrew / biblical', sk: 'Hebrejská / biblická' },
                derivation: [
                    { form: 'לָאָה', language: 'hebrew', gloss: { en: 'to be weary, to grow tired', sk: 'byť unavený, ustať' } },
                    { form: 'Lēʾāh', language: 'hebrew', gloss: { en: 'the name of Jacob’s first wife', sk: 'meno prvej Jakubovej manželky' } },
                ],
                gloss: { en: 'weary', sk: 'unavená' },
                confidence: 'disputed',
                epistemicClass: 'disputed-origin',
                summary: {
                    en: 'One reading connects the name to a Hebrew verb meaning to be weary. It is the traditional derivation and is old, but it looks like an attempt to explain an already opaque name from within Hebrew.',
                    sk: 'Jeden výklad spája meno s hebrejským slovesom s významom byť unavený. Je to tradičné a staré odvodenie, pôsobí však ako pokus vysvetliť už vtedy nepriehľadné meno prostriedkami hebrejčiny.',
                },
                provenance: ['biblical-onomastics', 'contested-etymology'],
            },
            {
                id: 'lea-akkadian-cow',
                sourceLanguage: 'unknown',
                culture: { en: 'Ancient Near Eastern', sk: 'Staroveký Blízky východ' },
                derivation: [
                    { form: 'littu', language: 'unknown', gloss: { en: 'cow, in Akkadian', sk: 'krava, v akkadčine' } },
                ],
                gloss: { en: 'wild cow', sk: 'divá krava' },
                confidence: 'disputed',
                epistemicClass: 'disputed-origin',
                summary: {
                    en: 'A widely discussed alternative connects the name to an Akkadian word for a cow, which would pair it with Rachel, ewe, in the same narrative. The parallel is striking but the sound correspondence is not agreed.',
                    sk: 'Široko diskutovaná alternatíva spája meno s akkadským slovom pre kravu, čím by tvorilo dvojicu s menom Ráchel, ovca, v tom istom rozprávaní. Súvislosť je nápadná, hlásková zhoda však nie je uznávaná zhodne.',
                },
                provenance: ['contested-etymology'],
            },
        ],
        meaning: { literal: null },
        culturalSpread: [
            { id: 'lea-central-europe', region: { en: 'Slovakia, Czechia, Germany', sk: 'Slovensko, Česko, Nemecko' }, forms: ['Lea'] },
            { id: 'lea-romance', region: { en: 'Italy, France', sk: 'Taliansko, Francúzsko' }, forms: ['Lea', 'Léa'] },
        ],
        variants: [
            { form: 'Leah', kind: 'spelling', language: 'english', resolvesToCanonical: true },
            { form: 'Léa', kind: 'language-form', language: 'french', resolvesToCanonical: true },
        ],
        relatedNames: [
            { canonicalKey: 'rachel', relation: 'shares-root',
                note: { en: 'Linked by the biblical narrative, not by shared linguistic material.', sk: 'Spojené biblickým rozprávaním, nie spoločným jazykovým základom.' } },
        ],
        confidence: 'disputed',
        notes: [
            {
                id: 'lea-latin-lioness-folk-etymology',
                kind: 'folk-etymology',
                text: {
                    en: 'The gloss "lioness", from Latin lea, belongs to a different word that merely looks the same. The biblical name is Hebrew and unrelated to it.',
                    sk: 'Výklad „levica“ z latinského lea patrí inému slovu, ktoré len rovnako vyzerá. Biblické meno je hebrejské a s ním nesúvisí.',
                },
            },
        ],
        provenance: ['biblical-onomastics', 'contested-etymology', 'sk-civil-calendar'],
    },
    {
        canonicalKey: 'mario',
        canonicalName: 'Mário',
        gender: 'masculine',
        origins: [
            {
                id: 'mario-roman-gens',
                sourceLanguage: 'latin',
                culture: { en: 'Roman', sk: 'Rímska' },
                derivation: [
                    { form: 'Marius', language: 'latin', gloss: { en: 'an old Roman family name', sk: 'staré rímske rodové meno' } },
                    { form: 'Mario', language: 'italian', gloss: { en: 'the Italian development', sk: 'taliansky vývin' } },
                ],
                gloss: { en: 'of the gens Maria', sk: 'z rodu Mariov' },
                confidence: 'well-attested',
                epistemicClass: 'etymological-fact',
                summary: {
                    en: 'Descends from the Roman family name Marius, borne by the general Gaius Marius and well attested from the Republic. That the modern name comes from it is not in doubt; what the family name itself meant is.',
                    sk: 'Pochádza z rímskeho rodového mena Marius, ktoré nosil vojvodca Gaius Marius a ktoré je dobre doložené od čias republiky. Že z neho dnešné meno pochádza, sporné nie je; sporný je význam samotného rodového mena.',
                },
                provenance: ['classical-onomastics'],
            },
            {
                id: 'mario-mars-connection',
                sourceLanguage: 'latin',
                culture: { en: 'Roman', sk: 'Rímska' },
                derivation: [
                    { form: 'Mars, Martis', language: 'latin', gloss: { en: 'the god Mars', sk: 'boh Mars' } },
                    { form: 'Marius', language: 'latin', gloss: { en: 'read as belonging to Mars', sk: 'vykladané ako patriaci Marsovi' } },
                ],
                gloss: { en: 'of Mars', sk: 'Marsov' },
                confidence: 'disputed',
                epistemicClass: 'disputed-origin',
                summary: {
                    en: 'One proposal links the family name to the god Mars, another to the Latin word for a male, and a third takes it for Etruscan material with no Latin sense at all. None has carried the field.',
                    sk: 'Jeden návrh spája rodové meno s bohom Marsom, druhý s latinským slovom pre muža a tretí ho pokladá za etruský základ bez latinského významu. Ani jeden sa nepresadil.',
                },
                provenance: ['contested-etymology'],
            },
        ],
        meaning: { literal: null, traditional: { en: 'of the Marius family', sk: 'z rodu Mariov' } },
        culturalSpread: [
            { id: 'mario-italy', region: { en: 'Italy, Spain, Portugal', sk: 'Taliansko, Španielsko, Portugalsko' }, forms: ['Mario', 'Mário'] },
            { id: 'mario-central-europe', region: { en: 'Slovakia, Czechia', sk: 'Slovensko, Česko' }, forms: ['Mário'] },
        ],
        variants: [
            { form: 'Mario', kind: 'spelling', language: 'italian', resolvesToCanonical: true },
            { form: 'Marius', kind: 'language-form', language: 'latin', resolvesToCanonical: true },
        ],
        relatedNames: [
            { canonicalKey: 'marian', relation: 'shares-root' },
        ],
        confidence: 'disputed',
        notes: [
            {
                id: 'mario-not-from-maria',
                kind: 'linguistic',
                text: {
                    en: 'Mário is not a masculine form of Mária. The Roman family name Marius is centuries older than the Christian use of Maria and the two are unrelated.',
                    sk: 'Mário nie je mužskou podobou mena Mária. Rímske rodové meno Marius je o stáročia staršie než kresťanské používanie mena Mária a navzájom nesúvisia.',
                },
            },
        ],
        provenance: ['classical-onomastics', 'contested-etymology', 'sk-civil-calendar'],
    },
    {
        canonicalKey: 'tadeas',
        canonicalName: 'Tadeáš',
        gender: 'masculine',
        origins: [
            {
                id: 'tadeas-aramaic',
                sourceLanguage: 'aramaic',
                culture: { en: 'Aramaic / New Testament', sk: 'Aramejská / novozákonná' },
                derivation: [
                    { form: 'Θαδδαῖος', language: 'ancient-greek', gloss: { en: 'Thaddaeus, the apostle listed in Matthew and Mark', sk: 'Tadeáš, apoštol uvádzaný u Matúša a Marka' } },
                    { form: 'taddai', language: 'aramaic', reconstructed: true, gloss: { en: 'an Aramaic byname of uncertain sense', sk: 'aramejské prímenie neistého významu' } },
                ],
                gloss: { en: 'uncertain Aramaic byname', sk: 'aramejské prímenie neistého významu' },
                confidence: 'uncertain',
                epistemicClass: 'disputed-origin',
                summary: {
                    en: 'The Greek Thaddaios renders an Aramaic byname whose sense is not established; readings such as heart or courageous are proposals, not translations. The name is secure, its meaning is not.',
                    sk: 'Grécke Thaddaios zachytáva aramejské prímenie, ktorého význam určený nie je; výklady ako srdce či odvážny sú návrhy, nie preklady. Meno je isté, jeho význam nie.',
                },
                provenance: ['biblical-onomastics', 'contested-etymology'],
            },
            {
                id: 'tadeas-greek-theodosios',
                sourceLanguage: 'ancient-greek',
                culture: { en: 'Greek / New Testament', sk: 'Grécka / novozákonná' },
                derivation: [
                    { form: 'Θεόδοσις', language: 'ancient-greek', gloss: { en: 'gift of God', sk: 'dar Boží' } },
                    { form: 'Θαδδαῖος', language: 'ancient-greek', gloss: { en: 'read as a shortened Greek form', sk: 'vykladané ako skrátená grécka podoba' } },
                ],
                gloss: { en: 'gift of God', sk: 'dar Boží' },
                confidence: 'disputed',
                epistemicClass: 'disputed-origin',
                summary: {
                    en: 'A second account treats Thaddaios as a Greek hypocorism of a Theo- compound such as Theodosios, used by an Aramaic speaker as a Greek by-name. It is a real proposal in New Testament onomastics and not settled either way.',
                    sk: 'Druhý výklad pokladá Thaddaios za grécku domácku podobu zloženého mena s prvkom Theo-, napríklad Theodosios, ktorú aramejsky hovoriaci používal ako grécke prímenie. Ide o skutočný návrh novozákonnej onomastiky a spor nie je rozhodnutý.',
                },
                provenance: ['contested-etymology'],
            },
        ],
        meaning: { literal: null },
        culturalSpread: [
            { id: 'tadeas-west-slavic', region: { en: 'Slovakia, Czechia, Poland', sk: 'Slovensko, Česko, Poľsko' }, forms: ['Tadeáš', 'Tadeusz'] },
            { id: 'tadeas-western-europe', region: { en: 'Italy, Britain', sk: 'Taliansko, Británia' }, forms: ['Taddeo', 'Thaddeus'] },
        ],
        variants: [
            { form: 'Tadeusz', kind: 'language-form', language: 'polish', resolvesToCanonical: true },
            { form: 'Taddeo', kind: 'language-form', language: 'italian', resolvesToCanonical: true },
        ],
        relatedNames: [],
        confidence: 'disputed',
        notes: [],
        provenance: ['biblical-onomastics', 'contested-etymology', 'sk-civil-calendar'],
    },
    {
        canonicalKey: 'gaspar',
        canonicalName: 'Gašpar',
        gender: 'masculine',
        origins: [
            {
                id: 'gaspar-persian-treasurer',
                sourceLanguage: 'persian',
                culture: { en: 'Persian, by way of Latin Christian legend', sk: 'Perzská, cez latinskú kresťanskú legendu' },
                derivation: [
                    { form: 'ganzabara', language: 'persian', reconstructed: true, gloss: { en: 'treasurer, keeper of the treasury', sk: 'pokladník, správca pokladnice' } },
                    { form: 'Gaspar', language: 'latin', gloss: { en: 'one of the traditional names of the Magi', sk: 'jedno z tradičných mien mudrcov' } },
                ],
                gloss: { en: 'treasurer', sk: 'pokladník' },
                confidence: 'uncertain',
                epistemicClass: 'disputed-origin',
                summary: {
                    en: 'The most cited proposal derives the name from an Iranian word for a treasurer, which would suit a bearer of gifts. The word exists, but the link to the Magus name is a reconstruction rather than a documented line of descent.',
                    sk: 'Najčastejšie uvádzaný návrh odvodzuje meno z iránskeho slova pre pokladníka, čo by k nositeľovi darov sedelo. Slovo existuje, spojenie s menom mudrca je však rekonštrukcia, nie doložená línia.',
                },
                provenance: ['contested-etymology'],
            },
            {
                id: 'gaspar-gondophares',
                sourceLanguage: 'persian',
                culture: { en: 'Indo-Parthian', sk: 'Indoparthská' },
                derivation: [
                    { form: 'Gondophares', language: 'persian', gloss: { en: 'the name of an Indo-Parthian king of the first century', sk: 'meno indoparthského kráľa z 1. storočia' } },
                ],
                gloss: { en: 'uncertain', sk: 'neisté' },
                confidence: 'uncertain',
                epistemicClass: 'disputed-origin',
                summary: {
                    en: 'A second proposal connects the name to the historical king Gondophares, whose name reached Christian legend through apocryphal acts. Neither proposal is more than a plausible route.',
                    sk: 'Druhý návrh spája meno s historickým kráľom Gondopharom, ktorého meno sa do kresťanskej legendy dostalo cez apokryfné skutky. Ani jeden návrh nie je viac než vierohodná cesta.',
                },
                provenance: ['contested-etymology'],
            },
        ],
        meaning: { literal: null },
        history: {
            en: 'The three Magi are unnamed in the gospel text; the names Gaspar, Melchior and Balthasar first appear together in Western sources of the sixth century onwards, which is where this name enters European use.',
            sk: 'Traja mudrci nie sú v evanjeliovom texte pomenovaní; mená Gašpar, Melichar a Baltazár sa spolu objavujú až v západných prameňoch od 6. storočia, a práve odtiaľ vstupuje toto meno do európskeho používania.',
        },
        culturalSpread: [
            { id: 'gaspar-central-europe', region: { en: 'Slovakia, Czechia, Hungary', sk: 'Slovensko, Česko, Maďarsko' }, forms: ['Gašpar', 'Gáspár'] },
            { id: 'gaspar-iberia', region: { en: 'Spain, Portugal', sk: 'Španielsko, Portugalsko' }, forms: ['Gaspar'] },
        ],
        variants: [
            { form: 'Gáspár', kind: 'language-form', language: 'hungarian', resolvesToCanonical: true },
            { form: 'Kaspar', kind: 'language-form', language: 'german', resolvesToCanonical: true },
        ],
        relatedNames: [],
        confidence: 'uncertain',
        notes: [],
        provenance: ['contested-etymology', 'sk-civil-calendar'],
    },
    {
        canonicalKey: 'tatiana',
        canonicalName: 'Tatiana',
        gender: 'feminine',
        origins: [
            {
                id: 'tatiana-roman-tatius',
                sourceLanguage: 'latin',
                culture: { en: 'Roman, by way of Orthodox usage', sk: 'Rímska, cez pravoslávne prostredie' },
                derivation: [
                    { form: 'Tatius', language: 'latin', gloss: { en: 'a Roman family name, borne by the legendary Sabine king Titus Tatius', sk: 'rímske rodové meno, ktoré niesol legendárny sabinský kráľ Titus Tatius' } },
                    { form: 'Tatianus', language: 'latin', gloss: { en: 'derived from Tatius', sk: 'odvodené z mena Tatius' } },
                    { form: 'Tatiana', language: 'latin', gloss: { en: 'feminine form', sk: 'ženská podoba' } },
                ],
                gloss: { en: 'of the Tatius family', sk: 'z rodu Tatiov' },
                confidence: 'probable',
                epistemicClass: 'etymological-fact',
                summary: {
                    en: 'A regular Latin derivative of the family name Tatius, spread as a Christian name by an early Roman martyr and kept alive chiefly in the Orthodox calendar. The chain from Tatius is clear; Tatius itself is Sabine and has no recoverable Latin meaning.',
                    sk: 'Pravidelné latinské odvodenie z rodového mena Tatius, ktoré ako kresťanské meno rozšírila ranorímska mučeníčka a udržal najmä pravoslávny kalendár. Reťaz od mena Tatius je jasná; samotné Tatius je sabinské a latinský význam z neho zistiť nemožno.',
                },
                provenance: ['classical-onomastics'],
            },
        ],
        meaning: { literal: null, traditional: { en: 'of the Tatius family', sk: 'z rodu Tatiov' } },
        culturalSpread: [
            { id: 'tatiana-east-slavic', region: { en: 'Russia, Ukraine', sk: 'Rusko, Ukrajina' }, forms: ['Татьяна'] },
            { id: 'tatiana-central-europe', region: { en: 'Slovakia, Czechia', sk: 'Slovensko, Česko' }, forms: ['Tatiana', 'Taťána'] },
        ],
        variants: [
            { form: 'Татьяна', kind: 'transliteration', language: 'russian', resolvesToCanonical: true },
            { form: 'Taťána', kind: 'language-form', language: 'czech', resolvesToCanonical: true },
            { form: 'Táňa', kind: 'diminutive', language: 'slovak', resolvesToCanonical: true },
        ],
        relatedNames: [],
        confidence: 'probable',
        notes: [
            {
                id: 'tatiana-no-latin-meaning',
                kind: 'linguistic',
                text: {
                    en: 'Glosses such as "she who arranges" or "father\'s daughter" are attempts to force a meaning onto a Sabine family name. The honest answer is that the meaning is lost.',
                    sk: 'Výklady ako „tá, ktorá usporadúva“ či „otcova dcéra“ sú pokusy vnútiť význam sabinskému rodovému menu. Poctivá odpoveď znie, že význam sa stratil.',
                },
            },
        ],
        provenance: ['classical-onomastics', 'sk-civil-calendar'],
    },
    {
        canonicalKey: 'ervin',
        canonicalName: 'Ervín',
        gender: 'masculine',
        origins: [
            {
                id: 'ervin-honour-friend',
                sourceLanguage: 'old-high-german',
                culture: { en: 'Germanic', sk: 'Germánska' },
                derivation: [
                    { form: 'era', language: 'old-high-german', gloss: { en: 'honour, respect', sk: 'česť, úcta' } },
                    { form: 'wini', language: 'old-high-german', gloss: { en: 'friend', sk: 'priateľ' } },
                    { form: 'Erwin', language: 'german', gloss: { en: 'friend of honour', sk: 'priateľ cti' } },
                ],
                gloss: { en: 'friend of honour', sk: 'priateľ cti' },
                confidence: 'probable',
                epistemicClass: 'disputed-origin',
                summary: {
                    en: 'The reading most often given takes the first element as the Old High German word for honour and the second as the very common element meaning friend. The second element is not in doubt; the first is.',
                    sk: 'Najčastejšie uvádzaný výklad pokladá prvý prvok za starohornonemecké slovo pre česť a druhý za veľmi častý prvok s významom priateľ. Druhý prvok sporný nie je, prvý áno.',
                },
                provenance: ['germanic-onomastics'],
            },
            {
                id: 'ervin-army-friend',
                sourceLanguage: 'old-high-german',
                culture: { en: 'Germanic', sk: 'Germánska' },
                derivation: [
                    { form: 'heri', language: 'old-high-german', gloss: { en: 'army, host', sk: 'vojsko, zástup' } },
                    { form: 'wini', language: 'old-high-german', gloss: { en: 'friend', sk: 'priateľ' } },
                    { form: 'Herwin', language: 'old-high-german', gloss: { en: 'friend of the army', sk: 'priateľ vojska' } },
                ],
                gloss: { en: 'friend of the army', sk: 'priateľ vojska' },
                confidence: 'disputed',
                epistemicClass: 'disputed-origin',
                summary: {
                    en: 'A competing analysis takes the first element from heri, army, with loss of the initial h-, which would put the name in the large Her- family. Medieval spellings support both readings.',
                    sk: 'Konkurenčný rozbor vyvodzuje prvý prvok z heri, teda vojsko, so stratou začiatočného h-, čím by meno patrilo do veľkej skupiny mien s Her-. Stredoveké zápisy podporujú oba výklady.',
                },
                provenance: ['contested-etymology'],
            },
        ],
        meaning: { literal: null, traditional: { en: 'friend of honour', sk: 'priateľ cti' } },
        culturalSpread: [
            { id: 'ervin-german', region: { en: 'German-speaking Europe', sk: 'Nemecky hovoriaca Európa' }, forms: ['Erwin'] },
            { id: 'ervin-central-europe', region: { en: 'Slovakia, Hungary, Czechia', sk: 'Slovensko, Maďarsko, Česko' }, forms: ['Ervín'] },
        ],
        variants: [
            { form: 'Erwin', kind: 'language-form', language: 'german', resolvesToCanonical: true },
        ],
        relatedNames: [
            { canonicalKey: 'herman', relation: 'shares-root',
                note: { en: 'Linked only on the heri- reading of the first element.', sk: 'Spojené len pri výklade prvého prvku ako heri-.' } },
        ],
        confidence: 'disputed',
        notes: [],
        provenance: ['germanic-onomastics', 'contested-etymology', 'sk-civil-calendar'],
    },
    {
        canonicalKey: 'medard',
        canonicalName: 'Medard',
        gender: 'masculine',
        origins: [
            {
                id: 'medard-power-hardy',
                sourceLanguage: 'old-high-german',
                culture: { en: 'Frankish / Germanic', sk: 'Franská / germánska' },
                derivation: [
                    { form: 'maht', language: 'old-high-german', gloss: { en: 'might, power', sk: 'moc, sila' } },
                    { form: 'hart', language: 'old-high-german', gloss: { en: 'hard, strong, brave', sk: 'tvrdý, silný, statočný' } },
                    { form: 'Medardus', language: 'latin', gloss: { en: 'the latinized form of the Frankish name', sk: 'polatinčená podoba franského mena' } },
                ],
                gloss: { en: 'strong in power', sk: 'silný mocou' },
                confidence: 'probable',
                epistemicClass: 'disputed-origin',
                summary: {
                    en: 'The second element is the very common Germanic hart, hard or brave, and is not in doubt. The first is usually taken as maht, might, though the reduced medieval spellings make this less than certain.',
                    sk: 'Druhý prvok je veľmi časté germánske hart s významom tvrdý či statočný a sporný nie je. Prvý sa zvyčajne pokladá za maht, teda moc, no oslabené stredoveké zápisy to nerobia celkom istým.',
                },
                provenance: ['germanic-onomastics'],
            },
            {
                id: 'medard-assembly-hardy',
                sourceLanguage: 'proto-germanic',
                culture: { en: 'Frankish / Germanic', sk: 'Franská / germánska' },
                derivation: [
                    { form: 'maþla', language: 'proto-germanic', reconstructed: true, gloss: { en: 'assembly, formal speech', sk: 'zhromaždenie, slávnostná reč' } },
                    { form: 'hart', language: 'old-high-german', gloss: { en: 'hard, strong', sk: 'tvrdý, silný' } },
                ],
                gloss: { en: 'strong in council', sk: 'silný v rade' },
                confidence: 'disputed',
                epistemicClass: 'disputed-origin',
                summary: {
                    en: 'A second analysis takes the first element from a Germanic word for an assembly or formal speech, the element also seen in Mathilde. The two readings cannot be separated from the surviving Frankish spellings.',
                    sk: 'Druhý rozbor vyvodzuje prvý prvok z germánskeho slova pre zhromaždenie či slávnostnú reč, ktorý je aj v mene Matilda. Zo zachovaných franských zápisov sa oba výklady odlíšiť nedajú.',
                },
                provenance: ['contested-etymology'],
            },
        ],
        meaning: { literal: null, traditional: { en: 'strong, powerful', sk: 'silný, mocný' } },
        culturalSpread: [
            { id: 'medard-francia', region: { en: 'France, Belgium', sk: 'Francúzsko, Belgicko' }, forms: ['Médard'] },
            { id: 'medard-central-europe', region: { en: 'Slovakia, Czechia', sk: 'Slovensko, Česko' }, forms: ['Medard'] },
        ],
        variants: [
            { form: 'Médard', kind: 'language-form', language: 'french', resolvesToCanonical: true },
        ],
        relatedNames: [
            { canonicalKey: 'matilda', relation: 'shares-root',
                note: { en: 'Linked only on the assembly reading of the first element.', sk: 'Spojené len pri výklade prvého prvku ako zhromaždenie.' } },
        ],
        confidence: 'disputed',
        notes: [
            {
                id: 'medard-weather-lore',
                kind: 'usage',
                text: {
                    en: 'The Central European weather saying attached to the feast of Saint Medard concerns the date in the calendar, not the name or its origin.',
                    sk: 'Stredoeurópska pranostika viazaná na sviatok svätého Medarda sa týka dátumu v kalendári, nie mena ani jeho pôvodu.',
                },
            },
        ],
        provenance: ['germanic-onomastics', 'contested-etymology', 'sk-civil-calendar'],
    },
    {
        canonicalKey: 'servac',
        canonicalName: 'Servác',
        gender: 'masculine',
        origins: [
            {
                id: 'servac-latin-servare',
                sourceLanguage: 'latin',
                culture: { en: 'Latin Christian', sk: 'Latinská kresťanská' },
                derivation: [
                    { form: 'servare', language: 'latin', gloss: { en: 'to keep, to preserve, to save', sk: 'zachovávať, uchovávať, zachraňovať' } },
                    { form: 'Servatius', language: 'latin', gloss: { en: 'the name of the fourth-century bishop of Tongeren', sk: 'meno biskupa z Tongerenu zo 4. storočia' } },
                ],
                gloss: { en: 'preserved, saved', sk: 'zachovaný, zachránený' },
                confidence: 'probable',
                epistemicClass: 'disputed-origin',
                summary: {
                    en: 'The commonest reading connects the name to the Latin verb servare, to preserve or save, giving a participial sense of one who has been kept safe. The verb is right for the form but the derivation is not documented.',
                    sk: 'Najbežnejší výklad spája meno s latinským slovesom servare, teda zachovávať či zachraňovať, s príčastným významom ten, kto bol zachovaný. Sloveso k podobe sedí, odvodenie však doložené nie je.',
                },
                provenance: ['classical-onomastics'],
            },
            {
                id: 'servac-latin-servus',
                sourceLanguage: 'latin',
                culture: { en: 'Latin Christian', sk: 'Latinská kresťanská' },
                derivation: [
                    { form: 'servus', language: 'latin', gloss: { en: 'servant, slave', sk: 'sluha, otrok' } },
                    { form: 'Servatius', language: 'latin', gloss: { en: 'read as belonging to the servus family of names', sk: 'vykladané ako patriace k menám odvodeným od servus' } },
                ],
                gloss: { en: 'servant', sk: 'sluha' },
                confidence: 'disputed',
                epistemicClass: 'disputed-origin',
                summary: {
                    en: 'A second reading puts the name with the large Late Latin group built on servus, servant, which supplied many Christian names expressing service to God. Both readings start from real Latin words and neither is decisive.',
                    sk: 'Druhý výklad zaraďuje meno k veľkej neskorolatinskej skupine utvorenej zo slova servus, teda sluha, z ktorej pochádza mnoho kresťanských mien vyjadrujúcich službu Bohu. Oba výklady vychádzajú zo skutočných latinských slov a ani jeden nie je rozhodujúci.',
                },
                provenance: ['contested-etymology'],
            },
        ],
        meaning: { literal: null },
        culturalSpread: [
            { id: 'servac-low-countries', region: { en: 'Netherlands, Belgium', sk: 'Holandsko, Belgicko' }, forms: ['Servaas', 'Servais'] },
            { id: 'servac-central-europe', region: { en: 'Slovakia, Czechia', sk: 'Slovensko, Česko' }, forms: ['Servác'] },
        ],
        variants: [
            { form: 'Servaas', kind: 'language-form', resolvesToCanonical: true },
        ],
        relatedNames: [
            { canonicalKey: 'pankrac', relation: 'shares-root',
                note: { en: 'Linked only as one of the three May frost saints, not linguistically.', sk: 'Spojené len ako jeden z troch zamrznutých mužov v máji, nie jazykovo.' } },
        ],
        confidence: 'disputed',
        notes: [],
        provenance: ['classical-onomastics', 'contested-etymology', 'sk-civil-calendar'],
    },
    {
        canonicalKey: 'malvina',
        canonicalName: 'Malvína',
        gender: 'feminine',
        origins: [
            {
                id: 'malvina-ossian-coinage',
                sourceLanguage: 'gaelic',
                culture: { en: 'Scottish literary', sk: 'Škótska literárna' },
                region: { en: 'Scottish Highlands, as imagined in the Ossian poems', sk: 'Škótska vysočina, ako ju predstavujú ossianovské spevy' },
                derivation: [
                    { form: 'Malvina', language: 'english', gloss: { en: 'a character in James Macpherson’s Ossian poems, published from 1760', sk: 'postava z ossianovských spevov Jamesa Macphersona, vydávaných od roku 1760' } },
                    { form: 'mala mhìn', language: 'gaelic', reconstructed: true, gloss: { en: 'smooth brow - the Gaelic phrase the coinage is usually referred to', sk: 'hladké obočie - gaelské spojenie, na ktoré sa toto meno zvyčajne vzťahuje' } },
                ],
                gloss: { en: 'smooth brow', sk: 'hladké obočie' },
                confidence: 'probable',
                epistemicClass: 'etymological-fact',
                summary: {
                    en: 'Malvína is a literary coinage: it first appears as a character name in Macpherson’s Ossian poems and spread across Europe with their enormous popularity. That much is documented; the Gaelic phrase usually cited as its source is Macpherson’s own construction rather than a recorded Gaelic name.',
                    sk: 'Malvína je literárny výtvor: prvý raz sa objavuje ako meno postavy v Macphersonových ossianovských spevoch a po Európe sa rozšírila s ich obrovskou popularitou. Toto je doložené; gaelské spojenie, ktoré sa uvádza ako zdroj, je však Macphersonova vlastná konštrukcia, nie zaznamenané gaelské meno.',
                },
                provenance: ['contested-etymology', 'curated-summary'],
            },
        ],
        meaning: { literal: null, traditional: { en: 'smooth brow', sk: 'hladké obočie' } },
        culturalSpread: [
            { id: 'malvina-central-europe', region: { en: 'Slovakia, Czechia, Hungary', sk: 'Slovensko, Česko, Maďarsko' }, forms: ['Malvína'] },
            { id: 'malvina-western-europe', region: { en: 'France, Britain', sk: 'Francúzsko, Británia' }, forms: ['Malvina'] },
        ],
        variants: [
            { form: 'Malvina', kind: 'spelling', resolvesToCanonical: true },
        ],
        relatedNames: [],
        confidence: 'probable',
        notes: [
            {
                id: 'malvina-invented-name',
                kind: 'historical',
                text: {
                    en: 'This is an invented eighteenth-century name, not an inherited one. Its history is real and traceable; its supposed ancient Gaelic meaning is not.',
                    sk: 'Ide o vymyslené meno z 18. storočia, nie o zdedené. Jeho história je skutočná a sledovateľná, jeho údajný starý gaelský význam nie.',
                },
            },
        ],
        provenance: ['contested-etymology', 'curated-summary', 'sk-civil-calendar'],
    },
    /* ---------------------------------------------------------------------- *
     * Transparent Latin, Greek and Germanic derivations.
     * ---------------------------------------------------------------------- */
    {
        canonicalKey: 'severin',
        canonicalName: 'Severín',
        gender: 'masculine',
        origins: [
            {
                id: 'severin-latin-severus',
                sourceLanguage: 'latin',
                culture: { en: 'Roman / Latin Christian', sk: 'Rímska / latinská kresťanská' },
                derivation: [
                    { form: 'severus', language: 'latin', gloss: { en: 'stern, serious, strict', sk: 'prísny, vážny' } },
                    { form: 'Severinus', language: 'latin', gloss: { en: 'derived from Severus with the suffix -inus', sk: 'odvodené z mena Severus príponou -inus' } },
                ],
                gloss: { en: 'stern, serious', sk: 'prísny, vážny' },
                confidence: 'well-attested',
                epistemicClass: 'etymological-fact',
                summary: {
                    en: 'A regular Latin derivative of the family name Severus, itself the ordinary adjective meaning stern or serious. It spread as a Christian name through Severinus of Noricum, the fifth-century missionary of the Danube provinces.',
                    sk: 'Pravidelné latinské odvodenie z rodového mena Severus, ktoré je bežným prídavným menom s významom prísny či vážny. Ako kresťanské meno ho rozšíril Severín Norický, misionár podunajských provincií z 5. storočia.',
                },
                provenance: ['classical-onomastics'],
            },
        ],
        meaning: { literal: { en: 'stern, serious', sk: 'prísny, vážny' } },
        culturalSpread: [
            { id: 'severin-central-europe', region: { en: 'Slovakia, Austria, Czechia', sk: 'Slovensko, Rakúsko, Česko' }, forms: ['Severín', 'Severin'] },
            { id: 'severin-romance', region: { en: 'Italy, Romania', sk: 'Taliansko, Rumunsko' }, forms: ['Severino', 'Severin'] },
        ],
        variants: [
            { form: 'Severin', kind: 'spelling', language: 'german', resolvesToCanonical: true },
            { form: 'Severino', kind: 'language-form', language: 'italian', resolvesToCanonical: true },
        ],
        relatedNames: [],
        confidence: 'well-attested',
        notes: [
            {
                id: 'severin-not-about-bearer',
                kind: 'usage',
                text: {
                    en: 'The Latin adjective describes the word the name is built from, not the temperament of anyone called Severín.',
                    sk: 'Latinské prídavné meno opisuje slovo, z ktorého je meno utvorené, nie povahu človeka, ktorý sa Severín volá.',
                },
            },
        ],
        provenance: ['classical-onomastics', 'sk-civil-calendar'],
    },
    {
        canonicalKey: 'alexej',
        canonicalName: 'Alexej',
        gender: 'masculine',
        origins: [
            {
                id: 'alexej-greek-alexios',
                sourceLanguage: 'ancient-greek',
                culture: { en: 'Greek / Orthodox', sk: 'Grécka / pravoslávna' },
                derivation: [
                    { form: 'ἀλέξειν', language: 'ancient-greek', gloss: { en: 'to defend, to ward off', sk: 'brániť, odvracať' } },
                    { form: 'Ἀλέξιος', language: 'ancient-greek', gloss: { en: 'defender', sk: 'obranca' } },
                    { form: 'Алексей', language: 'russian', gloss: { en: 'the East Slavic form', sk: 'východoslovanská podoba' } },
                ],
                gloss: { en: 'defender', sk: 'obranca' },
                confidence: 'well-attested',
                epistemicClass: 'etymological-fact',
                summary: {
                    en: 'From the Greek verb meaning to defend or ward off, the same root that stands at the front of Alexander. It became a major Orthodox name through Alexius the Man of God and the Byzantine emperors.',
                    sk: 'Z gréckeho slovesa s významom brániť či odvracať, z toho istého koreňa, aký stojí na začiatku mena Alexander. Významným pravoslávnym menom sa stalo cez Alexia, Muža Božieho, a byzantských cisárov.',
                },
                provenance: ['classical-onomastics'],
            },
        ],
        meaning: { literal: { en: 'defender', sk: 'obranca' } },
        culturalSpread: [
            { id: 'alexej-east-slavic', region: { en: 'Russia, Ukraine', sk: 'Rusko, Ukrajina' }, forms: ['Алексей', 'Олексій'] },
            { id: 'alexej-central-europe', region: { en: 'Slovakia, Czechia', sk: 'Slovensko, Česko' }, forms: ['Alexej'] },
        ],
        variants: [
            { form: 'Алексей', kind: 'transliteration', language: 'russian', resolvesToCanonical: true },
            { form: 'Alexius', kind: 'language-form', language: 'latin', resolvesToCanonical: true },
        ],
        relatedNames: [
            { canonicalKey: 'alexander', relation: 'shares-root' },
            { canonicalKey: 'ales', relation: 'shares-root' },
        ],
        confidence: 'well-attested',
        notes: [],
        provenance: ['classical-onomastics', 'sk-civil-calendar'],
    },
    {
        canonicalKey: 'gregor',
        canonicalName: 'Gregor',
        gender: 'masculine',
        origins: [
            {
                id: 'gregor-greek-gregorein',
                sourceLanguage: 'ancient-greek',
                culture: { en: 'Greek / early Christian', sk: 'Grécka / ranokresťanská' },
                derivation: [
                    { form: 'γρηγορεῖν', language: 'ancient-greek', gloss: { en: 'to be awake, to be watchful', sk: 'bdieť, byť ostražitý' } },
                    { form: 'Γρηγόριος', language: 'ancient-greek', gloss: { en: 'watchful, vigilant', sk: 'bdelý, ostražitý' } },
                    { form: 'Gregorius', language: 'latin', gloss: { en: 'the latinized form', sk: 'polatinčená podoba' } },
                ],
                gloss: { en: 'watchful, vigilant', sk: 'bdelý, ostražitý' },
                confidence: 'well-attested',
                epistemicClass: 'etymological-fact',
                summary: {
                    en: 'From the Greek verb meaning to be awake or watchful, a favourite among early Christians for its echo of the gospel injunction to keep watch. Sixteen popes carried it, which is why it is found across the whole of Latin Europe.',
                    sk: 'Z gréckeho slovesa s významom bdieť či byť ostražitý, obľúbeného medzi ranými kresťanmi pre ozvenu evanjeliovej výzvy bdieť. Nosilo ho šestnásť pápežov, preto sa nachádza v celej latinskej Európe.',
                },
                provenance: ['classical-onomastics'],
            },
        ],
        meaning: { literal: { en: 'watchful, vigilant', sk: 'bdelý, ostražitý' } },
        culturalSpread: [
            { id: 'gregor-central-europe', region: { en: 'Slovakia, Czechia, Germany', sk: 'Slovensko, Česko, Nemecko' }, forms: ['Gregor', 'Řehoř'] },
            { id: 'gregor-western-europe', region: { en: 'Britain, Italy, Spain', sk: 'Británia, Taliansko, Španielsko' }, forms: ['Gregory', 'Gregorio'] },
        ],
        variants: [
            { form: 'Gregory', kind: 'language-form', language: 'english', resolvesToCanonical: true },
            { form: 'Grzegorz', kind: 'language-form', language: 'polish', resolvesToCanonical: true },
            { form: 'Gregorio', kind: 'language-form', language: 'italian', resolvesToCanonical: true },
        ],
        relatedNames: [],
        confidence: 'well-attested',
        notes: [],
        provenance: ['classical-onomastics', 'sk-civil-calendar'],
    },
    {
        canonicalKey: 'albin',
        canonicalName: 'Albín',
        gender: 'masculine',
        origins: [
            {
                id: 'albin-latin-albus',
                sourceLanguage: 'latin',
                culture: { en: 'Roman', sk: 'Rímska' },
                derivation: [
                    { form: 'albus', language: 'latin', gloss: { en: 'white, bright', sk: 'biely, jasný' } },
                    { form: 'Albinus', language: 'latin', gloss: { en: 'a Roman cognomen, whitish, fair', sk: 'rímske prímenie s významom belavý, svetlý' } },
                ],
                gloss: { en: 'white, fair', sk: 'biely, svetlý' },
                confidence: 'well-attested',
                epistemicClass: 'etymological-fact',
                summary: {
                    en: 'A Roman cognomen transparently derived from albus, white. Names of this kind began as descriptive nicknames and were inherited within families long before they became Christian given names.',
                    sk: 'Rímske prímenie priehľadne odvodené zo slova albus, biely. Mená tohto druhu vznikali ako opisné prezývky a v rodinách sa dedili dávno predtým, než sa z nich stali kresťanské krstné mená.',
                },
                provenance: ['classical-onomastics'],
            },
        ],
        meaning: { literal: { en: 'white, fair', sk: 'biely, svetlý' } },
        culturalSpread: [
            { id: 'albin-central-europe', region: { en: 'Slovakia, Czechia, Poland', sk: 'Slovensko, Česko, Poľsko' }, forms: ['Albín', 'Albin'] },
            { id: 'albin-romance', region: { en: 'France, Italy', sk: 'Francúzsko, Taliansko' }, forms: ['Aubin', 'Albino'] },
        ],
        variants: [
            { form: 'Albin', kind: 'spelling', resolvesToCanonical: true },
            { form: 'Albino', kind: 'language-form', language: 'italian', resolvesToCanonical: true },
        ],
        relatedNames: [
            { canonicalKey: 'albert', relation: 'shares-root',
                note: { en: 'Not actually related: Albert is Germanic and only resembles Albín in sound.', sk: 'V skutočnosti nepríbuzné: Albert je germánske a s menom Albín sa zhoduje len zvukom.' } },
        ],
        confidence: 'well-attested',
        notes: [
            {
                id: 'albin-not-albert',
                kind: 'linguistic',
                text: {
                    en: 'Albín and Albert look alike but are unrelated. One is Latin albus, white; the other is Germanic adal, noble, plus beraht, bright.',
                    sk: 'Albín a Albert vyzerajú podobne, no nesúvisia. Jedno je z latinského albus, biely, druhé z germánskeho adal, urodzený, a beraht, jasný.',
                },
            },
        ],
        provenance: ['classical-onomastics', 'sk-civil-calendar'],
    },
    {
        canonicalKey: 'anezka',
        canonicalName: 'Anežka',
        gender: 'feminine',
        origins: [
            {
                id: 'anezka-greek-hagne',
                sourceLanguage: 'ancient-greek',
                culture: { en: 'Greek / early Christian', sk: 'Grécka / ranokresťanská' },
                derivation: [
                    { form: 'ἁγνή', language: 'ancient-greek', gloss: { en: 'chaste, pure, holy', sk: 'čistá, cudná, svätá' } },
                    { form: 'Agnes', language: 'latin', gloss: { en: 'the latinized form, borne by a Roman martyr', sk: 'polatinčená podoba, ktorú niesla rímska mučeníčka' } },
                    { form: 'Anežka', language: 'czech', gloss: { en: 'the West Slavic development', sk: 'západoslovanský vývin' } },
                ],
                gloss: { en: 'chaste, pure', sk: 'čistá, cudná' },
                confidence: 'well-attested',
                epistemicClass: 'etymological-fact',
                summary: {
                    en: 'The Czech and Slovak form of Agnes, from the Greek adjective meaning chaste or pure. It became a major Bohemian name through Agnes of Bohemia, the thirteenth-century Přemyslid princess.',
                    sk: 'Česká a slovenská podoba mena Agnes, z gréckeho prídavného mena s významom čistá či cudná. Významným českým menom sa stalo cez Anežku Českú, premyslovskú princeznú z 13. storočia.',
                },
                provenance: ['classical-onomastics'],
            },
            {
                id: 'anezka-latin-agnus',
                sourceLanguage: 'latin',
                culture: { en: 'Latin Christian', sk: 'Latinská kresťanská' },
                derivation: [
                    { form: 'agnus', language: 'latin', gloss: { en: 'lamb', sk: 'baránok' } },
                ],
                gloss: { en: 'lamb', sk: 'baránok' },
                confidence: 'uncertain',
                epistemicClass: 'folk-etymology',
                summary: {
                    en: 'From late antiquity the name was read through Latin agnus, lamb, which gave Saint Agnes her lamb in art and made the reading almost universal. It is a reinterpretation of a Greek name by Latin speakers, not its source.',
                    sk: 'Od neskorej antiky sa meno vykladalo cez latinské agnus, baránok, čo dalo svätej Agnes v umení jej baránka a výklad takmer zovšeobecnilo. Ide o prevýklad gréckeho mena latinsky hovoriacimi, nie o jeho zdroj.',
                },
                provenance: ['contested-etymology'],
            },
        ],
        meaning: { literal: { en: 'chaste, pure', sk: 'čistá, cudná' }, traditional: { en: 'lamb', sk: 'baránok' } },
        culturalSpread: [
            { id: 'anezka-west-slavic', region: { en: 'Czechia, Slovakia', sk: 'Česko, Slovensko' }, forms: ['Anežka'] },
            { id: 'anezka-western-europe', region: { en: 'Britain, France, Italy', sk: 'Británia, Francúzsko, Taliansko' }, forms: ['Agnes', 'Agnès', 'Agnese'] },
        ],
        variants: [
            { form: 'Agnes', kind: 'language-form', language: 'latin', resolvesToCanonical: true },
            { form: 'Neža', kind: 'diminutive', language: 'slovak', resolvesToCanonical: true },
        ],
        relatedNames: [
            { canonicalKey: 'agnesa', relation: 'shares-root',
                note: { en: 'The same name in its Latin-derived Slovak shape, kept as its own entry.', sk: 'To isté meno v slovenskej podobe odvodenej z latinčiny, vedené ako samostatná položka.' } },
        ],
        confidence: 'well-attested',
        notes: [
            {
                id: 'anezka-lamb-folk-etymology',
                kind: 'folk-etymology',
                text: {
                    en: 'The lamb reading is a Latin reinterpretation, not the origin. The name is Greek and means chaste; the lamb belongs to the saint\'s iconography rather than to her name.',
                    sk: 'Výklad cez baránka je latinský prevýklad, nie pôvod. Meno je grécke a znamená čistá; baránok patrí ikonografii svätice, nie jej menu.',
                },
            },
        ],
        provenance: ['classical-onomastics', 'contested-etymology', 'sk-civil-calendar'],
    },
    {
        canonicalKey: 'angela',
        canonicalName: 'Angela',
        gender: 'feminine',
        origins: [
            {
                id: 'angela-greek-angelos',
                sourceLanguage: 'ancient-greek',
                culture: { en: 'Greek / Latin Christian', sk: 'Grécka / latinská kresťanská' },
                derivation: [
                    { form: 'ἄγγελος', language: 'ancient-greek', gloss: { en: 'messenger; in Christian use, angel', sk: 'posol; v kresťanskom používaní anjel' } },
                    { form: 'angelus', language: 'latin', gloss: { en: 'the Latin borrowing', sk: 'latinská výpožička' } },
                    { form: 'Angela', language: 'latin', gloss: { en: 'used as a feminine personal name', sk: 'používané ako ženské osobné meno' } },
                ],
                gloss: { en: 'messenger, angel', sk: 'posol, anjel' },
                confidence: 'well-attested',
                epistemicClass: 'etymological-fact',
                summary: {
                    en: 'From the Greek word for a messenger, which Christian Greek and then Latin narrowed to mean an angel. The personal name is medieval Italian in origin and spread north from there.',
                    sk: 'Z gréckeho slova pre posla, ktorého význam kresťanská gréčtina a po nej latinčina zúžili na anjela. Osobné meno pochádza zo stredovekého Talianska a odtiaľ sa šírilo na sever.',
                },
                provenance: ['classical-onomastics'],
            },
        ],
        meaning: { literal: { en: 'messenger', sk: 'posol' }, traditional: { en: 'angel', sk: 'anjel' } },
        culturalSpread: [
            { id: 'angela-italy', region: { en: 'Italy', sk: 'Taliansko' }, forms: ['Angela'] },
            { id: 'angela-central-europe', region: { en: 'Slovakia, Czechia, Germany', sk: 'Slovensko, Česko, Nemecko' }, forms: ['Angela'] },
        ],
        variants: [
            { form: 'Angéla', kind: 'language-form', language: 'hungarian', resolvesToCanonical: true },
            { form: 'Anjela', kind: 'spelling', language: 'slovak', resolvesToCanonical: true },
        ],
        relatedNames: [
            { canonicalKey: 'angelika', relation: 'shares-root' },
        ],
        confidence: 'well-attested',
        notes: [],
        provenance: ['classical-onomastics', 'sk-civil-calendar'],
    },
    {
        canonicalKey: 'angelika',
        canonicalName: 'Angelika',
        gender: 'feminine',
        origins: [
            {
                id: 'angelika-latin-angelicus',
                sourceLanguage: 'latin',
                culture: { en: 'Latin Christian', sk: 'Latinská kresťanská' },
                derivation: [
                    { form: 'ἄγγελος', language: 'ancient-greek', gloss: { en: 'messenger, angel', sk: 'posol, anjel' } },
                    { form: 'angelicus', language: 'latin', gloss: { en: 'angelic, of an angel', sk: 'anjelský, patriaci anjelovi' } },
                    { form: 'Angelica', language: 'latin', gloss: { en: 'the feminine adjective used as a name', sk: 'ženské prídavné meno používané ako meno' } },
                ],
                gloss: { en: 'angelic', sk: 'anjelská' },
                confidence: 'well-attested',
                epistemicClass: 'etymological-fact',
                summary: {
                    en: 'The Latin adjective angelica, angelic, taken as a personal name. It is a separate formation from Angela, built on the adjective rather than the noun, and was carried across Europe by Renaissance romance literature.',
                    sk: 'Latinské prídavné meno angelica, teda anjelská, prevzaté ako osobné meno. Je to samostatné utvorenie, odlišné od mena Angela, lebo vychádza z prídavného mena, nie z podstatného, a po Európe ho rozniesla renesančná rytierska literatúra.',
                },
                provenance: ['classical-onomastics'],
            },
        ],
        meaning: { literal: { en: 'angelic', sk: 'anjelská' } },
        culturalSpread: [
            { id: 'angelika-central-europe', region: { en: 'Slovakia, Germany, Hungary', sk: 'Slovensko, Nemecko, Maďarsko' }, forms: ['Angelika'] },
            { id: 'angelika-romance', region: { en: 'Italy, France', sk: 'Taliansko, Francúzsko' }, forms: ['Angelica', 'Angélique'] },
        ],
        variants: [
            { form: 'Angelica', kind: 'language-form', language: 'italian', resolvesToCanonical: true },
            { form: 'Angélique', kind: 'language-form', language: 'french', resolvesToCanonical: true },
        ],
        relatedNames: [
            { canonicalKey: 'angela', relation: 'shares-root' },
        ],
        confidence: 'well-attested',
        notes: [],
        provenance: ['classical-onomastics', 'sk-civil-calendar'],
    },
    {
        canonicalKey: 'benadik',
        canonicalName: 'Beňadik',
        gender: 'masculine',
        origins: [
            {
                id: 'benadik-latin-benedictus',
                sourceLanguage: 'latin',
                culture: { en: 'Latin Christian', sk: 'Latinská kresťanská' },
                derivation: [
                    { form: 'bene', language: 'latin', gloss: { en: 'well', sk: 'dobre' } },
                    { form: 'dicere', language: 'latin', gloss: { en: 'to speak, to say', sk: 'hovoriť, povedať' } },
                    { form: 'benedictus', language: 'latin', gloss: { en: 'spoken well of, blessed', sk: 'dobre opísaný, požehnaný' } },
                    { form: 'Beňadik', language: 'slovak', gloss: { en: 'the older Slovak development of the name', sk: 'staršia slovenská podoba mena' } },
                ],
                gloss: { en: 'blessed, spoken well of', sk: 'požehnaný' },
                confidence: 'well-attested',
                epistemicClass: 'etymological-fact',
                summary: {
                    en: 'The older Slovak form of Benedict, from the Latin participle benedictus, literally well spoken of and so blessed. It spread with the Benedictine order, which is also why it survives in Slovak place names.',
                    sk: 'Staršia slovenská podoba mena Benedikt, z latinského príčastia benedictus, doslova dobre opísaný, teda požehnaný. Rozšírilo sa s benediktínskym rádom, preto sa zachovalo aj v slovenských miestnych názvoch.',
                },
                provenance: ['classical-onomastics'],
            },
        ],
        meaning: { literal: { en: 'spoken well of, blessed', sk: 'požehnaný' } },
        culturalSpread: [
            { id: 'benadik-slovakia', region: { en: 'Slovakia', sk: 'Slovensko' }, forms: ['Beňadik', 'Benedikt'] },
            { id: 'benadik-western-europe', region: { en: 'Italy, France, Britain', sk: 'Taliansko, Francúzsko, Británia' }, forms: ['Benedetto', 'Benoît', 'Benedict'] },
        ],
        variants: [
            { form: 'Benedikt', kind: 'spelling', language: 'slovak', resolvesToCanonical: false,
                note: { en: 'The learned Latin form, used alongside the older vernacular one.', sk: 'Učená latinská podoba používaná popri staršej ľudovej.' } },
        ],
        relatedNames: [],
        confidence: 'well-attested',
        notes: [],
        provenance: ['classical-onomastics', 'sk-civil-calendar'],
    },
    {
        canonicalKey: 'adrian',
        canonicalName: 'Adrián',
        gender: 'masculine',
        origins: [
            {
                id: 'adrian-latin-hadrianus',
                sourceLanguage: 'latin',
                culture: { en: 'Roman', sk: 'Rímska' },
                derivation: [
                    { form: 'Hadria', language: 'latin', gloss: { en: 'a town in northern Italy', sk: 'mesto v severnom Taliansku' } },
                    { form: 'Hadrianus', language: 'latin', gloss: { en: 'from Hadria', sk: 'z mesta Hadria' } },
                ],
                gloss: { en: 'from Hadria', sk: 'z mesta Hadria' },
                confidence: 'well-attested',
                epistemicClass: 'etymological-fact',
                summary: {
                    en: 'A Latin adjective of origin meaning from the town of Hadria, borne by the emperor Hadrian and later by several popes. The same town gave its name to the Adriatic Sea.',
                    sk: 'Latinské prídavné meno pôvodu s významom z mesta Hadria, ktoré nosil cisár Hadrián a neskôr viacerí pápeži. To isté mesto dalo meno aj Jadranskému moru.',
                },
                provenance: ['classical-onomastics'],
            },
        ],
        meaning: { literal: { en: 'from Hadria', sk: 'z mesta Hadria' } },
        culturalSpread: [
            { id: 'adrian-central-europe', region: { en: 'Slovakia, Czechia, Poland', sk: 'Slovensko, Česko, Poľsko' }, forms: ['Adrián', 'Adrian'] },
            { id: 'adrian-western-europe', region: { en: 'Britain, Netherlands, Italy', sk: 'Británia, Holandsko, Taliansko' }, forms: ['Adrian', 'Adriaan', 'Adriano'] },
        ],
        variants: [
            { form: 'Adrian', kind: 'spelling', resolvesToCanonical: true },
            { form: 'Adriano', kind: 'language-form', language: 'italian', resolvesToCanonical: true },
        ],
        relatedNames: [
            { canonicalKey: 'adriana', relation: 'feminine-form' },
        ],
        confidence: 'well-attested',
        notes: [],
        provenance: ['classical-onomastics', 'sk-civil-calendar'],
    },
    {
        canonicalKey: 'marian',
        canonicalName: 'Marián',
        gender: 'masculine',
        origins: [
            {
                id: 'marian-latin-marianus',
                sourceLanguage: 'latin',
                culture: { en: 'Roman', sk: 'Rímska' },
                derivation: [
                    { form: 'Marius', language: 'latin', gloss: { en: 'a Roman family name', sk: 'rímske rodové meno' } },
                    { form: 'Marianus', language: 'latin', gloss: { en: 'belonging to the Marius family', sk: 'patriaci k rodu Mariov' } },
                ],
                gloss: { en: 'of the Marius family', sk: 'z rodu Mariov' },
                confidence: 'well-attested',
                epistemicClass: 'etymological-fact',
                summary: {
                    en: 'A regular Latin derivative of the family name Marius, of the same type as Iulianus from Iulius. Roman derivatives in -anus originally marked adoption or family attachment.',
                    sk: 'Pravidelné latinské odvodenie z rodového mena Marius, rovnakého typu ako Iulianus z Iulius. Rímske odvodeniny na -anus pôvodne označovali adopciu alebo príslušnosť k rodu.',
                },
                provenance: ['classical-onomastics'],
            },
            {
                id: 'marian-marian-devotion',
                sourceLanguage: 'latin',
                culture: { en: 'Latin Christian', sk: 'Latinská kresťanská' },
                derivation: [
                    { form: 'Maria', language: 'latin', gloss: { en: 'Mary, the mother of Jesus', sk: 'Mária, matka Ježiša' } },
                    { form: 'Marianus', language: 'latin', gloss: { en: 'read as devoted to Mary', sk: 'vykladané ako zasvätený Márii' } },
                ],
                gloss: { en: 'devoted to Mary', sk: 'zasvätený Márii' },
                confidence: 'well-attested',
                epistemicClass: 'traditional-interpretation',
                summary: {
                    en: 'In Catholic Central Europe the name has long been used and understood as a masculine name honouring the Virgin Mary. That use is genuine and well documented, but it is a later reading of an existing Roman name rather than its derivation.',
                    sk: 'V katolíckej strednej Európe sa meno dlho používa a chápe ako mužské meno na počesť Panny Márie. Toto používanie je skutočné a dobre doložené, ide však o neskorší výklad existujúceho rímskeho mena, nie o jeho odvodenie.',
                },
                provenance: ['curated-summary', 'onomastic-consensus'],
            },
        ],
        meaning: { literal: { en: 'of the Marius family', sk: 'z rodu Mariov' }, traditional: { en: 'devoted to Mary', sk: 'zasvätený Márii' } },
        culturalSpread: [
            { id: 'marian-central-europe', region: { en: 'Slovakia, Czechia, Poland', sk: 'Slovensko, Česko, Poľsko' }, forms: ['Marián', 'Marian'] },
        ],
        variants: [
            { form: 'Marian', kind: 'spelling', language: 'polish', resolvesToCanonical: true },
            { form: 'Mariano', kind: 'language-form', language: 'italian', resolvesToCanonical: true },
        ],
        relatedNames: [
            { canonicalKey: 'mario', relation: 'shares-root' },
            { canonicalKey: 'maria', relation: 'shares-root',
                note: { en: 'Linked by the devotional reading only, not by descent.', sk: 'Spojené len nábožnou tradíciou, nie pôvodom.' } },
        ],
        confidence: 'well-attested',
        notes: [
            {
                id: 'marian-two-layers',
                kind: 'linguistic',
                text: {
                    en: 'The Roman derivation and the Marian devotion are both real, but they are different kinds of claim: one is where the name comes from, the other is what it has been taken to mean.',
                    sk: 'Rímske odvodenie aj mariánska úcta sú skutočné, ide však o dva rôzne druhy tvrdení: jedno hovorí, odkiaľ meno pochádza, druhé, ako sa chápe.',
                },
            },
        ],
        provenance: ['classical-onomastics', 'curated-summary', 'sk-civil-calendar'],
    },
    {
        canonicalKey: 'emanuel',
        canonicalName: 'Emanuel',
        gender: 'masculine',
        origins: [
            {
                id: 'emanuel-hebrew-immanuel',
                sourceLanguage: 'hebrew',
                culture: { en: 'Hebrew / biblical', sk: 'Hebrejská / biblická' },
                derivation: [
                    { form: 'ʿimmānū', language: 'hebrew', gloss: { en: 'with us', sk: 's nami' } },
                    { form: 'ʾel', language: 'hebrew', gloss: { en: 'God', sk: 'Boh' } },
                    { form: 'ʿImmānūʾēl', language: 'hebrew', gloss: { en: 'God is with us', sk: 'Boh s nami' } },
                    { form: 'Emmanuel', language: 'latin', gloss: { en: 'the form of the Latin Bible', sk: 'podoba z latinskej Biblie' } },
                ],
                gloss: { en: 'God is with us', sk: 'Boh s nami' },
                confidence: 'well-attested',
                epistemicClass: 'etymological-fact',
                summary: {
                    en: 'A transparent Hebrew sentence name, God is with us, from the sign given in Isaiah and quoted in Matthew. It came into general European use through Iberian royal usage in the late Middle Ages.',
                    sk: 'Priehľadné hebrejské vetné meno s významom Boh s nami, zo znamenia u Izaiáša, ktoré cituje Matúšovo evanjelium. Do bežného európskeho používania sa dostalo cez pyrenejské panovnícke rody na konci stredoveku.',
                },
                provenance: ['biblical-onomastics'],
            },
        ],
        meaning: { literal: { en: 'God is with us', sk: 'Boh s nami' } },
        culturalSpread: [
            { id: 'emanuel-iberia', region: { en: 'Portugal, Spain', sk: 'Portugalsko, Španielsko' }, forms: ['Manuel', 'Manoel'] },
            { id: 'emanuel-central-europe', region: { en: 'Slovakia, Czechia, Germany', sk: 'Slovensko, Česko, Nemecko' }, forms: ['Emanuel'] },
        ],
        variants: [
            { form: 'Manuel', kind: 'language-form', language: 'spanish', resolvesToCanonical: true },
            { form: 'Emmanuel', kind: 'spelling', language: 'french', resolvesToCanonical: true },
        ],
        relatedNames: [],
        confidence: 'well-attested',
        notes: [],
        provenance: ['biblical-onomastics', 'sk-civil-calendar'],
    },
    {
        canonicalKey: 'zita',
        canonicalName: 'Zita',
        gender: 'feminine',
        origins: [
            {
                id: 'zita-tuscan-girl',
                sourceLanguage: 'italian',
                culture: { en: 'Tuscan', sk: 'Toskánska' },
                region: { en: 'Lucca', sk: 'Lucca' },
                derivation: [
                    { form: 'zita', language: 'italian', gloss: { en: 'girl, young woman, in medieval Tuscan dialect', sk: 'dievča, mladá žena, v stredovekom toskánskom nárečí' } },
                    { form: 'Zita', language: 'italian', gloss: { en: 'the name of the thirteenth-century servant saint of Lucca', sk: 'meno slúžky a svätice z Luccy z 13. storočia' } },
                ],
                gloss: { en: 'girl, young woman', sk: 'dievča, mladá žena' },
                confidence: 'probable',
                epistemicClass: 'etymological-fact',
                summary: {
                    en: 'From a medieval Tuscan dialect word for a girl or young woman, which served as the name of the thirteenth-century servant saint of Lucca. It reached Central Europe much later, chiefly through Habsburg usage.',
                    sk: 'Zo stredovekého toskánskeho nárečového slova pre dievča či mladú ženu, ktoré slúžilo ako meno slúžky a svätice z Luccy z 13. storočia. Do strednej Európy sa dostalo oveľa neskôr, najmä cez habsburské prostredie.',
                },
                provenance: ['onomastic-consensus'],
            },
        ],
        meaning: { literal: { en: 'girl, young woman', sk: 'dievča, mladá žena' } },
        culturalSpread: [
            { id: 'zita-italy', region: { en: 'Italy', sk: 'Taliansko' }, forms: ['Zita'] },
            { id: 'zita-central-europe', region: { en: 'Slovakia, Hungary, Austria', sk: 'Slovensko, Maďarsko, Rakúsko' }, forms: ['Zita'] },
        ],
        variants: [],
        relatedNames: [],
        confidence: 'probable',
        notes: [],
        provenance: ['onomastic-consensus', 'sk-civil-calendar'],
    },
    {
        canonicalKey: 'izidor',
        canonicalName: 'Izidor',
        gender: 'masculine',
        origins: [
            {
                id: 'izidor-greek-isidoros',
                sourceLanguage: 'ancient-greek',
                culture: { en: 'Greek, from Hellenistic Egypt', sk: 'Grécka, z helenistického Egypta' },
                derivation: [
                    { form: 'Ἶσις', language: 'ancient-greek', gloss: { en: 'Isis, the Egyptian goddess', sk: 'Isis, egyptská bohyňa' } },
                    { form: 'δῶρον', language: 'ancient-greek', gloss: { en: 'gift', sk: 'dar' } },
                    { form: 'Ἰσίδωρος', language: 'ancient-greek', gloss: { en: 'gift of Isis', sk: 'dar Isidy' } },
                ],
                gloss: { en: 'gift of Isis', sk: 'dar Isidy' },
                confidence: 'well-attested',
                epistemicClass: 'etymological-fact',
                summary: {
                    en: 'A Greek compound meaning gift of Isis, formed in Hellenistic Egypt where the goddess had a wide following. Christians kept the name for its saints despite its pagan first element, which is why it survives at all.',
                    sk: 'Grécke zloženie s významom dar Isidy, utvorené v helenistickom Egypte, kde mala bohyňa veľa ctiteľov. Kresťania meno zachovali kvôli svojim svätcom napriek jeho pohanskému prvému prvku, a práve preto sa vôbec zachovalo.',
                },
                provenance: ['classical-onomastics'],
            },
        ],
        meaning: { literal: { en: 'gift of Isis', sk: 'dar Isidy' } },
        culturalSpread: [
            { id: 'izidor-central-europe', region: { en: 'Slovakia, Czechia, Hungary', sk: 'Slovensko, Česko, Maďarsko' }, forms: ['Izidor', 'Izidór'] },
            { id: 'izidor-iberia', region: { en: 'Spain', sk: 'Španielsko' }, forms: ['Isidro', 'Isidoro'] },
        ],
        variants: [
            { form: 'Isidor', kind: 'spelling', language: 'german', resolvesToCanonical: true },
            { form: 'Isidro', kind: 'language-form', language: 'spanish', resolvesToCanonical: true },
        ],
        relatedNames: [
            { canonicalKey: 'teodor', relation: 'shares-root',
                note: { en: 'Shares the -doros element meaning gift, not the first element.', sk: 'Zhoduje sa v prvku -doros s významom dar, nie v prvom prvku.' } },
        ],
        confidence: 'well-attested',
        notes: [],
        provenance: ['classical-onomastics', 'sk-civil-calendar'],
    },
    {
        canonicalKey: 'justina',
        canonicalName: 'Justína',
        gender: 'feminine',
        origins: [
            {
                id: 'justina-latin-iustus',
                sourceLanguage: 'latin',
                culture: { en: 'Roman / Latin Christian', sk: 'Rímska / latinská kresťanská' },
                derivation: [
                    { form: 'iustus', language: 'latin', gloss: { en: 'just, righteous, lawful', sk: 'spravodlivý, právoplatný' } },
                    { form: 'Iustinus', language: 'latin', gloss: { en: 'derived from Iustus', sk: 'odvodené z mena Iustus' } },
                    { form: 'Iustina', language: 'latin', gloss: { en: 'feminine form', sk: 'ženská podoba' } },
                ],
                gloss: { en: 'just, righteous', sk: 'spravodlivá' },
                confidence: 'well-attested',
                epistemicClass: 'etymological-fact',
                summary: {
                    en: 'A transparent Latin derivative of iustus, just or righteous, by way of the name Iustinus. It spread as a Christian name through early martyrs and remained common in Central Europe.',
                    sk: 'Priehľadné latinské odvodenie zo slova iustus, teda spravodlivý, cez meno Iustinus. Ako kresťanské meno ho rozšírili ranokresťanskí mučeníci a v strednej Európe ostalo bežné.',
                },
                provenance: ['classical-onomastics'],
            },
        ],
        meaning: { literal: { en: 'just, righteous', sk: 'spravodlivá' } },
        culturalSpread: [
            { id: 'justina-central-europe', region: { en: 'Slovakia, Poland, Czechia', sk: 'Slovensko, Poľsko, Česko' }, forms: ['Justína', 'Justyna'] },
            { id: 'justina-romance', region: { en: 'Italy, Spain', sk: 'Taliansko, Španielsko' }, forms: ['Giustina', 'Justina'] },
        ],
        variants: [
            { form: 'Justyna', kind: 'language-form', language: 'polish', resolvesToCanonical: true },
            { form: 'Giustina', kind: 'language-form', language: 'italian', resolvesToCanonical: true },
        ],
        relatedNames: [],
        confidence: 'well-attested',
        notes: [],
        provenance: ['classical-onomastics', 'sk-civil-calendar'],
    },
    {
        canonicalKey: 'valer',
        canonicalName: 'Valér',
        gender: 'masculine',
        origins: [
            {
                id: 'valer-latin-valerius',
                sourceLanguage: 'latin',
                culture: { en: 'Roman', sk: 'Rímska' },
                derivation: [
                    { form: 'valere', language: 'latin', gloss: { en: 'to be strong, to be in good health', sk: 'byť silný, byť zdravý' } },
                    { form: 'Valerius', language: 'latin', gloss: { en: 'an old Roman family name', sk: 'staré rímske rodové meno' } },
                    { form: 'Valér', language: 'slovak', gloss: { en: 'the shortened Central European form', sk: 'skrátená stredoeurópska podoba' } },
                ],
                gloss: { en: 'strong, healthy', sk: 'silný, zdravý' },
                confidence: 'well-attested',
                epistemicClass: 'etymological-fact',
                summary: {
                    en: 'From the old Roman family name Valerius, transparently built on the verb valere, to be strong or in good health. The short Slovak and Hungarian form Valér comes from the French Valère rather than directly from Latin.',
                    sk: 'Zo starého rímskeho rodového mena Valerius, priehľadne utvoreného zo slovesa valere, byť silný či zdravý. Krátka slovenská a maďarská podoba Valér pochádza z francúzskeho Valère, nie priamo z latinčiny.',
                },
                provenance: ['classical-onomastics'],
            },
        ],
        meaning: { literal: { en: 'strong, healthy', sk: 'silný, zdravý' } },
        culturalSpread: [
            { id: 'valer-central-europe', region: { en: 'Slovakia, Hungary', sk: 'Slovensko, Maďarsko' }, forms: ['Valér'] },
            { id: 'valer-romance', region: { en: 'France, Italy', sk: 'Francúzsko, Taliansko' }, forms: ['Valère', 'Valerio'] },
        ],
        variants: [
            { form: 'Valerián', kind: 'spelling', language: 'slovak', resolvesToCanonical: false,
                note: { en: 'A separate Latin derivative of the same family name.', sk: 'Samostatné latinské odvodenie z toho istého rodového mena.' } },
        ],
        relatedNames: [
            { canonicalKey: 'valeria', relation: 'feminine-form' },
        ],
        confidence: 'well-attested',
        notes: [],
        provenance: ['classical-onomastics', 'sk-civil-calendar'],
    },
    {
        canonicalKey: 'marcel',
        canonicalName: 'Marcel',
        gender: 'masculine',
        origins: [
            {
                id: 'marcel-latin-marcellus',
                sourceLanguage: 'latin',
                culture: { en: 'Roman', sk: 'Rímska' },
                derivation: [
                    { form: 'Marcus', language: 'latin', gloss: { en: 'an old Roman first name', sk: 'staré rímske osobné meno' } },
                    { form: 'Marcellus', language: 'latin', gloss: { en: 'little Marcus', sk: 'malý Marcus' } },
                ],
                gloss: { en: 'little Marcus', sk: 'malý Marcus' },
                confidence: 'well-attested',
                epistemicClass: 'etymological-fact',
                summary: {
                    en: 'A Latin diminutive of Marcus, which is itself usually connected to the god Mars though that step is less secure. The diminutive formation is beyond doubt; what stands behind Marcus is a separate question.',
                    sk: 'Latinská zdrobnenina mena Marcus, ktoré sa zvyčajne spája s bohom Marsom, hoci tento krok je menej istý. Utvorenie zdrobneniny je nesporné; čo stojí za menom Marcus, je samostatná otázka.',
                },
                provenance: ['classical-onomastics'],
            },
        ],
        meaning: { literal: { en: 'little Marcus', sk: 'malý Marcus' } },
        culturalSpread: [
            { id: 'marcel-central-europe', region: { en: 'Slovakia, Czechia, Poland', sk: 'Slovensko, Česko, Poľsko' }, forms: ['Marcel'] },
            { id: 'marcel-romance', region: { en: 'France, Italy, Spain', sk: 'Francúzsko, Taliansko, Španielsko' }, forms: ['Marcel', 'Marcello', 'Marcelo'] },
        ],
        variants: [
            { form: 'Marcello', kind: 'language-form', language: 'italian', resolvesToCanonical: true },
            { form: 'Marcelus', kind: 'spelling', resolvesToCanonical: true },
        ],
        relatedNames: [
            { canonicalKey: 'marek', relation: 'derived-from',
                note: { en: 'Marek is the Slovak form of Marcus, the base of the diminutive.', sk: 'Marek je slovenská podoba mena Marcus, základu tejto zdrobneniny.' } },
        ],
        confidence: 'well-attested',
        notes: [],
        provenance: ['classical-onomastics', 'sk-civil-calendar'],
    },
    {
        canonicalKey: 'florian',
        canonicalName: 'Florián',
        gender: 'masculine',
        origins: [
            {
                id: 'florian-latin-flos',
                sourceLanguage: 'latin',
                culture: { en: 'Roman / Latin Christian', sk: 'Rímska / latinská kresťanská' },
                derivation: [
                    { form: 'flos, floris', language: 'latin', gloss: { en: 'flower, blossom', sk: 'kvet' } },
                    { form: 'Florus', language: 'latin', gloss: { en: 'a Roman cognomen', sk: 'rímske prímenie' } },
                    { form: 'Florianus', language: 'latin', gloss: { en: 'derived from Florus', sk: 'odvodené z mena Florus' } },
                ],
                gloss: { en: 'flowering, blossoming', sk: 'kvitnúci' },
                confidence: 'well-attested',
                epistemicClass: 'etymological-fact',
                summary: {
                    en: 'A Latin derivative of the cognomen Florus, transparently built on flos, flower. It became a major Central European name through Florian of Lorch, martyred in the Roman province of Noricum.',
                    sk: 'Latinské odvodenie prímenia Florus, priehľadne utvorené zo slova flos, teda kvet. Významným stredoeurópskym menom sa stalo cez Floriána z Lorchu, umučeného v rímskej provincii Noricum.',
                },
                provenance: ['classical-onomastics'],
            },
        ],
        meaning: { literal: { en: 'flowering, blossoming', sk: 'kvitnúci' } },
        culturalSpread: [
            { id: 'florian-central-europe', region: { en: 'Slovakia, Austria, Poland, Czechia', sk: 'Slovensko, Rakúsko, Poľsko, Česko' }, forms: ['Florián', 'Florian'] },
            { id: 'florian-romance', region: { en: 'France, Italy', sk: 'Francúzsko, Taliansko' }, forms: ['Florian', 'Floriano'] },
        ],
        variants: [
            { form: 'Florian', kind: 'spelling', language: 'german', resolvesToCanonical: true },
        ],
        relatedNames: [],
        confidence: 'well-attested',
        notes: [],
        provenance: ['classical-onomastics', 'sk-civil-calendar'],
    },
    {
        canonicalKey: 'ingrida',
        canonicalName: 'Ingrida',
        gender: 'feminine',
        origins: [
            {
                id: 'ingrida-norse-ingfridr',
                sourceLanguage: 'old-norse',
                culture: { en: 'Norse / Scandinavian', sk: 'Severská / škandinávska' },
                derivation: [
                    { form: 'Yngvi', language: 'old-norse', gloss: { en: 'a name of the god Freyr', sk: 'jedno z mien boha Freya' } },
                    { form: 'fríðr', language: 'old-norse', gloss: { en: 'beautiful, fair', sk: 'krásna, pekná' } },
                    { form: 'Ingiríðr', language: 'old-norse', gloss: { en: 'fair one of Yngvi', sk: 'krásna Yngviho' } },
                    { form: 'Ingrida', language: 'slovak', gloss: { en: 'the Central European form, extended with -a', sk: 'stredoeurópska podoba rozšírená o -a' } },
                ],
                gloss: { en: 'fair, beautiful - of the god Yngvi', sk: 'krásna - patriaca bohu Yngvimu' },
                confidence: 'well-attested',
                epistemicClass: 'etymological-fact',
                summary: {
                    en: 'A Norse two-element name joining the divine name Yngvi to an element meaning beautiful or fair. The Slovak and Lithuanian shape with a final -a is a regular local adaptation of Scandinavian Ingrid.',
                    sk: 'Severské dvojčlenné meno spájajúce božské meno Yngvi s prvkom s významom krásna či pekná. Slovenská a litovská podoba s koncovým -a je pravidelné miestne prispôsobenie škandinávskeho mena Ingrid.',
                },
                provenance: ['germanic-onomastics'],
            },
        ],
        meaning: { literal: { en: 'fair one of Yngvi', sk: 'krásna Yngviho' } },
        culturalSpread: [
            { id: 'ingrida-scandinavia', region: { en: 'Sweden, Norway, Denmark', sk: 'Švédsko, Nórsko, Dánsko' }, forms: ['Ingrid'] },
            { id: 'ingrida-baltic-central', region: { en: 'Slovakia, Lithuania', sk: 'Slovensko, Litva' }, forms: ['Ingrida'] },
        ],
        variants: [
            { form: 'Ingrid', kind: 'language-form', resolvesToCanonical: false,
                note: { en: 'The Scandinavian form, kept as its own entry.', sk: 'Škandinávska podoba, vedená ako samostatná položka.' } },
        ],
        relatedNames: [
            { canonicalKey: 'ingrid', relation: 'shares-root' },
            { canonicalKey: 'igor', relation: 'shares-root',
                note: { en: 'Shares the divine element Yngvi.', sk: 'Zhoduje sa v božskom prvku Yngvi.' } },
        ],
        confidence: 'well-attested',
        notes: [],
        provenance: ['germanic-onomastics', 'sk-civil-calendar'],
    },
    {
        canonicalKey: 'pankrac',
        canonicalName: 'Pankrác',
        gender: 'masculine',
        origins: [
            {
                id: 'pankrac-greek-pankratios',
                sourceLanguage: 'ancient-greek',
                culture: { en: 'Greek / early Christian', sk: 'Grécka / ranokresťanská' },
                derivation: [
                    { form: 'πᾶν', language: 'ancient-greek', gloss: { en: 'all, every', sk: 'všetok, každý' } },
                    { form: 'κράτος', language: 'ancient-greek', gloss: { en: 'power, strength, rule', sk: 'moc, sila, vláda' } },
                    { form: 'Παγκράτιος', language: 'ancient-greek', gloss: { en: 'all-powerful', sk: 'všemocný' } },
                ],
                gloss: { en: 'all-powerful', sk: 'všemocný' },
                confidence: 'well-attested',
                epistemicClass: 'etymological-fact',
                summary: {
                    en: 'A transparent Greek compound of pan, all, and kratos, power, the same second element as in aristocrat and democrat. It reached Central Europe through the Roman boy martyr Pancratius.',
                    sk: 'Priehľadné grécke zloženie slov pan, teda všetko, a kratos, teda moc, s tým istým druhým prvkom ako v slovách aristokrat či demokrat. Do strednej Európy sa dostalo cez rímskeho chlapčenského mučeníka Pankráca.',
                },
                provenance: ['classical-onomastics'],
            },
        ],
        meaning: { literal: { en: 'all-powerful', sk: 'všemocný' } },
        culturalSpread: [
            { id: 'pankrac-central-europe', region: { en: 'Slovakia, Czechia, Germany', sk: 'Slovensko, Česko, Nemecko' }, forms: ['Pankrác', 'Pankratius'] },
            { id: 'pankrac-western-europe', region: { en: 'Britain, Italy', sk: 'Británia, Taliansko' }, forms: ['Pancras', 'Pancrazio'] },
        ],
        variants: [
            { form: 'Pankratius', kind: 'language-form', language: 'latin', resolvesToCanonical: true },
        ],
        relatedNames: [],
        confidence: 'well-attested',
        notes: [
            {
                id: 'pankrac-frost-saints',
                kind: 'usage',
                text: {
                    en: 'In Central Europe Pankrác is remembered mainly as one of the mid-May frost saints. That is a calendar association, not part of the name\'s meaning.',
                    sk: 'V strednej Európe sa Pankrác pripomína najmä ako jeden z májových zamrznutých mužov. Ide o kalendárnu súvislosť, nie o súčasť významu mena.',
                },
            },
        ],
        provenance: ['classical-onomastics', 'sk-civil-calendar'],
    },
    {
        canonicalKey: 'bonifac',
        canonicalName: 'Bonifác',
        gender: 'masculine',
        origins: [
            {
                id: 'bonifac-latin-bonum-fatum',
                sourceLanguage: 'latin',
                culture: { en: 'Roman', sk: 'Rímska' },
                derivation: [
                    { form: 'bonum', language: 'latin', gloss: { en: 'good', sk: 'dobrý' } },
                    { form: 'fatum', language: 'latin', gloss: { en: 'fate, destiny', sk: 'osud' } },
                    { form: 'Bonifatius', language: 'latin', gloss: { en: 'of good fate, fortunate', sk: 'dobrého osudu, šťastný' } },
                ],
                gloss: { en: 'of good fate, fortunate', sk: 'dobrého osudu, šťastný' },
                confidence: 'well-attested',
                epistemicClass: 'etymological-fact',
                summary: {
                    en: 'The oldest recorded spelling is Bonifatius, from bonum fatum, good fate - an ordinary Roman wish-name of the kind common in late antiquity. The inscriptions preserve the -t- spelling consistently.',
                    sk: 'Najstarší doložený zápis je Bonifatius, z bonum fatum, teda dobrý osud - bežné rímske prianie v mene, aké boli v neskorej antike časté. Nápisy zachovávajú zápis s -t- dôsledne.',
                },
                provenance: ['classical-onomastics'],
            },
            {
                id: 'bonifac-bonum-facere',
                sourceLanguage: 'latin',
                culture: { en: 'Latin Christian', sk: 'Latinská kresťanská' },
                derivation: [
                    { form: 'bonum facere', language: 'latin', gloss: { en: 'to do good', sk: 'konať dobro' } },
                    { form: 'Bonifacius', language: 'latin', gloss: { en: 'the respelled medieval form', sk: 'prepísaná stredoveká podoba' } },
                ],
                gloss: { en: 'doer of good', sk: 'ten, kto koná dobro' },
                confidence: 'uncertain',
                epistemicClass: 'folk-etymology',
                summary: {
                    en: 'In the Middle Ages the name was respelled with -c- and read as doer of good, which is how it is still usually explained. The reinterpretation is real and left its mark on the spelling, but it is not where the name came from.',
                    sk: 'V stredoveku sa meno prepísalo s -c- a vykladalo ako ten, kto koná dobro, a tak sa vysvetľuje dodnes. Tento prevýklad je skutočný a zanechal stopu v pravopise, nie je však pôvodom mena.',
                },
                provenance: ['contested-etymology'],
            },
        ],
        meaning: { literal: { en: 'of good fate', sk: 'dobrého osudu' }, traditional: { en: 'doer of good', sk: 'ten, kto koná dobro' } },
        culturalSpread: [
            { id: 'bonifac-central-europe', region: { en: 'Slovakia, Czechia, Germany', sk: 'Slovensko, Česko, Nemecko' }, forms: ['Bonifác', 'Bonifatius'] },
            { id: 'bonifac-romance', region: { en: 'Italy, France', sk: 'Taliansko, Francúzsko' }, forms: ['Bonifacio', 'Boniface'] },
        ],
        variants: [
            { form: 'Bonifác', kind: 'spelling', language: 'slovak', resolvesToCanonical: true },
            { form: 'Boniface', kind: 'language-form', language: 'french', resolvesToCanonical: true },
        ],
        relatedNames: [],
        confidence: 'well-attested',
        notes: [
            {
                id: 'bonifac-respelling',
                kind: 'folk-etymology',
                text: {
                    en: 'A rare case where a folk etymology changed the spelling itself: Bonifatius became Bonifacius because readers heard facere, to do, in it. The original had fatum, fate.',
                    sk: 'Zriedkavý prípad, keď ľudový výklad zmenil samotný pravopis: z Bonifatius sa stal Bonifacius, lebo čitatelia v mene počuli facere, konať. Pôvodné meno malo fatum, osud.',
                },
            },
        ],
        provenance: ['classical-onomastics', 'contested-etymology', 'sk-civil-calendar'],
    },
    {
        canonicalKey: 'viola',
        canonicalName: 'Viola',
        gender: 'feminine',
        origins: [
            {
                id: 'viola-latin-viola',
                sourceLanguage: 'latin',
                culture: { en: 'Roman / Italian', sk: 'Rímska / talianska' },
                derivation: [
                    { form: 'viola', language: 'latin', gloss: { en: 'violet, the flower', sk: 'fialka' } },
                    { form: 'Viola', language: 'italian', gloss: { en: 'used as a personal name', sk: 'používané ako osobné meno' } },
                ],
                gloss: { en: 'violet', sk: 'fialka' },
                confidence: 'well-attested',
                epistemicClass: 'etymological-fact',
                summary: {
                    en: 'The ordinary Latin word for the violet, taken directly as a personal name in medieval Italy and spread across Europe by Renaissance literature. It is a plant name in the plainest sense.',
                    sk: 'Bežné latinské slovo pre fialku, prevzaté priamo ako osobné meno v stredovekom Taliansku a rozšírené po Európe renesančnou literatúrou. Ide o rastlinné meno v najjednoduchšom zmysle.',
                },
                provenance: ['classical-onomastics'],
            },
        ],
        meaning: { literal: { en: 'violet', sk: 'fialka' } },
        culturalSpread: [
            { id: 'viola-italy', region: { en: 'Italy', sk: 'Taliansko' }, forms: ['Viola'] },
            { id: 'viola-central-europe', region: { en: 'Slovakia, Hungary, Czechia', sk: 'Slovensko, Maďarsko, Česko' }, forms: ['Viola'] },
        ],
        variants: [
            { form: 'Violeta', kind: 'language-form', language: 'spanish', resolvesToCanonical: false,
                note: { en: 'A diminutive that became an independent name.', sk: 'Zdrobnenina, ktorá sa osamostatnila.' } },
            { form: 'Violka', kind: 'diminutive', language: 'slovak', resolvesToCanonical: true },
        ],
        relatedNames: [],
        confidence: 'well-attested',
        notes: [],
        provenance: ['classical-onomastics', 'sk-civil-calendar'],
    },
    {
        canonicalKey: 'juliana',
        canonicalName: 'Juliána',
        gender: 'feminine',
        origins: [
            {
                id: 'juliana-latin-iulianus',
                sourceLanguage: 'latin',
                culture: { en: 'Roman', sk: 'Rímska' },
                derivation: [
                    { form: 'Iulius', language: 'latin', gloss: { en: 'a Roman family name', sk: 'rímske rodové meno' } },
                    { form: 'Iulianus', language: 'latin', gloss: { en: 'belonging to the Julian family', sk: 'patriaci k júlovskému rodu' } },
                    { form: 'Iuliana', language: 'latin', gloss: { en: 'feminine form', sk: 'ženská podoba' } },
                ],
                gloss: { en: 'of the Julian family', sk: 'z júlovského rodu' },
                confidence: 'well-attested',
                epistemicClass: 'etymological-fact',
                summary: {
                    en: 'A regular Latin derivative in -anus of the family name Iulius, in its feminine form. Derivatives of this type originally marked adoption into a family, and later simply became names.',
                    sk: 'Pravidelné latinské odvodenie príponou -anus z rodového mena Iulius, v ženskej podobe. Odvodeniny tohto typu pôvodne označovali prijatie do rodu a neskôr sa z nich stali jednoducho mená.',
                },
                provenance: ['classical-onomastics'],
            },
        ],
        meaning: { literal: { en: 'of the Julian family', sk: 'z júlovského rodu' } },
        culturalSpread: [
            { id: 'juliana-central-europe', region: { en: 'Slovakia, Czechia, Netherlands', sk: 'Slovensko, Česko, Holandsko' }, forms: ['Juliana'] },
            { id: 'juliana-romance', region: { en: 'Italy, Spain', sk: 'Taliansko, Španielsko' }, forms: ['Giuliana', 'Juliana'] },
        ],
        variants: [
            { form: 'Giuliana', kind: 'language-form', language: 'italian', resolvesToCanonical: true },
            { form: 'Julianna', kind: 'language-form', language: 'hungarian', resolvesToCanonical: true },
        ],
        relatedNames: [
            { canonicalKey: 'julia', relation: 'shares-root' },
            { canonicalKey: 'julius', relation: 'derived-from' },
        ],
        confidence: 'well-attested',
        notes: [],
        provenance: ['classical-onomastics', 'sk-civil-calendar'],
    },
    {
        canonicalKey: 'petronela',
        canonicalName: 'Petronela',
        gender: 'feminine',
        origins: [
            {
                id: 'petronela-latin-petronius',
                sourceLanguage: 'latin',
                culture: { en: 'Roman', sk: 'Rímska' },
                derivation: [
                    { form: 'Petronius', language: 'latin', gloss: { en: 'a Roman family name', sk: 'rímske rodové meno' } },
                    { form: 'Petronilla', language: 'latin', gloss: { en: 'a diminutive of the feminine Petronia', sk: 'zdrobnenina ženskej podoby Petronia' } },
                ],
                gloss: { en: 'of the Petronius family', sk: 'z rodu Petroniov' },
                confidence: 'probable',
                epistemicClass: 'etymological-fact',
                summary: {
                    en: 'A Latin diminutive of the family name Petronius, borne by a Roman martyr buried in the catacomb of Domitilla. The family name itself has no secure meaning.',
                    sk: 'Latinská zdrobnenina rodového mena Petronius, ktorú niesla rímska mučeníčka pochovaná v Domitilliných katakombách. Samotné rodové meno spoľahlivý význam nemá.',
                },
                provenance: ['classical-onomastics'],
            },
            {
                id: 'petronela-peter-association',
                sourceLanguage: 'latin',
                culture: { en: 'Latin Christian', sk: 'Latinská kresťanská' },
                derivation: [
                    { form: 'Petrus', language: 'latin', gloss: { en: 'Peter', sk: 'Peter' } },
                    { form: 'Petronilla', language: 'latin', gloss: { en: 'read as a little Petra, daughter of Peter', sk: 'vykladané ako malá Petra, dcéra Petrova' } },
                ],
                gloss: { en: 'little rock', sk: 'malá skala' },
                confidence: 'uncertain',
                epistemicClass: 'folk-etymology',
                summary: {
                    en: 'Because the name resembles Petrus, medieval legend made Petronilla the daughter of the apostle Peter, and the name is still often explained as little rock. The resemblance is accidental: the two names come from different Latin families.',
                    sk: 'Pre podobnosť s menom Petrus urobila stredoveká legenda z Petronely dcéru apoštola Petra a meno sa dodnes často vysvetľuje ako malá skala. Podobnosť je náhodná: obe mená pochádzajú z iných latinských rodov.',
                },
                provenance: ['contested-etymology'],
            },
        ],
        meaning: { literal: { en: 'of the Petronius family', sk: 'z rodu Petroniov' } },
        culturalSpread: [
            { id: 'petronela-central-europe', region: { en: 'Slovakia, Czechia, Poland', sk: 'Slovensko, Česko, Poľsko' }, forms: ['Petronela'] },
            { id: 'petronela-romance', region: { en: 'Italy, France', sk: 'Taliansko, Francúzsko' }, forms: ['Petronilla', 'Pétronille'] },
        ],
        variants: [
            { form: 'Petronilla', kind: 'language-form', language: 'latin', resolvesToCanonical: true },
        ],
        relatedNames: [
            { canonicalKey: 'peter', relation: 'shares-root',
                note: { en: 'Linked by legend and sound only, not by derivation.', sk: 'Spojené len legendou a zvukom, nie odvodením.' } },
        ],
        confidence: 'probable',
        notes: [
            {
                id: 'petronela-not-daughter-of-peter',
                kind: 'folk-etymology',
                text: {
                    en: 'Petronela is not a form of Petra and not derived from Peter. The medieval story that made her the apostle\'s daughter grew out of the similar sound of the two names.',
                    sk: 'Petronela nie je podobou mena Petra ani nie je odvodená z mena Peter. Stredoveký príbeh, ktorý z nej urobil apoštolovu dcéru, vyrástol z podobného znenia oboch mien.',
                },
            },
        ],
        provenance: ['classical-onomastics', 'contested-etymology', 'sk-civil-calendar'],
    },
    {
        canonicalKey: 'zaneta',
        canonicalName: 'Žaneta',
        gender: 'feminine',
        origins: [
            {
                id: 'zaneta-french-jeannette',
                sourceLanguage: 'french',
                culture: { en: 'French, from the Hebrew biblical name', sk: 'Francúzska, z hebrejského biblického mena' },
                derivation: [
                    { form: 'Yôḥānān', language: 'hebrew', gloss: { en: 'Yahweh is gracious', sk: 'Jahve je milostivý' } },
                    { form: 'Iohannes', language: 'latin', gloss: { en: 'the Latin form of the biblical name', sk: 'latinská podoba biblického mena' } },
                    { form: 'Jeanne', language: 'french', gloss: { en: 'the French feminine form', sk: 'francúzska ženská podoba' } },
                    { form: 'Jeannette', language: 'french', gloss: { en: 'diminutive of Jeanne', sk: 'zdrobnenina mena Jeanne' } },
                ],
                gloss: { en: 'Yahweh is gracious', sk: 'Jahve je milostivý' },
                confidence: 'well-attested',
                epistemicClass: 'etymological-fact',
                summary: {
                    en: 'The Slovak and Czech spelling of French Jeannette, a diminutive of Jeanne, which is the feminine of Jean and so ultimately of the Hebrew name John. The chain is entirely documented.',
                    sk: 'Slovenský a český zápis francúzskeho mena Jeannette, zdrobneniny mena Jeanne, ktoré je ženskou podobou mena Jean, a teda v konečnom dôsledku hebrejského mena Ján. Celá reťaz je doložená.',
                },
                provenance: ['biblical-onomastics', 'onomastic-consensus'],
            },
        ],
        meaning: { literal: { en: 'Yahweh is gracious', sk: 'Jahve je milostivý' } },
        culturalSpread: [
            { id: 'zaneta-france', region: { en: 'France', sk: 'Francúzsko' }, forms: ['Jeannette'] },
            { id: 'zaneta-west-slavic', region: { en: 'Slovakia, Czechia, Poland', sk: 'Slovensko, Česko, Poľsko' }, forms: ['Žaneta'] },
        ],
        variants: [
            { form: 'Jeannette', kind: 'language-form', language: 'french', resolvesToCanonical: true },
            { form: 'Janeta', kind: 'spelling', resolvesToCanonical: true },
        ],
        relatedNames: [
            { canonicalKey: 'jana', relation: 'shares-root' },
            { canonicalKey: 'jan', relation: 'shares-root' },
        ],
        confidence: 'well-attested',
        notes: [],
        provenance: ['biblical-onomastics', 'sk-civil-calendar'],
    },
    {
        canonicalKey: 'laura',
        canonicalName: 'Laura',
        gender: 'feminine',
        origins: [
            {
                id: 'laura-latin-laurus',
                sourceLanguage: 'latin',
                culture: { en: 'Roman / Italian', sk: 'Rímska / talianska' },
                derivation: [
                    { form: 'laurus', language: 'latin', gloss: { en: 'laurel, bay tree', sk: 'vavrín' } },
                    { form: 'Laurus', language: 'latin', gloss: { en: 'a late Roman personal name', sk: 'neskororímske osobné meno' } },
                    { form: 'Laura', language: 'italian', gloss: { en: 'the feminine form', sk: 'ženská podoba' } },
                ],
                gloss: { en: 'laurel', sk: 'vavrín' },
                confidence: 'well-attested',
                epistemicClass: 'etymological-fact',
                summary: {
                    en: 'From the Latin word for the laurel, the tree whose wreath crowned victors and poets. The name spread across Europe after Petrarch made his Laura the subject of the most imitated sonnet sequence of the Middle Ages.',
                    sk: 'Z latinského slova pre vavrín, strom, ktorého vencom sa korunovali víťazi a básnici. Meno sa rozšírilo po Európe potom, ako Petrarca urobil zo svojej Laury námet najnapodobňovanejšieho sonetového cyklu stredoveku.',
                },
                provenance: ['classical-onomastics'],
            },
        ],
        meaning: { literal: { en: 'laurel', sk: 'vavrín' } },
        culturalSpread: [
            { id: 'laura-romance', region: { en: 'Italy, Spain, France', sk: 'Taliansko, Španielsko, Francúzsko' }, forms: ['Laura'] },
            { id: 'laura-central-europe', region: { en: 'Slovakia, Czechia, Germany', sk: 'Slovensko, Česko, Nemecko' }, forms: ['Laura'] },
        ],
        variants: [
            { form: 'Laurika', kind: 'diminutive', language: 'slovak', resolvesToCanonical: true },
        ],
        relatedNames: [
            { canonicalKey: 'vavrinec', relation: 'shares-root',
                note: { en: 'Vavrinec is the Slovak form of Laurentius, from the same laurel word.', sk: 'Vavrinec je slovenská podoba mena Laurentius, z toho istého slova pre vavrín.' } },
        ],
        confidence: 'well-attested',
        notes: [],
        provenance: ['classical-onomastics', 'sk-civil-calendar'],
    },
    {
        canonicalKey: 'vit',
        canonicalName: 'Vít',
        gender: 'masculine',
        origins: [
            {
                id: 'vit-latin-vitus',
                sourceLanguage: 'latin',
                culture: { en: 'Roman / Latin Christian', sk: 'Rímska / latinská kresťanská' },
                derivation: [
                    { form: 'vita', language: 'latin', gloss: { en: 'life', sk: 'život' } },
                    { form: 'Vitus', language: 'latin', gloss: { en: 'a Roman personal name, borne by a Sicilian martyr', sk: 'rímske osobné meno, ktoré niesol sicílsky mučeník' } },
                ],
                gloss: { en: 'life', sk: 'život' },
                confidence: 'probable',
                epistemicClass: 'etymological-fact',
                summary: {
                    en: 'The usual derivation connects the Roman name Vitus to vita, life. The saint of that name became one of the great patrons of Bohemia, which is how the name entered Czech and Slovak use.',
                    sk: 'Bežné odvodenie spája rímske meno Vitus so slovom vita, teda život. Svätec tohto mena sa stal jedným z hlavných patrónov Čiech, a tak sa meno dostalo do českého a slovenského používania.',
                },
                provenance: ['classical-onomastics'],
            },
        ],
        meaning: { literal: { en: 'life', sk: 'život' } },
        history: {
            en: 'The relics of Saint Vitus reached Prague in the tenth century and the cathedral built over them made the name central to Bohemian identity. Its Slovak use follows from that Czech prominence rather than from a local cult.',
            sk: 'Relikvie svätého Víta sa dostali do Prahy v 10. storočí a katedrála postavená nad nimi urobila z mena súčasť českej identity. Slovenské používanie vyplýva z tohto českého významu, nie z miestneho kultu.',
        },
        culturalSpread: [
            { id: 'vit-west-slavic', region: { en: 'Czechia, Slovakia', sk: 'Česko, Slovensko' }, forms: ['Vít'] },
            { id: 'vit-germanic', region: { en: 'Germany', sk: 'Nemecko' }, forms: ['Veit'] },
        ],
        variants: [
            { form: 'Veit', kind: 'language-form', language: 'german', resolvesToCanonical: true },
            { form: 'Vitus', kind: 'language-form', language: 'latin', resolvesToCanonical: true },
        ],
        relatedNames: [],
        confidence: 'probable',
        notes: [
            {
                id: 'vit-svantovit-conflation',
                kind: 'folk-etymology',
                text: {
                    en: 'The similarity between Saint Vitus and the Slavic deity Svantovit produced a long-standing story that one replaced the other. Whatever happened in cult practice, the personal name Vít is Latin and is not derived from the deity.',
                    sk: 'Podobnosť medzi svätým Vítom a slovanským božstvom Svantovít dala vzniknúť dlho tradovanému príbehu, že jedno nahradilo druhé. Nech sa v kulte stalo čokoľvek, osobné meno Vít je latinské a z božstva odvodené nie je.',
                },
            },
        ],
        provenance: ['classical-onomastics', 'contested-etymology', 'sk-civil-calendar'],
    },
    {
        canonicalKey: 'blanka',
        canonicalName: 'Blanka',
        gender: 'feminine',
        origins: [
            {
                id: 'blanka-germanic-blank',
                sourceLanguage: 'proto-germanic',
                culture: { en: 'Germanic, by way of Romance', sk: 'Germánska, cez románske jazyky' },
                derivation: [
                    { form: 'blankaz', language: 'proto-germanic', reconstructed: true, gloss: { en: 'white, shining, bright', sk: 'biely, žiarivý, jasný' } },
                    { form: 'blanc', language: 'french', gloss: { en: 'white', sk: 'biely' } },
                    { form: 'Blanca', language: 'spanish', gloss: { en: 'used as a personal name in medieval Iberia', sk: 'používané ako osobné meno v stredovekej Ibérii' } },
                    { form: 'Blanka', language: 'czech', gloss: { en: 'the Central European form', sk: 'stredoeurópska podoba' } },
                ],
                gloss: { en: 'white, shining', sk: 'biela, žiarivá' },
                confidence: 'well-attested',
                epistemicClass: 'etymological-fact',
                summary: {
                    en: 'From a Germanic word for white or shining that passed into the Romance languages as blanc and blanca, and was used as a personal name by medieval Iberian and French royalty. It reached Bohemia with Blanche of Valois in the fourteenth century.',
                    sk: 'Z germánskeho slova pre bielu či žiarivú farbu, ktoré prešlo do románskych jazykov ako blanc a blanca a ktoré ako osobné meno používali stredoveké panovnícke rody v Ibérii a Francúzsku. Do Čiech sa dostalo s Blankou z Valois v 14. storočí.',
                },
                provenance: ['germanic-onomastics', 'onomastic-consensus'],
            },
        ],
        meaning: { literal: { en: 'white, shining', sk: 'biela, žiarivá' } },
        culturalSpread: [
            { id: 'blanka-iberia-france', region: { en: 'Spain, France', sk: 'Španielsko, Francúzsko' }, forms: ['Blanca', 'Blanche'] },
            { id: 'blanka-west-slavic', region: { en: 'Czechia, Slovakia', sk: 'Česko, Slovensko' }, forms: ['Blanka'] },
        ],
        variants: [
            { form: 'Blanche', kind: 'language-form', language: 'french', resolvesToCanonical: true },
            { form: 'Blanca', kind: 'language-form', language: 'spanish', resolvesToCanonical: true },
        ],
        relatedNames: [],
        confidence: 'well-attested',
        notes: [],
        provenance: ['germanic-onomastics', 'sk-civil-calendar'],
    },
    {
        canonicalKey: 'sidonia',
        canonicalName: 'Sidónia',
        gender: 'feminine',
        origins: [
            {
                id: 'sidonia-latin-sidonius',
                sourceLanguage: 'latin',
                culture: { en: 'Roman / Latin Christian', sk: 'Rímska / latinská kresťanská' },
                derivation: [
                    { form: 'Sidon', language: 'phoenician', gloss: { en: 'the Phoenician port city, now Saida in Lebanon', sk: 'fenické prístavné mesto, dnes Sajdá v Libanone' } },
                    { form: 'Sidonius', language: 'latin', gloss: { en: 'of Sidon, Sidonian', sk: 'zo Sidonu, sidonský' } },
                    { form: 'Sidonia', language: 'latin', gloss: { en: 'feminine form', sk: 'ženská podoba' } },
                ],
                gloss: { en: 'woman of Sidon', sk: 'žena zo Sidonu' },
                confidence: 'probable',
                epistemicClass: 'etymological-fact',
                summary: {
                    en: 'A Latin adjective of origin meaning of Sidon, the Phoenician city, used as a personal name in late antiquity and revived in Central Europe. It is an ethnic or place-based name, not a descriptive one.',
                    sk: 'Latinské prídavné meno pôvodu s významom zo Sidonu, fenického mesta, používané ako osobné meno v neskorej antike a obnovené v strednej Európe. Ide o meno podľa miesta či pôvodu, nie o opisné meno.',
                },
                provenance: ['classical-onomastics'],
            },
        ],
        meaning: { literal: { en: 'woman of Sidon', sk: 'žena zo Sidonu' } },
        culturalSpread: [
            { id: 'sidonia-central-europe', region: { en: 'Slovakia, Hungary, Germany', sk: 'Slovensko, Maďarsko, Nemecko' }, forms: ['Sidónia', 'Sidonie'] },
        ],
        variants: [
            { form: 'Sidonie', kind: 'language-form', language: 'czech', resolvesToCanonical: true },
        ],
        relatedNames: [],
        confidence: 'probable',
        notes: [
            {
                id: 'sidonia-linen-folk-etymology',
                kind: 'folk-etymology',
                text: {
                    en: 'The name is sometimes explained from Greek sindon, fine linen, on the strength of sound alone. The place name Sidon is the source that the Latin form actually points to.',
                    sk: 'Meno sa občas vysvetľuje z gréckeho sindon, teda jemné plátno, iba na základe zvukovej podobnosti. Latinská podoba v skutočnosti ukazuje na miestne meno Sidon.',
                },
            },
        ],
        provenance: ['classical-onomastics', 'sk-civil-calendar'],
    },
    {
        canonicalKey: 'perla',
        canonicalName: 'Perla',
        gender: 'feminine',
        origins: [
            {
                id: 'perla-latin-perla',
                sourceLanguage: 'latin',
                culture: { en: 'Romance', sk: 'Románska' },
                derivation: [
                    { form: 'perla', language: 'latin', gloss: { en: 'pearl, in medieval Latin', sk: 'perla, v stredovekej latinčine' } },
                    { form: 'perla', language: 'italian', gloss: { en: 'pearl', sk: 'perla' } },
                ],
                gloss: { en: 'pearl', sk: 'perla' },
                confidence: 'well-attested',
                epistemicClass: 'etymological-fact',
                summary: {
                    en: 'The Romance word for a pearl, taken directly as a personal name. The word itself is medieval Latin and its own earlier history is disputed, but that the name comes from the word for a pearl is not.',
                    sk: 'Románske slovo pre perlu, prevzaté priamo ako osobné meno. Samotné slovo je stredovekolatinské a jeho staršie dejiny sú sporné, no že meno pochádza zo slova pre perlu, sporné nie je.',
                },
                provenance: ['classical-onomastics', 'onomastic-consensus'],
            },
        ],
        meaning: { literal: { en: 'pearl', sk: 'perla' } },
        culturalSpread: [
            { id: 'perla-romance', region: { en: 'Italy, Spain', sk: 'Taliansko, Španielsko' }, forms: ['Perla'] },
            { id: 'perla-central-europe', region: { en: 'Slovakia, Hungary', sk: 'Slovensko, Maďarsko' }, forms: ['Perla'] },
        ],
        variants: [],
        relatedNames: [
            { canonicalKey: 'margareta', relation: 'cognate',
                note: { en: 'Margaréta also means pearl, but through Greek margarites - a parallel, not a shared root.', sk: 'Aj Margaréta znamená perla, no cez grécke margarites - ide o súbežné meno, nie o spoločný koreň.' } },
        ],
        confidence: 'well-attested',
        notes: [],
        provenance: ['classical-onomastics', 'sk-civil-calendar'],
    },
    {
        canonicalKey: 'dezider',
        canonicalName: 'Dezider',
        gender: 'masculine',
        origins: [
            {
                id: 'dezider-latin-desiderius',
                sourceLanguage: 'latin',
                culture: { en: 'Latin Christian', sk: 'Latinská kresťanská' },
                derivation: [
                    { form: 'desiderium', language: 'latin', gloss: { en: 'longing, desire, a thing wished for', sk: 'túžba, želanie' } },
                    { form: 'Desiderius', language: 'latin', gloss: { en: 'the longed-for one', sk: 'vytúžený' } },
                    { form: 'Dezider', language: 'slovak', gloss: { en: 'the Central European form', sk: 'stredoeurópska podoba' } },
                ],
                gloss: { en: 'the longed-for one', sk: 'vytúžený' },
                confidence: 'well-attested',
                epistemicClass: 'etymological-fact',
                summary: {
                    en: 'From the Latin noun desiderium, longing, giving a name meaning the longed-for child. It was a common late Roman and early medieval Christian name and survived in Hungary and Slovakia after fading elsewhere.',
                    sk: 'Z latinského podstatného mena desiderium, teda túžba, čo dáva meno s významom vytúžené dieťa. Bolo bežným neskororímskym a včasnostredovekým kresťanským menom a v Maďarsku a na Slovensku sa udržalo aj potom, čo inde zaniklo.',
                },
                provenance: ['classical-onomastics'],
            },
        ],
        meaning: { literal: { en: 'the longed-for one', sk: 'vytúžený' } },
        culturalSpread: [
            { id: 'dezider-central-europe', region: { en: 'Slovakia, Hungary', sk: 'Slovensko, Maďarsko' }, forms: ['Dezider', 'Dezső'] },
            { id: 'dezider-romance', region: { en: 'Italy, France', sk: 'Taliansko, Francúzsko' }, forms: ['Desiderio', 'Didier'] },
        ],
        variants: [
            { form: 'Dezső', kind: 'language-form', language: 'hungarian', resolvesToCanonical: true },
            { form: 'Didier', kind: 'language-form', language: 'french', resolvesToCanonical: true },
        ],
        relatedNames: [],
        confidence: 'well-attested',
        notes: [],
        provenance: ['classical-onomastics', 'sk-civil-calendar'],
    },
    {
        canonicalKey: 'livia',
        canonicalName: 'Lívia',
        gender: 'feminine',
        origins: [
            {
                id: 'livia-roman-gens',
                sourceLanguage: 'latin',
                culture: { en: 'Roman', sk: 'Rímska' },
                derivation: [
                    { form: 'Livius', language: 'latin', gloss: { en: 'an old Roman family name', sk: 'staré rímske rodové meno' } },
                    { form: 'Livia', language: 'latin', gloss: { en: 'a woman of the Livian family', sk: 'žena z rodu Liviov' } },
                ],
                gloss: { en: 'of the gens Livia', sk: 'z rodu Liviov' },
                confidence: 'well-attested',
                epistemicClass: 'etymological-fact',
                summary: {
                    en: 'The feminine of the Roman family name Livius, best known from Livia Drusilla, the wife of Augustus. That the name descends from the family name is certain; the family name itself has no agreed meaning.',
                    sk: 'Ženská podoba rímskeho rodového mena Livius, najznámejšia z Lívie Drusilly, manželky Augusta. Že meno pochádza z rodového mena, je isté; samotné rodové meno zhodne určený význam nemá.',
                },
                provenance: ['classical-onomastics'],
            },
        ],
        meaning: { literal: null, traditional: { en: 'of the Livian family', sk: 'z rodu Liviov' } },
        culturalSpread: [
            { id: 'livia-central-europe', region: { en: 'Slovakia, Hungary', sk: 'Slovensko, Maďarsko' }, forms: ['Lívia'] },
            { id: 'livia-romance', region: { en: 'Italy, Romania', sk: 'Taliansko, Rumunsko' }, forms: ['Livia'] },
        ],
        variants: [
            { form: 'Livia', kind: 'spelling', language: 'italian', resolvesToCanonical: true },
        ],
        relatedNames: [],
        confidence: 'well-attested',
        notes: [
            {
                id: 'livia-bluish-folk-etymology',
                kind: 'folk-etymology',
                text: {
                    en: 'The gloss "bluish" or "envious", from Latin lividus, is a guess made to give the family name a meaning. Roman family names of this age frequently have none that can be recovered.',
                    sk: 'Výklad „modrastá“ či „závistlivá“ z latinského lividus je dohad, ktorý má rodovému menu dodať význam. Rímske rodové mená z tejto doby často nijaký zistiteľný význam nemajú.',
                },
            },
        ],
        provenance: ['classical-onomastics', 'sk-civil-calendar'],
    },
    {
        canonicalKey: 'etela',
        canonicalName: 'Etela',
        gender: 'feminine',
        origins: [
            {
                id: 'etela-hungarian-coinage',
                sourceLanguage: 'hungarian',
                culture: { en: 'Hungarian literary', sk: 'Maďarská literárna' },
                derivation: [
                    { form: 'Etele', language: 'hungarian', gloss: { en: 'the Hungarian form of the name Attila', sk: 'maďarská podoba mena Attila' } },
                    { form: 'Etelka', language: 'hungarian', gloss: { en: 'a feminine name coined for a 1788 novel', sk: 'ženské meno utvorené pre román z roku 1788' } },
                    { form: 'Etela', language: 'slovak', gloss: { en: 'the Slovak form', sk: 'slovenská podoba' } },
                ],
                gloss: { en: 'a literary feminine formed on Etele', sk: 'literárne ženské meno utvorené z mena Etele' },
                confidence: 'probable',
                epistemicClass: 'disputed-origin',
                summary: {
                    en: 'One account traces the name to Etelka, a feminine coined in late eighteenth-century Hungarian literature on Etele, the Hungarian form of Attila. The coinage is documented; whether Slovak Etela continues it or merely resembles it is less clear.',
                    sk: 'Jeden výklad odvodzuje meno z podoby Etelka, ženského mena utvoreného v maďarskej literatúre konca 18. storočia z mena Etele, maďarskej podoby mena Attila. Utvorenie je doložené; či slovenská Etela naň nadväzuje, alebo sa mu len podobá, jasné nie je.',
                },
                provenance: ['contested-etymology', 'hu-civil-calendar'],
            },
            {
                id: 'etela-germanic-adal',
                sourceLanguage: 'old-high-german',
                culture: { en: 'Germanic', sk: 'Germánska' },
                derivation: [
                    { form: 'adal', language: 'old-high-german', gloss: { en: 'noble, of noble descent', sk: 'urodzený, vznešeného pôvodu' } },
                    { form: 'Adela', language: 'old-high-german', gloss: { en: 'a short form of Adal- compound names', sk: 'skrátená podoba mien s prvkom Adal-' } },
                ],
                gloss: { en: 'noble', sk: 'urodzená' },
                confidence: 'disputed',
                epistemicClass: 'disputed-origin',
                summary: {
                    en: 'A competing account treats Etela as a Central European variant of the Germanic Adela or Ethel names, built on the element meaning noble. Slovak usage has long equated the two, which is itself evidence of how the name was understood rather than of where it came from.',
                    sk: 'Konkurenčný výklad pokladá Etelu za stredoeurópsku obmenu germánskych mien Adela či Ethel, utvorených z prvku s významom urodzený. Slovenské používanie obe dlho stotožňuje, čo je však skôr dokladom o tom, ako sa meno chápalo, než odkiaľ pochádza.',
                },
                provenance: ['contested-etymology'],
            },
        ],
        meaning: { literal: null },
        culturalSpread: [
            { id: 'etela-hungary', region: { en: 'Hungary', sk: 'Maďarsko' }, forms: ['Etelka', 'Etel'] },
            { id: 'etela-slovakia', region: { en: 'Slovakia', sk: 'Slovensko' }, forms: ['Etela'] },
        ],
        variants: [
            { form: 'Etelka', kind: 'language-form', language: 'hungarian', resolvesToCanonical: true },
        ],
        relatedNames: [
            { canonicalKey: 'adela', relation: 'shares-root',
                note: { en: 'Linked only on the Germanic reading.', sk: 'Spojené len pri germánskom výklade.' } },
            { canonicalKey: 'attila', relation: 'shares-root',
                note: { en: 'Linked only on the Hungarian literary reading.', sk: 'Spojené len pri maďarskom literárnom výklade.' } },
        ],
        confidence: 'disputed',
        notes: [],
        provenance: ['contested-etymology', 'sk-civil-calendar'],
    },
];
