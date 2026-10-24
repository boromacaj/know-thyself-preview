export const astroApiSignMappings = [
    { sign: 'aries', label: 'Aries', localLabel: 'Baran', abbreviation: 'Ari', signNumber: 1, element: 'fire', modality: 'cardinal' },
    { sign: 'taurus', label: 'Taurus', localLabel: 'Byk', abbreviation: 'Tau', signNumber: 2, element: 'earth', modality: 'fixed' },
    { sign: 'gemini', label: 'Gemini', localLabel: 'Blizenci', abbreviation: 'Gem', signNumber: 3, element: 'air', modality: 'mutable' },
    { sign: 'cancer', label: 'Cancer', localLabel: 'Rak', abbreviation: 'Can', signNumber: 4, element: 'water', modality: 'cardinal' },
    { sign: 'leo', label: 'Leo', localLabel: 'Lev', abbreviation: 'Leo', signNumber: 5, element: 'fire', modality: 'fixed' },
    { sign: 'virgo', label: 'Virgo', localLabel: 'Panna', abbreviation: 'Vir', signNumber: 6, element: 'earth', modality: 'mutable' },
    { sign: 'libra', label: 'Libra', localLabel: 'Vahy', abbreviation: 'Lib', signNumber: 7, element: 'air', modality: 'cardinal' },
    { sign: 'scorpio', label: 'Scorpio', localLabel: 'Skorpion', abbreviation: 'Sco', signNumber: 8, element: 'water', modality: 'fixed' },
    { sign: 'sagittarius', label: 'Sagittarius', localLabel: 'Strelec', abbreviation: 'Sag', signNumber: 9, element: 'fire', modality: 'mutable' },
    { sign: 'capricorn', label: 'Capricorn', localLabel: 'Kozorozec', abbreviation: 'Cap', signNumber: 10, element: 'earth', modality: 'cardinal' },
    { sign: 'aquarius', label: 'Aquarius', localLabel: 'Vodnar', abbreviation: 'Aqu', signNumber: 11, element: 'air', modality: 'fixed' },
    { sign: 'pisces', label: 'Pisces', localLabel: 'Ryby', abbreviation: 'Pis', signNumber: 12, element: 'water', modality: 'mutable' },
];
export const astroApiSignMappingByToken = astroApiSignMappings.reduce((mapping, signMapping) => {
    mapping[normalizeSignToken(signMapping.abbreviation)] = signMapping;
    mapping[normalizeSignToken(signMapping.label)] = signMapping;
    mapping[normalizeSignToken(signMapping.sign)] = signMapping;
    return mapping;
}, {});
export const astroApiSignMappingBySign = astroApiSignMappings.reduce((mapping, signMapping) => ({ ...mapping, [signMapping.sign]: signMapping }), {});
export function normalizeAstroApiSign(sourceValue) {
    if (typeof sourceValue !== 'string') {
        return null;
    }
    const trimmedSourceValue = sourceValue.trim();
    const signMapping = astroApiSignMappingByToken[normalizeSignToken(trimmedSourceValue)];
    return signMapping ? { ...signMapping, sourceValue: trimmedSourceValue } : null;
}
export function normalizeAstroApiSignAbbreviation(sourceValue) {
    return normalizeAstroApiSign(sourceValue);
}
export function getNormalizedZodiacSignMetadata(sign) {
    return astroApiSignMappingBySign[sign];
}
function normalizeSignToken(value) {
    return value.trim().toLowerCase();
}
