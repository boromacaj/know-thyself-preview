import { activeLocale } from '../../i18n/locale.js?v=b5ef5ed';
const FUNCTION = {
    sun: {
        does: 'being a self that other people can locate',
        wants: 'a sign that lets it take up room without apologising',
        strains: 'run on borrowed identity, doing the thing that gets approval rather than the thing that is yours',
    },
    moon: {
        does: 'settling, resting, and knowing what you actually need',
        wants: 'a sign that permits softness and does not treat need as a fault',
        strains: 'manage feeling rather than have it, which works and costs',
    },
    mercury: {
        does: 'thinking, naming and getting an idea from one head into another',
        wants: 'a sign that likes detail and holds still long enough to check',
        strains: 'reach for the impression rather than the accurate account',
    },
    venus: {
        does: 'valuing, wanting, and knowing what a thing is worth to you',
        wants: 'a sign that lets pleasure be uncomplicated',
        strains: 'earn closeness rather than accept it, and to negotiate what should be given',
    },
    mars: {
        does: 'wanting something enough to go and get it',
        wants: 'a sign that permits a direct move and a clean refusal',
        strains: 'route force through other people, which arrives late and arrives sideways',
    },
    jupiter: {
        does: 'trusting that more is available than is currently visible',
        wants: 'a sign with room in it for the unproven',
        strains: 'shrink the estimate, calling caution realism',
    },
    saturn: {
        does: 'holding a limit, and building the thing that has to last',
        wants: 'a sign that respects structure rather than resenting it',
        strains: 'over-correct - either rigid where it should bend, or absent where it should hold',
    },
};
/* ------------------------------------------------------------------ English */
/*
 * THIS PLANET FIRST, THEN WHAT THE DIGNITY IS.
 *
 * Each state is authored as three paragraphs, and the split is deliberate:
 *
 *   1. THIS placement. Names the planet, and what its own function does here.
 *      Unique to every planet, and never deduplicated.
 *   2. THE CONCEPT. What a domicile, an exaltation, a detriment, a fall or a
 *      peregrine placement IS. Identical wording wherever it appears, with no
 *      interpolation at all, so SectionBuilder's opening-sentence dedup keeps
 *      the first one and drops the rest.
 *   3. THE TRADE-OFF. Also generic, also caught by the same pass.
 *
 * It used to be two paragraphs, with the concept welded into the middle of the
 * first one behind a planet-specific opener. The dedup could not see it: the
 * explanation of what peregrine means survived 4.1 times per reading while the
 * paragraph below it was correctly caught once. A chart with five peregrine
 * planets told the reader five times what peregrine means.
 *
 * Nothing is deleted by this file. The first planet in each state explains the
 * state, and the rest get on with being planets.
 */
const EN = {
    Domicile: (planet, f) => [
        `One structural detail changes how all of this operates: ${planet} is in its own sign here, `
            + `the strongest position the tradition offers. `
            + `${f.does[0].toUpperCase()}${f.does.slice(1)} happens without anything in the chart having `
            + `to authorise it first.`,
        `A planet in its own sign is a function that has never been obstructed, which is exactly why `
            + `it is unlikely to feel like a strength. It feels like the obvious way to do things.`,
        `What it actually buys is that this part of you is not up for negotiation. The cost is the `
            + `matching blind spot: because it costs you little, it is easy to underestimate what the same `
            + `thing can cost someone else, and to read their difficulty here as unwillingness rather than `
            + `as difficulty.`,
    ],
    Exaltation: (planet, f) => [
        `There is a condition attached to this that is worth naming: ${planet} is exalted in this `
            + `sign. ${f.does[0].toUpperCase()}${f.does.slice(1)} tends to come out here in a clear, `
            + `well-formed version.`,
        `The tradition treats an exaltation as an honoured guest rather than an owner. The function is `
            + `welcomed and shown at its best, which is a real advantage and not quite the same thing as `
            + `being at home with the run of the house.`,
        `The catch in an exaltation is that the reception can be better than the fit. This part of you `
            + `can win credit easily, sometimes before the substance is fully there, and the `
            + `credit is pleasant enough that it is easy to live on. What keeps it honest is doing the `
            + `unglamorous version of this function occasionally - the version nobody praises.`,
    ],
    Detriment: (planet, f) => [
        `One condition runs underneath all of this: ${planet} is in detriment here, sitting opposite `
            + `the sign it rules. The function wants ${f.wants}, and this sign is built the other way, so `
            + `${f.does} is something you do deliberately rather than something that simply happens. `
            + `Under pressure it tends to ${f.strains}.`,
        `A planet in detriment is a function operating without its usual supports. The tradition is `
            + `blunt that this is not a bad placement, and that distinction is worth holding onto: it is `
            + `a statement about effort rather than about outcome.`,
        `What it can produce is a competence the comfortable version never needs to develop. What `
            + `would otherwise come by reflex is learned here consciously, and that is why it can be `
            + `explained, taught, and done under conditions where a reflex would simply fail.`,
    ],
    Fall: (planet, f) => [
        `There is a difficulty built into this placement that is worth understanding rather than `
            + `fighting: ${planet} is in its fall here, opposite the sign of its exaltation. `
            + `${f.does[0].toUpperCase()}${f.does.slice(1)} tends to happen quietly, or late, or with an `
            + `apology attached to it.`,
        `Where a detriment lacks the sign's support, a fall meets something closer to a low opinion. `
            + `The function is not merely unsupported but somewhat unwelcome, which is a different problem `
            + `and takes a different answer.`,
        `What this tends to produce is a habit of not asking. The function goes underground, `
            + `gets met privately, and shows up as a low-grade sense that this particular area is simply `
            + `harder for you. What eases it is not effort, which tends to make it worse, but permission: `
            + `treating the need behind it as legitimate rather than as something to be managed.`,
    ],
    Peregrine: (planet, f) => [
        `${planet} is peregrine here - in a sign where it is in none of the four major conditions `
            + `(domicile, exaltation, detriment or fall), neither at home nor in exile. ${f.does[0].toUpperCase()}${f.does.slice(1)} therefore looks `
            + `different in different parts of your life, in a way that can be genuinely confusing to `
            + `people who know you in only one context.`,
        `The tradition reads a peregrine planet as a function with no fixed address. It takes its `
            + `character from whatever else in the chart is speaking loudest, which is why the same `
            + `placement can look unlike itself from one part of a life to the next.`,
        `This is the most common condition and the least dramatic, and its practical consequence is `
            + `that the placement responds to what you decide to do with it. A planet at `
            + `home will behave the same way whatever you intend. This one will not, which makes it worth `
            + `pointing deliberately rather than leaving to whatever the environment supplies.`,
    ],
};
/* ------------------------------------------------------------------- Slovak */
const SK_FUNCTION = {
    sun: {
        does: 'byť sebou tak, aby sa to dalo nájsť',
        wants: 'znamenie, ktoré dovolí zabrať priestor bez ospravedlňovania',
        strains: 'bežať na požičanej totožnosti a robiť to, za čo je uznanie, namiesto toho, čo je tvoje',
    },
    moon: {
        does: 'usadiť sa, odpočívať a vedieť, čo naozaj potrebuješ',
        wants: 'znamenie, ktoré pripúšťa mäkkosť a neberie potrebu ako chybu',
        strains: 'city spravovať namiesto prežívať — funguje to a niečo to stojí',
    },
    mercury: {
        does: 'myslieť, pomenovať a dostať myšlienku z jednej hlavy do druhej',
        wants: 'znamenie, ktoré má rado podrobnosť a vydrží stáť dosť dlho na overenie',
        strains: 'siahnuť po dojme namiesto po presnom opise',
    },
    venus: {
        does: 'oceňovať, chcieť a vedieť, akú má pre teba vec hodnotu',
        wants: 'znamenie, ktoré nechá potešenie byť jednoduchým',
        strains: 'blízkosť si zaslúžiť namiesto prijať a vyjednávať o tom, čo sa má dávať',
    },
    mars: {
        does: 'chcieť niečo natoľko, že sa po tom vyberieš',
        wants: 'znamenie, ktoré dovolí priamy krok a čisté odmietnutie',
        strains: 'viesť silu cez druhých — dorazí neskoro a nabok',
    },
    jupiter: {
        does: 'dôverovať, že je poruke viac, než práve vidno',
        wants: 'znamenie, v ktorom je miesto pre nepodložené',
        strains: 'zmenšovať odhad a nazývať opatrnosť realizmom',
    },
    saturn: {
        does: 'držať hranicu a stavať to, čo má vydržať',
        wants: 'znamenie, ktoré štruktúru rešpektuje, nie znáša',
        strains: 'prestreliť opravu — buď tuhne tam, kde má povoliť, alebo chýba tam, kde má držať',
    },
};
/* The same three-paragraph split as EN above, and for the same reason: the
   middle paragraph is the CONCEPT, identical wherever it appears, so the
   reading explains what a peregrine placement is exactly once. */
const SK = {
    Domicile: (planet, f) => [
        `Jedna štrukturálna vec mení, ako toto celé funguje: ${planet} je tu vo vlastnom znamení, `
            + `v najsilnejšej polohe, akú tradícia pozná. ${f.does[0].toUpperCase()}${f.does.slice(1)} sa `
            + `deje bez toho, aby to čokoľvek v mape muselo najprv povoliť.`,
        `Planéta vo vlastnom znamení je funkcia, ktorej nikdy nič neprekážalo — a práve preto `
            + `nepôsobí ako schopnosť. Pôsobí ako samozrejmý spôsob, akým sa veci robia.`,
        `Získavaš tým, že táto tvoja časť nie je na vyjednávanie. Cenou je zodpovedajúce slepé miesto: `
            + `keďže teba to stojí málo, ľahko podceníš, čo to isté môže stáť niekoho iného, a jeho ťažkosť `
            + `si prečítaš ako neochotu, nie ako ťažkosť.`,
    ],
    Exaltation: (planet, f) => [
        `Je k tomu pripojená jedna podmienka, ktorú sa oplatí pomenovať: ${planet} je v tomto znamení `
            + `v exaltácii. ${f.does[0].toUpperCase()}${f.does.slice(1)} tu zvykne vychádzať v jasnej, `
            + `vydarenej podobe.`,
        `Exaltáciu berie tradícia ako váženého hosťa, nie majiteľa. Funkciu tu vítajú a ukazujú v jej `
            + `najlepšom svetle, čo je skutočná výhoda — a nie celkom to isté ako byť doma a mať celý dom `
            + `pre seba.`,
        `Háčik exaltácie je v tom, že prijatie môže byť lepšie než skutočná zhoda. Táto tvoja časť `
            + `môže ľahko získať kredit, niekedy skôr, než je látka celkom na mieste, a ten kredit je `
            + `dosť príjemný na to, aby sa z neho dalo žiť. Poctivé to udrží občasné robenie nevďačnej `
            + `verzie tejto funkcie — tej, ktorú nikto nechváli.`,
    ],
    Detriment: (planet, f) => [
        `Pod týmto všetkým beží jedna podmienka: ${planet} je tu v detrimente, oproti znameniu, `
            + `ktorému vládne. Funkcia chce ${f.wants} a toto znamenie je postavené opačne, takže `
            + `${f.does} je niečo, čo robíš zámerne, nie niečo, čo sa jednoducho deje. Pod tlakom to `
            + `zvykne ${f.strains}.`,
        `Planéta v detrimente je funkcia pracujúca bez zvyčajných opôr. Tradícia otvorene hovorí, že `
            + `to nie je zlé postavenie, a ten rozdiel sa oplatí držať: je to výpoveď o úsilí, nie `
            + `o výsledku.`,
        `Môže z toho vzniknúť schopnosť, akú pohodlná verzia nikdy nepotrebuje vyvinúť. To, čo by inak `
            + `prišlo z reflexu, sa tu učí vedome. Práve preto sa to dá vysvetliť, naučiť iných a urobiť `
            + `aj za podmienok, v ktorých by reflex zlyhal.`,
    ],
    Fall: (planet, f) => [
        `V tomto postavení je zabudovaná ťažkosť, ktorej sa oplatí rozumieť, nie s ňou bojovať: `
            + `${planet} je tu v páde, oproti znameniu svojej exaltácie. `
            + `${f.does[0].toUpperCase()}${f.does.slice(1)} sa zvykne diať potichu, neskoro alebo `
            + `s ospravedlnením.`,
        `Kým detrimentu chýba podpora znamenia, pád naráža na niečo bližšie k nízkej mienke. Funkcia `
            + `nie je len bez opory, ale aj tak trochu nevítaná — čo je iný problém a chce inú odpoveď.`,
        `Zvykne z toho vzniknúť zvyk nepýtať si. Funkcia ide do podzemia, vybavuje sa v súkromí `
            + `a prejaví sa ako tichý pocit, že práve táto oblasť je pre teba ťažšia. Neuľahčí to úsilie, `
            + `ktoré to skôr zhoršuje, ale dovolenie: brať potrebu za tým ako oprávnenú, nie ako niečo `
            + `na spravovanie.`,
    ],
    Peregrine: (planet, f) => [
        `${planet} je tu peregrinná — v znamení, kde nie je v žiadnom zo štyroch hlavných postavení `
            + `(domicil, exaltácia, exil, pád), ani doma, ani vo vyhnanstve. ${f.does[0].toUpperCase()}${f.does.slice(1)} preto vyzerá v rôznych častiach `
            + `tvojho života rôzne — spôsobom, ktorý vie poriadne zmiasť ľudí poznajúcich ťa len z jedného `
            + `prostredia.`,
        `Peregrinnú planétu číta tradícia ako funkciu bez stálej adresy. Berie si povahu od toho, čo `
            + `v mape hovorí najhlasnejšie — a práve preto to isté postavenie môže v rôznych častiach `
            + `života pôsobiť ako niečo iné.`,
        `Je to najbežnejší a najmenej dramatický stav a v praxi z neho vyplýva, že toto postavenie `
            + `citlivo reaguje na to, čo sa s ním rozhodneš robiť. Planéta doma sa bude správať `
            + `rovnako, nech zamýšľaš čokoľvek. Táto nie — a preto sa ju oplatí mieriť zámerne namiesto `
            + `nechať na to, čo práve dodá okolie.`,
    ],
};
const PLANET_SK = {
    sun: 'Slnko', moon: 'Mesiac', mercury: 'Merkúr', venus: 'Venuša',
    mars: 'Mars', jupiter: 'Jupiter', saturn: 'Saturn',
};
const PLANET_EN = {
    sun: 'the Sun', moon: 'the Moon', mercury: 'Mercury', venus: 'Venus',
    mars: 'Mars', jupiter: 'Jupiter', saturn: 'Saturn',
};
const DIGNITY_PROVENANCE = {
    kind: 'established',
    settledness: 'established-within-system',
    basis: 'The dignity scheme itself - which planet rules, is exalted in, is in detriment in and falls '
        + 'in which sign - is stated by Ptolemy with its reasons and is agreed across the traditional '
        + 'literature. That a debilitated planet describes effort rather than misfortune is also the '
        + 'tradition\'s own position. The psychological reading OF that condition is this project\'s, '
        + 'composed from the planet\'s function and the state, and is not in Ptolemy.',
    traditions: ['Hellenistic and traditional Western astrology'],
    sources: [
        'ptolemy-tetrabiblos-ashmand#book-1-chapter-20',
        'ptolemy-tetrabiblos-ashmand#book-1-chapter-22',
        'RESEARCH_ASTROLOGY#dignity',
    ],
};
/**
 * The five dignity overlays for one classical planet.
 *
 * Attached to every one of that planet's twelve sign units, because which of
 * the five fires is decided by the sign the chart actually put it in - the
 * engine has already worked that out, and the overlay reads its answer rather
 * than recomputing it.
 */
export function dignityOverlays(planetKey) {
    const fn = FUNCTION[planetKey];
    if (!fn)
        return [];
    return Object.keys(EN).map((dignity) => ({
        id: `astro.${planetKey}.dignity.${dignity.toLowerCase()}`,
        condition: `${PLANET_EN[planetKey]} is ${dignity.toLowerCase()} in this sign.`,
        applies: (context) => context.dignity === dignity,
        /* Priority 5: BEFORE house and aspect. Dignity says how freely the function
           operates at all, and the house then says where it is exercised. Reversing
           them describes an arena before saying what turns up in it. */
        priority: 5,
        effect: 'weave-after-core',
        prose: () => (activeLocale() === 'sk'
            ? SK[dignity](PLANET_SK[planetKey], SK_FUNCTION[planetKey])
            : EN[dignity](PLANET_EN[planetKey], fn)),
        /* No semantics. Dignity modifies how strongly the placement's own signal
           should be read, not what that signal is about, and the placement is
           already weighted. Adding a dimension here would invent a trait out of a
           condition. */
        provenance: DIGNITY_PROVENANCE,
    }));
}
/** The seven planets that have a traditional dignity. Exported for tests. */
export const DIGNIFIED_PLANETS = Object.keys(FUNCTION);
