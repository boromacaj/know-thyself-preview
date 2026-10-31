import { nameMeaningMap, nameMeaningMapMeta } from './nameMeaningMap.js?v=2ea79e9';
export function normalizeNameMeaningKey(input) {
    return input
        .trim()
        .toLocaleLowerCase('sk-SK')
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')
        .replace(/[^a-z]/g, '');
}
export function getNameMeaningEntry(input) {
    const key = normalizeNameMeaningKey(input);
    return nameMeaningMap[key] ?? null;
}
export function hasNameMeaningEntry(input) {
    return getNameMeaningEntry(input) !== null;
}
export function listSupportedNameMeaningKeys() {
    return [...nameMeaningMapMeta.supportedKeys];
}
