import { splitBirthIntent, normalizeSearchText, prefixEditDistance, shardKeyFor, typoAllowance } from './placeSearchText.js';
export class PlaceIndexUnavailableError extends Error {
    constructor(message) {
        super(message);
        this.name = 'PlaceIndexUnavailableError';
    }
}
/** A source that reads the index over HTTP: one request per file, kept for the life of the source. `fetchJson` resolves null on a 404. */
export function createPlaceIndexSource(baseUrl, fetchJson) {
    const cache = new Map();
    const load = (path) => {
        let pending = cache.get(path);
        if (!pending) {
            pending = fetchJson(`${baseUrl}${path}`).catch((error) => {
                /* a failed fetch is not remembered: the next keystroke asks again */
                cache.delete(path);
                throw error;
            });
            cache.set(path, pending);
        }
        return pending;
    };
    return {
        async meta() {
            const meta = await load('meta.json');
            if (!meta)
                throw new PlaceIndexUnavailableError('The place index has no meta.json.');
            return meta;
        },
        async shard(key) {
            return (await load(`s/${key}.json`));
        },
        async majors() {
            const majors = await load('majors.json');
            if (!majors)
                throw new PlaceIndexUnavailableError('The place index has no majors.json.');
            return majors.r;
        },
        async facilities() {
            return (await load('facilities.json'));
        },
    };
}
/* ---------------------------------------------------------------- the search == */
/** How a settlement matched, best first. */
export const TIER = Object.freeze({
    /** the whole name (or an alias) is what was typed */
    exact: 0,
    /** what was typed is the start of the name (or an alias) */
    prefix: 1,
    /** a facility whose own name starts with what was typed, with no settlement of that name among the results */
    facilityName: 2,
    /** the name starts like what was typed, give or take a typo */
    fuzzy: 3,
});
const decode = (meta, stored) => ({
    gid: stored[0],
    name: stored[1],
    latitude: stored[2],
    longitude: stored[3],
    countryCode: stored[4],
    admin1Code: stored[5],
    population: stored[6],
    timeZone: meta.timeZones[stored[7]] ?? '',
});
/** The normalised name of every record of a shard, worked out once per shard. */
const normalizedNames = new WeakMap();
function namesOf(records) {
    let names = normalizedNames.get(records);
    if (!names) {
        names = records.map((record) => normalizeSearchText(record[1]));
        normalizedNames.set(records, names);
    }
    return names;
}
const DEFAULT_LIMIT = 8;
/** What a place in the first preferred country, and in any other, is worth in rank (see rankOf). */
const FIRST_COUNTRY_BONUS = 4;
const OTHER_COUNTRY_BONUS = 2;
const MINIMUM_DIRECT_RESULTS = 3;
/**
 * The words of a query that are not part of a place's name but of where it is - "Levice Slovakia", "Nitra, Nitriansky kraj" - are the
 * tail of the query once the name has matched: they must start the country's or the region's name (or be the country code).
 */
function contextMatches(meta, place, context) {
    if (!context)
        return true;
    const country = normalizeSearchText(meta.countries[place.countryCode] ?? '');
    const region = normalizeSearchText(meta.admin1[`${place.countryCode}.${place.admin1Code}`] ?? '');
    const code = place.countryCode.toLowerCase();
    return context.split(' ').every((word) => word === code || country.split(' ').some((part) => part.startsWith(word)) || region.split(' ').some((part) => part.startsWith(word)));
}
function betterThan(a, b) {
    return a.tier < b.tier || (a.tier === b.tier && a.distance < b.distance);
}
export async function searchPlaceIndex(source, query, options = {}) {
    const limit = options.limit ?? DEFAULT_LIMIT;
    const typedText = normalizeSearchText(query);
    if (typedText.length < 2)
        return [];
    /* "porodnica zvolen" asks for the maternity ward of Zvolen: the town is searched by "zvolen", and its hospitals are offered above it */
    const { intent, rest } = splitBirthIntent(typedText);
    const full = rest;
    const meta = await source.meta();
    /* "levice slovakia": try the whole of it as a name first, then fewer and fewer of its leading words as the name and the rest as context */
    const words = full.split(' ');
    const settlements = new Map();
    let nameQuery = full;
    let nameContext = '';
    for (let used = words.length; used >= 1; used -= 1) {
        nameQuery = words.slice(0, used).join(' ');
        if (nameQuery.length < 2)
            break;
        const context = words.slice(used).join(' ');
        nameContext = context;
        const found = await directMatches(source, meta, nameQuery, context);
        for (const match of found)
            settlements.set(match.place.gid, match);
        if (settlements.size > 0)
            break;
    }
    /* A typo is forgiven only when the query found no place of exactly that name and few of any other: "Nitra" does not also offer "Netrakona". */
    const foundExactly = [...settlements.values()].some((match) => match.tier === TIER.exact && match.alias === null);
    if (!foundExactly && settlements.size < MINIMUM_DIRECT_RESULTS && typoAllowance(nameQuery) > 0) {
        for (const match of await fuzzyMatches(source, meta, nameQuery, nameContext)) {
            const existing = settlements.get(match.place.gid);
            if (!existing || betterThan(match, existing))
                settlements.set(match.place.gid, match);
        }
    }
    const matches = [...settlements.values()];
    /* verified maternity facilities: right before the settlement they belong to, never above a stronger geographic match */
    const facilityFile = await source.facilities();
    if (facilityFile) {
        const byGid = settlements;
        const attached = new Set();
        for (const facility of facilityFile.elements) {
            const home = facility.settlement === null ? undefined : byGid.get(facility.settlement);
            /* a verified maternity facility stands by its town whatever was typed; a hospital, whose ward is not confirmed, only when one was asked for */
            if (home && (intent || facility.kind !== 'hospital')) {
                matches.push({ kind: 'facility', facility, tier: home.tier, settlement: home.place, ...(intent ? { asked: true } : {}) });
                attached.add(facility.id);
            }
        }
        const typed = nameQuery;
        for (const facility of facilityFile.elements) {
            if (attached.has(facility.id))
                continue;
            /* a hospital whose town is among the results has been left out on purpose (nothing asked for it): it is not brought back by its name */
            if (facility.kind === 'hospital' && facility.settlement !== null && byGid.has(facility.settlement))
                continue;
            const own = normalizeSearchText(facility.name);
            if (!own.split(' ').some((word, index, all) => all.slice(index).join(' ').startsWith(typed)))
                continue;
            matches.push({ kind: 'facility', facility, tier: TIER.facilityName, settlement: null });
        }
    }
    const preferred = new Map((options.preferredCountries ?? []).map((country, index) => [country, index === 0 ? FIRST_COUNTRY_BONUS : OTHER_COUNTRY_BONUS]));
    const typedLength = nameQuery.replace(/ /g, '').length;
    const ranked = matches.map((match) => ({ match, rank: rankOf(match, preferred, typedLength) }));
    ranked.sort((a, b) => b.rank - a.rank || compareStable(a.match, b.match));
    return ranked.slice(0, limit).map((entry) => entry.match);
}
async function directMatches(source, meta, query, context) {
    const shard = await source.shard(shardKeyFor(query));
    if (!shard)
        return [];
    const found = new Map();
    const keep = (match) => {
        const existing = found.get(match.place.gid);
        if (!existing || betterThan(match, existing))
            found.set(match.place.gid, match);
    };
    const names = namesOf(shard.r);
    shard.r.forEach((record, index) => {
        const name = names[index];
        if (!name.startsWith(query))
            return;
        const place = decode(meta, record);
        if (!contextMatches(meta, place, context))
            return;
        keep({ kind: 'settlement', place, tier: name === query ? TIER.exact : TIER.prefix, alias: null, distance: 0 });
    });
    const aliasHits = shard.a.filter(([alias]) => alias.startsWith(query));
    if (aliasHits.length > 0) {
        const majors = await source.majors();
        const byGid = new Map();
        for (const record of majors)
            byGid.set(record[0], record);
        for (const [alias, gid] of aliasHits) {
            const record = byGid.get(gid);
            if (!record)
                continue;
            const place = decode(meta, record);
            if (!contextMatches(meta, place, context))
                continue;
            keep({ kind: 'settlement', place, tier: alias === query ? TIER.exact : TIER.prefix, alias, distance: 0 });
        }
    }
    return [...found.values()];
}
/**
 * A mistyped query. The pool is the shard the query names, the shard with its first two letters swapped (the commonest slip), and the
 * places of 15,000 people and over (whose first letters can be wrong without the place being lost). Small settlements with a typo in
 * their first two letters are not found: the index would have to be searched whole.
 */
async function fuzzyMatches(source, meta, query, context) {
    const allowance = typoAllowance(query);
    const swapped = query.length >= 2 ? `${query[1]}${query[0]}${query.slice(2)}` : query;
    const pools = [];
    for (const key of new Set([shardKeyFor(query), shardKeyFor(swapped)])) {
        const shard = await source.shard(key);
        if (shard)
            pools.push(shard.r);
    }
    pools.push(await source.majors());
    const found = new Map();
    for (const pool of pools) {
        const names = namesOf(pool);
        pool.forEach((record, index) => {
            const distance = prefixEditDistance(query, names[index], allowance);
            if (distance > allowance)
                return;
            const existing = found.get(record[0]);
            if (existing && existing.distance <= distance)
                return;
            const place = decode(meta, record);
            if (!contextMatches(meta, place, context))
                return;
            found.set(record[0], { kind: 'settlement', place, tier: TIER.fuzzy, alias: null, distance });
        });
    }
    return [...found.values()];
}
const FACILITY_RANK = { 'maternity-hospital': 0, 'birth-centre': 1, 'maternity-unit': 2, hospital: 3 };
/** What a facility is worth above its town when the query asked for one: a verified ward before a hospital of the town, both before the town. */
const ASKED_BOOST = { 'maternity-hospital': 2, 'birth-centre': 2, 'maternity-unit': 2, hospital: 1 };
/**
 * HOW WELL A MATCH ANSWERS WHAT WAS TYPED, as one number (higher is better). A pure function of the record, the query and the caller's
 * preferred countries, so the order is the same every time:
 *
 *   how it matched   +1.0 for the whole name, +0.4 for a whole alias (an alias is a courtesy: "Levi" is how some languages write
 *                    Lévis), 0 for the start of a name, -0.8 for the start of an alias, and a typo is far below any of them
 *   how big          log10 of the population: a city a hundred times larger is two points ahead
 *   how close        -0.25 for every letter the name has beyond what was typed: "Levice" answers "Levi" better than "Levittown"
 *   where            +4.0 in the first preferred country, +2.0 in the others: a place a person is likely to have been born outranks one that is only larger
 *   a facility       its settlement's rank plus 0.001: directly above the settlement it belongs to, below anything stronger; when the query asked
 *                    for a hospital or a maternity ward ("maternity ward Zvolen"), plus 2 for a verified ward and 1 for a hospital of the town
 *
 * The one rule that is not a score is the one that matters most: a facility never stands above a stronger geographic match, because it
 * has no rank of its own, only its settlement's.
 */
function rankOf(match, preferred, typedLength) {
    if (match.kind === 'facility') {
        if (match.settlement === null)
            return -5 + (preferred.get(match.facility.countryCode) ?? 0) / 2;
        return settlementRank({ kind: 'settlement', place: match.settlement, tier: match.tier, alias: null, distance: 0 }, preferred, typedLength)
            + (match.asked ? ASKED_BOOST[match.facility.kind] : 0.001);
    }
    return settlementRank(match, preferred, typedLength);
}
function settlementRank(match, preferred, typedLength) {
    const place = match.place;
    const where = preferred.get(place.countryCode) ?? 0;
    /* GeoNames has no population for many small places (0 means unknown): they are ranked as the villages they are, not as nothing */
    const big = Math.log10(Math.max(place.population, 300) + 10);
    if (match.tier === TIER.fuzzy)
        return -10 - match.distance + big * 0.1 + where * 0.5;
    const extra = Math.max(0, normalizeSearchText(match.alias ?? place.name).replace(/ /g, '').length - typedLength);
    const how = match.tier === TIER.exact ? (match.alias === null ? 1 : 0.4) : (match.alias === null ? 0 : -0.8);
    return how + big - 0.25 * extra + where;
}
/** What breaks a tie in rank: a facility before a settlement of its own rank, then the kinds, the shorter name, the id. */
function compareStable(a, b) {
    if (a.kind !== b.kind)
        return a.kind === 'facility' ? -1 : 1;
    if (a.kind === 'facility' && b.kind === 'facility') {
        if (FACILITY_RANK[a.facility.kind] !== FACILITY_RANK[b.facility.kind])
            return FACILITY_RANK[a.facility.kind] - FACILITY_RANK[b.facility.kind];
        return a.facility.id.localeCompare(b.facility.id);
    }
    if (a.kind === 'settlement' && b.kind === 'settlement') {
        if (a.distance !== b.distance)
            return a.distance - b.distance;
        if (a.place.name.length !== b.place.name.length)
            return a.place.name.length - b.place.name.length;
        return a.place.gid - b.place.gid;
    }
    return 0;
}
