import { hasDisputedOrigin } from '../../../../data/given-names/givenNameTypes.js?v=53c0693';
import { languageLabel } from '../../../../data/given-names/languageLabels.js?v=53c0693';
import { selectNameDayRegion } from '../../../../data/name-days/nameDayRegionSelection.js?v=53c0693';
import { activeLocale } from '../i18n/locale.js?v=53c0693';
import { dateLocale } from '../i18n/dateLocale.js?v=53c0693';
import { t, tf } from '../i18n/uiStrings.js?v=53c0693';
let knowledge = null;
let pending = null;
/** True once the corpus is in memory and sections can be composed. */
export function givenNameKnowledgeReady() {
    return knowledge !== null;
}
/** Start (or join) the load. Safe to call repeatedly; resolves either way. */
export function preloadGivenNameKnowledge() {
    if (knowledge)
        return Promise.resolve();
    if (!pending) {
        pending = Promise.all([
            import('../../../../data/given-names/givenNameResolver.js?v=53c0693'),
            import('../../../../data/name-days/nameDayCalendars.js?v=53c0693'),
        ]).then(([resolver, calendars]) => {
            knowledge = {
                resolveGivenName: resolver.resolveGivenName,
                givenNameByKey: resolver.givenNameByKey,
                nameDayCalendar: calendars.nameDayCalendar,
                nameDaysFor: calendars.nameDaysFor,
                nameDaysAcrossRegions: calendars.nameDaysAcrossRegions,
            };
        }).catch(() => {
            /* Left unloaded on purpose. The next call tries again; nothing else in
               the reading depends on this having succeeded. */
            pending = null;
        });
    }
    return pending;
}
/**
 * Run `onReady` once the corpus is available - now, if it already is.
 *
 * The promise is handled HERE rather than at the call site on purpose. The
 * pillar experience carries a standing guarantee that its calculation is
 * synchronous and that it invents no loading state, and a test enforces that by
 * refusing to see promise handling in that file at all. Keeping the deferral in
 * the module that owns it means the guarantee stays literally true, and the one
 * place that knows the data is late is the one place that has to.
 */
export function whenGivenNameKnowledgeReady(onReady) {
    if (knowledge) {
        onReady();
        return;
    }
    void preloadGivenNameKnowledge().then(() => {
        if (knowledge)
            onReady();
    });
}
function localeNow() {
    return activeLocale() === 'sk' ? 'sk' : 'en';
}
/** English is the required field, so this can never return undefined. */
function text(value, locale) {
    return (locale === 'sk' ? value.sk : value.en) ?? value.en;
}
/** Locale-appropriate quotation marks around a gloss. Slovak uses „ “. */
function gloss(value, locale) {
    return locale === 'sk' ? `„${value}“` : `‘${value}’`;
}
/**
 * A derivation chain rendered as one line.
 *
 * Deliberately an arrow chain rather than a sentence. A sentence would have to
 * inflect the language name to fit Slovak grammar ("z praslovanského ...") and
 * a table of nominative labels cannot be inflected by rule without producing
 * Slovak that no Slovak speaker would write. The chain form reads correctly in
 * both languages because it never puts the label inside a clause.
 *
 * A reconstructed form gets the linguistic asterisk, which is what marks it as
 * inferred rather than written down anywhere.
 */
function derivationChain(origin, locale) {
    return origin.derivation
        .map((step) => {
        const star = step.reconstructed ? '*' : '';
        return `${languageLabel(step.language, locale)} ${star}${step.form} ${gloss(text(step.gloss, locale), locale)}`;
    })
        .join(' → ');
}
function originEntry(origin, locale) {
    const paragraphs = [text(origin.summary, locale)];
    if (origin.derivation.length > 0)
        paragraphs.push(derivationChain(origin, locale));
    /* Every origin states what KIND of claim it is and how firm it is. A reader
       must never have to guess whether they are looking at an attested derivation
       or somebody's guess. */
    paragraphs.push(tf('name.claimLine', {
        claim: t(`name.class.${origin.epistemicClass}`),
        confidence: t(`name.confidence.${origin.confidence}`),
    }));
    return {
        id: `name-origin-${origin.id}`,
        title: text(origin.culture, locale),
        infoKey: origin.epistemicClass === 'folk-etymology' ? 'name-folk-etymology' : 'name-etymology',
        paragraphs,
    };
}
/** '14 October' / '14. októbra', from structured data - never from a string table. */
function formatNameDay(day) {
    return new Intl.DateTimeFormat(dateLocale(), { day: 'numeric', month: 'long' })
        .format(new Date(2001, day.month - 1, day.day));
}
function nameDaySection(record, region, locale) {
    /* No region means no calendar - see nameDayRegionSelection.ts. Showing a
       Slovak date to an English reader merely because Slovakia is the
       best-supported dataset would be a statement about our data, not about them. */
    if (!region || !record || !knowledge)
        return null;
    const calendar = knowledge.nameDayCalendar(region);
    if (!calendar)
        return null;
    const days = knowledge.nameDaysFor(region, record.canonicalKey);
    if (days.length === 0) {
        /* A partial calendar that has not reached this name is not the same as a
           name with no name day, and the reading must not claim the stronger thing. */
        if (calendar.coverage === 'partial')
            return null;
        return {
            id: 'name-day',
            heading: t('section.name-day'),
            infoKey: 'name-day',
            paragraphs: [tf('name.day.noneInRegion', { region: text(calendar.label, locale) })],
        };
    }
    const paragraphs = days.map((day) => (day.rank === 'primary'
        ? tf('name.day.primary', { date: formatNameDay(day), region: text(calendar.label, locale), name: day.displayName })
        : tf('name.day.secondary', { date: formatNameDay(day), region: text(calendar.label, locale) })));
    /* The whole reason the date is not a field on the name record: the same name
       is celebrated on different days in different countries, and showing that
       side by side is more honest than showing one date as though it were the
       name's own property. */
    /* Only dates that are genuinely DIFFERENT. Hungary also celebrates Mária on
       12 September, so listing it under "elsewhere the date differs" would show
       the reader an identical date as evidence of divergence. Filtering on the
       date rather than on the region is what makes the sentence true. */
    const shown = new Set(days.map((day) => `${day.month}-${day.day}`));
    const elsewhere = knowledge.nameDaysAcrossRegions(record.canonicalKey)
        .filter((day) => day.region !== region && !shown.has(`${day.month}-${day.day}`));
    if (elsewhere.length > 0) {
        const list = elsewhere
            .map((day) => {
            const label = knowledge.nameDayCalendar(day.region)?.label;
            return `${label ? text(label, locale) : day.region} ${formatNameDay(day)}`;
        })
            .join(' · ');
        paragraphs.push(tf('name.day.elsewhere', { list }));
    }
    return {
        id: 'name-day',
        heading: t('section.name-day'),
        /* With the rest of the name layer: a calendar date is the least
           result-like thing in a pillar about calculated numbers. */
        layer: 'deep',
        infoKey: 'name-day',
        paragraphs,
    };
}
function cultureSection(record, locale) {
    const paragraphs = [];
    if (record.history)
        paragraphs.push(text(record.history, locale));
    if (record.culturalSpread.length > 0) {
        paragraphs.push(record.culturalSpread
            .map((entry) => `${text(entry.region, locale)}: ${entry.forms.join(', ')}`)
            .join(' · '));
    }
    const variants = record.variants.filter((variant) => variant.kind !== 'diminutive');
    if (variants.length > 0) {
        paragraphs.push(tf('name.variantsLine', { list: variants.map((variant) => variant.form).join(', ') }));
    }
    const diminutives = record.variants.filter((variant) => variant.kind === 'diminutive');
    if (diminutives.length > 0) {
        paragraphs.push(tf('name.diminutivesLine', { list: diminutives.map((variant) => variant.form).join(', ') }));
    }
    /* Related names are LINKED, never merged. Petra is not Peter, and a reader
       who is shown one under the other's heading has been told something false. */
    const related = record.relatedNames
        .map((relation) => {
        const other = knowledge.givenNameByKey(relation.canonicalKey);
        if (!other)
            return null;
        return `${other.canonicalName} (${t(`name.relation.${relation.relation}`)})`;
    })
        .filter((entry) => entry !== null);
    if (related.length > 0) {
        paragraphs.push(tf('name.relatedLine', { list: related.join(', ') }));
    }
    for (const note of record.notes) {
        if (note.kind === 'folk-etymology')
            paragraphs.push(text(note.text, locale));
    }
    if (paragraphs.length === 0)
        return null;
    return {
        id: 'name-culture',
        heading: t('section.name-culture'),
        layer: 'deep',
        infoKey: 'name-variant',
        paragraphs,
    };
}
/**
 * Compose the name sections.
 *
 * Returns an empty array whenever there is nothing trustworthy to say - an
 * unresolvable name, an ambiguous one, an empty input. Every caller treats an
 * empty array as "render nothing", so an unknown name costs the reader a
 * missing section and never a fabricated one, and never a broken profile.
 */
export function composeGivenNameSections(givenName, options = {}) {
    /* Not loaded yet: no sections, exactly as for an unknown name. The caller
       re-renders once preloadGivenNameKnowledge() resolves. */
    if (!knowledge)
        return [];
    const locale = localeNow();
    const resolution = knowledge.resolveGivenName(givenName);
    if (resolution.status === 'unknown' || !resolution.record) {
        if (!resolution.inputDisplay)
            return [];
        /* Saying "we do not have an entry" is a real answer and a better one than
           silence: it tells the reader the app looked, and it forecloses the
           assumption that a missing section means a meaningless name. */
        return [{
                id: 'your-name',
                heading: t('section.your-name'),
                /*
                 * THE NAME IS NOT ONE OF THE NUMEROLOGY RESULTS.
                 *
                 * Where a name comes from is genuinely interesting and it is not a
                 * calculated position: it sits beside the Life Path, the Expression, the
                 * Soul Urge and the Personality without being one of them. It used to open
                 * the reading - third section, before the portrait - so a reader met an
                 * etymology before being told anything the pillar had computed about them.
                 * It keeps every word it had, one disclosure down.
                 */
                layer: 'deep',
                standfirst: resolution.inputDisplay,
                infoKey: 'name-origin',
                paragraphs: [
                    resolution.status === 'ambiguous'
                        ? tf('name.ambiguous', { name: resolution.inputDisplay })
                        : tf('name.unknown', { name: resolution.inputDisplay }),
                ],
            }];
    }
    const record = resolution.record;
    const sections = [];
    /* ------------------------------------------------------- your name */
    const paragraphs = [];
    /* Reached through a variant: say so. Substituting the canonical form in
       silence would show someone a different name from the one they typed. */
    if (resolution.matchedVia) {
        paragraphs.push(tf('name.matchedVia', {
            form: resolution.inputDisplay,
            kind: t(`name.kind.${resolution.matchedVia.kind}`),
            name: record.canonicalName,
        }));
    }
    if (record.meaning.literal) {
        paragraphs.push(tf('name.meaningLine', {
            name: resolution.inputDisplay,
            meaning: text(record.meaning.literal, locale),
        }));
    }
    if (record.meaning.traditional) {
        paragraphs.push(tf('name.meaningTraditionalLine', {
            meaning: text(record.meaning.traditional, locale),
        }));
    }
    /* Contested origin is stated up front, not buried under the first theory. */
    if (hasDisputedOrigin(record))
        paragraphs.push(t('name.disputedIntro'));
    paragraphs.push(t('name.notAboutYou'));
    sections.push({
        id: 'your-name',
        heading: t('section.your-name'),
        /*
         * THE NAME IS NOT ONE OF THE NUMEROLOGY RESULTS.
         *
         * Where a name comes from is genuinely interesting and it is not a
         * calculated position: it sits beside the Life Path, the Expression, the
         * Soul Urge and the Personality without being one of them. It used to open
         * the reading - third section, before the portrait - so a reader met an
         * etymology before being told anything the pillar had computed about them.
         * It keeps every word it had, one disclosure down.
         */
        layer: 'deep',
        standfirst: resolution.inputDisplay,
        infoKey: 'name-origin',
        paragraphs,
        entries: record.origins.map((origin) => originEntry(origin, locale)),
    });
    const culture = cultureSection(record, locale);
    if (culture)
        sections.push(culture);
    const region = selectNameDayRegion(locale, options.regionPreference);
    const nameDay = nameDaySection(record, region, locale);
    if (nameDay)
        sections.push(nameDay);
    return sections;
}
