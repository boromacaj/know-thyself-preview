/*
 * THE PAIR READINGS, IN SLOVAK.
 *
 * A composed overlay has no fixed string to key a translation from - it builds
 * its paragraph at read time out of parts - so it cannot go in the overlay
 * translation table. It composes in the reader's language instead, which means
 * the frames exist twice and the phrases exist twice, and this file is the
 * second copy.
 *
 * These are written as Slovak, not translated from the English frames. The
 * English argument survives exactly; the sentences are the ones a Slovak editor
 * would write to make it. Tykanie throughout, and gender-free by construction -
 * see SLOVAK_STYLE.md, which is the authority.
 *
 * The phrases below complete a Slovak sentence rather than an English one, so
 * they are not the English `brings`/`needs` rendered word for word: `starts
 * things and carries the decision alone` becomes a clause that fits after `smer
 * ...`, which is a different grammatical job.
 */
/** What each number brings, as a Slovak verb phrase. Completes `<číslo> ...`. */
export const SK_BRINGS = {
    1: 'veci začína a rozhodnutie nesie samo',
    2: 'číta situáciu a pracuje cez ľudí',
    3: 'nájde podobu veci, ktorú druhí prijmú',
    4: 'stavia to, čo drží, a robí časť, do ktorej sa nikto nehrnie',
    5: 'drží možnosti otvorené a učí sa pohybom',
    6: 'berie na seba, či sú ľudia okolo v poriadku',
    7: 'ide pod prvú odpoveď a ostane tam',
    8: 'unesie následky a dá sa mu zveriť veľkosť veci',
    9: 'vidí celok a púšťa vlastný nárok naň',
    11: 'vytuší, čo prichádza, skôr než na to existujú dôkazy',
    22: 'stavia v mierke, ktorá prežije toho, kto stavia',
    33: 'dáva starostlivosť ako prax, nie ako reakciu',
};
/** What each number cannot supply for itself. Completes `... potrebuje`. */
export const SK_NEEDS = {
    1: 'niekoho, kto ostane pri strede veci',
    2: 'chvíľu, v ktorej povie vlastný postoj',
    3: 'termín, ktorý určí niekto iný',
    4: 'dôvod prestať skôr, než je práca dokončená',
    5: 'jednu vec, od ktorej neodíde',
    6: 'dovolenie nechať sa aj opatrovať',
    7: 'dôvod vyjsť von a povedať to nahlas',
    8: 'niečo, pre čo to celé robí',
    9: 'menší okruh, ktorý má právo si niečo pýtať',
    11: 'spôsob, ako to povedať, aby to neznelo ako nárok',
    33: 'miesto, kde sa dávanie smie skončiť',
    22: 'obyčajný deň, z ktorého je tá mierka poskladaná',
};
const ROLE_NAME_SK = {
    'life-path': 'Životná cesta',
    expression: 'Vyjadrenie',
    'soul-urge': 'Túžba duše',
    personality: 'Osobnosť',
};
const brings = (key, fallback) => SK_BRINGS[key] ?? fallback.brings;
const needs = (key, fallback) => SK_NEEDS[key] ?? fallback.needs;
const nom = (role, value) => (role === 'life-path' ? `Životná cesta ${value}` : `${ROLE_NAME_SK[role]} ${value}`);
/* --------------------------------------------- Životná cesta x Vyjadrenie -- */
const LIFE_PATH_EXPRESSION = {
    same: (p) => [
        `Tvoja Životná cesta a tvoje Vyjadrenie sú to isté číslo, čo je zriedkavejšie, než to znie, `
            + `a mení to čítanie celej mapy. Smer, ktorý sa v živote opakuje, aj výbava, ktorú máš na to k dispozícii, `
            + `sú jedna vec: tento život ${brings(p.self, p.selfT)} — a ty tiež. Nič v mape s tým `
            + `nepolemizuje, a preto ťa ľudia, ktorí ťa poznajú, vedia opísať jednou vetou a väčšinou sa `
            + `trafia.`,
        `Cena je druhá polovica toho istého. To, čo ${p.self} potrebuje a samo si to nedodá — `
            + `${needs(p.self, p.selfT)} — tu chýba dvojnásobne a v jadrových pozíciách to nemá čím `
            + `nahradiť. Táto medzera sa zvnútra nezacelí. Hľadať ju u ľudí, s ktorými pracuješ, je `
            + `užitočnejšie než snažiť sa byť menej sebou.`,
    ],
    reinforcing: (p) => [
        `Tvoja ${nom('life-path', p.self)} a tvoje ${nom('expression', p.other)} ťahajú rovnakým `
            + `smerom. Smer ${brings(p.self, p.selfT)}; výbava ${brings(p.other, p.otherT)}. Dve rôzne `
            + `čísla, jeden ťah — takže to, na čo mieriš, a to, čím mieriš, sa zhodujú, a bežné napätie `
            + `medzi zámerom a schopnosťami sa ťa väčšinou netýka.`,
        `O to viac stojí za pomenovanie slepé miesto, lebo mapa, ktorá sama so sebou súhlasí, nemá `
            + `čím sa zachytiť. Ani jedno z čísel nedodá ${needs(p.self, p.selfT)}, a ani jedno tú otázku `
            + `nenastolí. Prejaví sa to opakovaním: tá istá situácia, vstúpená rovnako, v čoraz dlhších `
            + `odstupoch.`,
    ],
    complementary: (p) => [
        `Tvoja ${nom('life-path', p.self)} a tvoje ${nom('expression', p.other)} sa navzájom `
            + `dopĺňajú. Cesta ${brings(p.self, p.selfT)} a potrebuje ${needs(p.self, p.selfT)}; výbava `
            + `${brings(p.other, p.otherT)}, čo je blízko chýbajúcej polovici. Je to funkčné usporiadanie `
            + `a oplatí sa o ňom vedieť, lebo zvnútra nepôsobí ako výhoda — pôsobí, akoby ťa to ťahalo na `
            + `dve strany.`,
        `V praxi z toho vyplýva poradie, nie kompromis. ${p.self} určuje, načo tá vec je; ${p.other} `
            + `rozhoduje, ako sa naozaj urobí. Prehodiť ich — nechať výbavu vybrať cieľ, lebo v nej si `
            + `doma — je presne ten spôsob, akým sa táto dvojica kazí, a vzniká z toho život, ktorý beží `
            + `dobre a dorazí tam, kam si mieriť nechcel.`,
    ],
    crosswise: (p) => [
        `Tvoja ${nom('life-path', p.self)} a tvoje ${nom('expression', p.other)} si naozaj `
            + `protirečia, a oplatí sa tomu rozumieť, nie to riešiť. Cesta ${brings(p.self, p.selfT)}. `
            + `Výbava ${brings(p.other, p.otherT)}. To nie sú dve verzie toho istého pokynu a `
            + `robiť to, čo cesta žiada, spôsobom, ktorý je ti prirodzený, nefunguje.`,
        `Stojí to výkonnosť: veci, ktoré ľuďom so zhodnými číslami idú rýchlo, ti potrvajú dlhšie, a `
            + `budeš pochybovať o postupe, ktorý vlastne nie je zlý. Získavaš tým, že prácu ${p.self} `
            + `robíš spôsobom, akým ju väčšina ľudí na tej ceste robiť nevie — výbavu na obvyklý postup jednoducho `
            + `nemáš. To nie je útecha. Práve odtiaľ pochádza to výnimočné v tomto `
            + `živote a okoliu to býva zjavné dávno predtým než tebe.`,
    ],
};
/* --------------------------------------------- Životná cesta x Túžba duše -- */
const LIFE_PATH_SOUL_URGE = {
    same: (p) => [
        `Tvoja Životná cesta a tvoja Túžba duše sú to isté číslo, takže smer a pohnútka tu nie sú dve `
            + `veci. To, čo život stále žiada, ťa aj napĺňa: toto ${p.self} ${brings(p.self, p.selfT)} a `
            + `robiť to je samo osebe dôvod. Málo energie ti odchádza na zosúlaďovanie toho, čo chceš, s `
            + `tým, čo robíš, a to je skutočná a nie bežná sloboda.`,
        `Riziko nie je rozpor, ale úzkosť záberu. Keď nič iné v jadre nežiada iný druh naplnenia, `
            + `obdobie bez práce typu ${p.self} ťa nechá bez druhého zdroja — a ${needs(p.self, p.selfT)} `
            + `odtiaľto aj tak nikdy prísť nemalo. Oplatí sa postaviť si druhé miesto, kde sa dá stáť, `
            + `skôr než ho budeš potrebovať.`,
    ],
    reinforcing: (p) => [
        `Tvoja ${nom('life-path', p.self)} a tvoja ${nom('soul-urge', p.other)} chcú podobné veci. `
            + `Život ${brings(p.self, p.selfT)}; to, čo ťa napĺňa, ${brings(p.other, p.otherT)}. Nie sú `
            + `totožné a ukazujú rovnakým smerom, takže bežný rozpor medzi povinnosťou a chcením sa ťa `
            + `väčšinou netýka.`,
        `Z toho plynie, že ťa je nezvyčajne ťažké odkloniť — a rovnako pomaly si všimneš, že smer už `
            + `nestojí za to. Ani jedno číslo nedodá ${needs(p.self, p.selfT)}, takže oprava musí prísť `
            + `zvonku, a dopadne len vtedy, keď máš niekoho, koho pohľad naozaj berieš.`,
    ],
    complementary: (p) => [
        `Tvoja ${nom('life-path', p.self)} a tvoja ${nom('soul-urge', p.other)} žiadajú rôzne veci a `
            + `ten rozdiel je plodný, nie protirečivý. Cesta ${brings(p.self, p.selfT)}. To, čo ťa napĺňa, `
            + `${brings(p.other, p.otherT)}. Jedno je, kam život ide; druhé je to, prečo sa oplatí ísť, a `
            + `to druhé je tichšie.`,
        `V praxi to znamená, že práca ${p.self} v sebe potrebuje kus ${p.other}, inak bude pôsobiť `
            + `prázdno a zvonku pritom vyzerať, že sa darí. To je celkom konkrétny a bežný spôsob, ako byť `
            + `nešťastný v živote, ktorý by nikto nenazval neúspešným. Dá sa to napraviť bez zmeny smeru: `
            + `tá požiadavka býva menšia, než sa zdá.`,
    ],
    crosswise: (p) => [
        `Tvoja ${nom('life-path', p.self)} a tvoja ${nom('soul-urge', p.other)} ťahajú proti sebe a `
            + `práve pri tejto dvojici to váži najviac. Život ${brings(p.self, p.selfT)}. To, čo ťa v `
            + `súkromí napĺňa, ${brings(p.other, p.otherT)}. Tie dve veci vedľa seba nesedia a to druhé si `
            + `pravdepodobne berieš ako rozptýlenie od prvého.`,
        `Nie je to rozptýlenie. Je to druhá polovica mapy a potláčať ju je presne to, čo z náročnej `
            + `cesty spraví nevďačnú. Funkčné usporiadanie nie je rovnováha, ale poradie: smer ${p.self} `
            + `sa vyjednať nedá, takže naplnenie typu ${p.other} musí byť zámerne zabudované do tvaru `
            + `týždňa, nie odložené na čas, keď cesta poľaví. Nepoľaví.`,
    ],
};
/* ------------------------------------------------ Vyjadrenie x Osobnosť -- */
const EXPRESSION_PERSONALITY = {
    same: (p) => [
        `Tvoje Vyjadrenie a tvoja Osobnosť sú to isté číslo, takže to, čo vieš, a to, ako vyzeráš, že `
            + `to vieš, je jedna vec. Ľudia stretnú ${p.self} a dostanú ${p.self}. Niet medzery, ktorú by `
            + `treba spravovať, ani vytrvalého nedorozumenia, ktoré treba opravovať, a bežné vyčerpanie `
            + `z toho, že ťa berú ako niečo, čím nie si, jednoducho nepoznáš.`,
        `Výmenou za to ťa rýchlo a natrvalo zaškatuľkujú. Prvý dojem sedí, takže ho nikto neprehodnocuje, `
            + `a schopnosti mimo rozsahu ${p.self} ostanú roky nepovšimnuté — často aj tebou.`,
    ],
    reinforcing: (p) => [
        `Tvoje ${nom('expression', p.self)} a tvoja ${nom('personality', p.other)} si blízko `
            + `zodpovedajú. Výbava ${brings(p.self, p.selfT)}; dojem, ktorý robíš, ${brings(p.other, p.otherT)}. `
            + `Ľudia ťa pri prvom stretnutí čítajú približne správne, a to je skutočná praktická výhoda: `
            + `dostávaš prácu, na ktorú naozaj máš.`,
        `Cenou je úzky záber. Keďže vonkajší signál sedí s výbavou, nič nikoho nenavedie hľadať zvyšok `
            + `— a ${needs(p.self, p.selfT)} ani jedno z tých čísel za teba neinzeruje. Ak chceš, aby ťa `
            + `využívali inak, budeš to musieť povedať výslovne; samo sa to nevyvodí.`,
    ],
    complementary: (p) => [
        `Tvoje ${nom('expression', p.self)} a tvoja ${nom('personality', p.other)} robia rôzne veci a `
            + `spolu im to ide. To, na čo si vybavený, ${brings(p.self, p.selfT)}; spôsob, akým prichádzaš, `
            + `${brings(p.other, p.otherT)}. Dojem otvorí dvere a schopnosť to potom obháji, čo je `
            + `užitočnejšie usporiadanie, než by bolo ktorékoľvek z nich dvakrát.`,
        `Jediná výstraha: nenechaj dojem ${p.other} vypisovať zmenky v mierke, ktorú potom musí `
            + `preplatiť samotné ${p.self}. Táto dvojica sa veľmi dobre dostáva do miestností a práca sa `
            + `potom aj tak musí urobiť tempom, akým výbava naozaj beží.`,
    ],
    crosswise: (p) => [
        `Tvoje ${nom('expression', p.self)} a tvoja ${nom('personality', p.other)} vysielajú rôzne `
            + `signály a rozdiel medzi nimi je zrejme to najúnavnejšie v celej tejto mape. To, na čo si `
            + `vybavený, ${brings(p.self, p.selfT)}. To, čo ľudia stretnú, ${brings(p.other, p.otherT)}. `
            + `Takže ti pravidelne ponúkajú nesprávnu prácu a pravidelne ťa obchádzajú pri tej správnej, a `
            + `ani jedno nie je ničia vina.`,
        `Náprava nie je zmeniť dojem — nie je to výkon a neposunie sa. Je ňou skrátiť vzdialenosť `
            + `medzi tým, kedy ťa niekto stretne, a tým, kedy uvidí, čo naozaj vieš: radšej ukáž skoro, než `
            + `opisuj, a zmier sa s tým, že ľudí, ktorí ťa poznajú dobre, bude vždy málo a budú `
            + `neúmerne dôležití.`,
    ],
};
/* ------------------------------------------------ Túžba duše x Osobnosť -- */
const SOUL_URGE_PERSONALITY = {
    same: (p) => [
        `Tvoja Túžba duše a tvoja Osobnosť sú to isté číslo, takže to, čo ťa napĺňa, aj ukazuješ. `
            + `${p.self} vnútri, ${p.self} navonok: to, čo ľudia stretnú, nie je verzia, a je ti ušetrená `
            + `tá zvláštna osamelosť, keď majú ľudia radi niečo, čím nie si.`,
        `Odvrátenou stranou je vystavenosť. Niet vonkajšej vrstvy, ktorá by niečo zadržala, takže čo ťa `
            + `stojí sily, to vidno — a vidno to skoro. Pre ľudí, ktorí ti prajú, si tým ľahká spoločnosť; `
            + `pre tých ostatných prehľadná mapa.`,
    ],
    reinforcing: (p) => [
        `Tvoja ${nom('soul-urge', p.self)} a tvoja ${nom('personality', p.other)} idú spolu. To, čo ťa `
            + `napĺňa, ${brings(p.self, p.selfT)}; to, čo ukazuješ, ${brings(p.other, p.otherT)}. Vnútorné `
            + `a vonkajšie čítanie si zodpovedajú natoľko, že ľuďom, ktorým sadne povrch, väčšinou sadne aj `
            + `to pod ním — čo pri väčšine ľudí neplatí.`,
        `Keďže niet medzery, niet ani filtra: ${needs(p.self, p.selfT)} sa nepýta, lebo nič v tejto `
            + `dvojici nevytvorí pauzu, v ktorej by sa to dalo. Vyslovovať, čo chceš, je práve tá vec, `
            + `ktorá tomuto usporiadaniu ide najhoršie.`,
    ],
    complementary: (p) => [
        `Tvoja ${nom('soul-urge', p.self)} a tvoja ${nom('personality', p.other)} robia rôznu prácu a `
            + `vyhovuje ti to. V súkromí ${brings(p.self, p.selfT)}; navonok ${brings(p.other, p.otherT)}. `
            + `Povrch nie je prestrojenie — je to použiteľná predná izba a znamená, že si vyberáš, kto `
            + `uvidí zvyšok, namiesto toho, aby sa to z teba dalo prečítať.`,
        `Zámerne používané je to takmer nadanie a má jedno zlyhanie: v prednej izbe sa dá celkom `
            + `pohodlne bývať. Keď sa naplnenie typu ${p.self} dosť dlho nespomína, prestane sa sýtiť — a `
            + `povrch pritom funguje ďalej bez chyby, zatiaľ čo niečo za ním stíchne.`,
    ],
    crosswise: (p) => [
        `Tvoja ${nom('soul-urge', p.self)} a tvoja ${nom('personality', p.other)} sú takmer opaky a `
            + `ľudia, ktorí ťa poznajú len spoločensky, ťa nepoznajú vôbec. To, čo ťa napĺňa, `
            + `${brings(p.self, p.selfT)}. To, čo ukazuješ, ${brings(p.other, p.otherT)}. Ten odstup nie je tvoja stavba a nie je to `
            + `nečestnosť; je to jednoducho to, čo táto mapa robí.`,
        `Vzniká z toho spoľahlivé a celkom konkrétne nedorozumenie: pozývajú ťa na nesprávne veci `
            + `ľudia, ktorí to myslia dobre. Užitočnou odpoveďou nie je otvoriť sa všetkým, ale lepšie `
            + `vyberať — pár ľudí, ktorí dostanú verziu ${p.self}, a to zámerne povedanú, nie náhodou `
            + `objavenú.`,
    ],
};
export const SK_FRAMES = {
    'life-path|expression': LIFE_PATH_EXPRESSION,
    'life-path|soul-urge': LIFE_PATH_SOUL_URGE,
    'expression|personality': EXPRESSION_PERSONALITY,
    'soul-urge|personality': SOUL_URGE_PERSONALITY,
};
/** The master-over-root reading, in Slovak. */
export function skMasterRoot(master, root, masterT, rootT) {
    return [
        `${root} je pod tým stále a má to svoju váhu. ${master} `
            + `${brings(master, masterT)}; ${root} ${brings(root, rootT)}. Je to ten istý smer v dvoch `
            + `mierkach a ${master} nie je lepšie ${root} — je to ${root}, od ktorého sa žiada práca vo `
            + `veľkosti, ktorá nie vždy sadne dňu, v ktorom práve je.`,
        `Preto poctivé čítanie majstrovského čísla obsahuje aj ten návrat. Pri únave, tlaku alebo v `
            + `obyčajných týždňoch to funguje ako ${root}, a to nie je zlyhanie čísla — je to číslo, ktoré `
            + `oddychuje. Pascou je vysvetľovať si obdobia ${root} ako dôkaz, že sa v sebe mýliš.`,
    ];
}
