const DIGNITY_TABLE = {
    Sun: { domicile: ['Leo'], exaltation: ['Aries'], detriment: ['Aquarius'], fall: ['Libra'] },
    Moon: { domicile: ['Cancer'], exaltation: ['Taurus'], detriment: ['Capricorn'], fall: ['Scorpio'] },
    Mercury: { domicile: ['Gemini', 'Virgo'], exaltation: ['Virgo'], detriment: ['Sagittarius', 'Pisces'], fall: ['Pisces'] },
    Venus: { domicile: ['Taurus', 'Libra'], exaltation: ['Pisces'], detriment: ['Scorpio', 'Aries'], fall: ['Virgo'] },
    Mars: { domicile: ['Aries', 'Scorpio'], exaltation: ['Capricorn'], detriment: ['Libra', 'Taurus'], fall: ['Cancer'] },
    Jupiter: { domicile: ['Sagittarius', 'Pisces'], exaltation: ['Cancer'], detriment: ['Gemini', 'Virgo'], fall: ['Capricorn'] },
    Saturn: { domicile: ['Capricorn', 'Aquarius'], exaltation: ['Libra'], detriment: ['Cancer', 'Leo'], fall: ['Aries'] },
};
const DIGNITY_SCORES = {
    Domicile: 5,
    Exaltation: 4,
    Peregrine: 0,
    Fall: -4,
    Detriment: -5,
};
/** Three or more bodies in the same sign or house. The common threshold; some
 *  authors require four, which is why the member count is always reported too. */
const STELLIUM_THRESHOLD = 3;
/** Conjunction orb to an angle. 5 degrees is the conservative end of the range
 *  used for angular emphasis; wider orbs are used by some authors. */
const ANGULAR_ORB_DEGREES = 5;
export function calculateChartEmphasis(positions, houses) {
    const dignities = [];
    const outside = [];
    for (const position of positions) {
        const rule = DIGNITY_TABLE[position.body];
        if (!rule) {
            outside.push(position.body);
            continue;
        }
        dignities.push(dignityFor(position, rule));
    }
    const stelliums = [...signStelliums(positions), ...houseStelliums(houses)];
    const angularPlanets = houses ? angularPlanetsFor(positions, houses) : [];
    return {
        dignities,
        stelliums,
        angularPlanets,
        bodiesOutsideDignityScheme: outside,
        trace: [
            {
                label: 'Dignity scheme',
                value: 'Traditional rulership; domicile +5, exaltation +4, fall -4, detriment -5. Triplicity, term and face are not scored because their tables differ by authority.',
            },
            { label: 'Bodies outside the scheme', value: outside.join(', ') || 'None' },
            { label: 'Stellium threshold', value: `${STELLIUM_THRESHOLD} or more bodies in one sign or house` },
            { label: 'Angular orb', value: `${ANGULAR_ORB_DEGREES} degrees` },
            { label: 'Angular source', value: houses ? 'Whole Sign angles' : 'Unavailable (angles not calculated)' },
        ],
    };
}
function dignityFor(position, rule) {
    const dignity = resolveDignity(position.sign, rule);
    return {
        body: position.body,
        sign: position.sign,
        dignity,
        score: DIGNITY_SCORES[dignity],
        note: noteFor(dignity, position.body, position.sign),
    };
}
function resolveDignity(sign, rule) {
    if (rule.domicile.includes(sign))
        return 'Domicile';
    if (rule.exaltation.includes(sign))
        return 'Exaltation';
    if (rule.detriment.includes(sign))
        return 'Detriment';
    if (rule.fall.includes(sign))
        return 'Fall';
    return 'Peregrine';
}
function noteFor(dignity, body, sign) {
    switch (dignity) {
        case 'Domicile':
            return `${body} rules ${sign} and operates on its own terms there.`;
        case 'Exaltation':
            return `${body} is exalted in ${sign}: amplified, and held to a standard higher than the one it sets itself.`;
        case 'Detriment':
            return `${body} is in detriment in ${sign}, the sign opposite its rulership, and works through unfamiliar terms.`;
        case 'Fall':
            return `${body} is in fall in ${sign}, opposite its exaltation, where its usual approach carries less leverage.`;
        default:
            return `${body} holds no major dignity in ${sign}; it acts without either the support or the friction of the four essential dignities.`;
    }
}
function signStelliums(positions) {
    return groupStelliums(positions.map((position) => ({ key: position.sign, body: position.body })), 'sign');
}
function houseStelliums(houses) {
    if (!houses)
        return [];
    return groupStelliums(houses.planetHouses.map((placement) => ({ key: `House ${placement.house}`, body: placement.body })), 'house');
}
function groupStelliums(entries, kind) {
    const grouped = new Map();
    for (const entry of entries) {
        grouped.set(entry.key, [...(grouped.get(entry.key) ?? []), entry.body]);
    }
    return [...grouped.entries()]
        .filter(([, bodies]) => bodies.length >= STELLIUM_THRESHOLD)
        .map(([label, bodies]) => ({ kind, label, bodies }))
        .sort((left, right) => right.bodies.length - left.bodies.length || left.label.localeCompare(right.label));
}
function angularPlanetsFor(positions, houses) {
    const ascendant = houses.angles.ascendant.longitude;
    const midheaven = houses.angles.midheaven.longitude;
    const angles = [
        { name: 'Ascendant', longitude: ascendant },
        { name: 'Descendant', longitude: (ascendant + 180) % 360 },
        { name: 'Midheaven', longitude: midheaven },
        { name: 'Imum Coeli', longitude: (midheaven + 180) % 360 },
    ];
    const results = [];
    for (const position of positions) {
        for (const angle of angles) {
            const orb = angularSeparation(position.longitude, angle.longitude);
            if (orb <= ANGULAR_ORB_DEGREES) {
                results.push({ body: position.body, angle: angle.name, orbDegrees: round(orb, 3) });
            }
        }
    }
    return results.sort((left, right) => left.orbDegrees - right.orbDegrees);
}
/** Shortest separation between two ecliptic longitudes, in degrees (0-180). */
function angularSeparation(left, right) {
    return Math.abs(((left - right + 540) % 360) - 180);
}
function round(value, digits) {
    const scale = 10 ** digits;
    return Math.round(value * scale) / scale;
}
