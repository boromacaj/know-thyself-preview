/**
 * THE ENCYCLOPEDIA IN SLOVAK.
 *
 * Keyed by the same concept keys as the English entries and merged over them at
 * lookup time, so a key that is missing here renders the English entry rather
 * than nothing. The English file is untouched: it stays the canonical source of
 * which concepts exist and of the structure of each one.
 *
 * WHAT IS DELIBERATELY NOT TRANSLATED
 * Canonical names stay canonical, because translating a technical term is how a
 * reading stops being checkable against any other source a reader might find:
 *
 *   Day Master, BaZi, Wu Xing, Li Chun, Human Design, I Ching
 *   stem and branch names, gate and channel numbers
 *   zodiac sign names, which arrive from the engine in English and would
 *   otherwise disagree with the values printed beside them
 *
 * Where a term has a settled Slovak form that a reader would actually expect -
 * nebeské kmene, pozemské vetvy, päť elementov - that form is used.
 */
import { humanDesignCenterEntriesSk } from './humanDesignCenters.js?v=53c0693';
const SYMBOLIC_BOUNDARY_SK = 'Toto je symbolický systém. Pojmy ako tento opisujú spôsob, akým si daná '
    + 'tradícia usporadúva význam - nie nameranú vlastnosť človeka.';
const SCIENCE_BOUNDARY_SK = 'Vedecké pojmy sú tu uvedené len preto, že môžu pomôcť vysvetliť bežnú '
    + 'skúsenosť, na ktorú metafora ukazuje. Nepotvrdzujú tento systém a žiadna '
    + 'symbolická tradícia nimi nie je overená.';
export const CONCEPTS_SK = {
    ...humanDesignCenterEntriesSk(),
    /* ---------------------------------------------------------- numerológia */
    'life-path': {
        title: 'Životná cesta',
        eyebrow: 'Numerológia',
        body: [
            'Životná cesta je číslo, ku ktorému sa dospeje redukciou celého '
                + 'dátumu narodenia - dňa, mesiaca a roka - na jednu číslicu, pričom 11, 22 '
                + 'a 33 sa tradične ponechávajú neredukované ako majstrovské čísla.',
            'Je to číslo, ktoré numerológia považuje za ústredné. Vykladá sa ako celkový '
                + 'tvar smerovania života, nie ako opis povahy - na to slúžia čísla vyjadrenia '
                + 'a túžby duše.',
            'Keďže vychádza len z dátumu, je to jediné číslo, ktoré nepotrebuje meno ani '
                + 'čas narodenia.',
        ],
        boundary: SYMBOLIC_BOUNDARY_SK,
    },
    expression: {
        title: 'Číslo vyjadrenia',
        eyebrow: 'Numerológia',
        body: [
            'Nazýva sa aj číslo osudu. Každé písmeno celého rodného mena sa prevedie na '
                + 'číslicu a súčet sa zredukuje.',
            'Tradícia ho číta ako vonkajšie schopnosti, s ktorými človek pracuje - ako '
                + 'koná a čo buduje - na rozdiel od vnútornej pohnútky, ktorú opisuje túžba duše.',
            'Používa meno v podobe pri narodení, takže sa nemení, keď sa meno neskôr zmení.',
        ],
        boundary: SYMBOLIC_BOUNDARY_SK,
    },
    'soul-urge': {
        title: 'Túžba duše',
        eyebrow: 'Numerológia',
        body: [
            'Počíta sa len zo samohlások rodného mena.',
            'Číta sa ako vnútorná motivácia - to, k čomu človek tiahne, keď sa pre nikoho '
                + 'nič nehrá. Tvorí dvojicu s číslom osobnosti, ktoré vychádza zo spoluhlások '
                + 'a číta sa ako vonkajší dojem.',
        ],
        boundary: SYMBOLIC_BOUNDARY_SK,
    },
    'personality-number': {
        title: 'Číslo osobnosti',
        eyebrow: 'Numerológia',
        body: [
            'Počíta sa zo spoluhlások rodného mena.',
            'Číta sa ako dojem, ktorý si druhí utvoria ako prvý - vonkajší okraj mena, '
                + 'nie jeho vnútorné samohláskové jadro.',
        ],
        boundary: SYMBOLIC_BOUNDARY_SK,
    },
    pinnacle: {
        title: 'Vrchol',
        eyebrow: 'Numerológia',
        body: [
            'Jedno zo štyroch životných období, každé s vlastným číslom odvodeným z dátumu '
                + 'narodenia. Prvé trvá od narodenia do veku 36 mínus jednociferná hodnota '
                + 'životnej cesty (majstrovská životná cesta sa počíta ako svoja číslica: 11 '
                + 'ako 2, 22 ako 4, 33 ako 6), dve stredné trvajú po deväť rokov, štvrté je '
                + 'otvorené.',
            'Vrchol sa číta ako téma kapitoly, nie celého života. To, ktorý je práve '
                + 'aktuálny, je teda funkciou veku.',
        ],
        boundary: SYMBOLIC_BOUNDARY_SK,
    },
    challenge: {
        title: 'Číslo výzvy',
        eyebrow: 'Numerológia',
        body: [
            'Odvodzuje sa odčítaním medzi časťami dátumu narodenia a tvorí dvojicu '
                + 's vrcholom, ktorý pokrýva rovnaké obdobie.',
            'Kým vrchol pomenúva, čo kapitola ponúka, výzva pomenúva trenie, ktoré '
                + 'tradícia očakáva popri ňom. Čítajú sa spolu; čítať jedno bez druhého sa '
                + 'považuje za neúplné.',
        ],
        boundary: SYMBOLIC_BOUNDARY_SK,
    },
    'personal-year': {
        title: 'Osobný rok',
        eyebrow: 'Numerológia',
        body: [
            'Cyklické číslo spájajúce deň a mesiac narodenia s aktuálnym kalendárnym '
                + 'rokom; beží od 1 po 9 a opakuje sa.',
            'Ide o načasovanie, nie o povahu: opisuje rok, nie človeka, a mení sa každý '
                + 'rok, zatiaľ čo natálne čísla nikdy.',
        ],
        boundary: SYMBOLIC_BOUNDARY_SK,
    },
    /* -------------------------------------------------------- astrológia */
    'big-three': {
        title: 'Veľká trojka',
        eyebrow: 'Západná astrológia',
        body: [
            'Slnko, Mesiac a ascendent, čítané spolu, nie oddelene.',
            'Konvencia považuje Slnko za ústredný pohon, Mesiac za vnútorný a emocionálny '
                + 'register a ascendent za spôsob, akým človek vychádza svetu v ústrety. Ich '
                + 'kombinácia sa považuje za výpovednejšiu než ktorákoľvek z nich samostatne, '
                + 'pretože každá tie ostatné upresňuje.',
            'Bez času narodenia je spoľahlivé len Slnko. Ascendent prejde celým zverokruhom '
                + 'za jeden deň a Mesiac mení znamenie každé dva až tri dni.',
        ],
        boundary: SYMBOLIC_BOUNDARY_SK,
    },
    ascendant: {
        title: 'Ascendent',
        eyebrow: 'Západná astrológia',
        body: [
            'Stupeň zverokruhu vychádzajúci na východnom obzore v okamihu a na mieste '
                + 'narodenia. Začína prvý dom a určuje celú sústavu domov.',
            'Keďže sa Zem otočí raz za deň, posúva sa približne o jeden stupeň každé štyri '
                + 'minúty - preto je to postavenie najcitlivejšie na nepresný čas narodenia '
                + 'a preto sa pri odhadovanom čase neuvádza.',
        ],
        boundary: SYMBOLIC_BOUNDARY_SK,
    },
    'chart-ruler': {
        title: 'Vládca horoskopu',
        eyebrow: 'Západná astrológia',
        body: [
            'Planéta, ktorá tradične vládne znameniu na ascendente. Tam, kde táto planéta '
                + 'stojí, sa potom číta ako miesto s osobitnou váhou pre celý horoskop.',
            'Závisí úplne od ascendentu, takže preberá aj jeho citlivosť na čas narodenia.',
        ],
        boundary: SYMBOLIC_BOUNDARY_SK,
    },
    stellium: {
        title: 'Stelium',
        eyebrow: 'Západná astrológia',
        body: [
            'Tri alebo viac planét zhromaždených v jednom znamení alebo jednom dome.',
            'Číta sa ako sústredenie: neúmerne veľká časť pozornosti horoskopu mieri do '
                + 'jedinej oblasti. Školy sa líšia v tom, koľko telies sa vyžaduje a či sa '
                + 'počítajú vonkajšie planéty.',
        ],
        boundary: SYMBOLIC_BOUNDARY_SK,
    },
    element: {
        title: 'Element',
        eyebrow: 'Západná astrológia',
        body: [
            'Oheň, Zem, Vzduch a Voda. Každé znamenie patrí k jednému a spočítanie '
                + 'elementov naprieč horoskopom udáva jeho celkovú teplotu.',
            'Za významný sa považuje aj prevažujúci element, aj celkom chýbajúci. Počet je '
                + 'zhrnutím postavení, nie ďalším nezávislým údajom.',
        ],
        boundary: SYMBOLIC_BOUNDARY_SK,
    },
    modality: {
        title: 'Modalita',
        eyebrow: 'Západná astrológia',
        body: [
            'Kardinálna, fixná a premenlivá - druhý spôsob zoskupenia znamení, ktorý '
                + 'pretína elementy.',
            'Tradícia číta kardinálnu ako začínajúcu, fixnú ako udržiavajúcu a premenlivú '
                + 'ako prispôsobivú. Rovnako ako počet elementov zhŕňa už prítomné postavenia, '
                + 'nepridáva novú informáciu.',
        ],
        boundary: SYMBOLIC_BOUNDARY_SK,
    },
    house: {
        title: 'Dom',
        eyebrow: 'Západná astrológia',
        body: [
            'Dvanásť častí horoskopu, každá spojená s oblasťou života. Tento horoskop '
                + 'používa systém Whole Sign, kde každý dom je presne jedno znamenie.',
            'Domy sú ukotvené v ascendente, takže existujú len vtedy, keď je známy čas '
                + 'narodenia.',
        ],
        boundary: SYMBOLIC_BOUNDARY_SK,
    },
    aspect: {
        title: 'Aspekt',
        eyebrow: 'Západná astrológia',
        body: [
            'Uhlový vzťah medzi dvoma telesami. Päť hlavných aspektov je konjunkcia (0°), '
                + 'sextil (60°), kvadratúra (90°), trigón (120°) a opozícia (180°).',
            'Dovolená odchýlka od presnosti sa nazýva orbis; tesnejší orbis sa číta ako '
                + 'silnejší aspekt. Trigóny a sextily sa konvenčne čítajú ako ľahkosť, '
                + 'kvadratúry a opozície ako trenie - hoci mnohí astrológovia považujú toto '
                + 'delenie za priveľmi hrubé.',
        ],
        boundary: SYMBOLIC_BOUNDARY_SK,
    },
    /* ------------------------------------------------------------ bazi/tcm */
    'chinese-zodiac': {
        title: 'Čínske znamenie',
        eyebrow: 'BaZi',
        body: [
            'Zviera pozemskej vetvy v pilieri roka spojené s elementom nebeského kmeňa '
                + 'toho roka - Ohnivý Zajac, Kovový Byvol a podobne. Dvanásť zvierat a päť '
                + 'elementov dáva šesťdesiatročný cyklus.',
            'Je to najznámejšia časť systému a obvyklá cesta dnu, ale v rámci BaZi je to '
                + 'len jeden zo štyroch pilierov. Úplná mapa sa číta smerom von od Day '
                + 'Mastera a zviera roka je bližšie k zdedenému pozadiu než k jadru výkladu.',
            'Rok sa začína sviatkom Li Chun, slnečným termínom začiatkom februára - nie '
                + 'lunárnym novým rokom a nie 1. januára.',
        ],
        boundary: SYMBOLIC_BOUNDARY_SK,
    },
    'four-pillars': {
        title: 'Štyri piliere',
        eyebrow: 'BaZi',
        body: [
            'Rok, mesiac, deň a hodina. Každý pilier spája jeden nebeský kmeň s jednou '
                + 'pozemskou vetvou, čo dáva osem znakov, podľa ktorých sa systém volá '
                + '(ba zi - „osem znakov“).',
            'Konvencia priraďuje každej pozícii oblasť: rok dedičstvu a ranému prostrediu, '
                + 'mesiac výchove a pracovnému životu, deň sebe samému a blízkemu partnerstvu, '
                + 'hodina neskoršiemu životu a tomu, čo človek vytvára.',
            'Pilier hodiny potrebuje presný čas narodenia. Bez neho sa vynecháva, '
                + 'nedopĺňa sa odhadom, a mapa sa číta z troch pilierov.',
        ],
        boundary: SYMBOLIC_BOUNDARY_SK,
    },
    'day-master': {
        title: 'Day Master',
        eyebrow: 'BaZi',
        body: [
            'Nebeský kmeň piliera dňa. Je jedným z desiatich kmeňov: každý z piatich '
                + 'elementov v podobe jang a jin.',
            'Je vzťažným bodom celej mapy. Každý ďalší znak sa číta vo vzťahu k nemu '
                + '- či ho podporuje, vyčerpáva, ovláda alebo je ním ovládaný - a práve to '
                + 'opisuje Desať bohov.',
            'Preto BaZi nie je „tvoje čínske znamenie“. Zviera roka je jedným z ôsmich '
                + 'znakov; Day Master je ten, voči ktorému sa ostatných sedem meria.',
        ],
        boundary: SYMBOLIC_BOUNDARY_SK,
    },
    'five-elements': {
        title: 'Päť elementov',
        eyebrow: 'BaZi',
        body: [
            'Drevo, Oheň, Zem, Kov a Voda - Wu Xing. Čítajú sa ako fázy cyklu, nie ako '
                + 'látky.',
            'Systém poháňajú dva vzťahy: plodenie, kde každá fáza vytvára nasledujúcu '
                + '(Drevo živí Oheň, Oheň tvorí Zem, Zem rodí Kov, Kov nesie Vodu, Voda '
                + 'zavlažuje Drevo), a ovládanie, kde každá fáza krotí inú naprieč cyklom.',
            'Spočítanie prítomných fáz udáva rovnováhu mapy. Chýbajúca fáza sa '
                + 'považuje za rovnako výpovednú ako prevažujúca.',
        ],
        boundary: SYMBOLIC_BOUNDARY_SK,
    },
    'heavenly-stem': {
        title: 'Nebeský kmeň',
        eyebrow: 'BaZi',
        body: [
            'Desať znakov striedajúcich päť elementov v podobe jang a jin. Jeden stojí na '
                + 'vrchu každého piliera.',
            'Kmene sa považujú za viditeľnú, vonkajšiu vrstvu piliera - to, čo je vyjadrené '
                + '- na rozdiel od vetvy pod nimi, ktorá nesie to, čo je držané.',
        ],
        boundary: SYMBOLIC_BOUNDARY_SK,
    },
    'earthly-branch': {
        title: 'Pozemská vetva',
        eyebrow: 'BaZi',
        body: [
            'Dvanásť znakov, každý so zvieraťom a elementom, sediacich pod kmeňom v každom '
                + 'pilieri. Zodpovedajú aj mesiacom, dvojhodinovým úsekom a svetovým stranám.',
            'Vetvy sa čítajú ako ukotvená vrstva a každá v sebe skrýva jeden až tri skryté '
                + 'kmene.',
        ],
        boundary: SYMBOLIC_BOUNDARY_SK,
    },
    'hidden-stem': {
        title: 'Skryté kmene',
        eyebrow: 'BaZi',
        body: [
            'Kmene ukryté vnútri pozemskej vetvy - zvyčajne jeden hlavný a jeden či dva '
                + 'slabšie.',
            'Práve ony robia mapu BaZi hlbšou než jej osem viditeľných znakov: '
                + 'elementy chýbajúce na povrchu bývajú prítomné pod ním a rovnováha odčítaná '
                + 'len z viditeľných znakov môže byť zavádzajúca.',
        ],
        boundary: SYMBOLIC_BOUNDARY_SK,
    },
    'ten-gods': {
        title: 'Desať bohov',
        eyebrow: 'BaZi',
        body: [
            'Desať možných vzťahov medzi iným kmeňom a Day Masterom, zoskupených do piatich '
                + 'kategórií: druh, výstup, bohatstvo, autorita a zdroj.',
            'Kategória vyplýva mechanicky z dvoch elementov a z toho, či sa ich polarity '
                + 'zhodujú. Konvencia číta výstup ako vyjadrenie a tvorivosť, bohatstvo ako '
                + 'zdroje a správu, autoritu ako štruktúru a záväzok, zdroj ako podporu '
                + 'a učenie, druha ako rovesníkov a sebestačnosť.',
        ],
        boundary: SYMBOLIC_BOUNDARY_SK,
    },
    'luck-pillars': {
        title: 'Piliere šťastia',
        eyebrow: 'BaZi',
        body: [
            'Postupnosť desaťročných období, každé s vlastným kmeňom a vetvou, ktoré kráčajú '
                + 'dopredu alebo dozadu od piliera mesiaca podľa polarity roka a pohlavia pri '
                + 'narodení.',
            'Čítajú sa ako meniace sa pozadie, ktorým natálna mapa prechádza a ktoré '
                + 'dočasne posilňuje alebo oslabuje jednotlivé elementy. Ide o načasovanie, nie '
                + 'o povahu.',
        ],
        boundary: SYMBOLIC_BOUNDARY_SK,
    },
    'tcm-correspondence': {
        title: 'Priradenie TCM',
        eyebrow: 'BaZi',
        body: [
            'Tradičná čínska medicína mapuje tých istých päť fáz na orgánové sústavy, '
                + 'ročné obdobia, chute, farby a emócie - Drevo na jar, Vodu na zimu a tak ďalej.',
            'V tejto aplikácii je toto priradenie uvedené výlučne ako kultúrny a symbolický '
                + 'materiál. Je tu preto, že je súčasťou myslenia tradície, nie ako informácia '
                + 'o tele.',
        ],
        boundary: 'Toto je kultúrny a symbolický obsah. Nie je to zdravotná informácia, '
            + 'nie je to diagnóza a nie je to zdravotná rada akéhokoľvek druhu.',
    },
    /* -------------------------------------------------------- human design */
    'hd-type': {
        title: 'Typ',
        eyebrow: 'Human Design',
        body: [
            'Jeden z piatich: Manifestor, Generator, Manifesting Generator, Projector, '
                + 'Reflector. Vyplýva mechanicky z toho, ktoré centrá sú definované - najmä či '
                + 'je definované sakrálne centrum a či motorické centrum spája hrdlo.',
            'Typ je najvyššia kategória systému a určuje stratégiu. Nie je to nálepka na '
                + 'povahu; v rámci systému opisuje, ako je človek údajne stavaný na to, aby sa '
                + 'do vecí púšťal.',
        ],
        boundary: SYMBOLIC_BOUNDARY_SK,
    },
    'hd-strategy': {
        title: 'Stratégia',
        eyebrow: 'Human Design',
        body: [
            'Spôsob, akým sa každému typu odporúča vstupovať do vecí: Generatori '
                + 'a Manifesting Generatori reagujú, Manifestori informujú pred konaním, '
                + 'Projektori čakajú na uznanie a pozvanie, Reflektori čakajú celý lunárny cyklus.',
            'Stratégia nie je samostatný údaj oddelený od typu - vyplýva priamo z neho, '
                + 'a preto sa tie dve nikdy nerozchádzajú.',
        ],
        boundary: SYMBOLIC_BOUNDARY_SK,
    },
    'hd-authority': {
        title: 'Autorita',
        eyebrow: 'Human Design',
        body: [
            'Miesto, z ktorého sa podľa systému najlepšie rozhoduje; určuje ho to, ktoré '
                + 'centrá sú definované, v pevnom poradí prednosti: emocionálna, potom '
                + 'sakrálna, potom slezinná, potom egové a sebaprojektované podoby, potom '
                + 'mentálna či prostredím daná, napokon lunárna.',
            'Spoločné je, že autorita je umiestnená do telesného alebo časového signálu, '
                + 'nie do uvažovania. Uvažovanie má svoju úlohu - vyriešiť logistiku '
                + 'a dôsledky - ale nie tú rozhodujúcu.',
        ],
        boundary: SYMBOLIC_BOUNDARY_SK,
    },
    'hd-profile': {
        title: 'Profil',
        eyebrow: 'Human Design',
        body: [
            'Dve čísla od 1 do 6, prevzaté z línií osobnostného Slnka a dizajnového Slnka '
                + '- napríklad 5/1.',
            'Šesť línií nesie ustálené charaktery: 1 bádateľ, 2 pustovník, 3 mučeník, '
                + '4 oportunista, 5 heretik, 6 vzor. Prvé číslo sa číta ako vedomé, druhé ako '
                + 'nevedomé.',
        ],
        boundary: SYMBOLIC_BOUNDARY_SK,
    },
    'hd-definition': {
        title: 'Definícia',
        eyebrow: 'Human Design',
        body: [
            'Ako sú definované centrá pospájané. Jednoduchá definícia znamená, že všetky '
                + 'definované centrá tvoria jednu skupinu; rozdelená definícia dve samostatné '
                + 'skupiny, trojitá tri a tak ďalej.',
            'Rozdelenia sa čítajú ako miesta, kde vlastné zapojenie človeka nespája samo '
                + 'seba a kde medzeru premosťujú iní ľudia alebo okolnosti.',
        ],
        boundary: SYMBOLIC_BOUNDARY_SK,
    },
    'hd-defined-centre': {
        title: 'Definované centrum',
        eyebrow: 'Human Design',
        body: [
            'Centrum, do ktorého vedie aspoň jeden úplný kanál. Centier je deväť; '
                + 'definovaný môže byť ľubovoľný ich počet.',
            'Definované centrá sa čítajú ako stále - pevný spôsob, akým funguje energia '
                + 'alebo vnímanie, ktorý nezávisí od toho, kto je nablízku.',
        ],
        boundary: SYMBOLIC_BOUNDARY_SK,
    },
    'hd-open-centre': {
        title: 'Otvorené centrum',
        eyebrow: 'Human Design',
        body: [
            'Centrum, do ktorého nevedie žiadny úplný kanál; v grafe je biele.',
            'Otvorené centrá sa čítajú ako premenlivé, nie ako chýbajúce - tradícia tvrdí, '
                + 'že prijímajú a zosilňujú to, čo je okolo. Učitelia sa v čítaní otvorenosti '
                + 'líšia podstatne viac než pri definovaných centrách.',
        ],
        boundary: SYMBOLIC_BOUNDARY_SK,
    },
    'hd-channel': {
        title: 'Kanál',
        eyebrow: 'Human Design',
        body: [
            'Spojnica dvoch centier, zložená z dvoch brán - po jednej na každom konci. '
                + 'Kanál je úplný len vtedy, keď sú aktivované obe brány, a jeho dokončenie '
                + 'definuje obe centrá, ktorých sa dotýka.',
            'Kanály sú tým, čo graf skutočne stavia: typ, definícia aj autorita vyplývajú '
                + 'z toho, ktoré kanály sú úplné.',
        ],
        boundary: SYMBOLIC_BOUNDARY_SK,
    },
    'hd-gate': {
        title: 'Brána',
        eyebrow: 'Human Design',
        body: [
            'Jedna zo 64 pozícií v grafe, priradená k 64 hexagramom I Ching. Bránu '
                + 'aktivuje planéta stojaca v príslušnej časti zverokruhu.',
            'Jediná aktivovaná brána je polovicou kanála. Sama osebe sa číta ako téma, '
                + 'ktorá je prítomná, ale nie je prepojená; žiadne centrum sama nedefinuje.',
        ],
        boundary: SYMBOLIC_BOUNDARY_SK,
    },
    'hd-variables': {
        title: 'Premenné',
        eyebrow: 'Human Design',
        body: [
            'Štyri šípky zobrazené hore a dole na grafe, odvodené z farby a tónu Slnka '
                + 'a uzlov na oboch stranách: odhodlanie, prostredie, motivácia a perspektíva.',
            'Ide o pokročilý materiál systému, závislý od veľmi jemných polohových detailov, '
                + 'a teda od veľmi presného času narodenia. Zvyčajne sa uvádza až potom, čo sú '
                + 'pochopené typ, autorita a centrá.',
        ],
        boundary: SYMBOLIC_BOUNDARY_SK,
    },
    /* ------------------------------------------------------ krížové piliere */
    convergence: {
        title: 'Zbiehanie',
        eyebrow: 'Krížový výklad',
        body: [
            'Keď viaceré zo štyroch tradícií nezávisle vyjadria podobnú tému o tých istých '
                + 'údajoch narodenia.',
            'Systémy pracujú s odlišnými vstupmi a vytvorili ich nepríbuzné kultúry, takže '
                + 'zhoda medzi nimi je v tejto aplikácii pozoruhodná. Znamená to, že štyri '
                + 'spôsoby usporadúvania významu zhodou okolností ukazujú rovnakým smerom - nie '
                + 'že sa čokoľvek zmeralo alebo potvrdilo.',
            'Podpora sa uvádza ako silná, stredná alebo slabá a podľa počtu samostatných '
                + 'tradícií, ktoré k nej prispievajú. Nič sa nenazýva silným na základe jedinej '
                + 'tradície.',
        ],
        boundary: 'Zhoda medzi symbolickými systémami je zbiehanie výkladov. Nie je to '
            + 'dôkaz, že daná vlastnosť existuje, a nejde o nezávislé empirické merania.',
    },
    'counter-evidence': {
        title: 'Protidôkaz',
        eyebrow: 'Krížový výklad',
        body: [
            'Materiál z tej istej mapy, ktorý ukazuje opačným smerom než daná téma.',
            'Zostáva pripojený k téme, proti ktorej hovorí, a neskrýva sa - aby sa vzorec '
                + 'nikdy nepodával ako uzavretý, keď proti nemu hovorí aj vlastná mapa '
                + 'čitateľa.',
        ],
        boundary: SYMBOLIC_BOUNDARY_SK,
    },
    'true-tension': {
        title: 'Skutočné napätie',
        eyebrow: 'Krížový výklad',
        body: [
            'Oba konce jednej protikladnej dvojice nesú skutočnú a porovnateľnú váhu, každý '
                + 'je podporený viac než jednou tradíciou, a ide o dvojicu, kde je držať oboje '
                + 'naraz naozaj nepohodlné.',
            'Je to zámerne zriedkavé. Väčšina protikladov je bežná, nie konfliktná, '
                + 'a označiť každý z nich za rozpor by viedlo k horoskopovej fráze, že každý '
                + 'človek je plný protikladov.',
        ],
        boundary: SYMBOLIC_BOUNDARY_SK,
    },
    'contextual-duality': {
        title: 'Kontextová dvojakosť',
        eyebrow: 'Krížový výklad',
        body: [
            'Oba konce protikladu sú prítomné, ale buď jeden zreteľne vedie, alebo ide '
                + 'o dvojicu, kde je držať oboje nepozoruhodné.',
            'Byť v niektorých situáciách analytický a v iných intuitívny nie je vnútorný '
                + 'konflikt; je to bežné. Táto kategória existuje preto, aby sa bežná zložitosť '
                + 'nedramatizovala na paradox.',
        ],
        boundary: SYMBOLIC_BOUNDARY_SK,
    },
    /* ------------------------------------------------------- telo a myseľ */
    interoception: {
        title: 'Interocepcia',
        eyebrow: 'Telo a myseľ',
        body: [
            'Interocepcia je bežné vnímanie vnútorného stavu tela - tlkotu srdca, dychu, '
                + 'pocitov v bruchu, svalového napätia. Je to dobre opísaná súčasť toho, ako '
                + 'ľudia vnímajú sami seba, a citlivosť na ňu sa medzi ľuďmi značne líši.',
            'Viaceré tradície žiadajú čitateľa, aby si pred uvažovaním o rozhodnutí všimol '
                + 'telesnú odozvu. Nech si o tradícii myslíme čokoľvek, ten pokyn žiada '
                + 'interoceptívnu pozornosť - a to je skutočná a trénovateľná vec.',
        ],
        boundary: SCIENCE_BOUNDARY_SK,
    },
    'bodily-signal': {
        title: 'Telesné signály pri rozhodovaní',
        eyebrow: 'Telo a myseľ',
        body: [
            'Ľudia si často všimnú telesnú reakciu na možnosť - nadvihnutie, stiahnutie, '
                + 'plochosť - skôr, než vedia povedať prečo. Psychológia to skúmala pod '
                + 'viacerými názvami a panuje skutočná nezhoda v tom, nakoľko sa dá takým '
                + 'signálom dôverovať a kedy zavádzajú.',
            'Nesporné je, že tá reakcia nastáva a dá sa zaregistrovať. Postupy, ktoré žiadajú '
                + 'oddeliť prvú telesnú odozvu od vysvetlenia, ktoré si človek dodatočne postaví, '
                + 'pracujú práve s touto bežnou skúsenosťou.',
        ],
        boundary: SCIENCE_BOUNDARY_SK,
    },
    'autonomic-arousal': {
        title: 'Aktivácia autonómneho systému',
        eyebrow: 'Telo a myseľ',
        body: [
            'Autonómny nervový systém prepína telo medzi stavmi aktivácie a upokojenia - '
                + 'mení tep, dýchanie a svalové napätie - do veľkej miery mimo vôľovej kontroly.',
            'Opisy emocionálneho stavu, ktorý sa počas hodín dvíha a klesá, a čakania, kým '
                + 'sa usadí, než sa človek rozhodne, opisujú niečo, čo ľudia naozaj zažívajú. '
                + 'To, že je ten vzorec skutočný, je však iná otázka než výklad ktoréhokoľvek '
                + 'symbolického systému o tom, prečo sa deje.',
        ],
        boundary: SCIENCE_BOUNDARY_SK,
    },
    'cognitive-rationalisation': {
        title: 'Racionalizácia',
        eyebrow: 'Telo a myseľ',
        body: [
            'Racionalizácia je dobre zdokumentovaný sklon vytvárať dôvody pre rozhodnutie '
                + 'až potom, čo už v podstate padlo, a prežívať tie dôvody tak, akoby ho boli '
                + 'spôsobili.',
            'Preto viaceré tradície trvajú na oddelení prvej odozvy od zdôvodnenia, ktoré '
                + 'nasleduje. To rozlíšenie stojí za to samo osebe, nech si o systéme, ktorý ho '
                + 'odporúča, myslíme čokoľvek.',
        ],
        boundary: SCIENCE_BOUNDARY_SK,
    },
    /* ------------------------------------------------------ vrstva o mene -- */
    'name-origin': {
        title: 'Pôvod mena',
        eyebrow: 'Krstné mená',
        body: [
            'Pôvod krstného mena je jazyk a kultúra, z ktorých slovo pochádza ešte '
                + 'predtým, než sa stalo menom. Väčšina európskych krstných mien vznikla z '
                + 'bežných slov alebo z ich zloženín v hebrejčine, gréčtine, latinčine, v '
                + 'slovanskom alebo germánskom jazyku.',
            'Pôvod nie je to isté ako rozšírenosť alebo národnosť. Meno môže byť '
                + 'hebrejské pôvodom, latinské v podobe, ktorá sa dostala do Európy, a '
                + 'celkom slovenské v podobe, ktorá sa používa dnes - všetko naraz a bez '
                + 'rozporu.',
        ],
        boundary: 'Odkiaľ meno pochádza, je fakt o slove. Nehovorí nič o povahe, '
            + 'schopnostiach ani osude toho, kto ho nosí.',
    },
    'name-etymology': {
        title: 'Etymológia',
        eyebrow: 'Krstné mená',
        body: [
            'Etymológia sleduje reťaz podôb, ktorými slovo prešlo, pričom každá vychádza '
                + 'z predchádzajúcej. Podoba označená hviezdičkou je rekonštruovaná: '
                + 'jazykovedci ju odvodzujú z neskorších dokladov, ale nikto ju nikdy '
                + 'nezapísal.',
            'Etymológie majú rôznu mieru istoty. Niektoré sú písomne doložené naprieč '
                + 'storočiami, iné sú najlepšou dostupnou rekonštrukciou a niekoľko z nich je '
                + 'naozaj sporných, s konkurenčnými návrhmi, medzi ktorými bádanie '
                + 'nerozhodlo. Pri každom zázname uvádzame, o ktorý prípad ide.',
        ],
        boundary: 'Pôvodný význam je to, čo znamenalo zdrojové slovo - nie to, čo meno '
            + 'znamená dnes, a už vôbec nie opis toho, kto ho nosí.',
    },
    'name-variant': {
        title: 'Varianty a príbuzné mená',
        eyebrow: 'Krstné mená',
        body: [
            'Variant je to isté meno v inej podobe: pravopisná obmena, podoba, na ktorej '
                + 'sa ustálil daný jazyk, prepis z iného písma alebo skrátená a domácka '
                + 'podoba.',
            'Príbuzné meno je iné meno so spoločným predkom. Peter a Petra sú príbuzné; '
                + 'nie sú to však to isté meno a táto aplikácia ich prepája, nezlučuje.',
            'Rozlíšenie je dôležité pri vyhľadávaní. Pravopisný variant možno bezpečne '
                + 'považovať za ten istý záznam; skrátená podoba často nie, pretože tá istá '
                + 'domácka podoba môže patriť viacerým nepríbuzným menám.',
        ],
    },
    'name-day': {
        title: 'Meniny',
        eyebrow: 'Krstné mená',
        body: [
            'Vo veľkej časti strednej a východnej Európy je ku každému dňu v roku '
                + 'priradené jedno alebo viac krstných mien a ľuďom sa blahoželá k meninám '
                + 'podobne ako k narodeninám. Zvyk vyrástol z cirkevných kalendárov svätých a '
                + 'neskôr sa z neho stal občiansky kalendár tlačený v bežných diároch.',
            'Meniny patria KRAJINE, nie menu. To isté meno sa oslavuje v iný deň na '
                + 'Slovensku, v Česku, v Poľsku a v Maďarsku, pretože každá krajina má vlastný '
                + 'kalendár. Univerzálny dátum neexistuje a jedno meno môže mať aj v rámci '
                + 'jednej krajiny viac uznávaných dátumov.',
            'Niektoré krajiny tradíciu menín nemajú vôbec a otázka tam jednoducho '
                + 'nevzniká.',
        ],
        boundary: 'Dátum menín je kalendárna konvencia. Nie je to astrologická pozícia '
            + 'a v tejto aplikácii nenesie žiadny vypočítaný význam.',
    },
    'name-folk-etymology': {
        title: 'Ľudová etymológia',
        eyebrow: 'Krstné mená',
        body: [
            'Ľudová etymológia je rozšírený výklad pôvodu mena, ktorý jazykovedné doklady '
                + 'nepodporujú. Šíri sa ľahko, pretože je zapamätateľná a menu zvyčajne '
                + 'lichotí.',
            'Ak je rozšírený výklad natoľko bežný, že sa s ním čitateľ pravdepodobne '
                + 'stretol, táto aplikácia ho uvedie a označí ako nepodložený, namiesto toho '
                + 'aby ho obišla. Mlčanie by ponechalo v platnosti to, čomu už niekto veril.',
        ],
    },
};
