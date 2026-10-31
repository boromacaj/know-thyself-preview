import { exactKey, foldedKey } from './givenNameNormalize.js?v=f9ab0a6';
import { GIVEN_NAME_CORPUS } from './givenNameCorpus.js?v=f9ab0a6';
function push(map, key, value) {
    const existing = map.get(key);
    if (existing)
        existing.push(value);
    else
        map.set(key, [value]);
}
function buildIndexes(records) {
    const canonicalExact = new Map();
    const canonicalFolded = new Map();
    const aliasExact = new Map();
    const aliasFolded = new Map();
    const byKey = new Map();
    for (const record of records) {
        byKey.set(record.canonicalKey, record);
        canonicalExact.set(exactKey(record.canonicalName), record);
        push(canonicalFolded, foldedKey(record.canonicalName), record);
        /* The canonical key itself is a legitimate way in: a folded key is what
           other datasets (the name-day calendars) store, and they must be able to
           reach the record without knowing its accented spelling. */
        if (record.canonicalKey !== foldedKey(record.canonicalName)) {
            push(canonicalFolded, record.canonicalKey, record);
        }
        for (const variant of record.variants) {
            if (!variant.resolvesToCanonical)
                continue;
            const binding = { record, form: variant.form, kind: variant.kind };
            push(aliasExact, exactKey(variant.form), binding);
            const folded = foldedKey(variant.form);
            /* Cyrillic and Greek variants fold to nothing. They are still reachable
               by exact match, which is the only correct way to reach them. */
            if (folded)
                push(aliasFolded, folded, binding);
        }
    }
    return { canonicalExact, canonicalFolded, aliasExact, aliasFolded, byKey };
}
export const GIVEN_NAME_INDEXES = buildIndexes(GIVEN_NAME_CORPUS);
/** Every folded key that more than one record answers to. Used by the audit. */
export function collidingFoldedKeys() {
    const collisions = [];
    for (const [key, records] of GIVEN_NAME_INDEXES.canonicalFolded) {
        const unique = [...new Set(records.map((record) => record.canonicalKey))];
        if (unique.length > 1)
            collisions.push({ key, canonicalKeys: unique });
    }
    return collisions;
}
