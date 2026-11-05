import { hdValueSk } from '../../i18n/engineProse.js?v=53c0693';
import { CENTER_TERM, capitalise, listWords, numberWord } from './humanDesignVoice.js?v=53c0693';
/**
 * THE SLOVAK VOICE.
 *
 * English is the semantic source; this says the same claims in Slovak, in
 * tykanie, and never in a form that carries the reader's gender - no past
 * tense or conditional after a second-person „si“, and no predicative
 * adjective about the reader. Where English can lean on a neutral participle,
 * Slovak takes a present-tense or impersonal construction instead.
 *
 * WHAT STAYS ENGLISH, exactly as the rest of the Slovak app keeps it: the
 * centre names (Head, Ajna, Throat, Sacral, Spleen, Solar Plexus, Root, Ego,
 * G), the Type names, and the authority labels in the evidence lines. Those
 * are the system's proper nouns and the app already treats them that way
 * (i18n/engineProse.ts). What is translated is everything this file writes
 * itself: the description of what a centre DOES, and every sentence of the
 * reading.
 */
const CENTER_DOES = {
    head: 'tlak dávať veciam zmysel',
    ajna: 'spôsob, akým sa myslenie usadzuje do záverov',
    throat: 'prevádzanie vecí do slov a do činu',
    g: 'pocit toho, kto si a ktorým smerom smeruješ',
    ego: 'vôľa a to, čo dokážeš sľúbiť',
    solarPlexus: 'emočné počasie',
    sacral: 'energia dostupná na prácu',
    spleen: 'inštinkt, načasovanie a pocit bezpečia',
    root: 'tlak dávať veci do pohybu',
};
/**
 * Krátky názov centra, pre zoznamy - dlhý opis sa v zozname troch rozpadne.
 * Každý je podstatné meno: veta „ako premýšľaš“ sa v zozname mien nedala
 * skloňovať ani spojiť s predložkou („cez … a ako premýšľaš“).
 */
const CENTER_SHORT = {
    head: 'mentálny tlak',
    ajna: 'tvoje myslenie',
    throat: 'vyjadrovanie',
    g: 'identita',
    ego: 'vôľa',
    solarPlexus: 'emócie',
    sacral: 'pracovná energia',
    spleen: 'inštinkt',
    root: 'poháňanie',
};
/**
 * Tie isté názvy v akuzatíve - za „drží“, „cez“ a každým slovesom či
 * predložkou, ktoré ho žiadajú. Menia sa len ženské mená; ostatné majú
 * akuzatív zhodný s nominatívom.
 */
const CENTER_SHORT_ACC = {
    ...CENTER_SHORT,
    g: 'identitu',
    ego: 'vôľu',
    sacral: 'pracovnú energiu',
};
/** Otázka „je … pevné, alebo otvorené?“ pre jedno centrum - prídavné meno sa zhoduje s rodom. */
const CENTER_FIXED_OR_OPEN = {
    head: 'či je mentálny tlak pevný, alebo otvorený',
    ajna: 'či je tvoje myslenie pevné, alebo otvorené',
    throat: 'či je vyjadrovanie pevné, alebo otvorené',
    g: 'či je identita pevná, alebo otvorená',
    ego: 'či je vôľa pevná, alebo otvorená',
    solarPlexus: 'či sú emócie pevné, alebo otvorené',
    sacral: 'či je pracovná energia pevná, alebo otvorená',
    spleen: 'či je inštinkt pevný, alebo otvorený',
    root: 'či je poháňanie pevné, alebo otvorené',
};
const FUNCTION_DOES = {
    drive: 'to, čo ťa poháňa',
    awareness: 'to, ako veci vnímaš',
    expression: 'to, ako sa veci povedia',
    direction: 'tvoj zmysel pre smer',
};
const LINE_IS = {
    1: 'potrebuje pod vecou pevnú pôdu skôr, než jej uverí, a tú pôdu si ide overiť',
    2: 'má prirodzené nadanie na niečo, čo sa neučilo, a najlepšie funguje, keď ju nechajú na pokoji, kým si ju niekto nevyžiada',
    3: 'zisťuje skúšaním a objavuje, čo nefunguje – systém to berie ako metódu, nie ako zlyhanie',
    4: 'funguje cez ľudí, ktorých už pozná, takže veci prichádzajú skôr z existujúceho okruhu než od cudzích',
    5: 'priťahuje očakávania iných: ľudia prichádzajú s tým, že dostanú riešenie, a povesť býva o krok pred skutočnosťou',
    6: 'žije v etapách: najprv obdobie skúšania, potom obdobie odstupu a pozorovania, a potom život z toho, čo to prinieslo',
};
const LINE_SHORT = {
    1: 'potreba pevnej pôdy', 2: 'prirodzené nadanie', 3: 'učenie skúšaním',
    4: 'fungovanie cez známych ľudí', 5: 'očakávanie, že máš riešenie', 6: 'život v etapách',
};
const TYPE_MECHANIC = {
    'Manifesting Generator': 'Tento dizajn má vlastnú obnoviteľnú pracovnú energiu a zároveň cestu od tejto energie až k vyjadreniu. '
        + 'V praxi to znamená dve veci naraz: je tu palivo na dlhšiu prácu a je tu aj priama cesta von, takže pohyb '
        + 'môže vychádzať z teba, nielen prechádzať cez teba.',
    Generator: 'Tento dizajn má vlastnú obnoviteľnú pracovnú energiu, ale nemá priamu cestu od nej k vyjadreniu. '
        + 'Palivo na dlhšiu prácu tu je; chýba mechanizmus, ktorý by ju tlačil von za studena – preto práca sadne '
        + 'vtedy, keď na niečo odpovedá, nie keď sa ohlasuje.',
    Manifestor: 'Tento dizajn má cestu od zdroja energie k vyjadreniu, ale bez obnoviteľnej pracovnej energie pod tým. '
        + 'Práve táto kombinácia robí začínanie prirodzeným a dlhé drvenie drahým: energia prichádza v použiteľných '
        + 'nárazoch, nie ako stály prísun.',
    Projector: 'Tento dizajn nemá vlastnú obnoviteľnú pracovnú energiu. Má namiesto nej stavbu určenú na presné čítanie '
        + 'situácií a ľudí – čo je skutočná schopnosť, a iná než byť stavaný na to prepracovať celú miestnosť.',
    Reflector: 'V tomto dizajne nie je nič pevné. Každá jeho časť vzorkuje to, čo je okolo, čo z neho robí nezvyčajne presný '
        + 'nástroj na stav miesta – a zároveň to znamená, že takmer nič v ňom nevyzerá rovnako z týždňa na týždeň.',
};
const INITIATION_ASKS = {
    'after-response': 'Mechanika nehovorí, že nikdy nesmieš nič začať. Hovorí, že začatie funguje vtedy, keď je z čoho začať – '
        + 'požiadavka, prekážka, práca, ktorá už existuje – a že sa zadrháva vtedy, keď vychádza len z predstavy o tom, čo by malo byť.',
    direct: 'Mechanika hovorí, že sa môžeš pohnúť prvý a že ten pohyb dopadne úplne inak podľa toho, či o ňom ľudia, '
        + 'ktorých sa týka, vedeli vopred. Povedať im to nie je v tomto systéme zdvorilosť; je to tá časť, ktorá bráni '
        + 'odporu, ktorý nemusel vzniknúť.',
    'on-recognition': 'Mechanika hovorí, že práca ide dobre tam, kde ju naozaj chceli. Byť najprv uznaný nie je pravidlo o slušnom '
        + 'čakaní – je to rozdiel medzi vhľadom, ktorý sa použije, a tým istým vhľadom ponúknutým tam, kde oň nikto nestál.',
    'over-a-cycle': 'Mechanika hovorí, že tento dizajn nedáva odpoveď v ten istý deň, pretože to, čo číta, sa mení spolu s okolím. '
        + 'Nechať rozhodnutie ležať dlhší čas je spôsob, akým z nástroja stavaného na pohyb vznikne stabilné čítanie.',
};
const AUTHORITY_MECHANISM = {
    Sacral: {
        is: 'Systém kladie rozhodovanie do tela, nie do hlavy: ťah k veci alebo plochosť voči nej, ktorá je tu skôr, '
            + 'než stihneš poskladať dôvody. Číta sa to ako energia, ktorá sa na vec dostaví – alebo sa potichu nedostaví.',
        isNot: 'Nie je to preferencia a nie je to odpoveď, ktorá sa dá obhájiť argumentmi. Preferencie sú stále, toto nie – '
            + 'tá istá otázka môže mať iný deň inú odpoveď, a v tomto systéme to znamená, že mechanizmus funguje, nie že ide o nedôslednosť.',
    },
    Splenic: {
        is: 'Systém kladie rozhodovanie do tichého signálu v danej chvíli o tom, či je vec v poriadku – bližšie k '
            + 'všimnutiu si než k záveru. Je okamžitý a je jemný.',
        isNot: 'Nie je to pocit, ktorý narastá, a neopakuje sa. To je na ňom to ťažké: povie vec raz, a čokoľvek, '
            + 'čo potom ďalej nalieha, prichádza odinakiaľ.',
    },
    'Emotional / Solar Plexus': {
        is: 'Systém hovorí, že v danej chvíli tu žiadna pravda ešte nie je. Jasno je to, čo zostane po tom, '
            + 'čo sa emócia dohýbe – rozhodnutie teda vzniká tak, že necháš prejsť čas a všímaš si, ako vec vyzerá, keď vlna prejde.',
        isNot: 'Nie je to nálada, ktorú treba zvládnuť alebo prekonať, a vrchol nadšenia nie je odpoveďou o nič viac '
            + 'než dno. Oboje sú časti toho istého pohybu a ani jedno z nich nie je rozhodnutie.',
    },
    'Ego Manifested': {
        is: 'Systém kladie rozhodovanie do toho, na čo naozaj máš vôľu – k čomu sa vieš zaviazať a čo vieš udržať. '
            + 'Býva to počuť vtedy, keď to povieš nahlas.',
        isNot: 'Nie je to to, čo podľa teba máš chcieť, a nie je to to, do čoho sa vieš prehovoriť. Tento '
            + 'mechanizmus odpovedá na otázku „chcem to naozaj?“ a k tomu, či je rozumné to chcieť, nemá čo povedať.',
    },
    'Ego Projected': {
        is: 'Systém kladie rozhodovanie do toho, na čo naozaj máš vôľu, počuté cez vlastný hlas, nie vymyslené potichu.',
        isNot: 'Nie je to záver, ku ktorému sa dopracuješ osamote na papieri. Premýšľanie v hlave vyrobí skôr dobrú argumentáciu než odpoveď.',
    },
    'Self-Projected': {
        is: 'Systém kladie rozhodovanie do smeru, nie do príťažlivosti: kam ťa vec nasmeruje. Počuť to vtedy, keď to '
            + 'prehovoríš nahlas s niekým, kto jednoducho počúva.',
        isNot: 'Nie je to jeho rada a nie je to rozhodnutie urobené vnútri a potichu. Ten druhý človek je tam preto, '
            + 'aby zaznel tvoj vlastný hlas; čo si o tom myslí on, nie je ten mechanizmus.',
    },
    'Mental / Environmental': {
        is: 'Systém tomuto dizajnu nedáva žiadneho vnútorného rozhodovateľa. Ponúka namiesto toho rozhovor s ľuďmi, '
            + 'ktorým dôveruješ, a pozornosť voči tomu, kde sa pri tom fyzicky nachádzaš.',
        isNot: 'Nie je to prenechanie rozhodnutia iným, a ani myseľ – ktorá toho bude mať veľa čo povedať – tu nie je '
            + 'autoritou. Myseľ je na spracovanie a pre druhých; rozhodnutie stojí na prostredí.',
    },
    Lunar: {
        is: 'Systém žiada celý lunárny cyklus – približne mesiac – pred čímkoľvek veľkým. Počas tohto obdobia sa tá '
            + 'istá otázka ukáže z meniacich sa uhlov a odpoveďou je to, čo je rovnaké naprieč všetkými.',
        isNot: 'Nie je to nerozhodnosť ani zdržiavanie. Odpoveď z tohto dizajnu v ten istý deň je čítaním toho, kto bol práve v miestnosti.',
    },
};
/** Krátka podoba toho istého, pre druhú a tretiu zmienku. */
const OPEN_NOISE_SHORT = {
    head: 'prevzatá naliehavosť otázok',
    ajna: 'vyrobená istota',
    throat: 'ťah hovoriť len tak',
    g: 'prevzatý tlak na smer',
    ego: 'potreba niečo dokazovať',
    solarPlexus: 'emočné počasie v miestnosti',
    sacral: 'pocit, že máš vládať ďalej',
    spleen: 'držanie sa vecí po dobe ich užitočnosti',
    root: 'vyrobený zhon',
};
const OPEN_NOISE = {
    head: 'otázky, ktoré pôsobia naliehavo a často nie sú tvoje',
    ajna: 'istota – pevne znejúce závery, ktoré prichádzajú bez pôdy pod sebou',
    throat: 'tlak hovoriť, a hovorenie kvôli pozornosti namiesto toho, že je čo povedať',
    g: 'pocit, že pevný smer už má byť jasný',
    ego: 'sľuby dávané preto, aby niečo dokázali, a potreba stále dokazovať vlastnú hodnotu',
    solarPlexus: 'emočné počasie iných ľudí, zachytené a zosilnené, až sa číta ako vlastné',
    sacral: 'pocit, že máš vládať rovnako dlho ako všetci ostatní',
    spleen: 'neochota pustiť veci, ktoré už nerobia dobre',
    root: 'vyrobený zhon – tlak byť hotový, za ktorým nestojí skutočný termín',
};
const NOT_SELF_MEANS = {
    'Manifesting Generator': 'zaseknuté podráždenie – tlačenie do niečoho, čo nepovolí. Systém číta jeho opakovanú podobu ako informáciu, '
        + 'nie ako chybu povahy: zvyčajne to, že vec sa začala z predstavy o tom, čo by malo byť, a nie z niečoho '
        + 'skutočného, do čoho sa dá oprieť.',
    Generator: 'zaseknuté podráždenie – úsilie idúce do niečoho, čo sa nehýbe. Systém číta jeho opakovanú podobu ako znak toho, '
        + 'že práca sa vzala preto, že bola po ruke, a nie preto, že na ňu v tebe niečo odpovedalo.',
    Manifestor: 'tvrdé vzplanutie hnevu, zvyčajne pri zablokovaní alebo spochybnení. Systém číta jeho opakovanú podobu ako znak '
        + 'toho, že tvoje pohyby ľudí prekvapujú – odpor, ktorý nemusel byť, keby sa to dozvedeli vopred.',
    Projector: 'zvláštny druh horkosti – vydané úsilie, ktoré nikto nevidel. Systém číta jeho opakovanú podobu ako znak toho, '
        + 'že sa ponúkaš tam, kde o to nikto nestál, čo tu stojí oveľa viac než v dizajne stavanom na tlačenie.',
    Reflector: 'plochosť – pocit, že nič sa nedá odlíšiť od ničoho. Systém číta jej opakovanú podobu ako znak miesta, ktoré '
        + 'ti nerobí dobre, keďže tento dizajn číta miesto, na ktorom je, viac než čokoľvek iné.',
};
/* Accusative - the only frame is „používaj …“ - and never the system's own word,
   which the same sentence names next („systém to nazýva spokojnosť“). */
const SIGNATURE_MEANS = {
    'Manifesting Generator': 'unavené uspokojenie z toho, že je niečo za tebou, na konci dňa',
    Generator: 'unavené uspokojenie z toho, že je niečo za tebou, na konci dňa',
    Manifestor: 'neprítomnosť trenia, keď sa veci hýbu bez toho, aby sa o ne muselo bojovať',
    Projector: 'tú zvláštnu ľahkosť, keď si niekto vypýtal presne to, v čom vynikáš',
    Reflector: 'skutočné prekvapenie z toho, že ťa niečo zaskočí, a to príjemne',
};
const AUTHORITY_TERM = {
    Sacral: 'Sacral autorita',
    Splenic: 'Splenic autorita',
    'Emotional / Solar Plexus': 'Emocionálna autorita (Solar Plexus)',
    'Ego Manifested': 'Ego autorita',
    'Ego Projected': 'Ego-projected autorita',
    'Self-Projected': 'Self-projected autorita',
    'Mental / Environmental': 'Mentálna / environmentálna autorita',
    Lunar: 'Lunar autorita',
};
const and = (words) => listWords(words, 'a');
const centreWords = (ids) => and(ids.map((id) => CENTER_DOES[id]));
const centreNames = (ids) => and(ids.map((id) => CENTER_SHORT[id]));
const centreNamesAcc = (ids) => and(ids.map((id) => CENTER_SHORT_ACC[id]));
const COUNT = ['žiadna', 'jedna', 'dve', 'tri', 'štyri', 'päť', 'šesť', 'sedem', 'osem', 'deväť'];
const count = (value) => numberWord(value, COUNT);
/** Číslovka v inštrumentáli: „dvoma spojeniami“, nikdy „dve spojeniami“. */
const COUNT_INSTRUMENTAL = ['žiadnym', 'jedným', 'dvoma', 'troma', 'štyrmi', 'piatimi', 'šiestimi', 'siedmimi', 'ôsmimi', 'deviatimi'];
/** Poradie častí rozdeleného grafu: prvá je „jedna časť“, ďalšie sa číslujú. */
const PART_ORDINAL = ['jedna časť', 'druhá', 'tretia', 'štvrtá', 'piata', 'šiesta', 'siedma', 'ôsma', 'deviata'];
/*
 * VEDĽAJŠIA VETA V ZOZNAME.
 * Položky ako „to, čo ťa poháňa“ nesú vedľajšiu vetu a tá sa uzatvára čiarkou,
 * kedykoľvek veta pokračuje: „to, čo ťa poháňa, a to, ako veci vnímaš, len
 * sčasti“. `continues` hovorí, či za posledným členom zoznamu veta ešte ide.
 */
const hasClause = (item) => item.includes(', ');
const closeClause = (item) => (hasClause(item) ? `${item},` : item);
const clauseList = (items, continues) => {
    let out = '';
    items.forEach((item, index) => {
        out += item;
        if (index === items.length - 1) {
            if (continues && hasClause(item))
                out += ',';
        }
        else if (index === items.length - 2) {
            out += hasClause(item) ? ', a ' : ' a ';
        }
        else {
            out += ', ';
        }
    });
    return out;
};
/* ------------------------------------------------------------- the voice -- */
const time = (claim) => {
    const scanned = claim.window;
    if (scanned && scanned.changes.length === 0) {
        return `Tvoj čas narodenia je tu vedený ako odhad, nie ako presný čas. Pre Human Design na tom záleží, pretože `
            + `celá mapa vzniká z jedného okamihu. Táto sa prepočítala v okne ${scanned.hours} hodín na obe strany od `
            + `zadaného času a mechaniky nižšie vyšli po celý čas rovnako – takže odhad zostáva odhadom, ale čítanie na ňom nevisí.`;
    }
    if (scanned) {
        return `Tvoj čas narodenia je tu vedený ako odhad, nie ako presný čas, a pre Human Design na tom záleží viac než `
            + `inde: celá mapa vzniká z jediného okamihu. Prepočet v okne ${scanned.hours} hodín na obe strany zmenil `
            + `${and([...scanned.changes])}, takže tieto časti ber ako predbežné. Všetko ostatné zostalo v okne rovnaké.`;
    }
    return `Tvoj čas narodenia je tu vedený ako odhad, nie ako presný čas. Human Design stavia celú mapu z jediného `
        + `okamihu a jej časti sa hýbu rôzne rýchlo – graf centier a kanálov sa môže zmeniť v priebehu pár hodín, kým `
        + `dve čiary profilu sa obrátia zhruba raz za deň. Čítaj ďalej ako mapu zadaného času – je to najlepšie `
        + `dostupné čítanie – nie ako niečo uzavreté.`;
};
const operating = (claim) => {
    const paragraphs = [TYPE_MECHANIC[claim.type], INITIATION_ASKS[claim.initiation]];
    if (claim.motorToThroat && claim.motorPath.length > 1 && claim.pathChannels.length > 0) {
        paragraphs.push(`Tá cesta nie je všeobecná vlastnosť typu. Je to konkrétny beh tvojím vlastným grafom – `
            + `${claim.motorPath.map((id) => CENTER_SHORT[id]).join(' → ')} – držaný otvorený `
            + `${claim.pathChannels.length === 1 ? 'spojením, ktoré je' : `${numberWord(claim.pathChannels.length, COUNT_INSTRUMENTAL)} spojeniami, ktoré sú`} `
            + `v tvojej mape úplné. Práve preto sa tento dizajn číta tak, ako sa číta, a nie ako ten susedný.`);
    }
    return paragraphs;
};
const decision = (claim) => {
    const mechanism = AUTHORITY_MECHANISM[claim.authority];
    const paragraphs = [mechanism.is, mechanism.isNot];
    if (claim.confusableWith) {
        paragraphs.push(`Najľahšie sa s tým tu pomýli ${OPEN_NOISE[claim.confusableWith]}. Tá časť grafu zosilňuje to, čo je okolo, `
            + `a práve preto je jej výstup taký presvedčivý. Skúška nie je v tom, aké isté to je, ale v tom, či je to ten `
            + `signál opísaný vyššie.`);
    }
    return paragraphs;
};
const social = (claim) => {
    const paragraphs = [
        `Opisujú to dve čiary a čítajú sa spolu, nie oddelene. Tá, ktorú vnímaš vedome, ${LINE_IS[claim.conscious]}. `
            + `Pod ňou, pre teba oveľa menej viditeľne než pre kohokoľvek, kto sa pozerá, tá druhá ${LINE_IS[claim.unconscious]}.`,
    ];
    if (claim.shape === 'opposed') {
        paragraphs.push(`Tieto dve ťahajú rôznymi smermi a systém to berie ako tvar profilu, nie ako problém v ňom: `
            + `${closeClause(LINE_SHORT[claim.conscious])} navrchu, ${closeClause(LINE_SHORT[claim.unconscious])} pod tým. Väčšina toho, čo v `
            + `stretávaní s ľuďmi pôsobí ako rozpor so sebou, je práve toto, fungujúce tak, ako je opísané.`);
    }
    else if (claim.shape === 'staged') {
        paragraphs.push(`Profil so šiestou čiarou sa číta v etapách, nie ako jedno stále nastavenie – to znamená, že táto časť `
            + `dizajnu sa nemá prejavovať celý život rovnako. To, čo je tu opísané, je tvar, nie nastavenie, ktoré sa má dať spoznať hneď.`);
    }
    else {
        paragraphs.push(`Obe čiary ťahajú rovnakým smerom, čo z toho zvyčajne robí najmenej rozporuplnú časť mapy – `
            + `${clauseList([LINE_SHORT[claim.conscious], LINE_SHORT[claim.unconscious]], true)} sa navzájom skôr posilňujú než prerušujú.`);
    }
    return paragraphs;
};
const functionSentence = (claim, defined) => {
    const ids = defined ? claim.defined : claim.open;
    return `${FUNCTION_DOES[claim.fn]} (${centreWords(ids)})`;
};
const consistency = (claim) => {
    const whole = claim.functions.filter((fn) => fn.state === 'all-defined');
    const part = claim.functions.filter((fn) => fn.state === 'mixed');
    /* Najprv centrá, potom vzorec, ktorý tvoria: pomenovať funkciu a jej jediné
       centrum v jednom dychu znamená povedať to isté dvakrát. */
    const allDefined = claim.functions.flatMap((fn) => fn.defined);
    /* Zhoda s číslovkou: jedna je pevná, dve až štyri sú pevné, päť a viac je pevných. */
    const n = claim.definedCount;
    const fixed = n === 1 ? 'Jedna z deviatich častí tohto grafu je pevná'
        : n <= 4 ? `${capitalise(count(n))} z deviatich častí tohto grafu sú pevné`
            : `${capitalise(count(n))} z deviatich častí tohto grafu je pevných`;
    const paragraphs = [
        `${fixed}: ${centreNames(allDefined)}. `
            + `${n === 1 ? 'Funguje' : 'Tie fungujú'} rovnako bez ohľadu na to, s kým si a aký je deň – je to tá časť teba, ktorá nepotrebuje riadenie, `
            + `a tá, ktorú vedia ľudia okolo predvídať.`,
    ];
    if (whole.length > 0 || part.length > 0) {
        const partly = part.length > 0 ? `; ${clauseList(part.map((fn) => FUNCTION_DOES[fn.fn]), true)} len sčasti` : '';
        paragraphs.push(whole.length > 0
            ? `Dokopy to úplne ustaľuje ${clauseList(whole.map((fn) => FUNCTION_DOES[fn.fn]), false)}${partly}.`
            : `Dokopy to úplne neustaľuje ani jednu zo štyroch funkcií${partly}.`);
    }
    if (claim.channels.length > 0) {
        const named = claim.channels.map((channel) => {
            const [left, right] = channel.centers;
            return `${CENTER_SHORT[left]} – ${CENTER_SHORT[right]}`;
        });
        paragraphs.push(`Pevnými ich nerobia samotné centrá, ale konkrétne zapojenie – v tvojej mape ${and(named)}. Tieto spojenia sú dôvodom, `
            + `prečo mechaniky vyššie vyšli tak, ako vyšli, a sú tou časťou mapy, ktorá sa najmenej podobá komukoľvek inému s rovnakým typom.`);
    }
    return paragraphs;
};
const context = (claim) => {
    if (claim.whollyOpen) {
        return [
            'V tomto grafe nie je nič pevné. Každá jeho časť preberá charakter okolia, čo znamená, že otázka „aký som?“ '
                + 'má inú odpoveď podľa toho, kde ju položíš – a že tá odpoveď hovorí o mieste rovnako veľa ako o tebe.',
            'Systém to nečíta ako prázdnotu. Číta to ako vzorkovanie: nástroj, ktorý ukazuje stav miestnosti presne práve '
                + 'preto, že si nedrží nič vlastné. Prakticky z toho plynie, že to, kde tráviš čas, tu nie je otázka životného štýlu, ale hlavná premenná.',
        ];
    }
    const whole = claim.functions.filter((fn) => fn.state === 'all-open');
    const part = claim.functions.filter((fn) => fn.state === 'mixed');
    const openest = [...claim.functions].sort((a, b) => b.open.length - a.open.length)[0];
    const allOpen = claim.functions.flatMap((fn) => fn.open);
    /* Zhoda s číslovkou: jedna je otvorená, ďalšie dve až štyri sú otvorené, ďalších päť a viac je otvorených. */
    const n = claim.openCount;
    const open = n === 1 ? 'Otvorená je už len jedna'
        : n <= 4 ? `Ďalšie ${count(n)} sú otvorené` : `Ďalších ${count(n)} je otvorených`;
    const depends = (fns) => (fns.length > 1 ? 'závisia' : 'závisí');
    const functions = (fns) => clauseList(fns.map((fn) => FUNCTION_DOES[fn.fn]), false);
    const dependence = whole.length > 0
        ? ` Úplne od kontextu preto ${depends(whole)} ${functions(whole)}${part.length > 0 ? `; sčasti ${functions(part)}` : ''}.`
        : part.length > 0 ? ` Sčasti od kontextu preto ${depends(part)} ${functions(part)}.` : '';
    return [
        `${open}: ${centreNames(allOpen)}. Otvorené neznamená chýbajúce – znamená premenlivé. `
            + `${n === 1 ? 'Táto časť preberá charakter toho, kto a čo je okolo, a to, čo zachytí, zosilňuje.' : 'Tieto preberajú charakter toho, kto a čo je okolo, a to, čo zachytia, zosilňujú.'}`
            + dependence,
        `${n === 1 ? 'Je to zároveň miesto' : 'Sú to zároveň miesta'}, kde sa tento dizajn učí najlepšie, lebo otvorená časť prijíma veci v rozsahu, aký pevná `
            + `nemá. Cena je, že to, čo prichádza cez `
            + `${openest && openest.open.length > 0 ? centreNamesAcc(openest.open) : 'ne'}, sa dá ťažko odlíšiť od niečoho vlastného.`,
    ];
};
const tension = (claim, previous) => {
    const opener = previous ? 'Je tu druhé miesto, kde dizajn ťahá na dve strany. ' : '';
    switch (claim.kind) {
        case 'pace':
            return `${opener}Motor a brzdy v tejto mape bežia rôznou rýchlosťou. To, čo ju poháňa, je stavané na pohyb `
                + `${claim.initiation === 'direct' ? 'prvý a rýchly' : 'hneď, ako sa objaví niečo skutočné'}, a rozhodovací `
                + `mechanizmus nevie odpoveď v tejto rýchlosti vyrobiť – potrebuje, aby prešiel čas, skôr než je čo čítať. `
                + `Ani jedna strana nie je problém a ani jedna nemá vyhrať: chyba, ktorú to nastavuje, je nechať tempo robenia určiť tempo rozhodovania.`;
        case 'split': {
            /* Očíslované a oddelené bodkočiarkou: spojené „a“ sa obe skupiny zlejú
               do jedného zoznamu a veta sa prestane dať čítať. */
            const parts = claim.groups
                .map((group, index) => `${PART_ORDINAL[index] ?? `${index + 1}.`} drží ${centreNamesAcc(group.centers)}`)
                .join('; ');
            const n = claim.groups.length;
            return `${opener}Tento graf má ${count(n)} ${n <= 4 ? 'časti' : 'častí'} bez zapojenia medzi nimi – `
                + `${parts}. Každá je vnútri konzistentná, takže ${n === 2 ? 'obe môžu naraz bežať na inej logike bez toho, aby jedna' : 'všetky môžu naraz bežať na inej logike bez toho, aby ktorákoľvek'} `
                + `z nich bola nesprávna.`
                + (claim.bridgeGates.length > 0
                    ? ` Tá medzera je konkrétna: zavrela by sa pri ${claim.bridgeGates.length > 4 ? 'bránach ako ' : claim.bridgeGates.length === 1 ? 'bráne ' : 'bránach '}`
                        + `${and(claim.bridgeGates.slice(0, 4).map(String))}, ktoré táto mapa nemá. `
                        + `To je opis zapojenia, nie tvrdenie, že potrebuješ niekoho, kto ich má.`
                    : '');
        }
        case 'signal-noise':
            return `${opener}${capitalise(OPEN_NOISE_SHORT[claim.noise])} – to, čo je opísané vyššie – sedí hneď vedľa rozhodovacieho `
                + `mechanizmu, ktorý funguje celkom inak, a oboje vyrobí niečo, čo sa tvári ako odpoveď. Tá hlasnejšia nie je `
                + `tá pravá. Rozoznať tieto dve veci je to najužitočnejšie, o čo táto mapa žiada.`;
        case 'profile':
            return `${opener}Dve strany toho, ako stretávaš ľudí, chcú niečo iné – ${closeClause(LINE_SHORT[claim.conscious])} vpredu, `
                + `${closeClause(LINE_SHORT[claim.unconscious])} pod tým. Systém to číta ako dizajn, nie ako chybu v ňom, a trenie je `
                + `najviac cítiť v situáciách, ktoré žiadajú byť len jedným z tých dvoch.`;
        case 'reach':
            /* Bez prídavného mena pri zozname: „pevné“ pri „tlak dávať veciam zmysel“ nesedí v rode, sloveso sa
               zhoduje len v čísle. Uvedomovacie centrá majú akuzatív zhodný s nominatívom. */
            return `${opener}Táto mapa pevne drží ${clauseList(claim.awareness.map((id) => CENTER_DOES[id]), false)}, no energiu `
                + `pod tým nie: ${clauseList(claim.openDrive.map((id) => CENTER_DOES[id]), true)} ${claim.openDrive.length > 1 ? 'sa menia' : 'sa mení'} podľa okolia. Dôsledkom je dizajn, ktorý `
                + `spoľahlivo vidí viac, než na čo vie spoľahlivo konať – čo sa dá zvládnuť, keď sa s tým ráta, a vyčerpáva, keď sa to berie ako osobné zlyhanie vo vytrvalosti.`;
        default:
            return '';
    }
};
const cost = (claim) => {
    const paragraphs = [
        `Keď ide tento dizajn proti sebe, zvykne sa objaviť ${NOT_SELF_MEANS[claim.type]}`
            + `${claim.notSelf ? ` Systém preň má jednoslovný názov – ${hdValueSk(claim.notSelf).toLowerCase()} – a berie ho ako signál na čítanie, nie ako stav na opravu.` : ''}`,
    ];
    if (claim.pressure) {
        paragraphs.push(`V tvojej mape je najpravdepodobnejším zdrojom ${OPEN_NOISE_SHORT[claim.pressure]}. Oplatí sa vedieť, ktorým smerom `
            + `tu vedie príčina: systém nehovorí, že tá časť teba je slabá, hovorí, že je citlivá na kontext a má sklon `
            + `zosilňovať – takže ten tlak je skutočný a často nie je tvoj.`);
    }
    return paragraphs;
};
const practice = (claim) => {
    const steps = [];
    steps.push(claim.needsTime
        ? 'Nechaj rozhodnutiam prejsť čas, skôr než sa k nim zaviažeš – nie kvôli dlhšiemu premýšľaniu, ale preto, '
            + 'že v tomto dizajne je odpoveďou to, čo zostane po tom, čo sa emócia dohýbe.'
        : claim.authorityKind === 'somatic'
            ? 'Všímaj si odozvu v tele skôr, než prídu dôvody, a plochú odozvu ber ako odpoveď, nie ako niečo na prehovorenie.'
            : claim.authorityKind === 'relational'
                ? 'Povedz to nahlas niekomu, kto bude len počúvať, a sleduj vlastný hlas, nie jeho odpoveď.'
                : claim.authorityKind === 'environmental'
                    ? 'Prehovor to s ľuďmi, ktorým dôveruješ, a ber vážne, kde sa pri tom fyzicky nachádzaš.'
                    : 'Nechaj prejsť celý cyklus pred čímkoľvek veľkým a sleduj, čo zostáva pravdou po celý čas.');
    if (claim.watch) {
        steps.push(`Nauč sa rozdiel medzi vlastným signálom a tým, čo je ${OPEN_NOISE_SHORT[claim.watch]} – to je šum, na ktorý je táto mapa najnáchylnejšia.`);
    }
    steps.push(claim.signature
        ? `Ako kontrolu, či to funguje, používaj ${SIGNATURE_MEANS[claim.type]} – systém to nazýva `
            + `${hdValueSk(claim.signature).toLowerCase()} – a nie to, koľko sa toho stihlo.`
        : 'To, či to funguje, posudzuj podľa toho, aké sú dni, nie podľa toho, koľko sa toho stihlo.');
    return [
        'Nič z nasledujúceho nie je pravidlo a nikto na to nemá nárok. Je to to, čo naznačuje toto konkrétne usporiadanie, v poradí, v akom na tom zvyčajne záleží.',
        /* Jeden krok na odsek. Spojené dokopy sa vykreslia ako „1. ... 2. ... 3. ...“
           v jednom bloku, čo je zoznam, ktorý sa tvári ako súvislý text. */
        ...steps.map((step, index) => `${index + 1}. ${step}`),
        'Je to symbolický rámec na pozeranie sa na seba, nie meranie teba: tie časti, ktoré nie sú rozpoznateľné, smú byť jednoducho nesprávne.',
    ];
};
/* ---------------------------------------------------------- why it appears */
const evidence = {
    standfirst: 'Každé tvrdenie vyššie, spätne dohľadané k vypočítanej mechanike, z ktorej pochádza – v pojmoch samotného systému.',
    operating: (model) => [
        `Typ ${model.operating.type}, z grafu centier: Sacral je ${model.operating.sacralPowered ? 'definované' : 'nedefinované'} `
            + `a cesta motor–Throat ${model.operating.motorToThroat ? `existuje (${model.operating.motorPath.map((id) => CENTER_TERM[id]).join(' → ')})` : 'neexistuje'}. `
            + `Stratégia „${model.operating.strategy}“ vyplýva z typu deterministicky.`,
    ],
    decision: (model) => [
        `${AUTHORITY_TERM[model.decision.authority]}, vyhodnotená pevným poradím Solar Plexus → Sacral → Spleen → Ego → G → mentálna, `
            + `oproti definovaným centrám tejto mapy`
            + `${model.decision.center ? ` (${CENTER_TERM[model.decision.center]} definované)` : ' (žiadne centrum vnútornej autority nie je definované)'}.`
            + `${model.decision.confusableWith ? ` ${CENTER_TERM[model.decision.confusableWith]} je nedefinované, z čoho vychádza odsek o signáli a šume.` : ''}`,
    ],
    social: (model) => (model.social
        ? [`Profil ${model.social.label}: vedomá čiara ${model.social.conscious} zo Slnka Personality, nevedomá čiara `
                + `${model.social.unconscious} zo Slnka Design pri 88° slnečného oblúka pred narodením.`]
        : []),
    structure: (model) => {
        const defined = model.energy.centers.filter((center) => center.defined);
        const lines = [
            `${model.energy.definition}: ${model.energy.groups.length} prepojených skupín – `
                + model.energy.groups.map((group, index) => `skupina ${index + 1} ${group.centers.map((id) => CENTER_TERM[id]).join(', ')} [${group.channels.join(', ')}]`).join('; ') + '.',
            `Definované centrá (${defined.length}): ${defined.map((center) => CENTER_TERM[center.id]).join(', ') || 'žiadne'}. `
                + `Nedefinované (${model.energy.openCount}): ${model.energy.centers.filter((c) => !c.defined).map((c) => CENTER_TERM[c.id]).join(', ') || 'žiadne'}.`,
        ];
        if (model.energy.bridgeGates.length > 0) {
            lines.push(`Brány, ktoré by premostili rozdelenie: ${model.energy.bridgeGates.join(', ')} – vypočítané z tabuľky kanálov oproti skupinám tejto mapy.`);
        }
        return lines;
    },
    rest: (model, plan) => {
        const lines = [];
        if (plan.consistency && plan.consistency.channels.length > 0) {
            lines.push('Kanály menované v čítaní, v poradí, v akom boli vybrané: '
                + plan.consistency.channels.map((channel) => {
                    const why = [
                        channel.carriesAuthority ? 'dopĺňa centrum autority' : null,
                        channel.carriesMotorPath ? 'nesie cestu motor–Throat' : null,
                        channel.reachesThroat ? 'siaha k Throat' : null,
                    ].filter(Boolean);
                    return `${channel.id} (${why.join('; ') || 'definovaný kanál'})`;
                }).join(', ') + '.');
        }
        if (model.feedback.signature || model.feedback.notSelf) {
            lines.push(`Signature ${model.feedback.signature ?? 'nedostupné'} a Not-Self téma ${model.feedback.notSelf ?? 'nedostupné'} sú `
                + 'odvodené z typu, nie samostatné výpočty.');
        }
        if (model.cross) {
            lines.push(`Inkarnačný kríž: ${model.cross.angle}, brány ${model.cross.gateNotation}. Uhol vyplýva z profilu. `
                + 'Pomenovaný názov kríža sa tu netvrdí, pretože si vyžaduje kurátorovanú tabuľku, ktorú tento engine nemá.');
        }
        if (model.time.precision === 'approximate') {
            lines.push(model.time.window
                ? `Čas narodenia je odhad. Mapa sa prepočítala v okne ±${model.time.window.hours} h; `
                    + `${model.time.window.changes.length > 0 ? `${model.time.window.changes.join(', ')} sa niekde v tomto okne zmenilo` : 'žiadna z mechaník vyššie sa v tomto okne nikde nezmenila'}.`
                : 'Čas narodenia je odhad; pre túto mapu sa okno citlivosti nepočítalo.');
        }
        return lines;
    },
};
/* ------------------------------------------ neznámy čas: čo platí celý deň -- */
/** Každá mechanika obyčajnými slovami. Pojmy systému sú v dôkazoch, kde sa dajú overiť. */
const MECHANIC_WORDS = {
    type: 'to, ako funguje tvoja energia',
    strategy: 'stratégia, ktorá z toho vyplýva',
    authority: 'to, ako vzniká rozhodnutie',
    profile: 'to, ako stretávaš ľudí',
    definition: 'to, ako sú pevné časti prepojené',
    cross: 'životná téma, okolo ktorej je dizajn postavený',
    variables: 'jemnejšie podrobnosti',
    motorToThroat: 'to, či zdroj energie priamo dosahuje k reči a konaniu',
};
const MECHANIC_TERM = {
    type: 'Typ', strategy: 'Stratégia', authority: 'Autorita', profile: 'Profil', definition: 'Definícia',
    cross: 'Inkarnačný kríž', variables: 'Premenné', motorToThroat: 'Motor k hrdlu',
};
/** 1 časť je pevná, 2 – 4 časti sú pevné, 5 a viac častí je pevných. */
const parts = (n, one, few, many) => (n === 1 ? `Jedna časť ${one}` : n <= 4 ? `${capitalise(count(n))} časti ${few}` : `${capitalise(count(n))} častí ${many}`);
const stretches = (n) => (n === 1 ? '1 úsek' : n <= 4 ? `${n} úseky` : `${n} úsekov`);
const envelope = {
    intro: (claim) => {
        const holds = [];
        if (claim.definedAllDay.length > 0)
            holds.push(`${centreNames(claim.definedAllDay)} ako pevné časti dizajnu`);
        if (claim.openAllDay.length > 0)
            holds.push(`${centreNames(claim.openAllDay)} ako otvorené`);
        for (const entry of claim.stable) {
            if (entry.key === 'motorToThroat')
                holds.push(entry.value === 'yes' ? 'priame spojenie zdroja energie s rečou a konaním' : 'žiadne priame spojenie zdroja energie s rečou a konaním');
            else if (entry.key !== 'strategy' && entry.key !== 'variables')
                holds.push(MECHANIC_WORDS[entry.key]);
        }
        const needs = claim.moving
            .filter((entry) => entry.key !== 'strategy' || !claim.moving.some((other) => other.key === 'type'))
            .map((entry) => MECHANIC_WORDS[entry.key]);
        if (claim.movingCentres.length === 1)
            needs.push(CENTER_FIXED_OR_OPEN[claim.movingCentres[0]]);
        else if (claim.movingCentres.length > 1)
            needs.push(`či sú ${centreNames(claim.movingCentres)} pevné, alebo otvorené`);
        return [
            'Čas narodenia nebol zadaný a Human Design číta všetko z jedného presného okamihu – preto sa namiesto jednej '
                + 'hádanej hodiny preveril celý deň tvojho narodenia. Čo zostáva rovnaké počas celého dňa, sa dá čítať a číta sa '
                + 'nižšie; čo sa s hodinou mení, sa vynecháva, nie odhaduje.',
            ...(holds.length > 0 ? [`Rovnaké bez ohľadu na hodinu: ${clauseList(holds, false)}.`] : []),
            ...(needs.length > 0 ? [`Vyžaduje čas narodenia: ${clauseList(needs, false)}.`] : []),
        ];
    },
    consistent: (claim) => {
        if (claim.definedAllDay.length === 0)
            return [];
        const n = claim.definedAllDay.length;
        const moving = claim.movingCentres.length;
        return [
            `${parts(n, 'tohto dizajnu je pevná', 'tohto dizajnu sú pevné', 'tohto dizajnu je pevných')} bez ohľadu na hodinu narodenia: `
                + `${centreWords(claim.definedAllDay)}. ${n === 1 ? 'Funguje' : 'Fungujú'} rovnako bez ohľadu na to, s kým si a aký je deň – `
                + 'je to tá časť teba, ktorá nepotrebuje riadenie, a tá, ktorú vedia ľudia okolo predvídať.',
            ...(claim.channelsAllDay.length > 0
                ? [`${n === 1 ? 'Drží ju' : 'Drží ich'} ${claim.channelsAllDay.length === 1 ? 'jedno spojenie, ktoré je úplné' : `${count(claim.channelsAllDay.length)} spojenia, ktoré sú úplné`} `
                        + 'počas celého dňa, takže je to v dizajne stála vec, nie niečo, čo prichádza a odchádza.']
                : []),
            /* Úvod ich už vymenoval; tu sa na ne len odkazuje. 1 časť / 2 – 4 časti / 5 a viac častí. */
            ...(moving > 0
                ? [moving === 1
                        ? 'Či je pevná aj zvyšná časť, závisí od hodiny narodenia, preto sa o nej tu nič nehovorí.'
                        : moving <= 4
                            ? `Či sú pevné aj zvyšné ${count(moving)} časti, závisí od hodiny narodenia, preto sa o nich tu nič nehovorí.`
                            : `Či je pevných aj zvyšných ${count(moving)} častí, závisí od hodiny narodenia, preto sa o nich tu nič nehovorí.`]
                : []),
        ];
    },
    context: (claim) => {
        if (claim.openAllDay.length === 0)
            return [];
        const n = claim.openAllDay.length;
        return [
            `${parts(n, 'je otvorená', 'sú otvorené', 'je otvorených')} bez ohľadu na hodinu: ${centreNames(claim.openAllDay)}. `
                + 'Otvorené neznamená chýbajúce – znamená premenlivé. Tieto časti preberajú charakter toho, kto a čo je okolo, '
                + 'a to, čo zachytia, zosilňujú.',
            'Práve tam sa tento dizajn učí najviac, lebo otvorená časť prijme viac než pevná. Cenou je, že to, čo tam príde, '
                + 'sa dá ťažko odlíšiť od niečoho vlastného.',
        ];
    },
    evidence: (claim) => [
        `Čas narodenia: nezadaný. Preveril sa celý miestny deň narodenia: ${stretches(claim.segments)}, v ktorých sa brána `
            + 'a línia žiadnej aktivácie nemení, a každý sa prečítal raz. Vyššie sa číta len to, čo je vo všetkých rovnaké.',
        ...(claim.definedAllDay.length > 0
            ? [`Definované celý deň: ${claim.definedAllDay.map((id) => CENTER_TERM[id]).join(', ')}${claim.channelsAllDay.length > 0 ? `; kanál ${claim.channelsAllDay.join(', ')}` : ''}.`]
            : []),
        ...(claim.openAllDay.length > 0 ? [`Otvorené celý deň: ${claim.openAllDay.map((id) => CENTER_TERM[id]).join(', ')}.`] : []),
        ...(claim.movingCentres.length > 0
            ? [`Závisí od hodiny: ${claim.movingCentres.map((id) => CENTER_TERM[id]).join(', ')}${claim.channelsSometimes.length > 0 ? `; kanál ${claim.channelsSometimes.join(', ')} len v niektorých hodinách` : ''}.`]
            : []),
        ...claim.stable.filter((entry) => entry.key === 'cross').map((entry) => `Platí celý deň: ${MECHANIC_TERM.cross} ${entry.value}.`),
        ...(claim.moving.length > 0
            ? [`Mení sa počas dňa, preto sa nevyberá žiadna hodnota: ${claim.moving.map((entry) => (entry.key === 'variables'
                    ? MECHANIC_TERM.variables
                    : `${MECHANIC_TERM[entry.key]}: ${entry.values.map(hdValueSk).join(' alebo ')}`)).join('; ')}.`]
            : []),
        `Brány aktivované celý deň: ${claim.gatesAllDay}.`,
    ],
};
export const SK_VOICE = {
    time,
    operating,
    decision,
    social,
    consistency,
    context,
    tension,
    tensionStandfirst: 'Dve časti tejto mapy, ktoré spolu nesúhlasia. V tomto systéme je to informácia o zapojení, nie chyba v ňom.',
    cost,
    practice,
    evidence,
    envelope,
    withheld: [
        'Human Design sa pre tento profil nezobrazuje, pretože nebol zadaný čas narodenia.',
        'Nie je to obmedzenie výpočtu – mapa by sa z dvanástej hodiny, na ktorú sa engine vracia, spočítala úplne '
            + 'v poriadku. Ide o to, že výsledok by bol nesprávny spôsobom, ktorý by na ňom nebolo vidieť. Každá časť '
            + 'Human Design mapy sa číta z jedného presného okamihu: graf centier a kanálov sa môže zmeniť v priebehu pár '
            + 'hodín a s ním typ, rozhodovací mechanizmus aj profil. Mapa postavená na odhadnutom čase vyzerá presne tak '
            + 'isto presvedčivo ako skutočná.',
        'Preto sa zadržiava, namiesto toho, aby sa odhadovala. Zadanie zaznamenaného času narodenia to vyrieši; '
            + 'ostatné tri čítania v tvojej mape od neho nezávisia a sú nedotknuté.',
    ],
};
