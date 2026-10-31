import { activeLocale } from '../i18n/locale.js?v=53c0693';
const c = (en, sk, ...tags) => ({ en, sk, tags });
/* ------------------------------------------------------------------- signs */
/* Compressed from astrologyVocabulary.ts, one per sign archetype. */
const SIGN = {
    aries: c('pushes toward starting before the ground is ready', 'tlačí do začiatku skôr, než je pôda pripravená', 'speed', 'autonomy'),
    taurus: c('slows things down and wants something tangible to hold', 'spomaľuje a chce niečo hmatateľné, čoho sa dá chytiť', 'endurance', 'practicality'),
    gemini: c('moves quickly between contexts and works in comparison', 'rýchlo preskakuje medzi súvislosťami a pracuje porovnávaním', 'expression', 'improvisation'),
    cancer: c('steers toward safety and what has been felt before', 'mieri k bezpečiu a k tomu, čo je už raz precítené', 'feeling', 'protection'),
    leo: c('needs the doing to be seen to count as done', 'potrebuje, aby bolo prácu vidieť, inak sa neráta za hotovú', 'visibility', 'expression'),
    virgo: c('pushes toward refining the work and noticing what does not fit', 'doťahuje prácu a všíma si, čo nesedí', 'refinement', 'verification', 'practicality'),
    libra: c('calibrates every position against the other person', 'si každý postoj overuje voči druhému človeku', 'calibration', 'deliberation'),
    scorpio: c('commits completely or withholds completely, and keeps a private reserve', 'buď ide do veci naplno, alebo vôbec, a vždy si niečo necháva pre seba', 'investigation', 'privacy'),
    sagittarius: c('reaches for the larger frame and says the uncomfortable part', 'siaha po väčšom rámci a povie aj to nepohodlné', 'abstraction', 'exposure'),
    capricorn: c('organises around competence and a long time horizon', 'stavia na schopnosti a na dlhom horizonte', 'method', 'endurance', 'control'),
    aquarius: c('holds a position on grounds it can state, and sees the system rather than the case', 'drží stanovisko na dôvodoch, ktoré vie vysloviť, a vidí systém, nie jednotlivý prípad', 'abstraction', 'autonomy'),
    pisces: c('absorbs the state of the room and works by resonance', 'nasáva náladu miestnosti a pracuje cez rezonanciu', 'receptivity', 'feeling'),
};
/* ----------------------------------------------------------------- numbers */
/* Compressed from numerologyArchetypes.ts, one per single-digit and master. */
const NUMBER = {
    1: c('pushes toward beginning, and beginning alone', 'tlačí do začiatku, a to bez cudzej pomoci', 'autonomy', 'speed'),
    2: c('will not have the thing decided alone', 'nepripustí, aby sa vec rozhodla osamote', 'calibration', 'receptivity'),
    3: c('does not count the thing as real until it has been said', 'neberie vec za skutočnú, kým nie je vyslovená', 'expression', 'visibility'),
    4: c('does not count anything finished until it can be relied on', 'neberie nič za hotové, kým sa na to nedá spoľahnúť', 'method', 'foundation'),
    5: c('insists every door stays unlocked', 'trvá na tom, aby zostali všetky dvere otvorené', 'improvisation', 'exposure'),
    6: c('takes on holding the thing together', 'berie na seba, aby vec držala pokope', 'calibration', 'endurance'),
    7: c('keeps pulling attention beneath the first answer', 'sa neuspokojí s prvou odpoveďou a ide za ňu', 'investigation', 'verification'),
    8: c('measures by the result and wants agency over it', 'meria podľa výsledku a chce naň dosah', 'control', 'practicality'),
    9: c('widens the view until the personal is only part of it', 'rozširuje pohľad, až je osobné len jeho časťou', 'abstraction', 'receptivity'),
    11: c('turns sensitivity into a signal rather than a setting', 'z citlivosti robí signál, nie trvalé nastavenie', 'feeling', 'receptivity'),
    22: c('wants to build to a plan larger than one stretch of work', 'chce stavať podľa plánu, ktorý presahuje jeden kus práce', 'method', 'foundation', 'control'),
    33: c('extends care past the people it is owed to', 'rozširuje starostlivosť aj za okruh tých, ktorým patrí', 'calibration', 'endurance'),
};
/* --------------------------------------------------------- the five phases */
const PHASE = {
    Wood: c('reaches outward and wants room to grow into', 'siaha von a pýta si priestor, do ktorého môže rásť', 'exposure', 'improvisation'),
    Fire: c('brings warmth and wants the thing visible', 'prináša teplo a chce mať vec na očiach', 'visibility', 'expression'),
    Earth: c('settles things and makes them reliable', 'veci usádza a robí ich spoľahlivými', 'endurance', 'protection'),
    Metal: c('cuts away what does not hold and insists on the standard', 'odstraňuje, čo neobstojí, a drží latku', 'standards', 'refinement'),
    Water: c('goes around rather than through, and listens first', 'nejde cez prekážku, ale okolo nej, a najprv počúva', 'receptivity', 'investigation'),
};
/* The Day Master's own strength, which is what a reading turns on first. */
const DAY_MASTER_STRENGTH = {
    weak: c('means the chart\'s own centre is outweighed by its season, so timing and support matter more than force', 'znamená, že ročné obdobie je silnejšie než samotný kmeň, takže viac než sila rozhoduje načasovanie a opora', 'receptivity', 'calibration'),
    'moderately-weak': c('means the chart\'s centre is slightly outweighed by its season and works better with support than alone', 'znamená, že ročné obdobie má nad kmeňom mierne navrch, takže s oporou to ide lepšie než osamote', 'receptivity', 'calibration'),
    balanced: c('means the chart\'s centre is neither outmatched nor dominant, so neither forcing nor waiting is the default', 'znamená, že kmeň a jeho ročné obdobie sú vyrovnané, takže ani tlačiť, ani čakať nie je východisko', 'deliberation'),
    'moderately-strong': c('means the chart\'s centre holds its own season, so it can carry a load without borrowing', 'znamená, že kmeň sa vo svojom ročnom období udrží, takže unesie záťaž bez požičiavania', 'endurance', 'autonomy'),
    strong: c('means the chart\'s centre dominates its season, so the difficulty is spending the force rather than finding it', 'znamená, že kmeň má nad svojím ročným obdobím navrch, takže ťažšie je tú silu minúť než nájsť', 'control', 'autonomy'),
};
/*
 * THE SEASONAL STATE, WHICH IS A CONDITION RATHER THAN A TRAIT.
 *
 * The strength verdict above and this are not the same thing and are not
 * duplicates. Strength is the whole chart's verdict on its own centre, counted
 * over every pillar; this is the single relationship between the Day Master's
 * phase and the month that commands it, which is the layer Ziping weighs most
 * heavily and the one the fifty seasonal readings are written from.
 *
 * Without an entry here the seasonal fact reached the mechanism layer with
 * nothing to contribute, so the most heavily weighted result in the pillar was
 * the one result that could only ever be named and never explained. Each phrase
 * compresses what that state's ten authored readings already say - what the
 * season does to the stem, and what the chart consequently needs.
 */
const SEASONAL_STATE = {
    prosperous: c('runs the stem at full strength with nothing moderating it, so what is needed is an outlet rather than more support', 'beží na plnej sile a nič ho netlmí, takže nepotrebuje ďalšiu podporu, ale kam silu odviesť', 'endurance', 'autonomy'),
    aided: c('feeds the stem from outside, so there is capacity here to spend rather than capacity to protect', 'dostáva podporu zvonku, takže je tu sila na míňanie, nie sila, ktorú treba chrániť', 'foundation', 'endurance'),
    resting: c('draws on the stem continuously, so what it produces leaves and the cost is not felt while it is being paid', 'je neustále čerpaný, takže to, čo vzniká, odchádza a cena sa v tej chvíli necíti', 'expression', 'receptivity'),
    trapped: c('sets the stem against its season, so the work gets done and it gets done against resistance', 'ide proti svojmu ročnému obdobiu, takže práca sa urobí, ale proti odporu', 'control', 'endurance'),
    dead: c('presses on the stem, so results come from selection and timing rather than from force', 'je pod tlakom ročného obdobia, takže výsledky prichádzajú cez výber a načasovanie, nie cez silu', 'calibration', 'receptivity'),
};
const POLARITY = {
    yang: c('pulls the whole reading toward acting outward before waiting', 'ťahá celý výklad skôr ku konaniu navonok než k čakaniu', 'exposure', 'speed'),
    yin: c('pulls the whole reading toward absorbing before acting', 'ťahá celý výklad skôr k vstrebávaniu než ku konaniu', 'containment', 'receptivity'),
};
const TEN_GOD = {
    output: c('puts the pressure on producing something visible', 'kladie tlak na to, aby vzniklo niečo viditeľné', 'expression', 'visibility'),
    resource: c('puts the emphasis on what feeds and supports the centre', 'kladie dôraz na to, čo kmeň živí a podopiera', 'receptivity', 'foundation'),
    wealth: c('puts the emphasis on what can be held and used', 'kladie dôraz na to, čo sa dá udržať a použiť', 'control', 'practicality'),
    /* Keyed `authority`, which is the engine's own name for this family (Direct
       Officer and Seven Killings - see tenGodsEngine's category union). It was
       keyed `officer`, a key the engine never emits, so a Record miss returned
       undefined and this was the one Ten God emphasis that could be counted and
       named but never explained. */
    authority: c('puts the emphasis on the structure the chart has to work inside', 'kladie dôraz na štruktúru, vnútri ktorej mapa musí fungovať', 'method', 'standards'),
    companion: c('puts the emphasis on standing level with others rather than above them', 'kladie dôraz na to stáť vedľa druhých, nie nad nimi', 'autonomy', 'calibration'),
};
/* --------------------------------------------------------- Human Design */
const HD_TYPE = {
    'Manifesting Generator': c('moves fast once something has actually been responded to, and skips the steps it can', 'sa pohne rýchlo, len čo na niečo naozaj zareaguje, a preskočí kroky, ktoré preskočiť vie', 'speed', 'embodiment'),
    Generator: c('answers rather than originates, and renews only on work it said yes to', 'skôr odpovedá, než začína, a načerpá len z práce, na ktorú povedal áno', 'embodiment', 'endurance'),
    Manifestor: c('initiates first and meets resistance for it', 'začína prvý a naráža za to na odpor', 'autonomy', 'speed'),
    Projector: c('sees the system rather than running it, and works through being asked', 'vidí systém namiesto toho, aby ho riadil, a funguje cez pozvanie', 'abstraction', 'receptivity'),
    Reflector: c('reads the room rather than carrying a fixed setting of its own', 'číta miestnosť namiesto toho, aby niesol vlastné pevné nastavenie', 'receptivity', 'calibration'),
};
const HD_AUTHORITY = {
    Sacral: c('answers in the body before the mind has finished the question', 'odpovedá v tele skôr, než myseľ dokončí otázku', 'embodiment', 'speed'),
    Emotional: c('holds that there is no truth in the moment, so nothing is decided on the first reading', 'trvá na tom, že v okamihu niet pravdy, takže sa nič nerozhoduje na prvé čítanie', 'deliberation', 'feeling'),
    Splenic: c('gives one quiet signal, once, in the present tense', 'dá jeden tichý signál, raz, v prítomnom čase', 'embodiment', 'privacy'),
    Ego: c('decides by what it actually wants out of the thing', 'sa rozhoduje podľa toho, čo z veci naozaj chce', 'control', 'autonomy'),
    'Self-Projected': c('finds the direction in the voice rather than in the reasoning', 'nachádza smer v hlase, nie v uvažovaní', 'expression', 'autonomy'),
    Mental: c('lets the environment settle what the argument cannot', 'necháva prostredie rozhodnúť to, čo argument nevyrieši', 'receptivity', 'calibration'),
    Lunar: c('needs a full month before the answer is trustworthy', 'potrebuje celý mesiac, kým je odpoveď spoľahlivá', 'deliberation', 'receptivity'),
};
const HD_DEFINITION = {
    'Single Definition': c('runs as one continuous circuit that needs nothing external to close it', 'beží ako jeden súvislý okruh, ktorý na uzavretie nepotrebuje nič zvonku', 'autonomy', 'endurance'),
    'Split Definition': c('leaves a gap between two defined areas that other people tend to bridge', 'necháva medzeru medzi dvoma definovanými oblasťami, ktorú zvyknú premostiť iní ľudia', 'calibration', 'receptivity'),
    'Triple Split Definition': c('leaves three separate areas, which is a design that takes its time', 'necháva tri oddelené oblasti, čo je dizajn, ktorý si dá načas', 'deliberation', 'calibration'),
    'Quadruple Split Definition': c('leaves four fixed separate areas, which is rare and slow to integrate', 'necháva štyri pevné oddelené oblasti, čo je zriedkavé a integruje sa pomaly', 'endurance', 'privacy'),
    'No Definition': c('carries nothing fixed, so it is shaped by whatever is present', 'nenesie nič pevné, takže tvar dáva to, čo je práve prítomné', 'receptivity', 'calibration'),
};
/**
 * The six profile lines.
 *
 * A profile is composed rather than listed: `5/1` is the fifth line's
 * contribution and the first line's, which is twelve profiles from six
 * entries and keeps the two halves visibly separate in the prose.
 */
const PROFILE_LINE = {
    1: c('wants a foundation solid enough to stand on before it acts', 'chce základ dosť pevný na to, aby sa naň dalo postaviť, skôr než začne konať', 'foundation', 'verification'),
    2: c('works best left alone until something calls it out', 'funguje najlepšie v pokoji, kým nepríde konkrétne pozvanie', 'privacy', 'autonomy'),
    3: c('finds out what works by trying it and discarding what does not', 'zisťuje, čo funguje, tak, že to skúsi a odloží, čo nefunguje', 'improvisation', 'exposure'),
    4: c('moves through people it already knows rather than through strangers', 'napreduje cez ľudí, ktorých už pozná, nie cez cudzích', 'calibration'),
    5: c('attracts expectations it did not ask for and has to deliver against them', 'priťahuje nevyžiadané očakávania a musí im dostáť', 'visibility', 'expression'),
    6: c('watches first and commits later', 'najprv pozoruje a zaviaže sa neskôr', 'deliberation', 'abstraction'),
};
const CHART_ELEMENT = {
    Fire: c('pulls the rest toward moving before the picture is complete', 'ťahá zvyšok k tomu pohnúť sa skôr, než je obraz úplný', 'speed', 'exposure'),
    Earth: c('pulls the rest toward what can be demonstrated', 'ťahá zvyšok k tomu, čo sa dá preukázať', 'practicality', 'endurance'),
    Air: c('pulls the rest toward naming the thing before holding it', 'ťahá zvyšok k tomu vec najprv pomenovať a až potom udržať', 'abstraction', 'expression'),
    Water: c('pulls the rest toward treating feeling as the first information', 'ťahá zvyšok k tomu brať pocit ako prvú informáciu', 'feeling', 'receptivity'),
};
const CHART_MODALITY = {
    Cardinal: c('pulls the rest toward opening things rather than continuing them', 'ťahá zvyšok k otváraniu vecí, nie k ich pokračovaniu', 'speed', 'autonomy'),
    Fixed: c('pulls the rest toward holding a position once taken', 'ťahá zvyšok k držaniu raz zaujatého stanoviska', 'endurance', 'protection'),
    Mutable: c('pulls the rest toward adapting to what is actually happening', 'ťahá zvyšok k prispôsobeniu sa tomu, čo sa naozaj deje', 'improvisation', 'calibration'),
};
/* -------------------------------------------------------------- resolution */
const pick = (entry) => entry ?? null;
/**
 * What this result contributes, or null when nothing is authored for it.
 *
 * Null is a legitimate and common answer - aspects, hemisphere balance and
 * centre states have no entry. Those results can still be named;
 * they simply do not drive a mechanism sentence, because this file would have
 * to invent what they bring in order for them to.
 */
export function contributionFor(evidence) {
    const { pillar, sourceEntity, fact } = evidence;
    if (pillar === 'numerology') {
        const value = /(\d+)\s*$/.exec(fact)?.[1];
        return value ? pick(NUMBER[value]) : null;
    }
    if (pillar === 'astrology') {
        if (sourceEntity.startsWith('placement-') || sourceEntity === 'ascendant') {
            const sign = /\bin (\w+)/.exec(fact)?.[1];
            return sign ? pick(SIGN[sign.toLowerCase()]) : null;
        }
        if (sourceEntity === 'elementBalance') {
            return pick(CHART_ELEMENT[/Element emphasis: (\w+)/.exec(fact)?.[1] ?? '']);
        }
        if (sourceEntity === 'modalityBalance') {
            return pick(CHART_MODALITY[/Modality emphasis: (\w+)/.exec(fact)?.[1] ?? '']);
        }
        return null;
    }
    if (pillar === 'bazi') {
        if (sourceEntity === 'dayMaster') {
            const tendency = /tendency ([\w-]+)/.exec(fact)?.[1];
            return tendency ? pick(DAY_MASTER_STRENGTH[tendency]) : null;
        }
        if (sourceEntity === 'dayMasterSeason') {
            return pick(SEASONAL_STATE[/is seasonally (\w+)/.exec(fact)?.[1] ?? '']);
        }
        if (sourceEntity === 'elementBalance') {
            return pick(PHASE[/Dominant phase: (\w+)/.exec(fact)?.[1] ?? '']);
        }
        if (sourceEntity === 'polarityBalance') {
            const balance = /(\d+) Yang \/ (\d+) Yin/.exec(fact);
            if (!balance)
                return null;
            return pick(POLARITY[Number(balance[1]) >= Number(balance[2]) ? 'yang' : 'yin']);
        }
        if (sourceEntity.startsWith('tenGod-')) {
            return pick(TEN_GOD[sourceEntity.slice('tenGod-'.length)]);
        }
        return null;
    }
    if (sourceEntity === 'type')
        return pick(HD_TYPE[/^Type: ([^,]+)/.exec(fact)?.[1] ?? '']);
    if (sourceEntity === 'authority') {
        /* `Emotional / Solar Plexus` and `Ego (Manifested)` both key off the first
           word, which is the name the reading uses everywhere else. */
        const authority = /^Authority: (\w[\w-]*)/.exec(fact)?.[1];
        return authority ? pick(HD_AUTHORITY[authority]) : null;
    }
    if (sourceEntity === 'definition') {
        return pick(HD_DEFINITION[/^Definition: (.+)$/.exec(fact)?.[1] ?? '']);
    }
    if (sourceEntity === 'profile') {
        const lines = /^Profile (\d)\/(\d)/.exec(fact);
        if (!lines)
            return null;
        const conscious = PROFILE_LINE[lines[1]];
        const unconscious = PROFILE_LINE[lines[2]];
        if (!conscious || !unconscious)
            return null;
        /*
         * BOTH HALVES, JOINED - AND THE SECOND ONE NAMED BY ITS NUMBER.
         *
         * This said "while its second line …", which for a 5/1 profile describes
         * line 1 as the second line. A reader who knows the system reads "second
         * line" as line 2, and one who does not is told something false about the
         * only two numbers on the screen. The English was the error; the Slovak
         * („kým jeho druhá línia") was a faithful translation of it.
         *
         * In Human Design the first number is the conscious Personality line and
         * the second the unconscious Design line, so "the second line" is not even
         * the system's own name for it. Naming the number removes the ambiguity in
         * both languages without asking the reader to know that.
         */
        return {
            en: `${conscious.en}; underneath it, line ${lines[2]} ${unconscious.en}`,
            sk: `${conscious.sk}; pod tým línia ${lines[2]} ${unconscious.sk}`,
            tags: [...conscious.tags, ...unconscious.tags],
        };
    }
    return null;
}
/** The contribution phrase in the reader's language. */
export const contributionText = (contribution) => (activeLocale() === 'sk' ? contribution.sk : contribution.en);
/** Everything the lexicon knows, for the coverage test. */
export const CONTRIBUTION_TABLES = {
    SIGN, NUMBER, PHASE, DAY_MASTER_STRENGTH, SEASONAL_STATE, POLARITY, TEN_GOD,
    HD_TYPE, HD_AUTHORITY, HD_DEFINITION, PROFILE_LINE, CHART_ELEMENT, CHART_MODALITY,
};
