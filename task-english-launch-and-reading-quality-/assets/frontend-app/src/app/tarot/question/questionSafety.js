/** Most serious first. The first flag present decides the level and the primary. */
const PRECEDENCE = [
    'self-harm', 'distress', 'death', 'medical', 'medical-treatment', 'pregnancy', 'paranoia', 'legal', 'financial', 'accusation',
];
/** The spread that reads how a person stands toward a subject, with no outcome in it. */
export const STEADYING_SPREAD_ID = 'steadying-reflection';
/** Subjects where the relationship spread is still fitting: the notice changes, the spread does not. */
const KEEPS_SPREAD = new Set(['accusation']);
export function safetyPolicyFor(flags) {
    /* Treatment is a kind of medical subject: it never stands without the notice it rests on. */
    const present = flags.includes('medical-treatment') && !flags.includes('medical') ? [...flags, 'medical'] : flags;
    const ordered = PRECEDENCE.filter((flag) => present.includes(flag));
    const primary = ordered[0] ?? null;
    if (primary === null) {
        return {
            level: 'standard', flags: [], primary: null, forceSpreadId: null, quoteQuestion: true, notices: [], drawsCards: true,
        };
    }
    if (primary === 'self-harm') {
        return {
            level: 'support-first', flags: ordered, primary, forceSpreadId: null, quoteQuestion: false, notices: ['self-harm'], drawsCards: false,
        };
    }
    return {
        level: 'bounded',
        flags: ordered,
        primary,
        forceSpreadId: KEEPS_SPREAD.has(primary) && ordered.every((flag) => KEEPS_SPREAD.has(flag)) ? null : STEADYING_SPREAD_ID,
        quoteQuestion: false,
        notices: ordered,
        drawsCards: true,
    };
}
/**
 * The notices, one per subject. Two sentences at most, no hedging about the
 * product, and each says what the cards cannot do before it says what the
 * reading does instead.
 */
export const SAFETY_NOTICES = {
    'self-harm': {
        en: 'What you wrote sounds heavy, and a card reading is not the right thing to lean on right now. If you might act on thoughts of ending your life, please call your local emergency number now or a crisis line in your country, or tell someone you trust how you are. You do not have to carry this alone. The cards will still be here when you are on steadier ground.',
        sk: 'To, čo píšeš, znie ťažko a čítanie z kariet nie je teraz to, o čo sa oplatí oprieť. Ak ťa myšlienky na ukončenie života ťahajú k činu, zavolaj hneď na miestne tiesňové číslo alebo na krízovú linku vo svojej krajine, alebo povedz niekomu, komu dôveruješ, ako sa máš. Nemusíš to niesť osamote. Karty tu budú, keď budeš na pevnejšej pôde.',
    },
    distress: {
        en: 'That sounds like a lot to carry. Cards cannot tell you where this goes, so this reading stays with how you stand right now. If it feels like too much, talking to someone you trust, a doctor or a crisis line is a good next step.',
        sk: 'Znie to, že toho nesieš veľa. Karty nevedia povedať, kam to smeruje, preto sa toto čítanie drží toho, ako stojíš teraz. Ak je to priveľa, dobrým ďalším krokom je rozhovor s niekým, komu dôveruješ, s lekárom alebo na krízovej linke.',
    },
    death: {
        en: 'Cards cannot predict a death, and no card - the one named Death included - means one. This reading looks at how you stand toward the fear or the uncertainty instead.',
        sk: 'Karty nevedia predpovedať smrť a žiadna karta - ani tá, ktorá sa volá Smrť - ju neznamená. Toto čítanie sa namiesto toho pozerá na to, ako stojíš voči strachu alebo neistote.',
    },
    medical: {
        en: 'Cards cannot diagnose anything or say what is happening in a body, so this reading does not try. It looks at how you stand toward the situation instead.',
        sk: 'Karty nevedia nič diagnostikovať ani povedať, čo sa deje v tele, preto to toto čítanie ani nezačína. Pozerá sa namiesto toho na to, ako stojíš voči situácii.',
    },
    'medical-treatment': {
        en: 'Decisions about medication or treatment belong with a doctor who knows your situation, not with a card.',
        sk: 'Rozhodnutia o liekoch alebo liečbe patria lekárovi, ktorý pozná tvoju situáciu, nie karte.',
    },
    pregnancy: {
        en: 'Cards cannot say whether someone is or will be pregnant. This reading stays with how you are holding the question.',
        sk: 'Karty nevedia povedať, či niekto je alebo bude tehotný. Toto čítanie sa drží toho, ako tú otázku nosíš.',
    },
    paranoia: {
        en: 'Cards cannot tell whether something is being done to you by other people or by unseen forces, and this reading does not treat it as established. It stays with how you are holding it. If it feels frightening or constant, a doctor or a counsellor is the right person to talk to.',
        sk: 'Karty nevedia povedať, či ti niečo robia iní ľudia alebo neviditeľné sily, a toto čítanie to nepovažuje za preukázané. Drží sa toho, ako to nosíš. Ak je to strašidelné alebo stále prítomné, správny človek na rozhovor je lekár alebo poradca.',
    },
    legal: {
        en: 'Cards cannot say how a legal matter will turn out and are no substitute for a lawyer. This reading looks at how you stand toward it.',
        sk: 'Karty nevedia povedať, ako dopadne právna vec, a nenahrádzajú právnika. Toto čítanie sa pozerá na to, ako stojíš voči nej.',
    },
    financial: {
        en: 'Cards cannot predict markets, wins or returns, and a reading is no basis for a money decision. This one looks at how you relate to the risk.',
        sk: 'Karty nevedia predpovedať trhy, výhry ani výnosy a čítanie nie je základ pre rozhodnutie o peniazoch. Toto sa pozerá na to, ako sa vzťahuješ k riziku.',
    },
    accusation: {
        en: 'Cards cannot show what another person has done or is hiding. They can reflect the dynamic as you experience it, and that is all this reading claims.',
        sk: 'Karty nevedia ukázať, čo urobil alebo čo skrýva iný človek. Môžu odzrkadliť dynamiku tak, ako ju prežívaš, a viac toto čítanie netvrdí.',
    },
};
