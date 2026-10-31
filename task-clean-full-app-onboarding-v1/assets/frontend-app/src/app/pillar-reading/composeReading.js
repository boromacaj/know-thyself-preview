import { engineProse } from '../i18n/engineProse.js?v=f9ab0a6';
import { t, UI_STRING_KEYS } from '../i18n/uiStrings.js?v=f9ab0a6';
import { labelText } from '../i18n/labelText.js?v=f9ab0a6';
import { limitationText } from './limitationText.js?v=f9ab0a6';
import { technicalNoteFor } from './technicalNotes.js?v=f9ab0a6';
/**
 * SHARED COMPOSITION.
 *
 * Two jobs that every pillar needs and none should implement twice: turning
 * resolved knowledge into the reading hierarchy, and turning everything the
 * engine emits into the single technical appendix.
 */
/**
 * Which reading section each authored portrait field belongs in.
 *
 * The knowledge layer's PortraitBody was designed against this hierarchy, which
 * is why the mapping is almost one-to-one. Two fields merge: emotionalPattern
 * joins the inner world, because a reader does not experience "my emotional
 * pattern" and "my inner world" as two chapters, and practicalGuidance joins
 * growth, because guidance with no direction attached is a list of chores.
 */
const FIELD_SECTION = {
    coreCharacter: 'portrait',
    innerWorld: 'inner-world',
    emotionalPattern: 'inner-world',
    relationships: 'relationships',
    workAndDirection: 'work',
    strengths: 'strengths',
    shadow: 'shadow',
    growth: 'growth',
    practicalGuidance: 'growth',
};
/**
 * Section headings come from the UI dictionary, keyed `section.<id>`.
 *
 * The English strings that used to live here are now the English half of that
 * dictionary - moved, not rewritten - so a heading has one definition and both
 * languages read it from the same place. An id with no entry falls back to the
 * id itself, which is the same behaviour this had before and is only ever
 * reachable by a composer inventing a section nobody declared.
 */
function headingKey(sectionId) {
    const key = `section.${sectionId}`;
    return UI_STRING_KEYS.includes(key) ? key : null;
}
export function headingFor(sectionId) {
    const key = headingKey(sectionId);
    return key ? t(key) : sectionId;
}
/** Accumulates paragraphs into the fixed sections as readings are folded in. */
export class SectionBuilder {
    buckets = new Map();
    standfirsts = new Map();
    entries = new Map();
    meta = new Map();
    /**
     * Reading depth and encyclopedia concept for a section.
     *
     * Separate from add() because a section is usually filled from several places
     * and its depth is a property of the section, not of whichever call happened
     * to write to it first.
     */
    describe(sectionId, meta) {
        this.meta.set(sectionId, { ...this.meta.get(sectionId), ...meta });
    }
    add(sectionId, paragraphs) {
        if (paragraphs.length === 0)
            return;
        const bucket = this.buckets.get(sectionId);
        if (bucket)
            bucket.push(...paragraphs);
        else
            this.buckets.set(sectionId, [...paragraphs]);
    }
    standfirst(sectionId, line) {
        if (!this.standfirsts.has(sectionId))
            this.standfirsts.set(sectionId, line);
    }
    /**
     * APPENDS. A section can legitimately be filled from more than one place - the
     * current chapter takes both the live Pinnacle and the live calendar cycle,
     * which are computed in different passes - and a set() would have silently
     * dropped whichever arrived first. Appending is what a builder should do; the
     * replace semantics were only ever safe because nothing happened to call it
     * twice yet.
     */
    setEntries(sectionId, entries) {
        if (entries.length === 0)
            return;
        const existing = this.entries.get(sectionId);
        this.entries.set(sectionId, existing ? [...existing, ...entries] : entries);
    }
    /**
     * Fold one resolved knowledge reading into the hierarchy.
     *
     * The unit's `core` goes to the portrait, because core IS the reading; the
     * portrait fields distribute by the table above. Nothing is invented and
     * nothing is dropped.
     */
    addResolved(resolved, options = {}) {
        this.add(options.coreSection ?? 'portrait', resolved.core);
        for (const [field, prose] of Object.entries(resolved.portrait)) {
            if (!prose || prose.length === 0)
                continue;
            this.add(FIELD_SECTION[field], prose);
        }
    }
    /**
     * THE EDITORIAL PASS, DONE ONCE FOR EVERY PILLAR.
     *
     * Two authored units can legitimately open the same way. A contextual reading
     * of Profile 5/1 for a Manifesting Generator and the base reading of 5/1 both
     * begin "The conscious 5 is the most projected-upon line in the system" - each
     * is well written, and the second one adds nothing by the time the reader
     * reaches it. Measured across the reference profile that was the ONLY literal
     * repetition in five thousand words of Human Design, and none at all in
     * numerology, so this is a scalpel rather than a sweep.
     *
     * Matching is on the OPENING SENTENCE, not the whole paragraph. Two paragraphs
     * that open identically are re-explaining the same thing however much they
     * diverge afterwards; two that merely share a phrase in the middle are usually
     * developing different points and are left alone.
     *
     * Short openers are exempt. "It is not a verdict." is a rhythm, not an
     * explanation, and deleting a paragraph for reusing one would strip the prose
     * of its cadence.
     */
    static openingKey(paragraph) {
        const first = paragraph.split(/(?<=[.!?])\s+/)[0] ?? '';
        const normalised = first.toLowerCase().replace(/[^a-z0-9 ]/g, ' ').replace(/\s+/g, ' ').trim();
        return normalised.split(' ').length >= 8 ? normalised : null;
    }
    build(marksBySection = {}) {
        const ids = new Set([
            ...this.buckets.keys(), ...this.entries.keys(), ...Object.keys(marksBySection),
        ]);
        /* Shared across the whole reading, so a repeat is caught wherever the two
           copies land rather than only within one section. */
        const seenOpenings = new Set();
        const dedupe = (paragraphs) => paragraphs.filter((paragraph) => {
            const key = SectionBuilder.openingKey(paragraph);
            if (!key)
                return true;
            if (seenOpenings.has(key))
                return false;
            seenOpenings.add(key);
            return true;
        });
        return [...ids].map((id) => {
            const standfirst = this.standfirsts.get(id);
            const entries = this.entries.get(id);
            const marks = marksBySection[id];
            const meta = this.meta.get(id) ?? {};
            const paragraphs = dedupe(this.buckets.get(id) ?? []);
            /*
             * A HEADING THAT HAS NOTHING UNDER IT GOES DOWN WITH ITS CONTENTS.
             *
             * Numerology's "Strengths" rendered as a heading, one line of standfirst
             * and then nothing: its Birth Day, Hidden Passion and Balance entries are
             * all deep, so the main reading showed a promise and the reader scrolled
             * past it to Shadow. A standfirst is a caption for content, not content.
             *
             * So a section with no paragraphs, no marks and no entries of its own
             * layer becomes deep - it keeps its heading and its standfirst, and they
             * appear where the entries actually are. A section with nothing at all is
             * dropped earlier, by withContent(); this is the case where the content
             * exists and is simply one disclosure further down.
             */
            const ownLayer = meta.layer ?? 'core';
            const hasOwnEntry = (entries ?? []).some((entry) => (entry.layer ?? ownLayer) !== 'deep');
            const emptyInItsOwnLayer = ownLayer !== 'deep'
                && paragraphs.length === 0
                && !(marks && marks.length > 0)
                && !hasOwnEntry
                && (entries ?? []).length > 0;
            const layer = emptyInItsOwnLayer ? 'deep' : meta.layer;
            return {
                id,
                heading: headingFor(id),
                ...(layer ? { layer } : {}),
                ...(meta.infoKey ? { infoKey: meta.infoKey } : {}),
                ...(standfirst ? { standfirst } : {}),
                paragraphs,
                ...(marks && marks.length > 0 ? { marks } : {}),
                ...(entries && entries.length > 0
                    ? {
                        entries: entries.map((entry) => ({
                            ...entry, paragraphs: dedupe(entry.paragraphs),
                        })),
                    }
                    : {}),
            };
        });
    }
}
/* ------------------------------------------------------------------ *
 * THE TECHNICAL APPENDIX
 * ------------------------------------------------------------------ */
/**
 * Everything the engine emits, gathered into one closed area.
 *
 * The brief is explicit that valid technical data is MOVED, not deleted, so this
 * takes the complete `technicalGroups`, every key output including the ones the
 * hero did not show, the provenance and the limitations. Nothing is summarised
 * away.
 *
 * Each field gains at most one plain sentence from technicalNotes.ts. Fields
 * with no note render without one rather than with filler.
 */
export function buildTechnicalAppendix(pillar, options = {}) {
    const shown = new Set((options.shownValueLabels ?? []).map((label) => label.toLowerCase()));
    /* Some engine facts ARE a sentence - the essential dignity line explains
       itself where it stands - so the value goes through the prose overlay too.
       It is a no-op for the readouts, which are the overwhelming majority. */
    const groups = pillar.technicalGroups.map((group) => ({
        title: labelText(group.title),
        fields: group.facts.map((fact) => annotate(fact.label, engineProse(fact.value))),
    }));
    /* Every calculated value, hero ones included. Someone checking the working
       should not have to reconcile two different lists, and marking which were
       already shown above is cheaper than omitting them. */
    const allValues = pillar.keyOutputs.map((output) => {
        /* Translated as two pieces before the join, not after it: the note and the
           description are separate sentences from separate places in the engine,
           and only the concatenation is unique to this list. */
        const note = [output.note, output.description]
            .filter((part) => (part ?? '').trim().length > 0)
            .map((part) => engineProse(part)).join(' ');
        /* The VALUE too, not only the note. A few key outputs are not readouts
           but small composed sentences - `Third — Pinnacle 8 / Challenge 1` -
           and they are the most visible text in the appendix. The overlay is a
           no-op for the readouts, which are the overwhelming majority, and the
           invariants suite pins every number in them either way. */
        const field = annotate(output.label, engineProse(output.value), note || undefined);
        /* `labelText` again, not `output.label`: this branch re-sets the label, and
           handing back the raw English one here would quietly undo the translation
           for exactly the values the hero already showed - the most visible ones. */
        return shown.has(output.label.toLowerCase())
            ? { ...field, label: labelText(output.label) }
            : field;
    });
    const methodology = [
        { label: labelText('Source'), value: engineProse(pillar.source.label), note: engineProse(pillar.source.detail) },
        { label: labelText('Reference'), value: readerReference(pillar.source.reference) },
        { label: labelText('Status'), value: engineProse(pillar.statusLabel) },
    ];
    return {
        groups,
        allValues,
        methodology,
        /* Translated late and textually. The engines author these next to the
           branch that raises them and must stay locale-free; see limitationText.ts. */
        limitations: pillar.limitations.map(limitationText),
        provenance: {
            label: pillar.source.label,
            detail: engineProse(pillar.source.detail),
            reference: readerReference(pillar.source.reference),
        },
    };
}
/*
 * THE PROVENANCE LINE, WITHOUT THE REPOSITORY IN IT.
 *
 * The engines record where they are implemented, which is the right thing for
 * an engine to record and the wrong thing to print at the bottom of a reading:
 * "Reference frontend-app/src/app/astrology/ephemerisEngine.ts + aspectEngine.ts
 * + angleHouseEngine.ts" tells a reader nothing they can use and tells them the
 * product is a repository.
 *
 * What survives is the part that answers the question the line is there for -
 * which calculation produced this - as a name rather than a path. A reference
 * that is already prose is left exactly as it is.
 */
function readerReference(reference) {
    if (!/(?:^|[\s+])(?:frontend-app|src)\//.test(reference))
        return reference;
    const names = reference
        .split('+')
        .map((part) => part.trim().replace(/^.*\//, '').replace(/\.(?:ts|js|mjs)$/, ''))
        .filter((part) => part.length > 0);
    return names.length > 0 ? names.join(', ') : reference;
}
function annotate(label, value, existingNote) {
    /* An engine-supplied note wins. It is specific to this value; ours is generic
       to the field, and a generic sentence displacing a specific one is a loss. */
    const note = existingNote ?? technicalNoteFor(label);
    /* The label is translated LAST, after the note lookup above, because the note
       table is keyed by the English label. Translate any earlier and every field
       silently loses its explanation. See i18n/labelText.ts. */
    return { label: labelText(label), value, ...(note ? { note } : {}) };
}
/* ------------------------------------------------------------------ *
 * SMALL HELPERS SHARED BY THE PILLAR COMPOSERS
 * ------------------------------------------------------------------ */
/** Find a key output by label, case-insensitively. Engines vary in casing. */
export function outputValue(pillar, label) {
    const match = pillar.keyOutputs.find((output) => output.label.toLowerCase() === label.toLowerCase());
    return match ? match.value : null;
}
/**
 * The short note a key output carries beside its value.
 *
 * BaZi puts the readable form there - the Year pillar's value is "Ding Mao" and
 * its note is "Yin Fire Rabbit" - so the zodiac reading needs the note, not the
 * value. Reading it here rather than re-deriving the animal keeps the engine as
 * the single source of that string.
 */
export function outputNote(pillar, label) {
    const match = pillar.keyOutputs.find((output) => output.label.toLowerCase() === label.toLowerCase());
    return match?.note ?? null;
}
/** Find a technical fact anywhere in the groups. */
export function technicalValue(pillar, label) {
    for (const group of pillar.technicalGroups) {
        const fact = group.facts.find((entry) => entry.label.toLowerCase() === label.toLowerCase());
        if (fact)
            return fact.value;
    }
    return null;
}
/** A joined sentence list that reads: "a, b and c". Never "a | b | c". */
export function sentenceList(items) {
    if (items.length === 0)
        return '';
    if (items.length === 1)
        return items[0];
    return `${items.slice(0, -1).join(', ')} and ${items[items.length - 1]}`;
}
