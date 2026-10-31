import { activeLocale } from '../i18n/locale.js';
const c = (en, sk, themeEn, themeSk, ...dimensions) => ({ en, sk, themeEn, themeSk, dimensions });
/* ------------------------------------------------------- numerology cycles */
/*
 * One entry per cycle number, shared by Year, Month and Day. The number means
 * the same thing at every scale - that is the system's own claim - and only the
 * BAND differs, which the weighting handles rather than the wording.
 *
 * NINE WAS MAPPED ONTO TWO DIMENSIONS ITS OWN CONTENT DOES NOT SUPPORT.
 * It carried `emotionally-expressive` and `conceptual`. The source text for a 9
 * - year, month and day alike in forecastContent.ts - is completion, clearing
 * out, handing over, forgiving and letting go; nothing in it is about models or
 * abstractions, and its planning advice is literally „close the list rather than
 * extending it". `conceptual` is replaced by `introspective`, which is where this
 * file already files the same meaning when the waning Moon carries it („clearing
 * and letting the unfinished go"). `emotionally-expressive` stays: reconciliation,
 * apology and „the message that closes a loop" are in the source.
 */
const CYCLE = {
    1: c('favours starting something new and deciding for yourself', 'praje začínaniu nového a rozhodovaniu po svojom', 'new beginnings and decisions of your own', 'nové začiatky a vlastné rozhodnutia', 'assertive', 'independent', 'novelty-seeking'),
    2: c('slows things down and favours cooperation and patience', 'spomaľuje a praje spolupráci a trpezlivosti', 'cooperation, patience and listening', 'spolupráca, trpezlivosť a počúvanie', 'receptive', 'collaborative'),
    3: c('favours talking, sharing ideas and being among people', 'praje rozhovorom, zdieľaniu nápadov a ľuďom', 'expression, conversation and contact with people', 'sebavyjadrenie, rozhovory a kontakt s ľuďmi', 'communicative', 'social', 'creative'),
    4: c('favours steady work, routine and practical foundations', 'praje sústavnej práci, pravidelnosti a pevným základom', 'steady work, structure and practical foundations', 'sústavná práca, štruktúra a pevné základy', 'structured', 'persistent', 'practical'),
    5: c('favours change, movement and trying something different', 'praje zmene, pohybu a skúšaniu niečoho iného', 'change, movement and new experiences', 'zmena, pohyb a nové skúsenosti', 'novelty-seeking', 'adaptable'),
    6: c('turns attention to responsibilities and the people close to you', 'obracia pozornosť k povinnostiam a k blízkym ľuďom', 'responsibility, care and the people close to you', 'zodpovednosť, starostlivosť a blízki ľudia', 'collaborative', 'emotionally-sensitive'),
    7: c('favours reflection, study and quiet time', 'praje premýšľaniu, štúdiu a pokoju', 'reflection, study and inner work', 'premýšľanie, štúdium a práca so sebou', 'introspective', 'analytical'),
    8: c('favours results, money matters and taking charge', 'praje výsledkom, peniazom a preberaniu zodpovednosti', 'results, money matters and taking charge', 'výsledky, peniaze a preberanie zodpovednosti', 'assertive', 'practical'),
    9: c('favours finishing, clearing out and letting go', 'praje dokončovaniu, upratovaniu a púšťaniu starého', 'finishing, clearing out and letting go', 'dokončovanie, upratovanie a púšťanie starého', 'emotionally-expressive', 'introspective'),
};
/* ------------------------------------------------------- BaZi Ten God families */
/*
 * The five families as tenGodStrength.ts defines them. The engine writes
 * `authority`; the natal contribution lexicon writes `officer`. Both keys are
 * present because a mapping that silently misses one would drop a whole
 * category of year without anybody noticing.
 *
 * AUDITED, AND RETAINED: `resource` -> introspective + receptive.
 * A Resource year is the element that produces the Day Master - support,
 * learning, being looked after, taking in rather than putting out - which is
 * what both dimensions encode. The wrong sentences a reader met about it
 * („Annual pillar Bing Wu points the same way: letting things come") were the
 * composer's, not this table's: it called every other convergence „the same
 * way" as the lead, including one on the opposite pole. See forecastNarrative.
 */
const TEN_GOD = {
    companion: c('puts you among peers and competitors, where you need to hold your own ground', 'stavia ťa medzi seberovných aj konkurentov, kde si treba udržať vlastnú pozíciu', 'holding your own ground among peers', 'udržanie si vlastnej pozície medzi seberovnými', 'independent', 'social'),
    output: c('favours creating, expressing yourself and showing your work', 'praje tvorbe, sebavyjadreniu a ukazovaniu vlastnej práce', 'creating and showing your work', 'tvorba a ukazovanie vlastnej práce', 'creative', 'communicative', 'outwardly-engaged'),
    wealth: c('favours practical results, money and building resources', 'praje praktickým výsledkom, peniazom a budovaniu zdrojov', 'practical results and building resources', 'praktické výsledky a budovanie zdrojov', 'practical', 'outwardly-engaged'),
    authority: c('brings structure, rules and responsibility', 'prináša štruktúru, pravidlá a zodpovednosť', 'structure, rules and responsibility', 'štruktúra, pravidlá a zodpovednosť', 'structured', 'cautious'),
    officer: c('brings structure, rules and responsibility', 'prináša štruktúru, pravidlá a zodpovednosť', 'structure, rules and responsibility', 'štruktúra, pravidlá a zodpovednosť', 'structured', 'cautious'),
    resource: c('favours learning, support from others and recharging', 'praje učeniu, podpore od druhých a dobíjaniu síl', 'learning, support and recharging', 'učenie, podpora a dobíjanie síl', 'introspective', 'receptive'),
};
/* --------------------------------------------------------- transiting bodies */
/*
 * A transit is read as three plain parts: what the body brings, which part of
 * the chart it lands on, and in what manner. The body's phrase ends where its
 * object begins - „brings sudden change to" + „your relationships and values" -
 * and the Slovak ends on „do", which takes the genitive NATAL_AREA supplies.
 */
const TRANSIT_BODY = {
    Jupiter: c('points to growth and opportunity in', 'prináša rast a príležitosti do', 'growth and opportunity', 'rast a príležitosti', 'novelty-seeking', 'outwardly-engaged'),
    Saturn: c('points to tests and limits in', 'prináša skúšky a hranice do', 'tests, limits and consolidation', 'skúšky, hranice a upevňovanie', 'structured', 'cautious'),
    Uranus: c('points to sudden change in', 'prináša náhle zmeny do', 'sudden change', 'náhle zmeny', 'novelty-seeking', 'independent'),
    Neptune: c('points to uncertainty and imagination in', 'prináša neistotu a fantáziu do', 'uncertainty and imagination', 'neistota a fantázia', 'intuitive', 'emotionally-sensitive'),
    Pluto: c('points to deep, slow change in', 'prináša hlbokú a trvalú premenu do', 'deep, lasting change', 'hlboká a trvalá premena', 'persistent', 'introspective'),
};
/* The natal point a transit lands on, as the object of the body's phrase. */
const NATAL_AREA = {
    Sun: { en: 'your sense of direction', sk: 'tvojho smerovania' },
    Moon: { en: 'your feelings and home life', sk: 'tvojich citov a domova' },
    Mercury: { en: 'how you think and communicate', sk: 'tvojho myslenia a komunikácie' },
    Venus: { en: 'your relationships and values', sk: 'tvojich vzťahov a hodnôt' },
    Mars: { en: 'your drive and how you act', sk: 'tvojej energie a konania' },
};
/* ------------------------------------------------------------ aspect harmonic */
/*
 * The manner of a transit, appended to its sentence, and pressing its own
 * dimension at half the body's weight.
 *
 * AUDITED: `fusion` (the conjunction) carried `emotionally-sensitive`, which its
 * own authored reading - „fuses with it, so the two are hard to tell apart" -
 * does not say anything about. A conjunction intensifies whatever the body
 * brings; it has no direction of its own on the taxonomy, so it now adds none
 * and the body carries the contact alone. The other three are retained: a
 * square is friction that makes the downside visible, a trine or sextile is
 * ease, and an opposition shows up through somebody else.
 */
const HARMONIC = {
    fusion: c(', directly and strongly', ', priamo a výrazne', '', ''),
    flow: c(', and the contact is an easy one', ', a ide to pomerne ľahko', '', '', 'adaptable'),
    tension: c(', with some friction', ', s určitým trením', '', '', 'cautious'),
    polarity: c(', often through other people', ', často cez iných ľudí', '', '', 'collaborative'),
};
/* ------------------------------------------------------------- moon and sun */
const MOON = {
    waxing: c('supports building and adding', 'podporuje budovanie a pridávanie', 'building and adding', 'budovanie a pridávanie', 'outwardly-engaged'),
    waning: c('supports finishing and clearing', 'podporuje dokončovanie a upratovanie', 'finishing and clearing', 'dokončovanie a upratovanie', 'introspective'),
};
const SUN_ELEMENT = {
    Fire: c('adds energy and impatience to these weeks', 'pridáva týmto týždňom energiu a netrpezlivosť', 'energy and impatience', 'energia a netrpezlivosť', 'assertive', 'novelty-seeking'),
    Earth: c('adds a practical, down-to-earth tone to these weeks', 'pridáva týmto týždňom praktický, prízemný tón', 'a practical, down-to-earth tone', 'praktický, prízemný tón', 'practical', 'structured'),
    Air: c('adds talk, ideas and comparison to these weeks', 'pridáva týmto týždňom rozhovory, nápady a porovnávanie', 'talk and ideas', 'rozhovory a nápady', 'communicative', 'conceptual'),
    Water: c('adds feeling and sensitivity to these weeks', 'pridáva týmto týždňom cit a citlivosť', 'feeling and sensitivity', 'cit a citlivosť', 'emotionally-sensitive', 'intuitive'),
};
/**
 * THE BAND MULTIPLIER.
 *
 * Chosen so that a long-band fact of any strength outweighs a short-band fact of
 * any strength: the smallest long weight (0.6 x 0.45) is larger than the largest
 * short weight (0.25 x 1). That is a deliberate ceiling, not a tuning constant -
 * it is what stops a Personal Day from ever leading a year's reading, which is
 * exactly the failure the brief names.
 */
const BAND_WEIGHT = { long: 1, mid: 0.6, short: 0.25 };
const STRENGTH_WEIGHT = { strong: 1, moderate: 0.7, slight: 0.45 };
/** The weight one fact carries before it is split across its dimensions. */
export const factWeight = (fact) => BAND_WEIGHT[fact.band] * STRENGTH_WEIGHT[fact.strength];
/** What this period fact contributes, or null when nothing is authored for it. */
export function temporalContribution(fact) {
    const { sourceEntity, provenance } = fact;
    if (sourceEntity === 'personalYear' || sourceEntity === 'personalMonth' || sourceEntity === 'personalDay') {
        return CYCLE[String(provenance.number)] ?? null;
    }
    if (sourceEntity.startsWith('annualTenGod-') || sourceEntity.startsWith('luckTenGod-')) {
        return TEN_GOD[sourceEntity.slice(sourceEntity.indexOf('-') + 1)] ?? null;
    }
    if (sourceEntity.startsWith('transit-')) {
        /* Both halves matter: WHICH body is transiting and HOW it is touching. The
           body carries the dimensions, because "Saturn squares your Sun" is a
           Saturn period first and a square second; the harmonic supplies the manner
           and its own dimension is folded in at half weight below. */
        return TRANSIT_BODY[String(provenance.transitingBody)] ?? null;
    }
    if (sourceEntity === 'transitingSun') {
        return SUN_ELEMENT[String(provenance.element)] ?? null;
    }
    if (sourceEntity === 'moonPhase') {
        return MOON[/waning|last quarter|balsamic/i.test(String(provenance.phase)) ? 'waning' : 'waxing'] ?? null;
    }
    return null;
}
/** The harmonic's own contribution, for the manner of a transit. */
export function harmonicContribution(fact) {
    if (!fact.sourceEntity.startsWith('transit-'))
        return null;
    return HARMONIC[fact.sourceEntity.slice('transit-'.length)] ?? null;
}
const sk = () => activeLocale() === 'sk';
export const contributionText = (contribution) => (sk() ? contribution.sk : contribution.en);
export const themeText = (contribution) => (sk() ? contribution.themeSk : contribution.themeEn);
/** The part of the chart a transit lands on, or null for a point nothing is written for. */
export function natalAreaText(body) {
    const area = NATAL_AREA[body];
    if (!area)
        return null;
    return sk() ? area.sk : area.en;
}
/** Every current fact, landed on the shared taxonomy with a comparable weight. */
export function temporalSignalsFor(facts, options = {}) {
    const signals = [];
    /* English tensions and leads leave the harmonic out: a contact's manner (easy, with friction) is said in its own sentence and is not a second claim about what the period is for. */
    const withHarmonic = options.harmonic ?? true;
    for (const fact of facts) {
        const base = factWeight(fact);
        const contribution = temporalContribution(fact);
        if (contribution) {
            for (const dimension of contribution.dimensions) {
                signals.push({ fact, dimension, weight: base / contribution.dimensions.length });
            }
        }
        /* The manner of a transit presses too, at half the body's weight: a square
           is a real push toward caution, and it is not the main claim. */
        const harmonic = withHarmonic ? harmonicContribution(fact) : null;
        if (harmonic) {
            for (const dimension of harmonic.dimensions) {
                signals.push({ fact, dimension, weight: (base / harmonic.dimensions.length) * 0.5 });
            }
        }
    }
    return signals;
}
/** Everything the coverage report needs, for the test that asserts nothing is silently unmapped. */
export const TEMPORAL_CONTRIBUTION_TABLES = {
    CYCLE, TEN_GOD, TRANSIT_BODY, HARMONIC, MOON, SUN_ELEMENT, NATAL_AREA,
};
