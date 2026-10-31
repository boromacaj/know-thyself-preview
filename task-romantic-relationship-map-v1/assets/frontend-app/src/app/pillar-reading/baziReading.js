import { composeZodiacReading, parseZodiac } from './chineseZodiac.js';
import { resolve } from '../knowledge/knowledgeBase.js';
import { branchAnimalGlyph, branchGlyph, phaseGlyph, PHASE_LABELS, polarityGlyph, stemGlyph, taijituGlyph, } from './glyphs/pillarGlyphs.js';
import { SectionBuilder, outputValue, technicalValue, outputNote, headingFor, } from './composeReading.js';
import { composeBaziNarrative } from './bazi-narrative/composeBaziNarrative.js';
import { engineProse, phaseWord, } from '../i18n/engineProse.js';
import { t, tf } from '../i18n/uiStrings.js';
/**
 * BAZI, AS A READING.
 *
 * The old screen read like a lab report: stems, branches, element counts, a
 * strength score. All of it correct, none of it saying anything.
 *
 * THE DAY MASTER IS THE ANCHOR, AND THE SEASON IS NOT A FOOTNOTE.
 *
 * The Ziping tradition weighs three things before saying anything about a stem -
 * the commanding month, rooting, and overall momentum - so the Day Master is
 * resolved SEASONALLY FIRST. The engine gives its own five-state verdict
 * (prosperous / aided / resting / trapped / dead) and there is a written reading
 * for all fifty stem-and-state combinations; the plain stem reading is the
 * fallback, not the default. A Ji Earth in autumn is not a Ji Earth with an
 * autumn note appended.
 *
 * NOT THE CHINESE ZODIAC.
 *
 * A branch gets its animal pictogram, because the brief asks for a Rabbit near
 * the word Rabbit and that is a fair request. But the animal is a label on a
 * container of hidden stems with a season and a set of relations - it is not the
 * interpretation, and no prose here treats it as one.
 *
 * FOUR ELEMENT LAYERS, NOT ONE.
 *
 * Raw visible count, hidden stems, seasonal weighting, and the model-derived
 * support figure answer four different questions and disagree routinely. The
 * inner-world section keeps them apart and says why.
 *
 * SYMBOLIC ONLY.
 *
 * The TCM section stays clearly marked as traditional correspondence. Nothing
 * here is a health statement, and the taxonomy has no dimension that could
 * express one.
 *
 * THE READING IS THE NARRATIVE LAYER; THE REST IS WHY.
 *
 * The main reading is composed in bazi-narrative/ from the engine's typed
 * result - interpretation model, plan, voice - in six sections that follow a
 * Ziping argument from the Day Master in its season to what to practise. What
 * used to BE the reading - the fifty seasonal units and the stem portraits
 * dealt into life-area headings - left it: those units stay in the knowledge
 * base, where the synthesis reads their semantics, but their prose told
 * readers about families, jobs, partners and events the chart cannot know, and
 * compared them with "most people". The system material the reading rests on
 * (the Day Master, the season and its strength model, the five-phase counts,
 * the pillars, hidden stems, Ten Gods, Luck Pillars, TCM) is all still here,
 * one disclosure down, together with the evidence for every section.
 */
/**
 * The engine reports the classical seasonal names, and two of them are alarming
 * in English. "Dead" describes a phase being controlled by the season; it is not
 * a statement about a person, and handing a reader the word unexplained is the
 * easiest way to do harm with this system. The engine's exact term is preserved
 * in the technical appendix, where it belongs; the reading says what it means.
 */
const STATE_PLAIN = {
    prosperous: 'reading.bazi.state.prosperous',
    aided: 'reading.bazi.state.aided',
    resting: 'reading.bazi.state.resting',
    trapped: 'reading.bazi.state.trapped',
    dead: 'reading.bazi.state.dead',
};
/** The plain description of a seasonal state, in the reader's language. */
const statePlain = (state) => (STATE_PLAIN[state] ? t(STATE_PLAIN[state]) : null);
/** Year / Month / Day / Hour, as the reading says them rather than as ids. */
const POSITION_NAME = {
    Year: 'reading.bazi.position.year',
    Month: 'reading.bazi.position.month',
    Day: 'reading.bazi.position.day',
    Hour: 'reading.bazi.position.hour',
};
/** Relationship label patterns, most specific first. Order is load-bearing. */
const RELATION_PATTERNS = [
    [/stem combination/i, 'stem-combination'],
    [/stem clash/i, 'stem-clash'],
    [/six clash/i, 'branch-six-clash'],
    [/three harmony/i, 'branch-three-harmony'],
    [/six harmony/i, 'branch-six-harmony'],
    [/six harm/i, 'branch-six-harm'],
    [/self-punishment|self punishment/i, 'branch-self-punishment'],
    [/mutual punishment/i, 'branch-mutual-punishment'],
    [/punishment/i, 'branch-three-punishment'],
];
const key = (value) => value.trim().toLowerCase();
/*
 * "an Earth branch", not "a Earth branch".
 *
 * Decided from the WORD being printed, not from the phase key, so it is right
 * for any phase name in any wording rather than for a list of exceptions. The
 * twin of this lives in bigThree.ts for the astrology reading; they are two
 * lines each and deliberately not shared, because the only shared home for them
 * is the localization layer and neither pass was scoped to touch it.
 *
 * Slovak has no articles and its sentence never referenced one, so an unused
 * parameter is simply not interpolated.
 */
export const article = (word) => (/^[aeiou]/i.test(word.trim()) ? 'an' : 'a');
const slug = (value) => value.trim().toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
/** "Ding Mao (Yin Fire Rabbit)" -> its stem and branch names. */
function parseStemBranch(value) {
    const match = /^([A-Za-z]+)\s+([A-Za-z]+)/.exec(value.trim());
    return match ? { stem: match[1], branch: match[2] } : null;
}
/** "Earth is seasonally resting" -> 'resting'. */
function parseSeasonalState(value) {
    if (!value)
        return undefined;
    const match = /seasonally\s+(prosperous|aided|resting|trapped|dead)/i.exec(value);
    return match ? match[1].toLowerCase() : undefined;
}
export function composeBaziReading(pillar) {
    const builder = new SectionBuilder();
    const shownLabels = [];
    const marksBySection = {};
    const heroMarks = [];
    /* ------------------------------------------------------- day master */
    const dayMasterValue = outputValue(pillar, 'Day Master');
    const dayMasterStem = dayMasterValue ? /^([A-Za-z]+)/.exec(dayMasterValue)?.[1] : undefined;
    const seasonalValue = outputValue(pillar, 'Seasonal context') ?? undefined;
    const seasonalState = parseSeasonalState(seasonalValue);
    const tendency = technicalValue(pillar, 'Tendency')
        ?? outputValue(pillar, 'Day Master strength tendency');
    /* How the birth time was given. An estimated hour marks every entry below
       that rests on the hour pillar; an unknown one has no hour pillar at all. */
    const precision = pillar.baziChart?.timePrecision ?? 'exact';
    const estimatedHour = precision === 'approximate';
    const counts = pillar.baziChart?.bazi.elementCounts;
    if (dayMasterStem) {
        shownLabels.push('Day Master');
        heroMarks.push({
            glyph: stemGlyph(dayMasterStem, { title: dayMasterStem }),
            label: 'Day Master',
            value: dayMasterValue ?? dayMasterStem,
            ...(seasonalState && STATE_PLAIN[seasonalState]
                ? {
                    note: tf('reading.bazi.dayMaster.bornNote', {
                        state: statePlain(seasonalState) ?? '',
                    }),
                }
                : {}),
        });
    }
    /* ---------------------------------------------------- THE NARRATIVE */
    /*
     * The main reading, composed from the engine's typed result rather than from
     * the display strings. Registered first, so the reading's own sentences are
     * the ones every later paragraph is de-duplicated against.
     */
    const narrative = composeBaziNarrative(pillar.baziChart);
    if (narrative) {
        for (const section of narrative.sections) {
            builder.add(section.id, section.paragraphs);
            if (section.standfirst)
                builder.standfirst(section.id, section.standfirst);
        }
        builder.setEntries('bazi-evidence', narrative.evidence.map((entry) => (entry.id === 'why-rest'
            ? { ...entry, title: `${headingFor('bazi-costs')} · ${headingFor('bazi-practice')}` }
            : entry)));
        builder.describe('bazi-evidence', { layer: 'deep' });
        builder.standfirst('bazi-evidence', narrative.evidenceStandfirst);
    }
    /* ------------------------------------------- YOUR CHINESE ZODIAC */
    /*
     * The way in. Almost every reader already knows their animal, and the pillar
     * used to open on a Day Master they had never heard of - which is an expert's
     * order, not a reader's. The animal comes first, and says plainly that it is
     * one pillar of four so that the door is not mistaken for the building.
     */
    const zodiac = parseZodiac(outputNote(pillar, 'Year pillar'));
    if (zodiac) {
        const animalUnit = resolve({
            system: 'bazi', kind: 'earthly-branch', key: key(zodiac.animal), role: 'base-archetype',
        });
        const zodiacReading = composeZodiacReading(zodiac, animalUnit ? animalUnit.core : []);
        builder.add('chinese-zodiac', zodiacReading.paragraphs);
        builder.describe('chinese-zodiac', { layer: 'glance', infoKey: 'chinese-zodiac' });
        builder.standfirst('chinese-zodiac', 
        /* Through the overlay: the same value is the mark beside this sentence,
           and it was printing `Fire Rabbit` into Slovak prose while the mark
           read `Ohnivý zajac`. A no-op in English. */
        tf('reading.bazi.zodiac.standfirst', { title: engineProse(zodiacReading.title) }));
        marksBySection['chinese-zodiac'] = [{
                glyph: '', label: 'Year animal', value: zodiacReading.title,
                note: tf('reading.bazi.zodiac.markNote', {
                    /* `kmeň ... nad vetvou ...` names both phases as what the stem and the
                       branch are MADE OF, which Slovak puts in the genitive. A no-op in
                       English, where the frame is `a Fire stem over a Wood branch`. */
                    polarity: zodiac.polarity,
                    element: phaseWord(zodiac.element, 'genitive'),
                    branchElement: phaseWord(zodiac.branchElement, 'genitive'),
                    /* "an Earth branch", not "a Earth branch". Decided from the word being
                       printed rather than from the phase key, so it stays right whatever
                       the wording becomes; Slovak has no articles and never referenced it. */
                    branchArticle: article(phaseWord(zodiac.branchElement, 'genitive')),
                }),
                infoKey: 'chinese-zodiac',
            }];
    }
    /* --------------------------------------------- AT A GLANCE */
    const glanceMarks = [];
    const glance = (label, value, infoKey) => {
        if (value)
            glanceMarks.push({ glyph: '', label, value, ...(infoKey ? { infoKey } : {}) });
    };
    if (zodiac)
        glance('Chinese zodiac', `${zodiac.element} ${zodiac.animal}`, 'chinese-zodiac');
    glance('Day Master', outputValue(pillar, 'Day Master'), 'day-master');
    glance('Day Master strength', outputValue(pillar, 'Day Master strength tendency'));
    /*
     * The counts from the engine's typed result. The VALUE stays the engine's
     * English form - a mark value is a calculated result and is identical in
     * every language - and the renderer's engineProse overlay says the phase
     * names in the reader's language (it printed `Wood 1 / Fire 2` into the
     * Slovak strip until the overlay learned the pattern). They count what was
     * read, so an unknown hour says the six known characters and an estimated
     * one says it includes the estimate.
     */
    const countNote = precision === 'unknown' || !pillar.baziChart?.bazi.hourPillar
        ? t('reading.bazi.glance.knownNote')
        : estimatedHour ? t('reading.bazi.glance.estimatedNote') : null;
    const elementsGlance = counts
        ? ['Wood', 'Fire', 'Earth', 'Metal', 'Water']
            .map((phase) => `${phase} ${counts[phase] ?? 0}`).join(' / ')
        : (outputValue(pillar, 'Five Elements (raw)') ?? outputValue(pillar, 'Five Elements'));
    if (elementsGlance) {
        glanceMarks.push({
            glyph: '', label: 'Five Elements', value: elementsGlance, infoKey: 'five-elements',
            ...(countNote ? { note: countNote } : {}),
        });
    }
    const yinYangGlance = outputValue(pillar, 'Yin / Yang');
    if (yinYangGlance) {
        glanceMarks.push({ glyph: '', label: 'Yin / Yang', value: yinYangGlance, ...(countNote ? { note: countNote } : {}) });
    }
    if (glanceMarks.length > 0) {
        builder.describe('at-a-glance', { layer: 'glance' });
        builder.standfirst('at-a-glance', t('reading.bazi.atAGlance.standfirst'));
        marksBySection['at-a-glance'] = glanceMarks;
    }
    /* ------------------------------------------------ YOUR DAY MASTER */
    /*
     * Its own section, after the accessible zodiac and the structural overview.
     * The full authored reading of what the Day Master means for this person stays
     * in the portrait below - this section exists so the reader is told WHAT the
     * Day Master is, and where it sits, at the point the chart starts depending on
     * it. Repeating the portrait here would be the exact duplication the info
     * layer exists to avoid.
     */
    const dayMasterIdentity = outputValue(pillar, 'Day Master');
    if (dayMasterIdentity) {
        /* The concept, one disclosure down: the reading above already speaks from
           the Day Master, and this is what the term means in the system. The
           strength verdict used to be restated here as well - it is the reading's
           second paragraph and the evidence's third line, and a fourth telling
           added nothing but length. */
        builder.describe('day-master', { layer: 'deep', infoKey: 'day-master' });
        builder.standfirst('day-master', t('reading.bazi.dayMaster.standfirst'));
        builder.add('day-master', [
            tf('reading.bazi.dayMaster.body', { dayMaster: engineProse(dayMasterIdentity) }),
            t('reading.bazi.dayMaster.portraitFollows'),
        ]);
    }
    /* ---------------------------------------------------- the four pillars */
    const pillarEntries = [];
    /* A branch can occupy two pillars, and its reading must not be printed twice.
       The repetition is itself worth saying, so the second occurrence gets a line
       naming it rather than the full entry again. */
    const claimedBranches = new Set();
    const claimedPairs = new Set();
    for (const position of ['Year', 'Month', 'Day', 'Hour']) {
        const label = `${position} pillar`;
        const value = outputValue(pillar, label) ?? outputValue(pillar, `${position} Pillar`);
        if (!value)
            continue;
        shownLabels.push(label);
        /* The engine's own word stays the lookup key above; this is how the pillar
           is NAMED in the reading. */
        const positionName = t(POSITION_NAME[position]);
        const paragraphs = [];
        /* An estimated hour is said at the top of the Hour entry, where the reader
           meets what rests on it - not only in the main reading's opening note. */
        const fromEstimate = position === 'Hour' && estimatedHour;
        if (fromEstimate)
            paragraphs.push(t('reading.bazi.pillarEstimatedNote'));
        const positionUnit = resolve({
            system: 'bazi', kind: 'heavenly-stem', key: `position-${position.toLowerCase()}`,
            role: 'base-archetype',
        });
        if (positionUnit)
            paragraphs.push(...positionUnit.core);
        if (/unavailable/i.test(value)) {
            pillarEntries.push({
                id: `pillar-${position.toLowerCase()}`,
                title: tf('reading.bazi.pillarTitleUnavailable', { position: positionName }),
                paragraphs,
            });
            continue;
        }
        const parsed = parseStemBranch(value);
        if (parsed) {
            /* The PAIR first - what the branch does to the stem standing on it - then
               the branch's own reading. The stem alone is deliberately not repeated
               here: for the Day pillar it is the Day Master and already the whole
               portrait above, and for the others the pair reading covers it. */
            const pairUnit = resolve({
                system: 'bazi', kind: 'heavenly-stem',
                key: `pillar-${key(parsed.stem)}-${key(parsed.branch)}`, role: 'base-archetype',
            });
            const branchReading = resolve({
                system: 'bazi', kind: 'earthly-branch', key: key(parsed.branch), role: 'base-archetype',
            });
            const pairKey = `${key(parsed.stem)}-${key(parsed.branch)}`;
            if (pairUnit && !claimedPairs.has(pairKey)) {
                claimedPairs.add(pairKey);
                paragraphs.push(...pairUnit.core);
            }
            else if (pairUnit) {
                paragraphs.push(tf('reading.bazi.pillarRepeatsPair', { position: positionName }));
            }
            if (branchReading && !claimedBranches.has(key(parsed.branch))) {
                claimedBranches.add(key(parsed.branch));
                /*
                 * WHAT THE BRANCH IS MADE OF, NOT A SECOND PORTRAIT. A branch unit's
                 * first paragraph is its structure - season, hidden stems, what they do
                 * together; the second is a character sketch of the animal ("precise,
                 * fault-finding ..."). The main reading now reads each branch by what it
                 * is to THIS Day Master, so the sketch was a second, unreconciled
                 * personality reading of the same character one disclosure down. The
                 * structure stays; the sketch stays in the knowledge base.
                 */
                paragraphs.push(branchReading.core[0]);
            }
            else if (branchReading) {
                paragraphs.push(tf('reading.bazi.branchRepeats', {
                    branch: parsed.branch, position: positionName,
                }));
            }
        }
        pillarEntries.push({
            id: `pillar-${position.toLowerCase()}`,
            title: tf(fromEstimate ? 'reading.bazi.pillarTitleEstimated' : 'reading.bazi.pillarTitle', { position: positionName, value }),
            ...(parsed ? {
                mark: {
                    glyph: `${stemGlyph(parsed.stem)}${branchGlyph(parsed.branch)}${branchAnimalGlyph(parsed.branch)}`,
                    label: position, value,
                },
            } : {}),
            paragraphs,
        });
    }
    /* ------------------------------------------------- hidden stems */
    const hiddenOutputs = pillar.keyOutputs.filter((output) => /branch hidden stems/i.test(output.label));
    if (hiddenOutputs.length > 0) {
        const hiddenUnit = resolve({
            system: 'bazi', kind: 'luck-pillar', key: 'hidden-stems', role: 'base-archetype',
        });
        const paragraphs = hiddenUnit ? [...hiddenUnit.core] : [];
        /* The engine reports each hidden stem with a role and a percentage. A
           percentage is not a reading, so the roles are translated into the three
           written entries and the numbers stay in the technical appendix. */
        const rolesPresent = new Set();
        for (const output of hiddenOutputs) {
            shownLabels.push(output.label);
            for (const match of (output.description ?? '').matchAll(/\((primary|secondary|tertiary),/gi)) {
                rolesPresent.add(match[1].toLowerCase());
            }
        }
        for (const role of ['primary', 'secondary', 'tertiary']) {
            if (!rolesPresent.has(role))
                continue;
            const unit = resolve({
                system: 'bazi', kind: 'luck-pillar', key: `hidden-stem-${role}`, role: 'base-archetype',
            });
            if (unit)
                paragraphs.push(...unit.core);
        }
        /* The engine labels these `Year branch hidden stems`; the list wants just the
           position, and in Slovak it wants the NOMINATIVE - `Rok: Yi`, not the
           `roka` that `Pilier roka` needs. Unknown positions fall through to the
           engine's own word rather than to a blank. */
        const POSITION_KEY = {
            year: 'reading.bazi.positionName.year',
            month: 'reading.bazi.positionName.month',
            day: 'reading.bazi.positionName.day',
            hour: 'reading.bazi.positionName.hour',
        };
        const described = hiddenOutputs
            .map((output) => {
            const position = output.label.replace(/ branch hidden stems/i, '');
            /* The Hour branch of an estimated time is named as estimated here too. */
            const key = position.toLowerCase() === 'hour' && estimatedHour
                ? 'reading.bazi.positionName.hourEstimated'
                : POSITION_KEY[position.toLowerCase()];
            return `${key ? t(key) : position}: ${output.value}`;
        })
            .join('; ');
        /*
         * WHICH OF THEM ALSO STAND ON THE SURFACE. This sentence used to say that
         * none of the hidden stems appears among the visible characters - false for
         * most charts (Boris's Geng, Wu, Ding and Ji are all visible stems as well),
         * and "eight" for a chart read from six. It now says what is true of this
         * chart, from the engine's typed pillars.
         */
        const typedPillars = [
            pillar.baziChart?.bazi.yearPillar, pillar.baziChart?.bazi.monthPillar,
            pillar.baziChart?.bazi.dayPillar, pillar.baziChart?.bazi.hourPillar,
        ].filter((entry) => Boolean(entry));
        const surface = new Set(typedPillars.map((entry) => entry.stem.name));
        const alsoVisible = [...new Set(typedPillars.flatMap((entry) => entry.hiddenStems.map((hidden) => hidden.stem.name)))]
            .filter((name) => surface.has(name));
        const listed = alsoVisible.length > 1
            ? `${alsoVisible.slice(0, -1).join(', ')}${t('reading.list.and')}${alsoVisible[alsoVisible.length - 1]}`
            : alsoVisible[0] ?? '';
        paragraphs.push(alsoVisible.length === 0
            ? tf('reading.bazi.hiddenStems.bodyNone', { described })
            : tf(alsoVisible.length === 1 ? 'reading.bazi.hiddenStems.bodyOne' : 'reading.bazi.hiddenStems.bodyMany', { described, visible: listed }));
        /* Was filed under 'strengths', which is not what a hidden stem is - it is a
           structural fact about what the branches contain, not a talent. It now sits
           in the section the hierarchy already declared for it. */
        builder.add('hidden-stems', paragraphs);
        builder.describe('hidden-stems', { layer: 'deep', infoKey: 'hidden-stem' });
        builder.standfirst('hidden-stems', t('reading.bazi.hiddenStems.standfirst'));
    }
    /* --------------------------------------------------- five elements */
    const elements = outputValue(pillar, 'Five Elements (raw)') ?? outputValue(pillar, 'Five Elements');
    const yinYang = outputValue(pillar, 'Yin / Yang');
    const elementMarks = [];
    /* How the balance is arrived at. Same section, one disclosure down. */
    const balanceMethod = [];
    /* The leading phase in full - its movement, its season, what feeds and checks
       it. Its own entry, because it is a different subject from the counting. */
    const elementMechanics = [];
    let dominantPhaseLabel = null;
    if (elements) {
        shownLabels.push('Five Elements (raw)');
        const counts = [...elements.matchAll(/([A-Za-z]+)\s*(\d+)/g)]
            .map((match) => ({ phase: match[1], count: Number(match[2]) }));
        for (const entry of counts) {
            elementMarks.push({
                glyph: phaseGlyph(entry.phase, { title: PHASE_LABELS[key(entry.phase)] ?? entry.phase }),
                label: PHASE_LABELS[key(entry.phase)] ?? entry.phase,
                value: String(entry.count),
            });
        }
        /*
         * THE FOUR COUNTS ARE MACHINERY, NOT THE BALANCE.
         *
         * How a raw tally, a hidden-stem tally, a seasonal weighting and a rooting
         * check differ is a real and interesting thing about BaZi, and it opened
         * the section - two paragraphs of method before the reader had been told
         * which phase their own chart leans on. It goes one disclosure down, with
         * the phase depth, under the same heading it always had.
         */
        const layers = resolve({
            system: 'bazi', kind: 'five-element', key: 'balance-layers', role: 'element-balance',
        });
        if (layers)
            balanceMethod.push(...layers.core);
        const ranked = [...counts].sort((a, b) => b.count - a.count);
        const dominant = ranked[0];
        if (dominant && dominant.count > 0) {
            /*
             * THE PHASE ITSELF, IN DEPTH, FOR THE ONE THE CHART LEANS ON.
             *
             * The wu xing is the frame this whole pillar rests on and its five units
             * were the thinnest thing in the reading - sixty words each and nothing
             * underneath, while every Day Master built on top of them ran to
             * hundreds. The depth exists now; this is what puts it in front of a
             * reader, and only for the phase their own chart is actually weighted
             * toward. Printing all five would be an encyclopedia entry rather than a
             * reading.
             */
            const phase = resolve({
                system: 'bazi', kind: 'five-element', key: key(dominant.phase), role: 'base-archetype',
            });
            for (const field of ['coreCharacter', 'relationships', 'practicalGuidance']) {
                const prose = phase?.portrait?.[field];
                /* The phase in full - its movement, its season, what generates and
                   checks it. Three paragraphs on Metal alone, and the reason this
                   section ran to six hundred words before the reader reached what
                   their own balance means. Kept entire, one layer down. */
                if (prose && prose.length > 0)
                    elementMechanics.push(...prose);
            }
            dominantPhaseLabel = PHASE_LABELS[key(dominant.phase)] ?? dominant.phase;
        }
    }
    /* The phase balance is its own section now. It was filed under 'inner-world',
       which buried the one BaZi summary a non-specialist can actually read
       underneath the personal prose. */
    /* Two entries, because they answer two questions: how the counting works, and
       what the phase this chart leans on actually is. One heading over both would
       open a piece about Metal with a paragraph about tallying methods. */
    const elementEntries = [];
    if (balanceMethod.length > 0) {
        elementEntries.push({
            id: 'balance-method',
            title: t('reading.bazi.balanceMethodTitle'),
            paragraphs: balanceMethod,
            layer: 'deep',
        });
    }
    if (elementMechanics.length > 0 && dominantPhaseLabel) {
        elementEntries.push({
            id: 'phase-depth',
            title: tf('reading.bazi.phaseDepthTitle', { phase: phaseWord(dominantPhaseLabel) }),
            paragraphs: elementMechanics,
            layer: 'deep',
        });
    }
    if (elementEntries.length > 0)
        builder.setEntries('five-elements', elementEntries);
    /*
     * THE COUNTS, NOT A SECOND READING OF THEM.
     *
     * The abundant and scarce readings that used to sit here read each phase on
     * its own - "little water means reflection does not happen on its own" -
     * while the narrative reads it by what it is to THIS Day Master: for Ji
     * Earth, water is what you would work on and keep. Two readings of one count
     * in two vocabularies is the contradiction the count/strength fix was about,
     * so the section keeps the tally, how it is counted and the leading phase in
     * depth, and leaves interpretation to the reading above.
     */
    if (elementMarks.length > 0) {
        builder.describe('five-elements', { layer: 'deep', infoKey: 'five-elements' });
        marksBySection['five-elements'] = elementMarks;
        builder.standfirst('five-elements', t('reading.bazi.fiveElements.standfirst'));
    }
    if (yinYang) {
        shownLabels.push('Yin / Yang');
        heroMarks.push({ glyph: taijituGlyph(), label: 'Yin / Yang', value: yinYang, ...(countNote ? { note: countNote } : {}) });
    }
    /* ------------------------------------------------------- ten gods */
    const tenGodOutputs = pillar.keyOutputs.filter((output) => /ten god/i.test(output.label));
    const tenGodEntries = [];
    const seenGods = new Set();
    for (const output of tenGodOutputs) {
        shownLabels.push(output.label);
        if (/unavailable/i.test(output.value))
            continue;
        const godKey = slug(output.value);
        if (seenGods.has(godKey))
            continue;
        /*
         * WHAT THE GOD IS, NOT A SECOND READING OF THIS CHART. Resolved with a
         * strength context, each entry carried an overlay reading the god against
         * this Day Master's strength - "the reading that matters most on your
         * chart", "the hardest combination on a chart like yours" - which is the
         * main reading's job and which, for Pavlína, contradicted it outright. The
         * support-or-restrain doctrine those overlays argued is now the main
         * reading's "What steadies you" and its evidence line; here the god is
         * described as the tradition describes it, once.
         */
        const unit = resolve({ system: 'bazi', kind: 'ten-god', key: godKey, role: 'base-archetype' });
        if (!unit)
            continue;
        seenGods.add(godKey);
        const places = tenGodOutputs
            .filter((candidate) => slug(candidate.value) === godKey)
            .map((candidate) => candidate.label.replace(/\s*stem ten god\s*/i, '').trim());
        /* The engine's word is the lookup; the reading prints the readable name,
           which is the same word in English and a declined one in Slovak. */
        const positions = places.map((position) => (POSITION_NAME[position] ? t(POSITION_NAME[position]) : position));
        /* A god that stands in the Hour pillar of an estimated time says so in its
           title and first line - wholly, or for its Hour place only. */
        const onEstimate = estimatedHour && places.includes('Hour');
        tenGodEntries.push({
            id: `ten-god-${godKey}`,
            title: tf(onEstimate ? 'reading.bazi.tenGodTitleEstimated' : 'reading.bazi.tenGodTitle', {
                god: output.value, positions: positions.join(t('reading.list.and')),
            }),
            paragraphs: [
                ...(onEstimate
                    ? [t(places.length === 1 ? 'reading.bazi.tenGodEstimatedNote' : 'reading.bazi.tenGodPartlyEstimatedNote')]
                    : []),
                ...unit.core,
            ],
        });
    }
    if (tenGodEntries.length > 0) {
        builder.setEntries('ten-gods', tenGodEntries);
        builder.describe('ten-gods', { layer: 'deep', infoKey: 'ten-gods' });
        builder.standfirst('ten-gods', t('reading.bazi.tenGods.standfirst'));
    }
    /* --------------------------------------------- clashes and relations */
    /*
     * Read in the narrative, where each relation is said as what it sets against
     * what in THIS chart, and listed with its label in "Why this appears". The
     * generic relation units that used to follow under "Shadow and challenges"
     * told every reader with a clash to expect "relocation, separation" - an
     * event forecast the chart cannot make - so they no longer reach the page.
     */
    for (const output of pillar.keyOutputs) {
        if (RELATION_PATTERNS.some(([pattern]) => pattern.test(output.label)))
            shownLabels.push(output.label);
    }
    /* ------------------------------------------------ day master strength */
    if (tendency) {
        shownLabels.push('Day Master strength tendency');
        const unit = resolve({
            system: 'bazi', kind: 'luck-pillar', key: 'day-master-strength', role: 'base-archetype',
        });
        const method = unit ? [...unit.core] : [];
        /*
         * THE DOCTRINE AND THE METHOD, NOT A FIFTH TELLING OF THE VERDICT.
         *
         * This chart's season and the model's verdict are said in the header, in
         * the reading's opening and in "Why this appears". This section used to say
         * both again, in two paragraphs of its own. It keeps what only it says -
         * why the season outweighs the tally, and how the verdict is reached - and
         * points to the evidence for this chart's values.
         */
        builder.add('seasonal-strength', [t('reading.bazi.seasonalStrength.pointer')]);
        builder.describe('seasonal-strength', { layer: 'deep', infoKey: 'day-master' });
        builder.standfirst('seasonal-strength', t('reading.bazi.seasonalStrength.standfirst'));
        if (method.length > 0) {
            builder.setEntries('seasonal-strength', [{
                    id: 'strength-method',
                    title: t('reading.bazi.strengthMethodTitle'),
                    paragraphs: method,
                    layer: 'deep',
                }]);
        }
    }
    /* ---------------------------------------------------- luck pillars */
    const luck = outputValue(pillar, 'Luck Pillars (Da Yun)') ?? outputValue(pillar, 'Luck Pillars');
    if (luck) {
        shownLabels.push('Luck Pillars (Da Yun)');
        const unit = resolve({
            system: 'bazi', kind: 'luck-pillar', key: 'luck-pillars', role: 'base-archetype',
        });
        const paragraphs = unit ? [...unit.core] : [];
        if (!/unavailable/i.test(luck)) {
            const direction = resolve({
                system: 'bazi', kind: 'luck-pillar', key: 'luck-pillar-direction', role: 'base-archetype',
            });
            if (direction)
                paragraphs.push(...direction.core);
        }
        /* Was filed under 'growth'. Luck Pillars are timing rather than development,
           and the hierarchy already declares a section for them. */
        builder.add('luck-pillars', paragraphs);
        builder.describe('luck-pillars', { layer: 'deep', infoKey: 'luck-pillars' });
        builder.standfirst('luck-pillars', t('reading.bazi.luckPillars.standfirst'));
    }
    /* --------------------------------------------------------------- tcm */
    /* Placed at the END of the tradition-specific section rather than near the top
       of the reading. It is genuinely part of how BaZi has been read, so it is not
       omitted - and it is a symbolic side layer with no bearing on anything, so it
       does not get the position that would imply otherwise. */
    const tcm = outputValue(pillar, 'TCM constitution (Day Master)')
        ?? outputValue(pillar, 'TCM constitution');
    if (tcm) {
        shownLabels.push('TCM constitution (Day Master)');
        const unit = resolve({
            system: 'bazi', kind: 'luck-pillar', key: 'tcm-correspondence', role: 'base-archetype',
        });
        /* Through the overlay: `Earth / Spleen-Stomach` is the heading of this
           section AND a sentence inside it, and it was printing the English phase
           and the English organ pair into Slovak prose while the same value in the
           Day Master correspondence sentence two sections up already read
           `zem / slezina-žalúdok`. A no-op in English. */
        const named = engineProse(tcm);
        pillarEntries.push({
            id: 'tcm-correspondence',
            title: tf('reading.bazi.tcmTitle', { value: named }),
            paragraphs: [
                ...(unit ? unit.core : []),
                tf('reading.bazi.tcmBody', { value: named }),
            ],
        });
    }
    /* The four pillars and the TCM correspondence were one undifferentiated
       'In this system' block. They are different kinds of thing and now read as
       such: the pillars are the chart's structure and belong near the top; the TCM
       mapping is a symbolic side layer and stays at the very bottom. */
    const tcmEntries = pillarEntries.filter((entry) => entry.id === 'tcm-correspondence');
    const structuralEntries = pillarEntries.filter((entry) => entry.id !== 'tcm-correspondence');
    if (structuralEntries.length > 0) {
        builder.setEntries('four-pillars', structuralEntries);
        /*
         * HOW THE CHART IS CONSTRUCTED, WHICH IS ASKED AFTER WHAT IT SAYS.
         *
         * Four entries, twelve hundred words of stem, branch, hidden stem and
         * relation, and they used to come third - before the reader had been told
         * which of those characters was their Day Master. Nothing is removed and
         * nothing is shortened: the section keeps its heading, its standfirst and
         * all four pillars, below the reading they are the apparatus for.
         */
        builder.describe('four-pillars', { layer: 'deep', infoKey: 'four-pillars' });
        builder.standfirst('four-pillars', t('reading.bazi.fourPillars.standfirst'));
    }
    if (tcmEntries.length > 0) {
        builder.setEntries('tcm', tcmEntries);
        builder.describe('tcm', { layer: 'deep', infoKey: 'tcm-correspondence' });
        builder.standfirst('tcm', t('reading.bazi.tcm.standfirst'));
    }
    const introduction = [
        t('reading.bazi.intro.1'),
        t('reading.bazi.intro.2'),
    ];
    return {
        heroMarks,
        introduction,
        sections: builder.build(marksBySection),
        shownLabels,
    };
}
/** Kept exported so a test can assert the polarity marker is wired. */
export { polarityGlyph };
