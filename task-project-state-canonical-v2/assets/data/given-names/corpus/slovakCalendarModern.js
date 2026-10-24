/*
 * MODERN NAMES OF THE SLOVAK CALENDAR.
 *
 * The names in this file were added to the Oficiálne kalendárium (the calendar
 * compiled by the Kalendárna komisia at the Ministry of Culture of the Slovak
 * Republic) in its recent revisions. Most of them are not old Slovak names at
 * all: they are short forms, foreign borrowings and literary coinages that
 * entered Slovak usage in the twentieth and twenty-first centuries.
 *
 * That is the honest and the interesting part, so the records say it out loud.
 * A borrowed short form is recorded as a short form - the chain is given as far
 * as it can be followed (Sandra < Alessandra < Alexandra < Alexandros), the
 * point of entry into Slovak is put in `history` where it is known, and the
 * link to the record the name was cut down from is a `relatedNames` edge rather
 * than a merge, because Sandra and Alexandra are not the same name.
 *
 * Several names on the official list are deliberately ABSENT from this file.
 * Where no derivation could be supported without inventing one, the name was
 * left out. An empty slot is a smaller error than a confident falsehood, and it
 * is the one this layer exists to prefer.
 */
export const SLOVAK_CALENDAR_MODERN = [
    {
        canonicalKey: 'sandra',
        canonicalName: 'Sandra',
        gender: 'feminine',
        origins: [
            {
                id: 'sandra-italian-short-form',
                sourceLanguage: 'ancient-greek',
                culture: { en: 'Greek, by way of Italian', sk: 'Grécka, cez taliančinu' },
                derivation: [
                    { form: 'alexo', language: 'ancient-greek', gloss: { en: 'to defend, to ward off', sk: 'brániť, odvracať' } },
                    { form: 'andros', language: 'ancient-greek', gloss: { en: 'of a man (genitive of aner)', sk: 'muža (genitív slova aner)' } },
                    { form: 'Alexandra', language: 'ancient-greek', gloss: { en: 'defender of men', sk: 'obrankyňa mužov' } },
                    { form: 'Alessandra', language: 'italian', gloss: { en: 'the Italian form', sk: 'talianska podoba' } },
                    { form: 'Sandra', language: 'italian', gloss: { en: 'shortened from the end of Alessandra', sk: 'skrátené z konca mena Alessandra' } },
                ],
                gloss: { en: 'defender of men', sk: 'obrankyňa mužov' },
                confidence: 'well-attested',
                epistemicClass: 'etymological-fact',
                summary: {
                    en: 'Sandra is a short form of the Italian Alessandra, itself the Italian shape of Greek Alexandra. The cut is made at the front of the word rather than the back, which is why nothing of the alex- element survives in it.',
                    sk: 'Sandra je skrátená podoba talianskeho mena Alessandra, ktoré je talianskou podobou gréckeho mena Alexandra. Meno sa skrátilo odpredu, nie odzadu, a preto sa v ňom z prvku alex- nič nezachovalo.',
                },
                provenance: ['classical-onomastics', 'onomastic-consensus'],
            },
        ],
        meaning: { literal: { en: 'defender of men', sk: 'obrankyňa mužov' } },
        history: {
            en: 'The short form became an independent name in Italy and then across Western Europe and Scandinavia during the twentieth century. It reached Slovak usage as an international name in the later decades of that century and was added to the official calendar as a name in its own right, not as a nickname for Alexandra.',
            sk: 'Skrátená podoba sa v Taliansku a potom v západnej Európe a Škandinávii stala v 20. storočí samostatným menom. Do slovenského prostredia sa dostala ako medzinárodné meno v neskorších desaťročiach toho istého storočia a do oficiálneho kalendára bola zaradená ako samostatné meno, nie ako domácka podoba mena Alexandra.',
        },
        culturalSpread: [
            { id: 'sandra-italy', region: { en: 'Italy', sk: 'Taliansko' }, forms: ['Sandra', 'Alessandra'] },
            { id: 'sandra-germanic', region: { en: 'Germany, Scandinavia', sk: 'Nemecko, Škandinávia' }, forms: ['Sandra'] },
            { id: 'sandra-central-europe', region: { en: 'Slovakia, Czechia, Poland', sk: 'Slovensko, Česko, Poľsko' }, forms: ['Sandra'] },
        ],
        variants: [
            { form: 'Saundra', kind: 'spelling', language: 'english', resolvesToCanonical: true },
            { form: 'Sandy', kind: 'diminutive', language: 'english', resolvesToCanonical: false,
                note: { en: 'An English short form used for Sandra and for Alexander alike, so it is not resolved automatically.', sk: 'Anglická skrátená podoba používaná rovnako pre meno Sandra aj Alexander, preto sa automaticky nepriraďuje.' } },
        ],
        relatedNames: [
            { canonicalKey: 'alexandra', relation: 'derived-from' },
            { canonicalKey: 'alexander', relation: 'shares-root' },
        ],
        confidence: 'well-attested',
        notes: [],
        provenance: ['classical-onomastics', 'onomastic-consensus', 'sk-web-calendars'],
    },
    {
        canonicalKey: 'alex',
        canonicalName: 'Alex',
        gender: 'unisex',
        origins: [
            {
                id: 'alex-greek-short-form',
                sourceLanguage: 'ancient-greek',
                culture: { en: 'Greek, through international usage', sk: 'Grécka, cez medzinárodné používanie' },
                derivation: [
                    { form: 'alexo', language: 'ancient-greek', gloss: { en: 'to defend, to ward off', sk: 'brániť, odvracať' } },
                    { form: 'Alexandros', language: 'ancient-greek', gloss: { en: 'defender of men', sk: 'obranca mužov' } },
                    { form: 'Alex', language: 'english', gloss: { en: 'shortened form of Alexander and Alexandra', sk: 'skrátená podoba mien Alexander a Alexandra' } },
                ],
                gloss: { en: 'defender', sk: 'obranca' },
                confidence: 'well-attested',
                epistemicClass: 'etymological-fact',
                summary: {
                    en: 'Alex is the first element of Alexandros standing on its own. Because both the masculine Alexander and the feminine Alexandra shorten to the same syllable, the short form is used for either, and in the Slovak calendar it appears as an independent entry.',
                    sk: 'Alex je prvý prvok mena Alexandros, ktorý sa osamostatnil. Keďže mužské meno Alexander aj ženské Alexandra sa skracujú na tú istú slabiku, používa sa skrátená podoba pre obe, a v slovenskom kalendári stojí ako samostatná položka.',
                },
                provenance: ['classical-onomastics', 'onomastic-consensus'],
            },
        ],
        meaning: { literal: { en: 'defender', sk: 'obranca' }, traditional: { en: 'defender of men', sk: 'obranca mužov' } },
        history: {
            en: 'The short form hardened into a registrable given name in English-speaking countries during the twentieth century and spread from there. Its arrival in the Slovak calendar is recent and reflects that international usage rather than any local tradition.',
            sk: 'Skrátená podoba sa v 20. storočí v anglofónnych krajinách ustálila ako samostatne zapisovateľné meno a odtiaľ sa rozšírila. Do slovenského kalendára sa dostala nedávno a odráža toto medzinárodné používanie, nie domácu tradíciu.',
        },
        culturalSpread: [
            { id: 'alex-anglophone', region: { en: 'United Kingdom, United States', sk: 'Spojené kráľovstvo, Spojené štáty' }, forms: ['Alex'] },
            { id: 'alex-central-europe', region: { en: 'Slovakia, Czechia, Hungary', sk: 'Slovensko, Česko, Maďarsko' }, forms: ['Alex'] },
        ],
        variants: [
            { form: 'Aleks', kind: 'spelling', resolvesToCanonical: true },
        ],
        relatedNames: [
            { canonicalKey: 'alexander', relation: 'derived-from' },
            { canonicalKey: 'alexandra', relation: 'derived-from' },
            { canonicalKey: 'alexej', relation: 'shares-root' },
        ],
        confidence: 'well-attested',
        notes: [
            {
                id: 'alex-gender-usage',
                kind: 'usage',
                text: {
                    en: 'The Slovak calendar records Alex on a date of its own. The form is used for men and women alike, which is a fact about the name and not about anyone carrying it.',
                    sk: 'Slovenský kalendár uvádza meno Alex na samostatnom dátume. Podoba sa používa pre mužov aj ženy, čo je údaj o mene, nie o tom, kto ho nosí.',
                },
            },
        ],
        provenance: ['classical-onomastics', 'onomastic-consensus', 'sk-web-calendars'],
    },
    {
        canonicalKey: 'alexia',
        canonicalName: 'Alexia',
        gender: 'feminine',
        origins: [
            {
                id: 'alexia-greek-alexios',
                sourceLanguage: 'ancient-greek',
                culture: { en: 'Greek, Byzantine Christian', sk: 'Grécka, byzantská kresťanská' },
                derivation: [
                    { form: 'alexo', language: 'ancient-greek', gloss: { en: 'to defend, to ward off', sk: 'brániť, odvracať' } },
                    { form: 'Alexios', language: 'ancient-greek', gloss: { en: 'defender', sk: 'obranca' } },
                    { form: 'Alexia', language: 'byzantine-greek', gloss: { en: 'the feminine form', sk: 'ženská podoba' } },
                ],
                gloss: { en: 'defender', sk: 'obrankyňa' },
                confidence: 'well-attested',
                epistemicClass: 'etymological-fact',
                summary: {
                    en: 'Alexia is the feminine counterpart of Greek Alexios, built on the verb alexo, to defend. It shares its root with Alexander but is a separate formation: Alexios is the plain agent noun, without the second element meaning man.',
                    sk: 'Alexia je ženským náprotivkom gréckeho mena Alexios, utvoreného od slovesa alexo, brániť. S menom Alexander zdieľa koreň, ide však o samostatné utvorenie: Alexios je jednoduché meno konateľa, bez druhého prvku s významom muž.',
                },
                provenance: ['classical-onomastics', 'onomastic-consensus'],
            },
        ],
        meaning: { literal: { en: 'defender', sk: 'obrankyňa' } },
        history: {
            en: 'Alexios was a Byzantine imperial name and reached the Latin West as Alexius, the name of a widely venerated medieval saint. The feminine Alexia stayed rare in Central Europe until the late twentieth century, when it spread as an international name.',
            sk: 'Alexios bolo byzantské cisárske meno a na latinský Západ sa dostalo ako Alexius, meno v stredoveku široko uctievaného svätca. Ženská podoba Alexia zostala v strednej Európe zriedkavá až do konca 20. storočia, keď sa rozšírila ako medzinárodné meno.',
        },
        culturalSpread: [
            { id: 'alexia-greece', region: { en: 'Greece', sk: 'Grécko' }, forms: ['Αλεξία', 'Alexia'] },
            { id: 'alexia-romance', region: { en: 'France, Spain, Italy', sk: 'Francúzsko, Španielsko, Taliansko' }, forms: ['Alexia', 'Alessia'] },
            { id: 'alexia-central-europe', region: { en: 'Slovakia, Hungary', sk: 'Slovensko, Maďarsko' }, forms: ['Alexia'] },
        ],
        variants: [
            { form: 'Αλεξία', kind: 'transliteration', language: 'ancient-greek', resolvesToCanonical: true },
            { form: 'Alexis', kind: 'language-form', language: 'french', resolvesToCanonical: false,
                note: { en: 'The French Alexis descends from the masculine Alexios and is kept separate.', sk: 'Francúzske meno Alexis pochádza z mužského mena Alexios a vedie sa samostatne.' } },
        ],
        relatedNames: [
            { canonicalKey: 'alexej', relation: 'feminine-form' },
            { canonicalKey: 'alexander', relation: 'shares-root' },
        ],
        confidence: 'well-attested',
        notes: [],
        provenance: ['classical-onomastics', 'onomastic-consensus', 'sk-web-calendars'],
    },
    {
        canonicalKey: 'ernestina',
        canonicalName: 'Ernestína',
        gender: 'feminine',
        origins: [
            {
                id: 'ernestina-germanic-ernust',
                sourceLanguage: 'old-high-german',
                culture: { en: 'Germanic', sk: 'Germánska' },
                derivation: [
                    { form: 'ernust', language: 'old-high-german', gloss: { en: 'seriousness, resolve, the earnest of battle', sk: 'vážnosť, odhodlanie, opravdivosť boja' } },
                    { form: 'Ernust', language: 'old-high-german', gloss: { en: 'the masculine name', sk: 'mužské meno' } },
                    { form: 'Ernestina', language: 'latin', gloss: { en: 'a Latinate feminine derivative', sk: 'ženské meno odvodené latinskou príponou' } },
                ],
                gloss: { en: 'serious, resolute', sk: 'vážna, odhodlaná' },
                confidence: 'well-attested',
                epistemicClass: 'etymological-fact',
                summary: {
                    en: 'Ernestína is the feminine of Ernest, formed with the Latin diminutive-derivative suffix -ina on the Germanic name Ernust. The underlying word means seriousness or resolve, and in older Germanic usage carried the sense of the earnestness of combat.',
                    sk: 'Ernestína je ženskou podobou mena Ernest, utvorenou latinskou odvodzovacou príponou -ina od germánskeho mena Ernust. Základné slovo znamená vážnosť či odhodlanie a v staršom germánskom používaní nieslo aj význam opravdivosti boja.',
                },
                provenance: ['germanic-onomastics', 'onomastic-consensus'],
            },
        ],
        meaning: { literal: { en: 'seriousness, resolve', sk: 'vážnosť, odhodlanie' } },
        history: {
            en: 'The feminine was made in the German-speaking lands, where Ernst was a dynastic name of the Saxon houses, and travelled into Hungarian and Slovak usage through the Habsburg lands. It is a calendar name of the older borrowed layer rather than a recent import.',
            sk: 'Ženská podoba vznikla v nemecky hovoriacich krajinách, kde bolo meno Ernst dynastickým menom saských rodov, a do maďarského a slovenského prostredia sa dostala cez habsburské krajiny. Ide o kalendárne meno staršej prevzatej vrstvy, nie o nedávny import.',
        },
        culturalSpread: [
            { id: 'ernestina-german', region: { en: 'Germany, Austria', sk: 'Nemecko, Rakúsko' }, forms: ['Ernestine'] },
            { id: 'ernestina-central-europe', region: { en: 'Slovakia, Czechia, Hungary', sk: 'Slovensko, Česko, Maďarsko' }, forms: ['Ernestína', 'Ernesztina'] },
        ],
        variants: [
            { form: 'Ernestine', kind: 'language-form', language: 'german', resolvesToCanonical: true },
            { form: 'Ernesztina', kind: 'language-form', language: 'hungarian', resolvesToCanonical: true },
            { form: 'Erna', kind: 'diminutive', language: 'german', resolvesToCanonical: false,
                note: { en: 'A German short form shared with other names beginning in Ern-.', sk: 'Nemecká skrátená podoba spoločná aj iným menám na Ern-.' } },
        ],
        relatedNames: [
            { canonicalKey: 'ernest', relation: 'feminine-form' },
        ],
        confidence: 'well-attested',
        notes: [],
        provenance: ['germanic-onomastics', 'onomastic-consensus', 'sk-web-calendars'],
    },
    {
        canonicalKey: 'radovana',
        canonicalName: 'Radovana',
        gender: 'feminine',
        origins: [
            {
                id: 'radovana-slavic-rad',
                sourceLanguage: 'proto-slavic',
                culture: { en: 'Slavic', sk: 'Slovanská' },
                derivation: [
                    { form: 'radъ', language: 'proto-slavic', reconstructed: true, gloss: { en: 'glad, willing', sk: 'rád, ochotný' } },
                    { form: 'Radovan', language: 'slavic', gloss: { en: 'the one who is gladdened, joyful', sk: 'ten, kto sa raduje, radostný' } },
                    { form: 'Radovana', language: 'slovak', gloss: { en: 'the feminine form', sk: 'ženská podoba' } },
                ],
                gloss: { en: 'joyful, gladdened', sk: 'radostná, potešená' },
                confidence: 'probable',
                epistemicClass: 'etymological-fact',
                summary: {
                    en: 'Radovana is the regular feminine of Radovan, built on the Proto-Slavic adjective radъ, glad. The formation is transparent, which is why the derivation is secure even though the feminine itself is a late and thinly used name.',
                    sk: 'Radovana je pravidelnou ženskou podobou mena Radovan, utvoreného od praslovanského prídavného mena radъ, rád. Utvorenie je priehľadné, a preto je odvodenie isté, hoci samotná ženská podoba je neskorá a používa sa málo.',
                },
                provenance: ['slavic-onomastics'],
            },
        ],
        meaning: { literal: { en: 'joyful, gladdened', sk: 'radostná, potešená' } },
        history: {
            en: 'The masculine Radovan is old and common across the Slavic languages. The feminine is a modern back-formation on the Slovak pattern and entered the calendar as the paired name to Radovan rather than through any independent tradition.',
            sk: 'Mužské meno Radovan je staré a v slovanských jazykoch bežné. Ženská podoba je moderným spätným utvorením podľa slovenského vzoru a do kalendára sa dostala ako protiklad k menu Radovan, nie cez samostatnú tradíciu.',
        },
        culturalSpread: [
            { id: 'radovana-slovakia', region: { en: 'Slovakia', sk: 'Slovensko' }, forms: ['Radovana'] },
            { id: 'radovana-south-slavic', region: { en: 'Serbia, Croatia', sk: 'Srbsko, Chorvátsko' }, forms: ['Radovana', 'Радована'] },
        ],
        variants: [
            { form: 'Radovanka', kind: 'diminutive', language: 'slovak', resolvesToCanonical: true },
        ],
        relatedNames: [
            { canonicalKey: 'radovan', relation: 'feminine-form' },
            { canonicalKey: 'radoslava', relation: 'shares-root' },
            { canonicalKey: 'radomir', relation: 'shares-root' },
        ],
        confidence: 'probable',
        notes: [
            {
                id: 'radovana-thin-record',
                kind: 'historical',
                text: {
                    en: 'Unlike the masculine, the feminine has almost no premodern written record. The derivation is certain from the shape of the word; its history as a name is short.',
                    sk: 'Na rozdiel od mužskej podoby nemá ženská podoba takmer nijaké predmoderné písomné doklady. Odvodenie je isté už z podoby slova, dejiny mena sú však krátke.',
                },
            },
        ],
        provenance: ['slavic-onomastics', 'sk-web-calendars'],
    },
    {
        canonicalKey: 'sebastian',
        canonicalName: 'Sebastián',
        gender: 'masculine',
        origins: [
            {
                id: 'sebastian-greek-sebastos',
                sourceLanguage: 'ancient-greek',
                culture: { en: 'Greek, then Roman Christian', sk: 'Grécka, potom rímska kresťanská' },
                derivation: [
                    { form: 'sebas', language: 'ancient-greek', gloss: { en: 'reverence, awe', sk: 'úcta, bázeň' } },
                    { form: 'sebastos', language: 'ancient-greek', gloss: { en: 'venerable, august; the Greek rendering of Latin Augustus', sk: 'ctihodný, vznešený; grécky preklad latinského Augustus' } },
                    { form: 'Sebaste', language: 'ancient-greek', gloss: { en: 'a city name, from the same word', sk: 'názov mesta z toho istého slova' } },
                    { form: 'Sebastianus', language: 'latin', gloss: { en: 'from Sebaste, of the venerable city', sk: 'zo Sebaste, z ctihodného mesta' } },
                ],
                gloss: { en: 'from Sebaste; venerable', sk: 'zo Sebaste; ctihodný' },
                confidence: 'well-attested',
                epistemicClass: 'etymological-fact',
                summary: {
                    en: 'The Latin Sebastianus is an origin-name: it marks a person as being from Sebaste, a city whose own name is Greek sebastos, venerable, the Greek equivalent of the imperial title Augustus. The name therefore means venerable only at one remove.',
                    sk: 'Latinské Sebastianus je meno podľa pôvodu: označuje človeka pochádzajúceho zo Sebaste, mesta, ktorého názov je grécke sebastos, ctihodný, teda grécky ekvivalent cisárskeho titulu Augustus. Význam ctihodný má meno až sprostredkovane.',
                },
                provenance: ['classical-onomastics', 'onomastic-consensus'],
            },
        ],
        meaning: {
            literal: { en: 'from Sebaste', sk: 'zo Sebaste' },
            traditional: { en: 'venerable', sk: 'ctihodný' },
        },
        history: {
            en: 'The name spread through the cult of Saint Sebastian, a Roman martyr invoked against plague, which made it common across Catholic Europe from the late Middle Ages. It has been used in Slovak territory for centuries and returned to heavy use in recent decades.',
            sk: 'Meno sa rozšírilo úctou k svätému Sebastiánovi, rímskemu mučeníkovi vzývanému proti moru, čo ho od neskorého stredoveku zľudovilo v katolíckej Európe. Na slovenskom území sa používa stáročia a v posledných desaťročiach sa vrátilo do širokého používania.',
        },
        culturalSpread: [
            { id: 'sebastian-romance', region: { en: 'Spain, Portugal, France, Italy', sk: 'Španielsko, Portugalsko, Francúzsko, Taliansko' }, forms: ['Sebastián', 'Sebastião', 'Sébastien', 'Sebastiano'] },
            { id: 'sebastian-german', region: { en: 'Germany, Austria', sk: 'Nemecko, Rakúsko' }, forms: ['Sebastian'] },
            { id: 'sebastian-central-europe', region: { en: 'Slovakia, Czechia, Poland', sk: 'Slovensko, Česko, Poľsko' }, forms: ['Sebastián', 'Šebestián', 'Sebastian'] },
        ],
        variants: [
            { form: 'Sébastien', kind: 'language-form', language: 'french', resolvesToCanonical: true },
            { form: 'Sebastiano', kind: 'language-form', language: 'italian', resolvesToCanonical: true },
            { form: 'Sebastião', kind: 'language-form', language: 'portuguese', resolvesToCanonical: true },
            { form: 'Šebastián', kind: 'spelling', language: 'slovak', resolvesToCanonical: true },
            { form: 'Sebo', kind: 'diminutive', language: 'slovak', resolvesToCanonical: false },
        ],
        relatedNames: [],
        confidence: 'well-attested',
        notes: [],
        provenance: ['classical-onomastics', 'onomastic-consensus', 'sk-web-calendars'],
    },
    {
        canonicalKey: 'fabian',
        canonicalName: 'Fabián',
        gender: 'masculine',
        origins: [
            {
                id: 'fabian-latin-fabius',
                sourceLanguage: 'latin',
                culture: { en: 'Roman', sk: 'Rímska' },
                derivation: [
                    { form: 'faba', language: 'latin', gloss: { en: 'bean', sk: 'bôb' } },
                    { form: 'Fabius', language: 'latin', gloss: { en: 'the name of a Roman gens', sk: 'meno rímskeho rodu' } },
                    { form: 'Fabianus', language: 'latin', gloss: { en: 'belonging to the Fabii', sk: 'patriaci k Fabiovcom' } },
                ],
                gloss: { en: 'of the Fabius family', sk: 'z rodu Fabiovcov' },
                confidence: 'probable',
                epistemicClass: 'etymological-fact',
                summary: {
                    en: 'Fabianus is a Roman adjectival name marking membership of the gens Fabia. That much is certain. The gens name itself is usually connected with faba, bean, on the pattern of other Roman families named after crops, but that further step is a reasonable reading rather than a documented one.',
                    sk: 'Fabianus je rímske prídavné meno označujúce príslušnosť k rodu Fabiovcov. To je isté. Samotné rodové meno sa zvyčajne spája so slovom faba, bôb, podľa vzoru iných rímskych rodov pomenovaných podľa plodín, tento ďalší krok je však skôr rozumným výkladom než doloženým faktom.',
                },
                provenance: ['classical-onomastics', 'onomastic-consensus'],
            },
        ],
        meaning: {
            literal: { en: 'of the Fabius family', sk: 'z rodu Fabiovcov' },
            traditional: { en: 'bean grower', sk: 'pestovateľ bôbu' },
        },
        history: {
            en: 'The name entered Christian usage through Pope Fabian, a third-century martyr, whose feast fell next to that of Saint Sebastian. The two names travelled together in medieval calendars and both are in the Slovak calendar today.',
            sk: 'Do kresťanského používania sa meno dostalo cez pápeža Fabiána, mučeníka z 3. storočia, ktorého sviatok pripadal vedľa sviatku svätého Sebastiána. Obe mená putovali stredovekými kalendármi spolu a obe sú dnes v slovenskom kalendári.',
        },
        culturalSpread: [
            { id: 'fabian-romance', region: { en: 'Spain, France, Italy', sk: 'Španielsko, Francúzsko, Taliansko' }, forms: ['Fabián', 'Fabien', 'Fabiano'] },
            { id: 'fabian-central-europe', region: { en: 'Slovakia, Czechia, Poland, Hungary', sk: 'Slovensko, Česko, Poľsko, Maďarsko' }, forms: ['Fabián', 'Fabian', 'Fábián'] },
        ],
        variants: [
            { form: 'Fabien', kind: 'language-form', language: 'french', resolvesToCanonical: true },
            { form: 'Fabiano', kind: 'language-form', language: 'italian', resolvesToCanonical: true },
            { form: 'Fábián', kind: 'language-form', language: 'hungarian', resolvesToCanonical: true },
        ],
        relatedNames: [],
        confidence: 'probable',
        notes: [
            {
                id: 'fabian-bean-caution',
                kind: 'linguistic',
                text: {
                    en: 'Bean grower is often given as the meaning without qualification. The bean connection belongs to the Roman family name, not to the given name, and it is a proposal about a very old word rather than a recorded fact.',
                    sk: 'Význam pestovateľ bôbu sa často uvádza bez výhrady. Spojenie s bôbom sa týka rímskeho rodového mena, nie krstného mena, a je to návrh o veľmi starom slove, nie zaznamenaný fakt.',
                },
            },
        ],
        provenance: ['classical-onomastics', 'onomastic-consensus', 'sk-web-calendars'],
    },
    {
        canonicalKey: 'zoran',
        canonicalName: 'Zoran',
        gender: 'masculine',
        origins: [
            {
                id: 'zoran-slavic-zora',
                sourceLanguage: 'proto-slavic',
                culture: { en: 'South Slavic', sk: 'Južnoslovanská' },
                derivation: [
                    { form: 'zorja', language: 'proto-slavic', reconstructed: true, gloss: { en: 'dawn, daybreak', sk: 'zora, úsvit' } },
                    { form: 'zora', language: 'serbo-croatian', gloss: { en: 'dawn', sk: 'zora' } },
                    { form: 'Zoran', language: 'serbo-croatian', gloss: { en: 'of the dawn, formed with the adjectival suffix -an', sk: 'zorný, utvorené prídavnou príponou -an' } },
                ],
                gloss: { en: 'of the dawn', sk: 'zorný, súvisiaci s úsvitom' },
                confidence: 'probable',
                epistemicClass: 'etymological-fact',
                summary: {
                    en: 'Zoran is a South Slavic name built on zora, dawn, with the ordinary adjectival suffix -an. The formation is transparent and is not seriously contested; what is late is the name itself, which belongs to the nineteenth-century revival of Slavic naming rather than to the medieval stock.',
                    sk: 'Zoran je juhoslovanské meno utvorené od slova zora bežnou prídavnou príponou -an. Utvorenie je priehľadné a vážne sa nespochybňuje; neskoré je samotné meno, ktoré patrí k obrodeniu slovanského pomenúvania v 19. storočí, nie k stredovekej vrstve.',
                },
                provenance: ['slavic-onomastics'],
            },
        ],
        meaning: { literal: { en: 'of the dawn', sk: 'zorný, súvisiaci s úsvitom' } },
        history: {
            en: 'The name became common in Serbia, Croatia, Macedonia and Slovenia in the twentieth century, and reached the Slovak calendar as a shared Slavic name rather than through a saint or a local tradition.',
            sk: 'Meno sa v 20. storočí rozšírilo v Srbsku, Chorvátsku, Macedónsku a Slovinsku a do slovenského kalendára sa dostalo ako spoločné slovanské meno, nie cez svätca či domácu tradíciu.',
        },
        culturalSpread: [
            { id: 'zoran-south-slavic', region: { en: 'Serbia, Croatia, North Macedonia, Slovenia', sk: 'Srbsko, Chorvátsko, Severné Macedónsko, Slovinsko' }, forms: ['Zoran', 'Зоран'] },
            { id: 'zoran-slovakia', region: { en: 'Slovakia', sk: 'Slovensko' }, forms: ['Zoran'] },
        ],
        variants: [
            { form: 'Зоран', kind: 'transliteration', language: 'serbo-croatian', resolvesToCanonical: true },
            { form: 'Zorana', kind: 'spelling', resolvesToCanonical: false,
                note: { en: 'The feminine name, not held as a separate record here.', sk: 'Ženské meno, ktoré sa tu nevedie ako samostatná položka.' } },
        ],
        relatedNames: [
            { canonicalKey: 'zora', relation: 'shares-root' },
        ],
        confidence: 'probable',
        notes: [],
        provenance: ['slavic-onomastics', 'sk-web-calendars'],
    },
    {
        canonicalKey: 'aurora',
        canonicalName: 'Auróra',
        gender: 'feminine',
        origins: [
            {
                id: 'aurora-latin-dawn',
                sourceLanguage: 'latin',
                culture: { en: 'Roman', sk: 'Rímska' },
                derivation: [
                    { form: 'h₂ews-', language: 'proto-indo-european', reconstructed: true, gloss: { en: 'to shine, to grow light', sk: 'svietiť, rozvidnievať sa' } },
                    { form: 'aurora', language: 'latin', gloss: { en: 'dawn, the light before sunrise', sk: 'úsvit, svetlo pred východom slnka' } },
                    { form: 'Aurora', language: 'latin', gloss: { en: 'the Roman goddess of the dawn', sk: 'rímska bohyňa úsvitu' } },
                ],
                gloss: { en: 'dawn', sk: 'úsvit, zora' },
                confidence: 'well-attested',
                epistemicClass: 'etymological-fact',
                summary: {
                    en: 'Auróra is the Latin word for dawn used as a name, and also the name of the Roman dawn goddess. The word descends from an Indo-European root for shining that also gives Greek Eos and the English east.',
                    sk: 'Auróra je latinské slovo pre úsvit použité ako meno a zároveň meno rímskej bohyne úsvitu. Slovo pochádza z indoeurópskeho koreňa s významom svietiť, z ktorého je aj grécke Eos a anglické east.',
                },
                provenance: ['classical-onomastics', 'onomastic-consensus'],
            },
        ],
        meaning: { literal: { en: 'dawn', sk: 'úsvit, zora' } },
        history: {
            en: 'Unlike most calendar names this one has no saint behind it. It came into European use through Renaissance and later literary fashion for classical mythology, was popular in Hungary in the nineteenth century, and reached the Slovak calendar from that Central European usage.',
            sk: 'Na rozdiel od väčšiny kalendárnych mien za týmto nestojí svätec. Do európskeho používania sa dostalo cez renesančnú a neskoršiu literárnu obľubu antickej mytológie, v 19. storočí bolo obľúbené v Maďarsku a do slovenského kalendára prišlo z tohto stredoeurópskeho používania.',
        },
        culturalSpread: [
            { id: 'aurora-romance', region: { en: 'Italy, Spain', sk: 'Taliansko, Španielsko' }, forms: ['Aurora'] },
            { id: 'aurora-central-europe', region: { en: 'Hungary, Slovakia', sk: 'Maďarsko, Slovensko' }, forms: ['Auróra', 'Aurora'] },
        ],
        variants: [
            { form: 'Aurore', kind: 'language-form', language: 'french', resolvesToCanonical: true },
            { form: 'Aurora', kind: 'spelling', language: 'latin', resolvesToCanonical: true },
        ],
        relatedNames: [
            { canonicalKey: 'zora', relation: 'cognate',
                note: { en: 'Not a linguistic cognate: the two names mean the same thing in unrelated words, one Latin and one Slavic.', sk: 'Nejde o jazykovú príbuznosť: obe mená znamenajú to isté, ale nesúvisiacimi slovami, jedno latinským a druhé slovanským.' } },
        ],
        confidence: 'well-attested',
        notes: [],
        provenance: ['classical-onomastics', 'onomastic-consensus', 'hu-civil-calendar', 'sk-web-calendars'],
    },
    {
        canonicalKey: 'timon',
        canonicalName: 'Timon',
        gender: 'masculine',
        origins: [
            {
                id: 'timon-greek-time',
                sourceLanguage: 'ancient-greek',
                culture: { en: 'Greek', sk: 'Grécka' },
                derivation: [
                    { form: 'time', language: 'ancient-greek', gloss: { en: 'honour, worth', sk: 'česť, hodnota' } },
                    { form: 'timao', language: 'ancient-greek', gloss: { en: 'to honour', sk: 'ctiť si' } },
                    { form: 'Timon', language: 'ancient-greek', gloss: { en: 'a short form of names in Timo-', sk: 'skrátená podoba mien na Timo-' } },
                ],
                gloss: { en: 'honour', sk: 'česť' },
                confidence: 'well-attested',
                epistemicClass: 'etymological-fact',
                summary: {
                    en: 'Timon is a Greek name from time, honour, and works as a short form of the many compound names beginning Timo-. It is attested in classical Athens and again in the New Testament, where Timon is one of the seven appointed to serve the early community.',
                    sk: 'Timon je grécke meno zo slova time, česť, a funguje ako skrátená podoba mnohých zložených mien na Timo-. Je doložené v klasických Aténach aj v Novom zákone, kde je Timon jedným zo siedmich ustanovených do služby prvotnej obci.',
                },
                provenance: ['classical-onomastics', 'biblical-onomastics'],
            },
        ],
        meaning: { literal: { en: 'honour', sk: 'česť' } },
        history: {
            en: 'The best known bearer in European culture is the misanthrope of Athens, through Lucian and then Shakespeare, which kept the name in literary circulation without making it common. Its appearance in the Slovak calendar is recent.',
            sk: 'Najznámejším nositeľom v európskej kultúre je aténsky mizantrop, cez Lukiána a potom Shakespeara, čo meno udržalo v literárnom obehu, ale nezľudovelo ho. V slovenskom kalendári sa objavilo nedávno.',
        },
        culturalSpread: [
            { id: 'timon-greece', region: { en: 'Greece', sk: 'Grécko' }, forms: ['Τίμων', 'Timon'] },
            { id: 'timon-central-europe', region: { en: 'Slovakia, Germany', sk: 'Slovensko, Nemecko' }, forms: ['Timon'] },
        ],
        variants: [
            { form: 'Τίμων', kind: 'transliteration', language: 'ancient-greek', resolvesToCanonical: true },
        ],
        relatedNames: [
            { canonicalKey: 'timotej', relation: 'shares-root' },
        ],
        confidence: 'well-attested',
        notes: [],
        provenance: ['classical-onomastics', 'biblical-onomastics', 'sk-web-calendars'],
    },
    {
        canonicalKey: 'timea',
        canonicalName: 'Tímea',
        gender: 'feminine',
        origins: [
            {
                id: 'timea-jokai-coinage',
                sourceLanguage: 'hungarian',
                culture: { en: 'Hungarian literary', sk: 'Maďarská literárna' },
                derivation: [
                    { form: 'euthymia', language: 'ancient-greek', gloss: { en: 'good spirits, cheerfulness, tranquillity of mind', sk: 'dobrá myseľ, veselosť, pokoj mysle' } },
                    { form: 'Euthymia', language: 'ancient-greek', gloss: { en: 'the Greek name behind the coinage', sk: 'grécke meno, ktoré je základom novotvaru' } },
                    { form: 'Tímea', language: 'hungarian', gloss: { en: 'the form coined by Mór Jókai', sk: 'podoba, ktorú utvoril Mór Jókai' } },
                ],
                gloss: { en: 'good cheer, tranquillity of mind', sk: 'dobrá myseľ, pokoj mysle' },
                confidence: 'well-attested',
                epistemicClass: 'etymological-fact',
                summary: {
                    en: 'Tímea is a documented literary invention. The Hungarian novelist Mór Jókai made it for the heroine of Az arany ember in 1872, reshaping the Greek name Euthymia, from euthymia, good spirits. Because the coinage is recorded, the derivation is unusually secure for a modern name.',
                    sk: 'Tímea je doložený literárny novotvar. Maďarský spisovateľ Mór Jókai ho utvoril pre hrdinku románu Az arany ember v roku 1872 pretvorením gréckeho mena Euthymia zo slova euthymia, dobrá myseľ. Keďže je vznik mena zaznamenaný, odvodenie je pri modernom mene nezvyčajne isté.',
                },
                provenance: ['onomastic-consensus', 'hu-civil-calendar'],
            },
        ],
        meaning: { literal: { en: 'good cheer, tranquillity of mind', sk: 'dobrá myseľ, pokoj mysle' } },
        history: {
            en: 'The name spread from the novel into ordinary Hungarian use in the twentieth century and crossed into Slovakia through the shared Hungarian-Slovak naming space of the south. It has no saint and no premodern history at all, which is exactly what makes it well documented.',
            sk: 'Meno sa z románu rozšírilo v 20. storočí do bežného maďarského používania a na Slovensko prešlo cez spoločný maďarsko-slovenský menný priestor na juhu. Nemá svätca ani nijaké predmoderné dejiny, a práve preto je dobre zdokumentované.',
        },
        culturalSpread: [
            { id: 'timea-hungary', region: { en: 'Hungary', sk: 'Maďarsko' }, forms: ['Tímea'] },
            { id: 'timea-slovakia', region: { en: 'Slovakia', sk: 'Slovensko' }, forms: ['Tímea', 'Timea'] },
        ],
        variants: [
            { form: 'Timea', kind: 'spelling', resolvesToCanonical: true },
            { form: 'Timi', kind: 'diminutive', language: 'hungarian', resolvesToCanonical: false },
        ],
        relatedNames: [],
        confidence: 'well-attested',
        notes: [
            {
                id: 'timea-not-ancient',
                kind: 'historical',
                text: {
                    en: 'Tímea is sometimes presented as an ancient Greek name. It is not: the Greek word is ancient, but the name was made in Hungarian in 1872 and can be dated to a single book.',
                    sk: 'Meno Tímea sa niekedy uvádza ako starogrécke. Nie je: grécke slovo je staré, ale meno vzniklo po maďarsky v roku 1872 a dá sa datovať do jedinej knihy.',
                },
            },
        ],
        provenance: ['onomastic-consensus', 'hu-civil-calendar', 'sk-web-calendars'],
    },
    {
        canonicalKey: 'ronald',
        canonicalName: 'Ronald',
        gender: 'masculine',
        origins: [
            {
                id: 'ronald-old-norse-rognvaldr',
                sourceLanguage: 'old-norse',
                culture: { en: 'Norse, by way of Scotland', sk: 'Severská, cez Škótsko' },
                derivation: [
                    { form: 'regin', language: 'old-norse', gloss: { en: 'the ruling powers, the gods; counsel', sk: 'vládnuce mocnosti, bohovia; rada' } },
                    { form: 'valdr', language: 'old-norse', gloss: { en: 'ruler', sk: 'vládca' } },
                    { form: 'Rǫgnvaldr', language: 'old-norse', gloss: { en: 'ruler by the counsel of the gods', sk: 'vládca z rady bohov' } },
                    { form: 'Ronald', language: 'english', gloss: { en: 'the Scots and then English form', sk: 'škótska a potom anglická podoba' } },
                ],
                gloss: { en: 'ruler by divine counsel', sk: 'vládca z božskej rady' },
                confidence: 'well-attested',
                epistemicClass: 'etymological-fact',
                summary: {
                    en: 'Ronald descends from the Old Norse Rǫgnvaldr, brought to the Northern Isles and Scotland by Norse settlement. It is the northern twin of the continental Germanic Reginald: the same two elements, arrived by a different route.',
                    sk: 'Ronald pochádza zo staroseverského mena Rǫgnvaldr, ktoré na Severné ostrovy a do Škótska priniesli severské osídlenia. Je severským dvojčaťom kontinentálneho germánskeho mena Reginald: tie isté dva prvky, ktoré prišli inou cestou.',
                },
                provenance: ['germanic-onomastics', 'onomastic-consensus'],
            },
        ],
        meaning: { literal: { en: 'ruler by divine counsel', sk: 'vládca z božskej rady' } },
        history: {
            en: 'Common in Scotland for centuries, the name became widely international in the twentieth century through English-language film and public life. It reached the Slovak calendar as a modern borrowing with no local tradition behind it.',
            sk: 'Meno bolo stáročia bežné v Škótsku a v 20. storočí sa cez anglicky hovoriaci film a verejný život rozšírilo medzinárodne. Do slovenského kalendára sa dostalo ako moderná výpožička bez domácej tradície.',
        },
        culturalSpread: [
            { id: 'ronald-scotland', region: { en: 'Scotland', sk: 'Škótsko' }, forms: ['Ronald', 'Raghnall'] },
            { id: 'ronald-anglophone', region: { en: 'United States, United Kingdom', sk: 'Spojené štáty, Spojené kráľovstvo' }, forms: ['Ronald', 'Ron'] },
            { id: 'ronald-central-europe', region: { en: 'Slovakia, Czechia', sk: 'Slovensko, Česko' }, forms: ['Ronald'] },
        ],
        variants: [
            { form: 'Raghnall', kind: 'language-form', language: 'gaelic', resolvesToCanonical: true },
            { form: 'Ron', kind: 'diminutive', language: 'english', resolvesToCanonical: false,
                note: { en: 'Shared with Ronan and other names, so not resolved automatically.', sk: 'Spoločná aj s menom Ronan a ďalšími, preto sa automaticky nepriraďuje.' } },
        ],
        relatedNames: [
            { canonicalKey: 'reginald', relation: 'cognate' },
        ],
        confidence: 'well-attested',
        notes: [],
        provenance: ['germanic-onomastics', 'onomastic-consensus', 'sk-web-calendars'],
    },
    {
        canonicalKey: 'jaromira',
        canonicalName: 'Jaromíra',
        gender: 'feminine',
        origins: [
            {
                id: 'jaromira-slavic-compound',
                sourceLanguage: 'proto-slavic',
                culture: { en: 'Slavic', sk: 'Slovanská' },
                derivation: [
                    { form: 'jarъ', language: 'proto-slavic', reconstructed: true, gloss: { en: 'fierce, vigorous; also spring, young', sk: 'prudký, silný; aj jarný, mladý' } },
                    { form: 'mirъ', language: 'proto-slavic', reconstructed: true, gloss: { en: 'peace; and world, community', sk: 'mier; a tiež svet, obec' } },
                    { form: 'Jaromír', language: 'slavic', gloss: { en: 'the masculine compound', sk: 'mužské zložené meno' } },
                    { form: 'Jaromíra', language: 'slovak', gloss: { en: 'the feminine form', sk: 'ženská podoba' } },
                ],
                gloss: { en: 'vigorous peace', sk: 'silný mier' },
                confidence: 'probable',
                epistemicClass: 'etymological-fact',
                summary: {
                    en: 'Jaromíra is the feminine of the old Slavic compound Jaromír. Both elements are secure, but their sense is not: jarъ covers fierce and vigorous as well as spring-like, and mirъ means both peace and world, so several readings of the whole are equally defensible.',
                    sk: 'Jaromíra je ženskou podobou starého slovanského zloženého mena Jaromír. Oba prvky sú isté, ich zmysel však nie: jarъ pokrýva významy prudký a silný aj jarný a mirъ znamená mier aj svet, takže viacero výkladov celku je rovnako obhájiteľných.',
                },
                provenance: ['slavic-onomastics'],
            },
        ],
        meaning: {
            literal: { en: 'vigorous peace', sk: 'silný mier' },
            traditional: { en: 'she who brings strong peace', sk: 'tá, ktorá prináša silný mier' },
        },
        culturalSpread: [
            { id: 'jaromira-west-slavic', region: { en: 'Slovakia, Czechia', sk: 'Slovensko, Česko' }, forms: ['Jaromíra'] },
            { id: 'jaromira-poland', region: { en: 'Poland', sk: 'Poľsko' }, forms: ['Jaromira'] },
        ],
        variants: [
            { form: 'Jaromira', kind: 'spelling', language: 'polish', resolvesToCanonical: true },
            { form: 'Jarka', kind: 'diminutive', language: 'slovak', resolvesToCanonical: false,
                note: { en: 'Shared with Jarmila and Jaroslava, so not resolved automatically.', sk: 'Spoločná s menami Jarmila a Jaroslava, preto sa automaticky nepriraďuje.' } },
        ],
        relatedNames: [
            { canonicalKey: 'jaromir', relation: 'feminine-form' },
            { canonicalKey: 'jaroslava', relation: 'shares-root' },
            { canonicalKey: 'miroslava', relation: 'shares-root',
                note: { en: 'Shares the mirъ element, not the jarъ element.', sk: 'Zhoduje sa v prvku mirъ, nie v prvku jarъ.' } },
        ],
        confidence: 'probable',
        notes: [
            {
                id: 'jaromira-mir-ambiguity',
                kind: 'linguistic',
                text: {
                    en: 'The -mír element is regularly glossed as peace. Proto-Slavic mirъ carried both peace and world, and in old compound names the second sense may often have been meant, so a single confident translation overstates what is known.',
                    sk: 'Prvok -mír sa pravidelne vykladá ako mier. Praslovanské mirъ znamenalo mier aj svet a v starých zložených menách sa často mohol myslieť druhý význam, takže jediný sebavedomý preklad hovorí viac, než sa vie.',
                },
            },
        ],
        provenance: ['slavic-onomastics', 'sk-web-calendars'],
    },
    {
        canonicalKey: 'matias',
        canonicalName: 'Matias',
        gender: 'masculine',
        origins: [
            {
                id: 'matias-hebrew-mattityahu',
                sourceLanguage: 'hebrew',
                culture: { en: 'Hebrew, biblical', sk: 'Hebrejská, biblická' },
                derivation: [
                    { form: 'mattan', language: 'hebrew', gloss: { en: 'gift', sk: 'dar' } },
                    { form: 'Mattityahu', language: 'hebrew', gloss: { en: 'gift of Yahweh', sk: 'dar Jahveho' } },
                    { form: 'Matthias', language: 'ancient-greek', gloss: { en: 'the Greek contraction used in the New Testament', sk: 'grécka stiahnutá podoba použitá v Novom zákone' } },
                    { form: 'Matias', language: 'spanish', gloss: { en: 'the Iberian and Scandinavian spelling', sk: 'iberská a škandinávska podoba zápisu' } },
                ],
                gloss: { en: 'gift of God', sk: 'dar Boží' },
                confidence: 'well-attested',
                epistemicClass: 'etymological-fact',
                summary: {
                    en: 'Matias is a modern spelling of Matthias, the Greek contraction of Hebrew Mattityahu, gift of Yahweh. The same Hebrew name gives Slovak Matej, so the two are one name arriving by two routes and two spellings.',
                    sk: 'Matias je moderný zápis mena Matthias, gréckej stiahnutej podoby hebrejského Mattityahu, dar Jahveho. To isté hebrejské meno dáva slovenské Matej, takže ide o jedno meno, ktoré prišlo dvoma cestami a v dvoch zápisoch.',
                },
                provenance: ['biblical-onomastics', 'onomastic-consensus'],
            },
        ],
        meaning: { literal: { en: 'gift of God', sk: 'dar Boží' } },
        history: {
            en: 'The spelling without the doubled t is Spanish, Portuguese and Finnish, and it spread internationally in the late twentieth century. The Slovak calendar lists it separately from the long-established Matej, which is the same name in its domestic form.',
            sk: 'Zápis bez zdvojeného t je španielsky, portugalský a fínsky a medzinárodne sa rozšíril na konci 20. storočia. Slovenský kalendár ho uvádza oddelene od dávno zaužívaného mena Matej, ktoré je tým istým menom v domácej podobe.',
        },
        culturalSpread: [
            { id: 'matias-iberian', region: { en: 'Spain, Portugal, Latin America', sk: 'Španielsko, Portugalsko, Latinská Amerika' }, forms: ['Matías', 'Matias'] },
            { id: 'matias-nordic', region: { en: 'Finland, Norway', sk: 'Fínsko, Nórsko' }, forms: ['Matias'] },
            { id: 'matias-slovakia', region: { en: 'Slovakia', sk: 'Slovensko' }, forms: ['Matias', 'Matiáš'] },
        ],
        variants: [
            { form: 'Matías', kind: 'spelling', language: 'spanish', resolvesToCanonical: true },
            { form: 'Matiáš', kind: 'spelling', language: 'slovak', resolvesToCanonical: true },
        ],
        relatedNames: [
            { canonicalKey: 'matej', relation: 'shares-root' },
            { canonicalKey: 'matus', relation: 'shares-root',
                note: { en: 'Matúš is from Mattityahu as well, through the separate Greek form Matthaios.', sk: 'Aj meno Matúš je z Mattityahu, ale cez samostatnú grécku podobu Matthaios.' } },
        ],
        confidence: 'well-attested',
        notes: [],
        provenance: ['biblical-onomastics', 'onomastic-consensus', 'sk-web-calendars'],
    },
    {
        canonicalKey: 'leticia',
        canonicalName: 'Letícia',
        gender: 'feminine',
        origins: [
            {
                id: 'leticia-latin-laetitia',
                sourceLanguage: 'latin',
                culture: { en: 'Roman, then Christian', sk: 'Rímska, potom kresťanská' },
                derivation: [
                    { form: 'laetus', language: 'latin', gloss: { en: 'glad, joyful; also fertile, of land', sk: 'radostný, veselý; pri pôde aj úrodný' } },
                    { form: 'laetitia', language: 'latin', gloss: { en: 'gladness, joy', sk: 'radosť, veselosť' } },
                    { form: 'Laetitia', language: 'latin', gloss: { en: 'the word used as a personal name', sk: 'slovo použité ako osobné meno' } },
                ],
                gloss: { en: 'joy, gladness', sk: 'radosť, veselosť' },
                confidence: 'well-attested',
                epistemicClass: 'etymological-fact',
                summary: {
                    en: 'Letícia is the Latin abstract noun laetitia, joy, used as a name. Roman writers also used the adjective laetus of fertile ground, so the older sense of the word sits somewhere between gladness and abundance.',
                    sk: 'Letícia je latinské abstraktné podstatné meno laetitia, radosť, použité ako meno. Rímski autori používali prídavné meno laetus aj o úrodnej pôde, takže starší význam slova stojí kdesi medzi radosťou a hojnosťou.',
                },
                provenance: ['classical-onomastics', 'onomastic-consensus'],
            },
        ],
        meaning: { literal: { en: 'joy, gladness', sk: 'radosť, veselosť' } },
        history: {
            en: 'Christian use made it one of the virtue names of the Latin West, and it became widespread in France as Laetitia and in Spain and Portugal as Leticia and Letícia. Slovak took the Portuguese-shaped spelling, which is the newer route.',
            sk: 'Kresťanské používanie z neho urobilo jedno z mien cností latinského Západu a rozšírilo sa vo Francúzsku ako Laetitia a v Španielsku a Portugalsku ako Leticia a Letícia. Slovenčina prevzala zápis portugalského typu, čo je novšia cesta.',
        },
        culturalSpread: [
            { id: 'leticia-france', region: { en: 'France', sk: 'Francúzsko' }, forms: ['Laetitia', 'Lætitia'] },
            { id: 'leticia-iberian', region: { en: 'Spain, Portugal, Brazil', sk: 'Španielsko, Portugalsko, Brazília' }, forms: ['Leticia', 'Letícia'] },
            { id: 'leticia-slovakia', region: { en: 'Slovakia', sk: 'Slovensko' }, forms: ['Letícia'] },
        ],
        variants: [
            { form: 'Laetitia', kind: 'language-form', language: 'latin', resolvesToCanonical: true },
            { form: 'Leticia', kind: 'spelling', language: 'spanish', resolvesToCanonical: true },
        ],
        relatedNames: [],
        confidence: 'well-attested',
        notes: [],
        provenance: ['classical-onomastics', 'onomastic-consensus', 'sk-web-calendars'],
    },
    {
        canonicalKey: 'benedikt',
        canonicalName: 'Benedikt',
        gender: 'masculine',
        origins: [
            {
                id: 'benedikt-latin-benedictus',
                sourceLanguage: 'latin',
                culture: { en: 'Latin Christian', sk: 'Latinská kresťanská' },
                derivation: [
                    { form: 'bene', language: 'latin', gloss: { en: 'well', sk: 'dobre' } },
                    { form: 'dicere', language: 'latin', gloss: { en: 'to speak, to say', sk: 'hovoriť, povedať' } },
                    { form: 'benedictus', language: 'latin', gloss: { en: 'well spoken of, blessed', sk: 'dobre spomínaný, požehnaný' } },
                ],
                gloss: { en: 'blessed', sk: 'požehnaný' },
                confidence: 'well-attested',
                epistemicClass: 'etymological-fact',
                summary: {
                    en: 'Benedikt is the Latin participle benedictus, literally well spoken of, which Christian Latin narrowed to blessed. The derivation is completely transparent and the name is one of the best documented in the Western calendar.',
                    sk: 'Benedikt je latinské príčastie benedictus, doslova dobre spomínaný, ktoré kresťanská latinčina zúžila na požehnaný. Odvodenie je úplne priehľadné a meno patrí k najlepšie doloženým v západnom kalendári.',
                },
                provenance: ['classical-onomastics', 'onomastic-consensus'],
            },
        ],
        meaning: {
            literal: { en: 'well spoken of', sk: 'dobre spomínaný' },
            traditional: { en: 'blessed', sk: 'požehnaný' },
        },
        history: {
            en: 'Benedict of Nursia, the sixth-century founder of Western monasticism, carried the name across Latin Europe, and sixteen popes have since borne it. Slovak has both the domestic Benadik, older and used in place names, and this international Latin spelling, which the calendar now lists.',
            sk: 'Benedikt z Nursie, zakladateľ západného mníšstva zo 6. storočia, rozniesol meno po latinskej Európe a odvtedy ho nosilo šestnásť pápežov. Slovenčina má domácu podobu Benadik, staršiu a doloženú v miestnych názvoch, aj tento medzinárodný latinský zápis, ktorý kalendár teraz uvádza.',
        },
        culturalSpread: [
            { id: 'benedikt-latin-west', region: { en: 'Italy, France, Spain', sk: 'Taliansko, Francúzsko, Španielsko' }, forms: ['Benedetto', 'Benoît', 'Benito'] },
            { id: 'benedikt-central-europe', region: { en: 'Slovakia, Czechia, Poland, Germany', sk: 'Slovensko, Česko, Poľsko, Nemecko' }, forms: ['Benedikt', 'Benedykt'] },
        ],
        variants: [
            { form: 'Benedetto', kind: 'language-form', language: 'italian', resolvesToCanonical: true },
            { form: 'Benoît', kind: 'language-form', language: 'french', resolvesToCanonical: true },
            { form: 'Benedykt', kind: 'language-form', language: 'polish', resolvesToCanonical: true },
            { form: 'Benito', kind: 'language-form', language: 'spanish', resolvesToCanonical: true },
        ],
        relatedNames: [
            { canonicalKey: 'benadik', relation: 'shares-root',
                note: { en: 'Benadik is the older domestic Slovak form of the same Latin name.', sk: 'Benadik je staršia domáca slovenská podoba toho istého latinského mena.' } },
        ],
        confidence: 'well-attested',
        notes: [],
        provenance: ['classical-onomastics', 'onomastic-consensus', 'sk-web-calendars'],
    },
    {
        canonicalKey: 'justin',
        canonicalName: 'Justín',
        gender: 'masculine',
        origins: [
            {
                id: 'justin-latin-iustus',
                sourceLanguage: 'latin',
                culture: { en: 'Roman, then Christian', sk: 'Rímska, potom kresťanská' },
                derivation: [
                    { form: 'ius', language: 'latin', gloss: { en: 'law, right', sk: 'právo' } },
                    { form: 'iustus', language: 'latin', gloss: { en: 'just, lawful, upright', sk: 'spravodlivý, zákonný, priamy' } },
                    { form: 'Iustinus', language: 'latin', gloss: { en: 'a derivative of Iustus', sk: 'meno odvodené od Iustus' } },
                ],
                gloss: { en: 'just, upright', sk: 'spravodlivý' },
                confidence: 'well-attested',
                epistemicClass: 'etymological-fact',
                summary: {
                    en: 'Iustinus is a Latin derivative of the cognomen Iustus, from iustus, just, itself from ius, law. It belongs to the family of Roman names taken from moral vocabulary rather than from places or trades.',
                    sk: 'Iustinus je latinské meno odvodené od prímenia Iustus zo slova iustus, spravodlivý, ktoré je zo slova ius, právo. Patrí do skupiny rímskych mien prevzatých z mravnej slovnej zásoby, nie z miest či remesiel.',
                },
                provenance: ['classical-onomastics', 'onomastic-consensus'],
            },
        ],
        meaning: { literal: { en: 'just, upright', sk: 'spravodlivý' } },
        history: {
            en: 'The name was carried by Justin Martyr, a second-century Christian philosopher, and by two Byzantine emperors. The feminine Justína has long been in the Slovak calendar; the masculine was added later.',
            sk: 'Meno nosil Justín Mučeník, kresťanský filozof z 2. storočia, a dvaja byzantskí cisári. Ženská podoba Justína je v slovenskom kalendári dlho, mužská bola doplnená neskôr.',
        },
        culturalSpread: [
            { id: 'justin-romance', region: { en: 'France, Spain, Italy', sk: 'Francúzsko, Španielsko, Taliansko' }, forms: ['Justin', 'Justino', 'Giustino'] },
            { id: 'justin-central-europe', region: { en: 'Slovakia, Czechia, Poland', sk: 'Slovensko, Česko, Poľsko' }, forms: ['Justín', 'Justyn'] },
        ],
        variants: [
            { form: 'Justinus', kind: 'language-form', language: 'latin', resolvesToCanonical: true },
            { form: 'Justyn', kind: 'language-form', language: 'polish', resolvesToCanonical: true },
            { form: 'Giustino', kind: 'language-form', language: 'italian', resolvesToCanonical: true },
        ],
        relatedNames: [
            { canonicalKey: 'justina', relation: 'feminine-form' },
        ],
        confidence: 'well-attested',
        notes: [],
        provenance: ['classical-onomastics', 'onomastic-consensus', 'sk-web-calendars'],
    },
    {
        canonicalKey: 'marko',
        canonicalName: 'Marko',
        gender: 'masculine',
        origins: [
            {
                id: 'marko-latin-marcus',
                sourceLanguage: 'latin',
                culture: { en: 'Roman, through Slavic Christian usage', sk: 'Rímska, cez slovanské kresťanské používanie' },
                derivation: [
                    { form: 'Mars', language: 'latin', gloss: { en: 'the Roman god of war', sk: 'rímsky boh vojny' } },
                    { form: 'Marcus', language: 'latin', gloss: { en: 'an old Roman first name, taken as dedicated to Mars', sk: 'staré rímske osobné meno chápané ako zasvätené Marsovi' } },
                    { form: 'Markos', language: 'byzantine-greek', gloss: { en: 'the Greek form of the evangelist name', sk: 'grécka podoba mena evanjelistu' } },
                    { form: 'Marko', language: 'slavic', gloss: { en: 'the Slavic form', sk: 'slovanská podoba' } },
                ],
                gloss: { en: 'of Mars', sk: 'Marsov, zasvätený Marsovi' },
                confidence: 'probable',
                epistemicClass: 'etymological-fact',
                summary: {
                    en: 'Marko is the Slavic form of Latin Marcus, which reached the Slavs through the Greek Markos of the Gospel writer. The connection of Marcus with the god Mars is the standard reading, though the name is old enough that the link cannot be documented directly.',
                    sk: 'Marko je slovanská podoba latinského mena Marcus, ktoré sa k Slovanom dostalo cez grécke Markos, meno evanjelistu. Spojenie mena Marcus s bohom Marsom je štandardný výklad, meno je však také staré, že sa táto väzba nedá priamo doložiť.',
                },
                provenance: ['classical-onomastics', 'onomastic-consensus'],
            },
        ],
        meaning: { literal: { en: 'of Mars', sk: 'Marsov, zasvätený Marsovi' } },
        history: {
            en: 'Marko is the everyday South Slavic form and is carried by the hero of Serbian and Macedonian epic, Kraljevic Marko. It entered the Slovak calendar alongside the domestic Marek, which is the same name in West Slavic shape.',
            sk: 'Marko je bežná juhoslovanská podoba a nosí ho hrdina srbskej a macedónskej epiky Kraljevic Marko. Do slovenského kalendára sa dostalo popri domácom mene Marek, ktoré je tým istým menom v západoslovanskej podobe.',
        },
        culturalSpread: [
            { id: 'marko-south-slavic', region: { en: 'Serbia, Croatia, North Macedonia, Slovenia', sk: 'Srbsko, Chorvátsko, Severné Macedónsko, Slovinsko' }, forms: ['Marko', 'Марко'] },
            { id: 'marko-finland', region: { en: 'Finland, Estonia', sk: 'Fínsko, Estónsko' }, forms: ['Marko'] },
            { id: 'marko-slovakia', region: { en: 'Slovakia', sk: 'Slovensko' }, forms: ['Marko'] },
        ],
        variants: [
            { form: 'Марко', kind: 'transliteration', language: 'serbo-croatian', resolvesToCanonical: true },
        ],
        relatedNames: [
            { canonicalKey: 'marek', relation: 'shares-root',
                note: { en: 'The same Latin name in its West Slavic form; the two are held as separate calendar entries.', sk: 'To isté latinské meno v západoslovanskej podobe; obe sa vedú ako samostatné kalendárne položky.' } },
            { canonicalKey: 'marcel', relation: 'shares-root' },
            { canonicalKey: 'martin', relation: 'shares-root',
                note: { en: 'Also built on the name of Mars, by a different suffix.', sk: 'Tiež utvorené od mena Mars, ale inou príponou.' } },
        ],
        confidence: 'probable',
        notes: [],
        provenance: ['classical-onomastics', 'onomastic-consensus', 'sk-web-calendars'],
    },
    {
        canonicalKey: 'markus',
        canonicalName: 'Markus',
        gender: 'masculine',
        origins: [
            {
                id: 'markus-latin-marcus',
                sourceLanguage: 'latin',
                culture: { en: 'Roman, through Germanic Christian usage', sk: 'Rímska, cez germánske kresťanské používanie' },
                derivation: [
                    { form: 'Mars', language: 'latin', gloss: { en: 'the Roman god of war', sk: 'rímsky boh vojny' } },
                    { form: 'Marcus', language: 'latin', gloss: { en: 'an old Roman first name', sk: 'staré rímske osobné meno' } },
                    { form: 'Markus', language: 'german', gloss: { en: 'the German and Scandinavian spelling', sk: 'nemecký a škandinávsky zápis' } },
                ],
                gloss: { en: 'of Mars', sk: 'Marsov, zasvätený Marsovi' },
                confidence: 'probable',
                epistemicClass: 'etymological-fact',
                summary: {
                    en: 'Markus is simply Marcus written with k, the spelling used in German and in the Nordic languages. It is the same Roman name as Marek and Marko and differs from them only in the route it took.',
                    sk: 'Markus je jednoducho meno Marcus zapísané s k, ako sa píše v nemčine a v severských jazykoch. Ide o to isté rímske meno ako Marek a Marko a líši sa len cestou, ktorou prišlo.',
                },
                provenance: ['classical-onomastics', 'onomastic-consensus'],
            },
        ],
        meaning: { literal: { en: 'of Mars', sk: 'Marsov, zasvätený Marsovi' } },
        history: {
            en: 'The k spelling is the ordinary German and Scandinavian one and became internationally common in the twentieth century. Its place in the Slovak calendar is recent and reflects that borrowing.',
            sk: 'Zápis s k je bežný nemecký a škandinávsky a v 20. storočí sa medzinárodne rozšíril. Miesto v slovenskom kalendári má nedávne a odráža toto prevzatie.',
        },
        culturalSpread: [
            { id: 'markus-german', region: { en: 'Germany, Austria', sk: 'Nemecko, Rakúsko' }, forms: ['Markus'] },
            { id: 'markus-nordic', region: { en: 'Sweden, Norway, Finland', sk: 'Švédsko, Nórsko, Fínsko' }, forms: ['Markus', 'Marcus'] },
            { id: 'markus-slovakia', region: { en: 'Slovakia', sk: 'Slovensko' }, forms: ['Markus'] },
        ],
        variants: [],
        relatedNames: [
            { canonicalKey: 'marek', relation: 'shares-root' },
            { canonicalKey: 'marko', relation: 'shares-root' },
            { canonicalKey: 'marcel', relation: 'shares-root' },
        ],
        confidence: 'probable',
        notes: [
            {
                id: 'markus-alias-caution',
                kind: 'usage',
                text: {
                    en: 'Markus, Marko and Marek are the same Roman name. The Slovak calendar gives them separate entries and separate days, so they are kept as separate records here.',
                    sk: 'Markus, Marko a Marek sú tým istým rímskym menom. Slovenský kalendár im dáva samostatné položky a samostatné dni, preto sa tu vedú ako samostatné záznamy.',
                },
            },
        ],
        provenance: ['classical-onomastics', 'onomastic-consensus', 'sk-web-calendars'],
    },
    {
        canonicalKey: 'leo',
        canonicalName: 'Leo',
        gender: 'masculine',
        origins: [
            {
                id: 'leo-latin-lion',
                sourceLanguage: 'latin',
                culture: { en: 'Roman, then Christian', sk: 'Rímska, potom kresťanská' },
                derivation: [
                    { form: 'leon', language: 'ancient-greek', gloss: { en: 'lion', sk: 'lev' } },
                    { form: 'leo', language: 'latin', gloss: { en: 'lion', sk: 'lev' } },
                    { form: 'Leo', language: 'latin', gloss: { en: 'the word used as a personal name', sk: 'slovo použité ako osobné meno' } },
                ],
                gloss: { en: 'lion', sk: 'lev' },
                confidence: 'well-attested',
                epistemicClass: 'etymological-fact',
                summary: {
                    en: 'Leo is the Latin word for lion used directly as a name, itself borrowed from Greek leon. Late antique and Byzantine usage made it an imperial and papal name, and it never stopped being transparent to speakers of Latin-descended languages.',
                    sk: 'Leo je latinské slovo pre leva použité priamo ako meno; samotné slovo je prevzaté z gréckeho leon. Neskoroantické a byzantské používanie z neho urobilo cisárske a pápežské meno a pre hovoriacich jazykmi z latinčiny nikdy neprestalo byť priehľadné.',
                },
                provenance: ['classical-onomastics', 'onomastic-consensus'],
            },
        ],
        meaning: { literal: { en: 'lion', sk: 'lev' } },
        history: {
            en: 'Thirteen popes have carried the name, beginning with Leo the Great. In modern Central Europe it is also used as a short form of Leonard and Leopold, which is a separate route to the same three letters and not a second etymology of the name itself.',
            sk: 'Meno nosilo trinásť pápežov, počnúc Levom Veľkým. V modernej strednej Európe sa používa aj ako skrátená podoba mien Leonard a Leopold, čo je samostatná cesta k tým istým trom písmenám, nie druhá etymológia samotného mena.',
        },
        culturalSpread: [
            { id: 'leo-latin-west', region: { en: 'Italy, Germany, Austria', sk: 'Taliansko, Nemecko, Rakúsko' }, forms: ['Leo', 'Leone'] },
            { id: 'leo-slavic', region: { en: 'Slovakia, Czechia, Poland', sk: 'Slovensko, Česko, Poľsko' }, forms: ['Leo', 'Lev', 'Leon'] },
        ],
        variants: [
            { form: 'Leon', kind: 'language-form', resolvesToCanonical: false,
                note: { en: 'A closely related name from the Greek form; kept separate because it is used independently.', sk: 'Blízke meno z gréckej podoby; vedie sa samostatne, lebo sa používa nezávisle.' } },
            { form: 'Leone', kind: 'language-form', language: 'italian', resolvesToCanonical: true },
        ],
        relatedNames: [
            { canonicalKey: 'leonard', relation: 'shares-root',
                note: { en: 'Leonard joins the same lion element to a Germanic word for hardy.', sk: 'Meno Leonard spája ten istý prvok lev s germánskym slovom s významom tvrdý.' } },
            { canonicalKey: 'leopold', relation: 'shares-root',
                note: { en: 'Linked by usage as a short form; Leopold is Germanic and its first element is not the lion word.', sk: 'Spojené používaním ako skrátená podoba; Leopold je germánsky a jeho prvý prvok nie je slovo lev.' } },
            { canonicalKey: 'levoslav', relation: 'shares-root' },
        ],
        confidence: 'well-attested',
        notes: [
            {
                id: 'leo-short-form-usage',
                kind: 'usage',
                text: {
                    en: 'Leo is both a full name of its own and a short form of Leonard and Leopold. The two facts are often blurred; only the first is an etymology.',
                    sk: 'Leo je samostatné meno aj skrátená podoba mien Leonard a Leopold. Tieto dve skutočnosti sa často zamieňajú; etymológiou je len tá prvá.',
                },
            },
        ],
        provenance: ['classical-onomastics', 'onomastic-consensus', 'sk-web-calendars'],
    },
    {
        canonicalKey: 'lesia',
        canonicalName: 'Lesia',
        gender: 'feminine',
        origins: [
            {
                id: 'lesia-from-oleksandra',
                sourceLanguage: 'ukrainian',
                culture: { en: 'Ukrainian', sk: 'Ukrajinská' },
                derivation: [
                    { form: 'Alexandros', language: 'ancient-greek', gloss: { en: 'defender of men', sk: 'obranca mužov' } },
                    { form: 'Олександра', language: 'ukrainian', gloss: { en: 'Oleksandra, the Ukrainian form of Alexandra', sk: 'Oleksandra, ukrajinská podoba mena Alexandra' } },
                    { form: 'Леся', language: 'ukrainian', gloss: { en: 'Lesia, a hypocoristic cut from the middle of the name', sk: 'Lesia, domácka podoba vyňatá zo stredu mena' } },
                ],
                gloss: { en: 'short form of Oleksandra', sk: 'skrátená podoba mena Oleksandra' },
                confidence: 'disputed',
                epistemicClass: 'disputed-origin',
                summary: {
                    en: 'The commonest account makes Lesia a Ukrainian pet form of Oleksandra, taken from the middle syllables rather than the beginning or the end. This kind of internal clipping is normal in East Slavic hypocoristics.',
                    sk: 'Najbežnejší výklad považuje meno Lesia za ukrajinskú domácku podobu mena Oleksandra, vyňatú zo stredných slabík, nie zo začiatku či konca. Takéto vnútorné skracovanie je vo východoslovanských domáckych podobách bežné.',
                },
                provenance: ['slavic-onomastics', 'contested-etymology'],
            },
            {
                id: 'lesia-from-larysa',
                sourceLanguage: 'ukrainian',
                culture: { en: 'Ukrainian', sk: 'Ukrajinská' },
                derivation: [
                    { form: 'Λάρισα', language: 'ancient-greek', gloss: { en: 'Larissa, a Thessalian city name of pre-Greek origin', sk: 'Larissa, názov tesálskeho mesta predgréckeho pôvodu' } },
                    { form: 'Лариса', language: 'ukrainian', gloss: { en: 'Larysa', sk: 'Larysa' } },
                    { form: 'Леся', language: 'ukrainian', gloss: { en: 'Lesia', sk: 'Lesia' } },
                ],
                gloss: { en: 'short form of Larysa', sk: 'skrátená podoba mena Larysa' },
                confidence: 'disputed',
                epistemicClass: 'disputed-origin',
                summary: {
                    en: 'A second account attaches Lesia to Larysa instead. The best known bearer supports it: the poet who wrote as Lesia Ukrainka was christened Larysa Kosach. Which of the two names the pet form originally belonged to cannot be settled.',
                    sk: 'Druhý výklad spája meno Lesia s menom Larysa. Podporuje ho najznámejšia nositeľka: poetka píšuca ako Lesia Ukrajinka bola pokrstená ako Larysa Kosachová. Ktorému z oboch mien domácka podoba pôvodne patrila, sa rozhodnúť nedá.',
                },
                provenance: ['slavic-onomastics', 'contested-etymology'],
            },
        ],
        meaning: {
            literal: null,
            traditional: { en: 'a Ukrainian short form of a longer name', sk: 'ukrajinská skrátená podoba dlhšieho mena' },
        },
        history: {
            en: 'The name owes its independence almost entirely to Lesia Ukrainka, whose pen name turned a household form into a name used on its own from the late nineteenth century. It reached the Slovak calendar as a Slavic borrowing.',
            sk: 'Za svoju samostatnosť vďačí meno takmer výlučne Lesii Ukrajinke, ktorej literárny pseudonym premenil domácku podobu na samostatne používané meno od konca 19. storočia. Do slovenského kalendára sa dostalo ako slovanská výpožička.',
        },
        culturalSpread: [
            { id: 'lesia-ukraine', region: { en: 'Ukraine', sk: 'Ukrajina' }, forms: ['Леся', 'Lesia'] },
            { id: 'lesia-slovakia', region: { en: 'Slovakia', sk: 'Slovensko' }, forms: ['Lesia', 'Lesja'] },
        ],
        variants: [
            { form: 'Леся', kind: 'transliteration', language: 'ukrainian', resolvesToCanonical: true },
            { form: 'Lesja', kind: 'spelling', resolvesToCanonical: true },
        ],
        relatedNames: [
            { canonicalKey: 'alexandra', relation: 'derived-from',
                note: { en: 'Only on the first of the two accounts.', sk: 'Len podľa prvého z oboch výkladov.' } },
        ],
        confidence: 'disputed',
        notes: [
            {
                id: 'lesia-no-forest',
                kind: 'folk-etymology',
                text: {
                    en: 'Lesia is sometimes linked to the Slavic word les, forest. There is no support for that: the name is a hypocoristic of a borrowed Greek name and the resemblance to les is accidental.',
                    sk: 'Meno Lesia sa niekedy spája so slovanským slovom les. Pre to nie sú doklady: ide o domácku podobu prevzatého gréckeho mena a podobnosť so slovom les je náhodná.',
                },
            },
        ],
        provenance: ['slavic-onomastics', 'contested-etymology', 'sk-web-calendars'],
    },
    {
        canonicalKey: 'hermina',
        canonicalName: 'Hermína',
        gender: 'feminine',
        origins: [
            {
                id: 'hermina-germanic-heri',
                sourceLanguage: 'proto-germanic',
                culture: { en: 'Germanic', sk: 'Germánska' },
                derivation: [
                    { form: 'harjaz', language: 'proto-germanic', reconstructed: true, gloss: { en: 'army, host', sk: 'vojsko, zástup' } },
                    { form: 'heri', language: 'old-high-german', gloss: { en: 'army', sk: 'vojsko' } },
                    { form: 'man', language: 'old-high-german', gloss: { en: 'man', sk: 'muž' } },
                    { form: 'Herman', language: 'old-high-german', gloss: { en: 'army man, warrior', sk: 'muž vojska, bojovník' } },
                    { form: 'Hermina', language: 'latin', gloss: { en: 'a Latinate feminine derivative', sk: 'ženské meno odvodené latinskou príponou' } },
                ],
                gloss: { en: 'of the army, warrior', sk: 'vojská sa týkajúca, bojovníčka' },
                confidence: 'well-attested',
                epistemicClass: 'etymological-fact',
                summary: {
                    en: 'Hermína is the feminine of the Germanic Herman, army man, made with the Latin suffix -ina. Both elements of the masculine are ordinary Old High German words, which makes the derivation secure.',
                    sk: 'Hermína je ženskou podobou germánskeho mena Herman, muž vojska, utvorenou latinskou príponou -ina. Oba prvky mužského mena sú bežné starohornonemecké slová, čo robí odvodenie istým.',
                },
                provenance: ['germanic-onomastics', 'onomastic-consensus'],
            },
        ],
        meaning: { literal: { en: 'of the army', sk: 'vojská sa týkajúca' } },
        history: {
            en: 'The feminine was formed in the German-speaking lands and spread through the Habsburg territories, which is how it reached both Hungarian and Slovak calendars. Hermione, the Greek name, resembles it but is unrelated.',
            sk: 'Ženská podoba vznikla v nemecky hovoriacich krajinách a rozšírila sa cez habsburské územia, čím sa dostala do maďarského aj slovenského kalendára. Grécke meno Hermiona sa naň podobá, ale nesúvisí s ním.',
        },
        culturalSpread: [
            { id: 'hermina-german', region: { en: 'Germany, Austria, Netherlands', sk: 'Nemecko, Rakúsko, Holandsko' }, forms: ['Hermine', 'Hermina'] },
            { id: 'hermina-central-europe', region: { en: 'Slovakia, Hungary', sk: 'Slovensko, Maďarsko' }, forms: ['Hermína'] },
        ],
        variants: [
            { form: 'Hermine', kind: 'language-form', language: 'german', resolvesToCanonical: true },
            { form: 'Herminia', kind: 'language-form', language: 'spanish', resolvesToCanonical: true },
        ],
        relatedNames: [
            { canonicalKey: 'herman', relation: 'feminine-form' },
        ],
        confidence: 'well-attested',
        notes: [
            {
                id: 'hermina-not-hermes',
                kind: 'linguistic',
                text: {
                    en: 'Hermína is not connected with Hermes or with the Greek Hermione. The resemblance is a coincidence between a Germanic her- and a Greek Herm-.',
                    sk: 'Meno Hermína nesúvisí s Hermom ani s gréckym menom Hermiona. Podobnosť je náhodou medzi germánskym her- a gréckym Herm-.',
                },
            },
        ],
        provenance: ['germanic-onomastics', 'onomastic-consensus', 'sk-web-calendars'],
    },
    {
        canonicalKey: 'rita',
        canonicalName: 'Rita',
        gender: 'feminine',
        origins: [
            {
                id: 'rita-italian-margherita',
                sourceLanguage: 'ancient-greek',
                culture: { en: 'Greek, by way of Italian', sk: 'Grécka, cez taliančinu' },
                derivation: [
                    { form: 'margarites', language: 'ancient-greek', gloss: { en: 'pearl', sk: 'perla' } },
                    { form: 'Margarita', language: 'latin', gloss: { en: 'the Latin name', sk: 'latinské meno' } },
                    { form: 'Margherita', language: 'italian', gloss: { en: 'the Italian form', sk: 'talianska podoba' } },
                    { form: 'Rita', language: 'italian', gloss: { en: 'shortened from the end of Margherita', sk: 'skrátené z konca mena Margherita' } },
                ],
                gloss: { en: 'pearl', sk: 'perla' },
                confidence: 'well-attested',
                epistemicClass: 'etymological-fact',
                summary: {
                    en: 'Rita is the tail of the Italian Margherita, cut off and used alone. The underlying Greek margarites means pearl and is itself thought to be a borrowing from an eastern language, which is where the trail stops.',
                    sk: 'Rita je koncová časť talianskeho mena Margherita, odseknutá a používaná samostatne. Základné grécke margarites znamená perla a samo sa pokladá za výpožičku z východného jazyka, kde sa stopa končí.',
                },
                provenance: ['classical-onomastics', 'onomastic-consensus'],
            },
        ],
        meaning: { literal: { en: 'pearl', sk: 'perla' } },
        history: {
            en: 'Rita became a name in its own right through Saint Rita of Cascia, a fifteenth-century Italian widow and nun whose cult made the short form independent. It spread internationally in the twentieth century and entered the Slovak calendar from that usage.',
            sk: 'Samostatným menom sa Rita stala vďaka svätej Rite z Cascie, talianskej vdove a rehoľníčke z 15. storočia, ktorej úcta osamostatnila skrátenú podobu. V 20. storočí sa meno rozšírilo medzinárodne a z tohto používania sa dostalo do slovenského kalendára.',
        },
        culturalSpread: [
            { id: 'rita-italy', region: { en: 'Italy', sk: 'Taliansko' }, forms: ['Rita'] },
            { id: 'rita-anglophone', region: { en: 'United States, Ireland', sk: 'Spojené štáty, Írsko' }, forms: ['Rita'] },
            { id: 'rita-central-europe', region: { en: 'Slovakia, Hungary, Czechia', sk: 'Slovensko, Maďarsko, Česko' }, forms: ['Rita'] },
        ],
        variants: [],
        relatedNames: [
            { canonicalKey: 'margareta', relation: 'derived-from' },
            { canonicalKey: 'margita', relation: 'shares-root' },
            { canonicalKey: 'perla', relation: 'shares-root',
                note: { en: 'Linked by meaning: Perla is the same idea in a Romance word, not a derivative of the Greek one.', sk: 'Spojené významom: Perla je tá istá predstava románskym slovom, nie odvodenina z gréckeho.' } },
        ],
        confidence: 'well-attested',
        notes: [
            {
                id: 'rita-sanskrit-caution',
                kind: 'folk-etymology',
                text: {
                    en: 'Rita is sometimes explained from the Sanskrit rta, cosmic order. The word exists, but there is no route by which it could have produced an Italian short form of Margherita, and the two are unconnected.',
                    sk: 'Meno Rita sa niekedy vysvetľuje zo sanskrtského rta, kozmický poriadok. Také slovo existuje, ale niet cesty, ktorou by mohlo dať taliansku skrátenú podobu mena Margherita, a obe spolu nesúvisia.',
                },
            },
        ],
        provenance: ['classical-onomastics', 'onomastic-consensus', 'sk-web-calendars'],
    },
    {
        canonicalKey: 'vanesa',
        canonicalName: 'Vanesa',
        gender: 'feminine',
        origins: [
            {
                id: 'vanesa-swift-coinage',
                sourceLanguage: 'english',
                culture: { en: 'English literary', sk: 'Anglická literárna' },
                derivation: [
                    { form: 'Vanhomrigh', language: 'english', gloss: { en: 'the surname of Esther Vanhomrigh, a Dublin friend of Jonathan Swift', sk: 'priezvisko Esther Vanhomrighovej, dublinskej priateľky Jonathana Swifta' } },
                    { form: 'Essa', language: 'english', gloss: { en: 'a pet form of Esther', sk: 'domácka podoba mena Esther' } },
                    { form: 'Vanessa', language: 'english', gloss: { en: 'Van- from the surname joined to -essa from the given name', sk: 'Van- z priezviska spojené s -essa z krstného mena' } },
                ],
                gloss: { en: 'an invented name, without a prior meaning', sk: 'vymyslené meno bez predchádzajúceho významu' },
                confidence: 'well-attested',
                epistemicClass: 'etymological-fact',
                summary: {
                    en: 'Vanessa was coined by Jonathan Swift around 1713 for his poem Cadenus and Vanessa, built from the name of Esther Vanhomrigh: the first syllable of her surname joined to a pet form of her given name. It had no meaning before Swift made it.',
                    sk: 'Meno Vanessa utvoril Jonathan Swift okolo roku 1713 pre báseň Cadenus and Vanessa z mena Esther Vanhomrighovej: prvá slabika priezviska spojená s domáckou podobou krstného mena. Pred Swiftom nemalo nijaký význam.',
                },
                provenance: ['onomastic-consensus'],
            },
        ],
        meaning: {
            literal: null,
            traditional: { en: 'a literary coinage of the early eighteenth century', sk: 'literárny novotvar zo začiatku 18. storočia' },
        },
        history: {
            en: 'The name left the poem, was later given by Linnaeus to a genus of butterflies, and became a common given name in English in the twentieth century. Slovak took it with a single s, and the calendar lists that spelling.',
            sk: 'Meno opustilo báseň, Linné ho neskôr dal rodu motýľov a v 20. storočí sa v angličtine stalo bežným krstným menom. Slovenčina ho prevzala s jedným s a kalendár uvádza tento zápis.',
        },
        culturalSpread: [
            { id: 'vanesa-anglophone', region: { en: 'United Kingdom, United States', sk: 'Spojené kráľovstvo, Spojené štáty' }, forms: ['Vanessa'] },
            { id: 'vanesa-central-europe', region: { en: 'Slovakia, Czechia, Poland', sk: 'Slovensko, Česko, Poľsko' }, forms: ['Vanesa', 'Vanessa'] },
        ],
        variants: [
            { form: 'Vanessa', kind: 'spelling', language: 'english', resolvesToCanonical: true },
            { form: 'Vanessza', kind: 'language-form', language: 'hungarian', resolvesToCanonical: true },
        ],
        relatedNames: [
            { canonicalKey: 'estera', relation: 'shares-root',
                note: { en: 'Only through the woman Swift named it for; the coinage is not a derivative of Esther.', sk: 'Len cez ženu, po ktorej ho Swift pomenoval; novotvar nie je odvodeninou mena Ester.' } },
        ],
        confidence: 'well-attested',
        notes: [
            {
                id: 'vanesa-butterfly-order',
                kind: 'historical',
                text: {
                    en: 'The butterfly genus Vanessa is named after the name, not the other way round. Explanations that make the name mean butterfly reverse the actual order of events.',
                    sk: 'Rod motýľov Vanessa je pomenovaný podľa mena, nie naopak. Výklady, podľa ktorých meno znamená motýľ, obracajú skutočný sled udalostí.',
                },
            },
        ],
        provenance: ['onomastic-consensus', 'sk-web-calendars'],
    },
    {
        canonicalKey: 'nela',
        canonicalName: 'Nela',
        gender: 'feminine',
        origins: [
            {
                id: 'nela-shortened-ella-names',
                sourceLanguage: 'latin',
                culture: { en: 'Central European, from Latin-derived names', sk: 'Stredoeurópska, z mien latinského pôvodu' },
                derivation: [
                    { form: '-nella', language: 'italian', gloss: { en: 'the diminutive ending of names such as Petronella and Antonella', sk: 'zdrobňujúce zakončenie mien ako Petronella a Antonella' } },
                    { form: 'Nella', language: 'italian', gloss: { en: 'the ending used alone as a name', sk: 'zakončenie použité samostatne ako meno' } },
                    { form: 'Nela', language: 'slovak', gloss: { en: 'the Slovak spelling with a single l', sk: 'slovenský zápis s jedným l' } },
                ],
                gloss: { en: 'short form of names ending in -nela', sk: 'skrátená podoba mien so zakončením -nela' },
                confidence: 'probable',
                epistemicClass: 'etymological-fact',
                summary: {
                    en: 'Nela is the detached ending of longer names, chiefly Petronela, Antonela, Kornélia and Daniela. It is a real short form with a real history, but it has no meaning of its own, because the syllable it preserves is a suffix and not a word.',
                    sk: 'Nela je osamostatnené zakončenie dlhších mien, predovšetkým Petronela, Antonela, Kornélia a Daniela. Je to skutočná skrátená podoba so skutočnými dejinami, nemá však vlastný význam, lebo slabika, ktorú zachováva, je prípona, nie slovo.',
                },
                provenance: ['onomastic-consensus', 'curated-summary'],
            },
        ],
        meaning: {
            literal: null,
            traditional: { en: 'a short form of several longer names', sk: 'skrátená podoba viacerých dlhších mien' },
        },
        history: {
            en: 'The short form became an independent registrable name in Italy and then in Central Europe during the twentieth century. Its recent popularity in Slovakia and Czechia is part of a broader preference for short two-syllable names.',
            sk: 'Skrátená podoba sa v 20. storočí osamostatnila ako zapisovateľné meno najprv v Taliansku a potom v strednej Európe. Jej nedávna obľuba na Slovensku a v Česku je súčasťou širšieho príklonu k krátkym dvojslabičným menám.',
        },
        culturalSpread: [
            { id: 'nela-italy', region: { en: 'Italy', sk: 'Taliansko' }, forms: ['Nella'] },
            { id: 'nela-central-europe', region: { en: 'Slovakia, Czechia, Poland, Croatia', sk: 'Slovensko, Česko, Poľsko, Chorvátsko' }, forms: ['Nela'] },
        ],
        variants: [
            { form: 'Nella', kind: 'spelling', language: 'italian', resolvesToCanonical: true },
        ],
        relatedNames: [
            { canonicalKey: 'petronela', relation: 'derived-from' },
            { canonicalKey: 'kornelia', relation: 'derived-from',
                note: { en: 'One of several possible source names; the short form does not identify which.', sk: 'Jedno z viacerých možných východiskových mien; skrátená podoba neprezrádza, o ktoré ide.' } },
            { canonicalKey: 'daniela', relation: 'derived-from',
                note: { en: 'Also a possible source; the short form is deliberately not resolved to any one of them.', sk: 'Tiež možné východisko; skrátená podoba sa zámerne nepriraďuje ani k jednému z nich.' } },
        ],
        confidence: 'probable',
        notes: [
            {
                id: 'nela-no-single-parent',
                kind: 'linguistic',
                text: {
                    en: 'Nela cannot be traced to one parent name. Sources that give it a single confident origin are choosing one of several equally possible ones.',
                    sk: 'Meno Nela sa nedá odvodiť od jediného východiskového mena. Zdroje, ktoré mu sebavedomo pripisujú jeden pôvod, si vyberajú jedno z viacerých rovnako možných.',
                },
            },
        ],
        provenance: ['onomastic-consensus', 'curated-summary', 'sk-web-calendars'],
    },
    {
        canonicalKey: 'greta',
        canonicalName: 'Gréta',
        gender: 'feminine',
        origins: [
            {
                id: 'greta-german-margarete',
                sourceLanguage: 'ancient-greek',
                culture: { en: 'Greek, by way of German', sk: 'Grécka, cez nemčinu' },
                derivation: [
                    { form: 'margarites', language: 'ancient-greek', gloss: { en: 'pearl', sk: 'perla' } },
                    { form: 'Margarita', language: 'latin', gloss: { en: 'the Latin name', sk: 'latinské meno' } },
                    { form: 'Margarete', language: 'german', gloss: { en: 'the German form', sk: 'nemecká podoba' } },
                    { form: 'Grete', language: 'german', gloss: { en: 'shortened from the end of Margarete', sk: 'skrátené z konca mena Margarete' } },
                ],
                gloss: { en: 'pearl', sk: 'perla' },
                confidence: 'well-attested',
                epistemicClass: 'etymological-fact',
                summary: {
                    en: 'Gréta is the German Grete, the tail end of Margarete used alone, with the vowel lengthened in the Hungarian and Slovak spelling. It is the German counterpart of the Italian short form Rita.',
                    sk: 'Gréta je nemecké Grete, koncová časť mena Margarete používaná samostatne, s dĺžňom v maďarskom a slovenskom zápise. Je to nemecký náprotivok talianskej skrátenej podoby Rita.',
                },
                provenance: ['classical-onomastics', 'onomastic-consensus'],
            },
        ],
        meaning: { literal: { en: 'pearl', sk: 'perla' } },
        history: {
            en: 'The short form is old and thoroughly domesticated in German, where it appears in folk tale as Gretel. Central European use of Gréta came through German and Hungarian, and the Slovak calendar has it with the long vowel.',
            sk: 'Skrátená podoba je v nemčine stará a úplne zdomácnená, v rozprávkach sa objavuje ako Gretel. Stredoeurópske používanie podoby Gréta prišlo cez nemčinu a maďarčinu a slovenský kalendár ju má s dlhou samohláskou.',
        },
        culturalSpread: [
            { id: 'greta-german', region: { en: 'Germany, Austria', sk: 'Nemecko, Rakúsko' }, forms: ['Grete', 'Greta', 'Gretchen'] },
            { id: 'greta-nordic', region: { en: 'Sweden', sk: 'Švédsko' }, forms: ['Greta'] },
            { id: 'greta-central-europe', region: { en: 'Slovakia, Hungary', sk: 'Slovensko, Maďarsko' }, forms: ['Gréta'] },
        ],
        variants: [
            { form: 'Greta', kind: 'spelling', resolvesToCanonical: true },
            { form: 'Grete', kind: 'language-form', language: 'german', resolvesToCanonical: true },
            { form: 'Gretchen', kind: 'diminutive', language: 'german', resolvesToCanonical: true },
        ],
        relatedNames: [
            { canonicalKey: 'margareta', relation: 'derived-from' },
            { canonicalKey: 'margita', relation: 'shares-root' },
        ],
        confidence: 'well-attested',
        notes: [],
        provenance: ['classical-onomastics', 'onomastic-consensus', 'sk-web-calendars'],
    },
    {
        canonicalKey: 'jesika',
        canonicalName: 'Jesika',
        gender: 'feminine',
        origins: [
            {
                id: 'jesika-shakespeare-iscah',
                sourceLanguage: 'hebrew',
                culture: { en: 'English literary, from a biblical name', sk: 'Anglická literárna, z biblického mena' },
                derivation: [
                    { form: 'Yiskah', language: 'hebrew', gloss: { en: 'Iscah, a woman named once in Genesis; usually connected with a verb meaning to look out, to behold', sk: 'Jeska, žena spomenutá raz v knihe Genezis; zvyčajne sa spája so slovesom s významom hľadieť, vzhliadať' } },
                    { form: 'Jesca', language: 'english', gloss: { en: 'the form of Iscah in sixteenth-century English bibles', sk: 'podoba mena Jeska v anglických bibliách 16. storočia' } },
                    { form: 'Jessica', language: 'english', gloss: { en: 'the form Shakespeare used in The Merchant of Venice', sk: 'podoba, ktorú Shakespeare použil v Kupcovi benátskom' } },
                    { form: 'Jesika', language: 'slovak', gloss: { en: 'the Slovak phonetic spelling', sk: 'slovenský fonetický zápis' } },
                ],
                gloss: { en: 'from a biblical name usually read as to behold', sk: 'z biblického mena zvyčajne vykladaného ako hľadieť' },
                confidence: 'probable',
                epistemicClass: 'etymological-fact',
                summary: {
                    en: 'Jesika is the Slovak spelling of Jessica, which first appears in Shakespeare, who almost certainly built it from Jesca, the English bible form of the Hebrew Yiskah. The Shakespearean step is documented; the meaning of the Hebrew name behind it is much less secure.',
                    sk: 'Jesika je slovenský zápis mena Jessica, ktoré sa prvý raz objavuje u Shakespeara a ktoré takmer isto utvoril z podoby Jesca, anglickej biblickej podoby hebrejského Yiskah. Shakespearovský krok je doložený, význam hebrejského mena v pozadí je oveľa menej istý.',
                },
                provenance: ['biblical-onomastics', 'onomastic-consensus'],
            },
        ],
        meaning: {
            literal: null,
            traditional: { en: 'she who beholds', sk: 'tá, ktorá hľadí' },
        },
        history: {
            en: 'Jessica was rare for three centuries after Shakespeare and became one of the most common English girls names only in the 1970s and 1980s. Slovak took it in that wave, respelled to Slovak orthography, and the calendar records the domesticated spelling.',
            sk: 'Meno Jessica bolo tri storočia po Shakespearovi zriedkavé a jedným z najčastejších anglických dievčenských mien sa stalo až v 70. a 80. rokoch 20. storočia. Slovenčina ho prevzala v tejto vlne a prepísala do slovenského pravopisu, kalendár uvádza zdomácnený zápis.',
        },
        culturalSpread: [
            { id: 'jesika-anglophone', region: { en: 'United Kingdom, United States', sk: 'Spojené kráľovstvo, Spojené štáty' }, forms: ['Jessica'] },
            { id: 'jesika-central-europe', region: { en: 'Slovakia, Czechia', sk: 'Slovensko, Česko' }, forms: ['Jesika', 'Jessica'] },
        ],
        variants: [
            { form: 'Jessica', kind: 'spelling', language: 'english', resolvesToCanonical: true },
            { form: 'Jessika', kind: 'spelling', resolvesToCanonical: true },
        ],
        relatedNames: [],
        confidence: 'probable',
        notes: [
            {
                id: 'jesika-hebrew-meaning-uncertain',
                kind: 'linguistic',
                text: {
                    en: 'The gloss to behold rests on reading Yiskah against a Hebrew verb of looking. Iscah is named once in Genesis and nothing in the text explains the name, so the reading is a proposal about a very short word.',
                    sk: 'Výklad hľadieť sa opiera o spojenie mena Yiskah s hebrejským slovesom pozerania. Meno Jeska sa v Genezis spomína raz a text ho nijako nevysvetľuje, takže ide o návrh k veľmi krátkemu slovu.',
                },
            },
        ],
        provenance: ['biblical-onomastics', 'onomastic-consensus', 'sk-web-calendars'],
    },
    {
        canonicalKey: 'bianka',
        canonicalName: 'Bianka',
        gender: 'feminine',
        origins: [
            {
                id: 'bianka-italian-bianca',
                sourceLanguage: 'proto-germanic',
                culture: { en: 'Germanic, by way of Italian', sk: 'Germánska, cez taliančinu' },
                derivation: [
                    { form: 'blankaz', language: 'proto-germanic', reconstructed: true, gloss: { en: 'shining, bright, white', sk: 'žiarivý, jasný, biely' } },
                    { form: 'blanc', language: 'french', gloss: { en: 'white, the word borrowed into the Romance languages', sk: 'biely, slovo prevzaté do románskych jazykov' } },
                    { form: 'bianca', language: 'italian', gloss: { en: 'white', sk: 'biela' } },
                    { form: 'Bianca', language: 'italian', gloss: { en: 'the word used as a name', sk: 'slovo použité ako meno' } },
                ],
                gloss: { en: 'white, bright', sk: 'biela, jasná' },
                confidence: 'well-attested',
                epistemicClass: 'etymological-fact',
                summary: {
                    en: 'Bianka is the Italian Bianca, the ordinary word for white used as a name. The word itself is a Germanic loan into Romance, so an Italian name meaning white ultimately rests on a Germanic root for shining.',
                    sk: 'Bianka je talianske Bianca, bežné slovo pre bielu použité ako meno. Samotné slovo je germánska výpožička do románskych jazykov, takže talianske meno s významom biela stojí v konečnom dôsledku na germánskom koreni s významom žiariť.',
                },
                provenance: ['germanic-onomastics', 'onomastic-consensus'],
            },
        ],
        meaning: { literal: { en: 'white, bright', sk: 'biela, jasná' } },
        history: {
            en: 'Bianca was common in Renaissance Italy and reached Central Europe mainly through Hungarian usage in the late twentieth century, where it is written Bianka. The Slovak calendar took the same spelling.',
            sk: 'Meno Bianca bolo bežné v renesančnom Taliansku a do strednej Európy sa dostalo najmä cez maďarské používanie na konci 20. storočia, kde sa píše Bianka. Slovenský kalendár prevzal ten istý zápis.',
        },
        culturalSpread: [
            { id: 'bianka-italy', region: { en: 'Italy', sk: 'Taliansko' }, forms: ['Bianca'] },
            { id: 'bianka-central-europe', region: { en: 'Hungary, Slovakia, Poland', sk: 'Maďarsko, Slovensko, Poľsko' }, forms: ['Bianka'] },
        ],
        variants: [
            { form: 'Bianca', kind: 'spelling', language: 'italian', resolvesToCanonical: true },
        ],
        relatedNames: [
            { canonicalKey: 'blanka', relation: 'shares-root',
                note: { en: 'Blanka comes from the same Germanic word through French rather than Italian.', sk: 'Meno Blanka pochádza z toho istého germánskeho slova, ale cez francúzštinu, nie cez taliančinu.' } },
        ],
        confidence: 'well-attested',
        notes: [],
        provenance: ['germanic-onomastics', 'onomastic-consensus', 'sk-web-calendars'],
    },
    {
        canonicalKey: 'paula',
        canonicalName: 'Paula',
        gender: 'feminine',
        origins: [
            {
                id: 'paula-latin-paulus',
                sourceLanguage: 'latin',
                culture: { en: 'Roman, then Christian', sk: 'Rímska, potom kresťanská' },
                derivation: [
                    { form: 'paulus', language: 'latin', gloss: { en: 'small, little', sk: 'malý' } },
                    { form: 'Paulus', language: 'latin', gloss: { en: 'a Roman cognomen', sk: 'rímske prímenie' } },
                    { form: 'Paula', language: 'latin', gloss: { en: 'the feminine of the cognomen', sk: 'ženská podoba prímenia' } },
                ],
                gloss: { en: 'small', sk: 'malá' },
                confidence: 'well-attested',
                epistemicClass: 'etymological-fact',
                summary: {
                    en: 'Paula is the feminine of the Latin cognomen Paulus, from the ordinary adjective paulus, small. Roman cognomina of this kind began as descriptive by-names and were fully hereditary long before they became Christian names.',
                    sk: 'Paula je ženskou podobou latinského prímenia Paulus z bežného prídavného mena paulus, malý. Rímske prímenia tohto druhu vznikli ako opisné prezývky a dedili sa dávno predtým, než sa z nich stali kresťanské mená.',
                },
                provenance: ['classical-onomastics', 'onomastic-consensus'],
            },
        ],
        meaning: { literal: { en: 'small', sk: 'malá' } },
        history: {
            en: 'Saint Paula, a fourth-century Roman noblewoman who followed Jerome to Bethlehem, carried the name into Christian use. It stayed common in the Latin West, and the Slovak calendar lists it beside the domestic feminine Pavla.',
            sk: 'Do kresťanského používania meno preniesla svätá Paula, rímska šľachtičná zo 4. storočia, ktorá nasledovala Hieronyma do Betlehema. V latinskom Západe zostalo bežné a slovenský kalendár ho uvádza vedľa domácej ženskej podoby Pavla.',
        },
        culturalSpread: [
            { id: 'paula-romance', region: { en: 'Spain, Italy, Portugal', sk: 'Španielsko, Taliansko, Portugalsko' }, forms: ['Paula', 'Paola'] },
            { id: 'paula-german', region: { en: 'Germany, Austria', sk: 'Nemecko, Rakúsko' }, forms: ['Paula'] },
            { id: 'paula-central-europe', region: { en: 'Slovakia, Poland', sk: 'Slovensko, Poľsko' }, forms: ['Paula'] },
        ],
        variants: [
            { form: 'Paola', kind: 'language-form', language: 'italian', resolvesToCanonical: true },
        ],
        relatedNames: [
            { canonicalKey: 'pavol', relation: 'feminine-form' },
            { canonicalKey: 'pavlina', relation: 'shares-root' },
            { canonicalKey: 'pavla', relation: 'shares-root',
                note: { en: 'Pavla is the domestic Slovak feminine of the same Latin name.', sk: 'Pavla je domáca slovenská ženská podoba toho istého latinského mena.' } },
        ],
        confidence: 'well-attested',
        notes: [],
        provenance: ['classical-onomastics', 'onomastic-consensus', 'sk-web-calendars'],
    },
    {
        canonicalKey: 'pavla',
        canonicalName: 'Pavla',
        gender: 'feminine',
        origins: [
            {
                id: 'pavla-slavic-from-pavol',
                sourceLanguage: 'latin',
                culture: { en: 'Roman, through West Slavic Christian usage', sk: 'Rímska, cez západoslovanské kresťanské používanie' },
                derivation: [
                    { form: 'paulus', language: 'latin', gloss: { en: 'small, little', sk: 'malý' } },
                    { form: 'Paulus', language: 'latin', gloss: { en: 'the Roman cognomen, then the apostle name', sk: 'rímske prímenie, potom meno apoštola' } },
                    { form: 'Pavel', language: 'slavic', gloss: { en: 'the Slavic form, with v for the Latin u', sk: 'slovanská podoba, s v namiesto latinského u' } },
                    { form: 'Pavla', language: 'slovak', gloss: { en: 'the feminine of the Slavic form', sk: 'ženská podoba slovanskej podoby' } },
                ],
                gloss: { en: 'small', sk: 'malá' },
                confidence: 'well-attested',
                epistemicClass: 'etymological-fact',
                summary: {
                    en: 'Pavla is the domestic Slavic feminine of Pavol, which is Latin Paulus with the regular Slavic treatment of the vowel. Its meaning is the same as Paula; the two differ in the language the name passed through, not in origin.',
                    sk: 'Pavla je domáca slovanská ženská podoba mena Pavol, teda latinského Paulus s pravidelnou slovanskou úpravou samohlásky. Význam má rovnaký ako Paula; obe sa líšia jazykom, cez ktorý meno prešlo, nie pôvodom.',
                },
                provenance: ['classical-onomastics', 'slavic-onomastics'],
            },
        ],
        meaning: { literal: { en: 'small', sk: 'malá' } },
        culturalSpread: [
            { id: 'pavla-west-slavic', region: { en: 'Slovakia, Czechia', sk: 'Slovensko, Česko' }, forms: ['Pavla'] },
            { id: 'pavla-south-slavic', region: { en: 'Serbia, Croatia, Slovenia', sk: 'Srbsko, Chorvátsko, Slovinsko' }, forms: ['Pavla', 'Павла'] },
        ],
        variants: [
            { form: 'Павла', kind: 'transliteration', language: 'serbo-croatian', resolvesToCanonical: true },
            { form: 'Pavlínka', kind: 'diminutive', language: 'slovak', resolvesToCanonical: false,
                note: { en: 'Belongs to Pavlína rather than to Pavla.', sk: 'Patrí k menu Pavlína, nie k menu Pavla.' } },
        ],
        relatedNames: [
            { canonicalKey: 'pavol', relation: 'feminine-form' },
            { canonicalKey: 'paula', relation: 'shares-root' },
            { canonicalKey: 'pavlina', relation: 'shares-root' },
        ],
        confidence: 'well-attested',
        notes: [],
        provenance: ['classical-onomastics', 'slavic-onomastics', 'sk-web-calendars'],
    },
    {
        canonicalKey: 'olivia',
        canonicalName: 'Olívia',
        gender: 'feminine',
        origins: [
            {
                id: 'olivia-shakespeare-oliva',
                sourceLanguage: 'latin',
                culture: { en: 'English literary, on a Latin word', sk: 'Anglická literárna, na latinskom slove' },
                derivation: [
                    { form: 'oliva', language: 'latin', gloss: { en: 'olive, olive tree', sk: 'oliva, olivovník' } },
                    { form: 'Oliva', language: 'latin', gloss: { en: 'a medieval Christian name, borne by early saints', sk: 'stredoveké kresťanské meno, ktoré nosili ranokresťanské svätice' } },
                    { form: 'Olivia', language: 'english', gloss: { en: 'the form Shakespeare used in Twelfth Night', sk: 'podoba, ktorú Shakespeare použil vo Večere trojkráľovom' } },
                ],
                gloss: { en: 'olive', sk: 'oliva' },
                confidence: 'probable',
                epistemicClass: 'etymological-fact',
                summary: {
                    en: 'Olivia is the form Shakespeare gave the countess in Twelfth Night around 1601. He did not invent the material: the medieval name Oliva, from Latin oliva, existed before him. He gave it the shape that became standard, and the olive tree stands behind it as an emblem of peace.',
                    sk: 'Olívia je podoba, ktorú Shakespeare dal grófke vo Večere trojkráľovom okolo roku 1601. Materiál nevymyslel: stredoveké meno Oliva z latinského oliva existovalo pred ním. Dal mu podobu, ktorá sa ustálila, a v pozadí stojí olivovník ako znak pokoja.',
                },
                provenance: ['classical-onomastics', 'onomastic-consensus'],
            },
        ],
        meaning: { literal: { en: 'olive', sk: 'oliva' } },
        history: {
            en: 'The name was uncommon until the late twentieth century, when it became one of the most given girls names in the English-speaking world and then across Europe. Its arrival in the Slovak calendar belongs to that very recent wave.',
            sk: 'Meno bolo zriedkavé až do konca 20. storočia, keď sa stalo jedným z najčastejšie dávaných dievčenských mien v anglicky hovoriacom svete a potom v celej Európe. Jeho príchod do slovenského kalendára patrí do tejto celkom nedávnej vlny.',
        },
        culturalSpread: [
            { id: 'olivia-anglophone', region: { en: 'United Kingdom, United States', sk: 'Spojené kráľovstvo, Spojené štáty' }, forms: ['Olivia'] },
            { id: 'olivia-central-europe', region: { en: 'Slovakia, Hungary, Poland', sk: 'Slovensko, Maďarsko, Poľsko' }, forms: ['Olívia', 'Oliwia'] },
        ],
        variants: [
            { form: 'Olivia', kind: 'spelling', resolvesToCanonical: true },
            { form: 'Oliwia', kind: 'language-form', language: 'polish', resolvesToCanonical: true },
            { form: 'Oliva', kind: 'language-form', language: 'latin', resolvesToCanonical: true },
        ],
        relatedNames: [
            { canonicalKey: 'oliver', relation: 'shares-root',
                note: { en: 'Linked only on the Latin olive reading of Oliver, which is one of two competing accounts of that name.', sk: 'Spojené len pri latinskom olivovom výklade mena Oliver, ktorý je jedným z dvoch konkurenčných výkladov toho mena.' } },
        ],
        confidence: 'probable',
        notes: [],
        provenance: ['classical-onomastics', 'onomastic-consensus', 'sk-web-calendars'],
    },
    {
        canonicalKey: 'lara',
        canonicalName: 'Lara',
        gender: 'feminine',
        origins: [
            {
                id: 'lara-russian-short-of-larisa',
                sourceLanguage: 'russian',
                culture: { en: 'Russian', sk: 'Ruská' },
                derivation: [
                    { form: 'Λάρισα', language: 'ancient-greek', gloss: { en: 'Larissa, a city in Thessaly whose name is pre-Greek and not explained', sk: 'Larissa, mesto v Tesálii, ktorého názov je predgrécky a nevysvetlený' } },
                    { form: 'Лариса', language: 'russian', gloss: { en: 'Larisa', sk: 'Larisa' } },
                    { form: 'Лара', language: 'russian', gloss: { en: 'Lara, the short form', sk: 'Lara, skrátená podoba' } },
                ],
                gloss: { en: 'short form of Larisa', sk: 'skrátená podoba mena Larisa' },
                confidence: 'probable',
                epistemicClass: 'disputed-origin',
                summary: {
                    en: 'The usual account makes Lara the Russian short form of Larisa, which comes from the Greek city name Larissa. That city name is pre-Greek and has no established meaning, so the chain is clear but ends in something unexplained.',
                    sk: 'Bežný výklad považuje meno Lara za ruskú skrátenú podobu mena Larisa, ktoré pochádza z gréckeho názvu mesta Larissa. Tento názov je predgrécky a nemá ustálený význam, takže reťaz je zreteľná, ale končí sa v niečom nevysvetlenom.',
                },
                provenance: ['onomastic-consensus', 'contested-etymology'],
            },
            {
                id: 'lara-roman-nymph',
                sourceLanguage: 'latin',
                culture: { en: 'Roman', sk: 'Rímska' },
                derivation: [
                    { form: 'lalein', language: 'ancient-greek', gloss: { en: 'to chatter, to talk', sk: 'táravo hovoriť, rozprávať' } },
                    { form: 'Lara', language: 'latin', gloss: { en: 'a naiad of Roman myth, also called Larunda, whose tongue was cut out for talking', sk: 'najáda rímskej mytológie, zvaná aj Larunda, ktorej za rozprávanie vyrezali jazyk' } },
                ],
                gloss: { en: 'the talkative one', sk: 'tá, ktorá veľa hovorí' },
                confidence: 'disputed',
                epistemicClass: 'disputed-origin',
                summary: {
                    en: 'A separate proposal points to the Roman nymph Lara, whose name ancient writers linked to Greek lalein, to chatter. That link is itself an ancient guess rather than a sound derivation, and there is no evidence the modern given name descends from the myth.',
                    sk: 'Samostatný návrh poukazuje na rímsku nymfu Laru, ktorej meno antickí autori spájali s gréckym lalein, táravo hovoriť. Toto spojenie je samo antickým dohadom, nie spoľahlivým odvodením, a niet dokladu, že by moderné krstné meno pochádzalo z mýtu.',
                },
                provenance: ['classical-onomastics', 'contested-etymology'],
            },
        ],
        meaning: {
            literal: null,
            traditional: { en: 'a short form of Larisa', sk: 'skrátená podoba mena Larisa' },
        },
        history: {
            en: 'Lara reached Western Europe largely through Boris Pasternak, whose Doctor Zhivago made the Russian short form internationally familiar after 1957 and especially after the 1965 film. It entered Slovak usage as an international name in the decades after that.',
            sk: 'Do západnej Európy sa meno Lara dostalo najmä cez Borisa Pasternaka, ktorého Doktor Živago po roku 1957 a najmä po filme z roku 1965 spravil ruskú skrátenú podobu medzinárodne známou. Do slovenského používania vstúpilo ako medzinárodné meno v nasledujúcich desaťročiach.',
        },
        culturalSpread: [
            { id: 'lara-russia', region: { en: 'Russia', sk: 'Rusko' }, forms: ['Лара', 'Лариса'] },
            { id: 'lara-western-europe', region: { en: 'Germany, Italy, Netherlands', sk: 'Nemecko, Taliansko, Holandsko' }, forms: ['Lara'] },
            { id: 'lara-central-europe', region: { en: 'Slovakia, Czechia, Slovenia', sk: 'Slovensko, Česko, Slovinsko' }, forms: ['Lara'] },
        ],
        variants: [
            { form: 'Лара', kind: 'transliteration', language: 'russian', resolvesToCanonical: true },
        ],
        relatedNames: [],
        confidence: 'disputed',
        notes: [
            {
                id: 'lara-latin-lares-caution',
                kind: 'folk-etymology',
                text: {
                    en: 'Lara is sometimes glossed as protection, from the Roman household gods called Lares. The nymph Lara was said to be their mother in one late story, but that is a mythological association and not a derivation of the name.',
                    sk: 'Meno Lara sa niekedy vykladá ako ochrana, podľa rímskych domácich bôžikov zvaných Lárovia. Nymfa Lara mala byť podľa jedného neskorého príbehu ich matkou, ide však o mytologickú súvislosť, nie o odvodenie mena.',
                },
            },
        ],
        provenance: ['onomastic-consensus', 'classical-onomastics', 'contested-etymology', 'sk-web-calendars'],
    },
    {
        canonicalKey: 'sarlota',
        canonicalName: 'Šarlota',
        gender: 'feminine',
        origins: [
            {
                id: 'sarlota-french-charlotte',
                sourceLanguage: 'old-high-german',
                culture: { en: 'Germanic, by way of French', sk: 'Germánska, cez francúzštinu' },
                derivation: [
                    { form: 'karl', language: 'old-high-german', gloss: { en: 'free man, man', sk: 'slobodný muž, muž' } },
                    { form: 'Karl', language: 'old-high-german', gloss: { en: 'the masculine name', sk: 'mužské meno' } },
                    { form: 'Charles', language: 'french', gloss: { en: 'the French form', sk: 'francúzska podoba' } },
                    { form: 'Charlotte', language: 'french', gloss: { en: 'a feminine diminutive of Charles', sk: 'ženská zdrobnená podoba mena Charles' } },
                    { form: 'Šarlota', language: 'slovak', gloss: { en: 'the Slovak phonetic spelling', sk: 'slovenský fonetický zápis' } },
                ],
                gloss: { en: 'free man', sk: 'slobodný muž' },
                confidence: 'well-attested',
                epistemicClass: 'etymological-fact',
                summary: {
                    en: 'Šarlota is the Slovak spelling of French Charlotte, a double feminine diminutive of Charles: the Germanic word karl, free man, with French endings stacked on it. Slovak wrote the French sound with š rather than the French letters.',
                    sk: 'Šarlota je slovenský zápis francúzskeho mena Charlotte, dvojnásobne zdrobnenej ženskej podoby mena Charles: germánske slovo karl, slobodný muž, s navrstvenými francúzskymi príponami. Slovenčina zapísala francúzsky zvuk písmenom š namiesto francúzskych písmen.',
                },
                provenance: ['germanic-onomastics', 'onomastic-consensus'],
            },
        ],
        meaning: { literal: { en: 'free man', sk: 'slobodný muž' } },
        history: {
            en: 'Charlotte spread across Europe as a royal name from the seventeenth century onward, notably through the French and then the British courts. Slovak and Hungarian took it in phonetic spelling, and the Slovak calendar records Šarlota.',
            sk: 'Meno Charlotte sa od 17. storočia šírilo Európou ako panovnícke meno, najmä cez francúzsky a potom britský dvor. Slovenčina a maďarčina ho prevzali vo fonetickom zápise a slovenský kalendár uvádza podobu Šarlota.',
        },
        culturalSpread: [
            { id: 'sarlota-france', region: { en: 'France', sk: 'Francúzsko' }, forms: ['Charlotte'] },
            { id: 'sarlota-german', region: { en: 'Germany, Austria', sk: 'Nemecko, Rakúsko' }, forms: ['Charlotte', 'Lotte'] },
            { id: 'sarlota-central-europe', region: { en: 'Slovakia, Hungary', sk: 'Slovensko, Maďarsko' }, forms: ['Šarlota', 'Sarolta'] },
        ],
        variants: [
            { form: 'Charlotte', kind: 'language-form', language: 'french', resolvesToCanonical: true },
            { form: 'Carlota', kind: 'language-form', language: 'spanish', resolvesToCanonical: true },
            { form: 'Lotte', kind: 'diminutive', language: 'german', resolvesToCanonical: true },
        ],
        relatedNames: [
            { canonicalKey: 'karol', relation: 'feminine-form' },
            { canonicalKey: 'karolina', relation: 'shares-root' },
        ],
        confidence: 'well-attested',
        notes: [
            {
                id: 'sarlota-sarolta-caution',
                kind: 'linguistic',
                text: {
                    en: 'The Hungarian Sarolta is used as the equivalent of Charlotte but is not the same name: it is an old Hungarian name of separate origin that the two were matched by sound.',
                    sk: 'Maďarské meno Sarolta sa používa ako náprotivok mena Charlotte, nie je to však to isté meno: ide o staré maďarské meno iného pôvodu, ktoré sa s ním spárovalo podľa zvuku.',
                },
            },
        ],
        provenance: ['germanic-onomastics', 'onomastic-consensus', 'sk-web-calendars'],
    },
    {
        canonicalKey: 'eliana',
        canonicalName: 'Eliána',
        gender: 'feminine',
        origins: [
            {
                id: 'eliana-hebrew-god-answered',
                sourceLanguage: 'hebrew',
                culture: { en: 'Hebrew', sk: 'Hebrejská' },
                derivation: [
                    { form: 'El', language: 'hebrew', gloss: { en: 'God', sk: 'Boh' } },
                    { form: 'anah', language: 'hebrew', gloss: { en: 'to answer, to respond', sk: 'odpovedať' } },
                    { form: 'Eliana', language: 'hebrew', gloss: { en: 'my God has answered', sk: 'môj Boh odpovedal' } },
                ],
                gloss: { en: 'my God has answered', sk: 'môj Boh odpovedal' },
                confidence: 'probable',
                epistemicClass: 'disputed-origin',
                summary: {
                    en: 'On the Hebrew reading, Eliána combines El, God, with the verb anah, to answer, giving my God has answered. The name is well established in modern Hebrew usage, though it is not a biblical name.',
                    sk: 'Pri hebrejskom výklade spája meno Eliána prvok El, Boh, so slovesom anah, odpovedať, teda môj Boh odpovedal. V modernej hebrejčine je meno pevne zaužívané, biblické však nie je.',
                },
                provenance: ['biblical-onomastics', 'contested-etymology'],
            },
            {
                id: 'eliana-latin-aeliana',
                sourceLanguage: 'latin',
                culture: { en: 'Roman', sk: 'Rímska' },
                derivation: [
                    { form: 'Aelius', language: 'latin', gloss: { en: 'the name of a Roman gens, of uncertain meaning', sk: 'meno rímskeho rodu s neistým významom' } },
                    { form: 'Aeliana', language: 'latin', gloss: { en: 'belonging to the Aelii, in the feminine', sk: 'patriaca k Aeliovcom, v ženskom rode' } },
                    { form: 'Eliana', language: 'italian', gloss: { en: 'the Italian form', sk: 'talianska podoba' } },
                ],
                gloss: { en: 'of the Aelius family', sk: 'z rodu Aeliovcov' },
                confidence: 'disputed',
                epistemicClass: 'disputed-origin',
                summary: {
                    en: 'The Romance account derives the name from Latin Aeliana, the feminine of Aelianus, marking membership of the gens Aelia. The gens name itself has no agreed meaning, sometimes linked to Greek helios, sun, without support.',
                    sk: 'Románsky výklad odvodzuje meno z latinského Aeliana, ženskej podoby mena Aelianus, ktoré označuje príslušnosť k rodu Aeliovcov. Samotné rodové meno nemá dohodnutý význam, niekedy sa bez opory spája s gréckym helios, slnko.',
                },
                provenance: ['classical-onomastics', 'contested-etymology'],
            },
        ],
        meaning: {
            literal: null,
            traditional: { en: 'my God has answered', sk: 'môj Boh odpovedal' },
        },
        history: {
            en: 'The two accounts describe two names that fell together in modern spelling: a Hebrew formation used in Israel and a Romance name from Latin. Which of them a given European bearer inherits is usually impossible to tell, and the Slovak calendar entry is a recent international borrowing either way.',
            sk: 'Oba výklady opisujú dve mená, ktoré v modernom zápise splynuli: hebrejské utvorenie používané v Izraeli a románske meno z latinčiny. Ktoré z nich konkrétny európsky nositeľ zdedil, sa spravidla určiť nedá, a kalendárna položka je tak či tak nedávnou medzinárodnou výpožičkou.',
        },
        culturalSpread: [
            { id: 'eliana-israel', region: { en: 'Israel', sk: 'Izrael' }, forms: ['אליענה', 'Eliana'] },
            { id: 'eliana-romance', region: { en: 'Italy, Brazil, Spain', sk: 'Taliansko, Brazília, Španielsko' }, forms: ['Eliana'] },
            { id: 'eliana-slovakia', region: { en: 'Slovakia', sk: 'Slovensko' }, forms: ['Eliána'] },
        ],
        variants: [
            { form: 'Eliana', kind: 'spelling', resolvesToCanonical: true },
            { form: 'Elianna', kind: 'spelling', resolvesToCanonical: true },
        ],
        relatedNames: [
            { canonicalKey: 'elias', relation: 'shares-root',
                note: { en: 'Only on the Hebrew reading, where both names begin with the element El, God.', sk: 'Len pri hebrejskom výklade, kde obe mená začínajú prvkom El, Boh.' } },
        ],
        confidence: 'disputed',
        notes: [
            {
                id: 'eliana-not-from-helios',
                kind: 'folk-etymology',
                text: {
                    en: 'Eliána is often glossed as daughter of the sun, from Greek helios. Neither account supports this: the Hebrew route has no sun element, and the link between the Roman gens Aelius and helios is an old guess with nothing behind it.',
                    sk: 'Meno Eliána sa často vykladá ako dcéra slnka, z gréckeho helios. Ani jeden z výkladov to nepodporuje: hebrejská cesta nijaký slnečný prvok nemá a spojenie rímskeho rodu Aelius s helios je starý dohad bez opory.',
                },
            },
        ],
        provenance: ['biblical-onomastics', 'classical-onomastics', 'contested-etymology', 'sk-web-calendars'],
    },
    {
        canonicalKey: 'timur',
        canonicalName: 'Timur',
        gender: 'masculine',
        origins: [
            {
                id: 'timur-turkic-iron',
                sourceLanguage: 'turkic',
                culture: { en: 'Turkic, Central Asian', sk: 'Turkická, stredoázijská' },
                derivation: [
                    { form: 'temür', language: 'turkic', gloss: { en: 'iron', sk: 'železo' } },
                    { form: 'Temür', language: 'turkic', gloss: { en: 'the word used as a personal name', sk: 'slovo použité ako osobné meno' } },
                    { form: 'Timur', language: 'russian', gloss: { en: 'the form used in Russian and thence in Europe', sk: 'podoba používaná v ruštine a odtiaľ v Európe' } },
                ],
                gloss: { en: 'iron', sk: 'železo' },
                confidence: 'well-attested',
                epistemicClass: 'etymological-fact',
                summary: {
                    en: 'Timur is the Turkic word for iron, temür, used as a name. The derivation is not in doubt: the word is well attested across the Turkic languages and metal names for men are an ordinary Central Asian pattern.',
                    sk: 'Timur je turkické slovo pre železo, temür, použité ako meno. Odvodenie je nesporné: slovo je v turkických jazykoch dobre doložené a mužské mená podľa kovov sú v Strednej Ázii bežným typom.',
                },
                provenance: ['onomastic-consensus'],
            },
        ],
        meaning: { literal: { en: 'iron', sk: 'železo' } },
        history: {
            en: 'The best known bearer is the fourteenth-century conqueror Timur, known in Europe as Tamerlane, from Timur-i Lang, Timur the lame. In Russia the name was revived in the twentieth century by Arkady Gaidar’s book Timur and His Squad, and it reached Central European calendars from Turkic and Russian usage.',
            sk: 'Najznámejším nositeľom je dobyvateľ Timur zo 14. storočia, v Európe známy ako Tamerlán, z podoby Timur-i Lang, Timur Chromý. V Rusku meno v 20. storočí oživila kniha Arkadija Gajdara Timur a jeho parta a do stredoeurópskych kalendárov sa dostalo z turkického a ruského používania.',
        },
        culturalSpread: [
            { id: 'timur-central-asia', region: { en: 'Uzbekistan, Kazakhstan, Azerbaijan', sk: 'Uzbekistan, Kazachstan, Azerbajdžan' }, forms: ['Temur', 'Timur'] },
            { id: 'timur-turkey', region: { en: 'Turkey', sk: 'Turecko' }, forms: ['Timur', 'Demir'] },
            { id: 'timur-europe', region: { en: 'Russia, Slovakia', sk: 'Rusko, Slovensko' }, forms: ['Timur', 'Тимур'] },
        ],
        variants: [
            { form: 'Тимур', kind: 'transliteration', language: 'russian', resolvesToCanonical: true },
            { form: 'Temur', kind: 'spelling', language: 'turkic', resolvesToCanonical: true },
        ],
        relatedNames: [],
        confidence: 'well-attested',
        notes: [
            {
                id: 'timur-not-timotej',
                kind: 'linguistic',
                text: {
                    en: 'Timur is not a form of Timotej. The resemblance is accidental: one is Turkic and means iron, the other is Greek and is built on honour.',
                    sk: 'Timur nie je podobou mena Timotej. Podobnosť je náhodná: jedno je turkické a znamená železo, druhé je grécke a stojí na slove česť.',
                },
            },
        ],
        provenance: ['onomastic-consensus', 'sk-web-calendars'],
    },
    {
        canonicalKey: 'aneta',
        canonicalName: 'Aneta',
        gender: 'feminine',
        origins: [
            {
                id: 'aneta-french-annette',
                sourceLanguage: 'hebrew',
                culture: { en: 'Hebrew, by way of French', sk: 'Hebrejská, cez francúzštinu' },
                derivation: [
                    { form: 'Hannah', language: 'hebrew', gloss: { en: 'grace, favour', sk: 'milosť, priazeň' } },
                    { form: 'Anna', language: 'ancient-greek', gloss: { en: 'the Greek and Latin form', sk: 'grécka a latinská podoba' } },
                    { form: 'Annette', language: 'french', gloss: { en: 'a French diminutive of Anne', sk: 'francúzska zdrobnená podoba mena Anne' } },
                    { form: 'Aneta', language: 'slovak', gloss: { en: 'the Slovak and Czech spelling', sk: 'slovenský a český zápis' } },
                ],
                gloss: { en: 'grace, favour', sk: 'milosť, priazeň' },
                confidence: 'well-attested',
                epistemicClass: 'etymological-fact',
                summary: {
                    en: 'Aneta is the French diminutive Annette in Slovak spelling. Behind it is Anna, itself the Greek shape of Hebrew Hannah, grace. The name is therefore a diminutive of a diminutive path rather than an independent formation.',
                    sk: 'Aneta je francúzska zdrobnená podoba Annette v slovenskom zápise. Za ňou stojí meno Anna, teda grécka podoba hebrejského Hannah, milosť. Ide preto o výsledok zdrobňovacej cesty, nie o samostatné utvorenie.',
                },
                provenance: ['biblical-onomastics', 'onomastic-consensus'],
            },
        ],
        meaning: { literal: { en: 'grace, favour', sk: 'milosť, priazeň' } },
        history: {
            en: 'The French diminutive spread through Central Europe in the nineteenth and twentieth centuries and was written phonetically in Czech and Slovak. It is now given independently of Anna, which is why the calendar lists it separately.',
            sk: 'Francúzska zdrobnená podoba sa v 19. a 20. storočí rozšírila v strednej Európe a v češtine a slovenčine sa zapisovala foneticky. Dnes sa dáva nezávisle od mena Anna, a preto ju kalendár uvádza samostatne.',
        },
        culturalSpread: [
            { id: 'aneta-france', region: { en: 'France', sk: 'Francúzsko' }, forms: ['Annette'] },
            { id: 'aneta-central-europe', region: { en: 'Slovakia, Czechia, Poland', sk: 'Slovensko, Česko, Poľsko' }, forms: ['Aneta'] },
        ],
        variants: [
            { form: 'Annette', kind: 'language-form', language: 'french', resolvesToCanonical: true },
            { form: 'Anetta', kind: 'spelling', resolvesToCanonical: true },
        ],
        relatedNames: [
            { canonicalKey: 'anna', relation: 'derived-from' },
            { canonicalKey: 'anabela', relation: 'shares-root' },
        ],
        confidence: 'well-attested',
        notes: [],
        provenance: ['biblical-onomastics', 'onomastic-consensus', 'sk-web-calendars'],
    },
    {
        canonicalKey: 'darius',
        canonicalName: 'Dárius',
        gender: 'masculine',
        origins: [
            {
                id: 'darius-old-persian-darayavaus',
                sourceLanguage: 'persian',
                culture: { en: 'Persian, Achaemenid', sk: 'Perzská, achajmenovská' },
                derivation: [
                    { form: 'Dārayavauš', language: 'persian', gloss: { en: 'holding firm the good, from a verb meaning to hold and a word meaning good', sk: 'pevne držiaci dobro, zo slovesa s významom držať a slova s významom dobrý' } },
                    { form: 'Dareios', language: 'ancient-greek', gloss: { en: 'the Greek rendering of the Persian royal name', sk: 'grécky prepis perzského kráľovského mena' } },
                    { form: 'Darius', language: 'latin', gloss: { en: 'the Latin form', sk: 'latinská podoba' } },
                ],
                gloss: { en: 'holding firm the good', sk: 'pevne držiaci dobro' },
                confidence: 'well-attested',
                epistemicClass: 'etymological-fact',
                summary: {
                    en: 'Dárius comes from the Old Persian royal name Dārayavauš, which the Behistun inscription preserves in the king’s own language. The two elements are a verb of holding and a word for good, giving the sense of one who holds firm to what is good.',
                    sk: 'Dárius pochádza zo staroperzského kráľovského mena Dārayavauš, ktoré nápis v Bisutúne zachoval v kráľovom vlastnom jazyku. Oba prvky sú sloveso držania a slovo pre dobré, čo dáva význam ten, kto pevne drží dobro.',
                },
                provenance: ['onomastic-consensus', 'classical-onomastics'],
            },
        ],
        meaning: { literal: { en: 'holding firm the good', sk: 'pevne držiaci dobro' } },
        history: {
            en: 'Three Achaemenid kings bore the name, and it reached Europe through Greek historians and the Book of Daniel rather than through Persian contact. Slovak and Lithuanian both use it, and it was added to the Slovak calendar in modern times.',
            sk: 'Meno nosili traja achajmenovskí králi a do Európy sa dostalo cez gréckych historikov a knihu Daniel, nie cez perzský kontakt. Používa ho slovenčina aj litovčina a do slovenského kalendára bolo doplnené v novšej dobe.',
        },
        culturalSpread: [
            { id: 'darius-classical', region: { en: 'Greek and Latin transmission', sk: 'Grécke a latinské sprostredkovanie' }, forms: ['Δαρεῖος', 'Darius'] },
            { id: 'darius-baltic', region: { en: 'Lithuania', sk: 'Litva' }, forms: ['Darius'] },
            { id: 'darius-slovakia', region: { en: 'Slovakia, Czechia', sk: 'Slovensko, Česko' }, forms: ['Dárius', 'Darius'] },
        ],
        variants: [
            { form: 'Darius', kind: 'spelling', language: 'latin', resolvesToCanonical: true },
            { form: 'Dareios', kind: 'transliteration', language: 'ancient-greek', resolvesToCanonical: true },
        ],
        relatedNames: [
            { canonicalKey: 'daria', relation: 'feminine-form' },
        ],
        confidence: 'well-attested',
        notes: [],
        provenance: ['onomastic-consensus', 'classical-onomastics', 'sk-web-calendars'],
    },
    {
        canonicalKey: 'daria',
        canonicalName: 'Dária',
        gender: 'feminine',
        origins: [
            {
                id: 'daria-feminine-of-darius',
                sourceLanguage: 'persian',
                culture: { en: 'Persian, through Greek and Latin Christian usage', sk: 'Perzská, cez grécke a latinské kresťanské používanie' },
                derivation: [
                    { form: 'Dārayavauš', language: 'persian', gloss: { en: 'holding firm the good', sk: 'pevne držiaci dobro' } },
                    { form: 'Dareios', language: 'ancient-greek', gloss: { en: 'the Greek form', sk: 'grécka podoba' } },
                    { form: 'Daria', language: 'latin', gloss: { en: 'the feminine of Darius', sk: 'ženská podoba mena Darius' } },
                ],
                gloss: { en: 'holding firm the good', sk: 'pevne držiaca dobro' },
                confidence: 'well-attested',
                epistemicClass: 'etymological-fact',
                summary: {
                    en: 'Dária is the feminine of Darius, formed in Greek and Latin rather than in Persian. It carries the meaning of the Persian royal name at one remove, since the feminine never existed in Old Persian.',
                    sk: 'Dária je ženskou podobou mena Dárius, utvorenou v gréčtine a latinčine, nie v perzštine. Význam perzského kráľovského mena nesie sprostredkovane, keďže ženská podoba v staroperzštine nikdy neexistovala.',
                },
                provenance: ['onomastic-consensus', 'classical-onomastics'],
            },
        ],
        meaning: { literal: { en: 'holding firm the good', sk: 'pevne držiaca dobro' } },
        history: {
            en: 'Saint Daria, martyred at Rome with Chrysanthus, put the name into the Western calendar, and it is also common in Russia and Poland. The Slovak calendar records the form with the long vowel.',
            sk: 'Do západného kalendára meno dostala svätá Dária, umučená v Ríme spolu s Chryzantom, a bežné je aj v Rusku a Poľsku. Slovenský kalendár uvádza podobu s dlhou samohláskou.',
        },
        culturalSpread: [
            { id: 'daria-east-slavic', region: { en: 'Russia, Ukraine', sk: 'Rusko, Ukrajina' }, forms: ['Дарья', 'Darja'] },
            { id: 'daria-poland', region: { en: 'Poland', sk: 'Poľsko' }, forms: ['Daria'] },
            { id: 'daria-slovakia', region: { en: 'Slovakia, Czechia', sk: 'Slovensko, Česko' }, forms: ['Dária', 'Darja'] },
        ],
        variants: [
            { form: 'Daria', kind: 'spelling', resolvesToCanonical: true },
            { form: 'Дарья', kind: 'transliteration', language: 'russian', resolvesToCanonical: true },
            { form: 'Darja', kind: 'spelling', resolvesToCanonical: true },
        ],
        relatedNames: [
            { canonicalKey: 'darius', relation: 'masculine-form' },
            { canonicalKey: 'darina', relation: 'shares-root',
                note: { en: 'Darina is Slavic, from dar, gift, and is not related despite the resemblance.', sk: 'Meno Darina je slovanské, zo slova dar, a napriek podobnosti nesúvisí.' } },
        ],
        confidence: 'well-attested',
        notes: [],
        provenance: ['onomastic-consensus', 'classical-onomastics', 'sk-web-calendars'],
    },
    {
        canonicalKey: 'johana',
        canonicalName: 'Johana',
        gender: 'feminine',
        origins: [
            {
                id: 'johana-hebrew-yohanan',
                sourceLanguage: 'hebrew',
                culture: { en: 'Hebrew, biblical', sk: 'Hebrejská, biblická' },
                derivation: [
                    { form: 'Yohanan', language: 'hebrew', gloss: { en: 'Yahweh is gracious', sk: 'Jahve je milostivý' } },
                    { form: 'Ioanna', language: 'ancient-greek', gloss: { en: 'the feminine form in the New Testament', sk: 'ženská podoba v Novom zákone' } },
                    { form: 'Iohanna', language: 'latin', gloss: { en: 'the Latin form', sk: 'latinská podoba' } },
                    { form: 'Johana', language: 'slovak', gloss: { en: 'the Slovak spelling', sk: 'slovenský zápis' } },
                ],
                gloss: { en: 'Yahweh is gracious', sk: 'Jahve je milostivý' },
                confidence: 'well-attested',
                epistemicClass: 'etymological-fact',
                summary: {
                    en: 'Johana is the feminine of John, from Hebrew Yohanan, Yahweh is gracious. The Greek New Testament already has the feminine Ioanna, so the name is old and its derivation is not contested.',
                    sk: 'Johana je ženskou podobou mena Ján, z hebrejského Yohanan, Jahve je milostivý. Grécky Nový zákon má ženskú podobu Ioanna už v sebe, takže meno je staré a jeho odvodenie nie je sporné.',
                },
                provenance: ['biblical-onomastics', 'onomastic-consensus'],
            },
        ],
        meaning: { literal: { en: 'Yahweh is gracious', sk: 'Jahve je milostivý' } },
        history: {
            en: 'Slovak has both the domestic Jana and this fuller Latin-shaped Johana, which is closer to the German Johanna and to the Latin liturgical form. The calendar lists them on separate days.',
            sk: 'Slovenčina má domácu podobu Jana aj túto plnšiu podobu latinského typu Johana, ktorá je bližšia nemeckému Johanna a latinskej liturgickej podobe. Kalendár ich uvádza v samostatných dňoch.',
        },
        culturalSpread: [
            { id: 'johana-german', region: { en: 'Germany, Austria, Scandinavia', sk: 'Nemecko, Rakúsko, Škandinávia' }, forms: ['Johanna'] },
            { id: 'johana-central-europe', region: { en: 'Slovakia, Czechia', sk: 'Slovensko, Česko' }, forms: ['Johana', 'Johanka'] },
        ],
        variants: [
            { form: 'Johanka', kind: 'diminutive', language: 'slovak', resolvesToCanonical: true },
        ],
        relatedNames: [
            { canonicalKey: 'jana', relation: 'shares-root',
                note: { en: 'The domestic Slovak form of the same name; kept separate because the calendar does.', sk: 'Domáca slovenská podoba toho istého mena; vedie sa samostatne, lebo tak ju vedie kalendár.' } },
            { canonicalKey: 'jan', relation: 'feminine-form' },
            { canonicalKey: 'jozefina', relation: 'shares-root',
                note: { en: 'Not related etymologically; listed only to keep the two Latin-suffixed feminines apart.', sk: 'Etymologicky nesúvisí; uvádza sa len na odlíšenie dvoch ženských mien s latinskou príponou.' } },
        ],
        confidence: 'well-attested',
        notes: [],
        provenance: ['biblical-onomastics', 'onomastic-consensus', 'sk-web-calendars'],
    },
    {
        canonicalKey: 'noema',
        canonicalName: 'Noema',
        gender: 'feminine',
        origins: [
            {
                id: 'noema-hebrew-noomi',
                sourceLanguage: 'hebrew',
                culture: { en: 'Hebrew, biblical', sk: 'Hebrejská, biblická' },
                derivation: [
                    { form: 'na’em', language: 'hebrew', gloss: { en: 'to be pleasant, agreeable', sk: 'byť príjemný, milý' } },
                    { form: 'No’omi', language: 'hebrew', gloss: { en: 'my pleasantness, my delight; the name of Ruth’s mother-in-law', sk: 'moja lahoda, moja radosť; meno svokry Rút' } },
                    { form: 'Noemi', language: 'latin', gloss: { en: 'the Vulgate spelling', sk: 'zápis vo Vulgáte' } },
                    { form: 'Noema', language: 'slovak', gloss: { en: 'the Slovak calendar form', sk: 'podoba v slovenskom kalendári' } },
                ],
                gloss: { en: 'pleasantness, sweetness', sk: 'lahoda, príjemnosť' },
                confidence: 'well-attested',
                epistemicClass: 'etymological-fact',
                summary: {
                    en: 'Noema belongs to the Hebrew root na’em, to be pleasant, the root behind Noomi in the Book of Ruth. The Book of Ruth itself plays on the meaning when Noomi asks to be called Mara, bitter, instead.',
                    sk: 'Meno Noema patrí k hebrejskému koreňu na’em, byť príjemný, teda ku koreňu za menom Noemi v knihe Rút. Sama kniha Rút sa s významom pohráva, keď Noemi žiada, aby ju volali Mara, horká.',
                },
                provenance: ['biblical-onomastics', 'onomastic-consensus'],
            },
        ],
        meaning: { literal: { en: 'pleasantness, sweetness', sk: 'lahoda, príjemnosť' } },
        history: {
            en: 'The Hebrew name reached Europe entirely through the Bible, and Latin, Czech and Slovak spellings of it vary widely. The Slovak calendar uses Noema, alongside the Noemi found in Slovak bible translations.',
            sk: 'Hebrejské meno sa do Európy dostalo výlučne cez Bibliu a latinské, české aj slovenské zápisy sa značne líšia. Slovenský kalendár používa podobu Noema popri podobe Noemi, ktorá je v slovenských prekladoch Biblie.',
        },
        culturalSpread: [
            { id: 'noema-biblical', region: { en: 'Latin bible transmission', sk: 'Latinské biblické sprostredkovanie' }, forms: ['Noemi', 'Noëmi'] },
            { id: 'noema-central-europe', region: { en: 'Slovakia, Czechia', sk: 'Slovensko, Česko' }, forms: ['Noema', 'Noemi'] },
        ],
        variants: [
            { form: 'Noemi', kind: 'spelling', resolvesToCanonical: true },
            { form: 'Naomi', kind: 'language-form', language: 'english', resolvesToCanonical: true },
        ],
        relatedNames: [],
        confidence: 'well-attested',
        notes: [],
        provenance: ['biblical-onomastics', 'onomastic-consensus', 'sk-web-calendars'],
    },
    {
        canonicalKey: 'nikoleta',
        canonicalName: 'Nikoleta',
        gender: 'feminine',
        origins: [
            {
                id: 'nikoleta-french-nicolette',
                sourceLanguage: 'ancient-greek',
                culture: { en: 'Greek, by way of French', sk: 'Grécka, cez francúzštinu' },
                derivation: [
                    { form: 'nike', language: 'ancient-greek', gloss: { en: 'victory', sk: 'víťazstvo' } },
                    { form: 'laos', language: 'ancient-greek', gloss: { en: 'people', sk: 'ľud' } },
                    { form: 'Nikolaos', language: 'ancient-greek', gloss: { en: 'victory of the people', sk: 'víťazstvo ľudu' } },
                    { form: 'Nicolette', language: 'french', gloss: { en: 'a French feminine diminutive', sk: 'francúzska ženská zdrobnená podoba' } },
                    { form: 'Nikoleta', language: 'slovak', gloss: { en: 'the Slovak spelling', sk: 'slovenský zápis' } },
                ],
                gloss: { en: 'victory of the people', sk: 'víťazstvo ľudu' },
                confidence: 'well-attested',
                epistemicClass: 'etymological-fact',
                summary: {
                    en: 'Nikoleta is the French diminutive Nicolette written in Slovak. Behind it is the Greek compound Nikolaos, victory of the people, whose two elements are ordinary Greek words.',
                    sk: 'Nikoleta je francúzska zdrobnená podoba Nicolette zapísaná po slovensky. Za ňou stojí grécke zložené meno Nikolaos, víťazstvo ľudu, ktorého oba prvky sú bežné grécke slová.',
                },
                provenance: ['classical-onomastics', 'onomastic-consensus'],
            },
        ],
        meaning: { literal: { en: 'victory of the people', sk: 'víťazstvo ľudu' } },
        history: {
            en: 'The French diminutive is medieval, known from the romance Aucassin et Nicolette. Its Central European use is modern, and the Slovak calendar lists Nikoleta separately from Nikola.',
            sk: 'Francúzska zdrobnená podoba je stredoveká, známa z románu Aucassin et Nicolette. Jej stredoeurópske používanie je moderné a slovenský kalendár uvádza meno Nikoleta oddelene od mena Nikola.',
        },
        culturalSpread: [
            { id: 'nikoleta-france', region: { en: 'France', sk: 'Francúzsko' }, forms: ['Nicolette', 'Nicole'] },
            { id: 'nikoleta-central-europe', region: { en: 'Slovakia, Czechia, Poland', sk: 'Slovensko, Česko, Poľsko' }, forms: ['Nikoleta', 'Nikola'] },
        ],
        variants: [
            { form: 'Nicolette', kind: 'language-form', language: 'french', resolvesToCanonical: true },
            { form: 'Nikoletta', kind: 'spelling', language: 'hungarian', resolvesToCanonical: true },
        ],
        relatedNames: [
            { canonicalKey: 'nikola', relation: 'shares-root' },
            { canonicalKey: 'mikulas', relation: 'shares-root',
                note: { en: 'Mikuláš is the domestic Slovak form of the same Greek name.', sk: 'Mikuláš je domáca slovenská podoba toho istého gréckeho mena.' } },
        ],
        confidence: 'well-attested',
        notes: [],
        provenance: ['classical-onomastics', 'onomastic-consensus', 'sk-web-calendars'],
    },
    {
        canonicalKey: 'mia',
        canonicalName: 'Mia',
        gender: 'feminine',
        origins: [
            {
                id: 'mia-nordic-short-of-maria',
                sourceLanguage: 'hebrew',
                culture: { en: 'Scandinavian, from a Hebrew name', sk: 'Škandinávska, z hebrejského mena' },
                derivation: [
                    { form: 'Miryam', language: 'hebrew', gloss: { en: 'the Hebrew name whose own meaning is unresolved', sk: 'hebrejské meno, ktorého vlastný význam nie je vyriešený' } },
                    { form: 'Maria', language: 'latin', gloss: { en: 'the Latin form', sk: 'latinská podoba' } },
                    { form: 'Mia', language: 'german', gloss: { en: 'a short form used in German and the Nordic languages', sk: 'skrátená podoba používaná v nemčine a severských jazykoch' } },
                ],
                gloss: { en: 'short form of Maria', sk: 'skrátená podoba mena Mária' },
                confidence: 'probable',
                epistemicClass: 'disputed-origin',
                summary: {
                    en: 'The usual account makes Mia a Danish, Swedish and German short form of Maria. It is the reading that fits the name’s spread best, but Maria itself has no agreed meaning, so the chain ends in an open question.',
                    sk: 'Bežný výklad považuje meno Mia za dánsku, švédsku a nemeckú skrátenú podobu mena Maria. Tento výklad najlepšie zodpovedá rozšíreniu mena, samotné meno Mária však nemá dohodnutý význam, takže reťaz sa končí otvorenou otázkou.',
                },
                provenance: ['biblical-onomastics', 'contested-etymology'],
            },
            {
                id: 'mia-italian-word',
                sourceLanguage: 'italian',
                culture: { en: 'Italian', sk: 'Talianska' },
                derivation: [
                    { form: 'mia', language: 'italian', gloss: { en: 'mine, my own (feminine)', sk: 'moja' } },
                ],
                gloss: { en: 'mine', sk: 'moja' },
                confidence: 'disputed',
                epistemicClass: 'disputed-origin',
                summary: {
                    en: 'A second account treats the name as the Italian and Spanish word mia, mine, used affectionately. This may well be a later reinterpretation by speakers of those languages rather than the source of the name, and the two cannot be told apart from the form alone.',
                    sk: 'Druhý výklad chápe meno ako talianske a španielske slovo mia, moja, používané ako oslovenie z náklonnosti. Môže ísť skôr o neskoršie prehodnotenie hovoriacimi týchto jazykov než o pôvod mena a od seba sa to podľa samotnej podoby odlíšiť nedá.',
                },
                provenance: ['contested-etymology'],
            },
        ],
        meaning: {
            literal: null,
            traditional: { en: 'a short form of Maria', sk: 'skrátená podoba mena Mária' },
        },
        history: {
            en: 'Mia was a Scandinavian and German pet form that became an independent given name in the 1960s and one of the most given names in Europe and North America after 2000. Its place in the Slovak calendar is part of that very recent wave.',
            sk: 'Mia bola škandinávska a nemecká domácka podoba, ktorá sa v 60. rokoch 20. storočia osamostatnila a po roku 2000 sa stala jedným z najčastejšie dávaných mien v Európe a Severnej Amerike. Miesto v slovenskom kalendári je súčasťou tejto celkom nedávnej vlny.',
        },
        culturalSpread: [
            { id: 'mia-nordic', region: { en: 'Denmark, Sweden', sk: 'Dánsko, Švédsko' }, forms: ['Mia'] },
            { id: 'mia-german', region: { en: 'Germany, Austria', sk: 'Nemecko, Rakúsko' }, forms: ['Mia'] },
            { id: 'mia-central-europe', region: { en: 'Slovakia, Czechia, Croatia', sk: 'Slovensko, Česko, Chorvátsko' }, forms: ['Mia'] },
        ],
        variants: [],
        relatedNames: [
            { canonicalKey: 'maria', relation: 'derived-from',
                note: { en: 'Only on the first of the two accounts.', sk: 'Len podľa prvého z oboch výkladov.' } },
            { canonicalKey: 'miriama', relation: 'shares-root' },
        ],
        confidence: 'disputed',
        notes: [
            {
                id: 'mia-maria-meaning-open',
                kind: 'linguistic',
                text: {
                    en: 'Even on the Maria account, no meaning can honestly be given. The Hebrew Miryam has been read as bitter, beloved, and several other things, and none of the proposals has carried the field.',
                    sk: 'Aj pri výklade cez meno Mária nemožno poctivo uviesť význam. Hebrejské Miryam sa vykladalo ako horká, milovaná aj inak a ani jeden z návrhov sa nepresadil.',
                },
            },
        ],
        provenance: ['biblical-onomastics', 'contested-etymology', 'sk-web-calendars'],
    },
    {
        canonicalKey: 'radka',
        canonicalName: 'Radka',
        gender: 'feminine',
        origins: [
            {
                id: 'radka-slavic-rad',
                sourceLanguage: 'proto-slavic',
                culture: { en: 'Slavic', sk: 'Slovanská' },
                derivation: [
                    { form: 'radъ', language: 'proto-slavic', reconstructed: true, gloss: { en: 'glad, willing', sk: 'rád, ochotný' } },
                    { form: 'Rad-', language: 'slavic', gloss: { en: 'the first element of compound names such as Radoslava and Radomíra', sk: 'prvý prvok zložených mien ako Radoslava a Radomíra' } },
                    { form: 'Radka', language: 'slovak', gloss: { en: 'the short form with the Slavic diminutive -ka', sk: 'skrátená podoba so slovanskou zdrobňovacou príponou -ka' } },
                ],
                gloss: { en: 'glad, joyful', sk: 'radostná' },
                confidence: 'probable',
                epistemicClass: 'etymological-fact',
                summary: {
                    en: 'Radka is a short form of the Slavic compound names beginning Rad-, formed with the diminutive suffix -ka. The root radъ, glad, is secure; which of the several full names any particular Radka shortens is not recoverable from the form.',
                    sk: 'Radka je skrátenou podobou slovanských zložených mien na Rad-, utvorenou zdrobňovacou príponou -ka. Koreň radъ, rád, je istý; z ktorého z viacerých plných mien konkrétna Radka pochádza, sa z podoby zistiť nedá.',
                },
                provenance: ['slavic-onomastics'],
            },
        ],
        meaning: { literal: { en: 'glad, joyful', sk: 'radostná' } },
        history: {
            en: 'The short form is old in the West and South Slavic languages and became an independently given name in Czechia and Slovakia during the twentieth century. In Bulgarian it has long stood on its own as well.',
            sk: 'Skrátená podoba je v západoslovanských a juhoslovanských jazykoch stará a v Česku a na Slovensku sa v 20. storočí stala samostatne dávaným menom. Aj v bulharčine dlho stojí samostatne.',
        },
        culturalSpread: [
            { id: 'radka-west-slavic', region: { en: 'Slovakia, Czechia', sk: 'Slovensko, Česko' }, forms: ['Radka'] },
            { id: 'radka-bulgaria', region: { en: 'Bulgaria', sk: 'Bulharsko' }, forms: ['Радка', 'Radka'] },
        ],
        variants: [
            { form: 'Радка', kind: 'transliteration', language: 'bulgarian', resolvesToCanonical: true },
        ],
        relatedNames: [
            { canonicalKey: 'radoslava', relation: 'derived-from',
                note: { en: 'One of several possible full names behind the short form.', sk: 'Jedno z viacerých možných plných mien za skrátenou podobou.' } },
            { canonicalKey: 'radovana', relation: 'shares-root' },
            { canonicalKey: 'radomir', relation: 'shares-root' },
        ],
        confidence: 'probable',
        notes: [],
        provenance: ['slavic-onomastics', 'sk-web-calendars'],
    },
    {
        canonicalKey: 'melisa',
        canonicalName: 'Melisa',
        gender: 'feminine',
        origins: [
            {
                id: 'melisa-greek-bee',
                sourceLanguage: 'ancient-greek',
                culture: { en: 'Greek', sk: 'Grécka' },
                derivation: [
                    { form: 'meli', language: 'ancient-greek', gloss: { en: 'honey', sk: 'med' } },
                    { form: 'melissa', language: 'ancient-greek', gloss: { en: 'bee', sk: 'včela' } },
                    { form: 'Melissa', language: 'ancient-greek', gloss: { en: 'the word used as a name, borne by nymphs and priestesses in myth', sk: 'slovo použité ako meno, ktoré v mýtoch nosili nymfy a kňažky' } },
                ],
                gloss: { en: 'bee', sk: 'včela' },
                confidence: 'well-attested',
                epistemicClass: 'etymological-fact',
                summary: {
                    en: 'Melisa is the Greek word melissa, bee, built on meli, honey. It was a name in Greek myth and was revived in Renaissance Italian poetry, notably by Ariosto, before becoming a common modern name.',
                    sk: 'Melisa je grécke slovo melissa, včela, utvorené od meli, med. V gréckom mýte bolo menom a v renesančnej talianskej poézii, najmä u Ariosta, sa oživilo, skôr než sa stalo bežným moderným menom.',
                },
                provenance: ['classical-onomastics', 'onomastic-consensus'],
            },
        ],
        meaning: { literal: { en: 'bee', sk: 'včela' } },
        history: {
            en: 'The modern name came into wide use in English in the 1960s and spread to Continental Europe from there, often written with one s. In Turkey it is also common, reinforced by resemblance to an unrelated local usage.',
            sk: 'Moderné meno sa v angličtine široko rozšírilo v 60. rokoch 20. storočia a odtiaľ sa dostalo na európsky kontinent, často so zápisom s jedným s. Bežné je aj v Turecku, kde ho posilňuje podobnosť s nesúvisiacim domácim používaním.',
        },
        culturalSpread: [
            { id: 'melisa-anglophone', region: { en: 'United States, United Kingdom', sk: 'Spojené štáty, Spojené kráľovstvo' }, forms: ['Melissa'] },
            { id: 'melisa-central-europe', region: { en: 'Slovakia, Czechia, Turkey', sk: 'Slovensko, Česko, Turecko' }, forms: ['Melisa'] },
        ],
        variants: [
            { form: 'Melissa', kind: 'spelling', resolvesToCanonical: true },
            { form: 'Melitta', kind: 'language-form', language: 'german', resolvesToCanonical: true },
        ],
        relatedNames: [
            { canonicalKey: 'melania', relation: 'shares-root',
                note: { en: 'Not related: Melánia is from Greek melas, black, a different word that only looks similar.', sk: 'Nesúvisí: Melánia je z gréckeho melas, čierny, iné slovo, ktoré sa len podobá.' } },
        ],
        confidence: 'well-attested',
        notes: [],
        provenance: ['classical-onomastics', 'onomastic-consensus', 'sk-web-calendars'],
    },
    {
        canonicalKey: 'damian',
        canonicalName: 'Damián',
        gender: 'masculine',
        origins: [
            {
                id: 'damian-greek-damao',
                sourceLanguage: 'ancient-greek',
                culture: { en: 'Greek, then Christian', sk: 'Grécka, potom kresťanská' },
                derivation: [
                    { form: 'damao', language: 'ancient-greek', gloss: { en: 'to tame, to subdue', sk: 'krotiť, podmaniť si' } },
                    { form: 'Damianos', language: 'ancient-greek', gloss: { en: 'the derived personal name', sk: 'odvodené osobné meno' } },
                    { form: 'Damianus', language: 'latin', gloss: { en: 'the Latin form', sk: 'latinská podoba' } },
                ],
                gloss: { en: 'to tame, to subdue', sk: 'krotiť, podmaniť si' },
                confidence: 'probable',
                epistemicClass: 'etymological-fact',
                summary: {
                    en: 'Damianos is usually derived from the Greek verb damao, to tame. Some link it instead to Damia, an epithet of a Greek goddess of fertility, though that name is itself likely built on the same verb, so the two accounts largely converge.',
                    sk: 'Meno Damianos sa zvyčajne odvodzuje z gréckeho slovesa damao, krotiť. Niektorí ho spájajú s menom Damia, prívlastkom gréckej bohyne plodnosti, hoci aj to je pravdepodobne utvorené od toho istého slovesa, takže oba výklady sa v podstate zbiehajú.',
                },
                provenance: ['classical-onomastics', 'onomastic-consensus'],
            },
        ],
        meaning: { literal: { en: 'one who tames', sk: 'ten, kto krotí' } },
        history: {
            en: 'The name spread through Saints Cosmas and Damian, physician brothers martyred in the early fourth century and venerated as patrons of medicine across both the Greek and Latin churches. It has been in Slovak use for centuries and returned to the calendar in modern revisions.',
            sk: 'Meno rozšírili svätí Kozma a Damián, bratia lekári umučení na začiatku 4. storočia, uctievaní ako patróni medicíny v gréckej aj latinskej cirkvi. Na Slovensku sa používa stáročia a do kalendára sa vrátilo v moderných úpravách.',
        },
        culturalSpread: [
            { id: 'damian-greek', region: { en: 'Greece', sk: 'Grécko' }, forms: ['Δαμιανός', 'Damianos'] },
            { id: 'damian-romance', region: { en: 'Italy, Spain, France', sk: 'Taliansko, Španielsko, Francúzsko' }, forms: ['Damiano', 'Damián', 'Damien'] },
            { id: 'damian-central-europe', region: { en: 'Slovakia, Poland, Czechia', sk: 'Slovensko, Poľsko, Česko' }, forms: ['Damián', 'Damian'] },
        ],
        variants: [
            { form: 'Damien', kind: 'language-form', language: 'french', resolvesToCanonical: true },
            { form: 'Damiano', kind: 'language-form', language: 'italian', resolvesToCanonical: true },
            { form: 'Damianos', kind: 'transliteration', language: 'ancient-greek', resolvesToCanonical: true },
        ],
        relatedNames: [],
        confidence: 'probable',
        notes: [],
        provenance: ['classical-onomastics', 'onomastic-consensus', 'sk-web-calendars'],
    },
    {
        canonicalKey: 'elisa',
        canonicalName: 'Elisa',
        gender: 'feminine',
        origins: [
            {
                id: 'elisa-italian-short-of-elisabetta',
                sourceLanguage: 'hebrew',
                culture: { en: 'Hebrew, by way of Italian', sk: 'Hebrejská, cez taliančinu' },
                derivation: [
                    { form: 'Elisheva', language: 'hebrew', gloss: { en: 'my God is an oath, or my God is abundance', sk: 'môj Boh je prísaha, alebo môj Boh je hojnosť' } },
                    { form: 'Elisabet', language: 'ancient-greek', gloss: { en: 'the Greek form used in the Gospel of Luke', sk: 'grécka podoba použitá v Lukášovom evanjeliu' } },
                    { form: 'Elisabetta', language: 'italian', gloss: { en: 'the Italian form', sk: 'talianska podoba' } },
                    { form: 'Elisa', language: 'italian', gloss: { en: 'the short form', sk: 'skrátená podoba' } },
                ],
                gloss: { en: 'my God is an oath', sk: 'môj Boh je prísaha' },
                confidence: 'probable',
                epistemicClass: 'etymological-fact',
                summary: {
                    en: 'Elisa is the front half of Italian Elisabetta used alone. The Hebrew Elisheva behind it joins El, God, to a word that can mean oath or seven or abundance, which is why its gloss is given more than one way.',
                    sk: 'Elisa je predná časť talianskeho mena Elisabetta používaná samostatne. Hebrejské Elisheva za ňou spája prvok El, Boh, so slovom, ktoré môže znamenať prísaha, sedem alebo hojnosť, a preto sa jeho výklad uvádza viacerými spôsobmi.',
                },
                provenance: ['biblical-onomastics', 'onomastic-consensus'],
            },
        ],
        meaning: {
            literal: { en: 'my God is an oath', sk: 'môj Boh je prísaha' },
            traditional: { en: 'consecrated to God', sk: 'zasvätená Bohu' },
        },
        history: {
            en: 'The short form became independent in Italy, Germany and Spain, and reached Slovak usage as an international name in recent decades. Slovak already had Alžbeta and Eliška from the same source, so Elisa is a third arrival of one Hebrew name.',
            sk: 'Skrátená podoba sa osamostatnila v Taliansku, Nemecku a Španielsku a do slovenského používania sa dostala ako medzinárodné meno v posledných desaťročiach. Slovenčina už mala z toho istého zdroja mená Alžbeta a Eliška, takže Elisa je tretím príchodom jedného hebrejského mena.',
        },
        culturalSpread: [
            { id: 'elisa-italy', region: { en: 'Italy, Spain', sk: 'Taliansko, Španielsko' }, forms: ['Elisa'] },
            { id: 'elisa-german', region: { en: 'Germany', sk: 'Nemecko' }, forms: ['Elisa', 'Elise'] },
            { id: 'elisa-slovakia', region: { en: 'Slovakia', sk: 'Slovensko' }, forms: ['Elisa'] },
        ],
        variants: [
            { form: 'Elise', kind: 'language-form', language: 'german', resolvesToCanonical: true },
        ],
        relatedNames: [
            { canonicalKey: 'alzbeta', relation: 'derived-from' },
            { canonicalKey: 'eliska', relation: 'shares-root' },
            { canonicalKey: 'ela', relation: 'shares-root' },
        ],
        confidence: 'probable',
        notes: [
            {
                id: 'elisa-not-elias',
                kind: 'linguistic',
                text: {
                    en: 'Elisa and Eliáš both begin with the Hebrew element El, God, but they are different names: the second element is not the same word.',
                    sk: 'Mená Elisa a Eliáš sa obe začínajú hebrejským prvkom El, Boh, ide však o rozdielne mená: druhý prvok nie je to isté slovo.',
                },
            },
        ],
        provenance: ['biblical-onomastics', 'onomastic-consensus', 'sk-web-calendars'],
    },
    {
        canonicalKey: 'maxim',
        canonicalName: 'Maxim',
        gender: 'masculine',
        origins: [
            {
                id: 'maxim-latin-maximus',
                sourceLanguage: 'latin',
                culture: { en: 'Roman, through Slavic Christian usage', sk: 'Rímska, cez slovanské kresťanské používanie' },
                derivation: [
                    { form: 'magnus', language: 'latin', gloss: { en: 'great', sk: 'veľký' } },
                    { form: 'maximus', language: 'latin', gloss: { en: 'greatest, the superlative of magnus', sk: 'najväčší, superlatív slova magnus' } },
                    { form: 'Maximus', language: 'latin', gloss: { en: 'a Roman cognomen', sk: 'rímske prímenie' } },
                    { form: 'Максим', language: 'russian', gloss: { en: 'Maksim, the East Slavic form', sk: 'Maksim, východoslovanská podoba' } },
                ],
                gloss: { en: 'greatest', sk: 'najväčší' },
                confidence: 'well-attested',
                epistemicClass: 'etymological-fact',
                summary: {
                    en: 'Maxim is the Latin superlative maximus, greatest, used first as a Roman cognomen and then as a Christian name. It reached Slovak both through the East Slavic Maksim and as a short form of Maximilián.',
                    sk: 'Maxim je latinský superlatív maximus, najväčší, používaný najprv ako rímske prímenie a potom ako kresťanské meno. Do slovenčiny sa dostal aj cez východoslovanské Maksim, aj ako skrátená podoba mena Maximilián.',
                },
                provenance: ['classical-onomastics', 'onomastic-consensus'],
            },
        ],
        meaning: { literal: { en: 'greatest', sk: 'najväčší' } },
        history: {
            en: 'Maximus was a common late Roman name and was carried by several saints, including Maximus the Confessor. The form Maxim is the ordinary Russian and Ukrainian one and is now the usual international spelling of the short name.',
            sk: 'Maximus bolo bežné neskororímske meno a nosilo ho viacero svätcov vrátane Maxima Vyznávača. Podoba Maxim je bežná ruská a ukrajinská a dnes je zvyčajným medzinárodným zápisom krátkeho mena.',
        },
        culturalSpread: [
            { id: 'maxim-east-slavic', region: { en: 'Russia, Ukraine, Belarus', sk: 'Rusko, Ukrajina, Bielorusko' }, forms: ['Максим', 'Maksim'] },
            { id: 'maxim-central-europe', region: { en: 'Slovakia, Czechia, Poland', sk: 'Slovensko, Česko, Poľsko' }, forms: ['Maxim', 'Maksym'] },
        ],
        variants: [
            { form: 'Максим', kind: 'transliteration', language: 'russian', resolvesToCanonical: true },
            { form: 'Maksim', kind: 'spelling', resolvesToCanonical: true },
            { form: 'Maksym', kind: 'language-form', language: 'ukrainian', resolvesToCanonical: true },
        ],
        relatedNames: [
            { canonicalKey: 'maximilian', relation: 'shares-root' },
            { canonicalKey: 'max', relation: 'shares-root' },
        ],
        confidence: 'well-attested',
        notes: [],
        provenance: ['classical-onomastics', 'onomastic-consensus', 'sk-web-calendars'],
    },
    {
        canonicalKey: 'max',
        canonicalName: 'Max',
        gender: 'masculine',
        origins: [
            {
                id: 'max-german-short-form',
                sourceLanguage: 'latin',
                culture: { en: 'Roman, by way of German', sk: 'Rímska, cez nemčinu' },
                derivation: [
                    { form: 'maximus', language: 'latin', gloss: { en: 'greatest', sk: 'najväčší' } },
                    { form: 'Maximilianus', language: 'latin', gloss: { en: 'the compound Renaissance name', sk: 'zložené renesančné meno' } },
                    { form: 'Max', language: 'german', gloss: { en: 'the German short form', sk: 'nemecká skrátená podoba' } },
                ],
                gloss: { en: 'greatest', sk: 'najväčší' },
                confidence: 'well-attested',
                epistemicClass: 'etymological-fact',
                summary: {
                    en: 'Max is the German short form of Maximilian, and by extension of Maximus and Maxim. It shortens to the first syllable and has been used as a full name in its own right since the nineteenth century.',
                    sk: 'Max je nemecká skrátená podoba mena Maximilián a rozšírene aj mien Maximus a Maxim. Skracuje sa na prvú slabiku a od 19. storočia sa používa ako samostatné meno.',
                },
                provenance: ['classical-onomastics', 'onomastic-consensus'],
            },
        ],
        meaning: { literal: { en: 'greatest', sk: 'najväčší' } },
        history: {
            en: 'The short form belongs to the German-speaking world, where Maximilian was a Habsburg and Bavarian dynastic name. It became internationally common in the late twentieth century and entered the Slovak calendar in that recent wave.',
            sk: 'Skrátená podoba patrí nemecky hovoriacemu svetu, kde bolo meno Maximilián habsburským a bavorským dynastickým menom. Medzinárodne sa rozšírila na konci 20. storočia a v tejto nedávnej vlne sa dostala do slovenského kalendára.',
        },
        culturalSpread: [
            { id: 'max-german', region: { en: 'Germany, Austria', sk: 'Nemecko, Rakúsko' }, forms: ['Max'] },
            { id: 'max-anglophone', region: { en: 'United Kingdom, United States', sk: 'Spojené kráľovstvo, Spojené štáty' }, forms: ['Max'] },
            { id: 'max-central-europe', region: { en: 'Slovakia, Czechia', sk: 'Slovensko, Česko' }, forms: ['Max'] },
        ],
        variants: [],
        relatedNames: [
            { canonicalKey: 'maximilian', relation: 'derived-from' },
            { canonicalKey: 'maxim', relation: 'shares-root' },
        ],
        confidence: 'well-attested',
        notes: [
            {
                id: 'max-several-parents',
                kind: 'usage',
                text: {
                    en: 'Max shortens Maximilián, Maxim and Maximus alike, and in English also Maxwell, which is a surname of separate origin. The short form does not say which one stands behind it.',
                    sk: 'Max je skrátenou podobou mien Maximilián, Maxim aj Maximus a v angličtine aj mena Maxwell, ktoré je priezviskom iného pôvodu. Skrátená podoba neprezrádza, ktoré z nich za ňou stojí.',
                },
            },
        ],
        provenance: ['classical-onomastics', 'onomastic-consensus', 'sk-web-calendars'],
    },
    {
        canonicalKey: 'kiara',
        canonicalName: 'Kiara',
        gender: 'feminine',
        origins: [
            {
                id: 'kiara-italian-chiara',
                sourceLanguage: 'latin',
                culture: { en: 'Italian', sk: 'Talianska' },
                derivation: [
                    { form: 'clarus', language: 'latin', gloss: { en: 'bright, clear, famous', sk: 'jasný, zreteľný, slávny' } },
                    { form: 'Chiara', language: 'italian', gloss: { en: 'the Italian form of Clara', sk: 'talianska podoba mena Klára' } },
                    { form: 'Kiara', language: 'english', gloss: { en: 'a phonetic respelling of Chiara', sk: 'fonetický prepis mena Chiara' } },
                ],
                gloss: { en: 'bright, clear', sk: 'jasná' },
                confidence: 'probable',
                epistemicClass: 'disputed-origin',
                summary: {
                    en: 'On the first account Kiara is Chiara, the Italian Clara, respelled the way it sounds. Latin clarus means bright and clear, and the name reached wide use through Clare of Assisi.',
                    sk: 'Podľa prvého výkladu je Kiara meno Chiara, teda talianska Klára, prepísané tak, ako znie. Latinské clarus znamená jasný a zreteľný a meno sa rozšírilo cez Kláru z Assisi.',
                },
                provenance: ['classical-onomastics', 'contested-etymology'],
            },
            {
                id: 'kiara-irish-ciara',
                sourceLanguage: 'old-irish',
                culture: { en: 'Irish', sk: 'Írska' },
                derivation: [
                    { form: 'ciar', language: 'old-irish', gloss: { en: 'dark, black', sk: 'tmavý, čierny' } },
                    { form: 'Ciara', language: 'gaelic', gloss: { en: 'the feminine of Ciarán', sk: 'ženská podoba mena Ciarán' } },
                    { form: 'Kiara', language: 'english', gloss: { en: 'an anglicized spelling of Ciara', sk: 'poangličtený zápis mena Ciara' } },
                ],
                gloss: { en: 'dark, dark-haired', sk: 'tmavá, tmavovlasá' },
                confidence: 'disputed',
                epistemicClass: 'disputed-origin',
                summary: {
                    en: 'On the second account Kiara is the Irish Ciara, from ciar, dark, respelled with a k so that English speakers pronounce it. This route gives the name the opposite meaning to the Italian one.',
                    sk: 'Podľa druhého výkladu je Kiara írske meno Ciara zo slova ciar, tmavý, prepísané s k, aby ho anglicky hovoriaci vyslovili správne. Táto cesta dáva menu opačný význam než tá talianska.',
                },
                provenance: ['onomastic-consensus', 'contested-etymology'],
            },
        ],
        meaning: {
            literal: null,
            traditional: { en: 'bright, on the Italian reading; dark, on the Irish one', sk: 'jasná pri talianskom výklade; tmavá pri írskom' },
        },
        history: {
            en: 'The spelling with k belongs to the late twentieth century and to English-language usage, which brought two unrelated names into one written form. It reached the Slovak calendar from that international usage, with no way to say which of the two a Slovak bearer inherits.',
            sk: 'Zápis s k patrí do konca 20. storočia a do anglického používania, ktoré zlialo dve nesúvisiace mená do jednej písanej podoby. Do slovenského kalendára sa dostal z tohto medzinárodného používania a nedá sa povedať, ktoré z oboch mien slovenská nositeľka dedí.',
        },
        culturalSpread: [
            { id: 'kiara-italy', region: { en: 'Italy', sk: 'Taliansko' }, forms: ['Chiara'] },
            { id: 'kiara-ireland', region: { en: 'Ireland', sk: 'Írsko' }, forms: ['Ciara'] },
            { id: 'kiara-central-europe', region: { en: 'Slovakia, Czechia', sk: 'Slovensko, Česko' }, forms: ['Kiara'] },
        ],
        variants: [
            { form: 'Ciara', kind: 'language-form', language: 'gaelic', resolvesToCanonical: false,
                note: { en: 'The Irish name in its own spelling; kept unresolved because it is a distinct name.', sk: 'Írske meno vo vlastnom zápise; nepriraďuje sa, lebo ide o samostatné meno.' } },
        ],
        relatedNames: [
            { canonicalKey: 'klara', relation: 'shares-root',
                note: { en: 'Only on the Italian reading.', sk: 'Len pri talianskom výklade.' } },
        ],
        confidence: 'disputed',
        notes: [
            {
                id: 'kiara-two-names-one-spelling',
                kind: 'linguistic',
                text: {
                    en: 'Kiara is one spelling covering two separate names that mean opposite things. Sources that give it a single meaning have quietly picked one of the two.',
                    sk: 'Kiara je jeden zápis pre dve samostatné mená s opačnými významami. Zdroje, ktoré mu pripisujú jediný význam, si potichu vybrali jedno z nich.',
                },
            },
        ],
        provenance: ['classical-onomastics', 'onomastic-consensus', 'contested-etymology', 'sk-web-calendars'],
    },
    {
        canonicalKey: 'denisa',
        canonicalName: 'Denisa',
        gender: 'feminine',
        origins: [
            {
                id: 'denisa-greek-dionysos',
                sourceLanguage: 'ancient-greek',
                culture: { en: 'Greek, by way of French', sk: 'Grécka, cez francúzštinu' },
                derivation: [
                    { form: 'Dionysos', language: 'ancient-greek', gloss: { en: 'the Greek god of wine and ecstatic rite', sk: 'grécky boh vína a extatického obradu' } },
                    { form: 'Dionysios', language: 'ancient-greek', gloss: { en: 'devoted to Dionysos', sk: 'zasvätený Dionýzovi' } },
                    { form: 'Denis', language: 'french', gloss: { en: 'the French form, from the Latin Dionysius', sk: 'francúzska podoba z latinského Dionysius' } },
                    { form: 'Denise', language: 'french', gloss: { en: 'the French feminine', sk: 'francúzska ženská podoba' } },
                ],
                gloss: { en: 'devoted to Dionysos', sk: 'zasvätená Dionýzovi' },
                confidence: 'probable',
                epistemicClass: 'etymological-fact',
                summary: {
                    en: 'Denisa is the French Denise in Slovak spelling, the feminine of Denis, which is the French form of Dionysius, devoted to Dionysos. The god’s own name is only partly explained, so the chain is secure down to Dionysos and no further.',
                    sk: 'Denisa je francúzske Denise v slovenskom zápise, ženská podoba mena Denis, ktoré je francúzskou podobou mena Dionysius, zasvätený Dionýzovi. Meno samotného boha je vysvetlené len sčasti, takže reťaz je istá po Dionýza a ďalej už nie.',
                },
                provenance: ['classical-onomastics', 'onomastic-consensus'],
            },
        ],
        meaning: { literal: { en: 'devoted to Dionysos', sk: 'zasvätená Dionýzovi' } },
        history: {
            en: 'Denis owed its French popularity to Saint Denis, the first bishop of Paris and patron of France. The feminine Denise spread from France in the twentieth century, and Czech and Slovak wrote it phonetically as Denisa.',
            sk: 'Meno Denis vďačilo za francúzsku obľubu svätému Dionýzovi, prvému parížskemu biskupovi a patrónovi Francúzska. Ženská podoba Denise sa z Francúzska rozšírila v 20. storočí a čeština a slovenčina ju zapísali foneticky ako Denisa.',
        },
        culturalSpread: [
            { id: 'denisa-france', region: { en: 'France', sk: 'Francúzsko' }, forms: ['Denise'] },
            { id: 'denisa-central-europe', region: { en: 'Slovakia, Czechia, Romania', sk: 'Slovensko, Česko, Rumunsko' }, forms: ['Denisa'] },
        ],
        variants: [
            { form: 'Denise', kind: 'language-form', language: 'french', resolvesToCanonical: true },
        ],
        relatedNames: [
            { canonicalKey: 'dionyz', relation: 'feminine-form',
                note: { en: 'Dionýz is the domestic Slovak form of the same name.', sk: 'Dionýz je domáca slovenská podoba toho istého mena.' } },
        ],
        confidence: 'probable',
        notes: [
            {
                id: 'denisa-dionysos-name-unclear',
                kind: 'linguistic',
                text: {
                    en: 'The name of Dionysos itself is not fully explained. The first part is generally read as the name of Zeus in an old case form, but the second part has no agreed account, so the meaning of the whole is open.',
                    sk: 'Samotné meno Dionýzos nie je úplne vysvetlené. Prvá časť sa všeobecne číta ako meno Zeus v starom pádovom tvare, druhá časť však nemá dohodnutý výklad, takže význam celku zostáva otvorený.',
                },
            },
        ],
        provenance: ['classical-onomastics', 'onomastic-consensus', 'sk-web-calendars'],
    },
    {
        canonicalKey: 'teo',
        canonicalName: 'Teo',
        gender: 'masculine',
        origins: [
            {
                id: 'teo-greek-theos-short-form',
                sourceLanguage: 'ancient-greek',
                culture: { en: 'Greek, through Central European usage', sk: 'Grécka, cez stredoeurópske používanie' },
                derivation: [
                    { form: 'theos', language: 'ancient-greek', gloss: { en: 'god', sk: 'boh' } },
                    { form: 'Theo-', language: 'ancient-greek', gloss: { en: 'the first element of Theodoros, Theophilos and other compounds', sk: 'prvý prvok mien Theodoros, Theofilos a ďalších zložených mien' } },
                    { form: 'Teo', language: 'slovak', gloss: { en: 'the short form as written in Slovak', sk: 'skrátená podoba v slovenskom zápise' } },
                ],
                gloss: { en: 'god', sk: 'boh' },
                confidence: 'probable',
                epistemicClass: 'etymological-fact',
                summary: {
                    en: 'Teo is the first element of the Greek theo- names used alone, chiefly from Teodor, gift of God, and Teofil, friend of God. The element itself means god; the short form does not carry the rest of whichever compound it came from.',
                    sk: 'Teo je prvý prvok gréckych mien na theo- používaný samostatne, najmä z mien Teodor, dar Boží, a Teofil, priateľ Boží. Samotný prvok znamená boh; skrátená podoba nenesie zvyšok toho zloženého mena, z ktorého pochádza.',
                },
                provenance: ['classical-onomastics', 'onomastic-consensus'],
            },
        ],
        meaning: {
            literal: { en: 'god', sk: 'boh' },
            traditional: { en: 'a short form of the names built on God', sk: 'skrátená podoba mien utvorených od slova Boh' },
        },
        history: {
            en: 'The short form is old in speech and new in the register. It became a name given on its own in Italy, Croatia and the German-speaking countries in the last decades, and reached the Slovak calendar in the same wave. In Italian it also shortens Matteo, which is a different name entirely.',
            sk: 'Skrátená podoba je v reči stará a v matrike nová. Ako samostatne dávané meno sa v posledných desaťročiach presadila v Taliansku, Chorvátsku a nemecky hovoriacich krajinách a v tej istej vlne sa dostala do slovenského kalendára. V taliančine skracuje aj meno Matteo, ktoré je celkom iné.',
        },
        culturalSpread: [
            { id: 'teo-italy', region: { en: 'Italy', sk: 'Taliansko' }, forms: ['Teo'] },
            { id: 'teo-south-slavic', region: { en: 'Croatia, Slovenia', sk: 'Chorvátsko, Slovinsko' }, forms: ['Teo'] },
            { id: 'teo-central-europe', region: { en: 'Slovakia, Czechia', sk: 'Slovensko, Česko' }, forms: ['Teo', 'Théo'] },
        ],
        variants: [
            { form: 'Théo', kind: 'language-form', language: 'french', resolvesToCanonical: true },
        ],
        relatedNames: [
            { canonicalKey: 'teodor', relation: 'derived-from' },
            { canonicalKey: 'teobald', relation: 'shares-root',
                note: { en: 'Not related: Teobald is Germanic and its first element is a word for people, not the Greek theos.', sk: 'Nesúvisí: Teobald je germánsky a jeho prvý prvok je slovo pre ľud, nie grécke theos.' } },
        ],
        confidence: 'probable',
        notes: [
            {
                id: 'teo-several-parents',
                kind: 'usage',
                text: {
                    en: 'Teo can stand for Teodor, Teofil, Teodozij or the unrelated Italian Matteo. Which name a given Teo shortens cannot be read off the form.',
                    sk: 'Teo môže zastupovať mená Teodor, Teofil, Teodozij alebo nesúvisiace talianske Matteo. Ktoré meno konkrétny Teo skracuje, sa z podoby vyčítať nedá.',
                },
            },
        ],
        provenance: ['classical-onomastics', 'onomastic-consensus', 'sk-web-calendars'],
    },
    {
        canonicalKey: 'jonas',
        canonicalName: 'Jonáš',
        gender: 'masculine',
        origins: [
            {
                id: 'jonas-hebrew-yonah',
                sourceLanguage: 'hebrew',
                culture: { en: 'Hebrew, biblical', sk: 'Hebrejská, biblická' },
                derivation: [
                    { form: 'yonah', language: 'hebrew', gloss: { en: 'dove', sk: 'holubica' } },
                    { form: 'Yonah', language: 'hebrew', gloss: { en: 'the name of the prophet', sk: 'meno proroka' } },
                    { form: 'Ionas', language: 'ancient-greek', gloss: { en: 'the Septuagint and New Testament form', sk: 'podoba v Septuaginte a Novom zákone' } },
                    { form: 'Jonas', language: 'latin', gloss: { en: 'the Vulgate form', sk: 'podoba vo Vulgáte' } },
                ],
                gloss: { en: 'dove', sk: 'holubica' },
                confidence: 'well-attested',
                epistemicClass: 'etymological-fact',
                summary: {
                    en: 'Jonáš is the Hebrew yonah, dove, the name of the prophet swallowed by the great fish. The word is ordinary Hebrew vocabulary, so unlike many biblical names its meaning is not in doubt.',
                    sk: 'Jonáš je hebrejské yonah, holubica, meno proroka, ktorého prehltla veľká ryba. Slovo patrí do bežnej hebrejskej slovnej zásoby, takže na rozdiel od mnohých biblických mien je jeho význam nesporný.',
                },
                provenance: ['biblical-onomastics', 'onomastic-consensus'],
            },
        ],
        meaning: { literal: { en: 'dove', sk: 'holubica' } },
        history: {
            en: 'The name was used by Jews and Christians alike through the Middle Ages and was taken up broadly by Protestants after the Reformation. Its recent rise in Slovakia is part of a wider return to Old Testament names.',
            sk: 'Meno používali v stredoveku Židia aj kresťania a po reformácii ho vo veľkom prevzali protestanti. Jeho nedávny vzostup na Slovensku je súčasťou širšieho návratu k starozákonným menám.',
        },
        culturalSpread: [
            { id: 'jonas-german-nordic', region: { en: 'Germany, Scandinavia, Lithuania', sk: 'Nemecko, Škandinávia, Litva' }, forms: ['Jonas'] },
            { id: 'jonas-central-europe', region: { en: 'Slovakia, Czechia, Hungary', sk: 'Slovensko, Česko, Maďarsko' }, forms: ['Jonáš', 'Jónás'] },
        ],
        variants: [
            { form: 'Jonas', kind: 'language-form', language: 'latin', resolvesToCanonical: true },
            { form: 'Jónás', kind: 'language-form', language: 'hungarian', resolvesToCanonical: true },
            { form: 'Jonah', kind: 'language-form', language: 'english', resolvesToCanonical: true },
        ],
        relatedNames: [],
        confidence: 'well-attested',
        notes: [
            {
                id: 'jonas-not-jan',
                kind: 'linguistic',
                text: {
                    en: 'Jonáš and Ján are different Hebrew names. The Greek New Testament even distinguishes them, and the resemblance in Slovak is only in the first letter.',
                    sk: 'Jonáš a Ján sú rozdielne hebrejské mená. Grécky Nový zákon ich rozlišuje a podobnosť v slovenčine je len v prvom písmene.',
                },
            },
        ],
        provenance: ['biblical-onomastics', 'onomastic-consensus', 'sk-web-calendars'],
    },
    {
        canonicalKey: 'andreas',
        canonicalName: 'Andreas',
        gender: 'masculine',
        origins: [
            {
                id: 'andreas-greek-aner',
                sourceLanguage: 'ancient-greek',
                culture: { en: 'Greek, biblical', sk: 'Grécka, biblická' },
                derivation: [
                    { form: 'aner', language: 'ancient-greek', gloss: { en: 'man', sk: 'muž' } },
                    { form: 'andreios', language: 'ancient-greek', gloss: { en: 'manly, of a man', sk: 'mužný, mužský' } },
                    { form: 'Andreas', language: 'ancient-greek', gloss: { en: 'the name of the apostle', sk: 'meno apoštola' } },
                ],
                gloss: { en: 'manly', sk: 'mužný' },
                confidence: 'well-attested',
                epistemicClass: 'etymological-fact',
                summary: {
                    en: 'Andreas is the Greek name of the apostle, built on aner, man, through the adjective andreios. It is the original form from which Slovak Ondrej, Latin Andreas and every other European version descend.',
                    sk: 'Andreas je grécke meno apoštola, utvorené od slova aner, muž, cez prídavné meno andreios. Je to pôvodná podoba, z ktorej pochádza slovenský Ondrej, latinský Andreas aj všetky ostatné európske podoby.',
                },
                provenance: ['classical-onomastics', 'biblical-onomastics'],
            },
        ],
        meaning: { literal: { en: 'manly', sk: 'mužný' } },
        history: {
            en: 'The apostle Andrew carried the name across Christendom, and it became a national name in Scotland, Russia and Greece. Slovak long used the domestic Ondrej; the Greek and German spelling Andreas is a separate, later calendar entry.',
            sk: 'Apoštol Andrej rozniesol meno po celom kresťanstve a stalo sa národným menom v Škótsku, Rusku a Grécku. Slovenčina dlho používala domácu podobu Ondrej; grécky a nemecký zápis Andreas je samostatná, neskoršia kalendárna položka.',
        },
        culturalSpread: [
            { id: 'andreas-greece', region: { en: 'Greece', sk: 'Grécko' }, forms: ['Ανδρέας', 'Andreas'] },
            { id: 'andreas-german-nordic', region: { en: 'Germany, Austria, Scandinavia', sk: 'Nemecko, Rakúsko, Škandinávia' }, forms: ['Andreas'] },
            { id: 'andreas-central-europe', region: { en: 'Slovakia, Hungary', sk: 'Slovensko, Maďarsko' }, forms: ['Andreas'] },
        ],
        variants: [
            { form: 'Ανδρέας', kind: 'transliteration', language: 'ancient-greek', resolvesToCanonical: true },
        ],
        relatedNames: [
            { canonicalKey: 'ondrej', relation: 'shares-root',
                note: { en: 'Ondrej is the domestic Slovak form of the same Greek name.', sk: 'Ondrej je domáca slovenská podoba toho istého gréckeho mena.' } },
            { canonicalKey: 'andrea', relation: 'feminine-form',
                note: { en: 'In Slovak Andrea is the feminine; in Italian the same spelling is a masculine name.', sk: 'V slovenčine je Andrea ženským menom; v taliančine je ten istý zápis mužským menom.' } },
            { canonicalKey: 'adrian', relation: 'shares-root',
                note: { en: 'Not related: Adrián is from the Adriatic town Hadria and has no connection to aner.', sk: 'Nesúvisí: Adrián je podľa jadranského mesta Hadria a so slovom aner nemá nič spoločné.' } },
        ],
        confidence: 'well-attested',
        notes: [],
        provenance: ['classical-onomastics', 'biblical-onomastics', 'sk-web-calendars'],
    },
    {
        canonicalKey: 'nikolas',
        canonicalName: 'Nikolas',
        gender: 'masculine',
        origins: [
            {
                id: 'nikolas-greek-nikolaos',
                sourceLanguage: 'ancient-greek',
                culture: { en: 'Greek, then Christian', sk: 'Grécka, potom kresťanská' },
                derivation: [
                    { form: 'nike', language: 'ancient-greek', gloss: { en: 'victory', sk: 'víťazstvo' } },
                    { form: 'laos', language: 'ancient-greek', gloss: { en: 'people', sk: 'ľud' } },
                    { form: 'Nikolaos', language: 'ancient-greek', gloss: { en: 'victory of the people', sk: 'víťazstvo ľudu' } },
                    { form: 'Nikolas', language: 'slovak', gloss: { en: 'the modern international spelling', sk: 'moderný medzinárodný zápis' } },
                ],
                gloss: { en: 'victory of the people', sk: 'víťazstvo ľudu' },
                confidence: 'well-attested',
                epistemicClass: 'etymological-fact',
                summary: {
                    en: 'Nikolas is a modern spelling of the Greek compound Nikolaos, victory of the people. Both elements are ordinary Greek words and the derivation is completely transparent.',
                    sk: 'Nikolas je moderný zápis gréckeho zloženého mena Nikolaos, víťazstvo ľudu. Oba prvky sú bežné grécke slová a odvodenie je úplne priehľadné.',
                },
                provenance: ['classical-onomastics', 'onomastic-consensus'],
            },
        ],
        meaning: { literal: { en: 'victory of the people', sk: 'víťazstvo ľudu' } },
        history: {
            en: 'Saint Nicholas of Myra made the name one of the most widespread in Christendom, and Slovak has had it for centuries as Mikuláš. Nikolas is the recent international spelling and stands as its own calendar entry.',
            sk: 'Svätý Mikuláš z Myry urobil z mena jedno z najrozšírenejších v kresťanstve a slovenčina ho má stáročia ako Mikuláš. Nikolas je nedávny medzinárodný zápis a stojí ako samostatná kalendárna položka.',
        },
        culturalSpread: [
            { id: 'nikolas-greek', region: { en: 'Greece, Cyprus', sk: 'Grécko, Cyprus' }, forms: ['Νικόλαος', 'Nikolaos'] },
            { id: 'nikolas-central-europe', region: { en: 'Slovakia, Czechia', sk: 'Slovensko, Česko' }, forms: ['Nikolas', 'Mikuláš'] },
        ],
        variants: [
            { form: 'Nicolas', kind: 'language-form', language: 'french', resolvesToCanonical: false,
                note: { en: 'Already used as an alias of the Mikuláš record; not claimed here.', sk: 'Používa sa už ako alias záznamu Mikuláš; tu sa naň nenárokuje.' } },
        ],
        relatedNames: [
            { canonicalKey: 'mikulas', relation: 'shares-root',
                note: { en: 'Mikuláš is the domestic Slovak form of the same Greek name.', sk: 'Mikuláš je domáca slovenská podoba toho istého gréckeho mena.' } },
            { canonicalKey: 'nikola', relation: 'shares-root' },
            { canonicalKey: 'nikoleta', relation: 'shares-root' },
        ],
        confidence: 'well-attested',
        notes: [],
        provenance: ['classical-onomastics', 'onomastic-consensus', 'sk-web-calendars'],
    },
    {
        canonicalKey: 'noel',
        canonicalName: 'Noel',
        gender: 'masculine',
        origins: [
            {
                id: 'noel-french-christmas',
                sourceLanguage: 'latin',
                culture: { en: 'French Christian', sk: 'Francúzska kresťanská' },
                derivation: [
                    { form: 'natalis', language: 'latin', gloss: { en: 'of birth, natal', sk: 'zrodový, narodeninový' } },
                    { form: 'dies natalis', language: 'latin', gloss: { en: 'birth day, the Church name for Christmas', sk: 'deň narodenia, cirkevný názov Vianoc' } },
                    { form: 'noël', language: 'french', gloss: { en: 'Christmas', sk: 'Vianoce' } },
                    { form: 'Noël', language: 'french', gloss: { en: 'the word used as a name for a child born at Christmas', sk: 'slovo použité ako meno pre dieťa narodené na Vianoce' } },
                ],
                gloss: { en: 'Christmas, birthday', sk: 'Vianoce, deň narodenia' },
                confidence: 'well-attested',
                epistemicClass: 'etymological-fact',
                summary: {
                    en: 'Noel is the French word for Christmas, from Latin natalis, of birth, through the Church phrase for the nativity. It began as a name given to children born at that season, which is why it has a date rather than a saint behind it.',
                    sk: 'Noel je francúzske slovo pre Vianoce z latinského natalis, zrodový, cez cirkevné pomenovanie narodenia Pána. Vzniklo ako meno dávané deťom narodeným v tomto období, a preto za ním stojí dátum, nie svätec.',
                },
                provenance: ['classical-onomastics', 'onomastic-consensus'],
            },
        ],
        meaning: {
            literal: { en: 'birth day', sk: 'deň narodenia' },
            traditional: { en: 'Christmas', sk: 'Vianoce' },
        },
        history: {
            en: 'The name is medieval in France and England, where it was given to Christmas children, and it later became common in Ireland. Its place in the Slovak calendar is a modern international borrowing.',
            sk: 'Meno je vo Francúzsku a Anglicku stredoveké a dávalo sa deťom narodeným na Vianoce, neskôr sa rozšírilo v Írsku. Miesto v slovenskom kalendári má ako moderná medzinárodná výpožička.',
        },
        culturalSpread: [
            { id: 'noel-france', region: { en: 'France', sk: 'Francúzsko' }, forms: ['Noël', 'Noëlle'] },
            { id: 'noel-anglophone', region: { en: 'Ireland, United Kingdom', sk: 'Írsko, Spojené kráľovstvo' }, forms: ['Noel'] },
            { id: 'noel-central-europe', region: { en: 'Slovakia, Czechia', sk: 'Slovensko, Česko' }, forms: ['Noel'] },
        ],
        variants: [
            { form: 'Noël', kind: 'language-form', language: 'french', resolvesToCanonical: true },
            { form: 'Natale', kind: 'language-form', language: 'italian', resolvesToCanonical: true },
        ],
        relatedNames: [
            { canonicalKey: 'natalia', relation: 'shares-root',
                note: { en: 'Natália comes from the same Latin natalis, by a different route.', sk: 'Natália pochádza z toho istého latinského natalis, ale inou cestou.' } },
        ],
        confidence: 'well-attested',
        notes: [
            {
                id: 'noel-not-hebrew',
                kind: 'folk-etymology',
                text: {
                    en: 'Noel is sometimes read as a Hebrew name containing El, God, on the model of Daniel and Gabriel. It is not: the -el is the ordinary end of a French word and has nothing to do with the Hebrew element.',
                    sk: 'Meno Noel sa niekedy vykladá ako hebrejské meno s prvkom El, Boh, podľa vzoru mien Daniel a Gabriel. Nie je: koncové -el je bežné zakončenie francúzskeho slova a s hebrejským prvkom nesúvisí.',
                },
            },
        ],
        provenance: ['classical-onomastics', 'onomastic-consensus', 'sk-web-calendars'],
    },
    {
        canonicalKey: 'natan',
        canonicalName: 'Nátan',
        gender: 'masculine',
        origins: [
            {
                id: 'natan-hebrew-natan',
                sourceLanguage: 'hebrew',
                culture: { en: 'Hebrew, biblical', sk: 'Hebrejská, biblická' },
                derivation: [
                    { form: 'natan', language: 'hebrew', gloss: { en: 'he gave', sk: 'dal' } },
                    { form: 'Natan', language: 'hebrew', gloss: { en: 'the name of the prophet who confronted David', sk: 'meno proroka, ktorý sa postavil Dávidovi' } },
                    { form: 'Nathan', language: 'ancient-greek', gloss: { en: 'the Septuagint form', sk: 'podoba v Septuaginte' } },
                ],
                gloss: { en: 'he gave', sk: 'dal' },
                confidence: 'well-attested',
                epistemicClass: 'etymological-fact',
                summary: {
                    en: 'Nátan is the Hebrew verb form natan, he gave, and functions as a short form of the longer names that name the giver, such as Nathaniel, God has given, and Jonathan, Yahweh has given. Its meaning is a complete clause without a stated subject.',
                    sk: 'Nátan je hebrejský slovesný tvar natan, dal, a funguje ako skrátená podoba dlhších mien, ktoré darcu pomenúvajú, ako Natanael, Boh dal, a Jonatán, Jahve dal. Jeho význam je celá veta bez vyjadreného podmetu.',
                },
                provenance: ['biblical-onomastics', 'onomastic-consensus'],
            },
        ],
        meaning: { literal: { en: 'he gave', sk: 'dal' }, traditional: { en: 'gift', sk: 'dar' } },
        history: {
            en: 'Nathan the prophet is one of the sharpest figures of the books of Samuel. The name was taken up by Protestants after the Reformation, became common in English in the twentieth century, and reached the Slovak calendar in the recent return to Old Testament names.',
            sk: 'Prorok Nátan je jednou z najostrejších postáv Samuelových kníh. Meno po reformácii prevzali protestanti, v 20. storočí sa rozšírilo v angličtine a do slovenského kalendára sa dostalo v nedávnom návrate k starozákonným menám.',
        },
        culturalSpread: [
            { id: 'natan-hebrew', region: { en: 'Israel', sk: 'Izrael' }, forms: ['נתן', 'Natan'] },
            { id: 'natan-anglophone', region: { en: 'United States, United Kingdom', sk: 'Spojené štáty, Spojené kráľovstvo' }, forms: ['Nathan'] },
            { id: 'natan-central-europe', region: { en: 'Slovakia, Poland', sk: 'Slovensko, Poľsko' }, forms: ['Nátan', 'Natan'] },
        ],
        variants: [
            { form: 'Nathan', kind: 'language-form', language: 'english', resolvesToCanonical: true },
            { form: 'Natan', kind: 'spelling', resolvesToCanonical: true },
        ],
        relatedNames: [],
        confidence: 'well-attested',
        notes: [
            {
                id: 'natan-subjectless-clause',
                kind: 'linguistic',
                text: {
                    en: 'Rendering Nátan as gift is a convenience. The Hebrew is a verb, he gave, and the longer names supply the subject that this one leaves out.',
                    sk: 'Preklad mena Nátan ako dar je zjednodušenie. Hebrejský tvar je sloveso, dal, a podmet, ktorý toto meno vynecháva, dopĺňajú dlhšie mená.',
                },
            },
        ],
        provenance: ['biblical-onomastics', 'onomastic-consensus', 'sk-web-calendars'],
    },
];
