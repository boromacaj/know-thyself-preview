export const astroApiHouseDefinitions = [
    { sourceName: 'First_House', sourceKey: 'first_house', houseNumber: 1 },
    { sourceName: 'Second_House', sourceKey: 'second_house', houseNumber: 2 },
    { sourceName: 'Third_House', sourceKey: 'third_house', houseNumber: 3 },
    { sourceName: 'Fourth_House', sourceKey: 'fourth_house', houseNumber: 4 },
    { sourceName: 'Fifth_House', sourceKey: 'fifth_house', houseNumber: 5 },
    { sourceName: 'Sixth_House', sourceKey: 'sixth_house', houseNumber: 6 },
    { sourceName: 'Seventh_House', sourceKey: 'seventh_house', houseNumber: 7 },
    { sourceName: 'Eighth_House', sourceKey: 'eighth_house', houseNumber: 8 },
    { sourceName: 'Ninth_House', sourceKey: 'ninth_house', houseNumber: 9 },
    { sourceName: 'Tenth_House', sourceKey: 'tenth_house', houseNumber: 10 },
    { sourceName: 'Eleventh_House', sourceKey: 'eleventh_house', houseNumber: 11 },
    { sourceName: 'Twelfth_House', sourceKey: 'twelfth_house', houseNumber: 12 },
];
export const astroApiHouseNumberBySourceName = astroApiHouseDefinitions.reduce((lookup, houseDefinition) => {
    lookup[normalizeAstroApiHouseToken(houseDefinition.sourceName)] = houseDefinition.houseNumber;
    lookup[normalizeAstroApiHouseToken(houseDefinition.sourceKey)] = houseDefinition.houseNumber;
    return lookup;
}, {});
export function normalizeAstroApiHouseName(sourceName) {
    if (typeof sourceName === 'number' && Number.isFinite(sourceName)) {
        return sourceName >= 1 && sourceName <= 12 ? sourceName : null;
    }
    if (typeof sourceName !== 'string') {
        return null;
    }
    const numericValue = Number(sourceName);
    if (Number.isFinite(numericValue) && numericValue >= 1 && numericValue <= 12) {
        return numericValue;
    }
    return astroApiHouseNumberBySourceName[normalizeAstroApiHouseToken(sourceName)] ?? null;
}
export function normalizedHouseNameFromNumber(houseNumber) {
    return astroApiHouseDefinitions.find((definition) => definition.houseNumber === houseNumber)?.sourceKey ?? null;
}
function normalizeAstroApiHouseToken(value) {
    return value.trim().toLowerCase().replace(/[\s-]+/g, '_');
}
