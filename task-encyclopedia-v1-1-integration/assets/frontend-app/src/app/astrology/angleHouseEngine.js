const ZODIAC_SIGNS = [
    'Aries',
    'Taurus',
    'Gemini',
    'Cancer',
    'Leo',
    'Virgo',
    'Libra',
    'Scorpio',
    'Sagittarius',
    'Capricorn',
    'Aquarius',
    'Pisces',
];
const OBLIQUITY_J2000_DEGREES = 23.439291111;
export function calculateWholeSignHouses(moment, positions, latitude, longitude) {
    if (moment.status !== 'ready' || moment.julianDate === null || latitude === null || longitude === null) {
        return null;
    }
    const angles = calculateAngles(moment.julianDate, latitude, longitude);
    const ascSignIndex = angles.ascendant.signIndex;
    const houses = Array.from({ length: 12 }, (_, index) => {
        const signIndex = (ascSignIndex + index) % 12;
        return {
            house: index + 1,
            sign: ZODIAC_SIGNS[signIndex],
            signIndex,
            cuspLongitude: signIndex * 30,
        };
    });
    const planetHouses = positions.map((planet) => {
        const placement = placementFromLongitude(planet.longitude);
        return {
            body: planet.body,
            house: houseNumberForSign(placement.signIndex, ascSignIndex),
            sign: placement.sign,
            degreeInSign: placement.degreeInSign,
            longitude: planet.longitude,
        };
    });
    return {
        system: 'Whole Sign Houses',
        angles,
        houses,
        planetHouses,
        trace: [
            { label: 'House system', value: 'Whole Sign Houses' },
            { label: 'Ascendant longitude', value: `${angles.ascendant.longitude.toFixed(6)} degrees` },
            { label: 'Ascendant sign', value: `${angles.ascendant.sign} ${angles.ascendant.degreeInSign.toFixed(6)} degrees` },
            { label: 'Midheaven longitude', value: `${angles.midheaven.longitude.toFixed(6)} degrees` },
            { label: 'Midheaven sign', value: `${angles.midheaven.sign} ${angles.midheaven.degreeInSign.toFixed(6)} degrees` },
            { label: 'Local sidereal time', value: `${angles.localSiderealTimeDegrees.toFixed(6)} degrees` },
            { label: 'Obliquity', value: `${angles.obliquityDegrees.toFixed(6)} degrees` },
            { label: 'Latitude', value: String(latitude) },
            { label: 'Longitude', value: String(longitude) },
            ...houses.map((house) => ({
                label: `House ${house.house}`,
                value: `${house.sign} whole sign / cusp ${house.cuspLongitude.toFixed(6)} degrees`,
            })),
            ...planetHouses.map((placement) => ({
                label: `${placement.body} house`,
                value: `House ${placement.house} / ${placement.sign} ${placement.degreeInSign.toFixed(6)} degrees`,
            })),
        ],
    };
}
export function calculateAngles(julianDate, latitude, longitude) {
    const localSiderealTimeDegrees = localSiderealTime(julianDate, longitude);
    const obliquityDegrees = meanObliquity(julianDate);
    const theta = radians(localSiderealTimeDegrees);
    const epsilon = radians(obliquityDegrees);
    const phi = radians(latitude);
    const midheavenLongitude = normalizeDegrees(degrees(Math.atan2(Math.sin(theta) / Math.cos(epsilon), Math.cos(theta))));
    const ascendantLongitude = normalizeDegrees(degrees(Math.atan2(Math.cos(theta), -Math.sin(theta) * Math.cos(epsilon) - Math.tan(phi) * Math.sin(epsilon))));
    return {
        ascendant: placementFromLongitude(ascendantLongitude),
        midheaven: placementFromLongitude(midheavenLongitude),
        localSiderealTimeDegrees: round(localSiderealTimeDegrees),
        obliquityDegrees: round(obliquityDegrees),
        latitude,
        longitude,
    };
}
export function houseNumberForSign(signIndex, ascendantSignIndex) {
    return ((signIndex - ascendantSignIndex + 12) % 12) + 1;
}
function placementFromLongitude(rawLongitude) {
    const longitude = round(normalizeDegrees(rawLongitude));
    const signIndex = Math.floor(longitude / 30) % 12;
    return {
        longitude,
        sign: ZODIAC_SIGNS[signIndex],
        signIndex,
        degreeInSign: round(longitude - signIndex * 30),
    };
}
function localSiderealTime(julianDate, longitude) {
    const centuries = (julianDate - 2451545.0) / 36525;
    const gmst = 280.46061837
        + 360.98564736629 * (julianDate - 2451545.0)
        + 0.000387933 * centuries ** 2
        - (centuries ** 3) / 38710000;
    return normalizeDegrees(gmst + longitude);
}
function meanObliquity(julianDate) {
    const centuries = (julianDate - 2451545.0) / 36525;
    return OBLIQUITY_J2000_DEGREES - 0.0130041667 * centuries - 0.0000001639 * centuries ** 2 + 0.0000005036 * centuries ** 3;
}
function normalizeDegrees(value) {
    return ((value % 360) + 360) % 360;
}
function radians(value) {
    return value * Math.PI / 180;
}
function degrees(value) {
    return value * 180 / Math.PI;
}
function round(value, digits = 6) {
    const scale = 10 ** digits;
    return Math.round(value * scale) / scale;
}
