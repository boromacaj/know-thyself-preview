import { activeLocale } from '../i18n/locale.js?v=f9ab0a6';
import { bodyWord, chartElementWord, chartModalityWord, hdDefinitionPhrase, inSign, seasonalStateWord, strengthTendencyWord, tenGodFamilyGenitive, PHASE, } from '../i18n/engineProse.js?v=f9ab0a6';
/*
 * THE CALCULATED FACT, AS A READER MEETS IT.
 *
 * Every piece of evidence in the synthesis foundation carries a `fact` string
 * written for the explanation chain: `Sun in Virgo (Earth, Mutable)`, `Day
 * Master Ji (Yin Earth); resting in Shen month (Metal ruling); tendency weak`,
 * `Type: Manifesting Generator, Profile 5/1, Sacral authority`. Those are
 * complete and precise, and they are the wrong shape for the middle of a
 * sentence.
 *
 * This module turns one into a short noun phrase that can be listed with
 * others: `Sun in Virgo`, `a weak Ji Earth Day Master`, `the Manifesting
 * Generator type`. Nothing is added. Every phrase is a re-rendering of what the
 * engine already emitted, which is what lets the synthesis name concrete
 * results without the composer inventing a single claim.
 *
 * WHY THE SOURCE ENTITY AND NOT THE FACT TEXT
 * The `sourceEntity` is a structured key the adapter chose (`placement-Sun`,
 * `dayMaster`, `hiddenPassion-1`); the fact is prose. Keying off the entity
 * means a reworded fact degrades to the raw string instead of silently
 * producing a wrong phrase, and a test asserts every entity a real chart emits
 * has a phrase.
 *
 * SLOVAK IS NOMINATIVE, ALWAYS
 * Slovak declines, and a phrase assembled here cannot know which case the
 * sentence around it will need. So every phrase is NOMINATIVE, and every
 * template that consumes one is written to put it in subject position or after
 * a colon - `Toto hovoria: Slnko v Panne, životná cesta 7 a definované centrum
 * Sacral.` The same discipline the pole nouns already follow in the composer.
 */
const slovak = () => activeLocale() === 'sk';
/** The numerology positions, lower case and nominative for mid-sentence use. */
const NUMEROLOGY_NAME = {
    lifePath: { en: 'Life Path', sk: 'životná cesta' },
    birthDay: { en: 'Birth Day', sk: 'deň narodenia' },
    expression: { en: 'Expression', sk: 'vyjadrenie' },
    soulUrge: { en: 'Soul Urge', sk: 'túžba duše' },
    personality: { en: 'Personality', sk: 'osobnosť' },
    maturity: { en: 'Maturity', sk: 'zrelosť' },
    balance: { en: 'Balance', sk: 'rovnováha' },
    attitude: { en: 'Attitude', sk: 'postoj' },
    hiddenPassion: { en: 'Hidden Passion', sk: 'skrytá vášeň' },
};
/** The five aspects, as a nominative noun rather than a verb phrase. */
const ASPECT_NOUN = {
    conjunction: { en: 'conjunction', sk: 'konjunkcia' },
    sextile: { en: 'sextile', sk: 'sextil' },
    square: { en: 'square', sk: 'kvadratúra' },
    trine: { en: 'trine', sk: 'trigón' },
    opposition: { en: 'opposition', sk: 'opozícia' },
};
/** The five phases in the genitive Slovak needs after „prevaha“. */
const PHASE_GENITIVE = {
    Wood: 'dreva', Fire: 'ohňa', Earth: 'zeme', Metal: 'kovu', Water: 'vody',
};
/** The three modalities in the genitive plural, after „prevaha“. */
const MODALITY_GENITIVE = {
    Cardinal: 'kardinálnych znamení',
    Fixed: 'pevných znamení',
    Mutable: 'premenlivých znamení',
};
/** `a` or `an`, by the sound the phrase actually starts with. English only. */
const article = (word) => ('aeiou'.includes(word[0]?.toLowerCase() ?? '') ? 'an' : 'a');
/**
 * One calculated fact as a short nominative phrase.
 *
 * Falls back to the engine's own fact text when the entity is unrecognised: a
 * long phrase reads worse than a short one and is still true, which is the
 * right way round for a fallback.
 */
export function factPhrase(evidence) {
    const { sourceEntity, fact, pillar } = evidence;
    const sk = slovak();
    /* ------------------------------------------------------------ numerology */
    if (pillar === 'numerology') {
        const key = sourceEntity.startsWith('hiddenPassion') ? 'hiddenPassion' : sourceEntity;
        const name = NUMEROLOGY_NAME[key];
        const value = /(\d+)\s*$/.exec(fact)?.[1];
        if (name && value)
            return sk ? `${name.sk} ${value}` : `${name.en} ${value}`;
        return fact;
    }
    /* ------------------------------------------------------------- astrology */
    if (pillar === 'astrology') {
        const placement = /^(\w+) in (\w+)/.exec(fact);
        if (sourceEntity.startsWith('placement-') && placement) {
            return sk ? `${bodyWord(placement[1])} ${inSign(placement[2])}` : `${placement[1]} in ${placement[2]}`;
        }
        /* The SIGN-DRIVE seed: what the luminary is for, as distinct from how it
           behaves, which is the placement above. Same two words, different claim,
           so the phrase has to be visibly a different one - otherwise a list names
           `Sun in Virgo` twice and the reader reads a duplication. */
        if (sourceEntity.startsWith('drive-')) {
            const body = sourceEntity.slice('drive-'.length);
            const sign = /^the (\w+) /.exec(fact)?.[1] ?? placement?.[2];
            if (sign) {
                return sk
                    ? `to, o čo ide ${bodyWord(body)} ${inSign(sign)}`
                    : `what the ${sign} ${body} reaches for`;
            }
        }
        if (sourceEntity === 'ascendant' && placement) {
            /* An Ascendant that changes sign within the two hours of an estimate is evidence only as time-sensitive, and the pillar page shows it as provisional.
               Narrated flatly the synthesis claimed more than the pillar; it now says whose time the sign belongs to, in the pillar's own words. */
            const atEstimate = evidence.methodology === 'time-sensitive';
            return sk
                ? `ascendent ${inSign(placement[2])}${atEstimate ? ' (pri tvojom odhadovanom čase)' : ''}`
                : `Ascendant in ${placement[2]}${atEstimate ? ' (at your estimated time)' : ''}`;
        }
        if (sourceEntity === 'elementBalance') {
            const element = /Element emphasis: (\w+)/.exec(fact)?.[1];
            if (element) {
                return sk
                    ? `prevaha živlu ${chartElementWord(element, 'genitive')}`
                    : `a chart weighted toward ${element}`;
            }
        }
        if (sourceEntity === 'modalityBalance') {
            const modality = /Modality emphasis: (\w+)/.exec(fact)?.[1];
            if (modality) {
                return sk
                    ? `prevaha ${MODALITY_GENITIVE[modality] ?? chartModalityWord(modality)}`
                    : `a chart weighted toward ${modality.toLowerCase()} signs`;
            }
        }
        if (sourceEntity === 'hemisphereBalance') {
            return sk ? 'dôraz na jednu polovicu mapy' : 'the chart\'s hemisphere emphasis';
        }
        if (sourceEntity.startsWith('aspect-')) {
            const aspect = /^(\w+) (\w+) (\w+)/.exec(fact);
            const noun = aspect ? ASPECT_NOUN[aspect[2].toLowerCase()] : undefined;
            if (aspect && noun) {
                return sk
                    ? `${noun.sk} ${bodyWord(aspect[1])} – ${bodyWord(aspect[3])}`
                    : `the ${aspect[1]}–${aspect[3]} ${noun.en}`;
            }
        }
        if (sourceEntity === 'retrogradeEmphasis') {
            return sk ? 'prevaha retrográdnych telies' : 'the retrograde emphasis';
        }
        return fact;
    }
    /* ------------------------------------------------------------------ BaZi */
    if (pillar === 'bazi') {
        if (sourceEntity === 'dayMaster') {
            const stem = /^Day Master (\w+) \((Yin|Yang) (\w+)\)/.exec(fact);
            const tendency = /tendency ([\w-]+)/.exec(fact)?.[1];
            if (stem) {
                /* The BaZi phase table, not the astrology element one: the four chart
                   elements are Fire/Earth/Air/Water and have no Metal or Wood, so a
                   Geng Metal Day Master fell through untranslated and read `(metal)`.
                   Earth happened to work in both, which is why it was not obvious. */
                const phase = sk ? (PHASE[stem[3]] ?? stem[3]) : stem[3];
                /* The tendency is the single most load-bearing thing about a Day Master
                   and the engine already decided it, so it leads the phrase when the
                   model reported one. */
                if (tendency) {
                    const plain = tendency.replace('-', ' ');
                    return sk
                        ? `${strengthTendencyWord(tendency)} Day Master ${stem[1]} (${phase})`
                        : `${article(plain)} ${plain} ${stem[1]} ${phase} Day Master`;
                }
                return sk ? `Day Master ${stem[1]} (${phase})` : `the ${stem[1]} ${phase} Day Master`;
            }
        }
        if (sourceEntity === 'dayMasterSeason') {
            const state = /is seasonally (\w+)/.exec(fact)?.[1];
            const month = /in the (\w+) month/.exec(fact)?.[1];
            if (state && month) {
                return sk
                    ? `Day Master ${seasonalStateWord(state)} v mesiaci ${month}`
                    : `a Day Master ${state} in the ${month} month`;
            }
        }
        if (sourceEntity === 'elementBalance') {
            const phase = /Dominant phase: (\w+)/.exec(fact)?.[1];
            if (phase) {
                return sk
                    ? `prevaha fázy ${PHASE_GENITIVE[phase] ?? phase}`
                    : `${phase} dominant in the chart`;
            }
        }
        if (sourceEntity === 'polarityBalance') {
            const balance = /(\d+) Yang \/ (\d+) Yin/.exec(fact);
            if (balance) {
                const yangHeavy = Number(balance[1]) >= Number(balance[2]);
                if (sk)
                    return yangHeavy ? 'prevaha jangu v mape' : 'prevaha jinu v mape';
                return yangHeavy ? 'a Yang-weighted chart' : 'a Yin-weighted chart';
            }
        }
        if (sourceEntity.startsWith('tenGod-')) {
            const category = sourceEntity.slice('tenGod-'.length);
            /*
             * THE FIVE FAMILIES GET SLOVAK NAMES, AND THIS IS NOT A NAME/LABEL SLIP.
             *
             * The canonical Ten God names - Rob Wealth, Hurting Officer, Indirect
             * Resource - stay in English wherever the reading prints one, because a
             * reader checking against any other source needs them unchanged. These
             * five are not those. They are the FAMILIES the ten are grouped into, and
             * the engine's key for them is an ordinary English common noun. Left
             * untranslated they produced „prevaha skupiny companion medzi desiatimi
             * bohmi" - a Slovak sentence with an English word wedged into the middle
             * of it, which is neither the name nor the label.
             */
            /* `authority`, not `officer`: these keys are the engine's category names,
               and `officer` was never one of them. The fallback below is what made
               the slip survive - it printed the English key in the Slovak sentence,
               which is precisely the defect the comment above describes. */
            return sk
                ? `prevaha skupiny ${tenGodFamilyGenitive(category) ?? category} medzi desiatimi bohmi`
                : `${article(category)} ${category}-group emphasis among the Ten Gods`;
        }
        return fact;
    }
    /* ---------------------------------------------------------- Human Design */
    if (sourceEntity === 'type') {
        const type = /^Type: ([^,]+)/.exec(fact)?.[1];
        if (type)
            return sk ? `typ ${type}` : `the ${type} type`;
    }
    if (sourceEntity === 'authority') {
        const authority = /^Authority: (.+)$/.exec(fact)?.[1];
        if (authority) {
            const short = authority.split(' / ')[0];
            return sk ? `autorita ${short}` : `${short} authority`;
        }
    }
    if (sourceEntity === 'profile') {
        const profile = /^Profile (\S+)/.exec(fact)?.[1];
        if (profile)
            return sk ? `profil ${profile}` : `the ${profile} profile`;
    }
    if (sourceEntity === 'definition') {
        const definition = /^Definition: (.+)$/.exec(fact)?.[1];
        if (!definition)
            return fact;
        /* The style guide's rule for this exact case: the Slovak noun carries the
           sentence and the canonical name rides along in brackets, so the reading
           stays checkable against any Human Design source without leaving an
           English noun phrase as the subject of a Slovak sentence. */
        return sk ? (hdDefinitionPhrase(definition) ?? definition) : definition;
    }
    if (sourceEntity.startsWith('channel-')) {
        const channel = sourceEntity.slice('channel-'.length);
        return sk ? `definovaný kanál ${channel}` : `Channel ${channel} defined`;
    }
    if (sourceEntity.startsWith('centre-')) {
        const centre = /^(.+?) centre (defined|open|undefined)$/.exec(fact);
        if (centre) {
            const defined = centre[2] === 'defined';
            return sk
                ? `${defined ? 'definované' : 'otvorené'} centrum ${centre[1]}`
                : `${defined ? 'a defined' : 'an open'} ${centre[1]} centre`;
        }
    }
    return fact;
}
/** The four systems, named as a reader meets them. */
export function pillarPhrase(pillar) {
    const NAMES = {
        numerology: { en: 'numerology', sk: 'numerológia' },
        astrology: { en: 'the chart', sk: 'mapa' },
        bazi: { en: 'BaZi', sk: 'BaZi' },
        'human-design': { en: 'Human Design', sk: 'Human Design' },
    };
    return slovak() ? NAMES[pillar].sk : NAMES[pillar].en;
}
