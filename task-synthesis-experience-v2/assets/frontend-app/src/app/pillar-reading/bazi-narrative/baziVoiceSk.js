import { confidenceWord, strengthTendencyWord } from '../../i18n/engineProse.js?v=53c0693';
import { STATE_CHARACTER, capitalise, scoreText, weightText } from './baziVoice.js?v=53c0693';
const PH = {
    Wood: { nom: 'drevo', gen: 'dreva', acc: 'drevo', with: 's drevom', label: 'Drevo' },
    Fire: { nom: 'oheň', gen: 'ohňa', acc: 'oheň', with: 's ohňom', label: 'Oheň' },
    Earth: { nom: 'zem', gen: 'zeme', acc: 'zem', with: 'so zemou', label: 'Zem' },
    Metal: { nom: 'kov', gen: 'kovu', acc: 'kov', with: 's kovom', label: 'Kov' },
    Water: { nom: 'voda', gen: 'vody', acc: 'vodu', with: 's vodou', label: 'Voda' },
};
/* ------------------------------------------------------------ the stems */
const STEM = {
    jia: {
        image: 'drevo vo svojej vzpriamenej podobe, vysoký strom, ktorý rastie za svetlom',
        tendency: 'Zvykneš sa riadiť smerom a zásadou: keď raz vieš, kde je hore, rastieš tým smerom a ohýbať sa kvôli iným ti nejde ľahko.',
        cost: 'Cena za rovný rast je, že sa neohýbaš: pozíciu dokážeš držať ešte dlho potom, čo by ťa ohnutie stálo menej.',
        practice: 'A precvičuj ohýbanie v malých veciach, aby to bola voľba, keď na tom záleží.',
    },
    yi: {
        image: 'drevo vo svojej ohybnej podobe, popínavá rastlina a tráva, nie kmeň',
        tendency: 'K cieľu sa zvyčajne dostávaš oklukou: prispôsobuješ sa, prepájaš, opieraš sa o to, čo už stojí, a vykoreniť ťa je ťažšie, než sa zdá.',
        cost: 'Cena za to, ako dobre sa prispôsobuješ, je, že sa môžeš opierať o cudzie štruktúry, až kým sa tvoj vlastný tvar nestratí.',
        practice: 'A zapusť jeden vlastný koreň: niečo, čo držíš bez ohľadu na to, kto je okolo.',
    },
    bing: {
        image: 'oheň vo svojej otvorenej podobe, slnko, ktoré svieti na všetko naraz',
        tendency: 'Ľudí a situácie zvyčajne stretávaš s teplom a viditeľne a najlepšie ti je, keď môžeš dávať zoširoka, nie odmerane.',
        cost: 'Cena za to, že svietiš na všetko, je, že horíš naplno aj tam, kde by stačilo málo, a sila ti dochádza skôr, než si to všimneš.',
        practice: 'A šetri svoje svetlo: vyber si, kde svietiť, a zvyšok nechaj odpočívať.',
    },
    ding: {
        image: 'oheň vo svojej sústredenej podobe, lampa, nie slnko',
        tendency: 'Svoje teplo zvyčajne dávaš len niekoľkým veciam a ľuďom naraz, zblízka a pozorne, a vidíš detaily, ktoré široké svetlo prehliadne.',
        cost: 'Cena za sústredené teplo je, že plameň strážiš zblízka a môžeš k nemu nepustiť aj tých, čo by ho pomohli udržať.',
        practice: 'A občas nechaj plameň opatrovať niekoho iného.',
    },
    wu: {
        image: 'zem vo svojej mohutnej podobe, hora, pôda, ktorá sa nehýbe',
        tendency: 'Zvykneš byť pevným bodom, podľa ktorého sa iní orientujú: stálym, ochranným, pomalým na zmenu a ťažko posunuteľným.',
        cost: 'Cena za stálosť je zotrvačnosť: môžeš zostať na mieste aj vtedy, keď sa pôda už pohla.',
        practice: 'A pohni sa trochu skôr, než máš istotu: vyskúšaj pôdu namiesto čakania, kým ťa niekto postrčí.',
    },
    ji: {
        image: 'zem vo svojej poddajnej podobe, obrobená pôda, pole, nie hora',
        tendency: 'Zvyčajne pracuješ tak, že vytváraš podmienky: pripravuješ, držíš, opatruješ, a veci rastú všade, kde sa o ne staráš, často bez toho, aby to niekto pripísal tebe.',
        cost: 'Cena za všetku tú starostlivosť je, že do seba prijímaš všetko, čo sa na teba naloží, cudzie starosti aj nedokončené veci, a nemáš prirodzený spôsob, ako to zložiť.',
        practice: 'A povedz nahlas, čo chceš, skôr, než sa všetko usporiada podľa toho, čo chcú iní.',
    },
    geng: {
        image: 'kov vo svojej surovej podobe, sekera a neopracovaná ruda',
        tendency: 'Zvykneš ísť rovno k podstate, rozhoduješ sa rýchlo, hovoríš, čo si myslíš, a vážiš si to, čo ti dokáže vzdorovať.',
        cost: 'Cena za priamosť je sila: môžeš siahnuť po čepeli tam, kde bol treba jemnejší nástroj, a až potom počuť, ako tvrdo to dopadlo.',
        practice: 'A vyber si nástroj skôr, než udrieš: pýtaj sa, čo situácia potrebuje, nielen čo je pravda.',
    },
    xin: {
        image: 'kov vo svojej zjemnenej podobe, drahokam a jemná čepeľ',
        tendency: 'Zvyčajne ti záleží na kvalite a presnosti a hneď si všimneš, keď je niečo trochu mimo.',
        cost: 'Cena za jemné ostrie je citlivosť: kritika reže hlbšie, než by mala, a od seba vyžaduješ dokončenie, o ktoré nikto nežiadal.',
        practice: 'A nechaj „dosť dobré“ byť hotové; spätnú väzbu ber ako informáciu, nie ako rozsudok.',
    },
    ren: {
        image: 'voda vo svojej pohyblivej podobe, rieka a otvorené more',
        tendency: 'Zvykneš myslieť v širokých prúdoch, posunúť sa ďalej, keď niečo prestane tiecť, a nachádzať cesty, okolo ktorých iní prejdú.',
        cost: 'Cena za šírku je rozptyl: môžeš sa rozliať tak široko, že tvoj smer nič dlho neudrží.',
        practice: 'A vyber si jedno koryto a zostaň v ňom, kým nedorazíš.',
    },
    gui: {
        image: 'voda vo svojej najjemnejšej podobe, dážď, hmla a rosa',
        tendency: 'Zvyčajne prijímaš oveľa viac, než ukážeš, nálady, atmosféru, to, čo sa nevyslovuje, a pôsobíš tichým, trpezlivým vplyvom, nie silou.',
        cost: 'Cena za to, že toľko prijímaš, je, že môžeš nadobudnúť tvar čohokoľvek, čo ťa drží, a potichu sa vytratiť, keď je toho priveľa, často skôr, než niekto zistí, že toho bolo priveľa.',
        practice: 'A povedz, čo vnímaš, skôr, než to vieš úplne zdôvodniť.',
    },
};
/* ----------------------------------------------------------- the season */
const SEASON_TIME = {
    Wood: 'jarných mesiacov čínskeho kalendára',
    Fire: 'letných mesiacov čínskeho kalendára',
    Metal: 'jesenných mesiacov čínskeho kalendára',
    Water: 'zimných mesiacov čínskeho kalendára',
    Earth: 'jedného zo štyroch mesiacov, ktoré v čínskom kalendári uzatvárajú ročné obdobie',
};
const EARTH_MONTH = {
    Chen: 'posledného mesiaca jari v čínskom kalendári',
    Wei: 'posledného mesiaca leta v čínskom kalendári',
    Xu: 'posledného mesiaca jesene v čínskom kalendári',
    Chou: 'posledného mesiaca zimy v čínskom kalendári',
};
/** What the season does to THIS stem - fifty, as in the English voice, and for the same reason. */
export const SK_SEASON_EFFECT = {
    jia: {
        prosperous: 'Vo svojom vlastnom období je strom v plnom raste: máš v sebe viac rastu, než dokáže využiť ktorýkoľvek jeden smer, a obdobie ho takmer nebrzdí.',
        aided: 'Voda v týchto mesiacoch živí strom zospodu, takže sa ti dostáva výživy pri koreni: tvoj rast sa zvyčajne deje skôr, než ho vidno.',
        resting: 'Oheň spaľuje to, čo mu strom dá, takže to, čo vyrastie, sa hneď mení na teplo a svetlo: míňaš sa rovnako rýchlo, ako sa obnovuješ.',
        trapped: 'Strom sa v týchto mesiacoch musí prebíjať koreňmi cez ťažkú zem: napreduješ, ale námahou, a tú námahu vidno.',
        dead: 'Kov v tomto období strom prerezáva, takže to, čo vydávaš, sa zastrihuje: rastieš tým, že ťa niečo tvaruje, nie tým, že sa rozrastáš.',
    },
    yi: {
        prosperous: 'Vo svojom vlastnom období sa popínavá rastlina rozrastá všetkými smermi naraz: šíriš sa ľahko a otázkou je, po čom sa chceš vyšplhať.',
        aided: 'Voda drží popínavú rastlinu v týchto mesiacoch v zásobe: výživy sa ti dostáva potichu a zvykneš vyčkať, kým nie je po čom liezť.',
        resting: 'Popínavá rastlina v tomto období kvitne a míňa sa tým: to, čo máš, odchádza ako farba a teplo a ľahko dáš viac, než stihneš doplniť.',
        trapped: 'Popínavá rastlina musí v ťažkej zemi týchto mesiacov hľadať, kde sa zachytiť: k cieľu sa dostávaš trpezlivosťou a malými krokmi, nie silou.',
        dead: 'Kov v tomto období popínavú rastlinu zastrihne a ona si nájde inú cestu: tlak ťa tvaruje a namiesto zlomenia sa prispôsobuješ.',
    },
    bing: {
        prosperous: 'Slnko je vo svojom vlastnom období v plnej sile: teplo a zápal prichádzajú ľahko a otázkou je, kam ich nasmerovať, nie kde ich vziať.',
        aided: 'Drevo v týchto mesiacoch prikrmuje slnko, takže stúpaš a máš čo páliť: tvoje teplo sa málokedy musí vynucovať.',
        resting: 'Slnko v týchto mesiacoch zohrieva zem a usádza sa v nej: to, čo vydávaš, sa potichu vpíja a ľahko nadobudneš pocit, že tvoja stopa je menšia, než v skutočnosti je.',
        trapped: 'Slnko v tomto období svieti stále jasne, no má pred sebou tvrdý kov: tvoje teplo aj viditeľnosť zostávajú, len ich udržať stojí viac námahy.',
        dead: 'Slnko dáva v tomto období skutočné svetlo proti chladu, ktorý sa mu bráni: tvoje teplo sa musí udržať samo a učíš sa ho držať stále, nie rozžiarené naplno.',
    },
    ding: {
        prosperous: 'Lampa vo svojom vlastnom období súperí s denným svetlom: tepla máš dosť a úlohou je udržať ho sústredené, aby sa nestratilo v žiare.',
        aided: 'Lampa so stálym palivom horí najlepšie: drevo ťa v týchto mesiacoch živí a tvoje teplo môže zostať blízko a stále.',
        resting: 'Lampa v týchto mesiacoch odovzdáva svoje teplo zemi: to, o čo sa zblízka staráš, sa okolo teba potichu vpíja a ľahko podceníš, koľko toho unieslo.',
        trapped: 'Lampa má v týchto mesiacoch jemnú prácu na tvrdom kove: sústredené teplo dávaš materiálu, ktorý sa bráni, a práca je starostlivá a pomalá.',
        dead: 'Lampa je v tomto období malá, strážená a naozaj potrebná: voda tlačí na tvoj plameň, preto ho držíš pri sebe a míňaš ho tam, kde na tom záleží.',
    },
    wu: {
        prosperous: 'Vo svojich vlastných mesiacoch je hora najpevnejšia: máš váhu a výdrž a rizikom je, že sa nepohneš vôbec.',
        aided: 'Oheň v týchto mesiacoch horu prehrieva: živí ťa niečo zvonku, zásoba v tebe rastie a máš viac, než obdobie žiada.',
        resting: 'V týchto mesiacoch sa z hory ťaží ruda: obdobie z teba berie tvoju vlastnú podstatu a ľahko si nevšimneš, koľko toho odchádza.',
        trapped: 'Hora v týchto mesiacoch zadržiava vodu ako hrádza: to, čo sa okolo teba hýbe, zadržiavaš a upokojuješ a to držanie stojí neustálu námahu.',
        dead: 'Korene dreva v tomto období rozrušujú pôdu hory: hoci stojíš pevne, pracuje na tebe rast, ktorý nie je tvoj.',
    },
    ji: {
        prosperous: 'Vo svojich vlastných mesiacoch je obrobená pôda hlboká a úrodná: zhromažďuješ a držíš a rizikom je, že držíš viac, než využiješ.',
        aided: 'Oheň v týchto mesiacoch prehrieva pôdu, čo je jej najplodnejší stav: živí ťa niečo zvonku a tam, kde si, veci rastú ľahko.',
        resting: 'Kov sa zo zeme ťaží tak, ako sa z poľa zbiera úroda: obdobie berie to, čo vytvoríš, hneď ako to vznikne.',
        trapped: 'Pôda v týchto mesiacoch drží vlhkosť, ktorú nedokáže vstrebať: to, čo k tebe prúdi, prijímaš a zadržiavaš a to držanie stojí neustálu námahu.',
        dead: 'Drevo rozrušuje zem svojimi koreňmi: obdobie ti neustále zasahuje do pôdy a formuje ťa rast, ktorý nie je tvoj.',
    },
    geng: {
        prosperous: 'Vo svojom vlastnom období má sekera plné ostrie: ostrosť ti ide ľahko a otázkou je, načo slúži.',
        aided: 'Zem drží a živí kov tak, ako skala drží rudu: máš ochranu aj prísun a tvoje ostrie sa ešte len formuje.',
        resting: 'Kov sa odovzdáva vode, studený a číry, odnášaný prúdom: to, čo vydávaš, sa odnáša preč a ľahko pritom vychladneš.',
        trapped: 'Sekera má v týchto mesiacoch pred sebou živé drevo: pracuješ na období, produktívne a namáhavo, a rast sa stále vracia.',
        dead: 'Oheň v tomto období opracúva surový kov a pre sekeru je to kovanie: skúša ťa a pretvára a pod tým tlakom v tebe zvyčajne rozvahy pribúda, nie ubúda.',
    },
    xin: {
        prosperous: 'Vo svojom vlastnom období je drahokam v najlepšej podobe: presnosť ti ide ľahko a iní sa k tebe môžu ťažšie dostať.',
        aided: 'Zem v týchto mesiacoch drahokam zasadzuje a podopiera: niečo ťa drží a ukazuje v dobrom svetle a za tvojím dokončením stojí niečo pevné.',
        resting: 'Drahokam v týchto mesiacoch vydáva do chladu vlastnú jasnosť: to, čo zjemníš, odteká von a ľahko to rozdáš rýchlejšie, než to obnovíš.',
        trapped: 'Drahokam má v týchto mesiacoch jemnú prácu na živom materiáli: presnosť vkladáš do vecí, ktoré stále rastú, a práca sa nikdy celkom neskončí.',
        dead: 'Teplo v tomto období tlačí na niečo, čo už bolo hotové: drahokamu oheň tvar nezlepší, preto svoje dokončenie chrániš a vyberáš si, čo ukážeš.',
    },
    ren: {
        prosperous: 'Vo svojom vlastnom období je more v plnom objeme: máš z čoho čerpať a rizikom je, že sa vylejú brehy.',
        aided: 'Kov v týchto mesiacoch napája rieku pri prameni ako prameň zo skaly: máš prísun a tvoja jasnosť pochádza z toho, z čoho čerpáš.',
        resting: 'More v tomto období živí všetko, čo rastie: to, čo máš, sa okolo teba spotrebúva a ľahko ti dôjde, ani nevieš kam.',
        trapped: 'More sa v týchto mesiacoch stretáva s ohňom a z toho stretnutia je para a námaha: chladíš to, čo sa okolo teba prehrialo, a tá práca si len ťažko oddýchne.',
        dead: 'Zem v týchto mesiacoch obkolesuje rieku hrádzami: obdobie drží tvoj prúd v medziach a pohybuješ sa tak, že nachádzaš medzery.',
    },
    gui: {
        prosperous: 'Vo svojom vlastnom období je dážď všade naraz: prijímaš veľa zo všetkých strán a ťažko to zhromaždíš na jedno miesto.',
        aided: 'Kov v týchto mesiacoch čistí vodu pri prameni a dážď padá jemný a v pravý čas: máš prísun a tvoje vnímanie je jasné.',
        resting: 'Dážď sa v tomto období vpíja do všetkého, čo rastie: to, čo máš, potichu odchádza do života okolo teba a môže sa z teba čerpať viac, než si všimneš.',
        trapped: 'Voda v tomto období chladí horúčavu okolo seba: situácie tlmíš a udržiavať veci chladné je neustála práca.',
        dead: 'Dážď v týchto mesiacoch zem vpije hneď, ako dopadne: obdobie ťa drží v medziach a pôsobíš tak, že presakuješ, nie tak, že tečieš.',
    },
};
/** The nature line when the engine resolved no season (see the English voice). */
const NO_SEASON = 'Ročné obdobie tvojho narodenia sa pre túto mapu nepodarilo určiť, preto sa výklad opiera o rovnováhu celej mapy, nie o jej mesiac.';
/* ------------------------------------------------------------ the families */
const MEANING = {
    companion: (phase) => `tvoj vlastný druh (${PH[phase].nom}, ako ty)`,
    output: (phase) => `vydávanie (${PH[phase].nom}, živel, ktorý živíš)`,
    wealth: (phase) => `práca so svetom (${PH[phase].nom}, živel, ktorý tvaruješ)`,
    authority: (phase) => `tvarovanie zvonku (${PH[phase].nom}, živel, ktorý ťa usmerňuje)`,
    resource: (phase) => `prijímanie (${PH[phase].nom}, živel, ktorý ťa živí)`,
};
const GLOSS = {
    Friend: 'spolupráca',
    'Rob Wealth': 'súperenie',
    'Eating God': 'ľahké, radostné vyjadrovanie',
    'Hurting Officer': 'ostré, priame vyjadrovanie, ktoré skúša pravidlá',
    'Indirect Wealth': 'široké, pohotové narábanie s vecami',
    'Direct Wealth': 'vytrvalá, svedomitá práca',
    'Seven Killings': 'tvrdý tlak a skúšky nervov',
    'Direct Officer': 'poriadok, povinnosť a starosť o to, aby sa veci robili správne',
    'Indirect Resource': 'nekonvenčné učenie, intuícia a čas osamote s myšlienkami',
    'Direct Resource': 'starostlivosť, učenie od druhých a to, že sa o teba niekto stará',
};
/** The same gods as short labels, for the two ends of a relation (see the English voice). */
const SIDE = {
    Friend: 'spolupráca s rovnými',
    'Rob Wealth': 'súperenie',
    'Eating God': 'radosť a ľahká zručnosť',
    'Hurting Officer': 'priamosť v reči',
    'Indirect Wealth': 'oko pre príležitosti',
    'Direct Wealth': 'vytrvalé úsilie',
    'Seven Killings': 'tvrdý tlak',
    'Direct Officer': 'zmysel pre poriadok a povinnosť',
    'Indirect Resource': 'samostatné štúdium a intuícia',
    'Direct Resource': 'to, že ťa niekto učí a stará sa o teba',
};
const SUBJECT = {
    companion: 'V tvojom vlastnom druhu je',
    output: 'To, čo vydávaš, je',
    wealth: 'To, na čom pracuješ, je',
    authority: 'To, čo ťa tvaruje, je',
    resource: 'To, čo prijímaš, je',
};
/** The family's two kinds, in the same three steps as the English voice. */
function kinds(facts) {
    const subject = SUBJECT[facts.family];
    if (!facts.mainGod)
        return '';
    if (facts.otherGod && facts.mix === 'even')
        return `${subject} ${GLOSS[facts.mainGod]} rovnako ako ${GLOSS[facts.otherGod]}.`;
    if (facts.otherGod && facts.mix === 'near')
        return `${subject} najmä ${GLOSS[facts.mainGod]} a takmer rovnako aj ${GLOSS[facts.otherGod]}.`;
    if (facts.otherGod)
        return `${subject} najmä ${GLOSS[facts.mainGod]}, a popri tom ${GLOSS[facts.otherGod]}.`;
    return `${subject} ${GLOSS[facts.mainGod]}.`;
}
const BAND_LEAD = {
    thin: {
        output: 'Pri slabej podpore odchádza zo skromnej zásoby veľa: veľa toho urobíš a unaví ťa to skôr, než si to všimneš.',
        wealth: 'Pri slabej podpore ti mapa dáva spravovať viac, než ti dáva síl: praktickú záťaž prijímaš ochotne a cítiš ju až neskôr.',
        authority: 'Pri slabej podpore dopadá tlak na stred, ktorý sa nemá čím brániť, takže očakávania zvyknú vážiť viac, než sa zvonku zdá.',
        resource: 'Pri slabej podpore je práve toto to, čo ťa drží: to, čo prijímaš, je presne to, čo ťa udržiava v chode.',
        companion: 'Pri slabej podpore ťa drží na nohách tvoj vlastný druh: darí sa ti lepšie po boku iných než osamote.',
    },
    even: {
        output: 'V takto vyváženej mape je vydávanie ventilom, ktorý udržiava veci v pohybe.',
        wealth: 'V takto vyváženej mape tvoja energia prirodzene pristáva pri praktickej práci.',
        authority: 'V takto vyváženej mape tlak unesieš, pokiaľ sa nestane jediným, čo nesieš.',
        resource: 'V takto vyváženej mape je to, čo prijímaš, rezervou, z ktorej môžeš čerpať.',
        companion: 'V takto vyváženej mape je to veľa spoločnosti: svoju pozíciu držíš pohotovo a porovnávaš sa s inými viac, než treba.',
    },
    ample: {
        output: 'Keď máš síl nazvyš, najlepšie idú sem: do tvorenia a vyjadrovania.',
        wealth: 'Keď máš síl nazvyš, praktickú záťaž unesieš dobre: výsledky sú miesto, kam chce tvoja energia dopadnúť.',
        authority: 'Keď máš síl nazvyš, štruktúra a výzvy ti sedia: tlak dáva tvojej sile tvar.',
        resource: 'Keď máš síl nazvyš, viac podpory, než potrebuješ, ťa môže spomaliť: dlho prijímaš, kým konáš.',
        companion: 'Keď máš síl nazvyš a veľa vlastného druhu, tvoja vôľa je silná a neustupuješ ľahko.',
    },
};
/*
 * The role each missing element plays FOR THE READER. The first Slovak drafts
 * of output and wealth were impersonal reflexives („živel, ktorý sa spracúva a
 * udržiava", „cez ktorý sa vydáva") that dropped the reader - and „vydáva sa"
 * also reads as "gets married". Both now say whose work and whose voice it is.
 */
const SCARCE_ROLE = {
    output: 'živel toho, čo zo seba dávaš: tvorenie, vlastný hlas, schopnosť oponovať',
    wealth: 'živel toho, na čom pracuješ a čo si chceš udržať',
    authority: 'živel, ktorý by ťa tvaroval a usmerňoval: vonkajšia štruktúra, termíny, niekto, komu sa zodpovedáš',
    resource: 'živel, ktorý by ťa živil: odpočinok, učenie, to, že sa o teba niekto postará',
    companion: 'tvoj vlastný živel, takže po tvojom boku stojí málo tvojho druhu',
};
/** What the missing element means, leaning only on what the chart carries (see the English voice). */
function scarceConsequence(family, lead, band, present) {
    switch (family) {
        case 'output':
            return lead === 'authority'
                ? 'Tlak prichádza dnu a nemá pripravenú cestu von, takže ho skôr vstrebeš, než vrátiš.'
                : 'Vyjadrenie je tu tvoja voľba, nie niečo, čo sa deje samo.';
        case 'wealth': {
            if (lead === 'output')
                return 'To, čo vytvoríš, zvykne odísť hneď, ako vznikne; premeniť to na niečo, čo zostane tvoje, je samostatný krok, pre ktorý sa treba rozhodnúť.';
            const ground = present.includes('companion');
            const demands = present.includes('authority');
            if ((lead === 'companion' || lead === 'authority') && (ground || demands)) {
                const going = ground && demands ? 'do držania pozície a plnenia nárokov'
                    : ground ? 'do držania pozície' : 'do plnenia nárokov';
                return `Keď toľko ide ${going}, to, načo to celé je, môže zostať nepomenované.`;
            }
            return 'Výsledky zbieraš zámerne, nie samé od seba.';
        }
        case 'authority':
            return band === 'ample'
                ? 'Keď máš síl nazvyš a málo, čo by ich drželo, možno si budeš musieť štruktúru požičať: záväzky a štandardy, ktoré si zvolíš.'
                : 'Podmienky si určuješ po svojom a prijímať usmernenie ti nemusí ísť ľahko.';
        case 'resource':
            return band === 'thin'
                ? 'Keď je podpora už aj tak slabá, to, čo ťa dopĺňa, treba zariadiť zámerne.'
                : 'Zvyčajne najprv konáš a až potom premýšľaš.';
        case 'companion':
            return band === 'thin'
                ? 'Veci zvykneš niesť osamote a stojí ťa to viac, než sa zdá.'
                : 'Spoločnosť nepotrebuješ, aby ťa držala nad vodou, a možno o ňu nepožiadaš ani vtedy, keď by pomohla.';
        default:
            return '';
    }
}
/* ------------------------------------------------------------ the tension */
const POSITION = {
    Year: 'v tej časti teba, ktorú iní stretnú ako prvú',
    Month: 'v tom, ako sa deň čo deň do vecí vkladáš',
    Day: 'v tvojom súkromnom strede',
    Hour: 'v tvojich cieľoch a plánoch',
};
const POSITION_NAME = { Year: 'Rok', Month: 'Mesiac', Day: 'Deň', Hour: 'Hodina' };
/** A position phrase that ends in its own clause, which Slovak closes with a comma. */
const CLOSES = (position) => (position === 'Year' || position === 'Month' ? ',' : '');
const FAMILY_GLOSS = {
    companion: 'tvoj vlastný druh',
    output: 'to, čo vydávaš',
    wealth: 'to, na čom pracuješ',
    authority: 'tlak, ktorému sa zodpovedáš',
    resource: 'to, čo ťa živí',
};
/** The synthesis's Slovak names for the five families, in the nominative. */
const FAMILY_TERM_SK = {
    companion: 'Seberovní', output: 'Tvorba', wealth: 'Majetok', authority: 'Autorita', resource: 'Výživa',
};
const sideGloss = (side) => {
    if (side.family === 'self')
        return 'tvoja vlastná podstata';
    return side.god ? SIDE[side.god] : FAMILY_GLOSS[side.family];
};
const HOUR_NOTE = 'Toto puto stojí na odhadnutej hodine narodenia.';
/** What each kind of opposition means; the plan decides which one a pair is. */
const CLASH_MEANING = {
    'skill-vs-pressure': 'Tradícia považuje túto dvojicu za užitočnú: zručnosť a ľahkosť sú klasickou odpoveďou na tlak, takže to, čo ťa baví, je zároveň tým, ako to zvládaš, pokiaľ radosť nie je prvá vec, ktorú ti napätie vezme.',
    'speech-vs-order': 'Toto je klasické trenie medzi vyslovením názoru a udržiavaním poriadku: jedným dychom dokážeš spochybniť pravidlo a hneď nato cítiť, že ťa zaväzuje, a spor sa vedie medzi dvoma skutočnými časťami teba.',
    'expression-vs-rules': 'Tvoj vlastný spôsob robenia a hovorenia naráža na tlak a pravidlá, ktorým sa zodpovedáš, a trenie je medzi dvoma skutočnými časťami teba.',
    'intake-vs-expression': 'Klasicky prijímajúca strana drží vyjadrujúcu stranu na uzde: učenie a starostlivosť vedia zjemniť ostré hrany a vedia aj zadržať niečo, čo už bolo pripravené zaznieť.',
    'work-vs-nourishment': 'To, k čomu smeruješ, a to, čo ťa živí, súperia o ten istý čas: praktické nároky zvyknú vytlačiť učenie a odpočinok.',
    'will-vs-holding': 'Tvoja vlastná vôľa a to, čo sa snažíš udržať, ťahajú od seba: deliť sa a držať si nejde ľahko spolu.',
    'independence-vs-structure': 'Tvoja nezávislosť stojí proti štruktúre, ktorej sa zodpovedáš: najviac sa vzpieraš, keď na teba tlačia.',
    'same-kind': 'Dve podoby tej istej veci ťahajú proti sebe, takže sa môžeš prichytiť pri hádke s vlastnými zvykmi.',
    'unsettled': 'Tie dve sa nezjednotia do jedného smeru; skôr medzi nimi prechádzaš, ako sa pre jedno rozhodneš.',
};
/** „na troch miestach“ - the locative the recurrence count needs. */
const COUNT_LOCATIVE = { 2: 'dvoch', 3: 'troch', 4: 'štyroch', 5: 'piatich', 6: 'šiestich' };
const COUNT_NEUTER = { 1: 'jedno', 2: 'dve', 3: 'tri', 4: 'štyri' };
/** One claim, however many places the chart makes it (see the English voice). */
function recurrence(claim, what) {
    if (claim.also.length === 0)
        return '';
    const count = claim.also.length + 1;
    const onHour = claim.also.filter((other) => other.restsOnHour).length;
    const subject = { opposition: 'Ten istý protiklad', bond: 'To isté puto', pattern: 'Ten istý vzor' }[what];
    const hourNote = onHour > 0 && !claim.restsOnHour
        ? `, z toho ${COUNT_NEUTER[onHour] ?? 'niektoré'} v odhadnutej hodine` : '';
    return ` ${subject} sa v tvojej mape objavuje na ${COUNT_LOCATIVE[count] ?? 'viacerých'} miestach${hourNote}, takže je to opakujúca sa téma, nie jediný bod.`;
}
/** „Dve iné časti“ only after a paragraph that itself introduced two parts. */
const introducesParts = (previous) => previous !== null && (previous.kind === 'clash' || previous.kind === 'binding');
/** Each pull as a firm statement and as the tendency a pull only just over the line gets. */
const PULL = {
    'resource>output': {
        clear: 'Prijímanie a vydávanie v tebe súperia: časť teba, ktorá sa učí a premýšľa, kontroluje časť, ktorá tvorí a hovorí. To vie užitočne zjemniť ostrie a vie aj zadržať niečo, čo už bolo pripravené.',
        slight: 'Prijímanie a vydávanie v tebe môžu súperiť: časť teba, ktorá sa učí a premýšľa, zvykne kontrolovať časť, ktorá tvorí a hovorí, čo vie zjemniť ostrie a vie aj zadržať niečo, čo už bolo pripravené.',
    },
    'output>authority': {
        clear: 'Tvoj vlastný spôsob robenia vecí neustále skúša štruktúru okolo teba: pravidlá zlepšuješ tým, že ich spochybňuješ, a rovnako ich vieš aj obrusovať.',
        slight: 'Tvoj vlastný spôsob robenia vecí môže skúšať štruktúru okolo teba: pravidlá zvykneš zlepšovať tým, že ich spochybňuješ, a rovnako ich vieš aj obrusovať.',
    },
    'authority>companion': {
        clear: 'Tlak dopadá na stred, ktorý má veľa vlastného druhu: tlačia na teba a ty tlačíš späť.',
        slight: 'Tlak zvykne dopadať na stred, okolo ktorého je jeho vlastný druh: keď na teba tlačia, máš sklon tlačiť späť.',
    },
    'companion>wealth': {
        clear: 'Tvoja vlastná vôľa súperí s tým, čo sa snažíš udržať: deliť sa a držať si ťahajú rôznymi smermi.',
        slight: 'Tvoja vlastná vôľa môže súperiť s tým, čo sa snažíš udržať: deliť sa a držať si zvyknú ťahať rôznymi smermi.',
    },
    'wealth>resource': {
        clear: 'To, k čomu smeruješ, ťa neustále odťahuje od toho, čo ťa živí: praktické nároky vytláčajú učenie a odpočinok',
        slight: 'To, k čomu smeruješ, ťa môže odťahovať od toho, čo ťa živí: praktické nároky zvyknú vytláčať učenie a odpočinok',
    },
};
const BOUND_CONSEQUENCE = {
    authority: {
        Year: 'očakávania okolo seba zvykneš prijímať za svoje.',
        Month: 'povinnosti zvykneš brať, akoby boli súčasťou teba: spoľahlivo, a len ťažko nejakú odložíš, aj keď nie je tvoja.',
        Hour: 'to, čo chceš, a to, čo sa od teba čaká, sa zvykne zliať, takže povinnosť môžeš sledovať, akoby to bolo želanie.',
    },
    wealth: {
        Year: 'zvykneš sa stotožňovať s tým, o čo sa staráš na očiach iných.',
        Month: 'zvykneš sa stať tým, na čom pracuješ: stálo a spoľahlivo, a len ťažko sa od toho oddelíš.',
        Hour: 'svoje ciele zvykneš priviazať k niečomu hmatateľnému a potom sa toho držať.',
    },
};
function tension(claim, dayMaster, previous) {
    const hour = claim.restsOnHour ? ` ${HOUR_NOTE}` : '';
    switch (claim.kind) {
        case 'bound': {
            const role = claim.partner.family === 'wealth' ? 'wealth' : 'authority';
            const element = role === 'authority' ? 'živlom, ktorý ťa tvaruje a usmerňuje' : 'živlom, na ktorom pracuješ';
            const consequence = BOUND_CONSEQUENCE[role][claim.partner.position] ?? BOUND_CONSEQUENCE[role].Month;
            return `${capitalise(POSITION[claim.partner.position])}${CLOSES(claim.partner.position)} je tvoj vlastný živel previazaný ${PH[claim.partner.phase].with}, ${element}. `
                + `Tradícia to číta ako puto, nie ako stret: ${consequence}${hour}${recurrence(claim, 'bond')}`;
        }
        case 'clash': {
            const [a, b] = claim.sides;
            if (claim.meaning === 'against-self') {
                const other = a.family === 'self' ? b : a;
                return `${capitalise(POSITION[other.position])}${CLOSES(other.position)} stojí ${sideGloss(other)} priamo proti tebe: `
                    + `niečo v mape tlačí na tvoj stred, nie popri ňom.${hour}${recurrence(claim, 'opposition')}`;
            }
            const surface = claim.meaning === 'intake-vs-expression' && claim.relation === 'stem'
                ? ' Keďže obe stoja na povrchu mapy, prejavuje sa to skôr v tom, čo hovoríš a robíš, než pod povrchom.' : '';
            return `Dve ${introducesParts(previous) ? 'iné ' : ''}časti tvojej mapy stoja priamo proti sebe: ${POSITION[a.position]}${CLOSES(a.position)} ${sideGloss(a)}; `
                + `${POSITION[b.position]}${CLOSES(b.position)} ${sideGloss(b)}. ${CLASH_MEANING[claim.meaning]}${surface}${hour}${recurrence(claim, 'opposition')}`;
        }
        case 'binding': {
            const [a, b] = claim.sides;
            /* Druhé puto rovnakého významu hneď po prvom: čo takéto puto robí, už zaznelo, a jeden bod sa hovorí raz (ako v anglickom hlase). */
            const alreadySaid = previous !== null && previous.kind === 'binding' && previous.meaning === claim.meaning;
            const meaning = claim.meaning === 'contest'
                ? 'Tradícia číta takéto puto ako tlak, ktorý sa pohltí namiesto toho, aby sa niesol: tvoja súťaživosť zachytí časť napätia, takže tlak zvykneš brať ako súťaž.'
                : 'Jedna strana zamestnáva druhú, takže časť toho, čo by každá robila sama, zostáva v tom pute.';
            return `Dve ${introducesParts(previous) ? 'iné ' : ''}časti tvojej mapy sú k sebe pripútané: ${POSITION[a.position]}${CLOSES(a.position)} ${sideGloss(a)}; `
                + `${POSITION[b.position]}${CLOSES(b.position)} ${sideGloss(b)}.${alreadySaid ? '' : ` ${meaning}`}${hour}${recurrence(claim, 'bond')}`;
        }
        case 'pull': {
            const key = `${claim.controller.family}>${claim.controlled.family}`;
            const words = PULL[key];
            const base = words ? words[claim.margin] : (claim.margin === 'clear'
                ? 'Dve silné časti tvojej mapy sa navzájom kontrolujú.'
                : 'Dve časti tvojej mapy sa zvyknú navzájom kontrolovať.');
            const tail = key === 'wealth>resource' ? (claim.band === 'thin' ? ', teda presne to, čo ťa drží.' : '.') : '';
            return `${base}${tail}${claim.restsOnHour ? ' Bez odhadnutej hodiny narodenia by bol tento ťah oveľa slabší.' : ''}`;
        }
        case 'doubled': {
            /* Every place the repeated branch stands, said once (see the English voice). */
            const places = ['Year', 'Month', 'Day', 'Hour'].filter((position) => [claim, ...claim.also]
                .some((one) => one.kind === 'doubled' && one.sides.some((side) => side.position === position)));
            const phase = claim.sides[0] ? claim.sides[0].phase : dayMaster;
            const times = { 2: 'dvakrát', 3: 'trikrát', 4: 'štyrikrát' }[places.length] ?? 'viackrát';
            const where = places.length >= 2
                ? `: ${places.slice(0, -1).map((position) => POSITION[position]).join(', ')} a ${POSITION[places[places.length - 1]]}`
                : '';
            const onHour = claim.restsOnHour || claim.also.some((other) => other.restsOnHour) ? ` ${HOUR_NOTE}` : '';
            /* Opens on the phase, not on "ten istý" (see the English voice). */
            return `${PH[phase].label} sa v tvojej mape objavuje ${times} v rovnakej podobe${where}. Tradícia číta takéto zdvojenie ako vlastnosť, ktorá sa obracia proti sebe, tlačí jedným smerom, až kým nezačne pracovať proti tebe, a patrí to k jej sporným výkladom.${onHour}`;
        }
        case 'latent':
            return `Časť väčšieho vzoru ${PH[claim.phase].gen} (${FAMILY_GLOSS[claim.family]}) je v tvojej mape prítomná, ale neúplná. Ber to ako ťah, ktorý tu je, hoci nie je celkom sformovaný.${hour}${recurrence(claim, 'pattern')}`;
        case 'friction': {
            const [a, b] = claim.sides;
            const where = a && b ? `${POSITION[a.position]} a ${POSITION[b.position]}` : 'v tvojej mape';
            return `Tichšie trenie spája dve miesta tvojej mapy: ${where}. Jeho tradičný výklad je sporný, preto sa tu len zaznamenáva a nič sa naň nestavia.${hour}${recurrence(claim, 'pattern')}`;
        }
        default:
            return '';
    }
}
/* ------------------------------------------------- support, cost, practice */
const HELPER = {
    resource: (phase) => ({
        Wood: 'povzbudenie a nové učenie: ľudia a plány, ktoré ti dávajú do čoho rásť',
        Fire: 'teplo: povzbudenie, uznanie, ľudia a miesta, kde ťa vítajú',
        Earth: 'pevná pôda: rutina, spoľahliví ľudia, základňa, kam sa môžeš vrátiť',
        Metal: 'jasnosť: jasné zásady, dobrá štruktúra, myšlienky, ktorých sa môžeš držať',
        Water: 'pokoj a hĺbka: odpočinok, premýšľanie, čas na rozmýšľanie',
    })[phase],
    companion: () => 'spoločnosť tvojho vlastného druhu: rovní, ktorí s tebou nesú časť bremena',
    output: (phase) => ({
        Fire: 'ventil: ukazovať, vystupovať, vynášať myšlienky na svetlo',
        Earth: 'ventil: premieňať veci na hmatateľné a starať sa o ne',
        Metal: 'ventil: triediť, zjemňovať a hovoriť veci na rovinu',
        Water: 'ventil: myšlienky, rozhovor a nechať veci plynúť',
        Wood: 'ventil: začínať veci, učiť, pomáhať veciam rásť',
    })[phase],
    wealth: (phase) => ({
        Earth: 'niečo hmatateľné na prácu: praktická pôda, na ktorej sa dá stavať',
        Metal: 'niečo hmatateľné na prácu: presná, hodnotná práca',
        Water: 'niečo hmatateľné na prácu: veci, ktoré sú v pohybe a menia majiteľa',
        Wood: 'niečo hmatateľné na prácu: projekty, ktoré rastú',
        Fire: 'niečo hmatateľné na prácu: výsledky, ktoré vidno',
    })[phase],
    authority: (phase) => ({
        Metal: 'štandard, ktorý treba splniť: disciplína, ktorá orezáva, čo netreba',
        Water: 'štandard, ktorý treba splniť: hranice, ktoré udržia tvoj oheň v miere',
        Wood: 'štandard, ktorý treba splniť: nároky, vďaka ktorým rastieš',
        Fire: 'štandard, ktorý treba splniť: skutočné skúšky, ktoré ťa kujú',
        Earth: 'štandard, ktorý treba splniť: brehy, ktoré ti dávajú smer',
    })[phase],
};
const BRIDGE_SIDE = {
    companion: 'tvojou vlastnou silou',
    output: 'tým, čo vydávaš',
    wealth: 'tým, na čom pracuješ',
    authority: 'tlakom na teba',
    resource: 'tým, čo ťa živí',
};
/** How much of a helper the chart carries; with the hour unknown, the known part of it. */
function presence(weight, partial) {
    const chart = partial ? 'v známej časti tvojej mapy' : 'v tvojej mape';
    if (weight >= 2)
        return `${chart} je toho dosť`;
    if (weight >= 1)
        return `${chart} už niečo z toho je`;
    if (weight >= 0.5)
        return `${chart} je toho trochu`;
    return `${chart} z toho nie je takmer nič`;
}
/** The cost line, chosen by what the chart actually has (see the English voice). */
function costSentence(claim) {
    const pair = [claim.lead.family, claim.partner].sort().join('+');
    if (claim.band === 'even' && pair === 'authority+companion') {
        return 'Keď tvoj vlastný druh a tlak na teba vážia zhruba rovnako, z obyčajných nezhôd sa môžu stať súboje, ktoré máš pocit, že musíš vyhrať.';
    }
    if (claim.band === 'even' && claim.lead.family === 'companion' && claim.lead.mainGod === 'Rob Wealth') {
        return 'Aj vo vyváženej mape sa ti môže zdať, že keď sa delíš o zásluhy, strácaš pôdu.';
    }
    return COST[claim.band][claim.lead.family];
}
const COST = {
    thin: {
        output: 'V mape, ktorá od teba chce vydávať viac, než dopĺňa, je úbytok postupný: nikdy nie je chvíľa, na ktorú by sa dalo ukázať, len zakaždým zostane o trochu menej.',
        wealth: 'V mape, ktorá ti dáva spravovať viac, než ti dáva síl, môže praktická záťaž potichu prevziať vládu.',
        authority: 'V mape, ktorá je takto plná očakávaní, môžeš dlho plniť štandardy bez otázky, či sú tvoje.',
        resource: 'V mape, kde podpora prichádza najmä cez to, čo prijímaš, sa môžeš stále pripravovať, keď už chvíľa žiada čin.',
        companion: 'V mape, kde ťa najviac podopiera tvoj vlastný druh, môžeš nechať iných určovať tvoje tempo.',
    },
    even: {
        output: 'Aj vo vyváženej mape sa vydávanie môže stať jediným spôsobom, akým vieš niečím prispieť.',
        wealth: 'Aj vo vyváženej mape sa výsledky môžu stať jediným meradlom, ktorému veríš.',
        authority: 'Aj vo vyváženej mape môžeš každý nárok brať ako skúšku, ktorou musíš prejsť.',
        resource: 'Aj vo vyváženej mape môžeš čakať na viac istoty, než rozhodnutie potrebuje.',
        /* The cooperative kind leading; the other two cases are in costSentence. */
        companion: 'Aj vo vyváženej mape je ľahké zostať medzi ľuďmi, ktorí rozmýšľajú ako ty, a menej počuť tých, ktorí rozmýšľajú inak.',
    },
    ample: {
        output: 'Keď máš síl nazvyš, môžeš veľa schopností roztrúsiť do priveľa vecí.',
        wealth: 'Keď máš síl nazvyš, môžeš sa naháňať za výsledkami aj za hranicou, kde ešte stoja za to.',
        authority: 'Keď máš síl nazvyš, môžeš každú výzvu prijímať ako vec cti.',
        resource: 'Keď máš síl nazvyš, môžeš čakať na viac istoty, než akékoľvek rozhodnutie potrebuje.',
        companion: 'Keď máš síl nazvyš a veľa vlastného druhu, tvoja vôľa môže prevalcovať vôľu iných, aj keď to tak nemyslíš.',
    },
};
const HELPER_PRACTICE = {
    resource: (phase, present) => ({
        Fire: present
            ? 'Opri sa o teplo, ktoré už máš: čas s ľuďmi, ktorí ťa povzbudzujú, a uznanie, ktoré necháš doľahnúť namiesto odbíjania.'
            : 'Vnes teplo zámerne: ľudí, ktorí ťa povzbudzujú, miesta, kde ťa vítajú, uznanie, ktoré si dovolíš prijať.',
        Metal: present
            ? 'Využi jasnosť, ktorú už máš: zapisuj si veci a drž sa niekoľkých jasných zásad, ku ktorým sa môžeš vracať.'
            : 'Daj svojmu mysleniu štruktúru zámerne: poznámky, pár zásad, jasné poradie.',
        Earth: present
            ? 'Udržuj základňu, ktorú už máš, stabilnú: pravidelnú rutinu a ľudí, ktorí sa nemenia.'
            : 'Vybuduj si stabilnú základňu zámerne: rutinu a ľudí, na ktorých sa dá spoľahnúť.',
        Water: present
            ? 'Chráň pokoj, ktorý už máš: skutočný odpočinok a čas premyslieť si veci, kým sa pohneš.'
            : 'Urob zámerne miesto na odpočinok a premýšľanie, kým sa pohneš.',
        Wood: present
            ? 'Ďalej živ rast, ktorý už máš: nové učenie a ľudí, ktorí ťa povzbudzujú.'
            : 'Vyhľadaj zámerne nové učenie a ľudí, ktorí povzbudzujú.',
    })[phase],
    companion: () => 'Nechaj niekoho niesť časť bremena a požiadaj o to včas, nie až keď už nevládzeš.',
    output: () => 'Daj svojej energii ventil, ktorý ťa baví, a používaj ho pravidelne.',
    wealth: () => 'Vyber si niečo hmatateľné, na čom budeš pracovať, a dotiahni to.',
    authority: () => 'Zvoľ si štandard alebo záväzok, ktorý dá tvojej sile tvar.',
};
const FOCUS = {
    collect: 'Uzatváraj, čo začneš: dokonči, zober úrodu a nechaj niečo, čo vytvoríš, zostať tvojím, skôr než začneš ďalšiu vec.',
    answer: 'Daj tlaku kam odísť: povedz nie, povedz, čo si myslíš, urob niečo, čo patrí len tebe. Rátajú sa aj malé odpovede.',
    aim: 'Pomenuj, načo to celé je: vyber si jednu hmatateľnú vec, ktorú budeš budovať pre seba, aby námaha mala kam doraziť.',
    'act-with-others': 'Konaj skôr, než príde pocit úplnej pripravenosti, a rob to spolu s inými: príprava je tvoja sila a ráta sa, až keď vyjde von.',
    channel: 'Vyber si jeden ventil a dokonči veci tam, namiesto začínania na mnohých miestach.',
    pace: 'Stanov si hranicu toho, čo na seba berieš, a drž sa jej, aj keď nová vec vyzerá ľahko.',
    'own-standard': 'Skôr než splníš nejaký štandard, over si, čí štandard to je.',
    act: 'Konaj skôr, než príde pocit úplnej pripravenosti; prijatého bude dosť skôr, než sa zdá.',
    share: 'Nechaj niekedy viesť iných; tvoja sila nezávisí od toho, či stojíš vždy vpredu.',
};
/* ------------------------------------------------------------ evidence */
/** The classical state by its character and what it means, as in the English voice. */
const STATE_GLOSS = {
    prosperous: 'obdobie je tá istá fáza',
    aided: 'obdobie túto fázu živí',
    resting: 'táto fáza živí obdobie',
    trapped: 'táto fáza musí obdobie ovládať',
    dead: 'obdobie túto fázu ovláda',
};
const POLARITY_SK = { Yin: 'jin', Yang: 'jang' };
const w = (value) => weightText(value, ',');
const familyList = (model, order) => order
    .map((family) => {
    const reading = model.families[family];
    const gods = Object.entries(reading.godWeights)
        .sort((a, b) => b[1] - a[1])
        .map(([god, weight]) => `${god} ${w(weight)}`);
    return `${FAMILY_TERM_SK[family]} (${PH[reading.phase].nom}) ${w(reading.weight)}${gods.length ? ` – ${gods.join(', ')}` : ''}`;
})
    .join('; ');
const positionsText = (positions) => positions.map((position) => POSITION_NAME[position]).join(' a ');
function relationLine(claim, model, use) {
    const suffix = {
        main: '',
        folded: ' Číta sa spolu s riadkom vyššie: hovorí to isté.',
        deferred: ' Zaznamenané, v hlavnom texte sa nečíta.',
    }[use];
    const usesHour = claim.restsOnHour ? ' Používa odhadnutú hodinu.' : '';
    const describe = (side) => (side.family === 'self'
        ? `Day Master (${model.dayMaster.stem})`
        : `${side.god ?? FAMILY_TERM_SK[side.family]} (${PH[side.phase].nom}, ${POSITION_NAME[side.position]})`);
    switch (claim.kind) {
        case 'bound':
            return `Spojenie kmeňov: Day Master s ${describe(claim.partner)}. Premena sa netvrdí.${usesHour}${suffix}`;
        case 'clash':
            return `${claim.relation === 'stem' ? 'Stret kmeňov' : 'Stret vetiev'}: ${describe(claim.sides[0])} proti ${describe(claim.sides[1])}; vetva sa číta podľa svojho hlavného skrytého kmeňa.${usesHour}${suffix}`;
        case 'binding':
            return `${claim.relation === 'stem' ? 'Spojenie kmeňov' : 'Šesť harmónií'}: ${describe(claim.sides[0])} s ${describe(claim.sides[1])}. Premena sa netvrdí.${usesHour}${suffix}`;
        case 'pull':
            return `${FAMILY_TERM_SK[claim.controller.family]} ${w(claim.controller.weight)} kontroluje rodinu ${FAMILY_TERM_SK[claim.controlled.family]} ${w(claim.controlled.weight)} v cykle ovládania; obe sú nad rovnomerným podielom mapy.${claim.restsOnHour ? ' Bez odhadnutej hodiny jedna z nich klesne pod tento podiel.' : ''}${suffix}`;
        case 'doubled':
            return `Sebatrestanie: tá istá vetva v pozíciách ${positionsText(claim.sides.map((side) => side.position))}. Sporný výklad.${usesHour}${suffix}`;
        case 'latent':
            return `Čiastočná Trojitá harmónia smerom k živlu ${PH[claim.phase].gen} (${FAMILY_TERM_SK[claim.family]}) v pozíciách ${positionsText(claim.sides.map((side) => side.position))}: dve z troch vetiev, čítané ako skryté.${usesHour}${suffix}`;
        case 'friction':
            return `${claim.category === 'harm' ? 'Šesť škôd' : 'Trest'} v pozíciách ${positionsText(claim.sides.map((side) => side.position))}; jeho váha je medzi školami sporná.${usesHour}${suffix}`;
        default:
            return null;
    }
}
/** The support verdict in all five of the engine's grades (see the English voice). */
const VERDICT = {
    weak: 'Mapa ako celok ti dáva menej, než od teba žiada',
    'moderately-weak': 'Mapa ako celok ti dáva o niečo menej, než od teba žiada',
    balanced: 'Mapa ako celok ti dáva zhruba toľko, koľko od teba žiada',
    'moderately-strong': 'Mapa ako celok ti dáva o niečo viac, než potrebuješ minúť',
    strong: 'Mapa ako celok ti dáva viac, než potrebuješ minúť',
    indeterminate: 'Mapa nerozhoduje, či ti dáva viac, alebo menej, než od teba žiada',
};
/** The grade across the line, completing „za ktorou by ti mapa dávala …“. */
const NEAR_LINE = {
    weak: 'menej, než od teba žiada',
    'moderately-weak': 'o niečo menej, než od teba žiada',
    balanced: 'zhruba toľko, koľko od teba žiada',
    'moderately-strong': 'o niečo viac, než potrebuješ',
    strong: 'viac, než potrebuješ',
    indeterminate: 'nerozhodne',
};
/** „medzi šiestimi známymi znakmi“ - the instrumental a count of characters needs. */
const CHARACTERS_INSTRUMENTAL = { 6: 'šiestimi', 8: 'ôsmimi' };
/* --------------------------------------------------------------- voice */
export const SK_VOICE = {
    time: (claim) => (claim.precision === 'unknown'
        ? `Tvoj čas narodenia nie je známy, preto tento výklad pracuje ${claim.characters === 6 ? 'so šiestimi' : `s ${claim.characters}`} z ôsmich znakov mapy. Hodinový pilier je vynechaný, nie odhadnutý; všetko nižšie sa číta z toho, čo zostáva.${claim.dateBoundary
            ? ` Na dátum tvojho narodenia navyše pripadá zmena solárneho ${claim.dateBoundary.year ? 'roka aj mesiaca' : 'mesiaca'} približne o ${claim.dateBoundary.at}, takže mesačný pilier je pred ňou ${claim.dateBoundary.months[0]} a po nej ${claim.dateBoundary.months[claim.dateBoundary.months.length - 1]}. Výklad nižšie vychádza z toho, ktorý platí na poludnie; pri narodení ${claim.dateBoundary.at < '12:00' ? 'pred' : 'po'} ${claim.dateBoundary.at} by začínal z iného ročného obdobia.`
            : ''}`
        : 'Tvoj čas narodenia je tvoj vlastný odhad, preto sa hodinový pilier číta tak, ako je zadaný, a drží sa voľnejšie než zvyšok. Tvoj základný živel a jeho ročné obdobie od neho nezávisia; kde nejaký bod závisí, výklad to povie.'),
    nature: (claim) => {
        const stem = STEM[claim.stem];
        const opening = `Tvoja mapa sa číta od jedného živlu v jej strede: ${stem.image}. ${stem.tendency}`;
        if (!claim.season)
            return `${opening} ${NO_SEASON}`;
        const { ruling, monthBranch, state } = claim.season;
        const time = ruling === 'Earth' ? (EARTH_MONTH[monthBranch] ?? SEASON_TIME.Earth) : SEASON_TIME[ruling];
        return `${opening} Tvoje narodenie padá do obdobia ${PH[ruling].gen}, do ${time}. ${SK_SEASON_EFFECT[claim.stem][state]}`;
    },
    support: (claim) => {
        const gen = PH[claim.phase].gen;
        const drain = { output: 'z teba čerpá', wealth: 'od teba chce starostlivosť', authority: 'na teba tlačí' }[claim.heaviestDrain] ?? 'ťahá opačne';
        const verdict = VERDICT[claim.tendency];
        const unknown = claim.precision === 'unknown';
        const known = `medzi ${CHARACTERS_INSTRUMENTAL[claim.characters] ?? claim.characters} známymi znakmi`;
        let own;
        if (claim.own === 'alone') {
            own = claim.companions < 0.05
                ? (unknown
                    ? `okrem teba niet ${gen} ${known}, na povrchu ani v skrytých vrstvách, takže vedľa teba tam nestojí nič z tvojho druhu`
                    : `okrem teba v nej niet ${gen} nikde, na povrchu ani v skrytých vrstvách, takže vedľa teba nestojí nič z tvojho druhu`)
                : claim.companions < 0.5
                    ? `okrem teba ${unknown ? `niet ${gen} ${known}` : `na jej povrchu niet ${gen}`} a pod povrchom je ${gen} len stopa`
                    : `okrem teba ${unknown ? `niet ${gen} ${known}` : `na jej povrchu niet ${gen}`}, hoci pod povrchom je ${gen} trochu`;
        }
        else if (claim.own === 'some') {
            own = {
                thin: `okrem teba je v nej ešte trochu ${gen}, ale viac mapy ťa odťahuje, než drží`,
                even: `okrem teba je v nej ešte trochu ${gen} a zhruba rovnako veľa toho, čo ${drain}`,
                ample: `okrem teba je v nej ešte ${gen} a to ťa dobre drží`,
            }[claim.band];
        }
        else {
            own = {
                thin: `je v nej veľa ${gen}, a predsa ťa viac mapy odťahuje, než drží`,
                even: `je v nej okrem teba veľa ${gen} a takmer rovnako veľa toho, čo ${drain}, preto to vychádza vyrovnane, nie silne`,
                ample: 'veľká časť z nej je tvoj vlastný živel a to ťa dobre drží',
            }[claim.band];
        }
        const meaning = {
            thin: {
                output: 'Hovorí to o rovnováhe, nie o sile charakteru: tvoja energia vydrží najdlhšie, keď ju niečo stabilne živí, a míňa sa, keď dávaš bez toho.',
                wealth: 'Hovorí to o rovnováhe, nie o sile charakteru: najlepšie vydržíš, keď ťa niečo stabilne živí, a opotrebúvaš sa, keď nesieš bez toho.',
                authority: 'Hovorí to o rovnováhe, nie o sile charakteru: najlepšie vydržíš, keď ťa niečo stabilne živí, a opotrebúvaš sa, keď plníš nároky bez toho.',
            }[claim.heaviestDrain] ?? 'Hovorí to o rovnováhe, nie o sile charakteru.',
            even: 'Taká rovnováha je užitočná a ľahko sa naruší: máš dosť na to, čo príde, a priveľa ktoréhokoľvek jedného ťahu ju rozhodí.',
            ample: 'Hovorí to o rovnováhe, nie o cnosti: taká sila potrebuje ventil a nepokoj je znakom, že žiadny nemá.',
        }[claim.band];
        /* What the engine's confidence measures (see the English voice): low is a
           missing part, medium a verdict close to the line between two grades. */
        const confidence = claim.confidence === 'low'
            ? (unknown
                ? 'Toto platí voľnejšie než čokoľvek iné tu, lebo s hodinou chýba štvrtina mapy.'
                : 'Ber to zľahka: časť mapy chýba.')
            : claim.confidence === 'high'
                ? (claim.precision === 'approximate' ? 'Mapa je v tomto jasná, aj keď počíta s odhadnutou hodinou.' : 'Mapa je v tomto jasná.')
                : `${claim.nearLine && claim.nearLine !== 'indeterminate'
                    ? `Tento verdikt leží blízko hranice, za ktorou by ti mapa dávala ${NEAR_LINE[claim.nearLine]}, preto ho ber ako sklon, nie ako pevný verdikt.`
                    : 'Tento verdikt leží blízko hranice medzi dvoma čítaniami, preto ho ber ako sklon, nie ako pevný verdikt.'}${claim.precision === 'approximate' ? ' Počíta aj s odhadnutou hodinou.' : ''}`;
        return `${verdict}: ${own}. ${meaning} ${confidence}`;
    },
    lead: (claim) => {
        const { lead, second } = claim;
        const opening = second
            ? (claim.closeness === 'close'
                ? `Tvoju mapu vedú dve veci: ${MEANING[lead.family](lead.phase)} a tesne za tým ${MEANING[second.family](second.phase)}.`
                : `V tvojej mape vážia ${claim.closeness === 'tie' ? 'rovnako' : 'takmer rovnako'} dve veci: ${MEANING[lead.family](lead.phase)} a ${MEANING[second.family](second.phase)}.`)
            : `Najviac váži v tvojej mape ${MEANING[lead.family](lead.phase)}.`;
        const parts = [opening, kinds(lead), BAND_LEAD[claim.band][lead.family]];
        if (second) {
            parts.push(kinds(second));
            if (claim.secondRestsOnHour)
                parts.push('Táto druhá váha pochádza z veľkej časti z odhadnutej hodiny narodenia.');
        }
        return parts.filter(Boolean).join(' ');
    },
    scarce: (claim) => {
        const [first, next] = claim.families;
        const where = claim.partial ? 'známa časť tvojej mapy' : 'mapa';
        const verb = first.weight < 0.05 ? 'nenesie vôbec' : 'takmer nenesie';
        const parts = [
            `To, čo ${where} ${verb}, je ${PH[first.phase].nom}, ${SCARCE_ROLE[first.family]}.`,
            scarceConsequence(first.family, claim.lead, claim.band, claim.present),
        ];
        if (next)
            parts.push(`Málo je tu aj ${PH[next.phase].gen}: ${SCARCE_ROLE[next.family]}.`);
        if (claim.partial)
            parts.push('Chýbajúca hodina to môže zmeniť.');
        return parts.join(' ');
    },
    polarity: (claim) => {
        const yin = claim.dayMaster === 'Yin';
        const text = {
            even: yin
                ? 'Mapa je rovnomerne rozdelená medzi vonkajšie a vnútorné a tvoj vlastný stred je poddajný: vieš tlačiť aj čakať a čakanie ti ide prirodzenejšie.'
                : 'Mapa je rovnomerne rozdelená medzi vonkajšie a vnútorné a tvoj vlastný stred ide dopredu: vieš tlačiť aj čakať a tlačiť ti ide prirodzenejšie.',
            yang: yin
                ? 'Tvoj stred je vnútorný a poddajný a mapa okolo neho sa nakláňa navonok: veľkú časť tvojho tempa určuje tlak okolo teba, nie tvoj vlastný.'
                : 'Ty aj mapa okolo teba sa nakláňate navonok: veci zvykneš riešiť čelom a začínať ich.',
            yin: yin
                ? 'Ty aj mapa okolo teba sa nakláňate dovnútra: veci najprv prijímaš a až potom konáš a k cieľu sa dostávaš vytrvalosťou, nie silou.'
                : 'Tvoj stred ide dopredu, no mapa okolo neho sa nakláňa dovnútra: máš viac rozbehu, než okolie pozýva, a často ho držíš, kým nepríde správna chvíľa.',
        }[claim.lean];
        return claim.restsOnHour ? `${text} Tento sklon závisí od odhadnutej hodiny narodenia.` : text;
    },
    tension,
    tensionStandfirst: 'Kde dve časti mapy ťahajú proti sebe, čítané ako sklony, nie ako verdikty.',
    helps: (claim) => {
        const primary = claim.primary;
        const lacking = primary.weight < 0.5;
        const opening = `${lacking ? 'Čo by ťa držalo v rovnováhe' : 'Čo ťa drží v rovnováhe'}, je ${HELPER[primary.family](primary.phase)}`;
        const parts = [];
        if (claim.bridge) {
            const [from, to] = claim.bridge.between;
            parts.push(`${opening}. V tvojej mape stojí medzi ${BRIDGE_SIDE[from]} a ${BRIDGE_SIDE[to]} a jedno prenáša do druhého, takže sa tie dve prestanú o seba obrusovať; ${presence(primary.weight, claim.partial)}.`);
        }
        else {
            parts.push(`${opening}. ${capitalise(presence(primary.weight, claim.partial))}${lacking ? ', takže to treba zariadiť zámerne, nie čakať, kým to príde' : ''}.`);
        }
        const second = claim.secondary;
        if (second) {
            const text = HELPER[second.family](second.phase);
            parts.push(second.weight < 0.5
                ? `${claim.partial ? 'V známej časti mapy chýba' : 'Chýba'}${lacking ? ' aj' : ' však'} ${text}.`
                : `Potom prichádza ${text}, a aj z toho je tu ${second.weight >= 1 ? 'niečo' : 'trochu'}.`);
        }
        return parts.join(' ');
    },
    cost: (claim) => `${STEM[claim.stem].cost} ${costSentence(claim)}`,
    practice: (claim) => [
        HELPER_PRACTICE[claim.helper.family](claim.helper.phase, claim.helper.weight >= 1),
        FOCUS[claim.focus],
        STEM[claim.stem].practice,
    ].join(' '),
    evidence: {
        standfirst: 'Fakty mapy za každou časťou výkladu, v pojmoch samotnej tradície.',
        nature: (model) => {
            const lines = [
                `Day Master: ${model.dayMaster.stem} (${model.dayMaster.character}), ${POLARITY_SK[model.dayMaster.polarity]} ${PH[model.dayMaster.phase].nom}, kmeň denného piliera.`,
                model.season
                    ? `Mesačná vetva: ${model.season.monthBranch}. Mesiacu vládne ${PH[model.season.ruling].nom}, preto je fáza ${PH[model.dayMaster.phase].gen} v stave ${STATE_CHARACTER[model.season.state]}: ${STATE_GLOSS[model.season.state]}.`
                    : 'Ročné obdobie: výpočet ho neurčil, preto sa sezónny stav nečíta.',
                `Heuristika sily: podpora ${scoreText(model.strength.supportScore, ',')} proti odčerpávaniu ${scoreText(model.strength.drainScore, ',')}, Day Master vychádza ako ${strengthTendencyWord(model.strength.tendency)}, spoľahlivosť ${confidenceWord(model.strength.confidence)}. Je to vyvažovací model výpočtu, nie určenie užitočného živlu (Yong Shen).`,
                `Viditeľné znaky živlu ${PH[model.dayMaster.phase].gen}: ${model.own.visible} z ${model.counts.visibleTotal}, vrátane Day Mastera. Tento počet je samostatný fakt, nie verdikt o sile.`,
            ];
            if (model.time.precision === 'unknown' || !model.time.hour) {
                lines.push(`Hodinový pilier: nevypočítaný. Čas narodenia nie je známy, preto sa číta ${model.counts.visibleTotal} znakov a nič sa neodvodzuje z náhradného poludnia.`);
            }
            else if (model.time.precision === 'approximate') {
                lines.push(model.time.hourAlternatives.length > 0
                    ? `Hodinový pilier: vypočítaný z tvojho odhadnutého času a označený ako približný všade, kde od neho záver závisí. Do dvoch hodín od odhadu by mohol byť aj ${model.time.hourAlternatives.join(' alebo ')}.`
                    : 'Hodinový pilier: vypočítaný z tvojho odhadnutého času a označený ako približný všade, kde od neho záver závisí.');
            }
            return lines;
        },
        energy: (model) => {
            const lines = [
                `Rodiny Desiatich bohov; každý viditeľný kmeň sa počíta ako 1 a každý skrytý kmeň podľa svojho bežného podielu: ${familyList(model, model.ranking)}.`,
                model.scarce.length > 0
                    ? `Pod polovicou váhy jedného znaku: ${model.scarce.map((family) => `${FAMILY_TERM_SK[family]} (${PH[model.families[family].phase].nom})`).join(', ')}.`
                    : 'Žiadna rodina neklesá pod polovicu váhy jedného znaku.',
                `Jin / jang: ${model.polarity.yin} / ${model.polarity.yang}; Day Master je ${POLARITY_SK[model.polarity.dayMaster]}.`,
            ];
            if (model.time.precision === 'approximate') {
                lines.push(`Bez hodinového piliera by poradie bolo: ${model.rankingWithoutHour.map((family) => FAMILY_TERM_SK[family]).join(', ')}.`);
            }
            return lines;
        },
        tension: (model, plan) => {
            const lines = [
                ...plan.tension.flatMap((claim) => [
                    relationLine(claim, model, 'main'), ...claim.also.map((other) => relationLine(other, model, 'folded'))
                ]),
                ...plan.deferred.flatMap((claim) => [
                    relationLine(claim, model, 'deferred'), ...claim.also.map((other) => relationLine(other, model, 'deferred'))
                ]),
            ].filter((line) => Boolean(line));
            lines.push('Spojenia, strety a rámce sa zaznamenávajú len ako štruktúra; žiadna premena sa netvrdí a školy sa líšia v tom, akú váhu im dávajú.');
            return lines;
        },
        steadies: (model, plan) => {
            const helps = plan.helps;
            const rule = {
                thin: 'Pri slabom Day Masterovi sú bežnou podporou Výživa a Seberovní.',
                even: 'Pri vyváženom Day Masterovi výklad hľadá to, čo udrží najťažšie sily v pohybe.',
                ample: 'Pri silnom Day Masterovi sú bežnými ventilmi Tvorba, Majetok a Autorita.',
            }[helps.band];
            const lines = [rule];
            if (helps.bridge) {
                const [from, to] = helps.bridge.between;
                lines.push(`${FAMILY_TERM_SK[from]} a ${FAMILY_TERM_SK[to]} sú dve najťažšie rodiny a stoja v cykle ovládania; ${FAMILY_TERM_SK[helps.primary.family]} stojí medzi nimi v cykle plodenia.`);
            }
            lines.push(`${FAMILY_TERM_SK[helps.primary.family]}: ${PH[helps.primary.phase].nom}, váha ${w(helps.primary.weight)}.`);
            if (helps.secondary) {
                lines.push(`${FAMILY_TERM_SK[helps.secondary.family]}: ${PH[helps.secondary.phase].nom}, váha ${w(helps.secondary.weight)}.`);
            }
            return lines;
        },
        rest: (model, plan) => [
            `Ceny a cvičenia vyplývajú z Day Mastera (${model.dayMaster.stem}), najťažšej rodiny (${FAMILY_TERM_SK[plan.cost.lead.family]}${plan.cost.partner ? `, ktorá sa o vedenie delí s rodinou ${FAMILY_TERM_SK[plan.cost.partner]}` : ''}) a verdiktu o sile (Day Master vychádza ako ${strengthTendencyWord(model.strength.tendency)}). Opisujú sklony, nie udalosti.`,
        ],
    },
};
