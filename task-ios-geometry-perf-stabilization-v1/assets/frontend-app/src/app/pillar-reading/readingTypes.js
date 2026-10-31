/**
 * THE PILLAR READING MODEL.
 *
 * A pillar screen is a chapter about the reader, not an engine report. This is
 * the shape of that chapter.
 *
 * WHY A MODEL RATHER THAN MARKUP
 *
 * The old screen built its HTML directly from `PillarResult`, which meant the
 * information architecture WAS the engine's data shape: key outputs first,
 * because keyOutputs came first; six sibling disclosures, because there were six
 * things left over. Nobody chose that order; it fell out of the struct.
 *
 * Putting a model in between lets the reading have its own order - one that
 * answers "what does this mean for me?" before "how was it worked out?" - and
 * lets each pillar fill that order from whatever its engine happens to expose.
 * The renderer then knows nothing about numerology or BaZi at all.
 *
 * THE ORDER IS FIXED AND IT IS THE PRODUCT.
 *
 *   hero          who this is and the two or three values that identify them
 *   introduction  a short orientation: what this system looks at
 *   portrait      the main reading
 *   themes        what recurs
 *   innerWorld / relationships / work / strengths / shadow / growth
 *   systemSpecific  the parts only this tradition has
 *   technical     ONE collapsed area, closed by default
 *
 * Any section may be absent. A missing section is honest; a padded one is not.
 */
/**
 * The shared spine. A pillar that has nothing tradition-specific to order uses
 * exactly this; the others extend it with their own ids in their own places.
 */
export const READING_SECTION_ORDER = [
    /* The thirty-second answer, before anything that needs reading. */
    'at-a-glance',
    'portrait',
    'themes',
    'inner-world',
    'relationships',
    'work',
    'strengths',
    'shadow',
    'growth',
    'system-specific',
];
/**
 * Order sections by the given hierarchy; unknown ids keep their relative place
 * at the end, so a section a composer forgets to list still renders rather than
 * silently vanishing.
 */
export function orderSections(sections, order = READING_SECTION_ORDER) {
    const rank = new Map(order.map((id, index) => [id, index]));
    return [...sections]
        .map((section, index) => ({ section, index }))
        .sort((a, b) => {
        const ra = rank.get(a.section.id) ?? order.length + a.index;
        const rb = rank.get(b.section.id) ?? order.length + b.index;
        return ra - rb || a.index - b.index;
    })
        .map((entry) => entry.section);
}
/** Drop sections with nothing in them, so an absent reading is absent rather than empty. */
export function withContent(sections) {
    return sections.filter((section) => section.paragraphs.length > 0
        || (section.entries?.length ?? 0) > 0
        || (section.marks?.length ?? 0) > 0);
}
