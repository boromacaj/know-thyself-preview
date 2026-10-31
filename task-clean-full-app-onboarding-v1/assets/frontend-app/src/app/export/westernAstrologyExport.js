import { MAJOR_ASPECTS } from '../astrology/aspectEngine.js?v=f9ab0a6';
import { birthTimeBasisFromMoment } from '../evidence/birthTimeBasis.js?v=f9ab0a6';
import { confidenceBandToNumber, confidenceReasonForBand } from './exportConfidence.js?v=f9ab0a6';
const ASTRONOMY_ENGINE_VERSION = '2.1.19';
const TIME_SENSITIVE_BODIES = new Set(['Moon']);
const ZODIAC_SIGNS_ORDER = [
    'Aries', 'Taurus', 'Gemini', 'Cancer', 'Leo', 'Virgo',
    'Libra', 'Scorpio', 'Sagittarius', 'Capricorn', 'Aquarius', 'Pisces',
];
const ASPECT_HARMONIC_LEGEND = {
    fusion: 'Fusion (conjunction) — no line drawn on the wheel',
    flow: 'Flow (sextile / trine)',
    tension: 'Tension (square)',
    polarity: 'Polarity (opposition)',
};
function signPlacementFromLongitude(longitude) {
    const normalized = ((longitude % 360) + 360) % 360;
    const signIndex = Math.floor(normalized / 30) % 12;
    return { sign: ZODIAC_SIGNS_ORDER[signIndex], degreeInSign: normalized - signIndex * 30 };
}
function arcMinutesOf(degreeInSign) {
    return Math.round((degreeInSign % 1) * 60);
}
function blockedSection(blockedReason) {
    return {
        status: 'blocked',
        methodology: {
            zodiac: 'Tropical',
            frame: 'Geocentric',
            houseSystem: 'Unavailable: calculation blocked',
            nodeType: 'Unavailable: calculation blocked',
            ephemerisEngine: `astronomy-engine ${ASTRONOMY_ENGINE_VERSION}`,
            retrogradeMethod: 'Unavailable: calculation blocked',
            aspectConfiguration: 'Unavailable: calculation blocked',
            chartRulerConvention: 'Modern rulership',
            timeBasis: 'estimated-local-noon',
            calculationVersion: ASTRONOMY_ENGINE_VERSION,
        },
        planets: [],
        nodes: [],
        moonPhase: null,
        angles: null,
        houses: null,
        aspects: [],
        derivedSummary: null,
        chartWheelReconstruction: null,
        missingTimeBehavior: {
            anglesSuppressed: true,
            housesSuppressed: true,
            chartRulerSuppressed: true,
            moonApproximate: true,
            note: 'Calculation blocked before a normalized birth moment was available; no chart output exists to suppress selectively.',
        },
        warnings: [],
        unsupportedFields: ['Minor aspects (semisextile, semisquare, sesquiquadrate, quincunx)', 'Triplicity, term and face dignities', 'Chiron and other asteroids', 'Placidus/Porphyry/Equal house systems'],
        blockedReason,
    };
}
function angleExport(label, placement, suppressed, suppressionReason, derivationTrace) {
    return {
        label,
        longitude: !suppressed && placement ? placement.longitude : null,
        sign: !suppressed && placement ? placement.sign : null,
        degreeInSign: !suppressed && placement ? placement.degreeInSign : null,
        arcMinutes: !suppressed && placement ? arcMinutesOf(placement.degreeInSign) : null,
        birthTimeDependent: true,
        suppressed,
        suppressionReason: suppressed ? suppressionReason : null,
        derivationTrace,
        evidenceType: suppressed ? 'suppressed' : 'calculated',
    };
}
export function buildWesternAstrologyExport(pillar) {
    const chartData = pillar.westernAstrologyChart;
    if (!chartData) {
        return blockedSection([`No Western Astrology chart data is available for this pillar (status: ${pillar.status}).`, ...pillar.limitations]);
    }
    const { astrology, anglesSuppressed } = chartData;
    if (astrology.status === 'blocked' || !astrology.ephemeris) {
        return blockedSection([...astrology.moment.limitations, ...pillar.limitations]);
    }
    const { ephemeris, houses } = astrology;
    const birthTimeBasis = birthTimeBasisFromMoment(astrology.moment);
    const housesByBody = new Map((houses?.planetHouses ?? []).map((placement) => [placement.body, placement.house]));
    function planetExport(planet, sourcePath) {
        const isTimeSensitive = TIME_SENSITIVE_BODIES.has(planet.body);
        const band = isTimeSensitive ? (birthTimeBasis === 'estimated-local-noon' ? 'medium' : 'high') : 'high';
        return {
            body: planet.body,
            longitude: planet.longitude,
            normalizedLongitude: ((planet.longitude % 360) + 360) % 360,
            sign: planet.sign,
            degreeInSign: planet.degreeInSign,
            arcMinutes: arcMinutesOf(planet.degreeInSign),
            motionRate: planet.speedDegreesPerDay,
            motionState: planet.motionState,
            housePlacement: !anglesSuppressed ? housesByBody.get(planet.body) ?? null : null,
            displayGlyphId: planet.body.toLowerCase().replace(/\s+/g, '-'),
            evidenceType: 'calculated',
            confidence: confidenceBandToNumber(band),
            confidenceReason: confidenceReasonForBand(band, isTimeSensitive ? 'Sign/degree can shift within the noon-fallback window for fast-moving bodies' : 'Stable at day resolution regardless of birth-time basis'),
            sourcePath,
        };
    }
    const planets = ephemeris.positions.map((planet, index) => planetExport(planet, `ephemeris.positions[${index}]`));
    const nodes = ephemeris.points.map((point, index) => planetExport(point, `ephemeris.points[${index}]`));
    const ascendantPlacement = houses ? houses.angles.ascendant : null;
    const midheavenPlacement = houses ? houses.angles.midheaven : null;
    const descendantPlacement = houses ? signPlacementFromLongitude(houses.angles.ascendant.longitude + 180) : null;
    const imumCoeliPlacement = houses ? signPlacementFromLongitude(houses.angles.midheaven.longitude + 180) : null;
    const angleSuppressionReason = anglesSuppressed
        ? 'Suppressed: birth time was estimated (12:00 local-noon fallback), so angle-dependent output is not shown as calculated.'
        : !houses ? 'Unavailable: resolved coordinates and a normalized birth moment are required.' : null;
    const angles = {
        ascendant: angleExport('Ascendant', ascendantPlacement ? { longitude: ascendantPlacement.longitude, sign: ascendantPlacement.sign, degreeInSign: ascendantPlacement.degreeInSign } : null, anglesSuppressed || !houses, angleSuppressionReason, 'Rising degree from UTC birth moment, latitude, longitude, and obliquity.'),
        midheaven: angleExport('Midheaven', midheavenPlacement ? { longitude: midheavenPlacement.longitude, sign: midheavenPlacement.sign, degreeInSign: midheavenPlacement.degreeInSign } : null, anglesSuppressed || !houses, angleSuppressionReason, 'Meridian angle from local sidereal time.'),
        descendant: angleExport('Descendant', descendantPlacement ? { longitude: (houses.angles.ascendant.longitude + 180) % 360, sign: descendantPlacement.sign, degreeInSign: descendantPlacement.degreeInSign } : null, anglesSuppressed || !houses, angleSuppressionReason, 'Exact +180 degree opposition of the Ascendant; not independently sampled.'),
        imumCoeli: angleExport('Imum Coeli', imumCoeliPlacement ? { longitude: (houses.angles.midheaven.longitude + 180) % 360, sign: imumCoeliPlacement.sign, degreeInSign: imumCoeliPlacement.degreeInSign } : null, anglesSuppressed || !houses, angleSuppressionReason, 'Exact +180 degree opposition of the Midheaven; not independently sampled.'),
    };
    const housesExport = {
        system: houses?.system ?? 'Whole Sign Houses',
        cusps: !anglesSuppressed && houses ? houses.houses.map((house) => ({
            house: house.house,
            sign: house.sign,
            cuspLongitude: house.cuspLongitude,
            placements: (houses.planetHouses ?? []).filter((placement) => placement.house === house.house).map((placement) => placement.body),
        })) : null,
        placementsByBody: !anglesSuppressed && houses ? Object.fromEntries(houses.planetHouses.map((placement) => [placement.body, placement.house])) : null,
        suppressed: anglesSuppressed || !houses,
        suppressionReason: angleSuppressionReason,
        highLatitudeWarning: null,
        methodologyNote: 'Whole Sign Houses: the Ascendant sign becomes House 1; subsequent signs become Houses 2-12 in order.',
    };
    const aspects = astrology.aspects.map((aspect) => ({
        bodyA: aspect.bodyA,
        bodyB: aspect.bodyB,
        aspectType: aspect.aspect,
        exactAngle: aspect.exactAngle,
        actualAngle: aspect.actualAngle,
        orb: aspect.orb,
        allowedOrb: aspect.maxOrb,
        applyingSeparating: 'not-supported',
        evidenceType: 'calculated',
        sourcePath: `aspects[id="${aspect.id}"]`,
    }));
    const sun = ephemeris.positions.find((planet) => planet.body === 'Sun');
    const moon = ephemeris.positions.find((planet) => planet.body === 'Moon');
    const dominantElements = dominantKeys(astrology.elementBalance);
    const dominantModalities = dominantKeys(astrology.modalityBalance);
    const derivedSummary = {
        bigThree: {
            sun: sun ? `${sun.sign} ${sun.degreeInSign.toFixed(2)}°` : null,
            moon: moon ? `${moon.sign} ${moon.degreeInSign.toFixed(2)}°` : null,
            ascendant: !anglesSuppressed && houses ? `${houses.angles.ascendant.sign} ${houses.angles.ascendant.degreeInSign.toFixed(2)}°` : null,
        },
        elementBalance: { ...astrology.elementBalance },
        modalityBalance: { ...astrology.modalityBalance },
        hemisphereBalance: !anglesSuppressed ? astrology.hemisphereBalance : null,
        chartRuler: !anglesSuppressed && astrology.chartRuler ? { body: astrology.chartRuler.body, sign: astrology.chartRuler.sign, house: astrology.chartRuler.house } : null,
        retrogradeBodies: astrology.retrogradeBodies,
        dominantElements,
        dominantModalities,
        tieBehavior: 'When multiple elements or modalities share the highest count, all tied entries are listed; none is arbitrarily preferred.',
        countedObjects: ephemeris.positions.map((planet) => planet.body),
        excludedObjects: ['North Node', 'South Node', 'Ascendant', 'Midheaven'],
        methodology: 'Element and modality balance count only the ten classical bodies (Sun-Pluto) by their zodiac sign; nodes and angles are excluded from these counts.',
    };
    const chartWheelReconstruction = {
        zodiacSectors: ZODIAC_SIGNS_ORDER.map((sign, signIndex) => ({ signIndex, sign, startLongitude: signIndex * 30 })),
        houseCusps: !anglesSuppressed && houses ? houses.houses.map((house) => ({ house: house.house, longitude: house.cuspLongitude })) : null,
        planetPositions: [...ephemeris.positions, ...ephemeris.points].map((body) => ({ body: body.body, longitude: body.longitude })),
        angleMarkers: !anglesSuppressed && houses ? [
            { label: 'Ascendant', longitude: houses.angles.ascendant.longitude },
            { label: 'Midheaven', longitude: houses.angles.midheaven.longitude },
            { label: 'Descendant', longitude: (houses.angles.ascendant.longitude + 180) % 360 },
            { label: 'Imum Coeli', longitude: (houses.angles.midheaven.longitude + 180) % 360 },
        ] : null,
        aspectLines: astrology.aspects.map((aspect) => ({ bodyA: aspect.bodyA, bodyB: aspect.bodyB, aspectType: aspect.aspect })),
        legend: Object.fromEntries(MAJOR_ASPECTS.map((definition) => [definition.name, ASPECT_HARMONIC_LEGEND[definition.harmonic] ?? definition.harmonic])),
    };
    const methodology = {
        zodiac: 'Tropical',
        frame: ephemeris.frame,
        houseSystem: houses ? `${houses.system} (v1; Placidus and others deferred)` : 'Unavailable without resolved coordinates',
        nodeType: 'True (osculating) node; South Node is the exact +180 degree opposition',
        ephemerisEngine: ephemeris.engine,
        retrogradeMethod: 'Central-difference apparent longitude, +/-12h sample',
        aspectConfiguration: 'Conjunction 0deg, sextile 60deg, square 90deg, trine 120deg, opposition 180deg. Orb allowance: 8deg for luminary pairs, 6deg for personal-planet pairs, 4deg otherwise.',
        chartRulerConvention: 'Modern rulership (Pluto/Uranus/Neptune rule Scorpio/Aquarius/Pisces respectively)',
        timeBasis: birthTimeBasis,
        calculationVersion: ASTRONOMY_ENGINE_VERSION,
    };
    return {
        status: 'calculated',
        methodology,
        planets,
        nodes,
        moonPhase: {
            name: ephemeris.moonPhase.name,
            illuminationPercent: ephemeris.moonPhase.illuminationPercent,
            angle: ephemeris.moonPhase.angle,
            evidenceType: 'calculated',
        },
        angles,
        houses: housesExport,
        aspects,
        derivedSummary,
        chartWheelReconstruction,
        missingTimeBehavior: {
            anglesSuppressed,
            housesSuppressed: anglesSuppressed || !houses,
            chartRulerSuppressed: anglesSuppressed || !astrology.chartRuler,
            moonApproximate: birthTimeBasis === 'estimated-local-noon',
            note: anglesSuppressed
                ? 'Birth time was estimated using the 12:00 local-noon fallback; Ascendant, Midheaven, Descendant, Imum Coeli, houses, house placements, hemisphere balance, and chart ruler are suppressed rather than shown as falsely precise.'
                : 'Birth time was user-supplied; angle-dependent output is calculated normally.',
        },
        warnings: [
            `North Node uses the true (osculating) node model; it can differ from the mean node by up to ~1.5 degrees.${ephemeris.moonSignBoundaryRisk ? ' The calculated Moon sign is close to a sign boundary for this birth window; treat it as approximate.' : ''}`,
            ...pillar.limitations,
        ],
        unsupportedFields: ['Minor aspects (semisextile, semisquare, sesquiquadrate, quincunx)', 'Triplicity, term and face dignities', 'Chiron and other asteroids', 'Placidus/Porphyry/Equal house systems'],
        blockedReason: null,
    };
}
function dominantKeys(counts) {
    const entries = Object.entries(counts);
    if (entries.length === 0)
        return [];
    const highest = Math.max(...entries.map(([, count]) => count));
    return entries.filter(([, count]) => count === highest).map(([key]) => key);
}
