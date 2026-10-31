import { resolve } from '../knowledge/knowledgeBase.js?v=53c0693';
import { aspectPairKey } from '../knowledge/astrology/astrologyAuthoring.js?v=53c0693';
import { angleGlyph, aspectGlyph, ASPECT_LABELS, moonPhaseGlyph, planetGlyph, signGlyph, } from './glyphs/pillarGlyphs.js?v=53c0693';
import { SectionBuilder, outputValue } from './composeReading.js?v=53c0693';
import { t, tf } from '../i18n/uiStrings.js?v=53c0693';
/* The placement HEADINGS say the same thing as the prose under them, so they
   say it in the same words: `Venuša v Panne`, not `Venus v znamení Virgo`. Both
   helpers are a no-op outside Slovak - the sign form is read from the UI
   dictionary, whose English entry is the bare sign name - so the English
   heading is still `Venus in Virgo`, byte for byte. */
import { bodyWord, inSign } from '../i18n/engineProse.js?v=53c0693';
import { composeAstrologyNarrative } from './astrology-narrative/composeAstrologyNarrative.js?v=53c0693';
import { degreeText, PLANETS, readable, } from './astrology-narrative/astrologyInterpretation.js?v=53c0693';
/** Generational, and read without aspects in Go deeper: everyone born within a few years shares them. */
const OUTER = new Set(['Uranus', 'Neptune', 'Pluto']);
/** The portrait fields in the order Go deeper lists them. */
const PORTRAIT_ORDER = [
    'coreCharacter', 'innerWorld', 'emotionalPattern', 'relationships', 'workAndDirection',
    'strengths', 'shadow', 'growth', 'practicalGuidance',
];
function readPlacement(body, sign, house, dignity, aspects) {
    const planetKey = body.toLowerCase();
    const signKey = sign.toLowerCase();
    const context = {
        ...(house !== null ? { house } : {}),
        ...(dignity ? { dignity: dignity } : {}),
        aspects: aspects
            .filter((entry) => entry.a === body || entry.b === body)
            .map((entry) => ({ aspect: entry.kind, other: (entry.a === body ? entry.b : entry.a).toLowerCase() })),
    };
    const request = {
        system: 'western-astrology', kind: 'planet', key: `${planetKey}-${signKey}`, role: 'natal-placement',
    };
    const resolved = resolve({ ...request, context })
        ?? resolve({ system: 'western-astrology', kind: 'sign', key: signKey, role: 'base-archetype' });
    /* The same unit with no context fires no overlay, so its core is exactly the
       base paragraphs - which is where the contextual core is split. */
    const plain = resolve(request);
    const core = resolved?.core ?? [];
    const baseCount = plain && plain.core.every((paragraph, index) => core[index] === paragraph)
        ? plain.core.length : core.length;
    const houseUnit = house !== null
        ? resolve({ system: 'western-astrology', kind: 'house', key: `${planetKey}-house-${house}`, role: 'natal-placement' })
        : null;
    return {
        base: core.slice(0, baseCount),
        overlays: core.slice(baseCount),
        house: houseUnit?.core ?? [],
        portrait: resolved?.portrait ?? {},
    };
}
const aspectValue = (aspect) => `${aspect.a} ${aspect.kind} ${aspect.b}`;
export function composeAstrologyReading(pillar) {
    const builder = new SectionBuilder();
    const shownLabels = [];
    const marksBySection = {};
    const introduction = [t('reading.astrology.intro')];
    const narrative = composeAstrologyNarrative(pillar.westernAstrologyChart);
    if (!narrative)
        return { heroMarks: [], introduction, sections: builder.build(marksBySection), shownLabels };
    const { model, plan, voice } = narrative;
    const { bodies } = model;
    /* ---------------------------------------------------- AT A GLANCE */
    /*
     * The chart's identifying facts and no interpretation, each once, each marked
     * with how far the birth time lets it be trusted. A fact the time does not
     * give is not here at all.
     */
    const glance = [];
    const glanceOf = (label, value, extra = {}) => {
        if (!value)
            return;
        glance.push({
            glyph: '', label, value,
            ...(extra.note ? { note: extra.note } : {}),
            ...(extra.infoKey ? { infoKey: extra.infoKey } : {}),
        });
    };
    const sun = bodies.Sun;
    const moon = bodies.Moon;
    /* Without a birth time the day fixes a luminary's sign, not its degree - the
       Moon alone moves about thirteen degrees in a day - so the noon degree the
       engine calculates with is not shown as the chart's. */
    const timeUnknown = model.precision === 'unknown';
    const placed = (reading) => (timeUnknown ? voice.marks.signName(reading.sign) : `${reading.sign} ${degreeText(reading.degree)}`);
    glanceOf('Sun', placed(sun), sun.state === 'boundary' ? { note: voice.marks.changes(sun.spans) } : {});
    shownLabels.push('Sun');
    glanceOf('Moon', placed(moon), moon.state === 'boundary' ? { note: voice.marks.changes(moon.spans) }
        : timeUnknown ? { note: voice.marks.allDay } : {});
    shownLabels.push('Moon');
    const ascendant = model.bigThree.ascendant;
    /* Whole Sign houses are exactly as certain as the rising sign they count from. */
    const housesRead = readable(ascendant.state);
    if (ascendant.sign && ascendant.degree !== null && ascendant.state !== 'withheld') {
        const alternatives = ascendant.spans.map((span) => span.value).filter((sign) => sign !== ascendant.sign);
        const note = ascendant.state === 'approximate' ? voice.marks.estimated
            : ascendant.state === 'boundary' ? `${voice.marks.estimated}; ${voice.marks.alsoPossible(alternatives)}`
                : undefined;
        glanceOf('Ascendant', `${ascendant.sign} ${degreeText(ascendant.degree)}`, {
            ...(note ? { note } : {}), infoKey: 'ascendant',
        });
        shownLabels.push('Ascendant');
    }
    const elementBalance = outputValue(pillar, 'Element balance');
    const modalityBalance = outputValue(pillar, 'Modality balance');
    const countNote = (state) => (state === 'boundary'
        ? voice.marks.countChanges(model.boundaryBodies) : undefined);
    if (elementBalance) {
        const { elements } = model;
        const single = elements.state === 'known' && (elements.shape === 'single' || elements.shape === 'near');
        if (single)
            glanceOf('Dominant element', elements.leaders[0], { note: elementBalance, infoKey: 'element' });
        else
            glanceOf('Elements', elementBalance, { infoKey: 'element', ...(countNote(elements.state) ? { note: countNote(elements.state) } : {}) });
        shownLabels.push('Element balance');
    }
    if (modalityBalance) {
        const { modalities } = model;
        const single = modalities.state === 'known' && (modalities.shape === 'single' || modalities.shape === 'near');
        if (single)
            glanceOf('Dominant modality', modalities.leaders[0], { note: modalityBalance, infoKey: 'modality' });
        else
            glanceOf('Modalities', modalityBalance, { infoKey: 'modality', ...(countNote(modalities.state) ? { note: countNote(modalities.state) } : {}) });
        shownLabels.push('Modality balance');
    }
    const ruler = model.ruler && readable(model.ruler.state) ? model.ruler : null;
    if (ruler) {
        /* The value in the engine's `Pluto in Scorpio` shape, which the overlay
           translates; the note is composed, so it is localised here. */
        const rulerAngle = model.angular.find((entry) => entry.body === ruler.body && readable(entry.state));
        const note = [
            ruler.house !== null ? t(`reading.astrology.houseIn.${ruler.house}`) : null,
            rulerAngle ? t(`reading.astrology.angleOn.${angleKey(rulerAngle.angle)}`) : null,
            ruler.state === 'approximate' ? voice.marks.estimated : null,
        ].filter((part) => Boolean(part)).join(', ');
        glanceOf('Chart ruler', `${ruler.body} in ${ruler.sign}`, { ...(note ? { note } : {}), infoKey: 'chart-ruler' });
        shownLabels.push('Chart ruler');
    }
    const signStellium = model.concentrations.find((entry) => entry.kind === 'sign' && entry.state === 'known');
    const houseStellium = model.concentrations.find((entry) => entry.kind === 'house' && readable(entry.state));
    if (signStellium?.sign) {
        glanceOf('Stellium', `${signStellium.sign} (${signStellium.bodies.length})`, {
            note: signStellium.bodies.join(', '), infoKey: 'stellium',
        });
        shownLabels.push('Stelliums');
    }
    else if (houseStellium?.house) {
        glanceOf('Stellium', `House ${houseStellium.house} (${houseStellium.bodies.length})`, {
            note: houseStellium.bodies.join(', '), infoKey: 'stellium',
        });
        shownLabels.push('Stelliums');
    }
    const otherAngular = model.angular.find((entry) => readable(entry.state)
        && entry.body !== ruler?.body && PLANETS.includes(entry.body));
    if (otherAngular) {
        glanceOf('Angular planet', `${otherAngular.body} on ${otherAngular.angle}`);
        shownLabels.push('Angular planets');
    }
    /* The TIGHTEST aspect is the one with the smallest orb among those the birth
       time lets stand - not the highest-ranked one. */
    const tightest = [...model.aspects]
        .filter((aspect) => aspect.state === 'known')
        .sort((a, b) => a.orb - b.orb || aspectValue(a).localeCompare(aspectValue(b)))[0];
    if (tightest) {
        /* With no birth time the aspect holds all day but its orb changes with the
           hour, so no single orb is printed. */
        glanceOf('Tightest aspect', aspectValue(tightest), {
            note: timeUnknown ? voice.marks.aspectAllDay : `orb ${degreeText(tightest.orb)}`, infoKey: 'aspect',
        });
    }
    if (glance.length > 0) {
        builder.describe('at-a-glance', { layer: 'glance' });
        builder.standfirst('at-a-glance', t('reading.astrology.atAGlance.standfirst'));
        marksBySection['at-a-glance'] = glance;
    }
    /* --------------------------------------- THE MAIN READING: one argument */
    for (const section of narrative.sections)
        builder.add(section.id, section.paragraphs);
    /* The encyclopedia entries the old Big Three and rising-sign sections carried. */
    builder.describe('astro-drive', { infoKey: 'big-three' });
    builder.describe('astro-meet', { infoKey: 'ascendant' });
    builder.setEntries('astro-evidence', narrative.evidence);
    builder.describe('astro-evidence', { layer: 'deep' });
    builder.standfirst('astro-evidence', narrative.evidenceStandfirst);
    /* ============================ GO DEEPER ==================================
     * The authored detail behind the argument: every placement in full, the
     * aspects in their own words, and how the chart is put together.
     */
    /* ------------------------------------------------ every placement */
    const readableAspects = model.aspects.filter((aspect) => aspect.state === 'known');
    const used = new Set();
    const rest = (paragraphs) => {
        const fresh = paragraphs.filter((paragraph) => paragraph.length > 0 && !used.has(paragraph));
        for (const paragraph of fresh)
            used.add(paragraph);
        return fresh;
    };
    /* One aspect, one appearance - claimed the first time a pair is read. */
    const claimedPairs = new Set();
    const pairParagraphs = (aspect) => {
        const key = aspectPairKey(aspect.a, aspect.b, aspect.kind);
        if (claimedPairs.has(key))
            return [];
        const pair = resolve({ system: 'western-astrology', kind: 'aspect', key, role: 'natal-placement' });
        if (!pair)
            return [];
        claimedPairs.add(key);
        return [...pair.core];
    };
    const claimAspects = (body, max) => {
        if (OUTER.has(body))
            return [];
        return readableAspects
            .filter((entry) => entry.a === body || entry.b === body)
            .sort((a, b) => a.orb - b.orb)
            .slice(0, max)
            .flatMap(pairParagraphs);
    };
    const placementEntries = [];
    const pushPlacement = (body) => {
        const reading = bodies[body];
        shownLabels.push(body);
        if (reading.state === 'boundary') {
            /* A placement the day does not fix is read both ways, each under the
               hours it holds for - never as the noon value. */
            const paragraphs = reading.spans.flatMap((span, index) => {
                const sign = span.value;
                const unit = resolve({
                    system: 'western-astrology', kind: 'planet', key: `${body.toLowerCase()}-${sign.toLowerCase()}`, role: 'natal-placement',
                });
                return [voice.marks.ifSign(body, span, index, reading.spans.length), ...(unit?.core ?? [])];
            }).filter((paragraph) => paragraph.length > 0);
            placementEntries.push({
                id: `placement-${body.toLowerCase()}`,
                title: voice.marks.placementTitle(body, reading.signs),
                /* Both signs, no degree: the chip must not pick the noon one. */
                mark: {
                    glyph: planetGlyph(body),
                    label: body,
                    value: reading.signs.map(voice.marks.signName).join(' / '),
                },
                paragraphs: rest(paragraphs),
            });
            return;
        }
        const house = reading.house;
        const placement = readPlacement(body, reading.sign, house, reading.dignity && reading.dignity !== 'Peregrine' ? reading.dignity : null, readableAspects);
        /* The outer planets' second paragraph says their house makes them
           personal; without houses that would imply this chart has them. */
        const base = !housesRead && OUTER.has(body) && placement.base.length > 1
            ? [placement.base[0], voice.marks.generationalWithoutHouse]
            : placement.base;
        const paragraphs = rest([
            ...base,
            ...placement.overlays,
            ...PORTRAIT_ORDER.flatMap((field) => placement.portrait[field] ?? []),
            ...placement.house,
            ...claimAspects(body, 2),
        ]);
        if (paragraphs.length === 0)
            return;
        placementEntries.push({
            id: `placement-${body.toLowerCase()}`,
            title: house !== null
                ? tf('reading.astrology.placementTitleHouse', { body: bodyWord(body), sign: inSign(reading.sign), house })
                : tf('reading.astrology.placementTitle', { body: bodyWord(body), sign: inSign(reading.sign) }),
            mark: {
                glyph: `${planetGlyph(body)}${signGlyph(reading.sign, { title: reading.sign })}`,
                label: body,
                /* Without a birth time no planet's noon degree is the chart's, not only the luminaries'. */
                value: placed(reading),
            },
            paragraphs,
        });
    };
    pushPlacement('Sun');
    pushPlacement('Moon');
    /* The rising sign's own reading - only when the time gives one, and led by
       the estimate's caveat when it rests on one. */
    if (ascendant.sign && ascendant.degree !== null && ascendant.state !== 'withheld') {
        const unit = resolve({
            system: 'western-astrology', kind: 'sign', key: ascendant.sign.toLowerCase(), role: 'base-archetype',
        });
        if (unit && unit.core.length > 0) {
            const lead = ascendant.state === 'known' ? [] : [voice.marks.risingLead(ascendant.sign, ascendant.spans)];
            const paragraphs = rest([
                ...lead,
                `${tf('reading.astrology.ascendantLine', { sign: inSign(ascendant.sign) })} ${unit.core[0]}`,
                ...unit.core.slice(1),
            ]);
            if (paragraphs.length > 0) {
                placementEntries.push({
                    id: 'placement-ascendant',
                    title: tf('reading.astrology.ascendantTitle', { sign: inSign(ascendant.sign) }),
                    mark: {
                        glyph: angleGlyph('ascendant', { title: 'Ascendant' }) + signGlyph(ascendant.sign),
                        label: 'Ascendant',
                        value: `${ascendant.sign} ${degreeText(ascendant.degree)}`,
                    },
                    paragraphs,
                    infoKey: 'ascendant',
                });
            }
        }
    }
    for (const body of PLANETS.slice(2))
        pushPlacement(body);
    if (placementEntries.length > 0) {
        builder.setEntries('placements', placementEntries);
        builder.describe('placements', { layer: 'deep' });
        builder.standfirst('placements', t(housesRead ? 'reading.astrology.placements.standfirst' : 'reading.astrology.placements.standfirstNoHouses'));
    }
    /* ------------------------------------------------ the other aspects */
    /* Only an AUTHORED PAIR earns a slot, strongest first; a generic aspect
       meaning would print the same sentence under three different pairs. */
    const aspectEntries = [];
    for (const aspect of readableAspects) {
        if (aspectEntries.length >= 5)
            break;
        const paragraphs = rest(pairParagraphs(aspect));
        if (paragraphs.length === 0)
            continue;
        const key = aspectPairKey(aspect.a, aspect.b, aspect.kind);
        aspectEntries.push({
            id: `aspect-${key}`,
            title: `${aspect.a} ${ASPECT_LABELS[aspect.kind] ?? aspect.kind} ${aspect.b}`,
            mark: {
                glyph: `${planetGlyph(aspect.a)}${aspectGlyph(aspect.kind)}${planetGlyph(aspect.b)}`,
                label: `${aspect.a} / ${aspect.b}`,
                /* These aspects hold across the window; without a birth time the orb does not. */
                value: timeUnknown ? voice.marks.aspectAllDay : `orb ${degreeText(aspect.orb)}`,
            },
            paragraphs,
        });
    }
    if (aspectEntries.length > 0) {
        builder.setEntries('key-aspects', aspectEntries);
        builder.describe('key-aspects', { layer: 'deep', infoKey: 'aspect' });
        builder.standfirst('key-aspects', t('reading.astrology.keyAspects.standfirst'));
    }
    /* ------------------------------------ HOW THE CHART IS PUT TOGETHER */
    const patternKeys = chartPatternKeys(model, pillar);
    const structure = [];
    for (const key of patternKeys) {
        const unit = resolve({ system: 'western-astrology', kind: 'chart-pattern', key, role: 'base-archetype' });
        if (unit)
            structure.push(...unit.core);
    }
    /* Peregrine is the default condition, so it is said once, as a list - and
       only for planets whose sign, and so whose dignity, the time fixes. */
    const peregrine = PLANETS
        .filter((body) => bodies[body].dignity === 'Peregrine' && bodies[body].state !== 'boundary')
        .map((body) => bodyWord(body));
    if (peregrine.length > 0) {
        structure.push(tf('reading.astrology.dignity.peregrineSummary', { planets: peregrine.join(', ') }));
    }
    const structureMarks = [];
    const moonPhase = pillar.keyOutputs.find((output) => output.label === 'Moon phase');
    if (moonPhase && model.moonPhase.state === 'known') {
        structureMarks.push({
            glyph: moonPhaseGlyph(moonPhase.value), label: 'Moon phase', value: moonPhase.value,
            note: moonPhase.description ?? moonPhase.note,
        });
        shownLabels.push('Moon phase');
    }
    const midheaven = model.midheaven;
    if (midheaven.sign && midheaven.degree !== null && readable(midheaven.state)) {
        structureMarks.push({
            glyph: angleGlyph('midheaven', { title: 'Midheaven' }) + signGlyph(midheaven.sign),
            label: 'Midheaven', value: `${midheaven.sign} ${degreeText(midheaven.degree)}`,
            ...(midheaven.state === 'approximate' ? { note: voice.marks.estimated } : {}),
        });
        shownLabels.push('Midheaven');
    }
    const hemisphere = outputValue(pillar, 'Hemisphere balance');
    if (hemisphere && !/^Unavailable/.test(hemisphere) && readable(model.houseState)) {
        structureMarks.push({ glyph: '', label: 'Hemisphere balance', value: hemisphere });
        shownLabels.push('Hemisphere balance');
    }
    const retrogrades = outputValue(pillar, 'Retrograde planets');
    if (retrogrades && !/^none\b/i.test(retrogrades.trim())) {
        structureMarks.push({ glyph: '', label: 'Retrograde planets', value: retrogrades });
        shownLabels.push('Retrograde planets');
    }
    const structureFresh = rest(structure);
    if (structureFresh.length > 0 || structureMarks.length > 0) {
        builder.add('chart-structure', structureFresh);
        builder.describe('chart-structure', { layer: 'deep' });
        builder.standfirst('chart-structure', t('reading.astrology.chartStructure.standfirst'));
        if (structureMarks.length > 0)
            marksBySection['chart-structure'] = structureMarks;
    }
    return { heroMarks: [], introduction, sections: builder.build(marksBySection), shownLabels };
}
/** `Imum Coeli` -> the UI key's `imum-coeli`. */
const angleKey = (angle) => angle.toLowerCase().replace(/\s+/g, '-');
/*
 * THE TRADITION'S OWN ACCOUNT OF EVERY PATTERN THE CHART HOLDS, in full, for Go
 * deeper - each one only when the birth time lets it stand. A count the day
 * of birth could change is not read as a pattern; a house, an angle or a
 * hemisphere needs houses the reader can stand behind.
 */
function chartPatternKeys(model, pillar) {
    const keys = [];
    const { elements, modalities } = model;
    if (elements.state === 'known' && (elements.shape === 'single' || elements.shape === 'near')) {
        keys.push(`element-dominant-${elements.leaders[0].toLowerCase()}`);
    }
    if (elements.state === 'known') {
        for (const scarce of elements.scarce)
            keys.push(`element-absent-${scarce.toLowerCase()}`);
    }
    if (modalities.state === 'known' && (modalities.shape === 'single' || modalities.shape === 'near')) {
        keys.push(`modality-dominant-${modalities.leaders[0].toLowerCase()}`);
    }
    if (model.concentrations.some((entry) => entry.kind === 'sign' && entry.state === 'known'))
        keys.push('stellium-sign');
    else if (model.concentrations.some((entry) => entry.kind === 'house' && readable(entry.state)))
        keys.push('stellium-house');
    if (model.angular.some((entry) => readable(entry.state)))
        keys.push('angular-emphasis');
    if (model.ruler && readable(model.ruler.state))
        keys.push('chart-ruler-emphasis');
    const hemisphere = outputValue(pillar, 'Hemisphere balance');
    if (hemisphere && !/^Unavailable/.test(hemisphere) && readable(model.houseState)) {
        keys.push(easternLeaning(hemisphere) ? 'hemisphere-eastern' : 'hemisphere-western');
    }
    if (model.retrograde.length >= 3)
        keys.push('retrograde-emphasis');
    return keys;
}
/*
 * WHETHER THE EASTERN HALF CARRIES MORE.
 *
 * The engine prints `East 9 / West 1 / North 5 / South 5`. Both this shape and
 * the older `6E/4W` one are read.
 */
function easternLeaning(hemisphere) {
    const east = Number(/East\s+(\d+)/i.exec(hemisphere)?.[1] ?? /(\d+)\s*E\b/i.exec(hemisphere)?.[1] ?? 0);
    const west = Number(/West\s+(\d+)/i.exec(hemisphere)?.[1] ?? /(\d+)\s*W\b/i.exec(hemisphere)?.[1] ?? 0);
    return east >= west;
}
