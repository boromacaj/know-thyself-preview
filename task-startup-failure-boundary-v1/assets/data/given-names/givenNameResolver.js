import { GIVEN_NAME_INDEXES } from './givenNameIndex.js?v=2ea79e9';
import { exactKey, firstNameOf, foldedKey } from './givenNameNormalize.js?v=2ea79e9';
function resolution(partial) {
    return {
        record: null,
        matchKind: null,
        matchedVia: null,
        candidates: [],
        ...partial,
    };
}
/** Distinct records behind a set of alias bindings. */
function distinctRecords(bindings) {
    const seen = new Map();
    for (const binding of bindings)
        seen.set(binding.record.canonicalKey, binding.record);
    return [...seen.values()];
}
/**
 * Resolve a first name.
 *
 * Accepts a full name and takes the first token, because that is what users
 * actually type into a name field.
 */
export function resolveGivenName(input) {
    const raw = typeof input === 'string' ? input : '';
    const display = firstNameOf(raw);
    const base = { input: raw, inputDisplay: display };
    if (!display)
        return resolution({ ...base, status: 'unknown' });
    const exact = exactKey(display);
    const folded = foldedKey(display);
    /* 1. canonical exact */
    const canonicalHit = GIVEN_NAME_INDEXES.canonicalExact.get(exact);
    if (canonicalHit) {
        return resolution({ ...base, status: 'resolved', record: canonicalHit, matchKind: 'canonical-exact' });
    }
    /* 2. alias exact */
    const aliasExactHits = GIVEN_NAME_INDEXES.aliasExact.get(exact) ?? [];
    if (aliasExactHits.length > 0) {
        const records = distinctRecords(aliasExactHits);
        if (records.length === 1) {
            const binding = aliasExactHits[0];
            return resolution({
                ...base, status: 'resolved', record: records[0], matchKind: 'alias-exact',
                matchedVia: { form: binding.form, kind: binding.kind },
            });
        }
        return resolution({ ...base, status: 'ambiguous', candidates: records });
    }
    if (!folded)
        return resolution({ ...base, status: 'unknown' });
    /* 3. canonical folded - accepted only when it is unique */
    const canonicalFoldedHits = GIVEN_NAME_INDEXES.canonicalFolded.get(folded) ?? [];
    const canonicalFoldedRecords = [...new Map(canonicalFoldedHits.map((record) => [record.canonicalKey, record])).values()];
    if (canonicalFoldedRecords.length === 1) {
        return resolution({
            ...base, status: 'resolved', record: canonicalFoldedRecords[0], matchKind: 'canonical-folded',
        });
    }
    if (canonicalFoldedRecords.length > 1) {
        /* Two real names that differ only by a diacritic. Refusing here is the
           point; picking one would put the wrong etymology under a real name. */
        return resolution({ ...base, status: 'ambiguous', candidates: canonicalFoldedRecords });
    }
    /* 4. alias folded */
    const aliasFoldedHits = GIVEN_NAME_INDEXES.aliasFolded.get(folded) ?? [];
    if (aliasFoldedHits.length > 0) {
        const records = distinctRecords(aliasFoldedHits);
        if (records.length === 1) {
            const binding = aliasFoldedHits[0];
            return resolution({
                ...base, status: 'resolved', record: records[0], matchKind: 'alias-folded',
                matchedVia: { form: binding.form, kind: binding.kind },
            });
        }
        return resolution({ ...base, status: 'ambiguous', candidates: records });
    }
    return resolution({ ...base, status: 'unknown' });
}
/** Direct lookup by canonical key, for cross-references between records. */
export function givenNameByKey(canonicalKey) {
    return GIVEN_NAME_INDEXES.byKey.get(canonicalKey) ?? null;
}
