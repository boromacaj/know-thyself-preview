import { wordingOf } from './humanDesignPilotFacts.js?v=d9f39e7';
import { joinWords, para } from './humanDesignPilotVoice.js?v=d9f39e7';
/**
 * ĽUDSKÝ VÝKLAD HUMAN DESIGN, SLOVENSKY - hlas pilotu.
 *
 * Slovenčina tu nie je preklad anglického hlasu: tvrdí to isté (tie isté tvrdenia v tom istom poradí; test to kontroluje),
 * ale hovorí po slovensky - vlastným slovosledom, vlastnými väzbami, vlastným tempom viet. Platia rovnaké pravidlá ako
 * v hlase, ktorý je dnes v aplikácii (humanDesignVoiceSk.ts):
 *   - tykanie, nikdy vykanie;
 *   - nikdy tvar, ktorý prezrádza rod čitateľa: žiadny minulý čas ani podmieňovací spôsob po „si“ a žiadny prívlastok
 *     o čitateľovi v mužskom alebo ženskom tvare - používa sa prítomný čas, neosobná alebo podstatná väzba;
 *   - názvy systému (typy) ostávajú po anglicky, tak ako ich ukazuje zvyšok aplikácie; to, čo hlas píše sám, je po slovensky.
 * Autorita sa najprv opíše a až potom pomenuje - a pomenúva sa po slovensky (sakrálna, emočná, splenická ...).
 */
/* ------------------------------------------------------------ slovná zásoba */
/** Centrá v prvom páde (zoznamy), v druhom (od ...), treťom (k ...), štvrtom (cez ..., drží ...) a siedmom (medzi ... a ...). */
const NOM = {
    head: 'mentálny tlak', ajna: 'myslenie', throat: 'vyjadrovanie', g: 'identita', ego: 'vôľa',
    solarPlexus: 'emócie', sacral: 'pracovná energia', spleen: 'inštinkt', root: 'tlak do pohybu',
};
const GEN = {
    head: 'mentálneho tlaku', ajna: 'myslenia', throat: 'vyjadrovania', g: 'identity', ego: 'vôle',
    solarPlexus: 'emócií', sacral: 'pracovnej energie', spleen: 'inštinktu', root: 'tlaku do pohybu',
};
const DAT = {
    head: 'mentálnemu tlaku', ajna: 'mysleniu', throat: 'vyjadrovaniu', g: 'identite', ego: 'vôli',
    solarPlexus: 'emóciám', sacral: 'pracovnej energii', spleen: 'inštinktu', root: 'tlaku do pohybu',
};
const ACC = {
    head: 'mentálny tlak', ajna: 'myslenie', throat: 'vyjadrovanie', g: 'identitu', ego: 'vôľu',
    solarPlexus: 'emócie', sacral: 'pracovnú energiu', spleen: 'inštinkt', root: 'tlak do pohybu',
};
const INS = {
    head: 'mentálnym tlakom', ajna: 'myslením', throat: 'vyjadrovaním', g: 'identitou', ego: 'vôľou',
    solarPlexus: 'emóciami', sacral: 'pracovnou energiou', spleen: 'inštinktom', root: 'tlakom do pohybu',
};
/** Tie isté štyri funkcie v štvrtom páde, vo vete o čitateľovi samom („spoľahnúť sa na svoje ...“) - podstatné mená, nie vedľajšie vety. */
const FUNCTION_ACC = {
    drive: 'svoju hybnú silu', awareness: 'svoje vnímanie', expression: 'svoje vyjadrovanie a konanie', direction: 'svoj zmysel pre smer',
};
const FUNCTION = {
    drive: 'to, čo ťa poháňa', awareness: 'to, ako veci prijímaš', expression: 'to, ako veci vyslovíš a urobíš', direction: 'tvoj zmysel pre smer',
};
const nom = (ids) => joinWords(ids.map((id) => NOM[id]), 'a');
const acc = (ids) => joinWords(ids.map((id) => ACC[id]), 'a');
/** Počet vecí ženského rodu v množnom čísle po „dve/tri/štyri“ a po „päť a viac“: „sú pevné“ / „je pevných“. */
const WAYS = { 2: 'dvoma spôsobmi', 3: 'tromi spôsobmi', 4: 'štyrmi spôsobmi' };
const CARD = ['žiadna', 'jedna', 'dve', 'tri', 'štyri', 'päť', 'šesť', 'sedem', 'osem', 'deväť'];
const card = (value) => CARD[value] ?? String(value);
const hodin = (n) => (n === 1 ? 'hodinu' : n >= 2 && n <= 4 ? 'hodiny' : 'hodín');
const quoted = (headline) => `„${headline.replace(/\.$/, '')}“`;
/**
 * A HEADLINE THAT WOULD NAME THE READER'S GENDER IS NOT QUOTED.
 * The knowledge layer's Slovak headlines are written once for every reader, and one channel's ends in a masculine
 * participle about the person ("vyjsť z toho zmenený"), and three read as broken Slovak ("než ho oplatí prejaviť", "vyriešiť zmätok
 * na obraz", "zverejnená ako spôsob"). Quoted, they would say what the reader is or read as a calque, so those four connections are
 * named without the quotation.
 */
const UNQUOTABLE = new Set(['25-51', '16-48', '47-64', '1-8']);
const quotable = (id, headline) => (headline && !UNQUOTABLE.has(id) ? headline : null);
const PROVISIONAL = 'Táto časť sa v tom okne zmenila, preto ju ber ako mapu zadaného času, nie ako hotovú vec.';
const moved = (ctx, ...keys) => (ctx.facts.time?.changes ?? []).some((change) => keys.includes(change));
const CHANGED_ACC = { type: 'typ', authority: 'autoritu', profile: 'profil', definition: 'definíciu', channels: 'kanály' };
/* --------------------------------------------------------------------- úvod */
const ESSENCE = {
    'manifesting-generator': {
        sacral: 'Si Manifesting Generator: stála energia s priamou cestou von a telo, ktoré odpovedá v danej chvíli.',
        'emotional-solar-plexus': 'Si Manifesting Generator: stála energia s priamou cestou von a rozhodovanie, ktoré potrebuje čas, kým sa usadí.',
    },
    generator: {
        sacral: 'Si Generator: stála energia, ktorá je najlepšia vtedy, keď odpovedá na niečo skutočné, a telo, ktoré odpovedá v danej chvíli.',
        'emotional-solar-plexus': 'Si Generator: stála energia, ktorá je najlepšia vtedy, keď odpovedá na niečo skutočné, a rozhodovanie, ktoré potrebuje čas, kým sa usadí.',
    },
    manifestor: {
        'emotional-solar-plexus': 'Si Manifestor: popud, ktorý začína veci sám od seba, a jasno, ktoré príde neskôr než nutkanie.',
        splenic: 'Si Manifestor: popud, ktorý začína veci sám od seba, a inštinkt, ktorý prehovorí raz a hneď.',
        'ego-manifested': 'Si Manifestor: popud, ktorý začína veci sám od seba, a rozhoduje to, či sa k nim naozaj chceš zaviazať.',
    },
    projector: {
        splenic: 'Si Projector: bez vlastnej stálej energie, ale s pozorným čítaním ľudí a situácií a s inštinktom, ktorý prehovorí raz a hneď.',
        'emotional-solar-plexus': 'Si Projector: bez vlastnej stálej energie, ale s pozorným čítaním ľudí a situácií a s jasnom, ktoré príde, až keď pocit odznie.',
        'self-projected': 'Si Projector: bez vlastnej stálej energie, ale s pozorným čítaním ľudí a situácií a so smerom, ktorý nájdeš tak, že sa počuješ hovoriť.',
        'ego-projected': 'Si Projector: bez vlastnej stálej energie, ale s pozorným čítaním ľudí a situácií a s vôľou, ktorú najlepšie počuješ, keď ju vyslovíš nahlas.',
        'mental-environmental': 'Si Projector: bez vlastnej stálej energie, ale s pozorným čítaním ľudí a situácií a bez vnútorného rozhodovateľa, takže odpoveď vzniká v rozhovore na správnom mieste.',
    },
    reflector: {
        lunar: 'Si Reflector: nič v tvojej mape nie je pevné, preberáš povahu ľudí a miest okolo seba a skutočné rozhodnutie potrebuje približne mesiac.',
    },
};
const TYPE_NAME = {
    'manifesting-generator': 'Manifesting Generator', generator: 'Generator', manifestor: 'Manifestor', projector: 'Projector', reflector: 'Reflector',
};
const centralLine = (tension, wording) => {
    const mozu = wording === 'assert' || wording === 'tendency' ? 'môžu' : 'by mohli';
    switch (tension.kind) {
        case 'pace':
            return tension.initiation === 'direct'
                ? 'Tieto dve veci bežia rôznou rýchlosťou a to je prvé, čo je dobré na tvojej mape pochopiť: nutkanie pohnúť sa príde skôr než jasno.'
                : 'Tieto dve veci bežia rôznou rýchlosťou a to je prvé, čo je dobré na tvojej mape pochopiť: energia je pripravená skôr než odpoveď.';
        case 'split':
            return `Tvoja mapa je zároveň rozložená na oddelené časti, ktoré nie sú navzájom prepojené, a tie ${mozu} bežať podľa rôznej logiky.`;
        case 'reach':
            return 'Tvoja mapa toho zároveň vníma viac, než dokáže poháňať: časť toho, čo veci prijíma, je pevná, to, čo ženie k činu, nie.';
        case 'signal-noise':
            return 'Hlavná zručnosť, o ktorú ťa mapa žiada, je rozoznať skutočnú odpoveď od najhlasnejšieho hlasu, ktorý sa len tvári ako odpoveď.';
        case 'profile':
            return 'To, ako pôsobíš, a to, ako naozaj funguješ, pristupuje k veciam z rôznych strán, a to je tvar tvojho profilu.';
    }
};
/**
 * DVANÁSŤ PROFILOV V JEDNEJ VETE.
 * Každý je vlastný parafráz nadpisu, ktorý pre danú dvojicu napísala znalostná vrstva (knowledge/human-design/hdProfiles.ts);
 * slovenské nadpisy tej vrstvy sú písané v jednom tvare pre každého čitateľa, a niektoré menia rod toho, o kom sa hovorí.
 * Test viaže týchto dvanásť kľúčov na dvanásť kľúčov znalostnej vrstvy.
 */
export const PROFILE_LINE = {
    '1/3': 'najprv všetko prečítaš a aj tak to nakoniec zistíš na vlastnej koži',
    '1/4': 'ideš do hĺbky a potom sa to šíri cez ľudí, ktorí ti veria',
    '2/4': 'máš pokoj, kým ťa niekto nezavolá, a zavolá ťa niekto, kto ťa pozná',
    '2/5': 'chceš mať pokoj, a ľudia od teba stále čakajú, že veci vyriešiš',
    '3/5': 'zisťuješ to skúšaním a ľudia veria, že odpoveď máš',
    '3/6': 'neporiadne prvé dejstvo, dlhé pozorovanie a až potom váha skúseností',
    '4/6': 'život budovaný cez ľudí, naprieč tromi odlišnými fázami',
    '4/1': 'známa sieť na pevnom základe',
    '5/1': 'ľudia čakajú, že máš odpoveď, a ty potichu trváš na tom, že ju naozaj budeš mať',
    '5/2': 'ľudia ťa stále oslovujú, akoby už vedeli, kto si',
    '6/2': 'tri fázy, prežité väčšinou mimo dohľadu',
    '6/3': 'tri fázy a pod všetkými beží motor pokusu a omylu',
};
const time = (ctx) => {
    const t = ctx.facts.time;
    if (!t)
        return [];
    if (t.windowHours !== null && t.changes.length === 0) {
        return [para(`Čas tvojho narodenia je odhad a Human Design číta všetko z jedného presného okamihu. Mapa sa prepočítala ${t.windowHours} ${hodin(t.windowHours)} na obe strany od zadaného času a nič sa v nej nezmenilo, takže čítanie na odhade nevisí.`, 'time')];
    }
    if (t.windowHours !== null) {
        return [para(`Čas tvojho narodenia je odhad a Human Design číta všetko z jedného presného okamihu. Prepočet v okne ${t.windowHours} ${t.windowHours === 1 ? 'hodiny' : 'hodín'} na obe strany od zadaného času zmenil ${joinWords(t.changes.map((change) => CHANGED_ACC[change] ?? change), 'a')}, preto to ber ako predbežné; všetko ostatné zostalo stabilné.`, 'time')];
    }
    return [para('Čas tvojho narodenia je odhad a Human Design číta všetko z jedného presného okamihu: usporiadanie centier a kanálov sa môže posunúť v priebehu pár hodín, kým dve línie profilu sa menia zhruba raz za deň. Čítaj nasledujúce ako mapu zadaného času, nie ako hotovú vec.', 'time')];
};
const lead = (ctx) => {
    const { facts } = ctx;
    const { type } = facts.operating;
    const line = ESSENCE[type][facts.decision.authority] ?? `Si ${TYPE_NAME[type]} a tvoje rozhodovanie sa riadi vzorcom opísaným nižšie.`;
    const parts = [line];
    const central = ctx.central;
    if (central)
        parts.push(centralLine(central, wordingOf(facts.modality[central.id])));
    /* Dvojica línií profilu je jediná vec o mape, ktorú tradícia zhŕňa vlastnou vetou; cituje sa tu a len tu. */
    const headline = facts.social ? PROFILE_LINE[facts.social.label] ?? null : null;
    if (facts.social && headline)
        parts.push(`Tvoj profil ${facts.social.label} v jednej vete: ${headline}.`);
    const claims = ['operating', 'decision', ...(central ? [central.id, ...ctx.relations] : []), ...(facts.social && headline ? ['social'] : [])];
    return [...time(ctx), para(parts.join(' '), ...claims)];
};
/* ---------------------------------------------------- ako funguje energia */
const TYPE_ENERGY = {
    'manifesting-generator': 'Tvoja mapa má vlastnú obnoviteľnú pracovnú energiu a priamu cestu z nej do reči a konania. Preto môžeš vyzerať ako niekto, kto veci začína, a práve preto systém radí postup opačný: začať z odpovede. Požiadavka, prekážka alebo práca, ktorá už pred tebou leží, dá energii, o čo sa oprieť, kým sa nápad o tom, čo by sa malo stať, zvykne zadrhnúť. Keď sa už hýbeš, vieš sa hýbať rýchlo.',
    generator: 'Tvoja mapa má vlastnú obnoviteľnú pracovnú energiu, ale nemá priamu cestu z nej do reči a konania. Je to palivo, nie spúšťač: práca sadne, keď na niečo odpovedá – na otázku, problém alebo prácu, ktorá už existuje –, a viazne, keď ju treba rozbehnúť odnikiaľ. To nie je nedostatok sily. Takto je tá energia stavaná na míňanie.',
    manifestor: 'Tvoja mapa má priamu cestu od zdroja energie do reči a konania, no bez obnoviteľného prísunu pracovnej energie za ňou. Energia prichádza v silných nárazoch, takže začínať je prirodzené a držať stále tempo dlho je to, čo stojí. Keďže sa hýbeš skôr, než sa ťa niekto opýta, to, ako to ľudia prijmú, zvykne záležať na tom, či sa to dozvedeli vopred; povedať im to je tá časť stratégie, ktorá odstráni väčšinu odporu.',
    projector: 'Tvoja mapa nemá vlastnú obnoviteľnú pracovnú energiu ani priamu cestu od zdroja energie do reči a konania. Má namiesto toho stavbu na pozorné čítanie ľudí a situácií. To je skutočná schopnosť, no iná než vydržať pracovať dlhšie než ostatní: najlepšie funguje tam, kde ju chceli. Vhľad, o ktorý je záujem, sa zvykne využiť; ten istý vhľad ponúknutý nevyžiadane zvykne zostať nepovšimnutý.',
    reflector: 'V tvojej mape nie je nič pevné: každá jej časť vzorkuje ľudí a miesta okolo teba. Robí to z teba citlivý ukazovateľ miesta a znamená to, že takmer nič na tebe nevyzerá z týždňa na týždeň rovnako.',
};
const STRATEGY = {
    'manifesting-generator': 'reaguj, potom informuj',
    generator: 'reaguj',
    manifestor: 'informuj, než konáš',
    projector: 'čakaj na uznanie a pozvanie',
    reflector: 'čakaj celý lunárny cyklus',
};
const energy = (ctx) => {
    const { operating } = ctx.facts;
    const provisional = moved(ctx, 'type');
    const out = [para(`${TYPE_ENERGY[operating.type]} Skratka systému pre to znie „${STRATEGY[operating.type]}“.${provisional ? ` ${PROVISIONAL}` : ''}`, 'operating', ...(provisional ? ['time'] : []))];
    if (operating.motorToThroat && operating.motorPath.length > 1 && operating.pathChannels.length > 0) {
        const path = operating.motorPath.length === 2
            ? `od ${GEN[operating.motorPath[0]]} k ${DAT[operating.motorPath[1]]}`
            : `od ${GEN[operating.motorPath[0]]} cez ${operating.motorPath.slice(1, -1).map((id) => ACC[id]).join(' a cez ')} k ${DAT[operating.motorPath[operating.motorPath.length - 1]]}`;
        const first = operating.pathChannels[0];
        const headline = quotable(first, ctx.meanings.channelHeadline(first));
        ctx.said.add(`quoted:${first}`);
        const single = operating.pathChannels.length === 1;
        const via = single ? 'cez jedno spojenie' : `cez ${card(operating.pathChannels.length)} spojenia`;
        out.push(para(`V tvojej mape táto cesta vedie ${path}, ${via}${headline ? `${single ? ', ktoré tradícia číta ako' : '; hlavné z nich tradícia číta ako'} ${quoted(headline)}` : ''}.`, 'operating'));
    }
    return out;
};
/* --------------------------------------------------------- ako sa rozhodujem */
const AUTHORITY = {
    sacral: 'V tvojej mape sa odpoveď ukáže v tele, v okamihu, keď ti niekto položí skutočnú otázku: ako ťah k veci alebo ako plochosť voči nej, ešte predtým, než stihneš poskladať dôvody. V Human Design sa tomu, ako vzniká rozhodnutie, hovorí autorita a táto je sakrálna. Nie je to preferencia ani argument, ktorý sa dá obhájiť. V iný deň môže znieť inak a v tomto systéme to znamená, že mechanizmus funguje, nie že ti chýba dôslednosť.',
    'emotional-solar-plexus': 'V tvojej mape nie je v danej chvíli žiadna spoľahlivá odpoveď, lebo to, čo k veci cítiš, stúpa a klesá ako vlna. Jasno je to, čo zostane, keď vlna prejde, takže rozhodnutie vzniká tak, že necháš plynúť čas a všimneš si, ako vec vyzerá potom. V Human Design sa tomu, ako vzniká rozhodnutie, hovorí autorita a táto je emočná. Vrchol nadšenia nie je odpoveďou o nič viac než dno; oboje patrí k tomu istému pohybu.',
    splenic: 'V tvojej mape je odpoveďou tichý, okamžitý pocit, či je vec v poriadku – bližšie k všimnutiu než k záveru. V Human Design sa tomu, ako vzniká rozhodnutie, hovorí autorita a táto je splenická. Prehovorí raz a neopakuje sa, takže čokoľvek, čo potom nalieha, prichádza odinakiaľ.',
    'ego-manifested': 'V tvojej mape je odpoveďou to, či na niečo naozaj máš vôľu: či to chceš natoľko, že sa k tomu vieš zaviazať a záväzok udržať. V Human Design sa tomu, ako vzniká rozhodnutie, hovorí autorita a táto je egová. Nie je to to, čo podľa teba chcieť máš, a nedá sa do nej dostať argumentami. Zvykne byť počuť, keď to vyslovíš nahlas.',
    'ego-projected': 'V tvojej mape je odpoveďou to, či na niečo naozaj máš vôľu, a zistíš to tak, že počúvaš, čo o tom hovoríš, nie tak, že to potichu vypočítaš. V Human Design sa tomu, ako vzniká rozhodnutie, hovorí autorita a táto je egová, počutá vo vlastnom hlase. Premýšľanie osamote ti zvykne dať skôr dobrý argument než odpoveď.',
    'self-projected': 'V tvojej mape je odpoveďou smer – kam ťa vec nasmeruje – a nájdeš ho tak, že to prehovoríš nahlas s niekým, kto jednoducho počúva. V Human Design sa tomu, ako vzniká rozhodnutie, hovorí autorita a táto je sebaprojektovaná. Nejde o jeho názor, ide o to, že ťa niekto počuje. Smer vymyslený potichu je jediný spôsob, pri ktorom sa tento mechanizmus nedá využiť.',
    'mental-environmental': 'V tvojej mape nie je žiadny vnútorný rozhodovateľ. Namiesto neho ti systém ponúka rozhovor s ľuďmi, ktorým dôveruješ, a pozornosť voči tomu, kde sa pri tom nachádzaš. V Human Design sa tomu, ako vzniká rozhodnutie, hovorí autorita a toto usporiadanie sa volá mentálno-environmentálna. Myseľ bude mať veľa čo povedať, no slúži na spracovanie, nie na rozhodovanie; rozhodnutie stojí na prostredí.',
    lunar: 'V tvojej mape nič nerozhodne v danej chvíli, preto systém žiada približne mesiac, celý lunárny cyklus, v ktorom sa tá istá otázka stretne s meniacim sa radom prostredí. V Human Design sa tomu, ako vzniká rozhodnutie, hovorí autorita a táto je lunárna. Odpoveďou je to, čo zostane rovnaké naprieč všetkými; odpoveď v ten istý deň je čítaním toho, kto bol práve v miestnosti.',
};
const fitFor = (ctx) => {
    const { operating, decision } = ctx.facts;
    const fast = operating.initiation === 'after-response' || operating.initiation === 'direct';
    if (decision.kind === 'relational' && decision.authority === 'self-projected')
        return null;
    if (decision.kind === 'environmental' || decision.kind === 'lunar')
        return null;
    if (decision.needsTime && fast)
        return null;
    if (decision.needsTime) {
        return 'Čakanie je zabudované v tvojom dizajne aj v tom, ako sa rozhoduješ, takže sa v čase zhodujú. Žiadajú si trpezlivosť na dvoch miestach: počkať na uznanie alebo pozvanie a potom počkať na jasno.';
    }
    if (fast && operating.initiation === 'direct') {
        return 'Tvoj popud a tvoja odpoveď bežia rovnakým tempom, takže nič v tejto dvojici ťa nenúti zastaviť. Je to výhoda s jedným háčikom: rozhodnutie môže byť urobené správne a napriek tomu slúžiť nesprávnemu účelu, preto si pred krokom ujasni, načo je.';
    }
    if (fast) {
        return 'Tvoja energia a tvoja odpoveď bežia rovnakým tempom, takže nič v tejto dvojici ťa nenúti zastaviť. Je to výhoda s jedným háčikom: rozhodnutie môže byť urobené správne a napriek tomu odpovedať na nesprávnu otázku, preto sa vráť k tomu, na čo sa ťa naozaj pýtali.';
    }
    return 'Tvoj dizajn čaká, kým sa ho niekto opýta, no signál je rýchly, a preto sa dá ľahko vyhovoriť. Kým príde pozvanie, na ktoré čakáš, odpoveď už často padla a zabudla sa, tak si ju všimni, keď príde.';
};
const NOISE_DECIDE = {
    ajna: 'Jedna vec v tvojej mape sa môže tváriť ako odpoveď: istota. Myslenie je u teba otvorené, preto preberá a zosilňuje sebaistotu ľudí okolo a vyrába pevne znejúce závery, ktoré prichádzajú bez pôdy pod nohami. Skúška nie je v tom, aké isté to je, ale v tom, či to prichádza tak, ako je opísané vyššie.',
    solarPlexus: 'Jedna vec v tvojej mape sa môže tváriť ako odpoveď: cudzie emočné počasie. Emócie sú u teba otvorené, preto zachytávaš náladu v miestnosti a zosilňuješ ju, až kým nepôsobí ako tvoja vlastná naliehavosť alebo presvedčenie. Skúška nie je v tom, ako silno to cítiš, ale v tom, či to prichádza tak, ako je opísané vyššie.',
};
const decide = (ctx) => {
    const { decision } = ctx.facts;
    const provisional = moved(ctx, 'authority');
    const out = [para(`${AUTHORITY[decision.authority]}${provisional ? ` ${PROVISIONAL}` : ''}`, 'decision', ...(provisional ? ['time'] : []))];
    const fit = fitFor(ctx);
    if (fit)
        out.push(para(fit, 'decision'));
    const noise = ctx.facts.tensions.find((tension) => tension.kind === 'signal-noise' && ctx.placed.has(tension.id));
    if (noise && noise.kind === 'signal-noise') {
        ctx.said.add(`noise:${noise.noise}`);
        out.push(para(NOISE_DECIDE[noise.noise] ?? 'Jedna vec v tvojej mape sa môže tváriť ako odpoveď: časť teba, ktorá zosilňuje všetko okolo. Skúška je v tom, či signál prichádza tak, ako je opísané vyššie.', noise.id, ...ctx.relations));
    }
    return out;
};
/* ----------------------------------------------------------- ľudia okolo */
const CONSCIOUS = {
    1: 'máš pocit, že potrebuješ pod vecou pevnú pôdu, porozumenie overené na vlastnej koži, skôr než jej uveríš',
    2: 'máš pocit, že ti niečo ide samo, bez námahy, a chceš mať pokoj, kým si to niekto nevyžiada',
    3: 'sa učíš skúšaním a plán, ktorý nefunguje, pôsobí skôr ako informácia než ako zlyhanie',
    4: 'funguješ cez ľudí, ktorých už poznáš, a veci k tebe prichádzajú cez tento okruh, nie od cudzích',
    5: 'ľudia k tebe prichádzajú s očakávaním, že máš odpoveď, a ty máš často menej istoty, než predpokladajú',
    6: 'žiješ v etapách: obdobie skúšania, potom obdobie odstupu a pozorovania, potom život z toho, čo vzniklo z oboch',
};
const UNCONSCIOUS = {
    1: 'neustále hľadáš pevný základ, aj keď si to nevšimneš',
    2: 'je tu prirodzená schopnosť, ktorú ostatní vidia skôr než ty a ktorá sa najlepšie ukáže, keď ťa nikto nesleduje',
    3: 'neustále skúšaš a veľa z toho, čo vyzerá ako falošný štart, je metóda, ktorá funguje',
    4: 'tvoj život vedie cez vzťahy, ktoré už máš, a ľudia okolo teba ti otvárajú viac dverí, než si uvedomuješ',
    5: 'ľudia na teba premietajú svoje predstavy a povesť zvykne byť o krok pred skutočnosťou',
    6: 'žiješ v etapách, ktoré si nemusíš uvedomovať; tvar sa ukáže skôr s časom než zvnútra jednej z nich',
};
const people = (ctx) => {
    const { social } = ctx.facts;
    if (!social)
        return [];
    const w = wordingOf(ctx.facts.modality.social);
    const scannedClean = ctx.facts.time !== null && ctx.facts.time.windowHours !== null;
    const hedge = moved(ctx, 'profile') ? ` ${PROVISIONAL}` : w === 'assert' || scannedClean ? '' : ' Systém to číta takto, ak je zadaný čas blízko skutočnému.';
    const sum = '';
    const out = [para(`Tvoj profil je ${social.label}, dve línie čítané spolu. Na vedomej rovine ${CONSCIOUS[social.conscious]}. Pod ňou ${UNCONSCIOUS[social.unconscious]}.${hedge}`, 'social')];
    if (social.shape === 'opposed') {
        const tension = ctx.facts.tensions.find((item) => item.kind === 'profile' && ctx.placed.has(item.id));
        out.push(para(`${sum}Tieto dve línie pristupujú k veciam z rôznych strán, čo Human Design číta ako tvar profilu, nie ako chybu v ňom. Najviac sa to zvykne ukázať v situáciách, kde sa od teba čaká, že budeš len jednou z nich.`, 'social', ...(tension ? [tension.id, ...ctx.relations] : [])));
    }
    else if (social.shape === 'staged') {
        out.push(para(`${sum}Šiesta línia sa číta v etapách, nie ako stále nastavenie, preto táto časť mapy nemá vyzerať počas života rovnako. To, čo je tu opísané, je tvar, do ktorého sa dorastá, nie niečo, čo sa od teba čaká, že spoznáš hneď.`, 'social'));
    }
    else {
        out.push(para(`${sum}Obe línie ťahajú rovnakým smerom, takže sa dopĺňajú, nie rozchádzajú.`, 'social'));
    }
    return out;
};
/* --------------------------------------------------------- čo je v tebe pevné */
const functionStates = (ctx) => {
    const defined = new Set(ctx.facts.consistency?.functionsDefined ?? []);
    const open = new Set(ctx.facts.context?.functionsOpen ?? []);
    const all = ['awareness', 'expression', 'direction', 'drive'];
    return { steady: all.filter((fn) => defined.has(fn) && !open.has(fn)), partly: all.filter((fn) => defined.has(fn) && open.has(fn)) };
};
const CENTER_ORDER = ['head', 'ajna', 'throat', 'g', 'ego', 'solarPlexus', 'sacral', 'spleen', 'root'];
const steady = (ctx) => {
    const c = ctx.facts.consistency;
    if (!c)
        return [];
    const n = c.definedCount;
    const states = functionStates(ctx);
    const list = (fns) => joinWords(fns.map((fn) => `na ${FUNCTION_ACC[fn]}`), 'a');
    const pattern = `${states.steady.length > 0 ? ` Vďaka tomu sa môžeš spoľahnúť ${list(states.steady)}.` : ''}${states.partly.length > 0 ? ` Len sčasti sa dá spoľahnúť ${list(states.partly)}, lebo časť oblastí, ktoré to tvoria, je otvorená.` : ''}`;
    const lead = n === 1 ? 'Z deviatich oblastí, ktoré Human Design mapuje, je jedna pevná'
        : n <= 4 ? `Z deviatich oblastí, ktoré Human Design mapuje, ${card(n)} sú pevné`
            : `Z deviatich oblastí, ktoré Human Design mapuje, je ${card(n)} pevných`;
    const out = [para(`${lead}: ${nom(c.definedCenters)}. Pevné znamená stále: ${n === 1 ? 'funguje' : 'fungujú'} rovnako, nech si s kýmkoľvek a nech je akýkoľvek deň.${pattern}`, 'consistency')];
    const byEnds = new Map();
    for (const id of c.channels) {
        const ends = ctx.meanings.channelCenters(id);
        if (!ends)
            continue;
        const [a, b] = [...ends].sort((x, y) => CENTER_ORDER.indexOf(x) - CENTER_ORDER.indexOf(y));
        const key = `medzi ${INS[a]} a ${INS[b]}`;
        byEnds.set(key, [...(byEnds.get(key) ?? []), id]);
    }
    const decidingChannels = c.channels.filter((id) => ctx.facts.decision.evidenceChannels.includes(id)).length;
    const threads = [...byEnds.entries()].map(([between, ids]) => {
        const route = ids.some((id) => ctx.facts.operating.pathChannels.includes(id));
        const told = ids.every((id) => ctx.said.has(`quoted:${id}`));
        const role = route ? (told ? 'cesta opísaná vyššie' : 'je to cesta, ktorá nesie tvoju energiu k činu') : null;
        const headlines = ids.filter((id) => !ctx.said.has(`quoted:${id}`)).map((id) => quotable(id, ctx.meanings.channelHeadline(id))).filter((h) => h !== null);
        ids.forEach((id) => ctx.said.add(`quoted:${id}`));
        if (told)
            return `${between} (${role ?? 'opísané vyššie'})`;
        const reading = headlines.length === 0 ? '' : ids.length > 1
            ? ` – ${WAYS[ids.length] ?? 'viacerými spôsobmi'}, ktoré tradícia číta ako ${joinWords(headlines.map(quoted), 'a')}`
            : ` – tradícia ho číta ako ${quoted(headlines[0])}`;
        return `${between}${reading}${role ? ` (${role})` : ''}`;
    });
    if (threads.length > 0) {
        const provisional = moved(ctx, 'channels', 'definition');
        out.push(para(`${c.channels.length === 1 ? 'Vyniká jedno spojenie' : `Medzi spojeniami, ktoré to držia, ${c.channels.length === 2 ? 'vynikajú dve' : c.channels.length === 3 ? 'vynikajú tri' : 'vynikajú viaceré'}`} a práve ${c.channels.length === 1 ? 'ono odlišuje' : 'tie odlišujú'} tvoju mapu od inej mapy toho istého typu: ${threads.join('; ')}.${decidingChannels === 0 ? '' : decidingChannels === c.channels.length ? (c.channels.length === 1 ? ' Prechádza aj cez tú časť teba, z ktorej sa rozhoduješ.' : ' Všetky prechádzajú aj cez tú časť teba, z ktorej sa rozhoduješ.') : decidingChannels === 1 ? ' Jedno z nich prechádza aj cez tú časť teba, z ktorej sa rozhoduješ.' : ` ${decidingChannels === 2 ? 'Dve' : 'Viaceré'} z nich prechádzajú aj cez tú časť teba, z ktorej sa rozhoduješ.`}${provisional ? ` ${PROVISIONAL}` : ''}`, 'consistency', ...(provisional ? ['time'] : [])));
    }
    return out;
};
/* ------------------------------------------------------------ čo je otvorené */
const OPEN_NOISE = {
    head: 'mentálny tlak je otvorený, takže otázky môžu pôsobiť naliehavo, hoci často nie sú tvoje',
    ajna: 'myslenie je otvorené, takže sa ľahko preberajú od iných závery, ktoré znejú isto',
    throat: 'vyjadrovanie je otvorené, takže môže prísť nutkanie hovoriť, aby si ťa všimli, nie preto, že je čo povedať',
    g: 'identita je otvorená, takže môže vzniknúť pocit, že pevný smer už máš mať',
    ego: 'vôľa je otvorená, takže sa dajú dávať sľuby, aby sa niečo dokázalo, a hodnota sa začne merať tým, čo sa naposledy podarilo dodať',
    solarPlexus: 'emócie sú otvorené, takže zachytávaš emočné počasie okolo seba a vieš ho zosilniť, až kým nepôsobí ako tvoje vlastné',
    sacral: 'pracovná energia je otvorená, takže môžeš mať pocit, že musíš vládať ísť dopredu tak dlho ako všetci naokolo',
    spleen: 'inštinkt je otvorený, takže je ľahké držať sa človeka alebo situácie dlhšie, než ti robí dobre',
    root: 'tlak do pohybu je otvorený, takže sa cudzí zhon môže stať tvojím termínom',
};
const OPEN_PRIORITY = ['root', 'sacral', 'solarPlexus', 'ego', 'spleen', 'head', 'g', 'throat', 'ajna'];
const open = (ctx) => {
    const c = ctx.facts.context;
    if (!c)
        return [];
    if (c.whollyOpen) {
        return [
            para('Keď je otvorená každá časť, otázka „kto som?“ má inú odpoveď podľa toho, kde sa pýtaš, a odpoveď hovorí o mieste rovnako veľa ako o tebe.', 'context'),
            para('Systém to nečíta ako prázdnotu, ale ako vzorkovanie: nástroj, ktorý presne ukazuje stav miestnosti práve preto, že nedrží nič vlastné. V praxi je hlavnou premennou to, kde tráviš čas a s kým.', 'context'),
        ];
    }
    const one = c.openCount === 1;
    const fixedLead = one ? 'Zvyšná jedna oblasť je otvorená'
        : c.openCount <= 4 ? `Ostatné ${card(c.openCount)} sú otvorené`
            : `Ostatných ${card(c.openCount)} je otvorených`;
    const out = [para(`${fixedLead}: ${nom(c.openCenters)}. Otvorené neznamená chýbajúce, znamená premenlivé: ${one ? 'preberá' : 'preberajú'} povahu toho, kto a čo je okolo, a ${one ? 'zosilňuje ju' : 'zosilňujú ju'} – a práve tu sa učíš najviac.`, 'context')];
    const picks = OPEN_PRIORITY.filter((id) => c.openCenters.includes(id) && !ctx.said.has(`noise:${id}`)).slice(0, 2);
    if (picks.length > 0) {
        out.push(para(`${picks.length === 1 ? 'Vyniká toto' : 'Vynikajú tieto dve veci'}: ${picks.map((id) => OPEN_NOISE[id]).join('; a ')}.`, 'context'));
        picks.forEach((id) => ctx.said.add(`open:${id}`));
    }
    return out;
};
/* ------------------------------------------------------ kde ťa to ťahá dvoma smermi */
const AWARENESS_FIXED = { head: 'je pevný', ajna: 'je pevné', spleen: 'je pevný' };
const OPEN_DRIVE_ADJ = { ego: 'je premenlivá', solarPlexus: 'sú premenlivé', sacral: 'je premenlivá', root: 'je premenlivá' };
const PARTS_NOM = ['jedna časť drží', 'druhá drží', 'tretia drží', 'štvrtá drží', 'piata drží'];
const pullText = (tension, ctx, index) => {
    const w = wordingOf(ctx.facts.modality[tension.id]);
    const hedged = w === 'assert' || w === 'tendency';
    const opener = index === 0 ? '' : index === 1 ? 'Okrem toho ' : 'Je tu ešte jedno ťahanie: ';
    const sentence = (text) => (opener ? `${opener}${text.charAt(0).toLowerCase()}${text.slice(1)}` : text);
    switch (tension.kind) {
        case 'pace':
            return sentence(tension.initiation === 'direct'
                ? 'Popud, ktorý začína veci, sa hýbe ako prvý a rýchlo; jasno, ktoré rozhoduje, prichádza neskôr. Ani jedna strana nie je problém a ani jedna nemá vyhrať. Riziko je, že tempo konania určí tempo rozhodovania, takže sa koná na prvý príval istoty len preto, že tu je. Pohnúť sa ako prvé je pre teba prirodzené; zaviazať sa skôr, než prišlo jasno, je to, čo stojí – a povedať dotknutým ľuďom, že sa ozveš neskôr, je lacnejšie než krok vracať späť.'
                : `Energia je pripravená, len čo sa objaví niečo skutočné; odpoveď potrebuje čas, kým je čo čítať. Ani jedna strana nie je problém a ani jedna nemá vyhrať. Riziko je, že tempo konania určí tempo rozhodovania: áno na vrchole nadšenia, nie na dne. ${ctx.facts.operating.type === 'generator' ? 'Konať na odpoveď je v poriadku; zaviazať sa skôr, než prišlo jasno, je to, čo stojí.' : 'Pohybovať sa rýchlo je v poriadku; zaväzovať sa rýchlo je to, čo stojí.'}`);
        case 'split': {
            const n = tension.groupCenters.length;
            const two = n === 2;
            const parts = tension.groupCenters.map((group, at) => `${at === 1 && two ? 'druhá drží' : PARTS_NOM[at] ?? 'ďalšia drží'} ${acc(group)}`).join('; ');
            const gates = tension.bridgeGates.slice(0, 4).map(String);
            const bridge = tension.bridgeGates.length > 0
                ? ` Tá medzera je konkrétna: zatvorila by sa pri ${tension.bridgeGates.length === 1 ? 'bráne' : 'bránach'}${tension.bridgeGates.length > 4 ? ', napríklad' : ''} ${joinWords(gates, 'a')}, ktoré tvoja mapa nemá. Je to opis zapojenia, nie tvrdenie, že potrebuješ niekoho, kto ${tension.bridgeGates.length === 1 ? 'ju má' : 'ich má'}.`
                : ' Je to opis zapojenia, nie tvrdenie, že potrebuješ niekoho, kto by tie časti spojil.';
            return sentence(`V tvojej mape sú ${card(n)} časti bez prepojenia medzi nimi: ${parts}. Každá je vo vnútri konzistentná, takže ${two ? 'obe' : 'tieto časti'} ${hedged ? 'môžu' : 'možno budú'} bežať podľa rôznej logiky naraz a ${two ? 'ani jedna' : 'žiadna z nich'} sa nemýli.${bridge}${moved(ctx, 'definition') ? ` ${PROVISIONAL}` : ''}`);
        }
        case 'reach': {
            const aw = tension.awareness.length === 1 ? `${AWARENESS_FIXED[tension.awareness[0]] ?? 'Pevné je'} ${NOM[tension.awareness[0]]}` : `Sú pevné ${nom(tension.awareness)}`;
            const predicate = tension.openDrive.length === 1 ? `${NOM[tension.openDrive[0]]} ${OPEN_DRIVE_ADJ[tension.openDrive[0]] ?? 'je premenlivá'}` : `${nom(tension.openDrive)} sú premenlivé`;
            return sentence(`V tvojej mape ${aw.charAt(0).toLowerCase()}${aw.slice(1)}, no bez stálej energie pod tým: ${predicate}. Výsledkom je dizajn, ktorý spoľahlivo vníma viac, než vie spoľahlivo uniesť v konaní – s čím sa dá žiť, keď to človek čaká, a čo vyčerpáva, keď to berie ako osobné zlyhanie vytrvalosti.`);
        }
        default:
            return '';
    }
};
const pull = (ctx) => {
    const out = [];
    for (const tension of ctx.facts.tensions) {
        if (!ctx.placed.has(tension.id))
            continue;
        const text = pullText(tension, ctx, out.length);
        if (!text)
            continue;
        out.push(para(text, tension.id, ...ctx.relations));
    }
    return out;
};
/* ------------------------------------------------------ keď ideš proti sebe */
const NOT_SELF = {
    'manifesting-generator': 'zaseknutý druh podráždenia, pocit, že tlačíš na niečo, čo nepustí. Systém číta jeho opakovanú podobu ako informáciu, nie ako vlastnosť charakteru: zvyčajne vec vznikla z predstavy o tom, čo sa má stať, namiesto z niečoho skutočného, do čoho sa dá oprieť.',
    generator: 'zaseknutý druh podráždenia, úsilie, ktoré ide do niečoho, čo sa nehýbe. Systém číta jeho opakovanú podobu ako znak, že sa práca prijala, lebo tu bola, nie preto, že by sa v tebe niečo ozvalo.',
    manifestor: 'prudký záblesk hnevu, väčšinou keď ti niekto bráni alebo ťa spochybňuje. Systém číta jeho opakovanú podobu ako znak, že ľudí tvoje kroky prekvapujú – odpor, ktorý mohol chýbať, keby sa to dozvedeli vopred.',
    projector: 'osobitná horkosť, úsilie, ktoré nikto nevidí. Systém číta jeho opakovanú podobu ako znak, že sa ponúkaš tam, kde sa nikto nepýtal, čo tu stojí viac než v dizajne stavanom na tlačenie.',
    reflector: 'tichý pocit sklamania, keď človek dúfa, že mu miesto alebo skupina ľudí vrátia niečo dobré, a zistí, že nie. Systém číta jeho opakovanú podobu ako znak miesta, ktoré ti nerobí dobre, lebo tento dizajn číta miesto, kde je, viac než čokoľvek iné.',
};
const SYSTEM_WORD = { frustration: 'frustrácia', anger: 'hnev', bitterness: 'horkosť', disappointment: 'sklamanie' };
/** Po čom sa zvykne objaviť stav „mimo seba“, podľa toho, ako sa rozhoduje TÁTO mapa (tvar „po ...“). */
const FOLLOWS = {
    sacral: 'po áno, ktoré telo nikdy nedalo',
    'emotional-solar-plexus': 'po rozhodnutí urobenom na vrchole alebo na dne pocitu',
    splenic: 'po prvom tichom signáli, ktorý neskôr prehlasoval nejaký argument',
    'ego-manifested': 'po záväzku prijatom preto, že bol rozumný, nie preto, že ho chceš',
    'ego-projected': 'po záväzku prijatom preto, že bol rozumný, nie preto, že ho chceš',
    'self-projected': 'po smere ustálenom v tichu',
    'mental-environmental': 'po závere dosiahnutom osamote, na mieste, ktoré mu nesvedčalo',
    lunar: 'po rozhodnutí urobenom na základe čítania miesta za jediný deň',
};
const off = (ctx) => {
    const { cost } = ctx.facts;
    const w = wordingOf(ctx.facts.modality.cost);
    const sure = w === 'assert' || w === 'tendency';
    const word = cost.notSelf ? SYSTEM_WORD[cost.notSelf] ?? cost.notSelf : null;
    return [
        para(`Keď tento dizajn ide proti sebe, ${sure ? 'zvykne sa objaviť' : 'môže sa objaviť'} ${NOT_SELF[cost.type]}${word ? ` Systém pre to má jednoslovný názov – ${word} – a berie to ako signál na čítanie, nie ako stav na opravu.` : ''}`, 'cost'),
        para(`U teba ${sure ? 'to zvykne prísť' : 'to môže prísť'} ${FOLLOWS[ctx.facts.decision.authority]}.`, 'cost', 'decision'),
    ];
};
/* ------------------------------------------------------------- čo pomáha */
const FIRST_STEP = {
    sacral: 'Premeň rozhodnutia na jasné otázky, na ktoré sa dá odpovedať áno alebo nie, polož ich nahlas a všímaj si, čo robí telo, skôr než prídu dôvody. Plochá odpoveď je odpoveď, nie niečo, s čím sa treba hádať.',
    'emotional-solar-plexus': 'Keď treba rozhodnúť, povedz, že odpovieš zajtra alebo neskôr v týždni, a pozri sa, či je odpoveď rovnaká, keď pocit odznie. „Ozvem sa ti“ je úplná veta.',
    splenic: 'Všimni si prvý tichý signál, pretože sa nezopakuje. Ak sa z neho zvykneš vyhovoriť, zapíš si ho, keď príde.',
    'ego-manifested': 'Opýtaj sa nahlas, či to naozaj chceš natoľko, že sľub dodržíš. Rozumné áno, ktoré nechceš, je to, z ktorého vzniká zášť.',
    'ego-projected': 'Povedz nahlas, čo chceš – niekomu alebo aj sebe –, a počúvaj vlastný hlas, nie odpoveď.',
    'self-projected': 'Prejdi si rozhodnutie nahlas s niekým, kto počúva bez radenia, a všímaj si, čo hovoríš ty, nie čo odpovie on.',
    'mental-environmental': 'Preber to s dvoma-tromi ľuďmi, ktorým dôveruješ, a vyskúšaj rozhodnutie na viac než jednom mieste, než sa zaviažeš; všímaj si, kde je jasné.',
    lunar: 'Daj všetkému väčšiemu celý lunárny cyklus, približne štyri týždne, a pozeraj sa na to na rôznych miestach a v rôznej spoločnosti. Zapíš si krátku poznámku, ako to vyzerá zakaždým; čo sa opakuje, je odpoveď.',
};
const SECOND_STEP = {
    'manifesting-generator': 'Začni zo skutočnej odpovede a nechaj rýchlosť prísť potom; ľuďom, ktorých sa to týka, povedz skôr, než zmeníš smer.',
    generator: 'Choď tam, kde ťa môžu zastihnúť skutočné veci, a odpovedaj na ne – nerozhoduj vopred, čo chceš.',
    manifestor: 'Povedz ľuďom, ktorých sa krok dotkne, skôr než ho urobíš. Trvá to minútu a odstráni väčšinu odporu.',
    projector: 'Počkaj, kým sa ťa opýtajú alebo ťa uznajú, než niečo ponúkneš; najprv daj malý kúsok a odpočívaj, keď to potrebuješ – tento dizajn nie je stavaný na beh naplno.',
    reflector: 'Miesta a ľudí, s ktorými tráviš čas, vyberaj s rozvahou a v priebehu týždňov si všímaj, ako sa ti v každom z nich darí.',
};
const WATCH_STEP = {
    ajna: 'Keď príde záver, ktorý znie isto, daj mu čas, než ho vezmeš za svoj.',
    solarPlexus: 'Keď sa objaví nálada alebo naliehavosť, opýtaj sa, čia je, než podľa nej budeš konať.',
    root: 'Keď sa objaví zhon bez termínu za sebou, ber ho ako zhon miestnosti, nie svoj.',
    sacral: 'Zastav pri prvom úprimnom znamení únavy; nemáš zásobu paliva ako ľudia okolo.',
};
const SIGNATURE = {
    'manifesting-generator': 'unavenej radosti z urobenej práce na konci dňa',
    generator: 'unavenej radosti z urobenej práce na konci dňa',
    manifestor: 'toho, že sa veci hýbu bez toho, aby sa o ne muselo bojovať',
    projector: 'ľahkosti z toho, že sa ťa opýtali presne na to, v čom vynikáš',
    reflector: 'milého prekvapenia',
};
const SIGNATURE_WORD = { satisfaction: 'spokojnosť', peace: 'pokoj', success: 'úspech', surprise: 'prekvapenie' };
const help = (ctx) => {
    const { practice } = ctx.facts;
    const steps = [FIRST_STEP[practice.authority], SECOND_STEP[practice.type]];
    const alreadyRest = practice.watch === 'sacral' && (practice.type === 'projector' || practice.type === 'reflector' || practice.type === 'manifestor');
    if (practice.watch && WATCH_STEP[practice.watch] && !alreadyRest) {
        if (!(practice.watch === 'ajna' && practice.authority === 'lunar'))
            steps.push(practice.watch === 'ajna' && practice.needsTime
                ? 'Keď príde záver, ktorý znie isto, nechaj ho počkať, kým pocit odznie, než ho vezmeš za svoj.'
                : WATCH_STEP[practice.watch]);
    }
    const sign = SIGNATURE[practice.type];
    steps.push(practice.signature
        ? `Či to funguje, posudzuj podľa ${sign} (systém to nazýva ${SIGNATURE_WORD[practice.signature] ?? practice.signature}), nie podľa toho, koľko sa stihlo.`
        : 'Či to funguje, posudzuj podľa toho, ako sa ti žijú dni, nie podľa toho, koľko sa stihlo.');
    return [
        para('Nič z toho nie je pravidlo a nikomu nič nedlhuješ. Je to len návrh, ktorý vychádza z tohto konkrétneho usporiadania, v poradí, v akom na ňom zvyčajne záleží.', 'practice'),
        ...steps.map((step, index) => para(`${index + 1}. ${step}`, 'practice')),
        para('Je to symbolický rámec na pozeranie sa na seba, nie meranie teba: časti, ktoré nie sú rozpoznateľné, smú byť jednoducho nesprávne.', 'practice'),
    ];
};
export const PILOT_VOICE_SK = {
    time, lead, energy, decide, people, steady, open, pull, off, help,
    pullStandfirst: 'Miesta, kde dve časti tejto mapy chcú rozdielne veci. V tomto systéme je to informácia, nie chyba.',
};
