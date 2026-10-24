/*
 * THE FIRST-NAME KNOWLEDGE RECORD.
 * ================================
 *
 * This layer answers a linguistic and historical question - where does this
 * given name come from, what did it originally mean, how did it travel - and
 * nothing else. It is deliberately NOT the numerology layer, which asks a
 * different question about the same string of letters, and it is deliberately
 * not a personality system: a name's etymology says something about the name,
 * never about the person carrying it.
 *
 * WHY THIS EXISTS ALONGSIDE data/identity/personalNameMeaning*
 * That layer models a name as symbolic themes, archetypes and reflection
 * prompts. This one models attested linguistic descent. They are answering
 * different questions and neither can be expressed in the other's schema
 * without lying, so they stay separate. See NAME_LAYERS.md for which to use.
 *
 * THE CENTRAL DESIGN CONSTRAINT: EPISTEMIC HONESTY
 * Name etymology is a field where confident-sounding nonsense is abundant and
 * cheap. Baby-name sites state contested reconstructions as fact and invent
 * meanings wholesale. So every claim in this schema carries, structurally:
 *
 *   - what KIND of claim it is (`epistemicClass`)
 *   - how well supported it is (`confidence`)
 *   - where it came from (`provenance`)
 *
 * None of those three is optional, because a schema that lets a claim in
 * without them is a schema that will eventually be filled with folklore.
 *
 * WHAT IS TRANSLATED AND WHAT IS NOT
 * Linguistic material is data, not prose: a root form, a historical spelling,
 * a transliteration and a canonical name form are the SAME in every language
 * and translating them destroys the record. Only explanation is localized -
 * hence `LocalizedText` on glosses, summaries and notes, and bare `string` on
 * forms. Getting this boundary wrong is how an etymology layer turns into
 * mush, so the type system enforces it.
 */
/** True when scholarship is divided rather than merely incomplete. */
export function hasDisputedOrigin(record) {
    return record.confidence === 'disputed'
        || record.origins.filter((origin) => origin.epistemicClass !== 'folk-etymology').length > 1;
}
