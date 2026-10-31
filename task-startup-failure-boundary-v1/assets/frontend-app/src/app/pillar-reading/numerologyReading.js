import { resolve } from '../knowledge/knowledgeBase.js?v=2ea79e9';
import { numberBadge, toneForNumber } from './glyphs/pillarGlyphs.js?v=2ea79e9';
import { SectionBuilder, outputValue } from './composeReading.js?v=2ea79e9';
import { t, tf } from '../i18n/uiStrings.js?v=2ea79e9';
import { relationOf } from '../numerology-forecast/temporalComposition.js?v=2ea79e9';
import { composeNumerologyNarrative, numerologyVoice } from './numerology-narrative/composeNumerologyNarrative.js?v=2ea79e9';
/**
 * NUMEROLOGY, AS A READING.
 *
 * THE MAIN READING IS ONE ARGUMENT, NOT A LIST OF NUMBERS.
 *
 * It is composed by the narrative layer (numerology-narrative/): the engine's
 * typed result becomes an interpretation model, the model a language-free plan,
 * and the plan seven sections in the reader's language - where the life keeps
 * going, what satisfies you, how you meet the world, where the numbers pull
 * apart, what the pattern costs, what grows stronger with time, and the chapter
 * of life you are in. A number the chart repeats is told once; a relation is
 * told where it belongs; nothing is said that the numbers do not support.
 *
 * GO DEEPER IS WHERE THE SYSTEM ITSELF LIVES.
 *
 *   WHY THIS APPEARS  the numbers and the working behind each main section
 *   YOUR NUMBERS      every position on its own, in its authored reading
 *   YOUR CHAPTERS     the four Pinnacle and Challenge chapters, with the age
 *                     windows the engine computed
 *   YOUR CYCLES       today's Personal Year, Month and Day - time is the
 *                     Forecast's subject, so they are here for reference only
 *
 * Every position resolves through its own role - a 7 Life Path, a 7 Challenge
 * and a 7 Personal Day are three separate units, and a test asserts that no base
 * archetype ever stands in for a position.
 */
/* ------------------------------------------------------------------ helpers */
const ORDINALS = ['first', 'second', 'third', 'fourth'];
/**
 * The ordinal is an ID, not a word: it keys the entry ids and matches the
 * engine's own "Current chapter" string, so it is never translated. The
 * readable name is a separate lookup.
 */
const CHAPTER_NAME = {
    first: 'reading.numerology.chapter.first',
    second: 'reading.numerology.chapter.second',
    third: 'reading.numerology.chapter.third',
    fourth: 'reading.numerology.chapter.fourth',
};
/** "a, b and c", with the conjunction from the dictionary. */
function joinList(items) {
    if (items.length === 0)
        return '';
    if (items.length === 1)
        return items[0];
    return `${items.slice(0, -1).join(', ')}${t('reading.list.and')}${items[items.length - 1]}`;
}
/** The engine label a position is shown under, for the technical appendix. */
const LABEL = {
    'life-path': 'Life Path',
    birthday: 'Birth Day',
    'soul-urge': 'Soul Urge',
    expression: 'Expression',
    personality: 'Personality',
    maturity: 'Maturity',
    attitude: 'Attitude',
    balance: 'Balance',
    'hidden-passion': 'Hidden Passion',
};
/** The knowledge role each position resolves through. */
const ROLE = {
    'life-path': 'life-path',
    birthday: 'birthday',
    'soul-urge': 'soul-urge',
    expression: 'expression',
    personality: 'personality',
    maturity: 'maturity',
    attitude: 'attitude',
    balance: 'balance',
    'hidden-passion': 'hidden-passion',
};
export function composeNumerologyReading(pillar) {
    const builder = new SectionBuilder();
    const shownLabels = [];
    const marksBySection = {};
    const heroMarks = [];
    /* ------------------------------------------------------------- hero */
    for (const label of ['Life Path', 'Expression', 'Soul Urge']) {
        const raw = outputValue(pillar, label);
        const value = raw === null ? Number.NaN : Number(raw);
        if (!Number.isFinite(value))
            continue;
        heroMarks.push({ glyph: numberBadge(value, { tone: toneForNumber(value), label }), label, value: '' });
    }
    /* ------------------------------------------------------ THE NARRATIVE */
    /* Registered first, so the reading's own sentences are the ones every later
       paragraph is de-duplicated against. */
    const narrative = composeNumerologyNarrative(pillar.numerologyChart);
    if (narrative) {
        for (const section of narrative.sections) {
            builder.add(section.id, section.paragraphs);
            if (section.standfirst)
                builder.standfirst(section.id, section.standfirst);
        }
        builder.setEntries('numerology-evidence', narrative.evidence);
        builder.describe('numerology-evidence', { layer: 'deep' });
        builder.standfirst('numerology-evidence', narrative.evidenceStandfirst);
        addPositions(narrative.model, builder, shownLabels);
        addChapters(pillar, narrative.model, builder, shownLabels);
        addCycles(narrative.model, builder, shownLabels);
    }
    /* ---------------------------------------------------- AT A GLANCE */
    /* The four natal numbers and the chapter the reader is in, above everything.
       All five are read further down; this exists so none of them needs finding.
       The Personal Year is time, and time is the Forecast's. */
    const glanceMarks = [];
    const glance = (label, infoKey) => {
        const value = outputValue(pillar, label);
        if (value)
            glanceMarks.push({ glyph: '', label, value, infoKey });
    };
    glance('Life Path', 'life-path');
    glance('Expression', 'expression');
    glance('Soul Urge', 'soul-urge');
    glance('Personality', 'personality-number');
    glance('Current chapter', 'pinnacle');
    if (glanceMarks.length > 0) {
        builder.describe('at-a-glance', { layer: 'glance' });
        builder.standfirst('at-a-glance', t('reading.numerology.atAGlance.standfirst'));
        marksBySection['at-a-glance'] = glanceMarks;
    }
    return {
        heroMarks,
        introduction: [t('reading.numerology.intro.1'), t('reading.numerology.intro.2')],
        sections: builder.build(marksBySection),
        shownLabels,
    };
}
/* ------------------------------------------------------------------ *
 * YOUR NUMBERS - every position, in its own authored reading
 * ------------------------------------------------------------------ */
function positionEntry(position, value, id, title) {
    const unit = resolve({ system: 'numerology', kind: 'number', key: String(value), role: ROLE[position] });
    if (!unit)
        return null;
    const badge = numberBadge(value, { tone: toneForNumber(value), label: LABEL[position] });
    return {
        id,
        title,
        mark: { glyph: badge, label: LABEL[position], value: '' },
        paragraphs: [...unit.core],
    };
}
function addPositions(model, builder, shownLabels) {
    const v = numerologyVoice();
    const entries = [];
    const p = model.positions;
    const single = ['life-path', 'birthday', 'soul-urge', 'expression', 'personality', 'maturity', 'attitude', 'balance'];
    for (const position of single) {
        const signal = p[position];
        if (!signal)
            continue;
        shownLabels.push(LABEL[position]);
        const entry = positionEntry(position, signal.value, `numerology-${position}`, v.reference.positionTitle(position, signal.value, position === 'life-path' ? signal.compound : null));
        if (entry)
            entries.push(entry);
        /* The unreduced day is its own reading: a 28th is not a 1st. */
        if (position === 'birthday' && signal.compound !== null) {
            const compound = resolve({
                system: 'numerology', kind: 'numerology-concept', key: 'compound-birth-day', role: 'base-archetype',
            });
            if (compound) {
                entries.push({
                    id: 'numerology-compound-birth-day',
                    title: tf('reading.numerology.title.bornOn', { day: signal.compound }),
                    paragraphs: [...compound.core],
                });
            }
        }
    }
    /* Hidden Passion: a tie is its own situation, said once, then each value. */
    if (model.hiddenPassion.length > 0) {
        shownLabels.push('Hidden Passion');
        if (model.hiddenPassion.length > 1) {
            const tie = resolve({
                system: 'numerology', kind: 'numerology-concept', key: 'hidden-passion-tie', role: 'base-archetype',
            });
            if (tie) {
                entries.push({
                    id: 'numerology-hidden-passion-tie',
                    title: `Hidden Passion ${model.hiddenPassion.join(' and ')}`,
                    paragraphs: [...tie.core],
                });
            }
        }
        for (const value of model.hiddenPassion) {
            const entry = positionEntry('hidden-passion', value, `numerology-hidden-passion-${value}`, `Hidden Passion ${value}`);
            if (entry)
                entries.push(entry);
        }
    }
    /* Karmic Lessons: the values the name does not contain. */
    shownLabels.push('Karmic Lessons');
    if (model.karmicLessons.length === 0) {
        const none = resolve({
            system: 'numerology', kind: 'numerology-concept', key: 'no-karmic-lessons', role: 'base-archetype',
        });
        if (none) {
            entries.push({ id: 'numerology-karmic-lessons-none', title: t('reading.numerology.title.noKarmicLessons'), paragraphs: [...none.core] });
        }
    }
    for (const value of model.karmicLessons) {
        const unit = resolve({ system: 'numerology', kind: 'number', key: String(value), role: 'karmic-lesson' });
        if (!unit)
            continue;
        entries.push({
            id: `numerology-karmic-lesson-${value}`,
            title: `Karmic Lesson ${value}`,
            mark: {
                glyph: numberBadge(value, { tone: toneForNumber(value), label: 'Karmic Lesson' }),
                label: 'Karmic Lesson', value: '',
            },
            paragraphs: [...unit.core],
        });
    }
    /* Karmic Debt: each debt with the position whose own reduction produced it. */
    shownLabels.push('Karmic Debt');
    if (model.debts.length === 0) {
        const none = resolve({
            system: 'numerology', kind: 'numerology-concept', key: 'no-karmic-debt', role: 'base-archetype',
        });
        if (none) {
            entries.push({ id: 'numerology-karmic-debt-none', title: t('reading.numerology.title.noKarmicDebt'), paragraphs: [...none.core] });
        }
    }
    /* The same debt in two positions is one reading with both provenances. */
    const byValue = new Map();
    for (const debt of model.debts)
        byValue.set(debt.value, [...(byValue.get(debt.value) ?? []), debt.position]);
    for (const [value, positions] of byValue) {
        const unit = resolve({ system: 'numerology', kind: 'number', key: String(value), role: 'karmic-debt' });
        if (!unit)
            continue;
        entries.push({
            id: `numerology-karmic-debt-${value}`,
            title: v.reference.debtTitle(value, positions),
            paragraphs: [...unit.core],
        });
    }
    if (entries.length > 0) {
        builder.setEntries('numerology-positions', entries);
        builder.describe('numerology-positions', { layer: 'deep' });
        builder.standfirst('numerology-positions', v.reference.positionsStandfirst);
    }
}
/* ------------------------------------------------------------------ *
 * YOUR CHAPTERS - Pinnacle and Challenge, read as one
 * ------------------------------------------------------------------ */
function addChapters(pillar, model, builder, shownLabels) {
    if (model.chapters.length !== 4)
        return;
    const v = numerologyVoice();
    shownLabels.push('Pinnacles', 'Challenges');
    if (outputValue(pillar, 'Current chapter'))
        shownLabels.push('Current chapter');
    const entries = [];
    /* A chart can repeat a Pinnacle or a Challenge across two chapters, and the
       same paragraphs printed twice make a designed page look generated. Shared
       material is printed at its first occurrence; later chapters keep what is
       genuinely theirs - the position overlay - and one line saying where the
       rest is. */
    const printed = new Map();
    const fresh = (paragraphs, where) => {
        const kept = [];
        for (const paragraph of paragraphs) {
            if (printed.has(paragraph))
                continue;
            printed.set(paragraph, where);
            kept.push(paragraph);
        }
        return kept;
    };
    const seenAt = (paragraphs) => {
        for (const paragraph of paragraphs) {
            const where = printed.get(paragraph);
            if (where)
                return where;
        }
        return null;
    };
    const pairing = resolve({
        system: 'numerology', kind: 'numerology-concept', key: 'chapter-pairing', role: 'base-archetype',
    });
    if (pairing) {
        entries.push({
            id: 'numerology-chapter-pairing',
            title: t('reading.numerology.title.chapterPairing'),
            paragraphs: [...pairing.core],
        });
    }
    for (const chapter of model.chapters) {
        const ordinal = ORDINALS[chapter.index];
        const label = t(CHAPTER_NAME[ordinal]);
        const paragraphs = [];
        /* The position frame first - what this stretch of a life is - for the
           chapter the reader is in. */
        if (chapter.current) {
            const frame = resolve({
                system: 'numerology', kind: 'numerology-concept', key: `pinnacle-position-${ordinal}`, role: 'base-archetype',
            });
            if (frame)
                paragraphs.push(...fresh(frame.core, label));
        }
        const pinnacleUnit = resolve({
            system: 'numerology', kind: 'number', key: String(chapter.pinnacle), role: 'pinnacle',
            context: { chapterPosition: ordinal },
        });
        if (pinnacleUnit) {
            const earlier = seenAt(pinnacleUnit.core);
            const kept = fresh(pinnacleUnit.core, label);
            if (earlier && kept.length > 0) {
                paragraphs.push(tf('reading.numerology.pinnacleRepeats', { pinnacle: chapter.pinnacle, chapter: label, earlier }));
            }
            paragraphs.push(...kept);
        }
        /* The Challenge is the pressure inside the same years: 0-8, 0 included. */
        const challengeUnit = resolve({
            system: 'numerology', kind: 'number', key: String(chapter.challenge), role: 'challenge',
        });
        if (challengeUnit) {
            const earlier = seenAt(challengeUnit.core);
            const kept = fresh(challengeUnit.core, label);
            if (earlier && kept.length === 0) {
                paragraphs.push(tf('reading.numerology.challengeRepeats', { challenge: chapter.challenge, chapter: label, earlier }));
            }
            paragraphs.push(...kept);
        }
        /* The span as the engine writes it ("Ages 39-47", "Age 48+"), which the
           label layer turns into the reader's language. */
        const span = chapter.endAge === null ? `Age ${chapter.startAge}+` : `Ages ${chapter.startAge}-${chapter.endAge}`;
        const title = tf('reading.numerology.chapterTitle.withChallenge', {
            span, pinnacle: chapter.pinnacle, challenge: chapter.challenge,
        });
        entries.push({
            id: `numerology-chapter-${ordinal}`,
            title: chapter.current ? tf('reading.numerology.chapterTitle.current', { title }) : title,
            mark: {
                glyph: numberBadge(chapter.pinnacle, { tone: toneForNumber(chapter.pinnacle, true), label: 'Pinnacle' }),
                label: chapter.current ? 'Current chapter' : `${ordinal[0].toUpperCase()}${ordinal.slice(1)} chapter`,
                value: chapter.endAge === null ? `age ${chapter.startAge}+` : `ages ${chapter.startAge}-${chapter.endAge}`,
            },
            paragraphs,
        });
    }
    builder.add('numerology-chapters', [v.reference.chapterTiming(model)].filter(Boolean));
    builder.setEntries('numerology-chapters', entries);
    builder.describe('numerology-chapters', { layer: 'deep', infoKey: 'pinnacle' });
    builder.standfirst('numerology-chapters', v.reference.chaptersStandfirst);
}
/* ------------------------------------------------------------------ *
 * YOUR CYCLES - today's year, month and day, for reference
 * ------------------------------------------------------------------ */
const CYCLE_POSITIONS = [
    { label: 'Personal Year', role: 'personal-year', key: 'year' },
    { label: 'Personal Month', role: 'personal-month', key: 'month' },
    { label: 'Personal Day', role: 'personal-day', key: 'day' },
];
function addCycles(model, builder, shownLabels) {
    const v = numerologyVoice();
    const entries = [];
    const scales = resolve({ system: 'numerology', kind: 'numerology-concept', key: 'cycle-scales', role: 'base-archetype' });
    if (scales) {
        entries.push({ id: 'numerology-cycle-scales', title: t('reading.numerology.title.threeClocks'), paragraphs: [...scales.core] });
    }
    for (const position of CYCLE_POSITIONS) {
        const value = model.cycles[position.key];
        shownLabels.push(position.label);
        const unit = resolve({ system: 'numerology', kind: 'number', key: String(value), role: position.role });
        if (!unit)
            continue;
        entries.push({
            id: `numerology-${position.role}`,
            title: `${position.label} ${value}`,
            mark: {
                glyph: numberBadge(value, { tone: toneForNumber(value, true), label: position.label }),
                label: position.label, value: '',
            },
            paragraphs: [...unit.core],
        });
    }
    /* THE COMPOSITION. Structural, not interpretive: where the three scales
       reinforce, where they conflict, and which one takes priority. */
    entries.push({
        id: 'numerology-cycle-composition',
        title: t('reading.numerology.title.readingThree'),
        paragraphs: composeCycle(model.cycles.year, model.cycles.month, model.cycles.day),
    });
    const turnover = resolve({ system: 'numerology', kind: 'numerology-concept', key: 'cycle-turnover', role: 'base-archetype' });
    if (turnover) {
        entries.push({ id: 'numerology-cycle-turnover', title: t('reading.numerology.title.yearCaveat'), paragraphs: [...turnover.core] });
    }
    builder.setEntries('numerology-cycles', entries);
    builder.describe('numerology-cycles', { layer: 'deep', infoKey: 'personal-year' });
    builder.standfirst('numerology-cycles', v.reference.cyclesStandfirst);
}
/**
 * The three scales, read against each other. Deterministic and structural: it
 * reports agreement, disagreement and priority using only the numbers, and
 * leaves what each one means to the readings directly above it.
 *
 * ONE RELATION, TWO SURFACES. Which scales agree is decided by the Forecast's
 * own relationOf (numerology-forecast/temporalComposition.ts), so this tab and
 * the Forecast can never describe the same three numbers two ways. It used to
 * count agreement with the year only, and so called a month and a day that
 * shared a number "three scales pointing in different directions" on the same
 * date the Forecast said the short-term layers agreed.
 */
function composeCycle(year, month, day) {
    const scales = [
        ['reading.numerology.scale.year', year],
        ['reading.numerology.scale.month', month],
        ['reading.numerology.scale.day', day],
    ];
    const named = joinList(scales.map(([key, value]) => tf(key, { value })));
    /* The same kernel (core/numerologyMethodology.ts) produced these numbers for
       both surfaces; relationOf only compares them. */
    const relation = relationOf({ year, month, day });
    const paragraphs = [relation === 'triple'
            ? tf('reading.numerology.cycle.allAgree', { named })
            : relation === 'year-month' || relation === 'year-day'
                ? tf('reading.numerology.cycle.twoAgree', { named })
                : relation === 'month-day'
                    ? tf('reading.numerology.cycle.shortAgree', { named })
                    : tf('reading.numerology.cycle.differ', { named })];
    /* Priority is stated because the commonest misuse of the three is letting the
       smallest one win. */
    paragraphs.push(tf('reading.numerology.cycle.priority', {
        year, month, day: tf('reading.numerology.scale.dayNamed', { value: day }),
    }));
    return paragraphs;
}
