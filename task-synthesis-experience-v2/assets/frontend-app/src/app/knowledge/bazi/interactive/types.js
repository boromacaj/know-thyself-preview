/*
 * THE BAZI EDUCATIONAL KNOWLEDGE REGISTRY: TYPES
 * ----------------------------------------------
 * What a symbol on the BaZi hero or its charts MEANS, written once, as prose for a reader who does not know the system. This is the UNIVERSAL layer:
 * nothing in an entry knows who is reading it. What the engine calculated for THIS person (the year animal, the Day Master, the counts, the birth
 * month) is a separate layer (personal.ts) that is composed beside an entry at open time and never written into it. The two are shown under
 * different headings, so a traditional description can never be mistaken for a finding about the reader.
 *
 * An entry is prose only (a lead and headed sections). Everything that is a FACT (the character of a branch, its element and polarity, its hours,
 * the solar term a month begins at, the ten stems and their mapping) is generated from the engine's own constant tables in registry.ts, so a fact
 * cannot drift from what the engine computes.
 */
export function entry(spec) {
    return {
        id: spec.id,
        kind: spec.kind,
        title: spec.title,
        subtitle: spec.subtitle,
        lead: spec.lead,
        sections: spec.sections.map(([heading, ...paragraphs]) => ({ heading, paragraphs })),
        related: spec.related,
        ...(spec.boundary ? { boundary: spec.boundary } : {}),
    };
}
