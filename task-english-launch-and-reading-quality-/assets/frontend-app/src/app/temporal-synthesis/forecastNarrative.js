import { BODY_NOMINATIVE, engineProse } from '../i18n/engineProse.js';
import { dateLocale } from '../i18n/dateLocale.js';
import { activeLocale } from '../i18n/locale.js';
import { t, tf } from '../i18n/uiStrings.js';
import { opposingDimension } from '../semantics/semanticTaxonomy.js';
import { factPhrase } from '../synthesis-reading/factPhrasing.js';
import { natalDimensionWeights, temporalTensions } from './temporalInteractions.js';
import { contributionText, factWeight, harmonicContribution, natalAreaText, temporalContribution, temporalSignalsFor, themeText, } from './temporalSemantics.js';
/** Longest first: the order the hierarchy is read in, on every level. */
export const TIME_SCALE_ORDER = ['background', 'year', 'transits', 'month', 'day'];
/**
 * What an influence represents in time.
 *
 *   background  the ten-year luck pillar
 *   year        the Personal Year and the annual BaZi pillar - both a year long
 *   transits    slow transits to the natal chart - as long as the orb holds
 *   month       the Personal Month, and the Sun's sign (about a month)
 *   day         the Personal Day and the Moon phase
 */
export function timeScaleOf(fact) {
    const entity = fact.sourceEntity;
    if (entity === 'luckPillar' || entity.startsWith('luckTenGod-'))
        return 'background';
    if (entity === 'personalYear' || entity === 'annualPillar' || entity.startsWith('annualTenGod-'))
        return 'year';
    if (entity.startsWith('transit-'))
        return 'transits';
    if (entity === 'personalMonth' || entity === 'transitingSun')
        return 'month';
    return 'day';
}
/** Every fact in force on any of these days, in chronological order of the days. */
export function periodFacts(days) {
    const seen = new Map();
    days.forEach((day, index) => {
        for (const fact of day.facts) {
            const entry = seen.get(fact.id);
            if (!entry) {
                seen.set(fact.id, { fact, days: 1, from: day.date, to: day.date, stretches: 1, last: index });
                continue;
            }
            entry.days += 1;
            entry.to = day.date;
            if (index !== entry.last + 1)
                entry.stretches += 1;
            entry.last = index;
        }
    });
    return [...seen.values()].map((entry) => ({
        fact: entry.fact,
        scale: timeScaleOf(entry.fact),
        days: entry.days,
        total: days.length,
        from: entry.from,
        to: entry.to,
        stretches: entry.stretches,
    }));
}
export const coverageOf = (entry) => (entry.total > 0 ? entry.days / entry.total : 0);
/** A fact's weight in this period: its band and strength, times the share of days it holds. */
const entryWeight = (entry) => factWeight(entry.fact) * coverageOf(entry);
const byWeight = (left, right) => entryWeight(right) - entryWeight(left) || left.fact.id.localeCompare(right.fact.id);
/** The signals of a set of period facts, each weighted by the share of days it holds. */
function periodSignals(entries) {
    return entries.flatMap((entry) => temporalSignalsFor([entry.fact])
        .map((signal) => ({ ...signal, weight: signal.weight * coverageOf(entry) })));
}
/* ------------------------------------------------------------- words -- */
const sk = () => activeLocale() === 'sk';
const capitalise = (text) => text.charAt(0).toUpperCase() + text.slice(1);
const lowerFirst = (text) => text.charAt(0).toLowerCase() + text.slice(1);
/** A dimension as what a period is about - a noun phrase. */
export const leanPhrase = (dimension) => t(`fc.lean.${dimension}`);
/** A dimension as a direction something pulls you in. */
export const pullPhrase = (dimension) => t(`fc.pull.${dimension}`);
/** The one sentence of advice for a pull on this axis. */
const balanceFor = (axis) => t(`fc.balance.${axis}`);
/*
 * WHAT "A NUDGE AGAINST A HABIT" IS A NUDGE AGAINST, PER AXIS - English only.
 *
 * The sentence that follows a pull against the reader's own chart used to be one fixed line in every reading. It now names the habit by the
 * axis the pull is on (the same ten axes as fc.balance). It restates the tension the paragraph has just named; it adds no claim. The Slovak
 * string has no placeholder for it, so the Slovak reading is unchanged.
 */
const HABIT_OF_AXIS = {
    'inner-focus': 'your usual balance of inner time and outward activity',
    reasoning: 'how you usually weigh instinct against analysis',
    autonomy: 'how you usually weigh deciding alone against involving others',
    structure: 'your usual mix of routine and improvisation',
    risk: 'your usual appetite for risk',
    'emotional-expression': 'how openly you usually show what you feel',
    visibility: 'your usual balance of company and time alone',
    change: 'your usual balance of keeping what works and changing it',
    initiative: 'your usual timing for making the first move',
    abstraction: 'how you usually weigh ideas against practice',
};
/* What the reader would notice, said as a possibility and once per paragraph; the second time on a screen it is "that may also ...", not the same frame again. */
const habitSentence = (axis, period, again = false) => {
    if (activeLocale() === 'sk')
        return '';
    const habit = HABIT_OF_AXIS[axis];
    if (!habit)
        return '';
    return again ? `That may also show up as a shift in ${habit}.` : `Following the pull of ${period} may show up as a shift in ${habit}.`;
};
/*
 * THE NUMBERS A READER MEETS BY NAME, GLOSSED AT FIRST USE - English only.
 *
 * "Soul Urge 8 and Personality 8" are names in a table to anybody who has not read the Numerology pillar, so each is said once with a few plain words after it. The
 * glosses are the pillar's own meanings in short; nothing is claimed beyond them.
 */
const NUMBER_GLOSS = {
    'Life Path': 'your main life theme',
    Expression: 'how you tend to express yourself',
    'Soul Urge': 'what you want most deeply',
    Personality: 'how you tend to come across at first',
    Balance: 'how you tend to steady yourself under pressure',
    Maturity: 'where your life tends to head later on',
    'Birth Day': 'a quality tied to the day you were born',
};
function glossedPhrase(phrase, glossed) {
    const match = /^(Life Path|Expression|Soul Urge|Personality|Balance|Maturity|Birth Day) (\d+)$/.exec(phrase);
    if (!match)
        return phrase;
    const withYour = `your ${phrase}`;
    if (glossed.has(match[1]))
        return withYour;
    glossed.add(match[1]);
    return `${withYour} (${NUMBER_GLOSS[match[1]]})`;
}
const newScreen = () => ({ named: new Set(), glossed: new Set() });
function sentenceList(items) {
    if (items.length <= 1)
        return items[0] ?? '';
    return `${items.slice(0, -1).join(', ')} ${t('fc.x.and')} ${items[items.length - 1]}`;
}
/** The influence as a reader can recognise it. */
export function influenceName(fact) {
    const { provenance: p, sourceEntity: entity } = fact;
    const pillar = `${p.stem} ${p.branch}`;
    if (entity === 'annualPillar' || entity.startsWith('annualTenGod-'))
        return tf('fc.name.annual', { pillar });
    if (entity === 'luckPillar' || entity.startsWith('luckTenGod-'))
        return tf('fc.name.luck', { pillar });
    if (entity.startsWith('transit-')) {
        const body = String(p.transitingBody);
        return tf('fc.name.transit', {
            body: sk() ? (BODY_NOMINATIVE[body.toLowerCase()] ?? body) : body,
            aspect: t(`fc.aspect.${String(p.aspect).toLowerCase()}`),
            natal: t(`fc.natal.${String(p.natalBody).toLowerCase()}`),
        });
    }
    if (entity === 'transitingSun') {
        /* The Sun in a sign is named as the reader would say it - „Sun in Virgo",
           „Slnko v Panne" - without the ephemeris's „transiting". Slovak reuses the
           engine overlay for the declined sign rather than a second table of it. */
        return sk()
            ? capitalise(engineProse(fact.fact).replace(/^tranzitujúce\s+/u, ''))
            : tf('fc.name.sun', { sign: String(p.sign) });
    }
    return capitalise(engineProse(fact.fact));
}
/** What the influence brings, as one plain sentence. Empty when nothing is authored. */
export function influenceMeaning(fact) {
    const contribution = temporalContribution(fact);
    if (!contribution)
        return '';
    let text = contributionText(contribution);
    if (fact.sourceEntity.startsWith('transit-')) {
        const area = natalAreaText(String(fact.provenance.natalBody)) ?? '';
        const manner = harmonicContribution(fact);
        text = `${text} ${area}${manner ? contributionText(manner) : ''}`;
    }
    return `${capitalise(text)}.`;
}
/* ------------------------------------------------------------- dates -- */
const parts = (iso) => iso.split('-').map(Number);
function dayMonth(iso) {
    const [year, month, day] = parts(iso);
    return new Intl.DateTimeFormat(dateLocale(), { day: 'numeric', month: 'long', timeZone: 'UTC' })
        .format(Date.UTC(year, month - 1, day));
}
function dateRange(from, to) {
    const [, fromMonth, fromDay] = parts(from);
    const [, toMonth] = parts(to);
    if (fromMonth !== toMonth)
        return `${dayMonth(from)} – ${dayMonth(to)}`;
    /* Slovak writes the day with its own full stop: „12. – 24. septembra". */
    return sk() ? `${fromDay}. – ${dayMonth(to)}` : `${fromDay}–${dayMonth(to)}`;
}
/** When an influence holds, in the words the level needs - or nothing when it is obvious. */
function whenText(entry, level, bounds) {
    const { fact } = entry;
    if (entry.scale === 'background') {
        return `${fact.window.from.slice(0, 4)}–${fact.window.to.slice(0, 4)}`;
    }
    if (level === 'period' || !bounds)
        return '';
    /* The Personal Year and Month cover their own period by definition. */
    if (fact.sourceEntity === 'personalYear' || fact.sourceEntity === 'personalMonth')
        return '';
    if (entry.days >= entry.total) {
        if (entry.scale === 'year')
            return '';
        /* A slow transit remains an ongoing influence, not a new monthly event. */
        if (entry.scale === 'transits' && level === 'month')
            return t('fc.when.ongoingMonth');
        return t(level === 'year' ? 'fc.when.allYear' : 'fc.when.allMonth');
    }
    if (entry.stretches > 1)
        return tf('fc.when.days', { days: entry.days });
    if (entry.from === bounds.from)
        return tf('fc.when.until', { date: dayMonth(entry.to) });
    if (entry.to === bounds.to)
        return tf('fc.when.from', { date: dayMonth(entry.from) });
    return dateRange(entry.from, entry.to);
}
/**
 * WHAT A PERIOD IS MAINLY ABOUT.
 *
 * Where two or more influences press on the same dimension, that agreement
 * leads - it is the strongest claim the model can make. Where nothing agrees,
 * which is the usual state of a year with three influences in it, the heaviest
 * single influence leads IN ITS OWN WORDS: „new beginnings and decisions of your
 * own" for a Personal Year 1, not the one dimension that happens to sort first.
 */
export function leadOf(entries) {
    const readable = entries.filter((entry) => temporalContribution(entry.fact));
    const signals = periodSignals(readable);
    if (signals.length === 0)
        return null;
    const byDimension = new Map();
    for (const signal of signals) {
        const slot = byDimension.get(signal.dimension) ?? { weight: 0, ids: new Set() };
        slot.weight += signal.weight;
        slot.ids.add(signal.fact.id);
        byDimension.set(signal.dimension, slot);
    }
    const agreed = [...byDimension.entries()]
        .filter(([, slot]) => slot.ids.size >= 2)
        .sort((left, right) => right[1].weight - left[1].weight || left[0].localeCompare(right[0]));
    if (agreed.length > 0) {
        const [dimension, slot] = agreed[0];
        return {
            dimension,
            dimensions: [dimension],
            entries: readable.filter((entry) => slot.ids.has(entry.fact.id)).sort(byWeight),
            shared: true,
            theme: leanPhrase(dimension),
        };
    }
    const top = [...readable].sort(byWeight)[0];
    const contribution = top ? temporalContribution(top.fact) : null;
    if (!top || !contribution || contribution.dimensions.length === 0)
        return null;
    return {
        dimension: contribution.dimensions[0],
        dimensions: contribution.dimensions,
        entries: [top],
        shared: false,
        theme: themeText(contribution),
    };
}
/** The dimensions a set of influences presses hardest, heaviest first. */
function heaviestDimensions(entries, count) {
    const totals = new Map();
    for (const signal of periodSignals(entries)) {
        totals.set(signal.dimension, (totals.get(signal.dimension) ?? 0) + signal.weight);
    }
    return [...totals.entries()]
        .sort((left, right) => right[1] - left[1] || left[0].localeCompare(right[0]))
        .slice(0, count)
        .map(([dimension]) => dimension);
}
/* ---------------------------------------------------------- tensions -- */
/*
 * A PULL IS ONLY REPORTED BETWEEN THINGS THAT LAST.
 *
 * The Day's old reading set „being out in things" against „working inward" and
 * printed it as the defining split of the whole period - half of it carried by
 * that day's Moon phase. Every caller here passes durable influences only, so a
 * tension at the scale of a year or a month is two year- or month-scale things
 * disagreeing, never a Moon phase against a BaZi pillar.
 *
 * The one that touches the lead goes first: a pull against what the period is
 * mainly about is the one a reader can act on.
 */
/** Whether a pull involves the influences the period is mainly about. */
function touchesLead(tension, lead) {
    const leadIds = new Set(lead?.entries.map((entry) => entry.fact.id) ?? []);
    return [...tension.current.signals, ...tension.opposing.signals].some((signal) => leadIds.has(signal.fact.id));
}
function rankedTensions(entries, natal, lead) {
    const touches = (tension) => (touchesLead(tension, lead) ? 1 : 0);
    const size = (tension) => tension.current.weight + tension.opposing.weight;
    return temporalTensions(periodSignals(entries), natalDimensionWeights(natal))
        .sort((left, right) => touches(right) - touches(left)
        || size(right) - size(left)
        || right.balance - left.balance
        || left.axis.localeCompare(right.axis));
}
/** The side carrying the lead first, so „another part pulls you…" is always the other one. */
function orient(tension, lead) {
    const leadIds = new Set(lead?.entries.map((entry) => entry.fact.id) ?? []);
    const holds = (side) => side.signals.some((signal) => leadIds.has(signal.fact.id));
    if (tension.kind === 'current-vs-current' && holds(tension.opposing) && !holds(tension.current)) {
        return { with: tension.opposing, against: tension.current };
    }
    return { with: tension.current, against: tension.opposing };
}
const sideIds = (side) => [...new Set(side.signals.map((signal) => signal.fact.id))];
const sideNames = (side) => sentenceList([...new Map(side.signals
        .map((signal) => [signal.fact.id, influenceName(signal.fact)])).values()]);
const planInfluence = (entry, side) => ({
    fact: entry.fact, scale: entry.scale, sharePercent: Math.round(coverageOf(entry) * 100), stretches: entry.stretches, side,
});
const planLead = (lead) => (lead
    ? { dimension: lead.dimension, dimensions: [...lead.dimensions], shared: lead.shared, factIds: lead.entries.map((entry) => entry.fact.id) }
    : null);
function planTension(tension, lead, inSummary) {
    const { with: withSide, against } = orient(tension, lead);
    const natal = tension.kind === 'current-vs-natal' ? tension.opposing.natalFacts.slice(0, 2).map((fact) => fact.id) : [];
    return {
        kind: tension.kind,
        axis: tension.axis,
        withDimension: withSide.dimension,
        againstDimension: against.dimension,
        withIds: sideIds(withSide),
        againstIds: sideIds(against),
        natalFactIds: natal,
        balance: Math.round(tension.balance * 100) / 100,
        touchesLead: touchesLead(tension, lead),
        inSummary,
    };
}
const para = (text, factIds = []) => ({ text, factIds });
const idsOf = (entries) => entries.map((entry) => entry.fact.id);
/** The order influences are shown in: longest time scale first, the heavier first within a scale. */
const inDisplayOrder = (entries) => [...entries].sort((left, right) => TIME_SCALE_ORDER.indexOf(left.scale) - TIME_SCALE_ORDER.indexOf(right.scale) || byWeight(left, right));
/** Influence lines, one per fact. A meaning already given is referred back to, not repeated. */
function influenceLines(entries, level, bounds) {
    const ordered = inDisplayOrder(entries);
    const given = new Map();
    return ordered.map((entry) => {
        const name = influenceName(entry.fact);
        const meaning = influenceMeaning(entry.fact);
        const earlier = given.get(meaning);
        if (!earlier)
            given.set(meaning, name);
        return {
            factId: entry.fact.id,
            scale: entry.scale,
            name,
            meaning: earlier ? tf('fc.x.sameAs', { name: earlier }) : meaning,
            when: whenText(entry, level, bounds),
        };
    });
}
/** The pull, said in one sentence for the summary. */
function pullSentence(tension, lead, level) {
    const { with: withSide, against } = orient(tension, lead);
    if (tension.kind === 'current-vs-natal') {
        return para(tf('fc.x.pullNatal', { pull: pullPhrase(against.dimension) }), sideIds(withSide));
    }
    const key = level === 'year' ? 'fc.x.pullYear' : level === 'month' ? 'fc.x.pullMonth' : 'fc.x.pullPeriod';
    return para(tf(key, { pull: pullPhrase(against.dimension) }), sideIds(against));
}
/** The pull, explained: which influences, which way, and what to do about it. */
function tensionParagraph(tension, lead, level, screen = newScreen()) {
    const { with: withSide, against } = orient(tension, lead);
    const balance = balanceFor(tension.axis);
    const namedBefore = new Set(screen.named);
    for (const id of [...sideIds(tension.current), ...sideIds(tension.opposing)])
        screen.named.add(id);
    if (tension.kind === 'current-vs-natal') {
        const natal = tension.opposing.natalFacts.slice(0, 2).map((fact) => factPhrase(fact));
        if (activeLocale() !== 'sk') {
            /* English: an influence already described on this screen is not described again with a different pull (the same pillar was "inward" in one paragraph and
               "patience and support" in the next), the numbers carry a plain gloss at first use, and the habit line says what the reader would notice. */
            const fresh = tension.current.signals.map((signal) => signal.fact)
                .filter((fact, index, all) => all.findIndex((other) => other.id === fact.id) === index && !namedBefore.has(fact.id));
            const list = sentenceList(natal.map((phrase) => glossedPhrase(phrase, screen.glossed)));
            const again = fresh.length === 0;
            const head = again
                ? `Your own chart adds another pull, ${pullPhrase(tension.opposing.dimension)}: ${list}.`
                : `${t(`fc.x.periodThis.${level}`)} pulls you ${pullPhrase(tension.current.dimension)} (${sentenceList(fresh.map((fact) => influenceName(fact)))}), while your own chart pulls you ${pullPhrase(tension.opposing.dimension)}: ${list}.`;
            return para(`${head} ${habitSentence(tension.axis, t(`fc.x.periodOf.${level}`), namedBefore.size > 0)} ${balance}`, sideIds(tension.current));
        }
        return para(tf('fc.x.tensionNatal', {
            period: t(`fc.x.periodThis.${level}`),
            pullA: pullPhrase(tension.current.dimension),
            namesA: sideNames(tension.current),
            pullH: pullPhrase(tension.opposing.dimension),
            natal: sentenceList(natal),
            habit: habitSentence(tension.axis, t(`fc.x.periodOf.${level}`)),
            balance,
        }), sideIds(tension.current));
    }
    return para(tf('fc.x.tension', {
        period: t(`fc.x.periodOf.${level}`),
        pullA: pullPhrase(withSide.dimension),
        namesA: sideNames(withSide),
        pullB: pullPhrase(against.dimension),
        namesB: sideNames(against),
        balance,
    }), [...sideIds(withSide), ...sideIds(against)]);
}
/** English reads the year's pulls as one paragraph under "Main tension", with every fact either one stood on; the Slovak Forecast keeps one paragraph per pull. */
function mergedTensions(paragraphs) {
    if (activeLocale() === 'sk' || paragraphs.length < 2)
        return [...paragraphs];
    return [para(paragraphs.map((paragraph) => paragraph.text).join(' '), [...new Set(paragraphs.flatMap((paragraph) => paragraph.factIds))])];
}
const readable = (entries) => entries.filter((entry) => temporalContribution(entry.fact));
/**
 * THE YEAR: what direction the larger period is moving in.
 *
 * Led by the year's own influences - the Personal Year and the annual pillar.
 * The ten-year luck pillar is the background it happens against: it can be one
 * side of a pull, and it is named among the influences, but it is not what a
 * year is „mainly about", because it was already true last year and will be
 * next year.
 */
export function yearNarrative(entries, context) {
    const core = readable(entries.filter((entry) => entry.scale === 'year'));
    const background = readable(entries.filter((entry) => entry.scale === 'background'));
    const lead = leadOf(core) ?? leadOf(background);
    const tensions = rankedTensions([...core, ...background], context.natal, lead).slice(0, 2);
    /* A calendar-year view may include BaZi pillars from two solar years. An
       annual pillar is licensed only for the days actually counted by periodFacts,
       even where its contribution appears in a broader annual tension. */
    /*
     * English states the scope ONCE, on the first paragraph a part-year pillar licenses: the same sentence under every paragraph, also under sentences that never name
     * the pillar, read as a refrain. A pillar in force for only a few weeks (SHORT_PILLAR_DAYS) still may not stand under a paragraph that could be read as year-wide
     * (forecastTimeLevels B1): where the paragraph names it, its dates go into the name ("BaZi year pillar Yi Si (until 3 February)"), and where it does not, the note
     * is said again. The Slovak Forecast is frozen and keeps saying the scope under each paragraph.
     */
    const SHORT_PILLAR_DAYS = 40;
    let scopeNoted = false;
    const scopeYear = (paragraph, sourceIds) => {
        const partial = core.filter((entry) => entry.fact.id.startsWith('bazi:annual-pillar:')
            && entry.days < entry.total && sourceIds.includes(entry.fact.id));
        if (partial.length === 0)
            return paragraph;
        if (activeLocale() !== 'sk') {
            const factIds = [...new Set([...paragraph.factIds, ...idsOf(partial)])];
            let text = paragraph.text;
            let needsNote = false;
            for (const entry of partial.filter((item) => item.days <= SHORT_PILLAR_DAYS)) {
                const name = influenceName(entry.fact);
                if (text.includes(name))
                    text = text.split(name).join(`${name} (${whenText(entry, 'year', context.bounds)})`);
                else
                    needsNote = true;
            }
            if (!scopeNoted || needsNote) {
                scopeNoted = true;
                return para(`${text} ${tf(partial.length === 1 ? 'fc.x.yearPartialOne' : 'fc.x.yearPartialMany', { spans: '' })}`, factIds);
            }
            return para(text, factIds);
        }
        const spans = sentenceList(partial.map((entry) => `${influenceName(entry.fact)} (${whenText(entry, 'year', context.bounds)})`));
        const key = partial.length === 1 ? 'fc.x.yearPartialOne' : 'fc.x.yearPartialMany';
        return para(`${paragraph.text} ${tf(key, { spans })}`, [...new Set([...paragraph.factIds, ...idsOf(partial)])]);
    };
    const summary = [lead
            ? para(tf(lead.shared ? 'fc.x.leadYearShared' : 'fc.x.leadYear', { year: context.year, lean: lead.theme }), idsOf(lead.entries))
            : para(t('fc.x.nothing'))];
    /* The pull, if there is one AGAINST WHAT THE YEAR IS ABOUT - a quarrel
       between two side influences is for the tension section, not the headline.
       The ten-year background is not restated either: it is the first line of the
       influences right below, and saying it twice is the repetition this level
       was rebuilt to remove. */
    if (tensions[0] && touchesLead(tensions[0], lead))
        summary.push(pullSentence(tensions[0], lead, 'year'));
    /* English says the part-year scope once: a pull sentence is scoped by the facts it states, not by the whole tension it belongs to, so the caveat does not stand
       in two adjacent paragraphs. The Slovak Forecast is frozen and scopes as before. */
    const scopedSummary = summary.map((paragraph, index) => index === 0
        ? scopeYear(paragraph, paragraph.factIds)
        : scopeYear(paragraph, activeLocale() === 'sk'
            ? [...sideIds(tensions[0].current), ...sideIds(tensions[0].opposing)]
            : paragraph.factIds));
    const strongest = [...core, ...background].sort(byWeight).slice(0, 3);
    /* The reading of the tensions walks the same screen state, so what one paragraph described the next does not describe again. */
    const screen = newScreen();
    return {
        summary: scopedSummary,
        influences: influenceLines(strongest, 'year', context.bounds),
        tensions: mergedTensions(tensions.map((tension) => scopeYear(tensionParagraph(tension, lead, 'year', screen), [
            ...sideIds(tension.current), ...sideIds(tension.opposing),
        ]))),
        guidance: lead ? para(t(`fc.guideYear.${lead.dimension}`), idsOf(lead.entries)) : null,
        lead,
        plan: {
            level: 'year', lead: planLead(lead), vsYear: null, influences: inDisplayOrder(strongest).map((entry) => planInfluence(entry, 'listed')),
            tensions: tensions.map((tension, index) => planTension(tension, lead, index === 0 && touchesLead(tension, lead))),
            guidanceDimension: lead?.dimension ?? null, estimatedTime: false, approximateTime: false, bridge: null,
        },
    };
}
/** How a month's lead stands to the year's: with it, against it, or beside it. */
function relationTo(month, year) {
    if (!month || !year)
        return 'own';
    if (month.dimensions.some((dimension) => year.dimensions.includes(dimension)))
        return 'with';
    if (month.dimensions.some((dimension) => {
        const opposite = opposingDimension(dimension);
        return opposite !== null && year.dimensions.includes(opposite);
    }))
        return 'against';
    return 'own';
}
/**
 * THE MONTH: how the year is behaving right now.
 *
 * Led by what is the month's own - the Personal Month, the Sun's sign, and the
 * transits in orb during it - and opened by how that stands to the year's lead.
 * The year's and the luck pillar's influences are NOT re-read here: they are the
 * Year view's subject, and repeating them under a month heading is the
 * duplication this level exists to avoid.
 */
export function monthNarrative(entries, context) {
    const core = readable(entries.filter((entry) => entry.scale === 'month' || entry.scale === 'transits'));
    const lead = leadOf(core);
    const tension = rankedTensions(core, context.natal, lead)[0] ?? null;
    const summary = [lead
            ? para(tf(`fc.x.month.${relationTo(lead, context.yearLead)}`, {
                month: capitalise(context.monthName), lean: lead.theme,
            }), idsOf(lead.entries))
            : para(t('fc.x.nothing'))];
    /* Only a pull on the month's own lead: a minor influence disagreeing with the
       chart - the Sun's sign for three weeks, say - is not what the month is. */
    if (tension && touchesLead(tension, lead))
        summary.push(pullSentence(tension, lead, 'month'));
    const estimatedTime = context.birthTimeEstimated && core.some((entry) => entry.scale === 'transits');
    if (estimatedTime)
        summary.push(para(t('fc.x.estimatedTime')));
    const strongest = [...core].sort(byWeight).slice(0, 3);
    /* Personal Month 2 calls for cooperation, even when another month influence
       favors novelty. Keep both licensed claims, and name how to combine them. */
    const monthTwoNovelty = lead?.dimension === 'novelty-seeking'
        && core.some((entry) => entry.fact.sourceEntity === 'personalMonth' && Number(entry.fact.provenance.number) === 2);
    const guidanceKey = !lead ? null
        : monthTwoNovelty ? 'fc.guideMonth.novelty-seeking-partnership'
            : `fc.guideMonth.${lead.dimension}`;
    return {
        summary,
        influences: influenceLines(strongest, 'month', context.bounds),
        tensions: [],
        guidance: lead && guidanceKey ? para(t(guidanceKey), idsOf(lead.entries)) : null,
        lead,
        plan: {
            level: 'month', lead: planLead(lead), vsYear: lead ? relationTo(lead, context.yearLead) : null,
            influences: inDisplayOrder(strongest).map((entry) => planInfluence(entry, 'listed')),
            tensions: tension && touchesLead(tension, lead) ? [planTension(tension, lead, true)] : [],
            guidanceDimension: lead?.dimension ?? null, estimatedTime, approximateTime: false, bridge: null,
        },
    };
}
/* How many of each scale the day's background names in the open. The rest are
   in the technical list, which names everything. */
const SUPPORT_CAP = { background: 1, year: 2, transits: 2, month: 1, day: 0 };
/**
 * THE DAY'S BACKGROUND, AND THE DAY SET AGAINST IT.
 *
 * The larger period is every influence slower than a day that holds on this
 * date. „What supports it" lists them, except the ones on the far side of the
 * main pull: the old reading told a reader the annual pillar „points the same
 * way" as a push it was the very thing pulling against, and the pull section
 * then said the opposite. Those influences are named where they belong - under
 * the pull.
 *
 * The bridge is the only place the day's own influences meet the period: the
 * Personal Day's direction compared with the lead and the period's heaviest
 * dimensions. The first comparison that lands decides it - the day runs with
 * the period, against it, or adds a note of its own.
 */
export function dayClimate(facts, context) {
    const entries = periodFacts([{ date: context.date, facts }]);
    const durable = readable(entries.filter((entry) => entry.scale !== 'day'));
    const lead = leadOf(durable);
    const tension = rankedTensions(durable, context.natal, lead)[0] ?? null;
    const summary = [lead
            ? para(tf(lead.shared ? 'fc.x.leadPeriodShared' : 'fc.x.leadPeriod', { lean: lead.theme }), idsOf(lead.entries))
            : para(t('fc.x.nothing'))];
    const againstLead = tension !== null && touchesLead(tension, lead);
    if (tension && againstLead)
        summary.push(pullSentence(tension, lead, 'period'));
    const estimatedTime = context.birthTimeEstimated && durable.some((entry) => entry.scale === 'transits');
    if (estimatedTime)
        summary.push(para(t('fc.x.estimatedTime')));
    /*
     * WHAT IS TAKEN OUT OF THE SUPPORT LIST.
     *
     * Anything leaning the opposite way from the lead on the lead's own axis.
     * That is a property of the influence, checked against every durable entry,
     * so it holds whichever tension the friction paragraph ended up printing -
     * including a current-vs-natal one, which is the case that let the annual
     * pillar back in.
     *
     * The chosen tension's against-side is still added, because a tension can be
     * carried by an influence whose heaviest signal sits on another axis.
     */
    const pulling = new Set(tension?.kind === 'current-vs-current' && againstLead
        ? sideIds(orient(tension, lead).against) : []);
    if (lead) {
        /* Taken from what the lead's own influences CARRY, not from `dimensions`.
           A Personal Year 1 carries assertive, independent and novelty-seeking at
           equal weight; `dimensions` holds the one that won the naming, and an
           influence opposing either of the other two is still opposing the period
           - which is exactly how an annual pillar carrying `receptive` slipped
           past a lead named for `novelty-seeking`. */
        const against = new Set();
        for (const signal of periodSignals(lead.entries)) {
            const opposite = opposingDimension(signal.dimension);
            if (opposite)
                against.add(opposite);
        }
        for (const signal of periodSignals(durable)) {
            if (against.has(signal.dimension))
                pulling.add(signal.fact.id);
        }
    }
    const kept = [];
    const perScale = new Map();
    for (const entry of [...durable].sort(byWeight)) {
        if (pulling.has(entry.fact.id))
            continue;
        const used = perScale.get(entry.scale) ?? 0;
        if (used >= SUPPORT_CAP[entry.scale])
            continue;
        perScale.set(entry.scale, used + 1);
        kept.push(entry);
    }
    const pulls = durable.filter((entry) => pulling.has(entry.fact.id)).sort(byWeight).slice(0, 2);
    return {
        summary,
        supports: influenceLines(kept, 'period', null),
        pulls: influenceLines(pulls, 'period', null),
        tension: tension ? tensionParagraph(tension, lead, 'period') : null,
        guidance: lead ? para(t(`fc.guideMonth.${lead.dimension}`), idsOf(lead.entries)) : null,
        bridge: bridgeFor(entries, durable, lead, context.isToday),
        lead,
        plan: {
            /* the pulls are shown under the friction section, which exists only when there is a tension; without one they are not part of what the reading says */
            level: 'day', lead: planLead(lead), vsYear: null,
            influences: [...inDisplayOrder(kept).map((entry) => planInfluence(entry, 'support')), ...(tension ? inDisplayOrder(pulls).map((entry) => planInfluence(entry, 'pull')) : [])],
            tensions: tension ? [planTension(tension, lead, againstLead)] : [],
            guidanceDimension: lead?.dimension ?? null, estimatedTime, approximateTime: false, bridge: bridgeRelationOf(entries, durable, lead),
        },
    };
}
/** How the Personal Day stands to the larger period: the first comparison that lands decides it. */
function bridgeRelationOf(entries, durable, lead) {
    const day = entries.find((entry) => entry.fact.sourceEntity === 'personalDay');
    const contribution = day ? temporalContribution(day.fact) : null;
    if (!day || !contribution || !lead)
        return null;
    const own = contribution.dimensions;
    const compared = [lead.dimension, ...heaviestDimensions(durable, 4).filter((dimension) => dimension !== lead.dimension)];
    let relation = 'own';
    for (const dimension of compared) {
        if (own.includes(dimension)) {
            relation = 'with';
            break;
        }
        const opposite = opposingDimension(dimension);
        if (opposite && own.includes(opposite)) {
            relation = 'against';
            break;
        }
    }
    return { relation, dayNumber: String(day.fact.provenance.number), factIds: [day.fact.id, ...idsOf(lead.entries)] };
}
function bridgeFor(entries, durable, lead, isToday) {
    const bridge = bridgeRelationOf(entries, durable, lead);
    if (!bridge || !lead)
        return null;
    const { relation, dayNumber: number } = bridge;
    return para(tf(`fc.x.bridge.${relation}`, {
        day: t(isToday ? 'fc.x.dayToday' : 'fc.x.dayThis'),
        now: t(isToday ? 'fc.x.nowToday' : 'fc.x.nowThis'),
        tone: t(`fc.dayTone.${number}`),
        act: t(`fc.dayAct.${number}`),
        lean: lead.theme,
    }), bridge.factIds);
}
export { capitalise, lowerFirst };
