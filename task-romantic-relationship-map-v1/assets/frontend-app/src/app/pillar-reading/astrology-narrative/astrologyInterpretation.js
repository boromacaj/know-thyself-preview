export const PLANETS = [
    'Sun', 'Moon', 'Mercury', 'Venus', 'Mars', 'Jupiter', 'Saturn', 'Uranus', 'Neptune', 'Pluto',
];
export const SIGNS = [
    'Aries', 'Taurus', 'Gemini', 'Cancer', 'Leo', 'Virgo',
    'Libra', 'Scorpio', 'Sagittarius', 'Capricorn', 'Aquarius', 'Pisces',
];
export const ELEMENTS = ['Fire', 'Earth', 'Air', 'Water'];
export const MODALITIES = ['Cardinal', 'Fixed', 'Mutable'];
/** The tradition's own sign qualities; the engine uses the same table. */
export const SIGN_QUALITIES = {
    Aries: { element: 'Fire', modality: 'Cardinal' },
    Taurus: { element: 'Earth', modality: 'Fixed' },
    Gemini: { element: 'Air', modality: 'Mutable' },
    Cancer: { element: 'Water', modality: 'Cardinal' },
    Leo: { element: 'Fire', modality: 'Fixed' },
    Virgo: { element: 'Earth', modality: 'Mutable' },
    Libra: { element: 'Air', modality: 'Cardinal' },
    Scorpio: { element: 'Water', modality: 'Fixed' },
    Sagittarius: { element: 'Fire', modality: 'Mutable' },
    Capricorn: { element: 'Earth', modality: 'Cardinal' },
    Aquarius: { element: 'Air', modality: 'Fixed' },
    Pisces: { element: 'Water', modality: 'Mutable' },
};
/** The modern rulership the engine's chart ruler follows (astrology/chartRuler.ts). */
export const MODERN_RULER = {
    Aries: 'Mars', Taurus: 'Venus', Gemini: 'Mercury', Cancer: 'Moon', Leo: 'Sun', Virgo: 'Mercury',
    Libra: 'Venus', Scorpio: 'Pluto', Sagittarius: 'Jupiter', Capricorn: 'Saturn', Aquarius: 'Uranus',
    Pisces: 'Neptune',
};
const ROLE = {
    Sun: 'luminary', Moon: 'luminary',
    Mercury: 'personal', Venus: 'personal', Mars: 'personal',
    Jupiter: 'social', Saturn: 'social',
    Uranus: 'outer', Neptune: 'outer', Pluto: 'outer',
};
/** Fire and Air encourage each other, as do Earth and Water; across the pairs the tradition reads friction. */
export const congenialElements = (a, b) => (a === 'Fire' && b === 'Air') || (a === 'Air' && b === 'Fire')
    || (a === 'Earth' && b === 'Water') || (a === 'Water' && b === 'Earth');
/* ------------------------------------------------------------- helpers -- */
const isSign = (value) => SIGNS.includes(value);
const isPlanet = (value) => PLANETS.includes(value);
const aspectKindOf = (name) => name.toLowerCase();
/**
 * Degrees and minutes exactly as the engine's pillar prints them - `4°35′`,
 * rounded to the minute and never past 29°59′ - so a degree in "Why this
 * appears" is the same string as the one in At a glance and the appendix.
 */
export function degreeText(value) {
    const totalMinutes = Math.min(Math.max(0, Math.round(value * 60)), (29 * 60) + 59);
    return `${Math.floor(totalMinutes / 60)}°${String(totalMinutes % 60).padStart(2, '0')}′`;
}
/*
 * THE SALIENCE MODEL.
 *
 * Deterministic and deliberately plain, because a weighting nobody can follow
 * is a weighting nobody can check. An aspect matters more when it involves the
 * parts of a chart the tradition reads as central, when it is one of the
 * stronger aspect kinds, and when it is tight:
 *
 *   bodies     Sun, Moon 10 · Mercury, Venus, Mars 6 · Jupiter, Saturn 4 ·
 *              Uranus, Neptune, Pluto 2 · a node 1; +4 when one end is the
 *              chart ruler and the ruler is readable
 *   kind       conjunction 5 · opposition, square 4 · trine 3 · sextile 2
 *   orb        0.2 + 0.8 x (1 - orb / the engine's maximum orb for the pair)
 *
 * salience = (body A + body B + ruler) x kind x orb factor. It orders the list;
 * the plan still decides what the reading says, and a generational aspect
 * (two outer planets, or an outer planet and a node) never reaches the main
 * reading however it ranks.
 */
const BODY_WEIGHT = {
    Sun: 10, Moon: 10, Mercury: 6, Venus: 6, Mars: 6, Jupiter: 4, Saturn: 4,
    Uranus: 2, Neptune: 2, Pluto: 2, 'North Node': 1, 'South Node': 1,
};
const KIND_WEIGHT = {
    conjunction: 5, opposition: 4, square: 4, trine: 3, sextile: 2,
};
function tightnessOf(orb) {
    if (orb < 1)
        return 'exact';
    if (orb < 3)
        return 'tight';
    if (orb < 5)
        return 'moderate';
    return 'wide';
}
/*
 * THE SHAPE OF A COUNT.
 *
 * Ten placements over four elements average two and a half each, so an element
 * holding three leads nothing worth naming: `balanced`. From four upward the gap
 * to the next decides - two or more is a real lead, one is a lean, none is a
 * shared lead. The same gaps apply to the three modes, where nothing is
 * `balanced` because three of ten is already the average.
 */
function shapeOf(counts, order, balancedCeiling) {
    const sorted = [...order].sort((a, b) => counts[b] - counts[a] || order.indexOf(a) - order.indexOf(b));
    const top = counts[sorted[0]];
    const second = counts[sorted[1]];
    const leaders = sorted.filter((quality) => counts[quality] === top);
    if (balancedCeiling !== null && top <= balancedCeiling)
        return { shape: 'balanced', leaders };
    if (leaders.length > 1)
        return { shape: 'tie', leaders };
    return { shape: top - second >= 2 ? 'single' : 'near', leaders };
}
function qualityPattern(counts, order, windowCounts, balancedCeiling) {
    const { shape, leaders } = shapeOf(counts, order, balancedCeiling);
    const variants = windowCounts.length > 0 ? windowCounts : [counts];
    const shapes = variants.map((variant) => shapeOf(variant, order, balancedCeiling));
    const stable = shapes.every((entry) => entry.shape === shape && entry.leaders.join() === leaders.join());
    const robustLeaders = order.filter((quality) => shapes.every((entry) => entry.leaders.includes(quality)));
    const total = order.reduce((sum, quality) => sum + counts[quality], 0);
    return {
        counts,
        total,
        shape,
        leaders,
        scarce: order.filter((quality) => counts[quality] <= 1),
        state: stable ? 'known' : 'boundary',
        robustLeaders,
    };
}
/* ---------------------------------------------------------- the model -- */
/**
 * The model, or null when there is no calculated chart to read - a blocked
 * birth moment, or a chart missing the ten bodies the reading needs.
 */
export function interpretAstrology(data) {
    if (!data)
        return null;
    const { astrology } = data;
    if (astrology.status !== 'calculated' || !astrology.ephemeris)
        return null;
    const { ephemeris } = astrology;
    /* The certainty travels with the chart. An empty time with no precision on
       the data is unknown by the shared rule, whatever produced it. */
    const precision = data.anglesSuppressed ? 'unknown' : data.timePrecision ?? 'exact';
    const timeWithheld = precision === 'unknown';
    const window = precision === 'exact' ? null : data.timeWindow ?? null;
    const spansOf = (body) => window?.bodies.find((entry) => entry.body === body)?.spans ?? [];
    const signStateOf = (body) => {
        const spans = spansOf(body);
        const signs = spans.map((span) => span.value).filter(isSign);
        return { state: spans.length > 1 ? 'boundary' : 'known', signs, spans };
    };
    /* ---------------------------------------------------------- angles */
    const ascendantSpans = window?.ascendant ?? [];
    const ascendantState = timeWithheld ? 'withheld'
        : precision === 'approximate' ? (ascendantSpans.length > 1 ? 'boundary' : 'approximate')
            : 'known';
    const houses = astrology.houses;
    const angleReading = (angle) => {
        const placement = angle === 'Ascendant' ? houses?.angles.ascendant : houses?.angles.midheaven;
        const spans = angle === 'Ascendant' ? ascendantSpans : window?.midheaven ?? [];
        const state = !placement ? 'withheld'
            : timeWithheld ? 'withheld'
                : precision === 'approximate' ? (spans.length > 1 ? 'boundary' : 'approximate') : 'known';
        return {
            angle,
            sign: state === 'withheld' || !placement || !isSign(placement.sign) ? null : placement.sign,
            degree: state === 'withheld' || !placement ? null : placement.degreeInSign,
            state,
            spans: state === 'withheld' ? [] : spans,
        };
    };
    const ascendant = angleReading('Ascendant');
    const midheaven = angleReading('Midheaven');
    /* The houses follow the rising sign: Whole Sign houses ARE the signs counted
       from the rising one, so they are exactly as certain as it is. */
    const houseState = !houses ? 'withheld' : ascendant.state;
    const houseReadable = houseState === 'known' || houseState === 'approximate';
    /* ---------------------------------------------------------- bodies */
    const dignityOf = new Map((astrology.emphasis?.dignities ?? []).map((entry) => [entry.body, entry.dignity]));
    const houseOf = new Map((houses?.planetHouses ?? []).map((entry) => [entry.body, entry.house]));
    const bodyEntries = ephemeris.positions
        .filter((position) => isPlanet(position.body) && isSign(position.sign))
        .map((position) => {
        const body = position.body;
        const sign = position.sign;
        const signState = signStateOf(body);
        return {
            body,
            sign,
            element: SIGN_QUALITIES[sign].element,
            modality: SIGN_QUALITIES[sign].modality,
            degree: position.degreeInSign,
            role: ROLE[body],
            retrograde: position.motionState === 'retrograde',
            dignity: dignityOf.get(body) ?? null,
            state: signState.state,
            signs: signState.signs.length > 0 ? signState.signs : [sign],
            spans: signState.spans,
            house: houseReadable ? houseOf.get(body) ?? null : null,
            houseState: houseReadable && houseOf.has(body) ? houseState : houseReadable ? 'withheld' : houseState,
        };
    });
    if (bodyEntries.length !== PLANETS.length)
        return null;
    const bodies = Object.fromEntries(bodyEntries.map((entry) => [entry.body, entry]));
    const boundaryBodies = PLANETS.filter((body) => bodies[body].state === 'boundary');
    const nodes = ephemeris.points
        .filter((point) => (point.body === 'North Node' || point.body === 'South Node') && isSign(point.sign))
        .map((point) => ({
        body: point.body,
        sign: point.sign,
        degree: point.degreeInSign,
        state: signStateOf(point.body).state,
        house: houseReadable ? houseOf.get(point.body) ?? null : null,
    }));
    /* ---------------------------------------------------------- ruler */
    const rising = ascendant.sign;
    const rulerBody = rising ? MODERN_RULER[rising] : null;
    const angularRows = astrology.emphasis?.angularPlanets ?? [];
    const angularState = timeWithheld || !houses ? 'withheld'
        : precision === 'approximate' ? (window?.angularChanges ? 'boundary' : 'approximate') : 'known';
    const ruler = rising && rulerBody && ascendant.state !== 'withheld'
        ? {
            body: rulerBody,
            risingSign: rising,
            sign: bodies[rulerBody].sign,
            house: bodies[rulerBody].house,
            state: ascendant.state === 'boundary' || bodies[rulerBody].state === 'boundary' ? 'boundary' : ascendant.state,
            angle: angularState === 'withheld' ? null
                : (angularRows.find((row) => row.body === rulerBody)?.angle ?? null),
            inRisingSign: bodies[rulerBody].sign === rising,
            dignity: bodies[rulerBody].dignity,
            alternatives: [...new Set(ascendantSpans.map((span) => span.value).filter(isSign)
                    .map((sign) => MODERN_RULER[sign]))].filter((body) => body !== rulerBody),
        }
        : null;
    const rulerReadable = ruler !== null && (ruler.state === 'known' || ruler.state === 'approximate');
    const angular = angularState === 'withheld' ? [] : angularRows
        .filter((row) => isPlanet(row.body) || row.body === 'North Node' || row.body === 'South Node')
        .map((row) => ({ body: row.body, angle: row.angle, orb: row.orbDegrees, state: angularState }));
    /* ---------------------------------------------------------- aspects */
    const notThroughout = new Set(window?.aspectsNotThroughout ?? []);
    const aspects = astrology.aspects
        .filter((aspect) => (isPlanet(aspect.bodyA) || aspect.bodyA.endsWith('Node'))
        && (isPlanet(aspect.bodyB) || aspect.bodyB.endsWith('Node')))
        .map((aspect) => {
        const a = aspect.bodyA;
        const b = aspect.bodyB;
        const kind = aspectKindOf(aspect.aspect);
        const involvesRuler = rulerReadable && (a === ruler?.body || b === ruler?.body);
        const outerOrNode = (point) => !isPlanet(point) || ROLE[point] === 'outer';
        const orbFactor = 0.2 + 0.8 * Math.max(0, 1 - aspect.orb / aspect.maxOrb);
        const state = notThroughout.has(aspect.id)
            || [a, b].some((point) => isPlanet(point) && bodies[point].state === 'boundary') ? 'boundary' : 'known';
        return {
            id: aspect.id,
            a,
            b,
            kind,
            harmonic: aspect.harmonic,
            orb: aspect.orb,
            maxOrb: aspect.maxOrb,
            tightness: tightnessOf(aspect.orb),
            involvesLuminary: a === 'Sun' || a === 'Moon' || b === 'Sun' || b === 'Moon',
            involvesPersonal: [a, b].some((point) => isPlanet(point) && ROLE[point] === 'personal'),
            involvesRuler,
            generational: outerOrNode(a) && outerOrNode(b),
            state,
            salience: (BODY_WEIGHT[a] + BODY_WEIGHT[b] + (involvesRuler ? 4 : 0)) * KIND_WEIGHT[kind] * orbFactor,
        };
    })
        .sort((left, right) => right.salience - left.salience || left.orb - right.orb || left.id.localeCompare(right.id));
    /* --------------------------------------------------- elements, modes */
    const elements = qualityPattern(astrology.elementBalance, ELEMENTS, window?.elementBalances ?? [], 3);
    const modalities = qualityPattern(astrology.modalityBalance, MODALITIES, window?.modalityBalances ?? [], null);
    /* ---------------------------------------------------- concentrations */
    const concentrations = (astrology.emphasis?.stelliums ?? []).flatMap((stellium) => {
        const members = stellium.bodies.filter((body) => isPlanet(body) || body.endsWith('Node'));
        const planets = members.filter(isPlanet);
        const includesLuminary = planets.includes('Sun') || planets.includes('Moon');
        const strength = planets.length >= 4 || (planets.length >= 3 && includesLuminary)
            ? 'strong' : 'light';
        if (stellium.kind === 'house') {
            const house = Number(/(\d+)/.exec(stellium.label)?.[1] ?? NaN);
            if (!Number.isFinite(house))
                return [];
            /* A house stellium needs houses the reader can stand behind. */
            if (!houseReadable) {
                return houseState === 'boundary'
                    ? [{ kind: 'house', sign: null, house, bodies: members, planets, strength, includesLuminary, state: 'boundary' }]
                    : [];
            }
            return [{ kind: 'house', sign: null, house, bodies: members, planets, strength, includesLuminary, state: houseState }];
        }
        if (!isSign(stellium.label))
            return [];
        const sign = stellium.label;
        /* Uncertain when a member could leave the sign, or a body elsewhere could join it. */
        const moves = PLANETS.some((body) => bodies[body].state === 'boundary'
            && (planets.includes(body) || bodies[body].signs.includes(sign)));
        return [{
                kind: 'sign', sign, house: null, bodies: members, planets, strength, includesLuminary,
                state: moves ? 'boundary' : 'known',
            }];
    });
    /* ----------------------------------------------------- the Big Three */
    const sun = bodies.Sun;
    const moon = bodies.Moon;
    const relation = sun.sign === moon.sign ? 'same-sign'
        : sun.element === moon.element ? 'same-element'
            : congenialElements(sun.element, moon.element) ? 'congenial'
                : sun.modality === moon.modality ? 'same-modality' : 'friction';
    const sunMoonAspect = aspects.find((aspect) => (aspect.a === 'Sun' && aspect.b === 'Moon')
        || (aspect.a === 'Moon' && aspect.b === 'Sun')) ?? null;
    let affinity = null;
    let sameSignAs = null;
    if (rising) {
        const risingElement = SIGN_QUALITIES[rising].element;
        /* A luminary whose sign the window does not fix is matched with nothing. */
        const sunSign = rising === sun.sign && sun.state !== 'boundary';
        const moonSign = rising === moon.sign && moon.state !== 'boundary';
        sameSignAs = sunSign && moonSign ? 'both' : sunSign ? 'sun' : moonSign ? 'moon' : null;
        const sunMatch = sunSign || (risingElement === sun.element && sun.state !== 'boundary');
        const moonMatch = moonSign || (risingElement === moon.element && moon.state !== 'boundary');
        affinity = sunMatch && moonMatch ? 'both' : sunMatch ? 'sun' : moonMatch ? 'moon' : 'neither';
    }
    /* ------------------------------------------------------- the outlier */
    let outlier = null;
    if (elements.state === 'known') {
        const mass = ELEMENTS
            .filter((element) => elements.counts[element] >= 3)
            .sort((a, b) => elements.counts[b] - elements.counts[a]);
        const massTotal = mass.slice(0, 2).reduce((sum, element) => sum + elements.counts[element], 0);
        for (const luminary of ['Sun', 'Moon']) {
            const own = bodies[luminary];
            if (own.state === 'boundary' || outlier)
                continue;
            if (mass.length >= 2 && massTotal >= 7 && elements.counts[own.element] === 1 && !mass.includes(own.element)) {
                outlier = { body: luminary, element: own.element, mass: mass.slice(0, 2) };
            }
        }
    }
    const retrograde = PLANETS.filter((body) => bodies[body].retrograde);
    const moonPhases = window?.moonPhases ?? [ephemeris.moonPhase.name];
    return {
        precision,
        timeWithheld,
        window,
        bodies,
        nodes,
        bigThree: {
            sun, moon, ascendant, relation,
            sameModality: sun.modality === moon.modality,
            aspect: sunMoonAspect,
            affinity,
            sameSignAs,
        },
        midheaven,
        elements,
        modalities,
        concentrations,
        ruler,
        angular,
        aspects,
        outlier,
        moonPhase: { name: ephemeris.moonPhase.name, state: moonPhases.length > 1 ? 'boundary' : 'known' },
        retrograde,
        houseState,
        boundaryBodies,
    };
}
/** Whether a fact may be stated as it stands: known, or read from a stable estimate. */
export const readable = (state) => state === 'known' || state === 'approximate';
/** The other end of an aspect, seen from one body. */
export const otherEnd = (aspect, body) => (aspect.a === body ? aspect.b : aspect.a);
export const involves = (aspect, body) => aspect.a === body || aspect.b === body;
