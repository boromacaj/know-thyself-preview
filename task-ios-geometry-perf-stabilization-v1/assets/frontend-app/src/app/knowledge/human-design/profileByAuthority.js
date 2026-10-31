import { activeLocale } from '../../i18n/locale.js?v=d9f39e7';
const LINES = {
    1: {
        label: 'first line',
        convinces: 'going to the bottom of it - the foundation checked personally, in private, before anything is committed to',
        misleads: 'the research is complete and reads as permission to act, when all it has produced is a solid floor',
    },
    2: {
        label: 'second line',
        convinces: 'being drawn out - the natural talent is there and it takes somebody else calling on it to be put to work',
        misleads: 'being called on is mistaken for the decision, and you answer a summons your own mechanism never agreed to',
    },
    3: {
        label: 'third line',
        convinces: 'trying it and finding out where it breaks, which is a form of knowledge nothing else supplies',
        misleads: 'the appetite to test something is taken for a yes to it, and the discovery costs more than it had to',
    },
    4: {
        label: 'fourth line',
        convinces: 'the network - what is true is what the people you actually know can vouch for',
        misleads: 'loyalty to the people involved settles a question that was never about them',
    },
    5: {
        label: 'fifth line',
        convinces: 'being asked - the practical answer arrives when somebody puts a real problem in front of you',
        misleads: 'the projection is flattering and you agree to solve something before anything in you said yes',
    },
    6: {
        label: 'sixth line',
        convinces: 'the long arc - lived through, watched from a distance, and eventually known rather than concluded',
        misleads: 'the perspective is genuine and arrives at a pace no actual decision can wait for',
    },
};
const AUTHORITY_TEMPO = {
    'emotional-solar-plexus': 'delayed',
    lunar: 'delayed',
    sacral: 'immediate',
    splenic: 'immediate',
    'ego-manifested': 'immediate',
    'ego-projected': 'immediate',
    'self-projected': 'dialogic',
    'mental-environmental': 'dialogic',
};
const AUTHORITY_LABEL = {
    'emotional-solar-plexus': 'Emotional', lunar: 'Lunar', sacral: 'Sacral',
    splenic: 'Splenic', 'ego-manifested': 'Ego', 'ego-projected': 'Ego',
    'self-projected': 'Self-projected', 'mental-environmental': 'Mental',
};
const EN = {
    immediate: (line, label) => [
        `One more layer changes how this profile actually runs. Your conscious ${line.label} becomes `
            + `sure by ${line.convinces} - and your ${label} authority answers in the instant, which means `
            + `the two operate on completely different clocks. The line takes as long as it takes. The `
            + `authority has already replied.`,
        `The practical consequence is that the answer usually arrives before the line is satisfied, `
            + `and the temptation is to keep working until the line catches up. That is worth resisting: `
            + `the line's job is to make the work good, not to make the decision. Where this goes wrong is `
            + `the reverse - ${line.misleads}.`,
    ],
    delayed: (line, label) => [
        `One more layer changes how this profile actually runs. Your conscious ${line.label} becomes `
            + `sure by ${line.convinces}, and your ${label} authority also refuses to answer in the `
            + `moment. Both of them want time, which sounds like agreement and is not quite: they want it `
            + `for different reasons and they finish at different points.`,
        `What that produces is a design that is genuinely slow and is often apologised for. It should `
            + `not be. The risk here is not haste, it is a plausible false start - ${line.misleads} - and `
            + `the correction is to let the authority finish even after the line has.`,
    ],
    dialogic: (line, label) => [
        `One more layer changes how this profile actually runs. Your conscious ${line.label} becomes `
            + `sure by ${line.convinces}, and your ${label} authority needs the question spoken to `
            + `somebody before it can answer at all. So there are two separate requirements here, and only `
            + `one of them is about the thinking.`,
        `In practice that means a conclusion you reached alone is not finished, however well it was `
            + `arrived at. This is the profile most likely to treat private certainty as sufficient, and `
            + `${line.misleads}. The fix is unglamorous: say it out loud to somebody before it counts.`,
    ],
};
const SK_LINES = {
    1: {
        label: 'prvá línia',
        convinces: 'tým, že ide veci na dno — základ osobne overený, v súkromí, skôr než sa čokoľvek prisľúbi',
        misleads: 'je prieskum hotový a číta sa ako povolenie konať, hoci vytvoril len pevnú podlahu',
    },
    2: {
        label: 'druhá línia',
        convinces: 'tým, že ju niekto vytiahne — nadanie tam je a treba, aby sa oň niekto prihlásil',
        misleads: 'sa zavolanie zamení za rozhodnutie a odpovieš na výzvu, s ktorou tvoj vlastný mechanizmus nesúhlasil',
    },
    3: {
        label: 'tretia línia',
        convinces: 'tým, že to skúsi a zistí, kde sa to láme — čo je poznanie, ktoré inak nezískaš',
        misleads: 'sa chuť niečo vyskúšať zamení za áno a objav stojí viac, než musel',
    },
    4: {
        label: 'štvrtá línia',
        convinces: 'cez sieť — pravdivé je to, za čo sa vedia postaviť ľudia, ktorých naozaj poznáš',
        misleads: 'vernosť zúčastneným ľuďom rozhodne otázku, ktorá o nich nikdy nebola',
    },
    5: {
        label: 'piata línia',
        convinces: 'tým, že sa jej niekto opýta — praktická odpoveď príde, keď pred teba niekto položí skutočný problém',
        misleads: 'je projekcia lichotivá a súhlasíš, že niečo vyriešiš, skôr než v tebe čokoľvek povedalo áno',
    },
    6: {
        label: 'šiesta línia',
        convinces: 'dlhým oblúkom — prežité, potom pozorované z odstupu a napokon skôr známe než vyvodené',
        misleads: 'je nadhľad pravý a prichádza tempom, na ktoré žiadne skutočné rozhodnutie čakať nevie',
    },
};
const SK = {
    immediate: (k, label) => [
        `Ešte jedna vrstva mení, ako tento profil naozaj beží. Tvoja vedomá ${SK_LINES[k].label} `
            + `naberá istotu ${SK_LINES[k].convinces} — a tvoja autorita ${label} odpovedá v okamihu, čo `
            + `znamená, že tie dve bežia na celkom iných hodinách. Línia potrebuje toľko času, koľko `
            + `potrebuje. Autorita už odpovedala.`,
        `Prakticky z toho vyplýva, že odpoveď príde skôr, než je línia spokojná, a láka to pracovať `
            + `ďalej, kým to línia nedobehne. Tomu sa oplatí odolať: úlohou línie je urobiť prácu dobrou, `
            + `nie urobiť rozhodnutie. Kazí sa to opačne — ${SK_LINES[k].misleads}.`,
    ],
    delayed: (k, label) => [
        `Ešte jedna vrstva mení, ako tento profil naozaj beží. Tvoja vedomá ${SK_LINES[k].label} `
            + `naberá istotu ${SK_LINES[k].convinces} a tvoja autorita ${label} tiež odmieta odpovedať v `
            + `danej chvíli. Obe chcú čas, čo znie ako zhoda a celkom ňou nie je: chcú ho z rôznych `
            + `dôvodov a končia v rôznych bodoch.`,
        `Vzniká z toho dizajn, ktorý je naozaj pomalý a za ktorý sa ľudia často ospravedlňujú. `
            + `Nemali by. Rizikom tu nie je unáhlenosť, ale vierohodný falošný štart — `
            + `${SK_LINES[k].misleads} — a nápravou je nechať autoritu dokončiť aj potom, čo línia už `
            + `dokončila.`,
    ],
    dialogic: (k, label) => [
        `Ešte jedna vrstva mení, ako tento profil naozaj beží. Tvoja vedomá ${SK_LINES[k].label} `
            + `naberá istotu ${SK_LINES[k].convinces} a tvoja autorita ${label} potrebuje, aby bola `
            + `otázka niekomu vyslovená, inak neodpovie vôbec. Sú to teda dve oddelené požiadavky a len `
            + `jedna z nich je o premýšľaní.`,
        `V praxi to znamená, že záver, ku ktorému dôjdeš osamote, nie je hotový, nech je dosiahnutý `
            + `akokoľvek dobre. Toto je profil, ktorý najpravdepodobnejšie berie súkromnú istotu za `
            + `postačujúcu — a ${SK_LINES[k].misleads}. Náprava je nevďačná: povedz to nahlas niekomu, `
            + `skôr než to začne platiť.`,
    ],
};
const PROFILE_AUTHORITY_PROVENANCE = {
    kind: 'established',
    settledness: 'established-within-system',
    basis: 'That the conscious line describes how a person arrives at confidence and the Authority '
        + 'describes how a decision is actually made are both settled mechanics. That the two are '
        + 'different faculties - and that taking the line\'s certainty for the authority\'s answer is '
        + 'the commonest way a design is mis-run - follows from those mechanics. The reading of what '
        + 'each pairing produces is this project\'s.',
    traditions: ['Human Design mechanics'],
    sources: ['RESEARCH_HUMAN_DESIGN#profiles', 'RESEARCH_HUMAN_DESIGN#type-authority'],
};
/**
 * The authority-conditioned readings for one profile.
 *
 * Keyed off the CONSCIOUS line, which is the first digit: that is the line
 * that decides how a person believes they know, and the one that gets confused
 * with an authority. The unconscious line is a different mechanism and its
 * reading belongs to the profile's own unit.
 */
export function profileByAuthorityOverlays(profileKey) {
    const conscious = profileKey.split('/')[0];
    const line = LINES[conscious];
    if (!line)
        return [];
    return Object.keys(AUTHORITY_TEMPO).map((authorityKey) => ({
        id: `hd.profile.${profileKey.replace('/', '-')}.authority-${authorityKey}`,
        condition: `A ${profileKey} profile with ${AUTHORITY_LABEL[authorityKey]} authority.`,
        applies: (context) => context.authority === authorityKey,
        priority: 20,
        effect: 'weave-after-core',
        prose: () => {
            const tempo = AUTHORITY_TEMPO[authorityKey];
            return activeLocale() === 'sk'
                ? SK[tempo](conscious, AUTHORITY_LABEL[authorityKey])
                : EN[tempo](line, AUTHORITY_LABEL[authorityKey]);
        },
        /* No semantics: both sides are weighted by their own units already. */
        provenance: PROFILE_AUTHORITY_PROVENANCE,
    }));
}
/** Exported for tests. */
export const CONSCIOUS_LINES = Object.keys(LINES);
export const PROFILE_AUTHORITY_TEMPO = AUTHORITY_TEMPO;
