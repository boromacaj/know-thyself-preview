import { composeGivenNameSections } from '../given-name/givenNameReading.js?v=f9ab0a6';
import { buildTechnicalAppendix } from './composeReading.js?v=f9ab0a6';
import { engineProse } from '../i18n/engineProse.js?v=f9ab0a6';
import { t, UI_STRING_KEYS } from '../i18n/uiStrings.js?v=f9ab0a6';
import { composeAstrologyReading } from './astrologyReading.js?v=f9ab0a6';
import { composeBaziReading } from './baziReading.js?v=f9ab0a6';
import { composeHumanDesignReading } from './humanDesignReading.js?v=f9ab0a6';
import { composeNumerologyReading } from './numerologyReading.js?v=f9ab0a6';
import { READING_SECTION_ORDER, orderSections, withContent, } from './readingTypes.js?v=f9ab0a6';
export * from './readingTypes.js?v=f9ab0a6';
export { technicalNoteFor } from './technicalNotes.js?v=f9ab0a6';
/**
 * ONE ENTRY POINT.
 *
 * Dispatches to the pillar's composer, then applies the two rules that are the
 * same for every pillar: sections render in the fixed hierarchy, and empty
 * sections do not render at all.
 *
 * A pillar with no composer still produces a valid reading - hero, summary and
 * the full technical appendix - rather than an error. That is what keeps a new
 * or unavailable pillar from breaking the screen.
 */
/*
 * THE READING HIERARCHY, PER TRADITION.
 *
 * Kept here rather than inside each composer so the whole product's information
 * architecture is legible in one place - and so a test can assert the order
 * without reaching into four files.
 *
 * The shared spine is at-a-glance -> portrait -> themes -> the life areas ->
 * growth. What differs is what each tradition puts BEFORE that spine (its own
 * accessible entry point) and AFTER it (its own deeper machinery). Forcing all
 * four into one order would flatten exactly what makes each of them that system.
 */
const PILLAR_SECTION_ORDER = {
    /*
     * ONE ARGUMENT, THEN THE SYSTEM.
     *
     * The narrative layer (numerology-narrative/) reads the chart in its own
     * order: the direction the life keeps taking, what satisfies you, how you
     * meet the world, where the numbers pull apart, what the pattern costs, what
     * grows stronger with time, and the chapter of life you are in - the current
     * chapter is still findable at a glance. Everything below the seven is deep:
     * why each section says what it says, every number on its own, the four
     * chapters, and today's cycles, which are the Forecast's subject and kept
     * here for reference.
     */
    numerology: [
        'at-a-glance',
        'numerology-direction', 'numerology-drive', 'numerology-presence',
        'numerology-pull', 'numerology-cost', 'numerology-growth', 'numerology-chapter',
        'numerology-evidence', 'numerology-positions', 'numerology-chapters', 'numerology-cycles',
        /*
         * THE NAME LAYER MOVED DOWN, AND IT IS THE SAME LAYER IT ALWAYS WAS.
         *
         * It used to sit third, between the personal answer and the numerical
         * portrait, on the argument that a reader meets their own name most
         * naturally right after being told who they are. That argument holds for
         * ADJACENCY and not for PRIORITY: where a name comes from is not one of the
         * calculated positions, and putting it above the portrait meant an
         * etymology arrived before the Life Path.
         *
         * It keeps its own run of headings, still together, still in the order it
         * had - numerology and etymology ask different questions of the same
         * letters, and separate adjacent headings is still the arrangement that
         * shows they are related without implying either supports the other.
         */
        'your-name', 'name-culture', 'name-day',
        'system-specific',
    ],
    /*
     * ONE ARGUMENT, THEN THE CHART.
     *
     * The narrative layer (astrology-narrative/) reads the chart in its own
     * order: the chart's main pattern, the Sun and Moon together, what shows
     * first, how you think and act, how you relate, where the chart pulls two
     * ways, and what the pattern costs and what helps. The life-area headings
     * are gone: they read the chart as six separate horoscopes, and the chart's
     * real theme and tension were in none of them. Everything below the seven is
     * deep: why each section says what it says, every placement in full, the
     * aspects in their own words, and how the chart is put together.
     */
    'western-astrology': [
        'at-a-glance',
        'astro-pattern', 'astro-drive', 'astro-meet', 'astro-mind', 'astro-relate', 'astro-pull', 'astro-helps',
        'astro-evidence', 'placements', 'key-aspects', 'chart-structure',
        'system-specific',
    ],
    /*
     * THE PERSON BEFORE THE APPARATUS.
     *
     * The Chinese zodiac is still the accessible way in. What follows it is the
     * narrative layer (bazi-narrative/): a Ziping argument in six steps, each
     * resting on the one before - the Day Master in its season, where the
     * chart's weight goes, where it pulls two ways, what steadies it, what it
     * costs, what to practise. It replaces the life-area headings the other
     * pillars share, because a BaZi reading does not start from "relationships";
     * it starts from the Day Master in its month.
     *
     * Everything below the six is deep: why each section says what it says, then
     * the system itself - the Day Master as a concept, the season and the
     * strength model, the five-phase counts, and how the chart is CONSTRUCTED,
     * which is a question somebody asks after they know what it says.
     */
    'bazi-tcm': [
        'at-a-glance', 'chinese-zodiac',
        'bazi-nature', 'bazi-energy', 'bazi-tension', 'bazi-steadies', 'bazi-costs', 'bazi-practice',
        'bazi-evidence',
        'day-master', 'seasonal-strength', 'five-elements',
        'four-pillars', 'hidden-stems', 'ten-gods', 'luck-pillars', 'tcm',
        'system-specific',
    ],
    /*
     * THE MECHANIC ONCE, THEN THE MACHINERY.
     *
     * The BodyGraph renders before any of this (see CHART_SLOT). What follows it
     * is the narrative layer (human-design-narrative/): one argument in eight
     * steps, each resting on the one before - what the design runs on, how a
     * decision gets made, how it meets people, what is fixed, what is not, where
     * it contradicts itself, what that costs, what helps.
     *
     * The life-area headings the other pillars share are gone. Human Design does
     * not have an opinion about a job or about relationships; it has one about
     * how a decision gets made, and that shows up in every area at once. Printing
     * it under four headings is what made one defined Sacral get explained four
     * times.
     *
     * Below the eight: why each section says what it says, then the machinery -
     * Type, the deciding practice, Authority, Profile, Definition, every centre,
     * every channel, the gates, the cross and the Variables. A gate list means
     * nothing to a reader who has not yet been told what the graph is.
     *
     * `hd-withheld` leads, because when it is present it is the only section
     * there is: no birth time, no reading.
     */
    'human-design': [
        'hd-withheld',
        'hd-envelope',
        'at-a-glance',
        /* the editorial pilot's sections (humanDesignRealizerPort.ts); absent from every reading unless the pilot is switched on */
        'hd2-lead', 'hd2-energy', 'hd2-decide', 'hd2-people', 'hd2-steady', 'hd2-open', 'hd2-pull', 'hd2-off', 'hd2-help',
        'hd-operates', 'hd-decides', 'hd-with-others', 'hd-consistent',
        'hd-context', 'hd-tension', 'hd-costs', 'hd-practice',
        'hd-evidence',
        'hd-type-detail', 'deciding', 'hd-authority-detail', 'hd-profile-detail', 'hd-definition-detail',
        'defined-centres', 'open-centres', 'channels', 'gates', 'hd-cross', 'variables',
        'system-specific',
    ],
};
/*
 * For three pillars the chart is an illustration of the reading. For Human
 * Design it IS the reading's subject: nothing below it can be followed by
 * someone who has not seen the graph first.
 */
const CHART_SLOT = {
    'human-design': 'after-hero',
};
function composeParts(pillar) {
    switch (pillar.id) {
        case 'numerology': return composeNumerologyReading(pillar);
        case 'western-astrology': return composeAstrologyReading(pillar);
        case 'bazi-tcm': return composeBaziReading(pillar);
        case 'human-design': return composeHumanDesignReading(pillar);
        default: return { heroMarks: [], introduction: [], sections: [], shownLabels: [] };
    }
}
export function composePillarReading(pillar, context = {}) {
    /* A pillar the engine could not calculate has nothing to interpret. Say so in
       one sentence and go straight to the appendix, rather than rendering nine
       empty headings. */
    const unavailable = pillar.source.kind === 'unavailable';
    const parts = unavailable
        ? { heroMarks: [], introduction: [], sections: [], shownLabels: [] }
        : composeParts(pillar);
    /* Additive and self-silencing: an unknown name returns no sections and the
       reading is exactly what it was before this layer existed. A name the corpus
       cannot resolve must never be able to break profile composition. */
    const nameSections = pillar.id === 'numerology' && context.givenName
        ? composeGivenNameSections(context.givenName)
        : [];
    const introduction = unavailable
        ? [pillar.summary]
        : [...parts.introduction];
    const sectionOrder = PILLAR_SECTION_ORDER[pillar.id] ?? READING_SECTION_ORDER;
    return {
        pillarId: pillar.id,
        hero: {
            eyebrow: pillar.eyebrow,
            /* The pillar's name and status in the reader's language. The dictionary
               carries the same four English titles the engine does, so in English
               this is the same string; the status is an engine value and goes
               through the overlay like every other. */
            title: UI_STRING_KEYS.includes(`pillar.${pillar.id}.title`)
                ? t(`pillar.${pillar.id}.title`)
                : pillar.title,
            statusLabel: engineProse(pillar.statusLabel),
            isLive: !unavailable,
            marks: parts.heroMarks,
        },
        introduction,
        sections: orderSections(withContent([...parts.sections, ...nameSections]), sectionOrder),
        sectionOrder,
        chartSlot: CHART_SLOT[pillar.id] ?? 'after-sections',
        technical: buildTechnicalAppendix(pillar, { shownValueLabels: parts.shownLabels }),
    };
}
