import { choose } from '../tarotDiscourseEn.js?v=2ea79e9';
import { TAROT_REVERSED_ASKS_SK, TAROT_REVERSED_STAKES_SK, TAROT_RISKS_SK } from './readerReversedStakesSk.js?v=2ea79e9';
/** The sentence that says what deserves attention: a proposition about the situation. */
const RISK = [
    (risk) => `Riziko je ${risk}.`,
    (risk) => `Na čo si dať pozor: ${risk}.`,
];
const FRAMES = {
    origin: [
        ({ Card, stake }) => `${Card} ukazuje na niečo zo skoršieho obdobia, čo sa nikdy poriadne neusadilo: ${stake}.`,
        ({ Card, stake }) => `${Card} prináša zo skoršieho obdobia toto: ${stake}.`,
        ({ Card, stake }) => `${Card} hovorí, že skoršia časť sa neusadila: ${stake}.`,
    ],
    state: [
        ({ card, stake }) => `Tam, kde veci stoja, ${card} ukazuje: ${stake}.`,
        ({ Card, stake }) => `${Card} opisuje súčasnosť takto: ${stake}.`,
        ({ card, stake }) => `Práve teraz ${card} znamená toto: ${stake}.`,
    ],
    driver: [
        ({ card, stake }) => `Čo to drží v chode, ukazuje ${card}: ${stake}.`,
        ({ card, stake }) => `Pod povrchom ${card} ukazuje: ${stake}.`,
        ({ Card, stake }) => `${Card} pomenúva, čo pracuje pod povrchom: ${stake}.`,
    ],
    response: [
        ({ Card, asks }) => `${Card} tu nedáva obvyklú cestu ďalej, skôr varovanie. Užitočné je ${asks}.`,
        ({ Card, asks }) => `${Card} nevedie ľahkou cestou. Užitočné je ${asks}.`,
        ({ Card, asks }) => `${Card} tu žiada: ${asks}.`,
    ],
    direction: [
        ({ card, stake }) => `Ak súčasná dynamika pokračuje, ${card} smeruje k tomuto: ${stake}.`,
        ({ card, stake }) => `Smer, ktorý ukazuje ${card}, je tento: ${stake}. Je to tendencia, nie istota.`,
        ({ Card, stake }) => `${Card} sa prikláňa k tomuto: ${stake}, ak súčasná dynamika pokračuje.`,
    ],
    other: [
        ({ card, stake }) => `Za druhú stranu ${card} opisuje takýto postoj: ${stake}. Je to postoj, nie pohľad na to, čo si druhá strana súkromne myslí alebo cíti.`,
        ({ Card, stake }) => `${Card} ukazuje podiel druhej strany ako postoj: ${stake}. Nehovorí nič o tom, čo si druhá strana súkromne myslí či cíti.`,
    ],
};
/** Which places close on a risk: the ones that say how things stand or where they tend. The way through and the other side say enough. */
const WITH_RISK = new Set(['state', 'driver', 'direction']);
const upperFirst = (value) => (value ? value.charAt(0).toUpperCase() + value.slice(1) : value);
/** Whether `later` says again what `earlier` has said: two content words (five letters or more, by their first five letters) in common. */
function restatesSk(earlier, later) {
    const stems = (text) => new Set(text.toLowerCase().split(/[^\p{L}]+/u).filter((word) => word.length >= 5).map((word) => word.slice(0, 5)));
    const known = stems(earlier);
    let shared = 0;
    for (const stem of stems(later))
        if (known.has(stem))
            shared += 1;
    return shared >= 2;
}
/** `title` is the card's title with its orientation marker, as the Slovak voice writes it ("Šestka pohárov (v obrátenej polohe)"). */
export function reversedLineSk(group, title, cardId) {
    const card = `karta ${title}`;
    const parts = { card, Card: upperFirst(card), stake: TAROT_REVERSED_STAKES_SK[cardId], asks: TAROT_REVERSED_ASKS_SK[cardId], risk: TAROT_RISKS_SK[cardId] };
    const body = choose(FRAMES[group], `${cardId}|${group}|sk`)(parts);
    /* A risk that only says the stake again in other words is not said: the line has made its point, and the same proposition twice is padding. */
    return WITH_RISK.has(group) && !restatesSk(parts.stake, parts.risk) ? `${body} ${choose(RISK, `${cardId}|${group}|risk|sk`)(parts.risk)}` : body;
}
/** For a place that decides something ("what this turns on"): the card is named and what to watch is said. */
export function reversedRiskLineSk(title, cardId) {
    const card = `karta ${title}`;
    const risk = TAROT_RISKS_SK[cardId];
    if (restatesSk(TAROT_REVERSED_STAKES_SK[cardId], risk))
        return `${upperFirst(card)} tu ukazuje práve toto.`;
    return choose([
        `Riziko tejto karty je ${risk}.`,
        `${upperFirst(card)} dodáva výstrahu: ${risk}.`,
        `${upperFirst(card)} hovorí, na čo si dať pozor: ${risk}.`,
    ], `${cardId}|criterion|risk|sk`);
}
