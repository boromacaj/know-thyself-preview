/*
 * SLOVAK OVERLAY PROSE - batch overlays-02: five-phase surplus and shortage,
 * and the Human Design conditionals.
 *
 * These are the paragraphs a chart earns from its wider distribution rather
 * than from its Day Master alone, plus the three that qualify a Manifesting
 * Generator by its Authority, Profile and Definition. Every one of them was
 * being deleted from Slovak readings before the resolver kept overlay prose
 * across the translation step.
 *
 * TERMS. The canonical names stay: Day Master, Manifesting Generator, Sacral,
 * Solar Plexus, Authority as a system name. The phases are translated - drevo,
 * oheň, zem, kov, voda - because SLOVAK_STYLE.md says a phase is a phase and
 * the pillar screen already names them that way.
 *
 * The closing paragraph on every shortage overlay is the same sentence in
 * English and is the same sentence here: it is the reading's standing
 * disclaimer that a cost is not a limit, and it must not drift between phases.
 */
/** The shared closing note on every shortage reading. */
const NOT_A_LIMIT = 'Nič z toho nie je hranica toho, čo dokážeš. Je to výpoveď o tom, čo ťa to '
    + 'stojí, a tie dve veci sa pravidelne zamieňajú — väčšinou tým, kto platí. Mapa čítaná takto '
    + 'nedostáva pokyn skúšať menej. Dostáva pokyn byť oveľa zámernejšia v tom, kam idú rezervy, a '
    + 'brať otázku, kto ich dopĺňa, ako skutočnú otázku, nie ako rozmaznanosť.';
export const OVERLAYS02_SK = {
    /* ---------------------------------------------------------------- oheň */
    'bazi.day-master.fire.excess': [
        'Širšie rozloženie to ešte zosilňuje. Ohňa je v tejto mape veľa a oheň v prebytku spaľuje '
            + 'vlastné palivo rýchlejšie, než ho čokoľvek dopĺňa. Vzniká z toho skutočná žiara s krátkym '
            + 'trvaním: intenzita, ktorá presvedčí celú miestnosť a nedá sa udržať za sezónu, v ktorej '
            + 'vznikla.',
        'Prejavuje sa to aj ako život usporiadaný okolo toho byť videný, kde sa viditeľnosť ticho '
            + 'stala zmyslom namiesto vedľajšieho produktu. Protiváhou, ktorú tradícia menuje, je voda — '
            + 'chladí a prehlbuje, čo v praxi znamená súkromie, uvažovanie a obdobia, v ktorých sa pre '
            + 'nikoho nič nehrá.',
    ],
    'bazi.day-master.fire.deficient': [
        'Širšie rozloženie ide opačným smerom. Ohňa je v tejto mape málo, takže vonkajší prejav nie je '
            + 'samozrejmý. Tento Day Master vie, čo si myslí, a zakaždým sa musí rozhodnúť, že to niekomu '
            + 'urobí dôležitým — a to rozhodovanie je namáhavé spôsobom, ktorý ľudia s ohňom nazvyš ťažko '
            + 'uznajú.',
        'Praktický dôsledok je, že uznanie tu váži viac, než sa zvyčajne pripúšťa, práve preto, že si '
            + 'ho mapa sama nevyrobí. Zariadiť, aby prácu videl niekto, na koho názore záleží, nie je v '
            + 'tejto zostave márnivosť; je to zásobovacia trasa.',
        NOT_A_LIMIT,
    ],
    /* ----------------------------------------------------------------- kov */
    'bazi.day-master.metal.excess': [
        'Širšie rozloženie to výrazne zaostruje. Kovu je v tejto mape veľa a kov v prebytku reže do '
            + 'živého: nároky uplatnené tam, kde o ne nikto nežiadal, čisto vedené oddelenia, ktoré vôbec '
            + 'nemuseli nastať, a prísnosť, ktorú ten, kto ju nesie, zažíva jednoducho ako presnosť.',
        'Najviac sa to ukáže vo vzťahoch, kde úsudok prichádza rýchlejšie než znášanlivosť a býva '
            + 'správny — čo je práve to, čo sa naň ťažko namieta. Protiváhou, ktorú tradícia menuje, je '
            + 'oheň: zmäkčí kov natoľko, aby sa dal spracovať, čiže vrelosť a situácie, v ktorých je '
            + 'štedrosť dôležitejšia než mať pravdu.',
    ],
    'bazi.day-master.metal.deficient': [
        'Širšie rozloženie ide opačným smerom. Kovu je v tejto mape málo, takže dokončiť, zahodiť a '
            + 'povedať potrebnú tvrdú vetu sú zámerné úkony, nie reflexy. Veci sa začnú a ostanú otvorené; '
            + 'ťažký rozhovor sa odloží z dôvodov, ktoré sú zakaždým úprimné.',
        'Praktický zásah je tu nezvyčajne účinný a nezvyčajne nevďačný: vonkajšie termíny, redaktor, '
            + 'niekto oprávnený vyhlásiť vec za hotovú. Mapy s nedostatkom kovu zvyknú podceňovať, koľko z '
            + 'nesenej záťaže pochádza zo zoznamu nedokončených vecí, a nie zo samotnej práce.',
        NOT_A_LIMIT,
    ],
    /* ---------------------------------------------------------------- voda */
    'bazi.day-master.water.excess': [
        'Širšie rozloženie to rozptyľuje. Vody je v tejto mape veľa a voda v prebytku ide naraz do '
            + 'priveľa smerov a nič nedrží: hĺbka bez brehov, pohyb bez koryta a značná inteligencia '
            + 'minutá na možnosti namiesto na ktorúkoľvek z nich.',
        'Ukazuje sa to aj ako prirodzená uzavretosť prerastená cez svoju užitočnosť — informácie '
            + 'zadržané zo zvyku, nie z dôvodu, ktorý by sa dal vysloviť. Protiváhou, ktorú tradícia '
            + 'menuje, je zem: dá vode kde sadnúť, čiže poriadok dňa, záväzok a štruktúry, ktoré sa '
            + 'nepohnú s náladou.',
    ],
    'bazi.day-master.water.deficient': [
        'Širšie rozloženie ide opačným smerom. Vody je v tejto mape málo, takže uvažovanie sa samo od '
            + 'seba nedeje. Táto zostava sa hýbe rýchlejšie, než sa učí, a tá medzera sa neohlási: všetko '
            + 'pôsobí produktívne a tá istá kategória chyby prichádza znova v novom obleku.',
        'Zámerne postavené pauzy tu vynesú viac než takmer akýkoľvek iný zásah — prehľad, ktorý je '
            + 'naplánovaný, nie pocítený ako potrebný, a zvyk zapísať si, čo sa stalo, skôr než sa určí, '
            + 'čo to znamenalo. Malá disciplína s neúmerným výnosom.',
        NOT_A_LIMIT,
    ],
    /* ----------------------------------------------------------------- zem */
    'bazi.day-master.earth.excess': [
        'Širšie rozloženie to posúva smerom k ťažobe. Zeme je v tejto mape veľa a zem v prebytku je '
            + 'hmota bez pohybu: pozície držané za hranicu ich užitočnosti, starosť krúžiaca po tom istom '
            + 'bez rozuzlenia, záväzky podržané dávno po tom, čo prestali žiť.',
        'Zo dňa na deň to vyzerá ako silné uprednostňovanie usporiadania, ktoré už existuje, pomalosť '
            + 'v konaní vydávaná za opatrnosť a zvyk brať si cudzie problémy ako spôsob, ako neriešiť '
            + 'vlastné. Protiváhou, ktorú tradícia menuje, je drevo: rozlomí zliatu pôdu, čiže niečo, čo '
            + 'tlačí zvonku a nedá sa vstrebať.',
    ],
    'bazi.day-master.earth.deficient': [
        'Širšie rozloženie ide opačným smerom. Zeme tu okrem samotného Day Mastera veľa nie je, takže '
            + 'kmeň drží bez veľkého zázemia. V praxi sa to číta ako schopnosť bežiaca blízko svojej '
            + 'hranice: unesieš, čo sa od teba žiada, a keď príde niečo nečakané, veľa nazvyš nezostáva.',
        'Dôsledok je o tempe, nie o kapacite. Mapa v takomto stave odvedie najlepšiu prácu v '
            + 'podmienkach, na ktoré sa dá spoľahnúť — stále usporiadania, známa pôda, ľudia, od ktorých '
            + 'sa niečo vracia — a zle jej je v prostredí, ktoré žiada nepretržité prispôsobovanie. Oplatí '
            + 'sa to vedieť, lebo takto ústretová povaha na náročné prostredie väčšinou najprv kývne a cenu '
            + 'si všimne až potom.',
        NOT_A_LIMIT,
    ],
    /* --------------------------------------------------------------- drevo */
    'bazi.day-master.wood.excess': [
        'Širšie rozloženie to posúva ešte ďalej vlastným smerom. Dreva je v tejto mape veľa a fáza v '
            + 'prebytku sa nestáva väčšou cnosťou — stáva sa tým, proti čomu treba pracovať. Drevo v '
            + 'prebytku je rast bez redaktora: viac začatých smerov, než jeden život unesie, a úprimné '
            + 'presvedčenie, že všetky sú stále živé.',
        'Zo dňa na deň to vyzerá ako človek s priveľa plánmi a naozajstnou nechuťou ktorýkoľvek z nich '
            + 'opustiť, lebo opustiť jeden pôsobí ako zlyhanie odvahy, nie ako rozhodnutie. Prejavuje sa to '
            + 'aj ako zásada držaná za bod, kde už niečomu slúži. Protiváhou, ktorú tradícia menuje, je '
            + 'kov: prerezáva — čiže v praxi vonkajší termín, redaktor alebo niekto oprávnený povedať, že '
            + 'toto je hotové a zvyšok sa konať nebude.',
    ],
    'bazi.day-master.wood.deficient': [
        'Širšie rozloženie ide opačným smerom. Dreva je v tejto mape okrem samotného Day Mastera málo, '
            + 'takže kmeň rastie bez veľkého zázemia. V praxi sa to číta ako smer, ktorý treba zvoliť '
            + 'zámerne, nie pocítiť: ťah dopredu jednoducho nebeží na pozadí tak, ako pri mape s drevom '
            + 'nazvyš.',
        'Je to výpoveď o tom, čo úsilie stojí, nie o kapacite, a tie dve sa pravidelne zamieňajú — '
            + 'väčšinou tým, kto platí. Mapám v tomto stave svedčí vonkajšia štruktúra, ktorá dodá hybnosť '
            + '— už prijatý záväzok, človek, ktorý niečo k dátumu čaká — a nesvedčia im otvorené situácie, '
            + 'kde je jediným zdrojom pohybu chuť naň.',
        NOT_A_LIMIT,
    ],
    /* ------------------------------------------------------- Human Design */
    'hd.mg.authority.sacral': [
        'Tú rýchlosť riadi tvoja Authority a tu je ňou Sacral. Znamená to, že rozhodnutie padá v tele, '
            + 'nie v rozbore, a padá vo chvíli, keď je otázka naozaj položená. Odpoveď príde ako okamžité '
            + 'otvorenie alebo zatvorenie — niečo v tebe sa k tomu nakloní alebo nie — a vtedy je presná, '
            + 'kým o hodinu neskôr, keď myseľ poskladá argumentáciu, presná zďaleka nie je.',
        'Oplatí sa to starostlivo spájať s rýchlosťou opísanou vyššie, lebo tie dve sa ľahko zamenia. '
            + 'Rýchlosť je to, čo nastane po áno. Samotné áno nie je presne vzaté rýchle; je okamžité, a to '
            + 'je niečo iné. Tomuto dizajnu sa nekazí to, že sa hýbe priveľmi rýchlo — kazí sa mu pohyb na '
            + 'rozhodnutí, ktoré telo nikdy neurobilo, zvyčajne na takom, čo myseľ poskladala, lebo '
            + 'príležitosť vyzerala na papieri dobre. Na tie sa energia nedostaví a vyčerpanie, ktoré '
            + 'nasleduje, je najjasnejší signál, že to áno nikdy nebolo skutočné.',
        'V praxi si to žiada niečo mierne nepohodlné: dostávať skutočné otázky v podobe, na ktorú vie '
            + 'telo odpovedať. Nahlas, áno alebo nie, od niekoho ochotného spýtať sa priamo. A žiada si to '
            + 'prijať nie, ktoré neprichádza so žiadnym odôvodnením — čo býva pre väčšinu ľudí tá ťažšia '
            + 'polovica pokynu.',
    ],
    'hd.mg.authority.emotional': [
        'Tú rýchlosť riadi tvoja Authority a v tejto zostave ide proti srsti samotného typu. Emotional '
            + 'authority znamená definovaný Solar Plexus a systém je v tom jednoznačný: v danej chvíli '
            + 'niet dostupnej jasnosti. Čo v jednom bode emocionálnej vlny pôsobí zjavne správne, v inom '
            + 'pôsobí zjavne nesprávne — a ani jedno z tých čítaní nie je odpoveď.',
        'Pre Manifesting Generatora je to naozaj nepohodlná dvojica a oplatí sa to pomenovať, nie '
            + 'obchádzať. Dizajn je stavaný na okamžitý pohyb a autorita si žiada čakanie — nie zvažovanie, '
            + 'ktoré myseľ ochotne urobí namiesto toho, ale jednoducho nechať prejsť čas a položiť si tú '
            + 'istú otázku viackrát. Takmer každý vážny prešľap dostupný tejto kombinácii vzniká z konania '
            + 'na hrebeni vlny.',
    ],
    'hd.mg.profile.5-1': [
        'Zvonku to celé prichádza zabalené v profile 5/1. Kým typ opisuje motor a autorita riadenie, '
            + 'profil opisuje, čo ľudia vidia, keď tie dve idú okolo — a tento vysvetľuje vzorec, ktorý '
            + 'takmer isto poznáš, aj keď preň nemáš meno.',
        'Vedomá 5 je najviac premietaná línia v celom systéme. Ľudia si o tebe utvoria očakávanie skôr, '
            + 'než majú veľa dôkazov, a tým očakávaním je takmer vždy, že niečo vyriešiš. V spojení s '
            + 'viditeľnou rýchlosťou Manifesting Generatora sa to násobí: pôsobíš schopnejšie, rýchlejšie a '
            + 'dostupnejšie, než by uniesol akýkoľvek skutočný odhad, a povesť ti beží dopredu do '
            + 'miestností, kde ťa ešte nikto nevidel. Keď to dodáš, drží to a otvára dvere. Keď nie — '
            + 'alebo keď sa pohyb stal na niečom, s čím telo nesúhlasilo — projekcia sa tvrdo obráti a to '
            + 'obrátenie pôsobí neprimerane, lebo neprimerané je.',
        'Nevedomá 1 pod tým je protiváha a práve ona v tomto dizajne ticho pracuje. Jednotka potrebuje '
            + 'základ, ktorý si sama overila. Číta až na dno, nedôveruje zhrnutiu a hĺbku si zbiera v '
            + 'súkromí dávno predtým, než je príležitosť ju použiť. Preto sa tá kombinácia drží pokope a '
            + 'nerozpadá sa: päťke stále podávajú problémy, o ktoré nežiadala, a jednotka si to väčšinou už '
            + 'prečítala.',
        'Keď sa tie tri vrstvy poskladajú, vznikne z toho použiteľný tvar. Počkaj, kým vec príde, a '
            + 'nechaj na ňu odpovedať telo, lebo päťke sa toho bude ponúkať veľa a väčšina z toho nie je '
            + 'tvoja. Hovor, čo robíš: konáš rýchlo a na očiach a ľudia si medzery ticho dopĺňajú domnienkami. A '
            + 'potom nechaj jednotku robiť, čo robí, a daj jej čas, ktorý potrebuje — tvoja povesť stojí na '
            + 'hĺbke, ktorú dodáva jednotka, nie na rýchlosti, ktorú pripisujú päťke.',
    ],
    'hd.mg.definition.split': [
        'Jedna štrukturálna vec toto všetko upravuje. Tvoja definícia je split, čiže definované časti '
            + 'dizajnu spadajú do dvoch skupín, ktoré nespája žiadny kanál. Praktický účinok je, že istí '
            + 'ľudia ti tú medzeru zatvárajú a byť pri nich pôsobí, akoby niečo zapadlo na miesto. Je to '
            + 'skutočný účinok a oplatí sa poznať riziko, ktoré s ním prichádza: úľavu zo zatvorenej '
            + 'medzery si ľahko pomýliť s tým, že sa k sebe hodíte — a nie je to ten istý signál ako '
            + 'sacrálne áno.',
    ],
};
